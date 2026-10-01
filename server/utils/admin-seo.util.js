/**
 * SEO settings for a request, fetched from the admin API (never from the shared
 * DB directly).
 *
 * The admin API owns `seo_settings`. It serves the correct per-domain row at
 * `/api/settings/seo/fast?domain=<host>` and marks fallbacks in `_meta`.
 * Reading the table directly from this app ignores the domain (a `.first()`
 * can return another brand's row) and the legacy query helper even inserts a
 * default row when it finds none, which is why no public render path may use
 * it. The helper export was removed from ./queries in 2025-08; the event
 * landing page route kept calling it and threw a TypeError on every request.
 *
 * The cache key `seo::<host>` is deliberately the same one the SSR homepage
 * uses (renders.handler.js) and the prewarm loop keeps warm (server.js), so an
 * event page render reuses that entry and never adds a cold upstream round trip.
 */
const env = require('../env');
const { getSiteDomain } = require('./site-domain.util');
const { cachedAdminFetch } = require('./admin-fetch-cache.util');
const { internalProxyHeaders } = require('./internal-proxy.util');

const SEO_TTL_MS = 60 * 1000;      // fresh window; cachedAdminFetch serves stale for 30 min after
const FETCH_TIMEOUT_MS = 5000;     // comfortably above admin's warm latency (~0.3s)

function dashboardBaseUrl() {
    return env.NODE_ENV === 'production' ? 'https://admin.b2b.click' : 'http://localhost:3002';
}

function seoCacheKey(host) {
    return `seo::${host || '__default__'}`;
}

/**
 * True when admin answered with a row that is NOT this host's own settings:
 * its default/NULL fallback row (`_meta.is_fallback`) or a row whose
 * `source_domain` is another tenant. Such a response must never be cached
 * under this host's key (brand bleed). Fails open when `_meta` is absent
 * (older admin builds).
 * @param {object|null} data  raw /seo/fast response
 * @param {string} host       canonical site host the request was made for
 */
function isWrongDomainSeoRow(data, host) {
    if (!data || !host) return false;
    const row = data.settings || data;
    const meta = data._meta || row._meta;
    if (!meta) return false;
    if (meta.is_fallback === true) return true;
    const src = String(meta.source_domain || '').toLowerCase();
    return !!src && src !== String(host).toLowerCase();
}

/**
 * fetch() with a hard timeout. Resolves to the parsed JSON body, or null on
 * any failure (non-2xx, network error, timeout, bad JSON) so the caller's
 * cache never stores a bad result.
 */
async function fetchJsonWithTimeout(url, host) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const res = await fetch(url, {
            signal: controller.signal,
            headers: {
                Accept: 'application/json',
                // Trusted server-to-server marker so admin's rate limiter does not
                // lump these renders in with anonymous clients on this egress IP.
                ...internalProxyHeaders(null),
                ...(host ? { Origin: `https://${host}` } : {})
            }
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (_) {
        return null;
    } finally {
        clearTimeout(timer);
    }
}

/**
 * Resolve the SEO settings row for a host.
 * @param {string} host canonical site host (see site-domain.util)
 * @returns {Promise<object|null>} flat settings object (same shape as a
 *   seo_settings row) or null when admin is unreachable and nothing is cached.
 *   Callers must treat null as "no tracking pixels, use defaults" and still render.
 */
async function fetchSeoSettingsForHost(host) {
    const safeHost = host ? String(host).toLowerCase() : '';
    const qs = safeHost ? `?domain=${encodeURIComponent(safeHost)}` : '';
    const url = `${dashboardBaseUrl()}/api/settings/seo/fast${qs}`;
    try {
        const { data } = await cachedAdminFetch({
            key: seoCacheKey(safeHost),
            ttlMs: SEO_TTL_MS,
            fetcher: async () => {
                const body = await fetchJsonWithTimeout(url, safeHost);
                return isWrongDomainSeoRow(body, safeHost) ? null : body;
            }
        });
        if (!data) return null;
        return data.settings || data;
    } catch (_) {
        return null;
    }
}

/**
 * Convenience wrapper: resolve the host from the request (SITE_DOMAIN env or
 * normalised Host header) and fetch its settings.
 */
function fetchSeoSettingsForRequest(req) {
    return fetchSeoSettingsForHost(getSiteDomain(req));
}

module.exports = {
    fetchSeoSettingsForHost,
    fetchSeoSettingsForRequest,
    isWrongDomainSeoRow,
    seoCacheKey
};
