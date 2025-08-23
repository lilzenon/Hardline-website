import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLoginFigma';
import { initializeFrontendSecurity } from './utils/security';

// Lazy load About and Contact pages for better performance
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

// Import any additional CSS if needed
import './styles.css';

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

  // Modern page transition handler
  const handlePageTransition = useCallback((newPath) => {
    // Check if View Transitions API is supported (Chrome 111+)
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        setCurrentPath(newPath);
        window.history.pushState({}, '', newPath);
      });
    } else {
      // Fallback: CSS transition
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPath(newPath);
        window.history.pushState({}, '', newPath);
        setTimeout(() => setIsTransitioning(false), 50);
      }, 150);
    }
  }, []);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      handlePageTransition(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [handlePageTransition]);

  // Expose navigation function globally for components
  useEffect(() => {
    window.navigateWithTransition = handlePageTransition;
  }, [handlePageTransition]);

  const renderPage = () => {
    if (currentPath === '/about') {
      return (
        <Suspense fallback={<PageLoader />}
        >
          <AboutPage />
        </Suspense>
      );
    } else if (currentPath === '/contact') {
      return (
        <Suspense fallback={<PageLoader />}
        >
          <ContactPage />
        </Suspense>
      );
    } else {
      return <HomePage />;
    }
  };

  return (
    <div
      className={`app-container ${isTransitioning ? 'transitioning' : ''}`}
      style={{ '--transition-duration': '300ms' }}
    >
      {renderPage()}
    </div>
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
  const script1 = document.createElement('script');
  script1.src = '/static/js/analytics-tracker.js';
  script1.async = true;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = '/static/js/gdpr-consent.js';
  script2.async = true;
  document.head.appendChild(script2);

  script1.onload = () => {
    // Initialize analytics after script loads
    if (window.initializeAnalytics) {
      // Determine API endpoint based on environment and domain
      const hostname = window.location.hostname;
      const isDevelopment = hostname === 'localhost';

      let apiEndpoint;
      if (isDevelopment) {
        // Local development - send to dashboard dev server
        apiEndpoint = 'http://localhost:3002/api';
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

      // Analytics configuration set for production

      window.initializeAnalytics({
        apiEndpoint: apiEndpoint,
        trackingId: 'kutt-homepage',
        enableGDPR: true,
        enableRealTime: true,
        sessionTimeout: 30
      });
    }
  };

  script1.onerror = () => {
    console.error('❌ Failed to load analytics tracker script');
  };
};

// Load analytics scripts
loadAnalyticsScript();

