const knex = require('./server/knex');
const fs = require('fs').promises;
const path = require('path');

async function testSEOImageUpload() {
    try {
        console.log('🧪 Testing SEO image upload and persistence...');
        
        // 1. Check current SEO settings
        console.log('\n1️⃣ Checking current SEO settings...');
        const currentSettings = await knex('seo_settings').first();
        console.log('Current OG image:', currentSettings?.default_og_image);
        
        // 2. Check if uploads directory exists
        console.log('\n2️⃣ Checking uploads directory...');
        const uploadsDir = path.join(__dirname, 'uploads/og-images');
        try {
            await fs.access(uploadsDir);
            console.log('✅ Uploads directory exists:', uploadsDir);
            
            // List files in uploads directory
            const files = await fs.readdir(uploadsDir);
            console.log('📁 Files in uploads directory:', files.length, 'files');
            files.forEach(file => console.log('  -', file));
        } catch (error) {
            console.log('❌ Uploads directory not accessible:', error.message);
        }
        
        // 3. Test updating SEO settings with a new image URL
        console.log('\n3️⃣ Testing SEO settings update...');
        const testImageUrl = '/uploads/og-images/test-og-image-' + Date.now() + '.jpg';
        
        const updateResult = await knex('seo_settings')
            .update({
                default_og_image: testImageUrl,
                updated_at: new Date()
            })
            .returning('*');
            
        console.log('✅ SEO settings updated with test image URL:', testImageUrl);
        
        // 4. Verify the update persisted
        console.log('\n4️⃣ Verifying persistence...');
        const updatedSettings = await knex('seo_settings').first();
        console.log('Updated OG image:', updatedSettings.default_og_image);
        
        if (updatedSettings.default_og_image === testImageUrl) {
            console.log('✅ Image URL persisted correctly in database');
        } else {
            console.log('❌ Image URL did not persist correctly');
        }
        
        // 5. Test the SEO utils function
        console.log('\n5️⃣ Testing SEO utils image URL generation...');
        const seoUtils = require('./server/utils/seo.utils');
        
        const metaTags = seoUtils.generateMetaTags({
            title: 'Test Page',
            description: 'Test description',
            image: testImageUrl,
            url: '/'
        });
        
        console.log('Generated OG image URL:', metaTags.ogImage);
        
        if (metaTags.ogImage.includes('admin.b2b.click')) {
            console.log('✅ SEO utils correctly generates admin domain URLs for uploads');
        } else {
            console.log('❌ SEO utils not generating correct URLs for uploads');
        }
        
        // 6. Restore original settings
        console.log('\n6️⃣ Restoring original settings...');
        await knex('seo_settings')
            .update({
                default_og_image: currentSettings.default_og_image,
                updated_at: new Date()
            });
        console.log('✅ Original settings restored');
        
        console.log('\n🎉 SEO image upload test completed successfully!');
        
    } catch (error) {
        console.error('❌ SEO image upload test failed:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
    } finally {
        await knex.destroy();
    }
}

testSEOImageUpload();
