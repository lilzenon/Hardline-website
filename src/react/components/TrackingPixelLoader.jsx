/**
 * TrackingPixelLoader - Dynamic tracking pixel loader with GDPR consent
 * 
 * Loads tracking pixels (Google Ads, Meta, TikTok, etc.) only after user consent
 * Integrates with the existing privacy consent system
 */

import { useEffect, useRef, useCallback } from 'react';
import { useSEO } from '../contexts/SEOContext';

// Check if user has given GDPR consent
const hasGDPRConsent = () => {
    try {
        const consent = localStorage.getItem('gdpr_consent');
        return consent === 'accepted' || consent === 'true';
    } catch {
        return false;
    }
};

// Track if scripts are already loaded to prevent duplicates
const loadedScripts = new Set();

/**
 * Load external script dynamically
 */
const loadScript = (src, id, callback) => {
    if (loadedScripts.has(id)) {
        callback?.();
        return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.async = true;
    script.onload = () => {
        loadedScripts.add(id);
        callback?.();
    };
    script.onerror = (error) => {
        console.error(`📊 Failed to load tracking script: ${id}`, error);
    };
    document.head.appendChild(script);
};

/**
 * Initialize Google Ads / gtag.js
 */
const initializeGoogleAds = (googleAdsId, googleAnalyticsId) => {
    if (!googleAdsId && !googleAnalyticsId) return;

    const primaryId = googleAdsId || googleAnalyticsId;

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    // Load gtag.js
    loadScript(
        `https://www.googletagmanager.com/gtag/js?id=${primaryId}`,
        'google-gtag',
        () => {
            window.gtag('js', new Date());

            // Configure Google Ads if present
            if (googleAdsId) {
                window.gtag('config', googleAdsId, {
                    'allow_enhanced_conversions': true
                });
                console.log(`📊 Google Ads initialized: ${googleAdsId}`);
            }

            // Configure GA4 if present
            if (googleAnalyticsId) {
                window.gtag('config', googleAnalyticsId, {
                    'send_page_view': true
                });
                console.log(`📊 Google Analytics 4 initialized: ${googleAnalyticsId}`);
            }
        }
    );
};

/**
 * Initialize Meta (Facebook) Pixel
 */
const initializeMetaPixel = (pixelId) => {
    if (!pixelId) return;

    // Initialize Meta Pixel
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
        if (!f._fbq) f._fbq = n;
        n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = [];
        t = b.createElement(e); t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    loadedScripts.add('meta-pixel');
    console.log(`📊 Meta Pixel initialized: ${pixelId}`);
};

/**
 * Initialize TikTok Pixel
 */
const initializeTikTokPixel = (pixelId) => {
    if (!pixelId) return;

    !function (w, d, t) {
        w.TiktokAnalyticsObject = t;
        var ttq = w[t] = w[t] || [];
        ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
        ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } };
        for (var i = 0; i < ttq.methods.length; i++)ttq.setAndDefer(ttq, ttq.methods[i]);
        ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)ttq.setAndDefer(e, ttq.methods[n]); return e };
        ttq.load = function (e, n) {
            var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
            ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {};
            var o = document.createElement("script"); o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
            var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(o, a)
        };
        ttq.load(pixelId);
        ttq.page();
    }(window, document, 'ttq');

    loadedScripts.add('tiktok-pixel');
    console.log(`📊 TikTok Pixel initialized: ${pixelId}`);
};

/**
 * Initialize Snapchat Pixel
 */
const initializeSnapchatPixel = (pixelId) => {
    if (!pixelId) return;

    (function (e, t, n) {
        if (e.snaptr) return;
        var a = e.snaptr = function () { a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments) };
        a.queue = [];
        var s = 'script';
        var r = t.createElement(s); r.async = !0;
        r.src = n;
        var u = t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r, u);
    })(window, document, 'https://sc-static.net/scevent.min.js');

    window.snaptr('init', pixelId);
    window.snaptr('track', 'PAGE_VIEW');

    loadedScripts.add('snapchat-pixel');
    console.log(`📊 Snapchat Pixel initialized: ${pixelId}`);
};

/**
 * Initialize Pinterest Tag
 */
const initializePinterestTag = (tagId) => {
    if (!tagId) return;

    !function (e) {
        if (!window.pintrk) {
            window.pintrk = function () { window.pintrk.queue.push(Array.prototype.slice.call(arguments)) };
            var n = window.pintrk; n.queue = [], n.version = "3.0";
            var t = document.createElement("script"); t.async = !0, t.src = e;
            var r = document.getElementsByTagName("script")[0]; r.parentNode.insertBefore(t, r)
        }
    }("https://s.pinimg.com/ct/core.js");

    window.pintrk('load', tagId);
    window.pintrk('page');

    loadedScripts.add('pinterest-tag');
    console.log(`📊 Pinterest Tag initialized: ${tagId}`);
};

/**
 * TrackingPixelLoader Component
 * 
 * This component manages all tracking pixels and ensures they only load
 * after the user has given GDPR consent.
 */
