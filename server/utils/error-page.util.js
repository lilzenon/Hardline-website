/**
 * Minimal branded HTML error page, shared by reactHomepage's catch block and
 * the global secureErrorHandler (HTML branch).
 *
 * WHY: the error handler used to answer JSON to browsers, so a 404/500 on a
 * page URL showed raw JSON — and Instagram / TikTok in-app WebViews showed a
 * blank screen. This page is self-contained (inline CSS, no bundle) so it
 * renders even when the SPA cannot load. Keep it dependency-free.
 */

function escapeHtml(text) {
    return String(text == null ? '' : text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * @param {object} opts
 * @param {string}  [opts.title]
 * @param {string}  [opts.message]
 * @param {boolean} [opts.autoRetry=false]  reload up to twice (via ?hl_retry=),
 *   used ONLY by the homepage SSR failure path where a transient origin fault
 *   is the likely cause. Never enable for 4xx: a 404 will not fix itself.
 * @param {string}  [opts.homeHref='/']
 */
function renderErrorPage({ title = 'Something went wrong', message = 'Please try again in a moment.', autoRetry = false, homeHref = '/' } = {}) {
    // Auto-retry is capped at 2 attempts via a URL param (not storage: IAB
    // private modes block sessionStorage). Uncapped, a persistent origin fault
    // trapped in-app-browser users in an infinite 2s reload loop.
    const retryScript = autoRetry ? `
    <script>
        (function() {
            try {
                var params = new URLSearchParams(window.location.search);
                var attempts = parseInt(params.get('hl_retry') || '0', 10) || 0;
                if (attempts < 2) {
                    setTimeout(function() {
                        params.set('hl_retry', String(attempts + 1));
                        window.location.replace(
                            window.location.pathname + '?' + params.toString() + window.location.hash
                        );
                    }, 2000);
                }
            } catch (e) {
                // No URLSearchParams (ancient WebView): skip auto-retry, keep buttons
            }
        })();
    </script>` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="robots" content="noindex">
    <title>HARDLINE - ${escapeHtml(title)}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            min-height: 100vh;
            background: #000;
            color: #fff;
            font-family: Inter, system-ui, -apple-system, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
        }
        .logo { width: 180px; margin-bottom: 32px; }
        h1 { font-size: 24px; font-weight: 700; margin-bottom: 16px; }
        p { font-size: 16px; opacity: 0.8; margin-bottom: 24px; max-width: 400px; }
        .btn {
            display: inline-block;
            background: #f90d0d;
            color: #fff;
            padding: 14px 28px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: background 0.2s;
        }
        .btn:hover { background: #2080DD; }
        .retry-btn {
            background: transparent;
            border: 1px solid rgba(255,255,255,0.3);
            margin-left: 12px;
        }
        .retry-btn:hover { background: rgba(255,255,255,0.1); }
    </style>
</head>
<body>
    <img src="/images/figma-exact/b2b-logo-nav.svg" alt="HARDLINE" class="logo">
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    <div>
        <a href="${escapeHtml(homeHref)}" class="btn">Go to Homepage</a>
        <a href="javascript:location.reload()" class="btn retry-btn">Retry</a>
    </div>${retryScript}
</body>
</html>`;
}

module.exports = { renderErrorPage, escapeHtml };
