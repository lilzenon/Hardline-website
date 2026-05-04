const query = require("../queries");
const path = require("path");
const fs = require("fs").promises;
const twilioService = require("../services/sms/twilio.service");
const phoneUtils = require("../services/contact-book/phone-utils.service");
const { body, validationResult } = require("express-validator");
const { getSiteDomain } = require("../utils/site-domain.util");

// Configure multer for image uploads
let multer, upload;

try {
    multer = require("multer");

    const storage = multer.diskStorage({
        destination: async function(req, file, cb) {
            const uploadDir = path.join(__dirname, "../../custom/images");
            try {
                await fs.mkdir(uploadDir, { recursive: true });
                cb(null, uploadDir);
            } catch (error) {
                cb(error);
            }
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
        }
    });

    const fileFilter = (req, file, cb) => {
        // Accept only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    };

    upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB limit
        }
    });
} catch (error) {
    console.warn('Multer not installed, file upload will be disabled:', error.message);
    // Fallback for when multer is not installed
    upload = {
        single: () => (req, res, next) => {
            console.warn('File upload attempted but multer is not installed');
            next();
        }
    };
}

async function getAdmin(req, res) {
    try {
        const settings = await query.homeSettings.getForAdmin();

        if (req.isHTML) {
            res.render("partials/admin/home_settings/table", {
                title: "home_settings",
                settings: settings
            });
            return;
        }

        return res.status(200).send(settings);
    } catch (error) {
        console.error("Error fetching home settings:", error);

        if (req.isHTML) {
            res.render("partials/admin/home_settings/table", {
                title: "home_settings",
                error: "Failed to load home settings",
                settings: null
            });
            return;
        }

        return res.status(500).send({ error: "Failed to load home settings" });
    }
}

async function update(req, res) {
    try {
        const updateData = {...req.body };

        // Handle file upload if present
        if (req.file) {
            updateData.event_image = `/images/${req.file.filename}`;
        }

        // Convert datetime-local format to proper datetime
        if (updateData.event_date) {
            updateData.event_date = new Date(updateData.event_date);
        }

        // Process enhanced address data from autocomplete system
        if (updateData.address_latitude && updateData.address_longitude) {
            updateData.address_latitude = parseFloat(updateData.address_latitude);
            updateData.address_longitude = parseFloat(updateData.address_longitude);
        }

        // Parse JSON fields if they exist
        if (updateData.address_components && typeof updateData.address_components === 'string') {
            try {
                updateData.address_components = JSON.parse(updateData.address_components);
            } catch (e) {
                console.warn('⚠️ Failed to parse address_components JSON:', e.message);
                updateData.address_components = null;
            }
        }

        if (updateData.address_data && typeof updateData.address_data === 'string') {
            try {
                updateData.address_data = JSON.parse(updateData.address_data);
            } catch (e) {
                console.warn('⚠️ Failed to parse address_data JSON:', e.message);
                updateData.address_data = null;
            }
        }

        // Set address validation timestamp if address was validated
        if (updateData.address_validated === 'true' || updateData.address_validated === true) {
            updateData.address_validated = true;
            updateData.address_validated_at = new Date();
        } else {
            updateData.address_validated = false;
        }

        console.log('🏠 Updating home settings with enhanced address data:', {
            hasCoordinates: !!(updateData.address_latitude && updateData.address_longitude),
            hasComponents: !!updateData.address_components,
            hasFormattedAddress: !!updateData.address_formatted,
            isValidated: updateData.address_validated
        });

        const settings = await query.homeSettings.update(updateData, req.user.id);

        if (req.isHTML) {
            res.setHeader("HX-Trigger", "reloadMainTable");
            res.render("partials/admin/home_settings/success", {
                message: "Home page settings updated successfully! Changes are now live on your home page."
            });
            return;
        }

        return res.status(200).send({
            message: "Home page settings updated successfully",
            settings: settings
        });
    } catch (error) {
        console.error("Error updating home settings:", error);

        if (req.isHTML) {
            res.render("partials/admin/home_settings/form", {
                error: "Failed to update home settings",
                settings: req.body
            });
            return;
        }

        return res.status(500).send({ error: "Failed to update home settings" });
    }
}

async function get(req, res) {
    try {
        const settings = await query.homeSettings.get();
        return res.status(200).send(settings);
    } catch (error) {
        console.error("Error fetching home settings:", error);
        return res.status(500).send({ error: "Failed to load home settings" });
    }
}

