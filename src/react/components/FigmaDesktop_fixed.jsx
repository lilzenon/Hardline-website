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
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [scaledDimensions, setScaledDimensions] = useState({
    heroWidth: 299,
    heroHeight: 299,
    rightHeroWidth: 498,
    rightHeroHeight: 299,
    gap: 32,
    containerWidth: 825,
    eventsTextGap: 18,
    eventCardWidth: 220,
    eventCardHeight: 85,
    scale: 1
  });

  // Calculate responsive dimensions based on viewport
  useEffect(() => {
    const calculateDimensions = () => {
      const currentViewportWidth = window.innerWidth;
      setViewportWidth(currentViewportWidth);
      const padding = currentViewportWidth <= 360 ? 16 : currentViewportWidth <= 480 ? 24 : 32;
      const availableWidth = currentViewportWidth - padding;

      // Base dimensions from Figma design
      const baseHeroWidth = 299;
      const baseHeroHeight = 299;
      const baseRightHeroWidth = 498;
      const baseRightHeroHeight = 299;
      const baseGap = 32;
      const baseContainerWidth = 825;
      const containerPadding = 32;
      const availableContainerWidth = baseContainerWidth - containerPadding;

      // Calculate scale factor
      const totalHeroWidth = baseHeroWidth + baseGap + baseRightHeroWidth;
      const baseEventsWidth = 440;
      const baseTextUsWidth = 299;
      const baseEventsTextGap = 50;
      const totalEventsTextWidth = baseEventsWidth + baseEventsTextGap + baseTextUsWidth;

      const maxRequiredWidth = Math.max(totalHeroWidth, totalEventsTextWidth);
      let scale = Math.min(availableWidth / maxRequiredWidth, availableContainerWidth / maxRequiredWidth);

      if (scale < 0.25) scale = 0.25;
      if (scale > 1.25) scale = 1.25;

      const scaledDimensions = {
        heroWidth: Math.round(baseHeroWidth * scale),
        heroHeight: Math.round(baseHeroHeight * scale),
        rightHeroWidth: Math.round(baseRightHeroWidth * scale),
        rightHeroHeight: Math.round(baseRightHeroHeight * scale),
        gap: Math.round(baseGap * scale),
        containerWidth: baseContainerWidth,
        eventsWidth: Math.round(baseEventsWidth * scale),
        textUsWidth: Math.round(baseTextUsWidth * scale),
        eventsTextGap: Math.round(baseEventsTextGap * scale),
        eventCardWidth: 220,
        eventCardHeight: 85,
        scale: scale
      };

      setIsMobile(currentViewportWidth <= 850);
      setScaledDimensions(scaledDimensions);
      console.log(`🎯 Responsive scaling: ${scale.toFixed(3)} for viewport ${viewportWidth}px (max 1.25x)`, scaledDimensions);
    };

    calculateDimensions();
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

    if (parts.length >= 2) {
      const firstPart = parts[0];
      if (/^\d/.test(firstPart)) {
        return parts.slice(1, 3).join(', ');
      } else {
        return parts.slice(0, 2).join(', ');
      }
    }

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

      if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response format');
      }

      const homeSettings = data.homeSettings || {};
      if (!homeSettings.event_title && !homeSettings.artist_name) {
        console.warn('Home settings missing required fields, using defaults');
      }

      const featuredEvents = Array.isArray(data.featuredEvents) ? data.featuredEvents : [];
      if (featuredEvents.length === 0) {
        console.warn('No featured events found, using placeholder cards');
      }

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
          .replace(',', 'th,');
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
    const phoneRegex = /^[\+]?[1]?[\s\-\.]?[\(]?[0-9]{3}[\)]?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }, []);

  const handlePhoneSubmit = useCallback(async () => {
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedPhone || phoneSubmitting) return;

    if (!validatePhoneNumber(trimmedPhone)) {
      console.warn('Invalid phone number format');
      return;
    }

    try {
      setPhoneSubmitting(true);
      console.log('📱 Submitting phone number:', trimmedPhone);

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
        setTimeout(() => setPhoneSubmitted(false), 3000);
      } else {
        console.error('❌ Failed to submit phone number:', result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('❌ Error submitting phone number:', error);
    } finally {
      setPhoneSubmitting(false);
    }
  }, [phoneNumber, phoneSubmitting, validatePhoneNumber]);

  // Show loading state while maintaining layout
  if (loading) {
    return (
      <div className="homepage-root">
        <div className="homepage-content">
          <div
            className="desktop-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh'
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
  }

  return (
    <div className="homepage-root">
      <div className="homepage-content">
        <div
          className="desktop-container"
          style={{
            width: '100%',
            maxWidth: `${scaledDimensions.containerWidth}px`,
            margin: '0 auto',
            position: 'relative',
            background: '#000000',
            minHeight: '100vh',
            padding: '0 16px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Navigation */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              width: '100%',
              height: '48px',
              alignItems: 'center',
              margin: '35px 0 0 0',
              padding: '0'
            }}>
              <img
                src="/images/figma-exact/b2b-logo-nav.svg"
                alt="B2B Logo"
                loading="lazy"
                style={{
                  width: '138.41px',
                  height: '43px'
                }}
              />
              <div style={{
                position: 'relative',
                width: '226.49px',
                height: '34px',
                gridColumn: '3',
                justifySelf: 'end'
              }}>
                <div style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  width: '226.49px',
                  height: '34px',
                  background: '#232323',
                  borderRadius: '12px',
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                }} />
                <div style={{
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
                }}>
                  <span style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: '300',
                    lineHeight: 'normal'
                  }}>
                    Events
                  </span>
                </div>
              </div>
            </div>

            {/* Placeholder for more content - will be added in next chunk */}
            <div style={{ 
              color: 'white', 
              textAlign: 'center', 
              padding: '40px 0',
              fontFamily: 'Inter'
            }}>
              <h1>Homepage Content Loading...</h1>
              <p>Hero sections, events, and other content will be added here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FigmaDesktop);
