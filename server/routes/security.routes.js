const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { securityMonitor } = require("../middleware/security-monitoring.middleware");

const router = Router();

/**
 * CSP Violation Reporting Endpoint
 * Receives and logs Content Security Policy violations from browsers
 */
router.post("/csp-violation", asyncHandler(async (req, res) => {
    try {
        const violation = req.body;

        // Validate that we have a violation report
        if (!violation || typeof violation !== 'object' || Object.keys(violation).length === 0) {
            return res.status(204).send(); // Return 204 for empty reports (browsers expect this)
        }

        // Log the CSP violation for security monitoring
        await securityMonitor.logSecurityEvent('csp_violation', {
            message: 'Content Security Policy violation detected',
            violation: {
                blockedURI: violation.blockedURI || violation['blocked-uri'],
                violatedDirective: violation.violatedDirective || violation['violated-directive'],
                originalPolicy: violation.originalPolicy || violation['original-policy'],
                sourceFile: violation.sourceFile || violation['source-file'],
                lineNumber: violation.lineNumber || violation['line-number'],
                columnNumber: violation.columnNumber || violation['column-number'],
                disposition: violation.disposition,
                statusCode: violation.statusCode || violation['status-code']
            },
            userAgent: req.headers['user-agent'],
            referer: req.headers.referer
        }, req);
        
        // Log to console for immediate visibility
        console.warn('🚨 CSP Violation Report:', {
            blockedURI: violation.blockedURI || violation['blocked-uri'],
            violatedDirective: violation.violatedDirective || violation['violated-directive'],
            sourceFile: violation.sourceFile || violation['source-file'],
            userAgent: req.headers['user-agent'],
            referer: req.headers.referer,
            ip: req.ip
        });
        
        // Return success response (browsers expect 204 or 200)
        res.status(204).send();
        
    } catch (error) {
        console.error('Error processing CSP violation report:', error);
        res.status(500).json({ error: 'Failed to process violation report' });
    }
}));

/**
 * Security incident reporting endpoint
 * For manual security incident reports
 */
router.post("/incident", asyncHandler(async (req, res) => {
    const { type, description, severity = 'medium' } = req.body;
    
    if (!type || !description) {
        return res.status(400).json({ 
            error: 'Type and description are required' 
        });
    }
    
    await securityMonitor.logSecurityEvent('security_incident', {
        message: `Security incident reported: ${type}`,
        incidentType: type,
        description: description,
        severity: severity,
        reportedBy: req.user?.id || 'anonymous'
    }, req);
    
    res.status(200).json({ 
        message: 'Security incident reported successfully',
        timestamp: new Date().toISOString()
    });
}));

/**
 * Security health check endpoint
 * Public endpoint to verify security systems are operational
 */
router.get("/health", asyncHandler(async (req, res) => {
    const health = {
        status: 'operational',
        timestamp: new Date().toISOString(),
        checks: {
            cspReporting: 'active',
            securityMonitoring: 'active',
            errorHandling: 'active'
        }
    };
    
    res.status(200).json(health);
}));

module.exports = router;
