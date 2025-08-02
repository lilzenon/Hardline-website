-- Performance Optimization and Monitoring for Secure Database
-- Priority: HIGH (Performance with Security)
-- Estimated Time: 1-2 hours
-- Risk Level: LOW (Monitoring and optimization)

-- =====================================================
-- PHASE 1: PERFORMANCE INDEXES FOR ENCRYPTED DATA
-- =====================================================

-- Indexes for encrypted field searches (using hash fields)
CREATE INDEX CONCURRENTLY IF NOT EXISTS contacts_secure_email_hash_performance_idx 
ON contacts_secure (email_hash, lifecycle_stage, created_at DESC) 
WHERE email_hash IS NOT NULL AND is_duplicate = false;

CREATE INDEX CONCURRENTLY IF NOT EXISTS contacts_secure_phone_hash_performance_idx 
ON contacts_secure (phone_hash, lifecycle_stage, created_at DESC) 
WHERE phone_hash IS NOT NULL AND is_duplicate = false;

-- Composite indexes for common query patterns
CREATE INDEX CONCURRENTLY IF NOT EXISTS contacts_secure_lifecycle_source_idx 
ON contacts_secure (lifecycle_stage, source, created_at DESC) 
WHERE is_duplicate = false;

CREATE INDEX CONCURRENTLY IF NOT EXISTS contacts_secure_consent_retention_idx 
ON contacts_secure (gdpr_consent_date, data_retention_date, created_at DESC) 
WHERE gdpr_consent_date IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS contacts_secure_activity_engagement_idx 
ON contacts_secure (last_activity_date DESC, email_opt_in, sms_opt_in) 
WHERE last_activity_date IS NOT NULL AND is_duplicate = false;

-- Partial indexes for data quality and verification
CREATE INDEX CONCURRENTLY IF NOT EXISTS contacts_secure_verification_quality_idx 
ON contacts_secure (is_verified, data_quality_score DESC, created_at DESC) 
WHERE data_quality_score IS NOT NULL;

-- Index for compliance and audit queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS contacts_secure_compliance_idx 
ON contacts_secure (gdpr_lawful_basis, ccpa_opt_out, created_at DESC) 
WHERE gdpr_lawful_basis IS NOT NULL;

