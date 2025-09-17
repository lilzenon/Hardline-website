import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * LayloIframeSimple
 * Minimal, reliability-first Laylo iframe embed.
 * - No state preservation across page refreshes or navigation
 * - Unmounts when hidden; remounts fresh when shown
 * - Lightweight retry on load timeout or error
 * - Verbose debug logs to trace lifecycle
 */
const LayloIframeSimple = ({
  dropId,
  color = 'ff0409',
  theme = 'dark',
  background = 'solid',
  minimal = true,
  style = {},
  visible = true,
}) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const loadStartRef = useRef(0);
  const loadTimeoutRef = useRef(null);
  const loadedRef = useRef(false);
  const MAX_RETRIES = 2;
  const LOAD_TIMEOUT_MS = 7000;

  const layloUrl = useMemo(() => {
    if (!dropId) return null;
    const params = new URLSearchParams({
      dropId,
      color,
      theme,
      background,
      ...(minimal && { minimal: 'true' }),
    });
    return `https://embed.laylo.com/?${params.toString()}`;
  }, [dropId, color, theme, background, minimal]);

  const log = (msg, extra) => {
    const ts = new Date().toISOString();
    // eslint-disable-next-line no-console
    console.log(`[LayloSimple ${ts}] ${msg}`, extra ?? '');
  };

  // Freshly mount iframe whenever it becomes visible
  useEffect(() => {
    if (!visible) {
      // Cleanup when hidden
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
      loadedRef.current = false;
      return;
    }

    // When visible, remount and start timer
    setRetryCount(0);
    setIframeKey((k) => k + 1);
    loadStartRef.current = Date.now();
    loadedRef.current = false;
    log('Visible -> remounting iframe', { retryCount: 0, url: layloUrl });

    // Setup load timeout
    loadTimeoutRef.current = setTimeout(() => {
      if (loadedRef.current) return;
      if (retryCount < MAX_RETRIES) {
        log('Load timeout -> retry remount', { retryCount: retryCount + 1 });
        setRetryCount((r) => r + 1);
        setIframeKey((k) => k + 1);
        loadStartRef.current = Date.now();
      } else {
        log('Final load timeout -> giving up after max retries');
      }
    }, LOAD_TIMEOUT_MS);

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
    // We purposely ignore retryCount in deps to avoid re-running this effect mid-attempt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, layloUrl]);

  const handleLoad = () => {
    const elapsed = Date.now() - (loadStartRef.current || 0);
    loadedRef.current = true;
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    log('Iframe onLoad fired', { elapsedMs: elapsed });
  };

  const handleError = (error) => {
    log('Iframe onError', { error });
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    if (retryCount < MAX_RETRIES) {
      log('Error -> retry remount', { retryCount: retryCount + 1 });
      setRetryCount((r) => r + 1);
      setIframeKey((k) => k + 1);
      loadStartRef.current = Date.now();
      loadedRef.current = false;
    } else {
      log('Final error -> giving up after max retries');
    }
  };

  if (!dropId) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 60 }}>
        <span style={{ color: '#999', fontSize: 14 }}>[LayloSimple] Missing dropId</span>
      </div>
    );
  }

  if (!visible) {
    // Unmounted by parent when hidden; placeholder for layout if needed
    return <div style={{ ...style }} />;
  }

  return (
    <iframe
      key={iframeKey}
      id={`laylo-drop-${dropId}`}
      title="Laylo Signup"
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      allow="web-share"
      onLoad={handleLoad}
      onError={handleError}
      style={style}
      src={layloUrl}
    />
  );
};

export default LayloIframeSimple;

