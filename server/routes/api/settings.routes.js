/*
 Local settings routes for development/offline fallback.
 These endpoints mirror the dashboard API shape so the frontend can keep working
 even when the dashboard server is unavailable.
*/

const express = require("express");
const router = express.Router();

// GET /api/settings/seo
const { getAllowedOrigins } = require('../../middleware/origin-validation.middleware');

router.get("/seo", (req, res) => {
const { getAllowedOrigins } = require('../../middleware/origin-validation.middleware');

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
router.get("/maintenance-status", async (req, res) => {
  try {
    const base = process.env.DASHBOARD_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : 'https://admin.b2b.click');
    const resp = await fetch(`${base}/api/settings/maintenance-status`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (resp.ok) {
      const data = await resp.json();
      return res.json(data);
    }
    throw new Error(`Dashboard responded ${resp.status}`);
  } catch (err) {
    console.warn('⚠️ Fallback maintenance-status (dashboard unreachable):', err.message);
    return res.json({
      success: true,
      maintenance_mode: false,
      maintenance_message: "Service temporarily unavailable",
    });
  }
});

// POST /api/settings/maintenance-refresh
// Force refresh maintenance status cache (for immediate updates)
router.post("/maintenance-refresh", async (req, res) => {
  try {
    console.log('🔄 Maintenance cache refresh requested');

    const { refreshMaintenanceStatus } = require('../../middleware/maintenance.middleware');
    const status = await refreshMaintenanceStatus();

    res.json({
      success: true,
      message: 'Maintenance status cache refreshed',
      status: status,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Failed to refresh maintenance cache:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh maintenance status',
      message: error.message
    });
  }
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

