import React, { useEffect, useMemo, useRef, useState } from 'react';
import { sanitizeRichText, toPlainText, preloadSanitizer } from '../utils/sanitizer';
import MobileNavigation from './MobileNavigation';
import { useNavHeight } from '../hooks/useNavHeight';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';


const FAQPageMobile = () => {
  const contentRef = useRef(null);
  const navHeight = useNavHeight();
  const topSpacer = Math.max(navHeight || 0, 0) + 12;
  const iosScrollStateRef = useRef({ startY: 0, lastY: 0 });


  // 📱 SCROLL SENSITIVITY FIX: Reduced sensitivity to prevent accidental page reloads
  const { scrollY } = useOptimizedScroll(contentRef.current, {
    threshold: 50, // Increased threshold to reduce sensitivity
    throttleMs: 200, // Increased throttling to reduce interference with native scrolling
    passive: true
  });

  // ✅ SEO FIX: Removed hardcoded meta tags - now using SEO service from SEOContext
  // The SEOProvider automatically detects the /faq page and applies dashboard settings
  // This ensures consistency between desktop and mobile, and uses bounce2bounce.com domain
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
      const dy = t.clientY - iosScrollStateRef.current.lastY;
      iosScrollStateRef.current.lastY = t.clientY;

      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

      // Prevent iOS pull-to-refresh (downward swipe at top) and rubber-band at bottom
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


  // 🚨 MATCH DESKTOP: Use same FAQ items and API integration pattern
  const [faqItems, setFaqItems] = useState([]);
  const [contentError, setContentError] = useState(null);

  // 🚨 API INTEGRATION: Load FAQ items from backend (following About page pattern)
  useEffect(() => {
    const loadFAQContent = async () => {
      try {
        console.log('📥 Loading FAQ content from API (mobile)...');

        // CRITICAL FIX: Use local proxy endpoint instead of direct cross-origin request
        // The backend at /api/settings/faq proxies to the dashboard server
        const response = await fetch(`/api/settings/faq?ts=${Date.now()}` , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ FAQ content loaded from API (mobile):', result);

          if (result.success && result.data) {
            // Transform API data to component format
            const transformedFAQs = result.data.map(faq => ({
              q: faq.question,
              qText: toPlainText(faq.question_html || faq.question), // Clean text title
              qHtml: faq.question_html || faq.question,
              a: faq.answer,
              aHtml: faq.answer_html || faq.answer,
              id: faq.id,
              display_order: faq.display_order
            }));

            setFaqItems(transformedFAQs);
            setContentError(null);
            console.log('✅ FAQ items set (mobile):', transformedFAQs.length);
          } else {
            throw new Error('Invalid API response format');
          }
        } else {
          throw new Error(`API responded with ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error('❌ Error loading FAQ content from API (mobile):', error);
        console.log('🔄 Falling back to default FAQ content (mobile)...');

        // Fallback to default content if API is unavailable
        const defaultFaqItems = [
          {
            q: "What is BOUNCE2BOUNCE?",
            a: "BOUNCE2BOUNCE is a premium live music events platform that connects artists with fans through exclusive experiences and seamless ticket sales."
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
            q: "Is BOUNCE2BOUNCE mobile-friendly?",
            a: "Yes, BOUNCE2BOUNCE features a mobile-first design optimized for iOS Safari and all browsers, providing a seamless mobile experience for event discovery and ticket purchasing."
          },
          {
            q: "How do I contact BOUNCE2BOUNCE?",
            a: "You can reach us at info@bounce2bounce.com for general inquiries or events@bounce2bounce.com for event-related questions and artist promotion opportunities."
          }
        ];

        setFaqItems(defaultFaqItems);
        setContentError('Using default FAQ content. API connection unavailable.');
      }
    };

    // Preload DOMPurify early to minimize any chance of HTML tag flash
    preloadSanitizer();
    loadFAQContent();
  }, []);

  const [openIndex, setOpenIndex] = useState(null);
  const toggleIndex = (idx) => setOpenIndex(prev => prev === idx ? null : idx);

  const handleNavigation = (path) => {
    if (path === '/faq') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.href = path;
  };

  // ✅ SEO FIX: Removed duplicate schema injection
  // Schema is now handled by parent FAQPage.jsx component to avoid "Duplicate field 'FAQPage'" error
  // The parent component injects schema once for both desktop and mobile views

  return (
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
          background: '#000000',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          overscrollBehavior: 'contain'
        }}
        aria-label="Mobile FAQ page content"
      >
        {/* REFACTORED: Using Shared Mobile Navigation Component */}
        <MobileNavigation
          currentPage="faq"
          scrollY={scrollY}
          onNavigate={handleNavigation}
        />

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
            scrollBehavior: 'smooth', // Smooth scrolling behavior
            overscrollBehavior: 'contain',
            overscrollBehaviorY: 'contain',
            overscrollBehaviorX: 'none',
            touchAction: 'pan-y',
            transform: 'translateZ(0)',
            willChange: 'auto',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
          role="main"
          aria-label="FAQ page content"
        >
          {/* Content Wrapper */}
          <div
            style={{
              width: '100%',
              maxWidth: '430px',
              padding: '0px 24px 48px 24px', // Top padding handled by dynamic nav height
              boxSizing: 'border-box'
            }}
          >
            {/* Page Title */}
            <h1 style={{
              margin: '16px 0 24px 0',
              fontSize: '32px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              color: '#FFFFFF'
            }}>FAQ</h1>

            <div style={{ padding: '0 10px' }}>
        {faqItems.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} style={{
              background: 'rgba(22,22,22,0.4)',
              border: '1px solid rgba(56,56,56,0.3)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '14px',
              marginBottom: '10px',
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
                id={`faq-mobile-question-${idx}`}
                aria-expanded={isOpen}
                aria-controls={`faq-mobile-answer-${idx}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 24px',
                  background: 'transparent',
                  color: '#FFF',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  lineHeight: 1.3,
                  fontWeight: 600,
                  minHeight: '44px'
                }}
              >
                <span className="rich-text-content">{item.qText}</span>
                <span
                  className="faq-arrow"
                  aria-hidden="true"
                  style={{
                    display: 'inline-flex',
                    width: '20px',
                    height: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: isOpen ? 'rotate(180deg) translateZ(0)' : 'rotate(0deg) translateZ(0)',
                    transformOrigin: '50% 50%'
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: 'block' }}
                  >
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>


              <div id={`faq-mobile-answer-${idx}`} role="region" aria-labelledby={`faq-mobile-question-${idx}`} style={{ maxHeight: isOpen ? 'min(70vh, 560px)' : '0px', transition: 'max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1), padding 0.28s cubic-bezier(0.4, 0, 0.2, 1)', willChange: 'max-height, padding', overflow: 'hidden' }}>
                <div style={{ padding: isOpen ? '12px 24px 24px 24px' : '0 24px', color: 'rgba(255,255,255,0.84)', borderTop: '1px solid rgba(56,56,56,0.3)', borderTopColor: isOpen ? 'rgba(56,56,56,0.3)' : 'rgba(56,56,56,0)', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(4px)', transition: 'opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, border-top-color 0.28s ease 0.04s' }}>
                  <div className="faq-answer-scroll" style={{ maxHeight: 'min(68vh, 520px)', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}><div className="rich-text-content" dangerouslySetInnerHTML={{ __html: sanitizeRichText(item.aHtml || item.a) }} /></div>
                </div>
              </div>
            </div>
          );
        })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
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

        /* Global mobile scroll behavior fixes to prevent pull-to-refresh */
        @media (max-width: 767px) {
          html, body {
            overscroll-behavior-y: contain !important;
            -webkit-overscroll-behavior-y: contain !important;
            overscroll-behavior-x: none !important;
            touch-action: pan-y !important;
          }
        }

        /* Scrolling optimizations */
        .mobile-content-container {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          overscroll-behavior: contain;
          overscroll-behavior-y: contain;
          overscroll-behavior-x: none;
          touch-action: pan-y;
          contain: layout style;
          will-change: auto;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Ensure content is scrollable */
        .mobile-content-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar for cleaner look */
        }

        .mobile-content-container {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Modern animated arrow for expand/collapse */
        .faq-arrow {
          transition: transform 240ms cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }


        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

    </div>
  );
};

export default FAQPageMobile;

