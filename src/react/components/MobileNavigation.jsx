import React, { useState } from 'react';

/**
 * Shared Mobile Navigation Component
 * Used across all mobile pages for consistent navigation experience
 */
const MobileNavigation = ({ currentPage = 'home' }) => {
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
      {/* Mobile Navigation CSS */}
      <style>
        {`
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
        `}
      </style>

      {/* Navigation Bar - Mobile Component - EXACT MATCH to FigmaMobile */}
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
        {/* Menu Button - Right Side */}
        <div
          onClick={toggleMenu}
          className="mobile-menu-button"
          style={{
            position: 'absolute',
            right: '20px',
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
          {/* Animated Menu Lines - EXACT MATCH to FigmaMobile */}
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

        {/* B2B Logo - Centered - Clickable with Animation */}
        <img
          onClick={() => handleNavigation('/')}
          src="/images/mobile-figma/b2b-logo-mobile.svg"
          alt="B2B Logo"
          style={{
            width: '138.41px',
            height: '43px',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
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
      </div>

      {/* Mobile Menu Overlay - EXACT MATCH to FigmaMobile */}
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
          {/* Close Menu Button (Animated X) - Right Side */}
          <div
            onClick={toggleMenu}
            className="mobile-menu-button"
            style={{
              position: 'absolute',
              right: '20px',
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

          {/* B2B Logo - Centered - Clickable */}
          <img
            onClick={() => handleNavigation('/')}
            src="/images/mobile-figma/b2b-logo-mobile.svg"
            alt="B2B Logo"
            style={{
              width: '138.41px',
              height: '43px',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
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
        </div>

        {/* Navigation Body - Centered Menu Items */}
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
              opacity: currentPage === 'events' ? 0.6 : 1,
              transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
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
              color: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              opacity: currentPage === 'about' ? 0.6 : 1,
              transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
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
              textAlign: 'center',
              opacity: currentPage === 'contact' ? 0.6 : 1,
              transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.5s' : '0s'
            }}
          >
            Contact
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
