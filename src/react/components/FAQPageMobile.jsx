import React, { useEffect, useMemo, useRef, useState } from 'react';
import MobileNavigation from './MobileNavigation';
import { useNavHeight } from '../hooks/useNavHeight';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';


const FAQPageMobile = () => {
  const contentRef = useRef(null);
  const navHeight = useNavHeight();
  const topSpacer = Math.max(navHeight || 0, 0) + 12;

  // 📱 SCROLL SENSITIVITY FIX: Reduced sensitivity to prevent accidental page reloads
  const { scrollY } = useOptimizedScroll(contentRef.current, {
    threshold: 50, // Increased threshold to reduce sensitivity
    throttleMs: 200, // Increased throttling to reduce interference with native scrolling
    passive: true
  });

  // SEO (mobile)
  useEffect(() => {
    const siteUrl = 'https://b2b.click';
    const pageUrl = `${siteUrl}/faq`;
    const title = 'FAQ | BOUNCE2BOUNCE';
    const description = 'Answers to the most common questions about BOUNCE2BOUNCE events, tickets, and the platform.';
    const ogImage = `${siteUrl}/images/og-image.png`;

    const setMeta = (selectorAttr, name, content) => {
      let el = document.head.querySelector(`meta[${selectorAttr}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(selectorAttr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setLink = (rel, href) => {
      let link = document.head.querySelector(`link[rel="${rel}"]`);
      if (!link) { link = document.createElement('link'); link.setAttribute('rel', rel); document.head.appendChild(link); }
      link.setAttribute('href', href);
    };

    document.title = title;
    setMeta('name', 'description', description);
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

    // JSON-LD injected after FAQ items load (see effect below)
  }, []);

  // 🚨 MATCH DESKTOP: Use same FAQ items and API integration pattern
  const [faqItems, setFaqItems] = useState([]);
  const [contentError, setContentError] = useState(null);

  // 🚨 API INTEGRATION: Load FAQ items from backend (following About page pattern)
  useEffect(() => {
    const loadFAQContent = async () => {
      try {
        console.log('📥 Loading FAQ content from API (mobile)...');

        // Determine API base URL based on environment
        const isDevelopment = window.location.hostname === 'localhost';
        const apiBaseUrl = isDevelopment ? 'http://localhost:3002' : 'https://admin.b2b.click';

        const response = await fetch(`${apiBaseUrl}/api/settings/faq`, {
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

  // Inject JSON-LD structured data when FAQ items are available
  useEffect(() => {
    const ldId = 'ld-json-faq';
    const existing = document.getElementById(ldId);
    if (existing) existing.remove();

    const fallback = [
      { q: 'What is Bounce2Bounce?', a: 'Bounce2Bounce is a comprehensive event management platform that helps you create, manage, and promote events with ease.' },
      { q: 'How do I create an event?', a: "Simply log into your dashboard, click 'Create Event', and follow our step-by-step wizard to set up your event details, ticketing, and promotion." },
    ];
    const items = (faqItems && faqItems.length) ? faqItems : fallback;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = ldId;
    const faqs = items.map(i => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } }));
    script.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs });
    document.head.appendChild(script);
  }, [faqItems]);

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
            scrollBehavior: 'smooth' // Smooth scrolling behavior
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
                <span className="rich-text-content" dangerouslySetInnerHTML={{ __html: item.qHtml || item.q }} />
                <span style={{ display: 'inline-block', transition: 'transform 0.24s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
              </button>


              <div id={`faq-mobile-answer-${idx}`} role="region" aria-labelledby={`faq-mobile-question-${idx}`} style={{ maxHeight: isOpen ? '500px' : '0px', transition: 'max-height 0.28s cubic-bezier(0.4, 0, 0.2, 1), padding 0.28s cubic-bezier(0.4, 0, 0.2, 1)', willChange: 'max-height, padding', overflow: 'hidden' }}>
                <div style={{ padding: isOpen ? '12px 24px 24px 24px' : '0 24px', color: 'rgba(255,255,255,0.84)', borderTop: '1px solid rgba(56,56,56,0.3)', borderTopColor: isOpen ? 'rgba(56,56,56,0.3)' : 'rgba(56,56,56,0)', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(4px)', transition: 'opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1) 0.06s, border-top-color 0.28s ease 0.04s' }}>
                  <div className="rich-text-content" dangerouslySetInnerHTML={{ __html: item.aHtml || item.a }} />
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

        /* Scrolling optimizations */
        .mobile-content-container {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          overscroll-behavior: contain;
        }

        /* Ensure content is scrollable */
        .mobile-content-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar for cleaner look */
        }

        .mobile-content-container {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

    </div>
  );
};

export default FAQPageMobile;

