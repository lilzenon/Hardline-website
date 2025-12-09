/**
 * ShopPage - Main shop page with header and product grid
 * Customer-facing shop at bounce2bounce.com/shop
 * 
 * @example
 * <ShopPage />
 */

import React, { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import CartDrawer from './CartDrawer';
import CartIcon from './CartIcon';
import { fetchProducts } from '../../services/shopService';
import { useCart } from '../../contexts/CartContext';

// Page styles with glassmorphism
const pageStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(56, 56, 56, 0.3)',
    padding: '16px 24px',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: '#FFFFFF',
  },
  logoText: {
    fontWeight: 800,
    fontSize: '20px',
    letterSpacing: '-0.02em',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: 800,
    marginBottom: '8px',
    letterSpacing: '-0.02em',
  },
  pageSubtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '32px',
  },
  errorContainer: {
    textAlign: 'center',
    padding: '48px 24px',
    background: 'rgba(22, 22, 22, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 100, 100, 0.3)',
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  errorTitle: {
    fontSize: '20px',
    fontWeight: 600,
    marginBottom: '8px',
  },
  errorText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '16px',
  },
  retryButton: {
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
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    fontSize: '14px',
    marginBottom: '24px',
    transition: 'color 200ms ease',
  },
};

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isOpen } = useCart();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProducts();
      setProducts(data);
      console.log('🛍️ Loaded', data.length, 'products');
    } catch (err) {
      console.error('❌ Failed to load products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={pageStyles.container}>
      {/* Header */}
      <header style={pageStyles.header}>
        <div style={pageStyles.headerContent}>
          <a href="/" style={pageStyles.logo}>
            <span style={pageStyles.logoText}>BOUNCE2BOUNCE</span>
          </a>
          <CartIcon />
        </div>
      </header>

      {/* Main Content */}
      <main style={pageStyles.main}>
        <a href="/" style={pageStyles.backLink}>
          ← Back to Home
        </a>
        
        <h1 style={pageStyles.pageTitle}>Shop</h1>
        <p style={pageStyles.pageSubtitle}>Official BOUNCE2BOUNCE merchandise</p>

        {error ? (
          <div style={pageStyles.errorContainer}>
            <div style={pageStyles.errorIcon}>⚠️</div>
            <h3 style={pageStyles.errorTitle}>Unable to load products</h3>
            <p style={pageStyles.errorText}>{error}</p>
            <button style={pageStyles.retryButton} onClick={loadProducts}>
              Try Again
            </button>
          </div>
        ) : (
          <ProductGrid products={products} loading={loading} />
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

