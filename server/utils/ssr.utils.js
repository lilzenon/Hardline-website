const React = require('react');
const ReactDOMServer = require('react-dom/server');
const env = require('../env');

/**
 * Server-Side Rendering Utilities for BOUNCE2BOUNCE Event Pages
 * 
 * This module provides utilities for rendering React components server-side
 * while maintaining SEO performance and enabling client-side hydration.
 */

/**
 * Generate HTML template with meta tags and React SSR content
 * 
 * @param {Object} options - Rendering options
 * @param {string} options.reactHtml - Rendered React component HTML
 * @param {Object} options.metaTags - SEO meta tags object
 * @param {Object} options.initialData - Data to pass to client for hydration
 * @param {string} options.pageTitle - Page title
 * @param {string} options.defaultDomain - Default domain for canonical URLs
 * @returns {string} Complete HTML document
 */
function generateHTMLTemplate({ reactHtml, metaTags, initialData, pageTitle, defaultDomain }) {
    const domain = defaultDomain || env.DEFAULT_DOMAIN;
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    
    <!-- Page Title -->
    <title>${escapeHtml(pageTitle || metaTags.title || 'BOUNCE2BOUNCE')}</title>
    
    <!-- Theme Color for Mobile Browser UI -->
    <meta name="theme-color" content="${initialData.event?.overscroll_background_color || '#f2f2f7'}"/>
    
    <!-- iOS Safari Viewport Configuration -->
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
    
    <!-- Basic SEO Meta Tags -->
    <meta name="description" content="${escapeHtml(metaTags.description || '')}">
    <meta name="keywords" content="${escapeHtml(metaTags.keywords || '')}">
    <meta name="author" content="BOUNCE2BOUNCE">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">
    <link rel="canonical" href="${metaTags['og:url'] || `https://${domain}`}">
    
    <!-- Open Graph Meta Tags (Facebook, LinkedIn, WhatsApp) -->
    <meta property="og:title" content="${escapeHtml(metaTags['og:title'] || '')}">
    <meta property="og:description" content="${escapeHtml(metaTags['og:description'] || '')}">
    <meta property="og:type" content="${metaTags['og:type'] || 'website'}">
    <meta property="og:url" content="${metaTags['og:url'] || ''}">
    <meta property="og:site_name" content="${metaTags['og:site_name'] || 'BOUNCE2BOUNCE'}">
    <meta property="og:locale" content="${metaTags['og:locale'] || 'en_US'}">
    ${metaTags['og:image'] ? `
    <meta property="og:image" content="${metaTags['og:image']}">
    <meta property="og:image:width" content="${metaTags['og:image:width'] || '1200'}">
    <meta property="og:image:height" content="${metaTags['og:image:height'] || '630'}">
    <meta property="og:image:alt" content="${escapeHtml(metaTags['og:image:alt'] || '')}">
    <meta property="og:image:type" content="${metaTags['og:image:type'] || 'image/jpeg'}">
    ` : ''}
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="${metaTags['twitter:card'] || 'summary_large_image'}">
    <meta name="twitter:site" content="${metaTags['twitter:site'] || '@bounce2bounce'}">
    <meta name="twitter:creator" content="${metaTags['twitter:creator'] || '@bounce2bounce'}">
    <meta name="twitter:title" content="${escapeHtml(metaTags['twitter:title'] || '')}">
    <meta name="twitter:description" content="${escapeHtml(metaTags['twitter:description'] || '')}">
    ${metaTags['twitter:image'] ? `
    <meta name="twitter:image" content="${metaTags['twitter:image']}">
    <meta name="twitter:image:alt" content="${escapeHtml(metaTags['twitter:image:alt'] || '')}">
    ` : ''}
    
    <!-- iOS Messages / Apple Meta Tags -->
    ${metaTags['apple-mobile-web-app-title'] ? `
    <meta name="apple-mobile-web-app-title" content="${escapeHtml(metaTags['apple-mobile-web-app-title'])}">
    ` : ''}
    
    <!-- Article Meta Tags -->
    ${metaTags['article:published_time'] ? `
    <meta property="article:published_time" content="${metaTags['article:published_time']}">
    ` : ''}
    ${metaTags['article:modified_time'] ? `
    <meta property="article:modified_time" content="${metaTags['article:modified_time']}">
    ` : ''}
    ${metaTags['article:author'] ? `
    <meta property="article:author" content="${escapeHtml(metaTags['article:author'])}">
    ` : ''}
    ${metaTags['article:section'] ? `
    <meta property="article:section" content="${escapeHtml(metaTags['article:section'])}">
    ` : ''}
    ${metaTags['article:tag'] ? `
    <meta property="article:tag" content="${escapeHtml(metaTags['article:tag'])}">
    ` : ''}
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"/>
    <link href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,300,500&display=swap" rel="stylesheet"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/css/globalbank-authentic.css"/>
    <link rel="stylesheet" href="/css/breadcrumb.css"/>
    ${initialData.event?.display_tickets ? `
    <link rel="stylesheet" href="/css/checkout-nav.css">
    <link rel="stylesheet" href="/css/figma-home.css">
    ` : ''}
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.ico"/>
    
    <!-- Initial Data for Client-Side Hydration -->
    <script>
        window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        window.__META_TAGS__ = ${JSON.stringify(metaTags)};
    </script>
</head>
<body>
    <!-- React SSR Content -->
    <div id="root">${reactHtml}</div>
    
    <!-- Client-Side Hydration Script -->
    <script type="module" src="/js/event-landing-hydrate.js"></script>
</body>
</html>`;
}

/**
 * Escape HTML to prevent XSS attacks
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Render a React component to HTML string with SSR
 *
 * @param {React.Component} Component - React component to render
 * @param {Object} props - Props to pass to the component
 * @param {Object} options - Rendering options
 * @param {Object} options.metaTags - SEO meta tags
 * @param {string} options.pageTitle - Page title
 * @param {string} options.defaultDomain - Default domain
 * @param {boolean} options.fullDocument - If true, component returns complete HTML document
 * @returns {string} Complete HTML document
 */
function renderReactPage(Component, props, options = {}) {
    try {
        // Render React component to HTML string
        const reactHtml = ReactDOMServer.renderToString(
            React.createElement(Component, props)
        );

        // If component returns full HTML document, return it directly
        if (options.fullDocument) {
            return '<!DOCTYPE html>\n' + reactHtml;
        }

        // Otherwise, wrap in HTML template
        const initialData = {
            ...props,
            _ssrRendered: true,
            _renderTime: Date.now()
        };

        const html = generateHTMLTemplate({
            reactHtml,
            metaTags: options.metaTags || {},
            initialData,
            pageTitle: options.pageTitle,
            defaultDomain: options.defaultDomain
        });

        return html;

    } catch (error) {
        console.error('❌ SSR rendering error:', error);
        throw new Error(`Failed to render React component: ${error.message}`);
    }
}

/**
 * Render React component with error handling and fallback
 * 
 * @param {React.Component} Component - React component to render
 * @param {Object} props - Props to pass to the component
 * @param {Object} options - Rendering options
 * @param {Function} options.fallback - Fallback function if SSR fails
 * @returns {Promise<string>} Complete HTML document
 */
async function renderReactPageSafe(Component, props, options = {}) {
    try {
        return renderReactPage(Component, props, options);
    } catch (error) {
        console.error('❌ SSR rendering failed, using fallback:', error);
        
        if (options.fallback && typeof options.fallback === 'function') {
            return await options.fallback(props, error);
        }
        
        throw error;
    }
}

/**
 * Check if SSR is enabled and available
 * @returns {boolean} True if SSR is available
 */
function isSSRAvailable() {
    try {
        return typeof ReactDOMServer !== 'undefined' && 
               typeof ReactDOMServer.renderToString === 'function';
    } catch (error) {
        return false;
    }
}

module.exports = {
    renderReactPage,
    renderReactPageSafe,
    generateHTMLTemplate,
    escapeHtml,
    isSSRAvailable
};

