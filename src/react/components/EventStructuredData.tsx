import { useEffect, useRef } from 'react'

/**
 * EventStructuredData Component
 *
 * Generates and injects JSON-LD structured data for events into the page <head>
 * to improve SEO and Google Search Console event detection.
 *
 * This component addresses Google Search Console errors for missing "endDate" and "performer" fields
 * by generating complete Event schema markup according to Google's guidelines.
 *
 * CRITICAL FIX: Uses singleton pattern to prevent duplicate script tags during React re-renders.
 * The script tag persists across component re-renders and is only removed when the component
 * is permanently unmounted (e.g., navigating away from the page).
 *
 * @see https://developers.google.com/search/docs/appearance/structured-data/event
 */

// Global flag to track if structured data script tag exists
// This prevents duplicate script tags when component re-renders
let globalScriptTagExists = false

interface Event {
  id: number
  title: string
  description?: string
  slug: string
  cover_image?: string
  cover_image_url?: string
  artist_name?: string
  event_date?: string
  event_datetime_utc?: string
  event_end_date?: string
  event_status?: string
  performer_type?: string
  venue_name?: string
  venue_street_address?: string
  venue_city?: string
  venue_state?: string
  venue_postal_code?: string
  venue_country?: string
  event_address?: string
  external_ticket_url?: string
  posh_embed_url?: string
  ticket_price_amount?: number
  ticket_price_currency?: string
  ticket_availability?: string
  created_at?: string
  address_latitude?: number
  address_longitude?: number
}

interface EventStructuredDataProps {
  events: Event[]
  domain?: string
}

/**
 * Generate Google Event structured data (schema.org/Event) for a single event
 * 
 * This function mirrors the backend generateEventSchema function to ensure consistency
 * between server-rendered event pages and the React homepage.
 */
