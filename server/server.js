// 🚀 STARTUP DEBUGGING: Server initialization begins
console.log('🚀 Starting KUTT Homepage Server...');
console.log('📊 Environment:', process.env.NODE_ENV || 'development');
console.log('🔌 Target Port:', process.env.PORT || 3000);
console.log('⏰ Startup Time:', new Date().toISOString());

console.log('✅ Step 1: Loading environment configuration...');
const env = require("./env");
console.log('✅ Environment configuration loaded successfully');
console.log('📊 Final Port Configuration:', env.PORT);

console.log('✅ Step 2: Setting up global error handlers...');
// CRITICAL FIX: Global error handlers to prevent server crashes from Redis issues
process.on('unhandledRejection', (reason, promise) => {
    console.error('🚨 Unhandled Promise Rejection:', reason);

    // Don't crash for Redis-related errors
    if (reason && reason.message) {
        if (reason.message.includes('Redis') ||
            reason.message.includes('Stream isn\'t writeable') ||
            reason.message.includes('ECONNREFUSED') ||
            reason.message.includes('rate-limit-redis')) {
            console.warn('⚠️ Redis-related error handled gracefully, continuing...');
            return;
        }
    }

    // For other critical errors, log and continue (don't crash in production)
    if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️ Production error handled, continuing...');
        return;
    }
});

process.on('uncaughtException', (error) => {
    console.error('🚨 Uncaught Exception:', error);

    // Don't crash for Redis-related errors
    if (error.message && (
        error.message.includes('Redis') ||
        error.message.includes('Stream isn\'t writeable') ||
        error.message.includes('ECONNREFUSED') ||
        error.message.includes('rate-limit-redis'))) {
        console.warn('⚠️ Redis-related uncaught exception handled gracefully, continuing...');
        return;
    }

    // For other critical errors in production, log and continue
    if (process.env.NODE_ENV === 'production') {
        console.warn('⚠️ Production uncaught exception handled, continuing...');
        return;
    }

    // In development, crash for debugging
    console.error('💥 Uncaught exception in development mode');
    process.exit(1);
});

console.log('✅ Step 3: Loading core dependencies...');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const path = require("node:path");
const fs = require("node:fs");
const mime = require("mime-types");
const hbs = require("hbs");

// CROSS-DOMAIN API INTEGRATION: Proxy middleware for dashboard API
const { createProxyMiddleware } = require('http-proxy-middleware');
console.log('✅ Core dependencies loaded successfully');

console.log('✅ Step 4: Loading services and middleware...');
// Session store service
const sessionStore = require("./services/session/session-store.service");
const sessionSecurity = require("./services/session/session-security.service");

// Security middleware
const securityHeaders = require("./middleware/security-headers.middleware");
const secureErrorHandler = require("./middleware/secure-error-handler.middleware");
const databaseSecurity = require("./middleware/database-security.middleware");
const { securityMonitor } = require("./middleware/security-monitoring.middleware");
console.log('✅ Services and middleware loaded successfully');

console.log('✅ Step 5: Loading handlers and utilities...');
const helpers = require("./handlers/helpers.handler");
const renders = require("./handlers/renders.handler");
const asyncHandler = require("./utils/asyncHandler");
const locals = require("./handlers/locals.handler");
const links = require("./handlers/links.handler");
console.log('✅ Handlers and utilities loaded successfully');

console.log('✅ Step 6: Loading routes and utilities...');
// Force clear all route-related module cache
console.log('🔄 Clearing route module cache...');
Object.keys(require.cache).forEach(key => {
    if (key.includes('routes') || key.includes('analytics')) {
        delete require.cache[key];
        console.log('🗑️ Cleared cache for:', key);
    }
});

console.log('🔥🔥🔥 ABOUT TO LOAD ROUTES FROM SERVER.JS!');

// CRITICAL FIX: Add comprehensive error handling for route loading
try {
    const routes = require("./routes");
    console.log('🔥🔥🔥 ROUTES LOADED! Type:', typeof routes);
    console.log('✅ Routes loaded fresh at:', new Date().toISOString());

    // Validate route structure
    if (!routes || typeof routes !== 'object') {
        throw new Error('Routes object is invalid');
    }

    if (!routes.api || !routes.render) {
        throw new Error('Required route modules (api, render) are missing');
    }

    console.log('✅ Route structure validation passed');

    // Export routes for use later in the file
    global.appRoutes = routes;

} catch (error) {
    console.error('🚨 CRITICAL ERROR loading routes:', error);
    console.error('Stack trace:', error.stack);

    // If this is a path-to-regexp error, provide specific guidance
    if (error.message && error.message.includes('Missing parameter name')) {
        console.error('🔍 PATH-TO-REGEXP ERROR DETECTED:');
        console.error('   This error occurs when a route has a malformed parameter pattern');
        console.error('   Look for routes with empty parameters like ":" or ":)"');
        const positionMatch = error.message.match(/at (\d+)/);
        const position = positionMatch ? positionMatch[1] : 'unknown';
        console.error('   Error position:', position);
    }

    // Exit the process to prevent further issues
    process.exit(1);
}
const utils = require("./utils");
const { initializePrivacySystem } = require("./middleware/privacy.middleware");
const performance = require("./middleware/performance.middleware");
const imageOptimization = require("./middleware/image-optimization.middleware");


