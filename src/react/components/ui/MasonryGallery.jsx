import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Modern Masonry Gallery Component with Image Expansion
 * Features: Responsive layout, lazy loading, glassmorphism design, modern animations, image expansion modal
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
  const [expandedImage, setExpandedImage] = useState(null);
  const [imageLoadingStates, setImageLoadingStates] = useState(new Map());
  const galleryRef = useRef(null);
  const observerRef = useRef(null);
  const modalRef = useRef(null);

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
    setImageLoadingStates(prev => new Map(prev.set(index, 'loaded')));
  }, []);

  // Handle image loading start
  const handleImageLoadStart = useCallback((index) => {
    setImageLoadingStates(prev => new Map(prev.set(index, 'loading')));
  }, []);

  // Handle image click for expansion
  const handleImageClick = useCallback((image, index) => {
    console.log('🖼️ Image clicked:', image);
    console.log('🔍 Image properties:', Object.keys(image));

    // Ensure we have a valid image URL
    const imageUrl = image.url || image.src || image.image_url || image.file_url;
    console.log('🔗 Image URL found:', imageUrl);

    if (imageUrl) {
      setExpandedImage({
        ...image,
        url: imageUrl, // Normalize the URL property
        index
      });
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    } else {
      console.error('❌ No valid image URL found in image object:', image);
    }

    if (onImageClick) onImageClick(image);
  }, [onImageClick]);

  // Close expanded image
  const closeExpandedImage = useCallback(() => {
    setExpandedImage(null);
    document.body.style.overflow = 'unset'; // Restore scroll
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && expandedImage) {
        closeExpandedImage();
      }
    };

    if (expandedImage) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [expandedImage, closeExpandedImage]);

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

  // Modern CSS animations and styles
  const galleryStyles = `
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -200px 0;
      }
      100% {
        background-position: calc(200px + 100%) 0;
      }
    }

    @keyframes modalFadeIn {
      from {
        opacity: 0;
        backdrop-filter: blur(0px);
      }
      to {
        opacity: 1;
        backdrop-filter: blur(20px);
      }
    }

    @keyframes imageExpand {
      from {
        opacity: 0;
        transform: scale(0.8) translateY(20px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .masonry-image {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      border-radius: 12px;
      overflow: hidden;
    }

    .masonry-image:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    }

    .skeleton-shimmer {
      background: linear-gradient(90deg,
        rgba(22, 22, 22, 0.8) 25%,
        rgba(56, 56, 56, 0.4) 50%,
        rgba(22, 22, 22, 0.8) 75%
      );
      background-size: 200px 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 12px;
    }

    .modal-backdrop {
      animation: modalFadeIn 0.3s ease-out;
    }

    .expanded-image {
      animation: imageExpand 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      .masonry-image, .masonry-image:hover {
        transition: none;
        transform: none;
      }
      .skeleton-shimmer {
        animation: none;
      }
    }
  `;

  if (!isVisible) {
    return (
      <>
        <style>{galleryStyles}</style>
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
          Loading Gallery...
        </div>
      </>
    );
  }

  return (
    <>
      <style>{galleryStyles}</style>
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
                loadingState={imageLoadingStates.get(image.originalIndex)}
                onLoad={() => handleImageLoad(image.originalIndex)}
                onLoadStart={() => handleImageLoadStart(image.originalIndex)}
                onClick={() => handleImageClick(image, image.originalIndex)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div
          ref={modalRef}
          className="modal-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
            cursor: 'pointer'
          }}
          onClick={closeExpandedImage}
        >
          <div
            className="expanded-image"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={expandedImage.urls?.large || expandedImage.url || expandedImage.src || expandedImage.image_url || expandedImage.file_url}
              alt={expandedImage.alt || expandedImage.title || 'Gallery image'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)'
              }}
              onError={(e) => {
                // Enhanced error handling for modal with fallback variants
                const target = e.target;
                const currentSrc = target.src;

                if (expandedImage.urls) {
                  if (currentSrc !== expandedImage.urls.medium && expandedImage.urls.medium) {
                    console.log('🔄 Modal fallback to medium variant');
                    target.src = expandedImage.urls.medium;
                    return;
                  } else if (currentSrc !== expandedImage.urls.original && expandedImage.urls.original) {
                    console.log('🔄 Modal fallback to original');
                    target.src = expandedImage.urls.original;
                    return;
                  }
                }

                console.error('❌ Modal image failed to load:', expandedImage);
                target.style.display = 'none';
              }}
              onLoad={() => {
                console.log('✅ Modal image loaded successfully');
              }}
            />
            <button
              onClick={closeExpandedImage}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.8)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * Individual Masonry Image Component with Modern Loading States
 */