// 🚀 GET COMPLETE HOMEPAGE DATA FOR REFRESH
async function getHomepageData(req, res) {
    try {
        console.log('🔄 Fetching complete homepage data for refresh...');

        // Fetch all homepage data in parallel, scoped to this site's
        // domain so each public site only sees its own events.
        const siteDomain = getSiteDomain(req);
        const [homeSettings, featuredEvents, homepageEvents] = await Promise.all([
            query.homeSettings.get(),
            query.event.getFeaturedEvents({ limit: 20, domain: siteDomain }),
            // Return all events marked for homepage (active), no limit so Past can show everything
            query.event.getHomepageEvents({ domain: siteDomain })
        ]);

        // Format the date for display
        let formattedDate = "March 29th, 9:00 P.M.";
        if (homeSettings && homeSettings.event_date) {
            const eventDate = new Date(homeSettings.event_date);
            const options = {
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            };
            formattedDate = eventDate.toLocaleDateString('en-US', options)
                .replace(',', 'th,'); // Add 'th' suffix
        }

        console.log(`✅ Homepage data refreshed: ${featuredEvents.length} featured, ${homepageEvents.length} homepage events`);

        return res.status(200).send({
            homeSettings,
            featuredEvents,
            homepageEvents,
            formattedDate,
            totalCards: 1 + (featuredEvents?.length || 0) // kept for backward compatibility
        });
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        return res.status(500).send({ error: "Failed to load homepage data" });
    }
}

/**
 * Submit phone number from homepage Text Us section
 */
async function submitPhone(req, res) {
    try {
        const { phone, countryCode } = req.body;

        console.log('📱 Homepage phone submission:', { phone, countryCode });

        // Validate phone number
        if (!phone || !phone.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Phone number is required'
            });
        }

        // Clean and validate phone number format
        const cleanedPhone = phoneUtils.normalizePhone(phone);
        if (!cleanedPhone) {
            return res.status(400).json({
                success: false,
                error: 'Invalid phone number format'
            });
        }

        // Validate international phone number with country code
        const fullPhoneNumber = cleanedPhone.startsWith('+') ? cleanedPhone : `${countryCode || '+1'}${cleanedPhone.replace(/^\+/, '')}`;

        console.log('📱 Processed phone number:', {
            original: phone,
            cleaned: cleanedPhone,
            final: fullPhoneNumber
        });

        // Check if phone number is opted out
        const isOptedOut = await twilioService.isOptedOut(fullPhoneNumber);
        if (isOptedOut) {
            console.log(`📱 Phone ${fullPhoneNumber} is opted out - skipping verification`);
            return res.status(400).json({
                success: false,
                error: 'This phone number has opted out of SMS messages'
            });
        }

        // Check if this is a test phone number
        const isTestNumber = fullPhoneNumber.replace(/\D/g, '') === '5555555555';

        if (isTestNumber) {
            console.log(`🧪 Test verification started for ${fullPhoneNumber}`);

            return res.json({
                success: true,
                requiresVerification: true,
                message: 'Test verification code sent! Use code: 1234',
                phoneNumber: fullPhoneNumber,
                isTestMode: true
            });
        }

        // Start verification process using Twilio Verify API for real numbers
        const verificationResult = await twilioService.startVerification(fullPhoneNumber, 'sms');

        if (verificationResult.success) {
            console.log(`✅ Verification started for ${fullPhoneNumber} - SID: ${verificationResult.verificationSid}`);

            return res.json({
                success: true,
                requiresVerification: true,
                message: 'Verification code sent! Please check your phone.',
                phoneNumber: fullPhoneNumber,
                verificationSid: verificationResult.verificationSid
            });
        } else {
            console.error(`❌ Failed to start verification: ${verificationResult.error}`);
            return res.status(500).json({
                success: false,
                error: 'Failed to send verification code. Please try again.'
            });
        }

    } catch (error) {
        console.error('❌ Error in homepage phone submission:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error. Please try again.'
        });
    }
}

/**
 * Verify phone number with code from homepage Text Us section
 */
