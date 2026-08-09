/*
 Local settings routes for development/offline fallback.
 These endpoints mirror the dashboard API shape so the frontend can keep working
 even when the dashboard server is unavailable.
*/

const express = require("express");
const router = express.Router();

// GET /api/settings/seo - Proxy to dashboard for SEO settings
const { getAllowedOrigins } = require('../../middleware/origin-validation.middleware');
const { cachedAdminFetch } = require('../../utils/admin-fetch-cache.util');
const { internalProxyHeaders } = require('../../utils/internal-proxy.util');

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

// Append ?domain=<host>&nocache=1 so admin's multi-tenant SEO returns the
// row for the requesting public domain (hardline.events vs bounce2bounce.com).
// - `domain=<host>` tells admin which row we want.
// - `nocache=1` forces admin to use its dedicated SEO connection pool and
//   bypass the in-process helper cache. The helper, when running on the
//   main `knex` pool, has a Render-specific routing quirk where it
//   sometimes can't see freshly-inserted per-domain rows and silently
//   falls back to the default/Bounce2Bounce row, which then locks the
//   wrong brand on the tab title for 2 minutes via cache. Forcing the
//   nocache path keeps SEO answers correct end-to-end.
// Server-to-server fetches also lose the browser's Origin, so the
// explicit ?domain= is required regardless.
function withDomainParam(url, req) {
    const rawHost = req?.get?.('host');
    if (!rawHost) return url;
    // Canonicalize: strip port + leading "www." so all variants of a
    // public domain hit the same admin row. The admin stores rows under
    // canonical hostnames (e.g. "hardline.events"), and we don't want
    // www.hardline.events traffic to fall through to the default just
    // because we sent a raw Host header.
    const host = rawHost.split(':')[0].toLowerCase().replace(/^www\./, '');
    if (!host) return url;
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}domain=${encodeURIComponent(host)}&nocache=1`;
}

// Wrap fetch with an AbortController so a hung dashboard call falls through
// to the route's catch + JSON fallback instead of stalling until the upstream
// LB returns a 504 HTML page.
async function dashFetch(url, { timeoutMs = 5000, req } = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    // Internal-proxy identity so admin can rate-limit per visitor instead of
    // lumping this whole site under one egress IP — see internal-proxy.util.js.
    const headers = { 'Content-Type': 'application/json', ...internalProxyHeaders(req) };
    const host = req?.get?.('host');
    if (host) headers['Origin'] = `https://${host}`;
    try {
        return await fetch(url, { method: 'GET', headers, signal: controller.signal });
    } finally {
        clearTimeout(timeoutId);
    }
}

// Read JSON with an upper byte cap. The dashboard's seo_settings.backup_data
// column has historically grown to 30MB+ (recursive escape doubling on each
// admin save). Forwarding that to the browser blows up V8's JSON parser
// mid-page-load, which Googlebot interprets as a render error → soft 404.
// Cap at 2MB: a healthy SEO settings response is <20KB.
const SEO_RESPONSE_CAP_BYTES = 2 * 1024 * 1024;
async function readJsonCapped(response, capBytes = SEO_RESPONSE_CAP_BYTES) {
    const text = await response.text();
    if (text.length > capBytes) {
        throw new Error(`Upstream response too large (${text.length} bytes, cap ${capBytes})`);
    }
    return JSON.parse(text);
}

// Strip internal-only fields the public site never needs. backup_data is the
// big offender — a 30MB+ JSON-stringified mirror of the row that grows
// exponentially across saves. None of the public consumers read it.
function stripInternalSeoFields(data) {
    if (data && data.settings && typeof data.settings === 'object') {
        delete data.settings.backup_data;
    }
    return data;
}

// Brand-correct SEO defaults, served whenever admin is unreachable OR returned
// its cross-brand default row. Shared by both SEO routes so they can never
// drift apart.
const SEO_FALLBACK_RESPONSE = Object.freeze({
    success: true,
    settings: Object.freeze({
        default_title: "HARDLINE - NJ'S PREMIERE EDM COLLECTIVE",
        default_description: "HardLine Events is New Jersey's leading EDM event brand, producing curated electronic music events across NJ, NY, and the tri-state area.",
        default_keywords: "edm events, electronic dance music, nj events, hardline events, live music",
        default_author: "HARDLINE",
        maintenance_mode: false,
        shop_enabled: false
    }),
    fallback: true
});

