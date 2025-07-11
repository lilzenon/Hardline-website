/**
 * Centralized Logging Utility
 * Provides structured logging with configurable levels for production and development
 */

const LOG_LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
};

const LOG_LEVEL_NAMES = ['ERROR', 'WARN', 'INFO', 'DEBUG'];

// Get log level from environment (default to INFO for production)
const currentLogLevel = LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase()] ?? 
    (process.env.NODE_ENV === 'production' ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG);

/**
 * Format timestamp for logs
 */
function getTimestamp() {
    return new Date().toISOString().substring(11, 23); // HH:mm:ss.SSS
}

/**
 * Format log message with consistent structure
 */
function formatMessage(level, category, message, data = null) {
    const timestamp = getTimestamp();
    const levelName = LOG_LEVEL_NAMES[level].padEnd(5);
    
    let logMessage = `${timestamp} [${levelName}] ${category}: ${message}`;
    
    if (data && typeof data === 'object') {
        // Only show essential data, not full dumps
        if (data.error) {
            logMessage += ` | Error: ${data.error}`;
        }
        if (data.duration) {
            logMessage += ` | Duration: ${data.duration}ms`;
        }
        if (data.count !== undefined) {
            logMessage += ` | Count: ${data.count}`;
        }
        if (data.status) {
            logMessage += ` | Status: ${data.status}`;
        }
        if (data.id) {
            logMessage += ` | ID: ${data.id}`;
        }
    }
    
    return logMessage;
}

/**
 * Core logging function
 */
function log(level, category, message, data = null) {
    if (level <= currentLogLevel) {
        const formattedMessage = formatMessage(level, category, message, data);
        
        if (level === LOG_LEVELS.ERROR) {
            console.error(formattedMessage);
        } else if (level === LOG_LEVELS.WARN) {
            console.warn(formattedMessage);
        } else {
            console.log(formattedMessage);
        }
    }
}

/**
 * Instagram-specific logging functions
 */
const instagram = {
    // Essential production logs
    dmSent: (recipientId, keyword, duration) => {
        log(LOG_LEVELS.INFO, 'INSTAGRAM', `DM sent successfully`, {
            id: recipientId,
            keyword,
            duration
        });
    },
    
    keywordMatch: (keyword, messageText, accountId) => {
        log(LOG_LEVELS.INFO, 'INSTAGRAM', `Keyword matched: "${keyword}"`, {
            message: messageText.substring(0, 20) + '...',
            account: accountId
        });
    },
    
    webhookReceived: (type, isEcho, messageText) => {
        if (!isEcho) {
            log(LOG_LEVELS.INFO, 'INSTAGRAM', `Message received: "${messageText?.substring(0, 30) || 'N/A'}..."`);
        } else {
            log(LOG_LEVELS.DEBUG, 'INSTAGRAM', 'Echo message skipped');
        }
    },
    
    authSuccess: (username, accountType) => {
        log(LOG_LEVELS.INFO, 'INSTAGRAM', `Account connected: @${username}`, {
            type: accountType
        });
    },
    
    // Error logs
    dmFailed: (error, recipientId) => {
        log(LOG_LEVELS.ERROR, 'INSTAGRAM', `DM send failed`, {
            error: error.message,
            id: recipientId
        });
    },
    
    webhookError: (error, requestId) => {
        log(LOG_LEVELS.ERROR, 'INSTAGRAM', `Webhook processing failed`, {
            error: error.message,
            id: requestId
        });
    },
    
    authFailed: (error, userId) => {
        log(LOG_LEVELS.ERROR, 'INSTAGRAM', `Authentication failed`, {
            error: error.message,
            user: userId
        });
    },
    
    // Debug logs (only in development or when DEBUG level enabled)
    tokenDebug: (tokenType, pageId) => {
        log(LOG_LEVELS.DEBUG, 'INSTAGRAM', `Using ${tokenType}`, {
            page: pageId
        });
    },
    
    signatureVerified: (secretType) => {
        log(LOG_LEVELS.DEBUG, 'INSTAGRAM', `Signature verified with ${secretType}`);
    },
    
    processingMessage: (accountId, messageId) => {
        log(LOG_LEVELS.DEBUG, 'INSTAGRAM', `Processing message`, {
            account: accountId,
            id: messageId?.substring(0, 20) + '...'
        });
    }
};

/**
 * General system logging
 */
const system = {
    startup: (service, port) => {
        log(LOG_LEVELS.INFO, 'SYSTEM', `${service} started`, { port });
    },
    
    shutdown: (service) => {
        log(LOG_LEVELS.INFO, 'SYSTEM', `${service} shutting down`);
    },
    
    error: (component, error) => {
        log(LOG_LEVELS.ERROR, 'SYSTEM', `${component} error`, {
            error: error.message
        });
    },
    
    performance: (operation, duration, count) => {
        log(LOG_LEVELS.INFO, 'SYSTEM', `${operation} completed`, {
            duration,
            count
        });
    }
};

/**
 * Webhook logging
 */
const webhook = {
    received: (endpoint, method, ip, duration) => {
        log(LOG_LEVELS.INFO, 'WEBHOOK', `${method} ${endpoint}`, {
            ip: ip?.substring(0, 12) + '...',
            duration
        });
    },
    
    error: (endpoint, error, statusCode) => {
        log(LOG_LEVELS.ERROR, 'WEBHOOK', `${endpoint} failed`, {
            error: error.message,
            status: statusCode
        });
    },
    
    signatureVerified: (endpoint) => {
        log(LOG_LEVELS.DEBUG, 'WEBHOOK', `${endpoint} signature verified`);
    }
};

/**
 * Database logging
 */
const database = {
    connected: () => {
        log(LOG_LEVELS.INFO, 'DATABASE', 'Connected successfully');
    },
    
    error: (operation, error) => {
        log(LOG_LEVELS.ERROR, 'DATABASE', `${operation} failed`, {
            error: error.message
        });
    },
    
    query: (operation, duration, rowCount) => {
        log(LOG_LEVELS.DEBUG, 'DATABASE', `${operation}`, {
            duration,
            count: rowCount
        });
    }
};

module.exports = {
    LOG_LEVELS,
    currentLogLevel,
    instagram,
    system,
    webhook,
    database,
    // Direct logging functions for custom use
    error: (category, message, data) => log(LOG_LEVELS.ERROR, category, message, data),
    warn: (category, message, data) => log(LOG_LEVELS.WARN, category, message, data),
    info: (category, message, data) => log(LOG_LEVELS.INFO, category, message, data),
    debug: (category, message, data) => log(LOG_LEVELS.DEBUG, category, message, data)
};
