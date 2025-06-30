const { createSEOSettingsTable, createSEOFileBackupsTable } = require("../models/seo_settings.model");

/**
 * Create SEO settings and file backup tables
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🔧 Creating SEO settings tables...');
    
    try {
        await createSEOSettingsTable(knex);
        await createSEOFileBackupsTable(knex);
        
        console.log('🎉 SEO settings tables created successfully');
    } catch (error) {
        console.error('❌ Error creating SEO settings tables:', error);
        throw error;
    }
};

/**
 * Drop SEO settings tables
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Dropping SEO settings tables...');
    
    try {
        await knex.schema.dropTableIfExists('seo_file_backups');
        await knex.schema.dropTableIfExists('seo_settings');
        
        console.log('✅ SEO settings tables dropped');
    } catch (error) {
        console.error('❌ Error dropping SEO settings tables:', error);
        throw error;
    }
};
