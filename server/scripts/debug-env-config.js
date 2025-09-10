#!/usr/bin/env node

/**
 * 🔍 DEBUG ENVIRONMENT CONFIGURATION
 * 
 * Checks if environment variables are being loaded correctly in production
 * and identifies why files are going to wrong locations.
 */

console.log('🔍 ENVIRONMENT CONFIGURATION DEBUG');
console.log('=================================');

console.log('\n📊 Raw Environment Variables:');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`STATIC_UPLOADS_DIR: ${process.env.STATIC_UPLOADS_DIR}`);
console.log(`TEMP_UPLOADS_DIR: ${process.env.TEMP_UPLOADS_DIR}`);

console.log('\n📊 Loaded Environment (via env.js):');
const env = require('../env');
console.log(`STATIC_UPLOADS_DIR: ${env.STATIC_UPLOADS_DIR}`);
console.log(`TEMP_UPLOADS_DIR: ${env.TEMP_UPLOADS_DIR}`);

console.log('\n📊 ImageProcessingService Configuration:');
const path = require('path');
const uploadDir = path.join(env.STATIC_UPLOADS_DIR, 'images');
const originalsDir = path.join(uploadDir, 'originals');
console.log(`Upload Directory: ${uploadDir}`);
console.log(`Originals Directory: ${originalsDir}`);

console.log('\n🔍 File System Check:');
const fs = require('fs').promises;

async function checkPaths() {
    const pathsToCheck = [
        env.STATIC_UPLOADS_DIR,
        uploadDir,
        originalsDir,
        'static/uploads',
        'uploads'
    ];

    for (const pathToCheck of pathsToCheck) {
        try {
            const stats = await fs.stat(pathToCheck);
            const contents = await fs.readdir(pathToCheck);
            console.log(`✅ ${pathToCheck}: exists (${contents.length} items)`);
        } catch (error) {
            console.log(`❌ ${pathToCheck}: ${error.code}`);
        }
    }
}

checkPaths().catch(console.error);
