// Universal Analytics Tracking Library for Homepage
// Lightweight vanilla JavaScript version for the main kutt application

class AnalyticsTracker {
    constructor(config) {
        this.config = {
            apiEndpoint: config.apiEndpoint || '/api',
            trackingId: config.trackingId || 'kutt-homepage',
            enableGDPR: config.enableGDPR !== false,
            enableRealTime: config.enableRealTime !== false,
            sessionTimeout: config.sessionTimeout || 30 // minutes
        }

        this.session = null
        this.eventQueue = []
        this.isInitialized = false
        this.consentGiven = false
        this.heartbeatInterval = null

        this.initializeTracker()
    }

    // Initialize the tracker
    async initializeTracker() {
        try {
            // Check GDPR consent if enabled
            if (this.config.enableGDPR) {
                this.consentGiven = this.checkGDPRConsent()
                if (!this.consentGiven) {
                    console.log('📊 Analytics: Waiting for GDPR consent')
                    return
                }
            } else {
                this.consentGiven = true
            }

            // Initialize session
            await this.initializeSession()

            // Start heartbeat for real-time tracking
            if (this.config.enableRealTime) {
                this.startHeartbeat()
            }

            // Track initial page view with current page data
            await this.trackPageView({
                page_url: window.location.href,
                page_title: document.title,
                referrer: document.referrer
            })

            // Process any queued events
            this.processEventQueue()

            this.isInitialized = true
            console.log('📊 Analytics: Tracker initialized successfully')
        } catch (error) {
            console.error('📊 Analytics: Failed to initialize tracker:', error)
        }
    }

    // Initialize or restore session
    async initializeSession() {
        const existingSessionId = localStorage.getItem('analytics_session_id')
        const sessionExpiry = localStorage.getItem('analytics_session_expiry')

        const now = Date.now()
        const isSessionValid = existingSessionId && sessionExpiry && now < parseInt(sessionExpiry)

        if (isSessionValid) {
            // Restore existing session
            this.session = {
                sessionId: existingSessionId,
                userId: localStorage.getItem('analytics_user_id') || undefined,
                startTime: parseInt(localStorage.getItem('analytics_session_start') || '0'),
                lastActivity: now,
                pageViews: parseInt(localStorage.getItem('analytics_page_views') || '0'),
                events: [],
                deviceInfo: await this.getDeviceInfo(),
                locationInfo: await this.getLocationInfo()
            }
        } else {
            // Create new session
            const sessionId = this.generateSessionId()
            this.session = {
                sessionId,
                userId: localStorage.getItem('analytics_user_id') || undefined,
                startTime: now,
                lastActivity: now,
                pageViews: 0,
                events: [],
                deviceInfo: await this.getDeviceInfo(),
                locationInfo: await this.getLocationInfo()
            }

            // Store session data
            localStorage.setItem('analytics_session_id', sessionId)
            localStorage.setItem('analytics_session_start', now.toString())
        }

        // Update session expiry
        const expiryTime = now + (this.config.sessionTimeout * 60 * 1000)
        localStorage.setItem('analytics_session_expiry', expiryTime.toString())
        localStorage.setItem('analytics_page_views', this.session.pageViews.toString())
    }

    // Generate unique session ID
    generateSessionId() {
        return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    }

    // Get device information
    async getDeviceInfo() {
        const userAgent = navigator.userAgent

        return {
            userAgent,
            deviceType: this.getDeviceType(userAgent),
            browserName: this.getBrowserName(userAgent),
            browserVersion: this.getBrowserVersion(userAgent),
            osName: this.getOSName(userAgent),
            osVersion: this.getOSVersion(userAgent),
            screenResolution: `${screen.width}x${screen.height}`,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }
    }

    // Get location information (using IP geolocation)
    async getLocationInfo() {
        try {
            // Use a free IP geolocation service
            const response = await fetch('https://ipapi.co/json/')
            if (response.ok) {
                const data = await response.json()
                return {
                    countryCode: data.country_code,
                    countryName: data.country_name,
                    city: data.city,
                    region: data.region,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    ipAddress: data.ip
                }
            }
        } catch (error) {
            console.warn('📊 Analytics: Failed to get location info:', error)
        }

        return {}
    }

    // Device type detection
    getDeviceType(userAgent) {
        if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet'
        if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile'
        return 'desktop'
    }

    // Browser detection
    getBrowserName(userAgent) {
        if (userAgent.includes('Chrome')) return 'Chrome'
        if (userAgent.includes('Firefox')) return 'Firefox'
        if (userAgent.includes('Safari')) return 'Safari'
        if (userAgent.includes('Edge')) return 'Edge'
        if (userAgent.includes('Opera')) return 'Opera'
        return 'Unknown'
    }

    getBrowserVersion(userAgent) {
        const match = userAgent.match(/(chrome|firefox|safari|edge|opera)\/(\d+)/i)
        return match ? match[2] : 'Unknown'
    }

