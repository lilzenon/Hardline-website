import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';

// Robust Laylo Iframe Component with Proper SDK Initialization and Content Detection
const LayloIframe = memo(({ dropId, color = 'ff0409', theme = 'dark', background = 'solid', minimal = true, style = {} }) => {
  const [layloReady, setLayloReady] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef(null);
  const contentCheckInterval = useRef(null);
  const maxRetries = 2;
  const contentCheckTimeout = 2000; // 2 seconds to detect content (faster)

  // Build Laylo URL with parameters
  const layloUrl = useMemo(() => {
    const params = new URLSearchParams({
      dropId,
      color,
      theme,
      background: background,
      ...(minimal && { minimal: 'true' })
    });
    return `https://embed.laylo.com/?${params.toString()}`;
  }, [dropId, color, theme, background, minimal]);

  // Check if Laylo SDK is ready (simplified and faster)
  const checkLayloSDKReady = useCallback(() => {
    // Check for Laylo SDK script - if it exists, we're good to go
    const sdkScript = document.querySelector('script[src*="laylo-sdk.js"]');
    if (sdkScript) {
      console.log('✅ Laylo SDK script found, proceeding with iframe');
      return true;
    }

    // 🔧 FIXED: Also check if Laylo global object exists
    if (typeof window !== 'undefined' && window.Laylo) {
      console.log('✅ Laylo global object found, proceeding with iframe');
      return true;
    }

    return false;
  }, []);

  // Check if iframe content has loaded (phone form is visible)
  const checkIframeContent = useCallback(() => {
    if (!iframeRef.current) return false;

    try {
      // Try to access iframe content (may fail due to CORS)
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;

      if (iframeDoc) {
        // Look for Laylo-specific elements
        const layloElements = iframeDoc.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form');
        if (layloElements.length > 0) {
          console.log('✅ Laylo content detected in iframe');
          return true;
        }
      }
    } catch (e) {
      // CORS error is expected, but iframe might still be working
      console.log('🔒 CORS restriction (expected), checking iframe dimensions...');
    }

    // Fallback: Check if iframe has reasonable dimensions (content likely loaded)
    const rect = iframeRef.current.getBoundingClientRect();
    if (rect.height > 50 && rect.width > 100) {
      console.log('✅ Iframe has content-like dimensions, assuming loaded');
      return true;
    }

    return false;
  }, []);

  // Initialize Laylo SDK and iframe
  useEffect(() => {
    if (!dropId) {
      console.warn('⚠️ LayloIframe: No dropId provided');
      return;
    }

    console.log('🚀 LayloIframe: Initializing with dropId:', dropId);

    // Check if SDK is ready immediately
    if (checkLayloSDKReady()) {
      setLayloReady(true);
    } else {
      // Wait a bit for SDK to load, then proceed anyway
      const sdkTimeout = setTimeout(() => {
        console.log('⏰ Laylo SDK timeout, proceeding anyway...');
        setLayloReady(true);
      }, 1000);

      return () => clearTimeout(sdkTimeout);
    }
  }, [dropId, checkLayloSDKReady]);

  // Handle iframe load event
  const handleIframeLoad = useCallback(() => {
    console.log('📡 Iframe load event fired');
    setIframeReady(true);

    // 🔧 FIXED: Notify Laylo SDK that iframe is ready
    if (typeof window !== 'undefined' && window.Laylo && window.Laylo.init) {
      try {
        console.log('🔄 Notifying Laylo SDK of iframe readiness');
        window.Laylo.init();
      } catch (error) {
        console.warn('⚠️ Laylo SDK init failed:', error);
      }
    }

    // Start checking for content
    if (contentCheckInterval.current) {
      clearInterval(contentCheckInterval.current);
    }

    let checkCount = 0;
    const maxChecks = 10; // Check for 2 seconds (200ms * 10)

    contentCheckInterval.current = setInterval(() => {
      checkCount++;

      if (checkIframeContent()) {
        setContentLoaded(true);
        clearInterval(contentCheckInterval.current);
        console.log('✅ Laylo content confirmed loaded');
      } else if (checkCount >= maxChecks) {
        // Assume content is loaded after timeout
        console.log('⏰ Content check timeout, assuming loaded');
        setContentLoaded(true);
        clearInterval(contentCheckInterval.current);
      }
    }, 200);

    // Cleanup after timeout
    setTimeout(() => {
      if (contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
        if (!contentLoaded) {
          console.log('⏰ Final timeout, assuming content loaded');
          setContentLoaded(true);
        }
      }
    }, contentCheckTimeout);
  }, [checkIframeContent, contentLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
      }
    };
  }, []);

  // Handle retry logic
  const handleRetry = useCallback(() => {
    if (retryCount < maxRetries) {
      console.log(`🔄 Retrying Laylo iframe (attempt ${retryCount + 1}/${maxRetries})`);
      setRetryCount(prev => prev + 1);
      setIframeReady(false);
      setContentLoaded(false);

      // Force iframe reload
      if (iframeRef.current) {
        iframeRef.current.src = iframeRef.current.src;
      }
    }
  }, [retryCount, maxRetries]);

  // Don't render until Laylo is ready
  if (!layloReady) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
        <span style={{ color: '#666', fontSize: '14px' }}>Loading...</span>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      id={`laylo-drop-${dropId}`} // 🔧 FIXED: Add required ID for Laylo SDK
      title="Laylo Signup"
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      onLoad={handleIframeLoad}
      allow="web-share" // 🔧 FIXED: Add required permissions
      style={{
        ...style,
        opacity: contentLoaded ? 1 : 0.8,
        transition: 'opacity 0.15s ease-out',
        minHeight: '60px'
      }}
      src={layloUrl}
    />
  );
});

export default LayloIframe;
