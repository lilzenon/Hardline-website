const knex = require("../knex");
const { CustomError } = require("../utils");

/**
 * Social Media Accounts Queries
 */

// Get all social media accounts for a user
async function getSocialAccounts(userId) {
    return await knex("social_media_accounts")
        .where("connected_by_user_id", userId)
        .orderBy("created_at", "desc");
}

// Get a specific social media account
async function getSocialAccount(accountId, userId = null) {
    const query = knex("social_media_accounts")
        .where("id", accountId);

    if (userId) {
        query.where("connected_by_user_id", userId);
    }

    return await query.first();
}

// Create a new social media account connection
async function createSocialAccount(data) {
    const [account] = await knex("social_media_accounts")
        .insert({
            platform: data.platform,
            platform_account_id: data.platform_account_id,
            platform_username: data.platform_username,
            platform_name: data.platform_name,
            profile_picture_url: data.profile_picture_url,
            access_token: data.access_token, // Should be encrypted before storing
            refresh_token: data.refresh_token,
            token_expires_at: data.token_expires_at,
            permissions: JSON.stringify(data.permissions || []),
            account_type: data.account_type,
            account_metadata: JSON.stringify(data.account_metadata || {}),
            connected_by_user_id: data.connected_by_user_id,
            follower_count: data.follower_count
        })
        .returning("*");

    return account;
}

// Update social media account
async function updateSocialAccount(accountId, data, userId = null) {
    const query = knex("social_media_accounts")
        .where("id", accountId);

    if (userId) {
        query.where("connected_by_user_id", userId);
    }

    const updateData = {
        ...data,
        updated_at: knex.fn.now()
    };

    // Handle JSON fields
    if (data.permissions) updateData.permissions = JSON.stringify(data.permissions);
    if (data.account_metadata) updateData.account_metadata = JSON.stringify(data.account_metadata);

    const [account] = await query
        .update(updateData)
        .returning("*");

    return account;
}

// Delete social media account
async function deleteSocialAccount(accountId, userId) {
    return await knex("social_media_accounts")
        .where("id", accountId)
        .where("connected_by_user_id", userId)
        .del();
}

/**
 * Keywords Queries
 */

// Get all keywords for a user or specific social account
async function getKeywords(userId, socialAccountId = null, eventId = null, keywordType = null) {
    console.log('🔍 getKeywords called with:', { userId, socialAccountId, eventId, keywordType });

    const query = knex("social_media_keywords")
        .where("created_by_user_id", userId);

    if (socialAccountId) {
        query.where("social_account_id", socialAccountId);
    }

    if (eventId) {
        query.where("event_id", eventId);
    }

    if (keywordType) {
        query.where("keyword_type", keywordType);
    }

    const result = await query.orderBy("created_at", "desc");
    console.log('🔍 getKeywords returning:', result.length, 'keywords');
    return result;
}

// Get a specific keyword
async function getKeyword(keywordId, userId = null) {
    const query = knex("social_media_keywords")
        .where("id", keywordId);

    if (userId) {
        query.where("created_by_user_id", userId);
    }

    return await query.first();
}

// Create a new keyword
async function createKeyword(data) {
    console.log('🔧 Creating keyword with data:', data);

    const [keyword] = await knex("social_media_keywords")
        .insert({
            keyword: data.keyword,
            description: data.description,
            is_active: data.is_active !== undefined ? data.is_active : true,
            case_sensitive: data.case_sensitive || false,
            exact_match: data.exact_match || false,
            auto_response_message: data.auto_response_message,
            send_auto_response: data.send_auto_response !== undefined ? data.send_auto_response : true,
            response_delay_seconds: data.response_delay_seconds || 0,
            social_account_id: data.social_account_id,
            target_post_types: JSON.stringify(data.target_post_types || []),
            target_hashtags: JSON.stringify(data.target_hashtags || []),
            capture_user_data: data.capture_user_data !== undefined ? data.capture_user_data : true,
            signup_type: data.signup_type || 'general',
            event_id: data.event_id, // Add event_id field
            keyword_type: data.keyword_type || 'instagram', // Add keyword_type field
            drop_id: data.drop_id,
            custom_fields: JSON.stringify(data.custom_fields || {}),
            created_by_user_id: data.created_by_user_id,
            total_triggers: 0,
            total_responses_sent: 0,
            total_users_captured: 0
        })
        .returning("*");

    console.log('🔧 Created keyword:', keyword);
    return keyword;
}

// Update keyword
async function updateKeyword(keywordId, data, userId = null) {
    const query = knex("social_media_keywords")
        .where("id", keywordId);

    if (userId) {
        query.where("created_by_user_id", userId);
    }

    const updateData = {
        ...data,
        updated_at: knex.fn.now()
    };

    // Handle JSON fields
    if (data.target_post_types) updateData.target_post_types = JSON.stringify(data.target_post_types);
    if (data.target_hashtags) updateData.target_hashtags = JSON.stringify(data.target_hashtags);
    if (data.custom_fields) updateData.custom_fields = JSON.stringify(data.custom_fields);

    const [keyword] = await query
        .update(updateData)
        .returning("*");

    return keyword;
}

