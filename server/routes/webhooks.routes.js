const { Router } = require("express");
const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const instagramHandler = require("../handlers/instagram-integration.handler");
const smsHandler = require("../handlers/sms-integration.handler");

const router = Router();

// Middleware to capture raw body for webhook signature verification
const rawBodyMiddleware = (req, res, next) => {
    if (req.path === '/instagram' && req.method === 'POST') {
        let rawBody = '';
        req.setEncoding('utf8');

        req.on('data', (chunk) => {
            rawBody += chunk;
        });

        req.on('end', () => {
            req.rawBody = rawBody;
            try {
                req.body = JSON.parse(rawBody);
            } catch (error) {
                console.error('❌ Error parsing webhook JSON:', error);
                return res.status(400).send('Invalid JSON');
            }
            next();
        });
    } else {
        next();
    }
};

/**
 * Instagram Webhook Routes
 * These routes handle webhook verification and incoming webhook events from Instagram
 */

// Instagram webhook verification (GET request)
router.get(
    "/instagram",
    asyncHandler(instagramHandler.verifyInstagramWebhook)
);

// Instagram webhook events (POST request)
router.post(
    "/instagram",
    rawBodyMiddleware,
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

module.exports = router;