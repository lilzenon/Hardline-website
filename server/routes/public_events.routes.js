const { Router } = require("express");
const { validationResult } = require("express-validator");

const events = require("../handlers/events.handler");
const asyncHandler = require("../utils/asyncHandler");
const { CustomError } = require("../utils");
const query = require("../queries");

const router = Router();

// Enhanced validation middleware with specific error handling
function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('🚨 Validation errors:', errors.array());

        // Group errors by field for better error messages
        const errorsByField = {};
        errors.array().forEach(error => {
            if (!errorsByField[error.path]) {
                errorsByField[error.path] = [];
            }
            errorsByField[error.path].push(error.msg);
        });

        // Create specific error messages
        let errorMessage = '';
        if (errorsByField.phone) {
            errorMessage = `Phone Number Error: ${errorsByField.phone[0]}`;
        } else if (errorsByField.email) {
            errorMessage = `Email Error: ${errorsByField.email[0]}`;
        } else if (errorsByField.name) {
            errorMessage = `Name Error: ${errorsByField.name[0]}`;
        } else {
            // Fallback to generic message
            const allErrors = errors.array().map(error => error.msg);
            errorMessage = allErrors.join(', ');
        }

        throw new CustomError(errorMessage, 400);
    }
    next();
}

// GET /event/:slug - Public event landing page
router.get(
    "/:slug",
    asyncHandler(async(req, res) => {
        const { slug } = req.params;

        // DEBUG: Add cache busting and detailed logging
        console.log(`🔍 Looking up event with slug: ${slug}`);

        const foundEvent = await query.event.findBySlug(slug);

        console.log('🔍 Found event data:', foundEvent ? {
            id: foundEvent.id,
            title: foundEvent.title,
            background_color: foundEvent.background_color,
            background_type: foundEvent.background_type,
            card_background_type: foundEvent.card_background_type,
            button_color: foundEvent.button_color,
            button_text_color: foundEvent.button_text_color
        } : null);

        if (!foundEvent) {
            return res.status(404).render("404", {
                message: "Event not found"
            });
        }

        // Check if event is active (enterprise access control)
        if (!foundEvent.is_active) {
            return res.status(404).render("event_inactive", {
                message: "This event is currently inactive",
                eventTitle: foundEvent.title,
                pageTitle: "Event Inactive"
            });
        }

        // Get signup count for display
        const signupCount = await query.event.getSignupCount(foundEvent.id);

        // Detect mobile vs desktop for optimized experience
        const userAgent = req.headers['user-agent'] || '';
        const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

        // Also check screen width from client hint if available
        const viewportWidth = req.headers['sec-ch-viewport-width'];
        const isMobileByWidth = viewportWidth && parseInt(viewportWidth) <= 768;

        const deviceType = (isMobile || isMobileByWidth) ? 'mobile' : 'desktop';

        // Check if this is a preview request
        const isPreview = req.query.preview === 'true';

        // Check if this is a QR code access
        const isQRAccess = req.query.qr === foundEvent.qr_code_identifier || req.query.qr === '1';

        if (isPreview) {
            console.log('🖼️ Rendering preview mode for event:', foundEvent.slug);
        }

        // Track QR code scan if accessed via QR code
        if (isQRAccess && foundEvent.qr_code_enabled) {
            try {
                const { UAParser } = require('ua-parser-js');
                const geoip = require('geoip-lite');

                const userAgent = req.get('User-Agent');
                const ipAddress = req.ip || req.connection.remoteAddress;
                const referrer = req.get('Referrer');

                // Parse user agent for device info
                const parser = new UAParser(userAgent);
                const agent = parser.getResult();
                const deviceType = agent.device.type === 'tablet' ? 'tablet' :
                    (agent.device.type === 'mobile' || (agent.os.name && agent.os.name.includes('Android')) || (agent.os.name && agent.os.name.includes('iOS'))) ? 'mobile' : 'desktop';

                // Get location info
                const geo = geoip.lookup(ipAddress);

                // Track the scan
                await query.event.trackQRCodeScan({
                    event_id: foundEvent.id,
                    user_agent: userAgent,
                    ip_address: ipAddress,
                    referrer: referrer,
                    device_type: deviceType,
                    browser_name: agent.browser.name,
                    os_name: agent.os.name,
                    country_code: geo ? geo.country : null,
                    city: geo ? geo.city : null
                });

                console.log(`🎯 QR code scan tracked for event: ${foundEvent.slug}`);
            } catch (error) {
                console.error('🚨 Error tracking QR code scan:', error);
                // Don't fail the page load if tracking fails
            }
        }

        res.render("event_landing", {
            event: {
                ...foundEvent,
                signup_count: signupCount
            },
            pageTitle: foundEvent.title,
            metaDescription: foundEvent.description || `Join ${foundEvent.title} - Get notified when this event goes live!`,
            metaImage: foundEvent.cover_image,
            deviceType: deviceType,
            isMobile: deviceType === 'mobile',
            isDesktop: deviceType === 'desktop',
            isPreview: isPreview,
            isQRAccess: isQRAccess
        });
    })
);

// POST /signup/:slug - Public signup endpoint with dynamic validation
router.post(
    "/signup/:slug",
    asyncHandler(events.createSignupValidation),
    validateRequest,
    asyncHandler(events.createSignup)
);

// GET /qr/:qr_identifier - QR code tracking and redirect
router.get(
    "/qr/:qr_identifier",
    asyncHandler(events.trackQRCodeScan)
);

module.exports = router;