/**
 * React Analytics Hook for BOUNCE2BOUNCE
 * Uses TypeScript analytics beacon for tracking
 */

import { useEffect, useRef, useCallback } from 'react';
import { analyticsBeacon } from '../../lib/analytics/beacon.ts';

/**
 * Simplified analytics hook using TypeScript beacon
 */
export const useAnalytics = () => {
    const hasTrackedPageView = useRef(false);

    // Track page view on mount
    useEffect(() => {
        if (!hasTrackedPageView.current && analyticsBeacon.isEnabled()) {
            analyticsBeacon.sendPageView();
            hasTrackedPageView.current = true;
            console.debug('📊 Analytics page view tracked');
        }
    }, []);

    // Manual tracking function
    const track = useCallback((eventData) => {
        if (analyticsBeacon.isEnabled()) {
            analyticsBeacon.sendEvent(eventData);
        }
    }, []);

    // Track external link clicks
    const trackLinkClick = useCallback((url, linkText = '') => {
        if (analyticsBeacon.isEnabled()) {
            analyticsBeacon.trackLinkClick(url, linkText);
        }
    }, []);

    // Track custom events
    const trackEvent = useCallback((eventName, eventData = {}) => {
        track({
            page_title: `Event: ${eventName}`,
            ...eventData
        });
    }, [track]);

    return {
        track,
        trackLinkClick,
        trackEvent,
        isTrackingEnabled: analyticsBeacon.isEnabled()
    };
};

export default useAnalytics;