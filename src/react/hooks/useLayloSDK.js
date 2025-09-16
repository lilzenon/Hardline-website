import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing Laylo SDK loading
 * Ensures SDK loads before iframe rendering, with automatic retry logic
 * No UI components - pure loading logic only
 *
 * @returns {boolean} Whether SDK is ready for iframe rendering
 */
export const useLayloSDK = () => {
  const [isReady, setIsReady] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const MAX_RETRIES = 3;
  const SCRIPT_TIMEOUT = 10000; // 10 seconds
  const SCRIPT_SRC = 'https://embed.laylo.com/laylo-sdk.js';

  /**
   * Check if Laylo SDK is available globally
   */
  const isSDKAvailable = useCallback(() => {
    return typeof window !== 'undefined' &&
           (window.Laylo !== undefined ||
            document.querySelector(`script[src="${SCRIPT_SRC}"]`) !== null);
  }, []);

  /**
   * Load Laylo SDK script with proper event handling
   */
  const loadSDK = useCallback(() => {
    return new Promise((resolve, reject) => {
      // Check if script already exists
      const existingScript = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
      if (existingScript) {
        // Script exists, wait for it to be ready
        const checkReady = () => {
          if (window.Laylo || document.readyState === 'complete') {
            resolve();
          } else {
            setTimeout(checkReady, 100);
          }
        };
        checkReady();
        return;
      }

      // Create new script element
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;

      // Set up timeout
      const timeoutId = setTimeout(() => {
        script.remove();
        reject(new Error('Script load timeout'));
      }, SCRIPT_TIMEOUT);

      // Handle successful load
      script.onload = () => {
        clearTimeout(timeoutId);
        // Give SDK time to initialize
        setTimeout(resolve, 200);
      };

      // Handle load error
      script.onerror = () => {
        clearTimeout(timeoutId);
        script.remove();
        reject(new Error('Script load failed'));
      };

      // Add script to document
      document.head.appendChild(script);
    });
  }, []);

  /**
   * Attempt to load SDK with silent retry logic
   */
  const attemptLoad = useCallback(async (attempt = 0) => {
    if (isReady) return;

    try {
      await loadSDK();
      setIsReady(true);
      console.log('🎉 Laylo SDK ready');
    } catch (error) {
      if (attempt < MAX_RETRIES - 1) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        setRetryCount(attempt + 1);
        console.warn(`⚠️ Laylo SDK load failed (attempt ${attempt + 1}), retrying in ${delay}ms...`);
        setTimeout(() => attemptLoad(attempt + 1), delay);
      } else {
        console.error('❌ Laylo SDK failed to load after retries:', error.message);
      }
    }
  }, [isReady, loadSDK]);

  // Initialize SDK loading on mount
  useEffect(() => {
    attemptLoad(0);
  }, [attemptLoad]);

  return isReady;
};

export default useLayloSDK;
