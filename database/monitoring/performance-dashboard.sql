-- PostgreSQL Performance Monitoring Dashboard
-- KUTT B2B Application Database Performance Tracking
-- 
-- This file contains views and functions for monitoring database performance
-- after optimization implementation.

-- =====================================================
-- PERFORMANCE MONITORING VIEWS
-- =====================================================

-- Real-time query performance monitoring
CREATE OR REPLACE VIEW query_performance_monitor AS
SELECT 
    LEFT(query, 100) as query_preview,
    calls,
    total_exec_time,
    mean_exec_time,
    max_exec_time,
    min_exec_time,
    stddev_exec_time,
    rows,
    100.0 * shared_blks_hit / NULLIF(shared_blks_hit + shared_blks_read, 0) AS hit_percent,
    100.0 * local_blks_hit / NULLIF(local_blks_hit + local_blks_read, 0) AS local_hit_percent,
    100.0 * temp_blks_read / NULLIF(temp_blks_read + temp_blks_written, 0) AS temp_read_percent
FROM pg_stat_statements 
WHERE calls > 5
ORDER BY total_exec_time DESC;

-- Index usage effectiveness
CREATE OR REPLACE VIEW index_usage_monitor AS
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size,
    pg_relation_size(indexrelid) as size_bytes,
    CASE 
        WHEN idx_scan = 0 THEN 'UNUSED'
        WHEN idx_scan < 10 THEN 'RARELY_USED'
        WHEN idx_scan < 100 THEN 'MODERATELY_USED'
        ELSE 'FREQUENTLY_USED'
    END as usage_category,
    ROUND(
        CASE 
            WHEN idx_scan > 0 THEN pg_relation_size(indexrelid)::numeric / idx_scan
            ELSE pg_relation_size(indexrelid)::numeric
        END, 2
    ) as bytes_per_scan
FROM pg_stat_user_indexes 
ORDER BY pg_relation_size(indexrelid) DESC;

-- Table performance statistics
CREATE OR REPLACE VIEW table_performance_monitor AS
SELECT 
    schemaname,
    tablename,
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes,
    n_tup_hot_upd as hot_updates,
    seq_scan,
    seq_tup_read,
    idx_scan,
    idx_tup_fetch,
    CASE 
        WHEN seq_scan + idx_scan > 0 
        THEN ROUND(100.0 * idx_scan / (seq_scan + idx_scan), 2)
        ELSE 0 
    END as index_usage_percent,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(
        pg_total_relation_size(schemaname||'.'||tablename) - 
        pg_relation_size(schemaname||'.'||tablename)
    ) as index_size,
    last_vacuum,
    last_autovacuum,
    last_analyze,
    last_autoanalyze
FROM pg_stat_user_tables 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Connection and activity monitoring
CREATE OR REPLACE VIEW connection_monitor AS
SELECT 
    state,
    COUNT(*) as connection_count,
    ROUND(AVG(EXTRACT(epoch FROM now() - state_change)), 2) as avg_duration_seconds,
    MAX(EXTRACT(epoch FROM now() - state_change)) as max_duration_seconds,
    MIN(EXTRACT(epoch FROM now() - state_change)) as min_duration_seconds
FROM pg_stat_activity 
WHERE state IS NOT NULL
GROUP BY state
ORDER BY connection_count DESC;

-- Cache hit ratio monitoring
CREATE OR REPLACE VIEW cache_hit_monitor AS
SELECT 
    'Index Hit Rate' as metric,
    ROUND(
        100.0 * SUM(idx_blks_hit) / NULLIF(SUM(idx_blks_hit + idx_blks_read), 0), 
        2
    ) as hit_rate_percent,
    SUM(idx_blks_hit) as cache_hits,
    SUM(idx_blks_read) as disk_reads,
    'Should be > 95%' as target
FROM pg_statio_user_indexes
UNION ALL
SELECT 
    'Table Hit Rate' as metric,
    ROUND(
        100.0 * SUM(heap_blks_hit) / NULLIF(SUM(heap_blks_hit + heap_blks_read), 0), 
        2
    ) as hit_rate_percent,
    SUM(heap_blks_hit) as cache_hits,
    SUM(heap_blks_read) as disk_reads,
    'Should be > 95%' as target
FROM pg_statio_user_tables;

-- Lock monitoring
CREATE OR REPLACE VIEW lock_monitor AS
SELECT 
    pg_class.relname as table_name,
    pg_locks.locktype,
    pg_locks.mode,
    pg_locks.granted,
    COUNT(*) as lock_count,
    STRING_AGG(DISTINCT pg_stat_activity.state, ', ') as states,
    MAX(EXTRACT(epoch FROM now() - pg_stat_activity.state_change)) as max_lock_duration
