const env = require("../env");
const path = require('path');


/**
 * SEO Utilities for BOUNCE2BOUNCE Event Platform
 * Generates optimized meta tags, structured data, and SEO content
 */

/**
 * Generate comprehensive meta tags for pages
 */
function generateMetaTags(options = {}) {
    const {
        title,
        description,
        image,
        url,
        type = 'website',
        siteName = 'BOUNCE2BOUNCE',
        twitterCard = 'summary_large_image',
        keywords,
        author = 'BOUNCE2BOUNCE',
        publishedTime,
        modifiedTime
    } = options;

    // CRITICAL SEO FIX: Always use bounce2bounce.com as canonical domain
    // This ensures Google Search Console sees consistent canonical URLs
    const CANONICAL_DOMAIN = 'https://bounce2bounce.com';
    const baseUrl = CANONICAL_DOMAIN;
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
    // Use the actual uploaded OG image from admin dashboard as default
    const defaultImage = 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png';

    // Handle absolute URLs for uploaded images and normalize paths
    const getAbsoluteImageUrl = (imageUrl) => {
        if (!imageUrl) return defaultImage;

        // If absolute URL, normalize the path and remap to admin domain when needed
        try {
            const u = new URL(imageUrl);
            const normalizedPath = path.posix.normalize(u.pathname);
            const needsAdmin =
                normalizedPath.includes('/uploads/') ||
                normalizedPath.includes('/static/uploads/') ||
                normalizedPath.includes('/data/static/uploads/') ||
                normalizedPath.includes('/api/images/serve/') ||
                normalizedPath.includes('/og-images/');

            if (needsAdmin) {
                let mappedPath = normalizedPath;
                if (mappedPath.startsWith('/data/static/uploads/')) {
                    mappedPath = mappedPath.replace('/data/static/uploads/', '/static/uploads/');
                } else if (mappedPath.startsWith('/data/uploads/')) {
                    mappedPath = mappedPath.replace('/data/uploads/', '/uploads/');
                }
                return `https://admin.b2b.click${mappedPath}`;
            }
            return `${u.origin}${normalizedPath}`;
        } catch {
            // Not an absolute URL; proceed with relative handling
        }

        // Normalize relative paths to remove ../ segments
        const normalized = path.posix.normalize(imageUrl);
        const rel = normalized.startsWith('/') ? normalized : `/${normalized}`;

        // Map dashboard-managed assets to admin domain
        if (
            rel.startsWith('/uploads/') ||
            rel.startsWith('/static/uploads/') ||
            rel.startsWith('/data/static/uploads/') ||
            rel.startsWith('/api/images/serve/') ||
            rel.includes('/og-images/')
        ) {
            let mappedRel = rel;
            if (mappedRel.startsWith('/data/static/uploads/')) {
                mappedRel = mappedRel.replace('/data/static/uploads/', '/static/uploads/');
            } else if (mappedRel.startsWith('/data/uploads/')) {
                mappedRel = mappedRel.replace('/data/uploads/', '/uploads/');
            }
            return `https://admin.b2b.click${mappedRel}`;
        }

        // Default to main domain
        return `${baseUrl}${rel}`;
    };

    const metaImage = getAbsoluteImageUrl(image);

    return {
        // Basic meta tags
        title: title || 'BOUNCE2BOUNCE - Live Music Events & Exclusive Experiences',
        description: description || 'Discover exclusive live music events, connect with artists, and purchase tickets seamlessly. Join BOUNCE2BOUNCE for unforgettable music experiences.',
        keywords: keywords || 'live music events, concert tickets, artist promotion, event discovery, Asbury Park events, exclusive music experiences',
        author,

        // Open Graph tags
        ogTitle: title || 'BOUNCE2BOUNCE - Live Music Events',
        ogDescription: description || 'Discover exclusive live music events and connect with artists',
        ogImage: metaImage,
        ogUrl: fullUrl,
        ogType: type,
        ogSiteName: siteName,

        // Twitter Card tags
        twitterCard,
        twitterTitle: title || 'BOUNCE2BOUNCE - Live Music Events',
        twitterDescription: description || 'Discover exclusive live music events and connect with artists',
        twitterImage: metaImage,

        // Additional SEO tags
        canonical: fullUrl,
        publishedTime,
        modifiedTime,

        // Mobile and app tags
        viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
        themeColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default'
    };
}

/**
 * Generate Event-specific meta tags with social preview support
 */
