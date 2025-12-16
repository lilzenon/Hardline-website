import React, { useState, useEffect, useCallback } from 'react';
// 🚀 OPTIMIZED: Use centralized icon imports for better tree shaking
import { X, Check, Shield, Eye, Database, Globe } from '../utils/icons';

/**
 * Modern Privacy Consent Modal Component
 * 
 * Features:
 * - Glassmorphism design following the established design system
 * - GDPR/CCPA compliance
 * - localStorage-based consent tracking
 * - Smooth animations with prefers-reduced-motion support
 * - Mobile-optimized with 44px minimum touch targets
 * - Integrates with existing analytics system
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onConsentChange - Callback when consent changes
 */
const PrivacyConsentModal = ({ onConsentChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);


  // Check if consent modal should be shown - optimized timing
  useEffect(() => {
    const checkConsentStatus = () => {
      try {
        const consent = localStorage.getItem('analytics_gdpr_consent');
        const consentTimestamp = localStorage.getItem('analytics_consent_timestamp');

        // Show modal if no consent given or consent is older than 1 year
        if (!consent || !consentTimestamp) {
          // Wait for page to be fully interactive, then show modal
          if (document.readyState === 'complete') {
            setTimeout(() => setShowModal(true), 800); // Shorter delay when page is ready
          } else {
            // Wait for page load completion
            const handleLoad = () => {
              setTimeout(() => setShowModal(true), 800);
              window.removeEventListener('load', handleLoad);
            };
            window.addEventListener('load', handleLoad);
          }
        } else {
          const consentAge = Date.now() - parseInt(consentTimestamp);
          const oneYear = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

          if (consentAge > oneYear) {
            // Same optimized timing for expired consent
            if (document.readyState === 'complete') {
              setTimeout(() => setShowModal(true), 800);
            } else {
              const handleLoad = () => {
                setTimeout(() => setShowModal(true), 800);
                window.removeEventListener('load', handleLoad);
              };
              window.addEventListener('load', handleLoad);
            }
          }
        }
      } catch (error) {
        console.warn('⚠️ PrivacyConsentModal: Storage access blocked, showing modal by default', error);
        // Fallback: If we can't read storage, assume we need to ask for consent
        setTimeout(() => setShowModal(true), 800);
      }
    };

    // Check immediately if page is already loaded, otherwise wait briefly
    if (document.readyState === 'loading') {
      const timer = setTimeout(checkConsentStatus, 500);
      return () => clearTimeout(timer);
    } else {
      checkConsentStatus();
    }
  }, []);

  // Handle continue (accept consent by using site)
  const handleAccept = useCallback(async () => {
    setIsAnimating(true);

    try {
      // Set localStorage consent
      localStorage.setItem('analytics_gdpr_consent', 'granted');
      localStorage.setItem('analytics_consent_timestamp', Date.now().toString());
      localStorage.setItem('analytics_consent_preferences', JSON.stringify({
        analytics: true,
        functional: true,
        marketing: false
      }));

      // Send consent to backend API
      await fetch('/api/privacy/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consent: 'accepted',
          preferences: {
            analytics: true,
            functional: true,
            marketing: false
          },
          timestamp: Date.now()
        })
      });

      // Initialize analytics if available
      if (window.getAnalyticsTracker) {
        const tracker = window.getAnalyticsTracker();
        if (tracker && tracker.grantGDPRConsent) {
          tracker.grantGDPRConsent();
        }
      }

      // Notify parent component
      onConsentChange?.(true);

      // Close modal with animation
      setTimeout(() => {
        setShowModal(false);
        setIsAnimating(false);
      }, 300);

    } catch (error) {
      console.error('Error setting consent:', error);
      setIsAnimating(false);
    }
  }, [onConsentChange]);



  // Handle preference toggle
  const handlePreferenceToggle = useCallback((key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  // Don't render if modal shouldn't be shown
  if (!showModal) return null;

  return (
    <>
      {/* Modal Backdrop - Optimized Animations */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'transparent',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          boxSizing: 'border-box',
          opacity: isAnimating ? 0 : 1,
          transition: 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Optimized easing curve
          animation: 'smoothFadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smoother, faster animation
          pointerEvents: 'none', // Allow clicks/scrolling to pass through backdrop
          willChange: 'opacity' // Optimize for animation performance
        }}
      >
        {/* Modal Container - Performance Optimized */}
        <div
          className="modal-container"
          style={{
            width: '100%',
            maxWidth: '280px',
            maxHeight: '60vh',
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            padding: '16px',
            boxSizing: 'border-box',
            fontFamily: 'Inter, sans-serif',
            color: '#FFFFFF',
            overflow: 'hidden',
            transform: isAnimating ? 'scale(0.92) translateY(8px)' : 'scale(1) translateY(0)',
            opacity: isAnimating ? 0 : 1,
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Faster, smoother transition
            animation: 'optimizedSlideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Optimized animation
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            pointerEvents: 'auto',
            willChange: 'transform, opacity', // Optimize for animation performance
            backfaceVisibility: 'hidden', // Prevent flickering
            perspective: '1000px' // Enable hardware acceleration
          }}
        >
          {/* Header - Neutral Style */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={16} color="rgba(255, 255, 255, 0.7)" /> {/* Neutral white */}
              <h2
                style={{
                  margin: 0,
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#FFFFFF'
                }}
              >
                Site Usage Notice
              </h2>
            </div>
          </div>

          {/* Main Content */}
          {!showDetails ? (
            <>
              {/* Legal Consent Notice - Justified & Centered */}
              <div style={{ marginBottom: '16px' }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    lineHeight: '1.5', // Improved line height for readability
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'justify', // Evenly spaced text
                    textAlignLast: 'center', // Center the last line
                    letterSpacing: '0.3px', // Subtle letter spacing for better readability
                    wordSpacing: '1px', // Slight word spacing improvement
                    hyphens: 'auto', // Enable hyphenation for better justification
                    WebkitHyphens: 'auto'
                  }}
                >
                  By entering and continuing to use this site, you agree to our use of analytics tracking to improve your experience and understand platform usage.
                </p>
              </div>

              {/* Single Continue Button - Social Media Style */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '8px'
                }}
              >
                <button
                  onClick={handleAccept}
                  disabled={isAnimating}
                  style={{
                    width: '100%',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.1)', // Glassmorphism like social buttons
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px', // Rounded like social buttons
                    color: '#FFFFFF',
                    fontSize: '13px',
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif',
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Faster, smoother transition
                    opacity: isAnimating ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    willChange: 'transform, background-color, box-shadow', // Optimize for hover animations
                    backfaceVisibility: 'hidden' // Prevent flickering
                  }}
                  onMouseEnter={(e) => {
                    if (!isAnimating) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.transform = 'translateY(-1px) scale(1.02)'; // Subtle scale for better feedback
                      e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isAnimating) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                >
                  <Check size={16} />
                  Continue
                </button>
              </div>


            </>
          ) : (
            <>
              {/* Detailed Preferences View */}
              <div style={{ marginBottom: '24px' }}>
                <p
                  style={{
                    margin: '0 0 20px 0',
                    fontSize: '14px',
                    lineHeight: '1.4',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  Choose which data we can collect to improve your experience:
                </p>

                {/* Analytics Preference */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    marginBottom: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ flex: 1, marginRight: '16px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px'
                      }}
                    >
                      <Eye size={16} color="#319DFF" />
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#FFFFFF'
                        }}
                      >
                        Analytics
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        lineHeight: '1.3',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      Page views, session duration, and usage patterns to improve our platform
                    </p>
                  </div>

                  {/* iOS-style Toggle Switch */}
                  <div
                    onClick={() => handlePreferenceToggle('analytics')}
                    style={{
                      width: '44px',
                      height: '24px',
                      background: preferences.analytics ? '#0AFF4B' : 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '12px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      flexShrink: 0
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        background: '#FFFFFF',
                        borderRadius: '10px',
                        position: 'absolute',
                        top: '2px',
                        left: preferences.analytics ? '22px' : '2px',
                        transition: 'left 0.2s ease',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </div>
                </div>

                {/* Functional Preference */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    marginBottom: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ flex: 1, marginRight: '16px' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px'
                      }}
                    >
                      <Database size={16} color="#319DFF" />
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#FFFFFF'
                        }}
                      >
                        Functional
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '500',
                          color: '#0AFF4B',
                          background: 'rgba(10, 255, 75, 0.2)',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}
                      >
                        Required
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '12px',
                        lineHeight: '1.3',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      Essential features like session management and security
                    </p>
                  </div>

                  {/* Disabled Toggle (Always On) */}
                  <div
                    style={{
                      width: '44px',
                      height: '24px',
                      background: '#0AFF4B',
                      borderRadius: '12px',
                      position: 'relative',
                      opacity: 0.7,
                      flexShrink: 0
                    }}
                  >
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        background: '#FFFFFF',
                        borderRadius: '10px',
                        position: 'absolute',
                        top: '2px',
                        left: '22px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '16px'
                }}
              >
                <button
                  onClick={handleAccept}
                  disabled={isAnimating}
                  style={{
                    width: '100%',
                    height: '48px',
                    background: '#319DFF',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isAnimating ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Check size={18} />
                  Save Preferences
                </button>

                <button
                  onClick={handleDecline}
                  disabled={isAnimating}
                  style={{
                    width: '100%',
                    height: '48px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif',
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isAnimating ? 0.6 : 1
                  }}
                >
                  Decline All
                </button>
              </div>

              {/* Back Link */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setShowDetails(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#319DFF',
                    fontSize: '14px',
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#2B8CE6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#319DFF';
                  }}
                >
                  ← Back to simple view
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CSS Animations - Performance Optimized */}
      <style jsx>{`
        @keyframes smoothFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes optimizedSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.92);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-2px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Performance optimizations */
        * {
          transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            transform: none !important;
          }
        }

        /* Hardware acceleration for smooth animations */
        @supports (backdrop-filter: blur(1px)) {
          .modal-container {
            transform: translateZ(0);
          }
        }
      `}</style>
    </>
  );
};

export default PrivacyConsentModal;
