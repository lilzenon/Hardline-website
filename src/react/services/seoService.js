/**
 * SEO Service - Fetches SEO settings from dashboard API
 * Enhanced with robust error handling and fallback mechanisms
 */

import { apiClient } from '../../lib/api-client';

// Default SEO settings fallback
export const DEFAULT_SEO_SETTINGS = {
    default_title: 'BOUNCE2BOUNCE - Premium Event Platform',
    default_description: 'Discover and book premium events worldwide with BOUNCE2BOUNCE',
    default_keywords: 'events, tickets, entertainment, concerts, festivals',
    default_author: 'BOUNCE2BOUNCE',
    default_og_image: 'https://bounce2bounce.com/images/og-image.png',
    twitter_handle: '@bounce2bounce',
    google_analytics_id: '',
    google_search_console_id: ''
};

// PERFORMANCE OPTIMIZATION: Staggered cache to prevent cascade expiration
let seoCache = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 6 * 60 * 1000; // 6 minutes (staggered from 5 minutes)
const PROACTIVE_REFRESH_THRESHOLD = 0.8; // Refresh at 80% of cache duration

/**
 * Fetch SEO settings from dashboard API with caching
 * @returns {Promise<Object>} SEO settings object
 */
export const fetchSEOSettings = async() => {
    const startTime = Date.now();

    try {
        // PERFORMANCE OPTIMIZATION: Proactive cache warming to prevent cascade expiration
        const now = Date.now();
        const cacheAge = now - cacheTimestamp;
        const shouldProactiveRefresh = cacheAge > (CACHE_DURATION * PROACTIVE_REFRESH_THRESHOLD);

        if (seoCache && cacheAge < CACHE_DURATION) {
            if (process.env.NODE_ENV !== 'production') {
                console.log(`⚡ SEO settings served from cache (${Math.round(cacheAge/1000)}s old)`);
            }

            // Proactive refresh in background if approaching expiration
            if (shouldProactiveRefresh) {
                console.log('🔥 Proactively refreshing SEO cache in background...');
                setTimeout(() => refreshSEOCacheInBackground(), 100);
            }

            return seoCache;
        }

        // ENHANCED: Use new API client with retry logic and fallbacks
        console.log('🔍 Fetching SEO settings from dashboard API...');

        const apiResponse = await apiClient.getSEOSettings();

        if (!apiResponse.success) {
            throw new Error(apiResponse.error || 'Failed to fetch SEO settings');
        }

        const data = apiResponse.data;

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
            console.warn('⚠️ SEO API request timed out after 8 seconds - using defaults');
        } else if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
            // DEVELOPMENT: Graceful handling when dashboard API is not available
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('ℹ️ Dashboard API not available in development - using default SEO settings');
            } else {
                console.error('❌ Failed to fetch SEO settings:', error.message);
            }
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

        // Use enhanced API client
        const apiResponse = await apiClient.getMaintenanceStatus();

        if (!apiResponse.success) {
            console.warn('⚠️ Maintenance API request failed:', apiResponse.error);
            return { maintenance_mode: false };
        }

        const data = apiResponse.data;

        if (data.success !== undefined) {
            console.log('✅ Maintenance status fetched:', { maintenance_mode: data.maintenance_mode });
            return {
                maintenance_mode: data.maintenance_mode || false,
                maintenance_message: data.maintenance_message || 'We are currently performing scheduled maintenance.',
                maintenance_title: data.maintenance_title || 'Site Under Maintenance',
                estimated_downtime: data.estimated_downtime || '2 hours',
                contact_information: data.contact_information || 'support@bounce2bounce.com'
            };
        } else {
            console.warn('⚠️ Invalid maintenance API response format:', data);
            return { maintenance_mode: false };
        }

    } catch (error) {
        if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
            // DEVELOPMENT: Graceful handling when dashboard API is not available
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('ℹ️ Maintenance API not available in development - assuming not in maintenance mode');
            } else {
                console.error('❌ Failed to fetch maintenance status:', error);
            }
        } else {
            console.error('❌ Failed to fetch maintenance status:', error);
        }
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
    const CANONICAL_HOST = 'bounce2bounce.com';
    const HOMEPAGE_ORIGIN = `https://${CANONICAL_HOST}`;
    const { isMobile = false, deviceType = 'unknown' } = options;

    // Ensure URLs are absolute for Open Graph with admin-domain mapping for uploads
    const getAbsoluteImageUrl = (imageUrl) => {
        // If no image URL provided, use the default OG image from homepage
        if (!imageUrl || imageUrl.trim() === '') {
            return `${HOMEPAGE_ORIGIN}/images/og-image.png`;
        }

        // If absolute URL, normalize path segments we know about and remap to admin when needed
        if (/^https?:\/\//i.test(imageUrl)) {
            try {
                const u = new URL(imageUrl);
                // Normalize known bad prefixes and map to admin domain when path indicates uploads
                let p = u.pathname;
                if (p.startsWith('/data/static/uploads/')) p = p.replace('/data/static/uploads/', '/static/uploads/');
                const isAdminManaged =
                    p.includes('/uploads/') ||
                    p.includes('/static/uploads/') ||
                    p.includes('/api/images/serve/') ||
                    p.includes('/og-images/');
                if (isAdminManaged) {
                    return `https://admin.b2b.click${p}`;
                }
                return `${u.origin}${p}`;
            } catch (_) {
                // fall through to relative handling
            }
        }

        // Normalize relative paths and map uploads to admin domain
        const rel = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
        const normalized = rel.startsWith('/data/static/uploads/')
            ? rel.replace('/data/static/uploads/', '/static/uploads/')
            : rel;
        if (
            normalized.startsWith('/uploads/') ||
            normalized.startsWith('/static/uploads/') ||
            normalized.startsWith('/api/images/serve/') ||
            normalized.includes('/og-images/')
        ) {
            return `https://admin.b2b.click${normalized}`;
        }

        // For static images (like /images/og-image.png), serve from homepage domain
        if (normalized.startsWith('/images/') || normalized.startsWith('/static/images/')) {
            return `${HOMEPAGE_ORIGIN}${normalized}`;
        }

        // Default to homepage domain for other relative paths
        return `${HOMEPAGE_ORIGIN}${normalized}`;
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
        { property: 'og:url', content: (typeof window !== 'undefined' ? `${HOMEPAGE_ORIGIN}${window.location.pathname}` : `${HOMEPAGE_ORIGIN}/`) },
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
        { name: 'twitter:url', content: (typeof window !== 'undefined' ? `${HOMEPAGE_ORIGIN}${window.location.pathname}` : `${HOMEPAGE_ORIGIN}/`) },
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
            { rel: 'canonical', href: (typeof window !== 'undefined' ? `${HOMEPAGE_ORIGIN}${window.location.pathname}` : `${HOMEPAGE_ORIGIN}/`) }
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

/**
 * Background refresh function for proactive cache warming
 */
async function refreshSEOCacheInBackground() {
    try {
        // Temporarily clear cache to force refresh
        const oldCache = seoCache;
        const oldTimestamp = cacheTimestamp;

        seoCache = null;
        cacheTimestamp = 0;

        // Fetch fresh data
        const freshData = await fetchSEOSettings();

        if (process.env.NODE_ENV !== 'production') {
            console.log('✅ SEO cache proactively refreshed in background');
        }

        return freshData;

    } catch (error) {
        // Restore old cache on error
        seoCache = oldCache;
        cacheTimestamp = oldTimestamp;

        console.warn('⚠️ Background SEO cache refresh failed, keeping old cache:', error.message);
    }
}

export default {
    fetchSEOSettings,
    fetchMaintenanceStatus,
    generateMetaTags,
    getCachedSEOSettings,
    setCachedSEOSettings,
    clearSEOCache,
    DEFAULT_SEO_SETTINGS
};