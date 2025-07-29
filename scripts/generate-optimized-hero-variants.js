/**
 * Generate optimized hero image variants for PageSpeed Insights optimization
 * Creates properly sized variants to eliminate oversized image warnings
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration for hero image variants
const HERO_VARIANTS = [
  // Mobile variants (350px display)
  { width: 350, suffix: '350w', quality: 82 },
  { width: 700, suffix: '700w', quality: 82 }, // 2x
  { width: 1050, suffix: '1050w', quality: 82 }, // 3x
  
  // Desktop variants (299px display)
  { width: 299, suffix: '299w', quality: 82 },
  { width: 598, suffix: '598w', quality: 82 }, // 2x
  { width: 897, suffix: '897w', quality: 82 }, // 3x
];

async function generateHeroVariants() {
  console.log('🎯 Generating optimized hero image variants for PageSpeed Insights...');
  
  const inputPath = path.join(__dirname, '../static/images/figma-exact/hero-left-image.png');
  const outputDir = path.join(__dirname, '../static/images/optimized');
  
  try {
    // Check if input file exists
    await fs.access(inputPath);
    console.log(`✅ Found source image: ${inputPath}`);
  } catch (error) {
    console.error(`❌ Source image not found: ${inputPath}`);
    return;
  }
  
  // Ensure output directory exists
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    // Directory already exists
  }
  
  console.log(`📁 Output directory: ${outputDir}`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  // Get original file size
  const originalStats = await fs.stat(inputPath);
  const originalSize = originalStats.size;
  console.log(`📊 Original image size: ${(originalSize / 1024).toFixed(1)} KiB`);
  
  // Generate each variant
  for (const variant of HERO_VARIANTS) {
    try {
      console.log(`\n🔄 Generating ${variant.width}px variant...`);
      
      const outputPath = path.join(outputDir, `hero-left-image-${variant.suffix}.webp`);
      
      // Generate WebP variant with optimized settings
      await sharp(inputPath)
        .resize(variant.width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({
          quality: variant.quality,
          effort: 6, // Maximum effort for best compression
          smartSubsample: true,
          nearLossless: false
        })
        .toFile(outputPath);
      
      // Get optimized file size
      const optimizedStats = await fs.stat(outputPath);
      const optimizedSize = optimizedStats.size;
      const compressionRatio = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      totalOptimizedSize += optimizedSize;
      
      console.log(`✅ Generated: hero-left-image-${variant.suffix}.webp`);
      console.log(`📊 Size: ${(optimizedSize / 1024).toFixed(1)} KiB (${compressionRatio}% reduction from original)`);
      
    } catch (error) {
      console.error(`❌ Failed to generate ${variant.suffix} variant:`, error.message);
    }
  }
  
  // Generate summary
  console.log('\n📈 OPTIMIZATION SUMMARY:');
  console.log(`📊 Original image: ${(originalSize / 1024).toFixed(1)} KiB`);
  console.log(`📊 Total optimized variants: ${(totalOptimizedSize / 1024).toFixed(1)} KiB`);
  console.log(`📊 Average variant size: ${(totalOptimizedSize / HERO_VARIANTS.length / 1024).toFixed(1)} KiB`);
  
  // Calculate potential savings for PageSpeed Insights
  const mobileDisplaySize = HERO_VARIANTS.find(v => v.width === 350);
  const desktopDisplaySize = HERO_VARIANTS.find(v => v.width === 299);
  
  if (mobileDisplaySize && desktopDisplaySize) {
    const mobileStats = await fs.stat(path.join(outputDir, `hero-left-image-350w.webp`));
    const desktopStats = await fs.stat(path.join(outputDir, `hero-left-image-299w.webp`));
    
    // Estimate savings compared to serving 1024w version
    const old1024Size = 126.4 * 1024; // From PageSpeed Insights report
    const mobileSavings = old1024Size - mobileStats.size;
    const desktopSavings = old1024Size - desktopStats.size;
    
    console.log('\n🎯 PAGESPEED INSIGHTS IMPACT:');
    console.log(`💾 Mobile savings: ${(mobileSavings / 1024).toFixed(1)} KiB (350px vs 1024px)`);
    console.log(`💾 Desktop savings: ${(desktopSavings / 1024).toFixed(1)} KiB (299px vs 1024px)`);
    console.log(`💾 Total estimated savings: ${((mobileSavings + desktopSavings) / 1024).toFixed(1)} KiB`);
  }
  
  console.log('\n✅ Hero image optimization completed!');
  console.log('🔧 Next steps:');
  console.log('   1. Build and deploy the application');
  console.log('   2. Test with PageSpeed Insights');
  console.log('   3. Verify "Properly size images" warnings are resolved');
}

// Run the optimization
if (require.main === module) {
  generateHeroVariants().catch(console.error);
}

module.exports = { generateHeroVariants };