FROM pg_locks
JOIN pg_class ON pg_locks.relation = pg_class.oid
LEFT JOIN pg_stat_activity ON pg_locks.pid = pg_stat_activity.pid
WHERE pg_class.relkind = 'r'
GROUP BY pg_class.relname, pg_locks.locktype, pg_locks.mode, pg_locks.granted
ORDER BY lock_count DESC, max_lock_duration DESC;

-- =====================================================
-- OPTIMIZATION IMPACT TRACKING
-- =====================================================

-- Before/after comparison view
CREATE OR REPLACE VIEW optimization_impact AS
WITH current_stats AS (
    SELECT 
        'current' as period,
        COUNT(*) as total_queries,
        ROUND(AVG(mean_exec_time), 2) as avg_query_time,
        ROUND(MAX(mean_exec_time), 2) as max_query_time,
        SUM(calls) as total_calls,
        ROUND(SUM(total_exec_time), 2) as total_exec_time
    FROM pg_stat_statements
    WHERE calls > 5
)
SELECT 
    period,
    total_queries,
    avg_query_time,
    max_query_time,
    total_calls,
    total_exec_time,
    CASE 
        WHEN avg_query_time < 50 THEN 'EXCELLENT'
        WHEN avg_query_time < 100 THEN 'GOOD'
        WHEN avg_query_time < 200 THEN 'FAIR'
        ELSE 'NEEDS_ATTENTION'
    END as performance_grade
FROM current_stats;

