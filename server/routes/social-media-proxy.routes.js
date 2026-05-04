const express = require("express");
const router = express.Router();

/**
 * GET /api/social-media
 * Proxy endpoint for social media links - proxies to dashboard server
 */
router.get("/", async (req, res) => {
    try {
        console.log('🔍 Homepage: Fetching social media links via proxy...');

        // Proxy to dashboard server for social media links
        const env = require('../env');
        const dashboardUrl = env.DASHBOARD_URL || (env.NODE_ENV === 'production' ? 'https://admin.b2b.click' : 'http://localhost:3002');

        console.log(`📡 Proxying social-media request to dashboard: ${dashboardUrl}/api/social-media`);

        // Timeout to prevent hanging if the dashboard call stalls — without
        // this, the upstream LB will return a 504 HTML page after ~100s.
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        let response;
        try {
            response = await fetch(`${dashboardUrl}/api/social-media`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal
            });
        } finally {
            clearTimeout(timeoutId);
        }

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Homepage: Social media links fetched from dashboard');
            res.json(data);
        } else {
            throw new Error(`Dashboard responded with ${response.status}`);
        }
    } catch (error) {
        console.error('❌ Homepage: Error fetching social media links:', error);

        // Fallback empty social media if dashboard is unavailable
        res.json({
            success: true,
            links: []
        });
    }
});

module.exports = router;

