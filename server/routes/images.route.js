/**
 * Image Optimization Routes
 * Serves optimized images with WebP/AVIF support and responsive sizing
 */

const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

/**
 * Check if browser supports WebP
 */
function supportsWebP(req) {
    const accept = req.headers.accept || '';
    return accept.includes('image/webp');
}

/**
 * Check if browser supports AVIF
 */
function supportsAVIF(req) {
    const accept = req.headers.accept || '';
    return accept.includes('image/avif');
}

/**
 * Get best image format for browser
 */
function getBestFormat(req) {
    if (supportsAVIF(req)) return 'avif';
    if (supportsWebP(req)) return 'webp';
    return 'original';
}

/**
 * Serve optimized images
 */
router.get('/optimized/:imageName', async(req, res) => {
    try {
        const { imageName } = req.params;
        const width = req.query.w ? parseInt(req.query.w) : null;

        // Check if the imageName already has an extension (explicit format request)
        const hasExtension = /\.(webp|avif|png|jpg|jpeg)$/i.test(imageName);
        let requestedFormat = null;
        let baseName = imageName;

        if (hasExtension) {
            // Extract format from filename
            const ext = path.extname(imageName).slice(1).toLowerCase();
            requestedFormat = ext === 'jpg' ? 'jpeg' : ext;
            baseName = imageName.replace(/\.[^/.]+$/, '');
        }

        const bestFormat = requestedFormat || getBestFormat(req);

        // Build possible image paths in order of preference
        const possiblePaths = [];

        if (width && bestFormat !== 'original') {
            // Responsive optimized image
            possiblePaths.push(
                path.join(__dirname, '../../static/images/optimized', `${baseName}-${width}w.${bestFormat}`)
            );
        }

        if (bestFormat !== 'original') {
            // Standard optimized image
            possiblePaths.push(
                path.join(__dirname, '../../static/images/optimized', `${baseName}.${bestFormat}`)
            );
        }

        // Fallback to original (use original extension if available)
        const originalName = hasExtension ? imageName : `${baseName}.png`;
        possiblePaths.push(
            path.join(__dirname, '../../static/images/figma-exact', originalName)
        );

        // Try each path until we find an existing file
        for (const imagePath of possiblePaths) {
            try {
                await fs.access(imagePath);

                // Set appropriate headers
                const ext = path.extname(imagePath).slice(1);
                const mimeType = {
                    'webp': 'image/webp',
                    'avif': 'image/avif',
                    'png': 'image/png',
                    'jpg': 'image/jpeg',
                    'jpeg': 'image/jpeg'
                }[ext] || 'image/png';

                res.set({
                    'Content-Type': mimeType,
                    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
                    'Vary': 'Accept',
                    'X-Image-Optimized': bestFormat !== 'original' ? 'true' : 'false'
                });

                return res.sendFile(imagePath);
            } catch {
                // File doesn't exist, try next option
                continue;
            }
        }

        // No image found
        res.status(404).json({ error: 'Image not found' });

    } catch (error) {
        console.error('❌ Image serving error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Generate responsive image srcset
 */
router.get('/srcset/:imageName', async(req, res) => {
    try {
        const { imageName } = req.params;
        const bestFormat = getBestFormat(req);
        const sizes = [320, 640, 768, 1024, 1280, 1920];

        const srcset = [];
        const baseName = imageName.replace(/\.[^/.]+$/, '');

        for (const size of sizes) {
            const optimizedPath = path.join(__dirname, '../../static/images/optimized', `${baseName}-${size}w.${bestFormat}`);

            try {
                await fs.access(optimizedPath);
                srcset.push(`/images/optimized/${baseName}-${size}w.${bestFormat} ${size}w`);
            } catch {
                // Size doesn't exist, skip
            }
        }

        // Add fallback
        if (srcset.length === 0) {
            srcset.push(`/images/figma-exact/${imageName} 1920w`);
        }

        res.json({
            srcset: srcset.join(', '),
            format: bestFormat,
            sizes: srcset.length
        });

    } catch (error) {
        console.error('❌ Srcset generation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/**
 * Image optimization stats
 */
router.get('/stats', async(req, res) => {
    try {
        const optimizedDir = path.join(__dirname, '../../static/images/optimized');
        const originalDir = path.join(__dirname, '../../static/images/figma-exact');

        let optimizedFiles = [];
        let originalFiles = [];

        try {
            optimizedFiles = await fs.readdir(optimizedDir);
        } catch {
            optimizedFiles = [];
        }

        try {
            originalFiles = await fs.readdir(originalDir);
        } catch {
            originalFiles = [];
        }

        const stats = {
            optimizedImages: optimizedFiles.length,
            originalImages: originalFiles.length,
            optimizationRatio: originalFiles.length > 0 ? (optimizedFiles.length / originalFiles.length * 100).toFixed(1) + '%' : '0%',
            supportedFormats: ['webp', 'avif', 'png', 'jpeg'],
            cachePolicy: '1 year immutable'
        };

        res.json(stats);

    } catch (error) {
        console.error('❌ Stats error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;