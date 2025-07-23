const query = require("../queries");
const path = require("path");
const fs = require("fs").promises;
const twilioService = require("../services/sms/twilio.service");
const phoneUtils = require("../services/contact-book/phone-utils.service");
const { body, validationResult } = require("express-validator");

// Configure multer for image uploads
let multer, upload;

try {
    multer = require("multer");

    const storage = multer.diskStorage({
        destination: async function(req, file, cb) {
            const uploadDir = path.join(__dirname, "../../static/images/home");
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
            updateData.event_image = `/images/home/${req.file.filename}`;
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

        // Get home settings
        const homeSettings = await query.homeSettings.get();

        // Get featured events
        const featuredEvents = await query.event.getFeaturedEvents({ limit: 6 });

        // Format the date for display
        let formattedDate = "March 29th, 9:00 P.M.";
        if (homeSettings.event_date) {
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

        console.log(`✅ Homepage data refreshed: ${featuredEvents.length} featured events`);

        return res.status(200).send({
            homeSettings,
            featuredEvents,
            formattedDate,
            totalCards: 1 + featuredEvents.length // 1 default + featured events
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
            console.log(`📱 Phone ${fullPhoneNumber} is opted out - skipping SMS`);
            return res.status(400).json({
                success: false,
                error: 'This phone number has opted out of SMS messages'
            });
        }

        // Send welcome SMS
        const welcomeMessage = `🎉 Thanks for joining our VIP list! You'll be the first to know about exclusive events, contests, and more from B2B.`;

        const smsResult = await twilioService.sendSMS(fullPhoneNumber, welcomeMessage);

        if (smsResult.success) {
            console.log(`✅ Homepage SMS sent successfully - SID: ${smsResult.messageSid}`);

            // TODO: Store in database for future marketing campaigns
            // This could be added to a homepage_signups table or similar

            return res.json({
                success: true,
                message: 'Phone number submitted successfully! Check your phone for a confirmation message.',
                messageSid: smsResult.messageSid
            });
        } else {
            console.error(`❌ Homepage SMS failed: ${smsResult.error}`);
            return res.status(500).json({
                success: false,
                error: 'Failed to send confirmation message. Please try again.'
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

module.exports = {
    getAdmin,
    update,
    get,
    getHomepageData,
    submitPhone,
    upload
};