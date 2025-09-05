const { body, param, query } = require("express-validator");
const validator = require("validator");
// Import event queries with comprehensive fallback handling
let event;
try {
    const queries = require("../queries");
    event = queries.event;
} catch (error) {
    console.warn('⚠️ Failed to import from ../queries:', error.message);
}

// Backup direct import in case of module loading issues
const eventQueries = require("../queries/event.queries");
// Additional fallback - direct knex import
const knex = require("../knex");

// Create a robust event service that always works
const eventService = (() => {
    if (event && typeof event.findOne === 'function') {
        console.log('✅ Using main event service from queries');
        return event;
    } else if (eventQueries && typeof eventQueries.findOne === 'function') {
        console.log('✅ Using backup eventQueries service');
        return eventQueries;
    } else {
        console.warn('⚠️ Using direct knex fallback for event operations');
        return {
            findOne: async (match) => {
                return await knex("events").where(match).first();
            },
            update: async (id, data) => {
                await knex("events").where("id", id).update(data);
                return await knex("events").where("id", id).first();
            },
            create: async (data) => {
                const [id] = await knex("events").insert(data);
                return await knex("events").where("id", id).first();
            },
            remove: async (id) => {
                return await knex("events").where("id", id).del();
            },
            find: async (match = {}) => {
                const query = knex("events");
                if (match && Object.keys(match).length > 0) {
                    query.where(match);
                }
                return await query.orderBy("created_at", "desc");
            },
            findWithStats: async (match) => {
                const eventRecord = await knex("events").where(match).first();
                if (!eventRecord) return null;

                const signupCount = await knex("event_signups")
                    .where("event_id", eventRecord.id)
                    .count("* as count")
                    .first();

                return {
                    ...eventRecord,
                    signup_count: parseInt(signupCount.count) || 0
                };
            },
            findSignups: async (eventId, options = {}) => {
                const query = knex("event_signups").where("event_id", eventId);
                if (options.limit) query.limit(options.limit);
                if (options.offset) query.offset(options.offset);
                return await query.orderBy("created_at", "desc");
            },
            createSignup: async (eventId, signupData) => {
                const data = { event_id: eventId, ...signupData };
                const [id] = await knex("event_signups").insert(data);
                return await knex("event_signups").where("id", id).first();
            }
        };
    }
})();

// Replace the original event object with our robust service
event = eventService;

// Debug logging to verify service is working
console.log('🔍 Event service initialization:', {
    eventServiceType: typeof eventService,
    hasFindOne: typeof eventService?.findOne,
    hasUpdate: typeof eventService?.update,
    eventType: typeof event,
    eventHasFindOne: typeof event?.findOne
});
// Analytics queries moved to dashboard repository
const qrCodeService = require("../services/qr-code.service");
// Analytics middleware moved to dashboard repository
const { CustomError } = require("../utils");
const QRCode = require('qrcode');
const { nanoid } = require('nanoid');
const { generateQRId } = require("../utils/utils");
const { UAParser } = require('ua-parser-js');
const geoip = require('geoip-country'); // 🔧 FIXED: Updated from deprecated geoip-lite
const path = require("path");
const fs = require("fs").promises;
const env = require("../env");
const seo = require("../utils/seo.utils");

// Configure multer for social preview image uploads
let multer, uploadSocialPreviewImage;

try {
    multer = require("multer");

    const storage = multer.diskStorage({
        destination: async function(req, file, cb) {
            const uploadDir = path.join(env.STATIC_UPLOADS_DIR, 'images', 'social-previews');
            try {
                await fs.mkdir(uploadDir, { recursive: true });
                cb(null, uploadDir);
            } catch (error) {
                cb(error);
            }
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, 'social-preview-' + uniqueSuffix + path.extname(file.originalname));
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

    uploadSocialPreviewImage = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024 // 5MB limit
        }
    }).single('social_preview_image');

    // Cover image upload configuration
    const coverImageStorage = multer.diskStorage({
        destination: async function(req, file, cb) {
            const uploadDir = path.join(env.TEMP_UPLOADS_DIR);
            try {
                await fs.mkdir(uploadDir, { recursive: true });
                cb(null, uploadDir);
            } catch (error) {
                cb(error);
            }
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, 'cover-image-' + uniqueSuffix + path.extname(file.originalname));
        }
    });

    uploadCoverImage = multer({
        storage: coverImageStorage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 10 * 1024 * 1024 // 10MB limit for cover images
        }
    }).single('cover_image');
} catch (error) {
    console.warn('Multer not installed, image upload will be disabled:', error.message);
    // Fallback for when multer is not installed
    uploadSocialPreviewImage = (req, res, next) => {
        console.warn('Social preview image upload attempted but multer is not installed');
        next();
    };
    uploadCoverImage = (req, res, next) => {
        console.warn('Cover image upload attempted but multer is not installed');
        next();
    };
}

// Sanitizer function for checkbox values
const sanitizeCheckbox = value => value === true || value === "on" || value;

// Check if ticket fields exist in database
async function checkTicketFieldsExist() {
    try {
        const knex = require('../knex');
        const hasDisplayTickets = await knex.schema.hasColumn('events', 'display_tickets');
        const hasTicketPrice = await knex.schema.hasColumn('events', 'ticket_price');
        const hasPoshEmbedEnabled = await knex.schema.hasColumn('events', 'posh_embed_enabled');
        const hasExternalTicketUrl = await knex.schema.hasColumn('events', 'external_ticket_url');
        const hasBuyButtonText = await knex.schema.hasColumn('events', 'buy_button_text');
        return hasDisplayTickets && hasTicketPrice && hasPoshEmbedEnabled && hasExternalTicketUrl && hasBuyButtonText;
    } catch (error) {
        console.warn('⚠️ Could not check ticket fields existence:', error.message);
        return false;
    }
}

