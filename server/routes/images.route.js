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
            // Responsive optimized image with specific width
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
        const originalPath = path.join(__dirname, '../../static/images/figma-exact', originalName);
        possiblePaths.push(originalPath);

        // If width is specified but no optimized version exists, create it on-the-fly
        if (width && !fs.existsSync(possiblePaths[0]) && fs.existsSync(originalPath)) {
            try {
                const outputPath = path.join(__dirname, '../../static/images/optimized', `${baseName}-${width}w.${bestFormat}`);

                // Create optimized directory if it doesn't exist
                const optimizedDir = path.dirname(outputPath);
                if (!fs.existsSync(optimizedDir)) {
                    fs.mkdirSync(optimizedDir, { recursive: true });
                }

                // Generate responsive image using Sharp
                await sharp(originalPath)
                    .resize(width, width, {
                        fit: 'cover',
                        position: 'center'
                    })
                    .webp({ quality: 85 })
                    .toFile(outputPath);

                // Add the newly created file to the front of possible paths
                possiblePaths.unshift(outputPath);
            } catch (sharpError) {
                console.error(`⚠️ Failed to generate responsive image: ${sharpError.message}`);
            }
        }

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

// Proxy optimization route for external images (event covers, etc.)
router.get('/proxy-optimized', async(req, res) => {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        const decodedUrl = decodeURIComponent(url);
        console.log(`🔄 Proxying and optimizing external image: ${decodedUrl}`);

        // Fetch the external image
        const fetch = (await
            import ('node-fetch')).default;
        const response = await fetch(decodedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; ImageOptimizer/1.0)'
            },
            timeout: 10000
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status}`);
        }

        const imageBuffer = await response.buffer();
        const bestFormat = getBestFormat(req);

        // Set aggressive caching headers
        res.set({
            'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
            'Content-Type': bestFormat === 'webp' ? 'image/webp' : 'image/jpeg',
            'Vary': 'Accept'
        });

        // Optimize the image using Sharp
        if (bestFormat === 'webp') {
            const optimizedBuffer = await sharp(imageBuffer)
                .webp({ quality: 85, effort: 4 })
                .toBuffer();

            console.log(`✅ External image optimized: ${decodedUrl} (${imageBuffer.length} → ${optimizedBuffer.length} bytes)`);
            res.send(optimizedBuffer);
        } else {
            const optimizedBuffer = await sharp(imageBuffer)
                .jpeg({ quality: 85, progressive: true })
                .toBuffer();

            console.log(`✅ External image optimized: ${decodedUrl} (${imageBuffer.length} → ${optimizedBuffer.length} bytes)`);
            res.send(optimizedBuffer);
        }

    } catch (error) {
        console.error('❌ Proxy optimization error:', error);

        // Fallback: redirect to original URL
        const { url } = req.query;
        if (url) {
            res.redirect(decodeURIComponent(url));
        } else {
            res.status(500).json({ error: 'Image optimization failed' });
        }
    }
});

module.exports = router;