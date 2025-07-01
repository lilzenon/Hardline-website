const knex = require('./server/knex');

async function testEvent22() {
    try {
        console.log('🔍 Testing event ID 22...');
        
        // Check if event 22 exists
        const event22 = await knex('events').where('id', 22).first();
        console.log('📊 Event 22 exists:', !!event22);
        
        if (event22) {
            console.log('📊 Event 22 details:', {
                id: event22.id,
                title: event22.title,
                user_id: event22.user_id
            });
        }
        
        // List all events
        const allEvents = await knex('events').select('id', 'title', 'user_id');
        console.log('📊 All events:');
        allEvents.forEach(event => {
            console.log(`  - ID: ${event.id}, Title: ${event.title}, User: ${event.user_id}`);
        });
        
        // Check existing QR codes
        const qrCodes = await knex('event_qr_codes').select('*');
        console.log('📊 Existing QR codes:');
        qrCodes.forEach(qr => {
            console.log(`  - ID: ${qr.id}, Event: ${qr.event_id}, Name: ${qr.name}, Identifier: ${qr.identifier}`);
        });
        
        console.log('✅ Event test completed');
        
    } catch (error) {
        console.error('🚨 Event test failed:', error.message);
        console.error('🚨 Error details:', error);
    } finally {
        await knex.destroy();
    }
}

// Run the test
testEvent22();
