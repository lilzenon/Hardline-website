const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const auth = require("../../handlers/auth.handler");
const analyticsService = require("../../services/analytics/analytics.service");
const performanceMonitor = require("../../services/analytics/performance.service");
const searchService = require("../../services/analytics/search.service");
const knex = require("../../knex");
const { analyticsAuth, trackingLimiter, analyticsSecurityHeaders, analyticsRequestLogger } = require("../../middleware/analytics-auth");
const geoip = require("../../services/geoip.service");

const router = Router();

/**
 * POST /api/analytics/track
 * Receive tracking beacons from homepage (b2b.click or bounce2bounce.com)
 * Requirements:
 * - Works without Redis (in-memory fallback for rate limiting)
 * - Enforces x-api-key (configurable via env)
 * - Validates and sanitizes input
 * - Upserts session into homepage_sessions (unique session_id)
 * - Inserts page view into homepage_page_views
 */
router.post(
    "/track",
    analyticsSecurityHeaders,
    analyticsRequestLogger,
    trackingLimiter,
    analyticsAuth,
    asyncHandler(async(req, res) => {
        const started = Date.now();
        try {
            const {
                sessionId,
                pageUrl,
                pageTitle,
                referrer,
                userAgent,
                deviceType,
                browserName,
                osName,
                userId,
            } = req.body || {};

            // Basic validation
            if (!sessionId || typeof sessionId !== "string" || sessionId.length < 8) {
                return res.status(400).json({ error: "Invalid sessionId" });
            }
            if (!pageUrl || typeof pageUrl !== "string") {
                return res.status(400).json({ error: "Invalid pageUrl" });
            }

            // Sanitize referrer to hostname form
            let refHost = null;
            try {
                if (referrer) {
                    const hasProto = /^https?:\/\//i.test(referrer);
                    const u = new URL(hasProto ? referrer : `https://${referrer}`);
                    refHost = (u.hostname || "").replace(/^www\./i, "");
                }
            } catch (_) {
                refHost = null;
            }

            // Geolocation: prefer MaxMind when configured, fallback to CF country header
            const ipHeader = req.headers["x-forwarded-for"] || "";
            const ip = (Array.isArray(ipHeader) ? ipHeader[0] : ipHeader).split(",")[0].trim() || req.ip || "";
            const cfCountry = req.headers["cf-ipcountry"] || null;
            const geo = await geoip.resolve(ip, cfCountry);

            // Upsert session (idempotent)
            await knex("homepage_sessions")
                .insert({
                    session_id: sessionId,
                    first_visit: knex.fn.now(),
                    last_activity: knex.fn.now(),
                    page_views: 1,
                    origin: req.get("Origin") || req.get("Referer") || null,
                    user_id: userId || null,
                })
                .onConflict("session_id")
                .merge({ last_activity: knex.fn.now(), page_views: knex.raw("page_views + 1") });

            // Insert page view
            await knex("homepage_page_views").insert({
                session_id: sessionId,
                user_id: userId || null,
                page_url: pageUrl,
                page_title: pageTitle || null,
                ip_address: null, // Do not store raw IPs
                user_agent: userAgent || req.headers["user-agent"] || null,
                referrer: refHost,
                device_type: deviceType || null,
                browser_name: browserName || null,
                os_name: osName || null,
                country_code: geo.countryCode || null,
                city: null,
                view_timestamp: knex.fn.now(),
                created_at: knex.fn.now(),
            });

            const duration = Date.now() - started;
            return res.json({ success: true, durationMs: duration });
        } catch (error) {
            console.error("❌ Analytics track error:", error);
            return res.status(500).json({ error: "Tracking failed" });
        }
    })
);


/**
 * GET /api/analytics/dashboard
 * Get dashboard analytics data
 */
