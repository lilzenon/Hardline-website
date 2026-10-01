const session = require('express-session');
const env = require('../../env');

// Session store implementations
let RedisStore, FileStore, redisClient;

// Try to load Redis store if available
try {
    // connect-redis v9 ships ESM + CJS; the CJS build exposes the class on
    // `.default` and as a named export depending on bundler. Accept any.
    const connectRedisModule = require('connect-redis');
    const ConnectRedis = connectRedisModule.default || connectRedisModule.RedisStore || connectRedisModule;

    // Import Redis client (using ioredis)
    const Redis = require('ioredis');

    // Create Redis client if Redis is enabled
    if (env.REDIS_ENABLED) {
        // Deliberately tighter than the shared ./redis.js client: that one
        // runs maxRetriesPerRequest=null (a BullMQ requirement), which would
        // make a session GET hang for its full 15 s commandTimeout during an
        // outage. Sessions must fail fast so the resilient wrapper below can
        // degrade instead of stalling the request.
        const clientOptions = {
            retryDelayOnFailover: 100,
            maxRetriesPerRequest: 3,
            lazyConnect: true, // we call connect() explicitly below
            connectTimeout: 5000,
            commandTimeout: 5000,
            enableOfflineQueue: true,
            connectionName: 'kutt-sessions'
        };
        // REDIS_URL first (DigitalOcean -> managed Redis), mirroring ./redis.js.
        // The old code read only REDIS_HOST/PORT, so on a URL-only deploy the
        // session client pointed at localhost and silently fell back to memory.
        redisClient = env.REDIS_URL && env.REDIS_URL.trim() !== ''
            ? new Redis(env.REDIS_URL, clientOptions)
            : new Redis({
                host: env.REDIS_HOST || 'localhost',
                port: env.REDIS_PORT || 6379,
                password: env.REDIS_PASSWORD || undefined,
                db: env.REDIS_DB || 0,
                ...(env.REDIS_TLS ? { tls: {} } : {}),
                ...clientOptions
            });
        // ioredis emits 'error' events; without a listener each one is logged
        // as an unhandled event. Store-level failures are logged by the wrapper.
        redisClient.on('error', (err) => {
            console.error('🚨 Redis session client error:', err && err.message);
        });

        RedisStore = ConnectRedis;
    } else {
        console.log('ℹ️ Redis disabled via REDIS_ENABLED=false');
    }
} catch (error) {
    console.warn('⚠️ connect-redis not available, Redis session store disabled:', error.message);
}

/**
 * node-redis-v5-shaped facade over an ioredis client, covering exactly the
 * calls connect-redis v9 makes.
 *
 * WHY: connect-redis 9 targets node-redis 5 — `set(key, val, { expiration:
 * { type: 'EX', value } })`, `mGet(keys)`, `scanIterator({ MATCH, COUNT })`
 * yielding key batches — while this app standardises on ioredis. Handed the
 * raw ioredis client, every session save fails with "ERR syntax error"
 * (ioredis stringifies the options object as a third SET argument) and the
 * admin listing helpers throw on the missing camelCase methods. No new
 * dependency: translating six calls is all that is needed.
 */
function nodeRedisFacade(client) {
    return {
        get: (key) => client.get(key),
        set: (key, val, opts) => {
            let ttl = null;
            if (opts && opts.expiration && opts.expiration.type === 'EX') ttl = opts.expiration.value;
            else if (opts && typeof opts.EX === 'number') ttl = opts.EX;
            return ttl != null ? client.set(key, val, 'EX', ttl) : client.set(key, val);
        },
        expire: (key, ttl) => client.expire(key, ttl),
        del: (keys) => client.del(...(Array.isArray(keys) ? keys : [keys])),
        mGet: (keys) => client.mget(...keys),
        scanIterator: async function* ({ MATCH, COUNT }) {
            let cursor = '0';
            do {
                const [next, keys] = await client.scan(cursor, 'MATCH', MATCH, 'COUNT', COUNT);
                cursor = String(next);
                if (keys.length) yield keys;
            } while (cursor !== '0');
        },
    };
}

/**
 * Thin delegate around connect-redis that turns a Redis outage into "no
 * session" instead of a failed request.
 *
 * express-session calls next(err) when store.get fails (every cookie-bearing
 * request would 500 while Redis is down), and when store.set fails on
 * response end it calls next(err) AFTER headers were sent, which then trips
 * the error handler on a finished response. Public visitors do not depend on
 * sessions, so degrading is strictly better than failing. Errors are counted
 * in metrics and logged at most once per 10 s.
 */
class ResilientSessionStore extends session.Store {
    constructor(inner, metrics) {
        super();
        this.inner = inner;
        this.metrics = metrics;
        this.lastErrorLogAt = 0;
    }

    _degrade(op, err) {
        this.metrics.errors++;
        const now = Date.now();
        if (now - this.lastErrorLogAt > 10000) {
            this.lastErrorLogAt = now;
            console.error(`🚨 Redis session store ${op} failed (degrading to no session, request continues):`, err && err.message);
        }
    }

    get(sid, cb) {
        this.inner.get(sid, (err, sess) => {
            if (err) { this._degrade('get', err); return cb(null, null); }
            cb(null, sess);
        });
    }

    set(sid, sess, cb) {
        this.inner.set(sid, sess, (err) => {
            if (err) this._degrade('set', err);
            if (cb) cb(null);
        });
    }

    touch(sid, sess, cb) {
        this.inner.touch(sid, sess, (err) => {
            if (err) this._degrade('touch', err);
            if (cb) cb(null);
        });
    }

    destroy(sid, cb) {
        this.inner.destroy(sid, (err) => {
            if (err) this._degrade('destroy', err);
            if (cb) cb(null);
        });
    }

