const knex = require('./server/knex');

async function updateSEOTitle() {
    try {
        console.log('🔧 Updating SEO title in database...');
        
        // Check current title
        const current = await knex('seo_settings').first();
        if (current) {
            console.log('Current title:', current.default_title);
        }
        
        // Update the title
        const updated = await knex('seo_settings')
            .update({
                default_title: 'BOUNCE2BOUNCE - NJ\'S PREMIERE EDM COLLECTIVE',
                updated_at: new Date()
            })
            .returning('*');
            
        console.log('✅ SEO title updated successfully');
        console.log('New title:', updated[0]?.default_title);
        
    } catch (error) {
        console.error('❌ Failed to update SEO title:', error);
    } finally {
        await knex.destroy();
    }
}

updateSEOTitle();
