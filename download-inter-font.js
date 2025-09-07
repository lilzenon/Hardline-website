const https = require('https');
const fs = require('fs').promises;
const path = require('path');

async function downloadInterFont() {
    console.log('📥 Downloading Inter fonts for self-hosting...');

    const fontsDir = path.join(__dirname, 'static/fonts');
    await fs.mkdir(fontsDir, { recursive: true });

    // Inter font URLs from GitHub releases (more reliable)
    const fonts = [
        {
            url: 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Regular.woff2',
            filename: 'inter-400.woff2',
            weight: 400
        },
        {
            url: 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-Bold.woff2',
            filename: 'inter-700.woff2',
            weight: 700
        },
        {
            url: 'https://github.com/rsms/inter/raw/master/docs/font-files/Inter-ExtraBold.woff2',
            filename: 'inter-800.woff2',
            weight: 800
        }
    ];

    try {
        // Download all font weights
        let totalSize = 0;
        for (const font of fonts) {
            console.log(`📥 Downloading Inter ${font.weight}...`);
            const fontData = await downloadFile(font.url);
            const fontPath = path.join(fontsDir, font.filename);
            await fs.writeFile(fontPath, fontData);

            const stats = await fs.stat(fontPath);
            const sizeKB = (stats.size / 1024).toFixed(1);
            console.log(`✅ Inter ${font.weight} downloaded: ${sizeKB}KB`);
            totalSize += stats.size;
        }

        console.log(`📊 Total font size: ${(totalSize / 1024).toFixed(1)}KB`);

        // Create CSS file for self-hosted fonts
        const fontCSS = `/* Inter Fonts - Self-hosted for performance */

/* Inter Regular (400) */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-400.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Inter Bold (700) */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Inter Extra Bold (800) */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/inter-800.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* Fallback fonts with metric overrides */
@font-face {
  font-family: 'Inter-fallback';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('Arial'), local('Helvetica'), local('system-ui');
  ascent-override: 90.20%;
  descent-override: 22.48%;
  line-gap-override: 0.00%;
  size-adjust: 107.40%;
}

@font-face {
  font-family: 'Inter-fallback';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: local('Arial Bold'), local('Helvetica Bold'), local('system-ui');
  ascent-override: 90.20%;
  descent-override: 22.48%;
  line-gap-override: 0.00%;
  size-adjust: 107.40%;
}

@font-face {
  font-family: 'Inter-fallback';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: local('Arial Black'), local('Helvetica Bold'), local('system-ui');
  ascent-override: 90.20%;
  descent-override: 22.48%;
  line-gap-override: 0.00%;
  size-adjust: 107.40%;
}

/* CSS Custom Properties for consistent font usage */
:root {
  --font-inter: 'Inter', 'Inter-fallback', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Base font application */
body {
  font-family: var(--font-inter);
  font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
}

/* Performance optimizations */
.font-inter {
  font-family: var(--font-inter);
}

.font-inter-400 {
  font-family: var(--font-inter);
  font-weight: 400;
}

.font-inter-700 {
  font-family: var(--font-inter);
  font-weight: 700;
}

.font-inter-800 {
  font-family: var(--font-inter);
  font-weight: 800;
}`;

        const cssPath = path.join(__dirname, 'static/css/fonts.css');
        await fs.mkdir(path.dirname(cssPath), { recursive: true });
        await fs.writeFile(cssPath, fontCSS);

        console.log('✅ Font CSS created at /static/css/fonts.css');
        console.log('🎯 Ready to replace Google Fonts with self-hosted solution');

    } catch (error) {
        console.error('❌ Error downloading fonts:', error.message);
    }
}

function downloadFile(url, maxRedirects = 5) {
    return new Promise((resolve, reject) => {
        const request = https.get(url, (response) => {
            // Handle redirects
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                if (maxRedirects > 0) {
                    console.log(`Following redirect to: ${response.headers.location}`);
                    return downloadFile(response.headers.location, maxRedirects - 1)
                        .then(resolve)
                        .catch(reject);
                } else {
                    reject(new Error('Too many redirects'));
                    return;
                }
            }

            if (response.statusCode !== 200) {
                reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                return;
            }

            const chunks = [];
            response.on('data', (chunk) => chunks.push(chunk));
            response.on('end', () => resolve(Buffer.concat(chunks)));
            response.on('error', reject);
        });

        request.on('error', reject);
    });
}

// Run if called directly
if (require.main === module) {
    downloadInterFont().catch(console.error);
}

module.exports = { downloadInterFont };