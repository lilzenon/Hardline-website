import React, { useState, useEffect } from 'react';

// Social media platform configurations with authentic brand colors and icons
const SOCIAL_PLATFORMS = {
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M92 46C92 20.5949 71.4051 0 46 0C20.5949 0 0 20.5949 0 46C0 68.9895 16.7909 88.1309 38.75 91.3906V59.25H27.0625V46H38.75V35.8875C38.75 24.3219 45.6094 18.0625 56.1281 18.0625C61.1125 18.0625 66.3125 18.9375 66.3125 18.9375V30.25H60.6281C55.0344 30.25 53.25 33.6672 53.25 37.1875V46H65.8125L63.7781 59.25H53.25V91.3906C75.2091 88.1309 92 68.9895 92 46Z" fill="rgba(255, 255, 255, 0.85)" />
      </svg>
    )
  },
  instagram: {
    name: 'Instagram',
    color: '#E4405F',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46 8.28125C58.2656 8.28125 59.6719 8.33594 64.5781 8.55469C69.1562 8.75 71.6406 9.51562 73.2969 10.1406C75.4844 11.0156 77.0312 12.0781 78.6406 13.6875C80.25 15.2969 81.3125 16.8438 82.1875 19.0312C82.8125 20.6875 83.5781 23.1719 83.7734 27.75C83.9922 32.6562 84.0469 34.0625 84.0469 46.3281C84.0469 58.5938 83.9922 60 83.7734 64.9062C83.5781 69.4844 82.8125 71.9688 82.1875 73.625C81.3125 75.8125 80.25 77.3594 78.6406 78.9688C77.0312 80.5781 75.4844 81.6406 73.2969 82.5156C71.6406 83.1406 69.1562 83.9062 64.5781 84.1016C59.6719 84.3203 58.2656 84.375 46 84.375C33.7344 84.375 32.3281 84.3203 27.4219 84.1016C22.8438 83.9062 20.3594 83.1406 18.7031 82.5156C16.5156 81.6406 14.9688 80.5781 13.3594 78.9688C11.75 77.3594 10.6875 75.8125 9.8125 73.625C9.1875 71.9688 8.42188 69.4844 8.22656 64.9062C8.00781 60 7.95312 58.5938 7.95312 46.3281C7.95312 34.0625 8.00781 32.6562 8.22656 27.75C8.42188 23.1719 9.1875 20.6875 9.8125 19.0312C10.6875 16.8438 11.75 15.2969 13.3594 13.6875C14.9688 12.0781 16.5156 11.0156 18.7031 10.1406C20.3594 9.51562 22.8438 8.75 27.4219 8.55469C32.3281 8.33594 33.7344 8.28125 46 8.28125ZM46 0C33.5156 0 31.9844 0.0625 27.0156 0.28125C22.0625 0.5 18.6094 1.29688 15.6094 2.46875C12.4844 3.6875 9.85938 5.32812 7.25 7.9375C4.64062 10.5469 3 13.1719 1.78125 16.2969C0.609375 19.2969 -0.1875 22.75 0.03125 27.7031C0.25 32.6719 0.3125 34.2031 0.3125 46.6875C0.3125 59.1719 0.25 60.7031 0.03125 65.6719C-0.1875 70.625 0.609375 74.0781 1.78125 77.0781C3 80.2031 4.64062 82.8281 7.25 85.4375C9.85938 88.0469 12.4844 89.6875 15.6094 90.9062C18.6094 92.0781 22.0625 92.875 27.0156 93.0938C31.9844 93.3125 33.5156 93.375 46 93.375C58.4844 93.375 60.0156 93.3125 64.9844 93.0938C69.9375 92.875 73.3906 92.0781 76.3906 90.9062C79.5156 89.6875 82.1406 88.0469 84.75 85.4375C87.3594 82.8281 89 80.2031 90.2188 77.0781C91.3906 74.0781 92.1875 70.625 92.4062 65.6719C92.625 60.7031 92.6875 59.1719 92.6875 46.6875C92.6875 34.2031 92.625 32.6719 92.4062 27.7031C92.1875 22.75 91.3906 19.2969 90.2188 16.2969C89 13.1719 87.3594 10.5469 84.75 7.9375C82.1406 5.32812 79.5156 3.6875 76.3906 2.46875C73.3906 1.29688 69.9375 0.5 64.9844 0.28125C60.0156 0.0625 58.4844 0 46 0Z" fill="rgba(255, 255, 255, 0.85)" />
        <path d="M46 22.4375C33.0781 22.4375 22.4375 33.0781 22.4375 46C22.4375 58.9219 33.0781 69.5625 46 69.5625C58.9219 69.5625 69.5625 58.9219 69.5625 46C69.5625 33.0781 58.9219 22.4375 46 22.4375ZM46 61.25C37.6719 61.25 30.75 54.3281 30.75 46C30.75 37.6719 37.6719 30.75 46 30.75C54.3281 30.75 61.25 37.6719 61.25 46C61.25 54.3281 54.3281 61.25 46 61.25Z" fill="rgba(255, 255, 255, 0.85)" />
        <path d="M76.0938 21.5312C76.0938 24.5312 73.6562 26.9688 70.6562 26.9688C67.6562 26.9688 65.2188 24.5312 65.2188 21.5312C65.2188 18.5312 67.6562 16.0938 70.6562 16.0938C73.6562 16.0938 76.0938 18.5312 76.0938 21.5312Z" fill="rgba(255, 255, 255, 0.85)" />
      </svg>
    )
  },
  twitter: {
    name: 'X',
    color: '#000000',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M69.9 8.5h12.6l-27.6 31.5L92 83.5H64.6l-19.9-26L19.1 83.5H6.5l29.5-33.7L8 8.5h28.2l18 23.8L69.9 8.5zM65.4 76.3h7l-45.1-59.6H20L65.4 76.3z" fill="rgba(255, 255, 255, 0.85)" />
      </svg>
    )
  },
  tiktok: {
    name: 'TikTok',
    color: '#000000',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65.2188 0H50.5938V62.5625C50.5938 70.0938 44.6875 76.1875 37.1562 76.1875C29.625 76.1875 23.7188 70.0938 23.7188 62.5625C23.7188 55.2188 29.4375 49.3125 36.5938 49.125V34.3125C21.6562 34.5 9.09375 47.25 9.09375 62.5625C9.09375 78.0625 21.6562 91 37.1562 91C52.6562 91 65.2188 78.0625 65.2188 62.5625V30.4375C71.3125 34.6875 78.6562 37.1562 86.375 37.1562V22.5312C74.5625 22.5312 65.2188 13.1875 65.2188 1.375V0Z" fill="rgba(255, 255, 255, 0.85)" />
      </svg>
    )
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90.0625 23.9375C89.0938 20.0156 86.0938 16.8906 82.1719 15.9219C75.0938 14.1875 46 14.1875 46 14.1875C46 14.1875 16.9062 14.1875 9.82812 15.9219C5.90625 16.8906 2.90625 20.0156 1.9375 23.9375C0.203125 31.0156 0.203125 46 0.203125 46C0.203125 46 0.203125 60.9844 1.9375 68.0625C2.90625 71.9844 5.90625 75.1094 9.82812 76.0781C16.9062 77.8125 46 77.8125 46 77.8125C46 77.8125 75.0938 77.8125 82.1719 76.0781C86.0938 75.1094 89.0938 71.9844 90.0625 68.0625C91.7969 60.9844 91.7969 46 91.7969 46C91.7969 46 91.7969 31.0156 90.0625 23.9375ZM37.1562 58.9375V33.0625L60.6562 46L37.1562 58.9375Z" fill="rgba(255, 255, 255, 0.85)" />
      </svg>
    )
  },
  spotify: {
    name: 'Spotify',
    color: '#1DB954',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46 0C20.5949 0 0 20.5949 0 46C0 71.4051 20.5949 92 46 92C71.4051 92 92 71.4051 92 46C92 20.5949 71.4051 0 46 0ZM67.0781 66.3125C66.3125 67.6562 64.5781 68.0625 63.2344 67.2969C52.4688 60.9844 38.75 59.4375 22.7812 63.4375C21.25 63.8438 19.7031 62.9688 19.2969 61.4375C18.8906 59.9062 19.7656 58.3594 21.2969 57.9531C39.1406 53.5 54.3906 55.2344 66.5 62.5625C67.8438 63.3281 68.25 65.0625 67.0781 66.3125ZM72.5625 53.875C71.6406 55.5 69.5 55.9844 67.875 55.0625C55.5 47.8125 36.5938 45.7812 22.0312 50.5938C20.2031 51.1406 18.2812 50.1719 17.7344 48.3438C17.1875 46.5156 18.1562 44.5938 19.9844 44.0469C36.7812 38.5625 57.7188 40.8594 71.9688 49.1875C73.5938 50.1094 74.0781 52.25 72.5625 53.875ZM73.0156 40.9375C58.2188 32.6562 33.8125 31.8906 19.7031 36.2969C17.5781 36.9375 15.3438 35.7812 14.7031 33.6562C14.0625 31.5312 15.2188 29.2969 17.3438 28.6562C33.4375 23.6562 60.0938 24.5156 76.8906 34.0625C78.7188 35.1406 79.3594 37.5625 78.2812 39.3906C77.2031 41.2188 74.7812 41.8594 73.0156 40.9375Z" fill="rgba(255, 255, 255, 0.85)" />
      </svg>
    )
  }
};

