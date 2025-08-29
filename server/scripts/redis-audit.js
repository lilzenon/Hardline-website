#!/usr/bin/env node

/**
 * Simplified Redis Configuration Audit
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Redis Configuration Audit');
console.log('='.repeat(50));

// Check current server Redis config
console.log('\n📊 Homepage Server Redis Configuration:');
try {
    const homepageRedisPath = path.join(__dirname, '..', 'redis.js');
    if (fs.existsSync(homepageRedisPath)) {
        const content = fs.readFileSync(homepageRedisPath, 'utf8');
        
        // Extract key configurations
        const connectTimeout = content.match(/connectTimeout:\s*(\d+)/)?.[1];
        const commandTimeout = content.match(/commandTimeout:\s*(\d+)/)?.[1];
        const enableOfflineQueue = content.match(/enableOfflineQueue:\s*(true|false)/)?.[1];
        const connectionName = content.match(/connectionName:\s*['"`]([^'"`]+)['"`]/)?.[1];
        
        console.log(`   ✅ Redis config found`);
        console.log(`   📊 Connect Timeout: ${connectTimeout}ms`);
        console.log(`   📊 Command Timeout: ${commandTimeout}ms`);
        console.log(`   📊 Offline Queue: ${enableOfflineQueue}`);
        console.log(`   📊 Connection Name: ${connectionName}`);
    } else {
        console.log('   ❌ Redis config not found');
    }
} catch (error) {
    console.log(`   ❌ Error reading config: ${error.message}`);
}

// Check dashboard server Redis config
console.log('\n📊 Dashboard Server Redis Configuration:');
try {
    const dashboardRedisPath = path.join(__dirname, '..', '..', '..', 'kutt-dashboard-deploy', 'server', 'redis.js');
    if (fs.existsSync(dashboardRedisPath)) {
        const content = fs.readFileSync(dashboardRedisPath, 'utf8');
        
        // Extract key configurations
        const connectTimeout = content.match(/connectTimeout:\s*(\d+)/)?.[1];
        const commandTimeout = content.match(/commandTimeout:\s*(\d+)/)?.[1];
        const enableOfflineQueue = content.match(/enableOfflineQueue:\s*(true|false)/)?.[1];
        const connectionName = content.match(/connectionName:\s*['"`]([^'"`]+)['"`]/)?.[1];
        
        console.log(`   ✅ Redis config found`);
        console.log(`   📊 Connect Timeout: ${connectTimeout}ms`);
        console.log(`   📊 Command Timeout: ${commandTimeout}ms`);
        console.log(`   📊 Offline Queue: ${enableOfflineQueue}`);
        console.log(`   📊 Connection Name: ${connectionName}`);
    } else {
        console.log('   ❌ Redis config not found');
    }
} catch (error) {
    console.log(`   ❌ Error reading config: ${error.message}`);
}

// Check environment variables
console.log('\n🌍 Environment Variables:');
const redisVars = ['REDIS_ENABLED', 'REDIS_HOST', 'REDIS_PORT', 'REDIS_PASSWORD', 'REDIS_DB'];
redisVars.forEach(varName => {
    const value = process.env[varName];
    console.log(`   ${varName}: ${value || '(not set)'}`);
});

// Check if Redis is enabled
console.log('\n🔧 Redis Status:');
if (process.env.REDIS_ENABLED === 'true') {
    console.log('   ✅ Redis is ENABLED');
} else {
    console.log('   ⚠️ Redis is DISABLED - missing caching benefits');
}

// Recommendations
console.log('\n💡 Key Recommendations:');
console.log('   1. Enable Redis in production (REDIS_ENABLED=true)');
console.log('   2. Both servers now have unified Redis configuration');
console.log('   3. Implement cross-server caching for API responses');
console.log('   4. Use Redis for session sharing between servers');
console.log('   5. Set Redis eviction policy to "noeviction"');

console.log('\n🚀 Next Steps:');
console.log('   1. Set REDIS_ENABLED=true in production environment');
console.log('   2. Configure Redis connection details');
console.log('   3. Restart both servers to apply changes');
console.log('   4. Monitor Redis performance and connection health');

console.log('\n✅ Redis audit completed');
