/**
 * Enhance address fields for intelligent autocomplete and validation
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🏠 Enhancing address fields for intelligent autocomplete...');
    
    try {
        // Check if enhanced address columns already exist
        const hasAddressData = await knex.schema.hasColumn('drops', 'address_data');
        const hasAddressCoords = await knex.schema.hasColumn('drops', 'address_coordinates');
        const hasAddressComponents = await knex.schema.hasColumn('drops', 'address_components');
        const hasAddressValidated = await knex.schema.hasColumn('drops', 'address_validated');
        
        if (!hasAddressData || !hasAddressCoords || !hasAddressComponents || !hasAddressValidated) {
            await knex.schema.alterTable('drops', function(table) {
                if (!hasAddressData) {
                    table.json('address_data').nullable().comment('Complete address data from geocoding API');
                    console.log('✅ Added address_data column');
                }
                
                if (!hasAddressCoords) {
                    table.decimal('address_latitude', 10, 8).nullable().comment('Address latitude coordinate');
                    table.decimal('address_longitude', 11, 8).nullable().comment('Address longitude coordinate');
                    console.log('✅ Added address coordinate columns');
                }
                
                if (!hasAddressComponents) {
                    table.json('address_components').nullable().comment('Structured address components (street, city, state, etc.)');
                    console.log('✅ Added address_components column');
                }
                
                if (!hasAddressValidated) {
                    table.string('address_formatted', 500).nullable().comment('Standardized formatted address');
                    table.boolean('address_validated').defaultTo(false).comment('Whether address has been validated via API');
                    table.timestamp('address_validated_at').nullable().comment('When address was last validated');
                    console.log('✅ Added address validation columns');
                }
            });
            
            // Add indexes for geographic queries
            if (!hasAddressCoords) {
                await knex.schema.alterTable('drops', function(table) {
                    table.index(['address_latitude', 'address_longitude'], 'drops_coordinates_index');
                    table.index(['address_validated'], 'drops_address_validated_index');
                });
                console.log('✅ Added indexes for geographic and validation queries');
            }
            
            console.log('🎉 Address enhancement completed successfully');
        } else {
            console.log('ℹ️ Enhanced address fields already exist in drops table');
        }
        
    } catch (error) {
        console.error('❌ Error enhancing address fields:', error);
        throw error;
    }
};

/**
 * Remove enhanced address fields
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Removing enhanced address fields...');
    
    try {
        await knex.schema.alterTable('drops', function(table) {
            // Drop indexes first
            table.dropIndex(['address_latitude', 'address_longitude'], 'drops_coordinates_index');
            table.dropIndex(['address_validated'], 'drops_address_validated_index');
            
            // Drop columns
            table.dropColumn('address_data');
            table.dropColumn('address_latitude');
            table.dropColumn('address_longitude');
            table.dropColumn('address_components');
            table.dropColumn('address_formatted');
            table.dropColumn('address_validated');
            table.dropColumn('address_validated_at');
        });
        
        console.log('✅ Enhanced address fields removed from drops table');
        
    } catch (error) {
        console.error('❌ Error removing enhanced address fields:', error);
        throw error;
    }
};
