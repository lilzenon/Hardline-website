#!/usr/bin/env node

/**
 * Image Persistence Audit Script
 * Diagnoses image serving issues and file system inconsistencies
 */

const knex = require('../knex');
const fs = require('fs').promises;
const path = require('path');
const env = require('../env');

async function auditImagePersistence() {
    console.log('🔍 Starting Image Persistence Audit...\n');
    
    try {
        // Get recent images with variants
        const images = await knex('images')
            .select('id', 'uuid', 'filename', 'file_path', 'processing_status')
            .where('is_deleted', false)
            .orderBy('created_at', 'desc')
            .limit(5);

        console.log(`📊 Found ${images.length} recent images to audit\n`);

        for (const image of images) {
            console.log(`\n🖼️  AUDITING IMAGE: ${image.filename}`);
            console.log(`   UUID: ${image.uuid}`);
            console.log(`   Status: ${image.processing_status}`);
            console.log(`   Original Path: ${image.file_path}`);

            // Check original file
            const originalPath = path.join(env.STATIC_UPLOADS_DIR, 'images', image.file_path);
            console.log(`   Full Original Path: ${originalPath}`);
            
            try {
                await fs.access(originalPath);
                console.log(`   ✅ Original file exists`);
            } catch (error) {
                console.log(`   ❌ Original file MISSING: ${error.message}`);
            }

            // Get variants for this image
            const variants = await knex('image_variants')
                .select('variant_name', 'filename', 'file_path', 'format')
                .where('image_id', image.id)
                .orderBy('variant_name');

            console.log(`   📁 Variants (${variants.length}):`);

            for (const variant of variants) {
                const variantPath = path.join(env.STATIC_UPLOADS_DIR, 'images', variant.file_path);
                console.log(`      ${variant.variant_name}: ${variant.file_path}`);
                console.log(`      Full Path: ${variantPath}`);
                
                try {
                    await fs.access(variantPath);
                    const stats = await fs.stat(variantPath);
                    console.log(`      ✅ EXISTS (${Math.round(stats.size / 1024)}KB)`);
                } catch (error) {
                    console.log(`      ❌ MISSING: ${error.message}`);
                }
            }

            // Test HTTP endpoints
            console.log(`   🌐 Testing HTTP endpoints:`);
            const testVariants = ['medium', 'event_card', 'small', 'thumbnail'];
            
            for (const variantName of testVariants) {
                const url = `https://admin.b2b.click/api/images/serve/${image.uuid}/${variantName}`;
                console.log(`      Testing: ${variantName} -> ${url}`);
                
                // Skip HTTP tests for now - focus on file system audit
                console.log(`      Skipping HTTP test: ${url}`);
            }
        }

        // Check directory structure
        console.log(`\n📁 DIRECTORY STRUCTURE AUDIT:`);
        const baseDir = path.join(env.STATIC_UPLOADS_DIR, 'images');
        console.log(`   Base: ${baseDir}`);
        
        try {
            const subdirs = await fs.readdir(baseDir);
            console.log(`   Subdirectories: ${subdirs.join(', ')}`);
            
            for (const subdir of subdirs) {
                const subdirPath = path.join(baseDir, subdir);
                try {
                    const files = await fs.readdir(subdirPath);
                    console.log(`   ${subdir}/: ${files.length} files`);
                    
                    if (files.length > 0) {
                        console.log(`      Sample: ${files.slice(0, 3).join(', ')}${files.length > 3 ? '...' : ''}`);
                    }
                } catch (error) {
                    console.log(`   ${subdir}/: Error reading - ${error.message}`);
                }
            }
        } catch (error) {
            console.log(`   ❌ Cannot read base directory: ${error.message}`);
        }

        // Environment check
        console.log(`\n⚙️  ENVIRONMENT CHECK:`);
        console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
        console.log(`   STATIC_UPLOADS_DIR: ${env.STATIC_UPLOADS_DIR}`);
        console.log(`   Process CWD: ${process.cwd()}`);

    } catch (error) {
        console.error('❌ Audit failed:', error);
    } finally {
        await knex.destroy();
    }
}

// Run the audit
auditImagePersistence().catch(console.error);
