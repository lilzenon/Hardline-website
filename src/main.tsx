// FIXED: Direct React app initialization to prevent TypeScript/JavaScript mixing issues
// This eliminates the problematic import chain that was causing initialization order problems

import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './react/components/HomePage';
import AdminLogin from './react/components/AdminLoginFigma';
import { initializeFrontendSecurity } from './react/utils/security';

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

  // Track page views on route changes
  useEffect(() => {
    if (window.getAnalyticsTracker) {
      const tracker = window.getAnalyticsTracker();
      if (tracker) {
        tracker.trackPageView({
          page: currentPath,
          title: document.title,
          referrer: document.referrer,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined
        });
      }
    }
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

  return renderCurrentPage();
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

// Initialize consolidated analytics system
import { initializeAnalytics } from './lib/analytics/beacon';

// Initialize analytics with proper configuration
initializeAnalytics({
  trackingId: 'kutt-homepage',
  enableGDPR: true,
  enableRealTime: true,
  sessionTimeout: 30,
  debug: import.meta.env.DEV
});

// Export for global access if needed
window.React = React;
window.ReactApp = App;