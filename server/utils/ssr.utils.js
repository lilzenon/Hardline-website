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

    <!-- Tracking Pixels -->
    ${generatePixelScripts(options.trackingPixels)}
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
 * Generate tracking pixel scripts based on settings
 * @param {Object} px - Pixel settings
 * @returns {string} HTML string with script tags
 */
function generatePixelScripts(px) {
    if (!px) return '';
    let scripts = '';

    // Google Ads / GA4
    if (px.google_ads_id || px.google_analytics_id) {
        // Decide which ID to use for the main script load (doesn't matter much, gtag handles both)
        const mainId = px.google_ads_id || px.google_analytics_id;
        scripts += `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${mainId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      ${px.google_analytics_id ? `gtag('config', '${px.google_analytics_id}');` : ''}
      ${px.google_ads_id ? `gtag('config', '${px.google_ads_id}');` : ''}
    </script>`;
    }

    // Meta Pixel
    if (px.meta_pixel_id && px.meta_pixel_enabled) {
        scripts += `
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${px.meta_pixel_id}');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=${px.meta_pixel_id}&ev=PageView&noscript=1"
    /></noscript>
    <!-- End Meta Pixel Code -->`;
    }

    // TikTok Pixel
    if (px.tiktok_pixel_id && px.tiktok_pixel_enabled) {
        scripts += `
    <!-- TikTok Pixel Code -->
    <script>
    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
      ttq.load('${px.tiktok_pixel_id}');
      ttq.page();
    }(window, document, 'ttq');
    </script>
    <!-- End TikTok Pixel Code -->`;
    }

    // Snapchat Pixel
    if (px.snapchat_pixel_id && px.snapchat_pixel_enabled) {
        scripts += `
    <!-- Snap Pixel Code -->
    <script type='text/javascript'>
    (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
    {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
    a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
    r.src=n;var u=t.getElementsByTagName(s)[0];
    u.parentNode.insertBefore(r,u);})(window,document,
    'https://sc-static.net/scevent.min.js');
    snaptr('init', '${px.snapchat_pixel_id}', {
    'user_email': '__INSERT_USER_EMAIL__'
    });
    snaptr('track', 'PAGE_VIEW');
    </script>
    <!-- End Snap Pixel Code -->`;
    }

    // Pinterest Tag
    if (px.pinterest_tag_id && px.pinterest_tag_enabled) {
        scripts += `
    <!-- Pinterest Tag -->
    <script>
    !function(e){if(!window.pintrk){window.pintrk = function () {
    window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
    n=window.pintrk;n.queue=[],n.version="3.0";var
    t=document.createElement("script");t.async=!0,t.src=e;var
    r=document.getElementsByTagName("script")[0];
    r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
    pintrk('load', '${px.pinterest_tag_id}', { em: '<user_email_address>' });
    pintrk('page');
    </script>
    <noscript>
    <img height="1" width="1" style="display:none;" alt=""
    src="https://ct.pinterest.com/v3/?event=init&tid=${px.pinterest_tag_id}&pd[em]=<hashed_email_address>&noscript=1" />
    </noscript>
    <!-- End Pinterest Tag -->`;
    }

    return scripts;
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

