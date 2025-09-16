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

// POST /api/analytics/track - Analytics tracking endpoint
router.post('/analytics/track', (req, res) => {
    // Return 204 No Content for analytics tracking
    // This prevents frontend errors while not actually tracking anything
    res.status(204).send();
});

// GET /api/settings/about - About page content endpoint
router.get('/about', async (req, res) => {
    try {
        console.log('🔍 Homepage: Fetching About page content...');

        // Proxy to dashboard server for about page content
        const dashboardUrl = process.env.DASHBOARD_PROXY_URL || 'http://localhost:3002';
        const response = await fetch(`${dashboardUrl}/api/settings/about`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Homepage: About page content fetched from dashboard');
            res.json(data);
        } else {
            throw new Error(`Dashboard responded with ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Homepage: Error fetching About page content:', error);

        // Fallback content if dashboard is unavailable
        res.json({
            success: true,
            data: {
                content: "Welcome to BOUNCE2BOUNCE, your premier destination for exclusive live music events. We're passionate about connecting music lovers with unforgettable experiences that showcase the best in live entertainment.",
                enabled: true
            }
        });
    }
});

module.exports = router;

