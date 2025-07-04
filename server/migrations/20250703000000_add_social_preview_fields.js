/**
 * Add comprehensive social media and iMessage preview fields to events table
 * Supports Facebook Open Graph, Twitter Cards, and iOS Messages rich previews
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('📱 Adding social media and iMessage preview fields to events table...');
    
    try {
        // Check if social preview fields already exist
        const hasOgTitle = await knex.schema.hasColumn('events', 'og_title');
        const hasOgDescription = await knex.schema.hasColumn('events', 'og_description');
        const hasOgImage = await knex.schema.hasColumn('events', 'og_image');
        const hasTwitterTitle = await knex.schema.hasColumn('events', 'twitter_title');
        const hasTwitterDescription = await knex.schema.hasColumn('events', 'twitter_description');
        const hasTwitterImage = await knex.schema.hasColumn('events', 'twitter_image');
        const hasIosTitle = await knex.schema.hasColumn('events', 'ios_title');
        const hasIosDescription = await knex.schema.hasColumn('events', 'ios_description');
        const hasIosImage = await knex.schema.hasColumn('events', 'ios_image');
        const hasSocialPreviewEnabled = await knex.schema.hasColumn('events', 'social_preview_enabled');
        
        if (!hasOgTitle || !hasOgDescription || !hasOgImage || !hasTwitterTitle || 
            !hasTwitterDescription || !hasTwitterImage || !hasIosTitle || 
            !hasIosDescription || !hasIosImage || !hasSocialPreviewEnabled) {
            
            await knex.schema.alterTable('events', function(table) {
                // Open Graph (Facebook, LinkedIn, WhatsApp) fields
                if (!hasOgTitle) {
                    table.string('og_title', 90).nullable().comment('Custom Open Graph title (max 90 chars, optimal 30-60)');
                    console.log('✅ Added og_title column');
                }
                
                if (!hasOgDescription) {
                    table.text('og_description').nullable().comment('Custom Open Graph description (max 300 chars, optimal 55-200)');
                    console.log('✅ Added og_description column');
                }
                
                if (!hasOgImage) {
                    table.string('og_image', 2040).nullable().comment('Custom Open Graph image URL (optimal 1200x630px)');
                    console.log('✅ Added og_image column');
                }
                
                // Twitter Card specific fields
                if (!hasTwitterTitle) {
                    table.string('twitter_title', 70).nullable().comment('Custom Twitter title (max 70 chars, optimal 30-60)');
                    console.log('✅ Added twitter_title column');
                }
                
                if (!hasTwitterDescription) {
                    table.text('twitter_description').nullable().comment('Custom Twitter description (max 200 chars, optimal 55-200)');
                    console.log('✅ Added twitter_description column');
                }
                
                if (!hasTwitterImage) {
                    table.string('twitter_image', 2040).nullable().comment('Custom Twitter image URL (optimal 1200x675px)');
                    console.log('✅ Added twitter_image column');
                }
                
                // iOS Messages / iMessage specific fields
                if (!hasIosTitle) {
                    table.string('ios_title', 90).nullable().comment('Custom iOS Messages title for rich previews');
                    console.log('✅ Added ios_title column');
                }
                
                if (!hasIosDescription) {
                    table.text('ios_description').nullable().comment('Custom iOS Messages description for rich previews');
                    console.log('✅ Added ios_description column');
                }
                
                if (!hasIosImage) {
                    table.string('ios_image', 2040).nullable().comment('Custom iOS Messages image URL (min 900px width)');
                    console.log('✅ Added ios_image column');
                }
                
                // Control field for enabling custom social previews
                if (!hasSocialPreviewEnabled) {
                    table.boolean('social_preview_enabled').defaultTo(false).comment('Enable custom social media previews');
                    console.log('✅ Added social_preview_enabled column');
                }
            });
            
            // Add indexes for performance on social preview queries
            await knex.schema.alterTable('events', function(table) {
                table.index(['social_preview_enabled'], 'events_social_preview_enabled_index');
            });
            console.log('✅ Added index for social preview queries');
            
            console.log('🎉 Social media and iMessage preview fields added to events table successfully');
        } else {
            console.log('ℹ️ Social preview fields already exist in events table');
        }
        
    } catch (error) {
        console.error('❌ Error adding social preview fields to events table:', error);
        throw error;
    }
};

/**
 * Remove social media and iMessage preview fields from events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Removing social media and iMessage preview fields from events table...');
    
    try {
        await knex.schema.alterTable('events', function(table) {
            // Drop index first
            table.dropIndex(['social_preview_enabled'], 'events_social_preview_enabled_index');
            
            // Drop Open Graph columns
            table.dropColumn('og_title');
            table.dropColumn('og_description');
            table.dropColumn('og_image');
            
            // Drop Twitter Card columns
            table.dropColumn('twitter_title');
            table.dropColumn('twitter_description');
            table.dropColumn('twitter_image');
            
            // Drop iOS Messages columns
            table.dropColumn('ios_title');
            table.dropColumn('ios_description');
            table.dropColumn('ios_image');
            
            // Drop control column
            table.dropColumn('social_preview_enabled');
        });
        
        console.log('✅ Social media and iMessage preview fields removed from events table');
        
    } catch (error) {
        console.error('❌ Error removing social preview fields from events table:', error);
        throw error;
    }
};
