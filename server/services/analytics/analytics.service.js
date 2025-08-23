const query = require("../../queries");
const cache = require("./cache.service");
const knex = require("../../knex");
const homepageAnalytics = require("./homepage-analytics.service");

class AnalyticsService {
    /**
     * Get comprehensive dashboard analytics for a user
     */
    async getDashboardAnalytics(userId, options = {}) {
        const cacheKey = cache.getUserAnalyticsKey(userId, 'dashboard');

        return await cache.getOrCompute(cacheKey, async() => {
            console.log(`📊 Computing dashboard analytics for user ${userId}`);

            try {
                // Use optimized single query for all stats
                const statsResult = await knex.raw(`
                    SELECT
                        (SELECT COUNT(*) FROM events WHERE user_id = ?) as total_events,
                        (SELECT COUNT(*) FROM events WHERE user_id = ? AND is_active = true) as active_events,
                        (SELECT COUNT(*) FROM links WHERE user_id = ?) as total_links,
                        (SELECT COALESCE(SUM(visit_count), 0) FROM links WHERE user_id = ?) as total_clicks,
                        (SELECT COUNT(DISTINCT es.email)
                         FROM event_signups es
                         JOIN events e ON es.event_id = e.id
                         WHERE e.user_id = ?) as total_unique_fans,
                        (SELECT COUNT(*)
                         FROM event_signups es
                         JOIN events e ON es.event_id = e.id
                         WHERE e.user_id = ?) as total_signups
                `, [userId, userId, userId, userId, userId, userId]);

                // Handle different database result formats
                let stats;
                if (statsResult.rows && statsResult.rows.length > 0) {
                    // PostgreSQL format
                    stats = statsResult.rows[0];
                } else if (Array.isArray(statsResult) && statsResult.length > 0) {
                    // MySQL/SQLite format
                    stats = statsResult[0];
                } else {
                    // Fallback to empty stats
                    console.warn('⚠️ No stats result found, using fallback');
                    stats = {
                        total_events: 0,
                        active_events: 0,
                        total_links: 0,
                        total_clicks: 0,
                        total_unique_fans: 0,
                        total_signups: 0
                    };
                }

                // Get recent events and links in parallel
                const [recentEvents, recentLinks] = await Promise.all([
                    query.event.findByUserWithStats(userId, { limit: 5 }),
                    query.link.get({ "links.user_id": userId }, { skip: 0, limit: 5 })
                ]);

                return {
                    stats: {
                        totalEvents: parseInt(stats.total_events) || 0,
                        activeEvents: parseInt(stats.active_events) || 0,
                        totalLinks: parseInt(stats.total_links) || 0,
                        totalClicks: parseInt(stats.total_clicks) || 0,
                        totalFans: parseInt(stats.total_unique_fans) || 0,
                        totalSignups: parseInt(stats.total_signups) || 0
                    },
                    recentEvents: recentEvents || [],
                    recentLinks: recentLinks || [],
                    lastUpdated: new Date().toISOString()
                };
            } catch (error) {
                console.error(`❌ Error computing dashboard analytics for user ${userId}:`, error);

                // Return fallback data on error
                return {
                    stats: {
                        totalEvents: 0,
                        activeEvents: 0,
                        totalLinks: 0,
                        totalClicks: 0,
                        totalFans: 0,
                        totalSignups: 0
                    },
                    recentEvents: [],
                    recentLinks: [],
                    lastUpdated: new Date().toISOString(),
                    error: error.message
                };
            }
        }, cache.defaultTTL);
    }

