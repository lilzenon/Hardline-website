/**
 * Create QR code tracking system for events
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🎯 Creating QR code tracking system...');
    
    try {
        // Create qr_code_scans table for tracking QR code usage
        const hasQrScansTable = await knex.schema.hasTable('qr_code_scans');
        if (!hasQrScansTable) {
            await knex.schema.createTable('qr_code_scans', function(table) {
                table.increments('id').primary();
                table
                    .integer('event_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('events')
                    .onDelete('CASCADE');
                table.timestamp('scan_timestamp').defaultTo(knex.fn.now());
                table.string('user_agent', 500).nullable();
                table.string('ip_address', 45).nullable();
                table.string('referrer', 2040).nullable();
                table.string('device_type', 50).nullable(); // mobile, desktop, tablet
                table.string('browser_name', 100).nullable();
                table.string('os_name', 100).nullable();
                table.string('country_code', 2).nullable();
                table.string('city', 100).nullable();
                table.boolean('is_unique_visitor').defaultTo(true);
                table.timestamps(false, true);

                // Indexes for performance
                table.index(['event_id'], 'qr_scans_event_id_index');
                table.index(['scan_timestamp'], 'qr_scans_timestamp_index');
                table.index(['event_id', 'scan_timestamp'], 'qr_scans_event_time_index');
                table.index(['device_type'], 'qr_scans_device_index');
                table.index(['ip_address'], 'qr_scans_ip_index');
            });
            console.log('✅ Created qr_code_scans table');
        } else {
            console.log('ℹ️ qr_code_scans table already exists');
        }

        console.log('🎉 QR code tracking system created successfully');
        
    } catch (error) {
        console.error('❌ Error creating QR code tracking system:', error);
        throw error;
    }
};

/**
 * Remove QR code tracking system
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Removing QR code tracking system...');
    
    try {
        await knex.schema.dropTableIfExists('qr_code_scans');
        console.log('✅ QR code tracking system removed');
        
    } catch (error) {
        console.error('❌ Error removing QR code tracking system:', error);
        throw error;
    }
};
