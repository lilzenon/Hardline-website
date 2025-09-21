import React, { useState, useEffect, useRef } from 'react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';
import MobileNavigation from './MobileNavigation';
import { useNavHeight } from '../hooks/useNavHeight';
import MasonryGallery from './ui/MasonryGallery';

/**
 * Mobile-only About page component with shared navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const AboutPageMobile = () => {
  const [aboutContent, setAboutContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  // REMOVED: showMenu state - no longer needed after removing old navigation
  const contentRef = useRef(null);
  const aboutContentRef = useRef(null);
  const navHeight = useNavHeight();
  const iosScrollStateRef = useRef({ startY: 0, lastY: 0 });

  const topSpacer = Math.max(navHeight || 0, 0) + 12;

  // Viewport context state for dynamic spacing (matching FigmaMobile.jsx)
  const [viewportContext, setViewportContext] = useState(0);

  // 📱 SCROLL SENSITIVITY FIX: Reduced sensitivity to prevent accidental page reloads
  const { scrollY, isScrolled } = useOptimizedScroll(contentRef.current, {
    threshold: 50, // Increased threshold to reduce sensitivity
    throttleMs: 200, // Increased throttling to reduce interference with native scrolling
    passive: true // Ensure completely passive event handling
  });

  // SEO: Page-specific meta tags for About (mobile)
  useEffect(() => {
    const siteUrl = 'https://b2b.click';
    const pageUrl = `${siteUrl}/about`;
    const title = 'About BOUNCE2BOUNCE | Electronic Music Events and Experiences';
    const description = 'Learn about BOUNCE2BOUNCE — curating premium live music events and unforgettable experiences. Discover our mission, story, and how we connect artists and fans.';
    const keywords = 'about bounce2bounce, live music events, edm collective, concerts, event platform, artist community';
    const ogImage = `${siteUrl}/images/og-image.png`;

    const setMeta = (selectorAttr, name, content) => {
      let el = document.head.querySelector(`meta[${selectorAttr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(selectorAttr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    const setLink = (rel, href) => {
      let link = document.head.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', 'index,follow');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'BOUNCE2BOUNCE');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:image', ogImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
    setMeta('name', 'twitter:site', '@bounce2bounce');
    setLink('canonical', pageUrl);

    const ldId = 'ld-json-about';
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = ldId;
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', 'name': 'BOUNCE2BOUNCE', 'url': siteUrl, 'logo': `${siteUrl}/images/og-image.png` },
        { '@type': 'AboutPage', 'name': 'About BOUNCE2BOUNCE', 'url': pageUrl, 'description': description, 'isPartOf': { '@type': 'WebSite', 'name': 'BOUNCE2BOUNCE', 'url': siteUrl }, 'primaryImageOfPage': { '@type': 'ImageObject', 'url': ogImage } }
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
    fetchAboutContent();
    fetchGalleryImages();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      setError(null);

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
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };
  // Normalize gallery image to ensure absolute, publicly accessible URLs from dashboard API (mobile)
  const normalizeGalleryImage = (img) => {
    const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
    const candidate = img?.url || img?.src || img?.image_url || img?.file_url || img?.path || img?.imagePath || '';
    const orig = typeof candidate === 'string' ? candidate : (candidate?.url || '');

    // Absolute HTTP URL
    if (orig && /^https?:\/\//i.test(orig)) {
      return { ...img, url: orig };
    }

    // New image service route: /api/images/serve/:uuid
    if (orig && /^\/?api\/images\/serve\//i.test(orig)) {
      return { ...img, url: `${dashboardDomain}/${orig.replace(/^\//, '')}` };
    }

    // Legacy uploads path handling
    if (orig && /^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(orig)) {
      let pub = orig.replace(/^\/?data\/static\/uploads\//, '/static/uploads/');
      if (!pub.startsWith('/')) pub = `/${pub}`;
      return { ...img, url: `${dashboardDomain}${pub}` };
    }

    // Fallback - return as-is
    return { ...img, url: orig };
  };


  const fetchGalleryImages = async () => {
    try {
      // Determine API base URL based on environment
      const isDevelopment = window.location.hostname === 'localhost';
      const apiBaseUrl = isDevelopment
        ? 'http://localhost:3002'
        : 'https://admin.b2b.click';

      const cacheBuster = `cb=${Date.now()}`;
      const response = await fetch(`${apiBaseUrl}/api/settings/about/gallery/public?${cacheBuster}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Public endpoint; disable cache to avoid stale responses
        cache: 'no-cache'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const normalized = data.data.map((img) => {
            const n = normalizeGalleryImage(img);
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
            return { ...n, urls: absUrls, srcSet: absUrls };
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

    // INSTANT navigation - no loading states, no delays
    window.location.href = path;
  };

  return (
    <>
      {/* Mobile-specific CSS */}
      <style>
        {`
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
        {/* Main Mobile Device Frame - 430x932 */}
        <div
          style={{
            width: '430px',
            height: '932px',
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
            scrollY={scrollY}
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
            {/* Page Title */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '32px',
                lineHeight: '1.2em',
                marginBottom: '24px',
                textAlign: 'center'
              }}
            >
              About
            </div>

            {/* About Content */}
            <div
              ref={aboutContentRef}
              className="about-inner-scroll"
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '16px',
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
              ) : (
                <>{formatContent(aboutContent)}</>
              )}
            </div>

            </div>

            {/* Gallery Section - Mobile Masonry */}
            <div
              style={{
                width: '100%',
                maxWidth: '430px',
                margin: '0 auto',
                marginTop: '0px',
                marginBottom: '24px',
                padding: '0 24px', // Match page content horizontal padding for consistency
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
                  marginTop: '8px',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}
              >
                Gallery
              </div>

              <MasonryGallery
                images={galleryImages}
                columns={{ desktop: 3, tablet: 2, mobile: 2 }}
                gap={12}
                onImageClick={(image) => {
                  console.log('Mobile image clicked:', image);
                }}
              />
            </div>

            {/* Content Wrapper Continued */}
            <div
              style={{
                width: '100%',
                maxWidth: '430px',
                padding: '0 24px 80px 24px',
                boxSizing: 'border-box',
                margin: '0 auto'
              }}
            >


            </div>
          </div>
        </div>

        {/* OLD NAVIGATION OVERLAY COMPLETELY REMOVED - Now using shared MobileNavigation component above */}

      </div>
    </>
  );
};

export default AboutPageMobile;
