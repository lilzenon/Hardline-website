/**
 * Breadcrumb Utilities for BOUNCE2BOUNCE
 * Generates breadcrumb navigation for better SEO and user experience
 */

/**
 * Generate breadcrumb data for different page types
 */
function generateBreadcrumbs(pageType, data = {}) {
    const breadcrumbs = [
        {
            name: 'Home',
            url: '/',
            active: false
        }
    ];

    switch (pageType) {
        case 'event':
            breadcrumbs.push(
                {
                    name: 'Events',
                    url: '/events',
                    active: false
                },
                {
                    name: data.title || 'Event',
                    url: `/event/${data.slug}`,
                    active: true
                }
            );
            break;

        case 'events-list':
            breadcrumbs.push({
                name: 'Events',
                url: '/events',
                active: true
            });
            break;

        case 'dashboard':
            breadcrumbs.push({
                name: 'Dashboard',
                url: '/dashboard',
                active: true
            });
            break;

        case 'dashboard-events':
            breadcrumbs.push(
                {
                    name: 'Dashboard',
                    url: '/dashboard',
                    active: false
                },
                {
                    name: 'Events',
                    url: '/dashboard/events',
                    active: true
                }
            );
            break;

        case 'dashboard-event-edit':
            breadcrumbs.push(
                {
                    name: 'Dashboard',
                    url: '/dashboard',
                    active: false
                },
                {
                    name: 'Events',
                    url: '/dashboard/events',
                    active: false
                },
                {
                    name: data.title || 'Edit Event',
                    url: `/dashboard/events/${data.id}/edit`,
                    active: true
                }
            );
            break;

        case 'dashboard-analytics':
            breadcrumbs.push(
                {
                    name: 'Dashboard',
                    url: '/dashboard',
                    active: false
                },
                {
                    name: 'Analytics',
                    url: '/dashboard/analytics',
                    active: true
                }
            );
            break;

        case 'home-editor':
            breadcrumbs.push(
                {
                    name: 'Dashboard',
                    url: '/dashboard',
                    active: false
                },
                {
                    name: 'Home Editor',
                    url: '/dashboard/home-editor',
                    active: true
                }
            );
            break;

        default:
            // For unknown page types, just show home
            break;
    }

    return breadcrumbs;
}

/**
 * Generate breadcrumb HTML for templates
 */
function generateBreadcrumbHTML(breadcrumbs, options = {}) {
    const { 
        containerClass = 'breadcrumb-container',
        listClass = 'breadcrumb-list',
        itemClass = 'breadcrumb-item',
        linkClass = 'breadcrumb-link',
        activeClass = 'breadcrumb-active',
        separator = '/'
    } = options;

    if (!breadcrumbs || breadcrumbs.length === 0) {
        return '';
    }

    let html = `<nav class="${containerClass}" aria-label="Breadcrumb">
    <ol class="${listClass}">`;

    breadcrumbs.forEach((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const itemClasses = [itemClass];
        
        if (crumb.active || isLast) {
            itemClasses.push(activeClass);
        }

        html += `
        <li class="${itemClasses.join(' ')}">`;

        if (crumb.active || isLast) {
            html += `
            <span aria-current="page">${escapeHtml(crumb.name)}</span>`;
        } else {
            html += `
            <a href="${crumb.url}" class="${linkClass}">${escapeHtml(crumb.name)}</a>`;
        }

        if (!isLast) {
            html += `
            <span class="breadcrumb-separator" aria-hidden="true">${separator}</span>`;
        }

        html += `
        </li>`;
    });

    html += `
    </ol>
</nav>`;

    return html;
}

/**
 * Generate structured data for breadcrumbs
 */
function generateBreadcrumbStructuredData(breadcrumbs, baseUrl = '') {
    if (!breadcrumbs || breadcrumbs.length === 0) {
        return null;
    }

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

/**
 * Generate internal linking suggestions based on content
 */
function generateInternalLinks(pageType, data = {}) {
    const links = [];

    switch (pageType) {
        case 'event':
            links.push(
                {
                    text: 'Browse More Events',
                    url: '/events',
                    description: 'Discover other upcoming live music events'
                },
                {
                    text: 'Event Dashboard',
                    url: '/dashboard/events',
                    description: 'Manage your events'
                }
            );

            // Add artist-related links if available
            if (data.artist_name) {
                links.push({
                    text: `More ${data.artist_name} Events`,
                    url: `/events?artist=${encodeURIComponent(data.artist_name)}`,
                    description: `Find more events featuring ${data.artist_name}`
                });
            }

            // Add location-based links if available
            if (data.event_address) {
                const location = data.event_address.split(',')[0];
                links.push({
                    text: `Events in ${location}`,
                    url: `/events?location=${encodeURIComponent(location)}`,
                    description: `Discover more events in ${location}`
                });
            }
            break;

        case 'homepage':
            links.push(
                {
                    text: 'Browse All Events',
                    url: '/events',
                    description: 'Explore our complete event listings'
                },
                {
                    text: 'Event Dashboard',
                    url: '/dashboard',
                    description: 'Access your event management dashboard'
                },
                {
                    text: 'Analytics',
                    url: '/dashboard/analytics',
                    description: 'View event performance and analytics'
                }
            );
            break;

        case 'dashboard':
            links.push(
                {
                    text: 'Create New Event',
                    url: '/dashboard/events/create',
                    description: 'Set up a new event listing'
                },
                {
                    text: 'View Analytics',
                    url: '/dashboard/analytics',
                    description: 'Check your event performance metrics'
                },
                {
                    text: 'Home Page Editor',
                    url: '/dashboard/home-editor',
                    description: 'Customize your homepage content'
                }
            );
            break;

        default:
            // Default internal links for any page
            links.push(
                {
                    text: 'Home',
                    url: '/',
                    description: 'Return to homepage'
                },
                {
                    text: 'Events',
                    url: '/events',
                    description: 'Browse live music events'
                }
            );
            break;
    }

    return links;
}

/**
 * Escape HTML characters for safe output
 */
function escapeHtml(text) {
    if (!text) return '';
    
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * Generate URL-friendly slugs for better SEO
 */
function generateSlug(text) {
    if (!text) return '';
    
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

module.exports = {
    generateBreadcrumbs,
    generateBreadcrumbHTML,
    generateBreadcrumbStructuredData,
    generateInternalLinks,
    generateSlug,
    escapeHtml
};
