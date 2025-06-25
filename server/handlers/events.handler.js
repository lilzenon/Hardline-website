const { body, param, query } = require("express-validator");
const { event } = require("../queries");
const { CustomError } = require("../utils");

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
];

const updateEventValidation = [
    param("id").isInt().withMessage("Event ID must be an integer"),
    ...createEventValidation
];

// Dynamic validation based on drop settings
async function createSignupValidation(req, res, next) {
    const { slug } = req.params;

    try {
        // Get the drop to check its collection settings
        const foundDrop = await event.findBySlug(slug);

        if (!foundDrop) {
            throw new CustomError("Drop not found", 404);
        }

        console.log('📋 Drop collection settings:', {
            collect_email: foundevent.collect_email,
            collect_phone: foundevent.collect_phone
        });

        // Create dynamic validation rules based on drop settings
        const validationRules = [
            param("slug")
            .isLength({ min: 1, max: 100 })
            .withMessage("Invalid drop slug")
        ];

        // Add email validation only if email collection is enabled
        if (foundevent.collect_email) {
            validationRules.push(
                body("email")
                .isEmail()
                .normalizeEmail()
                .withMessage("Valid email is required")
            );
            console.log('📧 Email validation enabled for this drop');
        } else {
            console.log('📧 Email validation disabled for this drop');
        }

        // PRIORITY 3: Enhanced international phone validation
        if (foundevent.collect_phone) {
            validationRules.push(
                body("phone")
                .custom((value) => {
                    if (!value) {
                        throw new Error('Phone number is required for this drop');
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
            console.log('📱 Phone validation enabled for this drop');
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
            console.log('📱 Optional phone validation enabled for this drop');
        }

        // Always allow name (optional)
        validationRules.push(
            body("name")
            .optional()
            .isLength({ max: 100 })
            .withMessage("Name must be less than 100 characters")
        );

        // Store the drop in request for later use
        req.foundDrop = foundDrop;

        // Apply the dynamic validation rules
        await Promise.all(validationRules.map(rule => rule.run(req)));

        next();
    } catch (error) {
        console.error('🚨 Error in dynamic signup validation:', error);
        next(error);
    }
}

// Create a new drop
async function createEvent(req, res) {
    const userId = req.user.id;
    const dropData = {
        ...req.body,
        user_id: userId
    };

    try {
        const newDrop = await event.create(dropData);
        const dropWithStats = await event.findWithStats({ id: newevent.id });

        res.status(201).json({
            success: true,
            data: dropWithStats
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY' || error.code === 'SQLITE_CONSTRAINT') {
            throw new CustomError("A drop with this slug already exists", 400);
        }
        throw error;
    }
}

// Get user's drops
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

// Get single drop
async function getEvent(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    const foundDrop = await event.findWithStats({ id, user_id: userId });

    if (!foundDrop) {
        throw new CustomError("Drop not found", 404);
    }

    res.json({
        success: true,
        data: foundDrop
    });
}

// Update drop with enhanced error handling and column validation
async function updateEvent(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if drop exists and belongs to user
    const existingDrop = await event.findOne({ id, user_id: userId });
    if (!existingDrop) {
        throw new CustomError("Drop not found", 404);
    }

    try {
        // If slug is being updated, check if it conflicts with other events (not this one)
        if (req.body.slug && req.body.slug !== existingevent.slug) {
            const conflictingEvent = await event.findBySlug(req.body.slug);
            if (conflictingEvent && conflictingEvent.id !== parseInt(id)) {
                throw new CustomError("An event with this slug already exists", 400);
            }
        }

        // Validate and sanitize update data to prevent column errors
        const sanitizedData = validateAndSanitizeEventData(req.body);

        console.log(`🔄 Updating event ${id} with data:`, Object.keys(sanitizedData));

        // 🚀 DETECT HOMEPAGE TOGGLE CHANGES FOR REAL-TIME UPDATES
        const homepageToggleChanged = 'show_on_homepage' in sanitizedData &&
            sanitizedData.show_on_homepage !== existingevent.show_on_homepage;

        if (homepageToggleChanged) {
            console.log(`🏠 Homepage toggle changed for drop ${id}: ${existingevent.show_on_homepage} → ${sanitizedData.show_on_homepage}`);
        }

        const updatedDrop = await event.update(id, sanitizedData);
        const dropWithStats = await event.findWithStats({ id: updatedevent.id });

        console.log(`✅ Drop ${id} updated successfully`);

        // 🚀 TRIGGER HOMEPAGE REFRESH IF TOGGLE CHANGED
        if (homepageToggleChanged) {
            try {
                // Broadcast homepage refresh event to all connected clients
                const io = req.app.get('io'); // Socket.io instance
                if (io) {
                    console.log(`📡 Broadcasting homepage refresh event...`);
                    io.emit('homepage-refresh', {
                        action: sanitizedData.show_on_homepage ? 'card-added' : 'card-removed',
                        dropId: parseInt(id),
                        dropData: sanitizedData.show_on_homepage ? dropWithStats : null
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
            data: dropWithStats,
            homepageRefreshNeeded: homepageToggleChanged // Flag for client-side handling
        });
    } catch (error) {
        console.error(`❌ Error updating drop ${id}:`, error);

        if (error.code === 'ER_DUP_ENTRY' || error.code === 'SQLITE_CONSTRAINT') {
            throw new CustomError("A drop with this slug already exists", 400);
        }

        // Handle PostgreSQL column errors
        if (error.code === '42703') {
            console.error('🚨 PostgreSQL column error:', error.message);
            throw new CustomError("Invalid field in update request", 400);
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
        'address_validated_at'
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
            } else if (typeof value === 'boolean' || key === 'is_active' || key === 'collect_email' || key === 'collect_phone') {
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
            console.warn(`⚠️ Ignoring unknown field: ${key}`);
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

// Delete drop
async function deleteEvent(req, res) {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if drop exists and belongs to user
    const existingDrop = await event.findOne({ id, user_id: userId });
    if (!existingDrop) {
        throw new CustomError("Drop not found", 404);
    }

    await event.remove(id);

    res.json({
        success: true,
        message: "Drop deleted successfully"
    });
}

// Public drop signup
async function createSignup(req, res) {
    try {
        const { slug } = req.params;
        const { email, phone, name } = req.body;

        console.log(`🚀 Drop signup attempt for slug: ${slug}`);
        console.log(`📧 Email: ${email || 'none'}`);
        console.log(`📱 Phone: ${phone || 'none'}`);
        console.log(`👤 Name: ${name || 'none'}`);

        // Use the drop that was already fetched in validation middleware
        const foundDrop = req.foundDrop;

        if (!foundDrop) {
            console.error(`❌ Drop not found for slug: ${slug}`);
            throw new CustomError("Drop not found", 404);
        }

        if (!foundevent.is_active) {
            console.error(`❌ Drop is inactive: ${slug}`);
            throw new CustomError("Drop is currently inactive", 404);
        }

        console.log(`✅ Using pre-fetched drop: ${foundevent.title} (ID: ${foundevent.id})`);
        console.log(`📋 Drop settings: collect_email=${foundevent.collect_email}, collect_phone=${foundevent.collect_phone}`);

        // Additional validation based on drop settings
        if (foundevent.collect_email && !email) {
            throw new CustomError("Email is required for this drop", 400);
        }

        if (foundevent.collect_phone && !phone) {
            throw new CustomError("Phone number is required for this drop", 400);
        }

        // Check for duplicates based on what fields are collected
        if (email) {
            console.log(`🔍 Checking if email already signed up: ${email}`);
            const emailAlreadySignedUp = await event.isEmailSignedUp(foundevent.id, email);
            if (emailAlreadySignedUp) {
                console.error(`❌ Email already signed up: ${email}`);
                throw new CustomError("Email already signed up for this drop", 400);
            }
        } else {
            console.log(`🔍 Skipping email duplicate check - no email provided`);
        }

        // Check phone duplicates if phone is provided and email is not (phone-only signup)
        if (phone && !email) {
            console.log(`🔍 Checking if phone already signed up: ${phone}`);
            const phoneAlreadySignedUp = await event.isPhoneSignedUp(foundevent.id, phone);
            if (phoneAlreadySignedUp) {
                console.error(`❌ Phone already signed up: ${phone}`);
                throw new CustomError("Phone number already signed up for this drop", 400);
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
            const newSignup = await event.createSignup(foundevent.id, signupData);
            console.log(`✅ Signup created successfully:`, newSignup);

            // 🚀 OPTIONAL CRM INTEGRATION (graceful fallback if CRM not available)
            try {
                const contactService = require('../services/crm/contact.service');
                await contactService.createFromDropSignup(signupData, foundevent.id);
                console.log('✅ Contact created in CRM for drop signup');
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
                        const smsResult = await twilioService.sendDropSignupConfirmation({ name, email, phone }, { id: foundevent.id, title: foundevent.title, slug: foundevent.slug },
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
                message: foundevent.thank_you_message || "Thank you for signing up! You'll be notified when this drop goes live."
            });
        } catch (dbError) {
            console.error(`🚨 Database error during signup creation:`, dbError);

            if (dbError.message.includes('already signed up')) {
                throw new CustomError("Email already signed up for this drop", 400);
            }

            // Check for specific database errors
            if (dbError.code === 'ER_NO_SUCH_TABLE' || dbError.message.includes('no such table')) {
                console.error(`🚨 Table missing error - drop_signups table may not exist`);
                throw new CustomError("Database configuration error. Please contact support.", 500);
            }

            if (dbError.code === 'ER_DUP_ENTRY' || dbError.code === 'SQLITE_CONSTRAINT') {
                throw new CustomError("Email already signed up for this drop", 400);
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

// Get drop signups (for drop owner)
async function getEventSignups(req, res) {
    const { id } = req.params;
    const userId = req.user.id;
    const { limit = 50, offset = 0 } = req.query;

    // Check if drop belongs to user
    const foundDrop = await event.findOne({ id, user_id: userId });
    if (!foundDrop) {
        throw new CustomError("Drop not found", 404);
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
            dropId = null
    } = req.query;

    const options = {
        limit: parseInt(limit),
        offset: parseInt(offset),
        search: search.trim(),
        sortBy,
        dropId: dropId ? parseInt(dropId) : null
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
        const { dropId = null } = req.query;

        console.log(`🚀 Getting fan summary stats for user ${userId}, drop ${dropId}`);

        const stats = await event.getFanSummaryStats(userId, dropId ? parseInt(dropId) : null);

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
    const foundDrop = await event.findWithStats({ id, user_id: userId });
    if (!foundDrop) {
        throw new CustomError("Drop not found", 404);
    }

    // Get recent signups for this drop
    const recentSignups = await event.findSignups(parseInt(id), { limit: 5 });

    // Calculate basic analytics
    const views = foundevent.view_count || 0;
    const fans = foundevent.signup_count || 0;
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
    getEventAnalytics
};