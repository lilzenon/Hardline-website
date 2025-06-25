const session = require('express-session');
const env = require('../../env');

// Session store implementations
let RedisStore, FileStore;

// Try to load Redis store if available
try {
    const ConnectRedis = require('connect-redis');
    RedisStore = ConnectRedis(session);
} catch (error) {
    console.warn('⚠️ connect-redis not available, Redis session store disabled');
}

// Try to load File store as fallback
try {
    FileStore = require('session-file-store')(session);
} catch (error) {
    console.warn('⚠️ session-file-store not available, using memory store fallback');
}

class SessionStoreService {
    constructor() {
        this.store = null;
        this.storeType = 'memory';
        this.metrics = {
            activeSessions: 0,
            totalSessions: 0,
            errors: 0,
            cleanupRuns: 0
        };
        
        this.initializeStore();
        this.startCleanupScheduler();
    }

    /**
     * Initialize the appropriate session store
     */
    initializeStore() {
        const redis = require('../../redis');
        
        // Try Redis store first (preferred for production)
        if (env.REDIS_ENABLED && redis.client && RedisStore) {
            try {
                this.store = new RedisStore({
                    client: redis.client,
                    prefix: 'sess:',
                    ttl: this.getSessionTTL(),
                    disableTouch: false,
                    disableTTL: false,
                    logErrors: (error) => {
                        console.error('🚨 Redis session store error:', error);
                        this.metrics.errors++;
                    }
                });
                this.storeType = 'redis';
                console.log('✅ Redis session store initialized');
                return;
            } catch (error) {
                console.error('🚨 Failed to initialize Redis session store:', error);
            }
        }

        // Fallback to file store for production without Redis
        if (FileStore && env.NODE_ENV === 'production') {
            try {
                this.store = new FileStore({
                    path: './sessions',
                    ttl: this.getSessionTTL(),
                    retries: 3,
                    factor: 2,
                    minTimeout: 50,
                    maxTimeout: 100,
                    reapInterval: 3600, // Clean up every hour
                    reapMaxConcurrent: 10,
                    reapAsync: true,
                    reapSyncFallback: false,
                    logFn: (message) => {
                        if (message.includes('ERROR')) {
                            console.error('🚨 File session store error:', message);
                            this.metrics.errors++;
                        }
                    }
                });
                this.storeType = 'file';
                console.log('✅ File session store initialized');
                return;
            } catch (error) {
                console.error('🚨 Failed to initialize file session store:', error);
            }
        }

        // Final fallback to memory store (development only)
        console.warn('⚠️ Using memory session store - NOT suitable for production');
        this.storeType = 'memory';
        this.store = null; // Express will use default MemoryStore
    }

    /**
     * Get session TTL in seconds
     */
    getSessionTTL() {
        return env.SESSION_TTL || 24 * 60 * 60; // 24 hours default
    }

    /**
     * Get session configuration for Express
     */
    getSessionConfig() {
        const config = {
            name: env.SESSION_NAME || 'kutt.sid',
            secret: this.getSessionSecrets(),
            resave: false,
            saveUninitialized: false,
            rolling: true, // Reset expiration on activity
            cookie: {
                secure: env.NODE_ENV === 'production' && env.CUSTOM_DOMAIN_USE_HTTPS,
                httpOnly: true,
                maxAge: this.getSessionTTL() * 1000, // Convert to milliseconds
                sameSite: env.NODE_ENV === 'production' ? 'strict' : 'lax'
            },
            proxy: env.TRUST_PROXY || false
        };

        // Add store if available
        if (this.store) {
            config.store = this.store;
        }

        return config;
    }

    /**
     * Get session secrets with rotation support
     */
    getSessionSecrets() {
        const secrets = [];
        
        // Current secret
        if (env.SESSION_SECRET) {
            secrets.push(env.SESSION_SECRET);
        }
        
        // Fallback to JWT secret
        secrets.push(env.JWT_SECRET);
        
        // Old secrets for rotation (if provided)
        if (env.SESSION_SECRET_OLD) {
            secrets.push(env.SESSION_SECRET_OLD);
        }

        return secrets;
    }

