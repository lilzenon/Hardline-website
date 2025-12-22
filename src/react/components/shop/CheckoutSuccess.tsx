/**
 * CheckoutSuccess - Order confirmation page at /shop/success
 * Displays order details with product images and price breakdown
 */

import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { verifyCheckoutSession } from '../../services/shopService';
import { OrderConfirmationCard } from '../ui/order-confirmation-card';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';

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
    shipping_address?: object;
    created_at: string;
    success: boolean;
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
        // clearCart is stable (useCallback) so we can theoretically omitting it, 
        // but keeping the effect clean by only running on mount.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Format date for display
    // Format date for display with safety check
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
        <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
            {/* Loading State */}
            {status === 'loading' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl" />
                        <div className="relative bg-zinc-900 rounded-full p-6 border border-zinc-800">
                            <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Processing Order</h1>
                    <p className="text-zinc-400">Please wait while we confirm your purchase...</p>
                </motion.div>
            )}

            {/* Success State */}
            {status === 'success' && orderData && (
                <OrderConfirmationCard
                    orderId={orderData.order_id || 'Unknown'}
                    customerEmail={orderData.customer_email}
                    dateTime={formatDate(orderData.created_at)}
                    items={Array.isArray(orderData.items) ? orderData.items : []}
                    subtotal={orderData.subtotal || '$0.00'}
                    tax={orderData.tax || '$0.00'}
                    shipping={orderData.shipping || '$0.00'}
                    total={orderData.total || '$0.00'}
                    onContinueShopping={() => window.location.href = '/shop'}
                    onGoHome={() => window.location.href = '/'}
                />
            )}

            {/* Error State */}
            {status === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md mx-auto text-center"
                >
                    <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
                        <div className="relative mb-6 inline-block">
                            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
                            <div className="relative bg-red-500/10 rounded-full p-4">
                                <AlertCircle className="w-10 h-10 text-red-400" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-3">Verification Failed</h1>
                        <p className="text-zinc-400 mb-6">
                            {error || 'We couldn\'t verify your order status.'}
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center justify-center gap-2 w-full h-12 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-colors"
                            >
                                Try Again
                            </button>

                            <a
                                href="/shop"
                                className="inline-flex items-center justify-center gap-2 w-full h-12 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Return to Shop
                            </a>
                        </div>

                        {/* Debug Info (Visible to help user report exact issue) */}
                        <div className="mt-6 p-3 bg-black/50 rounded-lg text-left overflow-hidden">
                            <p className="text-xs text-zinc-500 font-mono break-all">
                                Session: {new URLSearchParams(window.location.search).get('session_id') || 'missing'}
                            </p>
                            <p className="text-xs text-zinc-500 font-mono mt-1">
                                Timestamp: {new Date().toISOString()}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
