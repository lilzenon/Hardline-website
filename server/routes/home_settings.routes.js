const { Router } = require("express");

const validators = require("../handlers/validators.handler");
const helpers = require("../handlers/helpers.handler");
const asyncHandler = require("../utils/asyncHandler");
const locals = require("../handlers/locals.handler");
const homeSettings = require("../handlers/home_settings.handler");
const auth = require("../handlers/auth.handler");
const query = require("../queries");

const router = Router();

// Admin routes for home settings management
router.get(
    "/admin",
    locals.viewTemplate("partials/admin/home_settings/table"),
    asyncHandler(auth.apikey),
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    asyncHandler(homeSettings.getAdmin)
);

router.post(
    "/admin",
    homeSettings.upload.single('event_image'),
    locals.viewTemplate("partials/admin/home_settings/form"),
    asyncHandler(auth.apikey),
    asyncHandler(auth.jwt),
    asyncHandler(auth.admin),
    validators.updateHomeSettings,
    asyncHandler(helpers.verify),
    asyncHandler(homeSettings.update)
);

// Public API route for getting home settings (for the home page)
router.get(
    "/",
    asyncHandler(homeSettings.get)
);

// 🚀 HOMEPAGE REFRESH ENDPOINT - Get updated homepage data
router.get(
    "/refresh",
    asyncHandler(homeSettings.getHomepageData)
);

// 🚀 HOMEPAGE DATA ENDPOINT - For React app
router.get(
    "/homepage-data",
    asyncHandler(homeSettings.getHomepageData)
);

// 🚀 DEBUG ENDPOINT - Check events status
router.get(
    "/debug-events",
    asyncHandler(async(req, res) => {
        try {
            const allEvents = await query.event.find({});
            const featuredEvents = await query.event.getFeaturedEvents({ limit: 10 });

            res.json({
                totalEvents: allEvents.length,
                featuredEvents: featuredEvents.length,
                allEventsData: allEvents.map(event => ({
                    id: event.id,
                    title: event.title,
                    show_on_homepage: event.show_on_homepage,
                    is_active: event.is_active,
                    created_at: event.created_at
                })),
                featuredEventsData: featuredEvents.map(event => ({
                    id: event.id,
                    title: event.title,
                    show_on_homepage: event.show_on_homepage,
                    is_active: event.is_active
                }))
            });
        } catch (error) {
            console.error('Debug events error:', error);
            res.status(500).json({ error: error.message });
        }
    })
);

// 🚀 TEST ENDPOINT - Enable homepage for first event
router.get(
    "/test-enable-homepage",
    asyncHandler(async(req, res) => {
        try {
            // Get the first event
            const firstEvent = await query.event.find({}, { limit: 1 });

            if (firstEvent.length === 0) {
                return res.json({ error: "No events found to test with" });
            }

            // Enable show_on_homepage for the first event and add event data
            await query.event.update(firstEvent[0].id, {
                show_on_homepage: true,
                is_active: true,
                artist_name: "Test Artist",
                event_date: new Date("2025-07-04T20:00:00"),
                event_address: "123 Test Venue, Test City, NY"
            });

            // Get updated data
            const updatedEvent = await query.event.findOne({ id: firstEvent[0].id });
            const featuredEvents = await query.event.getFeaturedEvents({ limit: 10 });

            res.json({
                message: "Test completed - enabled homepage for first event with event data",
                updatedEvent: {
                    id: updatedEvent.id,
                    title: updatedEvent.title,
                    artist_name: updatedEvent.artist_name,
                    event_date: updatedEvent.event_date,
                    event_address: updatedEvent.event_address,
                    show_on_homepage: updatedEvent.show_on_homepage,
                    is_active: updatedEvent.is_active
                },
                featuredEventsCount: featuredEvents.length,
                featuredEvents: featuredEvents.map(drop => ({
                    id: drop.id,
                    title: drop.title,
                    artist_name: drop.artist_name,
                    event_date: drop.event_date,
                    event_address: drop.event_address,
                    show_on_homepage: drop.show_on_homepage,
                    is_active: drop.is_active
                }))
            });
        } catch (error) {
            console.error('Test enable homepage error:', error);
            res.status(500).json({ error: error.message });
        }
    })
);

