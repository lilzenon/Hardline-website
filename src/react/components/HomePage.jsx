import React, { useState, useEffect } from 'react';
import FigmaDesktop from './FigmaDesktop';
import FigmaMobile from './FigmaMobile';
import { useViewportDimensions } from '../hooks/usePerformantResize';
import { useAnalytics } from '../hooks/useAnalytics';
import { useSEO } from '../hooks/useSEO';
import useMobileLifecycle from '../hooks/useMobileLifecycle';
import { initializeMobileOptimizations, isMobileDevice } from '../../utils/mobileOptimization';

/**
 * Homepage component that automatically serves mobile or desktop version
 * based on viewport width and user agent detection
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

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px'
        }}
      >
        Loading...
      </div>
    );
  }

  // Serve appropriate component based on device detection
  return isMobile ? <FigmaMobile /> : <FigmaDesktop />;
};

export default HomePage;
