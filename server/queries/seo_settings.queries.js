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
    const startTime = Date.now();
    try {
        // Check cache first to prevent slow database queries
        const now = Date.now();
        if (seoSettingsCache && (now - cacheTimestamp) < CACHE_DURATION) {
            console.log('📦 Serving SEO settings from cache (preventing slow DB query)');
            return seoSettingsCache;
        }

        console.log('🔍 Fetching SEO settings from database...');

        // Add timeout to database query to prevent hanging with retry logic
        let settings;
        let retryCount = 0;
        const maxRetries = 3;

        while (retryCount < maxRetries) {
            try {
                settings = await knex("seo_settings")
                    .orderBy("created_at", "desc")
                    .first()
                    .timeout(15000); // 15 second timeout for database query
                break; // Success, exit retry loop
            } catch (error) {
                retryCount++;
                console.warn(`🔄 SEO settings query attempt ${retryCount} failed:`, error.message);

                if (retryCount >= maxRetries) {
                    throw error; // Re-throw after max retries
                }

                // Wait before retry (exponential backoff)
                const delay = Math.min(1000 * Math.pow(2, retryCount - 1), 5000);
                console.log(`⏳ Retrying SEO settings query in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

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
        const queryTime = Date.now() - startTime;
        console.error(`❌ Error getting SEO settings after ${queryTime}ms:`, error.message);

        // Clear cache on error to prevent serving stale data
        if (error.message.includes('Connection terminated unexpectedly') ||
            error.message.includes('timeout')) {
            console.warn("🔄 Clearing SEO settings cache due to connection error");
            seoSettingsCache = null;
            cacheTimestamp = 0;
        }

        // If we have cached data, return it
        if (seoSettingsCache) {
            console.log("⚠️ Database error, returning cached SEO settings");
            return seoSettingsCache;
        }

        // If table doesn't exist, return default settings
        if (error.message.includes('does not exist') || error.message.includes('no such table')) {
            console.log("📋 SEO settings table doesn't exist, returning default settings");
            return getDefaultSEOSettings();
        }

        // Handle connection termination errors specifically
        if (error.message.includes('Connection terminated unexpectedly') ||
            error.message.includes('connection') ||
            error.message.includes('timeout')) {
            console.error("🚨 Database connection issue detected for SEO settings");
        }

        // Last resort: return default settings
        console.log("📋 Returning default SEO settings due to error");
        return getDefaultSEOSettings();
    }
}

/**
 * Get default SEO settings without database interaction
 */
function getDefaultSEOSettings() {
    return {
        default_title: 'HARDLINE - NJ\'S PREMIERE EDM COLLECTIVE',
        default_description: 'Discover and book premium events worldwide with HARDLINE',
        default_keywords: 'events, tickets, entertainment, concerts, festivals',
        default_author: 'HARDLINE',
        default_og_image: '',
        twitter_handle: '@hardline events',
        google_analytics_id: '',
        google_search_console_id: '',
        google_ads_id: '',
        meta_pixel_id: '',
        tiktok_pixel_id: '',
        snapchat_pixel_id: '',
        pinterest_tag_id: '',
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
 * Update SEO settings with enhanced timeout handling and performance optimization
 */
async function updateSEOSettings(settingsData, userId = null) {
    const startTime = Date.now();
    console.log('🔄 Starting SEO settings update with timeout protection...');

    try {
        // TIMEOUT FIX: Use optimized transaction with longer timeout
        const result = await knex.transaction(async (trx) => {
            // Set transaction-level timeout to prevent hanging
            await trx.raw('SET LOCAL statement_timeout = 12000'); // 12 seconds

            // Get current settings within transaction with extended timeout
            const currentSettings = await trx("seo_settings")
                .orderBy("created_at", "desc")
                .first()
                .timeout(10000); // Increased to 10 second timeout

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

                // TIMEOUT FIX: Insert with extended timeout and retry logic
                const [newSettings] = await trx("seo_settings")
                    .insert(newData)
                    .returning("*")
                    .timeout(10000); // Increased to 10 seconds

                console.log(`✅ SEO settings created in ${Date.now() - startTime}ms`);
                return newSettings;
            }

            // Update existing record with extended timeout and optimistic locking
            const updatedData = {
                ...settingsData,
                updated_by_id: userId,
                version: (currentSettings.version || 0) + 1,
                updated_at: new Date()
            };

            // TIMEOUT FIX: Use optimistic locking to prevent conflicts
            const [updatedSettings] = await trx("seo_settings")
                .where("id", currentSettings.id)
                .where("version", currentSettings.version || 0) // Optimistic locking
                .update(updatedData)
                .returning("*")
                .timeout(10000); // Increased to 10 seconds

            // Check if update was successful (optimistic locking check)
            if (!updatedSettings) {
                throw new Error('Settings were modified by another user. Please refresh and try again.');
            }

            console.log(`✅ SEO settings updated in ${Date.now() - startTime}ms (version ${updatedSettings.version})`);
            return updatedSettings;
        });

        // Clear cache after successful update
        clearSEOSettingsCache();

        return result;
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`❌ Error updating SEO settings after ${duration}ms:`, error);

        // Clear cache on error to prevent stale data
        clearSEOSettingsCache();

        // TIMEOUT FIX: Enhanced error handling with specific timeout messages
        if (error.message.includes('timeout') || error.code === 'ETIMEDOUT') {
            throw new Error(`Database operation timed out after ${duration}ms. The server may be under heavy load. Please try again in a few moments.`);
        }

        if (error.message.includes('connection') || error.code === 'ECONNRESET') {
            throw new Error('Database connection lost. Please check your internet connection and try again.');
        }

        if (error.message.includes('modified by another user')) {
            throw new Error('Settings were modified by another user. Please refresh the page and try again.');
        }

        if (error.message.includes('lock') || error.code === 'EDEADLK') {
            throw new Error('Database is temporarily locked. Please try again in a few seconds.');
        }

        // Generic error with helpful message
        throw new Error(`Failed to update settings: ${error.message}. Please try again or contact support if the problem persists.`);
    }
}

module.exports = {
    getSEOSettings,
    getDefaultSEOSettings,
    createDefaultSEOSettings,
    updateSEOSettings
};