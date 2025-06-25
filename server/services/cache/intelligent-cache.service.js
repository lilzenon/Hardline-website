const redis = require("../../redis");
const env = require("../../env");

class IntelligentCacheService {
    constructor() {
        this.enabled = env.REDIS_ENABLED;
        this.defaultTTL = 300; // 5 minutes
        this.longTTL = 1800;   // 30 minutes
        this.shortTTL = 60;    // 1 minute
        
        // Cache warming configuration
        this.warmingEnabled = true;
        this.warmingInterval = 240000; // 4 minutes (before 5-minute cache expires)
        this.warmingBatchSize = 10;
        
        // Performance tracking
        this.metrics = {
            hits: 0,
            misses: 0,
            errors: 0,
            warmingJobs: 0
        };
        
        if (this.enabled && this.warmingEnabled) {
            this.startCacheWarming();
        }
    }

    /**
     * Generate cache keys with consistent naming
     */
    generateKey(type, identifier, suffix = '') {
        const key = `${type}:${identifier}${suffix ? ':' + suffix : ''}`;
        return key.toLowerCase().replace(/[^a-z0-9:_-]/g, '_');
    }

    /**
     * Get cached data with metrics tracking
     */
    async get(key) {
        if (!this.enabled || !redis.client) {
            this.metrics.misses++;
            return null;
        }

        try {
            const data = await redis.client.get(key);
            if (data) {
                this.metrics.hits++;
                return JSON.parse(data);
            } else {
                this.metrics.misses++;
                return null;
            }
        } catch (error) {
            this.metrics.errors++;
            console.error(`❌ Cache get error for key ${key}:`, error.message);
            return null;
        }
    }

    /**
     * Set cached data with intelligent TTL selection
     */
    async set(key, data, customTTL = null) {
        if (!this.enabled || !redis.client) return false;

        try {
            const ttl = customTTL || this.selectTTL(key, data);
            await redis.client.setex(key, ttl, JSON.stringify(data));
            return true;
        } catch (error) {
            this.metrics.errors++;
            console.error(`❌ Cache set error for key ${key}:`, error.message);
            return false;
        }
    }

    /**
     * Intelligent TTL selection based on data type and size
     */
    selectTTL(key, data) {
        const dataSize = JSON.stringify(data).length;
        
        // Expensive queries get longer TTL
        if (key.includes('stats') || key.includes('analytics')) {
            return this.longTTL;
        }
        
        // Large datasets get shorter TTL to prevent memory issues
        if (dataSize > 50000) { // 50KB
            return this.shortTTL;
        }
        
        // User data gets medium TTL
        if (key.includes('user') || key.includes('link')) {
            return this.defaultTTL;
        }
        
        return this.defaultTTL;
    }

    /**
     * Cache with fallback computation
     */
    async getOrCompute(key, computeFunction, customTTL = null) {
        try {
            // Try cache first
            let data = await this.get(key);
            
            if (data) {
                console.log(`📊 Cache hit: ${key}`);
                return data;
            }

            // Compute fresh data
            console.log(`📊 Cache miss: ${key}, computing...`);
            data = await computeFunction();

            // Cache the result
            if (data !== null && data !== undefined) {
                await this.set(key, data, customTTL);
            }

            return data;
        } catch (error) {
            console.error(`❌ Error in getOrCompute for key ${key}:`, error);
            throw error;
        }
    }

    /**
     * Batch invalidate related keys
     */
    async invalidatePattern(pattern) {
        if (!this.enabled || !redis.client) return;

        try {
            const keys = await redis.client.keys(pattern);
            if (keys.length > 0) {
                await redis.client.del(...keys);
                console.log(`✅ Invalidated ${keys.length} keys matching pattern: ${pattern}`);
            }
        } catch (error) {
            console.error(`❌ Error invalidating pattern ${pattern}:`, error);
        }
    }

