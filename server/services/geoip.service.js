/**
 * GeoIP Service (Redis-optional, MaxMind-optional)
 * - Uses MaxMind GeoIP2 when configured via env (MAXMIND_ENABLED=true and MAXMIND_DB_PATH set)
 * - Falls back to Cloudflare country header (cfCountry) if present
 * - Returns minimal country data suitable for analytics + heatmap
 * - Never returns or persists raw IP; caller must ensure not to store raw IP
 */

const fs = require("fs");
const path = require("path");
const env = require("../env");

let maxmind = null;
let reader = null;
let initialized = false;

function tryInitMaxMind() {
  if (initialized) return;
  initialized = true;

  try {
    if (env.MAXMIND_ENABLED && String(env.MAXMIND_ENABLED).toLowerCase() === "true") {
      // Lazy require to avoid hard dependency
      // If not installed, this will throw and we'll fallback gracefully
      // eslint-disable-next-line global-require
      maxmind = require("maxmind");
      const dbPath = env.MAXMIND_DB_PATH || path.join(process.cwd(), "GeoLite2-Country.mmdb");
      if (fs.existsSync(dbPath)) {
        reader = new maxmind.Reader(fs.readFileSync(dbPath));
        console.log("✅ MaxMind GeoIP country DB initialized");
      } else {
        console.warn(`⚠️ MaxMind DB not found at ${dbPath}. Falling back to CF country.`);
      }
    }
  } catch (err) {
    console.warn("⚠️ MaxMind not available (not installed or failed to init). Falling back.", err.message);
    maxmind = null;
    reader = null;
  }
}

/**
 * Resolve geolocation for an IP.
 * @param {string} ip - Caller-provided IP (do not persist!)
 * @param {string|null} cfCountry - Cloudflare country header (2-letter ISO) if available
 * @returns {{ countryCode: string|null, source: 'maxmind'|'cloudflare'|'unknown' }}
 */
async function resolve(ip, cfCountry = null) {
  tryInitMaxMind();

  // Prefer MaxMind when enabled and reader available
  if (reader && ip && typeof ip === "string") {
    try {
      const res = reader.get(ip);
      const code = res && res.country && res.country.iso_code ? res.country.iso_code : null;
      if (code) {
        return { countryCode: code, source: "maxmind" };
      }
    } catch (e) {
      // Ignore and fallback
    }
  }

  // Fallback: Cloudflare country header
  if (cfCountry && typeof cfCountry === "string" && cfCountry.length === 2) {
    return { countryCode: cfCountry.toUpperCase(), source: "cloudflare" };
  }

  return { countryCode: null, source: "unknown" };
}

module.exports = {
  resolve,
};