// 🚦 Module-level single-flight + short memo for /api/social-media.
//
// The nav and the footer both mount <SocialMediaButtons/> on the same page, and
// each instance used to open its own request — with its own retry chain — so
// every page view hit the proxy twice for an identical list. The in-flight
// PROMISE is shared here; the 60 s memo covers the nav/footer remounts that
// client-side route changes cause. The shared function returns raw links and
// applies no state: each instance still runs its own setState, so neither can
// leave the other stuck in `loading`.
const SOCIAL_API_URL = '/api/social-media';
const SOCIAL_STORAGE_KEY = 'hardline events_social_links';
const SOCIAL_STORAGE_TTL_MS = 5 * 60 * 1000; // 5 minutes (localStorage, survives reloads)
const SOCIAL_MEMO_TTL_MS = 60 * 1000;        // 60 s (in-memory, this document only)
const SOCIAL_MAX_RETRIES = 3;
const SOCIAL_RETRY_BASE_MS = 1000;
const SOCIAL_TIMEOUT_MS = 10000;

let socialLinksInflight = null;
let socialLinksMemo = null; // { links, timestamp }

/** Read the persisted list; null when absent, expired or unreadable. */
function readSocialLinksFromStorage() {
  try {
    const cached = localStorage.getItem(SOCIAL_STORAGE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;
    if (Array.isArray(data) && age < SOCIAL_STORAGE_TTL_MS) {
      console.log(`📦 Loaded ${data.length} social media links from cache (age: ${Math.round(age / 1000)}s)`);
      return data;
    }
    console.log('🗑️ Cache expired, fetching fresh data');
    localStorage.removeItem(SOCIAL_STORAGE_KEY);
  } catch (err) {
    console.warn('⚠️ Failed to load from cache:', err && err.message);
  }
  return null;
}

function writeSocialLinksToStorage(links) {
  try {
    localStorage.setItem(SOCIAL_STORAGE_KEY, JSON.stringify({ data: links, timestamp: Date.now() }));
    console.log('💾 Saved social media links to cache');
  } catch (err) {
    console.warn('⚠️ Failed to save to cache:', err && err.message);
  }
}

/** One network attempt. Resolves to the links array or throws. */
async function requestSocialLinksOnce() {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutId = setTimeout(() => { if (controller) controller.abort(); }, SOCIAL_TIMEOUT_MS);
  try {
    // Same-origin proxy (no CORS). cache: 'no-store' bypasses the browser HTTP
    // cache — the proxy/dashboard already send no-store, but this guards
    // against intermediate caches returning a stale list after an admin toggle.
    const response = await fetch(SOCIAL_API_URL, {
      signal: controller ? controller.signal : undefined,
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.success && Array.isArray(data.links)) {
      return data.links;
    }
    throw new Error(data.error || 'Invalid response format');
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch the social links, joining an in-flight request or a fresh memo if one
 * exists. Retries with exponential backoff (1s, 2s, 4s) exactly as the
 * per-instance code did — but once per page, not once per instance.
 * @returns {Promise<Array>} links
 */
function fetchSocialLinksShared() {
  if (socialLinksMemo && Date.now() - socialLinksMemo.timestamp < SOCIAL_MEMO_TTL_MS) {
    return Promise.resolve(socialLinksMemo.links);
  }
  if (socialLinksInflight) return socialLinksInflight;

  const request = (async () => {
    let attempt = 0;
    for (;;) {
      try {
        console.log(`🔍 Fetching social media links (attempt ${attempt + 1}/${SOCIAL_MAX_RETRIES + 1}) from ${SOCIAL_API_URL}`);
        const links = await requestSocialLinksOnce();
        console.log(`✅ Loaded ${links.length} social media links from API`);
        socialLinksMemo = { links, timestamp: Date.now() };
        writeSocialLinksToStorage(links);
        return links;
      } catch (err) {
        console.error(`❌ Error fetching social media links (attempt ${attempt + 1}):`, err);
        if (attempt >= SOCIAL_MAX_RETRIES) throw err;
        const delay = SOCIAL_RETRY_BASE_MS * Math.pow(2, attempt);
        attempt += 1;
        console.log(`🔄 Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  })();

  socialLinksInflight = request;
  // Two-arg .then rather than .finally: Promise.prototype.finally is absent on
  // Android WebView Chrome <63 (see src/react/utils/iab.js).
  request.then(
    () => { socialLinksInflight = null; },
    () => { socialLinksInflight = null; }
  );
  return request;
}

/**
 * Social Media Buttons Component
 * Displays social media buttons with authentic brand styling and animations
 * Follows exact Figma design specifications
 * @param {boolean} isDesktop - Whether this is being rendered on desktop layout
 * @param {number} containerWidth - The width of the container (for desktop sizing)
 * @param {boolean} responsive - Whether to use responsive sizing that scales with container
 * @param {number|null} maxButtonSizePx - Optional hard ceiling for button size to avoid overflow
 * @param {boolean} iconOnly - When true, displays only icons without button backgrounds/borders (for mobile nav overlay)
 * @param {boolean} circular - Render perfect circles instead of the 20px-radius
 *   squircle. At the sizes the desktop Follow Us column uses, a fixed 20px radius
 *   reads as neither square nor round; circles are also the convention for social
 *   glyphs. Opt-in so existing call sites keep their shape.
 */
const SocialMediaButtons = ({ isDesktop = false, containerWidth = null, responsive = false, maxButtonSizePx = null, iconOnly = false, circular = false }) => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonsAnimated, setButtonsAnimated] = useState(false);

  // Fetch via the module-level single-flight (see fetchSocialLinksShared), with
  // localStorage for instant first paint and as the last-resort fallback.
  useEffect(() => {
    // The shared request is NOT aborted on unmount — the other instance (nav or
    // footer) may still be waiting on it. A flag keeps setState off unmounted
    // components instead.
    let cancelled = false;

    // Load from cache immediately for instant display
    const persisted = readSocialLinksFromStorage();
    if (persisted) setSocialLinks(persisted);

    // Then fetch fresh data in background (shared across instances)
    fetchSocialLinksShared()
      .then((links) => {
        if (cancelled) return;
        setSocialLinks(links);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('⚠️ All retry attempts failed', err && err.message);
        // All retries failed - try to use cache as last resort
        const fallback = readSocialLinksFromStorage();
        if (!fallback) {
          console.error('❌ No cached data available - social media buttons will not be displayed');
          setError('Failed to load social media links');
          setSocialLinks([]); // Empty array - no buttons will be shown
        } else {
          console.log('✅ Using cached data as fallback');
          setSocialLinks(fallback);
          setError('Using cached data');
        }
      })
      // .then in place of .finally (absent on Android WebView Chrome <63)
      .then(() => {
        if (!cancelled) setLoading(false);
      });

    // Trigger animation immediately for better loading sequence
    const animTimer = setTimeout(() => setButtonsAnimated(true), 200);

    // Cleanup function
    return () => {
      cancelled = true;
      clearTimeout(animTimer);
    };
  }, []);

  // 🚨 FIX: Use fixed button sizes to prevent shrinking on viewport resize
  // The previous implementation recalculated sizes based on containerWidth, causing buttons
  // to shrink when the viewport was resized. Now using stable, fixed sizes.
  const buttonsCount = (socialLinks && socialLinks.length ? socialLinks.length : 4);
  const gapPx = isDesktop ? 16 : 0; // Mobile: remove base gap so space-between defines spacing

  // Fixed button sizes for consistent appearance across all viewport sizes
  const FIXED_DESKTOP_BUTTON_SIZE = 96; // Fixed size for desktop
  const FIXED_MOBILE_BUTTON_SIZE = 80; // Fixed size for mobile

  // Calculate dynamic button size based on container width if responsive
  const computedButtonSize = (() => {
    let size;
    if (isDesktop && responsive && containerWidth && containerWidth > 0) {
      // Calculate max possible size that fits in container
      const totalGap = gapPx * (buttonsCount - 1);
      const availableSpace = containerWidth - totalGap;
      const sizePerButton = Math.floor(availableSpace / buttonsCount);

      // Size capped at fixed desktop size (96px), but strictly constrained by container
      size = Math.min(FIXED_DESKTOP_BUTTON_SIZE, Math.max(48, sizePerButton));
    } else {
      // Fallback to fixed sizes
      size = isDesktop ? FIXED_DESKTOP_BUTTON_SIZE : FIXED_MOBILE_BUTTON_SIZE;
    }

    // Hard ceiling, applied last so it also overrides the 48px floor above.
    // Lets a caller reserve an exact row height for this component (the desktop
    // Follow Us column does this so its three blocks add up to the row height).
    if (maxButtonSizePx && maxButtonSizePx > 0) {
      size = Math.min(size, Math.round(maxButtonSizePx));
    }
    return size;
  })();

  // 0.66 of a squircle is fine, but inside a circle that puts the glyph's
  // corners right on the edge — a circle's usable box is its inscribed square.
  const iconRatio = circular ? 0.54 : 0.66;
  const computedIconSize = isDesktop ? Math.round(computedButtonSize * iconRatio) : 40;
  // Kept in one place so the loading skeleton and the "coming soon" placeholders
  // cannot drift from the real buttons' shape.
  const buttonRadius = circular ? '50%' : '20px';

  // Show skeleton during loading to maintain layout and timing
  if (loading) {
    return (
      <section
        style={{
          width: '100%',
          margin: '0',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        }}
        aria-label="Loading social media links"
      >
        <div
          className={buttonsAnimated ? 'social-buttons-spring' : 'social-buttons-hidden'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: `${gapPx}px`,
            width: '100%',
            maxWidth: '100%',
            padding: '0',
            boxSizing: 'border-box'
          }}
        >
          {/* Skeleton buttons */}
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={{
                width: `${computedButtonSize}px`,
                height: `${computedButtonSize}px`,
                minWidth: `${computedButtonSize}px`,
                maxWidth: `${computedButtonSize}px`,
                minHeight: `${computedButtonSize}px`,
                maxHeight: `${computedButtonSize}px`,
                borderRadius: buttonRadius,
                background: 'rgba(22, 22, 22, 0.50)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
                opacity: 0.6,
                aspectRatio: '1 / 1'
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  // Enhanced error handling - show fallback instead of disappearing (desktop-only placeholder)
  if (socialLinks.length === 0) {
    if (error) {
      if (isDesktop) {
        return (
          <section
            style={{ width: '100%', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            aria-label="Social media links temporarily unavailable"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: `${gapPx}px`,
                width: '100%',
                maxWidth: '100%',
                padding: '0',
                boxSizing: 'border-box'
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={`placeholder-${i}`}
                  role="button"
                  aria-disabled="true"
                  title="Coming Soon"
                  style={{
                    width: `${computedButtonSize}px`,
                    height: `${computedButtonSize}px`,
                    minWidth: `${computedButtonSize}px`,
                    maxWidth: `${computedButtonSize}px`,
                    minHeight: `${computedButtonSize}px`,
                    maxHeight: `${computedButtonSize}px`,
                    borderRadius: buttonRadius,
                    background: 'rgba(22, 22, 22, 0.50)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    opacity: 0.6,
                    aspectRatio: '1 / 1',
                    cursor: 'not-allowed'
                  }}
                >
                  <div style={{ width: Math.round(computedIconSize * 0.6), height: Math.round(computedIconSize * 0.6), borderRadius: '8px', background: 'rgba(255,255,255,0.25)' }} />
                </div>
              ))}
            </div>
          </section>
        );
      }
      // Non-desktop: keep current behavior (no render) to avoid impacting mobile/tablet layouts
      return null;
    }
    // If still loading or no links at all without error, don't render
    return null;
  }

  return (
    <section
      style={{
        width: '100%',
        margin: '0', // Remove all margins
        padding: '0', // Remove all padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch'
      }}
      aria-label="Follow us on social media"
    >
      {/* Social Media Buttons Container */}
      <div
        className={buttonsAnimated ? 'social-buttons-spring' : 'social-buttons-hidden'}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap', // Prevent stacking
          justifyContent: 'space-between', // Always spread across available width
          alignItems: 'center',
          gap: `${gapPx}px`,
          width: '100%', // Fill parent width (parent will be sized to match Laylo/title)
          maxWidth: '100%',
          padding: '0',
          boxSizing: 'border-box'
        }}
      >
        {socialLinks.map((link, index) => {
          const platform = SOCIAL_PLATFORMS[link.platform];
          if (!platform) return null;

          // Icon-only mode: larger icons, 44px touch target, no button styling
          const iconOnlySize = 44; // Minimum touch target size for accessibility
          const iconOnlyIconSize = 32; // Larger icon for visibility

          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${platform.name}`}
              style={iconOnly ? {
                // Icon-only mode: no backgrounds, borders, or button styling
                width: `${iconOnlySize}px`,
                height: `${iconOnlySize}px`,
                minWidth: `${iconOnlySize}px`,
                minHeight: `${iconOnlySize}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0',
                background: 'transparent',
                border: 'none',
                borderRadius: '0',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                boxSizing: 'border-box',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                transform: 'scale(1)',
                opacity: 1,
                flexShrink: 0
              } : {
                // 🚨 FIX: Fixed button sizes with consistent dimensions regardless of container width
                width: `${computedButtonSize}px`,
                height: `${computedButtonSize}px`,
                minWidth: `${computedButtonSize}px`,
                maxWidth: `${computedButtonSize}px`,
                minHeight: `${computedButtonSize}px`,
                maxHeight: `${computedButtonSize}px`,
                borderRadius: buttonRadius,
                // Solid background instead of blur to prevent visual artifacts during animations
                background: isDesktop ? 'rgba(22, 22, 22, 0.50)' : 'rgba(22, 22, 22, 0.7)',
                border: isDesktop ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                boxSizing: 'border-box',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border 0.3s ease',
                transform: 'translateZ(0) scale(1)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                isolation: 'isolate',
                animationDelay: buttonsAnimated ? `${0.2 + (index * 0.1)}s` : '0s',
                flexShrink: 0,
                aspectRatio: '1 / 1'
              }}
              onTouchStart={(e) => {
                if (iconOnly) {
                  e.currentTarget.style.transform = 'translateZ(0) scale(0.9)';
                  e.currentTarget.style.opacity = '0.7';
                } else {
                  e.currentTarget.style.transform = 'translateZ(0) scale(0.95)';
                  e.currentTarget.style.background = isDesktop ? 'rgba(22, 22, 22, 0.65)' : 'rgba(120, 120, 120, 0.8)';
                  e.currentTarget.style.border = isDesktop ? '1px solid rgba(255, 255, 255, 0.20)' : '1px solid rgba(255, 255, 255, 0.3)';
                }
              }}
              onTouchEnd={(e) => {
                if (iconOnly) {
                  e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                  e.currentTarget.style.opacity = '1';
                } else {
                  e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                  e.currentTarget.style.background = isDesktop ? 'rgba(22, 22, 22, 0.50)' : 'rgba(22, 22, 22, 0.7)';
                  e.currentTarget.style.border = isDesktop ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)';
                }
              }}
              onMouseDown={(e) => {
                if (iconOnly) {
                  e.currentTarget.style.transform = 'translateZ(0) scale(0.9)';
                  e.currentTarget.style.opacity = '0.7';
                } else {
                  e.currentTarget.style.transform = 'translateZ(0) scale(0.95)';
                  e.currentTarget.style.background = isDesktop ? 'rgba(22, 22, 22, 0.65)' : 'rgba(120, 120, 120, 0.8)';
                  e.currentTarget.style.border = isDesktop ? '1px solid rgba(255, 255, 255, 0.20)' : '1px solid rgba(255, 255, 255, 0.3)';
                }
              }}
              onMouseUp={(e) => {
                if (iconOnly) {
                  e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                  e.currentTarget.style.opacity = '1';
                } else {
                  e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                  e.currentTarget.style.background = isDesktop ? 'rgba(22, 22, 22, 0.50)' : 'rgba(22, 22, 22, 0.7)';
                  e.currentTarget.style.border = isDesktop ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (iconOnly) {
                  e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                  e.currentTarget.style.opacity = '1';
                } else {
                  e.currentTarget.style.transform = 'translateZ(0) scale(1)';
                  e.currentTarget.style.background = isDesktop ? 'rgba(22, 22, 22, 0.50)' : 'rgba(22, 22, 22, 0.7)';
                  e.currentTarget.style.border = isDesktop ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.15)';
                }
              }}
              onFocus={(e) => {
                if (!iconOnly && isDesktop) {
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(255,255,255,0.5)';
                }
              }}
              onBlur={(e) => {
                if (!iconOnly && isDesktop) {
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {/* Social Media Icon */}
              <div
                style={{
                  width: iconOnly ? `${iconOnlyIconSize}px` : `${computedIconSize}px`,
                  height: iconOnly ? `${iconOnlyIconSize}px` : `${computedIconSize}px`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {platform.icon}
              </div>
            </a>
          );
        })}
      </div>

      {/* CSS Animation Styles */}
      <style>{`
        .social-buttons-hidden {
          opacity: 0;
          transform: translateY(20px);
        }

        .social-buttons-spring {
          opacity: 1;
          transform: translateY(0);
          animation: socialButtonsSpring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes socialButtonsSpring {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Skeleton loading styles for iOS Safari compatibility */
        .skeleton-button {
          width: clamp(75px, 18vw, 95px);
          height: clamp(75px, 18vw, 95px);
          border-radius: 50%;
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
          background-size: 200% 100%;
          animation: skeletonShimmer 1.5s infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .skeleton-icon {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          background: rgba(255,255,255,0.15);
        }

        @keyframes skeletonShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SocialMediaButtons;
