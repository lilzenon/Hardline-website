import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * LayloIframeSimple
 * Laylo iframe embed that loads the official SDK first.
 * Based on official Laylo embed code structure.
 */
const LayloIframeSimple = ({
  dropId,
  color = 'f60509',
  theme = 'dark',
  background = 'transparent',
  minimal = true,
  style = {},
  visible = true,
}) => {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const loadStartRef = useRef(Date.now());
  const loadTimeoutRef = useRef(null);
  const loadedRef = useRef(false);
  const MAX_RETRIES = 2;
  const LOAD_TIMEOUT_MS = 10000;

  const log = useCallback((msg, extra) => {
    const ts = new Date().toISOString();
    // eslint-disable-next-line no-console
    console.log(`[LayloSimple ${ts}] ${msg}`, extra ?? '');
  }, []);

  // Load the Laylo SDK script first (required for iframe to work properly)
  useEffect(() => {
    // Check if SDK is already loaded
    if (document.getElementById('laylo-sdk-script')) {
      log('SDK already loaded');
      setSdkLoaded(true);
      return;
    }

    log('Loading Laylo SDK...');
    const script = document.createElement('script');
    script.id = 'laylo-sdk-script';
    script.src = 'https://embed.laylo.com/laylo-sdk.js';
    script.async = true;

    script.onload = () => {
      log('Laylo SDK loaded successfully');
      setSdkLoaded(true);
    };

    script.onerror = () => {
      log('Laylo SDK failed to load, proceeding anyway');
      // Still set as loaded so iframe renders - it may work without SDK
      setSdkLoaded(true);
    };

    document.head.appendChild(script);

    return () => {
      // Don't remove script on unmount - keep it for reuse
    };
  }, [log]);

  // Build the Laylo embed URL - matching official format
  const buildLayloUrl = useCallback((bustCache = false) => {
    if (!dropId) return null;
    // Match official Laylo URL format (no leading ? before params)
    let url = `https://embed.laylo.com?dropId=${dropId}&color=${color}&minimal=${minimal}&theme=${theme}&background=${background}`;
    if (bustCache) {
      url += `&_ts=${Date.now()}`;
    }
    return url;
  }, [dropId, color, theme, background, minimal]);

  // Compute src directly
  const iframeSrc = buildLayloUrl(retryCount > 0);

  // Log initial mount
  useEffect(() => {
    log('Component mounted', { dropId, visible, src: iframeSrc });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle load timeout and retry logic
  useEffect(() => {
    if (!visible || !iframeSrc || !sdkLoaded) return;

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
  }, [iframeSrc, visible, retryCount, sdkLoaded, log]);

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
        <span style={{ color: '#999', fontSize: 14 }}>[Laylo] Missing dropId</span>
      </div>
    );
  }

  if (!visible) {
    return <div style={{ ...style }} />;
  }

  // Show loading state while SDK loads
  if (!sdkLoaded) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 60 }}>
        <span style={{ color: '#666', fontSize: 12 }}>Loading...</span>
      </div>
    );
  }

  if (!iframeSrc) {
    return <div style={{ ...style }} />;
  }

  // Match official Laylo iframe attributes exactly
  return (
    <iframe
      key={`laylo-${dropId}-${retryCount}`}
      id={`laylo-drop-${dropId}`}
      title="Laylo Signup"
      frameBorder="0"
      scrolling="no"
      allow="web-share"
      allowtransparency="true"
      onLoad={handleLoad}
      onError={handleError}
      style={{
        width: '1px',
        minWidth: '100%',
        maxWidth: '1000px',
        ...style,
      }}
      src={iframeSrc}
    />
  );
};

export default LayloIframeSimple;

