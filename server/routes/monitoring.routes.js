const express = require('express');
const router = express.Router();
const knex = require('../knex');
const redis = require('../redis');
const circuitBreaker = require('../services/monitoring/circuit-breaker.service');
const intelligentCache = require('../services/cache/intelligent-cache.service');
const performanceMonitor = require('../services/analytics/performance.service');

/**
 * Database Performance Monitoring Endpoint
 * GET /api/monitoring/database
 */
router.get('/database', async (req, res) => {
    try {
        const startTime = Date.now();
        
        // Test database connection and get pool stats
        const poolStats = await knex.client.pool ? {
            used: knex.client.pool.numUsed(),
            free: knex.client.pool.numFree(),
            pending: knex.client.pool.numPendingAcquires(),
            total: knex.client.pool.numUsed() + knex.client.pool.numFree(),
            max: knex.client.pool.max,
            min: knex.client.pool.min
        } : null;

        // Test query performance
        const testQuery = await knex.raw('SELECT 1 as test');
        const queryTime = Date.now() - startTime;

        // Get table sizes and counts
        const tableStats = await Promise.all([
            knex('links').count('id as count').first(),
            knex('visits').count('id as count').first(),
            knex('users').count('id as count').first(),
            knex('domains').count('id as count').first()
        ]);

        // Check for slow queries (simulated - in production you'd check pg_stat_statements)
        const slowQueries = await knex.raw(`
            SELECT query, calls, total_time, mean_time 
            FROM pg_stat_statements 
            WHERE mean_time > 1000 
            ORDER BY mean_time DESC 
            LIMIT 5
        `).catch(() => ({ rows: [] })); // Fallback if pg_stat_statements not available

        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            database: {
                connectionPool: poolStats,
                queryPerformance: {
                    testQueryTime: `${queryTime}ms`,
                    status: queryTime < 100 ? 'excellent' : queryTime < 500 ? 'good' : 'slow'
                },
                tableStats: {
                    links: parseInt(tableStats[0].count),
                    visits: parseInt(tableStats[1].count),
                    users: parseInt(tableStats[2].count),
                    domains: parseInt(tableStats[3].count)
                },
                slowQueries: slowQueries.rows || []
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Redis Performance Monitoring Endpoint
 * GET /api/monitoring/redis
 */
router.get('/redis', async (req, res) => {
    try {
        if (!redis.client) {
            return res.json({
                status: 'disabled',
                message: 'Redis is not enabled',
                timestamp: new Date().toISOString()
            });
        }

        const startTime = Date.now();
        
        // Test Redis connection
        await redis.client.ping();
        const pingTime = Date.now() - startTime;

        // Get Redis info
        const info = await redis.client.info();
        const memory = await redis.client.info('memory');
        const stats = await redis.client.info('stats');

        // Get cache metrics from intelligent cache service
        const cacheMetrics = intelligentCache.getMetrics();

        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            redis: {
                connection: {
                    pingTime: `${pingTime}ms`,
                    status: pingTime < 10 ? 'excellent' : pingTime < 50 ? 'good' : 'slow'
                },
                memory: {
                    used: memory.match(/used_memory_human:(.+)/)?.[1]?.trim(),
                    peak: memory.match(/used_memory_peak_human:(.+)/)?.[1]?.trim(),
                    fragmentation: memory.match(/mem_fragmentation_ratio:(.+)/)?.[1]?.trim()
                },
                stats: {
                    totalConnections: stats.match(/total_connections_received:(.+)/)?.[1]?.trim(),
                    totalCommands: stats.match(/total_commands_processed:(.+)/)?.[1]?.trim(),
                    keyspaceHits: stats.match(/keyspace_hits:(.+)/)?.[1]?.trim(),
                    keyspaceMisses: stats.match(/keyspace_misses:(.+)/)?.[1]?.trim()
                },
                cacheMetrics
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Circuit Breaker Status Endpoint
 * GET /api/monitoring/circuit-breakers
 */
router.get('/circuit-breakers', (req, res) => {
    try {
        const health = circuitBreaker.healthCheck();
        const status = circuitBreaker.getStatus();

        res.json({
            status: health.status,
            timestamp: new Date().toISOString(),
            circuitBreakers: {
                health,
                circuits: status
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Performance Metrics Endpoint
 * GET /api/monitoring/performance
 */
router.get('/performance', (req, res) => {
    try {
        const metrics = performanceMonitor.getMetrics();
        const poolStats = performanceMonitor.getDatabasePoolStats();

        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            performance: {
                metrics,
                databasePool: poolStats,
                recommendations: generateRecommendations(metrics)
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Comprehensive Health Check Endpoint
 * GET /api/monitoring/health
 */
router.get('/health', async (req, res) => {
    try {
        const startTime = Date.now();
        const health = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            services: {},
            performance: {},
            recommendations: []
        };

        // Database health
        try {
            await knex.raw('SELECT 1');
            health.services.database = { status: 'healthy', message: 'Database connection successful' };
        } catch (error) {
            health.services.database = { status: 'unhealthy', message: error.message };
            health.status = 'degraded';
        }

        // Redis health
        if (redis.client) {
            try {
                await redis.client.ping();
                health.services.redis = { status: 'healthy', message: 'Redis connection successful' };
            } catch (error) {
                health.services.redis = { status: 'unhealthy', message: error.message };
                health.status = 'degraded';
            }
        } else {
            health.services.redis = { status: 'disabled', message: 'Redis is not enabled' };
        }

        // Circuit breaker health
        const circuitHealth = circuitBreaker.healthCheck();
        health.services.circuitBreakers = circuitHealth;
        if (circuitHealth.status === 'critical') {
            health.status = 'critical';
        } else if (circuitHealth.status === 'degraded' && health.status === 'healthy') {
            health.status = 'degraded';
        }

        // Performance metrics
        const responseTime = Date.now() - startTime;
        health.performance = {
            responseTime: `${responseTime}ms`,
            status: responseTime < 100 ? 'excellent' : responseTime < 500 ? 'good' : 'slow'
        };

        // Generate recommendations
        health.recommendations = generateHealthRecommendations(health);

        res.json(health);
    } catch (error) {
        res.status(500).json({
            status: 'critical',
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Generate performance recommendations
 */
function generateRecommendations(metrics) {
    const recommendations = [];

    Object.entries(metrics).forEach(([operation, metric]) => {
        const avgTime = parseFloat(metric.averageTime);
        const slowQueryPercentage = parseFloat(metric.slowQueryPercentage);

        if (avgTime > 1000) {
            recommendations.push({
                type: 'performance',
                severity: 'high',
                operation,
                message: `${operation} has high average response time (${avgTime}ms). Consider optimizing queries or adding indexes.`
            });
        }

        if (slowQueryPercentage > 10) {
            recommendations.push({
                type: 'performance',
                severity: 'medium',
                operation,
                message: `${operation} has ${slowQueryPercentage}% slow queries. Review query patterns and consider caching.`
            });
        }
    });

    return recommendations;
}

/**
 * Generate health recommendations
 */
function generateHealthRecommendations(health) {
    const recommendations = [];

    if (health.services.database?.status === 'unhealthy') {
        recommendations.push({
            type: 'critical',
            service: 'database',
            message: 'Database is unhealthy. Check connection pool settings and database server status.'
        });
    }

    if (health.services.circuitBreakers?.openCircuits?.length > 0) {
        recommendations.push({
            type: 'warning',
            service: 'circuit-breakers',
            message: `Circuit breakers are open for: ${health.services.circuitBreakers.openCircuits.join(', ')}. Monitor error rates and consider manual reset if appropriate.`
        });
    }

    if (health.performance?.status === 'slow') {
        recommendations.push({
            type: 'performance',
            service: 'general',
            message: 'System response time is slow. Check database performance and connection pool utilization.'
        });
    }

    return recommendations;
}

module.exports = router;
