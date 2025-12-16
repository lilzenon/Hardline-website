import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLoginFigma';
import { initializeFrontendSecurity } from './utils/security';
import { SEOProvider, SEODebug, useSEO } from './contexts/SEOContext';
import { CartProvider } from './contexts/CartContext';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load About, FAQ, and Maintenance pages for better performance
const AboutPage = lazy(() => import('./components/AboutPage'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const MaintenancePage = lazy(() => import('./components/MaintenancePage'));

// 🛍️ Lazy load Shop pages for code splitting
const ShopPage = lazy(() => import('./components/shop/ShopPage'));
const ProductPage = lazy(() => import('./components/shop/ProductPage'));
const CheckoutSuccess = lazy(() => import('./components/shop/CheckoutSuccess'));

// Import any additional CSS if needed
import './styles.css';

// Import the new branded loader
import BrandedLoader from './components/BrandedLoader';

// 🚀 PERFORMANCE: Branded loading component for page transitions
const PageLoader = () => (
  <BrandedLoader
    message="Loading page"
    fullScreen={false}
    minDisplayTime={300}
  />
);

// Enforce hard redirect to dedicated maintenance page when active
const MaintenanceRedirect = () => {
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
  console.log('⚛️ REACT APP COMPONENT RENDERING');
  const currentPath = window.location.pathname;
  console.log('📍 CURRENT PATH:', currentPath);

  // 🚀 INSTANT: No client-side routing, just render based on current server path
  // This ensures instant navigation without any loading states or transitions

  const renderPage = () => {
    if (currentPath === '/about') {
      return (
        <Suspense fallback={<PageLoader />}>
          <AboutPage />
        </Suspense>
      );
    } else if (currentPath === '/faq' || currentPath === '/contact') {
      return (
        <Suspense fallback={<PageLoader />}>
          <FAQPage />
        </Suspense>
      );
    } else if (currentPath === '/maintenance') {
      return (
        <Suspense fallback={<PageLoader />}>
          <MaintenancePage />
        </Suspense>
      );
    } else if (currentPath === '/shop') {
      // 🛍️ Shop page - customer-facing product catalog
      return (
        <Suspense fallback={<PageLoader />}>
          <ShopPage />
        </Suspense>
      );
    } else if (currentPath === '/shop/success') {
      // 🛍️ Checkout success page - order confirmation
      return (
        <Suspense fallback={<PageLoader />}>
          <CheckoutSuccess />
        </Suspense>
      );
    } else if (currentPath === '/shop/checkout' || currentPath === '/shop/cart') {
      // 🛍️ Checkout/Cart page - redirect to shop with cart open
      // The cart modal handles checkout, so we just show the shop page
      return (
        <Suspense fallback={<PageLoader />}>
          <ShopPage openCart={true} />
        </Suspense>
      );
    } else if (currentPath.startsWith('/shop/')) {
      // 🛍️ Product detail page - /shop/:productId
      const productId = currentPath.replace('/shop/', '');
      return (
        <Suspense fallback={<PageLoader />}>
          <ProductPage productId={productId} />
        </Suspense>
      );
    } else {
      return <HomePage />;
    }
  };

  return (
    <SEOProvider>
      <CartProvider>
        <MaintenanceRedirect />
        <div className="app-container">
          {renderPage()}
        </div>
        <SEODebug />
      </CartProvider>
    </SEOProvider>
  );
};

// Make AdminLogin available globally for admin login page FIRST
window.AdminLogin = AdminLogin;
window.React = React;
window.ReactDOM = {
  createRoot: createRoot,
  render: (element, container) => {
    // Legacy render method for compatibility
    const root = createRoot(container);
    root.render(element);
    return root;
  },
};

// Only render the main app if the root element exists (homepage)
console.log('🔍 LOOKING FOR ROOT ELEMENT...');
const container = document.getElementById('root');
console.log('📦 ROOT CONTAINER:', container);

if (container) {
  console.log('✅ ROOT FOUND - MOUNTING REACT APP');
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
    console.log('🚀 REACT APP MOUNTED SUCCESSFULLY');
  } catch (error) {
    console.error('❌ REACT MOUNTING ERROR:', error);
  }
} else {
  console.log('No root element found - likely on admin login page, globals exported successfully');
}

// Initialize frontend security measures (wrapped in try-catch to prevent white page on failure)
try {
  initializeFrontendSecurity();
} catch (error) {
  console.error('⚠️ Security initialization failed (non-fatal):', error);
  // Continue without security features rather than crashing the page
}

// Analytics now handled by consolidated TypeScript beacon in main.tsx
// No need for separate script loading

