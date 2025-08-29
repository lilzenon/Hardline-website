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
    // Initialize mobile optimizations first
    initializeMobileOptimizations();

    // Enhanced mobile device detection using utility
    const deviceIsMobile = isMobileDevice() || isMobileByWidth;

    setIsMobile(deviceIsMobile);
    setIsLoading(false);

    console.log('📱 Enhanced Device Detection:', {
      viewportWidth,
      isMobileByWidth,
      isMobileByUtility: isMobileDevice(),
      finalDecision: deviceIsMobile ? 'MOBILE' : 'DESKTOP'
    });

    // Register cleanup for mobile lifecycle
    if (deviceIsMobile) {
      console.log('📱 Mobile device detected - enabling lifecycle management');
      mobileLifecycle.registerCleanup(() => {
        console.log('🧹 HomePage cleanup for mobile');
      });
    }

    // Track device type for analytics - IMPORTANT for serving correct content
    if (isTrackingEnabled) {
      trackEvent('device_detection', {
        device_type: deviceIsMobile ? 'mobile' : 'desktop',
        viewport_width: viewportWidth,
        user_agent_mobile: isMobileDevice(),
        viewport_mobile: isMobileByWidth
      });
    }

    // Log SEO settings for debugging
    console.log('🔍 Homepage SEO Settings:', {
      title: seoSettings.default_title,
      description: seoSettings.default_description?.substring(0, 50) + '...',
      og_image: seoSettings.default_og_image,
      maintenance_mode: isMaintenanceMode()
    });
  }, [viewportWidth, isMobileByWidth, mobileLifecycle, isTrackingEnabled, trackEvent, seoSettings, isMaintenanceMode]);

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
