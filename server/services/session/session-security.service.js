const crypto = require('crypto');
const env = require('../../env');

class SessionSecurityService {
    constructor() {
        this.securityMetrics = {
            suspiciousActivities: 0,
            blockedSessions: 0,
            sessionHijackingAttempts: 0,
            csrfAttempts: 0
        };

        this.blockedIPs = new Map();
        this.sessionFingerprints = new Map(); // sid -> { fingerprint, lastSeen }
        this.rateLimiters = new Map();        // ip  -> { count, firstSeen }

        // Hard caps. Both maps used to grow without bound: fingerprints got
        // an entry for EVERY cookieless request (express-session mints a fresh
        // id each time) and nothing ever pruned either map — a slow memory
        // leak on a long-lived container. Maps iterate in insertion order, so
        // evicting the first key is "evict oldest".
        this.maxFingerprints = 10000;
        this.maxRateLimiters = 10000;
        this.cleanupTimer = null;
    }

    /** Insert with evict-oldest once the cap is reached. */
    _setBounded(map, key, value, max) {
        if (!map.has(key) && map.size >= max) {
            const oldest = map.keys().next().value;
            if (oldest !== undefined) map.delete(oldest);
        }
        map.set(key, value);
    }

    /**
     * True only when the client actually sent our session cookie. Without a
     * cookie `req.session.id` is a throwaway id for this one request, so there
     * is nothing meaningful to fingerprint (and storing it leaks memory).
     */
    hasSessionCookie(req) {
        const name = env.SESSION_NAME || 'kutt.sid';
        if (req.cookies && Object.prototype.hasOwnProperty.call(req.cookies, name)) return true;
        const raw = req.headers && req.headers.cookie;
        return typeof raw === 'string' && raw.includes(`${name}=`);
    }

    /**
     * Generate secure session ID
     */
    generateSecureSessionId() {
        return crypto.randomBytes(32).toString('hex');
    }

    /**
     * Create session fingerprint for security
     */
    createSessionFingerprint(req) {
        const components = [
            req.headers['user-agent'] || '',
            req.headers['accept-language'] || '',
            req.headers['accept-encoding'] || '',
            req.ip || '',
            // Don't include headers that change frequently
        ];

        return crypto
            .createHash('sha256')
            .update(components.join('|'))
            .digest('hex');
    }

    /**
     * Validate session fingerprint
     */
    validateSessionFingerprint(req) {
        if (!req.session || !req.session.id || !this.hasSessionCookie(req)) {
            return true; // No (persisted) session to validate
        }

        const now = Date.now();
        const currentFingerprint = this.createSessionFingerprint(req);
        const stored = this.sessionFingerprints.get(req.session.id);

        if (!stored) {
            // First time seeing this session, store fingerprint
            this._setBounded(this.sessionFingerprints, req.session.id,
                { fingerprint: currentFingerprint, lastSeen: now }, this.maxFingerprints);
            return true;
        }

        if (currentFingerprint !== stored.fingerprint) {
            console.warn(`🚨 Session fingerprint mismatch for session ${req.session.id}`);
            this.securityMetrics.sessionHijackingAttempts++;
            return false;
        }

        stored.lastSeen = now;
        return true;
    }

    /**
     * Check if IP is from known webhook providers
     */
    isKnownWebhookProvider(ip) {
        // Handle undefined or null IP addresses
        if (!ip || typeof ip !== 'string') {
            return false;
        }

        // Meta/Facebook IP ranges (common ones)
        const metaIPRanges = [
            '31.13.', '66.220.', '69.63.', '69.171.', '74.119.', '173.252.',
            '204.15.', '157.240.', '179.60.', '185.60.', '199.201.'
        ];

        // Twilio IP ranges (common ones)
        const twilioIPRanges = [
            '54.172.', '54.244.', '54.171.', '54.65.', '54.169.',
            '177.71.', '23.21.', '50.16.', '107.20.', '75.101.'
        ];

        const allWebhookRanges = [...metaIPRanges, ...twilioIPRanges];
        return allWebhookRanges.some(range => ip.startsWith(range));
    }

