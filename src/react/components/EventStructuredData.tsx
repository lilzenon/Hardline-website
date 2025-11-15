import { useEffect } from 'react'

/**
 * EventStructuredData Component
 * 
 * Generates and injects JSON-LD structured data for events into the page <head>
 * to improve SEO and Google Search Console event detection.
 * 
 * This component addresses Google Search Console errors for missing "endDate" and "performer" fields
 * by generating complete Event schema markup according to Google's guidelines.
 * 
 * @see https://developers.google.com/search/docs/appearance/structured-data/event
 */

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
  if (event.cover_image_url || event.cover_image) {
    const imageUrl = event.cover_image_url || event.cover_image
    schema.image = [
      imageUrl, // Original
      imageUrl, // 4x3 variant
      imageUrl  // 16x9 variant
    ]
  }

  // START DATE: ISO 8601 with timezone - REQUIRED
  if (event.event_datetime_utc) {
    schema.startDate = event.event_datetime_utc
  } else if (event.event_date) {
    schema.startDate = event.event_date
  }

  // END DATE: ISO 8601 with timezone - RECOMMENDED
  // This field was missing and causing Google Search Console errors
  if (event.event_end_date) {
    schema.endDate = event.event_end_date
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
  const location: any = {
    '@type': 'Place'
  }

  // Venue name (use venue_name if available, otherwise event_address)
  if (event.venue_name) {
    location.name = event.venue_name
  } else if (event.event_address) {
    location.name = event.event_address
  }

  // Complete PostalAddress with all components
  const address: any = {
    '@type': 'PostalAddress'
  }

  if (event.venue_street_address) {
    address.streetAddress = event.venue_street_address
  }
  if (event.venue_city) {
    address.addressLocality = event.venue_city
  }
  if (event.venue_state) {
    address.addressRegion = event.venue_state
  }
  if (event.venue_postal_code) {
    address.postalCode = event.venue_postal_code
  }
  address.addressCountry = event.venue_country || 'US'

  location.address = address

  // Geo coordinates (if available)
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

  return schema
}

/**
 * EventStructuredData Component
 * 
 * Injects JSON-LD structured data for all events into the page <head>
 * Uses ItemList schema to wrap multiple Event schemas for better SEO
 */
export default function EventStructuredData({ events, domain = 'bounce2bounce.com' }: EventStructuredDataProps) {
  useEffect(() => {
    // Only generate structured data if we have events
    if (!events || events.length === 0) {
      console.log('⚠️ EventStructuredData: No events provided, skipping schema injection')
      return
    }

    console.log(`🔍 EventStructuredData: Processing ${events.length} events for schema.org markup`)

    // Validate event data structure
    const validEvents = events.filter(event => {
      if (!event) {
        console.warn('⚠️ EventStructuredData: Null/undefined event detected, skipping')
        return false
      }
      if (!event.title && !event.artist_name) {
        console.warn('⚠️ EventStructuredData: Event missing title/artist_name:', event)
        return false
      }
      if (!event.slug) {
        console.warn('⚠️ EventStructuredData: Event missing slug (required for URL):', event.title || event.id)
        return false
      }
      return true
    })

    if (validEvents.length === 0) {
      console.warn('❌ EventStructuredData: No valid events after validation, skipping schema injection')
      return
    }

    if (validEvents.length < events.length) {
      console.warn(`⚠️ EventStructuredData: Filtered out ${events.length - validEvents.length} invalid events`)
    }

    // Generate Event schemas for all valid events
    const eventSchemas = validEvents.map(event => generateEventSchema(event, domain))

    // Wrap in ItemList for better SEO (recommended by Google for event listings)
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

    // Create or update the structured data script tag
    const scriptId = 'event-structured-data'
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement

    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = scriptId
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
      console.log('📝 EventStructuredData: Created new script tag in <head>')
    } else {
      console.log('🔄 EventStructuredData: Updating existing script tag')
    }

    scriptTag.textContent = JSON.stringify(structuredData)

    console.log(`✅ EventStructuredData: Injected structured data for ${validEvents.length} events`)
    console.log('📊 EventStructuredData: Schema preview:', {
      totalEvents: validEvents.length,
      firstEvent: eventSchemas[0]?.name,
      schemaType: structuredData['@type']
    })

    // Cleanup function to remove the script tag when component unmounts
    return () => {
      const existingScript = document.getElementById(scriptId)
      if (existingScript) {
        existingScript.remove()
        console.log('🧹 EventStructuredData: Removed schema script tag on unmount')
      }
    }
  }, [events, domain])

  // This component doesn't render anything visible
  return null
}