-- Critical query performance tracking
CREATE OR REPLACE VIEW critical_queries_monitor AS
SELECT 
    'Recent Popular Links' as query_type,
    calls,
    ROUND(mean_exec_time, 2) as avg_time_ms,
    ROUND(total_exec_time, 2) as total_time_ms,
    rows,
    100.0 * shared_blks_hit / NULLIF(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
WHERE query ILIKE '%links%created_at%interval%visit_count%'
    AND calls > 1
UNION ALL
SELECT 
    'Visit Analytics' as query_type,
    calls,
    ROUND(mean_exec_time, 2) as avg_time_ms,
    ROUND(total_exec_time, 2) as total_time_ms,
    rows,
    100.0 * shared_blks_hit / NULLIF(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
WHERE query ILIKE '%visits%join%links%created_at%'
    AND calls > 1
UNION ALL
SELECT 
    'User Activity' as query_type,
    calls,
    ROUND(mean_exec_time, 2) as avg_time_ms,
    ROUND(total_exec_time, 2) as total_time_ms,
    rows,
    100.0 * shared_blks_hit / NULLIF(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
WHERE query ILIKE '%users%last_activity%engagement%'
    AND calls > 1;

-- =====================================================
-- ALERTING FUNCTIONS
-- =====================================================

-- Function to check for performance issues
CREATE OR REPLACE FUNCTION check_performance_alerts()
RETURNS TABLE(
    alert_type TEXT,
    severity TEXT,
    message TEXT,
    current_value NUMERIC,
    threshold NUMERIC
) AS $$
BEGIN
    -- Check for slow queries
    RETURN QUERY
    SELECT 
        'SLOW_QUERY'::TEXT as alert_type,
        'HIGH'::TEXT as severity,
        'Query exceeds 1000ms average execution time'::TEXT as message,
        mean_exec_time as current_value,
        1000.0 as threshold
    FROM pg_stat_statements 
    WHERE mean_exec_time > 1000 AND calls > 5;
    
    -- Check for low cache hit rates
    RETURN QUERY
    SELECT 
        'LOW_CACHE_HIT'::TEXT as alert_type,
        'MEDIUM'::TEXT as severity,
        'Index cache hit rate below 95%'::TEXT as message,
        ROUND(
            100.0 * SUM(idx_blks_hit) / NULLIF(SUM(idx_blks_hit + idx_blks_read), 0), 
            2
        ) as current_value,
        95.0 as threshold
    FROM pg_statio_user_indexes
    HAVING ROUND(
        100.0 * SUM(idx_blks_hit) / NULLIF(SUM(idx_blks_hit + idx_blks_read), 0), 
        2
    ) < 95;
    
    -- Check for unused indexes
    RETURN QUERY
    SELECT 
        'UNUSED_INDEX'::TEXT as alert_type,
        'LOW'::TEXT as severity,
        'Large unused index detected: ' || indexname as message,
        pg_relation_size(indexrelid)::NUMERIC as current_value,
        10485760.0 as threshold -- 10MB
    FROM pg_stat_user_indexes 
    WHERE idx_scan = 0 
        AND pg_relation_size(indexrelid) > 10485760; -- 10MB
    
    -- Check for excessive sequential scans
    RETURN QUERY
    SELECT 
        'EXCESSIVE_SEQ_SCAN'::TEXT as alert_type,
        'MEDIUM'::TEXT as severity,
        'Table has high sequential scan ratio: ' || tablename as message,
        CASE 
            WHEN seq_scan + idx_scan > 0 
            THEN ROUND(100.0 * seq_scan / (seq_scan + idx_scan), 2)
            ELSE 0 
        END as current_value,
        50.0 as threshold
    FROM pg_stat_user_tables 
    WHERE seq_scan + idx_scan > 100
        AND CASE 
            WHEN seq_scan + idx_scan > 0 
            THEN 100.0 * seq_scan / (seq_scan + idx_scan)
            ELSE 0 
        END > 50;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- MAINTENANCE FUNCTIONS
-- =====================================================

-- Function to reset statistics (for clean monitoring)
CREATE OR REPLACE FUNCTION reset_performance_stats()
RETURNS void AS $$
BEGIN
    -- Reset pg_stat_statements
    SELECT pg_stat_statements_reset();
    
    -- Reset table and index statistics
    SELECT pg_stat_reset();
    
    RAISE NOTICE 'Performance statistics reset successfully';
END;
$$ LANGUAGE plpgsql;

-- Function to generate performance report
CREATE OR REPLACE FUNCTION generate_performance_report()
RETURNS TEXT AS $$
DECLARE
    report TEXT := '';
    rec RECORD;
BEGIN
    report := report || E'PostgreSQL Performance Report\n';
    report := report || E'Generated: ' || NOW() || E'\n';
    report := report || E'================================\n\n';
    
    -- Cache hit rates
    report := report || E'CACHE HIT RATES:\n';
    FOR rec IN SELECT * FROM cache_hit_monitor LOOP
        report := report || rec.metric || ': ' || rec.hit_rate_percent || '%' || E'\n';
    END LOOP;
    report := report || E'\n';
    
    -- Top slow queries
    report := report || E'TOP 5 SLOWEST QUERIES:\n';
    FOR rec IN 
        SELECT query_preview, mean_exec_time, calls 
        FROM query_performance_monitor 
        ORDER BY mean_exec_time DESC 
        LIMIT 5 
    LOOP
        report := report || rec.query_preview || ' (' || rec.mean_exec_time || 'ms, ' || rec.calls || ' calls)' || E'\n';
    END LOOP;
    report := report || E'\n';
    
    -- Performance alerts
    report := report || E'PERFORMANCE ALERTS:\n';
    FOR rec IN SELECT * FROM check_performance_alerts() LOOP
        report := report || '[' || rec.severity || '] ' || rec.alert_type || ': ' || rec.message || E'\n';
    END LOOP;
    
    RETURN report;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- SCHEDULED MONITORING SETUP
-- =====================================================

-- Create monitoring log table
CREATE TABLE IF NOT EXISTS performance_monitoring_log (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    metric_type VARCHAR(50) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value NUMERIC,
    threshold_value NUMERIC,
    status VARCHAR(20), -- 'OK', 'WARNING', 'CRITICAL'
    details JSONB
);

-- Index for monitoring log
CREATE INDEX IF NOT EXISTS perf_log_timestamp_idx ON performance_monitoring_log (timestamp DESC);
CREATE INDEX IF NOT EXISTS perf_log_metric_idx ON performance_monitoring_log (metric_type, metric_name);

-- Function to log performance metrics
CREATE OR REPLACE FUNCTION log_performance_metrics()
RETURNS void AS $$
DECLARE
    rec RECORD;
BEGIN
    -- Log cache hit rates
    FOR rec IN SELECT * FROM cache_hit_monitor LOOP
        INSERT INTO performance_monitoring_log (
            metric_type, metric_name, metric_value, threshold_value, status
        ) VALUES (
            'CACHE_HIT_RATE',
            rec.metric,
            rec.hit_rate_percent,
            95.0,
            CASE WHEN rec.hit_rate_percent >= 95 THEN 'OK' ELSE 'WARNING' END
        );
    END LOOP;
    
    -- Log performance alerts
    FOR rec IN SELECT * FROM check_performance_alerts() LOOP
        INSERT INTO performance_monitoring_log (
            metric_type, metric_name, metric_value, threshold_value, status, details
        ) VALUES (
            'PERFORMANCE_ALERT',
            rec.alert_type,
            rec.current_value,
            rec.threshold,
            rec.severity,
            jsonb_build_object('message', rec.message)
        );
    END LOOP;
    
    RAISE NOTICE 'Performance metrics logged successfully';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- USAGE EXAMPLES
-- =====================================================

/*
-- Monitor current performance
SELECT * FROM query_performance_monitor LIMIT 10;
SELECT * FROM index_usage_monitor WHERE usage_category = 'UNUSED';
SELECT * FROM table_performance_monitor WHERE index_usage_percent < 50;

-- Check for alerts
SELECT * FROM check_performance_alerts();

-- Generate report
SELECT generate_performance_report();

-- Log current metrics
SELECT log_performance_metrics();

-- View recent monitoring data
SELECT * FROM performance_monitoring_log 
WHERE timestamp > NOW() - INTERVAL '1 hour'
ORDER BY timestamp DESC;
*/