    /**
     * Check for suspicious session activity
     */
    detectSuspiciousActivity(req) {
        const suspiciousIndicators = [];

        // Skip suspicious activity detection for known webhook providers
        const ip = req.ip;
        if (this.isKnownWebhookProvider(ip)) {
            return suspiciousIndicators; // Return empty array for webhook providers
        }

        // Check for rapid session creation from same IP
        const now = Date.now();
        const ipActivity = this.rateLimiters.get(ip) || { count: 0, firstSeen: now };

        if (now - ipActivity.firstSeen < 60000) { // 1 minute window
            ipActivity.count++;
            // NOTE: despite the name, this counts REQUESTS (this middleware
            // runs on every request), not session creations. A single SPA
            // page view fires the HTML + several /api/settings + gallery +
            // image requests, so the old ">10/min" flagged every real user
            // browsing normally — one stripped header away from a 15-min IP
            // block (the 2026-07-07 "site blocks me / 429" incident). 120/min
            // still catches hammering bots but not humans.
            if (ipActivity.count > 120) {
                suspiciousIndicators.push('rapid_session_creation');
            }
        } else {
            // Reset counter for new time window
            ipActivity.count = 1;
            ipActivity.firstSeen = now;
        }

        this._setBounded(this.rateLimiters, ip, ipActivity, this.maxRateLimiters);

        // Check for unusual user agent patterns (but allow AI agents)
        const userAgent = req.headers['user-agent'] || '';
        const isAIAgent = /ChatGPT|GPTBot|Google-Extended|Claude|PerplexityBot|YouBot|anthropic|Applebot-Extended|CCBot|Bard|Gemini/i.test(userAgent);

        if (!userAgent || (userAgent.length < 10 && !isAIAgent)) {
            suspiciousIndicators.push('suspicious_user_agent');
        }

        // Check for missing common headers
        if (!req.headers['accept'] || !req.headers['accept-language']) {
            suspiciousIndicators.push('missing_headers');
        }

        if (suspiciousIndicators.length > 0) {
            console.warn(`🚨 Suspicious activity detected from ${ip}:`, suspiciousIndicators);
            this.securityMetrics.suspiciousActivities++;
        }

        return suspiciousIndicators;
    }

