# E-Commerce Shop Integration Guide

## Bounce2Bounce Shop Feature - Complete Implementation Guide

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Target URL:** bounce2bounce.com/shop

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Frontend Implementation](#2-frontend-implementation)
3. [Backend Implementation](#3-backend-implementation)
4. [Database Schema](#4-database-schema)
5. [Stripe Integration](#5-stripe-integration)
6. [Admin Dashboard](#6-admin-dashboard)
7. [Security Considerations](#7-security-considerations)
8. [Testing Strategy](#8-testing-strategy)
9. [Deployment Checklist](#9-deployment-checklist)
10. [Future Enhancements](#10-future-enhancements)

---

## 1. Architecture Overview

### 1.1 High-Level System Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BOUNCE2BOUNCE SHOP ARCHITECTURE                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐    │
│  │   Public Site    │     │  Admin Dashboard │     │     Stripe       │    │
│  │ bounce2bounce.com│     │  admin.b2b.click │     │    Platform      │    │
│  │                  │     │                  │     │                  │    │
│  │  ┌────────────┐  │     │  ┌────────────┐  │     │  ┌────────────┐  │    │
│  │  │  /shop     │  │     │  │ Shop Mgmt  │  │     │  │ Checkout   │  │    │
│  │  │  /cart     │  │     │  │ Products   │  │     │  │ Sessions   │  │    │
│  │  │  /checkout │  │     │  │ Orders     │  │     │  │ Webhooks   │  │    │
│  │  └────────────┘  │     │  │ Inventory  │  │     │  │ Payments   │  │    │
│  └────────┬─────────┘     │  └────────────┘  │     │  └────────────┘  │    │
│           │               └────────┬─────────┘     └────────┬─────────┘    │
│           │                        │                        │              │
│           └────────────────────────┼────────────────────────┘              │
│                                    │                                        │
│                          ┌─────────▼─────────┐                             │
│                          │   Backend API     │                             │
│                          │ admin.b2b.click   │                             │
│                          │                   │                             │
│                          │ ┌───────────────┐ │                             │
│                          │ │ /api/shop/*   │ │                             │
│                          │ │ /api/orders/* │ │                             │
│                          │ │ /api/webhooks │ │                             │
│                          │ └───────────────┘ │                             │
│                          └─────────┬─────────┘                             │
│                                    │                                        │
│                          ┌─────────▼─────────┐                             │
│                          │   PostgreSQL DB   │                             │
│                          │                   │                             │
│                          │ • products        │                             │
│                          │ • orders          │                             │
│                          │ • order_items     │                             │
│                          │ • inventory       │                             │
│                          └───────────────────┘                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Data Flow

```
Customer Journey:
1. Browse /shop → Fetch products from API
2. Add to cart → Local state (React Context + localStorage)
3. Checkout → Create Stripe Checkout Session
4. Payment → Stripe handles payment securely
5. Success → Webhook updates order status
6. Confirmation → Customer sees success page

Admin Journey:
1. Login to admin.b2b.click
2. Manage products (CRUD operations)
3. View/manage orders
4. Track inventory
5. Process fulfillment
```

### 1.3 Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend (Shop) | React 18 + Vite | Public shop pages |
| Frontend (Admin) | React 18 + Vite | Dashboard management |
| Backend | Node.js + Express | API server |
| Database | PostgreSQL | Data persistence |
| Payments | Stripe Checkout Sessions | Payment processing |
| Styling | Glassmorphism CSS | Design system consistency |
| State | React Context + localStorage | Cart persistence |

### 1.4 Repository Structure

```
kutt/                                    # Public homepage (bounce2bounce.com)
├── src/react/
│   ├── components/
│   │   ├── shop/                        # NEW: Shop components
│   │   │   ├── ShopPage.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── CartIcon.jsx
│   │   │   └── CheckoutSuccess.jsx
│   │   └── ...existing components
│   ├── contexts/
│   │   └── CartContext.jsx              # NEW: Cart state management
│   ├── hooks/
│   │   └── useCart.js                   # NEW: Cart hook
│   └── services/
│       └── shopService.js               # NEW: Shop API calls

kutt-dashboard-deploy/                   # Admin dashboard (admin.b2b.click)
├── server/
│   ├── models/
│   │   ├── product.model.js             # NEW
│   │   ├── order.model.js               # NEW
│   │   └── inventory.model.js           # NEW
│   ├── routes/
│   │   ├── shop.routes.js               # NEW: Public shop API
│   │   ├── orders.routes.js             # NEW: Order management
│   │   └── stripe-webhooks.routes.js    # NEW: Stripe webhooks
│   ├── services/
│   │   ├── shop.service.js              # NEW
│   │   ├── order.service.js             # NEW
│   │   └── stripe.service.js            # NEW
│   └── migrations/
│       └── YYYYMMDD_create_shop_tables.js
└── src/
    └── pages/
        └── shop/                        # NEW: Admin shop management
            ├── ProductsPage.jsx
            ├── OrdersPage.jsx
            └── InventoryPage.jsx
```

---

## 2. Frontend Implementation

### 2.1 Component Structure

```
ShopPage (Main Container)
├── ShopHeader
│   ├── Title & Description
│   └── Category Filters (optional)
├── ProductGrid
│   └── ProductCard (×n)
│       ├── Product Image
│       ├── Product Info (name, price)
│       └── Add to Cart Button
├── CartDrawer (Slide-out panel)
│   ├── Cart Items List
│   ├── Quantity Controls
│   ├── Subtotal
│   └── Checkout Button
└── CartIcon (In navigation)
    └── Item Count Badge
```

### 2.2 Cart State Management (CartContext.jsx)

```jsx
// src/react/contexts/CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'b2b_shop_cart';

const initialState = {
  items: [],
  isOpen: false,
  isLoading: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingIndex].quantity += action.payload.quantity || 1;
        return { ...state, items: newItems };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      return { ...state, items: newItems };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen };
    case 'SET_CART_OPEN':
      return { ...state, isOpen: action.payload };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsed });
      }
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }, [state.items]);

  const value = {
    items: state.items,
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    itemCount: state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    addItem: (product, quantity = 1) => dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity } }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    updateQuantity: (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
    setCartOpen: (isOpen) => dispatch({ type: 'SET_CART_OPEN', payload: isOpen }),
    setLoading: (isLoading) => dispatch({ type: 'SET_LOADING', payload: isLoading }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
```

### 2.3 Product Card Component (Glassmorphism Style)

```jsx
// src/react/components/shop/ProductCard.jsx
import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(product);
    // Brief animation feedback
    setTimeout(() => setIsAdding(false), 300);
  };

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '280px',
    background: 'rgba(22, 22, 22, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(56, 56, 56, 0.3)',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: isHovered
      ? '0 12px 40px rgba(0, 0, 0, 0.4)'
      : '0 4px 20px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
  };

  const imageStyles = {
    width: '100%',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    backgroundColor: '#1a1a1a',
  };

  const contentStyles = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const titleStyles = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: '600',
    color: '#FFFFFF',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const priceStyles = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '18px',
    fontWeight: '700',
    color: '#FFFFFF',
    margin: 0,
  };

  const buttonStyles = {
    width: '100%',
    padding: '12px 16px',
    background: isAdding ? '#0AFF4B' : 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: isAdding ? '#000000' : '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginTop: '8px',
  };

  return (
    <article
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`${product.name} - $${product.price}`}
    >
      <img
        src={product.image_url || '/images/placeholder-product.jpg'}
        alt={product.name}
        style={imageStyles}
        loading="lazy"
      />
      <div style={contentStyles}>
        <h3 style={titleStyles}>{product.name}</h3>
        <p style={priceStyles}>${(product.price / 100).toFixed(2)}</p>
        <button
          style={buttonStyles}
          onClick={handleAddToCart}
          disabled={isAdding || !product.in_stock}
          aria-label={`Add ${product.name} to cart`}
        >
          {isAdding ? '✓ Added!' : product.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
```

### 2.4 Cart Icon Component (Navigation Integration)

```jsx
// src/react/components/shop/CartIcon.jsx
import React from 'react';
import { useCart } from '../../contexts/CartContext';

const CartIcon = ({ style = {} }) => {
  const { itemCount, toggleCart } = useCart();

  // Only render if there are items in cart
  if (itemCount === 0) return null;

  const containerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px',
    height: '44px',
    cursor: 'pointer',
    ...style,
  };

  const badgeStyles = {
    position: 'absolute',
    top: '2px',
    right: '2px',
    minWidth: '18px',
    height: '18px',
    padding: '0 5px',
    background: '#FF0000',
    borderRadius: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, sans-serif',
    fontSize: '11px',
    fontWeight: '700',
    color: '#FFFFFF',
  };

  return (
    <button
      style={containerStyles}
      onClick={toggleCart}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
          stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
      <span style={badgeStyles}>{itemCount > 99 ? '99+' : itemCount}</span>
    </button>
  );
};

export default CartIcon;
```

### 2.5 Shop Service (API Integration)

```javascript
// src/react/services/shopService.js
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3002'
  : 'https://admin.b2b.click';

/**
 * Fetch all active products
 * @returns {Promise<Array>} List of products
 */
export async function fetchProducts() {
  const response = await fetch(`${API_BASE}/api/shop/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

/**
 * Fetch a single product by ID or slug
 * @param {string} idOrSlug - Product ID or slug
 * @returns {Promise<Object>} Product details
 */
export async function fetchProduct(idOrSlug) {
  const response = await fetch(`${API_BASE}/api/shop/products/${idOrSlug}`);
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return response.json();
}

/**
 * Create a Stripe Checkout Session
 * @param {Array} items - Cart items with id and quantity
 * @param {Object} options - Additional options (success_url, cancel_url)
 * @returns {Promise<Object>} Checkout session with URL
 */
export async function createCheckoutSession(items, options = {}) {
  const response = await fetch(`${API_BASE}/api/shop/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      success_url: options.success_url || `${window.location.origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: options.cancel_url || `${window.location.origin}/shop`,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  return response.json();
}

/**
 * Verify a completed checkout session
 * @param {string} sessionId - Stripe Checkout Session ID
 * @returns {Promise<Object>} Order details
 */
export async function verifyCheckoutSession(sessionId) {
  const response = await fetch(`${API_BASE}/api/shop/checkout/verify?session_id=${sessionId}`);
  if (!response.ok) {
    throw new Error('Failed to verify checkout session');
  }
  return response.json();
}
```

### 2.6 Routing Integration

Add the shop route to the main React app:

```jsx
// In src/react/index.jsx - Add to renderPage function
const ShopPage = lazy(() => import('./components/shop/ShopPage'));
const CheckoutSuccess = lazy(() => import('./components/shop/CheckoutSuccess'));

const renderPage = () => {
  if (currentPath === '/shop') {
    return (
      <Suspense fallback={<PageLoader />}>
        <ShopPage />
      </Suspense>
    );
  } else if (currentPath === '/shop/success') {
    return (
      <Suspense fallback={<PageLoader />}>
        <CheckoutSuccess />
      </Suspense>
    );
  }
  // ... existing routes
};
```

---

## 3. Backend Implementation

### 3.1 API Endpoints Overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/shop/products` | List all active products | Public |
| GET | `/api/shop/products/:id` | Get single product | Public |
| POST | `/api/shop/checkout` | Create Stripe Checkout Session | Public |
| GET | `/api/shop/checkout/verify` | Verify completed session | Public |
| POST | `/api/webhooks/stripe` | Stripe webhook handler | Stripe |
| GET | `/api/admin/products` | List all products (admin) | Admin |
| POST | `/api/admin/products` | Create product | Admin |
| PUT | `/api/admin/products/:id` | Update product | Admin |
| DELETE | `/api/admin/products/:id` | Soft delete product | Admin |
| GET | `/api/admin/orders` | List all orders | Admin |
| GET | `/api/admin/orders/:id` | Get order details | Admin |
| PUT | `/api/admin/orders/:id/status` | Update order status | Admin |

### 3.2 Shop Routes (Public API)

```javascript
// server/routes/shop.routes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { z } = require('zod');
const shopService = require('../services/shop.service');
const stripeService = require('../services/stripe.service');

// Validation schemas
const checkoutSchema = z.object({
  items: z.array(z.object({
    product_id: z.number().int().positive(),
    quantity: z.number().int().positive().max(10),
  })).min(1).max(20),
  success_url: z.string().url(),
  cancel_url: z.string().url(),
});

/**
 * GET /api/shop/products
 * Fetch all active products for the public shop
 */
router.get('/products', asyncHandler(async (req, res) => {
  const products = await shopService.getActiveProducts();
  res.json(products);
}));

/**
 * GET /api/shop/products/:id
 * Fetch a single product by ID or slug
 */
router.get('/products/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await shopService.getProduct(id);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
}));

/**
 * POST /api/shop/checkout
 * Create a Stripe Checkout Session
 */
router.post('/checkout', asyncHandler(async (req, res) => {
  // Validate request body
  const validation = checkoutSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      error: 'Invalid request',
      details: validation.error.issues
    });
  }

  const { items, success_url, cancel_url } = validation.data;

  // Verify products exist and are in stock
  const validatedItems = await shopService.validateCartItems(items);
  if (validatedItems.errors.length > 0) {
    return res.status(400).json({
      error: 'Some items are unavailable',
      details: validatedItems.errors
    });
  }

  // Create Stripe Checkout Session
  const session = await stripeService.createCheckoutSession({
    items: validatedItems.items,
    success_url,
    cancel_url,
    metadata: {
      source: 'bounce2bounce_shop',
    },
  });

  res.json({
    session_id: session.id,
    url: session.url,
  });
}));

/**
 * GET /api/shop/checkout/verify
 * Verify a completed checkout session
 */
router.get('/checkout/verify', asyncHandler(async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'session_id is required' });
  }

  const order = await shopService.getOrderBySessionId(session_id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json({
    order_id: order.id,
    status: order.status,
    items: order.items,
    total: order.total,
    created_at: order.created_at,
  });
}));

module.exports = router;
```

### 3.3 Stripe Service

```javascript
// server/services/stripe.service.js
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

/**
 * Create a Stripe Checkout Session
 * @param {Object} options - Session options
 * @returns {Promise<Object>} Stripe Checkout Session
 */
async function createCheckoutSession({ items, success_url, cancel_url, metadata = {} }) {
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: item.description || undefined,
        images: item.image_url ? [item.image_url] : undefined,
        metadata: {
          product_id: item.id.toString(),
        },
      },
      unit_amount: item.price, // Price in cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url,
    cancel_url,
    metadata: {
      ...metadata,
      items_json: JSON.stringify(items.map(i => ({ id: i.id, qty: i.quantity }))),
    },
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
  });

  return session;
}

/**
 * Retrieve a Checkout Session
 * @param {string} sessionId - Stripe Session ID
 * @returns {Promise<Object>} Session details
 */
async function retrieveSession(sessionId) {
  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer', 'payment_intent'],
  });
}

/**
 * Construct webhook event from raw body
 * @param {Buffer} rawBody - Raw request body
 * @param {string} signature - Stripe signature header
 * @returns {Object} Stripe Event
 */
function constructWebhookEvent(rawBody, signature) {
  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

module.exports = {
  stripe,
  createCheckoutSession,
  retrieveSession,
  constructWebhookEvent,
};
```

### 3.4 Stripe Webhook Handler

**CRITICAL:** The webhook route MUST use `express.raw()` middleware BEFORE `express.json()` to preserve the raw body for signature verification.

```javascript
// server/routes/stripe-webhooks.routes.js
const express = require('express');
const router = express.Router();
const stripeService = require('../services/stripe.service');
const orderService = require('../services/order.service');

/**
 * POST /api/webhooks/stripe
 * Handle Stripe webhook events
 *
 * IMPORTANT: This route must be registered BEFORE express.json() middleware
 * or use express.raw({ type: 'application/json' }) specifically for this route
 */
router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripeService.constructWebhookEvent(req.body, signature);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutComplete(session);
        break;
      }
      case 'checkout.session.expired': {
        const session = event.data.object;
        await handleCheckoutExpired(session);
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        console.log('Payment failed:', paymentIntent.id);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Error processing webhook:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Handle successful checkout completion
 */
async function handleCheckoutComplete(session) {
  console.log('Checkout completed:', session.id);

  // Parse items from metadata
  const itemsJson = session.metadata?.items_json;
  const items = itemsJson ? JSON.parse(itemsJson) : [];

  // Create order in database
  const order = await orderService.createOrder({
    stripe_session_id: session.id,
    stripe_payment_intent_id: session.payment_intent,
    customer_email: session.customer_details?.email,
    customer_name: session.customer_details?.name,
    customer_phone: session.customer_details?.phone,
    shipping_address: session.shipping_details?.address,
    billing_address: session.customer_details?.address,
    items: items,
    subtotal: session.amount_subtotal,
    total: session.amount_total,
    currency: session.currency,
    status: 'paid',
  });

  // Update inventory
  for (const item of items) {
    await orderService.decrementInventory(item.id, item.qty);
  }

  console.log('Order created:', order.id);
}

/**
 * Handle expired checkout session
 */
async function handleCheckoutExpired(session) {
  console.log('Checkout expired:', session.id);
  // Optionally log or track abandoned carts
}

module.exports = router;
```

### 3.5 Registering Webhook Route (IMPORTANT)

```javascript
// In server/index.js or server/app.js
const stripeWebhooksRouter = require('./routes/stripe-webhooks.routes');

// CRITICAL: Register webhook route BEFORE express.json() middleware
// OR use the express.raw() middleware directly in the route (as shown above)
app.use('/api/webhooks/stripe', stripeWebhooksRouter);

// Then apply express.json() for other routes
app.use(express.json());
```

---

## 4. Database Schema

### 4.1 Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    products     │       │     orders      │       │   order_items   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │       │ id (PK)         │
│ name            │       │ stripe_session  │       │ order_id (FK)   │──┐
│ slug            │       │ stripe_payment  │       │ product_id (FK) │──┼──┐
│ description     │       │ customer_email  │       │ quantity        │  │  │
│ price           │       │ customer_name   │       │ unit_price      │  │  │
│ image_url       │       │ customer_phone  │       │ total_price     │  │  │
│ category        │       │ shipping_addr   │       │ created_at      │  │  │
│ stock_quantity  │       │ billing_addr    │       └─────────────────┘  │  │
│ is_active       │       │ subtotal        │                            │  │
│ sort_order      │       │ total           │       ┌────────────────────┘  │
│ created_at      │       │ currency        │       │                       │
│ updated_at      │       │ status          │       │  ┌────────────────────┘
└─────────────────┘       │ notes           │       │  │
         ▲                │ created_at      │◄──────┘  │
         │                │ updated_at      │          │
         │                └─────────────────┘          │
         │                                             │
         └─────────────────────────────────────────────┘
```

### 4.2 Products Table

```javascript
// server/models/product.model.js
const knex = require('../db/knex');

/**
 * Create the products table
 * @param {Knex} knex - Knex instance
 */
async function createProductTable(knex) {
  const hasTable = await knex.schema.hasTable('products');
  if (!hasTable) {
    await knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('slug', 255).notNullable().unique();
      table.text('description');
      table.integer('price').notNullable(); // Price in cents
      table.string('image_url', 500);
      table.string('category', 100);
      table.integer('stock_quantity').defaultTo(0);
      table.boolean('is_active').defaultTo(true);
      table.integer('sort_order').defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // Indexes
      table.index(['is_active']);
      table.index(['category']);
      table.index(['slug']);
      table.index(['sort_order']);
    });
  }
}

/**
 * Get all active products
 * @returns {Promise<Array>} List of active products
 */
async function getActiveProducts() {
  return knex('products')
    .where('is_active', true)
    .where('stock_quantity', '>', 0)
    .orderBy('sort_order', 'asc')
    .orderBy('created_at', 'desc');
}

/**
 * Get product by ID or slug
 * @param {string|number} idOrSlug - Product ID or slug
 * @returns {Promise<Object|null>} Product or null
 */
async function getProduct(idOrSlug) {
  const isNumeric = !isNaN(parseInt(idOrSlug));
  const query = knex('products').where('is_active', true);

  if (isNumeric) {
    query.where('id', parseInt(idOrSlug));
  } else {
    query.where('slug', idOrSlug);
  }

  return query.first();
}

/**
 * Update product stock
 * @param {number} productId - Product ID
 * @param {number} quantity - Quantity to decrement
 */
async function decrementStock(productId, quantity) {
  return knex('products')
    .where('id', productId)
    .decrement('stock_quantity', quantity);
}

module.exports = {
  createProductTable,
  getActiveProducts,
  getProduct,
  decrementStock,
};
```

### 4.3 Orders Table

```javascript
// server/models/order.model.js
const knex = require('../db/knex');

/**
 * Create the orders table
 * @param {Knex} knex - Knex instance
 */
async function createOrderTable(knex) {
  const hasTable = await knex.schema.hasTable('orders');
  if (!hasTable) {
    await knex.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.string('stripe_session_id', 255).unique();
      table.string('stripe_payment_intent_id', 255);
      table.string('customer_email', 255);
      table.string('customer_name', 255);
      table.string('customer_phone', 50);
      table.jsonb('shipping_address');
      table.jsonb('billing_address');
      table.integer('subtotal').notNullable(); // In cents
      table.integer('total').notNullable(); // In cents
      table.string('currency', 3).defaultTo('usd');
      table.enum('status', [
        'pending',
        'paid',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded'
      ]).defaultTo('pending');
      table.text('notes');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // Indexes
      table.index(['stripe_session_id']);
      table.index(['customer_email']);
      table.index(['status']);
      table.index(['created_at']);
    });
  }
}

/**
 * Create the order_items table
 * @param {Knex} knex - Knex instance
 */
async function createOrderItemsTable(knex) {
  const hasTable = await knex.schema.hasTable('order_items');
  if (!hasTable) {
    await knex.schema.createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('order_id').unsigned().notNullable()
        .references('id').inTable('orders').onDelete('CASCADE');
      table.integer('product_id').unsigned().notNullable()
        .references('id').inTable('products').onDelete('RESTRICT');
      table.integer('quantity').notNullable();
      table.integer('unit_price').notNullable(); // Price at time of purchase
      table.integer('total_price').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());

      // Indexes
      table.index(['order_id']);
      table.index(['product_id']);
    });
  }
}

module.exports = {
  createOrderTable,
  createOrderItemsTable,
};
```

### 4.4 Knex Migration File

```javascript
// server/migrations/20241209120000_create_shop_tables.js

/**
 * Create shop-related tables: products, orders, order_items
 */
exports.up = async function(knex) {
  // Create products table
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('slug', 255).notNullable().unique();
    table.text('description');
    table.integer('price').notNullable();
    table.string('image_url', 500);
    table.string('category', 100);
    table.integer('stock_quantity').defaultTo(0);
    table.boolean('is_active').defaultTo(true);
    table.integer('sort_order').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['is_active']);
    table.index(['category']);
    table.index(['slug']);
    table.index(['sort_order']);
  });

  // Create orders table
  await knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table.string('stripe_session_id', 255).unique();
    table.string('stripe_payment_intent_id', 255);
    table.string('customer_email', 255);
    table.string('customer_name', 255);
    table.string('customer_phone', 50);
    table.jsonb('shipping_address');
    table.jsonb('billing_address');
    table.integer('subtotal').notNullable();
    table.integer('total').notNullable();
    table.string('currency', 3).defaultTo('usd');
    table.enum('status', [
      'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
    ]).defaultTo('pending');
    table.text('notes');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());

    table.index(['stripe_session_id']);
    table.index(['customer_email']);
    table.index(['status']);
    table.index(['created_at']);
  });

  // Create order_items table
  await knex.schema.createTable('order_items', (table) => {
    table.increments('id').primary();
    table.integer('order_id').unsigned().notNullable()
      .references('id').inTable('orders').onDelete('CASCADE');
    table.integer('product_id').unsigned().notNullable()
      .references('id').inTable('products').onDelete('RESTRICT');
    table.integer('quantity').notNullable();
    table.integer('unit_price').notNullable();
    table.integer('total_price').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.index(['order_id']);
    table.index(['product_id']);
  });
};

