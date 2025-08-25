const { Router } = require("express");

const router = Router();

// Simple test route to verify routing works
router.get("/hello", (req, res) => {
    res.json({ 
        success: true, 
        message: "Test route works perfectly!", 
        timestamp: new Date().toISOString() 
    });
});

// Another test route
router.get("/world", (req, res) => {
    res.json({ 
        success: true, 
        message: "World route works!", 
        timestamp: new Date().toISOString() 
    });
});

module.exports = router;
