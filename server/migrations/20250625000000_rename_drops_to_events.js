/**
 * Migration to rename all "drop" terminology to "event" terminology
 * This includes table names, column names, indexes, and constraints
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🔄 Starting Drop → Event terminology migration...');

    try {
        // Step 1: Rename drop_signups table to event_signups
        console.log('📝 Renaming drop_signups table to event_signups...');
        await knex.schema.renameTable('drop_signups', 'event_signups');
        console.log('✅ Renamed drop_signups → event_signups');

        // Step 2: Rename drops table to events
        console.log('📝 Renaming drops table to events...');
        await knex.schema.renameTable('drops', 'events');
        console.log('✅ Renamed drops → events');

        // Step 3: Update foreign key column name in event_signups
        console.log('📝 Renaming drop_id column to event_id in event_signups...');

        // First, drop the foreign key constraint
        await knex.raw('ALTER TABLE event_signups DROP CONSTRAINT IF EXISTS drop_signups_drop_id_foreign');

        // Rename the column
        await knex.schema.alterTable('event_signups', function(table) {
            table.renameColumn('drop_id', 'event_id');
        });

        // Recreate the foreign key constraint with new names
        await knex.schema.alterTable('event_signups', function(table) {
            table.foreign('event_id').references('id').inTable('events').onDelete('CASCADE');
        });

        console.log('✅ Renamed drop_id → event_id and updated foreign key');

        // Step 4: Update indexes with new names
        console.log('📝 Updating indexes...');

        // Drop old indexes if they exist
        await knex.raw('DROP INDEX IF EXISTS drops_user_id_index');
        await knex.raw('DROP INDEX IF EXISTS drops_slug_index');
        await knex.raw('DROP INDEX IF EXISTS drops_is_active_index');
        await knex.raw('DROP INDEX IF EXISTS drops_homepage_active_index');
        await knex.raw('DROP INDEX IF EXISTS drops_coordinates_index');
        await knex.raw('DROP INDEX IF EXISTS drops_address_validated_index');

        // Create new indexes with event naming
        await knex.raw('CREATE INDEX IF NOT EXISTS events_user_id_index ON events (user_id)');
        await knex.raw('CREATE INDEX IF NOT EXISTS events_slug_index ON events (slug)');
        await knex.raw('CREATE INDEX IF NOT EXISTS events_is_active_index ON events (is_active)');
        await knex.raw('CREATE INDEX IF NOT EXISTS events_homepage_active_index ON events (show_on_homepage, is_active)');

        // Update event_signups indexes
        await knex.raw('DROP INDEX IF EXISTS drop_signups_drop_id_index');
        await knex.raw('DROP INDEX IF EXISTS drop_signups_email_index');
        await knex.raw('DROP INDEX IF EXISTS drop_signups_created_at_index');
        await knex.raw('DROP INDEX IF EXISTS drop_signups_drop_id_email_unique');
        await knex.raw('DROP INDEX IF EXISTS idx_drop_signups_sms_opt_in');
        await knex.raw('DROP INDEX IF EXISTS idx_drop_signups_sms_sent');

        await knex.raw('CREATE INDEX IF NOT EXISTS event_signups_event_id_index ON event_signups (event_id)');
        await knex.raw('CREATE INDEX IF NOT EXISTS event_signups_email_index ON event_signups (email)');
        await knex.raw('CREATE INDEX IF NOT EXISTS event_signups_created_at_index ON event_signups (created_at)');
        await knex.raw('CREATE INDEX IF NOT EXISTS idx_event_signups_sms_opt_in ON event_signups (sms_opt_in)');
        await knex.raw('CREATE INDEX IF NOT EXISTS idx_event_signups_sms_sent ON event_signups (sms_sent)');

        // Create partial unique index for non-null emails
        await knex.raw(`
            CREATE UNIQUE INDEX IF NOT EXISTS event_signups_event_id_email_unique 
            ON event_signups (event_id, email) 
            WHERE email IS NOT NULL
        `);

        console.log('✅ Updated all indexes');

        // Step 5: Update SMS templates to use "event" terminology
        console.log('📝 Updating SMS templates...');

        // Check if sms_templates table exists
        const hasSmsTemplates = await knex.schema.hasTable('sms_templates');
        if (hasSmsTemplates) {
            // Update template names and content
            await knex('sms_templates')
                .where('name', 'drop_signup_confirmation')
                .update({
                    name: 'event_signup_confirmation',
                    body: '🎉 Hey {name}! You\'re confirmed for {eventTitle}. We\'ll text you when it goes live. Thanks for joining BOUNCE2BOUNCE!',
                    variables: JSON.stringify({ "name": "User first name", "eventTitle": "Event title" })
                });

            await knex('sms_templates')
                .where('name', 'drop_announcement')
                .update({
                    name: 'event_announcement',
                    body: '🚀 {name}, {eventTitle} is LIVE! Check it out now: {eventUrl}',
                    variables: JSON.stringify({ "name": "User first name", "eventTitle": "Event title", "eventUrl": "Event URL" })
                });

            await knex('sms_templates')
                .where('name', 'welcome_series')
                .update({
                    body: 'Welcome to BOUNCE2BOUNCE, {name}! 🎉 You\'ll be the first to know about exclusive events and updates.'
                });

            console.log('✅ Updated SMS templates');
        } else {
            console.log('ℹ️ SMS templates table not found, skipping SMS template updates');
        }

        console.log('🎉 Drop → Event terminology migration completed successfully!');

    } catch (error) {
        console.error('❌ Error during Drop → Event migration:', error);
        throw error;
    }
};

/**
 * Rollback the Drop → Event terminology migration
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Rolling back Event → Drop terminology migration...');

    try {
        // Reverse all the changes made in the up migration

        // Step 1: Drop event indexes
        await knex.raw('DROP INDEX IF EXISTS events_user_id_index');
        await knex.raw('DROP INDEX IF EXISTS events_slug_index');
        await knex.raw('DROP INDEX IF EXISTS events_is_active_index');
        await knex.raw('DROP INDEX IF EXISTS events_homepage_active_index');
        await knex.raw('DROP INDEX IF EXISTS event_signups_event_id_index');
        await knex.raw('DROP INDEX IF EXISTS event_signups_email_index');
        await knex.raw('DROP INDEX IF EXISTS event_signups_created_at_index');
        await knex.raw('DROP INDEX IF EXISTS event_signups_event_id_email_unique');
        await knex.raw('DROP INDEX IF EXISTS idx_event_signups_sms_opt_in');
        await knex.raw('DROP INDEX IF EXISTS idx_event_signups_sms_sent');

        // Step 2: Update foreign key column name back to drop_id
        await knex.raw('ALTER TABLE event_signups DROP CONSTRAINT IF EXISTS event_signups_event_id_foreign');

        await knex.schema.alterTable('event_signups', function(table) {
            table.renameColumn('event_id', 'drop_id');
        });

        await knex.schema.alterTable('event_signups', function(table) {
            table.foreign('drop_id').references('id').inTable('events').onDelete('CASCADE');
        });

        // Step 3: Rename tables back
        await knex.schema.renameTable('events', 'drops');
        await knex.schema.renameTable('event_signups', 'drop_signups');

        // Step 4: Recreate original indexes
        await knex.raw('CREATE INDEX IF NOT EXISTS drops_user_id_index ON drops (user_id)');
        await knex.raw('CREATE INDEX IF NOT EXISTS drops_slug_index ON drops (slug)');
        await knex.raw('CREATE INDEX IF NOT EXISTS drops_is_active_index ON drops (is_active)');
        await knex.raw('CREATE INDEX IF NOT EXISTS drops_homepage_active_index ON drops (show_on_homepage, is_active)');
        await knex.raw('CREATE INDEX IF NOT EXISTS drop_signups_drop_id_index ON drop_signups (drop_id)');
        await knex.raw('CREATE INDEX IF NOT EXISTS drop_signups_email_index ON drop_signups (email)');
        await knex.raw('CREATE INDEX IF NOT EXISTS drop_signups_created_at_index ON drop_signups (created_at)');
        await knex.raw('CREATE INDEX IF NOT EXISTS idx_drop_signups_sms_opt_in ON drop_signups (sms_opt_in)');
        await knex.raw('CREATE INDEX IF NOT EXISTS idx_drop_signups_sms_sent ON drop_signups (sms_sent)');

        await knex.raw(`
            CREATE UNIQUE INDEX IF NOT EXISTS drop_signups_drop_id_email_unique 
            ON drop_signups (drop_id, email) 
            WHERE email IS NOT NULL
        `);

        // Update foreign key constraint back
        await knex.raw('ALTER TABLE drop_signups DROP CONSTRAINT IF EXISTS drop_signups_drop_id_foreign');
        await knex.schema.alterTable('drop_signups', function(table) {
            table.foreign('drop_id').references('id').inTable('drops').onDelete('CASCADE');
        });

        // Step 5: Rollback SMS templates
        console.log('📝 Rolling back SMS templates...');

        const hasSmsTemplates = await knex.schema.hasTable('sms_templates');
        if (hasSmsTemplates) {
            // Rollback template names and content
            await knex('sms_templates')
                .where('name', 'event_signup_confirmation')
                .update({
                    name: 'drop_signup_confirmation',
                    body: '🎉 Hey {name}! You\'re confirmed for {dropTitle}. We\'ll text you when it goes live. Thanks for joining BOUNCE2BOUNCE!',
                    variables: JSON.stringify({ "name": "User first name", "dropTitle": "Drop title" })
                });

            await knex('sms_templates')
                .where('name', 'event_announcement')
                .update({
                    name: 'drop_announcement',
                    body: '🚀 {name}, {dropTitle} is LIVE! Check it out now: {dropUrl}',
                    variables: JSON.stringify({ "name": "User first name", "dropTitle": "Drop title", "dropUrl": "Drop URL" })
                });

            await knex('sms_templates')
                .where('name', 'welcome_series')
                .update({
                    body: 'Welcome to BOUNCE2BOUNCE, {name}! 🎉 You\'ll be the first to know about exclusive drops and events.'
                });

            console.log('✅ Rolled back SMS templates');
        }

        console.log('✅ Event → Drop terminology rollback completed');

    } catch (error) {
        console.error('❌ Error during rollback:', error);
        throw error;
    }
};