/**
 * Drop shop-related tables
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('order_items');
  await knex.schema.dropTableIfExists('orders');
  await knex.schema.dropTableIfExists('products');
};
```

### 4.5 Sample Queries

```sql
-- Get all active products with stock
SELECT * FROM products
WHERE is_active = true AND stock_quantity > 0
ORDER BY sort_order ASC, created_at DESC;

-- Get order with items
SELECT o.*,
       json_agg(json_build_object(
         'product_id', oi.product_id,
         'product_name', p.name,
         'quantity', oi.quantity,
         'unit_price', oi.unit_price,
         'total_price', oi.total_price
       )) as items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
WHERE o.id = $1
GROUP BY o.id;

-- Get orders by status with pagination
SELECT o.*, COUNT(oi.id) as item_count
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE o.status = $1
GROUP BY o.id
ORDER BY o.created_at DESC
LIMIT $2 OFFSET $3;

-- Get sales summary by date range
SELECT
  DATE(created_at) as date,
  COUNT(*) as order_count,
  SUM(total) as total_revenue
FROM orders
WHERE status IN ('paid', 'processing', 'shipped', 'delivered')
  AND created_at BETWEEN $1 AND $2
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Low stock alert
SELECT id, name, stock_quantity
FROM products
WHERE is_active = true AND stock_quantity <= 5
ORDER BY stock_quantity ASC;
```

---

## 5. Stripe Integration

### 5.1 Setup Steps

#### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete business verification
3. Enable test mode for development

#### Step 2: Get API Keys
1. Navigate to Developers → API Keys
2. Copy the **Publishable key** (starts with `pk_test_` or `pk_live_`)
3. Copy the **Secret key** (starts with `sk_test_` or `sk_live_`)

#### Step 3: Configure Webhook Endpoint
1. Navigate to Developers → Webhooks
2. Click "Add endpoint"
3. Enter your webhook URL: `https://admin.b2b.click/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

#### Step 4: Environment Variables

```bash
# .env file
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 5.2 Checkout Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Customer  │     │   Frontend  │     │   Backend   │     │   Stripe    │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │                   │
       │  Add to Cart      │                   │                   │
       │──────────────────>│                   │                   │
       │                   │                   │                   │
       │  Click Checkout   │                   │                   │
       │──────────────────>│                   │                   │
       │                   │                   │                   │
       │                   │  POST /checkout   │                   │
       │                   │──────────────────>│                   │
       │                   │                   │                   │
       │                   │                   │  Create Session   │
       │                   │                   │──────────────────>│
       │                   │                   │                   │
       │                   │                   │  Session URL      │
       │                   │                   │<──────────────────│
       │                   │                   │                   │
       │                   │  { url: ... }     │                   │
       │                   │<──────────────────│                   │
       │                   │                   │                   │
       │  Redirect to Stripe                   │                   │
       │<──────────────────│                   │                   │
       │                   │                   │                   │
       │  Complete Payment │                   │                   │
       │───────────────────────────────────────────────────────────>│
       │                   │                   │                   │
       │                   │                   │  Webhook Event    │
       │                   │                   │<──────────────────│
       │                   │                   │                   │
       │                   │                   │  Create Order     │
       │                   │                   │  Update Inventory │
       │                   │                   │                   │
       │  Redirect to Success Page             │                   │
       │<──────────────────────────────────────────────────────────│
       │                   │                   │                   │
```

### 5.3 Frontend Stripe Integration

```jsx
// src/react/components/shop/CheckoutButton.jsx
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { createCheckoutSession } from '../../services/shopService';

const CheckoutButton = () => {
  const { items, subtotal, setLoading, isLoading, clearCart } = useCart();

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setLoading(true);
    try {
      const { url } = await createCheckoutSession(items);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const buttonStyles = {
    width: '100%',
    padding: '16px 24px',
    background: '#319DFF',
    border: 'none',
    borderRadius: '12px',
    color: '#FFFFFF',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: '700',
    cursor: items.length === 0 || isLoading ? 'not-allowed' : 'pointer',
    opacity: items.length === 0 || isLoading ? 0.5 : 1,
    transition: 'all 0.2s ease',
  };

  return (
    <button
      style={buttonStyles}
      onClick={handleCheckout}
      disabled={items.length === 0 || isLoading}
    >
      {isLoading ? 'Processing...' : `Checkout • $${(subtotal / 100).toFixed(2)}`}
    </button>
  );
};

export default CheckoutButton;
```

### 5.4 Testing with Stripe Test Mode

Use these test card numbers in Stripe test mode:

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Successful payment |
| `4000 0000 0000 3220` | 3D Secure authentication required |
| `4000 0000 0000 9995` | Payment declined (insufficient funds) |
| `4000 0000 0000 0002` | Card declined |

**Test Webhook Locally:**

```bash
# Install Stripe CLI
# Windows: scoop install stripe
# Mac: brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3002/api/webhooks/stripe

# In another terminal, trigger test events
stripe trigger checkout.session.completed
```

---

## 6. Admin Dashboard

### 6.1 Features Overview

| Feature | Description |
|---------|-------------|
| **Products Management** | CRUD operations for products, image upload, pricing |
| **Orders Management** | View orders, update status, process fulfillment |
| **Inventory Tracking** | Stock levels, low stock alerts, restock notifications |
| **Analytics** | Sales reports, revenue charts, popular products |

### 6.2 Admin Routes (Protected API)

```javascript
// server/routes/admin/products.routes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { z } = require('zod');
const productService = require('../../services/product.service');
const { requireAdmin } = require('../../middleware/auth');

// Apply admin authentication to all routes
router.use(requireAdmin);

const productSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  price: z.number().int().positive(), // In cents
  image_url: z.string().url().optional(),
  category: z.string().max(100).optional(),
  stock_quantity: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

/**
 * GET /api/admin/products
 * List all products (including inactive)
 */
