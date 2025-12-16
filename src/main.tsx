// FIXED: Direct React app initialization to prevent TypeScript/JavaScript mixing issues
// This eliminates the problematic import chain that was causing initialization order problems

import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// 🚀 OPTIMIZED: Lazy load ALL page components for better code splitting
const HomePage = lazy(() => import('./react/components/HomePage'));
const AdminLogin = lazy(() => import('./react/components/AdminLoginFigma'));
import { initializeFrontendSecurity } from './react/utils/security';
// Maintenance page (React) for /maintenance route
const ReactMaintenancePage = lazy(() => import('./react/components/MaintenancePage'));

// 🛍️ Shop pages - customer-facing product catalog and checkout
const ShopPage = lazy(() => import('./react/components/shop/ShopPage'));
const ProductPage = lazy(() => import('./react/components/shop/ProductPage'));
const CheckoutSuccess = lazy(() => import('./react/components/shop/CheckoutSuccess'));

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
const AboutPage = lazy(() => import('./react/components/AboutPage'));
const FAQPage = lazy(() => import('./react/components/FAQPage'));
const NotFoundPage = lazy(() => import('./react/components/NotFoundPage'));

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
  try {
    // 🔧 CRITICAL FIX: Hide server-side rendered content when React loads
    // This prevents hydration mismatch while preserving SEO content for bots
    const ssrContent = document.getElementById('ssr-content');
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
  } catch (error) {
    console.error('React mounting error:', error);
  }
}

// Initialize frontend security measures (wrapped in try-catch to prevent white page on failure)
try {
  initializeFrontendSecurity();
} catch (error) {
  console.error('⚠️ Security initialization failed (non-fatal):', error);
  // Continue without security features rather than crashing the page
}