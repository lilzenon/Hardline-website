/**
 * 🎫 CHECKOUT NAVIGATION COMPONENT
 *
 * JavaScript functionality for the ticket purchasing navigation
 * Handles modal overlay, iframe loading, and accessibility
 */

class CheckoutNav {
    constructor() {
        this.container = null;
        this.nav = null;
        this.buyButton = null;
        this.modal = null;
        this.closeButton = null;
        this.iframe = null;
        this.isModalOpen = false;

        this.init();
    }

    init() {
        // Find checkout nav elements
        this.container = document.querySelector('.checkout-nav-container');
        this.nav = document.querySelector('.checkout-nav');
        this.buyButton = document.querySelector('.buy-button');
        this.modal = document.querySelector('.checkout-modal');
        this.closeButton = document.querySelector('.checkout-close');
        this.iframe = document.querySelector('.checkout-iframe');

        if (!this.container || !this.nav || !this.buyButton || !this.modal) {
            console.log('🎫 Checkout nav elements not found - component not initialized');
            return;
        }

        this.setupEventListeners();
        console.log('🎫 Checkout nav initialized successfully');
    }

    setupEventListeners() {
        // Buy button click handler
        this.buyButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleBuyClick();
        });

        // Close button click handler (if exists)
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        }

        // Keyboard navigation
        this.buyButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleBuyClick();
            }
        });

        if (this.closeButton) {
            this.closeButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.closeModal();
                }
            });
        }

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isModalOpen) {
                this.closeModal();
            }
        });

        // Click outside modal to close
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
    }

    handleBuyClick() {
        // Add click animation
        this.buyButton.classList.add('clicking');
        setTimeout(() => {
            this.buyButton.classList.remove('clicking');
        }, 200);

        // Haptic feedback on supported devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        this.openModal();
    }

    openModal() {
        if (this.isModalOpen) return;

        console.log('🎫 Opening checkout modal');
        console.log('🎫 Modal element:', this.modal);
        console.log('🎫 Iframe element:', this.iframe);

        this.isModalOpen = true;

        // Show modal first
        if (this.modal) {
            this.modal.classList.add('active');
            console.log('🎫 Modal active class added');
        } else {
            console.error('🎫 Modal element not found!');
            return;
        }

        // Load iframe if not already loaded with ticket URL
        if (this.iframe && (this.iframe.src === 'about:blank' || !this.iframe.src)) {
            console.log('🎫 Loading iframe...');
            this.loadIframe();
        } else {
            console.log('🎫 Iframe not loaded - no URL or iframe element');
        }

        // Focus management
        setTimeout(() => {
            if (this.closeButton) {
                this.closeButton.focus();
            }
        }, 100);
    }

    closeModal() {
        if (!this.isModalOpen) return;

        console.log('🎫 Closing checkout modal');
        this.isModalOpen = false;

        // Clean up dynamic sizing listeners
        this.cleanupDynamicSizing();

        // Hide modal
        this.modal.classList.remove('active');

        // Clear iframe and reset styles
        if (this.iframe) {
            this.iframe.src = 'about:blank';
            this.iframe.style.height = '';
            this.iframe.style.transition = '';
        }

        // Reset modal content styles
        const modalContent = this.modal && this.modal.querySelector('.checkout-modal-content');
        if (modalContent) {
            modalContent.style.maxHeight = '';
            modalContent.style.transition = '';
        }

        // Return focus to buy button
        setTimeout(() => {
            this.buyButton.focus();
        }, 100);
    }

    cleanupDynamicSizing() {
        // Remove message listener
        if (this.messageListener) {
            window.removeEventListener('message', this.messageListener);
            this.messageListener = null;
        }

        // Disconnect ResizeObserver
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }

        // Clear resize timeout
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = null;
        }

        // Clear height polling interval
        if (this.heightPollingInterval) {
            clearInterval(this.heightPollingInterval);
            this.heightPollingInterval = null;
        }

        // Clear continuous monitoring interval
        if (this.continuousMonitorInterval) {
            clearInterval(this.continuousMonitorInterval);
            this.continuousMonitorInterval = null;
        }

        // Clear resize observer
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
    }

    loadIframe() {
        if (!this.iframe) return;

        const ticketUrl = this.iframe.dataset.ticketUrl;
        if (!ticketUrl) {
            console.warn('🎫 No ticket URL found for iframe');
            return;
        }

        console.log('🎫 Loading ticket iframe:', ticketUrl);

        // Add loading class
        this.iframe.classList.add('loading');

        // Set iframe source with dynamic sizing parameters
        const urlWithParams = this.addDynamicSizingParams(ticketUrl);
        this.iframe.src = urlWithParams;

        // Handle iframe load
        this.iframe.addEventListener('load', () => {
            console.log('🎫 Ticket iframe loaded successfully');
            this.iframe.classList.remove('loading');

            // Initialize dynamic sizing with delay for content to render
            setTimeout(() => {
                this.initializeDynamicSizing();
            }, 100);

            // Additional attempts for slow-loading content
            setTimeout(() => {
                this.adjustIframeHeight();
            }, 1000);

            setTimeout(() => {
                this.adjustIframeHeight();
            }, 3000);
        }, { once: true });

        // Handle iframe error
        this.iframe.addEventListener('error', () => {
            console.error('🎫 Failed to load ticket iframe');
            this.iframe.classList.remove('loading');
        }, { once: true });
    }

    addDynamicSizingParams(url) {
        try {
            const urlObj = new URL(url);

            // Check if this is a Posh embed - they don't support URL parameters
            if (urlObj.hostname.includes('posh.vip') || urlObj.hostname.includes('posh.')) {
                console.log('🎫 Posh embed detected - not adding URL parameters');
                return url; // Return original URL without modifications
            }

            // Add parameters for other embed providers that might support them
            urlObj.searchParams.set('responsive', 'true');
            urlObj.searchParams.set('autosize', 'true');
            console.log('🎫 Added dynamic sizing parameters to URL');
            return urlObj.toString();
        } catch (error) {
            console.warn('🎫 Could not parse URL for dynamic sizing params:', error);
            return url;
        }
    }

    initializeDynamicSizing() {
        if (!this.iframe) return;

        console.log('🎫 Initializing dynamic sizing for iframe');

        // Set up message listener for iframe height changes
        this.messageListener = (event) => {
            this.handleIframeMessage(event);
        };

        window.addEventListener('message', this.messageListener);

        // Set up periodic height checking for cross-origin iframes
        this.startHeightPolling();

        // Set up continuous monitoring for iframe changes
        this.startContinuousMonitoring();

        // Initial size adjustment with multiple attempts
        setTimeout(() => this.adjustIframeHeight(), 100);
        setTimeout(() => this.adjustIframeHeight(), 500);
        setTimeout(() => this.adjustIframeHeight(), 1000);
        setTimeout(() => this.adjustIframeHeight(), 2000);
        setTimeout(() => this.adjustIframeHeight(), 5000);
    }

    startHeightPolling() {
        // More aggressive polling for better height detection
        let pollCount = 0;
        const maxPolls = 120; // 60 seconds total

        this.heightPollingInterval = setInterval(() => {
            pollCount++;

            if (this.iframe && this.iframe.contentWindow) {
                // Try direct height detection first
                this.adjustIframeHeight();

                // Also request height via postMessage
                try {
                    this.iframe.contentWindow.postMessage({
                        type: 'getHeight',
                        source: 'checkout-nav'
                    }, '*');
                } catch (error) {
                    // Ignore postMessage errors for cross-origin
                }
            }

            // Stop polling after max attempts
            if (pollCount >= maxPolls) {
                clearInterval(this.heightPollingInterval);
                this.heightPollingInterval = null;
                console.log('🎫 Height polling stopped after', pollCount, 'attempts');
            }
        }, 500);
    }

    startContinuousMonitoring() {
        // Monitor iframe for any visual changes that might indicate content loaded
        let lastHeight = 0;
        let checkCount = 0;
        const maxChecks = 240; // 2 minutes of checking

        this.continuousMonitorInterval = setInterval(() => {
            checkCount++;

            if (checkCount > maxChecks) {
                clearInterval(this.continuousMonitorInterval);
                console.log('🎫 Continuous monitoring stopped after 2 minutes');
                return;
            }

            if (this.iframe) {
                // Check if iframe dimensions changed
                const currentHeight = this.iframe.offsetHeight;
                const currentWidth = this.iframe.offsetWidth;

                if (currentHeight !== lastHeight && currentHeight > 0) {
                    console.log('🎫 Iframe height changed:', lastHeight, '→', currentHeight);
                    lastHeight = currentHeight;

                    // Try to detect content height when iframe changes
                    setTimeout(() => this.detectContentHeight(), 100);
                }

                // Also try to detect if content is loaded by checking iframe properties
                try {
                    if (this.iframe.contentWindow && this.iframe.contentWindow.location.href !== 'about:blank') {
                        // Content seems to be loaded, try height detection
                        this.detectContentHeight();
                    }
                } catch (error) {
                    // Cross-origin, but that's expected
                }
            }
        }, 500);
    }

    handleIframeMessage(event) {
        // Handle messages from Posh iframe for dynamic sizing
        if (!this.iframe || !event.data) return;

        console.log('🎫 Received message from iframe:', {
            origin: event.origin,
            data: event.data,
            type: typeof event.data
        });

        try {
            let data = event.data;

            // Parse JSON if it's a string
            if (typeof data === 'string') {
                // Check for common height patterns in strings
                const heightMatch = data.match(/height[:\s]*(\d+)/i);
                if (heightMatch) {
                    const height = parseInt(heightMatch[1]);
                    console.log('🎫 Extracted height from string pattern:', height);
                    this.setIframeHeight(height);
                    return;
                }

                try {
                    data = JSON.parse(data);
                } catch (e) {
                    // Not JSON, might be a simple height value
                    const height = parseInt(data);
                    if (!isNaN(height) && height > 0) {
                        console.log('🎫 Received height as string:', height);
                        this.setIframeHeight(height);
                        return;
                    }
                }
            }

            // Handle various message formats
            if (data && typeof data === 'object') {
                let height = null;

                // Check all possible height properties
                const heightProps = [
                    'height', 'contentHeight', 'documentHeight', 'scrollHeight',
                    'offsetHeight', 'clientHeight', 'frameHeight', 'bodyHeight'
                ];

                for (const prop of heightProps) {
                    if (data[prop] && typeof data[prop] === 'number' && data[prop] > 0) {
                        height = data[prop];
                        console.log(`🎫 Found height in property '${prop}':`, height);
                        break;
                    }
                }

                // Check message types
                if (!height) {
                    if (data.type === 'resize' && data.height) {
                        height = data.height;
                    } else if (data.type === 'posh-resize' && data.height) {
                        height = data.height;
                    }
                    // Generic height message
                    else if (data.height) {
                        height = data.height;
                    }
                    // Document height message
                    else if (data.documentHeight) {
                        height = data.documentHeight;
                    }
                    // Content height message
                    else if (data.contentHeight) {
                        height = data.contentHeight;
                    }

                    if (height && height > 0) {
                        console.log('🎫 Received iframe height message:', height);
                        this.setIframeHeight(height);
                    }
                }
            }
        } catch (error) {
            console.log('🎫 Error parsing iframe message:', error);
        }
    }

    handleIframeResize(entries) {
        // Handle ResizeObserver changes
        for (const entry of entries) {
            if (entry.target === this.iframe) {
                // Debounce resize handling
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.adjustIframeHeight();
                }, 150);
            }
        }
    }

    adjustIframeHeight() {
        if (!this.iframe) return;

        console.log('🎫 Attempting to adjust iframe height');
        console.log('🎫 Current iframe height:', this.iframe.style.height || 'default');
        console.log('🎫 Iframe src:', this.iframe.src);

        // Method 1: Try direct access (same-origin)
        let heightDetected = false;
        try {
            const iframeDoc = this.iframe.contentDocument || (this.iframe.contentWindow && this.iframe.contentWindow.document);
            if (iframeDoc && iframeDoc.body) {
                const body = iframeDoc.body;
                const html = iframeDoc.documentElement;

                if (body && html) {
                    // Get various height measurements
                    const heights = [
                        body.scrollHeight || 0,
                        body.offsetHeight || 0,
                        html.clientHeight || 0,
                        html.scrollHeight || 0,
                        html.offsetHeight || 0
                    ];

                    const contentHeight = Math.max(...heights);

                    console.log('🎫 Direct access - height measurements:', heights);
                    console.log('🎫 Direct access - max content height:', contentHeight);

                    if (contentHeight > 100) {
                        this.setIframeHeight(contentHeight);
                        heightDetected = true;
                    }
                }
            }
        } catch (error) {
            console.log('🎫 Cross-origin iframe detected:', error.message);
        }

        // Method 2: Use iframe's natural scrollHeight if accessible
        if (!heightDetected) {
            try {
                if (this.iframe.contentDocument) {
                    const scrollHeight = this.iframe.contentDocument.documentElement.scrollHeight;
                    console.log('🎫 Iframe scrollHeight:', scrollHeight);
                    if (scrollHeight > 100) {
                        this.setIframeHeight(scrollHeight);
                        heightDetected = true;
                    }
                }
            } catch (error) {
                console.log('🎫 ScrollHeight access failed:', error.message);
            }
        }

        // Method 3: Estimate height based on content type (Posh embed)
        if (!heightDetected) {
            const src = this.iframe.src;
            if (src && src.includes('posh')) {
                // Posh embeds typically need more height for ticket options
                const estimatedHeight = 600; // Reasonable default for Posh embeds
                console.log('🎫 Using estimated height for Posh embed:', estimatedHeight);
                this.setIframeHeight(estimatedHeight);
                heightDetected = true;
            }
        }

        // Method 4: PostMessage approach for cross-origin iframes
        if (this.iframe.contentWindow) {
            try {
                const messages = [
                    { type: 'getHeight', source: 'checkout-nav' },
                    { type: 'requestHeight', source: 'parent' },
                    { action: 'getHeight' },
                    { type: 'resize-request' },
                    'getHeight'
                ];

                messages.forEach(message => {
                    this.iframe.contentWindow.postMessage(message, '*');
                });

                console.log('🎫 Sent height request messages to iframe');
            } catch (error) {
                console.log('🎫 PostMessage failed:', error);
            }
        }

        // Method 5: Use ResizeObserver if available
        this.setupResizeObserver();
    }

    setupResizeObserver() {
        // Only set up once
        if (this.resizeObserver || !window.ResizeObserver) return;

        try {
            this.resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.target === this.iframe) {
                        const { width, height } = entry.contentRect;
                        console.log('🎫 ResizeObserver detected iframe size change:', { width, height });

                        // If iframe height changed significantly, try to detect content height again
                        if (height > 100) {
                            setTimeout(() => this.detectContentHeight(), 100);
                        }
                    }
                }
            });

            this.resizeObserver.observe(this.iframe);
            console.log('🎫 ResizeObserver set up for iframe');
        } catch (error) {
            console.log('🎫 ResizeObserver setup failed:', error);
        }
    }

    detectContentHeight() {
        if (!this.iframe) return;

        console.log('🎫 Detecting content height...');

        // Try to get the actual content height through various methods
        const methods = [
            () => this.getDirectContentHeight(),
            () => this.estimateHeightFromContent(),
            () => this.getHeightFromPostMessage()
        ];

        for (const method of methods) {
            try {
                const height = method();
                if (height && height > 100) {
                    console.log('🎫 Content height detected:', height);
                    this.setIframeHeight(height);
                    return;
                }
            } catch (error) {
                console.log('🎫 Height detection method failed:', error);
            }
        }

        console.log('🎫 No content height detected, using fallback');
    }

    getDirectContentHeight() {
        try {
            const doc = this.iframe.contentDocument;
            if (doc && doc.body) {
                return Math.max(
                    doc.body.scrollHeight,
                    doc.body.offsetHeight,
                    doc.documentElement.scrollHeight,
                    doc.documentElement.offsetHeight
                );
            }
        } catch (error) {
            // Cross-origin restriction
        }
        return null;
    }

    estimateHeightFromContent() {
        // Estimate height based on iframe source and typical content
        const src = this.iframe.src;

        if (src.includes('posh.vip') || src.includes('posh.')) {
            // Posh embeds typically show ticket options and need more height
            console.log('🎫 Using Posh-specific height estimation');
            return 650; // Good default for Posh ticket selection interfaces
        }

        if (src.includes('eventbrite')) {
            return 600;
        }

        if (src.includes('ticket')) {
            return 550;
        }

        return 500; // Generic fallback
    }

    getHeightFromPostMessage() {
        // This will be handled by the message listener
        // Just return null here as this is async
        return null;
    }

    setIframeHeight(height) {
        if (!this.iframe || !height) return;

        // Apply height constraints
        const minHeight = 300;
        const maxHeight = Math.min(window.innerHeight * 0.8, 800);
        const constrainedHeight = Math.max(minHeight, Math.min(height, maxHeight));

        console.log(`🎫 Setting iframe height: ${height}px (constrained to ${constrainedHeight}px)`);

        // Only update if height actually changed to avoid unnecessary transitions
        const currentHeight = parseInt(this.iframe.style.height) || 400;
        if (Math.abs(currentHeight - constrainedHeight) > 10) {
            // Apply smooth transition
            this.iframe.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.iframe.style.height = `${constrainedHeight}px`;

            console.log('🎫 Height updated from', currentHeight, 'to', constrainedHeight);
        } else {
            console.log('🎫 Height change too small, skipping update');
        }

        // Update modal content max-height if needed
        this.updateModalHeight(constrainedHeight);
    }

    updateModalHeight(iframeHeight) {
        const modalContent = this.modal && this.modal.querySelector('.checkout-modal-content');
        if (!modalContent) return;

        // Calculate total modal content height including padding and header
        const header = modalContent.querySelector('.checkout-modal-header');
        const headerHeight = header ? header.offsetHeight : 60;
        const padding = 40; // 20px top + 20px bottom
        const totalHeight = iframeHeight + headerHeight + padding;

        // Set max-height to allow modal to expand
        const maxModalHeight = Math.min(window.innerHeight * 0.9, totalHeight + 40);
        modalContent.style.maxHeight = `${maxModalHeight}px`;
        modalContent.style.transition = 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    // Public method to update ticket price
    updateTicketPrice(price) {
        const priceElement = document.querySelector('.ticket-price');
        if (priceElement && price) {
            priceElement.textContent = price;
            console.log('🎫 Updated ticket price:', price);
        }
    }

    // Public method to update ticket URL
    updateTicketUrl(url) {
        if (this.iframe && url) {
            this.iframe.dataset.ticketUrl = url;
            // Reset iframe if already loaded
            if (this.iframe.src) {
                this.iframe.src = '';
            }
            console.log('🎫 Updated ticket URL:', url);
        }
    }

    // Public method to show/hide checkout nav
    setVisible(visible) {
        if (this.container) {
            this.container.style.display = visible ? 'block' : 'none';
            console.log('🎫 Checkout nav visibility:', visible);
        }
    }

    // Handle tab navigation within expanded nav
    handleTabNavigation(e) {
        const focusableElements = this.nav.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift + Tab (backward)
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab (forward)
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
}

// Global functions for template use
function openCheckoutModal() {
    console.log('🎫 Global openCheckoutModal called');
    console.log('🎫 window.checkoutNav:', window.checkoutNav);

    if (window.checkoutNav) {
        window.checkoutNav.openModal();
    } else {
        console.error('🎫 window.checkoutNav not found!');
    }
}

function closeCheckoutModal() {
    if (window.checkoutNav) {
        window.checkoutNav.closeModal();
    }
}

// Global function to test height setting
function testSetHeight(height) {
    if (window.checkoutNav) {
        console.log('🎫 Testing setIframeHeight with:', height);
        window.checkoutNav.setIframeHeight(height);
    } else {
        console.error('🎫 window.checkoutNav not found!');
    }
}

// Global function to force height detection
function forceHeightDetection() {
    if (window.checkoutNav) {
        console.log('🎫 Forcing height detection...');
        console.log('🎫 Current iframe state:', {
            src: window.checkoutNav.iframe && window.checkoutNav.iframe.src,
            height: window.checkoutNav.iframe && window.checkoutNav.iframe.style.height,
            offsetHeight: window.checkoutNav.iframe && window.checkoutNav.iframe.offsetHeight,
            scrollHeight: window.checkoutNav.iframe && window.checkoutNav.iframe.scrollHeight,
            clientHeight: window.checkoutNav.iframe && window.checkoutNav.iframe.clientHeight
        });

        window.checkoutNav.adjustIframeHeight();
        window.checkoutNav.detectContentHeight();

        // Try multiple times with delays
        setTimeout(() => {
            console.log('🎫 Retry 1 - height detection');
            window.checkoutNav.adjustIframeHeight();
        }, 500);
        setTimeout(() => {
            console.log('🎫 Retry 2 - height detection');
            window.checkoutNav.adjustIframeHeight();
        }, 1000);
        setTimeout(() => {
            console.log('🎫 Retry 3 - height detection');
            window.checkoutNav.adjustIframeHeight();
        }, 2000);
    } else {
        console.error('🎫 window.checkoutNav not found!');
    }
}

// Global function to get comprehensive iframe info
function getIframeInfo() {
    if (window.checkoutNav && window.checkoutNav.iframe) {
        const iframe = window.checkoutNav.iframe;
        const info = {
            src: iframe.src,
            currentHeight: iframe.style.height,
            offsetHeight: iframe.offsetHeight,
            scrollHeight: iframe.scrollHeight,
            clientHeight: iframe.clientHeight,
            offsetWidth: iframe.offsetWidth,
            scrollWidth: iframe.scrollWidth,
            clientWidth: iframe.clientWidth,
            contentWindow: !!iframe.contentWindow,
            contentDocument: !!iframe.contentDocument
        };

        console.log('🎫 Comprehensive iframe info:', info);

        // Try to get content document info
        try {
            if (iframe.contentDocument) {
                const doc = iframe.contentDocument;
                const contentInfo = {
                    bodyScrollHeight: doc.body && doc.body.scrollHeight,
                    bodyOffsetHeight: doc.body && doc.body.offsetHeight,
                    documentScrollHeight: doc.documentElement && doc.documentElement.scrollHeight,
                    documentOffsetHeight: doc.documentElement && doc.documentElement.offsetHeight,
                    documentClientHeight: doc.documentElement && doc.documentElement.clientHeight
                };
                console.log('🎫 Content document info:', contentInfo);
            }
        } catch (error) {
            console.log('🎫 Cannot access content document (cross-origin):', error.message);
        }

        return info;
    } else {
        console.error('🎫 No iframe found!');
        return null;
    }
}

// Initialize checkout nav when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎫 DOM loaded, checking for checkout nav elements');

    const container = document.querySelector('.checkout-nav-container');
    console.log('🎫 Container found:', container);

    // Only initialize if checkout nav elements exist
    if (container) {
        console.log('🎫 Initializing CheckoutNav...');
        window.checkoutNav = new CheckoutNav();
        console.log('🎫 CheckoutNav initialized:', window.checkoutNav);
    } else {
        console.log('🎫 No checkout nav container found');
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CheckoutNav;
}