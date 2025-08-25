const knex = require("../knex");
const { nanoid } = require("nanoid");

/**
 * SEO Settings Queries for BOUNCE2BOUNCE
 */

/**
 * Get current SEO settings
 */
async function getSEOSettings() {
    try {
        const settings = await knex("seo_settings")
            .orderBy("created_at", "desc")
            .first();

        if (!settings) {
            console.log("No SEO settings found, creating default settings...");
            return await createDefaultSEOSettings();
        }

        return settings;
    } catch (error) {
        console.error("Error getting SEO settings:", error);
        // If table doesn't exist, return default settings
        if (error.message.includes('does not exist') || error.message.includes('no such table')) {
            console.log("SEO settings table doesn't exist, returning default settings");
            return getDefaultSEOSettings();
        }
        throw error;
    }
}

/**
 * Get default SEO settings without database interaction
 */
function getDefaultSEOSettings() {
    return {
        default_title: 'BOUNCE2BOUNCE - Premium Event Platform',
        default_description: 'Discover and book premium events worldwide with BOUNCE2BOUNCE',
        default_keywords: 'events, tickets, entertainment, concerts, festivals',
        default_author: 'BOUNCE2BOUNCE',
        default_og_image: '',
        twitter_handle: '@bounce2bounce',
        google_analytics_id: '',
        google_search_console_id: ''
    };
}

/**
 * Create default SEO settings in database
 */
async function createDefaultSEOSettings() {
    try {
        const defaultSettings = {
            ...getDefaultSEOSettings(),
            created_at: new Date(),
            updated_at: new Date(),
            version: 1
        };

        const [newSettings] = await knex("seo_settings")
            .insert(defaultSettings)
            .returning("*");

        console.log("✅ Default SEO settings created successfully");
        return newSettings;
    } catch (error) {
        console.error("❌ Error creating default SEO settings:", error);
        // Return default settings if database operation fails
        return getDefaultSEOSettings();
    }
}

/**
 * Update SEO settings
 */
async function updateSEOSettings(settingsData, userId = null) {
    try {
        // Create backup of current settings
        const currentSettings = await getSEOSettings();
        if (currentSettings) {
            await createSettingsBackup(currentSettings, userId, "pre_update");
        }

        // Update settings
        const updatedData = {
            ...settingsData,
            updated_by_id: userId,
            version: (currentSettings ? .version || 0) + 1,
            updated_at: new Date()
        };

        const [updatedSettings] = await knex("seo_settings")
            .where("id", currentSettings.id)
            .update(updatedData)
            .returning("*");

        console.log(`✅ SEO settings updated (version ${updatedSettings.version})`);
        return updatedSettings;
    } catch (error) {
        console.error("Error updating SEO settings:", error);
        throw error;
    }
}

/**
 * Create settings backup
 */
async function createSettingsBackup(settings, userId = null, backupType = "manual") {
    try {
        const backupData = {
            backup_data: JSON.stringify(settings),
            updated_by_id: userId,
            last_backup_at: new Date(),
            version: settings.version
        };

        await knex("seo_settings")
            .where("id", settings.id)
            .update(backupData);

        console.log(`📦 SEO settings backup created (${backupType})`);
        return true;
    } catch (error) {
        console.error("Error creating settings backup:", error);
        throw error;
    }
}

/**
 * Restore settings from backup
 */
async function restoreSettingsFromBackup(settingsId, userId = null) {
    try {
        const settings = await knex("seo_settings")
            .where("id", settingsId)
            .first();

        if (!settings || !settings.backup_data) {
            throw new Error("No backup data found");
        }

        const backupData = JSON.parse(settings.backup_data);

        // Create current backup before restore
        await createSettingsBackup(settings, userId, "pre_restore");

        // Restore from backup
        const restoredData = {
            ...backupData,
            updated_by_id: userId,
            version: settings.version + 1,
            updated_at: new Date()
        };

        delete restoredData.id; // Don't overwrite ID
        delete restoredData.created_at; // Don't overwrite creation date

        const [restored] = await knex("seo_settings")
            .where("id", settingsId)
            .update(restoredData)
            .returning("*");

        console.log(`🔄 SEO settings restored from backup`);
        return restored;
    } catch (error) {
        console.error("Error restoring settings from backup:", error);
        throw error;
    }
}

