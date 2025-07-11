const axios = require('axios');
const crypto = require('crypto');
const knex = require('../knex');
const { CustomError } = require('../utils');
const socialQueries = require('../queries/social-integrations.queries');
const userQueries = require('../queries/user.queries');

/**
 * Instagram Graph API Integration Handler
 * Handles Instagram Business Account integration, webhooks, and automation
 */

const INSTAGRAM_API_BASE = 'https://graph.facebook.com/v23.0';

/**
 * Initialize Instagram OAuth flow
 */
async function initiateInstagramAuth(req, res) {
    try {
        const { returnUrl } = req.query;
        const userId = req.user.id;

        // Store return URL in session for after auth
        req.session.instagram_auth_return = returnUrl || '/dashboard/settings#integrations';
        req.session.instagram_auth_user_id = userId;

        console.log('🔍 Setting session data for OAuth:');
        console.log('🔍 User ID:', userId);
        console.log('🔍 Return URL:', returnUrl || '/dashboard/settings#integrations');
        console.log('🔍 Session ID:', req.sessionID);

        // Instagram Business OAuth URL with required permissions
        // For Instagram Business API, we use Facebook Login for Business
        const scopes = [
            'instagram_basic',
            'instagram_manage_comments',
            'instagram_manage_messages',
            'pages_show_list',
            'pages_read_engagement'
        ].join(',');

        // Generate secure state parameter that includes user ID
        // This helps us recover the user ID even if session is lost
        const stateData = {
            userId: userId,
            timestamp: Date.now(),
            returnUrl: returnUrl || '/dashboard/settings#integrations'
        };
        const state = Buffer.from(JSON.stringify(stateData)).toString('base64url');
        req.session.instagram_oauth_state = state;

        console.log('🔍 Generated OAuth state with embedded data:', state);
        console.log('🔍 State data:', stateData);
        console.log('🔍 Session after setting state:', JSON.stringify({
            instagram_auth_user_id: req.session.instagram_auth_user_id,
            instagram_oauth_state: req.session.instagram_oauth_state,
            instagram_auth_return: req.session.instagram_auth_return
        }));

        // Use Facebook OAuth for Instagram Business API access
        // This is the correct flow - Instagram Business API uses Facebook's OAuth
        const authUrl = `https://www.facebook.com/v23.0/dialog/oauth?` +
            `client_id=${process.env.FACEBOOK_APP_ID}&` +
            `redirect_uri=${encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI)}&` +
            `scope=${encodeURIComponent(scopes)}&` +
            `response_type=code&` +
            `state=${state}&` +
            `auth_type=rerequest`; // Force permission re-request

        console.log('🔗 Initiating Instagram Business OAuth flow for user:', userId);
        console.log('🔗 Requested scopes:', scopes);
        console.log('🔗 OAuth URL:', authUrl);
        console.log('🔗 App ID:', process.env.FACEBOOK_APP_ID);
        console.log('🔗 Redirect URI:', process.env.FACEBOOK_REDIRECT_URI);
        res.redirect(authUrl);

    } catch (error) {
        console.error('❌ Error initiating Instagram auth:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to initiate Instagram authentication',
            message: error.message
        });
    }
}

/**
 * Handle Instagram OAuth callback
 */
