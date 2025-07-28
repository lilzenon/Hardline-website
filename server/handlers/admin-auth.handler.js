const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const query = require("../queries");
const utils = require("../utils");
const env = require("../env");
const { CustomError } = require("../utils");

// In-memory store for security events (in production, use Redis or database)
const securityEvents = new Map();
const lockedAccounts = new Map();
const emergencyTokens = new Map();

/**
 * Check if user is already authenticated as admin
 */
async function checkExistingAuth(req, res, next) {
    if (req.user && req.user.role === 'admin') {
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
    <link rel="stylesheet" href="/static/css/tailwind.css">
    <style>
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        .loading { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #FFFFFF; }
    </style>
</head>
<body>
    <div id="admin-login-root" class="loading">Loading...</div>
    <script src="/static/react/bundle.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (window.React && window.ReactDOM && window.AdminLogin) {
                const container = document.getElementById('admin-login-root');
                const root = window.ReactDOM.createRoot(container);
                root.render(React.createElement(window.AdminLogin));
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
          <form action="/api/auth/admin-login" method="POST" style="padding:40px;border:1px solid #ccc;border-radius:8px;">
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

    if (req.user.role !== 'admin') {
        console.log(`🚫 Non-admin user ${req.user.email} attempted admin login`);

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

        // Return success response
        const returnTo = req.body.returnTo || req.session.returnTo || '/dashboard';
        delete req.session.returnTo;

        if (req.isHTML) {
            res.redirect(returnTo);
        } else {
            res.json({
                success: true,
                message: "Admin login successful",
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                redirectTo: returnTo
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
    if (req.user && req.user.role === 'admin') {
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

module.exports = {
    checkExistingAuth,
    renderAdminLogin,
    auditLoginAttempt,
    validateAdminRole,
    adminLogin,
    checkAdminStatus,
    auditLogout,
    adminLogout,
    refreshAdminSession
};