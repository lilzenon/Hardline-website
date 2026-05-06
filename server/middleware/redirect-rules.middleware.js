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

const env = require("../env");
const knex = require("../knex");
const { getSiteDomain } = require("../utils/site-domain.util");

// Cache key includes site domain so a single process serving multiple
// hostnames can't leak rows across domains. In practice each public
// site is its own deployment, but the composite key is cheap insurance.
const cache = new Map(); // `${domain}|${slug}` -> { id, enabled, destinationUrl, expiresAt }

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
 * Query redirect rule directly from database, scoped to this site's
 * domain with a NULL-domain fallback for legacy rows.
 */
async function fetchRule(slug, siteDomain) {
  try {
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

    if (!rule) {
      return { found: false };
    }

    return {
      found: true,
      id: rule.id,
      enabled: !!rule.enabled,
      destinationUrl: rule.destination_url,
      ttlMs: 60000,
    };
  } catch (err) {
    console.error(`❌ Redirect middleware database error for "${slug}":`, err.message);
    return { error: err?.message || "database error" };
  }
}

async function redirectRulesMiddleware(req, res, next) {
  try {
    if (shouldBypass(req.path)) return next();

    const slug = extractSlug(req.path);
    if (!isValidSlug(slug)) return next();

    const siteDomain = getSiteDomain(req) || "";
    const cacheKey = `${siteDomain}|${slug.toLowerCase()}`;

    const now = Date.now();
    const cached = cache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      if (cached.enabled && cached.destinationUrl) {
        trackRedirectHit(cached.id);
        return res.redirect(302, cached.destinationUrl);
      }
      return next();
    }

    const result = await fetchRule(slug, siteDomain);

    if (result.error) {
      console.warn(`⚠️ Redirect middleware: Database error for "${slug}", continuing to short link handler`);
      return next();
    }

    if (result.found) {
      const { id, enabled, destinationUrl, ttlMs } = result;
      cache.set(cacheKey, { id, enabled, destinationUrl, expiresAt: now + (ttlMs || 60000) });

      if (enabled && typeof destinationUrl === "string" && /^https?:\/\//i.test(destinationUrl)) {
        trackRedirectHit(id);
        return res.redirect(302, destinationUrl);
      }

      return next();
    }

    cache.set(cacheKey, { id: null, enabled: false, destinationUrl: null, expiresAt: now + 60000 });
    return next();
  } catch (e) {
    console.error(`❌ Redirect rules middleware EXCEPTION for ${req.path}:`, e.message);
    return next();
  }
}

module.exports = { redirectRulesMiddleware };
