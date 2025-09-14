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

          /* 🚀 ULTRA-SMOOTH LOGO SCALING: Perfect synchronization with navigation */
          .mobile-navigation-logo {
            /* 🎯 SYNCHRONIZED TRANSITIONS: Match navigation bar timing for harmony */
            transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            will-change: transform;

            /* 🎯 ADVANCED HARDWARE ACCELERATION: Maximum GPU optimization */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform-style: preserve-3d;
            -webkit-transform-style: preserve-3d;

            /* 🎯 ASPECT RATIO PRESERVATION: Ensure proportional scaling */
            object-fit: contain; /* Maintain aspect ratio */
            object-position: center; /* Center the logo */

            /* 🎯 CRISP SCALING: Optimize image rendering during scale */
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            -webkit-image-rendering: -webkit-optimize-contrast;

            /* 🎯 LAYOUT STABILITY: Prevent distortion during container scaling */
            flex-shrink: 0;
            flex-grow: 0;

            /* 🎯 PERFORMANCE: Complete isolation for smooth scaling */
            contain: layout style;
          }

          /* 🚀 JITTER FIX: Optimize menu overlay animations */
          div[style*="opacity"][style*="transition"][style*="transitionDelay"] {
            transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
          }

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

          /* FIXED: Fast, responsive hover effects for navigation items */
          .mobile-nav-item {
            position: relative;
            transition: all 0.15s ease-out; /* Much faster hover response */
            padding: 16px 32px;
            border-radius: 20px;
            margin: 8px 0;
            /* Glassmorphism background for better contrast */
            background: transparent;
            backdrop-filter: blur(0px);
            border: 2px solid transparent;
          }

          /* Active page state styling */
          .mobile-nav-item.active {
            /* Enhanced glassmorphism effect for active state */
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border: 2px solid rgba(255, 255, 255, 0.15);
            /* Subtle glow effect */
            box-shadow:
              0 8px 32px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
            /* Slightly larger text for emphasis */
            transform: scale(1.02);
          }

          /* Hover state for non-active items */
          .mobile-nav-item:not(.active):hover {
            background: rgba(255, 255, 255, 0.04);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.08);
            transform: scale(1.01);
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
          /* 🚀 ULTRA-SMOOTH SYNCHRONIZED SCALING: Perfect logo-navigation harmony */
          transform: (() => {
            // 🎯 SYNCHRONIZED PARAMETERS: Exact match with logo scaling
            const maxScale = 1; // Full scale at top (100%)
            const minScale = 0.75; // Minimum scale when scrolled (75% - 25% reduction)
            const scrollThreshold = 40; // Exact same threshold as logo for perfect sync

            // 🎯 PERFORMANCE: Optimized calculations for smooth 60fps
            const scrollProgress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);

            // 🎯 SMOOTH EASING: Identical easing function as logo for perfect synchronization
            const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
            const currentScale = maxScale - (easedProgress * (maxScale - minScale));

            // 🎯 PRECISION: High-precision rounding for smooth scaling
            return `scale(${Math.round(currentScale * 10000) / 10000})`;
          })(),
          transformOrigin: 'top center', // Scale from top to maintain position
          /* 🚀 ULTRA-SMOOTH TRANSITIONS: Optimized for jitter-free performance */
          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 200,
          /* REMOVED: Bottom border for cleaner look */
          flexShrink: 0,
          /* 🚀 ULTRA-SMOOTH PERFORMANCE: Advanced GPU optimization for 60fps scaling */
          contain: 'strict', // Complete isolation for maximum performance
          willChange: 'transform', // GPU layer promotion for smooth scaling
          /* 🚀 ADVANCED HARDWARE ACCELERATION: Eliminate any rendering bottlenecks */
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: '1000px',
          /* 🎯 SMOOTH SCALING OPTIMIZATION: Prevent visual artifacts during scale */
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          /* 🎯 RENDERING OPTIMIZATION: Crisp scaling at all levels */
          imageRendering: '-webkit-optimize-contrast',
          WebkitImageRendering: '-webkit-optimize-contrast'
        }}

      >
        {/* 🚀 PROPORTIONAL SCALING FIX: Content wrapper optimized for uniform scaling */}
        <div
          style={{
            width: 'min(324px, calc(100vw - 24px))', // Constrain content width, not container
            maxWidth: '324px',
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
          {/* EXTRACTED: Hamburger Menu Button */}
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
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px', // Match original gap
            // Prevent layout shifts during animation
            transformOrigin: 'center center',
            contain: 'layout style',
            // Smooth transitions
            transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease'
          }}

        >
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

        {/* B2B Logo - Dynamic Scroll-Responsive Scaling */}
        <img
          onClick={() => onNavigate('/')}
          src="/images/mobile-figma/b2b-logo-mobile.svg"
          alt="B2B Logo"
          className="mobile-navigation-logo"
          style={{
            /* ENHANCED: Larger initial logo size for better visibility */
            width: '160px', // INCREASED: Larger initial width (was 138.41px)
            height: '50px', // INCREASED: Larger initial height (was 43px)
            position: 'absolute',
            left: '50%',
            top: '50%',
            /* 🚀 ULTRA-SMOOTH SYNCHRONIZED SCALING: Perfect navigation-logo harmony */
            transform: `translate(-50%, -50%) scale(${(() => {
              // 🎯 SYNCHRONIZED PARAMETERS: Exact match with navigation bar scaling
              const maxScale = 1; // Full size at top (100%)
              const minScale = 0.75; // Minimum scale when scrolled (75% - 25% reduction)
              const scrollThreshold = 40; // Exact same threshold as navigation for perfect sync

              // 🎯 PERFORMANCE: Optimized calculations for smooth 60fps
              const scrollProgress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);

              // 🎯 SMOOTH EASING: Identical easing function as navigation for perfect synchronization
              const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
              const currentScale = maxScale - (easedProgress * (maxScale - minScale));

              // 🎯 PRECISION: High-precision rounding for smooth scaling (matches navigation)
              return Math.round(currentScale * 10000) / 10000;
            })()})`,
            cursor: 'pointer',
            userSelect: 'none'
            /* CSS transitions now handled by .mobile-navigation-logo class */
          }}
          onMouseDown={(e) => {
            // 🎯 SYNCHRONIZED INTERACTION: Preserve dynamic scaling with high precision
            const maxScale = 1;
            const minScale = 0.75; // Exact match with navigation scaling
            const scrollThreshold = 40;
            const scrollProgress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);
            const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
            const currentScale = maxScale - (easedProgress * (maxScale - minScale));
            e.target.style.transform = `translate(-50%, -50%) scale(${Math.round((currentScale * 0.95) * 10000) / 10000})`;
          }}
          onMouseUp={(e) => {
            // 🎯 SYNCHRONIZED INTERACTION: Restore to current dynamic scale with high precision
            const maxScale = 1;
            const minScale = 0.75; // Exact match with navigation scaling
            const scrollThreshold = 40;
            const scrollProgress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);
            const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
            const currentScale = maxScale - (easedProgress * (maxScale - minScale));
            e.target.style.transform = `translate(-50%, -50%) scale(${Math.round(currentScale * 10000) / 10000})`;
          }}
          onMouseLeave={(e) => {
            // 🎯 SYNCHRONIZED INTERACTION: Restore to current dynamic scale with high precision
            const maxScale = 1;
            const minScale = 0.75; // Exact match with navigation scaling
            const scrollThreshold = 40;
            const scrollProgress = Math.min(Math.max(scrollY / scrollThreshold, 0), 1);
            const easedProgress = scrollProgress * scrollProgress * (3 - 2 * scrollProgress);
            const currentScale = maxScale - (easedProgress * (maxScale - minScale));
            e.target.style.transform = `translate(-50%, -50%) scale(${Math.round(currentScale * 10000) / 10000})`;
          }}
        />
        </div> {/* Close content wrapper */}
      </header>

      {/* EXTRACTED: Mobile Navigation Overlay - Complete Menu System */}
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
            /* FIXED: Match main content width pattern for consistency */
            width: 'min(324px, calc(100vw - 24px))', // Same as main content: 12px padding each side
            maxWidth: '324px', // Ensure consistent max width
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
          {/* Close Button (X) */}
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
              zIndex: 10,
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
              onNavigate('/');
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
            // FIXED: Container positioning only - individual items handle their own opacity
            transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, -20px, 0)',
            opacity: 1, // Always visible - let children control their own opacity
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: showMenu ? '0.2s' : '0s',
            // Hardware acceleration for smooth animations
            willChange: 'opacity',
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
              // FIXED: Smooth float/ease animation - Events (1st item) - ENHANCED SPECIFICITY
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.3s' : '0s',
              // Hardware acceleration for smooth text animations
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              // Improve text rendering
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
              // FIXED: Smooth float/ease animation - About (2nd item) - ENHANCED SPECIFICITY
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.4s' : '0s',
              // Hardware acceleration for smooth text animations
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              // Improve text rendering
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
              // FIXED: Smooth float/ease animation - Contact (3rd item) - ENHANCED SPECIFICITY
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.5s' : '0s',
              // Hardware acceleration for smooth text animations
              willChange: 'opacity',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              // Improve text rendering
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            Contact
          </div>

          {/* Social Media Buttons in Navigation */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 25px 0px 25px', // FIXED: Reduced top padding to push buttons higher
              // FIXED: Smooth float/ease animation - Social Media (4th item) - ENHANCED SPECIFICITY
              transform: showMenu ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)',
              opacity: showMenu ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.6s' : '0s',
              willChange: 'opacity',
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
