const { Router } = require("express");
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../handlers/auth.handler");
const locals = require("../handlers/locals.handler");
const instagramHandler = require("../handlers/instagram-integration.handler");
const socialQueries = require("../queries/social-integrations.queries");

const router = Router();

/**
 * Instagram Integration Routes
 */

// Initiate Instagram OAuth
router.get(
    "/instagram/auth",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(instagramHandler.initiateInstagramAuth)
);

// Instagram OAuth callback
router.get(
    "/instagram/callback",
    asyncHandler(instagramHandler.handleInstagramCallback)
);

// Get Instagram connection status
router.get(
    "/instagram/status",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(instagramHandler.getInstagramStatus)
);

// Disconnect Instagram account
router.delete(
    "/instagram/:accountId",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(instagramHandler.disconnectInstagram)
);

// Debug Instagram configuration (admin only)
router.get(
    "/instagram/debug",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(instagramHandler.debugInstagramConfig)
);

/**
 * Keywords Management Routes
 */

// Get all keywords for user
router.get(
    "/keywords",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            const userId = req.user.id;
            const { social_account_id, event_id, keyword_type } = req.query;

            console.log('🔍 Fetching keywords for user:', userId);
            console.log('🔍 Query params:', { social_account_id, event_id, keyword_type });

            const keywords = await socialQueries.getKeywords(userId, social_account_id, event_id, keyword_type);

            console.log('🔍 Found keywords:', keywords.length);

            res.json({
                success: true,
                keywords: keywords
            });

        } catch (error) {
            console.error('❌ Error fetching keywords:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch keywords',
                message: error.message
            });
        }
    })
);

// Create new keyword
router.post(
    "/keywords",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            const userId = req.user.id;
            const keywordData = {
                ...req.body,
                created_by_user_id: userId,
                keyword_type: req.body.keyword_type || 'instagram' // Default to instagram
            };

            console.log('🔧 Creating keyword with data:', JSON.stringify(keywordData, null, 2));

            const keyword = await socialQueries.createKeyword(keywordData);

            res.json({
                success: true,
                keyword: keyword,
                message: 'Keyword created successfully'
            });

        } catch (error) {
            console.error('❌ Error creating keyword:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create keyword',
                message: error.message
            });
        }
    })
);

// Update keyword
router.put(
    "/keywords/:keywordId",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            const userId = req.user.id;
            const { keywordId } = req.params;

            const keyword = await socialQueries.updateKeyword(keywordId, req.body, userId);

            if (!keyword) {
                return res.status(404).json({
                    success: false,
                    error: 'Keyword not found'
                });
            }

            res.json({
                success: true,
                keyword: keyword,
                message: 'Keyword updated successfully'
            });

        } catch (error) {
            console.error('❌ Error updating keyword:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update keyword',
                message: error.message
            });
        }
    })
);

// Delete keyword
router.delete(
    "/keywords/:keywordId",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            const userId = req.user.id;
            const { keywordId } = req.params;

            const deleted = await socialQueries.deleteKeyword(keywordId, userId);

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    error: 'Keyword not found'
                });
            }

            res.json({
                success: true,
                message: 'Keyword deleted successfully'
            });

        } catch (error) {
            console.error('❌ Error deleting keyword:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete keyword',
                message: error.message
            });
        }
    })
);

/**
 * Social Interactions Routes
 */

// Get social interactions with filtering and pagination
router.get(
    "/interactions",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            const userId = req.user.id;
            const {
                social_account_id,
                interaction_type,
                processing_status,
                user_captured,
                date_from,
                date_to,
                page = 1,
                limit = 50
            } = req.query;

            // Get user's social accounts to filter by
            const userAccounts = await socialQueries.getSocialAccounts(userId);
            const accountIds = userAccounts.map(acc => acc.id);

            if (accountIds.length === 0) {
                return res.json({
                    success: true,
                    interactions: [],
                    pagination: { page: 1, limit, total: 0, pages: 0 }
                });
            }

            const filters = {
                social_account_id: social_account_id || accountIds,
                interaction_type,
                processing_status,
                user_captured: user_captured !== undefined ? user_captured === 'true' : undefined,
                date_from,
                date_to
            };

            const result = await socialQueries.getSocialInteractions(
                filters,
                parseInt(page),
                parseInt(limit)
            );

            res.json({
                success: true,
                ...result
            });

        } catch (error) {
            console.error('❌ Error fetching interactions:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch interactions',
                message: error.message
            });
        }
    })
);

/**
 * Integration Statistics Routes
 */

