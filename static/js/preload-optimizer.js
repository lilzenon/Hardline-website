/**
 * Preload Optimizer - Fixes infinite loop warnings and optimizes resource loading
 * Prevents browser preload warnings by ensuring proper resource usage timing
 */

(function() {
    'use strict';
    
    // Prevent multiple executions
    if (window.preloadOptimizerInitialized) {
        return;
    }
    window.preloadOptimizerInitialized = true;
    
    console.log('🔧 Initializing Preload Optimizer...');
    
    // Track preloaded resources to ensure they're used
    const preloadedResources = new Map();
    const resourceUsageTimeout = 3000; // 3 seconds as per browser standards
    
    /**
     * Device detection for conditional preloading
     */
    function detectDevice() {
        const width = window.innerWidth;
        const userAgent = navigator.userAgent;
        const isMobile = width <= 768 || /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        
        return {
            isMobile,
            isTablet: width > 768 && width <= 1024,
            isDesktop: width > 1024,
            width
        };
    }
    
    /**
     * Create optimized preload link
     */
    function createPreloadLink(href, as, type = null, fetchpriority = null, media = null) {
        // Check if already preloaded
        if (document.querySelector(`link[rel="preload"][href="${href}"]`)) {
            return null;
        }
        
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        
        if (type) link.type = type;
        if (fetchpriority) link.fetchpriority = fetchpriority;
        if (media) link.media = media;
        
        // Track the preload
        preloadedResources.set(href, {
            element: link,
            timestamp: Date.now(),
            used: false,
            as: as
        });
        
        return link;
    }
    
    /**
     * Mark resource as used to prevent warnings
     */
    function markResourceAsUsed(href) {
        if (preloadedResources.has(href)) {
            preloadedResources.get(href).used = true;
            console.log(`✅ Resource used: ${href}`);
        }
    }
    
    /**
     * Monitor resource usage to prevent warnings
     */
    function monitorResourceUsage() {
        // Monitor image loading
        const imageObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check for images
                        const images = node.tagName === 'IMG' ? [node] : node.querySelectorAll?.('img') || [];
                        images.forEach((img) => {
                            if (img.src) {
                                markResourceAsUsed(img.src);
                            }
                        });
                        
                        // Check for stylesheets
                        const links = node.tagName === 'LINK' ? [node] : node.querySelectorAll?.('link[rel="stylesheet"]') || [];
                        links.forEach((link) => {
                            if (link.href) {
                                markResourceAsUsed(link.href);
                            }
                        });
                    }
                });
            });
        });
        
        imageObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        // Monitor existing images
        document.querySelectorAll('img').forEach((img) => {
            if (img.src) {
                markResourceAsUsed(img.src);
            }
        });
    }
    
    /**
     * Clean up unused preloads to prevent warnings
     */
    function cleanupUnusedPreloads() {
        preloadedResources.forEach((resource, href) => {
            const timeSincePreload = Date.now() - resource.timestamp;
            
            if (!resource.used && timeSincePreload > resourceUsageTimeout) {
                console.warn(`⚠️ Removing unused preload: ${href}`);
                if (resource.element.parentNode) {
                    resource.element.parentNode.removeChild(resource.element);
                }
                preloadedResources.delete(href);
            }
        });
    }
    
    /**
     * Initialize device-specific preloading
     */
    function initializeOptimizedPreloading() {
        const device = detectDevice();
        console.log(`📱 Device detected: ${device.isMobile ? 'Mobile' : device.isTablet ? 'Tablet' : 'Desktop'} (${device.width}px)`);
        
        // Remove any existing problematic preloads
        const existingPreloads = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
        existingPreloads.forEach((link) => {
            const href = link.href;
            
            // Remove unused PNG hero image preloads
            if (href.includes('hero-left-image.png')) {
                console.log(`🗑️ Removing outdated PNG preload: ${href}`);
                link.remove();
            }
            
            // Remove unused logo preloads for wrong device type
            if (href.includes('b2b-logo-mobile.svg') && !device.isMobile) {
                console.log(`🗑️ Removing mobile logo preload on desktop: ${href}`);
                link.remove();
            }
            
            if (href.includes('b2b-logo-desktop.svg') && device.isMobile) {
                console.log(`🗑️ Removing desktop logo preload on mobile: ${href}`);
                link.remove();
            }
        });
        
        // Add optimized preloads
        const preloadsToAdd = [];
        
        // Logo preload (device-specific)
        const logoPath = device.isMobile ? '/images/mobile-figma/b2b-logo-mobile.svg' : '/images/desktop-figma/b2b-logo-desktop.svg';
        preloadsToAdd.push(createPreloadLink(logoPath, 'image', 'image/svg+xml', 'high'));
        
        // Hero image preload (device-specific, optimized variants)
        const heroPath = device.isMobile ? '/images/optimized/hero-left-image-350w.webp' : '/images/optimized/hero-left-image-299w.webp';
        preloadsToAdd.push(createPreloadLink(heroPath, 'image', 'image/webp', 'high'));
        
        // Add preloads to document
        preloadsToAdd.forEach((link) => {
            if (link) {
                document.head.appendChild(link);
                console.log(`✅ Added optimized preload: ${link.href}`);
            }
        });
    }
    
    /**
     * Initialize on DOM ready
     */
    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initialize);
            return;
        }
        
        console.log('🚀 Starting preload optimization...');
        
        // Initialize optimized preloading
        initializeOptimizedPreloading();
        
        // Start monitoring resource usage
        monitorResourceUsage();
        
        // Set up cleanup interval
        setInterval(cleanupUnusedPreloads, 5000); // Check every 5 seconds
        
        // Mark critical resources as used immediately if they exist
        setTimeout(() => {
            document.querySelectorAll('img, link[rel="stylesheet"]').forEach((element) => {
                const src = element.src || element.href;
                if (src) {
                    markResourceAsUsed(src);
                }
            });
        }, 100);
        
        console.log('✅ Preload optimizer initialized successfully');
    }
    
    // Handle resize events for responsive preloading
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newDevice = detectDevice();
            console.log(`📱 Device changed: ${newDevice.width}px`);
            // Re-initialize if device type changed
            initializeOptimizedPreloading();
        }, 250);
    }, { passive: true });
    
    // Initialize immediately
    initialize();
    
    // Expose utility functions for debugging
    window.preloadOptimizer = {
        getPreloadedResources: () => preloadedResources,
        markResourceAsUsed,
        cleanupUnusedPreloads,
        detectDevice
    };
    
})();