// run the cron jobs
// the app might be running in cluster mode (multiple instances) so run the cron job only on one cluster (the first one)
// NODE_APP_INSTANCE variable is added by pm2 automatically, if you're using something else to cluster your app, then make sure to set this variable
if (env.NODE_APP_INSTANCE === 0) {
    require("./cron");
}

console.log('✅ Step 7: Initializing passport and Express app...');
// intialize passport authentication library
require("./passport");

// create express app
const app = express();
console.log('✅ Express app created successfully');

// this tells the express app that it's running behind a proxy server
// and thus it should get the IP address from the proxy server
if (env.TRUST_PROXY) {
    app.set("trust proxy", true);
}

// Apply comprehensive security headers
app.use(securityHeaders.createSecurityMiddleware());
app.use(securityHeaders.permissionsPolicyHeaders());
app.use(securityHeaders.developmentSecurityAdjustments());
app.use(securityHeaders.staticAssetHeaders());
app.use(securityHeaders.apiSecurityHeaders());

// Apply origin validation and CORS
app.use(require('./middleware/origin-validation.middleware').corsWithOriginValidation());

// Apply database security
app.use(databaseSecurity.sqlInjectionProtection());

// Enable gzip compression for all responses
app.use(compression({
    // Compress all responses
    filter: (req, res) => {
        // Don't compress responses with this request header
        if (req.headers['x-no-compression']) {
            return false;
        }
        // Use compression filter function
        return compression.filter(req, res);
    },
    // Compression level (1-9, 6 is default)
    level: 6,
    // Minimum response size to compress (in bytes)
    threshold: 1024,
    // Compression window size
    windowBits: 15,
    // Memory level (1-9, 8 is default)
    memLevel: 8
}));

// CRITICAL FIX: Pre-compressed file serving middleware with route safety
// This middleware was causing path-to-regexp errors by modifying req.url
app.use((req, res, next) => {
    const acceptEncoding = req.headers['accept-encoding'] || '';

    // Only handle static asset requests - be more specific to avoid route conflicts
    if (req.url.match(/\.(js|css|html|json|xml|txt)$/) &&
        (req.url.startsWith('/dist/') || req.url.startsWith('/assets/') || req.url.startsWith('/static/'))) {

        // Store original URL to prevent route parsing issues
        const originalUrl = req.url;

        // Check for Brotli support first (better compression)
        if (acceptEncoding.includes('br')) {
            const brPath = originalUrl + '.br';
            const fs = require('fs');
            const path = require('path');
            const fullBrPath = path.join(__dirname, '../dist', brPath.substring(1));

            if (fs.existsSync(fullBrPath)) {
                req.url = brPath;
                res.set('Content-Encoding', 'br');
                res.set('Vary', 'Accept-Encoding');

                // CRITICAL: Set proper MIME type for pre-compressed files
                if (originalUrl.endsWith('.css')) {
                    res.set('Content-Type', 'text/css; charset=utf-8');
                } else if (originalUrl.endsWith('.js')) {
                    res.set('Content-Type', 'application/javascript; charset=utf-8');
                }
                console.log(`🗜️ Serving Brotli: ${originalUrl} -> ${brPath}`);
            }
        }
        // Fallback to Gzip if Brotli not supported or file doesn't exist
        else if (acceptEncoding.includes('gzip')) {
            const gzPath = originalUrl + '.gz';
            const fs = require('fs');
            const path = require('path');
            const fullGzPath = path.join(__dirname, '../dist', gzPath.substring(1));

            if (fs.existsSync(fullGzPath)) {
                req.url = gzPath;
                res.set('Content-Encoding', 'gzip');
                res.set('Vary', 'Accept-Encoding');

                // CRITICAL: Set proper MIME type for pre-compressed files
                if (originalUrl.endsWith('.css')) {
                    res.set('Content-Type', 'text/css; charset=utf-8');
                } else if (originalUrl.endsWith('.js')) {
                    res.set('Content-Type', 'application/javascript; charset=utf-8');
                }
                console.log(`🗜️ Serving Gzip: ${originalUrl} -> ${gzPath}`);
            }
        }
    }

    next();
});

// Add performance optimization middleware
app.use(performance.performanceHeaders());
app.use(performance.compressionOptimization());
app.use(performance.resourceHints());
app.use(performance.coreWebVitalsOptimization());

