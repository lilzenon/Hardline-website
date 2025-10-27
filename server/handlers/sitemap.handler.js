const query = require("../queries");
const env = require("../env");

/**
 * Generate XML sitemap for SEO optimization
 * Includes homepage, active events, and static pages
 */
async function generateSitemap(req, res) {
    try {
        console.log('🗺️ Generating XML sitemap...');
        
        const baseUrl = env.PRODUCTION_HOMEPAGE_URL || `https://${env.DEFAULT_DOMAIN}`;
        const currentDate = new Date().toISOString();
        
        // Get all active events for sitemap
        const activeEvents = await query.event.find({ 
            is_active: true 
        });
        
        console.log(`📋 Found ${activeEvents.length} active events for sitemap`);
        
        // Start building sitemap XML
        let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

        // Homepage - highest priority
        // ✅ SEO FIX: Only include canonical URL (/) - removed /home to prevent "Page with redirect" errors
        sitemap += `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

        // Add each active event
        for (const event of activeEvents) {
            const eventUrl = `${baseUrl}/event/${event.slug}`;
            const lastMod = event.updated_at ? new Date(event.updated_at).toISOString() : currentDate;
            
            sitemap += `  <url>
    <loc>${eventUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
            
            // Add image if available
            if (event.cover_image) {
                sitemap += `
    <image:image>
      <image:loc>${event.cover_image}</image:loc>
      <image:title>${escapeXml(event.title)}</image:title>
      <image:caption>${escapeXml(event.description || event.title)}</image:caption>
    </image:image>`;
            }
            
            sitemap += `
  </url>
`;
        }

        // Add static/important pages
        const staticPages = [
            { url: '/about', priority: '0.6', changefreq: 'monthly' },
            { url: '/faq', priority: '0.7', changefreq: 'weekly' },
            { url: '/privacy', priority: '0.3', changefreq: 'monthly' },
            { url: '/terms', priority: '0.3', changefreq: 'monthly' }
        ];

        for (const page of staticPages) {
            sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
        }

        sitemap += `</urlset>`;

        // Set appropriate headers
        res.set({
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        });

        console.log('✅ Sitemap generated successfully');
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
 * Generate robots.txt dynamically (if needed)
 */
async function generateRobotsTxt(req, res) {
    try {
        const baseUrl = env.PRODUCTION_HOMEPAGE_URL || `https://${env.DEFAULT_DOMAIN}`;
        
        const robotsTxt = `# Robots.txt for ${env.DEFAULT_DOMAIN} - Event Platform
User-agent: *
Allow: /
Allow: /event/
Allow: /drop/
Allow: /home
Allow: /static/
Allow: /images/
Allow: /css/
Allow: /js/

Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /login
Disallow: /logout
Disallow: /settings
Disallow: /stats

Sitemap: ${baseUrl}/sitemap.xml

Crawl-delay: 1`;

        res.set({
            'Content-Type': 'text/plain',
            'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        });

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
