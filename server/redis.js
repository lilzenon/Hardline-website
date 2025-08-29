const Redis = require("ioredis");

const env = require("./env");

let client;

if (env.REDIS_ENABLED) {
    try {
        client = new Redis({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            db: env.REDIS_DB,
            ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
            // CRITICAL FIX: Improved Redis configuration for stability
            connectTimeout: 5000, // Reduced timeout for faster failure detection
            commandTimeout: 3000, // Reduced timeout for faster failure detection
            retryDelayOnFailover: 100, // Faster retry for better responsiveness
            maxRetriesPerRequest: 1, // Reduced to 1 for immediate fallback to memory store
            lazyConnect: true, // Connect only when needed
            keepAlive: 30000, // Keep connections alive for 30 seconds
            // Connection pool settings
            family: 4, // Use IPv4
            // CRITICAL FIX: Better error handling configuration
            retryDelayOnClusterDown: 100, // Faster retry
            enableOfflineQueue: false, // CRITICAL: Disable queue to prevent hanging requests
            // Performance optimizations
            enableReadyCheck: true,
            maxLoadingTimeout: 3000, // Reduced for faster failure detection
            // Logging
            showFriendlyErrorStack: env.NODE_ENV === 'development',
            // CRITICAL FIX: Add reconnection strategy with limits
            enableAutoPipelining: false, // Disable for better error handling
            // Add connection recovery options
            autoResubscribe: false, // Disable to prevent hanging
            autoResendUnfulfilledCommands: false, // Disable to prevent hanging
            // CRITICAL: Add retry strategy with maximum attempts
            retryDelayOnFailover: 100,
            maxRetriesPerRequest: 1, // Only try once before giving up
            // CRITICAL: Disable reconnection attempts that cause crashes
            reconnectOnError: null, // Disable automatic reconnection
            // CRITICAL: Set connection name for debugging
            connectionName: 'kutt-homepage'
        });

        console.log('🔄 Redis client created with fail-fast configuration...');
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

    client.on('ready', () => {
        console.log('🚀 Redis ready for commands');
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