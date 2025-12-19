const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

/**
 * Inline Critical CSS Post-Build Script
 * 
 * This script runs after 'vite build' to identify small, critical CSS chunks
 * (specifically the main index entry) and inline them directly into the HTML.
 * 
 * WHY: Eliminates the "Render-blocking resources" warning in Lighthouse.
 * HOW: Replaces <link rel="stylesheet"> with <style>...</style> for files < 15KB.
 */

const DIST_DIR = path.resolve(__dirname, '../dist');
const HTML_PATH = path.join(DIST_DIR, 'index.html');
const MAX_INLINE_SIZE_KB = 15; // Only inline if smaller than this

async function inlineCriticalCss() {
    console.log('🚀 Starting CSS Inlining Process...');

    if (!fs.existsSync(HTML_PATH)) {
        console.error('❌ Error: dist/index.html not found. Did the build fail?');
        process.exit(1);
    }

    try {
        const htmlContent = fs.readFileSync(HTML_PATH, 'utf8');
        const $ = cheerio.load(htmlContent);
        let inlinedCount = 0;

        // Iterate over all stylesheet links
        $('link[rel="stylesheet"]').each((i, elem) => {
            const href = $(elem).attr('href');

            // We specifically target the main Vite-generated asset (index-HASH.css)
            // We generally avoid inlining third-party CSS or standard static CSS unless critical
            if (href && href.includes('assets/index-') && href.endsWith('.css')) {

                // Handle absolute paths (e.g. /assets/...) vs relative
                const relativePath = href.startsWith('/') ? href.substring(1) : href;
                const fullPath = path.join(DIST_DIR, relativePath);

                if (fs.existsSync(fullPath)) {
                    const stats = fs.statSync(fullPath);
                    const fileSizeKB = stats.size / 1024;

                    console.log(`🔍 Found CSS candidate: ${relativePath} (${fileSizeKB.toFixed(2)} KB)`);

                    if (fileSizeKB <= MAX_INLINE_SIZE_KB) {
                        const cssContent = fs.readFileSync(fullPath, 'utf8');

                        // 1. Create the style block
                        const styleTag = `<style>${cssContent}</style>`;

                        // 2. Insert style block BEFORE the link (or replace it)
                        // Replacing is cleaner as it removes the network request entirely
                        $(elem).replaceWith(styleTag);

                        console.log(`✅ Inlined CSS into HTML (Saved request + ${fileSizeKB.toFixed(2)} KB download overhead)`);
                        inlinedCount++;
                    } else {
                        console.log(`⚠️ Skipping inline: File is larger than ${MAX_INLINE_SIZE_KB}KB threshold`);
                    }
                } else {
                    console.warn(`⚠️ Warning: Referenced CSS file not found on disk: ${fullPath}`);
                }
            }
        });

        if (inlinedCount > 0) {
            fs.writeFileSync(HTML_PATH, $.html());
            console.log(`🎉 Success: Inlined ${inlinedCount} critical CSS file(s).`);
        } else {
            console.log('ℹ️ No eligible CSS files found to inline.');
        }

    } catch (error) {
        console.error('❌ Fatal Error during CSS inlining:', error);
        process.exit(1);
    }
}

inlineCriticalCss();
