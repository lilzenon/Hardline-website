/**
 * ProductPage - Individual product detail page
 * Design follows the ProductDetailPage component pattern with:
 * - Image gallery with navigation dots and "Find Similar" button
 * - Price with shipping info
 * - Buy Now and Add to Cart action buttons
 * - Product tags/badges
 * - Description with expandable text
 * - Brand section
 * - "You might also like" recommendations
 *
 * Route: /shop/:productId
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { usePerformantResize } from '../../hooks/usePerformantResize';
import { fetchProductById, fetchProducts } from '../../services/shopService';
import { useCart } from '../../contexts/CartContext';
import DesktopNavigationPills from '../DesktopNavigationPills';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb';
import BrandedLoader from '../BrandedLoader';
import CartModal from './CartModal';
import CartIcon from './CartIcon';
import { Heart, Share2, ShoppingCart, Camera, Tag, CheckCircle } from 'lucide-react';

// Lazy load mobile version
const ProductPageMobile = lazy(() => import('./ProductPageMobile'));

export default function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addItem, toggleCart } = useCart();

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

  // Fetch product data and related products
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(productId);
        setProduct(data);
        console.log('📦 Loaded product:', data.name);

        // Load related products (exclude current product)
        try {
          const allProducts = await fetchProducts();
          const related = allProducts
            .filter(p => p.id !== productId)
            .slice(0, 4);
          setRelatedProducts(related);
        } catch (relatedErr) {
          console.log('Could not load related products:', relatedErr);
        }
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
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
      });
      toggleCart();
    }
  };

  // Buy Now handler (add to cart and navigate to checkout)
  const handleBuyNow = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || null,
      });
      handleNavigation('/shop/checkout');
    }
  };

  // Share handler
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name || 'Check out this product',
          text: product?.description || '',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Format price helper
  const formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2)}`;
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

            {/* Heart and Share Icons Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '8px',
              marginTop: '16px',
            }}>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  size={22}
                  fill={isFavorited ? '#ef4444' : 'none'}
                  color={isFavorited ? '#ef4444' : 'rgba(255, 255, 255, 0.6)'}
                  style={{ transition: 'all 0.2s ease' }}
                />
              </button>
              <button
                onClick={handleShare}
                style={{
                  width: '44px',
                  height: '44px',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Share product"
              >
                <Share2 size={22} color="rgba(255, 255, 255, 0.6)" />
              </button>
            </div>

            {/* Product Content - 2 Column Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                padding: '24px 0 48px 0',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.2s forwards'
              }}
            >
              {/* Image Gallery Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Main Image */}
                <div
                  style={{
                    aspectRatio: '4/5',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'rgba(22, 22, 22, 0.30)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <img
                    src={images[currentImageIndex]}
                    alt={`${product.name} image ${currentImageIndex + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </div>

                {/* Image Dots and Find Similar Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  {/* Dots */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          border: 'none',
                          background: currentImageIndex === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
                          cursor: 'pointer',
                          transition: 'background 0.2s ease',
                        }}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Find Similar Button */}
                  <button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: 'rgba(22, 22, 22, 0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(22, 22, 22, 0.8)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(22, 22, 22, 0.6)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    }}
                  >
                    <Camera size={16} />
                    Find Similar
                  </button>
                </div>
              </div>

              {/* Product Details Column */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Product Name */}
                <h1 style={{
                  fontFamily: 'Inter',
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                }}>
                  {product.name}
                </h1>

                {/* Price with Shipping */}
                <div style={{ marginBottom: '24px' }}>
                  <span style={{
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#319DFF',
                    fontFamily: 'Inter',
                  }}>
                    {formatPrice(product.price)}
                  </span>
                  {product.shipping_cost > 0 && (
                    <span style={{
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginLeft: '12px',
                    }}>
                      + {formatPrice(product.shipping_cost)} Shipping
                    </span>
                  )}
                </div>

                {/* Action Buttons Row */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '24px',
                }}>
                  {/* Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    style={{
                      flex: 1,
                      padding: '14px 24px',
                      minHeight: '52px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '15px',
                      color: '#000000',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <ShoppingCart size={18} />
                    Buy Now
                  </button>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    style={{
                      flex: 1,
                      padding: '14px 24px',
                      minHeight: '52px',
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '15px',
                      color: 'rgba(255, 255, 255, 0.9)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>

                {/* Product Tags/Badges */}
                {product.tags && product.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '24px',
                  }}>
                    {product.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontFamily: 'Inter, sans-serif',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        <Tag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Description */}
                {product.description && (
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{
                      fontFamily: 'Inter',
                      fontSize: '15px',
                      lineHeight: 1.7,
                      color: 'rgba(255, 255, 255, 0.6)',
                      margin: 0,
                    }}>
                      {showFullDescription || product.description.length <= 200
                        ? product.description
                        : `${product.description.slice(0, 200)}...`}
                      {product.description.length > 200 && (
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#319DFF',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginLeft: '8px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '15px',
                          }}
                        >
                          {showFullDescription ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </p>
                  </div>
                )}

                {/* Brand Section (replacing Seller) */}
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{ fontSize: '20px', fontWeight: 700, color: '#FFF' }}>B</span>
                      </div>
                      <div>
                        <p style={{
                          fontFamily: 'Inter',
                          fontWeight: 600,
                          fontSize: '15px',
                          color: '#FFFFFF',
                          margin: 0,
                        }}>
                          BOUNCE2BOUNCE
                        </p>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          marginTop: '2px',
                        }}>
                          <CheckCircle size={14} color="#22c55e" />
                          <span style={{
                            fontSize: '13px',
                            color: 'rgba(255, 255, 255, 0.5)',
                          }}>
                            Verified Seller
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavigation('/shop')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#319DFF',
                        fontWeight: 500,
                        fontSize: '14px',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      All products →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* You Might Also Like Section */}
            {relatedProducts.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <h2 style={{
                  fontFamily: 'Inter',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '24px',
                }}>
                  You might also like
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '16px',
                }}>
                  {relatedProducts.map((relatedProduct) => (
                    <div
                      key={relatedProduct.id}
                      onClick={() => handleNavigation(`/shop/${relatedProduct.id}`)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'rgba(22, 22, 22, 0.30)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      }}
                    >
                      <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                        <img
                          src={relatedProduct.images?.[0] || '/images/placeholder-product.png'}
                          alt={relatedProduct.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
