const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeHeroImages() {
    console.log('🖼️ Starting hero image optimization for iOS Safari performance...');
    
    const inputDir = path.join(__dirname, 'static/images/figma-exact');
    const outputDir = path.join(__dirname, 'static/images/optimized');
    
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Define responsive breakpoints optimized for mobile-first
    const breakpoints = {
        mobile: [320, 375, 414, 640],  // iPhone sizes + small tablet
        tablet: [768, 834, 1024],      // iPad sizes
        desktop: [1280, 1440, 1920]    // Desktop sizes
    };
    
    const allBreakpoints = [...breakpoints.mobile, ...breakpoints.tablet, ...breakpoints.desktop];
    
    // Images to optimize
    const heroImages = [
        'hero-left-image.png',
        'hero-right-video.png'
    ];
    
    for (const imageName of heroImages) {
        const inputPath = path.join(inputDir, imageName);
        const baseName = imageName.replace('.png', '');
        
        try {
            console.log(`\n📸 Processing ${imageName}...`);
            
            // Check if input file exists
            try {
                await fs.access(inputPath);
            } catch (error) {
                console.log(`⚠️ ${imageName} not found, skipping...`);
                continue;
            }
            
            // Get original image metadata
            const metadata = await sharp(inputPath).metadata();
            console.log(`📏 Original: ${metadata.width}x${metadata.height} (${(metadata.size / 1024 / 1024).toFixed(2)}MB)`);
            
            // Generate responsive variants
            for (const width of allBreakpoints) {
                // Skip if width is larger than original
                if (width > metadata.width) continue;
                
                const height = Math.round((width / metadata.width) * metadata.height);
                
                // AVIF (best compression, modern browsers)
                const avifPath = path.join(outputDir, `${baseName}-${width}w.avif`);
                await sharp(inputPath)
                    .resize(width, height, { 
                        fit: 'cover', 
                        position: 'center',
                        withoutEnlargement: true 
                    })
                    .avif({ 
                        quality: 75,
                        effort: 6,
                        chromaSubsampling: '4:2:0'
                    })
                    .toFile(avifPath);
                
                const avifStats = await fs.stat(avifPath);
                console.log(`  ✅ AVIF ${width}w: ${(avifStats.size / 1024).toFixed(1)}KB`);
                
                // WebP (good compression, wide support)
                const webpPath = path.join(outputDir, `${baseName}-${width}w.webp`);
                await sharp(inputPath)
                    .resize(width, height, { 
                        fit: 'cover', 
                        position: 'center',
                        withoutEnlargement: true 
                    })
                    .webp({ 
                        quality: 80,
                        effort: 6,
                        smartSubsample: true
                    })
                    .toFile(webpPath);
                
                const webpStats = await fs.stat(webpPath);
                console.log(`  ✅ WebP ${width}w: ${(webpStats.size / 1024).toFixed(1)}KB`);
                
                // JPEG fallback (universal support, mobile-optimized)
                if (width <= 640) { // Only create JPEG for mobile sizes
                    const jpegPath = path.join(outputDir, `${baseName}-${width}w.jpg`);
                    await sharp(inputPath)
                        .resize(width, height, { 
                            fit: 'cover', 
                            position: 'center',
                            withoutEnlargement: true 
                        })
                        .jpeg({ 
                            quality: 85,
                            progressive: true,
                            mozjpeg: true
                        })
                        .toFile(jpegPath);
                    
                    const jpegStats = await fs.stat(jpegPath);
                    console.log(`  ✅ JPEG ${width}w: ${(jpegStats.size / 1024).toFixed(1)}KB`);
                }
            }
            
            // Create a single optimized fallback
            const fallbackPath = path.join(outputDir, `${baseName}-fallback.jpg`);
            await sharp(inputPath)
                .resize(640, null, { 
                    fit: 'inside',
                    withoutEnlargement: true 
                })
                .jpeg({ 
                    quality: 85,
                    progressive: true,
                    mozjpeg: true
                })
                .toFile(fallbackPath);
            
            const fallbackStats = await fs.stat(fallbackPath);
            console.log(`  ✅ Fallback: ${(fallbackStats.size / 1024).toFixed(1)}KB`);
            
        } catch (error) {
            console.error(`❌ Error processing ${imageName}:`, error.message);
        }
    }
    
    console.log('\n🎉 Hero image optimization completed!');
    console.log('📱 Mobile-first responsive images generated for optimal iOS Safari performance');
}

// Run if called directly
if (require.main === module) {
    optimizeHeroImages().catch(console.error);
}

module.exports = { optimizeHeroImages };
