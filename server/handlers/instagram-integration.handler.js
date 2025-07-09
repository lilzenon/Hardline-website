const axios = require('axios');
const crypto = require('crypto');
const { CustomError } = require('../utils');
const socialQueries = require('../queries/social-integrations.queries');
const userQueries = require('../queries/user.queries');

/**
 * Instagram Graph API Integration Handler
 * Handles Instagram Business Account integration, webhooks, and automation
 */

const INSTAGRAM_API_BASE = 'https://graph.facebook.com/v18.0';

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

        // Generate secure state parameter
        const state = crypto.randomBytes(16).toString('hex');
        req.session.instagram_oauth_state = state;

        console.log('🔍 Generated OAuth state:', state);
        console.log('🔍 Session after setting state:', JSON.stringify({
            instagram_auth_user_id: req.session.instagram_auth_user_id,
            instagram_oauth_state: req.session.instagram_oauth_state,
            instagram_auth_return: req.session.instagram_auth_return
        }));

        // Use Facebook OAuth for Instagram Business API access
        // This is the correct flow - Instagram Business API uses Facebook's OAuth
        const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
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

            return res.redirect(`${returnUrl}?error=${errorType}&error_description=${encodeURIComponent(error)}`);
        }

        if (!code || !userId) {
            console.error('❌ Missing code or user ID in Instagram callback');
            return res.redirect(`${returnUrl}?error=invalid_callback`);
        }

        // Validate state parameter for security
        if (!state || state !== expectedState) {
            console.error('❌ Invalid state parameter in Instagram callback');
            return res.redirect(`${returnUrl}?error=invalid_state`);
        }

        // Exchange code for access token using Facebook's token endpoint
        const tokenResponse = await axios.post('https://graph.facebook.com/v18.0/oauth/access_token', {
            client_id: process.env.FACEBOOK_APP_ID,
            client_secret: process.env.FACEBOOK_APP_SECRET,
            redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
            code: code
        });

        const { access_token } = tokenResponse.data;

        // Get user's Facebook pages (which include Instagram Business accounts)
        console.log('🔍 Fetching Facebook pages with Instagram Business accounts...');
        const pagesResponse = await axios.get(`${INSTAGRAM_API_BASE}/me/accounts`, {
            params: {
                access_token: access_token,
                fields: 'id,name,instagram_business_account{id,username,account_type}'
            }
        });

        console.log('📄 Found pages:', pagesResponse.data.data ? .length || 0);

        // Find Instagram Business accounts
        const instagramAccounts = [];
        for (const page of pagesResponse.data.data) {
            if (page.instagram_business_account) {
                // Get Instagram account details
                const igResponse = await axios.get(`${INSTAGRAM_API_BASE}/${page.instagram_business_account.id}`, {
                    params: {
                        access_token: access_token,
                        fields: 'id,username,name,profile_picture_url,followers_count,account_type,media_count,biography'
                    }
                });

                const igData = igResponse.data;

                // Only include Business accounts (not Personal or Creator)
                if (igData.account_type === 'BUSINESS') {
                    console.log('✅ Found Instagram Business account:', igData.username);
                    instagramAccounts.push({
                        ...igData,
                        page_id: page.id,
                        page_name: page.name,
                        access_token: access_token
                    });
                } else {
                    console.log('⚠️ Skipping non-Business Instagram account:', igData.username, 'Type:', igData.account_type);
                }
            }
        }

        if (instagramAccounts.length === 0) {
            console.log('⚠️ No Instagram Business accounts found for user:', userId);

            // Check if user has any Facebook pages at all
            if (pagesResponse.data.data.length === 0) {
                console.log('❌ No Facebook Pages found');
                return res.redirect(`${returnUrl}?error=account_not_eligible&error_description=${encodeURIComponent('No Facebook Pages found. Please create a Facebook Page and connect it to your Instagram account.')}`);
            } else {
                // Log available pages for debugging
                const availablePages = pagesResponse.data.data.map(page => ({
                    name: page.name,
                    has_instagram: !!page.instagram_business_account,
                    instagram_type: page.instagram_business_account ? .account_type
                }));
                console.log('📋 Available pages:', availablePages);

                return res.redirect(`${returnUrl}?error=no_business_accounts&error_description=${encodeURIComponent('No Instagram Business accounts found. Please ensure your Instagram account is set to Business mode (not Creator or Personal) and is connected to a Facebook Page.')}`);
            }
        }

        // Store the first Instagram account (or let user choose if multiple)
        const igAccount = instagramAccounts[0];

        // Check if account already exists (reconnection scenario)
        const existingAccounts = await socialQueries.getSocialAccounts(userId);
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
                connected_by_user_id: userId,
                follower_count: igAccount.followers_count
            });
        }

        // Set up webhook subscription
        await setupInstagramWebhook(igAccount.id, access_token);

        const actionType = isReconnection ? 'reconnected' : 'connected';
        console.log(`✅ Instagram account ${actionType} successfully:`, igAccount.username);

        // Clean up session
        delete req.session.instagram_auth_user_id;
        delete req.session.instagram_auth_return;
        delete req.session.instagram_oauth_state;

        const successParam = isReconnection ? 'instagram_reconnected' : 'instagram_connected';
        res.redirect(`${returnUrl}?success=${successParam}`);

    } catch (error) {
        console.error('❌ Error handling Instagram callback:', error);
        const returnUrl = req.session.instagram_auth_return || '/dashboard/settings#integrations';
        res.redirect(`${returnUrl}?error=callback_failed`);
    }
}

