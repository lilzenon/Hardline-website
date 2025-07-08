const socialQueries = require('../queries/social-integrations.queries');

/**
 * Handle incoming SMS webhook from Twilio
 */
async function handleSmsWebhook(req, res) {
    try {
        console.log('📱 Received SMS webhook:', req.body);
        
        const {
            MessageSid,
            From,
            To,
            Body,
            NumSegments,
            MessageStatus,
            NumMedia,
            AccountSid,
            MessagingServiceSid,
            DateCreated
        } = req.body;
        
        // Validate required fields
        if (!MessageSid || !From || !To || !Body) {
            console.error('❌ Missing required SMS webhook fields');
            return res.status(400).send('Missing required fields');
        }
        
        // Normalize phone numbers
        const fromPhone = normalizePhoneNumber(From);
        const toPhone = normalizePhoneNumber(To);
        const messageBody = Body.trim();
        
        console.log(`📱 SMS from ${fromPhone} to ${toPhone}: "${messageBody}"`);
        
        // Create or update SMS user
        await socialQueries.createOrUpdateSmsUser(fromPhone, {
            // Additional user data can be added here if available
        });
        
        // Find matching keywords
        const matchingKeywords = await socialQueries.findMatchingKeywords(messageBody, 'sms');
        
        if (matchingKeywords.length > 0) {
            console.log(`🎯 Found ${matchingKeywords.length} matching SMS keywords`);
            
            // Process the first matching keyword
            const keyword = matchingKeywords[0];
            
            // Create SMS interaction record
            const interaction = await socialQueries.createSmsInteraction({
                twilio_message_sid: MessageSid,
                interaction_type: 'inbound',
                direction: 'inbound',
                from_phone: fromPhone,
                to_phone: toPhone,
                twilio_phone_number: toPhone,
                message_body: messageBody,
                num_segments: parseInt(NumSegments) || 1,
                message_status: MessageStatus,
                num_media: parseInt(NumMedia) || 0,
                matched_keyword_id: keyword.id,
                matched_keyword_text: keyword.keyword,
                event_id: keyword.event_id,
                processing_status: 'processed',
                account_sid: AccountSid,
                messaging_service_sid: MessagingServiceSid,
                twilio_created_at: DateCreated ? new Date(DateCreated) : new Date(),
                raw_webhook_data: req.body
            });
            
            // Send auto-response if configured
            if (keyword.send_auto_response && keyword.auto_response_message) {
                await sendSmsResponse(fromPhone, keyword.auto_response_message, interaction.id);
            }
            
            // Update keyword trigger count
            await socialQueries.updateKeyword(keyword.id, {
                total_triggers: keyword.total_triggers + 1,
                last_triggered_at: new Date()
            });
            
            console.log('✅ SMS interaction processed successfully');
        } else {
            console.log('ℹ️ No matching keywords found for SMS');
            
            // Still create interaction record for tracking
            await socialQueries.createSmsInteraction({
                twilio_message_sid: MessageSid,
                interaction_type: 'inbound',
                direction: 'inbound',
                from_phone: fromPhone,
                to_phone: toPhone,
                twilio_phone_number: toPhone,
                message_body: messageBody,
                num_segments: parseInt(NumSegments) || 1,
                message_status: MessageStatus,
                num_media: parseInt(NumMedia) || 0,
                processing_status: 'processed',
                account_sid: AccountSid,
                messaging_service_sid: MessagingServiceSid,
                twilio_created_at: DateCreated ? new Date(DateCreated) : new Date(),
                raw_webhook_data: req.body
            });
        }
        
        // Respond to Twilio
        res.status(200).send('OK');
        
    } catch (error) {
        console.error('❌ Error processing SMS webhook:', error);
        res.status(500).send('Internal Server Error');
    }
}

/**
 * Send SMS response using Twilio
 */
async function sendSmsResponse(toPhone, message, interactionId = null) {
    try {
        // Check if Twilio is configured
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
            console.error('❌ Twilio not configured for SMS responses');
            return false;
        }
        
        const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        
        const response = await twilio.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: toPhone
        });
        
        console.log(`✅ SMS response sent to ${toPhone}: "${message}"`);
        
        // Update interaction record if provided
        if (interactionId) {
            await socialQueries.createSmsInteraction({
                twilio_message_sid: response.sid,
                interaction_type: 'outbound',
                direction: 'outbound',
                from_phone: process.env.TWILIO_PHONE_NUMBER,
                to_phone: toPhone,
                message_body: message,
                num_segments: response.numSegments || 1,
                message_status: response.status,
                processing_status: 'processed',
                account_sid: response.accountSid,
                twilio_created_at: response.dateCreated,
                raw_webhook_data: response
            });
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Error sending SMS response:', error);
        return false;
    }
}

/**
 * Normalize phone number format
 */
function normalizePhoneNumber(phone) {
    // Remove all non-digit characters except +
    let normalized = phone.replace(/[^\d+]/g, '');
    
    // Ensure it starts with +
    if (!normalized.startsWith('+')) {
        // Assume US number if no country code
        if (normalized.length === 10) {
            normalized = '+1' + normalized;
        } else if (normalized.length === 11 && normalized.startsWith('1')) {
            normalized = '+' + normalized;
        } else {
            normalized = '+' + normalized;
        }
    }
    
    return normalized;
}

/**
 * Verify Twilio webhook signature (optional security measure)
 */
function verifyTwilioSignature(req, res, next) {
    try {
        if (!process.env.TWILIO_AUTH_TOKEN) {
            console.warn('⚠️ Twilio auth token not configured, skipping signature verification');
            return next();
        }
        
        const twilio = require('twilio');
        const twilioSignature = req.headers['x-twilio-signature'];
        const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        
        if (!twilioSignature) {
            console.warn('⚠️ No Twilio signature header found');
            return next();
        }
        
        const isValid = twilio.validateRequest(
            process.env.TWILIO_AUTH_TOKEN,
            twilioSignature,
            url,
            req.body
        );
        
        if (!isValid) {
            console.error('❌ Invalid Twilio signature');
            return res.status(403).send('Forbidden');
        }
        
        console.log('✅ Twilio signature verified');
        next();
        
    } catch (error) {
        console.error('❌ Error verifying Twilio signature:', error);
        // Continue anyway for development
        next();
    }
}

module.exports = {
    handleSmsWebhook,
    sendSmsResponse,
    verifyTwilioSignature,
    normalizePhoneNumber
};
