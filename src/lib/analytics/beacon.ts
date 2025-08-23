/**
 * Consolidated Analytics System for BOUNCE2BOUNCE Homepage
 * Primary analytics implementation using sendBeacon/fetch
 * Sends all data to admin.b2b.click/api/analytics/track
 */

interface AnalyticsEvent {
    ts?: number;
    page_url: string;
    page_title?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
    viewport_width?: number;
    viewport_height?: number;
    screen_width?: number;
    screen_height?: number;
    timezone?: string;
    language?: string;
    session_id?: string;
    user_id?: string;
    event_type?: string;
}

interface AnalyticsConfig {
    apiEndpoint?: string;
    trackingId?: string;
    enableGDPR?: boolean;
    enableRealTime?: boolean;
    sessionTimeout?: number;
    debug?: boolean;
}

interface BeaconConfig {
    endpoint: string;
    enabled: boolean;
    debug: boolean;
}

class AnalyticsBeacon {
    private config: BeaconConfig;
    private hasTrackedPageView = false;
    private sessionId: string | null = null;

    constructor(userConfig: AnalyticsConfig = {}) {
        // Determine API endpoint based on environment and domain
        const hostname = window.location.hostname;
        const isDevelopment = hostname === 'localhost';

        let apiEndpoint;
        if (userConfig.apiEndpoint) {
            apiEndpoint = userConfig.apiEndpoint;
        } else if (isDevelopment || import.meta.env.DEV) {
            // Local development - send to dashboard dev server
            apiEndpoint = 'http://localhost:3002/api';
            console.log('🔧 Development mode detected, using local dashboard:', apiEndpoint);
        } else if (hostname === 'b2b.click' || hostname === 'www.b2b.click') {
            // Current temporary setup - b2b.click homepage sends to admin.b2b.click
            apiEndpoint = 'https://admin.b2b.click/api';
        } else if (hostname === 'bounce2bounce.com' || hostname === 'www.bounce2bounce.com') {
            // Future production setup - bounce2bounce.com sends to admin.b2b.click
            apiEndpoint = 'https://admin.b2b.click/api';
        } else {
            // Fallback to same domain
            apiEndpoint = '/api';
        }

        // STANDARDIZED ENDPOINT: Always use /api/analytics/track
        const endpoint = '/analytics/track';

        this.config = {
            endpoint: `${apiEndpoint}${endpoint}`,
            enabled: userConfig.enableGDPR !== false ? this.shouldTrack() : true,
            debug: userConfig.debug || import.meta.env.DEV || process.env.NODE_ENV === 'development'
        };

        // Initialize session
        this.sessionId = this.getSessionId();

        if (this.config.debug) {
            console.log('📊 Consolidated Analytics initialized:', this.config);
            console.log('📊 Session ID:', this.sessionId);
        }
    }

