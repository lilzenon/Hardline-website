const knex = require("../knex");
const { nanoid } = require("nanoid");
const { generateQRId } = require("../utils/utils");

// ===== QR CODE MANAGEMENT =====

// Create a new QR code for an event
async function createQRCode(eventId, qrCodeData) {
    // Generate unique 4-character alphanumeric identifier
    const identifier = await generateQRId(module.exports);

    const data = {
        event_id: eventId,
        identifier: identifier,
        scan_count: 0,
        ...qrCodeData
    };

    const result = await knex("event_qr_codes").insert(data).returning("id");
    let id;
    if (Array.isArray(result)) {
        id = typeof result[0] === 'object' ? result[0].id : result[0];
    } else {
        id = typeof result === 'object' ? result.id : result;
    }
    return await knex("event_qr_codes").where("id", id).first();
}

// Get all QR codes for an event
async function getEventQRCodes(eventId) {
    return await knex("event_qr_codes")
        .where("event_id", eventId)
        .orderBy("created_at", "desc");
}

// Get QR code by identifier
async function getQRCodeByIdentifier(identifier) {
    return await knex("event_qr_codes")
        .where("identifier", identifier)
        .where("is_active", true)
        .first();
}

// Update QR code
async function updateQRCode(id, data) {
    await knex("event_qr_codes").where("id", id).update({
        ...data,
        updated_at: knex.fn.now()
    });
    return await knex("event_qr_codes").where("id", id).first();
}

// Delete QR code
async function deleteQRCode(id) {
    return await knex("event_qr_codes").where("id", id).del();
}

// Increment QR code scan count
async function incrementQRCodeScanCount(qrCodeId) {
    return await knex("event_qr_codes")
        .where("id", qrCodeId)
        .increment("scan_count", 1);
}

// ===== PAGE VIEW TRACKING =====

// Track a page view
async function trackPageView(pageViewData) {
    const result = await knex("event_page_views").insert(pageViewData).returning("id");
    let id;
    if (Array.isArray(result)) {
        id = typeof result[0] === 'object' ? result[0].id : result[0];
    } else {
        id = typeof result === 'object' ? result.id : result;
    }
    return await knex("event_page_views").where("id", id).first();
}

// Get page views for an event
async function getEventPageViews(eventId, options = {}) {
    const { days = 30, limit = 1000, offset = 0 } = options;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let query = knex("event_page_views")
        .where("event_id", eventId)
        .where("view_timestamp", ">=", startDate);

    if (limit) {
        query = query.limit(limit).offset(offset);
    }

    return await query.orderBy("view_timestamp", "desc");
}

// Get unique visitors count for an event
async function getUniqueVisitorsCount(eventId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const result = await knex("event_page_views")
        .where("event_id", eventId)
        .where("view_timestamp", ">=", startDate)
        .countDistinct("ip_address as count")
        .first();

    return parseInt(result.count) || 0;
}

// Get total page views count for an event
async function getTotalPageViewsCount(eventId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const result = await knex("event_page_views")
        .where("event_id", eventId)
        .where("view_timestamp", ">=", startDate)
        .count("id as count")
        .first();

    return parseInt(result.count) || 0;
}

// ===== SESSION TRACKING =====

// Create or update user session
async function upsertUserSession(sessionData) {
    const existingSession = await knex("user_sessions")
        .where("session_id", sessionData.session_id)
        .first();

    if (existingSession) {
        // Calculate session duration (time since first visit)
        const now = new Date();
        const firstVisit = new Date(existingSession.first_visit);
        const sessionDuration = Math.floor((now - firstVisit) / 1000); // in seconds

        // Update existing session
        await knex("user_sessions")
            .where("session_id", sessionData.session_id)
            .update({
                last_activity: knex.fn.now(),
                page_views: knex.raw("page_views + 1"),
                total_time: sessionDuration,
                updated_at: knex.fn.now()
            });
        return await knex("user_sessions")
            .where("session_id", sessionData.session_id)
            .first();
    } else {
        // Create new session
        const result = await knex("user_sessions").insert({
            ...sessionData,
            page_views: 1
        }).returning("id");
        let id;
        if (Array.isArray(result)) {
            id = typeof result[0] === 'object' ? result[0].id : result[0];
        } else {
            id = typeof result === 'object' ? result.id : result;
        }
        return await knex("user_sessions").where("id", id).first();
    }
}

// Mark session as converted
async function markSessionConverted(sessionId) {
    return await knex("user_sessions")
        .where("session_id", sessionId)
        .update({
            converted: true,
            conversion_timestamp: knex.fn.now(),
            updated_at: knex.fn.now()
        });
}

