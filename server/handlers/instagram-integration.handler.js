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
        
        // Instagram OAuth URL with required permissions
        const scopes = [
            'instagram_basic',
            'instagram_manage_comments',
            'instagram_manage_messages',
            'pages_show_list',
            'pages_read_engagement'
        ].join(',');
        
        const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
            `client_id=${process.env.FACEBOOK_APP_ID}&` +
            `redirect_uri=${encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI)}&` +
            `scope=${encodeURIComponent(scopes)}&` +
            `response_type=code&` +
            `state=${crypto.randomBytes(16).toString('hex')}`;
        
        console.log('🔗 Initiating Instagram OAuth flow for user:', userId);
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
        const returnUrl = req.session.instagram_auth_return || '/dashboard/settings#integrations';
        
        if (error) {
            console.error('❌ Instagram OAuth error:', error);
            return res.redirect(`${returnUrl}?error=oauth_failed`);
        }
        
        if (!code || !userId) {
            console.error('❌ Missing code or user ID in Instagram callback');
            return res.redirect(`${returnUrl}?error=invalid_callback`);
        }
        
        // Exchange code for access token
        const tokenResponse = await axios.post('https://graph.facebook.com/v18.0/oauth/access_token', {
            client_id: process.env.FACEBOOK_APP_ID,
            client_secret: process.env.FACEBOOK_APP_SECRET,
            redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
            code: code
        });
        
        const { access_token } = tokenResponse.data;
        
        // Get user's Facebook pages (which include Instagram Business accounts)
        const pagesResponse = await axios.get(`${INSTAGRAM_API_BASE}/me/accounts`, {
            params: {
                access_token: access_token,
                fields: 'id,name,instagram_business_account'
            }
        });
        
        // Find Instagram Business accounts
        const instagramAccounts = [];
        for (const page of pagesResponse.data.data) {
            if (page.instagram_business_account) {
                // Get Instagram account details
                const igResponse = await axios.get(`${INSTAGRAM_API_BASE}/${page.instagram_business_account.id}`, {
                    params: {
                        access_token: access_token,
                        fields: 'id,username,name,profile_picture_url,followers_count,account_type'
                    }
                });
                
                instagramAccounts.push({
                    ...igResponse.data,
                    page_id: page.id,
                    page_name: page.name,
                    access_token: access_token
                });
            }
        }
        
        if (instagramAccounts.length === 0) {
            console.log('⚠️ No Instagram Business accounts found for user:', userId);
            return res.redirect(`${returnUrl}?error=no_business_accounts`);
        }
        
        // Store the first Instagram account (or let user choose if multiple)
        const igAccount = instagramAccounts[0];
        
        // Save to database
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
        
        // Set up webhook subscription
        await setupInstagramWebhook(igAccount.id, access_token);
        
        console.log('✅ Instagram account connected successfully:', igAccount.username);
        
        // Clean up session
        delete req.session.instagram_auth_user_id;
        delete req.session.instagram_auth_return;
        
        res.redirect(`${returnUrl}?success=instagram_connected`);
        
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
    
    if (mode === 'subscribe' && token === process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN) {
        console.log('✅ Instagram webhook verified');
        res.status(200).send(challenge);
    } else {
        console.error('❌ Instagram webhook verification failed');
        res.status(403).send('Forbidden');
    }
}

/**
 * Handle Instagram webhook events
 */
async function handleInstagramWebhook(req, res) {
    try {
        const body = req.body;
        
        // Verify webhook signature
        const signature = req.headers['x-hub-signature-256'];
        if (!verifyWebhookSignature(JSON.stringify(body), signature)) {
            console.error('❌ Invalid Instagram webhook signature');
            return res.status(403).send('Forbidden');
        }
        
        console.log('📨 Instagram webhook received:', JSON.stringify(body, null, 2));
        
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
        const matchingKeywords = await socialQueries.findMatchingKeywords(commentText, account.id);
        
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
            post_id: comment.media?.id,
            platform_user_id: comment.from?.id,
            platform_username: comment.from?.username,
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