    /**
     * Session security middleware
     */
    securityMiddleware() {
        return (req, res, next) => {
            try {
                // Skip security checks for health endpoints, webhooks, localhost, and AI agents
                const userAgent = req.headers['user-agent'] || '';
                const isAIAgent = /ChatGPT|GPTBot|Google-Extended|Claude|PerplexityBot|YouBot|anthropic|Applebot-Extended|CCBot|Bard|Gemini|GoogleBot|BingBot|facebookexternalhit|Twitterbot|LinkedInBot/i.test(userAgent);

                // Ensure req.path exists and is a string
                const requestPath = req.path || '';
                const requestIP = req.ip || '';

                if (requestPath.startsWith('/api/monitoring/') ||
                    requestPath.startsWith('/api/webhooks/') ||
                    requestIP === '::1' || requestIP === '127.0.0.1' ||
                    isAIAgent) {
                    return next();
                }

                // Check if IP is blocked
                if (this.blockedIPs.has(req.ip)) {
                    const blockInfo = this.blockedIPs.get(req.ip);
                    if (Date.now() < blockInfo.until) {
                        console.warn(`🚫 Blocked IP ${req.ip} attempted access`);
                        return res.status(429).json({
                            error: 'Too many suspicious activities. Please try again later.'
                        });
                    } else {
                        // Block expired, remove it
                        this.blockedIPs.delete(req.ip);
                    }
                }

                // Validate session fingerprint
                if (!this.validateSessionFingerprint(req)) {
                    // Destroy potentially hijacked session
                    if (req.session) {
                        req.session.destroy((err) => {
                            if (err) console.error('Error destroying suspicious session:', err);
                        });
                    }
                    return res.status(401).json({
                        error: 'Session security validation failed'
                    });
                }

                // Detect suspicious activity with error handling
                let suspiciousIndicators = [];
                try {
                    suspiciousIndicators = this.detectSuspiciousActivity(req);
                } catch (error) {
                    console.error('🚨 Error in suspicious activity detection:', error);
                    // Continue with empty indicators to avoid blocking legitimate requests
                    suspiciousIndicators = [];
                }

                // Require ALL THREE indicators (rapid hammering + missing/short
                // user-agent + missing accept headers) before auto-blocking an
                // IP — i.e. only headless scripted flooding. At >=2, any real
                // browser that hit the rapid counter plus ONE quirk (privacy
                // extensions strip Accept-Language, some in-app webviews trim
                // headers) got a hard 15-min block on the whole site — which
                // users experienced as "the website blocks my IP" (2026-07-07).
                // Cloudflare in front remains the real DDoS layer.
                if (suspiciousIndicators.length >= 3) {
                    // Block IP for 15 minutes
                    const requestIP = req.ip || 'unknown';
                    this.blockedIPs.set(requestIP, {
                        until: Date.now() + 15 * 60 * 1000,
                        reason: suspiciousIndicators.join(', ')
                    });
                    this.securityMetrics.blockedSessions++;

                    return res.status(429).json({
                        error: 'Suspicious activity detected. Access temporarily blocked.'
                    });
                }

                // Add security headers
                const securityHeaders = {
                    'X-Content-Type-Options': 'nosniff',
                    'X-XSS-Protection': '1; mode=block',
                    'Referrer-Policy': 'strict-origin-when-cross-origin'
                };

                // Allow same-origin iframe embedding for preview functionality
                // Check if this is a preview request or event page that needs iframe embedding
                const isPreviewRequest = req.query.preview === 'true' ||
                    req.query.edit_mode === 'true' ||
                    req.path.startsWith('/event/');

                if (isPreviewRequest) {
                    securityHeaders['X-Frame-Options'] = 'SAMEORIGIN';
                } else {
                    securityHeaders['X-Frame-Options'] = 'DENY';
                }

                res.set(securityHeaders);

                // Store session fingerprint for new sessions — only when the
                // request carries our cookie (see hasSessionCookie).
                if (req.session && req.session.id && this.hasSessionCookie(req) && !this.sessionFingerprints.has(req.session.id)) {
                    this._setBounded(this.sessionFingerprints, req.session.id,
                        { fingerprint: this.createSessionFingerprint(req), lastSeen: Date.now() }, this.maxFingerprints);
                }

                next();
            } catch (error) {
                console.error('🚨 Session security middleware error:', error);
                next(); // Continue despite error to avoid breaking the app
            }
        };
    }

    /**
     * CSRF protection middleware
     */
    csrfProtection() {
        return (req, res, next) => {
            // Skip CSRF for GET requests, API endpoints that don't modify data, and AI agents
            const userAgent = req.headers['user-agent'] || '';
            const isAIAgent = /ChatGPT|GPTBot|Google-Extended|Claude|PerplexityBot|YouBot|anthropic|Applebot-Extended|CCBot|Bard|Gemini|GoogleBot|BingBot|facebookexternalhit|Twitterbot|LinkedInBot/i.test(userAgent);

            if (req.method === 'GET' || req.path.startsWith('/api/monitoring/') || isAIAgent) {
                return next();
            }

            // Check for CSRF token in headers or body
            const token = req.headers['x-csrf-token'] ||
                req.headers['x-xsrf-token'] ||
                req.body._csrf;

            if (!token) {
                console.warn(`🚨 Missing CSRF token for ${req.method} ${req.path} from ${req.ip}`);
                this.securityMetrics.csrfAttempts++;
                return res.status(403).json({
                    error: 'CSRF token required'
                });
            }

            // Validate CSRF token
            if (!this.validateCSRFToken(req, token)) {
                console.warn(`🚨 Invalid CSRF token for ${req.method} ${req.path} from ${req.ip}`);
                this.securityMetrics.csrfAttempts++;
                return res.status(403).json({
                    error: 'Invalid CSRF token'
                });
            }

            next();
        };
    }

    /**
     * Generate CSRF token
     */
    generateCSRFToken(req) {
        if (!req.session) {
            throw new Error('Session required for CSRF token generation');
        }

        const secret = req.session.csrfSecret || crypto.randomBytes(32).toString('hex');
        req.session.csrfSecret = secret;

        const token = crypto
            .createHmac('sha256', secret)
            .update(req.session.id || '')
            .digest('hex');

        return token;
    }

