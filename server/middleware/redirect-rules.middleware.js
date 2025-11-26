// Dashboard-driven URL redirect middleware for slug paths
// PERFORMANCE FIX: Direct database query instead of cross-domain API calls
// This eliminates network timeouts and ensures 100% reliability

const env = require("../env");
const knex = require("../knex");

const cache = new Map(); // slug -> { enabled, destinationUrl, expiresAt }

/**
 * Track a redirect hit asynchronously (non-blocking)
 * @param {string} slug - The redirect slug
 */
function trackRedirectHit(slug) {
  setImmediate(async () => {
    try {
      await knex("redirects")
        .where("slug", slug.toLowerCase())
        .increment("hits", 1)
        .update("last_accessed_at", knex.fn.now());
      console.log(`📊 Redirect hit tracked: /${slug}`);
    } catch (error) {
      console.error(`❌ Error tracking redirect hit for "${slug}":`, error.message);
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
 * Query redirect rule directly from database
 * PERFORMANCE FIX: Eliminates network calls and timeouts
 * @param {string} slug - The redirect slug to look up
 * @returns {Promise<{found: boolean, enabled?: boolean, destinationUrl?: string, ttlMs?: number, error?: string}>}
 */
async function fetchRule(slug) {
  try {
    const rule = await knex("redirects")
      .where("slug", slug.toLowerCase())
      .first();

    if (!rule) {
      return { found: false };
    }

    const enabled = !!rule.enabled;
    const destinationUrl = rule.destination_url;
    const ttlMs = 60000; // Default 60 seconds cache TTL

    return {
      found: true,
      enabled,
      destinationUrl,
      ttlMs,
    };
  } catch (err) {
    // Log error but don't block the request
    console.error(`❌ Redirect middleware database error for "${slug}":`, err.message);
    return { error: err?.message || "database error" };
  }
}

async function redirectRulesMiddleware(req, res, next) {
  try {
    if (shouldBypass(req.path)) return next();

    const slug = extractSlug(req.path);
    if (!isValidSlug(slug)) return next();

    // Cache lookup to avoid redundant database queries
    const now = Date.now();
    const cached = cache.get(slug);
    if (cached && cached.expiresAt > now) {
      if (cached.enabled && cached.destinationUrl) {
        // Track the hit even for cached redirects
        trackRedirectHit(slug);
        return res.redirect(302, cached.destinationUrl);
      }
      return next();
    }

    // Fetch redirect rule from database
    // PERFORMANCE FIX: Direct database query - no network timeouts
    const result = await fetchRule(slug);

    // Handle database errors gracefully - ALWAYS continue to short link handler
    if (result.error) {
      console.warn(`⚠️ Redirect middleware: Database error for "${slug}", continuing to short link handler`);
      // Don't cache errors - allow retry on next request
      return next();
    }

    if (result.found) {
      const { enabled, destinationUrl, ttlMs } = result;
      cache.set(slug, { enabled, destinationUrl, expiresAt: now + (ttlMs || 60000) });

      // Only redirect if enabled and valid absolute URL
      if (enabled && typeof destinationUrl === "string" && /^https?:\/\//i.test(destinationUrl)) {
        // Track the redirect hit asynchronously
        trackRedirectHit(slug);
        return res.redirect(302, destinationUrl);
      }

      return next();
    }

    // Not found: negative cache briefly to avoid repeated database queries
    cache.set(slug, { enabled: false, destinationUrl: null, expiresAt: now + 60000 });
    return next();
  } catch (e) {
    // CRITICAL: Fail open - ALWAYS allow existing shortlink/404 logic to handle
    console.error(`❌ Redirect rules middleware EXCEPTION for ${req.path}:`, e.message);
    return next();
  }
}

module.exports = { redirectRulesMiddleware };

