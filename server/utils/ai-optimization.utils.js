/**
 * AI/LLM Optimization Utilities for BOUNCE2BOUNCE
 * Enhances content structure and markup for better AI discoverability
 */

const env = require("../env");

/**
 * Generate AI-friendly content structure for events
 */
function generateAIFriendlyEventContent(event) {
    const baseUrl = `https://${env.DEFAULT_DOMAIN}`;
    
    // Create comprehensive event description for AI understanding
    const aiDescription = generateEventDescription(event);
    
    // Generate semantic markup
    const semanticMarkup = {
        // Primary content structure
        mainContent: {
            title: event.title,
            description: aiDescription,
            category: 'Live Music Event',
            type: 'Entertainment',
            format: 'In-Person Event'
        },
        
        // Event details for AI parsing
        eventDetails: {
            artist: event.artist_name || null,
            venue: event.event_address || null,
            date: event.event_date || null,
            ticketUrl: event.posh_embed_url || event.tickets_url || null,
            signupUrl: `${baseUrl}/event/${event.slug}`,
            coverImage: event.cover_image || null
        },
        
        // Context for AI models
        context: {
            platform: 'BOUNCE2BOUNCE',
            industry: 'Live Music Events',
            audience: 'Music Fans',
            purpose: 'Event Discovery and Ticket Sales',
            location: event.event_address ? extractLocation(event.event_address) : null
        },
        
        // Keywords for AI indexing
        keywords: generateEventKeywords(event),
        
        // Related content suggestions
        relatedContent: generateRelatedContentSuggestions(event)
    };
    
    return semanticMarkup;
}

/**
 * Generate comprehensive event description for AI understanding
 */
function generateEventDescription(event) {
    let description = event.description || '';
    
    // If no description exists, create one from available data
    if (!description && event.title) {
        const parts = [];
        
        if (event.artist_name) {
            parts.push(`Join ${event.artist_name} for an exclusive live music experience`);
        } else {
            parts.push(`Join us for ${event.title}`);
        }
        
        if (event.event_date) {
            const eventDate = new Date(event.event_date);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
            });
            parts.push(`scheduled for ${formattedDate}`);
        }
        
        if (event.event_address) {
            parts.push(`at ${event.event_address}`);
        }
        
        parts.push('Get notified when tickets become available and don\'t miss this unforgettable music experience.');
        
        description = parts.join(' ') + ' BOUNCE2BOUNCE connects artists with fans through exclusive live music events and seamless ticket purchasing.';
    }
    
    return description;
}

/**
 * Extract location information for AI context
 */
function extractLocation(address) {
    if (!address) return null;
    
    const parts = address.split(',').map(part => part.trim());
    
    return {
        full: address,
        venue: parts[0] || null,
        city: parts[1] || null,
        state: parts[2] || null,
        country: 'United States' // Default for BOUNCE2BOUNCE events
    };
}

/**
 * Generate relevant keywords for AI indexing
 */
function generateEventKeywords(event) {
    const keywords = new Set([
        'live music',
        'concert',
        'event',
        'tickets',
        'BOUNCE2BOUNCE'
    ]);
    
    if (event.title) {
        // Add title words
        event.title.split(' ').forEach(word => {
            if (word.length > 2) {
                keywords.add(word.toLowerCase());
            }
        });
    }
    
    if (event.artist_name) {
        keywords.add(event.artist_name.toLowerCase());
        keywords.add('artist');
        keywords.add('performer');
    }
    
    if (event.event_address) {
        const location = extractLocation(event.event_address);
        if (location.city) keywords.add(location.city.toLowerCase());
        if (location.state) keywords.add(location.state.toLowerCase());
        keywords.add('venue');
    }
    
    // Add genre-related keywords (could be enhanced with genre detection)
    keywords.add('music experience');
    keywords.add('live performance');
    keywords.add('exclusive event');
    
    return Array.from(keywords);
}

/**
 * Generate related content suggestions for AI models
 */
