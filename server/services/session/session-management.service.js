const sessionStore = require('./session-store.service');
const sessionSecurity = require('./session-security.service');
const env = require('../../env');

class SessionManagementService {
    constructor() {
        this.managementMetrics = {
            sessionsCreated: 0,
            sessionsDestroyed: 0,
            adminActions: 0,
            cleanupRuns: 0
        };
        
        this.startPeriodicCleanup();
    }

    /**
     * Create a new session with security features
     */
    async createSession(req, userData = {}) {
        try {
            // Ensure session exists
            if (!req.session) {
                throw new Error('Session middleware not properly configured');
            }

            // Store user data in session
            req.session.user = userData;
            req.session.createdAt = new Date().toISOString();
            req.session.lastActivity = new Date().toISOString();
            req.session.ipAddress = req.ip;
            req.session.userAgent = req.headers['user-agent'];

            // Generate CSRF token
            const csrfToken = sessionSecurity.generateCSRFToken(req);
            req.session.csrfToken = csrfToken;

            // Create session fingerprint
            const fingerprint = sessionSecurity.createSessionFingerprint(req);
            req.session.fingerprint = fingerprint;

            this.managementMetrics.sessionsCreated++;

            console.log(`✅ Session created for user ${userData.id || 'anonymous'}: ${req.session.id}`);

            return {
                sessionId: req.session.id,
                csrfToken,
                expiresAt: new Date(Date.now() + (env.SESSION_TTL * 1000)).toISOString()
            };
        } catch (error) {
            console.error('🚨 Error creating session:', error);
            throw error;
        }
    }

    /**
     * Update session activity
     */
    updateSessionActivity(req) {
        if (req.session) {
            req.session.lastActivity = new Date().toISOString();
            req.session.touch(); // Update session TTL
        }
    }

