const env = require('../env');
const { CustomError } = require('../utils');

/**
 * Secure Error Handling Middleware
 * Prevents sensitive information leakage while providing useful error messages
 */

/**
 * Security-focused error logger
 * Logs detailed errors internally without exposing sensitive data
 */
function logSecurityError(error, req, additionalInfo = {}) {
    const errorLog = {
        timestamp: new Date().toISOString(),
        error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
            code: error.code
        },
        request: {
            method: req.method,
            url: req.url,
            path: req.path,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            referer: req.headers.referer,
            userId: req.user && req.user.id,
            sessionId: req.session && req.session.id
        },
        additionalInfo,
        severity: determineSeverity(error)
    };

    // Log based on severity
    if (errorLog.severity === 'critical') {
        console.error('🚨 CRITICAL SECURITY ERROR:', JSON.stringify(errorLog, null, 2));
    } else if (errorLog.severity === 'high') {
        console.error('⚠️ HIGH SECURITY ERROR:', JSON.stringify(errorLog, null, 2));
    } else if (errorLog.severity === 'medium') {
        console.warn('⚠️ MEDIUM SECURITY ERROR:', JSON.stringify(errorLog, null, 2));
    } else {
        console.log('ℹ️ LOW SECURITY ERROR:', JSON.stringify(errorLog, null, 2));
    }

    // In production, you might want to send critical errors to external monitoring
    if (env.NODE_ENV === 'production' && errorLog.severity === 'critical') {
        // TODO: Send to external monitoring service (Sentry, LogRocket, etc.)
        // sendToMonitoringService(errorLog);
    }
}

/**
 * Determine error severity based on error type and context
 */
function determineSeverity(error) {
    // If severity is already set, respect it
    if (error.severity) {
        return error.severity;
    }

    // Critical errors - immediate attention required
    if ((error.message && error.message.includes('ECONNREFUSED')) ||
        (error.message && error.message.includes('database')) ||
        (error.message && error.message.includes('redis')) ||
        error.code === 'ENOTFOUND') {
        return 'critical';
    }

    // High severity - security-related
    if ((error.message && error.message.includes('authentication')) ||
        (error.message && error.message.includes('authorization')) ||
        (error.message && error.message.includes('token')) ||
        (error.message && error.message.includes('session')) ||
        error.status === 401 ||
        error.status === 403) {
        return 'high';
    }

    // Medium severity - validation and business logic
    if (error.status === 400 ||
        error.status === 422 ||
        (error.message && error.message.includes('validation'))) {
        return 'medium';
    }

    // Low severity - client errors
    if (error.status >= 400 && error.status < 500) {
        return 'low';
    }

    // Default to high for unknown server errors
    return 'high';
}

/**
 * Sanitize error message for client response
 * Removes sensitive information while keeping useful error details
 */
function sanitizeErrorMessage(error, isProduction) {
    // If it's a CustomError, use the provided message
    if (error instanceof CustomError) {
        return error.message;
    }

    // In development, show more detailed errors
    if (!isProduction) {
        return error.message;
    }

    // In production, sanitize based on error type
    const status = error.status || error.statusCode || 500;

    switch (status) {
        case 400:
            return 'Bad request. Please check your input.';
        case 401:
            return 'Authentication required.';
        case 403:
            return 'Access denied.';
        case 404:
            return 'Resource not found.';
        case 409:
            return 'Conflict with existing resource.';
        case 422:
            return 'Invalid input data.';
        case 429:
            return 'Too many requests. Please try again later.';
        case 500:
            return 'Internal server error. Please try again later.';
        case 502:
            return 'Service temporarily unavailable.';
        case 503:
            return 'Service temporarily unavailable.';
        default:
            return 'An error occurred. Please try again later.';
    }
}

/**
 * Main secure error handling middleware
 */
function secureErrorHandler(error, req, res, next) {
    const isProduction = env.NODE_ENV === 'production';

    // Handle specific error types first
    if (error.name === 'PayloadTooLargeError' ||
        (error.message && error.message.includes('request entity too large'))) {
        console.warn(`⚠️ Payload too large error for ${req.method} ${req.url}:`, {
            contentLength: req.headers['content-length'],
            contentType: req.headers['content-type']
        });

        // Override error with more helpful message
        error = new CustomError('Request payload too large. Maximum allowed size is 100MB.', 413);
        error.severity = 'low';
    }

    // Log the error securely
    logSecurityError(error, req);

    // Determine response status
    let status = 500;
    if (error instanceof CustomError) {
        status = error.status || 500;
    } else if (error.status || error.statusCode) {
        status = error.status || error.statusCode;
    }

    // Sanitize error message
    const message = sanitizeErrorMessage(error, isProduction);

    // Prepare error response
    const errorResponse = {
        error: message,
        status: status,
        timestamp: new Date().toISOString()
    };

    // Add validation errors if present (from CustomError)
    if (error instanceof CustomError && error.details) {
        errorResponse.details = error.details;
    }

    // Add request ID for tracking (if available)
    if (req.id) {
        errorResponse.requestId = req.id;
    }

    // In development, add more debugging info
    if (!isProduction) {
        errorResponse.debug = {
            stack: error.stack,
            name: error.name,
            code: error.code
        };
    }

    // Set security headers for error responses
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    // Send error response
    res.status(status).json(errorResponse);
}

