import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';

// Lazy load About and Contact pages for better performance
const AboutPage = lazy(() =>
    import ('./components/AboutPage'));
const ContactPage = lazy(() =>
    import ('./components/ContactPage'));

// Import any additional CSS if needed
import './styles.css';

// Loading component for lazy-loaded pages
const PageLoader = () => ( <
    div style = {
        {
            width: '100vw',
            height: '100vh',
            background: '#000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFF',
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px'
        }
    } >
    Loading... <
    /div>
);

const App = () => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

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
            return ( <
                Suspense fallback = { < PageLoader / > } >
                <
                AboutPage / >
                <
                /Suspense>
            );
        } else if (currentPath === '/contact') {
            return ( <
                Suspense fallback = { < PageLoader / > } >
                <
                ContactPage / >
                <
                /Suspense>
            );
        } else {
            return <HomePage / > ;
        }
    };

    return ( <
        div className = { `app-container ${isTransitioning ? 'transitioning' : ''}` }
        style = {
            {
                '--transition-duration': '300ms'
            }
        } > { renderPage() } <
        /div>
    );
};

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Make AdminLogin available globally for admin login page
window.AdminLogin = AdminLogin;
window.React = React;
window.ReactDOM = {
    createRoot: createRoot,
    render: (element, container) => {
        // Legacy render method for compatibility
        const root = createRoot(container);
        root.render(element);
        return root;
    }
};

// Render the app
root.render( < App / > );