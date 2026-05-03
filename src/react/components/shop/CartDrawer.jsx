/**
 * CartDrawer - Slide-out cart panel from right side
 * Features item list, quantity controls, subtotal, and checkout button
 * 
 * @example
 * <CartDrawer />
 */

import React, { useEffect, useRef } from 'react';
import { useCart } from '../../contexts/CartContext';
import CheckoutButton from './CheckoutButton';

// Inline SVG placeholder as data URI - no external file needed
const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' fill='%23666'%3E%3Crect width='200' height='200' fill='%23222'/%3E%3Cpath d='M80 70h40v60H80z' fill='%23444'/%3E%3Ccircle cx='95' cy='85' r='8' fill='%23555'/%3E%3Cpath d='M80 130l20-25 10 15 10-10 20 20H80z' fill='%23555'/%3E%3C/svg%3E";

// Drawer styles
const drawerStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(4px)',
    zIndex: 1000,
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 200ms ease, visibility 200ms ease',
  },
  overlayOpen: {
    opacity: 1,
    visibility: 'visible',
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: '400px',
    background: 'rgba(16, 16, 16, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderLeft: '1px solid rgba(56, 56, 56, 0.3)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    transform: 'translateX(100%)',
    transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  drawerOpen: {
    transform: 'translateX(0)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid rgba(56, 56, 56, 0.3)',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '20px',
    color: '#FFFFFF',
  },
  closeButton: {
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'background 200ms ease, color 200ms ease',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 24px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '48px 24px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  emptyText: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  emptySubtext: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.4)',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  item: {
    display: 'flex',
    gap: '16px',
    padding: '16px',
    background: 'rgba(22, 22, 22, 0.8)',
    borderRadius: '12px',
    border: '1px solid rgba(56, 56, 56, 0.3)',
  },
  itemImage: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover',
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemName: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    color: '#FFFFFF',
    marginBottom: '4px',
  },
  itemPrice: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: '#f90d0d',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  quantityButton: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(56, 56, 56, 0.5)',
    border: 'none',
    borderRadius: '6px',
    color: '#FFFFFF',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background 200ms ease',
  },
  quantity: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '14px',
    color: '#FFFFFF',
    minWidth: '24px',
    textAlign: 'center',
  },
  removeButton: {
    background: 'transparent',
    border: 'none',
    color: 'rgba(255, 100, 100, 0.8)',
    fontSize: '12px',
    cursor: 'pointer',
    padding: '4px 0',
    fontFamily: 'Inter, sans-serif',
  },
  footer: {
    padding: '20px 24px',
    borderTop: '1px solid rgba(56, 56, 56, 0.3)',
  },
  subtotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  subtotalLabel: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  subtotalValue: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '20px',
    color: '#FFFFFF',
  },
};

// Format price helper
function formatPrice(cents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export default function CartDrawer() {
  const { items, isOpen, itemCount, subtotal, toggleCart, updateQuantity, removeItem } = useCart();
  const drawerRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        toggleCart(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, toggleCart]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        style={{ ...drawerStyles.overlay, ...(isOpen ? drawerStyles.overlayOpen : {}) }}
        onClick={() => toggleCart(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{ ...drawerStyles.drawer, ...(isOpen ? drawerStyles.drawerOpen : {}) }}
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        {/* Header */}
        <div style={drawerStyles.header}>
          <h2 style={drawerStyles.title}>Cart ({itemCount})</h2>
          <button
            style={drawerStyles.closeButton}
            onClick={() => toggleCart(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={drawerStyles.content}>
          {items.length === 0 ? (
            <div style={drawerStyles.emptyState}>
              <div style={drawerStyles.emptyIcon}>🛒</div>
              <p style={drawerStyles.emptyText}>Your cart is empty</p>
              <p style={drawerStyles.emptySubtext}>Add some items to get started</p>
            </div>
          ) : (
            <div style={drawerStyles.itemList}>
              {items.map((item) => {
                // Get image URL - support multiple formats
                const getItemImageUrl = () => {
                  // Direct image_url property
                  if (item.image_url) return item.image_url;
                  // imageUrl property (camelCase)
                  if (item.imageUrl) return item.imageUrl;
                  // image property as string
                  if (item.image && typeof item.image === 'string') return item.image;
                  // image property as object with url
                  if (item.image && typeof item.image === 'object' && item.image.url) return item.image.url;
                  return PLACEHOLDER_IMAGE;
                };

                return (
                <div key={item.id} style={drawerStyles.item}>
                  <img
                    src={getItemImageUrl()}
                    alt={item.name}
                    style={drawerStyles.itemImage}
                    onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
                  />
                  <div style={drawerStyles.itemInfo}>
                    <div>
                      <p style={drawerStyles.itemName}>{item.name}</p>
                      <p style={drawerStyles.itemPrice}>{formatPrice(item.price)}</p>
                    </div>
                    <div style={drawerStyles.quantityControls}>
                      <button
                        style={drawerStyles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span style={drawerStyles.quantity}>{item.quantity}</span>
                      <button
                        style={drawerStyles.quantityButton}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        style={drawerStyles.removeButton}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={drawerStyles.footer}>
            <div style={drawerStyles.subtotalRow}>
              <span style={drawerStyles.subtotalLabel}>Subtotal</span>
              <span style={drawerStyles.subtotalValue}>{formatPrice(subtotal)}</span>
            </div>
            <CheckoutButton />
          </div>
        )}
      </div>
    </>
  );
}

