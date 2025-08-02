-- Secure User Information Database Migration
-- Priority: CRITICAL SECURITY IMPLEMENTATION
-- Estimated Time: 2-3 hours (includes data migration)
-- Risk Level: HIGH (Major schema changes with encryption)

-- =====================================================
-- PHASE 1: SECURITY EXTENSIONS AND FUNCTIONS
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create encryption key management table
CREATE TABLE encryption_keys (
    id SERIAL PRIMARY KEY,
    key_name VARCHAR(50) UNIQUE NOT NULL,
    key_value BYTEA NOT NULL,
    algorithm VARCHAR(20) DEFAULT 'AES-256' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    rotated_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    created_by INTEGER,
    
    -- Security constraints
    CONSTRAINT valid_key_name CHECK (key_name ~ '^[a-zA-Z0-9_]+$'),
    CONSTRAINT valid_algorithm CHECK (algorithm IN ('AES-256', 'AES-128'))
);

-- Insert default encryption key (MUST be replaced with secure key in production)
INSERT INTO encryption_keys (key_name, key_value, created_by) VALUES 
('default_pii', decode('REPLACE_WITH_SECURE_256_BIT_KEY_IN_PRODUCTION', 'hex'), 1),
('custom_fields', decode('REPLACE_WITH_SECURE_256_BIT_KEY_IN_PRODUCTION', 'hex'), 1);

-- Secure encryption functions
CREATE OR REPLACE FUNCTION encrypt_pii(data TEXT, key_name TEXT DEFAULT 'default_pii')
RETURNS BYTEA AS $$
DECLARE
    encryption_key BYTEA;
BEGIN
    -- Input validation
    IF data IS NULL OR length(data) = 0 THEN
        RETURN NULL;
    END IF;
    
    -- Get active encryption key
    SELECT key_value INTO encryption_key 
    FROM encryption_keys 
    WHERE key_name = $2 AND is_active = true;
    
    IF encryption_key IS NULL THEN
        RAISE EXCEPTION 'Encryption key not found or inactive: %', key_name;
    END IF;
    
    -- Encrypt with AES-256
    RETURN pgp_sym_encrypt(data, encode(encryption_key, 'hex'));
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Encryption failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrypt_pii(encrypted_data BYTEA, key_name TEXT DEFAULT 'default_pii')
RETURNS TEXT AS $$
DECLARE
    encryption_key BYTEA;
