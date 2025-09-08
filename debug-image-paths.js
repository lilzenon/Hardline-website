#!/usr/bin/env node

/**
 * Debug Image Paths
 * Check what paths the system is actually using for image storage
 */

const env = require('./server/env');
const path = require('path');
const fs = require('fs').promises;

console.log('🔍 DEBUGGING IMAGE PATH CONFIGURATION');
console.log('=====================================');

async function debugImagePaths() {
    try {
        console.log('\n📋 ENVIRONMENT VARIABLES:');
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('UPLOADS_DIR:', env.UPLOADS_DIR);
        console.log('STATIC_UPLOADS_DIR:', env.STATIC_UPLOADS_DIR);
        console.log('TEMP_UPLOADS_DIR:', env.TEMP_UPLOADS_DIR);
        console.log('CACHE_DIR:', env.CACHE_DIR);
        
        console.log('\n📁 RESOLVED PATHS:');
        console.log('UPLOADS_DIR (resolved):', path.resolve(env.UPLOADS_DIR));
        console.log('STATIC_UPLOADS_DIR (resolved):', path.resolve(env.STATIC_UPLOADS_DIR));
        
        console.log('\n🔍 CHECKING DIRECTORY EXISTENCE:');
        
        // Check if directories exist
        const pathsToCheck = [
            { name: 'UPLOADS_DIR', path: env.UPLOADS_DIR },
            { name: 'STATIC_UPLOADS_DIR', path: env.STATIC_UPLOADS_DIR },
            { name: 'Images Originals', path: path.join(env.STATIC_UPLOADS_DIR, 'images', 'originals') },
            { name: 'Images Variants', path: path.join(env.STATIC_UPLOADS_DIR, 'images', 'variants') },
            { name: 'OG Images', path: path.join(env.UPLOADS_DIR, 'og-images') }
        ];
        
        for (const pathInfo of pathsToCheck) {
            try {
                const stats = await fs.stat(pathInfo.path);
                console.log(`✅ ${pathInfo.name}: EXISTS (${pathInfo.path})`);
                
                if (stats.isDirectory()) {
                    // Count files in directory
                    try {
                        const files = await fs.readdir(pathInfo.path);
                        console.log(`   📊 Contains ${files.length} items`);
                    } catch (error) {
                        console.log(`   ⚠️ Cannot read directory: ${error.message}`);
                    }
                }
            } catch (error) {
                console.log(`❌ ${pathInfo.name}: NOT FOUND (${pathInfo.path})`);
                console.log(`   Error: ${error.message}`);
            }
        }
        
        console.log('\n🔍 CHECKING SPECIFIC IMAGE FILE:');
        
        // Check the specific file mentioned in the error
        const problemFile = '1757294693199-sr4az75e6vk_medium.webp';
        const possiblePaths = [
            path.join(env.STATIC_UPLOADS_DIR, 'images', 'variants', problemFile),
            path.join('static/uploads/images/variants', problemFile),
            path.join('/data/static/uploads/images/variants', problemFile),
            path.join(__dirname, 'static/uploads/images/variants', problemFile)
        ];
        
        console.log(`Looking for: ${problemFile}`);
        
        for (const filePath of possiblePaths) {
            try {
                const stats = await fs.stat(filePath);
                console.log(`✅ FOUND: ${filePath} (${stats.size} bytes)`);
            } catch (error) {
                console.log(`❌ NOT FOUND: ${filePath}`);
            }
        }
        
        console.log('\n🔍 CHECKING IMAGE PERSISTENCE SERVICE:');
        
        try {
            const ImagePersistenceService = require('./server/services/image-persistence.service');
            const imageService = new ImagePersistenceService();
            
            console.log('Image Service Persistent Paths:');
            console.log('- imageVariants:', imageService.persistentPaths.imageVariants);
            console.log('- imageOriginals:', imageService.persistentPaths.imageOriginals);
            console.log('- ogImages:', imageService.persistentPaths.ogImages);
            
            console.log('Image Service Serving Paths:');
            console.log('- apiImages:', imageService.servingPaths.apiImages);
            console.log('- staticUploads:', imageService.servingPaths.staticUploads);
            console.log('- ogImages:', imageService.servingPaths.ogImages);
            
        } catch (error) {
            console.log('❌ Error loading image persistence service:', error.message);
        }
        
        console.log('\n🎯 DIAGNOSIS:');
        console.log('=============');
        
        if (env.STATIC_UPLOADS_DIR.startsWith('/data/')) {
            console.log('⚠️ ISSUE: Using production paths in development environment');
            console.log('   Expected: static/uploads');
            console.log('   Actual:', env.STATIC_UPLOADS_DIR);
            console.log('   Solution: Check NODE_ENV and environment variable configuration');
        } else {
            console.log('✅ Using correct development paths');
        }
        
        console.log('\n📝 RECOMMENDATIONS:');
        console.log('1. Verify NODE_ENV is set to "development"');
        console.log('2. Check for environment variable conflicts');
        console.log('3. Restart the server to reload environment variables');
        console.log('4. Clear any orphaned database records if files are missing');
        
    } catch (error) {
        console.error('❌ Debug script error:', error);
    }
}

// Run the debug
debugImagePaths();
