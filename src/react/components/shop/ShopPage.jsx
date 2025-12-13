/**
 * ShopPage - Main shop page with header and product grid
 * Customer-facing shop at bounce2bounce.com/shop
 * Uses same header/footer/navigation as other pages (HomePage, AboutPage)
 *
 * @example
 * <ShopPage />
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { usePerformantResize } from '../../hooks/usePerformantResize';
import ProductGrid from './ProductGrid';
import CartModal from './CartModal';
import CartIcon from './CartIcon';
import { fetchProducts } from '../../services/shopService';
import { useCart } from '../../contexts/CartContext';
import { useSEO } from '../../hooks/useSEO';
import DesktopNavigationPills from '../DesktopNavigationPills';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb';
import BrandedLoader from '../BrandedLoader';

// Lazy load mobile version
const ShopPageMobile = lazy(() => import('./ShopPageMobile'));

export default function ShopPage({ openCart = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { isOpen, toggleCart } = useCart();
  const { updateTitle, updateDescription, updateOGImage } = useSEO();

  // Use performant resize hook for responsive detection
  const { isMobile: isMobileByWidth } = usePerformantResize();

  // Set SEO tags
  useEffect(() => {
    updateTitle('Shop | BOUNCE2BOUNCE');
    updateDescription('Official BOUNCE2BOUNCE merchandise. Shop exclusive clothing, accessories, and more.');
    // Optional: Set a default shop OG image if available
    // updateOGImage('/images/shop-og.jpg');
  }, []);

  // Open cart on mount if openCart prop is true (for /shop/checkout and /shop/cart routes)
  useEffect(() => {
    if (openCart && !isOpen) {
      toggleCart();
    }
  }, [openCart]); // Only run on mount, not when isOpen changes

  // Device detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice || isMobileByWidth);
      setIsPageLoading(false);
    };
    checkMobile();
  }, [isMobileByWidth]);

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

  // Navigation handler
  const handleNavigation = (path) => {
    if (window.navigateWithTransition) {
      window.navigateWithTransition(path);
    } else if (window.history && window.history.pushState) {
      // Fallback for when navigateWithTransition is not available
      window.history.pushState({}, '', path);
      // Dispatch popstate event so App component detects the change
      const navEvent = new PopStateEvent('popstate');
      window.dispatchEvent(navEvent);
    } else {
      window.location.href = path;
    }
  };

  // Loading state
  if (isPageLoading) {
    return (
      <BrandedLoader
        fullScreen={true}
        minDisplayTime={300}
        showMessage={false}
      />
    );
  }

  // Mobile version
  if (isMobile) {
    return (
      <Suspense fallback={
        <BrandedLoader
          fullScreen={true}
          minDisplayTime={300}
          showMessage={false}
        />
      }>
        <ShopPageMobile
          products={products}
          loading={loading}
          error={error}
          onRetry={loadProducts}
        />
      </Suspense>
    );
  }

  // Desktop version - matches AboutPage structure
  return (
    <>
      {/* Modern CSS Animations + Smooth Viewport Transitions */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          /* Smooth desktop/mobile layout transitions */
          .shop-layout-container {
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>

      <div className="homepage-content shop-layout-container" style={{
        minHeight: '100vh',
        background: '#000000',
        width: '100%',
      }}>
        <div
          className="desktop-container"
          style={{
            width: '100%',
            maxWidth: '1400px', // Increased for ultrawide displays with 4-column grid
            margin: '0 auto',
            position: 'relative',
            background: '#000000',
            minHeight: 'auto',
            padding: '0 40px', // Increased horizontal padding for better breathing room
            boxSizing: 'border-box'
          }}
        >
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Navigation Header - Matches AboutPage */}
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                width: '100%',
                height: '48px',
                alignItems: 'center',
                margin: '35px 0 0 0'
              }}
            >
              {/* B2B Logo */}
              <img
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                src="/images/figma-exact/b2b-logo-nav.svg"
                alt="B2B Logo"
                loading="lazy"
                decoding="async"
                onClick={() => handleNavigation('/')}
                style={{
                  width: '180px',
                  height: '56px',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.filter = 'brightness(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              />

              {/* Desktop Navigation Pills */}
              <DesktopNavigationPills
                currentPage="Shop"
                onNavigate={handleNavigation}
              />

              {/* Cart Icon */}
              <div style={{ justifySelf: 'end' }}>
                <CartIcon />
              </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb
              items={[
                { name: 'Home', url: '/' },
                { name: 'Shop' }
              ]}
            />

            {/* Page Title */}
            <div
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '24px',
                fontWeight: '600',
                textAlign: 'left',
                marginTop: '24px',
                marginBottom: '16px',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
                paddingLeft: '0px'
              }}
            >
              Shop
            </div>

            {/* Products Grid or Error */}
            <div
              style={{
                width: '100%',
                margin: '0 auto',
                paddingBottom: '40px',
                boxSizing: 'border-box',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.4s forwards'
              }}
            >
              {error ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '48px 24px',
                    background: 'rgba(22, 22, 22, 0.30)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 100, 100, 0.3)',
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#FFF' }}>
                    Unable to load products
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px' }}>
                    {error}
                  </p>
                  <button
                    onClick={loadProducts}
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
            </div>

            {/* Footer */}
            <Footer compact={false} />
          </div>
        </div>
      </div>

      {/* Cart Modal */}
      <CartModal />
    </>
  );
}

