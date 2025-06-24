/**
 * Enhance home_settings address fields for intelligent autocomplete and validation
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🏠 Enhancing home_settings address fields for intelligent autocomplete...');
    
    try {
        // Check if enhanced address columns already exist in home_settings
        const hasAddressData = await knex.schema.hasColumn('home_settings', 'address_data');
        const hasAddressCoords = await knex.schema.hasColumn('home_settings', 'address_latitude');
        const hasAddressComponents = await knex.schema.hasColumn('home_settings', 'address_components');
        const hasAddressValidated = await knex.schema.hasColumn('home_settings', 'address_validated');
        
        if (!hasAddressData || !hasAddressCoords || !hasAddressComponents || !hasAddressValidated) {
            await knex.schema.alterTable('home_settings', function(table) {
                if (!hasAddressData) {
                    table.json('address_data').nullable().comment('Complete address data from geocoding API');
                    console.log('✅ Added address_data column to home_settings');
                }
                
                if (!hasAddressCoords) {
                    table.decimal('address_latitude', 10, 8).nullable().comment('Address latitude coordinate');
                    table.decimal('address_longitude', 11, 8).nullable().comment('Address longitude coordinate');
                    console.log('✅ Added address coordinate columns to home_settings');
                }
                
                if (!hasAddressComponents) {
                    table.json('address_components').nullable().comment('Structured address components (street, city, state, etc.)');
                    console.log('✅ Added address_components column to home_settings');
                }
                
                if (!hasAddressValidated) {
                    table.string('address_formatted', 500).nullable().comment('Standardized formatted address');
                    table.boolean('address_validated').defaultTo(false).comment('Whether address has been validated via API');
                    table.timestamp('address_validated_at').nullable().comment('When address was last validated');
                    console.log('✅ Added address validation columns to home_settings');
                }
            });
            
            // Extend the existing event_address field length to match the new system
            const hasEventAddress = await knex.schema.hasColumn('home_settings', 'event_address');
            if (hasEventAddress) {
                await knex.schema.alterTable('home_settings', function(table) {
                    table.string('event_address', 500).alter().comment('Event address (extended for enhanced autocomplete)');
                });
                console.log('✅ Extended event_address field length to 500 characters');
            }
            
            // Add indexes for geographic queries (if coordinates were added)
            if (!hasAddressCoords) {
                await knex.schema.alterTable('home_settings', function(table) {
                    table.index(['address_latitude', 'address_longitude'], 'home_settings_coordinates_index');
                    table.index(['address_validated'], 'home_settings_address_validated_index');
                });
                console.log('✅ Added indexes for geographic and validation queries to home_settings');
            }
            
            console.log('🎉 Home settings address enhancement completed successfully');
        } else {
            console.log('ℹ️ Enhanced address fields already exist in home_settings table');
        }
        
    } catch (error) {
        console.error('❌ Error enhancing home_settings address fields:', error);
        throw error;
    }
};

/**
 * Remove enhanced address fields from home_settings
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Removing enhanced address fields from home_settings...');
    
    try {
        await knex.schema.alterTable('home_settings', function(table) {
            // Drop indexes first
            table.dropIndex(['address_latitude', 'address_longitude'], 'home_settings_coordinates_index');
            table.dropIndex(['address_validated'], 'home_settings_address_validated_index');
            
            // Drop columns
            table.dropColumn('address_data');
            table.dropColumn('address_latitude');
            table.dropColumn('address_longitude');
            table.dropColumn('address_components');
            table.dropColumn('address_formatted');
            table.dropColumn('address_validated');
            table.dropColumn('address_validated_at');
        });
        
        // Revert event_address field length back to original
        await knex.schema.alterTable('home_settings', function(table) {
            table.string('event_address', 100).alter().comment('Event address (reverted to original length)');
        });
        
        console.log('✅ Enhanced address fields removed from home_settings table');
        
    } catch (error) {
        console.error('❌ Error removing enhanced address fields from home_settings:', error);
        throw error;
    }
};
