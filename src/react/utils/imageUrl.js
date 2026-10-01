/**
 * Admin image URL helpers shared by FigmaMobile / FigmaDesktop.
 *
 * Event cover images come from the admin API as
 *   https://admin.b2b.click/api/images/serve/<uuid>/<variant>
 * with variants thumbnail (150px), small (300px), medium (600px), large (1200px),
 * served with `Cache-Control: public, max-age=31536000, immutable`.
 *
 * WHY THIS FILE EXISTS: the server-rendered HTML preloads the first featured
 * event's `medium` variant with fetchpriority="high". That preload only helps
 * if the React hero <img> requests the *byte-identical* URL. Any difference -
 * another variant, a `?_t=<Date.now()>` cache-buster, a `?_desktop=1` marker,
 * a srcset candidate - makes the browser download the image twice and pushed
 * LCP out to ~15 s on mobile. Never append query params here, and never pick
 * the hero variant from the rendered width.
 */
import { isDevelopment } from './apiConfig';

const ADMIN_SERVE_RE = /\/api\/images\/serve\/([a-f0-9-]{36})(?:\/([A-Za-z0-9_-]+))?/;

// Internal cache-busting keys that used to be appended by the data hook and by
// these components. Only these are stripped; everything else in the query is
// kept verbatim so an admin-provided `?v=` survives untouched. The strip is a
// safety net: if a cache-buster is ever re-added upstream the hero URL would
// silently stop matching the SSR preload again.
const INTERNAL_CACHE_BUSTERS = ['_cb', '_t', '_desktop', '_mobile'];

/** The featured hero always uses this variant; it is what the SSR preload fetches. */
export const HERO_VARIANT = 'medium';

export const getAdminImageOrigin = () =>
  (isDevelopment() ? 'http://localhost:3002' : 'https://admin.b2b.click');

/** Smallest admin variant that still covers the rendered CSS width. */
export const variantForWidth = (width) => {
  if (width <= 150) return 'thumbnail';
  if (width <= 300) return 'small';
  if (width <= 800) return 'medium';
  return 'large';
};

/**
 * Parse an admin image URL (absolute or relative, with or without a variant
 * segment). Returns null for anything that is not an /api/images/serve/<uuid>
 * URL so callers can fall through to their other handlers.
 */
export const parseAdminImageUrl = (url) => {
  if (typeof url !== 'string') return null;
  const qIndex = url.indexOf('?');
  const path = qIndex === -1 ? url : url.slice(0, qIndex);
  const match = path.match(ADMIN_SERVE_RE);
  if (!match) return null;

  // Preserve the admin-provided query as-is (no re-encoding), minus our own
  // legacy cache-busters.
  const query = qIndex === -1
    ? ''
    : url
      .slice(qIndex + 1)
      .split('&')
      .filter((pair) => pair && !INTERNAL_CACHE_BUSTERS.includes(pair.split('=')[0]))
      .join('&');

  return { uuid: match[1], variant: match[2] || null, query };
};

export const isAdminImageUrl = (url) => parseAdminImageUrl(url) !== null;

const buildAdminImageUrl = ({ uuid, query }, variant) =>
  `${getAdminImageOrigin()}/api/images/serve/${uuid}/${variant}${query ? `?${query}` : ''}`;

/**
 * Admin image URL sized for a rendered CSS width (cards, thumbnails).
 * Returns null when `url` is not an admin image.
 */
export const getAdminImageUrl = (url, width) => {
  const parsed = parseAdminImageUrl(url);
  if (!parsed) return null;
  return buildAdminImageUrl(parsed, width ? variantForWidth(width * devicePixelScale()) : HERO_VARIANT);
};

/**
 * Cards are sized in CSS pixels but painted in device pixels: a 111 px card on
 * a 2x phone needs ~222 px of image, so the variant is chosen for the scaled
 * width. Capped at 2x (3x phones gain nothing visible from a larger cover and
 * would pull the 1200 px variant for a thumbnail). The hero ignores this on
 * purpose: it must match the SSR preload exactly.
 */
const devicePixelScale = () => {
  if (typeof window === 'undefined') return 1;
  const dpr = Number(window.devicePixelRatio) || 1;
  return Math.min(Math.max(dpr, 1), 2);
};

/**
 * Featured hero URL: ALWAYS `medium`, regardless of rendered width or DPR, so
 * the request is identical to the SSR <link rel="preload">. Returns null when
 * `url` is not an admin image.
 */
export const getHeroImageUrl = (url) => {
  const parsed = parseAdminImageUrl(url);
  if (!parsed) return null;
  return buildAdminImageUrl(parsed, HERO_VARIANT);
};
