# useHomepageData Hook Integration Guide

## Overview

The `useHomepageData` custom hook consolidates all homepage data fetching, validation, and processing logic that was previously duplicated between `FigmaDesktop.jsx` and `FigmaMobile.jsx`. This integration will reduce code duplication by 200-300 lines while maintaining 100% backward compatibility.

## Hook Interface

```javascript
const {
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
  
  // Processed data (ready to use)
  filteredFeaturedEvents,
  filteredHomepageEvents,
  
  // Utility functions
  normalizeEvent,
  formatEventDate,
  formatLocation,
  getTicketInfo,
  
  // Refresh function
  refetch
} = useHomepageData();
```

## Integration Steps

### 1. FigmaDesktop.jsx Integration

**Remove these existing state declarations:**
```javascript
// REMOVE - Now handled by hook
const [homeSettings, setHomeSettings] = useState(null);
const [featuredEvents, setFeaturedEvents] = useState([]);
const [homepageEvents, setHomepageEvents] = useState([]);
const [formattedDate, setFormattedDate] = useState('');
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [showAllEvents, setShowAllEvents] = useState(true);
```

**Remove these functions:**
```javascript
// REMOVE - Now handled by hook
const fetchHomepageData = useCallback(async () => { ... }, []);
const processedEventCards = useMemo(() => { ... }, [featuredEvents, homepageEvents, showAllEvents]);
```

**Add hook import and usage:**
```javascript
import { useHomepageData } from '../hooks/useHomepageData';

const FigmaDesktop = () => {
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

  // Rest of component logic remains the same
  // Use filteredFeaturedEvents instead of processedEventCards.featuredCards
  // Use filteredHomepageEvents instead of processedEventCards.regularCards
};
```

### 2. FigmaMobile.jsx Integration

**Remove these existing state declarations:**
```javascript
// REMOVE - Now handled by hook
const [featuredEvents, setFeaturedEvents] = useState([]);
const [homepageEvents, setHomepageEvents] = useState([]);
const [homeSettings, setHomeSettings] = useState(null);
const [loading, setLoading] = useState(true);
const [showAllEvents, setShowAllEvents] = useState(true);
```

**Remove these functions:**
```javascript
// REMOVE - Now handled by hook
const fetchHomepageData = useCallback(async () => { ... }, []);
const featuredEventCards = useMemo(() => { ... }, [featuredEvents, showAllEvents]);
const homepageEventCards = useMemo(() => { ... }, [homepageEvents, featuredEvents, showAllEvents]);
```

**Add hook import and usage:**
```javascript
import { useHomepageData } from '../hooks/useHomepageData';

const FigmaMobile = () => {
  const {
    loading,
    homeSettings,
    showAllEvents,
    setShowAllEvents,
    filteredFeaturedEvents,
    filteredHomepageEvents
  } = useHomepageData();

  // Rest of component logic remains the same
  // Use filteredFeaturedEvents instead of featuredEventCards
  // Use filteredHomepageEvents instead of homepageEventCards
};
```

## Code Removal Checklist

### From FigmaDesktop.jsx:
- [ ] Remove `apiCache` and `CACHE_DURATION` constants (lines ~158-159)
- [ ] Remove `dateFormatCache` constant (line ~162)
- [ ] Remove all state declarations for data management
- [ ] Remove `fetchHomepageData` function (~lines 618-749)
- [ ] Remove `processedEventCards` useMemo (~lines 1352-1574)
- [ ] Remove `useEffect` that calls `fetchHomepageData` (~line 750)
- [ ] Update event rendering to use `filteredFeaturedEvents` and `filteredHomepageEvents`

### From FigmaMobile.jsx:
- [ ] Remove all state declarations for data management
- [ ] Remove `fetchHomepageData` function (~lines 1105-1193)
- [ ] Remove `featuredEventCards` useMemo (~lines 1461-1576)
- [ ] Remove `homepageEventCards` useMemo (~lines 1578-1699)
- [ ] Remove `useEffect` that calls `fetchHomepageData` (~line 1334)
- [ ] Update event rendering to use `filteredFeaturedEvents` and `filteredHomepageEvents`

## Variable Mapping

| Old Variable (Desktop) | Old Variable (Mobile) | New Hook Variable |
|----------------------|---------------------|------------------|
| `processedEventCards.featuredCards` | `featuredEventCards` | `filteredFeaturedEvents` |
| `processedEventCards.regularCards` | `homepageEventCards` | `filteredHomepageEvents` |
| `homeSettings` | `homeSettings` | `homeSettings` |
| `loading` | `loading` | `loading` |
| `showAllEvents` | `showAllEvents` | `showAllEvents` |
| `setShowAllEvents` | `setShowAllEvents` | `setShowAllEvents` |

## Benefits After Integration

1. **Code Reduction**: ~200-300 lines removed across both components
2. **Single Source of Truth**: All data logic centralized in one hook
3. **Improved Caching**: Unified cache strategy prevents duplicate API calls
4. **Better Maintainability**: Changes to data logic only need to be made in one place
5. **Enhanced Performance**: Reduced bundle size and eliminated duplicate processing
6. **Consistent Behavior**: Both components guaranteed to have identical data handling

## Testing Checklist

After integration, verify:
- [ ] Homepage loads correctly on both desktop and mobile
- [ ] Event cards display with correct data (title, date, location, buttons)
- [ ] "All/Past" toggle works identically on both views
- [ ] Event filtering and sorting behavior is preserved
- [ ] Ticket buttons work correctly (enabled/disabled states)
- [ ] Loading states display properly
- [ ] Error handling works as expected
- [ ] Caching behavior is maintained (check network tab)
- [ ] No console errors or warnings
- [ ] Performance is improved (smaller bundle, faster load)

## Rollback Plan

If issues arise, the integration can be rolled back by:
1. Reverting the component files to their previous state
2. Removing the `useHomepageData.js` file
3. The hook is completely self-contained with no external dependencies

## Performance Impact

Expected improvements:
- **Bundle Size**: 5-10% reduction in homepage chunk size
- **Parse Time**: Faster due to less duplicate code
- **Memory Usage**: Reduced due to single data processing pipeline
- **Network**: Eliminated potential duplicate API calls
- **Maintainability**: Significantly improved due to centralized logic
