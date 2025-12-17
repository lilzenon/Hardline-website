import React, { useEffect, useRef, useState, useCallback } from 'react';
import useLayloSDK from '../hooks/useLayloSDK';

/**
 * LayloIframeSimple
 * Laylo iframe embed that uses the shared useLayloSDK hook.
 * Ensures strict compatibility with Laylo's official embed code.
 * 
 * IMPORTANT: The iframe can render even before SDK fully initializes.
 * The SDK script just needs to be in the document.
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
  const [retryCount, setRetryCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const isLayloReady = useLayloSDK();
  const loadedRef = useRef(false);
  const iframeRef = useRef(null);
  const retryTimeoutRef = useRef(null);

  // Log callback for debugging
  const log = useCallback((msg, extra) => {
    if (process.env.NODE_ENV === 'development') {
      const ts = new Date().toISOString();
      // eslint-disable-next-line no-console
      console.log(`[LayloSimple ${ts}] ${msg}`, extra ?? '');
    }
  }, []);

  // Handle iframe load
  const handleLoad = useCallback(() => {
    log('Iframe onLoad fired - Laylo embed loaded successfully');
    loadedRef.current = true;
    setIsIframeLoaded(true);
    setHasError(false);

    // Clear any pending retry timeouts
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, [log]);

  // Handle iframe error with smarter retry
  const handleError = useCallback(() => {
    log('Iframe onError - attempting recovery');
    setHasError(true);

    // Retry up to 3 times with exponential backoff
    if (retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      log(`Scheduling retry ${retryCount + 1} in ${delay}ms`);

      retryTimeoutRef.current = setTimeout(() => {
        setRetryCount(r => r + 1);
        setHasError(false);
      }, delay);
    }
  }, [retryCount, log]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Build Laylo URL with cache-busting on retry
  const buildLayloUrl = useCallback(() => {
    if (!dropId) return null;
    let url = `https://embed.laylo.com?dropId=${dropId}&color=${color}&minimal=${minimal}&theme=${theme}&background=${background}`;

    // Add cache-buster on retries to force fresh load
    if (retryCount > 0) {
      url += `&_retry=${retryCount}&_t=${Date.now()}`;
    }
    return url;
  }, [dropId, color, theme, background, minimal, retryCount]);

  const iframeSrc = buildLayloUrl();

  // If invisible or missing dropId, render placeholder
  if (!dropId || !visible) {
    return <div style={{ ...style }} />;
  }

  // Show loading skeleton while SDK initializes AND iframe hasn't loaded yet
  // BUT don't block rendering - the iframe might work even before SDK is "ready"
  const showLoadingSkeleton = !isLayloReady && !isIframeLoaded && !hasError;

  // Calculate default height based on style or use sensible default
  const defaultHeight = style.height || '160px';

  // Exact attributes from user's request with React fixes
  // allowtransparency -> allowTransparency
  // frameborder -> frameBorder
  // style width: 1px min-width: 100%
  return (
    <div style={{ position: 'relative', ...style }}>
      {/* Loading skeleton overlay */}
      {showLoadingSkeleton && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(22, 22, 22, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: style.borderRadius || '0',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderTopColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          {/* Inline keyframe for spinner */}
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Render iframe immediately - don't wait for SDK */}
      <iframe
        ref={iframeRef}
        key={`laylo-${dropId}-${retryCount}`}
        id={`laylo-drop-${dropId}`}
        title="Laylo Signup"
        frameBorder="0"
        scrolling="no"
        allow="web-share"
        allowTransparency={true}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          width: '1px',
          minWidth: '100%',
          maxWidth: '1000px',
          height: defaultHeight, // Explicit height
          minHeight: '150px', // Ensure minimum height
          border: 'none',
          opacity: isIframeLoaded ? 1 : 0.3, // Fade in when loaded
          transition: 'opacity 0.3s ease',
          ...style,
        }}
        src={iframeSrc}
      />
    </div>
  );
};

export default LayloIframeSimple;


