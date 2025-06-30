/**
 * Migration: Add Buy Button Color Fields
 * Adds separate color fields for the Buy button (distinct from RSVP button)
 */

exports.up = async function(knex) {
    console.log('🎨 Adding buy button color fields to events table...');
    
    try {
        // Check if the columns already exist to avoid errors
        const hasBuyButtonColor = await knex.schema.hasColumn('events', 'buy_button_color');
        const hasBuyButtonTextColor = await knex.schema.hasColumn('events', 'buy_button_text_color');

        if (!hasBuyButtonColor || !hasBuyButtonTextColor) {
            await knex.schema.alterTable('events', function(table) {
                if (!hasBuyButtonColor) {
                    table.string('buy_button_color', 7).defaultTo('#007bff');
                    console.log('✅ Added buy_button_color column');
                }

                if (!hasBuyButtonTextColor) {
                    table.string('buy_button_text_color', 7).defaultTo('#ffffff');
                    console.log('✅ Added buy_button_text_color column');
                }
            });

            console.log('✅ Added buy button color fields to events table');
        } else {
            console.log('ℹ️ Buy button color fields already exist in events table');
        }

        // Set default values for existing events
        if (!hasBuyButtonColor) {
            await knex('events')
                .whereNull('buy_button_color')
                .update({
                    buy_button_color: '#007bff'
                });
            console.log('✅ Set default buy_button_color for existing events');
        }

        if (!hasBuyButtonTextColor) {
            await knex('events')
                .whereNull('buy_button_text_color')
                .update({
                    buy_button_text_color: '#ffffff'
                });
            console.log('✅ Set default buy_button_text_color for existing events');
        }

        console.log('🎉 Buy button color fields migration completed successfully');
    } catch (error) {
        console.error('❌ Error in buy button color fields migration:', error);
        throw error;
    }
};

exports.down = async function(knex) {
    console.log('🔄 Removing buy button color fields from events table...');
    
    try {
        await knex.schema.alterTable('events', function(table) {
            table.dropColumn('buy_button_color');
            table.dropColumn('buy_button_text_color');
        });
        
        console.log('✅ Removed buy button color fields from events table');
    } catch (error) {
        console.error('❌ Error removing buy button color fields:', error);
        throw error;
    }
};
