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

        // Use EXACT SAME elements as working homepage modal
        this.modal = document.querySelector('.modal-overlay');
        this.closeButton = document.querySelector('.modal-close');
        this.iframe = document.querySelector('#poshIframe');

        if (!this.container || !this.nav || !this.buyButton || !this.modal) {
            console.log('🎫 Checkout nav elements not found - component not initialized');
            return;
        }

        this.setupEventListeners();
        console.log('🎫 Checkout nav initialized successfully with homepage modal elements');
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

        // Close modal when clicking outside - EXACT SAME as homepage
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.modal.style.display = 'none';
                    this.modal.classList.remove('active');
                    document.body.style.overflow = '';
                    this.isModalOpen = false;
                    console.log('🚪 Modal closed via outside click');
                }
            });
        }

        // Setup viewport change handling for modal positioning
        this.setupViewportHandling();

        // Close modal with close button - EXACT SAME as homepage
        if (this.closeButton) {
            this.closeButton.addEventListener('click', () => {
                this.modal.style.display = 'none';
                this.modal.classList.remove('active');
                document.body.style.overflow = '';
                this.isModalOpen = false;
                console.log('🚪 Modal closed via close button');
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
        try {
            if (this.isModalOpen) return;

            console.log('🎫 Opening modal - using pure CSS styling like homepage');

            this.isModalOpen = true;

            // Get ticket URL from iframe data attribute
            const ticketUrl = this.iframe && this.iframe.dataset.ticketUrl;

            if (ticketUrl && ticketUrl.trim() !== '' && ticketUrl !== 'null') {
                console.log('✅ Opening tickets modal with URL:', ticketUrl);

                // Update modal iframe source
                if (this.iframe) {
                    console.log('🎯 Setting iframe src to:', ticketUrl);
                    this.iframe.src = ticketUrl;

                    // CRITICAL FIX: Apply color-scheme fix immediately
                    this.iframe.style.setProperty('color-scheme', 'normal', 'important');
                    this.iframe.style.setProperty('background', 'transparent', 'important');
                    console.log('🎨 Applied color-scheme fix to iframe');
                } else {
                    console.error('❌ poshIframe element not found in DOM');
                }

                // Show modal with forced viewport positioning
                if (this.modal) {
                    console.log('🎪 Opening modal overlay...');

                    // Force proper positioning before showing
                    this.forceModalViewportPosition();

                    this.modal.style.display = 'flex';
                    this.modal.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Ensure positioning after display
                    requestAnimationFrame(() => {
                        this.forceModalViewportPosition();
                    });

                    console.log('✅ Modal opened with forced positioning');
                } else {
                    console.error('❌ modalOverlay element not found in DOM');
                }
            } else {
                console.warn('🎫 No ticket URL found');
            }

            console.log('🎫 Modal opening completed - no JavaScript styling overrides');
        } catch (error) {
            console.error('🎫 ERROR in openModal:', error);
            this.isModalOpen = false; // Reset state on error
        }
    }

    // REMOVED: No complex sizing needed - using working homepage modal pattern

    // REMOVED: All dynamic height detection methods that caused refresh loops
    // Now using fixed 320px height based on Posh content analysis

    forceModalViewportPosition() {
        if (!this.modal) return;

        console.log('🎯 Forcing modal viewport positioning...');

        // Get current viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        console.log('📐 Viewport:', { width: viewportWidth, height: viewportHeight });

        // Force modal overlay to exact viewport bounds
        this.modal.style.position = 'fixed';
        this.modal.style.top = '0px';
        this.modal.style.left = '0px';
        this.modal.style.width = viewportWidth + 'px';
        this.modal.style.height = viewportHeight + 'px';
        this.modal.style.maxWidth = viewportWidth + 'px';
        this.modal.style.maxHeight = viewportHeight + 'px';

        // Force flexbox centering
        this.modal.style.display = 'flex';
        this.modal.style.alignItems = 'center';
        this.modal.style.justifyContent = 'center';

        // Get modal content
        const modalContent = this.modal.querySelector('.modal-content');
        if (modalContent) {
            // Reset any problematic styles
            modalContent.style.margin = '0';
            modalContent.style.transform = 'none';
            modalContent.style.position = 'relative';

            // Ensure content fits in viewport
            const maxContentHeight = viewportHeight - 40; // 20px padding top/bottom
            const maxContentWidth = viewportWidth - 40; // 20px padding left/right

            modalContent.style.maxHeight = maxContentHeight + 'px';
            modalContent.style.maxWidth = maxContentWidth + 'px';
            modalContent.style.overflow = 'auto';

            console.log('📦 Modal content constrained to:', {
                maxWidth: maxContentWidth,
                maxHeight: maxContentHeight
            });
        }

        console.log('✅ Modal positioning forced to viewport bounds');
    }

    setupViewportHandling() {
        // Handle window resize and orientation changes
        const handleViewportChange = () => {
            if (this.isModalOpen && this.modal) {
                console.log('📐 Viewport changed, repositioning modal...');
                // Small delay to ensure viewport dimensions are updated
                setTimeout(() => {
                    this.forceModalViewportPosition();
                }, 100);
            }
        };

        // Listen for resize events
        window.addEventListener('resize', handleViewportChange);

        // Listen for orientation changes (mobile)
        window.addEventListener('orientationchange', () => {
            // Longer delay for orientation changes
            setTimeout(handleViewportChange, 300);
        });

        // Listen for visual viewport changes (mobile keyboard, etc.)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleViewportChange);
        }

        console.log('📐 Viewport change handlers setup for modal positioning');
    }

    closeModal() {
        if (!this.isModalOpen) return;

        console.log('🎫 Closing modal - using pure CSS styling like homepage');
        this.isModalOpen = false;

        // Hide modal - let CSS handle styling
        this.modal.style.display = 'none';
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        console.log('🚪 Modal closed');
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

        // Clear iframe mutation observer
        if (this.iframeObserver) {
            this.iframeObserver.disconnect();
            this.iframeObserver = null;
        }

        // Clear Posh content monitoring
        if (this.poshContentMonitor) {
            clearInterval(this.poshContentMonitor);
            this.poshContentMonitor = null;
        }
    }

    loadIframe() {
        try {
            console.log('🎫 loadIframe called - SIMPLE like working homepage modal');

            if (!this.iframe) {
                console.log('🎫 No iframe element, returning');
                return;
            }

            const ticketUrl = this.iframe.dataset.ticketUrl;
            if (!ticketUrl) {
                console.warn('🎫 No ticket URL found for iframe');
                return;
            }

            console.log('🎫 Loading ticket iframe:', ticketUrl);

            // SIMPLE iframe loading - like working homepage modal
            this.iframe.src = ticketUrl;
            console.log('🎫 Iframe src set successfully with simple pattern');
        } catch (error) {
            console.error('🎫 ERROR in loadIframe:', error);
        }

        // SIMPLE iframe load handling - like working homepage modal
        this.iframe.addEventListener('load', () => {
            console.log('🎫 Ticket iframe loaded successfully - simple pattern');

            // CRITICAL FIX: Apply color-scheme fix after iframe loads
            this.iframe.style.setProperty('color-scheme', 'normal', 'important');
            this.iframe.style.setProperty('background', 'transparent', 'important');
            console.log('🎨 Applied color-scheme fix after iframe load');
        }, { once: true });

        // SIMPLE iframe error handling
        this.iframe.addEventListener('error', () => {
            console.error('🎫 Failed to load ticket iframe');
            this.iframe.classList.remove('loading');
        }, { once: true });
    }

    addDynamicSizingParams(url) {
        console.log('🎫 addDynamicSizingParams input URL:', url);

        try {
            const urlObj = new URL(url);
            console.log('🎫 Parsed URL object:', {
                href: urlObj.href,
                hostname: urlObj.hostname,
                pathname: urlObj.pathname,
                search: urlObj.search
            });

            // Check if this is a Posh embed - they don't support URL parameters
            if (urlObj.hostname.includes('posh.vip') || urlObj.hostname.includes('posh.')) {
                console.log('🎫 Posh embed detected - returning original URL unchanged');
                console.log('🎫 Original URL:', url);
                console.log('🎫 Returning URL:', url);
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
            const estimatedHeight = this.estimateHeightFromContent();
            if (estimatedHeight > 100) {
                console.log('🎫 Using content-based height estimation:', estimatedHeight);
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
            // AGGRESSIVE Posh sizing - eliminate scrolling completely
            console.log('🎫 AGGRESSIVE Posh height estimation - eliminating scrolling');

            const viewportHeight = window.innerHeight;

            // Use very generous height - better too tall than scrolling
            const aggressiveHeight = Math.max(1000, viewportHeight * 0.75);
            const finalHeight = Math.min(aggressiveHeight, 1200);

            console.log(`🎫 AGGRESSIVE Posh height: ${finalHeight}px (viewport: ${viewportHeight}px)`);
            console.log('🎫 Strategy: Better too tall than requiring scrolling');

            return finalHeight;
        }

        if (src.includes('eventbrite')) {
            return 700; // Increased for full content
        }

        if (src.includes('ticket')) {
            return 650; // Increased for full content
        }

        return 600; // Increased generic fallback
    }

    tryPoshSpecificDetection() {
        if (!this.iframe) return;

        const src = this.iframe.src;
        const isPoshEmbed = src && (src.includes('posh.vip') || src.includes('posh.'));

        if (!isPoshEmbed) return;

        console.log('🎫 Research-based Posh height detection starting...');

        // Get current state
        const currentHeight = parseInt(this.iframe.style.height) || 400;
        const iframeRect = this.iframe.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        console.log('🎫 Posh iframe analysis:', {
            currentHeight,
            boundingHeight: iframeRect.height,
            viewportHeight,
            heightRatio: (currentHeight / viewportHeight * 100).toFixed(1) + '%'
        });

        // Research-based height adequacy check
        const isHeightAdequate = this.isPoshHeightAdequate(currentHeight);

        if (!isHeightAdequate) {
            const optimalHeight = this.calculateOptimalPoshHeight();
            console.log(`🎫 Current height inadequate (${currentHeight}px), setting optimal height: ${optimalHeight}px`);
            this.setIframeHeight(optimalHeight);
        } else {
            console.log(`🎫 Current height appears adequate (${currentHeight}px) for Posh content`);
        }

        // Set up advanced monitoring
        this.setupAdvancedPoshMonitoring();
    }

    isPoshHeightAdequate(height) {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        // Research-based adequacy thresholds
        let minAdequateHeight;

        if (viewportWidth < 768) {
            // Mobile: Need more height due to vertical stacking
            minAdequateHeight = Math.min(viewportHeight * 0.85, 900);
        } else if (viewportWidth < 1024) {
            // Tablet: Moderate requirements
            minAdequateHeight = Math.min(viewportHeight * 0.75, 750);
        } else {
            // Desktop: Can be more conservative
            minAdequateHeight = Math.min(viewportHeight * 0.65, 650);
        }

        const isAdequate = height >= minAdequateHeight;
        console.log(`🎫 Height adequacy check: ${height}px vs ${minAdequateHeight}px minimum = ${isAdequate ? 'ADEQUATE' : 'INADEQUATE'}`);

        return isAdequate;
    }

    calculateOptimalPoshHeight() {
        // Use the enhanced estimation method
        const estimatedHeight = this.estimateHeightFromContent();

        // Add buffer for dynamic content that might load
        const bufferHeight = 100;
        const optimalHeight = estimatedHeight + bufferHeight;

        console.log(`🎫 Optimal height calculation: ${estimatedHeight}px + ${bufferHeight}px buffer = ${optimalHeight}px`);

        return optimalHeight;
    }

    setupAdvancedPoshMonitoring() {
        // Enhanced monitoring for Posh embeds
        this.observeIframeChanges();
        this.setupPoshContentMonitoring();
        this.schedulePeriodicPoshChecks();
    }

    setupPoshContentMonitoring() {
        if (this.poshContentMonitor) return;

        // Monitor for any visual changes that might indicate content loading
        let lastVisualState = this.getPoshVisualState();

        this.poshContentMonitor = setInterval(() => {
            const currentVisualState = this.getPoshVisualState();

            if (this.hasPoshVisualStateChanged(lastVisualState, currentVisualState)) {
                console.log('🎫 Posh visual state changed, rechecking height');
                this.tryPoshSpecificDetection();
                lastVisualState = currentVisualState;
            }
        }, 2000); // Check every 2 seconds

        // Stop monitoring after 30 seconds
        setTimeout(() => {
            if (this.poshContentMonitor) {
                clearInterval(this.poshContentMonitor);
                this.poshContentMonitor = null;
                console.log('🎫 Posh content monitoring stopped');
            }
        }, 30000);
    }

    getPoshVisualState() {
        if (!this.iframe) return null;

        const rect = this.iframe.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
            scrollHeight: this.iframe.scrollHeight || 0,
            offsetHeight: this.iframe.offsetHeight || 0
        };
    }

    hasPoshVisualStateChanged(oldState, newState) {
        if (!oldState || !newState) return false;

        const heightChanged = Math.abs(oldState.height - newState.height) > 10;
        const scrollHeightChanged = Math.abs(oldState.scrollHeight - newState.scrollHeight) > 10;

        return heightChanged || scrollHeightChanged;
    }

    schedulePeriodicPoshChecks() {
        // Research shows content can load at various intervals
        const checkIntervals = [3000, 7000, 15000, 30000]; // 3s, 7s, 15s, 30s

        checkIntervals.forEach((interval, index) => {
            setTimeout(() => {
                console.log(`🎫 Periodic Posh check #${index + 1} at ${interval}ms`);
                this.tryPoshSpecificDetection();
            }, interval);
        });
    }

    observeIframeChanges() {
        if (this.iframeObserver) return; // Already observing

        // Use MutationObserver to watch for any changes in iframe attributes
        if (window.MutationObserver) {
            this.iframeObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' &&
                        (mutation.attributeName === 'style' || mutation.attributeName === 'height')) {
                        console.log('🎫 Iframe attributes changed, rechecking height');
                        setTimeout(() => this.adjustIframeHeight(), 100);
                    }
                });
            });

            this.iframeObserver.observe(this.iframe, {
                attributes: true,
                attributeFilter: ['style', 'height', 'scrollHeight']
            });

            console.log('🎫 Started observing iframe for attribute changes');
        }
    }

    getHeightFromPostMessage() {
        // This will be handled by the message listener
        // Just return null here as this is async
        return null;
    }

    setIframeHeight(height) {
        if (!this.iframe || !height) return;

        // DIRECT APPROACH: Set generous height for Posh embeds to eliminate scrolling
        const src = this.iframe.src;
        const isPoshEmbed = src && (src.includes('posh.vip') || src.includes('posh.'));

        let constrainedHeight;

        if (isPoshEmbed) {
            // FORCE large height for Posh to show full content - no more scrolling!
            const viewportHeight = window.innerHeight;

            // Use a very generous height that should accommodate any Posh content
            const generousHeight = Math.max(1000, viewportHeight * 0.8);
            constrainedHeight = Math.min(generousHeight, 1200); // Cap at 1200px max

            console.log(`🎫 FORCING generous Posh height: ${constrainedHeight}px to eliminate scrolling`);
            console.log(`🎫 Viewport: ${window.innerWidth}x${viewportHeight}, Requested: ${height}px`);
        } else {
            // Standard constraints for other embeds
            const minHeight = 300;
            const maxHeight = Math.min(window.innerHeight * 0.8, 800);
            constrainedHeight = Math.max(minHeight, Math.min(height, maxHeight));
        }

        console.log(`🎫 Setting iframe height: ${height}px (constrained to ${constrainedHeight}px)`);

        // Debug current iframe state
        const currentHeight = parseInt(this.iframe.style.height) || 400;
        const currentComputedHeight = this.iframe.offsetHeight;
        const heightDifference = Math.abs(currentHeight - constrainedHeight);

        console.log('🎫 Height state before update:', {
            currentStyleHeight: currentHeight,
            currentActualHeight: currentComputedHeight,
            targetHeight: constrainedHeight,
            difference: heightDifference,
            willUpdate: heightDifference > 10
        });

        if (heightDifference > 10) {
            // Apply smooth transition
            this.iframe.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.iframe.style.height = `${constrainedHeight}px`;

            console.log('🎫 Height updated from', currentHeight, 'to', constrainedHeight);

            // Verify the update worked
            setTimeout(() => {
                const newActualHeight = this.iframe.offsetHeight;
                const newStyleHeight = this.iframe.style.height;
                console.log('🎫 Height verification after update:', {
                    newStyleHeight,
                    newActualHeight,
                    targetHeight: constrainedHeight,
                    updateSuccessful: newActualHeight >= constrainedHeight * 0.9
                });
            }, 100);
        } else {
            console.log('🎫 Height change too small, skipping update');
        }

        // Update modal content max-height if needed
        this.updateModalHeight(constrainedHeight);
    }

    updateModalHeight(iframeHeight) {
        const modalContent = this.modal && this.modal.querySelector('.modal-content');
        if (!modalContent) return;

        // AGGRESSIVE APPROACH: Remove all height constraints for Posh embeds
        const src = this.iframe && this.iframe.src;
        const isPoshEmbed = src && (src.includes('posh.vip') || src.includes('posh.'));

        if (isPoshEmbed) {
            // For Posh embeds: Remove max-height entirely and let content expand
            modalContent.style.maxHeight = 'none';
            modalContent.style.height = 'auto';
            console.log('🎫 REMOVED modal height constraints for Posh embed');
        } else {
            // For other embeds: Use conservative constraints
            const header = modalContent.querySelector('.modal-close');
            const headerHeight = header ? header.offsetHeight : 60;
            const padding = 40; // 20px top + 20px bottom
            const totalHeight = iframeHeight + headerHeight + padding;
            const maxModalHeight = Math.min(window.innerHeight * 0.9, totalHeight + 40);
            modalContent.style.maxHeight = `${maxModalHeight}px`;
        }

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

// Global functions for template use - EXACT SAME pattern as homepage
function openCheckoutModal() {
    console.log('🎫 Global openCheckoutModal called - using homepage pattern');

    try {
        if (window.checkoutNav) {
            console.log('🎫 Calling openModal...');
            window.checkoutNav.openModal();
            console.log('🎫 openModal completed');
        } else {
            console.error('🎫 window.checkoutNav not found!');
        }
    } catch (error) {
        console.error('🎫 ERROR in openCheckoutModal:', error);
    }
}

function closeCheckoutModal() {
    console.log('🎫 Global closeCheckoutModal called - using homepage pattern');
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

// Global function to test research-based Posh detection
function testPoshDetection() {
    if (window.checkoutNav) {
        console.log('🎫 Testing research-based Posh detection...');

        // Get current state
        const iframe = window.checkoutNav.iframe;
        if (iframe) {
            console.log('🎫 Current iframe state before optimization:');
            console.log('- Height:', iframe.style.height);
            console.log('- Viewport:', window.innerWidth + 'x' + window.innerHeight);
            console.log('- Source:', iframe.src);
        }

        // Run Posh-specific detection
        window.checkoutNav.tryPoshSpecificDetection();

        // Run comprehensive height detection
        setTimeout(() => {
            console.log('🎫 Running comprehensive height detection...');
            window.checkoutNav.adjustIframeHeight();
        }, 500);

        // Check final state
        setTimeout(() => {
            console.log('🎫 Final state after optimization:');
            if (iframe) {
                console.log('- Final Height:', iframe.style.height);
                console.log('- Bounding Height:', iframe.getBoundingClientRect().height);
            }
            getIframeInfo();
        }, 2000);

        // Test height adequacy
        setTimeout(() => {
            const currentHeight = parseInt(iframe.style.height) || 0;
            const isAdequate = window.checkoutNav.isPoshHeightAdequate(currentHeight);
            console.log(`🎫 Height adequacy test: ${currentHeight}px is ${isAdequate ? 'ADEQUATE' : 'INADEQUATE'}`);
        }, 2500);

    } else {
        console.error('🎫 window.checkoutNav not found!');
    }
}

// Global function to force optimal Posh height
function setOptimalPoshHeight() {
    if (window.checkoutNav && window.checkoutNav.iframe) {
        console.log('🎫 Setting optimal Posh height...');
        const optimalHeight = window.checkoutNav.calculateOptimalPoshHeight();
        window.checkoutNav.setIframeHeight(optimalHeight);
        console.log(`🎫 Set optimal height: ${optimalHeight}px`);
    } else {
        console.error('🎫 window.checkoutNav or iframe not found!');
    }
}

// Global function to test Posh URL directly
function testPoshURL() {
    if (window.checkoutNav && window.checkoutNav.iframe) {
        const iframe = window.checkoutNav.iframe;
        console.log('🎫 TESTING Posh URL directly...');

        // Get the current URL
        const currentSrc = iframe.src;
        console.log('🎫 Current iframe src:', currentSrc);

        if (currentSrc && (currentSrc.includes('posh.vip') || currentSrc.includes('posh.'))) {
            console.log('🎫 Confirmed: This is a Posh URL');

            // Test if we can open it in a new window
            console.log('🎫 Testing URL accessibility...');
            const testWindow = window.open(currentSrc, '_blank', 'width=800,height=600');

            if (testWindow) {
                console.log('🎫 SUCCESS: Posh URL opened in new window');
                console.log('🎫 Check the new window to see if Posh content loads properly');

                // Close the test window after a few seconds
                setTimeout(() => {
                    testWindow.close();
                    console.log('🎫 Test window closed');
                }, 5000);
            } else {
                console.log('🎫 FAILED: Could not open Posh URL in new window (popup blocked?)');
            }
        } else {
            console.log('🎫 This is not a Posh URL or no URL set');
        }
    } else {
        console.error('🎫 window.checkoutNav or iframe not found!');
    }
}

// Global function to test iframe content accessibility
function testIframeContent() {
    if (window.checkoutNav && window.checkoutNav.iframe) {
        const iframe = window.checkoutNav.iframe;
        console.log('🎫 TESTING iframe content accessibility...');
        console.log('🎫 Iframe src:', iframe.src);
        console.log('🎫 Iframe dimensions:', {
            offsetWidth: iframe.offsetWidth,
            offsetHeight: iframe.offsetHeight,
            styleHeight: iframe.style.height,
            computedHeight: window.getComputedStyle(iframe).height
        });

        // Test if we can access the content
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            if (doc) {
                console.log('🎫 SUCCESS: Can access iframe content');
                console.log('🎫 Document ready state:', doc.readyState);
                console.log('🎫 Document body height:', doc.body ? doc.body.scrollHeight : 'No body');
                console.log('🎫 Document HTML height:', doc.documentElement ? doc.documentElement.scrollHeight : 'No HTML');
            }
        } catch (error) {
            console.log('🎫 CROSS-ORIGIN: Cannot access iframe content:', error.message);
            console.log('🎫 This is expected for Posh embeds (different domain)');
        }

        // Test if iframe has loaded
        if (iframe.src && iframe.src !== 'about:blank') {
            console.log('🎫 Iframe has valid src, should be loading content');
        } else {
            console.log('🎫 WARNING: Iframe has no src or blank src');
        }
    } else {
        console.error('🎫 window.checkoutNav or iframe not found!');
    }
}

// Function to check what URL is actually being loaded
function checkCurrentPoshUrl() {
    console.log('🎫 ===== CHECKING CURRENT POSH URL =====');

    if (!window.checkoutNav || !window.checkoutNav.iframe) {
        console.error('🎫 iframe not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;
    console.log('🎫 Current iframe src:', iframe.src);
    console.log('🎫 data-ticket-url:', iframe.getAttribute('data-ticket-url'));

    // Test if the URL is accessible
    if (iframe.src && iframe.src !== 'about:blank') {
        console.log('🎫 Testing URL accessibility...');
        fetch(iframe.src, { method: 'HEAD', mode: 'no-cors' })
            .then(() => console.log('🎫 URL appears to be accessible'))
            .catch(error => console.log('🎫 URL may not be accessible:', error));
    }

    console.log('🎫 ===== END URL CHECK =====');
}

// Function to check iframe data attributes
function checkIframeData() {
    console.log('🎫 ===== IFRAME DATA ATTRIBUTE CHECK =====');

    if (!window.checkoutNav || !window.checkoutNav.iframe) {
        console.error('🎫 CRITICAL: iframe not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;

    console.log('🎫 IFRAME ELEMENT:', iframe);
    console.log('🎫 IFRAME DATASET:', iframe.dataset);
    console.log('🎫 data-ticket-url attribute:', iframe.getAttribute('data-ticket-url'));
    console.log('🎫 dataset.ticketUrl:', iframe.dataset.ticketUrl);

    // Check all data attributes
    const allDataAttrs = {};
    for (let attr of iframe.attributes) {
        if (attr.name.startsWith('data-')) {
            allDataAttrs[attr.name] = attr.value;
        }
    }
    console.log('🎫 ALL DATA ATTRIBUTES:', allDataAttrs);

    // Check if the URL is empty or undefined
    const ticketUrl = iframe.dataset.ticketUrl;
    if (!ticketUrl) {
        console.error('🎫 PROBLEM: data-ticket-url is empty or missing!');
        console.log('🎫 This explains why iframe src stays "about:blank"');
        console.log('🎫 The Handlebars template {{event.posh_embed_url}} is not providing a URL');
    } else {
        console.log('🎫 SUCCESS: data-ticket-url found:', ticketUrl);
        console.log('🎫 URL length:', ticketUrl.length);
        console.log('🎫 Is Posh URL:', ticketUrl.includes('posh.vip') || ticketUrl.includes('posh.'));
    }

    console.log('🎫 ===== END IFRAME DATA CHECK =====');
}

// Function to diagnose why iframe height isn't applying
function diagnoseIframeHeight() {
    console.log('🎫 ===== IFRAME HEIGHT DIAGNOSIS =====');

    if (!window.checkoutNav || !window.checkoutNav.iframe) {
        console.error('🎫 iframe not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;
    const modal = window.checkoutNav.modal;
    const modalContent = modal && modal.querySelector('.modal-content');

    console.log('🎫 IFRAME ANALYSIS:');
    console.log('  - style.height:', iframe.style.height);
    console.log('  - offsetHeight:', iframe.offsetHeight);
    console.log('  - clientHeight:', iframe.clientHeight);
    console.log('  - scrollHeight:', iframe.scrollHeight);

    const computed = window.getComputedStyle(iframe);
    console.log('🎫 COMPUTED STYLES:');
    console.log('  - height:', computed.height);
    console.log('  - maxHeight:', computed.maxHeight);
    console.log('  - minHeight:', computed.minHeight);
    console.log('  - overflow:', computed.overflow);
    console.log('  - display:', computed.display);
    console.log('  - position:', computed.position);

    console.log('🎫 PARENT CONSTRAINTS:');
    if (modalContent) {
        const modalComputed = window.getComputedStyle(modalContent);
        console.log('  - modalContent.style.maxHeight:', modalContent.style.maxHeight);
        console.log('  - modalContent.computed.maxHeight:', modalComputed.maxHeight);
        console.log('  - modalContent.computed.height:', modalComputed.height);
        console.log('  - modalContent.offsetHeight:', modalContent.offsetHeight);
    }

    if (modal) {
        const modalStyles = window.getComputedStyle(modal);
        console.log('  - modal.style.maxHeight:', modal.style.maxHeight);
        console.log('  - modal.computed.maxHeight:', modalStyles.maxHeight);
        console.log('  - modal.computed.height:', modalStyles.height);
        console.log('  - modal.offsetHeight:', modal.offsetHeight);
    }

    console.log('🎫 RECOMMENDATIONS:');
    if (iframe.offsetHeight < parseInt(iframe.style.height)) {
        console.log('  ❌ Height not applying - something is constraining the iframe');
        console.log('  💡 Try: forceIframeFullHeight() for nuclear option');
    } else {
        console.log('  ✅ Height is applying correctly');
    }

    console.log('🎫 ===== END DIAGNOSIS =====');
}

// COMPREHENSIVE debugging function
function debugPoshIssue() {
    console.log('🎫 ===== COMPREHENSIVE POSH DEBUG ANALYSIS =====');

    if (!window.checkoutNav) {
        console.error('🎫 CRITICAL: window.checkoutNav not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;
    const modal = window.checkoutNav.modal;

    if (!iframe) {
        console.error('🎫 CRITICAL: iframe not found!');
        return;
    }

    console.log('🎫 1. IFRAME STATE:');
    console.log('   - src:', iframe.src);
    console.log('   - style.height:', iframe.style.height);
    console.log('   - offsetHeight:', iframe.offsetHeight);
    console.log('   - computedHeight:', window.getComputedStyle(iframe).height);
    console.log('   - computedMaxHeight:', window.getComputedStyle(iframe).maxHeight);

    console.log('🎫 2. MODAL STATE:');
    if (modal) {
        const modalContent = modal.querySelector('.modal-content');
        console.log('   - modal found:', true);
        console.log('   - modal.style.maxHeight:', modal.style.maxHeight);
        console.log('   - modal computedMaxHeight:', window.getComputedStyle(modal).maxHeight);

        if (modalContent) {
            console.log('   - modalContent found:', true);
            console.log('   - modalContent.style.maxHeight:', modalContent.style.maxHeight);
            console.log('   - modalContent computedMaxHeight:', window.getComputedStyle(modalContent).maxHeight);
        } else {
            console.log('   - modalContent found:', false);
        }
    } else {
        console.log('   - modal found:', false);
    }

    console.log('🎫 3. POSH DETECTION:');
    const isPosh = iframe.src && (iframe.src.includes('posh.vip') || iframe.src.includes('posh.'));
    console.log('   - isPoshEmbed:', isPosh);

    if (isPosh) {
        console.log('🎫 4. FORCING POSH HEIGHT NOW...');
        const forceHeight = 1200;

        // Remove ALL constraints
        iframe.style.height = forceHeight + 'px';
        iframe.style.maxHeight = 'none';
        iframe.style.minHeight = 'auto';

        if (modal) {
            modal.style.maxHeight = 'none';
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.maxHeight = 'none';
                modalContent.style.height = 'auto';
            }
        }

        console.log('🎫 5. FORCED HEIGHT APPLIED - checking results...');

        setTimeout(() => {
            console.log('🎫 6. POST-FORCE VERIFICATION:');
            console.log('   - iframe.style.height:', iframe.style.height);
            console.log('   - iframe.offsetHeight:', iframe.offsetHeight);
            console.log('   - Height successfully applied:', iframe.offsetHeight >= forceHeight * 0.9);

            if (iframe.offsetHeight < forceHeight * 0.9) {
                console.error('🎫 PROBLEM: Height was not applied correctly!');
                console.log('🎫 Checking for CSS overrides...');

                const computedStyle = window.getComputedStyle(iframe);
                console.log('   - computedMaxHeight:', computedStyle.maxHeight);
                console.log('   - computedHeight:', computedStyle.height);
                console.log('   - computedMinHeight:', computedStyle.minHeight);
            } else {
                console.log('🎫 SUCCESS: Height was applied correctly!');
            }
        }, 200);
    }

    console.log('🎫 ===== END DEBUG ANALYSIS =====');
}

// Simple test function to open modal without complex logic
function testOpenModal() {
    console.log('🎫 SIMPLE modal test...');

    try {
        const modal = document.querySelector('.checkout-modal');
        if (modal) {
            modal.classList.add('active');
            console.log('🎫 Modal opened successfully with simple method');
        } else {
            console.error('🎫 Modal element not found');
        }
    } catch (error) {
        console.error('🎫 Error in testOpenModal:', error);
    }
}

// Function to manually set ticket URL for testing
function setTestTicketUrl(url) {
    console.log('🎫 Setting test ticket URL:', url);

    if (!window.checkoutNav || !window.checkoutNav.iframe) {
        console.error('🎫 CRITICAL: iframe not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;

    // Set the data attribute
    iframe.setAttribute('data-ticket-url', url);
    iframe.dataset.ticketUrl = url;

    console.log('🎫 Test URL set successfully');
    console.log('🎫 You can now try opening the modal with openCheckoutModal()');
}

// Function to test with a sample Posh URL
function testWithSamplePoshUrl() {
    // Use a sample Posh URL for testing
    const samplePoshUrl = 'https://embed.posh.vip/ticket-iframe/sample-event';
    console.log('🎫 Setting sample Posh URL for testing...');
    setTestTicketUrl(samplePoshUrl);
}

// Function to test the current Posh URL in a new window
function testPoshUrlInNewWindow() {
    console.log('🎫 Testing current Posh URL in new window...');

    if (!window.checkoutNav || !window.checkoutNav.iframe) {
        console.error('🎫 iframe not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;
    let currentUrl = iframe.getAttribute('data-ticket-url');

    if (!currentUrl) {
        console.error('🎫 No URL found in data-ticket-url');
        return;
    }

    // Add https if missing
    if (!currentUrl.startsWith('http')) {
        currentUrl = 'https://' + currentUrl;
    }

    console.log('🎫 Testing URL:', currentUrl);

    // Open in new window
    const testWindow = window.open(currentUrl, '_blank', 'width=800,height=600');

    if (testWindow) {
        console.log('🎫 URL opened in new window - check if it loads correctly');
    } else {
        console.log('🎫 Failed to open URL (popup blocked?)');
    }
}

// Function to fix the current Posh URL by adding https protocol
function fixCurrentPoshUrl() {
    console.log('🎫 Attempting to fix current Posh URL...');

    if (!window.checkoutNav || !window.checkoutNav.iframe) {
        console.error('🎫 iframe not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;
    const currentUrl = iframe.getAttribute('data-ticket-url');

    console.log('🎫 Current URL:', currentUrl);

    if (currentUrl && !currentUrl.startsWith('http')) {
        const fixedUrl = 'https://' + currentUrl;
        console.log('🎫 Fixed URL:', fixedUrl);

        // Update the data attribute
        iframe.setAttribute('data-ticket-url', fixedUrl);
        iframe.dataset.ticketUrl = fixedUrl;

        console.log('🎫 URL fixed! Try openCheckoutModal() again');
    } else {
        console.log('🎫 URL already has protocol or is invalid');
    }
}

// EXTREME OPTION: Create a new iframe outside the modal to test
function testIframeOutsideModal() {
    console.log('🎫 EXTREME TEST: Creating iframe outside modal...');

    // Get the Posh URL
    const poshUrl = (window.checkoutNav && window.checkoutNav.iframe && window.checkoutNav.iframe.src) || 'https://embed.posh.vip/ticket-iframe/680fb268087c97aeac2468cb/';

    // Create a new iframe element
    const testIframe = document.createElement('iframe');
    testIframe.src = poshUrl;
    testIframe.style.width = '100%';
    testIframe.style.height = '1200px';
    testIframe.style.border = '2px solid red';
    testIframe.style.position = 'fixed';
    testIframe.style.top = '50px';
    testIframe.style.left = '50px';
    testIframe.style.zIndex = '9999';
    testIframe.style.backgroundColor = 'white';
    testIframe.id = 'testPoshIframe';

    // Remove any existing test iframe
    const existing = document.getElementById('testPoshIframe');
    if (existing) {
        existing.remove();
    }

    // Add to body
    document.body.appendChild(testIframe);

    console.log('🎫 Test iframe created outside modal');
    console.log('🎫 URL:', poshUrl);
    console.log('🎫 Check if this iframe shows full Posh content');
    console.log('🎫 Run removeTestIframe() to remove it');

    // Check height after load
    testIframe.onload = function() {
        setTimeout(() => {
            console.log('🎫 Test iframe loaded:');
            console.log('  - offsetHeight:', testIframe.offsetHeight);
            console.log('  - style.height:', testIframe.style.height);
            console.log('  - Does it show full content?');
        }, 1000);
    };
}

// Function to remove test iframe
function removeTestIframe() {
    const testIframe = document.getElementById('testPoshIframe');
    if (testIframe) {
        testIframe.remove();
        console.log('🎫 Test iframe removed');
    } else {
        console.log('🎫 No test iframe found');
    }
}

// REMOVED: Manual testing functions no longer needed with fixed sizing

// REFINED: Create properly-sized modal with glassmorphism that fits Posh content
function createOptimalPoshModal() {
    console.log('🎫 Using pure CSS styling like working homepage - no JavaScript overrides needed');

    // The modal will use the exact same CSS styling as the working home page
    // No JavaScript modifications needed - let figma-home.css handle all styling
}

// ENHANCED: Add close button and improve modal UX
function enhanceOptimalModal() {
    console.log('🎫 ENHANCING OPTIMAL MODAL UX...');

    if (!window.checkoutNav || !window.checkoutNav.modal) {
        console.error('🎫 Modal not found!');
        return;
    }

    const modal = window.checkoutNav.modal;
    const modalContent = modal.querySelector('.modal-content');

    if (!modalContent) {
        console.error('🎫 Modal content not found!');
        return;
    }

    // Add close button if it doesn't exist
    let closeButton = modalContent.querySelector('.enhanced-close-button');
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.className = 'enhanced-close-button';
        closeButton.innerHTML = '×';
        closeButton.setAttribute('aria-label', 'Close ticket modal');

        // Close button styling
        closeButton.style.setProperty('position', 'absolute', 'important');
        closeButton.style.setProperty('top', '16px', 'important');
        closeButton.style.setProperty('right', '16px', 'important');
        closeButton.style.setProperty('width', '32px', 'important');
        closeButton.style.setProperty('height', '32px', 'important');
        closeButton.style.setProperty('border', 'none', 'important');
        closeButton.style.setProperty('border-radius', '50%', 'important');
        closeButton.style.setProperty('background', 'rgba(0, 0, 0, 0.1)', 'important');
        closeButton.style.setProperty('color', '#333', 'important');
        closeButton.style.setProperty('font-size', '20px', 'important');
        closeButton.style.setProperty('font-weight', 'bold', 'important');
        closeButton.style.setProperty('cursor', 'pointer', 'important');
        closeButton.style.setProperty('display', 'flex', 'important');
        closeButton.style.setProperty('align-items', 'center', 'important');
        closeButton.style.setProperty('justify-content', 'center', 'important');
        closeButton.style.setProperty('z-index', '10', 'important');
        closeButton.style.setProperty('transition', 'all 0.2s ease', 'important');

        // Hover effects
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.background = 'rgba(0, 0, 0, 0.2)';
            closeButton.style.transform = 'scale(1.1)';
        });

        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.background = 'rgba(0, 0, 0, 0.1)';
            closeButton.style.transform = 'scale(1)';
        });

        // Close functionality
        closeButton.addEventListener('click', () => {
            if (window.checkoutNav && window.checkoutNav.closeModal) {
                window.checkoutNav.closeModal();
            }
        });

        // Make modal content relative for absolute positioning
        modalContent.style.setProperty('position', 'relative', 'important');

        // Add close button to modal
        modalContent.appendChild(closeButton);

        console.log('🎫 Enhanced close button added');
    }

    // Add title if it doesn't exist
    let title = modalContent.querySelector('.modal-title');
    if (!title) {
        title = document.createElement('h2');
        title.className = 'modal-title';
        title.textContent = 'Purchase Tickets';

        // Title styling
        title.style.setProperty('margin', '0 0 16px 0', 'important');
        title.style.setProperty('padding', '0', 'important');
        title.style.setProperty('font-size', '24px', 'important');
        title.style.setProperty('font-weight', '600', 'important');
        title.style.setProperty('color', '#333', 'important');
        title.style.setProperty('text-align', 'center', 'important');

        // Insert title before iframe
        const iframe = modalContent.querySelector('#poshIframe');
        if (iframe) {
            modalContent.insertBefore(title, iframe);
        } else {
            modalContent.insertBefore(title, modalContent.firstChild);
        }

        console.log('🎫 Modal title added');
    }

    console.log('🎫 Modal UX enhanced with close button and title');
}

// AGGRESSIVE: Completely remove modal constraints and make it behave like external iframe
function destroyModalConstraints() {
    console.log('🎫 DESTROYING ALL MODAL CONSTRAINTS...');

    if (!window.checkoutNav || !window.checkoutNav.iframe) {
        console.error('🎫 Modal iframe not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;
    const modal = window.checkoutNav.modal;
    const modalContent = modal && modal.querySelector('.modal-content');

    console.log('🎫 BEFORE constraint destruction:');
    console.log('  - iframe.offsetHeight:', iframe.offsetHeight);
    console.log('  - modal.offsetHeight:', modal.offsetHeight);
    console.log('  - modalContent.offsetHeight:', modalContent && modalContent.offsetHeight);

    // DESTROY ALL MODAL CONSTRAINTS
    if (modal) {
        // Remove ALL height/width constraints from modal
        modal.style.setProperty('position', 'fixed', 'important');
        modal.style.setProperty('top', '0', 'important');
        modal.style.setProperty('left', '0', 'important');
        modal.style.setProperty('width', '100vw', 'important');
        modal.style.setProperty('height', '100vh', 'important');
        modal.style.setProperty('max-height', 'none', 'important');
        modal.style.setProperty('max-width', 'none', 'important');
        modal.style.setProperty('overflow', 'auto', 'important');
        modal.style.setProperty('padding', '0', 'important');
        modal.style.setProperty('margin', '0', 'important');
        modal.style.setProperty('display', 'flex', 'important');
        modal.style.setProperty('align-items', 'center', 'important');
        modal.style.setProperty('justify-content', 'center', 'important');
    }

    // DESTROY ALL MODAL CONTENT CONSTRAINTS
    if (modalContent) {
        modalContent.style.setProperty('width', '90vw', 'important');
        modalContent.style.setProperty('height', 'auto', 'important');
        modalContent.style.setProperty('max-height', 'none', 'important');
        modalContent.style.setProperty('max-width', 'none', 'important');
        modalContent.style.setProperty('overflow', 'visible', 'important');
        modalContent.style.setProperty('padding', '20px', 'important');
        modalContent.style.setProperty('margin', '0', 'important');
        modalContent.style.setProperty('display', 'flex', 'important');
        modalContent.style.setProperty('flex-direction', 'column', 'important');
        modalContent.style.setProperty('min-height', '1300px', 'important');
    }

    // FORCE IFRAME TO EXACT EXTERNAL DIMENSIONS
    iframe.style.setProperty('width', '100%', 'important');
    iframe.style.setProperty('height', '1200px', 'important');
    iframe.style.setProperty('min-height', '1200px', 'important');
    iframe.style.setProperty('max-height', 'none', 'important');
    iframe.style.setProperty('border', 'none', 'important');
    iframe.style.setProperty('margin', '0', 'important');
    iframe.style.setProperty('padding', '0', 'important');
    iframe.style.setProperty('overflow', 'visible', 'important');
    iframe.style.setProperty('flex-shrink', '0', 'important');
    iframe.style.setProperty('flex-grow', '0', 'important');

    setTimeout(() => {
        console.log('🎫 AFTER constraint destruction:');
        console.log('  - iframe.offsetHeight:', iframe.offsetHeight);
        console.log('  - modal.offsetHeight:', modal.offsetHeight);
        console.log('  - modalContent.offsetHeight:', modalContent && modalContent.offsetHeight);
        console.log('  - Success:', iframe.offsetHeight >= 1100);

        if (iframe.offsetHeight >= 1100) {
            console.log('🎫 SUCCESS! Modal constraints destroyed - iframe should show full Posh content!');
        } else {
            console.log('🎫 Still constrained. Something deeper is limiting the iframe...');
        }
    }, 500);

    console.log('🎫 All modal constraints destroyed - modal should now behave like external iframe');
}

// SOLUTION: Apply the working external iframe approach to modal iframe
function fixModalIframeWithWorkingApproach() {
    console.log('🎫 APPLYING WORKING APPROACH to modal iframe...');

    if (!window.checkoutNav || !window.checkoutNav.iframe) {
        console.error('🎫 Modal iframe not found!');
        return;
    }

    const iframe = window.checkoutNav.iframe;
    const modal = window.checkoutNav.modal;
    const modalContent = modal && modal.querySelector('.modal-content');

    console.log('🎫 Before fix:');
    console.log('  - iframe.offsetHeight:', iframe.offsetHeight);
    console.log('  - iframe.style.height:', iframe.style.height);

    // Apply the EXACT same styles that worked for external iframe
    iframe.style.setProperty('width', '100%', 'important');
    iframe.style.setProperty('height', '1200px', 'important');
    iframe.style.setProperty('border', 'none', 'important');
    iframe.style.setProperty('background-color', 'transparent', 'important');
    iframe.style.setProperty('min-height', 'auto', 'important');
    iframe.style.setProperty('max-height', 'none', 'important');
    iframe.style.setProperty('overflow', 'visible', 'important');

    // Force modal content to accommodate the iframe
    if (modalContent) {
        modalContent.style.setProperty('max-height', 'none', 'important');
        modalContent.style.setProperty('height', 'auto', 'important');
        modalContent.style.setProperty('overflow', 'visible', 'important');
        modalContent.style.setProperty('padding', '20px', 'important');
        modalContent.style.setProperty('display', 'flex', 'important');
        modalContent.style.setProperty('flex-direction', 'column', 'important');
    }

    // Force modal to expand
    if (modal) {
        modal.style.setProperty('max-height', 'none', 'important');
        modal.style.setProperty('height', 'auto', 'important');
        modal.style.setProperty('overflow', 'auto', 'important');
        modal.style.setProperty('padding', '20px', 'important');
    }

    // Wait and verify the fix worked
    setTimeout(() => {
        console.log('🎫 After fix:');
        console.log('  - iframe.offsetHeight:', iframe.offsetHeight);
        console.log('  - iframe.style.height:', iframe.style.height);
        console.log('  - Fix successful:', iframe.offsetHeight >= 1000);

        if (iframe.offsetHeight >= 1000) {
            console.log('🎫 SUCCESS! Modal iframe now shows full Posh content!');
            console.log('🎫 Check the modal - you should see all ticket options without scrolling');
        } else {
            console.log('🎫 Still constrained. Checking what\'s limiting it...');
            const computed = window.getComputedStyle(iframe);
            console.log('  - computedHeight:', computed.height);
            console.log('  - computedMaxHeight:', computed.maxHeight);
            console.log('  - computedMinHeight:', computed.minHeight);
        }
    }, 500);

    console.log('🎫 Applied working external iframe approach to modal iframe');
}

// NUCLEAR OPTION: Force iframe to show all content
function forceIframeFullHeight() {
    if (window.checkoutNav && window.checkoutNav.iframe) {
        console.log('🎫 NUCLEAR OPTION: Forcing iframe to show ALL content...');

        const iframe = window.checkoutNav.iframe;
        const modal = window.checkoutNav.modal;
        const modalContent = modal && modal.querySelector('.modal-content');

        // EXTREME height forcing
        const extremeHeight = 1500;

        console.log('🎫 Before nuclear option:');
        console.log('  - iframe.style.height:', iframe.style.height);
        console.log('  - iframe.offsetHeight:', iframe.offsetHeight);
        console.log('  - iframe.scrollHeight:', iframe.scrollHeight);

        // Remove ALL possible constraints
        iframe.style.setProperty('height', extremeHeight + 'px', 'important');
        iframe.style.setProperty('max-height', 'none', 'important');
        iframe.style.setProperty('min-height', 'auto', 'important');
        iframe.style.setProperty('overflow', 'visible', 'important');

        // Force modal expansion
        if (modalContent) {
            modalContent.style.setProperty('max-height', 'none', 'important');
            modalContent.style.setProperty('height', 'auto', 'important');
            modalContent.style.setProperty('overflow', 'visible', 'important');
        }

        if (modal) {
            modal.style.setProperty('max-height', 'none', 'important');
            modal.style.setProperty('height', 'auto', 'important');
            modal.style.setProperty('overflow', 'visible', 'important');
        }

        // Wait and verify
        setTimeout(() => {
            console.log('🎫 After nuclear option:');
            console.log('  - iframe.style.height:', iframe.style.height);
            console.log('  - iframe.offsetHeight:', iframe.offsetHeight);
            console.log('  - Height successfully applied:', iframe.offsetHeight >= extremeHeight * 0.8);

            if (iframe.offsetHeight < extremeHeight * 0.8) {
                console.error('🎫 NUCLEAR OPTION FAILED! Something is still constraining the iframe');
                console.log('🎫 Checking computed styles...');
                const computed = window.getComputedStyle(iframe);
                console.log('  - computedHeight:', computed.height);
                console.log('  - computedMaxHeight:', computed.maxHeight);
                console.log('  - computedMinHeight:', computed.minHeight);
                console.log('  - computedOverflow:', computed.overflow);
            } else {
                console.log('🎫 SUCCESS! Iframe height forced successfully');
            }
        }, 200);

        console.log(`🎫 NUCLEAR OPTION applied: ${extremeHeight}px with !important`);
    } else {
        console.error('🎫 window.checkoutNav or iframe not found!');
    }
}

// Global function to FORCE large height immediately - no more scrolling!
function forceNoScrollHeight() {
    if (window.checkoutNav && window.checkoutNav.iframe) {
        console.log('🎫 FORCING large height to eliminate scrolling...');

        // Force a very large height
        const forceHeight = 1200;

        // DIRECT DOM manipulation - bypass all constraints
        const iframe = window.checkoutNav.iframe;
        const modal = window.checkoutNav.modal;
        const modalContent = modal && modal.querySelector('.modal-content');

        // Force iframe height
        iframe.style.height = forceHeight + 'px';
        iframe.style.maxHeight = 'none';
        iframe.style.minHeight = 'auto';

        // Force modal content to expand
        if (modalContent) {
            modalContent.style.maxHeight = 'none';
            modalContent.style.height = 'auto';
            modalContent.style.overflow = 'visible';
        }

        // Force modal itself to expand
        if (modal) {
            modal.style.maxHeight = 'none';
            modal.style.height = 'auto';
        }

        console.log(`🎫 FORCED height to ${forceHeight}px - ALL constraints removed`);
        console.log('🎫 Check if you can see all Posh content without scrolling now');
        console.log('🎫 Applied direct DOM manipulation to iframe, modal, and modal-content');
    } else {
        console.error('🎫 window.checkoutNav or iframe not found!');
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