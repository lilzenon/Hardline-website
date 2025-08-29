/**
 * Authentication Middleware for Dashboard
 * Provides JWT and API key authentication for secure routes
 */

const jwt = require('jsonwebtoken');

/**
 * Basic authentication middleware
 * Supports both API key and JWT token authentication
 */
const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const apiKey = req.headers['x-api-key'];

        // Check for API key authentication
        if (apiKey) {
            const validApiKeys = [
                process.env.ANALYTICS_API_KEY,
                process.env.DASHBOARD_API_KEY,
                process.env.TRACKING_API_KEY
            ].filter(Boolean);

            if (validApiKeys.includes(apiKey)) {
                req.authType = 'apikey';
                req.apiKey = apiKey;
                return next();
            }
        }

        // Check for JWT token authentication
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);

            try {
                // Verify JWT token if JWT_SECRET is available
                if (process.env.JWT_SECRET) {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    req.user = decoded;
                    req.authType = 'jwt';
                    return next();
                }

                // For development, accept any Bearer token
                if (process.env.NODE_ENV === 'development' || token.length > 10) {
                    req.authType = 'jwt';
                    req.user = { id: 'dev-user' };
                    return next();
                }
            } catch (jwtError) {
                console.warn('JWT verification failed:', jwtError.message);
                // Continue to authentication failure below
            }
        }

        // Check for cookie-based authentication (for dashboard UI)
        if (req.cookies && req.cookies.token) {
            try {
                if (process.env.JWT_SECRET) {
                    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                    req.user = decoded;
                    req.authType = 'cookie';
                    return next();
                }
            } catch (cookieError) {
                console.warn('Cookie JWT verification failed:', cookieError.message);
                // Continue to authentication failure below
            }
        }

        return res.status(401).json({
            success: false,
            error: 'Authentication required',
            message: 'Please provide a valid API key or JWT token'
        });

    } catch (error) {
        console.error('Authentication middleware error:', error);
        return res.status(401).json({
            success: false,
            error: 'Authentication failed',
            message: 'Invalid authentication credentials'
        });
    }
};

/**
 * Optional authentication middleware
 * Allows requests to proceed even without authentication
 */
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const apiKey = req.headers['x-api-key'];

        // Try API key authentication
        if (apiKey) {
            const validApiKeys = [
                process.env.ANALYTICS_API_KEY,
                process.env.DASHBOARD_API_KEY,
                process.env.TRACKING_API_KEY
            ].filter(Boolean);

            if (validApiKeys.includes(apiKey)) {
                req.authType = 'apikey';
                req.apiKey = apiKey;
                req.authenticated = true;
                return next();
            }
        }

        // Try JWT token authentication
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);

            try {
                if (process.env.JWT_SECRET) {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    req.user = decoded;
                    req.authType = 'jwt';
                    req.authenticated = true;
                    return next();
                }
            } catch (jwtError) {
                // Ignore JWT errors for optional auth
            }
        }

        // Try cookie authentication
        if (req.cookies && req.cookies.token) {
            try {
                if (process.env.JWT_SECRET) {
                    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                    req.user = decoded;
                    req.authType = 'cookie';
                    req.authenticated = true;
                    return next();
                }
            } catch (cookieError) {
                // Ignore cookie errors for optional auth
            }
        }

        // No authentication found, but allow request to proceed
        req.authenticated = false;
        next();

    } catch (error) {
        console.error('Optional authentication middleware error:', error);
        req.authenticated = false;
        next();
    }
};

/**
 * Admin role requirement middleware
 * Must be used after requireAuth
 */
const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            error: 'Authentication required',
            message: 'Please authenticate first'
        });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            error: 'Admin access required',
            message: 'This endpoint requires admin privileges'
        });
    }

    next();
};

/**
 * Rate limiting for authenticated endpoints
 */
const authRateLimit = require('express-rate-limit')({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each authenticated user to 100 requests per windowMs
    message: {
        error: 'Too many requests',
        message: 'Rate limit exceeded for authenticated endpoints'
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
        // Use user ID if available, otherwise fall back to IP
        return req.user?.id || req.user?.sub || req.ip;
    }
});

module.exports = {
    requireAuth,
    optionalAuth,
    requireAdmin,
    authRateLimit
};
