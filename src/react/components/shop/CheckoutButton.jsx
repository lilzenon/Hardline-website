/**
 * CheckoutButton - Creates Stripe Checkout Session and redirects
 * Handles loading states and error display
 * 
 * @example
 * <CheckoutButton />
 */

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { createCheckoutSession } from '../../services/shopService';

// Button styles
const buttonStyles = {
  button: {
    width: '100%',
    padding: '16px 24px',
    minHeight: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)',
    border: 'none',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '16px',
    color: '#FFFFFF',
    cursor: 'pointer',
    transition: 'opacity 200ms ease, transform 100ms ease',
  },
  buttonHover: {
    opacity: 0.9,
  },
  buttonActive: {
    transform: 'scale(0.98)',
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#FFFFFF',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  error: {
    marginTop: '12px',
    padding: '12px 16px',
    background: 'rgba(255, 59, 48, 0.1)',
    border: '1px solid rgba(255, 59, 48, 0.3)',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    color: '#FF3B30',
    textAlign: 'center',
  },
  secureText: {
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
  },
};

// CSS for spinner animation
const spinnerCSS = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { items, clearCart } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0 || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);

      console.log('🛒 Creating checkout session for', items.length, 'items');

      const result = await createCheckoutSession(items);

      if (result.url) {
        console.log('✅ Redirecting to Stripe Checkout');
        // Redirect to Stripe Checkout
        window.location.href = result.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error('❌ Checkout error:', err);
      setError(err.message || 'Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  const isDisabled = items.length === 0 || isLoading;

  return (
    <>
      <style>{spinnerCSS}</style>
      
      <button
        style={{
          ...buttonStyles.button,
          ...(isDisabled ? buttonStyles.buttonDisabled : {}),
          ...(isHovered && !isDisabled ? buttonStyles.buttonHover : {}),
          ...(isActive && !isDisabled ? buttonStyles.buttonActive : {}),
        }}
        onClick={handleCheckout}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        disabled={isDisabled}
        aria-label={isLoading ? 'Processing checkout' : 'Proceed to checkout'}
      >
        {isLoading ? (
          <>
            <div style={buttonStyles.spinner} />
            Processing...
          </>
        ) : (
          'Checkout'
        )}
      </button>

      {error && (
        <div style={buttonStyles.error} role="alert">
          {error}
        </div>
      )}

      <div style={buttonStyles.secureText}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
        </svg>
        Secure checkout powered by Stripe
      </div>
    </>
  );
}

