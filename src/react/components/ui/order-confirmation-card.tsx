import * as React from "react";
import { useEffect, useState } from "react";
import { Check, Package, ArrowRight, Sparkles, Receipt, Truck, ExternalLink } from "lucide-react";
import { cn } from "../../../lib/utils";

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
 * Order tracking step
 */
interface TrackingStep {
    name: string;
    isCompleted: boolean;
    isCurrent: boolean;
}

// Map API status to step index (0-based)
const STATUS_TO_STEP_INDEX: Record<string, number> = {
    'pending': 0,
    'placed': 0,
    'paid': 0,
    'confirmed': 0,
    'processing': 1,
    'shipped': 2,
    'out_for_delivery': 2,
    'delivered': 3,
    'completed': 3,
};

/**
 * Generate tracking steps based on order status
 */
function generateTrackingSteps(orderStatus: string): TrackingStep[] {
    const currentStepIndex = STATUS_TO_STEP_INDEX[orderStatus?.toLowerCase()] ?? 0;
    const stepNames = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];

    return stepNames.map((name, index) => ({
        name,
        isCompleted: index <= currentStepIndex,
        isCurrent: index === currentStepIndex,
    }));
}

/**
 * Horizontal Order Tracking Component with connecting lines
 */
interface OrderTrackingProps {
    steps: TrackingStep[];
    isVisible: boolean;
}

const HorizontalOrderTracking: React.FC<OrderTrackingProps> = ({ steps, isVisible }) => {
    return (
        <div
            className={cn(
                "w-full transition-all duration-700 ease-out",
                isVisible ? "opacity-100" : "opacity-0"
            )}
        >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                {/* Background lines - only between incomplete steps */}
                {steps.map((step, index) => {
                    if (index === 0) return null;
                    const prevStep = steps[index - 1];

                    // Only show gray line if previous step is NOT completed
                    // (green line handles the rest)
                    if (prevStep.isCompleted) return null;

                    const segmentWidth = 75 / (steps.length - 1);
                    const leftPos = 12.5 + ((index - 1) * segmentWidth);

                    return (
                        <div
                            key={`bg-line-${index}`}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                left: `calc(${leftPos}% + 14px)`,
                                width: `calc(${segmentWidth}% - 28px)`,
                                height: '3px',
                                background: 'rgba(63, 63, 70, 0.5)',
                                borderRadius: '2px',
                            }}
                        />
                    );
                })}

                {/* Green progress line - from completed steps, extending to next step */}
                {steps.map((step, index) => {
                    if (index === 0) return null;
                    const prevStep = steps[index - 1];

                    // Show green line if the previous step is completed
                    // This includes the line going TO the current step (even if current is not completed yet)
                    if (!prevStep.isCompleted) return null;

                    const segmentWidth = 75 / (steps.length - 1);
                    const leftPos = 12.5 + ((index - 1) * segmentWidth);

                    return (
                        <div
                            key={`progress-line-${index}`}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                left: `calc(${leftPos}% + 14px)`,
                                width: `calc(${segmentWidth}% - 28px)`,
                                height: '3px',
                                background: 'linear-gradient(90deg, #10B981, #34D399)',
                                borderRadius: '2px',
                                boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
                            }}
                        />
                    );
                })}

                {/* Steps */}
                {steps.map((step, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '25%',
                            position: 'relative',
                            zIndex: 10,
                        }}
                    >
                        {/* Circle */}
                        <div style={{ position: 'relative', marginBottom: '10px' }}>
                            {/* Glow for completed */}
                            {step.isCompleted && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: '-4px',
                                        borderRadius: '50%',
                                        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                                        filter: 'blur(4px)',
                                    }}
                                />
                            )}

                            {step.isCompleted ? (
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '26px',
                                        height: '26px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                        boxShadow: '0 0 14px rgba(16, 185, 129, 0.5)',
                                    }}
                                >
                                    <Check style={{ width: '14px', height: '14px', color: 'white', strokeWidth: 3 }} />
                                </div>
                            ) : (
                                <div
                                    style={{
                                        position: 'relative',
                                        width: '26px',
                                        height: '26px',
                                        borderRadius: '50%',
                                        background: 'transparent',
                                        border: '2px solid rgba(113, 113, 122, 0.5)',
                                    }}
                                />
                            )}
                        </div>

                        {/* Label */}
                        <span
                            style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                textAlign: 'center',
                                color: step.isCompleted ? '#34D399' : 'rgba(113, 113, 122, 0.7)',
                            }}
                        >
                            {step.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

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
    orderStatus?: string;
    onContinueShopping?: () => void;
    receiptUrl?: string;
    trackingNumber?: string;
    trackingCarrier?: string;
    trackingUrl?: string;
    title?: string;
    className?: string;
}