router.get(
    "/dashboard",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const { period = 'month' } = req.query;
            const analytics = await analyticsService.getDashboardStats(req.user.id, String(period));

            res.json({
                success: true,
                data: analytics
            });
        } catch (error) {
            console.error('❌ Dashboard analytics API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * GET /api/analytics/visitors/countries
 * Return visitors aggregated by country for selected period
 */
router.get(
    "/visitors/countries",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const { period = 'month' } = req.query;
            const data = await analyticsService.getVisitorsByCountry(req.user.id, String(period));
            res.json({ success: true, data });
        } catch (error) {
            console.error('❌ Visitors by country API error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    })
);

/**
 * GET /api/analytics/visitors/channels
 * Return visitor channels (referrers) for selected period
 */
router.get(
    "/visitors/channels",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const { period = 'month' } = req.query;
            const data = await analyticsService.getVisitorChannels(req.user.id, String(period));
            res.json({ success: true, data });
        } catch (error) {
            console.error('❌ Visitor channels API error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    })
);

/**
 * GET /api/analytics/social/channels
 * Return social channels for selected period
 */
router.get(
    "/social/channels",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const { period = 'month' } = req.query;
            const data = await analyticsService.getSocialChannels(req.user.id, String(period));
            res.json({ success: true, data });
        } catch (error) {
            console.error('❌ Social channels API error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    })
);

/**
 * GET /api/analytics/realtime
 * Get real-time analytics data
 */
router.get(
    "/realtime",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const realTimeStats = await analyticsService.getRealTimeStats(req.user.id);

            res.json({
                success: true,
                data: realTimeStats
            });
        } catch (error) {
            console.error('❌ Real-time analytics API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * GET /api/analytics/performance
 * Get performance metrics
 */
router.get(
    "/performance",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const performanceMetrics = await analyticsService.getPerformanceMetrics(req.user.id);

            res.json({
                success: true,
                data: performanceMetrics
            });
        } catch (error) {
            console.error('❌ Performance analytics API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * GET /api/analytics/drop/:dropId
 * Get analytics for a specific drop
 */
router.get(
    "/drop/:dropId",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const { dropId } = req.params;
            const dropAnalytics = await analyticsService.getDropAnalytics(dropId, req.user.id);

            res.json({
                success: true,
                data: dropAnalytics
            });
        } catch (error) {
            console.error(`❌ Drop analytics API error for drop ${req.params.dropId}:`, error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * POST /api/analytics/invalidate
 * Manually invalidate analytics cache
 */
router.post(
    "/invalidate",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            await analyticsService.invalidateUserCache(req.user.id);

            res.json({
                success: true,
                message: "Analytics cache invalidated successfully"
            });
        } catch (error) {
            console.error('❌ Cache invalidation API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * GET /api/analytics/export
 * Export analytics data
 */
router.get(
    "/export",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const { format = 'json' } = req.query;
            const analyticsData = await analyticsService.getAnalyticsPageData(req.user.id);

            if (format === 'csv') {
                // Convert to CSV format
                const csv = convertToCSV(analyticsData);
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', 'attachment; filename="analytics-export.csv"');
                res.send(csv);
            } else {
                // Return JSON format
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Content-Disposition', 'attachment; filename="analytics-export.json"');
                res.json({
                    success: true,
                    data: analyticsData,
                    exportedAt: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('❌ Analytics export API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * Helper function to convert analytics data to CSV
 */
function convertToCSV(data) {
    const { stats, recentDrops, recentLinks, fanAnalytics } = data;

    let csv = 'Analytics Export\n\n';

    // Stats section
    csv += 'Metric,Value\n';
    csv += `Total Drops,${stats.totalDrops}\n`;
    csv += `Active Drops,${stats.activeDrops}\n`;
    csv += `Total Links,${stats.totalLinks}\n`;
    csv += `Total Fans,${stats.totalFans}\n`;
    csv += `Total Clicks,${stats.totalClicks}\n\n`;

    // Recent Drops section
    csv += 'Recent Drops\n';
    csv += 'Title,Status,Fans,Created Date\n';
    recentDrops.forEach(drop => {
        csv += `"${drop.title}",${drop.is_active ? 'Active' : 'Inactive'},${drop.signup_count || 0},"${drop.created_at}"\n`;
    });

    csv += '\n';

    // Recent Links section
    csv += 'Recent Links\n';
    csv += 'Title,URL,Clicks,Created Date\n';
    recentLinks.forEach(link => {
        csv += `"${link.title || 'Untitled'}","${link.target}",${link.visit_count || 0},"${link.created_at}"\n`;
    });

    return csv;
}

/**
 * GET /api/analytics/performance/report
 * Get performance monitoring data (admin only)
 */
router.get(
    "/performance/report",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            // Only allow admin users to access performance data
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied. Admin privileges required.'
                });
            }

            const performanceReport = await performanceMonitor.generateReport();

            res.json({
                success: true,
                data: performanceReport
            });
        } catch (error) {
            console.error('❌ Performance report API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * GET /api/analytics/search/fans
 * Search fan signups
 */
router.get(
    "/search/fans",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const {
                q: searchQuery = '',
                limit = 50,
                offset = 0,
                sortBy = 'latest',
                dropId = null,
                highlights = true
            } = req.query;

            const searchResults = await searchService.searchFanSignups(req.user.id, searchQuery, {
                limit: parseInt(limit),
                offset: parseInt(offset),
                sortBy,
                dropId: dropId ? parseInt(dropId) : null,
                includeHighlights: highlights === 'true'
            });

            res.json({
                success: true,
                data: searchResults
            });
        } catch (error) {
            console.error('❌ Fan search API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * GET /api/analytics/search/events
 * Search events
 */
router.get(
    "/search/events",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const {
                q: searchQuery = '',
                limit = 20,
                offset = 0,
                includeInactive = false
            } = req.query;

            const searchResults = await searchService.searchEvents(req.user.id, searchQuery, {
                limit: parseInt(limit),
                offset: parseInt(offset),
                includeInactive: includeInactive === 'true'
            });

            res.json({
                success: true,
                data: searchResults
            });
        } catch (error) {
            console.error('❌ Event search API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

/**
 * GET /api/analytics/search/suggestions
 * Get search suggestions
 */
router.get(
    "/search/suggestions",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            const { q: partialQuery = '', type = 'fans' } = req.query;

            if (partialQuery.length < 2) {
                return res.json({
                    success: true,
                    data: { suggestions: [] }
                });
            }

            const suggestions = await searchService.getSearchSuggestions(req.user.id, partialQuery, type);

            res.json({
                success: true,
                data: suggestions
            });
        } catch (error) {
            console.error('❌ Search suggestions API error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    })
);

module.exports = router;