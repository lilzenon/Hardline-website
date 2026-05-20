// Dashboard-driven URL redirect middleware for slug paths
// PERFORMANCE FIX: Direct database query instead of cross-domain API calls
// This eliminates network timeouts and ensures 100% reliability
//
// Multi-tenant: redirects are scoped per public domain (see admin
// migration 20260504000002_add_domain_to_redirects.js). This middleware
// resolves the request's site domain via the same getSiteDomain helper
// the rest of the public app uses, then looks up:
//   1. (slug, domain = <site domain>) — per-domain row, takes priority.
//   2. (slug, domain IS NULL)         — legacy/default row, fallback so
//      pre-multi-tenant redirects keep working until promoted.
// Without this scoping, hardline.events would resolve bounce2bounce.com
// redirects (and vice versa), since the table is shared across both
// public sites.
//
// Bullet-proofing for Instagram in-app browser (which 502'd before):
//   - HEAD requests get the same 302 (IG previews HEAD-then-GET, and a
//     5xx on HEAD makes IG mark the link bad).
//   - Startup pre-warm loads every redirect into the in-memory cache so
//     the first IG bio click after a deploy doesn't block on a cold DB.
//   - Stale-while-revalidate: an expired cache entry is still served
//     immediately while a background refresh runs. Under IG's parallel
//     preview+click bursts, no request waits on the DB after the first.
//   - Per-request DB timeout (2.5s) so a single slow query never holds a
//     request long enough to trip DigitalOcean's edge timeout into 502.
//   - Cache-Control: no-store on the 302 so intermediaries (CDN, IG
//     in-app browser cache) never serve a stale destination.

const knex = require("../knex");
const { getSiteDomain } = require("../utils/site-domain.util");

// Cache key includes site domain so a single process serving multiple
// hostnames can't leak rows across domains. In practice each public
// site is its own deployment, but the composite key is cheap insurance.
//
// Entry shape: { id, enabled, destinationUrl, expiresAt, refreshing }
//   - expiresAt: timestamp when the entry is considered "fresh"
//   - refreshing: in-flight background refresh promise (dedupes parallel
//     refreshes of the same key).
const cache = new Map();
const FRESH_TTL_MS = 60 * 1000;   // serve without DB hit
const STALE_TTL_MS = 10 * 60 * 1000; // allow stale serve while refreshing
const DB_TIMEOUT_MS = 2500;       // per-request hard ceiling on DB wait
const NEG_TTL_MS = 60 * 1000;     // remember "not found" for 1 minute

function isFresh(entry) {
  return entry && entry.expiresAt > Date.now();
}

function isWithinStaleWindow(entry) {
  return entry && entry.expiresAt + STALE_TTL_MS > Date.now();
}

/**
 * Track a redirect hit asynchronously (non-blocking).
 * Tracked by row id (not slug) so duplicate slugs across different
 * domains can't inflate each other's counters.
 */
function trackRedirectHit(redirectId) {
  if (!redirectId) return;
  setImmediate(async () => {
    try {
      await knex("redirects")
        .where("id", redirectId)
        .increment("hits", 1)
        .update("last_accessed_at", knex.fn.now());
    } catch (error) {
      console.error(`❌ Error tracking redirect hit for id=${redirectId}:`, error.message);
    }
  });
}

function shouldBypass(path) {
  if (!path || path === "/") return true;
  return /^(\/api|\/assets|\/dist|\/static|\/uploads|\/css|\/js|\/custom-images)\//.test(path);
}

function extractSlug(path) {
  const seg = path.slice(1).split("/")[0];
  return seg || "";
}

function isValidSlug(s) {
  return /^[A-Za-z0-9_-]{1,100}$/.test(s);
}

/**
 * Race a knex query against a timeout so a single slow DB query can
 * never hold a request past the edge timeout. Returns null on timeout
 * (which we treat as "not found this attempt" — the existing stale
 * cache entry, if any, is used by the caller).
 */
function withTimeout(promise, ms) {
  return new Promise((resolve) => {
    let settled = false;
    const t = setTimeout(() => {
      if (!settled) {
        settled = true;
        resolve({ timedOut: true });
      }
    }, ms);
    promise.then(
      (value) => {
        if (!settled) {
          settled = true;
          clearTimeout(t);
          resolve({ value });
        }
      },
      (err) => {
        if (!settled) {
          settled = true;
          clearTimeout(t);
          resolve({ error: err });
        }
      }
    );
  });
}

/**
 * Query redirect rule directly from database, scoped to this site's
 * domain with a NULL-domain fallback for legacy rows.
 */
async function fetchRuleFromDb(slug, siteDomain) {
  const slugLower = slug.toLowerCase();

  // 1. Per-domain row first.
  let rule = null;
  if (siteDomain) {
    rule = await knex("redirects")
      .whereRaw("lower(slug) = ?", [slugLower])
      .where("domain", siteDomain)
      .first();
  }

  // 2. Fall back to legacy/default (NULL domain) row so existing
  //    redirects keep working until the owner promotes them per-domain.
  if (!rule) {
    rule = await knex("redirects")
      .whereRaw("lower(slug) = ?", [slugLower])
      .whereNull("domain")
      .first();
  }

  if (!rule) return null;
  return {
    id: rule.id,
    enabled: !!rule.enabled,
    destinationUrl: rule.destination_url,
  };
}

/**
 * Refresh a cache entry in the background. Dedupes via the
 * `refreshing` promise stored on the entry — multiple concurrent
 * requests for the same key share one DB roundtrip.
 */