const MasonryImage = ({ image, isLoaded, loadingState, onLoad, onLoadStart, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef(null);

  const handleImageLoad = useCallback(() => {
    onLoad();
  }, [onLoad]);

  const handleImageLoadStart = useCallback(() => {
    onLoadStart();
  }, [onLoadStart]);

  const handleImageError = useCallback(() => {
    try {
      const attempted = image?.url || image?.src || image?.image_url || image?.file_url;
      console.error('❌ Gallery image failed to load:', { attemptedUrl: attempted, image });
    } catch (e) {
      // no-op
    }
    setImageError(true);
    onLoad(); // Still mark as "loaded" to prevent infinite loading
  }, [onLoad, image]);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(image);
    }
  }, [onClick, image]);

  return (
    <div
      className="masonry-image masonry-image-container"
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(22, 22, 22, 0.8)',
        border: '1px solid rgba(56, 56, 56, 0.3)',
        backdropFilter: 'blur(20px)',
        cursor: onClick ? 'pointer' : 'default',
        opacity: isLoaded ? 1 : 0.9,
        animation: isLoaded ? 'fadeInScale 0.5s ease-out' : 'none'
      }}
      onClick={handleClick}
    >
      {/* Modern Skeleton Loader */}
      {!isLoaded && !imageError && (
        <div
          className="skeleton-shimmer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '200px'
          }}
        >
          <div style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif'
          }}>
            Loading...
          </div>
        </div>
      )}
      {!imageError ? (
        <img
          ref={imgRef}
          src={image.url || image.src || image.image_url || image.file_url}
          srcSet={image.srcSet ? `
            ${image.srcSet.small || image.urls?.small} 400w,
            ${image.srcSet.medium || image.urls?.medium} 600w,
            ${image.srcSet.large || image.urls?.large} 800w
          `.trim() : (image.urls ? `
            ${image.urls.small} 400w,
            ${image.urls.medium} 600w,
            ${image.urls.large} 800w
          `.trim() : undefined)}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={image.alt || image.title || 'Gallery image'}
          loading="lazy"
          onLoadStart={handleImageLoadStart}
          onLoad={handleImageLoad}
          onError={(e) => {
            // Enhanced error handling with fallback to different variants
            const target = e.target;
            const currentSrc = target.src;

            // Try fallback variants in order: medium -> small -> original
            if (image.urls) {
              if (currentSrc !== image.urls.medium && image.urls.medium) {
                console.log('🔄 Fallback to medium variant:', image.urls.medium);
                target.src = image.urls.medium;
                return;
              } else if (currentSrc !== image.urls.small && image.urls.small) {
                console.log('🔄 Fallback to small variant:', image.urls.small);
                target.src = image.urls.small;
                return;
              } else if (currentSrc !== image.urls.original && image.urls.original) {
                console.log('🔄 Fallback to original:', image.urls.original);
                target.src = image.urls.original;
                return;
              }
            }

            // Final fallback
            handleImageError(e);
          }}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.3s ease',
            opacity: isLoaded ? 1 : 0
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
