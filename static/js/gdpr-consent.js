// GDPR Consent Management for Homepage
// Vanilla JavaScript implementation

class GDPRConsent {
  constructor() {
    this.showBanner = false
    this.showDetails = false
    this.init()
  }

  init() {
    // Check if consent has already been given or denied
    const consent = localStorage.getItem('analytics_gdpr_consent')
    if (!consent) {
      this.showBanner = true
      this.createConsentBanner()
    }
  }

  createConsentBanner() {
    // Create banner HTML
    const bannerHTML = `
      <div id="gdpr-consent-banner" style="
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        padding: 16px;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      ">
        <div style="max-width: 1200px; margin: 0 auto;">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M3 12h6m6 0h6"/>
                </svg>
                <h3 style="color: white; font-weight: 600; margin: 0; font-size: 16px;">Privacy & Analytics</h3>
              </div>
              <p style="color: #D1D5DB; font-size: 14px; line-height: 1.5; margin: 0;">
                We use analytics to improve your experience and understand how our platform is used. 
                This includes tracking page views, user interactions, and performance metrics. 
                Your data is processed securely and never shared with third parties.
              </p>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
              <button id="gdpr-customize" style="
                padding: 8px 16px;
                font-size: 14px;
                color: #D1D5DB;
                background: transparent;
                border: none;
                cursor: pointer;
                transition: color 0.2s;
              ">
                Customize
              </button>
              <button id="gdpr-decline" style="
                padding: 8px 16px;
                font-size: 14px;
                border: 1px solid #6B7280;
                color: #D1D5DB;
                background: transparent;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
              ">
                Decline
              </button>
              <button id="gdpr-accept" style="
                padding: 8px 24px;
                font-size: 14px;
                background: #2563EB;
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: background-color 0.2s;
              ">
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    `

    // Add banner to page
    document.body.insertAdjacentHTML('beforeend', bannerHTML)

    // Add event listeners
    document.getElementById('gdpr-accept').addEventListener('click', () => this.handleAccept())
    document.getElementById('gdpr-decline').addEventListener('click', () => this.handleDecline())
    document.getElementById('gdpr-customize').addEventListener('click', () => this.handleCustomize())

    // Add hover effects
    this.addHoverEffects()
  }

  addHoverEffects() {
    const customizeBtn = document.getElementById('gdpr-customize')
    const declineBtn = document.getElementById('gdpr-decline')
    const acceptBtn = document.getElementById('gdpr-accept')

    customizeBtn.addEventListener('mouseenter', () => {
      customizeBtn.style.color = 'white'
    })
    customizeBtn.addEventListener('mouseleave', () => {
      customizeBtn.style.color = '#D1D5DB'
    })

    declineBtn.addEventListener('mouseenter', () => {
      declineBtn.style.color = 'white'
      declineBtn.style.borderColor = '#9CA3AF'
    })
    declineBtn.addEventListener('mouseleave', () => {
      declineBtn.style.color = '#D1D5DB'
      declineBtn.style.borderColor = '#6B7280'
    })

    acceptBtn.addEventListener('mouseenter', () => {
      acceptBtn.style.backgroundColor = '#1D4ED8'
    })
    acceptBtn.addEventListener('mouseleave', () => {
      acceptBtn.style.backgroundColor = '#2563EB'
    })
  }

  handleAccept() {
    const tracker = window.getAnalyticsTracker()
    if (tracker) {
      tracker.grantGDPRConsent()
    }
    this.removeBanner()
  }

  handleDecline() {
    localStorage.setItem('analytics_gdpr_consent', 'denied')
    this.removeBanner()
  }

  handleCustomize() {
    this.createDetailedModal()
  }

  removeBanner() {
    const banner = document.getElementById('gdpr-consent-banner')
    if (banner) {
      banner.remove()
    }
  }