// 🚀 COMPREHENSIVE TEST - Create sample events with homepage enabled
router.get(
    "/test-create-sample-drops",
    asyncHandler(async(req, res) => {
        try {
            // Get the first user to assign drops to
            const firstUser = await query.user.find({}, { limit: 1 });
            const userId = firstUser.length > 0 ? firstUser[0].id : 1; // Fallback to user ID 1

            console.log(`🔧 Creating sample events with user_id: ${userId}`);

            const sampleEvents = [{
                    title: "Summer Music Festival 2025",
                    description: "Join us for an amazing summer music festival featuring top artists!",
                    slug: "summer-music-festival-2025",
                    artist_name: "Various Artists",
                    event_date: new Date("2025-07-15T18:00:00"),
                    event_address: "Central Park, New York, NY",
                    background_color: "#ff6b6b",
                    button_text: "Get Tickets",
                    show_on_homepage: true,
                    is_active: true,
                    user_id: userId
                },
                {
                    title: "Electronic Dance Night",
                    description: "Experience the best electronic music with world-class DJs!",
                    slug: "electronic-dance-night",
                    artist_name: "DJ Awesome",
                    event_date: new Date("2025-08-20T21:00:00"),
                    event_address: "Brooklyn Warehouse, Brooklyn, NY",
                    background_color: "#4ecdc4",
                    button_text: "Join the Party",
                    show_on_homepage: true,
                    is_active: true,
                    user_id: userId
                },
                {
                    title: "Jazz & Blues Evening",
                    description: "A sophisticated evening of jazz and blues music.",
                    slug: "jazz-blues-evening",
                    artist_name: "The Jazz Collective",
                    event_date: new Date("2025-09-10T19:30:00"),
                    event_address: "Blue Note, Manhattan, NY",
                    background_color: "#45b7d1",
                    button_text: "Reserve Seat",
                    show_on_homepage: true,
                    is_active: true,
                    user_id: userId
                }
            ];

            const createdEvents = [];
            for (const eventData of sampleEvents) {
                try {
                    // Check if drop with this slug already exists
                    const existingEvent = await query.event.findBySlug(eventData.slug);
                    if (!existingEvent) {
                        const newEvent = await query.event.create(eventData);
                        createdEvents.push(newEvent);
                        console.log(`✅ Created sample event: ${eventData.title} with user_id: ${userId}`);
                    } else {
                        // Update existing event to ensure it has the correct flags
                        await query.event.update(existingEvent.id, {
                            show_on_homepage: true,
                            is_active: true,
                            artist_name: eventData.artist_name,
                            event_date: eventData.event_date,
                            event_address: eventData.event_address
                        });
                        const updatedEvent = await query.event.findOne({ id: existingEvent.id });
                        createdEvents.push(updatedEvent);
                        console.log(`🔄 Updated existing event: ${eventData.title}`);
                    }
                } catch (eventError) {
                    console.error(`❌ Error creating/updating drop ${eventData.title}:`, eventError);
                }
            }

            // Get featured events after creation
            const featuredEvents = await query.event.getFeaturedEvents({ limit: 10 });

            console.log(`🎯 Test completed: ${createdEvents.length} events processed, ${featuredEvents.length} featured events found`);

            res.json({
                message: `Sample events created/verified successfully`,
                userId: userId,
                createdCount: createdEvents.length,
                featuredEventsCount: featuredEvents.length,
                createdEvents: createdEvents.map(drop => ({
                    id: drop.id,
                    title: drop.title,
                    artist_name: drop.artist_name,
                    event_date: drop.event_date,
                    event_address: drop.event_address,
                    show_on_homepage: drop.show_on_homepage,
                    is_active: drop.is_active,
                    user_id: drop.user_id
                })),
                featuredEvents: featuredEvents.map(drop => ({
                    id: drop.id,
                    title: drop.title,
                    artist_name: drop.artist_name,
                    event_date: drop.event_date,
                    event_address: drop.event_address,
                    show_on_homepage: drop.show_on_homepage,
                    is_active: drop.is_active,
                    user_id: drop.user_id
                }))
            });
        } catch (error) {
            console.error('Test create sample events error:', error);
            res.status(500).json({ error: error.message });
        }
    })
);

// 🚀 DIRECT TEST - Check what homepage render receives
router.get(
    "/test-homepage-data",
    asyncHandler(async(req, res) => {
        try {
            // Simulate the exact same data fetching as the homepage render
            const homeSettings = await query.homeSettings.get();
            const featuredEvents = await query.event.getFeaturedEvents({ limit: 6 });

            console.log(`🏠 Homepage data test:`, {
                homeSettingsExists: !!homeSettings,
                featuredEventsCount: featuredEvents.length,
                featuredEventsData: featuredEvents
            });

            res.json({
                message: "Homepage data test completed",
                homeSettings: {
                    event_title: homeSettings.event_title,
                    artist_name: homeSettings.artist_name,
                    event_date: homeSettings.event_date,
                    event_address: homeSettings.event_address
                },
                featuredEvents: featuredEvents,
                featuredEventsCount: featuredEvents.length,
                totalCards: 1 + featuredEvents.length
            });
        } catch (error) {
            console.error('Test homepage data error:', error);
            res.status(500).json({ error: error.message });
        }
    })
);

module.exports = router;