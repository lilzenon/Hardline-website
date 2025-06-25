const knex = require("../knex");
const { generateSlug } = require("../models/event.model");

// Simple normalizeMatch function for events
function normalizeMatch(match) {
    return match; // For events, we don't need complex normalization
}

// Create a new event
async function create(data) {
    // Generate unique slug if not provided
    if (!data.slug && data.title) {
        const existingSlugs = await knex("events").select("slug").then(rows => rows.map(r => r.slug));
        data.slug = generateSlug(data.title, existingSlugs);
    }

    // Ensure default colors are set if not provided
    const eventData = {
        background_color: '#ffffff',
        text_color: '#000000',
        button_color: '#007bff',
        button_text: 'Get Notified',
        is_active: true,
        collect_email: true,
        collect_phone: false,
        ...data // Override with provided data
    };

    const [id] = await knex("events").insert(eventData);
    return await knex("events").where("id", id).first();
}

// Find events with optional filters
async function find(match = {}) {
    const query = knex("events");

    if (match && Object.keys(match).length > 0) {
        query.where(normalizeMatch(match));
    }

    return await query.orderBy("created_at", "desc");
}

// Find a single event
async function findOne(match) {
    return await knex("events").where(normalizeMatch(match)).first();
}

// Find event by slug
async function findBySlug(slug) {
    return await knex("events").where("slug", slug).first();
}

// Find events by user
async function findByUser(userId, options = {}) {
    const query = knex("events")
        .where("user_id", userId)
        .orderBy("created_at", "desc");

    if (options.limit) {
        query.limit(options.limit);
    }

    if (options.offset) {
        query.offset(options.offset);
    }

    return await query;
}

// Update an event with enhanced error handling and logging
async function update(id, data) {
    try {
        console.log(`🔄 Updating event ${id} in database with fields:`, Object.keys(data));

        // Perform the update
        const updateResult = await knex("events").where("id", id).update(data);

        console.log(`✅ Event ${id} update result:`, updateResult);

        // Fetch and return the updated event
        const updatedEvent = await knex("events").where("id", id).first();

        if (!updatedEvent) {
            throw new Error(`Event ${id} not found after update`);
        }

        console.log(`✅ Event ${id} updated successfully`);
        return updatedEvent;

    } catch (error) {
        console.error(`❌ Error updating event ${id}:`, {
            error: error.message,
            code: error.code,
            detail: error.detail,
            fields: Object.keys(data)
        });

        // Re-throw with additional context
        const enhancedError = new Error(`Failed to update event ${id}: ${error.message}`);
        enhancedError.originalError = error;
        enhancedError.code = error.code;
        enhancedError.detail = error.detail;
        throw enhancedError;
    }
}

// Delete an event
async function remove(id) {
    return await knex("events").where("id", id).del();
}

// Get event with signup count
async function findWithStats(match) {
    const event = await knex("events")
        .where(normalizeMatch(match))
        .first();

    if (!event) return null;

    const signupCount = await getSignupCount(event.id);

    return {
        ...event,
        signup_count: signupCount
    };
}

// Get events with stats for user - OPTIMIZED VERSION
async function findByUserWithStats(userId, options = {}) {
    const query = knex("events as e")
        .select([
            "e.*",
            knex.raw("COALESCE(signup_counts.count, 0) as signup_count")
        ])
        .leftJoin(
            knex("event_signups")
            .select("event_id")
            .count("* as count")
            .groupBy("event_id")
            .as("signup_counts"),
            "e.id",
            "signup_counts.event_id"
        )
        .where("e.user_id", userId)
        .orderBy("e.created_at", "desc");

    if (options.limit) {
        query.limit(options.limit);
    }

    if (options.offset) {
        query.offset(options.offset);
    }

    return await query;
}

