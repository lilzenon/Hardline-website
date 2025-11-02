const query = require("../queries");
const env = require("../env");

/**
 * Generate XML sitemap for SEO optimization
 * ✅ ONLY includes publicly accessible pages that return HTTP 200
 * ❌ EXCLUDES: API endpoints, AI resources, admin pages, dashboard pages
 *
 * Includes:
 * - Homepage (/) - displays all events with cover images for Google Image Search
 * - About page (/about) - with gallery images for Google Image Search
 * - FAQ page (/faq)
 * - Individual event pages (/event/:slug) - with Event structured data for Google Events
 *
 * 🖼️ GOOGLE IMAGE SEO:
 * - Homepage includes <image:image> tags for all event cover images
 * - About page includes <image:image> tags for all gallery images
 * - Uses Google's image sitemap format (xmlns:image)
 * - Includes image:loc, image:title, and image:caption for each image
 *
 * 🎯 GOOGLE EVENT SEO:
 * - Individual event pages include Event structured data (schema.org/Event)
 * - Each event has unique URL: /event/:slug
 * - Events redirect to external ticket URLs after 150ms (allows Google to parse schema)
 * - Only active events with show_on_homepage=true are included
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

        // ✅ Homepage - highest priority (displays all events with cover images)
        sitemap += `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>`;

        // 🖼️ GOOGLE IMAGE SEO: Fetch and include event cover images in sitemap
        try {
            const dashboardApiUrl = env.NODE_ENV === 'production' ?
                'https://admin.b2b.click/api/home-settings/homepage-data' :
                'http://localhost:3002/api/home-settings/homepage-data';

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            const eventsResponse = await fetch(dashboardApiUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            clearTimeout(timeoutId);

            if (eventsResponse.ok) {
                const eventsData = await eventsResponse.json();
                const featuredEvents = eventsData.featuredEvents || [];
                const homepageEvents = eventsData.homepageEvents || [];
                const allEvents = [...featuredEvents, ...homepageEvents];

                console.log(`🖼️ Adding ${allEvents.length} event cover images to homepage sitemap`);

                // Add image tags for each event cover image
                for (const event of allEvents) {
                    if (!event.cover_image) continue; // Skip events without cover images

                    const imageUrl = event.cover_image;
                    const absoluteImageUrl = imageUrl.startsWith('http')
                        ? imageUrl
                        : `https://admin.b2b.click${imageUrl}`;

                    // Add image:image tag (Google's image sitemap format)
                    sitemap += `
    <image:image>
      <image:loc>${escapeXml(absoluteImageUrl)}</image:loc>`;

                    // Add optional title if available
                    const imageTitle = event.image_title || event.title || `${event.artist_name || 'Event'} Cover Image`;
                    if (imageTitle) {
                        sitemap += `
      <image:title>${escapeXml(imageTitle)}</image:title>`;
                    }

                    // Add optional caption if available (using description or alt text)
                    const imageCaption = event.image_description || event.image_alt_text || `Cover image for ${event.title || event.artist_name || 'event'}`;
                    if (imageCaption) {
                        sitemap += `
      <image:caption>${escapeXml(imageCaption)}</image:caption>`;
                    }

                    sitemap += `
    </image:image>`;
                }

                console.log(`✅ Added ${allEvents.filter(e => e.cover_image).length} event cover images to homepage sitemap`);
            } else {
                console.warn(`⚠️ Failed to fetch events for sitemap: ${eventsResponse.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Error fetching events for sitemap:', error.message);
            // Continue without event images - not critical for sitemap generation
        }

        sitemap += `
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

        // 🎯 INDIVIDUAL EVENT PAGES - with Event structured data for Google Events
        // Only include active events with show_on_homepage=true
        let eventCount = 0;
        try {
            const dashboardApiUrl = env.NODE_ENV === 'production' ?
                'https://admin.b2b.click/api/home-settings/homepage-data' :
                'http://localhost:3002/api/home-settings/homepage-data';

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            const eventsResponse = await fetch(dashboardApiUrl, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            clearTimeout(timeoutId);

            if (eventsResponse.ok) {
                const eventsData = await eventsResponse.json();
                const featuredEvents = eventsData.featuredEvents || [];
                const homepageEvents = eventsData.homepageEvents || [];

                // Combine and deduplicate events by slug
                const allEvents = [...featuredEvents, ...homepageEvents];
                const uniqueEvents = Array.from(
                    new Map(allEvents.map(event => [event.slug, event])).values()
                );

                console.log(`🎯 Adding ${uniqueEvents.length} individual event pages to sitemap`);

                // Add URL entry for each event
                for (const event of uniqueEvents) {
                    if (!event.slug || !event.is_active) continue;

                    // Use event's updated_at or created_at for lastmod
                    const eventLastMod = event.updated_at || event.created_at || currentDate;
                    const lastModDate = new Date(eventLastMod).toISOString().split('T')[0];

                    sitemap += `  <url>
    <loc>${baseUrl}/event/${escapeXml(event.slug)}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
                    eventCount++;
                }

                console.log(`✅ Added ${eventCount} event pages to sitemap`);
            } else {
                console.warn(`⚠️ Failed to fetch events for sitemap: ${eventsResponse.status}`);
            }
        } catch (error) {
            console.warn('⚠️ Error fetching events for sitemap:', error.message);
            // Continue without event pages - not critical for sitemap generation
        }

        sitemap += `</urlset>`;

        // Set appropriate headers
        res.set({
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            'X-Robots-Tag': 'noindex' // Prevent indexing of sitemap itself
        });

        const totalUrls = 3 + eventCount; // 3 static pages + event pages
        console.log(`✅ Sitemap generated successfully with ${totalUrls} URLs`);
        console.log('📋 Included pages: / (with event cover images), /about (with gallery images), /faq, /event/:slug (with Event schemas)');
        console.log('❌ Excluded: /llms.txt, /api/*, /dashboard/*, /admin/*, /events');
        console.log('🖼️ Homepage includes event cover images for Google Image Search optimization');
        console.log('🖼️ About page includes gallery images for Google Image Search optimization');
        console.log('🎯 Individual event pages include Event structured data for Google Events');

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
