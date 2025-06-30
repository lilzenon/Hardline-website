/**
 * SEO Settings Handler
 * Handles SEO configuration management for BOUNCE2BOUNCE
 */

const query = require('../queries');

/**
 * Render SEO settings page
 */
async function renderSEOSettings(req, res) {
    try {
        console.log('🔧 Loading SEO settings page...');
        
        // Get current SEO settings
        const seoSettings = await query.seoSettings.getSEOSettings();
        
        res.render("seo-settings", {
            title: "SEO Settings - BOUNCE2BOUNCE",
            pageTitle: "SEO Settings",
            layout: "layouts/modern-dashboard",
            currentPage: "seo-settings",
            seoSettings: seoSettings || {},
            user: req.user
        });
        
    } catch (error) {
        console.error('❌ Error loading SEO settings:', error);
        res.status(500).render("error", {
            title: "Error - SEO Settings",
            layout: "layouts/modern-dashboard",
            error: "Failed to load SEO settings",
            message: error.message
        });
    }
}

/**
 * Update SEO settings
 */
async function updateSEOSettings(req, res) {
    try {
        console.log('💾 Updating SEO settings...');
        
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
        
        // Prepare settings data with proper optional chaining
        const settingsData = {
            default_title: default_title?.trim(),
            default_description: default_description?.trim(),
            default_keywords: default_keywords?.trim(),
            default_author: default_author?.trim(),
            default_og_image: default_og_image?.trim(),
            twitter_handle: twitter_handle?.trim(),
            google_analytics_id: google_analytics_id?.trim(),
            google_search_console_id: google_search_console_id?.trim()
        };
        
        // Update settings in database
        const updatedSettings = await query.seoSettings.updateSEOSettings(settingsData, req.user?.id);
        
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
}

/**
 * Placeholder functions for file operations
 */
async function updateFileContent(req, res) {
    res.status(501).json({
        success: false,
        error: 'File editing feature not yet implemented'
    });
}

async function restoreFileFromBackup(req, res) {
    res.status(501).json({
        success: false,
        error: 'File backup feature not yet implemented'
    });
}

module.exports = {
    renderSEOSettings,
    updateSEOSettings,
    updateFileContent,
    restoreFileFromBackup
};
