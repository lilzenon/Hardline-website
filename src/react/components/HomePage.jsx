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
  const [showLoader, setShowLoader] = useState(true); // Control opacity
  const [mountLoader, setMountLoader] = useState(true); // Control DOM presence
  const [childReady, setChildReady] = useState(false); // Signal from child component
  const [minTimeElapsed, setMinTimeElapsed] = useState(false); // Signal from timer

  // Use performant viewport detection
  const { width: viewportWidth, isMobile: isMobileByWidth } = useViewportDimensions();

  // Initialize analytics tracking
  const { trackEvent, isTrackingEnabled } = useAnalytics();

  // Initialize mobile lifecycle management
  const mobileLifecycle = useMobileLifecycle();

  // Initialize SEO management
  const { seoSettings, isMaintenanceMode, refreshSEOSettings } = useSEO();

  // Handle Initial Load Check (Timer & Preload)
  useEffect(() => {
    let isMounted = true;

    const runInitialChecks = async () => {
      const startTime = performance.now();

      // Determine initial device type
      const uaMobile = isMobileDevice();
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
      const initialIsMobile = uaMobile || screenWidth <= 768;

      if (isMounted) setIsMobile(initialIsMobile);

      // Initialize mobile optimizations
      if (initialIsMobile) {
        initializeMobileOptimizations();
        mobileLifecycle.registerCleanup(() => { });
      }

      // 🎨 UX IMPROVEMENT: Minimized loader time for instant feel
      // Double requestAnimationFrame in children ensures we don't flash unpainted content
      const MIN_LOADER_TIME = 0;
      const tasks = [];

      // 1. Timer Task
      tasks.push(new Promise(resolve => {
        const remaining = Math.max(0, MIN_LOADER_TIME - (performance.now() - startTime));
        setTimeout(resolve, remaining);
      }));

      // 2. Preload Task
      if (initialIsMobile) {
        tasks.push(import('./FigmaMobile').catch(err => console.error('Failed to preload mobile:', err)));
      } else {
        tasks.push(import('./FigmaDesktop').catch(() => { }));
      }

      await Promise.all(tasks);

      if (isMounted) {
        setMinTimeElapsed(true);
      }
    };

    runInitialChecks();
    return () => { isMounted = false; };
  }, []); // Run once on mount

  // Coordinate Fade Out: Wait for BOTH Timer AND Child Ready
  useEffect(() => {
    if (minTimeElapsed && childReady && showLoader) {
      // Start Fade Out
      setShowLoader(false);

      // Unmount after transition (0.5s match CSS)
      const cleanupTimer = setTimeout(() => {
        setMountLoader(false);
        setIsLoading(false); // Update logical state
        if (process.env.NODE_ENV !== 'production') {
          console.log(`⚡ Homepage revealed (Timer: ${minTimeElapsed}, Child: ${childReady})`);
        }
      }, 500);

      return () => clearTimeout(cleanupTimer);
    }
  }, [minTimeElapsed, childReady, showLoader]);

  // Handle Responsive Updates (Separate from Load Logic)
  useEffect(() => {
    // Only update isMobile if the viewport width significantly changes after load
    const deviceIsMobile = isMobileDevice() || isMobileByWidth;
    setIsMobile(deviceIsMobile);
  }, [viewportWidth, isMobileByWidth]);

  // Handle Post-Load Analytics & SEO
  useEffect(() => {
    if (mountLoader) return; // Wait until fully loaded

    if (isTrackingEnabled) {
      setTimeout(() => {
        trackEvent('device_detection', {
          device_type: isMobile ? 'mobile' : 'desktop',
          viewport_width: viewportWidth
        });
      }, 100);
    }
  }, [mountLoader, isTrackingEnabled]);

  // 🚀 PERFORMANCE: "Reveal" Pattern
  // 1. Content renders IMMEDIATELY behind the loader (z-index 1)
  // 2. Loader sits on top (z-index 9999)
  // 3. Loader fades out opacity 1 -> 0, revealing ready content
  // 4. Loader unmounts
  return (
    <>
      {/* 🟢 LOADER OVERLAY - Fixed on top, fades out */}
      {mountLoader && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            opacity: showLoader ? 1 : 0,
            pointerEvents: showLoader ? 'auto' : 'none',
            transition: 'opacity 0.5s ease-out',
            background: '#000' // Ensure it's opaque black
          }}
        >
          <BrandedLoader
            fullScreen={true}
            minDisplayTime={0}
            showMessage={false}
            style={{ pointerEvents: 'inherit' }}
          />
        </div>
      )}

      {/* 🟢 CONTENT COMPONENT - Renders immediately behind loader */}
      {/* Suspense fallback will show effectively "behind" the loader if needed */}
      <div style={{ opacity: 1 }}>
        <Suspense fallback={<div style={{ width: '100vw', height: '100vh', background: '#000' }} />}>
          {isMobile ?
            <FigmaMobile onReady={() => setChildReady(true)} /> :
            <FigmaDesktop onReady={() => setChildReady(true)} />
          }
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