async function handleInstagramCallback(req, res) {
    try {
        const { code, state, error } = req.query;
        const userId = req.session.instagram_auth_user_id;
        const expectedState = req.session.instagram_oauth_state;
        const returnUrl = req.session.instagram_auth_return || '/dashboard/settings#integrations';

        console.log('🔍 Instagram OAuth callback received:');
        console.log('🔍 Code:', code ? 'Present' : 'Missing');
        console.log('🔍 State:', state ? 'Present' : 'Missing');
        console.log('🔍 Error:', error || 'None');
        console.log('🔍 User ID from session:', userId || 'Missing');
        console.log('🔍 Expected state from session:', expectedState ? 'Present' : 'Missing');
        console.log('🔍 Return URL:', returnUrl);
        console.log('🔍 Session data:', JSON.stringify({
            instagram_auth_user_id: req.session.instagram_auth_user_id,
            instagram_oauth_state: req.session.instagram_oauth_state ? 'Present' : 'Missing',
            instagram_auth_return: req.session.instagram_auth_return
        }));

        // Try to recover user ID and return URL from state parameter if session is lost
        let recoveredUserId = userId;
        let recoveredReturnUrl = returnUrl;
        let stateData = null;

        if (state && (!userId || !expectedState)) {
            try {
                stateData = JSON.parse(Buffer.from(state, 'base64url').toString());
                console.log('🔍 Recovered state data:', stateData);

                if (stateData.userId) {
                    recoveredUserId = stateData.userId;
                    console.log('✅ Recovered user ID from state:', recoveredUserId);
                }

                if (stateData.returnUrl) {
                    recoveredReturnUrl = stateData.returnUrl;
                    console.log('✅ Recovered return URL from state:', recoveredReturnUrl);
                }
            } catch (stateError) {
                console.error('❌ Failed to parse state parameter:', stateError);
            }
        }

        if (error) {
            console.error('❌ Instagram OAuth error:', error);
            let errorType = 'oauth_failed';

            // Map specific OAuth errors
            switch (error) {
                case 'access_denied':
                    errorType = 'access_denied';
                    break;
                case 'invalid_request':
                    errorType = 'invalid_callback';
                    break;
                default:
                    errorType = 'oauth_failed';
            }

            return res.redirect(`${recoveredReturnUrl}?error=${errorType}&error_description=${encodeURIComponent(error)}`);
        }

        if (!code || !recoveredUserId) {
            console.error('❌ Missing code or user ID in Instagram callback');
            console.error('❌ Code present:', !!code);
            console.error('❌ Original user ID:', userId);
            console.error('❌ Recovered user ID:', recoveredUserId);
            return res.redirect(`${recoveredReturnUrl}?error=invalid_callback`);
        }

        // Validate state parameter for security
        // If we have session state, validate against it; otherwise validate state format
        if (!state) {
            console.error('❌ Missing state parameter in Instagram callback');
            return res.redirect(`${recoveredReturnUrl}?error=invalid_state`);
        }

        if (expectedState && state !== expectedState) {
            console.error('❌ State parameter mismatch - possible session issue');
            console.error('❌ Expected:', expectedState);
            console.error('❌ Received:', state);
            // Don't fail here if we recovered data from state - session might be lost but state is valid
            if (!stateData) {
                return res.redirect(`${recoveredReturnUrl}?error=invalid_state`);
            }
        }

        console.log('✅ OAuth validation passed, proceeding with token exchange');
        console.log('✅ Using user ID:', recoveredUserId);
        console.log('✅ Using return URL:', recoveredReturnUrl);

        // Exchange code for access token using Facebook's token endpoint
        console.log('🔄 Attempting token exchange with Facebook API...');
        console.log('🔍 App ID:', process.env.FACEBOOK_APP_ID);
        console.log('🔍 App Secret (first 8 chars):', process.env.FACEBOOK_APP_SECRET ? process.env.FACEBOOK_APP_SECRET.substring(0, 8) + '...' : 'MISSING');
        console.log('🔍 Redirect URI:', process.env.FACEBOOK_REDIRECT_URI);
        console.log('🔍 Authorization Code (first 20 chars):', code ? code.substring(0, 20) + '...' : 'MISSING');

        let tokenResponse;
        try {
            tokenResponse = await axios.post('https://graph.facebook.com/v23.0/oauth/access_token', {
                client_id: process.env.FACEBOOK_APP_ID,
                client_secret: process.env.FACEBOOK_APP_SECRET,
                redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
                code: code
            });
            console.log('✅ Token exchange successful');
        } catch (tokenError) {
            console.error('❌ Facebook API token exchange failed:');
            console.error('❌ Status:', tokenError.response && tokenError.response.status);
            console.error('❌ Status Text:', tokenError.response && tokenError.response.statusText);
            console.error('❌ Headers:', JSON.stringify(tokenError.response && tokenError.response.headers, null, 2));
            console.error('❌ Error Data:', JSON.stringify(tokenError.response && tokenError.response.data, null, 2));
            console.error('❌ Full Error:', tokenError.message);

            // Provide specific error messages based on Facebook API error types
            let errorType = 'oauth_failed';
            let errorMessage = 'Facebook API authentication failed';

            if (tokenError.response && tokenError.response.data && tokenError.response.data.error) {
                const fbError = tokenError.response.data.error;
                console.error('❌ Facebook Error Code:', fbError.code);
                console.error('❌ Facebook Error Type:', fbError.type);
                console.error('❌ Facebook Error Message:', fbError.message);

                switch (fbError.type) {
                    case 'OAuthException':
                        if (fbError.message.includes('client secret')) {
                            errorType = 'invalid_credentials';
                            errorMessage = 'Invalid App ID or App Secret. Please check your Meta App Dashboard configuration.';
                        } else if (fbError.message.includes('redirect_uri')) {
                            errorType = 'invalid_redirect_uri';
                            errorMessage = 'Invalid redirect URI. Please check your Meta App Dashboard OAuth settings.';
                        } else if (fbError.message.includes('code')) {
                            errorType = 'invalid_code';
                            errorMessage = 'Invalid authorization code. Please try connecting again.';
                        } else {
                            errorMessage = `Facebook OAuth error: ${fbError.message}`;
                        }
                        break;
                    default:
                        errorMessage = `Facebook API error: ${fbError.message}`;
                }
            }

            return res.redirect(`${recoveredReturnUrl}?error=${errorType}&error_description=${encodeURIComponent(errorMessage)}`);
        }

        const { access_token } = tokenResponse.data;

        // Get user's Facebook pages (which include Instagram Business accounts)
        console.log('🔍 Fetching Facebook pages with Instagram Business accounts...');

        let pagesResponse;
        try {
            // Updated for Graph API v23.0 - removed account_type field as it's no longer available
            pagesResponse = await axios.get(`https://graph.facebook.com/v23.0/me/accounts`, {
                params: {
                    access_token: access_token,
                    fields: 'id,name,instagram_business_account{id,username,name,profile_picture_url,followers_count}'
                }
            });
            console.log('✅ Successfully fetched Facebook pages');
        } catch (pagesError) {
            console.error('❌ Facebook Graph API pages request failed:');
            console.error('❌ Status:', pagesError.response && pagesError.response.status);
            console.error('❌ Error Data:', JSON.stringify(pagesError.response && pagesError.response.data, null, 2));

            let errorType = 'api_error';
            let errorMessage = 'Failed to fetch Facebook pages';

            if (pagesError.response && pagesError.response.data && pagesError.response.data.error) {
                const fbError = pagesError.response.data.error;
                console.error('❌ Facebook Error Code:', fbError.code);
                console.error('❌ Facebook Error Type:', fbError.type);
                console.error('❌ Facebook Error Message:', fbError.message);

                if (fbError.message.includes('nonexisting field')) {
                    errorType = 'api_field_error';
                    errorMessage = 'Facebook Graph API field error. The API version may have changed.';
                } else if (fbError.message.includes('permissions')) {
                    errorType = 'insufficient_permissions';
                    errorMessage = 'Insufficient permissions to access Facebook pages. Please reconnect and grant all required permissions.';
                } else {
                    errorMessage = `Facebook API error: ${fbError.message}`;
                }
            }

            return res.redirect(`${recoveredReturnUrl}?error=${errorType}&error_description=${encodeURIComponent(errorMessage)}`);
        }

        console.log('📄 Found pages:', (pagesResponse.data.data && pagesResponse.data.data.length) || 0);

        // Find Instagram Business accounts
        const instagramAccounts = [];
        for (const page of pagesResponse.data.data) {
            if (page.instagram_business_account) {
                // Get Instagram account details
                // Updated for Graph API v23.0 - removed account_type field as it's no longer available
                const igResponse = await axios.get(`https://graph.facebook.com/v23.0/${page.instagram_business_account.id}`, {
                    params: {
                        access_token: access_token,
                        fields: 'id,username,name,profile_picture_url,followers_count,media_count,biography'
                    }
                });

                const igData = igResponse.data;

                // In Graph API v23.0, if we can access the Instagram Business account through Facebook pages,
                // it's already confirmed to be a Business account (not Personal or Creator)
                console.log('✅ Found Instagram Business account:', igData.username);
                instagramAccounts.push({
                    ...igData,
                    page_id: page.id,
                    page_name: page.name,
                    access_token: access_token,
                    account_type: 'BUSINESS' // Set explicitly since it's confirmed to be Business
                });
            }
        }

        if (instagramAccounts.length === 0) {
            console.log('⚠️ No Instagram Business accounts found for user:', recoveredUserId);

            // Check if user has any Facebook pages at all
            if (pagesResponse.data.data.length === 0) {
                console.log('❌ No Facebook Pages found');
                return res.redirect(`${recoveredReturnUrl}?error=account_not_eligible&error_description=${encodeURIComponent('No Facebook Pages found. Please create a Facebook Page and connect it to your Instagram account.')}`);
            } else {
                // Log available pages for debugging
                const availablePages = pagesResponse.data.data.map(page => ({
                    name: page.name,
                    has_instagram: !!page.instagram_business_account,
                    instagram_username: page.instagram_business_account && page.instagram_business_account.username
                }));
                console.log('📋 Available pages:', availablePages);

                return res.redirect(`${recoveredReturnUrl}?error=no_business_accounts&error_description=${encodeURIComponent('No Instagram Business accounts found. Please ensure your Instagram account is set to Business mode (not Creator or Personal) and is connected to a Facebook Page.')}`);
            }
        }

        // Store the first Instagram account (or let user choose if multiple)
        const igAccount = instagramAccounts[0];

        // Check if account already exists (reconnection scenario)
        const existingAccounts = await socialQueries.getSocialAccounts(recoveredUserId);
        const existingAccount = existingAccounts.find(acc =>
            acc.platform === 'instagram' && acc.platform_account_id === igAccount.id
        );

        let isReconnection = false;

        if (existingAccount) {
            // Update existing account
            await socialQueries.updateSocialAccount(existingAccount.id, {
                access_token: access_token,
                platform_username: igAccount.username,
                platform_name: igAccount.name,
                profile_picture_url: igAccount.profile_picture_url,
                follower_count: igAccount.followers_count,
                account_type: igAccount.account_type,
                account_metadata: {
                    page_id: igAccount.page_id,
                    page_name: igAccount.page_name
                },
                is_active: true,
                last_sync_at: new Date(),
                last_error: null
            });
            isReconnection = true;
        } else {
            // Create new account
            await socialQueries.createSocialAccount({
                platform: 'instagram',
                platform_account_id: igAccount.id,
                platform_username: igAccount.username,
                platform_name: igAccount.name,
                profile_picture_url: igAccount.profile_picture_url,
                access_token: access_token, // TODO: Encrypt this
                token_expires_at: null, // Facebook tokens don't expire for business accounts
                permissions: ['instagram_basic', 'instagram_manage_comments', 'instagram_manage_messages'],
                account_type: igAccount.account_type,
                account_metadata: {
                    page_id: igAccount.page_id,
                    page_name: igAccount.page_name
                },
                connected_by_user_id: recoveredUserId,
                follower_count: igAccount.followers_count
            });
        }

        // Note: Instagram webhook subscriptions are typically configured in Meta App Dashboard
        // Automatic webhook setup is optional and may require additional permissions
        try {
            await setupInstagramWebhook(igAccount.page_id, igAccount.id, access_token);
        } catch (webhookError) {
            console.log('⚠️ Webhook setup failed - this is normal and can be configured manually in Meta App Dashboard');
            console.log('⚠️ Webhook error:', webhookError.message);
        }

        const actionType = isReconnection ? 'reconnected' : 'connected';
        console.log(`✅ Instagram account ${actionType} successfully:`, igAccount.username);

        // Clean up session
        delete req.session.instagram_auth_user_id;
        delete req.session.instagram_auth_return;
        delete req.session.instagram_oauth_state;

        const successParam = isReconnection ? 'instagram_reconnected' : 'instagram_connected';
        res.redirect(`${recoveredReturnUrl}?success=${successParam}`);

    } catch (error) {
        console.error('❌ Error handling Instagram callback:', error);
        const returnUrl = req.session.instagram_auth_return || '/dashboard/settings#integrations';
        res.redirect(`${returnUrl}?error=callback_failed`);
    }
}

