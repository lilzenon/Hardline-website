const knex = require('./server/knex');

async function testDatabaseTables() {
    try {
        console.log('🔍 Testing database tables...');
        
        // Check if event_qr_codes table exists
        const hasQrCodesTable = await knex.schema.hasTable('event_qr_codes');
        console.log('📊 event_qr_codes table exists:', hasQrCodesTable);
        
        if (hasQrCodesTable) {
            // Get table info
            const columns = await knex('event_qr_codes').columnInfo();
            console.log('📊 event_qr_codes columns:', Object.keys(columns));
            
            // Try to count records
            const count = await knex('event_qr_codes').count('* as count').first();
            console.log('📊 event_qr_codes record count:', count.count);
        }
        
        // Check if events table exists and has records
        const hasEventsTable = await knex.schema.hasTable('events');
        console.log('📊 events table exists:', hasEventsTable);
        
        if (hasEventsTable) {
            const eventCount = await knex('events').count('* as count').first();
            console.log('📊 events record count:', eventCount.count);
            
            // Get a sample event
            const sampleEvent = await knex('events').first();
            if (sampleEvent) {
                console.log('📊 Sample event ID:', sampleEvent.id);
            }
        }
        
        console.log('✅ Database test completed');
        
    } catch (error) {
        console.error('🚨 Database test failed:', error.message);
        console.error('🚨 Error details:', error);
    } finally {
        await knex.destroy();
    }
}

// Run the test
testDatabaseTables();
