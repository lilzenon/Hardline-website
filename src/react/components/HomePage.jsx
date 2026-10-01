import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useViewportDimensions } from '../hooks/usePerformantResize';
import { useAnalytics } from '../hooks/useAnalytics';
import { useSEO } from '../hooks/useSEO';
import useMobileLifecycle from '../hooks/useMobileLifecycle';
import { isMobileDevice } from '../../utils/mobileOptimization';
import BrandedLoader from './BrandedLoader';
import { importWithRetry } from '../utils/iab';

import { DEFAULT_SEO_SETTINGS } from '../services/seoService';

// 🚀 PERFORMANCE: Optimized lazy loading with immediate desktop, lazy mobile
//
// These are the SECOND chunk tier (main.tsx → HomePage → here). They were the
// only lazy imports in the app not bounded by importWithRetry, so a stalled
// FigmaMobile request pinned Suspense — and therefore the branded loader,
// which waits on this child's onReady — with no timeout anywhere in the chain.
// 8s rather than the 12s default: both chunks gate first paint, so failing
// through to the ErrorBoundary beats a longer black screen.
const CHUNK_TIMEOUT_MS = 8000;
const FigmaDesktop = lazy(() => importWithRetry(() => import('./FigmaDesktop'), CHUNK_TIMEOUT_MS));
const FigmaMobile = lazy(() => importWithRetry(() => import('./FigmaMobile'), CHUNK_TIMEOUT_MS));

// Single source of truth for the mobile/desktop split, shared by the lazy
// initializer and both effects below. 768 is the breakpoint used by
// useViewportDimensions and by the build-time chunk-preload script in
// vite-plugins/preload-optimization.ts — keep them in sync or the preloaded
// Figma chunk will not be the one that renders.
const MOBILE_BREAKPOINT = 768;
const detectIsMobile = () => {
  try {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1200;
    return isMobileDevice() || width <= MOBILE_BREAKPOINT;
  } catch (_) {
    return false;
  }
};

/**
 * Homepage component with optimized performance and fast loading
 * Provides immediate desktop rendering and optimized mobile loading
 */
const HomePage = () => {
  // Lazy initializer, NOT useState(false): with a constant `false` the first
  // commit rendered <FigmaDesktop/> on every device, which fired the desktop
  // lazy import — so phones downloaded (and parsed) the desktop chunk before
  // the FigmaMobile chunk they actually display. Deciding at first render means
  // the only chunk requested is the one that will be shown.
  const [isMobile, setIsMobile] = useState(detectIsMobile);
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

      // Determine initial device type (same check as the lazy initializer, so
      // this is a no-op re-set on the first run and React bails out).
      const initialIsMobile = detectIsMobile();

      if (isMounted) setIsMobile(initialIsMobile);

      // Mobile optimisations (viewport meta, --vh, memory monitor) are
      // initialised once from src/main.tsx for every route; calling the util
      // here as well double-registered its resize listeners and 30 s interval.
      if (initialIsMobile) {
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
      // Bounded like the lazy() above, so a never-settling chunk request can't
      // leave minTimeElapsed false forever. The ESM module registry dedupes the
      // underlying request with the Suspense import — this only races a timeout
      // against it. Rejections stay swallowed: this task exists to gate the
      // loader, and the lazy() above is what surfaces a real failure.
      if (initialIsMobile) {
        tasks.push(importWithRetry(() => import('./FigmaMobile'), CHUNK_TIMEOUT_MS)
          .catch(err => console.error('Failed to preload mobile:', err)));
      } else {
        tasks.push(importWithRetry(() => import('./FigmaDesktop'), CHUNK_TIMEOUT_MS)
          .catch(() => { }));
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
    // Only update isMobile if the viewport width significantly changes after load.
    // `viewportWidth` is included in the check because useViewportDimensions
    // starts with isMobile:false until its own effect measures — without it, a
    // narrow non-touch window would flip mobile → desktop → mobile on mount.
    const deviceIsMobile = isMobileDevice() || isMobileByWidth || viewportWidth <= MOBILE_BREAKPOINT;
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
