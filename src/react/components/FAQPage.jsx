import React, { useEffect, useMemo, useState, Suspense } from 'react';
import { sanitizeRichText, toPlainText, preloadSanitizer } from '../utils/sanitizer';
import { fetchWithTimeout } from '../utils/iab';
import { usePerformantResize } from '../hooks/usePerformantResize';
import BrandedLoader from './BrandedLoader';
import DesktopNavigationPills from './DesktopNavigationPills';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';

import { DEFAULT_SEO_SETTINGS } from '../services/seoService';
import { initializeBreadcrumbSchema } from '../utils/breadcrumbSchema';

const FAQPage = () => {
  // 🚨 HOMEPAGE CONSISTENCY: Use same responsive system as homepage
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNavTab, setActiveNavTab] = useState('FAQ');
  const [faqItems, setFaqItems] = useState([]);
  const [contentError, setContentError] = useState(null);
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

    console.log(`🎯 FAQ page responsive scaling: ${scale.toFixed(3)} for viewport ${currentViewportWidth}px (max 1.8x, container: 1192px)`, scaledDimensions);
    console.log('📱 FAQ Page Device Detection:', {
      viewportWidth: currentViewportWidth,
      isMobileByUA,
      finalDecision: deviceIsMobile ? 'MOBILE' : 'DESKTOP'
    });
  });

  // 🚀 SEO FIX: Removed hardcoded meta tags - now using SEO service from SEOContext
  // The SEOProvider automatically detects the /faq page and applies dashboard settings
  // via the seoService.js detectPageType() and getPageSpecificSEO() functions
  useEffect(() => {
    const siteUrl = 'https://hardline.events';
    const pageUrl = `${siteUrl}/faq`;

    // JSON-LD FAQPage
    // ✅ SEO FIX: Only inject schema when we have FAQ items to avoid "Missing field 'mainEntity'" error
    const ldId = 'ld-json-faq';
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();

    if (faqItems && faqItems.length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = ldId;
      // FAQ structured data - will be updated when faqItems are loaded
      const faqs = faqItems.map(i => ({
        '@type': 'Question',
        'name': i.qText || i.q, // Use plain text for schema (no HTML)
        'acceptedAnswer': { '@type': 'Answer', 'text': i.a }
      }));
      script.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': faqs });
      document.head.appendChild(script);
      console.log('✅ FAQ Schema injected with', faqs.length, 'questions');
    } else {
      console.log('⏳ Waiting for FAQ items before injecting schema...');
    }

    // ✅ SEO FIX: Breadcrumb schema is now injected server-side to prevent duplicates
    // Server-side rendering in renders.handler.js includes BreadcrumbList in @graph
  }, [faqItems]); // Update structured data when FAQ items change

  // Reset document.title on unmount so homepage title restores correctly
  useEffect(() => {
    const defaultTitle = DEFAULT_SEO_SETTINGS?.default_title || 'HARDLINE - Premium Event Platform';
    return () => {
      document.title = defaultTitle;
    };
  }, []);

  // 🚨 API INTEGRATION: Load FAQ items from backend (following About page pattern)
  useEffect(() => {
    const loadFAQContent = async () => {
      try {
        console.log('📥 Loading FAQ content from API...');

        // CRITICAL FIX: Use local proxy endpoint instead of direct cross-origin request
        // The backend at /api/settings/faq proxies to the dashboard server
        // 🔧 IAB FIX: hard 8s timeout so a stalled in-app-browser connection
        // can't pin the fullscreen loader forever; catch below falls back
        // to default FAQ content.
        const response = await fetchWithTimeout(`/api/settings/faq?ts=${Date.now()}` , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }, 8000);

        if (response.ok) {
          const result = await response.json();
          console.log('✅ FAQ content loaded from API:', result);

          if (result.success && result.data) {
            // Transform API data to component format
            const transformedFAQs = result.data.map(faq => ({
              q: faq.question,
              qText: toPlainText(faq.question_html || faq.question), // Clean text title (no HTML)
              qHtml: faq.question_html || faq.question,
              a: faq.answer,
              aHtml: faq.answer_html || faq.answer,
              id: faq.id,
              display_order: faq.display_order
            }));

            setFaqItems(transformedFAQs);
            setContentError(null);
            console.log('✅ FAQ items set:', transformedFAQs.length);
          } else {
            throw new Error('Invalid API response format');
          }
        } else {
          throw new Error(`API responded with ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('❌ Error loading FAQ content from API:', error);
        console.log('🔄 Falling back to default FAQ content...');

        // Fallback to default content if API is unavailable
        const defaultFaqItems = [
          {
            q: "What is HARDLINE?",
            a: "HARDLINE is a premium live music events platform that connects artists with fans through exclusive experiences and seamless ticket sales."
          },
          {
            q: "How do I buy tickets?",
            a: "Tickets can be purchased directly through our platform. Simply browse events, click 'Get Tickets' on any event card, and complete your purchase through our secure checkout process."
          },
          {
            q: "What payment methods do you accept?",
            a: "We accept all major credit cards, PayPal, and Apple Pay for secure and convenient transactions."
          },
          {
            q: "Is HARDLINE mobile-friendly?",
            a: "Yes, HARDLINE features a mobile-first design optimized for iOS Safari and all browsers, providing a seamless mobile experience for event discovery and ticket purchasing."
          },
          {
            q: "How do I contact HARDLINE?",
            a: "You can reach us at info@hardline.events for general inquiries or info@hardline.events for event-related questions and artist promotion opportunities."
          }
        ];

        setFaqItems(defaultFaqItems);
        setContentError('Using default FAQ content. API connection unavailable.');
      } finally {
        setIsLoading(false);
      }
    };

    // Preload DOMPurify early to minimize any chance of HTML tag flash
    preloadSanitizer();
    loadFAQContent();
  }, []);

  // Accordion state with smooth animations
  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (idx) => setOpenIndex(prev => prev === idx ? null : idx);

  // Navigation handler for DesktopNavigation component
  const handleNavigation = (tabName) => {
    setActiveNavTab(tabName);
    console.log(`🧭 FAQ Page Navigation: Switched to ${tabName} tab`);
  };

  // 🚨 MATCH ABOUT PAGE: Use exact same loading pattern and timing
  if (isLoading) {
    return (
      <BrandedLoader
        fullScreen={true}
        minDisplayTime={800}
        showMessage={false}
      />
    );
  }

  if (isMobile) {
    const FAQPageMobile = React.lazy(() => import('./FAQPageMobile'));
    return (
      <Suspense fallback={
        <BrandedLoader
          fullScreen={true}
          minDisplayTime={300}
          showMessage={false}
        />
      }>
        <FAQPageMobile />
      </Suspense>
    );
  }

  // 🚨 MATCH ABOUT PAGE: Use exact same desktop layout structure and styling
  return (
    <>
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
          {/* Group 4 - B2B Logo Nav - MATCH AboutPage */}
          <img
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            src="/images/figma-exact/b2b-logo-nav.svg"
            alt="Hardline Logo"
            loading="lazy"
            decoding="async"
            fetchPriority="high"
            onClick={() => {
              if (window.navigateWithTransition) {
                window.navigateWithTransition('/');
              } else {
                window.location.href = '/';
              }
            }}
            style={{
              width: '180px',
              height: '56px',
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
            currentPage="FAQ"
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
              { name: 'FAQ' }
            ]}
          />
        </div>

        {/* Page Title - MATCH SHOPPAGE */}
        <div
          style={{
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '32px',
            fontWeight: '600',
            textAlign: 'left',
            marginBottom: '16px',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
            letterSpacing: '-0.02em'
          }}
        >
          FAQ
        </div>

        {/* FAQ Content Section - Transparent container (no outer card) */}
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            background: 'transparent',
            backdropFilter: 'none',
            WebkitBackdropFilter: 'none',
            border: 'none',
            borderRadius: 0,
            boxSizing: 'border-box',
            opacity: 0,
            animation: 'fadeInUp 0.6s ease-out 0.2s forwards'
          }}
        >

          {/* Error State */}
          {contentError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              color: 'rgba(239, 68, 68, 0.9)',
              fontFamily: 'Inter',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {contentError}
            </div>
          )}

          {/* FAQ Accordion Items */}
          <div style={{ marginTop: '0px' }}>
            {faqItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} style={{
                  background: 'rgba(22, 22, 22, 0.4)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(56, 56, 56, 0.3)',
                  borderRadius: '16px',
                  marginBottom: '12px',
                  overflow: 'hidden',
                  transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform, opacity',
                  transform: isOpen ? 'translateZ(0) scale(1.01)' : 'translateZ(0) scale(1)',
                  boxShadow: isOpen ? '0 8px 24px rgba(0,0,0,0.25)' : '0 4px 12px rgba(0,0,0,0.15)',
                  opacity: 0,
                  animation: `fadeInUp 0.4s ease-out ${0.1 + idx * 0.05}s forwards`
                }}>
                  <button
                    onClick={() => toggleIndex(idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'transparent',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '18px',
                      fontWeight: '600',
                      fontFamily: 'Inter',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      minHeight: '44px', // 🚨 ACCESSIBILITY: 44px minimum touch target
                      transition: 'background-color 0.2s ease',
                      outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.outline = '2px solid rgba(255, 255, 255, 0.35)';
                      e.currentTarget.style.outlineOffset = '2px';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.outline = 'none';
                    }}
                    id={`faq-question-${idx}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className="rich-text-content" style={{ flex: 1, paddingRight: '16px' }}>{item.qText}</span>
                    <span style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      willChange: 'transform'
                    }}>▼</span>
                  </button>

                  {/* Accordion Content with Smooth Height Animation */}
                  <div
                    id={`faq-answer-${idx}`}
                    style={{
                      maxHeight: isOpen ? '1000px' : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), padding 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      willChange: 'max-height, padding'
                    }}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                  >
                    <div style={{
                      padding: isOpen ? '12px 24px 24px' : '0 24px 0',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontFamily: 'Inter',
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(4px)',
                      borderTop: '1px solid rgba(56, 56, 56, 0.3)',
                      borderTopColor: isOpen ? 'rgba(56, 56, 56, 0.3)' : 'rgba(56, 56, 56, 0.0)',
                      transition: 'opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, border-top-color 0.28s ease 0.04s, padding 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>
                      <div className="faq-answer-scroll"><div className="rich-text-content" dangerouslySetInnerHTML={{ __html: sanitizeRichText(item.aHtml || item.a) }} /></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {faqItems.length === 0 && !contentError && (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'Inter',
              fontSize: '16px'
            }}>
              No FAQ items available at the moment.
            </div>
          )}
        </div>
        </div>
      </div>

        {/* Footer */}
        <Footer compact={false} />

      </div>

    {/* 🚨 MATCH ABOUT PAGE: Add fadeInUp animation keyframes */}
    <style>{`
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

      /* 🚨 ACCESSIBILITY: Respect reduced motion preference */
      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
    </>
  );
};

export default FAQPage;

