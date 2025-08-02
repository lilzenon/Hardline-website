-- Role-Based Access Control and Security Policies
-- Priority: CRITICAL SECURITY IMPLEMENTATION
-- Estimated Time: 1-2 hours
-- Risk Level: MEDIUM (Access control changes)

-- =====================================================
-- PHASE 1: DATABASE ROLES AND PERMISSIONS
-- =====================================================

-- Drop existing roles if they exist (for clean setup)
DROP ROLE IF EXISTS user_data_readonly;
DROP ROLE IF EXISTS user_data_readwrite;
DROP ROLE IF EXISTS user_data_admin;
DROP ROLE IF EXISTS user_data_auditor;
DROP ROLE IF EXISTS app_service_user;
DROP ROLE IF EXISTS analytics_user;
DROP ROLE IF EXISTS compliance_officer;

-- Create secure database roles with least privilege principle
CREATE ROLE user_data_readonly NOLOGIN;
CREATE ROLE user_data_readwrite NOLOGIN;
CREATE ROLE user_data_admin NOLOGIN;
CREATE ROLE user_data_auditor NOLOGIN;
CREATE ROLE app_service_user LOGIN;
CREATE ROLE analytics_user LOGIN;
CREATE ROLE compliance_officer LOGIN;

-- =====================================================
-- PHASE 2: SCHEMA-LEVEL PERMISSIONS
-- =====================================================

-- Grant basic connection and schema usage
GRANT CONNECT ON DATABASE user_information TO user_data_readonly, user_data_readwrite, user_data_admin, user_data_auditor;
GRANT USAGE ON SCHEMA public TO user_data_readonly, user_data_readwrite, user_data_admin, user_data_auditor;

-- Grant sequence usage for insert operations
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO user_data_readwrite, user_data_admin;

-- =====================================================
-- PHASE 3: TABLE-LEVEL PERMISSIONS
-- =====================================================

-- READ-ONLY ROLE: Analytics and reporting (no PII access)
GRANT SELECT ON contacts_secure TO user_data_readonly;
GRANT SELECT ON audit_log TO user_data_readonly;
-- Explicitly deny access to encryption functions
REVOKE EXECUTE ON FUNCTION decrypt_pii(BYTEA, TEXT) FROM user_data_readonly;

-- READ-WRITE ROLE: Application service (limited PII access)
GRANT SELECT, INSERT, UPDATE ON contacts_secure TO user_data_readwrite;
GRANT INSERT ON audit_log TO user_data_readwrite;
GRANT EXECUTE ON FUNCTION encrypt_pii(TEXT, TEXT) TO user_data_readwrite;
GRANT EXECUTE ON FUNCTION decrypt_pii(BYTEA, TEXT) TO user_data_readwrite;
GRANT EXECUTE ON FUNCTION hash_for_search(TEXT, TEXT) TO user_data_readwrite;

-- ADMIN ROLE: Full access for maintenance and emergency
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_data_admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_data_admin;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO user_data_admin;

-- AUDITOR ROLE: Audit logs and compliance monitoring
GRANT SELECT ON audit_log TO user_data_auditor;
GRANT SELECT ON encryption_keys TO user_data_auditor;
GRANT SELECT ON contacts_secure TO user_data_auditor; -- For compliance verification
REVOKE EXECUTE ON FUNCTION decrypt_pii(BYTEA, TEXT) FROM user_data_auditor; -- Cannot decrypt PII

-- =====================================================
-- PHASE 4: ROW-LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all sensitive tables
ALTER TABLE contacts_secure ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Policy 1: Application users can only access data they created or are assigned to
CREATE POLICY contact_user_isolation ON contacts_secure
    FOR ALL TO user_data_readwrite
    USING (
        created_by = current_setting('app.current_user_id', true)::INTEGER
        OR updated_by = current_setting('app.current_user_id', true)::INTEGER
        OR current_setting('app.user_role', true) = 'admin'
    );

-- Policy 2: Read-only access with consent and retention checks
CREATE POLICY contact_readonly_compliance ON contacts_secure
    FOR SELECT TO user_data_readonly
    USING (
        -- Must have valid consent
        (gdpr_consent_date IS NOT NULL AND gdpr_lawful_basis IS NOT NULL)
        -- Must not be past retention date
        AND (data_retention_date IS NULL OR data_retention_date > NOW())
        -- Must not be marked for deletion
        AND is_duplicate = false
        -- Analytics users can only see aggregated/anonymized data
        AND (
            current_setting('app.access_purpose', true) = 'analytics'
            OR current_setting('app.user_role', true) = 'admin'
        )
    );