// Create a signup for an event
async function createSignup(eventId, signupData) {
    const data = {
        event_id: eventId,
        ...signupData
    };

    try {
        console.log('🔧 Attempting to insert signup data:', data);

        // PostgreSQL-compatible insert with returning clause
        const result = await knex("event_signups").insert(data).returning("*");

        console.log('✅ Insert result:', result);

        // PostgreSQL returns an array, get the first item
        const insertedSignup = Array.isArray(result) ? result[0] : result;

        console.log('✅ Inserted signup:', insertedSignup);

        // Invalidate analytics cache when new signup is created
        try {
            const analyticsService = require("../services/analytics/analytics.service");
            const event = await knex("events").where("id", eventId).first();
            if (event) {
                await analyticsService.invalidateEventCache(eventId, event.user_id);
                await analyticsService.invalidateUserCache(event.user_id);
                console.log(`📊 Invalidated analytics cache for event ${eventId} and user ${event.user_id}`);
            }
        } catch (cacheError) {
            console.error("❌ Error invalidating cache after signup:", cacheError);
            // Don't fail the signup if cache invalidation fails
        }

        return insertedSignup;
    } catch (error) {
        console.error('🚨 Insert error:', error);

        // Handle duplicate email signup (PostgreSQL uses different error codes)
        if (error.code === 'ER_DUP_ENTRY' ||
            error.code === 'SQLITE_CONSTRAINT' ||
            error.code === '23505' || // PostgreSQL unique violation
            error.constraint && error.constraint.includes('unique')) {
            throw new Error('Email already signed up for this drop');
        }
        throw error;
    }
}

// Find signups for a drop
async function findSignups(eventId, options = {}) {
    const query = knex("event_signups")
        .where("event_id", eventId)
        .orderBy("created_at", "desc");

    if (options.limit) {
        query.limit(options.limit);
    }

    if (options.offset) {
        query.offset(options.offset);
    }

    return await query;
}

// Get signup count for a drop
async function getSignupCount(eventId) {
    const result = await knex("event_signups")
        .where("event_id", eventId)
        .count("id as count")
        .first();
    return parseInt(result.count) || 0;
}

// Check if email is already signed up
async function isEmailSignedUp(eventId, email) {
    // Return false if no email provided (can't be a duplicate)
    if (!email) {
        console.log('🔍 No email provided for duplicate check');
        return false;
    }

    const signup = await knex("event_signups")
        .where("event_id", eventId)
        .where("email", email)
        .first();
    return !!signup;
}

// Check if phone number is already signed up
async function isPhoneSignedUp(eventId, phone) {
    // Return false if no phone provided (can't be a duplicate)
    if (!phone) {
        console.log('🔍 No phone provided for duplicate check');
        return false;
    }

    const signup = await knex("event_signups")
        .where("event_id", eventId)
        .where("phone", phone)
        .first();
    return !!signup;
}

// Count drops by user
async function countByUser(userId) {
    const result = await knex("events")
        .where("user_id", userId)
        .count("id as count")
        .first();
    return parseInt(result.count) || 0;
}

// Get total fans by user (across all events)
async function getTotalFansByUser(userId) {
    const result = await knex("event_signups as es")
        .join("events as e", "es.event_id", "e.id")
        .where("e.user_id", userId)
        .countDistinct("es.email as count")
        .first();
    return parseInt(result.count) || 0;
}

// 🚀 ADVANCED ANALYTICS - LAYLO-STYLE FANS SYSTEM

