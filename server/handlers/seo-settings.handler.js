const query = require("../queries");
const fs = require("fs").promises;
const path = require("path");
const env = require("../env");

/**
 * SEO Settings Handler for BOUNCE2BOUNCE Admin Dashboard
 */

/**
 * Render SEO settings page
 */
async function renderSEOSettings(req, res) {
    try {
        console.log('🔧 Loading SEO settings page...');

        // Get current SEO settings
        const seoSettings = await query.seoSettings.getSEOSettings();

        // SEO settings loaded successfully

        res.render("seo-settings", {
            title: "SEO Settings - BOUNCE2BOUNCE",
            layout: "layouts/dashboard",
            currentPage: "seo-settings",
            seoSettings: seoSettings || {},
            user: req.user
        });

    } catch (error) {
        console.error('❌ Error loading SEO settings:', error);
        res.status(500).render("error", {
            title: "Error - SEO Settings",
            layout: "layouts/dashboard",
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
            // Meta tag defaults
            default_title,
            default_description,
            default_keywords,
            default_author,
            default_og_image,
            twitter_handle,

            // Sitemap settings
            sitemap_enabled,
            sitemap_include_events,
            sitemap_include_homepage,
            sitemap_include_events_listing,
            sitemap_include_dashboard,
            sitemap_max_urls,
            sitemap_changefreq,
            sitemap_priority,

            // Robots.txt settings
            robots_enabled,
            robots_custom_rules,
            robots_allow_all,
            robots_disallowed_paths,
            robots_allowed_paths,
            robots_crawl_delay,

            // Structured data settings
            structured_data_enabled,
            structured_data_events,
            structured_data_organization,
            structured_data_breadcrumbs,
            structured_data_faq,

            // Performance settings
            service_worker_enabled,
            lazy_loading_enabled,
            critical_css_enabled,
            resource_preloading_enabled,
            pwa_enabled,
            cache_duration_hours,

            // AI/LLM settings
            llms_txt_enabled,
            ai_optimization_enabled,
            faq_generation_enabled,

            // Analytics
            google_analytics_id,
            google_search_console_id
        } = req.body;

        // Validate required fields
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

            sitemap_enabled: sitemap_enabled === 'true' || sitemap_enabled === true,
            sitemap_include_events: sitemap_include_events === 'true' || sitemap_include_events === true,
            sitemap_include_homepage: sitemap_include_homepage === 'true' || sitemap_include_homepage === true,
            sitemap_include_events_listing: sitemap_include_events_listing === 'true' || sitemap_include_events_listing === true,
            sitemap_include_dashboard: sitemap_include_dashboard === 'true' || sitemap_include_dashboard === true,
            sitemap_max_urls: parseInt(sitemap_max_urls) || 1000,
            sitemap_changefreq: sitemap_changefreq || 'weekly',
            sitemap_priority: parseFloat(sitemap_priority) || 0.8,

            robots_enabled: robots_enabled === 'true' || robots_enabled === true,
            robots_custom_rules: robots_custom_rules ? .trim(),
            robots_allow_all: robots_allow_all === 'true' || robots_allow_all === true,
            robots_disallowed_paths: robots_disallowed_paths ? .trim(),
            robots_allowed_paths: robots_allowed_paths ? .trim(),
            robots_crawl_delay: parseInt(robots_crawl_delay) || 1,

            structured_data_enabled: structured_data_enabled === 'true' || structured_data_enabled === true,
            structured_data_events: structured_data_events === 'true' || structured_data_events === true,
            structured_data_organization: structured_data_organization === 'true' || structured_data_organization === true,
            structured_data_breadcrumbs: structured_data_breadcrumbs === 'true' || structured_data_breadcrumbs === true,
            structured_data_faq: structured_data_faq === 'true' || structured_data_faq === true,

            service_worker_enabled: service_worker_enabled === 'true' || service_worker_enabled === true,
            lazy_loading_enabled: lazy_loading_enabled === 'true' || lazy_loading_enabled === true,
            critical_css_enabled: critical_css_enabled === 'true' || critical_css_enabled === true,
            resource_preloading_enabled: resource_preloading_enabled === 'true' || resource_preloading_enabled === true,
            pwa_enabled: pwa_enabled === 'true' || pwa_enabled === true,
            cache_duration_hours: parseInt(cache_duration_hours) || 24,

            llms_txt_enabled: llms_txt_enabled === 'true' || llms_txt_enabled === true,
            ai_optimization_enabled: ai_optimization_enabled === 'true' || ai_optimization_enabled === true,
            faq_generation_enabled: faq_generation_enabled === 'true' || faq_generation_enabled === true,

            google_analytics_id: google_analytics_id ? .trim(),
            google_search_console_id: google_search_console_id ? .trim()
        };

        // Update settings in database
        const updatedSettings = await query.seoSettings.updateSEOSettings(settingsData, req.user ? .id);

        console.log('✅ SEO settings updated successfully');

        res.json({
            success: true,
            message: "SEO settings updated successfully",
            settings: updatedSettings
        });

    } catch (error) {
        console.error('❌ Error updating SEO settings:', error);
        res.status(500).json({
            success: false,
            error: "Failed to update SEO settings",
            message: error.message
        });
    }
}

