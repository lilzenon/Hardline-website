/**
 * Add QR code fields to events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🎯 Adding QR code fields to events table...');
    
    try {
        // Check if the new columns already exist to avoid errors
        const hasQrEnabled = await knex.schema.hasColumn('events', 'qr_code_enabled');
        const hasQrIdentifier = await knex.schema.hasColumn('events', 'qr_code_identifier');
        const hasQrCustomUrl = await knex.schema.hasColumn('events', 'qr_code_custom_url');
        
        if (!hasQrEnabled || !hasQrIdentifier || !hasQrCustomUrl) {
            await knex.schema.alterTable('events', function(table) {
                if (!hasQrEnabled) {
                    table.boolean('qr_code_enabled').defaultTo(true);
                    console.log('✅ Added qr_code_enabled column');
                }
                
                if (!hasQrIdentifier) {
                    table.string('qr_code_identifier', 50).nullable().unique();
                    console.log('✅ Added qr_code_identifier column');
                }
                
                if (!hasQrCustomUrl) {
                    table.string('qr_code_custom_url', 2040).nullable();
                    console.log('✅ Added qr_code_custom_url column');
                }
            });
            
            // Add index for QR code identifier for efficient lookups
            if (!hasQrIdentifier) {
                await knex.schema.alterTable('events', function(table) {
                    table.index(['qr_code_identifier'], 'events_qr_identifier_index');
                });
                console.log('✅ Added index for QR code identifier');
            }
            
            // Generate unique QR code identifiers for existing events
            if (!hasQrIdentifier) {
                const { nanoid } = require('nanoid');
                const events = await knex('events').select('id');
                
                for (const event of events) {
                    const qrIdentifier = nanoid(12); // Generate 12-character unique ID
                    await knex('events')
                        .where('id', event.id)
                        .update({ qr_code_identifier: qrIdentifier });
                }
                console.log(`✅ Generated QR identifiers for ${events.length} existing events`);
            }
            
            console.log('🎉 QR code fields added to events table successfully');
        } else {
            console.log('ℹ️ QR code fields already exist in events table');
        }
        
    } catch (error) {
        console.error('❌ Error adding QR code fields to events table:', error);
        throw error;
    }
};

/**
 * Remove QR code fields from events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Removing QR code fields from events table...');
    
    try {
        await knex.schema.alterTable('events', function(table) {
            // Drop index first
            table.dropIndex(['qr_code_identifier'], 'events_qr_identifier_index');
            
            // Drop columns
            table.dropColumn('qr_code_enabled');
            table.dropColumn('qr_code_identifier');
            table.dropColumn('qr_code_custom_url');
        });
        
        console.log('✅ QR code fields removed from events table');
        
    } catch (error) {
        console.error('❌ Error removing QR code fields from events table:', error);
        throw error;
    }
};
