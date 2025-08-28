#!/usr/bin/env node

/**
 * Test script to verify the SEO API endpoint is working correctly
 * This will help diagnose why the API is returning 25MB+ instead of JSON
 */

const https = require('https');
const http = require('http');

async function testSEOAPI() {
    console.log('🧪 Testing SEO API endpoint...\n');
    
    const testUrls = [
        'https://admin.b2b.click/api/settings/seo',
        'https://admin.b2b.click/api/test/hello',
        'https://admin.b2b.click/api/debug-test/working'
    ];
    
    for (const url of testUrls) {
        console.log(`\n🔍 Testing: ${url}`);
        
        try {
            const response = await fetchWithTimeout(url, 5000);
            
            console.log(`   Status: ${response.status} ${response.statusText}`);
            console.log(`   Content-Type: ${response.headers['content-type']}`);
            console.log(`   Content-Length: ${response.headers['content-length'] || 'unknown'}`);
            
            // Read first 1KB of response to see what we're getting
            const preview = response.body.slice(0, 1024);
            console.log(`   Preview (first 1KB):`);
            console.log(`   ${preview.toString().substring(0, 200)}...`);
            
            // Check if it's JSON
            if (response.headers['content-type']?.includes('application/json')) {
                try {
                    const data = JSON.parse(response.body);
                    console.log(`   ✅ Valid JSON response`);
                    console.log(`   Keys: ${Object.keys(data).join(', ')}`);
                } catch (e) {
                    console.log(`   ❌ Invalid JSON despite content-type`);
                }
            } else {
                console.log(`   ⚠️ Not JSON response`);
            }
            
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
        }
    }
}

function fetchWithTimeout(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const isHttps = url.startsWith('https:');
        const client = isHttps ? https : http;
        
        const req = client.get(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'SEO-API-Test/1.0'
            }
        }, (res) => {
            let body = Buffer.alloc(0);
            let totalSize = 0;
            const maxSize = 10 * 1024 * 1024; // 10MB limit
            
            res.on('data', (chunk) => {
                totalSize += chunk.length;
                
                if (totalSize > maxSize) {
                    req.destroy();
                    reject(new Error(`Response too large: ${totalSize} bytes`));
                    return;
                }
                
                body = Buffer.concat([body, chunk]);
            });
            
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    headers: res.headers,
                    body: body
                });
            });
            
            res.on('error', reject);
        });
        
        req.on('error', reject);
        
        req.setTimeout(timeout, () => {
            req.destroy();
            reject(new Error(`Request timeout after ${timeout}ms`));
        });
    });
}

// Run the test
if (require.main === module) {
    testSEOAPI().catch(console.error);
}

module.exports = { testSEOAPI };
