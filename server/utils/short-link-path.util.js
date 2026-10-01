/**
 * Cheap pre-filter for the `/:id` short-link catch-all.
 *
 * WHY: every unknown single-segment path (bot probes like /wp-admin, /.env,
 * /favicon.png) used to run `LOWER(links.address) = LOWER(?)` with a join
 * against the shared Postgres, then 302 to /404 for a second request. Short
 * link addresses are generated from LINK_CUSTOM_ALPHABET (alphanumeric) or
 * user custom URLs validated against [A-Za-z0-9_-], so anything outside that
 * alphabet can be rejected before touching the DB. A trailing `+` is the
 * kutt "show link info" suffix and is allowed.
 */

const MAX_ID_LENGTH = 120;
const LINK_ID_RE = /^[A-Za-z0-9_-]+\+?$/;
// Common probe markers that happen to sit inside the alphabet (`wp-`) or are
// listed explicitly so a future alphabet change cannot silently re-admit them.
const PROBE_MARKERS = ['wp-', '.php', '.env', '.git'];

/**
 * @param {string} id  raw `req.params.id` (already URL-decoded by Express)
 * @returns {boolean} true when the id could be a real short link address
 */
function isPlausibleShortLinkId(id) {
    if (typeof id !== 'string' || id.length === 0 || id.length > MAX_ID_LENGTH) return false;
    if (id.includes('.')) return false;
    const lower = id.toLowerCase();
    if (PROBE_MARKERS.some((m) => lower.includes(m))) return false;
    return LINK_ID_RE.test(id);
}

module.exports = { isPlausibleShortLinkId, MAX_ID_LENGTH };
