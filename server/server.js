const env = require("./env");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const helmet = require("helmet");
const path = require("node:path");
const hbs = require("hbs");

// Session store service
const sessionStore = require("./services/session/session-store.service");
const sessionSecurity = require("./services/session/session-security.service");

const helpers = require("./handlers/helpers.handler");
const renders = require("./handlers/renders.handler");
const asyncHandler = require("./utils/asyncHandler");
const locals = require("./handlers/locals.handler");
const links = require("./handlers/links.handler");
const routes = require("./routes");
const utils = require("./utils");
const { initializePrivacySystem } = require("./middleware/privacy.middleware");


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

app.use(helmet({
    contentSecurityPolicy: false,
    frameguard: false // Disable frameguard to allow custom X-Frame-Options handling
}));
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
                console.log(`🚨 IP: ${req.ip} | User-Agent: ${req.headers['user-agent']?.substring(0, 50) || 'Unknown'}`);

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static
app.use("/images", express.static("custom/images"));
app.use("/css", express.static("custom/css", { extensions: ["css"] }));
app.use(express.static("static"));

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

// if is custom domain, redirect to the set homepage
app.use(asyncHandler(links.redirectCustomDomainHomepage));

// render html pages
app.use("/", routes.render);

// handle api requests
app.use("/api/v2", routes.api);
app.use("/api", routes.api);

// finally, redirect the short link to the target
app.get("/:id", asyncHandler(links.redirect));



// 404 pages that don't exist
app.get("*", renders.notFound);

// handle errors coming from above routes
app.use(helpers.error);

// Initialize privacy-compliant tracking system
initializePrivacySystem();

app.listen(env.PORT, () => {
    console.log(`> Ready on http://localhost:${env.PORT}`);
    console.log(`🔍 Optimized logging active | Level: ${process.env.LOG_LEVEL || 'NORMAL'}`);
    console.log(`🔍 Webhook requests will be logged with essential debugging info`);
    console.log(`🔍 Set LOG_LEVEL=VERBOSE for detailed logs, LOG_LEVEL=MINIMAL for webhook-only logs`);
});