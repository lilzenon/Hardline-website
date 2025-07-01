/**
 * Create enhanced analytics system for comprehensive tracking
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🚀 Creating enhanced analytics system...');
    
    try {
        // Create event_qr_codes table for multiple QR codes per event
        const hasQrCodesTable = await knex.schema.hasTable('event_qr_codes');
        if (!hasQrCodesTable) {
            await knex.schema.createTable('event_qr_codes', function(table) {
                table.increments('id').primary();
                table
                    .integer('event_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('events')
                    .onDelete('CASCADE');
                table.string('name', 100).notNullable(); // User-friendly name
                table.string('identifier', 50).notNullable().unique(); // Short URL identifier
                table.string('custom_url', 2040).nullable(); // Optional custom redirect URL
                table.text('description').nullable(); // Optional description
                table.boolean('is_active').defaultTo(true);
                table.integer('scan_count').defaultTo(0); // Cached scan count for performance
                table.timestamps(false, true);

                // Indexes for performance
                table.index(['event_id'], 'qr_codes_event_id_index');
                table.index(['identifier'], 'qr_codes_identifier_index');
                table.index(['is_active'], 'qr_codes_active_index');
                table.index(['event_id', 'is_active'], 'qr_codes_event_active_index');
            });
            console.log('✅ Created event_qr_codes table');
        }

        // Create event_page_views table for comprehensive page tracking
        const hasPageViewsTable = await knex.schema.hasTable('event_page_views');
        if (!hasPageViewsTable) {
            await knex.schema.createTable('event_page_views', function(table) {
                table.increments('id').primary();
                table
                    .integer('event_id')
                    .unsigned()
                    .notNullable()
                    .references('id')
                    .inTable('events')
                    .onDelete('CASCADE');
                table
                    .integer('qr_code_id')
                    .unsigned()
                    .nullable()
                    .references('id')
                    .inTable('event_qr_codes')
                    .onDelete('SET NULL');
                table.timestamp('view_timestamp').defaultTo(knex.fn.now());
                table.string('session_id', 100).nullable();
                table.string('user_agent', 500).nullable();
                table.string('ip_address', 45).nullable();
                table.string('referrer', 2040).nullable();
                table.string('utm_source', 100).nullable();
                table.string('utm_medium', 100).nullable();
                table.string('utm_campaign', 100).nullable();
                table.string('device_type', 50).nullable(); // mobile, desktop, tablet
                table.string('browser_name', 100).nullable();
                table.string('browser_version', 50).nullable();
                table.string('os_name', 100).nullable();
                table.string('os_version', 50).nullable();
                table.string('country_code', 2).nullable();
                table.string('region', 100).nullable();
                table.string('city', 100).nullable();
                table.decimal('latitude', 10, 8).nullable();
                table.decimal('longitude', 11, 8).nullable();
                table.string('timezone', 50).nullable();
                table.boolean('is_unique_visitor').defaultTo(false);
                table.boolean('is_returning_visitor').defaultTo(false);
                table.string('page_url', 2040).nullable();
                table.string('page_title', 200).nullable();
                table.integer('time_on_page').nullable(); // seconds
                table.timestamps(false, true);

                // Indexes for performance and analytics queries
                table.index(['event_id'], 'page_views_event_id_index');
                table.index(['qr_code_id'], 'page_views_qr_code_id_index');
                table.index(['view_timestamp'], 'page_views_timestamp_index');
                table.index(['session_id'], 'page_views_session_index');
                table.index(['ip_address'], 'page_views_ip_index');
                table.index(['device_type'], 'page_views_device_index');
                table.index(['country_code'], 'page_views_country_index');
                table.index(['utm_source'], 'page_views_utm_source_index');
                table.index(['is_unique_visitor'], 'page_views_unique_index');
                table.index(['event_id', 'view_timestamp'], 'page_views_event_time_index');
                table.index(['event_id', 'session_id'], 'page_views_event_session_index');
            });
            console.log('✅ Created event_page_views table');
        }

        // Create user_sessions table for session tracking
        const hasSessionsTable = await knex.schema.hasTable('user_sessions');
        if (!hasSessionsTable) {
            await knex.schema.createTable('user_sessions', function(table) {
                table.increments('id').primary();
                table.string('session_id', 100).notNullable().unique();
                table.string('ip_address', 45).nullable();
                table.string('user_agent', 500).nullable();
                table.timestamp('first_visit').defaultTo(knex.fn.now());
                table.timestamp('last_activity').defaultTo(knex.fn.now());
                table.integer('page_views').defaultTo(0);
                table.integer('total_time').defaultTo(0); // Total time in seconds
                table.string('referrer', 2040).nullable();
                table.string('utm_source', 100).nullable();
                table.string('utm_medium', 100).nullable();
                table.string('utm_campaign', 100).nullable();
                table.string('device_type', 50).nullable();
                table.string('browser_name', 100).nullable();
                table.string('os_name', 100).nullable();
                table.string('country_code', 2).nullable();
                table.string('city', 100).nullable();
                table.boolean('converted').defaultTo(false); // Did they sign up?
                table.timestamp('conversion_timestamp').nullable();
                table.timestamps(false, true);

                // Indexes for performance
                table.index(['session_id'], 'sessions_session_id_index');
                table.index(['ip_address'], 'sessions_ip_index');
                table.index(['first_visit'], 'sessions_first_visit_index');
                table.index(['last_activity'], 'sessions_last_activity_index');
                table.index(['converted'], 'sessions_converted_index');
                table.index(['device_type'], 'sessions_device_index');
                table.index(['country_code'], 'sessions_country_index');
            });
            console.log('✅ Created user_sessions table');
        }

        console.log('🎉 Enhanced analytics system created successfully');
        
    } catch (error) {
        console.error('❌ Error creating enhanced analytics system:', error);
        throw error;
    }
};

/**
 * Remove enhanced analytics system
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('event_page_views')
        .then(() => knex.schema.dropTableIfExists('user_sessions'))
        .then(() => knex.schema.dropTableIfExists('event_qr_codes'));
};
