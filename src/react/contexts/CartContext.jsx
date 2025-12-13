/**
 * Cart Context - Manages shopping cart state with localStorage persistence
 * Uses React Context + useReducer pattern for predictable state management
 * 
 * Features:
 * - Add/remove/update cart items
 * - Persist cart to localStorage
 * - Cart drawer open/close state
 * - Loading states for async operations
 * 
 * @example
 * // In a component:
 * const { cart, addItem, removeItem, toggleCart } = useCart();
 */

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

// localStorage key for cart persistence
const CART_STORAGE_KEY = 'b2b_shop_cart';

// Initial cart state
const initialState = {
  items: [],
  isOpen: false,
  isLoading: false,
  error: null,
};

// Action types
const ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  HYDRATE: 'HYDRATE',
};

/**
 * Cart reducer - handles all cart state transitions
 * @param {Object} state - Current cart state
 * @param {Object} action - Action with type and payload
 * @returns {Object} New cart state
 */
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload;

      // Generate a unique cart item ID based on product ID and size
      // If no size, it falls back to just the product ID
      const cartItemId = product.size
        ? `${product.id}-${product.size}`
        : product.id;

      const existingIndex = state.items.findIndex(item => {
        const itemCartId = item.size ? `${item.id}-${item.size}` : item.id;
        return itemCartId === cartItemId;
      });

      if (existingIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: updatedItems };
      }

      // Add new item with the unique cartItemId attached for easier lookups later
      return {
        ...state,
        items: [...state.items, { ...product, quantity, cartItemId }],
      };
    }

    case ACTIONS.REMOVE_ITEM: {
      const { cartItemId } = action.payload;
      return {
        ...state,
        items: state.items.filter(item => {
          const itemKey = item.cartItemId || (item.size ? `${item.id}-${item.size}` : item.id);
          return itemKey !== cartItemId;
        }),
      };
    }

    case ACTIONS.UPDATE_QUANTITY: {
      const { cartItemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => {
            const itemKey = item.cartItemId || (item.size ? `${item.id}-${item.size}` : item.id);
            return itemKey !== cartItemId;
          }),
        };
      }
      return {
        ...state,
        items: state.items.map(item => {
          const itemKey = item.cartItemId || (item.size ? `${item.id}-${item.size}` : item.id);
          return itemKey === cartItemId ? { ...item, quantity } : item;
        }),
      };
    }

    case ACTIONS.CLEAR_CART:
      return { ...state, items: [], isOpen: false };

    case ACTIONS.TOGGLE_CART:
      return { ...state, isOpen: action.payload ?? !state.isOpen };

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };

    case ACTIONS.HYDRATE:
      return { ...state, items: action.payload };

    default:
      return state;
  }
}

// Create context
const CartContext = createContext(null);

/**
 * Cart Provider Component
 * Wraps the app and provides cart functionality
 */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: ACTIONS.HYDRATE, payload: parsed });
          console.log('🛒 Cart hydrated from localStorage:', parsed.length, 'items');
        }
      }
    } catch (error) {
      console.warn('⚠️ Failed to hydrate cart from localStorage:', error);
    }
  }, []);

  // Persist cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (error) {
      console.warn('⚠️ Failed to persist cart to localStorage:', error);
    }
  }, [state.items]);

  // Action creators
  const addItem = useCallback((product, quantity = 1) => {
    dispatch({ type: ACTIONS.ADD_ITEM, payload: { product, quantity } });
    console.log('🛒 Added to cart:', product.name);
  }, []);

  const removeItem = useCallback((cartItemId) => {
    dispatch({ type: ACTIONS.REMOVE_ITEM, payload: { cartItemId } });
  }, []);

  const updateQuantity = useCallback((cartItemId, quantity) => {
    dispatch({ type: ACTIONS.UPDATE_QUANTITY, payload: { cartItemId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: ACTIONS.CLEAR_CART });
    console.log('🛒 Cart cleared');
  }, []);

  const toggleCart = useCallback((isOpen) => {
    dispatch({ type: ACTIONS.TOGGLE_CART, payload: isOpen });
  }, []);

  // Computed values
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    cart: state,
    items: state.items,
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    error: state.error,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * useCart hook - Access cart context
 * @returns {Object} Cart state and actions
 * @throws {Error} If used outside CartProvider
 */
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export default CartContext;

