/**
 * Create Open Graph Image for BOUNCE2BOUNCE
 * Generates a 1200x630 PNG image optimized for social media sharing
 */

const fs = require('fs');
const path = require('path');

// Simple SVG to PNG conversion approach
function createOGImageSVG() {
    const svgContent = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="accent1" cx="20%" cy="20%" r="50%">
      <stop offset="0%" style="stop-color:#319DFF;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#319DFF;stop-opacity:0" />
    </radialGradient>
    <radialGradient id="accent2" cx="80%" cy="80%" r="50%">
      <stop offset="0%" style="stop-color:#0AFF4B;stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:#0AFF4B;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#accent1)"/>
  <rect width="1200" height="630" fill="url(#accent2)"/>
  
  <!-- Main Content -->
  <text x="600" y="280" text-anchor="middle" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="72" font-weight="800" letter-spacing="-2px">BOUNCE2BOUNCE</text>
  
  <!-- Tagline -->
  <text x="600" y="340" text-anchor="middle" fill="#319DFF" font-family="Inter, Arial, sans-serif" font-size="32" font-weight="600">Live Music Events &amp; Artist Connections</text>
  
  <!-- Description -->
  <text x="600" y="400" text-anchor="middle" fill="#cccccc" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="400">Discover exclusive live music events and connect with artists</text>
  
  <!-- Subtle branding elements -->
  <circle cx="150" cy="150" r="3" fill="#319DFF" opacity="0.6"/>
  <circle cx="1050" cy="480" r="3" fill="#0AFF4B" opacity="0.6"/>
  <circle cx="200" cy="500" r="2" fill="#ffffff" opacity="0.3"/>
  <circle cx="1000" cy="150" r="2" fill="#ffffff" opacity="0.3"/>
</svg>`;

    return svgContent;
}

// Create the SVG file
function createSVGFile() {
    const svgContent = createOGImageSVG();
    const outputPath = path.join(__dirname, '../static/images/og-image.svg');
    
    fs.writeFileSync(outputPath, svgContent, 'utf8');
    console.log('✅ Created SVG og-image at:', outputPath);
    
    return outputPath;
}

// Create a simple HTML file that can be used to generate PNG
function createHTMLGenerator() {
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>OG Image Generator</title>
    <style>
        body { margin: 0; padding: 0; }
        .og-image {
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            font-family: 'Inter', Arial, sans-serif;
            overflow: hidden;
        }
        .og-image::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 20%, rgba(49, 157, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(10, 255, 75, 0.1) 0%, transparent 50%);
        }
        .logo {
            font-size: 72px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 20px;
            letter-spacing: -2px;
            z-index: 1;
        }
        .tagline {
            font-size: 32px;
            color: #319DFF;
            margin-bottom: 15px;
            font-weight: 600;
            z-index: 1;
        }
        .description {
            font-size: 24px;
            color: #cccccc;
            z-index: 1;
        }
    </style>
</head>
<body>
    <div class="og-image">
        <div class="logo">BOUNCE2BOUNCE</div>
        <div class="tagline">Live Music Events & Artist Connections</div>
        <div class="description">Discover exclusive live music events and connect with artists</div>
    </div>
</body>
</html>`;

    const outputPath = path.join(__dirname, '../og-image-generator.html');
    fs.writeFileSync(outputPath, htmlContent, 'utf8');
    console.log('✅ Created HTML generator at:', outputPath);
    
    return outputPath;
}

// Main execution
function main() {
    console.log('🎨 Creating Open Graph image for BOUNCE2BOUNCE...');
    
    try {
        // Create SVG version
        const svgPath = createSVGFile();
        
        // Create HTML generator for PNG conversion
        const htmlPath = createHTMLGenerator();
        
        console.log('\n📋 Next steps:');
        console.log('1. Open the HTML file in a browser:', htmlPath);
        console.log('2. Take a screenshot of the image (1200x630 pixels)');
        console.log('3. Save as PNG: static/images/og-image.png');
        console.log('4. Update SEO settings to use the new image');
        
        console.log('\n🔧 Alternative: Use the SVG directly');
        console.log('SVG file created at:', svgPath);
        console.log('Some social platforms support SVG, but PNG is more reliable');
        
    } catch (error) {
        console.error('❌ Error creating OG image:', error);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { createOGImageSVG, createSVGFile, createHTMLGenerator };
