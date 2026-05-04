#!/usr/bin/env node
/**
 * Regenerate favicons from the OFFICIAL Hardline favicon SVG, ensuring
 * the rendered raster files (ICO/PNG) have a full-bleed red background
 * instead of transparent corners.
 *
 * Why the change:
 *   The brand SVG draws the red as an inscribed <circle> inside a square
 *   viewBox. When rasterized verbatim, the four corners of every PNG/ICO
 *   are transparent. Google search results render favicons inside a
 *   circular crop on a light-colored tile; transparent corners show the
 *   tile through, which looks like a white outline around the icon.
 *
 *   Visually the brand mark is identical (Google's circular crop
 *   produces the same red disc with the bull glyph) — the only
 *   difference is that the corners outside the crop are now red instead
 *   of transparent, so on any UI background the icon reads as a clean
 *   solid mark.
 *
 * Source SVG (read-only):
 *   C:\Users\chris\Documents\KUTT-B2B\HARDLINE LOGOS\favicon\favicon.svg
 *
 * Outputs (overwritten in place):
 *   static/images/favicon.svg          (transformed full-bleed)
 *   static/images/favicon.ico          (multi-res 16/32/48 PNG-encoded)
 *   static/favicon.ico                 (same)
 *   static/images/favicon-{16,32,48,96,192,196,512}x*.png
 *   static/images/web-app-manifest-{192,512}x*.png
 *   static/favicon-{16,32}x*.png
 *   static/apple-touch-icon.png        (180x180)
 *   static/images/apple-touch-icon.png (180x180)
 *   static/images/apple-touch-icon-{57,60,72,76,114,120,144,152}x*.png
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'C:\\Users\\chris\\Documents\\KUTT-B2B\\HARDLINE LOGOS\\favicon';
const ROOT = path.resolve(__dirname, '..');
const STATIC = path.join(ROOT, 'static');
const IMG = path.join(STATIC, 'images');

const officialSvg = fs.readFileSync(path.join(SRC, 'favicon.svg'), 'utf8');

// Transform: replace the inscribed <circle> background with a full-bleed
// <rect> so the raster corners are red instead of transparent. The bull
// glyph paths are untouched.
const fullBleedSvg = (() => {
    const replaced = officialSvg.replace(
        /<circle\s+class="cls-1"[^>]*\/?>(\s*<\/circle>)?/i,
        '<rect class="cls-1" x="0" y="0" width="418.01" height="418.01"/>'
    );
    if (replaced === officialSvg) {
        throw new Error(
            'Could not find the inscribed <circle class="cls-1"> in the source ' +
            'SVG. The source file changed shape — update this transform before re-running.'
        );
    }
    return replaced;
})();

// Save the official source SVG into the source-traceability folder so the
// repo carries an audit trail of what we started from.
const traceDir = path.join(IMG, 'hardline-source');
fs.mkdirSync(traceDir, { recursive: true });
fs.copyFileSync(path.join(SRC, 'favicon.svg'), path.join(traceDir, 'favicon.svg'));

// Write the transformed (full-bleed) SVG into the project. This is the
// canonical favicon SVG served at /images/favicon.svg.
fs.writeFileSync(path.join(IMG, 'favicon.svg'), fullBleedSvg);
console.log('  svg    -> static/images/favicon.svg (full-bleed)');

// ----- PNG rendering -----
// density:384 keeps the rasterizer working at a high enough internal
// resolution that small targets (16/32) keep crisp edges.
async function renderPng(size) {
    return sharp(Buffer.from(fullBleedSvg), { density: 384 })
        .resize(size, size, { fit: 'fill' })
        .png({ compressionLevel: 9 })
        .toBuffer();
}

// ----- ICO encoding -----
// Multi-image ICO with PNG-encoded entries. Modern browsers (and Google's
// favicon fetcher) all support PNG-in-ICO; this is also what most online
// favicon generators emit today. Layout:
//   6-byte header (reserved=0, type=1, count=N)
// + N x 16-byte directory entries
// + N PNG blobs (referenced by absolute file offset in each entry)
function encodeIco(images) {
    const HEADER = 6;
    const ENTRY = 16;

    const header = Buffer.alloc(HEADER);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // image type: 1 = ICO
    header.writeUInt16LE(images.length, 4); // image count

    let dataOffset = HEADER + ENTRY * images.length;
    const entries = images.map(({ size, data }) => {
        const e = Buffer.alloc(ENTRY);
        e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
        e.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 means 256)
        e.writeUInt8(0, 2); // palette colors (0 for true-color)
        e.writeUInt8(0, 3); // reserved
        e.writeUInt16LE(1, 4);  // color planes
        e.writeUInt16LE(32, 6); // bits per pixel
        e.writeUInt32LE(data.length, 8);
        e.writeUInt32LE(dataOffset, 12);
        dataOffset += data.length;
        return e;
    });

    return Buffer.concat([header, ...entries, ...images.map((img) => img.data)]);
}

async function renderIco(sizes, dest) {
    const images = [];
    for (const size of sizes) {
        images.push({ size, data: await renderPng(size) });
    }
    fs.writeFileSync(dest, encodeIco(images));
    console.log(`  ico    -> ${path.relative(ROOT, dest)} (${sizes.join('/')})`);
}

async function writePng(size, dest) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, await renderPng(size));
    console.log(`  png    -> ${path.relative(ROOT, dest)} (${size}x${size})`);
}

// Sanity check: confirm a rendered raster's corner pixel is opaque red,
// not transparent. If this fails the SVG transform broke and we'd ship
// the same white-outline bug we're trying to fix.
async function assertCornerIsRed(buf, label) {
    const { data, info } = await sharp(buf)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
    const [r, g, b, a] = data; // pixel (0, 0)
    const ok = a === 255 && r > 200 && g < 50 && b < 50;
    if (!ok) {
        throw new Error(
            `${label}: corner pixel rgba(${r},${g},${b},${a}) is not opaque red — ` +
            `the favicon would still show a white outline in Google results.`
        );
    }
    console.log(`  ✓ ${label}: corner rgba(${r},${g},${b},${a})`);
}

(async () => {
    // PNG variants — every public-facing favicon size we reference.
    const pngTargets = [
        [16,  path.join(IMG, 'favicon-16x16.png')],
        [16,  path.join(STATIC, 'favicon-16x16.png')],
        [32,  path.join(IMG, 'favicon-32x32.png')],
        [32,  path.join(STATIC, 'favicon-32x32.png')],
        [48,  path.join(IMG, 'favicon-48x48.png')],
        [96,  path.join(IMG, 'favicon-96x96.png')],
        [192, path.join(IMG, 'favicon-192x192.png')],
        [196, path.join(IMG, 'favicon-196x196.png')],
        [512, path.join(IMG, 'favicon-512x512.png')],
        [192, path.join(IMG, 'web-app-manifest-192x192.png')],
        [512, path.join(IMG, 'web-app-manifest-512x512.png')],
        [180, path.join(STATIC, 'apple-touch-icon.png')],
        [180, path.join(IMG, 'apple-touch-icon.png')],
        [57,  path.join(IMG, 'apple-touch-icon-57x57.png')],
        [60,  path.join(IMG, 'apple-touch-icon-60x60.png')],
        [72,  path.join(IMG, 'apple-touch-icon-72x72.png')],
        [76,  path.join(IMG, 'apple-touch-icon-76x76.png')],
        [114, path.join(IMG, 'apple-touch-icon-114x114.png')],
        [120, path.join(IMG, 'apple-touch-icon-120x120.png')],
        [144, path.join(IMG, 'apple-touch-icon-144x144.png')],
        [152, path.join(IMG, 'apple-touch-icon-152x152.png')],
    ];
    for (const [size, dest] of pngTargets) await writePng(size, dest);

    // ICO files — same content, two locations.
    await renderIco([16, 32, 48], path.join(IMG, 'favicon.ico'));
    await renderIco([16, 32, 48], path.join(STATIC, 'favicon.ico'));

    // Verify the rasters actually have red corners (not transparent).
    await assertCornerIsRed(
        fs.readFileSync(path.join(IMG, 'favicon-32x32.png')),
        'favicon-32x32.png'
    );
    await assertCornerIsRed(
        fs.readFileSync(path.join(IMG, 'favicon-512x512.png')),
        'favicon-512x512.png'
    );

    console.log('\nFavicon regen complete.');
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