// Get comprehensive fan analytics for a user's drops
async function getFanAnalytics(userId, options = {}) {
    const { limit = 100, offset = 0, search = '', sortBy = 'latest', eventId = null } = options;

    let query = knex("event_signups as es")
        .select([
            "es.email",
            "es.name",
            "es.phone",
            "es.ip_address",
            "es.created_at as join_date",
            "es.referrer",
            "e.title as event_title",
            "e.slug as event_slug",
            "e.id as event_id"
        ])
        .select(knex.raw(`
            COUNT(*) OVER (PARTITION BY es.email) as total_rsvps,
            ROW_NUMBER() OVER (PARTITION BY es.email ORDER BY es.created_at ASC) as rsvp_rank
        `))
        .join("events as e", "es.event_id", "e.id")
        .where("e.user_id", userId);

    // Filter by specific event if provided
    if (eventId) {
        query = query.where("e.id", eventId);
    }

    // Search functionality
    if (search) {
        query = query.where(function() {
            this.where("es.email", "like", `%${search}%`)
                .orWhere("es.name", "like", `%${search}%`)
                .orWhere("e.title", "like", `%${search}%`);
        });
    }

    // Sorting
    switch (sortBy) {
        case 'latest':
            query = query.orderBy("es.created_at", "desc");
            break;
        case 'oldest':
            query = query.orderBy("es.created_at", "asc");
            break;
        case 'most_active':
            query = query.orderBy("total_rsvps", "desc").orderBy("es.created_at", "desc");
            break;
        case 'name':
            query = query.orderBy("es.name", "asc");
            break;
        case 'email':
            query = query.orderBy("es.email", "asc");
            break;
        default:
            query = query.orderBy("es.created_at", "desc");
    }

    // Apply pagination
    const fans = await query.limit(limit).offset(offset);

    // Get total count for pagination
    const totalQuery = knex("event_signups as ds")
        .join("events as e", "ds.event_id", "e.id")
        .where("e.user_id", userId);

    if (eventId) {
        totalQuery.where("e.id", eventId);
    }

    if (search) {
        totalQuery.where(function() {
            this.where("es.email", "like", `%${search}%`)
                .orWhere("es.name", "like", `%${search}%`)
                .orWhere("e.title", "like", `%${search}%`);
        });
    }

    const totalResult = await totalQuery.countDistinct("es.email as count").first();
    const total = parseInt(totalResult.count) || 0;

    // Process fans data to add location and acquisition channel
    const processedFans = await Promise.all(fans.map(async(fan) => {
        // Get location from IP address
        const location = await getLocationFromIP(fan.ip_address);

        // Determine acquisition channel
        const acquisitionChannel = getAcquisitionChannel(fan.referrer);

        // Get all events this fan has signed up for
        const fanEvents = await knex("event_signups as es")
            .select("e.title", "e.slug", "es.created_at")
            .join("events as e", "es.event_id", "e.id")
            .where("es.email", fan.email)
            .where("e.user_id", userId)
            .orderBy("es.created_at", "desc");

        return {
            ...fan,
            location: location,
            acquisition_channel: acquisitionChannel,
            fan_events: fanEvents,
            is_repeat_fan: fan.total_rsvps > 1
        };
    }));

    return {
        fans: processedFans,
        total: total,
        hasMore: (offset + limit) < total,
        pagination: {
            limit,
            offset,
            total,
            pages: Math.ceil(total / limit),
            currentPage: Math.floor(offset / limit) + 1
        }
    };
}

// Get fan summary statistics for dashboard
async function getFanSummaryStats(userId, eventId = null) {
    try {
        console.log(`🚀 Getting fan summary stats for user ${userId}, drop ${eventId}`);

        let baseQuery = knex("event_signups as ds")
            .join("events as e", "ds.event_id", "e.id")
            .where("e.user_id", userId);

        if (eventId) {
            baseQuery = baseQuery.where("e.id", eventId);
        }

        // Total unique fans
        const uniqueFansResult = await baseQuery.clone().countDistinct("es.email as count").first();
        const totalUniqueFans = parseInt(uniqueFansResult.count) || 0;

        // Total RSVPs
        const totalRSVPsResult = await baseQuery.clone().count("es.id as count").first();
        const totalRSVPs = parseInt(totalRSVPsResult.count) || 0;

        // Repeat fans (fans who have RSVP'd to multiple events)
        const repeatFansResult = await knex("event_signups as es")
            .join("events as e", "es.event_id", "e.id")
            .where("e.user_id", userId)
            .select("es.email")
            .groupBy("es.email")
            .having(knex.raw("COUNT(*) > 1"))
            .then(results => results.length);

        // Recent signups (last 7 days) - PostgreSQL compatible
        const recentSignupsResult = await baseQuery.clone()
            .where("es.created_at", ">=", knex.raw("NOW() - INTERVAL '7 days'"))
            .count("es.id as count")
            .first();
        const recentSignups = parseInt(recentSignupsResult.count) || 0;

        // Top acquisition channels
        const topChannels = await baseQuery.clone()
            .select(knex.raw(`
            CASE
                WHEN es.referrer IS NULL OR es.referrer = '' THEN 'Direct'
                WHEN es.referrer LIKE '%instagram%' THEN 'Instagram'
                WHEN es.referrer LIKE '%twitter%' OR es.referrer LIKE '%t.co%' THEN 'Twitter'
                WHEN es.referrer LIKE '%facebook%' THEN 'Facebook'
                WHEN es.referrer LIKE '%tiktok%' THEN 'TikTok'
                WHEN es.referrer LIKE '%youtube%' THEN 'YouTube'
                WHEN es.referrer LIKE '%google%' THEN 'Google'
                ELSE 'Other'
            END as channel
        `))
            .count("es.id as count")
            .groupBy("channel")
            .orderBy("count", "desc")
            .limit(5);

        // Growth trend (last 30 days) - PostgreSQL compatible
        const growthTrend = await baseQuery.clone()
            .select(knex.raw("DATE(es.created_at) as date"))
            .count("es.id as signups")
            .where("es.created_at", ">=", knex.raw("NOW() - INTERVAL '30 days'"))
            .groupBy("date")
            .orderBy("date", "asc");

        const result = {
            totalUniqueFans,
            totalRSVPs,
            repeatFans: repeatFansResult,
            recentSignups,
            averageRSVPsPerFan: totalUniqueFans > 0 ? (totalRSVPs / totalUniqueFans).toFixed(1) : '0',
            topAcquisitionChannels: topChannels || [],
            growthTrend: growthTrend || []
        };

        console.log(`✅ Fan summary stats result:`, result);
        return result;

    } catch (error) {
        console.error('🚨 Error in getFanSummaryStats:', error);
        // Return default stats on error
        return {
            totalUniqueFans: 0,
            totalRSVPs: 0,
            repeatFans: 0,
            recentSignups: 0,
            averageRSVPsPerFan: '0',
            topAcquisitionChannels: [],
            growthTrend: []
        };
    }
}

