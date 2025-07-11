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

        const chunks = [];

        req.on('data', (chunk) => {
            console.log('🔍 Received chunk:', chunk.length, 'bytes');
            chunks.push(chunk);
        });

        req.on('end', () => {
            const rawBody = Buffer.concat(chunks);
            console.log('🔍 Raw body complete:', rawBody.length, 'bytes');

            // Store both raw buffer and string version
            req.rawBody = rawBody.toString('utf8');
            req.rawBodyBuffer = rawBody;

            try {
                req.body = JSON.parse(req.rawBody);
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

// Simple test route to verify deployment
router.get(
    "/instagram/permissions-test",
    asyncHandler(async(req, res) => {
        res.json({
            success: true,
            message: "Permissions diagnostic route is working!",
            timestamp: new Date().toISOString(),
            note: "This confirms the route is deployed and accessible"
        });
    })
);

// Check app configuration and Instagram accounts
router.get(
    "/instagram/config-check",
    asyncHandler(async(req, res) => {
        const knex = require('../knex');

        // Check environment variables
        const config = {
            facebook_app_id: process.env.FACEBOOK_APP_ID || 'NOT SET',
            facebook_app_secret: process.env.FACEBOOK_APP_SECRET ? 'SET (hidden)' : 'NOT SET',
            facebook_redirect_uri: process.env.FACEBOOK_REDIRECT_URI || 'NOT SET',
            instagram_webhook_verify_token: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN ? 'SET (hidden)' : 'NOT SET'
        };

        // Check Instagram accounts in database
        let accounts = [];
        try {
            accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .select('id', 'platform_account_id', 'platform_username', 'platform_name', 'is_active', 'created_at')
                .orderBy('created_at', 'desc');
        } catch (error) {
            return res.json({
                error: 'Database query failed',
                details: error.message,
                config: config
            });
        }

        res.json({
            success: true,
            message: "Configuration and account check",
            config: config,
            instagram_accounts: accounts.map(acc => ({
                id: acc.id,
                platform_account_id: acc.platform_account_id,
                username: acc.platform_username,
                name: acc.platform_name,
                is_active: acc.is_active,
                created_at: acc.created_at
            })),
            timestamp: new Date().toISOString()
        });
    })
);

// Check Instagram API permissions
router.get(
    "/instagram/check-permissions",
    asyncHandler(async(req, res) => {
        const axios = require('axios');

        // Get Instagram account from database
        const socialQueries = require('../queries/social-integrations.queries');

        // Get all Instagram accounts (we'll filter by platform in the query)
        const knex = require('../knex');
        const accounts = await knex('social_media_accounts')
            .where('platform', 'instagram')
            .where('is_active', true)
            .orderBy('created_at', 'desc');

        if (accounts.length === 0) {
            return res.json({
                error: 'No Instagram accounts found in database',
                note: 'Make sure you have connected an Instagram account in the dashboard'
            });
        }

        const account = accounts[0];
        const accessToken = account.access_token;

        try {
            // IMPORTANT: Use Facebook Graph API for token validation
            // The access token is from Facebook OAuth, not Instagram App
            console.log('🔍 Checking Facebook access token permissions...');

            // Check token permissions using Facebook Graph API
            const permissionsResponse = await axios.get(`https://graph.facebook.com/me/permissions`, {
                params: { access_token: accessToken }
            });

            // Check token info using Facebook Graph API
            const tokenInfoResponse = await axios.get(`https://graph.facebook.com/me`, {
                params: {
                    access_token: accessToken,
                    fields: 'id,name'
                }
            });

            // Check if token can access Instagram account
            const instagramCheckResponse = await axios.get(`https://graph.facebook.com/${account.platform_account_id}`, {
                params: {
                    access_token: accessToken,
                    fields: 'id,username,name,account_type'
                }
            });

            res.json({
                success: true,
                facebook_token_info: tokenInfoResponse.data,
                instagram_account_info: instagramCheckResponse.data,
                permissions: permissionsResponse.data.data,
                instagram_account_id: account.platform_account_id,
                access_token_preview: accessToken.substring(0, 20) + '...',
                note: 'Token is from Facebook OAuth but can access Instagram account'
            });

        } catch (error) {
            res.json({
                error: 'Failed to check permissions',
                details: (error.response && error.response.data) || error.message
            });
        }
    })
);

// Debug signature verification endpoint (GET for info, POST for testing)
router.get(
    "/instagram/debug-signature",
    asyncHandler((req, res) => {
        console.log('🔍 SIGNATURE DEBUG INFO ENDPOINT');

        const instagramSecret = process.env.INSTAGRAM_APP_SECRET;
        const facebookSecret = process.env.FACEBOOK_APP_SECRET;
        const usingSecret = instagramSecret || facebookSecret;

        console.log('🔍 INSTAGRAM_APP_SECRET exists:', !!instagramSecret);
        console.log('🔍 FACEBOOK_APP_SECRET exists:', !!facebookSecret);
        console.log('🔍 Using secret source:', instagramSecret ? 'INSTAGRAM_APP_SECRET' : 'FACEBOOK_APP_SECRET');

        res.json({
            success: true,
            message: "Instagram webhook signature debug info",
            environment: {
                hasInstagramSecret: !!instagramSecret,
                hasFacebookSecret: !!facebookSecret,
                secretSource: instagramSecret ? 'INSTAGRAM_APP_SECRET' : 'FACEBOOK_APP_SECRET',
                secretPreview: usingSecret ? usingSecret.substring(0, 8) + '...' : 'NOT SET'
            },
            instructions: {
                testSignature: "Send POST request with webhook payload and x-hub-signature-256 header",
                setSecret: "Set INSTAGRAM_APP_SECRET environment variable with your Instagram app secret",
                getSecret: "Find your Instagram app secret in Meta Developer Dashboard → App Settings → Basic"
            },
            timestamp: new Date().toISOString()
        });
    })
);

router.post(
    "/instagram/debug-signature",
    rawBodyMiddleware,
    asyncHandler((req, res) => {
        const crypto = require('crypto');

        console.log('🔍 SIGNATURE DEBUG ENDPOINT');
        console.log('🔍 Raw body type:', typeof req.rawBodyBuffer);
        console.log('🔍 Raw body length:', req.rawBodyBuffer ? req.rawBodyBuffer.length : 'N/A');
        console.log('🔍 Body content:', req.body);

        const signature = req.headers['x-hub-signature-256'];
        const appSecret = process.env.INSTAGRAM_APP_SECRET || process.env.FACEBOOK_APP_SECRET;

        console.log('🔍 Received signature:', signature);
        console.log('🔍 INSTAGRAM_APP_SECRET exists:', !!process.env.INSTAGRAM_APP_SECRET);
        console.log('🔍 FACEBOOK_APP_SECRET exists:', !!process.env.FACEBOOK_APP_SECRET);
        console.log('🔍 Using secret (first 8):', appSecret ? appSecret.substring(0, 8) + '...' : 'NOT SET');
        console.log('🔍 Secret source:', process.env.INSTAGRAM_APP_SECRET ? 'INSTAGRAM_APP_SECRET' : 'FACEBOOK_APP_SECRET');

        if (req.rawBodyBuffer && appSecret) {
            const expectedSignature = 'sha256=' + crypto
                .createHmac('sha256', appSecret)
                .update(req.rawBodyBuffer)
                .digest('hex');

            console.log('🔍 Expected signature:', expectedSignature);
            console.log('🔍 Signatures match:', signature === expectedSignature);
        }

        res.json({
            success: true,
            message: "Signature debug complete",
            hasRawBody: !!req.rawBodyBuffer,
            hasAppSecret: !!appSecret,
            signatureMatch: signature && appSecret && req.rawBodyBuffer ?
                signature === ('sha256=' + crypto.createHmac('sha256', appSecret).update(req.rawBodyBuffer).digest('hex')) : false
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
    rawBodyMiddleware, // Must be first to capture raw body before any parsing
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
        console.log('🚨   GET/POST /instagram/debug-signature');
        console.log('🚨   GET/POST /instagram/meta-test');
        console.log('🚨   GET/POST /instagram/external-test');
        console.log('🚨   GET /instagram/permissions-test');
        console.log('🚨   GET /instagram/check-permissions');
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