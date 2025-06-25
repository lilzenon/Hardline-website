const query = require("./queries");
const utils = require("./utils");
const env = require("./env");

// Optimized link expiration cleanup with better error handling and batching
let isCleanupRunning = false;
const CLEANUP_INTERVAL = 60000; // Increased to 60 seconds to reduce DB pressure
const CLEANUP_BATCH_SIZE = 100; // Process in smaller batches

async function cleanupExpiredLinks() {
    if (isCleanupRunning) {
        console.log('⏭️ Skipping cleanup - already running');
        return;
    }

    isCleanupRunning = true;
    const startTime = Date.now();

    try {
        console.log('🧹 Starting expired links cleanup...');

        // Get count of expired links first
        const knex = require("./knex");
        const expiredCount = await knex("links")
            .where("expire_in", "<", utils.dateToUTC(new Date()))
            .count("id as count")
            .first();

        const totalExpired = parseInt(expiredCount.count) || 0;

        if (totalExpired === 0) {
            console.log('✅ No expired links to clean up');
            return;
        }

        console.log(`🧹 Found ${totalExpired} expired links to clean up`);

        // Process in batches to avoid overwhelming the database
        let processed = 0;
        while (processed < totalExpired) {
            const batch = await knex("links")
                .where("expire_in", "<", utils.dateToUTC(new Date()))
                .limit(CLEANUP_BATCH_SIZE)
                .select("id");

            if (batch.length === 0) break;

            const batchIds = batch.map(link => link.id);
            await query.link.batchRemove({ id: ["in", batchIds] });

            processed += batch.length;
            console.log(`🧹 Cleaned up ${processed}/${totalExpired} expired links`);

            // Small delay between batches to reduce DB pressure
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        const duration = Date.now() - startTime;
        console.log(`✅ Cleanup completed in ${duration}ms - removed ${processed} expired links`);

    } catch (error) {
        console.error('🚨 Error during link cleanup:', error.message);
    } finally {
        isCleanupRunning = false;
    }
}

// Run cleanup with better interval and error handling
setInterval(cleanupExpiredLinks, CLEANUP_INTERVAL);

// Run initial cleanup after 30 seconds
setTimeout(cleanupExpiredLinks, 30000);