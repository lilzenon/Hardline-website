import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getApiBaseUrl, isDevelopment } from '../utils/apiConfig';
import { fetchWithTimeout } from '../utils/iab';

// Simple cache for API responses - shared across components.
//
// Stale-while-revalidate, with NO age cutoff on the read side: any cached
// payload is rendered immediately and a background request corrects it. The
// previous 30 s cutoff meant a visitor who navigated away and came back to the
// homepage 31 s later fell through to the cache-MISS branch, which flips
// `loading` on and shows the full-screen black BrandedLoader over content we
// already had — for a page whose data changes a few times a week. Admin edits
// still land on the very next tick via the background revalidation below.
const apiCache = new Map();

/**
 * Stable content fingerprint used by background revalidation to decide whether
 * anything the page RENDERS actually changed.
 *
 * It deliberately ignores `refreshTimestamp`: admin stamps that per response,
 * so comparing on it (the previous behaviour) reported "changed" on EVERY
 * revalidation — a full homepage re-render and a hero <img> remount (visible
 * flicker, plus a re-request of the LCP image) on every single page view with
 * byte-identical content. `updated_at` IS included so that any admin edit, even
 * to a field not listed here, still propagates.
 *
 * @param {object} data raw homepage-data payload
 * @returns {string} opaque fingerprint; '' for an unusable payload
 */
function homepageFingerprint(data) {
  if (!data || typeof data !== 'object') return '';
  const pickEvent = (e) => (e && typeof e === 'object') ? [
    e.id, e.title, e.artist_name, e.event_date, e.event_time, e.cover_image,
    e.event_address, e.venue_name, e.external_ticket_url, e.posh_embed_url,
    e.display_tickets, e.buy_button_text, e.show_on_homepage, e.updated_at
  ] : null;
  // Key-sorted so two responses with the same settings in a different
  // serialisation order don't register as a change.
  const stableSettings = (s) => (s && typeof s === 'object')
    ? Object.keys(s).sort().map((k) => [k, s[k]])
    : null;
  try {
    return JSON.stringify({
      f: Array.isArray(data.featuredEvents) ? data.featuredEvents.map(pickEvent) : null,
      h: Array.isArray(data.homepageEvents) ? data.homepageEvents.map(pickEvent) : null,
      s: stableSettings(data.homeSettings),
      d: data.formattedDate || null
    });
  } catch (_) {
    // Unserialisable payload (cyclic, BigInt...) — fall back to "changed" so
    // we never silently withhold an update.
    return `unstable-${Date.now()}`;
  }
}

// 🚀 SSR HYDRATION SEED
// The server already fetched this exact payload while rendering the document
// and inlined it as window.__INITIAL_DATA__ (see server/handlers/renders.handler.js).
// Priming the cache with it here — at module evaluation, before any component
// mounts — means the very first fetchHomepageData() call takes the existing
// cache-HIT branch: it seeds state, clears `loading`, and kicks off background
// revalidation. So the branded loader lifts with real events on first paint
// instead of waiting on a fresh cross-origin round trip to admin, and admin
// serves one homepage-data request per page view instead of two.
//
// Reusing the cache path rather than adding a parallel seeding path is
// deliberate: there is exactly one place that maps a payload onto state, so the
// two can't drift.
//
// The timestamp is stamped at CLIENT load, not at SSR time, on purpose — the
// HTML is edge-cached for up to 5 minutes, and an age check against the render
// time would miss on most hits and fall back to the blocking fetch this exists
// to avoid. Background revalidation corrects anything stale on the next tick.
(function seedFromSSR() {
  try {
    const seed = typeof window !== 'undefined' && window.__INITIAL_DATA__;
    // Shape check: only accept something that actually looks like homepage data,
    // so an unrelated or truncated payload can't poison the cache.
    if (!seed || typeof seed !== 'object') return;
    if (!Array.isArray(seed.featuredEvents) && !Array.isArray(seed.homepageEvents)) return;

    apiCache.set('homepage-data-v2', { data: seed, timestamp: Date.now() });
  } catch (_) {
    // Never let seeding break boot — the normal fetch path still works.
  }
})();