// Get session analytics for an event
async function getSessionAnalytics(eventId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get sessions that viewed this event
    const sessions = await knex("user_sessions as us")
        .join("event_page_views as epv", "us.session_id", "epv.session_id")
        .where("epv.event_id", eventId)
        .where("us.first_visit", ">=", startDate)
        .select([
            "us.session_id",
            "us.first_visit",
            "us.last_activity",
            "us.page_views",
            "us.total_time",
            "us.device_type",
            "us.country_code",
            "us.converted",
            "us.conversion_timestamp"
        ])
        .groupBy([
            "us.session_id",
            "us.first_visit",
            "us.last_activity",
            "us.page_views",
            "us.total_time",
            "us.device_type",
            "us.country_code",
            "us.converted",
            "us.conversion_timestamp"
        ])
        .orderBy("us.first_visit", "desc");

    return sessions;
}

// ===== COMPREHENSIVE ANALYTICS =====

// Get comprehensive analytics for an event
async function getComprehensiveAnalytics(eventId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total page views
    const totalViews = await getTotalPageViewsCount(eventId, days);

    // Unique visitors
    const uniqueVisitors = await getUniqueVisitorsCount(eventId, days);

    // QR code scans
    const qrScansResult = await knex("qr_code_scans")
        .where("event_id", eventId)
        .where("scan_timestamp", ">=", startDate)
        .count("id as count")
        .first();
    const qrScans = parseInt(qrScansResult.count) || 0;

    // Unique QR scans
    const uniqueQrScansResult = await knex("qr_code_scans")
        .where("event_id", eventId)
        .where("scan_timestamp", ">=", startDate)
        .countDistinct("ip_address as count")
        .first();
    const uniqueQrScans = parseInt(uniqueQrScansResult.count) || 0;

    // Conversions (signups)
    const conversionsResult = await knex("event_signups")
        .where("event_id", eventId)
        .where("created_at", ">=", startDate)
        .count("id as count")
        .first();
    const conversions = parseInt(conversionsResult.count) || 0;

    // Mock data for new metrics (to be implemented with proper tracking)
    const ticketClicks = Math.floor(totalViews * 0.15); // 15% of views click tickets
    const ticketClicksChange = Math.random() * 20 - 10; // Random change for demo

    // Conversion rate
    const conversionRate = totalViews > 0 ? ((conversions / totalViews) * 100).toFixed(2) : 0;

    // Device breakdown
    const deviceBreakdown = await knex("event_page_views")
        .where("event_id", eventId)
        .where("view_timestamp", ">=", startDate)
        .select("device_type")
        .count("id as count")
        .groupBy("device_type")
        .orderBy("count", "desc");

    // Traffic sources
    const trafficSources = await knex("event_page_views")
        .where("event_id", eventId)
        .where("view_timestamp", ">=", startDate)
        .select("utm_source")
        .count("id as count")
        .whereNotNull("utm_source")
        .groupBy("utm_source")
        .orderBy("count", "desc")
        .limit(10);

    // Daily trend
    const dailyTrend = await knex("event_page_views")
        .where("event_id", eventId)
        .where("view_timestamp", ">=", startDate)
        .select(knex.raw("DATE(view_timestamp) as date"))
        .count("id as views")
        .groupBy("date")
        .orderBy("date", "asc");

    // Average session time
    const sessionTimeResult = await knex("user_sessions as us")
        .join("event_page_views as epv", "us.session_id", "epv.session_id")
        .where("epv.event_id", eventId)
        .where("us.first_visit", ">=", startDate)
        .avg("us.total_time as avg_time")
        .first();

    const avgSessionTime = parseFloat(sessionTimeResult.avg_time) || 0;

    return {
        totalViews,
        uniqueVisitors,
        qrScans,
        uniqueQrScans,
        conversions,
        conversionRate: parseFloat(conversionRate),
        avgSessionTime: Math.round(avgSessionTime),
        deviceBreakdown: deviceBreakdown || [],
        trafficSources: trafficSources || [],
        dailyTrend: dailyTrend || [],
        // New metrics
        ticketClicks,
        ticketClicksChange,
        // Mock change data for existing metrics
        viewsChange: Math.random() * 20 - 10,
        uniqueChange: Math.random() * 15 - 7.5,
        conversionsChange: Math.random() * 25 - 12.5,
        qrScansChange: Math.random() * 30 - 15
    };
}

module.exports = {
    // QR Code Management
    createQRCode,
    getEventQRCodes,
    getQRCodeByIdentifier,
    updateQRCode,
    deleteQRCode,
    incrementQRCodeScanCount,

    // Page View Tracking
    trackPageView,
    getEventPageViews,
    getUniqueVisitorsCount,
    getTotalPageViewsCount,

    // Session Tracking
    upsertUserSession,
    markSessionConverted,
    getSessionAnalytics,

    // Comprehensive Analytics
    getComprehensiveAnalytics
};