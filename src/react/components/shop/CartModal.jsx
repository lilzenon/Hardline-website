/**
 * CartModal - Modern glassmorphism cart modal
 * Replaces CartDrawer with a centered modal design
 *
 * Features:
 * - Transparent glassmorphism design
 * - Smooth open/close animations
 * - Click outside to close
 * - Escape key to close
 * - Mobile-optimized
 */

import React, { useEffect, useCallback } from 'react';
import { useCart } from '../../contexts/CartContext';
import CheckoutButton from './CheckoutButton';

export default function CartModal() {
  const {
    items,
    isOpen,
    toggleCart,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount
  } = useCart();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleCart();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, toggleCart]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle backdrop click
  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      toggleCart();
    }
  }, [toggleCart]);

  if (!isOpen) return null;

  // Safe access to items array with fallback
  const cartItems = items || [];
  const isEmpty = cartItems.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.2s ease-out',
        }}
      >
        {/* Modal Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '500px',
            maxHeight: '80vh',
            background: 'rgba(22, 22, 22, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignItems: 'center',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '20px',
                fontWeight: 700,
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              Your Cart ({itemCount})
            </h2>
            <button
              onClick={() => toggleCart(false)}
              aria-label="Close cart"
              style={{
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0 20px',
            }}
          >
            {isEmpty ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                  Your cart is empty
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.cartItemId || `${item.id}-${item.size || 'default'}`}
                  item={item}
                  onRemove={() => removeItem(item.cartItemId || (item.size ? `${item.id}-${item.size}` : item.id))}
                  onUpdateQuantity={(qty) => updateQuantity(item.cartItemId || (item.size ? `${item.id}-${item.size}` : item.id), qty)}
                />
              ))
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {!isEmpty && (
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Total */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                  Total
                </span>
                <span style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 700 }}>
                  ${(subtotal / 100).toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <CheckoutButton />
            </div>
          )}
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}

/**
 * CartItem - Individual cart item component
 */
function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '16px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Product Image */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.05)',
          flexShrink: 0,
        }}
      >
        {(item.images && item.images.length > 0) || item.image_url || item.image ? (
          <img
            src={
              (item.images && item.images[0]?.url) ||
              (item.images && typeof item.images[0] === 'string' ? item.images[0] : null) ||
              item.image_url ||
              item.image
            }
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}
          >
            📦
          </div>
        )}
      </div>

      {/* Product Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* Header: Name and Price */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <h4
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#FFFFFF',
              margin: 0,
              paddingRight: '12px',
              lineHeight: '1.4',
            }}
          >
            {item.name}
          </h4>
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.8)', // Gray/White price
              whiteSpace: 'nowrap',
            }}
          >
            ${(item.price / 100).toFixed(2)}
          </span>
        </div>

        {/* Variant Info (Size) */}
        {item.size && (
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '8px',
            }}
          >
            Size: {item.size}
          </div>
        )}

        {/* Footer: Quantity and Remove */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: item.size ? '0' : '4px' }}>
          {/* Quantity Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '6px',
            padding: '2px'
          }}>
            <button
              onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              −
            </button>
            <span style={{ fontSize: '13px', color: '#FFFFFF', minWidth: '16px', textAlign: 'center', fontWeight: 500 }}>
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={onRemove}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              padding: '4px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

