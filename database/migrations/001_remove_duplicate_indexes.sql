-- Migration: Remove Duplicate Indexes
-- Priority: CRITICAL (Immediate Performance Impact)
-- Estimated Time: 5-10 minutes
-- Risk Level: LOW (Only removing redundant indexes)

-- =====================================================
-- PHASE 1: REMOVE DUPLICATE INDEXES
-- =====================================================

-- These indexes are covered by more specific composite indexes
-- Removing them will improve write performance and reduce storage

BEGIN;

-- Contact Group Memberships
DROP INDEX IF EXISTS contact_memberships_group_idx; -- Covered by unique_group_contact
DROP INDEX IF EXISTS contact_groups_user_idx; -- Covered by contact_groups_user_name_idx

-- Domains
DROP INDEX IF EXISTS domains_address_index; -- Covered by domains_address_unique
DROP INDEX IF EXISTS domains_user_id_index; -- Covered by domains_user_id_created_at_idx

-- Event Page Views
DROP INDEX IF EXISTS page_views_event_id_index; -- Covered by page_views_event_session_index

-- Event QR Codes
DROP INDEX IF EXISTS qr_codes_event_id_index; -- Covered by qr_codes_event_active_index
DROP INDEX IF EXISTS qr_codes_identifier_index; -- Covered by event_qr_codes_identifier_unique

-- Event Signups (Multiple redundant indexes)
DROP INDEX IF EXISTS event_signups_email_index; -- Covered by event_signups_email_created_idx
DROP INDEX IF EXISTS event_signups_email_created_idx; -- Covered by drop_signups_email_created_idx
DROP INDEX IF EXISTS drop_signups_email_created_idx; -- Covered by drop_signups_contact_analytics_idx
DROP INDEX IF EXISTS event_signups_event_id_index; -- Covered by drop_signups_user_analytics_idx
DROP INDEX IF EXISTS event_signups_event_id_created_idx; -- Covered by drop_signups_drop_id_created_idx

-- Events
DROP INDEX IF EXISTS events_qr_identifier_index; -- Covered by events_qr_code_identifier_unique
DROP INDEX IF EXISTS events_slug_index; -- Covered by events_slug_active_idx
DROP INDEX IF EXISTS events_user_id_index; -- Covered by drops_user_id_active_created_idx
DROP INDEX IF EXISTS events_user_id_active_created_idx; -- Covered by drops_user_id_active_created_idx

-- Hosts
DROP INDEX IF EXISTS hosts_address_index; -- Covered by hosts_address_unique

-- Integration Settings
DROP INDEX IF EXISTS idx_integration_settings_key; -- Covered by integration_settings_setting_key_unique

-- Links (High-traffic table - important optimization)
DROP INDEX IF EXISTS links_domain_id_index; -- Covered by links_domain_id_created_at_idx
DROP INDEX IF EXISTS links_user_id_index; -- Covered by links_user_id_visit_count_idx

-- QR Code Scans
DROP INDEX IF EXISTS qr_scans_event_id_index; -- Covered by qr_scans_event_time_index

-- SMS Messages
DROP INDEX IF EXISTS sms_messages_message_sid_index; -- Covered by sms_messages_message_sid_unique

-- SMS Opt Outs
DROP INDEX IF EXISTS sms_opt_outs_phone_index; -- Covered by sms_opt_outs_phone_unique

-- SMS Users
DROP INDEX IF EXISTS idx_sms_users_phone; -- Covered by sms_users_phone_number_unique

-- Social Interactions
DROP INDEX IF EXISTS idx_interactions_platform_id; -- Covered by unique_platform_interaction

-- Social Media Accounts
DROP INDEX IF EXISTS idx_social_accounts_platform; -- Covered by unique_platform_account

-- Social Media Users
DROP INDEX IF EXISTS idx_social_users_platform; -- Covered by unique_platform_user

-- User Notification Preferences
DROP INDEX IF EXISTS user_notification_preferences_user_id_index; -- Covered by composite unique index

-- User Sessions
DROP INDEX IF EXISTS sessions_session_id_index; -- Covered by user_sessions_session_id_unique

-- Visits (High-traffic table - important optimization)
DROP INDEX IF EXISTS visits_link_id_index; -- Covered by visits_link_id_created_idx
DROP INDEX IF EXISTS visits_link_id_created_idx; -- Covered by visits_link_id_created_at_idx
DROP INDEX IF EXISTS visits_user_id_index; -- Covered by visits_user_id_created_at_idx

COMMIT;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check remaining indexes on critical tables
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public' 
    AND tablename IN ('links', 'visits', 'events', 'users', 'event_signups')
ORDER BY tablename, indexname;

-- Check index sizes after cleanup
SELECT 
    schemaname,
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) as index_size
FROM pg_stat_user_indexes 
WHERE schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC;

-- =====================================================
-- ROLLBACK SCRIPT (if needed)
-- =====================================================

/*
-- ROLLBACK: Recreate removed indexes (only if absolutely necessary)

-- Links table
CREATE INDEX CONCURRENTLY links_domain_id_index ON links (domain_id);
CREATE INDEX CONCURRENTLY links_user_id_index ON links (user_id);

-- Visits table  
CREATE INDEX CONCURRENTLY visits_link_id_index ON visits (link_id);
CREATE INDEX CONCURRENTLY visits_user_id_index ON visits (user_id);

-- Events table
CREATE INDEX CONCURRENTLY events_slug_index ON events (slug);
CREATE INDEX CONCURRENTLY events_user_id_index ON events (user_id);

-- Note: Only recreate if specific queries show performance degradation
-- The composite indexes should handle all use cases more efficiently
*/
