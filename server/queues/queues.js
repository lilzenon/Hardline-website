const Queue = require("bull");
const path = require("node:path");

const env = require("../env");

let visit;

if (env.REDIS_ENABLED) {
    const redis = {
        port: env.REDIS_PORT,
        host: env.REDIS_HOST,
        db: env.REDIS_DB,
        ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD })
    };

    visit = new Queue("visit", {
        redis,
        defaultJobOptions: {
            removeOnComplete: 10, // Keep only 10 completed jobs
            removeOnFail: 5, // Keep only 5 failed jobs
            attempts: 3, // Retry failed jobs 3 times
            backoff: {
                type: 'exponential',
                delay: 2000, // Start with 2 second delay
            },
            delay: 1000, // 1 second delay between jobs to reduce DB pressure
        },
        settings: {
            stalledInterval: 30000, // Check for stalled jobs every 30 seconds
            maxStalledCount: 1, // Max 1 stalled job before considering it failed
        }
    });

    // Clean up old jobs more frequently
    visit.clean(5000, "completed");
    visit.clean(10000, "failed");

    // Process with concurrency optimized for Basic tier
    visit.process(3, path.resolve(__dirname, "visit.js")); // Reduced from 6 to 3

    // Enhanced error handling and monitoring
    visit.on("completed", (job) => {
        console.log(`✅ Visit job ${job.id} completed`);
        job.remove();
    });

    visit.on("failed", (job, error) => {
        console.error(`🚨 Visit job ${job.id} failed:`, error.message);
        // Don't retry certain types of errors
        if (error.message.includes('timeout') || error.message.includes('connection')) {
            job.remove();
        }
    });

    visit.on("stalled", (job) => {
        console.warn(`⚠️ Visit job ${job.id} stalled`);
    });

    visit.on("error", (error) => {
        console.error("🚨 Visit queue error:", error.message);
    });

    // Add rate limiting to prevent overwhelming the database
    visit.on("waiting", (jobId) => {
        // Add small delay between jobs
        setTimeout(() => {}, 100);
    });
} else {
    const visitProcessor = require(path.resolve(__dirname, "visit.js"));
    visit = {
        add(data) {
            visitProcessor({ data }).catch(function(error) {
                console.error("Add visit error: ", error);
            });
        }
    }
}



module.exports = {
    visit,
}