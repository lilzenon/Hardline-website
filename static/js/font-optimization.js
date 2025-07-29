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
     * Check if fonts are loaded via Google Fonts CSS
     */
    function checkGoogleFontsLoading() {
        // Let Google Fonts CSS handle the font loading
        // We just monitor if the fonts are available
        console.log('🔤 Monitoring Google Fonts loading...');

        FONT_CONFIG.weights.forEach(weight => {
            // Check if font is available
            if (isFontLoaded(FONT_CONFIG.family, weight)) {
                fontLoadingStates[weight] = true;
                console.log(`✅ Font Inter ${weight} detected as loaded`);
            } else {
                console.log(`⏳ Font Inter ${weight} still loading...`);
            }
        });

        updateFontLoadingState();
    }

    /**
     * Monitor font loading using Font Loading API
     */
    function monitorFontLoading() {
        if (!document.fonts || !document.fonts.ready) {
            console.warn('Font Loading API not supported, using fallback detection');
            // Fallback to periodic checking
            const fallbackInterval = setInterval(checkGoogleFontsLoading, 500);
            setTimeout(() => {
                clearInterval(fallbackInterval);
                console.log('⏰ Fallback font detection timeout');
            }, FONT_CONFIG.timeout);
            return;
        }

        // Use document.fonts.ready to detect when fonts are loaded
        document.fonts.ready.then(() => {
            console.log('📊 Document fonts ready event fired');
            checkGoogleFontsLoading();
        });

        // Also check periodically in case fonts load individually
        const fontCheckInterval = setInterval(() => {
            checkGoogleFontsLoading();

            // Stop checking if all fonts are loaded
            const allLoaded = FONT_CONFIG.weights.every(weight => fontLoadingStates[weight]);
            if (allLoaded) {
                clearInterval(fontCheckInterval);
                console.log('✅ All fonts loaded, stopping periodic checks');
            }
        }, 500);

        // Set timeout for font loading
        setTimeout(() => {
            clearInterval(fontCheckInterval);
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

        // Check if fonts are already loaded
        checkGoogleFontsLoading();

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