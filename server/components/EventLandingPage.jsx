const React = require('react');

/**
 * EventLandingPage - Simple SEO-Optimized Redirect Page
 *
 * Purpose:
 * - Serve proper meta tags to social media crawlers (Facebook, Twitter, LinkedIn)
 * - Redirect users to the actual ticket platform (external_ticket_url or posh_embed_url)
 * - Maintain BOUNCE2BOUNCE glassmorphism design aesthetic
 *
 * Features:
 * - Server-side rendered meta tags for SEO
 * - Bot detection for immediate redirect (crawlers read meta tags first)
 * - Brief preview for human visitors before redirect
 * - Fallback to homepage if no ticket URL is configured
 * - Simple, maintainable code (<500 lines)
 */

function EventLandingPage({ event, metaTags, redirectUrl, isBot, defaultDomain }) {
    // Event data with defaults
    const eventData = event || {};
    const domain = defaultDomain || 'b2b.click';
    const ticketUrl = redirectUrl || `https://${domain}`;

    // ✅ SEO FIX: Redirect timing - 2 seconds for humans, NO redirect for bots
    // Bots see full HTML content (HTTP 200) for indexing, humans get JavaScript redirect
    const redirectDelay = 2000; // Only used for humans (bots don't get redirected)

    // Format event date for display
    const formatEventDate = (dateString) => {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });
        } catch (e) {
            return null;
        }
    };

    const formattedDate = formatEventDate(eventData.event_date);

    // ✅ GOOGLE IMAGE SEO: Enhanced Event structured data with ImageObject for rich search results
    // Google requires proper image metadata for Event rich results to display cover images as thumbnails
    // Reference: https://developers.google.com/search/docs/appearance/structured-data/event

    // Prepare image data for Google Search rich results
    const coverImageUrl = eventData.cover_image || `https://${domain}/images/bounce-logo.svg`;
    const imageCaption = `${eventData.title}${eventData.artist_name ? ` featuring ${eventData.artist_name}` : ''}`;

    // ✅ GOOGLE IMAGE SEO: Use full ImageObject instead of simple URL for maximum visibility
    // Provides width, height, format, and caption metadata that Google uses for rich results
    const eventImageObject = {
        "@type": "ImageObject",
        "url": coverImageUrl,
        "contentUrl": coverImageUrl,
        "caption": imageCaption,
        "description": imageCaption,
        // Google recommends 1920px width (minimum 720px) for Event images
        // These dimensions ensure optimal display in Google Search rich results
        "width": "1920",
        "height": "1080",
        "encodingFormat": "image/jpeg"
    };

    // ✅ GOOGLE IMAGE SEO: Provide multiple aspect ratios for best Google Search display
    // Google's documentation shows examples with 1x1, 4x3, and 16x9 variants
    // This maximizes the chance of images appearing in various Google Search layouts
    const eventImageArray = [
        coverImageUrl, // Simple URL for backward compatibility
        eventImageObject, // Full ImageObject with metadata
        // Additional aspect ratio variants (if available in future)
        // Google will choose the best one based on search result layout
    ];

    // Structured Data for SEO
    const eventStructuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": eventData.title,
        "description": eventData.description || `Join us for ${eventData.title}`,
        "url": `https://${domain}/event/${eventData.slug}`,
        // ✅ GOOGLE IMAGE SEO: Use ImageObject array instead of simple string
        // This provides Google with rich image metadata for search result thumbnails
        "image": eventImageArray,
        "organizer": {
            "@type": "Organization",
            "name": "BOUNCE2BOUNCE",
            "url": `https://${domain}`
        },
        "eventStatus": eventData.event_status || "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
    };

    // Add performer if artist name is available
    if (eventData.artist_name) {
        eventStructuredData.performer = {
            "@type": eventData.performer_type || "Person",
            "name": eventData.artist_name
        };
    }

    // Add date if available
    if (eventData.event_date) {
        eventStructuredData.startDate = eventData.event_date;
    }

    if (eventData.event_end_date) {
        eventStructuredData.endDate = eventData.event_end_date;
    }

    // Add location if available
    if (eventData.venue_name || eventData.event_address) {
        eventStructuredData.location = {
            "@type": "Place",
            "name": eventData.venue_name || eventData.event_address,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": eventData.venue_street_address || eventData.event_address,
                "addressLocality": eventData.venue_city,
                "addressRegion": eventData.venue_state,
                "postalCode": eventData.venue_postal_code,
                "addressCountry": eventData.venue_country || "US"
            }
        };
    }

    // Add offers/tickets if available
    if (ticketUrl && ticketUrl !== `https://${domain}`) {
        // ✅ GOOGLE SEO FIX: Ensure validFrom is always present and properly formatted
        // validFrom indicates when tickets become available for purchase
        // Use ticket_sale_start_date if available, otherwise fall back to created_at or current date
        const validFromDate = eventData.ticket_sale_start_date || eventData.created_at || new Date().toISOString();

        eventStructuredData.offers = {
            "@type": "Offer",
            "url": ticketUrl,
            "price": eventData.ticket_price_amount || "0",
            "priceCurrency": eventData.ticket_price_currency || "USD",
            "availability": `https://schema.org/${eventData.ticket_availability || 'InStock'}`,
            "validFrom": validFromDate  // ✅ Always present with fallback values
        };
    }

    // Inline CSS for glassmorphism design
    const styles = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #161616;
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }

        .event-redirect-container {
            max-width: 600px;
            width: 100%;
        }

        .event-card {
            background: rgba(22, 22, 22, 0.8);
            border: 1px solid rgba(56, 56, 56, 0.3);
            border-radius: 16px;
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 32px;
            text-align: center;
        }

        .event-cover-image {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 24px;
        }

        .event-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            color: #ffffff;
            line-height: 1.2;
        }

        .event-artist {
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 16px;
            color: rgba(255, 255, 255, 0.8);
        }

        .event-date,
        .event-location {
            font-size: 16px;
            margin-bottom: 12px;
            color: rgba(255, 255, 255, 0.7);
        }

        .event-description {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 24px;
            color: rgba(255, 255, 255, 0.7);
        }

        .redirect-message {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 24px;
            padding: 16px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
        }

        .spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-right: 8px;
            vertical-align: middle;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .event-card {
                padding: 24px;
            }

            .event-title {
                font-size: 24px;
            }

            .event-artist {
                font-size: 18px;
            }
        }
    `;

    // Redirect script for client-side
    const redirectScript = `
        // Redirect to ticket platform after delay
        setTimeout(function() {
            window.location.href = '${ticketUrl}';
        }, ${redirectDelay});
    `;

    return React.createElement('html', { lang: 'en' }, [
        // Head section with meta tags
        React.createElement('head', { key: 'head' }, [
            React.createElement('meta', { key: 'charset', charSet: 'utf-8' }),
            React.createElement('meta', {
                key: 'viewport',
                name: 'viewport',
                content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
            }),

            // ✅ SEO FIX: NO meta refresh for bots - Google treats meta refresh as redirect
            // Bots should see full HTML content (HTTP 200) without any redirect
            // Only humans get JavaScript redirect (client-side, doesn't affect indexing)

            // Fonts
            React.createElement('link', {
                key: 'font-preconnect',
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            }),
            React.createElement('link', {
                key: 'font-preconnect-gstatic',
                rel: 'preconnect',
                href: 'https://fonts.gstatic.com',
                crossOrigin: 'anonymous'
            }),
            React.createElement('link', {
                key: 'font-inter',
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
            }),

            // Structured Data
            React.createElement('script', {
                key: 'structured-data',
                type: 'application/ld+json',
                dangerouslySetInnerHTML: { __html: JSON.stringify(eventStructuredData) }
            }),

            // Inline CSS
            React.createElement('style', {
                key: 'styles',
                dangerouslySetInnerHTML: { __html: styles }
            })
        ]),

        // Body section
        React.createElement('body', { key: 'body' }, [
            React.createElement('div', {
                key: 'container',
                className: 'event-redirect-container'
            }, React.createElement('div', {
                className: 'event-card'
            }, [
                // Cover Image
                eventData.cover_image && React.createElement('img', {
                    key: 'cover-image',
                    src: eventData.cover_image,
                    alt: eventData.title,
                    className: 'event-cover-image'
                }),

                // Event Title
                React.createElement('h1', {
                    key: 'title',
                    className: 'event-title'
                }, eventData.title),

                // Artist Name
                eventData.artist_name && React.createElement('div', {
                    key: 'artist',
                    className: 'event-artist'
                }, eventData.artist_name),

                // Event Date
                formattedDate && React.createElement('div', {
                    key: 'date',
                    className: 'event-date'
                }, formattedDate),

                // Event Location
                (eventData.venue_name || eventData.event_address) && React.createElement('div', {
                    key: 'location',
                    className: 'event-location'
                }, eventData.venue_name || eventData.event_address),

                // Event Description
                eventData.description && React.createElement('div', {
                    key: 'description',
                    className: 'event-description'
                }, eventData.description),

                // Redirect Message (only for humans)
                !isBot && React.createElement('div', {
                    key: 'redirect-message',
                    className: 'redirect-message'
                }, [
                    React.createElement('div', {
                        key: 'spinner',
                        className: 'spinner'
                    }),
                    'Redirecting to tickets...'
                ]),

                // Get Tickets Button (only for bots - provides clickable link for indexing)
                isBot && React.createElement('a', {
                    key: 'get-tickets-button',
                    href: ticketUrl,
                    className: 'get-tickets-button',
                    style: {
                        display: 'inline-block',
                        marginTop: '24px',
                        padding: '16px 32px',
                        background: 'rgba(49, 157, 255, 0.2)',
                        border: '1px solid rgba(49, 157, 255, 0.4)',
                        borderRadius: '12px',
                        color: '#319DFF',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '16px',
                        transition: 'all 0.2s ease'
                    }
                }, 'Get Tickets')
            ])),

            // Redirect Script (only for non-bots)
            !isBot && React.createElement('script', {
                key: 'redirect-script',
                dangerouslySetInnerHTML: { __html: redirectScript }
            })
        ])
    ]);
}

module.exports = EventLandingPage;