// Delete keyword
async function deleteKeyword(keywordId, userId) {
    return await knex("social_media_keywords")
        .where("id", keywordId)
        .where("created_by_user_id", userId)
        .del();
}

// Find matching keywords for a given text and social account
async function findMatchingKeywords(text, keywordType = 'instagram', socialAccountId = null, eventId = null) {
    const query = knex("social_media_keywords")
        .where("is_active", true)
        .where("keyword_type", keywordType);

    if (socialAccountId) {
        query.where("social_account_id", socialAccountId);
    }

    if (eventId) {
        query.where("event_id", eventId);
    }

    const keywords = await query;
    const matches = [];
    const lowerText = text.toLowerCase();

    for (const keyword of keywords) {
        const keywordText = keyword.case_sensitive ? keyword.keyword : keyword.keyword.toLowerCase();
        const searchText = keyword.case_sensitive ? text : lowerText;

        let isMatch = false;
        if (keyword.exact_match) {
            isMatch = searchText === keywordText;
        } else {
            isMatch = searchText.includes(keywordText);
        }

        if (isMatch) {
            matches.push(keyword);
        }
    }

    return matches;
}

/**
 * Social Interactions Queries
 */

// Create a new social interaction
async function createSocialInteraction(data) {
    const [interaction] = await knex("social_interactions")
        .insert({
            social_account_id: data.social_account_id,
            platform_interaction_id: data.platform_interaction_id,
            interaction_type: data.interaction_type,
            content: data.content,
            post_id: data.post_id,
            post_url: data.post_url,
            media_attachments: JSON.stringify(data.media_attachments || []),
            platform_user_id: data.platform_user_id,
            platform_username: data.platform_username,
            platform_display_name: data.platform_display_name,
            platform_profile_picture: data.platform_profile_picture,
            platform_follower_count: data.platform_follower_count,
            matched_keyword_id: data.matched_keyword_id,
            matched_keyword_text: data.matched_keyword_text,
            platform_created_at: data.platform_created_at,
            raw_webhook_data: JSON.stringify(data.raw_webhook_data || {})
        })
        .returning("*");

    return interaction;
}

// Update social interaction
async function updateSocialInteraction(interactionId, data) {
    const updateData = {
        ...data,
        updated_at: knex.fn.now()
    };

    // Handle JSON fields
    if (data.media_attachments) updateData.media_attachments = JSON.stringify(data.media_attachments);
    if (data.captured_user_data) updateData.captured_user_data = JSON.stringify(data.captured_user_data);
    if (data.raw_webhook_data) updateData.raw_webhook_data = JSON.stringify(data.raw_webhook_data);

    const [interaction] = await knex("social_interactions")
        .where("id", interactionId)
        .update(updateData)
        .returning("*");

    return interaction;
}

// Get social interactions with pagination
async function getSocialInteractions(filters = {}, page = 1, limit = 50) {
    const query = knex("social_interactions")
        .leftJoin("social_media_accounts", "social_interactions.social_account_id", "social_media_accounts.id")
        .leftJoin("social_keywords", "social_interactions.matched_keyword_id", "social_keywords.id")
        .select(
            "social_interactions.*",
            "social_media_accounts.platform",
            "social_media_accounts.platform_username as account_username",
            "social_keywords.keyword as matched_keyword"
        );

    // Apply filters
    if (filters.social_account_id) {
        query.where("social_interactions.social_account_id", filters.social_account_id);
    }
    if (filters.interaction_type) {
        query.where("social_interactions.interaction_type", filters.interaction_type);
    }
    if (filters.processing_status) {
        query.where("social_interactions.processing_status", filters.processing_status);
    }
    if (filters.user_captured !== undefined) {
        query.where("social_interactions.user_captured", filters.user_captured);
    }
    if (filters.date_from) {
        query.where("social_interactions.created_at", ">=", filters.date_from);
    }
    if (filters.date_to) {
        query.where("social_interactions.created_at", "<=", filters.date_to);
    }

    // Get total count
    const totalQuery = query.clone();
    const [{ count }] = await totalQuery.count("social_interactions.id as count");

    // Apply pagination
    const offset = (page - 1) * limit;
    const interactions = await query
        .orderBy("social_interactions.created_at", "desc")
        .limit(limit)
        .offset(offset);

    return {
        interactions,
        pagination: {
            page,
            limit,
            total: parseInt(count),
            pages: Math.ceil(count / limit)
        }
    };
}

/**
 * Integration Statistics
 */