    /**
     * Validate CSRF token
     */
    validateCSRFToken(req, token) {
        if (!req.session || !req.session.csrfSecret) {
            return false;
        }

        const expectedToken = crypto
            .createHmac('sha256', req.session.csrfSecret)
            .update(req.session.id || '')
            .digest('hex');

        return crypto.timingSafeEqual(
            Buffer.from(token, 'hex'),
            Buffer.from(expectedToken, 'hex')
        );
    }

    /**
     * Session cleanup on logout
     */
    cleanupSession(req) {
        if (req.session && req.session.id) {
            // Remove session fingerprint
            this.sessionFingerprints.delete(req.session.id);

            // Clear session data
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session during cleanup:', err);
                }
            });
        }
    }

    /**
     * Get security metrics
     */
    getSecurityMetrics() {
        return {
            ...this.securityMetrics,
            blockedIPs: this.blockedIPs.size,
            activeFingerprints: this.sessionFingerprints.size,
            rateLimitedIPs: this.rateLimiters.size
        };
    }

    /**
     * Admin function to unblock IP
     */
    unblockIP(ip) {
        const wasBlocked = this.blockedIPs.has(ip);
        this.blockedIPs.delete(ip);
        console.log(`🔓 IP ${ip} unblocked by admin`);
        return wasBlocked;
    }

    /**
     * Admin function to get blocked IPs
     */
    getBlockedIPs() {
        const blocked = [];
        const now = Date.now();

        for (const [ip, blockInfo] of this.blockedIPs.entries()) {
            if (now < blockInfo.until) {
                blocked.push({
                    ip,
                    reason: blockInfo.reason,
                    blockedUntil: new Date(blockInfo.until),
                    remainingTime: Math.ceil((blockInfo.until - now) / 1000)
                });
            } else {
                // Clean up expired blocks
                this.blockedIPs.delete(ip);
            }
        }

        return blocked;
    }

    /**
     * Periodic cleanup of old data
     */
    startCleanupScheduler() {
        // Idempotent and unref'd: server.js calls this once at boot (it was
        // never called before, so cleanupOldData never ran). unref so the
        // timer cannot keep a shutting-down process alive.
        if (this.cleanupTimer) return this.cleanupTimer;
        this.cleanupTimer = setInterval(() => {
            try { this.cleanupOldData(); } catch (err) {
                console.error('🚨 Session security cleanup failed:', err && err.message);
            }
        }, 60 * 60 * 1000); // Every hour
        if (typeof this.cleanupTimer.unref === 'function') this.cleanupTimer.unref();
        return this.cleanupTimer;
    }

    /**
     * Clean up old fingerprints and rate limiters
     */
    cleanupOldData() {
        const now = Date.now();
        const oneHourAgo = now - 60 * 60 * 1000;
        // A fingerprint older than the session TTL belongs to an expired session.
        const fingerprintTtlMs = (Number(env.SESSION_TTL) || 24 * 60 * 60) * 1000;

        // Clean up old rate limiters
        for (const [ip, activity] of this.rateLimiters.entries()) {
            if (activity.firstSeen < oneHourAgo) {
                this.rateLimiters.delete(ip);
            }
        }

        // Clean up fingerprints of expired sessions
        for (const [sid, entry] of this.sessionFingerprints.entries()) {
            if (!entry || typeof entry !== 'object' || (now - (entry.lastSeen || 0)) > fingerprintTtlMs) {
                this.sessionFingerprints.delete(sid);
            }
        }

        // Clean up expired IP blocks
        for (const [ip, blockInfo] of this.blockedIPs.entries()) {
            if (now >= blockInfo.until) {
                this.blockedIPs.delete(ip);
            }
        }

        console.log(`🧹 Session security cleanup: ${this.rateLimiters.size} rate limiters, ${this.sessionFingerprints.size} fingerprints, ${this.blockedIPs.size} blocked IPs`);
    }
}

module.exports = new SessionSecurityService();