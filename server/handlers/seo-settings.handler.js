/**
 * SEO Settings Handler
 * Handles SEO configuration management for BOUNCE2BOUNCE
 */

const query = require('../queries');
const fs = require('fs').promises;
const path = require('path');

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
            // Meta tags
            default_title,
            default_description,
            default_keywords,
            default_author,
            default_og_image,
            twitter_handle,

            // Analytics
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
            default_title: default_title ? .trim(),
            default_description: default_description ? .trim(),
            default_keywords: default_keywords ? .trim(),
            default_author: default_author ? .trim(),
            default_og_image: default_og_image ? .trim(),
            twitter_handle: twitter_handle ? .trim(),
            google_analytics_id: google_analytics_id ? .trim(),
            google_search_console_id: google_search_console_id ? .trim()
        };

        // Update settings in database
        const updatedSettings = await query.seoSettings.updateSEOSettings(settingsData, req.user ? .id);

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
                error: 'Invalid file name'
            });
        }

        // Validate content
        if (!content || content.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'File content cannot be empty'
            });
        }

        // Get current content for backup
        const currentContent = await getFileContent(fileName);

        // Create backup before updating
        if (currentContent) {
            await query.seoSettings.createFileBackup(
                fileName,
                currentContent,
                req.user ? .id,
                'pre_update',
                'Backup before manual update'
            );
        }

        // Create new backup with updated content
        await query.seoSettings.createFileBackup(
            fileName,
            content,
            req.user ? .id,
            'manual',
            description || 'Manual update'
        );

        // Write file to disk
        await writeFileContent(fileName, content);

        console.log(`✅ File ${fileName} updated successfully`);

        res.json({
            success: true,
            message: `${fileName} updated successfully`
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
        await writeFileContent(backup.file_name, backup.content);

        console.log(`✅ File ${backup.file_name} restored from backup`);

        res.json({
            success: true,
            message: `${backup.file_name} restored successfully`,
            backup: backup
        });

    } catch (error) {
        console.error(`❌ Error restoring backup ${req.params.backupId}:`, error);
        res.status(500).json({
            success: false,
            error: 'Failed to restore backup',
            message: error.message
        });
    }
}

/**
 * Helper function to get file content
 */
async function getFileContent(fileName) {
    try {
        const filePath = path.join(process.cwd(), 'static', fileName);
        const content = await fs.readFile(filePath, 'utf8');
        return content;
    } catch (error) {
        console.log(`📄 File ${fileName} not found, will create new`);
        return '';
    }
}

/**
 * Helper function to write file content
 */
async function writeFileContent(fileName, content) {
    try {
        const filePath = path.join(process.cwd(), 'static', fileName);
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`📝 File ${fileName} written successfully`);
    } catch (error) {
        console.error(`❌ Error writing file ${fileName}:`, error);
        throw error;
    }
}

module.exports = {
    renderSEOSettings,
    updateSEOSettings,
    updateFileContent,
    restoreFileFromBackup
};