const UAParser = require('ua-parser-js');
const geoip = require('geoip-lite');
const { v4: uuidv4 } = require('uuid');
const analyticsQueries = require('../queries/analytics.queries');
const { hasAnalyticsConsent, hasDoNotTrack, anonymizeIP } = require('./privacy.middleware');

/**
 * Enhanced Analytics Tracking Middleware
 * Captures comprehensive user interaction data for events
 */

// Generate or retrieve session ID
function getSessionId(req) {
    // Check if session ID exists in cookies
    if (req.cookies && req.cookies.analytics_session) {
        return req.cookies.analytics_session;
    }

    // Generate new session ID
    const sessionId = uuidv4();
    return sessionId;
}

// Extract device and browser information
function getDeviceInfo(userAgent) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    // Determine device type
    let deviceType = 'desktop';
    if (result.device.type === 'tablet') {
        deviceType = 'tablet';
    } else if (result.device.type === 'mobile' ||
        (result.os.name && (result.os.name.includes('Android') || result.os.name.includes('iOS')))) {
        deviceType = 'mobile';
    }

    return {
        deviceType,
        browserName: result.browser.name || 'Unknown',
        browserVersion: result.browser.version || 'Unknown',
        osName: result.os.name || 'Unknown',
        osVersion: result.os.version || 'Unknown'
    };
}

// Extract location information
function getLocationInfo(ipAddress) {
    const geo = geoip.lookup(ipAddress);
    if (!geo) {
        return {
            countryCode: null,
            region: null,
            city: null,
            latitude: null,
            longitude: null,
            timezone: null
        };
    }

    return {
        countryCode: geo.country || null,
        region: geo.region || null,
        city: geo.city || null,
        latitude: geo.ll ? geo.ll[0] : null,
        longitude: geo.ll ? geo.ll[1] : null,
        timezone: geo.timezone || null
    };
}

// Extract UTM parameters
function getUtmParameters(req) {
    const query = req.query || {};
    return {
        utmSource: query.utm_source || null,
        utmMedium: query.utm_medium || null,
        utmCampaign: query.utm_campaign || null
    };
}

// Check if visitor is unique (based on IP and user agent combination)
async function isUniqueVisitor(eventId, ipAddress, userAgent, days = 30) {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        const existingViews = await analyticsQueries.getEventPageViews(eventId, {
            days,
            limit: 1
        });

        const hasVisited = existingViews.some(view =>
            view.ip_address === ipAddress &&
            view.user_agent === userAgent
        );

        return !hasVisited;
    } catch (error) {
        console.error('Error checking unique visitor:', error);
        return false;
    }
}

// Main analytics tracking middleware
async function trackPageView(req, res, next) {
    try {
        // Check privacy compliance first
        if (hasDoNotTrack(req)) {
            console.log('🔒 Analytics tracking skipped: Do Not Track enabled');
            return next();
        }

        if (!hasAnalyticsConsent(req)) {
            console.log('🔒 Analytics tracking skipped: No consent given');
            return next();
        }

        // Only track for event pages
        const eventSlug = req.params.slug;
        if (!eventSlug) {
            return next();
        }

        // Get event information (assuming it's available in res.locals or req)
        const event = res.locals.event || req.event;
        if (!event) {
            return next();
        }

        // Extract request information with privacy compliance
        const userAgent = req.get('User-Agent') || '';
        const rawIP = req.ip || req.connection.remoteAddress || '';
        const ipAddress = anonymizeIP(rawIP); // Privacy-compliant IP anonymization
        const referrer = req.get('Referrer') || req.get('Referer') || '';
        const sessionId = getSessionId(req);

        // Set session cookie (expires in 30 days)
        res.cookie('analytics_session', sessionId, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        // Extract device and location information
        const deviceInfo = getDeviceInfo(userAgent);
        const locationInfo = getLocationInfo(ipAddress);
        const utmParams = getUtmParameters(req);

        // Check if this is a unique visitor
        const isUnique = await isUniqueVisitor(event.id, ipAddress, userAgent);

        // Check if this is a returning visitor (has session history)
        const existingSessions = await analyticsQueries.getSessionAnalytics(event.id, 365);
        const isReturning = existingSessions.some(session =>
            session.session_id !== sessionId &&
            (session.ip_address === ipAddress || session.user_agent === userAgent)
        );

        // Determine QR code ID if this is a QR code access
        let qrCodeId = null;
        if (req.query.qr) {
            try {
                const qrCode = await analyticsQueries.getQRCodeByIdentifier(req.query.qr);
                if (qrCode && qrCode.event_id === event.id) {
                    qrCodeId = qrCode.id;
                }
            } catch (error) {
                console.error('Error finding QR code:', error);
            }
        }

        // Prepare page view data
        const pageViewData = {
            event_id: event.id,
            qr_code_id: qrCodeId,
            session_id: sessionId,
            user_agent: userAgent,
            ip_address: ipAddress,
            referrer: referrer,
            utm_source: utmParams.utmSource,
            utm_medium: utmParams.utmMedium,
            utm_campaign: utmParams.utmCampaign,
            device_type: deviceInfo.deviceType,
            browser_name: deviceInfo.browserName,
            browser_version: deviceInfo.browserVersion,
            os_name: deviceInfo.osName,
            os_version: deviceInfo.osVersion,
            country_code: locationInfo.countryCode,
            region: locationInfo.region,
            city: locationInfo.city,
            latitude: locationInfo.latitude,
            longitude: locationInfo.longitude,
            timezone: locationInfo.timezone,
            is_unique_visitor: isUnique,
            is_returning_visitor: isReturning,
            page_url: req.originalUrl,
            page_title: event.title
        };

        // Track the page view
        await analyticsQueries.trackPageView(pageViewData);

        // Update or create user session
        const sessionData = {
            session_id: sessionId,
            ip_address: ipAddress,
            user_agent: userAgent,
            referrer: referrer,
            utm_source: utmParams.utmSource,
            utm_medium: utmParams.utmMedium,
            utm_campaign: utmParams.utmCampaign,
            device_type: deviceInfo.deviceType,
            browser_name: deviceInfo.browserName,
            os_name: deviceInfo.osName,
            country_code: locationInfo.countryCode,
            city: locationInfo.city
        };

        await analyticsQueries.upsertUserSession(sessionData);

        // Increment QR code scan count if applicable
        if (qrCodeId) {
            await analyticsQueries.incrementQRCodeScanCount(qrCodeId);
        }

        console.log(`📊 Analytics tracked: Event ${event.id}, Session ${sessionId}, Unique: ${isUnique}`);

    } catch (error) {
        console.error('Analytics tracking error:', error);
        // Don't fail the request if analytics fails
    }

    next();
}

// Track conversion (signup)
async function trackConversion(sessionId, eventId) {
    try {
        await analyticsQueries.markSessionConverted(sessionId);
        console.log(`🎯 Conversion tracked: Session ${sessionId}, Event ${eventId}`);
    } catch (error) {
        console.error('Conversion tracking error:', error);
    }
}

// Middleware to extract session ID for conversion tracking
function extractSessionForConversion(req, res, next) {
    if (req.cookies && req.cookies.analytics_session) {
        req.analyticsSessionId = req.cookies.analytics_session;
    }
    next();
}

module.exports = {
    trackPageView,
    trackConversion,
    extractSessionForConversion,
    getSessionId,
    getDeviceInfo,
    getLocationInfo,
    getUtmParameters
};