#!/usr/bin/env node

/**
 * Test script to verify the maintenance mode fixes
 */

const path = require('path');

// Set up environment
process.env.NODE_ENV = 'development';
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function testMaintenanceFix() {
    console.log('🧪 Testing Maintenance Mode Fix...\n');
    
    try {
        // Test 1: Database fallback functionality
        console.log('📋 Test 1: Database Fallback Functionality');
        
        const { fetchMaintenanceStatus } = require('./server/middleware/maintenance.middleware');
        
        console.log('🔍 Testing fetchMaintenanceStatus with database fallback...');
        const status = await fetchMaintenanceStatus();
        
        console.log('✅ Maintenance status result:', {
            maintenance_mode: status.maintenance_mode,
            source: status.source || 'api',
            message: status.maintenance_message,
            timestamp: status.timestamp
        });
        
        // Test 2: Direct database check
        console.log('\n📋 Test 2: Direct Database Check');
        
        const knex = require('./server/knex');
        
        const seoSettings = await knex('seo_settings').first();
        console.log('🗄️ SEO Settings maintenance_mode:', seoSettings?.maintenance_mode);
        
        const homepageSettings = await knex('homepage_settings').first();
        console.log('🗄️ Homepage Settings maintenance_mode:', homepageSettings?.maintenance_mode);
        
        // Test 3: Cache functionality
        console.log('\n📋 Test 3: Cache Functionality');
        
        const { clearMaintenanceCache, refreshMaintenanceStatus } = require('./server/middleware/maintenance.middleware');
        
        console.log('🗑️ Clearing maintenance cache...');
        clearMaintenanceCache();
        
        console.log('🔄 Refreshing maintenance status...');
        const refreshedStatus = await refreshMaintenanceStatus();
        
        console.log('✅ Refreshed status:', {
            maintenance_mode: refreshedStatus.maintenance_mode,
            source: refreshedStatus.source || 'api'
        });
        
        // Summary
        console.log('\n📊 Test Summary:');
        console.log('================');
        console.log(`Database SEO Settings: ${seoSettings?.maintenance_mode ? 'ENABLED' : 'DISABLED'}`);
        console.log(`Database Homepage Settings: ${homepageSettings?.maintenance_mode ? 'ENABLED' : 'DISABLED'}`);
        console.log(`Middleware Result: ${status.maintenance_mode ? 'ENABLED' : 'DISABLED'}`);
        console.log(`Refreshed Result: ${refreshedStatus.maintenance_mode ? 'ENABLED' : 'DISABLED'}`);
        
        if (status.maintenance_mode === true) {
            console.log('✅ SUCCESS: Maintenance mode is properly detected as ENABLED');
        } else {
            console.log('❌ ISSUE: Maintenance mode should be ENABLED but was detected as DISABLED');
        }
        
        await knex.destroy();
        
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

// Run the test
testMaintenanceFix().then(() => {
    console.log('\n🎉 Test completed successfully!');
    process.exit(0);
}).catch((error) => {
    console.error('💥 Test failed with error:', error);
    process.exit(1);
});