router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, category, search } = req.query;
  const products = await productService.getAllProducts({
    page: parseInt(page),
    limit: parseInt(limit),
    category,
    search,
  });
  res.json(products);
}));

/**
 * POST /api/admin/products
 * Create a new product
 */
router.post('/', asyncHandler(async (req, res) => {
  const validation = productSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: 'Invalid product data', details: validation.error.issues });
  }

  const product = await productService.createProduct(validation.data);
  res.status(201).json(product);
}));

/**
 * PUT /api/admin/products/:id
 * Update a product
 */
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const validation = productSchema.partial().safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: 'Invalid product data', details: validation.error.issues });
  }

  const product = await productService.updateProduct(parseInt(id), validation.data);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
}));

/**
 * DELETE /api/admin/products/:id
 * Soft delete a product (set is_active = false)
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  await productService.softDeleteProduct(parseInt(id));
  res.status(204).send();
}));

module.exports = router;
```

### 6.3 Orders Management Routes

```javascript
// server/routes/admin/orders.routes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const orderService = require('../../services/order.service');
const { requireAdmin } = require('../../middleware/auth');

router.use(requireAdmin);

/**
 * GET /api/admin/orders
 * List all orders with pagination and filters
 */
router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, search, start_date, end_date } = req.query;
  const orders = await orderService.getAllOrders({
    page: parseInt(page),
    limit: parseInt(limit),
    status,
    search,
    startDate: start_date,
    endDate: end_date,
  });
  res.json(orders);
}));

