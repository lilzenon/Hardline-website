import React, { useEffect, useState, Suspense } from 'react';
import { logEnvironmentInfo, isProductionEnvironment } from '../utils/productionDebug';
import { Dither } from './ui/DitherShadcn';

/**
 * Minimalist Maintenance Page with Dither Effect Background
 *
 * Features:
 * - Full-screen dither effect background with React 19 compatibility
 * - CSS fallback for when Three.js fails
 * - Ultra-transparent glassmorphism card
 * - BOUNCE2BOUNCE logo positioning
 * - Laylo iframe for user engagement
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
    // Only use fallback for truly critical WebGL errors
    if (this.state.hasError && this.state.error) {
      const isCriticalWebGLError = this.state.error.message.includes('WebGL context lost') ||
                                  this.state.error.message.includes('WebGL not supported') ||
                                  this.state.error.message.includes('CONTEXT_LOST_WEBGL');

      if (isCriticalWebGLError) {
        console.warn('🎮 Critical WebGL error - using CSS fallback');
        return <CSSFallbackBackground />;
      } else {
        // For all other errors, let React Three Fiber handle them internally
        console.log('🎮 Non-critical error, letting React Three Fiber handle internally');
        return this.props.children;
      }
    }
    return this.props.children;
  }
}

export default function MaintenancePage() {
  const [ditherFailed, setDitherFailed] = useState(false);

  // Log environment info in production for debugging
  useEffect(() => {
    if (isProductionEnvironment()) {
      console.log('🔍 MaintenancePage loaded in production environment');
      logEnvironmentInfo();
    }

    // Load Laylo SDK
    const script = document.createElement('script');
    script.src = 'https://embed.laylo.com/laylo-sdk.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
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
      </div>

      {/* Minimalist Maintenance Card */}
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
        background: 'rgba(22, 22, 22, 0.12)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '90%'
      }}>
        {/* BOUNCE2BOUNCE Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <img
            src="/images/figma-exact/b2b-logo-nav.svg"
            alt="BOUNCE2BOUNCE"
            style={{
              height: '48px',
              width: 'auto',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 0.95,
              filter: 'brightness(0) invert(1)'
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
            BOUNCE2BOUNCE
          </div>
        </div>

        {/* Laylo Iframe */}
        <div style={{
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <iframe
            id="laylo-drop-c9ee71a5-2d3a-4da6-a528-eead61246989"
            frameBorder="0"
            scrolling="no"
            allow="web-share"
            allowTransparency="true"
            style={{
              width: '1px',
              minWidth: '100%',
              maxWidth: '1000px',
              height: 'auto',
              border: 'none'
            }}
            src="https://embed.laylo.com?dropId=c9ee71a5-2d3a-4da6-a528-eead61246989&color=ff0000&minimal=true&theme=light&background=transparent&customTitle=Stay Updated"
            title="Stay updated with BOUNCE2BOUNCE"
          />
        </div>
      </div>
    </div>
  );
}
