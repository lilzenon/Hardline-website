const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const instagramHandler = require("../handlers/instagram-integration.handler");
const smsHandler = require("../handlers/sms-integration.handler");

const router = Router();

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
                }
            }
        });
    })
);

module.exports = router;