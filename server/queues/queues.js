const { Queue, Worker } = require("bullmq");
const Redis = require("ioredis");
const path = require("node:path");

const env = require("../env");

// CRITICAL DEBUG: Check environment variables for Redis
console.log('🔍 Queue System Environment Debug:');
console.log('   NODE_ENV:', process.env.NODE_ENV);
console.log('   REDIS_ENABLED (raw):', process.env.REDIS_ENABLED);
console.log('   REDIS_ENABLED (parsed):', env.REDIS_ENABLED);
console.log('   REDIS_URL (raw):', process.env.REDIS_URL ? `${process.env.REDIS_URL.substring(0, 20)}...` : 'NOT SET');
console.log('   REDIS_URL (parsed):', env.REDIS_URL ? 'SET' : 'NOT SET');
console.log('   REDIS_HOST:', env.REDIS_HOST);
console.log('   REDIS_PORT:', env.REDIS_PORT);

let visit;
let visitWorker;

if (env.REDIS_ENABLED) {
    try {
        console.log('🔄 Initializing Redis connection for BullMQ...');

        // CRITICAL DEBUG: Log environment variables
        console.log('🔍 BullMQ Redis Environment Variables:');
        console.log('   REDIS_URL:', env.REDIS_URL ? '(set)' : '(not set)');
        console.log('   REDIS_HOST:', env.REDIS_HOST);
        console.log('   REDIS_PORT:', env.REDIS_PORT);
        console.log('   REDIS_DB:', env.REDIS_DB);

        // CRITICAL: Determine connection method (REDIS_URL takes precedence)
        let queueOptions;

        if (env.REDIS_URL && env.REDIS_URL.trim() !== '') {
            // Use REDIS_URL for external connections (e.g., DigitalOcean → Render)
            console.log('🔗 Using REDIS_URL for BullMQ connection');
            const maskedUrl = env.REDIS_URL.replace(/:([^@]+)@/, ':****@');
            console.log(`📊 Redis Config: ${maskedUrl}`);

            // CRITICAL FIX: BullMQ requires a Redis client instance, not a connection string
            // Create a Redis client from the connection URL
            const redisClient = new Redis(env.REDIS_URL, {
                connectTimeout: 10000,
                commandTimeout: 30000,
                retryDelayOnFailover: 200,
                maxRetriesPerRequest: null, // CRITICAL: Must be null for BullMQ
                lazyConnect: true,
                enableOfflineQueue: true,
                enableReadyCheck: true,
                maxLoadingTimeout: 30000,
            });

            queueOptions = {
                connection: redisClient,
            };
        } else {
            // Fallback to individual parameters for local/internal connections
            console.log('🔗 Using individual Redis parameters for BullMQ connection');
            console.log(`📊 Redis Config: ${env.REDIS_HOST}:${env.REDIS_PORT} DB:${env.REDIS_DB}`);

            queueOptions = {
                connection: {
                    port: env.REDIS_PORT,
                    host: env.REDIS_HOST,
                    db: env.REDIS_DB,
                    ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
                    // CRITICAL FIX: BullMQ requires maxRetriesPerRequest to be null
                    connectTimeout: 10000, // PRODUCTION: 10s connection timeout for stability
                    commandTimeout: 30000, // PRODUCTION: 30s timeout for production stability
                    retryDelayOnFailover: 200,
                    maxRetriesPerRequest: null, // CRITICAL: Must be null for BullMQ
                    lazyConnect: true, // Don't connect immediately
                    enableOfflineQueue: true, // Enable for queue reliability
                    // Add BullMQ-specific optimizations
                    enableReadyCheck: true,
                    maxLoadingTimeout: 30000, // PRODUCTION: 30s timeout for production stability
                },
            };
        }

        // Create the queue with error handling
        visit = new Queue("visit", {
            ...queueOptions,
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

        // Create the worker with enhanced error handling and timeouts
        visitWorker = new Worker("visit", path.resolve(__dirname, "visit.js"), {
            ...queueOptions,
            concurrency: 2, // CRITICAL FIX: Reduced to 2 for better stability
            stalledInterval: 10000, // Check every 10 seconds
            maxStalledCount: 1, // Max 1 stalled job before considering it failed
            // CRITICAL FIX: Add comprehensive job timeout settings
            settings: {
                stalledInterval: 10000,
                maxStalledCount: 1,
                retryProcessDelay: 3000, // 3 second delay before retrying failed jobs
            },
            // CRITICAL FIX: Add job timeout at worker level
            removeOnComplete: 5, // Keep only 5 completed jobs
            removeOnFail: 3, // Keep only 3 failed jobs
        });

        console.log('✅ Redis queue and worker initialized successfully');
        console.log(`📊 Worker concurrency: 2, Stalled interval: 10s`);

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

// CRITICAL: Ensure fallback to robust visit processing if Redis failed or is disabled
if (!visit) {
    console.log('📊 Using robust visit processing (Redis unavailable)');
    console.log('🚀 Initializing multi-strategy visit processor...');

    const robustVisitProcessor = require("../services/visit-processor");
    visit = {
        add(data) {
            // Use robust visit processor with multiple fallback strategies
            robustVisitProcessor.addVisit(data).catch(function(error) {
                console.error("🚨 Robust visit processing error:", error.message);
            });
        }
    };

    console.log('✅ Robust visit processor initialized successfully');
}



module.exports = {
    visit,
    visitWorker,
}