/**
 * Set up Instagram webhook subscription (optional)
 * Note: Instagram webhooks are typically configured in Meta App Dashboard
 */
async function setupInstagramWebhook(pageId, instagramAccountId, accessToken) {
    console.log('🔗 Attempting Instagram webhook subscription...');
    console.log('🔗 Page ID:', pageId);
    console.log('🔗 Instagram Account ID:', instagramAccountId);

    // Instagram webhook subscriptions are usually configured in Meta App Dashboard
    // This programmatic approach may not work for all app types
    console.log('ℹ️ Instagram webhooks should be configured in Meta App Dashboard:');
    console.log('ℹ️ 1. Go to your Meta App Dashboard');
    console.log('ℹ️ 2. Navigate to Webhooks');
    console.log('ℹ️ 3. Add webhook URL: https://b2b.click/api/webhooks/instagram');
    console.log('ℹ️ 4. Subscribe to: comments, mentions, story_insights');

    // Skip automatic webhook setup for now
    return { success: false, message: 'Configure webhooks manually in Meta App Dashboard' };
}

/**
 * Handle Instagram webhook verification
 */
function verifyInstagramWebhook(req, res) {
    console.log('🔍 Instagram webhook verification request received:');
    console.log('🔍 Method:', req.method);
    console.log('🔍 URL:', req.url);
    console.log('🔍 Original URL:', req.originalUrl);
    console.log('🔍 Full query object:', JSON.stringify(req.query, null, 2));
    console.log('🔍 Query keys:', Object.keys(req.query));

    // Handle direct access (no query parameters)
    if (Object.keys(req.query).length === 0) {
        console.log('ℹ️ Direct access to webhook endpoint - returning info');
        return res.json({
            message: 'Instagram Webhook Endpoint',
            status: 'active',
            timestamp: new Date().toISOString(),
            info: 'This endpoint handles Instagram webhook verification and events'
        });
    }

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('🔍 Instagram webhook verification attempt:');
    console.log('🔍 Mode:', mode);
    console.log('🔍 Received token:', token);
    console.log('🔍 Expected token:', process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN);
    console.log('🔍 Challenge:', challenge);
    console.log('🔍 Token match:', token === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN);

    if (mode === 'subscribe' && token === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN) {
        console.log('✅ Instagram webhook verified successfully');
        res.status(200).send(challenge);
    } else {
        console.error('❌ Instagram webhook verification failed');
        console.error('❌ Mode check:', mode === 'subscribe');
        console.error('❌ Token check:', token === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN);
        console.error('❌ Environment variable set:', !!process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN);
        res.status(403).send('Forbidden');
    }
}

