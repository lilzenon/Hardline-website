const { differenceInDays, addMinutes } = require("date-fns");
const { nanoid } = require("nanoid");
const passport = require("passport");
const { randomUUID } = require("node:crypto");
const bcrypt = require("bcryptjs");

const { ROLES } = require("../consts");
const query = require("../queries");
const utils = require("../utils");
const redis = require("../redis");
const mail = require("../mail");
const env = require("../env");

const CustomError = utils.CustomError;

function authenticate(type, error, isStrict, redirect) {
    return function auth(req, res, next) {
        if (req.user) return next();

        passport.authenticate(type, (err, user, info) => {
            if (err) return next(err);

            if (
                req.isHTML &&
                redirect &&
                ((!user && isStrict) ||
                    (user && isStrict && !user.verified) ||
                    (user && user.banned))
            ) {
                if (redirect === "page") {
                    res.redirect("/logout");
                    return;
                }
                if (redirect === "header") {
                    res.setHeader("HX-Redirect", "/logout");
                    res.send("NOT_AUTHENTICATED");
                    return;
                }
            }

            if (!user && isStrict) {
                throw new CustomError(error, 401);
            }

            if (user && user.banned) {
                throw new CustomError("You're banned from using this website.", 403);
            }

            if (user && isStrict && !user.verified) {
                throw new CustomError("Your email address is not verified. " +
                    "Sign up to get the verification link again.", 400);
            }

            if (user) {
                res.locals.isAdmin = utils.isAdmin(user);
                req.user = {
                    ...user,
                    admin: utils.isAdmin(user)
                };

                // renew token if it's been at least one day since the token has been created
                // only do it for html page requests not api requests
                if (info && info.exp && req.isHTML && redirect === "page") {
                    const diff = Math.abs(differenceInDays(new Date(info.exp * 1000), new Date()));
                    if (diff < 6) {
                        const token = utils.signToken(user);
                        utils.deleteCurrentToken(res);
                        utils.setToken(res, token);
                    }
                }
            }
            return next();
        })(req, res, next);
    }
}

// Enhanced local authentication with debugging
function localWithDebug(req, res, next) {
    console.log(`🔐 Local authentication attempt for email: ${req.body?.email}`);

    authenticate("local", "Login credentials are wrong.", true, null)(req, res, (err) => {
        if (err) {
            console.log(`❌ Local authentication failed: ${err.message}`);
            return next(err);
        }

        if (req.user) {
            console.log(`✅ Local authentication successful for: ${req.user.email}`);
        } else {
            console.log(`❌ Local authentication failed: No user returned`);
        }

        return next();
    });
}

const local = localWithDebug;
const jwt = authenticate("jwt", "Unauthorized.", true, "header");
const jwtPage = authenticate("jwt", "Unauthorized.", true, "page");
const jwtLoose = authenticate("jwt", "Unauthorized.", false, "header");
const jwtLoosePage = authenticate("jwt", "Unauthorized.", false, "page");
const apikey = authenticate("localapikey", "API key is not correct.", false, null);

function admin(req, res, next) {
    if (req.user.admin) return next();
    throw new CustomError("Unauthorized", 401);
}

// Admin authentication middleware for dashboard routes
function adminAuth(req, res, next) {
    // Store the original URL for redirect after login
    const originalUrl = req.originalUrl;

    // Check if user is authenticated
    if (!req.user) {
        console.log(`🔒 Unauthorized access attempt to ${originalUrl}`);

        // Store the intended destination in session
        req.session.returnTo = originalUrl;

        // Redirect to admin login
        return res.redirect('/dashboard/login');
    }

    // Check if user is admin
    if (!utils.isAdmin(req.user)) {
        console.log(`🚫 Non-admin user ${req.user.email} attempted to access ${originalUrl}. Role: ${req.user.role}`);
        throw new CustomError("Unauthorized. Admin access required.", 403);
    }

    console.log(`✅ Admin ${req.user.email} accessing ${originalUrl}`);
    return next();
}

