/**
 * Analytics Models for Enhanced Tracking System
 */

async function createEventQRCodesTable(knex) {
    const hasTable = await knex.schema.hasTable("event_qr_codes");
    if (!hasTable) {
        await knex.schema.createTable("event_qr_codes", table => {
            table.increments("id").primary();
            table
                .integer("event_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("events")
                .onDelete("CASCADE");
            table.string("name", 100).notNullable(); // User-friendly name
            table.string("identifier", 50).notNullable().unique(); // Short URL identifier
            table.string("custom_url", 2040).nullable(); // Optional custom redirect URL
            table.text("description").nullable(); // Optional description
            table.boolean("is_active").defaultTo(true);
            table.integer("scan_count").defaultTo(0); // Cached scan count for performance
            table.timestamps(false, true);

            // Indexes for performance
            table.index(["event_id"]);
            table.index(["identifier"]);
            table.index(["is_active"]);
            table.index(["event_id", "is_active"]);
        });
    }
}

async function createEventPageViewsTable(knex) {
    const hasTable = await knex.schema.hasTable("event_page_views");
    if (!hasTable) {
        await knex.schema.createTable("event_page_views", table => {
            table.increments("id").primary();
            table
                .integer("event_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("events")
                .onDelete("CASCADE");
            table
                .integer("qr_code_id")
                .unsigned()
                .nullable()
                .references("id")
                .inTable("event_qr_codes")
                .onDelete("SET NULL");
            table.timestamp("view_timestamp").defaultTo(knex.fn.now());
            table.string("session_id", 100).nullable();
            table.string("user_agent", 500).nullable();
            table.string("ip_address", 45).nullable();
            table.string("referrer", 2040).nullable();
            table.string("utm_source", 100).nullable();
            table.string("utm_medium", 100).nullable();
            table.string("utm_campaign", 100).nullable();
            table.string("device_type", 50).nullable(); // mobile, desktop, tablet
            table.string("browser_name", 100).nullable();
            table.string("browser_version", 50).nullable();
            table.string("os_name", 100).nullable();
            table.string("os_version", 50).nullable();
            table.string("country_code", 2).nullable();
            table.string("region", 100).nullable();
            table.string("city", 100).nullable();
            table.decimal("latitude", 10, 8).nullable();
            table.decimal("longitude", 11, 8).nullable();
            table.string("timezone", 50).nullable();
            table.boolean("is_unique_visitor").defaultTo(false);
            table.boolean("is_returning_visitor").defaultTo(false);
            table.string("page_url", 2040).nullable();
            table.string("page_title", 200).nullable();
            table.integer("time_on_page").nullable(); // seconds
            table.timestamps(false, true);

            // Indexes for performance and analytics queries
            table.index(["event_id"]);
            table.index(["qr_code_id"]);
            table.index(["view_timestamp"]);
            table.index(["session_id"]);
            table.index(["ip_address"]);
            table.index(["device_type"]);
            table.index(["country_code"]);
            table.index(["utm_source"]);
            table.index(["is_unique_visitor"]);
            table.index(["event_id", "view_timestamp"]);
            table.index(["event_id", "session_id"]);
        });
    }
}

async function createUserSessionsTable(knex) {
    const hasTable = await knex.schema.hasTable("user_sessions");
    if (!hasTable) {
        await knex.schema.createTable("user_sessions", table => {
            table.increments("id").primary();
            table.string("session_id", 100).notNullable().unique();
            table.string("ip_address", 45).nullable();
            table.string("user_agent", 500).nullable();
            table.timestamp("first_visit").defaultTo(knex.fn.now());
            table.timestamp("last_activity").defaultTo(knex.fn.now());
            table.integer("page_views").defaultTo(0);
            table.integer("total_time").defaultTo(0); // Total time in seconds
            table.string("referrer", 2040).nullable();
            table.string("utm_source", 100).nullable();
            table.string("utm_medium", 100).nullable();
            table.string("utm_campaign", 100).nullable();
            table.string("device_type", 50).nullable();
            table.string("browser_name", 100).nullable();
            table.string("os_name", 100).nullable();
            table.string("country_code", 2).nullable();
            table.string("city", 100).nullable();
            table.boolean("converted").defaultTo(false); // Did they sign up?
            table.timestamp("conversion_timestamp").nullable();
            table.timestamps(false, true);

            // Indexes for performance
            table.index(["session_id"]);
            table.index(["ip_address"]);
            table.index(["first_visit"]);
            table.index(["last_activity"]);
            table.index(["converted"]);
            table.index(["device_type"]);
            table.index(["country_code"]);
        });
    }
}

module.exports = {
    createEventQRCodesTable,
    createEventPageViewsTable,
    createUserSessionsTable
};
