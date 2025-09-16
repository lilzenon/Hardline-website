import React, { useState, useEffect, useRef } from 'react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';
import MobileNavigation from './MobileNavigation';
import MasonryGallery from './ui/MasonryGallery';

/**
 * Mobile-only About page component with shared navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const AboutPageMobile = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
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
    fetchGalleryImages();
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
        // Don't include credentials for public endpoint
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

  const fetchGalleryImages = async () => {
    try {
      // Determine API base URL based on environment
      const isDevelopment = window.location.hostname === 'localhost';
      const apiBaseUrl = isDevelopment
        ? 'http://localhost:3002'
        : 'https://admin.b2b.click';

      const response = await fetch(`${apiBaseUrl}/api/settings/about/gallery/public`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Don't include credentials for public endpoint
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setGalleryImages(data.data);
        } else {
          console.warn('Invalid gallery response format:', data);
          setGalleryImages([]);
        }
      } else {
        console.warn('Failed to fetch gallery images:', response.status);
        setGalleryImages([]);
      }

    } catch (error) {
      console.error('❌ Error fetching gallery images:', error);
      setGalleryImages([]);
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
                padding: '40px 24px 0px 24px', // Removed bottom padding
                boxSizing: 'border-box'
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
              About
            </div>

            {/* About Content */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '1.5em',
                marginBottom: '0px',
                textAlign: 'left'
              }}
            >
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
            </div>

            </div>

            {/* Gallery Section - Mobile Masonry */}
            <div
              style={{
                marginTop: '0px',
                marginBottom: '24px',
                padding: '0 16px'
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontWeight: '600',
                  fontSize: '24px',
                  lineHeight: '1.3em',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}
              >
                Gallery
              </div>

              <MasonryGallery
                images={galleryImages}
                columns={{ desktop: 3, tablet: 2, mobile: 2 }}
                gap={12}
                onImageClick={(image) => {
                  console.log('Mobile image clicked:', image);
                }}
              />
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


            </div>
          </div>
        </div>

        {/* OLD NAVIGATION OVERLAY COMPLETELY REMOVED - Now using shared MobileNavigation component above */}

      </div>
    </>
  );
};

export default AboutPageMobile;
