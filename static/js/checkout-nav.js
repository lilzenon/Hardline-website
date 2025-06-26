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
            // Add parameters to help with dynamic sizing if supported by Posh
            urlObj.searchParams.set('responsive', 'true');
            urlObj.searchParams.set('autosize', 'true');
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

        // Initial size adjustment with multiple attempts
        setTimeout(() => this.adjustIframeHeight(), 100);
        setTimeout(() => this.adjustIframeHeight(), 500);
        setTimeout(() => this.adjustIframeHeight(), 1000);
        setTimeout(() => this.adjustIframeHeight(), 2000);
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

    handleIframeMessage(event) {
        // Handle messages from Posh iframe for dynamic sizing
        if (!this.iframe || !event.data) return;

        console.log('🎫 Received message from iframe:', event.origin, event.data);

        try {
            let data = event.data;

            // Parse JSON if it's a string
            if (typeof data === 'string') {
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

                // Standard resize message
                if (data.type === 'resize' && data.height) {
                    height = data.height;
                }
                // Posh-specific resize message
                else if (data.type === 'posh-resize' && data.height) {
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

        // First, try direct access (same-origin)
        try {
            const iframeDoc = this.iframe.contentDocument || (this.iframe.contentWindow && this.iframe.contentWindow.document);
            if (iframeDoc && iframeDoc.body) {
                // Wait for content to be fully loaded
                const checkContent = () => {
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

                        if (contentHeight > 100) { // Minimum reasonable height
                            this.setIframeHeight(contentHeight);
                            return true;
                        } else if (contentHeight > 0) {
                            // Even if it's small, set it and add some padding
                            this.setIframeHeight(Math.max(contentHeight + 50, 300));
                            return true;
                        }
                    }
                    return false;
                };

                // Try immediately and with delays
                if (!checkContent()) {
                    setTimeout(checkContent, 100);
                    setTimeout(checkContent, 500);
                }
            }
        } catch (error) {
            console.log('🎫 Cross-origin iframe detected:', error.message);
        }

        // Always try postMessage approach for cross-origin iframes
        if (this.iframe.contentWindow) {
            try {
                // Send multiple message formats that different iframe content might understand
                const messages = [
                    { type: 'getHeight', source: 'checkout-nav' },
                    { type: 'requestHeight', source: 'parent' },
                    { action: 'getHeight' },
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
        window.checkoutNav.adjustIframeHeight();

        // Try multiple times with delays
        setTimeout(() => window.checkoutNav.adjustIframeHeight(), 500);
        setTimeout(() => window.checkoutNav.adjustIframeHeight(), 1000);
        setTimeout(() => window.checkoutNav.adjustIframeHeight(), 2000);
    } else {
        console.error('🎫 window.checkoutNav not found!');
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