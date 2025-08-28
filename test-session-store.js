#!/usr/bin/env node

/**
 * Test script to verify session store configuration works correctly
 * This will test the session store initialization without starting the full server
 */

const path = require('path');
const fs = require('fs');

// Set test environment
process.env.NODE_ENV = 'production';

console.log('🧪 Testing session store configuration...\n');

try {
    // Import the session store service
    const SessionStoreService = require('./server/services/session/session-store.service');
    
    console.log('✅ Session store service imported successfully');
    
    // Create a new instance (this will trigger initialization)
    const sessionStore = new SessionStoreService();
    
    console.log(`✅ Session store initialized successfully`);
    console.log(`📊 Store type: ${sessionStore.storeType}`);
    
    if (sessionStore.storeType === 'file') {
        console.log(`📁 Sessions directory: ${sessionStore.store.options.path}`);
        
        // Test if directory exists and is writable
        const sessionsPath = sessionStore.store.options.path;
        if (fs.existsSync(sessionsPath)) {
            console.log(`✅ Sessions directory exists and is accessible`);
            
            // Test write permissions
            const testFile = path.join(sessionsPath, 'test-write.tmp');
            try {
                fs.writeFileSync(testFile, 'test');
                fs.unlinkSync(testFile);
                console.log(`✅ Sessions directory is writable`);
            } catch (error) {
                console.log(`❌ Sessions directory is not writable: ${error.message}`);
            }
        } else {
            console.log(`❌ Sessions directory does not exist: ${sessionsPath}`);
        }
    } else if (sessionStore.storeType === 'memory') {
        console.log(`⚠️ Using memory store (not persistent across restarts)`);
    } else if (sessionStore.storeType === 'redis') {
        console.log(`✅ Using Redis store (optimal for production)`);
    }
    
    // Test session configuration
    const sessionConfig = sessionStore.getSessionConfig();
    console.log(`\n📋 Session Configuration:`);
    console.log(`   Cookie name: ${sessionConfig.name}`);
    console.log(`   Secure: ${sessionConfig.cookie.secure}`);
    console.log(`   HttpOnly: ${sessionConfig.cookie.httpOnly}`);
    console.log(`   Max Age: ${sessionConfig.cookie.maxAge / 1000}s`);
    console.log(`   SameSite: ${sessionConfig.cookie.sameSite}`);
    
    console.log('\n🎉 Session store test completed successfully!');
    
} catch (error) {
    console.error('❌ Session store test failed:', error.message);
    console.error('\n🔍 Error details:', error);
    process.exit(1);
}
