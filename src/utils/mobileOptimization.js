/**
 * Mobile Optimization Utilities
 * Handles mobile-specific performance optimizations and memory management
 */

// Mobile device detection with enhanced accuracy
export const isMobileDevice = () => {
  const userAgent = navigator.userAgent || '';
  const isMobileUA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isMobileViewport = window.innerWidth <= 768;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobileUA || (isMobileViewport && isTouchDevice);
};

// Enhanced mobile browser detection
export const getMobileBrowserInfo = () => {
  const userAgent = navigator.userAgent || '';
  
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
  const isChrome = /Chrome/.test(userAgent);
  const isFirefox = /Firefox/.test(userAgent);
  
  return {
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    isFirefox,
    isMobile: isMobileDevice(),
    supportsPassiveEvents: checkPassiveEventSupport(),
    supportsIntersectionObserver: 'IntersectionObserver' in window,
    supportsRequestIdleCallback: 'requestIdleCallback' in window
  };
};

// Check for passive event support
function checkPassiveEventSupport() {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get() {
        supportsPassive = true;
        return false;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {
    // Passive events not supported
  }
  return supportsPassive;
}

// Mobile-optimized debounce function
export const mobileDebounce = (func, wait, immediate = false) => {
  let timeout;
  let lastCallTime = 0;
  
  return function executedFunction(...args) {
    const callNow = immediate && !timeout;
    const currentTime = Date.now();
    
    // For mobile, use longer debounce times to prevent excessive calls
    const adjustedWait = isMobileDevice() ? Math.max(wait, 100) : wait;
    
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        lastCallTime = Date.now();
        func.apply(this, args);
      }
    }, adjustedWait);
    
    if (callNow) {
      lastCallTime = currentTime;
      func.apply(this, args);
    }
  };
};

// Mobile-optimized throttle function
export const mobileThrottle = (func, limit) => {
  let inThrottle;
  let lastCallTime = 0;
  
  return function(...args) {
    const currentTime = Date.now();
    
    // For mobile, use longer throttle times
    const adjustedLimit = isMobileDevice() ? Math.max(limit, 50) : limit;
    
    if (!inThrottle || (currentTime - lastCallTime) >= adjustedLimit) {
      func.apply(this, args);
      lastCallTime = currentTime;
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, adjustedLimit);
    }
  };
};

// Optimize images for mobile
export const optimizeImageForMobile = (imageElement, options = {}) => {
  const {
    lazyLoad = true,
    quality = 0.8,
    maxWidth = window.innerWidth,
    maxHeight = window.innerHeight
  } = options;
  
  if (!imageElement) return;
  
  // Add loading attribute for native lazy loading
  if (lazyLoad && 'loading' in HTMLImageElement.prototype) {
    imageElement.loading = 'lazy';
  }
  
  // Add decoding attribute for better performance
  imageElement.decoding = 'async';
  
  // Set appropriate sizes for responsive images
  if (imageElement.srcset) {
    imageElement.sizes = `(max-width: 768px) 100vw, ${maxWidth}px`;
  }
  
  // Add error handling
  imageElement.onerror = () => {
    console.warn('Image failed to load:', imageElement.src);
    // Could implement fallback image here
  };
};

// Memory management utilities
export const memoryManager = {
  // Force garbage collection if available
  forceGC() {
    if (window.gc) {
      window.gc();
      console.log('🗑️ Forced garbage collection');
    }
  },
  
  // Get memory usage information
  getMemoryInfo() {
    if ('memory' in performance) {
      const memInfo = performance.memory;
      return {
        used: memInfo.usedJSHeapSize,
        total: memInfo.totalJSHeapSize,
        limit: memInfo.jsHeapSizeLimit,
        usageRatio: memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit
      };
    }
    return null;
  },
  
  // Check if memory usage is high
  isMemoryPressure() {
    const memInfo = this.getMemoryInfo();
    return memInfo ? memInfo.usageRatio > 0.8 : false;
  },
  
  // Clean up blob URLs and object URLs
  cleanupBlobUrls() {
    // This would need to be called with specific URLs to revoke
    console.log('🧹 Cleaning up blob URLs');
  }
};

// Mobile viewport utilities
export const viewportManager = {
  // Set mobile viewport meta tag
  setMobileViewport() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      document.head.appendChild(viewport);
    }
    
    // Optimized viewport settings for mobile
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover';
  },
  
  // Handle iOS Safari viewport issues
  fixIOSViewport() {
    if (getMobileBrowserInfo().isIOS) {
      const setVH = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };
      
      setVH();
      window.addEventListener('resize', mobileDebounce(setVH, 100), { passive: true });
      window.addEventListener('orientationchange', mobileDebounce(setVH, 100), { passive: true });
    }
  },
  
  // Get safe area insets for devices with notches
  getSafeAreaInsets() {
    const style = getComputedStyle(document.documentElement);
    return {
      top: style.getPropertyValue('--sat') || style.getPropertyValue('env(safe-area-inset-top)') || '0px',
      right: style.getPropertyValue('--sar') || style.getPropertyValue('env(safe-area-inset-right)') || '0px',
      bottom: style.getPropertyValue('--sab') || style.getPropertyValue('env(safe-area-inset-bottom)') || '0px',
      left: style.getPropertyValue('--sal') || style.getPropertyValue('env(safe-area-inset-left)') || '0px'
    };
  }
};

// Performance monitoring for mobile
export const performanceMonitor = {
  // Track performance metrics
  trackMetrics() {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      const metrics = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        memoryInfo: memoryManager.getMemoryInfo()
      };
      
      console.log('📊 Mobile Performance Metrics:', metrics);
      return metrics;
    }
    return null;
  },
  
  // Monitor for performance issues
  startMonitoring() {
    if (isMobileDevice()) {
      // Check performance every 30 seconds
      setInterval(() => {
        if (memoryManager.isMemoryPressure()) {
          console.warn('⚠️ High memory usage detected on mobile device');
          memoryManager.forceGC();
        }
      }, 30000);
    }
  }
};

// Initialize mobile optimizations
export const initializeMobileOptimizations = () => {
  if (isMobileDevice()) {
    console.log('📱 Initializing mobile optimizations');
    
    viewportManager.setMobileViewport();
    viewportManager.fixIOSViewport();
    performanceMonitor.startMonitoring();
    
    // Add mobile-specific CSS class
    document.documentElement.classList.add('mobile-device');
    
    // Add browser-specific classes
    const browserInfo = getMobileBrowserInfo();
    if (browserInfo.isIOS) document.documentElement.classList.add('ios');
    if (browserInfo.isAndroid) document.documentElement.classList.add('android');
    if (browserInfo.isSafari) document.documentElement.classList.add('safari');
    if (browserInfo.isChrome) document.documentElement.classList.add('chrome');
  }
};

export default {
  isMobileDevice,
  getMobileBrowserInfo,
  mobileDebounce,
  mobileThrottle,
  optimizeImageForMobile,
  memoryManager,
  viewportManager,
  performanceMonitor,
  initializeMobileOptimizations
};
