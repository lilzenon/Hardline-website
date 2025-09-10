#!/usr/bin/env node

/**
 * 🔄 REGENERATE MISSING VARIANTS
 * 
 * Regenerates missing image variants for all images that have original files
 * but are missing variant files. This is used after migrating files from
 * legacy storage locations to persistent storage.
 */

require('dotenv').config();

const path = require('path');
const fs = require('fs').promises;

async function regenerateVariants() {
    console.log('🔄 Starting variant regeneration...');
    
    try {
        // Import the image processing service
        const ImageProcessingService = require('../services/image-processing.service');
        const imageProcessor = new ImageProcessingService();
        
        // Get database connection
        const knex = require('../knex');
        
        // Find all images that have original files but missing variants
        const images = await knex('images')
            .select('*')
            .orderBy('created_at', 'desc')
            .limit(50); // Process 50 most recent images
        
        console.log(`📊 Found ${images.length} images to check`);
        
        let processed = 0;
        let regenerated = 0;
        let skipped = 0;
        
        for (const image of images) {
            try {
                console.log(`\n🔍 Checking image: ${image.uuid} (${image.filename})`);
                
                // Check if original file exists - use absolute path
                const originalPath = path.join(imageProcessor.uploadDir, 'originals', image.filename);
                console.log(`🔍 Checking path: ${originalPath}`);
                
                try {
                    await fs.access(originalPath);
                    console.log(`✅ Original file exists: ${originalPath}`);
                } catch (error) {
                    console.log(`❌ Original file missing: ${originalPath}`);
                    skipped++;
                    continue;
                }
                
                // Check if variants exist
                const variants = await knex('image_variants')
                    .where('image_id', image.id)
                    .select('*');
                
                if (variants.length === 0) {
                    console.log(`🔄 No variants found, regenerating...`);
                    
                    // Regenerate variants
                    await imageProcessor.generateVariants(originalPath, image.id, image.filename);
                    
                    console.log(`✅ Variants regenerated for ${image.filename}`);
                    regenerated++;
                } else {
                    console.log(`✅ Variants already exist (${variants.length} variants)`);
                    skipped++;
                }
                
                processed++;
                
            } catch (error) {
                console.error(`❌ Error processing image ${image.uuid}:`, error.message);
                skipped++;
            }
        }
        
        console.log('\n📊 REGENERATION SUMMARY:');
        console.log(`   Total processed: ${processed}`);
        console.log(`   Variants regenerated: ${regenerated}`);
        console.log(`   Skipped: ${skipped}`);
        
        if (regenerated > 0) {
            console.log('\n✅ Variant regeneration completed successfully!');
        } else {
            console.log('\n🎉 No variants needed regeneration!');
        }
        
    } catch (error) {
        console.error('❌ Error during variant regeneration:', error);
        process.exit(1);
    }
    
    process.exit(0);
}

// Run the regeneration
regenerateVariants();