// Add image optimization middleware
app.use(imageOptimization.imageStatsMiddleware());
app.use(imageOptimization.enhanceLazyLoading());

app.use(cookieParser());

// Production-ready session configuration with Redis store
app.use(session(sessionStore.getSessionConfig()));

// Request counter for tracking
let requestCounter = 0;

// Logging configuration
const LOG_LEVELS = {
    MINIMAL: 1, // Only webhook requests and errors
    NORMAL: 2, // Standard logging (default)
    VERBOSE: 3, // Detailed debugging
    DEBUG: 4 // Full debugging with all headers
};

const CURRENT_LOG_LEVEL = process.env.LOG_LEVEL ?
    LOG_LEVELS[process.env.LOG_LEVEL.toUpperCase()] || LOG_LEVELS.NORMAL :
    LOG_LEVELS.NORMAL;

// Optimized request logging middleware
app.use((req, res, next) => {
    const requestId = Math.random().toString(36).substr(2, 9);
    const requestNumber = ++requestCounter;
    const startTime = Date.now();

    // Add request tracking to request object
    req.requestId = requestId;
    req.requestNumber = requestNumber;
    req.startTime = startTime;

    const isWebhookRequest = req.url.includes('/webhook') || req.url.includes('/api/webhook') ||
        req.url.includes('instagram') || req.url.includes('facebook');

    // Only log webhook requests at MINIMAL level, all requests at NORMAL+
    if (CURRENT_LOG_LEVEL >= LOG_LEVELS.MINIMAL && isWebhookRequest) {
        console.log(`\n🚨 WEBHOOK #${requestNumber} (${requestId}): ${req.method} ${req.url}`);
        console.log(`🚨 IP: ${req.ip} | User-Agent: ${req.headers['user-agent'] && req.headers['user-agent'].substring(0, 50) || 'Unknown'}`);

        // Log webhook-specific headers
        const webhookHeaders = ['x-hub-signature-256', 'x-hub-signature', 'content-type', 'content-length'];
        const relevantHeaders = webhookHeaders.filter(h => req.headers[h]);
        if (relevantHeaders.length > 0) {
            console.log(`🚨 Headers: ${relevantHeaders.map(h => `${h}=${req.headers[h]}`).join(', ')}`);
        }

        if (Object.keys(req.query).length > 0) {
            console.log(`🚨 Query: ${JSON.stringify(req.query)}`);
        }
    } else if (CURRENT_LOG_LEVEL >= LOG_LEVELS.NORMAL && !isWebhookRequest) {
        console.log(`🌐 #${requestNumber}: ${req.method} ${req.url} (${req.ip})`);
    }

    // Log response when it completes
    const originalSend = res.send;
    res.send = function (data) {
        const endTime = Date.now();
        const duration = endTime - startTime;

        if (isWebhookRequest) {
            console.log(`🚨 WEBHOOK RESPONSE #${requestNumber}: ${res.statusCode} [${duration}ms]`);
            if (res.statusCode >= 400 || CURRENT_LOG_LEVEL >= LOG_LEVELS.VERBOSE) {
                console.log(`🚨 Response Data: ${data}`);
            }
        } else if (CURRENT_LOG_LEVEL >= LOG_LEVELS.VERBOSE) {
            console.log(`🌐 Response #${requestNumber}: ${res.statusCode} [${duration}ms]`);
        }

        return originalSend.call(this, data);
    };

    next();
});

// Body parsing middleware - exclude webhook routes to allow raw body capture
app.use((req, res, next) => {
    // Skip body parsing for webhook routes that need raw body access
    if (req.url.includes('/api/webhooks/')) {
        console.log('🔍 Skipping body parsing for webhook route:', req.url);
        return next();
    }

    // Apply normal body parsing for all other routes with increased limit for image uploads and large payloads
    express.json({
        limit: '100mb',
        parameterLimit: 50000 // Increased parameter limit for JSON payloads
    })(req, res, next);
});

app.use((req, res, next) => {
    // Skip URL encoding for webhook routes
    if (req.url.includes('/api/webhooks/')) {
        return next();
    }

    express.urlencoded({
        extended: true,
        limit: '100mb',
        parameterLimit: 50000 // Increased parameter limit for large form data
    })(req, res, next);
});

// Payload size error handling middleware
app.use((error, req, res, next) => {
    if (error && (error.name === 'PayloadTooLargeError' ||
        error.message?.includes('request entity too large'))) {
        console.warn(`⚠️ Payload too large for ${req.method} ${req.url}:`, {
            contentLength: req.headers['content-length'],
            contentType: req.headers['content-type'],
            limit: '100MB'
        });

        return res.status(413).json({
            error: 'Request payload too large',
            message: 'The request payload exceeds the maximum allowed size of 100MB.',
            maxSize: '100MB',
            receivedSize: req.headers['content-length'] ?
                `${Math.round(req.headers['content-length'] / 1024 / 1024)}MB` : 'unknown'
        });
    }
    next(error);
});

