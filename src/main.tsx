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
  console.log('⚛️ REACT APP COMPONENT RENDERING');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  console.log('📍 CURRENT PATH:', currentPath);

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
    console.log(`🔄 NAVIGATING TO: ${path}`);
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
console.log('🔍 LOOKING FOR ROOT ELEMENT...');
const container = document.getElementById('root');
console.log('📦 ROOT CONTAINER:', container);

if (container) {
  console.log('✅ ROOT FOUND - MOUNTING REACT APP');
  try {
    const root = createRoot(container);
    root.render(React.createElement(App));
    console.log('🚀 REACT APP MOUNTED SUCCESSFULLY');
  } catch (error) {
    console.error('❌ REACT MOUNTING ERROR:', error);
  }
} else {
  console.log('No root element found - likely on admin login page, globals exported successfully');
}

// Initialize frontend security measures
initializeFrontendSecurity();

// Initialize analytics tracking for homepage
const loadAnalyticsScript = () => {
  console.log('📊 Starting analytics script loading...');

  // Check if scripts are already loaded to prevent duplicates
  const existingAnalyticsScript = document.querySelector('script[src="/js/analytics-tracker.js"]');
  const existingGDPRScript = document.querySelector('script[src="/js/gdpr-consent.js"]');

  console.log('📊 Script check:', {
    analyticsExists: !!existingAnalyticsScript,
    gdprExists: !!existingGDPRScript
  });

  if (existingAnalyticsScript && existingGDPRScript) {
    console.log('📊 Analytics scripts already loaded, skipping...');
    return;
  }

  if (!existingAnalyticsScript) {
    console.log('📊 Loading analytics tracker script...');
    const script1 = document.createElement('script');
    script1.src = '/js/analytics-tracker.js';
    script1.async = true;
    script1.onload = () => console.log('✅ Analytics tracker script loaded successfully');
    script1.onerror = (error) => console.error('❌ Failed to load analytics tracker script:', error);
    document.head.appendChild(script1);
  }

  if (!existingGDPRScript) {
    console.log('📊 Loading GDPR consent script...');
    const script2 = document.createElement('script');
    script2.src = '/js/gdpr-consent.js';
    script2.async = true;
    script2.onload = () => console.log('✅ GDPR consent script loaded successfully');
    script2.onerror = (error) => console.error('❌ Failed to load GDPR consent script:', error);
    document.head.appendChild(script2);
  }

  const initializeAnalyticsWhenReady = () => {
    // Initialize analytics after script loads
    if (window.initializeAnalytics) {
      // Determine API endpoint based on environment and domain
      const hostname = window.location.hostname;
      const isDevelopment = hostname === 'localhost';

      let apiEndpoint;
      if (isDevelopment) {
        // Local development - send to dashboard dev server
        apiEndpoint = 'http://localhost:3000/api';
      } else if (hostname === 'b2b.click' || hostname === 'www.b2b.click') {
        // Current temporary setup - b2b.click homepage sends to admin.b2b.click
        apiEndpoint = 'https://admin.b2b.click/api';
      } else if (hostname === 'bounce2bounce.com' || hostname === 'www.bounce2bounce.com') {
        // Future production setup - bounce2bounce.com sends to admin.b2b.click
        apiEndpoint = 'https://admin.b2b.click/api';
      } else {
        // Fallback to same domain
        apiEndpoint = '/api';
      }

      console.log('📊 Analytics Configuration:', {
        hostname: hostname,
        apiEndpoint: apiEndpoint,
        isDevelopment: isDevelopment
      });

      window.initializeAnalytics({
        apiEndpoint: apiEndpoint,
        trackingId: 'kutt-homepage',
        enableGDPR: true,
        enableRealTime: true,
        sessionTimeout: 30
      });
    } else {
      console.log('📊 Analytics tracker not ready yet, will retry...');
      // Retry after a short delay
      setTimeout(initializeAnalyticsWhenReady, 100);
    }
  };

  // Set up script loading handlers
  if (!existingAnalyticsScript) {
    const script1 = document.querySelector('script[src="/js/analytics-tracker.js"]');
    if (script1) {
      script1.onload = initializeAnalyticsWhenReady;
      script1.onerror = () => {
        console.error('❌ Failed to load analytics tracker script');
      };
    }
  } else {
    // Script already exists, try to initialize immediately
    initializeAnalyticsWhenReady();
  }
};

// Load analytics scripts
console.log('🚀 MAIN.TSX: About to call loadAnalyticsScript()');
loadAnalyticsScript();
console.log('🚀 MAIN.TSX: loadAnalyticsScript() called');

// Export for global access if needed
window.React = React;
window.ReactApp = App;