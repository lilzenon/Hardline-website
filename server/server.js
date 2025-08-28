const env = require("./env");

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

// Session store service
const sessionStore = require("./services/session/session-store.service");
const sessionSecurity = require("./services/session/session-security.service");

// Security middleware
const securityHeaders = require("./middleware/security-headers.middleware");
const secureErrorHandler = require("./middleware/secure-error-handler.middleware");
const databaseSecurity = require("./middleware/database-security.middleware");
const { securityMonitor } = require("./middleware/security-monitoring.middleware");

const helpers = require("./handlers/helpers.handler");
const renders = require("./handlers/renders.handler");
const asyncHandler = require("./utils/asyncHandler");
const locals = require("./handlers/locals.handler");
const links = require("./handlers/links.handler");
// Force clear all route-related module cache
console.log('🔄 Clearing route module cache...');
Object.keys(require.cache).forEach(key => {
    if (key.includes('routes') || key.includes('analytics')) {
        delete require.cache[key];
        console.log('🗑️ Cleared cache for:', key);
    }
});

console.log('🔥🔥🔥 ABOUT TO LOAD ROUTES FROM SERVER.JS!');
const routes = require("./routes");
console.log('🔥🔥🔥 ROUTES LOADED! Type:', typeof routes);
console.log('✅ Routes loaded fresh at:', new Date().toISOString());
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

// intialize passport authentication library
require("./passport");

// create express app
const app = express();

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

// Pre-compressed file serving middleware (serve .gz and .br files if they exist)
app.use((req, res, next) => {
    const acceptEncoding = req.headers['accept-encoding'] || '';

    // Only handle static asset requests
    if (req.url.match(/\.(js|css|html|json|xml|txt)$/)) {
        // Check for Brotli support first (better compression)
        if (acceptEncoding.includes('br')) {
            const brPath = req.url + '.br';
            const fs = require('fs');
            const path = require('path');
            const fullBrPath = path.join(__dirname, '../dist', brPath.substring(1));

            if (fs.existsSync(fullBrPath)) {
                req.url = brPath;
                res.set('Content-Encoding', 'br');
                res.set('Vary', 'Accept-Encoding');

                // CRITICAL: Set proper MIME type for pre-compressed files
                const originalPath = req.url.replace('.br', '');
                if (originalPath.endsWith('.css')) {
                    res.set('Content-Type', 'text/css; charset=utf-8');
                } else if (originalPath.endsWith('.js')) {
                    res.set('Content-Type', 'application/javascript; charset=utf-8');
                }
            }
        }
        // Fallback to Gzip if Brotli not supported or file doesn't exist
        else if (acceptEncoding.includes('gzip')) {
            const gzPath = req.url + '.gz';
            const fs = require('fs');
            const path = require('path');
            const fullGzPath = path.join(__dirname, '../dist', gzPath.substring(1));

            if (fs.existsSync(fullGzPath)) {
                req.url = gzPath;
                res.set('Content-Encoding', 'gzip');
                res.set('Vary', 'Accept-Encoding');

                // CRITICAL: Set proper MIME type for pre-compressed files
                const originalPath = req.url.replace('.gz', '');
                if (originalPath.endsWith('.css')) {
                    res.set('Content-Type', 'text/css; charset=utf-8');
                } else if (originalPath.endsWith('.js')) {
                    res.set('Content-Type', 'application/javascript; charset=utf-8');
                }
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
    res.send = function(data) {
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


// Fallback: Standard express.static for other files (images, fonts, etc.) with proper MIME types
app.use(express.static("dist", {
    index: false,
    dotfiles: 'ignore',
    etag: true,
    extensions: false,
    fallthrough: true,
    immutable: false,
    lastModified: true,
    maxAge: process.env.NODE_ENV === 'production' ? 86400000 : 0, // 1 day in production
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

        // Set security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
    }
}));

// Legacy /react static removed: Vite-only serving


// Restore legacy /react static route as secondary fallback during transition
app.use("/react", express.static("static/react", {
    setHeaders: (res, filePath) => {
        if (env.NODE_ENV === 'production') {
            const oneDay = 24 * 60 * 60;
            const expiresDate = new Date(Date.now() + oneDay * 1000).toUTCString();
            res.set({
                'Cache-Control': 'public, max-age=' + oneDay + ', stale-while-revalidate=86400',
                'Expires': expiresDate,
                'Last-Modified': new Date().toUTCString()
            });
        } else {
            res.set({
                'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
        }
    }
}));


// Add image optimization for static images
app.use(imageOptimization.optimizedImageMiddleware());
app.use(express.static("static", {
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

// render html pages
app.use("/", routes.render);

// AI agent access routes (before other API routes)
app.use("/api", require("./routes/ai-access.routes"));

// Security reporting routes
app.use("/api/security", require("./routes/security.routes"));

// handle api requests
app.use("/api/v2", routes.api);
app.use("/api", routes.api);

// React SPA catch-all routes for dashboard (must come after API routes but before /:id)
const dashboardRoutes = [
    '/dashboard',
    '/events',
    '/users',
    '/sms',
    '/settings',
    '/analytics',
    '/links',
    '/messages',
    '/contacts'
];

dashboardRoutes.forEach(route => {
    app.get(route, (req, res) => {
        console.log(`📱 Serving React SPA for route: ${req.path}`);
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });

    // Handle sub-routes (e.g., /events/123/edit, /settings/seo)
    app.get(`${route}/*`, (req, res) => {
        console.log(`📱 Serving React SPA for sub-route: ${req.path}`);
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
});

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

// finally, redirect the short link to the target
app.get("/:id", (req, res, next) => {
    // Skip asset requests - let them be handled by static middleware
    if (req.path.startsWith('/assets/') || req.path.startsWith('/js/') || req.path.startsWith('/css/')) {
        console.log(`🔍 DEBUG: Skipping /:id route for asset: ${req.path}`);
        return next();
    }

    console.log(`🔍 DEBUG: /:id route called with path=${req.path}, id=${req.params.id}`);
    return asyncHandler(links.redirect)(req, res, next);
});



// Database error handling
app.use(secureErrorHandler.handleDatabaseError);
app.use(secureErrorHandler.handleRateLimitError);

// 404 pages that don't exist
app.use(secureErrorHandler.notFoundHandler);

// Secure error handling (replaces helpers.error)
app.use(secureErrorHandler.secureErrorHandler);

// Initialize privacy-compliant tracking system
initializePrivacySystem();

// Initialize secure error handling
secureErrorHandler.initializeSecureErrorHandling();

// Initialize database security
databaseSecurity.initializeDatabaseSecurity();

app.listen(env.PORT, () => {
    console.log(`> Ready on http://localhost:${env.PORT}`);
    console.log(`🔍 Optimized logging active | Level: ${process.env.LOG_LEVEL || 'NORMAL'}`);
    console.log(`🔍 Webhook requests will be logged with essential debugging info`);
    console.log(`🔍 Set LOG_LEVEL=VERBOSE for detailed logs, LOG_LEVEL=MINIMAL for webhook-only logs`);
    // Force reload for analytics service fix
});