/**
 * Handle Instagram webhook events
 */
async function handleInstagramWebhook(req, res) {
    try {
        const body = req.body;
        const requestId = req.requestId || 'unknown';

        console.log(`🚀 Instagram Webhook Handler (${requestId})`);

        // Get log level for conditional detailed logging
        const LOG_LEVELS = { MINIMAL: 1, NORMAL: 2, VERBOSE: 3, DEBUG: 4 };
        const logLevel = LOG_LEVELS[process.env.LOG_LEVEL && process.env.LOG_LEVEL.toUpperCase()] || LOG_LEVELS.NORMAL;

        if (logLevel >= LOG_LEVELS.VERBOSE) {
            console.log('📨 Body:', JSON.stringify(body, null, 2));
        }

        // Verify webhook signature (skip for test webhooks from Meta dashboard)
        const signature = req.headers['x-hub-signature-256'];
        const isTestWebhook = body.object === 'instagram' && body.entry && body.entry.length > 0 &&
            (body.entry[0].id === 'test' || body.entry[0].id === '0');

        console.log(`🔍 Webhook Type: ${isTestWebhook ? 'Test' : 'Production'} | Entry ID: ${body.entry && body.entry[0] && body.entry[0].id || 'unknown'}`);

        if (!isTestWebhook && signature) {
            // Use raw buffer if available, otherwise fall back to string
            const rawBody = req.rawBodyBuffer || req.rawBody || JSON.stringify(body);

            if (!verifyWebhookSignature(rawBody, signature)) {
                console.error('❌ Invalid Instagram webhook signature');
                return res.status(403).send('Forbidden');
            }
            console.log('✅ Webhook signature verified');
        } else if (!isTestWebhook && !signature) {
            console.warn('⚠️ No signature provided for non-test webhook, allowing for debugging');
        }

        // Handle test webhooks from Facebook
        if (isTestWebhook) {
            console.log('✅ Test webhook received from Facebook - responding with success');
            console.log('ℹ️ This is a test webhook from Meta App Dashboard, not a real Instagram interaction');
            return res.status(200).json({
                success: true,
                message: 'Test webhook received successfully',
                webhook_type: 'test',
                timestamp: new Date().toISOString()
            });
        }

        // Process each entry for production webhooks
        for (const entry of body.entry || []) {
            // Handle comment webhooks (changes structure)
            for (const change of entry.changes || []) {
                await processInstagramChange(change, entry.id);
            }

            // Handle message webhooks (messaging structure)
            for (const message of entry.messaging || []) {
                await processInstagramMessage(message, entry.id);
            }
        }

        res.status(200).send('OK');

    } catch (error) {
        console.error('❌ Error handling Instagram webhook:', error);
        res.status(500).send('Error');
    }
}

