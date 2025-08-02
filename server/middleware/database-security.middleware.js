const knex = require('../knex');
const { CustomError } = require('../utils');

/**
 * Database Security Middleware
 * Provides additional security layers for database operations
 */

/**
 * SQL Injection Detection Patterns
 * Common SQL injection attack patterns to detect and block
 */
const SQL_INJECTION_PATTERNS = [
    // Union-based attacks
    /(\bunion\b.*\bselect\b)|(\bselect\b.*\bunion\b)/i,
    
    // Boolean-based blind attacks
    /(\band\b.*\b1\s*=\s*1)|(\bor\b.*\b1\s*=\s*1)/i,
    /(\band\b.*\b1\s*=\s*2)|(\bor\b.*\b1\s*=\s*2)/i,
    
    // Time-based blind attacks
    /(\bwaitfor\b.*\bdelay\b)|(\bsleep\b\s*\()|(\bbenchmark\b\s*\()/i,
    
    // Error-based attacks
    /(\bextractvalue\b)|(\bupdatexml\b)|(\bexp\b\s*\()/i,
    
    // Stacked queries
    /;\s*(drop|delete|insert|update|create|alter|exec|execute)\b/i,
    
    // Comment-based attacks
    /(\/\*.*\*\/)|(-{2,})|(\#)/,
    
    // Information schema attacks
    /\binformation_schema\b/i,
    
    // System function attacks
    /(\bsystem\b)|(\bshell\b)|(\bexec\b)|(\beval\b)/i,
    
    // Database-specific attacks
    /(\bpg_sleep\b)|(\bpg_read_file\b)|(\bload_file\b)/i
];

/**
 * Detect potential SQL injection attempts
 * @param {string} input - Input string to check
 * @returns {boolean} - True if potential injection detected
 */
function detectSQLInjection(input) {
    if (!input || typeof input !== 'string') {
        return false;
    }
    
    // Normalize input for detection
    const normalizedInput = input.toLowerCase().trim();
    
    // Check against known patterns
    return SQL_INJECTION_PATTERNS.some(pattern => pattern.test(normalizedInput));
}

/**
 * Sanitize database input
 * @param {any} input - Input to sanitize
 * @returns {any} - Sanitized input
 */
function sanitizeDatabaseInput(input) {
    if (typeof input === 'string') {
        // Remove null bytes and control characters
        return input.replace(/\0/g, '').replace(/[\x00-\x1F\x7F]/g, '');
    }
    
    if (Array.isArray(input)) {
        return input.map(sanitizeDatabaseInput);
    }
    
    if (input && typeof input === 'object') {
        const sanitized = {};
        Object.keys(input).forEach(key => {
            sanitized[key] = sanitizeDatabaseInput(input[key]);
        });
        return sanitized;
    }
    
    return input;
}

/**
 * Validate database query parameters
 * @param {Object} params - Query parameters
 * @returns {Object} - Validated parameters
 */
function validateQueryParams(params) {
    const validated = {};
    
    Object.keys(params).forEach(key => {
        const value = params[key];
        
        // Check for SQL injection
        if (typeof value === 'string' && detectSQLInjection(value)) {
            throw new CustomError(`Potential SQL injection detected in parameter: ${key}`, 400);
        }
        
        // Sanitize the value
        validated[key] = sanitizeDatabaseInput(value);
    });
    
    return validated;
}

/**
 * Database query security wrapper
 * @param {Function} queryFn - Query function to wrap
 * @returns {Function} - Wrapped query function
 */
function secureQuery(queryFn) {
    return async function(...args) {
        try {
            // Log query for monitoring (in development)
            if (process.env.NODE_ENV === 'development' && process.env.DB_DEBUG === 'true') {
                console.log('🔍 Executing secure query:', queryFn.toString().substring(0, 100));
            }
            
            // Execute query with timeout
            const result = await Promise.race([
                queryFn.apply(this, args),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Query timeout')), 30000)
                )
            ]);
            
            return result;
        } catch (error) {
            // Log database errors securely
            console.error('🚨 Database query error:', {
                error: error.message,
                code: error.code,
                timestamp: new Date().toISOString()
            });
            
            // Don't expose internal database errors
            if (error.message.includes('timeout')) {
                throw new CustomError('Database operation timed out', 503);
            }
            
            throw new CustomError('Database operation failed', 500);
        }
    };
}

/**
 * Middleware to validate request data for SQL injection
 */
function sqlInjectionProtection() {
    return (req, res, next) => {
        try {
            // Check body parameters
            if (req.body) {
                req.body = validateQueryParams(req.body);
            }
            
            // Check query parameters
            if (req.query) {
                req.query = validateQueryParams(req.query);
            }
            
            // Check route parameters
            if (req.params) {
                req.params = validateQueryParams(req.params);
            }
            
            next();
        } catch (error) {
            console.warn('🚨 SQL injection attempt detected:', {
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                url: req.url,
                method: req.method,
                body: req.body,
                query: req.query,
                params: req.params,
                timestamp: new Date().toISOString()
            });
            
            next(error);
        }
    };
}

/**
 * Database connection health check
 */
async function checkDatabaseHealth() {
    try {
        await knex.raw('SELECT 1');
        return { healthy: true, timestamp: new Date().toISOString() };
    } catch (error) {
        console.error('🚨 Database health check failed:', error.message);
        return { 
            healthy: false, 
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * Database connection monitoring
 */
function monitorDatabaseConnections() {
    setInterval(async () => {
        try {
            const pool = knex.client.pool;
            const stats = {
                used: pool.numUsed(),
                free: pool.numFree(),
                pending: pool.numPendingAcquires(),
                pendingCreates: pool.numPendingCreates(),
                timestamp: new Date().toISOString()
            };
            
            // Log if connection pool is under stress
            if (stats.pending > 5 || stats.used > (pool.max * 0.8)) {
                console.warn('⚠️ Database connection pool under stress:', stats);
            }
            
            // Log stats in development
            if (process.env.NODE_ENV === 'development') {
                console.log('📊 Database connection stats:', stats);
            }
        } catch (error) {
            console.error('🚨 Database monitoring error:', error.message);
        }
    }, 60000); // Check every minute
}

/**
 * Secure database transaction wrapper
 * @param {Function} transactionFn - Transaction function
 * @returns {Promise} - Transaction result
 */
async function secureTransaction(transactionFn) {
    const trx = await knex.transaction();
    
    try {
        // Set transaction timeout
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Transaction timeout')), 30000)
        );
        
        const result = await Promise.race([
            transactionFn(trx),
            timeoutPromise
        ]);
        
        await trx.commit();
        return result;
    } catch (error) {
        await trx.rollback();
        
        console.error('🚨 Database transaction error:', {
            error: error.message,
            timestamp: new Date().toISOString()
        });
        
        if (error.message.includes('timeout')) {
            throw new CustomError('Database transaction timed out', 503);
        }
        
        throw new CustomError('Database transaction failed', 500);
    }
}

/**
 * Initialize database security monitoring
 */
function initializeDatabaseSecurity() {
    // Start connection monitoring
    monitorDatabaseConnections();
    
    // Set up graceful shutdown
    process.on('SIGTERM', async () => {
        console.log('🔄 Gracefully closing database connections...');
        await knex.destroy();
        console.log('✅ Database connections closed');
    });
    
    process.on('SIGINT', async () => {
        console.log('🔄 Gracefully closing database connections...');
        await knex.destroy();
        console.log('✅ Database connections closed');
        process.exit(0);
    });
}

module.exports = {
    detectSQLInjection,
    sanitizeDatabaseInput,
    validateQueryParams,
    secureQuery,
    sqlInjectionProtection,
    checkDatabaseHealth,
    secureTransaction,
    initializeDatabaseSecurity
};