    /**
     * Get comprehensive analytics page data
     */
    async getAnalyticsPageData(userId, options = {}) {
        const cacheKey = cache.getUserAnalyticsKey(userId, 'analytics');

        return await cache.getOrCompute(cacheKey, async() => {
            console.log(`📊 Computing analytics page data for user ${userId}`);

            try {
                // Get dashboard analytics as base
                const dashboardData = await this.getDashboardAnalytics(userId);

                // Get additional analytics data
                const [fanAnalytics, performanceMetrics] = await Promise.all([
                    query.event.getFanAnalytics(userId, { limit: 50 }).catch(err => {
                        console.error('❌ Error getting fan analytics:', err);
                        return { fans: [], totalCount: 0 };
                    }),
                    this.getPerformanceMetrics(userId).catch(err => {
                        console.error('❌ Error getting performance metrics:', err);
                        return {};
                    })
                ]);

                return {
                    ...dashboardData,
                    fanAnalytics: fanAnalytics || { fans: [], totalCount: 0 },
                    performanceMetrics: performanceMetrics || {},
                    lastUpdated: new Date().toISOString()
                };
            } catch (error) {
                console.error(`❌ Error computing analytics page data for user ${userId}:`, error);

                // Return fallback data
                return {
                    stats: {
                        totalDrops: 0,
                        activeDrops: 0,
                        totalLinks: 0,
                        totalClicks: 0,
                        totalFans: 0,
                        totalSignups: 0
                    },
                    recentDrops: [],
                    recentLinks: [],
                    fanAnalytics: { fans: [], totalCount: 0 },
                    performanceMetrics: {},
                    lastUpdated: new Date().toISOString(),
                    error: error.message
                };
            }
        }, cache.defaultTTL);
    }

    /**
     * Get performance metrics for analytics
     */
    async getPerformanceMetrics(userId) {
        try {
            const metricsResult = await knex.raw(`
                WITH user_events AS (
                    SELECT id FROM events WHERE user_id = ?
                ),
                signup_metrics AS (
                    SELECT
                        COUNT(*) as total_signups,
                        COUNT(DISTINCT email) as unique_signups,
                        AVG(CASE WHEN created_at >= NOW() - INTERVAL '7 days' THEN 1 ELSE 0 END) as weekly_growth_rate
                    FROM event_signups es
                    JOIN user_events ue ON es.event_id = ue.id
                ),
                link_metrics AS (
                    SELECT
                        AVG(visit_count) as avg_clicks_per_link,
                        MAX(visit_count) as max_clicks,
                        COUNT(CASE WHEN visit_count > 0 THEN 1 END) as active_links_count
                    FROM links
                    WHERE user_id = ?
                )
                SELECT
                    sm.*,
                    lm.*
                FROM signup_metrics sm
                CROSS JOIN link_metrics lm
            `, [userId, userId]);

            // Handle different database result formats
            let metrics;
            if (metricsResult.rows && metricsResult.rows.length > 0) {
                metrics = metricsResult.rows[0];
            } else if (Array.isArray(metricsResult) && metricsResult.length > 0) {
                metrics = metricsResult[0];
            } else {
                metrics = {
                    total_signups: 0,
                    unique_signups: 0,
                    weekly_growth_rate: 0,
                    avg_clicks_per_link: 0,
                    max_clicks: 0,
                    active_links_count: 0
                };
            }

            return {
                totalSignups: parseInt(metrics.total_signups) || 0,
                uniqueSignups: parseInt(metrics.unique_signups) || 0,
                weeklyGrowthRate: parseFloat(metrics.weekly_growth_rate) || 0,
                avgClicksPerLink: parseFloat(metrics.avg_clicks_per_link) || 0,
                maxClicks: parseInt(metrics.max_clicks) || 0,
                activeLinksCount: parseInt(metrics.active_links_count) || 0,
                conversionRate: metrics.unique_signups > 0 ?
                    ((metrics.total_signups / metrics.unique_signups) * 100).toFixed(2) : 0
            };
        } catch (error) {
            console.error(`❌ Error getting performance metrics for user ${userId}:`, error);
            return {};
        }
    }

