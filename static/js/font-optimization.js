/**
 * Font Loading Optimization Script
 * Improves FCP by managing font loading states and preventing layout shifts
 */

(function() {
    'use strict';
    
    // Prevent multiple executions
    if (window.fontOptimizationInitialized) {
        return;
    }
    window.fontOptimizationInitialized = true;
    
    console.log('🔤 Initializing Font Optimization...');
    
    // Font loading configuration
    const FONT_CONFIG = {
        family: 'Inter',
        weights: [400, 700, 800],
        display: 'optional',
        timeout: 3000, // 3 seconds timeout for font loading
        fallbackFamily: 'Inter-fallback'
    };
    
    // Track font loading states
    const fontLoadingStates = {
        400: false,
        700: false,
        800: false
    };
    
    /**
     * Check if a font is loaded
     */
    function isFontLoaded(family, weight = 400) {
        if (!document.fonts || !document.fonts.check) {
            return false;
        }
        
        try {
            return document.fonts.check(`${weight} 16px ${family}`);
        } catch (e) {
            console.warn('Font check failed:', e);
            return false;
        }
    }
    
    /**
     * Apply font loading class to body
     */
    function updateFontLoadingState() {
        const body = document.body;
        
        // Check if all critical fonts are loaded
        const allCriticalFontsLoaded = FONT_CONFIG.weights.every(weight => 
            fontLoadingStates[weight] || isFontLoaded(FONT_CONFIG.family, weight)
        );
        
        if (allCriticalFontsLoaded) {
            body.classList.remove('font-loading');
            body.classList.add('font-loaded');
            console.log('✅ All critical fonts loaded');
        } else {
            body.classList.add('font-loading');
            body.classList.remove('font-loaded');
        }
    }
    
    /**
     * Preload critical font weights
     */
    function preloadCriticalFonts() {
        // Font URLs for Inter (latest version)
        const fontUrls = {
            400: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
            700: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
            800: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2'
        };
        
        FONT_CONFIG.weights.forEach(weight => {
            // Check if already preloaded
            const existingPreload = document.querySelector(`link[href="${fontUrls[weight]}"]`);
            if (existingPreload) {
                console.log(`✅ Font ${weight} already preloaded`);
                return;
            }
            
            // Create preload link
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.type = 'font/woff2';
            link.href = fontUrls[weight];
            link.crossOrigin = 'anonymous';
            
            // Add to head
            document.head.appendChild(link);
            console.log(`🔤 Preloading font weight ${weight}`);
        });
    }
    
    /**
     * Monitor font loading using Font Loading API
     */
    function monitorFontLoading() {
        if (!document.fonts || !document.fonts.ready) {
            console.warn('Font Loading API not supported');
            return;
        }
        
        // Monitor each font weight
        FONT_CONFIG.weights.forEach(weight => {
            const fontFace = new FontFace(
                FONT_CONFIG.family,
                `url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)`,
                { weight: weight.toString(), display: FONT_CONFIG.display }
            );
            
            fontFace.load().then(() => {
                fontLoadingStates[weight] = true;
                console.log(`✅ Font Inter ${weight} loaded`);
                updateFontLoadingState();
            }).catch(error => {
                console.warn(`❌ Font Inter ${weight} failed to load:`, error);
                fontLoadingStates[weight] = false;
            });
        });
        
        // Set timeout for font loading
        setTimeout(() => {
            const unloadedFonts = FONT_CONFIG.weights.filter(weight => !fontLoadingStates[weight]);
            if (unloadedFonts.length > 0) {
                console.warn(`⏰ Font loading timeout. Unloaded weights: ${unloadedFonts.join(', ')}`);
                // Force fallback fonts
                document.body.classList.add('font-timeout');
            }
        }, FONT_CONFIG.timeout);
    }
    
    /**
     * Apply font optimization classes to critical elements
     */
    function optimizeCriticalElements() {
        // Hero text elements
        const heroElements = document.querySelectorAll('h1, .hero-text, .hero-title');
        heroElements.forEach(el => {
            el.classList.add('hero-font', 'critical-text-extra-bold');
        });
        
        // Navigation elements
        const navElements = document.querySelectorAll('nav, .nav-text, .navigation');
        navElements.forEach(el => {
            el.classList.add('nav-font', 'critical-text');
        });
        
        // Button elements
        const buttonElements = document.querySelectorAll('button, .btn, .button');
        buttonElements.forEach(el => {
            el.classList.add('button-font', 'critical-text-bold');
        });
        
        // Body text elements
        const bodyElements = document.querySelectorAll('p, .body-text, .content');
        bodyElements.forEach(el => {
            el.classList.add('body-font', 'critical-text');
        });
        
        console.log('🎨 Applied font optimization classes to critical elements');
    }
    
    /**
     * Measure font loading performance
     */
    function measureFontPerformance() {
        if (!window.performance || !window.performance.getEntriesByType) {
            return;
        }
        
        // Measure font loading timing
        const fontEntries = performance.getEntriesByType('resource').filter(entry => 
            entry.name.includes('fonts.gstatic.com') || entry.name.includes('Inter')
        );
        
        if (fontEntries.length > 0) {
            const totalFontLoadTime = fontEntries.reduce((total, entry) => 
                total + (entry.responseEnd - entry.startTime), 0
            );
            
            const averageFontLoadTime = totalFontLoadTime / fontEntries.length;
            
            console.log(`📊 Font Performance:`);
            console.log(`   - Font requests: ${fontEntries.length}`);
            console.log(`   - Average load time: ${averageFontLoadTime.toFixed(1)}ms`);
            console.log(`   - Total font load time: ${totalFontLoadTime.toFixed(1)}ms`);
            
            // Report to analytics if available
            if (window.gtag) {
                gtag('event', 'font_performance', {
                    'font_load_time': Math.round(averageFontLoadTime),
                    'font_requests': fontEntries.length
                });
            }
        }
    }
    
    /**
     * Initialize font optimization
     */
    function initializeFontOptimization() {
        console.log('🚀 Starting font optimization...');
        
        // Set initial loading state
        document.body.classList.add('font-loading');
        
        // Preload critical fonts
        preloadCriticalFonts();
        
        // Monitor font loading
        monitorFontLoading();
        
        // Optimize critical elements
        optimizeCriticalElements();
        
        // Initial font state check
        updateFontLoadingState();
        
        // Measure performance after fonts load
        document.fonts.ready.then(() => {
            setTimeout(measureFontPerformance, 1000);
        });
        
        console.log('✅ Font optimization initialized');
    }
    
    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFontOptimization);
    } else {
        initializeFontOptimization();
    }
    
    // Expose utilities for debugging
    window.fontOptimization = {
        checkFont: isFontLoaded,
        updateState: updateFontLoadingState,
        measurePerformance: measureFontPerformance,
        config: FONT_CONFIG,
        states: fontLoadingStates
    };
    
})();
