#!/usr/bin/env node
/**
 * Regenerate favicons using the OFFICIAL Hardline favicon set
 * (red circle with H! glyph) instead of the generic black-bg
 * derivation done by generate-hardline-assets.js.
 *
 * Source: C:\Users\chris\Documents\KUTT-B2B\HARDLINE LOGOS\favicon\
 *
 * Pre-rendered files copied verbatim:
 *   favicon.svg, favicon.ico, apple-touch-icon.png (180),
 *   web-app-manifest-192x192.png, web-app-manifest-512x512.png,
 *   favicon-96x96.png
 *
 * Intermediate sizes generated from favicon.svg via sharp.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = 'C:\\Users\\chris\\Documents\\KUTT-B2B\\HARDLINE LOGOS\\favicon';
const ROOT = path.resolve(__dirname, '..');
const STATIC = path.join(ROOT, 'static');
const IMG = path.join(STATIC, 'images');

const officialSvg = fs.readFileSync(path.join(SRC, 'favicon.svg'), 'utf8');

// Save the official favicon SVG into the source-traceability folder.
fs.copyFileSync(
  path.join(SRC, 'favicon.svg'),
  path.join(IMG, 'hardline-source', 'favicon.svg')
);

// Pre-rendered file copies (no transformation needed)
const directCopies = [
  // [src basename, dest abs path]
  ['favicon.svg',                     path.join(IMG, 'favicon.svg')],
  ['favicon.ico',                     path.join(IMG, 'favicon.ico')],
  ['favicon.ico',                     path.join(STATIC, 'favicon.ico')],
  ['apple-touch-icon.png',            path.join(IMG, 'apple-touch-icon.png')],
  ['apple-touch-icon.png',            path.join(STATIC, 'apple-touch-icon.png')],
  ['web-app-manifest-192x192.png',    path.join(IMG, 'favicon-192x192.png')],
  ['web-app-manifest-512x512.png',    path.join(IMG, 'favicon-512x512.png')],
  ['web-app-manifest-192x192.png',    path.join(IMG, 'web-app-manifest-192x192.png')],
  ['web-app-manifest-512x512.png',    path.join(IMG, 'web-app-manifest-512x512.png')],
  ['favicon-96x96.png',               path.join(IMG, 'favicon-96x96.png')],
];
for (const [name, dest] of directCopies) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(SRC, name), dest);
  console.log('  copy   ->', path.relative(ROOT, dest));
}

// Render intermediate sizes from the official SVG. The SVG is already a
// square red circle so it scales cleanly — no extra background needed.
async function renderSize(size, dest) {
  await sharp(Buffer.from(officialSvg), { density: 384 })
    .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(dest);
  console.log('  png    ->', path.relative(ROOT, dest), `(${size}x${size})`);
}

(async () => {
  const targets = [
    [16,  path.join(IMG, 'favicon-16x16.png')],
    [16,  path.join(STATIC, 'favicon-16x16.png')],
    [32,  path.join(IMG, 'favicon-32x32.png')],
    [32,  path.join(STATIC, 'favicon-32x32.png')],
    [48,  path.join(IMG, 'favicon-48x48.png')],
    [196, path.join(IMG, 'favicon-196x196.png')],
    [57,  path.join(IMG, 'apple-touch-icon-57x57.png')],
    [60,  path.join(IMG, 'apple-touch-icon-60x60.png')],
    [72,  path.join(IMG, 'apple-touch-icon-72x72.png')],
    [76,  path.join(IMG, 'apple-touch-icon-76x76.png')],
    [114, path.join(IMG, 'apple-touch-icon-114x114.png')],
    [120, path.join(IMG, 'apple-touch-icon-120x120.png')],
    [144, path.join(IMG, 'apple-touch-icon-144x144.png')],
    [152, path.join(IMG, 'apple-touch-icon-152x152.png')],
  ];
  for (const [size, dest] of targets) await renderSize(size, dest);
  console.log('\nFavicon regen complete.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
