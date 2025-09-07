/**
 * Circuit Breaker Pattern Implementation
 * Provides fault tolerance for API calls to ensure homepage resilience
 */

interface CircuitBreakerConfig {
  failureThreshold: number;
  resetTimeout: number;
  monitoringPeriod: number;
}

enum CircuitState {
  CLOSED = 'CLOSED',     // Normal operation
  OPEN = 'OPEN',         // Failing, reject requests
  HALF_OPEN = 'HALF_OPEN' // Testing if service recovered
}

interface CircuitStats {
  failures: number;
  successes: number;
  lastFailureTime: number;
  state: CircuitState;
}

class CircuitBreaker {
  private config: CircuitBreakerConfig;
  private stats: CircuitStats;
  private fallbackData: Map<string, any>;

  constructor(config: Partial<CircuitBreakerConfig> = {}) {
    this.config = {
      failureThreshold: 5,      // Open circuit after 5 failures
      resetTimeout: 30000,      // Try to close after 30 seconds
      monitoringPeriod: 60000,  // Reset stats every minute
      ...config
    };

    this.stats = {
      failures: 0,
      successes: 0,
      lastFailureTime: 0,
      state: CircuitState.CLOSED
    };

    this.fallbackData = new Map();
    
    // Periodically reset stats
    setInterval(() => this.resetStats(), this.config.monitoringPeriod);
    
    console.log('🔧 Circuit Breaker initialized:', this.config);
  }

  /**
   * Execute a function with circuit breaker protection
   */
  async execute<T>(
    operation: () => Promise<T>,
    fallbackKey?: string,
    fallbackValue?: T
  ): Promise<T> {
    // Check if circuit is open
    if (this.stats.state === CircuitState.OPEN) {
      if (this.shouldAttemptReset()) {
        this.stats.state = CircuitState.HALF_OPEN;
        console.log('🔄 Circuit Breaker: Attempting reset (HALF_OPEN)');
      } else {
        console.warn('⚡ Circuit Breaker: OPEN - Using fallback');
        return this.getFallback(fallbackKey, fallbackValue);
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      
      // Cache successful result as fallback
      if (fallbackKey && result) {
        this.fallbackData.set(fallbackKey, result);
      }
      
      return result;
      
    } catch (error) {
      this.onFailure();
      console.warn('⚡ Circuit Breaker: Operation failed, using fallback');
      return this.getFallback(fallbackKey, fallbackValue);
    }
  }

  /**
   * Handle successful operation
   */
  private onSuccess(): void {
    this.stats.successes++;
    
    if (this.stats.state === CircuitState.HALF_OPEN) {
      this.stats.state = CircuitState.CLOSED;
      this.stats.failures = 0;
      console.log('✅ Circuit Breaker: Reset successful (CLOSED)');
    }
  }

  /**
   * Handle failed operation
   */
  private onFailure(): void {
    this.stats.failures++;
    this.stats.lastFailureTime = Date.now();
    
    if (this.stats.failures >= this.config.failureThreshold) {
      this.stats.state = CircuitState.OPEN;
      console.warn(`🚨 Circuit Breaker: OPEN (${this.stats.failures} failures)`);
    }
  }

  /**
   * Check if we should attempt to reset the circuit
   */
  private shouldAttemptReset(): boolean {
    return Date.now() - this.stats.lastFailureTime >= this.config.resetTimeout;
  }

  /**
   * Get fallback value
   */
  private getFallback<T>(fallbackKey?: string, fallbackValue?: T): T {
    if (fallbackKey && this.fallbackData.has(fallbackKey)) {
      console.log(`📦 Circuit Breaker: Using cached fallback for ${fallbackKey}`);
      return this.fallbackData.get(fallbackKey);
    }
    
    if (fallbackValue !== undefined) {
      console.log('📦 Circuit Breaker: Using provided fallback value');
      return fallbackValue;
    }
    
    throw new Error('Circuit breaker is open and no fallback available');
  }

  /**
   * Reset statistics
   */
  private resetStats(): void {
    if (this.stats.state === CircuitState.CLOSED) {
      this.stats.failures = 0;
      this.stats.successes = 0;
    }
  }

  /**
   * Get current circuit breaker status
   */
  getStatus(): {
    state: CircuitState;
    failures: number;
    successes: number;
    lastFailureTime: number;
    config: CircuitBreakerConfig;
  } {
    return {
      state: this.stats.state,
      failures: this.stats.failures,
      successes: this.stats.successes,
      lastFailureTime: this.stats.lastFailureTime,
      config: this.config
    };
  }

  /**
   * Manually open the circuit (for testing or emergency)
   */
  open(): void {
    this.stats.state = CircuitState.OPEN;
    this.stats.lastFailureTime = Date.now();
    console.warn('🚨 Circuit Breaker: Manually opened');
  }

  /**
   * Manually close the circuit (for testing or recovery)
   */
  close(): void {
    this.stats.state = CircuitState.CLOSED;
    this.stats.failures = 0;
    console.log('✅ Circuit Breaker: Manually closed');
  }

  /**
   * Set fallback data for specific keys
   */
  setFallback(key: string, data: any): void {
    this.fallbackData.set(key, data);
    console.log(`📦 Circuit Breaker: Fallback data set for ${key}`);
  }

  /**
   * Clear all fallback data
   */
  clearFallbacks(): void {
    this.fallbackData.clear();
    console.log('🗑️ Circuit Breaker: All fallback data cleared');
  }
}

// Create singleton instances for different services
export const apiCircuitBreaker = new CircuitBreaker({
  failureThreshold: 3,
  resetTimeout: 30000,
  monitoringPeriod: 60000
});

export const analyticsCircuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  resetTimeout: 15000,
  monitoringPeriod: 30000
});

export { CircuitBreaker, CircuitState };
export default apiCircuitBreaker;
