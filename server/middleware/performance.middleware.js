/**
 * Performance Optimization Middleware
 * Implements advanced caching strategies and performance headers
 */

const env = require('../env');

/**
 * Add performance headers to responses
 */
function performanceHeaders() {
    return (req, res, next) => {
        // Add performance-related headers
        res.set({
            // Enable browser caching
            'Vary': 'Accept-Encoding, User-Agent',

            // React handles all preloads - no server-side preloads to avoid conflicts

            // Performance hints
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block',

            // Enable HTTP/2 Server Push hints
            'Accept-CH': 'DPR, Viewport-Width, Width',

            // Performance timing
            'Server-Timing': 'total;dur=' + (Date.now() - req.startTime || 0)
        });

        next();
    };
}

/**
 * Conditional caching based on content type
 */
function conditionalCaching() {
    return (req, res, next) => {
        const originalSend = res.send;

        res.send = function(data) {
            // Add conditional caching headers based on content
            const contentType = res.get('Content-Type') || '';

            if (contentType.includes('application/json')) {
                // API responses: Short cache
                const fiveMinutes = 5 * 60;
                const expiresDate = new Date(Date.now() + fiveMinutes * 1000).toUTCString();

                res.set({
                    'Cache-Control': 'public, max-age=' + fiveMinutes,
                    'Expires': expiresDate
                });
            } else if (contentType.includes('text/html')) {
                // HTML pages: Very short cache for dynamic content
                if (env.NODE_ENV === 'production') {
                    const twoMinutes = 2 * 60;
                    const expiresDate = new Date(Date.now() + twoMinutes * 1000).toUTCString();

                    res.set({
                        'Cache-Control': 'public, max-age=' + twoMinutes + ', must-revalidate',
                        'Expires': expiresDate
                    });
                }
            }

            return originalSend.call(this, data);
        };

        next();
    };
}

/**
 * Compression optimization
 */
function compressionOptimization() {
    return (req, res, next) => {
        // Add compression hints
        const acceptEncoding = req.headers['accept-encoding'] || '';

        if (acceptEncoding.includes('br')) {
            // Client supports Brotli
            res.set('Content-Encoding-Priority', 'br, gzip, deflate');
        } else if (acceptEncoding.includes('gzip')) {
            // Client supports Gzip
            res.set('Content-Encoding-Priority', 'gzip, deflate');
        }

        next();
    };
}

/**
 * Resource hints for better loading performance - Minimal to prevent conflicts with React preloads
 */
function resourceHints() {
    return (req, res, next) => {
        // Add resource hints for critical resources (Google Fonts removed for local fonts)
        if (req.path === '/' || req.path === '/home') {
            res.set({
                'Link': [
                    // DNS prefetch for analytics only
                    '//www.google-analytics.com; rel=dns-prefetch',
                    '//www.googletagmanager.com; rel=dns-prefetch'
                ].join(', ')
            });
        }

        next();
    };
}

/**
 * ETags for better caching
 */
function etagOptimization() {
    return (req, res, next) => {
        const originalSend = res.send;

        res.send = function(data) {
            // Generate ETag for cacheable content
            if (res.statusCode === 200 && data) {
                const crypto = require('crypto');
                const etag = '"' + crypto.createHash('md5').update(data).digest('hex') + '"';
                res.set('ETag', etag);

                // Check if client has cached version
                const clientETag = req.headers['if-none-match'];
                if (clientETag === etag) {
                    return res.status(304).end();
                }
            }

            return originalSend.call(this, data);
        };

        next();
    };
}

/**
 * Core Web Vitals optimization
 */
function coreWebVitalsOptimization() {
    return (req, res, next) => {
        // Only set headers for the main homepage, not for every request
        if (req.path === '/' && req.method === 'GET') {
            // Add headers to improve Core Web Vitals (React handles its own preloads)
            res.set({
                // Reduce layout shift
                'Critical-CH': 'DPR, Viewport-Width',

                // Improve FID
                'X-Robots-Tag': 'index, follow'
            });
        }

        next();
    };
}

module.exports = {
    performanceHeaders,
    conditionalCaching,
    compressionOptimization,
    resourceHints,
    etagOptimization,
    coreWebVitalsOptimization
};