import React, { useState, useEffect } from 'react';
import SocialMediaButtons from './SocialMediaButtons';

/**
 * Shared Mobile Navigation Component
 * Extracted from FigmaMobile.jsx to eliminate code duplication
 * Maintains 100% identical styling, animations, and behavior
 */
const MobileNavigation = ({ 
  currentPage = 'events', 
  scrollY = 0, 
  onNavigate = () => {} 
}) => {
  const [showMenu, setShowMenu] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handle navigation with menu close
  const handleNavigation = (path) => {
    onNavigate(path);
    setShowMenu(false);
  };

  // 📱 ENHANCED: Body scroll lock when menu is expanded (iOS Safari support)
  useEffect(() => {
    const body = document.body;
    
    if (showMenu) {
      // Lock main page scroll when menu is expanded
      const scrollY = window.scrollY;
      body.classList.add('drawer-scroll-lock');
      body.style.top = `-${scrollY}px`;
    } else {
      // Restore main page scroll when menu is collapsed
      body.classList.remove('drawer-scroll-lock');
      const scrollY = body.style.top;
      body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      body.classList.remove('drawer-scroll-lock');
      body.style.top = '';
    };
  }, [showMenu]);

  return (
    <>
      {/* 🚀 JITTER FIX: Optimized Mobile Navigation CSS for smooth scrolling */}
      <style>
        {`
          /* 🚀 ULTRA-SMOOTH NAVIGATION SCALING: Optimized for 60fps performance */
          .mobile-navigation-header {
            /* Advanced hardware acceleration for smooth transforms */
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            perspective: 1000px;

            /* 🎯 PERFORMANCE: Optimize rendering pipeline for smooth scaling */
            contain: strict; /* Complete isolation for better performance */
            will-change: transform; /* Hint browser for GPU optimization */

            /* 🎯 SMOOTH SCALING: Prevent subpixel rendering issues during scale */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            image-rendering: -webkit-optimize-contrast;

            /* 🎯 JITTER PREVENTION: Stable rendering during transforms */
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;
          }

          /* 🎯 PROPORTIONAL LOGO SCALING: Logo scales naturally with container */
          .mobile-navigation-logo {
            /* 🎯 INTERACTION TRANSITIONS: Only for click/hover effects */
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            will-change: auto; /* No individual scaling needed */

            /* 🎯 HARDWARE ACCELERATION: Optimized for container-based scaling */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;

            /* 🎯 ASPECT RATIO PRESERVATION: Maintain proportions during container scaling */
            object-fit: contain; /* Maintain aspect ratio */
            object-position: center; /* Center the logo */

            /* 🎯 CRISP RENDERING: Optimize image quality during container scaling */
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            -webkit-image-rendering: -webkit-optimize-contrast;

            /* 🎯 LAYOUT STABILITY: Fixed size - container handles proportional scaling */
            flex-shrink: 0;
            flex-grow: 0;

            /* 🎯 PERFORMANCE: Optimized for container-based scaling */
            contain: layout style;
          }

          /* Removed overly-broad selector that caused inconsistent timings */
          /* div[style*="opacity"][style*="transition"][style*="transitionDelay"] { */
          /*   transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important; */
          /*   transform: translateZ(0); */
          /*   -webkit-transform: translateZ(0); */
          /* } */

          /* 📱 ULTRA-STABLE MOBILE NAVIGATION WITH SCROLL ISOLATION */
          .mobile-navigation-header {
            /* Prevent any layout shifts from navigation changes */
            contain: strict;
            /* Isolate navigation animations from scroll */
            isolation: isolate;
            /* Prevent reflow during scroll state changes */
            will-change: auto;
            /* Optimize for mobile performance */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            /* Prevent any interference with main content scrolling */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* Prevent any layout shifts during state changes */
            contain: layout style;
          }

          /* 🎭 ELEGANT MENU ITEMS: Smooth interactions with enhanced glassmorphism */
          .mobile-nav-item {
            position: relative;
            /* 🎯 SMOOTH INTERACTIONS: Elegant hover response */
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            padding: 20px 40px; /* Increased padding for better touch targets */
            border-radius: 24px; /* Larger radius for modern feel */
            margin: 12px 0; /* Increased margin for better spacing */
            /* 🎨 GLASSMORPHISM: Enhanced background for better contrast */
            background: transparent;
            backdrop-filter: blur(0px);
            border: 2px solid transparent;
            /* 🎯 OVERRIDE PROTECTION: Prevent global CSS interference */
            transform: none !important; /* Prevent global transform conflicts */
            animation: none !important; /* Prevent global animation conflicts */
          }

          /* 🎨 ACTIVE STATE: Enhanced glassmorphism for current page */
          .mobile-nav-item.active {
            /* Enhanced glassmorphism effect for active state */
            background: rgba(255, 255, 255, 0.12) !important;
            backdrop-filter: blur(25px) !important;
            border: 2px solid rgba(255, 255, 255, 0.2) !important;
            /* Enhanced glow effect */
            box-shadow:
              0 12px 40px rgba(255, 255, 255, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
            /* Slightly larger for emphasis */
            transform: scale(1.03) !important;
          }

          /* 🎯 HOVER STATE: Smooth interaction for non-active items */
          .mobile-nav-item:not(.active):hover {
            background: rgba(255, 255, 255, 0.06) !important;
            backdrop-filter: blur(15px) !important;
            border: 2px solid rgba(255, 255, 255, 0.12) !important;
            transform: scale(1.02) !important;
            /* Subtle glow on hover */
            box-shadow: 0 8px 32px rgba(255, 255, 255, 0.08) !important;
          }

          /* 🔧 FIXED: Consistent menu button hover state - maintain position */
          .mobile-menu-button:hover {
            opacity: 0.8;
            /* Keep same translateY to prevent position drift */
            transform: translateY(-50%) scale(1.05);
            transition: all 0.2s ease;
          }

          /* Active/pressed state for menu button */
          .mobile-menu-button:active {
            /* Maintain exact same position during press */
            transform: translateY(-50%) scale(0.95);
            opacity: 0.7;
          }

          /* 🔧 FIXED: Menu button animation states - prevent position drift */
          .mobile-menu-button {
            transition: transform 0.2s ease;
            /* Prevent any layout shifts during state changes */
            contain: layout style;
          }

          /* Navigation overlay animations */
          .mobile-nav-overlay {
            transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.28s cubic-bezier(0.4, 0, 0.2, 1);
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

          /* Enable hardware acceleration */
          .mobile-drawer, .mobile-nav-overlay {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          /* ENHANCED: Body scroll lock when drawer is active */
          body.drawer-scroll-lock {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
            /* iOS Safari specific scroll lock */
            -webkit-overflow-scrolling: none !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }
        `}
      </style>

      {/* EXTRACTED: Navigation Bar - Fixed Header with Stable Layout */}
      <header
        role="banner"
        className="mobile-navigation-header"
        onTouchMove={(e) => {
          // FIXED: Prevent navigation bar scroll from affecting main page
          e.stopPropagation();
        }}
        onWheel={(e) => {
          // FIXED: Prevent navigation bar scroll from affecting main page
          e.stopPropagation();
        }}
        style={{
          position: 'sticky',
          top: '0px',
          /* 🚀 JITTER FIX: Use fixed width to prevent layout shifts during scroll */
          width: '100%', // Full width to prevent horizontal layout shifts
          maxWidth: '100%', // Ensure no width constraints cause reflows
          margin: '0', // Remove auto margin that can cause layout calculations
          /* 🚀 JITTER FIX: Use transform instead of height for smooth scaling */
          height: '97px', // Fixed height to prevent layout reflows
          minHeight: '97px', // Consistent height
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0', // REMOVED: No padding to allow menu button to align with content edge
          boxSizing: 'border-box',
          /* 🚨 FIXED: Navigation container remains at fixed size and position */
          transform: 'none', // No scaling - container stays fixed
          transformOrigin: 'top center', // Keep for consistency but no scaling applied
          /* 🚨 FIXED: Simplified transitions - no transform scaling */
          transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 200,
          /* REMOVED: Bottom border for cleaner look */
          flexShrink: 0,
          /* 🚨 FIXED: Minimal performance properties - no scaling optimizations needed */
          contain: 'layout style', // Basic containment only
          willChange: 'auto', // No transform changes expected
          /* 🚨 FIXED: Standard rendering - no 3D transforms */
          backfaceVisibility: 'visible',
          WebkitBackfaceVisibility: 'visible',
          /* 🎯 RENDERING OPTIMIZATION: Crisp scaling at all levels */
          imageRendering: '-webkit-optimize-contrast',
          WebkitImageRendering: '-webkit-optimize-contrast'
        }}

      >
        {/* 🚀 PROPORTIONAL SCALING FIX: Content wrapper optimized for uniform scaling */}
        <div
          style={{
            width: 'min(360px, calc(100vw - 16px))', // FIXED: Match menu width for consistency
            maxWidth: '360px', // FIXED: Match menu max width
            margin: '0 auto', // Center the content
            position: 'relative',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            /* 🎯 PROPORTIONAL SCALING: Ensure content scales uniformly with container */
            contain: 'layout style',
            /* Prevent any interference with logo proportions */
            overflow: 'visible', // Allow logo to scale naturally
            flexShrink: 0, // Prevent compression
            flexGrow: 0 // Prevent expansion
          }}
        >
          {/* 🎯 HAMBURGER MENU BUTTON - CONSISTENT POSITIONING */}
          <div
          onClick={toggleMenu}
          className="mobile-menu-button"
          style={{
            position: 'absolute',
            right: '0px', // FIXED: Align with content right edge (no padding offset)
            top: '50%',
            transform: 'translateY(-50%)',
            width: '34px', // Match original size
            height: '34px', // Match original size
            cursor: 'pointer',
            /* 🎯 LAYERING FIX: Ensure menu button stays visible above overlay */
            zIndex: 1002, // Higher than logo (1001) and overlay (1000)
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px', // Match original gap
            /* 🎯 CONSISTENT POSITIONING: Prevent layout shifts during animation */
            transformOrigin: 'center center',
            contain: 'layout style',
            /* 🎯 SMOOTH TRANSITIONS: Consistent animation timing */
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease'
          }}

        >
          <div
            style={{
              width: '24px',
              height: '2px',
              background: '#FFFFFF',
              borderRadius: '1px',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
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
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
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
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: showMenu ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)',
              transformOrigin: 'center'
            }}
          />
        </div>

        {/* 🎯 B2B LOGO - CONSISTENT POSITIONING: Same appearance whether menu is open or closed */}
        <img
          onClick={() => onNavigate('/')}
          src="/images/mobile-figma/b2b-logo-mobile.svg"
          alt="B2B Logo"
          className="mobile-navigation-logo"
          style={{
            /* 🎯 CONSISTENT SIZE: Fixed size - scales naturally with container */
            width: '160px', // Fixed size - container scaling handles the proportional reduction
            height: '50px', // Fixed size - container scaling handles the proportional reduction
            position: 'absolute',
            left: '50%',
            top: '50%',
            /* 🚀 CONSISTENT TRANSFORM: Only positioning, no scaling (container handles scaling) */
            transform: 'translate(-50%, -50%)', // Only center positioning - no scale()
            cursor: 'pointer',
            userSelect: 'none',
            /* 🎯 LAYERING FIX: Ensure logo stays visible above menu overlay */
            zIndex: 1001, // Higher than menu overlay (1000) to stay visible
            /* 🎯 PERFORMANCE: Optimized for container-based scaling */
            willChange: 'auto', // No individual scaling needed
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
            /* CSS transitions now handled by .mobile-navigation-logo class */
          }}
          /* 🚨 CRITICAL FIX: Remove all mouse events that could trigger scaling */
          onMouseDown={undefined}
          onMouseUp={undefined}
          onMouseLeave={undefined}
        />
        </div> {/* Close content wrapper */}
      </header>

      {/* EXTRACTED: Mobile Navigation Overlay - Complete Menu System */}
      <div className="mobile-nav-overlay"
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
          transition: 'opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: showMenu ? 'blur(10px)' : 'blur(0px)',
          // Hardware acceleration for smooth overlay animations
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          willChange: 'opacity, visibility, backdrop-filter',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          // Prevent pointer events when hidden
          pointerEvents: showMenu ? 'auto' : 'none'
        }}
        onClick={() => setShowMenu(false)}
      >
        {/* Navigation Bar in Menu */}
        <div
          style={{
            /* FIXED: Use wider content width to fill the space properly */
            width: 'min(360px, calc(100vw - 16px))', // FIXED: Wider width with 8px padding each side
            maxWidth: '360px', // FIXED: Increased max width to fill space
            margin: '0 auto', // Center like main content
            height: '97px',
            position: 'relative',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0', // REMOVED: No padding to allow X button to align with content edge
            boxSizing: 'border-box'
          }}
        >
          {/* 🎯 CLOSE BUTTON (X) - CONSISTENT POSITIONING */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
            }}
            style={{
              position: 'absolute',
              right: '0px', // FIXED: Align with content right edge (no padding offset)
              top: '50%',
              transform: 'translateY(-50%)',
              width: '34px', // Match original size
              height: '34px', // Match original size
              cursor: 'pointer',
              /* 🎯 LAYERING FIX: Ensure close button stays visible */
              zIndex: 1002, // Same as hamburger menu button for consistency
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '4px' // Match original gap
            }}

          >
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

          {/* Logo in Menu - FIXED: Static size, no scaling effects */}
          <img
            src="/images/mobile-figma/b2b-logo-mobile.svg"
            alt="B2B Logo"
            style={{
              width: '160px', // FIXED: Match main navigation logo size exactly
              height: '50px', // FIXED: Match main navigation logo size exactly
              cursor: 'pointer',
              userSelect: 'none',
              /* 🚨 CRITICAL FIX: Remove all scaling effects to maintain consistent size */
              transform: 'none', // No transforms
              transition: 'none', // No transitions that could affect size
              flexShrink: 0, // Prevent compression
              flexGrow: 0 // Prevent expansion
            }}
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('/');
            }}
            /* 🚨 CRITICAL FIX: Remove all mouse events that could trigger scaling */
            onMouseDown={undefined}
            onMouseUp={undefined}
            onMouseLeave={undefined}
          />
        </div>

        {/* 🎭 ELEGANT MENU ITEMS: Smooth animations with proper positioning */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            /* 🎯 POSITIONING FIX: Fill the space and align with page content */
            width: 'min(360px, calc(100vw - 16px))', // FIXED: Match navigation bar width exactly
            maxWidth: '360px', // FIXED: Match navigation bar max width
            margin: '0 auto', // Center like main content
            padding: '8px 8px 40px 8px', // FIXED: Minimal padding to maximize content width
            gap: '32px', // Increased gap for more elegant spacing
            /* 🎭 SMOOTH CONTAINER ANIMATION: Gentle entrance */
            transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, -30px, 0)',
            opacity: 1, // Always visible - let children control their own opacity
            transition: 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: showMenu ? '0.05s' : '0s',
            /* 🎯 PERFORMANCE: Hardware acceleration for smooth animations */
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => handleNavigation('/')}
            className={`mobile-nav-item ${currentPage === 'events' ? 'active' : ''}`}
            style={{
              fontFamily: 'Inter',
              fontWeight: '800',
              fontSize: '64px',
              lineHeight: '1.21em',
              color: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - Events (1st item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.10s' : '0s',
              /* 🎯 PERFORMANCE: Hardware acceleration for smooth text animations */
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              /* 🎨 CRISP TEXT: Improve text rendering */
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            Events
          </div>
          <div
            onClick={() => handleNavigation('/about')}
            className={`mobile-nav-item ${currentPage === 'about' ? 'active' : ''}`}
            style={{
              fontFamily: 'Inter',
              fontWeight: '800',
              fontSize: '64px',
              lineHeight: '1.21em',
              color: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - About (2nd item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.15s' : '0s',
              /* 🎯 PERFORMANCE: Hardware acceleration for smooth text animations */
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              /* 🎨 CRISP TEXT: Improve text rendering */
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            About
          </div>
          <div
            onClick={() => handleNavigation('/contact')}
            className={`mobile-nav-item ${currentPage === 'contact' ? 'active' : ''}`}
            style={{
              fontFamily: 'Inter',
              fontWeight: '800',
              fontSize: '64px',
              lineHeight: '1.21em',
              color: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - Contact (3rd item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.20s' : '0s',
              /* 🎯 PERFORMANCE: Hardware acceleration for smooth text animations */
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              /* 🎨 CRISP TEXT: Improve text rendering */
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            Contact
          </div>

          {/* 🎭 SOCIAL MEDIA BUTTONS: Elegant final entrance */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 25px 0px 25px', // Consistent padding
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - Social Media (4th item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.25s' : '0s',
              /* 🎯 PERFORMANCE: Hardware acceleration */
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
    </>
  );
};

export default MobileNavigation;