/**
 * GET /api/admin/orders/:id
 * Get order details with items
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await orderService.getOrderWithItems(parseInt(id));
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
}));

/**
 * PUT /api/admin/orders/:id/status
 * Update order status
 */
router.put('/:id/status', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const validStatuses = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const order = await orderService.updateOrderStatus(parseInt(id), status, notes);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
}));

module.exports = router;
```

### 6.4 Admin Dashboard UI Components

```jsx
// Dashboard page structure (kutt-dashboard-deploy/src/pages/shop/OrdersPage.jsx)
// Follow existing dashboard patterns with glassmorphism styling

const OrdersPage = () => {
  // State for orders, filters, pagination
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  // Order status badges with colors
  const statusColors = {
    pending: '#FFA500',    // Orange
    paid: '#319DFF',       // Blue
    processing: '#9B59B6', // Purple
    shipped: '#3498DB',    // Light Blue
    delivered: '#0AFF4B',  // Green
    cancelled: '#E74C3C',  // Red
    refunded: '#95A5A6',   // Gray
  };

  return (
    <div className="orders-page">
      {/* Filters */}
      <div className="filters">
        <StatusFilter value={status} onChange={setStatus} />
        <DateRangePicker />
        <SearchInput />
      </div>

      {/* Orders Table */}
      <div className="orders-table glassmorphism-card">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <OrderRow key={order.id} order={order} statusColors={statusColors} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination page={page} onPageChange={setPage} />
    </div>
  );
};
```

---

## 7. Security Considerations

### 7.1 Input Validation

All user inputs MUST be validated on both frontend and backend:

```javascript
// Backend validation with Zod
const checkoutSchema = z.object({
  items: z.array(z.object({
    product_id: z.number().int().positive(),
    quantity: z.number().int().positive().max(10), // Limit quantity per item
  })).min(1).max(20), // Limit cart size
  success_url: z.string().url().refine(
    url => url.startsWith('https://bounce2bounce.com') || url.startsWith('http://localhost'),
    'Invalid success URL'
  ),
  cancel_url: z.string().url().refine(
    url => url.startsWith('https://bounce2bounce.com') || url.startsWith('http://localhost'),
    'Invalid cancel URL'
  ),
});
```

### 7.2 Payment Security

**NEVER handle raw card data.** Stripe Checkout Sessions handle all payment information securely.

```javascript
// ✅ CORRECT: Use Stripe Checkout Sessions
const session = await stripe.checkout.sessions.create({
  mode: 'payment',
  line_items: [...],
  success_url: '...',
  cancel_url: '...',
});

