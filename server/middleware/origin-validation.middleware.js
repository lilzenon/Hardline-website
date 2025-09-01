/**
 * Origin validation middleware for BOUNCE2BOUNCE platform
 * Handles CORS and origin validation for cross-domain requests
 */

const env = require('../env');

/**
 * Allowed origins for different environments
 */
const getAllowedOrigins = () => {
    const origins = [];

    // Development origins
    if (env.NODE_ENV === 'development') {
        origins.push(
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3003',
            'http://localhost:3004',
            'http://localhost:3005',
            'http://localhost:3006',
            'http://localhost:3007',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
            'http://127.0.0.1:3002',
            'http://127.0.0.1:3003',
            'http://127.0.0.1:3004',
            'http://127.0.0.1:3005',
            'http://127.0.0.1:3006',
            'http://127.0.0.1:3007'
        );
    }

    // Production origins
    if (env.NODE_ENV === 'production') {
        // Add production domains from environment
        if (env.FRONTEND_URL) origins.push(env.FRONTEND_URL);
        if (env.DASHBOARD_URL) origins.push(env.DASHBOARD_URL);
        if (env.API_URL) origins.push(env.API_URL);

        // BOUNCE2BOUNCE production domains
        origins.push(
            'https://bounce2bounce.com',
            'https://www.bounce2bounce.com',
            'https://b2b.click',
            'https://www.b2b.click',
            'https://admin.b2b.click',
            'https://api.b2b.click'
        );
    }

    // Custom origins from environment
    if (env.ALLOWED_ORIGINS && env.ALLOWED_ORIGINS.trim()) {
        try {
            const customOrigins = env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(o => o);
            origins.push(...customOrigins);
        } catch (error) {
            console.log('⚠️ Error parsing ALLOWED_ORIGINS:', error.message);
        }
    }

    return [...new Set(origins)]; // Remove duplicates
};

/**
 * Validate request origin
 */
function validateOrigin(req, res, next) {
    const origin = req.get('Origin') || req.get('Referer');
    const allowedOrigins = getAllowedOrigins();

    // Allow requests without origin (direct API calls, mobile apps, etc.)
    if (!origin) {
        return next();
    }

    // Extract origin from referer if needed
    let requestOrigin = origin;
    if (origin.includes('/')) {
        try {
            const url = new URL(origin);
            requestOrigin = `${url.protocol}//${url.host}`;
        } catch (error) {
            console.warn('🔒 Invalid origin format:', origin);
            return res.status(403).json({
                error: 'Invalid request origin',
                code: 'INVALID_ORIGIN'
            });
        }
    }

    // Check if origin is allowed
    if (!allowedOrigins.includes(requestOrigin)) {
        console.warn(`🔒 Blocked request from unauthorized origin: ${requestOrigin}`);
        console.warn(`🔒 Allowed origins: ${allowedOrigins.join(', ')}`);

        return res.status(403).json({
            error: 'Request origin not allowed',
            code: 'ORIGIN_NOT_ALLOWED'
        });
    }

    // Log successful validation in development
    if (env.NODE_ENV === 'development') {
        console.log(`✅ Origin validated: ${requestOrigin}`);
    }

    next();
}

/**
 * Strict origin validation for sensitive endpoints
 */
function validateOriginStrict(req, res, next) {
    const origin = req.get('Origin') || req.get('Referer');

    // Require origin for strict validation
    if (!origin) {
        console.warn('🔒 Blocked request without origin header');
        return res.status(403).json({
            error: 'Origin header required',
            code: 'ORIGIN_REQUIRED'
        });
    }

    // Use regular validation
    validateOrigin(req, res, next);
}

/**
 * CORS configuration with origin validation
 */
function corsWithOriginValidation() {
    return (req, res, next) => {
        const origin = req.get('Origin');
        const allowedOrigins = getAllowedOrigins();

        // Set CORS headers
        if (origin && allowedOrigins.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin);
        } else if (!origin) {
            // Allow same-origin requests
            res.header('Access-Control-Allow-Origin', '*');
        }

        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, x-api-key');

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        next();
    };
}

module.exports = {
    validateOrigin,
    validateOriginStrict,
    corsWithOriginValidation,
    getAllowedOrigins
};