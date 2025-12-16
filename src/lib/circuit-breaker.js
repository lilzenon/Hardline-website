/**
 * Circuit Breaker Pattern Implementation for Image Loading
 * Prevents cascading failures when image serving is unavailable
 */

class CircuitBreaker {
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold || 5;
        this.resetTimeout = options.resetTimeout || 60000; // 1 minute
        this.monitoringPeriod = options.monitoringPeriod || 10000; // 10 seconds

        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.successCount = 0;

        // Request deduplication
        this.pendingRequests = new Map();

        console.log(`🔧 Circuit breaker initialized: threshold=${this.failureThreshold}, timeout=${this.resetTimeout}ms`);
    }

    async execute(operation, requestKey = null, fallback = null) {
        // Request deduplication
        if (requestKey && this.pendingRequests.has(requestKey)) {
            console.log(`🔄 Deduplicating request: ${requestKey}`);
            return this.pendingRequests.get(requestKey);
        }

        const promise = this._executeInternal(operation, fallback);

        if (requestKey) {
            this.pendingRequests.set(requestKey, promise);
            promise.finally(() => {
                setTimeout(() => {
                    this.pendingRequests.delete(requestKey);
                }, 1000); // Keep for 1 second to handle rapid duplicates
            });
        }

        return promise;
    }

    async _executeInternal(operation, fallback) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.resetTimeout) {
                this.state = 'HALF_OPEN';
                this.successCount = 0;
                console.log('🔄 Circuit breaker transitioning to HALF_OPEN');
            } else {
                console.log('⚡ Circuit breaker OPEN - using fallback');
                if (fallback) {
                    return fallback;
                }
                throw new Error('Circuit breaker is OPEN');
            }
        }

        try {
            const result = await operation();
            this._onSuccess();
            return result;
        } catch (error) {
            this._onFailure();

            if (fallback) {
                console.log('🔄 Operation failed, using fallback');
                return fallback;
            }

            throw error;
        }
    }

    _onSuccess() {
        this.failureCount = 0;

        if (this.state === 'HALF_OPEN') {
            this.successCount++;
            if (this.successCount >= 3) { // Require 3 successes to close
                this.state = 'CLOSED';
                console.log('✅ Circuit breaker CLOSED - service recovered');
            }
        }
    }

    _onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();

        if (this.failureCount >= this.failureThreshold) {
            this.state = 'OPEN';
            console.log(`🚨 Circuit breaker OPEN - ${this.failureCount} failures detected`);
        }
    }

    getState() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            lastFailureTime: this.lastFailureTime,
            successCount: this.successCount
        };
    }

    reset() {
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.successCount = 0;
        this.pendingRequests.clear();
        console.log('🔄 Circuit breaker reset');
    }
}

// Create circuit breaker instances for different services
export const imageCircuitBreaker = new CircuitBreaker({
    failureThreshold: 3,
    resetTimeout: 30000, // 30 seconds
    monitoringPeriod: 5000 // 5 seconds
});

export const apiCircuitBreaker = new CircuitBreaker({
    failureThreshold: 5,
    resetTimeout: 60000, // 1 minute
    monitoringPeriod: 10000 // 10 seconds
});

export const analyticsCircuitBreaker = new CircuitBreaker({
    failureThreshold: 10, // More lenient for analytics
    resetTimeout: 30000, // 30 seconds
    monitoringPeriod: 5000 // 5 seconds
});

/**
 * Enhanced image loading with circuit breaker and fallbacks
 */
export const loadImageWithCircuitBreaker = async (imageUrl, fallbackUrl = null) => {
    const requestKey = `image:${imageUrl}`;

    const operation = async () => {
        return new Promise((resolve, reject) => {
            const img = new Image();

            const timeout = setTimeout(() => {
                reject(new Error('Image load timeout'));
            }, 10000); // 10 second timeout

            img.onload = () => {
                clearTimeout(timeout);
                resolve(imageUrl);
            };

            img.onerror = () => {
                clearTimeout(timeout);
                reject(new Error(`Failed to load image: ${imageUrl}`));
            };

            img.src = imageUrl;
        });
    };

    try {
        return await imageCircuitBreaker.execute(operation, requestKey, fallbackUrl);
    } catch (error) {
        console.warn(`⚠️ Image loading failed: ${error.message}`);

        // Return fallback or placeholder
        if (fallbackUrl) {
            return fallbackUrl;
        }

        // Return a data URL placeholder
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIyIiBoZWlnaHQ9IjEyNCIgdmlld0JveD0iMCAwIDIyMiAxMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMjIiIGhlaWdodD0iMTI0IiBmaWxsPSIjMTYxNjE2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNTY1NjU2IiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTQiPkV2ZW50IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
    }
};

/**
 * Get default fallback data for different endpoints
 */
export function getDefaultFallback(endpoint) {
    if (endpoint.includes('/settings/seo')) {
        return {
            success: true,
            settings: {
                default_title: "BOUNCE2BOUNCE - NJ'S PREMIERE EDM COLLECTIVE",
                default_description: "Bounce2Bounce is New Jersey's leading EDM event brand, producing curated electronic music events across NJ, NY, and the tri-state area.",
                default_og_image: 'https://admin.b2b.click/static/uploads/og-images/og-image-1758068780796-967082198.png',
                twitter_handle: '@bounce2bounce'
            },
            fallback: true
        };
    }

    if (endpoint.includes('/home-settings/homepage-data')) {
        return {
            success: true,
            homeSettings: {
                event_title: "EVENT TITLE",
                artist_name: "Artist Name",
                event_address: "101 Address Drive, Asbury Park, NJ"
            },
            featuredEvents: [],
            homepageEvents: []
        };
    }

    return null;
}

export default {
    CircuitBreaker,
    imageCircuitBreaker,
    apiCircuitBreaker,
    analyticsCircuitBreaker,
    loadImageWithCircuitBreaker,
    getDefaultFallback
};