// ❌ NEVER: Handle card data directly
// const { cardNumber, cvv, expiry } = req.body; // NEVER DO THIS
```

### 7.3 Webhook Security

Always verify webhook signatures:

```javascript
// ✅ CORRECT: Verify signature
function constructWebhookEvent(rawBody, signature) {
  return stripe.webhooks.constructEvent(
    rawBody,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET
  );
}

// ❌ NEVER: Trust webhook data without verification
// const event = req.body; // NEVER DO THIS
```

### 7.4 Rate Limiting

Apply rate limits to prevent abuse:

```javascript
const rateLimit = require('express-rate-limit');

// Checkout endpoint rate limit
const checkoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 checkout attempts per 15 minutes
  message: { error: 'Too many checkout attempts, please try again later' },
});

router.post('/checkout', checkoutLimiter, asyncHandler(async (req, res) => {
  // ...
}));
```

### 7.5 PII Handling

Customer data from Stripe should be handled carefully:

```javascript
// Store only necessary customer data
const order = await orderService.createOrder({
  customer_email: session.customer_details?.email, // Needed for order confirmation
  customer_name: session.customer_details?.name,   // Needed for shipping
  // Shipping address stored as JSON for fulfillment
  shipping_address: session.shipping_details?.address,
});

// Log access to customer data
console.log(`Order ${order.id} created with customer data access`);
```

### 7.6 CORS Configuration

```javascript
const cors = require('cors');

