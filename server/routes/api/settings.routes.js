/*
 Local settings routes for development/offline fallback.
 These endpoints mirror the dashboard API shape so the frontend can keep working
 even when the dashboard server is unavailable.
*/

const express = require("express");
const router = express.Router();

// GET /api/settings/seo - Proxy to dashboard for SEO settings
const { getAllowedOrigins } = require('../../middleware/origin-validation.middleware');

// Helper function to determine the correct dashboard URL
function getDashboardUrl(req) {
    const env = require('../../env');

    // If explicitly set in environment, use that
    if (env.DASHBOARD_URL && env.DASHBOARD_URL !== 'http://localhost:3002') {
        return env.DASHBOARD_URL;
    }

    // Development mode
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3002';
    }

    // Detect beta environment from request host
    const host = req?.get?.('host') || '';
    const isBeta = host.includes('beta.');

    if (isBeta) {
        return 'https://beta.b2b.click';
    }

    // Default to production dashboard
    return 'https://admin.b2b.click';
}

// Append ?domain=<host> so admin's multi-tenant SEO returns the row for the
// requesting public domain (hardline.events vs bounce2bounce.com). Server-to-
// server fetches lose the browser's Origin, so without this admin returns the
// default/NULL row and tabs show the wrong brand.
function withDomainParam(url, req) {
    const host = req?.get?.('host');
    if (!host) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}domain=${encodeURIComponent(host)}`;
}

// Wrap fetch with an AbortController so a hung dashboard call falls through
// to the route's catch + JSON fallback instead of stalling until the upstream
// LB returns a 504 HTML page.
async function dashFetch(url, { timeoutMs = 5000, req } = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    const headers = { 'Content-Type': 'application/json' };
    const host = req?.get?.('host');
    if (host) headers['Origin'] = `https://${host}`;
    try {
        return await fetch(url, { method: 'GET', headers, signal: controller.signal });
    } finally {
        clearTimeout(timeoutId);
    }
}

router.get("/seo", async (req, res) => {
    try {
        console.log('🔍 Homepage: Fetching SEO settings from dashboard...');

        const dashboardUrl = getDashboardUrl(req);
        const target = withDomainParam(`${dashboardUrl}/api/settings/seo`, req);
        console.log(`📡 Proxying SEO request to: ${target}`);

        const response = await dashFetch(target, { timeoutMs: 8000, req });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Homepage: SEO settings fetched from dashboard:', {
                title: data.settings?.default_title?.substring(0, 40) + '...',
                hasShopEnabled: data.settings?.shop_enabled !== undefined
            });
            return res.json(data);
        } else {
            throw new Error(`Dashboard responded with ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Homepage: Error fetching SEO settings from dashboard:', error.message);

        // Fallback to hardcoded defaults only if dashboard is completely unavailable
        console.warn('⚠️ Using fallback SEO settings (dashboard unreachable)');
        return res.json({
            success: true,
            settings: {
                default_title: "HARDLINE - NJ'S PREMIERE EDM COLLECTIVE",
                default_description: "HardLine Events is New Jersey's leading EDM event brand, producing curated electronic music events across NJ, NY, and the tri-state area.",
                default_keywords: "edm events, electronic dance music, nj events, hardline events, live music",
                default_author: "HARDLINE",
                maintenance_mode: false,
                shop_enabled: false
            },
            fallback: true
        });
    }
});

// GET /api/settings/seo/fast - Proxy to dashboard for FAST SEO settings
router.get("/seo/fast", async (req, res) => {
    try {
        console.log('🔍 Homepage: Fetching FAST SEO settings from dashboard...');
        const dashboardUrl = getDashboardUrl(req);
        const target = withDomainParam(`${dashboardUrl}/api/settings/seo/fast`, req);

        const response = await dashFetch(target, { timeoutMs: 5000, req });

        if (response.ok) {
            const data = await response.json();
            return res.json(data);
        }

        throw new Error(`Dashboard responded ${response.status}`);
    } catch (error) {
        console.error('❌ Homepage: Error fetching FAST SEO settings:', error.message);
        // Return JSON fallback directly. A redirect here would force the
        // browser into another roundtrip and, if the dashboard is still
        // hung, would 504 again.
        return res.json({
            success: true,
            settings: {
                default_title: "HARDLINE - NJ'S PREMIERE EDM COLLECTIVE",
                default_description: "HardLine Events is New Jersey's leading EDM event brand, producing curated electronic music events across NJ, NY, and the tri-state area.",
                default_keywords: "edm events, electronic dance music, nj events, hardline events, live music",
                default_author: "HARDLINE",
                maintenance_mode: false,
                shop_enabled: false
            },
            fallback: true
        });
    }
});

// GET /api/settings/maintenance-status
router.get("/maintenance-status", async (req, res) => {
    try {
        const base = process.env.DASHBOARD_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : 'https://admin.b2b.click');
        const resp = await dashFetch(`${base}/api/settings/maintenance-status`, { timeoutMs: 4000, req });
        if (resp.ok) {
            const data = await resp.json();
            return res.json(data);
        }
        throw new Error(`Dashboard responded ${resp.status}`);
    } catch (err) {
        console.warn('⚠️ Fallback maintenance-status (dashboard unreachable):', err.message);
        return res.json({
            success: true,
            maintenance_mode: false,
            maintenance_message: "Service temporarily unavailable",
        });
    }
});

// POST /api/settings/maintenance-refresh
// Force refresh maintenance status cache (for immediate updates)
router.post("/maintenance-refresh", async (req, res) => {
    try {
        console.log('🔄 Maintenance cache refresh requested');

        const { refreshMaintenanceStatus } = require('../../middleware/maintenance.middleware');
        const status = await refreshMaintenanceStatus();

        res.json({
            success: true,
            message: 'Maintenance status cache refreshed',
            status: status,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Failed to refresh maintenance cache:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to refresh maintenance status',
            message: error.message
        });
    }
});

// POST /api/analytics/track - Analytics tracking endpoint
router.post('/analytics/track', (req, res) => {
    // Return 204 No Content for analytics tracking
    // This prevents frontend errors while not actually tracking anything
    res.status(204).send();
});

// GET /api/settings/about - About page content endpoint
router.get('/about', async (req, res) => {
    try {
        console.log('🔍 Homepage: Fetching About page content...');

        // Proxy to dashboard server for about page content
        const dashboardUrl = getDashboardUrl(req);

        console.log(`📡 Proxying to dashboard: ${dashboardUrl}/api/settings/about`);

        const response = await dashFetch(`${dashboardUrl}/api/settings/about`, { timeoutMs: 5000, req });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Homepage: About page content fetched from dashboard');
            res.json(data);
        } else {
            throw new Error(`Dashboard responded with ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Homepage: Error fetching About page content:', error);

        // Fallback content if dashboard is unavailable
        res.json({
            success: true,
            data: {
                content: "Welcome to HARDLINE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.",
                enabled: true
            }
        });
    }
});

