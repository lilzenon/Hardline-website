/**
 * Resolve the public domain this server instance serves. Used to scope
 * event queries so each public site only renders events tagged for it.
 *
 * Resolution order:
 *   1. process.env.SITE_DOMAIN (set in DigitalOcean panel) — primary.
 *   2. req.hostname (with www./beta. prefix stripped) — runtime fallback.
 *   3. DEFAULT_DOMAIN — code-level fallback. This repo deploys
 *      hardline.events so the default matches; the legacy bounce2bounce
 *      fork defaults to bounce2bounce.com instead.
 *
 * The strict equality used by the event query filter means a missing
 * SITE_DOMAIN env on production WOULD silently filter to whatever the
 * request hostname resolves to. The default is the safety net.
 */
const DEFAULT_DOMAIN = "hardline.events";

function normalize(host) {
    if (!host || typeof host !== "string") return null;
    let h = host.trim().toLowerCase();
    if (h.startsWith("www.")) h = h.slice(4);
    if (h.startsWith("beta.")) h = h.slice(5);
    if (h === "localhost" || h.startsWith("127.")) return null;
    return h || null;
}

function getSiteDomain(req) {
    const fromEnv = normalize(process.env.SITE_DOMAIN);
    if (fromEnv) return fromEnv;
    const fromReq = req && req.hostname ? normalize(req.hostname) : null;
    if (fromReq) return fromReq;
    return DEFAULT_DOMAIN;
}

module.exports = { getSiteDomain, DEFAULT_DOMAIN };
