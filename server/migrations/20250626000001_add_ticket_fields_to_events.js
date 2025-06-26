/**
 * Add ticket purchasing fields to events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🎫 Adding ticket fields to events table...');

    try {
        // Check if the columns already exist to avoid errors
        const hasDisplayTickets = await knex.schema.hasColumn('events', 'display_tickets');
        const hasTicketPrice = await knex.schema.hasColumn('events', 'ticket_price');

        if (!hasDisplayTickets || !hasTicketPrice) {
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

            console.log('✅ Added ticket fields to events table');
        } else {
            console.log('ℹ️ Ticket fields already exist in events table');
        }

        console.log('🎉 Ticket fields migration completed successfully');

    } catch (error) {
        console.error('❌ Error adding ticket fields to events table:', error);
        throw error;
    }
};

/**
 * Remove ticket fields from events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Removing ticket fields from events table...');

    try {
        await knex.schema.alterTable('events', function(table) {
            table.dropColumn('display_tickets');
            table.dropColumn('ticket_price');
        });

        console.log('✅ Ticket fields removed from events table');

    } catch (error) {
        console.error('❌ Error removing ticket fields from events table:', error);
        throw error;
    }
};