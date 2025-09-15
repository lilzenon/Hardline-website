import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dither from './ui/Dither';

/**
 * Modern 404 Not Found Page with Dither Effect Background
 * 
 * Features:
 * - Full-screen dither effect background with mouse interaction
 * - Glassmorphism design system consistency
 * - Responsive typography and layout
 * - Smooth animations and transitions
 * - Auto-redirect countdown option
 * - Accessibility compliant
 */
export default function NotFoundPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    // Start countdown after 3 seconds
    const startTimer = setTimeout(() => {
      setShowCountdown(true);
    }, 3000);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!showCountdown) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showCountdown, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Dither Effect Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <Dither
          waveColor={[0.3, 0.3, 0.4]}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.4}
          colorNum={6}
          waveAmplitude={0.2}
          waveFrequency={2}
          waveSpeed={0.03}
          pixelSize={3}
        />
      </div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '40px',
        maxWidth: '600px',
        width: '100%'
      }}>
        {/* Glassmorphism Card */}
        <div style={{
          background: 'rgba(22, 22, 22, 0.85)',
          border: '1px solid rgba(56, 56, 56, 0.4)',
          borderRadius: '24px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '48px 32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          animation: 'fadeInUp 0.8s ease-out forwards',
          opacity: 0
        }}>
          {/* 404 Title */}
          <h1 style={{
            fontSize: 'clamp(4rem, 8vw, 8rem)',
            fontWeight: '800',
            color: '#FFFFFF',
            margin: '0 0 16px 0',
            lineHeight: '1',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #B0B0B0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'glitch 2s infinite alternate'
          }}>
            404
          </h1>

          {/* Subtitle */}
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: '600',
            color: '#FFFFFF',
            margin: '0 0 24px 0',
            lineHeight: '1.2',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.3s forwards'
          }}>
            Page Not Found
          </h2>

          {/* Description */}
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.8)',
            margin: '0 0 40px 0',
            lineHeight: '1.6',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.6s forwards'
          }}>
            The page you're looking for doesn't exist or has been moved.
            <br />
            Let's get you back to where the music lives.
          </p>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            opacity: 0,
            animation: 'fadeInUp 0.8s ease-out 0.9s forwards'
          }}>
            {/* Primary Button */}
            <button
              onClick={handleGoHome}
              style={{
                background: 'linear-gradient(135deg, #319DFF 0%, #1E88E5 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 16px rgba(49, 157, 255, 0.3)',
                minWidth: '200px',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 24px rgba(49, 157, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(49, 157, 255, 0.3)';
              }}
            >
              Take Me Home
            </button>

            {/* Countdown Display */}
            {showCountdown && (
              <p style={{
                fontSize: '0.9rem',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: '16px 0 0 0',
                animation: 'fadeIn 0.5s ease-out forwards'
              }}>
                Redirecting automatically in {countdown} seconds...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes glitch {
          0% {
            text-shadow: 0 0 0 transparent;
          }
          2% {
            text-shadow: 2px 0 0 #ff0000, -2px 0 0 #00ffff;
          }
          4% {
            text-shadow: 0 0 0 transparent;
          }
          100% {
            text-shadow: 0 0 0 transparent;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .dither-container {
            height: 100vh;
            height: 100dvh; /* Dynamic viewport height for mobile */
          }
        }

        /* Accessibility - Respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
