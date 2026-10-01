/**
 * Device capability checks for purely decorative, expensive effects.
 *
 * The 404 and maintenance pages paint a fullscreen WebGL dither shader
 * (three.js + react-three-fiber, ~770 KB) that renders every frame for as
 * long as the tab is open. On a phone that is a continuous CPU/GPU burn;
 * Lighthouse (mobile, 4x CPU throttle) measured it as 142 s of main-thread
 * blocking on /events (an unknown URL that renders the 404 page). The effect
 * carries no information, so on anything but a capable desktop we render the
 * CSS gradient fallback those pages already ship.
 *
 * Every check is wrapped: a missing API must mean "not capable", never a throw.
 */

/** In-app WebViews (Instagram, Facebook, TikTok, Snapchat, LINE) throttle hard and lack GPU headroom. */
const IN_APP_BROWSER_RE = /Instagram|FBAN|FBAV|FB_IAB|TikTok|musical_ly|Snapchat|Line\//i;

/**
 * Should this device run a decorative WebGL animation?
 * Decided once per page load by the caller (store it in state) so the choice
 * never flips mid-session and remounts the canvas.
 * @returns {boolean}
 */
export function shouldRenderDecorativeWebGL() {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
    try {
        if (typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

        // Phones and tablets: battery + thermal budget is better spent on the ticket flow.
        if (window.innerWidth < 1024) return false;
        if (IN_APP_BROWSER_RE.test(navigator.userAgent || '')) return false;

        // Low-core machines (older laptops, budget Chromebooks) stutter on a fullscreen shader.
        const cores = navigator.hardwareConcurrency;
        if (typeof cores === 'number' && cores > 0 && cores <= 4) return false;

        // User asked to save data, or the link is too slow to pull three.js for a background.
        const conn = navigator.connection;
        if (conn && (conn.saveData === true || /(^|-)2g$/.test(String(conn.effectiveType || '')))) return false;

        return true;
    } catch (_) {
        return false;
    }
}

export default shouldRenderDecorativeWebGL;
