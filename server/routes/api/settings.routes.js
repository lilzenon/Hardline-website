const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const query = require("../../queries");

const router = Router();

console.log('🚀 KUTT Settings Routes Loaded!', new Date().toISOString());

/**
 * GET /api/settings/seo
 * Get SEO settings for homepage (public endpoint)
 */
router.get(
    "/seo",
    asyncHandler(async (req, res) => {
        try {
            console.log('📊 Fetching SEO settings from kutt system...');

            // Get SEO settings from database
            const seoSettings = await query.seoSettings.getSEOSettings();

            res.json({
                success: true,
                settings: seoSettings || {
                    default_title: 'BOUNCE2BOUNCE - NJ\'S PREMIERE EDM COLLECTIVE',
                    default_description: 'Discover exclusive live music events, connect with artists, and purchase tickets seamlessly. Join BOUNCE2BOUNCE for unforgettable music experiences.',
                    default_keywords: 'live music events, concert tickets, artist promotion, event discovery, music experiences, exclusive events, BOUNCE2BOUNCE',
                    default_author: 'BOUNCE2BOUNCE',
                    default_og_image: 'https://b2b.click/images/og-image.png',
                    twitter_handle: '@bounce2bounce',
                    google_analytics_id: '',
                    google_search_console_id: '',
                    maintenance_mode: false,
                    maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.',
                    maintenance_title: 'Site Under Maintenance',
                    maintenance_estimated_time: '2 hours'
                }
            });

        } catch (error) {
            console.error('❌ Error fetching SEO settings:', error);
            
            // Return default settings as fallback
            res.json({
                success: true,
                settings: {
                    default_title: 'BOUNCE2BOUNCE - NJ\'S PREMIERE EDM COLLECTIVE',
                    default_description: 'Discover exclusive live music events, connect with artists, and purchase tickets seamlessly. Join BOUNCE2BOUNCE for unforgettable music experiences.',
                    default_keywords: 'live music events, concert tickets, artist promotion, event discovery, music experiences, exclusive events, BOUNCE2BOUNCE',
                    default_author: 'BOUNCE2BOUNCE',
                    default_og_image: 'https://b2b.click/images/og-image.png',
                    twitter_handle: '@bounce2bounce',
                    google_analytics_id: '',
                    google_search_console_id: '',
                    maintenance_mode: false,
                    maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.',
                    maintenance_title: 'Site Under Maintenance',
                    maintenance_estimated_time: '2 hours'
                }
            });
        }
    })
);

/**
 * GET /api/settings/maintenance-status
 * Get maintenance status for homepage
 */
router.get(
    "/maintenance-status",
    asyncHandler(async (req, res) => {
        try {
            console.log('🔧 Fetching maintenance status...');

            // Get SEO settings which include maintenance mode
            const seoSettings = await query.seoSettings.getSEOSettings();

            const response = {
                success: true,
                maintenance_mode: seoSettings.maintenance_mode || false,
                maintenance_message: seoSettings.maintenance_message || 'We are currently performing scheduled maintenance. Please check back soon.',
                maintenance_title: seoSettings.maintenance_title || 'Site Under Maintenance',
                estimated_downtime: seoSettings.maintenance_estimated_time || '2 hours',
                contact_information: 'support@bounce2bounce.com',
                timestamp: new Date().toISOString()
            };

            res.json(response);

        } catch (error) {
            console.error('❌ Error fetching maintenance status:', error);
            
            // Return default maintenance status
            res.json({
                success: true,
                maintenance_mode: false,
                maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.',
                maintenance_title: 'Site Under Maintenance',
                estimated_downtime: '2 hours',
                contact_information: 'support@bounce2bounce.com',
                timestamp: new Date().toISOString()
            });
        }
    })
);

/**
 * GET /api/settings/test
 * Test settings API connectivity
 */
router.get(
    "/test",
    asyncHandler(async (req, res) => {
        res.json({
            success: true,
            message: 'KUTT Settings API is working',
            timestamp: new Date().toISOString(),
            system: 'kutt-homepage'
        });
    })
);

module.exports = router;
