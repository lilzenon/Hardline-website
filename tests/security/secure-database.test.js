/**
 * 🔒 SECURE DATABASE SECURITY TESTS
 * 
 * Comprehensive security testing for the encrypted user information database
 * Tests encryption, access control, audit logging, and compliance features.
 */

const { Pool } = require('pg');
const { SecureContactModel, SecurityContext } = require('../../server/models/secure-contact.model');

describe('🔒 Secure Database Security Tests', () => {
    let testPool;
    let adminContext;
    let userContext;
    let testContactUuid;

    beforeAll(async () => {
        // Set up test database connection
        testPool = new Pool({
            host: process.env.TEST_USER_DB_HOST || 'localhost',
            port: process.env.TEST_USER_DB_PORT || 5432,
            database: process.env.TEST_USER_DB_NAME || 'user_information_test',
            user: process.env.TEST_USER_DB_USER || 'postgres',
            password: process.env.TEST_USER_DB_PASSWORD
        });

        // Create test security contexts
        adminContext = new SecurityContext(1, 'test-session-admin', '127.0.0.1', 'test-agent', 'admin');
        userContext = new SecurityContext(2, 'test-session-user', '127.0.0.1', 'test-agent', 'user');
    });

    afterAll(async () => {
        await testPool.end();
    });

    describe('🔐 Encryption Functions', () => {
        test('should encrypt and decrypt PII data correctly', async () => {
            const client = await testPool.connect();
            
            try {
                const testData = 'test@example.com';
                
                // Test encryption
                const encryptResult = await client.query(
                    'SELECT encrypt_pii($1) as encrypted_data',
                    [testData]
                );
                
                expect(encryptResult.rows[0].encrypted_data).toBeTruthy();
                expect(encryptResult.rows[0].encrypted_data).not.toBe(testData);
                
                // Test decryption
                const decryptResult = await client.query(
                    'SELECT decrypt_pii($1) as decrypted_data',
                    [encryptResult.rows[0].encrypted_data]
                );
                
                expect(decryptResult.rows[0].decrypted_data).toBe(testData);
                
            } finally {
                client.release();
            }
        });

        test('should generate consistent hashes for search', async () => {
            const client = await testPool.connect();
            
            try {
                const testEmail = 'test@example.com';
                
                const hash1 = await client.query(
                    'SELECT hash_for_search($1) as hash',
                    [testEmail]
                );
                
                const hash2 = await client.query(
                    'SELECT hash_for_search($1) as hash',
                    [testEmail]
                );
                
                expect(hash1.rows[0].hash).toBe(hash2.rows[0].hash);
                expect(hash1.rows[0].hash).toHaveLength(64); // SHA-256 hex length
                
            } finally {
                client.release();
            }
        });

        test('should handle null values in encryption functions', async () => {
            const client = await testPool.connect();
            
            try {
                const encryptResult = await client.query(
                    'SELECT encrypt_pii(NULL) as encrypted_null'
                );
                
                const hashResult = await client.query(
                    'SELECT hash_for_search(NULL) as hash_null'
                );
                
                expect(encryptResult.rows[0].encrypted_null).toBeNull();
                expect(hashResult.rows[0].hash_null).toBeNull();
                
            } finally {
                client.release();
            }
        });
    });

    describe('🛡️ Input Validation', () => {
        test('should validate email addresses correctly', async () => {
            const client = await testPool.connect();
            
            try {
                // Valid emails
                const validEmails = [
                    'test@example.com',
                    'user.name@domain.co.uk',
                    'test+tag@example.org'
                ];
                
                for (const email of validEmails) {
                    const result = await client.query(
                        'SELECT validate_email($1) as is_valid',
                        [email]
                    );
                    expect(result.rows[0].is_valid).toBe(true);
                }
                
                // Invalid emails
                const invalidEmails = [
                    'invalid-email',
                    'test@',
                    '@example.com',
                    'test<script>@example.com'
                ];
                
                for (const email of invalidEmails) {
                    const result = await client.query(
                        'SELECT validate_email($1) as is_valid',
                        [email]
                    );
                    expect(result.rows[0].is_valid).toBe(false);
                }
                
            } finally {
                client.release();
            }
        });

        test('should validate phone numbers correctly', async () => {
            const client = await testPool.connect();
            
            try {
                // Valid phones
                const validPhones = [
                    '+1234567890',
                    '+44123456789',
                    '1234567890'
                ];
                
                for (const phone of validPhones) {
                    const result = await client.query(
                        'SELECT validate_phone($1) as is_valid',
                        [phone]
                    );
                    expect(result.rows[0].is_valid).toBe(true);
                }
                
                // Invalid phones
                const invalidPhones = [
                    '123',
                    'abc123',
                    '+1234567890123456789' // Too long
                ];
                
                for (const phone of invalidPhones) {
                    const result = await client.query(
                        'SELECT validate_phone($1) as is_valid',
                        [phone]
                    );
                    expect(result.rows[0].is_valid).toBe(false);
                }
                
            } finally {
                client.release();
            }
        });

        test('should prevent SQL injection in name fields', async () => {
            const client = await testPool.connect();
            
            try {
                const maliciousInputs = [
                    "'; DROP TABLE contacts_secure; --",
                    "UNION SELECT * FROM users",
                    "<script>alert('xss')</script>",
                    "Robert'; INSERT INTO"
                ];
                
                for (const input of maliciousInputs) {
                    const result = await client.query(
                        'SELECT validate_name($1) as is_valid',
                        [input]
                    );
                    expect(result.rows[0].is_valid).toBe(false);
                }
                
            } finally {
                client.release();
            }
        });
    });

    describe('🔒 Access Control & RLS', () => {
        test('should enforce row-level security policies', async () => {
            const client = await testPool.connect();
            
            try {
                // Set user context
                await userContext.setContext(client);
                await client.query('SELECT set_config($1, $2, true)', ['app.access_reason', 'Testing RLS policies']);
                
                // Try to access all contacts (should be restricted)
                const result = await client.query(
                    'SELECT COUNT(*) as count FROM contacts_secure'
                );
                
                // User should only see their own contacts or none in test
                expect(result.rows[0].count).toBe('0');
                
            } finally {
                client.release();
            }
        });

        test('should require access reason for sensitive operations', async () => {
            const client = await testPool.connect();
            
            try {
                await userContext.setContext(client);
                
                // Try to access without access reason (should fail)
                await expect(
                    client.query('SELECT * FROM contacts_secure LIMIT 1')
                ).rejects.toThrow();
                
            } finally {
                client.release();
            }
        });
    });

    describe('📊 Audit Logging', () => {
        test('should log all database operations', async () => {
            const client = await testPool.connect();
            
            try {
                await adminContext.setContext(client);
                await client.query('SELECT set_config($1, $2, true)', ['app.access_reason', 'Testing audit logging']);
                
                // Perform a test operation
                await client.query('SELECT COUNT(*) FROM contacts_secure');
                
                // Check if audit log was created
                const auditResult = await client.query(`
                    SELECT COUNT(*) as audit_count 
                    FROM audit_log 
                    WHERE table_name = 'contacts_secure' 
                        AND operation = 'SELECT'
                        AND user_id = $1
                        AND operation_timestamp > NOW() - INTERVAL '1 minute'
                `, [adminContext.userId]);
                
                expect(parseInt(auditResult.rows[0].audit_count)).toBeGreaterThan(0);
                
            } finally {
                client.release();
            }
        });

        test('should include required audit information', async () => {
            const client = await testPool.connect();
            
            try {
                await adminContext.setContext(client);
                await client.query('SELECT set_config($1, $2, true)', ['app.access_reason', 'Testing audit completeness']);
                
                // Perform a test operation
                await client.query('SELECT COUNT(*) FROM contacts_secure');
                
                // Check audit log completeness
                const auditResult = await client.query(`
                    SELECT 
                        user_id,
                        ip_address,
                        access_reason,
                        sensitivity_level
                    FROM audit_log 
                    WHERE table_name = 'contacts_secure'
                        AND user_id = $1
                        AND operation_timestamp > NOW() - INTERVAL '1 minute'
                    ORDER BY operation_timestamp DESC
                    LIMIT 1
                `, [adminContext.userId]);
                
                const audit = auditResult.rows[0];
                expect(audit.user_id).toBe(adminContext.userId);
                expect(audit.ip_address).toBe(adminContext.ipAddress);
                expect(audit.access_reason).toBe('Testing audit completeness');
                expect(audit.sensitivity_level).toBe('high');
                
            } finally {
                client.release();
            }
        });
    });

    describe('🏥 Secure Contact Model', () => {
        test('should create contact with proper encryption', async () => {
            const contactData = {
                email: 'test@example.com',
                phone: '+1234567890',
                firstName: 'John',
                lastName: 'Doe',
                company: 'Test Company',
                gdprConsent: true,
                gdprLawfulBasis: 'consent'
            };
            
            const result = await SecureContactModel.createContact(
                contactData,
                adminContext,
                'Creating test contact for security testing'
            );
            
            expect(result.success).toBe(true);
            expect(result.contactUuid).toBeTruthy();
            
            testContactUuid = result.contactUuid;
        });

        test('should find contact by email hash', async () => {
            const result = await SecureContactModel.findContactByEmail(
                'test@example.com',
                adminContext,
                'Finding test contact for verification'
            );
            
            expect(result.success).toBe(true);
            expect(result.contacts).toHaveLength(1);
            expect(result.contacts[0].uuid).toBe(testContactUuid);
        });

        test('should retrieve contact details with authorization', async () => {
            const result = await SecureContactModel.getContactDetails(
                testContactUuid,
                adminContext,
                'Retrieving contact details for security testing'
            );
            
            expect(result.success).toBe(true);
            expect(result.contact.email).toBe('test@example.com');
            expect(result.contact.first_name).toBe('John');
            expect(result.contact.last_name).toBe('Doe');
        });

        test('should prevent unauthorized access to contact details', async () => {
            await expect(
                SecureContactModel.getContactDetails(
                    testContactUuid,
                    userContext,
                    'Unauthorized access attempt'
                )
            ).rejects.toThrow('Contact not found or access denied');
        });

        test('should update contact with proper validation', async () => {
            const updateData = {
                firstName: 'Jane',
                company: 'Updated Company'
            };
            
            const result = await SecureContactModel.updateContact(
                testContactUuid,
                updateData,
                adminContext,
                'Updating contact for security testing'
            );
            
            expect(result.success).toBe(true);
        });

        test('should mark contact for deletion (GDPR)', async () => {
            const result = await SecureContactModel.markForDeletion(
                testContactUuid,
                adminContext,
                'GDPR right to be forgotten request for test contact'
            );
            
            expect(result.success).toBe(true);
            expect(result.deletionDate).toBeTruthy();
        });
    });

    describe('📈 Security Monitoring', () => {
        test('should detect suspicious activity', async () => {
            const result = await SecureContactModel.detectSuspiciousActivity(adminContext);
            
            expect(result.success).toBe(true);
            expect(Array.isArray(result.alerts)).toBe(true);
            expect(result.alertCount).toBeGreaterThanOrEqual(0);
        });

        test('should generate compliance report', async () => {
            const result = await SecureContactModel.getComplianceReport(adminContext);
            
            expect(result.success).toBe(true);
            expect(result.report).toBeTruthy();
            expect(result.report).toContain('SECURITY COMPLIANCE REPORT');
            expect(result.generatedBy).toBe(adminContext.userId);
        });

        test('should perform health check', async () => {
            const result = await SecureContactModel.healthCheck();
            
            expect(result.success).toBe(true);
            expect(result.database).toBe('connected');
            expect(result.encryption.encryption_works).toBe(true);
            expect(result.encryption.decryption_works).toBe(true);
        });
    });

    describe('🚫 Security Vulnerabilities', () => {
        test('should prevent SQL injection in secure functions', async () => {
            const maliciousEmail = "'; DROP TABLE contacts_secure; --";
            
            await expect(
                SecureContactModel.findContactByEmail(
                    maliciousEmail,
                    adminContext,
                    'Testing SQL injection prevention'
                )
            ).rejects.toThrow();
        });

        test('should validate GDPR requirements', async () => {
            const invalidContactData = {
                email: 'test2@example.com',
                gdprConsent: false, // Invalid: no consent
                gdprLawfulBasis: null // Invalid: no lawful basis
            };
            
            await expect(
                SecureContactModel.createContact(
                    invalidContactData,
                    adminContext,
                    'Testing GDPR validation'
                )
            ).rejects.toThrow();
        });

        test('should require proper access reasons', async () => {
            await expect(
                SecureContactModel.getContactDetails(
                    testContactUuid,
                    adminContext,
                    'short' // Too short access reason
                )
            ).rejects.toThrow();
        });

        test('should prevent unauthorized role access', async () => {
            const unauthorizedContext = new SecurityContext(
                999, 'test-session', '127.0.0.1', 'test-agent', 'user'
            );
            
            await expect(
                SecureContactModel.getComplianceReport(unauthorizedContext)
            ).rejects.toThrow('Insufficient permissions');
        });
    });
});
