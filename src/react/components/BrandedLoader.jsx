import React, { useEffect, useState } from 'react';

/**
 * Branded loading screen with animated B2B logo
 * Respects user's prefers-reduced-motion accessibility setting
 * Uses glassmorphism design system with smooth animations
 */
const BrandedLoader = ({
  message = "Loading...",
  showMessage = false, // Default to false for minimalist design
  fullScreen = true,
  minDisplayTime = 800 // Minimum time to show loader for smooth UX
}) => {
  // Prevent double-rendering across page transitions: only one loader at a time
  // Also suppress a second loader within a short cooldown window after the previous one ends
  const [suppressRender] = useState(() => {
    if (typeof window === 'undefined') return false;
    const active = window.__B2B_LOADER_ACTIVE === true;
    const lastEnded = window.__B2B_LOADER_LAST_ENDED || 0;
    const withinCooldown = Date.now() - lastEnded < 600; // 600ms cooldown to avoid back-to-back loaders
    return active || withinCooldown;
  });

  useEffect(() => {
    if (suppressRender) return;
    try {
      window.__B2B_LOADER_ACTIVE = true;
      return () => {
        window.__B2B_LOADER_ACTIVE = false;
        window.__B2B_LOADER_LAST_ENDED = Date.now();
      };
    } catch (_) {
      // no-op in non-browser environments
    }
  }, [suppressRender]);

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
    if (suppressRender) return;
    const timer = setTimeout(() => {
      setFadeOut(true);
      // Complete fade out after animation duration
      setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match CSS transition duration
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime, suppressRender]);



  const containerStyle = {
    position: fullScreen ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: fullScreen ? '100vh' : '100%',
    background: '#000000', // Plain black background, no gradient
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    opacity: fadeOut ? 0 : 1,
    transition: shouldAnimate ? 'opacity 0.3s ease-out, transform 0.3s ease-out' : 'none',
    transform: fadeOut ? 'scale(0.95)' : 'scale(1)',
    pointerEvents: fadeOut ? 'none' : 'auto'
  };

  const logoContainerStyle = {
    position: 'relative',
    marginBottom: '0', // Always 0 for minimalist design
    transform: shouldAnimate && !fadeOut ? 'scale(1)' : 'scale(0.9)',
    animation: shouldAnimate && !fadeOut ? 'brandedLoaderPulse 2.5s ease-in-out infinite' : 'none',
    transition: shouldAnimate ? 'transform 0.3s ease-out' : 'none'
  };

  const logoStyle = {
    width: '120px',
    height: 'auto',
    transition: shouldAnimate ? 'transform 0.3s ease' : 'none'
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

  // Inject keyframe animations (global, single insertion)
  useEffect(() => {
    if (suppressRender || !shouldAnimate) return;

    let styleSheet = document.getElementById('b2b-branded-loader-animations');
    if (styleSheet) {
      // Already present; avoid duplicate insertion
      return;
    }
    styleSheet = document.createElement('style');
    styleSheet.id = 'b2b-branded-loader-animations';
    styleSheet.textContent = `
      @keyframes brandedLoaderPulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.03);
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
    // Note: we intentionally do not remove this global style on unmount to prevent flicker across transitions
  }, [shouldAnimate, suppressRender]);

  if (suppressRender || !isVisible) {
    return null;
  }

  return (
    <div
      style={containerStyle}
      className={shouldAnimate ? 'branded-loader-container' : ''}
      role="status"
      aria-live="polite"
      aria-busy={!fadeOut}
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
