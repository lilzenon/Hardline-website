import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

/**
 * LayloIframeSimple
 * Minimal, reliability-first Laylo iframe embed.
 * - Loads immediately when visible=true (simplified logic)
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
  const [retryCount, setRetryCount] = useState(0);
  const [iframeSrc, setIframeSrc] = useState(null);
  const loadStartRef = useRef(0);
  const loadTimeoutRef = useRef(null);
  const loadedRef = useRef(false);
  const mountedRef = useRef(false);
  const MAX_RETRIES = 2;
  const LOAD_TIMEOUT_MS = 7000;

  // Build the Laylo embed URL
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

  // Cache busting helper
  const bustUrl = useCallback((base) => {
    return (base || '') + ((base || '').includes('?') ? '&' : '?') + '_ts=' + Date.now();
  }, []);

  const log = useCallback((msg, extra) => {
    const ts = new Date().toISOString();
    // eslint-disable-next-line no-console
    console.log(`[LayloSimple ${ts}] ${msg}`, extra ?? '');
  }, []);

  // Initialize iframe src on mount when visible
  useEffect(() => {
    if (!visible || !layloUrl || mountedRef.current) return;

    mountedRef.current = true;
    loadStartRef.current = Date.now();
    loadedRef.current = false;

    log('Initializing iframe src', { url: layloUrl });
    setIframeSrc(layloUrl);
  }, [visible, layloUrl, log]);

  // Handle load timeout and retry logic
  useEffect(() => {
    if (!visible || !iframeSrc) return;

    // Clear any existing timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }

    loadStartRef.current = Date.now();

    // Set up load timeout
    loadTimeoutRef.current = setTimeout(() => {
      if (loadedRef.current) return;

      if (retryCount < MAX_RETRIES) {
        log('Load timeout -> retry', { retryCount: retryCount + 1 });
        setRetryCount((r) => r + 1);
        loadedRef.current = false;
        setIframeSrc(bustUrl(layloUrl));
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
  }, [iframeSrc, visible, retryCount, layloUrl, bustUrl, log]);

  // Handle visibility changes (tab switch, etc.)
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && visible && !loadedRef.current) {
        log('visibilitychange -> visible; refreshing iframe');
        loadedRef.current = false;
        setIframeSrc(bustUrl(layloUrl));
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [visible, layloUrl, bustUrl, log]);

  const handleLoad = useCallback(() => {
    const elapsed = Date.now() - (loadStartRef.current || 0);
    loadedRef.current = true;
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    log('Iframe onLoad fired', { elapsedMs: elapsed });
  }, [log]);

  const handleError = useCallback(() => {
    log('Iframe onError');
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    if (retryCount < MAX_RETRIES) {
      log('Error -> retry', { retryCount: retryCount + 1 });
      setRetryCount((r) => r + 1);
      loadedRef.current = false;
      setIframeSrc(bustUrl(layloUrl));
    } else {
      log('Final error -> giving up after max retries');
    }
  }, [retryCount, layloUrl, bustUrl, log]);

  // Early returns for edge cases
  if (!dropId) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 60 }}>
        <span style={{ color: '#999', fontSize: 14 }}>[LayloSimple] Missing dropId</span>
      </div>
    );
  }

  if (!visible) {
    return <div style={{ ...style }} />;
  }

  // Use layloUrl as fallback if iframeSrc is not yet set
  const effectiveSrc = iframeSrc || layloUrl;

  return (
    <iframe
      key={retryCount}
      id={`laylo-drop-${dropId}`}
      title="Laylo Signup"
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      allow="web-share; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture"
      loading="eager"
      onLoad={handleLoad}
      onError={handleError}
      style={{
        ...style,
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        display: 'block'
      }}
      src={effectiveSrc}
    />
  );
};

export default LayloIframeSimple;

