/**
 * ShopPageMobile - Mobile version of the shop page
 * Uses MobileNavigation component for consistent mobile navigation
 */

import React, { useState, useEffect } from 'react';
import MobileNavigation from '../MobileNavigation';
import Footer from '../Footer';
import ProductGrid from './ProductGrid';
import CartModal from './CartModal';
import CartIcon from './CartIcon';
import { useCart } from '../../contexts/CartContext';

export default function ShopPageMobile({ products, loading, error, onRetry }) {
  const [scrollY, setScrollY] = useState(0);
  const { isOpen, toggleCart } = useCart();

  // Track scroll position for navigation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handler
  const handleNavigation = (path) => {
    if (window.navigateWithTransition) {
      window.navigateWithTransition(path);
    } else {
      window.location.href = path;
    }
  };

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
        onNavigate={handleNavigation}
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
          paddingTop: '80px', // Account for fixed nav
          paddingBottom: '32px',
          paddingLeft: '16px',
          paddingRight: '16px',
          maxWidth: '430px',
          margin: '0 auto',
        }}
      >
        {/* Page Title */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 800,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
            textAlign: 'center',
          }}
        >
          Shop
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          Official BOUNCE2BOUNCE merchandise
        </p>

        {/* Products Grid or Error */}
        {error ? (
          <div
            style={{
              textAlign: 'center',
              padding: '32px 16px',
              background: 'rgba(22, 22, 22, 0.30)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 100, 100, 0.3)',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚠️</div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>
              Unable to load products
            </h3>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px' }}>
              {error}
            </p>
            <button
              onClick={onRetry}
              style={{
                padding: '12px 24px',
                minHeight: '44px',
                background: 'linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)',
                border: 'none',
                borderRadius: '8px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          <ProductGrid products={products} loading={loading} />
        )}
      </main>

      {/* Footer */}
      <Footer compact={true} />

      {/* Cart Modal */}
      <CartModal />
    </div>
  );
}

