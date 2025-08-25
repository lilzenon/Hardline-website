const { Router } = require("express");

const router = Router();

console.log('🚀 DEBUG TEST ROUTES LOADING!');

// Simple test route to verify routing works
router.get("/working", (req, res) => {
    console.log('🎯 DEBUG TEST ROUTE HIT!');
    res.json({ 
        success: true, 
        message: "Debug test route is working perfectly!", 
        timestamp: new Date().toISOString(),
        route: "/api/debug-test/working"
    });
});

// Reset test route
router.get("/reset-test", (req, res) => {
    console.log('🎯 RESET TEST ROUTE HIT!');
    res.json({ 
        success: true, 
        message: "Reset test route works!", 
        timestamp: new Date().toISOString(),
        route: "/api/debug-test/reset-test"
    });
});

console.log('✅ DEBUG TEST ROUTES LOADED!');

module.exports = router;
