import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';
import MobileNavigation from './MobileNavigation';
import MobileDrawer from './MobileDrawer';

// Lazy load the gallery component for better mobile performance
const DomeGallery = lazy(() => import('./ui/DomeGallery'));

/**
 * Mobile-only About page component with shared navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const AboutPageMobile = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // REMOVED: showMenu state - no longer needed after removing old navigation
  const contentRef = useRef(null);

  // Viewport context state for dynamic spacing (matching FigmaMobile.jsx)
  const [viewportContext, setViewportContext] = useState(0);

  // 📱 MOBILE SCROLL FIX: Ultra-passive scroll state to prevent interference (matching homepage)
  const { scrollY, isScrolled } = useOptimizedScroll(contentRef.current, {
    threshold: 20,
    throttleMs: 100, // Increased throttling to reduce interference with native scrolling
    passive: true // Ensure completely passive event handling
  });

  // Handle viewport changes for dynamic spacing (matching FigmaMobile.jsx)
  useEffect(() => {
    const handleViewportChange = () => {
      // Force re-calculation of dynamic spacing when viewport changes
      setViewportContext(prev => prev + 1);
    };

    // Listen for resize events that might indicate viewport context changes
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, []);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Determine API base URL based on environment
      const isDevelopment = window.location.hostname === 'localhost';
      const apiBaseUrl = isDevelopment ? '' : 'https://admin.b2b.click';

      console.log('🔍 Fetching About page content from API...');

      const response = await fetch(`${apiBaseUrl}/api/settings/about`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        setAboutContent(data.data.content);
        console.log('✅ About page content loaded successfully');
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('❌ Error fetching About page content:', error);
      setError(error.message);
      // Set fallback content
      setAboutContent(`Bounce2Bounce is the premier destination for exclusive events, contests, and unforgettable experiences. We connect people with the most exciting opportunities in their area.

Our platform brings together event organizers, brands, and participants to create meaningful connections and memorable moments. From VIP experiences to local gatherings, we curate the best events for our community.

Join thousands of members who trust Bounce2Bounce to discover and participate in exclusive events, win amazing prizes, and connect with like-minded individuals.`);
    } finally {
      setLoading(false);
    }
  };

  // Format content with proper paragraphs
  const formatContent = (content) => {
    if (!content) return [];

    // Split by double newlines or single newlines and filter empty strings
    const paragraphs = content.split(/\n\s*\n|\n/).filter(p => p.trim());

    return paragraphs.map((paragraph, index) => (
      <p key={index} style={{ marginBottom: index === paragraphs.length - 1 ? '0' : '20px' }}>
        {paragraph.trim()}
      </p>
    ));
  };

  // 🚀 INSTANT: Direct navigation without any delays
  const handleNavigation = (path) => {
    if (path === '/about') {
      // Already on about page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // INSTANT navigation - no loading states, no delays
    window.location.href = path;
  };

  return (
    <>
      {/* Mobile-specific CSS */}
      <style>
        {`
          .mobile-content-fade {
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* REMOVED: Mobile navigation CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Mobile nav item CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Mobile menu button CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Navigation overlay CSS - now handled by shared MobileNavigation component */

          /* Scrolling optimizations */
          .mobile-content-container {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            overscroll-behavior: contain;
          }

          /* Ensure content is scrollable */
          .mobile-content-container::-webkit-scrollbar {
            display: none; /* Hide scrollbar for cleaner look */
          }

          .mobile-content-container {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000000',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {/* Main Mobile Device Frame - 430x932 */}
        <div
          style={{
            width: '430px',
            height: '932px',
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: '0 auto',
            position: 'relative',
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            touchAction: 'pan-y',
            overscrollBehavior: 'contain'
          }}
          aria-label="Mobile about page content"
        >
          {/* REFACTORED: Using Shared Mobile Navigation Component */}
          <MobileNavigation
            currentPage="about"
            scrollY={scrollY}
            onNavigate={handleNavigation}
          />

          {/* OLD NAVIGATION COMPLETELY REMOVED - Now using shared MobileNavigation component above */}

          {/* Main Content Area - Scrollable Flex Container */}
          <div
            ref={contentRef}
            className="mobile-content-container mobile-content-fade"
            style={{
              flex: '1 1 auto', // Take remaining space in flex container
              width: '100%',
              background: '#000000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: '0px', // Remove padding to allow proper scrolling
              boxSizing: 'border-box',
              overflow: 'auto', // Enable scrolling
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
              scrollBehavior: 'smooth' // Smooth scrolling behavior
            }}
            role="main"
            aria-label="About page content"
          >
            {/* Content Wrapper */}
            <div
              style={{
                width: '100%',
                maxWidth: '430px',
                padding: '40px 24px 80px 24px', // Added bottom padding for scroll space
                boxSizing: 'border-box',
                minHeight: '100%' // Ensure content takes full height
              }}
            >
            {/* Page Title */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '32px',
                lineHeight: '1.2em',
                marginBottom: '24px',
                textAlign: 'center'
              }}
            >
              About B2B
            </div>

            {/* About Content */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '1.5em',
                marginBottom: '20px',
                textAlign: 'left'
              }}
            >
              {loading ? (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100px',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  Loading content...
                </div>
              ) : (
                <>
                  {formatContent(aboutContent)}
                  {error && (
                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      background: 'rgba(255, 0, 0, 0.1)',
                      border: '1px solid rgba(255, 0, 0, 0.3)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.7)'
                    }}>
                      Note: Using fallback content due to connection issue.
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Gallery Section - Dome Gallery */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '1.3em',
                marginBottom: '20px',
                marginTop: '24px',
                textAlign: 'center'
              }}
            >
              Gallery
            </div>
            </div>

            {/* Gallery Container - Full Width */}
            <div style={{
              marginBottom: '24px',
              height: '60vh',
              minHeight: '350px',
              maxHeight: '500px',
              width: '100%',
              position: 'relative'
            }}>
              <Suspense fallback={
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  opacity: 0.7,
                  background: 'rgba(22, 22, 22, 0.8)',
                  borderRadius: '16px',
                  border: '1px solid rgba(56, 56, 56, 0.3)'
                }}>
                  Loading gallery...
                </div>
              }>
                <DomeGallery
                  images={[
                    {
                      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23319DFF;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%230AFF4B;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23161616'/%3E%3Ccircle cx='200' cy='150' r='80' fill='url(%23g1)' opacity='0.8'/%3E%3Ctext x='200' y='240' text-anchor='middle' fill='white' font-family='Inter' font-size='24' font-weight='600'%3EEvents%3C/text%3E%3C/svg%3E",
                      alt: "Event Highlights"
                    },
                    {
                      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FF6B6B;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FFE66D;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23161616'/%3E%3Cpolygon points='200,70 250,170 150,170' fill='url(%23g2)' opacity='0.8'/%3E%3Ctext x='200' y='240' text-anchor='middle' fill='white' font-family='Inter' font-size='20' font-weight='600'%3EPerformances%3C/text%3E%3C/svg%3E",
                      alt: "Live Performances"
                    },
                    {
                      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23A8E6CF;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2388D8C0;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23161616'/%3E%3Crect x='120' y='80' width='160' height='120' rx='20' fill='url(%23g3)' opacity='0.8'/%3E%3Ctext x='200' y='240' text-anchor='middle' fill='white' font-family='Inter' font-size='22' font-weight='600'%3EVenue%3C/text%3E%3C/svg%3E",
                      alt: "Venue Atmosphere"
                    },
                    {
                      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23FFB74D;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23FF8A65;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23161616'/%3E%3Cpath d='M150,80 Q200,50 250,80 Q250,150 200,180 Q150,150 150,80 Z' fill='url(%23g4)' opacity='0.8'/%3E%3Ctext x='200' y='240' text-anchor='middle' fill='white' font-family='Inter' font-size='18' font-weight='600'%3EBehind Scenes%3C/text%3E%3C/svg%3E",
                      alt: "Behind the Scenes"
                    },
                    {
                      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23CE93D8;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23F8BBD9;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23161616'/%3E%3Ccircle cx='170' cy='120' r='30' fill='url(%23g5)' opacity='0.8'/%3E%3Ccircle cx='230' cy='120' r='30' fill='url(%23g5)' opacity='0.8'/%3E%3Ccircle cx='200' cy='170' r='30' fill='url(%23g5)' opacity='0.8'/%3E%3Ctext x='200' y='240' text-anchor='middle' fill='white' font-family='Inter' font-size='20' font-weight='600'%3ECommunity%3C/text%3E%3C/svg%3E",
                      alt: "Community"
                    },
                    {
                      src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2381C784;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%234FC3F7;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23161616'/%3E%3Cpolygon points='200,60 280,140 200,220 120,140' fill='url(%23g6)' opacity='0.8'/%3E%3Ctext x='200' y='260' text-anchor='middle' fill='white' font-family='Inter' font-size='20' font-weight='600'%3EProduction%3C/text%3E%3C/svg%3E",
                      alt: "Production"
                    }
                  ]}
                  segments={34}
                  fit={0.7}
                  fitBasis="width"
                  minRadius={200}
                  maxRadius={400}
                  overlayBlurColor="rgba(22, 22, 22, 0.8)"
                  imageBorderRadius="12px"
                  openedImageBorderRadius="12px"
                  openedImageWidth="300px"
                  openedImageHeight="400px"
                  grayscale={false}
                />
              </Suspense>
            </div>

            {/* Content Wrapper Continued */}
            <div
              style={{
                width: '100%',
                maxWidth: '430px',
                padding: '0 24px 80px 24px',
                boxSizing: 'border-box',
                margin: '0 auto'
              }}
            >

            {/* Call to Action */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '1.3em',
                  marginBottom: '12px'
                }}
              >
                Ready to Get Started?
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  lineHeight: '1.4em',
                  marginBottom: '20px'
                }}
              >
                Join our community and never miss an exclusive opportunity again.
              </div>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  background: '#00FF40',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Get Started
              </button>
            </div>
            </div>
          </div>
        </div>

        {/* OLD NAVIGATION OVERLAY COMPLETELY REMOVED - Now using shared MobileNavigation component above */}

        <MobileDrawer
          contentRef={contentRef}
          viewportContext={viewportContext}
          onStateChange={(drawerState) => {
            console.log('About page drawer state changed:', drawerState);
          }}
        />

      </div>
    </>
  );
};

export default AboutPageMobile;
