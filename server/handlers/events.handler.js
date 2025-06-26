const { body, param, query } = require("express-validator");
const { event } = require("../queries");
const { CustomError } = require("../utils");
const QRCode = require('qrcode');
const { nanoid } = require('nanoid');
const useragent = require('useragent');
const geoip = require('geoip-lite');

// Sanitizer function for checkbox values
const sanitizeCheckbox = value => value === true || value === "on" || value;

// Check if ticket fields exist in database
async function checkTicketFieldsExist() {
    try {
        const knex = require('../knex');
        const hasDisplayTickets = await knex.schema.hasColumn('events', 'display_tickets');
        const hasTicketPrice = await knex.schema.hasColumn('events', 'ticket_price');
        return hasDisplayTickets && hasTicketPrice;
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
    .isURL()
    .withMessage("Posh embed URL must be a valid URL")
    .isLength({ max: 2040 })
    .withMessage("Posh embed URL must be less than 2040 characters"),
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
    const eventData = {
        ...req.body,
        user_id: userId,
        // Generate unique QR code identifier for new events
        qr_code_identifier: nanoid(12),
        qr_code_enabled: true // Enable QR codes by default for new events
    };

    try {
        const newEvent = await event.create(eventData);
        const eventWithStats = await event.findWithStats({ id: newEvent.id });

        res.status(201).json({
            success: true,
            data: eventWithStats
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY' || error.code === 'SQLITE_CONSTRAINT') {
            throw new CustomError("An event with this slug already exists", 400);
        }
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
        if ((sanitizedData.display_tickets !== undefined || sanitizedData.ticket_price !== undefined)) {
            console.log('🎫 Ticket fields detected in update request');
            const ticketFieldsExist = await checkTicketFieldsExist();
            if (!ticketFieldsExist) {
                console.warn('⚠️ Ticket fields not found in database - removing from update');
                delete sanitizedData.display_tickets;
                delete sanitizedData.ticket_price;
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
            if (error.message.includes('display_tickets') || error.message.includes('ticket_price')) {
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
        'ticket_price'
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
                if (!value || value === '' || isValidUrl(value)) {
                    sanitizedData[key] = value || null;
                } else {
                    console.warn(`⚠️ Invalid URL format for ${key}: ${value}`);
                }
            } else if (typeof value === 'boolean' || key === 'is_active' || key === 'collect_email' || key === 'collect_phone' || key === 'display_tickets') {
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

    // Check if drop belongs to user
    const foundEvent = await event.findWithStats({ id, user_id: userId });
    if (!foundEvent) {
        throw new CustomError("Event not found", 404);
    }

    // Get recent signups for this event
    const recentSignups = await event.findSignups(parseInt(id), { limit: 5 });

    // Calculate basic analytics
    const views = foundEvent.view_count || 0;
    const fans = foundEvent.signup_count || 0;
    const conversionRate = views > 0 ? ((fans / views) * 100).toFixed(1) : 0;

    res.json({
        success: true,
        data: {
            views,
            fans,
            conversionRate,
            recentSignups: recentSignups.map(signup => ({
                email: signup.email,
                phone: signup.phone,
                created_at: signup.created_at
            }))
        }
    });
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
        const agent = useragent.parse(userAgent);
        const deviceType = agent.device.family === 'Other' ?
            (agent.os.family.includes('Mobile') || agent.os.family.includes('Android') || agent.os.family.includes('iOS') ? 'mobile' : 'desktop') :
            agent.device.family.toLowerCase().includes('tablet') ? 'tablet' : 'mobile';

        // Get location info
        const geo = geoip.lookup(ipAddress);

        // Track the scan
        await event.trackQRCodeScan({
            event_id: foundEvent.id,
            user_agent: userAgent,
            ip_address: ipAddress,
            referrer: referrer,
            device_type: deviceType,
            browser_name: agent.family,
            os_name: agent.os.family,
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
    trackQRCodeScan
};