// Validation rules
const createEventValidation = [
    body("title")
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters"),
    body("description")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Description must be less than 1000 characters"),
    body("subtitle")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Subtitle must be less than 500 characters"),
    body("sub_header")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Sub-header must be less than 500 characters"),
    body("sub_header_title")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Sub-header title must be less than 100 characters"),
    body("slug")
    .optional()
    .isLength({ max: 100 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Slug must contain only lowercase letters, numbers, and hyphens"),
    body("background_color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Background color must be a valid hex color"),
    body("card_color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Card color must be a valid hex color"),
    body("title_color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Title color must be a valid hex color"),
    body("description_color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Description color must be a valid hex color"),
    body("button_color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Button color must be a valid hex color"),
    body("overscroll_background_color")
    .optional()
    .matches(/^#[0-9A-Fa-f]{6}$/)
    .withMessage("Overscroll background color must be a valid hex color"),
    body("button_text")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Button text must be less than 50 characters"),
    body("rsvp_title")
    .optional()
    .isLength({ max: 30 })
    .withMessage("RSVP title must be less than 30 characters")
    .trim(),
    body("collect_email")
    .optional()
    .isBoolean()
    .withMessage("Collect email must be a boolean"),
    body("collect_phone")
    .optional()
    .isBoolean()
    .withMessage("Collect phone must be a boolean"),
    body("is_active")
    .optional()
    .isBoolean()
    .withMessage("Is active must be a boolean"),
    body("artist_name")
    .optional()
    .isLength({ max: 100 })
    .withMessage("Artist name must be less than 100 characters")
    .trim(),
    body("event_date")
    .optional()
    .isISO8601()
    .withMessage("Event date must be a valid date"),
    body("event_address")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Event address must be less than 200 characters")
    .trim(),
    body("show_on_homepage")
    .optional()
    .isBoolean()
    .withMessage("Show on homepage must be a boolean"),
    body("posh_embed_url")
    .optional()
    .custom((value, { req }) => {
        // Only validate if posh_embed_enabled is true and value is provided
        if (req.body.posh_embed_enabled && value && value.trim() !== '') {
            if (!validator.isURL(value)) {
                throw new Error('Posh embed URL must be a valid URL');
            }
            if (value.length > 2040) {
                throw new Error('Posh embed URL must be less than 2040 characters');
            }
        }
        return true;
    }),
    body("qr_code_enabled")
    .optional()
    .isBoolean()
    .withMessage("QR code enabled must be a boolean"),
    body("qr_code_custom_url")
    .optional()
    .isURL()
    .withMessage("QR code custom URL must be a valid URL")
    .isLength({ max: 2040 })
    .withMessage("QR code custom URL must be less than 2040 characters"),
    body("display_tickets")
    .optional()
    .isBoolean()
    .withMessage("Display tickets must be a boolean"),
    body("ticket_price")
    .optional()
    .isLength({ max: 50 })
    .withMessage("Ticket price must be less than 50 characters")
    .trim(),
    body("posh_embed_enabled")
    .optional()
    .isBoolean()
    .withMessage("Posh embed enabled must be a boolean"),
    body("external_ticket_url")
    .optional()
    .custom((value, { req }) => {
        // Only validate if posh_embed_enabled is false and value is provided
        if (!req.body.posh_embed_enabled && value && value.trim() !== '') {
            if (!validator.isURL(value)) {
                throw new Error('External ticket URL must be a valid URL');
            }
            if (value.length > 2040) {
                throw new Error('External ticket URL must be less than 2040 characters');
            }
        }
        return true;
    }),
    body("buy_button_text")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage("Buy button text must be between 1 and 30 characters")
    .trim(),
    body("button_title")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 1, max: 50 })
    .withMessage("Button title must be between 1 and 50 characters")
    .trim(),

    // Social Media Preview Fields
    body("social_preview_enabled")
    .optional()
    .isBoolean()
    .withMessage("Social preview enabled must be a boolean"),

    // Open Graph fields
    body("og_title")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 90 })
    .withMessage("Open Graph title must be 90 characters or less (optimal: 30-60)")
    .trim(),
    body("og_description")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 300 })
    .withMessage("Open Graph description must be 300 characters or less (optimal: 55-200)")
    .trim(),
    body("og_image")
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage("Open Graph image must be a valid URL")
    .isLength({ max: 2040 })
    .withMessage("Open Graph image URL too long"),

    // Twitter Card fields
    body("twitter_title")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 70 })
    .withMessage("Twitter title must be 70 characters or less (optimal: 30-60)")
    .trim(),
    body("twitter_description")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 200 })
    .withMessage("Twitter description must be 200 characters or less (optimal: 55-200)")
    .trim(),
    body("twitter_image")
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage("Twitter image must be a valid URL")
    .isLength({ max: 2040 })
    .withMessage("Twitter image URL too long"),

    // iOS Messages fields
    body("ios_title")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 90 })
    .withMessage("iOS title must be 90 characters or less")
    .trim(),
    body("ios_description")
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ max: 500 })
    .withMessage("iOS description must be 500 characters or less")
    .trim(),
    body("ios_image")
    .optional({ nullable: true, checkFalsy: true })
    .isURL()
    .withMessage("iOS image must be a valid URL")
    .isLength({ max: 2040 })
    .withMessage("iOS image URL too long"),
];

const updateEventValidation = [
    param("id").isInt().withMessage("Event ID must be an integer"),
    ...createEventValidation
];

