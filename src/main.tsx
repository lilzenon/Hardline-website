// FIXED: Direct React app initialization to prevent TypeScript/JavaScript mixing issues
// This eliminates the problematic import chain that was causing initialization order problems

import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { importWithRetry, reloadOnceForChunkError } from './react/utils/iab';

// 🔧 IAB FIX: Post-deploy stale HTML references dead hashed chunks (edge cache
// holds HTML up to s-maxage). When a chunk preload 404s, do ONE reload with a
// cache-busting query param (bypasses the stale edge slot); if that already
// happened, let the error propagate to the ErrorBoundary instead of looping.
window.addEventListener('vite:preloadError', (event: Event) => {
  if (reloadOnceForChunkError()) {
    event.preventDefault();
  }
});

// 🚀 OPTIMIZED: Lazy load ALL page components for better code splitting.
// importWithRetry bounds every chunk request (stalled IAB networks never
// settle) and retries once before rejecting into the ErrorBoundary.
const HomePage = lazy(() => importWithRetry(() => import('./react/components/HomePage')));
const AdminLogin = lazy(() => importWithRetry(() => import('./react/components/AdminLoginFigma')));
import { initializeFrontendSecurity } from './react/utils/security';
// Maintenance page (React) for /maintenance route
const ReactMaintenancePage = lazy(() => importWithRetry(() => import('./react/components/MaintenancePage')));

// 🛍️ Shop pages - customer-facing product catalog and checkout
const ShopPage = lazy(() => importWithRetry(() => import('./react/components/shop/ShopPage')));
const ProductPage = lazy(() => importWithRetry(() => import('./react/components/shop/ProductPage')));
const CheckoutSuccess = lazy(() => importWithRetry(() => import('./react/components/shop/CheckoutSuccess.tsx')));

import { SEOProvider, SEODebug, useSEO } from './react/contexts/SEOContext';
import { CartProvider } from './react/contexts/CartContext';

// 🚀 OPTIMIZED: Dynamic imports for utilities to reduce main bundle size
const initializeUtilities = async () => {
  // Only load utilities when needed
  const [
    { initializeAnalytics },
    { initializeCleanup },
    { initializeMobileOptimizations }
  ] = await Promise.all([
    import('./lib/analytics/beacon'),
    import('./utils/cleanup'),
    import('./utils/mobileOptimization')
  ]);

  // Initialize cleanup utilities to remove old blob URLs
  initializeCleanup();

  // Initialize mobile optimizations for better mobile performance
  initializeMobileOptimizations();

  // Initialize analytics with proper configuration
  initializeAnalytics({
    trackingId: 'kutt-homepage',
    enableGDPR: true,
    enableRealTime: true,
    sessionTimeout: 30,
    debug: import.meta.env.DEV
  });

  // Load memory monitor only in production
  if (!import.meta.env.DEV) {
    import('./utils/memoryMonitor');
  }
};

// Initialize utilities after DOM is ready
initializeUtilities();

// Lazy load About and FAQ pages for better performance
const AboutPage = lazy(() => importWithRetry(() => import('./react/components/AboutPage')));
const FAQPage = lazy(() => importWithRetry(() => import('./react/components/FAQPage')));
const NotFoundPage = lazy(() => importWithRetry(() => import('./react/components/NotFoundPage')));

// Import Error Boundary for graceful error handling
import ErrorBoundary from './react/components/ErrorBoundary';

// Import any additional CSS if needed
import './react/styles.css';

// Import the new branded loader
import BrandedLoader from './react/components/BrandedLoader';

// Loading component for lazy-loaded pages
const PageLoader = () => (
  <BrandedLoader
    fullScreen={true}
    minDisplayTime={500}
    showMessage={false}
  />
);


// Enforce hard redirect to dedicated maintenance page when active
const MaintenanceRedirect: React.FC = () => {
  const { maintenanceStatus } = useSEO();
  useEffect(() => {
    try {
      if (maintenanceStatus?.maintenance_mode && window.location.pathname !== '/maintenance') {
        window.location.replace('/maintenance');
      }
    } catch (e) {
      // no-op
    }
  }, [maintenanceStatus]);
  return null;
};