// Get integration statistics
router.get(
    "/stats",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            const userId = req.user.id;
            const { date_from, date_to } = req.query;

            const stats = await socialQueries.getIntegrationStats(userId, date_from, date_to);

            res.json({
                success: true,
                stats: stats
            });

        } catch (error) {
            console.error('❌ Error fetching integration stats:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch integration statistics',
                message: error.message
            });
        }
    })
);

/**
 * Social Media Accounts Routes
 */

// Get all connected social media accounts
router.get(
    "/accounts",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            const userId = req.user.id;
            const accounts = await socialQueries.getSocialAccounts(userId);

            // Remove sensitive data before sending
            const safeAccounts = accounts.map(acc => ({
                id: acc.id,
                uuid: acc.uuid,
                platform: acc.platform,
                platform_username: acc.platform_username,
                platform_name: acc.platform_name,
                profile_picture_url: acc.profile_picture_url,
                is_active: acc.is_active,
                webhook_configured: acc.webhook_configured,
                follower_count: acc.follower_count,
                account_type: acc.account_type,
                connected_at: acc.connected_at,
                last_sync_at: acc.last_sync_at
            }));

            res.json({
                success: true,
                accounts: safeAccounts
            });

        } catch (error) {
            console.error('❌ Error fetching social accounts:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch social media accounts',
                message: error.message
            });
        }
    })
);

// Update social media account settings
router.put(
    "/accounts/:accountId",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            const userId = req.user.id;
            const { accountId } = req.params;
            const { is_active, webhook_configured } = req.body;

            const account = await socialQueries.updateSocialAccount(
                accountId, { is_active, webhook_configured },
                userId
            );

            if (!account) {
                return res.status(404).json({
                    success: false,
                    error: 'Social media account not found'
                });
            }

            res.json({
                success: true,
                account: account,
                message: 'Account updated successfully'
            });

        } catch (error) {
            console.error('❌ Error updating social account:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update social media account',
                message: error.message
            });
        }
    })
);

/**
 * SMS Configuration Routes
 */

// Get SMS configuration status
router.get(
    "/sms/status",
    asyncHandler(auth.jwtAdminPage),
    asyncHandler(locals.user),
    asyncHandler(async(req, res) => {
        try {
            // Check if Twilio is configured
            const twilioConfigured = !!(
                process.env.TWILIO_ACCOUNT_SID &&
                process.env.TWILIO_AUTH_TOKEN &&
                process.env.TWILIO_PHONE_NUMBER
            );

            res.json({
                success: true,
                configured: twilioConfigured,
                phone_number: twilioConfigured ? process.env.TWILIO_PHONE_NUMBER : null
            });

        } catch (error) {
            console.error('❌ Error checking SMS status:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to check SMS configuration',
                message: error.message
            });
        }
    })
);

// Test endpoint to simulate Instagram webhook without Facebook app approval
router.post(
    "/test-instagram-webhook",
    asyncHandler(async(req, res) => {
        try {
            const { keyword, comment_text, event_id } = req.body;

            console.log('🧪 Testing Instagram webhook simulation');
            console.log('🧪 Keyword:', keyword);
            console.log('🧪 Comment:', comment_text);
            console.log('🧪 Event ID:', event_id);

            // Find matching keywords for this event
            const keywords = await knex('social_keywords')
                .where('event_id', event_id)
                .where('keyword_type', 'instagram')
                .where('is_active', true);

            console.log('🧪 Found keywords:', keywords.length);

            // Check if any keyword matches the comment
            const matchingKeyword = keywords.find(k =>
                comment_text.toLowerCase().includes(k.keyword.toLowerCase())
            );

            if (matchingKeyword) {
                console.log('🧪 Matching keyword found:', matchingKeyword.keyword);

                // Update keyword usage stats
                await knex('social_keywords')
                    .where('id', matchingKeyword.id)
                    .increment('total_triggers', 1);

                if (matchingKeyword.send_auto_response && matchingKeyword.auto_response_message) {
                    await knex('social_keywords')
                        .where('id', matchingKeyword.id)
                        .increment('total_responses_sent', 1);
                }

                res.json({
                    success: true,
                    message: 'Instagram webhook simulation successful',
                    matched_keyword: matchingKeyword.keyword,
                    auto_response: matchingKeyword.auto_response_message,
                    stats_updated: true
                });
            } else {
                res.json({
                    success: true,
                    message: 'No matching keywords found',
                    available_keywords: keywords.map(k => k.keyword)
                });
            }

        } catch (error) {
            console.error('❌ Error in test webhook simulation:', error);
            res.status(500).json({
                success: false,
                error: 'Test simulation failed',
                message: error.message
            });
        }
    })
);

module.exports = router;