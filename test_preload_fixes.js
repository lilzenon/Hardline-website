/**
 * Test suite for preload optimization fixes
 * Verifies that infinite loop warnings are eliminated and resources are properly optimized
 */

console.log('🧪 Testing Preload Optimization Fixes...');

// Test 1: Check for infinite loop prevention
function testInfiniteLoopPrevention() {
    console.log('\n🔄 Testing Infinite Loop Prevention...');
    
    let reactInitCount = 0;
    let preloadInitCount = 0;
    
    // Monitor console messages for repeated initialization
    const originalLog = console.log;
    console.log = function(...args) {
        const message = args.join(' ');
        
        if (message.includes('REACT APP MOUNTED SUCCESSFULLY')) {
            reactInitCount++;
        }
        
        if (message.includes('Initializing Preload Optimizer')) {
            preloadInitCount++;
        }
        
        originalLog.apply(console, args);
    };
    
    // Wait and check counts
    setTimeout(() => {
        console.log = originalLog;
        
        console.log(`📊 React initialization count: ${reactInitCount}`);
        console.log(`📊 Preload optimizer initialization count: ${preloadInitCount}`);
        
        if (reactInitCount <= 1 && preloadInitCount <= 1) {
            console.log('✅ PASS: No infinite loops detected');
        } else {
            console.log('❌ FAIL: Infinite loops still occurring');
        }
    }, 2000);
}

// Test 2: Check preload optimization
function testPreloadOptimization() {
    console.log('\n🎯 Testing Preload Optimization...');
    
    const preloadLinks = document.querySelectorAll('link[rel="preload"]');
    const prefetchLinks = document.querySelectorAll('link[rel="prefetch"]');
    
    console.log(`📊 Preload links found: ${preloadLinks.length}`);
    console.log(`📊 Prefetch links found: ${prefetchLinks.length}`);
    
    let optimizedPreloads = 0;
    let problematicPreloads = 0;
    
    preloadLinks.forEach((link, index) => {
        const href = link.href;
        const as = link.getAttribute('as');
        
        console.log(`   ${index + 1}. ${href} (as: ${as})`);
        
        // Check for problematic preloads
        if (href.includes('hero-left-image.png')) {
            problematicPreloads++;
            console.log(`   ⚠️ Found outdated PNG preload`);
        } else if (href.includes('hero-left-image') && href.includes('.webp')) {
            optimizedPreloads++;
            console.log(`   ✅ Found optimized WebP preload`);
        }
        
        // Check for proper as attributes
        if (!as) {
            problematicPreloads++;
            console.log(`   ⚠️ Missing 'as' attribute`);
        }
    });
    
    console.log(`📊 Optimized preloads: ${optimizedPreloads}`);
    console.log(`📊 Problematic preloads: ${problematicPreloads}`);
    
    if (optimizedPreloads > 0 && problematicPreloads === 0) {
        console.log('✅ PASS: Preloads are optimized');
    } else {
        console.log('❌ FAIL: Preload optimization needs attention');
    }
}

// Test 3: Check device-specific preloading
function testDeviceSpecificPreloading() {
    console.log('\n📱 Testing Device-Specific Preloading...');
    
    const isMobile = window.innerWidth <= 768 || /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log(`📊 Device type: ${isMobile ? 'Mobile' : 'Desktop'} (${window.innerWidth}px)`);
    
    const mobileLogoPreload = document.querySelector('link[href*="b2b-logo-mobile.svg"]');
    const desktopLogoPreload = document.querySelector('link[href*="b2b-logo-desktop.svg"]');
    
    let correctLogoPreload = false;
    
    if (isMobile && mobileLogoPreload && !desktopLogoPreload) {
        correctLogoPreload = true;
        console.log('✅ Mobile logo preloaded correctly');
    } else if (!isMobile && desktopLogoPreload && !mobileLogoPreload) {
        correctLogoPreload = true;
        console.log('✅ Desktop logo preloaded correctly');
    } else {
        console.log('⚠️ Logo preloading may not be device-specific');
    }
    
    // Check hero image preloading
    const mobileHeroPreload = document.querySelector('link[href*="hero-left-image-350w"]');
    const desktopHeroPreload = document.querySelector('link[href*="hero-left-image-299w"]');
    
    let correctHeroPreload = false;
    
    if (isMobile && mobileHeroPreload) {
        correctHeroPreload = true;
        console.log('✅ Mobile hero image preloaded correctly');
    } else if (!isMobile && desktopHeroPreload) {
        correctHeroPreload = true;
        console.log('✅ Desktop hero image preloaded correctly');
    } else {
        console.log('⚠️ Hero image preloading may not be device-specific');
    }
    
    if (correctLogoPreload && correctHeroPreload) {
        console.log('✅ PASS: Device-specific preloading working');
    } else {
        console.log('❌ FAIL: Device-specific preloading needs attention');
    }
}

