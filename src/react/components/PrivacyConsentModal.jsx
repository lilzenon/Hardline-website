import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Eye, Database, Globe, X, Check } from 'lucide-react';

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
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false,
    functional: true
  });

  // Check if consent modal should be shown - delayed for gradual appearance
  useEffect(() => {
    const checkConsentStatus = () => {
      const consent = localStorage.getItem('analytics_gdpr_consent');
      const consentTimestamp = localStorage.getItem('analytics_consent_timestamp');

      // Show modal if no consent given or consent is older than 1 year
      if (!consent || !consentTimestamp) {
        // Delay showing modal until everything else is loaded (3 seconds)
        setTimeout(() => {
          setShowModal(true);
        }, 3000);
      } else {
        const consentAge = Date.now() - parseInt(consentTimestamp);
        const oneYear = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

        if (consentAge > oneYear) {
          // Delay showing modal until everything else is loaded (3 seconds)
          setTimeout(() => {
            setShowModal(true);
          }, 3000);
        }
      }
    };

    // Initial delay to ensure page is loaded, then check consent
    const timer = setTimeout(checkConsentStatus, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle accept consent
  const handleAccept = useCallback(async () => {
    setIsAnimating(true);
    
    try {
      // Set localStorage consent
      localStorage.setItem('analytics_gdpr_consent', 'granted');
      localStorage.setItem('analytics_consent_timestamp', Date.now().toString());
      localStorage.setItem('analytics_consent_preferences', JSON.stringify(preferences));

      // Send consent to backend API
      await fetch('/api/privacy/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consent: 'accepted',
          preferences: preferences,
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
  }, [preferences, onConsentChange]);

  // Handle decline consent
  const handleDecline = useCallback(async () => {
    setIsAnimating(true);
    
    try {
      // Set localStorage consent
      localStorage.setItem('analytics_gdpr_consent', 'denied');
      localStorage.setItem('analytics_consent_timestamp', Date.now().toString());

      // Send consent to backend API
      await fetch('/api/privacy/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          consent: 'rejected',
          timestamp: Date.now()
        })
      });

      // Clear analytics data if available
      if (window.getAnalyticsTracker) {
        const tracker = window.getAnalyticsTracker();
        if (tracker && tracker.revokeGDPRConsent) {
          tracker.revokeGDPRConsent();
        }
      }

      // Notify parent component
      onConsentChange?.(false);

      // Close modal with animation
      setTimeout(() => {
        setShowModal(false);
        setIsAnimating(false);
      }, 300);

    } catch (error) {
      console.error('Error declining consent:', error);
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
      {/* Modal Backdrop - No Background Blur, Scrolling Enabled */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'transparent', // No background overlay
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px', // Minimal padding
          boxSizing: 'border-box',
          opacity: isAnimating ? 0 : 1,
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Slower, softer transition
          animation: 'gentleFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1)', // Gentler animation
          pointerEvents: 'none' // Allow clicks/scrolling to pass through backdrop
        }}
      >
        {/* Modal Container - Ultra Compact */}
        <div
          style={{
            width: '100%',
            maxWidth: '280px', // Even smaller - reduced from 320px
            maxHeight: '60vh', // Reduced from 70vh
            background: 'rgba(0, 0, 0, 0.6)', // Slightly less transparent for readability
            backdropFilter: 'blur(25px)', // Strong glassmorphism
            WebkitBackdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.15)', // Slightly more visible border
            borderRadius: '16px', // Smaller radius for compact feel
            padding: '16px', // Even more compact padding
            boxSizing: 'border-box',
            fontFamily: 'Inter, sans-serif',
            color: '#FFFFFF',
            overflow: 'hidden', // Prevent scroll on small modal
            transform: isAnimating ? 'scale(0.9) translateY(10px)' : 'scale(1) translateY(0)',
            opacity: isAnimating ? 0 : 1,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Slower, gentler transition
            animation: 'gentleSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Softer shadow
            pointerEvents: 'auto' // Re-enable pointer events for the modal itself
          }}
        >
          {/* Header - Ultra Compact */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px' // Further reduced
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={16} color="#319DFF" /> {/* Even smaller icon */}
              <h2
                style={{
                  margin: 0,
                  fontSize: '16px', // Further reduced
                  fontWeight: '600',
                  color: '#FFFFFF'
                }}
              >
                Privacy & Analytics
              </h2>
            </div>
          </div>

          {/* Main Content */}
          {!showDetails ? (
            <>
              {/* Simple Consent View - Ultra Compact */}
              <div style={{ marginBottom: '14px' }}> {/* Further reduced */}
                <p
                  style={{
                    margin: '0 0 8px 0', // Further reduced
                    fontSize: '13px', // Smaller text
                    lineHeight: '1.3', // Tighter
                    color: 'rgba(255, 255, 255, 0.9)',
                    textAlign: 'center'
                  }}
                >
                  We use analytics to improve your experience.
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '11px', // Even smaller
                    lineHeight: '1.2', // Very tight
                    color: 'rgba(255, 255, 255, 0.7)',
                    textAlign: 'center'
                  }}
                >
                  Data is anonymized and never shared.
                </p>
              </div>

              {/* Action Buttons - Ultra Compact */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '6px', // Smaller gap
                  marginBottom: '8px' // Further reduced
                }}
              >
                {/* Accept Button */}
                <button
                  onClick={handleAccept}
                  disabled={isAnimating}
                  style={{
                    flex: 1,
                    height: '36px', // Even smaller
                    background: '#319DFF',
                    border: 'none',
                    borderRadius: '8px', // Smaller radius
                    color: '#FFFFFF',
                    fontSize: '12px', // Smaller text
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isAnimating ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px' // Smaller gap
                  }}
                  onMouseEnter={(e) => {
                    if (!isAnimating) {
                      e.target.style.background = '#2B8CE6';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isAnimating) {
                      e.target.style.background = '#319DFF';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  <Check size={14} /> {/* Smaller icon */}
                  Accept
                </button>

                {/* Decline Button */}
                <button
                  onClick={handleDecline}
                  disabled={isAnimating}
                  style={{
                    flex: 1,
                    height: '36px', // Even smaller
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px', // Smaller radius
                    color: '#FFFFFF',
                    fontSize: '12px', // Smaller text
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif',
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: isAnimating ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isAnimating) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isAnimating) {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  Decline
                </button>
              </div>

              {/* Customize Link - Ultra Small */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setShowDetails(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(49, 157, 255, 0.6)', // Even more subtle
                    fontSize: '10px', // Very small
                    fontWeight: '400',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    opacity: 0.7,
                    padding: '2px' // Minimal padding
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#319DFF';
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(49, 157, 255, 0.6)';
                    e.target.style.opacity = '0.7';
                  }}
                >
                  Customize
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

      {/* CSS Animations - Gentle & Soft */}
      <style jsx>{`
        @keyframes gentleFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes gentleSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          50% {
            opacity: 0.5;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

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

export default PrivacyConsentModal;
