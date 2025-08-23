const env = require("./env");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const path = require("node:path");
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
const routes = require("./routes");
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

    // Apply normal body parsing for all other routes
    express.json()(req, res, next);
});

app.use((req, res, next) => {
    // Skip URL encoding for webhook routes
    if (req.url.includes('/api/webhooks/')) {
        return next();
    }

    express.urlencoded({ extended: true })(req, res, next);
});

// serve static files with optimized caching headers
// Add image optimization routes
const imageRoutes = require('./routes/images.route');
app.use('/images', imageRoutes);

// Add image optimization middleware for /images route
app.use("/images", imageOptimization.optimizedImageMiddleware());
app.use("/images", express.static("custom/images", {
    setHeaders: (res, path) => {
        // Images: Cache for 1 year with immutable flag
        const oneYear = 365 * 24 * 60 * 60; // 1 year in seconds
        const expiresDate = new Date(Date.now() + oneYear * 1000).toUTCString();

        res.set({
            'Cache-Control': 'public, max-age=' + oneYear + ', immutable',
            'Expires': expiresDate,
            'Last-Modified': new Date().toUTCString()
        });
    }
}));

app.use("/css", express.static("custom/css", {
    extensions: ["css"],
    setHeaders: (res, path) => {
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

// Serve Vite build assets (dist) under root; DO NOT auto-serve dist/index.html at "/"
// We want routing to decide the homepage (HBS by default, SPA opt-in)
app.use(express.static("dist", {
    index: false,
    setHeaders: (res, filePath) => {
        const isAsset = /\\\/(assets|images)\\\//.test(filePath) || /\.(js|css|woff2?|ttf|eot|png|jpg|jpeg|gif|svg|webp|avif)$/i.test(filePath);
        if (env.NODE_ENV === 'production') {
            const maxAge = isAsset ? (365 * 24 * 60 * 60) : (24 * 60 * 60);
            const expiresDate = new Date(Date.now() + maxAge * 1000).toUTCString();
            res.set({
                'Cache-Control': 'public, max-age=' + maxAge + (isAsset ? ', immutable' : ''),
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

// render html pages
app.use("/", routes.render);

// AI agent access routes (before other API routes)
app.use("/api", require("./routes/ai-access.routes"));

// Security reporting routes
app.use("/api/security", require("./routes/security.routes"));

// handle api requests
app.use("/api/v2", routes.api);
app.use("/api", routes.api);

// finally, redirect the short link to the target
app.get("/:id", asyncHandler(links.redirect));



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
});