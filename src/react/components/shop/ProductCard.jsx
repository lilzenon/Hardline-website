/**
 * ProductCard - Individual product card with glassmorphism styling
 * Features 1:1 aspect ratio image, title, price, and Add to Cart button
 * Clicking the card navigates to the product detail page (/shop/:productId)
 *
 * @example
 * <ProductCard product={product} onAddToCart={handleAdd} />
 */

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

/**
 * Navigate to a path using the app's navigation system
 * @param {string} path - The path to navigate to
 */
const navigateTo = (path) => {
  if (window.navigateWithTransition) {
    window.navigateWithTransition(path);
  } else {
    window.location.href = path;
  }
};

// Minimalist styles
const cardStyles = {
  container: {
    background: 'transparent', // No background
    border: 'none', // No border
    borderRadius: '0',
    overflow: 'visible', // Allow content to flow
    cursor: 'pointer',
    position: 'relative',
  },
  containerHover: {
    // No transform on container hover for minimal style
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '133%', // 3:4 aspect ratio
    overflow: 'hidden',
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    borderRadius: '4px', // Small radius on image only
  },
  // New scroll container for fluid swiping
  scrollContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none', // Hide scrollbar Firefox
    msOverflowStyle: 'none', // Hide scrollbar IE/Edge
    WebkitOverflowScrolling: 'touch', // iOS momentum scrolling
  },
  imageWrapper: {
    flex: '0 0 100%',
    width: '100%',
    height: '100%',
    scrollSnapAlign: 'start',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 300ms ease',
  },
  imageHover: {
    transform: 'scale(1.03)', // Subtle zoom
  },
  content: {
    padding: '12px 0 0 0', // Top padding only
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '1.4',
    color: '#FFFFFF',
    marginBottom: '4px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  price: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 400,
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.7)', // White/Gray price
    marginBottom: '0',
  },
  // Minimal + button overlay
  addButton: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    width: '32px',
    height: '32px',
    background: '#FFFFFF',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s ease, background 0.2s ease',
    zIndex: 10,
    color: '#000000',
  },
  addButtonHover: {
    transform: 'scale(1.1)',
  },
};

/**
 * Format price as currency
 * @param {number} cents - Price in cents
 * @returns {string} Formatted price
 */