async function verifyPhone(req, res) {
    try {
        const { phone, code } = req.body;

        console.log('🔐 Homepage phone verification:', { phone, code: code ? '****' : 'missing' });

        // Validate inputs
        if (!phone || !phone.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Phone number is required'
            });
        }

        if (!code || !code.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Verification code is required'
            });
        }

        // Clean and validate phone number format
        const cleanedPhone = phoneUtils.normalizePhone(phone);
        if (!cleanedPhone) {
            return res.status(400).json({
                success: false,
                error: 'Invalid phone number format'
            });
        }

        // Validate code format (4 digits)
        const cleanedCode = code.trim().replace(/\D/g, '');
        if (cleanedCode.length !== 4) {
            return res.status(400).json({
                success: false,
                error: 'Verification code must be 4 digits'
            });
        }

        console.log('🔐 Verifying code for:', {
            phone: cleanedPhone,
            codeLength: cleanedCode.length
        });

        // Check if this is a test phone number
        const isTestNumber = cleanedPhone.replace(/\D/g, '') === '5555555555';

        if (isTestNumber) {
            console.log(`🧪 Test verification for ${cleanedPhone}`);

            if (cleanedCode === '1234') {
                console.log(`✅ Test phone verification successful for ${cleanedPhone}`);

                // Send test welcome message (just log it)
                console.log(`🎉 Test welcome message: Phone verified! Thanks for joining our VIP list!`);

                return res.json({
                    success: true,
                    verified: true,
                    message: 'Test phone number verified successfully! Welcome to our VIP list.',
                    phoneNumber: cleanedPhone,
                    isTestMode: true
                });
            } else {
                console.error(`❌ Test phone verification failed for ${cleanedPhone}: Invalid code`);
                return res.status(400).json({
                    success: false,
                    error: 'Invalid verification code. Use 1234 for test number.'
                });
            }
        }

        // Check verification code for real numbers
        const verificationResult = await twilioService.checkVerification(cleanedPhone, cleanedCode);

        if (verificationResult.success) {
            console.log(`✅ Phone verification successful for ${cleanedPhone}`);

            // Send welcome SMS after successful verification
            const welcomeMessage = `🎉 Phone verified! Thanks for joining our VIP list! You'll be the first to know about exclusive events, contests, and more from B2B.`;

            // Send welcome message (don't fail if this fails)
            twilioService.sendSMS(cleanedPhone, welcomeMessage).catch(error => {
                console.error('⚠️ Failed to send welcome message:', error);
            });

            // TODO: Store verified phone in database for future marketing campaigns
            // This could be added to a homepage_signups table or similar

            return res.json({
                success: true,
                verified: true,
                message: 'Phone number verified successfully! Welcome to our VIP list.',
                phoneNumber: cleanedPhone
            });
        } else {
            console.error(`❌ Phone verification failed for ${cleanedPhone}: ${verificationResult.error}`);
            return res.status(400).json({
                success: false,
                error: verificationResult.error || 'Invalid verification code'
            });
        }

    } catch (error) {
        console.error('❌ Error in homepage phone verification:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error. Please try again.'
        });
    }
}

/**
 * Resend verification code with rate limiting protection
 */
async function resendVerification(req, res) {
    try {
        const { phoneNumber } = req.body;

        console.log('🔄 Homepage resend verification request:', { phoneNumber });

        // Validate phone number
        if (!phoneNumber || !phoneNumber.trim()) {
            return res.status(400).json({
                success: false,
                error: 'Phone number is required'
            });
        }

        // Clean and validate phone number format
        const cleanedPhone = phoneUtils.normalizePhone(phoneNumber);
        if (!cleanedPhone) {
            return res.status(400).json({
                success: false,
                error: 'Invalid phone number format'
            });
        }

        // Rate limiting: Check if we've sent a verification recently
        const rateLimitKey = `resend_verification:${cleanedPhone}`;
        const lastSentTime = global.resendRateLimit ? global.resendRateLimit.get(rateLimitKey) : null;
        const now = Date.now();
        const cooldownPeriod = 60000; // 60 seconds

        if (lastSentTime && (now - lastSentTime) < cooldownPeriod) {
            const remainingTime = Math.ceil((cooldownPeriod - (now - lastSentTime)) / 1000);
            console.log(`⏰ Rate limit hit for ${cleanedPhone}, ${remainingTime}s remaining`);

            return res.status(429).json({
                success: false,
                error: `Please wait ${remainingTime} seconds before requesting another code`,
                remainingTime: remainingTime
            });
        }

        // Initialize rate limit storage if not exists
        if (!global.resendRateLimit) {
            global.resendRateLimit = new Map();
        }

        // Set rate limit
        global.resendRateLimit.set(rateLimitKey, now);

        // Clean up old entries (older than 5 minutes)
        for (const [key, timestamp] of global.resendRateLimit.entries()) {
            if (now - timestamp > 300000) { // 5 minutes
                global.resendRateLimit.delete(key);
            }
        }

        // Check if this is a test phone number
        const isTestNumber = cleanedPhone.replace(/\D/g, '') === '5555555555';

        if (isTestNumber) {
            console.log(`🧪 Test resend verification for ${cleanedPhone}`);

            return res.json({
                success: true,
                message: 'Test verification code resent! Use code: 1234',
                phoneNumber: cleanedPhone,
                isTestMode: true
            });
        }

        // Resend verification code using Twilio Verify API for real numbers
        const verificationResult = await twilioService.startVerification(cleanedPhone, 'sms');

        if (verificationResult.success) {
            console.log(`✅ Verification code resent for ${cleanedPhone} - SID: ${verificationResult.verificationSid}`);

            return res.json({
                success: true,
                message: 'Verification code resent! Please check your phone.',
                phoneNumber: cleanedPhone,
                verificationSid: verificationResult.verificationSid
            });
        } else {
            console.error(`❌ Failed to resend verification: ${verificationResult.error}`);
            return res.status(500).json({
                success: false,
                error: 'Failed to resend verification code. Please try again.'
            });
        }

    } catch (error) {
        console.error('❌ Error in resend verification:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error. Please try again.'
        });
    }
}

module.exports = {
    getAdmin,
    update,
    get,
    getHomepageData,
    submitPhone,
    verifyPhone,
    resendVerification,
    upload
};