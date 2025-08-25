-- =====================================================
-- BOUNCE2BOUNCE Analytics Performance Optimization - Phase 3
-- Advanced Optimizations: Materialized Views & Partitioning
-- =====================================================
-- Date: 2025-01-25
-- Description: Implements materialized views and table partitioning for scale
-- Target: Support 10,000+ visitors/hour with sub-100ms query times
-- Dependency: Requires Phase 1 indexes and Phase 2 functions

-- =====================================================
-- PHASE 3: ADVANCED OPTIMIZATIONS
-- =====================================================

-- Enable timing for performance monitoring
\timing on

-- =====================================================
-- 1. MATERIALIZED VIEWS FOR DAILY ANALYTICS
-- =====================================================

-- Pre-computed daily analytics for fast dashboard loading
CREATE MATERIALIZED VIEW IF NOT EXISTS homepage_daily_stats AS
SELECT 
    DATE(s.first_visit) as date,
    COUNT(DISTINCT s.session_id) as unique_visitors,
    COUNT(pv.id) as total_page_views,
    COUNT(DISTINCT pv.country_code) as countries_reached,
    COUNT(DISTINCT pv.city) as cities_reached,
    AVG(EXTRACT(EPOCH FROM (s.last_activity - s.first_visit))) as avg_session_duration,
    COUNT(CASE WHEN pv.device_type = 'mobile' THEN 1 END) as mobile_visitors,
    COUNT(CASE WHEN pv.device_type = 'desktop' THEN 1 END) as desktop_visitors,
    COUNT(CASE WHEN pv.device_type = 'tablet' THEN 1 END) as tablet_visitors,
    COUNT(CASE WHEN s.origin IS NULL OR s.origin = '' THEN 1 END) as direct_visitors,
    COUNT(CASE WHEN s.origin LIKE '%google%' THEN 1 END) as search_visitors,
    COUNT(CASE WHEN s.origin LIKE '%facebook%' OR s.origin LIKE '%twitter%' OR s.origin LIKE '%instagram%' THEN 1 END) as social_visitors
FROM homepage_sessions s
LEFT JOIN homepage_page_views pv ON s.session_id = pv.session_id
WHERE s.first_visit >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY DATE(s.first_visit)
ORDER BY date DESC;

-- Unique index for fast lookups and concurrent refresh
CREATE UNIQUE INDEX IF NOT EXISTS idx_homepage_daily_stats_date 
ON homepage_daily_stats (date DESC);

-- =====================================================
-- 2. MATERIALIZED VIEWS FOR HOURLY ANALYTICS
-- =====================================================

-- Pre-computed hourly analytics for real-time monitoring
CREATE MATERIALIZED VIEW IF NOT EXISTS homepage_hourly_stats AS
SELECT 
    DATE_TRUNC('hour', s.first_visit) as hour,
    COUNT(DISTINCT s.session_id) as unique_visitors,
    COUNT(pv.id) as total_page_views,
    COUNT(DISTINCT pv.ip_address) as unique_ips,
    AVG(EXTRACT(EPOCH FROM (s.last_activity - s.first_visit))) as avg_session_duration
FROM homepage_sessions s
LEFT JOIN homepage_page_views pv ON s.session_id = pv.session_id
WHERE s.first_visit >= CURRENT_TIMESTAMP - INTERVAL '7 days'
GROUP BY DATE_TRUNC('hour', s.first_visit)
ORDER BY hour DESC;

-- Unique index for fast lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_homepage_hourly_stats_hour 
ON homepage_hourly_stats (hour DESC);

-- =====================================================
-- 3. TABLE PARTITIONING FOR SCALE
-- =====================================================

-- Check if partitioning is supported and create partitioned tables
DO $$
DECLARE
    partition_support BOOLEAN;
