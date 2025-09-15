import React, { useState, useEffect, useCallback } from 'react';

/**
 * Simple Dome Gallery Component
 * A lightweight, reliable 3D gallery with glassmorphism styling
 */
const SimpleDomeGallery = ({
  items = [],
  autoRotate = false,
  autoRotateSpeed = 30
}) => {
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [lastRotation, setLastRotation] = useState(0);

  // Responsive detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, autoRotateSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, autoRotateSpeed, isDragging]);

  // Mouse/Touch handlers
  const handleStart = useCallback((clientX) => {
    setIsDragging(true);
    setDragStart(clientX);
    setLastRotation(rotation);
  }, [rotation]);

  const handleMove = useCallback((clientX) => {
    if (!isDragging) return;
    
    const deltaX = clientX - dragStart;
    const newRotation = lastRotation + deltaX * 0.5;
    setRotation(newRotation);
  }, [isDragging, dragStart, lastRotation]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Event listeners
  useEffect(() => {
    const handleMouseMove = (e) => handleMove(e.clientX);
    const handleMouseUp = () => handleEnd();
    const handleTouchMove = (e) => {
      e.preventDefault();
      handleMove(e.touches[0].clientX);
    };
    const handleTouchEnd = () => handleEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMove, handleEnd]);

  // Calculate item positions
  const radius = isMobile ? 180 : 280;
  const itemWidth = isMobile ? 140 : 200;
  const itemHeight = isMobile ? 200 : 280;

  const itemPositions = items.map((item, index) => {
    const angle = (index * 360 / items.length) + rotation;
    const radian = (angle * Math.PI) / 180;
    const x = Math.sin(radian) * radius;
    const z = Math.cos(radian) * radius;
    
    return {
      ...item,
      x,
      z,
      rotateY: angle,
      opacity: z < -radius * 0.3 ? 0.4 : 1,
      scale: z < 0 ? 0.8 : 1
    };
  });

  if (!items.length) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: isMobile ? '300px' : '400px',
        color: '#FFFFFF',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        opacity: 0.7
      }}>
        No images to display
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '350px' : '450px',
        perspective: '1000px',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onMouseDown={(e) => handleStart(e.clientX)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
    >
      {/* 3D Container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: itemWidth + 'px',
          height: itemHeight + 'px',
          transformStyle: 'preserve-3d',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {itemPositions.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              position: 'absolute',
              width: itemWidth + 'px',
              height: itemHeight + 'px',
              transform: `translate3d(${item.x}px, 0, ${item.z}px) rotateY(${item.rotateY}deg) scale(${item.scale})`,
              opacity: item.opacity,
              transition: isDragging ? 'none' : 'transform 0.5s ease, opacity 0.5s ease',
              cursor: 'pointer'
            }}
            onClick={() => {
              if (item.url) {
                window.open(item.url, '_blank', 'noopener,noreferrer');
              }
              setSelectedIndex(index);
            }}
          >
            {/* Glassmorphism Card */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'rgba(22, 22, 22, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: selectedIndex === index 
                  ? '2px solid rgba(49, 157, 255, 0.8)' 
                  : '1px solid rgba(56, 56, 56, 0.3)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'border 0.3s ease'
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100%',
                  height: '75%',
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '16px 16px 0 0'
                }}
              />
              
              {/* Content */}
              {(item.title || item.description) && (
                <div
                  style={{
                    padding: '8px 12px',
                    height: '25%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  {item.title && (
                    <div
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: isMobile ? '11px' : '13px',
                        fontWeight: '600',
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {item.title}
                    </div>
                  )}
                  
                  {item.description && (
                    <div
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: isMobile ? '9px' : '11px',
                        fontWeight: '300',
                        opacity: 0.8,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {item.description}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10
        }}
      >
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const targetRotation = -(index * 360 / items.length);
              setRotation(targetRotation);
              setSelectedIndex(index);
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: 'none',
              background: selectedIndex === index ? '#319DFF' : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Instructions */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#FFFFFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: isMobile ? '12px' : '14px',
          opacity: 0.6,
          textAlign: 'center',
          pointerEvents: 'none'
        }}
      >
        {isMobile ? 'Swipe to rotate' : 'Drag to rotate'}
      </div>
    </div>
  );
};

export default SimpleDomeGallery;
