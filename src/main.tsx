// FIXED: Direct React app initialization to prevent TypeScript/JavaScript mixing issues
// This eliminates the problematic import chain that was causing initialization order problems

import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './react/components/HomePage';
import AdminLogin from './react/components/AdminLoginFigma';
import { initializeFrontendSecurity } from './react/utils/security';
import { SEOProvider, MaintenanceMode, SEODebug } from './react/contexts/SEOContext';

// Initialize consolidated analytics system FIRST
import { initializeAnalytics } from './lib/analytics/beacon';
import { initializeCleanup } from './utils/cleanup';
import { initializeMobileOptimizations } from './utils/mobileOptimization';

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

// Lazy load About and Contact pages for better performance
const AboutPage = lazy(() => import('./react/components/AboutPage'));
const ContactPage = lazy(() => import('./react/components/ContactPage'));

// Import any additional CSS if needed
import './react/styles.css';

// Loading component for lazy-loaded pages
const PageLoader = () => (
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
      fontSize: '18px',
    }}
  >
    Loading...
  </div>
);

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
      case '/about':
        return (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        );
      case '/contact':
        return (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        );
      case '/admin/login':
        return <AdminLogin />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <SEOProvider>
      <MaintenanceMode />
      {renderCurrentPage()}
      <SEODebug />
    </SEOProvider>
  );
};

// Only render the main app if the root element exists (homepage)
const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(React.createElement(App));
  } catch (error) {
    console.error('React mounting error:', error);
  }
}

// Initialize frontend security measures
initializeFrontendSecurity();

// Export for global access if needed
window.React = React;
window.ReactApp = App;