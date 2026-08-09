import React, { useState } from 'react';

/**
 * Slim, non-blocking banner shown when homepage data failed to load.
 *
 * WHY THIS EXISTS
 * ---------------
 * When the admin fetch failed or timed out, useHomepageData quietly substituted
 * hardcoded placeholders ("EVENT TITLE", "Artist Name", "101 Address Drive")
 * and empty event lists, then cleared `loading`. The loader lifted and the page
 * rendered looking fine but with no real content, and the `error` it exposed
 * was destructured by FigmaMobile and never used — so neither the visitor nor
 * anyone reading the logs got any signal. That is the "renders but with none of
 * the admin info" symptom.
 *
 * DESIGN CONSTRAINT — read before changing the retry handler.
 * FigmaMobile returns `<div style={{opacity: 0}} />` while `loading` is true,
 * and by the time this banner can appear HomePage has already unmounted the
 * BrandedLoader and has no path to remount it. So a retry that flips `loading`
 * back to true blanks the ENTIRE page with nothing covering it.
 *
 * Two consequences, both load-bearing:
 *   1. Retry MUST pass { silent: true } so the hook takes its background path
 *      and never touches `loading`.
 *   2. `onRetry` must be called explicitly, not wired as onClick={refetch}.
 *      React would pass the SyntheticEvent as the options argument, making
 *      `options.silent` undefined — i.e. a foreground fetch, i.e. a blank page.
 */
const DataErrorBanner = ({ onRetry, message }) => {
    const [retrying, setRetrying] = useState(false);

    const handleRetry = async () => {
        if (retrying) return;
        setRetrying(true);
        try {
            // Explicit call with the silent flag — see the note above.
            await onRetry({ silent: true });
        } catch (_) {
            // The hook handles its own errors; this only guards the local flag.
        } finally {
            setRetrying(false);
        }
    };

    return (
        <div
            role="status"
            aria-live="polite"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                padding: '10px 16px',
                background: 'rgba(217, 58, 58, 0.12)',
                borderBottom: '1px solid rgba(217, 58, 58, 0.35)',
                color: '#FFFFFF',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '13px',
                lineHeight: 1.4,
                textAlign: 'center'
            }}
        >
            <span>
                {message || "Couldn't load the latest events."}
            </span>
            <button
                type="button"
                onClick={handleRetry}
                disabled={retrying}
                style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.55)',
                    color: '#FFFFFF',
                    borderRadius: 0,
                    padding: '4px 12px',
                    fontFamily: 'inherit',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: retrying ? 'default' : 'pointer',
                    opacity: retrying ? 0.6 : 1
                }}
            >
                {retrying ? 'Retrying…' : 'Retry'}
            </button>
        </div>
    );
};

export default DataErrorBanner;
