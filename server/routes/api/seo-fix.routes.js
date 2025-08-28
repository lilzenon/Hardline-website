const { Router } = require("express");
const router = Router();

// GET /api/settings/seo - Return SEO settings as JSON
router.get("/seo", async (req, res) => {
    try {
        console.log('📊 SEO API endpoint called');
        
        // Return default SEO settings in the expected format
        const seoSettings = {
            default_title: "BOUNCE2BOUNCE - NJ'S PREMIERE EDM COLLECTIVE",
            default_description: "Discover exclusive live music events, connect with artists, and purchase tickets seamlessly. Join BOUNCE2BOUNCE for unforgettable music experiences.",
            default_keywords: "live music events, concert tickets, artist promotion, event discovery, music experiences, exclusive events, BOUNCE2BOUNCE",
            default_author: "BOUNCE2BOUNCE",
            default_og_image: "https://b2b.click/images/og-image.png",
            twitter_handle: "@bounce2bounce",
            google_analytics_id: "",
            google_search_console_id: "",
            maintenance_mode: false,
            maintenance_message: "We are currently performing scheduled maintenance. Please check back soon.",
            maintenance_title: "Site Under Maintenance",
            maintenance_estimated_time: "2 hours"
        };
        
        res.json({
            success: true,
            settings: seoSettings
        });
        
    } catch (error) {
        console.error('❌ SEO API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch SEO settings',
            message: error.message
        });
    }
});

module.exports = router;