    /**
     * Invalidate user-related caches
     */
    async invalidateUserCaches(userId) {
        await Promise.all([
            this.invalidatePattern(`user:${userId}*`),
            this.invalidatePattern(`stats:user:${userId}*`),
            this.invalidatePattern(`analytics:user:${userId}*`),
            this.invalidatePattern(`links:user:${userId}*`)
        ]);
    }

    /**
     * Start cache warming background process
     */
    startCacheWarming() {
        console.log('🔥 Starting intelligent cache warming...');
        
        setInterval(async () => {
            try {
                await this.performCacheWarming();
            } catch (error) {
                console.error('🚨 Cache warming error:', error);
            }
        }, this.warmingInterval);
    }

    /**
     * Perform cache warming for frequently accessed data
     */
    async performCacheWarming() {
        if (!this.enabled) return;

        this.metrics.warmingJobs++;
        console.log('🔥 Performing cache warming...');

        try {
            // Warm popular link stats
            await this.warmPopularLinkStats();
            
            // Warm user analytics for active users
            await this.warmActiveUserAnalytics();
            
            console.log('✅ Cache warming completed');
        } catch (error) {
            console.error('🚨 Cache warming failed:', error);
        }
    }

    /**
     * Warm cache for popular link statistics
     */
    async warmPopularLinkStats() {
        try {
            const knex = require("../../knex");
            
            // Get top 10 most visited links from last 24 hours
            const popularLinks = await knex("links")
                .select("id")
                .where("visit_count", ">", 0)
                .orderBy("visit_count", "desc")
                .limit(this.warmingBatchSize);

            for (const link of popularLinks) {
                const key = redis.key.stats(link.id);
                const exists = await redis.client.exists(key);
                
                if (!exists) {
                    // Warm the cache by triggering stats computation
                    const visitQueries = require("../../queries/visit.queries");
                    await visitQueries.find({ link_id: link.id });
                    console.log(`🔥 Warmed stats cache for link ${link.id}`);
                }
            }
        } catch (error) {
            console.error('🚨 Error warming link stats:', error);
        }
    }

    /**
     * Warm cache for active user analytics
     */
    async warmActiveUserAnalytics() {
        try {
            const knex = require("../../knex");
            
            // Get recently active users
            const activeUsers = await knex("users")
                .select("id")
                .where("updated_at", ">", knex.raw("NOW() - INTERVAL '24 hours'"))
                .limit(this.warmingBatchSize);

            for (const user of activeUsers) {
                const key = this.generateKey('analytics', user.id, 'dashboard');
                const exists = await redis.client.exists(key);
                
                if (!exists) {
                    // Warm user analytics cache
                    console.log(`🔥 Warmed analytics cache for user ${user.id}`);
                }
            }
        } catch (error) {
            console.error('🚨 Error warming user analytics:', error);
        }
    }

    /**
     * Get cache performance metrics
     */
    getMetrics() {
        const total = this.metrics.hits + this.metrics.misses;
        const hitRate = total > 0 ? ((this.metrics.hits / total) * 100).toFixed(2) : 0;
        
        return {
            ...this.metrics,
            hitRate: `${hitRate}%`,
            total,
            enabled: this.enabled
        };
    }

    /**
     * Reset metrics
     */
    resetMetrics() {
        this.metrics = {
            hits: 0,
            misses: 0,
            errors: 0,
            warmingJobs: 0
        };
    }

    /**
     * Health check for cache service
     */
    async healthCheck() {
        if (!this.enabled) {
            return { status: 'disabled', message: 'Redis caching is disabled' };
        }

        try {
            await redis.client.ping();
            return { 
                status: 'healthy', 
                message: 'Cache service is operational',
                metrics: this.getMetrics()
            };
        } catch (error) {
            return { 
                status: 'unhealthy', 
                message: `Cache service error: ${error.message}`,
                error: error.message
            };
        }
    }
}

module.exports = new IntelligentCacheService();