// Dynamic validation based on event settings
async function createSignupValidation(req, res, next) {
    const { slug } = req.params;

    try {
        // Get the drop to check its collection settings
        const foundEvent = await event.findBySlug(slug);

        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        console.log('📋 Event collection settings:', {
            collect_email: foundEvent.collect_email,
            collect_phone: foundEvent.collect_phone
        });

        // Create dynamic validation rules based on event settings
        const validationRules = [
            param("slug")
            .isLength({ min: 1, max: 100 })
            .withMessage("Invalid drop slug")
        ];

        // Add email validation only if email collection is enabled
        if (foundEvent.collect_email) {
            validationRules.push(
                body("email")
                .isEmail()
                .normalizeEmail()
                .withMessage("Valid email is required")
            );
            console.log('📧 Email validation enabled for this event');
        } else {
            console.log('📧 Email validation disabled for this event');
        }

        // PRIORITY 3: Enhanced international phone validation
        if (foundEvent.collect_phone) {
            validationRules.push(
                body("phone")
                .custom((value) => {
                    if (!value) {
                        throw new Error('Phone number is required for this event');
                    }

                    console.log('📱 Server validating international phone number:', value);

                    // International phone number patterns
                    const internationalPatterns = {
                        '+1': /^\+1\d{10}$/, // US/Canada: +1XXXXXXXXXX
                        '+44': /^\+44\d{10,11}$/, // UK: +44XXXXXXXXXX or +44XXXXXXXXXXX
                        '+49': /^\+49\d{10,12}$/, // Germany: +49XXXXXXXXXX to +49XXXXXXXXXXXX
                        '+33': /^\+33\d{9,10}$/, // France: +33XXXXXXXXX or +33XXXXXXXXXX
                        '+34': /^\+34\d{9}$/, // Spain: +34XXXXXXXXX
                        '+39': /^\+39\d{9,11}$/, // Italy: +39XXXXXXXXX to +39XXXXXXXXXXX
                        '+61': /^\+61\d{9}$/, // Australia: +61XXXXXXXXX
                        '+81': /^\+81\d{10,11}$/, // Japan: +81XXXXXXXXXX or +81XXXXXXXXXXX
                        '+82': /^\+82\d{9,11}$/, // South Korea: +82XXXXXXXXX to +82XXXXXXXXXXX
                        '+55': /^\+55\d{10,11}$/, // Brazil: +55XXXXXXXXXX or +55XXXXXXXXXXX
                        '+52': /^\+52\d{10}$/, // Mexico: +52XXXXXXXXXX
                        '+91': /^\+91\d{10}$/, // India: +91XXXXXXXXXX
                        '+86': /^\+86\d{11}$/ // China: +86XXXXXXXXXXX
                    };

                    const cleanPhone = value.replace(/[^\d+]/g, '');
                    console.log('📱 Cleaned international phone:', cleanPhone);

                    // Check if it matches any international pattern
                    for (const [countryCode, pattern] of Object.entries(internationalPatterns)) {
                        if (pattern.test(cleanPhone)) {
                            console.log(`📱 Phone validation passed: ${countryCode} format`);
                            return true;
                        }
                    }

                    // Fallback: Check for basic international format (+CC followed by 7-15 digits)
                    if (/^\+\d{1,4}\d{7,15}$/.test(cleanPhone)) {
                        console.log('📱 Phone validation passed: generic international format');
                        return true;
                    }

                    // Legacy support: Check for exactly 10 digits (US format without country code)
                    if (/^\d{10}$/.test(cleanPhone)) {
                        console.log('📱 Phone validation passed: legacy 10-digit format');
                        return true;
                    }

                    console.log('📱 Phone validation failed:', {
                        original: value,
                        cleaned: cleanPhone,
                        length: cleanPhone.length,
                        hasPlus: cleanPhone.includes('+')
                    });

                    // Provide specific error messages
                    if (cleanPhone.length === 0) {
                        throw new Error('Phone number cannot be empty');
                    } else if (!cleanPhone.startsWith('+')) {
                        throw new Error('International phone number must include country code (e.g., +1 for US)');
                    } else {
                        const countryCodeMatch = cleanPhone.match(/^\+\d{1,4}/);
                        const countryCode = countryCodeMatch ? countryCodeMatch[0] : 'unknown';
                        throw new Error(`Invalid phone format for ${countryCode}. Please check the number and try again.`);
                    }
                })
                .withMessage("Please enter a valid international phone number with country code")
            );
            console.log('📱 Phone validation enabled for this event');
        } else {
            // Phone is optional if not required by drop - use same international validation
            validationRules.push(
                body("phone")
                .optional()
                .custom((value) => {
                    if (!value) return true; // Optional field

                    console.log('📱 Server validating optional international phone:', value);

                    // Use same international patterns as required validation
                    const internationalPatterns = {
                        '+1': /^\+1\d{10}$/, // US/Canada
                        '+44': /^\+44\d{10,11}$/, // UK
                        '+49': /^\+49\d{10,12}$/, // Germany
                        '+33': /^\+33\d{9,10}$/, // France
                        '+34': /^\+34\d{9}$/, // Spain
                        '+39': /^\+39\d{9,11}$/, // Italy
                        '+61': /^\+61\d{9}$/, // Australia
                        '+81': /^\+81\d{10,11}$/, // Japan
                        '+82': /^\+82\d{9,11}$/, // South Korea
                        '+55': /^\+55\d{10,11}$/, // Brazil
                        '+52': /^\+52\d{10}$/, // Mexico
                        '+91': /^\+91\d{10}$/, // India
                        '+86': /^\+86\d{11}$/ // China
                    };

                    const cleanPhone = value.replace(/[^\d+]/g, '');
                    console.log('📱 Cleaned optional international phone:', cleanPhone);

                    // Check international patterns
                    for (const [countryCode, pattern] of Object.entries(internationalPatterns)) {
                        if (pattern.test(cleanPhone)) {
                            console.log(`📱 Optional phone validation passed: ${countryCode} format`);
                            return true;
                        }
                    }

                    // Fallback for generic international format
                    if (/^\+\d{1,4}\d{7,15}$/.test(cleanPhone)) {
                        console.log('📱 Optional phone validation passed: generic international format');
                        return true;
                    }

                    // Legacy support for 10-digit US numbers
                    if (/^\d{10}$/.test(cleanPhone)) {
                        console.log('📱 Optional phone validation passed: legacy 10-digit format');
                        return true;
                    }

                    // Same error handling as required validation
                    if (!cleanPhone.startsWith('+')) {
                        throw new Error('International phone number must include country code (e.g., +1 for US)');
                    } else {
                        const countryCodeMatch = cleanPhone.match(/^\+\d{1,4}/);
                        const countryCode = countryCodeMatch ? countryCodeMatch[0] : 'unknown';
                        throw new Error(`Invalid phone format for ${countryCode}. Please check the number and try again.`);
                    }
                })
                .withMessage("Please enter a valid international phone number with country code")
            );
            console.log('📱 Optional phone validation enabled for this event');
        }

        // Always allow name (optional)
        validationRules.push(
            body("name")
            .optional()
            .isLength({ max: 100 })
            .withMessage("Name must be less than 100 characters")
        );

        // Store the drop in request for later use
        req.foundEvent = foundEvent;

        // Apply the dynamic validation rules
        await Promise.all(validationRules.map(rule => rule.run(req)));

        next();
    } catch (error) {
        console.error('🚨 Error in dynamic signup validation:', error);
        next(error);
    }
}

