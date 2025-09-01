const { Router } = require("express");
const { validationResult } = require("express-validator");

const auth = require("../handlers/auth.handler");
const events = require("../handlers/events.handler");
const asyncHandler = require("../utils/asyncHandler");
const { CustomError } = require("../utils");

const router = Router();

// Validation middleware
function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        throw new CustomError(errorMessages.join(', '), 400);
    }
    next();
}

// Protected routes (require authentication)
router.use(auth.jwt);

// GET /api/events - Get user's events
router.get(
    "/",
    asyncHandler(events.getUserEvents)
);

// POST /api/events - Create new event
router.post(
    "/",
    events.createEventValidation,
    validateRequest,
    asyncHandler(events.createEvent)
);

// GET /api/events/:id - Get single event
router.get(
    "/:id",
    asyncHandler(events.getEvent)
);

// PUT /api/events/:id - Update event
router.put(
    "/:id",
    events.updateEventValidation,
    validateRequest,
    asyncHandler(events.updateEvent)
);

// DELETE /api/events/:id - Delete event
router.delete(
    "/:id",
    asyncHandler(events.deleteEvent)
);

// GET /api/events/:id/signups - Get event signups
router.get(
    "/:id/signups",
    asyncHandler(events.getEventSignups)
);

// GET /api/events/:id/analytics - Get event analytics for edit page
router.get(
    "/:id/analytics",
    asyncHandler(events.getEventAnalytics)
);

// 🚀 ANALYTICS ROUTES - LAYLO-STYLE FANS SYSTEM

// GET /api/drops/analytics/fans - Get comprehensive fan analytics
router.get(
    "/analytics/fans",
    asyncHandler(events.getFanAnalytics)
);

// GET /api/drops/analytics/summary - Get fan summary statistics
router.get(
    "/analytics/summary",
    asyncHandler(events.getFanSummaryStats)
);

// 🎯 QR CODE ROUTES

// GET /api/events/:id/qr-code - Generate and download QR code
router.get(
    "/:id/qr-code",
    asyncHandler(events.generateEventQRCode)
);

// GET /api/events/:id/qr-code/data - Get QR code data and URLs
router.get(
    "/:id/qr-code/data",
    asyncHandler(events.getEventQRCodeData)
);

// 🎯 ENHANCED QR CODE MANAGEMENT ROUTES

// GET /api/events/:id/qr-codes - Get all QR codes for an event
router.get(
    "/:id/qr-codes",
    asyncHandler(events.getEventQRCodes)
);

// POST /api/events/:id/qr-codes - Create a new QR code for an event
router.post(
    "/:id/qr-codes",
    asyncHandler(events.createEventQRCode)
);

// PUT /api/events/:id/qr-codes/:qrId - Update a QR code
router.put(
    "/:id/qr-codes/:qrId",
    asyncHandler(events.updateEventQRCode)
);

// DELETE /api/events/:id/qr-codes/:qrId - Delete a QR code
router.delete(
    "/:id/qr-codes/:qrId",
    asyncHandler(events.deleteEventQRCode)
);

// GET /api/events/:id/qr-codes/:qrId/image - Generate QR code image for download
router.get(
    "/:id/qr-codes/:qrId/image",
    asyncHandler(events.generateQRCodeImage)
);



// GET /api/events/:id/social-preview/invalidate-cache - Get social media cache invalidation info
router.get(
    "/:id/social-preview/invalidate-cache",
    asyncHandler(events.invalidateSocialCache)
);

// 📊 ADVANCED ANALYTICS ROUTES

// GET /api/events/:id/analytics/page-views - Get detailed page view analytics
router.get(
    "/:id/analytics/page-views",
    asyncHandler(events.getEventPageViews)
);

// GET /api/events/:id/analytics/sessions - Get session analytics
router.get(
    "/:id/analytics/sessions",
    asyncHandler(events.getEventSessionAnalytics)
);

// GET /api/events/:id/analytics/export - Export analytics data
router.get(
    "/:id/analytics/export",
    asyncHandler(events.exportEventAnalytics)
);

// GET /api/events/:id/qr-code/analytics - Get QR code scan analytics
router.get(
    "/:id/qr-code/analytics",
    asyncHandler(events.getEventQRCodeAnalytics)
);

module.exports = router;