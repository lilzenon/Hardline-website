/**
 * Analytics Beacon for BOUNCE2BOUNCE Homepage
 * Sends pageview data to dashboard API using sendBeacon/fetch
 * ENV CONTRACT compliant implementation
 */

interface AnalyticsEvent {
    ts?: number;
    page_url: string;
    page_title?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    viewport_width?: number;
    viewport_height?: number;
    screen_width?: number;
    screen_height?: number;
    timezone?: string;
    language?: string;
}

interface BeaconConfig {
    endpoint: string;
    enabled: boolean;
    debug: boolean;
}

class AnalyticsBeacon {
    private config: BeaconConfig;
    private hasTrackedPageView = false;

    constructor() {
        // Get configuration from environment
        const dashboardUrl = import.meta.env.VITE_DASHBOARD_API_URL || 
                           process.env.DASHBOARD_API_URL || 
                           'http://localhost:3000';
        
        const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT || 
                        process.env.ANALYTICS_ENDPOINT || 
                        '/a/pv';

        this.config = {
            endpoint: `${dashboardUrl}${endpoint}`,
            enabled: this.shouldTrack(),
            debug: import.meta.env.DEV || process.env.NODE_ENV === 'development'
        };

        if (this.config.debug) {
            console.log('📊 Analytics beacon initialized:', this.config);
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
            return false; // Only track once per page load
        }

        const pageInfo = this.getPageInfo();
        const success = await this.sendData(pageInfo);
        
        if (success) {
            this.hasTrackedPageView = true;
        }
        
        return success;
    }

    /**
     * Send custom event
     */
    async sendEvent(eventData: Partial<AnalyticsEvent>): Promise<boolean> {
        const pageInfo = this.getPageInfo();
        const combinedData = { ...pageInfo, ...eventData };
        
        return await this.sendData(combinedData);
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
}

// Export singleton instance
export const analyticsBeacon = new AnalyticsBeacon();

// Export class for testing
export { AnalyticsBeacon };

// Export types
export type { AnalyticsEvent, BeaconConfig };
