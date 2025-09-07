# FigmaDesktop.jsx Integration Example

## Before Integration (Current State)

```javascript
import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';
import { sanitizeUserInput, sanitizeFormData, sanitizeUrl, sanitizeSearchQuery } from '../utils/sanitizer';
import { useAnalytics } from '../hooks/useAnalytics';
import TextUsSection from './TextUsSection';

// Simple cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for formatted dates to avoid repeated calculations
const dateFormatCache = new Map();

const FigmaDesktop = () => {
  // Initialize analytics
  const { trackEvent, trackLinkClick } = useAnalytics();

  // CURRENT STATE - TO BE REMOVED
  const [homeSettings, setHomeSettings] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [homepageEvents, setHomepageEvents] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllEvents, setShowAllEvents] = useState(true);

  // CURRENT FETCH FUNCTION - TO BE REMOVED
  const fetchHomepageData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first with improved cache key
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
      const dashboardDomain = window.location.hostname === 'localhost' ? 'https://admin.b2b.click' : 'https://admin.b2b.click';
      const apiUrl = '/api/home-settings/homepage-data';

      const response = await fetch(apiUrl);
      // ... rest of fetch logic
    } catch (err) {
      // ... error handling
    } finally {
      setLoading(false);
    }
  }, []);

  // CURRENT EVENT PROCESSING - TO BE REMOVED
  const processedEventCards = useMemo(() => {
    const featuredCards = [];
    const regularCards = [];

    // Process featured events (Large Hero Square Cards)
    featuredEvents.forEach((event, index) => {
      // ... complex processing logic
    });

    // Process regular homepage events (Small Event Cards)
    homepageEvents.forEach((event, index) => {
      // ... complex processing logic
    });

    // Filter events based on toggle state
    const currentDate = new Date();
    // ... filtering logic

    return {
      featuredCards: filteredFeaturedCards,
      regularCards: filteredRegularCards
    };
  }, [featuredEvents, homepageEvents, showAllEvents]);

  // CURRENT EFFECT - TO BE REMOVED
  useEffect(() => {
    fetchHomepageData();
  }, [fetchHomepageData]);

  // Rest of component...
};
```

## After Integration (New State)

```javascript
import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';
import { sanitizeUserInput, sanitizeFormData, sanitizeUrl, sanitizeSearchQuery } from '../utils/sanitizer';
import { useAnalytics } from '../hooks/useAnalytics';
import { useHomepageData } from '../hooks/useHomepageData'; // NEW IMPORT
import TextUsSection from './TextUsSection';

const FigmaDesktop = () => {
  // Initialize analytics
  const { trackEvent, trackLinkClick } = useAnalytics();

  // NEW HOOK USAGE - REPLACES ALL DATA MANAGEMENT
  const {
    loading,
    error,
    homeSettings,
    formattedDate,
    showAllEvents,
    setShowAllEvents,
    filteredFeaturedEvents,
    filteredHomepageEvents
  } = useHomepageData();

  // All other component logic remains exactly the same
  // Just replace variable references:
  // - processedEventCards.featuredCards → filteredFeaturedEvents
  // - processedEventCards.regularCards → filteredHomepageEvents

  // Example usage in render:
  return (
    <div className="homepage-root">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {/* Featured Events */}
          {filteredFeaturedEvents.map((event, index) => (
            <div key={event.id}>
              {/* Event card JSX - no changes needed */}
            </div>
          ))}

          {/* Regular Events */}
          {filteredHomepageEvents.map((event, index) => (
            <div key={event.id}>
              {/* Event card JSX - no changes needed */}
            </div>
          ))}

          {/* Event Filter Toggle */}
          <div onClick={() => setShowAllEvents(!showAllEvents)}>
            {showAllEvents ? 'All' : 'Past'}
          </div>
        </>
      )}
    </div>
  );
};
```

## Specific Lines to Remove from FigmaDesktop.jsx

### Constants (lines ~158-162):
```javascript
// REMOVE THESE LINES
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const dateFormatCache = new Map();
```

### State Declarations (lines ~465-470):
```javascript
// REMOVE THESE LINES
const [homeSettings, setHomeSettings] = useState(null);
const [featuredEvents, setFeaturedEvents] = useState([]);
const [homepageEvents, setHomepageEvents] = useState([]);
const [formattedDate, setFormattedDate] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [showAllEvents, setShowAllEvents] = useState(true);
```

### Functions to Remove (lines ~618-749):
```javascript
// REMOVE ENTIRE FUNCTION
const fetchHomepageData = useCallback(async () => {
  // ... entire function body
}, []);
```

### useMemo to Remove (lines ~1352-1574):
```javascript
// REMOVE ENTIRE USEMEMO
const processedEventCards = useMemo(() => {
  // ... entire processing logic
}, [featuredEvents, homepageEvents, showAllEvents]);
```

### useEffect to Remove (line ~750):
```javascript
// REMOVE THIS USEEFFECT
useEffect(() => {
  fetchHomepageData();
}, [fetchHomepageData]);
```

## Variable Replacements in JSX

Find and replace these variable references throughout the component:

| Find | Replace With |
|------|-------------|
| `processedEventCards.featuredCards` | `filteredFeaturedEvents` |
| `processedEventCards.regularCards` | `filteredHomepageEvents` |
| `processedEventCards.featuredCards.length` | `filteredFeaturedEvents.length` |
| `processedEventCards.regularCards.length` | `filteredHomepageEvents.length` |

## Expected Line Reduction

- **Constants**: ~5 lines removed
- **State declarations**: ~7 lines removed  
- **fetchHomepageData function**: ~130 lines removed
- **processedEventCards useMemo**: ~220 lines removed
- **useEffect**: ~3 lines removed
- **Total**: ~365 lines removed

## Validation Steps

1. **Import the hook**: Add `import { useHomepageData } from '../hooks/useHomepageData';`
2. **Replace state**: Remove old state, add hook destructuring
3. **Remove functions**: Delete fetchHomepageData and processedEventCards
4. **Update JSX**: Replace variable references
5. **Test functionality**: Verify all features work identically
6. **Check performance**: Confirm faster load times and smaller bundle

## Common Pitfalls to Avoid

1. **Don't change JSX structure**: Only replace variable names, not the rendering logic
2. **Preserve event handlers**: Keep all onClick, onSubmit, etc. handlers unchanged
3. **Maintain styling**: Don't modify any style objects or CSS classes
4. **Keep error boundaries**: Preserve all error handling in the UI layer
5. **Test thoroughly**: Verify both desktop and mobile views work correctly

This integration maintains 100% backward compatibility while significantly reducing code duplication and improving maintainability.
