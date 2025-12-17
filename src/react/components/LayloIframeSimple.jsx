import React, { useEffect, useRef, useState, useCallback } from 'react';
import useLayloSDK from '../hooks/useLayloSDK';

/**
 * LayloIframeSimple
 * Laylo iframe embed that uses the shared useLayloSDK hook.
 * Ensures strict compatibility with Laylo's official embed code.
 * 
 * IMPORTANT: This component includes Safari-specific bfcache handling
 * to ensure the iframe loads reliably on page refresh.
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
  const [iframeKey, setIframeKey] = useState(0); // Key to force remount iframe
  const isLayloReady = useLayloSDK();
  const loadedRef = useRef(false);
  const iframeRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const mountedRef = useRef(true);
  const loadStartTimeRef = useRef(Date.now());

  // Log callback for development debugging
  const log = useCallback((msg, extra) => {
    if (process.env.NODE_ENV === 'development') {
      const ts = new Date().toISOString();
      console.log(`[LayloSimple ${ts}] ${msg}`, extra ?? '');
    } else {
      // In production, still log Safari-specific issues for debugging
      if (msg.includes('Safari') || msg.includes('bfcache') || msg.includes('pageshow')) {
        console.log(`[Laylo] ${msg}`, extra ?? '');
      }
    }
  }, []);

  // Detect Safari browser
  const isSafari = useCallback(() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(ua);
    const isIOSSafari = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    return isSafariBrowser || isIOSSafari;
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
        if (mountedRef.current) {
          setRetryCount(r => r + 1);
          setHasError(false);
          setIframeKey(k => k + 1); // Force remount
        }
      }, delay);
    }
  }, [retryCount, log]);

  // Force refresh the iframe (used for bfcache/visibility recovery)
  const forceRefreshIframe = useCallback(() => {
    log('🔄 Force refreshing iframe');
    loadedRef.current = false;
    setIsIframeLoaded(false);
    setHasError(false);
    setRetryCount(0);
    loadStartTimeRef.current = Date.now();
    setIframeKey(k => k + 1); // Increment key to force React to remount iframe
  }, [log]);

  // Safari bfcache and visibility change handling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Handle page restore from bfcache (Safari-specific issue)
    const handlePageShow = (event) => {
      if (!mountedRef.current) return;

      // Check if page was restored from bfcache
      if (event && event.persisted) {
        log('📦 Safari bfcache restore detected (pageshow.persisted=true) - refreshing iframe');
        forceRefreshIframe();
      }
    };

    // Handle tab visibility changes (also affects Safari)
    const handleVisibilityChange = () => {
      if (!mountedRef.current) return;

      if (document.visibilityState === 'visible' && visible) {
        // Small delay to let Safari finish restoring the page
        setTimeout(() => {
          if (mountedRef.current && !isIframeLoaded && !loadedRef.current) {
            log('👁️ Tab became visible and iframe not loaded - refreshing');
            forceRefreshIframe();
          }
        }, 200);
      }
    };

    // Safari-specific: Also handle focus event as backup
    const handleFocus = () => {
      if (!mountedRef.current || !isSafari()) return;

      // Check if enough time passed since load started but iframe not loaded
      const timeSinceStart = Date.now() - loadStartTimeRef.current;
      if (timeSinceStart > 3000 && !isIframeLoaded && !loadedRef.current) {
        log('🔍 Safari focus detected - iframe not loaded after 3s, refreshing');
        forceRefreshIframe();
      }
    };

    // Add event listeners
    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    log('🎧 Safari bfcache handlers registered');

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [visible, isIframeLoaded, forceRefreshIframe, isSafari, log]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    loadStartTimeRef.current = Date.now();

    return () => {
      mountedRef.current = false;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  // Safari-specific: Periodic check during initial load to detect stuck state
  useEffect(() => {
    if (!isSafari() || isIframeLoaded || !visible) return;

    const checkTimeout = setTimeout(() => {
      if (mountedRef.current && !isIframeLoaded && !loadedRef.current) {
        log('⏰ Safari: iframe not loaded after 5s, forcing refresh');
        forceRefreshIframe();
      }
    }, 5000);

    return () => clearTimeout(checkTimeout);
  }, [isSafari, isIframeLoaded, visible, forceRefreshIframe, log, iframeKey]);

  // Build Laylo URL with cache-busting on retry
  const buildLayloUrl = useCallback(() => {
    if (!dropId) return null;
    let url = `https://embed.laylo.com?dropId=${dropId}&color=${color}&minimal=${minimal}&theme=${theme}&background=${background}`;

    // Add cache-buster on retries AND on key change to force fresh load
    if (retryCount > 0 || iframeKey > 0) {
      url += `&_v=${iframeKey}&_retry=${retryCount}&_t=${Date.now()}`;
    }
    return url;
  }, [dropId, color, theme, background, minimal, retryCount, iframeKey]);

  const iframeSrc = buildLayloUrl();

  // If invisible or missing dropId, render placeholder
  if (!dropId || !visible) {
    return <div style={{ ...style }} />;
  }

  // Show loading skeleton while SDK initializes AND iframe hasn't loaded yet
  const showLoadingSkeleton = !isLayloReady && !isIframeLoaded && !hasError;

  // Calculate default height based on style or use sensible default
  const defaultHeight = style.height || '160px';

  // Exact attributes from Laylo's official embed code with React fixes
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
              animation: 'layloSpin 1s linear infinite',
            }}
          />
          <style>{`@keyframes layloSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Render iframe - key change forces remount for Safari bfcache recovery */}
      <iframe
        ref={iframeRef}
        key={`laylo-${dropId}-${iframeKey}-${retryCount}`}
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
          height: defaultHeight,
          minHeight: '150px',
          border: 'none',
          opacity: isIframeLoaded ? 1 : 0.3,
          transition: 'opacity 0.3s ease',
          ...style,
        }}
        src={iframeSrc}
      />
    </div>
  );
};

export default LayloIframeSimple;



