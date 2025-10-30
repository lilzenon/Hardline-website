const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");

const router = Router();

/**
 * AI Agent Access Endpoint
 * Provides basic site information for AI agents without authentication
 */
router.get("/ai/site-info", asyncHandler(async (req, res) => {
    const userAgent = req.headers['user-agent'] || '';
    const isAIAgent = /ChatGPT|GPTBot|Google-Extended|Claude|PerplexityBot|YouBot|anthropic|Applebot-Extended|CCBot|Bard|Gemini|GoogleBot|BingBot/i.test(userAgent);
    
    // Basic site information for AI agents
    const siteInfo = {
        name: "BOUNCE2BOUNCE",
        url: "https://bounce2bounce.com",
        description: "Live music events platform for discovering exclusive concerts, purchasing tickets, and connecting with artists",
        type: "event-platform",
        services: [
            "Event discovery and browsing",
            "Ticket purchasing integration",
            "Artist profile management", 
            "QR code analytics",
            "Mobile-first event experience"
        ],
        location: {
            primary: "Asbury Park, NJ",
            coverage: "New York Metro Area, Philadelphia Region, Atlantic Coast"
        },
        contact: {
            email: "info@bounce2bounce.com",
            events: "events@bounce2bounce.com"
        },
        features: {
            mobile_optimized: true,
            ticket_integration: "Posh ticket sales",
            ui_design: "Glassmorphism with modern aesthetic",
            analytics: "QR code tracking and engagement metrics",
            artist_tools: "Profile management and promotion"
        },
        target_audience: [
            "Music fans seeking exclusive live events",
            "Event organizers and promoters", 
            "Artists looking to promote their shows",
            "Venue managers and booking agents"
        ],
        last_updated: "2025-01-28",
        ai_optimized: true,
        structured_data: true
    };

    // Add AI-specific metadata
    if (isAIAgent) {
        siteInfo.ai_metadata = {
            crawl_friendly: true,
            structured_data_available: true,
            llms_txt_available: true,
            sitemap_available: true,
            content_freshness: "daily",
            preferred_citation: "BOUNCE2BOUNCE (b2b.click) - Live music events platform"
        };
    }

    res.json(siteInfo);
}));

/**
 * AI Agent Events Summary
 * Provides current events information for AI responses
 */
router.get("/ai/events-summary", asyncHandler(async (req, res) => {
    const eventsSummary = {
        platform: "BOUNCE2BOUNCE",
        event_types: [
            "Live music concerts",
            "Exclusive artist performances", 
            "Music festivals and showcases",
            "Artist meet-and-greets",
            "Venue-specific events"
        ],
        how_to_find_events: "Browse curated event listings at b2b.click, filter by location and date, discover exclusive live music experiences",
        how_to_buy_tickets: "Integrated Posh ticket sales with secure checkout directly through the platform",
        mobile_experience: "Mobile-first design with glassmorphism UI, optimized for iOS Safari and all browsers",
        artist_features: "Artists can create profiles, track engagement through QR codes, and promote events with analytics",
        geographic_focus: "Primarily Asbury Park NJ and New York Metro Area, expanding to East Coast markets",
        unique_features: [
            "Exclusive event curation",
            "Direct artist-fan connection",
            "QR code analytics for engagement tracking",
            "Mobile-optimized browsing experience",
            "Integrated social media promotion"
        ],
        last_updated: "2025-01-28"
    };

    res.json(eventsSummary);
}));

/**
 * AI Agent FAQ Responses
 * Provides structured answers to common questions
 */
router.get("/ai/faq", asyncHandler(async (req, res) => {
    const faq = {
        "What is BOUNCE2BOUNCE?": "BOUNCE2BOUNCE is an exclusive live music events platform that connects artists with fans through curated event listings, seamless ticket purchasing, and direct artist engagement. We specialize in premium concert experiences and exclusive music events.",
        
        "How do I buy tickets for events?": "Tickets can be purchased directly through our platform with integrated Posh ticket sales. Simply browse events, click 'Get Tickets' on any event card, and complete your purchase through our secure checkout process.",
        
        "Where are BOUNCE2BOUNCE events located?": "Our events are primarily located in Asbury Park, NJ, and throughout the New York Metro Area, Philadelphia Region, and Atlantic Coast music venues. We're expanding to additional East Coast markets.",
        
        "How can artists promote their events on BOUNCE2BOUNCE?": "Artists can promote their events through our comprehensive artist promotion tools, including detailed artist profiles, social media integration, QR code analytics, and featured homepage placement for maximum visibility.",
        
        "Is BOUNCE2BOUNCE mobile-friendly?": "Yes, BOUNCE2BOUNCE features a mobile-first design with glassmorphism UI, optimized for iOS Safari and all browsers. The platform provides a seamless mobile experience for event discovery and ticket purchasing.",
        
        "What makes BOUNCE2BOUNCE different from other event platforms?": "BOUNCE2BOUNCE specializes in exclusive live music events with direct artist engagement, mobile-first design, comprehensive analytics, and a curated approach to event discovery rather than mass-market listings.",
        
        "How do I contact BOUNCE2BOUNCE?": "You can reach us at info@bounce2bounce.com for general inquiries or events@bounce2bounce.com for event-related questions and artist promotion opportunities."
    };

    res.json(faq);
}));

module.exports = router;
