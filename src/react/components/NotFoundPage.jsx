import React from 'react';
import Dither from './ui/Dither';

/**
 * Minimalist 404 Not Found Page with Dither Effect Background
 * 
 * Features:
 * - Full-screen dither effect background
 * - Ultra-transparent glassmorphism card
 * - BOUNCE2BOUNCE logo positioning
 * - Minimalist design with subtle button
 * - Responsive layout
 * - Accessibility compliant
 */
export default function NotFoundPage() {
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
      {/* Dither Background Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <Dither
          waveSpeed={0.05}
          waveFrequency={19}
          waveAmplitude={0.51}
          waveColor={[0.5, 0.5, 0.5]}
          colorNum={2.5}
          pixelSize={3}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.3}
        />
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
