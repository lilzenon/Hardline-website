# SEO Validation Checklist - Event Structured Data Fix

## Pre-Deployment Validation

### ✅ Code Review
- [x] EventStructuredData.tsx component created
- [x] Component imported in FigmaDesktop.jsx
- [x] Component imported in FigmaMobile.jsx
- [x] Component integrated in both desktop and mobile JSX
- [x] No TypeScript errors
- [x] No linting errors

### ✅ Schema Completeness
- [x] `startDate` field included (event_datetime_utc or event_date)
- [x] `endDate` field included (event_end_date) - **FIXES GOOGLE ERROR**
- [x] `performer` field included (artist_name + performer_type) - **FIXES GOOGLE ERROR**
- [x] `location` field with complete PostalAddress
- [x] `offers` field with ticket pricing
- [x] `eventStatus` field
- [x] `eventAttendanceMode` field
- [x] `organizer` field
- [x] `image` field with multiple aspect ratios
- [x] ItemList wrapper for multiple events

---

## Local Testing (Before Deployment)

### 1. Start Development Server
```bash
cd C:\Users\chris\Documents\KUTT-B2B\kutt
npm run dev
```

### 2. Open Homepage
- Navigate to: `http://localhost:5173`
- Wait for events to load

### 3. Inspect Page Source
**Method 1: View Source**
- Right-click → "View Page Source"
- Search for: `application/ld+json`
- Verify: Script tag with id="event-structured-data" exists

**Method 2: DevTools Console**
- Open DevTools (F12)
- Check console for: `✅ Injected structured data for X events`
- No errors should appear

**Method 3: DevTools Elements**
- Open DevTools → Elements tab
- Navigate to `<head>` section
- Find: `<script type="application/ld+json" id="event-structured-data">`
- Verify JSON structure is valid

### 4. Validate JSON-LD Structure
Copy the JSON-LD content and validate:

**Expected Structure:**
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
      "item": {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Event Title",
        "startDate": "2025-XX-XXTXX:XX:XX",
        "endDate": "2025-XX-XXTXX:XX:XX",  // ← MUST BE PRESENT
        "performer": {                      // ← MUST BE PRESENT
          "@type": "Person",
          "name": "Artist Name"
        },
        "location": {
          "@type": "Place",
          "name": "Venue Name",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Main St",
            "addressLocality": "City",
            "addressRegion": "State",
            "postalCode": "12345",
            "addressCountry": "US"
          }
        },
        "offers": {
          "@type": "Offer",
          "url": "https://...",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "organizer": {
          "@type": "Organization",
          "name": "BOUNCE2BOUNCE",
          "url": "https://bounce2bounce.com"
        }
      }
    }
  ]
}
```

### 5. Test on Mobile
- Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
- Select mobile device (iPhone 12 Pro, etc.)
- Refresh page
- Verify structured data is still injected
- Check console for success message

---

## Post-Deployment Validation

### 1. Production URL Test
- Navigate to: `https://bounce2bounce.com`
- View page source
- Verify structured data is present

### 2. Google Rich Results Test
**URL:** https://search.google.com/test/rich-results

**Steps:**
1. Enter URL: `https://bounce2bounce.com`
2. Click "Test URL"
3. Wait for results (30-60 seconds)

**Expected Results:**
- ✅ "Event" rich results detected
- ✅ Multiple events shown in results
- ✅ No errors for "Missing field 'endDate'"
- ✅ No errors for "Missing field 'performer'"
- ✅ All required fields validated

**If Errors Appear:**
- Check which fields are missing
- Verify event data in admin dashboard has those fields populated
- Check browser console for any JavaScript errors
- Verify API response includes all SEO fields

### 3. Schema Markup Validator
**URL:** https://validator.schema.org/

**Steps:**
1. Copy the JSON-LD content from page source
2. Paste into validator
3. Click "Validate"

**Expected Results:**
- ✅ No errors
- ✅ No warnings (or only minor warnings)
- ✅ All Event schemas validated

### 4. Google Search Console Monitoring

**Immediate Check (Day 1):**
1. Go to: https://search.google.com/search-console
2. Navigate to: URL Inspection
3. Enter: `https://bounce2bounce.com`
4. Click "Test Live URL"
5. Wait for results
6. Click "View Tested Page" → "More Info" → "JavaScript console messages"
7. Verify no errors related to structured data

**Request Re-indexing:**
1. After testing live URL, click "Request Indexing"
2. Wait for confirmation
3. This speeds up Google's re-crawl process

**Long-term Monitoring (7-14 days):**
1. Navigate to: Enhancements → Event
2. Check for:
   - ✅ Decrease in "Missing field 'endDate'" errors
   - ✅ Decrease in "Missing field 'performer'" errors
   - ✅ Increase in valid Event items
3. Monitor weekly for 2-4 weeks to ensure errors stay resolved

---

## Troubleshooting

### Issue: Structured data not appearing in page source

**Possible Causes:**
- React component not rendering
- Events array is empty
- JavaScript error preventing execution

**Solutions:**
1. Check browser console for errors
2. Verify `featuredEvents` and `homepageEvents` are populated
3. Check Network tab for API response from `/api/home-settings/homepage-data`
4. Verify EventStructuredData component is imported correctly

### Issue: Google Rich Results Test shows errors

**Possible Causes:**
- Missing required fields in event data
- Invalid date format
- Invalid URL format

**Solutions:**
1. Check which specific fields are missing
2. Verify event data in admin dashboard
3. Check API response for those fields
4. Ensure date fields are in ISO 8601 format

### Issue: endDate or performer still missing

**Possible Causes:**
- Event data in database doesn't have these fields populated
- API not returning these fields
- Component not using these fields

**Solutions:**
1. Check admin dashboard: Edit an event → SEO Settings
2. Verify `event_end_date` and `artist_name` are filled in
3. Check API response: `/api/home-settings/homepage-data`
4. Verify EventStructuredData component includes these fields in schema

---

## Success Criteria

### Immediate (Day 1)
- [x] Structured data appears in page source
- [x] Google Rich Results Test shows no errors
- [x] Schema Markup Validator shows no errors
- [x] Browser console shows success message

### Short-term (7-14 days)
- [ ] Google Search Console shows decrease in errors
- [ ] "Missing field 'endDate'" errors reduced to 0
- [ ] "Missing field 'performer'" errors reduced to 0
- [ ] Valid Event items increased

### Long-term (30+ days)
- [ ] Improved search visibility for event-related queries
- [ ] Event rich results appearing in Google Search
- [ ] Increased organic traffic to event pages
- [ ] Better CTR (Click-Through Rate) from search results

---

## Rollback Plan

If issues arise after deployment:

### Quick Rollback (Emergency)
1. Remove EventStructuredData component from FigmaDesktop.jsx and FigmaMobile.jsx
2. Commit and deploy
3. Verify homepage loads correctly

### Partial Rollback (Debugging)
1. Add console.log statements to EventStructuredData component
2. Check which events are causing issues
3. Filter out problematic events temporarily
4. Fix data in admin dashboard
5. Re-enable all events

---

**Last Updated:** 2025-01-05
**Status:** Ready for Testing
**Next Review:** After deployment + 7 days

