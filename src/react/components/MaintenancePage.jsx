import React, { useEffect, useState, Suspense, lazy } from 'react';
import { logEnvironmentInfo, isProductionEnvironment } from '../utils/productionDebug';
import { useSEO } from '../contexts/SEOContext';
const Dither = lazy(() => import('./ui/DitherShadcn').then(m => ({ default: m.Dither })));


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
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const { maintenanceStatus } = useSEO();
  const maintenanceTitle = (maintenanceStatus && maintenanceStatus.maintenance_title) || '⚠️Under Construction⚠️';


  // Log environment info in production for debugging
  useEffect(() => {
    if (isProductionEnvironment()) {
      console.log('🔍 MaintenancePage loaded in production environment');
      logEnvironmentInfo();
    }
  }, []);

  // Ensure Laylo SDK loads reliably in the background (no UI dependency)
  useEffect(() => {
    const SDK_SRC = 'https://embed.laylo.com/laylo-sdk.js';
    let retries = 0;
    let aborted = false;

    const ensureScript = () => {
      if (aborted) return;
      // If already present, nothing to do
      const existing = Array.from(document.scripts).some((s) => s.src && s.src.includes('embed.laylo.com/laylo-sdk.js'));
      if (existing) return;

      const s = document.createElement('script');
      s.src = SDK_SRC;
      s.async = true;
      s.defer = true;
      s.onload = () => { setSdkLoaded(true); console.log('✅ Laylo SDK loaded'); }
      s.onerror = () => {
        if (aborted) return;
        retries += 1;
        const backoff = Math.min(2000, 200 * Math.pow(2, retries));
        console.warn('⚠️ Laylo SDK failed to load, retrying...', { retries, backoff });
        setTimeout(ensureScript, backoff);
      };
      document.head.appendChild(s);
    };

    ensureScript();
    return () => { aborted = true; };

  }, []);


  // Keep users on the dedicated maintenance page during maintenance
  const handleGoHome = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (window.location.pathname !== '/maintenance') {
      window.location.replace('/maintenance');
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100dvh',
      overflow: 'hidden',
      overscrollBehavior: 'none',
      background: '#000000',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: '12vh'
    }}>
      {/* Dither Background Effect with Error Boundary */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        <Suspense fallback={null}>
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
        padding: '20px 0 8px 0',
        borderRadius: '16px',
        background: 'rgba(22, 22, 22, 0.6)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '90%',
        marginTop: '100px'
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
              opacity: 0.72,
              filter: 'brightness(0) invert(1) contrast(1.05) drop-shadow(0 0 2px rgba(255,255,255,0.28)) drop-shadow(0 0 10px rgba(255,255,255,0.14)) drop-shadow(0 6px 14px rgba(0,0,0,0.45))',
              WebkitFilter: 'brightness(0) invert(1) contrast(1.05) drop-shadow(0 0 2px rgba(255,255,255,0.28)) drop-shadow(0 0 10px rgba(255,255,255,0.14)) drop-shadow(0 6px 14px rgba(0,0,0,0.45))',
              mixBlendMode: 'screen',
              transform: 'translateZ(0)'
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
        {/* Title above Laylo iframe */}
        <div style={{
          margin: 0,
          padding: 0,
          width: '100%',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: 1.25,
          color: 'rgba(255, 255, 255, 0.72)',
          textAlign: 'center'
        }}>
          {maintenanceTitle}
        </div>


        {/* Laylo Iframe */}
        <div style={{
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          minHeight: '160px'
        }}>
          {/* Laylo iframe per requested implementation */}
          <iframe
            key={sdkLoaded ? 'sdk-ready' : 'sdk-init'}
            id="laylo-drop-1nTsX"
            frameBorder="0"
            scrolling="no"
            allow="web-share"
            allowtransparency="true"
            style={{ width: '1px', minWidth: '100%', maxWidth: '1000px', height: '160px', border: 'none', marginTop: '-6px' }}
            src="https://embed.laylo.com?dropId=1nTsX&color=f60509&minimal=true&theme=dark&background=transparent"
            title="Stay updated with BOUNCE2BOUNCE"
          />
        </div>
      </div>
    </div>
  );
}
