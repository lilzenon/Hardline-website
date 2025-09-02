#!/usr/bin/env node

/**
 * Test script to verify image API endpoints are working correctly
 * Run with: node test-image-api.js
 */

const https = require('https');
const http = require('http');

async function testImageAPI() {
    console.log('🔍 Testing Image API Endpoints...\n');
    
    try {
        // Test 1: Check homepage data API
        console.log('📊 Testing homepage data API...');
        const homepageData = await makeRequest('https://admin.b2b.click/api/home_settings/homepage-data');
        
        if (homepageData.featuredEvents && homepageData.featuredEvents.length > 0) {
            console.log(`✅ Found ${homepageData.featuredEvents.length} featured events`);
            
            // Test first event's cover image
            const firstEvent = homepageData.featuredEvents[0];
            if (firstEvent.cover_image) {
                console.log(`🖼️ Testing cover image: ${firstEvent.cover_image}`);
                
                if (firstEvent.cover_image.includes('/api/images/serve/')) {
                    // Extract UUID and test different variants
                    const uuidMatch = firstEvent.cover_image.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
                    if (uuidMatch) {
                        const uuid = uuidMatch[1];
                        console.log(`🆔 Image UUID: ${uuid}`);
                        
                        // Test different variants
                        const variants = ['thumbnail', 'small', 'medium', 'large'];
                        for (const variant of variants) {
                            const imageUrl = `https://admin.b2b.click/api/images/serve/${uuid}/${variant}`;
                            console.log(`🔍 Testing ${variant} variant: ${imageUrl}`);
                            
                            try {
                                const response = await testImageUrl(imageUrl);
                                console.log(`   ✅ ${variant}: ${response.statusCode} - ${response.contentType} (${response.contentLength} bytes)`);
                            } catch (error) {
                                console.log(`   ❌ ${variant}: ${error.message}`);
                            }
                        }
                    }
                } else {
                    console.log(`🔍 Testing legacy image URL: ${firstEvent.cover_image}`);
                    try {
                        const response = await testImageUrl(firstEvent.cover_image);
                        console.log(`   ✅ Legacy image: ${response.statusCode} - ${response.contentType} (${response.contentLength} bytes)`);
                    } catch (error) {
                        console.log(`   ❌ Legacy image: ${error.message}`);
                    }
                }
            } else {
                console.log('⚠️ First event has no cover image');
            }
        } else {
            console.log('⚠️ No featured events found');
        }
        
        // Test 2: Check homepage events
        if (homepageData.homepageEvents && homepageData.homepageEvents.length > 0) {
            console.log(`\n📋 Found ${homepageData.homepageEvents.length} homepage events`);
            
            // Test first homepage event's cover image
            const firstHomepageEvent = homepageData.homepageEvents[0];
            if (firstHomepageEvent.cover_image) {
                console.log(`🖼️ Testing homepage event cover image: ${firstHomepageEvent.cover_image}`);
                
                if (firstHomepageEvent.cover_image.includes('/api/images/serve/')) {
                    const uuidMatch = firstHomepageEvent.cover_image.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
                    if (uuidMatch) {
                        const uuid = uuidMatch[1];
                        const imageUrl = `https://admin.b2b.click/api/images/serve/${uuid}/thumbnail`;
                        
                        try {
                            const response = await testImageUrl(imageUrl);
                            console.log(`   ✅ Homepage event image: ${response.statusCode} - ${response.contentType} (${response.contentLength} bytes)`);
                        } catch (error) {
                            console.log(`   ❌ Homepage event image: ${error.message}`);
                        }
                    }
                }
            }
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https:') ? https : http;
        
        client.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve(parsed);
                } catch (error) {
                    reject(new Error(`Failed to parse JSON: ${error.message}`));
                }
            });
        }).on('error', reject);
    });
}

function testImageUrl(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https:') ? https : http;
        
        client.get(url, (res) => {
            resolve({
                statusCode: res.statusCode,
                contentType: res.headers['content-type'],
                contentLength: res.headers['content-length']
            });
            res.destroy(); // Don't download the full image
        }).on('error', reject);
    });
}

// Run the test
if (require.main === module) {
    testImageAPI().catch(console.error);
}

module.exports = { testImageAPI };
