const { z } = require('zod');
const { CustomError } = require('../utils');

/**
 * Zod Validation Middleware
 * Provides comprehensive request validation with detailed error messages
 */

/**
 * Create validation middleware for request body
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {string} source - Source of data to validate ('body', 'query', 'params')
 * @returns {Function} Express middleware function
 */
function validateRequest(schema, source = 'body') {
    return (req, res, next) => {
        try {
            let dataToValidate;
            
            switch (source) {
                case 'body':
                    dataToValidate = req.body;
                    break;
                case 'query':
                    dataToValidate = req.query;
                    break;
                case 'params':
                    dataToValidate = req.params;
                    break;
                default:
                    throw new Error(`Invalid validation source: ${source}`);
            }
            
            // Parse and validate the data
            const result = schema.safeParse(dataToValidate);
            
            if (!result.success) {
                // Format validation errors for user-friendly response
                const errors = formatZodErrors(result.error);
                
                // Log validation errors for debugging
                console.warn(`🚨 Validation failed for ${req.method} ${req.path}:`, {
                    source,
                    errors,
                    data: dataToValidate,
                    ip: req.ip,
                    userAgent: req.headers['user-agent']
                });
                
                // Return validation error
                throw new CustomError('Validation failed', 400, errors);
            }
            
            // Replace the original data with validated and transformed data
            switch (source) {
                case 'body':
                    req.body = result.data;
                    break;
                case 'query':
                    req.query = result.data;
                    break;
                case 'params':
                    req.params = result.data;
                    break;
            }
            
            next();
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                console.error('🚨 Validation middleware error:', error);
                next(new CustomError('Internal validation error', 500));
            }
        }
    };
}

/**
 * Validate request body
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Express middleware function
 */
function validateBody(schema) {
    return validateRequest(schema, 'body');
}

/**
 * Validate query parameters
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Express middleware function
 */
function validateQuery(schema) {
    return validateRequest(schema, 'query');
}

/**
 * Validate route parameters
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Express middleware function
 */
function validateParams(schema) {
    return validateRequest(schema, 'params');
}

/**
 * Validate multiple sources at once
 * @param {Object} schemas - Object with schemas for different sources
 * @returns {Function} Express middleware function
 */
function validateMultiple(schemas) {
    return (req, res, next) => {
        try {
            const errors = {};
            let hasErrors = false;
            
            // Validate each source
            Object.keys(schemas).forEach(source => {
                const schema = schemas[source];
                let dataToValidate;
                
                switch (source) {
                    case 'body':
                        dataToValidate = req.body;
                        break;
                    case 'query':
                        dataToValidate = req.query;
                        break;
                    case 'params':
                        dataToValidate = req.params;
                        break;
                    default:
                        throw new Error(`Invalid validation source: ${source}`);
                }
                
                const result = schema.safeParse(dataToValidate);
                
                if (!result.success) {
                    errors[source] = formatZodErrors(result.error);
                    hasErrors = true;
                } else {
                    // Update with validated data
                    switch (source) {
                        case 'body':
                            req.body = result.data;
                            break;
                        case 'query':
                            req.query = result.data;
                            break;
                        case 'params':
                            req.params = result.data;
                            break;
                    }
                }
            });
            
            if (hasErrors) {
                console.warn(`🚨 Multi-source validation failed for ${req.method} ${req.path}:`, {
                    errors,
                    ip: req.ip,
                    userAgent: req.headers['user-agent']
                });
                
                throw new CustomError('Validation failed', 400, errors);
            }
            
            next();
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                console.error('🚨 Multi-validation middleware error:', error);
                next(new CustomError('Internal validation error', 500));
            }
        }
    };
}

/**
 * Format Zod validation errors into user-friendly format
 * @param {z.ZodError} zodError - Zod validation error
 * @returns {Object} Formatted error object
 */
function formatZodErrors(zodError) {
    const errors = {};
    
    zodError.errors.forEach(error => {
        const path = error.path.join('.');
        const field = path || 'root';
        
        if (!errors[field]) {
            errors[field] = [];
        }
        
        errors[field].push({
            message: error.message,
            code: error.code,
            received: error.received,
            expected: error.expected
        });
    });
    
    return errors;
}

/**
 * Sanitize and validate file uploads
 * @param {Object} options - Upload validation options
 * @returns {Function} Express middleware function
 */
function validateFileUpload(options = {}) {
    const {
        maxSize = 50 * 1024 * 1024, // 50MB default
        allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        maxFiles = 1
    } = options;
    
    return (req, res, next) => {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new CustomError('No files uploaded', 400);
            }
            
            const files = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
            
            if (files.length > maxFiles) {
                throw new CustomError(`Maximum ${maxFiles} files allowed`, 400);
            }
            
            files.forEach((file, index) => {
                // Validate file size
                if (file.size > maxSize) {
                    throw new CustomError(`File ${index + 1} exceeds maximum size of ${maxSize} bytes`, 400);
                }
                
                // Validate MIME type
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    throw new CustomError(`File ${index + 1} has invalid type. Allowed: ${allowedMimeTypes.join(', ')}`, 400);
                }
                
                // Sanitize filename
                file.name = file.name.replace(/[^a-zA-Z0-9._-]/g, '').substring(0, 255);
                
                if (!file.name) {
                    throw new CustomError(`File ${index + 1} has invalid filename`, 400);
                }
            });
            
            next();
        } catch (error) {
            if (error instanceof CustomError) {
                next(error);
            } else {
                console.error('🚨 File upload validation error:', error);
                next(new CustomError('File validation error', 500));
            }
        }
    };
}

/**
 * Rate limiting validation (additional layer)
 * @param {Object} options - Rate limiting options
 * @returns {Function} Express middleware function
 */
function validateRateLimit(options = {}) {
    const {
        maxRequests = 100,
        windowMs = 15 * 60 * 1000, // 15 minutes
        skipSuccessful = false
    } = options;
    
    const requests = new Map();
    
    return (req, res, next) => {
        const key = req.ip;
        const now = Date.now();
        
        // Clean old entries
        for (const [ip, data] of requests.entries()) {
            if (now - data.firstRequest > windowMs) {
                requests.delete(ip);
            }
        }
        
        // Check current IP
        if (!requests.has(key)) {
            requests.set(key, {
                count: 1,
                firstRequest: now
            });
        } else {
            const data = requests.get(key);
            data.count++;
            
            if (data.count > maxRequests) {
                throw new CustomError('Too many requests', 429);
            }
        }
        
        next();
    };
}

module.exports = {
    validateRequest,
    validateBody,
    validateQuery,
    validateParams,
    validateMultiple,
    validateFileUpload,
    validateRateLimit,
    formatZodErrors
};
