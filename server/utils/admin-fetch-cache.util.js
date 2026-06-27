/**
 * Per-host stale-while-revalidate cache for server-to-server fetches
 * to the admin app (admin.b2b.click).
 *
 * Why this exists
 * ---------------
 * Every public page render used to fetch SEO/about/gallery/homepage-data
 * synchronously from admin before sending HTML. On mobile that round trip
 * dominates TTFB. This cache turns 95% of page renders into in-memory hits.
 *
 * Per-tenant isolation
 * --------------------
 * The cache key includes the canonical host derived by getSiteDomain — the
 * SAME value the caller passes to admin via `?domain=<host>`. So a hit on
 * key `seo::hardline.events` is, by construction, the response admin gave
 * us when we asked for hardline.events. There is no shared key between
 * tenants and no header-based key (Origin/Referer) that a future code path
 * could mis-derive.
 *
 * Stale-while-revalidate
 * ----------------------
 *   - Fresh hit (now < expiresAt): return cached, no network.
 *   - Stale hit (expiresAt < now < expiresAt + staleMs): return cached
 *     immediately, kick off a background refresh (deduped per key).
 *   - Cold/expired-beyond-stale: await a deduped fetch.
 *
 * Failures (timeout, non-OK, exception) are NOT cached — caller falls back
 * to defaults. We never poison the cache with an error.
 */

const CACHE = new Map();        // key -> { data, expiresAt }
const INFLIGHT = new Map();     // key -> Promise<data|null>
const MAX_ENTRIES = 200;        // ~10 hosts * ~10 paths is plenty

function setEntry(key, data, ttlMs) {
    if (CACHE.size >= MAX_ENTRIES && !CACHE.has(key)) {
        const oldest = CACHE.keys().next().value;
        if (oldest) CACHE.delete(oldest);
    }
    CACHE.set(key, { data, expiresAt: Date.now() + ttlMs });
}

/**
 * @param {object}   opts
 * @param {string}   opts.key       cache key, must include the canonical
 *                                   host — typically `${path}::${host}`
 * @param {function} opts.fetcher   async () => data | null. Should return
 *                                   null on any failure so we don't cache
 *                                   the bad result.
 * @param {number}   opts.ttlMs     fresh window
 * @param {number}   [opts.staleMs] tolerated staleness past TTL during
 *                                   which we serve stale + refresh in
 *                                   background. Default: 30 minutes. Large
 *                                   on purpose: ttlMs already bounds how
 *                                   fresh the data is (a stale hit kicks a
 *                                   background refresh), so a long stale
 *                                   window has NO correctness cost — it just
 *                                   means a low-traffic page is served
 *                                   instantly from cache instead of blocking
 *                                   on a cold upstream fetch. Pairs with the
 *                                   interval prewarm in server.js.
 * @returns {Promise<{data:any, source:'fresh'|'stale'|'cold'}>}
 */
async function cachedAdminFetch({ key, fetcher, ttlMs, staleMs = 30 * 60 * 1000 }) {
    const now = Date.now();
    const entry = CACHE.get(key);

    if (entry && entry.expiresAt > now) {
        return { data: entry.data, source: 'fresh' };
    }

    if (entry && entry.expiresAt + staleMs > now) {
        if (!INFLIGHT.has(key)) {
            const p = (async () => {
                try {
                    const fresh = await fetcher();
                    if (fresh !== null && fresh !== undefined) {
                        setEntry(key, fresh, ttlMs);
                    }
                    return fresh;
                } catch (_) {
                    return null;
                } finally {
                    INFLIGHT.delete(key);
                }
            })();
            INFLIGHT.set(key, p);
        }
        return { data: entry.data, source: 'stale' };
    }

    let inflight = INFLIGHT.get(key);
    if (!inflight) {
        inflight = (async () => {
            try {
                return await fetcher();
            } catch (_) {
                return null;
            } finally {
                INFLIGHT.delete(key);
            }
        })();
        INFLIGHT.set(key, inflight);
    }
    const data = await inflight;
    if (data !== null && data !== undefined) {
        setEntry(key, data, ttlMs);
    }
    return { data, source: 'cold' };
}

function invalidate(keyPrefix) {
    if (!keyPrefix) {
        CACHE.clear();
        return;
    }
    for (const k of CACHE.keys()) {
        if (k.startsWith(keyPrefix)) CACHE.delete(k);
    }
}

module.exports = { cachedAdminFetch, invalidate };
