const { z } = require('zod');

/**
 * Comprehensive Zod Validation Schemas
 * Provides type-safe validation for all API endpoints
 */

// Common validation patterns
const emailSchema = z.string()
    .email('Invalid email format')
    .min(5, 'Email must be at least 5 characters')
    .max(254, 'Email must not exceed 254 characters')
    .toLowerCase()
    .trim();

const passwordSchema = z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one lowercase letter, one uppercase letter, and one number');

const strongPasswordSchema = z.string()
    .min(12, 'Password must be at least 12 characters')
    .max(128, 'Password must not exceed 128 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character');

const phoneSchema = z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits');

const urlSchema = z.string()
    .url('Invalid URL format')
    .max(2048, 'URL must not exceed 2048 characters')
    .refine(url => {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
    }, 'Only HTTP and HTTPS URLs are allowed');

const sanitizedStringSchema = (maxLength = 255, minLength = 0) => z.string()
    .trim()
    .min(minLength, `String must be at least ${minLength} characters`)
    .max(maxLength, `String must not exceed ${maxLength} characters`)
    .transform(str => str.replace(/[<>'"&]/g, '')); // Basic XSS prevention

const totpCodeSchema = z.string()
    .regex(/^\d{6}$/, 'TOTP code must be exactly 6 digits')
    .length(6, 'TOTP code must be exactly 6 digits');

// Authentication schemas
const loginSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, 'Password is required').max(128)
});

const adminLoginSchema = z.object({
    email: emailSchema.refine(email => {
        // Add admin email domain validation if configured
        const adminDomains = process.env.ADMIN_EMAIL_DOMAINS ? process.env.ADMIN_EMAIL_DOMAINS.split(',') : [];
        if (adminDomains.length === 0) return true;

        const domain = email.split('@')[1];
        return adminDomains.includes(domain);
    }, 'Email domain not authorized for admin access'),
    password: z.string().min(1, 'Password is required').max(128)
});

const signupSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const adminSignupSchema = z.object({
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordSchema,
    confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"]
}).refine(data => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"]
});

const resetPasswordSchema = z.object({
    email: emailSchema
});

const newPasswordSchema = z.object({
    token: z.string().uuid('Invalid reset token'),
    password: passwordSchema,
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

const totpVerificationSchema = z.object({
    email: emailSchema.optional(),
    totpCode: totpCodeSchema
});

// User management schemas
const createUserSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    firstName: sanitizedStringSchema(50).optional(),
    lastName: sanitizedStringSchema(50).optional(),
    phone: phoneSchema.optional(),
    role: z.enum(['user', 'admin']).default('user'),
    verified: z.boolean().default(false)
});

const updateUserSchema = z.object({
    email: emailSchema.optional(),
    firstName: sanitizedStringSchema(50).optional(),
    lastName: sanitizedStringSchema(50).optional(),
    phone: phoneSchema.optional(),
    company: sanitizedStringSchema(100).optional()
});

const banUserSchema = z.object({
    reason: z.string().min(10, 'Ban reason must be at least 10 characters').max(500, 'Ban reason must not exceed 500 characters').transform(str => str.replace(/[<>'"&]/g, ''))
});

// Link management schemas
const createLinkSchema = z.object({
    target: urlSchema,
    customurl: sanitizedStringSchema(50).optional(),
    description: sanitizedStringSchema(200).optional(),
    password: z.string().max(50).optional(),
    expire_in: z.string().regex(/^\d+[hdm]$/, 'Invalid expiration format').optional(),
    meta_title: sanitizedStringSchema(60).optional(),
    meta_description: sanitizedStringSchema(160).optional(),
    meta_image: urlSchema.optional(),
    show_preview: z.boolean().default(true),
    reuse: z.boolean().default(false)
});

const updateLinkSchema = z.object({
    target: urlSchema.optional(),
    address: sanitizedStringSchema(50).optional(),
    description: sanitizedStringSchema(200).optional(),
    password: z.string().max(50).optional(),
    expire_in: z.string().regex(/^\d+[hdm]$/, 'Invalid expiration format').optional(),
    meta_title: sanitizedStringSchema(60).optional(),
    meta_description: sanitizedStringSchema(160).optional(),
    meta_image: urlSchema.optional(),
    show_preview: z.boolean().optional()
});

// Event management schemas
const createEventSchema = z.object({
    title: sanitizedStringSchema(100, 3),
    description: sanitizedStringSchema(1000).optional(),
    location: sanitizedStringSchema(200, 3),
    date: z.string().datetime('Invalid date format'),
    time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
    price: z.number().min(0, 'Price cannot be negative').max(999999, 'Price too high'),
    capacity: z.number().int().min(1, 'Capacity must be at least 1').max(100000, 'Capacity too high'),
    category: sanitizedStringSchema(50).optional(),
    image_url: urlSchema.optional(),
    is_public: z.boolean().default(true)
});

const updateEventSchema = createEventSchema.partial();

// Contact and communication schemas
const contactFormSchema = z.object({
    name: sanitizedStringSchema(100, 2),
    email: emailSchema,
    subject: sanitizedStringSchema(200, 5),
    message: sanitizedStringSchema(2000, 10),
    phone: phoneSchema.optional()
});

const phoneVerificationSchema = z.object({
    phone: phoneSchema,
    code: z.string().regex(/^\d{4}$/, 'Verification code must be exactly 4 digits')
});

// Search and query schemas
const searchQuerySchema = z.object({
    q: sanitizedStringSchema(100, 1),
    page: z.number().int().min(1).max(1000).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    sort: z.enum(['date', 'title', 'price', 'popularity']).default('date'),
    order: z.enum(['asc', 'desc']).default('desc')
});

const paginationSchema = z.object({
    page: z.number().int().min(1).max(1000).default(1),
    limit: z.number().int().min(1).max(100).default(20)
});

// API key schemas
const apiKeySchema = z.object({
    name: sanitizedStringSchema(50, 3),
    permissions: z.array(z.enum(['read', 'write', 'delete'])).min(1, 'At least one permission required')
});

// File upload schemas
const fileUploadSchema = z.object({
    filename: z.string().max(255, 'Filename too long').regex(/^[a-zA-Z0-9._-]+$/, 'Invalid filename').transform(str => str.replace(/[<>'"&]/g, '')),
    mimetype: z.string().regex(/^(image|video|audio|application)\//i, 'Invalid file type'),
    size: z.number().int().min(1).max(50 * 1024 * 1024) // 50MB max
});

// Export all schemas
module.exports = {
    // Authentication
    loginSchema,
    adminLoginSchema,
    signupSchema,
    adminSignupSchema,
    changePasswordSchema,
    resetPasswordSchema,
    newPasswordSchema,
    totpVerificationSchema,

    // User management
    createUserSchema,
    updateUserSchema,
    banUserSchema,

    // Link management
    createLinkSchema,
    updateLinkSchema,

    // Event management
    createEventSchema,
    updateEventSchema,

    // Communication
    contactFormSchema,
    phoneVerificationSchema,

    // Search and queries
    searchQuerySchema,
    paginationSchema,

    // API and files
    apiKeySchema,
    fileUploadSchema,

    // Common patterns
    emailSchema,
    passwordSchema,
    strongPasswordSchema,
    phoneSchema,
    urlSchema,
    sanitizedStringSchema,
    totpCodeSchema
};