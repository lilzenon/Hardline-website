const helmet = require('helmet');
const env = require('../env');

/**
 * Comprehensive Security Headers Middleware
 * Implements all security headers while preserving existing functionality
 */

/**
 * Content Security Policy configuration
 * Allows necessary resources while preventing XSS attacks
 */
function getCSPDirectives() {
    const isProduction = env.NODE_ENV === 'production';
    const siteUrl = env.SITE_URL || 'http://localhost:3000';
    const domain = new URL(siteUrl).hostname;

    return {
        defaultSrc: ["'self'"],

        // Scripts: Allow self, inline scripts for React, and trusted CDNs
        scriptSrc: [
            "'self'",
            "'unsafe-inline'", // Required for React inline scripts
            "'unsafe-eval'", // Required for React development
            "https://cdn.jsdelivr.net",
            "https://unpkg.com",
            "https://cdnjs.cloudflare.com",
            "https://www.googletagmanager.com",
            "https://www.google-analytics.com",
            "https://static.cloudflareinsights.com", // Allow Cloudflare Insights analytics
            "https://laylo.com", // Allow Laylo main domain scripts
            "https://*.laylo.com", // Allow all Laylo subdomain scripts
            "https://embed.laylo.com", // Allow Laylo embed scripts and SDK
            "https://api.laylo.com", // Allow Laylo API scripts
            "https://cdn.laylo.com", // Allow Laylo CDN scripts
            "https://www.google.com", // Allow Google reCAPTCHA for Laylo
            "https://www.gstatic.com", // Allow Google static resources
            "https://recaptcha.google.com", // Allow reCAPTCHA scripts
            "https://connect.facebook.net", // Allow Facebook Pixel
            "https://www.facebook.com", // Allow Facebook scripts
            ...(isProduction ? [] : ["'unsafe-eval'"]) // Allow eval in development only
        ],

        // Script attributes: Allow inline event handlers for React components
        scriptSrcAttr: [
            "'unsafe-inline'" // Required for React inline event handlers
        ],

        // Styles: Allow self, inline styles, and trusted CDNs
        styleSrc: [
            "'self'",
            "'unsafe-inline'", // Required for styled-components and inline styles
            "https://fonts.googleapis.com",
            "https://api.fontshare.com", // Allow Fontshare CSS for Clash Grotesk
            "https://cdn.jsdelivr.net",
            "https://cdnjs.cloudflare.com",
            "https://laylo.com", // Allow Laylo CSS
            "https://*.laylo.com", // Allow all Laylo subdomain CSS
            "https://embed.laylo.com", // Allow Laylo embed CSS
            "https://api.laylo.com", // Allow Laylo API CSS
            "https://cdn.laylo.com" // Allow Laylo CDN CSS
        ],

        // Images: Allow self, data URLs, and trusted domains
        imgSrc: [
            "'self'",
            "data:",
            "blob:",
            "https:",
            "http:", // Allow HTTP images for development
            "https://images.unsplash.com",
            "https://via.placeholder.com",
            "https://picsum.photos",
            "https://img.youtube.com", // Allow YouTube thumbnails
            "https://i.ytimg.com", // Allow YouTube thumbnail CDN
            "https://i1.ytimg.com", // Allow YouTube thumbnail variants
            "https://i2.ytimg.com",
            "https://i3.ytimg.com",
            "https://i4.ytimg.com"
        ],

        // Fonts: Allow self and Google Fonts
        fontSrc: [
            "'self'",
            "data:",
            "https://fonts.gstatic.com",
            "https://api.fontshare.com", // Allow Fontshare fonts for Clash Grotesk
            "https://cdn.fontshare.com", // Allow Fontshare CDN fonts
            "https://cdn.jsdelivr.net"
        ],

        // Connect: Allow self and API endpoints
        connectSrc: [
            "'self'",
            siteUrl,
            "https://api.twilio.com",
            "https://www.google-analytics.com",
            "https://analytics.google.com",
            "https://fonts.googleapis.com", // Allow Google Fonts CSS loading
            "https://cdn.jsdelivr.net", // Allow jsDelivr CDN for react-simple-maps
            "https://laylo.com", // Allow Laylo main domain
            "https://*.laylo.com", // Allow all Laylo subdomains
            "https://embed.laylo.com", // Allow Laylo embed connections
            "https://api.laylo.com", // Allow Laylo API subdomain
            "https://app.laylo.com", // Allow Laylo app subdomain
            "https://cdn.laylo.com", // Allow Laylo CDN
            "https://d21i0hc4hl3bvt.cloudfront.net", // Allow Laylo CloudFront
            "https://d3oyaxbt9vo0fg.cloudfront.net", // Allow Laylo CloudFront
            "https://www.google.com", // Allow Google reCAPTCHA for Laylo
            "https://www.gstatic.com", // Allow Google static resources for reCAPTCHA
            "https://recaptcha.google.com", // Allow reCAPTCHA API
            "https://admin.b2b.click", // Allow analytics dashboard connections
            "https://beta.b2b.click", // Allow beta dashboard API connections
            "https://ipapi.co", // Allow location API for analytics
            "https://connect.facebook.net", // Allow Facebook Pixel connections
            "https://www.facebook.com", // Allow Facebook API connections
            ...(isProduction ? [] : ["ws://localhost:*", "http://localhost:*"])
        ],

        // Media: Allow self and trusted sources
        mediaSrc: [
            "'self'",
            "data:",
            "blob:",
            "https:"
        ],

        // Objects: Restrict to self only
        objectSrc: ["'none'"],

        // Base URI: Restrict to self
        baseUri: ["'self'"],

        // Form actions: Allow self and trusted domains
        formAction: [
            "'self'",
            "https://accounts.google.com",
            "https://appleid.apple.com"
        ],

        // Frame ancestors: Allow same origin for preview functionality
        frameAncestors: [
            "'self'",
            "https://embed.laylo.com", // Allow Laylo embed frames
            "https://laylo.com", // Allow Laylo frames
            "https://*.laylo.com" // Allow all Laylo subdomains
        ],

        // Frame sources: Allow self and trusted iframe sources
        frameSrc: [
            "'self'",
            "https://www.youtube.com",
            "https://player.vimeo.com",
            "https://www.google.com", // For reCAPTCHA if used
            "https://embed.laylo.com", // Allow Laylo embed iframes
            "https://laylo.com", // Allow Laylo iframes
            "https://*.laylo.com" // Allow all Laylo subdomains
        ],

        // Worker sources: Allow self and blob for web workers
        workerSrc: [
            "'self'",
            "blob:"
        ],

        // Manifest source: Allow self
        manifestSrc: ["'self'"],

        // Upgrade insecure requests in production
        ...(isProduction && { upgradeInsecureRequests: [] })
    };
}

