const { Router } = require("express");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const validators = require("../handlers/validators.handler");
const helpers = require("../handlers/helpers.handler");
const asyncHandler = require("../utils/asyncHandler");
const locals = require("../handlers/locals.handler");
const auth = require("../handlers/auth.handler");
const adminAuth = require("../handlers/admin-auth.handler");
const utils = require("../utils");
const env = require("../env");

const router = Router();

// Enhanced rate limiting for admin login
const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: "Too many login attempts from this IP, please try again after 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Skip successful requests
  skipSuccessfulRequests: true,
  // Custom key generator to include user agent for better tracking
  keyGenerator: (req) => {
    return `${req.ip}-${req.get('User-Agent')}`;
  }
});

// Progressive delay for repeated attempts
const adminLoginSlowDown = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 2, // Allow 2 requests per windowMs without delay
  delayMs: 500, // Add 500ms delay per request after delayAfter
  maxDelayMs: 20000, // Maximum delay of 20 seconds
});

// IP-based blocking for suspicious activity
const suspiciousActivityLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Maximum 20 attempts per hour
  message: {
    error: "Suspicious activity detected. Access temporarily restricted."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Admin Login Page Route
 * Serves the React-based admin login interface
 */
router.get(
  "/admin/login",
  asyncHandler(auth.jwtLoosePage),
  asyncHandler(adminAuth.checkExistingAuth),
  asyncHandler(adminAuth.renderAdminLogin)
);

/**
 * Admin Login API Endpoint
 * Enhanced security with rate limiting, audit logging, and IP tracking
 */
router.post(
  "/admin/login",
  // Security middleware stack
  suspiciousActivityLimiter,
  adminLoginLimiter,
  adminLoginSlowDown,
  
  // Request processing
  locals.viewTemplate("partials/auth/admin_form"),
  validators.adminLogin,
  asyncHandler(helpers.verify),
  
  // Enhanced authentication
  asyncHandler(adminAuth.auditLoginAttempt),
  asyncHandler(auth.local),
  asyncHandler(adminAuth.validateAdminRole),
  asyncHandler(adminAuth.adminLogin)
);

/**
 * Check Admin Authentication Status
 * Used by React component to verify existing authentication
 */
router.get(
  "/check-admin",
  asyncHandler(auth.jwtLoose),
  asyncHandler(adminAuth.checkAdminStatus)
);

/**
 * Admin Logout
 * Enhanced logout with audit logging and session cleanup
 */
router.post(
  "/admin/logout",
  asyncHandler(auth.jwt),
  asyncHandler(adminAuth.auditLogout),
  asyncHandler(adminAuth.adminLogout)
);

/**
 * Admin Session Refresh
 * Refresh JWT token for admin users with extended session
 */
router.post(
  "/admin/refresh",
  asyncHandler(auth.jwt),
  asyncHandler(auth.admin),
  asyncHandler(adminAuth.refreshAdminSession)
);

/**
 * Admin Password Change
 * Enhanced security for admin password changes
 */
router.post(
  "/admin/change-password",
  asyncHandler(auth.jwt),
  asyncHandler(auth.admin),
  validators.changePassword,
  asyncHandler(helpers.verify),
  helpers.rateLimit({ window: 60, limit: 3 }),
  asyncHandler(adminAuth.changeAdminPassword)
);

/**
 * Admin Security Audit Log
 * Get security events for admin account
 */
router.get(
  "/admin/security-log",
  asyncHandler(auth.jwt),
  asyncHandler(auth.admin),
  helpers.parseQuery,
  asyncHandler(adminAuth.getSecurityLog)
);

/**
 * Admin Account Lock Status
 * Check if admin account is locked due to security issues
 */
router.get(
  "/admin/lock-status",
  asyncHandler(adminAuth.checkLockStatus)
);

/**
 * Emergency Admin Unlock
 * Emergency route for unlocking admin accounts (requires special token)
 */
router.post(
  "/admin/emergency-unlock",
  validators.emergencyUnlock,
  asyncHandler(helpers.verify),
  helpers.rateLimit({ window: 60, limit: 1 }),
  asyncHandler(adminAuth.emergencyUnlock)
);

module.exports = router;
