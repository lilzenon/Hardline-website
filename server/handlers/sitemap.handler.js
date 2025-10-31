const query = require("../queries");
const env = require("../env");

/**
 * Generate XML sitemap for SEO optimization
 * ✅ ONLY includes publicly accessible pages that return HTTP 200
 * ❌ EXCLUDES: API endpoints, AI resources, admin pages, dashboard pages, event pages
 *
 * Includes:
 * - Homepage (/) - displays all events
 * - About page (/about) - with gallery images for Google Image Search
 * - FAQ page (/faq)
 *
 * 🖼️ GOOGLE IMAGE SEO:
 * - About page includes <image:image> tags for all gallery images
 * - Uses Google's image sitemap format (xmlns:image)
 * - Includes image:loc, image:title, and image:caption for each image
 *
 * NOTE: Individual event pages (/event/:slug) are EXCLUDED because:
 * 1. They currently return HTTP 500 errors (broken image URL construction)
 * 2. The homepage already displays all events with ticket purchase functionality
 * 3. Including broken URLs would cause "soft 404" errors in Google Search Console
 *
 * Uses canonical domain: bounce2bounce.com
 */
async function generateSitemap(req, res) {
    try {
        console.log('🗺️ Generating XML sitemap for bounce2bounce.com...');

        // ✅ Use canonical domain (bounce2bounce.com, not b2b.click)
        const baseUrl = 'https://bounce2bounce.com';
        const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

        // Start building sitemap XML with proper namespaces (including image namespace)
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

        // ✅ Homepage - highest priority (displays all events)
        sitemap += `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

        // ✅ About Page - important static page with gallery images
        sitemap += `  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>`;

        // 🖼️ GOOGLE IMAGE SEO: Fetch and include gallery images in sitemap
        try {
            const dashboardApiUrl = env.NODE_ENV === 'production' ?
                'https://admin.b2b.click/api/settings/about/gallery/public' :
                'http://localhost:3002/api/settings/about/gallery/public';

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            const galleryResponse = await fetch(dashboardApiUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            clearTimeout(timeoutId);

            if (galleryResponse.ok) {
                const galleryData = await galleryResponse.json();
                const galleryImages = galleryData.data || [];

                console.log(`🖼️ Adding ${galleryImages.length} gallery images to About page sitemap`);

                // Add image tags for each gallery image
                for (const image of galleryImages) {
                    const imageUrl = image.urls?.large || image.url || image.src;
                    const absoluteImageUrl = imageUrl.startsWith('http')
                        ? imageUrl
                        : `https://admin.b2b.click${imageUrl}`;

                    // Add image:image tag (Google's image sitemap format)
                    sitemap += `
    <image:image>
      <image:loc>${escapeXml(absoluteImageUrl)}</image:loc>`;

                    // Add optional title if available
                    if (image.title) {
                        sitemap += `
      <image:title>${escapeXml(image.title)}</image:title>`;
                    }

                    // Add optional caption if available (using description)
                    if (image.description) {
                        sitemap += `
      <image:caption>${escapeXml(image.description)}</image:caption>`;
                    }

                    sitemap += `
    </image:image>`;
                }

                console.log(`✅ Added ${galleryImages.length} images to About page sitemap`);
            } else {
                console.warn(`⚠️ Failed to fetch gallery images for sitemap: ${galleryResponse.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Error fetching gallery images for sitemap:', error.message);
            // Continue without gallery images - not critical for sitemap generation
        }

        sitemap += `
  </url>
`;

        // ✅ FAQ Page - important static page
        sitemap += `  <url>
    <loc>${baseUrl}/faq</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

        sitemap += `</urlset>`;

        // Set appropriate headers
        res.set({
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            'X-Robots-Tag': 'noindex' // Prevent indexing of sitemap itself
        });

        console.log('✅ Sitemap generated successfully with 3 URLs');
        console.log('📋 Included pages: /, /about (with gallery images), /faq');
        console.log('❌ Excluded: /event/:slug (returns 500), /llms.txt, /api/*, /dashboard/*, /admin/*, /events');
        console.log('ℹ️  All events are displayed on the homepage (/) with ticket purchase functionality');
        console.log('🖼️ About page includes gallery images for Google Image Search optimization');

        res.send(sitemap);

    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        res.status(500).send('Error generating sitemap');
    }
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

/**
 * Generate robots.txt dynamically for bounce2bounce.com
 * ✅ Allows public pages and necessary API endpoints for JavaScript SEO
 * ❌ Blocks admin, dashboard, and private API endpoints
 */
async function generateRobotsTxt(req, res) {
    try {
        const baseUrl = 'https://bounce2bounce.com';

        const robotsTxt = `# Robots.txt for bounce2bounce.com - Public Homepage
User-agent: *

# Allow public pages and assets
Allow: /
Allow: /about
Allow: /faq
Allow: /event/
Allow: /static/
Allow: /images/
Allow: /css/
Allow: /js/

# Allow public API endpoints (required for JavaScript SEO and React rendering)
# These endpoints provide content that Googlebot needs to properly render pages
Allow: /api/settings/about$
Allow: /api/settings/about/gallery/public
Allow: /api/settings/faq$
Allow: /api/settings/seo$
Allow: /api/settings/seo/fast$
Allow: /api/social-media$
Allow: /api/events/public
Allow: /api/settings/maintenance-status$

# Block admin and private endpoints
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/admin/
Disallow: /api/auth/
Disallow: /api/users/
Disallow: /api/analytics/
Disallow: /api/settings/about/gallery/admin
Disallow: /api/settings/about/gallery/upload
Disallow: /api/settings/about/gallery/delete
Disallow: /api/settings/upload/
Disallow: /login
Disallow: /logout
Disallow: /settings
Disallow: /stats

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay to prevent server overload
Crawl-delay: 1`;

        res.set({
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        });

        console.log('✅ robots.txt generated for bounce2bounce.com');
        console.log('✅ Allowed public API endpoints for JavaScript SEO');
        console.log('❌ Blocked admin, dashboard, and private API endpoints');

        res.send(robotsTxt);

    } catch (error) {
        console.error('❌ Error generating robots.txt:', error);
        res.status(500).send('Error generating robots.txt');
    }
}

module.exports = {
    generateSitemap,
    generateRobotsTxt
};
