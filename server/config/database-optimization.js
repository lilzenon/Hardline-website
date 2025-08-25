// =====================================================
// BOUNCE2BOUNCE Analytics Performance Optimization - Phase 4
// Connection Pool Optimization for Analytics Workload
// =====================================================
// Date: 2025-01-25
// Description: Optimized database connection pool settings for analytics performance
// Target: Support 1000+ visitors/hour with stable connection management
// Compatibility: Render PostgreSQL Basic tier

const { Pool } = require('pg');

// =====================================================
// OPTIMIZED CONNECTION POOL CONFIGURATION
// =====================================================

/**
 * Analytics-optimized connection pool configuration
 * Designed for Render PostgreSQL Basic tier limitations
 */
const getOptimizedPoolConfig = () => {
    const baseConfig = {
        // Connection limits optimized for Render Basic tier (5-10 total connections)
        min: 2,                    // Minimum connections (reduced from default 0)
        max: 5,                    // Maximum connections (increased from 3, but safe for Basic tier)
        
        // Timeout configurations optimized for analytics workload
        acquireTimeoutMillis: 8000,    // Time to wait for connection (reduced from 10s)
        createTimeoutMillis: 6000,     // Time to create new connection (reduced from 8s)
        destroyTimeoutMillis: 2000,    // Time to destroy connection (reduced from 3s)
        idleTimeoutMillis: 12000,      // Time before idle connection is closed (reduced from 15s)
        reapIntervalMillis: 500,       // How often to check for idle connections (kept at 500ms)
        
        // Connection validation
        validateOnBorrow: true,
        testOnBorrow: true,
        
        // Analytics-specific optimizations
        afterCreate: function(conn, done) {
            // Set session-level optimizations for analytics queries
            conn.query(`
                -- Optimize for analytics workload
                SET work_mem = '32MB';                    -- Increased memory for sorting/grouping
                SET random_page_cost = 1.1;              -- SSD-optimized random access cost
                SET effective_cache_size = '512MB';      -- Available cache for query planning
                SET shared_preload_libraries = '';       -- Reset for session
                
                -- Analytics query optimizations
                SET enable_hashjoin = on;                 -- Enable hash joins for analytics
                SET enable_mergejoin = on;                -- Enable merge joins
                SET enable_nestloop = off;                -- Disable nested loops for large datasets
                
                -- Parallel query settings (if supported)
                SET max_parallel_workers_per_gather = 2; -- Enable parallel queries
                SET parallel_tuple_cost = 0.1;           -- Cost of transferring tuples
                SET parallel_setup_cost = 1000.0;        -- Cost of setting up parallel workers
                
                -- Statement timeout for analytics (prevent runaway queries)
                SET statement_timeout = '30s';           -- 30 second timeout for analytics queries
                
                -- Logging for performance monitoring
                SET log_min_duration_statement = 1000;   -- Log queries taking >1 second
            `, done);
        },
        
        // Error handling
        onError: function(err, client) {
            console.error('Database pool error:', {
                error: err.message,
                code: err.code,
                timestamp: new Date().toISOString(),
                poolStats: getPoolStats()
            });
        }
    };

    return baseConfig;
};

// =====================================================
// CONNECTION POOL MONITORING
// =====================================================

/**
 * Get current pool statistics for monitoring
 */
const getPoolStats = (pool) => {
    if (!pool) return null;
    
    return {
        totalCount: pool.totalCount,
        idleCount: pool.idleCount,
        waitingCount: pool.waitingCount,
        maxConnections: pool.options.max,
        minConnections: pool.options.min,
        utilizationPercent: Math.round((pool.totalCount / pool.options.max) * 100),
        healthStatus: pool.totalCount < pool.options.max ? 'healthy' : 'at_capacity'
    };
};

/**
 * Monitor pool health and log warnings
 */
const monitorPoolHealth = (pool, intervalMs = 30000) => {
    setInterval(() => {
        const stats = getPoolStats(pool);
        
        if (stats.utilizationPercent > 80) {
            console.warn('Database pool high utilization:', {
                ...stats,
                timestamp: new Date().toISOString(),
                recommendation: 'Consider optimizing queries or increasing pool size'
            });
        }
        
        if (stats.waitingCount > 0) {
            console.warn('Database pool has waiting connections:', {
                ...stats,
                timestamp: new Date().toISOString(),
                recommendation: 'Queries may be taking too long or pool is undersized'
            });
        }
        
        // Log healthy status periodically for monitoring
        if (stats.healthStatus === 'healthy' && Math.random() < 0.1) { // 10% chance to log
            console.log('Database pool health check:', {
                ...stats,
                timestamp: new Date().toISOString()
            });
        }
    }, intervalMs);
};

// =====================================================
// ANALYTICS-SPECIFIC CONNECTION HELPERS
// =====================================================

/**
 * Execute analytics query with optimized connection handling
 */
const executeAnalyticsQuery = async (pool, query, params = []) => {
    const client = await pool.connect();
    const startTime = Date.now();
    
    try {
        // Set analytics-specific session parameters
        await client.query(`
            SET work_mem = '64MB';
            SET enable_nestloop = off;
            SET statement_timeout = '30s';
        `);
        
        const result = await client.query(query, params);
        const executionTime = Date.now() - startTime;
        
        // Log slow queries for optimization
        if (executionTime > 1000) {
            console.warn('Slow analytics query detected:', {
                executionTime,
                query: query.substring(0, 100) + '...',
                timestamp: new Date().toISOString()
            });
        }
        
        return result;
    } finally {
        client.release();
    }
};

/**
 * Execute batch analytics operations with transaction
 */
const executeBatchAnalytics = async (pool, operations) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        // Set batch-optimized parameters
        await client.query(`
            SET work_mem = '128MB';
            SET maintenance_work_mem = '256MB';
            SET synchronous_commit = off;
        `);
        
        const results = [];
        for (const operation of operations) {
            const result = await client.query(operation.query, operation.params);
            results.push(result);
        }
        
        await client.query('COMMIT');
        return results;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

// =====================================================
// CONNECTION POOL FACTORY
// =====================================================

/**
 * Create optimized connection pool for analytics
 */
const createAnalyticsPool = (databaseUrl) => {
    const config = {
        connectionString: databaseUrl,
        ...getOptimizedPoolConfig()
    };
    
    const pool = new Pool(config);
    
    // Start health monitoring
    monitorPoolHealth(pool);
    
    // Handle pool events
    pool.on('connect', (client) => {
        console.log('New analytics database connection established');
    });
    
    pool.on('remove', (client) => {
        console.log('Analytics database connection removed from pool');
    });
    
    pool.on('error', (err) => {
        console.error('Analytics database pool error:', err);
    });
    
    return pool;
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
    getOptimizedPoolConfig,
    getPoolStats,
    monitorPoolHealth,
    executeAnalyticsQuery,
    executeBatchAnalytics,
    createAnalyticsPool
};
