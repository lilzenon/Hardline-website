import React, { useState, useEffect, useRef } from 'react';
import { navigateTo } from '../utils/navigate';
import MobileNavigation from './MobileNavigation';
import { useNavHeight } from '../hooks/useNavHeight';
import MasonryGallery from './ui/MasonryGallery';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';
import { DEFAULT_SEO_SETTINGS } from '../services/seoService';
import { injectAboutGalleryJsonLd, removeAboutGalleryJsonLd } from '../utils/aboutGalleryJsonLd';
import { readAboutSeed, normalizeGalleryImages, galleryFingerprint, runWhenIdle } from '../utils/aboutSeed';

/**
 * Mobile-only About page component with shared navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const AboutPageMobile = () => {
  // Server-inlined seed (see utils/aboutSeed.js). When present the first React
  // frame already holds the real text and the full gallery list, so every tile
  // reserves its height immediately and nothing shifts as data arrives.
  const [seed] = useState(readAboutSeed);
  const [aboutContent, setAboutContent] = useState(() => {
    if (seed && seed.aboutContent) return seed.aboutContent;
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('b2b_about_content');
        return cached || '';
      }
    } catch (e) { }
    return '';
  });
  const [loading, setLoading] = useState(() => !(seed && seed.aboutContent));
  const [error, setError] = useState(null);
  const [galleryImages, setGalleryImages] = useState(() => {
    if (seed && seed.galleryImages.length > 0) return seed.galleryImages;
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('b2b_gallery_images');
        // Stored lists may predate the no-cache-buster change; re-normalise so
        // stale `cb=` suffixes are dropped and URLs stay absolute.
        return cached ? normalizeGalleryImages(JSON.parse(cached)) : [];
      }
    } catch (e) { }
    return [];
  });
  // REMOVED: showMenu state - no longer needed after removing old navigation
  const contentRef = useRef(null);
  const aboutContentRef = useRef(null);
  const navHeight = useNavHeight();
  const iosScrollStateRef = useRef({ startY: 0, lastY: 0 });

  const topSpacer = Math.max(navHeight || 0, 0);

  // Viewport context state for dynamic spacing (matching FigmaMobile.jsx)
  const [viewportContext, setViewportContext] = useState(0);

  // No scroll-position state here on purpose: the old useOptimizedScroll call
  // re-rendered this whole page while scrolling to feed a `scrollY` prop that
  // MobileNavigation never read — pure jank.

  // 🚀 SEO FIX: Removed hardcoded meta tags - now using SEO service from SEOContext
  // The SEOProvider automatically detects the /about page and applies dashboard settings
  // via the seoService.js detectPageType() and getPageSpecificSEO() functions
  useEffect(() => {
    const siteUrl = 'https://hardline.events';
    const pageUrl = `${siteUrl}/about`;

    // Define SEO variables for JSON-LD structured data
    const description = DEFAULT_SEO_SETTINGS?.about_page_description || 'Learn about HARDLINE - NJ\'s premiere EDM collective curating exclusive live music events.';
    const ogImage = DEFAULT_SEO_SETTINGS?.about_page_og_image || `${siteUrl}/images/og-image.png`;

    const ldId = 'ld-json-about';
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = ldId;
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', 'name': 'HARDLINE', 'url': siteUrl, 'logo': `${siteUrl}/images/og-image.png` },
        { '@type': 'AboutPage', 'name': 'About HARDLINE', 'url': pageUrl, 'description': description, 'isPartOf': { '@type': 'WebSite', 'name': 'HARDLINE', 'url': siteUrl }, 'primaryImageOfPage': { '@type': 'ImageObject', 'url': ogImage } }
      ]
    });
    document.head.appendChild(script);
  }, []);

  // Handle viewport changes for dynamic spacing (matching FigmaMobile.jsx)
  useEffect(() => {
    const handleViewportChange = () => {
      // Force re-calculation of dynamic spacing when viewport changes
      setViewportContext(prev => prev + 1);
    };

    // Listen for resize events that might indicate viewport context changes
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, []);
  // iOS Safari pull-to-refresh guard on the scroll container
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ua = navigator.userAgent || '';
    const isIOSSafari = /iPhone|iPad|iPod/.test(ua) && /Safari/.test(ua) && !/Chrome/.test(ua);
    if (!isIOSSafari) return;

    const onTouchStart = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      iosScrollStateRef.current.startY = t.clientY;
      iosScrollStateRef.current.lastY = t.clientY;
    };

    const onTouchMove = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;

      // If interacting with the inner About content scroll area, don't interfere
      if (aboutContentRef.current && e.target && aboutContentRef.current.contains(e.target)) {
        return;
      }

      const dy = t.clientY - iosScrollStateRef.current.lastY;
      iosScrollStateRef.current.lastY = t.clientY;

      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      // Prevent iOS pull-to-refresh (downward swipe at top) and rubber-band at bottom on the main container only
      if ((atTop && dy > 0) || (atBottom && dy < 0)) {
        e.preventDefault();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);


  useEffect(() => {
    if (!seed) {
      // No server seed (older cached HTML, admin outage, dev server): fetch now.
      fetchAboutContent();
      fetchGalleryImages();
      return undefined;
    }
    // Seeded: the content on screen is already current as of the server render.
    // Revalidate off the critical path (after load + idle) and only touch state
    // if something actually changed, so images never remount for nothing.
    return runWhenIdle(() => {
      fetchAboutContent();
      fetchGalleryImages();
    });
  }, []);

  // Inject ImageObject JSON-LD for About gallery images on mobile
  useEffect(() => {
    injectAboutGalleryJsonLd(galleryImages);
    return () => {
      removeAboutGalleryJsonLd();
    };
  }, [galleryImages]);

  const fetchAboutContent = async () => {
    try {
      // Only show the skeleton when there is nothing to show yet.
      if (!aboutContent) setLoading(true);
      setError(null);

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

      if (data.success && data.data && typeof data.data.content === 'string') {
        // Same text as already rendered -> no state change, no re-render.
        setAboutContent((prev) => (prev === data.data.content ? prev : data.data.content));
        try { localStorage.setItem('b2b_about_content', data.data.content); } catch (e) { }
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('❌ Error fetching About page content:', error);

      // 🔧 FIX: Only use fallback if we don't have cached content
      if (!aboutContent) {
        const staticContent = `HARDLINE is New Jersey's premiere electronic music collective, dedicated to curating exclusive live music events and creating unforgettable experiences for music lovers.

Our mission is to unite top talent, immersive production, and passionate fans to create the ultimate electronic music experiences in the tri-state area.`;

        setAboutContent(staticContent);
        console.log('✅ Using static fallback content for About page (API blocked or unavailable)');
      }
      // Don't set error state - just use fallback content silently

    } finally {
      setLoading(false);
    }
  };
  const fetchGalleryImages = async () => {
    try {
      // Plain GET through the local proxy, which serves the same cached list the
      // server used. No `cb=Date.now()` and no `cache: 'no-cache'`: the old
      // cache-buster was also stamped onto every image URL, so the browser
      // re-downloaded the whole gallery on every visit.
      const response = await fetch('/api/settings/about/gallery/public', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        console.warn('Failed to fetch gallery images:', response.status);
        return; // keep whatever is on screen
      }
      const data = await response.json();
      if (!data.success || !Array.isArray(data.data)) {
        console.warn('Invalid gallery response format:', data);
        return;
      }
      const normalized = normalizeGalleryImages(data.data);
      // Only re-render (and remount images) when the rendered set changed.
      setGalleryImages((prev) => (galleryFingerprint(prev) === galleryFingerprint(normalized) ? prev : normalized));
      try { localStorage.setItem('b2b_gallery_images', JSON.stringify(normalized)); } catch (e) { }
    } catch (error) {
      console.error('❌ Error fetching gallery images:', error);
      // Keep whatever is on screen (seed / cached list) rather than blanking the gallery.
    }
  };

  // Format content with proper paragraphs
  const formatContent = (content) => {
    if (!content) return [];

    // Split by double newlines or single newlines and filter empty strings
    const paragraphs = content.split(/\n\s*\n|\n/).filter(p => p.trim());

    return paragraphs.map((paragraph, index) => (
      <p key={index} style={{ marginBottom: index === paragraphs.length - 1 ? '0' : '20px' }}>
        {paragraph.trim()}
      </p>
    ));
  };

  // 🚀 INSTANT: Direct navigation without any delays
  const handleNavigation = (path) => {
    if (path === '/about') {
      // Already on about page, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Client-side navigation — see src/react/utils/navigate.js. This was a
    // full document load, which wiped every client cache on each nav.
    navigateTo(path);
  };

  return (
    <>
      {/* Mobile-specific CSS */}
      <style>
        {`
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          
          .skeleton-shimmer {
            background: linear-gradient(90deg, 
              rgba(22, 22, 22, 0.8) 25%, 
              rgba(56, 56, 56, 0.4) 50%, 
              rgba(22, 22, 22, 0.8) 75%
            );
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 4px;
          }

          .mobile-content-fade {
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* REMOVED: Mobile navigation CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Mobile nav item CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Mobile menu button CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Navigation overlay CSS - now handled by shared MobileNavigation component */

          /* Global mobile scroll behavior fixes to prevent pull-to-refresh */
          @media (max-width: 767px) {
            html, body {
              overscroll-behavior-y: contain !important;
              -webkit-overscroll-behavior-y: contain !important;
              overscroll-behavior-x: none !important;
              touch-action: pan-y !important;
            }
          }

          /* Scrolling optimizations (safe defaults to avoid scroll lock) */
          .mobile-content-container {
            -webkit-overflow-scrolling: touch;
            touch-action: pan-y;
          }

          /* Ensure content is scrollable */
          .mobile-content-container::-webkit-scrollbar {
            display: none; /* Hide scrollbar for cleaner look */
          }

          .mobile-content-container {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}
      </style>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000000',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {/* Main Mobile Device Frame - Full Viewport */}
        <div
          style={{
            width: '100%',
            height: '100%', // Fill parent's 100vh
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: '0 auto',
            position: 'relative',
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            touchAction: 'pan-y',
            overscrollBehavior: 'contain'
          }}
          aria-label="Mobile about page content"
        >
          {/* REFACTORED: Using Shared Mobile Navigation Component */}
          <MobileNavigation
            currentPage="about"
            onNavigate={handleNavigation}
          />

          {/* OLD NAVIGATION COMPLETELY REMOVED - Now using shared MobileNavigation component above */}

          {/* Main Content Area - Scrollable Flex Container */}
          <div
            ref={contentRef}
            className="mobile-content-container mobile-content-fade"
            style={{
              flex: '1 1 auto', // Take remaining space in flex container
              width: '100%',
              background: '#000000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: topSpacer, // Dynamic spacing below fixed nav
              boxSizing: 'border-box',
              overflow: 'auto', // Enable scrolling
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
              touchAction: 'pan-y',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
            role="main"
            aria-label="About page content"
          >
            {/* Content Wrapper */}
            <div
              style={{
                width: '100%',
                maxWidth: '430px',
                padding: '0px 24px 0px 24px', // Top padding handled by dynamic nav height
                boxSizing: 'border-box'
              }}
            >
              {/* Breadcrumb - MATCH SHOPPAGEMOBILE */}
              <div style={{ marginTop: '0px', marginBottom: '16px' }}>
                <Breadcrumb
                  items={[
                    { name: 'Home', url: '/' },
                    { name: 'About' }
                  ]}
                />
              </div>

              {/* Page Title - MATCH SHOPPAGEMOBILE */}
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 600,
                  marginBottom: '6px', // Reduced from 16px to bring text closer
                  letterSpacing: '-0.02em',
                  textAlign: 'left',
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  paddingLeft: '0px'
                }}
              >
                About
              </h1>

              {/* About Content */}
              <div
                ref={aboutContentRef}
                className="about-inner-scroll"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  fontSize: '17px', // Increased from 16px for better readability
                  lineHeight: '1.5em',
                  marginBottom: '0px',
                  textAlign: 'left',
                  /* Limit about section height on mobile to surface gallery sooner */
                  maxHeight: 'min(44vh, 380px)',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain',
                  overscrollBehaviorY: 'contain'
                }}
                role="region"
                aria-label="About content"
              >
                {error ? (
                  <div
                    role="alert"
                    aria-live="polite"
                    style={{
                      marginTop: '16px',
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
                    <div className="skeleton-shimmer" style={{ width: '100%', height: '16px' }} />
                    <div className="skeleton-shimmer" style={{ width: '90%', height: '16px' }} />
                    <div className="skeleton-shimmer" style={{ width: '95%', height: '16px' }} />
                    <div className="skeleton-shimmer" style={{ width: '85%', height: '16px' }} />
                  </div>
                ) : (
                  <>{formatContent(aboutContent)}</>
                )}
              </div>

            </div>

            {/* Gallery Section - Mobile Masonry (No title - removed to match desktop) */}
            <div
              style={{
                width: '100%',
                maxWidth: '430px',
                margin: '0 auto',
                marginTop: '24px', // Spacing from about content
                marginBottom: '0px', // Footer handles its own top margin
                padding: '0 24px', // Match page content horizontal padding for consistency
                boxSizing: 'border-box'
              }}
            >
              {galleryImages.length === 0 && !error ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="skeleton-shimmer" style={{ width: '100%', paddingTop: '100%', borderRadius: '12px' }} />
                  ))}
                </div>
              ) : (
                <MasonryGallery
                  images={galleryImages}
                  columns={{ desktop: 3, tablet: 2, mobile: 2 }}
                  gap={12}
                  onImageClick={(image) => {
                    console.log('Mobile image clicked:', image);
                  }}
                />
              )}
            </div>

            {/* Footer Section - Full width footer at natural position */}
            <Footer compact={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPageMobile;
