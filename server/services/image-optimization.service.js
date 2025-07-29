/**
 * Image Optimization Service
 * Handles automatic image conversion to WebP/AVIF and responsive sizing
 */

// const sharp = require('sharp'); // Disabled due to Node.js version compatibility
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class ImageOptimizationService {
    constructor() {
        this.cacheDir = path.join(__dirname, '../../static/images/optimized');
        this.supportedFormats = ['webp', 'avif', 'jpeg', 'png'];
        this.responsiveSizes = [320, 640, 768, 1024, 1280, 1920];
        this.qualitySettings = {
            webp: { quality: 85, effort: 4 },
            avif: { quality: 80, effort: 4 },
            jpeg: { quality: 85, progressive: true },
            png: { compressionLevel: 8, progressive: true }
        };

        this.initializeCache();
    }

    /**
     * Initialize the cache directory
     */
    async initializeCache() {
        try {
            await fs.mkdir(this.cacheDir, { recursive: true });
            console.log('✅ Image optimization cache initialized');
        } catch (error) {
            console.error('❌ Failed to initialize image cache:', error);
        }
    }

    /**
     * Generate cache key for optimized image
     */
    generateCacheKey(imagePath, format, width, quality) {
        const hash = crypto.createHash('md5');
        hash.update(`${imagePath}-${format}-${width}-${quality}`);
        return hash.digest('hex');
    }

    /**
     * Get optimized image path
     */
    getOptimizedPath(cacheKey, format) {
        return path.join(this.cacheDir, `${cacheKey}.${format}`);
    }

    /**
     * Check if browser supports modern image formats
     */
    getBestFormat(acceptHeader) {
        if (!acceptHeader) return 'jpeg';

        if (acceptHeader.includes('image/avif')) return 'avif';
        if (acceptHeader.includes('image/webp')) return 'webp';
        return 'jpeg';
    }

    /**
     * Optimize single image
     */
    async optimizeImage(inputPath, outputPath, options = {}) {
        const {
            format = 'webp',
                width = null,
                height = null,
                quality = null
        } = options;

        try {
            let pipeline = sharp(inputPath);

            // Resize if dimensions specified
            if (width || height) {
                pipeline = pipeline.resize(width, height, {
                    fit: 'inside',
                    withoutEnlargement: true
                });
            }

            // Apply format-specific optimizations
            const qualityConfig = this.qualitySettings[format] || {};
            const finalQuality = quality || qualityConfig.quality || 85;

            switch (format) {
                case 'webp':
                    pipeline = pipeline.webp({
                        quality: finalQuality,
                        effort: qualityConfig.effort || 4
                    });
                    break;
                case 'avif':
                    pipeline = pipeline.avif({
                        quality: finalQuality,
                        effort: qualityConfig.effort || 4
                    });
                    break;
                case 'jpeg':
                    pipeline = pipeline.jpeg({
                        quality: finalQuality,
                        progressive: qualityConfig.progressive || true
                    });
                    break;
                case 'png':
                    pipeline = pipeline.png({
                        compressionLevel: qualityConfig.compressionLevel || 8,
                        progressive: qualityConfig.progressive || true
                    });
                    break;
            }

            await pipeline.toFile(outputPath);

            const stats = await fs.stat(outputPath);
            return {
                success: true,
                size: stats.size,
                format,
                width,
                height
            };
        } catch (error) {
            console.error(`❌ Image optimization failed for ${inputPath}:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Generate responsive image set
     */
    async generateResponsiveSet(inputPath, baseName) {
        const results = {};

        try {
            // Get original image metadata
            const metadata = await sharp(inputPath).metadata();
            const originalWidth = metadata.width;

            // Generate different sizes
            for (const width of this.responsiveSizes) {
                if (width > originalWidth) continue; // Don't upscale

                for (const format of['webp', 'avif', 'jpeg']) {
                    const cacheKey = this.generateCacheKey(inputPath, format, width, 85);
                    const outputPath = this.getOptimizedPath(cacheKey, format);

                    // Check if already cached
                    try {
                        await fs.access(outputPath);
                        const stats = await fs.stat(outputPath);
                        results[`${width}w_${format}`] = {
                            path: outputPath,
                            size: stats.size,
                            width,
                            format,
                            cached: true
                        };
                        continue;
                    } catch {
                        // File doesn't exist, need to generate
                    }

                    const result = await this.optimizeImage(inputPath, outputPath, {
                        format,
                        width,
                        quality: 85
                    });

                    if (result.success) {
                        results[`${width}w_${format}`] = {
                            path: outputPath,
                            size: result.size,
                            width,
                            format,
                            cached: false
                        };
                    }
                }
            }

            return results;
        } catch (error) {
            console.error(`❌ Failed to generate responsive set for ${inputPath}:`, error);
            return {};
        }
    }

    /**
     * Serve optimized image
     */
    async serveOptimizedImage(req, res, imagePath) {
        try {
            const acceptHeader = req.headers.accept || '';
            const bestFormat = this.getBestFormat(acceptHeader);

            // Get requested width from query params
            const requestedWidth = parseInt(req.query.w) || null;

            // Generate cache key
            const cacheKey = this.generateCacheKey(imagePath, bestFormat, requestedWidth, 85);
            const optimizedPath = this.getOptimizedPath(cacheKey, bestFormat);

            // Check if optimized version exists
            try {
                await fs.access(optimizedPath);

                // Serve cached optimized image
                res.set({
                    'Content-Type': `image/${bestFormat}`,
                    'Cache-Control': 'public, max-age=31536000, immutable', // 1 year
                    'Vary': 'Accept'
                });

                return res.sendFile(optimizedPath);
            } catch {
                // Generate optimized version
                const result = await this.optimizeImage(imagePath, optimizedPath, {
                    format: bestFormat,
                    width: requestedWidth,
                    quality: 85
                });

                if (result.success) {
                    res.set({
                        'Content-Type': `image/${bestFormat}`,
                        'Cache-Control': 'public, max-age=31536000, immutable',
                        'Vary': 'Accept'
                    });

                    return res.sendFile(optimizedPath);
                } else {
                    // Fall back to original image
                    return res.sendFile(imagePath);
                }
            }
        } catch (error) {
            console.error('❌ Image serving error:', error);
            // Fall back to original image
            return res.sendFile(imagePath);
        }
    }

    /**
     * Preoptimize critical images
     */
    async preoptimizeCriticalImages() {
        const criticalImages = [
            'static/images/figma-exact/hero-left-image.png',
            'static/images/figma-exact/hero-right-video.png',
            'static/images/desktop-figma/b2b-logo-desktop.svg',
            'static/images/mobile-figma/b2b-logo-mobile.svg'
        ];

        console.log('🖼️ Pre-optimizing critical images...');

        for (const imagePath of criticalImages) {
            try {
                const fullPath = path.join(__dirname, '../../', imagePath);
                await fs.access(fullPath);

                console.log(`🔄 Optimizing: ${imagePath}`);
                const results = await this.generateResponsiveSet(fullPath, path.basename(imagePath));

                const optimizedCount = Object.keys(results).length;
                console.log(`✅ Generated ${optimizedCount} optimized versions for ${imagePath}`);
            } catch (error) {
                console.log(`⚠️ Skipping ${imagePath}: ${error.message}`);
            }
        }

        console.log('✅ Critical image pre-optimization complete');
    }
}

module.exports = new ImageOptimizationService();