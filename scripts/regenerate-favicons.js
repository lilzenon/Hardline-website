#!/usr/bin/env node
/**
 * Regenerate favicons from the OFFICIAL Hardline favicon SVG using a
 * dual-design strategy that keeps the brand's circular look on browser
 * tabs while producing a clean appearance in Google search results.
 *
 * Background:
 *   The brand SVG draws the red as an inscribed <circle> inside a square
 *   viewBox, leaving the four corners transparent. That looks beautiful
 *   on a browser tab (the red disc reads as a circle) but breaks in
 *   Google search, which applies this CSS to every favicon:
 *       border: 1px solid #dadce0;
 *       background-color: #f1f3f4;
 *       border-radius: 50%;
 *   Google's #f1f3f4 light-gray bleeds through the transparent corners
 *   before the circular crop is applied — that's the "white background"
 *   ring users see in search snippets. Documented at:
 *     https://developers.google.com/search/docs/appearance/favicon-in-search
 *     https://www.codeface.com/browser-tabs-different-favicons-from-search-results
 *
 * Strategy:
 *   - Small sizes (16, 32) and the SVG: rendered from the inscribed-
 *     circle source, transparent corners preserved. Browsers pick these
 *     for tab/bookmark display, so the user-visible browser-tab look is
 *     a red circle (the brand's intent).
 *   - Large sizes (48 and up — Google search target, PWA install,
 *     iOS home screen): rendered from a transformed full-bleed SVG so
 *     the corners are opaque red. Google's circular crop then yields a
 *     solid red disc with no gray bleed; iOS adds its own rounded mask
 *     and the colored corners hide under it.
 *   - The favicon.ico carries 16 (circle) + 32 (circle) + 48 (full-
 *     bleed) entries so legacy /favicon.ico fetchers see both designs
 *     and pick the right one for their display size.
 *
 * Source SVG (read-only):
 *   C:\Users\chris\Documents\KUTT-B2B\HARDLINE LOGOS\favicon\favicon.svg
 *
 * Outputs (overwritten in place):
 *   static/images/favicon.svg                 (inscribed-circle copy)
 *   static/images/favicon.ico                 (16+32 circle, 48 full-bleed)
 *   static/favicon.ico                        (same)
 *   static/images/favicon-{16,32}x*.png       (inscribed circle)
 *   static/favicon-{16,32}x*.png              (inscribed circle)
 *   static/images/favicon-{48,96,192,196,512}x*.png   (full-bleed)
 *   static/images/web-app-manifest-{192,512}x*.png    (full-bleed)
 *   static/apple-touch-icon.png               (180, full-bleed)
 *   static/images/apple-touch-icon.png        (same)
 *   static/images/apple-touch-icon-{57..152}x*.png    (full-bleed)
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'C:\\Users\\chris\\Documents\\KUTT-B2B\\HARDLINE LOGOS\\favicon';
const ROOT = path.resolve(__dirname, '..');
const STATIC = path.join(ROOT, 'static');
const IMG = path.join(STATIC, 'images');

const circleSvg = fs.readFileSync(path.join(SRC, 'favicon.svg'), 'utf8');

// Build the full-bleed variant by replacing the inscribed <circle> with a
// <rect> covering the whole viewBox. The bull glyph paths are untouched
// — only the background changes.
const fullBleedSvg = (() => {
    const replaced = circleSvg.replace(
        /<circle\s+class="cls-1"[^>]*\/?>(\s*<\/circle>)?/i,
        '<rect class="cls-1" x="0" y="0" width="418.01" height="418.01"/>'
    );
    if (replaced === circleSvg) {
        throw new Error(
            'Could not find the inscribed <circle class="cls-1"> in the source ' +
            'SVG. The source file changed shape — update this transform before re-running.'
        );
    }
    return replaced;
})();

// Stash the official source SVG for traceability.
const traceDir = path.join(IMG, 'hardline-source');
fs.mkdirSync(traceDir, { recursive: true });
fs.copyFileSync(path.join(SRC, 'favicon.svg'), path.join(traceDir, 'favicon.svg'));

// Browser tabs that read the SVG should see the inscribed circle, so the
// shipped favicon.svg is the original (transparent-corner) design.
fs.writeFileSync(path.join(IMG, 'favicon.svg'), circleSvg);
console.log('  svg    -> static/images/favicon.svg (inscribed circle)');

// ----- PNG rendering -----
// density:384 keeps the rasterizer working at a high enough internal
// resolution that small targets (16/32) keep crisp edges.
function renderPng(svgString, size) {
    return sharp(Buffer.from(svgString), { density: 384 })
        .resize(size, size, { fit: 'fill' })
        .png({ compressionLevel: 9 })
        .toBuffer();
}

async function writePng(svgString, size, dest) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, await renderPng(svgString, size));
}

// ----- ICO encoding -----
// Multi-image ICO with PNG-encoded entries. Modern browsers (and Google's
// favicon fetcher) all support PNG-in-ICO. Each entry can come from a
// different SVG variant, so the same .ico file ships circle + full-bleed
// designs side by side.
function encodeIco(images) {
    const HEADER = 6;
    const ENTRY = 16;

    const header = Buffer.alloc(HEADER);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // image type: 1 = ICO
    header.writeUInt16LE(images.length, 4);

    let dataOffset = HEADER + ENTRY * images.length;
    const entries = images.map(({ size, data }) => {
        const e = Buffer.alloc(ENTRY);
        e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 = 256)
        e.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
        e.writeUInt8(0, 2); // palette colors
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

async function renderIco(spec, dest) {
    // spec is [{ size, svg }, ...] — each entry can use a different SVG.
    const images = [];
    for (const { size, svg } of spec) {
        images.push({ size, data: await renderPng(svg, size) });
    }
    fs.writeFileSync(dest, encodeIco(images));
    const summary = spec.map((s) => `${s.size}=${s.svg === circleSvg ? 'circle' : 'full-bleed'}`).join(', ');
    console.log(`  ico    -> ${path.relative(ROOT, dest)} (${summary})`);
}

// ----- Pixel verification -----
// Every PNG we ship is sampled to make sure its corners match what the
// design intent is. Browser-tab favicons (16/32/SVG) keep their corners
// transparent; Google-search and home-screen favicons (48+) must have
// opaque red corners or Google's gray tile bleeds through.
async function expectCornerAlpha(buf, expected /* 'transparent' | 'opaque-red' */, label) {
    const { data, info } = await sharp(buf).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
    const w = info.width, ch = info.channels;
    const corners = [
        [0, 0],
        [w - 1, 0],
        [0, w - 1],
        [w - 1, w - 1],
    ].map(([x, y]) => {
        const i = (y * w + x) * ch;
        return { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };
    });

    const test = (c) => {
        if (expected === 'transparent') return c.a === 0;
        // opaque-red: alpha 255 + dominant red. Edge antialiasing can
        // reduce saturation slightly for small icons, so we accept any
        // strong red where r >> g and r >> b.
        return c.a === 255 && c.r > 200 && c.g < 60 && c.b < 60;
    };

    const ok = corners.every(test);
    if (!ok) {
        const detail = corners.map((c) => `(${c.r},${c.g},${c.b},${c.a})`).join(' ');
        throw new Error(`${label}: expected ${expected} corners, got ${detail}`);
    }
    console.log(`  ✓ ${label}: corners ${expected}`);
}

