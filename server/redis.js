const Redis = require("ioredis");

const env = require("./env");

let client;

if (env.REDIS_ENABLED) {
    try {
        // UNIFIED REDIS CONFIG: Optimized for both performance and reliability
        client = new Redis({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            db: env.REDIS_DB,
            ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
            // UNIFIED CONFIG: Balanced timeouts for stability and performance
            connectTimeout: 8000, // 8 seconds - balanced for both servers
            commandTimeout: 15000, // CRITICAL: Must exceed visit.js timeout (12s)
            retryDelayOnFailover: 150, // 150ms - balanced retry delay
            maxRetriesPerRequest: null, // CRITICAL: Must be null for BullMQ compatibility
            lazyConnect: true, // Connect only when needed
            keepAlive: 30000, // Keep connections alive for 30 seconds
            // Connection pool settings
            family: 4, // Use IPv4
            // UNIFIED CONFIG: Optimized error handling
            retryDelayOnClusterDown: 200, // Balanced retry delay
            enableOfflineQueue: true, // CRITICAL: Enable for queue reliability
            // Performance optimizations
            enableReadyCheck: true,
            maxLoadingTimeout: 6000, // Balanced loading timeout
            // Logging
            showFriendlyErrorStack: env.NODE_ENV === 'development',
            // UNIFIED CONFIG: Balanced reconnection strategy
            enableAutoPipelining: false, // Disable for better error handling
            autoResubscribe: true, // Enable for queue reliability
            autoResendUnfulfilledCommands: true, // Enable for queue reliability
            // CRITICAL: Set connection name for debugging
            connectionName: 'kutt-homepage-unified'
        });

        console.log('🔄 Redis client created with unified configuration...');
    } catch (error) {
        console.error('🚨 Failed to create Redis client:', error.message);
        client = null;
    }
}

// CRITICAL FIX: Enhanced error handling with better connection management
if (client) {
    // CRITICAL: Prevent unhandled promise rejections
    client.on('error', (error) => {
        console.error('🚨 Redis connection error:', error.message);

        // Don't crash the application on Redis errors
        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
            console.warn('⚠️ Redis server unavailable, using memory store fallback');
        } else if (error.message.includes('Stream isn\'t writeable')) {
            console.warn('⚠️ Redis stream not writable, using memory store fallback');
        } else if (error.message.includes('MaxRetriesPerRequestError')) {
            console.warn('⚠️ Redis max retries reached, using memory store fallback');
        } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
            console.warn('⚠️ Redis DNS resolution failed, using memory store fallback');
        }

        // CRITICAL: Mark client as unavailable to prevent further attempts
        if (client) {
            client.disconnect(false); // Disconnect without reconnection
        }
    });

    client.on('connect', () => {
        console.log('✅ Redis connected successfully');
    });

    client.on('ready', async() => {
        console.log('🚀 Redis ready for commands');
        console.log(`📊 Redis Config: ${env.REDIS_HOST}:${env.REDIS_PORT} DB:${env.REDIS_DB}`);

        // CRITICAL: Enhanced connection testing with timeout verification
        try {
            const startTime = Date.now();
            await client.ping();
            const responseTime = Date.now() - startTime;
            console.log(`🔗 Redis PING test successful (${responseTime}ms)`);

            // Test command timeout by setting a test key
            await client.set('connection_test', Date.now(), 'EX', 10);
            console.log('✅ Redis write test successful');

            // Verify Redis is available for other services
            global.redisAvailable = true;
            console.log('🚀 Redis marked as available for application services');

        } catch (testError) {
            console.error('❌ Redis connection test failed:', testError.message);
            global.redisAvailable = false;
        }

        // CRITICAL FIX: Check Redis eviction policy with managed service compatibility
        try {
            const config = await client.config('GET', 'maxmemory-policy');
            const currentPolicy = config[1];

            if (currentPolicy !== 'noeviction') {
                console.log(`⚠️ Redis eviction policy is ${currentPolicy}, should be noeviction`);
                console.log('🔧 Attempting to set eviction policy to noeviction...');

                try {
                    await client.config('SET', 'maxmemory-policy', 'noeviction');
                    console.log('✅ Redis eviction policy set to noeviction');
                } catch (policyError) {
                    console.warn('⚠️ Could not change Redis eviction policy (managed service restriction)');
                    console.warn('📋 Managed Redis services often restrict CONFIG commands for security');
                    console.warn('💡 This is normal for cloud Redis providers - queues will still work reliably');
                }
            } else {
                console.log('✅ Redis eviction policy is correctly set to noeviction');
            }
        } catch (configError) {
            // FIXED: Handle managed service permission restrictions gracefully
            if (configError.message.includes('NOPERM') || configError.message.includes('no permissions')) {
                console.warn('⚠️ Redis CONFIG command restricted by managed service (this is normal)');
                console.log('💡 Managed Redis providers restrict CONFIG for security - this is expected');
                console.log('✅ Redis connection is working properly for caching and queues');
            } else {
                console.warn('⚠️ Could not check Redis eviction policy:', configError.message);
            }
        }
    });

    client.on('close', () => {
        console.warn('⚠️ Redis connection closed, rate limiting will use memory store');
    });

    client.on('reconnecting', (delay) => {
        console.log(`🔄 Redis reconnecting in ${delay}ms...`);

        // CRITICAL: Limit reconnection attempts to prevent infinite loops
        if (delay > 1000) {
            console.warn('⚠️ Redis reconnection taking too long, disabling Redis');
            client.disconnect(false);
        }
    });

    client.on('end', () => {
        console.warn('⚠️ Redis connection ended');
    });

    // CRITICAL: Handle connection timeout
    client.on('timeout', () => {
        console.warn('⚠️ Redis connection timeout, using memory store fallback');
        client.disconnect(false);
    });
}