// Test 4: Check resource usage tracking
function testResourceUsageTracking() {
    console.log('\n📈 Testing Resource Usage Tracking...');
    
    if (window.preloadOptimizer) {
        const preloadedResources = window.preloadOptimizer.getPreloadedResources();
        console.log(`📊 Tracked preloaded resources: ${preloadedResources.size}`);
        
        let usedResources = 0;
        let unusedResources = 0;
        
        preloadedResources.forEach((resource, href) => {
            if (resource.used) {
                usedResources++;
                console.log(`   ✅ Used: ${href}`);
            } else {
                unusedResources++;
                console.log(`   ⏳ Pending: ${href}`);
            }
        });
        
        console.log(`📊 Used resources: ${usedResources}`);
        console.log(`📊 Unused resources: ${unusedResources}`);
        
        if (preloadedResources.size > 0) {
            console.log('✅ PASS: Resource usage tracking active');
        } else {
            console.log('⚠️ No resources being tracked');
        }
    } else {
        console.log('❌ FAIL: Preload optimizer not available');
    }
}

// Test 5: Check for browser warnings
function testBrowserWarnings() {
    console.log('\n⚠️ Testing Browser Warning Elimination...');
    
    // Monitor console warnings
    let preloadWarnings = 0;
    const originalWarn = console.warn;
    
    console.warn = function(...args) {
        const message = args.join(' ');
        
        if (message.includes('preload') && message.includes('not used')) {
            preloadWarnings++;
            console.log(`🚨 Preload warning detected: ${message}`);
        }
        
        originalWarn.apply(console, args);
    };
    
    // Check after a delay
    setTimeout(() => {
        console.warn = originalWarn;
        
        console.log(`📊 Preload warnings detected: ${preloadWarnings}`);
        
        if (preloadWarnings === 0) {
            console.log('✅ PASS: No preload warnings detected');
        } else {
            console.log('❌ FAIL: Preload warnings still occurring');
        }
    }, 5000);
}

// Test 6: Performance impact assessment
function testPerformanceImpact() {
    console.log('\n⚡ Testing Performance Impact...');
    
    const performanceEntries = performance.getEntriesByType('resource');
    const imageEntries = performanceEntries.filter(entry => 
        entry.name.includes('hero-left-image') || 
        entry.name.includes('b2b-logo')
    );
    
    console.log(`📊 Critical image requests: ${imageEntries.length}`);
    
    let totalLoadTime = 0;
    imageEntries.forEach((entry, index) => {
        const loadTime = entry.responseEnd - entry.startTime;
        totalLoadTime += loadTime;
        console.log(`   ${index + 1}. ${entry.name.split('/').pop()}: ${loadTime.toFixed(1)}ms`);
    });
    
    const averageLoadTime = imageEntries.length > 0 ? totalLoadTime / imageEntries.length : 0;
    console.log(`📊 Average image load time: ${averageLoadTime.toFixed(1)}ms`);
    
    if (averageLoadTime < 200) {
        console.log('✅ PASS: Good image loading performance');
    } else if (averageLoadTime < 500) {
        console.log('⚠️ WARN: Moderate image loading performance');
    } else {
        console.log('❌ FAIL: Poor image loading performance');
    }
}

// Run all tests
function runAllPreloadTests() {
    console.log('🧪 Running Complete Preload Optimization Test Suite...');
    
    testInfiniteLoopPrevention();
    setTimeout(testPreloadOptimization, 1000);
    setTimeout(testDeviceSpecificPreloading, 2000);
    setTimeout(testResourceUsageTracking, 3000);
    setTimeout(testBrowserWarnings, 4000);
    setTimeout(testPerformanceImpact, 6000);
    
    setTimeout(() => {
        console.log('\n🎉 All preload optimization tests completed!');
        console.log('Check the results above to verify fixes are working correctly.');
    }, 10000);
}

// Auto-run tests if script is executed directly
if (typeof window !== 'undefined') {
    // Wait for page to load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runAllPreloadTests);
    } else {
        setTimeout(runAllPreloadTests, 1000);
    }
}

// Export for manual testing
if (typeof window !== 'undefined') {
    window.preloadTests = {
        runAllPreloadTests,
        testInfiniteLoopPrevention,
        testPreloadOptimization,
        testDeviceSpecificPreloading,
        testResourceUsageTracking,
        testBrowserWarnings,
        testPerformanceImpact
    };
}
