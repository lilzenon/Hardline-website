#!/usr/bin/env node

/**
 * QUICK FIX: Restore Missing Image Database Records
 * 
 * This script quickly restores the 4 orphaned image files found.
 */

const knex = require('../server/knex');
const { v4: uuidv4 } = require('uuid');

async function quickRestoreImages() {
    console.log('🚨 QUICK IMAGE RESTORATION');
    console.log('=========================\n');

    // The 4 orphaned files we found
    const orphanedFiles = [
        '1756066033363-xkjcnt56yd.png',
        '1756141001935-l0pg0whte6k.png', 
        '1756141631550-idrpdy49c3.png',
        '1756142093559-vh1blkmjs5j.png'
    ];

    let restored = 0;

    for (const filename of orphanedFiles) {
        try {
            console.log(`🔄 Restoring: ${filename}`);

            const uuid = uuidv4();
            const ext = filename.split('.').pop().toLowerCase();
            const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';

            // Insert with minimal required fields only
            await knex('images').insert({
                uuid,
                filename,
                original_filename: filename,
                file_path: `/static/uploads/images/originals/${filename}`,
                mime_type: mimeType,
                file_size: 100000, // Placeholder
                processing_status: 'completed',
                uploaded_by: 1,
                usage_context: 'event_cover',
                usage_count: 1,
                is_deleted: false,
                created_at: new Date(),
                updated_at: new Date()
            });

            console.log(`✅ Restored: ${filename} -> ${uuid}`);
            restored++;

        } catch (error) {
            console.error(`❌ Failed to restore ${filename}:`, error.message);
        }
    }

    console.log(`\n📊 Restored ${restored} out of ${orphanedFiles.length} images`);
    
    if (restored > 0) {
        console.log('\n🎉 SUCCESS! Your images should now be visible.');
        console.log('🔄 Please refresh your dashboard and check image display.');
    }
}

if (require.main === module) {
    quickRestoreImages()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('❌ Quick restore failed:', error);
            process.exit(1);
        });
}

module.exports = { quickRestoreImages };
