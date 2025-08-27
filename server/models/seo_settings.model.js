/**
 * SEO Settings Database Model for BOUNCE2BOUNCE
 * Manages all SEO-related configurations and settings
 */

async function createSEOSettingsTable(knex) {
    const hasTable = await knex.schema.hasTable("seo_settings");
    if (!hasTable) {
        await knex.schema.createTable("seo_settings", table => {
            table.increments("id").primary();

            // Meta tag defaults
            table.string("default_title", 255).defaultTo("BOUNCE2BOUNCE - Live Music Events");
            table.text("default_description").defaultTo("Discover exclusive live music events, connect with artists, and purchase tickets seamlessly. Join BOUNCE2BOUNCE for unforgettable music experiences.");
            table.string("default_keywords", 500).defaultTo("live music events, concert tickets, artist promotion, event discovery, music experiences");
            table.string("default_author", 100).defaultTo("BOUNCE2BOUNCE");
            table.string("default_og_image", 500).defaultTo("/images/og-image.png");
            table.string("twitter_handle", 50).defaultTo("@bounce2bounce");

            // Sitemap settings
            table.boolean("sitemap_enabled").defaultTo(true);
            table.boolean("sitemap_include_events").defaultTo(true);
            table.boolean("sitemap_include_homepage").defaultTo(true);
            table.boolean("sitemap_include_events_listing").defaultTo(true);
            table.boolean("sitemap_include_dashboard").defaultTo(false);
            table.integer("sitemap_max_urls").defaultTo(1000);
            table.string("sitemap_changefreq", 20).defaultTo("weekly");
            table.decimal("sitemap_priority", 2, 1).defaultTo(0.8);

            // Robots.txt settings
            table.boolean("robots_enabled").defaultTo(true);
            table.text("robots_custom_rules").nullable();
            table.boolean("robots_allow_all").defaultTo(false);
            table.text("robots_disallowed_paths").defaultTo("/admin/,/dashboard/,/api/,/login,/logout");
            table.text("robots_allowed_paths").defaultTo("/,/event/,/events,/static/,/images/");
            table.integer("robots_crawl_delay").defaultTo(1);

            // Structured data settings
            table.boolean("structured_data_enabled").defaultTo(true);
            table.boolean("structured_data_events").defaultTo(true);
            table.boolean("structured_data_organization").defaultTo(true);
            table.boolean("structured_data_breadcrumbs").defaultTo(true);
            table.boolean("structured_data_faq").defaultTo(true);
            table.text("organization_schema_data").nullable(); // JSON string

            // Performance settings
            table.boolean("service_worker_enabled").defaultTo(true);
            table.boolean("lazy_loading_enabled").defaultTo(true);
            table.boolean("critical_css_enabled").defaultTo(true);
            table.boolean("resource_preloading_enabled").defaultTo(true);
            table.boolean("pwa_enabled").defaultTo(true);
            table.integer("cache_duration_hours").defaultTo(24);

            // AI/LLM optimization settings
            table.boolean("llms_txt_enabled").defaultTo(true);
            table.text("llms_custom_content").nullable();
            table.boolean("ai_optimization_enabled").defaultTo(true);
            table.boolean("faq_generation_enabled").defaultTo(true);

            // Analytics and monitoring
            table.boolean("seo_monitoring_enabled").defaultTo(true);
            table.boolean("performance_monitoring_enabled").defaultTo(true);
            table.string("google_analytics_id", 50).nullable();
            table.string("google_search_console_id", 100).nullable();

            // Backup and versioning
            table.text("backup_data").nullable(); // JSON string of previous settings
            table.integer("version").defaultTo(1);
            table.timestamp("last_backup_at").nullable();

            // Audit fields
            table
                .integer("updated_by_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("SET NULL");
            table
                .uuid("uuid")
                .notNullable()
                .defaultTo(knex.fn.uuid());
            table.timestamps(false, true);

            // Indexes
            table.index(["updated_by_id"]);
            table.index(["version"]);
        });

        // Insert default settings
        await knex("seo_settings").insert({
            default_title: "BOUNCE2BOUNCE - Live Music Events",
            default_description: "Discover exclusive live music events, connect with artists, and purchase tickets seamlessly. Join BOUNCE2BOUNCE for unforgettable music experiences.",
            default_keywords: "live music events, concert tickets, artist promotion, event discovery, music experiences, exclusive events, BOUNCE2BOUNCE",
            default_author: "BOUNCE2BOUNCE",
            default_og_image: "/images/og-image.png",
            twitter_handle: "@bounce2bounce",
            sitemap_enabled: true,
            sitemap_include_events: true,
            sitemap_include_homepage: true,
            sitemap_include_events_listing: true,
            sitemap_include_dashboard: false,
            robots_enabled: true,
            robots_disallowed_paths: "/admin/,/dashboard/,/api/,/login,/logout,/settings,/stats",
            robots_allowed_paths: "/,/event/,/events,/static/,/images/,/css/,/js/,/uploads/",
            structured_data_enabled: true,
            structured_data_events: true,
            structured_data_organization: true,
            structured_data_breadcrumbs: true,
            structured_data_faq: true,
            service_worker_enabled: true,
            lazy_loading_enabled: true,
            critical_css_enabled: true,
            resource_preloading_enabled: true,
            pwa_enabled: true,
            llms_txt_enabled: true,
            ai_optimization_enabled: true,
            faq_generation_enabled: true,
            seo_monitoring_enabled: true,
            performance_monitoring_enabled: true,
            version: 1
        });

        console.log('✅ SEO Settings table created with default values');
    }
}

/**
 * Create file backups table for robots.txt and llms.txt versioning
 */
async function createSEOFileBackupsTable(knex) {
    const hasTable = await knex.schema.hasTable("seo_file_backups");
    if (!hasTable) {
        await knex.schema.createTable("seo_file_backups", table => {
            table.increments("id").primary();
            table.string("file_name", 100).notNullable(); // 'robots.txt', 'llms.txt'
            table.text("file_content").notNullable();
            table.string("backup_type", 50).defaultTo("manual"); // 'manual', 'auto', 'pre_update'
            table.text("change_description").nullable();
            table.boolean("is_active").defaultTo(false); // Current active version
            table.integer("file_size").nullable();
            table.string("content_hash", 64).nullable(); // SHA-256 hash for integrity

            // Audit fields
            table
                .integer("created_by_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("SET NULL");
            table
                .uuid("uuid")
                .notNullable()
                .defaultTo(knex.fn.uuid());
            table.timestamps(false, true);

            // Indexes
            table.index(["file_name", "is_active"]);
            table.index(["created_by_id"]);
            table.index(["created_at"]);
        });

        console.log('✅ SEO File Backups table created');
    }
}

module.exports = {
    createSEOSettingsTable,
    createSEOFileBackupsTable
};