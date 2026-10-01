/**
 * Shop Service - API client for shop endpoints
 * Connects to the appropriate API server for product and checkout operations
 *
 * Environment Configuration:
 * - Production: admin.b2b.click (serves hardline.events)
 * - Beta: beta.b2b.click (serves beta.hardline.events)
 * - Development: localhost:3002
 *
 * Uses centralized API configuration from ../utils/apiConfig.js
 *
 * @example
 * // Fetch all products
 * const products = await shopService.fetchProducts();
 *
 * // Create checkout session
 * const session = await shopService.createCheckoutSession(items);
 */

import { getApiBaseUrl } from '../utils/apiConfig';

// API base URL - uses centralized configuration
const getApiBase = () => getApiBaseUrl();

/**
 * Fetch with error handling and timeout
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
async function fetchWithTimeout(endpoint, options = {}) {
  // `sameOrigin`: hit this site's own /api proxy instead of the admin origin.
  // `simple`: send a CORS-"simple" request — no credentials, no custom headers
  // — so the browser issues NO preflight. Both are opt-in so product/checkout
  // calls keep their session cookie behaviour unchanged.
  const { sameOrigin = false, simple = false, ...fetchOptions } = options;
  const url = sameOrigin ? endpoint : `${getApiBase()}${endpoint}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  try {
    console.log(`🛍️ Shop API: ${fetchOptions.method || 'GET'} ${endpoint}`);

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      // 🔧 FIX: Add cache: 'no-store' to prevent browser caching of product data
      // This ensures fresh images and variants are always fetched
      cache: 'no-store',
      ...(simple ? {} : {
        // 🔧 FIX: Include credentials (cookies) to maintain session and prevent 'rapid_session_creation' alerts
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          ...fetchOptions.headers,
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Backend returns 'error' field, some APIs use 'message'
      throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }

    console.error(`❌ Shop API Error: ${endpoint}`, error.message);
    throw error;
  }
}

/**
 * Fetch all active products
 * @returns {Promise<Array>} List of products
 */
export async function fetchProducts() {
  const data = await fetchWithTimeout('/api/shop/products');
  return data.products || [];
}

/**
 * Fetch a single product by ID or slug
 * @param {string} idOrSlug - Product ID or slug
 * @returns {Promise<Object>} Product details
 */
export async function fetchProduct(idOrSlug) {
  const data = await fetchWithTimeout(`/api/shop/products/${idOrSlug}`);
  return data.product;
}

// Alias for fetchProduct for consistency
export const fetchProductById = fetchProduct;

/**
 * Create a Stripe checkout session
 * @param {Array} items - Cart items with { id, quantity }
 * @param {Object} options - Additional options (successUrl, cancelUrl)
 * @returns {Promise<Object>} Checkout session with URL
 */
export async function createCheckoutSession(items, options = {}) {
  const { successUrl, cancelUrl } = options;

  // Build URLs with current origin
  const origin = window.location.origin;
  const defaultSuccessUrl = `${origin}/shop/success?session_id={CHECKOUT_SESSION_ID}`;
  const defaultCancelUrl = `${origin}/shop`;

  const data = await fetchWithTimeout('/api/shop/checkout', {
    method: 'POST',
    body: JSON.stringify({
      items: items.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        size: item.size || null,
      })),
      success_url: successUrl || defaultSuccessUrl,
      cancel_url: cancelUrl || defaultCancelUrl,
    }),
  });

  return data;
}

/**
 * Verify a checkout session after payment
 * @param {string} sessionId - Stripe checkout session ID
 * @returns {Promise<Object>} Session verification result
 */
export async function verifyCheckoutSession(sessionId) {
  const data = await fetchWithTimeout(`/api/shop/checkout/verify/${sessionId}`);
  return data;
}

/**
 * Fetch shop configuration (enabled status, settings)
 * @returns {Promise<Object>} Shop configuration
 */
export async function fetchConfig() {
  // The SSR HTML inlines the per-host SEO settings (window.__SEO_SETTINGS__),
  // which carry `shop_enabled`. When they say the shop is OFF there is nothing
  // the nav can learn from /api/shop/config, so skip the request entirely. The
  // synthetic object mirrors the real payload's `shopEnabled`/`shop_enabled`
  // keys so callers' handling is unchanged. Absent or truthy → fall through to
  // the network as before (the real response remains authoritative).
  try {
    const inline = typeof window !== 'undefined' ? window.__SEO_SETTINGS__ : null;
    if (inline && typeof inline === 'object' &&
      (inline.shop_enabled === false || inline.shop_enabled === 'false')) {
      return { success: true, shopEnabled: false, shop_enabled: false, source: 'inline-seo-settings' };
    }
  } catch (_) {
    // fall through to the network
  }

  // Same-origin, preflight-free GET. This endpoint is read by the nav on
  // every page, and the cross-origin + credentials + Content-Type variant cost
  // an OPTIONS round trip before every call. /api/shop on this origin proxies
  // to admin (server/utils/admin-proxy.util.js); the dev server proxies /api.
  const data = await fetchWithTimeout('/api/shop/config', { sameOrigin: true, simple: true });
  return data;
}

// Export as default object for convenience
const shopService = {
  fetchProducts,
  fetchProduct,
  fetchProductById,
  createCheckoutSession,
  verifyCheckoutSession,
  fetchConfig,
};

export default shopService;