/**
 * Get file backup by name
 */
async function getFileBackup(fileName) {
    try {
        return await knex("seo_file_backups")
            .where("file_name", fileName)
            .where("is_active", true)
            .first();
    } catch (error) {
        console.error(`Error getting file backup for ${fileName}:`, error);
        throw error;
    }
}

/**
 * Get all file backups for a file
 */
async function getFileBackupHistory(fileName, limit = 10) {
    try {
        return await knex("seo_file_backups")
            .where("file_name", fileName)
            .orderBy("created_at", "desc")
            .limit(limit);
    } catch (error) {
        console.error(`Error getting file backup history for ${fileName}:`, error);
        throw error;
    }
}

/**
 * Create file backup
 */
async function createFileBackup(fileName, content, userId = null, backupType = "manual", description = null) {
    try {
        // Deactivate previous active backup
        await knex("seo_file_backups")
            .where("file_name", fileName)
            .where("is_active", true)
            .update({ is_active: false });

        // Create new backup
        const backupData = {
            uuid: nanoid(),
            file_name: fileName,
            file_content: content,
            backup_type: backupType,
            change_description: description,
            is_active: true,
            file_size: content.length,
            content_hash: require("crypto").createHash("sha256").update(content).digest("hex"),
            created_by_id: userId
        };

        const [backup] = await knex("seo_file_backups")
            .insert(backupData)
            .returning("*");

        console.log(`📦 File backup created for ${fileName}`);
        return backup;
    } catch (error) {
        console.error(`Error creating file backup for ${fileName}:`, error);
        throw error;
    }
}

/**
 * Restore file from backup
 */
async function restoreFileFromBackup(backupId, userId = null) {
    try {
        const backup = await knex("seo_file_backups")
            .where("id", backupId)
            .first();

        if (!backup) {
            throw new Error("Backup not found");
        }

        // Create backup of current active version
        const currentActive = await knex("seo_file_backups")
            .where("file_name", backup.file_name)
            .where("is_active", true)
            .first();

        if (currentActive) {
            await createFileBackup(
                backup.file_name,
                currentActive.file_content,
                userId,
                "pre_restore",
                "Backup before restore"
            );
        }

        // Deactivate all versions
        await knex("seo_file_backups")
            .where("file_name", backup.file_name)
            .update({ is_active: false });

        // Activate restored version
        await knex("seo_file_backups")
            .where("id", backupId)
            .update({ is_active: true });

        console.log(`🔄 File restored from backup: ${backup.file_name}`);
        return backup;
    } catch (error) {
        console.error("Error restoring file from backup:", error);
        throw error;
    }
}

/**
 * Delete old backups (keep last N versions)
 */
async function cleanupOldBackups(fileName, keepCount = 10) {
    try {
        const backups = await knex("seo_file_backups")
            .where("file_name", fileName)
            .orderBy("created_at", "desc");

        if (backups.length > keepCount) {
            const toDelete = backups.slice(keepCount);
            const idsToDelete = toDelete.map(b => b.id);

            await knex("seo_file_backups")
                .whereIn("id", idsToDelete)
                .del();

            console.log(`🧹 Cleaned up ${toDelete.length} old backups for ${fileName}`);
        }
    } catch (error) {
        console.error(`Error cleaning up old backups for ${fileName}:`, error);
        throw error;
    }
}

module.exports = {
    getSEOSettings,
    updateSEOSettings,
    createSettingsBackup,
    restoreSettingsFromBackup,
    getFileBackup,
    getFileBackupHistory,
    createFileBackup,
    restoreFileFromBackup,
    cleanupOldBackups
};