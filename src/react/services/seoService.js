/**
 * SEO Service - Fetches SEO settings from dashboard API
 * Handles dynamic meta tag updates for the homepage
 */

// API endpoints configuration
const API_CONFIG = {
    // Dashboard API endpoint for SEO settings
    DASHBOARD_API: (
            import.meta.env.PROD || window.location.hostname === 'b2b.click' || window.location.hostname === 'bounce2bounce.com') ?
        'https://admin.b2b.click/api/settings/seo' : 'http://localhost:3002/api/settings/seo',

    // Maintenance status endpoint (public)
    MAINTENANCE_API: (
            import.meta.env.PROD || window.location.hostname === 'b2b.click' || window.location.hostname === 'bounce2bounce.com') ?
        'https://admin.b2b.click/api/settings/maintenance-status' : 'http://localhost:3002/api/settings/maintenance-status'
};

// Default SEO settings fallback
export const DEFAULT_SEO_SETTINGS = {
    default_title: 'BOUNCE2BOUNCE - Premium Event Platform',
    default_description: 'Discover and book premium events worldwide with BOUNCE2BOUNCE',
    default_keywords: 'events, tickets, entertainment, concerts, festivals',
    default_author: 'BOUNCE2BOUNCE',
    default_og_image: '/images/og-image.png',
    twitter_handle: '@bounce2bounce',
    google_analytics_id: '',
    google_search_console_id: ''
};

// PERFORMANCE OPTIMIZATION: Cache SEO settings to avoid repeated API calls
let seoCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch SEO settings from dashboard API with caching
 * @returns {Promise<Object>} SEO settings object
 */
export const fetchSEOSettings = async() => {
    const startTime = Date.now();

    try {
        // PERFORMANCE OPTIMIZATION: Return cached data if still valid
        const now = Date.now();
        if (seoCache && (now - cacheTimestamp) < CACHE_DURATION) {
            const cacheAge = now - cacheTimestamp;
            if (process.env.NODE_ENV !== 'production') {
                console.log(`⚡ SEO settings served from cache (${Math.round(cacheAge/1000)}s old)`);
            }
            return seoCache;
        }

        // PERFORMANCE OPTIMIZATION: Minimal logging in production
        if (process.env.NODE_ENV !== 'production') {
            console.log('🔍 Fetching SEO settings from dashboard API...');
        }

        // PERFORMANCE OPTIMIZATION: Reduced timeout to match backend optimizations
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout to match backend

        const response = await fetch(API_CONFIG.DASHBOARD_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            // Don't include credentials for cross-origin requests
            mode: 'cors',
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`⚠️ SEO API returned ${response.status}: ${response.statusText}`);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Check if response is actually JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.warn('⚠️ SEO API returned non-JSON response:', contentType);
            throw new Error('API returned HTML instead of JSON - possible routing issue');
        }

        const data = await response.json();

        if (data.success && data.settings) {
            const duration = Date.now() - startTime;

            // PERFORMANCE OPTIMIZATION: Cache the successful result
            seoCache = {
                ...DEFAULT_SEO_SETTINGS,
                ...data.settings
            };
            cacheTimestamp = now;

            // PERFORMANCE OPTIMIZATION: Minimal logging in production
            if (process.env.NODE_ENV !== 'production') {
                const performanceMessage = duration < 1000 ?
                    `✅ SEO settings fetched in ${duration}ms (⚡ Performance optimized!)` :
                    `✅ SEO settings fetched in ${duration}ms`;
                console.log(performanceMessage);
            }

            return seoCache;
        } else {
            console.warn('⚠️ Invalid SEO API response format:', data);
            throw new Error('Invalid API response format');
        }

    } catch (error) {
        // PERFORMANCE OPTIMIZATION: Return cached data if available, even if expired
        if (seoCache) {
            console.log('🔄 Using cached SEO settings due to API error');
            return seoCache;
        }

        if (error.name === 'AbortError') {
            console.error('❌ SEO API request timed out after 8 seconds');
        } else {
            console.error('❌ Failed to fetch SEO settings:', error.message);
        }

        console.log('🔄 Using default SEO settings as fallback');
        return DEFAULT_SEO_SETTINGS;
    }
};

/**
 * Fetch maintenance mode status
 * @returns {Promise<Object>} Maintenance status object
 */
export const fetchMaintenanceStatus = async() => {
    try {
        console.log('🔍 Checking maintenance mode status...');

        const response = await fetch(API_CONFIG.MAINTENANCE_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors'
        });

        if (!response.ok) {
            console.warn(`⚠️ Maintenance API returned ${response.status}: ${response.statusText}`);
            return { maintenance_mode: false };
        }

        const data = await response.json();

        if (data.success !== undefined) {
            console.log('✅ Maintenance status fetched:', { maintenance_mode: data.maintenance_mode });
            return {
                maintenance_mode: data.maintenance_mode || false,
                maintenance_message: data.maintenance_message || 'We are currently performing scheduled maintenance.',
                estimated_downtime: data.estimated_downtime || '2 hours',
                contact_information: data.contact_information || 'support@bounce2bounce.com'
            };
        } else {
            console.warn('⚠️ Invalid maintenance API response format:', data);
            return { maintenance_mode: false };
        }

    } catch (error) {
        console.error('❌ Failed to fetch maintenance status:', error);
        return { maintenance_mode: false };
    }
};