// 🚨 CRITICAL FIX: Cache invalidation mechanism for image uploads
// This allows external components to force cache refresh when images are uploaded
window.invalidateHomepageCache = () => {
  console.log('🧹 Invalidating frontend homepage cache due to image upload');
  apiCache.delete('homepage-data-v2');
  // Also clear any other related cache keys
  for (const [key] of apiCache.entries()) {
    if (key.includes('homepage') || key.includes('events')) {
      apiCache.delete(key);
      console.log(`🗑️ Cleared frontend cache: ${key}`);
    }
  }
};

// 🚦 SINGLE-FLIGHT for the homepage-data request.
//
// apiCache only ever stores COMPLETED results, so two components calling
// useHomepageData() in the same tick both missed the cache and both issued
// their own cross-origin request to admin. That is not hypothetical:
// FigmaDesktop and FigmaMobile each call the hook, and HomePage renders one of
// them while the other's chunk may already have mounted — so a single page view
// could cost admin two homepage-data requests on top of the SSR one.
//
// This shares the in-flight PROMISE. Critically it returns raw JSON and applies
// no state: each hook instance still runs its own validation and setState, so
// every caller ends up with a correct, independent state machine. (An earlier
// sketch had callers await a shared function that applied state internally —
// that would leave the second caller's `loading` true forever, which is the
// exact bug being chased.)
let inflightHomepageRequest = null;

/**
 * Fetch the homepage payload, joining an in-flight request if one exists.
 * @param {number} timeoutMs abort budget for a NEW request. A caller that joins
 *   an existing request inherits that request's budget — acceptable here
 *   because the only long-budget caller (the silent retry) is scheduled 12s
 *   after a timeout, by which point no foreground request is still open.
 * @returns {Promise<object>} the raw admin response body
 */
