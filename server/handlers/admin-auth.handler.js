const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const query = require("../queries");
const utils = require("../utils");
const env = require("../env");
const { CustomError } = require("../utils");
const { ROLES } = require("../consts");
const TOTPService = require("../services/totp.service");
const { securityMonitor } = require("../middleware/security-monitoring.middleware");

// In-memory store for security events (in production, use Redis or database)
const securityEvents = new Map();
const lockedAccounts = new Map();
const emergencyTokens = new Map();

/**
 * Check if user is already authenticated as admin
 */
async function checkExistingAuth(req, res, next) {
    if (req.user && utils.isAdmin(req.user)) {
        const returnTo = req.query.returnTo || '/dashboard';
        return res.redirect(returnTo);
    }
    next();
}

/**
 * Render the React-based admin login page
 */
async function renderAdminLogin(req, res) {
    try {
        // Add cache-busting headers for security
        res.set({
            'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Last-Modified': new Date().toUTCString(),
            'ETag': Date.now().toString()
        });

        // Check if this is an API request
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
            return res.json({
                message: "Admin login page",
                csrfToken: req.csrfToken ? req.csrfToken() : null
            });
        }

        // Serve the React admin login page (similar to homepage)
        const path = require('path');
        const reactIndexPath = path.join(__dirname, '../../static/react/admin-login.html');

        // Check if React admin login file exists, otherwise create it
        const fs = require('fs');
        if (!fs.existsSync(reactIndexPath)) {
            // Create the admin login HTML file
            const adminLoginHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Secure Admin Login - BOUNCE2BOUNCE</title>
    <link rel="stylesheet" href="/css/tailwind.css">
    <style>
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        .loading { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #FFFFFF; }
    </style>
</head>
<body>
    <div id="admin-login-root" class="loading">Loading...</div>
    <script src="/react/bundle.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (window.React && window.ReactDOM && window.AdminLogin) {
                const container = document.getElementById('admin-login-root');

                // Try modern createRoot first, fallback to legacy render
                try {
                    if (window.ReactDOM.createRoot) {
                        const root = window.ReactDOM.createRoot(container);
                        root.render(React.createElement(window.AdminLogin));
                    } else {
                        // Fallback to legacy ReactDOM.render
                        window.ReactDOM.render(React.createElement(window.AdminLogin), container);
                    }
                } catch (error) {
                    console.error('React rendering error:', error);
                    // Final fallback to legacy render
                    window.ReactDOM.render(React.createElement(window.AdminLogin), container);
                }
            } else {
                console.error('React components not loaded:', {
                    React: !!window.React,
                    ReactDOM: !!window.ReactDOM,
                    AdminLogin: !!window.AdminLogin
                });
                // Show fallback content
                document.getElementById('admin-login-root').innerHTML =
                    '<div style="text-align:center;padding:40px;font-family:Arial;">Loading admin login...</div>';
            }
        });
    </script>
