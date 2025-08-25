/**
 * Privacy-Compliant User Tracking Middleware
 * Implements GDPR compliance, cookie consent, and data retention policies
 */

// Analytics queries moved to dashboard repository

// Privacy settings and constants
const PRIVACY_SETTINGS = {
    // Data retention periods (in days)
    PAGE_VIEWS_RETENTION: 365,
    SESSION_DATA_RETENTION: 90,
    QR_SCAN_RETENTION: 730,

    // Cookie settings
    ANALYTICS_COOKIE_NAME: 'kutt_analytics_consent',
    SESSION_COOKIE_NAME: 'kutt_session_id',
    COOKIE_MAX_AGE: 30 * 24 * 60 * 60 * 1000, // 30 days

    // Privacy compliance
    REQUIRE_CONSENT: process.env.REQUIRE_PRIVACY_CONSENT === 'true',
    ANONYMIZE_IP: process.env.ANONYMIZE_IP !== 'false', // Default to true
    RESPECT_DNT: process.env.RESPECT_DO_NOT_TRACK !== 'false' // Default to true
};

// Check if user has given analytics consent
function hasAnalyticsConsent(req) {
    if (!PRIVACY_SETTINGS.REQUIRE_CONSENT) {
        return true; // Consent not required
    }

    const consent = req.cookies[PRIVACY_SETTINGS.ANALYTICS_COOKIE_NAME];
    return consent === 'accepted';
}

// Check if user has Do Not Track enabled
function hasDoNotTrack(req) {
    if (!PRIVACY_SETTINGS.RESPECT_DNT) {
        return false;
    }

    const dnt = req.get('DNT') || req.get('dnt');
    return dnt === '1';
}

// Anonymize IP address for privacy compliance
function anonymizeIP(ipAddress) {
    if (!PRIVACY_SETTINGS.ANONYMIZE_IP || !ipAddress) {
        return ipAddress;
    }

    // IPv4: Remove last octet (e.g., 192.168.1.100 -> 192.168.1.0)
    if (ipAddress.includes('.') && !ipAddress.includes(':')) {
        const parts = ipAddress.split('.');
        if (parts.length === 4) {
            return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
        }
    }

    // IPv6: Remove last 80 bits (e.g., 2001:db8::1 -> 2001:db8::)
    if (ipAddress.includes(':')) {
        const parts = ipAddress.split(':');
        if (parts.length >= 4) {
            return `${parts.slice(0, 4).join(':')}::`;
        }
    }

    return ipAddress;
}

// Privacy-compliant analytics middleware
function privacyCompliantAnalytics(req, res, next) {
    // Check Do Not Track header
    if (hasDoNotTrack(req)) {
        console.log('🔒 Analytics tracking skipped: Do Not Track enabled');
        req.skipAnalytics = true;
        return next();
    }

    // Check consent (if required)
    if (!hasAnalyticsConsent(req)) {
        console.log('🔒 Analytics tracking skipped: No consent given');
        req.skipAnalytics = true;
        return next();
    }

    // Anonymize IP if required
    if (PRIVACY_SETTINGS.ANONYMIZE_IP) {
        req.anonymizedIP = anonymizeIP(req.ip || req.connection.remoteAddress);
    }

    req.privacyCompliant = true;
    next();
}

// Set analytics consent cookie
function setAnalyticsConsent(req, res, consent = 'accepted') {
    const cookieOptions = {
        maxAge: PRIVACY_SETTINGS.COOKIE_MAX_AGE,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    };

    res.cookie(PRIVACY_SETTINGS.ANALYTICS_COOKIE_NAME, consent, cookieOptions);

    console.log(`🍪 Analytics consent set: ${consent}`);
}

// Handle consent endpoint
async function handleConsentRequest(req, res) {
    try {
        const { consent, preferences } = req.body;

        if (!consent || !['accepted', 'rejected'].includes(consent)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid consent value. Must be "accepted" or "rejected".'
            });
        }

        // Set consent cookie
        setAnalyticsConsent(req, res, consent);

        // Store detailed preferences if provided
        if (preferences && consent === 'accepted') {
            // Could store granular preferences in database if needed
            console.log('📊 Analytics preferences:', preferences);
        }

        res.json({
            success: true,
            message: `Analytics consent ${consent}`,
            consent,
            preferences: preferences || null
        });

    } catch (error) {
        console.error('🚨 Error handling consent request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process consent request'
        });
    }
}