BEGIN
    -- Input validation
    IF encrypted_data IS NULL THEN
        RETURN NULL;
    END IF;
    
    -- Get active encryption key
    SELECT key_value INTO encryption_key 
    FROM encryption_keys 
    WHERE key_name = $2 AND is_active = true;
    
    IF encryption_key IS NULL THEN
        RAISE EXCEPTION 'Decryption key not found or inactive: %', key_name;
    END IF;
    
    -- Decrypt with AES-256
    RETURN pgp_sym_decrypt(encrypted_data, encode(encryption_key, 'hex'));
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Decryption failed: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Hash function for searchable fields
CREATE OR REPLACE FUNCTION hash_for_search(data TEXT, salt TEXT DEFAULT 'default_salt')
RETURNS VARCHAR(64) AS $$
BEGIN
    IF data IS NULL OR length(data) = 0 THEN
        RETURN NULL;
    END IF;
    
    -- Use SHA-256 with salt for deterministic hashing
    RETURN encode(digest(lower(trim(data)) || salt, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- =====================================================
-- PHASE 2: SECURE AUDIT LOGGING SYSTEM
-- =====================================================

-- Comprehensive audit log table
CREATE TABLE audit_log (
    id BIGSERIAL PRIMARY KEY,
    
    -- Record identification
    table_name VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    record_uuid UUID,
    
    -- Operation details
    operation VARCHAR(10) NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE', 'SELECT')),
    operation_timestamp TIMESTAMPTZ DEFAULT NOW(),
    
    -- User and session context
    user_id INTEGER,
    session_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    request_id VARCHAR(100), -- For request tracing
    
    -- Change tracking (encrypted for sensitive data)
    old_values_encrypted BYTEA,
    new_values_encrypted BYTEA,
    changed_fields TEXT[],
    
    -- Compliance and legal
    access_reason VARCHAR(200) NOT NULL, -- Business justification required
    gdpr_lawful_basis VARCHAR(50) CHECK (gdpr_lawful_basis IN ('consent', 'contract', 'legal_obligation', 'vital_interests', 'public_task', 'legitimate_interests')),
    data_subject_consent BOOLEAN DEFAULT false,
    retention_period INTERVAL DEFAULT '7 years', -- Legal retention requirement
    
    -- Security classification
    sensitivity_level VARCHAR(20) DEFAULT 'high' CHECK (sensitivity_level IN ('low', 'medium', 'high', 'critical')),
    
    -- Audit metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_access_reason CHECK (length(access_reason) >= 10),
    CONSTRAINT valid_operation_context CHECK (
        (operation = 'SELECT' AND access_reason IS NOT NULL) OR
        (operation IN ('INSERT', 'UPDATE', 'DELETE') AND user_id IS NOT NULL)
    )
);

-- Audit log indexes for performance
CREATE INDEX audit_log_table_record_idx ON audit_log (table_name, record_id, operation_timestamp DESC);
CREATE INDEX audit_log_user_timestamp_idx ON audit_log (user_id, operation_timestamp DESC);
CREATE INDEX audit_log_timestamp_idx ON audit_log (operation_timestamp DESC);
CREATE INDEX audit_log_operation_idx ON audit_log (operation, operation_timestamp DESC);
CREATE INDEX audit_log_gdpr_idx ON audit_log (gdpr_lawful_basis, data_subject_consent);
CREATE INDEX audit_log_sensitivity_idx ON audit_log (sensitivity_level, operation_timestamp DESC);

-- Audit trigger function with enhanced security
CREATE OR REPLACE FUNCTION secure_audit_trigger()
RETURNS TRIGGER AS $$
DECLARE
    current_user_id INTEGER;
    current_session_id VARCHAR(100);
    current_ip INET;
    current_reason VARCHAR(200);
    current_lawful_basis VARCHAR(50);
    old_data JSONB;
    new_data JSONB;
BEGIN
    -- Get current context (set by application)
    current_user_id := current_setting('app.current_user_id', true)::INTEGER;
    current_session_id := current_setting('app.session_id', true);
    current_ip := current_setting('app.client_ip', true)::INET;
    current_reason := current_setting('app.access_reason', true);
    current_lawful_basis := current_setting('app.gdpr_lawful_basis', true);
    
    -- Validate required context for sensitive operations
    IF TG_OP IN ('INSERT', 'UPDATE', 'DELETE') AND current_user_id IS NULL THEN
        RAISE EXCEPTION 'User context required for % operation on %', TG_OP, TG_TABLE_NAME;
    END IF;
    
    IF TG_OP = 'SELECT' AND current_reason IS NULL THEN
        RAISE EXCEPTION 'Access reason required for SELECT operation on %', TG_TABLE_NAME;
    END IF;
    
    -- Prepare data for audit (encrypt sensitive fields)
    IF TG_OP IN ('DELETE', 'UPDATE') THEN
        old_data := to_jsonb(OLD);
    END IF;
    
    IF TG_OP IN ('INSERT', 'UPDATE') THEN
        new_data := to_jsonb(NEW);
    END IF;
    
    -- Insert audit record
    INSERT INTO audit_log (
        table_name,
        record_id,
        record_uuid,
        operation,
        user_id,
        session_id,
        ip_address,
        user_agent,
        old_values_encrypted,
        new_values_encrypted,
        changed_fields,
        access_reason,
        gdpr_lawful_basis,
        data_subject_consent,
        sensitivity_level
    ) VALUES (
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        COALESCE(NEW.uuid, OLD.uuid),
        TG_OP,
        current_user_id,
        current_session_id,
        current_ip,
        current_setting('app.user_agent', true),
        CASE WHEN old_data IS NOT NULL THEN encrypt_pii(old_data::TEXT, 'default_pii') ELSE NULL END,
        CASE WHEN new_data IS NOT NULL THEN encrypt_pii(new_data::TEXT, 'default_pii') ELSE NULL END,
        CASE WHEN TG_OP = 'UPDATE' THEN 
            (SELECT array_agg(key) FROM jsonb_each(new_data) WHERE new_data ->> key != old_data ->> key)
        ELSE NULL END,
        current_reason,
        current_lawful_basis,
        current_setting('app.data_subject_consent', true)::BOOLEAN,
        'high' -- All user data is high sensitivity
    );
    
    RETURN COALESCE(NEW, OLD);
EXCEPTION
    WHEN OTHERS THEN
        -- Log audit failure but don't block operation
        RAISE WARNING 'Audit logging failed for % on %: %', TG_OP, TG_TABLE_NAME, SQLERRM;
        RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- PHASE 3: SECURE CONTACTS TABLE REDESIGN
-- =====================================================

-- Create enum types for better data integrity
CREATE TYPE contact_lifecycle_stage AS ENUM ('lead', 'prospect', 'customer', 'advocate', 'inactive');
CREATE TYPE contact_lead_status AS ENUM ('new', 'contacted', 'qualified', 'unqualified', 'converted');
CREATE TYPE data_source_type AS ENUM ('web_form', 'api', 'import', 'manual', 'social_media');

-- Secure contacts table with field-level encryption
CREATE TABLE contacts_secure (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid() UNIQUE NOT NULL,
    
    -- Encrypted PII fields (AES-256)
    email_encrypted BYTEA,
    phone_encrypted BYTEA,
    first_name_encrypted BYTEA,
    last_name_encrypted BYTEA,
    company_encrypted BYTEA,
    job_title_encrypted BYTEA,
    address_encrypted BYTEA,
    
    -- Searchable hashed fields (SHA-256)
    email_hash VARCHAR(64) UNIQUE,
    phone_hash VARCHAR(64) UNIQUE,
    
    -- Non-PII searchable fields
    lifecycle_stage contact_lifecycle_stage DEFAULT 'lead',
    lead_status contact_lead_status DEFAULT 'new',
    source data_source_type DEFAULT 'web_form',
    source_reference_id INTEGER, -- Reference to original source (drop_id, etc.)
    
    -- Geographic data (non-PII)
    country_code CHAR(2), -- ISO 3166-1 alpha-2
    timezone VARCHAR(50),
    language_code CHAR(2), -- ISO 639-1
    
    -- Consent and compliance (GDPR/CCPA)
    email_opt_in BOOLEAN DEFAULT false,
    sms_opt_in BOOLEAN DEFAULT false,
    marketing_opt_in BOOLEAN DEFAULT false,
    gdpr_consent_date TIMESTAMPTZ,
    gdpr_consent_source VARCHAR(100),
    gdpr_lawful_basis VARCHAR(50) CHECK (gdpr_lawful_basis IN ('consent', 'contract', 'legal_obligation', 'vital_interests', 'public_task', 'legitimate_interests')),
    ccpa_opt_out BOOLEAN DEFAULT false,
    ccpa_opt_out_date TIMESTAMPTZ,
    
    -- Data retention and lifecycle
    data_retention_date TIMESTAMPTZ, -- Auto-deletion date
    last_activity_date TIMESTAMPTZ,
    last_email_open TIMESTAMPTZ,
    last_email_click TIMESTAMPTZ,
    last_sms_reply TIMESTAMPTZ,
    
    -- Encrypted custom fields (JSON)
    custom_fields_encrypted BYTEA,
    
    -- Data quality and verification
    data_quality_score NUMERIC(3,2) CHECK (data_quality_score >= 0 AND data_quality_score <= 1),
    is_verified BOOLEAN DEFAULT false,
    verification_date TIMESTAMPTZ,
    verification_method VARCHAR(50),
    
    -- Deduplication and merging
    master_contact_id INTEGER REFERENCES contacts_secure(id),
    is_duplicate BOOLEAN DEFAULT false,
    merge_count INTEGER DEFAULT 0,
    
    -- Audit and system fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by INTEGER NOT NULL, -- User ID from main database
    updated_by INTEGER,
    
    -- Security constraints
    CONSTRAINT valid_email_hash CHECK (email_hash IS NULL OR length(email_hash) = 64),
    CONSTRAINT valid_phone_hash CHECK (phone_hash IS NULL OR length(phone_hash) = 64),
    CONSTRAINT valid_retention_date CHECK (data_retention_date IS NULL OR data_retention_date > created_at),
    CONSTRAINT valid_quality_score CHECK (data_quality_score IS NULL OR (data_quality_score >= 0 AND data_quality_score <= 1)),
    CONSTRAINT valid_gdpr_consent CHECK (
        (gdpr_consent_date IS NULL AND gdpr_lawful_basis IS NULL) OR
        (gdpr_consent_date IS NOT NULL AND gdpr_lawful_basis IS NOT NULL)
    ),
    CONSTRAINT no_self_reference CHECK (id != master_contact_id)
);

-- Secure indexes for performance
CREATE INDEX contacts_secure_email_hash_idx ON contacts_secure (email_hash) WHERE email_hash IS NOT NULL;
CREATE INDEX contacts_secure_phone_hash_idx ON contacts_secure (phone_hash) WHERE phone_hash IS NOT NULL;
CREATE INDEX contacts_secure_lifecycle_idx ON contacts_secure (lifecycle_stage, lead_status, created_at DESC);
CREATE INDEX contacts_secure_source_idx ON contacts_secure (source, source_reference_id);
CREATE INDEX contacts_secure_retention_idx ON contacts_secure (data_retention_date) WHERE data_retention_date IS NOT NULL;
CREATE INDEX contacts_secure_consent_idx ON contacts_secure (gdpr_consent_date, gdpr_lawful_basis);
CREATE INDEX contacts_secure_activity_idx ON contacts_secure (last_activity_date DESC) WHERE last_activity_date IS NOT NULL;
CREATE INDEX contacts_secure_verification_idx ON contacts_secure (is_verified, verification_date);
CREATE INDEX contacts_secure_created_by_idx ON contacts_secure (created_by, created_at DESC);

-- Apply audit trigger
CREATE TRIGGER contacts_secure_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON contacts_secure
    FOR EACH ROW EXECUTE FUNCTION secure_audit_trigger();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Verify encryption functions work
SELECT 
    'Encryption Test' as test_name,
    encrypt_pii('test@example.com') IS NOT NULL as encryption_works,
    decrypt_pii(encrypt_pii('test@example.com')) = 'test@example.com' as decryption_works;

-- Verify hash function works
SELECT 
    'Hash Test' as test_name,
    hash_for_search('test@example.com') IS NOT NULL as hash_works,
    length(hash_for_search('test@example.com')) = 64 as hash_length_correct;

-- Check table structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'contacts_secure'
ORDER BY ordinal_position;
