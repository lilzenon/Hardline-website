/**
 * ProductPageMobile - Mobile version of product detail page
 * Uses MobileNavigation component for consistent mobile navigation
 */

import React, { useState, useEffect } from 'react';
import MobileNavigation from '../MobileNavigation';
import Footer from '../Footer';
import CartModal from './CartModal';
import CartIcon from './CartIcon';
import { useCart } from '../../contexts/CartContext';

export default function ProductPageMobile({ 
  product, 
  images, 
  currentImageIndex, 
  setCurrentImageIndex,
  onAddToCart,
  onNavigate 
}) {
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for navigation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontFamily: 'Inter, sans-serif',
        position: 'relative',
      }}
    >
      {/* Mobile Navigation */}
      <MobileNavigation
        currentPage="shop"
        scrollY={scrollY}
        onNavigate={onNavigate}
      />

      {/* Cart Icon - Fixed position */}
      <div
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 90,
        }}
      >
        <CartIcon />
      </div>

      {/* Main Content */}
      <main
        style={{
          paddingTop: '80px',
          paddingBottom: '32px',
          paddingLeft: '16px',
          paddingRight: '16px',
          maxWidth: '430px',
          margin: '0 auto',
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => onNavigate('/shop')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            marginBottom: '16px',
            padding: 0,
          }}
        >
          ← Back to Shop
        </button>

        {/* Product Image */}
        <div
          style={{
            aspectRatio: '1/1',
            borderRadius: '16px',
            overflow: 'hidden',
            background: 'rgba(22, 22, 22, 0.30)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '16px',
          }}
        >
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Image dots */}
        {images.length > 1 && (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px' }}>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: 'none',
                  background: currentImageIndex === idx ? '#319DFF' : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                }}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Product Name */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}
        >
          {product.name}
        </h1>

        {/* Price */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#319DFF',
            marginBottom: '24px',
          }}
        >
          ${(product.price / 100).toFixed(2)}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          style={{
            width: '100%',
            padding: '16px',
            minHeight: '56px',
            background: 'linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)',
            border: 'none',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            color: '#FFFFFF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          🛒 Add to Cart
        </button>

        {/* Description */}
        {product.description && (
          <div style={{ marginTop: '32px' }}>
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Description
            </h3>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {product.description}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer compact={true} />

      {/* Cart Modal */}
      <CartModal />
    </div>
  );
}

