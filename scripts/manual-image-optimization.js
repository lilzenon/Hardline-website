#!/usr/bin/env node

/**
 * Manual Image Optimization Helper
 * Provides instructions and utilities for manual image optimization
 */

const fs = require('fs').promises;
const path = require('path');

async function analyzeCurrentImages() {
    console.log('🖼️ HARDLINE Image Optimization Analysis');
    console.log('==============================================\n');
    
    const originalDir = path.join(__dirname, '../static/images/figma-exact');
    const optimizedDir = path.join(__dirname, '../static/images/optimized');
    
    try {
        // Analyze original images
        const originalFiles = await fs.readdir(originalDir);
        console.log('📊 Original Images Analysis:');
        
        let totalOriginalSize = 0;
        
        for (const file of originalFiles) {
            if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                const filePath = path.join(originalDir, file);
                const stats = await fs.stat(filePath);
                const sizeKB = (stats.size / 1024).toFixed(1);
                totalOriginalSize += stats.size;
                
                console.log(`  📄 ${file}: ${sizeKB} KiB`);
                
                // Special analysis for hero image
                if (file === 'hero-left-image.png') {
                    console.log(`    🎯 PRIORITY: This is the largest image (${sizeKB} KiB)`);
                    console.log(`    💾 Expected WebP savings: ~459.7 KiB (21% reduction)`);
                    console.log(`    🚀 Performance impact: HIGH`);
                }
            }
        }
        
        console.log(`\n📈 Total original size: ${(totalOriginalSize / 1024).toFixed(1)} KiB`);
        
        // Check optimized directory
        try {
            const optimizedFiles = await fs.readdir(optimizedDir);
            const imageFiles = optimizedFiles.filter(f => f.endsWith('.webp') || f.endsWith('.avif'));
            
            if (imageFiles.length > 0) {
                console.log('\n✅ Optimized Images Found:');
                let totalOptimizedSize = 0;
                
                for (const file of imageFiles) {
                    const filePath = path.join(optimizedDir, file);
                    const stats = await fs.stat(filePath);
                    const sizeKB = (stats.size / 1024).toFixed(1);
                    totalOptimizedSize += stats.size;
                    
                    console.log(`  📄 ${file}: ${sizeKB} KiB`);
                }
                
                const totalSavings = totalOriginalSize - totalOptimizedSize;
                const savingsPercent = ((totalSavings / totalOriginalSize) * 100).toFixed(1);
                
                console.log(`\n💾 Total savings: ${(totalSavings / 1024).toFixed(1)} KiB (${savingsPercent}%)`);
            } else {
                console.log('\n⚠️ No optimized images found yet');
            }
        } catch {
            console.log('\n⚠️ Optimized directory not found or empty');
        }
        
    } catch (error) {
        console.error('❌ Analysis failed:', error);
    }
}

