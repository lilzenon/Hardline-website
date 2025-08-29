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
            connectTimeout: 15000, // Increased to 15 seconds for better connection reliability
            commandTimeout: 8000, // Increased to 8 seconds for better command reliability
            retryDelayOnFailover: 200, // Increased to 200ms for better stability
            maxRetriesPerRequest: 2, // Reduced to 2 for faster failures
            lazyConnect: true, // Connect only when needed
            keepAlive: 30000, // Keep connections alive for 30 seconds
            // Connection pool settings
            family: 4, // Use IPv4
            // CRITICAL FIX: Better error handling configuration
            retryDelayOnClusterDown: 500, // Increased for better stability
            enableOfflineQueue: true, // CHANGED: Enable queue to prevent immediate failures
            maxRetriesPerRequest: 2, // Consistent retry count
            // Performance optimizations
            enableReadyCheck: true,
            maxLoadingTimeout: 8000, // Increased for better reliability
            // Logging
            showFriendlyErrorStack: env.NODE_ENV === 'development',
            // CRITICAL FIX: Add reconnection strategy
            retryDelayOnFailover: 200,
            enableAutoPipelining: false, // Disable for better error handling
            // Add connection recovery options
            autoResubscribe: true,
            autoResendUnfulfilledCommands: true
        });

        console.log('🔄 Redis client created, attempting connection...');
    } catch (error) {
        console.error('🚨 Failed to create Redis client:', error.message);
        client = null;
    }
}

// CRITICAL FIX: Enhanced error handling with better connection management
if (client) {
    client.on('error', (error) => {
        console.error('🚨 Redis connection error:', error.message);
        // Don't crash the application on Redis errors
        if (error.code === 'ECONNREFUSED') {
            console.warn('⚠️ Redis server unavailable, rate limiting will use memory store');
        } else if (error.message.includes('Stream isn\'t writeable')) {
            console.warn('⚠️ Redis stream not writable, rate limiting will use memory store');
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
    });

    client.on('end', () => {
        console.warn('⚠️ Redis connection ended');
    });
}

// CRITICAL FIX: Helper function to safely check Redis connection status
function isRedisReady() {
    return client && (client.status === 'ready' || client.status === 'connect');
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