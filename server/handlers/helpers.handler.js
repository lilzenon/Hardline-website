const { RedisStore: RateLimitRedisStore } = require("rate-limit-redis");
const { rateLimit: expressRateLimit, ipKeyGenerator } = require("express-rate-limit");
const { validationResult } = require("express-validator");

const { CustomError } = require("../utils");
const query = require("../queries");
const redis = require("../redis");
const env = require("../env");

function error(error, req, res, _next) {
    if (!(error instanceof CustomError)) {
        console.error(error);
    } else if (env.isDev) {
        console.error(error.message);
    }

    const message = error instanceof CustomError ? error.message : "An error occurred.";
    const statusCode = error.statusCode || 500;

    if (req.isHTML && req.viewTemplate) {
        res.locals.error = message;
        res.render(req.viewTemplate);
        return;
    }

    if (req.isHTML) {
        res.render("error", {
            message: "An error occurred. Please try again later."
        });
        return;
    }


    return res.status(statusCode).json({ error: message });
};


function verify(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty()) return next();

    const errors = result.array();
    const error = errors[0].msg;

    res.locals.errors = {};
    errors.forEach(e => {
        if (res.locals.errors[e.param]) return;
        res.locals.errors[e.param] = e.msg;
    });

    throw new CustomError(error, 400);
}

function parseQuery(req, res, next) {
    const { admin } = req.user || {};

    if (
        typeof req.query.limit !== "undefined" &&
        typeof req.query.limit !== "string"
    ) {
        return res.status(400).json({ error: "limit query is not valid." });
    }

    if (
        typeof req.query.skip !== "undefined" &&
        typeof req.query.skip !== "string"
    ) {
        return res.status(400).json({ error: "skip query is not valid." });
    }

    if (
        typeof req.query.search !== "undefined" &&
        typeof req.query.search !== "string"
    ) {
        return res.status(400).json({ error: "search query is not valid." });
    }

    const limit = parseInt(req.query.limit) || 10;

    req.context = {
        limit: limit > 50 ? 50 : limit,
        skip: parseInt(req.query.skip) || 0,
    };

    next();
};

function rateLimit(params) {
    if (!env.ENABLE_RATE_LIMIT) {
        return function(req, res, next) {
            return next();
        }
    }

    let store = undefined;

    // CRITICAL FIX: Only use Redis store if Redis is enabled and ready
    if (env.REDIS_ENABLED && redis.isRedisReady()) {
        try {
            store = new RateLimitRedisStore({
                sendCommand: (...args) => {
                    // Use the safe Redis command helper
                    if (redis.isRedisReady()) {
                        return redis.client.call(...args);
                    } else {
                        // Fallback to memory store by throwing error that will be caught
                        throw new Error('Redis client not ready');
                    }
                },
            });
            console.log('✅ Rate limiting using Redis store');
        } catch (error) {
            console.warn('⚠️ Failed to create Redis rate limit store, using memory store:', error.message);
            store = undefined; // Fallback to memory store
        }
    } else {
        if (env.REDIS_ENABLED) {
            console.warn('⚠️ Redis enabled but not ready, using memory store for rate limiting');
        }
    }

    return expressRateLimit({
        windowMs: params.window * 1000,
        validate: { trustProxy: true },
        skipSuccessfulRequests: !!params.skipSuccess,
        skipFailedRequests: !!params.skipFailed,
        ...(store && { store }),
        limit: function(req, res) {
            if (params.user && req.user) {
                return params.user;
            }
            return params.limit;
        },
        keyGenerator: function(req, res) {
            // Use the official IPv6-safe key generator helper
            const ipKey = ipKeyGenerator(req);
            return "rl:" + req.method + req.baseUrl + req.path + ":" + ipKey;
        },
        requestWasSuccessful: function(req, res) {
            return !res.locals.error && res.statusCode < 400;
        },
        handler: function(req, res, next, options) {
            throw new CustomError(options.message, options.statusCode);
        },
    });
}

// redirect to create admin page if the kutt instance is ran for the first time
//
// Once any user exists in the DB the result will never flip back to "no users",
// so we cache the truthy result in module scope. This skips a DB round-trip on
// every anonymous public-page request — a meaningful TTFB win on mobile.
let _adminUserExists = false;
async function adminSetup(req, res, next) {
    try {
        if (_adminUserExists || req.user) {
            return next();
        }
        if (await query.user.findAny()) {
            _adminUserExists = true;
            return next();
        }
        return res.redirect("/create-admin");
    } catch (error) {
        // Never crash due to Redis/DB issues during admin setup check
        console.warn('⚠️ adminSetup check failed, bypassing create-admin redirect:', error.message);
        return next();
    }
}

module.exports = {
    adminSetup,
    error,
    parseQuery,
    rateLimit,
    verify,
}