const query = require("../queries");
const env = require("../env");
const seoUtils = require("../utils/seo.utils");
const aiUtils = require("../utils/ai-optimization.utils");

/**
 * Render public events listing page for SEO and discovery
 */
async function eventsListing(req, res) {
    try {
        console.log('🎵 Loading events listing page...');
        
        // Get all active events
        const activeEvents = await query.event.find({ 
            is_active: true 
        });
        
        // Sort by event date (upcoming first) or created date
        const sortedEvents = activeEvents.sort((a, b) => {
            const dateA = a.event_date ? new Date(a.event_date) : new Date(a.created_at);
            const dateB = b.event_date ? new Date(b.event_date) : new Date(b.created_at);
            return dateA - dateB;
        });
        
        // Generate SEO meta tags
        const metaTags = seoUtils.generateMetaTags({
            title: 'Live Music Events - HARDLINE',
            description: 'Discover upcoming live music events, concerts, and exclusive experiences. Browse our curated selection of artists and venues. Get tickets and join the music community.',
            url: '/events',
            keywords: 'live music events, concerts, tickets, artists, venues, music experiences, event listings',
            type: 'website'
        });
        
        // Generate structured data for events list, optimized for carousel eligibility
        const eventsListStructuredData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Live Music Events",
            "description": "Upcoming live music events and concerts",
            "numberOfItems": sortedEvents.length,
            "itemListElement": sortedEvents.map((event, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": seoUtils.buildCarouselEventItem(event)
            }))
        };
        
        // Generate AI-friendly content
        const aiContent = {
            page_type: 'events_listing',
            total_events: sortedEvents.length,
            events_summary: sortedEvents.map(event => ({
                title: event.title,
                artist: event.artist_name,
                date: event.event_date,
                location: event.event_address,
                description_summary: aiUtils.generateContentSummary(event.description, 150)
            })),
            platform_info: {
                name: 'HARDLINE',
                purpose: 'Live music event discovery and ticket sales',
                features: ['Event browsing', 'Ticket purchasing', 'Artist discovery']
            }
        };
        
        console.log(`📋 Events listing loaded: ${sortedEvents.length} active events`);
        
        res.render("events-listing", {
            title: "Live Music Events - HARDLINE",
            metaTags,
            events: sortedEvents,
            eventsListStructuredData: JSON.stringify(eventsListStructuredData),
            aiContent,
            totalEvents: sortedEvents.length,
            pageType: 'events-list'
        });
        
    } catch (error) {
        console.error('❌ Error loading events listing:', error);
        
        // Fallback response
        res.render("events-listing", {
            title: "Live Music Events - HARDLINE",
            events: [],
            totalEvents: 0,
            error: 'Unable to load events at this time. Please try again later.',
            pageType: 'events-list'
        });
    }
}

/**
 * Handle event search and filtering
 */
async function searchEvents(req, res) {
    try {
        const { q, artist, location, date } = req.query;
        
        console.log('🔍 Searching events with filters:', { q, artist, location, date });
        
        // Start with all active events
        let events = await query.event.find({ is_active: true });
        
        // Apply search filters
        if (q) {
            const searchTerm = q.toLowerCase();
            events = events.filter(event => 
                event.title.toLowerCase().includes(searchTerm) ||
                (event.description && event.description.toLowerCase().includes(searchTerm)) ||
                (event.artist_name && event.artist_name.toLowerCase().includes(searchTerm))
            );
        }
        
        if (artist) {
            const artistTerm = artist.toLowerCase();
            events = events.filter(event => 
                event.artist_name && event.artist_name.toLowerCase().includes(artistTerm)
            );
        }
        
        if (location) {
            const locationTerm = location.toLowerCase();
            events = events.filter(event => 
                event.event_address && event.event_address.toLowerCase().includes(locationTerm)
            );
        }
        
        if (date) {
            const searchDate = new Date(date);
            events = events.filter(event => {
                if (!event.event_date) return false;
                const eventDate = new Date(event.event_date);
                return eventDate.toDateString() === searchDate.toDateString();
            });
        }
        
        // Sort results
        events.sort((a, b) => {
            const dateA = a.event_date ? new Date(a.event_date) : new Date(a.created_at);
            const dateB = b.event_date ? new Date(b.event_date) : new Date(b.created_at);
            return dateA - dateB;
        });
        
        // Generate search-specific meta tags
        const searchQuery = q || artist || location || 'events';
        const metaTags = seoUtils.generateMetaTags({
            title: `${searchQuery} - Live Music Events | HARDLINE`,
            description: `Find ${searchQuery} events and concerts. Browse live music experiences, get tickets, and discover new artists on HARDLINE.`,
            url: `/events?${new URLSearchParams(req.query).toString()}`,
            keywords: `${searchQuery}, live music, concerts, events, tickets, HARDLINE`
        });
        
        console.log(`🎯 Search results: ${events.length} events found`);
        
        res.render("events-listing", {
            title: `${searchQuery} - Live Music Events | HARDLINE`,
            metaTags,
            events,
            totalEvents: events.length,
            searchQuery: q,
            filters: { artist, location, date },
            pageType: 'events-search'
        });
        
    } catch (error) {
        console.error('❌ Error searching events:', error);
        res.status(500).render("events-listing", {
            title: "Search Error - HARDLINE",
            events: [],
            totalEvents: 0,
            error: 'Search temporarily unavailable. Please try again later.',
            pageType: 'events-search'
        });
    }
}

module.exports = {
    eventsListing,
    searchEvents
};
