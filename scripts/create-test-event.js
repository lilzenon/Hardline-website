#!/usr/bin/env node

const path = require('path');
const knex = require('../server/knex');
const { generateSlug } = require('../server/models/event.model');

async function createTestevent() {
    try {
        console.log('🚀 Creating test event for Laylo design...');

        // Check if test event already exists
        const existingevent = await knex('events').where('slug', 'laylo-test-event').first();
        if (existingevent) {
            console.log('✅ Test event already exists!');
            console.log(`🔗 View at: http://localhost:3000/event/${existingevent.slug}`);
            return existingevent;
        }

        // Create a test user if none exists
        let testUser = await knex('users').first();
        if (!testUser) {
            console.log('👤 Creating test user...');
            const userResult = await knex('users').insert({
                email: 'test@example.com',
                password: 'hashedpassword', // This would be properly hashed in real app
                verified: true,
                created_at: new Date(),
                updated_at: new Date()
            });
            const userId = Array.isArray(userResult) ? userResult[0] : userResult;
            testUser = await knex('users').where('id', userId).first();
            console.log('✅ Test user created');
        }

        // Create test event with Laylo-style data
        const eventData = {
            title: 'BOUNCE2BOUNCE',
            description: 'Get notified when this exclusive event goes live!',
            slug: 'laylo-test-event',
            cover_image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
            background_color: '#DC2626',
            text_color: '#FFFFFF',
            button_color: '#EF4444',
            button_text: 'Buy Tickets',
            button_title: 'Button Title',
            display_tickets: true,
            is_active: true,
            collect_email: true,
            collect_phone: true,
            user_id: testUser.id,
            // Platform links for testing
            instagram_link: 'https://instagram.com/bounce2bounce',
            twitter_link: 'https://twitter.com/bounce2bounce',
            spotify_link: 'https://open.spotify.com/artist/bounce2bounce',
            youtube_link: 'https://youtube.com/@bounce2bounce',
            created_at: new Date(),
            updated_at: new Date()
        };

        const result = await knex('events').insert(eventData);
        const eventId = Array.isArray(result) ? result[0] : result;
        const createdevent = await knex('events').where('id', eventId).first();

        console.log('✅ Test event created successfully!');
        console.log(`📋 event ID: ${createdevent.id}`);
        console.log(`🏷️ Title: ${createdevent.title}`);
        console.log(`🔗 Slug: ${createdevent.slug}`);
        console.log(`🌐 View at: http://localhost:3000/event/${createdevent.slug}`);
        console.log('');
        console.log('🎨 This event showcases the Laylo-inspired design with:');
        console.log('   • Hero section with cover image');
        console.log('   • "YOUR INVITE" title section');
        console.log('   • Contact form with inlaid RSVP button');
        console.log('   • Platform links');
        console.log('   • Red gradient background');

        return createdevent;

    } catch (error) {
        console.error('❌ Error creating test event:', error);
        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    createTestevent()
        .then(() => {
            console.log('🎉 Test event creation complete!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Failed to create test event:', error);
            process.exit(1);
        });
}

module.exports = { createTestevent };