    /**
     * Get session store metrics
     */
    async getMetrics() {
        const metrics = { ...this.metrics, storeType: this.storeType };

        try {
            if (this.storeType === 'redis' && this.store) {
                // Get Redis-specific metrics
                const redis = require('../../redis');
                if (redis.client) {
                    const keys = await redis.client.keys('sess:*');
                    metrics.activeSessions = keys.length;
                }
            } else if (this.storeType === 'file' && this.store) {
                // Get file store metrics
                metrics.activeSessions = await new Promise((resolve) => {
                    this.store.length((err, length) => {
                        resolve(err ? 0 : length);
                    });
                });
            }
        } catch (error) {
            console.error('🚨 Error getting session metrics:', error);
            metrics.errors++;
        }

        return metrics;
    }

    /**
     * Clean up expired sessions
     */
    async cleanupSessions() {
        try {
            this.metrics.cleanupRuns++;
            
            if (this.storeType === 'redis' && this.store) {
                // Redis handles TTL automatically, but we can clean up orphaned keys
                const redis = require('../../redis');
                if (redis.client) {
                    const keys = await redis.client.keys('sess:*');
                    console.log(`🧹 Redis session cleanup: ${keys.length} active sessions`);
                }
            } else if (this.storeType === 'file' && this.store) {
                // File store has built-in cleanup via reapInterval
                console.log('🧹 File session cleanup triggered');
            }
        } catch (error) {
            console.error('🚨 Session cleanup error:', error);
            this.metrics.errors++;
        }
    }

    /**
     * Start periodic cleanup scheduler
     */
    startCleanupScheduler() {
        // Run cleanup every hour
        setInterval(() => {
            this.cleanupSessions();
        }, 60 * 60 * 1000);

        // Initial cleanup after 5 minutes
        setTimeout(() => {
            this.cleanupSessions();
        }, 5 * 60 * 1000);
    }

    /**
     * Destroy a specific session
     */
    async destroySession(sessionId) {
        return new Promise((resolve, reject) => {
            if (!this.store) {
                return resolve(); // Memory store doesn't support manual destroy
            }

            this.store.destroy(sessionId, (error) => {
                if (error) {
                    console.error(`🚨 Error destroying session ${sessionId}:`, error);
                    this.metrics.errors++;
                    reject(error);
                } else {
                    console.log(`✅ Session ${sessionId} destroyed`);
                    resolve();
                }
            });
        });
    }

    /**
     * Get session data
     */
    async getSession(sessionId) {
        return new Promise((resolve, reject) => {
            if (!this.store) {
                return resolve(null); // Memory store doesn't support manual get
            }

            this.store.get(sessionId, (error, session) => {
                if (error) {
                    console.error(`🚨 Error getting session ${sessionId}:`, error);
                    this.metrics.errors++;
                    reject(error);
                } else {
                    resolve(session);
                }
            });
        });
    }

    /**
     * Get all active sessions (admin function)
     */
    async getAllSessions() {
        return new Promise((resolve, reject) => {
            if (!this.store) {
                return resolve([]); // Memory store doesn't support listing
            }

            if (this.storeType === 'redis') {
                // For Redis, we need to manually get all session keys
                const redis = require('../../redis');
                redis.client.keys('sess:*')
                    .then(keys => {
                        const sessionPromises = keys.map(key => {
                            const sessionId = key.replace('sess:', '');
                            return this.getSession(sessionId).catch(() => null);
                        });
                        return Promise.all(sessionPromises);
                    })
                    .then(sessions => resolve(sessions.filter(s => s !== null)))
                    .catch(reject);
            } else if (this.store.all) {
                // File store supports listing all sessions
                this.store.all((error, sessions) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(Object.values(sessions || {}));
                    }
                });
            } else {
                resolve([]);
            }
        });
    }

    /**
     * Health check for session store
     */
    async healthCheck() {
        try {
            const metrics = await this.getMetrics();
            
            return {
                status: this.storeType === 'memory' && env.NODE_ENV === 'production' ? 'warning' : 'healthy',
                storeType: this.storeType,
                activeSessions: metrics.activeSessions,
                errors: metrics.errors,
                message: this.storeType === 'memory' && env.NODE_ENV === 'production' 
                    ? 'Using memory store in production - not recommended'
                    : 'Session store operating normally'
            };
        } catch (error) {
            return {
                status: 'unhealthy',
                storeType: this.storeType,
                error: error.message,
                message: 'Session store health check failed'
            };
        }
    }
}

module.exports = new SessionStoreService();
