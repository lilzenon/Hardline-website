/**
 * Breadcrumb Schema Utility
 * 
 * Generates Google-compliant JSON-LD breadcrumb structured data
 * Following Google's BreadcrumbList guidelines:
 * https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
 * 
 * Key Requirements:
 * - Use canonical domain (bounce2bounce.com)
 * - Homepage labeled as "Events" (not "Home")
 * - Position starts at 1
 * - Last item doesn't need "item" property
 */

const CANONICAL_DOMAIN = 'bounce2bounce.com';
const CANONICAL_ORIGIN = `https://${CANONICAL_DOMAIN}`;

/**
 * Generate breadcrumb JSON-LD structured data
 * @param {Array} breadcrumbs - Array of {name, url} objects
 * @returns {Object} JSON-LD BreadcrumbList object
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => {
      const isLast = index === breadcrumbs.length - 1;
      const item = {
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name
      };

      // Only add "item" property if not the last breadcrumb
      if (!isLast) {
        item.item = `${CANONICAL_ORIGIN}${crumb.url}`;
      }

      return item;
    })
  };
}

/**
 * Inject breadcrumb schema into document head
 * @param {Array} breadcrumbs - Array of {name, url} objects
 * @param {string} scriptId - Unique ID for the script tag
 */
export function injectBreadcrumbSchema(breadcrumbs, scriptId = 'ld-json-breadcrumbs') {
  // Remove existing breadcrumb schema if present
  const existing = document.getElementById(scriptId);
  if (existing) {
    existing.remove();
  }

  const schema = generateBreadcrumbSchema(breadcrumbs);
  if (!schema) {
    return;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = scriptId;
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Predefined breadcrumb configurations for common pages
 */
export const BREADCRUMB_CONFIGS = {
  // Homepage - single item labeled "Events"
  homepage: [
    { name: 'Events', url: '/' }
  ],

  // About page - Events > About
  about: [
    { name: 'Events', url: '/' },
    { name: 'About', url: '/about' }
  ],

  // FAQ page - Events > FAQ
  faq: [
    { name: 'Events', url: '/' },
    { name: 'FAQ', url: '/faq' }
  ],

  // Event detail page - Events > Event Name
  event: (eventName) => [
    { name: 'Events', url: '/' },
    { name: eventName, url: null } // Last item doesn't need URL
  ]
};

/**
 * Get breadcrumb configuration for a specific page
 * @param {string} pageType - Type of page (homepage, about, faq, event)
 * @param {Object} options - Additional options (e.g., eventName for event pages)
 * @returns {Array} Breadcrumb configuration
 */
export function getBreadcrumbConfig(pageType, options = {}) {
  switch (pageType) {
    case 'homepage':
      return BREADCRUMB_CONFIGS.homepage;
    case 'about':
      return BREADCRUMB_CONFIGS.about;
    case 'faq':
      return BREADCRUMB_CONFIGS.faq;
    case 'event':
      return BREADCRUMB_CONFIGS.event(options.eventName || 'Event');
    default:
      return BREADCRUMB_CONFIGS.homepage;
  }
}

/**
 * Initialize breadcrumb schema for a page
 * @param {string} pageType - Type of page
 * @param {Object} options - Additional options
 */
export function initializeBreadcrumbSchema(pageType, options = {}) {
  const breadcrumbs = getBreadcrumbConfig(pageType, options);
  injectBreadcrumbSchema(breadcrumbs, `ld-json-breadcrumbs-${pageType}`);
}

