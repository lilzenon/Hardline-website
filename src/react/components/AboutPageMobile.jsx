import React, { useState, useEffect, useRef } from 'react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';
import SocialMediaButtons from './SocialMediaButtons';
import Masonry from './ui/Masonry';

/**
 * Mobile-only About page component with shared navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const AboutPageMobile = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const contentRef = useRef(null);

  // Optimized scroll state for dynamic navigation
  const { scrollY, isScrolled } = useOptimizedScroll(contentRef.current, {
    threshold: 20,
    throttleMs: 16 // 60fps for smooth navigation
  }) || { scrollY: 0, isScrolled: false };

  // Alternative scroll detection using useEffect if hook doesn't work
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        setScrolled(scrollTop > 20);
      }
    };

    const scrollContainer = contentRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Use either hook result or fallback scroll detection
  const finalIsScrolled = isScrolled || scrolled;

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

  // Toggle mobile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    if (window.navigateWithTransition) {
      window.navigateWithTransition(path);
    } else {
      window.location.href = path;
    }
    setShowMenu(false);
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

          /* Optimize touch interactions for iOS */
          .mobile-menu-button, button, input {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Enable hardware acceleration */
          .mobile-nav-overlay {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          .mobile-nav-item:hover {
            opacity: 0.8;
            transform: translateX(10px) !important;
            transition: all 0.15s ease-out;
          }

          .mobile-nav-item {
            transition: all 0.15s ease-out;
          }

          .mobile-menu-button:hover {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.1);
            transition: all 0.2s ease;
          }

          .mobile-menu-button {
            transition: transform 0.2s ease;
          }

          /* Navigation overlay animations */
          .mobile-nav-overlay {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .mobile-nav-overlay.entering {
            opacity: 0;
            visibility: hidden;
            backdrop-filter: blur(0px);
          }

          .mobile-nav-overlay.entered {
            opacity: 1;
            visibility: visible;
            backdrop-filter: blur(10px);
          }

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
          {/* Navigation Bar - Fixed Header in Flexbox Layout */}
          <header
            role="banner"
            style={{
              position: 'sticky', // Changed to sticky for better mobile behavior
              top: '0px',
              width: 'calc(100% - 40px)', // Reduced width by additional 20px (total 40px reduction)
              height: finalIsScrolled ? '70px' : '97px',
              background: finalIsScrolled ? 'rgba(0, 0, 0, 0.95)' : '#000000',
              backdropFilter: finalIsScrolled ? 'blur(10px)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 15px', // Reduced padding from 20px to 15px
              margin: '0 20px', // Increased margin to center the further reduced nav bar
              boxSizing: 'border-box',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 200,
              borderBottom: finalIsScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              flexShrink: 0 // Prevent header from shrinking
            }}
            aria-label="Main navigation"
          >
            {/* Menu Button - Right Side */}
            <div
              onClick={toggleMenu}
              className="mobile-menu-button"
              style={{
                position: 'absolute',
                right: '15px', // Adjusted to match reduced nav bar padding
                top: '50%',
                transform: 'translateY(-50%)',
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {/* Animated Menu Lines */}
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: showMenu ? 'rotate(45deg) translateY(6px)' : 'rotate(0deg) translateY(0px)',
                  transformOrigin: 'center'
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: showMenu ? 0 : 1,
                  transform: showMenu ? 'scale(0)' : 'scale(1)'
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: showMenu ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)',
                  transformOrigin: 'center'
                }}
              />
            </div>

            {/* B2B Logo - Dynamic Scroll-Responsive */}
            <img
              onClick={() => handleNavigation('/')}
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              style={{
                width: finalIsScrolled ? '110px' : '138.41px', // Shrink when scrolled
                height: finalIsScrolled ? '34px' : '43px', // Proportional height
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition
                userSelect: 'none'
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
            />
          </header>

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

            {/* Gallery Section - Masonry Layout */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '1.3em',
                marginBottom: '20px',
                marginTop: '24px'
              }}
            >
              Gallery
            </div>

            <div style={{ marginBottom: '24px' }}>
              <Masonry
                items={[
                  {
                    id: "1",
                    img: "https://picsum.photos/id/1015/600/900",
                    url: "https://example.com/one",
                    height: 400,
                  },
                  {
                    id: "2",
                    img: "https://picsum.photos/id/1011/600/750",
                    url: "https://example.com/two",
                    height: 250,
                  },
                  {
                    id: "3",
                    img: "https://picsum.photos/id/1020/600/800",
                    url: "https://example.com/three",
                    height: 300,
                  },
                  {
                    id: "4",
                    img: "https://picsum.photos/id/1025/600/700",
                    url: "https://example.com/four",
                    height: 350,
                  },
                  {
                    id: "5",
                    img: "https://picsum.photos/id/1035/600/650",
                    url: "https://example.com/five",
                    height: 280,
                  },
                  {
                    id: "6",
                    img: "https://picsum.photos/id/1040/600/850",
                    url: "https://example.com/six",
                    height: 420,
                  }
                ]}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
              />
            </div>

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
                onClick={() => handleNavigation('/')}
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

        {/* Mobile Navigation Overlay - Always rendered to prevent DOM manipulation issues */}
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: showMenu ? 1000 : -1,
            display: 'flex',
            flexDirection: 'column',
            opacity: showMenu ? 1 : 0,
            visibility: showMenu ? 'visible' : 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: showMenu ? 'blur(10px)' : 'blur(0px)',
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            willChange: 'opacity, visibility, backdrop-filter',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            pointerEvents: showMenu ? 'auto' : 'none'
          }}
          onClick={() => setShowMenu(false)}
        >
          {/* Navigation Bar in Menu */}
          <div
            style={{
              width: '100%',
              height: '97px',
              maxWidth: '100vw',
              margin: '0 auto',
              position: 'relative',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              boxSizing: 'border-box'
            }}
          >
            {/* Close Button (X) */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
              }}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {/* X Icon */}
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'rotate(45deg) translateY(6px)',
                  transformOrigin: 'center'
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: 0,
                  transform: 'scale(0)'
                }}
              />
              <div
                style={{
                  width: '24px',
                  height: '2px',
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'rotate(-45deg) translateY(-6px)',
                  transformOrigin: 'center'
                }}
              />
            </div>

            {/* Logo in Menu */}
            <img
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              style={{
                width: '138.41px',
                height: '43px',
                cursor: 'pointer',
                userSelect: 'none'
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation('/');
              }}
            />
          </div>



          {/* Navigation Menu Items */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '430px',
              margin: '0 auto',
              padding: '8px 25px 40px 25px',
              gap: '24px',
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.2s' : '0s',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => handleNavigation('/')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                opacity: 1,
                transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(-30px, 0, 0)',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
                transitionDelay: showMenu ? '0.3s' : '0s',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              Events
            </div>
            <div
              onClick={() => handleNavigation('/about')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                opacity: 0.6, // Dimmed for current page
                transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(-30px, 0, 0)',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
                transitionDelay: showMenu ? '0.4s' : '0s',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              About
            </div>
            <div
              onClick={() => handleNavigation('/contact')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                opacity: 1,
                transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(-30px, 0, 0)',
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
                transitionDelay: showMenu ? '0.5s' : '0s',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              Contact
            </div>

            {/* Social Media Buttons in Navigation - MOVED BELOW navigation links */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 25px 0px 25px', // Added top padding for spacing after navigation
                transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20px, 0)',
                opacity: showMenu ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: showMenu ? '0.6s' : '0s', // Delayed to appear after Contact link
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <SocialMediaButtons />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AboutPageMobile;
