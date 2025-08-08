# Instagram Integration Setup Guide

This guide will help you set up the Instagram Business API integration for automated comment and DM responses.

## Prerequisites

1. **Instagram Business Account**: You need an Instagram Business or Creator account
2. **Facebook Page**: Your Instagram account must be connected to a Facebook Page
3. **Facebook Developer Account**: Required to create a Facebook App
4. **SSL Certificate**: Your webhook endpoint must use HTTPS

## Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Create App" and select "Business" type
3. Fill in your app details:
   - App Name: "KUTT Instagram Integration"
   - Contact Email: Your email
   - Business Account: Select or create one

## Step 2: Configure App Permissions

Add the following products to your app:
- **Facebook Login for Business**
- **Instagram Basic Display**
- **Webhooks**

Configure permissions:
- `instagram_basic`
- `instagram_manage_comments`
- `instagram_manage_messages`
- `pages_show_list`
- `pages_read_engagement`

## Step 3: Environment Variables

Add these environment variables to your `.env` file:

```bash
# Facebook/Instagram API Configuration
FACEBOOK_APP_ID=your_app_id_here
FACEBOOK_APP_SECRET=your_app_secret_here
FACEBOOK_REDIRECT_URI=https://yourdomain.com/api/integrations/instagram/callback

# Webhook Configuration
INSTAGRAM_WEBHOOK_VERIFY_TOKEN=your_secure_random_token_here
FACEBOOK_WEBHOOK_VERIFY_TOKEN=your_secure_random_token_here

# Base URL for webhook callbacks
BASE_URL=https://yourdomain.com
```

## Step 4: Configure Webhooks

1. In your Facebook App dashboard, go to **Webhooks**
2. Click "Add Subscription" for Instagram
3. Set the callback URL: `https://yourdomain.com/api/webhooks/instagram`
4. Set the verify token (same as `INSTAGRAM_WEBHOOK_VERIFY_TOKEN`)
5. Subscribe to these fields:
   - `comments`
   - `messages`

## Step 5: App Review (Production)

For production use, you'll need to submit your app for review:

1. Go to **App Review** in your Facebook App dashboard
2. Request permissions for:
   - `instagram_manage_comments`
   - `instagram_manage_messages`
3. Provide detailed use case description
4. Submit demo video showing the integration

## Step 6: Database Migration

Run the database migration to create the required tables:

```bash
npm run migrate
```

This will create the following tables:
- `social_media_accounts`
- `social_keywords`
- `social_interactions`
- `social_media_users`
- `integration_settings`

## Step 7: Test the Integration

1. Navigate to `/dashboard/settings#integrations`
2. Click "Connect Instagram"
3. Complete the OAuth flow
4. Create test keywords in the keyword management interface
5. Test by commenting on your Instagram posts with the keywords

## API Endpoints

### Integration Management
- `GET /api/integrations/instagram/status` - Check connection status
- `GET /api/integrations/instagram/auth` - Initiate OAuth flow
- `DELETE /api/integrations/instagram/:accountId` - Disconnect account

### Keywords Management
- `GET /api/integrations/keywords` - List keywords
- `POST /api/integrations/keywords` - Create keyword
- `PUT /api/integrations/keywords/:id` - Update keyword
- `DELETE /api/integrations/keywords/:id` - Delete keyword

### Analytics
- `GET /api/integrations/stats` - Get integration statistics
- `GET /api/integrations/interactions` - List interactions with filtering

### Webhooks
- `GET /api/webhooks/instagram` - Webhook verification
- `POST /api/webhooks/instagram` - Webhook events

## Keyword Configuration

Keywords support the following options:

- **Keyword**: The trigger text (e.g., "RSVP", "TICKETS")
- **Case Sensitive**: Whether matching is case-sensitive
- **Exact Match**: Whether the keyword must be an exact match or can be contained in text
- **Auto Response**: Custom DM message to send automatically
- **Response Delay**: Delay in seconds before sending response
- **User Capture**: Whether to capture user data for the KUTT system
- **Signup Type**: Type of signup (rsvp, waitlist, presale, general)

## Security Considerations

1. **Token Storage**: Access tokens should be encrypted in the database
2. **Webhook Verification**: Always verify webhook signatures
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Data Privacy**: Comply with Instagram's data usage policies
5. **User Consent**: Ensure users consent to data collection

## Troubleshooting

### Common Issues

1. **Webhook Verification Failed**
   - Check that `INSTAGRAM_WEBHOOK_VERIFY_TOKEN` matches the token in Facebook App settings
   - Ensure your webhook URL is accessible via HTTPS

2. **No Instagram Business Accounts Found**
   - Verify the Instagram account is set to Business or Creator
   - Ensure the Instagram account is connected to a Facebook Page
   - Check that the Facebook Page admin has the necessary permissions

3. **OAuth Errors**
   - Verify `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET` are correct
   - Check that the redirect URI matches exactly (including protocol)
   - Ensure the app is in the correct mode (Development vs Live)

4. **Permission Errors**
   - For development: Add test users to your Facebook App
   - For production: Complete the App Review process

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=instagram:*
```

## Rate Limits

Instagram API has the following rate limits:
- **Graph API Calls**: 200 calls per hour per user
- **Messaging**: 1000 messages per day per page
- **Comments**: No specific limit, but subject to spam detection

## Support

For issues with the integration:
1. Check the server logs for error messages
2. Verify all environment variables are set correctly
3. Test webhook endpoints using tools like ngrok for local development
4. Consult the [Instagram Graph API documentation](https://developers.facebook.com/docs/instagram-api/)

## Next Steps

After setting up the basic integration:
1. Implement keyword management UI
2. Add user data capture workflows
3. Create analytics dashboards
4. Set up automated response templates
5. Implement Facebook Pages integration
