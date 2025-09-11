import React, { useEffect, useState } from 'react';

/**
 * Branded loading screen with animated B2B logo
 * Respects user's prefers-reduced-motion accessibility setting
 * Uses glassmorphism design system with smooth animations
 */
const BrandedLoader = ({
  message = "Loading...",
  showMessage = true,
  fullScreen = true,
  minDisplayTime = 800 // Minimum time to show loader for smooth UX
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldAnimate(!prefersReducedMotion);
  }, []);

  // Handle smooth fade out after minimum display time
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Complete fade out after animation duration
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match CSS transition duration
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  // Handle minimum display time
  useEffect(() => {
    if (minDisplayTime > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true); // Keep visible, parent component controls actual visibility
      }, minDisplayTime);
      
      return () => clearTimeout(timer);
    }
  }, [minDisplayTime]);

  const containerStyle = {
    position: fullScreen ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: fullScreen ? '100vh' : '100%',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(22, 22, 22, 0.98) 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)', // Safari support
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    opacity: fadeOut ? 0 : 1,
    transition: shouldAnimate ? 'opacity 0.3s ease-out, transform 0.3s ease-out' : 'none',
    transform: fadeOut ? 'scale(0.95)' : 'scale(1)',
    pointerEvents: fadeOut ? 'none' : 'auto'
  };

  const logoContainerStyle = {
    position: 'relative',
    marginBottom: showMessage ? '32px' : '0',
    transform: shouldAnimate && !fadeOut ? 'scale(1)' : 'scale(0.9)',
    animation: shouldAnimate && !fadeOut ? 'brandedLoaderPulse 2.5s ease-in-out infinite' : 'none',
    transition: shouldAnimate ? 'transform 0.3s ease-out' : 'none'
  };

  const logoStyle = {
    width: '120px',
    height: 'auto',
    filter: 'drop-shadow(0 4px 20px rgba(49, 157, 255, 0.3))',
    transition: shouldAnimate ? 'filter 0.3s ease' : 'none'
  };

  const messageStyle = {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '0.5px',
    textAlign: 'center',
    marginTop: '8px',
    opacity: showMessage ? 1 : 0,
    transition: shouldAnimate ? 'opacity 0.3s ease' : 'none'
  };

  const dotsStyle = {
    display: 'inline-block',
    animation: shouldAnimate ? 'brandedLoaderDots 1.5s ease-in-out infinite' : 'none'
  };

  // Inject keyframe animations
  useEffect(() => {
    if (!shouldAnimate) return;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes brandedLoaderPulse {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 4px 20px rgba(49, 157, 255, 0.3));
        }
        50% {
          transform: scale(1.03);
          filter: drop-shadow(0 6px 25px rgba(49, 157, 255, 0.4));
        }
      }

      @keyframes brandedLoaderDots {
        0%, 20% {
          opacity: 0;
          transform: translateY(2px);
        }
        50% {
          opacity: 1;
          transform: translateY(0);
        }
        80%, 100% {
          opacity: 0;
          transform: translateY(-2px);
        }
      }

      @keyframes brandedLoaderFadeIn {
        0% {
          opacity: 0;
          transform: scale(0.9) translateY(10px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .branded-loader-container {
        animation: brandedLoaderFadeIn 0.4s ease-out;
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    
    document.head.appendChild(styleSheet);
    
    return () => {
      if (document.head.contains(styleSheet)) {
        document.head.removeChild(styleSheet);
      }
    };
  }, [shouldAnimate]);

  return (
    <div
      style={containerStyle}
      className={shouldAnimate ? 'branded-loader-container' : ''}
    >
      <div style={logoContainerStyle}>
        {/* B2B Logo - New SMALL_B2BLOGO_WHITE.svg */}
        <img
          src="/images/SMALL_B2BLOGO_WHITE.svg"
          alt="Bounce2Bounce Logo"
          style={{
            ...logoStyle,
            width: '120px',
            height: 'auto',
            maxWidth: '100%'
          }}
          aria-label="Bounce2Bounce Logo"
        />
      </div>
      
      {showMessage && (
        <div style={messageStyle}>
          {message}
          <span style={dotsStyle}>...</span>
        </div>
      )}
    </div>
  );
};

export default BrandedLoader;
