-- Migration: Schema Optimization & Normalization
-- Priority: MEDIUM (Long-term performance and maintainability)
-- Estimated Time: 30-45 minutes
-- Risk Level: MEDIUM (Schema changes require careful testing)

-- =====================================================
-- PHASE 1: CREATE LOOKUP TABLES
-- =====================================================

-- Color Palettes: Normalize repeated color combinations in events
CREATE TABLE color_palettes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    background_color VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    text_color VARCHAR(7) NOT NULL DEFAULT '#000000',
    button_color VARCHAR(7) NOT NULL DEFAULT '#007bff',
    title_color VARCHAR(7) NOT NULL DEFAULT '#000000',
    description_color VARCHAR(7) NOT NULL DEFAULT '#666666',
    card_color VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    button_text_color VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert common color palettes
INSERT INTO color_palettes (name, background_color, text_color, button_color, title_color, description_color, card_color, button_text_color) VALUES
('Default Light', '#ffffff', '#000000', '#007bff', '#000000', '#666666', '#ffffff', '#ffffff'),
('Dark Theme', '#1a1a1a', '#ffffff', '#0d6efd', '#ffffff', '#cccccc', '#2d2d2d', '#ffffff'),
('Blue Ocean', '#e3f2fd', '#1565c0', '#1976d2', '#0d47a1', '#1565c0', '#ffffff', '#ffffff'),
('Green Nature', '#e8f5e8', '#2e7d32', '#4caf50', '#1b5e20', '#2e7d32', '#ffffff', '#ffffff'),
('Purple Gradient', '#f3e5f5', '#7b1fa2', '#9c27b0', '#4a148c', '#7b1fa2', '#ffffff', '#ffffff'),
('Orange Sunset', '#fff3e0', '#ef6c00', '#ff9800', '#e65100', '#ef6c00', '#ffffff', '#ffffff');

-- Device Types: Normalize device information
CREATE TABLE device_types (
    id SERIAL PRIMARY KEY,
    category VARCHAR(20) NOT NULL, -- 'browser', 'os', 'device'
    name VARCHAR(50) NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    icon_class VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(category, name)
);

-- Insert device types
INSERT INTO device_types (category, name, display_name, icon_class) VALUES
-- Browsers
('browser', 'chrome', 'Google Chrome', 'fab fa-chrome'),
('browser', 'firefox', 'Mozilla Firefox', 'fab fa-firefox'),
('browser', 'safari', 'Safari', 'fab fa-safari'),
('browser', 'edge', 'Microsoft Edge', 'fab fa-edge'),
('browser', 'opera', 'Opera', 'fab fa-opera'),
('browser', 'ie', 'Internet Explorer', 'fab fa-internet-explorer'),
('browser', 'other', 'Other Browser', 'fas fa-globe'),
-- Operating Systems
('os', 'windows', 'Windows', 'fab fa-windows'),
('os', 'macos', 'macOS', 'fab fa-apple'),
('os', 'linux', 'Linux', 'fab fa-linux'),
('os', 'android', 'Android', 'fab fa-android'),
('os', 'ios', 'iOS', 'fab fa-apple'),
('os', 'other', 'Other OS', 'fas fa-desktop');

-- Countries: Normalize country data
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    code VARCHAR(2) UNIQUE NOT NULL, -- ISO 3166-1 alpha-2
    name VARCHAR(100) NOT NULL,
    continent VARCHAR(20),
    timezone_primary VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert major countries (sample)
INSERT INTO countries (code, name, continent, timezone_primary) VALUES
('US', 'United States', 'North America', 'America/New_York'),
('CA', 'Canada', 'North America', 'America/Toronto'),
('GB', 'United Kingdom', 'Europe', 'Europe/London'),
('DE', 'Germany', 'Europe', 'Europe/Berlin'),
('FR', 'France', 'Europe', 'Europe/Paris'),
('JP', 'Japan', 'Asia', 'Asia/Tokyo'),
('AU', 'Australia', 'Oceania', 'Australia/Sydney'),
('BR', 'Brazil', 'South America', 'America/Sao_Paulo'),
('IN', 'India', 'Asia', 'Asia/Kolkata'),
('CN', 'China', 'Asia', 'Asia/Shanghai');

-- =====================================================
-- PHASE 2: EXTRACT FREQUENTLY QUERIED JSON FIELDS
-- =====================================================

