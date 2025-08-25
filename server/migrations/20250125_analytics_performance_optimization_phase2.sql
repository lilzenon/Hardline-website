-- =====================================================
-- BOUNCE2BOUNCE Analytics Performance Optimization - Phase 2
-- Query Optimization with PostgreSQL Functions
-- =====================================================
-- Date: 2025-01-25
-- Description: Creates optimized PostgreSQL functions to replace multiple-query patterns
-- Target: Replace 4+ separate queries with single optimized functions
-- Dependency: Requires Phase 1 indexes to be created first

-- =====================================================
-- PHASE 2: OPTIMIZED ANALYTICS FUNCTIONS
-- =====================================================

-- Enable timing for performance monitoring
\timing on

-- =====================================================
-- 1. DASHBOARD STATS OPTIMIZATION FUNCTION
-- =====================================================

-- Replace multiple separate queries with single optimized function
CREATE OR REPLACE FUNCTION get_homepage_dashboard_stats(
    p_current_start TIMESTAMPTZ,
    p_current_end TIMESTAMPTZ,
    p_previous_start TIMESTAMPTZ,
    p_previous_end TIMESTAMPTZ
)
RETURNS TABLE (
    current_views BIGINT,
    previous_views BIGINT,
    current_sessions BIGINT,
    previous_sessions BIGINT,
    views_change NUMERIC,
    sessions_change NUMERIC,
    avg_session_duration NUMERIC,
    total_page_views BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH current_stats AS (
        SELECT 
            COUNT(*)::BIGINT as views,
            COUNT(DISTINCT session_id)::BIGINT as sessions,
            AVG(EXTRACT(EPOCH FROM (last_activity - first_visit)))::NUMERIC as avg_duration
        FROM homepage_sessions 
        WHERE first_visit BETWEEN p_current_start AND p_current_end
    ),
    previous_stats AS (
        SELECT 
            COUNT(*)::BIGINT as views,
            COUNT(DISTINCT session_id)::BIGINT as sessions
        FROM homepage_sessions 
        WHERE first_visit BETWEEN p_previous_start AND p_previous_end
    ),
    page_view_stats AS (
        SELECT COUNT(*)::BIGINT as total_views
        FROM homepage_page_views
        WHERE view_timestamp BETWEEN p_current_start AND p_current_end
    )
    SELECT 
        c.views,
        p.views,
        c.sessions,
        p.sessions,
        CASE WHEN p.views > 0 THEN 
            ROUND(((c.views - p.views)::NUMERIC / p.views * 100), 2) 
            ELSE 0 
        END,
        CASE WHEN p.sessions > 0 THEN 
            ROUND(((c.sessions - p.sessions)::NUMERIC / p.sessions * 100), 2) 
            ELSE 0 
        END,
        COALESCE(c.avg_duration, 0),
        pv.total_views
    FROM current_stats c, previous_stats p, page_view_stats pv;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 2. GEOGRAPHIC ANALYTICS OPTIMIZATION FUNCTION
-- =====================================================

-- Optimized function for country-based visitor analytics
CREATE OR REPLACE FUNCTION get_visitors_by_country(
    p_start_date TIMESTAMPTZ,
    p_end_date TIMESTAMPTZ,
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    country_code TEXT,
    visitor_count BIGINT,
    percentage NUMERIC,
    country_name TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH country_stats AS (
        SELECT 
            pv.country_code,
            COUNT(DISTINCT s.session_id) as visitors
        FROM homepage_sessions s
        JOIN homepage_page_views pv ON s.session_id = pv.session_id
        WHERE s.first_visit BETWEEN p_start_date AND p_end_date
            AND pv.country_code IS NOT NULL
        GROUP BY pv.country_code
    ),
    total_visitors AS (
        SELECT SUM(visitors) as total FROM country_stats
    ),
    country_names AS (
        SELECT 
            'US' as code, 'United States' as name
        UNION ALL SELECT 'CA', 'Canada'
        UNION ALL SELECT 'GB', 'United Kingdom'
        UNION ALL SELECT 'DE', 'Germany'
        UNION ALL SELECT 'FR', 'France'
        UNION ALL SELECT 'AU', 'Australia'
        UNION ALL SELECT 'JP', 'Japan'
        UNION ALL SELECT 'BR', 'Brazil'
        UNION ALL SELECT 'IN', 'India'
        UNION ALL SELECT 'MX', 'Mexico'
    )
    SELECT 
        cs.country_code,
        cs.visitors,
        ROUND((cs.visitors::NUMERIC / tv.total * 100), 2),
        COALESCE(cn.name, cs.country_code)
    FROM country_stats cs, total_visitors tv
    LEFT JOIN country_names cn ON cs.country_code = cn.code
    ORDER BY cs.visitors DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 3. CITY ANALYTICS OPTIMIZATION FUNCTION
-- =====================================================

-- Optimized function for city-based visitor analytics (North America focus)
CREATE OR REPLACE FUNCTION get_visitors_by_city(
    p_start_date TIMESTAMPTZ,
    p_end_date TIMESTAMPTZ,
    p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
    city TEXT,
    country_code TEXT,
    region TEXT,
    visitor_count BIGINT,
    percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    WITH city_stats AS (
        SELECT 
            pv.city,
            pv.country_code,
            pv.region,
            COUNT(DISTINCT s.session_id) as visitors
        FROM homepage_sessions s
        JOIN homepage_page_views pv ON s.session_id = pv.session_id
        WHERE s.first_visit BETWEEN p_start_date AND p_end_date
            AND pv.city IS NOT NULL
            AND pv.country_code IN ('US', 'CA', 'MX')
        GROUP BY pv.city, pv.country_code, pv.region
    ),
    total_visitors AS (
        SELECT SUM(visitors) as total FROM city_stats
    )
    SELECT 
        cs.city,
        cs.country_code,
        cs.region,
        cs.visitors,
        ROUND((cs.visitors::NUMERIC / tv.total * 100), 2)
    FROM city_stats cs, total_visitors tv
    ORDER BY cs.visitors DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
