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
  const [isClosingModal, setIsClosingModal] = useState(false);
  const galleryRef = useRef(null);
  const observerRef = useRef(null);
  const modalRef = useRef(null);
  const lastCloseTimeRef = useRef(0);

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

  // Check if device is mobile
  const isMobile = useCallback(() => {
    return window.innerWidth < 768;
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    // Fallback for browsers without IntersectionObserver
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (galleryRef.current) {
      observerRef.current.observe(galleryRef.current);
    } else {
      // If ref not ready yet, ensure visibility after a short delay
      const t = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(t);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  // Responsive listener
  useEffect(() => {
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [updateColumns]);
  // Safety fallback: if images arrive but observer didn't trigger, force visibility
  useEffect(() => {
    if (!isVisible && Array.isArray(images) && images.length > 0) {
      const t = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, [images, isVisible]);


  // Handle image load
  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set([...prev, index]));
    setImageLoadingStates(prev => new Map(prev.set(index, 'loaded')));
  }, []);

  // Handle image loading start
  const handleImageLoadStart = useCallback((index) => {
    setImageLoadingStates(prev => new Map(prev.set(index, 'loading')));
  }, []);

  // Handle image click for expansion with debouncing
  const handleImageClick = useCallback((image, index) => {
    // Prevent opening new image too soon after closing one (debounce)
    const now = Date.now();
    if (now - lastCloseTimeRef.current < 300) {
      console.log('🚫 Image click ignored - too soon after modal close');
      return;
    }

    // Prevent opening if modal is currently closing
    if (isClosingModal) {
      console.log('🚫 Image click ignored - modal is closing');
      return;
    }

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
  }, [onImageClick, isClosingModal]);

  // Close expanded image with proper event handling and timing
  const closeExpandedImage = useCallback((e) => {
    // Prevent event propagation to avoid triggering other image clicks
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      // Use stopImmediatePropagation only if available
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }
    }

    // Set closing state to prevent immediate reopening
    setIsClosingModal(true);
    lastCloseTimeRef.current = Date.now();

    // Close the modal
    setExpandedImage(null);
    document.body.style.overflow = 'unset'; // Restore scroll

    // Reset closing state after a short delay
    setTimeout(() => {
      setIsClosingModal(false);
    }, 100);
  }, []);

  // Handle modal backdrop clicks with proper event control
  const handleModalBackdropClick = useCallback((e) => {
    // Only close if clicking directly on the backdrop (not on child elements)
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      // Use stopImmediatePropagation only if available
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }
      closeExpandedImage(e);
    }
  }, [closeExpandedImage]);

  // Handle touch events for mobile with proper event control
  const handleModalTouch = useCallback((e) => {
    // Close modal on touch outside image (backdrop area)
    if (e.target === e.currentTarget) {
      e.preventDefault();
      e.stopPropagation();
      // Use stopImmediatePropagation only if available
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }
      closeExpandedImage(e);
    }
  }, [closeExpandedImage]);

  // Enhanced keyboard handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!expandedImage) return;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeExpandedImage();
          break;
        case 'Enter':
        case ' ': // Spacebar
          e.preventDefault();
          closeExpandedImage();
          break;
        default:
          break;
      }
    };

    if (expandedImage) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus the modal for keyboard accessibility
      if (modalRef.current) {
        modalRef.current.focus();
      }
      return () => document.removeEventListener('keydown', handleKeyDown);
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
        rgba(22, 22, 22, 0.9) 25%,
        rgba(56, 56, 56, 0.5) 50%,
        rgba(22, 22, 22, 0.9) 75%
      );
      background-size: 200px 100%;
      animation: shimmer 2s ease-in-out infinite;
      border-radius: 12px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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
            height: 'auto', // Auto height to prevent artifacts
            background: 'transparent', // Transparent to prevent artifacts
            backdropFilter: 'none', // Remove blur to prevent artifacts
            WebkitBackdropFilter: 'none', // Remove webkit blur to prevent artifacts
            borderRadius: '16px',
            border: 'none', // Remove border to prevent artifacts
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'transparent', // Invisible text to prevent artifacts
            fontFamily: 'Inter, sans-serif',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'all 0.3s ease', // Smooth transition when loading
            opacity: 0, // Completely invisible to prevent artifacts
            animation: 'none' // Remove animation to prevent artifacts
          }}
        >
          <div style={{
            display: 'none', // Hide content to prevent artifacts
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderTop: '2px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span>Loading Gallery...</span>
          </div>
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
            backgroundColor: isClosingModal ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: isMobile() ? '60px 30px' : '40px', // Larger padding for better click-to-close area
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            // Add visual hint for click-to-close
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none'
            }
          }}
          onClick={handleModalBackdropClick}
          onTouchEnd={handleModalTouch}
          title="Click outside image to close"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded gallery image"
          tabIndex={0}
        >
          <div
            className="expanded-image"
            style={{
              maxWidth: isMobile() ? '70vw' : '85vw', // Optimized for better click-to-close area
              maxHeight: isMobile() ? '50vh' : '85vh', // Optimized for better click-to-close area
              position: 'relative',
              // Ensure minimum clickable area around image on mobile
              margin: isMobile() ? '30px' : '20px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7)',
              transition: 'transform 0.2s ease',
              transform: isClosingModal ? 'scale(0.95)' : 'scale(1)'
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Use stopImmediatePropagation only if available
              if (typeof e.stopImmediatePropagation === 'function') {
                e.stopImmediatePropagation();
              }
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Use stopImmediatePropagation only if available
              if (typeof e.stopImmediatePropagation === 'function') {
                e.stopImmediatePropagation();
              }
            }}
          >
            <img
              src={expandedImage.urls?.large || expandedImage.url || expandedImage.src || expandedImage.image_url || expandedImage.file_url}
              alt={expandedImage.alt || expandedImage.title || 'Gallery image'}
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
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
            {/* Enhanced Close Button with Better Event Handling */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Use stopImmediatePropagation only if available
                if (typeof e.stopImmediatePropagation === 'function') {
                  e.stopImmediatePropagation();
                }
                closeExpandedImage(e);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Use stopImmediatePropagation only if available
                if (typeof e.stopImmediatePropagation === 'function') {
                  e.stopImmediatePropagation();
                }
                closeExpandedImage(e);
              }}
              aria-label="Close image"
              style={{
                position: 'absolute',
                top: isMobile() ? '10px' : '-10px',
                right: isMobile() ? '10px' : '-10px',
                width: isMobile() ? '44px' : '40px', // Larger touch target on mobile
                height: isMobile() ? '44px' : '40px',
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 10001, // Ensure it's above everything
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(0, 0, 0, 0.8)';
                e.target.style.transform = 'scale(1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
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
        background: 'transparent', // Always transparent to prevent artifacts
        border: 'none', // Always no border to prevent artifacts
        backdropFilter: 'none', // Remove backdrop filter to prevent artifacts
        WebkitBackdropFilter: 'none', // Remove webkit backdrop filter to prevent artifacts
        cursor: onClick ? 'pointer' : 'default',
        opacity: isLoaded ? 1 : 0, // Completely invisible until loaded
        animation: isLoaded ? 'fadeInScale 0.5s ease-out' : 'none',
        // Remove fixed aspect ratio - let images determine their natural size
        width: '100%',
        // No minimum height to prevent any container artifacts
        minHeight: 'auto'
      }}
      onClick={handleClick}
    >
      {/* Hidden Skeleton Loader - No Artifacts */}
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
            display: 'none', // Hide skeleton loader to prevent artifacts
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'auto', // Remove minimum height
            background: 'transparent', // Transparent to prevent artifacts
            backdropFilter: 'none', // Remove blur to prevent artifacts
            WebkitBackdropFilter: 'none', // Remove webkit blur to prevent artifacts
            borderRadius: '12px',
            border: 'none' // Remove border to prevent artifacts
          }}
        >
          <div style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500',
            textAlign: 'center',
            padding: '8px'
          }}>
            Loading...
          </div>
        </div>
      )}
      {!imageError ? (
        <img
          ref={imgRef}
          src={image.url || image.src || image.image_url || image.file_url}
          srcSet={(() => {
            const small = image?.srcSet?.small || image?.urls?.small;
            const medium = image?.srcSet?.medium || image?.urls?.medium;
            const large = image?.srcSet?.large || image?.urls?.large;
            const parts = [];
            if (small) parts.push(`${small} 400w`);
            if (medium) parts.push(`${medium} 600w`);
            if (large) parts.push(`${large} 800w`);
            return parts.length ? parts.join(', ') : undefined;
          })()}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={image.alt || image.title || 'Gallery image'}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
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

            // Cache-busting single retry before final fallback
            const attempt = parseInt(target.dataset.retryAttempt || '0', 10);
            if (attempt < 1 && currentSrc) {
              const sep = currentSrc.includes('?') ? '&' : '?';
              target.dataset.retryAttempt = '1';
              console.log('🔄 Cache-busting retry for image:', currentSrc);
              target.src = `${currentSrc}${sep}_cb=${Date.now()}`;
              return;
            }

            // Final fallback
            handleImageError(e);
          }}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            transition: 'opacity 0.4s ease, transform 0.3s ease',
            opacity: isLoaded ? 1 : 0
            // Removed objectFit and aspectRatio to allow natural image sizing
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            minHeight: '200px', // Use reasonable minimum height instead of fixed aspect ratio
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            background: 'rgba(22, 22, 22, 0.9)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '12px',
            border: '1px solid rgba(56, 56, 56, 0.2)'
          }}
        >
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ marginBottom: '8px', fontSize: '18px', opacity: 0.7 }}>📷</div>
            <div>Image unavailable</div>
          </div>
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