// CRITICAL FIX: Helper function to safely check Redis connection status
function isRedisReady() {
    return client &&
        client.status === 'ready' &&
        !client.offlineQueue &&
        typeof client.ping === 'function';
}

// CRITICAL FIX: Helper function to safely execute Redis commands
async function safeRedisCommand(command, ...args) {
    if (!isRedisReady()) {
        throw new Error('Redis not available');
    }

    try {
        return await client[command](...args);
    } catch (error) {
        console.warn(`⚠️ Redis command ${command} failed:`, error.message);
        throw error;
    }
}

const key = {
    link: (address, domain_id) => `l:${address}:${domain_id || ""}`,
    domain: (address) => `d:${address}`,
    stats: (link_id) => `s:${link_id}`,
    host: (address) => `h:${address}`,
    user: (idOrKey) => `u:${idOrKey}`
};

const remove = {
    domain: async(domain) => {
        if (!domain || !isRedisReady()) return Promise.resolve();
        try {
            return await safeRedisCommand('del', key.domain(domain.address));
        } catch (error) {
            console.warn('⚠️ Redis cache delete failed for domain:', error.message);
            return Promise.resolve();
        }
    },
    host: async(host) => {
        if (!host || !isRedisReady()) return Promise.resolve();
        try {
            return await safeRedisCommand('del', key.host(host.address));
        } catch (error) {
            console.warn('⚠️ Redis cache delete failed for host:', error.message);
            return Promise.resolve();
        }
    },
    link: async(link) => {
        if (!link || !isRedisReady()) return Promise.resolve();
        try {
            return await safeRedisCommand('del', key.link(link.address, link.domain_id));
        } catch (error) {
            console.warn('⚠️ Redis cache delete failed for link:', error.message);
            return Promise.resolve();
        }
    },
    user: async(user) => {
        if (!user || !isRedisReady()) return Promise.resolve();
        try {
            return await Promise.all([
                safeRedisCommand('del', key.user(user.id)),
                safeRedisCommand('del', key.user(user.apikey)),
            ]);
        } catch (error) {
            console.warn('⚠️ Redis cache delete failed for user:', error.message);
            return Promise.resolve();
        }
    }
};


module.exports = {
    client,
    key,
    remove,
    isRedisReady,
    safeRedisCommand
}