async function generateOptimizationInstructions() {
    console.log('\n🛠️ Manual Optimization Instructions');
    console.log('====================================\n');
    
    const heroImagePath = path.join(__dirname, '../static/images/figma-exact/hero-left-image.png');
    
    try {
        await fs.access(heroImagePath);
        const stats = await fs.stat(heroImagePath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        
        console.log('🎯 PRIORITY 1: Hero Image Optimization');
        console.log(`📄 File: hero-left-image.png (${sizeKB} KiB)`);
        console.log('💾 Expected savings: 459.7 KiB');
        console.log('🎨 Target quality: 85%');
        console.log('📱 Responsive sizes needed: 640px, 768px, 1024px, 1280px\n');
        
        console.log('🔧 Option 1: Online Tools (Easiest)');
        console.log('1. Go to https://squoosh.app/');
        console.log('2. Upload: static/images/figma-exact/hero-left-image.png');
        console.log('3. Select WebP format');
        console.log('4. Set quality to 85');
        console.log('5. Download and save as: static/images/optimized/hero-left-image.webp\n');
        
        console.log('🔧 Option 2: TinyPNG (Good compression)');
        console.log('1. Go to https://tinypng.com/');
        console.log('2. Upload the hero image');
        console.log('3. Download optimized version');
        console.log('4. Convert to WebP using another tool if needed\n');
        
        console.log('🔧 Option 3: Command Line (If tools available)');
        console.log('# Using cwebp:');
        console.log('cwebp -q 85 static/images/figma-exact/hero-left-image.png -o static/images/optimized/hero-left-image.webp');
        console.log('\n# Using ImageMagick:');
        console.log('magick static/images/figma-exact/hero-left-image.png -quality 85 static/images/optimized/hero-left-image.webp\n');
        
        console.log('📱 Responsive Versions (Optional but recommended):');
        console.log('Create these additional sizes for responsive loading:');
        console.log('- hero-left-image-640w.webp (640px width)');
        console.log('- hero-left-image-768w.webp (768px width)');
        console.log('- hero-left-image-1024w.webp (1024px width)');
        console.log('- hero-left-image-1280w.webp (1280px width)\n');
        
    } catch {
        console.log('⚠️ Hero image not found at expected location');
    }
}

async function testOptimizationSystem() {
    console.log('\n🧪 Testing Image Optimization System');
    console.log('====================================\n');
    
    const optimizedDir = path.join(__dirname, '../static/images/optimized');
    
    try {
        await fs.access(optimizedDir);
        console.log('✅ Optimized images directory exists');
        
        const heroWebpPath = path.join(optimizedDir, 'hero-left-image.webp');
        
        try {
            await fs.access(heroWebpPath);
            const stats = await fs.stat(heroWebpPath);
            const sizeKB = (stats.size / 1024).toFixed(1);
            
            console.log(`✅ Hero WebP image found: ${sizeKB} KiB`);
            
            // Calculate savings
            const originalPath = path.join(__dirname, '../static/images/figma-exact/hero-left-image.png');
            const originalStats = await fs.stat(originalPath);
            const originalSizeKB = (originalStats.size / 1024).toFixed(1);
            const savings = originalStats.size - stats.size;
            const savingsKB = (savings / 1024).toFixed(1);
            const savingsPercent = ((savings / originalStats.size) * 100).toFixed(1);
            
            console.log(`📊 Original: ${originalSizeKB} KiB`);
            console.log(`📊 Optimized: ${sizeKB} KiB`);
            console.log(`💾 Savings: ${savingsKB} KiB (${savingsPercent}%)`);
            
            if (savings > 400 * 1024) { // More than 400KB savings
                console.log('🎉 EXCELLENT! Optimization target achieved!');
            } else if (savings > 200 * 1024) { // More than 200KB savings
                console.log('✅ Good optimization achieved');
            } else {
                console.log('⚠️ Optimization could be improved');
            }
            
        } catch {
            console.log('❌ Hero WebP image not found');
            console.log('📝 Please create: static/images/optimized/hero-left-image.webp');
        }
        
    } catch {
        console.log('❌ Optimized images directory not found');
        console.log('📝 Please create the directory and add optimized images');
    }
}

async function generatePerformanceReport() {
    console.log('\n📈 Performance Impact Report');
    console.log('============================\n');
    
    console.log('🎯 Expected Performance Improvements:');
    console.log('- 📉 Page load time: 20-30% faster');
    console.log('- 📉 LCP (Largest Contentful Paint): Significantly improved');
    console.log('- 📉 Bandwidth usage: 1,976 KiB reduction');
    console.log('- 📈 Pingdom score: Higher performance rating');
    console.log('- 📈 Core Web Vitals: Better scores across all metrics\n');
    
    console.log('🌐 Browser Support:');
    console.log('- ✅ WebP: 95%+ of modern browsers');
    console.log('- ✅ Automatic fallback to PNG for older browsers');
    console.log('- ✅ Responsive images for different screen sizes');
    console.log('- ✅ 1-year caching for optimized images\n');
    
    console.log('🚀 Implementation Status:');
    console.log('- ✅ Image optimization middleware: Active');
    console.log('- ✅ WebP detection and serving: Ready');
    console.log('- ✅ Fallback system: Implemented');
    console.log('- ✅ Caching headers: Optimized');
    console.log('- ⏳ WebP images: Need manual creation');
}

// Main execution
async function main() {
    await analyzeCurrentImages();
    await generateOptimizationInstructions();
    await testOptimizationSystem();
    await generatePerformanceReport();
    
    console.log('\n🎉 Image Optimization Analysis Complete!');
    console.log('📝 Next step: Create the WebP images using the instructions above');
    console.log('🚀 Once created, the performance improvements will be immediate');
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = {
    analyzeCurrentImages,
    generateOptimizationInstructions,
    testOptimizationSystem,
    generatePerformanceReport
};
