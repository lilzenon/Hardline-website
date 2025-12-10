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
import { Heart, Share2, ShoppingCart, Camera, Tag } from 'lucide-react';

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
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem, toggleCart } = useCart();

  // Available sizes (will be dynamic when variants are added to DB)
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const outOfStockSizes = ['XXL']; // Example: XXL is out of stock

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

  // Helper to get primary image URL from product
  const getPrimaryImageUrl = () => {
    if (product?.images && Array.isArray(product.images) && product.images.length > 0) {
      // New format: array of objects with url property
      if (typeof product.images[0] === 'object' && product.images[0].url) {
        const primary = product.images.find(img => img.is_primary) || product.images[0];
        return primary.url;
      }
      // Legacy format: array of strings
      return product.images[0];
    }
    // Fallback to image_url
    return product?.image_url || product?.imageUrl || null;
  };

  // Add to cart handler
  const handleAddToCart = (qty = 1) => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: getPrimaryImageUrl(),
      }, qty);
      toggleCart();
    }
  };

  // Buy Now handler (add to cart and navigate to checkout)
  const handleBuyNow = (qty = 1) => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: getPrimaryImageUrl(),
      }, qty);
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

  // Inline SVG placeholder as data URI - no external file needed
  const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23666'%3E%3Crect width='200' height='200' fill='%23222'/%3E%3Cpath d='M80 70h40v60H80z' fill='%23444'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23555'/%3E%3Cpath d='M80 130l20-25 10 15 10-10 20 20H80z' fill='%23555'/%3E%3C/svg%3E";

  // Get product images (use placeholder if none)
  // Support both new format (array of objects with url) and legacy format (array of strings)
  const getImageUrls = () => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      // Check if it's new format (objects with url property)
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

        /* Smooth desktop/mobile layout transitions */
        .shop-layout-container {
          transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .shop-layout-container {
            transition: none !important;
          }
        }
      `}</style>

      <div className="homepage-content shop-layout-container" style={{
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
                gap: '40px',
                padding: '16px 0 40px 0',
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
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '32px',
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

                {/* Description - Moved under price */}
                {product.description && (
                  <div style={{ marginBottom: '20px' }}>
                    <p style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      lineHeight: 1.7,
                      color: 'rgba(255, 255, 255, 0.7)',
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
                            fontSize: '14px',
                          }}
                        >
                          {showFullDescription ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </p>
                  </div>
                )}

                {/* Size Selector - Nike/SSENSE style chips */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}>
                    <span style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}>
                      Size
                    </span>
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '13px',
                        fontFamily: 'Inter',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        padding: 0,
                      }}
                    >
                      Size Guide
                    </button>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    {availableSizes.map((size) => {
                      const isOutOfStock = outOfStockSizes.includes(size);
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => !isOutOfStock && setSelectedSize(size)}
                          disabled={isOutOfStock}
                          style={{
                            minWidth: '48px',
                            height: '44px',
                            padding: '0 16px',
                            background: isSelected
                              ? 'rgba(255, 255, 255, 0.95)'
                              : 'rgba(22, 22, 22, 0.6)',
                            border: isSelected
                              ? '2px solid #FFFFFF'
                              : '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '8px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: isOutOfStock
                              ? 'rgba(255, 255, 255, 0.25)'
                              : isSelected
                                ? '#000000'
                                : '#FFFFFF',
                            cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            opacity: isOutOfStock ? 0.5 : 1,
                            textDecoration: isOutOfStock ? 'line-through' : 'none',
                          }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity Selector - Glassmorphism style */}
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.9)',
                    display: 'block',
                    marginBottom: '10px',
                  }}>
                    Quantity
                  </span>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0',
                    background: 'rgba(22, 22, 22, 0.8)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(56, 56, 56, 0.3)',
                    borderRadius: '12px',
                    padding: '4px',
                  }}>
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      style={{
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: quantity <= 1 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.9)',
                        fontSize: '20px',
                        fontWeight: 500,
                        cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (quantity > 1) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        const maxStock = product.stock_quantity || 99;
                        setQuantity(Math.max(1, Math.min(val, maxStock)));
                      }}
                      min="1"
                      max={product.stock_quantity || 99}
                      style={{
                        width: '48px',
                        height: '44px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'center',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#FFFFFF',
                        outline: 'none',
                        MozAppearance: 'textfield',
                      }}
                      aria-label="Quantity"
                    />
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock_quantity || 99, q + 1))}
                      disabled={quantity >= (product.stock_quantity || 99)}
                      style={{
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: quantity >= (product.stock_quantity || 99) ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.9)',
                        fontSize: '20px',
                        fontWeight: 500,
                        cursor: quantity >= (product.stock_quantity || 99) ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (quantity < (product.stock_quantity || 99)) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  {product.stock_quantity && product.stock_quantity <= 10 && (
                    <span style={{
                      display: 'block',
                      marginTop: '8px',
                      fontSize: '12px',
                      color: '#ef4444',
                      fontFamily: 'Inter, sans-serif',
                    }}>
                      Only {product.stock_quantity} left in stock
                    </span>
                  )}
                </div>

                {/* Action Buttons Row */}
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '16px',
                }}>
                  {/* Buy Now Button */}
                  <button
                    onClick={() => handleBuyNow(quantity)}
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
                    onClick={() => handleAddToCart(quantity)}
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

                {/* Product Tags/Category Badges */}
                {(product.tags?.length > 0 || product.category) && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '16px',
                  }}>
                    {/* Show tags if available, otherwise show category */}
                    {product.tags?.length > 0 ? (
                      product.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 12px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontFamily: 'Inter, sans-serif',
                            color: 'rgba(255, 255, 255, 0.8)',
                          }}
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))
                    ) : product.category && (
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontFamily: 'Inter, sans-serif',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        <Tag size={12} />
                        {product.category}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* You Might Also Like Section */}
            {relatedProducts.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                  fontFamily: 'Inter',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px',
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
                          src={relatedProduct.images?.[0] || PLACEHOLDER_IMAGE}
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
