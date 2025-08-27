const knex = require('./server/knex');

async function testDatabaseSchema() {
    try {
        console.log('🔍 Testing database schema...');
        
        // Check if events table exists
        const eventsExists = await knex.schema.hasTable('events');
        console.log('Events table exists:', eventsExists);
        
        // Check if event_signups table exists
        const signupsExists = await knex.schema.hasTable('event_signups');
        console.log('Event_signups table exists:', signupsExists);
        
        if (eventsExists) {
            // Get events table info
            const eventsInfo = await knex('events').columnInfo();
            console.log('Events table columns:', Object.keys(eventsInfo));
        }
        
        if (signupsExists) {
            // Get event_signups table info
            const signupsInfo = await knex('event_signups').columnInfo();
            console.log('Event_signups table columns:', Object.keys(signupsInfo));
        } else {
            console.log('⚠️ Event_signups table does not exist - this could cause the stats error');
        }
        
        // Test creating a simple event
        console.log('🧪 Testing event creation...');
        const testEvent = {
            title: 'Test Event ' + Date.now(),
            slug: 'test-event-' + Date.now(),
            description: 'Test description',
            user_id: 1, // Assuming user ID 1 exists
            qr_code_identifier: 'TEST',
            qr_code_enabled: true
        };
        
        const [eventId] = await knex('events').insert(testEvent);
        console.log('✅ Test event created with ID:', eventId);
        
        // Test getting signup count for the new event
        const signupCount = await knex('event_signups')
            .where('event_id', eventId)
            .count('id as count')
            .first();
        console.log('✅ Signup count query successful:', signupCount);
        
        // Clean up test event
        await knex('events').where('id', eventId).del();
        console.log('🗑️ Test event cleaned up');
        
    } catch (error) {
        console.error('❌ Database test failed:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack
        });
    } finally {
        await knex.destroy();
    }
}

testDatabaseSchema();