/**
 * Update file content (llms.txt or robots.txt)
 */
async function updateFileContent(req, res) {
    try {
        const { fileName } = req.params;
        const { content, description } = req.body;

        console.log(`📝 Updating file: ${fileName}`);

        // Validate file name
        if (!['llms.txt', 'robots.txt'].includes(fileName)) {
            return res.status(400).json({
                success: false,
                error: "Invalid file name"
            });
        }

        // Validate content
        if (!content || typeof content !== 'string') {
            return res.status(400).json({
                success: false,
                error: "File content is required"
            });
        }

        // Create backup before updating
        const currentContent = await getFileContent(fileName);
        if (currentContent) {
            await query.seoSettings.createFileBackup(
                fileName,
                currentContent,
                req.user ? .id,
                'pre_update',
                'Backup before manual update'
            );
        }

        // Write new content to file
        await writeFileContent(fileName, content);

        // Create backup of new content
        await query.seoSettings.createFileBackup(
            fileName,
            content,
            req.user ? .id,
            'manual',
            description || 'Manual update'
        );

        // Clean up old backups (keep last 10)
        await query.seoSettings.cleanupOldBackups(fileName, 10);

        console.log(`✅ File ${fileName} updated successfully`);

        res.json({
            success: true,
            message: `${fileName} updated successfully`,
            content: content
        });

    } catch (error) {
        console.error(`❌ Error updating file ${req.params.fileName}:`, error);
        res.status(500).json({
            success: false,
            error: `Failed to update ${req.params.fileName}`,
            message: error.message
        });
    }
}

/**
 * Restore file from backup
 */
async function restoreFileFromBackup(req, res) {
    try {
        const { backupId } = req.params;

        console.log(`🔄 Restoring file from backup: ${backupId}`);

        const backup = await query.seoSettings.restoreFileFromBackup(backupId, req.user ? .id);

        // Write restored content to file
        await writeFileContent(backup.file_name, backup.file_content);

        console.log(`✅ File ${backup.file_name} restored from backup`);

        res.json({
            success: true,
            message: `${backup.file_name} restored from backup successfully`,
            backup: backup
        });

    } catch (error) {
        console.error('❌ Error restoring file from backup:', error);
        res.status(500).json({
            success: false,
            error: "Failed to restore file from backup",
            message: error.message
        });
    }
}

/**
 * Get file content helper
 */
async function getFileContent(fileName) {
    try {
        const filePath = path.join(__dirname, '../../static', fileName);
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        console.error(`Error reading ${fileName}:`, error);
        return null;
    }
}

/**
 * Write file content helper
 */
async function writeFileContent(fileName, content) {
    try {
        const filePath = path.join(__dirname, '../../static', fileName);
        await fs.writeFile(filePath, content, 'utf8');
        return true;
    } catch (error) {
        console.error(`Error writing ${fileName}:`, error);
        throw error;
    }
}

module.exports = {
    renderSEOSettings,
    updateSEOSettings,
    updateFileContent,
    restoreFileFromBackup
};