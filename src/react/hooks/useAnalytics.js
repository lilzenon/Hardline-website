/**
 * React Analytics Hook for HARDLINE
 * Uses consolidated analytics system
 */

import { useEffect, useRef, useCallback } from 'react';
import { getAnalyticsInstance, trackEvent as globalTrackEvent } from '../../lib/analytics/beacon';

/**
 * Simplified analytics hook using consolidated analytics system
 */
export const useAnalytics = () => {
    const hasTrackedPageView = useRef(false);

    // Track page view on mount (only if not already tracked globally)
    useEffect(() => {
        const analytics = getAnalyticsInstance();
        if (!hasTrackedPageView.current && analytics && typeof analytics.isEnabled === 'function' && analytics.isEnabled()) {
            // Page view is already tracked by global initialization
            // This just marks it as tracked for this component
            hasTrackedPageView.current = true;
            console.debug('📊 Analytics page view tracked via React hook');
        }
    }, []);

    // Manual tracking function
    const track = useCallback((eventData) => {
        globalTrackEvent(eventData);
    }, []);

    // Track external link clicks
    const trackLinkClick = useCallback((url, linkText = '') => {
        const analytics = getAnalyticsInstance();
        if (analytics && typeof analytics.isEnabled === 'function' && analytics.isEnabled()) {
            analytics.trackLinkClick(url, linkText);
        }
    }, []);

    // Track custom events - FIXED to use proper analytics beacon
    const trackEvent = useCallback((eventName, eventData = {}) => {
        const analytics = getAnalyticsInstance();
        if (analytics && typeof analytics.isEnabled === 'function' && analytics.isEnabled()) {
            // Use the analytics beacon's sendEvent method instead of creating duplicate page views
            analytics.sendEvent({
                event: eventName,
                properties: eventData,
                timestamp: Date.now()
            });
            console.debug('📊 Custom event tracked via analytics beacon:', eventName, eventData);
        }
    }, []);

    const analytics = getAnalyticsInstance();
    return {
        track,
        trackLinkClick,
        trackEvent,
        isTrackingEnabled: analytics && typeof analytics.isEnabled === 'function' ? analytics.isEnabled() : false
    };
};

export default useAnalytics;