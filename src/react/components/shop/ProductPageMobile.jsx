/**
 * ProductPageMobile - Mobile version of product detail page
 * Design follows the ProductDetailPage component pattern with:
 * - Breadcrumb navigation
 * - Heart and Share icons
 * - Image gallery with dots and "Find Similar" button
 * - Price with shipping info
 * - Buy Now and Add to Cart buttons
 * - Product tags/badges
 * - Description with "Read more"
 * - Brand section
 */

import React, { useState, useEffect, useRef } from 'react';
import MobileNavigation from '../MobileNavigation';
import Footer from '../Footer';
import CartModal from './CartModal';
import CartIcon from './CartIcon';
import { useCart } from '../../contexts/CartContext';
import { Heart, Share2, ShoppingCart, Tag, ChevronRight, Loader2 } from 'lucide-react';

const SIZE_ORDER = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', '4XL'];

const sortSizes = (sizes) => {
  return [...sizes].sort((a, b) => {
    const indexA = SIZE_ORDER.indexOf(a.toUpperCase());
    const indexB = SIZE_ORDER.indexOf(b.toUpperCase());

    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1) return -1; // Known size comes first
    if (indexB !== -1) return 1;

    // Fallback for unknown sizes (e.g. numeric)
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });
};

export default function ProductPageMobile({
  product,
  images,
  currentImageIndex,
  setCurrentImageIndex,
  onAddToCart,
  onNavigate
}) {
  const [scrollY, setScrollY] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const scrollRef = useRef(null);
  const { addItem, toggleCart } = useCart();

  // Get size variants from product data (if available)
  const hasVariants = product?.sizes && Array.isArray(product.sizes) && product.sizes.length > 0;
  const availableSizes = hasVariants
    ? sortSizes(product.sizes.map(v => v.size))
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

  // Track scroll position for navigation effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format price helper
  const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`;

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
        image_url: getPrimaryImageUrl(),
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
          title: product ? `${product.name} | BOUNCE2BOUNCE MERCH` : 'BOUNCE2BOUNCE MERCH',
          text: product ? `${product.name} | BOUNCE2BOUNCE MERCH` : 'Check out this product from BOUNCE2BOUNCE',
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

  return (
    <>
      {/* Smooth viewport transition styles */}
      <style>
        {`
          .shop-layout-container {
            transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @media (prefers-reduced-motion: reduce) {
            .shop-layout-container {
              transition: none !important;
            }
          }
        `}
      </style>
      <div
        className="shop-layout-container"
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

        {/* Cart Icon - Fixed position on LEFT side of header, matching hamburger menu alignment */}
        <div
          style={{
            position: 'fixed',
            top: 'calc(env(safe-area-inset-top, 0px) + 26px)',
            left: '50%', // Centered horizontally
            transform: 'translateX(-50%)', // Centered horizontally
            width: 'min(398px, calc(100vw - 32px))', // Match content width (16px padding each side)
            zIndex: 1001,
            display: 'flex',
            justifyContent: 'flex-start', // Align icon to the far left of the content area
            pointerEvents: 'none', // Allow clicks to pass through the empty container space
          }}
        >
          <div style={{
            pointerEvents: 'auto',
            width: '40px',
            height: '40px',
            background: '#000000',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}>
            <CartIcon />
          </div>
        </div>

        {/* Main Content */}
        <main
          style={{
            paddingTop: '104px',
            paddingBottom: '32px',
            paddingLeft: '16px',
            paddingRight: '16px',
            maxWidth: '430px',
            margin: '0 auto',
          }}
        >
          {/* Main Content with Load-in Animation */}
          <div
            style={{
              opacity: 0,
              animation: 'fadeInUp 0.6s ease-out forwards',
            }}
          >
            <style>{`
              @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Top Row: Breadcrumb + Share */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}>
              {/* Breadcrumb Navigation */}
              <nav
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  flexWrap: 'wrap',
                }}
                aria-label="Breadcrumb"
              >
                <button
                  onClick={() => onNavigate('/shop')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Shop
                </button>
                <ChevronRight size={14} style={{ margin: '0 4px' }} />
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}
                </span>
              </nav>

              {/* Share Icon */}
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
            </div>

            {/* Product Image Gallery - Swipeable */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'rgba(22, 22, 22, 0.30)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '12px',
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

            {/* Image Indicators and Tags Row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px',
            }}>
              {/* Subtle Bar Indicators - Clickable */}
              <div style={{ display: 'flex', gap: '4px' }}>
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToImage(idx)}
                    style={{
                      width: '24px',
                      height: '4px', // Slightly taller for better touch target
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

              {/* Product Tags/Category */}
              {(product.tags?.length > 0 || product.category) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'flex-end' }}>
                  {product.tags?.length > 0 ? (
                    product.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontFamily: 'Inter, sans-serif',
                          color: 'rgba(255, 255, 255, 0.6)',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {tag}
                      </span>
                    ))
                  ) : product.category && (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        color: 'rgba(255, 255, 255, 0.6)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {product.category}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Product Title and Price Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px',
              marginBottom: '16px',
            }}>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  fontFamily: 'Inter, sans-serif',
                  color: '#FFFFFF',
                  margin: 0,
                  flex: 1,
                }}
              >
                {product.name}
              </h1>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontFamily: 'Inter, sans-serif',
                  whiteSpace: 'nowrap',
                }}>
                  {formatPrice(product.price)}
                </span>
                {product.shipping_cost > 0 && (
                  <span style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontWeight: 400,
                    marginTop: '2px',
                  }}>
                    + {formatPrice(product.shipping_cost)} Ship
                  </span>
                )}
              </div>
            </div>

            {/* Description Section */}
            {product.description && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '6px',
                }}>
                  Description
                </h3>
                <div style={{ position: 'relative' }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0,
                    // If not showing full description, clamp text
                    ...(!showFullDescription && product.description.length > 150 ? {
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    } : {})
                  }}>
                    {product.description}
                  </p>
                  {product.description.length > 150 && (
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
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: 0,
                        opacity: 0.8,
                      }}
                    >
                      {showFullDescription ? 'Show less' : 'Read more'}
                      <ChevronRight
                        size={14}
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
          </div>

          {/* Size Selector */}
          {hasVariants && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
              }}>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'rgba(255, 255, 255, 0.9)',
                }}>
                  Select Size
                </span>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
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
            gap: '12px',
            alignItems: 'stretch',
            marginBottom: '16px',
          }}>
            {/* Quantity Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              height: '52px',
            }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                style={{
                  width: '40px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: quantity <= 1 ? 'rgba(255, 255, 255, 0.2)' : '#FFFFFF',
                  fontSize: '18px',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                }}
              >
                −
              </button>
              <span style={{
                width: '32px',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '15px',
                color: '#FFFFFF',
              }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock_quantity || 99, q + 1))}
                disabled={quantity >= (product.stock_quantity || 99)}
                style={{
                  width: '40px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: quantity >= (product.stock_quantity || 99) ? 'rgba(255, 255, 255, 0.2)' : '#FFFFFF',
                  fontSize: '18px',
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
                height: '52px',
                background: isAdded
                  ? '#22c55e'
                  : (hasVariants && !selectedSize)
                    ? 'rgba(255, 255, 255, 0.2)'
                    : '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                color: isAdded
                  ? '#FFFFFF'
                  : (hasVariants && !selectedSize)
                    ? 'rgba(255, 255, 255, 0.5)'
                    : '#000000',
                cursor: (isAdding || (hasVariants && !selectedSize)) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
              onMouseDown={(e) => !isAdding && !(hasVariants && !selectedSize) && (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => !isAdding && !(hasVariants && !selectedSize) && (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={(e) => !isAdding && !(hasVariants && !selectedSize) && (e.currentTarget.style.transform = 'scale(1)')}
            >
              {isAdding ? (
                <Loader2 size={20} className="animate-spin" />
              ) : isAdded ? (
                <>
                  <ShoppingCart size={18} />
                  View Cart
                </>
              ) : (
                <>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </main>

        {/* Footer */}
        <Footer compact={true} />

        {/* Cart Modal */}
        <CartModal />
      </div>
    </>
  );
}

