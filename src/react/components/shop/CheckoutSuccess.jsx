/**
 * CheckoutSuccess - Order confirmation page at /shop/success
 * Verifies session via session_id query param and displays confirmation
 * 
 * @example
 * // URL: /shop/success?session_id=cs_test_xxx
 * <CheckoutSuccess />
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { verifyCheckoutSession } from '../../services/shopService';

// Page styles
const pageStyles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    maxWidth: '480px',
    width: '100%',
    background: 'rgba(22, 22, 22, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(56, 56, 56, 0.3)',
    borderRadius: '24px',
    padding: '48px 32px',
    textAlign: 'center',
  },
  iconSuccess: {
    width: '80px',
    height: '80px',
    margin: '0 auto 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(10, 255, 75, 0.1)',
    borderRadius: '50%',
    fontSize: '40px',
  },
  iconLoading: {
    width: '80px',
    height: '80px',
    margin: '0 auto 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(49, 157, 255, 0.1)',
    borderRadius: '50%',
  },
  iconError: {
    width: '80px',
    height: '80px',
    margin: '0 auto 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 59, 48, 0.1)',
    borderRadius: '50%',
    fontSize: '40px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(49, 157, 255, 0.3)',
    borderTopColor: '#319DFF',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  title: {
    fontSize: '28px',
    fontWeight: 800,
    marginBottom: '12px',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '32px',
    lineHeight: 1.5,
  },
  orderNumber: {
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(49, 157, 255, 0.1)',
    border: '1px solid rgba(49, 157, 255, 0.3)',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#319DFF',
    marginBottom: '32px',
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 28px',
    minHeight: '48px',
    background: 'linear-gradient(135deg, #319DFF 0%, #1E7ACC 100%)',
    border: 'none',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    color: '#FFFFFF',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'opacity 200ms ease',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '14px 28px',
    minHeight: '48px',
    background: 'transparent',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: '16px',
    color: '#FFFFFF',
    textDecoration: 'none',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'background 200ms ease',
  },
};

// CSS for spinner
const spinnerCSS = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function CheckoutSuccess() {
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    const verifySession = async () => {
      try {
        // Get session_id from URL
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');

        if (!sessionId) {
          setStatus('error');
          setError('No session ID found. Please try your purchase again.');
          return;
        }

        console.log('🔍 Verifying checkout session:', sessionId);

        const result = await verifyCheckoutSession(sessionId);

        if (result.success) {
          setOrderData(result);
          setStatus('success');
          // Clear cart after successful purchase
          clearCart();
          console.log('✅ Order confirmed:', result.order_id);
        } else {
          throw new Error(result.message || 'Failed to verify order');
        }
      } catch (err) {
        console.error('❌ Verification error:', err);
        setStatus('error');
        setError(err.message || 'Failed to verify your order. Please contact support.');
      }
    };

    verifySession();
  }, [clearCart]);

  return (
    <>
      <style>{spinnerCSS}</style>
      <div style={pageStyles.container}>
        <div style={pageStyles.card}>
          {status === 'loading' && (
            <>
              <div style={pageStyles.iconLoading}>
                <div style={pageStyles.spinner} />
              </div>
              <h1 style={pageStyles.title}>Processing Order</h1>
              <p style={pageStyles.subtitle}>Please wait while we confirm your purchase...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div style={pageStyles.iconSuccess}>✓</div>
              <h1 style={pageStyles.title}>Order Confirmed!</h1>
              <p style={pageStyles.subtitle}>
                Thank you for your purchase. You'll receive a confirmation email shortly.
              </p>
              {orderData?.order_id && (
                <div style={pageStyles.orderNumber}>
                  Order #{orderData.order_id}
                </div>
              )}
              <a href="/" style={pageStyles.button}>
                Back to Home
              </a>
              <a href="/shop" style={pageStyles.secondaryButton}>
                Continue Shopping
              </a>
            </>
          )}

          {status === 'error' && (
            <>
              <div style={pageStyles.iconError}>✕</div>
              <h1 style={pageStyles.title}>Something Went Wrong</h1>
              <p style={pageStyles.subtitle}>{error}</p>
              <a href="/shop" style={pageStyles.button}>
                Return to Shop
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
}

