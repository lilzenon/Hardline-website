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

module.exports = router;