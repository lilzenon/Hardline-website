const { Router } = require("express");
const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const instagramHandler = require("../handlers/instagram-integration.handler");
const smsHandler = require("../handlers/sms-integration.handler");

const router = Router();

// Optimized webhook logging middleware
const webhookLoggingMiddleware = (req, res, next) => {
    // Get log level from environment or default to NORMAL
    const LOG_LEVELS = { MINIMAL: 1, NORMAL: 2, VERBOSE: 3, DEBUG: 4 };
    const logLevel = LOG_LEVELS[process.env.LOG_LEVEL && process.env.LOG_LEVEL.toUpperCase()] || LOG_LEVELS.NORMAL;

    // Only add detailed logging at VERBOSE+ levels, and only if not already logged by global middleware
    if (logLevel >= LOG_LEVELS.VERBOSE) {
        const requestId = req.requestId || 'unknown';
        console.log(`📡 Webhook Route Processing (${requestId})`);

        // Log body for webhook POST requests at VERBOSE level
        if (req.method === 'POST' && req.body && Object.keys(req.body).length > 0) {
            console.log(`📡 Body: ${JSON.stringify(req.body, null, 2)}`);
        }
    }

    next();
};

// Middleware to capture raw body for webhook signature verification
const rawBodyMiddleware = (req, res, next) => {
    if (req.path === '/instagram' && req.method === 'POST') {
        console.log('🔍 Raw body middleware activated for Instagram webhook');

        let rawBody = '';
        req.setEncoding('utf8');

        req.on('data', (chunk) => {
            console.log('🔍 Received chunk:', chunk.length, 'bytes');
            rawBody += chunk;
        });

        req.on('end', () => {
            console.log('🔍 Raw body complete:', rawBody.length, 'bytes');
            req.rawBody = rawBody;
            try {
                req.body = JSON.parse(rawBody);
                console.log('🔍 Body parsed successfully');
            } catch (error) {
                console.error('❌ Error parsing webhook JSON:', error);
                return res.status(400).send('Invalid JSON');
            }
            next();
        });

        req.on('error', (error) => {
            console.error('❌ Error reading webhook body:', error);
            next(error);
        });
    } else {
        console.log('🔍 Raw body middleware skipped for:', req.method, req.path);
        next();
    }
};

/**
 * Instagram Webhook Routes
 * These routes handle webhook verification and incoming webhook events from Instagram
 */

// Debug endpoint - MUST come first to avoid being caught by main route
router.all(
    "/instagram/debug",
    asyncHandler((req, res) => {
        console.log('🔍 DEBUG: Instagram webhook debug endpoint hit');
        console.log('🔍 DEBUG: Method:', req.method);
        console.log('🔍 DEBUG: URL:', req.url);
        console.log('🔍 DEBUG: Original URL:', req.originalUrl);
        console.log('🔍 DEBUG: Headers:', JSON.stringify(req.headers, null, 2));
        console.log('🔍 DEBUG: Query:', JSON.stringify(req.query, null, 2));
        console.log('🔍 DEBUG: Body:', JSON.stringify(req.body, null, 2));
        console.log('🔍 DEBUG: IP:', req.ip);

        res.json({
            success: true,
            message: "Debug endpoint working",
            method: req.method,
            url: req.url,
            originalUrl: req.originalUrl,
            headers: req.headers,
            query: req.query,
            body: req.body,
            ip: req.ip,
            timestamp: new Date().toISOString()
        });
    })
);

// External accessibility test endpoint
router.all(
    "/instagram/external-test",
    asyncHandler((req, res) => {
        console.log('🌐 EXTERNAL TEST: Webhook accessibility test');
        console.log('🌐 Method:', req.method);
        console.log('🌐 IP:', req.ip);
        console.log('🌐 User Agent:', req.headers['user-agent']);
        console.log('🌐 Headers:', JSON.stringify(req.headers, null, 2));
        console.log('🌐 Body:', JSON.stringify(req.body, null, 2));

        res.status(200).json({
            success: true,
            message: "External webhook test successful",
            method: req.method,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            timestamp: new Date().toISOString(),
            note: "This endpoint confirms external accessibility"
        });
    })
);

// Meta webhook URL verification endpoint
router.all(
    "/instagram/meta-test",
    asyncHandler((req, res) => {
        console.log('🚨 META TEST ENDPOINT - Confirms Meta can reach server');

        // Handle both GET (verification) and POST (webhook) requests
        if (req.method === 'GET' && req.query['hub.challenge']) {
            console.log('🚨 Webhook verification request from Meta');
            return res.status(200).send(req.query['hub.challenge']);
        }

        res.status(200).json({
            success: true,
            message: "Meta test endpoint working",
            method: req.method,
            timestamp: new Date().toISOString(),
            note: "If you see this in logs, Meta can reach your server"
        });
    })
);

// Test endpoint - also comes before main route
router.get(
    "/instagram/test",
    asyncHandler((req, res) => {
        console.log('🧪 Instagram webhook test endpoint accessed');
        console.log('🧪 Query params:', req.query);
        console.log('🧪 Headers:', req.headers);
        res.json({
            success: true,
            message: "Instagram webhook endpoint is reachable",
            timestamp: new Date().toISOString(),
            query: req.query,
            headers: req.headers
        });
    })
);

// Instagram webhook verification (GET request)
router.get(
    "/instagram",
    (req, res, next) => {
        console.log('🔍 Instagram Webhook Verification');
        if (req.query['hub.challenge']) {
            console.log('🔍 Challenge token requested');
        }
        next();
    },
    asyncHandler(instagramHandler.verifyInstagramWebhook)
);

