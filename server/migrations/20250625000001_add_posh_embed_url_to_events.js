/**
 * Add posh_embed_url column to events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🎪 Adding posh_embed_url column to events table...');
    
    try {
        // Check if the posh_embed_url column already exists in events table
        const hasPoshEmbedUrl = await knex.schema.hasColumn('events', 'posh_embed_url');
        
        if (!hasPoshEmbedUrl) {
            await knex.schema.alterTable('events', function(table) {
                table.string('posh_embed_url', 2040).nullable();
            });
            
            console.log('✅ Added posh_embed_url column to events table');
            
            // Migrate data from drops table if it exists
            const hasDropsTable = await knex.schema.hasTable('drops');
            if (hasDropsTable) {
                const hasDropsPoshUrl = await knex.schema.hasColumn('drops', 'posh_embed_url');
                if (hasDropsPoshUrl) {
                    console.log('🔄 Migrating posh_embed_url data from drops to events...');
                    
                    // Update events with posh_embed_url from corresponding drops
                    const migratedRows = await knex.raw(`
                        UPDATE events 
                        SET posh_embed_url = drops.posh_embed_url 
                        FROM drops 
                        WHERE events.slug = drops.slug 
                        AND drops.posh_embed_url IS NOT NULL 
                        AND drops.posh_embed_url != ''
                    `);
                    
                    console.log(`✅ Migrated posh_embed_url data for events`);
                }
            }
        } else {
            console.log('ℹ️ posh_embed_url column already exists in events table');
        }
        
        console.log('🎉 Posh embed URL migration completed successfully');
        
    } catch (error) {
        console.error('❌ Error adding posh_embed_url to events table:', error);
        throw error;
    }
};

/**
 * Remove posh_embed_url column from events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('events', function(table) {
        table.dropColumn('posh_embed_url');
    });
};
