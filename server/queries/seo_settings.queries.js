const knex = require("../knex");
const { safeWriteFile, safeReadFile, cleanupBackups } = require("../utils/file-safe-operations");
const path = require('path');

// Cache for SEO settings to reduce database calls and prevent timeouts
let seoSettingsCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes (increased to reduce DB load)

/**
 * Get current SEO settings with caching and corruption recovery
 */
async function getSEOSettings() {
    try {
        // Check cache first to prevent slow database queries
        const now = Date.now();
        if (seoSettingsCache && (now - cacheTimestamp) < CACHE_DURATION) {
            console.log('📦 Serving SEO settings from cache (preventing slow DB query)');
            return seoSettingsCache;
        }

        console.log('🔍 Fetching SEO settings from database...');
        const startTime = Date.now();

        const settings = await knex("seo_settings")
            .orderBy("created_at", "desc")
            .first();

        const queryDuration = Date.now() - startTime;
        console.log(`⚡ SEO settings query completed in ${queryDuration}ms`);

        // Warn if query is slow (over 1 second)
        if (queryDuration > 1000) {
            console.warn(`⚠️ SLOW QUERY WARNING: SEO settings took ${queryDuration}ms - consider database optimization`);
        }

        if (!settings) {
            console.log("No SEO settings found, creating default settings...");
            const defaultSettings = await createDefaultSEOSettings();

            // Update cache
            seoSettingsCache = defaultSettings;
            cacheTimestamp = now;

            return defaultSettings;
        }

        // Update cache
        seoSettingsCache = settings;
        cacheTimestamp = now;

        return settings;
    } catch (error) {
        console.error("Error getting SEO settings:", error);

        // If we have cached data, return it
        if (seoSettingsCache) {
            console.log("⚠️ Database error, returning cached SEO settings");
            return seoSettingsCache;
        }

        // If table doesn't exist, return default settings
        if (error.message.includes('does not exist') || error.message.includes('no such table')) {
            console.log("SEO settings table doesn't exist, returning default settings");
            return getDefaultSEOSettings();
        }

        // Last resort: return default settings
        console.log("⚠️ Returning default SEO settings due to error");
        return getDefaultSEOSettings();
    }
}

/**
 * Get default SEO settings without database interaction
 */
function getDefaultSEOSettings() {
    return {
        default_title: 'BOUNCE2BOUNCE - NJ\'S PREMIERE EDM COLLECTIVE',
        default_description: 'Discover and book premium events worldwide with BOUNCE2BOUNCE',
        default_keywords: 'events, tickets, entertainment, concerts, festivals',
        default_author: 'BOUNCE2BOUNCE',
        default_og_image: '',
        twitter_handle: '@bounce2bounce',
        google_analytics_id: '',
        google_search_console_id: '',
        maintenance_mode: false,
        maintenance_message: 'We are currently performing scheduled maintenance. Please check back soon.',
        maintenance_title: 'Site Under Maintenance',
        maintenance_estimated_time: '2 hours'
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
 * Clear SEO settings cache
 */
function clearSEOSettingsCache() {
    seoSettingsCache = null;
    cacheTimestamp = 0;
    console.log("🗑️ SEO settings cache cleared");
}

/**
 * Update SEO settings with cache invalidation and corruption protection
 */
async function updateSEOSettings(settingsData, userId = null) {
    const startTime = Date.now();
    console.log('🔄 Starting SEO settings update...');

    try {
        // Use a transaction for better performance and consistency
        const result = await knex.transaction(async(trx) => {
            // Get current settings within transaction with timeout
            const currentSettings = await trx("seo_settings")
                .orderBy("created_at", "desc")
                .first()
                .timeout(5000); // 5 second timeout

            if (!currentSettings) {
                // Create new record if none exists
                const newData = {
                    ...getDefaultSEOSettings(),
                    ...settingsData,
                    created_at: new Date(),
                    updated_at: new Date(),
                    version: 1,
                    updated_by_id: userId
                };

                const [newSettings] = await trx("seo_settings")
                    .insert(newData)
                    .returning("*")
                    .timeout(5000);

                console.log(`✅ SEO settings created in ${Date.now() - startTime}ms`);
                return newSettings;
            }

            // Update existing record with timeout
            const updatedData = {
                ...settingsData,
                updated_by_id: userId,
                version: (currentSettings.version || 0) + 1,
                updated_at: new Date()
            };

            const [updatedSettings] = await trx("seo_settings")
                .where("id", currentSettings.id)
                .update(updatedData)
                .returning("*")
                .timeout(5000);

            console.log(`✅ SEO settings updated in ${Date.now() - startTime}ms (version ${updatedSettings.version})`);
            return updatedSettings;
        });

        // Clear cache after successful update
        clearSEOSettingsCache();

        return result;
    } catch (error) {
        console.error(`❌ Error updating SEO settings after ${Date.now() - startTime}ms:`, error);

        // Clear cache on error to prevent stale data
        clearSEOSettingsCache();

        // Provide more specific error information
        if (error.message.includes('timeout')) {
            throw new Error('Database operation timed out. Please try again.');
        }

        throw error;
    }
}

module.exports = {
    getSEOSettings,
    getDefaultSEOSettings,
    createDefaultSEOSettings,
    updateSEOSettings
};