-- Audit log performance indexes
CREATE INDEX CONCURRENTLY IF NOT EXISTS audit_log_performance_table_operation_idx 
ON audit_log (table_name, operation, operation_timestamp DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS audit_log_performance_user_time_idx 
ON audit_log (user_id, operation_timestamp DESC) 
WHERE user_id IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS audit_log_performance_sensitivity_idx 
ON audit_log (sensitivity_level, operation_timestamp DESC);

-- =====================================================
-- PHASE 2: PERFORMANCE MONITORING VIEWS
-- =====================================================

-- Encrypted database performance monitoring view
CREATE OR REPLACE VIEW secure_db_performance_monitor AS
SELECT 
    'Encrypted Operations' as metric_category,
    COUNT(*) as total_operations,
    AVG(EXTRACT(epoch FROM (operation_timestamp - LAG(operation_timestamp) OVER (ORDER BY operation_timestamp)))) as avg_operation_time_seconds,
    COUNT(CASE WHEN operation = 'SELECT' THEN 1 END) as read_operations,
    COUNT(CASE WHEN operation IN ('INSERT', 'UPDATE') THEN 1 END) as write_operations,
    COUNT(CASE WHEN operation = 'DELETE' THEN 1 END) as delete_operations
FROM audit_log 
WHERE operation_timestamp > NOW() - INTERVAL '1 hour'
UNION ALL
SELECT 
    'Encryption Function Usage' as metric_category,
    COUNT(*) as total_calls,
    NULL as avg_operation_time_seconds,
    COUNT(CASE WHEN access_reason LIKE '%decrypt%' THEN 1 END) as decrypt_calls,
    COUNT(CASE WHEN access_reason LIKE '%encrypt%' THEN 1 END) as encrypt_calls,
    COUNT(CASE WHEN access_reason LIKE '%hash%' THEN 1 END) as hash_calls
FROM audit_log 
WHERE operation_timestamp > NOW() - INTERVAL '1 hour'
    AND access_reason IS NOT NULL;

-- Contact data quality monitoring
CREATE OR REPLACE VIEW contact_data_quality_monitor AS
SELECT 
    lifecycle_stage,
    source,
    COUNT(*) as total_contacts,
    COUNT(CASE WHEN email_hash IS NOT NULL THEN 1 END) as contacts_with_email,
    COUNT(CASE WHEN phone_hash IS NOT NULL THEN 1 END) as contacts_with_phone,
    COUNT(CASE WHEN is_verified = true THEN 1 END) as verified_contacts,
    AVG(data_quality_score) as avg_quality_score,
    COUNT(CASE WHEN gdpr_consent_date IS NOT NULL THEN 1 END) as gdpr_compliant_contacts,
    COUNT(CASE WHEN data_retention_date IS NOT NULL THEN 1 END) as contacts_marked_for_deletion
FROM contacts_secure 
WHERE is_duplicate = false
GROUP BY lifecycle_stage, source
ORDER BY total_contacts DESC;

-- Security compliance monitoring
CREATE OR REPLACE VIEW security_compliance_monitor AS
SELECT 
    'GDPR Compliance' as compliance_type,
    COUNT(*) as total_records,
    COUNT(CASE WHEN gdpr_consent_date IS NOT NULL THEN 1 END) as compliant_records,
    ROUND(100.0 * COUNT(CASE WHEN gdpr_consent_date IS NOT NULL THEN 1 END) / COUNT(*), 2) as compliance_percentage,
    COUNT(CASE WHEN data_retention_date IS NOT NULL AND data_retention_date <= NOW() + INTERVAL '30 days' THEN 1 END) as records_expiring_soon
FROM contacts_secure 
WHERE is_duplicate = false
UNION ALL
SELECT 
    'Data Encryption' as compliance_type,
    COUNT(*) as total_records,
    COUNT(CASE WHEN email_encrypted IS NOT NULL OR phone_encrypted IS NOT NULL THEN 1 END) as encrypted_records,
    ROUND(100.0 * COUNT(CASE WHEN email_encrypted IS NOT NULL OR phone_encrypted IS NOT NULL THEN 1 END) / COUNT(*), 2) as encryption_percentage,
    0 as records_expiring_soon
FROM contacts_secure 
WHERE is_duplicate = false;

-- Audit log analysis view
CREATE OR REPLACE VIEW audit_analysis_monitor AS
SELECT 
    DATE_TRUNC('hour', operation_timestamp) as hour_bucket,
    operation,
    table_name,
    COUNT(*) as operation_count,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(DISTINCT ip_address) as unique_ips,
    COUNT(CASE WHEN sensitivity_level = 'critical' THEN 1 END) as critical_operations,
    COUNT(CASE WHEN gdpr_lawful_basis IS NULL AND operation = 'SELECT' THEN 1 END) as potentially_non_compliant
FROM audit_log 
WHERE operation_timestamp > NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', operation_timestamp), operation, table_name
ORDER BY hour_bucket DESC, operation_count DESC;

-- =====================================================
-- PHASE 3: PERFORMANCE OPTIMIZATION FUNCTIONS
-- =====================================================

-- Function to analyze query performance on encrypted data
CREATE OR REPLACE FUNCTION analyze_encrypted_query_performance()
RETURNS TABLE(
    query_type TEXT,
    avg_execution_time_ms NUMERIC,
    total_executions BIGINT,
    cache_hit_ratio NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'Email Hash Lookup' as query_type,
        AVG(EXTRACT(epoch FROM (operation_timestamp - LAG(operation_timestamp) OVER (ORDER BY operation_timestamp))) * 1000) as avg_execution_time_ms,
        COUNT(*) as total_executions,
        NULL::NUMERIC as cache_hit_ratio
    FROM audit_log 
    WHERE access_reason LIKE '%email%'
        AND operation = 'SELECT'
        AND operation_timestamp > NOW() - INTERVAL '1 hour'
    UNION ALL
    SELECT 
        'Phone Hash Lookup' as query_type,
        AVG(EXTRACT(epoch FROM (operation_timestamp - LAG(operation_timestamp) OVER (ORDER BY operation_timestamp))) * 1000) as avg_execution_time_ms,
        COUNT(*) as total_executions,
        NULL::NUMERIC as cache_hit_ratio
    FROM audit_log 
    WHERE access_reason LIKE '%phone%'
        AND operation = 'SELECT'
        AND operation_timestamp > NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to optimize database for encrypted operations
CREATE OR REPLACE FUNCTION optimize_encrypted_database()
RETURNS TEXT AS $$
DECLARE
    result_text TEXT := '';
    table_name TEXT;
    index_count INTEGER;
BEGIN
    -- Only allow admin role to run optimization
    IF current_setting('app.user_role', true) != 'admin' THEN
        RAISE EXCEPTION 'Only administrators can run database optimization';
    END IF;
    
    result_text := result_text || 'Starting encrypted database optimization...' || E'\n';
    
    -- Analyze table statistics
    FOR table_name IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE '%secure%' LOOP
        EXECUTE 'ANALYZE ' || table_name;
        result_text := result_text || 'Analyzed table: ' || table_name || E'\n';
    END LOOP;
    
    -- Check index usage
    SELECT COUNT(*) INTO index_count
    FROM pg_stat_user_indexes 
    WHERE schemaname = 'public' 
        AND idx_scan = 0 
        AND indexrelname LIKE '%secure%';
    
    IF index_count > 0 THEN
        result_text := result_text || 'Warning: ' || index_count || ' unused indexes found on secure tables' || E'\n';
    END IF;
    
    -- Update table statistics for query planner
    EXECUTE 'VACUUM ANALYZE contacts_secure';
    EXECUTE 'VACUUM ANALYZE audit_log';
    
    result_text := result_text || 'Database optimization completed successfully' || E'\n';
    
    RETURN result_text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PHASE 4: SECURITY ALERTING FUNCTIONS
-- =====================================================

-- Function to detect suspicious access patterns
CREATE OR REPLACE FUNCTION detect_suspicious_activity()
RETURNS TABLE(
    alert_type TEXT,
    severity TEXT,
    description TEXT,
    affected_records BIGINT,
    time_window TEXT
) AS $$
BEGIN
    -- Detect unusual access patterns
    RETURN QUERY
    SELECT 
        'High Volume Access' as alert_type,
        'HIGH' as severity,
        'User ' || user_id || ' accessed ' || COUNT(*) || ' records in 1 hour' as description,
        COUNT(*) as affected_records,
        '1 hour' as time_window
    FROM audit_log 
    WHERE operation = 'SELECT'
        AND operation_timestamp > NOW() - INTERVAL '1 hour'
        AND user_id IS NOT NULL
    GROUP BY user_id
    HAVING COUNT(*) > 100
    
    UNION ALL
    
    -- Detect access without proper justification
    SELECT 
        'Missing Access Justification' as alert_type,
        'MEDIUM' as severity,
        'Operations without proper access reason: ' || COUNT(*) as description,
        COUNT(*) as affected_records,
        '1 hour' as time_window
    FROM audit_log 
    WHERE operation_timestamp > NOW() - INTERVAL '1 hour'
        AND (access_reason IS NULL OR length(access_reason) < 10)
    HAVING COUNT(*) > 0
    
    UNION ALL
    
    -- Detect potential GDPR violations
    SELECT 
        'Potential GDPR Violation' as alert_type,
        'CRITICAL' as severity,
        'Access to data without GDPR lawful basis: ' || COUNT(*) as description,
        COUNT(*) as affected_records,
        '1 hour' as time_window
    FROM audit_log 
    WHERE operation = 'SELECT'
        AND operation_timestamp > NOW() - INTERVAL '1 hour'
        AND table_name = 'contacts_secure'
        AND gdpr_lawful_basis IS NULL
    HAVING COUNT(*) > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate security compliance report
CREATE OR REPLACE FUNCTION generate_security_compliance_report()
RETURNS TEXT AS $$
DECLARE
    report_text TEXT := '';
    total_contacts INTEGER;
    encrypted_contacts INTEGER;
    gdpr_compliant INTEGER;
    audit_coverage NUMERIC;
BEGIN
    report_text := report_text || 'SECURITY COMPLIANCE REPORT' || E'\n';
    report_text := report_text || 'Generated: ' || NOW() || E'\n';
    report_text := report_text || '================================' || E'\n\n';
    
    -- Contact encryption status
    SELECT COUNT(*) INTO total_contacts FROM contacts_secure WHERE is_duplicate = false;
    SELECT COUNT(*) INTO encrypted_contacts 
    FROM contacts_secure 
    WHERE (email_encrypted IS NOT NULL OR phone_encrypted IS NOT NULL) 
        AND is_duplicate = false;
    
    report_text := report_text || 'ENCRYPTION STATUS:' || E'\n';
    report_text := report_text || 'Total Contacts: ' || total_contacts || E'\n';
    report_text := report_text || 'Encrypted Contacts: ' || encrypted_contacts || E'\n';
    report_text := report_text || 'Encryption Rate: ' || ROUND(100.0 * encrypted_contacts / NULLIF(total_contacts, 0), 2) || '%' || E'\n\n';
    
    -- GDPR compliance status
    SELECT COUNT(*) INTO gdpr_compliant 
    FROM contacts_secure 
    WHERE gdpr_consent_date IS NOT NULL 
        AND gdpr_lawful_basis IS NOT NULL 
        AND is_duplicate = false;
    
    report_text := report_text || 'GDPR COMPLIANCE:' || E'\n';
    report_text := report_text || 'GDPR Compliant Contacts: ' || gdpr_compliant || E'\n';
    report_text := report_text || 'GDPR Compliance Rate: ' || ROUND(100.0 * gdpr_compliant / NULLIF(total_contacts, 0), 2) || '%' || E'\n\n';
    
    -- Audit coverage
    SELECT ROUND(100.0 * COUNT(DISTINCT record_id) / NULLIF(total_contacts, 0), 2) INTO audit_coverage
    FROM audit_log 
    WHERE table_name = 'contacts_secure' 
        AND operation_timestamp > NOW() - INTERVAL '30 days';
    
    report_text := report_text || 'AUDIT COVERAGE:' || E'\n';
    report_text := report_text || 'Records with Audit Trail (30 days): ' || audit_coverage || '%' || E'\n\n';
    
    -- Security alerts
    report_text := report_text || 'SECURITY ALERTS:' || E'\n';
    FOR rec IN SELECT * FROM detect_suspicious_activity() LOOP
        report_text := report_text || '[' || rec.severity || '] ' || rec.alert_type || ': ' || rec.description || E'\n';
    END LOOP;
    
    RETURN report_text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PHASE 5: AUTOMATED MAINTENANCE
-- =====================================================

-- Function for automated data retention cleanup
CREATE OR REPLACE FUNCTION automated_data_retention_cleanup()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
    contact_record RECORD;
BEGIN
    -- Only allow automated cleanup with proper authorization
    IF current_setting('app.automated_cleanup', true) != 'true' THEN
        RAISE EXCEPTION 'Automated cleanup not authorized';
    END IF;
    
    -- Set audit context
    PERFORM set_config('app.access_reason', 'Automated data retention cleanup', true);
    PERFORM set_config('app.user_role', 'system', true);
    
    -- Find and process expired contacts
    FOR contact_record IN 
        SELECT id, uuid 
        FROM contacts_secure 
        WHERE data_retention_date IS NOT NULL 
            AND data_retention_date <= NOW()
        LIMIT 100 -- Process in batches
    LOOP
        -- Log the deletion
        INSERT INTO audit_log (
            table_name,
            record_id,
            record_uuid,
            operation,
            access_reason,
            sensitivity_level
        ) VALUES (
            'contacts_secure',
            contact_record.id,
            contact_record.uuid,
            'DELETE',
            'Automated data retention cleanup - retention period expired',
            'high'
        );
        
        -- Delete the contact
        DELETE FROM contacts_secure WHERE id = contact_record.id;
        deleted_count := deleted_count + 1;
    END LOOP;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions for monitoring and optimization functions
GRANT SELECT ON secure_db_performance_monitor TO user_data_readonly, user_data_admin;
GRANT SELECT ON contact_data_quality_monitor TO user_data_readonly, user_data_admin;
GRANT SELECT ON security_compliance_monitor TO user_data_readonly, user_data_admin, user_data_auditor;
GRANT SELECT ON audit_analysis_monitor TO user_data_auditor, user_data_admin;

GRANT EXECUTE ON FUNCTION analyze_encrypted_query_performance() TO user_data_admin;
GRANT EXECUTE ON FUNCTION optimize_encrypted_database() TO user_data_admin;
GRANT EXECUTE ON FUNCTION detect_suspicious_activity() TO user_data_auditor, user_data_admin;
GRANT EXECUTE ON FUNCTION generate_security_compliance_report() TO user_data_auditor, user_data_admin;
GRANT EXECUTE ON FUNCTION automated_data_retention_cleanup() TO user_data_admin;

-- =====================================================
-- VERIFICATION AND TESTING
-- =====================================================

-- Test performance monitoring views
SELECT 'Performance Monitor Test' as test_name, COUNT(*) as view_rows 
FROM secure_db_performance_monitor;

SELECT 'Data Quality Monitor Test' as test_name, COUNT(*) as view_rows 
FROM contact_data_quality_monitor;

SELECT 'Compliance Monitor Test' as test_name, COUNT(*) as view_rows 
FROM security_compliance_monitor;

-- Test security functions
SELECT 'Security Analysis Test' as test_name, 
       analyze_encrypted_query_performance() IS NOT NULL as function_works;

SELECT 'Compliance Report Test' as test_name,
       length(generate_security_compliance_report()) > 100 as report_generated;