    // OS detection
    getOSName(userAgent) {
        if (userAgent.includes('Windows')) return 'Windows'
        if (userAgent.includes('Mac')) return 'macOS'
        if (userAgent.includes('Linux')) return 'Linux'
        if (userAgent.includes('Android')) return 'Android'
        if (userAgent.includes('iOS')) return 'iOS'
        return 'Unknown'
    }

    getOSVersion(userAgent) {
        // Simplified OS version detection
        const windowsMatch = userAgent.match(/Windows NT (\d+\.\d+)/)
        if (windowsMatch) return windowsMatch[1]

        const macMatch = userAgent.match(/Mac OS X (\d+[._]\d+[._]\d+)/)
        if (macMatch) return macMatch[1].replace(/_/g, '.')

        return 'Unknown'
    }

    // Check GDPR consent
    checkGDPRConsent() {
        const consent = localStorage.getItem('analytics_gdpr_consent')
        return consent === 'granted'
    }

    // Grant GDPR consent
    grantGDPRConsent() {
        localStorage.setItem('analytics_gdpr_consent', 'granted')
        this.consentGiven = true
        if (!this.isInitialized) {
            this.initializeTracker()
        }
    }

    // Revoke GDPR consent
    revokeGDPRConsent() {
        localStorage.setItem('analytics_gdpr_consent', 'revoked')
        this.consentGiven = false
        this.clearAllData()
    }

    // Clear all tracking data
    clearAllData() {
        localStorage.removeItem('analytics_session_id')
        localStorage.removeItem('analytics_session_expiry')
        localStorage.removeItem('analytics_session_start')
        localStorage.removeItem('analytics_page_views')
        localStorage.removeItem('analytics_user_id')
        this.session = null
        this.eventQueue = []
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval)
            this.heartbeatInterval = null
        }
    }

    // Start heartbeat for real-time tracking
    startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
                if (this.session) {
                    this.session.lastActivity = Date.now()
                    this.sendHeartbeat()
                }
            }, 30000) // Send heartbeat every 30 seconds
    }

    // Send heartbeat to server
    async sendHeartbeat() {
        if (!this.session) return

        try {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: this.session.sessionId,
                    timestamp: Date.now(),
                    pageViews: this.session.pageViews
                })
            };

            // Add credentials for cross-domain requests
            if (this.config.apiEndpoint.includes('admin.b2b.click')) {
                fetchOptions.credentials = 'include';
            }

            await fetch(`${this.config.apiEndpoint}/analytics/heartbeat`, fetchOptions)
        } catch (error) {
            console.warn('📊 Analytics: Failed to send heartbeat:', error)
        }
    }

    // Track page view
    async trackPageView(pageData) {
        if (!this.consentGiven) {
            this.eventQueue.push({ event: 'page_view', properties: pageData })
            return
        }

        if (!this.session) {
            await this.initializeSession()
        }

        if (this.session) {
            this.session.pageViews++
                this.session.lastActivity = Date.now()
            localStorage.setItem('analytics_page_views', this.session.pageViews.toString())
        }

        const event = {
            event: 'page_view',
            properties: {
                ...pageData,
                sessionId: this.session ? .sessionId,
                deviceInfo: this.session ? .deviceInfo,
                locationInfo: this.session ? .locationInfo
            },
            timestamp: Date.now(),
            sessionId: this.session ? .sessionId,
            userId: this.session ? .userId
        }

        await this.sendEvent(event)
    }

    // Track custom event
    async trackEvent(eventName, properties) {
        if (!this.consentGiven) {
            this.eventQueue.push({ event: eventName, properties })
            return
        }

        const event = {
            event: eventName,
            properties: {
                ...properties,
                sessionId: this.session ? .sessionId
            },
            timestamp: Date.now(),
            sessionId: this.session ? .sessionId,
            userId: this.session ? .userId
        }

        await this.sendEvent(event)
    }

    // Send event to server
    async sendEvent(event) {
        try {
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            };

            // Add credentials for cross-domain requests
            if (this.config.apiEndpoint.includes('admin.b2b.click')) {
                fetchOptions.credentials = 'include';
            }

            await fetch(`${this.config.apiEndpoint}/analytics/track`, fetchOptions)
        } catch (error) {
            console.warn('📊 Analytics: Failed to send event:', error)
                // Add to queue for retry
            this.eventQueue.push(event)
        }
    }

    // Process queued events
    async processEventQueue() {
        if (!this.consentGiven || this.eventQueue.length === 0) return

        const events = [...this.eventQueue]
        this.eventQueue = []

        for (const event of events) {
            await this.sendEvent(event)
        }
    }

    // Set user ID
    setUserId(userId) {
        if (this.session) {
            this.session.userId = userId
        }
        localStorage.setItem('analytics_user_id', userId)
    }

    // Get current session
    getSession() {
        return this.session
    }
}

// Global analytics instance
window.analyticsTracker = null

// Initialize analytics
window.initializeAnalytics = function(config) {
    if (!window.analyticsTracker) {
        window.analyticsTracker = new AnalyticsTracker(config)
    }
    return window.analyticsTracker
}

// Get analytics tracker
window.getAnalyticsTracker = function() {
    return window.analyticsTracker
}