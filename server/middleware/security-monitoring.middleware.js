const fs = require('fs').promises;
const path = require('path');
const env = require('../env');

/**
 * Security Monitoring and Logging System
 * Comprehensive security event tracking and alerting
 */

class SecurityMonitor {
    constructor() {
        this.events = new Map();
        this.alerts = new Map();
        this.logPath = path.join(__dirname, '../logs');
        this.securityLogFile = path.join(this.logPath, 'security.log');
        this.alertThresholds = {
            failedLogins: { count: 5, window: 300000 }, // 5 attempts in 5 minutes
            sqlInjection: { count: 3, window: 300000 }, // 3 attempts in 5 minutes
            xssAttempts: { count: 3, window: 300000 }, // 3 attempts in 5 minutes
            suspiciousRequests: { count: 10, window: 600000 }, // 10 requests in 10 minutes
            rateLimitHits: { count: 5, window: 300000 } // 5 rate limit hits in 5 minutes
        };
        
        this.initializeLogging();
    }

    /**
     * Initialize logging directory and files
     */
    async initializeLogging() {
        try {
            await fs.mkdir(this.logPath, { recursive: true });
            console.log('✅ Security logging initialized');
        } catch (error) {
            console.error('🚨 Failed to initialize security logging:', error.message);
        }
    }

    /**
     * Log security event
     * @param {string} eventType - Type of security event
     * @param {Object} eventData - Event data
     * @param {Object} req - Express request object
     */
    async logSecurityEvent(eventType, eventData, req) {
        const event = {
            timestamp: new Date().toISOString(),
            type: eventType,
            severity: this.determineSeverity(eventType),
            data: eventData,
            request: {
                ip: req.ip,
                userAgent: req.headers['user-agent'],
                method: req.method,
                url: req.url,
                referer: req.headers.referer,
                userId: req.user?.id,
                sessionId: req.session?.id
            },
            id: this.generateEventId()
        };

        // Store in memory for real-time monitoring
        this.storeEvent(event);

        // Log to file
        await this.writeToLogFile(event);

        // Check for alert conditions
        this.checkAlertConditions(event);

        // Console logging based on severity
        this.logToConsole(event);
    }

    /**
     * Determine event severity
     * @param {string} eventType - Event type
     * @returns {string} - Severity level
     */
    determineSeverity(eventType) {
        const severityMap = {
            'failed_login': 'medium',
            'successful_login': 'low',
            'sql_injection_attempt': 'high',
            'xss_attempt': 'high',
            'csrf_violation': 'high',
            'rate_limit_exceeded': 'medium',
            'suspicious_request': 'medium',
            'admin_action': 'medium',
            'password_change': 'medium',
            'account_lockout': 'high',
            'session_hijack_attempt': 'critical',
            'privilege_escalation': 'critical',
            'data_breach_attempt': 'critical'
        };

        return severityMap[eventType] || 'low';
    }

