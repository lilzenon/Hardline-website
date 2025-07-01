const QRCode = require('qrcode');
const analyticsQueries = require('../queries/analytics.queries');

/**
 * QR Code Generation and Management Service
 */

// Generate QR code image data
async function generateQRCodeImage(url, options = {}) {
    const defaultOptions = {
        width: 512,
        margin: 4,
        errorCorrectionLevel: 'H', // High error correction (30% recovery capability)
        type: 'png',
        quality: 0.95,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        },
        scale: 8,
        border: 1
    };

    const qrOptions = { ...defaultOptions, ...options };

    try {
        if (qrOptions.type === 'svg') {
            return await QRCode.toString(url, {
                ...qrOptions,
                type: 'svg'
            });
        } else {
            return await QRCode.toBuffer(url, {
                ...qrOptions,
                type: 'png'
            });
        }
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate QR code');
    }
}

// Generate QR code URL for an event QR code
function generateQRCodeURL(qrCodeIdentifier, baseUrl = null) {
    const domain = baseUrl || process.env.DEFAULT_DOMAIN || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    return `${protocol}://${domain}/qr/${qrCodeIdentifier}`;
}

// Create a new QR code for an event
async function createEventQRCode(eventId, qrCodeData) {
    try {
        const newQRCode = await analyticsQueries.createQRCode(eventId, qrCodeData);
        
        // Generate the QR code URL
        const qrUrl = generateQRCodeURL(newQRCode.identifier);
        
        return {
            ...newQRCode,
            qr_url: qrUrl,
            short_url: `/qr/${newQRCode.identifier}`
        };
    } catch (error) {
        console.error('Error creating QR code:', error);
        throw new Error('Failed to create QR code');
    }
}

// Get QR code with generated URLs
async function getQRCodeWithUrls(qrCodeId) {
    try {
        const qrCode = await analyticsQueries.getQRCodeByIdentifier(qrCodeId);
        if (!qrCode) {
            throw new Error('QR code not found');
        }
        
        const qrUrl = generateQRCodeURL(qrCode.identifier);
        
        return {
            ...qrCode,
            qr_url: qrUrl,
            short_url: `/qr/${qrCode.identifier}`
        };
    } catch (error) {
        console.error('Error getting QR code:', error);
        throw new Error('Failed to get QR code');
    }
}

// Get all QR codes for an event with URLs
async function getEventQRCodesWithUrls(eventId) {
    try {
        const qrCodes = await analyticsQueries.getEventQRCodes(eventId);
        
        return qrCodes.map(qrCode => {
            const qrUrl = generateQRCodeURL(qrCode.identifier);
            return {
                ...qrCode,
                qr_url: qrUrl,
                short_url: `/qr/${qrCode.identifier}`
            };
        });
    } catch (error) {
        console.error('Error getting event QR codes:', error);
        throw new Error('Failed to get event QR codes');
    }
}

// Generate QR code image for a specific QR code
async function generateQRCodeForEvent(qrCodeIdentifier, options = {}) {
    try {
        const qrUrl = generateQRCodeURL(qrCodeIdentifier);
        return await generateQRCodeImage(qrUrl, options);
    } catch (error) {
        console.error('Error generating QR code for event:', error);
        throw new Error('Failed to generate QR code image');
    }
}

// Create default QR code for an event (backward compatibility)
async function createDefaultQRCode(eventId, eventSlug) {
    try {
        const defaultQRData = {
            name: 'Main QR Code',
            description: 'Primary QR code for this event',
            is_active: true
        };
        
        return await createEventQRCode(eventId, defaultQRData);
    } catch (error) {
        console.error('Error creating default QR code:', error);
        throw new Error('Failed to create default QR code');
    }
}

// Get QR code analytics
async function getQRCodeAnalytics(qrCodeId, days = 30) {
    try {
        // This would need to be implemented in analyticsQueries
        // For now, return basic structure
        return {
            totalScans: 0,
            uniqueScans: 0,
            recentScans: 0,
            deviceBreakdown: [],
            dailyTrend: [],
            recentActivity: []
        };
    } catch (error) {
        console.error('Error getting QR code analytics:', error);
        throw new Error('Failed to get QR code analytics');
    }
}

// Validate QR code data
function validateQRCodeData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length === 0) {
        errors.push('Name is required');
    }
    
    if (data.name && data.name.length > 100) {
        errors.push('Name must be 100 characters or less');
    }
    
    if (data.description && data.description.length > 500) {
        errors.push('Description must be 500 characters or less');
    }
    
    if (data.custom_url && data.custom_url.length > 2040) {
        errors.push('Custom URL must be 2040 characters or less');
    }
    
    // Validate custom URL format if provided
    if (data.custom_url) {
        try {
            new URL(data.custom_url);
        } catch (error) {
            errors.push('Custom URL must be a valid URL');
        }
    }
    
    return errors;
}

// Generate QR code download data
async function generateQRCodeDownload(qrCodeIdentifier, format = 'png', size = 512) {
    try {
        const qrUrl = generateQRCodeURL(qrCodeIdentifier);
        
        const options = {
            width: parseInt(size),
            type: format,
            margin: 4,
            errorCorrectionLevel: 'H'
        };
        
        const qrCodeData = await generateQRCodeImage(qrUrl, options);
        
        const contentType = format === 'svg' ? 'image/svg+xml' : 'image/png';
        const filename = `qr-code-${qrCodeIdentifier}.${format}`;
        
        return {
            data: qrCodeData,
            contentType,
            filename
        };
    } catch (error) {
        console.error('Error generating QR code download:', error);
        throw new Error('Failed to generate QR code download');
    }
}

module.exports = {
    generateQRCodeImage,
    generateQRCodeURL,
    createEventQRCode,
    getQRCodeWithUrls,
    getEventQRCodesWithUrls,
    generateQRCodeForEvent,
    createDefaultQRCode,
    getQRCodeAnalytics,
    validateQRCodeData,
    generateQRCodeDownload
};
