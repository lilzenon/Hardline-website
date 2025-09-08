#!/usr/bin/env node

/**
 * Simple test to check if image serving is working
 */

const http = require('http');

function testImageServing() {
    console.log('🔍 Testing Image Serving...');
    
    // Test a known UUID from the database
    const testUuid = '5615bfb2-11f9-4f60-bd6a-fb42fc679be1';
    const testUrl = `/api/images/serve/${testUuid}/medium`;
    
    console.log(`📡 Testing: http://localhost:3002${testUrl}`);
    
    const options = {
        hostname: 'localhost',
        port: 3002,
        path: testUrl,
        method: 'GET',
        headers: {
            'User-Agent': 'Image-Test/1.0'
        }
    };
    
    const req = http.request(options, (res) => {
        console.log(`📊 Status: ${res.statusCode}`);
        console.log(`📊 Headers:`, res.headers);
        
        if (res.statusCode === 200) {
            console.log('✅ Image serving is WORKING!');
            console.log(`📊 Content-Type: ${res.headers['content-type']}`);
            console.log(`📊 Content-Length: ${res.headers['content-length']} bytes`);
        } else {
            console.log('❌ Image serving FAILED');
            
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                console.log('📊 Response body:', data);
            });
        }
    });
    
    req.on('error', (error) => {
        console.log('❌ Request failed:', error.message);
    });
    
    req.setTimeout(5000, () => {
        console.log('❌ Request timed out');
        req.destroy();
    });
    
    req.end();
}

// Test basic server connectivity first
function testServerConnectivity() {
    console.log('🔍 Testing Server Connectivity...');
    
    const options = {
        hostname: 'localhost',
        port: 3002,
        path: '/api/health',
        method: 'GET'
    };
    
    const req = http.request(options, (res) => {
        console.log(`📊 Health check status: ${res.statusCode}`);
        
        if (res.statusCode === 200 || res.statusCode === 404) {
            console.log('✅ Server is responding');
            // Now test image serving
            setTimeout(testImageServing, 1000);
        } else {
            console.log('❌ Server health check failed');
        }
    });
    
    req.on('error', (error) => {
        console.log('❌ Server connectivity failed:', error.message);
        console.log('💡 Make sure the server is running on port 3002');
    });
    
    req.setTimeout(3000, () => {
        console.log('❌ Server connectivity timed out');
        req.destroy();
    });
    
    req.end();
}

// Start the test
testServerConnectivity();
