/**
 * Shop Service - API client for shop endpoints
 * Connects to admin.b2b.click/api/shop/* for product and checkout operations
 * 
 * @example
 * // Fetch all products
 * const products = await shopService.fetchProducts();
 * 
 * // Create checkout session
 * const session = await shopService.createCheckoutSession(items);
 */

// API base URL - uses local proxy in production, direct URL in development
const getApiBase = () => {
  const hostname = window.location.hostname;
  
  // Development: direct to admin API
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3002';
  }
  
  // Production: use admin.b2b.click directly (CORS is configured)
  return 'https://admin.b2b.click';
};

/**
 * Fetch with error handling and timeout
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
async function fetchWithTimeout(endpoint, options = {}) {
  const API_BASE = getApiBase();
  const url = `${API_BASE}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
  
  try {
    console.log(`🛍️ Shop API: ${options.method || 'GET'} ${endpoint}`);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
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

// Export as default object for convenience
const shopService = {
  fetchProducts,
  fetchProduct,
  fetchProductById,
  createCheckoutSession,
  verifyCheckoutSession,
};

export default shopService;

