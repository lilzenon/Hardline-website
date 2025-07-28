const { Router } = require("express");

const validators = require("../handlers/validators.handler");
const helpers = require("../handlers/helpers.handler");
const asyncHandler = require("../utils/asyncHandler");
const locals = require("../handlers/locals.handler");
const auth = require("../handlers/auth.handler");
const utils = require("../utils");
const env = require("../env");

const router = Router();

// Old login route removed - now using React-based admin login system

// Signup route removed - admin-only system now

// Create-admin route removed - admin creation handled separately

router.post(
    "/change-password",
    locals.viewTemplate("partials/settings/change_password"),
    asyncHandler(auth.jwt),
    validators.changePassword,
    asyncHandler(helpers.verify),
    helpers.rateLimit({ window: 60, limit: 5 }),
    asyncHandler(auth.changePassword)
);

router.post(
    "/change-email",
    locals.viewTemplate("partials/settings/change_email"),
    asyncHandler(auth.jwt),
    auth.featureAccess([env.MAIL_ENABLED]),
    validators.changeEmail,
    asyncHandler(helpers.verify),
    helpers.rateLimit({ window: 60, limit: 3 }),
    asyncHandler(auth.changeEmailRequest)
);

router.post(
    "/apikey",
    locals.viewTemplate("partials/settings/apikey"),
    asyncHandler(auth.jwt),
    helpers.rateLimit({ window: 60, limit: 10 }),
    asyncHandler(auth.generateApiKey)
);

router.post(
    "/reset-password",
    locals.viewTemplate("partials/reset_password/request_form"),
    auth.featureAccess([env.MAIL_ENABLED]),
    validators.resetPassword,
    asyncHandler(helpers.verify),
    helpers.rateLimit({ window: 60, limit: 3 }),
    asyncHandler(auth.resetPassword)
);

router.post(
    "/new-password",
    locals.viewTemplate("partials/reset_password/new_password_form"),
    locals.newPassword,
    validators.newPassword,
    asyncHandler(helpers.verify),
    helpers.rateLimit({ window: 60, limit: 5 }),
    asyncHandler(auth.newPassword)
);

// Old admin login route removed - now using enhanced admin-auth.routes.js

// Google OAuth routes
router.get(
    "/google",
    helpers.rateLimit({ window: 60, limit: 10 }),
    (req, res, next) => {
        req.session.returnTo = req.query.returnTo || '/dashboard';
        next();
    },
    require("passport").authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    require("passport").authenticate("google", { failureRedirect: "/admin/login" }),
    asyncHandler(auth.socialLogin)
);

// Apple Sign-In routes
router.get(
    "/apple",
    helpers.rateLimit({ window: 60, limit: 10 }),
    (req, res, next) => {
        req.session.returnTo = req.query.returnTo || '/dashboard';
        next();
    },
    require("passport").authenticate("apple")
);

router.post(
    "/apple/callback",
    require("passport").authenticate("apple", { failureRedirect: "/admin/login" }),
    asyncHandler(auth.socialLogin)
);

module.exports = router;