// Get location from IP address (simplified - you can integrate with a real IP geolocation service)
async function getLocationFromIP(ipAddress) {
    if (!ipAddress || ipAddress === '127.0.0.1' || ipAddress === '::1') {
        return 'Local';
    }

    // For now, return a placeholder. In production, integrate with:
    // - MaxMind GeoIP2
    // - IPinfo.io
    // - ipapi.co
    // - etc.

    try {
        // Simple IP-based location detection
        const geoip = require('geoip-lite');
        const geo = geoip.lookup(ipAddress);

        if (geo) {
            return `${geo.city || 'Unknown'}, ${geo.region || ''} ${geo.country || ''}`.trim();
        }
    } catch (error) {
        console.warn('GeoIP lookup failed:', error.message);
    }

    return 'Unknown';
}

// Determine acquisition channel from referrer
function getAcquisitionChannel(referrer) {
    if (!referrer || referrer === '') {
        return 'Direct';
    }

    const ref = referrer.toLowerCase();

    if (ref.includes('instagram')) return 'Instagram';
    if (ref.includes('twitter') || ref.includes('t.co')) return 'Twitter';
    if (ref.includes('facebook')) return 'Facebook';
    if (ref.includes('tiktok')) return 'TikTok';
    if (ref.includes('youtube')) return 'YouTube';
    if (ref.includes('google')) return 'Google';
    if (ref.includes('linkedin')) return 'LinkedIn';
    if (ref.includes('reddit')) return 'Reddit';
    if (ref.includes('discord')) return 'Discord';
    if (ref.includes('telegram')) return 'Telegram';

    // Check for common UTM parameters
    if (ref.includes('utm_source=email')) return 'Email';
    if (ref.includes('utm_source=sms')) return 'SMS';
    if (ref.includes('utm_source=newsletter')) return 'Newsletter';

    return 'Other';
}