    /**
     * Destroy session with cleanup
     */
    async destroySession(req, reason = 'logout') {
        try {
            if (!req.session) {
                return;
            }

            const sessionId = req.session.id;
            const userId = req.session.user?.id;

            // Clean up security data
            sessionSecurity.cleanupSession(req);

            // Destroy session
            await new Promise((resolve, reject) => {
                req.session.destroy((error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });

            this.managementMetrics.sessionsDestroyed++;

            console.log(`✅ Session destroyed for user ${userId || 'anonymous'}: ${sessionId} (${reason})`);
        } catch (error) {
            console.error('🚨 Error destroying session:', error);
            throw error;
        }
    }

    /**
     * Get session information
     */
    async getSessionInfo(sessionId) {
        try {
            const sessionData = await sessionStore.getSession(sessionId);
            
            if (!sessionData) {
                return null;
            }

            return {
                id: sessionId,
                userId: sessionData.user?.id,
                createdAt: sessionData.createdAt,
                lastActivity: sessionData.lastActivity,
                ipAddress: sessionData.ipAddress,
                userAgent: sessionData.userAgent,
                isExpired: this.isSessionExpired(sessionData)
            };
        } catch (error) {
            console.error(`🚨 Error getting session info for ${sessionId}:`, error);
            return null;
        }
    }

    /**
     * Check if session is expired
     */
    isSessionExpired(sessionData) {
        if (!sessionData.lastActivity) {
            return true;
        }

        const lastActivity = new Date(sessionData.lastActivity);
        const expirationTime = new Date(lastActivity.getTime() + (env.SESSION_TTL * 1000));
        
        return Date.now() > expirationTime.getTime();
    }

    /**
     * Admin: Get all active sessions
     */
    async getAllActiveSessions() {
        try {
            this.managementMetrics.adminActions++;
            
            const allSessions = await sessionStore.getAllSessions();
            const activeSessions = [];

            for (const session of allSessions) {
                if (!this.isSessionExpired(session)) {
                    activeSessions.push({
                        id: session.id,
                        userId: session.user?.id,
                        userEmail: session.user?.email,
                        createdAt: session.createdAt,
                        lastActivity: session.lastActivity,
                        ipAddress: session.ipAddress,
                        userAgent: session.userAgent?.substring(0, 100) + '...' // Truncate for display
                    });
                }
            }

            return activeSessions.sort((a, b) => 
                new Date(b.lastActivity) - new Date(a.lastActivity)
            );
        } catch (error) {
            console.error('🚨 Error getting all active sessions:', error);
            return [];
        }
    }

    /**
     * Admin: Force destroy session
     */
    async forceDestroySession(sessionId, adminUserId, reason = 'admin_action') {
        try {
            this.managementMetrics.adminActions++;
            
            await sessionStore.destroySession(sessionId);
            
            console.log(`🔨 Session ${sessionId} force destroyed by admin ${adminUserId} (${reason})`);
            
            return true;
        } catch (error) {
            console.error(`🚨 Error force destroying session ${sessionId}:`, error);
            return false;
        }
    }

    /**
     * Admin: Destroy all sessions for a user
     */
    async destroyUserSessions(userId, adminUserId, reason = 'admin_action') {
        try {
            this.managementMetrics.adminActions++;
            
            const allSessions = await sessionStore.getAllSessions();
            let destroyedCount = 0;

            for (const session of allSessions) {
                if (session.user?.id === userId) {
                    await sessionStore.destroySession(session.id);
                    destroyedCount++;
                }
            }

            console.log(`🔨 ${destroyedCount} sessions destroyed for user ${userId} by admin ${adminUserId} (${reason})`);
            
            return destroyedCount;
        } catch (error) {
            console.error(`🚨 Error destroying sessions for user ${userId}:`, error);
            return 0;
        }
    }

    /**
     * Admin: Get session statistics
     */
    async getSessionStatistics() {
        try {
            this.managementMetrics.adminActions++;
            
            const allSessions = await sessionStore.getAllSessions();
            const now = Date.now();
            const oneHourAgo = now - (60 * 60 * 1000);
            const oneDayAgo = now - (24 * 60 * 60 * 1000);
            const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

            const stats = {
                total: allSessions.length,
                active: 0,
                expired: 0,
                lastHour: 0,
                lastDay: 0,
                lastWeek: 0,
                byUserAgent: {},
                byIP: {},
                averageSessionDuration: 0
            };

            let totalDuration = 0;
            let validDurationCount = 0;

            for (const session of allSessions) {
                const lastActivity = new Date(session.lastActivity || session.createdAt);
                const createdAt = new Date(session.createdAt);
                const lastActivityTime = lastActivity.getTime();

                if (this.isSessionExpired(session)) {
                    stats.expired++;
                } else {
                    stats.active++;
                }

                if (lastActivityTime > oneHourAgo) stats.lastHour++;
                if (lastActivityTime > oneDayAgo) stats.lastDay++;
                if (lastActivityTime > oneWeekAgo) stats.lastWeek++;

                // User agent stats
                const userAgent = session.userAgent || 'Unknown';
                const browser = this.extractBrowser(userAgent);
                stats.byUserAgent[browser] = (stats.byUserAgent[browser] || 0) + 1;

                // IP stats
                const ip = session.ipAddress || 'Unknown';
                stats.byIP[ip] = (stats.byIP[ip] || 0) + 1;

                // Duration calculation
                if (session.createdAt && session.lastActivity) {
                    const duration = lastActivityTime - createdAt.getTime();
                    if (duration > 0) {
                        totalDuration += duration;
                        validDurationCount++;
                    }
                }
            }

            if (validDurationCount > 0) {
                stats.averageSessionDuration = Math.round(totalDuration / validDurationCount / 1000 / 60); // minutes
            }

            return stats;
        } catch (error) {
            console.error('🚨 Error getting session statistics:', error);
            return null;
        }
    }

    /**
     * Extract browser from user agent
     */
    extractBrowser(userAgent) {
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        if (userAgent.includes('Opera')) return 'Opera';
        return 'Other';
    }

    /**
     * Cleanup expired sessions
     */
    async cleanupExpiredSessions() {
        try {
            this.managementMetrics.cleanupRuns++;
            
            const allSessions = await sessionStore.getAllSessions();
            let cleanedCount = 0;

            for (const session of allSessions) {
                if (this.isSessionExpired(session)) {
                    await sessionStore.destroySession(session.id);
                    cleanedCount++;
                }
            }

            if (cleanedCount > 0) {
                console.log(`🧹 Cleaned up ${cleanedCount} expired sessions`);
            }

            return cleanedCount;
        } catch (error) {
            console.error('🚨 Error during session cleanup:', error);
            return 0;
        }
    }

    /**
     * Start periodic cleanup
     */
    startPeriodicCleanup() {
        // Run cleanup every 30 minutes
        setInterval(() => {
            this.cleanupExpiredSessions();
        }, 30 * 60 * 1000);

        // Initial cleanup after 5 minutes
        setTimeout(() => {
            this.cleanupExpiredSessions();
        }, 5 * 60 * 1000);

        console.log('🧹 Session cleanup scheduler started');
    }

    /**
     * Get management metrics
     */
    getManagementMetrics() {
        return {
            ...this.managementMetrics,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Session middleware for automatic activity tracking
     */
    activityTrackingMiddleware() {
        return (req, res, next) => {
            if (req.session && req.session.user) {
                this.updateSessionActivity(req);
            }
            next();
        };
    }

    /**
     * Health check for session management
     */
    async healthCheck() {
        try {
            const storeHealth = await sessionStore.healthCheck();
            const securityMetrics = sessionSecurity.getSecurityMetrics();
            const managementMetrics = this.getManagementMetrics();

            return {
                status: storeHealth.status,
                components: {
                    store: storeHealth,
                    security: {
                        status: securityMetrics.blockedIPs > 10 ? 'warning' : 'healthy',
                        metrics: securityMetrics
                    },
                    management: {
                        status: 'healthy',
                        metrics: managementMetrics
                    }
                }
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                error: error.message
            };
        }
    }
}

module.exports = new SessionManagementService();
