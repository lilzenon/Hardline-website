/**
 * Image Optimization Middleware
 * Automatically serves optimized images based on browser support and device capabilities
 */

const imageOptimization = require('../services/image-optimization.service');
const path = require('path');
const fs = require('fs').promises;

/**
 * Image optimization middleware for static images
 */
function optimizedImageMiddleware() {
    return async (req, res, next) => {
        // Only handle image requests
        const isImageRequest = /\.(png|jpg|jpeg|webp|avif)$/i.test(req.path);
        if (!isImageRequest) {
            return next();
        }

        // Skip if already optimized or if it's an SVG
        if (req.path.includes('/optimized/') || req.path.endsWith('.svg')) {
            return next();
        }

        try {
            // Construct full image path
            const imagePath = path.join(__dirname, '../../static', req.path);
            
            // Check if original image exists
            try {
                await fs.access(imagePath);
            } catch {
                return next(); // Image doesn't exist, let normal 404 handling take over
            }

            // Serve optimized image
            return await imageOptimization.serveOptimizedImage(req, res, imagePath);
        } catch (error) {
            console.error('❌ Image optimization middleware error:', error);
            return next(); // Fall back to normal static serving
        }
    };
}

/**
 * Responsive image helper for generating srcset
 */
function generateSrcSet(imagePath, sizes = [320, 640, 768, 1024, 1280, 1920]) {
    const basePath = imagePath.replace(/\.[^/.]+$/, ''); // Remove extension
    const ext = path.extname(imagePath);
    
    return sizes.map(size => {
        return `/images/optimized/${basePath}_${size}w.webp ${size}w`;
    }).join(', ');
}

/**
 * Picture element helper for modern image formats
 */
function generatePictureElement(imagePath, alt, className = '', sizes = '100vw') {
    const basePath = imagePath.replace(/\.[^/.]+$/, '');
    
    return `
        <picture class="${className}">
            <source 
                srcset="${generateSrcSet(imagePath)}" 
                sizes="${sizes}" 
                type="image/webp"
            >
            <source 
                srcset="${generateSrcSet(imagePath.replace('.webp', '.avif'))}" 
                sizes="${sizes}" 
                type="image/avif"
            >
            <img 
                src="${imagePath}" 
                alt="${alt}" 
                loading="lazy" 
                decoding="async"
                class="${className}"
            >
        </picture>
    `;
}

/**
 * Critical image preloader
 */
function generatePreloadLinks(criticalImages) {
    return criticalImages.map(img => {
        return `<link rel="preload" as="image" href="${img.src}" ${img.media ? `media="${img.media}"` : ''}>`;
    }).join('\n');
}

/**
 * Image optimization stats middleware
 */
function imageStatsMiddleware() {
    return (req, res, next) => {
        const originalSend = res.send;
        
        res.send = function(data) {
            // Add image optimization stats to HTML responses
            if (res.get('Content-Type')?.includes('text/html') && data) {
                const optimizationStats = `
                    <!-- Image Optimization Active -->
                    <meta name="image-optimization" content="webp,avif,responsive">
                    <meta name="image-cache" content="1-year">
                `;
                
                data = data.replace('</head>', `${optimizationStats}</head>`);
            }
            
            return originalSend.call(this, data);
        };
        
        next();
    };
}

/**
 * Lazy loading enhancement
 */
function enhanceLazyLoading() {
    return (req, res, next) => {
        const originalSend = res.send;
        
        res.send = function(data) {
            if (res.get('Content-Type')?.includes('text/html') && data) {
                // Add intersection observer for lazy loading
                const lazyLoadScript = `
                    <script>
                        // Enhanced lazy loading with intersection observer
                        if ('IntersectionObserver' in window) {
                            const imageObserver = new IntersectionObserver((entries, observer) => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) {
                                        const img = entry.target;
                                        if (img.dataset.src) {
                                            img.src = img.dataset.src;
                                            img.removeAttribute('data-src');
                                        }
                                        if (img.dataset.srcset) {
                                            img.srcset = img.dataset.srcset;
                                            img.removeAttribute('data-srcset');
                                        }
                                        img.classList.remove('lazy');
                                        observer.unobserve(img);
                                    }
                                });
                            }, {
                                rootMargin: '50px 0px',
                                threshold: 0.01
                            });
                            
                            document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
                                imageObserver.observe(img);
                            });
                        }
                    </script>
                `;
                
                data = data.replace('</body>', `${lazyLoadScript}</body>`);
            }
            
            return originalSend.call(this, data);
        };
        
        next();
    };
}

module.exports = {
    optimizedImageMiddleware,
    generateSrcSet,
    generatePictureElement,
    generatePreloadLinks,
    imageStatsMiddleware,
    enhanceLazyLoading
};
