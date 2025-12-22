import * as React from "react";

import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Button } from "./button";

/**
 * Order item with product details
 */
interface OrderItem {
    name: string;
    image?: string | null;
    size?: string | null;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
}

/**
 * Props for OrderConfirmationCard
 */
interface OrderConfirmationCardProps {
    orderId: string | number;
    customerEmail?: string;
    dateTime: string;
    items: OrderItem[];
    subtotal: string;
    tax?: string;
    shipping?: string;
    total: string;
    onContinueShopping?: () => void;
    onGoHome?: () => void;
    title?: string;
    className?: string;
}

/**
 * Enhanced order confirmation card with product images and price breakdown
 */
export const OrderConfirmationCard: React.FC<OrderConfirmationCardProps> = ({
    orderId,
    customerEmail,
    dateTime,
    items,
    subtotal,
    tax,
    shipping,
    total,
    onContinueShopping,
    onGoHome,
    title = "Order Confirmed!",
    className,
}) => {
    return (
        <div
            className={cn(
                "w-full max-w-lg mx-auto rounded-3xl overflow-hidden",
                "bg-zinc-950 border border-zinc-800",
                "shadow-2xl shadow-black/60",
                className
            )}
        >
            {/* Header with Logo */}
            <div className="flex flex-col items-center pt-8 pb-8 px-6 text-center bg-gradient-to-b from-zinc-900 to-zinc-950 border-b border-zinc-800/50">
                <img
                    src="/static/logo-white.png"
                    alt="Logo"
                    className="h-8 mb-6 opacity-90"
                />

                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl" />
                    <div className="relative bg-zinc-900 ring-1 ring-zinc-800 rounded-full p-4">
                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">{title}</h2>
                <p className="text-zinc-400 text-sm max-w-[280px] leading-relaxed">
                    A confirmation email has been sent to{" "}
                    {customerEmail && (
                        <span className="text-white font-medium block mt-1">{customerEmail}</span>
                    )}
                </p>
            </div>

            {/* Order Details Header */}
            <div className="px-6 py-4 bg-zinc-900/30 flex items-center justify-between border-b border-zinc-800/50">
                <div className="flex flex-col items-start gap-1">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">Order Number</span>
                    <span className="text-white font-mono text-lg font-medium tracking-wide">#{orderId}</span>
                </div>
                <div className="text-right">
                    <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold block mb-1">Date</span>
                    <span className="text-zinc-400 text-sm block">{dateTime}</span>
                </div>
            </div>

            {/* Order Items */}
            <div className="px-6 py-6">
                <h3 className="text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Your Items
                </h3>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 p-3 pr-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-900 transition-colors"
                        >
                            {/* Product Image - Fixed Dimensions */}
                            <div className="w-20 h-20 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-700/50">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                        <Package className="w-8 h-8 text-zinc-600" />
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0 py-1">
                                <p className="text-white text-base font-semibold leading-tight line-clamp-2 mb-1">
                                    {item.name}
                                </p>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-medium">
                                    {item.size && (
                                        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                                            Size: {item.size}
                                        </span>
                                    )}
                                    <span>Qty: {item.quantity}</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="text-right py-1">
                                <p className="text-white font-semibold">{item.totalPrice}</p>
                                {item.quantity > 1 && (
                                    <p className="text-xs text-zinc-500 mt-0.5">{item.unitPrice} ea</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Financial Summary */}
            <div className="px-8 py-6 bg-zinc-900/20 border-t border-zinc-800/50">
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Subtotal</span>
                        <span className="text-zinc-200 font-medium">{subtotal}</span>
                    </div>
                    {shipping && (
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Shipping</span>
                            <span className="text-zinc-200 font-medium">{shipping === '$0.00' ? 'Free' : shipping}</span>
                        </div>
                    )}
                    {tax && tax !== '$0.00' && (
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Tax</span>
                            <span className="text-zinc-200 font-medium">{tax}</span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                    <span className="text-white font-bold text-lg">Total</span>
                    <span className="text-emerald-400 font-bold text-2xl tracking-tight">{total}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-zinc-950 border-t border-zinc-800/50 space-y-3">
                {onContinueShopping && (
                    <Button
                        onClick={onContinueShopping}
                        className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-bold text-base rounded-xl transition-all shadow-lg shadow-white/5 active:scale-[0.98]"
                        size="lg"
                    >
                        Continue Shopping
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                )}
                {onGoHome && (
                    <Button
                        onClick={onGoHome}
                        variant="ghost"
                        className="w-full h-12 text-zinc-500 hover:text-white hover:bg-zinc-900 font-medium rounded-xl transition-colors"
                    >
                        Return Home
                    </Button>
                )}
            </div>
        </div>
    );
};

export default OrderConfirmationCard;
