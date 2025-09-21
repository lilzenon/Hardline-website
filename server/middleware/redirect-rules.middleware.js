// Dashboard-driven URL redirect middleware for slug paths
// Queries admin dashboard API: /api/redirects/:slug
// If enabled rule found, perform 302 redirect to destination URL

const env = require("../env");

let _fetch = null;
async function getFetch() {
  if (_fetch) return _fetch;
  const mod = await import("node-fetch");
  _fetch = mod.default || mod;
  return _fetch;
}

const cache = new Map(); // slug -> { enabled, destinationUrl, expiresAt }

function getDashboardBaseUrl() {
  if (env.NODE_ENV === "production") {
    return env.PRODUCTION_DASHBOARD_URL || "https://admin.b2b.click";
  }
  return env.DASHBOARD_URL || "http://localhost:3002";
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

async function fetchRule(slug) {
  const fetch = await getFetch();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const base = getDashboardBaseUrl();
    const url = `${base}/api/redirects/${encodeURIComponent(slug)}`;
    const resp = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (resp.status === 404) {
      return { found: false };
    }

    if (!resp.ok) {
      return { error: `dashboard returned ${resp.status}` };
    }

    const data = await resp.json().catch(() => ({}));
    const enabled = !!data?.enabled;
    const destinationUrl = data?.destinationUrl;
    const ttlSec = Number(data?.cacheTtlSeconds || 60);

    return {
      found: true,
      enabled,
      destinationUrl,
      ttlMs: Math.max(5000, Math.min(300000, (isNaN(ttlSec) ? 60 : ttlSec) * 1000)),
    };
  } catch (err) {
    return { error: err?.message || "fetch error" };
  } finally {
    clearTimeout(timeout);
  }
}

async function redirectRulesMiddleware(req, res, next) {
  try {
    if (shouldBypass(req.path)) return next();

    const slug = extractSlug(req.path);
    if (!isValidSlug(slug)) return next();

    // cache lookup
    const now = Date.now();
    const cached = cache.get(slug);
    if (cached && cached.expiresAt > now) {
      if (cached.enabled && cached.destinationUrl) {
        return res.redirect(302, cached.destinationUrl);
      }
      return next();
    }

    // fetch from dashboard
    const result = await fetchRule(slug);

    if (result.found) {
      const { enabled, destinationUrl, ttlMs } = result;
      cache.set(slug, { enabled, destinationUrl, expiresAt: now + (ttlMs || 60000) });

      // Only redirect if enabled and valid absolute URL
      if (enabled && typeof destinationUrl === "string" && /^https?:\/\//i.test(destinationUrl)) {
        return res.redirect(302, destinationUrl);
      }

      return next();
    }

    // not found: negative cache briefly
    cache.set(slug, { enabled: false, destinationUrl: null, expiresAt: now + 60000 });
    return next();
  } catch (e) {
    // Fail open: allow existing shortlink/404 logic to handle
    return next();
  }
}

module.exports = { redirectRulesMiddleware };

