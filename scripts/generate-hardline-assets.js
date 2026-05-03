#!/usr/bin/env node
/**
 * Generate all Hardline brand assets from the source SVGs.
 *
 * Inputs (from C:\Users\chris\Documents\KUTT-B2B\HARDLINE LOGOS):
 *   - HARDLINE_SHORTLOGO.svg  -> short logo / favicon glyph
 *   - hardline_MAIN lgo.svg   -> main wordmark
 *   - PP HARD.png             -> circular branded asset (used for OG image)
 *
 * Strategy: keep the original B2B-named filenames so existing image references
 * keep working without code changes. Just replace the file contents.
 *
 * Idempotent — safe to re-run.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'C:\\Users\\chris\\Documents\\KUTT-B2B\\HARDLINE LOGOS';
const ROOT = path.resolve(__dirname, '..');
const STATIC = path.join(ROOT, 'static');
const IMG = path.join(STATIC, 'images');

const shortSvgPath = path.join(SRC, 'HARDLINE_SHORTLOGO.svg');
const mainSvgPath = path.join(SRC, 'hardline_MAIN lgo.svg');
const ppPngPath = path.join(SRC, 'PP HARD.png');

const shortSvg = fs.readFileSync(shortSvgPath, 'utf8');
const mainSvg = fs.readFileSync(mainSvgPath, 'utf8');

// Copy the SVG sources into the repo for traceability.
const sourceDir = path.join(IMG, 'hardline-source');
fs.mkdirSync(sourceDir, { recursive: true });
fs.copyFileSync(shortSvgPath, path.join(sourceDir, 'HARDLINE_SHORTLOGO.svg'));
fs.copyFileSync(mainSvgPath, path.join(sourceDir, 'hardline_MAIN_logo.svg'));
fs.copyFileSync(ppPngPath, path.join(sourceDir, 'PP_HARD.png'));

// Map of "destination filename -> SVG content"
const shortDestinations = [
  path.join(IMG, 'SMALL_B2BLOGO_WHITE.svg'),
  path.join(IMG, 'favicon.svg'),
  path.join(STATIC, 'B2B_MINI_LOGO.svg'),
];

const mainDestinations = [
  path.join(IMG, 'b2b-logo.svg'),
  path.join(IMG, 'b2b-logo-updated.svg'),
  path.join(IMG, 'b2b_logo_new.svg'),
  path.join(IMG, 'bounce-logo.svg'),
  path.join(IMG, 'figma-exact', 'b2b-logo-nav.svg'),
  path.join(IMG, 'figma-exact', 'b2b-logo-bottom.svg'),
  path.join(IMG, 'mobile-figma', 'b2b-logo-mobile.svg'),
  path.join(STATIC, 'b2b_logo.svg'),
];

for (const dest of shortDestinations) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, shortSvg);
  console.log('  short ->', path.relative(ROOT, dest));
}

for (const dest of mainDestinations) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, mainSvg);
  console.log('  main  ->', path.relative(ROOT, dest));
}

// PNG generation for favicons / apple-touch from the short logo.
// The short SVG is taller than wide; render it onto a square black canvas
// at the requested size with padding so the glyph stays crisp.
async function rasterizeShortToSquare(size, dest) {
  // Render the SVG slightly smaller than the canvas so it has breathing room.
  const innerSize = Math.round(size * 0.78);
  const innerPng = await sharp(Buffer.from(shortSvg), { density: 384 })
    .resize({ width: innerSize, height: innerSize, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite([{ input: innerPng, gravity: 'center' }])
    .png()
    .toFile(dest);
  console.log('  png   ->', path.relative(ROOT, dest), `(${size}x${size})`);
}

// PNG generation for OG image from PP HARD.png (already a square brand asset).
// OG image is 1200x630, so letterbox onto black.
async function generateOgImage(dest) {
  const inner = await sharp(ppPngPath)
    .resize({ width: 600, height: 600, fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile(dest);
  console.log('  og    ->', path.relative(ROOT, dest), '(1200x630)');
}

// PNG generation for the regular logo (wordmark on transparent for use in JSON-LD).
async function generateLogoPng(dest, width = 800) {
  // Main SVG viewBox is 2057 x 429, so width:height = 2057:429
  const height = Math.round(width * 429 / 2057);
  await sharp(Buffer.from(mainSvg), { density: 384 })
    .resize({ width, height, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(dest);
  console.log('  logo  ->', path.relative(ROOT, dest), `(${width}x${height})`);
}

(async () => {
  // Favicon-style PNGs sourced from the short glyph.
  const pngTargets = [
    [16,  path.join(IMG, 'favicon-16x16.png')],
    [16,  path.join(STATIC, 'favicon-16x16.png')],
    [32,  path.join(IMG, 'favicon-32x32.png')],
    [32,  path.join(STATIC, 'favicon-32x32.png')],
    [48,  path.join(IMG, 'favicon-48x48.png')],
    [192, path.join(IMG, 'favicon-192x192.png')],
    [196, path.join(IMG, 'favicon-196x196.png')],
    [512, path.join(IMG, 'favicon-512x512.png')],
    [57,  path.join(IMG, 'apple-touch-icon-57x57.png')],
    [60,  path.join(IMG, 'apple-touch-icon-60x60.png')],
    [72,  path.join(IMG, 'apple-touch-icon-72x72.png')],
    [76,  path.join(IMG, 'apple-touch-icon-76x76.png')],
    [114, path.join(IMG, 'apple-touch-icon-114x114.png')],
    [120, path.join(IMG, 'apple-touch-icon-120x120.png')],
    [144, path.join(IMG, 'apple-touch-icon-144x144.png')],
    [152, path.join(IMG, 'apple-touch-icon-152x152.png')],
    [180, path.join(IMG, 'apple-touch-icon.png')],
    [180, path.join(STATIC, 'apple-touch-icon.png')],
  ];
  for (const [size, dest] of pngTargets) {
    await rasterizeShortToSquare(size, dest);
  }

  // OG image (Facebook/Twitter share card)
  await generateOgImage(path.join(IMG, 'og-image.png'));
  // Some templates point at og-image.svg; replace that with the short SVG so it
  // at least renders the brand mark. Real social platforms use the .png anyway.
  fs.writeFileSync(path.join(IMG, 'og-image.svg'), shortSvg);
  console.log('  og    ->', path.relative(ROOT, path.join(IMG, 'og-image.svg')), '(svg)');

  // logo.png used in JSON-LD Organization schema
  await generateLogoPng(path.join(IMG, 'logo.png'), 800);
  await generateLogoPng(path.join(IMG, 'card.png'), 1200);

  console.log('\nDone. Hardline brand assets generated.');
})().catch((err) => {
  console.error('Asset generation failed:', err);
  process.exit(1);
});
