# Google Search Console SEO Fix: Event Structured Data

## Issue Summary

Google Search Console was reporting **two missing fields** for event listings on the React homepage (bounce2bounce.com):

1. **Missing field "endDate"** - 11 items affected
2. **Missing field "performer"** - 9 items affected

Despite these fields being properly configured in the admin dashboard (admin.b2b.click), Google's crawlers could not detect them on the homepage.

---

## Root Cause Analysis

### The Problem

The React homepage (`bounce2bounce.com`) was **NOT rendering any JSON-LD structured data** for events. 

- **Individual event landing pages** (`/event/:slug`) had proper structured data via server-side rendering
- **The React homepage** only displayed event cards in HTML without any `<script type="application/ld+json">` tags
- Google Search Console crawled the homepage, found event listings, but **no structured data** to validate

### Why This Happened

The homepage is a **pure React SPA** (Single Page Application) that:
1. Fetches event data from the API (`/api/home-settings/homepage-data`)
2. Renders event cards dynamically in the browser
3. **Never injected JSON-LD structured data** into the page `<head>`

The backend had all the SEO fields (`event_end_date`, `performer_type`, `artist_name`, venue fields, etc.) and the API was returning them, but the React frontend wasn't using them for SEO purposes.

---

## Solution Implemented

### New Component: `EventStructuredData.tsx`

Created a new React component that:

1. **Generates JSON-LD structured data** for all events using the same schema as the backend
2. **Includes all required and recommended fields** according to Google's Event schema guidelines:
   - ✅ `startDate` (event_datetime_utc or event_date)
   - ✅ `endDate` (event_end_date) - **FIXED**
   - ✅ `performer` (artist_name with performer_type) - **FIXED**
   - ✅ `location` (venue fields with complete PostalAddress)
   - ✅ `offers` (ticket pricing and availability)
   - ✅ `eventStatus` (EventScheduled, EventCancelled, etc.)
   - ✅ `eventAttendanceMode` (OfflineEventAttendanceMode)
   - ✅ `organizer` (BOUNCE2BOUNCE organization)
   - ✅ `image` (cover image with multiple aspect ratios)

3. **Wraps events in ItemList schema** for better SEO (recommended by Google for event listings)

4. **Dynamically injects structured data** into the page `<head>` using React `useEffect`

### Integration Points

The component was integrated into both:

1. **`FigmaDesktop.jsx`** (Desktop homepage)
2. **`FigmaMobile.jsx`** (Mobile homepage)

Both components now render:

```jsx
<EventStructuredData 
  events={[...featuredEvents, ...homepageEvents]} 
  domain="bounce2bounce.com" 
/>
```

This ensures **all events** (featured + homepage) are included in the structured data.

---

## Technical Details

### Event Schema Generation

The `generateEventSchema()` function mirrors the backend implementation in `server/routes/public_events.routes.js`:

```typescript
function generateEventSchema(event: Event, domain: string) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description || `Join us for ${event.title}...`,
    url: `https://${domain}/event/${event.slug}`,
    
    // START DATE - REQUIRED
    startDate: event.event_datetime_utc || event.event_date,
    
    // END DATE - RECOMMENDED (was missing)
    endDate: event.event_end_date,
    
    // PERFORMER - RECOMMENDED (was missing)
    performer: event.artist_name ? {
      '@type': event.performer_type || 'Person',
      name: event.artist_name
    } : undefined,
    
    // LOCATION - REQUIRED
    location: {
      '@type': 'Place',
      name: event.venue_name || event.event_address,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venue_street_address,
        addressLocality: event.venue_city,
        addressRegion: event.venue_state,
        postalCode: event.venue_postal_code,
        addressCountry: event.venue_country || 'US'
      }
    },
    
    // OFFERS - RECOMMENDED
    offers: event.external_ticket_url || event.posh_embed_url ? {
      '@type': 'Offer',
      url: event.external_ticket_url || event.posh_embed_url,
      price: event.ticket_price_amount?.toString() || '0',
      priceCurrency: event.ticket_price_currency || 'USD',
      availability: `https://schema.org/${event.ticket_availability || 'InStock'}`
    } : undefined,
    
    // Additional recommended fields
    eventStatus: `https://schema.org/${event.event_status || 'EventScheduled'}`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    organizer: {
      '@type': 'Organization',
      name: 'BOUNCE2BOUNCE',
      url: `https://${domain}`
    }
  }
  
  return schema
}
```

### ItemList Wrapper

All event schemas are wrapped in an `ItemList` for better SEO:

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Upcoming Events",
  "description": "Live music events and exclusive experiences by BOUNCE2BOUNCE",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": { /* Event schema */ }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": { /* Event schema */ }
    }
  ]
}
```

