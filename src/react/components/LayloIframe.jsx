import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';

// Global Laylo SDK Manager - Singleton pattern to prevent multiple initializations
class LayloSDKManager {
  constructor() {
    this.isLoading = false;
    this.isLoaded = false;
    this.hasError = false;
    this.loadPromise = null;
    this.listeners = new Set();
    this.retryCount = 0;
    this.maxRetries = 3;
  }

  // Add listener for SDK state changes
  addListener(callback) {
    this.listeners.add(callback);
    // Immediately notify if already loaded
    if (this.isLoaded) {
      callback({ isLoaded: true, hasError: false });
    } else if (this.hasError) {
      callback({ isLoaded: false, hasError: true });
    }
  }

  // Remove listener
  removeListener(callback) {
    this.listeners.delete(callback);
  }

  // Notify all listeners of state change
  notifyListeners(state) {
    this.listeners.forEach(callback => callback(state));
  }

  // Load SDK with retry logic
  async loadSDK() {
    if (this.isLoaded) return Promise.resolve();
    if (this.loadPromise) return this.loadPromise;

    this.loadPromise = this._loadSDKInternal();
    return this.loadPromise;
  }

  async _loadSDKInternal() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.hasError = false;

    try {
      // Check if script already exists
      const existingScript = document.querySelector('script[src*="laylo-sdk.js"]');
      if (existingScript && window.Laylo) {
        console.log('✅ Laylo SDK already loaded');
        this.isLoaded = true;
        this.isLoading = false;
        this.notifyListeners({ isLoaded: true, hasError: false });
        return;
      }

      // Remove any existing failed scripts
      const failedScripts = document.querySelectorAll('script[src*="laylo-sdk.js"]');
      failedScripts.forEach(script => {
        if (!script.onload) script.remove();
      });

      // Create new script element
      const script = document.createElement('script');
      script.src = 'https://embed.laylo.com/laylo-sdk.js';
      script.async = true;
      script.defer = true;

      const loadPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Laylo SDK load timeout'));
        }, 10000); // 10 second timeout

        script.onload = () => {
          clearTimeout(timeout);
          console.log('✅ Laylo SDK loaded successfully');

          // Wait a bit for SDK to initialize
          setTimeout(() => {
            if (window.Laylo) {
              this.isLoaded = true;
              this.isLoading = false;
              this.notifyListeners({ isLoaded: true, hasError: false });
              resolve();
            } else {
              reject(new Error('Laylo SDK loaded but window.Laylo not available'));
            }
          }, 500);
        };

        script.onerror = (error) => {
          clearTimeout(timeout);
          reject(error);
        };
      });

      document.head.appendChild(script);
      await loadPromise;

    } catch (error) {
      console.error('❌ Laylo SDK load failed:', error);
      this.hasError = true;
      this.isLoading = false;

      // Retry logic
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(`🔄 Retrying Laylo SDK load (${this.retryCount}/${this.maxRetries})`);

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 2000 * this.retryCount));
        this.loadPromise = null; // Reset promise for retry
        return this._loadSDKInternal();
      } else {
        this.notifyListeners({ isLoaded: false, hasError: true });
        throw error;
      }
    }
  }

  // Check current state
  getState() {
    return {
      isLoading: this.isLoading,
      isLoaded: this.isLoaded,
      hasError: this.hasError
    };
  }
}

// Global instance
const layloSDKManager = new LayloSDKManager();