    /**
     * Get drop-specific analytics
     */
    async getDropAnalytics(dropId, userId) {
        const cacheKey = cache.getDropAnalyticsKey(dropId);

        return await cache.getOrCompute(cacheKey, async() => {
            console.log(`📊 Computing drop analytics for drop ${dropId}`);

            const [drop, signups, recentSignups] = await Promise.all([
                query.drop.findWithStats({ id: dropId }),
                query.drop.findSignups(dropId),
                query.drop.findSignups(dropId, { limit: 10 })
            ]);

            if (!drop) {
                throw new Error('Drop not found');
            }

            const views = drop.view_count || 0;
            const fans = drop.signup_count || 0;
            const conversionRate = views > 0 ? ((fans / views) * 100).toFixed(1) : 0;

            return {
                drop,
                stats: {
                    views,
                    fans,
                    conversionRate,
                    totalSignups: signups.length
                },
                recentSignups: recentSignups.map(signup => ({
                    email: signup.email,
                    phone: signup.phone,
                    name: signup.name,
                    created_at: signup.created_at
                })),
                lastUpdated: new Date().toISOString()
            };
        }, cache.longTTL);
    }

    /**
     * Invalidate analytics cache when data changes
     */
    async invalidateUserCache(userId) {
        await cache.invalidateUserAnalytics(userId);
    }

    /**
     * Invalidate drop cache when drop data changes
     */
    async invalidateDropCache(dropId, userId) {
        await cache.invalidateDropAnalytics(dropId, userId);
    }

    /**
     * Invalidate event cache when event data changes (alias for invalidateDropCache)
     */
    async invalidateEventCache(eventId, userId) {
        await cache.invalidateDropAnalytics(eventId, userId);
    }

    /**
     * Get real-time analytics summary
     */
    async getRealTimeStats(userId) {
        try {
            // This bypasses cache for real-time data
            const statsResult = await knex.raw(`
                SELECT
                    (SELECT COUNT(*) FROM events WHERE user_id = ? AND created_at >= NOW() - INTERVAL '24 hours') as events_today,
                    (SELECT COUNT(*) FROM event_signups es JOIN events e ON es.event_id = e.id WHERE e.user_id = ? AND es.created_at >= NOW() - INTERVAL '24 hours') as signups_today,
                    (SELECT COUNT(*) FROM visits v JOIN links l ON v.link_id = l.id WHERE l.user_id = ? AND v.created_at >= NOW() - INTERVAL '24 hours') as clicks_today
            `, [userId, userId, userId]);

            // Handle different database result formats
            let stats;
            if (statsResult.rows && statsResult.rows.length > 0) {
                stats = statsResult.rows[0];
            } else if (Array.isArray(statsResult) && statsResult.length > 0) {
                stats = statsResult[0];
            } else {
                stats = { drops_today: 0, signups_today: 0, clicks_today: 0 };
            }

            return {
                dropsToday: parseInt(stats.drops_today) || 0,
                signupsToday: parseInt(stats.signups_today) || 0,
                clicksToday: parseInt(stats.clicks_today) || 0,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error(`❌ Error getting real-time stats for user ${userId}:`, error);
            return {
                dropsToday: 0,
                signupsToday: 0,
                clicksToday: 0,
                timestamp: new Date().toISOString(),
                error: error.message
            };
        }

        // Delegated Homepage Analytics methods are assigned on the prototype below to avoid class-body parsing issues
    }
}

// Attach delegated methods outside of class body to avoid parser quirks
AnalyticsService.prototype.getDashboardStats = function(userId, period = 'month') {
    return homepageAnalytics.getDashboardStats(userId, period);
};

AnalyticsService.prototype.getVisitorsByCountry = function(userId, period = 'month') {
    return homepageAnalytics.getVisitorsByCountry(userId, period);
};

AnalyticsService.prototype.getVisitorChannels = function(userId, period = 'month') {
    return homepageAnalytics.getVisitorChannels(userId, period);
};

AnalyticsService.prototype.getSocialChannels = function(userId, period = 'month') {
    return homepageAnalytics.getSocialChannels(userId, period);
};

module.exports = new AnalyticsService();