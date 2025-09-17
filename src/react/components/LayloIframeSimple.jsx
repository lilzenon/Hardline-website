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
  const prevVisibleRef = useRef(visible);
  const lastReloadAtRef = useRef(0);
  const MIN_RELOAD_GAP_MS = 1000;
  const bustUrl = (base) => (base || '') + ((base || '').includes('?') ? '&' : '?') + '_ts=' + Date.now();



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

  // Freshly mount (or re-src) iframe only on false->true visibility; preserve state otherwise
  useEffect(() => {
    const becameVisible = !prevVisibleRef.current && visible;

    if (!visible) {
      // Cleanup when hidden, but preserve iframe state/src
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
      prevVisibleRef.current = visible;
      return;
    }

    if (!becameVisible) {
      // Already visible in previous render; avoid redundant remount/src changes
      prevVisibleRef.current = visible;
      return;
    }

    // First become visible -> ensure src and start timer
    setRetryCount(0);
    loadStartRef.current = Date.now();
    loadedRef.current = false;
    log('Visible -> ensuring iframe src', { retryCount: 0, url: layloUrl });

    // For iOS WebKit, set src after a tiny defer to avoid layout thrash
    if (isIOSWebKit) {
      setEffectiveSrc(null);
      const defer = setTimeout(() => {
        const bust = bustUrl(layloUrl);
        lastReloadAtRef.current = Date.now();
        setEffectiveSrc(bust);
      }, 180);
      // Clear defer if unmounted/hidden
      prevVisibleRef.current = visible;
      return () => {
        clearTimeout(defer);
        if (loadTimeoutRef.current) {
          clearTimeout(loadTimeoutRef.current);
          loadTimeoutRef.current = null;
        }
      };
    } else {
      if (!effectiveSrc) {
        lastReloadAtRef.current = Date.now();
        setEffectiveSrc(layloUrl);
      }
    }

    // Setup of load timeout moved to a separate effect to avoid duplicate timers
    prevVisibleRef.current = visible;
    // no cleanup here; iOS branch above returns its own cleanup
  }, [visible, layloUrl, isIOSWebKit, effectiveSrc]);

  // iOS WebKit: handle bfcache (pageshow persisted) and visibility restores
  useEffect(() => {
    if (!isIOSWebKit) return;
    const onPageShow = (e) => {
      if (e.persisted && visible) {
        const now = Date.now();
        if (now - lastReloadAtRef.current > MIN_RELOAD_GAP_MS) {
          log('pageshow (persisted) -> refreshing iframe src (iOS)');
          lastReloadAtRef.current = now;
          loadedRef.current = false;
          setEffectiveSrc(null);
          setTimeout(() => {
            setEffectiveSrc(bustUrl(layloUrl));
          }, 180);
        }
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && visible) {
        const now = Date.now();
        if (now - lastReloadAtRef.current > MIN_RELOAD_GAP_MS) {
          log('visibilitychange -> visible; refreshing iframe src (iOS)');
          lastReloadAtRef.current = now;
          setEffectiveSrc((curr) => curr ?? bustUrl(layloUrl));
        }
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
      log('Error -> retry (src bust)', { retryCount: retryCount + 1 });
      setRetryCount((r) => r + 1);
      const now = Date.now();
      if (now - lastReloadAtRef.current > MIN_RELOAD_GAP_MS) {
        lastReloadAtRef.current = now;
        loadStartRef.current = Date.now();
        loadedRef.current = false;
        setEffectiveSrc(bustUrl(layloUrl));
      }
    } else {
      log('Final error -> giving up after max retries');
    }
  };
  // Setup load timeout whenever a new src is applied while visible
  useEffect(() => {
    if (!visible || !effectiveSrc) return;
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    loadStartRef.current = Date.now();
    loadTimeoutRef.current = setTimeout(() => {
      if (loadedRef.current) return;
      if (retryCount < MAX_RETRIES) {
        log('Load timeout -> retry (src bust)', { retryCount: retryCount + 1 });
        setRetryCount((r) => r + 1);
        const now = Date.now();
        if (now - lastReloadAtRef.current > MIN_RELOAD_GAP_MS) {
          lastReloadAtRef.current = now;
          setEffectiveSrc(bustUrl(layloUrl));
        }
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
  }, [effectiveSrc, visible, retryCount, layloUrl]);


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
      loading="eager"
      onLoad={handleLoad}
      onError={handleError}
      style={{ ...style, WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)', display: 'block' }}
      src={effectiveSrc ?? layloUrl}
    />
  );
};

export default LayloIframeSimple;

