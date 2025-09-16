/**
 * Production Debug Utilities
 * Helps debug issues that only occur in production environments
 */

/**
 * Log environment information for debugging production issues
 */
export function logEnvironmentInfo() {
  const info = {
    // Environment
    nodeEnv: process.env.NODE_ENV,
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    
    // Browser
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    
    // Screen
    screenWidth: screen.width,
    screenHeight: screen.height,
    screenColorDepth: screen.colorDepth,
    screenPixelDepth: screen.pixelDepth,
    
    // Window
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio,
    
    // Location
    protocol: window.location.protocol,
    hostname: window.location.hostname,
    port: window.location.port,
    
    // Performance
    memoryInfo: performance.memory ? {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
    } : 'Not available',
    
    // Timing
    timestamp: new Date().toISOString(),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  
  console.log('🌍 Environment Info:', info);
  return info;
}

/**
 * Log error with production context
 * @param {Error} error - The error to log
 * @param {string} context - Additional context about where the error occurred
 */
export function logProductionError(error, context = '') {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    context,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    environment: process.env.NODE_ENV
  };
  
  console.error('🚨 Production Error:', errorInfo);
  
  // Send to analytics if available
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: `${context}: ${error.message}`,
      fatal: false
    });
  }
  
  return errorInfo;
}

/**
 * Check if we're running in a production-like environment
 * @returns {boolean} True if this appears to be production
 */
export function isProductionEnvironment() {
  return (
    process.env.NODE_ENV === 'production' ||
    window.location.hostname !== 'localhost' ||
    window.location.protocol === 'https:'
  );
}

/**
 * Safe console logging that respects production environment
 * @param {string} level - Log level (log, warn, error)
 * @param {string} message - Message to log
 * @param {any} data - Additional data to log
 */
export function safeLog(level, message, data = null) {
  if (isProductionEnvironment() && level === 'log') {
    // Suppress regular logs in production, but keep warnings and errors
    return;
  }
  
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}]`;
  
  if (data) {
    console[level](`${prefix} ${message}`, data);
  } else {
    console[level](`${prefix} ${message}`);
  }
}

/**
 * Monitor performance and log if it's degraded
 */
export function monitorPerformance() {
  if (!window.performance || !window.performance.mark) {
    return;
  }
  
  // Monitor memory usage if available
  if (performance.memory) {
    const memoryUsage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
    if (memoryUsage > 0.8) {
      console.warn('⚠️ High memory usage detected:', {
        usagePercentage: Math.round(memoryUsage * 100),
        usedMB: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
        limitMB: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
      });
    }
  }
  
  // Monitor frame rate
  let frameCount = 0;
  let lastTime = performance.now();
  
  function checkFrameRate() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      
      if (fps < 30) {
        console.warn('⚠️ Low frame rate detected:', { fps });
      }
    }
    
    requestAnimationFrame(checkFrameRate);
  }
  
  requestAnimationFrame(checkFrameRate);
}
