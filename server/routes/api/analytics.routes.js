/*
 Local analytics routes for development/offline fallback.
 Keeps the homepage from failing when the dashboard analytics API is down.
*/

const express = require("express");
const router = express.Router();

// POST /api/analytics/track
router.post("/track", (req, res) => {
  // Minimal dev stub: acknowledge and return 204 No Content
  return res.status(204).end();
});

module.exports = router;

