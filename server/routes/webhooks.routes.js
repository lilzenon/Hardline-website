const { Router } = require("express");
const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const instagramHandler = require("../handlers/instagram-integration.handler");
const smsHandler = require("../handlers/sms-integration.handler");

const router = Router();

// Optimized webhook logging middleware
const webhookLoggingMiddleware = (req, res, next) => {
    // Get log level from environment or default to NORMAL
    const LOG_LEVELS = { MINIMAL: 1, NORMAL: 2, VERBOSE: 3, DEBUG: 4 };
    const logLevel = LOG_LEVELS[process.env.LOG_LEVEL && process.env.LOG_LEVEL.toUpperCase()] || LOG_LEVELS.NORMAL;

    // Only add detailed logging at VERBOSE+ levels, and only if not already logged by global middleware
    if (logLevel >= LOG_LEVELS.VERBOSE) {
        const requestId = req.requestId || 'unknown';
        console.log(`📡 Webhook Route Processing (${requestId})`);

        // Log body for webhook POST requests at VERBOSE level
        if (req.method === 'POST' && req.body && Object.keys(req.body).length > 0) {
            console.log(`📡 Body: ${JSON.stringify(req.body, null, 2)}`);
        }
    }

    next();
};

// Middleware to capture raw body for webhook signature verification
const rawBodyMiddleware = (req, res, next) => {
    if (req.path === '/instagram' && req.method === 'POST') {
        console.log('🔍 Raw body middleware activated for Instagram webhook');

        const chunks = [];

        req.on('data', (chunk) => {
            console.log('🔍 Received chunk:', chunk.length, 'bytes');
            chunks.push(chunk);
        });

        req.on('end', () => {
            const rawBody = Buffer.concat(chunks);
            console.log('🔍 Raw body complete:', rawBody.length, 'bytes');

            // Store both raw buffer and string version
            req.rawBody = rawBody.toString('utf8');
            req.rawBodyBuffer = rawBody;

            try {
                req.body = JSON.parse(req.rawBody);
                console.log('🔍 Body parsed successfully');
            } catch (error) {
                console.error('❌ Error parsing webhook JSON:', error);
                return res.status(400).send('Invalid JSON');
            }
            next();
        });

        req.on('error', (error) => {
            console.error('❌ Error reading webhook body:', error);
            next(error);
        });
    } else {
        console.log('🔍 Raw body middleware skipped for:', req.method, req.path);
        next();
    }
};

/**
 * Instagram Webhook Routes
 * These routes handle webhook verification and incoming webhook events from Instagram
 */

// Debug endpoint - MUST come first to avoid being caught by main route
router.all(
    "/instagram/debug",
    asyncHandler((req, res) => {
        console.log('🔍 DEBUG: Instagram webhook debug endpoint hit');
        console.log('🔍 DEBUG: Method:', req.method);
        console.log('🔍 DEBUG: URL:', req.url);
        console.log('🔍 DEBUG: Original URL:', req.originalUrl);
        console.log('🔍 DEBUG: Headers:', JSON.stringify(req.headers, null, 2));
        console.log('🔍 DEBUG: Query:', JSON.stringify(req.query, null, 2));
        console.log('🔍 DEBUG: Body:', JSON.stringify(req.body, null, 2));
        console.log('🔍 DEBUG: IP:', req.ip);

        res.json({
            success: true,
            message: "Debug endpoint working",
            method: req.method,
            url: req.url,
            originalUrl: req.originalUrl,
            headers: req.headers,
            query: req.query,
            body: req.body,
            ip: req.ip,
            timestamp: new Date().toISOString()
        });
    })
);

// External accessibility test endpoint
router.all(
    "/instagram/external-test",
    asyncHandler((req, res) => {
        console.log('🌐 EXTERNAL TEST: Webhook accessibility test');
        console.log('🌐 Method:', req.method);
        console.log('🌐 IP:', req.ip);
        console.log('🌐 User Agent:', req.headers['user-agent']);
        console.log('🌐 Headers:', JSON.stringify(req.headers, null, 2));
        console.log('🌐 Body:', JSON.stringify(req.body, null, 2));

        res.status(200).json({
            success: true,
            message: "External webhook test successful",
            method: req.method,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
            timestamp: new Date().toISOString(),
            note: "This endpoint confirms external accessibility"
        });
    })
);

// Meta webhook URL verification endpoint
router.all(
    "/instagram/meta-test",
    asyncHandler((req, res) => {
        console.log('🚨 META TEST ENDPOINT - Confirms Meta can reach server');

        // Handle both GET (verification) and POST (webhook) requests
        if (req.method === 'GET' && req.query['hub.challenge']) {
            console.log('🚨 Webhook verification request from Meta');
            return res.status(200).send(req.query['hub.challenge']);
        }

        res.status(200).json({
            success: true,
            message: "Meta test endpoint working",
            method: req.method,
            timestamp: new Date().toISOString(),
            note: "If you see this in logs, Meta can reach your server"
        });
    })
);

// Test endpoint - also comes before main route
router.get(
    "/instagram/test",
    asyncHandler((req, res) => {
        console.log('🧪 Instagram webhook test endpoint accessed');
        console.log('🧪 Query params:', req.query);
        console.log('🧪 Headers:', req.headers);
        res.json({
            success: true,
            message: "Instagram webhook endpoint is reachable",
            timestamp: new Date().toISOString(),
            query: req.query,
            headers: req.headers
        });
    })
);

