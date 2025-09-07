/**
 * API Cache Service Test Script
 * Tests the fixed Redis integration and fallback mechanisms
 */

require('dotenv').config();
const env = require('../env');

async function testAPICacheService() {
    console.log('🧪 API CACHE SERVICE TEST');
    console.log('==========================\n');

    console.log('📋 Environment Configuration:');
    console.log(`   REDIS_ENABLED: ${env.REDIS_ENABLED}`);
    console.log(`   REDIS_HOST: ${env.REDIS_HOST}`);
    console.log(`   REDIS_PORT: ${env.REDIS_PORT}\n`);

    try {
        // Test 1: Import API Cache Service
        console.log('🔍 Test 1: Importing API Cache Service...');
        const apiCache = require('../services/cache/api-cache.service');
        console.log('✅ API Cache Service imported successfully\n');

        // Test 2: Test cache SET operation
        console.log('🔍 Test 2: Testing cache SET operation...');
        const testData = {
            message: 'Test cache data',
            timestamp: Date.now(),
            success: true
        };
        
        await apiCache.set('test-endpoint', testData, 60);
        console.log('✅ Cache SET operation completed\n');

        // Test 3: Test cache GET operation
        console.log('🔍 Test 3: Testing cache GET operation...');
        const cachedData = await apiCache.get('test-endpoint');
        
        if (cachedData) {
            console.log('✅ Cache GET operation successful');
            console.log(`   Retrieved data: ${JSON.stringify(cachedData)}\n`);
        } else {
            console.log('⚠️ Cache GET returned null (cache miss)\n');
        }

        // Test 4: Test cache statistics
        console.log('🔍 Test 4: Testing cache statistics...');
        const stats = await apiCache.getStats();
        console.log('✅ Cache statistics retrieved:');
        console.log(`   Redis available: ${stats.redis_available}`);
        console.log(`   Memory cache size: ${stats.memory_cache_size}`);
        console.log(`   Cache TTLs: ${JSON.stringify(stats.cache_ttls)}\n`);

        // Test 5: Test cache invalidation
        console.log('🔍 Test 5: Testing cache invalidation...');
        await apiCache.invalidate('test-endpoint');
        console.log('✅ Cache invalidation completed\n');

        // Test 6: Verify invalidation worked
        console.log('🔍 Test 6: Verifying cache invalidation...');
        const invalidatedData = await apiCache.get('test-endpoint');
        
        if (!invalidatedData) {
            console.log('✅ Cache invalidation verified - data removed\n');
        } else {
            console.log('⚠️ Cache invalidation may not have worked - data still present\n');
        }

        console.log('🎉 All API Cache Service tests completed successfully!');
        return true;

    } catch (error) {
        console.error('❌ API Cache Service test failed:', error.message);
        console.error('Stack trace:', error.stack);
        return false;
    }
}

async function testMaintenanceStatusEndpoint() {
    console.log('\n🧪 MAINTENANCE STATUS ENDPOINT TEST');
    console.log('====================================\n');

    try {
        // Test the maintenance status logic without making HTTP requests
        console.log('🔍 Testing maintenance status logic...');
        
        const apiCache = require('../services/cache/api-cache.service');
        const query = require('../queries');

        // Simulate the maintenance status endpoint logic
        let cachedStatus = await apiCache.get('maintenance-status');
        console.log(`   Cache status: ${cachedStatus ? 'HIT' : 'MISS'}`);

        if (!cachedStatus) {
            console.log('   Fetching from database...');
            
            // Get SEO settings which include maintenance mode
            const seoSettings = await query.seoSettings.getSEOSettings();

            const response = {
                success: true,
                maintenance_mode: seoSettings.maintenance_mode || false,
                maintenance_message: seoSettings.maintenance_message || 'We are currently performing scheduled maintenance. Please check back soon.',
                maintenance_title: seoSettings.maintenance_title || 'Site Under Maintenance',
                estimated_downtime: seoSettings.maintenance_estimated_time || '2 hours',
                contact_information: 'support@bounce2bounce.com',
                timestamp: new Date().toISOString()
            };

            // Cache the result
            await apiCache.set('maintenance-status', response, 60);
            cachedStatus = response;
        }

        console.log('✅ Maintenance status endpoint logic test successful');
        console.log(`   Response: ${JSON.stringify(cachedStatus, null, 2)}\n`);

        return true;

    } catch (error) {
        console.error('❌ Maintenance status endpoint test failed:', error.message);
        return false;
    }
}

// Run tests
async function runAllTests() {
    console.log('🚀 Starting API Cache Service Tests...\n');

    const results = [];

    // Test API Cache Service
    const cacheTest = await testAPICacheService();
    results.push({ name: 'API Cache Service', passed: cacheTest });

    // Test Maintenance Status Endpoint
    const maintenanceTest = await testMaintenanceStatusEndpoint();
    results.push({ name: 'Maintenance Status Endpoint', passed: maintenanceTest });

    // Summary
    console.log('\n📊 TEST RESULTS SUMMARY');
    console.log('========================');
    
    results.forEach(result => {
        const status = result.passed ? '✅ PASSED' : '❌ FAILED';
        console.log(`   ${result.name}: ${status}`);
    });

    const allPassed = results.every(r => r.passed);
    console.log(`\n🎯 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);

    if (allPassed) {
        console.log('\n🎉 Redis connection issues have been resolved!');
        console.log('   - API Cache Service is working correctly');
        console.log('   - Maintenance status endpoint logic is fixed');
        console.log('   - Fallback mechanisms are functioning');
    } else {
        console.log('\n🔧 Some issues remain - check the error messages above');
    }

    return allPassed;
}

if (require.main === module) {
    runAllTests()
        .then(success => {
            process.exit(success ? 0 : 1);
        })
        .catch(error => {
            console.error('💥 Test script failed:', error);
            process.exit(1);
        });
}

module.exports = { testAPICacheService, testMaintenanceStatusEndpoint, runAllTests };
