/**
 * Enhanced API Client for Cross-Domain Integration
 * Provides robust error handling, retry logic, circuit breaker pattern,
 * and fallback mechanisms for homepage-to-dashboard API communication
 */

import { apiCircuitBreaker, analyticsCircuitBreaker } from './circuit-breaker';

interface APIClientConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  enableFallbacks: boolean;
  enableCircuitBreaker: boolean;
}

interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  cached?: boolean;
  fallback?: boolean;
}

class APIClient {
  private config: APIClientConfig;
  private fallbackCache: Map<string, { data: any; expires: number }>;

  constructor() {
    // Environment-aware configuration
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
    
    this.config = {
      baseURL: isDevelopment ? '/api' : 'https://admin.b2b.click/api',
      timeout: 10000, // 10 seconds
      retries: 3,
      retryDelay: 1000, // 1 second
      enableFallbacks: true,
      enableCircuitBreaker: true
    };

    this.fallbackCache = new Map();
    
    console.log(`🔧 API Client initialized for ${isDevelopment ? 'development' : 'production'}`);
    console.log(`📡 Base URL: ${this.config.baseURL}`);
  }

  /**
   * Enhanced fetch with retry logic and error handling
   */
  private async fetchWithRetry(url: string, options: RequestInit = {}, attempt = 1): Promise<Response> {
    const fullUrl = url.startsWith('http') ? url : `${this.config.baseURL}${url}`;
    
    const requestOptions: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers
      },
      credentials: 'include' // Include cookies for session-based auth
    };

    // Add timeout using AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);
    requestOptions.signal = controller.signal;

    try {
      console.log(`📡 API Request (attempt ${attempt}): ${options.method || 'GET'} ${fullUrl}`);
      
      const response = await fetch(fullUrl, requestOptions);
      clearTimeout(timeoutId);
      
      console.log(`✅ API Response: ${response.status} ${response.statusText}`);
      return response;
      
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Handle different types of errors
      if (error.name === 'AbortError') {
        console.warn(`⏰ API Request timeout (attempt ${attempt}): ${fullUrl}`);
      } else if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.warn(`🌐 Network error (attempt ${attempt}): ${fullUrl}`);
      } else {
        console.warn(`❌ API Request error (attempt ${attempt}): ${error.message}`);
      }

      // Retry logic
      if (attempt < this.config.retries) {
        const delay = this.config.retryDelay * attempt; // Exponential backoff
        console.log(`🔄 Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.fetchWithRetry(url, options, attempt + 1);
      }

      throw error;
    }
  }

  /**
   * GET request with circuit breaker, caching and fallbacks
   */
  async get<T = any>(endpoint: string): Promise<APIResponse<T>> {
    const cacheKey = `get:${endpoint}`;

    // Default fallback data for critical endpoints
    const getDefaultFallback = (endpoint: string) => {
      if (endpoint.includes('/settings/seo')) {
        return {
          success: true,
          settings: {
            default_title: 'BOUNCE2BOUNCE - Premium Event Platform',
            default_description: 'Discover and book premium events worldwide with BOUNCE2BOUNCE',
            default_keywords: 'events, tickets, entertainment, concerts, festivals',
            default_author: 'BOUNCE2BOUNCE',
            maintenance_mode: false
          }
        };
      }
      if (endpoint.includes('/maintenance-status')) {
        return {
          success: true,
          maintenance_mode: false,
          maintenance_message: 'Service temporarily unavailable'
        };
      }
      return null;
    };

    const operation = async () => {
      // Check fallback cache first
      if (this.config.enableFallbacks && this.fallbackCache.has(cacheKey)) {
        const cached = this.fallbackCache.get(cacheKey)!;
        if (cached.expires > Date.now()) {
          console.log(`📦 Using fallback cache for: ${endpoint}`);
          return {
            success: true,
            data: cached.data,
            cached: true,
            fallback: true
          };
        } else {
          this.fallbackCache.delete(cacheKey);
        }
      }

      const response = await this.fetchWithRetry(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Cache successful responses for fallback
      if (this.config.enableFallbacks && data.success) {
        this.fallbackCache.set(cacheKey, {
          data: data,
          expires: Date.now() + (5 * 60 * 1000) // 5 minutes
        });
      }

      return {
        success: true,
        data: data
      };
    };

    // Use circuit breaker if enabled
    if (this.config.enableCircuitBreaker) {
      try {
        return await apiCircuitBreaker.execute(
          operation,
          cacheKey,
          getDefaultFallback(endpoint)
        );
      } catch (error) {
        console.error(`❌ Circuit breaker fallback for ${endpoint}:`, error.message);
        const defaultFallback = getDefaultFallback(endpoint);
        if (defaultFallback) {
          return {
            success: true,
            data: defaultFallback,
            fallback: true
          };
        }
        return {
          success: false,
          error: error.message
        };
      }
    }

    // Fallback to direct operation without circuit breaker
    try {
      return await operation();
    } catch (error) {
      console.error(`❌ API GET error for ${endpoint}:`, error.message);
      const defaultFallback = getDefaultFallback(endpoint);
      if (defaultFallback) {
        return {
          success: true,
          data: defaultFallback,
          fallback: true
        };
      }
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * POST request with retry logic
   */
  async post<T = any>(endpoint: string, data: any): Promise<APIResponse<T>> {
    try {
      const response = await this.fetchWithRetry(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      
      return {
        success: true,
        data: responseData
      };

    } catch (error) {
      console.error(`❌ API POST error for ${endpoint}:`, error.message);
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get SEO settings with enhanced error handling
   */
  async getSEOSettings(): Promise<APIResponse> {
    return this.get('/settings/seo');
  }

  /**
   * Get maintenance status with enhanced error handling
   */
  async getMaintenanceStatus(): Promise<APIResponse> {
    return this.get('/settings/maintenance-status');
  }

  /**
   * Track analytics event with circuit breaker and fire-and-forget approach
   */
  async trackAnalytics(eventData: any): Promise<void> {
    const operation = async () => {
      // Use sendBeacon for analytics if available (fire-and-forget)
      if (navigator.sendBeacon) {
        const url = `${this.config.baseURL}/analytics/track`;
        const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
        const success = navigator.sendBeacon(url, blob);
        if (!success) {
          throw new Error('Beacon failed to send');
        }
        console.log('📊 Analytics event sent via beacon');
      } else {
        // Fallback to regular POST
        await this.post('/analytics/track', eventData);
        console.log('📊 Analytics event sent via POST');
      }
    };

    try {
      if (this.config.enableCircuitBreaker) {
        // Use analytics circuit breaker with more lenient settings
        await analyticsCircuitBreaker.execute(operation);
      } else {
        await operation();
      }
    } catch (error) {
      // Analytics failures should not break the app
      console.warn('📊 Analytics tracking failed (non-critical):', error.message);
    }
  }

  /**
   * Clear fallback cache
   */
  clearCache(): void {
    this.fallbackCache.clear();
    console.log('🗑️ API Client cache cleared');
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.fallbackCache.size,
      keys: Array.from(this.fallbackCache.keys())
    };
  }
}

// Export singleton instance
export const apiClient = new APIClient();
export default apiClient;
