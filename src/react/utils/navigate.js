/**
 * Client-side navigation helper.
 *
 * WHY THIS EXISTS
 * ---------------
 * The mobile components used to navigate with `window.location.href = path`,
 * which is a FULL DOCUMENT LOAD. On mobile the app therefore wasn't a
 * single-page app at all: every tap on the hamburger menu tore down the whole
 * JS heap, which destroyed every piece of client-side back-pressure the app
 * has — the homepage-data cache, the SEO module cache, the circuit breaker,
 * and any in-flight request dedupe. Home -> /about -> home was three cold
 * boots, each replaying the entire admin fan-out.
 *
 * `window.navigateWithTransition` is installed by the App component in
 * src/main.tsx and does pushState + a re-render. It has always existed; the
 * desktop pages already use it. This helper just makes the same path available
 * everywhere with a consistent same-path and fallback policy.
 *
 * Falls back to a full load when the router isn't mounted (e.g. a component
 * rendered outside App, or a bundle that failed to boot), so navigation always
 * goes somewhere.
 */

/**
 * @param {string} path absolute in-app path, e.g. '/about'
 * @param {object} [options]
 * @param {boolean} [options.scrollToTopIfSame=true] when already on `path`,
 *   scroll to top instead of pushing a duplicate history entry.
 */
export function navigateTo(path, options = {}) {
    const { scrollToTopIfSame = true } = options;

    try {
        if (!path) return;

        // Same-path taps are common in a nav menu that's always visible.
        // Pushing a duplicate entry would make the back button a no-op once
        // per redundant tap.
        if (scrollToTopIfSame && path === window.location.pathname) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (typeof window.navigateWithTransition === 'function') {
            window.navigateWithTransition(path);
            return;
        }
    } catch (_) {
        // fall through to the hard navigation below
    }

    // Router unavailable — a full load is slow but always correct.
    try {
        window.location.href = path;
    } catch (_) {
        // nothing left to try
    }
}

export default navigateTo;
