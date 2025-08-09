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

// Export for global access if needed
window.React = React;
window.ReactApp = App;