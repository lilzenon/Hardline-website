const fs = require('fs');
const path = require('path');

// Create a simple SVG placeholder image
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#f3f4f6"/>
  <rect x="50" y="50" width="300" height="200" fill="#e5e7eb" stroke="#d1d5db" stroke-width="2"/>
  <circle cx="120" cy="120" r="20" fill="#9ca3af"/>
  <polygon points="160,180 200,140 240,160 280,120 320,140 320,200 160,200" fill="#d1d5db"/>
  <text x="200" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">
    Event Placeholder
  </text>
</svg>`;

// Ensure the defaults directory exists
const defaultsDir = path.join(__dirname, 'static', 'images', 'defaults');
if (!fs.existsSync(defaultsDir)) {
  fs.mkdirSync(defaultsDir, { recursive: true });
}

// Write the SVG file
const svgPath = path.join(defaultsDir, 'event-placeholder.svg');
fs.writeFileSync(svgPath, svgContent);

// Also create a JPG version by copying the SVG (browsers will handle it)
const jpgPath = path.join(defaultsDir, 'event-placeholder.jpg');
fs.writeFileSync(jpgPath, svgContent);

console.log('✅ Created placeholder images:');
console.log('  - static/images/defaults/event-placeholder.svg');
console.log('  - static/images/defaults/event-placeholder.jpg');
