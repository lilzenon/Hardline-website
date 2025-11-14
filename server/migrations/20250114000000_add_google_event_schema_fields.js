/**
 * Add Google Event Schema Required Fields to Events Table
 * 
 * This migration adds all fields required for Google Event structured data:
 * - Event end date (endDate)
 * - Performer information (performer, performer_type)
 * - Detailed venue location (venue_street_address, venue_city, venue_state, venue_postal_code, venue_country)
 * - Ticket pricing (ticket_price_amount, ticket_price_currency, ticket_availability, ticket_sale_start_date)
 * - Event status (event_status)
 * - Image metadata (image_alt_text, image_title, image_caption)
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🎫 Adding Google Event Schema fields to events table...');
    
    try {
        // Check which columns already exist
        const hasEventEndDate = await knex.schema.hasColumn('events', 'event_end_date');
        const hasPerformerType = await knex.schema.hasColumn('events', 'performer_type');
        const hasVenueStreetAddress = await knex.schema.hasColumn('events', 'venue_street_address');
        const hasVenueCity = await knex.schema.hasColumn('events', 'venue_city');
        const hasVenueState = await knex.schema.hasColumn('events', 'venue_state');
        const hasVenuePostalCode = await knex.schema.hasColumn('events', 'venue_postal_code');
        const hasVenueCountry = await knex.schema.hasColumn('events', 'venue_country');
        const hasTicketPriceAmount = await knex.schema.hasColumn('events', 'ticket_price_amount');
        const hasTicketPriceCurrency = await knex.schema.hasColumn('events', 'ticket_price_currency');
        const hasTicketAvailability = await knex.schema.hasColumn('events', 'ticket_availability');
        const hasTicketSaleStartDate = await knex.schema.hasColumn('events', 'ticket_sale_start_date');
        const hasEventStatus = await knex.schema.hasColumn('events', 'event_status');
        const hasImageAltText = await knex.schema.hasColumn('events', 'image_alt_text');
        const hasImageTitle = await knex.schema.hasColumn('events', 'image_title');
        const hasImageCaption = await knex.schema.hasColumn('events', 'image_caption');
        
        // Add missing columns
        await knex.schema.alterTable('events', function(table) {
            // Event end date (required by Google)
            if (!hasEventEndDate) {
                table.timestamp('event_end_date').nullable();
                console.log('✅ Added event_end_date column');
            }
            
            // Performer information (required by Google)
            if (!hasPerformerType) {
                table.string('performer_type', 50).nullable().defaultTo('Person');
                console.log('✅ Added performer_type column (default: "Person")');
            }
            
            // Detailed venue location (required by Google for location.address)
            if (!hasVenueStreetAddress) {
                table.string('venue_street_address', 200).nullable();
                console.log('✅ Added venue_street_address column');
            }
            
            if (!hasVenueCity) {
                table.string('venue_city', 100).nullable();
                console.log('✅ Added venue_city column');
            }
            
            if (!hasVenueState) {
                table.string('venue_state', 50).nullable();
                console.log('✅ Added venue_state column');
            }
            
            if (!hasVenuePostalCode) {
                table.string('venue_postal_code', 20).nullable();
                console.log('✅ Added venue_postal_code column');
            }
            
            if (!hasVenueCountry) {
                table.string('venue_country', 2).nullable().defaultTo('US');
                console.log('✅ Added venue_country column (default: "US")');
            }
            
            // Ticket pricing information (required by Google for offers)
            if (!hasTicketPriceAmount) {
                table.decimal('ticket_price_amount', 10, 2).nullable();
                console.log('✅ Added ticket_price_amount column');
            }
            
            if (!hasTicketPriceCurrency) {
                table.string('ticket_price_currency', 3).nullable().defaultTo('USD');
                console.log('✅ Added ticket_price_currency column (default: "USD")');
            }
            
            if (!hasTicketAvailability) {
                table.string('ticket_availability', 50).nullable().defaultTo('InStock');
                console.log('✅ Added ticket_availability column (default: "InStock")');
            }
            
            if (!hasTicketSaleStartDate) {
                table.timestamp('ticket_sale_start_date').nullable();
                console.log('✅ Added ticket_sale_start_date column');
            }
            
            // Event status (recommended by Google)
            if (!hasEventStatus) {
                table.string('event_status', 100).nullable().defaultTo('https://schema.org/EventScheduled');
                console.log('✅ Added event_status column (default: "https://schema.org/EventScheduled")');
            }
            
            // Image metadata (recommended by Google for ImageObject)
            if (!hasImageAltText) {
                table.text('image_alt_text').nullable();
                console.log('✅ Added image_alt_text column');
            }
            
            if (!hasImageTitle) {
                table.string('image_title', 200).nullable();
                console.log('✅ Added image_title column');
            }
            
            if (!hasImageCaption) {
                table.text('image_caption').nullable();
                console.log('✅ Added image_caption column');
            }
        });
        
        // Backfill data from existing fields where possible
        console.log('🔄 Backfilling data from existing fields...');
        
        // Backfill venue_street_address from event_address
        if (!hasVenueStreetAddress) {
            await knex.raw(`
                UPDATE events 
                SET venue_street_address = event_address 
                WHERE event_address IS NOT NULL 
                AND venue_street_address IS NULL
            `);
            console.log('✅ Backfilled venue_street_address from event_address');
        }
        
        // Backfill ticket_sale_start_date from created_at
        if (!hasTicketSaleStartDate) {
            await knex.raw(`
                UPDATE events 
                SET ticket_sale_start_date = created_at 
                WHERE created_at IS NOT NULL 
                AND ticket_sale_start_date IS NULL
            `);
            console.log('✅ Backfilled ticket_sale_start_date from created_at');
        }
        
        // Backfill event_end_date (add 4 hours to event_datetime_utc or event_date)
        if (!hasEventEndDate) {
            await knex.raw(`
                UPDATE events 
                SET event_end_date = event_datetime_utc + INTERVAL '4 hours'
                WHERE event_datetime_utc IS NOT NULL 
                AND event_end_date IS NULL
            `);
            console.log('✅ Backfilled event_end_date from event_datetime_utc + 4 hours');
            
            await knex.raw(`
                UPDATE events 
                SET event_end_date = event_date + INTERVAL '4 hours'
                WHERE event_date IS NOT NULL 
                AND event_datetime_utc IS NULL
                AND event_end_date IS NULL
            `);
            console.log('✅ Backfilled event_end_date from event_date + 4 hours');
        }
        
        // Backfill image_alt_text from title
        if (!hasImageAltText) {
            await knex.raw(`
                UPDATE events 
                SET image_alt_text = title 
                WHERE title IS NOT NULL 
                AND image_alt_text IS NULL
            `);
            console.log('✅ Backfilled image_alt_text from title');
        }
        
        console.log('🎉 Google Event Schema fields migration completed successfully');
        
    } catch (error) {
        console.error('❌ Error adding Google Event Schema fields:', error);
        throw error;
    }
};

/**
 * Remove Google Event Schema fields from events table
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    return knex.schema.alterTable('events', function(table) {
        table.dropColumn('event_end_date');
        table.dropColumn('performer_type');
        table.dropColumn('venue_street_address');
        table.dropColumn('venue_city');
        table.dropColumn('venue_state');
        table.dropColumn('venue_postal_code');
        table.dropColumn('venue_country');
        table.dropColumn('ticket_price_amount');
        table.dropColumn('ticket_price_currency');
        table.dropColumn('ticket_availability');
        table.dropColumn('ticket_sale_start_date');
        table.dropColumn('event_status');
        table.dropColumn('image_alt_text');
        table.dropColumn('image_title');
        table.dropColumn('image_caption');
    });
};

