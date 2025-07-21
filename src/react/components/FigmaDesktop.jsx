import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';

// Simple cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for formatted dates to avoid repeated calculations
const dateFormatCache = new Map();

const FigmaDesktop = () => {
  const [homeSettings, setHomeSettings] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitting, setPhoneSubmitting] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scaledDimensions, setScaledDimensions] = useState({
    heroWidth: 299,
    heroHeight: 299,
    rightHeroWidth: 498,
    rightHeroHeight: 299,
    gap: 32,
    containerWidth: 825,
    // Fixed layout dimensions that should never scale
    eventsTextGap: 18,  // Always 18px gap between Events and Text us
    eventCardWidth: 250,  // Always 250px event card width
    eventCardHeight: 85,   // Always 85px event card height
    scale: 1
  });

  // Calculate responsive dimensions based on viewport
  useEffect(() => {
    const calculateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const padding = viewportWidth <= 360 ? 16 : viewportWidth <= 480 ? 24 : 32;
      const availableWidth = viewportWidth - padding;

      // Base dimensions from Figma design
      const baseHeroWidth = 299;
      const baseHeroHeight = 299;
      const baseRightHeroWidth = 498;
      const baseRightHeroHeight = 299;
      const baseGap = 32;
      const baseContainerWidth = 825; // Fixed container width for alignment
      const containerPadding = 32; // 16px on each side
      const availableContainerWidth = baseContainerWidth - containerPadding; // 793px

      // Calculate scale factor to fit both hero sections and events/text sections
      const totalHeroWidth = baseHeroWidth + baseGap + baseRightHeroWidth; // 829px
      const baseEventsWidth = 507;
      const baseTextUsWidth = 299;
      const baseEventsTextGap = 18;
      const totalEventsTextWidth = baseEventsWidth + baseEventsTextGap + baseTextUsWidth; // 824px

      // Use the more restrictive constraint to ensure both sections fit
      const maxRequiredWidth = Math.max(totalHeroWidth, totalEventsTextWidth); // 829px
      let scale = Math.min(availableWidth / maxRequiredWidth, availableContainerWidth / maxRequiredWidth);

      // Apply constraints - keep minimum but add reasonable maximum for desktop
      if (scale < 0.25) scale = 0.25;  // Minimum for small screens
      if (scale > 1.25) scale = 1.25;    // Maximum for desktop (prevents oversized content)

      const scaledDimensions = {
        heroWidth: Math.round(baseHeroWidth * scale),
        heroHeight: Math.round(baseHeroHeight * scale),
        rightHeroWidth: Math.round(baseRightHeroWidth * scale),
        rightHeroHeight: Math.round(baseRightHeroHeight * scale),
        gap: Math.round(baseGap * scale),
        // Container width stays fixed for alignment
        containerWidth: baseContainerWidth,  // Always 825px for perfect alignment
        // Scale events and text sections to match hero scaling
        eventsWidth: Math.round(baseEventsWidth * scale),  // Scale events section width
        textUsWidth: Math.round(baseTextUsWidth * scale),  // Scale text us section width
        eventsTextGap: Math.round(baseEventsTextGap * scale),  // Scale gap between Events and Text us
        eventCardWidth: 250,  // Always 250px event card width
        eventCardHeight: 85,   // Always 85px event card height
        scale: scale
      };

      // Update mobile state based on whether events list can fit alongside text us section
      // Events list needs ~507px + Text us needs ~299px + gap ~18px = ~824px minimum
      setIsMobile(viewportWidth <= 850);

      setScaledDimensions(scaledDimensions);
      console.log(`🎯 Responsive scaling: ${scale.toFixed(3)} for viewport ${viewportWidth}px (max 1.25x)`, scaledDimensions);
    };

    // Initial calculation
    calculateDimensions();

    // Update on resize
    window.addEventListener('resize', calculateDimensions);

    return () => {
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  // Get the most recent event for hero sections
  const mostRecentEvent = useMemo(() => {
    return featuredEvents.length > 0 ? featuredEvents[0] : null;
  }, [featuredEvents]);

  // Format location to show just venue and city (prevent overflow)
  const formatLocation = useCallback((address) => {
    if (!address) return "Asbury Park, NJ";

    const parts = address.split(',').map(part => part.trim());

    // If it's a full address like "123 Street, City, State"
    if (parts.length >= 2) {
      // Check if first part looks like a street address (starts with number)
      const firstPart = parts[0];
      if (/^\d/.test(firstPart)) {
        // Skip street address, return "City, State" or just "City"
        return parts.slice(1, 3).join(', ');
      } else {
        // First part is venue name, return "Venue, City"
        return parts.slice(0, 2).join(', ');
      }
    }

    // Fallback to original if parsing fails
    return address.length > 25 ? address.substring(0, 22) + '...' : address;
  }, []);

  const fetchHomepageData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = 'homepage-data';
      const cached = apiCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('📦 Using cached homepage data');
        setHomeSettings(cached.data.homeSettings);
        setFeaturedEvents(cached.data.featuredEvents || []);
        setFormattedDate(cached.data.formattedDate || "March 29th, 9:00 P.M.");
        setLoading(false);
        return;
      }

      const response = await fetch('/api/home-settings/homepage-data');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch homepage data`);
      }

      const data = await response.json();

      // Validate API response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response format');
      }

      // Validate home settings
      const homeSettings = data.homeSettings || {};
      if (!homeSettings.event_title && !homeSettings.artist_name) {
        console.warn('Home settings missing required fields, using defaults');
      }

      // Validate featured events
      const featuredEvents = Array.isArray(data.featuredEvents) ? data.featuredEvents : [];
      if (featuredEvents.length === 0) {
        console.warn('No featured events found, using placeholder cards');
      }

      // Validate each event has required fields
      const validatedEvents = featuredEvents.filter(event => {
        if (!event || typeof event !== 'object') return false;
        if (!event.id || !event.title) {
          console.warn('Event missing required fields:', event);
          return false;
        }
        return true;
      });

      console.log(`✅ Homepage data loaded: ${validatedEvents.length} featured events`);

      // Cache the successful response
      apiCache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });

      setHomeSettings(homeSettings);
      setFeaturedEvents(validatedEvents);

      // Use most recent event data for hero sections if available
      let heroFormattedDate = data.formattedDate || "March 29th, 9:00 P.M.";
      if (validatedEvents.length > 0 && validatedEvents[0].event_date) {
        const eventDate = new Date(validatedEvents[0].event_date);
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

      setFormattedDate(heroFormattedDate);

    } catch (err) {
      console.error('❌ Error fetching homepage data:', err);
      setError(err.message);

      // Fallback to default values to maintain Figma design
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
      setFormattedDate("March 29th, 9:00 P.M.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomepageData();
  }, [fetchHomepageData]);

  const validatePhoneNumber = useCallback((phone) => {
    // Basic phone number validation (US format)
    const phoneRegex = /^[\+]?[1]?[\s\-\.]?[\(]?[0-9]{3}[\)]?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }, []);

  const handlePhoneSubmit = useCallback(async () => {
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedPhone || phoneSubmitting) return;

    // Validate phone number format
    if (!validatePhoneNumber(trimmedPhone)) {
      console.warn('Invalid phone number format');
      return;
    }

    try {
      setPhoneSubmitting(true);

      console.log('📱 Submitting phone number:', trimmedPhone);

      // Use SMS test endpoint to capture phone numbers
      const response = await fetch('/api/sms/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: trimmedPhone
        })
      });

      const result = await response.json();

      if (response.ok && result.success !== false) {
        console.log('✅ Phone number submitted successfully');
        setPhoneSubmitted(true);
        setPhoneNumber('');
        // Reset success state after 3 seconds
        setTimeout(() => setPhoneSubmitted(false), 3000);
      } else {
        console.error('❌ Failed to submit phone number:', result.error || 'Unknown error');
        // Could add user-facing error message here
      }
    } catch (error) {
      console.error('❌ Error submitting phone number:', error);
      // Could add user-facing error message here
    } finally {
      setPhoneSubmitting(false);
    }
  }, [phoneNumber, phoneSubmitting, validatePhoneNumber]);

  // Memoized event cards processing for performance
  const processedEventCards = useMemo(() => {
    const featuredCards = [];

    // Process only featured events from API
    featuredEvents.forEach((event, index) => {
      try {
        // Validate and parse event date
        let eventDate = new Date();
        let formattedDate = 'Tue, Sep 02 @ 10:00PM';
        let day = '02';
        let month = 'SEP';

        if (event.event_date) {
          const cacheKey = event.event_date;
          let cachedFormat = dateFormatCache.get(cacheKey);

          if (!cachedFormat) {
            const parsedDate = new Date(event.event_date);
            if (!isNaN(parsedDate.getTime())) {
              eventDate = parsedDate;
              formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: '2-digit'
              }).replace(',', ' @') + ' 10:00PM';
              day = eventDate.getDate().toString().padStart(2, '0');
              month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

              cachedFormat = { formattedDate, day, month, eventDate };
              dateFormatCache.set(cacheKey, cachedFormat);
            }
          } else {
            ({ formattedDate, day, month, eventDate } = cachedFormat);
          }
        }

        // Validate and process event data
        const title = event.title || event.artist_name || `Event ${index + 1}`;

        // Process location to show only venue name and city (truncate long addresses)
        let location = 'Venue Address';
        if (event.event_address) {
          const addressParts = event.event_address.split(',').map(part => part.trim());
          if (addressParts.length >= 2) {
            // Show first part (venue/street) and second part (city)
            location = `${addressParts[0]}, ${addressParts[1]}`;
            // If too long, just show city and state
            if (location.length > 25 && addressParts.length >= 3) {
              location = `${addressParts[1]}, ${addressParts[2]}`;
            }
          } else {
            location = event.event_address;
          }
        }

        const coverImage = event.cover_image || '/images/figma-exact/event-card-bg.png';
        const ticketsUrl = event.posh_embed_url || '#';

        featuredCards.push({
          id: `event-${event.id}`,
          title: title,
          date: formattedDate,
          day: day,
          month: month,
          location: location,
          coverImage: coverImage,
          ticketsUrl: ticketsUrl,
          isRealEvent: true,
          showOnHomepage: event.show_on_homepage,
          eventData: event // Store original event data for debugging
        });
      } catch (error) {
        console.warn(`Error processing featured event ${event.id}:`, error);
        // Skip this event if processing fails
      }
    });

    console.log(`🎯 Rendering ${featuredCards.length} featured event cards (no placeholders)`);
    return featuredCards;
  }, [featuredEvents]);

  // Show loading state while maintaining Figma layout
  if (loading) {
    return (
      <div className="scalable-homepage-wrapper">
        <div className="scalable-homepage-container">
          <div
            className="desktop"
            style={{
              width: '100%',
              height: '982px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#000000'
            }}
          >
            <div style={{
              color: '#FFF',
              fontSize: '18px',
              fontFamily: 'Inter',
              textAlign: 'center'
            }}>
              <div>Loading homepage data...</div>
              {error && (
                <div style={{
                  color: '#FF6B6B',
                  fontSize: '14px',
                  marginTop: '10px',
                  opacity: 0.8
                }}>
                  {error}
                  <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.7 }}>
                    Falling back to default content...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error boundary fallback
  if (error && !homeSettings) {
    console.warn('🚨 Critical error, using fallback UI');
    // Continue with fallback data that was set in catch block
  }

  return (
    <div className="scalable-homepage-wrapper">
      <div className="scalable-homepage-container">
        <div
          className="desktop"
          style={{
            width: '100%',
            minHeight: '100vh',
            position: 'relative',
            background: '#000000',
            display: 'grid',
            placeItems: 'center'  // Modern CSS Grid centering
          }}
        >
          {/* Centered Content Container */}
          <div
            style={{
              width: '100%',
              maxWidth: '825px',  // Fixed container width for alignment
              position: 'relative',
              justifySelf: 'center',  // Use CSS Grid centering instead of margin auto
              padding: '0 16px'
            }}
          >

      
      {/* Frame 12 - Navigation */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',  // Logo | Space | Pills
          width: '100%',
          height: '48px',
          alignItems: 'center',
          margin: '35px 0 0 0',  // Remove auto margins since parent handles centering
          padding: '0'  // Remove padding since parent handles it
        }}
      >
        {/* Group 4 - B2B Logo Nav */}
        <img
          src="/images/figma-exact/b2b-logo-nav.svg"
          alt="B2B Logo"
          loading="lazy"
          style={{
            width: '138.41px',
            height: '43px'
          }}
        />

        {/* Group 5 - Navigation Pills */}
        <div
          style={{
            position: 'relative',
            width: '226.49px',
            height: '34px',
            gridColumn: '3',  // Place in third column (right side)
            justifySelf: 'end'  // Align to right edge of grid cell
          }}
        >
          {/* Background pill container */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '226.49px',
              height: '34px',
              background: '#232323',
              borderRadius: '12px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}
          />

          {/* Events - Selected */}
          <div
            style={{
              position: 'absolute',
              left: '3.24px',
              top: '3.61px',
              display: 'flex',
              width: '71.77px',
              height: '26.79px',
              padding: '13px 12px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '10px',
              background: '#000',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: '300',
                lineHeight: 'normal'
              }}
            >
              Events
            </span>
          </div>

          {/* About */}
          <div
            style={{
              position: 'absolute',
              left: '77.03px',
              top: '3.61px',
              display: 'flex',
              width: '71.77px',
              height: '26.79px',
              padding: '13px 12px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: 'normal'
              }}
            >
              About
            </span>
          </div>

          {/* Contact */}
          <div
            style={{
              position: 'absolute',
              left: '150.82px',
              top: '3.61px',
              display: 'flex',
              width: '71.77px',
              height: '26.79px',
              padding: '13px 12px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: 'normal'
              }}
            >
              Contact
            </span>
          </div>
        </div>
      </div>

      {/* Dual Hero Section */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: `${scaledDimensions.heroHeight}px`,  // Scaled height to push content down
          justifyContent: 'flex-start',  // Use flex-start with gap for precise control
          alignItems: 'center',
          gap: `${scaledDimensions.gap}px`,  // Scaled gap between heroes
          margin: '20px 0 0 0',  // Remove auto margins since parent handles centering
          padding: '0',  // Remove padding since parent handles it
          flexDirection: 'row'
        }}
      >
        {/* Frame 20 - Left Hero */}
        <div
          style={{
            width: `${scaledDimensions.heroWidth}px`,  // Use scaled dimensions
            height: `${scaledDimensions.heroHeight}px`,  // Use scaled dimensions
            position: 'relative',
            flexShrink: 0,
            margin: '0'  // Remove auto margin for precise alignment
          }}
        >
          {/* Hero Image with Gradient */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: `${scaledDimensions.heroWidth}px`,  // Use scaled dimensions
              height: `${scaledDimensions.heroHeight}px`,  // Use scaled dimensions
              borderRadius: '24px',
              background: `linear-gradient(189deg, rgba(0, 0, 0, 0.00) 37.84%, rgba(0, 0, 0, 0.48) 55.87%, rgba(24, 24, 24, 0.96) 77.69%), url(/images/figma-exact/hero-left-image.png) lightgray 50% / cover no-repeat`
            }}
          />

          {/* Frame 21 - Bottom overlay */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: `${Math.min(scaledDimensions.heroHeight, 350) - 47}px`,  // Position relative to constrained height
              display: 'flex',
              width: `${Math.min(scaledDimensions.heroWidth, 350)}px`,  // Match constrained width
              justifyContent: 'space-between',
              padding: '0px 12px',
              gap: '16px'
            }}
          >
            {/* Frame 3 - Left info */}
            <div
              style={{
                display: 'flex',
                width: '157px',
                height: '36px',
                padding: '4px 0px',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              {/* Date row */}
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  gap: '4px',
                  minWidth: 0
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8" stroke="#FFF" strokeWidth="1"/>
                </svg>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: '200',
                    lineHeight: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  {formattedDate}
                </span>
              </div>

              {/* Location row */}
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  gap: '4px',
                  minWidth: 0
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" stroke="#FFF" strokeWidth="1"/>
                  <circle cx="5" cy="4" r="1" fill="#FFF"/>
                </svg>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: '200',
                    lineHeight: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  {formatLocation(mostRecentEvent?.event_address || homeSettings?.event_address)}
                </span>
              </div>
            </div>

            {/* Pages - CTA */}
            <div
              style={{
                display: 'flex',
                width: '90px',
                height: '36px',
                padding: '4px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '90px',
                  height: '36px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '29px',
                  background: 'rgba(56, 56, 56, 0.80)',
                  cursor: 'pointer'
                }}
              >
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: 'normal'
                  }}
                >
                  Events
                </span>
              </div>
            </div>
          </div>

          {/* Frame 22 - Event title overlay */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '180px',
              display: 'flex',
              width: '159px',
              height: '68px',
              padding: '8px 12px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '10px'
            }}
          >
            <div
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '24px',
                fontWeight: '800',
                lineHeight: '1.1',
                flex: '1',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: `${scaledDimensions.heroWidth - 40}px`  // Container width minus padding
              }}
            >
              {mostRecentEvent?.artist_name || mostRecentEvent?.title || homeSettings?.event_title || "EVENT TITLE"}
            </div>
          </div>
        </div>

        {/* Video Hero - Right */}
        <div
          style={{
            width: `${scaledDimensions.rightHeroWidth}px`,  // Use scaled dimensions
            height: `${scaledDimensions.rightHeroHeight}px`,  // Use scaled dimensions
            position: 'relative',
            flexShrink: 0,
            margin: '0'  // Remove auto margin for precise alignment
          }}
        >
          {/* Video Background */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: `${scaledDimensions.rightHeroWidth}px`,  // Use scaled dimensions
              height: `${scaledDimensions.rightHeroHeight}px`,  // Use scaled dimensions
              borderRadius: '24px',
              background: `linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%), url(/images/figma-exact/hero-right-video.png) lightgray center / cover no-repeat`
            }}
          />

          {/* Video Hero Text Box */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: `${Math.min(scaledDimensions.rightHeroHeight, 350) - 54}px`,  // Position relative to constrained height
              display: 'flex',
              width: `${Math.min(scaledDimensions.rightHeroWidth, 450)}px`,  // Match constrained width
              height: '44px',
              padding: '8px 16px',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px'
            }}
          >
            {/* Left - Date and title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '4px',
                flex: '1'
              }}
            >
              {/* Title */}
              <div
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '24px',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: `${scaledDimensions.rightHeroWidth - 60}px`  // Container width minus padding
                }}
              >
                {mostRecentEvent?.artist_name || mostRecentEvent?.title || homeSettings?.event_title || "EVENT TITLE"}
              </div>

              {/* Date */}
              <div
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: '200',
                  lineHeight: 'normal'
                }}
              >
                {formattedDate}
              </div>
            </div>

            {/* Right - CTA */}
            <div
              style={{
                display: 'flex',
                width: '72px',
                height: '26px',
                padding: '8px 16px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '37px',
                background: 'rgba(38, 38, 38, 0.80)',
                cursor: 'pointer'
              }}
            >
              <span
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: '500',
                  lineHeight: 'normal'
                }}
              >
                Events
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Frame 13 - Title Section */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          margin: '16px 0 0 0',  // Remove auto margins since parent handles centering
          padding: '0'  // Remove padding since parent handles it
        }}
      >
        {/* Event Title */}
        <div
          style={{
            width: '504px',
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '24px',
            fontWeight: '800',
            lineHeight: 'normal'
          }}
        >
          Events
        </div>
      </div>


      


      
      {/* Frame 18 - Event List Container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          margin: '8px 0 0 0',  // Remove auto margins since parent handles centering
          padding: '0',  // Remove padding since parent handles it
          justifyContent: 'flex-start',  // Use flex-start with gap for proper spacing
          alignItems: 'flex-start',
          gap: `${scaledDimensions.eventsTextGap}px`,  // Scaled gap between events and text
          flexDirection: isMobile ? 'column' : 'row'  // Stack vertically on mobile
        }}
      >
        {/* Event List */}
        <div
          style={{
            display: 'flex',
            width: `${scaledDimensions.eventsWidth}px`,  // Use scaled width
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            gap: '21px',
            flexShrink: 0  // Prevent shrinking
          }}
        >
          {/* EVENT LIST Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              rowGap: '12px',
              columnGap: '8px',
              alignSelf: 'stretch',
              alignItems: 'start'
            }}
          >
            {/* Show featured events or empty state */}
            {featuredEvents.length === 0 ? (
              /* Empty State - No Featured Events */
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '200px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                  color: '#FFF',
                  fontFamily: 'Inter',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    opacity: '0.8'
                  }}
                >
                  No Featured Events
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    opacity: '0.6',
                    maxWidth: '300px',
                    lineHeight: '1.4'
                  }}
                >
                  Events marked as "Show on Homepage" will appear here. Check the admin dashboard to feature events.
                </div>
              </div>
            ) : (
              /* EventCard_small instances - Dynamic data from featured events only */
              processedEventCards.map((card) => (
              <div
                key={card.id}
                className="eventcardsmall"
                style={{
                  display: 'flex',
                  width: '250px',
                  height: '85px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '16px',
                  background: '#232323',
                  position: 'relative',
                  margin: '0',
                  padding: '0'
                }}
              >
                {/* Group 1 - Complete Event Card Content */}
                <div
                  style={{
                    width: '250px',
                    height: '85px',
                    position: 'relative'
                  }}
                >
                  {/* Frame 6 - Image Section */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '84px',
                      height: '84px',
                      left: '0px',
                      top: '1px'
                    }}
                  >
                    {/* Rectangle 2 - Event Background Image */}
                    <img
                      src={card.coverImage}
                      alt={`${card.title} event cover`}
                      loading="lazy"
                      style={{
                        position: 'absolute',
                        left: '3px',
                        top: '2px',
                        width: '79.04px',
                        height: '79.04px',
                        borderRadius: '14px',
                        objectFit: 'cover',
                        backgroundColor: 'lightgray'
                      }}
                      onError={(e) => {
                        e.target.style.backgroundColor = 'lightgray';
                        e.target.style.display = 'block';
                      }}
                    />

                    {/* Frame 7 - Date Badge Container */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '54px',
                        top: '5px',
                        width: '24px',
                        height: '24px'
                      }}
                    >
                      {/* Rectangle 1 - White Badge Background */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '0px',
                          top: '-1px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          background: '#FFF'
                        }}
                      />

                      {/* Date Badge Content */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '2px',
                          top: '2px',
                          display: 'flex',
                          width: '20px',
                          height: '18px',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '1px'
                        }}
                      >
                        {/* DAY Number */}
                        <span
                          style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontSize: '10px',
                            fontWeight: '800',
                            lineHeight: 'normal'
                          }}
                        >
                          {card.day}
                        </span>

                        {/* MONTH Abbreviation */}
                        <span
                          style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'Inter',
                            fontSize: '6px',
                            fontWeight: '800',
                            lineHeight: 'normal'
                          }}
                        >
                          {card.month}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Frame 4 - Text Content Section */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '94px',
                      top: '0px',
                      display: 'flex',
                      width: '156px',
                      height: '85px',
                      padding: '3px 0px',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}
                  >
                    {/* Frame 3 - Event Information */}
                    <div
                      style={{
                        display: 'flex',
                        height: '50px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        gap: '1px',
                        justifyContent: 'space-between'
                      }}
                    >
                      {/* Event Title */}
                      <div
                        style={{
                          display: 'flex',
                          width: '150px',
                          height: '16px',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          color: '#FFF',
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontWeight: '800',
                          lineHeight: '1.0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {card.title}
                      </div>

                      {/* DATE Information Row */}
                      <div
                        onClick={() => {
                          // Create calendar event
                          const eventTitle = encodeURIComponent(card.title);
                          const eventLocation = encodeURIComponent(card.location);
                          const eventDate = card.date;

                          // Parse date string to create proper calendar format
                          // Assuming card.date format like "Thu @ Jul 03 10:00PM"
                          const now = new Date();
                          const currentYear = now.getFullYear();

                          // Extract date parts (this is a simplified parser)
                          const dateMatch = eventDate.match(/(\w{3})\s+@\s+(\w{3})\s+(\d{1,2})\s+(\d{1,2}):(\d{2})(AM|PM)/);

                          if (dateMatch) {
                            const [, , month, day, hour, minute, ampm] = dateMatch;
                            const monthMap = {
                              'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                              'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
                            };

                            let hour24 = parseInt(hour);
                            if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
                            if (ampm === 'AM' && hour24 === 12) hour24 = 0;

                            const eventDateTime = new Date(currentYear, monthMap[month], parseInt(day), hour24, parseInt(minute));
                            const endDateTime = new Date(eventDateTime.getTime() + 3 * 60 * 60 * 1000); // 3 hours later

                            // Format for calendar URL
                            const startTime = eventDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                            const endTime = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

                            // Try different calendar methods
                            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&location=${eventLocation}&details=Event%20details`;

                            window.open(calendarUrl, '_blank');
                          }
                        }}
                        style={{
                          display: 'flex',
                          height: '12px',
                          paddingLeft: '1px',
                          alignItems: 'center',
                          gap: '3px',
                          alignSelf: 'stretch',
                          cursor: 'pointer',
                          transition: 'opacity 0.2s ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                      >
                        {/* Calendar Icon SVG */}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8" stroke="#FFF" strokeWidth="1"/>
                        </svg>

                        {/* Date Text */}
                        <span
                          style={{
                            display: 'flex',
                            width: '140px',
                            height: '10px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '9px',
                            fontWeight: '300',
                            lineHeight: '1.0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {card.date}
                        </span>
                      </div>

                      {/* LOCATION Information Row */}
                      <div
                        onClick={() => {
                          const address = encodeURIComponent(card.location);
                          const userAgent = navigator.userAgent || '';

                          // Detect iOS
                          if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                            window.open(`maps://maps.apple.com/?q=${address}`, '_blank');
                          }
                          // Detect Android
                          else if (/android/i.test(userAgent)) {
                            window.open(`geo:0,0?q=${address}`, '_blank');
                          }
                          // Default to Google Maps for web browsers
                          else {
                            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
                          }
                        }}
                        style={{
                          display: 'flex',
                          height: '12px',
                          padding: '0px 1px',
                          marginTop: '2px',
                          alignItems: 'center',
                          gap: '3px',
                          alignSelf: 'stretch',
                          cursor: 'pointer',
                          transition: 'opacity 0.2s ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                      >
                        {/* Location Icon SVG */}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" stroke="#FFF" strokeWidth="1"/>
                          <circle cx="5" cy="4" r="1" fill="#FFF"/>
                        </svg>

                        {/* Location Text */}
                        <span
                          style={{
                            display: 'flex',
                            width: '140px',
                            height: '10px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '9px',
                            fontWeight: '300',
                            lineHeight: '1.0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {card.location}
                        </span>
                      </div>
                    </div>

                    {/* Frame 9 - Action Buttons Section */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '0px',
                        top: '45px', // Position to align button bottom with image bottom
                        display: 'flex',
                        width: '156px',
                        height: '36px',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end'
                      }}
                    >
                      {/* Get Tickets Button */}
                      <div
                        onClick={() => {
                          if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                            window.open(card.ticketsUrl, '_blank');
                          }
                        }}
                        style={{
                          display: 'flex',
                          width: '120px',
                          height: '20px',
                          padding: '8px 10px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '6px',
                          borderRadius: '20px',
                          background: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                            ? 'rgba(23, 23, 23, 0.80)'
                            : 'rgba(23, 23, 23, 0.40)',
                          cursor: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                            ? 'pointer'
                            : 'default',
                          opacity: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                            ? 1
                            : 0.6,
                          transition: 'all 0.2s ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                          if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.background = 'rgba(23, 23, 23, 0.90)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = 'rgba(23, 23, 23, 0.80)';
                          }
                        }}
                      >
                        <span
                          style={{
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '10px',
                            fontWeight: '500',
                            lineHeight: 'normal',
                            pointerEvents: 'none'
                          }}
                        >
                          Get Tickets
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>

        {/* Phone Number Form with Text us Title */}
        <div
          style={{
            display: 'flex',
            width: `${scaledDimensions.textUsWidth}px`,  // Use scaled width
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            flexShrink: 0  // Prevent shrinking, maintain scaled width
          }}
        >
          {/* Text us Title */}
          <div
            style={{
              display: 'flex',
              height: '17px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'stretch',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: '800',
              lineHeight: 'normal',
              marginBottom: '4px'
            }}
          >
            Text us
          </div>

          {/* Subtext */}
          <div
            style={{
              display: 'flex',
              height: '11px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'stretch',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '10px',
              fontWeight: '300',
              lineHeight: 'normal',
              marginBottom: '8px'
            }}
          >
            Exclusive events, contests, and more
          </div>
          {/* Phone Number Input */}
          <div
            style={{
              display: 'flex',
              width: '299px',
              height: '36px',
              padding: '0px 2px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '31px',
              background: '#232323'
            }}
          >
            {/* Frame 19 */}
            <div
              style={{
                display: 'flex',
                width: '294px',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {/* Phone number Field */}
              <div
                style={{
                  display: 'flex',
                  width: '233px',
                  height: '30px',
                  alignItems: 'center',
                  gap: '10px',
                  paddingLeft: '10px',
                  borderRadius: '100px',
                  background: '#303030'
                }}
              >
                {/* flag/US */}
                <div
                  style={{
                    width: '23px',
                    height: '15px',
                    background: '#FFFFFF'
                  }}
                >
                  <svg width="23" height="15" viewBox="0 0 23 15" fill="none">
                    <rect width="23" height="15" fill="#FFFFFF"/>
                    <rect width="23" height="1" y="1" fill="#D80027"/>
                    <rect width="23" height="1" y="3" fill="#D80027"/>
                    <rect width="23" height="1" y="5" fill="#D80027"/>
                    <rect width="23" height="1" y="7" fill="#D80027"/>
                    <rect width="23" height="1" y="9" fill="#D80027"/>
                    <rect width="23" height="1" y="11" fill="#D80027"/>
                    <rect width="23" height="1" y="13" fill="#D80027"/>
                    <rect width="11.5" height="8.07" fill="#2E52B2"/>
                  </svg>
                </div>

                {/* Phone Number Input Field */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePhoneSubmit()}
                  placeholder="(555) 123-4567"
                  disabled={phoneSubmitting}
                  style={{
                    width: '190px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: 'normal',
                    minHeight: '44px'
                  }}
                />
              </div>

              {/* SEND Button */}
              <div
                onClick={handlePhoneSubmit}
                style={{
                  display: 'flex',
                  width: '51px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '13px 12px',
                  borderRadius: '100px',
                  background: phoneSubmitted ? '#00AA00' : (phoneSubmitting ? '#888888' : '#00FF40'),
                  cursor: phoneSubmitting ? 'not-allowed' : 'pointer',
                  opacity: phoneSubmitting ? 0.7 : 1,
                  minHeight: '44px',
                  minWidth: '44px'
                }}
              >
                <span
                  style={{
                    color: '#232323',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: '700',
                    lineHeight: 'normal'
                  }}
                >
                  {phoneSubmitted ? '✓' : (phoneSubmitting ? '...' : 'SEND')}
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer Text */}
          <div
            style={{
              width: '299.66px',
              color: '#FFF',
              textAlign: 'justify',
              fontFamily: 'Inter',
              fontSize: '8px',
              fontWeight: '500',
              lineHeight: 'normal',
              letterSpacing: '-0.48px',
              opacity: '0.46',
              textDecoration: 'underline'
            }}
          >
            By submitting my information, I agree to receive recurring automated messages to the contact information provided and to Bounce2Bounce's Terms of Service, Cookie Policy and Privacy Policy. Msg & Data Rates may apply. Reply STOP to cancel, HELP for help.
          </div>
        </div>
      </div>

      {/* B2B LOGO - Bottom */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '32px auto 0 auto'
        }}
      >
        <img
          src="/images/figma-exact/b2b-logo-bottom.svg"
          alt="B2B LOGO"
          loading="lazy"
          style={{
            width: '100%',
            maxWidth: '901px',
            height: 'auto',
            fill: '#101010',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
          }}
        />
      </div>
      {/* End Centered Content Container */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FigmaDesktop);
