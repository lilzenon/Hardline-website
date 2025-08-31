#!/usr/bin/env node

/**
 * CRITICAL: Restore Deleted Image Records
 * 
 * This script restores image database records that were incorrectly deleted
 * by the overly aggressive cleanup script in commit 133e189.
 */

const knex = require('../server/knex');
const fs = require('fs').promises;
const path = require('path');
const env = require('../server/env');
const { v4: uuidv4 } = require('uuid');

async function restoreDeletedImages() {
    console.log('🚨 RESTORING DELETED IMAGE RECORDS');
    console.log('==================================\n');

    try {
        // Step 1: Scan for orphaned files (files without database records)
        console.log('📋 Step 1: Scanning for orphaned files...');
        const orphanedFiles = await findOrphanedFiles();

        if (orphanedFiles.length === 0) {
            console.log('✅ No orphaned files found!');
            return;
        }

        console.log(`❌ Found ${orphanedFiles.length} orphaned files that need database records`);

        // Step 2: Restore database records for orphaned files
        console.log('\n📋 Step 2: Restoring database records...');
        await restoreDatabaseRecords(orphanedFiles);

        // Step 3: Regenerate missing variants
        console.log('\n📋 Step 3: Regenerating missing variants...');
        await regenerateMissingVariants();

        console.log('\n🎉 Image restoration completed successfully!');

    } catch (error) {
        console.error('❌ Restoration failed:', error.message);
        process.exit(1);
    }
}

async function findOrphanedFiles() {
    const originalsDir = path.join(env.STATIC_UPLOADS_DIR, 'images', 'originals');
    const orphanedFiles = [];

    try {
        const files = await fs.readdir(originalsDir);
        console.log(`   📁 Found ${files.length} files in originals directory`);

        for (const filename of files) {
            // Check if database record exists for this file
            const existingRecord = await knex('images')
                .where('filename', filename)
                .first();

            if (!existingRecord) {
                console.log(`   ❌ Missing database record for: ${filename}`);
                
                const filePath = path.join(originalsDir, filename);
                const stats = await fs.stat(filePath);
                
                orphanedFiles.push({
                    filename,
                    filePath,
                    size: stats.size,
                    created: stats.birthtime
                });
            }
        }

    } catch (error) {
        console.error('   ❌ Error scanning originals directory:', error.message);
        throw error;
    }

    return orphanedFiles;
}

async function restoreDatabaseRecords(orphanedFiles) {
    let restored = 0;

    for (const file of orphanedFiles) {
        try {
            console.log(`   🔄 Restoring record for: ${file.filename}`);

            // Generate new UUID for the image
            const uuid = uuidv4();
            
            // Determine MIME type from extension
            const ext = path.extname(file.filename).toLowerCase();
            let mimeType = 'image/jpeg';
            if (ext === '.png') mimeType = 'image/png';
            if (ext === '.webp') mimeType = 'image/webp';
            if (ext === '.gif') mimeType = 'image/gif';

            // Create database record
            await knex('images').insert({
                uuid,
                filename: file.filename,
                original_filename: file.filename,
                file_path: `/static/uploads/images/originals/${file.filename}`,
                mime_type: mimeType,
                file_size: file.size,
                width: null, // Will be updated when variants are generated
                height: null,
                file_hash: null, // Will be calculated if needed
                processing_status: 'completed',
                uploaded_by: 1, // Default admin user
                usage_context: 'event_cover',
                format: ext.substring(1),
                has_transparency: ext === '.png',
                usage_count: 1,
                is_deleted: false,
                created_at: file.created,
                updated_at: new Date()
            });

            console.log(`   ✅ Restored database record: ${file.filename} -> ${uuid}`);
            restored++;

        } catch (error) {
            console.error(`   ❌ Failed to restore ${file.filename}:`, error.message);
        }
    }

    console.log(`   📊 Restoration summary: ${restored} records restored`);
}

async function regenerateMissingVariants() {
    // Get all images that need variant regeneration
    const images = await knex('images')
        .where('processing_status', 'completed')
        .where('is_deleted', false);

    console.log(`   🔍 Checking ${images.length} images for missing variants...`);

    let regenerated = 0;

    for (const image of images) {
        try {
            const variantsDir = path.join(env.STATIC_UPLOADS_DIR, 'images', 'variants');
            const baseFilename = path.parse(image.filename).name;
            
            // Check if variants exist
            const variantFiles = await fs.readdir(variantsDir).catch(() => []);
            const hasVariants = variantFiles.some(file => file.startsWith(baseFilename));

            if (!hasVariants) {
                console.log(`   🔄 Regenerating variants for: ${image.filename}`);
                
                // Use image processing service to regenerate variants
                const imageProcessingService = require('../server/services/image-processing.service');
                await imageProcessingService.regenerateVariants(image.uuid);
                
                console.log(`   ✅ Regenerated variants for: ${image.filename}`);
                regenerated++;
            }

        } catch (error) {
            console.log(`   ⚠️  Could not regenerate variants for ${image.filename}:`, error.message);
        }
    }

    console.log(`   📊 Variant regeneration: ${regenerated} images processed`);
}

if (require.main === module) {
    restoreDeletedImages()
        .then(() => {
            console.log('\n🎉 Image restoration completed successfully!');
            console.log('🔄 Please test image uploads and display now.');
            process.exit(0);
        })
        .catch(error => {
            console.error('\n❌ Restoration failed:', error);
            process.exit(1);
        });
}

module.exports = { restoreDeletedImages };
