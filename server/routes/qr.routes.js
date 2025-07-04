const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const query = require("../queries");

const router = Router();

// GET /:qr_identifier - QR code tracking and redirect
router.get(
    "/:qr_identifier",
    asyncHandler(async(req, res) => {
        const { qr_identifier } = req.params;
        const analyticsQueries = require("../queries/analytics.queries");

        try {
            console.log(`🎯 QR code access: ${qr_identifier}`);
            
            // Find QR code by identifier (new multi-QR system)
            let qrCode = await analyticsQueries.getQRCodeByIdentifier(qr_identifier);
            let foundEvent = null;

            if (qrCode) {
                // Get the associated event
                foundEvent = await query.event.findOne({ id: qrCode.event_id });
                console.log(`🔍 Found QR code ${qr_identifier} for event: ${foundEvent?.slug}`);
            } else {
                // Fallback to legacy QR code system
                foundEvent = await query.event.findByQRIdentifier(qr_identifier);
                console.log(`🔍 Legacy QR lookup for ${qr_identifier}: ${foundEvent?.slug}`);
            }

            if (!foundEvent) {
                console.log(`🚨 QR code not found: ${qr_identifier}`);
                // Redirect to home page instead of showing JSON error
                return res.redirect('/?error=invalid_qr');
            }

            // Track the QR code scan with enhanced analytics
            const { UAParser } = require('ua-parser-js');
            const geoip = require('geoip-lite');

            const userAgent = req.get('User-Agent');
            const ipAddress = req.ip || req.connection.remoteAddress;
            const referrer = req.get('Referrer');

            // Parse user agent for device info
            const parser = new UAParser(userAgent);
            const agent = parser.getResult();
            const deviceType = agent.device.type === 'tablet' ? 'tablet' :
                (agent.device.type === 'mobile' || (agent.os.name && agent.os.name.includes('Android')) || (agent.os.name && agent.os.name.includes('iOS'))) ? 'mobile' : 'desktop';

            // Get location info
            const geo = geoip.lookup(ipAddress);

            // Track the scan in the QR code scans table
            await query.event.trackQRCodeScan({
                event_id: foundEvent.id,
                user_agent: userAgent,
                ip_address: ipAddress,
                referrer: referrer,
                device_type: deviceType,
                browser_name: agent.browser.name,
                os_name: agent.os.name,
                country_code: geo ? geo.country : null,
                city: geo ? geo.city : null
            });

            // Increment QR code scan count if using new system
            if (qrCode) {
                await analyticsQueries.incrementQRCodeScanCount(qrCode.id);
            }

            // Determine redirect URL
            let redirectUrl = `/event/${foundEvent.slug}?qr=1`;
            if (qrCode && qrCode.custom_url) {
                redirectUrl = qrCode.custom_url;
            } else if (foundEvent.qr_code_custom_url) {
                redirectUrl = foundEvent.qr_code_custom_url;
            }

            // Add QR identifier to URL for tracking
            if (qrCode) {
                redirectUrl += redirectUrl.includes('?') ? '&' : '?';
                redirectUrl += `qr=${qr_identifier}`;
            }

            console.log(`🎯 QR code scan tracked: ${qr_identifier} -> ${foundEvent.slug}`);
            console.log(`🔄 Redirecting to: ${redirectUrl}`);

            // Redirect to event page with 302 (temporary redirect)
            res.redirect(302, redirectUrl);

        } catch (error) {
            console.error('🚨 Error tracking QR code scan:', error);
            // Even if tracking fails, still try to redirect to home page
            res.redirect('/?error=qr_tracking_failed');
        }
    })
);

module.exports = router;
