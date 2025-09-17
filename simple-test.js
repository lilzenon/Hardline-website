const path = require('path');
process.env.NODE_ENV = 'development';
require('dotenv').config({ path: path.join(__dirname, '.env') });

async function simpleTest() {
    try {
        console.log('Testing database connection...');
        const knex = require('./server/knex');
        
        const result = await knex('seo_settings').first();
        console.log('Database result:', result?.maintenance_mode);
        
        await knex.destroy();
        console.log('Test completed');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

simpleTest();
