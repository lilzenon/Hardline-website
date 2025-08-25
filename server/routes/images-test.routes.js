/**
 * Test Images Routes - Minimal version to test route registration
 */

const express = require('express');
const router = express.Router();

// Simple test route without dependencies
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Images routes are working!',
        timestamp: new Date().toISOString()
    });
});

router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Images test route working!',
        routes: [
            'GET /api/images/',
            'GET /api/images/test',
            'POST /api/images/upload (not implemented in test)',
            'GET /api/images/serve/:uuid/:variant (not implemented in test)'
        ]
    });
});

module.exports = router;
