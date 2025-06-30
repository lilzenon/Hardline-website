/**
 * Manual migration script for ticket purchasing fields
 * Run this if you can't use `npm run migrate` due to connection issues
 */

const knex = require('./server/knex');

async function runTicketMigration() {
    console.log('🎫 Starting manual ticket fields migration...');
    
    try {
        // Check if the columns already exist
        const hasDisplayTickets = await knex.schema.hasColumn('events', 'display_tickets');
        const hasTicketPrice = await knex.schema.hasColumn('events', 'ticket_price');
        
        console.log('📋 Current schema status:');
        console.log(`  - display_tickets: ${hasDisplayTickets ? '✅ exists' : '❌ missing'}`);
        console.log(`  - ticket_price: ${hasTicketPrice ? '✅ exists' : '❌ missing'}`);
        
        if (!hasDisplayTickets || !hasTicketPrice) {
            console.log('🔧 Adding missing ticket fields...');
            
            await knex.schema.alterTable('events', function(table) {
                if (!hasDisplayTickets) {
                    table.boolean('display_tickets').defaultTo(false);
                    console.log('✅ Added display_tickets column');
                }
                
                if (!hasTicketPrice) {
                    table.string('ticket_price', 50).nullable();
                    console.log('✅ Added ticket_price column');
                }
            });
            
            console.log('🎉 Ticket fields migration completed successfully!');
        } else {
            console.log('ℹ️ All ticket fields already exist - no migration needed');
        }
        
        // Verify the migration
        const finalDisplayTickets = await knex.schema.hasColumn('events', 'display_tickets');
        const finalTicketPrice = await knex.schema.hasColumn('events', 'ticket_price');
        
        console.log('🔍 Final verification:');
        console.log(`  - display_tickets: ${finalDisplayTickets ? '✅' : '❌'}`);
        console.log(`  - ticket_price: ${finalTicketPrice ? '✅' : '❌'}`);
        
        if (finalDisplayTickets && finalTicketPrice) {
            console.log('🎊 Migration successful! You can now use ticket purchasing functionality.');
        } else {
            console.error('❌ Migration failed - some fields are still missing');
        }
        
    } catch (error) {
        console.error('🚨 Migration failed:', error.message);
        console.error('💡 Try running: npm run migrate');
        process.exit(1);
    } finally {
        await knex.destroy();
    }
}

// Run the migration
if (require.main === module) {
    runTicketMigration()
        .then(() => {
            console.log('✅ Script completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Script failed:', error);
            process.exit(1);
        });
}

module.exports = { runTicketMigration };