// Consolidated MIME type middleware - runs once before all static file serving
app.use((req, res, next) => {
    const ext = path.extname(req.path).toLowerCase();

    // Set MIME types and security headers for all static assets
    switch (ext) {
        case '.css':
            res.set('Content-Type', 'text/css; charset=utf-8');
            res.set('X-Content-Type-Options', 'nosniff');
            break;
        case '.js':
            res.set('Content-Type', 'application/javascript; charset=utf-8');
            res.set('X-Content-Type-Options', 'nosniff');
            break;
        case '.svg':
            res.set('Content-Type', 'image/svg+xml; charset=utf-8');
            break;
        case '.png':
            res.set('Content-Type', 'image/png');
            break;
        case '.jpg':
        case '.jpeg':
            res.set('Content-Type', 'image/jpeg');
            break;
        case '.webp':
            res.set('Content-Type', 'image/webp');
            break;
        case '.woff':
            res.set('Content-Type', 'font/woff');
            break;
        case '.woff2':
            res.set('Content-Type', 'font/woff2');
            break;
        case '.ttf':
            res.set('Content-Type', 'font/ttf');
            break;
        case '.eot':
            res.set('Content-Type', 'application/vnd.ms-fontobject');
            break;
    }

    next();
});

// serve static files with optimized caching headers
// Note: API image routes are handled in routes.js under /api/images
// Static routes moved after API routes to prevent conflicts

// Serve uploaded files (OG images, etc.)
app.use("/uploads", express.static("uploads", {
    setHeaders: (res, path) => {
        // Uploads: Cache for 1 day (shorter cache for user uploads)
        const oneDay = 24 * 60 * 60; // 1 day in seconds
        const expiresDate = new Date(Date.now() + oneDay * 1000).toUTCString();

        res.setHeader('Cache-Control', `public, max-age=${oneDay}, immutable`);
        res.setHeader('Expires', expiresDate);
    }
}));

app.use("/css", express.static("custom/css", {
    extensions: ["css"],
    setHeaders: (res, path) => {
        // Set correct MIME type for CSS files
        res.set('Content-Type', 'text/css; charset=utf-8');

        // CSS: Cache for 1 month
        const oneMonth = 30 * 24 * 60 * 60; // 1 month in seconds
        const expiresDate = new Date(Date.now() + oneMonth * 1000).toUTCString();

        res.set({
            'Cache-Control': 'public, max-age=' + oneMonth,
            'Expires': expiresDate,
            'Last-Modified': new Date().toUTCString()
        });
    }
}));

// MIME type handling now consolidated above - removed redundant middleware

// MIME type handling integrated into express.static setHeaders configuration
// Consolidated MIME type processing for better performance


// CRITICAL FIX: Static middleware with root path exclusion for dynamic SEO meta tags
// The reactHomepage handler (in renders.routes.js) injects per-request SEO
// meta tags pulled from the admin dashboard's multi-tenant seo_settings row
// for the requesting public domain. If express.static serves dist/index.html
// directly for "/" the SSR handler never runs and Google indexes a page with
// no <meta name="description">, no canonical, and no OG tags. So skip static
// for "/" and "/index.html" only — every other path still falls through to
// the static layer (and `fallthrough: true` then lets unmatched paths reach
// the SPA route handlers below). req.path strips the query string, so
// Instagram-tagged URLs like "/?fbclid=..." are still caught here and routed
// to reactHomepage, which has its own in-app browser detection.
app.use((req, res, next) => {
    if (req.path === '/' || req.path === '/index.html') {
        return next();
    }
    express.static("dist", {
        index: 'index.html',
        dotfiles: 'ignore',
        etag: true,
        extensions: false,
        fallthrough: true,
        // Per-file Cache-Control set in setHeaders so content-hashed assets
        // can be immutable while sw.js / index.html stay revalidated.
        // Leaving global maxAge/immutable off forces our setHeaders to win.
        lastModified: true,
        redirect: true,
        setHeaders: (res, filePath) => {
            // CRITICAL: Set proper MIME types to fix mobile browser issues
            if (filePath.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css; charset=utf-8');
            } else if (filePath.endsWith('.js')) {
                res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            } else if (filePath.endsWith('.svg')) {
                res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
            } else if (filePath.endsWith('.png')) {
                res.setHeader('Content-Type', 'image/png');
            } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
                res.setHeader('Content-Type', 'image/jpeg');
            } else if (filePath.endsWith('.webp')) {
                res.setHeader('Content-Type', 'image/webp');
            } else if (filePath.endsWith('.woff')) {
                res.setHeader('Content-Type', 'font/woff');
            } else if (filePath.endsWith('.woff2')) {
                res.setHeader('Content-Type', 'font/woff2');
            }

            // Cache policy by file class. Vite content-hashes everything in
            // /assets/ (`FigmaMobile-HkSPrLY-.js`), so those can be immutable;
            // sw.js and index.html must stay revalidated to ship updates.
            const fp = filePath.replace(/\\/g, '/');
            if (fp.includes('/dist/assets/')) {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            } else if (fp.endsWith('/sw.js')) {
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            } else if (fp.endsWith('/index.html')) {
                res.setHeader('Cache-Control', 'public, max-age=300, must-revalidate');
            } else {
                res.setHeader('Cache-Control', 'public, max-age=86400');
            }

            // Set security headers
            res.setHeader('X-Content-Type-Options', 'nosniff');
        }
    })(req, res, next);
});

