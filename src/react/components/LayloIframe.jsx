import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';

// Robust Laylo Iframe Component with Enhanced Loading Reliability
const LayloIframe = memo(({ dropId, color = 'ff0409', theme = 'dark', background = 'solid', minimal = true, style = {}, visible = true }) => {
  const [iframeReady, setIframeReady] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [iframeKey, setIframeKey] = useState(0); // Force remount without changing URL
  const iframeRef = useRef(null);
  const contentCheckInterval = useRef(null);
  const loadTimeoutRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const mountedRef = useRef(true);
  const loadStartTime = useRef(null);

  // Configuration constants for reliability
  const MAX_LOAD_ATTEMPTS = 3;
  const LOAD_TIMEOUT_MS = 8000; // 8 seconds for initial load
  const RETRY_DELAY_MS = 2000; // 2 seconds between retries
  const CONTENT_CHECK_INTERVAL_MS = 300; // Check every 300ms
  const MAX_CONTENT_CHECKS = 20; // Check for 6 seconds (300ms * 20)

  // Build Laylo URL with parameters - PRESERVED ORIGINAL IMPLEMENTATION
  const layloUrl = useMemo(() => {
    if (!dropId) return null;

    const params = new URLSearchParams({
      dropId,
      color,
      theme,
      background: background,
      ...(minimal && { minimal: 'true' })
    });

    // Preserve exact Laylo URL and parameters without modification
    return `https://embed.laylo.com/?${params.toString()}`;
  }, [dropId, color, theme, background, minimal, loadAttempts]);

  // Enhanced component lifecycle management with cleanup
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      // Comprehensive cleanup
      if (contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
        contentCheckInterval.current = null;
      }
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, []);

  // Enhanced iframe content detection with multiple strategies
  const checkIframeContent = useCallback(() => {
    if (!iframeRef.current || !mountedRef.current) return false;

    try {
      // Strategy 1: Try to access iframe content (may fail due to CORS)
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;

      if (iframeDoc) {
        // Look for Laylo-specific elements and general form elements
        const layloElements = iframeDoc.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form, button');
        if (layloElements.length > 0) {
          console.log('✅ Laylo content detected in iframe via DOM access');
          return true;
        }

        // Check if document has meaningful content
        const bodyContent = iframeDoc.body?.textContent?.trim();
        if (bodyContent && bodyContent.length > 10) {
          console.log('✅ Iframe has meaningful text content');
          return true;
        }
      }
    } catch (e) {
      // CORS error is expected for cross-origin iframes
      console.log('🔒 CORS restriction (expected), using fallback detection methods...');
    }

    // Strategy 2: Check iframe dimensions and properties
    const iframe = iframeRef.current;
    const rect = iframe.getBoundingClientRect();

    // Check if iframe has reasonable dimensions
    if (rect.height > 50 && rect.width > 100) {
      console.log('✅ Iframe has content-like dimensions, likely loaded');
      return true;
    }

    // Strategy 3: Check if iframe src is properly set and not about:blank
    if (iframe.src && iframe.src !== 'about:blank' && iframe.src.includes('laylo.com')) {
      // Additional heuristic: if enough time has passed, assume it's loaded
      const timeSinceLoad = Date.now() - (loadStartTime.current || 0);
      if (timeSinceLoad > 3000) { // 3 seconds
        console.log('✅ Sufficient time passed with valid src, assuming loaded');
        return true;
      }
    }

    return false;
  }, []);

  // Retry mechanism for failed loads
  const retryLoad = useCallback(() => {
    if (!mountedRef.current || loadAttempts >= MAX_LOAD_ATTEMPTS) return;

    console.log(`🔄 Retrying iframe load (attempt ${loadAttempts + 1}/${MAX_LOAD_ATTEMPTS})`);
    setIsRetrying(true);
    setLoadAttempts(prev => prev + 1);
    setIframeReady(false);
    setContentLoaded(false);

    // Clear any existing timeouts
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    if (contentCheckInterval.current) {
      clearInterval(contentCheckInterval.current);
      contentCheckInterval.current = null;
    }

    // Delay before retry to avoid rapid successive requests
    retryTimeoutRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setIsRetrying(false);
        // Force remount of the iframe element without modifying the URL
        setIframeKey((k) => k + 1);
        loadStartTime.current = Date.now();
      }
    }, RETRY_DELAY_MS);
  }, [loadAttempts, MAX_LOAD_ATTEMPTS]);

  // Enhanced iframe load handler with timeout and retry logic
  const handleIframeLoad = useCallback(() => {
    if (!mountedRef.current) return;

    console.log(`📡 Iframe load event fired (attempt ${loadAttempts + 1})`);

    // Clear load timeout since we got a load event
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }

    setIframeReady(true);

    // Laylo SDK notification - PRESERVED ORIGINAL IMPLEMENTATION
    if (typeof window !== 'undefined' && window.Laylo && window.Laylo.init) {
      try {
        console.log('🔄 Notifying Laylo SDK of iframe readiness');
        window.Laylo.init();
      } catch (error) {
        console.warn('⚠️ Laylo SDK init failed:', error);
      }
    }

    // Start enhanced content checking
    if (contentCheckInterval.current) {
      clearInterval(contentCheckInterval.current);
      contentCheckInterval.current = null;
    }

    let checkCount = 0;

    contentCheckInterval.current = setInterval(() => {
      if (!mountedRef.current) {
        clearInterval(contentCheckInterval.current);
        contentCheckInterval.current = null;
        return;
      }

      checkCount++;

      if (checkIframeContent()) {
        setContentLoaded(true);
        clearInterval(contentCheckInterval.current);
        contentCheckInterval.current = null;
        console.log('✅ Laylo content confirmed loaded successfully');
      } else if (checkCount >= MAX_CONTENT_CHECKS) {
        // Content check timeout - decide whether to retry or assume loaded
        clearInterval(contentCheckInterval.current);
        contentCheckInterval.current = null;

        if (loadAttempts < MAX_LOAD_ATTEMPTS - 1) {
          console.log('⚠️ Content check timeout, retrying...');
          retryLoad();
        } else {
          console.log('⏰ Final content check timeout, assuming loaded');
          setContentLoaded(true);
        }
      }
    }, CONTENT_CHECK_INTERVAL_MS);
  }, [checkIframeContent, loadAttempts, retryLoad, MAX_CONTENT_CHECKS, CONTENT_CHECK_INTERVAL_MS]);

  // Enhanced error handling with retry logic
  const handleIframeError = useCallback((error) => {
    if (!mountedRef.current) return;

    console.error(`❌ Iframe load error (attempt ${loadAttempts + 1}):`, error);

    // Clear any existing timeouts
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }

    // Attempt retry if we haven't exceeded max attempts
    if (loadAttempts < MAX_LOAD_ATTEMPTS - 1) {
      console.log('🔄 Iframe error detected, will retry...');
      retryLoad();
    } else {
      console.error('💥 Max retry attempts reached, iframe loading failed');
      // Still set content loaded to prevent infinite loading state
      setContentLoaded(true);
    }
  }, [loadAttempts, retryLoad, MAX_LOAD_ATTEMPTS]);

  // When iframe becomes visible, ensure a load attempt occurs if not yet loaded
  useEffect(() => {
    if (!mountedRef.current) return;
    if (visible && !contentLoaded && !isRetrying && loadAttempts === 0) {
      // Kick off load timing for first visibility
      loadStartTime.current = Date.now();
      // No need to force remount; the initial mount will proceed
    }
    // If re-visible after hidden and content never confirmed, trigger a retry
    if (visible && !contentLoaded && !isRetrying && loadAttempts > 0 && loadAttempts < MAX_LOAD_ATTEMPTS) {
      console.log('👁️ Iframe became visible without content, triggering retry...');
      retryLoad();
    }
  }, [visible, contentLoaded, isRetrying, loadAttempts, MAX_LOAD_ATTEMPTS, retryLoad]);

  // Load timeout handler
  const handleLoadTimeout = useCallback(() => {
    if (!mountedRef.current) return;

    console.warn(`⏰ Iframe load timeout (attempt ${loadAttempts + 1})`);

    if (loadAttempts < MAX_LOAD_ATTEMPTS - 1) {
      console.log('🔄 Load timeout, retrying...');
      retryLoad();
    } else {
      console.warn('⏰ Final load timeout, assuming iframe is working');
      setIframeReady(true);
      setContentLoaded(true);
    }
  }, [loadAttempts, retryLoad, MAX_LOAD_ATTEMPTS]);

  // Set up load timeout when iframe src changes
  useEffect(() => {
    if (!layloUrl || isRetrying) return;

    loadStartTime.current = Date.now();

    // Clear any existing timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    // Set load timeout
    loadTimeoutRef.current = setTimeout(handleLoadTimeout, LOAD_TIMEOUT_MS);

    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
  }, [layloUrl, isRetrying, iframeKey, handleLoadTimeout, LOAD_TIMEOUT_MS]);

  // Don't render if no dropId - PRESERVED ORIGINAL LOGIC
  if (!dropId) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
        <span style={{ color: '#999', fontSize: '14px' }}>No Laylo ID provided</span>
      </div>
    );
  }

  // Don't render if no URL - PRESERVED ORIGINAL LOGIC
  if (!layloUrl) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
        <span style={{ color: '#999', fontSize: '14px' }}>Loading...</span>
      </div>
    );
  }

  // Render the iframe with enhanced reliability - PRESERVED VISUAL APPEARANCE
  return (
    <iframe
      key={iframeKey}
      ref={iframeRef}
      id={`laylo-drop-${dropId}`}
      title="Laylo Signup"
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      onLoad={handleIframeLoad}
      onError={handleIframeError}
      style={style}
      src={layloUrl}
    />
  );
});

export default LayloIframe;