    /**
     * Check if analytics tracking should be enabled
     */
    private shouldTrack(): boolean {
        // Respect Do Not Track
        if (navigator.doNotTrack === '1' || (window as any).doNotTrack === '1') {
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

    /**
     * Get or generate session ID
     */
    private getSessionId(): string {
        const existingSessionId = localStorage.getItem('analytics_session_id');
        const sessionExpiry = localStorage.getItem('analytics_session_expiry');

        const now = Date.now();
        const isSessionValid = existingSessionId && sessionExpiry && now < parseInt(sessionExpiry);

        if (isSessionValid) {
            return existingSessionId;
        }

        // Generate new session ID
        const sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        // Store session data
        localStorage.setItem('analytics_session_id', sessionId);
        const expiryTime = now + (30 * 60 * 1000); // 30 minutes
        localStorage.setItem('analytics_session_expiry', expiryTime.toString());

        return sessionId;
    }

    /**
     * Get current page information
     */
    private getPageInfo(): AnalyticsEvent {
        // Extract UTM parameters from URL
        const urlParams = new URLSearchParams(window.location.search);
        
        return {
            ts: Date.now(),
            page_url: window.location.href,
            page_title: document.title || '',
            referrer: document.referrer || undefined,
            utm_source: urlParams.get('utm_source') || undefined,
            utm_medium: urlParams.get('utm_medium') || undefined,
            utm_campaign: urlParams.get('utm_campaign') || undefined,
            viewport_width: window.innerWidth || 0,
            viewport_height: window.innerHeight || 0,
            screen_width: screen.width || 0,
            screen_height: screen.height || 0,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || undefined,
            language: navigator.language || undefined
        };
    }

    /**
     * Send analytics data using sendBeacon or fetch fallback
     */
    private async sendData(data: AnalyticsEvent): Promise<boolean> {
        if (!this.config.enabled) {
            return false;
        }

        try {
            const payload = JSON.stringify(data);
            
            // Try sendBeacon first (preferred for page unload)
            if (navigator.sendBeacon) {
                const blob = new Blob([payload], { type: 'application/json' });
                const success = navigator.sendBeacon(this.config.endpoint, blob);
                
                if (success) {
                    if (this.config.debug) {
                        console.log('📊 Analytics sent via beacon:', data);
                    }
                    return true;
                }
            }

            // Fallback to fetch with keepalive
            const response = await fetch(this.config.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: payload,
                keepalive: true,
                mode: 'cors'
            });

            if (response.ok || response.status === 204) {
                if (this.config.debug) {
                    console.log('📊 Analytics sent via fetch:', data);
                }
                return true;
            } else {
                if (this.config.debug) {
                    console.warn('📊 Analytics response:', response.status);
                }
                return false;
            }

        } catch (error) {
            if (this.config.debug) {
                console.error('📊 Analytics error:', error);
            }
            return false;
        }
    }

    /**
     * Send page view event
     */
    async sendPageView(): Promise<boolean> {
        if (this.hasTrackedPageView) {
            if (this.config.debug) {
                console.log('📊 Analytics: Page view already tracked for this session');
            }
            return false; // Only track once per page load
        }

        const pageInfo = this.getPageInfo();

        // Format data for dashboard API - ensure page_url is never null
        const eventData = {
            sessionId: this.getSessionId(),
            ts: Date.now(),
            page_url: pageInfo.page_url || window.location.href,
            page_title: pageInfo.page_title || document.title || 'Homepage',
            referrer: pageInfo.referrer,
            utm_source: pageInfo.utm_source,
            utm_medium: pageInfo.utm_medium,
            utm_campaign: pageInfo.utm_campaign,
            utm_content: pageInfo.utm_content,
            utm_term: pageInfo.utm_term,
            viewport_width: pageInfo.viewport_width,
            viewport_height: pageInfo.viewport_height,
            screen_width: pageInfo.screen_width,
            screen_height: pageInfo.screen_height,
            timezone: pageInfo.timezone,
            language: pageInfo.language
        };

        const success = await this.sendData(eventData);

        if (success) {
            this.hasTrackedPageView = true;
            if (this.config.debug) {
                console.log('📊 Analytics: Page view tracked successfully');
            }
        }

        return success;
    }

    /**
     * Send custom event (without creating a page view)
     */
    async sendEvent(eventData: Partial<AnalyticsEvent>): Promise<boolean> {
        if (!this.config.enabled) {
            return false;
        }

        // Create custom event data - FIXED: Use proper format for dashboard API
        const customEventData = {
            sessionId: this.getSessionId(),
            ts: Date.now(),
            event_type: eventData.event || 'custom_event',
            event: eventData.event || 'custom_event', // Add event field for backend processing
            properties: eventData.properties || {},
            // Don't include page_url for custom events to distinguish from page views
            ...eventData
        };

        if (this.config.debug) {
            console.log('📊 Analytics: Sending custom event:', customEventData);
        }

        return await this.sendData(customEventData);
    }

    /**
     * Track external link clicks
     */
    trackLinkClick(url: string, linkText?: string): void {
        if (!this.config.enabled) return;

        try {
            const linkUrl = new URL(url, window.location.href);
            const currentHost = window.location.hostname;
            
            // Only track external links
            if (linkUrl.hostname !== currentHost) {
                this.sendEvent({
                    page_url: `${window.location.href}#link-click`,
                    page_title: `Link Click: ${linkText || url}`,
                    referrer: window.location.href
                });
            }
        } catch (error) {
            if (this.config.debug) {
                console.error('📊 Link tracking error:', error);
            }
        }
    }

    /**
     * Get beacon configuration
     */
    getConfig(): BeaconConfig {
        return { ...this.config };
    }

    /**
     * Check if tracking is enabled
     */
    isEnabled(): boolean {
        return this.config.enabled;
    }

    /**
     * Grant GDPR consent and start tracking
     */
    public grantGDPRConsent(): void {
        localStorage.setItem('analytics_gdpr_consent', 'granted');
        console.log('📊 Analytics: GDPR consent granted');

        // Send any queued page view
        this.sendPageView();
    }

    /**
     * Revoke GDPR consent and stop tracking
     */
    public revokeGDPRConsent(): void {
        localStorage.setItem('analytics_gdpr_consent', 'denied');
        console.log('📊 Analytics: GDPR consent revoked');

        // Clear any stored session data
        this.clearSessionData();
    }

    /**
     * Clear session data
     */
    private clearSessionData(): void {
        localStorage.removeItem('analytics_session_id');
        localStorage.removeItem('analytics_session_start');
        this.sessionId = null;
    }
}

// Global analytics instance
let globalAnalyticsInstance: AnalyticsBeacon | null = null;

/**
 * Initialize analytics with configuration
 * This replaces the old window.initializeAnalytics function
 */
export function initializeAnalytics(config: AnalyticsConfig = {}): AnalyticsBeacon {
    if (!globalAnalyticsInstance) {
        globalAnalyticsInstance = new AnalyticsBeacon(config);

        // Make available globally for compatibility
        (window as any).analyticsBeacon = globalAnalyticsInstance;
        (window as any).getAnalyticsTracker = () => globalAnalyticsInstance;

        // Auto-track initial page view only once
        if (config.enableRealTime !== false) {
            // Use setTimeout to ensure DOM is ready and prevent multiple calls
            setTimeout(() => {
                globalAnalyticsInstance?.sendPageView();
            }, 100);
        }

        if (config.debug) {
            console.log('📊 Analytics: Global instance initialized');
        }
    } else if (config.debug) {
        console.log('📊 Analytics: Using existing global instance');
    }

    return globalAnalyticsInstance;
}

/**
 * Get the global analytics instance
 */
export function getAnalyticsInstance(): AnalyticsBeacon | null {
    return globalAnalyticsInstance;
}

/**
 * Track page view (global function)
 */
export function trackPageView(pageData?: Partial<AnalyticsEvent>): void {
    if (globalAnalyticsInstance) {
        globalAnalyticsInstance.sendPageView();
    }
}

/**
 * Track custom event (global function)
 */
export function trackEvent(eventData: Partial<AnalyticsEvent>): void {
    if (globalAnalyticsInstance) {
        globalAnalyticsInstance.sendEvent(eventData);
    }
}

// Note: Use initializeAnalytics() instead of creating direct instances
// to prevent multiple analytics instances

// Export class for testing
export { AnalyticsBeacon };

// Export types
export type { AnalyticsEvent, BeaconConfig };
