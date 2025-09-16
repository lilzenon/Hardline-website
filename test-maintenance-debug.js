#!/usr/bin/env node

/**
 * Debug Maintenance Mode Content
 * Check what's actually being served
 */

const http = require('http');

async function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const req = http.request(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                resolve({
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: data
                });
            });
        });
        
        req.on('error', reject);
        req.end();
    });
}

async function debugMaintenanceContent() {
    try {
        console.log('🔍 Debugging Maintenance Mode Content');
        console.log('====================================');
        
        // Test maintenance page
        console.log('\n1. Testing /maintenance page content:');
        const maintenanceResponse = await makeRequest('http://localhost:3001/maintenance');
        console.log(`Status: ${maintenanceResponse.statusCode}`);
        
        // Check for specific content
        const body = maintenanceResponse.body;
        
        console.log('\n2. Content Analysis:');
        console.log(`- Contains "404": ${body.includes('404')}`);
        console.log(`- Contains "Not Found": ${body.includes('Not Found')}`);
        console.log(`- Contains "Under Maintenance": ${body.includes('Under Maintenance')}`);
        console.log(`- Contains "MaintenancePage": ${body.includes('MaintenancePage')}`);
        console.log(`- Contains "laylo": ${body.includes('laylo')}`);
        console.log(`- Contains "iframe": ${body.includes('iframe')}`);
        console.log(`- Contains "SEOContext": ${body.includes('SEOContext')}`);
        
        // Check for React components
        console.log('\n3. React Component Check:');
        if (body.includes('MaintenancePage')) {
            console.log('✅ MaintenancePage component is being loaded');
        } else {
            console.log('❌ MaintenancePage component NOT found');
        }
        
        if (body.includes('laylo-drop-c9ee71a5')) {
            console.log('✅ Laylo iframe is present');
        } else {
            console.log('❌ Laylo iframe NOT found');
        }
        
        // Check for maintenance mode overlay
        if (body.includes('MaintenanceMode')) {
            console.log('⚠️ SEOContext MaintenanceMode overlay detected');
        }
        
        console.log('\n4. HTML Structure:');
        // Extract title
        const titleMatch = body.match(/<title[^>]*>([^<]*)<\/title>/i);
        if (titleMatch) {
            console.log(`Page Title: "${titleMatch[1]}"`);
        }
        
        // Look for maintenance-related content
        const maintenanceMatches = body.match(/maintenance|404|not found/gi);
        if (maintenanceMatches) {
            console.log(`Maintenance-related text found: ${maintenanceMatches.length} instances`);
            console.log(`Examples: ${maintenanceMatches.slice(0, 5).join(', ')}`);
        }
        
    } catch (error) {
        console.error('❌ Debug failed:', error);
    }
}

// Run the debug
debugMaintenanceContent();
