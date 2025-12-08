import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * LayloIframeSimple
 * Minimal, reliability-first Laylo iframe embed.
 * - Always renders with src immediately (no delayed initialization)
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
  const loadStartRef = useRef(Date.now());
  const loadTimeoutRef = useRef(null);
  const loadedRef = useRef(false);
  const MAX_RETRIES = 2;
  const LOAD_TIMEOUT_MS = 8000;

  // Build the Laylo embed URL - computed directly, no useMemo needed for simple string
  const buildLayloUrl = useCallback((bustCache = false) => {
    if (!dropId) return null;
    const params = new URLSearchParams({
      dropId,
      color,
      theme,
      background,
      ...(minimal && { minimal: 'true' }),
      ...(bustCache && { _ts: String(Date.now()) }),
    });
    return `https://embed.laylo.com/?${params.toString()}`;
  }, [dropId, color, theme, background, minimal]);

  // Compute src directly - ALWAYS have a valid src on first render
  const iframeSrc = buildLayloUrl(retryCount > 0);

  const log = useCallback((msg, extra) => {
    const ts = new Date().toISOString();
    // eslint-disable-next-line no-console
    console.log(`[LayloSimple ${ts}] ${msg}`, extra ?? '');
  }, []);

  // Log initial mount
  useEffect(() => {
    log('Component mounted', { dropId, visible, src: iframeSrc });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle load timeout and retry logic
  useEffect(() => {
    if (!visible || !iframeSrc) return;

    // Clear any existing timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }

    loadStartRef.current = Date.now();
    loadedRef.current = false;

    // Set up load timeout
    loadTimeoutRef.current = setTimeout(() => {
      if (loadedRef.current) return;

      if (retryCount < MAX_RETRIES) {
        log('Load timeout -> retry', { retryCount: retryCount + 1 });
        setRetryCount((r) => r + 1);
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
  }, [iframeSrc, visible, retryCount, log]);

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
    } else {
      log('Final error -> giving up after max retries');
    }
  }, [retryCount, log]);

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

  if (!iframeSrc) {
    return <div style={{ ...style }} />;
  }

  return (
    <iframe
      key={`laylo-${dropId}-${retryCount}`}
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
      src={iframeSrc}
    />
  );
};

export default LayloIframeSimple;

