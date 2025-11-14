const React = require('react');

/**
 * EventLandingPage - Simple React SSR component for event redirect pages
 * 
 * This component renders a complete HTML document with:
 * - SEO meta tags for social media crawlers (Open Graph, Twitter Cards)
 * - Event structured data (schema.org/Event) for Google
 * - Glassmorphism design matching BOUNCE2BOUNCE homepage
 * - Smart redirect logic (immediate for bots, 2s delay for humans)
 * - Event cover image, title, artist, date, location display
 * 
 * @param {Object} props - Component props
 * @param {Object} props.event - Event object from database
 * @param {Object} props.metaTags - SEO meta tags object
 * @param {string} props.redirectUrl - URL to redirect to (ticket platform)
 * @param {boolean} props.isBot - Whether request is from a bot/crawler
 * @param {string} props.defaultDomain - Default domain (e.g., 'bounce2bounce.com')
 * @returns {React.Element} Complete HTML document
 */
function EventLandingPage({ event, metaTags, redirectUrl, isBot, defaultDomain }) {
    // Redirect timing: immediate for bots, 2 seconds for humans
    const redirectDelay = isBot ? 0 : 2000;
    
    // Format event date for display
    const eventDate = event.event_date ? new Date(event.event_date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';
    
    // Build structured data for SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.title,
        "description": event.description || `Join us for ${event.title}${event.artist_name ? ` featuring ${event.artist_name}` : ''}`,
        "url": `https://${defaultDomain}/event/${event.slug}`,
        "image": event.cover_image ? [event.cover_image] : [],
        "startDate": event.event_datetime_utc || event.event_date,
        "eventStatus": `https://schema.org/${event.event_status || 'EventScheduled'}`,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": event.venue_name || event.event_address || "TBA",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": event.venue_street_address || "",
                "addressLocality": event.venue_city || "",
                "addressRegion": event.venue_state || "",
                "postalCode": event.venue_postal_code || "",
                "addressCountry": event.venue_country || "US"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "BOUNCE2BOUNCE",
            "url": `https://${defaultDomain}`
        }
    };

    // Add endDate (required by Google)
    if (event.event_end_date) {
        structuredData.endDate = event.event_end_date;
    } else {
        // Fallback: add 4 hours to start date
        const startDate = new Date(event.event_datetime_utc || event.event_date);
        const endDate = new Date(startDate.getTime() + (4 * 60 * 60 * 1000));
        structuredData.endDate = endDate.toISOString();
    }

    // Add performer (required by Google)
    if (event.artist_name) {
        structuredData.performer = {
            "@type": event.performer_type || "Person",
            "name": event.artist_name
        };
    } else {
        // Fallback: use BOUNCE2BOUNCE as performer
        structuredData.performer = {
            "@type": "Organization",
            "name": "BOUNCE2BOUNCE"
        };
    }

    // Add offers with validFrom (required by Google)
    if (redirectUrl && (event.external_ticket_url || event.posh_embed_url)) {
        const validFromDate = event.ticket_sale_start_date || event.created_at || new Date().toISOString();

        structuredData.offers = {
            "@type": "Offer",
            "url": redirectUrl,
            "price": event.ticket_price_amount ? event.ticket_price_amount.toString() : "0",
            "priceCurrency": event.ticket_price_currency || "USD",
            "availability": `https://schema.org/${event.ticket_availability || 'InStock'}`,
            "validFrom": validFromDate
        };
    }
    
    // JavaScript redirect code (only for humans)
    const redirectScript = `
        setTimeout(function() {
            window.location.href = '${redirectUrl.replace(/'/g, "\\'")}';
        }, ${redirectDelay});
    `;
    
    // Inline CSS for glassmorphism design
    const styles = `
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
        
        .container {
            text-align: center;
            max-width: 600px;
            width: 100%;
            animation: fadeIn 0.3s ease-out;
        }
        
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
        }
        
        .card {
            background: rgba(22, 22, 22, 0.8);
            border: 1px solid rgba(56, 56, 56, 0.3);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        
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
        
        h1 {
            font-size: clamp(1.5rem, 4vw, 2rem);
            font-weight: 700;
            margin-bottom: 0.5rem;
            line-height: 1.2;
        }
        
        .artist {
            font-size: clamp(1rem, 3vw, 1.25rem);
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 1rem;
        }
        
        .message {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 1.5rem;
        }
        
        .link {
            display: inline-block;
            margin-top: 1rem;
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
        
        .link:hover {
            background: rgba(49, 157, 255, 0.3);
            border-color: rgba(49, 157, 255, 0.6);
            transform: translateY(-2px);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 640px) {
            .card { padding: 1.5rem; }
            .event-cover { margin-bottom: 1.5rem; }
        }
    `;
    
    // Return complete HTML document
    return React.createElement('html', { lang: 'en' }, [
        React.createElement('head', { key: 'head' }, [
            React.createElement('meta', { key: 'charset', charSet: 'UTF-8' }),
            React.createElement('meta', { key: 'viewport', name: 'viewport', content: 'width=device-width, initial-scale=1.0' }),
            React.createElement('title', { key: 'title' }, `${event.title} - BOUNCE2BOUNCE`),

            // CRITICAL: NO meta refresh for bots - Google treats meta refresh as redirect
            // Bots see full HTML content (HTTP 200), humans get JavaScript redirect

            // SEO meta tags
            React.createElement('meta', { key: 'description', name: 'description', content: event.description || `Join us for ${event.title}` }),
            React.createElement('meta', { key: 'robots', name: 'robots', content: 'index, follow' }),
            
            // Open Graph tags
            metaTags && metaTags.openGraph && Object.entries(metaTags.openGraph).map(([key, value]) =>
                React.createElement('meta', { key: `og-${key}`, property: `og:${key}`, content: value })
            ),
            
            // Twitter Card tags
            metaTags && metaTags.twitter && Object.entries(metaTags.twitter).map(([key, value]) =>
                React.createElement('meta', { key: `twitter-${key}`, name: `twitter:${key}`, content: value })
            ),
            
            // Fonts
            React.createElement('link', { key: 'font-preconnect', rel: 'preconnect', href: 'https://fonts.googleapis.com' }),
            React.createElement('link', { key: 'font-gstatic', rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }),
            React.createElement('link', { key: 'font-inter', rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }),
            
            // Structured data
            React.createElement('script', {
                key: 'structured-data',
                type: 'application/ld+json',
                dangerouslySetInnerHTML: { __html: JSON.stringify(structuredData, null, 2) }
            }),
            
            // Inline CSS
            React.createElement('style', { key: 'styles', dangerouslySetInnerHTML: { __html: styles } })
        ]),
        
        React.createElement('body', { key: 'body' }, [
            React.createElement('div', { key: 'container', className: 'container' }, [
                // Event cover image
                event.cover_image && React.createElement('div', { key: 'cover', className: 'event-cover' },
                    React.createElement('img', {
                        src: event.cover_image,
                        alt: `${event.title} event cover`,
                        loading: 'eager'
                    })
                ),
                
                // Content card
                React.createElement('div', { key: 'card', className: 'card' }, [
                    React.createElement('div', { key: 'spinner', className: 'spinner' }),
                    React.createElement('h1', { key: 'title' }, event.title),
                    event.artist_name && React.createElement('p', { key: 'artist', className: 'artist' }, `Featuring ${event.artist_name}`),
                    React.createElement('p', { key: 'message', className: 'message' }, 'Redirecting to tickets...'),
                    React.createElement('a', {
                        key: 'link',
                        href: redirectUrl,
                        className: 'link'
                    }, 'Click here if not redirected')
                ])
            ]),
            
            // JavaScript redirect (only for humans)
            !isBot && React.createElement('script', {
                key: 'redirect',
                dangerouslySetInnerHTML: { __html: redirectScript }
            })
        ])
    ]);
}

module.exports = EventLandingPage;

