#!/usr/bin/env node

/**
 * Verify Keywords Table Structure
 * Checks if the social_keywords table exists and has the correct columns
 */

const knex = require("../server/knex");

async function verifyKeywordsTable() {
    try {
        console.log('🔍 Verifying social_keywords table structure...');
        
        // Check if table exists
        const tableExists = await knex.schema.hasTable('social_keywords');
        console.log('📋 Table exists:', tableExists);
        
        if (!tableExists) {
            console.log('❌ social_keywords table does not exist!');
            console.log('💡 Run: npm run migrate');
            process.exit(1);
        }
        
        // Get table info
        const columns = await knex('social_keywords').columnInfo();
        console.log('📊 Table columns:');
        Object.keys(columns).forEach(col => {
            console.log(`  - ${col}: ${columns[col].type}`);
        });
        
        // Check for required columns
        const requiredColumns = [
            'id', 'keyword', 'event_id', 'keyword_type', 
            'created_by_user_id', 'total_triggers', 'total_responses_sent'
        ];
        
        const missingColumns = requiredColumns.filter(col => !columns[col]);
        
        if (missingColumns.length > 0) {
            console.log('❌ Missing required columns:', missingColumns);
            console.log('💡 Run: npm run migrate');
            process.exit(1);
        }
        
        // Test a simple query
        console.log('🧪 Testing basic query...');
        const count = await knex('social_keywords').count('* as count').first();
        console.log('📈 Current keyword count:', count.count);
        
        // Test with event_id filter
        console.log('🧪 Testing event_id filter...');
        const eventKeywords = await knex('social_keywords')
            .where('event_id', 22)
            .where('keyword_type', 'instagram');
        console.log('📈 Keywords for event 22:', eventKeywords.length);
        
        console.log('✅ social_keywords table verification complete!');
        
    } catch (error) {
        console.error('❌ Error verifying table:', error);
        console.error('❌ Error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            sqlState: error.sqlState
        });
        process.exit(1);
    } finally {
        await knex.destroy();
    }
}

// Run verification
verifyKeywordsTable();
