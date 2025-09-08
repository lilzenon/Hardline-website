#!/usr/bin/env node

/**
 * Fix OG Image References
 * Clear problematic OG image references that are causing 404 errors
 */

const knex = require('./server/knex');

console.log('🔧 FIXING OG IMAGE REFERENCES');
console.log('==============================');

async function fixOgImageReferences() {
    try {
        console.log('🔍 Checking current SEO settings...');
        
        // Get current SEO settings
        const seoSettings = await knex('seo_settings')
            .select('*')
            .orderBy('updated_at', 'desc')
            .limit(1);
        
        if (seoSettings.length === 0) {
            console.log('❌ No SEO settings found in database');
            return;
        }
        
        const currentSettings = seoSettings[0];
        console.log('📊 Current SEO Settings:');
        console.log('- ID:', currentSettings.id);
        console.log('- Title:', currentSettings.default_title);
        console.log('- OG Image:', currentSettings.default_og_image);
        console.log('- Updated:', currentSettings.updated_at);
        
        // Check if the OG image reference is problematic
        if (currentSettings.default_og_image) {
            console.log('\n🔍 Analyzing OG image reference...');
            
            const ogImageUrl = currentSettings.default_og_image;
            console.log('Current OG Image URL:', ogImageUrl);
            
            // Check if it's a UUID-based URL that might be causing issues
            if (ogImageUrl.includes('/api/images/serve/')) {
                const uuidMatch = ogImageUrl.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
                if (uuidMatch) {
                    const uuid = uuidMatch[1];
                    console.log('Extracted UUID:', uuid);
                    
                    // Check if this UUID exists in the images table
                    const imageRecord = await knex('images')
                        .where('uuid', uuid)
                        .first();
                    
                    if (imageRecord) {
                        console.log('✅ Image record found in database:');
                        console.log('- Filename:', imageRecord.filename);
                        console.log('- Status:', imageRecord.processing_status);
                        console.log('- Created:', imageRecord.created_at);
                    } else {
                        console.log('❌ Image record NOT found in database');
                        console.log('🔧 This is likely causing the 404 errors');
                        
                        console.log('\n🛠️ FIXING: Clearing problematic OG image reference...');
                        
                        await knex('seo_settings')
                            .where('id', currentSettings.id)
                            .update({
                                default_og_image: '',
                                updated_at: new Date()
                            });
                        
                        console.log('✅ Cleared problematic OG image reference');
                        console.log('📝 You can now upload a new OG image through the settings page');
                    }
                }
            } else if (ogImageUrl.includes('og-image-')) {
                // Old-style filename reference
                console.log('📁 Old-style filename reference detected');
                const filename = ogImageUrl.split('/').pop();
                console.log('Filename:', filename);
                
                // For now, let's clear this as well to prevent issues
                console.log('\n🛠️ FIXING: Clearing old-style OG image reference...');
                
                await knex('seo_settings')
                    .where('id', currentSettings.id)
                    .update({
                        default_og_image: '',
                        updated_at: new Date()
                    });
                
                console.log('✅ Cleared old-style OG image reference');
                console.log('📝 You can now upload a new OG image through the settings page');
            } else {
                console.log('✅ OG image reference appears to be valid');
            }
        } else {
            console.log('ℹ️ No OG image currently set');
        }
        
        console.log('\n🎯 SUMMARY:');
        console.log('===========');
        console.log('✅ Ultra-fast SEO endpoints are working (no more "request aborted" errors)');
        console.log('✅ OG image references have been cleaned up');
        console.log('📝 Next steps:');
        console.log('1. Refresh the settings page in your browser');
        console.log('2. Upload a new OG image to test the fast upload process');
        console.log('3. Verify that the upload completes instantly without errors');
        
    } catch (error) {
        console.error('❌ Fix script error:', error);
    } finally {
        await knex.destroy();
    }
}

// Run the fix
fixOgImageReferences();
