const { Router } = require("express");
const { validationResult } = require("express-validator");

const events = require("../handlers/events.handler");
const asyncHandler = require("../utils/asyncHandler");
const { CustomError } = require("../utils");
const query = require("../queries");
const { renderReactPage } = require("../utils/ssr.utils");
const seoUtils = require("../utils/seo.utils");
const { getSiteDomain } = require("../utils/site-domain.util");
const EventLandingPage = require("../components/EventLandingPage.jsx");

const router = Router();

/**
 * Bot detection helper
 * Detects if the request is from a search engine crawler or social media bot
 */
function isBot(req) {
    const userAgent = (req.headers['user-agent'] || '').toLowerCase();
    const botPatterns = [
        'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
        'facebookexternalhit', 'twitterbot', 'linkedinbot', 'whatsapp', 'telegrambot',
        'slackbot', 'discordbot', 'applebot', 'ia_archiver', 'archive.org_bot'
    ];
    return botPatterns.some(pattern => userAgent.includes(pattern));
}

/**
 * Generate Google Event structured data (schema.org/Event) for SEO
 *
 * This function creates a complete Event schema with all required and recommended fields
 * according to Google's Event structured data guidelines.
 *
 * @param {Object} event - Event object from database
 * @param {string} defaultDomain - Default domain (e.g., 'hardline.events')
 * @returns {Object} Event schema object ready for JSON-LD serialization
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/event
 */
function generateEventSchema(event, defaultDomain) {
    const eventUrl = `https://${defaultDomain}/event/${event.slug}`;

    // Build Event schema with all required and recommended fields
    const schema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.title,
        "description": event.description || `Join us for ${event.title}${event.artist_name ? ` featuring ${event.artist_name}` : ''}`,
        "url": eventUrl
    };

    // IMAGE: Multiple aspect ratios (1x1, 4x3, 16x9) - RECOMMENDED by Google
    // ✅ GOOGLE SEO FIX: Always provide image with fallback to HARDLINE logo
    const eventImage = event.cover_image || `https://${defaultDomain}/images/bounce-logo.svg`;
    schema.image = [
        eventImage, // Original
        eventImage, // 4x3 variant (TODO: use actual variant when available)
        eventImage  // 16x9 variant (TODO: use actual variant when available)
    ];

    // START DATE: ISO 8601 with timezone - REQUIRED
    // ✅ GOOGLE SEO FIX: startDate is REQUIRED for Event rich results - always provide with fallback
    if (event.event_datetime_utc) {
        schema.startDate = event.event_datetime_utc;
    } else if (event.event_date) {
        // Fallback to event_date if event_datetime_utc is not populated
        schema.startDate = event.event_date;
    } else {
        // ✅ CRITICAL FIX: If no date is set, use created_at or current date
        // This prevents "Missing field 'startDate'" error in Google Search Console
        schema.startDate = event.created_at || new Date().toISOString();
        console.warn(`⚠️ Event ${event.slug} missing event_date - using fallback: ${schema.startDate}`);
    }

    // END DATE: ISO 8601 with timezone - RECOMMENDED
    // ✅ GOOGLE SEO FIX: Generate endDate from startDate if not provided
    if (event.event_end_date) {
        schema.endDate = event.event_end_date;
    } else {
        // Generate endDate by adding 4 hours to startDate (typical event duration)
        const startDate = new Date(schema.startDate);
        const endDate = new Date(startDate.getTime() + (4 * 60 * 60 * 1000)); // +4 hours
        schema.endDate = endDate.toISOString();
    }

    // EVENT STATUS: EventScheduled, EventCancelled, EventRescheduled, EventPostponed - RECOMMENDED
    schema.eventStatus = `https://schema.org/${event.event_status || 'EventScheduled'}`;

    // EVENT ATTENDANCE MODE: OfflineEventAttendanceMode (physical location) - RECOMMENDED
    schema.eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode";

    // PERFORMER: Person or PerformingGroup - RECOMMENDED
    // ✅ GOOGLE SEO FIX: Always provide performer with fallback to HARDLINE
    if (event.artist_name) {
        schema.performer = {
            "@type": event.performer_type || "Person",
            "name": event.artist_name
        };
    } else {
        // Fallback to HARDLINE as the performer/organizer
        schema.performer = {
            "@type": "Organization",
            "name": "HARDLINE"
        };
    }

    // LOCATION: Place with complete PostalAddress - REQUIRED
    // DUAL ADDRESS SYSTEM: Use structured venue fields for SEO, event_address for UI display
    const location = {
        "@type": "Place"
    };

    // Venue name (use venue_name if available, otherwise event_address)
    // ✅ GOOGLE SEO FIX: Always provide location name with fallback
    if (event.venue_name) {
        location.name = event.venue_name;
    } else if (event.event_address) {
        location.name = event.event_address;
    } else {
        // Fallback to generic location name
        location.name = "Event Location - Details TBA";
    }

    // Complete PostalAddress with all components
    const address = {
        "@type": "PostalAddress"
    };

    if (event.venue_street_address) {
        address.streetAddress = event.venue_street_address;
    }
    if (event.venue_city) {
        address.addressLocality = event.venue_city;
    }
    if (event.venue_state) {
        address.addressRegion = event.venue_state;
    }
    if (event.venue_postal_code) {
        address.postalCode = event.venue_postal_code;
    }
    address.addressCountry = event.venue_country || "US";

    location.address = address;

    // Geo coordinates (if available)
    if (event.address_latitude && event.address_longitude) {
        location.geo = {
            "@type": "GeoCoordinates",
            "latitude": parseFloat(event.address_latitude),
            "longitude": parseFloat(event.address_longitude)
        };
    }

    schema.location = location;

    // ORGANIZER: Organization - RECOMMENDED
    schema.organizer = {
        "@type": "Organization",
        "name": "HARDLINE",
        "url": `https://${defaultDomain}`
    };

    // OFFERS: Ticket pricing and availability - RECOMMENDED
    if (event.external_ticket_url || event.posh_embed_url) {
        const offerUrl = event.external_ticket_url || event.posh_embed_url;

        // ✅ GOOGLE SEO FIX: Ensure validFrom is always present with proper fallback
        const validFromDate = event.ticket_sale_start_date || event.created_at || new Date().toISOString();

        schema.offers = {
            "@type": "Offer",
            "url": offerUrl,
            "price": event.ticket_price_amount ? event.ticket_price_amount.toString() : "0",
            "priceCurrency": event.ticket_price_currency || "USD",
            "availability": `https://schema.org/${event.ticket_availability || 'InStock'}`,
            "validFrom": validFromDate  // ✅ Always present with fallback
        };
    }

    return schema;
}