function generateRelatedContentSuggestions(event) {
    const suggestions = [];
    
    if (event.artist_name) {
        suggestions.push({
            type: 'artist_events',
            description: `Other events featuring ${event.artist_name}`,
            query: `events by ${event.artist_name}`
        });
    }
    
    if (event.event_address) {
        const location = extractLocation(event.event_address);
        if (location.city) {
            suggestions.push({
                type: 'location_events',
                description: `Other events in ${location.city}`,
                query: `events in ${location.city}`
            });
        }
    }
    
    suggestions.push(
        {
            type: 'similar_events',
            description: 'Similar live music events',
            query: 'live music concerts and events'
        },
        {
            type: 'platform_info',
            description: 'About BOUNCE2BOUNCE platform',
            query: 'BOUNCE2BOUNCE event platform features'
        }
    );
    
    return suggestions;
}

/**
 * Generate FAQ structured data for AI understanding
 */
function generateEventFAQ(event) {
    const faqs = [];
    
    // Basic event questions
    faqs.push({
        question: `What is ${event.title}?`,
        answer: generateEventDescription(event)
    });
    
    if (event.artist_name) {
        faqs.push({
            question: `Who is performing at ${event.title}?`,
            answer: `${event.artist_name} will be performing at this exclusive live music event.`
        });
    }
    
    if (event.event_date) {
        const eventDate = new Date(event.event_date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
        
        faqs.push({
            question: `When is ${event.title}?`,
            answer: `${event.title} is scheduled for ${formattedDate}.`
        });
    }
    
    if (event.event_address) {
        faqs.push({
            question: `Where is ${event.title} taking place?`,
            answer: `The event will be held at ${event.event_address}.`
        });
    }
    
    faqs.push({
        question: 'How do I get tickets?',
        answer: event.posh_embed_url || event.tickets_url 
            ? 'Tickets can be purchased through our integrated ticket platform. Click the ticket button to access the secure checkout.'
            : 'Sign up to get notified when tickets become available. We\'ll send you an email as soon as tickets go on sale.'
    });
    
    faqs.push({
        question: 'What is BOUNCE2BOUNCE?',
        answer: 'BOUNCE2BOUNCE is a live music events platform that connects artists with fans through exclusive experiences and seamless ticket sales. We specialize in curating unique music events and providing easy access to tickets.'
    });
    
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

/**
 * Generate AI-friendly homepage content structure
 */
function generateHomepageAIContent(homeSettings, featuredEvents = []) {
    const baseUrl = `https://${env.DEFAULT_DOMAIN}`;
    
    return {
        platform: {
            name: 'BOUNCE2BOUNCE',
            description: 'Live music events platform connecting artists with fans through exclusive experiences and seamless ticket sales',
            purpose: 'Event discovery, artist promotion, and ticket sales for live music experiences',
            target_audience: 'Music fans, event organizers, artists, and ticket buyers',
            key_features: [
                'Event discovery and browsing',
                'Seamless ticket purchasing',
                'Artist promotion tools',
                'QR code analytics',
                'Mobile-first design',
                'Admin dashboard for event management'
            ]
        },
        
        current_events: featuredEvents.map(event => ({
            title: event.title,
            artist: event.artist_name,
            url: `${baseUrl}/event/${event.slug}`,
            description: event.description,
            status: 'featured'
        })),
        
        content_types: [
            'Live music events',
            'Concert listings',
            'Artist profiles',
            'Ticket sales',
            'Event analytics',
            'Venue information'
        ],
        
        geographic_focus: [
            'Asbury Park, NJ',
            'New York Metro Area',
            'Philadelphia Region',
            'Atlantic Coast venues',
            'East Coast markets'
        ],
        
        contact_info: {
            website: baseUrl,
            platform_access: `${baseUrl}/dashboard`,
            event_listings: `${baseUrl}/events`
        }
    };
}

/**
 * Generate content summary for AI models
 */
function generateContentSummary(content, maxLength = 300) {
    if (!content) return '';
    
    // Remove HTML tags and normalize whitespace
    const cleanContent = content
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    
    if (cleanContent.length <= maxLength) {
        return cleanContent;
    }
    
    // Find the best place to cut off
    const sentences = cleanContent.split(/[.!?]+/);
    let summary = '';
    
    for (const sentence of sentences) {
        const testSummary = summary + sentence + '.';
        if (testSummary.length > maxLength) {
            break;
        }
        summary = testSummary;
    }
    
    return summary || cleanContent.substring(0, maxLength - 3) + '...';
}

module.exports = {
    generateAIFriendlyEventContent,
    generateEventDescription,
    generateEventKeywords,
    generateEventFAQ,
    generateHomepageAIContent,
    generateContentSummary,
    extractLocation
};
