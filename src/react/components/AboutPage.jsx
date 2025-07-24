import React, { useState, useEffect } from 'react';
import AboutPageMobile from './AboutPageMobile';

const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [activeNavTab, setActiveNavTab] = useState('About');
  const [scaledDimensions, setScaledDimensions] = useState({
    heroWidth: 299,
    heroHeight: 299,
    rightHeroWidth: 498,
    rightHeroHeight: 299,
    gap: 32,
    containerWidth: 825,
    eventsTextGap: 18,
    eventCardWidth: 220,
    eventCardHeight: 85,
    eventsWidth: 440,
    textUsWidth: 299
  });

  // Mobile detection effect
  useEffect(() => {
    const detectDevice = () => {
      // Check viewport width (mobile-first approach)
      const viewportWidth = window.innerWidth;
      const isMobileByWidth = viewportWidth <= 768;

      // Check user agent for mobile devices
      const userAgent = navigator.userAgent || '';
      const isMobileByUA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

      // Device is mobile if either condition is true
      const deviceIsMobile = isMobileByWidth || isMobileByUA;

      setIsMobile(deviceIsMobile);
      setIsLoading(false);

      console.log('📱 About Page Device Detection:', {
        viewportWidth,
        isMobileByWidth,
        isMobileByUA,
        finalDecision: deviceIsMobile ? 'MOBILE' : 'DESKTOP'
      });
    };

    // Initial detection
    detectDevice();

    // Listen for viewport changes
    const handleResize = () => {
      detectDevice();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate responsive dimensions based on viewport - EXACT MATCH to FigmaDesktop
  useEffect(() => {
    const calculateDimensions = () => {
      const currentViewportWidth = window.innerWidth;
      setViewportWidth(currentViewportWidth);

      // Base dimensions for scaling calculations
      const availableWidth = currentViewportWidth - 32; // Account for 16px padding on each side
      const baseHeroWidth = 299;
      const baseHeroHeight = 299;
      const baseRightHeroWidth = 498;
      const baseRightHeroHeight = 299;
      const baseGap = 32;
      const baseContainerWidth = 825; // Fixed container width for alignment
      const containerPadding = 32; // 16px on each side
      const availableContainerWidth = baseContainerWidth - containerPadding; // 793px

      // Calculate scale factor to fit both hero sections and events/text sections
      const totalHeroWidth = baseHeroWidth + baseGap + baseRightHeroWidth; // 829px
      const baseEventsWidth = 440;  // Reduced from 507px to 440px as requested
      const baseTextUsWidth = 299;
      const baseEventsTextGap = 50;  // Increased gap for visible separation
      const totalEventsTextWidth = baseEventsWidth + baseEventsTextGap + baseTextUsWidth; // 789px

      // Use the more restrictive constraint to ensure both sections fit
      const maxRequiredWidth = Math.max(totalHeroWidth, totalEventsTextWidth); // 829px
      let scale = Math.min(availableWidth / maxRequiredWidth, availableContainerWidth / maxRequiredWidth);

      // Apply constraints - keep minimum but add reasonable maximum for desktop
      if (scale < 0.25) scale = 0.25;  // Minimum for small screens
      if (scale > 1.25) scale = 1.25;    // Maximum for desktop (prevents oversized content)

      const scaledDimensions = {
        heroWidth: Math.round(baseHeroWidth * scale),
        heroHeight: Math.round(baseHeroHeight * scale),
        rightHeroWidth: Math.round(baseRightHeroWidth * scale),
        rightHeroHeight: Math.round(baseRightHeroHeight * scale),
        gap: Math.round(baseGap * scale),
        // Container width stays fixed for alignment
        containerWidth: baseContainerWidth,  // Always 825px for perfect alignment
        // Scale events and text sections to match hero scaling
        eventsWidth: Math.round(baseEventsWidth * scale),  // Scale events section width
        textUsWidth: Math.round(baseTextUsWidth * scale),  // Scale text us section width
        eventsTextGap: 18,  // Always 18px gap between Events and Text us
        eventCardWidth: 220,  // Set to 220px as requested
        eventCardHeight: 85   // Always 85px event card height
      };

      setScaledDimensions(scaledDimensions);
      console.log(`🎯 About page scaling: ${scale.toFixed(3)} for viewport ${viewportWidth}px (max 1.25x)`, scaledDimensions);
    };

    // Initial calculation
    calculateDimensions();

    // Debounced resize handler for better performance
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateDimensions, 100); // 100ms debounce
    };

    window.addEventListener('resize', debouncedResize);
    const desktopContent = () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

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

  // Get navigation pill styles based on active state - EXACT MATCH to FigmaDesktop
  const getNavPillStyles = (tabName, leftPosition) => {
    const isActive = activeNavTab === tabName;
    return {
      position: 'absolute',
      left: leftPosition,
      top: '4.15px',    // Scaled up by 15% (3.61 × 1.15)
      display: 'flex',
      width: '82.54px', // Scaled up by 15% (71.77 × 1.15)
      height: '30.81px', // Scaled up by 15% (26.79 × 1.15)
      padding: '13px 12px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      borderRadius: '10px',
      background: isActive ? '#000' : 'transparent',
      boxShadow: isActive ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease', // Smooth animation
      transform: isActive ? 'scale(1)' : 'scale(0.95)', // Subtle scale effect
      opacity: isActive ? 1 : 0.8
    };
  };

  // Get navigation text styles based on active state - EXACT MATCH to FigmaDesktop
  const getNavTextStyles = (tabName) => {
    const isActive = activeNavTab === tabName;
    return {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: isActive ? '300' : '400',
      lineHeight: 'normal',
      transition: 'font-weight 0.3s ease' // Smooth font weight transition
    };
  };

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
          padding: '0 16px',
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
          {/* Group 4 - B2B Logo Nav */}
          <img
            src="/images/figma-exact/b2b-logo-nav.svg"
            alt="B2B Logo"
            loading="lazy"
            decoding="async"
            fetchpriority="high"
            style={{
              width: '138.41px',
              height: '43px'
            }}
          />

          {/* Group 5 - Navigation Pills */}
          <div
            style={{
              position: 'relative',
              width: '260.46px', // Scaled up by 15% (226.49 × 1.15)
              height: '39.1px',  // Scaled up by 15% (34 × 1.15)
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
              width: '260.46px', // Scaled up by 15% (226.49 × 1.15)
              height: '39.1px',  // Scaled up by 15% (34 × 1.15)
              background: '#232323',
              borderRadius: '12px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}
          />

          {/* Events - Scaled up by 15% (3.24 × 1.15) */}
          <div
            style={getNavPillStyles('Events', '3.73px')}
            onClick={() => handleNavClick('Events')}
          >
            <span style={getNavTextStyles('Events')}>
              Events
            </span>
          </div>

          {/* About - Scaled up by 15% (77.03 × 1.15) */}
          <div
            style={getNavPillStyles('About', '88.58px')}
            onClick={() => handleNavClick('About')}
          >
            <span style={getNavTextStyles('About')}>
              About
            </span>
          </div>

          {/* Contact - Scaled up by 15% (150.82 × 1.15) */}
          <div
            style={getNavPillStyles('Contact', '173.44px')}
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
          About Us
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

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px'
        }}
      >
        Loading...
      </div>
    );
  }

  // Serve appropriate component based on device detection
  return isMobile ? <AboutPageMobile /> : desktopContent;
};

export default AboutPage;
