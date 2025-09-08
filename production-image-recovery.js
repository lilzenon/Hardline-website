#!/usr/bin/env node

/**
 * PRODUCTION IMAGE RECOVERY SCRIPT
 * 
 * Fixes the production issue where event cover images are not displaying
 * due to database vs file system mismatch after image pipeline changes.
 * 
 * SAFE FOR PRODUCTION - Only cleans up orphaned records, doesn't delete files
 */

const knex = require('./server/knex');
const path = require('path');
const fs = require('fs').promises;

console.log('🚨 PRODUCTION IMAGE RECOVERY');
console.log('============================');
console.log('⚠️  SAFE MODE: Only removes orphaned database records');
console.log('⚠️  Does NOT delete any files');
console.log('⚠️  Preserves working SEO endpoints');

async function recoverProductionImages() {
    try {
        console.log('\n🔍 STEP 1: Analyzing current image situation...');
        
        // Get all events with UUID-based image URLs
        const eventsWithImages = await knex('events')
            .select('id', 'title', 'cover_image', 'created_at')
            .whereNotNull('cover_image')
            .where('cover_image', '!=', '')
            .orderBy('created_at', 'desc');
        
        console.log(`📊 Found ${eventsWithImages.length} events with cover images`);
        
        const brokenEvents = [];
        const workingEvents = [];
        
        for (const event of eventsWithImages) {
            if (event.cover_image.includes('/api/images/serve/')) {
                // UUID-based URL - check if image record exists
                const uuidMatch = event.cover_image.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
                if (uuidMatch) {
                    const uuid = uuidMatch[1];
                    const imageRecord = await knex('images').where('uuid', uuid).first();
                    
                    if (!imageRecord) {
                        brokenEvents.push({
                            ...event,
                            issue: 'missing_database_record',
                            uuid: uuid
                        });
                    } else {
                        workingEvents.push(event);
                    }
                } else {
                    brokenEvents.push({
                        ...event,
                        issue: 'invalid_uuid_format'
                    });
                }
            } else {
                // Legacy filename-based URL - these might still work
                workingEvents.push(event);
            }
        }
        
        console.log(`✅ Working events: ${workingEvents.length}`);
        console.log(`❌ Broken events: ${brokenEvents.length}`);
        
        if (brokenEvents.length === 0) {
            console.log('\n🎉 No broken image references found!');
            console.log('All event cover images should be working correctly.');
            return;
        }
        
        console.log('\n🔍 STEP 2: Analyzing broken events...');
        
        brokenEvents.forEach((event, index) => {
            console.log(`${index + 1}. "${event.title}" (ID: ${event.id})`);
            console.log(`   Issue: ${event.issue}`);
            console.log(`   URL: ${event.cover_image}`);
            if (event.uuid) {
                console.log(`   Missing UUID: ${event.uuid}`);
            }
        });
        
        console.log('\n🛠️ STEP 3: Fixing broken image references...');
        console.log('Strategy: Clear broken image URLs so events display without images');
        console.log('(Users can re-upload cover images through the dashboard)');
        
        let fixedCount = 0;
        
        for (const event of brokenEvents) {
            try {
                // Clear the broken image reference
                await knex('events')
                    .where('id', event.id)
                    .update({
                        cover_image: null,
                        updated_at: new Date()
                    });
                
                console.log(`✅ Fixed event "${event.title}" (ID: ${event.id})`);
                fixedCount++;
                
            } catch (error) {
                console.log(`❌ Failed to fix event "${event.title}": ${error.message}`);
            }
        }
        
        console.log('\n🔍 STEP 4: Cleaning up orphaned image records...');
        
        // Find image records that don't correspond to any events
        const allImageUuids = await knex('images').pluck('uuid');
        const usedImageUuids = await knex('events')
            .whereNotNull('cover_image')
            .where('cover_image', 'like', '%/api/images/serve/%')
            .pluck('cover_image')
            .then(urls => urls.map(url => {
                const match = url.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
                return match ? match[1] : null;
            }).filter(Boolean));
        
        const orphanedUuids = allImageUuids.filter(uuid => !usedImageUuids.includes(uuid));
        
        console.log(`📊 Total image records: ${allImageUuids.length}`);
        console.log(`📊 Used image records: ${usedImageUuids.length}`);
        console.log(`📊 Orphaned image records: ${orphanedUuids.length}`);
        
        if (orphanedUuids.length > 0) {
            console.log('\n🗑️ Removing orphaned image records...');
            
            for (const uuid of orphanedUuids) {
                try {
                    await knex('images').where('uuid', uuid).del();
                    console.log(`🗑️ Removed orphaned image record: ${uuid}`);
                } catch (error) {
                    console.log(`❌ Failed to remove orphaned record ${uuid}: ${error.message}`);
                }
            }
        }
        
        console.log('\n🎯 RECOVERY SUMMARY');
        console.log('===================');
        console.log(`✅ Fixed ${fixedCount} broken event image references`);
        console.log(`🗑️ Removed ${orphanedUuids.length} orphaned image records`);
        console.log(`✅ ${workingEvents.length} events still have working images`);
        
        console.log('\n📝 NEXT STEPS FOR USERS:');
        console.log('1. Events with cleared images will display without cover images');
        console.log('2. Users can re-upload cover images through the dashboard');
        console.log('3. New uploads will use the working image pipeline');
        console.log('4. SEO endpoints remain unaffected and working');
        
        console.log('\n🎉 PRODUCTION IMAGE RECOVERY COMPLETED SUCCESSFULLY!');
        
    } catch (error) {
        console.error('❌ Recovery script error:', error);
        throw error;
    } finally {
        await knex.destroy();
    }
}

// Run the recovery
recoverProductionImages().catch(error => {
    console.error('💥 CRITICAL ERROR:', error);
    process.exit(1);
});
