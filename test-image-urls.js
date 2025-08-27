const knex = require('./server/knex');

async function testImageUrls() {
    try {
        console.log('🧪 Testing event image URLs...');
        
        // Get recent events to see their image URL patterns
        const recentEvents = await knex('events')
            .select('id', 'title', 'cover_image', 'created_at')
            .orderBy('created_at', 'desc')
            .limit(10);
            
        console.log(`\n📋 Found ${recentEvents.length} recent events:`);
        
        recentEvents.forEach((event, index) => {
            console.log(`\n${index + 1}. Event: "${event.title}"`);
            console.log(`   ID: ${event.id}`);
            console.log(`   Created: ${event.created_at}`);
            console.log(`   Cover Image: ${event.cover_image || 'No image'}`);
            
            if (event.cover_image) {
                // Analyze the URL pattern
                if (event.cover_image.includes('/api/images/serve/')) {
                    console.log(`   📸 Type: NEW IMAGE SYSTEM (UUID-based)`);
                    const uuidMatch = event.cover_image.match(/([a-f0-9-]{36})/);
                    if (uuidMatch) {
                        console.log(`   🔑 UUID: ${uuidMatch[1]}`);
                    }
                } else if (event.cover_image.includes('/images/figma-exact/')) {
                    console.log(`   📸 Type: OLD IMAGE SYSTEM (figma-exact)`);
                } else if (event.cover_image.startsWith('http')) {
                    console.log(`   📸 Type: EXTERNAL URL`);
                } else {
                    console.log(`   📸 Type: UNKNOWN/OTHER`);
                }
            }
        });
        
        // Test the optimization function logic
        console.log('\n🔧 Testing getOptimizedImageUrl logic:');
        
        const testUrls = [
            '/api/images/serve/12345678-1234-1234-1234-123456789abc',
            '/api/images/serve/12345678-1234-1234-1234-123456789abc/medium',
            '/images/figma-exact/test-image.webp',
            'https://example.com/image.jpg',
            '/some/other/path.jpg'
        ];
        
        testUrls.forEach(url => {
            console.log(`\n   Input: ${url}`);
            
            // Simulate the optimization logic
            if (url.includes('/api/images/serve/')) {
                const uuidMatch = url.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
                if (uuidMatch) {
                    const uuid = uuidMatch[1];
                    const optimizedUrl = `https://admin.b2b.click/api/images/serve/${uuid}/medium`;
                    console.log(`   Output: ${optimizedUrl} ✅ NEW SYSTEM`);
                } else {
                    console.log(`   Output: ${url} ❌ NO UUID FOUND`);
                }
            } else if (url.includes('/images/figma-exact/')) {
                const filename = url.split('/').pop();
                const optimizedUrl = `/images/optimized/${filename}`;
                console.log(`   Output: ${optimizedUrl} ✅ OLD SYSTEM`);
            } else if (url.startsWith('http')) {
                const encodedUrl = encodeURIComponent(url);
                const optimizedUrl = `https://admin.b2b.click/images/proxy-optimized?url=${encodedUrl}`;
                console.log(`   Output: ${optimizedUrl} ✅ EXTERNAL`);
            } else {
                console.log(`   Output: ${url} ⚠️ NO OPTIMIZATION`);
            }
        });
        
        // Check if there are any images in the new system
        console.log('\n🖼️ Checking new image system:');
        
        const imageCount = await knex('images').count('id as count').first();
        console.log(`   Total images in new system: ${imageCount.count}`);
        
        if (imageCount.count > 0) {
            const recentImages = await knex('images')
                .select('uuid', 'original_filename', 'processing_status', 'usage_context', 'created_at')
                .orderBy('created_at', 'desc')
                .limit(5);
                
            console.log('\n   Recent images:');
            recentImages.forEach((img, index) => {
                console.log(`   ${index + 1}. ${img.original_filename}`);
                console.log(`      UUID: ${img.uuid}`);
                console.log(`      Status: ${img.processing_status}`);
                console.log(`      Context: ${img.usage_context}`);
                console.log(`      URL: /api/images/serve/${img.uuid}/medium`);
            });
        }
        
        console.log('\n🎉 Image URL test completed!');
        
    } catch (error) {
        console.error('❌ Image URL test failed:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
    } finally {
        await knex.destroy();
    }
}

testImageUrls();
