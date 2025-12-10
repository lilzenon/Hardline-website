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

// Glassmorphism card styles
const cardStyles = {
  container: {
    background: 'rgba(22, 22, 22, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(56, 56, 56, 0.3)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 200ms ease',
    cursor: 'pointer',
  },
  containerHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%', // 1:1 aspect ratio
    overflow: 'hidden',
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 300ms ease',
  },
  imageHover: {
    transform: 'scale(1.05)',
  },
  content: {
    padding: '16px',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '1.3',
    color: '#FFFFFF',
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  price: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '18px',
    color: '#319DFF',
    marginBottom: '12px',
  },
  button: {
    width: '100%',
    padding: '12px 16px',
    minHeight: '44px', // iOS touch target
    background: 'linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'opacity 200ms ease, transform 100ms ease',
  },
  buttonHover: {
    opacity: 0.9,
  },
  buttonActive: {
    transform: 'scale(0.98)',
  },
  outOfStock: {
    background: 'rgba(100, 100, 100, 0.5)',
    cursor: 'not-allowed',
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
  const [isButtonActive, setIsButtonActive] = useState(false);
  const { addItem, toggleCart } = useCart();

  const isOutOfStock = product.stock_quantity !== null && product.stock_quantity <= 0;

  /**
   * Handle add to cart button click
   * Stops propagation to prevent card click navigation
   */
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem(product, 1);
    toggleCart(true); // Open cart modal

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  /**
   * Handle card click - navigates to product detail page
   */
  const handleCardClick = () => {
    navigateTo(`/shop/${product.id}`);
  };

  // Inline SVG placeholder as data URI - no external file needed
  const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23666'%3E%3Crect width='200' height='200' fill='%23222'/%3E%3Cpath d='M80 70h40v60H80z' fill='%23444'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23555'/%3E%3Cpath d='M80 130l20-25 10 15 10-10 20 20H80z' fill='%23555'/%3E%3C/svg%3E";

  // Get image URL with fallback - support both new format (array of objects) and legacy format
  const getImageUrl = () => {
    // New format: images is array of objects with url property
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      // Find primary image or use first
      const primaryImage = product.images.find(img => img.is_primary) || product.images[0];
      return primaryImage?.url || primaryImage;
    }
    // Legacy format: image_url string
    if (product.image_url) {
      return product.image_url;
    }
    // Fallback to inline SVG placeholder
    return PLACEHOLDER_IMAGE;
  };
  const imageUrl = getImageUrl();
  const imageCount = product.images?.length || (product.image_url ? 1 : 0);

  return (
    <div
      style={{
        ...cardStyles.container,
        ...(isHovered ? cardStyles.containerHover : {}),
      }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      {/* Product Image */}
      <div style={{ ...cardStyles.imageContainer, position: 'relative' }}>
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            ...cardStyles.image,
            ...(isHovered ? cardStyles.imageHover : {}),
          }}
          loading="lazy"
        />
        {/* Image count badge */}
        {imageCount > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#FFFFFF',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            {imageCount}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={cardStyles.content}>
        <h3 style={cardStyles.title}>{product.name}</h3>
        <p style={cardStyles.price}>{formatPrice(product.price)}</p>
        
        <button
          style={{
            ...cardStyles.button,
            ...(isOutOfStock ? cardStyles.outOfStock : {}),
            ...(isButtonHovered && !isOutOfStock ? cardStyles.buttonHover : {}),
            ...(isButtonActive && !isOutOfStock ? cardStyles.buttonActive : {}),
          }}
          onClick={handleAddToCart}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => { setIsButtonHovered(false); setIsButtonActive(false); }}
          onMouseDown={() => setIsButtonActive(true)}
          onMouseUp={() => setIsButtonActive(false)}
          disabled={isOutOfStock}
          aria-label={isOutOfStock ? 'Out of stock' : `Add ${product.name} to cart`}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

