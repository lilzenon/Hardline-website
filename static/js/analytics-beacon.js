/**
 * BOUNCE2BOUNCE Analytics Beacon
 * Lightweight analytics tracking for homepage
 * Sends data to admin.b2b.click dashboard
 */

(function() {
    'use strict';

    // Configuration
    const ANALYTICS_ENDPOINT = 'https://admin.b2b.click/api/a/pv';
    const ANALYTICS_ENDPOINT_DEV = 'http://localhost:3000/api/a/pv';
    
    // Use development endpoint if on localhost
    const endpoint = window.location.hostname === 'localhost' ? ANALYTICS_ENDPOINT_DEV : ANALYTICS_ENDPOINT;

    // Check if analytics should be disabled
    function shouldTrack() {
        // Respect Do Not Track
        if (navigator.doNotTrack === '1' || window.doNotTrack === '1') {
            return false;
        }

        // Don't track bots
        const userAgent = navigator.userAgent.toLowerCase();
        const botPatterns = [
            'bot', 'crawler', 'spider', 'scraper', 'fetcher',
            'googlebot', 'bingbot', 'slurp', 'duckduckbot',
            'facebookexternalhit', 'twitterbot', 'linkedinbot',
            'whatsapp', 'telegrambot', 'headless', 'phantom',
            'selenium', 'puppeteer', 'playwright'
        ];
        
        if (botPatterns.some(pattern => userAgent.includes(pattern))) {
            return false;
        }

        return true;
    }

    // Get page information
    function getPageInfo() {
        return {
            ts: Date.now(),
            page_url: window.location.href,
            page_title: document.title || '',
            referrer: document.referrer || null,
            viewport_width: window.innerWidth || 0,
            viewport_height: window.innerHeight || 0,
            screen_width: screen.width || 0,
            screen_height: screen.height || 0,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
            language: navigator.language || null
        };
    }

    // Send analytics data
    function sendAnalytics(data) {
        try {
            // Use sendBeacon if available (preferred for page unload)
            if (navigator.sendBeacon) {
                const blob = new Blob([JSON.stringify(data)], {
                    type: 'application/json'
                });
                navigator.sendBeacon(endpoint, blob);
                return;
            }

            // Fallback to fetch
            fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                keepalive: true
            }).catch(function(error) {
                // Silently fail - don't break the page
                console.debug('Analytics error:', error);
            });

        } catch (error) {
            // Silently fail - don't break the page
            console.debug('Analytics error:', error);
        }
    }

    // Track page view
    function trackPageView() {
        if (!shouldTrack()) {
            return;
        }

        const pageInfo = getPageInfo();
        sendAnalytics(pageInfo);
    }

    // Track page visibility changes (for session duration)
    function trackVisibilityChange() {
        if (!shouldTrack()) {
            return;
        }

        if (document.visibilityState === 'hidden') {
            // Page is being hidden, send final beacon
            const pageInfo = getPageInfo();
            pageInfo.event_type = 'page_hide';
            sendAnalytics(pageInfo);
        }
    }

    // Initialize analytics
    function initAnalytics() {
        // Track initial page view
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', trackPageView);
        } else {
            trackPageView();
        }

        // Track page visibility changes
        document.addEventListener('visibilitychange', trackVisibilityChange);

        // Track page unload
        window.addEventListener('beforeunload', function() {
            if (shouldTrack()) {
                const pageInfo = getPageInfo();
                pageInfo.event_type = 'page_unload';
                sendAnalytics(pageInfo);
            }
        });

        // Track clicks on external links
        document.addEventListener('click', function(event) {
            if (!shouldTrack()) {
                return;
            }

            const link = event.target.closest('a');
            if (link && link.href) {
                const url = new URL(link.href, window.location.href);
                const currentHost = window.location.hostname;
                
                // Check if it's an external link
                if (url.hostname !== currentHost) {
                    const pageInfo = getPageInfo();
                    pageInfo.event_type = 'external_link_click';
                    pageInfo.link_url = url.href;
                    pageInfo.link_text = link.textContent || link.innerText || '';
                    sendAnalytics(pageInfo);
                }
            }
        });

        console.debug('📊 BOUNCE2BOUNCE Analytics initialized');
    }

    // Start analytics when script loads
    initAnalytics();

    // Expose global function for manual tracking
    window.B2BAnalytics = {
        track: function(eventType, data) {
            if (!shouldTrack()) {
                return;
            }

            const pageInfo = getPageInfo();
            pageInfo.event_type = eventType;
            
            if (data && typeof data === 'object') {
                Object.assign(pageInfo, data);
            }

            sendAnalytics(pageInfo);
        }
    };

})();
