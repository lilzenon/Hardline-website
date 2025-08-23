/**
 * TOTP Setup Store (Redis-optional)
 * - Uses Redis when available and ready
 * - Falls back to session storage (req.session) when Redis is not available
 */

const redis = require("../redis");

const KEY_PREFIX = "totp:setup:";
const DEFAULT_TTL_SECONDS = 10 * 60; // 10 minutes

function hasRedis() {
    return Boolean(redis && redis.client && redis.client.status === "ready");
}

/**
 * Store a temporary TOTP secret for a user during setup.
 * @param {object} req - Express request (for session fallback)
 * @param {number|string} userId - User identifier
 * @param {string} secret - Base32 secret
 * @param {number} ttlSeconds - Optional TTL for secret
 */
async function setTempSecret(req, userId, secret, ttlSeconds = DEFAULT_TTL_SECONDS) {
    const key = `${KEY_PREFIX}${userId}`;
    console.log(`🔐 TOTP Store: Setting temp secret for user ${userId}, TTL: ${ttlSeconds}s`);

    if (hasRedis()) {
        await redis.client.set(key, secret, "EX", ttlSeconds);
        console.log(`✅ TOTP Store: Secret stored in Redis for user ${userId}`);
    } else {
        req.session = req.session || {};
        req.session.tempTotpSecret = secret;
        req.session.tempTotpSecretUserId = userId;
        req.session.tempTotpSecretExpiresAt = Date.now() + ttlSeconds * 1000;

        // Force session save to ensure persistence
        await new Promise((resolve, reject) => {
            req.session.save((err) => {
                if (err) {
                    console.error(`❌ TOTP Store: Failed to save session for user ${userId}:`, err);
                    reject(err);
                } else {
                    console.log(`✅ TOTP Store: Secret stored in session for user ${userId}, session ID: ${req.sessionID}`);
                    resolve();
                }
            });
        });
    }
}

/**
 * Retrieve the temporary TOTP secret (does not consume it).
 */
async function getTempSecret(req, userId) {
    const key = `${KEY_PREFIX}${userId}`;
    if (hasRedis()) {
        return await redis.client.get(key);
    }
    if (!req.session) return null;
    if (req.session.tempTotpSecretUserId != userId) return null;
    if (!req.session.tempTotpSecret || !req.session.tempTotpSecretExpiresAt) return null;
    if (Date.now() > req.session.tempTotpSecretExpiresAt) return null;
    return req.session.tempTotpSecret;
}

/**
 * Consume and delete the temporary TOTP secret (single-use semantics).
 */
async function consumeTempSecret(req, userId) {
    const key = `${KEY_PREFIX}${userId}`;
    console.log(`🔍 TOTP Store: Attempting to consume secret for user ${userId}, session ID: ${req.sessionID}`);

    if (hasRedis()) {
        const secret = await redis.client.get(key);
        if (secret) {
            await redis.client.del(key);
            console.log(`✅ TOTP Store: Secret consumed from Redis for user ${userId}`);
        } else {
            console.log(`❌ TOTP Store: No secret found in Redis for user ${userId}`);
        }
        return secret;
    }

    // Session fallback with detailed debugging
    if (!req.session) {
        console.log(`❌ TOTP Store: No session found for user ${userId}`);
        return null;
    }

    console.log(`🔍 TOTP Store: Session data for user ${userId}:`, {
        hasSecret: !!req.session.tempTotpSecret,
        storedUserId: req.session.tempTotpSecretUserId,
        expiresAt: req.session.tempTotpSecretExpiresAt,
        currentTime: Date.now(),
        isExpired: req.session.tempTotpSecretExpiresAt ? Date.now() > req.session.tempTotpSecretExpiresAt : 'no expiration set'
    });

    // Convert both to strings for comparison to handle type mismatches
    const expectedUserId = String(userId);
    const storedUserId = String(req.session.tempTotpSecretUserId);

    if (storedUserId !== expectedUserId) {
        console.log(`❌ TOTP Store: User ID mismatch. Expected: ${expectedUserId} (${typeof userId}), Found: ${storedUserId} (${typeof req.session.tempTotpSecretUserId})`);
        return null;
    }

    if (!req.session.tempTotpSecret) {
        console.log(`❌ TOTP Store: No TOTP secret in session for user ${userId}`);
        return null;
    }

    if (req.session.tempTotpSecretExpiresAt && Date.now() > req.session.tempTotpSecretExpiresAt) {
        console.log(`❌ TOTP Store: Secret expired for user ${userId}`);
        delete req.session.tempTotpSecret;
        delete req.session.tempTotpSecretUserId;
        delete req.session.tempTotpSecretExpiresAt;
        return null;
    }

    const secret = req.session.tempTotpSecret;
    delete req.session.tempTotpSecret;
    delete req.session.tempTotpSecretUserId;
    delete req.session.tempTotpSecretExpiresAt;

    console.log(`✅ TOTP Store: Secret consumed from session for user ${userId}`);
    return secret;
}

module.exports = {
    setTempSecret,
    getTempSecret,
    consumeTempSecret,
};