// Instagram webhook events (POST request)
router.post(
    "/instagram",
    webhookLoggingMiddleware,
    asyncHandler(instagramHandler.handleInstagramWebhook)
);

/**
 * Facebook Webhook Routes (for future implementation)
 */

// Facebook webhook verification (GET request)
router.get(
    "/facebook",
    asyncHandler((req, res) => {
        // Placeholder for Facebook webhook verification
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        if (mode === 'subscribe' && token === process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN) {
            console.log('✅ Facebook webhook verified');
            res.status(200).send(challenge);
        } else {
            console.error('❌ Facebook webhook verification failed');
            res.status(403).send('Forbidden');
        }
    })
);

// Facebook webhook events (POST request)
router.post(
    "/facebook",
    asyncHandler((req, res) => {
        // Placeholder for Facebook webhook events
        console.log('📨 Facebook webhook received (not implemented yet):', req.body);
        res.status(200).send('OK');
    })
);

/**
 * SMS/Twilio Webhook Routes
 */

// SMS webhook for incoming messages
router.post(
    "/sms",
    // Optional: Add Twilio signature verification middleware
    // smsHandler.verifyTwilioSignature,
    asyncHandler(smsHandler.handleSmsWebhook)
);

/**
 * Test endpoint for webhook debugging
 */
router.get(
    "/test",
    asyncHandler((req, res) => {
        console.log('🧪 Webhook test endpoint accessed');
        console.log('🧪 Query params:', req.query);
        console.log('🧪 Headers:', req.headers);
        res.json({
            success: true,
            message: "Webhook test endpoint working",
            timestamp: new Date().toISOString(),
            query: req.query,
            headers: req.headers
        });
    })
);

/**
 * Debug endpoint to check environment variables
 */
router.get(
    "/debug-env",
    asyncHandler((req, res) => {
        console.log('🔍 Environment debug endpoint accessed');
        res.json({
            success: true,
            message: "Environment variables check",
            timestamp: new Date().toISOString(),
            env_check: {
                facebook_app_id: process.env.FACEBOOK_APP_ID ? 'SET' : 'NOT SET',
                facebook_app_secret: process.env.FACEBOOK_APP_SECRET ? 'SET' : 'NOT SET',
                instagram_webhook_verify_token: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN ? 'SET' : 'NOT SET',
                base_url: process.env.BASE_URL ? 'SET' : 'NOT SET',
                facebook_redirect_uri: process.env.FACEBOOK_REDIRECT_URI ? 'SET' : 'NOT SET',
                // Show first 4 characters of App ID for debugging (if set)
                app_id_preview: process.env.FACEBOOK_APP_ID ? process.env.FACEBOOK_APP_ID.substring(0, 4) + '...' : 'NOT SET'
            }
        });
    })
);

router.post(
    "/test",
    asyncHandler((req, res) => {
        console.log('🧪 Webhook test POST endpoint accessed');
        console.log('🧪 Body:', req.body);
        console.log('🧪 Headers:', req.headers);
        res.json({
            success: true,
            message: "Webhook test POST endpoint working",
            timestamp: new Date().toISOString(),
            body: req.body,
            headers: req.headers
        });
    })
);

/**
 * Generic webhook health check
 */
router.get(
    "/health",
    asyncHandler((req, res) => {
        res.json({
            success: true,
            message: "Webhook endpoints are healthy",
            timestamp: new Date().toISOString(),
            endpoints: {
                instagram: {
                    verification: "/api/webhooks/instagram (GET)",
                    events: "/api/webhooks/instagram (POST)"
                },
                facebook: {
                    verification: "/api/webhooks/facebook (GET)",
                    events: "/api/webhooks/facebook (POST)"
                },
                sms: {
                    events: "/api/webhooks/sms (POST)"
                },
                test: {
                    get: "/api/webhooks/test (GET)",
                    post: "/api/webhooks/test (POST)"
                }
            }
        });
    })
);

// Catch-all route for any unmatched webhook requests
router.all(
    "*",
    webhookLoggingMiddleware,
    asyncHandler((req, res) => {
        console.log('🚨 ===== UNMATCHED WEBHOOK REQUEST =====');
        console.log('🚨 This request hit the webhook router but no specific route');
        console.log('🚨 Method:', req.method);
        console.log('🚨 URL:', req.url);
        console.log('🚨 Original URL:', req.originalUrl);
        console.log('🚨 Path:', req.path);
        console.log('🚨 Base URL:', req.baseUrl);
        console.log('🚨 Available routes in this router:');
        console.log('🚨   GET/POST /instagram');
        console.log('🚨   GET/POST /instagram/debug');
        console.log('🚨   GET/POST /instagram/meta-test');
        console.log('🚨   GET/POST /instagram/external-test');
        console.log('🚨   GET/POST /facebook');
        console.log('🚨   GET/POST /sms');
        console.log('🚨   GET/POST /test');
        console.log('🚨   GET /health');
        console.log('🚨 ====================================');

        res.status(404).json({
            error: "Webhook endpoint not found",
            method: req.method,
            url: req.url,
            availableEndpoints: [
                "GET/POST /api/webhooks/instagram",
                "GET/POST /api/webhooks/instagram/debug",
                "GET/POST /api/webhooks/instagram/meta-test",
                "GET/POST /api/webhooks/facebook",
                "GET/POST /api/webhooks/sms",
                "GET /api/webhooks/health"
            ],
            timestamp: new Date().toISOString()
        });
    })
);

module.exports = router;