/**
 * CartIcon - Navigation cart icon with item count badge
 * Shows red badge with item count (max display "99+")
 * 
 * @example
 * <CartIcon />
 */

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

// Icon styles
const iconStyles = {
  button: {
    position: 'relative',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 200ms ease',
  },
  buttonHover: {
    background: 'rgba(255, 255, 255, 0.1)',
  },
  svg: {
    width: '24px',
    height: '24px',
    color: '#FFFFFF',
  },
  badge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    minWidth: '18px',
    height: '18px',
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FF3B30',
    borderRadius: '9px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: '11px',
    color: '#FFFFFF',
    lineHeight: 1,
  },
};

/**
 * Shopping cart SVG icon
 */
function CartSVG() {
  return (
    <svg
      style={iconStyles.svg}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default function CartIcon() {
  const [isHovered, setIsHovered] = useState(false);
  const { itemCount, toggleCart } = useCart();

  // Format badge text (max "99+")
  const badgeText = itemCount > 99 ? '99+' : String(itemCount);

  return (
    <button
      style={{
        ...iconStyles.button,
        ...(isHovered ? iconStyles.buttonHover : {}),
      }}
      onClick={() => toggleCart(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <CartSVG />
      {itemCount > 0 && (
        <span style={iconStyles.badge} aria-hidden="true">
          {badgeText}
        </span>
      )}
    </button>
  );
}