/**
 * Process Instagram webhook change event
 */
async function processInstagramChange(change, instagramAccountId) {
    try {
        const { field, value } = change;

        if (field === 'comments') {
            await processInstagramComment(value, instagramAccountId);
        } else if (field === 'messages') {
            await processInstagramMessage(value, instagramAccountId);
        } else {
            console.log(`ℹ️ Unhandled webhook field: ${field}`);
        }

    } catch (error) {
        console.error('❌ Error processing Instagram change:', error);
    }
}

/**
 * Process Instagram comment
 */
async function processInstagramComment(commentData, instagramAccountId) {
    try {
        console.log(`🔍 Processing comment for account: ${instagramAccountId}`);

        // Get all social accounts and find the Instagram one
        const socialAccounts = await knex("social_media_accounts")
            .where("platform", "instagram")
            .where("platform_account_id", instagramAccountId);

        const account = socialAccounts && socialAccounts[0];

        if (!account) {
            console.error(`❌ Instagram account not found: ${instagramAccountId} (${(socialAccounts && socialAccounts.length) || 0} accounts checked)`);
            return;
        }

        console.log(`✅ Found Instagram account: ${account.platform_account_id}`);

        // Extract comment details
        const comment = commentData;
        const commentText = comment.text || '';

        // Find matching keywords - search across all events for this user
        console.log('🔍 Searching for keywords with:', { commentText, keywordType: 'instagram', socialAccountId: account.id, userId: account.connected_by_user_id });

        // First try with specific social account
        let matchingKeywords = await socialQueries.findMatchingKeywords(commentText, 'instagram', account.id);

        // If no matches, try searching all keywords for this user (across all events)
        if (matchingKeywords.length === 0) {
            console.log('🔍 No keywords found for specific social account, searching all user keywords...');
            matchingKeywords = await socialQueries.findMatchingKeywords(commentText, 'instagram', null);
        }

        if (matchingKeywords.length === 0) {
            console.log('ℹ️ No matching keywords for comment:', commentText);
            return;
        }

        // Use the first matching keyword
        const keyword = matchingKeywords[0];

        // Create interaction record
        // Convert Instagram timestamp (milliseconds) to proper Date object
        const platformTimestamp = comment.timestamp ? new Date(comment.timestamp) : new Date();
        console.log('🔍 Converting comment timestamp:', comment.timestamp, '→', platformTimestamp);

        const interaction = await socialQueries.createSocialInteraction({
            social_account_id: account.id,
            platform_interaction_id: comment.id,
            interaction_type: 'comment',
            content: commentText,
            post_id: comment.media && comment.media.id,
            platform_user_id: comment.from && comment.from.id,
            platform_username: comment.from && comment.from.username,
            matched_keyword_id: keyword.id,
            matched_keyword_text: keyword.keyword,
            platform_created_at: platformTimestamp,
            raw_webhook_data: commentData
        });

        // Send auto-response if configured
        if (keyword.send_auto_response && keyword.auto_response_message) {
            await sendInstagramDM(
                account.access_token,
                account.platform_account_id, // Use Instagram account ID
                comment.from.id,
                keyword.auto_response_message,
                interaction.id
            );
        }

        // Capture user data if configured
        if (keyword.capture_user_data) {
            await captureInstagramUser(comment.from, keyword, interaction.id);
        }

        console.log('✅ Instagram comment processed successfully');

    } catch (error) {
        console.error('❌ Error processing Instagram comment:', error);
    }
}