// Instagram Messaging API Readiness Check
router.get(
    "/instagram/readiness-check",
    asyncHandler(async(req, res) => {
        const axios = require('axios');
        const knex = require('../knex');

        console.log('🔍 Starting comprehensive Instagram Messaging API readiness check...');

        const readinessReport = {
            timestamp: new Date().toISOString(),
            overall_status: 'CHECKING',
            requirements: {},
            recommendations: [],
            next_steps: []
        };

        // 1. Environment Variables Check
        readinessReport.requirements.environment = {
            facebook_app_id: {
                value: process.env.FACEBOOK_APP_ID || 'NOT SET',
                status: process.env.FACEBOOK_APP_ID === '2364553920613507' ? '✅ CORRECT' : '❌ INCORRECT',
                required: '2364553920613507'
            },
            facebook_app_secret: {
                status: process.env.FACEBOOK_APP_SECRET ? '✅ SET' : '❌ NOT SET',
                note: 'Hidden for security'
            },
            facebook_redirect_uri: {
                value: process.env.FACEBOOK_REDIRECT_URI || 'NOT SET',
                status: process.env.FACEBOOK_REDIRECT_URI ? '✅ SET' : '❌ NOT SET'
            },
            instagram_webhook_verify_token: {
                status: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN ? '✅ SET' : '❌ NOT SET'
            }
        };

        // 2. Database Instagram Account Check
        try {
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .where('is_active', true)
                .select('*');

            readinessReport.requirements.database = {
                instagram_accounts_found: accounts.length,
                status: accounts.length > 0 ? '✅ FOUND' : '❌ NO ACCOUNTS',
                accounts: accounts.map(acc => ({
                    username: acc.platform_username,
                    account_id: acc.platform_account_id,
                    has_access_token: !!acc.access_token,
                    token_preview: acc.access_token ? acc.access_token.substring(0, 20) + '...' : 'MISSING',
                    metadata: acc.account_metadata ? JSON.parse(acc.account_metadata) : null
                }))
            };

            // 3. Page Access Token Analysis (CORRECTED for Messenger Platform)
            if (accounts.length > 0 && accounts[0].access_token) {
                const account = accounts[0];
                let metadata;

                try {
                    metadata = typeof account.account_metadata === 'string' ?
                        JSON.parse(account.account_metadata) :
                        account.account_metadata;
                } catch (parseError) {
                    readinessReport.requirements.access_token = {
                        status: '❌ METADATA ERROR',
                        error: 'Cannot parse account metadata'
                    };
                    return;
                }

                if (metadata && metadata.page_id) {
                    try {
                        // CORRECTED: Test Page Access Token by accessing the Facebook Page
                        // This validates that we have a proper Page Access Token for Messenger Platform
                        const pageCheck = await axios.get(`https://graph.facebook.com/v23.0/${metadata.page_id}`, {
                            params: {
                                access_token: account.access_token,
                                fields: 'id,name,access_token,instagram_business_account'
                            }
                        });

                        // Test Messenger Platform messaging capability
                        let messagingCapable = false;
                        try {
                            // Try to access conversations endpoint (will fail but with specific error)
                            await axios.get(`https://graph.facebook.com/v23.0/${metadata.page_id}/conversations`, {
                                params: {
                                    access_token: account.access_token,
                                    fields: 'id'
                                }
                            });
                            messagingCapable = true;
                        } catch (msgError) {
                            // Error code 3 = no capability, other errors = likely has capability
                            const errorCode = msgError.response && msgError.response.data && msgError.response.data.error && msgError.response.data.error.code;
                            messagingCapable = errorCode !== 3;
                        }

                        readinessReport.requirements.access_token = {
                            status: '✅ VALID PAGE ACCESS TOKEN',
                            token_type: 'Page Access Token',
                            page_name: pageCheck.data.name,
                            page_id: pageCheck.data.id,
                            instagram_connected: !!pageCheck.data.instagram_business_account,
                            messaging_capable: messagingCapable,
                            note: 'Correct token type for Messenger Platform Instagram messaging'
                        };

                    } catch (tokenError) {
                        const errorCode = tokenError.response && tokenError.response.data && tokenError.response.data.error && tokenError.response.data.error.code;
                        const errorMessage = (tokenError.response && tokenError.response.data && tokenError.response.data.error && tokenError.response.data.error.message) || tokenError.message;

                        readinessReport.requirements.access_token = {
                            status: '❌ INVALID PAGE ACCESS TOKEN',
                            error: errorMessage,
                            error_code: errorCode,
                            note: errorCode === 3 ? 'Application does not have messaging capability' : 'Page Access Token may be expired or invalid'
                        };
                    }
                } else {
                    readinessReport.requirements.access_token = {
                        status: '❌ MISSING PAGE ID',
                        note: 'Cannot validate Page Access Token without page_id in metadata'
                    };
                }
            } else {
                readinessReport.requirements.access_token = {
                    status: '❌ MISSING',
                    note: 'No access token found in database'
                };
            }

        } catch (dbError) {
            readinessReport.requirements.database = {
                status: '❌ ERROR',
                error: dbError.message
            };
        }

        // 4. Facebook Page Connection Check
        try {
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .where('is_active', true)
                .first();

            if (accounts && accounts.access_token && accounts.account_metadata) {
                const metadata = JSON.parse(accounts.account_metadata);

                if (metadata.page_id && metadata.page_name) {
                    // Try to access the Facebook Page
                    try {
                        const pageCheck = await axios.get(`https://graph.facebook.com/v23.0/${metadata.page_id}`, {
                            params: {
                                access_token: accounts.access_token,
                                fields: 'id,name,category,instagram_business_account'
                            }
                        });

                        readinessReport.requirements.facebook_page = {
                            status: '✅ CONNECTED',
                            page_id: metadata.page_id,
                            page_name: metadata.page_name,
                            instagram_connected: !!pageCheck.data.instagram_business_account,
                            instagram_account_id: (pageCheck.data.instagram_business_account && pageCheck.data.instagram_business_account.id) || 'Not found'
                        };
                    } catch (pageError) {
                        readinessReport.requirements.facebook_page = {
                            status: '❌ ACCESS DENIED',
                            page_id: metadata.page_id,
                            page_name: metadata.page_name,
                            error: (pageError.response && pageError.response.data && pageError.response.data.error && pageError.response.data.error.message) || 'Cannot access Facebook Page'
                        };
                    }
                } else {
                    readinessReport.requirements.facebook_page = {
                        status: '❌ NOT FOUND',
                        note: 'No Facebook Page information in account metadata'
                    };
                }
            } else {
                readinessReport.requirements.facebook_page = {
                    status: '❌ NO DATA',
                    note: 'No Instagram account or metadata found'
                };
            }
        } catch (error) {
            readinessReport.requirements.facebook_page = {
                status: '❌ ERROR',
                error: error.message
            };
        }

        // 5. Generate Overall Status and Recommendations
        const allChecks = [
            readinessReport.requirements.environment && readinessReport.requirements.environment.facebook_app_id && readinessReport.requirements.environment.facebook_app_id.status && readinessReport.requirements.environment.facebook_app_id.status.includes('✅'),
            readinessReport.requirements.environment && readinessReport.requirements.environment.facebook_app_secret && readinessReport.requirements.environment.facebook_app_secret.status && readinessReport.requirements.environment.facebook_app_secret.status.includes('✅'),
            readinessReport.requirements.database && readinessReport.requirements.database.status && readinessReport.requirements.database.status.includes('✅'),
            readinessReport.requirements.access_token && readinessReport.requirements.access_token.status && readinessReport.requirements.access_token.status.includes('✅'),
            readinessReport.requirements.facebook_page && readinessReport.requirements.facebook_page.status && readinessReport.requirements.facebook_page.status.includes('✅')
        ];

        const passedChecks = allChecks.filter(Boolean).length;
        const totalChecks = allChecks.length;

        if (passedChecks === totalChecks) {
            readinessReport.overall_status = '✅ READY FOR INSTAGRAM MESSAGING VIA MESSENGER PLATFORM';
            readinessReport.next_steps = [
                '1. Update webhook URL in Meta App Dashboard to: /api/webhooks/messenger',
                '2. Test DM sending to app testers (bounce2bounce_, zenon.mp3)',
                '3. Verify webhook events are properly configured',
                '4. Submit app review for Advanced Access if needed for production'
            ];
        } else {
            readinessReport.overall_status = `❌ NOT READY FOR MESSENGER PLATFORM (${passedChecks}/${totalChecks} checks passed)`;
            readinessReport.next_steps = [
                'Fix the failing requirements above',
                'Reconnect Instagram using Messenger Platform OAuth flow',
                'Ensure Facebook Page is connected to Instagram Business account',
                'Add Messenger Platform product to Meta App Dashboard',
                'Configure webhook URL: /api/webhooks/messenger'
            ];
        }

        // Add specific recommendations based on findings
        if (!(readinessReport.requirements.environment && readinessReport.requirements.environment.facebook_app_id && readinessReport.requirements.environment.facebook_app_id.status && readinessReport.requirements.environment.facebook_app_id.status.includes('✅'))) {
            readinessReport.recommendations.push('Update FACEBOOK_APP_ID to 2364553920613507 in Render environment');
        }

        if (!(readinessReport.requirements.access_token && readinessReport.requirements.access_token.status && readinessReport.requirements.access_token.status.includes('✅'))) {
            readinessReport.recommendations.push('Reconnect Instagram to get Page Access Token for Messenger Platform');
        }

        if (!(readinessReport.requirements.facebook_page && readinessReport.requirements.facebook_page.status && readinessReport.requirements.facebook_page.status.includes('✅'))) {
            readinessReport.recommendations.push('Ensure Instagram Business account is connected to Facebook Page');
        }

        // Add Messenger Platform specific recommendations
        if (readinessReport.requirements.access_token && readinessReport.requirements.access_token.messaging_capable === false) {
            readinessReport.recommendations.push('Add Messenger Platform product to Meta App Dashboard');
            readinessReport.recommendations.push('Configure webhook subscriptions for Instagram messaging');
        }

        console.log('✅ Readiness check completed:', readinessReport.overall_status);
        res.json(readinessReport);
    })
);

