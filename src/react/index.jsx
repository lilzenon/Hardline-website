import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLoginFigma';
import { initializeFrontendSecurity } from './utils/security';
import { SEOProvider, MaintenanceMode, SEODebug } from './contexts/SEOContext';

// Lazy load About and Contact pages for better performance
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

// Import any additional CSS if needed
import './styles.css';

// 🚀 PERFORMANCE: Minimal loading component for fast page transitions
const PageLoader = () => (
  <div
    style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#FFFFFF',
      padding: '8px 16px',
      borderRadius: '20px',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      zIndex: 9999,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      opacity: 0.9
    }}
  >
    Loading...
  </div>
);

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
    } else {
      return <HomePage />;
    }
  };

  return (
    <SEOProvider>
      <MaintenanceMode />
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

