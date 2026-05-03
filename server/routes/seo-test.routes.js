const express = require('express');
const router = express.Router();
const seoUtils = require('../utils/seo.utils');

/**
 * SEO Testing and Debugging Routes
 * These routes help test and debug SEO meta tags
 */

// Test SEO meta tags generation
router.get('/test-meta-tags', async(req, res) => {
    try {
        // Mock SEO settings for testing
        const mockSeoSettings = {
            default_title: 'HARDLINE - Live Music Events & Artist Connections',
            default_description: 'Discover exclusive live music events, connect with artists, and purchase tickets seamlessly. Join HARDLINE for unforgettable music experiences.',
            default_keywords: 'live music events, concert tickets, artist promotion, event discovery, exclusive music experiences',
            default_author: 'HARDLINE',
            default_og_image: 'https://hardline.events/images/og-image.png',
            twitter_handle: '@hardline events'
        };

        // Generate meta tags using SEO utils
        const metaTags = seoUtils.generateMetaTags({
            title: mockSeoSettings.default_title,
            description: mockSeoSettings.default_description,
            keywords: mockSeoSettings.default_keywords,
            author: mockSeoSettings.default_author,
            image: mockSeoSettings.default_og_image,
            url: '/'
        });

        // Generate HTML for testing
        const testHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Basic Meta Tags -->
    <title>${metaTags.title}</title>
    <meta name="description" content="${metaTags.description}">
    <meta name="keywords" content="${metaTags.keywords}">
    <meta name="author" content="${metaTags.author}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${metaTags.ogUrl}">
    <meta property="og:title" content="${metaTags.ogTitle}">
    <meta property="og:description" content="${metaTags.ogDescription}">
    <meta property="og:image" content="${metaTags.ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${metaTags.ogTitle} - Preview Image">
    <meta property="og:site_name" content="${metaTags.ogSiteName}">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="${metaTags.twitterCard}">
    <meta name="twitter:site" content="${mockSeoSettings.twitter_handle}">
    <meta name="twitter:creator" content="${mockSeoSettings.twitter_handle}">
    <meta name="twitter:url" content="${metaTags.ogUrl}">
    <meta name="twitter:title" content="${metaTags.twitterTitle}">
    <meta name="twitter:description" content="${metaTags.twitterDescription}">
    <meta name="twitter:image" content="${metaTags.twitterImage}">
    <meta name="twitter:image:alt" content="${metaTags.twitterTitle} - Preview Image">

    <!-- Additional SEO Meta Tags -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="${metaTags.appleMobileWebAppCapable}">
    <meta name="apple-mobile-web-app-title" content="${metaTags.title}">
    <meta name="application-name" content="${metaTags.title}">
    <meta name="theme-color" content="${metaTags.themeColor}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${metaTags.canonical}">
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "${metaTags.title}",
        "description": "${metaTags.description}",
        "url": "${metaTags.ogUrl}",
        "image": "${metaTags.ogImage}",
        "publisher": {
            "@type": "Organization",
            "name": "HARDLINE",
            "logo": {
                "@type": "ImageObject",
                "url": "${metaTags.ogImage}"
            }
        }
    }
    </script>
</head>
<body>
    <h1>SEO Meta Tags Test Page</h1>
    <p>This page is for testing SEO meta tags. Check the page source to see all meta tags.</p>
    
    <h2>Generated Meta Tags:</h2>
    <pre>${JSON.stringify(metaTags, null, 2)}</pre>
    
    <h2>Test with Online Tools:</h2>
    <ul>
        <li><a href="https://developers.facebook.com/tools/debug/" target="_blank">Facebook Sharing Debugger</a></li>
        <li><a href="https://cards-dev.twitter.com/validator" target="_blank">Twitter Card Validator</a></li>
        <li><a href="https://search.google.com/test/rich-results" target="_blank">Google Rich Results Test</a></li>
        <li><a href="https://www.opengraph.xyz/" target="_blank">Open Graph Preview</a></li>
    </ul>
</body>
</html>`;

        res.send(testHtml);
    } catch (error) {
        console.error('❌ SEO test error:', error);
        res.status(500).json({ error: 'Failed to generate SEO test page', details: error.message });
    }
});

// API endpoint to get meta tags as JSON
router.get('/api/meta-tags', async(req, res) => {
    try {
        // Get SEO settings from dashboard API
        let seoSettings;
        try {
            const env = require('../env');
            const dashboardApiUrl = env.NODE_ENV === 'production' ?
                'https://admin.b2b.click/api/settings/seo' :
                'http://localhost:3002/api/settings/seo';

            const response = await fetch(dashboardApiUrl);
            if (response.ok) {
                const apiResponse = await response.json();
                seoSettings = apiResponse.settings || apiResponse;
                console.log('✅ SEO test settings fetched from dashboard API:', seoSettings.default_title);
            } else {
                throw new Error(`Dashboard API responded with ${response.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Could not fetch SEO settings from dashboard, using defaults');
            seoSettings = {
                default_title: 'HARDLINE - Live Music Events',
                default_description: 'Discover exclusive live music events and connect with artists',
                default_keywords: 'live music events, concert tickets, artist promotion',
                default_author: 'HARDLINE',
                default_og_image: '/images/og-image.png',
                twitter_handle: '@hardline events'
            };
        }

        // Generate meta tags using SEO utils
        const metaTags = seoUtils.generateMetaTags({
            title: seoSettings.default_title,
            description: seoSettings.default_description,
            keywords: seoSettings.default_keywords,
            author: seoSettings.default_author,
            image: seoSettings.default_og_image,
            url: '/'
        });

        res.json({
            success: true,
            seoSettings,
            metaTags,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ SEO API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate meta tags',
            details: error.message
        });
    }
});

module.exports = router;