/**
 * Process Instagram message/DM
 */
async function processInstagramMessage(messageData, instagramAccountId) {
    try {
        console.log(`🔍 Processing Instagram message for account: ${instagramAccountId}`);
        console.log('🔍 Instagram DM Handler Version: 2025-07-11-NEW-INSTAGRAM-API-V4');

        // Get all social accounts and find the Instagram one
        const socialAccounts = await knex("social_media_accounts")
            .where("platform", "instagram")
            .where("platform_account_id", instagramAccountId);

        const account = socialAccounts && socialAccounts[0];

        if (!account) {
            console.error(`❌ Instagram account not found: ${instagramAccountId} (${socialAccounts && socialAccounts.length || 0} accounts checked)`);
            return;
        }

        console.log(`✅ Found Instagram account: ${account.platform_account_id}`);

        // Extract message details from Instagram DM webhook structure
        console.log('🔍 Message data structure:', JSON.stringify(messageData, null, 2));

        const message = messageData.message || messageData;
        const messageText = message.text || messageData.text || '';
        const senderId = (messageData.sender && messageData.sender.id) || (messageData.from && messageData.from.id);

        console.log('🔍 Extracted message text:', messageText);
        console.log('🔍 Sender ID:', senderId);

        // Find matching keywords - search across all events for this user
        console.log('🔍 Searching for keywords with:', { messageText, keywordType: 'instagram', socialAccountId: account.id, userId: account.connected_by_user_id });

        // First try with specific social account
        let matchingKeywords = await socialQueries.findMatchingKeywords(messageText, 'instagram', account.id);

        // If no matches, try searching all keywords for this user (across all events)
        if (matchingKeywords.length === 0) {
            console.log('🔍 No keywords found for specific social account, searching all user keywords...');
            matchingKeywords = await socialQueries.findMatchingKeywords(messageText, 'instagram', null);
        }

        if (matchingKeywords.length === 0) {
            console.log('ℹ️ No matching keywords for message:', messageText);
            return;
        }

        // Use the first matching keyword
        const keyword = matchingKeywords[0];

        // Create interaction record
        // Convert Instagram timestamp (milliseconds) to proper Date object
        // Check multiple possible timestamp locations in the webhook payload
        const rawTimestamp = messageData.timestamp || (messageData.message && messageData.message.timestamp) || Date.now();
        const platformTimestamp = new Date(rawTimestamp);

        console.log('🔍 Raw timestamp from webhook:', rawTimestamp);
        console.log('🔍 Converted to Date object:', platformTimestamp);
        console.log('🔍 Date object type:', typeof platformTimestamp);
        console.log('🔍 Date object toString:', platformTimestamp.toString());

        // Extract platform interaction ID from the correct location
        const platformInteractionId = (messageData.message && messageData.message.mid) || messageData.mid || messageData.id || `dm_${Date.now()}`;
        console.log('🔍 Platform interaction ID:', platformInteractionId);

        const interaction = await socialQueries.createSocialInteraction({
            social_account_id: account.id,
            platform_interaction_id: platformInteractionId,
            interaction_type: 'message',
            content: messageText,
            platform_user_id: senderId,
            platform_username: (messageData.sender && messageData.sender.username) || (messageData.from && messageData.from.username),
            matched_keyword_id: keyword.id,
            matched_keyword_text: keyword.keyword,
            platform_created_at: platformTimestamp,
            raw_webhook_data: messageData
        });

        // Send auto-response if configured
        if (keyword.send_auto_response && keyword.auto_response_message) {
            await sendInstagramDM(
                account.access_token,
                account.platform_account_id, // Use Instagram account ID instead of 'me'
                senderId,
                keyword.auto_response_message,
                interaction.id
            );
        }

        // Capture user data if configured
        if (keyword.capture_user_data) {
            const userInfo = messageData.sender || messageData.from || { id: senderId };
            await captureInstagramUser(userInfo, keyword, interaction.id);
        }

        console.log('✅ Instagram message processed successfully');

    } catch (error) {
        console.error('❌ Error processing Instagram message:', error);
    }
}