// Combined JWT + Admin authentication for dashboard pages
function jwtAdminPage(req, res, next) {
    // First authenticate with JWT (loose authentication to allow redirects)
    authenticate("jwt", "Unauthorized.", false, "page")(req, res, (err) => {
        if (err) return next(err);

        // Store the original URL for redirect after login
        const originalUrl = req.originalUrl;

        // Check if user is authenticated
        if (!req.user) {
            console.log(`🔒 Unauthorized access attempt to ${originalUrl}`);

            // Store the intended destination in session
            req.session.returnTo = originalUrl;

            // Redirect to admin login
            return res.redirect('/dashboard/login');
        }

        // Check if user is admin
        if (!utils.isAdmin(req.user)) {
            console.log(`🚫 Non-admin user ${req.user.email} attempted to access ${originalUrl}. Role: ${req.user.role}`);

            // Store the intended destination in session for potential admin login
            req.session.returnTo = originalUrl;

            // Redirect to admin login instead of throwing error
            return res.redirect('/dashboard/login');
        }

        console.log(`✅ Admin ${req.user.email} accessing ${originalUrl}`);
        return next();
    });
}

async function signup(req, res) {
    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = await query.user.add({ email: req.body.email, password },
        req.user
    );

    await mail.verification(user);

    if (req.isHTML) {
        res.render("partials/auth/verify");
        return;
    }

    return res.status(201).send({ message: "A verification email has been sent." });
}

// Enhanced admin security validation
function validateAdminEmail(email) {
    // Check if admin email domains are configured
    if (!env.ADMIN_EMAIL_DOMAINS) {
        console.log("⚠️ No admin email domains configured - allowing any email");
        return true;
    }

    const allowedDomains = env.ADMIN_EMAIL_DOMAINS.split(',').map(domain => domain.trim().toLowerCase());
    const emailParts = email.split('@');
    const emailDomain = emailParts[1] ? emailParts[1].toLowerCase() : null;

    if (!emailDomain || !allowedDomains.includes(emailDomain)) {
        console.log(`🚫 Email domain ${emailDomain} not in allowed list: ${allowedDomains.join(', ')}`);
        return false;
    }

    console.log(`✅ Email domain ${emailDomain} is approved for admin access`);
    return true;
}

