#!/usr/bin/env node

/**
 * COMPREHENSIVE IMAGE PIPELINE DIAGNOSTIC
 * 
 * Tests the entire image upload and serving pipeline to identify
 * where the system is failing when users upload images.
 */

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const knex = require('./server/knex');

const BASE_URL = 'http://localhost:3002';

console.log('🔍 COMPREHENSIVE IMAGE PIPELINE DIAGNOSTIC');
console.log('==========================================');

async function createTestImage() {
    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
        0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
        0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
        0x01, 0x00, 0x01, 0x5C, 0xC2, 0x8A, 0xDB, 0x00, 0x00, 0x00, 0x00, 0x49,
        0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);
    
    const testImagePath = path.join(__dirname, 'test-image.png');
    fs.writeFileSync(testImagePath, testImageBuffer);
    return testImagePath;
}

async function testImageUploadEndpoint() {
    console.log('\n🔍 STEP 1: Testing Image Upload Endpoint');
    console.log('=========================================');
    
    try {
        // First, check if we have any events to upload to
        const events = await knex('events').select('id', 'title').limit(1);
        
        if (events.length === 0) {
            console.log('❌ No events found in database - cannot test event cover upload');
            return { success: false, error: 'No events available' };
        }
        
        const testEvent = events[0];
        console.log(`📋 Using test event: "${testEvent.title}" (ID: ${testEvent.id})`);
        
        // Create test image
        const testImagePath = await createTestImage();
        console.log(`📁 Created test image: ${testImagePath}`);
        
        // Test the upload endpoint
        const formData = new FormData();
        formData.append('image', fs.createReadStream(testImagePath), {
            filename: 'test-image.png',
            contentType: 'image/png'
        });
        
        console.log(`🚀 Testing upload to: ${BASE_URL}/api/events/${testEvent.id}/cover-image/upload`);
        
        const uploadResponse = await axios.post(
            `${BASE_URL}/api/events/${testEvent.id}/cover-image/upload`,
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'User-Agent': 'Image-Pipeline-Test/1.0'
                },
                timeout: 30000
            }
        );
        
        console.log(`✅ Upload response status: ${uploadResponse.status}`);
        console.log(`📊 Upload response:`, uploadResponse.data);
        
        // Clean up test image
        fs.unlinkSync(testImagePath);
        
        return {
            success: true,
            response: uploadResponse.data,
            eventId: testEvent.id
        };
        
    } catch (error) {
        console.log(`❌ Upload endpoint failed: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Response:`, error.response.data);
        }
        
        // Clean up test image if it exists
        try {
            const testImagePath = path.join(__dirname, 'test-image.png');
            if (fs.existsSync(testImagePath)) {
                fs.unlinkSync(testImagePath);
            }
        } catch (cleanupError) {
            // Ignore cleanup errors
        }
        
        return { success: false, error: error.message };
    }
}

