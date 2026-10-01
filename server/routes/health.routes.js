const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const databaseSecurity = require("../middleware/database-security.middleware");
const { securityMonitor } = require("../middleware/security-monitoring.middleware");
const auth = require("../handlers/auth.handler");

const router = Router();

// Build identity, read once. build-info.json is written by `npm run build` and
// committed with dist/, so it identifies the deployed artifact. Exposed on the
// public health check because during a rolling deploy two instances can serve
// different builds for a while (seen 2026-10-01: one instance stayed on the
// previous release for 30+ minutes); with the SHA in the response that is a
// one-line curl to diagnose instead of header archaeology.
let BUILD = { commit: null, date: null };
try {
    const info = require("../../build-info.json");
    BUILD = { commit: info.commitHashShort || null, date: info.buildDate || null };
} catch (_) { /* no build-info in this checkout */ }

/**
 * Public health check endpoint
 * Basic health status without sensitive information
 */
router.get("/", asyncHandler(async(req, res) => {
    const health = {
        status: "healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || "unknown",
        build: BUILD.commit,
        buildDate: BUILD.date,
        instance: process.env.HOSTNAME || null
    };

    res.status(200).json(health);
}));

/**
 * Database health check endpoint (admin only)
 * Detailed database connection status
 */
router.get("/database",
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(async(req, res) => {
        const dbHealth = await databaseSecurity.checkDatabaseHealth();

        const response = {
            database: dbHealth,
            timestamp: new Date().toISOString()
        };

        const status = dbHealth.healthy ? 200 : 503;
        res.status(status).json(response);
    })
);

/**
 * Comprehensive system health (admin only)
 * Full system status including memory, database, etc.
 */
router.get("/system",
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(async(req, res) => {
        const dbHealth = await databaseSecurity.checkDatabaseHealth();

        const systemHealth = {
            status: dbHealth.healthy ? "healthy" : "degraded",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: {
                used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
                total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
                external: Math.round(process.memoryUsage().external / 1024 / 1024)
            },
            database: dbHealth,
            nodeVersion: process.version,
            platform: process.platform,
            environment: process.env.NODE_ENV
        };

        const status = dbHealth.healthy ? 200 : 503;
        res.status(status).json(systemHealth);
    })
);

/**
 * Security monitoring dashboard (admin only)
 * Real-time security statistics and alerts
 */
router.get("/security",
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(async(req, res) => {
        const hours = parseInt(req.query.hours) || 24;
        const stats = securityMonitor.getSecurityStats(hours);

        res.status(200).json({
            timeframe: `${hours} hours`,
            ...stats,
            timestamp: new Date().toISOString()
        });
    })
);

/**
 * Security events for specific IP (admin only)
 * Detailed event history for investigation
 */
router.get("/security/ip/:ip",
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(async(req, res) => {
        const { ip } = req.params;
        const hours = parseInt(req.query.hours) || 24;
        const events = securityMonitor.getEventsForIP(ip, hours);

        res.status(200).json({
            ip,
            timeframe: `${hours} hours`,
            eventCount: events.length,
            events,
            timestamp: new Date().toISOString()
        });
    })
);

module.exports = router;