function generateEventMetaTags(event) {
    const eventUrl = `/event/${event.slug}`;
    const eventDate = event.event_date ? new Date(event.event_date) : null;
    const formattedDate = eventDate ? eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }) : '';

    // Default fallback values
    const defaultTitle = `${event.title} - ${event.artist_name || 'BOUNCE2BOUNCE'}`;
    const defaultDescription = event.description ||
        `Join ${event.artist_name || 'us'} for ${event.title}${formattedDate ? ` on ${formattedDate}` : ''}${event.event_address ? ` at ${event.event_address}` : ''}. Get notified when tickets go live!`;

    // Use custom social preview fields if enabled and available, otherwise use defaults
    const useCustomPreviews = event.social_preview_enabled;

    const ogTitle = useCustomPreviews && event.og_title ? event.og_title : defaultTitle;
    const ogDescription = useCustomPreviews && event.og_description ? event.og_description : defaultDescription;
    const ogImage = useCustomPreviews && event.og_image ? event.og_image : event.cover_image;

    const twitterTitle = useCustomPreviews && event.twitter_title ? event.twitter_title : ogTitle;
    const twitterDescription = useCustomPreviews && event.twitter_description ? event.twitter_description : ogDescription;
    const twitterImage = useCustomPreviews && event.twitter_image ? event.twitter_image : ogImage;

    const iosTitle = useCustomPreviews && event.ios_title ? event.ios_title : ogTitle;
    const iosDescription = useCustomPreviews && event.ios_description ? event.ios_description : ogDescription;
    const iosImage = useCustomPreviews && event.ios_image ? event.ios_image : ogImage;

    const keywords = [
        event.title,
        event.artist_name,
        'live music',
        'concert tickets',
        'event signup',
        event.event_address ? event.event_address.split(',')[0] : 'live event'
    ].filter(Boolean).join(', ');

    const baseUrl = env.PRODUCTION_HOMEPAGE_URL || `https://${env.DEFAULT_DOMAIN}`;
    const fullUrl = `${baseUrl}${eventUrl}`;

    // ✅ GOOGLE IMAGE SEO: Ensure proper image dimensions for social sharing and Google Search
    // Google recommends minimum 1200x630px for social sharing (Open Graph)
    // Event images should be 1920px wide (minimum 720px) for Google Search rich results
    // Reference: https://developers.google.com/search/docs/appearance/structured-data/event

    // Generate comprehensive meta tags for all platforms
    return {
        // Basic meta tags
        title: defaultTitle,
        description: defaultDescription,
        keywords,

        // ✅ GOOGLE IMAGE SEO: Open Graph (Facebook, LinkedIn, WhatsApp, Google Search preview)
        // These tags ensure event cover images appear in social shares AND Google Search previews
        'og:title': ogTitle,
        'og:description': ogDescription,
        'og:image': ogImage,
        'og:image:secure_url': ogImage, // HTTPS version for secure contexts
        'og:image:width': '1920', // ✅ Updated to 1920px (Google's recommended width for Event images)
        'og:image:height': '1080', // ✅ Maintains 16:9 aspect ratio (optimal for most displays)
        'og:image:alt': `${ogTitle} - Event Cover Image`,
        'og:image:type': 'image/jpeg',
        'og:url': fullUrl,
        'og:type': 'website', // ✅ Changed from 'article' to 'website' (more appropriate for event pages)
        'og:site_name': 'BOUNCE2BOUNCE',
        'og:locale': 'en_US',

        // ✅ GOOGLE IMAGE SEO: Twitter Card (also used by Google for rich snippets)
        // Twitter's large image card format is ideal for event cover images
        'twitter:card': 'summary_large_image',
        'twitter:site': '@bounce2bounce',
        'twitter:creator': '@bounce2bounce',
        'twitter:title': twitterTitle,
        'twitter:description': twitterDescription,
        'twitter:image': twitterImage,
        'twitter:image:alt': `${twitterTitle} - Event Cover Image`,

        // iOS Messages / Apple specific
        'apple-mobile-web-app-title': iosTitle,
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',

        // Additional meta for better compatibility
        'article:published_time': event.created_at,
        'article:modified_time': event.updated_at,
        'article:author': event.artist_name || 'BOUNCE2BOUNCE',
        'article:section': 'Events',
        'article:tag': keywords
    };
}

/**
 * Generate JSON-LD structured data for events
 */
function generateEventStructuredData(event) {
    const baseUrl = env.PRODUCTION_HOMEPAGE_URL || `https://${env.DEFAULT_DOMAIN}`;
    const eventDate = event.event_date ? new Date(event.event_date) : null;

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.title,
        "description": event.description || `Join us for ${event.title}`,
        "url": `${baseUrl}/event/${event.slug}`,
        "image": event.cover_image || `${baseUrl}/images/bounce-logo.svg`,
        "organizer": {
            "@type": "Organization",
            "name": "BOUNCE2BOUNCE",
            "url": baseUrl
        },
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
    };

    // Add performer if artist name is available
    if (event.artist_name) {
        structuredData.performer = {
            "@type": "Person",
            "name": event.artist_name
        };
    }

    // Add date if available
    if (eventDate) {
        structuredData.startDate = eventDate.toISOString();
    }

    // Add location if available
    if (event.event_address) {
        structuredData.location = {
            "@type": "Place",
            "name": event.event_address,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": event.event_address
            }
        };
    }

    // Add offers/tickets if available
    if (event.tickets_url || event.posh_embed_url) {
        structuredData.offers = {
            "@type": "Offer",
            "url": event.tickets_url || `${baseUrl}/event/${event.slug}`,
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "validFrom": new Date().toISOString()
        };
    }

    return structuredData;
}

