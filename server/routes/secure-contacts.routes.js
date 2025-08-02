/**
 * 🔒 SECURE CONTACTS API ROUTES
 * 
 * Secure API endpoints for encrypted user information database
 * with comprehensive validation, authorization, and audit logging.
 * 
 * SECURITY FEATURES:
 * - Input validation and sanitization
 * - Role-based access control
 * - Rate limiting for sensitive operations
 * - Comprehensive audit logging
 * - GDPR/CCPA compliance endpoints
 */

const { Router } = require("express");
const rateLimit = require("express-rate-limit");
const { body, param, query, validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const { SecureContactModel, SecurityContext } = require("../models/secure-contact.model");
const { requireAuth } = require("../middleware/auth.middleware");

const router = Router();

// Rate limiting for sensitive operations
const strictRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per windowMs
    message: {
        error: "Too many requests to secure endpoints",
        retryAfter: "15 minutes"
    },
    standardHeaders: true,
    legacyHeaders: false
});

const moderateRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        error: "Too many requests",
        retryAfter: "15 minutes"
    }
});

// Middleware to create security context
const createSecurityContext = (req, res, next) => {
    try {
        const userId = req.user?.id;
        const sessionId = req.sessionID || req.headers['x-session-id'];
        const ipAddress = req.ip || req.connection.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const userRole = req.user?.role || 'user';

        if (!userId) {
            return res.status(401).json({
                error: "Authentication required for secure operations"
            });
        }

        req.securityContext = new SecurityContext(userId, sessionId, ipAddress, userAgent, userRole);
        next();
    } catch (error) {
        console.error('🚨 Security context creation failed:', error);
        res.status(500).json({
            error: "Security context initialization failed"
        });
    }
};

// Validation middleware
const validateContactCreation = [
    body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .isLength({ max: 255 })
        .withMessage('Valid email address required (max 255 characters)'),
    
    body('phone')
        .optional()
        .isMobilePhone('any', { strictMode: false })
        .withMessage('Valid phone number required'),
    
    body('firstName')
        .optional()
        .isLength({ min: 1, max: 100 })
        .matches(/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'\.]+$/)
        .withMessage('First name must be 1-100 characters, letters only'),
    
    body('lastName')
        .optional()
        .isLength({ min: 1, max: 100 })
        .matches(/^[a-zA-ZÀ-ÿĀ-žА-я\s\-'\.]+$/)
        .withMessage('Last name must be 1-100 characters, letters only'),
    
    body('company')
        .optional()
        .isLength({ max: 200 })
        .matches(/^[a-zA-ZÀ-ÿĀ-žА-я0-9\s\-'\.&,()]+$/)
        .withMessage('Company name must be valid business name format'),
    
    body('jobTitle')
        .optional()
        .isLength({ max: 150 })
        .withMessage('Job title must be max 150 characters'),
    
    body('source')
        .optional()
        .isIn(['web_form', 'api', 'import', 'manual', 'social_media'])
        .withMessage('Invalid source type'),
    
    body('customFields')
        .optional()
        .isObject()
        .withMessage('Custom fields must be a valid object'),
    
    body('gdprConsent')
        .isBoolean()
        .withMessage('GDPR consent must be boolean'),
    
    body('gdprLawfulBasis')
        .isIn(['consent', 'contract', 'legal_obligation', 'vital_interests', 'public_task', 'legitimate_interests'])
        .withMessage('Valid GDPR lawful basis required'),
    
    body('accessReason')
        .isLength({ min: 10, max: 200 })
        .withMessage('Access reason must be 10-200 characters')
];

const validateContactUpdate = [
    param('uuid')
        .isUUID()
        .withMessage('Valid UUID required'),
    
    body('updateReason')
        .isLength({ min: 10, max: 200 })
        .withMessage('Update reason must be 10-200 characters'),
    
    // Same validation as creation but all optional
    ...validateContactCreation.slice(0, -2) // Exclude gdpr fields and access reason
];

const validateContactAccess = [
    param('uuid')
        .isUUID()
        .withMessage('Valid UUID required'),
    
    body('accessReason')
        .isLength({ min: 10, max: 200 })
        .withMessage('Access reason must be 10-200 characters explaining why you need this data')
];

// Validation error handler
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: "Validation failed",
            details: errors.array()
        });
    }
    next();
};

/**
 * POST /api/secure/contacts
 * Create a new contact with encrypted PII
 */
router.post("/contacts", 
    strictRateLimit,
    requireAuth,
    createSecurityContext,
    validateContactCreation,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        try {
            const result = await SecureContactModel.createContact(
                req.body,
                req.securityContext,
                req.body.accessReason
            );

            res.status(201).json({
                success: true,
                message: "Contact created successfully",
                data: {
                    contactUuid: result.contactUuid
                }
            });

        } catch (error) {
            console.error('🚨 Secure contact creation error:', error);
            res.status(400).json({
                error: "Contact creation failed",
                message: error.message
            });
        }
    })
);

/**
 * GET /api/secure/contacts/search
 * Search contacts by email (returns non-PII data only)
 */
router.get("/contacts/search",
    moderateRateLimit,
    requireAuth,
    createSecurityContext,
    [
        query('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Valid email address required'),
        query('accessReason')
            .isLength({ min: 10, max: 200 })
            .withMessage('Access reason required (10-200 characters)')
    ],
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        try {
            const result = await SecureContactModel.findContactByEmail(
                req.query.email,
                req.securityContext,
                req.query.accessReason
            );

            res.json({
                success: true,
                data: result.contacts,
                count: result.count
            });

        } catch (error) {
            console.error('🚨 Secure contact search error:', error);
            res.status(400).json({
                error: "Contact search failed",
                message: error.message
            });
        }
    })
);