    /**
     * Generate unique event ID
     * @returns {string} - Unique event ID
     */
    generateEventId() {
        return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Store event in memory for real-time monitoring
     * @param {Object} event - Security event
     */
    storeEvent(event) {
        const key = `${event.request.ip}_${event.type}`;
        
        if (!this.events.has(key)) {
            this.events.set(key, []);
        }
        
        this.events.get(key).push(event);
        
        // Clean old events (keep last 24 hours)
        const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
        this.events.set(key, 
            this.events.get(key).filter(e => 
                new Date(e.timestamp).getTime() > oneDayAgo
            )
        );
    }

    /**
     * Write event to log file
     * @param {Object} event - Security event
     */
    async writeToLogFile(event) {
        try {
            const logLine = JSON.stringify(event) + '\n';
            await fs.appendFile(this.securityLogFile, logLine);
        } catch (error) {
            console.error('🚨 Failed to write security log:', error.message);
        }
    }

    /**
     * Log to console based on severity
     * @param {Object} event - Security event
     */
    logToConsole(event) {
        const logMessage = `[${event.severity.toUpperCase()}] ${event.type}: ${event.data.message || 'Security event'} (IP: ${event.request.ip})`;
        
        switch (event.severity) {
            case 'critical':
                console.error('🚨', logMessage);
                break;
            case 'high':
                console.error('⚠️', logMessage);
                break;
            case 'medium':
                console.warn('⚠️', logMessage);
                break;
            default:
                console.log('ℹ️', logMessage);
        }
    }

    /**
     * Check for alert conditions
     * @param {Object} event - Security event
     */
    checkAlertConditions(event) {
        const threshold = this.alertThresholds[event.type];
        if (!threshold) return;

        const key = `${event.request.ip}_${event.type}`;
        const events = this.events.get(key) || [];
        
        // Count events within the time window
        const windowStart = Date.now() - threshold.window;
        const recentEvents = events.filter(e => 
            new Date(e.timestamp).getTime() > windowStart
        );

        if (recentEvents.length >= threshold.count) {
            this.triggerAlert(event, recentEvents);
        }
    }

    /**
     * Trigger security alert
     * @param {Object} event - Triggering event
     * @param {Array} recentEvents - Recent events that triggered the alert
     */
    async triggerAlert(event, recentEvents) {
        const alert = {
            id: this.generateEventId(),
            timestamp: new Date().toISOString(),
            type: 'security_alert',
            severity: 'high',
            triggerEvent: event,
            eventCount: recentEvents.length,
            timeWindow: this.alertThresholds[event.type].window,
            ip: event.request.ip,
            userAgent: event.request.userAgent
        };

        // Store alert
        this.alerts.set(alert.id, alert);

        // Log alert
        await this.writeToLogFile(alert);
        
        console.error('🚨 SECURITY ALERT:', {
            type: event.type,
            ip: event.request.ip,
            count: recentEvents.length,
            timeWindow: this.alertThresholds[event.type].window / 1000 + 's'
        });

        // In production, send to external monitoring
        if (env.NODE_ENV === 'production') {
            // TODO: Send to external monitoring service
            // await this.sendToExternalMonitoring(alert);
        }
    }

    /**
     * Get security statistics
     * @param {number} hours - Hours to look back (default: 24)
     * @returns {Object} - Security statistics
     */
    getSecurityStats(hours = 24) {
        const since = Date.now() - (hours * 60 * 60 * 1000);
        const stats = {
            totalEvents: 0,
            eventsByType: {},
            eventsBySeverity: {},
            topIPs: {},
            alerts: Array.from(this.alerts.values()).filter(a => 
                new Date(a.timestamp).getTime() > since
            )
        };

        // Aggregate events
        for (const events of this.events.values()) {
            for (const event of events) {
                if (new Date(event.timestamp).getTime() > since) {
                    stats.totalEvents++;
                    
                    // By type
                    stats.eventsByType[event.type] = 
                        (stats.eventsByType[event.type] || 0) + 1;
                    
                    // By severity
                    stats.eventsBySeverity[event.severity] = 
                        (stats.eventsBySeverity[event.severity] || 0) + 1;
                    
                    // By IP
                    stats.topIPs[event.request.ip] = 
                        (stats.topIPs[event.request.ip] || 0) + 1;
                }
            }
        }

        return stats;
    }

    /**
     * Get events for specific IP
     * @param {string} ip - IP address
     * @param {number} hours - Hours to look back
     * @returns {Array} - Events for the IP
     */
    getEventsForIP(ip, hours = 24) {
        const since = Date.now() - (hours * 60 * 60 * 1000);
        const events = [];

        for (const eventList of this.events.values()) {
            for (const event of eventList) {
                if (event.request.ip === ip && 
                    new Date(event.timestamp).getTime() > since) {
                    events.push(event);
                }
            }
        }

        return events.sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
    }
}

// Create singleton instance
const securityMonitor = new SecurityMonitor();

/**
 * Middleware to log security events
 */
function securityEventLogger(eventType, getData = () => ({})) {
    return async (req, res, next) => {
        try {
            const eventData = typeof getData === 'function' ? getData(req) : getData;
            await securityMonitor.logSecurityEvent(eventType, eventData, req);
        } catch (error) {
            console.error('🚨 Security logging error:', error.message);
        }
        next();
    };
}

/**
 * Middleware to monitor failed login attempts
 */
function monitorFailedLogin() {
    return securityEventLogger('failed_login', (req) => ({
        message: 'Failed login attempt',
        email: req.body?.email,
        reason: 'Invalid credentials'
    }));
}

/**
 * Middleware to monitor successful logins
 */
function monitorSuccessfulLogin() {
    return securityEventLogger('successful_login', (req) => ({
        message: 'Successful login',
        email: req.body?.email,
        userId: req.user?.id
    }));
}

/**
 * Middleware to monitor admin actions
 */
function monitorAdminAction(action) {
    return securityEventLogger('admin_action', (req) => ({
        message: `Admin action: ${action}`,
        action: action,
        userId: req.user?.id,
        targetId: req.params?.id
    }));
}

module.exports = {
    securityMonitor,
    securityEventLogger,
    monitorFailedLogin,
    monitorSuccessfulLogin,
    monitorAdminAction
};
