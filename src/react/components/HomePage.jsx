import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useViewportDimensions } from '../hooks/usePerformantResize';
import { useAnalytics } from '../hooks/useAnalytics';
import { useSEO } from '../hooks/useSEO';
import useMobileLifecycle from '../hooks/useMobileLifecycle';
import { initializeMobileOptimizations, isMobileDevice } from '../../utils/mobileOptimization';
import BrandedLoader from './BrandedLoader';

import { DEFAULT_SEO_SETTINGS } from '../services/seoService';

// 🚀 PERFORMANCE: Optimized lazy loading with immediate desktop, lazy mobile
import FigmaDesktop from './FigmaDesktop';
const FigmaMobile = lazy(() => import('./FigmaMobile'));

/**
 * Homepage component with optimized performance and fast loading
 * Provides immediate desktop rendering and optimized mobile loading
 */
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use performant viewport detection
  const { width: viewportWidth, isMobile: isMobileByWidth } = useViewportDimensions();

  // Initialize analytics tracking
  const { trackEvent, isTrackingEnabled } = useAnalytics();

  // Initialize mobile lifecycle management
  const mobileLifecycle = useMobileLifecycle();

  // Initialize SEO management
  // Ensure homepage title is set on mount (fixes title persistence when returning)
  useEffect(() => {
    try {
      const defaultTitle = DEFAULT_SEO_SETTINGS?.default_title || 'BOUNCE2BOUNCE - Premium Event Platform';
      document.title = defaultTitle;
    } catch (_) {
      // no-op
    }
  }, []);

  const { seoSettings, isMaintenanceMode, refreshSEOSettings } = useSEO();

  useEffect(() => {
    // PERFORMANCE OPTIMIZATION: Batch initialization operations
    const initializeHomepage = async () => {
      const startTime = performance.now();

      // Initialize mobile optimizations first (only if mobile)
      const deviceIsMobile = isMobileDevice() || isMobileByWidth;

      if (deviceIsMobile) {
        initializeMobileOptimizations();

        // Register cleanup for mobile lifecycle
        mobileLifecycle.registerCleanup(() => {
          // Minimal cleanup logging
        });
      }

      setIsMobile(deviceIsMobile);
      setIsLoading(false);

      // PERFORMANCE OPTIMIZATION: Minimal logging in production
      if (process.env.NODE_ENV !== 'production') {
        console.log('📱 Device Detection:', {
          viewportWidth,
          finalDecision: deviceIsMobile ? 'MOBILE' : 'DESKTOP'
        });
      }

      // PERFORMANCE OPTIMIZATION: Defer analytics tracking to not block rendering
      if (isTrackingEnabled) {
        setTimeout(() => {
          trackEvent('device_detection', {
            device_type: deviceIsMobile ? 'mobile' : 'desktop',
            viewport_width: viewportWidth
          });
        }, 100);
      }

      // PERFORMANCE OPTIMIZATION: Defer SEO logging to not block rendering
      if (process.env.NODE_ENV !== 'production') {
        setTimeout(() => {
          console.log('🔍 SEO Settings loaded:', {
            title: seoSettings.default_title,
            hasDescription: !!seoSettings.default_description,
            hasOGImage: !!seoSettings.default_og_image
          });
        }, 200);
      }

      const initTime = performance.now() - startTime;
      if (process.env.NODE_ENV !== 'production') {
        console.log(`⚡ Homepage initialized in ${initTime.toFixed(2)}ms`);
      }
    };

    initializeHomepage();
  }, [viewportWidth, isMobileByWidth]);

  // 🚀 PERFORMANCE: Smooth branded loading state with fade transitions
  if (isLoading) {
    return (
      <BrandedLoader
        fullScreen={true}
        minDisplayTime={800}
        showMessage={false}
      />
    );
  }

  // 🚀 PERFORMANCE: Optimized component rendering with smooth branded fallback
  return (
    <Suspense fallback={
      <BrandedLoader
        fullScreen={true}
        minDisplayTime={300}
        showMessage={false}
      />
    }>
      {isMobile ? <FigmaMobile /> : <FigmaDesktop />}
    </Suspense>
  );
};

export default HomePage;
