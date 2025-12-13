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
  onNavigate = () => { },
  onMenuToggle = () => { } // New callback to notify parent of menu state changes
}) => {
  const [showMenu, setShowMenu] = useState(false);
  // Dynamic overlay height to handle iOS/Android dynamic viewports and notches
  const [overlayHeight, setOverlayHeight] = useState('100vh');
  useEffect(() => {
    const update = () => {
      try {
        const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        setOverlayHeight(`${vh}px`);
      } catch (e) {
        setOverlayHeight(`${window.innerHeight}px`);
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      if (window.visualViewport) window.visualViewport.removeEventListener('resize', update);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    const newMenuState = !showMenu;
    setShowMenu(newMenuState);
    onMenuToggle(newMenuState); // Notify parent of menu state change
  };

  // Handle navigation with menu close
  const handleNavigation = (path) => {
    onNavigate(path);
    setShowMenu(false);
    onMenuToggle(false); // Notify parent that menu is closed
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
            /* 🎯 SMOOTH INTERACTIONS: Elegant hover response (25% faster) */
            transition: all 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            padding: clamp(12px, 3vh, 20px) clamp(16px, 6vw, 40px); /* Responsive padding: keep 44px+ targets while fitting shorter viewports */
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

          /* Navigation overlay animations (25% faster) */
          .mobile-nav-overlay {
            transition: opacity 0.21s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.21s cubic-bezier(0.4, 0, 0.2, 1);
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

          /* 🚨 SCROLL FIX: Prevent accidental page reloads and pull-to-refresh */
          html, body {
            /* Disable pull-to-refresh on mobile */
            overscroll-behavior-y: contain !important;
            -webkit-overscroll-behavior-y: contain !important;
            /* Prevent bounce scrolling that can trigger refresh */
            -webkit-overflow-scrolling: auto !important;
            /* Disable touch callouts that can interfere */
            -webkit-touch-callout: none !important;
            /* Prevent text selection during scroll */
            -webkit-user-select: none !important;
            user-select: none !important;
          }

          /* 🚨 SCROLL FIX: Optimize mobile content containers */
          .mobile-content-container {
            /* Allow only vertical scrolling */
            touch-action: pan-y !important;
            /* Prevent overscroll bounce */
            overscroll-behavior: contain !important;
            -webkit-overscroll-behavior: contain !important;
            /* Smooth scrolling without interference */
            -webkit-overflow-scrolling: touch !important;
            /* Prevent scroll chaining */
            overscroll-behavior-x: none !important;
            overscroll-behavior-y: contain !important;
          }
        `}
      </style>

      {/* EXTRACTED: Navigation Bar - Fixed Header with Stable Layout */}
      <header
        role="banner"
        className="mobile-navigation-header"

        style={{
          position: 'fixed',
          /* 🚀 iOS SAFARI FIX: Position below safe area (Dynamic Island/notch) */
          top: 'env(safe-area-inset-top, 0px)',
          left: '0px',
          right: '0px',
          /* 🚀 JITTER FIX: Use fixed width to prevent layout shifts during scroll */
          width: '100%', // Full width to prevent horizontal layout shifts
          maxWidth: '100%', // Ensure no width constraints cause reflows
          margin: '0', // Remove auto margin that can cause layout calculations
          /* 🚀 JITTER FIX: Use transform instead of height for smooth scaling */
          height: '97px', // Fixed height to prevent layout reflows
          minHeight: '97px', // Consistent height
          background: 'transparent', // Transparent to let content show through
          backdropFilter: 'none', // No blur on transparent background
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0', // REMOVED: No padding to allow menu button to align with content edge
          boxSizing: 'border-box',
          /* 🚨 FIXED: Navigation container remains at fixed size and position */
          transform: 'none', // No scaling - container stays fixed
          transformOrigin: 'top center', // Keep for consistency but no scaling applied
          /* 🚨 SCROLL FIX: Remove transitions that interfere with scrolling */
          transition: 'none',
          zIndex: 1000,
          /* REMOVED: Bottom border for cleaner look */
          flexShrink: 0,
          /* 🚨 SCROLL FIX: Prevent navigation from interfering with page scroll */
          contain: 'layout',
          willChange: 'auto',
          /* 🚨 SCROLL FIX: Disable overscroll behavior on navigation */
          overscrollBehavior: 'none',
          WebkitOverscrollBehavior: 'none',
          /* 🎯 TOUCH FIX: Prevent touch events from bubbling */
          touchAction: 'none'
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
          <a href="/" aria-label="Home" onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
            style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1001 }}
          >
            <img
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              className="mobile-navigation-logo"
              style={{
                /* 🎯 CONSISTENT SIZE: Fixed size - scales naturally with container */
                width: '160px',
                height: '50px',
                cursor: 'pointer',
                userSelect: 'none',
                /* 🎯 ALIGNMENT FIX: Disable transitions to prevent logo jumping during menu transitions */
                transition: 'none !important',
                willChange: 'auto',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              onMouseDown={undefined}
              onMouseUp={undefined}
              onMouseLeave={undefined}
            />
          </a>
        </div> {/* Close content wrapper */}
      </header>

      {/* EXTRACTED: Mobile Navigation Overlay - Complete Menu System */}
      <div className="mobile-nav-overlay"
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw',
          height: '100dvh',
          minHeight: '100dvh',
          maxHeight: '100dvh',
          background: 'rgba(0, 0, 0, 0.95)',
          overflow: 'hidden',
          zIndex: showMenu ? 1000 : -1,
          display: 'flex',
          flexDirection: 'column',
          opacity: showMenu ? 1 : 0,
          visibility: showMenu ? 'visible' : 'hidden',
          transition: 'opacity 0.21s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.21s cubic-bezier(0.4, 0, 0.2, 1)',
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
        onClick={() => {
          setShowMenu(false);
          onMenuToggle(false);
        }}
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
              onMenuToggle(false);
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
                transition: 'all 0.225s cubic-bezier(0.4, 0, 0.2, 1)',
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
                transition: 'all 0.225s cubic-bezier(0.4, 0, 0.2, 1)',
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
                transition: 'all 0.225s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'rotate(-45deg) translateY(-6px)',
                transformOrigin: 'center'
              }}
            />
          </div>

          {/* Logo in Menu - FIXED: Static size, no scaling effects */}
          <a href="/" aria-label="Home" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onNavigate('/'); }}
            style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 1001 }}
          >
            <img
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              className="mobile-navigation-logo"
              style={{
                width: '160px',
                height: '50px',
                cursor: 'pointer',
                userSelect: 'none',
                /* 🎯 ALIGNMENT FIX: Disable transitions to prevent logo jumping during menu transitions */
                transition: 'none !important',
                willChange: 'auto',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              onMouseDown={undefined}
              onMouseUp={undefined}
              onMouseLeave={undefined}
            />
          </a>
        </div>

        {/* 🎭 ELEGANT MENU ITEMS: Smooth animations with proper positioning */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', // Center vertically if space allows
            /* 🎯 POSITIONING FIX: Fill the space and align with page content */
            width: 'min(360px, calc(100vw - 16px))',
            maxWidth: '360px',
            margin: '0 auto',
            padding: 'clamp(8px, 2vh, 16px) 8px max(24px, env(safe-area-inset-bottom)) 8px',
            gap: 'clamp(12px, 3vh, 24px)', // Reduced gap to prevent overflow
            /* 🎭 SMOOTH CONTAINER ANIMATION: Gentle entrance */
            transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, -30px, 0)',
            opacity: 1,
            transition: 'transform 0.21s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: showMenu ? '0.05s' : '0s',
            /* 🎯 PERFORMANCE: Hardware acceleration for smooth animations */
            willChange: 'transform, opacity',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            /* Ensure menu fits within viewport without internal scrolling */
            flex: '1 1 auto', // Allow shrinking/growing
            overflowY: 'auto', // Enable scrolling if content overflows
            maxHeight: 'calc(100dvh - 100px)' // Reserve space for header
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => handleNavigation('/')}
            className={`mobile-nav-item ${currentPage === 'events' ? 'active' : ''}`}
            style={{
              fontFamily: 'Inter',
              fontWeight: '800',
              fontSize: 'clamp(24px, 6vh, 48px)', // Reduced font size
              lineHeight: '1.21em',
              color: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - Events (1st item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.21s cubic-bezier(0.4, 0, 0.2, 1)',
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
            <a href="/" aria-label="Events" onClick={(e) => { e.preventDefault(); handleNavigation('/') }} style={{ display: 'block', width: '100%', height: '100%', color: 'inherit', textDecoration: 'none' }}>
              Events
            </a>
          </div>
          <div
            onClick={() => handleNavigation('/about')}
            className={`mobile-nav-item ${currentPage === 'about' ? 'active' : ''}`}
            style={{
              fontFamily: 'Inter',
              fontWeight: '800',
              fontSize: 'clamp(24px, 6vh, 48px)', // Reduced font size
              lineHeight: '1.21em',
              color: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - About (2nd item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.21s cubic-bezier(0.4, 0, 0.2, 1)',
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
            <a href="/about" aria-label="About" onClick={(e) => { e.preventDefault(); handleNavigation('/about') }} style={{ display: 'block', width: '100%', height: '100%', color: 'inherit', textDecoration: 'none' }}>
              About
            </a>
          </div>
          <div
            onClick={() => handleNavigation('/faq')}
            className={`mobile-nav-item ${currentPage === 'faq' ? 'active' : ''}`}
            style={{
              fontFamily: 'Inter',
              fontWeight: '800',
              fontSize: 'clamp(24px, 6vh, 48px)', // Reduced font size
              lineHeight: '1.21em',
              color: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - FAQ (3rd item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.21s cubic-bezier(0.4, 0, 0.2, 1)',
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
            <a href="/faq" aria-label="FAQ" onClick={(e) => { e.preventDefault(); handleNavigation('/faq') }} style={{ display: 'block', width: '100%', height: '100%', color: 'inherit', textDecoration: 'none' }}>
              FAQ
            </a>
          </div>
          <div
            onClick={() => handleNavigation('/shop')}
            className={`mobile-nav-item ${currentPage === 'shop' ? 'active' : ''}`}
            style={{
              fontFamily: 'Inter',
              fontWeight: '800',
              fontSize: 'clamp(24px, 6vh, 48px)', // Reduced font size
              lineHeight: '1.21em',
              color: '#FFFFFF',
              cursor: 'pointer',
              textAlign: 'center',
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - Shop (4th item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.21s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.25s' : '0s',
              /* 🎯 PERFORMANCE: Hardware acceleration for smooth text animations */
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              /* 🎨 CRISP TEXT: Improve text rendering */
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            <a href="/shop" aria-label="Merch" onClick={(e) => { e.preventDefault(); handleNavigation('/shop') }} style={{ display: 'block', width: '100%', height: '100%', color: 'inherit', textDecoration: 'none' }}>
              Merch
            </a>
          </div>

          {/* 🎭 SOCIAL MEDIA ICONS: Icon-only display for mobile nav overlay */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '24px', // Consistent spacing between icon-only buttons
              padding: '0px 25px 0px 25px', // Consistent padding
              /* 🎭 ELEGANT ENTRANCE: Smooth slide-up with fade - Social Media (5th item) */
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 40px, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.21s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.30s' : '0s',
              /* 🎯 PERFORMANCE: Hardware acceleration */
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              flexShrink: 0
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <SocialMediaButtons iconOnly={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
