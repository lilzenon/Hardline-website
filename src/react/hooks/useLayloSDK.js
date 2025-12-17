import { useState, useEffect, useCallback, useRef } from 'react';

// Global singleton state for SDK loading - prevents race conditions across multiple hook instances
let globalSDKState = {
  isLoading: false,
  isLoaded: false,
  loadPromise: null
};

/**
 * Custom hook for managing Laylo SDK loading
 * Ensures SDK loads before iframe rendering, with automatic retry logic
 * No UI components - pure loading logic only
 * 
 * IMPORTANT: The Laylo iframe can render as soon as the SDK script tag 
 * exists in the document - it doesn't need to wait for window.Laylo
 *
 * @returns {boolean} Whether SDK is ready for iframe rendering
 */
export const useLayloSDK = () => {
  const [isReady, setIsReady] = useState(() => {
    // Check immediately on initialization if SDK script already exists
    if (typeof window !== 'undefined') {
      const scriptExists = document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]') !== null;
      if (scriptExists) {
        console.log('🔍 Laylo SDK script already in DOM, marking ready immediately');
        return true;
      }
    }
    return false;
  });

  const mountedRef = useRef(true);
  const initCalledRef = useRef(false);

  const SCRIPT_SRC = 'https://embed.laylo.com/laylo-sdk.js';
  const MAX_RETRIES = 3;
  const SCRIPT_TIMEOUT = 15000; // 15 seconds - increased for slower connections

  /**
   * Load Laylo SDK script with proper event handling
   * Uses singleton pattern to prevent multiple simultaneous loads
   */
  const loadSDK = useCallback(() => {
    // Return existing promise if already loading
    if (globalSDKState.loadPromise) {
      return globalSDKState.loadPromise;
    }

    // If already loaded, resolve immediately
    if (globalSDKState.isLoaded) {
      return Promise.resolve();
    }

    globalSDKState.isLoading = true;

    globalSDKState.loadPromise = new Promise((resolve, reject) => {
      // Check if script already exists in document
      const existingScript = document.querySelector(`script[src="${SCRIPT_SRC}"]`);

      if (existingScript) {
        console.log('✅ Laylo SDK script already exists, resolving immediately');
        globalSDKState.isLoaded = true;
        globalSDKState.isLoading = false;
        resolve();
        return;
      }

      // Create new script element
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true; // Don't block parsing

      // Set up timeout with longer duration for mobile networks
      const timeoutId = setTimeout(() => {
        console.warn('⚠️ Laylo SDK load timeout - but iframe may still work');
        globalSDKState.isLoading = false;
        // Don't reject - the iframe might still work even if SDK times out
        globalSDKState.isLoaded = true;
        resolve();
      }, SCRIPT_TIMEOUT);

      // Handle successful load
      script.onload = () => {
        clearTimeout(timeoutId);
        console.log('✅ Laylo SDK script loaded successfully');
        globalSDKState.isLoaded = true;
        globalSDKState.isLoading = false;
        // Small delay to ensure SDK initializes
        setTimeout(resolve, 100);
      };

      // Handle load error - don't fail completely, iframe might still work
      script.onerror = (error) => {
        clearTimeout(timeoutId);
        console.warn('⚠️ Laylo SDK script error, but iframe may still work:', error);
        globalSDKState.isLoading = false;
        // Still mark as loaded - the iframe embed works independently of the SDK
        globalSDKState.isLoaded = true;
        resolve();
      };

      // Add script to document head
      document.head.appendChild(script);
      console.log('📥 Laylo SDK script tag added to document');
    });

    return globalSDKState.loadPromise;
  }, []);

  /**
   * Attempt to load SDK with retry logic
   */
  const attemptLoad = useCallback(async (attempt = 0) => {
    if (!mountedRef.current || isReady) return;

    try {
      await loadSDK();
      if (mountedRef.current) {
        setIsReady(true);
        console.log('🎉 Laylo SDK ready for iframe rendering');
      }
    } catch (error) {
      if (attempt < MAX_RETRIES - 1 && mountedRef.current) {
        const delay = Math.pow(2, attempt) * 500; // 500ms, 1s, 2s
        console.warn(`⚠️ Laylo SDK load attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
        setTimeout(() => attemptLoad(attempt + 1), delay);
      } else {
        // Even on failure, allow iframe to render - it may work independently
        console.warn('⚠️ Laylo SDK loading had issues, allowing iframe to render anyway');
        if (mountedRef.current) {
          setIsReady(true);
        }
      }
    }
  }, [isReady, loadSDK]);

  // Initialize SDK loading on mount
  useEffect(() => {
    mountedRef.current = true;

    // Only call attemptLoad once per component mount
    if (!initCalledRef.current) {
      initCalledRef.current = true;

      // If already ready from initial state, don't reload
      if (!isReady) {
        attemptLoad(0);
      }
    }

    return () => {
      mountedRef.current = false;
    };
  }, [attemptLoad, isReady]);

  return isReady;
};

export default useLayloSDK;
