#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function testDeleteButtonFunctionality() {
    console.log('🧪 Testing Delete Button Functionality Across Breakpoints...');
    
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
        
        // Test different breakpoints
        const breakpoints = [
            { name: 'Mobile', width: 375, height: 667 },
            { name: 'Tablet', width: 768, height: 1024 },
            { name: 'Desktop', width: 1024, height: 768 }
        ];
        
        for (const breakpoint of breakpoints) {
            console.log(`\n🔍 Testing ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`);
            
            // Set viewport
            await page.setViewport({
                width: breakpoint.width,
                height: breakpoint.height,
                isMobile: breakpoint.width < 768
            });
            
            // Navigate to events page
            await page.goto('http://localhost:3000/events', { 
                waitUntil: 'networkidle0',
                timeout: 30000 
            });
            
            // Wait for page to load
            await page.waitForTimeout(2000);
            
            // Check for delete buttons
            console.log(`🔍 Checking for delete buttons on ${breakpoint.name}...`);
            const deleteButtons = await page.$$('.delete-event-btn, [data-action="delete-event"], .delete-btn');
            console.log(`✅ Found ${deleteButtons.length} delete buttons`);
            
            if (deleteButtons.length > 0) {
                // Test first delete button
                console.log(`🖱️ Testing delete button click on ${breakpoint.name}...`);
                
                // Get button properties
                const buttonInfo = await deleteButtons[0].evaluate(el => ({
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                    touchAction: getComputedStyle(el).touchAction,
                    minHeight: getComputedStyle(el).minHeight,
                    minWidth: getComputedStyle(el).minWidth
                }));
                
                console.log(`📏 Button dimensions: ${buttonInfo.width}x${buttonInfo.height}px`);
                console.log(`📱 Touch action: ${buttonInfo.touchAction}`);
                console.log(`📐 Min dimensions: ${buttonInfo.minWidth} x ${buttonInfo.minHeight}`);
                
                // Check if button meets mobile touch target requirements
                if (breakpoint.width < 768) {
                    const meetsRequirements = buttonInfo.width >= 44 && buttonInfo.height >= 44;
                    console.log(`✅ Mobile touch target requirements: ${meetsRequirements ? 'MET' : 'NOT MET'}`);
                }
                
                // Test button click
                try {
                    await deleteButtons[0].click();
                    await page.waitForTimeout(1000);
                    
                    // Check if modal opened
                    const modalVisible = await page.evaluate(() => {
                        const modal = document.querySelector('.delete-modal-overlay, #deleteModal');
                        return modal && (!modal.classList.contains('hidden') || modal.style.display !== 'none');
                    });
                    
                    console.log(`✅ Modal opened: ${modalVisible ? 'YES' : 'NO'}`);
                    
                    if (modalVisible) {
                        // Test modal buttons
                        const modalButtons = await page.$$('.modal-btn, .delete-modal button');
                        console.log(`✅ Modal buttons found: ${modalButtons.length}`);
                        
                        // Test cancel button
                        if (modalButtons.length > 0) {
                            console.log(`🖱️ Testing cancel button...`);
                            await modalButtons[0].click();
                            await page.waitForTimeout(500);
                            
                            const modalClosed = await page.evaluate(() => {
                                const modal = document.querySelector('.delete-modal-overlay, #deleteModal');
                                return !modal || modal.classList.contains('hidden') || modal.style.display === 'none';
                            });
                            
                            console.log(`✅ Modal closed: ${modalClosed ? 'YES' : 'NO'}`);
                        }
                    }
                } catch (error) {
                    console.log(`❌ Error testing delete button: ${error.message}`);
                }
            }
            
            console.log(`✅ ${breakpoint.name} testing completed\n`);
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
        const deleteButtonErrors = jsErrors.filter(error => 
            error.includes('delete') || error.includes('modal') || error.includes('undefined')
        );
        
        if (deleteButtonErrors.length === 0) {
            console.log('✅ No delete button related errors found!');
        } else {
            console.log(`❌ Found ${deleteButtonErrors.length} delete button errors`);
        }
        
        console.log('\n🎉 Delete button functionality test completed!');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Run the test
testDeleteButtonFunctionality().catch(console.error);
