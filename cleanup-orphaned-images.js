#!/usr/bin/env node

/**
 * Cleanup Orphaned Image Records
 * Remove database records for images that don't exist on disk
 */

const knex = require('./server/knex');
const path = require('path');
const fs = require('fs').promises;

console.log('🧹 CLEANING UP ORPHANED IMAGE RECORDS');
console.log('=====================================');

async function cleanupOrphanedImages() {
    try {
        console.log('🔍 Checking for orphaned image records...');
        
        // Get all image records from database
        const images = await knex('images')
            .select('id', 'uuid', 'filename', 'file_path', 'processing_status')
            .orderBy('created_at', 'desc');
        
        console.log(`📊 Found ${images.length} image records in database`);
        
        const orphanedRecords = [];
        const validRecords = [];
        
        for (const image of images) {
            console.log(`\n🔍 Checking image: ${image.filename} (UUID: ${image.uuid})`);
            
            // Check possible file locations
            const possiblePaths = [
                path.join(__dirname, 'static/uploads/images/originals', image.filename),
                path.join(__dirname, 'static/uploads/images/variants', image.filename.replace(/\.[^.]+$/, '_medium.webp')),
                path.join(__dirname, 'static/uploads/og-images', image.filename),
                path.join(__dirname, 'uploads/event-images', image.filename)
            ];
            
            let fileExists = false;
            let foundPath = null;
            
            for (const filePath of possiblePaths) {
                try {
                    await fs.access(filePath);
                    fileExists = true;
                    foundPath = filePath;
                    console.log(`✅ File found: ${foundPath}`);
                    break;
                } catch (error) {
                    // File doesn't exist at this path
                }
            }
            
            if (fileExists) {
                validRecords.push(image);
                console.log(`✅ Valid record: ${image.filename}`);
            } else {
                orphanedRecords.push(image);
                console.log(`❌ Orphaned record: ${image.filename} (no file found)`);
            }
        }
        
        console.log('\n📊 CLEANUP SUMMARY:');
        console.log(`✅ Valid records: ${validRecords.length}`);
        console.log(`❌ Orphaned records: ${orphanedRecords.length}`);
        
        if (orphanedRecords.length > 0) {
            console.log('\n🗑️ ORPHANED RECORDS TO CLEAN:');
            orphanedRecords.forEach(record => {
                console.log(`- ${record.filename} (UUID: ${record.uuid}, ID: ${record.id})`);
            });
            
            console.log('\n⚠️ Would you like to delete these orphaned records? (This script will show what would be deleted)');
            console.log('To actually delete, uncomment the deletion code below.');
            
            // UNCOMMENT THE FOLLOWING LINES TO ACTUALLY DELETE ORPHANED RECORDS
            /*
            console.log('\n🗑️ Deleting orphaned records...');
            
            for (const record of orphanedRecords) {
                try {
                    await knex('images').where('id', record.id).del();
                    console.log(`✅ Deleted orphaned record: ${record.filename} (ID: ${record.id})`);
                } catch (error) {
                    console.log(`❌ Failed to delete record ${record.id}: ${error.message}`);
                }
            }
            
            console.log(`🎉 Cleanup complete! Deleted ${orphanedRecords.length} orphaned records.`);
            */
            
            console.log('\n📝 To delete these records, edit this script and uncomment the deletion code.');
        } else {
            console.log('\n🎉 No orphaned records found! Database is clean.');
        }
        
        // Also check SEO settings for orphaned OG image references
        console.log('\n🔍 Checking SEO settings for orphaned OG image references...');
        
        const seoSettings = await knex('seo_settings')
            .select('id', 'default_og_image')
            .where('default_og_image', '!=', '')
            .whereNotNull('default_og_image');
        
        console.log(`📊 Found ${seoSettings.length} SEO settings with OG images`);
        
        for (const setting of seoSettings) {
            if (setting.default_og_image) {
                console.log(`🔍 Checking OG image: ${setting.default_og_image}`);
                
                // Check if this is a UUID-based URL
                if (setting.default_og_image.includes('/api/images/serve/')) {
                    const uuidMatch = setting.default_og_image.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
                    if (uuidMatch) {
                        const uuid = uuidMatch[1];
                        const imageRecord = await knex('images').where('uuid', uuid).first();
                        
                        if (!imageRecord) {
                            console.log(`❌ Orphaned OG image reference: ${setting.default_og_image} (UUID not found in database)`);
                        } else {
                            console.log(`✅ Valid OG image reference: ${setting.default_og_image}`);
                        }
                    }
                } else {
                    // Check if old-style filename exists
                    const filename = setting.default_og_image.split('/').pop();
                    const ogImagePath = path.join(__dirname, 'static/uploads/og-images', filename);
                    
                    try {
                        await fs.access(ogImagePath);
                        console.log(`✅ Valid OG image file: ${filename}`);
                    } catch (error) {
                        console.log(`❌ Missing OG image file: ${filename}`);
                    }
                }
            }
        }
        
        console.log('\n🎯 NEXT STEPS:');
        console.log('1. Review the orphaned records listed above');
        console.log('2. If you want to delete them, uncomment the deletion code in this script');
        console.log('3. Run the script again to perform the cleanup');
        console.log('4. Test OG image uploads to ensure they work correctly');
        
    } catch (error) {
        console.error('❌ Cleanup script error:', error);
    } finally {
        await knex.destroy();
    }
}

// Run the cleanup
cleanupOrphanedImages();
