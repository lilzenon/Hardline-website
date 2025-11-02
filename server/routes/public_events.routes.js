const { Router } = require("express");
const { validationResult } = require("express-validator");

const events = require("../handlers/events.handler");
const asyncHandler = require("../utils/asyncHandler");
// Analytics middleware moved to dashboard repository
const { CustomError } = require("../utils");
const query = require("../queries");

const router = Router();

/**
 * Generate Google Event structured data (schema.org/Event) for SEO
 *
 * This function creates a complete Event schema with all required and recommended fields
 * according to Google's Event structured data guidelines.
 *
 * @param {Object} event - Event object from database
 * @param {string} defaultDomain - Default domain (e.g., 'bounce2bounce.com')
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
    if (event.cover_image) {
        // Use image variants if available, otherwise use same image URL
        schema.image = [
            event.cover_image, // Original
            event.cover_image, // 4x3 variant (TODO: use actual variant when available)
            event.cover_image  // 16x9 variant (TODO: use actual variant when available)
        ];
    }

    // START DATE: ISO 8601 with timezone - REQUIRED
    if (event.event_datetime_utc) {
        schema.startDate = event.event_datetime_utc;
    } else if (event.event_date) {
        // Fallback to event_date if event_datetime_utc is not populated
        schema.startDate = event.event_date;
    }

    // END DATE: ISO 8601 with timezone - RECOMMENDED
    if (event.event_end_date) {
        schema.endDate = event.event_end_date;
    }

    // EVENT STATUS: EventScheduled, EventCancelled, EventRescheduled, EventPostponed - RECOMMENDED
    schema.eventStatus = `https://schema.org/${event.event_status || 'EventScheduled'}`;

    // EVENT ATTENDANCE MODE: OfflineEventAttendanceMode (physical location) - RECOMMENDED
    schema.eventAttendanceMode = "https://schema.org/OfflineEventAttendanceMode";

    // PERFORMER: Person or PerformingGroup - RECOMMENDED
    if (event.artist_name) {
        schema.performer = {
            "@type": event.performer_type || "Person",
            "name": event.artist_name
        };
    }

    // LOCATION: Place with complete PostalAddress - REQUIRED
    // DUAL ADDRESS SYSTEM: Use structured venue fields for SEO, event_address for UI display
    const location = {
        "@type": "Place"
    };

    // Venue name (use venue_name if available, otherwise event_address)
    if (event.venue_name) {
        location.name = event.venue_name;
    } else if (event.event_address) {
        location.name = event.event_address;
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
        "name": "BOUNCE2BOUNCE",
        "url": `https://${defaultDomain}`
    };

    // OFFERS: Ticket pricing and availability - RECOMMENDED
    if (event.external_ticket_url || event.posh_embed_url) {
        const offerUrl = event.external_ticket_url || event.posh_embed_url;

        schema.offers = {
            "@type": "Offer",
            "url": offerUrl,
            "price": event.ticket_price_amount ? event.ticket_price_amount.toString() : "0",
            "priceCurrency": event.ticket_price_currency || "USD",
            "availability": `https://schema.org/${event.ticket_availability || 'InStock'}`,
            "validFrom": event.created_at
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

// GET /event/:slug - SEO-compliant redirect to external ticket URL with Event structured data
//
// IMPLEMENTATION NOTES:
// - Uses server-side HTML generation (NO Handlebars templates) for maximum performance
// - Generates complete Event structured data (schema.org/Event) with all required/recommended fields
// - Sends HTTP 200 response (NOT 301 redirect) to allow Google to crawl structured data
// - JavaScript redirect after 150ms delay ensures Google bot can parse JSON-LD before redirect
// - Dual address system: event_address for UI display, venue_* fields for Event schema SEO
router.get(
    "/:slug",
    asyncHandler(async(req, res) => {
        const { slug } = req.params;
        const defaultDomain = process.env.DEFAULT_DOMAIN || 'bounce2bounce.com';

        console.log(`🔍 Looking up event with slug: ${slug}`);

        const foundEvent = await query.event.findBySlug(slug);

        if (!foundEvent) {
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Event Not Found - BOUNCE2BOUNCE</title>
                    <style>
                        body { margin: 0; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000; color: #fff; text-align: center; }
                        h1 { font-size: 2rem; margin-bottom: 1rem; }
                        a { color: #319DFF; text-decoration: none; }
                    </style>
                </head>
                <body>
                    <h1>Event Not Found</h1>
                    <p>The event you're looking for doesn't exist.</p>
                    <a href="https://${defaultDomain}">Return to Homepage</a>
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
                    <title>Event Inactive - BOUNCE2BOUNCE</title>
                    <style>
                        body { margin: 0; padding: 2rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000; color: #fff; text-align: center; }
                        h1 { font-size: 2rem; margin-bottom: 1rem; }
                        p { color: rgba(255, 255, 255, 0.7); }
                        a { color: #319DFF; text-decoration: none; }
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

        // 🎯 SEO-COMPLIANT REDIRECT: Generate Event structured data before redirecting
        // This ensures Google can crawl and index the Event schema before the redirect occurs

        const redirectUrl = foundEvent.external_ticket_url || foundEvent.posh_embed_url || `https://${defaultDomain}`;

        console.log(`✅ Event found: ${foundEvent.title}, redirecting to: ${redirectUrl}`);

        // Generate Event and Breadcrumb structured data
        const eventSchema = generateEventSchema(foundEvent, defaultDomain);
        const breadcrumbSchema = generateBreadcrumbSchema(foundEvent, defaultDomain);

        // Escape values for safe HTML insertion
        const safeTitle = escapeHtml(foundEvent.title);
        const safeArtistName = escapeHtml(foundEvent.artist_name);
        const safeDescription = escapeHtml(foundEvent.description || `Join us for ${foundEvent.title}${foundEvent.artist_name ? ` featuring ${foundEvent.artist_name}` : ''}`);
        const safeCoverImage = escapeHtml(foundEvent.cover_image);
        const safeRedirectUrl = escapeHtml(redirectUrl);

        // Generate complete HTML response with structured data and JavaScript redirect
        // Using template literals for clean, maintainable HTML generation
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${safeTitle} - BOUNCE2BOUNCE</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="${safeDescription}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="https://${defaultDomain}/event/${foundEvent.slug}">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${safeTitle}${safeArtistName ? ` - ${safeArtistName}` : ''} | BOUNCE2BOUNCE">
    <meta property="og:description" content="${safeDescription}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://${defaultDomain}/event/${foundEvent.slug}">
    <meta property="og:site_name" content="BOUNCE2BOUNCE">
    ${safeCoverImage ? `<meta property="og:image" content="${safeCoverImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${safeTitle} event cover image">` : ''}

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@bounce2bounce">
    <meta name="twitter:title" content="${safeTitle}${safeArtistName ? ` - ${safeArtistName}` : ''}">
    <meta name="twitter:description" content="${safeDescription}">
    ${safeCoverImage ? `<meta name="twitter:image" content="${safeCoverImage}">
    <meta name="twitter:image:alt" content="${safeTitle} event cover image">` : ''}

    <!-- 🎯 GOOGLE EVENT STRUCTURED DATA (schema.org/Event) -->
    <script type="application/ld+json">
${JSON.stringify(eventSchema, null, 2)}
    </script>

    <!-- Breadcrumb Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>

    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            background: #000;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .redirect-container {
            text-align: center;
            padding: 2rem;
            max-width: 600px;
        }
        .event-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        .redirect-message {
            font-size: 1.125rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 2rem;
        }
        .spinner {
            width: 40px;
            height: 40px;
            margin: 0 auto 1rem;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top-color: #319DFF;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .manual-link {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background: #319DFF;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            transition: background 0.2s;
        }
        .manual-link:hover {
            background: #2589e6;
        }
    </style>
</head>
<body>
    <div class="redirect-container">
        <div class="spinner"></div>
        <h1 class="event-title">${safeTitle}</h1>
        ${safeArtistName ? `<p class="redirect-message">Featuring ${safeArtistName}</p>` : ''}
        <p class="redirect-message">Redirecting to tickets...</p>
        <a href="${safeRedirectUrl}" class="manual-link">Click here if not redirected</a>
    </div>

    <!-- JavaScript redirect after 150ms (allows Google bot to parse JSON-LD) -->
    <script>
        setTimeout(function() {
            window.location.href = '${safeRedirectUrl}';
        }, 150);
    </script>
</body>
</html>`;

        // Send HTTP 200 response with complete HTML (NOT 301 redirect)
        // This allows Google to crawl the structured data before the JavaScript redirect occurs
        res.status(200).set('Content-Type', 'text/html').send(html);
    })
);

// GET /signup - Handle requests to signup without event slug
router.get(
    "/signup",
    asyncHandler(async(req, res) => {
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
    asyncHandler(async(req, res) => {
        const { slug } = req.params;

        // Check if the event exists to provide a helpful error message
        const foundEvent = await query.event.findBySlug(slug);

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