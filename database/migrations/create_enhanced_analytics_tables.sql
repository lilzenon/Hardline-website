-- Enhanced Analytics System Database Migration
-- This migration creates the necessary tables for the industry-standard analytics system

-- Create analytics_events table for custom event tracking
CREATE TABLE IF NOT EXISTS analytics_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_name VARCHAR(255) NOT NULL,
    properties JSONB DEFAULT '{}',
    session_id VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT NOW(),
    
    -- Indexes for performance
    INDEX idx_analytics_events_user_id (user_id),
    INDEX idx_analytics_events_timestamp (timestamp),
    INDEX idx_analytics_events_session_id (session_id),
    INDEX idx_analytics_events_event_name (event_name)
);

-- Create performance_metrics table for Core Web Vitals and performance tracking
CREATE TABLE IF NOT EXISTS performance_metrics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,3) NOT NULL,
    tags JSONB DEFAULT '{}',
    timestamp TIMESTAMP DEFAULT NOW(),
    
    -- Indexes for performance
    INDEX idx_performance_metrics_user_id (user_id),
    INDEX idx_performance_metrics_timestamp (timestamp),
    INDEX idx_performance_metrics_metric_name (metric_name)
);

-- Enhance existing event_page_views table with additional analytics fields
-- (Only add columns if they don't exist)
ALTER TABLE event_page_views 
ADD COLUMN IF NOT EXISTS utm_source VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_medium VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_campaign VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_term VARCHAR(255),
ADD COLUMN IF NOT EXISTS utm_content VARCHAR(255),
ADD COLUMN IF NOT EXISTS referrer TEXT,
ADD COLUMN IF NOT EXISTS device_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS browser VARCHAR(100),
ADD COLUMN IF NOT EXISTS os VARCHAR(100),
ADD COLUMN IF NOT EXISTS country_code VARCHAR(2),
ADD COLUMN IF NOT EXISTS region VARCHAR(100),
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS load_time INTEGER,
ADD COLUMN IF NOT EXISTS page_size INTEGER,
ADD COLUMN IF NOT EXISTS scroll_depth INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS time_on_page INTEGER DEFAULT 0;

-- Create user_sessions table for session tracking
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    first_visit TIMESTAMP DEFAULT NOW(),
    last_activity TIMESTAMP DEFAULT NOW(),
    page_views INTEGER DEFAULT 1,
    total_time INTEGER DEFAULT 0,
    converted BOOLEAN DEFAULT FALSE,
    conversion_event VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    device_type VARCHAR(50),
    browser VARCHAR(100),
    os VARCHAR(100),
    country_code VARCHAR(2),
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    
    -- Indexes for performance
    INDEX idx_user_sessions_session_id (session_id),
    INDEX idx_user_sessions_user_id (user_id),
    INDEX idx_user_sessions_first_visit (first_visit),
    INDEX idx_user_sessions_converted (converted)
);

-- Create analytics_cache table for caching computed metrics
CREATE TABLE IF NOT EXISTS analytics_cache (
    id SERIAL PRIMARY KEY,
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    cache_data JSONB NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    
    -- Index for cache lookups
    INDEX idx_analytics_cache_key (cache_key),
    INDEX idx_analytics_cache_expires (expires_at)
);

-- Create function to clean up expired cache entries
CREATE OR REPLACE FUNCTION cleanup_analytics_cache()
RETURNS void AS $$
BEGIN
    DELETE FROM analytics_cache WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create indexes on existing tables for better analytics performance
CREATE INDEX IF NOT EXISTS idx_events_user_id_active ON events(user_id, is_active);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
CREATE INDEX IF NOT EXISTS idx_links_user_id_visit_count ON links(user_id, visit_count);
CREATE INDEX IF NOT EXISTS idx_event_signups_event_id ON event_signups(event_id);
CREATE INDEX IF NOT EXISTS idx_event_signups_email ON event_signups(email);
CREATE INDEX IF NOT EXISTS idx_event_page_views_event_id_timestamp ON event_page_views(event_id, view_timestamp);

-- Create materialized view for dashboard analytics (optional, for performance)
CREATE MATERIALIZED VIEW IF NOT EXISTS dashboard_analytics_summary AS
SELECT 
    u.id as user_id,
    COUNT(DISTINCT e.id) as total_events,
    COUNT(DISTINCT CASE WHEN e.is_active THEN e.id END) as active_events,
    COUNT(DISTINCT l.id) as total_links,
    COALESCE(SUM(l.visit_count), 0) as total_clicks,
    COUNT(DISTINCT es.email) as total_unique_fans,
    COUNT(es.id) as total_signups,
    COUNT(DISTINCT epv.session_id) as unique_visitors_30d,
    COUNT(epv.id) as total_page_views_30d
FROM users u
LEFT JOIN events e ON u.id = e.user_id
LEFT JOIN links l ON u.id = l.user_id
LEFT JOIN event_signups es ON e.id = es.event_id
LEFT JOIN event_page_views epv ON e.id = epv.event_id 
    AND epv.view_timestamp >= NOW() - INTERVAL '30 days'
GROUP BY u.id;

-- Create unique index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_dashboard_analytics_summary_user_id 
ON dashboard_analytics_summary(user_id);

-- Create function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_dashboard_analytics()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY dashboard_analytics_summary;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE analytics_events IS 'Custom analytics events tracking user interactions and business metrics';
COMMENT ON TABLE performance_metrics IS 'Performance metrics including Core Web Vitals and technical metrics';
COMMENT ON TABLE user_sessions IS 'User session tracking for engagement and conversion analysis';
COMMENT ON TABLE analytics_cache IS 'Cache table for storing computed analytics metrics';
COMMENT ON MATERIALIZED VIEW dashboard_analytics_summary IS 'Pre-computed dashboard metrics for fast retrieval';

-- Grant permissions (adjust as needed for your user roles)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON analytics_events TO dashboard_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON performance_metrics TO dashboard_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON user_sessions TO dashboard_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON analytics_cache TO dashboard_user;
-- GRANT SELECT ON dashboard_analytics_summary TO dashboard_user;

-- Example queries for testing the new analytics system:

-- Get dashboard stats for a user
/*
SELECT 
    total_events,
    active_events,
    total_links,
    total_clicks,
    total_unique_fans,
    total_signups,
    unique_visitors_30d,
    total_page_views_30d,
    CASE 
        WHEN total_clicks > 0 THEN (total_signups::float / total_clicks * 100)
        ELSE 0 
    END as conversion_rate
FROM dashboard_analytics_summary 
WHERE user_id = 1;
*/

-- Get performance metrics summary
/*
SELECT 
    metric_name,
    AVG(metric_value) as avg_value,
    PERCENTILE_CONT(0.75) WITHIN GROUP (ORDER BY metric_value) as p75_value,
    COUNT(*) as sample_count
FROM performance_metrics 
WHERE user_id = 1 
AND timestamp >= NOW() - INTERVAL '30 days'
GROUP BY metric_name;
*/

-- Get traffic sources
/*
SELECT 
    COALESCE(utm_source, 'Direct') as source,
    COUNT(*) as visits,
    COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
FROM event_page_views epv
JOIN events e ON epv.event_id = e.id
WHERE e.user_id = 1
AND epv.view_timestamp >= NOW() - INTERVAL '30 days'
GROUP BY utm_source
ORDER BY visits DESC;
*/