-- Add extracted fields to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS country_code VARCHAR(2) REFERENCES countries(code),
ADD COLUMN IF NOT EXISTS timezone VARCHAR(50),
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS notification_email BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS notification_sms BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS theme_preference VARCHAR(20) DEFAULT 'light';

-- Extract data from JSON columns
UPDATE users SET 
    country_code = CASE 
        WHEN location_data->>'country' IS NOT NULL 
        THEN UPPER(LEFT(location_data->>'country', 2))
        ELSE NULL 
    END,
    timezone = preferences->>'timezone',
    city = location_data->>'city',
    notification_email = COALESCE((preferences->>'email_notifications')::boolean, true),
    notification_sms = COALESCE((preferences->>'sms_notifications')::boolean, false),
    theme_preference = COALESCE(preferences->>'theme', 'light')
WHERE location_data IS NOT NULL OR preferences IS NOT NULL;

-- Add extracted fields to events table
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS color_palette_id INTEGER REFERENCES color_palettes(id),
ADD COLUMN IF NOT EXISTS country_code VARCHAR(2) REFERENCES countries(code),
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS venue_name VARCHAR(200);

-- Extract address data from JSON
UPDATE events SET 
    country_code = CASE 
        WHEN address_data->>'country' IS NOT NULL 
        THEN UPPER(LEFT(address_data->>'country', 2))
        ELSE NULL 
    END,
    city = address_data->>'city',
    venue_name = address_data->>'venue_name'
WHERE address_data IS NOT NULL;

-- =====================================================
-- PHASE 3: OPTIMIZE VISITS TABLE STRUCTURE
-- =====================================================

-- Create normalized visit_stats table for better analytics
CREATE TABLE visit_stats (
    id SERIAL PRIMARY KEY,
    link_id INTEGER NOT NULL REFERENCES links(id) ON DELETE CASCADE,
    date_bucket DATE NOT NULL, -- Daily aggregation
    total_visits INTEGER DEFAULT 0,
    unique_visits INTEGER DEFAULT 0,
    
    -- Browser stats (normalized)
    chrome_visits INTEGER DEFAULT 0,
    firefox_visits INTEGER DEFAULT 0,
    safari_visits INTEGER DEFAULT 0,
    edge_visits INTEGER DEFAULT 0,
    other_browser_visits INTEGER DEFAULT 0,
    
    -- OS stats (normalized)
    windows_visits INTEGER DEFAULT 0,
    macos_visits INTEGER DEFAULT 0,
    linux_visits INTEGER DEFAULT 0,
    android_visits INTEGER DEFAULT 0,
    ios_visits INTEGER DEFAULT 0,
    other_os_visits INTEGER DEFAULT 0,
    
    -- Geographic data (normalized)
    top_countries JSONB, -- Top 5 countries for the day
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(link_id, date_bucket)
);

-- Index for visit_stats
CREATE INDEX visit_stats_link_date_idx ON visit_stats (link_id, date_bucket DESC);
CREATE INDEX visit_stats_date_visits_idx ON visit_stats (date_bucket DESC, total_visits DESC);

-- =====================================================
-- PHASE 4: ADD COMPUTED COLUMNS
-- =====================================================

-- Add computed columns for better query performance
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS full_name VARCHAR(200) GENERATED ALWAYS AS (
    TRIM(COALESCE(first_name, '') || ' ' || COALESCE(last_name, ''))
) STORED;

ALTER TABLE events 
ADD COLUMN IF NOT EXISTS search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', 
        COALESCE(title, '') || ' ' || 
        COALESCE(description, '') || ' ' ||
        COALESCE(artist_name, '') || ' ' ||
        COALESCE(event_address, '')
    )
) STORED;

-- Index the computed columns
CREATE INDEX users_full_name_idx ON users (full_name);
CREATE INDEX events_search_vector_idx ON events USING GIN (search_vector);

-- =====================================================
-- PHASE 5: CREATE MATERIALIZED VIEWS
-- =====================================================

-- Popular links materialized view for dashboard
CREATE MATERIALIZED VIEW popular_links_daily AS
SELECT 
    l.id,
    l.address,
    l.description,
    l.user_id,
    u.email as user_email,
    l.visit_count,
    l.created_at,
    DATE(l.created_at) as date_created,
    RANK() OVER (PARTITION BY DATE(l.created_at) ORDER BY l.visit_count DESC) as daily_rank
FROM links l
JOIN users u ON l.user_id = u.id
WHERE l.created_at > NOW() - INTERVAL '30 days'
    AND l.visit_count > 0;

