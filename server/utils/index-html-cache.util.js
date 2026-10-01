/**
 * In-memory copy of dist/index.html (the Vite SPA shell).
 *
 * WHY: every SSR render and every SPA-shell 404 used to hit the disk
 * synchronously (`fs.existsSync` + `fs.readFileSync`, or `res.sendFile`) on
 * the request path. The file only changes on deploy, so we read it once at
 * boot and re-read it in the BACKGROUND when its mtime changes, checking at
 * most every REVALIDATE_MS. Nothing here does sync I/O after boot.
 *
 * getIndexHtml() is synchronous and never blocks: it returns the current
 * copy immediately and, if the revalidation window has elapsed, kicks off an
 * async stat/read that swaps the copy in for later requests.
 */
const fs = require('node:fs');
const path = require('node:path');

const INDEX_HTML_PATH = path.join(__dirname, '../../dist/index.html');
const REVALIDATE_MS = 30_000;

let cached = null;        // string | null (null = build missing)
let cachedMtimeMs = 0;
let lastCheckAt = 0;
let revalidating = null;  // Promise | null — one in-flight check at a time

function loadSync() {
    try {
        const stat = fs.statSync(INDEX_HTML_PATH);
        cached = fs.readFileSync(INDEX_HTML_PATH, 'utf8');
        cachedMtimeMs = stat.mtimeMs;
    } catch (err) {
        cached = null;
        cachedMtimeMs = 0;
        console.error(`🚨 dist/index.html not readable (${err.code || err.message}); run "npm run build". SSR and SPA-shell responses will 500 until it exists.`);
    }
    lastCheckAt = Date.now();
}

async function revalidate() {
    try {
        const stat = await fs.promises.stat(INDEX_HTML_PATH);
        if (stat.mtimeMs !== cachedMtimeMs) {
            cached = await fs.promises.readFile(INDEX_HTML_PATH, 'utf8');
            cachedMtimeMs = stat.mtimeMs;
            console.log('🔄 dist/index.html changed on disk; in-memory SPA shell refreshed');
        }
    } catch (err) {
        // Keep serving the last good copy; a transient stat failure must not
        // take the site down. Only log when we had nothing to begin with.
        if (cached === null) console.error('🚨 dist/index.html still unreadable:', err.message);
    } finally {
        lastCheckAt = Date.now();
        revalidating = null;
    }
}

/**
 * Current SPA shell HTML, or null when the build is missing.
 * Never blocks: revalidation (if due) runs in the background.
 */
function getIndexHtml() {
    if (!revalidating && Date.now() - lastCheckAt > REVALIDATE_MS) {
        revalidating = revalidate();
    }
    return cached;
}

// Same policy the SSR homepage uses. The shell is identical for every user
// (no per-request data), so it is safe to let Cloudflare hold it: s-maxage=300
// keeps the edge warm, max-age=0 makes browsers revalidate (cheaply, at the
// edge), stale-while-revalidate hides origin latency and cold starts entirely.
const SPA_SHELL_CACHE_CONTROL = 'public, s-maxage=300, max-age=0, must-revalidate, stale-while-revalidate=86400';

/**
 * Send the SPA shell with the shared cache policy.
 * @param {import('express').Response} res
 * @param {object} [opts]
 * @param {number}  [opts.status=200]
 * @param {string}  [opts.cacheControl] override; 404s pass `no-store`
 * @returns {boolean} false when the build is missing (caller already got a 500)
 */
function sendSpaShell(res, { status = 200, cacheControl = SPA_SHELL_CACHE_CONTROL } = {}) {
    if (res.headersSent) return true;
    const html = getIndexHtml();
    if (html === null) {
        res.status(500).set('Cache-Control', 'no-store').type('text/plain')
            .send('Homepage build not found. Please run npm run build.');
        return false;
    }
    res.status(status).set({
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': cacheControl,
        'Vary': 'Accept-Encoding',
    });
    res.send(html);
    return true;
}

// Boot-time read: sync is fine here, the server is not serving yet.
loadSync();

module.exports = {
    getIndexHtml,
    sendSpaShell,
    SPA_SHELL_CACHE_CONTROL,
    INDEX_HTML_PATH,
    // test seam: force a reload (used by the offline harness only)
    _reloadSync: loadSync,
};