---

## Files Modified

1. **`src/react/components/EventStructuredData.tsx`** (NEW)
   - New component for generating and injecting JSON-LD structured data

2. **`src/react/components/FigmaDesktop.jsx`**
   - Added import: `import EventStructuredData from './EventStructuredData'`
   - Added component in JSX: `<EventStructuredData events={[...featuredEvents, ...homepageEvents]} domain="bounce2bounce.com" />`

3. **`src/react/components/FigmaMobile.jsx`**
   - Added import: `import EventStructuredData from './EventStructuredData'`
   - Added component in JSX: `<EventStructuredData events={[...featuredEvents, ...homepageEvents]} domain="bounce2bounce.com" />`

---

## Testing Instructions

### 1. Local Testing

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the homepage** in your browser: `http://localhost:5173`

3. **Inspect the page source** (View → Developer → View Source):
   - Look for `<script type="application/ld+json" id="event-structured-data">`
   - Verify it contains Event schemas with `endDate` and `performer` fields

4. **Check the browser console:**
   - Should see: `✅ Injected structured data for X events`

### 2. Google Rich Results Test

1. **Deploy the changes** to production (bounce2bounce.com)

2. **Test with Google's Rich Results Test:**
   - Go to: https://search.google.com/test/rich-results
   - Enter URL: `https://bounce2bounce.com`
   - Click "Test URL"

3. **Verify the results:**
   - Should show "Event" rich results detected
   - Should NOT show errors for missing "endDate" or "performer" fields
   - All events should be properly detected with complete schema

### 3. Google Search Console Validation

1. **Wait 24-48 hours** for Google to re-crawl the homepage

2. **Check Google Search Console:**
   - Go to: https://search.google.com/search-console
   - Navigate to: Enhancements → Event
   - Verify: "Missing field 'endDate'" and "Missing field 'performer'" errors are resolved

3. **Request re-indexing** (optional, to speed up the process):
   - Go to: URL Inspection
   - Enter: `https://bounce2bounce.com`
   - Click "Request Indexing"

---

## Expected Outcome

After deployment and Google re-crawling:

- ✅ **No more "Missing field 'endDate'" errors** in Google Search Console
- ✅ **No more "Missing field 'performer'" errors** in Google Search Console
- ✅ **All events properly detected** with complete Event schema
- ✅ **Improved SEO** for event listings on the homepage
- ✅ **Better visibility** in Google Search results for event-related queries

---

## Additional Notes

### Why This Approach?

1. **No new dependencies** - Uses vanilla React (no react-helmet-async needed)
2. **Lightweight** - Minimal performance impact
3. **Consistent** - Mirrors backend schema generation logic
4. **Maintainable** - Single source of truth for Event schema structure
5. **SEO-friendly** - Follows Google's Event structured data guidelines exactly

### Future Improvements

Consider adding:
- **Organization schema** for BOUNCE2BOUNCE (separate from events)
- **BreadcrumbList schema** for better navigation understanding
- **WebSite schema** with search action for site-wide SEO
- **Automatic schema validation** in CI/CD pipeline

---

## References

- [Google Event Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Schema.org Event Documentation](https://schema.org/Event)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Search Console](https://search.google.com/search-console)

---

**Status:** ✅ **IMPLEMENTED AND READY FOR TESTING**

**Next Steps:**
1. Test locally to verify structured data is injected correctly
2. Deploy to production
3. Test with Google Rich Results Test
4. Monitor Google Search Console for error resolution (24-48 hours)