/**
 * Generate complete meta tags object from SEO settings
 * @param {Object} seoSettings - SEO settings from API
 * @param {Object} options - Additional options for meta tag generation
 * @returns {Object} Complete meta tags configuration
 */
export const generateMetaTags = (seoSettings, options = {}) => {
    const settings = {...DEFAULT_SEO_SETTINGS, ...seoSettings };
    const { isMobile = false, deviceType = 'unknown' } = options;

    // Ensure URLs are absolute for Open Graph
    const getAbsoluteImageUrl = (imageUrl) => {
        if (!imageUrl) return 'https://admin.b2b.click/images/og-image.png';
        if (imageUrl.startsWith('http')) return imageUrl;
        if (imageUrl.startsWith('/uploads/')) {
            return `https://admin.b2b.click${imageUrl}`;
        }
        return `https://b2b.click${imageUrl}`;
    };

    const ogImage = getAbsoluteImageUrl(settings.default_og_image);

    // Base meta tags
    const metaTags = [
        // Basic meta tags
        { name: 'description', content: settings.default_description },
        { name: 'keywords', content: settings.default_keywords },
        { name: 'author', content: settings.default_author },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://b2b.click/' },
        { property: 'og:title', content: settings.default_title },
        { property: 'og:description', content: settings.default_description },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: `${settings.default_title} - Preview Image` },
        { property: 'og:site_name', content: 'BOUNCE2BOUNCE' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: settings.twitter_handle },
        { name: 'twitter:creator', content: settings.twitter_handle },
        { name: 'twitter:url', content: 'https://b2b.click/' },
        { name: 'twitter:title', content: settings.default_title },
        { name: 'twitter:description', content: settings.default_description },
        { name: 'twitter:image', content: ogImage },
        { name: 'twitter:image:alt', content: `${settings.default_title} - Preview Image` },

        // Additional SEO
        { name: 'theme-color', content: '#000000' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'BOUNCE2BOUNCE' },
        { name: 'application-name', content: 'BOUNCE2BOUNCE' }
    ];

    // Add mobile-specific meta tags
    if (isMobile) {
        metaTags.push(
            // Mobile viewport optimization
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover' },
            // iOS Safari optimizations
            { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }, { name: 'apple-touch-fullscreen', content: 'yes' }, { name: 'format-detection', content: 'telephone=no' },
            // Android Chrome optimizations
            { name: 'mobile-web-app-capable', content: 'yes' }, { name: 'theme-color', content: '#000000' }
        );
    }

    return {
        title: settings.default_title,
        meta: metaTags,
        link: [
            { rel: 'canonical', href: 'https://b2b.click/' }
        ]
    };
};

/**
 * Cache management for SEO settings
 */
const CACHE_KEY = 'seo_settings_cache';
const LOCAL_CACHE_DURATION = 30 * 1000; // 30 seconds for faster updates

export const getCachedSEOSettings = () => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < LOCAL_CACHE_DURATION) {
                console.log('📦 Using cached SEO settings');
                return data;
            }
        }
    } catch (error) {
        console.warn('⚠️ Failed to read SEO cache:', error);
        // Clear corrupted cache
        clearSEOCache();
    }
    return null;
};

export const clearSEOCache = () => {
    try {
        localStorage.removeItem(CACHE_KEY);
        console.log('🗑️ SEO cache cleared');
    } catch (error) {
        console.warn('⚠️ Failed to clear SEO cache:', error);
    }
};

export const setCachedSEOSettings = (settings) => {
    try {
        // Create a minimal cache object to reduce storage size
        const cacheData = {
            data: {
                default_title: settings.default_title,
                default_description: settings.default_description,
                default_og_image: settings.default_og_image,
                twitter_handle: settings.twitter_handle
            },
            timestamp: Date.now()
        };

        const cacheString = JSON.stringify(cacheData);

        // Check if we're approaching localStorage quota
        if (cacheString.length > 50000) { // ~50KB limit
            console.warn('⚠️ SEO cache data too large, clearing old cache');
            clearSEOCache();
        }

        localStorage.setItem(CACHE_KEY, cacheString);
        console.log('💾 SEO settings cached successfully');
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.warn('⚠️ localStorage quota exceeded, clearing cache and retrying');
            clearSEOCache();
            try {
                // Retry with minimal data
                const minimalCache = {
                    data: {
                        default_title: settings.default_title,
                        default_description: settings.default_description && settings.default_description.substring(0, 200),
                        default_og_image: settings.default_og_image
                    },
                    timestamp: Date.now()
                };
                localStorage.setItem(CACHE_KEY, JSON.stringify(minimalCache));
                console.log('💾 SEO settings cached with minimal data');
            } catch (retryError) {
                console.warn('⚠️ Failed to cache even minimal SEO settings:', retryError);
            }
        } else {
            console.warn('⚠️ Failed to cache SEO settings:', error);
        }
    }
};

export default {
    fetchSEOSettings,
    fetchMaintenanceStatus,
    generateMetaTags,
    getCachedSEOSettings,
    setCachedSEOSettings,
    clearSEOCache,
    DEFAULT_SEO_SETTINGS
};