const corsOptions = {
  origin: [
    'https://bounce2bounce.com',
    'https://www.bounce2bounce.com',
    'https://beta.bounce2bounce.com',
    process.env.NODE_ENV === 'development' && 'http://localhost:5173',
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
```

---

## 8. Testing Strategy

### 8.1 Unit Tests

```javascript
// server/tests/services/shop.service.test.js
const shopService = require('../../services/shop.service');

describe('Shop Service', () => {
  describe('validateCartItems', () => {
    it('should validate items with sufficient stock', async () => {
      const items = [{ product_id: 1, quantity: 2 }];
      const result = await shopService.validateCartItems(items);
      expect(result.errors).toHaveLength(0);
      expect(result.items).toHaveLength(1);
    });

    it('should reject items with insufficient stock', async () => {
      const items = [{ product_id: 1, quantity: 1000 }];
      const result = await shopService.validateCartItems(items);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toContain('insufficient stock');
    });

    it('should reject inactive products', async () => {
      const items = [{ product_id: 999, quantity: 1 }]; // Inactive product
      const result = await shopService.validateCartItems(items);
      expect(result.errors).toHaveLength(1);
    });
  });
});
```

### 8.2 Integration Tests

```javascript
// server/tests/routes/shop.routes.test.js
const request = require('supertest');
const app = require('../../app');

describe('Shop Routes', () => {
  describe('GET /api/shop/products', () => {
    it('should return active products', async () => {
      const res = await request(app).get('/api/shop/products');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      res.body.forEach(product => {
        expect(product.is_active).toBe(true);
        expect(product.stock_quantity).toBeGreaterThan(0);
      });
    });
  });

  describe('POST /api/shop/checkout', () => {
    it('should create checkout session with valid items', async () => {
      const res = await request(app)
        .post('/api/shop/checkout')
        .send({
          items: [{ product_id: 1, quantity: 1 }],
          success_url: 'https://bounce2bounce.com/shop/success',
          cancel_url: 'https://bounce2bounce.com/shop',
        });
      expect(res.status).toBe(200);
      expect(res.body.url).toContain('checkout.stripe.com');
    });

    it('should reject empty cart', async () => {
      const res = await request(app)
        .post('/api/shop/checkout')
        .send({
          items: [],
          success_url: 'https://bounce2bounce.com/shop/success',
          cancel_url: 'https://bounce2bounce.com/shop',
        });
      expect(res.status).toBe(400);
    });
  });
});
```

### 8.3 Stripe Test Scenarios

| Scenario | Test Card | Expected Result |
|----------|-----------|-----------------|
| Successful payment | `4242424242424242` | Order created, inventory decremented |
| 3D Secure required | `4000002500003155` | Redirect to 3DS, then success |
| Card declined | `4000000000000002` | Error message, no order created |
| Insufficient funds | `4000000000009995` | Error message, no order created |
| Expired card | `4000000000000069` | Error message, no order created |

### 8.4 Frontend Tests

```javascript
// src/react/components/shop/__tests__/CartContext.test.jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { CartProvider, useCart } from '../../../contexts/CartContext';

describe('CartContext', () => {
  it('should add items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addItem({ id: 1, name: 'Test Product', price: 1000 });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.itemCount).toBe(1);
  });

  it('should calculate subtotal correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    act(() => {
      result.current.addItem({ id: 1, name: 'Product 1', price: 1000 }, 2);
      result.current.addItem({ id: 2, name: 'Product 2', price: 500 }, 1);
    });

    expect(result.current.subtotal).toBe(2500); // (1000 * 2) + (500 * 1)
  });
});
```

---

## 9. Deployment Checklist

### 9.1 Environment Variables

#### Backend (kutt-dashboard-deploy)

```bash
# .env.production

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Database (existing)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# CORS Origins
CORS_ORIGINS=https://bounce2bounce.com,https://www.bounce2bounce.com

