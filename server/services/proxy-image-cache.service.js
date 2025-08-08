/**
 * Proxy Image Cache Service
 * Persistent on-disk cache for optimized external images
 */

const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const CACHE_ROOT = path.join(__dirname, '../../static/cache/external');

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function hashKey(url, width, format) {
  const h = crypto.createHash('sha1');
  h.update(`${url}|${width || ''}|${format || ''}`);
  return h.digest('hex');
}

function getCachePath(url, width, format) {
  const key = hashKey(url, width, format);
  const ext = format === 'avif' ? 'avif' : format === 'webp' ? 'webp' : 'jpg';
  ensureDirSync(CACHE_ROOT);
  return path.join(CACHE_ROOT, `${key}${width ? '-' + width : ''}.${ext}`);
}

async function readIfExists(filePath) {
  try {
    const stat = await fsp.stat(filePath);
    if (stat.isFile()) return { exists: true, stat };
  } catch {}
  return { exists: false };
}

function computeETagFromStat(stat) {
  // Weak ETag based on size + mtime
  const tag = `${stat.size.toString(16)}-${stat.mtimeMs.toString(16)}`;
  return `W/"${tag}"`;
}

function computeETagFromBuffer(buf) {
  const hash = crypto.createHash('md5').update(buf).digest('hex');
  return `"${hash}"`;
}

async function tryServeFromCache(res, req, filePath, contentType) {
  const info = await readIfExists(filePath);
  if (!info.exists) return false;

  const etag = computeETagFromStat(info.stat);
  if (req.headers['if-none-match'] === etag) {
    res.status(304);
    res.set({
      'ETag': etag,
      'Cache-Control': 'public, max-age=31536000, immutable',
    });
    return res.end();
  }

  res.set({
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=31536000, immutable',
    'ETag': etag,
  });
  res.sendFile(filePath);
  return true;
}

async function writeCacheAtomic(filePath, buffer) {
  const tmpPath = `${filePath}.tmp-${Date.now()}`;
  await fsp.writeFile(tmpPath, buffer);
  await fsp.rename(tmpPath, filePath);
}

module.exports = {
  getCachePath,
  tryServeFromCache,
  writeCacheAtomic,
  computeETagFromBuffer,
};