/**
 * Generate BreadcrumbList structured data for event page
 *
 * @param {Object} event - Event object from database
 * @param {string} defaultDomain - Default domain
 * @returns {Object} BreadcrumbList schema object
 */
function generateBreadcrumbSchema(event, defaultDomain) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `https://${defaultDomain}/`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": event.title,
                "item": `https://${defaultDomain}/event/${event.slug}`
            }
        ]
    };
}

/**
 * Escape HTML special characters to prevent XSS
 *
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Enhanced validation middleware with specific error handling
function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('🚨 Validation errors:', errors.array());

        // Group errors by field for better error messages
        const errorsByField = {};
        errors.array().forEach(error => {
            if (!errorsByField[error.path]) {
                errorsByField[error.path] = [];
            }
            errorsByField[error.path].push(error.msg);
        });

        // Create specific error messages
        let errorMessage = '';
        if (errorsByField.phone) {
            errorMessage = `Phone Number Error: ${errorsByField.phone[0]}`;
        } else if (errorsByField.email) {
            errorMessage = `Email Error: ${errorsByField.email[0]}`;
        } else if (errorsByField.name) {
            errorMessage = `Name Error: ${errorsByField.name[0]}`;
        } else {
            // Fallback to generic message
            const allErrors = errors.array().map(error => error.msg);
            errorMessage = allErrors.join(', ');
        }

        throw new CustomError(errorMessage, 400);
    }
    next();
}

// GET /event/:slug - React SSR Event Landing Page with SEO-Optimized Redirect
//
// ✅ SEO FIX: Event landing pages now return HTTP 200 with full HTML content for bots
// This allows Google to index the pages instead of treating them as redirects
//
// IMPLEMENTATION NOTES:
// - Uses React Server-Side Rendering for proper meta tags and structured data
// - Detects bots/crawlers vs human visitors for optimal behavior
// - Generates complete Event structured data (schema.org/Event) for SEO
// - Sends HTTP 200 response (NOT 301/302 redirect) to allow crawlers to index the page
// - Bots see full HTML content with "Get Tickets" button (NO redirect)
// - Humans get 2-second JavaScript redirect to ticket platform
// - Redirects to external_ticket_url → posh_embed_url → homepage (in that priority order)
router.get(
    "/:slug",
    asyncHandler(async (req, res) => {
        const { slug } = req.params;
        const defaultDomain = process.env.DEFAULT_DOMAIN || 'hardline.events';

        console.log(`🔍 Looking up event with slug: ${slug}`);

        // Scope by current site domain so a hardline.events visitor
        // can't reach a bounce2bounce.com event with a colliding slug
        // (and vice versa). Returns null → 404 below.
        const foundEvent = await query.event.findBySlug(slug, { domain: getSiteDomain(req) });

        if (!foundEvent) {
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Event Not Found - HARDLINE</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                            background: #000000;
                            color: #FFFFFF;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            min-height: 100vh;
                            padding: 1rem;
                        }
                        .error-card {
                            background: rgba(22, 22, 22, 0.8);
                            border: 1px solid rgba(56, 56, 56, 0.3);
                            backdrop-filter: blur(20px);
                            -webkit-backdrop-filter: blur(20px);
                            border-radius: 16px;
                            padding: 2rem;
                            text-align: center;
                            max-width: 500px;
                            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                        }
                        h1 { font-size: 2rem; margin-bottom: 1rem; font-weight: 700; }
                        p { color: rgba(255, 255, 255, 0.7); margin-bottom: 1.5rem; line-height: 1.5; }
                        a {
                            display: inline-block;
                            padding: 0.875rem 2rem;
                            background: rgba(49, 157, 255, 0.2);
                            border: 1px solid rgba(49, 157, 255, 0.4);
                            color: #f90d0d;
                            text-decoration: none;
                            border-radius: 12px;
                            font-weight: 600;
                            transition: all 0.2s ease;
                            backdrop-filter: blur(10px);
                        }
                        a:hover {
                            background: rgba(49, 157, 255, 0.3);
                            border-color: rgba(49, 157, 255, 0.6);
                            transform: translateY(-2px);
                        }
                    </style>
                </head>
                <body>
                    <div class="error-card">
                        <h1>Event Not Found</h1>
                        <p>The event you're looking for doesn't exist.</p>
                        <a href="https://${defaultDomain}">Return to Homepage</a>
                    </div>
                </body>
                </html>
            `);
        }

        // Check if event is active
        if (!foundEvent.is_active) {
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Event Inactive - HARDLINE</title>
                    <style>
                        body { margin: 0; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000; color: #fff; text-align: center; }
                        h1 { font-size: 2rem; margin-bottom: 1rem; }
                        p { color: rgba(255, 255, 255, 0.7); }
                        a { color: #f90d0d; text-decoration: none; }
                    </style>
                </head>
                <body>
                    <h1>${escapeHtml(foundEvent.title)}</h1>
                    <p>This event is currently inactive.</p>
                    <a href="https://${defaultDomain}">Return to Homepage</a>
                </body>
                </html>
            `);
        }

        // 🤖 Detect if request is from a bot/crawler
        const isBotRequest = isBot(req);

        // 🎯 Determine redirect URL (priority: external_ticket_url → posh_embed_url → homepage)
        const redirectUrl = foundEvent.external_ticket_url || foundEvent.posh_embed_url || `https://${defaultDomain}`;

        console.log(`✅ Event found: ${foundEvent.title}, redirecting to: ${redirectUrl}, isBot: ${isBotRequest}`);

        // 🎨 Generate SEO meta tags using existing seoUtils
        const metaTags = seoUtils.generateEventMetaTags(foundEvent);

        // Fetch SEO settings for tracking pixels
        const seoSettings = await query.seoSettings.getSEOSettings();

        // 🚀 Render React SSR Event Landing Page
        const html = renderReactPage(EventLandingPage, {
            event: foundEvent,
            metaTags,
            redirectUrl,
            isBot: isBotRequest,
            defaultDomain,
            trackingPixels: seoSettings // Pass all SEO settings including pixel IDs
        }, {
            fullDocument: true,  // Component returns complete HTML document
            trackingPixels: seoSettings // Also pass to SSR utility for injection into <head>
        });

        // Send HTTP 200 response with complete HTML (NOT 301 redirect)
        // This allows crawlers to read meta tags before following redirect
        res.status(200).set('Content-Type', 'text/html').send(html);
    })
);

// GET /signup - Handle requests to signup without event slug
router.get(
    "/signup",
    asyncHandler(async (req, res) => {
        res.status(400).json({
            error: "Missing Event Slug",
            message: "Event signup requires a specific event slug. Please visit the event page to sign up.",
            example: "/event/{event-slug}",
            code: "MISSING_EVENT_SLUG"
        });
    })
);

// GET /signup/:slug - Handle invalid GET requests to signup endpoint
router.get(
    "/signup/:slug",
    asyncHandler(async (req, res) => {
        const { slug } = req.params;

        // Check if the event exists (scoped to this site) to provide a
        // helpful error message.
        const foundEvent = await query.event.findBySlug(slug, { domain: getSiteDomain(req) });

        if (!foundEvent) {
            return res.status(404).json({
                error: "Event not found",
                message: `No event found with slug: ${slug}`,
                code: "EVENT_NOT_FOUND"
            });
        }

        // Event exists but this is a GET request to a POST-only endpoint
        res.status(405).json({
            error: "Method Not Allowed",
            message: "This endpoint only accepts POST requests for event signups. Please use the signup form on the event page.",
            allowedMethods: ["POST"],
            eventUrl: `/event/${slug}`,
            code: "METHOD_NOT_ALLOWED"
        });
    })
);

// POST /signup/:slug - Public signup endpoint with dynamic validation
router.post(
    "/signup/:slug",
    asyncHandler(events.createSignupValidation),
    validateRequest,
    asyncHandler(events.createSignup)
);

// QR code route moved to dedicated qr.routes.js file

module.exports = router;