// GET /api/settings/about/gallery/public - About page gallery images endpoint
router.get('/about/gallery/public', async (req, res) => {
    try {
        console.log('🔍 Homepage: Fetching About page gallery...');

        // Proxy to dashboard server for gallery images
        const dashboardUrl = getDashboardUrl(req);

        console.log(`📡 Proxying gallery request to: ${dashboardUrl}/api/settings/about/gallery/public`);

        const response = await dashFetch(`${dashboardUrl}/api/settings/about/gallery/public`, { timeoutMs: 5000, req });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Homepage: Gallery images fetched from dashboard');
            res.json(data);
        } else {
            throw new Error(`Dashboard responded with ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Homepage: Error fetching gallery images:', error);

        // Return empty gallery if dashboard is unavailable
        res.json({
            success: true,
            data: []
        });
    }
});

// GET /api/social-media - Social media links endpoint
router.get('/social-media', async (req, res) => {
    try {
        console.log('🔍 Homepage: Fetching social media links...');

        // Proxy to dashboard server for social media links
        const dashboardUrl = getDashboardUrl(req);

        console.log(`📡 Proxying to dashboard: ${dashboardUrl}/api/social-media`);

        const response = await dashFetch(`${dashboardUrl}/api/social-media`, { timeoutMs: 5000, req });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Homepage: Social media links fetched from dashboard');
            res.json(data);
        } else {
            throw new Error(`Dashboard responded with ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Homepage: Error fetching social media links:', error);

        // Fallback empty social media if dashboard is unavailable
        res.json({
            success: true,
            data: []
        });
    }
});

// GET /api/settings/faq - FAQ content endpoint
router.get('/faq', async (req, res) => {
    try {
        console.log('🔍 Homepage: Fetching FAQ content...');

        // Proxy to dashboard server for FAQ content
        const dashboardUrl = getDashboardUrl(req);

        console.log(`📡 Proxying to dashboard: ${dashboardUrl}/api/settings/faq`);

        const response = await dashFetch(`${dashboardUrl}/api/settings/faq`, { timeoutMs: 5000, req });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Homepage: FAQ content fetched from dashboard');
            res.json(data);
        } else {
            throw new Error(`Dashboard responded with ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Homepage: Error fetching FAQ content:', error);

        // Fallback empty FAQ if dashboard is unavailable
        res.json({
            success: true,
            data: []
        });
    }
});

module.exports = router;

