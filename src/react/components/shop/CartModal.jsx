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
              padding: '20px 24px',
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
              onClick={toggleCart}
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
              padding: '16px 24px',
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
                  key={item.id}
                  item={item}
                  onRemove={() => removeItem(item.id)}
                  onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                />
              ))
            )}
          </div>

          {/* Footer with Total and Checkout */}
          {!isEmpty && (
            <div
              style={{
                padding: '20px 24px',
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

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '12px',
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 100, 100, 0.5)';
                  e.currentTarget.style.color = 'rgba(255, 100, 100, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
                }}
              >
                Clear Cart
              </button>
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
        gap: '16px',
        padding: '16px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Product Image */}
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.05)',
          flexShrink: 0,
        }}
      >
        {item.image ? (
          <img
            src={item.image}
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
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            color: '#FFFFFF',
            margin: '0 0 4px 0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.name}
        </h4>
        <p
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#319DFF',
            margin: '0 0 8px 0',
          }}
        >
          ${(item.price / 100).toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            −
          </button>
          <span style={{ color: '#FFFFFF', fontSize: '14px', minWidth: '24px', textAlign: 'center' }}>
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '16px',
              cursor: 'pointer',
            }}
          >
            +
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={onRemove}
        aria-label="Remove item"
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.4)',
          fontSize: '18px',
          cursor: 'pointer',
          alignSelf: 'flex-start',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(255, 100, 100, 0.8)'}
        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
      >
        ✕
      </button>
    </div>
  );
}