-- Index for materialized view
CREATE UNIQUE INDEX popular_links_daily_id_idx ON popular_links_daily (id);
CREATE INDEX popular_links_daily_rank_idx ON popular_links_daily (date_created, daily_rank);

-- User engagement summary materialized view
CREATE MATERIALIZED VIEW user_engagement_summary AS
SELECT 
    u.id,
    u.email,
    u.full_name,
    u.created_at,
    u.last_activity_at,
    COUNT(DISTINCT l.id) as total_links,
    COUNT(DISTINCT e.id) as total_events,
    COALESCE(SUM(l.visit_count), 0) as total_link_visits,
    COALESCE(SUM(es.signup_count), 0) as total_event_signups,
    u.engagement_score
FROM users u
LEFT JOIN links l ON u.id = l.user_id
LEFT JOIN events e ON u.id = e.user_id
LEFT JOIN (
    SELECT event_id, COUNT(*) as signup_count 
    FROM event_signups 
    GROUP BY event_id
) es ON e.id = es.event_id
WHERE u.created_at > NOW() - INTERVAL '90 days'
GROUP BY u.id, u.email, u.full_name, u.created_at, u.last_activity_at, u.engagement_score;

-- Index for user engagement view
CREATE UNIQUE INDEX user_engagement_summary_id_idx ON user_engagement_summary (id);
CREATE INDEX user_engagement_summary_score_idx ON user_engagement_summary (engagement_score DESC);

-- =====================================================
-- PHASE 6: CREATE REFRESH PROCEDURES
-- =====================================================

-- Procedure to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS void AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY popular_links_daily;
    REFRESH MATERIALIZED VIEW CONCURRENTLY user_engagement_summary;
    
    -- Update visit_stats from visits table (daily aggregation)
    INSERT INTO visit_stats (
        link_id, date_bucket, total_visits, unique_visits,
        chrome_visits, firefox_visits, safari_visits, edge_visits, other_browser_visits,
        windows_visits, macos_visits, linux_visits, android_visits, ios_visits, other_os_visits,
        top_countries
    )
    SELECT 
        link_id,
        DATE(created_at) as date_bucket,
        SUM(total) as total_visits,
        COUNT(DISTINCT id) as unique_visits,
        SUM(br_chrome) as chrome_visits,
        SUM(br_firefox) as firefox_visits,
        SUM(br_safari) as safari_visits,
        SUM(br_edge) as edge_visits,
        SUM(br_other) as other_browser_visits,
        SUM(os_windows) as windows_visits,
        SUM(os_macos) as macos_visits,
        SUM(os_linux) as linux_visits,
        SUM(os_android) as android_visits,
        SUM(os_ios) as ios_visits,
        SUM(os_other) as other_os_visits,
        jsonb_agg(countries) as top_countries
    FROM visits 
    WHERE DATE(created_at) = CURRENT_DATE - INTERVAL '1 day'
    GROUP BY link_id, DATE(created_at)
    ON CONFLICT (link_id, date_bucket) 
    DO UPDATE SET 
        total_visits = EXCLUDED.total_visits,
        unique_visits = EXCLUDED.unique_visits,
        chrome_visits = EXCLUDED.chrome_visits,
        firefox_visits = EXCLUDED.firefox_visits,
        safari_visits = EXCLUDED.safari_visits,
        edge_visits = EXCLUDED.edge_visits,
        other_browser_visits = EXCLUDED.other_browser_visits,
        windows_visits = EXCLUDED.windows_visits,
        macos_visits = EXCLUDED.macos_visits,
        linux_visits = EXCLUDED.linux_visits,
        android_visits = EXCLUDED.android_visits,
        ios_visits = EXCLUDED.ios_visits,
        other_os_visits = EXCLUDED.other_os_visits,
        top_countries = EXCLUDED.top_countries,
        updated_at = NOW();
        
    RAISE NOTICE 'Analytics views refreshed successfully';
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verify new tables
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name IN ('color_palettes', 'device_types', 'countries', 'visit_stats')
ORDER BY table_name, ordinal_position;

-- Check extracted fields
SELECT 
    COUNT(*) as total_users,
    COUNT(country_code) as users_with_country,
    COUNT(timezone) as users_with_timezone,
    COUNT(theme_preference) as users_with_theme
FROM users;

-- Verify materialized views
SELECT 
    schemaname,
    matviewname,
    hasindexes,
    ispopulated
FROM pg_matviews 
WHERE schemaname = 'public';