// Fix corrupted Instagram account metadata for Messenger Platform
router.get(
    "/instagram/fix-metadata",
    asyncHandler(async(req, res) => {
        const axios = require('axios');
        const knex = require('../knex');

        console.log('🔧 Starting Instagram account metadata repair for Messenger Platform...');

        try {
            // Get all Instagram accounts with potentially corrupted metadata
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .select('*');

            const results = [];

            for (const account of accounts) {
                const result = {
                    id: account.id,
                    username: account.platform_username,
                    original_metadata: account.account_metadata,
                    status: 'checking'
                };

                // Check if metadata is corrupted
                let metadata;
                let isCorrupted = false;

                try {
                    if (typeof account.account_metadata === 'string') {
                        if (account.account_metadata === '[object Object]') {
                            isCorrupted = true;
                            result.corruption_type = 'object_string_conversion';
                        } else {
                            metadata = JSON.parse(account.account_metadata);
                        }
                    } else {
                        metadata = account.account_metadata;
                    }
                } catch (parseError) {
                    isCorrupted = true;
                    result.corruption_type = 'invalid_json';
                    result.parse_error = parseError.message;
                }

                if (isCorrupted || !metadata || !metadata.page_id) {
                    console.log(`🔧 Repairing corrupted metadata for account: ${account.platform_username}`);

                    // Attempt to reconstruct metadata using Facebook API
                    if (account.access_token) {
                        try {
                            // Try to get user's pages to find the correct page_id
                            const pagesResponse = await axios.get('https://graph.facebook.com/v23.0/me/accounts', {
                                params: {
                                    access_token: account.access_token,
                                    fields: 'id,name,access_token,instagram_business_account{id,username}'
                                }
                            });

                            // Find the page that matches this Instagram account
                            const matchingPage = pagesResponse.data.data.find(page =>
                                page.instagram_business_account &&
                                page.instagram_business_account.id === account.platform_account_id
                            );

                            if (matchingPage) {
                                const repairedMetadata = {
                                    page_id: matchingPage.id,
                                    page_name: matchingPage.name,
                                    user_access_token: account.access_token, // Store original token as user token
                                    repaired_at: new Date().toISOString(),
                                    repair_method: 'facebook_api_lookup'
                                };

                                // Update database with repaired metadata and Page Access Token
                                await knex('social_media_accounts')
                                    .where('id', account.id)
                                    .update({
                                        account_metadata: JSON.stringify(repairedMetadata),
                                        access_token: matchingPage.access_token || account.access_token, // Use Page Access Token if available
                                        last_sync_at: new Date()
                                    });

                                result.status = 'repaired';
                                result.repaired_metadata = repairedMetadata;
                                result.page_access_token_updated = !!matchingPage.access_token;

                                console.log(`✅ Successfully repaired metadata for ${account.platform_username}`);
                            } else {
                                result.status = 'no_matching_page';
                                result.error = 'Could not find Facebook Page matching this Instagram account';
                            }
                        } catch (apiError) {
                            result.status = 'api_error';
                            result.error = (apiError.response && apiError.response.data && apiError.response.data.error && apiError.response.data.error.message) || apiError.message;
                            console.error(`❌ API error repairing ${account.platform_username}:`, result.error);
                        }
                    } else {
                        result.status = 'no_access_token';
                        result.error = 'No access token available for repair';
                    }
                } else {
                    result.status = 'valid';
                    result.current_metadata = metadata;
                }

                results.push(result);
            }

            // Generate summary
            const summary = {
                total_accounts: results.length,
                repaired: results.filter(r => r.status === 'repaired').length,
                valid: results.filter(r => r.status === 'valid').length,
                errors: results.filter(r => r.status.includes('error') || r.status.includes('no_')).length
            };

            res.json({
                success: true,
                message: 'Instagram metadata repair completed for Messenger Platform',
                summary: summary,
                results: results,
                next_steps: [
                    'If any accounts were repaired, test the readiness check',
                    'If no repairs possible, reconnect Instagram with new permissions',
                    'Verify Page Access Tokens are properly stored'
                ],
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Metadata repair failed:', error);
            res.status(500).json({
                success: false,
                error: 'Metadata repair failed',
                details: error.message,
                timestamp: new Date().toISOString()
            });
        }
    })
);

// Fix corrupted Instagram account metadata (POST version)
router.post(
    "/instagram/fix-metadata",
    asyncHandler(async(req, res) => {
        const knex = require('../knex');

        console.log('🔧 Starting Instagram account metadata repair...');

        try {
            // Get all Instagram accounts with corrupted metadata
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .select('*');

            const results = [];

            for (const account of accounts) {
                const result = {
                    id: account.id,
                    username: account.platform_username,
                    original_metadata: account.account_metadata,
                    status: 'checking'
                };

                // Check if metadata is corrupted
                if (account.account_metadata === '[object Object]' ||
                    (typeof account.account_metadata === 'string' && account.account_metadata.includes('[object Object]'))) {

                    console.log(`🔧 Fixing corrupted metadata for account: ${account.platform_username}`);

                    // Set to null to force reconnection
                    await knex('social_media_accounts')
                        .where('id', account.id)
                        .update({
                            account_metadata: null,
                            updated_at: new Date()
                        });

                    result.status = '✅ FIXED - metadata cleared, reconnection required';
                    result.action = 'Metadata cleared - please reconnect Instagram';

                } else if (account.account_metadata) {
                    try {
                        // Try to parse existing metadata
                        const parsed = JSON.parse(account.account_metadata);
                        result.status = '✅ VALID - no fix needed';
                        result.parsed_metadata = parsed;
                    } catch (parseError) {
                        // Invalid JSON, clear it
                        await knex('social_media_accounts')
                            .where('id', account.id)
                            .update({
                                account_metadata: null,
                                updated_at: new Date()
                            });

                        result.status = '✅ FIXED - invalid JSON cleared';
                        result.action = 'Invalid JSON cleared - please reconnect Instagram';
                    }
                } else {
                    result.status = '⚠️ NULL - reconnection needed';
                    result.action = 'No metadata - please connect Instagram';
                }

                results.push(result);
            }

            res.json({
                success: true,
                message: 'Instagram metadata repair completed',
                accounts_processed: results.length,
                results: results,
                next_step: 'Reconnect Instagram in dashboard to generate fresh metadata',
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Metadata repair failed:', error);
            res.json({
                error: 'Metadata repair failed',
                details: error.message,
                timestamp: new Date().toISOString()
            });
        }
    })
);

// Force fix corrupted metadata - simple clear and reconnect approach
router.get(
    "/instagram/force-fix-metadata",
    asyncHandler(async(req, res) => {
        const knex = require('../knex');

        console.log('🔧 FORCE FIX: Clearing all corrupted Instagram metadata...');

        try {
            // Get all Instagram accounts
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .select('id', 'platform_username', 'account_metadata');

            const results = [];

            for (const account of accounts) {
                let needsRepair = false;
                let corruptionType = 'none';

                // Check for corruption
                if (account.account_metadata === '[object Object]') {
                    needsRepair = true;
                    corruptionType = 'object_string';
                } else if (typeof account.account_metadata === 'string' && account.account_metadata.includes('[object Object]')) {
                    needsRepair = true;
                    corruptionType = 'partial_object_string';
                } else if (account.account_metadata) {
                    try {
                        JSON.parse(account.account_metadata);
                    } catch (e) {
                        needsRepair = true;
                        corruptionType = 'invalid_json';
                    }
                }

                if (needsRepair) {
                    // Clear corrupted metadata
                    await knex('social_media_accounts')
                        .where('id', account.id)
                        .update({
                            account_metadata: null,
                            last_sync_at: new Date()
                        });

                    results.push({
                        username: account.platform_username,
                        status: 'CLEARED',
                        corruption_type: corruptionType,
                        action: 'Metadata cleared - reconnection required'
                    });

                    console.log(`✅ Cleared corrupted metadata for: ${account.platform_username}`);
                } else {
                    results.push({
                        username: account.platform_username,
                        status: 'VALID',
                        action: 'No repair needed'
                    });
                }
            }

            res.json({
                success: true,
                message: 'Force fix completed - all corrupted metadata cleared',
                accounts_processed: accounts.length,
                accounts_repaired: results.filter(r => r.status === 'CLEARED').length,
                results: results,
                next_step: 'Reconnect Instagram: https://b2b.click/api/integrations/instagram/auth',
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Force fix failed:', error);
            res.status(500).json({
                success: false,
                error: 'Force fix failed',
                details: error.message
            });
        }
    })
);

// Fetch and populate missing Facebook Page metadata
router.get(
    "/instagram/fetch-page-data",
    asyncHandler(async(req, res) => {
        const axios = require('axios');
        const knex = require('../knex');

        console.log('📄 Fetching missing Facebook Page data for Instagram accounts...');

        try {
            // Get Instagram accounts without metadata
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .where('is_active', true)
                .select('*');

            const results = [];

            for (const account of accounts) {
                const result = {
                    username: account.platform_username,
                    account_id: account.platform_account_id,
                    current_metadata: account.account_metadata,
                    status: 'processing'
                };

                if (!account.access_token) {
                    result.status = '❌ NO ACCESS TOKEN';
                    result.action = 'Reconnect Instagram to get access token';
                    results.push(result);
                    continue;
                }

                try {
                    // Fetch user's Facebook Pages
                    console.log(`📄 Fetching Facebook Pages for ${account.platform_username}...`);
                    const pagesResponse = await axios.get('https://graph.facebook.com/v23.0/me/accounts', {
                        params: {
                            access_token: account.access_token,
                            fields: 'id,name,instagram_business_account'
                        }
                    });

                    const pages = pagesResponse.data.data || [];
                    console.log(`📄 Found ${pages.length} Facebook Pages`);

                    // Find the page connected to this Instagram account
                    let connectedPage = null;
                    for (const page of pages) {
                        if (page.instagram_business_account &&
                            page.instagram_business_account.id === account.platform_account_id) {
                            connectedPage = page;
                            break;
                        }
                    }

                    if (connectedPage) {
                        // Update account with Facebook Page metadata
                        const metadata = {
                            page_id: connectedPage.id,
                            page_name: connectedPage.name,
                            instagram_account_id: account.platform_account_id,
                            fetched_at: new Date().toISOString()
                        };

                        await knex('social_media_accounts')
                            .where('id', account.id)
                            .update({
                                account_metadata: JSON.stringify(metadata),
                                updated_at: new Date()
                            });

                        result.status = '✅ SUCCESS';
                        result.facebook_page = {
                            page_id: connectedPage.id,
                            page_name: connectedPage.name
                        };
                        result.action = 'Facebook Page metadata populated successfully';

                        console.log(`✅ Updated metadata for ${account.platform_username}: ${connectedPage.name}`);

                    } else {
                        result.status = '❌ NO CONNECTED PAGE';
                        result.available_pages = pages.map(p => ({
                            id: p.id,
                            name: p.name,
                            has_instagram: !!p.instagram_business_account
                        }));
                        result.action = 'No Facebook Page found connected to this Instagram account';
                    }

                } catch (apiError) {
                    result.status = '❌ API ERROR';
                    result.error = (apiError.response && apiError.response.data && apiError.response.data.error && apiError.response.data.error.message) || apiError.message;
                    result.action = 'Check access token permissions or reconnect Instagram';
                }

                results.push(result);
            }

            res.json({
                success: true,
                message: 'Facebook Page data fetch completed',
                accounts_processed: results.length,
                results: results,
                next_step: 'Run readiness check again to verify 5/5 status',
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Page data fetch failed:', error);
            res.json({
                error: 'Page data fetch failed',
                details: error.message,
                timestamp: new Date().toISOString()
            });
        }
    })
);

// Direct database fix for persistent metadata corruption
router.get(
    "/instagram/force-fix-metadata",
    asyncHandler(async(req, res) => {
        const axios = require('axios');
        const knex = require('../knex');

        console.log('🔧 FORCE FIX: Direct database metadata repair...');

        try {
            // Get Instagram accounts
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .select('*');

            const results = [];

            for (const account of accounts) {
                const result = {
                    id: account.id,
                    username: account.platform_username,
                    account_id: account.platform_account_id,
                    current_metadata: account.account_metadata,
                    status: 'processing'
                };

                if (!account.access_token) {
                    result.status = '❌ NO ACCESS TOKEN';
                    results.push(result);
                    continue;
                }

                try {
                    // Fetch Facebook Pages directly
                    console.log(`🔧 FORCE FIX: Fetching pages for ${account.platform_username}...`);
                    const pagesResponse = await axios.get('https://graph.facebook.com/v23.0/me/accounts', {
                        params: {
                            access_token: account.access_token,
                            fields: 'id,name,instagram_business_account'
                        }
                    });

                    const pages = pagesResponse.data.data || [];
                    let connectedPage = null;

                    // Find connected page
                    for (const page of pages) {
                        if (page.instagram_business_account &&
                            page.instagram_business_account.id === account.platform_account_id) {
                            connectedPage = page;
                            break;
                        }
                    }

                    if (connectedPage) {
                        // Create proper JSON metadata
                        const metadata = {
                            page_id: connectedPage.id,
                            page_name: connectedPage.name,
                            instagram_account_id: account.platform_account_id,
                            fixed_at: new Date().toISOString(),
                            fix_method: 'direct_database_update'
                        };

                        const metadataJson = JSON.stringify(metadata);
                        console.log(`🔧 FORCE FIX: Generated JSON: ${metadataJson}`);

                        // Direct database update bypassing ORM
                        await knex.raw(`
                            UPDATE social_media_accounts
                            SET account_metadata = ?, updated_at = NOW()
                            WHERE id = ?
                        `, [metadataJson, account.id]);

                        // Verify the update
                        const updated = await knex('social_media_accounts')
                            .where('id', account.id)
                            .select('account_metadata')
                            .first();

                        result.status = '✅ FORCE FIXED';
                        result.new_metadata = updated.account_metadata;
                        result.facebook_page = {
                            page_id: connectedPage.id,
                            page_name: connectedPage.name
                        };

                        console.log(`✅ FORCE FIX: Updated ${account.platform_username} with: ${updated.account_metadata}`);

                    } else {
                        result.status = '❌ NO CONNECTED PAGE';
                        result.available_pages = pages.map(p => ({
                            id: p.id,
                            name: p.name,
                            has_instagram: !!p.instagram_business_account
                        }));
                    }

                } catch (apiError) {
                    result.status = '❌ API ERROR';
                    result.error = (apiError.response && apiError.response.data && apiError.response.data.error && apiError.response.data.error.message) || apiError.message;
                }

                results.push(result);
            }

            res.json({
                success: true,
                message: 'Force metadata fix completed',
                method: 'Direct database update bypassing ORM',
                accounts_processed: results.length,
                results: results,
                next_step: 'Run readiness check to verify fix',
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Force fix failed:', error);
            res.json({
                error: 'Force fix failed',
                details: error.message,
                timestamp: new Date().toISOString()
            });
        }
    })
);

// Simple test route to verify deployment
router.get(
    "/instagram/permissions-test",
    asyncHandler(async(req, res) => {
        res.json({
            success: true,
            message: "Permissions diagnostic route is working!",
            timestamp: new Date().toISOString(),
            note: "This confirms the route is deployed and accessible"
        });
    })
);

// Check app configuration and Instagram accounts
router.get(
    "/instagram/config-check",
    asyncHandler(async(req, res) => {
        const knex = require('../knex');

        // Check environment variables
        const config = {
            facebook_app_id: process.env.FACEBOOK_APP_ID || 'NOT SET',
            facebook_app_secret: process.env.FACEBOOK_APP_SECRET ? 'SET (hidden)' : 'NOT SET',
            facebook_redirect_uri: process.env.FACEBOOK_REDIRECT_URI || 'NOT SET',
            instagram_webhook_verify_token: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN ? 'SET (hidden)' : 'NOT SET',
            expected_app_id: '2364553920613507',
            app_id_status: process.env.FACEBOOK_APP_ID === '2364553920613507' ? '✅ CORRECT' : '❌ MISMATCH'
        };

        // Check token type and permissions
        let tokenAnalysis = null;
        try {
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .where('is_active', true)
                .select('access_token', 'platform_account_id', 'account_metadata')
                .first();

            if (accounts && accounts.access_token) {
                const axios = require('axios');

                // Check what type of token this is
                const tokenInfo = await axios.get('https://graph.facebook.com/v23.0/me', {
                    params: { access_token: accounts.access_token }
                });

                // Check if we can access the Facebook Page
                const pageInfo = accounts.account_metadata ? JSON.parse(accounts.account_metadata) : {};

                tokenAnalysis = {
                    token_type: tokenInfo.data.id ? 'User Token' : 'Unknown',
                    token_owner: tokenInfo.data.name || 'Unknown',
                    instagram_account_id: accounts.platform_account_id,
                    facebook_page_id: pageInfo.page_id || 'Not found',
                    facebook_page_name: pageInfo.page_name || 'Not found',
                    token_preview: accounts.access_token.substring(0, 20) + '...'
                };
            }
        } catch (error) {
            tokenAnalysis = { error: error.message };
        }

        // Check Instagram accounts in database
        let accounts = [];
        try {
            accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .select('id', 'platform_account_id', 'platform_username', 'platform_name', 'is_active', 'created_at')
                .orderBy('created_at', 'desc');
        } catch (error) {
            return res.json({
                error: 'Database query failed',
                details: error.message,
                config: config
            });
        }

        res.json({
            success: true,
            message: "Configuration and account check",
            config: config,
            token_analysis: tokenAnalysis,
            instagram_accounts: accounts.map(acc => ({
                id: acc.id,
                platform_account_id: acc.platform_account_id,
                username: acc.platform_username,
                name: acc.platform_name,
                is_active: acc.is_active,
                created_at: acc.created_at
            })),
            timestamp: new Date().toISOString(),
            next_steps: [
                "1. Verify Messenger product is added to Facebook app",
                "2. Confirm Instagram is connected to Facebook Page",
                "3. Check if Page Access Token is needed instead of User Token",
                "4. Ensure you're admin of the connected Facebook Page"
            ]
        });
    })
);

// Check Instagram API permissions
router.get(
    "/instagram/check-permissions",
    asyncHandler(async(req, res) => {
        const axios = require('axios');

        // Get Instagram account from database
        const socialQueries = require('../queries/social-integrations.queries');

        // Get all Instagram accounts (we'll filter by platform in the query)
        const knex = require('../knex');
        const accounts = await knex('social_media_accounts')
            .where('platform', 'instagram')
            .where('is_active', true)
            .orderBy('created_at', 'desc');

        if (accounts.length === 0) {
            return res.json({
                error: 'No Instagram accounts found in database',
                note: 'Make sure you have connected an Instagram account in the dashboard'
            });
        }

        const account = accounts[0];
        const accessToken = account.access_token;

        try {
            // IMPORTANT: Use Facebook Graph API for token validation
            // The access token is from Facebook OAuth, not Instagram App
            console.log('🔍 Checking Facebook access token permissions...');

            // Check token permissions using Facebook Graph API
            const permissionsResponse = await axios.get(`https://graph.facebook.com/me/permissions`, {
                params: { access_token: accessToken }
            });

            // Check token info using Facebook Graph API
            const tokenInfoResponse = await axios.get(`https://graph.facebook.com/me`, {
                params: {
                    access_token: accessToken,
                    fields: 'id,name'
                }
            });

            // Check if token can access Instagram account using Facebook Graph API
            // Note: account_type field deprecated in v23.0, removed from fields
            const instagramCheckResponse = await axios.get(`https://graph.facebook.com/v23.0/${account.platform_account_id}`, {
                params: {
                    access_token: accessToken,
                    fields: 'id,username,name,followers_count'
                }
            });

            res.json({
                success: true,
                facebook_token_info: tokenInfoResponse.data,
                instagram_account_info: instagramCheckResponse.data,
                permissions: permissionsResponse.data.data,
                instagram_account_id: account.platform_account_id,
                access_token_preview: accessToken.substring(0, 20) + '...',
                note: 'Token is from Facebook OAuth but can access Instagram account'
            });

        } catch (error) {
            res.json({
                error: 'Failed to check permissions',
                details: (error.response && error.response.data) || error.message
            });
        }
    })
);

// Test Instagram DM sending endpoint
router.post(
    "/instagram/test-dm",
    asyncHandler(async(req, res) => {
        const { message, recipient_id } = req.body;

        if (!message || !recipient_id) {
            return res.json({
                error: 'Missing required fields: message and recipient_id'
            });
        }

        try {
            const knex = require('../knex');
            const instagramHandler = require('../handlers/instagram-integration.handler');

            // Get Instagram account from database
            const accounts = await knex('social_media_accounts')
                .where('platform', 'instagram')
                .where('is_active', true)
                .orderBy('created_at', 'desc');

            if (accounts.length === 0) {
                return res.json({
                    error: 'No Instagram accounts found in database'
                });
            }

            const account = accounts[0];

            // Test DM sending
            console.log('🧪 Testing Instagram DM sending...');
            console.log('🧪 Account:', account.platform_username);
            console.log('🧪 Recipient ID:', recipient_id);
            console.log('🧪 Message:', message);

            // Extract Facebook Page ID from account metadata for Messenger Platform
            const accountMetadata = typeof account.account_metadata === 'string' ?
                JSON.parse(account.account_metadata) :
                account.account_metadata;

            const facebookPageId = accountMetadata && accountMetadata.page_id;

            if (!facebookPageId) {
                return res.status(400).json({
                    success: false,
                    error: 'Facebook Page ID not found in account metadata',
                    account_metadata: account.account_metadata,
                    note: 'Instagram messaging requires Facebook Page connection via Messenger Platform'
                });
            }

            const result = await instagramHandler.sendInstagramDM(
                account.access_token, // TODO: This should be Page Access Token
                facebookPageId, // Use Facebook Page ID for Messenger Platform
                recipient_id,
                message,
                'test-interaction-' + Date.now()
            );

            res.json({
                success: true,
                message: 'DM sent successfully',
                result: result,
                account_used: account.platform_username,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Test DM failed:', error);
            res.json({
                error: 'DM sending failed',
                details: (error.response && error.response.data) || error.message,
                timestamp: new Date().toISOString()
            });
        }
    })
);

// Debug signature verification endpoint (GET for info, POST for testing)
router.get(
    "/instagram/debug-signature",
    asyncHandler((req, res) => {
        console.log('🔍 SIGNATURE DEBUG INFO ENDPOINT');

        const instagramSecret = process.env.INSTAGRAM_APP_SECRET;
        const facebookSecret = process.env.FACEBOOK_APP_SECRET;
        const usingSecret = instagramSecret || facebookSecret;

        console.log('🔍 INSTAGRAM_APP_SECRET exists:', !!instagramSecret);
        console.log('🔍 FACEBOOK_APP_SECRET exists:', !!facebookSecret);
        console.log('🔍 Using secret source:', instagramSecret ? 'INSTAGRAM_APP_SECRET' : 'FACEBOOK_APP_SECRET');

        res.json({
            success: true,
            message: "Instagram webhook signature debug info",
            environment: {
                hasInstagramSecret: !!instagramSecret,
                hasFacebookSecret: !!facebookSecret,
                secretSource: instagramSecret ? 'INSTAGRAM_APP_SECRET' : 'FACEBOOK_APP_SECRET',
                secretPreview: usingSecret ? usingSecret.substring(0, 8) + '...' : 'NOT SET'
            },
            instructions: {
                testSignature: "Send POST request with webhook payload and x-hub-signature-256 header",
                setSecret: "Set INSTAGRAM_APP_SECRET environment variable with your Instagram app secret",
                getSecret: "Find your Instagram app secret in Meta Developer Dashboard → App Settings → Basic"
            },
            timestamp: new Date().toISOString()
        });
    })
);

router.post(
    "/instagram/debug-signature",
    rawBodyMiddleware,
    asyncHandler((req, res) => {
        const crypto = require('crypto');

        console.log('🔍 SIGNATURE DEBUG ENDPOINT');
        console.log('🔍 Raw body type:', typeof req.rawBodyBuffer);
        console.log('🔍 Raw body length:', req.rawBodyBuffer ? req.rawBodyBuffer.length : 'N/A');
        console.log('🔍 Body content:', req.body);

        const signature = req.headers['x-hub-signature-256'];
        const appSecret = process.env.INSTAGRAM_APP_SECRET || process.env.FACEBOOK_APP_SECRET;

        console.log('🔍 Received signature:', signature);
        console.log('🔍 INSTAGRAM_APP_SECRET exists:', !!process.env.INSTAGRAM_APP_SECRET);
        console.log('🔍 FACEBOOK_APP_SECRET exists:', !!process.env.FACEBOOK_APP_SECRET);
        console.log('🔍 Using secret (first 8):', appSecret ? appSecret.substring(0, 8) + '...' : 'NOT SET');
        console.log('🔍 Secret source:', process.env.INSTAGRAM_APP_SECRET ? 'INSTAGRAM_APP_SECRET' : 'FACEBOOK_APP_SECRET');

        if (req.rawBodyBuffer && appSecret) {
            const expectedSignature = 'sha256=' + crypto
                .createHmac('sha256', appSecret)
                .update(req.rawBodyBuffer)
                .digest('hex');

            console.log('🔍 Expected signature:', expectedSignature);
            console.log('🔍 Signatures match:', signature === expectedSignature);
        }

        res.json({
            success: true,
            message: "Signature debug complete",
            hasRawBody: !!req.rawBodyBuffer,
            hasAppSecret: !!appSecret,
            signatureMatch: signature && appSecret && req.rawBodyBuffer ?
                signature === ('sha256=' + crypto.createHmac('sha256', appSecret).update(req.rawBodyBuffer).digest('hex')) : false
        });
    })
);

// Instagram webhook verification (GET request)
router.get(
    "/instagram",
    (req, res, next) => {
        console.log('🔍 Instagram Webhook Verification');
        if (req.query['hub.challenge']) {
            console.log('🔍 Challenge token requested');
        }
        next();
    },
    asyncHandler(instagramHandler.verifyInstagramWebhook)
);

// Instagram webhook events (POST request)
router.post(
    "/instagram",
    rawBodyMiddleware, // Must be first to capture raw body before any parsing
    webhookLoggingMiddleware,
    asyncHandler(instagramHandler.handleInstagramWebhook)
);

/**
 * Facebook Webhook Routes (for future implementation)
 */

// Messenger Platform webhook verification (GET request)
// This handles the webhook verification for Instagram messaging via Messenger Platform
router.get(
    "/messenger",
    asyncHandler((req, res) => {
        console.log('🔍 Messenger Platform webhook verification request');
        console.log('🔍 Query params:', req.query);

        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];

        // Check for multiple possible verify token environment variables
        const verifyToken = process.env.MESSENGER_WEBHOOK_VERIFY_TOKEN ||
            process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN ||
            process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN;

        console.log('🔍 Mode:', mode);
        console.log('🔍 Token provided:', token);
        console.log('🔍 Expected token:', verifyToken ? 'SET' : 'NOT SET');

        if (mode === 'subscribe' && token === verifyToken) {
            console.log('✅ Messenger Platform webhook verified successfully');
            res.status(200).send(challenge);
        } else {
            console.error('❌ Messenger Platform webhook verification failed');
            console.error('❌ Mode:', mode, 'Expected: subscribe');
            console.error('❌ Token match:', token === verifyToken);
            res.status(403).send('Forbidden');
        }
    })
);

// Facebook webhook verification (GET request) - legacy/backup
router.get(
    "/facebook",
    asyncHandler((req, res) => {
        // Redirect to messenger endpoint for consistency
        console.log('🔄 Redirecting Facebook webhook to Messenger Platform handler');
        req.url = req.url.replace('/facebook', '/messenger');
        return router.handle(req, res);
    })
);

// Messenger Platform webhook events (POST request)
router.post(
    "/messenger",
    rawBodyMiddleware, // Capture raw body for signature verification
    asyncHandler((req, res) => {
        const crypto = require('crypto');

        console.log('📨 Messenger Platform webhook received');
        console.log('📨 IP:', req.ip);
        console.log('📨 User-Agent:', req.headers['user-agent']);

        // Verify webhook signature for Messenger Platform
        const signature = req.headers['x-hub-signature-256'];
        const webhookSecret = process.env.FACEBOOK_APP_SECRET;

        if (signature && webhookSecret && req.rawBodyBuffer) {
            console.log('🔍 Verifying Messenger Platform webhook signature...');
            console.log('🔍 Received signature:', signature);
            console.log('🔍 Using FACEBOOK_APP_SECRET for Messenger Platform');
            console.log('🔍 Raw body length:', req.rawBodyBuffer.length);

            const expectedSignature = 'sha256=' + crypto
                .createHmac('sha256', webhookSecret)
                .update(req.rawBodyBuffer)
                .digest('hex');

            console.log('🔍 Expected signature:', expectedSignature);
            console.log('🔍 Signatures match:', signature === expectedSignature);

            if (signature !== expectedSignature) {
                console.error('❌ Invalid Messenger Platform webhook signature');
                console.error('❌ This webhook is not from Facebook/Meta servers');
                return res.status(403).send('Forbidden');
            }

            console.log('✅ Messenger Platform webhook signature verified');
        } else {
            console.warn('⚠️ No signature verification for Messenger Platform webhook');
            console.warn('⚠️ Missing:', {
                signature: !signature,
                secret: !webhookSecret,
                rawBody: !req.rawBodyBuffer
            });
        }

        console.log('📨 Body:', JSON.stringify(req.body, null, 2));

        // Handle Instagram messaging via Messenger Platform
        if (req.body && req.body.entry) {
            for (const entry of req.body.entry) {
                // Handle Instagram messaging events
                if (entry.messaging) {
                    for (const messagingEvent of entry.messaging) {
                        console.log('📨 Instagram messaging event:', messagingEvent);
                        // TODO: Process Instagram DM received via Messenger Platform
                        // This should call the Instagram handler with Messenger Platform data
                    }
                }

                // Handle other Messenger Platform events (like Instagram comments)
                if (entry.changes) {
                    for (const change of entry.changes) {
                        console.log('📨 Messenger Platform change:', change);
                        // TODO: Process Instagram changes via Messenger Platform
                    }
                }
            }
        }

        res.status(200).send('OK');
    })
);

// Facebook webhook events (POST request) - legacy/backup
router.post(
    "/facebook",
    asyncHandler((req, res) => {
        // Redirect to messenger endpoint for consistency
        console.log('🔄 Redirecting Facebook webhook POST to Messenger Platform handler');
        req.url = req.url.replace('/facebook', '/messenger');
        return router.handle(req, res);
    })
);

/**
 * SMS/Twilio Webhook Routes
 */

// SMS webhook for incoming messages
router.post(
    "/sms",
    // Optional: Add Twilio signature verification middleware
    // smsHandler.verifyTwilioSignature,
    asyncHandler(smsHandler.handleSmsWebhook)
);

/**
 * Test endpoint for webhook debugging
 */
router.get(
    "/test",
    asyncHandler((req, res) => {
        console.log('🧪 Webhook test endpoint accessed');
        console.log('🧪 Query params:', req.query);
        console.log('🧪 Headers:', req.headers);
        res.json({
            success: true,
            message: "Webhook test endpoint working",
            timestamp: new Date().toISOString(),
            query: req.query,
            headers: req.headers
        });
    })
);

/**
 * Debug endpoint to check environment variables
 */
router.get(
    "/debug-env",
    asyncHandler((req, res) => {
        console.log('🔍 Environment debug endpoint accessed');
        res.json({
            success: true,
            message: "Environment variables check",
            timestamp: new Date().toISOString(),
            env_check: {
                facebook_app_id: process.env.FACEBOOK_APP_ID ? 'SET' : 'NOT SET',
                facebook_app_secret: process.env.FACEBOOK_APP_SECRET ? 'SET' : 'NOT SET',
                instagram_webhook_verify_token: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN ? 'SET' : 'NOT SET',
                base_url: process.env.BASE_URL ? 'SET' : 'NOT SET',
                facebook_redirect_uri: process.env.FACEBOOK_REDIRECT_URI ? 'SET' : 'NOT SET',
                // Show first 4 characters of App ID for debugging (if set)
                app_id_preview: process.env.FACEBOOK_APP_ID ? process.env.FACEBOOK_APP_ID.substring(0, 4) + '...' : 'NOT SET'
            }
        });
    })
);

router.post(
    "/test",
    asyncHandler((req, res) => {
        console.log('🧪 Webhook test POST endpoint accessed');
        console.log('🧪 Body:', req.body);
        console.log('🧪 Headers:', req.headers);
        res.json({
            success: true,
            message: "Webhook test POST endpoint working",
            timestamp: new Date().toISOString(),
            body: req.body,
            headers: req.headers
        });
    })
);

/**
 * Generic webhook health check
 */
router.get(
    "/health",
    asyncHandler((req, res) => {
        res.json({
            success: true,
            message: "Webhook endpoints are healthy",
            timestamp: new Date().toISOString(),
            endpoints: {
                instagram: {
                    verification: "/api/webhooks/instagram (GET)",
                    events: "/api/webhooks/instagram (POST)"
                },
                facebook: {
                    verification: "/api/webhooks/facebook (GET)",
                    events: "/api/webhooks/facebook (POST)"
                },
                sms: {
                    events: "/api/webhooks/sms (POST)"
                },
                test: {
                    get: "/api/webhooks/test (GET)",
                    post: "/api/webhooks/test (POST)"
                }
            }
        });
    })
);

// Catch-all route for any unmatched webhook requests
router.all(
    "*",
    webhookLoggingMiddleware,
    asyncHandler((req, res) => {
        console.log('🚨 ===== UNMATCHED WEBHOOK REQUEST =====');
        console.log('🚨 This request hit the webhook router but no specific route');
        console.log('🚨 Method:', req.method);
        console.log('🚨 URL:', req.url);
        console.log('🚨 Original URL:', req.originalUrl);
        console.log('🚨 Path:', req.path);
        console.log('🚨 Base URL:', req.baseUrl);
        console.log('🚨 Available routes in this router:');
        console.log('🚨   GET/POST /instagram');
        console.log('🚨   GET/POST /instagram/debug');
        console.log('🚨   GET/POST /instagram/debug-signature');
        console.log('🚨   GET/POST /instagram/meta-test');
        console.log('🚨   GET/POST /instagram/external-test');
        console.log('🚨   GET /instagram/permissions-test');
        console.log('🚨   GET /instagram/check-permissions');
        console.log('🚨   GET/POST /facebook');
        console.log('🚨   GET/POST /sms');
        console.log('🚨   GET/POST /test');
        console.log('🚨   GET /health');
        console.log('🚨 ====================================');

        res.status(404).json({
            error: "Webhook endpoint not found",
            method: req.method,
            url: req.url,
            availableEndpoints: [
                "GET/POST /api/webhooks/instagram",
                "GET/POST /api/webhooks/instagram/debug",
                "GET/POST /api/webhooks/instagram/meta-test",
                "GET/POST /api/webhooks/facebook",
                "GET/POST /api/webhooks/sms",
                "GET /api/webhooks/health"
            ],
            timestamp: new Date().toISOString()
        });
    })
);

module.exports = router;