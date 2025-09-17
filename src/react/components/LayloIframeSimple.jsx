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
  const isIOSWebKit = useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    const ua = navigator.userAgent;
    const isWebKit = /AppleWebKit/i.test(ua);
    const isIOS = /iP(hone|od|ad)|Mobile/i.test(ua);
    const isCriOS = /CriOS/i.test(ua);
    const isFxiOS = /FxiOS/i.test(ua);
    return isWebKit && isIOS && !isCriOS && !isFxiOS;
  }, []);

  // Effective src used for iOS WebKit deferral and cache-busting
  const [effectiveSrc, setEffectiveSrc] = useState(null);


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

  // Freshly mount (or re-src) iframe when it becomes visible; iOS WebKit defers src until visible
  useEffect(() => {
    if (!visible) {
      // Cleanup when hidden
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
      loadedRef.current = false;
      if (isIOSWebKit) {
        setEffectiveSrc(null);
      }
      return;
    }

    // When visible, remount and start timer
    setRetryCount(0);
    setIframeKey((k) => k + 1);
    loadStartRef.current = Date.now();
    loadedRef.current = false;
    log('Visible -> (re)mounting iframe', { retryCount: 0, url: layloUrl });

    // For iOS WebKit, set src after a tiny defer to avoid layout thrash
    if (isIOSWebKit) {
      setEffectiveSrc(null);
      const defer = setTimeout(() => {
        const bust = (layloUrl || '') + ((layloUrl || '').includes('?') ? '&' : '?') + '_ts=' + Date.now();
        setEffectiveSrc(bust);
      }, 180);
      // Clear defer if unmounted/hidden
      return () => {
        clearTimeout(defer);
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
          loadTimeoutRef.current = null;
        }
      };
    } else {
      setEffectiveSrc(layloUrl);
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, layloUrl, isIOSWebKit]);

  // iOS WebKit: handle bfcache (pageshow persisted) and visibility restores
  useEffect(() => {
    if (!isIOSWebKit) return;
    const onPageShow = (e) => {
      if (e.persisted && visible) {
        log('pageshow (persisted) -> remounting iframe for iOS WebKit');
        setRetryCount(0);
        setIframeKey((k) => k + 1);
        loadStartRef.current = Date.now();
        loadedRef.current = false;
        setEffectiveSrc(null);
        setTimeout(() => {
          const bust = (layloUrl || '') + ((layloUrl || '').includes('?') ? '&' : '?') + '_ts=' + Date.now();
          setEffectiveSrc(bust);
        }, 180);
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && visible) {
        log('visibilitychange -> visible; ensuring iframe src for iOS WebKit');
        setEffectiveSrc((curr) => curr ?? ((layloUrl || '') + ((layloUrl || '').includes('?') ? '&' : '?') + '_ts=' + Date.now()));
      }
    };
    window.addEventListener('pageshow', onPageShow);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [isIOSWebKit, visible, layloUrl]);

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
      allow="web-share; clipboard-write; fullscreen; autoplay; encrypted-media; picture-in-picture"
      allowFullScreen
      loading="eager"
      onLoad={handleLoad}
      onError={handleError}
      style={{ ...style, WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)', display: 'block' }}
      src={effectiveSrc ?? layloUrl}
    />
  );
};

export default LayloIframeSimple;

