# Analytics System - Complete Data Flow Diagram

## Overview
This document provides a detailed visualization of how visitor data flows through the entire analytics system, from initial page load to dashboard display.

---

## 1. High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER VISITS HOMEPAGE                            │
│                      (b2b.click or bounce2bounce.com)                   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 1: Frontend Analytics Initialization                             │
│  ────────────────────────────────────────────────────────────────────  │
│  File: kutt/src/main.tsx:36-42                                         │
│  ────────────────────────────────────────────────────────────────────  │
│  • initializeAnalytics() called on app startup                         │
│  • Creates AnalyticsBeacon instance                                    │
│  • Determines API endpoint based on hostname                           │
│  • Checks Do Not Track / bot detection                                 │
│  • Generates or retrieves session ID from localStorage                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 2: Page View Tracking                                            │
│  ────────────────────────────────────────────────────────────────────  │
│  File: kutt/src/lib/analytics/beacon.ts:220-250                        │
│  ────────────────────────────────────────────────────────────────────  │
│  • trackPageView() called automatically                                │
│  • Collects page data:                                                 │
│    - page_url, page_title, referrer                                    │
│    - UTM parameters (source, medium, campaign)                         │
│    - Viewport/screen dimensions                                        │
│    - Timezone, language                                                │
│  • Creates JSON payload                                                │
│  • ⚠️ ISSUE: session_id NOT included in payload                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 3: Data Transmission                                             │
│  ────────────────────────────────────────────────────────────────────  │
│  File: kutt/src/lib/analytics/beacon.ts:171-210                        │
│  ────────────────────────────────────────────────────────────────────  │
│  Method 1 (Preferred): navigator.sendBeacon()                          │
│    • Creates Blob with JSON payload                                    │
│    • Sends to: https://admin.b2b.click/api/analytics/track             │
│    • ⚠️ CRITICAL ISSUE: Wrong endpoint! Should be /a/pv                │
│    • Fire-and-forget (no response handling)                            │
│                                                                         │
│  Method 2 (Fallback): fetch() with keepalive                           │
│    • Used if sendBeacon fails or unavailable                           │
│    • Same endpoint issue                                               │
│    • CORS mode enabled                                                 │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 4: API Request Reception                                         │
│  ────────────────────────────────────────────────────────────────────  │
│  File: kutt-dashboard-deploy/server/routes/api/                        │
│        analytics.ingest.routes.ts:51-116                               │
│  ────────────────────────────────────────────────────────────────────  │
│  POST /a/pv endpoint receives request                                  │
│                                                                         │
│  Security Checks:                                                       │
│  ✓ CORS headers set (Access-Control-Allow-Origin: *)                  │
│  ✓ Preflight OPTIONS handling                                          │
│  ✓ Prefetch/prerender detection (shouldIgnoreRequest)                  │
│  ✓ Bot detection (isBotUA)                                             │
│  ✓ Do Not Track header check                                           │
│  ✓ Payload validation (validateEventData)                              │
│  ✓ IP address extraction (getClientIP)                                 │
│                                                                         │
│  Rate Limiting:                                                         │
│  • 1000 requests per 15 minutes per IP                                 │
│  • ⚠️ ISSUE: Too high, should be ~100-200                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 5: Data Enrichment                                               │
│  ────────────────────────────────────────────────────────────────────  │
│  File: kutt-dashboard-deploy/server/services/analytics/enrich.ts       │
│  ────────────────────────────────────────────────────────────────────  │
│  enrichEvent() function processes raw data:                            │
│                                                                         │
│  1. User Agent Parsing (parseUA):                                      │
│     • Uses ua-parser-js library                                        │
│     • Extracts: device_type, os, browser                               │
│     • Determines: is_mobile, is_tablet, is_desktop                     │
│                                                                         │
│  2. Referrer Analysis (parseReferrer):                                 │
│     • Extracts domain from referrer URL                                │
│     • Classifies type: direct, search, social, email, referral         │
│                                                                         │
│  3. Geographic Lookup (getGeo):                                        │
│     • Checks Cloudflare headers (cf-ipcountry, cf-region, etc.)        │
│     • ⚠️ ISSUE: No fallback for non-Cloudflare deployments             │
│     • Returns: country, region, city, asn, timezone                    │
│                                                                         │
│  4. UTM Parameter Extraction (extractUTMParams):                       │
│     • Parses URL for utm_source, utm_medium, utm_campaign, etc.        │
│                                                                         │
│  5. URL Normalization (normalizePageUrl):                              │
│     • Removes tracking parameters                                      │
│     • Removes hash fragments                                           │
│                                                                         │
│  6. IP Hashing:                                                         │
│     • SHA-256 hash of (salt + IP)                                      │
│     • Privacy-preserving unique identifier                             │
│                                                                         │
│  7. Event ID Generation:                                                │
│     • crypto.randomUUID() for unique event identifier                  │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 6: Parallel Data Processing (Fire-and-Forget)                    │
│  ────────────────────────────────────────────────────────────────────  │
│  File: analytics.ingest.routes.ts:95-107                               │
│  ────────────────────────────────────────────────────────────────────  │
│  Three async operations execute in parallel:                           │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ 6A. Database Write (writeEvent)                                 │  │
│  │ ─────────────────────────────────────────────────────────────── │  │
│  │ File: services/analytics/storage.ts:19-30                       │  │
│  │                                                                  │  │
│  │ ⚠️ CRITICAL ISSUE: pg client is null (not initialized)          │  │
│  │                                                                  │  │
│  │ IF initialized (should be):                                     │  │
│  │ • Calls writeToPostgreSQL()                                     │  │
│  │ • Inserts into analytics_events table                           │  │
│  │ • 25 columns: event_id, ts, page_url, page_title, referrer,    │  │
│  │   referrer_domain, referrer_type, utm_*, ua, device_type,      │  │
│  │   os, browser, is_mobile, is_tablet, is_desktop, ip_hash,      │  │
│  │   country, region, city, asn, timezone                          │  │
│  │ • Uses parameterized query (SQL injection safe)                │  │
│  │ • ⚠️ ISSUE: Individual insert (should use batch)                │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ 6B. Redis Hot Counters (updateHotCounters)                      │  │
│  │ ─────────────────────────────────────────────────────────────── │  │
│  │ File: services/analytics/hot.ts:61-115                          │  │
│  │                                                                  │  │
│  │ ⚠️ CRITICAL ISSUE: redis client is null (not initialized)       │  │
│  │                                                                  │  │
│  │ IF initialized (should be):                                     │  │
│  │ • Uses Redis pipeline for atomic operations                     │  │
│  │ • Updates:                                                       │  │
│  │   - active:{ip_hash} (5-min TTL) - tracks online users         │  │
│  │   - total:events (counter) - ⚠️ ISSUE: No TTL, grows forever   │  │
│  │   - events:permin (sorted set) - event rate tracking           │  │
│  │   - top:referrers:5m (sorted set) - top referrers              │  │
│  │   - top:pages:5m (sorted set) - top pages                      │  │
│  │   - top:countries:5m (sorted set) - geographic distribution    │  │
│  │   - top:devices:5m (sorted set) - device breakdown             │  │
│  │   - top:browsers:5m (sorted set) - browser breakdown           │  │
│  │ • Executes pipeline                                             │  │
│  │ • 1% chance of cleanup (⚠️ ISSUE: Should be scheduled)          │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │ 6C. WebSocket Broadcast (publishTick)                           │  │
│  │ ─────────────────────────────────────────────────────────────── │  │
│  │ File: services/websocket/ws.publisher.js                        │  │
│  │                                                                  │  │
│  │ • Triggers immediate analytics broadcast to connected clients   │  │
│  │ • Calls currentSummary() to get latest data from Redis          │  │
│  │ • Emits 'analytics:tick' event to all admin clients             │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ⚠️ CRITICAL ISSUE: All three operations fail silently                 │
│  • Errors only logged to console                                       │
│  • No retry mechanism                                                  │
│  • No error aggregation or alerting                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 7: Response to Client                                            │
│  ────────────────────────────────────────────────────────────────────  │
│  • Always returns 204 No Content (even on errors)                      │
│  • Prevents client-side error handling                                 │
│  • Beacon requests don't expect response anyway                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 8: Real-Time Dashboard Updates                                   │
│  ────────────────────────────────────────────────────────────────────  │
│  File: kutt-dashboard-deploy/src/hooks/useWebSocketAnalytics.ts        │
│  ────────────────────────────────────────────────────────────────────  │
│  WebSocket Connection:                                                  │
│  • Dashboard connects to Socket.IO server                              │
│  • Authenticates with JWT token                                        │
│  • ⚠️ ISSUE: Auth can be bypassed if JWT_SECRET not set                │
│  • Joins 'admin:analytics' room                                        │
│                                                                         │
│  Receives 'analytics:tick' events every 5 seconds:                     │
│  • onlineNow: Count of active users (last 5 minutes)                   │
│  • totalEvents: Total events tracked                                   │
│  • eventsLast5m: Events in last 5 minutes                              │
│  • topReferrers: Top 10 referrer domains                               │
│  • topPages: Top 10 pages                                              │
│  • byCountry: Geographic distribution                                  │
│  • byDevice: Device type breakdown                                     │
│  • byBrowser: Browser breakdown                                        │
│                                                                         │
│  Fallback Polling:                                                      │
│  • If WebSocket disconnects, falls back to HTTP polling                │
│  • Polls /api/analytics/summary every 5 seconds                        │
│  • ⚠️ ISSUE: No exponential backoff                                    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  STEP 9: Dashboard Visualization                                       │
│  ────────────────────────────────────────────────────────────────────  │
│  File: kutt-dashboard-deploy/src/components/analytics/                 │
│        RealTimeAnalytics.tsx                                           │
│  ────────────────────────────────────────────────────────────────────  │
│  • Displays real-time metrics in glassmorphism cards                   │
│  • Updates every 5 seconds with new data                               │
│  • Shows connection status indicator                                   │
│  • Renders charts and graphs                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Database Schema

