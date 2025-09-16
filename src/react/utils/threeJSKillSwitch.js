/**
 * Three.js Kill Switch and Global Error Handler
 * Provides emergency fallback when Three.js fails in production
 */

// Global flag to disable Three.js completely
let THREEJS_DISABLED = false;
let THREEJS_ERROR_COUNT = 0;
const MAX_ERRORS = 3;

/**
 * Check if Three.js should be disabled
 * @returns {boolean} True if Three.js should be disabled
 */
export function isThreeJSDisabled() {
  return THREEJS_DISABLED;
}

/**
 * Disable Three.js globally
 * @param {string} reason - Reason for disabling
 */
export function disableThreeJS(reason = 'unknown') {
  THREEJS_DISABLED = true;
  console.warn(`🚨 Three.js DISABLED globally. Reason: ${reason}`);
  
  // Store in localStorage to persist across page reloads
  try {
    localStorage.setItem('threejs-disabled', JSON.stringify({
      disabled: true,
      reason,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    }));
  } catch (e) {
    // Ignore localStorage errors
  }
  
  // Send analytics event
  if (window.gtag) {
    window.gtag('event', 'threejs_disabled', {
      reason,
      error_count: THREEJS_ERROR_COUNT,
      user_agent: navigator.userAgent
    });
  }
}

/**
 * Check if Three.js was previously disabled
 */
export function checkPreviousDisable() {
  try {
    const stored = localStorage.getItem('threejs-disabled');
    if (stored) {
      const data = JSON.parse(stored);
      if (data.disabled) {
        // Auto-expire after 24 hours
        if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
          THREEJS_DISABLED = true;
          console.warn(`🚨 Three.js remains disabled from previous session. Reason: ${data.reason}`);
          return true;
        } else {
          // Clear expired disable
          localStorage.removeItem('threejs-disabled');
        }
      }
    }
  } catch (e) {
    // Ignore localStorage errors
  }
  return false;
}

/**
 * Record a Three.js error and potentially disable it
 * @param {Error} error - The error that occurred
 * @param {string} context - Context where the error occurred
 */
export function recordThreeJSError(error, context = '') {
  THREEJS_ERROR_COUNT++;
  
  console.error(`🚨 Three.js Error #${THREEJS_ERROR_COUNT} in ${context}:`, {
    message: error.message,
    stack: error.stack,
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString()
  });
  
  // Disable Three.js if too many errors
  if (THREEJS_ERROR_COUNT >= MAX_ERRORS) {
    disableThreeJS(`too-many-errors-${THREEJS_ERROR_COUNT}`);
  }
  
  // Send to analytics
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: `ThreeJS Error ${THREEJS_ERROR_COUNT}: ${context} - ${error.message}`,
      fatal: THREEJS_ERROR_COUNT >= MAX_ERRORS
    });
  }
}

/**
 * Install global error handlers for Three.js
 */
export function installGlobalThreeJSErrorHandlers() {
  // Check if previously disabled
  checkPreviousDisable();
  
  // Global error handler
  const originalErrorHandler = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    // Check if this looks like a Three.js error
    if (
      message && (
        message.includes("Cannot read properties of undefined (reading 'S')") ||
        message.includes('three') ||
        message.includes('Three') ||
        message.includes('WebGL') ||
        message.includes('Canvas') ||
        source?.includes('three') ||
        source?.includes('fiber')
      )
    ) {
      recordThreeJSError(error || new Error(message), 'global-error-handler');
      return true; // Prevent default error handling
    }
    
    // Call original handler
    if (originalErrorHandler) {
      return originalErrorHandler.apply(this, arguments);
    }
    return false;
  };
  
  // Unhandled promise rejection handler
  const originalRejectionHandler = window.onunhandledrejection;
  window.onunhandledrejection = function(event) {
    const error = event.reason;
    if (error && (
      error.message?.includes('three') ||
      error.message?.includes('Three') ||
      error.message?.includes('WebGL') ||
      error.message?.includes('Canvas') ||
      error.stack?.includes('three') ||
      error.stack?.includes('fiber')
    )) {
      recordThreeJSError(error, 'unhandled-promise-rejection');
      event.preventDefault(); // Prevent default handling
      return;
    }
    
    // Call original handler
    if (originalRejectionHandler) {
      return originalRejectionHandler.apply(this, arguments);
    }
  };
  
  console.log('🛡️ Global Three.js error handlers installed');
}

/**
 * Create a safe Three.js component wrapper
 * @param {Function} ThreeJSComponent - The Three.js component to wrap
 * @param {Function} FallbackComponent - The fallback component
 * @returns {Function} Wrapped component
 */
export function createSafeThreeJSWrapper(ThreeJSComponent, FallbackComponent) {
  return function SafeThreeJSWrapper(props) {
    // Check if Three.js is disabled
    if (isThreeJSDisabled()) {
      return React.createElement(FallbackComponent, { 
        ...props, 
        reason: 'threejs-disabled' 
      });
    }
    
    try {
      return React.createElement(ThreeJSComponent, props);
    } catch (error) {
      recordThreeJSError(error, 'component-wrapper');
      return React.createElement(FallbackComponent, { 
        ...props, 
        reason: 'component-error' 
      });
    }
  };
}

/**
 * Reset Three.js disable state (for testing/debugging)
 */
export function resetThreeJSState() {
  THREEJS_DISABLED = false;
  THREEJS_ERROR_COUNT = 0;
  try {
    localStorage.removeItem('threejs-disabled');
  } catch (e) {
    // Ignore localStorage errors
  }
  console.log('🔄 Three.js state reset');
}