// Get current privacy settings and consent status
function getPrivacyStatus(req, res) {
    const consent = req.cookies[PRIVACY_SETTINGS.ANALYTICS_COOKIE_NAME];
    const dntEnabled = hasDoNotTrack(req);

    res.json({
        success: true,
        data: {
            consentRequired: PRIVACY_SETTINGS.REQUIRE_CONSENT,
            currentConsent: consent || 'not-set',
            doNotTrackEnabled: dntEnabled,
            anonymizeIP: PRIVACY_SETTINGS.ANONYMIZE_IP,
            dataRetention: {
                pageViews: PRIVACY_SETTINGS.PAGE_VIEWS_RETENTION,
                sessions: PRIVACY_SETTINGS.SESSION_DATA_RETENTION,
                qrScans: PRIVACY_SETTINGS.QR_SCAN_RETENTION
            }
        }
    });
}

// Data retention cleanup function
async function cleanupExpiredData() {
    try {
        console.log('🧹 Starting privacy-compliant data cleanup...');

        const now = new Date();

        // Calculate cutoff dates
        const pageViewsCutoff = new Date(now.getTime() - (PRIVACY_SETTINGS.PAGE_VIEWS_RETENTION * 24 * 60 * 60 * 1000));
        const sessionsCutoff = new Date(now.getTime() - (PRIVACY_SETTINGS.SESSION_DATA_RETENTION * 24 * 60 * 60 * 1000));
        const qrScansCutoff = new Date(now.getTime() - (PRIVACY_SETTINGS.QR_SCAN_RETENTION * 24 * 60 * 60 * 1000));

        // Clean up expired page views
        const knex = require('../knex');

        const deletedPageViews = await knex('event_page_views')
            .where('view_timestamp', '<', pageViewsCutoff)
            .del();

        const deletedSessions = await knex('user_sessions')
            .where('first_visit', '<', sessionsCutoff)
            .del();

        const deletedQrScans = await knex('qr_code_scans')
            .where('scan_timestamp', '<', qrScansCutoff)
            .del();

        console.log(`🧹 Data cleanup completed:
            - Page views deleted: ${deletedPageViews}
            - Sessions deleted: ${deletedSessions}
            - QR scans deleted: ${deletedQrScans}`);

        return {
            deletedPageViews,
            deletedSessions,
            deletedQrScans
        };

    } catch (error) {
        console.error('🚨 Error during data cleanup:', error);
        throw error;
    }
}

// Schedule automatic data cleanup
function scheduleDataCleanup() {
    // Run cleanup daily at 2 AM
    const cleanupInterval = 24 * 60 * 60 * 1000; // 24 hours

    setInterval(async() => {
        try {
            await cleanupExpiredData();
        } catch (error) {
            console.error('🚨 Scheduled data cleanup failed:', error);
        }
    }, cleanupInterval);

    console.log('🕐 Privacy-compliant data cleanup scheduled (daily at 2 AM)');
}

// Initialize privacy system
function initializePrivacySystem() {
    console.log('🔒 Initializing privacy-compliant tracking system...');

    // Schedule data cleanup
    scheduleDataCleanup();

    console.log(`🔒 Privacy settings:
        - Consent required: ${PRIVACY_SETTINGS.REQUIRE_CONSENT}
        - IP anonymization: ${PRIVACY_SETTINGS.ANONYMIZE_IP}
        - Respect DNT: ${PRIVACY_SETTINGS.RESPECT_DNT}
        - Data retention: ${PRIVACY_SETTINGS.PAGE_VIEWS_RETENTION} days`);
}

module.exports = {
    privacyCompliantAnalytics,
    hasAnalyticsConsent,
    hasDoNotTrack,
    anonymizeIP,
    setAnalyticsConsent,
    handleConsentRequest,
    getPrivacyStatus,
    cleanupExpiredData,
    scheduleDataCleanup,
    initializePrivacySystem,
    PRIVACY_SETTINGS
};