#!/usr/bin/env node

const fetch = require('node-fetch');

async function testEventCreation() {
    console.log('🧪 Testing Event Creation API...');
    
    // Test data
    const testEvent = {
        title: 'Test Event from API',
        description: 'This is a test event created via API',
        slug: 'test-event-api',
        is_active: true
    };
    
    try {
        console.log('📝 Test event data:', testEvent);
        
        // First, let's test if the endpoint exists
        console.log('🚀 Testing POST /api/events endpoint...');
        
        const response = await fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Note: This will fail due to authentication, but we can see if the endpoint exists
            },
            body: JSON.stringify(testEvent)
        });
        
        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('📡 Response body:', responseText);
        
        if (response.status === 401) {
            console.log('✅ Endpoint exists but requires authentication (expected)');
        } else if (response.status === 404) {
            console.log('❌ Endpoint not found - route registration issue');
        } else {
            console.log('🔍 Unexpected response - needs investigation');
        }
        
    } catch (error) {
        console.error('❌ Error testing API:', error.message);
    }
}

// Test if server is running
async function testServerHealth() {
    try {
        const response = await fetch('http://localhost:3000/api/health');
        if (response.ok) {
            console.log('✅ Server is running and healthy');
            return true;
        } else {
            console.log('⚠️ Server responded but not healthy');
            return false;
        }
    } catch (error) {
        console.log('❌ Server is not running or not accessible');
        return false;
    }
}

async function main() {
    console.log('🔍 Testing Event Creation Workflow...\n');
    
    const serverHealthy = await testServerHealth();
    if (!serverHealthy) {
        console.log('❌ Cannot proceed - server is not running');
        process.exit(1);
    }
    
    await testEventCreation();
    
    console.log('\n🎯 Test completed. Check the results above.');
}

main().catch(console.error);
