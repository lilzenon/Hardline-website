#!/usr/bin/env node

/**
 * Redis Health Check Script
 * Comprehensive Redis connectivity and performance testing
 */

const Redis = require('ioredis');
require('dotenv').config();

const env = require('../server/env');

async function checkRedisHealth() {
    console.log('🔍 Redis Health Check Starting...\n');
    
    // Display current configuration
    console.log('📊 Current Redis Configuration:');
    console.log(`   REDIS_ENABLED: ${env.REDIS_ENABLED}`);
    console.log(`   REDIS_HOST: ${env.REDIS_HOST}`);
    console.log(`   REDIS_PORT: ${env.REDIS_PORT}`);
    console.log(`   REDIS_DB: ${env.REDIS_DB}`);
    console.log(`   REDIS_PASSWORD: ${env.REDIS_PASSWORD ? '***SET***' : 'NOT SET'}\n`);

    if (!env.REDIS_ENABLED) {
        console.log('⚠️ Redis is disabled in configuration');
        console.log('💡 Set REDIS_ENABLED=true to enable Redis caching\n');
        return;
    }

    let client;
    try {
        // Create Redis client with production settings
        client = new Redis({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            db: env.REDIS_DB,
            password: env.REDIS_PASSWORD || undefined,
            connectTimeout: 10000,
            commandTimeout: 5000,
            retryDelayOnFailover: 150,
            maxRetriesPerRequest: 3,
            lazyConnect: true,
            enableReadyCheck: true,
            maxLoadingTimeout: 6000,
            connectionName: 'health-check'
        });

        console.log('🔄 Attempting Redis connection...');
        
        // Test connection
        const startTime = Date.now();
        await client.ping();
        const connectionTime = Date.now() - startTime;
        
        console.log(`✅ Redis connection successful (${connectionTime}ms)`);
        
        // Test basic operations
        console.log('\n🧪 Testing Redis Operations:');
        
        // Test SET/GET
        await client.set('health:test', 'success', 'EX', 10);
        const result = await client.get('health:test');
        console.log(`   SET/GET: ${result === 'success' ? '✅ PASS' : '❌ FAIL'}`);
        
        // Test DELETE
        await client.del('health:test');
        const deleted = await client.get('health:test');
        console.log(`   DELETE: ${deleted === null ? '✅ PASS' : '❌ FAIL'}`);
        
        // Test performance
        const perfStart = Date.now();
        const promises = [];
        for (let i = 0; i < 100; i++) {
            promises.push(client.set(`perf:${i}`, `value${i}`, 'EX', 5));
        }
        await Promise.all(promises);
        const perfTime = Date.now() - perfStart;
        console.log(`   Performance (100 ops): ${perfTime}ms (${(100000/perfTime).toFixed(0)} ops/sec)`);
        
        // Clean up performance test keys
        const keys = await client.keys('perf:*');
        if (keys.length > 0) {
            await client.del(...keys);
        }
        
        // Test Redis info
        const info = await client.info('memory');
        const memoryMatch = info.match(/used_memory_human:([^\r\n]+)/);
        if (memoryMatch) {
            console.log(`   Memory Usage: ${memoryMatch[1].trim()}`);
        }
        
        console.log('\n🎉 Redis Health Check PASSED');
        console.log('💡 Redis is properly configured and performing well');
        
    } catch (error) {
        console.error('\n❌ Redis Health Check FAILED');
        console.error(`   Error: ${error.message}`);
        
        console.log('\n🔧 Troubleshooting Steps:');
        console.log('1. Verify Redis service is running on Render');
        console.log('2. Check Redis host and port in environment variables');
        console.log('3. Verify Redis password (if required)');
        console.log('4. Check network connectivity to Redis service');
        console.log('5. Ensure Redis service is properly provisioned in render.yaml');
        
        if (error.code === 'ENOTFOUND') {
            console.log('\n💡 DNS Resolution Failed:');
            console.log('   - Redis host may not exist or be accessible');
            console.log('   - Check if Redis service is properly configured in Render');
        } else if (error.code === 'ECONNREFUSED') {
            console.log('\n💡 Connection Refused:');
            console.log('   - Redis service may not be running');
            console.log('   - Check Redis service status in Render dashboard');
        } else if (error.message.includes('timeout')) {
            console.log('\n💡 Connection Timeout:');
            console.log('   - Redis service may be overloaded');
            console.log('   - Consider upgrading Redis plan');
        }
        
        process.exit(1);
    } finally {
        if (client) {
            await client.disconnect();
        }
    }
}

// Run health check
checkRedisHealth().catch(console.error);
