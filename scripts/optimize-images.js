#!/usr/bin/env node

/**
 * Image Optimization Script
 * Pre-optimizes critical images for better performance
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeHeroImage() {
    console.log('🖼️ Starting hero image optimization...');

    const inputDir = path.join(__dirname, '../static/images/figma-exact');
    const outputDir = path.join(__dirname, '../static/images/optimized');
    const heroImagePath = path.join(inputDir, 'hero-left-image.png');

    try {
        // Ensure output directory exists
        await fs.mkdir(outputDir, { recursive: true });

        // Get original image info
        const originalStats = await fs.stat(heroImagePath);
        const originalSize = originalStats.size;
        console.log(`📊 Original hero image: ${(originalSize / 1024).toFixed(1)} KiB`);

        // Generate WebP version using Sharp
        console.log('🔄 Generating WebP version...');
        const webpPath = path.join(outputDir, 'hero-left-image.webp');
        await sharp(heroImagePath)
            .webp({ quality: 85, effort: 4 })
            .toFile(webpPath);

        const webpStats = await fs.stat(webpPath);
        const webpSize = webpStats.size;
        const webpSavings = originalSize - webpSize;
        const webpSavingsPercent = ((webpSavings / originalSize) * 100).toFixed(1);

        console.log(`✅ WebP version: ${(webpSize / 1024).toFixed(1)} KiB`);
        console.log(`💾 WebP savings: ${(webpSavings / 1024).toFixed(1)} KiB (${webpSavingsPercent}%)`);

        // Generate AVIF version (best compression)
        console.log('🔄 Generating AVIF version...');
        const avifPath = path.join(outputDir, 'hero-left-image.avif');
        await sharp(heroImagePath)
            .avif({ quality: 80, effort: 4 })
            .toFile(avifPath);

        const avifStats = await fs.stat(avifPath);
        const avifSize = avifStats.size;
        const avifSavings = originalSize - avifSize;
        const avifSavingsPercent = ((avifSavings / originalSize) * 100).toFixed(1);

        console.log(`✅ AVIF version: ${(avifSize / 1024).toFixed(1)} KiB`);
        console.log(`💾 AVIF savings: ${(avifSavings / 1024).toFixed(1)} KiB (${avifSavingsPercent}%)`);

        // Generate responsive sizes for WebP
        const responsiveSizes = [640, 768, 1024, 1280];
        console.log('🔄 Generating responsive sizes...');

        for (const width of responsiveSizes) {
            const responsiveWebpPath = path.join(outputDir, `hero-left-image-${width}w.webp`);
            await sharp(heroImagePath)
                .resize(width, null, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 85, effort: 4 })
                .toFile(responsiveWebpPath);

            const responsiveStats = await fs.stat(responsiveWebpPath);
            console.log(`  📱 ${width}w: ${(responsiveStats.size / 1024).toFixed(1)} KiB`);
        }

        console.log('🎉 Hero image optimization complete!');
        console.log(`📈 Total potential savings: ${(webpSavings / 1024).toFixed(1)} KiB with WebP`);
        console.log(`📈 Maximum potential savings: ${(avifSavings / 1024).toFixed(1)} KiB with AVIF`);

        return {
            original: originalSize,
            webp: webpSize,
            avif: avifSize,
            webpSavings,
            avifSavings
        };

    } catch (error) {
        console.error('❌ Hero image optimization failed:', error);
        throw error;
    }
}

async function optimizeAllCriticalImages() {
    console.log('🚀 Starting critical image optimization...');

    const criticalImages = [{
            input: 'static/images/figma-exact/hero-left-image.png',
            name: 'hero-left-image'
        },
        {
            input: 'static/images/figma-exact/hero-right-video.png',
            name: 'hero-right-video'
        },
        {
            input: 'static/images/figma-exact/event-card-bg.png',
            name: 'event-card-bg'
        },
        {
            input: 'static/images/figma-exact/desktop-full.png',
            name: 'desktop-full'
        }
    ];

    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;

    for (const image of criticalImages) {
        try {
            const inputPath = path.join(__dirname, '..', image.input);
            const outputDir = path.join(__dirname, '../static/images/optimized');

            // Check if file exists
            try {
                await fs.access(inputPath);
            } catch {
                console.log(`⚠️ Skipping ${image.name}: file not found`);
                continue;
            }

            console.log(`\n🔄 Optimizing ${image.name}...`);

            const originalStats = await fs.stat(inputPath);
            const originalSize = originalStats.size;
            totalOriginalSize += originalSize;

            console.log(`📊 Original: ${(originalSize / 1024).toFixed(1)} KiB`);

            // Generate WebP using Sharp
            const webpPath = path.join(outputDir, `${image.name}.webp`);
            await sharp(inputPath)
                .webp({ quality: 85, effort: 4 })
                .toFile(webpPath);

            const webpStats = await fs.stat(webpPath);
            const webpSize = webpStats.size;
            totalOptimizedSize += webpSize;

            const savings = originalSize - webpSize;
            const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

            console.log(`✅ WebP: ${(webpSize / 1024).toFixed(1)} KiB`);
            console.log(`💾 Savings: ${(savings / 1024).toFixed(1)} KiB (${savingsPercent}%)`);

        } catch (error) {
            console.error(`❌ Failed to optimize ${image.name}:`, error);
        }
    }

    const totalSavings = totalOriginalSize - totalOptimizedSize;
    const totalSavingsPercent = totalOriginalSize > 0 ? ((totalSavings / totalOriginalSize) * 100).toFixed(1) : 0;

    console.log('\n🎉 Critical image optimization complete!');
    console.log(`📊 Total original size: ${(totalOriginalSize / 1024).toFixed(1)} KiB`);
    console.log(`📊 Total optimized size: ${(totalOptimizedSize / 1024).toFixed(1)} KiB`);
    console.log(`💾 Total savings: ${(totalSavings / 1024).toFixed(1)} KiB (${totalSavingsPercent}%)`);
}

async function generateImageManifest() {
    console.log('📋 Generating image optimization manifest...');

    const optimizedDir = path.join(__dirname, '../static/images/optimized');
    const manifestPath = path.join(optimizedDir, 'manifest.json');

    try {
        const files = await fs.readdir(optimizedDir);
        const manifest = {
            generated: new Date().toISOString(),
            images: {}
        };

        for (const file of files) {
            if (file.endsWith('.json')) continue;

            const filePath = path.join(optimizedDir, file);
            const stats = await fs.stat(filePath);

            manifest.images[file] = {
                size: stats.size,
                format: path.extname(file).slice(1),
                lastModified: stats.mtime.toISOString()
            };
        }

        await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
        console.log(`✅ Image manifest generated: ${Object.keys(manifest.images).length} optimized images`);

    } catch (error) {
        console.error('❌ Failed to generate image manifest:', error);
    }
}

// Main execution
async function main() {
    try {
        console.log('🖼️ BOUNCE2BOUNCE Image Optimization');
        console.log('=====================================\n');

        await optimizeHeroImage();
        await optimizeAllCriticalImages();
        await generateImageManifest();

        console.log('\n🎉 All image optimizations complete!');
        console.log('🚀 Deploy to see performance improvements');

    } catch (error) {
        console.error('❌ Image optimization failed:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    optimizeHeroImage,
    optimizeAllCriticalImages,
    generateImageManifest
};