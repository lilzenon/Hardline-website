/**
 * Add button_title field to events table for checkout nav component
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🎫 Adding button_title field to events table...');
    
    try {
        // Check if the button_title column already exists
        const hasButtonTitle = await knex.schema.hasColumn('events', 'button_title');
        
        if (!hasButtonTitle) {
            await knex.schema.alterTable('events', function(table) {
                table.string('button_title', 50).nullable();
            });
            
            console.log('✅ Added button_title column to events table');
            console.log('🎉 Button title field migration completed successfully');
        } else {
            console.log('ℹ️ Button title field already exists in events table');
        }
        
    } catch (error) {
        console.error('❌ Error adding button_title field to events table:', error);
        throw error;
    }
};

/**
 * Remove button_title field from events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Removing button_title field from events table...');
    
    try {
        const hasButtonTitle = await knex.schema.hasColumn('events', 'button_title');
        
        if (hasButtonTitle) {
            await knex.schema.alterTable('events', function(table) {
                table.dropColumn('button_title');
            });
            
            console.log('✅ Removed button_title field from events table');
        } else {
            console.log('ℹ️ Button title field does not exist in events table');
        }
        
    } catch (error) {
        console.error('❌ Error removing button_title field from events table:', error);
        throw error;
    }
};
