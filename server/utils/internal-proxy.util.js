/**
 * Identity headers for server-to-server calls from this public site to the
 * admin API.
 *
 * WHY THIS EXISTS
 * ---------------
 * Every request this app makes to admin — SSR fetches, the /api/settings and
 * /api/shop proxies, social-media lookups — leaves on the SAME Render egress
 * IP. Admin's rate limiter keys anonymous callers by IP, so from admin's point
 * of view all traffic from every visitor of this site is one client. A single
 * shared bucket meant either (a) the limit was useless, or (b) once activated,
 * a few dozen visitors would lock out the entire site.
 *
 * These headers let admin tell the difference:
 *   X-Internal-Proxy   shared secret proving the request came from a trusted
 *                      public site rather than an arbitrary internet client.
 *   X-Forwarded-Client-IP
 *                      the real end user's IP, so admin can rate-limit per
 *                      VISITOR instead of per egress IP. Admin must only trust
 *                      this when the secret validates — otherwise it is a
 *                      trivial rate-limit bypass by spoofed header.
 *
 * If INTERNAL_PROXY_SECRET is unset, no headers are added and admin falls back
 * to IP keying. That keeps local dev and any un-migrated deploy working.
 */

const SECRET = process.env.INTERNAL_PROXY_SECRET || '';

/**
 * Best-effort extraction of the end user's IP from the inbound request.
 * Express's req.ip already honours `trust proxy`, so prefer it.
 */
function clientIpFrom(req) {
    if (!req) return '';
    const direct = req.ip || (req.connection && req.connection.remoteAddress) || '';
    if (direct) return String(direct);
    const xff = req.headers && req.headers['x-forwarded-for'];
    if (typeof xff === 'string' && xff.length) return xff.split(',')[0].trim();
    return '';
}

/**
 * Headers to attach to an outbound admin request.
 * @param {object} req the inbound express request this call is being made for
 * @returns {object} header map (empty when no secret is configured)
 */
function internalProxyHeaders(req) {
    if (!SECRET) return {};
    const headers = { 'X-Internal-Proxy': SECRET };
    const ip = clientIpFrom(req);
    if (ip) headers['X-Forwarded-Client-IP'] = ip;
    return headers;
}

function isConfigured() {
    return Boolean(SECRET);
}

module.exports = { internalProxyHeaders, clientIpFrom, isConfigured };
