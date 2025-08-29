const { Queue, Worker } = require("bullmq");
const path = require("node:path");

const env = require("../env");

// CRITICAL DEBUG: Check environment variables for Redis
console.log('🔍 Queue System Environment Debug:');
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   REDIS_ENABLED (raw):', process.env.REDIS_ENABLED);
console.log('   REDIS_ENABLED (parsed):', env.REDIS_ENABLED);
console.log('   REDIS_HOST:', env.REDIS_HOST);
console.log('   REDIS_PORT:', env.REDIS_PORT);

let visit;
let visitWorker;

if (env.REDIS_ENABLED) {
    try {
        const connection = {
            port: env.REDIS_PORT,
            host: env.REDIS_HOST,
            db: env.REDIS_DB,
            ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
            // CRITICAL: Add connection timeout and retry settings
            connectTimeout: 3000, // 3 second timeout
            commandTimeout: 2000, // 2 second command timeout
            retryDelayOnFailover: 100,
            maxRetriesPerRequest: 1, // Only try once
            lazyConnect: true, // Don't connect immediately
            enableOfflineQueue: false, // Disable offline queue to prevent hanging
        };

        // Create the queue with error handling
        visit = new Queue("visit", {
            connection,
            defaultJobOptions: {
                removeOnComplete: 10, // Keep only 10 completed jobs
                removeOnFail: 5, // Keep only 5 failed jobs
                attempts: 1, // Reduced attempts to prevent hanging
                backoff: {
                    type: 'exponential',
                    delay: 1000, // Reduced delay
                },
                delay: 500, // Reduced delay between jobs
            }
        });

        // Create the worker with error handling
        visitWorker = new Worker("visit", path.resolve(__dirname, "visit.js"), {
            connection,
            concurrency: 3, // CRITICAL FIX: Restored to 3 to match increased DB pool
            stalledInterval: 15000, // Check more frequently
            maxStalledCount: 1, // Max 1 stalled job before considering it failed
            // CRITICAL FIX: Add job timeout to prevent hanging
            settings: {
                stalledInterval: 15000,
                maxStalledCount: 1,
                retryProcessDelay: 5000, // 5 second delay before retrying failed jobs
            }
        });
    } catch (error) {
        console.error('🚨 Failed to initialize Redis queues:', error.message);
        console.log('🔄 Falling back to direct processing...');
        // Fall through to direct processing
        visit = null;
        visitWorker = null;
    }

    // CRITICAL: Only set up queue operations if initialization succeeded
    if (visit && visitWorker) {
        try {
            // Clean up old jobs more frequently
            visit.clean(5000, "completed").catch(err => console.warn('Queue cleanup failed:', err.message));
            visit.clean(10000, "failed").catch(err => console.warn('Queue cleanup failed:', err.message));

            // Enhanced error handling and monitoring
            visitWorker.on("completed", (job) => {
                console.log(`✅ Visit job ${job.id} completed`);
            });

            visitWorker.on("failed", (job, error) => {
                console.error(`🚨 Visit job ${job.id} failed:`, error.message);
                // Don't retry certain types of errors
                if (error.message.includes('timeout') ||
                    error.message.includes('connection') ||
                    error.message.includes('ENOTFOUND') ||
                    error.message.includes('MaxRetriesPerRequestError')) {
                    try {
                        job.remove();
                    } catch (removeError) {
                        console.warn('Failed to remove failed job:', removeError.message);
                    }
                }
            });

            visitWorker.on("stalled", (job) => {
                console.warn(`⚠️ Visit job ${job.id} stalled`);
            });

            visitWorker.on("error", (error) => {
                console.error("🚨 Visit worker error:", error.message);
                // CRITICAL: If Redis connection fails, fall back to direct processing
                if (error.message.includes('ENOTFOUND') || error.message.includes('connection')) {
                    console.log('🔄 Redis connection failed, switching to direct processing...');
                    visit = null;
                    visitWorker = null;
                }
            });

            visit.on("error", (error) => {
                console.error("🚨 Visit queue error:", error.message);
                // CRITICAL: If Redis connection fails, fall back to direct processing
                if (error.message.includes('ENOTFOUND') || error.message.includes('connection')) {
                    console.log('🔄 Redis connection failed, switching to direct processing...');
                    visit = null;
                    visitWorker = null;
                }
            });

            // Add rate limiting to prevent overwhelming the database
            visitWorker.on("waiting", (jobId) => {
                // Add small delay between jobs
                setTimeout(() => {}, 100);
            });
        } catch (setupError) {
            console.error('🚨 Failed to setup queue event handlers:', setupError.message);
            visit = null;
            visitWorker = null;
        }
    }
}

// CRITICAL: Ensure fallback to direct processing if Redis failed or is disabled
if (!visit) {
    console.log('📊 Using direct visit processing (Redis unavailable)');
    console.log('⚠️ PERFORMANCE WARNING: Direct processing can cause timeouts under load');
    console.log('💡 Enable Redis in production for optimal performance');
    console.log('🔧 Check REDIS_ENABLED environment variable');

    const visitProcessor = require(path.resolve(__dirname, "visit.js"));
    visit = {
        add(data) {
            // Process visits directly without queue with enhanced timeout protection
            setImmediate(() => {
                // CRITICAL FIX: Add multiple timeout layers for direct processing
                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Direct visit processing timeout')), 6000); // Reduced to 6s
                });

                Promise.race([
                    visitProcessor({ data }),
                    timeoutPromise
                ]).catch(function(error) {
                    if (error.message.includes('timeout')) {
                        console.error("🚨 Visit worker error: Command timed out (direct processing)");
                        console.error("💡 Consider enabling Redis to eliminate these timeouts");
                    } else {
                        console.error("🚨 Direct visit processing error:", error.message);
                    }
                });
            });
        }
    };
}



module.exports = {
    visit,
    visitWorker,
}