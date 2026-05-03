import React, { useState, useEffect } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';
import BrandedLoader from './BrandedLoader';

const ContactPage = () => {
  // 🚨 HOMEPAGE CONSISTENCY: Use same responsive system as homepage
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState('Contact');
  const [scaledDimensions, setScaledDimensions] = useState({
    heroWidth: 299,
    heroHeight: 299,
    rightHeroWidth: 498,
    rightHeroHeight: 299,
    gap: 32,
    containerWidth: 1192, // 🚨 MATCH HOMEPAGE: Updated from 825px to 1192px for consistency
    eventsTextGap: 18,
    eventCardWidth: 220,
    eventCardHeight: 85,
    eventsWidth: 380, // 🚨 MATCH HOMEPAGE: Updated from 440px to 380px
    textUsWidth: 380, // 🚨 MATCH HOMEPAGE: Updated from 299px to 380px
    scale: 1
  });

  // 🚨 HOMEPAGE CONSISTENCY: Use exact same responsive scaling system as homepage
  const { width: viewportWidth } = usePerformantResize((dimensions) => {
    const { width: currentViewportWidth } = dimensions;
    const padding = currentViewportWidth <= 360 ? 16 : currentViewportWidth <= 480 ? 24 : 32;
    const availableWidth = currentViewportWidth - padding;

    // 🚨 MATCH HOMEPAGE: Base dimensions from homepage FigmaDesktop.jsx
    const baseHeroWidth = 299;
    const baseHeroHeight = 299;
    const baseRightHeroWidth = 498;
    const baseRightHeroHeight = 299;
    const baseGap = 32;
    const baseContainerWidth = 1192; // 🚨 MATCH HOMEPAGE: Same as homepage
    const containerPadding = 48; // 🚨 MATCH HOMEPAGE: Increased padding for larger container (24px on each side)
    const availableContainerWidth = baseContainerWidth - containerPadding; // 1144px (1192px - 48px)

    // 🚨 MATCH HOMEPAGE: Calculate scale factor to fit both hero sections and events/text sections
    const totalHeroWidth = baseHeroWidth + baseGap + baseRightHeroWidth; // 829px
    const baseEventsWidth = 380;  // 🚨 MATCH HOMEPAGE: Further reduced to make it more compact
    const baseTextUsWidth = 380;  // 🚨 MATCH HOMEPAGE: Match Events section base width exactly
    const baseEventsTextGap = 40;  // 🚨 MATCH HOMEPAGE: Reduced gap slightly
    const totalEventsTextWidth = baseEventsWidth + baseEventsTextGap + baseTextUsWidth; // 800px

    // Use the more restrictive constraint to ensure both sections fit
    const maxRequiredWidth = Math.max(totalHeroWidth, totalEventsTextWidth); // 829px
    let scale = Math.min(availableWidth / maxRequiredWidth, availableContainerWidth / maxRequiredWidth);

    // 🚨 MATCH HOMEPAGE: Cap scale at 1.8x to prevent oversized content
    scale = Math.min(scale, 1.8);

    const scaledDimensions = {
      heroWidth: Math.round(baseHeroWidth * scale * 0.90), // 🚨 MATCH HOMEPAGE: Reduce hero size by 10% to align with smaller events section
      heroHeight: Math.round(baseHeroHeight * scale * 0.90), // 🚨 MATCH HOMEPAGE: Reduce hero size by 10% to align with smaller events section
      rightHeroWidth: Math.round(baseRightHeroWidth * scale),
      rightHeroHeight: Math.round(baseRightHeroHeight * scale),
      gap: Math.round(baseGap * scale),
      // Container width stays fixed for alignment
      containerWidth: baseContainerWidth,  // 🚨 MATCH HOMEPAGE: Now 1192px for tighter layout alignment
      // Scale events and text sections to match hero scaling
      eventsWidth: Math.round(baseEventsWidth * scale),  // Scale events section width
      textUsWidth: Math.round(baseTextUsWidth * scale),  // Scale text us section width
      eventsTextGap: Math.round(baseEventsTextGap * scale),  // Scale gap between Events and Text us
      eventCardWidth: 220,  // Set to 220px as requested
      eventCardHeight: 85,   // Always 85px event card height
      scale: scale
    };

    // 🚨 HOMEPAGE CONSISTENCY: Device detection using viewport width
    const userAgent = navigator.userAgent || '';
    const isMobileByUA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const deviceIsMobile = currentViewportWidth <= 768 || isMobileByUA;

    setIsMobile(deviceIsMobile);
    setIsLoading(false);
    setScaledDimensions(scaledDimensions);

    console.log(`🎯 Contact page responsive scaling: ${scale.toFixed(3)} for viewport ${currentViewportWidth}px (max 1.8x, container: 1192px)`, scaledDimensions);
    console.log('📱 Contact Page Device Detection:', {
      viewportWidth: currentViewportWidth,
      isMobileByUA,
      finalDecision: deviceIsMobile ? 'MOBILE' : 'DESKTOP'
    });
  });

  const handleNavClick = (tab) => {
    setActiveNavTab(tab);

    // Navigate to different pages with smooth transitions
    if (tab === 'Events') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/');
      } else {
        window.location.href = '/';
      }
    } else if (tab === 'About') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/about');
      } else {
        window.location.href = '/about';
      }
    } else if (tab === 'Contact') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/contact');
      } else {
        window.location.href = '/contact';
      }
    }
  };

  // 🚨 HOMEPAGE CONSISTENCY: Get navigation pill styles - EXACT MATCH to FigmaDesktop (30% scaling)
  const getNavPillStyles = (tabName, leftPosition) => {
    const isActive = activeNavTab === tabName;
    return {
      position: 'absolute',
      left: leftPosition,
      top: '4.7px',     // 🚨 MATCH HOMEPAGE: Scaled up by 30% (3.61 × 1.30)
      display: 'flex',
      width: '93.3px',  // 🚨 MATCH HOMEPAGE: Scaled up by 30% (71.77 × 1.30) for better touch targets
      height: '34.8px', // 🚨 MATCH HOMEPAGE: Scaled up by 30% (26.79 × 1.30) for better touch targets
      padding: '15px 14px', // 🚨 MATCH HOMEPAGE: Increased padding for better touch area
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      borderRadius: '12px', // 🚨 MATCH HOMEPAGE: Slightly increased border radius
      background: isActive ? '#000' : 'transparent',
      boxShadow: isActive ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease', // Smooth animation
      transform: isActive ? 'scale(1)' : 'scale(0.95)', // Subtle scale effect
      opacity: isActive ? 1 : 0.8
    };
  };

  // 🚨 HOMEPAGE CONSISTENCY: Get navigation text styles - EXACT MATCH to FigmaDesktop
  const getNavTextStyles = (tabName) => {
    const isActive = activeNavTab === tabName;
    return {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '13px', // 🚨 MATCH HOMEPAGE: Increased from 12px to 13px for better readability
      fontWeight: isActive ? '300' : '400',
      lineHeight: 'normal',
      transition: 'font-weight 0.3s ease' // Smooth font weight transition
    };
  };

  // Loading state
  if (isLoading) {
    return (
      <BrandedLoader
        fullScreen={true}
        minDisplayTime={800}
        showMessage={false}
      />
    );
  }

  // 🚀 FIXED: Render mobile component directly instead of redirecting
  if (isMobile) {
    // Import and render mobile component directly to avoid infinite redirects
    const ContactPageMobile = React.lazy(() => import('./ContactPageMobile'));
    return (
      <React.Suspense fallback={
        <BrandedLoader
          fullScreen={true}
          minDisplayTime={300}
          showMessage={false}
        />
      }>
        <ContactPageMobile />
      </React.Suspense>
    );
  }

  // Desktop content
  return (
    <div className="homepage-content">
      <div
        className="desktop-container"
        style={{
          width: '100%',
          maxWidth: `${scaledDimensions.containerWidth}px`,
          margin: '0 auto',
          position: 'relative',
          background: '#000000',
          minHeight: '100vh',
          padding: '0 20px', // 🚨 MATCH HOMEPAGE: INCREASED from 16px to 20px (adding 4px on each side for tighter layout)
          boxSizing: 'border-box'
        }}
      >
        <div style={{ width: '100%', position: 'relative' }}>
        {/* Frame 12 - Navigation - EXACT MATCH to FigmaDesktop */}
        <div
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            width: '100%',
            height: '48px',
            alignItems: 'center',
            margin: '35px 0 0 0'
          }}
        >
          {/* Group 4 - B2B Logo Nav - 🚨 HOMEPAGE CONSISTENCY: Match logo size */}
          <img
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            src="/images/figma-exact/b2b-logo-nav.svg"
            alt="Hardline Logo"
            loading="lazy"
            decoding="async"
            fetchpriority="high"
            onClick={() => {
              if (window.navigateWithTransition) {
                window.navigateWithTransition('/');
              } else {
                window.location.href = '/';
              }
            }}
            style={{
              width: '180px', // 🚨 MATCH HOMEPAGE: Increased from 138.41px for better desktop prominence
              height: '56px', // 🚨 MATCH HOMEPAGE: Increased from 43px proportionally
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.filter = 'brightness(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          />

          {/* Group 5 - Navigation Pills - 🚨 HOMEPAGE CONSISTENCY: Match 30% scaling */}
          <div
            style={{
              position: 'relative',
              width: '294.45px', // 🚨 MATCH HOMEPAGE: Scaled up by 30% (226.49 × 1.30) for better prominence
              height: '44.2px',  // 🚨 MATCH HOMEPAGE: Scaled up by 30% (34 × 1.30) for better touch targets
              gridColumn: '3',  // Place in third column (right side)
              justifySelf: 'end'  // Align to right edge of grid cell
            }}
          >
          {/* Background pill container */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '294.45px', // 🚨 MATCH HOMEPAGE: Scaled up by 30% (226.49 × 1.30)
              height: '44.2px',  // 🚨 MATCH HOMEPAGE: Scaled up by 30% (34 × 1.30)
              background: '#232323',
              borderRadius: '14px', // 🚨 MATCH HOMEPAGE: Slightly increased border radius
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}
          />

          {/* Events - 🚨 MATCH HOMEPAGE: Scaled up by 30% (3.24 × 1.30) */}
          <div
            style={getNavPillStyles('Events', '4.21px')}
            onClick={() => handleNavClick('Events')}
          >
            <span style={getNavTextStyles('Events')}>
              Events
            </span>
          </div>

          {/* About - 🚨 MATCH HOMEPAGE: Scaled up by 30% (77.03 × 1.30) */}
          <div
            style={getNavPillStyles('About', '100.14px')}
            onClick={() => handleNavClick('About')}
          >
            <span style={getNavTextStyles('About')}>
              About
            </span>
          </div>

          {/* Contact - 🚨 MATCH HOMEPAGE: Scaled up by 30% (150.82 × 1.30) */}
          <div
            style={getNavPillStyles('Contact', '196.07px')}
            onClick={() => handleNavClick('Contact')}
          >
            <span style={getNavTextStyles('Contact')}>
              Contact
            </span>
          </div>
        </div>
        </div>

        {/* Page Title */}
        <div
          style={{
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '48px',
            fontWeight: '800',
            textAlign: 'center',
            marginTop: '64px'
          }}
        >
          Contact Us
        </div>

          {/* Content Area - Blank for now */}
          <div
            style={{
              width: '100%',
              minHeight: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#FFF',
              fontSize: '18px',
              opacity: 0.5,
              marginTop: '32px'
            }}
          >
            Content coming soon...
          </div>
        </div>
      </div>
    </div>
  );


};

export default ContactPage;
