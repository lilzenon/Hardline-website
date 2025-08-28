const knex = require('./server/knex');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

async function recoverMissingImages() {
    try {
        console.log('🔄 Starting image recovery process...');
        
        const uploadsDir = path.join(__dirname, 'static/uploads/images');
        
        // Get all PNG files (original uploads)
        const files = await fs.readdir(uploadsDir);
        const originalFiles = files.filter(f => f.endsWith('.png') && !f.includes('_'));
        
        console.log(`📁 Found ${originalFiles.length} original image files:`, originalFiles);
        
        for (const filename of originalFiles) {
            const filePath = path.join(uploadsDir, filename);
            const stats = await fs.stat(filePath);
            
            // Generate file hash
            const fileBuffer = await fs.readFile(filePath);
            const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
            
            // Extract timestamp and generate UUID
            const timestamp = filename.split('-')[0];
            const uuid = crypto.randomUUID();
            
            // Get image dimensions (basic approach)
            let width = null, height = null, format = 'png';
            
            try {
                // Try to get image metadata using Sharp if available
                const sharp = require('sharp');
                const metadata = await sharp(filePath).metadata();
                width = metadata.width;
                height = metadata.height;
                format = metadata.format;
            } catch (e) {
                console.log(`⚠️ Could not get metadata for ${filename}, using defaults`);
                width = 800; // Default width
                height = 600; // Default height
            }
            
            // Create database record
            console.log(`💾 Creating database record for ${filename}...`);
            const imageRecord = await knex('images').insert({
                uuid: uuid,
                original_filename: filename,
                filename: filename,
                file_path: `originals/${filename}`,
                mime_type: 'image/png',
                file_size: stats.size,
                file_hash: fileHash,
                width: width,
                height: height,
                format: format,
                has_transparency: false,
                processing_status: 'completed',
                usage_context: 'event',
                uploaded_by: 1, // Assume admin user
                is_public: true,
                usage_count: 1,
                created_at: new Date(parseInt(timestamp)),
                updated_at: new Date()
            }).returning('*');
            
            const image = imageRecord[0];
            console.log(`✅ Created image record: ${image.uuid} -> ${filename}`);
            
            // Create variant records for existing WebP files
            const variantFiles = files.filter(f => f.startsWith(filename.replace('.png', '')) && f.includes('_') && f.endsWith('.webp'));
            
            for (const variantFile of variantFiles) {
                const variantPath = path.join(uploadsDir, variantFile);
                const variantStats = await fs.stat(variantPath);
                
                // Extract variant name (e.g., "medium", "large", "thumbnail")
                const variantName = variantFile.split('_')[1].replace('.webp', '');
                
                let variantWidth = width, variantHeight = height;
                try {
                    const sharp = require('sharp');
                    const metadata = await sharp(variantPath).metadata();
                    variantWidth = metadata.width;
                    variantHeight = metadata.height;
                } catch (e) {
                    // Use defaults based on variant name
                    if (variantName === 'thumbnail') { variantWidth = 150; variantHeight = 150; }
                    else if (variantName === 'small') { variantWidth = 300; variantHeight = 300; }
                    else if (variantName === 'medium') { variantWidth = 600; variantHeight = 600; }
                    else if (variantName === 'large') { variantWidth = 1200; variantHeight = 1200; }
                }
                
                await knex('image_variants').insert({
                    image_id: image.id,
                    variant_name: variantName,
                    filename: variantFile,
                    file_path: `variants/${variantFile}`,
                    format: 'webp',
                    width: variantWidth,
                    height: variantHeight,
                    file_size: variantStats.size,
                    quality: 85,
                    created_at: new Date()
                });
                
                console.log(`  📐 Created variant: ${variantName} (${variantWidth}x${variantHeight})`);
            }
            
            console.log(`✅ Processed ${filename} with ${variantFiles.length} variants\n`);
        }
        
        // Now we need to map the recovered images to events
        console.log('🔗 Mapping recovered images to events...');
        
        // Get events that have broken image references
        const brokenEvents = await knex('events')
            .where('cover_image', 'like', '/api/images/serve/%')
            .select('id', 'title', 'cover_image', 'created_at');
            
        console.log(`📋 Found ${brokenEvents.length} events with broken image references`);
        
        // Get all recovered images ordered by creation date
        const recoveredImages = await knex('images')
            .select('id', 'uuid', 'filename', 'created_at')
            .orderBy('created_at', 'asc');
            
        console.log(`🖼️ Recovered ${recoveredImages.length} images`);
        
        // Simple mapping: match events to images by creation time proximity
        for (let i = 0; i < Math.min(brokenEvents.length, recoveredImages.length); i++) {
            const event = brokenEvents[i];
            const image = recoveredImages[i];
            
            const newImageUrl = `/api/images/serve/${image.uuid}/medium`;
            
            await knex('events')
                .where('id', event.id)
                .update('cover_image', newImageUrl);
                
            console.log(`🔗 Updated event "${event.title}" -> ${image.uuid}`);
        }
        
        console.log('\n🎉 Image recovery completed successfully!');
        console.log(`✅ Recovered ${recoveredImages.length} images`);
        console.log(`✅ Updated ${Math.min(brokenEvents.length, recoveredImages.length)} events`);
        
    } catch (error) {
        console.error('❌ Recovery failed:', error);
    } finally {
        await knex.destroy();
    }
}

recoverMissingImages();
