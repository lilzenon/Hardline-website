/**
 * Simple database connection test
 */

const knex = require('./server/knex');

async function testConnection() {
    console.log('🔍 Testing database connection...');
    
    try {
        // Try a simple query
        const result = await knex.raw('SELECT 1 as test');
        console.log('✅ Database connection successful!');
        console.log('📋 Test result:', result.rows || result);
        
        // Check if events table exists
        const hasEventsTable = await knex.schema.hasTable('events');
        console.log(`📊 Events table exists: ${hasEventsTable ? '✅' : '❌'}`);
        
        if (hasEventsTable) {
            // Check current columns
            const columns = await knex('events').columnInfo();
            console.log('📋 Current events table columns:');
            Object.keys(columns).forEach(col => {
                console.log(`  - ${col}: ${columns[col].type}`);
            });
            
            // Check specifically for ticket fields
            const hasDisplayTickets = await knex.schema.hasColumn('events', 'display_tickets');
            const hasTicketPrice = await knex.schema.hasColumn('events', 'ticket_price');
            
            console.log('\n🎫 Ticket fields status:');
            console.log(`  - display_tickets: ${hasDisplayTickets ? '✅ exists' : '❌ missing'}`);
            console.log(`  - ticket_price: ${hasTicketPrice ? '✅ exists' : '❌ missing'}`);
        }
        
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('🔧 Error details:', error.code);
        
        // Check if it's a password issue
        if (error.message.includes('password authentication failed')) {
            console.log('\n💡 Possible solutions:');
            console.log('1. Update DB_PASSWORD in .env file');
            console.log('2. Check if PostgreSQL service is running');
            console.log('3. Verify database credentials');
        }
    } finally {
        await knex.destroy();
    }
}

// Run the test
testConnection()
    .then(() => {
        console.log('\n✅ Connection test completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Connection test failed:', error);
        process.exit(1);
    });
