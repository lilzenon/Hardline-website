const env = require("../env");

const isMySQL = env.DB_CLIENT === "mysql" || env.DB_CLIENT === "mysql2";
const isPostgres = env.DB_CLIENT === "pg" || env.DB_CLIENT === "pg-native";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function up(knex) {
    console.log('🚀 Creating performance optimization indexes...');

    // IF NOT EXISTS is not available on MySQL
    const ifNotExists = isMySQL ? "" : "IF NOT EXISTS";

    try {
        // 1. Composite indexes for common query patterns
        await Promise.all([
            // Links table optimizations
            knex.raw(`CREATE INDEX ${ifNotExists} links_user_id_created_at_idx ON links (user_id, created_at DESC);`),
            knex.raw(`CREATE INDEX ${ifNotExists} links_domain_id_created_at_idx ON links (domain_id, created_at DESC);`),
            knex.raw(`CREATE INDEX ${ifNotExists} links_user_id_visit_count_idx ON links (user_id, visit_count DESC);`),
            knex.raw(`CREATE INDEX ${ifNotExists} links_expire_in_created_at_idx ON links (expire_in, created_at) WHERE expire_in IS NOT NULL;`),

            // Visits table optimizations for analytics
            knex.raw(`CREATE INDEX ${ifNotExists} visits_link_id_created_at_idx ON visits (link_id, created_at DESC);`),
            knex.raw(`CREATE INDEX ${ifNotExists} visits_user_id_created_at_idx ON visits (user_id, created_at DESC);`),
            knex.raw(`CREATE INDEX ${ifNotExists} visits_created_at_total_idx ON visits (created_at DESC, total);`),

            // Users table optimizations
            knex.raw(`CREATE INDEX ${ifNotExists} users_created_at_idx ON users (created_at DESC);`),
            knex.raw(`CREATE INDEX ${ifNotExists} users_email_lower_idx ON users (LOWER(email));`),

            // Domains table optimizations
            knex.raw(`CREATE INDEX ${ifNotExists} domains_user_id_created_at_idx ON domains (user_id, created_at DESC);`),
            knex.raw(`CREATE INDEX ${ifNotExists} domains_address_lower_idx ON domains (LOWER(address));`)
        ]);

        // 2. Event-specific indexes (if events table exists)
        const hasEventsTable = await knex.schema.hasTable('events');
        if (hasEventsTable) {
            await Promise.all([
                knex.raw(`CREATE INDEX ${ifNotExists} events_user_id_active_created_idx ON events (user_id, is_active, created_at DESC);`),
                knex.raw(`CREATE INDEX ${ifNotExists} events_slug_active_idx ON events (slug, is_active);`),
                knex.raw(`CREATE INDEX ${ifNotExists} events_show_homepage_active_idx ON events (show_on_homepage, is_active) WHERE show_on_homepage = true;`),
                knex.raw(`CREATE INDEX ${ifNotExists} events_event_date_idx ON events (event_date) WHERE event_date IS NOT NULL;`)
            ]);
        }

        // 3. Event signups indexes (if table exists)
        const hasEventSignupsTable = await knex.schema.hasTable('event_signups');
        if (hasEventSignupsTable) {
            await Promise.all([
                knex.raw(`CREATE INDEX ${ifNotExists} event_signups_event_id_created_idx ON event_signups (event_id, created_at DESC);`),
                knex.raw(`CREATE INDEX ${ifNotExists} event_signups_email_created_idx ON event_signups (email, created_at DESC);`),
                knex.raw(`CREATE INDEX ${ifNotExists} event_signups_phone_created_idx ON event_signups (phone, created_at DESC) WHERE phone IS NOT NULL;`)
            ]);
        }

        // 4. PostgreSQL-specific optimizations
        if (isPostgres) {
            // Create partial indexes for better performance
            await Promise.all([
                // Index only active links (without NOW() function to avoid immutable function error)
                knex.raw(`CREATE INDEX ${ifNotExists} links_active_user_id_idx ON links (user_id, created_at DESC) WHERE expire_in IS NULL;`),

                // Index only non-zero visit counts
                knex.raw(`CREATE INDEX ${ifNotExists} links_popular_idx ON links (visit_count DESC, created_at DESC) WHERE visit_count > 0;`),

                // Index for search queries (using GIN for full-text search if needed)
                knex.raw(`CREATE INDEX ${ifNotExists} links_search_idx ON links USING gin(to_tsvector('english', COALESCE(description, '') || ' ' || COALESCE(address, '')));`)
            ]);

            // Update table statistics for better query planning
            await Promise.all([
                knex.raw('ANALYZE links;'),
                knex.raw('ANALYZE visits;'),
                knex.raw('ANALYZE users;'),
                knex.raw('ANALYZE domains;')
            ]);
        }

        console.log('✅ Performance optimization indexes created successfully');

    } catch (error) {
        console.error('🚨 Error creating performance indexes:', error);
        throw error;
    }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function down(knex) {
    console.log('🔄 Dropping performance optimization indexes...');

    try {
        // Drop all the indexes we created
        await Promise.all([
            // Links table indexes
            knex.raw('DROP INDEX IF EXISTS links_user_id_created_at_idx;'),
            knex.raw('DROP INDEX IF EXISTS links_domain_id_created_at_idx;'),
            knex.raw('DROP INDEX IF EXISTS links_user_id_visit_count_idx;'),
            knex.raw('DROP INDEX IF EXISTS links_expire_in_created_at_idx;'),
            knex.raw('DROP INDEX IF EXISTS links_active_user_id_idx;'),
            knex.raw('DROP INDEX IF EXISTS links_popular_idx;'),
            knex.raw('DROP INDEX IF EXISTS links_search_idx;'),

            // Visits table indexes
            knex.raw('DROP INDEX IF EXISTS visits_link_id_created_at_idx;'),
            knex.raw('DROP INDEX IF EXISTS visits_user_id_created_at_idx;'),
            knex.raw('DROP INDEX IF EXISTS visits_created_at_total_idx;'),

            // Users table indexes
            knex.raw('DROP INDEX IF EXISTS users_created_at_idx;'),
            knex.raw('DROP INDEX IF EXISTS users_email_lower_idx;'),

            // Domains table indexes
            knex.raw('DROP INDEX IF EXISTS domains_user_id_created_at_idx;'),
            knex.raw('DROP INDEX IF EXISTS domains_address_lower_idx;'),

            // Events table indexes
            knex.raw('DROP INDEX IF EXISTS events_user_id_active_created_idx;'),
            knex.raw('DROP INDEX IF EXISTS events_slug_active_idx;'),
            knex.raw('DROP INDEX IF EXISTS events_show_homepage_active_idx;'),
            knex.raw('DROP INDEX IF EXISTS events_event_date_idx;'),

            // Event signups indexes
            knex.raw('DROP INDEX IF EXISTS event_signups_event_id_created_idx;'),
            knex.raw('DROP INDEX IF EXISTS event_signups_email_created_idx;'),
            knex.raw('DROP INDEX IF EXISTS event_signups_phone_created_idx;')
        ]);

        console.log('✅ Performance optimization indexes dropped successfully');

    } catch (error) {
        console.error('🚨 Error dropping performance indexes:', error);
        throw error;
    }
}

module.exports = {
    up,
    down,
};