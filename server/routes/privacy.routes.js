const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { 
    handleConsentRequest, 
    getPrivacyStatus,
    cleanupExpiredData 
} = require("../middleware/privacy.middleware");
const { requireAuth } = require("../middleware");

const router = Router();

// POST /api/privacy/consent - Set analytics consent
router.post(
    "/consent",
    asyncHandler(handleConsentRequest)
);

// GET /api/privacy/status - Get current privacy settings and consent status
router.get(
    "/status",
    asyncHandler(getPrivacyStatus)
);

// POST /api/privacy/cleanup - Manual data cleanup (admin only)
router.post(
    "/cleanup",
    requireAuth,
    asyncHandler(async (req, res) => {
        try {
            // Only allow admin users to trigger manual cleanup
            if (req.user.role !== 'admin') {
                return res.status(403).json({
                    success: false,
                    message: 'Admin access required'
                });
            }
            
            const result = await cleanupExpiredData();
            
            res.json({
                success: true,
                message: 'Data cleanup completed successfully',
                data: result
            });
        } catch (error) {
            console.error('🚨 Manual data cleanup failed:', error);
            res.status(500).json({
                success: false,
                message: 'Data cleanup failed'
            });
        }
    })
);

// GET /api/privacy/policy - Get privacy policy information
router.get(
    "/policy",
    asyncHandler(async (req, res) => {
        res.json({
            success: true,
            data: {
                lastUpdated: "2025-07-01",
                version: "1.0",
                dataCollection: {
                    pageViews: "We collect page view data to understand how visitors interact with events",
                    deviceInfo: "Device and browser information for analytics and optimization",
                    location: "General location data (country/city) for geographic insights",
                    qrScans: "QR code scan tracking for event engagement metrics"
                },
                dataRetention: {
                    pageViews: "365 days",
                    sessions: "90 days", 
                    qrScans: "730 days"
                },
                userRights: [
                    "Right to consent or withdraw consent",
                    "Right to data portability (export your data)",
                    "Right to deletion (contact support)",
                    "Right to opt-out via Do Not Track header"
                ],
                contact: {
                    email: "privacy@kutt.it",
                    subject: "Privacy Inquiry"
                }
            }
        });
    })
);

// DELETE /api/privacy/data - Request data deletion (GDPR compliance)
router.delete(
    "/data",
    asyncHandler(async (req, res) => {
        try {
            const { email, reason } = req.body;
            
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: 'Email address is required for data deletion request'
                });
            }
            
            // Log the deletion request for manual processing
            console.log(`🗑️ Data deletion request received:
                Email: ${email}
                Reason: ${reason || 'Not specified'}
                Timestamp: ${new Date().toISOString()}
                IP: ${req.ip}`);
            
            // In a production system, this would:
            // 1. Verify the email belongs to the requester
            // 2. Queue the deletion request for review
            // 3. Send confirmation email
            // 4. Process deletion after verification
            
            res.json({
                success: true,
                message: 'Data deletion request received. You will be contacted within 30 days regarding the processing of your request.',
                requestId: `DEL-${Date.now()}`,
                estimatedProcessingTime: '30 days'
            });
            
        } catch (error) {
            console.error('🚨 Error processing data deletion request:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to process data deletion request'
            });
        }
    })
);

module.exports = router;