/**
 * Handle async errors in routes
 */
function asyncErrorHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

/**
 * Handle 404 errors securely - serve React SPA for non-API routes
 */
function notFoundHandler(req, res, next) {
    // For API routes and static assets, return 404 error
    if (req.path.startsWith('/api/') ||
        req.path.startsWith('/assets/') ||
        req.path.startsWith('/images/') ||
        req.path.startsWith('/js/') ||
        req.path.startsWith('/css/') ||
        req.path.match(/\.(js|css|woff|woff2|ttf|eot|svg|png|jpg|jpeg|gif|ico|map|webmanifest)$/i)) {
        console.log(`⚠️ API/Static asset not found: ${req.path}`);
        const error = new CustomError('Resource not found', 404);
        error.severity = 'low';
        return next(error);
    }

    // For all other routes, serve React SPA (including 404 pages)
    console.log(`📱 Serving React SPA for 404/unknown route: ${req.path}`);
    const path = require('path');
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
}

/**
 * Handle uncaught exceptions securely
 */
function handleUncaughtException() {
    process.on('uncaughtException', (error) => {
        console.error('🚨 UNCAUGHT EXCEPTION:', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });

        // In production, gracefully shutdown
        if (env.NODE_ENV === 'production') {
            console.error('🚨 Shutting down due to uncaught exception...');
            process.exit(1);
        }
    });
}

/**
 * Handle unhandled promise rejections securely
 */
function handleUnhandledRejection() {
    process.on('unhandledRejection', (reason, promise) => {
        console.error('🚨 UNHANDLED PROMISE REJECTION:', {
            reason: reason,
            promise: promise,
            timestamp: new Date().toISOString()
        });

        // In production, gracefully shutdown
        if (env.NODE_ENV === 'production') {
            console.error('🚨 Shutting down due to unhandled promise rejection...');
            process.exit(1);
        }
    });
}

/**
 * Database error handler
 */
function handleDatabaseError(error, req, res, next) {
    // Check if it's a database-related error
    if (error.code === 'ECONNREFUSED' ||
        error.code === 'ENOTFOUND' ||
        (error.message && error.message.includes('database')) ||
        (error.message && error.message.includes('connection')) ||
        (error.message && error.message.includes('Connection terminated unexpectedly')) ||
        (error.message && error.message.includes('timeout'))) {

        logSecurityError(error, req, { type: 'database_error' });

        const sanitizedError = new CustomError(
            'Database service temporarily unavailable',
            503
        );

        // Mark as critical severity for connection issues
        sanitizedError.severity = 'critical';

        return next(sanitizedError);
    }

    next(error);
}

/**
 * Handle payload size errors
 */
function handlePayloadError(error, req, res, next) {
    // Check if it's a payload size error
    if (error.name === 'PayloadTooLargeError' ||
        (error.message && error.message.includes('request entity too large')) ||
        (error.message && error.message.includes('payload too large'))) {

        console.warn(`⚠️ Payload too large error for ${req.method} ${req.url}:`, {
            contentLength: req.headers['content-length'],
            contentType: req.headers['content-type'],
            userAgent: req.headers['user-agent']
        });

        const sanitizedError = new CustomError(
            'Request payload too large. Maximum allowed size is 100MB.',
            413
        );

        // Mark as low severity since this is a client error
        sanitizedError.severity = 'low';

        return next(sanitizedError);
    }

    next(error);
}

/**
 * Rate limiting error handler
 */
function handleRateLimitError(error, req, res, next) {
    if (error.status === 429 || (error.message && error.message.includes('rate limit'))) {
        logSecurityError(error, req, { type: 'rate_limit_exceeded' });

        const sanitizedError = new CustomError(
            'Too many requests. Please try again later.',
            429
        );

        return next(sanitizedError);
    }

    next(error);
}

/**
 * Initialize secure error handling
 */
function initializeSecureErrorHandling() {
    handleUncaughtException();
    handleUnhandledRejection();
}

module.exports = {
    secureErrorHandler,
    asyncErrorHandler,
    notFoundHandler,
    handleDatabaseError,
    handleRateLimitError,
    initializeSecureErrorHandling,
    logSecurityError,
    sanitizeErrorMessage
};