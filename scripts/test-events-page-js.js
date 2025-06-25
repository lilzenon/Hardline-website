#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function testEventsPageJavaScript() {
    console.log('🧪 Testing Events Page JavaScript Functionality...');
    
    let browser;
    try {
        browser = await puppeteer.launch({ 
            headless: false,
            devtools: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Listen for console messages and errors
        const consoleMessages = [];
        const jsErrors = [];
        
        page.on('console', msg => {
            consoleMessages.push({
                type: msg.type(),
                text: msg.text()
            });
            console.log(`📝 Console ${msg.type()}: ${msg.text()}`);
        });
        
        page.on('pageerror', error => {
            jsErrors.push(error.message);
            console.log(`❌ JavaScript Error: ${error.message}`);
        });
        
        // Navigate to events page
        console.log('🌐 Navigating to events page...');
        await page.goto('http://localhost:3000/events', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        // Wait for page to load
        await page.waitForTimeout(2000);
        
        // Check for Create Event buttons
        console.log('🔍 Checking for Create Event buttons...');
        const createButtons = await page.$$('[data-action="create-event"], .create-event-btn');
        console.log(`✅ Found ${createButtons.length} Create Event buttons`);
        
        // Check for modal dialog
        console.log('🔍 Checking for Create Event modal...');
        const modal = await page.$('#create-event-dialog');
        console.log(`✅ Create Event modal ${modal ? 'found' : 'NOT FOUND'}`);
        
        // Test clicking Create Event button
        if (createButtons.length > 0) {
            console.log('🖱️ Testing Create Event button click...');
            await createButtons[0].click();
            await page.waitForTimeout(1000);
            
            // Check if modal opened
            const modalVisible = await page.evaluate(() => {
                const modal = document.getElementById('create-event-dialog');
                return modal && !modal.classList.contains('hidden');
            });
            
            console.log(`✅ Modal ${modalVisible ? 'opened successfully' : 'failed to open'}`);
            
            if (modalVisible) {
                // Test form elements
                console.log('🔍 Testing form elements...');
                
                const titleInput = await page.$('#event-title');
                const slugInput = await page.$('#event-slug');
                const descInput = await page.$('#event-description');
                const toggleInput = await page.$('#event-active-toggle');
                
                console.log(`✅ Title input: ${titleInput ? 'found' : 'NOT FOUND'}`);
                console.log(`✅ Slug input: ${slugInput ? 'found' : 'NOT FOUND'}`);
                console.log(`✅ Description input: ${descInput ? 'found' : 'NOT FOUND'}`);
                console.log(`✅ Toggle input: ${toggleInput ? 'found' : 'NOT FOUND'}`);
                
                // Test auto-slug generation
                if (titleInput && slugInput) {
                    console.log('🧪 Testing auto-slug generation...');
                    await titleInput.type('Test Event Title');
                    await page.waitForTimeout(500);
                    
                    const slugValue = await slugInput.evaluate(el => el.value);
                    console.log(`✅ Auto-generated slug: "${slugValue}"`);
                    
                    if (slugValue === 'test-event-title') {
                        console.log('✅ Auto-slug generation working correctly');
                    } else {
                        console.log('❌ Auto-slug generation not working as expected');
                    }
                }
                
                // Close modal
                console.log('🔒 Closing modal...');
                const closeButton = await page.$('button[onclick="closeCreateEventDialog()"]');
                if (closeButton) {
                    await closeButton.click();
                    await page.waitForTimeout(500);
                }
            }
        }
        
        // Summary
        console.log('\n📊 TEST SUMMARY:');
        console.log(`✅ JavaScript Errors: ${jsErrors.length}`);
        console.log(`✅ Console Messages: ${consoleMessages.length}`);
        
        if (jsErrors.length > 0) {
            console.log('\n❌ JavaScript Errors Found:');
            jsErrors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            });
        } else {
            console.log('✅ No JavaScript errors detected!');
        }
        
        // Check for specific error patterns
        const addEventListenerErrors = jsErrors.filter(error => 
            error.includes('addEventListener') || error.includes('Cannot read properties of null')
        );
        
        if (addEventListenerErrors.length === 0) {
            console.log('✅ No addEventListener null reference errors found!');
        } else {
            console.log(`❌ Found ${addEventListenerErrors.length} addEventListener errors`);
        }
        
        console.log('\n🎉 Events page JavaScript test completed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Run the test
testEventsPageJavaScript().catch(console.error);