  createDetailedModal() {
    const modalHTML = `
      <div id="gdpr-modal" style="
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      ">
        <div style="
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
        " id="modal-backdrop"></div>
        
        <div style="
          position: relative;
          width: 100%;
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          border-radius: 16px;
          padding: 24px;
          background: rgba(22, 22, 22, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        ">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
            <h2 style="color: white; font-size: 20px; font-weight: 600; margin: 0;">Privacy Settings</h2>
            <button id="modal-close" style="
              padding: 8px;
              color: #9CA3AF;
              background: transparent;
              border: none;
              cursor: pointer;
              transition: color 0.2s;
            ">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div style="space-y: 24px;">
            <!-- Essential Analytics -->
            <div style="margin-bottom: 24px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <h3 style="color: white; font-weight: 500; margin: 0;">Essential Analytics</h3>
                <span style="
                  padding: 2px 8px;
                  font-size: 12px;
                  background: rgba(16, 185, 129, 0.2);
                  color: #10B981;
                  border-radius: 4px;
                ">Required</span>
              </div>
              <p style="color: #D1D5DB; font-size: 14px; margin: 0;">
                Basic functionality tracking including page loads, errors, and performance metrics. 
                This data helps us ensure the platform works properly and identify technical issues.
              </p>
            </div>

            <!-- Usage Analytics -->
            <div style="margin-bottom: 24px;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <h3 style="color: white; font-weight: 500; margin: 0;">Usage Analytics</h3>
                <label style="position: relative; display: inline-flex; align-items: center; cursor: pointer;">
                  <input type="checkbox" id="usage-toggle" checked style="display: none;">
                  <div id="usage-switch" style="
                    width: 44px;
                    height: 24px;
                    background: #3B82F6;
                    border-radius: 12px;
                    position: relative;
                    transition: background-color 0.2s;
                  ">
                    <div style="
                      position: absolute;
                      top: 2px;
                      left: 20px;
                      width: 20px;
                      height: 20px;
                      background: white;
                      border-radius: 50%;
                      transition: transform 0.2s;
                    "></div>
                  </div>
                </label>
              </div>
              <p style="color: #D1D5DB; font-size: 14px; margin: 0;">
                Track how you interact with different features, which pages you visit, and how long you spend on each section. 
                This helps us improve the user experience and prioritize new features.
              </p>
            </div>

            <!-- Data Retention -->
            <div style="
              padding: 16px;
              border-radius: 8px;
              background: rgba(255, 255, 255, 0.05);
              margin-bottom: 24px;
            ">
              <h4 style="color: white; font-weight: 500; margin: 0 0 8px 0;">Data Retention</h4>
              <ul style="color: #D1D5DB; font-size: 14px; margin: 0; padding-left: 16px;">
                <li>Session data: 30 days</li>
                <li>Usage analytics: 12 months</li>
                <li>Performance metrics: 6 months</li>
                <li>Error logs: 3 months</li>
              </ul>
            </div>
          </div>

          <div style="display: flex; gap: 12px; margin-top: 32px;">
            <button id="modal-decline" style="
              flex: 1;
              padding: 12px 16px;
              border: 1px solid #6B7280;
              color: #D1D5DB;
              background: transparent;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.2s;
            ">
              Decline All
            </button>
            <button id="modal-accept" style="
              flex: 1;
              padding: 12px 16px;
              background: #2563EB;
              color: white;
              border: none;
              border-radius: 8px;
              cursor: pointer;
              font-weight: 500;
              transition: background-color 0.2s;
            ">
              Accept Selected
            </button>
          </div>
        </div>
      </div>
    `

    document.body.insertAdjacentHTML('beforeend', modalHTML)

    // Add event listeners
    document.getElementById('modal-close').addEventListener('click', () => this.closeModal())
    document.getElementById('modal-backdrop').addEventListener('click', () => this.closeModal())
    document.getElementById('modal-decline').addEventListener('click', () => {
      this.handleDecline()
      this.closeModal()
    })
    document.getElementById('modal-accept').addEventListener('click', () => {
      this.handleAccept()
      this.closeModal()
    })

    // Add hover effects for modal buttons
    this.addModalHoverEffects()
  }

  addModalHoverEffects() {
    const closeBtn = document.getElementById('modal-close')
    const declineBtn = document.getElementById('modal-decline')
    const acceptBtn = document.getElementById('modal-accept')

    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.color = 'white'
    })
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.color = '#9CA3AF'
    })

    declineBtn.addEventListener('mouseenter', () => {
      declineBtn.style.color = 'white'
      declineBtn.style.borderColor = '#9CA3AF'
    })
    declineBtn.addEventListener('mouseleave', () => {
      declineBtn.style.color = '#D1D5DB'
      declineBtn.style.borderColor = '#6B7280'
    })

    acceptBtn.addEventListener('mouseenter', () => {
      acceptBtn.style.backgroundColor = '#1D4ED8'
    })
    acceptBtn.addEventListener('mouseleave', () => {
      acceptBtn.style.backgroundColor = '#2563EB'
    })
  }

  closeModal() {
    const modal = document.getElementById('gdpr-modal')
    if (modal) {
      modal.remove()
    }
  }
}

// Initialize GDPR consent when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.gdprConsent = new GDPRConsent()
  })
} else {
  window.gdprConsent = new GDPRConsent()
}