    // Admin/metrics helpers: errors surface to the caller here on purpose.
    all(cb) { return this.inner.all(cb); }
    length(cb) { return this.inner.length(cb); }
    clear(cb) { return this.inner.clear(cb); }
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

        // Initialize store SYNCHRONOUSLY (see initializeRedisStore for why)
        this.initializeStore();
        this.startCleanupScheduler();
    }

    /**
     * Initialize the appropriate session store
     */
    initializeStore() {
        // Redis when configured; MemoryStore/file only when it is NOT.
        if (env.REDIS_ENABLED && redisClient && RedisStore) {
            this.initializeRedisStore();
            return;
        }

        // Initialize fallback store synchronously
        this.initializeFallbackStore();
    }

    /**
     * Build the Redis store synchronously.
     *
     * WHY: this used to `await redisClient.connect()` first, but server.js
     * calls getSessionConfig() synchronously at boot — the store was still
     * null at that moment, so express-session silently used MemoryStore for
     * the WHOLE process lifetime (unbounded growth, sessions lost on deploy)
     * even though Redis was configured and healthy. connect-redis only issues
     * commands on first use and ioredis queues them until connected, so the
     * store can exist before the socket does.
     */
    initializeRedisStore() {
        const inner = new RedisStore({
            client: nodeRedisFacade(redisClient),
            prefix: 'sess:',
            ttl: this.getSessionTTL(),
            disableTouch: false,
            disableTTL: false
        });
        this.store = new ResilientSessionStore(inner, this.metrics);
        this.storeType = 'redis';
        console.log('✅ Session store active: Redis (connect-redis, prefix "sess:")');

        // Connect eagerly in the background so the first real request does not
        // pay the handshake. Failure is logged, never fatal: the resilient
        // wrapper degrades reads to "no session" until Redis is reachable.
        redisClient.connect()
            .then(() => redisClient.ping())
            .then(() => console.log('✅ Redis session store connected'))
            .catch((error) => {
                // ioredis throws if connect() races an auto-connect; harmless.
                if (error && /already/i.test(String(error.message))) return;
                this.metrics.errors++;
                console.error('🚨 Redis session store not reachable yet (sessions degrade until it is):', error && error.message);
            });
    }

    initializeFallbackStore() {
        // For development/localhost, use memory store to avoid Windows file permission issues
        const isLocalDevelopment = !env.NODE_ENV || env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'production';

        if (isLocalDevelopment) {
            console.log('✅ Session store active: MemoryStore (development, Redis not configured)');
            this.storeType = 'memory';
            this.store = null; // Express will use default MemoryStore
            return;
        }

        // Fallback to file store for production without Redis
        if (FileStore && env.NODE_ENV === 'production') {
            try {
                // Use a more appropriate path for containerized environments
                const sessionsPath = this.getSessionsPath();

                // Ensure the directory exists and is writable
                this.ensureSessionsDirectory(sessionsPath);

                this.store = new FileStore({
                    path: sessionsPath,
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
                console.log(`✅ File session store initialized at: ${sessionsPath}`);
                return;
            } catch (error) {
                console.error('🚨 Failed to initialize file session store:', error);
                console.log('🔄 Falling back to memory store due to file system permissions...');
            }
        }

        // Final fallback to memory store
        console.warn('⚠️ Session store active: MemoryStore - NOT suitable for production (set REDIS_ENABLED=true + REDIS_URL)');
        this.storeType = 'memory';
        this.store = null; // Express will use default MemoryStore
    }

    /**
     * Get appropriate sessions directory path for different environments
     */
    getSessionsPath() {
        const fs = require('fs');
        const path = require('path');
        const os = require('os');

        // Try different paths in order of preference
        const possiblePaths = [
            // 1. Environment variable if specified (SESSIONS_PATH or SESSION_PATH for Docker compatibility)
            env.SESSIONS_PATH || process.env.SESSION_PATH,
            // 2. Temp directory (most likely to be writable)
            path.join(os.tmpdir(), 'kutt-sessions'),
            // 3. Current working directory (if writable)
            path.join(process.cwd(), 'sessions'),
            // 4. User's home directory
            path.join(os.homedir(), '.kutt', 'sessions')
        ].filter(Boolean);

        for (const sessionPath of possiblePaths) {
            try {
                // Test if we can write to this location
                const testDir = path.dirname(sessionPath);
                fs.accessSync(testDir, fs.constants.W_OK);
                return sessionPath;
            } catch (error) {
                // Try next path
                continue;
            }
        }

        // If all else fails, use temp directory
        return path.join(os.tmpdir(), 'kutt-sessions');
    }

    /**
     * Ensure sessions directory exists and is writable
     */
    ensureSessionsDirectory(sessionsPath) {
        const fs = require('fs');
        const path = require('path');

        try {
            // Create directory if it doesn't exist
            if (!fs.existsSync(sessionsPath)) {
                fs.mkdirSync(sessionsPath, { recursive: true, mode: 0o755 });
                console.log(`📁 Created sessions directory: ${sessionsPath}`);
            }

            // Test write permissions
            const testFile = path.join(sessionsPath, '.write-test');
            fs.writeFileSync(testFile, 'test');
            fs.unlinkSync(testFile);

            console.log(`✅ Sessions directory is writable: ${sessionsPath}`);
        } catch (error) {
            throw new Error(`Cannot create or write to sessions directory ${sessionsPath}: ${error.message}`);
        }
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
                sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax' // Allow cross-site for admin dashboard
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
        const metrics = {...this.metrics, storeType: this.storeType };

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
                message: this.storeType === 'memory' && env.NODE_ENV === 'production' ?
                    'Using memory store in production - not recommended' : 'Session store operating normally'
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