async function createAdminUser(req, res) {
    const { email, password } = req.body;

    // Check if this is initial setup (no users exist)
    const isThereAUser = await query.user.findAny();
    const isInitialSetup = !isThereAUser;

    if (!isInitialSetup) {
        // After initial setup, check security restrictions

        // 1. Check if admin registration is allowed
        if (!env.ALLOW_ADMIN_REGISTRATION) {
            console.log(`🚫 Admin registration disabled - ${email} attempted to create admin account`);
            throw new CustomError("Admin account creation is disabled. Contact your system administrator.", 403);
        }

        // 2. Check if user is already an admin (for admin-created accounts)
        if (env.REQUIRE_ADMIN_APPROVAL && (!req.user || !utils.isAdmin(req.user))) {
            console.log(`🚫 Non-admin user attempted to create admin account: ${email}. User role: ${req.user?.role || 'none'}`);
            throw new CustomError("Only existing administrators can create new admin accounts.", 403);
        }
    }

    // 3. Validate email domain
    if (!validateAdminEmail(email)) {
        throw new CustomError(`Email domain not authorized for admin accounts. Contact your system administrator.`, 403);
    }

    // 4. Check if email already exists
    const existingUser = await query.user.find({ email });
    if (existingUser) {
        throw new CustomError("An account with this email already exists.", 400);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await query.user.add({
        email,
        password: hashedPassword,
        role: ROLES.ADMIN,
        verified: true
    });

    console.log(`✅ Admin account created: ${email} ${isInitialSetup ? '(initial setup)' : '(by admin)'}`);

    const token = utils.signToken(user);

    if (req.isHTML) {
        utils.setToken(res, token);
        res.render("partials/auth/welcome");
        return;
    }

    return res.status(201).send({ token });
}

function login(req, res) {
    const token = utils.signToken(req.user);

    if (req.isHTML) {
        utils.setToken(res, token);
        res.render("partials/auth/welcome");
        return;
    }

    return res.status(200).send({ token });
}

function adminLogin(req, res) {
    try {
        console.log(`🔐 Admin login attempt for user: ${req.user?.email || 'unknown'}`);
        console.log(`🔍 User object:`, {
            id: req.user ? req.user.id : null,
            email: req.user ? req.user.email : null,
            role: req.user ? req.user.role : null,
            admin: req.user ? req.user.admin : null,
            isAdmin: utils.isAdmin(req.user)
        });

        // Check if user is admin using the proper utility function
        if (!utils.isAdmin(req.user)) {
            console.log(`🚫 Non-admin user ${req.user.email} attempted admin login. Role: ${req.user.role}`);
            throw new CustomError("Unauthorized. Admin access required.", 403);
        }

        console.log(`🔑 Generating token for admin user ${req.user.email}`);
        const token = utils.signToken(req.user);
        console.log(`✅ Token generated successfully`);

        console.log(`🔍 Request type check - req.isHTML: ${req.isHTML}`);
        if (req.isHTML) {
            console.log(`🍪 Setting token for user ${req.user.email}`);
            utils.setToken(res, token);

            // Get the return URL from session or default to dashboard
            const returnTo = req.session.returnTo || '/dashboard';
            console.log(`🎯 Return URL from session: ${req.session.returnTo}, using: ${returnTo}`);
            delete req.session.returnTo; // Clean up session

            console.log(`✅ Admin ${req.user.email} logged in successfully, redirecting to: ${returnTo}`);
            console.log(`📤 Setting HX-Redirect header to: ${returnTo}`);

            res.setHeader("HX-Redirect", returnTo);
            res.send("ADMIN_LOGIN_SUCCESS");
            return;
        } else {
            console.log(`📡 Non-HTML request, sending JSON response`);
            return res.status(200).send({ token, redirect: "/dashboard" });
        }
    } catch (error) {
        console.error(`❌ Error in adminLogin:`, error);
        throw error;
    }
}

function socialLogin(req, res) {
    // Check if user is admin for admin login
    if (!utils.isAdmin(req.user)) {
        console.log(`🚫 Non-admin user ${req.user.email} attempted social admin login. Role: ${req.user.role}`);
        throw new CustomError("Unauthorized. Admin access required.", 403);
    }

    const token = utils.signToken(req.user);
    utils.setToken(res, token);

    const returnTo = req.session.returnTo || '/dashboard';
    delete req.session.returnTo;

    console.log(`✅ Admin ${req.user.email} logged in via social auth, redirecting to: ${returnTo}`);

    res.redirect(returnTo);
}

async function verify(req, res, next) {
    if (!req.params.verificationToken) return next();

    const user = await query.user.update({
        verification_token: req.params.verificationToken,
        verification_expires: [">", utils.dateToUTC(new Date())]
    }, {
        verified: true,
        verification_token: null,
        verification_expires: null
    });

    if (user) {
        const token = utils.signToken(user);
        utils.deleteCurrentToken(res);
        utils.setToken(res, token);
        res.locals.token_verified = true;
        req.cookies.token = token;
    }

    return next();
}

async function changePassword(req, res) {
    const isMatch = await bcrypt.compare(req.body.currentpassword, req.user.password);
    if (!isMatch) {
        const message = "Current password is not correct.";
        res.locals.errors = { currentpassword: message };
        throw new CustomError(message, 401);
    }

    const salt = await bcrypt.genSalt(12);
    const newpassword = await bcrypt.hash(req.body.newpassword, salt);

    const user = await query.user.update({ id: req.user.id }, { password: newpassword });

    if (!user) {
        throw new CustomError("Couldn't change the password. Try again later.");
    }

    if (req.isHTML) {
        res.setHeader("HX-Trigger-After-Swap", "resetChangePasswordForm");
        res.render("partials/settings/change_password", {
            success: "Password has been changed."
        });
        return;
    }

    return res
        .status(200)
        .send({ message: "Your password has been changed successfully." });
}

async function generateApiKey(req, res) {
    const apikey = nanoid(40);

    if (env.REDIS_ENABLED) {
        redis.remove.user(req.user);
    }

    const user = await query.user.update({ id: req.user.id }, { apikey });

    if (!user) {
        throw new CustomError("Couldn't generate API key. Please try again later.");
    }

    if (req.isHTML) {
        res.render("partials/settings/apikey", {
            user: { apikey },
        });
        return;
    }

    return res.status(201).send({ apikey });
}

async function resetPassword(req, res) {
    const user = await query.user.update({ email: req.body.email }, {
        reset_password_token: randomUUID(),
        reset_password_expires: utils.dateToUTC(addMinutes(new Date(), 30))
    });

    if (user) {
        mail.resetPasswordToken(user).catch(error => {
            console.error("Send reset-password token email error:\n", error);
        });
    }

    if (req.isHTML) {
        res.render("partials/reset_password/request_form", {
            message: "If the email address exists, a reset password email will be sent to it."
        });
        return;
    }

    return res.status(200).send({
        message: "If email address exists, a reset password email has been sent."
    });
}

async function newPassword(req, res) {
    const { new_password, reset_password_token } = req.body;

    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(req.body.new_password, salt);

    const user = await query.user.update({
        reset_password_token,
        reset_password_expires: [">", utils.dateToUTC(new Date())]
    }, {
        reset_password_expires: null,
        reset_password_token: null,
        password,
    });

    if (!user) {
        throw new CustomError("Could not set the password. Please try again later.");
    }

    res.render("partials/reset_password/new_password_success");
}

async function changeEmailRequest(req, res) {
    const { email, password } = req.body;

    const isMatch = await bcrypt.compare(password, req.user.password);

    if (!isMatch) {
        const error = "Password is not correct.";
        res.locals.errors = { password: error };
        throw new CustomError(error, 401);
    }

    const user = await query.user.find({ email });

    if (user) {
        const error = "Can't use this email address.";
        res.locals.errors = { email: error };
        throw new CustomError(error, 400);
    }

    const updatedUser = await query.user.update({ id: req.user.id }, {
        change_email_address: email,
        change_email_token: randomUUID(),
        change_email_expires: utils.dateToUTC(addMinutes(new Date(), 30))
    });

    if (updatedUser) {
        await mail.changeEmail({...updatedUser, email });
    }

    const message = "A verification link has been sent to the requested email address."

    if (req.isHTML) {
        res.setHeader("HX-Trigger-After-Swap", "resetChangeEmailForm");
        res.render("partials/settings/change_email", {
            success: message
        });
        return;
    }

    return res.status(200).send({ message });
}

async function changeEmail(req, res, next) {
    const changeEmailToken = req.params.changeEmailToken;

    if (changeEmailToken) {
        const foundUser = await query.user.find({
            change_email_token: changeEmailToken,
            change_email_expires: [">", utils.dateToUTC(new Date())]
        });

        if (!foundUser) return next();

        const user = await query.user.update({ id: foundUser.id }, {
            change_email_token: null,
            change_email_expires: null,
            change_email_address: null,
            email: foundUser.change_email_address
        });

        if (user) {
            const token = utils.signToken(user);
            utils.deleteCurrentToken(res);
            utils.setToken(res, token);
            res.locals.token_verified = true;
            req.cookies.token = token;
        }
    }
    return next();
}

function featureAccess(features, redirect) {
    return function(req, res, next) {
        for (let i = 0; i < features.length; ++i) {
            if (!features[i]) {
                if (redirect) {
                    return res.redirect("/");
                } else {
                    throw new CustomError("Request is not allowed.", 400);
                }
            }
        }
        next();
    }
}

function featureAccessPage(features) {
    return featureAccess(features, true);
}

module.exports = {
    admin,
    adminAuth,
    adminLogin,
    apikey,
    changeEmail,
    changeEmailRequest,
    changePassword,
    createAdminUser,
    featureAccess,
    featureAccessPage,
    generateApiKey,
    jwt,
    jwtAdminPage,
    jwtLoose,
    jwtLoosePage,
    jwtPage,
    local,
    login,
    newPassword,
    resetPassword,
    signup,
    socialLogin,
    verify,
}