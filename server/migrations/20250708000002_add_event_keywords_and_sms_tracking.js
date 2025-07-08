/**
 * Add Event-based Keywords and SMS Tracking Migration
 * Extends social media integrations to support event-specific keywords and SMS automation
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
        // 1. Add event_id and keyword_type to social_keywords table
        .alterTable('social_keywords', function(table) {
            table.integer('event_id').unsigned().nullable().references('id').inTable('events').onDelete('CASCADE');
            table.string('keyword_type', 20).defaultTo('instagram'); // 'instagram', 'sms'
            table.index(['event_id', 'keyword_type', 'is_active'], 'idx_keywords_event_type');
        })
        
        // 2. Create SMS interactions table for Twilio integration
        .createTable('sms_interactions', function(table) {
            table.increments('id').primary();
            table.uuid('uuid').notNullable().defaultTo(knex.fn.uuid()).unique();
            
            // SMS identification
            table.string('twilio_message_sid', 100).notNullable().unique(); // Twilio's unique message ID
            table.string('interaction_type', 50).notNullable(); // 'inbound', 'outbound'
            table.string('direction', 20).notNullable(); // 'inbound', 'outbound'
            
            // Phone numbers
            table.string('from_phone', 20).notNullable(); // Sender's phone number
            table.string('to_phone', 20).notNullable(); // Recipient's phone number
            table.string('twilio_phone_number', 20).nullable(); // Our Twilio number used
            
            // Message content
            table.text('message_body').nullable(); // The SMS message content
            table.integer('num_segments').defaultTo(1); // Number of SMS segments
            table.string('message_status', 50).nullable(); // Twilio message status
            
            // Media attachments (MMS)
            table.json('media_urls').nullable(); // Array of media URLs if MMS
            table.integer('num_media').defaultTo(0); // Number of media attachments
            
            // Keyword matching & automation
            table.integer('matched_keyword_id').unsigned().nullable().references('id').inTable('social_keywords').onDelete('SET NULL');
            table.string('matched_keyword_text', 100).nullable(); // The actual keyword that was matched
            table.boolean('auto_response_sent').defaultTo(false);
            table.timestamp('auto_response_sent_at').nullable();
            table.text('auto_response_content').nullable(); // What we sent back
            table.string('auto_response_sid').nullable(); // Twilio SID for our response
            
            // Event association
            table.integer('event_id').unsigned().nullable().references('id').inTable('events').onDelete('SET NULL');
            
            // User capture
            table.boolean('user_captured').defaultTo(false);
            table.integer('captured_user_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.json('captured_user_data').nullable(); // Additional data captured during signup
            
            // Processing status
            table.string('processing_status', 50).defaultTo('pending'); // 'pending', 'processed', 'failed', 'ignored'
            table.text('processing_error').nullable();
            table.timestamp('processed_at').nullable();
            
            // Twilio metadata
            table.string('account_sid', 100).nullable(); // Twilio Account SID
            table.string('messaging_service_sid', 100).nullable(); // If using messaging service
            table.decimal('price', 10, 4).nullable(); // Cost of the message
            table.string('price_unit', 10).nullable(); // Currency
            table.string('error_code', 10).nullable(); // Twilio error code if failed
            table.text('error_message').nullable(); // Twilio error message
            
            // Metadata
            table.timestamp('twilio_created_at').nullable(); // When Twilio received/sent the message
            table.json('raw_webhook_data').nullable(); // Store the original Twilio webhook payload
            table.timestamps(true, true);
            
            // Indexes
            table.index(['from_phone', 'created_at'], 'idx_sms_from_phone');
            table.index(['to_phone', 'created_at'], 'idx_sms_to_phone');
            table.index(['matched_keyword_id'], 'idx_sms_keyword');
            table.index(['event_id'], 'idx_sms_event');
            table.index(['processing_status', 'created_at'], 'idx_sms_processing');
            table.index(['twilio_created_at'], 'idx_sms_twilio_date');
        })
        
        // 3. Create SMS users table for phone number tracking
        .createTable('sms_users', function(table) {
            table.increments('id').primary();
            table.uuid('uuid').notNullable().defaultTo(knex.fn.uuid()).unique();
            
            // Phone identification
            table.string('phone_number', 20).notNullable().unique(); // Normalized phone number
            table.string('country_code', 5).nullable(); // Country code (e.g., +1)
            table.string('carrier', 100).nullable(); // Phone carrier if available
            table.string('phone_type', 20).nullable(); // 'mobile', 'landline', 'voip'
            
            // User data
            table.string('first_name', 100).nullable();
            table.string('last_name', 100).nullable();
            table.string('email', 255).nullable();
            table.json('additional_data').nullable(); // Any other data we capture
            
            // Engagement tracking
            table.integer('total_messages_received').defaultTo(0);
            table.integer('total_messages_sent').defaultTo(0);
            table.integer('total_keywords_triggered').defaultTo(0);
            table.timestamp('first_message_at').nullable();
            table.timestamp('last_message_at').nullable();
            
            // KUTT system integration
            table.integer('linked_user_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('linked_at').nullable();
            table.string('acquisition_source', 100).nullable(); // Which keyword/campaign brought them in
            
            // Opt-out management
            table.boolean('opted_out').defaultTo(false);
            table.timestamp('opted_out_at').nullable();
            table.string('opt_out_reason', 200).nullable();
            
            // Data quality
            table.boolean('is_valid_number').defaultTo(true);
            table.timestamp('last_validated_at').nullable();
            
            table.timestamps(true, true);
            
            // Indexes
            table.index(['phone_number'], 'idx_sms_users_phone');
            table.index(['linked_user_id'], 'idx_sms_users_linked');
            table.index(['opted_out'], 'idx_sms_users_opted_out');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('sms_users')
        .dropTableIfExists('sms_interactions')
        .alterTable('social_keywords', function(table) {
            table.dropIndex(['event_id', 'keyword_type', 'is_active'], 'idx_keywords_event_type');
            table.dropColumn('event_id');
            table.dropColumn('keyword_type');
        });
};
