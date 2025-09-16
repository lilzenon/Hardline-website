import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLoginFigma';
import { initializeFrontendSecurity } from './utils/security';
import { SEOProvider, SEODebug, useSEO } from './contexts/SEOContext';

// Lazy load About, Contact, and Maintenance pages for better performance
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const MaintenancePage = lazy(() => import('./components/MaintenancePage'));

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
    } else if (currentPath === '/contact') {
      return (
        <Suspense fallback={<PageLoader />}>
          <ContactPage />
        </Suspense>
      );
    } else if (currentPath === '/maintenance') {
      return (
        <Suspense fallback={<PageLoader />}>
          <MaintenancePage />
        </Suspense>
      );
    } else {
      return <HomePage />;
    }
  };

  return (
    <SEOProvider>
      <MaintenanceRedirect />
      <div className="app-container">
        {renderPage()}
      </div>
      <SEODebug />
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

// Analytics now handled by consolidated TypeScript beacon in main.tsx
// No need for separate script loading

