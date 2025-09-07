import { useState, useEffect, useCallback, useMemo } from 'react';

// Simple cache for API responses - shared across components
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
  const [showAllEvents, setShowAllEvents] = useState(true); // true = "All", false = "Past"

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
      const parsedDate = new Date(eventDate);
      if (isNaN(parsedDate.getTime())) {
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

      let formattedDate = parsedDate.toLocaleDateString('en-US', options);
      
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
      
      // Process cover image
      let coverImage = event.cover_image;
      if (coverImage && !coverImage.startsWith('http') && !coverImage.startsWith('/')) {
        coverImage = `/${coverImage}`;
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
    
    if (showAll) {
      // Show all events - sort chronologically (earliest first)
      sortedEvents.sort((a, b) => {
        const dateA = new Date(a.eventDate);
        const dateB = new Date(b.eventDate);
        return dateA.getTime() - dateB.getTime();
      });
    } else {
      // Sort past events in reverse chronological order (most recent first)
      sortedEvents.sort((a, b) => {
        const dateA = new Date(a.eventDate);
        const dateB = new Date(b.eventDate);
        return dateB.getTime() - dateA.getTime();
      });
    }
    
    return sortedEvents;
  }, []);

  /**
   * Filters events based on toggle state (All/Past)
   * @param {Array} events - Array of events to filter
   * @param {boolean} showAll - Whether to show all events or just past
   * @returns {Array} Filtered events
   */
  const filterEvents = useCallback((events, showAll) => {
    if (showAll) {
      return events; // Show all events
    }
    
    // Show only past events
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    
    return events.filter(event => {
      const eventDate = new Date(event.eventDate);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < now;
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

      // Generate formatted date for hero sections
      let heroFormattedDate = data.formattedDate || "March 29th, 9:00 P.M.";
      if (validatedFeaturedEvents.length > 0 && validatedFeaturedEvents[0].event_date) {
        const eventDate = new Date(validatedFeaturedEvents[0].event_date);
        const options = {
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        };
        heroFormattedDate = eventDate.toLocaleDateString('en-US', options)
          .replace(',', 'th,'); // Add 'th' suffix
      }

      // Cache the successful response
      apiCache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });

      setHomeSettings(homeSettings);
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

  // Process and filter featured events
  const processedFeaturedEvents = useMemo(() => {
    const normalized = featuredEvents
      .map(event => normalizeEvent(event, 'event', false))
      .filter(Boolean);
    
    const filtered = filterEvents(normalized, showAllEvents);
    return sortEvents(filtered, showAllEvents);
  }, [featuredEvents, showAllEvents, normalizeEvent, filterEvents, sortEvents]);

  // Process and filter homepage events (exclude featured events to avoid duplicates)
  const processedHomepageEvents = useMemo(() => {
    const featuredEventIds = new Set(featuredEvents.map(event => event.id));
    
    const normalized = homepageEvents
      .filter(event => !featuredEventIds.has(event.id)) // Exclude featured events
      .map(event => normalizeEvent(event, 'homepage-event', true))
      .filter(Boolean);
    
    const filtered = filterEvents(normalized, showAllEvents);
    return sortEvents(filtered, showAllEvents);
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
