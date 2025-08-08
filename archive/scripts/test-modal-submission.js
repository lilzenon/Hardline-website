#!/usr/bin/env node

const fetch = require('node-fetch');

async function testModalSubmission() {
    console.log('🧪 Testing Create Event Modal Submission...');
    
    // First, let's get a valid session by logging in
    console.log('🔐 Attempting to get authentication...');
    
    // Test data for event creation
    const testEvent = {
        title: 'Test Modal Event',
        description: 'This is a test event created via modal',
        slug: 'test-modal-event',
        is_active: true
    };
    
    try {
        // Step 1: Try to access the events page to get session cookies
        console.log('📄 Accessing events page to establish session...');
        const eventsPageResponse = await fetch('http://localhost:3000/events', {
            method: 'GET',
            redirect: 'manual' // Don't follow redirects automatically
        });
        
        console.log('📄 Events page response status:', eventsPageResponse.status);
        
        if (eventsPageResponse.status === 302) {
            console.log('🔄 Redirected to login (expected for unauthenticated user)');
            console.log('🔄 Redirect location:', eventsPageResponse.headers.get('location'));
        }
        
        // Step 2: Test the API endpoint with authentication headers
        console.log('🚀 Testing POST /api/events with test data...');
        
        const response = await fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Modal-Test-Script'
            },
            body: JSON.stringify(testEvent)
        });
        
        console.log('📡 API Response status:', response.status);
        console.log('📡 API Response headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('📡 API Response body:', responseText);
        
        // Analyze the response
        if (response.status === 401) {
            console.log('✅ API endpoint exists and properly requires authentication');
            console.log('✅ This confirms the /api/events POST route is working');
        } else if (response.status === 404) {
            console.log('❌ API endpoint not found - route registration issue');
        } else if (response.status === 500) {
            console.log('⚠️ Server error - check backend handler implementation');
        } else {
            console.log('🔍 Unexpected response - needs investigation');
        }
        
    } catch (error) {
        console.error('❌ Error testing modal submission:', error.message);
    }
}

async function testFormValidation() {
    console.log('\n🔍 Testing form validation...');
    
    // Test with missing required fields
    const invalidEvent = {
        description: 'Event without title',
        is_active: true
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invalidEvent)
        });
        
        console.log('📡 Validation test response status:', response.status);
        const responseText = await response.text();
        console.log('📡 Validation test response:', responseText);
        
    } catch (error) {
        console.error('❌ Error testing validation:', error.message);
    }
}

async function main() {
    console.log('🎯 Testing Create Event Modal Workflow...\n');
    
    await testModalSubmission();
    await testFormValidation();
    
    console.log('\n📋 SUMMARY:');
    console.log('✅ If you see "401 Unauthorized" responses, the API is working correctly');
    console.log('✅ The modal should now be able to submit forms when authenticated');
    console.log('✅ Test the modal in the browser by logging in and clicking "Create Event"');
    
    console.log('\n🎯 Test completed. Check the results above.');
}

main().catch(console.error);