async function testImageServing(imageUrl) {
    console.log('\n🔍 STEP 2: Testing Image Serving');
    console.log('=================================');
    
    if (!imageUrl) {
        console.log('❌ No image URL provided - skipping serving test');
        return { success: false, error: 'No image URL' };
    }
    
    try {
        console.log(`🚀 Testing image serving: ${BASE_URL}${imageUrl}`);
        
        const servingResponse = await axios.get(`${BASE_URL}${imageUrl}`, {
            timeout: 10000,
            responseType: 'arraybuffer'
        });
        
        console.log(`✅ Image serving status: ${servingResponse.status}`);
        console.log(`📊 Content-Type: ${servingResponse.headers['content-type']}`);
        console.log(`📊 Content-Length: ${servingResponse.headers['content-length']} bytes`);
        
        return { success: true, size: servingResponse.data.length };
        
    } catch (error) {
        console.log(`❌ Image serving failed: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
            console.log(`   Response:`, error.response.data);
        }
        
        return { success: false, error: error.message };
    }
}

async function testDatabaseIntegration(eventId) {
    console.log('\n🔍 STEP 3: Testing Database Integration');
    console.log('======================================');
    
    try {
        // Check if event was updated with image URL
        const updatedEvent = await knex('events')
            .where('id', eventId)
            .select('id', 'title', 'cover_image', 'updated_at')
            .first();
        
        console.log(`📋 Event after upload:`);
        console.log(`   ID: ${updatedEvent.id}`);
        console.log(`   Title: ${updatedEvent.title}`);
        console.log(`   Cover Image: ${updatedEvent.cover_image}`);
        console.log(`   Updated: ${updatedEvent.updated_at}`);
        
        if (updatedEvent.cover_image) {
            // Check if it's a UUID-based URL
            const uuidMatch = updatedEvent.cover_image.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
            if (uuidMatch) {
                const uuid = uuidMatch[1];
                console.log(`🔍 Extracted UUID: ${uuid}`);
                
                // Check if image record exists in database
                const imageRecord = await knex('images')
                    .where('uuid', uuid)
                    .first();
                
                if (imageRecord) {
                    console.log(`✅ Image record found in database:`);
                    console.log(`   UUID: ${imageRecord.uuid}`);
                    console.log(`   Filename: ${imageRecord.filename}`);
                    console.log(`   Status: ${imageRecord.processing_status}`);
                    console.log(`   Created: ${imageRecord.created_at}`);
                    
                    return { success: true, imageRecord, eventRecord: updatedEvent };
                } else {
                    console.log(`❌ Image record NOT found in database for UUID: ${uuid}`);
                    return { success: false, error: 'Image record missing from database' };
                }
            } else {
                console.log(`⚠️ Cover image URL is not UUID-based: ${updatedEvent.cover_image}`);
                return { success: true, eventRecord: updatedEvent, legacy: true };
            }
        } else {
            console.log(`❌ Event cover_image is empty after upload`);
            return { success: false, error: 'Event cover_image not updated' };
        }
        
    } catch (error) {
        console.log(`❌ Database integration test failed: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function testImageProcessingService() {
    console.log('\n🔍 STEP 4: Testing Image Processing Service');
    console.log('===========================================');
    
    try {
        const ImageProcessingService = require('./server/services/image-processing.service');
        const imageService = new ImageProcessingService();
        
        console.log(`✅ Image Processing Service loaded successfully`);
        console.log(`📁 Upload directory: ${imageService.uploadDir}`);
        console.log(`📁 Variants directory: ${imageService.variantsDir}`);
        
        // Check if directories exist
        const fs = require('fs').promises;
        
        try {
            await fs.access(imageService.uploadDir);
            console.log(`✅ Upload directory exists: ${imageService.uploadDir}`);
        } catch (error) {
            console.log(`❌ Upload directory missing: ${imageService.uploadDir}`);
        }
        
        try {
            await fs.access(imageService.variantsDir);
            console.log(`✅ Variants directory exists: ${imageService.variantsDir}`);
        } catch (error) {
            console.log(`❌ Variants directory missing: ${imageService.variantsDir}`);
        }
        
        return { success: true };
        
    } catch (error) {
        console.log(`❌ Image Processing Service failed to load: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function runCompleteDiagnostic() {
    try {
        console.log(`🔗 Testing against: ${BASE_URL}`);
        
        // Step 1: Test Image Processing Service
        const serviceTest = await testImageProcessingService();
        
        // Step 2: Test Image Upload
        const uploadTest = await testImageUploadEndpoint();
        
        // Step 3: Test Database Integration
        let dbTest = { success: false, error: 'Upload failed' };
        if (uploadTest.success && uploadTest.response && uploadTest.response.imageUrl) {
            dbTest = await testDatabaseIntegration(uploadTest.eventId);
        }
        
        // Step 4: Test Image Serving
        let servingTest = { success: false, error: 'No image URL' };
        if (uploadTest.success && uploadTest.response && uploadTest.response.imageUrl) {
            servingTest = await testImageServing(uploadTest.response.imageUrl);
        }
        
        console.log('\n📋 DIAGNOSTIC SUMMARY');
        console.log('=====================');
        console.log(`Image Processing Service: ${serviceTest.success ? '✅ WORKING' : '❌ FAILED'}`);
        console.log(`Image Upload Endpoint: ${uploadTest.success ? '✅ WORKING' : '❌ FAILED'}`);
        console.log(`Database Integration: ${dbTest.success ? '✅ WORKING' : '❌ FAILED'}`);
        console.log(`Image Serving: ${servingTest.success ? '✅ WORKING' : '❌ FAILED'}`);
        
        console.log('\n🎯 DIAGNOSIS');
        console.log('=============');
        
        if (!serviceTest.success) {
            console.log('🚨 CRITICAL: Image Processing Service is not working');
            console.log('   This is likely the root cause of the upload failures');
        } else if (!uploadTest.success) {
            console.log('🚨 CRITICAL: Image Upload Endpoint is not working');
            console.log('   Users cannot upload images at all');
        } else if (!dbTest.success) {
            console.log('🚨 CRITICAL: Database Integration is broken');
            console.log('   Images upload but database is not updated correctly');
        } else if (!servingTest.success) {
            console.log('🚨 CRITICAL: Image Serving is broken');
            console.log('   Images upload and database updates, but cannot be displayed');
        } else {
            console.log('🎉 ALL SYSTEMS WORKING: Image pipeline is functional');
        }
        
    } catch (error) {
        console.error('💥 DIAGNOSTIC ERROR:', error);
    } finally {
        await knex.destroy();
    }
}

// Run the complete diagnostic
runCompleteDiagnostic();