/**
 * Premium order confirmation card with horizontal progress tracker
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
    orderStatus = 'confirmed',
    onContinueShopping,
    receiptUrl,
    trackingNumber,
    trackingCarrier,
    trackingUrl,
    title = "Order Confirmed!",
    className,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [itemsVisible, setItemsVisible] = useState(false);
    const [trackingVisible, setTrackingVisible] = useState(false);

    const trackingSteps = generateTrackingSteps(orderStatus);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        const trackingTimer = setTimeout(() => setTrackingVisible(true), 350);
        const itemsTimer = setTimeout(() => setItemsVisible(true), 550);
        return () => {
            clearTimeout(timer);
            clearTimeout(trackingTimer);
            clearTimeout(itemsTimer);
        };
    }, []);

    return (
        <div
            className={cn(
                "w-full max-w-md mx-auto",
                "transition-all duration-700 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                className
            )}
        >
            {/* MAIN CARD */}
            <div
                style={{
                    background: 'rgba(12, 12, 12, 0.95)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.7)',
                    overflow: 'hidden',
                }}
            >
                {/* Header - Title & Email */}
                <div
                    style={{
                        padding: '32px 24px 24px 24px',
                        textAlign: 'center',
                        background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)',
                    }}
                >
                    <h2
                        style={{
                            fontSize: '26px',
                            fontWeight: '700',
                            color: 'white',
                            letterSpacing: '-0.02em',
                            marginBottom: '8px',
                            fontFamily: 'Inter, system-ui, sans-serif',
                        }}
                    >
                        {title}
                    </h2>
                    {customerEmail && (
                        <p style={{ color: 'rgba(161, 161, 170, 0.8)', fontSize: '14px' }}>
                            Confirmation sent to <span style={{ color: '#d4d4d8' }}>{customerEmail}</span>
                        </p>
                    )}
                </div>

                {/* Order Tracking */}
                <div
                    style={{
                        padding: '24px',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    }}
                >
                    <HorizontalOrderTracking
                        steps={trackingSteps}
                        isVisible={trackingVisible}
                    />
                </div>

                {/* Tracking Info Section - Only show when shipped or delivered */}
                {(orderStatus === 'shipped' || orderStatus === 'delivered') && trackingNumber && (
                    <div
                        style={{
                            padding: '16px 24px',
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.04) 100%)',
                            borderTop: '1px solid rgba(16, 185, 129, 0.15)',
                            borderBottom: '1px solid rgba(16, 185, 129, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '16px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <span style={{
                                fontSize: '11px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                color: 'rgba(16, 185, 129, 0.8)',
                                fontWeight: '600',
                            }}>
                                {trackingCarrier ? `${trackingCarrier} Tracking` : 'Tracking Number'}
                            </span>
                            <span style={{
                                fontFamily: 'monospace',
                                fontSize: '15px',
                                color: 'white',
                                fontWeight: '500',
                                letterSpacing: '0.05em',
                            }}>
                                {trackingNumber}
                            </span>
                        </div>
                        {trackingUrl && (
                            <a
                                href={trackingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '10px 18px',
                                    background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.45)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.35)';
                                }}
                            >
                                <Truck style={{ width: '18px', height: '18px' }} />
                                Track Package
                            </a>
                        )}
                    </div>
                )}

                {/* Order Info Bar */}
                <div
                    style={{
                        padding: '16px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(255, 255, 255, 0.02)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: 'rgba(161, 161, 170, 0.8)', fontSize: '14px' }}>Order</span>
                        <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '16px', fontWeight: '600' }}>#{orderId}</span>
                    </div>
                    <span style={{ color: 'rgba(161, 161, 170, 0.7)', fontSize: '13px' }}>{dateTime}</span>
                </div>

                {/* Order Items */}
                <div style={{ padding: '20px 24px' }}>
                    <h3
                        style={{
                            fontSize: '11px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: '700',
                            marginBottom: '16px',
                            color: 'rgba(161, 161, 170, 0.7)',
                        }}
                    >
                        Items
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "transition-all duration-500",
                                    itemsVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                                )}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '12px 0',
                                    borderBottom: index < items.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                                    transitionDelay: `${index * 80}ms`,
                                }}
                            >
                                {/* Product Image */}
                                <div
                                    style={{
                                        width: '72px',
                                        height: '72px',
                                        minWidth: '72px',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        background: 'linear-gradient(135deg, rgba(39, 39, 42, 1) 0%, rgba(24, 24, 27, 1) 100%)',
                                        border: '1px solid rgba(255, 255, 255, 0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <Package style={{ width: '28px', height: '28px', color: 'rgba(113, 113, 122, 0.6)' }} />
                                    )}
                                </div>

                                {/* Product Info */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{
                                        color: 'white',
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        lineHeight: '1.3',
                                        marginBottom: '6px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                    }}>
                                        {item.name}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(161, 161, 170, 0.7)' }}>
                                        {item.size && (
                                            <span style={{
                                                color: '#a1a1aa',
                                                background: 'rgba(63, 63, 70, 0.5)',
                                                padding: '2px 8px',
                                                borderRadius: '6px',
                                                fontSize: '12px',
                                                fontWeight: '500',
                                            }}>
                                                {item.size}
                                            </span>
                                        )}
                                        <span>Qty: {item.quantity}</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>{item.totalPrice}</p>
                                    {item.quantity > 1 && (
                                        <p style={{ color: 'rgba(113, 113, 122, 0.6)', fontSize: '12px', marginTop: '2px' }}>{item.unitPrice} ea</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Financial Summary */}
                <div
                    style={{
                        padding: '20px 24px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                            <span style={{ color: 'rgba(161, 161, 170, 0.8)' }}>Subtotal</span>
                            <span style={{ color: '#d4d4d8', fontWeight: '500' }}>{subtotal}</span>
                        </div>
                        {shipping && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                                <span style={{ color: 'rgba(161, 161, 170, 0.8)' }}>Shipping</span>
                                <span style={{ color: shipping === '$0.00' ? '#34D399' : '#d4d4d8', fontWeight: '500' }}>
                                    {shipping === '$0.00' ? 'Free' : shipping}
                                </span>
                            </div>
                        )}
                        {tax && tax !== '$0.00' && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                                <span style={{ color: 'rgba(161, 161, 170, 0.8)' }}>Tax</span>
                                <span style={{ color: '#d4d4d8', fontWeight: '500' }}>{tax}</span>
                            </div>
                        )}
                    </div>

                    {/* Total */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingTop: '16px',
                            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                    >
                        <span style={{ color: 'white', fontWeight: '800', fontSize: '24px' }}>Total</span>
                        <span
                            style={{
                                fontWeight: '800',
                                fontSize: '24px',
                                color: '#10B981',
                                textShadow: '0 0 20px rgba(16, 185, 129, 0.35)',
                            }}
                        >
                            {total}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div
                    style={{
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                >
                    {onContinueShopping && (
                        <button
                            onClick={onContinueShopping}
                            style={{
                                width: '100%',
                                height: '56px',
                                fontWeight: '700',
                                fontSize: '16px',
                                borderRadius: '16px',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
                                color: '#000000',
                                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.12)',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 28px rgba(255, 255, 255, 0.18)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.12)';
                            }}
                        >
                            Continue Shopping
                            <ArrowRight style={{ width: '20px', height: '20px' }} />
                        </button>
                    )}
                    {/* Track Package Button - Shows when order is shipped */}
                    {trackingUrl && trackingNumber && (
                        <a
                            href={trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                width: '100%',
                                height: '52px',
                                fontWeight: '600',
                                fontSize: '16px',
                                borderRadius: '16px',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: '#34D399',
                                transition: 'all 0.3s ease',
                                textDecoration: 'none',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                            }}
                        >
                            <Truck style={{ width: '20px', height: '20px' }} />
                            Track Package
                            <ExternalLink style={{ width: '16px', height: '16px', marginLeft: '4px' }} />
                        </a>
                    )}
                    {/* View Receipt Button - Always show, with fallback when URL not yet available */}
                    <a
                        href={receiptUrl || '#'}
                        target={receiptUrl ? "_blank" : undefined}
                        rel={receiptUrl ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                            if (!receiptUrl) {
                                e.preventDefault();
                                alert('Receipt is being generated. Please check your email or try again in a moment.');
                            }
                        }}
                        style={{
                            width: '100%',
                            height: '52px',
                            fontWeight: '600',
                            fontSize: '16px',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            background: 'rgba(255, 255, 255, 0.08)',
                            color: receiptUrl ? 'rgba(200, 200, 200, 1)' : 'rgba(150, 150, 150, 0.6)',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                        }}
                        onMouseEnter={(e) => {
                            if (receiptUrl) {
                                e.currentTarget.style.color = '#FFFFFF';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = receiptUrl ? 'rgba(200, 200, 200, 1)' : 'rgba(150, 150, 150, 0.6)';
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                        }}
                    >
                        View Receipt
                        <Receipt style={{ width: '20px', height: '20px' }} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationCard;