/**
 * POST /api/secure/contacts/:uuid/details
 * Get contact details with proper authorization
 */
router.post("/contacts/:uuid/details",
    strictRateLimit,
    requireAuth,
    createSecurityContext,
    validateContactAccess,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        try {
            const result = await SecureContactModel.getContactDetails(
                req.params.uuid,
                req.securityContext,
                req.body.accessReason
            );

            res.json({
                success: true,
                data: result.contact
            });

        } catch (error) {
            console.error('🚨 Secure contact retrieval error:', error);
            res.status(403).json({
                error: "Contact access denied",
                message: error.message
            });
        }
    })
);

/**
 * PUT /api/secure/contacts/:uuid
 * Update contact with validation and encryption
 */
router.put("/contacts/:uuid",
    strictRateLimit,
    requireAuth,
    createSecurityContext,
    validateContactUpdate,
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        try {
            const { updateReason, ...updateData } = req.body;
            
            const result = await SecureContactModel.updateContact(
                req.params.uuid,
                updateData,
                req.securityContext,
                updateReason
            );

            res.json({
                success: true,
                message: "Contact updated successfully"
            });

        } catch (error) {
            console.error('🚨 Secure contact update error:', error);
            res.status(400).json({
                error: "Contact update failed",
                message: error.message
            });
        }
    })
);

/**
 * DELETE /api/secure/contacts/:uuid
 * Mark contact for deletion (GDPR right to be forgotten)
 */
router.delete("/contacts/:uuid",
    strictRateLimit,
    requireAuth,
    createSecurityContext,
    [
        param('uuid')
            .isUUID()
            .withMessage('Valid UUID required'),
        body('deletionReason')
            .isLength({ min: 10, max: 200 })
            .withMessage('Deletion reason must be 10-200 characters')
    ],
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        try {
            const result = await SecureContactModel.markForDeletion(
                req.params.uuid,
                req.securityContext,
                req.body.deletionReason
            );

            res.json({
                success: true,
                message: "Contact marked for deletion",
                deletionDate: result.deletionDate
            });

        } catch (error) {
            console.error('🚨 Contact deletion marking error:', error);
            res.status(400).json({
                error: "Deletion marking failed",
                message: error.message
            });
        }
    })
);

/**
 * GET /api/secure/analytics
 * Get analytics data (non-PII only)
 */
router.get("/analytics",
    moderateRateLimit,
    requireAuth,
    createSecurityContext,
    [
        query('accessReason')
            .isLength({ min: 10, max: 200 })
            .withMessage('Access reason required for analytics')
    ],
    handleValidationErrors,
    asyncHandler(async (req, res) => {
        try {
            const result = await SecureContactModel.getAnalytics(
                req.securityContext,
                req.query.accessReason
            );

            res.json({
                success: true,
                data: result.analytics,
                generatedAt: result.generatedAt
            });

        } catch (error) {
            console.error('🚨 Analytics retrieval error:', error);
            res.status(400).json({
                error: "Analytics retrieval failed",
                message: error.message
            });
        }
    })
);

/**
 * GET /api/secure/compliance/report
 * Generate security compliance report (admin/auditor only)
 */
router.get("/compliance/report",
    strictRateLimit,
    requireAuth,
    createSecurityContext,
    asyncHandler(async (req, res) => {
        try {
            // Check role authorization
            if (!['admin', 'auditor'].includes(req.user.role)) {
                return res.status(403).json({
                    error: "Insufficient permissions",
                    message: "Admin or auditor role required"
                });
            }

            const result = await SecureContactModel.getComplianceReport(req.securityContext);

            res.json({
                success: true,
                report: result.report,
                generatedAt: result.generatedAt,
                generatedBy: result.generatedBy
            });

        } catch (error) {
            console.error('🚨 Compliance report error:', error);
            res.status(400).json({
                error: "Compliance report failed",
                message: error.message
            });
        }
    })
);

/**
 * GET /api/secure/security/alerts
 * Detect suspicious activity (admin/auditor only)
 */
router.get("/security/alerts",
    strictRateLimit,
    requireAuth,
    createSecurityContext,
    asyncHandler(async (req, res) => {
        try {
            // Check role authorization
            if (!['admin', 'auditor'].includes(req.user.role)) {
                return res.status(403).json({
                    error: "Insufficient permissions",
                    message: "Admin or auditor role required"
                });
            }

            const result = await SecureContactModel.detectSuspiciousActivity(req.securityContext);

            res.json({
                success: true,
                alerts: result.alerts,
                alertCount: result.alertCount,
                generatedAt: result.generatedAt
            });

        } catch (error) {
            console.error('🚨 Security alerts error:', error);
            res.status(400).json({
                error: "Security analysis failed",
                message: error.message
            });
        }
    })
);

/**
 * GET /api/secure/health
 * Health check for secure database
 */
router.get("/health",
    asyncHandler(async (req, res) => {
        try {
            const result = await SecureContactModel.healthCheck();

            if (result.success) {
                res.json(result);
            } else {
                res.status(503).json(result);
            }

        } catch (error) {
            console.error('🚨 Health check error:', error);
            res.status(503).json({
                success: false,
                error: "Health check failed",
                message: error.message,
                timestamp: new Date()
            });
        }
    })
);

module.exports = router;
