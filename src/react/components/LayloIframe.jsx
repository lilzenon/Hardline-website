import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';

// Simple Laylo Iframe Component - Restored to Basic Functionality
const LayloIframe = memo(({ dropId, color = 'ff0409', theme = 'dark', background = 'solid', minimal = true, style = {} }) => {
  const [iframeReady, setIframeReady] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const iframeRef = useRef(null);
  const contentCheckInterval = useRef(null);
  const mountedRef = useRef(true);

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
    return `https://embed.laylo.com/?${params.toString()}`;
  }, [dropId, color, theme, background, minimal]);

  // Simple component lifecycle management
  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      if (contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
      }
    };
  }, []);

  // Simple iframe content detection - RESTORED BASIC FUNCTIONALITY
  const checkIframeContent = useCallback(() => {
    if (!iframeRef.current || !mountedRef.current) return false;

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

  // Simple iframe load handler - RESTORED BASIC FUNCTIONALITY
  const handleIframeLoad = useCallback(() => {
    if (!mountedRef.current) return;

    console.log('📡 Iframe load event fired');
    setIframeReady(true);

    // Basic Laylo SDK notification - PRESERVED ORIGINAL IMPLEMENTATION
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
      if (!mountedRef.current) {
        clearInterval(contentCheckInterval.current);
        return;
      }

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
      if (mountedRef.current && contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
        if (!contentLoaded) {
          console.log('⏰ Final timeout, assuming content loaded');
          setContentLoaded(true);
        }
      }
    }, 2000); // 2 second timeout
  }, [checkIframeContent, contentLoaded]);

  // Simple error handling
  const handleIframeError = useCallback((error) => {
    if (!mountedRef.current) return;
    console.error('❌ Iframe load error:', error);
  }, []);

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

  // Render the iframe - RESTORED ORIGINAL IMPLEMENTATION
  return (
    <iframe
      ref={iframeRef}
      id={`laylo-drop-${dropId}`}
      title="Laylo Signup"
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      onLoad={handleIframeLoad}
      onError={handleIframeError}
      allow="web-share"
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
