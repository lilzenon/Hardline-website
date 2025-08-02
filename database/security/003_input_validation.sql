-- Input Validation and Query Safety Implementation
-- Priority: CRITICAL SECURITY IMPLEMENTATION
-- Estimated Time: 1-2 hours
-- Risk Level: LOW (Validation functions)

-- =====================================================
-- PHASE 1: INPUT VALIDATION FUNCTIONS
-- =====================================================

-- Email validation function
CREATE OR REPLACE FUNCTION validate_email(email_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check for null or empty
    IF email_input IS NULL OR length(trim(email_input)) = 0 THEN
        RETURN false;
    END IF;
    
    -- Check length constraints
    IF length(email_input) > 255 THEN
        RETURN false;
    END IF;
    
    -- Basic email format validation (RFC 5322 compliant)
    IF email_input !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
        RETURN false;
    END IF;
    
    -- Check for dangerous characters
    IF email_input ~ '[<>"\''\\]' THEN
        RETURN false;
    END IF;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- Phone number validation function
CREATE OR REPLACE FUNCTION validate_phone(phone_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check for null or empty
    IF phone_input IS NULL OR length(trim(phone_input)) = 0 THEN
        RETURN false;
    END IF;
    
    -- Remove common formatting characters
    phone_input := regexp_replace(phone_input, '[^0-9+]', '', 'g');
    
    -- Check length constraints (E.164 format: +1234567890123456)
    IF length(phone_input) < 7 OR length(phone_input) > 16 THEN
        RETURN false;
    END IF;
    
    -- Must start with + for international format or be 10+ digits
    IF phone_input !~ '^\+[1-9][0-9]{6,14}$' AND phone_input !~ '^[0-9]{10,15}$' THEN
        RETURN false;
    END IF;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- Name validation function (first name, last name)
CREATE OR REPLACE FUNCTION validate_name(name_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check for null or empty
    IF name_input IS NULL OR length(trim(name_input)) = 0 THEN
        RETURN false;
    END IF;
    
    -- Check length constraints
    IF length(name_input) > 100 THEN
        RETURN false;
    END IF;
    
    -- Allow letters, spaces, hyphens, apostrophes, and common international characters
    IF name_input !~ '^[a-zA-ZÀ-ÿĀ-žА-я\s\-''\.]+$' THEN
        RETURN false;
    END IF;
    
    -- Check for SQL injection patterns
    IF name_input ~* '(union|select|insert|update|delete|drop|create|alter|exec|script)' THEN
        RETURN false;
    END IF;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- Company name validation function
CREATE OR REPLACE FUNCTION validate_company(company_input TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check for null (allowed) or empty
    IF company_input IS NULL THEN
        RETURN true;
    END IF;
    
    IF length(trim(company_input)) = 0 THEN
        RETURN false;
    END IF;
    
    -- Check length constraints
    IF length(company_input) > 200 THEN
        RETURN false;
    END IF;
    
    -- Allow letters, numbers, spaces, and common business characters
    IF company_input !~ '^[a-zA-ZÀ-ÿĀ-žА-я0-9\s\-''\.&,()]+$' THEN
        RETURN false;
    END IF;
    
    -- Check for SQL injection patterns
    IF company_input ~* '(union|select|insert|update|delete|drop|create|alter|exec|script)' THEN
        RETURN false;
    END IF;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- Custom fields JSON validation function
CREATE OR REPLACE FUNCTION validate_custom_fields(custom_fields_input JSONB)
RETURNS BOOLEAN AS $$
DECLARE
    key_name TEXT;
    field_value TEXT;
BEGIN
    -- Check for null (allowed)
    IF custom_fields_input IS NULL THEN
        RETURN true;
    END IF;
    
    -- Check JSON size limit (1MB)
    IF length(custom_fields_input::TEXT) > 1048576 THEN
        RETURN false;
    END IF;
    
    -- Validate each key-value pair
    FOR key_name, field_value IN SELECT * FROM jsonb_each_text(custom_fields_input) LOOP
        -- Validate key name
        IF key_name IS NULL OR length(key_name) = 0 OR length(key_name) > 100 THEN
            RETURN false;
        END IF;
        
        -- Key must be alphanumeric with underscores
        IF key_name !~ '^[a-zA-Z0-9_]+$' THEN
            RETURN false;
        END IF;
        
        -- Validate field value
        IF field_value IS NOT NULL THEN
            -- Check value length
            IF length(field_value) > 1000 THEN
                RETURN false;
            END IF;
            
            -- Check for dangerous patterns
            IF field_value ~* '(<script|javascript:|data:|vbscript:|onload|onerror)' THEN
                RETURN false;
            END IF;
            
            -- Check for SQL injection patterns
            IF field_value ~* '(union|select|insert|update|delete|drop|create|alter|exec)' THEN
                RETURN false;
            END IF;
        END IF;
    END LOOP;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- =====================================================
-- PHASE 2: SANITIZATION FUNCTIONS
-- =====================================================

-- Sanitize text input (remove dangerous characters)
CREATE OR REPLACE FUNCTION sanitize_text(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
    IF input_text IS NULL THEN
        RETURN NULL;
    END IF;
    
    -- Remove null bytes and control characters
    input_text := regexp_replace(input_text, '[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', 'g');
    
    -- Remove HTML tags
    input_text := regexp_replace(input_text, '<[^>]*>', '', 'g');
    
    -- Remove script-related content
    input_text := regexp_replace(input_text, '(javascript:|data:|vbscript:)', '', 'gi');
    
    -- Trim whitespace
    input_text := trim(input_text);
    
    RETURN input_text;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- Normalize phone number to E.164 format
CREATE OR REPLACE FUNCTION normalize_phone(phone_input TEXT, default_country_code TEXT DEFAULT '+1')
RETURNS TEXT AS $$
DECLARE
    cleaned_phone TEXT;
BEGIN
    IF phone_input IS NULL OR length(trim(phone_input)) = 0 THEN
        RETURN NULL;
    END IF;
    
    -- Remove all non-digit characters except +
    cleaned_phone := regexp_replace(phone_input, '[^0-9+]', '', 'g');
    
    -- If no country code, add default
    IF cleaned_phone !~ '^\+' THEN
        -- Remove leading 1 for US numbers if present
        IF default_country_code = '+1' AND cleaned_phone ~ '^1[0-9]{10}$' THEN
            cleaned_phone := substring(cleaned_phone from 2);
        END IF;
        cleaned_phone := default_country_code || cleaned_phone;
    END IF;
    
    -- Validate final format
    IF NOT validate_phone(cleaned_phone) THEN
        RAISE EXCEPTION 'Invalid phone number format: %', phone_input;
    END IF;
    
    RETURN cleaned_phone;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- Normalize email address
CREATE OR REPLACE FUNCTION normalize_email(email_input TEXT)
RETURNS TEXT AS $$
DECLARE
    normalized_email TEXT;
BEGIN
    IF email_input IS NULL OR length(trim(email_input)) = 0 THEN
        RETURN NULL;
    END IF;
    
    -- Convert to lowercase and trim
    normalized_email := lower(trim(email_input));
    
    -- Validate format
    IF NOT validate_email(normalized_email) THEN
        RAISE EXCEPTION 'Invalid email format: %', email_input;
    END IF;
    
    RETURN normalized_email;
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- =====================================================
-- PHASE 3: SECURE INSERT/UPDATE FUNCTIONS
-- =====================================================

-- Secure contact insertion function
CREATE OR REPLACE FUNCTION insert_contact_secure(
    email_input TEXT,
    phone_input TEXT DEFAULT NULL,
    first_name_input TEXT DEFAULT NULL,
    last_name_input TEXT DEFAULT NULL,
    company_input TEXT DEFAULT NULL,
    job_title_input TEXT DEFAULT NULL,
    source_input data_source_type DEFAULT 'web_form',
    source_reference_id_input INTEGER DEFAULT NULL,
    custom_fields_input JSONB DEFAULT NULL,
    gdpr_consent BOOLEAN DEFAULT false,
    gdpr_lawful_basis_input VARCHAR(50) DEFAULT NULL,
    created_by_input INTEGER DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_uuid UUID;
    normalized_email TEXT;
    normalized_phone TEXT;
    sanitized_first_name TEXT;
    sanitized_last_name TEXT;
    sanitized_company TEXT;
    sanitized_job_title TEXT;
    existing_contact_id INTEGER;
BEGIN
    -- Validate required fields
    IF created_by_input IS NULL THEN
        RAISE EXCEPTION 'created_by is required';
    END IF;
    
    -- Validate and normalize email
    IF email_input IS NOT NULL THEN
        normalized_email := normalize_email(email_input);
        
        -- Check for existing contact with same email
        SELECT id INTO existing_contact_id
        FROM contacts_secure
        WHERE email_hash = hash_for_search(normalized_email)
            AND is_duplicate = false;
        
        IF existing_contact_id IS NOT NULL THEN
            RAISE EXCEPTION 'Contact with email % already exists (ID: %)', normalized_email, existing_contact_id;
        END IF;
    END IF;
    
    -- Validate and normalize phone
    IF phone_input IS NOT NULL THEN
        normalized_phone := normalize_phone(phone_input);
        
        -- Check for existing contact with same phone
        SELECT id INTO existing_contact_id
        FROM contacts_secure
        WHERE phone_hash = hash_for_search(normalized_phone)
            AND is_duplicate = false;
        
        IF existing_contact_id IS NOT NULL THEN
            RAISE EXCEPTION 'Contact with phone % already exists (ID: %)', normalized_phone, existing_contact_id;
        END IF;
    END IF;
    
    -- Validate and sanitize other fields
    IF first_name_input IS NOT NULL THEN
        IF NOT validate_name(first_name_input) THEN
            RAISE EXCEPTION 'Invalid first name format';
        END IF;
        sanitized_first_name := sanitize_text(first_name_input);
    END IF;
    
    IF last_name_input IS NOT NULL THEN
        IF NOT validate_name(last_name_input) THEN
            RAISE EXCEPTION 'Invalid last name format';
        END IF;
        sanitized_last_name := sanitize_text(last_name_input);
    END IF;
    
    IF company_input IS NOT NULL THEN
        IF NOT validate_company(company_input) THEN
            RAISE EXCEPTION 'Invalid company name format';
        END IF;
        sanitized_company := sanitize_text(company_input);
    END IF;
    
    IF job_title_input IS NOT NULL THEN
        sanitized_job_title := sanitize_text(job_title_input);
    END IF;
    
    -- Validate custom fields
    IF custom_fields_input IS NOT NULL THEN
        IF NOT validate_custom_fields(custom_fields_input) THEN
            RAISE EXCEPTION 'Invalid custom fields format';
        END IF;
    END IF;
    
    -- Validate GDPR compliance
    IF gdpr_consent AND gdpr_lawful_basis_input IS NULL THEN
        RAISE EXCEPTION 'GDPR lawful basis required when consent is given';
    END IF;
    
    -- Set application context for audit logging
    PERFORM set_config('app.current_user_id', created_by_input::TEXT, true);
    PERFORM set_config('app.access_reason', 'Creating new contact record', true);
    PERFORM set_config('app.gdpr_lawful_basis', gdpr_lawful_basis_input, true);
    PERFORM set_config('app.data_subject_consent', gdpr_consent::TEXT, true);
    
    -- Insert the contact
    INSERT INTO contacts_secure (
        email_encrypted,
        email_hash,
        phone_encrypted,
        phone_hash,
        first_name_encrypted,
        last_name_encrypted,
        company_encrypted,
        job_title_encrypted,
        source,
        source_reference_id,
        custom_fields_encrypted,
        gdpr_consent_date,
        gdpr_lawful_basis,
        created_by
    ) VALUES (
        CASE WHEN normalized_email IS NOT NULL THEN encrypt_pii(normalized_email) ELSE NULL END,
        CASE WHEN normalized_email IS NOT NULL THEN hash_for_search(normalized_email) ELSE NULL END,
        CASE WHEN normalized_phone IS NOT NULL THEN encrypt_pii(normalized_phone) ELSE NULL END,
        CASE WHEN normalized_phone IS NOT NULL THEN hash_for_search(normalized_phone) ELSE NULL END,
        CASE WHEN sanitized_first_name IS NOT NULL THEN encrypt_pii(sanitized_first_name) ELSE NULL END,
        CASE WHEN sanitized_last_name IS NOT NULL THEN encrypt_pii(sanitized_last_name) ELSE NULL END,
        CASE WHEN sanitized_company IS NOT NULL THEN encrypt_pii(sanitized_company) ELSE NULL END,
        CASE WHEN sanitized_job_title IS NOT NULL THEN encrypt_pii(sanitized_job_title) ELSE NULL END,
        source_input,
        source_reference_id_input,
        CASE WHEN custom_fields_input IS NOT NULL THEN encrypt_pii(custom_fields_input::TEXT, 'custom_fields') ELSE NULL END,
        CASE WHEN gdpr_consent THEN NOW() ELSE NULL END,
        gdpr_lawful_basis_input,
        created_by_input
    ) RETURNING uuid INTO new_uuid;
    
    RETURN new_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Secure contact update function
CREATE OR REPLACE FUNCTION update_contact_secure(
    contact_uuid_input UUID,
    email_input TEXT DEFAULT NULL,
    phone_input TEXT DEFAULT NULL,
    first_name_input TEXT DEFAULT NULL,
    last_name_input TEXT DEFAULT NULL,
    company_input TEXT DEFAULT NULL,
    job_title_input TEXT DEFAULT NULL,
    custom_fields_input JSONB DEFAULT NULL,
    updated_by_input INTEGER DEFAULT NULL,
    update_reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    contact_id INTEGER;
    normalized_email TEXT;
    normalized_phone TEXT;
    existing_contact_id INTEGER;
BEGIN
    -- Validate required fields
    IF contact_uuid_input IS NULL THEN
        RAISE EXCEPTION 'Contact UUID is required';
    END IF;
    
    IF updated_by_input IS NULL THEN
        RAISE EXCEPTION 'updated_by is required';
    END IF;
    
    IF update_reason IS NULL OR length(trim(update_reason)) < 10 THEN
        RAISE EXCEPTION 'Update reason must be at least 10 characters';
    END IF;
    
    -- Find the contact
    SELECT id INTO contact_id
    FROM contacts_secure
    WHERE uuid = contact_uuid_input
        AND is_duplicate = false;
    
    IF contact_id IS NULL THEN
        RAISE EXCEPTION 'Contact not found';
    END IF;
    
    -- Validate email if provided
    IF email_input IS NOT NULL THEN
        normalized_email := normalize_email(email_input);
        
        -- Check for conflicts (excluding current contact)
        SELECT id INTO existing_contact_id
        FROM contacts_secure
        WHERE email_hash = hash_for_search(normalized_email)
            AND id != contact_id
            AND is_duplicate = false;
        
        IF existing_contact_id IS NOT NULL THEN
            RAISE EXCEPTION 'Email % already exists for another contact', normalized_email;
        END IF;
    END IF;
    
    -- Validate phone if provided
    IF phone_input IS NOT NULL THEN
        normalized_phone := normalize_phone(phone_input);
        
        -- Check for conflicts (excluding current contact)
        SELECT id INTO existing_contact_id
        FROM contacts_secure
        WHERE phone_hash = hash_for_search(normalized_phone)
            AND id != contact_id
            AND is_duplicate = false;
        
        IF existing_contact_id IS NOT NULL THEN
            RAISE EXCEPTION 'Phone % already exists for another contact', normalized_phone;
        END IF;
    END IF;
    
    -- Validate other fields
    IF first_name_input IS NOT NULL AND NOT validate_name(first_name_input) THEN
        RAISE EXCEPTION 'Invalid first name format';
    END IF;
    
    IF last_name_input IS NOT NULL AND NOT validate_name(last_name_input) THEN
        RAISE EXCEPTION 'Invalid last name format';
    END IF;
    
    IF company_input IS NOT NULL AND NOT validate_company(company_input) THEN
        RAISE EXCEPTION 'Invalid company name format';
    END IF;
    
    IF custom_fields_input IS NOT NULL AND NOT validate_custom_fields(custom_fields_input) THEN
        RAISE EXCEPTION 'Invalid custom fields format';
    END IF;
    
    -- Set application context for audit logging
    PERFORM set_config('app.current_user_id', updated_by_input::TEXT, true);
    PERFORM set_config('app.access_reason', 'Updating contact: ' || update_reason, true);
    
    -- Update the contact
    UPDATE contacts_secure SET
        email_encrypted = CASE WHEN email_input IS NOT NULL THEN encrypt_pii(normalized_email) ELSE email_encrypted END,
        email_hash = CASE WHEN email_input IS NOT NULL THEN hash_for_search(normalized_email) ELSE email_hash END,
        phone_encrypted = CASE WHEN phone_input IS NOT NULL THEN encrypt_pii(normalized_phone) ELSE phone_encrypted END,
        phone_hash = CASE WHEN phone_input IS NOT NULL THEN hash_for_search(normalized_phone) ELSE phone_hash END,
        first_name_encrypted = CASE WHEN first_name_input IS NOT NULL THEN encrypt_pii(sanitize_text(first_name_input)) ELSE first_name_encrypted END,
        last_name_encrypted = CASE WHEN last_name_input IS NOT NULL THEN encrypt_pii(sanitize_text(last_name_input)) ELSE last_name_encrypted END,
        company_encrypted = CASE WHEN company_input IS NOT NULL THEN encrypt_pii(sanitize_text(company_input)) ELSE company_encrypted END,
        job_title_encrypted = CASE WHEN job_title_input IS NOT NULL THEN encrypt_pii(sanitize_text(job_title_input)) ELSE job_title_encrypted END,
        custom_fields_encrypted = CASE WHEN custom_fields_input IS NOT NULL THEN encrypt_pii(custom_fields_input::TEXT, 'custom_fields') ELSE custom_fields_encrypted END,
        updated_by = updated_by_input,
        updated_at = NOW()
    WHERE id = contact_id;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions on validation and secure functions
GRANT EXECUTE ON FUNCTION validate_email(TEXT) TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION validate_phone(TEXT) TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION validate_name(TEXT) TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION validate_company(TEXT) TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION validate_custom_fields(JSONB) TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION sanitize_text(TEXT) TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION normalize_phone(TEXT, TEXT) TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION normalize_email(TEXT) TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION insert_contact_secure TO user_data_readwrite, user_data_admin;
GRANT EXECUTE ON FUNCTION update_contact_secure TO user_data_readwrite, user_data_admin;

-- =====================================================
-- VERIFICATION TESTS
-- =====================================================

-- Test validation functions
SELECT 
    'Validation Tests' as test_category,
    validate_email('test@example.com') as valid_email,
    validate_email('invalid-email') as invalid_email,
    validate_phone('+1234567890') as valid_phone,
    validate_phone('invalid') as invalid_phone,
    validate_name('John Doe') as valid_name,
    validate_name('DROP TABLE') as invalid_name;
