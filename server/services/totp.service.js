const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const env = require('../env');

/**
 * TOTP (Time-based One-Time Password) Service
 * Handles Google Authenticator integration for 2FA
 */
class TOTPService {
    /**
     * Generate a new TOTP secret for a user
     * @param {string} userEmail - User's email address
     * @param {string} serviceName - Name of the service (default: BOUNCE2BOUNCE)
     * @returns {Object} - Contains secret, otpauth_url, and base32 secret
     */
    static generateSecret(userEmail, serviceName = 'BOUNCE2BOUNCE') {
        const secret = speakeasy.generateSecret({
            name: `${serviceName} (${userEmail})`,
            issuer: serviceName,
            length: 32 // 32 bytes = 256 bits for strong security
        });

        return {
            secret: secret.base32,
            otpauth_url: secret.otpauth_url,
            manual_entry_key: secret.base32
        };
    }

    /**
     * Generate QR code data URL for the TOTP secret
     * @param {string} otpauth_url - The otpauth URL from generateSecret
     * @returns {Promise<string>} - Data URL for QR code image
     */
    static async generateQRCode(otpauth_url) {
        try {
            const qrCodeDataURL = await QRCode.toDataURL(otpauth_url, {
                errorCorrectionLevel: 'M',
                type: 'image/png',
                quality: 0.92,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                width: 256
            });
            return qrCodeDataURL;
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw new Error('Failed to generate QR code');
        }
    }

    /**
     * Verify a TOTP token
     * @param {string} token - 6-digit TOTP token from user
     * @param {string} secret - Base32 encoded secret
     * @param {number} window - Time window for verification (default: 4 = 2 minutes)
     * @returns {boolean} - True if token is valid
     */
    static verifyToken(token, secret, window = 4) {
        try {
            return speakeasy.totp.verify({
                secret: secret,
                encoding: 'base32',
                token: token,
                window: window, // Allow 4 time steps (2 minutes) before/after current time
                time: Math.floor(Date.now() / 1000),
                step: 30 // 30-second time steps (standard for Google Authenticator)
            });
        } catch (error) {
            console.error('Error verifying TOTP token:', error);
            return false;
        }
    }

    /**
     * Generate a TOTP token (for testing purposes)
     * @param {string} secret - Base32 encoded secret
     * @returns {string} - 6-digit TOTP token
     */
    static generateToken(secret) {
        try {
            return speakeasy.totp({
                secret: secret,
                encoding: 'base32',
                time: Math.floor(Date.now() / 1000)
            });
        } catch (error) {
            console.error('Error generating TOTP token:', error);
            throw new Error('Failed to generate TOTP token');
        }
    }

    /**
     * Check if TOTP is required for admin users
     * @returns {boolean} - True if TOTP is required
     */
    static isTOTPRequired() {
        // Default to true for security, but allow disabling via env var
        return process.env.REQUIRE_ADMIN_TOTP !== 'false';
    }

    /**
     * Validate TOTP token format
     * @param {string} token - Token to validate
     * @returns {boolean} - True if format is valid
     */
    static isValidTokenFormat(token) {
        return /^\d{6}$/.test(token);
    }

    /**
     * Get backup codes for TOTP (for future implementation)
     * @param {number} count - Number of backup codes to generate
     * @returns {Array<string>} - Array of backup codes
     */
    static generateBackupCodes(count = 10) {
        const codes = [];
        for (let i = 0; i < count; i++) {
            // Generate 8-character alphanumeric backup codes
            const code = Math.random().toString(36).substring(2, 10).toUpperCase();
            codes.push(code);
        }
        return codes;
    }

    /**
     * Check if a token was recently used (prevent replay attacks)
     * @param {Date} lastUsed - Last time TOTP was used
     * @param {number} windowSeconds - Time window in seconds (default: 120 = 2 minutes)
     * @returns {boolean} - True if token was recently used
     */
    static isTokenRecentlyUsed(lastUsed, windowSeconds = 120) {
        if (!lastUsed) return false;

        const now = new Date();
        const timeDiff = (now - new Date(lastUsed)) / 1000;
        return timeDiff < windowSeconds;
    }

    /**
     * Setup TOTP for a user (complete flow)
     * @param {string} userEmail - User's email
     * @returns {Object} - Setup information including QR code
     */
    static async setupTOTP(userEmail) {
        try {
            const secretData = this.generateSecret(userEmail);
            const qrCodeDataURL = await this.generateQRCode(secretData.otpauth_url);

            return {
                secret: secretData.secret,
                qrCode: qrCodeDataURL,
                manualEntryKey: secretData.manual_entry_key,
                instructions: {
                    step1: 'Install Google Authenticator on your mobile device',
                    step2: 'Scan the QR code or enter the manual key',
                    step3: 'Enter the 6-digit code to complete setup'
                }
            };
        } catch (error) {
            console.error('Error setting up TOTP:', error);
            throw new Error('Failed to setup TOTP');
        }
    }
}

module.exports = TOTPService;