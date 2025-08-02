-- Migration: Add Critical Performance Indexes
-- Priority: HIGH (Addresses sequential scans and slow queries)
-- Estimated Time: 15-30 minutes (CONCURRENTLY)
-- Risk Level: LOW (Non-blocking index creation)

-- =====================================================
-- PHASE 1: TIME-BASED QUERY OPTIMIZATION
-- =====================================================

-- Links: Recent popular links query optimization
-- Addresses: SELECT * FROM links WHERE created_at > NOW() - INTERVAL '30 days' ORDER BY visit_count DESC
CREATE INDEX CONCURRENTLY links_recent_popular_idx 
ON links (created_at DESC, visit_count DESC, user_id) 
WHERE created_at > NOW() - INTERVAL '90 days' AND visit_count > 0;

-- Links: Time-based analytics with visit count
CREATE INDEX CONCURRENTLY links_created_visit_analytics_idx 
ON links (created_at DESC, visit_count DESC) 
WHERE created_at > NOW() - INTERVAL '90 days';

-- Visits: Analytics queries optimization
-- Addresses: SELECT v.*, l.address FROM visits v JOIN links l WHERE v.created_at >= date
CREATE INDEX CONCURRENTLY visits_analytics_covering_idx 
ON visits (created_at DESC, link_id, total) 
INCLUDE (id, countries, referrers) 
WHERE created_at > NOW() - INTERVAL '90 days';

-- Visits: Link analytics with time filtering
CREATE INDEX CONCURRENTLY visits_link_time_total_idx 
ON visits (link_id, created_at DESC, total) 
WHERE created_at > NOW() - INTERVAL '90 days';

-- =====================================================
-- PHASE 2: USER ACTIVITY & ENGAGEMENT
-- =====================================================

-- Users: Activity tracking and engagement scoring
CREATE INDEX CONCURRENTLY users_activity_engagement_idx 
ON users (last_activity_at DESC, engagement_score DESC, total_link_clicks DESC) 
WHERE last_activity_at IS NOT NULL;

-- Users: Acquisition channel analysis
CREATE INDEX CONCURRENTLY users_acquisition_active_idx 
ON users (acquisition_channel, created_at DESC, last_activity_at DESC) 
WHERE acquisition_channel IS NOT NULL;

-- =====================================================
-- PHASE 3: EVENT MANAGEMENT OPTIMIZATION
-- =====================================================

-- Events: Active events with date filtering
CREATE INDEX CONCURRENTLY events_active_date_user_idx 
ON events (is_active, event_date DESC, user_id, created_at DESC) 
WHERE is_active = true;

-- Events: Homepage display optimization
CREATE INDEX CONCURRENTLY events_homepage_display_idx 
ON events (show_on_homepage, is_active, event_date DESC) 
WHERE show_on_homepage = true AND is_active = true;

-- Event Signups: Contact analytics optimization
CREATE INDEX CONCURRENTLY event_signups_contact_time_idx 
ON event_signups (email, created_at DESC, event_id) 
WHERE email IS NOT NULL;

-- Event Signups: Phone-based analytics
CREATE INDEX CONCURRENTLY event_signups_phone_time_idx 
ON event_signups (normalized_phone, created_at DESC, event_id) 
WHERE normalized_phone IS NOT NULL;

-- =====================================================
-- PHASE 4: JSON COLUMN OPTIMIZATION
-- =====================================================

-- Users: Location data GIN index for geographic queries
CREATE INDEX CONCURRENTLY users_location_data_gin_idx 
ON users USING GIN (location_data) 
WHERE location_data IS NOT NULL;

-- Users: Preferences GIN index for settings queries
CREATE INDEX CONCURRENTLY users_preferences_gin_idx 
ON users USING GIN (preferences) 
WHERE preferences IS NOT NULL;

-- Visits: Countries JSONB optimization
CREATE INDEX CONCURRENTLY visits_countries_gin_idx 
ON visits USING GIN (countries) 
WHERE countries IS NOT NULL;

-- Visits: Referrers JSONB optimization
CREATE INDEX CONCURRENTLY visits_referrers_gin_idx 
ON visits USING GIN (referrers) 
WHERE referrers IS NOT NULL;

-- Events: Address data GIN index
CREATE INDEX CONCURRENTLY events_address_data_gin_idx 
ON events USING GIN (address_data) 
WHERE address_data IS NOT NULL;

-- =====================================================
-- PHASE 5: FULL-TEXT SEARCH OPTIMIZATION
-- =====================================================

-- Links: Enhanced search index for address and description
CREATE INDEX CONCURRENTLY links_fulltext_enhanced_idx 
ON links USING GIN (
    to_tsvector('english', 
        COALESCE(description, '') || ' ' || 
        COALESCE(address, '') || ' ' ||
        COALESCE(og_title, '') || ' ' ||
        COALESCE(meta_title, '')
    )
) WHERE description IS NOT NULL OR og_title IS NOT NULL;

-- Events: Full-text search for event content
CREATE INDEX CONCURRENTLY events_fulltext_search_idx 
ON events USING GIN (
    to_tsvector('english', 
        COALESCE(title, '') || ' ' || 
        COALESCE(description, '') || ' ' ||
        COALESCE(artist_name, '') || ' ' ||
        COALESCE(event_address, '')
    )
);

-- =====================================================
-- PHASE 6: SPECIALIZED PERFORMANCE INDEXES
-- =====================================================

-- Links: Expiration management
CREATE INDEX CONCURRENTLY links_expiration_management_idx 
ON links (expire_in, created_at DESC) 
WHERE expire_in IS NOT NULL AND expire_in > NOW();

-- Links: Popular content identification
CREATE INDEX CONCURRENTLY links_popularity_ranking_idx 
ON links (visit_count DESC, created_at DESC, user_id) 
WHERE visit_count > 10;

-- Users: Authentication and security
CREATE INDEX CONCURRENTLY users_auth_security_idx 
ON users (email, verified, banned, role) 
WHERE verified = true AND banned = false;

-- User Sessions: Active session management
CREATE INDEX CONCURRENTLY user_sessions_active_mgmt_idx 
ON user_sessions (user_id, last_activity DESC, is_active) 
WHERE is_active = true;

-- =====================================================
-- VERIFICATION & MONITORING
-- =====================================================

-- Check index creation progress
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public' 
    AND indexname LIKE '%_idx'
    AND indexname NOT LIKE '%_pkey'
ORDER BY tablename, indexname;

-- Monitor index usage after deployment
CREATE OR REPLACE VIEW new_index_usage AS
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes 
WHERE indexname LIKE '%recent_popular%' 
   OR indexname LIKE '%analytics%'
   OR indexname LIKE '%activity%'
   OR indexname LIKE '%fulltext%'
ORDER BY idx_scan DESC;

-- Performance impact measurement
CREATE OR REPLACE FUNCTION measure_query_performance()
RETURNS TABLE(
    query_type TEXT,
    execution_time_ms NUMERIC,
    rows_returned BIGINT
) AS $$
BEGIN
    -- Test recent popular links query
    RETURN QUERY
    EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
    SELECT l.*, u.email FROM links l 
    JOIN users u ON l.user_id = u.id 
    WHERE l.created_at > NOW() - INTERVAL '30 days' 
    ORDER BY l.visit_count DESC LIMIT 20;
END;
$$ LANGUAGE plpgsql;