### analytics_events Table
```sql
CREATE TABLE analytics_events (
  event_id UUID PRIMARY KEY,
  ts TIMESTAMPTZ NOT NULL,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  referrer_domain TEXT,
  referrer_type TEXT DEFAULT 'direct',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  ua TEXT,
  device_type TEXT,
  os TEXT,
  browser TEXT,
  is_mobile BOOLEAN DEFAULT FALSE,
  is_tablet BOOLEAN DEFAULT FALSE,
  is_desktop BOOLEAN DEFAULT TRUE,
  ip_hash TEXT NOT NULL,
  country TEXT,
  region TEXT,
  city TEXT,
  asn TEXT,
  timezone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_analytics_events_ts ON analytics_events (ts DESC);
CREATE INDEX idx_analytics_events_referrer_domain ON analytics_events (referrer_domain);
CREATE INDEX idx_analytics_events_page_url ON analytics_events (page_url);
CREATE INDEX idx_analytics_events_country ON analytics_events (country);
CREATE INDEX idx_analytics_events_ip_hash ON analytics_events (ip_hash);
CREATE INDEX idx_analytics_events_device_type ON analytics_events (device_type);

-- ⚠️ MISSING: Composite indexes for common queries
-- Should add:
-- CREATE INDEX idx_analytics_events_ts_country ON analytics_events (ts DESC, country);
-- CREATE INDEX idx_analytics_events_ts_device ON analytics_events (ts DESC, device_type);
```

