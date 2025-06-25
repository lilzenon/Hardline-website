const Redis = require("ioredis");

const env = require("./env");

let client;

if (env.REDIS_ENABLED) {
    client = new Redis({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        db: env.REDIS_DB,
        ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD }),
        // Optimized Redis configuration for performance
        connectTimeout: 10000, // 10 seconds
        commandTimeout: 5000, // 5 seconds
        retryDelayOnFailover: 100, // 100ms
        maxRetriesPerRequest: 3, // Retry failed commands 3 times
        lazyConnect: true, // Connect only when needed
        keepAlive: 30000, // Keep connections alive for 30 seconds
        // Connection pool settings
        family: 4, // Use IPv4
        // Error handling
        retryDelayOnClusterDown: 300,
        enableOfflineQueue: false, // Don't queue commands when disconnected
        // Performance optimizations
        enableReadyCheck: true,
        maxLoadingTimeout: 5000,
        // Logging
        showFriendlyErrorStack: env.NODE_ENV === 'development'
    });

    // Enhanced error handling
    client.on('error', (error) => {
        console.error('🚨 Redis connection error:', error.message);
    });

    client.on('connect', () => {
        console.log('✅ Redis connected successfully');
    });

    client.on('ready', () => {
        console.log('🚀 Redis ready for commands');
    });

    client.on('close', () => {
        console.warn('⚠️ Redis connection closed');
    });

    client.on('reconnecting', () => {
        console.log('🔄 Redis reconnecting...');
    });
}

const key = {
    link: (address, domain_id) => `l:${address}:${domain_id || ""}`,
    domain: (address) => `d:${address}`,
    stats: (link_id) => `s:${link_id}`,
    host: (address) => `h:${address}`,
    user: (idOrKey) => `u:${idOrKey}`
};

const remove = {
    domain: (domain) => {
        if (!domain || !client) return Promise.resolve();
        return client.del(key.domain(domain.address));
    },
    host: (host) => {
        if (!host || !client) return Promise.resolve();
        return client.del(key.host(host.address));
    },
    link: (link) => {
        if (!link || !client) return Promise.resolve();
        return client.del(key.link(link.address, link.domain_id));
    },
    user: (user) => {
        if (!user || !client) return Promise.resolve();
        return Promise.all([
            client.del(key.user(user.id)),
            client.del(key.user(user.apikey)),
        ]);
    }
};


module.exports = {
    client,
    key,
    remove,
}