// Enhanced Laylo Iframe Component with Robust SDK Management
const LayloIframe = memo(({ dropId, color = 'ff0409', theme = 'dark', background = 'solid', minimal = true, style = {} }) => {
  const [sdkState, setSdkState] = useState(layloSDKManager.getState());
  const [iframeReady, setIframeReady] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const iframeRef = useRef(null);
  const contentCheckInterval = useRef(null);
  const mountedRef = useRef(true);
  const contentCheckTimeout = 3000; // 3 seconds for content detection

  // Build Laylo URL with parameters
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

  // SDK state listener
  useEffect(() => {
    mountedRef.current = true;

    const handleSDKStateChange = (state) => {
      if (!mountedRef.current) return;
      setSdkState(state);

      if (state.hasError) {
        setLoadError('Failed to load Laylo SDK');
      }
    };

    layloSDKManager.addListener(handleSDKStateChange);

    // Start loading SDK
    layloSDKManager.loadSDK().catch(error => {
      if (mountedRef.current) {
        setLoadError(error.message);
      }
    });

    return () => {
      mountedRef.current = false;
      layloSDKManager.removeListener(handleSDKStateChange);
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
      }
    };
  }, []);

  // Enhanced iframe content detection
  const checkIframeContent = useCallback(() => {
    if (!iframeRef.current || !mountedRef.current) return false;

    try {
      // Try to access iframe content (may fail due to CORS)
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;

      if (iframeDoc) {
        // Look for Laylo-specific elements
        const layloElements = iframeDoc.querySelectorAll('[class*="laylo"], [id*="laylo"], input[type="tel"], input[placeholder*="phone"], form, [data-laylo]');
        if (layloElements.length > 0) {
          console.log('✅ Laylo content detected in iframe');
          return true;
        }

        // Check for any form elements as fallback
        const formElements = iframeDoc.querySelectorAll('input, button, form');
        if (formElements.length > 0) {
          console.log('✅ Form elements detected in iframe');
          return true;
        }
      }
    } catch (e) {
      // CORS error is expected, but iframe might still be working
      console.log('🔒 CORS restriction (expected), checking iframe dimensions...');
    }

    // Enhanced fallback: Check iframe dimensions and loading state
    const rect = iframeRef.current.getBoundingClientRect();
    const hasValidDimensions = rect.height > 40 && rect.width > 80;

    // Check if iframe has finished loading
    const iframeLoaded = iframeRef.current.contentDocument !== null ||
                        iframeRef.current.contentWindow !== null;

    if (hasValidDimensions && iframeLoaded) {
      console.log('✅ Iframe has valid dimensions and appears loaded');
      return true;
    }

    return false;
  }, []);

  // Enhanced iframe load handler with better error handling
  const handleIframeLoad = useCallback(() => {
    if (!mountedRef.current) return;

    console.log('📡 Iframe load event fired for dropId:', dropId);
    setIframeReady(true);
    setLoadError(null); // Clear any previous errors

    // Enhanced Laylo SDK notification
    if (typeof window !== 'undefined' && window.Laylo) {
      try {
        console.log('🔄 Notifying Laylo SDK of iframe readiness');

        // Try multiple initialization methods
        if (window.Laylo.init) {
          window.Laylo.init();
        }

        if (window.Laylo.refresh) {
          window.Laylo.refresh();
        }

        // Trigger any pending Laylo events
        if (window.Laylo.trigger) {
          window.Laylo.trigger('iframe-ready');
        }

      } catch (error) {
        console.warn('⚠️ Laylo SDK notification failed:', error);
        // Don't fail the component for this
      }
    }

    // Start enhanced content checking
    if (contentCheckInterval.current) {
      clearInterval(contentCheckInterval.current);
    }

    let checkCount = 0;
    const maxChecks = 15; // Check for 3 seconds (200ms * 15)

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
        // More generous timeout - assume content is loaded
        console.log('⏰ Content check timeout, assuming loaded');
        setContentLoaded(true);
        clearInterval(contentCheckInterval.current);
      }
    }, 200);

    // Final fallback timeout
    setTimeout(() => {
      if (mountedRef.current && contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
        if (!contentLoaded) {
          console.log('⏰ Final timeout, forcing content loaded state');
          setContentLoaded(true);
        }
      }
    }, contentCheckTimeout);
  }, [dropId, checkIframeContent, contentLoaded]);

  // Handle iframe errors
  const handleIframeError = useCallback((error) => {
    if (!mountedRef.current) return;

    console.error('❌ Iframe load error:', error);
    setLoadError('Failed to load Laylo content');

    // Try to reload after a delay
    setTimeout(() => {
      if (mountedRef.current && iframeRef.current) {
        console.log('🔄 Attempting iframe reload after error');
        iframeRef.current.src = iframeRef.current.src;
      }
    }, 2000);
  }, []);

  // Render loading state
  if (!dropId) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
        <span style={{ color: '#999', fontSize: '14px' }}>No Laylo ID provided</span>
      </div>
    );
  }

  // Render error state
  if (loadError && sdkState.hasError) {
    return (
      <div style={{ ...style, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60px', padding: '10px' }}>
        <span style={{ color: '#ff6b6b', fontSize: '14px', marginBottom: '8px' }}>Failed to load</span>
        <button
          onClick={() => {
            setLoadError(null);
            layloSDKManager.loadSDK();
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // Render loading state while SDK loads
  if (sdkState.isLoading || (!sdkState.isLoaded && !sdkState.hasError)) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTop: '2px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <span style={{ color: '#999', fontSize: '14px' }}>Loading Laylo...</span>
        </div>
      </div>
    );
  }

  // Don't render iframe until SDK is ready and we have a valid URL
  if (!sdkState.isLoaded || !layloUrl) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
        <span style={{ color: '#999', fontSize: '14px' }}>Preparing...</span>
      </div>
    );
  }

  // Render the iframe
  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
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
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        style={{
          ...style,
          opacity: contentLoaded ? 1 : 0.7,
          transition: 'opacity 0.3s ease-out',
          minHeight: '60px',
          background: 'transparent',
          border: 'none'
        }}
        src={layloUrl}
      />
    </>
  );
});

// Export the SDK manager for external use
export { layloSDKManager };
export default LayloIframe;
