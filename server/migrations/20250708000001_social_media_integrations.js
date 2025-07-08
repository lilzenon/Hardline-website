/**
 * Social Media Integrations Migration
 * Creates tables for Instagram/Facebook API integration, keyword management, and automated responses
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
        // 1. Social Media Accounts Table
        .createTable('social_media_accounts', function(table) {
            table.increments('id').primary();
            table.uuid('uuid').notNullable().defaultTo(knex.fn.uuid()).unique();
            
            // Account identification
            table.string('platform', 20).notNullable(); // 'instagram', 'facebook'
            table.string('platform_account_id', 100).notNullable(); // Instagram Business Account ID or Facebook Page ID
            table.string('platform_username', 100).nullable(); // @username
            table.string('platform_name', 200).nullable(); // Display name
            table.string('profile_picture_url', 500).nullable();
            
            // Authentication & API access
            table.text('access_token').nullable(); // Encrypted access token
            table.text('refresh_token').nullable(); // For token refresh
            table.timestamp('token_expires_at').nullable();
            table.json('permissions').nullable(); // Granted permissions array
            table.boolean('is_active').defaultTo(true);
            table.boolean('webhook_configured').defaultTo(false);
            
            // Account metadata
            table.integer('follower_count').nullable();
            table.string('account_type', 50).nullable(); // 'business', 'creator', 'personal'
            table.json('account_metadata').nullable(); // Additional platform-specific data
            
            // Ownership & management
            table.integer('connected_by_user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.timestamp('connected_at').defaultTo(knex.fn.now());
            table.timestamp('last_sync_at').nullable();
            table.text('last_error').nullable();
            
            table.timestamps(true, true);
            
            // Indexes
            table.index(['platform', 'platform_account_id'], 'idx_social_accounts_platform');
            table.index(['connected_by_user_id', 'is_active'], 'idx_social_accounts_user');
            table.unique(['platform', 'platform_account_id'], 'unique_platform_account');
        })
        
        // 2. Keywords Table for automation triggers
        .createTable('social_keywords', function(table) {
            table.increments('id').primary();
            table.uuid('uuid').notNullable().defaultTo(knex.fn.uuid()).unique();
            
            // Keyword configuration
            table.string('keyword', 100).notNullable(); // The trigger keyword (e.g., "RSVP", "TICKETS")
            table.text('description').nullable(); // Admin description of what this keyword does
            table.boolean('is_active').defaultTo(true);
            table.boolean('case_sensitive').defaultTo(false);
            table.boolean('exact_match').defaultTo(false); // true = exact match, false = contains
            
            // Response configuration
            table.text('auto_response_message').nullable(); // DM response template
            table.boolean('send_auto_response').defaultTo(true);
            table.integer('response_delay_seconds').defaultTo(0); // Delay before sending response
            
            // Targeting & scope
            table.integer('social_account_id').unsigned().nullable().references('id').inTable('social_media_accounts').onDelete('CASCADE');
            table.json('target_post_types').nullable(); // ['feed', 'story', 'reel'] - which post types to monitor
            table.json('target_hashtags').nullable(); // Only monitor posts with these hashtags
            
            // User capture settings
            table.boolean('capture_user_data').defaultTo(true);
            table.string('signup_type', 50).defaultTo('general'); // 'rsvp', 'waitlist', 'presale', 'general'
            table.integer('drop_id').unsigned().nullable(); // Link to specific drop/event
            table.json('custom_fields').nullable(); // Additional data to capture
            
            // Usage tracking
            table.integer('total_triggers').defaultTo(0);
            table.integer('total_responses_sent').defaultTo(0);
            table.integer('total_users_captured').defaultTo(0);
            table.timestamp('last_triggered_at').nullable();
            
            // Management
            table.integer('created_by_user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.timestamps(true, true);
            
            // Indexes
            table.index(['keyword', 'is_active'], 'idx_keywords_active');
            table.index(['social_account_id', 'is_active'], 'idx_keywords_account');
            table.index(['created_by_user_id'], 'idx_keywords_creator');
        })
        
        // 3. Social Media Interactions Table (comments, DMs, etc.)
        .createTable('social_interactions', function(table) {
            table.increments('id').primary();
            table.uuid('uuid').notNullable().defaultTo(knex.fn.uuid()).unique();
            
            // Platform identification
            table.integer('social_account_id').unsigned().notNullable().references('id').inTable('social_media_accounts').onDelete('CASCADE');
            table.string('platform_interaction_id', 200).notNullable(); // Platform's unique ID for this interaction
            table.string('interaction_type', 50).notNullable(); // 'comment', 'dm', 'story_reply', 'mention'
            
            // Content details
            table.text('content').nullable(); // The actual comment/message content
            table.string('post_id', 200).nullable(); // ID of the post that was commented on
            table.string('post_url', 500).nullable(); // URL to the original post
            table.json('media_attachments').nullable(); // Any images/videos in the interaction
            
            // User information (from platform)
            table.string('platform_user_id', 200).notNullable(); // Platform's user ID
            table.string('platform_username', 100).nullable(); // @username
            table.string('platform_display_name', 200).nullable(); // Display name
            table.string('platform_profile_picture', 500).nullable();
            table.integer('platform_follower_count').nullable();
            
            // Keyword matching & automation
            table.integer('matched_keyword_id').unsigned().nullable().references('id').inTable('social_keywords').onDelete('SET NULL');
            table.string('matched_keyword_text', 100).nullable(); // The actual keyword that was matched
            table.boolean('auto_response_sent').defaultTo(false);
            table.timestamp('auto_response_sent_at').nullable();
            table.text('auto_response_content').nullable(); // What we sent back
            table.string('auto_response_id', 200).nullable(); // Platform's ID for our response
            
            // User capture
            table.boolean('user_captured').defaultTo(false);
            table.integer('captured_user_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.json('captured_user_data').nullable(); // Additional data captured during signup
            
            // Processing status
            table.string('processing_status', 50).defaultTo('pending'); // 'pending', 'processed', 'failed', 'ignored'
            table.text('processing_error').nullable();
            table.timestamp('processed_at').nullable();
            
            // Metadata
            table.timestamp('platform_created_at').nullable(); // When the interaction happened on the platform
            table.json('raw_webhook_data').nullable(); // Store the original webhook payload for debugging
            table.timestamps(true, true);
            
            // Indexes
            table.index(['social_account_id', 'interaction_type'], 'idx_interactions_account_type');
            table.index(['platform_interaction_id'], 'idx_interactions_platform_id');
            table.index(['matched_keyword_id'], 'idx_interactions_keyword');
            table.index(['processing_status', 'created_at'], 'idx_interactions_processing');
            table.index(['platform_user_id', 'social_account_id'], 'idx_interactions_user');
            table.unique(['platform_interaction_id', 'social_account_id'], 'unique_platform_interaction');
        })
        
        // 4. Social Media Users Table (for tracking users across platforms)
        .createTable('social_media_users', function(table) {
            table.increments('id').primary();
            table.uuid('uuid').notNullable().defaultTo(knex.fn.uuid()).unique();
            
            // Platform identification
            table.string('platform', 20).notNullable(); // 'instagram', 'facebook'
            table.string('platform_user_id', 200).notNullable(); // Platform's unique user ID
            table.string('platform_username', 100).nullable(); // @username (can change)
            table.string('platform_display_name', 200).nullable(); // Display name (can change)
            table.string('platform_profile_picture', 500).nullable();
            
            // User data
            table.string('email', 255).nullable(); // If we can capture it
            table.string('phone', 20).nullable(); // If we can capture it
            table.string('first_name', 100).nullable();
            table.string('last_name', 100).nullable();
            table.json('additional_data').nullable(); // Any other data we capture
            
            // Engagement tracking
            table.integer('total_interactions').defaultTo(0);
            table.integer('total_keywords_triggered').defaultTo(0);
            table.timestamp('first_interaction_at').nullable();
            table.timestamp('last_interaction_at').nullable();
            table.boolean('is_follower').nullable(); // If we can determine this
            table.integer('follower_count').nullable(); // If available
            
            // KUTT system integration
            table.integer('linked_user_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamp('linked_at').nullable();
            table.string('acquisition_source', 100).nullable(); // Which keyword/campaign brought them in
            
            // Data quality & management
            table.boolean('is_verified').defaultTo(false); // Platform verification status
            table.boolean('is_business_account').defaultTo(false);
            table.boolean('opted_out').defaultTo(false); // If they've opted out of communications
            table.timestamp('opted_out_at').nullable();
            
            table.timestamps(true, true);
            
            // Indexes
            table.index(['platform', 'platform_user_id'], 'idx_social_users_platform');
            table.index(['linked_user_id'], 'idx_social_users_linked');
            table.index(['platform_username'], 'idx_social_users_username');
            table.index(['email'], 'idx_social_users_email');
            table.unique(['platform', 'platform_user_id'], 'unique_platform_user');
        })
        
        // 5. Integration Settings Table
        .createTable('integration_settings', function(table) {
            table.increments('id').primary();
            
            // Settings identification
            table.string('setting_key', 100).notNullable().unique();
            table.text('setting_value').nullable();
            table.string('setting_type', 50).defaultTo('string'); // 'string', 'json', 'boolean', 'number'
            table.text('description').nullable();
            
            // Metadata
            table.boolean('is_encrypted').defaultTo(false); // Whether the value is encrypted
            table.boolean('is_public').defaultTo(false); // Whether this can be exposed to frontend
            table.integer('updated_by_user_id').unsigned().nullable().references('id').inTable('users').onDelete('SET NULL');
            table.timestamps(true, true);
            
            // Indexes
            table.index(['setting_key'], 'idx_integration_settings_key');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('integration_settings')
        .dropTableIfExists('social_media_users')
        .dropTableIfExists('social_interactions')
        .dropTableIfExists('social_keywords')
        .dropTableIfExists('social_media_accounts');
};