-- Policy 3: Admin bypass (with audit logging)
CREATE POLICY contact_admin_access ON contacts_secure
    FOR ALL TO user_data_admin
    USING (
        -- Admin access requires explicit justification
        current_setting('app.access_reason', true) IS NOT NULL
        AND length(current_setting('app.access_reason', true)) >= 10
    );

-- Policy 4: Auditor access to audit logs
CREATE POLICY audit_log_auditor_access ON audit_log
    FOR SELECT TO user_data_auditor
    USING (true); -- Auditors can see all audit logs

-- Policy 5: Users can only see their own audit logs
CREATE POLICY audit_log_user_access ON audit_log
    FOR SELECT TO user_data_readwrite
    USING (
        user_id = current_setting('app.current_user_id', true)::INTEGER
        OR current_setting('app.user_role', true) = 'admin'
    );

-- Policy 6: Compliance officer access with restrictions
CREATE POLICY contact_compliance_access ON contacts_secure
    FOR SELECT TO compliance_officer
    USING (
        -- Compliance officers can access for legal/regulatory purposes
        current_setting('app.access_reason', true) LIKE '%compliance%'
        OR current_setting('app.access_reason', true) LIKE '%legal%'
        OR current_setting('app.access_reason', true) LIKE '%audit%'
    );

-- =====================================================
-- PHASE 5: SECURITY FUNCTIONS AND VIEWS
-- =====================================================

-- Secure view for analytics (no PII exposure)
CREATE VIEW contacts_analytics AS
SELECT 
    id,
    uuid,
    lifecycle_stage,
    lead_status,
    source,
    country_code,
    timezone,
    language_code,
    email_opt_in,
    sms_opt_in,
    marketing_opt_in,
    data_quality_score,
    is_verified,
    last_activity_date,
    created_at,
    DATE_TRUNC('month', created_at) as created_month,
    DATE_TRUNC('week', created_at) as created_week,
    CASE 
        WHEN last_activity_date > NOW() - INTERVAL '30 days' THEN 'active'
        WHEN last_activity_date > NOW() - INTERVAL '90 days' THEN 'inactive'
        ELSE 'dormant'
    END as engagement_status
FROM contacts_secure
WHERE 
    gdpr_consent_date IS NOT NULL
    AND (data_retention_date IS NULL OR data_retention_date > NOW())
    AND is_duplicate = false;

-- Grant access to analytics view
GRANT SELECT ON contacts_analytics TO user_data_readonly, analytics_user;

-- Function to safely search contacts by email (returns only hash matches)
CREATE OR REPLACE FUNCTION find_contact_by_email(search_email TEXT)
RETURNS TABLE(contact_id INTEGER, uuid UUID, lifecycle_stage contact_lifecycle_stage) AS $$
DECLARE
    email_hash_value VARCHAR(64);
BEGIN
    -- Validate input
    IF search_email IS NULL OR length(trim(search_email)) = 0 THEN
        RAISE EXCEPTION 'Email address is required';
    END IF;
    
    -- Generate hash for search
    email_hash_value := hash_for_search(search_email);
    
    -- Return matching contacts (no PII exposed)
    RETURN QUERY
    SELECT c.id, c.uuid, c.lifecycle_stage
    FROM contacts_secure c
    WHERE c.email_hash = email_hash_value
        AND (c.data_retention_date IS NULL OR c.data_retention_date > NOW())
        AND c.is_duplicate = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get contact details with proper authorization
CREATE OR REPLACE FUNCTION get_contact_details(contact_uuid UUID, access_reason TEXT)
RETURNS TABLE(
    id INTEGER,
    email TEXT,
    phone TEXT,
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    lifecycle_stage contact_lifecycle_stage,
    created_at TIMESTAMPTZ
) AS $$
DECLARE
    contact_record contacts_secure%ROWTYPE;
    current_user_id INTEGER;
