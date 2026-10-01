/**
 * Browser-facing reverse proxy from this public site to the admin API.
 *
 * Why this file exists: the inline http-proxy-middleware config in server.js
 * silently broke when the library moved from v2 to v3.
 *
 *  - v3 reads event hooks from `on: { proxyReq, proxyRes, error }`. The v2 names
 *    (`onProxyReq`, `onError`, ...) are ignored with no warning, which left the
 *    internal identity headers unsent (admin then rate-limits the whole site as
 *    one IP) and every error handler dead (plain-text 504s instead of JSON).
 *  - v3 no longer restores the Express mount path, so `app.use('/api/shop', proxy)`
 *    forwarded `/config` upstream instead of `/api/shop/config`. We mount at the
 *    app root with `pathFilter`, so the upstream path is exactly what the browser
 *    asked for.
 *  - v3 registers every `on` entry with EventEmitter#on, which throws on
 *    `undefined`; only defined handlers are ever passed.
 *
 * One middleware instance serves all proxied prefixes: one path-filter check per
 * request and one http-proxy instance (connection reuse) instead of four.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');
const { internalProxyHeaders } = require('./internal-proxy.util');

/** Prefixes relayed to admin. Local routers mounted earlier take precedence. */
const DEFAULT_PATH_FILTERS = [
    '/api/settings',
    '/api/analytics/track',
    '/api/home-settings',
    '/api/shop'
];

/** Longest of the old per-route values; checkout calls can legitimately be slow. */
const DEFAULT_TIMEOUT_MS = 15000;

/**
 * Stamp trusted-proxy identity on a forwarded request. These are BROWSER
 * requests relayed through this pod's single egress IP; without the forwarded
 * client IP admin's rate limiter would treat every visitor as one client.
 * Never lets a header failure break the proxied request.
 */
function attachInternalProxyHeaders(proxyReq, req) {
    try {
        const headers = internalProxyHeaders(req);
        for (const name of Object.keys(headers)) {
            proxyReq.setHeader(name, headers[name]);
        }
    } catch (err) {
        console.warn('WARN failed to attach internal proxy headers:', err && err.message);
    }
}

/**
 * Upstream failure (refused, reset, timeout): answer 502 JSON, uncacheable.
 * http-proxy may hand us a raw ServerResponse (no Express helpers) or, for
 * upgrade requests, a Socket, so only Node core APIs are used here.
 */
function sendProxyError(err, req, res) {
    const method = req && req.method;
    const url = req && (req.originalUrl || req.url);
    console.error(`🚨 Admin proxy error (${method} ${url}): ${(err && (err.code || err.message)) || 'unknown'}`);

    if (!res || typeof res.end !== 'function' || res.headersSent || res.writableEnded) return;

    const body = JSON.stringify({
        error: 'Dashboard API unavailable',
        message: 'Unable to connect to dashboard server',
        timestamp: new Date().toISOString()
    });
    try {
        if (typeof res.writeHead === 'function') {
            res.writeHead(502, {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': Buffer.byteLength(body),
                'Cache-Control': 'no-store'
            });
            res.end(body);
        } else {
            res.end();
        }
    } catch (_) {
        // client already gone
    }
}

/**
 * Build the proxy middleware.
 * @param {object} opts
 * @param {string} opts.target        admin base URL, e.g. https://admin.b2b.click
 * @param {boolean} [opts.secure]     verify upstream TLS (true in production)
 * @param {string[]} [opts.pathFilters]
 * @param {number} [opts.timeoutMs]   applies to both the inbound and upstream sockets
 * @param {boolean} [opts.verbose]    per-request logging (hot path; off by default)
 */
function createAdminProxy({ target, secure = true, pathFilters = DEFAULT_PATH_FILTERS, timeoutMs = DEFAULT_TIMEOUT_MS, verbose = false }) {
    if (!target) throw new Error('createAdminProxy: target is required');

    const on = {
        proxyReq: (proxyReq, req) => {
            attachInternalProxyHeaders(proxyReq, req);
            if (verbose) console.log(`🔄 Proxying ${req.method} ${req.originalUrl || req.url} → ${target}`);
        },
        error: sendProxyError
    };
    if (verbose) {
        on.proxyRes = (proxyRes, req) => console.log(`✅ Proxy ${proxyRes.statusCode} ${req.originalUrl || req.url}`);
    }

    return createProxyMiddleware({
        pathFilter: pathFilters,
        target,
        changeOrigin: true,
        secure,
        timeout: timeoutMs,
        proxyTimeout: timeoutMs,
        on
    });
}

/**
 * Mount the admin proxy on an Express app at the root (no mount path, see header).
 * @returns {string[]} the prefixes being proxied, for the startup log
 */
function mountAdminProxies(app, options) {
    const pathFilters = (options && options.pathFilters) || DEFAULT_PATH_FILTERS;
    app.use(createAdminProxy({ ...options, pathFilters }));
    return pathFilters.slice();
}

module.exports = {
    mountAdminProxies,
    createAdminProxy,
    attachInternalProxyHeaders,
    sendProxyError,
    DEFAULT_PATH_FILTERS,
    DEFAULT_TIMEOUT_MS
};
