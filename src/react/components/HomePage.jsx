import React, { useState, useEffect } from 'react';
import FigmaDesktop from './FigmaDesktop';
import FigmaMobile from './FigmaMobile';
import { useViewportDimensions } from '../hooks/usePerformantResize';

/**
 * Homepage component that automatically serves mobile or desktop version
 * based on viewport width and user agent detection
 */
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Use performant viewport detection
  const { width: viewportWidth, isMobile: isMobileByWidth } = useViewportDimensions();

  useEffect(() => {
    // Check user agent for mobile devices
    const userAgent = navigator.userAgent || '';
    const isMobileByUA = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    // Device is mobile if either condition is true
    const deviceIsMobile = isMobileByWidth || isMobileByUA;

    setIsMobile(deviceIsMobile);
    setIsLoading(false);

    console.log('📱 Device Detection:', {
      viewportWidth,
      isMobileByWidth,
      isMobileByUA,
      finalDecision: deviceIsMobile ? 'MOBILE' : 'DESKTOP'
    });
  }, [viewportWidth, isMobileByWidth]);

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#FFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px'
        }}
      >
        Loading...
      </div>
    );
  }

  // Serve appropriate component based on device detection
  return isMobile ? <FigmaMobile /> : <FigmaDesktop />;
};

export default HomePage;
