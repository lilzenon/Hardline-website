/**
 * Settings Handler
 * Handles comprehensive settings management for BOUNCE2BOUNCE
 */

const query = require('../queries');

/**
 * Render main Settings page
 */
async function renderSettings(req, res) {
    try {
        console.log('⚙️ Loading Settings page...');
        
        // Get current SEO settings for the SEO section
        const seoSettings = await query.seoSettings.getSEOSettings();
        
        res.render("settings", {
            title: "Settings - BOUNCE2BOUNCE",
            pageTitle: "Settings",
            layout: "layouts/modern-dashboard",
            currentPage: "settings",
            seoSettings: seoSettings || {},
            user: req.user
        });
        
    } catch (error) {
        console.error('❌ Error loading Settings page:', error);
        res.status(500).render("error", {
            title: "Error - Settings",
            layout: "layouts/modern-dashboard",
            error: "Failed to load settings",
            message: error.message
        });
    }
}

/**
 * Update settings (handles all settings sections)
 */
async function updateSettings(req, res) {
    try {
        console.log('💾 Updating settings...');
        
        const {
            // SEO Settings
            default_title,
            default_description,
            default_keywords,
            default_author,
            default_og_image,
            twitter_handle,
            google_analytics_id,
            google_search_console_id,
            enable_compression,
            enable_caching,
            
            // Future: General Settings
            timezone,
            language,
            
            // Future: Notification Settings
            email_notifications,
            push_notifications
        } = req.body;
        
        let updatedSettings = {};
        
        // Handle SEO settings if provided
        if (default_title || default_description) {
            // Basic validation for SEO settings
            if (!default_title || !default_description) {
                return res.status(400).json({
                    success: false,
                    error: "Title and description are required for SEO settings"
                });
            }
            
            // Prepare SEO settings data
            const seoSettingsData = {
                default_title: default_title?.trim(),
                default_description: default_description?.trim(),
                default_keywords: default_keywords?.trim(),
                default_author: default_author?.trim(),
                default_og_image: default_og_image?.trim(),
                twitter_handle: twitter_handle?.trim(),
                google_analytics_id: google_analytics_id?.trim(),
                google_search_console_id: google_search_console_id?.trim(),
                enable_compression: enable_compression === 'on',
                enable_caching: enable_caching === 'on'
            };
            
            // Update SEO settings in database
            updatedSettings.seo = await query.seoSettings.updateSEOSettings(seoSettingsData, req.user?.id);
            console.log('✅ SEO settings updated successfully');
        }
        
        // TODO: Handle other settings sections as they are implemented
        // if (timezone || language) {
        //     // Handle general settings
        // }
        
        // if (email_notifications !== undefined || push_notifications !== undefined) {
        //     // Handle notification settings
        // }
        
        res.json({
            success: true,
            message: 'Settings updated successfully',
            settings: updatedSettings
        });
        
    } catch (error) {
        console.error('❌ Error updating settings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update settings',
            message: error.message
        });
    }
}

/**
 * Get settings data (API endpoint)
 */
async function getSettings(req, res) {
    try {
        console.log('📊 Fetching settings data...');
        
        const settings = {
            seo: await query.seoSettings.getSEOSettings(),
            // TODO: Add other settings sections as they are implemented
            // general: await query.generalSettings.getGeneralSettings(),
            // notifications: await query.notificationSettings.getNotificationSettings(),
        };
        
        res.json({
            success: true,
            settings: settings
        });
        
    } catch (error) {
        console.error('❌ Error fetching settings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch settings',
            message: error.message
        });
    }
}

/**
 * Reset settings to defaults
 */
async function resetSettings(req, res) {
    try {
        console.log('🔄 Resetting settings to defaults...');
        
        const { section } = req.body;
        
        if (section === 'seo') {
            // Reset SEO settings to defaults
            const defaultSeoSettings = {
                default_title: 'BOUNCE2BOUNCE - Event Management Platform',
                default_description: 'Create, manage, and promote your events with BOUNCE2BOUNCE. The ultimate platform for event organizers.',
                default_keywords: 'events, event management, tickets, promotion, BOUNCE2BOUNCE',
                default_author: 'BOUNCE2BOUNCE',
                default_og_image: '/images/bounce-logo.svg',
                twitter_handle: '@bounce2bounce',
                google_analytics_id: '',
                google_search_console_id: '',
                enable_compression: true,
                enable_caching: true
            };
            
            const resetSettings = await query.seoSettings.updateSEOSettings(defaultSeoSettings, req.user?.id);
            
            res.json({
                success: true,
                message: 'SEO settings reset to defaults',
                settings: { seo: resetSettings }
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Invalid settings section'
            });
        }
        
    } catch (error) {
        console.error('❌ Error resetting settings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to reset settings',
            message: error.message
        });
    }
}

/**
 * Export settings data
 */
async function exportSettings(req, res) {
    try {
        console.log('📤 Exporting settings...');
        
        const settings = {
            seo: await query.seoSettings.getSEOSettings(),
            // TODO: Add other settings sections
            exported_at: new Date().toISOString(),
            version: '1.0'
        };
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename="bounce2bounce-settings.json"');
        res.json(settings);
        
    } catch (error) {
        console.error('❌ Error exporting settings:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to export settings',
            message: error.message
        });
    }
}

module.exports = {
    renderSettings,
    updateSettings,
    getSettings,
    resetSettings,
    exportSettings
};
