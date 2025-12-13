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

import React, { useState, useEffect, Suspense, lazy, useRef } from 'react';
import { usePerformantResize } from '../../hooks/usePerformantResize';
import { fetchProductById, fetchProducts } from '../../services/shopService';
import { useCart } from '../../contexts/CartContext';
import { useSEO } from '../../hooks/useSEO';
import DesktopNavigationPills from '../DesktopNavigationPills';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb';
import BrandedLoader from '../BrandedLoader';
import CartModal from './CartModal';
import CartIcon from './CartIcon';
import { Heart, Share2, ShoppingCart, Camera, Tag, ChevronRight, Loader2 } from 'lucide-react';

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
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const scrollRef = useRef(null);
  const { addItem, toggleCart } = useCart();
  const { updateTitle, updateDescription, updateOGImage } = useSEO();

  // Get size variants from product data (if available)
  const hasVariants = product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0;
  const availableSizes = hasVariants
    ? product.sizes.map(v => v.size)
    : [];
  const outOfStockSizes = hasVariants
    ? product.sizes.filter(v => v.stock === 0 || v.stock <= 0).map(v => v.size)
    : [];

  // Get stock for selected size (for quantity limit)
  const getSelectedSizeStock = () => {
    if (!hasVariants || !selectedSize) return product?.stock_quantity || 999;
    const variant = product.sizes.find(v => v.size === selectedSize);
    return variant?.stock || 0;
  };

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

  // Helper to get primary image URL from product
  const getPrimaryImageUrl = (prod) => {
    if (prod?.images && Array.isArray(prod.images) && prod.images.length > 0) {
      // New format: array of objects with url property
      if (typeof prod.images[0] === 'object' && prod.images[0].url) {
        const primary = prod.images.find(img => img.is_primary) || prod.images[0];
        return primary.url;
      }
      // Legacy format: array of strings
      return prod.images[0];
    }
    // Fallback to image_url
    return prod?.image_url || prod?.imageUrl || null;
  };

  // Fetch product data and related products
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(productId);
        setProduct(data);
        console.log('📦 Loaded product:', data.name);

        // Update SEO tags
        if (data) {
          updateTitle(`${data.name} | Shop`);
          updateDescription(data.description || `Buy ${data.name} at BOUNCE2BOUNCE.`);
          const ogImage = getPrimaryImageUrl(data);
          if (ogImage) {
            updateOGImage(ogImage);
          }
        }

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





  // Scroll to image handler
  const scrollToImage = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth'
      });
      setCurrentImageIndex(index);
    }
  };

  // Add to cart handler with animation
  const handleAddToCart = async () => {
    if (isAdded) {
      toggleCart();
      return;
    }

    if (hasVariants && !selectedSize) {
      alert('Please select a size');
      return;
    }

    setIsAdding(true);

    // Simulate network delay for animation
    await new Promise(resolve => setTimeout(resolve, 800));

    if (product) {
      const itemData = {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: images[0] || product.image_url || null,
      };

      // Add size to item if variants exist and a size is selected
      if (hasVariants && selectedSize) {
        itemData.size = selectedSize;
      }

      addItem(itemData, quantity);
      setIsAdding(false);
      setIsAdded(true);
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
            {/* Navigation Header - Logo and Pills only */}
            <div
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
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
            </div>

            {/* Breadcrumb + Cart + Share Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '24px', // Increased for better spacing from nav header
              marginBottom: '8px',
            }}>
              {/* Breadcrumb */}
              <Breadcrumb
                items={[
                  { name: 'Home', url: '/' },
                  { name: 'Shop', url: '/shop' },
                  { name: product.name }
                ]}
              />

              {/* Cart and Share Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={handleShare}
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  aria-label="Share product"
                >
                  <Share2 size={20} color="rgba(255, 255, 255, 0.6)" />
                </button>
                <CartIcon />
              </div>
            </div>

            {/* Product Content - 2 Column Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '40px',
                padding: '0 0 40px 0',
                opacity: 0,
                animation: 'fadeInUp 0.8s ease-out 0.2s forwards'
              }}
            >
              {/* Image Gallery Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Main Image - Swipeable */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/5',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: 'rgba(22, 22, 22, 0.30)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div
                    ref={scrollRef}
                    style={{
                      display: 'flex',
                      width: '100%',
                      height: '100%',
                      overflowX: 'auto',
                      scrollSnapType: 'x mandatory',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                    className="no-scrollbar"
                    onScroll={(e) => {
                      const scrollLeft = e.target.scrollLeft;
                      const width = e.target.offsetWidth;
                      const newIndex = Math.round(scrollLeft / width);
                      if (newIndex !== currentImageIndex) {
                        setCurrentImageIndex(newIndex);
                      }
                    }}
                  >
                    <style>{`
                      .no-scrollbar::-webkit-scrollbar { display: none; }
                      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                    `}</style>
                    {images.map((img, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: '0 0 100%',
                          minWidth: '100%',
                          width: '100%',
                          height: '100%',
                          scrollSnapAlign: 'start',
                          scrollSnapStop: 'always',
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <img
                          src={img}
                          alt={`${product.name} image ${idx + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          draggable="false"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Indicators and Find Similar Row */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  {/* Subtle Bar Indicators - Clickable */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToImage(idx)}
                        style={{
                          width: '24px',
                          height: '4px',
                          padding: 0,
                          border: 'none',
                          borderRadius: '2px',
                          background: currentImageIndex === idx ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
                          transition: 'background 0.2s ease',
                          cursor: 'pointer',
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
                {/* Product Title and Price Row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '24px',
                  marginBottom: '24px',
                }}>
                  <h1 style={{
                    fontFamily: 'Inter',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    margin: 0,
                    lineHeight: 1.2,
                    flex: 1,
                  }}>
                    {product.name}
                  </h1>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span style={{
                      fontSize: '32px',
                      fontWeight: 700,
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontFamily: 'Inter',
                      whiteSpace: 'nowrap',
                    }}>
                      {formatPrice(product.price)}
                    </span>
                    {product.shipping_cost > 0 && (
                      <span style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        marginTop: '4px',
                        fontWeight: 400,
                      }}>
                        + {formatPrice(product.shipping_cost)} Shipping
                      </span>
                    )}
                  </div>
                </div>

                {/* Description Section */}
                {product.description && (
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '8px',
                    }}>
                      Description
                    </h3>
                    <div style={{ position: 'relative' }}>
                      <p style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        lineHeight: 1.7,
                        color: 'rgba(255, 255, 255, 0.8)',
                        margin: 0,
                        // If not showing full description, clamp text
                        ...(!showFullDescription && product.description.length > 200 ? {
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        } : {})
                      }}>
                        {product.description}
                      </p>
                      {product.description.length > 200 && (
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#FFFFFF',
                            fontWeight: 500,
                            cursor: 'pointer',
                            marginTop: '8px',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: 0,
                            opacity: 0.8,
                          }}
                        >
                          {showFullDescription ? 'Show less' : 'Read more'}
                          <ChevronRight
                            size={16}
                            style={{
                              transform: showFullDescription ? 'rotate(-90deg)' : 'rotate(90deg)',
                              transition: 'transform 0.2s ease',
                            }}
                          />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Size Selector - Only show if product has size variants */}
                {hasVariants && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                    }}>
                      <span style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.9)',
                      }}>
                        Select Size
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
                              height: '40px',
                              padding: '0 16px',
                              background: isSelected
                                ? '#FFFFFF'
                                : 'transparent',
                              border: isSelected
                                ? '1px solid #FFFFFF'
                                : '1px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '20px', // Pill shape
                              fontFamily: 'Inter, sans-serif',
                              fontWeight: 500,
                              fontSize: '13px',
                              color: isOutOfStock
                                ? 'rgba(255, 255, 255, 0.2)'
                                : isSelected
                                  ? '#000000'
                                  : '#FFFFFF',
                              cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s ease',
                              textDecoration: isOutOfStock ? 'line-through' : 'none',
                            }}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity + Add to Cart Row */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'stretch',
                  marginBottom: '32px',
                }}>
                  {/* Quantity Selector */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    height: '56px',
                  }}>
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      style={{
                        width: '48px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: quantity <= 1 ? 'rgba(255, 255, 255, 0.2)' : '#FFFFFF',
                        fontSize: '20px',
                        cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      width: '40px',
                      textAlign: 'center',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      color: '#FFFFFF',
                    }}>
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stock_quantity || 99, q + 1))}
                      disabled={quantity >= (product.stock_quantity || 99)}
                      style={{
                        width: '48px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: quantity >= (product.stock_quantity || 99) ? 'rgba(255, 255, 255, 0.2)' : '#FFFFFF',
                        fontSize: '20px',
                        cursor: quantity >= (product.stock_quantity || 99) ? 'not-allowed' : 'pointer',
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button - Full Width Remainder */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding || (hasVariants && !selectedSize)}
                    style={{
                      flex: 1,
                      height: '56px',
                      background: isAdded
                        ? '#22c55e'
                        : (hasVariants && !selectedSize)
                          ? 'rgba(255, 255, 255, 0.2)'
                          : '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      color: isAdded
                        ? '#FFFFFF'
                        : (hasVariants && !selectedSize)
                          ? 'rgba(255, 255, 255, 0.5)'
                          : '#000000',
                      cursor: (isAdding || (hasVariants && !selectedSize)) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => !isAdding && !(hasVariants && !selectedSize) && (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={(e) => !isAdding && !(hasVariants && !selectedSize) && (e.currentTarget.style.transform = 'translateY(0)')}
                    onMouseDown={(e) => !isAdding && !(hasVariants && !selectedSize) && (e.currentTarget.style.transform = 'scale(0.98)')}
                    onMouseUp={(e) => !isAdding && !(hasVariants && !selectedSize) && (e.currentTarget.style.transform = 'translateY(-2px)')}
                  >
                    {isAdding ? (
                      <Loader2 size={24} className="animate-spin" />
                    ) : isAdded ? (
                      <>
                        <ShoppingCart size={20} />
                        View Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} />
                        Add to Cart
                      </>
                    )}
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
      </div >

      {/* Cart Modal */}
      < CartModal />
    </>
  );
}