// Legacy /react static removed: Vite-only serving


// REMOVED: Legacy /react static route - Vite-only serving to prevent bundle conflicts


// Add image optimization for static images
app.use(imageOptimization.optimizedImageMiddleware());
app.use(express.static("static", {
    index: false, // CRITICAL: Prevent serving index.html to allow dynamic SEO meta tags
    setHeaders: (res, path) => {
        // Set correct MIME types first
        if (path.endsWith('.css')) {
            res.set('Content-Type', 'text/css; charset=utf-8');
        } else if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript; charset=utf-8');
        } else if (path.endsWith('.svg')) {
            res.set('Content-Type', 'image/svg+xml; charset=utf-8');
        } else if (path.endsWith('.png')) {
            res.set('Content-Type', 'image/png');
        } else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) {
            res.set('Content-Type', 'image/jpeg');
        } else if (path.endsWith('.webp')) {
            res.set('Content-Type', 'image/webp');
        }

        // Static assets: Different cache times based on file type
        const ext = path.split('.').pop().toLowerCase();
        let maxAge, expiresDate;

        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'ico'].includes(ext)) {
            // Images: Cache for 1 year
            maxAge = 365 * 24 * 60 * 60;
        } else if (['css', 'js'].includes(ext)) {
            // CSS/JS: Cache for 1 month
            maxAge = 30 * 24 * 60 * 60;
        } else if (['woff', 'woff2', 'ttf', 'eot'].includes(ext)) {
            // Fonts: Cache for 1 year
            maxAge = 365 * 24 * 60 * 60;
        } else if (['pdf', 'doc', 'docx'].includes(ext)) {
            // Documents: Cache for 1 week
            maxAge = 7 * 24 * 60 * 60;
        } else {
            // Other files: Cache for 1 day
            maxAge = 24 * 60 * 60;
        }

        expiresDate = new Date(Date.now() + maxAge * 1000).toUTCString();

        res.set({
            'Cache-Control': 'public, max-age=' + maxAge,
            'Expires': expiresDate,
            'Last-Modified': new Date().toUTCString()
        });
    }
}));

// Direct SVG serving for specific logo files
app.get('/B2B_MINI_LOGO.svg', (req, res) => {
    const path = require('path');
    const svgPath = path.join(__dirname, '../static/B2B_MINI_LOGO.svg');
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(svgPath);
});

app.get('/b2b_logo.svg', (req, res) => {
    const path = require('path');
    const svgPath = path.join(__dirname, '../static/b2b_logo.svg');
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(svgPath);
});

// Session security middleware - disabled in development to prevent blocking during testing
if (env.NODE_ENV === 'production') {
    app.use(sessionSecurity.securityMiddleware());
}

app.use(passport.initialize());
app.use(locals.isHTML);
app.use(locals.config);

// template engine / serve html

app.set("view engine", "hbs");
app.set("views", [
    path.join(__dirname, "../custom/views"),
    path.join(__dirname, "views"),
]);
utils.registerHandlebarsHelpers();

// Chrome DevTools well-known route (prevents false security alerts)
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
    res.status(404).json({ error: 'DevTools configuration not available' });
});

