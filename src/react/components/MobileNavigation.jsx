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

      {/* Navigation Bar */}
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '100%',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          zIndex: 1000,
          background: 'transparent'
        }}
      >
        {/* Logo */}
        <div
          onClick={() => handleNavigation('/')}
          style={{
            fontFamily: 'Inter',
            fontWeight: '800',
            fontSize: '24px',
            color: '#FFFFFF',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          B2B
        </div>

        {/* Menu Button */}
        <div
          onClick={toggleMenu}
          className="mobile-menu-button"
          style={{
            position: 'relative',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            transform: 'translateY(-50%)',
            top: '50%'
          }}
        >
          {/* Hamburger/X Animation */}
          <div
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#FFFFFF',
              transition: 'all 0.3s ease',
              transform: showMenu ? 'rotate(45deg) translateY(8px)' : 'rotate(0deg)',
              transformOrigin: 'center'
            }}
          />
          <div
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#FFFFFF',
              transition: 'all 0.3s ease',
              opacity: showMenu ? 0 : 1
            }}
          />
          <div
            style={{
              width: '24px',
              height: '2px',
              backgroundColor: '#FFFFFF',
              transition: 'all 0.3s ease',
              transform: showMenu ? 'rotate(-45deg) translateY(-8px)' : 'rotate(0deg)',
              transformOrigin: 'center'
            }}
          />
        </div>
      </div>

      {/* Navigation Overlay */}
      <div
        className={`mobile-nav-overlay ${showMenu ? 'entered' : 'entering'}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: showMenu ? 'blur(10px)' : 'blur(0px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '40px',
          opacity: showMenu ? 1 : 0,
          visibility: showMenu ? 'visible' : 'hidden',
          pointerEvents: showMenu ? 'auto' : 'none'
        }}
      >
        {/* Navigation Items */}
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
            userSelect: 'none',
            textAlign: 'center',
            opacity: currentPage === 'events' ? 0.6 : 1,
            transform: showMenu ? 'translateX(0px)' : 'translateX(-50px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: showMenu ? '0.1s' : '0s'
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
            userSelect: 'none',
            textAlign: 'center',
            opacity: currentPage === 'about' ? 0.6 : 1,
            transform: showMenu ? 'translateX(0px)' : 'translateX(-50px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: showMenu ? '0.15s' : '0s'
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
            userSelect: 'none',
            textAlign: 'center',
            opacity: currentPage === 'contact' ? 0.6 : 1,
            transform: showMenu ? 'translateX(0px)' : 'translateX(-50px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: showMenu ? '0.2s' : '0s'
          }}
        >
          Contact
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