// Get integration stats for dashboard
async function getIntegrationStats(userId, dateFrom = null, dateTo = null) {
    const baseQuery = knex("social_interactions")
        .join("social_media_accounts", "social_interactions.social_account_id", "social_media_accounts.id")
        .where("social_media_accounts.connected_by_user_id", userId);

    if (dateFrom) baseQuery.where("social_interactions.created_at", ">=", dateFrom);
    if (dateTo) baseQuery.where("social_interactions.created_at", "<=", dateTo);

    const [
        totalCaptured,
        totalResponses,
        activeKeywords,
        totalInteractions
    ] = await Promise.all([
        baseQuery.clone().where("user_captured", true).count("* as count").first(),
        baseQuery.clone().where("auto_response_sent", true).count("* as count").first(),
        knex("social_keywords").where("created_by_user_id", userId).where("is_active", true).count("* as count").first(),
        baseQuery.clone().count("* as count").first()
    ]);

    return {
        total_captured: parseInt(totalCaptured.count),
        total_responses: parseInt(totalResponses.count),
        active_keywords: parseInt(activeKeywords.count),
        total_interactions: parseInt(totalInteractions.count)
    };
}

/**
 * SMS Interactions Queries
 */

// Create SMS interaction
async function createSmsInteraction(data) {
    const [interaction] = await knex("sms_interactions")
        .insert({
            twilio_message_sid: data.twilio_message_sid,
            interaction_type: data.interaction_type,
            direction: data.direction,
            from_phone: data.from_phone,
            to_phone: data.to_phone,
            twilio_phone_number: data.twilio_phone_number,
            message_body: data.message_body,
            num_segments: data.num_segments,
            message_status: data.message_status,
            media_urls: data.media_urls ? JSON.stringify(data.media_urls) : null,
            num_media: data.num_media || 0,
            matched_keyword_id: data.matched_keyword_id,
            matched_keyword_text: data.matched_keyword_text,
            event_id: data.event_id,
            processing_status: data.processing_status || 'pending',
            account_sid: data.account_sid,
            messaging_service_sid: data.messaging_service_sid,
            price: data.price,
            price_unit: data.price_unit,
            twilio_created_at: data.twilio_created_at,
            raw_webhook_data: data.raw_webhook_data ? JSON.stringify(data.raw_webhook_data) : null
        })
        .returning("*");

    return interaction;
}

// Get SMS interactions with filtering
async function getSmsInteractions(filters = {}, page = 1, limit = 50) {
    const query = knex("sms_interactions")
        .select("sms_interactions.*", "social_keywords.keyword as keyword_text")
        .leftJoin("social_keywords", "sms_interactions.matched_keyword_id", "social_keywords.id");

    // Apply filters
    if (filters.event_id) {
        query.where("sms_interactions.event_id", filters.event_id);
    }

    if (filters.from_phone) {
        query.where("sms_interactions.from_phone", filters.from_phone);
    }

    if (filters.processing_status) {
        query.where("sms_interactions.processing_status", filters.processing_status);
    }

    if (filters.date_from) {
        query.where("sms_interactions.created_at", ">=", filters.date_from);
    }

    if (filters.date_to) {
        query.where("sms_interactions.created_at", "<=", filters.date_to);
    }

    // Get total count
    const totalQuery = query.clone();
    const [{ count }] = await totalQuery.count("* as count");
    const total = parseInt(count);

    // Apply pagination
    const offset = (page - 1) * limit;
    const interactions = await query
        .orderBy("sms_interactions.created_at", "desc")
        .limit(limit)
        .offset(offset);

    return {
        interactions,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    };
}

// Create or update SMS user
async function createOrUpdateSmsUser(phoneNumber, data = {}) {
    const existingUser = await knex("sms_users")
        .where("phone_number", phoneNumber)
        .first();

    if (existingUser) {
        // Update existing user
        const [user] = await knex("sms_users")
            .where("id", existingUser.id)
            .update({
                first_name: data.first_name || existingUser.first_name,
                last_name: data.last_name || existingUser.last_name,
                email: data.email || existingUser.email,
                additional_data: data.additional_data ? JSON.stringify(data.additional_data) : existingUser.additional_data,
                total_messages_received: knex.raw("total_messages_received + 1"),
                last_message_at: new Date(),
                updated_at: new Date()
            })
            .returning("*");

        return user;
    } else {
        // Create new user
        const [user] = await knex("sms_users")
            .insert({
                phone_number: phoneNumber,
                country_code: data.country_code,
                carrier: data.carrier,
                phone_type: data.phone_type,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                additional_data: data.additional_data ? JSON.stringify(data.additional_data) : null,
                total_messages_received: 1,
                first_message_at: new Date(),
                last_message_at: new Date()
            })
            .returning("*");

        return user;
    }
}

module.exports = {
    // Social Accounts
    getSocialAccounts,
    getSocialAccount,
    createSocialAccount,
    updateSocialAccount,
    deleteSocialAccount,

    // Keywords
    getKeywords,
    getKeyword,
    createKeyword,
    updateKeyword,
    deleteKeyword,
    findMatchingKeywords,

    // Interactions
    createSocialInteraction,
    updateSocialInteraction,
    getSocialInteractions,

    // SMS Interactions
    createSmsInteraction,
    getSmsInteractions,
    createOrUpdateSmsUser,

    // Stats
    getIntegrationStats
};