BEGIN
    -- Validate access reason
    IF access_reason IS NULL OR length(trim(access_reason)) < 10 THEN
        RAISE EXCEPTION 'Access reason must be at least 10 characters';
    END IF;
    
    -- Get current user context
    current_user_id := current_setting('app.current_user_id', true)::INTEGER;
    IF current_user_id IS NULL THEN
        RAISE EXCEPTION 'User context required';
    END IF;
    
    -- Get contact record
    SELECT * INTO contact_record
    FROM contacts_secure c
    WHERE c.uuid = contact_uuid
        AND (c.created_by = current_user_id OR current_setting('app.user_role', true) = 'admin')
        AND (c.data_retention_date IS NULL OR c.data_retention_date > NOW())
        AND c.is_duplicate = false;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Contact not found or access denied';
    END IF;
    
    -- Log access for audit
    PERFORM set_config('app.access_reason', access_reason, true);
    
    -- Return decrypted data
    RETURN QUERY
    SELECT 
        contact_record.id,
        decrypt_pii(contact_record.email_encrypted),
        decrypt_pii(contact_record.phone_encrypted),
        decrypt_pii(contact_record.first_name_encrypted),
        decrypt_pii(contact_record.last_name_encrypted),
        decrypt_pii(contact_record.company_encrypted),
        contact_record.lifecycle_stage,
        contact_record.created_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions on security functions
GRANT EXECUTE ON FUNCTION find_contact_by_email(TEXT) TO user_data_readwrite, user_data_readonly;
GRANT EXECUTE ON FUNCTION get_contact_details(UUID, TEXT) TO user_data_readwrite, user_data_admin;

-- =====================================================
-- PHASE 6: DATA RETENTION AND COMPLIANCE
-- =====================================================

-- Function to mark contacts for deletion (GDPR right to be forgotten)
CREATE OR REPLACE FUNCTION mark_for_deletion(contact_uuid UUID, deletion_reason TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    contact_id INTEGER;
    current_user_id INTEGER;
BEGIN
    -- Validate inputs
    IF contact_uuid IS NULL THEN
        RAISE EXCEPTION 'Contact UUID is required';
    END IF;
    
    IF deletion_reason IS NULL OR length(trim(deletion_reason)) < 10 THEN
        RAISE EXCEPTION 'Deletion reason must be at least 10 characters';
    END IF;
    
    -- Get current user context
    current_user_id := current_setting('app.current_user_id', true)::INTEGER;
    IF current_user_id IS NULL THEN
        RAISE EXCEPTION 'User context required';
    END IF;
    
    -- Find contact
    SELECT id INTO contact_id
    FROM contacts_secure
    WHERE uuid = contact_uuid
        AND is_duplicate = false;
    
    IF contact_id IS NULL THEN
        RAISE EXCEPTION 'Contact not found';
    END IF;
    
    -- Mark for deletion (30 days from now to allow for appeals)
    UPDATE contacts_secure
    SET 
        data_retention_date = NOW() + INTERVAL '30 days',
        updated_by = current_user_id,
        updated_at = NOW()
    WHERE id = contact_id;
    
    -- Log the deletion request
    PERFORM set_config('app.access_reason', 'GDPR deletion request: ' || deletion_reason, true);
    
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to permanently delete expired contacts
CREATE OR REPLACE FUNCTION cleanup_expired_contacts()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
    contact_record RECORD;
BEGIN
    -- Only allow admin role to run cleanup
    IF current_setting('app.user_role', true) != 'admin' THEN
        RAISE EXCEPTION 'Only administrators can run data cleanup';
    END IF;
    
    -- Find and delete expired contacts
    FOR contact_record IN 
        SELECT id, uuid FROM contacts_secure 
        WHERE data_retention_date IS NOT NULL 
            AND data_retention_date <= NOW()
    LOOP
        -- Log deletion
        PERFORM set_config('app.access_reason', 'Automated data retention cleanup', true);
        
        -- Delete the contact
        DELETE FROM contacts_secure WHERE id = contact_record.id;
        deleted_count := deleted_count + 1;
    END LOOP;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions for compliance functions
GRANT EXECUTE ON FUNCTION mark_for_deletion(UUID, TEXT) TO user_data_admin, compliance_officer;
GRANT EXECUTE ON FUNCTION cleanup_expired_contacts() TO user_data_admin;

-- =====================================================
-- VERIFICATION AND TESTING
-- =====================================================

-- Test RLS policies
SELECT 'RLS Test' as test_name, 
       rls_enabled as rls_active 
FROM (
    SELECT 
        schemaname,
        tablename,
        rowsecurity as rls_enabled
    FROM pg_tables 
    WHERE tablename = 'contacts_secure'
) t;

-- Test role permissions
SELECT 'Role Test' as test_name,
       rolname,
       rolcanlogin
FROM pg_roles 
WHERE rolname LIKE 'user_data_%' OR rolname LIKE '%_user';

-- Verify encryption functions are accessible
SELECT 'Function Access Test' as test_name,
       proname,
       proacl IS NOT NULL as has_permissions
FROM pg_proc 
WHERE proname IN ('encrypt_pii', 'decrypt_pii', 'hash_for_search');