/**
 * Security headers middleware configuration
 */
function createSecurityMiddleware() {
    const isProduction = env.NODE_ENV === 'production';

    return helmet({
        // Content Security Policy
        contentSecurityPolicy: {
            directives: {
                ...getCSPDirectives(),
                // Add CSP violation reporting
                reportUri: ['/api/security/csp-violation']
            },
            reportOnly: false, // Set to true for testing, false for enforcement
        },

        // HTTP Strict Transport Security (HSTS)
        hsts: {
            maxAge: 31536000, // 1 year
            includeSubDomains: true,
            preload: true
        },

        // X-Content-Type-Options
        noSniff: true,

        // X-Frame-Options (handled dynamically in session security)
        frameguard: false, // Disabled here, handled in session-security.service.js

        // X-XSS-Protection (legacy but still useful)
        xssFilter: true,

        // Referrer Policy
        referrerPolicy: {
            policy: "strict-origin-when-cross-origin"
        },

        // X-Permitted-Cross-Domain-Policies
        permittedCrossDomainPolicies: false,

        // X-DNS-Prefetch-Control
        dnsPrefetchControl: {
            allow: false
        },

        // Expect-CT (Certificate Transparency)
        expectCt: isProduction ? {
            maxAge: 86400, // 24 hours
            enforce: true
        } : false,

        // Cross-Origin-Embedder-Policy
        crossOriginEmbedderPolicy: false, // Disabled to allow iframe embedding

        // Cross-Origin-Opener-Policy
        crossOriginOpenerPolicy: {
            policy: "same-origin"
        },

        // Cross-Origin-Resource-Policy
        crossOriginResourcePolicy: {
            policy: "cross-origin" // Allow cross-origin requests for API
        },

        // Origin-Agent-Cluster
        originAgentCluster: true,

        // Hide X-Powered-By header
        hidePoweredBy: true,

        // Permissions Policy handled by permissionsPolicyHeaders() middleware below
        // Avoid setting it here to prevent duplicate/overridden headers
    });
}

/**
 * Additional security headers for API endpoints
 */
function apiSecurityHeaders() {
    return (req, res, next) => {
        // Additional headers for API endpoints
        if (req.path.startsWith('/api/')) {
            res.setHeader('X-API-Version', '2.0');
            res.setHeader('X-Rate-Limit-Policy', 'standard');

            // Prevent caching of sensitive API responses
            if (req.path.includes('/auth/') || req.path.includes('/admin/')) {
                res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
                res.setHeader('Pragma', 'no-cache');
                res.setHeader('Expires', '0');
            }
        }
        next();
    };
}

/**
 * Security headers for static assets
 */
function staticAssetHeaders() {
    return (req, res, next) => {
        // Cache control for static assets
        if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
        next();
    };
}

/**
 * Permissions Policy middleware for iframe features
 */
function permissionsPolicyHeaders() {
    return (req, res, next) => {
        // Set Permissions-Policy to enable required features for trusted third-party embeds
        // Allow minimal set of features for Laylo and YouTube while denying others by default
        const policy = [
            'camera=()',
            'microphone=()',
            // Geolocation allowed only on self (not used by Laylo, kept strict)
            'geolocation=(self)',
            // Autoplay/Encrypted Media/Fullscreen permitted for Laylo + YouTube embeds
            'autoplay=(self "https://embed.laylo.com" "https://laylo.com" "https://www.youtube.com" "https://youtube.com")',
            'encrypted-media=(self "https://embed.laylo.com" "https://laylo.com" "https://www.youtube.com" "https://youtube.com")',
            'fullscreen=(self "https://embed.laylo.com" "https://laylo.com" "https://www.youtube.com" "https://youtube.com")',
            // Picture-in-picture used by YouTube on Safari
            'picture-in-picture=(self "https://www.youtube.com" "https://youtube.com")',
            // Web Share for Laylo flows and YouTube
            'web-share=(self "https://embed.laylo.com" "https://laylo.com" "https://www.youtube.com" "https://youtube.com")'
        ].join(', ');
        res.setHeader('Permissions-Policy', policy);
        next();
    };
}

/**
 * Development-specific security adjustments
 */
function developmentSecurityAdjustments() {
    return (req, res, next) => {
        if (env.NODE_ENV !== 'production') {
            // Allow webpack dev server in development
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
        next();
    };
}

module.exports = {
    createSecurityMiddleware,
    apiSecurityHeaders,
    staticAssetHeaders,
    developmentSecurityAdjustments,
    permissionsPolicyHeaders,
    getCSPDirectives
};