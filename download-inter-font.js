const https = require('https');
const fs = require('fs').promises;
const path = require('path');

async function downloadInterFont() {
    console.log('📥 Downloading Inter variable font for self-hosting...');

    const fontsDir = path.join(__dirname, 'static/fonts');
    await fs.mkdir(fontsDir, { recursive: true });

    // Inter Variable font URL (GitHub release, reliable)
    const fontUrl = 'https://github.com/rsms/inter/releases/download/v4.0/Inter-Variable.woff2';
    const fontPath = path.join(fontsDir, 'inter-variable-latin.woff2');

    try {
        // Download the font
        const fontData = await downloadFile(fontUrl);
        await fs.writeFile(fontPath, fontData);

        const stats = await fs.stat(fontPath);
        console.log(`✅ Inter variable font downloaded: ${(stats.size / 1024).toFixed(1)}KB`);

        // Create CSS file for self-hosted font
        const fontCSS = `
/* Inter Variable Font - Self-hosted for performance */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-variable-latin.woff2') format('woff2-variations');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Fallback for older browsers */
@font-face {
  font-family: 'Inter Fallback';
  font-style: normal;
  font-weight: 400;
  src: local('Arial'), local('Helvetica'), local('system-ui');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%;
}

/* CSS Custom Properties for consistent font usage */
:root {
  --font-inter: 'Inter', 'Inter Fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Base font application */
body {
  font-family: var(--font-inter);
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
}
`;

        const cssPath = path.join(__dirname, 'static/css/fonts.css');
        await fs.mkdir(path.dirname(cssPath), { recursive: true });
        await fs.writeFile(cssPath, fontCSS.trim());

        console.log('✅ Font CSS created at /static/css/fonts.css');
        console.log('🎯 Ready to replace Google Fonts with self-hosted solution');

    } catch (error) {
        console.error('❌ Error downloading font:', error.message);
    }
}

function downloadFile(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                return;
            }

            const chunks = [];
            response.on('data', (chunk) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        }).on('error', reject);
    });
}

// Run if called directly
if (require.main === module) {
    downloadInterFont().catch(console.error);
}

module.exports = { downloadInterFont };