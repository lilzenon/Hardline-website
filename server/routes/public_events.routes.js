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
                            color: #319DFF;
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
        // 🎨 GLASSMORPHISM DESIGN: Matches main React homepage styling
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

    <!-- Preload critical resources for performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ${safeCoverImage ? `<link rel="preload" as="image" href="${safeCoverImage}">` : ''}

    <!-- 🎯 GOOGLE EVENT STRUCTURED DATA (schema.org/Event) -->
    <script type="application/ld+json">
${JSON.stringify(eventSchema, null, 2)}
    </script>

    <!-- Breadcrumb Structured Data -->
    <script type="application/ld+json">
${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>

    <!-- Inline critical CSS for performance (eliminates render-blocking) -->
    <style>
        /* 🎨 GLASSMORPHISM DESIGN SYSTEM - Matches React Homepage */
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: #000000;
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 1rem;
            overflow-x: hidden;
        }

        .redirect-container {
            text-align: center;
            max-width: 600px;
            width: 100%;
            animation: fadeIn 0.3s ease-out;
        }

        /* Event Cover Image with Glassmorphism */
        .event-cover {
            width: 100%;
            max-width: 500px;
            margin: 0 auto 2rem;
            border-radius: 16px;
            overflow: hidden;
            background: rgba(22, 22, 22, 0.8);
            border: 1px solid rgba(56, 56, 56, 0.3);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .event-cover img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }

        /* Glassmorphism Card for Content */
        .content-card {
            background: rgba(22, 22, 22, 0.8);
            border: 1px solid rgba(56, 56, 56, 0.3);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        /* Loading Spinner */
        .spinner {
            width: 48px;
            height: 48px;
            margin: 0 auto 1.5rem;
            border: 4px solid rgba(255, 255, 255, 0.1);
            border-top-color: #319DFF;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Typography */
        .event-title {
            font-size: clamp(1.5rem, 4vw, 2rem);
            font-weight: 700;
            margin-bottom: 0.5rem;
            line-height: 1.2;
            color: #FFFFFF;
        }

        .artist-name {
            font-size: clamp(1rem, 3vw, 1.25rem);
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 1rem;
        }

        .redirect-message {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 1.5rem;
            line-height: 1.5;
        }

        /* Manual Link Button with Glassmorphism */
        .manual-link {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.875rem 2rem;
            background: rgba(49, 157, 255, 0.2);
            border: 1px solid rgba(49, 157, 255, 0.4);
            color: #319DFF;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 0.9375rem;
            transition: all 0.2s ease;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }

        .manual-link:hover {
            background: rgba(49, 157, 255, 0.3);
            border-color: rgba(49, 157, 255, 0.6);
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(49, 157, 255, 0.3);
        }

        .manual-link:active {
            transform: translateY(0);
        }

        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive Design */
        @media (max-width: 640px) {
            .content-card { padding: 1.5rem; }
            .event-cover { margin-bottom: 1.5rem; }
        }
    </style>
</head>
<body>
    <div class="redirect-container">
        ${safeCoverImage ? `
        <!-- Event Cover Image -->
        <div class="event-cover">
            <img src="${safeCoverImage}" alt="${safeTitle} event cover" loading="eager" decoding="async">
        </div>
        ` : ''}

        <!-- Content Card with Glassmorphism -->
        <div class="content-card">
            <div class="spinner"></div>
            <h1 class="event-title">${safeTitle}</h1>
            ${safeArtistName ? `<p class="artist-name">Featuring ${safeArtistName}</p>` : ''}
            <p class="redirect-message">Redirecting to tickets...</p>
            <a href="${safeRedirectUrl}" class="manual-link">Click here if not redirected</a>
        </div>
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