// Create a new event
async function createEvent(req, res) {
    const userId = req.user.id;

    // Generate unique 4-character QR code identifier for new events
    const qrIdentifier = await generateQRId();

    const eventData = {
        ...req.body,
        user_id: userId,
        qr_code_identifier: qrIdentifier,
        qr_code_enabled: true // Enable QR codes by default for new events
    };

    try {
        const newEvent = await event.create(eventData);
        console.log('✅ Event created successfully:', newEvent.id);

        // Try to get event with stats, but fallback to basic event if it fails
        let eventWithStats;
        try {
            eventWithStats = await event.findWithStats({ id: newEvent.id });
            console.log('📈 Event with stats retrieved');
        } catch (statsError) {
            console.warn('⚠️ Failed to get event stats, using basic event data:', statsError.message);
            // Fallback to basic event data with signup_count: 0
            eventWithStats = {
                ...newEvent,
                signup_count: 0
            };
        }

        res.status(201).json({
            success: true,
            data: eventWithStats
        });
    } catch (error) {
        console.error('❌ Event creation error:', error);

        if (error.code === 'ER_DUP_ENTRY' || error.code === 'SQLITE_CONSTRAINT') {
            throw new CustomError("An event with this slug already exists", 400);
        }

        // Log the full error for debugging
        console.error('❌ Full error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });

        throw error;
    }
}

// Get user's events
async function getUserEvents(req, res) {
    const userId = req.user.id;
    const { limit = 20, offset = 0 } = req.query;

    const drops = await event.findByUserWithStats(userId, {
        limit: parseInt(limit),
        offset: parseInt(offset)
    });

    res.json({
        success: true,
        data: drops
    });
}

// Get single event
async function getEvent(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    const foundEvent = await event.findWithStats({ id, user_id: userId });

    if (!foundEvent) {
        throw new CustomError("Event not found", 404);
    }



    res.json({
        success: true,
        data: foundEvent
    });
}

// Update event with enhanced error handling and column validation
async function updateEvent(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if drop exists and belongs to user
    const existingEvent = await event.findOne({ id, user_id: userId });
    if (!existingEvent) {
        throw new CustomError("Event not found", 404);
    }

    try {
        // If slug is being updated, check if it conflicts with other events (not this one)
        if (req.body.slug && req.body.slug !== existingEvent.slug) {
            const conflictingEvent = await event.findBySlug(req.body.slug);
            if (conflictingEvent && conflictingEvent.id !== parseInt(id)) {
                throw new CustomError("An event with this slug already exists", 400);
            }
        }

        // Validate and sanitize update data to prevent column errors
        const sanitizedData = validateAndSanitizeEventData(req.body);

        console.log(`🔄 Updating event ${id} with data:`, Object.keys(sanitizedData));

        // Check if ticket fields are being updated but don't exist in database
        if ((sanitizedData.display_tickets !== undefined || sanitizedData.ticket_price !== undefined ||
                sanitizedData.posh_embed_enabled !== undefined || sanitizedData.external_ticket_url !== undefined ||
                sanitizedData.buy_button_text !== undefined)) {
            console.log('🎫 Ticket fields detected in update request');
            const ticketFieldsExist = await checkTicketFieldsExist();
            if (!ticketFieldsExist) {
                console.warn('⚠️ Ticket fields not found in database - removing from update');
                delete sanitizedData.display_tickets;
                delete sanitizedData.ticket_price;
                delete sanitizedData.posh_embed_enabled;
                delete sanitizedData.external_ticket_url;
                delete sanitizedData.buy_button_text;
                console.log('🔄 Updated sanitized data without ticket fields:', Object.keys(sanitizedData));
            }
        }

        // 🚀 DETECT HOMEPAGE TOGGLE CHANGES FOR REAL-TIME UPDATES
        const homepageToggleChanged = 'show_on_homepage' in sanitizedData &&
            sanitizedData.show_on_homepage !== existingEvent.show_on_homepage;

        if (homepageToggleChanged) {
            console.log(`🏠 Homepage toggle changed for event ${id}: ${existingEvent.show_on_homepage} → ${sanitizedData.show_on_homepage}`);
        }

        const updatedEvent = await event.update(id, sanitizedData);
        const eventWithStats = await event.findWithStats({ id: updatedEvent.id });

        console.log(`✅ Event ${id} updated successfully`);

        // 🚀 TRIGGER HOMEPAGE REFRESH IF TOGGLE CHANGED
        if (homepageToggleChanged) {
            try {
                // Broadcast homepage refresh event to all connected clients
                const io = req.app.get('io'); // Socket.io instance
                if (io) {
                    console.log(`📡 Broadcasting homepage refresh event...`);
                    io.emit('homepage-refresh', {
                        action: sanitizedData.show_on_homepage ? 'card-added' : 'card-removed',
                        eventId: parseInt(id),
                        eventData: sanitizedData.show_on_homepage ? eventWithStats : null
                    });
                } else {
                    console.log(`⚠️ Socket.io not available - skipping real-time update`);
                }
            } catch (broadcastError) {
                console.warn(`⚠️ Failed to broadcast homepage refresh:`, broadcastError.message);
                // Don't fail the update if broadcast fails
            }
        }

        res.json({
            success: true,
            data: eventWithStats,
            homepageRefreshNeeded: homepageToggleChanged // Flag for client-side handling
        });
    } catch (error) {
        console.error(`❌ Error updating event ${id}:`, error);

        if (error.code === 'ER_DUP_ENTRY' || error.code === 'SQLITE_CONSTRAINT') {
            throw new CustomError("A event with this slug already exists", 400);
        }

        // Handle PostgreSQL column errors
        if (error.code === '42703') {
            console.error('🚨 PostgreSQL column error:', error.message);
            console.error('🔍 Attempted to update with fields:', Object.keys(sanitizedData || {}));

            // Check if this is related to new ticket fields
            if (error.message.includes('display_tickets') || error.message.includes('ticket_price') ||
                error.message.includes('posh_embed_enabled') || error.message.includes('external_ticket_url') ||
                error.message.includes('buy_button_text')) {
                throw new CustomError("Database migration required: Please run 'npm run migrate' to add ticket purchasing fields", 400);
            }

            throw new CustomError(`Invalid field in update request: ${error.message}`, 400);
        }

        throw error;
    }
}

// Validate and sanitize event data to prevent database column errors
function validateAndSanitizeEventData(data) {
    // Define allowed columns based on actual database schema
    const allowedColumns = [
        'title',
        'subtitle',
        'description',
        'sub_header',
        'sub_header_title',
        'slug',
        'cover_image',
        'background_color',
        'overscroll_background_color',
        'text_color',
        'title_color',
        'description_color',
        'card_color',
        'button_color',
        'button_text_color',
        'form_field_color',
        'button_text',
        'button_title',
        'rsvp_title',
        'background_type',
        'card_background_type',
        'gradient_data',
        'custom_css',
        'is_active',
        'collect_email',
        'collect_phone',
        'website_link',
        'instagram_link',
        'twitter_link',
        'youtube_link',
        'spotify_link',
        'tiktok_link',
        'apple_music_url',
        'soundcloud_url',
        'artist_name',
        // Buy button colors (separate from RSVP button)
        'buy_button_color',
        'buy_button_text_color',
        'event_date',
        'event_address',
        'show_on_homepage',
        'posh_embed_url',
        // Enhanced address fields from autocomplete system
        'address_latitude',
        'address_longitude',
        'address_formatted',
        'address_components',
        'address_data',
        'address_validated',
        'address_validated_at',
        'display_tickets',
        'ticket_price',
        'posh_embed_enabled',
        'external_ticket_url',
        'buy_button_text',
        // Social Media Preview Fields
        'social_preview_enabled',
        'og_title',
        'og_description',
        'og_image',
        'twitter_title',
        'twitter_description',
        'twitter_image',
        'ios_title',
        'ios_description',
        'ios_image',
        // Featured event functionality
        'is_featured'
    ];

    const sanitizedData = {};

    // Only include fields that exist in the database schema
    for (const [key, value] of Object.entries(data)) {
        if (allowedColumns.includes(key)) {
            // Additional validation for specific field types
            if (key.includes('color') && value) {
                // Validate color format
                if (/^#[0-9A-F]{6}$/i.test(value)) {
                    sanitizedData[key] = value;
                } else {
                    console.warn(`⚠️ Invalid color format for ${key}: ${value}`);
                }
            } else if (key.includes('_link') || key.includes('_url') || key === 'cover_image') {
                // Validate URL format (optional)
                if (!value || value === '' || value === 'null' || isValidUrl(value)) {
                    sanitizedData[key] = (value && value !== 'null' && value.trim() !== '') ? value : null;
                } else {
                    console.warn(`⚠️ Invalid URL format for ${key}: ${value}`);
                }
            } else if (typeof value === 'boolean' || key === 'is_active' || key === 'collect_email' || key === 'collect_phone' || key === 'display_tickets' || key === 'posh_embed_enabled' || key === 'is_featured') {
                // Handle boolean fields
                sanitizedData[key] = Boolean(value);
            } else if (key === 'gradient_data') {
                // Handle gradient data - validate JSON format
                if (value && typeof value === 'string') {
                    try {
                        const parsed = JSON.parse(value);
                        if (parsed && typeof parsed === 'object') {
                            sanitizedData[key] = value; // Store as JSON string
                            console.log('🎨 Valid gradient data captured:', value);
                        } else {
                            console.warn(`⚠️ Invalid gradient data format: ${value}`);
                        }
                    } catch (error) {
                        console.warn(`⚠️ Invalid gradient data JSON: ${value}`, error.message);
                    }
                }
            } else if (key === 'address_latitude' || key === 'address_longitude') {
                // Handle coordinate fields - convert to float
                if (value && !isNaN(parseFloat(value))) {
                    sanitizedData[key] = parseFloat(value);
                } else if (value === '' || value === null) {
                    sanitizedData[key] = null;
                }
            } else if (key === 'address_components' || key === 'address_data') {
                // Handle JSON address fields
                if (value && typeof value === 'string') {
                    try {
                        const parsed = JSON.parse(value);
                        if (parsed && typeof parsed === 'object') {
                            sanitizedData[key] = parsed; // Store as JSON object
                        } else {
                            console.warn(`⚠️ Invalid ${key} format: ${value}`);
                        }
                    } catch (error) {
                        console.warn(`⚠️ Invalid ${key} JSON: ${value}`, error.message);
                    }
                } else if (value && typeof value === 'object') {
                    sanitizedData[key] = value; // Already an object
                } else if (value === '' || value === null) {
                    sanitizedData[key] = null;
                }
            } else if (key === 'address_validated') {
                // Handle boolean validation field
                sanitizedData[key] = Boolean(value === 'true' || value === true);
                // Set validation timestamp if validated
                if (sanitizedData[key]) {
                    sanitizedData['address_validated_at'] = new Date();
                }
            } else if (key === 'address_validated_at') {
                // Handle timestamp field
                if (value) {
                    sanitizedData[key] = new Date(value);
                } else {
                    sanitizedData[key] = null;
                }
            } else {
                // Include other valid fields
                sanitizedData[key] = value;
            }
        } else {
            console.warn(`⚠️ Ignoring unknown field: ${key} with value:`, value);
        }
    }

    console.log(`🔍 Sanitized ${Object.keys(data).length} fields to ${Object.keys(sanitizedData).length} valid fields`);

    return sanitizedData;
}

// URL validation helper
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Delete event
async function deleteEvent(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if drop exists and belongs to user
    const existingEvent = await event.findOne({ id, user_id: userId });
    if (!existingEvent) {
        throw new CustomError("Event not found", 404);
    }

    await event.remove(id);

    res.json({
        success: true,
        message: "Drop deleted successfully"
    });
}

// Public event signup
async function createSignup(req, res) {
    try {
        const { slug } = req.params;
        const { email, phone, name } = req.body;

        console.log(`🚀 Event signup attempt for slug: ${slug}`);
        console.log(`📧 Email: ${email || 'none'}`);
        console.log(`📱 Phone: ${phone || 'none'}`);
        console.log(`👤 Name: ${name || 'none'}`);

        // Use the drop that was already fetched in validation middleware
        const foundEvent = req.foundEvent;

        if (!foundEvent) {
            console.error(`❌ Event not found for slug: ${slug}`);
            throw new CustomError("Event not found", 404);
        }

        if (!foundEvent.is_active) {
            console.error(`❌ Drop is inactive: ${slug}`);
            throw new CustomError("Event is currently inactive", 404);
        }

        console.log(`✅ Using pre-fetched event: ${foundEvent.title} (ID: ${foundEvent.id})`);
        console.log(`📋 Event settings: collect_email=${foundEvent.collect_email}, collect_phone=${foundEvent.collect_phone}`);

        // Additional validation based on event settings
        if (foundEvent.collect_email && !email) {
            throw new CustomError("Email is required for this event", 400);
        }

        if (foundEvent.collect_phone && !phone) {
            throw new CustomError("Phone number is required for this event", 400);
        }

        // Check for duplicates based on what fields are collected
        if (email) {
            console.log(`🔍 Checking if email already signed up: ${email}`);
            const emailAlreadySignedUp = await event.isEmailSignedUp(foundEvent.id, email);
            if (emailAlreadySignedUp) {
                console.error(`❌ Email already signed up: ${email}`);
                throw new CustomError("Email already signed up for this event", 400);
            }
        } else {
            console.log(`🔍 Skipping email duplicate check - no email provided`);
        }

        // Check phone duplicates if phone is provided and email is not (phone-only signup)
        if (phone && !email) {
            console.log(`🔍 Checking if phone already signed up: ${phone}`);
            const phoneAlreadySignedUp = await event.isPhoneSignedUp(foundEvent.id, phone);
            if (phoneAlreadySignedUp) {
                console.error(`❌ Phone already signed up: ${phone}`);
                throw new CustomError("Phone number already signed up for this event", 400);
            }
        } else if (phone && email) {
            console.log(`🔍 Skipping phone duplicate check - email provided (email takes precedence)`);
        } else if (!phone) {
            console.log(`🔍 Skipping phone duplicate check - no phone provided`);
        }

        const signupData = {
            email,
            phone: phone || null,
            name: name || null,
            ip_address: req.ip,
            user_agent: req.get('User-Agent'),
            referrer: req.get('Referrer') || null
        };

        console.log(`📝 Creating signup with data:`, signupData);

        try {
            // Create signup in main database
            console.log(`💾 Inserting signup into database...`);
            const newSignup = await event.createSignup(foundEvent.id, signupData);
            console.log(`✅ Signup created successfully:`, newSignup);

            // 🚀 OPTIONAL CRM INTEGRATION (graceful fallback if CRM not available)
            try {
                const contactService = require('../services/crm/contact.service');
                await contactService.createFromDropSignup(signupData, foundEvent.id);
                console.log('✅ Contact created in CRM for event signup');
            } catch (crmError) {
                console.warn('⚠️ CRM integration failed (continuing without CRM):', crmError.message);
                // Continue without CRM - don't fail the signup
            }

            // 📱 PRODUCTION SMS CONFIRMATION (graceful fallback if SMS not available)
            try {
                const twilioService = require('../services/sms/twilio.service');

                if (phone) {
                    console.log(`📱 Sending SMS confirmation to ${phone}...`);

                    // Check if phone number is opted out
                    const isOptedOut = await twilioService.isOptedOut(phone);

                    if (isOptedOut) {
                        console.log(`📱 Phone ${phone} is opted out - skipping SMS`);
                    } else {
                        const smsResult = await twilioService.sendDropSignupConfirmation({ name, email, phone }, { id: foundEvent.id, title: foundEvent.title, slug: foundEvent.slug },
                            newSignup.id // Pass signup ID for tracking
                        );

                        if (smsResult.success) {
                            console.log(`✅ SMS confirmation sent successfully - SID: ${smsResult.messageSid}`);
                        } else {
                            console.warn(`⚠️ SMS confirmation failed: ${smsResult.error}`);
                        }
                    }
                } else {
                    console.log('📱 SMS not sent - no phone number provided');
                }
            } catch (smsError) {
                console.warn('⚠️ SMS service failed (continuing without SMS):', smsError.message);
                // Continue without SMS - don't fail the signup
            }

            // 📊 TRACK CONVERSION IN ANALYTICS
            try {
                if (req.analyticsSessionId) {
                    await trackConversion(req.analyticsSessionId, foundEvent.id);
                    console.log(`📊 Conversion tracked for session: ${req.analyticsSessionId}`);
                }
            } catch (analyticsError) {
                console.warn('⚠️ Analytics conversion tracking failed (continuing):', analyticsError.message);
            }

            console.log(`🎉 Signup process completed successfully for ${email}`);

            res.status(201).json({
                success: true,
                message: foundEvent.thank_you_message || "Thank you for signing up! You'll be notified when this event goes live."
            });
        } catch (dbError) {
            console.error(`🚨 Database error during signup creation:`, dbError);

            if (dbError.message.includes('already signed up')) {
                throw new CustomError("Email already signed up for this event", 400);
            }

            // Check for specific database errors
            if (dbError.code === 'ER_NO_SUCH_TABLE' || dbError.message.includes('no such table')) {
                console.error(`🚨 Table missing error - drop_signups table may not exist`);
                throw new CustomError("Database configuration error. Please contact support.", 500);
            }

            if (dbError.code === 'ER_DUP_ENTRY' || dbError.code === 'SQLITE_CONSTRAINT') {
                throw new CustomError("Email already signed up for this event", 400);
            }

            throw new CustomError("Database error occurred. Please try again.", 500);
        }
    } catch (error) {
        console.error(`🚨 Signup error for slug ${req.params.slug}:`, error);

        // If it's already a CustomError, just re-throw it
        if (error.name === 'CustomError') {
            throw error;
        }

        // For any other error, wrap it
        throw new CustomError("An unexpected error occurred. Please try again.", 500);
    }
}

// Get event signups (for event owner)
async function getEventSignups(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { limit = 50, offset = 0 } = req.query;

    // Check if drop belongs to user
    const foundEvent = await event.findOne({ id, user_id: userId });
    if (!foundEvent) {
        throw new CustomError("Event not found", 404);
    }

    const signups = await event.findSignups(id, {
        limit: parseInt(limit),
        offset: parseInt(offset)
    });

    res.json({
        success: true,
        data: signups
    });
}

// 🚀 LAYLO-STYLE ANALYTICS ENDPOINTS

// Get comprehensive fan analytics
async function getFanAnalytics(req, res) {
    const userId = req.user.id;
    const {
        limit = 100,
            offset = 0,
            search = '',
            sortBy = 'latest',
            eventId = null
    } = req.query;

    const options = {
        limit: parseInt(limit),
        offset: parseInt(offset),
        search: search.trim(),
        sortBy,
        eventId: eventId ? parseInt(eventId) : null
    };

    const analytics = await event.getFanAnalytics(userId, options);

    res.json({
        success: true,
        data: analytics
    });
}

// Get fan summary statistics
async function getFanSummaryStats(req, res) {
    try {
        const userId = req.user.id;
        const { eventId = null } = req.query;

        console.log(`🚀 Getting fan summary stats for user ${userId}, drop ${eventId}`);

        const stats = await event.getFanSummaryStats(userId, eventId ? parseInt(eventId) : null);

        console.log(`✅ Fan summary stats:`, stats);

        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('🚨 Error getting fan summary stats:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to get fan summary statistics'
        });
    }
}