</body>
</html>`;

            // Ensure directory exists
            const dir = path.dirname(reactIndexPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            fs.writeFileSync(reactIndexPath, adminLoginHTML);
        }

        res.sendFile(reactIndexPath);
    } catch (error) {
        console.error('❌ React admin login error:', error);
        // Fallback to basic HTML
        res.send(`
      <!DOCTYPE html>
      <html>
      <head><title>Admin Login</title></head>
      <body>
        <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Arial;">
          <form action="/api/auth/admin/login" method="POST" style="padding:40px;border:1px solid #ccc;border-radius:8px;">
            <h2>Admin Login</h2>
            <div style="margin:20px 0;">
              <input type="email" name="email" placeholder="Email" required style="width:100%;padding:10px;margin:5px 0;">
              <input type="password" name="password" placeholder="Password" required style="width:100%;padding:10px;margin:5px 0;">
              <button type="submit" style="width:100%;padding:10px;background:#151515;color:white;border:none;border-radius:4px;">Login</button>
            </div>
          </form>
        </div>
      </body>
      </html>
    `);
    }
}

/**
 * Audit login attempts for security monitoring
 */
async function auditLoginAttempt(req, res, next) {
    const { email } = req.body;
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'Unknown';
    const timestamp = new Date().toISOString();

    // Log the attempt
    console.log(`🔐 Admin login attempt: ${email} from ${ip} at ${timestamp}`);

    // Store security event
    const eventKey = `${ip}-${email}`;
    if (!securityEvents.has(eventKey)) {
        securityEvents.set(eventKey, []);
    }

    const events = securityEvents.get(eventKey);
    events.push({
        type: 'login_attempt',
        email,
        ip,
        userAgent,
        timestamp,
        success: false // Will be updated on successful login
    });

    // Keep only last 50 events per key
    if (events.length > 50) {
        events.splice(0, events.length - 50);
    }

    // Check for suspicious patterns
    const recentAttempts = events.filter(event =>
        new Date(event.timestamp) > new Date(Date.now() - 15 * 60 * 1000)
    );

    if (recentAttempts.length > 10) {
        console.log(`🚨 Suspicious activity detected for ${email} from ${ip}`);
        throw new CustomError("Suspicious activity detected. Access temporarily restricted.", 429);
    }

    req.auditData = { eventKey, events, ip, userAgent, timestamp };
    next();
}

/**
 * Validate that user has admin role
 */
async function validateAdminRole(req, res, next) {
    if (!req.user) {
        throw new CustomError("Authentication failed.", 401);
    }

    if (!utils.isAdmin(req.user)) {
        console.log(`🚫 Non-admin user ${req.user.email} attempted admin login. Role: ${req.user.role}`);

        // Log security event
        if (req.auditData) {
            const { eventKey, events } = req.auditData;
            events[events.length - 1].type = 'unauthorized_admin_attempt';
            events[events.length - 1].userId = req.user.id;
        }

        throw new CustomError("Access denied. Admin privileges required.", 403);
    }

    // Check if account is locked
    if (lockedAccounts.has(req.user.id)) {
        const lockInfo = lockedAccounts.get(req.user.id);
        if (lockInfo.until > Date.now()) {
            throw new CustomError(`Account temporarily locked until ${new Date(lockInfo.until).toLocaleString()}`, 423);
        } else {
            // Lock expired, remove it
            lockedAccounts.delete(req.user.id);
        }
    }

    next();
}

/**
 * Enhanced admin login with security features
 */
async function adminLogin(req, res) {
    const user = req.user;
    const { auditData } = req;

    try {
        // Check if TOTP is required and user has it enabled
        if (TOTPService.isTOTPRequired() && user.totp_enabled && user.totp_secret) {
            // User has TOTP enabled, require TOTP verification
            console.log(`🔐 Admin ${user.email} requires TOTP verification`);

            return res.json({
                requireTotp: true,
                message: "Please enter your Google Authenticator code"
            });
        }

        // No TOTP required or TOTP already verified, proceed with login
        // Generate JWT token with shorter expiration for admin
        const token = jwt.sign({
                sub: user.id,
                role: user.role,
                type: 'admin_session',
                iat: Math.floor(Date.now() / 1000)
            },
            env.JWT_SECRET, {
                expiresIn: '4h', // Shorter session for admin
                issuer: 'bounce2bounce-admin',
                audience: 'bounce2bounce-dashboard'
            }
        );

        // Set secure cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 4 * 60 * 60 * 1000, // 4 hours
            domain: env.NODE_ENV === "production" ? ".b2b.click" : undefined
        });

        // Update audit log with success
        if (auditData) {
            const { eventKey, events } = auditData;
            events[events.length - 1].success = true;
            events[events.length - 1].userId = user.id;
            events[events.length - 1].sessionId = token.substring(0, 10);
        }

        console.log(`✅ Admin login successful: ${user.email} (ID: ${user.id})`);

        // Log successful admin login for security monitoring
        await securityMonitor.logSecurityEvent('successful_login', {
            message: 'Admin login successful',
            email: user.email,
            userId: user.id,
            userAgent: req.headers['user-agent']
        }, req);

        // Check if user needs to set up TOTP after successful login
        const needsTotpSetup = TOTPService.isTOTPRequired() && (!user.totp_enabled || !user.totp_secret);

        // Return success response
        const returnTo = req.body.returnTo || req.session.returnTo || '/dashboard';
        delete req.session.returnTo;

        if (req.isHTML) {
            if (needsTotpSetup) {
                res.redirect('/admin/setup-totp');
            } else {
                res.redirect(returnTo);
            }
        } else {
            res.json({
                success: true,
                message: "Admin login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                redirectTo: returnTo,
                needsTotpSetup: needsTotpSetup
            });
        }

    } catch (error) {
        console.error(`❌ Admin login error for ${user.email}:`, error);
        throw new CustomError("Login failed. Please try again.", 500);
    }
}

/**
 * Check admin authentication status
 */
async function checkAdminStatus(req, res) {
    if (req.user && utils.isAdmin(req.user)) {
        res.json({
            authenticated: true,
            user: {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role
            }
        });
    } else {
        res.status(401).json({
            authenticated: false,
            message: "Not authenticated as admin"
        });
    }
}

/**
 * Audit logout events
 */
async function auditLogout(req, res, next) {
    const user = req.user;
    const ip = req.ip || req.connection.remoteAddress;
    const timestamp = new Date().toISOString();

    console.log(`🚪 Admin logout: ${user.email} from ${ip} at ${timestamp}`);

    // Store logout event
    const eventKey = `${ip}-${user.email}`;
    if (!securityEvents.has(eventKey)) {
        securityEvents.set(eventKey, []);
    }

    const events = securityEvents.get(eventKey);
    events.push({
        type: 'logout',
        email: user.email,
        userId: user.id,
        ip,
        timestamp
    });

    next();
}

/**
 * Enhanced admin logout
 */
async function adminLogout(req, res) {
    // Clear the JWT cookie
    res.clearCookie("token", {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        domain: env.NODE_ENV === "production" ? ".b2b.click" : undefined
    });

    // Clear session
    if (req.session) {
        req.session.destroy();
    }

    if (req.isHTML) {
        res.redirect("/admin/login");
    } else {
        res.json({
            success: true,
            message: "Logout successful"
        });
    }
}

/**
 * Refresh admin session
 */
async function refreshAdminSession(req, res) {
    const user = req.user;

    // Generate new token
    const token = jwt.sign({
            sub: user.id,
            role: user.role,
            type: 'admin_session',
            iat: Math.floor(Date.now() / 1000)
        },
        env.JWT_SECRET, {
            expiresIn: '4h',
            issuer: 'bounce2bounce-admin',
            audience: 'bounce2bounce-dashboard'
        }
    );

    // Set new cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 4 * 60 * 60 * 1000,
        domain: env.NODE_ENV === "production" ? ".b2b.click" : undefined
    });

    res.json({
        success: true,
        message: "Session refreshed",
        expiresIn: 4 * 60 * 60 * 1000
    });
}

/**
 * Change admin password
 */
async function changeAdminPassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    try {
        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            throw new CustomError("Current password is incorrect.", 400);
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);

        // Update password in database
        await query.user.update({ id: user.id }, { password: hashedPassword });

        console.log(`🔐 Admin password changed: ${user.email}`);

        res.json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error(`❌ Admin password change error for ${user.email}:`, error);
        throw error;
    }
}

/**
 * Get security audit log
 */
async function getSecurityLog(req, res) {
    const user = req.user;
    const { limit = 50, offset = 0 } = req.query;

    try {
        // Get events for this user
        const userEvents = [];
        for (const [key, events] of securityEvents.entries()) {
            const userSpecificEvents = events.filter(event =>
                event.email === user.email || event.userId === user.id
            );
            userEvents.push(...userSpecificEvents);
        }

        // Sort by timestamp (newest first)
        userEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Apply pagination
        const paginatedEvents = userEvents.slice(offset, offset + parseInt(limit));

        res.json({
            success: true,
            data: {
                events: paginatedEvents,
                total: userEvents.length,
                limit: parseInt(limit),
                offset: parseInt(offset)
            }
        });

    } catch (error) {
        console.error(`❌ Security log error for ${user.email}:`, error);
        throw new CustomError("Failed to retrieve security log.", 500);
    }
}

/**
 * Check account lock status
 */
async function checkLockStatus(req, res) {
    const { email } = req.query;

    if (!email) {
        throw new CustomError("Email parameter is required.", 400);
    }

    try {
        // Find user by email
        const user = await query.user.find({ email });
        if (!user) {
            throw new CustomError("User not found.", 404);
        }

        // Check if account is locked
        const lockInfo = lockedAccounts.get(user.id);
        const isLocked = lockInfo && lockInfo.until > Date.now();

        res.json({
            success: true,
            data: {
                isLocked,
                lockedUntil: isLocked ? new Date(lockInfo.until).toISOString() : null,
                reason: isLocked ? lockInfo.reason : null
            }
        });

    } catch (error) {
        console.error(`❌ Lock status check error for ${email}:`, error);
        throw error;
    }
}

/**
 * Emergency unlock admin account
 */
async function emergencyUnlock(req, res) {
    const { token, email } = req.body;

    try {
        // Verify emergency token
        const validToken = emergencyTokens.get(email);
        if (!validToken || validToken.token !== token || validToken.expires < Date.now()) {
            throw new CustomError("Invalid or expired emergency token.", 401);
        }

        // Find user
        const user = await query.user.find({ email });
        if (!user) {
            throw new CustomError("User not found.", 404);
        }

        // Remove lock
        lockedAccounts.delete(user.id);
        emergencyTokens.delete(email);

        console.log(`🔓 Emergency unlock performed for admin: ${email}`);

        res.json({
            success: true,
            message: "Account unlocked successfully"
        });

    } catch (error) {
        console.error(`❌ Emergency unlock error for ${email}:`, error);
        throw error;
    }
}

/**
 * Handle TOTP verification for admin login
 */
async function verifyTOTP(req, res) {
    const { email, totpCode } = req.body;

    try {
        if (!email || !totpCode) {
            return res.status(400).json({
                error: "Email and TOTP code are required"
            });
        }

        if (!TOTPService.isValidTokenFormat(totpCode)) {
            return res.status(400).json({
                error: "Invalid TOTP code format. Please enter a 6-digit code."
            });
        }

        // Find user
        const user = await query.user.find({ email });
        if (!user || !utils.isAdmin(user)) {
            return res.status(403).json({
                error: "Access denied. Admin privileges required."
            });
        }

        // Check if TOTP is enabled for this user
        if (!user.totp_enabled || !user.totp_secret) {
            return res.status(400).json({
                error: "TOTP is not enabled for this account"
            });
        }

        // Check for replay attacks
        if (TOTPService.isTokenRecentlyUsed(user.totp_last_used)) {
            return res.status(429).json({
                error: "TOTP code was recently used. Please wait for a new code."
            });
        }

        // Verify TOTP code
        const isValidToken = TOTPService.verifyToken(totpCode, user.totp_secret);
        if (!isValidToken) {
            console.log(`🚫 Invalid TOTP code for admin ${email}`);
            return res.status(400).json({
                error: "Invalid TOTP code. Please try again."
            });
        }

        // Update last used timestamp
        await query.user.update({ id: user.id }, {
            totp_last_used: utils.dateToUTC(new Date())
        });

        // Generate JWT token
        const token = jwt.sign({
                sub: user.id,
                role: user.role,
                type: 'admin_session',
                iat: Math.floor(Date.now() / 1000)
            },
            env.JWT_SECRET, {
                expiresIn: '4h',
                issuer: 'bounce2bounce-admin',
                audience: 'bounce2bounce-dashboard'
            }
        );

        // Set secure cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 4 * 60 * 60 * 1000, // 4 hours
            domain: env.NODE_ENV === "production" ? ".b2b.click" : undefined
        });

        console.log(`✅ Admin ${email} successfully logged in with TOTP`);

        res.json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error(`❌ TOTP verification error for ${email}:`, error);
        res.status(500).json({
            error: "TOTP verification failed. Please try again."
        });
    }
}

/**
 * Generate TOTP setup data for authenticated admin
 */
async function generateTOTPSetup(req, res) {
    try {
        if (!req.user || !utils.isAdmin(req.user)) {
            return res.status(403).json({
                error: "Access denied. Admin privileges required."
            });
        }

        const user = req.user;

        // Check if TOTP is already enabled
        if (user.totp_enabled && user.totp_secret) {
            return res.status(400).json({
                error: "TOTP is already enabled for this account"
            });
        }

        // Generate TOTP setup data
        const totpSetup = await TOTPService.setupTOTP(user.email);

        // Store temporary secret in session
        req.session.tempTotpSecret = totpSetup.secret;

        console.log(`🔐 Generated TOTP setup for admin ${user.email}`);

        res.json({
            success: true,
            qrCode: totpSetup.qrCode,
            manualEntryKey: totpSetup.manualEntryKey,
            instructions: totpSetup.instructions,
            message: "Scan the QR code with Google Authenticator and enter the code to complete setup"
        });

    } catch (error) {
        console.error(`❌ TOTP setup generation error:`, error);
        res.status(500).json({
            error: "Failed to generate TOTP setup. Please try again."
        });
    }
}

/**
 * Complete TOTP setup for authenticated admin
 */
async function completeTOTPSetup(req, res) {
    const { totpCode } = req.body;

    try {
        if (!req.user || !utils.isAdmin(req.user)) {
            return res.status(403).json({
                error: "Access denied. Admin privileges required."
            });
        }

        if (!totpCode) {
            return res.status(400).json({
                error: "TOTP code is required"
            });
        }

        if (!TOTPService.isValidTokenFormat(totpCode)) {
            return res.status(400).json({
                error: "Invalid TOTP code format. Please enter a 6-digit code."
            });
        }

        const user = req.user;

        // Get the temporary secret from session
        let tempSecret = req.session.tempTotpSecret;
        if (!tempSecret) {
            return res.status(400).json({
                error: "TOTP setup session expired. Please restart setup."
            });
        }

        // Verify the setup code
        const isValidToken = TOTPService.verifyToken(totpCode, tempSecret);
        if (!isValidToken) {
            return res.status(400).json({
                error: "Invalid TOTP code. Please try again."
            });
        }

        // Save TOTP secret to user account
        await query.user.update({ id: user.id }, {
            totp_secret: tempSecret,
            totp_enabled: true,
            totp_setup_at: utils.dateToUTC(new Date())
        });

        // Clear temporary secret from session
        delete req.session.tempTotpSecret;

        console.log(`✅ TOTP setup completed for admin ${user.email}`);

        res.json({
            success: true,
            message: "TOTP setup completed successfully. Two-factor authentication is now enabled."
        });

    } catch (error) {
        console.error(`❌ TOTP setup completion error:`, error);
        res.status(500).json({
            error: "TOTP setup failed. Please try again."
        });
    }
}

module.exports = {
    checkExistingAuth,
    renderAdminLogin,
    auditLoginAttempt,
    validateAdminRole,
    adminLogin,
    checkAdminStatus,
    auditLogout,
    adminLogout,
    refreshAdminSession,
    changeAdminPassword,
    getSecurityLog,
    checkLockStatus,
    emergencyUnlock,
    verifyTOTP,
    generateTOTPSetup,
    completeTOTPSetup
};