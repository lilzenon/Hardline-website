/**
 * Enhance existing qr_code_scans table for multi-QR code support
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    console.log('🔧 Enhancing qr_code_scans table...');

    try {
        // Check if qr_code_scans table exists
        const hasQrScansTable = await knex.schema.hasTable('qr_code_scans');
        if (hasQrScansTable) {
            // Check if qr_code_id column already exists
            const hasQrCodeIdColumn = await knex.schema.hasColumn('qr_code_scans', 'qr_code_id');
            const hasSessionIdColumn = await knex.schema.hasColumn('qr_code_scans', 'session_id');
            const hasBrowserVersionColumn = await knex.schema.hasColumn('qr_code_scans', 'browser_version');
            const hasOsVersionColumn = await knex.schema.hasColumn('qr_code_scans', 'os_version');
            const hasRegionColumn = await knex.schema.hasColumn('qr_code_scans', 'region');
            const hasLatLngColumns = await knex.schema.hasColumn('qr_code_scans', 'latitude');
            const hasTimezoneColumn = await knex.schema.hasColumn('qr_code_scans', 'timezone');
            const hasUtmColumns = await knex.schema.hasColumn('qr_code_scans', 'utm_source');

            if (!hasQrCodeIdColumn || !hasSessionIdColumn || !hasBrowserVersionColumn ||
                !hasOsVersionColumn || !hasRegionColumn || !hasLatLngColumns ||
                !hasTimezoneColumn || !hasUtmColumns) {

                await knex.schema.alterTable('qr_code_scans', function(table) {
                    if (!hasQrCodeIdColumn) {
                        table
                            .integer('qr_code_id')
                            .unsigned()
                            .nullable();
                        console.log('✅ Added qr_code_id column');
                    }

                    if (!hasSessionIdColumn) {
                        table.string('session_id', 100).nullable();
                        console.log('✅ Added session_id column');
                    }

                    if (!hasBrowserVersionColumn) {
                        table.string('browser_version', 50).nullable();
                        console.log('✅ Added browser_version column');
                    }

                    if (!hasOsVersionColumn) {
                        table.string('os_version', 50).nullable();
                        console.log('✅ Added os_version column');
                    }

                    if (!hasRegionColumn) {
                        table.string('region', 100).nullable();
                        console.log('✅ Added region column');
                    }

                    if (!hasLatLngColumns) {
                        table.decimal('latitude', 10, 8).nullable();
                        table.decimal('longitude', 11, 8).nullable();
                        console.log('✅ Added latitude/longitude columns');
                    }

                    if (!hasTimezoneColumn) {
                        table.string('timezone', 50).nullable();
                        console.log('✅ Added timezone column');
                    }

                    if (!hasUtmColumns) {
                        table.string('utm_source', 100).nullable();
                        table.string('utm_medium', 100).nullable();
                        table.string('utm_campaign', 100).nullable();
                        console.log('✅ Added UTM tracking columns');
                    }
                });

                // Add new indexes for enhanced functionality (skip if they already exist)
                try {
                    await knex.schema.alterTable('qr_code_scans', function(table) {
                        table.index(['qr_code_id'], 'qr_scans_qr_code_id_index');
                        table.index(['session_id'], 'qr_scans_session_index');
                        table.index(['utm_source'], 'qr_scans_utm_source_index');
                    });
                    console.log('✅ Added new indexes');
                } catch (error) {
                    console.log('ℹ️ Some indexes may already exist, continuing...');
                }

                console.log('✅ Enhanced qr_code_scans table successfully');
            } else {
                console.log('ℹ️ qr_code_scans table already enhanced');
            }
        } else {
            console.log('⚠️ qr_code_scans table does not exist, skipping enhancement');
        }

        console.log('🎉 QR code scans table enhancement completed');

    } catch (error) {
        console.error('❌ Error enhancing qr_code_scans table:', error);
        throw error;
    }
};

/**
 * Rollback qr_code_scans table enhancements
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    console.log('🔄 Rolling back qr_code_scans table enhancements...');

    try {
        const hasQrScansTable = await knex.schema.hasTable('qr_code_scans');
        if (hasQrScansTable) {
            await knex.schema.alterTable('qr_code_scans', function(table) {
                table.dropColumn('qr_code_id');
                table.dropColumn('session_id');
                table.dropColumn('browser_version');
                table.dropColumn('os_version');
                table.dropColumn('region');
                table.dropColumn('latitude');
                table.dropColumn('longitude');
                table.dropColumn('timezone');
                table.dropColumn('utm_source');
                table.dropColumn('utm_medium');
                table.dropColumn('utm_campaign');
            });
            console.log('✅ Rolled back qr_code_scans table enhancements');
        }
    } catch (error) {
        console.error('❌ Error rolling back qr_code_scans table enhancements:', error);
        throw error;
    }
};