// Get analytics for specific drop (for edit page)
async function getEventAnalytics(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { days = 30 } = req.query;

    try {
        // Check if drop belongs to user
        const foundEvent = await event.findWithStats({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        // Get comprehensive analytics
        const analytics = await analyticsQueries.getComprehensiveAnalytics(parseInt(id), parseInt(days));

        // Get QR code analytics
        const qrAnalytics = await event.getQRCodeAnalytics(parseInt(id), parseInt(days));

        // Get recent signups for this event
        const recentSignups = await event.findSignups(parseInt(id), { limit: 5 });

        // Combine analytics
        const combinedAnalytics = {
            ...analytics,
            qrCodeAnalytics: qrAnalytics,
            // Legacy compatibility
            views: analytics.totalViews,
            fans: analytics.conversions,
            conversionRate: analytics.conversionRate,
            recentSignups: recentSignups.map(signup => ({
                email: signup.email,
                phone: signup.phone,
                created_at: signup.created_at
            }))
        };

        res.json({
            success: true,
            data: combinedAnalytics
        });
    } catch (error) {
        console.error('🚨 Error getting event analytics:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to get event analytics'
        });
    }
}

// Generate QR code for event
async function generateEventQRCode(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { format = 'png', size = 256 } = req.query;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        if (!foundEvent.qr_code_enabled) {
            throw new CustomError("QR code is disabled for this event", 400);
        }

        // Generate QR code URL
        const baseUrl = process.env.DEFAULT_DOMAIN || req.get('host');
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : req.protocol;
        const qrUrl = foundEvent.qr_code_custom_url ||
            `${protocol}://${baseUrl}/event/${foundEvent.slug}?qr=${foundEvent.qr_code_identifier}`;

        // Generate QR code with optimal settings for maximum scannability
        const qrCodeOptions = {
            width: parseInt(size),
            margin: 4, // Increased margin for better scanning
            errorCorrectionLevel: 'H', // High error correction (30% recovery capability)
            type: format === 'svg' ? 'svg' : 'png',
            quality: 0.95, // High quality for PNG
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            // Additional options for better mobile scanning
            scale: 8, // Higher scale for crisp rendering
            border: 1 // Additional border for edge detection
        };

        if (format === 'svg') {
            const qrCodeSVG = await QRCode.toString(qrUrl, {
                ...qrCodeOptions,
                type: 'svg'
            });
            res.setHeader('Content-Type', 'image/svg+xml');
            res.send(qrCodeSVG);
        } else {
            const qrCodeBuffer = await QRCode.toBuffer(qrUrl, {
                ...qrCodeOptions,
                type: 'png'
            });
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', `attachment; filename="qr-code-${foundEvent.slug}.png"`);
            res.send(qrCodeBuffer);
        }

    } catch (error) {
        console.error('🚨 Error generating QR code:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to generate QR code'
        });
    }
}