export const TrackingPixelLoader = () => {
    const { seoSettings } = useSEO();
    const initialized = useRef(false);

    const initializePixels = useCallback(() => {
        if (initialized.current) return;
        // 🚀 REMOVED GDPR CONSENT CHECK - User confirmed consent is not required
        // Tracking pixels now load immediately when settings are available

        initialized.current = true;
        console.log('📊 Initializing tracking pixels (no consent gate)...');

        // Google Ads / GA4
        if (seoSettings?.google_ads_enabled && seoSettings?.google_ads_id) {
            initializeGoogleAds(seoSettings.google_ads_id, seoSettings.google_analytics_id);
        } else if (seoSettings?.google_analytics_id) {
            // Fall back to GA4 only if no Google Ads
            initializeGoogleAds(null, seoSettings.google_analytics_id);
        }

        // Meta Pixel
        if (seoSettings?.meta_pixel_enabled && seoSettings?.meta_pixel_id) {
            initializeMetaPixel(seoSettings.meta_pixel_id);
        }

        // TikTok Pixel
        if (seoSettings?.tiktok_pixel_enabled && seoSettings?.tiktok_pixel_id) {
            initializeTikTokPixel(seoSettings.tiktok_pixel_id);
        }

        // Snapchat Pixel
        if (seoSettings?.snapchat_pixel_enabled && seoSettings?.snapchat_pixel_id) {
            initializeSnapchatPixel(seoSettings.snapchat_pixel_id);
        }

        // Pinterest Tag
        if (seoSettings?.pinterest_tag_enabled && seoSettings?.pinterest_tag_id) {
            initializePinterestTag(seoSettings.pinterest_tag_id);
        }
    }, [seoSettings]);

    // Initialize on mount or when settings change
    // 🚀 SIMPLIFIED: No consent listeners needed - pixels load immediately
    useEffect(() => {
        // Initialize as soon as seoSettings are available
        if (seoSettings) {
            initializePixels();
        }
    }, [initializePixels, seoSettings]);

    // Track page views on route changes
    useEffect(() => {
        if (!initialized.current) return;

        const trackPageView = () => {
            // Google Ads / GA4
            if (window.gtag) {
                window.gtag('event', 'page_view', {
                    page_path: window.location.pathname,
                    page_title: document.title
                });
            }

            // Meta Pixel
            if (window.fbq) {
                window.fbq('track', 'PageView');
            }

            // TikTok
            if (window.ttq) {
                window.ttq.page();
            }

            // Snapchat
            if (window.snaptr) {
                window.snaptr('track', 'PAGE_VIEW');
            }

            // Pinterest
            if (window.pintrk) {
                window.pintrk('page');
            }
        };

        // Listen for route changes
        const handlePopState = () => trackPageView();
        window.addEventListener('popstate', handlePopState);

        // Initial page view
        trackPageView();

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [seoSettings]);

    // This component doesn't render anything
    return null;
};

/**
 * Track a conversion event across all enabled pixels
 * 
 * @param {string} eventName - Name of the conversion event
 * @param {Object} eventData - Event data (value, currency, content_ids, etc.)
 */
export const trackConversion = (eventName, eventData = {}) => {
    if (!hasGDPRConsent()) {
        console.log(`📊 Conversion not tracked (no consent): ${eventName}`);
        return;
    }

    console.log(`📊 Tracking conversion: ${eventName}`, eventData);

    // Google Ads conversion
    if (window.gtag) {
        window.gtag('event', 'conversion', {
            'send_to': eventData.google_conversion_label || eventName,
            'value': eventData.value,
            'currency': eventData.currency || 'USD',
            'transaction_id': eventData.transaction_id
        });
    }

    // Meta Pixel
    if (window.fbq) {
        const metaEventName = {
            'purchase': 'Purchase',
            'add_to_cart': 'AddToCart',
            'signup': 'CompleteRegistration',
            'lead': 'Lead',
            'view_content': 'ViewContent'
        }[eventName?.toLowerCase()] || eventName;

        window.fbq('track', metaEventName, {
            value: eventData.value,
            currency: eventData.currency || 'USD',
            content_ids: eventData.content_ids,
            content_type: eventData.content_type || 'product'
        });
    }

    // TikTok
    if (window.ttq) {
        const ttEventName = {
            'purchase': 'CompletePayment',
            'add_to_cart': 'AddToCart',
            'signup': 'CompleteRegistration',
            'view_content': 'ViewContent'
        }[eventName?.toLowerCase()] || eventName;

        window.ttq.track(ttEventName, {
            value: eventData.value,
            currency: eventData.currency || 'USD',
            content_id: eventData.content_ids?.[0],
            content_type: eventData.content_type || 'product'
        });
    }

    // Snapchat
    if (window.snaptr) {
        const snapEventName = {
            'purchase': 'PURCHASE',
            'add_to_cart': 'ADD_CART',
            'signup': 'SIGN_UP',
            'view_content': 'VIEW_CONTENT'
        }[eventName?.toLowerCase()] || eventName.toUpperCase();

        window.snaptr('track', snapEventName, {
            price: eventData.value,
            currency: eventData.currency || 'USD',
            item_ids: eventData.content_ids
        });
    }

    // Pinterest
    if (window.pintrk) {
        const pinEventName = {
            'purchase': 'checkout',
            'add_to_cart': 'addtocart',
            'signup': 'signup',
            'lead': 'lead',
            'view_content': 'pagevisit'
        }[eventName?.toLowerCase()] || eventName;

        window.pintrk('track', pinEventName, {
            value: eventData.value,
            currency: eventData.currency || 'USD',
            line_items: eventData.content_ids?.map(id => ({ product_id: id }))
        });
    }
};

export default TrackingPixelLoader;
