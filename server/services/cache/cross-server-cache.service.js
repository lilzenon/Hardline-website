/**
 * Cross-Server Redis Caching Service
 * Optimizes communication between homepage and admin dashboard servers
 * Reduces API calls and improves performance through intelligent caching
 */

const Redis = require('ioredis');
const env = require('../../env');

class CrossServerCacheService {
    constructor() {
        this.redis = null;
        this.isRedisAvailable = false;
        this.memoryCache = new Map();
        this.maxMemoryItems = 1000;

        // Cache TTL configurations (in seconds)
        this.ttl = {
            seo_settings: 300, // 5 minutes - SEO settings
            homepage_data: 180, // 3 minutes - Homepage data
            events: 120, // 2 minutes - Events data
            analytics: 60, // 1 minute - Analytics data
            api_response: 30, // 30 seconds - General API responses
            session: 1800, // 30 minutes - Session data
            user_cache: 900 // 15 minutes - User data
        };

        this.initializeRedis();
    }

    /**
     * Initialize Redis connection with unified configuration
     */
    async initializeRedis() {
        if (!env.REDIS_ENABLED) {
            console.log('📦 Cross-Server Cache: Redis disabled, using memory fallback');
            return;
        }

        try {
            this.redis = new Redis({
                host: env.REDIS_HOST,
                port: env.REDIS_PORT,
                db: env.REDIS_DB,
                password: env.REDIS_PASSWORD || undefined,
                // UNIFIED CONFIG: Matches both servers
                connectTimeout: 8000,
                commandTimeout: 5000,
                retryDelayOnFailover: 150,
                maxRetriesPerRequest: null, // CRITICAL: Must be null for BullMQ compatibility
                lazyConnect: true,
                keepAlive: 30000,
                family: 4,
                retryDelayOnClusterDown: 200,
                enableOfflineQueue: true,
                enableReadyCheck: true,
                maxLoadingTimeout: 6000,
                showFriendlyErrorStack: env.NODE_ENV === 'development',
                autoResubscribe: true,
                autoResendUnfulfilledCommands: true,
                connectionName: 'cross-server-cache'
            });

            this.redis.on('connect', () => {
                this.isRedisAvailable = true;
                console.log('✅ Cross-Server Cache: Redis connected');
            });

            this.redis.on('ready', async() => {
                this.isRedisAvailable = true;
                console.log('✅ Cross-Server Cache: Redis ready for commands');

                // Check eviction policy with managed service compatibility
                try {
                    const config = await this.redis.config('GET', 'maxmemory-policy');
                    const currentPolicy = config[1];

                    if (currentPolicy !== 'noeviction') {
                        console.warn(`⚠️ Cross-Server Cache: Redis eviction policy is ${currentPolicy}`);
                        console.log('💡 For optimal caching, eviction policy should be "noeviction"');
                    } else {
                        console.log('✅ Cross-Server Cache: Redis eviction policy is optimal');
                    }
                } catch (configError) {
                    if (configError.message.includes('NOPERM') || configError.message.includes('no permissions')) {
                        console.log('💡 Cross-Server Cache: CONFIG restricted by managed service (normal)');
                    } else {
                        console.warn('⚠️ Cross-Server Cache: Could not check eviction policy:', configError.message);
                    }
                }
            });

            this.redis.on('error', (error) => {
                this.isRedisAvailable = false;
                console.warn('⚠️ Cross-Server Cache: Redis error, using memory fallback:', error.message);
            });

            this.redis.on('close', () => {
                this.isRedisAvailable = false;
                console.warn('⚠️ Cross-Server Cache: Redis disconnected, using memory fallback');
            });

        } catch (error) {
            console.warn('⚠️ Cross-Server Cache: Failed to initialize Redis:', error.message);
            this.isRedisAvailable = false;
        }
    }

    /**
     * Generate cache key with namespace
     */
    generateKey(namespace, identifier, suffix = '') {
        const key = `cross-server:${namespace}:${identifier}${suffix ? ':' + suffix : ''}`;
        return key.replace(/[^a-zA-Z0-9:_-]/g, '_'); // Sanitize key
    }

