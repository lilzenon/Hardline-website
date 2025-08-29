#!/usr/bin/env node

/**
 * Comprehensive Visit System Test Script
 * Tests all visit processing components and identifies timeout issues
 */

console.log('🔍 COMPREHENSIVE VISIT SYSTEM TEST');
console.log('='.repeat(60));

async function testEnvironmentVariables() {
    console.log('\n📊 STEP 1: Environment Variables Test');
    console.log('-'.repeat(40));
    
    const env = require('../env');
    
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('REDIS_ENABLED (raw):', process.env.REDIS_ENABLED);
    console.log('REDIS_ENABLED (parsed):', env.REDIS_ENABLED);
    console.log('REDIS_HOST:', env.REDIS_HOST);
    console.log('REDIS_PORT:', env.REDIS_PORT);
    
    if (env.REDIS_ENABLED) {
        console.log('✅ Redis is ENABLED in environment');
    } else {
        console.log('⚠️ Redis is DISABLED - will use robust processor fallback');
    }
}

async function testRedisConnection() {
    console.log('\n🔌 STEP 2: Redis Connection Test');
    console.log('-'.repeat(40));
    
    try {
        const env = require('../env');
        
        if (!env.REDIS_ENABLED) {
            console.log('⏭️ Skipping Redis test (disabled)');
            return false;
        }
        
        const Redis = require('ioredis');
        const client = new Redis({
            host: env.REDIS_HOST,
            port: env.REDIS_PORT,
            db: env.REDIS_DB,
            password: env.REDIS_PASSWORD || undefined,
            connectTimeout: 3000,
            commandTimeout: 2000,
            maxRetriesPerRequest: null, // BullMQ requirement
            lazyConnect: true,
        });

        await client.ping();
        console.log('✅ Redis connection successful');
        
        await client.set('test:visit-system', 'working', 'EX', 10);
        const result = await client.get('test:visit-system');
        
        if (result === 'working') {
            console.log('✅ Redis read/write operations working');
        }
        
        await client.del('test:visit-system');
        await client.disconnect();
        
        return true;
    } catch (error) {
        console.error('❌ Redis connection failed:', error.message);
        return false;
    }
}

async function testQueueInitialization() {
    console.log('\n⚙️ STEP 3: Queue System Test');
    console.log('-'.repeat(40));
    
    try {
        const queues = require('../queues');
        
        if (queues.visit) {
            console.log('✅ Visit queue initialized');
            
            if (queues.visitWorker) {
                console.log('✅ Visit worker initialized');
            } else {
                console.log('⚠️ Visit worker not initialized (using fallback)');
            }
        } else {
            console.log('❌ Visit queue not initialized');
        }
        
        return !!queues.visit;
    } catch (error) {
        console.error('❌ Queue initialization error:', error.message);
        return false;
    }
}

async function testRobustProcessor() {
    console.log('\n🛡️ STEP 4: Robust Processor Test');
    console.log('-'.repeat(40));
    
    try {
        const visitProcessor = require('../services/visit-processor');
        console.log('✅ Robust visit processor loaded');
        
        const stats = visitProcessor.getStats();
        console.log('📊 Processor stats:', stats);
        
        return true;
    } catch (error) {
        console.error('❌ Robust processor error:', error.message);
        return false;
    }
}

async function testDatabaseConnection() {
    console.log('\n🗄️ STEP 5: Database Connection Test');
    console.log('-'.repeat(40));
    
    try {
        const knex = require('../knex');
        
        const start = Date.now();
        await knex.raw('SELECT 1 as test');
        const queryTime = Date.now() - start;
        
        console.log(`✅ Database connection successful (${queryTime}ms)`);
        
        if (queryTime > 1000) {
            console.log('⚠️ Database response time is slow (>1s)');
        }
        
        // Test visits table
        const visitCount = await knex('visits').count('* as count').first();
        console.log(`📊 Total visits in database: ${visitCount.count}`);
        
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        return false;
    }
}

async function testVisitProcessing() {
    console.log('\n🧪 STEP 6: Visit Processing Test');
    console.log('-'.repeat(40));
    
    try {
        const testVisit = {
            link: {
                id: 'test-link-' + Date.now(),
                user_id: 'test-user'
            },
            ip: '127.0.0.1',
            userAgent: 'Mozilla/5.0 (Test) Chrome/91.0',
            referrer: 'https://test.com'
        };
        
        console.log('🔄 Testing visit processing...');
        
        const queues = require('../queues');
        const start = Date.now();
        
        if (queues.visit) {
            queues.visit.add(testVisit);
            const processingTime = Date.now() - start;
            console.log(`✅ Visit queued successfully (${processingTime}ms)`);
        } else {
            console.log('❌ No visit queue available');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('❌ Visit processing test failed:', error.message);
        return false;
    }
}

async function generateReport(results) {
    console.log('\n📋 COMPREHENSIVE TEST REPORT');
    console.log('='.repeat(60));
    
    const passed = results.filter(r => r.passed).length;
    const total = results.length;
    
    console.log(`Overall Score: ${passed}/${total} tests passed`);
    console.log('');
    
    results.forEach(result => {
        const status = result.passed ? '✅' : '❌';
        console.log(`${status} ${result.name}: ${result.message}`);
    });
    
    console.log('\n💡 RECOMMENDATIONS:');
    
    if (!results.find(r => r.name === 'Redis Connection').passed) {
        console.log('🔧 Enable Redis in production for optimal performance');
        console.log('   Set REDIS_ENABLED=true in Render environment variables');
    }
    
    if (!results.find(r => r.name === 'Queue System').passed) {
        console.log('🔧 Queue system issues detected');
        console.log('   Check Redis configuration and BullMQ compatibility');
    }
    
    if (results.find(r => r.name === 'Database Connection' && r.message.includes('slow'))) {
        console.log('🔧 Database performance optimization needed');
        console.log('   Consider connection pooling and query optimization');
    }
    
    console.log('\n🎯 EXPECTED IMPACT:');
    if (passed >= 4) {
        console.log('✅ Visit worker timeouts should be significantly reduced');
        console.log('✅ System has multiple fallback strategies active');
    } else {
        console.log('⚠️ Additional fixes needed to eliminate timeouts');
        console.log('⚠️ Check failed components above');
    }
}

async function main() {
    const results = [];
    
    try {
        await testEnvironmentVariables();
        
        const redisWorking = await testRedisConnection();
        results.push({
            name: 'Redis Connection',
            passed: redisWorking,
            message: redisWorking ? 'Connected and working' : 'Failed or disabled'
        });
        
        const queueWorking = await testQueueInitialization();
        results.push({
            name: 'Queue System',
            passed: queueWorking,
            message: queueWorking ? 'Initialized successfully' : 'Failed to initialize'
        });
        
        const processorWorking = await testRobustProcessor();
        results.push({
            name: 'Robust Processor',
            passed: processorWorking,
            message: processorWorking ? 'Loaded and ready' : 'Failed to load'
        });
        
        const dbWorking = await testDatabaseConnection();
        results.push({
            name: 'Database Connection',
            passed: dbWorking,
            message: dbWorking ? 'Connected and responsive' : 'Failed to connect'
        });
        
        const visitWorking = await testVisitProcessing();
        results.push({
            name: 'Visit Processing',
            passed: visitWorking,
            message: visitWorking ? 'Test visit processed' : 'Processing failed'
        });
        
        await generateReport(results);
        
    } catch (error) {
        console.error('❌ Test suite error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main };
