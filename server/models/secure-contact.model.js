/**
 * 🔒 SECURE CONTACT MODEL - ENCRYPTED USER DATA HANDLING
 * 
 * This model provides secure access to the encrypted user information database
 * with proper validation, sanitization, and audit logging.
 * 
 * SECURITY FEATURES:
 * - Field-level encryption for all PII
 * - Input validation and sanitization
 * - Comprehensive audit logging
 * - Role-based access control
 * - GDPR/CCPA compliance
 */

const { Pool } = require('pg');
const crypto = require('crypto');

// Secure database connection for user information
const secureDbConfig = {
    host: process.env.USER_DB_HOST || 'localhost',
    port: process.env.USER_DB_PORT || 5432,
    database: process.env.USER_DB_NAME || 'user_information',
    user: process.env.USER_DB_USER || 'app_service_user',
    password: process.env.USER_DB_PASSWORD,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 2, // EMERGENCY: Reduced from 20 for 500MB RAM limit
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    // Security settings
    application_name: 'kutt_b2b_secure_api',
    statement_timeout: 30000, // 30 second timeout
    query_timeout: 30000
};

const securePool = new Pool(secureDbConfig);

// Security context management
class SecurityContext {
    constructor(userId, sessionId, ipAddress, userAgent, userRole = 'user') {
        this.userId = userId;
        this.sessionId = sessionId;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.userRole = userRole;
    }

    async setContext(client) {
        await client.query('SELECT set_config($1, $2, true)', ['app.current_user_id', this.userId.toString()]);
        await client.query('SELECT set_config($1, $2, true)', ['app.session_id', this.sessionId]);
        await client.query('SELECT set_config($1, $2, true)', ['app.client_ip', this.ipAddress]);
        await client.query('SELECT set_config($1, $2, true)', ['app.user_agent', this.userAgent]);
        await client.query('SELECT set_config($1, $2, true)', ['app.user_role', this.userRole]);
    }
}

