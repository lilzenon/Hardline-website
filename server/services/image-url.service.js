"use strict";

/**
 * Image URL normalization and construction helpers
 * - Builds absolute URLs for image variants based on environment and request host
 * - Provides safe fallbacks when only legacy cover_image is present
 */
const path = require("path");

function getDashboardBase(req) {
  try {
    const host = (req.get && req.get("host")) ? String(req.get("host")).toLowerCase() : "";
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return "http://localhost:3002";
    }
    return "https://admin.b2b.click";
  } catch (_) {
    return process.env.NODE_ENV === "development" ? "http://localhost:3002" : "https://admin.b2b.click";
  }
}

function buildImageUrl(uuid, variant, req) {
  if (!uuid) return null;
  const base = getDashboardBase(req);
  const v = variant && typeof variant === "string" ? variant : "medium";
  return `${base}/api/images/serve/${uuid}/${v}`;
}

function extractUuidFromCoverImage(coverImage) {
  try {
    if (!coverImage) return null;
    const idx = coverImage.indexOf("/api/images/serve/");
    if (idx === -1) return null;
    const parts = coverImage.substring(idx).split("/");
    // [ '', 'api', 'images', 'serve', '<uuid>', '<variant?>' ]
    const uuid = parts[4];
    return uuid && uuid.length >= 8 ? uuid : null;
  } catch (_) {
    return null;
  }
}

function withCoverImageUrl(eventRow, req, variant = "event_card") {
  if (!eventRow || typeof eventRow !== "object") return eventRow;
  const uuid = eventRow.cover_image_uuid || extractUuidFromCoverImage(eventRow.cover_image);
  const cover_image_url = uuid ? buildImageUrl(uuid, variant, req) : null;
  return { ...eventRow, cover_image_url };
}

module.exports = {
  getDashboardBase,
  buildImageUrl,
  extractUuidFromCoverImage,
  withCoverImageUrl,
};