# Feature Flags (optional)
SHOP_ENABLED=true
```

#### Frontend (kutt)

```bash
# .env.production
VITE_API_URL=https://admin.b2b.click
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
```

### 9.2 Database Migrations

```bash
# Run migrations before deployment
cd kutt-dashboard-deploy

# Check migration status
npx knex migrate:status

# Run pending migrations
npx knex migrate:latest

# Rollback if needed
npx knex migrate:rollback
```

### 9.3 Pre-Deployment Checklist

- [ ] **Environment Variables**
  - [ ] `STRIPE_SECRET_KEY` is set (production key)
  - [ ] `STRIPE_PUBLISHABLE_KEY` is set (production key)
  - [ ] `STRIPE_WEBHOOK_SECRET` is set (production webhook secret)
  - [ ] CORS origins include production domains

- [ ] **Database**
  - [ ] Migrations have been run
  - [ ] Products table has initial data
  - [ ] Indexes are created

- [ ] **Stripe Dashboard**
  - [ ] Webhook endpoint is configured for production URL
  - [ ] Webhook is receiving events (check logs)
  - [ ] Test mode is disabled for production

- [ ] **Frontend**
  - [ ] Build completes without errors
  - [ ] API URL points to production backend
  - [ ] Stripe publishable key is production key

- [ ] **Testing**
  - [ ] End-to-end checkout flow tested
  - [ ] Webhook handling verified
  - [ ] Error scenarios tested

### 9.4 Stripe Production Setup

1. **Complete Stripe Account Verification**
   - Business information
   - Bank account for payouts
   - Tax information

2. **Switch to Live Mode**
   - Replace test API keys with live keys
   - Create new webhook endpoint for production URL
   - Update webhook secret

3. **Configure Payout Schedule**
   - Set payout frequency (daily, weekly, monthly)
   - Verify bank account

4. **Enable Fraud Protection**
   - Enable Radar for fraud detection
   - Configure risk rules

### 9.5 Post-Deployment Verification

```bash
# 1. Verify API is responding
curl https://admin.b2b.click/api/shop/products

