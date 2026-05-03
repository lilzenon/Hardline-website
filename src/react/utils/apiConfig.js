/**
 * API Configuration Utility
 * Centralized configuration for API endpoints across production and beta environments
 * 
 * Environment Configuration:
 * - Production: admin.b2b.click (serves hardline.events)
 * - Beta: beta.b2b.click (serves beta.hardline.events)
 * - Development: localhost:3002
 * 
 * Override with VITE_API_BASE_URL environment variable at build time.
 */

/**
 * Get the API base URL for the current environment
 * @returns {string} The API base URL (e.g., 'https://admin.b2b.click')
 */
export function getApiBaseUrl() {
  // Check for Vite environment variable override (set at build time)
  // eslint-disable-next-line no-undef
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    // eslint-disable-next-line no-undef
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  const hostname = window.location.hostname;
  
  // Development: direct to local admin API
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3002';
  }
  
  // Beta environment: use beta API
  if (hostname === 'beta.hardline.events' || hostname.startsWith('beta.')) {
    return 'https://beta.b2b.click';
  }
  
  // Production: use admin.b2b.click (serves hardline.events)
  return 'https://admin.b2b.click';
}

/**
 * Check if we're in a development environment
 * @returns {boolean}
 */
export function isDevelopment() {
  const hostname = window.location.hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1';
}

/**
 * Check if we're in the beta environment
 * @returns {boolean}
 */
export function isBetaEnvironment() {
  const hostname = window.location.hostname;
  return hostname === 'beta.hardline.events' || hostname.startsWith('beta.');
}

/**
 * Check if we're in the production environment
 * @returns {boolean}
 */
export function isProductionEnvironment() {
  return !isDevelopment() && !isBetaEnvironment();
}

/**
 * Get the full API URL for an endpoint
 * @param {string} endpoint - The API endpoint (e.g., '/api/shop/products')
 * @returns {string} The full URL
 */
export function getApiUrl(endpoint) {
  const baseUrl = getApiBaseUrl();
  // Ensure endpoint starts with /
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${normalizedEndpoint}`;
}

/**
 * Log the current API configuration (for debugging)
 */
export function logApiConfig() {
  console.log('🌐 API Configuration:', {
    baseUrl: getApiBaseUrl(),
    environment: isDevelopment() ? 'development' : isBetaEnvironment() ? 'beta' : 'production',
    hostname: window.location.hostname,
    viteEnvOverride: typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_BASE_URL : undefined
  });
}

export default {
  getApiBaseUrl,
  getApiUrl,
  isDevelopment,
  isBetaEnvironment,
  isProductionEnvironment,
  logApiConfig
};

