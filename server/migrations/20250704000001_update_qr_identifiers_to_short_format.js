/**
 * Migration: Update QR code identifiers to short 4-character alphanumeric format
 * This migration updates both the event_qr_codes table and the legacy events.qr_code_identifier field
 */

const { customAlphabet } = require('nanoid');

// QR code identifier generator - 4-character alphanumeric for better QR readability
const qrNanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 4);

exports.up = async function(knex) {
    console.log('🔄 Starting QR identifier migration to short format...');
    
    try {
        // Update event_qr_codes table identifiers
        const hasQrCodesTable = await knex.schema.hasTable('event_qr_codes');
        if (hasQrCodesTable) {
            const qrCodes = await knex('event_qr_codes').select('id', 'identifier');
            console.log(`📊 Found ${qrCodes.length} QR codes to update`);
            
            for (const qrCode of qrCodes) {
                // Only update if identifier is longer than 4 characters (old format)
                if (qrCode.identifier && qrCode.identifier.length > 4) {
                    let newIdentifier;
                    let attempts = 0;
                    const maxAttempts = 10;
                    
                    // Generate unique 4-character identifier
                    do {
                        newIdentifier = qrNanoid();
                        const existing = await knex('event_qr_codes')
                            .where('identifier', newIdentifier)
                            .first();
                        
                        if (!existing) break;
                        attempts++;
                    } while (attempts < maxAttempts);
                    
                    if (attempts >= maxAttempts) {
                        console.warn(`⚠️ Could not generate unique identifier for QR code ${qrCode.id}, skipping`);
                        continue;
                    }
                    
                    await knex('event_qr_codes')
                        .where('id', qrCode.id)
                        .update({ identifier: newIdentifier });
                    
                    console.log(`✅ Updated QR code ${qrCode.id}: ${qrCode.identifier} -> ${newIdentifier}`);
                }
            }
        }
        
        // Update legacy events.qr_code_identifier field
        const hasEventsTable = await knex.schema.hasTable('events');
        if (hasEventsTable) {
            const hasQrIdentifierColumn = await knex.schema.hasColumn('events', 'qr_code_identifier');
            
            if (hasQrIdentifierColumn) {
                const events = await knex('events')
                    .select('id', 'qr_code_identifier')
                    .whereNotNull('qr_code_identifier');
                
                console.log(`📊 Found ${events.length} events with QR identifiers to update`);
                
                for (const event of events) {
                    // Only update if identifier is longer than 4 characters (old format)
                    if (event.qr_code_identifier && event.qr_code_identifier.length > 4) {
                        let newIdentifier;
                        let attempts = 0;
                        const maxAttempts = 10;
                        
                        // Generate unique 4-character identifier
                        do {
                            newIdentifier = qrNanoid();
                            const existing = await knex('events')
                                .where('qr_code_identifier', newIdentifier)
                                .first();
                            
                            if (!existing) break;
                            attempts++;
                        } while (attempts < maxAttempts);
                        
                        if (attempts >= maxAttempts) {
                            console.warn(`⚠️ Could not generate unique identifier for event ${event.id}, skipping`);
                            continue;
                        }
                        
                        await knex('events')
                            .where('id', event.id)
                            .update({ qr_code_identifier: newIdentifier });
                        
                        console.log(`✅ Updated event ${event.id}: ${event.qr_code_identifier} -> ${newIdentifier}`);
                    }
                }
            }
        }
        
        console.log('🎉 QR identifier migration completed successfully');
        
    } catch (error) {
        console.error('❌ Error during QR identifier migration:', error);
        throw error;
    }
};

exports.down = async function(knex) {
    console.log('⚠️ QR identifier migration rollback is not supported');
    console.log('   Short identifiers cannot be reliably converted back to original format');
    console.log('   Manual intervention may be required if rollback is necessary');
};
