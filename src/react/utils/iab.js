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

// Hard ceiling on recovery reloads across documents. A genuine stale-HTML
// deploy is fixed by the first reload; anything still failing after this many
// is a persistent fault that must surface as an error UI, not another reload.
const MAX_CHUNK_RELOADS = 2;

// In-document latch. location.replace() does not stop script execution, so
// without this a burst of failing chunks in the SAME document each queue their
// own navigation. Reset naturally: every reload is a fresh module instance.
let reloadInitiated = false;

/** Heuristic for dynamic-import/chunk failures across browsers + our own timeout marker. */
export function isChunkLoadError(error) {
    const msg = String((error && (error.message || error)) || '');
    return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|chunk-load-timeout|Loading chunk [^ ]* failed|Loading CSS chunk/i.test(msg);
}

/**
 * Bounded reload for stale-HTML → dead-chunk recovery after a deploy.
 * Returns true if a reload was initiated, false once the budget is spent
 * (caller should fall through to its error UI).
 *
 * REGRESSION GUARD — read before changing:
 * This used to be a boolean one-shot (`hl_cr === '1'`) that importWithRetry
 * cleared on ANY successful chunk resolution. The homepage loads chunks in two
 * tiers (main.tsx → HomePage, then HomePage → FigmaMobile), so tier one's
 * success wiped the guard before tier two could fail. A FigmaMobile 404 then
 * reloaded forever: HomePage resolves → guard cleared → FigmaMobile fails →
 * reload → repeat. Each iteration carried hl_cr, which misses the Cloudflare
 * HTML cache, so every loop was a full origin render with four admin fetches.
 *
 * Two changes keep that closed: the budget is a COUNTER (monotonic across
 * documents), and it is no longer cleared per-chunk — see
 * scheduleRecoveryParamCleanup below.
 */
export function reloadOnceForChunkError() {
    try {
        if (reloadInitiated) return false;
        const url = new URL(window.location.href);
        // parseInt tolerates the legacy 'hl_cr=1' boolean form written by
        // clients still running the previous bundle.
        const attempts = parseInt(url.searchParams.get(CHUNK_RETRY_PARAM) || '0', 10) || 0;
        if (attempts >= MAX_CHUNK_RELOADS) return false;
        url.searchParams.set(CHUNK_RETRY_PARAM, String(attempts + 1));
        reloadInitiated = true;
        window.location.replace(url.toString());
        return true;
    } catch (_) {
        return false;
    }
}

/**
 * Drop the recovery params so the NEXT deploy/outage gets a fresh budget.
 *
 * MUST NOT be called from a per-chunk success path — that is precisely the bug
 * described above. Call it only once the document has proven stable (see
 * scheduleRecoveryParamCleanup), by which point a reload loop would already
 * have re-navigated and this timer would never have fired.
 * Also clears the 500-page 'hl_retry' counter, whose cap lives in
 * server/handlers/renders.handler.js.
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
 * Restore the recovery budget after the document has stayed alive long enough
 * to prove we are not in a reload loop.
 *
 * SETTLE WINDOW MUST EXCEED THE WORST-CASE CHUNK CHAIN. importWithRetry can
 * take timeoutMs + 1500 + timeoutMs before it finally rejects (17.5s at the 8s
 * bound used for the homepage tier, 25.5s at the 12s default), and the second
 * tier only starts after the first resolves. Clearing the param before that
 * rejection lands would hand a fresh budget to the very failure this guard
 * exists to stop — reopening the loop one level down, which is exactly how the
 * original bug worked. 60s clears the whole chain with margin.
 *
 * Safe to call more than once; extra calls just re-arm the same timer.
 */
export function scheduleRecoveryParamCleanup(settleMs = 60000) {
    try {
        const url = new URL(window.location.href);
        if (!url.searchParams.has(CHUNK_RETRY_PARAM) && !url.searchParams.has('hl_retry')) return;
        setTimeout(clearChunkRetryParam, settleMs);
    } catch (_) {
        // never let cleanup scheduling break boot
    }
}

/**
 * Race a dynamic import against a timeout, with one delayed retry, so a
 * stalled (never-settling) chunk request can't pin Suspense on the loader
 * forever. A final rejection routes to the ErrorBoundary, whose chunk-error
 * path does the bounded reload above.
 *
 * NOTE: this deliberately does NOT clear the recovery params on success. A
 * successful chunk proves nothing about the chunks that load after it, and
 * clearing here is what created the reload loop documented in
 * reloadOnceForChunkError. Budget restoration is time-based instead —
 * scheduleRecoveryParamCleanup, called once from the app entry.
 *
 * Timers are cleared on settle so a resolved import doesn't hold a pending
 * timeout (and its closure) alive for the full window.
 */
export function importWithRetry(importer, timeoutMs = 12000) {
    const attempt = () => {
        let timer = null;
        const timeout = new Promise((_, reject) => {
            timer = setTimeout(() => reject(new Error('chunk-load-timeout')), timeoutMs);
        });
        // Two-arg .then rather than .finally — see fetchWithTimeout above for why.
        return Promise.race([importer(), timeout]).then(
            (mod) => { if (timer) clearTimeout(timer); return mod; },
            (err) => { if (timer) clearTimeout(timer); throw err; }
        );
    };
    return attempt()
        .catch(() => new Promise((resolve) => setTimeout(resolve, 1500)).then(attempt));
}
