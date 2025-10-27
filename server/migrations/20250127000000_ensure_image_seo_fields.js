/**
 * Migration: Ensure Image SEO Fields Exist
 * 
 * Purpose: Verify that the images table has proper SEO/accessibility fields
 * for Google Image SEO best practices.
 * 
 * Fields:
 * - alt_text: Descriptive text for accessibility and SEO (max 500 chars)
 * - title: Image title for additional context (max 255 chars)
 * - description: Longer description for detailed context
 * 
 * Note: These fields should already exist from images.model.js, but this
 * migration ensures backward compatibility and adds them if missing.
 */

exports.up = async function(knex) {
    console.log('🔍 Checking if image SEO fields exist...');
    
    try {
        // Check if alt_text column exists
        const hasAltText = await knex.schema.hasColumn('images', 'alt_text');
        const hasTitle = await knex.schema.hasColumn('images', 'title');
        const hasDescription = await knex.schema.hasColumn('images', 'description');
        
        if (!hasAltText || !hasTitle || !hasDescription) {
            await knex.schema.table('images', table => {
                if (!hasAltText) {
                    console.log('➕ Adding alt_text column to images table');
                    table.string('alt_text', 500).nullable();
                }
                if (!hasTitle) {
                    console.log('➕ Adding title column to images table');
                    table.string('title', 255).nullable();
                }
                if (!hasDescription) {
                    console.log('➕ Adding description column to images table');
                    table.text('description').nullable();
                }
            });
            
            console.log('✅ Image SEO fields added successfully');
        } else {
            console.log('✅ Image SEO fields already exist');
        }
        
        // Populate alt_text for existing event cover images that don't have it
        console.log('🔄 Populating alt_text for existing event cover images...');
        
        const eventsWithImages = await knex('events')
            .select('events.id', 'events.title', 'events.cover_image_uuid')
            .whereNotNull('events.cover_image_uuid')
            .leftJoin('images', 'events.cover_image_uuid', 'images.uuid')
            .whereNull('images.alt_text');
        
        if (eventsWithImages.length > 0) {
            console.log(`📝 Found ${eventsWithImages.length} events with images missing alt text`);
            
            for (const event of eventsWithImages) {
                const defaultAltText = `${event.title} event cover image`;
                await knex('images')
                    .where('uuid', event.cover_image_uuid)
                    .update({
                        alt_text: defaultAltText,
                        title: event.title,
                        updated_at: knex.fn.now()
                    });
            }
            
            console.log(`✅ Updated alt text for ${eventsWithImages.length} event images`);
        } else {
            console.log('✅ All event images already have alt text');
        }
        
    } catch (error) {
        console.error('❌ Error in migration:', error);
        throw error;
    }
};

exports.down = async function(knex) {
    console.log('⚠️  Rollback: This migration does not remove SEO fields to preserve data integrity');
    console.log('⚠️  If you need to remove these fields, do so manually');
    // We don't remove the columns on rollback to preserve data
};