/**
 * Send Instagram DM
 */
async function sendInstagramDM(accessToken, instagramAccountId, recipientId, message, interactionId) {
    try {
        console.log('🔍 Sending Instagram DM via Instagram API with Instagram Login');
        console.log('🔍 Parameters:', { instagramAccountId, recipientId, message: message.substring(0, 50) + '...' });
        console.log('🔍 API Endpoint:', `${INSTAGRAM_API_BASE}/${instagramAccountId}/messages`);
        console.log('🔍 Access Token (first 20 chars):', accessToken.substring(0, 20) + '...');

        // IMPORTANT: Instagram DM sending uses Facebook App ID, not Instagram App ID
        // - Webhooks use Instagram App ID (for receiving)
        // - API calls use Facebook App ID (for sending)
        // - Access token is from Facebook OAuth flow
        console.log('🔍 Using Instagram API with Facebook App credentials for DM sending');
        console.log('🔍 Instagram Account ID:', instagramAccountId);
        console.log('🔍 Recipient ID:', recipientId);

        const response = await axios.post(`${INSTAGRAM_API_BASE}/${instagramAccountId}/messages`, {
            recipient: { id: recipientId },
            message: { text: message }
        }, {
            params: {
                access_token: accessToken
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Update interaction with response details
        await socialQueries.updateSocialInteraction(interactionId, {
            auto_response_sent: true,
            auto_response_sent_at: new Date(),
            auto_response_content: message,
            auto_response_id: response.data.message_id
        });

        console.log('✅ Instagram DM sent successfully');
        return response.data;

    } catch (error) {
        console.error('❌ Error sending Instagram DM:', error.message);
        console.error('❌ Facebook API Error Details:', error.response && error.response.data);
        console.error('❌ Status Code:', error.response && error.response.status);
        console.error('❌ Request URL:', error.config && error.config.url);
        console.error('❌ Request Data:', error.config && error.config.data);

        // Update interaction with error details (using existing columns)
        if (interactionId) {
            await socialQueries.updateSocialInteraction(interactionId, {
                auto_response_sent: false
                    // Note: Error details logged to console for debugging
            });
        }

        // Don't throw error to prevent webhook processing failure
        console.log('⚠️ Continuing webhook processing despite DM send failure');
    }
}

/**
 * Capture Instagram user data
 */
async function captureInstagramUser(userInfo, keyword, interactionId) {
    try {
        // Create or update user in KUTT system
        // This is a simplified version - you might want more sophisticated user matching

        const userData = {
            first_name: userInfo.username, // Instagram doesn't provide real names
            acquisition_channel: `instagram_${keyword.keyword}`,
            // Add more fields as available
        };

        // For now, we'll just update the interaction to mark user as captured
        await socialQueries.updateSocialInteraction(interactionId, {
            user_captured: true,
            captured_user_data: userInfo
        });

        console.log('✅ Instagram user captured successfully');

    } catch (error) {
        console.error('❌ Error capturing Instagram user:', error);
    }
}

/**
 * Verify webhook signature
 */
function verifyWebhookSignature(payload, signature) {
    if (!signature) {
        console.error('❌ No signature provided');
        return false;
    }

    // Instagram webhooks use the Instagram App Secret for signature verification
    // The verify token is only used for initial webhook verification (GET request)
    const webhookSecret = process.env.INSTAGRAM_APP_SECRET || process.env.FACEBOOK_APP_SECRET;
    if (!webhookSecret) {
        console.error('❌ INSTAGRAM_APP_SECRET (or FACEBOOK_APP_SECRET) not configured');
        return false;
    }

    console.log('🔍 Verifying webhook signature...');
    console.log('🔍 Payload type:', typeof payload);
    console.log('🔍 Payload length:', payload.length);
    console.log('🔍 Received signature:', signature);
    console.log('🔍 Using webhook secret (first 8 chars):', webhookSecret.substring(0, 8) + '...');
    console.log('🔍 INSTAGRAM_APP_SECRET exists:', !!process.env.INSTAGRAM_APP_SECRET);
    console.log('🔍 FACEBOOK_APP_SECRET exists:', !!process.env.FACEBOOK_APP_SECRET);
    console.log('🔍 Secret source:', process.env.INSTAGRAM_APP_SECRET ? 'INSTAGRAM_APP_SECRET' : 'FACEBOOK_APP_SECRET');

    // Debug: Show first 100 chars of payload for verification
    if (Buffer.isBuffer(payload)) {
        console.log('🔍 Payload preview (first 100 chars):', payload.toString('utf8').substring(0, 100) + '...');
    } else {
        console.log('🔍 Payload preview (first 100 chars):', payload.substring(0, 100) + '...');
    }

    // Handle both Buffer and string inputs
    const hmac = crypto.createHmac('sha256', webhookSecret);
    if (Buffer.isBuffer(payload)) {
        hmac.update(payload);
    } else {
        hmac.update(payload, 'utf8');
    }

    const expectedSignature = 'sha256=' + hmac.digest('hex');

    console.log('🔍 Expected signature:', expectedSignature);
    console.log('🔍 Signatures match:', signature === expectedSignature);

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
}

/**
 * Get Instagram account status
 */
async function getInstagramStatus(req, res) {
    try {
        const userId = req.user.id;
        const accounts = await socialQueries.getSocialAccounts(userId);
        const instagramAccounts = accounts.filter(acc => acc.platform === 'instagram');

        res.json({
            success: true,
            connected: instagramAccounts.length > 0,
            accounts: instagramAccounts.map(acc => ({
                id: acc.id,
                username: acc.platform_username,
                name: acc.platform_name,
                profile_picture: acc.profile_picture_url,
                is_active: acc.is_active,
                connected_at: acc.connected_at
            }))
        });

    } catch (error) {
        console.error('❌ Error getting Instagram status:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get Instagram status',
            message: error.message
        });
    }
}

/**
 * Disconnect Instagram account
 */
async function disconnectInstagram(req, res) {
    try {
        const { accountId } = req.params;
        const userId = req.user.id;

        await socialQueries.deleteSocialAccount(accountId, userId);

        res.json({
            success: true,
            message: 'Instagram account disconnected successfully'
        });

    } catch (error) {
        console.error('❌ Error disconnecting Instagram:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to disconnect Instagram account',
            message: error.message
        });
    }
}

/**
 * Debug endpoint to verify environment variables (admin only)
 */
async function debugInstagramConfig(req, res) {
    try {
        // Only allow in development or for admin users
        if (process.env.NODE_ENV === 'production' && (!req.user || req.user.role !== 'admin')) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const config = {
            facebook_app_id: process.env.FACEBOOK_APP_ID || 'MISSING',
            facebook_app_secret: process.env.FACEBOOK_APP_SECRET ?
                process.env.FACEBOOK_APP_SECRET.substring(0, 8) + '...' : 'MISSING',
            facebook_redirect_uri: process.env.FACEBOOK_REDIRECT_URI || 'MISSING',
            instagram_webhook_verify_token: process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN ?
                process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN.substring(0, 8) + '...' : 'MISSING',
            base_url: process.env.BASE_URL || 'MISSING',
            node_env: process.env.NODE_ENV || 'MISSING'
        };

        console.log('🔍 Instagram configuration debug requested');
        console.log('🔍 Configuration:', config);

        res.json({
            status: 'success',
            message: 'Instagram configuration debug info',
            config: config,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Error in debug endpoint:', error);
        res.status(500).json({
            error: 'Debug endpoint failed',
            message: error.message
        });
    }
}

module.exports = {
    initiateInstagramAuth,
    handleInstagramCallback,
    verifyInstagramWebhook,
    handleInstagramWebhook,
    getInstagramStatus,
    disconnectInstagram,
    debugInstagramConfig
};