    /**
     * Get cached value with automatic fallback
     */
    async get(namespace, identifier, suffix = '') {
        const key = this.generateKey(namespace, identifier, suffix);

        try {
            // Try Redis first if available
            if (this.isRedisAvailable && this.redis) {
                const value = await this.redis.get(key);
                if (value !== null) {
                    return JSON.parse(value);
                }
            }

            // Fallback to memory cache
            if (this.memoryCache.has(key)) {
                const cached = this.memoryCache.get(key);
                if (cached.expires > Date.now()) {
                    return cached.data;
                } else {
                    this.memoryCache.delete(key);
                }
            }

            return null;
        } catch (error) {
            console.warn('⚠️ Cross-Server Cache: Get error:', error.message);
            return null;
        }
    }

    /**
     * Set cached value with automatic fallback
     */
    async set(namespace, identifier, data, ttlSeconds = null, suffix = '') {
        const key = this.generateKey(namespace, identifier, suffix);
        const ttl = ttlSeconds || this.ttl[namespace] || this.ttl.api_response;

        try {
            const serializedData = JSON.stringify(data);

            // Try Redis first if available
            if (this.isRedisAvailable && this.redis) {
                await this.redis.setex(key, ttl, serializedData);
                return true;
            }

            // Fallback to memory cache
            this.setMemoryCache(key, data, ttl);
            return true;

        } catch (error) {
            console.warn('⚠️ Cross-Server Cache: Set error:', error.message);
            return false;
        }
    }

    /**
     * Set memory cache with TTL
     */
    setMemoryCache(key, data, ttlSeconds) {
        // Prevent memory cache from growing too large
        if (this.memoryCache.size >= this.maxMemoryItems) {
            const firstKey = this.memoryCache.keys().next().value;
            this.memoryCache.delete(firstKey);
        }

        this.memoryCache.set(key, {
            data,
            expires: Date.now() + (ttlSeconds * 1000)
        });
    }

    /**
     * Delete cached value
     */
    async delete(namespace, identifier, suffix = '') {
        const key = this.generateKey(namespace, identifier, suffix);

        try {
            if (this.isRedisAvailable && this.redis) {
                await this.redis.del(key);
            }
            this.memoryCache.delete(key);
            return true;
        } catch (error) {
            console.warn('⚠️ Cross-Server Cache: Delete error:', error.message);
            return false;
        }
    }

    /**
     * Cache SEO settings with optimized TTL
     */
    async cacheSEOSettings(settings) {
        return await this.set('seo_settings', 'current', settings, this.ttl.seo_settings);
    }

    /**
     * Get cached SEO settings
     */
    async getSEOSettings() {
        return await this.get('seo_settings', 'current');
    }

    /**
     * Cache homepage data
     */
    async cacheHomepageData(data) {
        return await this.set('homepage_data', 'current', data, this.ttl.homepage_data);
    }

    /**
     * Get cached homepage data
     */
    async getHomepageData() {
        return await this.get('homepage_data', 'current');
    }

    /**
     * Cache API response
     */
    async cacheAPIResponse(endpoint, data, customTTL = null) {
        const ttl = customTTL || this.ttl.api_response;
        return await this.set('api_response', endpoint, data, ttl);
    }

    /**
     * Get cached API response
     */
    async getAPIResponse(endpoint) {
        return await this.get('api_response', endpoint);
    }

    /**
     * Clear all cache (useful for deployments)
     */
    async clearAll() {
        try {
            if (this.isRedisAvailable && this.redis) {
                const keys = await this.redis.keys('cross-server:*');
                if (keys.length > 0) {
                    await this.redis.del(...keys);
                }
            }
            this.memoryCache.clear();
            console.log('✅ Cross-Server Cache: All cache cleared');
            return true;
        } catch (error) {
            console.warn('⚠️ Cross-Server Cache: Clear all error:', error.message);
            return false;
        }
    }

    /**
     * Get cache statistics
     */
    getStats() {
        return {
            redisAvailable: this.isRedisAvailable,
            memoryCacheSize: this.memoryCache.size,
            maxMemoryItems: this.maxMemoryItems,
            ttlConfig: this.ttl
        };
    }
}

// Export singleton instance
module.exports = new CrossServerCacheService();