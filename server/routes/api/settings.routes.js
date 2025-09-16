/*
 Local settings routes for development/offline fallback.
 These endpoints mirror the dashboard API shape so the frontend can keep working
 even when the dashboard server is unavailable.
*/

const express = require("express");
const router = express.Router();

// GET /api/settings/seo
router.get("/seo", (req, res) => {
  return res.json({
    success: true,
    settings: {
      default_title: "BOUNCE2BOUNCE - Premium Event Platform",
      default_description:
        "Discover and book premium events worldwide with BOUNCE2BOUNCE",
      default_keywords:
        "events, tickets, entertainment, concerts, festivals",
      default_author: "BOUNCE2BOUNCE",
      maintenance_mode: false,
    },
  });
});

// GET /api/settings/maintenance-status
router.get("/maintenance-status", (req, res) => {
  return res.json({
    success: true,
    maintenance_mode: false,
    maintenance_message: "Service temporarily unavailable",
  });
});

module.exports = router;

