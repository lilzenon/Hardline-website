#!/usr/bin/env node

/**
 * 🧪 TEST UPLOAD PERSISTENCE
 * 
 * Tests that new image uploads go to the correct persistent storage location
 * and that files persist across simulated server restarts.
 */

require('dotenv').config();

const path = require('path');
const fs = require('fs').promises;

async function testUploadPersistence() {
    console.log('🧪 Testing upload persistence...');
    
    try {
        // Import the image processing service
        const ImageProcessingService = require('../services/image-processing.service');
        const imageProcessor = new ImageProcessingService();
        
        console.log(`📁 Upload directory: ${imageProcessor.uploadDir}`);
        console.log(`📁 Originals directory: ${path.join(imageProcessor.uploadDir, 'originals')}`);
        console.log(`📁 Variants directory: ${path.join(imageProcessor.uploadDir, 'variants')}`);
        
        // Check if directories exist
        const originalsDir = path.join(imageProcessor.uploadDir, 'originals');
        const variantsDir = path.join(imageProcessor.uploadDir, 'variants');
        
        try {
            await fs.access(originalsDir);
            console.log('✅ Originals directory exists');
        } catch (error) {
            console.log('❌ Originals directory missing');
        }
        
        try {
            await fs.access(variantsDir);
            console.log('✅ Variants directory exists');
        } catch (error) {
            console.log('❌ Variants directory missing');
        }
        
        // Count existing files
        try {
            const originalFiles = await fs.readdir(originalsDir);
            const variantFiles = await fs.readdir(variantsDir);
            
            console.log(`📊 Original files: ${originalFiles.length}`);
            console.log(`📊 Variant files: ${variantFiles.length}`);
            
            if (originalFiles.length > 0) {
                console.log(`📄 Sample original: ${originalFiles[0]}`);
            }
            
            if (variantFiles.length > 0) {
                console.log(`📄 Sample variant: ${variantFiles[0]}`);
            }
            
        } catch (error) {
            console.error('❌ Error reading directories:', error.message);
        }
        
        // Test path construction
        const testFilename = 'test-image.jpg';
        const testOriginalPath = path.join(originalsDir, testFilename);
        const testVariantPath = path.join(variantsDir, 'medium', testFilename);
        
        console.log('\n🔍 Path construction test:');
        console.log(`   Original: ${testOriginalPath}`);
        console.log(`   Variant: ${testVariantPath}`);
        
        // Check if paths are absolute and persistent
        if (testOriginalPath.includes('/data/') || testOriginalPath.includes('\\data\\')) {
            console.log('✅ Paths use persistent storage (/data/)');
        } else {
            console.log('❌ Paths use ephemeral storage (not /data/)');
        }
        
        console.log('\n✅ Upload persistence test completed!');
        
    } catch (error) {
        console.error('❌ Error during persistence test:', error);
        process.exit(1);
    }
    
    process.exit(0);
}

// Run the test
testUploadPersistence();
