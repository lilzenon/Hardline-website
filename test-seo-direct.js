const knex = require('./server/knex');
const query = require('./server/queries');

async function testSEODirect() {
    try {
        console.log('🔍 Testing SEO settings directly...');
        
        // Test database connection
        console.log('1. Testing database connection...');
        const result = await knex.raw('SELECT 1 as test');
        console.log('✅ Database connection successful');
        
        // Test getSEOSettings function
        console.log('2. Testing getSEOSettings function...');
        const seoSettings = await query.seoSettings.getSEOSettings();
        
        if (seoSettings) {
            console.log('✅ SEO settings retrieved:', {
                default_title: seoSettings.default_title,
                default_description: seoSettings.default_description?.substring(0, 50) + '...',
                maintenance_mode: seoSettings.maintenance_mode,
                version: seoSettings.version
            });
        } else {
            console.log('❌ No SEO settings found');
        }
        
        // Test if seo_settings table exists and has data
        console.log('3. Checking seo_settings table...');
        const tableExists = await knex.schema.hasTable('seo_settings');
        console.log('Table exists:', tableExists);
        
        if (tableExists) {
            const count = await knex('seo_settings').count('* as count').first();
            console.log('Records in table:', count.count);
            
            if (count.count > 0) {
                const firstRecord = await knex('seo_settings').first();
                console.log('First record:', {
                    id: firstRecord.id,
                    default_title: firstRecord.default_title,
                    maintenance_mode: firstRecord.maintenance_mode
                });
            }
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await knex.destroy();
    }
}

testSEODirect();
