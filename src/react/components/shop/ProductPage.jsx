/**
 * ProductPage - Individual product detail page
 * Fetches product data and renders ProductDetailPage component
 * Route: /shop/:productId
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { usePerformantResize } from '../../hooks/usePerformantResize';
import { fetchProductById } from '../../services/shopService';
import { useCart } from '../../contexts/CartContext';
import DesktopNavigationPills from '../DesktopNavigationPills';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb';
import BrandedLoader from '../BrandedLoader';
import CartModal from './CartModal';
import CartIcon from './CartIcon';
import MobileNavigation from '../MobileNavigation';
import { Tag, Ruler, Users, Info } from 'lucide-react';

// Lazy load mobile version
const ProductPageMobile = lazy(() => import('./ProductPageMobile'));

export default function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, toggleCart } = useCart();

  // Use performant resize hook for responsive detection
  const { isMobile: isMobileByWidth } = usePerformantResize();

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

  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(productId);
        setProduct(data);
        console.log('📦 Loaded product:', data.name);
      } catch (err) {
        console.error('❌ Failed to load product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  // Navigation handler
  const handleNavigation = (path) => {
    if (window.navigateWithTransition) {
      window.navigateWithTransition(path);
    } else {
      window.location.href = path;
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
        quantity: 1,
      });
      toggleCart();
    }
  };

  // Loading state
  if (isPageLoading || loading) {
    return (
      <BrandedLoader
        fullScreen={true}
        minDisplayTime={300}
        showMessage={false}
      />
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: 'rgba(22, 22, 22, 0.30)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          border: '1px solid rgba(255, 100, 100, 0.3)',
          maxWidth: '400px',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px', color: '#FFF' }}>
            Product not found
          </h3>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px' }}>
            {error || 'The product you\'re looking for doesn\'t exist.'}
          </p>
          <button
            onClick={() => handleNavigation('/shop')}
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
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Get product images (use placeholder if none)
  const images = product.images?.length > 0 
    ? product.images 
    : ['/images/placeholder-product.png'];

  // Mobile version
  if (isMobile) {
    return (
      <Suspense fallback={<BrandedLoader fullScreen={true} minDisplayTime={300} showMessage={false} />}>
        <ProductPageMobile
          product={product}
          images={images}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
          onAddToCart={handleAddToCart}
          onNavigate={handleNavigation}
        />
      </Suspense>
    );
  }

  // Desktop version
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="homepage-content" style={{
        minHeight: '100vh',
        background: '#000000',
        width: '100%',
      }}>
        <div
          className="desktop-container"
          style={{
            width: '100%',
            maxWidth: '1200px', // Optimal for 2-column product detail layout
            margin: '0 auto',
            position: 'relative',
            background: '#000000',
            minHeight: 'auto',
            padding: '0 40px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Navigation Header */}
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
                }}
              />
              <DesktopNavigationPills currentPage="Shop" onNavigate={handleNavigation} />
              <div style={{ justifySelf: 'end' }}>
                <CartIcon />
              </div>
            </div>

            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { name: 'Home', url: '/' },
                { name: 'Shop', url: '/shop' },
                { name: product.name }
              ]}
            />

            {/* Product Content */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                padding: '32px 0',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.2s forwards'
              }}
            >
              {/* Image Gallery */}
              <div>
                <div
                  style={{
                    aspectRatio: '4/5',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: 'rgba(22, 22, 22, 0.30)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
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
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
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
                          transition: 'background 0.2s ease',
                        }}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div>
                <h1 style={{
                  fontFamily: 'Inter',
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                }}>
                  {product.name}
                </h1>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#319DFF',
                  marginBottom: '24px',
                }}>
                  ${(product.price / 100).toFixed(2)}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  style={{
                    width: '100%',
                    padding: '16px 32px',
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
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(49, 157, 255, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  🛒 Add to Cart
                </button>

                {/* Description */}
                {product.description && (
                  <div style={{ marginTop: '32px' }}>
                    <h3 style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.6)',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      Description
                    </h3>
                    <p style={{
                      fontFamily: 'Inter',
                      fontSize: '16px',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}>
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Back to Shop */}
                <button
                  onClick={() => handleNavigation('/shop')}
                  style={{
                    marginTop: '24px',
                    padding: '12px 24px',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                  }}
                >
                  ← Back to Shop
                </button>
              </div>
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
