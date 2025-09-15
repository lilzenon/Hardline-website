import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Optimized Masonry Gallery Component
 * Features: Responsive layout, lazy loading, glassmorphism design, dynamic sizing
 */
const MasonryGallery = ({ 
  images = [], 
  columns = { desktop: 4, tablet: 3, mobile: 2 },
  gap = 16,
  className = '',
  onImageClick = null 
}) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [columnCount, setColumnCount] = useState(columns.desktop);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);
  const observerRef = useRef(null);

  // Responsive column calculation
  const updateColumns = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setColumnCount(columns.mobile);
    } else if (width < 1024) {
      setColumnCount(columns.tablet);
    } else {
      setColumnCount(columns.desktop);
    }
  }, [columns]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observerRef.current.observe(galleryRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  // Responsive listener
  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [updateColumns]);

  // Handle image load
  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set([...prev, index]));
  }, []);

  // Distribute images across columns
  const distributeImages = useCallback(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    const colHeights = Array(columnCount).fill(0);

    images.forEach((image, index) => {
      // Find column with minimum height
      const minHeightIndex = colHeights.indexOf(Math.min(...colHeights));
      cols[minHeightIndex].push({ ...image, originalIndex: index });
      
      // Estimate height based on aspect ratio (fallback if not provided)
      const aspectRatio = image.aspectRatio || (image.height / image.width) || 1.2;
      const estimatedHeight = 300 * aspectRatio; // Base width of 300px
      colHeights[minHeightIndex] += estimatedHeight + gap;
    });

    return cols;
  }, [images, columnCount, gap]);

  const imageColumns = distributeImages();

  if (!isVisible) {
    return (
      <div 
        ref={galleryRef}
        className={`masonry-gallery-placeholder ${className}`}
        style={{
          height: '400px',
          background: 'rgba(22, 22, 22, 0.8)',
          borderRadius: '16px',
          border: '1px solid rgba(56, 56, 56, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px'
        }}
      >
        Loading gallery...
      </div>
    );
  }

  return (
    <div 
      ref={galleryRef}
      className={`masonry-gallery ${className}`}
      style={{
        display: 'flex',
        gap: `${gap}px`,
        width: '100%',
        alignItems: 'flex-start'
      }}
    >
      {imageColumns.map((column, colIndex) => (
        <div
          key={colIndex}
          className="masonry-column"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`
          }}
        >
          {column.map((image) => (
            <MasonryImage
              key={image.originalIndex}
              image={image}
              isLoaded={loadedImages.has(image.originalIndex)}
              onLoad={() => handleImageLoad(image.originalIndex)}
              onClick={onImageClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * Individual Masonry Image Component
 */
const MasonryImage = ({ image, isLoaded, onLoad, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  const handleImageLoad = useCallback(() => {
    onLoad();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    onLoad(); // Still mark as "loaded" to prevent infinite loading
  }, [onLoad]);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(image);
    }
  }, [onClick, image]);

  return (
    <div
      className="masonry-image-container"
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(22, 22, 22, 0.8)',
        border: '1px solid rgba(56, 56, 56, 0.3)',
        backdropFilter: 'blur(20px)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        opacity: isLoaded ? 1 : 0.7
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.target.style.transform = 'scale(1.02)';
          e.target.style.borderColor = 'rgba(49, 157, 255, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.target.style.transform = 'scale(1)';
          e.target.style.borderColor = 'rgba(56, 56, 56, 0.3)';
        }
      }}
    >
      {!imageError ? (
        <img
          ref={imgRef}
          src={image.src}
          alt={image.alt || 'Gallery image'}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.3s ease'
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            background: 'rgba(22, 22, 22, 0.9)'
          }}
        >
          Image unavailable
        </div>
      )}
      
      {image.title && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
            color: 'white',
            padding: '16px 12px 12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {image.title}
        </div>
      )}
    </div>
  );
};

export default MasonryGallery;