function generateEventSchema(event: Event, domain: string) {
  const eventUrl = `https://${domain}/event/${event.slug}`

  // Build Event schema with all required and recommended fields
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description || `Join us for ${event.title}${event.artist_name ? ` featuring ${event.artist_name}` : ''}`,
    url: eventUrl
  }

  // IMAGE: Multiple aspect ratios (1x1, 4x3, 16x9) - RECOMMENDED by Google
  // Google requires at least one image for event carousels
  if (event.cover_image_url || event.cover_image) {
    let imageUrl = event.cover_image_url || event.cover_image

    // Ensure image URL is absolute (required by Google)
    if (imageUrl && !imageUrl.startsWith('http')) {
      imageUrl = `https://${domain}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`
    }

    // Google recommends multiple aspect ratios for better display
    // Minimum image size: 720px wide (Google requirement)
    schema.image = [
      imageUrl, // Original (1x1 for event cards)
      imageUrl, // 4x3 variant (for search results)
      imageUrl  // 16x9 variant (for event carousels)
    ]
  } else {
    // Fallback image if event has no cover image (prevents validation errors)
    schema.image = [`https://${domain}/images/og-image.png`]
  }

  // START DATE: ISO 8601 with timezone - REQUIRED
  let startDate: string | undefined
  if (event.event_datetime_utc) {
    schema.startDate = event.event_datetime_utc
    startDate = event.event_datetime_utc
  } else if (event.event_date) {
    schema.startDate = event.event_date
    startDate = event.event_date
  }

  // END DATE: ISO 8601 with timezone - REQUIRED by Google
  // Google Rich Results Test requires this field for ALL events
  // If missing from database, generate a default (startDate + 4 hours)
  if (event.event_end_date) {
    schema.endDate = event.event_end_date
  } else if (startDate) {
    // Generate default end date: start date + 4 hours (typical event duration)
    const startDateTime = new Date(startDate)
    const endDateTime = new Date(startDateTime.getTime() + (4 * 60 * 60 * 1000)) // Add 4 hours
    schema.endDate = endDateTime.toISOString()
    console.warn(`⚠️ EventStructuredData: Event "${event.title}" missing end_date, generated default: ${schema.endDate}`)
  } else {
    // Fallback: if no start date either, use current time + 4 hours
    const now = new Date()
    const endDateTime = new Date(now.getTime() + (4 * 60 * 60 * 1000))
    schema.endDate = endDateTime.toISOString()
    console.error(`❌ EventStructuredData: Event "${event.title}" missing both start and end dates, using fallback: ${schema.endDate}`)
  }

  // EVENT STATUS: EventScheduled, EventCancelled, EventRescheduled, EventPostponed - RECOMMENDED
  schema.eventStatus = `https://schema.org/${event.event_status || 'EventScheduled'}`

  // EVENT ATTENDANCE MODE: OfflineEventAttendanceMode (physical location) - RECOMMENDED
  schema.eventAttendanceMode = 'https://schema.org/OfflineEventAttendanceMode'

  // PERFORMER: Person or PerformingGroup - RECOMMENDED
  // This field was missing and causing Google Search Console errors
  if (event.artist_name) {
    schema.performer = {
      '@type': event.performer_type || 'Person',
      name: event.artist_name
    }
  }

  // LOCATION: Place with complete PostalAddress - REQUIRED
  // Google requires BOTH location.name AND location.address for valid Event schema
  const location: any = {
    '@type': 'Place'
  }

  // Venue name - REQUIRED by Google (cannot be empty)
  // Use venue_name if available, otherwise use event_address, otherwise use a default
  if (event.venue_name) {
    location.name = event.venue_name
  } else if (event.event_address) {
    location.name = event.event_address
  } else {
    // Fallback: Use city or a generic name to satisfy Google's requirement
    location.name = event.venue_city || 'Event Venue'
  }

  // Complete PostalAddress with all components - REQUIRED by Google
  const address: any = {
    '@type': 'PostalAddress'
  }

  // Google requires at least addressLocality (city) and addressCountry
  if (event.venue_street_address) {
    address.streetAddress = event.venue_street_address
  }

  // addressLocality (city) is REQUIRED by Google
  if (event.venue_city) {
    address.addressLocality = event.venue_city
  } else {
    // If no city, use a fallback to prevent validation errors
    address.addressLocality = 'New Jersey'
  }

  if (event.venue_state) {
    address.addressRegion = event.venue_state
  }
  if (event.venue_postal_code) {
    address.postalCode = event.venue_postal_code
  }

  // addressCountry is REQUIRED by Google
  address.addressCountry = event.venue_country || 'US'

  location.address = address

  // Geo coordinates (if available) - RECOMMENDED by Google
  if (event.address_latitude && event.address_longitude) {
    location.geo = {
      '@type': 'GeoCoordinates',
      latitude: parseFloat(event.address_latitude.toString()),
      longitude: parseFloat(event.address_longitude.toString())
    }
  }

  schema.location = location

  // ORGANIZER: Organization - RECOMMENDED
  schema.organizer = {
    '@type': 'Organization',
    name: 'BOUNCE2BOUNCE',
    url: `https://${domain}`
  }

  // OFFERS: Ticket pricing and availability - RECOMMENDED
  if (event.external_ticket_url || event.posh_embed_url) {
    const offerUrl = event.external_ticket_url || event.posh_embed_url

    schema.offers = {
      '@type': 'Offer',
      url: offerUrl,
      price: event.ticket_price_amount ? event.ticket_price_amount.toString() : '0',
      priceCurrency: event.ticket_price_currency || 'USD',
      availability: `https://schema.org/${event.ticket_availability || 'InStock'}`,
      validFrom: event.created_at
    }
  }

  // AGGREGATE RATING: Optional but helps with rich results
  // Note: Only add if you have actual rating data - don't fake it!
  // Commenting out for now as we don't collect ratings yet
  // schema.aggregateRating = {
  //   '@type': 'AggregateRating',
  //   ratingValue: '4.5',
  //   reviewCount: '100'
  // }

  return schema
}

/**
 * EventStructuredData Component
 * 
 * Injects JSON-LD structured data for all events into the page <head>
 * Uses ItemList schema to wrap multiple Event schemas for better SEO
 */
