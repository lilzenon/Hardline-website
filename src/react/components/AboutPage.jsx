import React, { useState, useEffect } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';
import MasonryGallery from './ui/MasonryGallery';
import BrandedLoader from './BrandedLoader';
import DesktopNavigationPills from './DesktopNavigationPills';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { DEFAULT_SEO_SETTINGS } from '../services/seoService';
import { initializeBreadcrumbSchema } from '../utils/breadcrumbSchema';
import { injectAboutGalleryJsonLd, removeAboutGalleryJsonLd } from '../utils/aboutGalleryJsonLd';

const AboutPage = () => {
  // 🚨 HOMEPAGE CONSISTENCY: Use same responsive system as homepage
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState('About');

  // 🚀 OPTIMIZATION: Initialize from storage for instant load
  const [aboutContent, setAboutContent] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('b2b_about_content');
        return cached || '';
      }
    } catch (e) { }
    return '';
  });

  const [contentError, setContentError] = useState(null);

  // 🚀 OPTIMIZATION: Initialize gallery from storage
  const [galleryImages, setGalleryImages] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('b2b_gallery_images');
        return cached ? JSON.parse(cached) : [];
      }
    } catch (e) { }
    return [];
  });

  const [scaledDimensions, setScaledDimensions] = useState({
    heroWidth: 299,
    heroHeight: 299,
    rightHeroWidth: 498,
    rightHeroHeight: 299,
    gap: 32,
    containerWidth: 1192,
    eventsTextGap: 18,
    eventCardWidth: 220,
    eventCardHeight: 85,
    eventsWidth: 380,
    textUsWidth: 380,
    scale: 1
  });

  // ... (SEO effect omitted for brevity as it is unchanged) ...

  useEffect(() => {
    const siteUrl = 'https://bounce2bounce.com';
    const pageUrl = `${siteUrl}/about`;

    // Define SEO variables for JSON-LD structured data
    const description = DEFAULT_SEO_SETTINGS?.about_page_description || 'Learn about BOUNCE2BOUNCE - NJ\'s premiere EDM collective curating exclusive live music events.';
    const ogImage = DEFAULT_SEO_SETTINGS?.about_page_og_image || `${siteUrl}/images/og-image.png`;

    // JSON-LD Structured Data (AboutPage + Organization)
    const ldId = 'ld-json-about';
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = ldId;
    const ld = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          'name': 'BOUNCE2BOUNCE',
          'url': siteUrl,
          'logo': `${siteUrl}/images/og-image.png`
        },
        {
          '@type': 'AboutPage',
          'name': 'About BOUNCE2BOUNCE',
          'url': pageUrl,
          'description': description,
          'isPartOf': { '@type': 'WebSite', 'name': 'BOUNCE2BOUNCE', 'url': siteUrl },
          'primaryImageOfPage': { '@type': 'ImageObject', 'url': ogImage }
        }
      ]
    };
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);

    // Add BreadcrumbList JSON-LD for clear site hierarchy
    // ✅ SEO FIX: Use "Events" instead of "Home" as position 1 (Google Search Console requirement)
    // ✅ SEO FIX: Use canonical domain bounce2bounce.com instead of b2b.click
    initializeBreadcrumbSchema('about');
  }, []);

  // Reset document.title on unmount so homepage title restores correctly
  useEffect(() => {
    const defaultTitle = DEFAULT_SEO_SETTINGS?.default_title || 'BOUNCE2BOUNCE - Premium Event Platform';
    return () => {
      document.title = defaultTitle;
    };
  }, []);

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

      // CRITICAL FIX: Use local proxy endpoint instead of direct cross-origin request
      // The backend at /api/settings/about proxies to the dashboard server
      // This avoids CORS issues and ensures content is always accessible
      console.log('🔍 Fetching About page content from local proxy...');

      const response = await fetch('/api/settings/about', {
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
        // 💾 Persist to storage for instant load
        try {
          localStorage.setItem('b2b_about_content', data.data.content);
        } catch (e) { }
        console.log('✅ About page content loaded successfully');
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('❌ Error fetching About page content:', error);

      // 🔧 FIX: Only use fallback if we don't have cached content
      if (!aboutContent) {
        const staticContent = `BOUNCE2BOUNCE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`;

        setAboutContent(staticContent);
        console.log('✅ Using static fallback content for About page (API blocked or unavailable)');
      }
      // Don't set error state - just use fallback content silently

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
      // CRITICAL FIX: Use local proxy endpoint instead of direct cross-origin request
      // The backend at /api/settings/about/gallery/public proxies to the dashboard server
      const cacheBuster = `cb=${Date.now()}`;
      const galleryUrl = `/api/settings/about/gallery/public?${cacheBuster}`;
      console.log('🔍 Fetching gallery from local proxy:', galleryUrl);

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
            const makeAbs = (u) => {
              if (!u) return u;
              const abs = /^https?:\/\//i.test(u) ? u : `${dashboardDomain}${u}`;
              const sep = abs.includes('?') ? '&' : '?';
              return `${abs}${sep}${cacheBuster}`;
            };
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
          // 💾 Persist to storage for instant load
          try {
            localStorage.setItem('b2b_gallery_images', JSON.stringify(normalized));
          } catch (e) { }
        } else {
          console.warn('Invalid gallery response format:', data);
          if (galleryImages.length === 0) setGalleryImages([]);
        }
      } else {
        console.warn('Failed to fetch gallery images:', response.status);
        if (galleryImages.length === 0) setGalleryImages([]);
      }

    } catch (error) {
      console.error('❌ Error fetching gallery images:', error);
      if (galleryImages.length === 0) setGalleryImages([]);
    }
  };

  // Inject ImageObject JSON-LD for About gallery images to improve Google Image SEO
  useEffect(() => {
    injectAboutGalleryJsonLd(galleryImages);
    return () => {
      removeAboutGalleryJsonLd();
    };
  }, [galleryImages]);


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

  // Navigation handler for DesktopNavigation component
  const handleNavigation = (tabName) => {
    setActiveNavTab(tabName);
    console.log(`🧭 About Page Navigation: Switched to ${tabName} tab`);
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
            maxWidth: '1400px', // 🚨 MATCH SHOPPAGE: Fixed width instead of dynamic
            margin: '0 auto',
            position: 'relative',
            background: '#000000',
            minHeight: 'auto',
            padding: '0 40px', // 🚨 MATCH SHOPPAGE: Consistent horizontal padding
            boxSizing: 'border-box'
          }}
        >
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Navigation Header - Logo and Pills only - MATCH SHOPPAGE */}
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                width: '100%',
                height: '56px', // Match logo height to prevent overflow
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
                loading="eager"
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

              {/* Reusable Desktop Navigation Component (Pills) */}
              <DesktopNavigationPills
                currentPage="About"
                onNavigate={handleNavigation}
              />
            </div>

            {/* Breadcrumb Row - MATCH SHOPPAGE spacing */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '24px', // Increased for better spacing from nav header
                marginBottom: '8px',
                width: '100%'
              }}
            >
              {/* Breadcrumb Navigation */}
              <Breadcrumb
                items={[
                  { name: 'Home', url: '/' },
                  { name: 'About' }
                ]}
              />
            </div>

            {/* Page Title */}
            <div
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '32px',
                fontWeight: '600',
                textAlign: 'left',
                marginBottom: '2px', // Reduced for tighter spacing with content
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
                letterSpacing: '-0.02em'
              }}
            >
              About
            </div>

            {/* Content Area - Dynamic About Content */}
            <div
              style={{
                width: '100%',
                margin: '0 auto',
                background: 'transparent',
                boxSizing: 'border-box',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.25s forwards' // Faster animation start
              }}
            >
              {contentError ? (
                <div
                  role="alert"
                  aria-live="polite"
                  style={{
                    marginTop: '8px',
                    padding: '16px',
                    background: 'rgba(22, 22, 22, 0.30)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    color: '#FF4D4D',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                >
                  Connection issue — please try again later.
                </div>
              ) : !aboutContent ? (
                /* 🦴 SKELETON LOADER: Show while loading and no cache exists */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '12px' }}>
                  <div className="skeleton-shimmer" style={{ width: '100%', height: '20px', borderRadius: '4px' }} />
                  <div className="skeleton-shimmer" style={{ width: '90%', height: '20px', borderRadius: '4px' }} />
                  <div className="skeleton-shimmer" style={{ width: '95%', height: '20px', borderRadius: '4px' }} />
                </div>
              ) : (
                <div style={{ textAlign: 'left' }}>
                  {formatContent(aboutContent)}
                </div>
              )}
            </div>

            {/* Gallery Section - Masonry Layout */}
            <div
              style={{
                marginTop: '24px', // Tight spacing below about text
                marginBottom: '32px'
              }}
            >
              {galleryImages.length === 0 && !contentError ? (
                /* 🦴 GALLERY SKELETON */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="skeleton-shimmer" style={{ width: '100%', paddingTop: '100%', borderRadius: '12px' }} />
                  ))}
                </div>
              ) : (
                <MasonryGallery
                  images={galleryImages}
                  columns={{ desktop: 4, tablet: 3, mobile: 2 }}
                  gap={isMobile ? 12 : 16}
                />
              )}
            </div>

            {/* Footer */}
            <Footer compact={false} />

          </div>
        </div>
      </div>
    </>
  );


};

export default AboutPage;