// Debug routes (development only, before SPA catch-all)
if (process.env.NODE_ENV === 'development') {
    const totpSetupStore = require('./services/totp-setup-store.service');

    app.get('/debug/session-test', (req, res) => {
        req.session.testData = req.session.testData || 0;
        req.session.testData++;

        res.json({
            success: true,
            sessionId: req.sessionID,
            testData: req.session.testData,
            timestamp: new Date().toISOString()
        });
    });

    app.get('/debug/totp-store/:userId/:secret', async (req, res) => {
        try {
            const { userId, secret } = req.params;

            await totpSetupStore.setTempSecret(req, userId, secret);

            res.json({
                success: true,
                action: 'stored',
                userId,
                secret,
                sessionId: req.sessionID,
                sessionData: {
                    tempTotpSecret: req.session?.tempTotpSecret,
                    tempTotpSecretUserId: req.session?.tempTotpSecretUserId,
                    tempTotpSecretExpiresAt: req.session?.tempTotpSecretExpiresAt
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                sessionId: req.sessionID
            });
        }
    });

    app.get('/debug/totp-consume/:userId', async (req, res) => {
        try {
            const { userId } = req.params;

            const retrievedSecret = await totpSetupStore.consumeTempSecret(req, userId);

            res.json({
                success: true,
                action: 'consumed',
                userId,
                retrievedSecret,
                sessionId: req.sessionID,
                sessionData: {
                    tempTotpSecret: req.session?.tempTotpSecret,
                    tempTotpSecretUserId: req.session?.tempTotpSecretUserId,
                    tempTotpSecretExpiresAt: req.session?.tempTotpSecretExpiresAt
                }
            });
        } catch (error) {
            res.status(500).json({
                error: error.message,
                sessionId: req.sessionID
            });
        }
    });
}

// if is custom domain, redirect to the set homepage
app.use(asyncHandler(links.redirectCustomDomainHomepage));

// Test API endpoint (moved to top for debugging)
app.get("/api/test", (req, res) => {
    res.json({ success: true, message: "Test API endpoint working" });
});

// Test non-API endpoint
app.get("/test-route", (req, res) => {
    res.json({ success: true, message: "Test non-API endpoint working" });
});

// CRITICAL FIX: Add error handling for route registration
try {

    // Add maintenance mode middleware before render routes
    console.log('🔍 Loading maintenance mode middleware...');
    const { maintenanceMiddleware } = require('./middleware/maintenance.middleware');
    const { redirectRulesMiddleware } = require('./middleware/redirect-rules.middleware');
    app.use(maintenanceMiddleware);
    console.log('✅ Maintenance mode middleware loaded successfully');

    // Dashboard-managed URL redirects (slug → destination)
    app.use(redirectRulesMiddleware);

    console.log('🔍 Registering render routes...');
    app.use("/", global.appRoutes.render);
    console.log('✅ Render routes registered successfully');

    console.log('🔍 Registering AI agent access routes...');
    app.use("/api", require("./routes/ai-access.routes"));
    console.log('✅ AI agent access routes registered successfully');

    console.log('🔍 Registering security reporting routes...');
    app.use("/api/security", require("./routes/security.routes"));
    console.log('✅ Security reporting routes registered successfully');

    console.log('🔍 Registering API routes...');
    app.use("/api/v2", global.appRoutes.api);
    app.use("/api", global.appRoutes.api);
    console.log('✅ API routes registered successfully');

    console.log('🔍 Setting up cross-domain API proxy...');
    const dashboardApiUrl = env.NODE_ENV === 'production'
        ? 'https://admin.b2b.click'
        : 'http://localhost:3002';

    if (env.DASHBOARD_PROXY_ENABLED) {
        console.log(`📡 Proxy ENABLED: forwarding API calls to dashboard server: ${dashboardApiUrl}`);

        // Proxy settings endpoints to dashboard API
        app.use('/api/settings', createProxyMiddleware({
            target: dashboardApiUrl,
            changeOrigin: true,
            secure: env.NODE_ENV === 'production',
            timeout: 10000,
            proxyTimeout: 10000,
            onError: (err, req, res) => {
                console.error('🚨 Proxy error for /api/settings:', err.message);
                res.status(500).json({
                    error: 'Dashboard API unavailable',
                    message: 'Unable to connect to dashboard server',
                    timestamp: new Date().toISOString()
                });
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log(`🔄 Proxying: ${req.method} ${req.url} → ${dashboardApiUrl}${req.url}`);
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log(`✅ Proxy response: ${proxyRes.statusCode} for ${req.url}`);
            }
        }));

        // Proxy analytics endpoints to dashboard API (only track endpoint)
        app.use('/api/analytics/track', createProxyMiddleware({
            target: dashboardApiUrl,
            changeOrigin: true,
            secure: env.NODE_ENV === 'production',
            timeout: 10000,
            proxyTimeout: 10000,
            onError: (err, req, res) => {
                console.error('🚨 Proxy error for /api/analytics/track:', err.message);
                res.status(500).json({
                    error: 'Dashboard API unavailable',
                    message: 'Unable to connect to dashboard server',
                    timestamp: new Date().toISOString()
                });
            }
        }));

        // Proxy home-settings endpoints to dashboard API
        app.use('/api/home-settings', createProxyMiddleware({
            target: dashboardApiUrl,
            changeOrigin: true,
            secure: env.NODE_ENV === 'production',
            timeout: 10000,
            proxyTimeout: 10000,
            onError: (err, req, res) => {
                console.error('🚨 Proxy error for /api/home-settings:', err.message);
                res.status(500).json({
                    error: 'Dashboard API unavailable',
                    message: 'Unable to connect to dashboard server',
                    timestamp: new Date().toISOString()
                });
            }
        }));

        // 🛍️ Proxy shop API endpoints to dashboard API (products, checkout, orders)
        app.use('/api/shop', createProxyMiddleware({
            target: dashboardApiUrl,
            changeOrigin: true,
            secure: env.NODE_ENV === 'production',
            timeout: 15000,  // Longer timeout for checkout operations
            proxyTimeout: 15000,
            onError: (err, req, res) => {
                console.error('🚨 Proxy error for /api/shop:', err.message);
                res.status(500).json({
                    error: 'Shop API unavailable',
                    message: 'Unable to connect to shop server',
                    timestamp: new Date().toISOString()
                });
            },
            onProxyReq: (proxyReq, req, res) => {
                console.log(`🛍️ Proxying shop: ${req.method} ${req.url} → ${dashboardApiUrl}${req.url}`);
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log(`✅ Shop proxy response: ${proxyRes.statusCode} for ${req.url}`);
            }
        }));

        console.log('✅ Cross-domain API proxy configured successfully (including shop API)');
    } else {
        console.log('🛑 Proxy DISABLED via DASHBOARD_PROXY_ENABLED=false. Using local /api routes for settings and analytics.');
    }

} catch (error) {
    console.error('🚨 CRITICAL ERROR during route registration:', error);
    console.error('Stack trace:', error.stack);

    // If this is a path-to-regexp error, provide specific guidance
    if (error.message && error.message.includes('Missing parameter name')) {
        console.error('🔍 PATH-TO-REGEXP ERROR DURING ROUTE REGISTRATION:');
        console.error('   This error occurs when Express tries to compile a malformed route pattern');
        console.error('   The route pattern has a colon (:) followed by an invalid parameter name');
        const positionMatch = error.message.match(/at (\d+)/);
        const position = positionMatch ? positionMatch[1] : 'unknown';
        console.error('   Error position:', position);
        console.error('   Check for routes with patterns like ":" or ":)" or ": "');
    }

    // Exit the process to prevent further issues
    process.exit(1);
}

// Note: Dashboard routes removed - using separate React dashboard app

// Static routes (after API routes to prevent conflicts)
// Serve custom images directly without optimization middleware (for uploaded logos, etc.)
// Note: Changed from "/images" to "/custom-images" to avoid conflict with static/images
app.use("/custom-images", express.static("custom/images", {
    setHeaders: (res, path) => {
        try {
            // Images: Cache for 1 year with immutable flag
            const oneYear = 365 * 24 * 60 * 60; // 1 year in seconds
            const expiresDate = new Date(Date.now() + oneYear * 1000).toUTCString();

            res.set({
                'Cache-Control': 'public, max-age=' + oneYear + ', immutable',
                'Expires': expiresDate,
                'Last-Modified': new Date().toUTCString()
            });
        } catch (error) {
            console.error('Error setting image headers:', error);
            // Continue without custom headers
        }
    }
}));

// CRITICAL FIX: Add error handling for catch-all route registration
try {
    console.log('🔍 Registering catch-all short link route: /:id');

    // finally, redirect the short link to the target
    // CRITICAL FIX: Use simple parameter pattern to avoid path-to-regexp errors
    app.get("/:id", (req, res, next) => {
        // Skip asset requests and API requests - let them be handled by other middleware
        if (req.path.startsWith('/assets/') || req.path.startsWith('/js/') || req.path.startsWith('/css/') || req.path.startsWith('/api/')) {
            console.log(`🔍 DEBUG: Skipping /:id route for: ${req.path}`);
            return next();
        }

        // Validate the ID parameter to prevent path-to-regexp errors
        const id = req.params.id;
        if (!id || id.length === 0 || id.length > 100) {
            console.log(`🚨 Invalid ID parameter: ${id}`);
            return next(); // Let 404 handler deal with it
        }

        console.log(`🔍 DEBUG: /:id route called with path=${req.path}, id=${id}`);
        return asyncHandler(links.redirect)(req, res, next);
    });

    console.log('✅ Catch-all short link route registered successfully');
} catch (error) {
    console.error('🚨 CRITICAL ERROR during catch-all route registration:', error);
    console.error('Stack trace:', error.stack);

    // If this is a path-to-regexp error, provide specific guidance
    if (error.message && error.message.includes('Missing parameter name')) {
        console.error('🔍 PATH-TO-REGEXP ERROR IN CATCH-ALL ROUTE:');
        console.error('   This error occurs in the /:id([a-zA-Z0-9_-]+) route pattern');
        const positionMatch = error.message.match(/at (\d+)/);
        const position = positionMatch ? positionMatch[1] : 'unknown';
        console.error('   Error position:', position);
    }

    // Exit the process to prevent further issues
    process.exit(1);
}

// Note: React SPA catch-all removed due to path-to-regexp conflicts
// 404 pages will be handled by the notFoundHandler middleware

// Database error handling
app.use(secureErrorHandler.handleDatabaseError);
app.use(secureErrorHandler.handleRateLimitError);



app.use(secureErrorHandler.notFoundHandler);

// Secure error handling (replaces helpers.error)
app.use(secureErrorHandler.secureErrorHandler);

// Initialize privacy-compliant tracking system
initializePrivacySystem();

// Initialize secure error handling
secureErrorHandler.initializeSecureErrorHandling();

// Initialize database security
databaseSecurity.initializeDatabaseSecurity();

console.log('🎯 Step 8: Starting server on port:', env.PORT);
console.log('🔌 About to bind to PORT environment variable...');
app.listen(env.PORT, () => {
    console.log(`> Ready on http://localhost:${env.PORT}`);
    console.log(`🔍 Optimized logging active | Level: ${process.env.LOG_LEVEL || 'NORMAL'}`);
    console.log(`🔍 Webhook requests will be logged with essential debugging info`);
    console.log(`🔍 Set LOG_LEVEL=VERBOSE for detailed logs, LOG_LEVEL=MINIMAL for webhook-only logs`);

    // Pre-warm the admin-fetch cache so PageSpeed and the first real
    // visitor never see a cold-cache TTFB. We fire these AFTER listen()
    // so the health check can succeed immediately; pre-warm runs in the
    // background and updates the cache when it completes.
    if (env.NODE_ENV === 'production') {
        prewarmAdminFetchCache();
        // Keep the in-process admin cache warm even with ZERO organic
        // traffic, so a low-traffic page never decays into a cold, blocking
        // upstream fetch (which is what made the first visit after an idle
        // gap slow). cachedAdminFetch only actually re-fetches a key once it
        // passes ttlMs, so most ticks are cheap no-ops. Interval is well
        // under ttlMs + staleMs so entries never fall out of the stale window.
        const warmTimer = setInterval(() => {
            prewarmAdminFetchCache().catch(() => {});
        }, 45_000);
        if (typeof warmTimer.unref === 'function') warmTimer.unref();
    }

    // Pre-warm the redirect rules cache so the first IG-bio click after
    // a deploy doesn't block on a cold DB connection (which under
    // parallel IG preview+click bursts can exceed DigitalOcean's edge
    // timeout and surface as a 502 to the user).
    try {
        const { prewarmRedirectsCache } = require('./middleware/redirect-rules.middleware');
        if (typeof prewarmRedirectsCache === 'function') {
            prewarmRedirectsCache();
        }
    } catch (e) {
        console.warn('⚠️ Could not prewarm redirects cache:', e.message);
    }
});

async function prewarmAdminFetchCache() {
    try {
        const { cachedAdminFetch } = require('./utils/admin-fetch-cache.util');
        const { getSiteDomain } = require('./utils/site-domain.util');
        // We have no req here; pass a stub so getSiteDomain falls back to
        // SITE_DOMAIN env or DEFAULT_DOMAIN. The result keys the cache
        // under the same canonical host the request handler will use.
        const host = getSiteDomain({}) || '';
        const dashboardBase = 'https://admin.b2b.click';
        const domQs = host ? `?domain=${encodeURIComponent(host)}` : '';
        const domQsNoCache = host ? `?domain=${encodeURIComponent(host)}&nocache=1` : '';

        const fetchJson = async (url) => {
            const ctrl = new AbortController();
            const t = setTimeout(() => ctrl.abort(), 4000);
            try {
                const res = await fetch(url, {
                    signal: ctrl.signal,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        ...(host ? { 'Origin': `https://${host}` } : {})
                    }
                });
                if (!res.ok) return null;
                return await res.json();
            } catch (_) {
                return null;
            } finally {
                clearTimeout(t);
            }
        };

        const targets = [
            // SEO: hit /seo/fast WITHOUT nocache so the prewarm populates the
            // same key the request handler reads (admin's cached, dedicated-
            // pool ~0.3s path). Must match renders.handler.js's SEO fetch.
            { key: `seo::${host || '__default__'}`, url: `${dashboardBase}/api/settings/seo/fast${domQs}`, ttlMs: 60_000 },
            // These still use nocache=1 to mirror buildAdminFetch in the
            // request handler (per-domain correctness for gallery/homepage).
            { key: `homepage-data::${host || '__default__'}`, url: `${dashboardBase}/api/home-settings/homepage-data${domQsNoCache}`, ttlMs: 30_000 },
            { key: `gallery::${host || '__default__'}`, url: `${dashboardBase}/api/settings/about/gallery/public${domQsNoCache}`, ttlMs: 5 * 60_000 },
        ];

        await Promise.all(targets.map(t =>
            cachedAdminFetch({
                key: t.key,
                ttlMs: t.ttlMs,
                fetcher: () => fetchJson(t.url),
            })
        ));
        console.log(`🔥 Pre-warmed admin-fetch cache for host: ${host}`);
    } catch (e) {
        console.warn('⚠️ Pre-warm failed (server still healthy):', e.message);
    }
}