/**
 * Build an Event object suitable for use inside an ItemList for carousels.
 * This follows Google's "Structured data carousels (beta)" guidelines,
 * which recommend name, image (1x1, 4x3, 16x9), url, and offers.price/priceCurrency.
 *
 * @param {Object} event - Event object from database
 * @returns {Object} Carousel-optimized Event structured data
 */
function buildCarouselEventItem(event) {
    const baseUrl = env.PRODUCTION_HOMEPAGE_URL || `https://${env.DEFAULT_DOMAIN}`;
    const eventUrl = `${baseUrl}/event/${event.slug}`;

    // Ensure we always have at least one valid image URL
    const fallbackImage = `${baseUrl}/images/bounce-logo.svg`;
    const primaryImage = event.cover_image || fallbackImage;

    // Google recommends 3 aspect ratios: 1x1, 4x3, 16x9
    // TODO: Wire true variants from event.images.variants JSON when available
    const imageArray = [primaryImage, primaryImage, primaryImage];

    const item = {
        "@type": "Event",
        "name": event.title,
        "url": eventUrl,
        "image": imageArray,
        "description": event.description || `Join us for ${event.title}`,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "organizer": {
            "@type": "Organization",
            "name": "BOUNCE2BOUNCE",
            "url": baseUrl
        }
    };

    // Add performer information if available
    if (event.artist_name) {
        item.performer = {
            "@type": "Person",
            "name": event.artist_name
        };
    }

    // Add start date if available
    if (event.event_date) {
        item.startDate = event.event_date;
    }

    // Add location if available
    if (event.event_address) {
        item.location = {
            "@type": "Place",
            "name": event.event_address,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": event.event_address
            }
        };
    }

    // Add offers (ticket information) - CRITICAL for carousel eligibility
    // Robust price handling: convert strings/numbers to valid numeric values
    const rawPrice = event.ticket_price_amount;
    const numericPrice = rawPrice !== undefined && rawPrice !== null ? Number(rawPrice) : NaN;
    const hasTicketPrice = Number.isFinite(numericPrice);
    const hasTicketUrl = Boolean(event.external_ticket_url || event.posh_embed_url);

    if (hasTicketPrice || hasTicketUrl) {
        const price = hasTicketPrice ? numericPrice : 0;
        const priceCurrency = event.ticket_price_currency || 'USD';

        item.offers = {
            "@type": "Offer",
            "price": price,
            "priceCurrency": priceCurrency
        };

        // Add ticket URL if available (use external_ticket_url, NOT tickets_url)
        if (hasTicketUrl) {
            item.offers.url = event.external_ticket_url || event.posh_embed_url;
        }
    }

    return item;
}

/**
 * Generate homepage structured data
 */
function generateHomepageStructuredData(homeSettings, featuredEvents = []) {
    const baseUrl = env.PRODUCTION_HOMEPAGE_URL || `https://${env.DEFAULT_DOMAIN}`;

    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BOUNCE2BOUNCE",
        "url": baseUrl,
        "logo": `${baseUrl}/images/bounce-logo.svg`,
        "description": "Live music events platform connecting artists with fans through exclusive experiences and seamless ticket sales",
        "sameAs": [
            homeSettings.instagram_url,
            homeSettings.twitter_url,
            homeSettings.tiktok_url
        ].filter(Boolean)
    };

    // Add featured events as ItemList with carousel-optimized Event items
    if (featuredEvents.length > 0) {
        const eventListData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Featured Events",
            "description": "Upcoming live music events and exclusive experiences",
            "itemListElement": featuredEvents.map((event, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": buildCarouselEventItem(event)
            }))
        };

        return [organizationData, eventListData];
    }

    return [organizationData];
}

/**
 * Clean and optimize text for SEO
 */
function optimizeTextForSEO(text, maxLength = 160) {
    if (!text) return '';

    // Remove HTML tags and extra whitespace
    const cleaned = text
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();

    // Truncate if too long, ensuring we don't cut off mid-word
    if (cleaned.length <= maxLength) return cleaned;

    const truncated = cleaned.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');

    return lastSpace > maxLength * 0.8
        ? truncated.substring(0, lastSpace) + '...'
        : truncated + '...';
}

/**
 * Generate breadcrumb structured data
 */
function generateBreadcrumbData(breadcrumbs) {
    const baseUrl = env.PRODUCTION_HOMEPAGE_URL || `https://${env.DEFAULT_DOMAIN}`;

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": `${baseUrl}${crumb.url}`
        }))
    };
}

module.exports = {
    generateMetaTags,
    generateEventMetaTags,
    generateEventStructuredData,
    generateHomepageStructuredData,
    generateBreadcrumbData,
    optimizeTextForSEO,
    buildCarouselEventItem
};