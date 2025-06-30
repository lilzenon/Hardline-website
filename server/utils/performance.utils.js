/**
 * Performance Optimization Utilities for BOUNCE2BOUNCE
 * Implements Core Web Vitals improvements and mobile-first optimizations
 */

/**
 * Generate optimized image attributes for lazy loading and performance
 */
function generateOptimizedImageAttrs(src, alt, options = {}) {
    const {
        width,
        height,
        loading = 'lazy',
        decoding = 'async',
        fetchpriority,
        sizes,
        srcset
    } = options;

    const attrs = {
        src,
        alt,
        loading,
        decoding
    };

    if (width) attrs.width = width;
    if (height) attrs.height = height;
    if (fetchpriority) attrs.fetchpriority = fetchpriority;
    if (sizes) attrs.sizes = sizes;
    if (srcset) attrs.srcset = srcset;

    return attrs;
}

/**
 * Generate preload links for critical resources
 */
function generatePreloadLinks(resources = []) {
    return resources.map(resource => {
        const { href, as, type, crossorigin, media } = resource;
        
        let link = `<link rel="preload" href="${href}" as="${as}"`;
        
        if (type) link += ` type="${type}"`;
        if (crossorigin) link += ` crossorigin="${crossorigin}"`;
        if (media) link += ` media="${media}"`;
        
        link += '>';
        return link;
    }).join('\n    ');
}

/**
 * Generate critical CSS inline styles for above-the-fold content
 */
function generateCriticalCSS() {
    return `
    <style>
        /* Critical CSS for Core Web Vitals optimization */
        
        /* Prevent layout shift with font loading */
        @font-face {
            font-family: 'Clash Grotesk';
            font-display: swap;
            src: url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,300,500&display=swap');
        }
        
        /* Prevent CLS with image containers */
        .event-image-container {
            position: relative;
            overflow: hidden;
            background-color: #f0f0f0;
        }
        
        .event-image-container::before {
            content: '';
            display: block;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
        }
        
        .event-image-container img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        /* Optimize glassmorphism for performance */
        .glassmorphism {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            will-change: transform;
            transform: translateZ(0);
        }
        
        /* Prevent layout shift with skeleton loading */
        .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Optimize for mobile touch targets */
        .touch-target {
            min-height: 44px;
            min-width: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    </style>`;
}

/**
 * Generate resource hints for performance
 */
function generateResourceHints(domains = []) {
    const hints = [
        // DNS prefetch for external domains
        ...domains.map(domain => `<link rel="dns-prefetch" href="//${domain}">`),
        
        // Preconnect to critical external resources
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        '<link rel="preconnect" href="https://api.fontshare.com" crossorigin>',
        
        // Prefetch likely navigation targets
        '<link rel="prefetch" href="/events">',
        '<link rel="prefetch" href="/dashboard">'
    ];
    
    return hints.join('\n    ');
}

/**
 * Generate service worker registration for PWA capabilities
 */
function generateServiceWorkerScript() {
    return `
    <script>
        // Service Worker registration for PWA and caching
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
        
        // Performance monitoring
        if ('PerformanceObserver' in window) {
            // Monitor Core Web Vitals
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                    if (entry.entryType === 'layout-shift') {
                        if (!entry.hadRecentInput) {
                            console.log('CLS:', entry.value);
                        }
                    }
                }
            });
            
            observer.observe({entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift']});
        }
    </script>`;
}

/**
 * Generate lazy loading script for images
 */
function generateLazyLoadingScript() {
    return `
    <script>
        // Native lazy loading fallback for older browsers
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
        } else {
            // Fallback for browsers without native lazy loading
            const script = document.createElement('script');
            script.src = '/js/lazy-loading-polyfill.js';
            document.head.appendChild(script);
        }
        
        // Intersection Observer for advanced lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('skeleton');
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    </script>`;
}

/**
 * Generate Web Vitals optimization meta tags
 */
function generateWebVitalsOptimization() {
    return {
        // Optimize for mobile-first indexing
        viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
        
        // Prevent zoom on form inputs (iOS)
        formatDetection: 'telephone=no',
        
        // Optimize for PWA
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        appleMobileWebAppTitle: 'BOUNCE2BOUNCE',
        
        // Theme colors for browser UI
        themeColor: '#000000',
        msapplicationTileColor: '#000000',
        
        // Preload critical resources
        preloadCriticalCSS: true,
        preloadCriticalJS: true
    };
}

module.exports = {
    generateOptimizedImageAttrs,
    generatePreloadLinks,
    generateCriticalCSS,
    generateResourceHints,
    generateServiceWorkerScript,
    generateLazyLoadingScript,
    generateWebVitalsOptimization
};
