const models = require("../models");

/**
 * 🔧 ENSURE DROP TABLES MIGRATION
 * 
 * This migration ensures that the drops and drop_signups tables exist.
 * It's safe to run multiple times and will only create tables if they don't exist.
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🔧 Ensuring drop tables exist...');

    try {
        // Check if events table exists
        const hasEventsTable = await knex.schema.hasTable("events");
        if (!hasEventsTable) {
            console.log('📝 Creating events table...');
            await models.createEventTable(knex);
            console.log('✅ events table created');
        } else {
            console.log('✅ events table already exists');
        }

        // Check if event_signups table exists
        const hasEventSignupsTable = await knex.schema.hasTable("event_signups");
        if (!hasEventSignupsTable) {
            console.log('📝 Creating event_signups table...');
            await models.createEventSignupTable(knex);
            console.log('✅ event_signups table created');
        } else {
            console.log('✅ event_signups table already exists');
        }

        console.log('🎉 Event tables verification complete');

    } catch (error) {
        console.error('🚨 Error ensuring drop tables:', error);
        throw error;
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    // Don't drop tables in down migration for safety
    console.log('⚠️ Down migration for drop tables skipped for safety');
    return Promise.resolve();
};