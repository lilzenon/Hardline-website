import React, { useState, useRef, useEffect } from 'react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';
import MobileNavigation from './MobileNavigation';
import MobileDrawer from './MobileDrawer';

/**
 * Mobile-only Contact page component with shared navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const ContactPageMobile = () => {
  // REMOVED: showMenu state - no longer needed with shared MobileNavigation component
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

  // 🚀 INSTANT: Direct navigation without any delays
  const handleNavigation = (path) => {
    if (path === '/contact') {
      // Already on contact page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // INSTANT navigation - no loading states, no delays
    window.location.href = path;
  };

  // Handle contact actions
  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@bounce2bounce.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+1-555-BOUNCE';
  };

  const handleSocialClick = (platform) => {
    const urls = {
      instagram: 'https://instagram.com/bounce2bounce',
      twitter: 'https://twitter.com/bounce2bounce',
      facebook: 'https://facebook.com/bounce2bounce'
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <>
      {/* Mobile-specific CSS */}
      <style>
        {`
          /* REMOVED: Mobile navigation CSS - now handled by shared MobileNavigation component */
          
          .mobile-content-fade {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .contact-card:hover {
            transform: scale(1.02);
            transition: all 0.2s ease;
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
            background: '#000000'
          }}
        >
          {/* Shared Mobile Navigation */}
          <MobileNavigation
            currentPage="contact"
            scrollY={scrollY}
            onNavigate={handleNavigation}
          />

          {/* Main Content Area - Contact Page */}
          <div
            className="mobile-content-fade"
            style={{
              position: 'absolute',
              left: '0px',
              top: '97px',
              width: '430px',
              height: '835px', // 932 - 97 = 835px
              background: '#000000',
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 24px',
              boxSizing: 'border-box',
              overflowY: 'auto'
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
                marginBottom: '16px',
                textAlign: 'center'
              }}
            >
              Contact Us
            </div>

            {/* Subtitle */}
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '1.4em',
                marginBottom: '32px',
                textAlign: 'center'
              }}
            >
              Get in touch with our team. We'd love to hear from you!
            </div>

            {/* Contact Methods */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px'
              }}
            >
              {/* Email Contact */}
              <div
                className="contact-card"
                onClick={handleEmailClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: '#00FF40',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}
                  >
                    ✉️
                  </div>
                  <div>
                    <div
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Inter',
                        fontWeight: '600',
                        fontSize: '16px',
                        marginBottom: '4px'
                      }}
                    >
                      Email Us
                    </div>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'Inter',
                        fontSize: '14px'
                      }}
                    >
                      hello@bounce2bounce.com
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Contact */}
              <div
                className="contact-card"
                onClick={handlePhoneClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: '#00FF40',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <div
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Inter',
                        fontWeight: '600',
                        fontSize: '16px',
                        marginBottom: '4px'
                      }}
                    >
                      Call Us
                    </div>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'Inter',
                        fontSize: '14px'
                      }}
                    >
                      +1 (555) BOUNCE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '1.3em',
                marginBottom: '16px',
                textAlign: 'center'
              }}
            >
              Follow Us
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '32px'
              }}
            >
              {[
                { platform: 'instagram', icon: '📷', label: 'Instagram' },
                { platform: 'twitter', icon: '🐦', label: 'Twitter' },
                { platform: 'facebook', icon: '📘', label: 'Facebook' }
              ].map((social) => (
                <div
                  key={social.platform}
                  onClick={() => handleSocialClick(social.platform)}
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '24px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.background = 'rgba(0, 255, 64, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  {social.icon}
                </div>
              ))}
            </div>

            {/* Office Hours */}
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
                Office Hours
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  lineHeight: '1.4em',
                  marginBottom: '8px'
                }}
              >
                Monday - Friday: 9:00 AM - 6:00 PM PST
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  lineHeight: '1.4em',
                  marginBottom: '16px'
                }}
              >
                Weekend: 10:00 AM - 4:00 PM PST
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  lineHeight: '1.4em'
                }}
              >
                We typically respond within 24 hours
              </div>
            </div>
          </div>
        </div>
        {/* REFACTORED: Using Shared Mobile Components - MobileNavigation already rendered above */}

        <MobileDrawer
          contentRef={contentRef}
          viewportContext={viewportContext}
          onStateChange={(drawerState) => {
            console.log('Contact page drawer state changed:', drawerState);
          }}
        />

      </div>
    </>
  );
};

export default ContactPageMobile;
