/**
 * React Analytics Hook for BOUNCE2BOUNCE
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
        if (!hasTrackedPageView.current && analytics && analytics.isEnabled()) {
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
        if (analytics && analytics.isEnabled()) {
            analytics.trackLinkClick(url, linkText);
        }
    }, []);

    // Track custom events
    const trackEvent = useCallback((eventName, eventData = {}) => {
        track({
            page_title: `Event: ${eventName}`,
            event_type: eventName,
            ...eventData
        });
    }, [track]);

    const analytics = getAnalyticsInstance();
    return {
        track,
        trackLinkClick,
        trackEvent,
        isTrackingEnabled: analytics ? analytics.isEnabled() : false
    };
};

export default useAnalytics;