function formatPrice(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem, toggleCart } = useCart();

  const isOutOfStock = product.stock_quantity !== null && product.stock_quantity <= 0;

  // Get available sizes
  const hasVariants = product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0;
  const availableSizes = hasVariants
    ? product.sizes.filter(v => v.stock > 0).map(v => v.size)
    : [];

  // Inline SVG placeholder as data URI - no external file needed
  const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23666'%3E%3Crect width='200' height='200' fill='%23222'/%3E%3Cpath d='M80 70h40v60H80z' fill='%23444'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23555'/%3E%3Cpath d='M80 130l20-25 10 15 10-10 20 20H80z' fill='%23555'/%3E%3C/svg%3E";

  // Get all image URLs
  const getImageUrls = () => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      // New format: array of objects with url property
      if (typeof product.images[0] === 'object' && product.images[0].url) {
        // Sort by sort_order, primary first
        return product.images
          .sort((a, b) => {
            if (a.is_primary && !b.is_primary) return -1;
            if (!a.is_primary && b.is_primary) return 1;
            return (a.sort_order || 0) - (b.sort_order || 0);
          })
          .map(img => img.url);
      }
      // Legacy format: array of strings
      return product.images;
    }
    // Fallback to single image_url
    if (product.image_url) {
      return [product.image_url];
    }
    return [PLACEHOLDER_IMAGE];
  };

  const images = getImageUrls();
  const imageCount = images.length;

  // Handle scroll to update index
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
    }
  };

  /**
   * Handle add to cart button click
   * Stops propagation to prevent card click navigation
   */
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isOutOfStock || isLoading) return;

    // If product has sizes, toggle size selection
    if (availableSizes.length > 0) {
      setShowSizes(!showSizes);
      return;
    }

    // Default add to cart (no sizes)
    setIsLoading(true);

    // Simulate network delay for animation
    await new Promise(resolve => setTimeout(resolve, 600));

    addItem(product, 1);
    toggleCart(true); // Open cart modal

    if (onAddToCart) {
      onAddToCart(product);
    }
    setIsLoading(false);
  };

  /**
   * Handle specific size selection
   */
  const handleSizeSelect = async (e, size) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    setShowSizes(false); // Collapse back to +

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Add item with selected size
    const itemToAdd = {
      ...product,
      size: size
    };

    addItem(itemToAdd, 1);
    toggleCart(true);

    if (onAddToCart) {
      onAddToCart(itemToAdd);
    }
    setIsLoading(false);
  };

  /**
   * Handle card click - navigates to product detail page
   */
  const handleCardClick = () => {
    navigateTo(`/shop/${product.id}`);
  };

  // Calculate expanded width based on number of sizes
  // 32px per size + 8px padding
  const expandedWidth = availableSizes.length > 0
    ? `${Math.min(availableSizes.length * 36 + 8, 200)}px`
    : '32px';

  return (
    <div
      style={{
        ...cardStyles.container,
        ...(isHovered ? cardStyles.containerHover : {}),
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsButtonHovered(false);
        setShowSizes(false); // Close sizes on mouse leave
      }}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      aria-label={`${product.name} - ${formatPrice(product.price)}. Click to view details.`}
    >
      {/* Product Image Container */}
      <div style={cardStyles.imageContainer}>
        {/* Scrollable Image Track */}
        <div
          style={cardStyles.scrollContainer}
          onScroll={handleScroll}
          className="no-scrollbar"
        >
          <style>{`
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          {images.map((imgUrl, idx) => (
            <div key={idx} style={cardStyles.imageWrapper}>
              <img
                src={imgUrl}
                alt={`${product.name} - Image ${idx + 1}`}
                style={{
                  ...cardStyles.image,
                  ...(isHovered ? cardStyles.imageHover : {}),
                }}
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>

        {/* Image Dots */}
        {imageCount > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '0',
            right: '0',
            display: 'flex',
            justifyContent: 'center',
            gap: '6px',
            zIndex: 2,
            pointerEvents: 'none',
          }}>
            {images.map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: idx === currentImageIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                  transition: 'background 0.2s ease',
                }}
              />
            ))}
          </div>
        )}

        {/* Minimal Add to Cart / Size Selector Button */}
        {!isOutOfStock && (
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              height: '32px',
              width: showSizes ? expandedWidth : '32px',
              background: '#FFFFFF',
              borderRadius: showSizes ? '16px' : '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: showSizes ? 'center' : 'center',
              cursor: showSizes ? 'default' : 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 10,
              overflow: 'hidden',
              padding: showSizes ? '0 4px' : '0',
            }}
            onClick={!showSizes ? handleAddToCart : (e) => e.stopPropagation()}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {isLoading ? (
              <div style={{
                width: '14px',
                height: '14px',
                border: '2px solid rgba(0,0,0,0.1)',
                borderTop: '2px solid #000',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                flexShrink: 0,
              }}>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
            ) : showSizes ? (
              <div style={{ display: 'flex', gap: '4px', animation: 'fadeIn 0.2s ease' }}>
                <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
                {availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeSelect(e, size)}
                    style={{
                      minWidth: '28px',
                      height: '24px',
                      border: 'none',
                      background: 'transparent',
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#000000',
                      cursor: 'pointer',
                      padding: '0 6px',
                      transition: 'background 0.2s ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    {size}
                  </button>
                ))}
              </div>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#000000', flexShrink: 0 }}>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={cardStyles.content}>
        <h3 style={cardStyles.title}>{product.name}</h3>
        <p style={cardStyles.price}>
          {isOutOfStock ? (
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>Out of Stock</span>
          ) : (
            formatPrice(product.price)
          )}
        </p>
      </div>
    </div>
  );
}
