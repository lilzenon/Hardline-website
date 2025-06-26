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
        this.isModalOpen = true;

        // Load iframe if not already loaded with ticket URL
        if (this.iframe && (this.iframe.src === 'about:blank' || !this.iframe.src)) {
            this.loadIframe();
        }

        // Show modal
        this.modal.classList.add('active');

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
        const modalContent = this.modal ? .querySelector('.checkout-modal-content');
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

            // Initialize dynamic sizing
            this.initializeDynamicSizing();
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

        // Set up message listener for iframe height changes
        this.messageListener = (event) => {
            this.handleIframeMessage(event);
        };

        window.addEventListener('message', this.messageListener);

        // Set up ResizeObserver for iframe content changes
        if (window.ResizeObserver) {
            this.resizeObserver = new ResizeObserver((entries) => {
                this.handleIframeResize(entries);
            });

            this.resizeObserver.observe(this.iframe);
        }

        // Initial size adjustment
        setTimeout(() => {
            this.adjustIframeHeight();
        }, 500);
    }

    handleIframeMessage(event) {
        // Handle messages from Posh iframe for dynamic sizing
        if (!this.iframe || !event.data) return;

        try {
            // Check if message is from our iframe
            const iframeOrigin = new URL(this.iframe.src).origin;
            if (event.origin !== iframeOrigin) return;

            const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

            if (data.type === 'resize' && data.height) {
                console.log('🎫 Received iframe resize message:', data.height);
                this.setIframeHeight(data.height);
            } else if (data.type === 'posh-resize' && data.height) {
                // Posh-specific resize message format
                console.log('🎫 Received Posh resize message:', data.height);
                this.setIframeHeight(data.height);
            }
        } catch (error) {
            // Ignore parsing errors for non-JSON messages
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
        if (!this.iframe || !this.iframe.contentWindow) return;

        try {
            // Try to get content height from iframe document
            const iframeDoc = this.iframe.contentDocument || this.iframe.contentWindow.document;
            if (iframeDoc && iframeDoc.body) {
                const contentHeight = Math.max(
                    iframeDoc.body.scrollHeight,
                    iframeDoc.body.offsetHeight,
                    iframeDoc.documentElement.clientHeight,
                    iframeDoc.documentElement.scrollHeight,
                    iframeDoc.documentElement.offsetHeight
                );

                if (contentHeight > 0) {
                    console.log('🎫 Detected iframe content height:', contentHeight);
                    this.setIframeHeight(contentHeight);
                }
            }
        } catch (error) {
            // Cross-origin restrictions prevent direct access
            console.log('🎫 Cross-origin iframe - using message-based sizing');

            // Request height from iframe via postMessage
            this.iframe.contentWindow.postMessage({
                type: 'getHeight',
                source: 'checkout-nav'
            }, '*');
        }
    }

    setIframeHeight(height) {
        if (!this.iframe || !height) return;

        // Apply height constraints
        const minHeight = 300;
        const maxHeight = Math.min(window.innerHeight * 0.8, 800);
        const constrainedHeight = Math.max(minHeight, Math.min(height, maxHeight));

        console.log(`🎫 Setting iframe height: ${height}px (constrained to ${constrainedHeight}px)`);

        // Apply smooth transition
        this.iframe.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        this.iframe.style.height = `${constrainedHeight}px`;

        // Update modal content max-height if needed
        this.updateModalHeight(constrainedHeight);
    }

    updateModalHeight(iframeHeight) {
        const modalContent = this.modal ? .querySelector('.checkout-modal-content');
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
    if (window.checkoutNav) {
        window.checkoutNav.openModal();
    }
}

function closeCheckoutModal() {
    if (window.checkoutNav) {
        window.checkoutNav.closeModal();
    }
}

// Initialize checkout nav when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if checkout nav elements exist
    if (document.querySelector('.checkout-nav-container')) {
        window.checkoutNav = new CheckoutNav();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CheckoutNav;
}