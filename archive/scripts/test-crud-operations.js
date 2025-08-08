#!/usr/bin/env node

const knex = require("knex");
const env = require("../server/env");

async function testCRUDOperations() {
    console.log('🧪 Testing CRUD Operations for Events');
    console.log('=====================================');

    let db;
    try {
        // Connect to database
        db = knex({
            client: 'pg',
            connection: {
                host: env.DB_HOST,
                port: env.DB_PORT,
                user: env.DB_USER,
                password: env.DB_PASSWORD,
                database: env.DB_NAME,
                ssl: env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
            }
        });
        await db.raw('SELECT 1');
        console.log('✅ Database connected');

        // Test CREATE operation
        console.log('\n📝 Testing CREATE operation...');
        const testEvent = {
            title: 'Test Event CRUD',
            slug: 'test-event-crud-' + Date.now(),
            description: 'Test event for CRUD operations',
            user_id: 1,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        };

        const [eventId] = await db('events').insert(testEvent).returning('id');
        console.log(`✅ Created event with ID: ${eventId}`);

        // Test READ operation
        console.log('\n📖 Testing READ operation...');
        const createdEvent = await db('events').where('id', eventId).first();
        console.log(`✅ Read event: ${createdEvent.title} (${createdEvent.slug})`);

        // Test UPDATE operation
        console.log('\n✏️ Testing UPDATE operation...');
        const updateData = {
            title: 'Updated Test Event CRUD',
            description: 'Updated description for CRUD test',
            updated_at: new Date()
        };

        await db('events').where('id', eventId).update(updateData);
        const updatedEvent = await db('events').where('id', eventId).first();
        console.log(`✅ Updated event: ${updatedEvent.title}`);

        // Test event signup CREATE
        console.log('\n👥 Testing Event Signup CREATE...');
        const testSignup = {
            event_id: eventId,
            email: 'test-crud@example.com',
            name: 'Test CRUD User',
            ip_address: '127.0.0.1',
            created_at: new Date(),
            updated_at: new Date()
        };

        const [signupId] = await db('event_signups').insert(testSignup).returning('id');
        console.log(`✅ Created signup with ID: ${signupId}`);

        // Test event with signup count
        console.log('\n📊 Testing Event with Signup Count...');
        const eventWithStats = await db('events as e')
            .select([
                'e.*',
                db.raw('COALESCE(COUNT(es.id), 0) as signup_count')
            ])
            .leftJoin('event_signups as es', 'e.id', 'es.event_id')
            .where('e.id', eventId)
            .groupBy('e.id')
            .first();

        console.log(`✅ Event with stats: ${eventWithStats.title} (${eventWithStats.signup_count} signups)`);

        // Test DELETE operations (cleanup)
        console.log('\n🗑️ Testing DELETE operations...');

        // Delete signup first (foreign key constraint)
        await db('event_signups').where('id', signupId).del();
        console.log(`✅ Deleted signup with ID: ${signupId}`);

        // Delete event
        await db('events').where('id', eventId).del();
        console.log(`✅ Deleted event with ID: ${eventId}`);

        // Verify deletion
        const deletedEvent = await db('events').where('id', eventId).first();
        if (!deletedEvent) {
            console.log('✅ Event deletion verified');
        } else {
            console.log('❌ Event deletion failed');
        }

        console.log('\n🎉 All CRUD operations completed successfully!');

    } catch (error) {
        console.error('❌ CRUD test failed:', error.message);
        process.exit(1);
    } finally {
        if (db) {
            await db.destroy();
            console.log('🔌 Database connection closed');
        }
    }
}

// Run the test
testCRUDOperations();