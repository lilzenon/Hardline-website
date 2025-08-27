const env = require("../env");

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

    const baseUrl = `https://${env.DEFAULT_DOMAIN}`;
    const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
    const defaultImage = `${baseUrl}/images/og-image.png`;

    // Handle absolute URLs for uploaded images
    const getAbsoluteImageUrl = (imageUrl) => {
        if (!imageUrl) return defaultImage;
        if (imageUrl.startsWith('http')) return imageUrl;

        // For uploaded OG images, use the dashboard domain where they're stored
        if (imageUrl.startsWith('/uploads/')) {
            return `https://admin.b2b.click${imageUrl}`;
        }

        // For static images, use the main domain
        return `${baseUrl}${imageUrl}`;
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

    const baseUrl = `https://${env.DEFAULT_DOMAIN}`;
    const fullUrl = `${baseUrl}${eventUrl}`;

    // Generate comprehensive meta tags for all platforms
    return {
        // Basic meta tags
        title: defaultTitle,
        description: defaultDescription,
        keywords,

        // Open Graph (Facebook, LinkedIn, WhatsApp)
        'og:title': ogTitle,
        'og:description': ogDescription,
        'og:image': ogImage,
        'og:image:width': '1200',
        'og:image:height': '630',
        'og:image:alt': `${ogTitle} - Event Image`,
        'og:image:type': 'image/jpeg',
        'og:url': fullUrl,
        'og:type': 'article',
        'og:site_name': 'BOUNCE2BOUNCE',
        'og:locale': 'en_US',

        // Twitter Card
        'twitter:card': 'summary_large_image',
        'twitter:site': '@bounce2bounce',
        'twitter:creator': '@bounce2bounce',
        'twitter:title': twitterTitle,
        'twitter:description': twitterDescription,
        'twitter:image': twitterImage,
        'twitter:image:alt': `${twitterTitle} - Event Image`,

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
    const baseUrl = `https://${env.DEFAULT_DOMAIN}`;
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
 * Generate homepage structured data
 */
function generateHomepageStructuredData(homeSettings, featuredEvents = []) {
    const baseUrl = `https://${env.DEFAULT_DOMAIN}`;
    
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

    // Add featured events as ItemList
    if (featuredEvents.length > 0) {
        const eventListData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Featured Events",
            "description": "Upcoming live music events and exclusive experiences",
            "itemListElement": featuredEvents.map((event, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Event",
                    "name": event.title,
                    "url": `${baseUrl}/event/${event.slug}`,
                    "image": event.cover_image,
                    "description": event.description
                }
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
    const baseUrl = `https://${env.DEFAULT_DOMAIN}`;
    
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
    optimizeTextForSEO
};