// Get QR code data for event
async function getEventQRCodeData(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        // Generate QR code URL
        const baseUrl = process.env.DEFAULT_DOMAIN || req.get('host');
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : req.protocol;
        const qrUrl = foundEvent.qr_code_custom_url ||
            `${protocol}://${baseUrl}/event/${foundEvent.slug}?qr=${foundEvent.qr_code_identifier}`;

        res.json({
            success: true,
            data: {
                qr_code_enabled: foundEvent.qr_code_enabled,
                qr_code_identifier: foundEvent.qr_code_identifier,
                qr_code_url: qrUrl,
                qr_code_custom_url: foundEvent.qr_code_custom_url,
                download_urls: {
                    png_256: `${protocol}://${req.get('host')}/api/events/${id}/qr-code?format=png&size=256`,
                    png_512: `${protocol}://${req.get('host')}/api/events/${id}/qr-code?format=png&size=512`,
                    png_1024: `${protocol}://${req.get('host')}/api/events/${id}/qr-code?format=png&size=1024`,
                    svg: `${protocol}://${req.get('host')}/api/events/${id}/qr-code?format=svg`
                }
            }
        });

    } catch (error) {
        console.error('🚨 Error getting QR code data:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to get QR code data'
        });
    }
}

// Get QR code analytics for event
async function getEventQRCodeAnalytics(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { days = 30 } = req.query;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        // Get QR code scan analytics
        const analytics = await event.getQRCodeAnalytics(parseInt(id), parseInt(days));

        res.json({
            success: true,
            data: analytics
        });

    } catch (error) {
        console.error('🚨 Error getting QR code analytics:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to get QR code analytics'
        });
    }
}

// Track QR code scan
async function trackQRCodeScan(req, res) {
    const { qr_identifier } = req.params;
    const userAgent = req.get('User-Agent');
    const ipAddress = req.ip || req.connection.remoteAddress;
    const referrer = req.get('Referrer');

    try {
        // Find event by QR identifier
        const foundEvent = await event.findByQRIdentifier(qr_identifier);
        if (!foundEvent) {
            throw new CustomError("Invalid QR code", 404);
        }

        // Parse user agent for device info
        const parser = new UAParser(userAgent);
        const agent = parser.getResult();
        const deviceType = agent.device.type === 'tablet' ? 'tablet' :
            (agent.device.type === 'mobile' || (agent.os.name && agent.os.name.includes('Android')) || (agent.os.name && agent.os.name.includes('iOS'))) ? 'mobile' : 'desktop';

        // Get location info
        const geo = geoip.lookup(ipAddress);

        // Track the scan
        await event.trackQRCodeScan({
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

        // Redirect to event page
        res.redirect(`/event/${foundEvent.slug}?qr=1`);

    } catch (error) {
        console.error('🚨 Error tracking QR code scan:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to track QR code scan'
        });
    }
}

// ===== ENHANCED QR CODE MANAGEMENT =====

// Get all QR codes for an event
async function getEventQRCodes(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        const qrCodes = await qrCodeService.getEventQRCodesWithUrls(parseInt(id));

        res.json({
            success: true,
            data: qrCodes
        });
    } catch (error) {
        console.error('🚨 Error getting QR codes:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to get QR codes'
        });
    }
}