class SecureContactModel {
    /**
     * Create a new contact with encrypted PII
     */
    static async createContact(contactData, securityContext, accessReason) {
        const client = await securePool.connect();

        try {
            // Set security context
            await securityContext.setContext(client);
            await client.query('SELECT set_config($1, $2, true)', ['app.access_reason', accessReason]);

            // Validate required fields
            if (!contactData.email && !contactData.phone) {
                throw new Error('Either email or phone is required');
            }

            // Validate GDPR compliance
            if (!contactData.gdprConsent || !contactData.gdprLawfulBasis) {
                throw new Error('GDPR consent and lawful basis are required');
            }

            // Call secure insert function
            const result = await client.query(`
                SELECT insert_contact_secure(
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
                ) as contact_uuid
            `, [
                contactData.email || null,
                contactData.phone || null,
                contactData.firstName || null,
                contactData.lastName || null,
                contactData.company || null,
                contactData.jobTitle || null,
                contactData.source || 'web_form',
                contactData.sourceReferenceId || null,
                contactData.customFields ? JSON.stringify(contactData.customFields) : null,
                contactData.gdprConsent,
                contactData.gdprLawfulBasis,
                securityContext.userId
            ]);

            return {
                success: true,
                contactUuid: result.rows[0].contact_uuid,
                message: 'Contact created successfully'
            };

        } catch (error) {
            console.error('🚨 Secure contact creation failed:', error);
            throw new Error(`Contact creation failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /**
     * Find contact by email (returns only non-PII data)
     */
    static async findContactByEmail(email, securityContext, accessReason) {
        const client = await securePool.connect();

        try {
            // Set security context
            await securityContext.setContext(client);
            await client.query('SELECT set_config($1, $2, true)', ['app.access_reason', accessReason]);

            // Use secure search function
            const result = await client.query(`
                SELECT contact_id, uuid, lifecycle_stage
                FROM find_contact_by_email($1)
            `, [email]);

            return {
                success: true,
                contacts: result.rows,
                count: result.rows.length
            };

        } catch (error) {
            console.error('🚨 Secure contact search failed:', error);
            throw new Error(`Contact search failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /**
     * Get contact details with proper authorization
     */
    static async getContactDetails(contactUuid, securityContext, accessReason) {
        const client = await securePool.connect();

        try {
            // Set security context
            await securityContext.setContext(client);

            // Validate access reason
            if (!accessReason || accessReason.length < 10) {
                throw new Error('Access reason must be at least 10 characters');
            }

            // Use secure get function
            const result = await client.query(`
                SELECT id, email, phone, first_name, last_name, company, lifecycle_stage, created_at
                FROM get_contact_details($1, $2)
            `, [contactUuid, accessReason]);

            if (result.rows.length === 0) {
                throw new Error('Contact not found or access denied');
            }

            return {
                success: true,
                contact: result.rows[0]
            };

        } catch (error) {
            console.error('🚨 Secure contact retrieval failed:', error);
            throw new Error(`Contact retrieval failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /**
     * Update contact with validation and encryption
     */
    static async updateContact(contactUuid, updateData, securityContext, updateReason) {
        const client = await securePool.connect();

        try {
            // Set security context
            await securityContext.setContext(client);

            // Validate update reason
            if (!updateReason || updateReason.length < 10) {
                throw new Error('Update reason must be at least 10 characters');
            }

            // Call secure update function
            const result = await client.query(`
                SELECT update_contact_secure($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) as success
            `, [
                contactUuid,
                updateData.email || null,
                updateData.phone || null,
                updateData.firstName || null,
                updateData.lastName || null,
                updateData.company || null,
                updateData.jobTitle || null,
                updateData.customFields ? JSON.stringify(updateData.customFields) : null,
                securityContext.userId,
                updateReason
            ]);

            return {
                success: result.rows[0].success,
                message: 'Contact updated successfully'
            };

        } catch (error) {
            console.error('🚨 Secure contact update failed:', error);
            throw new Error(`Contact update failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /**
     * Mark contact for deletion (GDPR right to be forgotten)
     */
    static async markForDeletion(contactUuid, securityContext, deletionReason) {
        const client = await securePool.connect();

        try {
            // Set security context
            await securityContext.setContext(client);

            // Validate deletion reason
            if (!deletionReason || deletionReason.length < 10) {
                throw new Error('Deletion reason must be at least 10 characters');
            }

            // Call deletion function
            const result = await client.query(`
                SELECT mark_for_deletion($1, $2) as success
            `, [contactUuid, deletionReason]);

            return {
                success: result.rows[0].success,
                message: 'Contact marked for deletion successfully',
                deletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
            };

        } catch (error) {
            console.error('🚨 Contact deletion marking failed:', error);
            throw new Error(`Deletion marking failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /**
     * Get analytics data (non-PII only)
     */
    static async getAnalytics(securityContext, accessReason) {
        const client = await securePool.connect();

        try {
            // Set security context for analytics
            await securityContext.setContext(client);
            await client.query('SELECT set_config($1, $2, true)', ['app.access_reason', accessReason]);
            await client.query('SELECT set_config($1, $2, true)', ['app.access_purpose', 'analytics']);

            // Get analytics data from secure view
            const result = await client.query(`
                SELECT 
                    lifecycle_stage,
                    source,
                    country_code,
                    COUNT(*) as contact_count,
                    COUNT(CASE WHEN email_opt_in = true THEN 1 END) as email_subscribers,
                    COUNT(CASE WHEN sms_opt_in = true THEN 1 END) as sms_subscribers,
                    AVG(data_quality_score) as avg_quality_score,
                    COUNT(CASE WHEN engagement_status = 'active' THEN 1 END) as active_contacts
                FROM contacts_analytics
                WHERE created_at > NOW() - INTERVAL '90 days'
                GROUP BY lifecycle_stage, source, country_code
                ORDER BY contact_count DESC
            `);

            return {
                success: true,
                analytics: result.rows,
                generatedAt: new Date()
            };

        } catch (error) {
            console.error('🚨 Analytics retrieval failed:', error);
            throw new Error(`Analytics retrieval failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /**
     * Generate security compliance report
     */
    static async getComplianceReport(securityContext) {
        const client = await securePool.connect();

        try {
            // Only allow admin or auditor roles
            if (!['admin', 'auditor'].includes(securityContext.userRole)) {
                throw new Error('Insufficient permissions for compliance report');
            }

            // Set security context
            await securityContext.setContext(client);
            await client.query('SELECT set_config($1, $2, true)', ['app.access_reason', 'Security compliance report generation']);

            // Generate compliance report
            const result = await client.query(`
                SELECT generate_security_compliance_report() as report
            `);

            return {
                success: true,
                report: result.rows[0].report,
                generatedAt: new Date(),
                generatedBy: securityContext.userId
            };

        } catch (error) {
            console.error('🚨 Compliance report generation failed:', error);
            throw new Error(`Compliance report failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /**
     * Detect suspicious activity
     */
    static async detectSuspiciousActivity(securityContext) {
        const client = await securePool.connect();

        try {
            // Only allow admin or auditor roles
            if (!['admin', 'auditor'].includes(securityContext.userRole)) {
                throw new Error('Insufficient permissions for security analysis');
            }

            // Set security context
            await securityContext.setContext(client);

            // Detect suspicious activity
            const result = await client.query(`
                SELECT alert_type, severity, description, affected_records, time_window
                FROM detect_suspicious_activity()
            `);

            return {
                success: true,
                alerts: result.rows,
                alertCount: result.rows.length,
                generatedAt: new Date()
            };

        } catch (error) {
            console.error('🚨 Suspicious activity detection failed:', error);
            throw new Error(`Security analysis failed: ${error.message}`);
        } finally {
            client.release();
        }
    }

    /**
     * Health check for secure database
     */
    static async healthCheck() {
        const client = await securePool.connect();

        try {
            // Test basic connectivity
            await client.query('SELECT 1');

            // Test encryption functions
            const encryptTest = await client.query(`
                SELECT 
                    encrypt_pii('test') IS NOT NULL as encryption_works,
                    decrypt_pii(encrypt_pii('test')) = 'test' as decryption_works
            `);

            // Get connection pool status
            const poolStatus = {
                totalConnections: securePool.totalCount,
                idleConnections: securePool.idleCount,
                waitingClients: securePool.waitingCount
            };

            return {
                success: true,
                database: 'connected',
                encryption: encryptTest.rows[0],
                connectionPool: poolStatus,
                timestamp: new Date()
            };

        } catch (error) {
            console.error('🚨 Secure database health check failed:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date()
            };
        } finally {
            client.release();
        }
    }
}

// Graceful shutdown
process.on('SIGINT', async() => {
    console.log('🔒 Closing secure database connections...');
    await securePool.end();
    process.exit(0);
});

process.on('SIGTERM', async() => {
    console.log('🔒 Closing secure database connections...');
    await securePool.end();
    process.exit(0);
});

module.exports = {
    SecureContactModel,
    SecurityContext
};