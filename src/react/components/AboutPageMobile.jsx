import React, { useState } from 'react';

/**
 * Mobile-only About page component with animated navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const AboutPageMobile = () => {
  const [showMenu, setShowMenu] = useState(false);

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
          .mobile-nav-item:hover {
            opacity: 0.8;
            transform: translateX(10px) !important;
            transition: all 0.3s ease;
          }
          .mobile-menu-button:hover {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.1);
            transition: all 0.2s ease;
          }
          
          .mobile-menu-button {
            transition: transform 0.2s ease;
          }
          
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
          {/* Navigation Bar - Mobile Component */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '430px',
              height: '97px',
              background: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              boxSizing: 'border-box'
            }}
          >
            {/* Menu Button - Left Side */}
            <div
              onClick={toggleMenu}
              className="mobile-menu-button"
              style={{
                position: 'absolute',
                left: '20px',
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
            
            {/* B2B Logo - Centered */}
            <img
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              style={{
                width: '138.41px',
                height: '43px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          {/* Main Content Area - About Page */}
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
                marginBottom: '32px',
                textAlign: 'left'
              }}
            >
              <p style={{ marginBottom: '20px' }}>
                Bounce2Bounce is the premier destination for exclusive events, contests, and unforgettable experiences. 
                We connect people with the most exciting opportunities in their area.
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                Our platform brings together event organizers, brands, and participants to create meaningful connections 
                and memorable moments. From VIP experiences to local gatherings, we curate the best events for our community.
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                Join thousands of members who trust Bounce2Bounce to discover and participate in exclusive events, 
                win amazing prizes, and connect with like-minded individuals.
              </p>
            </div>

            {/* Features Section */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '1.3em',
                marginBottom: '16px'
              }}
            >
              What We Offer
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px'
              }}
            >
              {[
                'Exclusive event access and VIP experiences',
                'Contests with amazing prizes and rewards',
                'Community-driven local gatherings',
                'Brand partnerships and collaborations',
                'Real-time notifications for new opportunities'
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    lineHeight: '1.4em'
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      background: '#00FF40',
                      borderRadius: '50%',
                      flexShrink: 0
                    }}
                  />
                  {feature}
                </div>
              ))}
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

        {/* Mobile Menu Overlay */}
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            opacity: showMenu ? 1 : 0,
            visibility: showMenu ? 'visible' : 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: showMenu ? 'blur(10px)' : 'blur(0px)'
          }}
        >
          {/* Navigation Bar in Menu */}
          <div
            style={{
              width: '430px',
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
            {/* Close Menu Button (Animated X) */}
            <div
              onClick={toggleMenu}
              className="mobile-menu-button"
              style={{
                position: 'absolute',
                left: '20px',
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
              {/* Same animated lines as main nav */}
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
            
            {/* B2B Logo - Centered */}
            <img
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              style={{
                width: '138.41px',
                height: '43px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          {/* Navigation Body */}
          <div
            style={{
              width: '430px',
              maxWidth: '100vw',
              margin: '0 auto',
              padding: '40px 25px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transform: showMenu ? 'translateY(0)' : 'translateY(-20px)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.2s' : '0s'
            }}
          >
            <div
              onClick={() => handleNavigation('/events')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'left',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: showMenu ? '0.3s' : '0s'
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
                color: '#00FF40', // Highlighted as current page
                cursor: 'pointer',
                textAlign: 'left',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: showMenu ? '0.4s' : '0s'
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
                textAlign: 'left',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: showMenu ? '0.5s' : '0s'
              }}
            >
              Contact
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageMobile;
