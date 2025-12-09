/**
 * ProductCard - Individual product card with glassmorphism styling
 * Features 1:1 aspect ratio image, title, price, and Add to Cart button
 * 
 * @example
 * <ProductCard product={product} onAddToCart={handleAdd} />
 */

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

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

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    
    addItem(product, 1);
    toggleCart(true); // Open cart drawer
    
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Get image URL with fallback
  const imageUrl = product.image_url || product.images?.[0] || '/images/placeholder-product.png';

  return (
    <div
      style={{
        ...cardStyles.container,
        ...(isHovered ? cardStyles.containerHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`${product.name} - ${formatPrice(product.price)}`}
    >
      {/* Product Image */}
      <div style={cardStyles.imageContainer}>
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            ...cardStyles.image,
            ...(isHovered ? cardStyles.imageHover : {}),
          }}
          loading="lazy"
        />
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

