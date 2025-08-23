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
  if (hasRedis()) {
    await redis.client.set(key, secret, "EX", ttlSeconds);
  } else {
    req.session = req.session || {};
    req.session.tempTotpSecret = secret;
    req.session.tempTotpSecretUserId = userId;
    req.session.tempTotpSecretExpiresAt = Date.now() + ttlSeconds * 1000;
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
  if (hasRedis()) {
    const secret = await redis.client.get(key);
    if (secret) await redis.client.del(key);
    return secret;
  }
  if (!req.session) return null;
  if (req.session.tempTotpSecretUserId != userId) return null;
  const secret = req.session.tempTotpSecret || null;
  delete req.session.tempTotpSecret;
  delete req.session.tempTotpSecretUserId;
  delete req.session.tempTotpSecretExpiresAt;
  return secret;
}

module.exports = {
  setTempSecret,
  getTempSecret,
  consumeTempSecret,
};

