#!/usr/bin/env node

/**
 * Force Redis Enable Script
 * Ensures Redis is properly enabled in production environment
 */

console.log('🔧 Force Redis Enable Script');
console.log('='.repeat(50));

// Check current environment
console.log('\n📊 Current Environment Status:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REDIS_ENABLED (raw):', process.env.REDIS_ENABLED);

// Force Redis enabled for production
if (process.env.NODE_ENV === 'production') {
    console.log('\n🚀 Production environment detected');
    
    // Override Redis settings for production
    if (process.env.REDIS_ENABLED !== 'true') {
        console.log('⚠️ REDIS_ENABLED is not true in production');
        console.log('🔧 This should be set in your Render environment variables');
        
        // Force enable for this session (temporary fix)
        process.env.REDIS_ENABLED = 'true';
        console.log('✅ Temporarily forced REDIS_ENABLED=true for this session');
    } else {
        console.log('✅ REDIS_ENABLED is correctly set to true');
    }
    
    // Check other Redis variables
    const requiredVars = ['REDIS_HOST', 'REDIS_PORT'];
    let allSet = true;
    
    requiredVars.forEach(varName => {
        if (!process.env[varName]) {
            console.log(`❌ ${varName} is not set`);
            allSet = false;
        } else {
            console.log(`✅ ${varName}: ${process.env[varName]}`);
        }
    });
    
    if (!allSet) {
        console.log('\n🚨 CRITICAL: Missing Redis environment variables');
        console.log('📋 Required variables for Render:');
        console.log('   REDIS_ENABLED=true');
        console.log('   REDIS_HOST=your-redis-host');
        console.log('   REDIS_PORT=6379');
        console.log('   REDIS_PASSWORD=your-redis-password');
        process.exit(1);
    }
} else {
    console.log('\n🔧 Development environment detected');
    console.log('💡 Redis may be disabled for local development');
}

// Test the environment loading
console.log('\n🔍 Testing Environment Loading...');
try {
    const env = require('../env');
    console.log('✅ Environment loaded successfully');
    console.log('   REDIS_ENABLED (parsed):', env.REDIS_ENABLED);
    console.log('   REDIS_HOST (parsed):', env.REDIS_HOST);
    console.log('   REDIS_PORT (parsed):', env.REDIS_PORT);
    
    if (env.REDIS_ENABLED) {
        console.log('✅ Redis is ENABLED in parsed environment');
        
        // Test Redis connection
        console.log('\n🔌 Testing Redis Connection...');
        testRedisConnection(env);
    } else {
        console.log('❌ Redis is DISABLED in parsed environment');
        console.log('🔧 Check your environment variable configuration');
    }
} catch (error) {
    console.error('❌ Environment loading error:', error.message);
    process.exit(1);
}

async function testRedisConnection(env) {
    try {
        const Redis = require('ioredis');
        
        const client = new Redis({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            db: env.REDIS_DB,
            password: env.REDIS_PASSWORD || undefined,
            connectTimeout: 5000,
            commandTimeout: 3000,
            lazyConnect: true,
        });

        console.log('🔄 Attempting Redis connection...');
        
        await client.ping();
        console.log('✅ Redis connection successful!');
        console.log('🎉 Redis is working properly');
        
        // Test queue operations
        await client.set('test:force-enable', 'success', 'EX', 10);
        const result = await client.get('test:force-enable');
        
        if (result === 'success') {
            console.log('✅ Redis operations working correctly');
        }
        
        await client.del('test:force-enable');
        await client.disconnect();
        
        console.log('\n🎯 RESULT: Redis is properly configured and working');
        console.log('💡 Visit worker timeouts should be eliminated');
        
    } catch (error) {
        console.error('❌ Redis connection failed:', error.message);
        console.log('\n🔧 Troubleshooting steps:');
        console.log('1. Verify Redis service is running');
        console.log('2. Check Redis host and port settings');
        console.log('3. Verify Redis password (if required)');
        console.log('4. Check network connectivity to Redis');
        
        process.exit(1);
    }
}

console.log('\n✅ Redis enable check completed');