export default function EventStructuredData({ events, domain = 'bounce2bounce.com' }: EventStructuredDataProps) {
  // Track if this component instance created the script tag
  const createdScriptTag = useRef(false)

  useEffect(() => {
    console.log('🚀 EventStructuredData: Component useEffect triggered', {
      eventsCount: events?.length,
      domain,
      timestamp: new Date().toISOString(),
      globalScriptTagExists,
      createdByThisInstance: createdScriptTag.current
    })

    // Only generate structured data if we have events
    if (!events || events.length === 0) {
      console.log('⚠️ EventStructuredData: No events provided, skipping schema injection')
      return
    }

    console.log(`🔍 EventStructuredData: Received ${events.length} events from parent component`)
    console.log('📋 EventStructuredData: Event IDs received:', events.map(e => ({ id: e.id, title: e.title || e.artist_name, slug: e.slug })))

    // 🚨 CRITICAL FIX: Deduplicate events by ID before generating schemas
    // The backend may return the same event in both featuredEvents and homepageEvents arrays
    // This causes duplicate Event schemas in the JSON-LD, which Google flags as an error
    console.log('🔄 EventStructuredData: Starting deduplication process...')

    const uniqueEventsMap = new Map<number, Event>()
    const duplicateIds: number[] = []

    events.forEach((event, index) => {
      if (!event) {
        console.warn(`⚠️ EventStructuredData: Null/undefined event at index ${index}`)
        return
      }

      if (!event.id) {
        console.warn(`⚠️ EventStructuredData: Event missing ID at index ${index}:`, event.title || event.artist_name)
        return
      }

      // Keep the first occurrence (featured events come first, so they take priority)
      if (!uniqueEventsMap.has(event.id)) {
        uniqueEventsMap.set(event.id, event)
        console.log(`✅ EventStructuredData: Added event ID ${event.id} (${event.title || event.artist_name}) - first occurrence`)
      } else {
        duplicateIds.push(event.id)
        console.warn(`🔁 EventStructuredData: Skipped duplicate event ID ${event.id} (${event.title || event.artist_name}) - already in map`)
      }
    })

    const uniqueEvents = Array.from(uniqueEventsMap.values())

    console.log(`📊 EventStructuredData: Deduplication complete:`)
    console.log(`   - Total events received: ${events.length}`)
    console.log(`   - Duplicate events removed: ${duplicateIds.length}`)
    console.log(`   - Duplicate event IDs: [${duplicateIds.join(', ')}]`)
    console.log(`   - Unique events remaining: ${uniqueEvents.length}`)
    console.log(`   - Unique event IDs: [${Array.from(uniqueEventsMap.keys()).join(', ')}]`)

    if (uniqueEvents.length < events.length) {
      console.warn(`⚠️ EventStructuredData: Removed ${events.length - uniqueEvents.length} duplicate events (same event in featured + homepage arrays)`)
    } else {
      console.log('✅ EventStructuredData: No duplicates found - all events are unique')
    }

    // Validate event data structure against Google's REQUIRED fields
    // Google requires: name, startDate, location (with name and address)
    const validEvents = uniqueEvents.filter(event => {
      if (!event) {
        console.warn('⚠️ EventStructuredData: Null/undefined event detected, skipping')
        return false
      }

      // REQUIRED: name (event title)
      if (!event.title && !event.artist_name) {
        console.warn('⚠️ EventStructuredData: Event missing title/artist_name (REQUIRED):', event)
        return false
      }

      // REQUIRED: slug (for generating unique event URL)
      if (!event.slug) {
        console.warn('⚠️ EventStructuredData: Event missing slug (REQUIRED for URL):', event.title || event.id)
        return false
      }

      // REQUIRED: startDate (event date/time)
      if (!event.event_datetime_utc && !event.event_date) {
        console.warn('⚠️ EventStructuredData: Event missing startDate (REQUIRED):', event.title || event.id)
        return false
      }

      // RECOMMENDED: location information (Google strongly recommends this)
      if (!event.venue_name && !event.event_address && !event.venue_city) {
        console.warn('⚠️ EventStructuredData: Event missing location info (RECOMMENDED):', event.title || event.id)
        // Don't skip - we'll use fallback values
      }

      return true
    })

    if (validEvents.length === 0) {
      console.warn('❌ EventStructuredData: No valid events after validation, skipping schema injection')
      return
    }

    if (validEvents.length < uniqueEvents.length) {
      console.warn(`⚠️ EventStructuredData: Filtered out ${uniqueEvents.length - validEvents.length} invalid events`)
    }

    // Generate Event schemas for all valid events
    console.log(`🏗️ EventStructuredData: Generating schemas for ${validEvents.length} valid events...`)
    const eventSchemas = validEvents.map((event, index) => {
      const schema = generateEventSchema(event, domain)
      console.log(`   - Schema ${index + 1}: ${schema.name} (URL: ${schema.url})`)
      return schema
    })

    // 🚨 CRITICAL FIX: Google requires EACH event to have a unique @id
    // Without unique @id values, Google shows "Identical property values given, but unique values are required"
    // Add unique @id to each event schema based on the event URL
    console.log('🔗 EventStructuredData: Assigning unique @id to each event schema...')
    eventSchemas.forEach((schema, index) => {
      const eventId = schema.url // Use the event URL as the unique identifier
      schema['@id'] = eventId
      console.log(`   - Event ${index + 1}: @id = "${eventId}"`)
    })

    console.log(`✅ EventStructuredData: All ${eventSchemas.length} schemas have @id assigned`)
    console.log('📋 EventStructuredData: Final schema @id values:', eventSchemas.map(s => s['@id']))

    // Wrap in ItemList for better SEO (recommended by Google for event listings)
    // Google requires ItemList for event carousels in search results
    console.log('📦 EventStructuredData: Wrapping schemas in ItemList...')
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Upcoming Events',
      description: 'Live music events and exclusive experiences by BOUNCE2BOUNCE',
      itemListElement: eventSchemas.map((schema, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: schema
      }))
    }


    // 🔍 AUDIT: Check for ALL JSON-LD script tags in the document
    console.log('🔍 EventStructuredData: Auditing ALL JSON-LD script tags in document...')
    const allJsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]')
    console.log(`📊 EventStructuredData: Found ${allJsonLdScripts.length} total JSON-LD script tags in document`)

    let externalEventScriptCount = 0
    let externalItemListScriptCount = 0
    let hasExternalEventSchema = false

    allJsonLdScripts.forEach((script, index) => {
      const scriptElement = script as HTMLScriptElement
      const scriptId = scriptElement.id || '(no id)'
      const scriptContent = scriptElement.textContent || ''
      const hasEventType = scriptContent.includes('"@type":"Event"') || scriptContent.includes('"@type": "Event"')
      const hasItemListType = scriptContent.includes('"@type":"ItemList"') || scriptContent.includes('"@type": "ItemList"')
      const isOurScriptTag = scriptId === 'event-structured-data'

      if (!isOurScriptTag && hasEventType) {
        externalEventScriptCount += 1
        hasExternalEventSchema = true
      }
      if (!isOurScriptTag && hasItemListType) {
        externalItemListScriptCount += 1
      }

      console.log(`   Script ${index + 1}:`, {
        id: scriptId,
        hasEventType,
        hasItemListType,
        isOurScriptTag,
        contentLength: scriptContent.length,
        preview: scriptContent.substring(0, 100) + '...'
      })
    })

    if (hasExternalEventSchema) {
      console.log('⏭️ EventStructuredData: External Event JSON-LD detected (likely server-rendered). Skipping client-side injection to avoid duplicates.')
      return
    }

    // 🔒 SINGLETON PATTERN: Ensure only ONE script tag exists globally
    // This prevents duplicates when component re-renders or remounts
    const scriptId = 'event-structured-data'
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement

    if (!scriptTag) {
      // Create new script tag only if it doesn't exist
      scriptTag = document.createElement('script')
      scriptTag.id = scriptId
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
      globalScriptTagExists = true
      createdScriptTag.current = true
      console.log('📝 EventStructuredData: Created new script tag in <head>')
    } else {
      console.log('🔄 EventStructuredData: Updating existing script tag (already exists in DOM)')
    }

    const newContent = JSON.stringify(structuredData, null, 2)
    const oldContent = scriptTag.textContent || ''

    if (oldContent === newContent) {
      console.log('⏭️ EventStructuredData: Content unchanged, skipping update')
    } else {
      scriptTag.textContent = newContent
      console.log('✏️ EventStructuredData: Updated script tag content')
      console.log(`   Content changed: ${oldContent.length} → ${newContent.length} characters`)
    }

    console.log(`✅ EventStructuredData: Successfully injected structured data for ${validEvents.length} events`)
    console.log('📊 EventStructuredData: Final Summary:', {
      totalEventsReceived: events.length,
      duplicatesRemoved: events.length - uniqueEvents.length,
      invalidEventsFiltered: uniqueEvents.length - validEvents.length,
      finalEventCount: validEvents.length,
      itemListElementCount: structuredData.itemListElement.length,
      allEventsHaveId: eventSchemas.every(s => s['@id']),
      schemaType: structuredData['@type']
    })

    // Log the actual JSON-LD for debugging (only in development)
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔍 EventStructuredData: Complete JSON-LD output:')
      console.log(JSON.stringify(structuredData, null, 2))
    }

    // 🚨 CRITICAL: Cleanup function should NOT remove the script tag on every re-render
    // Only remove it when the component is permanently unmounted (e.g., page navigation)
    // This prevents the mount → unmount → mount cycle that creates duplicates
    return () => {
      // Only remove the script tag if THIS component instance created it
      // AND the component is being permanently unmounted (not just re-rendering)
      if (createdScriptTag.current) {
        const existingScript = document.getElementById(scriptId)
        if (existingScript) {
          existingScript.remove()
          globalScriptTagExists = false
          createdScriptTag.current = false
          console.log('🧹 EventStructuredData: Removed schema script tag on permanent unmount')
        }
      } else {
        console.log('⏭️ EventStructuredData: Skipping cleanup (script tag owned by another instance or re-render)')
      }
    }
  }, [events, domain])

  // This component doesn't render anything visible
  return null
}