BEGIN
    -- Check PostgreSQL version for partitioning support
    SELECT version() LIKE '%PostgreSQL 1[0-9]%' OR version() LIKE '%PostgreSQL [2-9][0-9]%' INTO partition_support;
    
    IF partition_support THEN
        RAISE NOTICE 'PostgreSQL supports partitioning, creating partitioned tables...';
        
        -- Create partitioned homepage_page_views table (by month)
        EXECUTE '
        CREATE TABLE IF NOT EXISTS homepage_page_views_partitioned (
            LIKE homepage_page_views INCLUDING ALL
        ) PARTITION BY RANGE (view_timestamp)';
        
        -- Create current month partition
        EXECUTE format('
        CREATE TABLE IF NOT EXISTS homepage_page_views_%s PARTITION OF homepage_page_views_partitioned
            FOR VALUES FROM (%L) TO (%L)',
            to_char(CURRENT_DATE, 'YYYY_MM'),
            date_trunc(''month'', CURRENT_DATE),
            date_trunc(''month'', CURRENT_DATE) + INTERVAL ''1 month''
        );
        
        -- Create next month partition
        EXECUTE format('
        CREATE TABLE IF NOT EXISTS homepage_page_views_%s PARTITION OF homepage_page_views_partitioned
            FOR VALUES FROM (%L) TO (%L)',
            to_char(CURRENT_DATE + INTERVAL ''1 month'', 'YYYY_MM'),
            date_trunc(''month'', CURRENT_DATE) + INTERVAL ''1 month'',
            date_trunc(''month'', CURRENT_DATE) + INTERVAL ''2 months''
        );
        
        RAISE NOTICE 'Partitioned tables created successfully';
    ELSE
        RAISE NOTICE 'PostgreSQL version does not support partitioning, skipping...';
    END IF;
END $$;

-- =====================================================
-- 4. AUTOMATED MAINTENANCE PROCEDURES
-- =====================================================

-- Function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_analytics_materialized_views()
RETURNS TEXT AS $$
DECLARE
    start_time TIMESTAMPTZ;
    end_time TIMESTAMPTZ;
    result_text TEXT := '';
BEGIN
    -- Refresh daily stats
    start_time := clock_timestamp();
    REFRESH MATERIALIZED VIEW CONCURRENTLY homepage_daily_stats;
    end_time := clock_timestamp();
    result_text := result_text || format('Daily stats refreshed in %sms. ', 
        EXTRACT(MILLISECONDS FROM (end_time - start_time))::INTEGER);
    
    -- Refresh hourly stats
    start_time := clock_timestamp();
    REFRESH MATERIALIZED VIEW CONCURRENTLY homepage_hourly_stats;
    end_time := clock_timestamp();
    result_text := result_text || format('Hourly stats refreshed in %sms. ', 
        EXTRACT(MILLISECONDS FROM (end_time - start_time))::INTEGER);
    
    RETURN result_text || 'All materialized views refreshed successfully.';
END;
$$ LANGUAGE plpgsql;

-- Function to create monthly partitions automatically
CREATE OR REPLACE FUNCTION create_monthly_partition()
RETURNS TEXT AS $$
DECLARE
    start_date DATE;
    end_date DATE;
    table_name TEXT;
    partition_exists BOOLEAN;
BEGIN
    -- Calculate next month
    start_date := date_trunc('month', CURRENT_DATE + INTERVAL '1 month');
    end_date := start_date + INTERVAL '1 month';
    table_name := 'homepage_page_views_' || to_char(start_date, 'YYYY_MM');
    
    -- Check if partition already exists
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = table_name
    ) INTO partition_exists;
    
    IF NOT partition_exists THEN
        EXECUTE format('CREATE TABLE %I PARTITION OF homepage_page_views_partitioned
                        FOR VALUES FROM (%L) TO (%L)', 
                       table_name, start_date, end_date);
        RETURN format('Created partition %s for period %s to %s', table_name, start_date, end_date);
    ELSE
        RETURN format('Partition %s already exists', table_name);
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up old partitions (keep 12 months)
CREATE OR REPLACE FUNCTION cleanup_old_partitions()
RETURNS TEXT AS $$
DECLARE
    cutoff_date DATE;
    partition_record RECORD;
    dropped_count INTEGER := 0;
BEGIN
    cutoff_date := CURRENT_DATE - INTERVAL '12 months';
    
    FOR partition_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE tablename LIKE 'homepage_page_views_____' 
        AND schemaname = 'public'
    LOOP
        -- Extract date from partition name and check if it's old
        IF to_date(substring(partition_record.tablename from 21), 'YYYY_MM') < cutoff_date THEN
            EXECUTE format('DROP TABLE IF EXISTS %I', partition_record.tablename);
            dropped_count := dropped_count + 1;
        END IF;
    END LOOP;
    
    RETURN format('Cleaned up %s old partitions older than %s', dropped_count, cutoff_date);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 5. ANALYTICS AGGREGATION FUNCTIONS
-- =====================================================

