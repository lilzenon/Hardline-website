/**
 * Add enhanced ticket purchasing configuration fields to events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🎫 Adding enhanced ticket purchasing fields to events table...');
    
    try {
        // Check if the new columns already exist to avoid errors
        const hasPoshEmbedEnabled = await knex.schema.hasColumn('events', 'posh_embed_enabled');
        const hasExternalTicketUrl = await knex.schema.hasColumn('events', 'external_ticket_url');
        const hasBuyButtonText = await knex.schema.hasColumn('events', 'buy_button_text');
        
        if (!hasPoshEmbedEnabled || !hasExternalTicketUrl || !hasBuyButtonText) {
            await knex.schema.alterTable('events', function(table) {
                if (!hasPoshEmbedEnabled) {
                    table.boolean('posh_embed_enabled').defaultTo(true);
                    console.log('✅ Added posh_embed_enabled column (default: true)');
                }
                
                if (!hasExternalTicketUrl) {
                    table.text('external_ticket_url').nullable();
                    console.log('✅ Added external_ticket_url column');
                }
                
                if (!hasBuyButtonText) {
                    table.string('buy_button_text', 30).defaultTo('Buy Tickets');
                    console.log('✅ Added buy_button_text column (default: "Buy Tickets")');
                }
            });
            
            console.log('🎉 Enhanced ticket purchasing fields added to events table successfully');
        } else {
            console.log('ℹ️ Enhanced ticket purchasing fields already exist in events table');
        }
        
    } catch (error) {
        console.error('❌ Error adding enhanced ticket purchasing fields to events table:', error);
        throw error;
    }
};

/**
 * Remove enhanced ticket purchasing fields from events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Removing enhanced ticket purchasing fields from events table...');
    
    try {
        await knex.schema.alterTable('events', function(table) {
            table.dropColumn('posh_embed_enabled');
            table.dropColumn('external_ticket_url');
            table.dropColumn('buy_button_text');
        });
        
        console.log('✅ Enhanced ticket purchasing fields removed from events table');
        
    } catch (error) {
        console.error('❌ Error removing enhanced ticket purchasing fields from events table:', error);
        throw error;
    }
};