function fetchHomepageJson(timeoutMs) {
  if (inflightHomepageRequest) return inflightHomepageRequest;

  const apiBaseUrl = isDevelopment()
    ? '' // Development: use Vite proxy
    : getApiBaseUrl(); // Production/Beta: use appropriate dashboard server

  const request = (async () => {
    // 🔧 IAB FIX: this is a cross-origin fetch to admin, so the server's admin-
    // fetch guard does NOT protect it. Without a client timeout, an admin
    // cold-start or a stalled in-app-browser connection pins `loading` true
    // forever and the fullscreen BrandedLoader never lifts.
    const response = await fetchWithTimeout(
      `${apiBaseUrl}/api/home-settings/homepage-data`,
      { cache: 'no-store' },
      timeoutMs
    );
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch homepage data`);
    }
    const data = await response.json();
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }
    return data;
  })();

  inflightHomepageRequest = request;
  // Two-arg .then rather than .finally: Promise.prototype.finally is absent on
  // Android WebView Chrome <63, and es2019 transpiles syntax, not APIs.
  request.then(
    () => { inflightHomepageRequest = null; },
    () => { inflightHomepageRequest = null; }
  );

  return request;
}

// Cache for formatted dates to avoid repeated calculations
const dateFormatCache = new Map();
// Stable time formatter that preserves wall-clock HH:mm as entered (no timezone conversion)
const formatWallClockTime = (timeString) => {
  if (!timeString) return '';
  try {
    const raw = String(timeString).trim();
    let m = raw.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
    if (!m && raw.includes('T')) {
      const t = raw.split('T')[1];
      m = t ? t.match(/^(\d{2}):(\d{2})(?::(\d{2}))?/) : null;
    }
    if (!m) return raw; // fallback as-is
    const hh = parseInt(m[1], 10);
    const mm = parseInt(m[2], 10);
    const period = hh >= 12 ? 'PM' : 'AM';
    const displayHour = (hh % 12) || 12;
    const displayMinutes = mm.toString().padStart(2, '0');
    return `${displayHour}:${displayMinutes} ${period}`;
  } catch (_) {
    return '';
  }
};


/**
 * Custom hook to manage homepage data fetching, validation, and processing
 * Consolidates duplicate logic from FigmaDesktop.jsx and FigmaMobile.jsx
 *
 * @returns {Object} Homepage data state and handlers
 */
export const useHomepageData = () => {
  // Core data state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeSettings, setHomeSettings] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [homepageEvents, setHomepageEvents] = useState([]);
  const [formattedDate, setFormattedDate] = useState("March 29th, 9:00 P.M.");

  // Filter state - Default depends on viewport: Mobile defaults to "Next", Desktop to "Past"
  const isMobileViewport = typeof window !== 'undefined' && window.innerWidth <= 767;
  const [showAllEvents, setShowAllEvents] = useState(isMobileViewport ? true : false); // true = "Next" (upcoming), false = "Past"

  // One-shot guard for the silent post-timeout retry (admin cold starts take
  // ~16s; the 8s abort unblocks the loader with placeholder content, then a
  // single quiet retry swaps in real data once admin is warm).
  const timedOutRetryRef = useRef(false);

  /**
   * Validates event data structure
   * @param {Array} events - Array of event objects
   * @param {string} type - Type of events for logging
   * @returns {Array} Validated events
   */
  const validateEvents = useCallback((events, type) => {
    if (!Array.isArray(events)) return [];

    return events.filter(event => {
      if (!event || typeof event !== 'object') return false;
      if (!event.id || !event.title) {
        console.warn(`${type} event missing required fields:`, event);
        return false;
      }
      return true;
    });
  }, []);

  /**
   * Formats event date with caching for performance
   * @param {string} eventDate - ISO date string
   * @param {boolean} includeTime - Whether to include time in format
   * @returns {Object} Formatted date information
   */
  const formatEventDate = useCallback((eventDate, includeTime = false) => {
    // NOTE: This function now formats the DATE portion only (no default time padding).
    // For time display, combine with event.event_time using libFormatEventTime in normalizeEvent.
    if (!eventDate) {
      const now = new Date();
      const day = now.getUTCDate().toString().padStart(2, '0');
      const month = now.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
      return {
        eventDate: now,
        formattedDate: new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: '2-digit', timeZone: 'UTC' }).format(now),
        day,
        month
      };
    }

    const cacheKey = `${eventDate}-${includeTime}-v2`; // v2 to bust old cache semantics
    let cachedFormat = dateFormatCache.get(cacheKey);

    if (!cachedFormat) {
      let parsedDate;

      if (eventDate instanceof Date) {
        parsedDate = eventDate;
      } else if (typeof eventDate === 'string') {
        const s = eventDate.trim();
        // Extract Y-M-D regardless of time/tz for stable day rendering
        const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (m) {
          const y = parseInt(m[1], 10);
          const mo = parseInt(m[2], 10);
          const d = parseInt(m[3], 10);
          // Use UTC MIDDAY to avoid any timezone day shifting
          parsedDate = new Date(Date.UTC(y, mo - 1, d, 12, 0, 0));
        } else {
          // Fallback to native parsing (rare)
          parsedDate = new Date(s);
        }
      } else {
        parsedDate = new Date(eventDate);
      }

      if (!parsedDate || isNaN(parsedDate.getTime())) {
        console.warn('🚨 Invalid event date:', eventDate, 'using fallback');
        const now = new Date();
        const day = now.getUTCDate().toString().padStart(2, '0');
        const month = now.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase();
        return {
          eventDate: now,
          formattedDate: new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: '2-digit', timeZone: 'UTC' }).format(now),
          day,
          month
        };
      }

      // Format the DATE portion using UTC to avoid off-by-one issues
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        timeZone: 'UTC'
      }).format(parsedDate);

      const day = parsedDate.getUTCDate().toString().padStart(2, '0');
      const month = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(parsedDate).toUpperCase();

      cachedFormat = {
        eventDate: parsedDate,
        formattedDate,
        day,
        month
      };
      dateFormatCache.set(cacheKey, cachedFormat);
    }

    return cachedFormat;
  }, []);

  /**
   * Processes location string to show only venue and city
   * @param {string} address - Full address string
   * @returns {string} Formatted location
   */
  const formatLocation = useCallback((address) => {
    if (!address) return "Asbury Park, NJ";

    const addressParts = address.split(',').map(part => part.trim());
    if (addressParts.length >= 2) {
      // Show first part (venue/street) and second part (city)
      let location = `${addressParts[0]}, ${addressParts[1]}`;
      // If first part looks like a street number, use venue name + city instead
      if (/^\d+/.test(addressParts[0]) && addressParts.length >= 3) {
        location = `${addressParts[1]}, ${addressParts[2]}`;
      }
      return location;
    }
    return address;
  }, []);

  /**
   * Processes ticket information for events
   * @param {Object} event - Event object
   * @returns {Object} Ticket information
   */
  const getTicketInfo = useCallback((event) => {
    const ticketsUrl = event.external_ticket_url || event.posh_embed_url || '#';
    const hasTicketLink = event.display_tickets && ticketsUrl && ticketsUrl !== '#';
    const buttonText = event.buy_button_text || 'View Event';

    return { ticketsUrl, hasTicketLink, buttonText };
  }, []);

  /**
   * Normalizes event data into consistent format
   * @param {Object} event - Raw event data
   * @param {string} idPrefix - Prefix for event ID
   * @param {boolean} includeTime - Whether to include time in date format
   * @returns {Object} Normalized event data
   */
  const normalizeEvent = useCallback((event, idPrefix = 'event', includeTime = false) => {
    try {
      // Always format the DATE portion only; append time below if requested
      const dateInfo = formatEventDate(event.event_date, false);
      const title = event.title || event.artist_name || `Event`;
      const location = formatLocation(event.event_address || event.venue_name);
      const ticketInfo = getTicketInfo(event);

      // Combine date + time (time taken from explicit event_time if present, else extracted from event_date)
      let formatted = dateInfo.formattedDate;
      if (includeTime) {
        let timeSource = null;
        if (event && typeof event.event_time === 'string' && event.event_time.trim()) {
          timeSource = event.event_time.trim();
        } else if (event && typeof event.event_date === 'string' && event.event_date.includes('T')) {
          // Extract time portion after 'T'
          const parts = event.event_date.split('T');
          if (parts[1]) timeSource = parts[1].trim();
        }
        if (timeSource) {
          try {
            formatted = `${formatted} at ${formatWallClockTime(timeSource)}`;
          } catch (_) {
            // If formatting fails, keep date-only
          }
        }
      }

      // Process cover image - convert relative URLs to absolute URLs
      let coverImage = event.cover_image;
      if (coverImage) {
        // If already absolute URL, use as-is
        if (coverImage.startsWith('http://') || coverImage.startsWith('https://')) {
          // Already absolute, use as-is
        } else if (coverImage.startsWith('/api/images/serve/')) {
          // Convert relative admin image URLs to absolute URLs — and NOTHING
          // else. Do not reintroduce client-side cache-busting here.
          //
          // Admin serves /api/images/serve/<uuid>/<variant> with
          // `Cache-Control: max-age=31536000, immutable`, and a re-upload mints
          // a NEW uuid, so the URL itself is already the cache key. The old
          // `?_cb=<updated_at>&_t=Date.now()` suffix (a) defeated the browser
          // cache on every page view, and (b) made the hero <img> URL differ
          // from the `<link rel="preload">` the SSR HTML had already issued, so
          // the LCP image was downloaded TWICE and the second request only
          // started once React had rendered — ~10 s LCP on mobile.
          const dashboardDomain = window.location.hostname === 'localhost'
            ? 'http://localhost:3002'
            : 'https://admin.b2b.click';
          coverImage = `${dashboardDomain}${coverImage}`;
        } else if (coverImage.startsWith('/')) {
          // Other relative URLs - ensure they start with /
          // These will be handled by the image optimization system
        } else {
          // URLs without leading slash - add it
          coverImage = `/${coverImage}`;
        }
      }

      // Fallback image if none provided
      if (!coverImage) {
        coverImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIyIiBoZWlnaHQ9IjEyNCIgdmlld0JveD0iMCAwIDIyMiAxMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMjIiIGhlaWdodD0iMTI0IiBmaWxsPSIjMTYxNjE2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNTY1NjU2IiBmb250LWZhbWlseT0iSW50ZXIiIGZvbnQtc2l6ZT0iMTQiPkV2ZW50IEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
      }

      return {
        id: `${idPrefix}-${event.id}`,
        title,
        date: formatted,
        day: dateInfo.day,
        month: dateInfo.month,
        location,
        coverImage,
        ...ticketInfo,
        external_ticket_url: event.external_ticket_url,
        isRealEvent: true,
        showOnHomepage: event.show_on_homepage,
        eventData: event,
        eventDate: dateInfo.eventDate
      };
    } catch (error) {
      console.warn(`Error processing event ${event.id}:`, error);
      return null;
    }
  }, [formatEventDate, formatLocation, getTicketInfo]);

  /**
   * Sorts events based on filter state
   * @param {Array} events - Array of events to sort
   * @param {boolean} showAll - Whether showing all events or just past
   * @returns {Array} Sorted events
   */
  const sortEvents = useCallback((events, showAll) => {
    const sortedEvents = [...events];

    // Next (upcoming): soonest first (ascending)
    // Past: most recent past first (descending)
    sortedEvents.sort((a, b) => {
      const dateA = new Date(a.eventDate);
      const dateB = new Date(b.eventDate);

      // Validate dates to handle edge cases
      const aInvalid = isNaN(dateA.getTime());
      const bInvalid = isNaN(dateB.getTime());
      if (aInvalid && bInvalid) return 0;
      if (aInvalid) return 1; // invalid to end
      if (bInvalid) return -1;

      return showAll
        ? (dateA.getTime() - dateB.getTime()) // Next: ascending
        : (dateB.getTime() - dateA.getTime()); // Past: descending
    });

    console.log(`🔍 Sorted ${sortedEvents.length} events (${showAll ? 'NEXT' : 'Past'})`,
      sortedEvents.slice(0, 3).map(e => ({ title: e.title, date: e.eventDate })));

    return sortedEvents;
  }, []);

  /**
   * Filters events based on toggle state (All/Past)
   * @param {Array} events - Array of events to filter
   * @param {boolean} showAll - Whether to show all events or just past
   * @returns {Array} Filtered events
   */
  const filterEvents = useCallback((events, showAll) => {
    const now = new Date(); // precise to current time

    if (showAll) {
      // Next: only future events (strictly after now)
      return events.filter(event => {
        const eventDate = new Date(event.eventDate);
        if (isNaN(eventDate.getTime())) return false; // exclude missing/invalid dates
        return eventDate.getTime() > now.getTime();
      });
    }

    // Past: only past events (strictly before now)
    return events.filter(event => {
      const eventDate = new Date(event.eventDate);
      if (isNaN(eventDate.getTime())) return false;
      return eventDate.getTime() < now.getTime();
    });
  }, []);

  /**
   * Fetches homepage data from API with caching
   */
  const fetchHomepageData = useCallback(async (options = {}) => {
    // silent = background refresh: no loader, longer timeout (covers the
    // known ~16s admin recycle), and no further retry scheduling.
    const silent = options.silent === true;
    try {
      if (!silent) setLoading(true);
      // Only the foreground path optimistically clears the error. A SILENT
      // retry must not: its catch returns early without re-setting `error`, so
      // clearing here would make a failed background retry look like a success
      // — the error UI would vanish and never come back. Silent success clears
      // it explicitly at the end of the try block instead.
      if (!silent) setError(null);

      // Check cache first. Any cached payload is served, however old (see the
      // apiCache comment at the top of the file): stale data behind a background
      // revalidation beats the full-screen loader every time admin is reachable.
      // Only `window.refreshHomepageData` (explicit admin-triggered refresh)
      // deletes the entry and forces the blocking path.
      const cacheKey = 'homepage-data-v2';
      const cached = apiCache.get(cacheKey);
      if (cached && cached.data) {
        console.log(`📦 Using cached homepage data (age ${Math.round((Date.now() - cached.timestamp) / 1000)}s), revalidating in background`);
        // Validate here as well as on the network path. This branch used to be
        // a rare optimisation (a second mount within 30s), but since the SSR
        // hydration seed primes this cache it is now the FIRST-PAINT path for
        // most visitors — so malformed events must be filtered here too, or a
        // record missing id/title renders as a broken card.
        setHomeSettings(cached.data.homeSettings);
        setFeaturedEvents(validateEvents(cached.data.featuredEvents || [], 'Featured'));
        setHomepageEvents(validateEvents(cached.data.homepageEvents || [], 'Homepage'));
        setFormattedDate(cached.data.formattedDate || "March 29th, 9:00 P.M.");
        setLoading(false);

        // 🔄 Background revalidation to pick up admin changes immediately.
        // Routed through the same single-flight, so a cache-hit mount and a
        // concurrent cold mount share one request instead of issuing two.
        (async () => {
          try {
            const fresh = await fetchHomepageJson(8000);

            // Always refresh the cache entry (keeps the age honest for the next
            // mount) but only touch React state when rendered content differs.
            // Comparing `refreshTimestamp` here used to re-render + flicker the
            // hero on every page view — see homepageFingerprint().
            const changed = homepageFingerprint(fresh) !== homepageFingerprint(cached.data);
            apiCache.set('homepage-data-v2', { data: fresh, timestamp: Date.now() });

            if (changed) {
              console.log('🆕 Homepage data changed on server. Updating state from background revalidation.');

              const vFeatured = validateEvents(fresh.featuredEvents || [], 'Featured');
              const vHomepage = validateEvents(fresh.homepageEvents || [], 'Homepage');

              // Recompute hero formatted date (stable day, append explicit time when available)
              let heroFormattedDate = fresh.formattedDate || "March 29, 9:00 PM";
              if (vFeatured.length > 0 && vFeatured[0].event_date) {
                const raw = vFeatured[0].event_date.trim();
                const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
                if (m) {
                  const d = new Date(Date.UTC(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10), 12, 0, 0));
                  const md = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d);
                  let timeText = '';
                  const t = (vFeatured[0].event_time) || (raw.includes('T') ? raw.split('T')[1] : '');
                  if (t) {
                    try { timeText = formatWallClockTime(t); } catch (_) { timeText = ''; }
                  }
                  heroFormattedDate = timeText ? `${md}, ${timeText}` : md;
                }
              }

              setHomeSettings(fresh.homeSettings || {});
              setFeaturedEvents(vFeatured);
              setHomepageEvents(vHomepage);
              setFormattedDate(heroFormattedDate);
            } else {
              console.log('✅ Homepage data unchanged on server (background revalidation, no re-render).');
            }
          } catch (reErr) {
            console.log('⚠️ Background revalidation failed (non-blocking):', reErr);
          }
        })();
        return;
      }

      // Shared with any concurrent caller — see fetchHomepageJson. A failure
      // still lands in this function's catch below, which sets fallback content
      // and clears `loading`, so the page always renders.
      const data = await fetchHomepageJson(silent ? 20000 : 8000);

      // Validate and process data

      const validatedFeaturedEvents = validateEvents(data.featuredEvents || [], 'Featured');
      const validatedHomepageEvents = validateEvents(data.homepageEvents || [], 'Homepage');

      console.log(`✅ Homepage data loaded: ${validatedFeaturedEvents.length} featured events, ${validatedHomepageEvents.length} homepage events`);
      console.log('🔍 Featured events:', validatedFeaturedEvents);
      console.log('🔍 Homepage events:', validatedHomepageEvents);

      // Generate formatted date for hero sections (stable day + explicit time when available)
      let heroFormattedDate = data.formattedDate || "March 29, 9:00 PM";
      if (validatedFeaturedEvents.length > 0 && validatedFeaturedEvents[0].event_date) {
        const raw = validatedFeaturedEvents[0].event_date.trim();
        const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (m) {
          const d = new Date(Date.UTC(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10), 12, 0, 0));
          const md = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', timeZone: 'UTC' }).format(d);
          let timeText = '';
          const t = (validatedFeaturedEvents[0].event_time) || (raw.includes('T') ? raw.split('T')[1] : '');
          if (t) {
            try { timeText = formatWallClockTime(t); } catch (_) { timeText = ''; }
          }
          heroFormattedDate = timeText ? `${md}, ${timeText}` : md;
        }
      }

      // Cache the successful response
      apiCache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });

      setHomeSettings(data.homeSettings || {});
      setFeaturedEvents(validatedFeaturedEvents);
      setHomepageEvents(validatedHomepageEvents);
      setFormattedDate(heroFormattedDate);
      // Real data is on screen — clear any error banner, including one raised
      // before a successful silent retry.
      setError(null);

    } catch (err) {
      console.error('❌ Error fetching homepage data:', err);

      if (silent) {
        // Background retry failed — leave whatever is on screen untouched.
        return;
      }

      setError(err.message);

      // Fallback to default values to maintain design
      setHomeSettings({
        event_title: "EVENT TITLE",
        artist_name: "Artist Name",
        event_address: "101 Address Drive, Asbury Park, NJ",
        event_image: null,
        tickets_url: null,
        instagram_url: null,
        tiktok_url: null,
        twitter_url: null,
        email_url: null
      });
      setFeaturedEvents([]);
      setHomepageEvents([]);
      setFormattedDate("March 29th, 9:00 P.M.");

      // 🔧 IAB FIX: if the 8s abort fired while admin was cold-starting
      // (~16s recycle), the placeholder above is showing wrong content.
      // Schedule ONE silent retry with a 20s budget to swap in real data —
      // no loader, no loop (one-shot ref guard).
      const wasTimeout = String((err && err.message) || '').indexOf('fetch-timeout') !== -1;
      if (wasTimeout && !timedOutRetryRef.current) {
        timedOutRetryRef.current = true;
        setTimeout(() => {
          fetchHomepageData({ silent: true });
        }, 12000);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  }, [validateEvents]);

  // Fetch data on mount
  useEffect(() => {
    fetchHomepageData();
  }, [fetchHomepageData]);

  // 🚨 CRITICAL FIX: Expose refresh function globally for cache invalidation
  useEffect(() => {
    window.refreshHomepageData = () => {
      console.log('🔄 Force refreshing homepage data due to external trigger');
      apiCache.delete('homepage-data-v2');
      fetchHomepageData();
    };

    return () => {
      delete window.refreshHomepageData;
    };
  }, [fetchHomepageData]);

  // Process and filter featured events
  const processedFeaturedEvents = useMemo(() => {
    console.log('🔍 Processing featured events:', featuredEvents.length, 'showAllEvents:', showAllEvents);

    // Log raw event dates for debugging
    if (featuredEvents.length > 0) {
      console.log('🔍 Raw featured event dates:', featuredEvents.map(e => ({
        id: e.id,
        title: e.title || e.artist_name,
        event_date: e.event_date
      })));
    }

    // 🚨 CRITICAL FIX: Use includeTime=true for consistent date formatting across all displays
    // This prevents duplicates appearing with different date formats (e.g., "Fri, Dec 26" vs "Fri, Dec 26 at 8:00 PM")
    const normalized = featuredEvents
      .map(event => normalizeEvent(event, 'featured-event', true))
      .filter(Boolean);
    console.log('🔍 Normalized featured events:', normalized.length);

    const filtered = filterEvents(normalized, showAllEvents);
    console.log('🔍 Filtered featured events:', filtered.length);
    const sorted = sortEvents(filtered, showAllEvents);
    console.log('🔍 Final featured events:', sorted.length);

    // Log final sorted order for debugging
    if (sorted.length > 0) {
      console.log('🔍 Final featured events order:', sorted.map(e => ({
        title: e.title,
        eventDate: e.eventDate,
        formattedDate: e.date
      })));
    }

    return sorted;
  }, [featuredEvents, showAllEvents, normalizeEvent, filterEvents, sortEvents]);

  // Process and filter homepage events
  // In "Next" mode: exclude featured events to avoid duplicates (they show in hero)
  // In "Past" mode: include ALL events (featured hero is hidden, so featured past events must appear in list)
  const processedHomepageEvents = useMemo(() => {
    console.log('🔍 Processing homepage events:', homepageEvents.length, 'showAllEvents:', showAllEvents);

    // 🚀 FIX: Only deduplicate in "Next" mode (showAllEvents=true)
    // In "Past" mode (showAllEvents=false), include featured events since the hero is hidden
    let eventsToProcess;
    if (showAllEvents) {
      // "Next" mode: exclude featured events (they appear in hero section)
      const featuredEventIds = new Set(featuredEvents.map(event => event.id));
      console.log('🔍 Featured event IDs to exclude (Next mode):', [...featuredEventIds]);
      eventsToProcess = homepageEvents.filter(event => !featuredEventIds.has(event.id));
      console.log('🔍 Homepage events after deduplication:', eventsToProcess.length);
    } else {
      // "Past" mode: combine all events (featured + homepage) since hero is hidden
      // Use a Map to deduplicate by event ID
      const allEventsMap = new Map();
      [...featuredEvents, ...homepageEvents].forEach(event => {
        if (!allEventsMap.has(event.id)) {
          allEventsMap.set(event.id, event);
        }
      });
      eventsToProcess = [...allEventsMap.values()];
      console.log('🔍 Combined all events for Past mode:', eventsToProcess.length);
    }

    // Log raw event dates for debugging
    if (eventsToProcess.length > 0) {
      console.log('🔍 Raw event dates:', eventsToProcess.map(e => ({
        id: e.id,
        title: e.title || e.artist_name,
        event_date: e.event_date
      })));
    }

    const normalized = eventsToProcess
      .map(event => normalizeEvent(event, 'homepage-event', true))
      .filter(Boolean);
    console.log('🔍 Normalized events:', normalized.length);

    const filtered = filterEvents(normalized, showAllEvents);
    console.log('🔍 Filtered events:', filtered.length);
    const sorted = sortEvents(filtered, showAllEvents);
    console.log('🔍 Final events:', sorted.length);

    // Log final sorted order for debugging
    if (sorted.length > 0) {
      console.log('🔍 Final events order:', sorted.map(e => ({
        title: e.title,
        eventDate: e.eventDate,
        formattedDate: e.date
      })));
    }

    return sorted;
  }, [homepageEvents, featuredEvents, showAllEvents, normalizeEvent, filterEvents, sortEvents]);

  return {
    // Core state
    loading,
    error,
    homeSettings,
    featuredEvents,
    homepageEvents,
    formattedDate,

    // Filter state
    showAllEvents,
    setShowAllEvents,

    // Processed data
    filteredFeaturedEvents: processedFeaturedEvents,
    filteredHomepageEvents: processedHomepageEvents,

    // Utility functions (exposed for advanced use cases)
    normalizeEvent,
    formatEventDate,
    formatLocation,
    getTicketInfo,

    // Refresh function
    refetch: fetchHomepageData
  };
};

export default useHomepageData;
