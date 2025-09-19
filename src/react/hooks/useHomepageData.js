import { useState, useEffect, useCallback, useMemo } from 'react';

// Simple cache for API responses - shared across components
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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

// Cache for formatted dates to avoid repeated calculations
const dateFormatCache = new Map();

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
  
  // Filter state
  const [showAllEvents, setShowAllEvents] = useState(true); // true = "Next" (upcoming), false = "Past"

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
    if (!eventDate) {
      return {
        eventDate: new Date(),
        formattedDate: 'Tue, Sep 02 @ 10:00PM',
        day: '02',
        month: 'SEP'
      };
    }

    const cacheKey = `${eventDate}-${includeTime}`;
    let cachedFormat = dateFormatCache.get(cacheKey);

    if (!cachedFormat) {
      // 🚨 ENHANCED DATE PARSING: Handle multiple date formats
      let parsedDate;

      if (eventDate instanceof Date) {
        parsedDate = eventDate;
      } else if (typeof eventDate === 'string') {
        // Normalize strings without timezone to UTC for consistency across clients
        let s = eventDate.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) s = `${s}T00:00:00Z`;
        else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) && !/[Zz]|[+-]\d{2}:\d{2}$/.test(s)) s = `${s}Z`;
        parsedDate = new Date(s);

        // If that still fails, try parsing YYYY-MM-DD as UTC midnight
        if (isNaN(parsedDate.getTime())) {
          const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
          if (isoMatch) {
            parsedDate = new Date(`${isoMatch[0]}T00:00:00Z`);
          }
        }
      } else {
        parsedDate = new Date(eventDate);
      }

      // Final validation
      if (!parsedDate || isNaN(parsedDate.getTime())) {
        console.warn('🚨 Invalid event date:', eventDate, 'using fallback');
        return {
          eventDate: new Date(),
          formattedDate: 'Tue, Sep 02 @ 10:00PM',
          day: '02',
          month: 'SEP'
        };
      }

      const options = {
        weekday: 'short',
        month: 'short',
        day: '2-digit'
      };

      if (includeTime) {
        options.hour = 'numeric';
        options.minute = '2-digit';
        options.hour12 = true;
      }

      const __tz = (typeof window !== 'undefined' && window.__B2B_TIMEZONE) || 'America/New_York';
      const __formatter = new Intl.DateTimeFormat('en-US', { ...options, timeZone: __tz });
      let formattedDate = __formatter.format(parsedDate);

      if (includeTime) {
        formattedDate = formattedDate.replace(',', ' @');
      } else {
        formattedDate = formattedDate.replace(',', ' @') + ' 10:00PM';
      }

      const day = parsedDate.getDate().toString().padStart(2, '0');
      const month = parsedDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

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
      const dateInfo = formatEventDate(event.event_date, includeTime);
      const title = event.title || event.artist_name || `Event`;
      const location = formatLocation(event.event_address || event.venue_name);
      const ticketInfo = getTicketInfo(event);
      
      // Process cover image - convert relative URLs to absolute URLs
      let coverImage = event.cover_image;
      if (coverImage) {
        // If already absolute URL, use as-is
        if (coverImage.startsWith('http://') || coverImage.startsWith('https://')) {
          // Already absolute, use as-is
        } else if (coverImage.startsWith('/api/images/serve/')) {
          // 🚨 CRITICAL FIX: Convert relative API URLs to absolute URLs
          const dashboardDomain = window.location.hostname === 'localhost'
            ? 'http://localhost:3002'
            : 'https://admin.b2b.click';
          coverImage = `${dashboardDomain}${coverImage}`;

          // 🚨 CRITICAL FIX: Enhanced cache-busting for cross-device consistency
          // Desktop browsers cache more aggressively than mobile Safari
          const imageAge = Date.now() - new Date(event.updated_at || event.created_at).getTime();
          const isRecentUpload = imageAge < 3600000; // 1 hour (increased from 5 minutes)

          // Detect if we're on desktop browser (more aggressive caching)
          const isDesktopBrowser = !(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
          const isDesktopViewport = window.innerWidth >= 1024;

          // Apply cache-busting more liberally for desktop browsers and recent uploads
          if (isRecentUpload || isDesktopBrowser || isDesktopViewport) {
            const separator = coverImage.includes('?') ? '&' : '?';
            // Use event updated_at timestamp for consistent cache-busting across devices
            const cacheKey = new Date(event.updated_at || event.created_at).getTime();
            coverImage = `${coverImage}${separator}_cb=${cacheKey}&_t=${Date.now()}`;
            console.log(`🕐 Added enhanced cache-busting: ${event.title} (age: ${Math.round(imageAge/1000)}s, desktop: ${isDesktopBrowser}, viewport: ${isDesktopViewport})`);
          }
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
        date: dateInfo.formattedDate,
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
  const fetchHomepageData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = 'homepage-data-v2';
      const cached = apiCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('📦 Using cached homepage data');
        setHomeSettings(cached.data.homeSettings);
        setFeaturedEvents(cached.data.featuredEvents || []);
        setHomepageEvents(cached.data.homepageEvents || []);
        setFormattedDate(cached.data.formattedDate || "March 29th, 9:00 P.M.");
        setLoading(false);
        return;
      }

      // Environment-aware API URL construction
      const apiBaseUrl = window.location.hostname === 'localhost'
        ? '' // Development: use Vite proxy
        : 'https://admin.b2b.click'; // Production: use dashboard server directly

      console.log('🔍 Fetching homepage data from:', `${apiBaseUrl}/api/home-settings/homepage-data`);

      const response = await fetch(`${apiBaseUrl}/api/home-settings/homepage-data`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch homepage data`);
      }

      const data = await response.json();

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response format');
      }

      // Validate and process data
      const homeSettings = data.homeSettings || {};
      const validatedFeaturedEvents = validateEvents(data.featuredEvents || [], 'Featured');
      const validatedHomepageEvents = validateEvents(data.homepageEvents || [], 'Homepage');

      console.log(`✅ Homepage data loaded: ${validatedFeaturedEvents.length} featured events, ${validatedHomepageEvents.length} homepage events`);
      console.log('🔍 Featured events:', validatedFeaturedEvents);
      console.log('🔍 Homepage events:', validatedHomepageEvents);

      // Generate formatted date for hero sections
      let heroFormattedDate = data.formattedDate || "March 29th, 9:00 P.M.";
      if (validatedFeaturedEvents.length > 0 && validatedFeaturedEvents[0].event_date) {
        // Normalize and format in a fixed timezone for consistency
        let s = validatedFeaturedEvents[0].event_date.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(s)) s = `${s}T00:00:00Z`;
        else if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s) && !/[Zz]|[+-]\d{2}:\d{2}$/.test(s)) s = `${s}Z`;
        const d = new Date(s);
        const __tz = (typeof window !== 'undefined' && window.__B2B_TIMEZONE) || 'America/New_York';
        const heroFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: __tz });
        heroFormattedDate = heroFormatter.format(d).replace(',', 'th,');
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

    } catch (err) {
      console.error('❌ Error fetching homepage data:', err);
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
    } finally {
      setLoading(false);
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

    const normalized = featuredEvents
      .map(event => normalizeEvent(event, 'event', false))
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

  // Process and filter homepage events (exclude featured events to avoid duplicates)
  const processedHomepageEvents = useMemo(() => {
    console.log('🔍 Processing homepage events:', homepageEvents.length, 'showAllEvents:', showAllEvents);
    const featuredEventIds = new Set(featuredEvents.map(event => event.id));
    console.log('🔍 Featured event IDs to exclude:', featuredEventIds);

    const afterDeduplication = homepageEvents.filter(event => !featuredEventIds.has(event.id));
    console.log('🔍 Homepage events after deduplication:', afterDeduplication.length);

    // Log raw event dates for debugging
    if (afterDeduplication.length > 0) {
      console.log('🔍 Raw homepage event dates:', afterDeduplication.map(e => ({
        id: e.id,
        title: e.title || e.artist_name,
        event_date: e.event_date
      })));
    }

    const normalized = afterDeduplication
      .map(event => normalizeEvent(event, 'homepage-event', true))
      .filter(Boolean);
    console.log('🔍 Normalized homepage events:', normalized.length);

    const filtered = filterEvents(normalized, showAllEvents);
    console.log('🔍 Filtered homepage events:', filtered.length);
    const sorted = sortEvents(filtered, showAllEvents);
    console.log('🔍 Final homepage events:', sorted.length);

    // Log final sorted order for debugging
    if (sorted.length > 0) {
      console.log('🔍 Final homepage events order:', sorted.map(e => ({
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