(async () => {
    // ---- PNG variants ----
    // Inscribed-circle (transparent corners) — what browsers pick for
    // tab/bookmark display.
    const circleTargets = [
        [16, path.join(IMG, 'favicon-16x16.png')],
        [16, path.join(STATIC, 'favicon-16x16.png')],
        [32, path.join(IMG, 'favicon-32x32.png')],
        [32, path.join(STATIC, 'favicon-32x32.png')],
    ];
    for (const [size, dest] of circleTargets) {
        await writePng(circleSvg, size, dest);
        console.log(`  png    -> ${path.relative(ROOT, dest)} (${size}x${size}, circle)`);
    }

    // Full-bleed (opaque red corners) — sizes Google fetches for search
    // results, plus PWA install and iOS home-screen targets where the
    // surface adds its own rounded mask.
    const fullBleedTargets = [
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
    for (const [size, dest] of fullBleedTargets) {
        await writePng(fullBleedSvg, size, dest);
        console.log(`  png    -> ${path.relative(ROOT, dest)} (${size}x${size}, full-bleed)`);
    }

    // ---- ICO files ----
    // Mixed: 16 + 32 keep the circle look (browsers picking from the .ico
    // for small displays); 48 is full-bleed (Google search picks the
    // largest entry it can).
    const icoSpec = [
        { size: 16, svg: circleSvg },
        { size: 32, svg: circleSvg },
        { size: 48, svg: fullBleedSvg },
    ];
    await renderIco(icoSpec, path.join(IMG, 'favicon.ico'));
    await renderIco(icoSpec, path.join(STATIC, 'favicon.ico'));

    // ---- Verifications ----
    await expectCornerAlpha(fs.readFileSync(path.join(IMG, 'favicon-16x16.png')),  'transparent', 'favicon-16x16.png');
    await expectCornerAlpha(fs.readFileSync(path.join(IMG, 'favicon-32x32.png')),  'transparent', 'favicon-32x32.png');
    await expectCornerAlpha(fs.readFileSync(path.join(IMG, 'favicon-48x48.png')),  'opaque-red',  'favicon-48x48.png');
    await expectCornerAlpha(fs.readFileSync(path.join(IMG, 'favicon-192x192.png')),'opaque-red',  'favicon-192x192.png');
    await expectCornerAlpha(fs.readFileSync(path.join(IMG, 'favicon-512x512.png')),'opaque-red',  'favicon-512x512.png');
    await expectCornerAlpha(fs.readFileSync(path.join(STATIC, 'apple-touch-icon.png')), 'opaque-red', 'apple-touch-icon.png');

    console.log('\nFavicon regen complete (dual-design: circle for tabs, full-bleed for Google + iOS).');
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