---

## 3. Redis Data Structure

```
Key Pattern                    Type        TTL      Purpose
─────────────────────────────────────────────────────────────────────────
active:{ip_hash}               String      300s     Track online users
total:events                   Counter     None ⚠️  Total event count
events:permin                  Sorted Set  None ⚠️  Events per minute
top:referrers:5m               Sorted Set  None     Top referrers (5min window)
top:pages:5m                   Sorted Set  None     Top pages (5min window)
top:countries:5m               Sorted Set  None     Top countries (5min window)
top:devices:5m                 Sorted Set  None     Top devices (5min window)
top:browsers:5m                Sorted Set  None     Top browsers (5min window)
```

**⚠️ Memory Leak Issues:**
- `total:events` grows indefinitely
- `events:permin` sorted set never cleaned
- Cleanup only runs 1% of the time (random)

---

## 4. API Endpoints

### Analytics Ingest
```
POST /a/pv
  Purpose: Collect page view events
  Auth: None (public endpoint)
  Rate Limit: 1000 req/15min per IP
  CORS: * (wildcard)
  Response: 204 No Content
```

### Analytics Summary (REST Fallback)
```
GET /api/analytics/summary
  Purpose: Get current analytics summary
  Auth: JWT token or API key required
  Rate Limit: 500 req/15min per IP
  CORS: Environment-based
  Response: JSON with analytics data
```

### WebSocket
```
Socket.IO: /socket.io/
  Event: analytics:tick (every 5 seconds)
  Auth: JWT token required
  Room: admin:analytics
```

---

## 5. Critical Path Issues Summary

1. **Endpoint Mismatch** → Data never reaches server
2. **Redis Not Initialized** → Real-time analytics broken
3. **PostgreSQL Not Initialized** → Data not persisted
4. **Session ID Missing** → Session tracking broken
5. **No Error Handling** → Silent failures
6. **Memory Leaks** → Redis grows indefinitely
7. **Missing Indexes** → Slow queries at scale

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-17

