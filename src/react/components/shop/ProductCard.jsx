/**
 * ProductCard - Individual product card with glassmorphism styling
 * Features 3:4 aspect ratio image carousel, title, price, and Add to Cart button
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

const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL'];

const sortSizes = (sizes) => {
  return [...sizes].sort((a, b) => {
    const indexA = SIZE_ORDER.indexOf(a.toUpperCase());
    const indexB = SIZE_ORDER.indexOf(b.toUpperCase());

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1; // Known size comes first
    if (indexB !== -1) return 1;

    // Fallback for unknown sizes (e.g. numeric)
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });
};

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
    ? sortSizes(product.sizes.filter(v => v.stock > 0).map(v => v.size))
    : [];

  // Inline SVG placeholder as data URI
  const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23666'%3E%3Crect width='200' height='200' fill='%23222'/%3E%3Cpath d='M80 70h40v60H80z' fill='%23444'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23555'/%3E%3Cpath d='M80 130l20-25 10 15 10-10 20 20H80z' fill='%23555'/%3E%3C/svg%3E";

  // Get all image URLs
  const getImageUrls = () => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      if (typeof product.images[0] === 'object' && product.images[0].url) {
        return product.images
          .sort((a, b) => {
            if (a.is_primary && !b.is_primary) return -1;
            if (!a.is_primary && b.is_primary) return 1;
            return (a.sort_order || 0) - (b.sort_order || 0);
          })
          .map(img => img.url);
      }
      return product.images;
    }
    if (product.image_url) {
      return [product.image_url];
    }
    return [PLACEHOLDER_IMAGE];
  };

  const images = getImageUrls();
  const imageCount = images.length;

  // Handle scroll to update current image index
  const handleScroll = (e) => {
    const scrollLeft = e.target.scrollLeft;
    const width = e.target.offsetWidth;
    if (scrollLeft < 0) {
      e.target.scrollLeft = 0;
      return;
    }
    const newIndex = Math.round(scrollLeft / width);
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
    }
  };

  // Handle add to cart button click
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (isOutOfStock || isLoading) return;

    if (availableSizes.length > 0) {
      setShowSizes(!showSizes);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    addItem(product, 1);
    toggleCart(true);
    if (onAddToCart) onAddToCart(product);
    setIsLoading(false);
  };

  // Handle size selection
  const handleSizeSelect = async (e, size) => {
    e.stopPropagation();
    if (isLoading) return;

    setIsLoading(true);
    setShowSizes(false);
    await new Promise(resolve => setTimeout(resolve, 600));

    const itemToAdd = { ...product, size };
    addItem(itemToAdd, 1);
    toggleCart(true);
    if (onAddToCart) onAddToCart(itemToAdd);
    setIsLoading(false);
  };

  // Navigate to product detail page
  const handleCardClick = () => {
    navigateTo(`/shop/${product.id}`);
  };

  // Calculate expanded width for size selector
  const expandedWidth = availableSizes.length > 0
    ? `${Math.min(availableSizes.length * 44 + 8, 220)}px`
    : '40px';

  return (
    <div
      style={{
        background: 'transparent',
        border: 'none',
        borderRadius: '0',
        overflow: 'visible',
        cursor: 'pointer',
        position: 'relative',
        opacity: 0,
        animation: 'fadeInUp 0.6s ease-out forwards',
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsButtonHovered(false);
        setShowSizes(false);
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
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .product-carousel::-webkit-scrollbar { display: none; }
        .product-carousel { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Image Container - Contains carousel, dots, and add button */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '133%', // 3:4 aspect ratio
          overflow: 'hidden',
          backgroundColor: 'rgba(30, 30, 30, 0.5)',
          borderRadius: '4px',
        }}
      >
        {/* Scrollable Carousel */}
        <div
          className="product-carousel"
          onScroll={handleScroll}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {images.map((imgUrl, idx) => (
            <div
              key={idx}
              style={{
                flex: '0 0 100%',
                width: '100%',
                minWidth: '100%',
                height: '100%',
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
                flexShrink: 0,
              }}
            >
              <img
                src={imgUrl}
                alt={`${product.name} - Image ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 300ms ease',
                  transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                }}
                loading="lazy"
                draggable="false"
              />
            </div>
          ))}
        </div>

        {/* Image Dots Indicator */}
        {imageCount > 1 && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '0',
              right: '0',
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
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

        {/* Add to Cart / Size Selector Button - INSIDE imageContainer */}
        {!isOutOfStock && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              height: '40px',
              width: showSizes ? expandedWidth : '40px',
              background: '#FFFFFF',
              borderRadius: showSizes ? '20px' : '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: showSizes ? 'default' : 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
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
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  border: '2px solid rgba(0,0,0,0.1)',
                  borderTop: '2px solid #000',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  flexShrink: 0,
                }}
              />
            ) : showSizes ? (
              <div style={{ display: 'flex', gap: '4px', animation: 'fadeIn 0.2s ease' }}>
                {availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeSelect(e, size)}
                    style={{
                      minWidth: '36px',
                      height: '32px',
                      border: 'none',
                      background: 'transparent',
                      borderRadius: '16px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#000000',
                      cursor: 'pointer',
                      padding: '0 8px',
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#000000', flexShrink: 0 }}
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Product Info - Title and Price */}
      <div style={{ padding: '8px 0 0 0' }}>
        <h3
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '1.4',
            color: '#FFFFFF',
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {product.name}
        </h3>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '0',
          }}
        >
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
