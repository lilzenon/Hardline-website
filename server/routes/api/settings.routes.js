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
    asyncHandler(async(req, res) => {
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
    asyncHandler(async(req, res) => {
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
 * POST /api/settings/seo
 * Update SEO settings (authenticated endpoint)
 */
router.post(
    "/seo",
    asyncHandler(async(req, res) => {
        try {
            console.log('💾 Updating SEO settings via API...');
            console.log('📊 Request body:', req.body);

            const {
                default_title,
                default_description,
                default_keywords,
                default_author,
                default_og_image,
                twitter_handle,
                google_analytics_id,
                google_search_console_id,
                maintenance_mode,
                maintenance_message,
                maintenance_title,
                maintenance_estimated_time
            } = req.body;

            // Basic validation
            if (!default_title || !default_description) {
                return res.status(400).json({
                    success: false,
                    error: "Title and description are required"
                });
            }

            // Prepare settings data
            const settingsData = {
                default_title: default_title ? .trim(),
                default_description: default_description ? .trim(),
                default_keywords: default_keywords ? .trim(),
                default_author: default_author ? .trim(),
                default_og_image: default_og_image ? .trim(),
                twitter_handle: twitter_handle ? .trim(),
                google_analytics_id: google_analytics_id ? .trim(),
                google_search_console_id: google_search_console_id ? .trim(),
                maintenance_mode: maintenance_mode || false,
                maintenance_message: maintenance_message ? .trim(),
                maintenance_title: maintenance_title ? .trim(),
                maintenance_estimated_time: maintenance_estimated_time ? .trim()
            };

            console.log('📝 Processed settings data:', settingsData);

            // Update settings in database
            const updatedSettings = await query.seoSettings.updateSEOSettings(settingsData, null);

            console.log('✅ SEO settings updated successfully');

            res.json({
                success: true,
                message: 'SEO settings updated successfully',
                settings: updatedSettings
            });

        } catch (error) {
            console.error('❌ Error updating SEO settings:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update SEO settings',
                message: error.message
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
    asyncHandler(async(req, res) => {
        res.json({
            success: true,
            message: 'KUTT Settings API is working',
            timestamp: new Date().toISOString(),
            system: 'kutt-homepage'
        });
    })
);

module.exports = router;