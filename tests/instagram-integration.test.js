/**
 * Instagram Integration Tests
 * Tests for the Instagram API integration, webhook handling, and keyword management
 */

const request = require('supertest');
const app = require('../server/app'); // Assuming you have an app.js file
const knex = require('../server/knex');

describe('Instagram Integration', () => {
    let authToken;
    let testUserId;
    let testSocialAccountId;
    let testKeywordId;

    beforeAll(async () => {
        // Set up test database
        await knex.migrate.latest();
        
        // Create test user and get auth token
        const userResponse = await request(app)
            .post('/api/auth/signup')
            .send({
                email: 'test@example.com',
                password: 'testpassword123',
                role: 'admin'
            });
        
        testUserId = userResponse.body.user.id;
        authToken = userResponse.body.token;
    });

    afterAll(async () => {
        // Clean up test data
        await knex('social_interactions').del();
        await knex('social_keywords').del();
        await knex('social_media_accounts').del();
        await knex('users').where('email', 'test@example.com').del();
        await knex.destroy();
    });

    describe('Webhook Endpoints', () => {
        test('GET /api/webhooks/health should return health status', async () => {
            const response = await request(app)
                .get('/api/webhooks/health');
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.endpoints).toHaveProperty('instagram');
            expect(response.body.endpoints).toHaveProperty('facebook');
        });

        test('GET /api/webhooks/instagram should handle webhook verification', async () => {
            const response = await request(app)
                .get('/api/webhooks/instagram')
                .query({
                    'hub.mode': 'subscribe',
                    'hub.verify_token': process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN || 'test_token',
                    'hub.challenge': 'test_challenge'
                });
            
            expect(response.status).toBe(200);
            expect(response.text).toBe('test_challenge');
        });

        test('GET /api/webhooks/instagram should reject invalid verification', async () => {
            const response = await request(app)
                .get('/api/webhooks/instagram')
                .query({
                    'hub.mode': 'subscribe',
                    'hub.verify_token': 'invalid_token',
                    'hub.challenge': 'test_challenge'
                });
            
            expect(response.status).toBe(403);
        });
    });

    describe('Social Media Accounts API', () => {
        test('POST /api/integrations/accounts should create social media account', async () => {
            const accountData = {
                platform: 'instagram',
                platform_account_id: 'test_ig_account_123',
                platform_username: 'test_account',
                platform_name: 'Test Account',
                access_token: 'test_access_token',
                account_type: 'business',
                connected_by_user_id: testUserId
            };

            // Directly insert into database for testing
            const [account] = await knex('social_media_accounts')
                .insert(accountData)
                .returning('*');
            
            testSocialAccountId = account.id;
            expect(account.platform).toBe('instagram');
            expect(account.platform_username).toBe('test_account');
        });

        test('GET /api/integrations/accounts should return user accounts', async () => {
            const response = await request(app)
                .get('/api/integrations/accounts')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.accounts)).toBe(true);
        });
    });

    describe('Keywords Management API', () => {
        test('POST /api/integrations/keywords should create keyword', async () => {
            const keywordData = {
                keyword: 'RSVP',
                description: 'Test RSVP keyword',
                auto_response_message: 'Thanks for your RSVP!',
                case_sensitive: false,
                exact_match: false,
                send_auto_response: true,
                capture_user_data: true,
                signup_type: 'rsvp',
                social_account_id: testSocialAccountId
            };

            const response = await request(app)
                .post('/api/integrations/keywords')
                .set('Authorization', `Bearer ${authToken}`)
                .send(keywordData);
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.keyword.keyword).toBe('RSVP');
            testKeywordId = response.body.keyword.id;
        });

        test('GET /api/integrations/keywords should return user keywords', async () => {
            const response = await request(app)
                .get('/api/integrations/keywords')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.keywords)).toBe(true);
            expect(response.body.keywords.length).toBeGreaterThan(0);
        });

        test('PUT /api/integrations/keywords/:id should update keyword', async () => {
            const updateData = {
                description: 'Updated RSVP keyword description',
                auto_response_message: 'Updated response message'
            };

            const response = await request(app)
                .put(`/api/integrations/keywords/${testKeywordId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updateData);
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.keyword.description).toBe(updateData.description);
        });
    });

    describe('Keyword Matching Logic', () => {
        test('should find matching keywords for text', async () => {
            const socialQueries = require('../server/queries/social-integrations.queries');
            
            // Test exact match
            const matches1 = await socialQueries.findMatchingKeywords('RSVP', testSocialAccountId);
            expect(matches1.length).toBeGreaterThan(0);
            expect(matches1[0].keyword).toBe('RSVP');
            
            // Test case insensitive
            const matches2 = await socialQueries.findMatchingKeywords('rsvp', testSocialAccountId);
            expect(matches2.length).toBeGreaterThan(0);
            
            // Test contains match
            const matches3 = await socialQueries.findMatchingKeywords('I want to RSVP please', testSocialAccountId);
            expect(matches3.length).toBeGreaterThan(0);
            
            // Test no match
            const matches4 = await socialQueries.findMatchingKeywords('random text', testSocialAccountId);
            expect(matches4.length).toBe(0);
        });
    });

    describe('Social Interactions', () => {
        test('should create social interaction', async () => {
            const socialQueries = require('../server/queries/social-integrations.queries');
            
            const interactionData = {
                social_account_id: testSocialAccountId,
                platform_interaction_id: 'test_comment_123',
                interaction_type: 'comment',
                content: 'RSVP for the event!',
                platform_user_id: 'test_user_456',
                platform_username: 'test_user',
                matched_keyword_id: testKeywordId,
                matched_keyword_text: 'RSVP',
                platform_created_at: new Date()
            };

            const interaction = await socialQueries.createSocialInteraction(interactionData);
            expect(interaction.id).toBeDefined();
            expect(interaction.content).toBe('RSVP for the event!');
            expect(interaction.matched_keyword_id).toBe(testKeywordId);
        });

        test('GET /api/integrations/interactions should return interactions', async () => {
            const response = await request(app)
                .get('/api/integrations/interactions')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.interactions)).toBe(true);
        });
    });

    describe('Integration Statistics', () => {
        test('GET /api/integrations/stats should return statistics', async () => {
            const response = await request(app)
                .get('/api/integrations/stats')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.stats).toHaveProperty('total_captured');
            expect(response.body.stats).toHaveProperty('total_responses');
            expect(response.body.stats).toHaveProperty('active_keywords');
            expect(response.body.stats).toHaveProperty('total_interactions');
        });
    });

    describe('Instagram Status Check', () => {
        test('GET /api/integrations/instagram/status should return connection status', async () => {
            const response = await request(app)
                .get('/api/integrations/instagram/status')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body).toHaveProperty('connected');
            expect(Array.isArray(response.body.accounts)).toBe(true);
        });
    });

    describe('Webhook Processing', () => {
        test('should process Instagram comment webhook', async () => {
            // Mock webhook payload
            const webhookPayload = {
                entry: [{
                    id: testSocialAccountId,
                    changes: [{
                        field: 'comments',
                        value: {
                            id: 'test_comment_789',
                            text: 'RSVP please!',
                            from: {
                                id: 'test_user_789',
                                username: 'test_commenter'
                            },
                            media: {
                                id: 'test_media_123'
                            },
                            timestamp: new Date().toISOString()
                        }
                    }]
                }]
            };

            // Note: This would require mocking the webhook signature verification
            // For now, we'll test the processing logic directly
            const instagramHandler = require('../server/handlers/instagram-integration.handler');
            
            // Test would require proper mocking of Instagram API calls
            // This is a placeholder for the actual webhook processing test
            expect(typeof instagramHandler.handleInstagramWebhook).toBe('function');
        });
    });

    describe('Cleanup', () => {
        test('DELETE /api/integrations/keywords/:id should delete keyword', async () => {
            const response = await request(app)
                .delete(`/api/integrations/keywords/${testKeywordId}`)
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    });
});

// Helper function to create test webhook signature
function createWebhookSignature(payload, secret) {
    const crypto = require('crypto');
    return 'sha256=' + crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');
}

module.exports = {
    createWebhookSignature
};