// Create a new QR code for an event
async function createEventQRCode(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, description, custom_url } = req.body;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        // Validate QR code data
        const qrCodeData = {
            name: name || 'QR Code',
            description: description || null,
            custom_url: custom_url || null
        };

        const validationErrors = qrCodeService.validateQRCodeData(qrCodeData);
        if (validationErrors.length > 0) {
            throw new CustomError(validationErrors.join(', '), 400);
        }

        const newQRCode = await qrCodeService.createEventQRCode(parseInt(id), qrCodeData);

        res.status(201).json({
            success: true,
            data: newQRCode
        });
    } catch (error) {
        console.error('🚨 Error creating QR code:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to create QR code'
        });
    }
}

// Update a QR code
async function updateEventQRCode(req, res) {
    const { id, qrId } = req.params;
    const userId = req.user.id;
    const { name, description, custom_url, is_active } = req.body;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (custom_url !== undefined) updateData.custom_url = custom_url;
        if (is_active !== undefined) updateData.is_active = is_active;

        const updatedQRCode = await analyticsQueries.updateQRCode(parseInt(qrId), updateData);

        res.json({
            success: true,
            data: updatedQRCode
        });
    } catch (error) {
        console.error('🚨 Error updating QR code:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to update QR code'
        });
    }
}

// Delete a QR code
async function deleteEventQRCode(req, res) {
    const { id, qrId } = req.params;
    const userId = req.user.id;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        await analyticsQueries.deleteQRCode(parseInt(qrId));

        res.json({
            success: true,
            message: 'QR code deleted successfully'
        });
    } catch (error) {
        console.error('🚨 Error deleting QR code:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to delete QR code'
        });
    }
}

// Generate QR code image for download
async function generateQRCodeImage(req, res) {
    const { id, qrId } = req.params;
    const userId = req.user.id;
    const { format = 'png', size = 512 } = req.query;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        // Get QR code
        const qrCodes = await analyticsQueries.getEventQRCodes(parseInt(id));
        const qrCode = qrCodes.find(qr => qr.id === parseInt(qrId));

        if (!qrCode) {
            throw new CustomError("QR code not found", 404);
        }

        const downloadData = await qrCodeService.generateQRCodeDownload(
            qrCode.identifier,
            format,
            size
        );

        res.setHeader('Content-Type', downloadData.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${downloadData.filename}"`);
        res.send(downloadData.data);

    } catch (error) {
        console.error('🚨 Error generating QR code image:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to generate QR code image'
        });
    }
}

// ===== ADVANCED ANALYTICS API ENDPOINTS =====

// Get detailed page view analytics
async function getEventPageViews(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { days = 30, limit = 100, offset = 0 } = req.query;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        const pageViews = await analyticsQueries.getEventPageViews(parseInt(id), {
            days: parseInt(days),
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        res.json({
            success: true,
            data: pageViews,
            pagination: {
                limit: parseInt(limit),
                offset: parseInt(offset),
                total: pageViews.length
            }
        });
    } catch (error) {
        console.error('🚨 Error getting page views:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to get page views'
        });
    }
}

// Get session analytics
async function getEventSessionAnalytics(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { days = 30 } = req.query;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        const sessions = await analyticsQueries.getSessionAnalytics(parseInt(id), parseInt(days));

        res.json({
            success: true,
            data: sessions
        });
    } catch (error) {
        console.error('🚨 Error getting session analytics:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to get session analytics'
        });
    }
}