/**
 * Set up Instagram webhook subscription
 */
async function setupInstagramWebhook(instagramAccountId, accessToken) {
    try {
        const webhookUrl = `${process.env.BASE_URL}/api/webhooks/instagram`;
        const verifyToken = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN;

        // Subscribe to Instagram webhooks
        const response = await axios.post(`${INSTAGRAM_API_BASE}/${instagramAccountId}/subscribed_apps`, {
            subscribed_fields: 'comments,messages',
            access_token: accessToken,
            callback_url: webhookUrl,
            verify_token: verifyToken
        });

        console.log('✅ Instagram webhook subscription created:', response.data);
        return response.data;

    } catch (error) {
        console.error('❌ Error setting up Instagram webhook:', error);
        throw error;
    }
}

/**
 * Handle Instagram webhook verification
 */
function verifyInstagramWebhook(req, res) {
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

        console.log('📨 Instagram webhook received:', JSON.stringify(body, null, 2));
        console.log('📨 Headers:', JSON.stringify(req.headers, null, 2));

        // Verify webhook signature (skip for test webhooks from Meta dashboard)
        const signature = req.headers['x-hub-signature-256'];
        const isTestWebhook = body.object === 'instagram' && body.entry && body.entry.length > 0 && body.entry[0].id === 'test';

        if (!isTestWebhook && !verifyWebhookSignature(JSON.stringify(body), signature)) {
            console.error('❌ Invalid Instagram webhook signature');
            console.error('❌ Expected signature format: sha256=...');
            console.error('❌ Received signature:', signature);
            return res.status(403).send('Forbidden');
        }

        if (isTestWebhook) {
            console.log('🧪 Test webhook detected, skipping signature verification');
        } else {
            console.log('✅ Webhook signature verified');
        }

        // Process each entry
        for (const entry of body.entry || []) {
            for (const change of entry.changes || []) {
                await processInstagramChange(change, entry.id);
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
        // Get social account from database
        const socialAccount = await socialQueries.getSocialAccount(null);
        const account = socialAccount.find(acc => acc.platform_account_id === instagramAccountId);

        if (!account) {
            console.error('❌ Instagram account not found:', instagramAccountId);
            return;
        }

        // Extract comment details
        const comment = commentData;
        const commentText = comment.text || '';

        // Find matching keywords
        const matchingKeywords = await socialQueries.findMatchingKeywords(commentText, 'instagram', account.id);

        if (matchingKeywords.length === 0) {
            console.log('ℹ️ No matching keywords for comment:', commentText);
            return;
        }

        // Use the first matching keyword
        const keyword = matchingKeywords[0];

        // Create interaction record
        const interaction = await socialQueries.createSocialInteraction({
            social_account_id: account.id,
            platform_interaction_id: comment.id,
            interaction_type: 'comment',
            content: commentText,
            post_id: comment.media ? .id,
            platform_user_id: comment.from ? .id,
            platform_username: comment.from ? .username,
            matched_keyword_id: keyword.id,
            matched_keyword_text: keyword.keyword,
            platform_created_at: comment.timestamp,
            raw_webhook_data: commentData
        });

        // Send auto-response if configured
        if (keyword.send_auto_response && keyword.auto_response_message) {
            await sendInstagramDM(
                account.access_token,
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
 * Send Instagram DM
 */
async function sendInstagramDM(accessToken, recipientId, message, interactionId) {
    try {
        const response = await axios.post(`${INSTAGRAM_API_BASE}/me/messages`, {
            recipient: { id: recipientId },
            message: { text: message },
            access_token: accessToken
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
        console.error('❌ Error sending Instagram DM:', error);
        throw error;
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
    if (!signature) return false;

    const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', process.env.FACEBOOK_APP_SECRET)
        .update(payload)
        .digest('hex');

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

module.exports = {
    initiateInstagramAuth,
    handleInstagramCallback,
    verifyInstagramWebhook,
    handleInstagramWebhook,
    getInstagramStatus,
    disconnectInstagram
};