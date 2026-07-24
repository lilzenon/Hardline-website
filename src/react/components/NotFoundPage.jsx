import React, { useEffect, useState, Suspense, lazy } from 'react';
import { logEnvironmentInfo, isProductionEnvironment } from '../utils/productionDebug';
const Dither = lazy(() => import('./ui/DitherShadcn').then(m => ({ default: m.Dither })));

/**
 * Minimalist 404 Not Found Page with Dither Effect Background
 *
 * Features:
 * - Full-screen dither effect background with React 19 compatibility
 * - CSS fallback for when Three.js fails
 * - Ultra-transparent glassmorphism card
 * - HARDLINE logo positioning
 * - Minimalist design with subtle button
 * - Responsive layout
 * - Accessibility compliant
 * - Robust error handling
 */

// CSS-only fallback background that matches the dither effect
const CSSFallbackBackground = () => (
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    background: `
      radial-gradient(circle at 20% 30%, rgba(128, 128, 128, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(128, 128, 128, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(128, 128, 128, 0.06) 0%, transparent 50%),
      linear-gradient(45deg, #000000 0%, #0a0a0a 25%, #000000 50%, #0a0a0a 75%, #000000 100%)
    `,
    backgroundSize: '400px 400px, 600px 600px, 300px 300px, 20px 20px',
    animation: 'cssWaveAnimation 8s ease-in-out infinite alternate'
  }}>
    <style>{`
      @keyframes cssWaveAnimation {
        0% {
          opacity: 0.8;
          filter: hue-rotate(0deg) brightness(1);
          background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
        }
        50% {
          opacity: 0.6;
          filter: hue-rotate(5deg) brightness(1.1);
          background-position: 20% 20%, 80% 80%, 30% 70%, 10% 10%;
        }
        100% {
          opacity: 0.7;
          filter: hue-rotate(10deg) brightness(0.9);
          background-position: 40% 10%, 60% 90%, 70% 30%, 20% 20%;
        }
      }
    `}</style>
  </div>
);

// Error boundary specifically for the Dither component
class DitherErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Only use fallback for actual critical errors, not React 19 compatibility issues
    const isCriticalError = error.message.includes('WebGL') ||
                           error.message.includes('Canvas') ||
                           error.message.includes('THREE') ||
                           error.name === 'TypeError' && !error.message.includes('ReactCurrentOwner');

    console.warn('🎮 Dither component error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      isCriticalError,
      willUseFallback: isCriticalError
    });

    // Only track truly critical errors
    if (window.gtag && isCriticalError) {
      window.gtag('event', 'exception', {
        description: `Three.js Critical Error: ${error.message}`,
        fatal: false
      });
    }

    // For React 19 compatibility issues, let React Three Fiber handle them
    if (!isCriticalError) {
      console.log('🎮 Non-critical error detected, allowing React Three Fiber to handle internally');
    }
  }

  render() {
    // IAB FIX: on ANY caught error, swap to the CSS fallback. Re-rendering
    // the children here (the old "non-critical" path) just re-threw the same
    // error, escaped to the top-level ErrorBoundary, and replaced the whole
    // page with the generic error card. The background is decorative — a
    // gradient fallback is always the right degradation.
    if (this.state.hasError) {
      return <CSSFallbackBackground />;
    }
    return this.props.children;
  }
}

export default function NotFoundPage() {
  const [ditherFailed, setDitherFailed] = useState(false);

  // Log environment info in production for debugging
  useEffect(() => {
    if (isProductionEnvironment()) {
      console.log('🔍 NotFoundPage loaded in production environment');
      logEnvironmentInfo();
    }
  }, []);

  // Simple navigation function
  const handleGoHome = () => {
    if (window.navigateWithTransition) {
      window.navigateWithTransition('/');
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#000000',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Dither Background Effect with Error Boundary */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <DitherErrorBoundary>
          <Suspense fallback={<CSSFallbackBackground />}>
            <Dither
              waveSpeed={0.02}
              waveFrequency={2.0}
              waveAmplitude={0.25}
              waveColor={[1.0, 1.0, 1.0]}
              colorNum={2}
              pixelSize={2}
              enableMouseInteraction={false}
              mouseRadius={1.0}
              className="dither-background"
            />
          </Suspense>
        </DitherErrorBoundary>
      </div>



      {/* Minimalist 404 Card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 40px',
        borderRadius: '16px',
        background: 'rgba(22, 22, 22, 0.5)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '90%'
      }}>
        {/* HARDLINE Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <img
            src="/images/figma-exact/hardline-logo-404.svg"
            alt="HARDLINE"
            style={{
              height: '48px',
              width: 'auto',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 0.95
            }}
            onClick={handleGoHome}
            onError={(e) => {
              // Fallback to text if logo fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div style={{
            display: 'none',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '0.5px'
          }}>
            HARDLINE
          </div>
        </div>

        {/* 404 Title */}
        <h1 style={{
          fontSize: 'clamp(4rem, 8vw, 6rem)',
          fontWeight: '800',
          color: 'rgba(255, 255, 255, 0.95)',
          margin: '0 0 16px 0',
          lineHeight: '1',
          letterSpacing: '-0.02em',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
        }}>
          404
        </h1>

        {/* Subtitle */}
        <h2 style={{
          fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
          fontWeight: '500',
          color: 'rgba(255, 255, 255, 0.8)',
          margin: '0 0 32px 0',
          lineHeight: '1.2'
        }}>
          Not Found
        </h2>

        {/* Minimalist Button */}
        <button
          onClick={handleGoHome}
          style={{
            padding: '14px 28px',
            fontSize: '1rem',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.9)',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(2px)',
            transform: 'translateY(0)',
            outline: 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.12)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.08)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.target.style.transform = 'translateY(0)';
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
          aria-label="Go back to homepage"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
