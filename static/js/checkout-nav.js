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

        // Hide modal
        this.modal.classList.remove('active');

        // Clear iframe
        if (this.iframe) {
            this.iframe.src = 'about:blank';
        }

        // Return focus to buy button
        setTimeout(() => {
            this.buyButton.focus();
        }, 100);
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

        // Set iframe source
        this.iframe.src = ticketUrl;

        // Handle iframe load
        this.iframe.addEventListener('load', () => {
            console.log('🎫 Ticket iframe loaded successfully');
            this.iframe.classList.remove('loading');
        }, { once: true });

        // Handle iframe error
        this.iframe.addEventListener('error', () => {
            console.error('🎫 Failed to load ticket iframe');
            this.iframe.classList.remove('loading');
        }, { once: true });
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