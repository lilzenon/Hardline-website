// TypeScript declarations for analytics tracking

interface AnalyticsConfig {
  apiEndpoint: string
  trackingId: string
  enableGDPR: boolean
  enableRealTime: boolean
  sessionTimeout: number
}

interface PageViewEvent {
  page: string
  title: string
  referrer?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

interface AnalyticsTracker {
  trackPageView(pageData: PageViewEvent): Promise<void>
  trackEvent(eventName: string, properties?: Record<string, any>): Promise<void>
  grantGDPRConsent(): void
  revokeGDPRConsent(): void
  setUserId(userId: string): void
  getSession(): any
}

declare global {
  interface Window {
    analyticsTracker: AnalyticsTracker | null
    initializeAnalytics: (config: AnalyticsConfig) => AnalyticsTracker
    getAnalyticsTracker: () => AnalyticsTracker | null
    gdprConsent: any
  }
}

export {}
