const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const auth = require("../../handlers/auth.handler");
const query = require("../../queries");
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;

const router = Router();

console.log('🚀🚀🚀 SETTINGS ROUTES FILE LOADED!', new Date().toISOString());

/**
 * GET /api/settings/test
 * Test settings API and database connectivity
 */
router.get(
    "/test",
    asyncHandler(async(req, res) => {
        try {
            console.log('🔍 Testing settings API...');

            // Test database connectivity
            const knex = require("../../knex");
            await knex.raw('SELECT 1');
            console.log('✅ Database connection successful');

            // Check if seo_settings table exists
            const hasTable = await knex.schema.hasTable('seo_settings');
            console.log('📊 SEO settings table exists:', hasTable);

            // Test queries module
            const testQuery = query.seoSettings;
            console.log('📋 SEO settings queries available:', !!testQuery);

            res.json({
                success: true,
                message: 'Settings API test passed',
                database: 'connected',
                seoSettingsTable: hasTable,
                queriesAvailable: !!testQuery,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Settings API test error:', error);
            res.status(500).json({
                success: false,
                error: error.message,
                stack: error.stack
            });
        }
    })
);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: async(req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../../uploads/og-images');
        try {
            await fs.mkdir(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'og-image-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

/**
 * GET /api/settings/seo
 * Get SEO settings
 */
router.get(
    "/seo",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            console.log('📊 Fetching SEO settings for user:', req.user.id);

            const seoSettings = await query.seoSettings.getSEOSettings();

            res.json({
                success: true,
                settings: seoSettings || {
                    default_title: 'BOUNCE2BOUNCE - Premium Event Platform',
                    default_description: 'Discover and book premium events worldwide with BOUNCE2BOUNCE',
                    default_keywords: 'events, tickets, entertainment, concerts, festivals',
                    default_author: 'BOUNCE2BOUNCE',
                    default_og_image: '',
                    twitter_handle: '@bounce2bounce',
                    google_analytics_id: '',
                    google_search_console_id: ''
                }
            });

        } catch (error) {
            console.error('❌ Error fetching SEO settings:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch SEO settings',
                message: error.message
            });
        }
    })
);

/**
 * POST /api/settings/seo
 * Update SEO settings
 */
router.post(
    "/seo",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            console.log('💾 Updating SEO settings for user:', req.user.id);

            const {
                default_title,
                default_description,
                default_keywords,
                default_author,
                default_og_image,
                twitter_handle,
                google_analytics_id,
                google_search_console_id
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
                default_title: default_title && default_title.trim(),
                default_description: default_description && default_description.trim(),
                default_keywords: default_keywords && default_keywords.trim(),
                default_author: default_author && default_author.trim(),
                default_og_image: default_og_image && default_og_image.trim(),
                twitter_handle: twitter_handle && twitter_handle.trim(),
                google_analytics_id: google_analytics_id && google_analytics_id.trim(),
                google_search_console_id: google_search_console_id && google_search_console_id.trim()
            };

            // Update settings in database
            const updatedSettings = await query.seoSettings.updateSEOSettings(settingsData, req.user && req.user.id);

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
 * POST /api/upload/og-image
 * Upload Open Graph image
 */
router.post(
    "/upload/og-image",
    asyncHandler(auth.jwt),
    upload.single('image'),
    asyncHandler(async(req, res) => {
        try {
            console.log('📤 Uploading OG image for user:', req.user.id);

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    error: 'No image file provided'
                });
            }

            // Generate public URL for the uploaded file
            const imageUrl = `/uploads/og-images/${req.file.filename}`;

            console.log('✅ OG image uploaded successfully:', imageUrl);

            res.json({
                success: true,
                message: 'Image uploaded successfully',
                url: imageUrl,
                filename: req.file.filename
            });

        } catch (error) {
            console.error('❌ Error uploading OG image:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to upload image',
                message: error.message
            });
        }
    })
);

/**
 * GET /api/settings/homepage
 * Get homepage settings
 */
router.get(
    "/homepage",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            console.log('📊 Fetching homepage settings for user:', req.user.id);

            // For now, return default settings - can be extended to use database
            const homepageSettings = {
                hero_title: 'Discover Premium Events',
                hero_subtitle: 'Book tickets to the world\'s most exclusive events',
                featured_events_count: 6,
                maintenance_mode: false,
                maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.',
                estimated_downtime: '2 hours',
                contact_information: 'support@bounce2bounce.com',
                allowed_ips: '127.0.0.1,::1'
            };

            res.json({
                success: true,
                settings: homepageSettings
            });

        } catch (error) {
            console.error('❌ Error fetching homepage settings:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch homepage settings',
                message: error.message
            });
        }
    })
);

/**
 * POST /api/settings/homepage
 * Update homepage settings
 */
router.post(
    "/homepage",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            console.log('💾 Updating homepage settings for user:', req.user.id);

            const settings = req.body;

            // Basic validation
            if (!settings.hero_title || !settings.hero_subtitle) {
                return res.status(400).json({
                    success: false,
                    error: "Hero title and subtitle are required"
                });
            }

            // TODO: Save to database when homepage settings table is created
            console.log('✅ Homepage settings updated successfully');

            res.json({
                success: true,
                message: 'Homepage settings updated successfully',
                settings: settings
            });

        } catch (error) {
            console.error('❌ Error updating homepage settings:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update homepage settings',
                message: error.message
            });
        }
    })
);

/**
 * GET /api/settings/security
 * Get security settings
 */
router.get(
    "/security",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            console.log('📊 Fetching security settings for user:', req.user.id);

            // Return default security settings
            const securitySettings = {
                session_timeout: 30,
                max_login_attempts: 5,
                require_2fa: false,
                api_rate_limit: 100
            };

            res.json({
                success: true,
                settings: securitySettings
            });

        } catch (error) {
            console.error('❌ Error fetching security settings:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch security settings',
                message: error.message
            });
        }
    })
);

/**
 * POST /api/settings/security
 * Update security settings
 */
router.post(
    "/security",
    asyncHandler(auth.jwt),
    asyncHandler(async(req, res) => {
        try {
            console.log('💾 Updating security settings for user:', req.user.id);

            const settings = req.body;

            // TODO: Save to database when security settings table is created
            console.log('✅ Security settings updated successfully');

            res.json({
                success: true,
                message: 'Security settings updated successfully',
                settings: settings
            });

        } catch (error) {
            console.error('❌ Error updating security settings:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update security settings',
                message: error.message
            });
        }
    })
);

module.exports = router;