/**
 * Cached, per-host SEO settings fetch — the single implementation behind both
 * GET /seo and GET /seo/fast.
 *
 * PERF: this data is requested by the React app on EVERY page mount
 * (SEOContext). The old /seo route was a raw pass-through that additionally
 * forced `nocache=1`, which drove admin's slowest uncached DB path (measured
 * 3.5-5.1s) and — because admin treats nocache as "clear the cache" — wiped the
 * shared per-domain SEO cache that the SSR renderer depends on. Every public
 * page mount was therefore sabotaging server-side rendering for everyone else.
 *
 * This path instead:
 *   - targets admin's /seo/fast directly, skipping admin's 307 redirect
 *     (which doubled the admin request count per logical call),
 *   - omits nocache=1 — admin's per-domain cache is correct here; nocache is
 *     reserved for the admin Settings UI,
 *   - caches per host in-process (60s fresh + stale-while-revalidate), so warm
 *     page views resolve from memory,
 *   - NEVER caches admin's default-row fallback under a real host key.
 */
async function serveCachedSeoSettings(req, res) {
    try {
        const dashboardUrl = getDashboardUrl(req);
        const rawHost = req?.get?.('host') || '';
        const host = rawHost.split(':')[0].toLowerCase().replace(/^www\./, '');
        const target = `${dashboardUrl}/api/settings/seo/fast${host ? `?domain=${encodeURIComponent(host)}` : ''}`;

        const { data } = await cachedAdminFetch({
            key: `seo-fast-proxy::${host || '__default__'}`,
            ttlMs: 60 * 1000,
            fetcher: async () => {
                const response = await dashFetch(target, { timeoutMs: 5000, req });
                if (!response.ok) return null;
                const body = stripInternalSeoFields(await readJsonCapped(response));
                // Never cache admin's default-row fallback (wrong brand) under
                // this host's key — see the 2026-07-07 outage where a cached
                // bounce2bounce row branded hardline.events for the whole stale
                // window. Returning null drops us to the HARDLINE fallback.
                const meta = body && (body._meta || (body.settings && body.settings._meta));
                if (host && meta && meta.is_fallback === true) return null;
                return body;
            },
        });

        if (data) return res.json(data);
        throw new Error('Dashboard SEO fetch failed or returned fallback row');
    } catch (error) {
        console.error('❌ Homepage: Error fetching SEO settings:', error.message);
        // Return JSON directly rather than redirecting: a redirect would force
        // another browser roundtrip and, if admin is still hung, 504 again.
        return res.json(SEO_FALLBACK_RESPONSE);
    }
}

// GET /api/settings/seo
// Kept as an alias of the cached implementation. The browser now requests
// /seo/fast (src/lib/api-client.ts), but this route stays so any cached client
// bundle, bookmark or external caller gets the fast path too instead of
// re-opening the uncached one.
router.get("/seo", serveCachedSeoSettings);

// GET /api/settings/seo/fast — the path the browser actually requests.
// Same cached implementation as /seo above; see serveCachedSeoSettings.
router.get("/seo/fast", serveCachedSeoSettings);

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

        const dashboardUrl = getDashboardUrl(req);
        const target = withDomainParam(`${dashboardUrl}/api/settings/about`, req);

        console.log(`📡 Proxying to dashboard: ${target}`);

        const response = await dashFetch(target, { timeoutMs: 5000, req });

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

        const dashboardUrl = getDashboardUrl(req);
        const target = withDomainParam(`${dashboardUrl}/api/settings/about/gallery/public`, req);

        console.log(`📡 Proxying gallery request to: ${target}`);

        const response = await dashFetch(target, { timeoutMs: 5000, req });

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

        const dashboardUrl = getDashboardUrl(req);
        const target = withDomainParam(`${dashboardUrl}/api/settings/faq`, req);

        console.log(`📡 Proxying to dashboard: ${target}`);

        const response = await dashFetch(target, { timeoutMs: 5000, req });

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

