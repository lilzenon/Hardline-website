/**
 * CheckoutSuccess - Order confirmation page at /shop/success
 * Displays order details with product images and price breakdown
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { verifyCheckoutSession } from '../../services/shopService';
import { OrderConfirmationCard } from '../ui/order-confirmation-card';
import { Spinner } from '../ui/spinner';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import MobileNavigation from '../MobileNavigation';

interface OrderItem {
    name: string;
    image?: string | null;
    size?: string | null;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
}

interface OrderData {
    order_id: number;
    status: string;
    customer_email?: string;
    customer_name?: string;
    items: OrderItem[];
    subtotal: string;
    tax?: string;
    shipping?: string;
    total: string;
    shipping_address?: {
        line1: string;
        line2?: string | null;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    billing_address?: {
        line1: string;
        line2?: string | null;
        city: string;
        state: string;
        postal_code: string;
        country: string;
    };
    created_at: string;
    success: boolean;
    // Receipt and tracking fields
    receipt_url?: string;
    tracking_number?: string;
    tracking_carrier?: string;
    tracking_url?: string;
    // Payment details
    card_brand?: string;
    card_last4?: string;
}

// Internal Error Boundary to catch OrderConfirmationCard crashes
class ComponentErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        console.error("Critical error in CheckoutSuccess sub-component:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 bg-zinc-900 border border-red-500/30 rounded-xl text-center">
                    <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Display Error</h2>
                    <p className="text-zinc-400 mb-4">We verified your order, but couldn't display the receipt.</p>
                    <p className="text-xs text-zinc-500 font-mono p-2 bg-black rounded mb-4">
                        {this.state.error?.message || 'Unknown render error'}
                    </p>
                    <a href="/shop" className="text-blue-400 hover:text-blue-300 underline">Return to Shop</a>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function CheckoutSuccess() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { clearCart } = useCart();

    const hasVerified = React.useRef(false);

    useEffect(() => {
        const verifySession = async () => {
            // Prevent double execution
            if (hasVerified.current) return;
            hasVerified.current = true;

            try {
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
                    console.log('✅ Order verified successfully:', result);
                    console.log('📦 TRACKING DEBUG:', {
                        status: result.status,
                        tracking_number: result.tracking_number,
                        tracking_carrier: result.tracking_carrier,
                        tracking_url: result.tracking_url
                    });
                    setOrderData(result);
                    setStatus('success');
                    clearCart();
                } else {
                    console.error('❌ Verification failed:', result);
                    throw new Error(result.message || 'Failed to verify order');
                }
            } catch (err: any) {
                console.error('❌ Verification error details:', {
                    message: err.message,
                    stack: err.stack,
                    obj: err
                });
                setStatus('error');
                // Display the actual error message to help with debugging
                setError(err.message || 'Failed to verify your order. Please contact support.');
            }
        };

        verifySession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Format date for display
    const formatDate = (dateStr: string) => {
        try {
            if (!dateStr) return 'Date unavailable';
            return new Date(dateStr).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
            });
        } catch (e) {
            console.error('Error formatting date:', dateStr, e);
            return 'Date unavailable';
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col">
            {/* Mobile Navigation Header */}
            <MobileNavigation
                currentPage="shop"
                scrollY={0}
                onNavigate={(path) => window.location.href = path}
            />

            {/* Spacer for fixed header */}
            <div style={{ height: '97px' }} />

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
                {/* Loading State */}
                {status !== 'success' && status !== 'error' && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 transition-all duration-500">
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            padding: '48px',
                            borderRadius: '32px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '24px',
                            boxShadow: '0 0 80px -20px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
                        }}>
                            <Spinner state={status === 'loading' ? 'loading' : 'success'} className="w-12 h-12" />
                            <div className="flex flex-col items-center gap-3 text-center">
                                <h2 className="text-2xl font-bold text-white tracking-tight">Processing your order</h2>
                                <p className="text-zinc-400 text-sm font-medium tracking-wide">Please do not close this window...</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success State */}
                {status === 'success' && orderData && (
                    <ComponentErrorBoundary>
                        <OrderConfirmationCard
                            orderId={orderData.order_id || 'Unknown'}
                            customerEmail={orderData.customer_email}
                            dateTime={formatDate(orderData.created_at)}
                            items={Array.isArray(orderData.items) ? orderData.items : []}
                            subtotal={orderData.subtotal || '$0.00'}
                            tax={orderData.tax || '$0.00'}
                            shipping={orderData.shipping || '$0.00'}
                            total={orderData.total || '$0.00'}
                            orderStatus={orderData.status || 'confirmed'}
                            receiptUrl={orderData.receipt_url}
                            trackingNumber={orderData.tracking_number}
                            trackingCarrier={orderData.tracking_carrier}
                            trackingUrl={orderData.tracking_url}

                            // New Details
                            customerName={orderData.customer_name}
                            shippingAddress={orderData.shipping_address}
                            billingAddress={orderData.billing_address}
                            cardBrand={orderData.card_brand}
                            cardLast4={orderData.card_last4}

                            onContinueShopping={() => window.location.href = '/shop'}
                        />
                    </ComponentErrorBoundary>
                )}

                {/* Error State */}
                {status === 'error' && (
                    <div className="w-full max-w-md mx-auto text-center">
                        <div
                            className="p-8"
                            style={{
                                background: 'rgba(10, 10, 10, 0.85)',
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                borderRadius: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.8)',
                            }}
                        >
                            <div className="relative mb-6 inline-block">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
                                        filter: 'blur(20px)',
                                    }}
                                />
                                <div
                                    className="relative rounded-full p-4"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 100%)',
                                        border: '1px solid rgba(239, 68, 68, 0.25)',
                                    }}
                                >
                                    <AlertCircle className="w-10 h-10 text-red-400" />
                                </div>
                            </div>
                            <h1
                                className="text-2xl font-bold text-white mb-3"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            >
                                Verification Failed
                            </h1>
                            <p className="text-zinc-400 mb-6">
                                {error || 'We couldn\'t verify your order status.'}
                            </p>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="inline-flex items-center justify-center gap-2 w-full h-12 font-semibold rounded-xl transition-all duration-300"
                                    style={{
                                        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                                        color: 'white',
                                        border: 'none',
                                        boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.3)';
                                    }}
                                >
                                    Try Again
                                </button>

                                <a
                                    href="/shop"
                                    className="inline-flex items-center justify-center gap-2 w-full h-12 font-semibold rounded-xl transition-all duration-300"
                                    style={{
                                        background: 'linear-gradient(135deg, #FFFFFF 0%, #E5E5E5 100%)',
                                        color: '#000000',
                                        boxShadow: '0 8px 24px rgba(255, 255, 255, 0.1)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.02)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Return to Shop
                                </a>
                            </div>

                            {/* Debug Info */}
                            <div
                                className="mt-6 p-3 rounded-lg text-left overflow-hidden"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.4)',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                }}
                            >
                                <p className="text-xs text-zinc-500 font-mono break-all">
                                    Session: {new URLSearchParams(window.location.search).get('session_id') || 'missing'}
                                </p>
                                <p className="text-xs text-zinc-500 font-mono mt-1">
                                    Timestamp: {new Date().toISOString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

