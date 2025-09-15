import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useMedia } from 'react-use';

/**
 * Custom Dome Gallery Component
 * Inspired by React Bits Dome Gallery with glassmorphism styling
 * Features 3D cylindrical arrangement of images with smooth rotation
 * 
 * @param {Array} items - Array of image objects with { id, img, url, title?, description? }
 * @param {number} radius - Radius of the dome cylinder (default: 300)
 * @param {number} itemWidth - Width of each gallery item (default: 200)
 * @param {number} itemHeight - Height of each gallery item (default: 300)
 * @param {boolean} autoRotate - Whether to auto-rotate the dome (default: false)
 * @param {number} autoRotateSpeed - Speed of auto-rotation in seconds (default: 20)
 * @param {boolean} enableMouseControl - Enable mouse drag to rotate (default: true)
 * @param {boolean} enableTouchControl - Enable touch gestures (default: true)
 * @param {string} perspective - CSS perspective value (default: '1000px')
 */
const DomeGallery = ({
  items = [],
  radius = 300,
  itemWidth = 200,
  itemHeight = 300,
  autoRotate = false,
  autoRotateSpeed = 20,
  enableMouseControl = true,
  enableTouchControl = true,
  perspective = '1000px'
}) => {
  // Responsive adjustments
  const isMobile = useMedia('(max-width: 767px)');
  const isTablet = useMedia('(max-width: 1023px)');
  
  // Responsive sizing
  const responsiveRadius = useMemo(() => {
    if (isMobile) return Math.min(radius * 0.6, 180);
    if (isTablet) return Math.min(radius * 0.8, 240);
    return radius;
  }, [radius, isMobile, isTablet]);

  const responsiveItemWidth = useMemo(() => {
    if (isMobile) return Math.min(itemWidth * 0.7, 140);
    if (isTablet) return Math.min(itemWidth * 0.85, 170);
    return itemWidth;
  }, [itemWidth, isMobile, isTablet]);

  const responsiveItemHeight = useMemo(() => {
    if (isMobile) return Math.min(itemHeight * 0.7, 210);
    if (isTablet) return Math.min(itemHeight * 0.85, 255);
    return itemHeight;
  }, [itemHeight, isMobile, isTablet]);

  // State management
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastRotation, setLastRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const autoRotateRef = useRef(null);

  // Calculate positions for dome arrangement
  const itemPositions = useMemo(() => {
    if (!items.length) return [];
    
    const angleStep = (2 * Math.PI) / items.length;
    
    return items.map((item, index) => {
      const angle = index * angleStep + (rotation * Math.PI) / 180;
      const x = Math.sin(angle) * responsiveRadius;
      const z = Math.cos(angle) * responsiveRadius;
      const rotateY = (index * 360) / items.length + rotation;
      
      return {
        ...item,
        x,
        z,
        rotateY,
        index,
        isCenter: Math.abs(angle % (2 * Math.PI)) < angleStep / 2
      };
    });
  }, [items, rotation, responsiveRadius]);

  // Preload images
  useEffect(() => {
    if (!items.length) return;

    const imagePromises = items.map(item => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = item.img;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(error => {
        console.warn('Some images failed to load:', error);
        setImagesLoaded(true); // Continue anyway
      });
  }, [items]);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const startAutoRotation = () => {
      const startTime = Date.now();
      const startRotation = rotation;

      const animate = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const newRotation = startRotation + (360 / autoRotateSpeed) * elapsed;
        setRotation(newRotation % 360);
        autoRotateRef.current = requestAnimationFrame(animate);
      };

      autoRotateRef.current = requestAnimationFrame(animate);
    };

    startAutoRotation();

    return () => {
      if (autoRotateRef.current) {
        cancelAnimationFrame(autoRotateRef.current);
      }
    };
  }, [autoRotate, autoRotateSpeed, isDragging, rotation]);

  // Mouse control handlers
  const handleMouseDown = useCallback((e) => {
    if (!enableMouseControl) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setLastRotation(rotation);
    
    if (autoRotateRef.current) {
      cancelAnimationFrame(autoRotateRef.current);
    }
  }, [enableMouseControl, rotation]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !enableMouseControl) return;
    
    const deltaX = e.clientX - dragStart.x;
    const sensitivity = 0.5;
    const newRotation = lastRotation + deltaX * sensitivity;
    
    setRotation(newRotation);
  }, [isDragging, enableMouseControl, dragStart.x, lastRotation]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch control handlers
  const handleTouchStart = useCallback((e) => {
    if (!enableTouchControl) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setLastRotation(rotation);
    
    if (autoRotateRef.current) {
      cancelAnimationFrame(autoRotateRef.current);
    }
  }, [enableTouchControl, rotation]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !enableTouchControl) return;
    
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    const sensitivity = 0.5;
    const newRotation = lastRotation + deltaX * sensitivity;
    
    setRotation(newRotation);
  }, [isDragging, enableTouchControl, dragStart.x, lastRotation]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse events
    if (enableMouseControl) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    // Touch events
    if (enableTouchControl) {
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (enableMouseControl) {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      }
      
      if (enableTouchControl) {
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [enableMouseControl, enableTouchControl, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Handle item click
  const handleItemClick = useCallback((item, index) => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
    setSelectedIndex(index);
  }, []);

  if (!items.length) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
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
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '400px' : isTablet ? '500px' : '600px',
        perspective: perspective,
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Loading state */}
      {!imagesLoaded && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#FFFFFF',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          opacity: 0.7
        }}>
          Loading gallery...
        </div>
      )}

      {/* 3D Dome Container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: responsiveItemWidth + 'px',
          height: responsiveItemHeight + 'px',
          transformStyle: 'preserve-3d',
          transform: 'translate(-50%, -50%)',
          transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          opacity: imagesLoaded ? 1 : 0
        }}
      >
        {itemPositions.map((item, index) => (
          <div
            key={item.id || index}
            style={{
              position: 'absolute',
              width: responsiveItemWidth + 'px',
              height: responsiveItemHeight + 'px',
              transform: `translate3d(${item.x}px, 0, ${item.z}px) rotateY(${item.rotateY}deg)`,
              transformStyle: 'preserve-3d',
              cursor: 'pointer',
              transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              opacity: item.z < -responsiveRadius * 0.5 ? 0.3 : 1,
              zIndex: Math.round(item.z + responsiveRadius)
            }}
            onClick={() => handleItemClick(item, index)}
          >
            {/* Glassmorphism Card */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'rgba(22, 22, 22, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(56, 56, 56, 0.3)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                transform: selectedIndex === index ? 'scale(1.05)' : 'scale(1)',
                ':hover': {
                  transform: 'scale(1.02)',
                  border: '1px solid rgba(49, 157, 255, 0.5)'
                }
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: '100%',
                  height: '70%',
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
                    padding: '12px',
                    height: '30%',
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
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: '600',
                        marginBottom: '4px',
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
                        fontSize: isMobile ? '10px' : '12px',
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
              const targetRotation = -(index * 360) / items.length;
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

export default DomeGallery;
