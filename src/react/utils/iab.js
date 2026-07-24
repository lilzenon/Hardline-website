/**
 * In-app-browser (Instagram / TikTok / Facebook WebView) resilience helpers.
 *
 * IAB WebViews routinely:
 *  - block or no-op window.open('_blank') (no tabs inside the IAB),
 *  - stall network requests indefinitely without erroring,
 *  - keep stale HTML alive across deploys (dead hashed-chunk 404s),
 *  - throw on storage access in private / restricted modes.
 *
 * Every helper here is defensive by design: failures degrade, never throw.
 */

/**
 * fetch() with a hard timeout via AbortController so a stalled IAB
 * connection can never strand a loading state forever. Callers keep their
 * existing catch/fallback paths — an abort surfaces as a normal rejection.
 *
 * On ancient WebViews without AbortController (Chrome <66 / Safari <12.1)
 * we still reject at the deadline via Promise.race — the request keeps
 * running in the background, but the caller's loading state is unblocked,
 * which is the part that matters.
 */
export function fetchWithTimeout(url, options = {}, timeoutMs = 8000) {
    const hasAbort = typeof AbortController !== 'undefined';
    const controller = hasAbort ? new AbortController() : null;
    let timer = null;

    const fetchPromise = fetch(
        url,
        controller ? { ...options, signal: controller.signal } : options
    );

    const timeoutPromise = new Promise((_, reject) => {
        timer = setTimeout(() => {
            if (controller) controller.abort();
            reject(new Error('fetch-timeout: ' + timeoutMs + 'ms exceeded'));
        }, timeoutMs);
    });

    // Two-arg .then instead of .finally: Promise.prototype.finally is absent
    // on Android WebView Chrome <63, and es2019 transpiles syntax, not APIs.
    const cleanup = () => {
        if (timer) clearTimeout(timer);
        // avoid unhandled-rejection noise from the losing fetch promise
        fetchPromise.catch(() => {});
    };
    return Promise.race([fetchPromise, timeoutPromise]).then(
        (value) => { cleanup(); return value; },
        (err) => { cleanup(); throw err; }
    );
}

/**
 * Open an external link reliably. IAB WebViews often return null from
 * window.open (or throw), which silently kills ticket-link taps.
 * Fall back to same-tab navigation so the tap ALWAYS goes somewhere.
 *
 * IMPORTANT: no 'noopener' in the features string — per spec, 'noopener'
 * (and 'noreferrer', which implies it) forces window.open to return null
 * EVEN ON SUCCESS, which would make this fallback double-navigate every
 * normal browser (new tab opens AND current tab navigates). Instead we
 * sever the opener reference manually on the returned handle, so null
 * really means "blocked / no-op" — the IAB case.
 */
export function openExternal(url) {
    if (!url || url === '#') return;
    let win = null;
    try {
        win = window.open(url, '_blank');
    } catch (_) {
        win = null;
    }
    if (win) {
        try {
            win.opener = null;
        } catch (_) {
            // cross-origin restriction — harmless
        }
    } else {
        try {
            window.location.href = url;
        } catch (_) {
            // nothing left to try
        }
    }
}

// Query param (not storage) guards the one-shot reload: iOS private mode and
// some IABs block sessionStorage, and a changed query string has the bonus of
// bypassing the stale Cloudflare HTML cache slot that caused the failure.
const CHUNK_RETRY_PARAM = 'hl_cr';

/** Heuristic for dynamic-import/chunk failures across browsers + our own timeout marker. */
export function isChunkLoadError(error) {
    const msg = String((error && (error.message || error)) || '');
    return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|chunk-load-timeout|Loading chunk [^ ]* failed|Loading CSS chunk/i.test(msg);
}

/**
 * One-shot reload for stale-HTML → dead-chunk recovery after a deploy.
 * Returns true if a reload was initiated, false if we already retried once
 * (caller should fall through to its error UI).
 */
export function reloadOnceForChunkError() {
    try {
        const url = new URL(window.location.href);
        if (url.searchParams.get(CHUNK_RETRY_PARAM) === '1') return false;
        url.searchParams.set(CHUNK_RETRY_PARAM, '1');
        window.location.replace(url.toString());
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Drop the recovery params so the NEXT deploy/outage gets a fresh retry
 * budget. MUST only be called after a lazy chunk has actually resolved —
 * clearing at bundle-eval time would defeat the one-shot guard (entry loads,
 * param cleared, chunk 404s, reload sets param again → infinite loop).
 * Also clears the 500-page 'hl_retry' counter for the same reason.
 */
export function clearChunkRetryParam() {
    try {
        const url = new URL(window.location.href);
        if (url.searchParams.has(CHUNK_RETRY_PARAM) || url.searchParams.has('hl_retry')) {
            url.searchParams.delete(CHUNK_RETRY_PARAM);
            url.searchParams.delete('hl_retry');
            window.history.replaceState(null, '', url.pathname + url.search + url.hash);
        }
    } catch (_) {
        // cosmetic only
    }
}

/**
 * Race a dynamic import against a timeout, with one delayed retry, so a
 * stalled (never-settling) chunk request can't pin Suspense on the loader
 * forever. A final rejection routes to the ErrorBoundary, whose chunk-error
 * path does the one-shot reload above. Any SUCCESSFUL resolution clears the
 * recovery params — proof the served HTML references live chunks.
 */
export function importWithRetry(importer, timeoutMs = 12000) {
    const attempt = () => Promise.race([
        importer(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('chunk-load-timeout')), timeoutMs)),
    ]);
    return attempt()
        .catch(() => new Promise((resolve) => setTimeout(resolve, 1500)).then(attempt))
        .then((mod) => {
            clearChunkRetryParam();
            return mod;
        });
}
