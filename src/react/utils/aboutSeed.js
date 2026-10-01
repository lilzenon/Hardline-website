/**
 * About page data helpers shared by AboutPage (desktop) and AboutPageMobile.
 *
 * WHY THIS EXISTS
 * The About page used to paint skeletons, fire two fetches (about text and
 * gallery list, each with a `cb=Date.now()` cache-buster that was also stamped
 * onto every image URL), and then swap content in as the responses landed. On a
 * phone that read as the page "shifting around until everything loads": the
 * footer jumped, gallery tiles appeared one by one, and the cache-busters made
 * the browser re-download every gallery image on every visit.
 *
 * The server already fetches both payloads to render the HTML. It now inlines
 * them as `window.__INITIAL_DATA__ = { page: 'about', aboutContent, galleryImages }`
 * and both components seed their state from it, so the first React frame is the
 * final layout. The network fetches become background revalidations that only
 * touch state when the content actually changed.
 *
 * Image URLs are made absolute to the admin origin and NOTHING is appended:
 * admin already versions them (`?v=...`) and serves them immutable.
 */

const adminOrigin = () =>
  (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? 'http://localhost:3002'
    : 'https://admin.b2b.click';

/** Absolute admin URL for a relative admin path; absolute and data: URLs pass through. */
export const absolutizeAdminUrl = (u) => {
  if (!u || typeof u !== 'string') return u || undefined;
  if (/^(https?:)?\/\//i.test(u) || /^data:/i.test(u)) return u;
  return `${adminOrigin()}${u.startsWith('/') ? '' : '/'}${u}`;
};

const UUID_RE = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i;

/**
 * Normalise one gallery record from the admin API into the shape MasonryGallery
 * renders: `{ ...img, url, urls: { thumbnail, small, medium, large, original }, srcSet }`
 * with every URL absolute. Returns null for records with no usable URL.
 */
export const normalizeGalleryImage = (img) => {
  if (!img || typeof img !== 'object') return null;

  const candidate = img.url || img.src || img.image_url || img.file_url || img.path || img.imagePath || '';
  const orig = typeof candidate === 'string' ? candidate : (candidate && candidate.url) || '';

  let url;
  if (orig && /^https?:\/\//i.test(orig)) {
    url = orig;
  } else if (orig && orig.includes('/api/images/serve/')) {
    // Ensure a variant segment; default to medium.
    const hasVariant = /\/api\/images\/serve\/[a-f0-9-]{36}\/[^/?]+/i.test(orig);
    url = absolutizeAdminUrl(hasVariant ? orig : `${orig.replace(/\/?(\?.*)?$/, '')}/medium`);
  } else if (orig && /^\/?(uploads|static\/uploads|data\/static\/uploads)\//i.test(orig)) {
    // Legacy uploads path
    let pub = orig.replace(/^\/?data\/static\/uploads\//, '/static/uploads/');
    if (!pub.startsWith('/')) pub = `/${pub}`;
    url = absolutizeAdminUrl(pub);
  } else if (orig && UUID_RE.test(orig)) {
    url = `${adminOrigin()}/api/images/serve/${orig.match(UUID_RE)[1]}/medium`;
  } else if (img.uuid && typeof img.uuid === 'string') {
    url = `${adminOrigin()}/api/images/serve/${img.uuid}/medium`;
  } else if (orig && orig.startsWith('/')) {
    url = absolutizeAdminUrl(orig);
  } else {
    url = orig || undefined;
  }
  if (!url) return null;

  const variants = (img.urls && typeof img.urls === 'object') ? img.urls
    : (img.srcSet && typeof img.srcSet === 'object') ? img.srcSet
      : {};
  const urls = {
    thumbnail: absolutizeAdminUrl(variants.thumbnail),
    small: absolutizeAdminUrl(variants.small),
    medium: absolutizeAdminUrl(variants.medium) || url,
    large: absolutizeAdminUrl(variants.large),
    original: absolutizeAdminUrl(variants.original) || url
  };

  const width = Number(img.width) || undefined;
  const height = Number(img.height) || undefined;

  return { ...img, url, urls, srcSet: urls, width, height };
};

export const normalizeGalleryImages = (list) =>
  Array.isArray(list) ? list.map(normalizeGalleryImage).filter(Boolean) : [];

/**
 * Read the server-inlined About seed. Returns null when absent (older cached
 * HTML, admin outage during render, dev server) so callers fall back to the
 * fetch path. Shape-checked: a homepage seed or anything unexpected is ignored.
 */
export const readAboutSeed = () => {
  try {
    const s = typeof window !== 'undefined' ? window.__INITIAL_DATA__ : null;
    if (!s || typeof s !== 'object' || s.page !== 'about') return null;
    const aboutContent = typeof s.aboutContent === 'string' && s.aboutContent.trim() ? s.aboutContent : null;
    const galleryImages = normalizeGalleryImages(s.galleryImages);
    if (!aboutContent && galleryImages.length === 0) return null;
    return { aboutContent, galleryImages };
  } catch (_) {
    return null;
  }
};

/**
 * Stable fingerprint of what the gallery RENDERS, so a background revalidation
 * only triggers a re-render (and image remounts) when something visible changed.
 */
export const galleryFingerprint = (list) => {
  try {
    return JSON.stringify((Array.isArray(list) ? list : []).map((i) => [
      i.uuid || i.url, i.urls && i.urls.medium, i.width, i.height, i.title || i.alt || ''
    ]));
  } catch (_) {
    return `unstable-${Date.now()}`;
  }
};

/**
 * Run `fn` once the page has loaded and the browser is idle, so a background
 * revalidation never competes with the first paint. Returns a cancel function.
 */
export const runWhenIdle = (fn, fallbackDelayMs = 1500) => {
  let cancelled = false;
  let idleId = null;
  let timer = null;
  const schedule = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(() => { if (!cancelled) fn(); }, { timeout: 4000 });
    } else {
      timer = setTimeout(() => { if (!cancelled) fn(); }, fallbackDelayMs);
    }
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener('load', schedule);
    if (idleId != null && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idleId);
    if (timer) clearTimeout(timer);
  };
};