# 2. Verify webhook endpoint
# Check Stripe Dashboard → Webhooks → Recent events

# 3. Test checkout flow
# Make a small test purchase with a real card

# 4. Verify order creation
# Check database for new order record

# 5. Monitor logs
# Watch for any errors in application logs
```

---

## 10. Future Enhancements

### 10.1 Discount Codes / Coupons

```javascript
// Future: Stripe Coupon integration
const session = await stripe.checkout.sessions.create({
  // ... existing config
  discounts: [{
    coupon: 'SUMMER20', // 20% off coupon
  }],
  allow_promotion_codes: true, // Allow customer to enter codes
});
```

### 10.2 Shipping Integrations

- **ShipStation** - Multi-carrier shipping
- **EasyPost** - Shipping API aggregator
- **Shippo** - Shipping labels and tracking

```javascript
// Future: Shipping rate calculation
const shippingOptions = [
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 500, currency: 'usd' },
      display_name: 'Standard Shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 5 },
        maximum: { unit: 'business_day', value: 7 },
      },
    },
  },
  {
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: { amount: 1500, currency: 'usd' },
      display_name: 'Express Shipping',
      delivery_estimate: {
        minimum: { unit: 'business_day', value: 1 },
        maximum: { unit: 'business_day', value: 2 },
      },
    },
  },
];
```

### 10.3 Inventory Alerts

```javascript
// Future: Low stock notifications
async function checkLowStock() {
  const lowStockProducts = await knex('products')
    .where('is_active', true)
    .where('stock_quantity', '<=', 5);

  if (lowStockProducts.length > 0) {
    await sendSlackNotification({
      channel: '#shop-alerts',
      text: `⚠️ Low stock alert: ${lowStockProducts.length} products need restocking`,
      attachments: lowStockProducts.map(p => ({
        title: p.name,
        text: `Stock: ${p.stock_quantity}`,
        color: p.stock_quantity === 0 ? 'danger' : 'warning',
      })),
    });
  }
}
```

### 10.4 Customer Accounts

- Order history
- Saved addresses
- Wishlist
- Reorder functionality

### 10.5 Analytics Dashboard

- Sales by product
- Revenue over time
- Conversion rates
- Cart abandonment tracking

### 10.6 Email Notifications

- Order confirmation
- Shipping updates
- Delivery confirmation
- Review requests

```javascript
// Future: Email integration with SendGrid/Postmark
async function sendOrderConfirmation(order) {
  await sendEmail({
    to: order.customer_email,
    template: 'order-confirmation',
    data: {
      orderNumber: order.id,
      items: order.items,
      total: formatCurrency(order.total),
      shippingAddress: order.shipping_address,
    },
  });
}
```

### 10.7 Product Variants

```javascript
// Future: Size/Color variants
const productVariantSchema = {
  product_id: 'integer',
  sku: 'string',
  name: 'string', // e.g., "Large / Black"
  price: 'integer', // Override price if different
  stock_quantity: 'integer',
  attributes: 'jsonb', // { size: 'L', color: 'Black' }
};
```

---

## Appendix A: File Structure Summary

```
kutt/                                    # Public homepage
├── docs/
│   └── SHOP_INTEGRATION_GUIDE.md        # This document
├── src/react/
│   ├── components/
│   │   └── shop/
│   │       ├── ShopPage.jsx
│   │       ├── ProductCard.jsx
│   │       ├── ProductGrid.jsx
│   │       ├── CartDrawer.jsx
│   │       ├── CartIcon.jsx
│   │       ├── CheckoutButton.jsx
│   │       └── CheckoutSuccess.jsx
│   ├── contexts/
│   │   └── CartContext.jsx
│   └── services/
│       └── shopService.js

kutt-dashboard-deploy/                   # Backend + Admin
├── server/
│   ├── models/
│   │   ├── product.model.js
│   │   └── order.model.js
│   ├── routes/
│   │   ├── shop.routes.js
│   │   ├── stripe-webhooks.routes.js
│   │   └── admin/
│   │       ├── products.routes.js
│   │       └── orders.routes.js
│   ├── services/
│   │   ├── shop.service.js
│   │   ├── order.service.js
│   │   └── stripe.service.js
│   └── migrations/
│       └── 20241209120000_create_shop_tables.js
└── src/pages/shop/
    ├── ProductsPage.jsx
    ├── OrdersPage.jsx
    └── InventoryPage.jsx
```

---

## Appendix B: Quick Reference

### API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/shop/products` | Public | List products |
| GET | `/api/shop/products/:id` | Public | Get product |
| POST | `/api/shop/checkout` | Public | Create checkout |
| GET | `/api/shop/checkout/verify` | Public | Verify session |
| POST | `/api/webhooks/stripe` | Stripe | Webhook handler |
| GET | `/api/admin/products` | Admin | List all products |
| POST | `/api/admin/products` | Admin | Create product |
| PUT | `/api/admin/products/:id` | Admin | Update product |
| DELETE | `/api/admin/products/:id` | Admin | Soft delete |
| GET | `/api/admin/orders` | Admin | List orders |
| PUT | `/api/admin/orders/:id/status` | Admin | Update status |

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_live_xxx` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_live_xxx` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | `whsec_xxx` |
| `VITE_API_URL` | Backend API URL | `https://admin.b2b.click` |

### Order Statuses

| Status | Description | Color |
|--------|-------------|-------|
| `pending` | Awaiting payment | Orange |
| `paid` | Payment received | Blue |
| `processing` | Being prepared | Purple |
| `shipped` | In transit | Light Blue |
| `delivered` | Received by customer | Green |
| `cancelled` | Order cancelled | Red |
| `refunded` | Payment refunded | Gray |

---

**Document Version:** 1.0.0
**Created:** December 2024
**Author:** AI Assistant
**Repository:** https://github.com/lilzenon/kutt