// Get featured events for homepage display
async function getFeaturedEvents(options = {}) {
    const { limit = 6 } = options;

    try {
        console.log('🔍 getFeaturedEvents: Starting query with options:', options);

        // Enhanced query with explicit field selection for homepage display
        const query = knex("events")
            .select([
                "events.id",
                "events.title",
                "events.description",
                "events.slug",
                "events.cover_image",
                "events.background_color",
                "events.gradient_data",
                "events.text_color",
                "events.button_color",
                "events.button_text",
                "events.button_text_color",
                "events.background_type",
                "events.card_background_type",
                "events.is_active",
                "events.show_on_homepage",
                "events.created_at",
                "events.updated_at",
                // 🎪 Event-specific fields for homepage display
                "events.artist_name",
                "events.event_date",
                "events.event_address",
                "events.posh_embed_url",
                knex.raw("COALESCE(COUNT(event_signups.id), 0) as signup_count")
            ])
            .leftJoin("event_signups", "events.id", "event_signups.event_id")
            .where("events.show_on_homepage", true)
            .where("events.is_active", true)
            .groupBy([
                "events.id",
                "events.title",
                "events.description",
                "events.slug",
                "events.cover_image",
                "events.background_color",
                "events.gradient_data",
                "events.text_color",
                "events.button_color",
                "events.button_text",
                "events.button_text_color",
                "events.background_type",
                "events.card_background_type",
                "events.is_active",
                "events.show_on_homepage",
                "events.created_at",
                "events.updated_at",
                "events.artist_name",
                "events.event_date",
                "events.event_address",
                "events.posh_embed_url"
            ])
            .orderBy("events.created_at", "desc")
            .limit(limit);

        console.log('🔍 getFeaturedEvents: Executing query...');
        const result = await query;

        console.log('🎯 getFeaturedEvents: Query completed', {
            resultCount: result.length,
            events: result.map(event => ({
                id: event.id,
                title: event.title,
                artist_name: event.artist_name,
                event_date: event.event_date,
                event_address: event.event_address,
                cover_image: event.cover_image,
                show_on_homepage: event.show_on_homepage,
                is_active: event.is_active
            }))
        });

        return result;
    } catch (error) {
        console.error('❌ Error in getFeaturedEvents:', error);
        console.error('❌ Error details:', {
            message: error.message,
            stack: error.stack
        });
        // Return empty array as fallback
        return [];
    }
}

// 🎯 QR CODE FUNCTIONS

// Find event by QR identifier
async function findByQRIdentifier(qrIdentifier) {
    return await knex("events").where("qr_code_identifier", qrIdentifier).first();
}

// Track QR code scan
async function trackQRCodeScan(scanData) {
    const [id] = await knex("qr_code_scans").insert(scanData);
    return await knex("qr_code_scans").where("id", id).first();
}

// Get QR code analytics for an event
async function getQRCodeAnalytics(eventId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total scans
    const totalScansResult = await knex("qr_code_scans")
        .where("event_id", eventId)
        .count("id as count")
        .first();
    const totalScans = parseInt(totalScansResult.count) || 0;

    // Unique scans (by IP address)
    const uniqueScansResult = await knex("qr_code_scans")
        .where("event_id", eventId)
        .countDistinct("ip_address as count")
        .first();
    const uniqueScans = parseInt(uniqueScansResult.count) || 0;

    // Recent scans (last 7 days)
    const recentScansResult = await knex("qr_code_scans")
        .where("event_id", eventId)
        .where("scan_timestamp", ">=", knex.raw("NOW() - INTERVAL '7 days'"))
        .count("id as count")
        .first();
    const recentScans = parseInt(recentScansResult.count) || 0;

    // Device breakdown
    const deviceBreakdown = await knex("qr_code_scans")
        .where("event_id", eventId)
        .select("device_type")
        .count("id as count")
        .groupBy("device_type")
        .orderBy("count", "desc");

    // Daily scan trend (last 30 days)
    const dailyTrend = await knex("qr_code_scans")
        .where("event_id", eventId)
        .where("scan_timestamp", ">=", startDate)
        .select(knex.raw("DATE(scan_timestamp) as date"))
        .count("id as scans")
        .groupBy("date")
        .orderBy("date", "asc");

    // Recent scan activity (last 10 scans)
    const recentActivity = await knex("qr_code_scans")
        .where("event_id", eventId)
        .select([
            "scan_timestamp",
            "device_type",
            "browser_name",
            "os_name",
            "country_code",
            "city"
        ])
        .orderBy("scan_timestamp", "desc")
        .limit(10);

    return {
        totalScans,
        uniqueScans,
        recentScans,
        deviceBreakdown: deviceBreakdown || [],
        dailyTrend: dailyTrend || [],
        recentActivity: recentActivity || []
    };
}

module.exports = {
    create,
    find,
    findOne,
    findBySlug,
    findByUser,
    findByUserWithStats,
    findWithStats,
    update,
    remove,
    createSignup,
    findSignups,
    getSignupCount,
    isEmailSignedUp,
    isPhoneSignedUp,
    countByUser,
    getTotalFansByUser,
    // 🚀 Advanced Analytics
    getFanAnalytics,
    getFanSummaryStats,
    getLocationFromIP,
    getAcquisitionChannel,
    // 🏠 Homepage Features
    getFeaturedEvents,
    // 🎯 QR Code Functions
    findByQRIdentifier,
    trackQRCodeScan,
    getQRCodeAnalytics
};