-- Function to get fast daily stats from materialized view
CREATE OR REPLACE FUNCTION get_daily_analytics_fast(
    p_days INTEGER DEFAULT 30
)
RETURNS TABLE (
    date DATE,
    unique_visitors BIGINT,
    total_page_views BIGINT,
    avg_session_duration NUMERIC,
    mobile_percentage NUMERIC,
    desktop_percentage NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        ds.date,
        ds.unique_visitors,
        ds.total_page_views,
        ROUND(ds.avg_session_duration, 2),
        ROUND((ds.mobile_visitors::NUMERIC / NULLIF(ds.unique_visitors, 0) * 100), 2),
        ROUND((ds.desktop_visitors::NUMERIC / NULLIF(ds.unique_visitors, 0) * 100), 2)
    FROM homepage_daily_stats ds
    WHERE ds.date >= CURRENT_DATE - p_days
    ORDER BY ds.date DESC
    LIMIT p_days;
END;
$$ LANGUAGE plpgsql;

-- Function to get real-time hourly stats
CREATE OR REPLACE FUNCTION get_hourly_analytics_fast(
    p_hours INTEGER DEFAULT 24
)
RETURNS TABLE (
    hour TIMESTAMPTZ,
    unique_visitors BIGINT,
    total_page_views BIGINT,
    visitors_per_hour NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        hs.hour,
        hs.unique_visitors,
        hs.total_page_views,
        hs.unique_visitors::NUMERIC
    FROM homepage_hourly_stats hs
    WHERE hs.hour >= CURRENT_TIMESTAMP - (p_hours || ' hours')::INTERVAL
    ORDER BY hs.hour DESC
    LIMIT p_hours;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. PERFORMANCE MONITORING AND MAINTENANCE
-- =====================================================

-- Function to analyze table sizes and recommend optimizations
CREATE OR REPLACE FUNCTION analyze_analytics_performance()
RETURNS TABLE (
    table_name TEXT,
    table_size TEXT,
    index_size TEXT,
    row_count BIGINT,
    recommendation TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH table_stats AS (
        SELECT
            t.table_name,
            pg_size_pretty(pg_total_relation_size(t.table_name::regclass)) as total_size,
            pg_size_pretty(pg_indexes_size(t.table_name::regclass)) as idx_size,
            (SELECT reltuples::BIGINT FROM pg_class WHERE relname = t.table_name) as rows
        FROM information_schema.tables t
        WHERE t.table_schema = 'public'
        AND t.table_name IN ('homepage_sessions', 'homepage_page_views', 'homepage_daily_stats', 'homepage_hourly_stats')
    )
    SELECT
        ts.table_name,
        ts.total_size,
        ts.idx_size,
        ts.rows,
        CASE
            WHEN ts.rows > 1000000 THEN 'Consider partitioning'
            WHEN ts.rows > 100000 THEN 'Monitor growth, optimize queries'
            WHEN ts.rows > 10000 THEN 'Good size, maintain indexes'
            ELSE 'Small table, no optimization needed'
        END
    FROM table_stats ts
    ORDER BY ts.rows DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to run all maintenance tasks
CREATE OR REPLACE FUNCTION run_analytics_maintenance()
RETURNS TEXT AS $$
DECLARE
    start_time TIMESTAMPTZ;
    end_time TIMESTAMPTZ;
    duration INTEGER;
    result_msg TEXT := '';
    refresh_result TEXT;
    partition_result TEXT;
    cleanup_result TEXT;
BEGIN
    -- Refresh materialized views
    start_time := clock_timestamp();
    SELECT refresh_analytics_materialized_views() INTO refresh_result;
    end_time := clock_timestamp();
    duration := EXTRACT(MILLISECONDS FROM (end_time - start_time))::INTEGER;

    result_msg := result_msg || refresh_result || ' ';

    -- Create monthly partitions
    start_time := clock_timestamp();
    SELECT create_monthly_partition() INTO partition_result;
    end_time := clock_timestamp();

    result_msg := result_msg || partition_result || ' ';

    -- Cleanup old partitions
    start_time := clock_timestamp();
    SELECT cleanup_old_partitions() INTO cleanup_result;
    end_time := clock_timestamp();

    result_msg := result_msg || cleanup_result;

    RETURN result_msg;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Phase 3 Advanced Optimizations Complete!';
    RAISE NOTICE '📊 Created materialized views for fast analytics';
    RAISE NOTICE '🗂️ Set up table partitioning for scale';
    RAISE NOTICE '🔧 Created automated maintenance procedures';
    RAISE NOTICE '⚡ Run SELECT run_analytics_maintenance(); to test maintenance';
    RAISE NOTICE '🚀 Ready for Phase 4: Connection Pool Optimization';
END $$;
