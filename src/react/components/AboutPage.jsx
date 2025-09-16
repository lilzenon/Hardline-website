import React, { useState, useEffect } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';
import MasonryGallery from './ui/MasonryGallery';
import BrandedLoader from './BrandedLoader';

const AboutPage = () => {
  // 🚨 HOMEPAGE CONSISTENCY: Use same responsive system as homepage
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState('About');
  const [aboutContent, setAboutContent] = useState('');
  const [contentError, setContentError] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
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

    console.log(`🎯 About page responsive scaling: ${scale.toFixed(3)} for viewport ${currentViewportWidth}px (max 1.8x, container: 1192px)`, scaledDimensions);
    console.log('📱 About Page Device Detection:', {
      viewportWidth: currentViewportWidth,
      isMobileByUA,
      finalDecision: deviceIsMobile ? 'MOBILE' : 'DESKTOP'
    });
  });

  // Fetch About page content and gallery from API
  useEffect(() => {
    fetchAboutContent();
    fetchGalleryImages();
  }, []);

  const fetchAboutContent = async () => {
    try {
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
        // Don't include credentials for public endpoint
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
      // Content loading is now handled by main loading state
    }
  };

  // Normalize gallery image to ensure absolute, publicly accessible URLs from dashboard API
  const normalizeGalleryImage = (img) => {
    const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';

    // Try to find a candidate URL from common fields
    const candidate = img?.url || img?.src || img?.image_url || img?.file_url || img?.path || img?.imagePath || '';

    // If value is an object (some APIs return { url: '...' }), unwrap
    const orig = typeof candidate === 'string' ? candidate : (candidate?.url || '');

    // 1) Already absolute HTTP URL: return as-is
    if (orig && /^https?:\/\//i.test(orig)) {
      return { ...img, url: orig };
    }

    // 2) New image system: /api/images/serve/:uuid(/:variant?)
    if (orig && orig.includes('/api/images/serve/')) {
      // Ensure variant; default to medium if missing
      const hasVariant = /\/api\/images\/serve\/[a-f0-9-]{36}\/[^/]+/i.test(orig);
      const withVariant = hasVariant ? orig : `${orig.replace(/\/?$/, '')}/medium`;
      // Ensure absolute admin domain prefix
      const absolute = withVariant.startsWith('http') ? withVariant : `${dashboardDomain}${withVariant}`;
      return { ...img, url: absolute };
    }

    // 3) Relative path that looks like a UUID-based file name
    if (orig && orig.startsWith('/') && /[a-f0-9-]{36}/i.test(orig)) {
      const uuidMatch = orig.match(/([a-f0-9-]{36})/i);
      if (uuidMatch) {
        const uuid = uuidMatch[1];
        return { ...img, url: `${dashboardDomain}/api/images/serve/${uuid}/medium` };
      }
    }

    // 4) If the record has a uuid field
    if (img && img.uuid && typeof img.uuid === 'string') {
      return { ...img, url: `${dashboardDomain}/api/images/serve/${img.uuid}/medium` };
    }

    // 5) As a last resort, prefix dashboard domain to relative path
    if (orig && orig.startsWith('/')) {
      return { ...img, url: `${dashboardDomain}${orig}` };
    }

    // Nothing workable found; return original (Masonry will show fallback)
    return img;
  };

  const fetchGalleryImages = async () => {
    try {
      // Determine API base URL based on environment
      const isDevelopment = window.location.hostname === 'localhost';
      const apiBaseUrl = isDevelopment
        ? 'http://localhost:3002'
        : 'https://admin.b2b.click';

      const galleryUrl = `${apiBaseUrl}/api/settings/about/gallery/public`;
      console.log('🔍 Fetching gallery from:', galleryUrl);

      const response = await fetch(galleryUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // 🚨 FIX: Disable caching to ensure fresh data
        cache: 'no-cache'
      });

      if (response.ok) {
        const data = await response.json();
        console.log('🔍 Gallery API Response:', JSON.stringify(data, null, 2));
        if (data.success && Array.isArray(data.data)) {
          console.log('🖼️ First image structure:', data.data[0]);
          const normalized = data.data.map((img, idx) => {
            const n = normalizeGalleryImage(img);
            // Ensure all variant URLs are absolute to the dashboard domain so the homepage can load them
            const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
            const makeAbs = (u) => (u ? (/^https?:\/\//i.test(u) ? u : `${dashboardDomain}${u}`) : u);
            const urls = (n && (n.urls || n.srcSet)) || {};
            const absUrls = {
              thumbnail: makeAbs(urls.thumbnail),
              small: makeAbs(urls.small),
              medium: makeAbs(urls.medium || n?.url),
              large: makeAbs(urls.large),
              original: makeAbs(urls.original || n?.url)
            };
            const withVariants = { ...n, urls: absUrls, srcSet: absUrls };
            if (idx < 5) console.log('🧭 Normalized gallery image', idx, withVariants?.url || withVariants, withVariants.urls);
            return withVariants;
          });
          setGalleryImages(normalized);
        } else {
          console.warn('Invalid gallery response format:', data);
          setGalleryImages([]);
        }
      } else {
        console.warn('Failed to fetch gallery images:', response.status);
        setGalleryImages([]);
      }

    } catch (error) {
      console.error('❌ Error fetching gallery images:', error);
      setGalleryImages([]);
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
    const AboutPageMobile = React.lazy(() => import('./AboutPageMobile'));
    return (
      <React.Suspense fallback={
        <BrandedLoader
          fullScreen={true}
          minDisplayTime={300}
          showMessage={false}
        />
      }>
        <AboutPageMobile />
      </React.Suspense>
    );
  }

  // Desktop content
  return (
    <>
      {/* Modern CSS Animations */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }

          .skeleton-shimmer {
            background: linear-gradient(90deg,
              rgba(22, 22, 22, 0.8) 25%,
              rgba(56, 56, 56, 0.4) 50%,
              rgba(22, 22, 22, 0.8) 75%
            );
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
          }

          .image-hover-scale {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .image-hover-scale:hover {
            transform: scale(1.05);
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>

      <div className="homepage-content" style={{ minHeight: 'auto' }}>
      <div
        className="desktop-container"
        style={{
          width: '100%',
          maxWidth: `${scaledDimensions.containerWidth}px`,
          margin: '0 auto',
          position: 'relative',
          background: '#000000',
          minHeight: 'auto', // 🚨 CRITICAL FIX: Removed 100vh to prevent forced spacing
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
            alt="B2B Logo"
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
            marginTop: '64px',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.2s forwards'
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
              boxSizing: 'border-box',
              opacity: 0,
              animation: 'fadeInUp 0.8s ease-out 0.4s forwards'
            }}
          >
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
          </div>

          {/* Gallery Section - Masonry Layout with Optimized Spacing */}
          <div
            style={{
              marginTop: isMobile ? '0px' : '24px', // CRITICAL FIX: Eliminated mobile spacing completely
              marginBottom: '32px'
            }}
          >
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: isMobile ? '24px' : '32px',
                lineHeight: '1.3em',
                marginBottom: isMobile ? '8px' : '16px', // CRITICAL FIX: Further reduced spacing
                textAlign: 'center',
                opacity: 0,
                animation: 'fadeInUp 0.6s ease-out 0.3s forwards'
              }}
            >
              Gallery
            </div>

            <MasonryGallery
              images={galleryImages}
              columns={{ desktop: 4, tablet: 3, mobile: 2 }}
              gap={isMobile ? 12 : 16}
            />
          </div>

        </div>
      </div>
    </div>
    </>
  );


};

export default AboutPage;