function refreshInBackground(cacheKey, slug, siteDomain) {
  const existing = cache.get(cacheKey);
  if (existing && existing.refreshing) return existing.refreshing;

  const promise = (async () => {
    try {
      const rule = await fetchRuleFromDb(slug, siteDomain);
      const now = Date.now();
      if (rule) {
        cache.set(cacheKey, {
          id: rule.id,
          enabled: rule.enabled,
          destinationUrl: rule.destinationUrl,
          expiresAt: now + FRESH_TTL_MS,
          refreshing: null,
        });
      } else {
        cache.set(cacheKey, {
          id: null,
          enabled: false,
          destinationUrl: null,
          expiresAt: now + NEG_TTL_MS,
          refreshing: null,
        });
      }
    } catch (err) {
      console.error(`❌ Redirect cache refresh failed for "${cacheKey}":`, err.message);
      // Clear the refreshing flag so subsequent attempts can retry.
      const e = cache.get(cacheKey);
      if (e) e.refreshing = null;
    }
  })();

  if (existing) existing.refreshing = promise;
  else {
    cache.set(cacheKey, {
      id: null,
      enabled: false,
      destinationUrl: null,
      expiresAt: 0, // expired immediately; caller will await this promise
      refreshing: promise,
    });
  }
  return promise;
}

async function redirectRulesMiddleware(req, res, next) {
  try {
    if (shouldBypass(req.path)) return next();
    // Only GET and HEAD make sense for short links. Anything else falls
    // through (POST to /<slug> shouldn't 302). HEAD is critical for IG
    // in-app browser link previews — without HEAD support those would
    // get whatever the next handler returns, which can 5xx.
    if (req.method !== "GET" && req.method !== "HEAD") return next();

    const slug = extractSlug(req.path);
    if (!isValidSlug(slug)) return next();

    const siteDomain = getSiteDomain(req) || "";
    const cacheKey = `${siteDomain}|${slug.toLowerCase()}`;

    let entry = cache.get(cacheKey);

    if (isFresh(entry)) {
      if (entry.enabled && entry.destinationUrl) {
        trackRedirectHit(entry.id);
        res.setHeader("Cache-Control", "no-store, max-age=0");
        return res.redirect(302, entry.destinationUrl);
      }
      return next();
    }

    // Stale-while-revalidate: serve the stale value immediately and
    // refresh in background. Under IG's burst load this prevents any
    // single request from blocking on a slow DB.
    if (isWithinStaleWindow(entry)) {
      refreshInBackground(cacheKey, slug, siteDomain);
      if (entry.enabled && entry.destinationUrl) {
        trackRedirectHit(entry.id);
        res.setHeader("Cache-Control", "no-store, max-age=0");
        return res.redirect(302, entry.destinationUrl);
      }
      return next();
    }

    // Cold cache (no entry or beyond stale window). Race the DB lookup
    // against a hard timeout so the request can never hang long enough
    // to trip DigitalOcean's edge 502.
    const refreshPromise = refreshInBackground(cacheKey, slug, siteDomain);
    const raced = await withTimeout(refreshPromise, DB_TIMEOUT_MS);

    if (raced.timedOut) {
      console.warn(`⚠️ Redirect lookup timed out for "${cacheKey}", continuing to short link handler`);
      return next();
    }
    if (raced.error) {
      console.warn(`⚠️ Redirect lookup error for "${cacheKey}": ${raced.error.message}`);
      return next();
    }

    entry = cache.get(cacheKey);
    if (entry && entry.enabled && entry.destinationUrl) {
      trackRedirectHit(entry.id);
      res.setHeader("Cache-Control", "no-store, max-age=0");
      return res.redirect(302, entry.destinationUrl);
    }
    return next();
  } catch (e) {
    console.error(`❌ Redirect rules middleware EXCEPTION for ${req.path}:`, e.message);
    return next();
  }
}

/**
 * Pre-warm the in-process cache at startup so the very first request
 * after a deploy doesn't block on a cold DB. Bounded to the site's own
 * domain plus any default (NULL) rows. Best-effort: a failure here
 * never blocks server boot.
 */
async function prewarmRedirectsCache() {
  try {
    const siteDomain = getSiteDomain({ hostname: null }) || "";
    const rows = await knex("redirects")
      .select("id", "slug", "destination_url", "enabled", "domain")
      .where(function () {
        if (siteDomain) this.where("domain", siteDomain).orWhereNull("domain");
        else this.whereNull("domain");
      });

    const now = Date.now();
    let perDomain = 0;
    let fallback = 0;
    for (const row of rows) {
      const key = `${siteDomain}|${String(row.slug).toLowerCase()}`;
      // If we already have a per-domain row cached, do not overwrite
      // with a NULL-domain row (mirrors the middleware's per-domain
      // priority during request-time lookups).
      const existing = cache.get(key);
      if (existing && existing.domainSource === "override" && row.domain == null) continue;
      cache.set(key, {
        id: row.id,
        enabled: !!row.enabled,
        destinationUrl: row.destination_url,
        expiresAt: now + FRESH_TTL_MS,
        refreshing: null,
        domainSource: row.domain ? "override" : "default",
      });
      if (row.domain) perDomain++;
      else fallback++;
    }
    console.log(`🔥 Prewarmed redirect cache for "${siteDomain || "<no-domain>"}": ${perDomain} per-domain + ${fallback} default rows`);
  } catch (err) {
    console.warn(`⚠️ Redirect prewarm failed (non-fatal):`, err.message);
  }
}

module.exports = { redirectRulesMiddleware, prewarmRedirectsCache };
