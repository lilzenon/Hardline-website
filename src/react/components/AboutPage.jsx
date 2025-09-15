import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useViewportDimensions } from '../hooks/usePerformantResize';

// Lazy load the gallery component for better performance
const DomeGallery = lazy(() => import('./ui/DomeGallery'));

const AboutPage = () => {
  // FIXED: Use useViewportDimensions to avoid circular dependency
  const { isMobile: isMobileByWidth, width: viewportWidth } = useViewportDimensions();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState('About');
  const [aboutContent, setAboutContent] = useState('');
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState(null);
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

  // Mobile detection effect - FIXED: Added proper dependencies
  useEffect(() => {
    const detectDevice = () => {
      // Check user agent for mobile devices
      const userAgent = navigator.userAgent || '';
      const isMobileByUA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

      // Device is mobile if either condition is true OR viewport is <= 768px
      const deviceIsMobile = isMobileByWidth || isMobileByUA || viewportWidth <= 768;

      setIsMobile(deviceIsMobile);
      setIsLoading(false);

      console.log('📱 About Page Device Detection:', {
        viewportWidth,
        isMobileByWidth,
        isMobileByUA,
        finalDecision: deviceIsMobile ? 'MOBILE' : 'DESKTOP'
      });
    };

    // Run detection whenever viewport dimensions change
    detectDevice();
  }, [isMobileByWidth, viewportWidth]); // FIXED: Added dependencies to trigger on viewport changes

  // FIXED: Use viewport dimensions from useViewportDimensions hook for responsive calculations
  useEffect(() => {
    const updateScaling = () => {
      // Base dimensions for scaling calculations
      const availableWidth = viewportWidth - 32; // Account for 16px padding on each side
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

    updateScaling();
  }, [viewportWidth]); // Depend on viewportWidth from useViewportDimensions

  // Fetch About page content from API
  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setContentLoading(true);
      setContentError(null);

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
      setContentError(error.message);
      // Set fallback content
      setAboutContent(`Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.

Our platform brings together top artists, intimate venues, and discerning audiences to create magical moments that resonate long after the last note fades. From emerging talents to established performers, we curate events that celebrate the power of live music.

At BOUNCE2BOUNCE, we believe that great music deserves great experiences. That's why we've built a seamless platform that makes discovering, booking, and attending premium events effortless and exciting.

Join our community of music enthusiasts and discover your next favorite artist, your next unforgettable night, and your next reason to fall in love with live music all over again.`);
    } finally {
      setContentLoading(false);
    }
  };

  // Format content with proper paragraphs
  const formatContent = (content) => {
    if (!content) return [];

    // Split by double newlines or single newlines and filter empty strings
    const paragraphs = content.split(/\n\s*\n|\n/).filter(p => p.trim());

    return paragraphs.map((paragraph, index) => (
      <p key={index} style={{
        margin: index === paragraphs.length - 1 ? '0' : '0 0 24px 0',
        fontSize: '18px',
        lineHeight: '1.7',
        color: 'rgba(255, 255, 255, 0.9)'
      }}>
        {paragraph.trim()}
      </p>
    ));
  };

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

  // 🚀 FIXED: Render mobile component directly instead of redirecting
  if (isMobile) {
    // Import and render mobile component directly to avoid infinite redirects
    const AboutPageMobile = React.lazy(() => import('./AboutPageMobile'));
    return (
      <React.Suspense fallback={
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: '20px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          zIndex: 9999,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          opacity: 0.9
        }}>
          Loading about page...
        </div>
      }>
        <AboutPageMobile />
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

          {/* Content Area - Dynamic About Content */}
          <div
            style={{
              width: '100%',
              maxWidth: '800px',
              margin: '48px auto 0 auto',
              background: 'rgba(22, 22, 22, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(56, 56, 56, 0.3)',
              borderRadius: '24px',
              padding: '40px',
              boxSizing: 'border-box'
            }}
          >
            {contentLoading ? (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                Loading content...
              </div>
            ) : (
              <>
                <div style={{
                  textAlign: 'left'
                }}>
                  {formatContent(aboutContent)}
                </div>
                {contentError && (
                  <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: 'rgba(255, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 0, 0, 0.3)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    Note: Using fallback content due to connection issue.
                  </div>
                )}
              </>
            )}
          </div>

          {/* Gallery Section - Dome Gallery */}
          <div
            style={{
              width: '100%',
              maxWidth: '1200px',
              margin: '48px auto 0 auto',
              padding: '0 16px',
              boxSizing: 'border-box'
            }}
          >
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '32px',
                lineHeight: '1.3em',
                marginBottom: '32px',
                textAlign: 'center'
              }}
            >
              Gallery
            </div>

            <div style={{
              height: '500px',
              width: '100%',
              position: 'relative'
            }}>
              <Suspense fallback={
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '450px',
                  color: '#FFFFFF',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  opacity: 0.7,
                  background: 'rgba(22, 22, 22, 0.8)',
                  borderRadius: '16px',
                  border: '1px solid rgba(56, 56, 56, 0.3)'
                }}>
                  Loading gallery...
                </div>
              }>
                <DomeGallery
                  images={[
                    {
                      src: "https://picsum.photos/id/1015/600/900",
                      alt: "Event Highlights"
                    },
                    {
                      src: "https://picsum.photos/id/1011/600/750",
                      alt: "Live Performances"
                    },
                    {
                      src: "https://picsum.photos/id/1020/600/800",
                      alt: "Venue Atmosphere"
                    },
                    {
                      src: "https://picsum.photos/id/1025/600/700",
                      alt: "Behind the Scenes"
                    },
                    {
                      src: "https://picsum.photos/id/1035/600/650",
                      alt: "Community"
                    },
                    {
                      src: "https://picsum.photos/id/1040/600/850",
                      alt: "Production"
                    },
                    {
                      src: "https://picsum.photos/id/1050/600/600",
                      alt: "Special Moments"
                    },
                    {
                      src: "https://picsum.photos/id/1060/600/750",
                      alt: "Future Events"
                    }
                  ]}
                  segments={34}
                  fit={0.6}
                  minRadius={400}
                  maxRadius={800}
                  overlayBlurColor="rgba(22, 22, 22, 0.8)"
                  imageBorderRadius="16px"
                  openedImageBorderRadius="16px"
                  openedImageWidth="500px"
                  openedImageHeight="600px"
                  grayscale={false}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default AboutPage;