const App = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Analytics tracking is initialized at the bottom of this file to prevent duplicates

  // Track page views on route changes using consolidated analytics
  useEffect(() => {
    // Analytics page view is automatically tracked by the beacon system
    // No need for manual tracking here as it's handled by the global initialization
    console.debug('📊 Route changed to:', currentPath);
  }, [currentPath]);

  // Enhanced navigation with smooth transitions
  const navigateWithTransition = useCallback((path) => {
    setIsTransitioning(true);

    // Small delay for smooth transition
    setTimeout(() => {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      setIsTransitioning(false);
    }, 150);
  }, []);

  // Make navigation function globally available
  useEffect(() => {
    window.navigateWithTransition = navigateWithTransition;
    return () => {
      delete window.navigateWithTransition;
    };
  }, [navigateWithTransition]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Render appropriate component based on current path
  const renderCurrentPage = () => {
    if (isTransitioning) {
      return <PageLoader />;
    }

    switch (currentPath) {
      case '/':
        return (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        );
      case '/about':
        return (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        );
      case '/faq':
      case '/contact': // temporary alias to avoid broken links
        return (
          <Suspense fallback={<PageLoader />}>
            <FAQPage />
          </Suspense>
        );
      case '/admin/login':
        return (
          <Suspense fallback={<PageLoader />}>
            <AdminLogin />
          </Suspense>
        );
      case '/maintenance':
        return (
          <Suspense fallback={<PageLoader />}>
            <ReactMaintenancePage />
          </Suspense>
        );
      case '/shop':
        // 🛍️ Shop page - customer-facing product catalog
        return (
          <Suspense fallback={<PageLoader />}>
            <ShopPage />
          </Suspense>
        );
      case '/shop/success':
        // 🛍️ Checkout success page - order confirmation
        return (
          <Suspense fallback={<PageLoader />}>
            <CheckoutSuccess />
          </Suspense>
        );
      case '/shop/cart':
      case '/shop/checkout':
        // 🛍️ Cart/checkout deep links - the cart modal handles checkout,
        // so show the shop with the cart open (was falling through to a
        // bogus ProductPage productId="cart"/"checkout").
        return (
          <Suspense fallback={<PageLoader />}>
            <ShopPage openCart={true} />
          </Suspense>
        );
      default:
        // 🛍️ Check for product detail page pattern: /shop/:productId
        const shopProductMatch = currentPath.match(/^\/shop\/([^/]+)$/);
        if (shopProductMatch && shopProductMatch[1] !== 'success') {
          const productId = shopProductMatch[1];
          return (
            <Suspense fallback={<PageLoader />}>
              <ProductPage productId={productId} />
            </Suspense>
          );
        }

        // Handle all unknown routes with modern React 404 page
        return (
          <Suspense fallback={<PageLoader />}>
            <NotFoundPage />
          </Suspense>
        );
    }
  };

  return (
    <SEOProvider>
      <CartProvider>
        <MaintenanceRedirect />
        {renderCurrentPage()}
        <SEODebug />
      </CartProvider>
    </SEOProvider>
  );
};

// Only render the main app if the root element exists (homepage)
const container = document.getElementById('root');

if (container) {
  // 🔧 CRITICAL FIX: Hide server-side rendered content when React loads
  // This prevents hydration mismatch while preserving SEO content for bots
  const ssrContent = document.getElementById('ssr-content');
  try {
    if (ssrContent) {
      console.log('🧹 Hiding server-side content...');
      ssrContent.style.display = 'none';
    }

    const root = createRoot(container);
    root.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    // 🔧 IAB FIX: signal successful mount. The server-injected 4s splash
    // failsafe and the .app-loaded #ssr-content fade CSS both key off this
    // class (it previously lived only in dead src/react/index.jsx).
    // NOTE: recovery params (hl_cr/hl_retry) are cleared inside
    // importWithRetry on a chunk's SUCCESSFUL resolution — clearing here at
    // eval time would defeat the reload-loop guard for dead chunks.
    document.body.classList.add('app-loaded');
  } catch (error) {
    console.error('React mounting error:', error);

    // 🔧 IAB FIX: if mounting throws (old WebView, createRoot failure),
    // restore the server-rendered fallback and drop the splash so the
    // Instagram/TikTok visitor sees content instead of a black screen.
    try {
      if (ssrContent) {
        ssrContent.style.display = 'block';
        ssrContent.style.opacity = '1';
      }
      const splash = document.getElementById('initial-splash');
      if (splash) splash.style.display = 'none';
    } catch (_) {
      // last resort: leave the server-side 4s failsafe to clean up
    }
  }
}

// Initialize frontend security measures (wrapped in try-catch to prevent white page on failure)
try {
  initializeFrontendSecurity();
} catch (error) {
  console.error('⚠️ Security initialization failed (non-fatal):', error);
  // Continue without security features rather than crashing the page
}