// Export analytics data
async function exportEventAnalytics(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { days = 30, format = 'csv' } = req.query;

    try {
        // Check if event belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            throw new CustomError("Event not found", 404);
        }

        // Get comprehensive analytics data
        const analytics = await analyticsQueries.getComprehensiveAnalytics(parseInt(id), parseInt(days));
        const pageViews = await analyticsQueries.getEventPageViews(parseInt(id), { days: parseInt(days) });
        const sessions = await analyticsQueries.getSessionAnalytics(parseInt(id), parseInt(days));

        if (format === 'csv') {
            // Generate CSV
            const csvData = generateAnalyticsCSV(analytics, pageViews, sessions, foundEvent);

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename="analytics-${foundEvent.slug}-${new Date().toISOString().split('T')[0]}.csv"`);
            res.send(csvData);
        } else {
            // Return JSON
            res.json({
                success: true,
                data: {
                    event: foundEvent,
                    analytics,
                    pageViews,
                    sessions,
                    exportDate: new Date().toISOString()
                }
            });
        }
    } catch (error) {
        console.error('🚨 Error exporting analytics:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Failed to export analytics'
        });
    }
}

// Generate CSV from analytics data
function generateAnalyticsCSV(analytics, pageViews, sessions, event) {
    const lines = [];

    // Header
    lines.push('Event Analytics Export');
    lines.push(`Event: ${event.title}`);
    lines.push(`Slug: ${event.slug}`);
    lines.push(`Export Date: ${new Date().toISOString()}`);
    lines.push('');

    // Summary
    lines.push('Summary');
    lines.push('Metric,Value');
    lines.push(`Total Views,${analytics.totalViews}`);
    lines.push(`Unique Visitors,${analytics.uniqueVisitors}`);
    lines.push(`QR Scans,${analytics.qrScans}`);
    lines.push(`Unique QR Scans,${analytics.uniqueQrScans}`);
    lines.push(`Conversions,${analytics.conversions}`);
    lines.push(`Conversion Rate,${analytics.conversionRate}%`);
    lines.push('');

    // Page Views
    lines.push('Page Views');
    lines.push('Date,Time,IP Address,Device Type,Browser,OS,Country,City,Referrer,UTM Source');
    pageViews.forEach(view => {
        lines.push([
            new Date(view.view_timestamp).toLocaleDateString(),
            new Date(view.view_timestamp).toLocaleTimeString(),
            view.ip_address || '',
            view.device_type || '',
            view.browser_name || '',
            view.os_name || '',
            view.country_code || '',
            view.city || '',
            view.referrer || '',
            view.utm_source || ''
        ].join(','));
    });

    return lines.join('\n');
}

// 📱 Social Preview Image Upload Handler
async function handleSocialPreviewImageUpload(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user && req.user.id;

        // Check if event exists and belongs to user
        const foundEvent = await event.findOne({ id, user_id: userId });
        if (!foundEvent) {
            return res.status(404).json({
                error: "Event not found or access denied"
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                error: "No image file provided"
            });
        }

        // Validate image dimensions and format
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(req.file.mimetype)) {
            // Clean up uploaded file
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.warn('Failed to clean up invalid file:', unlinkError);
            }

            return res.status(400).json({
                error: "Invalid file type. Please upload JPG, PNG, or WebP images only."
            });
        }

        // Generate public URL for the uploaded image
        const imageUrl = `/static/images/social-previews/${req.file.filename}`;

        console.log('📱 Social preview image uploaded successfully:', {
            eventId: id,
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype,
            url: imageUrl
        });

        res.json({
            success: true,
            message: "Image uploaded successfully",
            imageUrl: imageUrl,
            filename: req.file.filename,
            size: req.file.size
        });

    } catch (error) {
        console.error('❌ Error uploading social preview image:', error);

        // Clean up uploaded file if it exists
        if (req.file && req.file.path) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.warn('Failed to clean up file after error:', unlinkError);
            }
        }

        res.status(500).json({
            error: "Failed to upload image",
            details: error.message
        });
    }
}

// Social media cache invalidation endpoint
async function invalidateSocialCache(req, res) {
    const { id } = req.params;
    const userId = req.user && req.user.id;

    const foundEvent = await event.findOne({ id, user_id: userId });

    if (!foundEvent) {
        throw new CustomError("Event not found", 404);
    }

    const eventUrl = `https://${env.DEFAULT_DOMAIN}/event/${foundEvent.slug}`;

    // Generate debugging information
    const debugInfo = {
        eventUrl,
        metaTags: seo.generateEventMetaTags(foundEvent),
        socialPlatforms: {
            facebook: `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(eventUrl)}`,
            twitter: `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(eventUrl)}`,
            linkedin: `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(eventUrl)}`,
            pinterest: `https://developers.pinterest.com/tools/url-debugger/?link=${encodeURIComponent(eventUrl)}`
        },
        instructions: {
            step1: "Copy the event URL above",
            step2: "Visit each social platform debugger link",
            step3: "Paste the URL and click 'Scrape' or 'Debug'",
            step4: "This will force the platform to refresh the cached meta tags",
            note: "Changes may take 5-10 minutes to appear after cache invalidation"
        }
    };

    res.json({
        success: true,
        message: "Social media cache invalidation information generated",
        data: debugInfo
    });
}

// 📷 Cover Image Upload Handler
async function handleCoverImageUpload(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user && req.user.id;

        console.log(`🖼️ Cover image upload request for event ${id} by user ${userId}`);

        // Check if event exists and belongs to user
        let foundEvent;
        try {
            foundEvent = await event.findOne({ id, user_id: userId });
        } catch (findError) {
            console.error('❌ Error finding event:', findError.message);
            return res.status(500).json({
                success: false,
                error: "Database error while finding event",
                details: findError.message
            });
        }

        if (!foundEvent) {
            return res.status(404).json({
                success: false,
                error: "Event not found or access denied"
            });
        }

        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: "No image file provided"
            });
        }

        console.log(`📁 Processing uploaded file: ${req.file.filename}`);

        // Try to use the image processing service
        try {
            const ImageProcessingService = require('../services/image-processing.service');
            const imageProcessor = new ImageProcessingService();

            // Process the uploaded image
            const processedImage = await imageProcessor.processUpload(
                req.file,
                userId,
                'event_cover',
                {
                    title: `Cover image for event ${id}`,
                    description: 'Event cover image uploaded via dashboard',
                    tags: ['event', 'cover', 'dashboard']
                }
            );

            // Generate the API URL for serving the image
            const imageUrl = `/api/images/serve/${processedImage.uuid}/medium`;

            // Update event with new cover image URL
            try {
                await event.update(id, { cover_image: imageUrl });
                console.log(`✅ Event ${id} updated with new cover image URL: ${imageUrl}`);
            } catch (updateError) {
                console.error('❌ Error updating event with cover image URL:', updateError.message);
                throw new Error(`Failed to update event: ${updateError.message}`);
            }

            console.log(`✅ Cover image uploaded successfully for event ${id}`);

            res.json({
                success: true,
                message: "Cover image uploaded and event updated successfully",
                data: {
                    id: processedImage.id,
                    uuid: processedImage.uuid,
                    filename: processedImage.filename,
                    originalFilename: processedImage.original_filename,
                    mimeType: processedImage.mime_type,
                    fileSize: processedImage.file_size,
                    processingStatus: processedImage.processing_status,
                    usageContext: processedImage.usage_context,
                    urls: {
                        original: `/api/images/serve/${processedImage.uuid}`,
                        thumbnail: `/api/images/serve/${processedImage.uuid}/thumbnail`,
                        small: `/api/images/serve/${processedImage.uuid}/small`,
                        medium: `/api/images/serve/${processedImage.uuid}/medium`,
                        large: `/api/images/serve/${processedImage.uuid}/large`
                    },
                    createdAt: processedImage.created_at
                },
                // Legacy fields for backward compatibility
                imageUrl: imageUrl,
                imageId: processedImage.id,
                uuid: processedImage.uuid,
                filename: processedImage.filename,
                size: req.file.size,
                processingStatus: processedImage.processing_status,
                eventUpdated: true
            });

        } catch (processingError) {
            console.error('❌ Image processing failed:', processingError.message);

            // Fallback: Simple file storage
            const crypto = require('crypto');
            const uuid = crypto.randomUUID();
            const timestamp = Date.now();
            const extension = path.extname(req.file.originalname);
            const filename = `${timestamp}-${crypto.randomBytes(6).toString('hex')}${extension}`;

            // Simple URL for fallback
            const imageUrl = `/static/uploads/temp/${req.file.filename}`;

            // Update event with fallback URL
            try {
                await event.update(id, { cover_image: imageUrl });
                console.log(`✅ Event ${id} updated with fallback cover image URL: ${imageUrl}`);
            } catch (updateError) {
                console.error('❌ Error updating event with fallback cover image URL:', updateError.message);
                throw new Error(`Failed to update event with fallback URL: ${updateError.message}`);
            }

            res.json({
                success: true,
                message: "Cover image uploaded (fallback mode)",
                imageUrl: imageUrl,
                filename: req.file.filename,
                size: req.file.size,
                warning: "Used fallback storage - full processing unavailable",
                eventUpdated: true
            });
        }

    } catch (error) {
        console.error('❌ Error uploading cover image:', error);

        // Clean up uploaded file if it exists
        if (req.file && req.file.path) {
            try {
                await fs.unlink(req.file.path);
            } catch (unlinkError) {
                console.warn('Failed to clean up file after error:', unlinkError);
            }
        }

        res.status(500).json({
            success: false,
            error: "Failed to upload cover image",
            details: error.message
        });
    }
}

module.exports = {
    createEventValidation,
    updateEventValidation,
    createSignupValidation,
    createEvent,
    getUserEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    createSignup,
    getEventSignups,
    // 🚀 Analytics
    getFanAnalytics,
    getFanSummaryStats,
    getEventAnalytics,
    // 🎯 QR Code functionality
    generateEventQRCode,
    getEventQRCodeData,
    getEventQRCodeAnalytics,
    trackQRCodeScan,
    // 🎯 Enhanced QR Code Management
    getEventQRCodes,
    createEventQRCode,
    updateEventQRCode,
    deleteEventQRCode,
    generateQRCodeImage,

    // 📊 Advanced Analytics API
    getEventPageViews,
    getEventSessionAnalytics,
    exportEventAnalytics,

    // 📱 Social Preview Image Upload
    uploadSocialPreviewImage,
    handleSocialPreviewImageUpload,

    // 📱 Cover Image Upload
    uploadCoverImage,
    handleCoverImageUpload,

    // 🔄 Social Media Cache Invalidation
    invalidateSocialCache
};