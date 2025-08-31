#!/usr/bin/env node

/**
 * Find Missing Image Files
 * 
 * This script checks for missing image files and attempts to locate them
 * in various directories on the server.
 */

const knex = require('../server/knex');
const fs = require('fs').promises;
const path = require('path');
const env = require('../server/env');

async function findMissingImageFiles() {
    console.log('🔍 FINDING MISSING IMAGE FILES');
    console.log('==============================\n');

    try {
        // Get all active images from database
        const images = await knex('images')
            .where('is_deleted', false)
            .select('id', 'uuid', 'filename', 'file_path', 'created_at');

        console.log(`📊 Found ${images.length} active images in database`);

        // Check each image file
        const missingFiles = [];
        const foundFiles = [];

        for (const image of images) {
            const expectedPath = path.join(env.STATIC_UPLOADS_DIR, 'images', 'originals', image.filename);
            
            try {
                await fs.access(expectedPath);
                foundFiles.push(image);
                console.log(`✅ Found: ${image.filename}`);
            } catch (error) {
                missingFiles.push(image);
                console.log(`❌ Missing: ${image.filename} (expected at: ${expectedPath})`);
            }
        }

        console.log(`\n📊 SUMMARY:`);
        console.log(`   ✅ Found files: ${foundFiles.length}`);
        console.log(`   ❌ Missing files: ${missingFiles.length}`);

        if (missingFiles.length > 0) {
            console.log(`\n🔍 SEARCHING FOR MISSING FILES IN OTHER LOCATIONS...`);
            
            // Search in common directories
            const searchDirs = [
                env.UPLOADS_DIR,
                path.join(env.UPLOADS_DIR, 'event-images'),
                path.join(process.cwd(), 'static', 'uploads'),
                path.join(process.cwd(), 'static', 'images'),
                path.join(process.cwd(), 'uploads'),
                path.join(process.cwd(), 'custom', 'images'),
                '/tmp/uploads',
                '/data/uploads',
                '/data/static/uploads'
            ];

            for (const missingFile of missingFiles) {
                console.log(`\n🔍 Searching for: ${missingFile.filename}`);
                
                for (const searchDir of searchDirs) {
                    try {
                        const searchPath = path.join(searchDir, missingFile.filename);
                        await fs.access(searchPath);
                        console.log(`   ✅ FOUND in: ${searchPath}`);
                        
                        // Copy to correct location
                        const correctPath = path.join(env.STATIC_UPLOADS_DIR, 'images', 'originals', missingFile.filename);
                        await fs.mkdir(path.dirname(correctPath), { recursive: true });
                        await fs.copyFile(searchPath, correctPath);
                        console.log(`   🔄 COPIED to: ${correctPath}`);
                        break;
                    } catch (error) {
                        // File not found in this directory, continue searching
                    }
                }
            }
        }

        // Final verification
        console.log(`\n🔍 FINAL VERIFICATION...`);
        let restoredCount = 0;
        
        for (const image of missingFiles) {
            const expectedPath = path.join(env.STATIC_UPLOADS_DIR, 'images', 'originals', image.filename);
            
            try {
                await fs.access(expectedPath);
                console.log(`✅ RESTORED: ${image.filename}`);
                restoredCount++;
            } catch (error) {
                console.log(`❌ STILL MISSING: ${image.filename}`);
            }
        }

        console.log(`\n🎉 RESTORATION COMPLETE!`);
        console.log(`   📊 Files restored: ${restoredCount}/${missingFiles.length}`);
        
        if (restoredCount > 0) {
            console.log(`\n✅ SUCCESS! ${restoredCount} image files have been restored.`);
            console.log(`🔄 Please test image display now - they should work on both desktop and mobile.`);
        } else if (missingFiles.length > 0) {
            console.log(`\n⚠️  No files could be automatically restored.`);
            console.log(`📋 NEXT STEPS:`);
            console.log(`   1. Re-upload the missing images through the dashboard`);
            console.log(`   2. Or manually copy files to: ${path.join(env.STATIC_UPLOADS_DIR, 'images', 'originals')}`);
        }

    } catch (error) {
        console.error('❌ Error finding missing files:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    findMissingImageFiles()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('❌ Script failed:', error);
            process.exit(1);
        });
}

module.exports = { findMissingImageFiles };
