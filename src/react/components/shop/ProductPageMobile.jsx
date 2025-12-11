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

import React, { useState, useEffect } from 'react';
import MobileNavigation from '../MobileNavigation';
import Footer from '../Footer';
import CartModal from './CartModal';
import CartIcon from './CartIcon';
import { useCart } from '../../contexts/CartContext';
import { Heart, Share2, ShoppingCart, Tag, ChevronRight } from 'lucide-react';

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
  const { addItem, toggleCart } = useCart();

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

  // Buy Now handler (add to cart and open cart modal for checkout)
  const handleBuyNow = (qty = 1) => {
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

      addItem(itemData, qty);
      // Open cart modal which contains the checkout button
      toggleCart();
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
          top: 'calc(env(safe-area-inset-top, 0px) + 32px)',
          left: 'max(8px, calc((100vw - min(360px, calc(100vw - 16px))) / 2))',
          zIndex: 1001,
        }}
      >
        <CartIcon />
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
        {/* Breadcrumb Navigation - Positioned closer to product image */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '8px',
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
            {product.name.length > 25 ? `${product.name.slice(0, 25)}...` : product.name}
          </span>
        </nav>

        {/* Heart and Share Icons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '4px',
          marginBottom: '12px',
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
            }}
            aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              size={22}
              fill={isFavorited ? '#ef4444' : 'none'}
              color={isFavorited ? '#ef4444' : 'rgba(255, 255, 255, 0.6)'}
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

        {/* Product Image */}
        <div
          style={{
            aspectRatio: '4/5',
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
            alt={`${product.name} image ${currentImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Image Dots and Tags Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
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
                }}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>

          {/* Product Tags/Category - Replacing Find Similar */}
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
                      padding: '6px 10px',
                      background: 'rgba(22, 22, 22, 0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '16px',
                      fontSize: '12px',
                      fontFamily: 'Inter, sans-serif',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <Tag size={11} />
                    {tag}
                  </span>
                ))
              ) : product.category && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 10px',
                    background: 'rgba(22, 22, 22, 0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <Tag size={11} />
                  {product.category}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Product Name */}
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '8px',
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h1>

        {/* Price with Shipping */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{
            fontSize: '28px',
            fontWeight: 700,
            color: '#319DFF',
            fontFamily: 'Inter',
          }}>
            {formatPrice(product.price)}
          </span>
          {product.shipping_cost > 0 && (
            <span style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginLeft: '10px',
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
              {showFullDescription || product.description.length <= 150
                ? product.description
                : `${product.description.slice(0, 150)}...`}
              {product.description.length > 150 && (
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

        {/* Size Selector - Only show if product has size variants */}
        {hasVariants && (
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
                const variant = product.sizes.find(v => v.size === size);
                const stockCount = variant?.stock || 0;
                return (
                  <button
                    key={size}
                    onClick={() => !isOutOfStock && setSelectedSize(size)}
                    disabled={isOutOfStock}
                    title={isOutOfStock ? 'Out of stock' : `${stockCount} in stock`}
                    style={{
                      minWidth: '44px',
                      height: '44px',
                      padding: '0 14px',
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
                      position: 'relative',
                    }}
                  >
                    {size}
                    {/* Low stock indicator */}
                    {!isOutOfStock && stockCount > 0 && stockCount <= 5 && (
                      <span style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: stockCount <= 2 ? '#ef4444' : '#f59e0b',
                      }} />
                    )}
                  </button>
                );
              })}
            </div>
            {/* Size selection prompt */}
            {!selectedSize && (
              <p style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.5)',
                marginTop: '8px',
              }}>
                Please select a size
              </p>
            )}
          </div>
        )}

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
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span style={{
              width: '48px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#FFFFFF',
            }}>
              {quantity}
            </span>
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

        {/* Action Buttons */}
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
              padding: '14px 16px',
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
            }}
          >
            <ShoppingCart size={18} />
            Buy Now
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: images[0] || product.image_url || null,
              }, quantity);
              toggleCart();
            }}
            style={{
              flex: 1,
              padding: '14px 16px',
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
            }}
          >
            <ShoppingCart size={18} />
            Add to Cart
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

