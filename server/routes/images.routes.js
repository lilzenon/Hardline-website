/**
 * Minimal Image Routes for Homepage
 * Provides basic image serving functionality without upload/management features
 * The homepage primarily serves content, image management is handled by the dashboard
 */

const express = require('express');
const router = express.Router();

console.log('🔍 Homepage images.routes.js loaded - minimal image serving only');

// Basic CORS headers for image serving
function setCORSHeaders(req, res) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Range',
        'Cross-Origin-Resource-Policy': 'cross-origin'
    });
}

// Apply CORS to all image routes
router.use((req, res, next) => {
    setCORSHeaders(req, res);
    next();
});

// Handle CORS preflight requests
router.options('*', (req, res) => {
    setCORSHeaders(req, res);
    res.status(200).end();
});

// Redirect image serving requests to dashboard
router.get('/serve/:uuid/:variant?', (req, res) => {
    const { uuid, variant } = req.params;
    const dashboardDomain = 'https://admin.b2b.click';
    const redirectUrl = variant 
        ? `${dashboardDomain}/api/images/serve/${uuid}/${variant}`
        : `${dashboardDomain}/api/images/serve/${uuid}`;
    
    console.log(`🔄 Homepage: Redirecting image request to dashboard: ${redirectUrl}`);
    res.redirect(redirectUrl);
});

// Health check endpoint
router.get('/health', (req, res) => {
    setCORSHeaders(req, res);
    res.json({
        status: 'ok',
        service: 'homepage-images',
        message: 'Image serving redirects to dashboard',
        timestamp: new Date().toISOString()
    });
});

// Catch-all for other image routes - redirect to dashboard
router.use('*', (req, res) => {
    const dashboardDomain = 'https://admin.b2b.click';
    const redirectUrl = `${dashboardDomain}/api/images${req.originalUrl.replace('/api/images', '')}`;
    
    console.log(`🔄 Homepage: Redirecting unknown image request to dashboard: ${redirectUrl}`);
    res.redirect(redirectUrl);
});

module.exports = router;
