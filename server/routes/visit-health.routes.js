/**
 * Visit Processing Health Monitoring Routes
 */

const { Router } = require("express");
const router = Router();

/**
 * GET /api/visit-health
 * Check visit processing system health
 */
router.get("/", async (req, res) => {
    try {
        const health = {
            timestamp: new Date().toISOString(),
            status: "healthy",
            checks: {}
        };

        // Check Redis queue status
        try {
            const queues = require("../queues");
            if (queues.visit) {
                health.checks.queue = {
                    status: "enabled",
                    type: "redis",
                    message: "Redis queue is active"
                };
            } else {
                health.checks.queue = {
                    status: "fallback",
                    type: "robust-processor",
                    message: "Using robust visit processor"
                };
            }
        } catch (error) {
            health.checks.queue = {
                status: "error",
                message: error.message
            };
        }

        // Check robust visit processor if available
        try {
            const visitProcessor = require("../services/visit-processor");
            const stats = visitProcessor.getStats();
            
            health.checks.processor = {
                status: "active",
                queueSize: stats.queueSize,
                isProcessing: stats.isProcessing,
                oldestQueueItem: stats.oldestQueueItem,
                message: `Background processor active, ${stats.queueSize} items queued`
            };
        } catch (error) {
            health.checks.processor = {
                status: "unavailable",
                message: "Robust processor not available"
            };
        }

        // Check database connectivity
        try {
            const knex = require("../knex");
            const start = Date.now();
            await knex.raw('SELECT 1 as test');
            const queryTime = Date.now() - start;
            
            health.checks.database = {
                status: queryTime < 1000 ? "healthy" : "slow",
                responseTime: queryTime,
                message: `Database responding in ${queryTime}ms`
            };
        } catch (error) {
            health.checks.database = {
                status: "error",
                message: error.message
            };
            health.status = "degraded";
        }

        // Check Redis connectivity
        try {
            const redis = require("../redis");
            if (redis.isRedisReady && redis.isRedisReady()) {
                health.checks.redis = {
                    status: "connected",
                    message: "Redis is connected and ready"
                };
            } else {
                health.checks.redis = {
                    status: "disconnected",
                    message: "Redis is not ready"
                };
            }
        } catch (error) {
            health.checks.redis = {
                status: "error",
                message: error.message
            };
        }

        // Overall health assessment
        const hasErrors = Object.values(health.checks).some(check => check.status === "error");
        const hasDegraded = Object.values(health.checks).some(check => check.status === "slow" || check.status === "degraded");
        
        if (hasErrors) {
            health.status = "unhealthy";
        } else if (hasDegraded) {
            health.status = "degraded";
        }

        res.json(health);
    } catch (error) {
        res.status(500).json({
            timestamp: new Date().toISOString(),
            status: "error",
            message: error.message
        });
    }
});

/**
 * POST /api/visit-health/test
 * Test visit processing with a sample visit
 */
router.post("/test", async (req, res) => {
    try {
        const testVisit = {
            link: {
                id: 'test-link-id',
                user_id: 'test-user-id'
            },
            ip: req.ip || '127.0.0.1',
            userAgent: req.headers['user-agent'] || 'Test Agent',
            referrer: 'https://test.com'
        };

        const start = Date.now();
        
        // Try to process the test visit
        const queues = require("../queues");
        if (queues.visit) {
            queues.visit.add(testVisit);
        }

        const processingTime = Date.now() - start;

        res.json({
            timestamp: new Date().toISOString(),
            status: "success",
            processingTime,
            message: "Test visit processed successfully",
            testData: testVisit
        });
    } catch (error) {
        res.status(500).json({
            timestamp: new Date().toISOString(),
            status: "error",
            message: error.message
        });
    }
});

/**
 * GET /api/visit-health/stats
 * Get detailed visit processing statistics
 */
router.get("/stats", async (req, res) => {
    try {
        const stats = {
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
            redis: {
                enabled: process.env.REDIS_ENABLED,
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        };

        // Get robust processor stats
        try {
            const visitProcessor = require("../services/visit-processor");
            stats.processor = visitProcessor.getStats();
        } catch (error) {
            stats.processor = { error: error.message };
        }

        // Get database pool stats
        try {
            const knex = require("../knex");
            const pool = knex.client.pool;
            if (pool) {
                stats.database = {
                    used: typeof pool.numUsed === 'function' ? pool.numUsed() : 'N/A',
                    free: typeof pool.numFree === 'function' ? pool.numFree() : 'N/A',
                    max: pool.max || 'N/A'
                };
            }
        } catch (error) {
            stats.database = { error: error.message };
        }

        res.json(stats);
    } catch (error) {
        res.status(500).json({
            timestamp: new Date().toISOString(),
            status: "error",
            message: error.message
        });
    }
});

module.exports = router;
