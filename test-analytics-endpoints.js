/**
 * Analytics API Endpoints Test
 * Tests all failing analytics endpoints with proper authentication
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const env = require('./server/env');

// Generate a valid JWT token for testing
function generateTestToken() {
    const payload = {
        sub: 1, // User ID
        type: 'admin_session',
        role: 'admin',
        iss: 'bounce2bounce-admin',
        aud: 'bounce2bounce-dashboard',
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
        iat: Math.floor(Date.now() / 1000)
    };
    
    return jwt.sign(payload, env.JWT_SECRET, { algorithm: 'HS256' });
}

// Test analytics endpoints with authentication
async function testAnalyticsEndpoints() {
    console.log('🔍 Testing Analytics API Endpoints with Authentication...\n');
    
    const token = generateTestToken();
    console.log('Generated test token:', token.substring(0, 50) + '...\n');
    
    const endpoints = [
        '/api/analytics/dashboard?period=month:1',
        '/api/analytics/social/channels?period=month:1',
        '/api/analytics/visitors/channels?period=month:1',
        '/api/analytics/timeseries?period=month:1',
        '/api/analytics/visitors/cities?period=month:1'
    ];
    
    for (const endpoint of endpoints) {
        console.log(`🔍 Testing: ${endpoint}`);
        
        try {
            // Test without authentication first
            console.log('  📝 Testing without authentication...');
            await testEndpoint(endpoint, null);
            
            // Test with authentication
            console.log('  🔐 Testing with authentication...');
            await testEndpoint(endpoint, token);
            
        } catch (error) {
            console.error(`  ❌ Error testing ${endpoint}:`, error.message);
        }
        
        console.log(''); // Empty line for readability
    }
}

// Test individual endpoint
function testEndpoint(endpoint, token) {
    return new Promise((resolve, reject) => {
        const http = require('http');
        
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: endpoint,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        // Add authentication header if token provided
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        
        const req = http.request(options, (res) => {
            console.log(`    Status: ${res.statusCode}`);
            
            let data = '';
            res.on('data', (chunk) => data += chunk);
            
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    
                    if (res.statusCode === 200) {
                        console.log('    ✅ Success - Data received');
                        if (parsed.data) {
                            console.log(`    📊 Data keys: ${Object.keys(parsed.data).join(', ')}`);
                        }
                    } else if (res.statusCode === 401) {
                        console.log('    🔒 Authentication required (expected without token)');
                        console.log(`    📝 Error: ${parsed.error || parsed.message}`);
                    } else {
                        console.log(`    ⚠️ Unexpected status: ${res.statusCode}`);
                        console.log(`    📝 Response: ${JSON.stringify(parsed, null, 2)}`);
                    }
                } catch (e) {
                    console.log('    📄 Raw response:', data.substring(0, 200));
                }
                
                resolve();
            });
        });
        
        req.on('error', (e) => {
            if (e.code === 'ECONNREFUSED') {
                console.log('    ❌ Server not running on localhost:3000');
            } else {
                console.log('    ❌ Request error:', e.message);
            }
            resolve(); // Don't reject, continue with other tests
        });
        
        req.end();
    });
}

// Test server status
async function testServerStatus() {
    console.log('🔍 Testing Server Status...\n');
    
    return new Promise((resolve) => {
        const http = require('http');
        
        const req = http.request({
            hostname: 'localhost',
            port: 3000,
            path: '/health',
            method: 'GET'
        }, (res) => {
            console.log(`✅ Server is running on port 3000 (Status: ${res.statusCode})\n`);
            resolve(true);
        });
        
        req.on('error', (e) => {
            if (e.code === 'ECONNREFUSED') {
                console.log('❌ Server is not running on localhost:3000');
                console.log('💡 Please start the server with: npm start\n');
            } else {
                console.log('❌ Server connection error:', e.message);
            }
            resolve(false);
        });
        
        req.end();
    });
}

// Test authentication endpoint
async function testAuthEndpoint() {
    console.log('🔍 Testing Authentication Endpoint...\n');
    
    const token = generateTestToken();
    
    return new Promise((resolve) => {
        const http = require('http');
        
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/auth/verify',
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
        
        const req = http.request(options, (res) => {
            console.log(`Authentication endpoint status: ${res.statusCode}`);
            
            let data = '';
            res.on('data', (chunk) => data += chunk);
            
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    console.log('Auth response:', JSON.stringify(parsed, null, 2));
                } catch (e) {
                    console.log('Auth raw response:', data);
                }
                console.log('');
                resolve();
            });
        });
        
        req.on('error', (e) => {
            console.log('Auth endpoint error:', e.message);
            console.log('');
            resolve();
        });
        
        req.end();
    });
}

// Main test function
async function runTests() {
    console.log('🚀 Starting Analytics API Authentication Tests...\n');
    
    // Test server status first
    const serverRunning = await testServerStatus();
    
    if (!serverRunning) {
        console.log('⚠️ Cannot run tests - server is not running');
        return;
    }
    
    // Test authentication endpoint
    await testAuthEndpoint();
    
    // Test analytics endpoints
    await testAnalyticsEndpoints();
    
    console.log('✅ Analytics API authentication tests completed');
    console.log('\n📋 Summary:');
    console.log('- If endpoints return 401 without token: ✅ Authentication working');
    console.log('- If endpoints return 200 with token: ✅ Authorization working');
    console.log('- If endpoints return 401 with token: ❌ Authentication still broken');
}

// Run tests if called directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = {
    generateTestToken,
    testAnalyticsEndpoints,
    testServerStatus,
    testAuthEndpoint,
    runTests
};
