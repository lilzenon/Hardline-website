#!/usr/bin/env node

/**
 * Redis Connection Test Script
 * Tests actual Redis connectivity and environment variable loading
 */

console.log('🔍 Redis Connection Test');
console.log('='.repeat(50));

// Test environment variable loading
console.log('\n📊 Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REDIS_ENABLED (raw):', process.env.REDIS_ENABLED);
console.log('REDIS_HOST (raw):', process.env.REDIS_HOST);
console.log('REDIS_PORT (raw):', process.env.REDIS_PORT);
console.log('REDIS_PASSWORD (raw):', process.env.REDIS_PASSWORD ? '[SET]' : '[NOT SET]');

// Load environment through our env.js
console.log('\n📊 Parsed Environment (via env.js):');
const env = require('../env');
console.log('REDIS_ENABLED (parsed):', env.REDIS_ENABLED);
console.log('REDIS_HOST (parsed):', env.REDIS_HOST);
console.log('REDIS_PORT (parsed):', env.REDIS_PORT);
console.log('REDIS_PASSWORD (parsed):', env.REDIS_PASSWORD ? '[SET]' : '[NOT SET]');
console.log('REDIS_DB (parsed):', env.REDIS_DB);

// Test Redis connection
console.log('\n🔌 Testing Redis Connection...');

if (!env.REDIS_ENABLED) {
    console.log('❌ Redis is DISABLED in environment');
    console.log('💡 This explains why you\'re getting timeout errors');
    console.log('🔧 Check your Render environment variables');
    return;
}

try {
    const Redis = require('ioredis');
    
    const client = new Redis({
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        db: env.REDIS_DB,
        password: env.REDIS_PASSWORD || undefined,
        connectTimeout: 5000,
        commandTimeout: 3000,
        retryDelayOnFailover: 100,
        maxRetriesPerRequest: 2,
        lazyConnect: true,
    });

    console.log('🔄 Attempting Redis connection...');
    
    client.on('connect', () => {
        console.log('✅ Redis connected successfully');
    });

    client.on('ready', () => {
        console.log('🚀 Redis ready for commands');
        testRedisOperations(client);
    });

    client.on('error', (error) => {
        console.error('❌ Redis connection error:', error.message);
        process.exit(1);
    });

    // Connect to Redis
    await client.connect();

} catch (error) {
    console.error('❌ Redis setup error:', error.message);
    process.exit(1);
}

async function testRedisOperations(client) {
    try {
        console.log('\n🧪 Testing Redis Operations...');
        
        // Test basic operations
        await client.set('test:connection', 'success', 'EX', 10);
        const result = await client.get('test:connection');
        
        if (result === 'success') {
            console.log('✅ Redis read/write operations working');
        } else {
            console.log('❌ Redis read/write operations failed');
        }
        
        // Test queue operations
        console.log('🔍 Testing queue operations...');
        await client.lpush('test:queue', 'test-job');
        const queueLength = await client.llen('test:queue');
        await client.del('test:queue');
        
        console.log(`✅ Queue operations working (length: ${queueLength})`);
        
        // Clean up
        await client.del('test:connection');
        
        console.log('\n🎉 All Redis tests passed!');
        console.log('💡 Redis should be working for visit processing');
        
        await client.disconnect();
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Redis operation error:', error.message);
        await client.disconnect();
        process.exit(1);
    }
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled rejection:', error.message);
    process.exit(1);
});
