import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
    };

    return (
        <AnimatePresence>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={cn(
                    "w-full max-w-lg mx-auto rounded-2xl overflow-hidden",
                    "bg-zinc-900/80 backdrop-blur-xl border border-zinc-800",
                    "shadow-2xl shadow-black/40",
                    className
                )}
            >
                {/* Success Header */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col items-center pt-8 pb-6 px-6 text-center border-b border-zinc-800"
                >
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
                        <div className="relative bg-green-500/10 rounded-full p-4">
                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-zinc-400 text-sm">
                        A confirmation email has been sent to{" "}
                        {customerEmail && (
                            <span className="text-zinc-300">{customerEmail}</span>
                        )}
                    </p>
                </motion.div>

                {/* Order Info */}
                <motion.div
                    variants={itemVariants}
                    className="px-6 py-4 bg-zinc-800/30 flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-zinc-500" />
                        <span className="text-zinc-400 text-sm">Order</span>
                        <span className="text-white font-mono font-medium">#{orderId}</span>
                    </div>
                    <span className="text-zinc-500 text-sm">{dateTime}</span>
                </motion.div>

                {/* Order Items */}
                <motion.div variants={itemVariants} className="px-6 py-4">
                    <h3 className="text-xs uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Items ({items.length})
                    </h3>
                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-800/50"
                            >
                                {/* Product Image */}
                                <div className="w-14 h-14 rounded-lg bg-zinc-800 overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Package className="w-6 h-6 text-zinc-600" />
                                        </div>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">
                                        {item.name}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        {item.size && <span>Size: {item.size}</span>}
                                        <span>Qty: {item.quantity}</span>
                                        <span>@ {item.unitPrice}</span>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="text-right flex-shrink-0">
                                    <p className="text-white font-medium">{item.totalPrice}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Price Breakdown */}
                <motion.div
                    variants={itemVariants}
                    className="px-6 py-4 border-t border-zinc-800 space-y-2"
                >
                    <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Subtotal</span>
                        <span className="text-zinc-300">{subtotal}</span>
                    </div>
                    {shipping && shipping !== "$0.00" && (
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Shipping</span>
                            <span className="text-zinc-300">{shipping}</span>
                        </div>
                    )}
                    {tax && tax !== "$0.00" && (
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Tax</span>
                            <span className="text-zinc-300">{tax}</span>
                        </div>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-2 border-t border-zinc-700">
                        <span className="text-white">Total</span>
                        <span className="text-green-400">{total}</span>
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    variants={itemVariants}
                    className="px-6 pb-6 pt-2 space-y-2"
                >
                    {onContinueShopping && (
                        <Button
                            onClick={onContinueShopping}
                            className="w-full h-12 bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl"
                            size="lg"
                        >
                            Continue Shopping
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                    {onGoHome && (
                        <Button
                            onClick={onGoHome}
                            variant="ghost"
                            className="w-full h-10 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl"
                        >
                            Back to Home
                        </Button>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default OrderConfirmationCard;
