/**
 * Frontend Security Utilities
 * Additional security measures for React components
 */

/**
 * Secure API request wrapper with CSRF protection
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise} - Fetch response
 */
export async function secureApiRequest(url, options = {}) {
    // Get CSRF token from meta tag or cookie
    const csrfToken = getCSRFToken();

    const secureOptions = {
        ...options,
        credentials: 'include', // Always include cookies
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest', // AJAX indicator
            ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
            ...options.headers
        }
    };

    // Add request timestamp for replay attack prevention
    if (secureOptions.body && typeof secureOptions.body === 'string') {
        try {
            const bodyData = JSON.parse(secureOptions.body);
            bodyData._timestamp = Date.now();
            secureOptions.body = JSON.stringify(bodyData);
        } catch (e) {
            // If body is not JSON, add timestamp as header
            secureOptions.headers['X-Request-Timestamp'] = Date.now().toString();
        }
    }

    try {
        const response = await fetch(url, secureOptions);

        // Check for security headers in response
        validateSecurityHeaders(response);

        return response;
    } catch (error) {
        console.error('Secure API request failed:', error);
        throw error;
    }
}

/**
 * Get CSRF token from various sources
 * @returns {string|null} - CSRF token
 */
function getCSRFToken() {
    // Try meta tag first
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
        return metaTag.getAttribute('content');
    }

    // Try cookie
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'XSRF-TOKEN' || name === '_csrf') {
            return decodeURIComponent(value);
        }
    }

    return null;
}

/**
 * Validate security headers in API responses
 * @param {Response} response - Fetch response
 */
function validateSecurityHeaders(response) {
    const requiredHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'Referrer-Policy'
    ];

    const missingHeaders = requiredHeaders.filter(header =>
        !response.headers.get(header)
    );

    if (missingHeaders.length > 0) {
        console.warn('Missing security headers:', missingHeaders);
    }
}

/**
 * Secure local storage wrapper
 * Prevents XSS attacks through localStorage
 */
export const secureStorage = {
    /**
     * Set item in localStorage with validation
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     */
    setItem(key, value) {
        if (!this.isValidKey(key)) {
            throw new Error('Invalid storage key');
        }

        const sanitizedValue = this.sanitizeValue(value);
        localStorage.setItem(key, JSON.stringify(sanitizedValue));
    },

    /**
     * Get item from localStorage with validation
     * @param {string} key - Storage key
     * @returns {any} - Stored value
     */
    getItem(key) {
        if (!this.isValidKey(key)) {
            return null;
        }

        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error parsing stored item:', error);
            return null;
        }
    },

    /**
     * Remove item from localStorage
     * @param {string} key - Storage key
     */
    removeItem(key) {
        if (this.isValidKey(key)) {
            localStorage.removeItem(key);
        }
    },

    /**
     * Validate storage key
     * @param {string} key - Key to validate
     * @returns {boolean} - Is valid
     */
    isValidKey(key) {
        return typeof key === 'string' &&
            key.length > 0 &&
            key.length < 100 &&
            /^[a-zA-Z0-9_-]+$/.test(key);
    },

    /**
     * Sanitize value before storage
     * @param {any} value - Value to sanitize
     * @returns {any} - Sanitized value
     */
    sanitizeValue(value) {
        if (typeof value === 'string') {
            // Remove potential script tags and dangerous content
            return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        }
        return value;
    }
};

/**
 * Content Security Policy violation reporter
 */
export function setupCSPReporting() {
    // Listen for CSP violations
    document.addEventListener('securitypolicyviolation', (event) => {
        const violation = {
            blockedURI: event.blockedURI,
            violatedDirective: event.violatedDirective,
            originalPolicy: event.originalPolicy,
            sourceFile: event.sourceFile,
            lineNumber: event.lineNumber,
            columnNumber: event.columnNumber,
            timestamp: new Date().toISOString()
        };

        console.warn('CSP Violation:', violation);

        // Report to server (optional)
        if (window.location.hostname !== 'localhost') {
            secureApiRequest('/api/security/csp-violation', {
                method: 'POST',
                body: JSON.stringify(violation)
            }).catch(error => {
                console.error('Failed to report CSP violation:', error);
            });
        }
    });
}

/**
 * Detect if the current browser is an in-app browser (WebView)
 * These browsers appear as iframes but are legitimate browsing contexts
 * @returns {boolean} - True if running in an in-app browser
 */
function isInAppBrowser() {
    const userAgent = navigator.userAgent || navigator.vendor || '';

    // Common in-app browser signatures
    const inAppBrowserPatterns = [
        // Instagram
        /Instagram/i,
        // Facebook
        /FBAN|FBAV|FB_IAB|FBIOS|FBSS/i,
        // TikTok
        /musical_ly|TikTok|BytedanceWebview|ByteLocale/i,
        // Twitter/X
        /Twitter/i,
        // LinkedIn
        /LinkedInApp/i,
        // Snapchat
        /Snapchat/i,
        // Pinterest
        /Pinterest/i,
        // WeChat
        /MicroMessenger/i,
        // Line
        /Line\//i,
        // Generic WebView patterns
        /WebView|wv\)/i,
        // iOS WebView
        /AppleWebKit(?!.*Safari)/i,
        // Android WebView
        /; wv\)/i
    ];

    return inAppBrowserPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Detect and prevent clickjacking attacks
 * Skips protection for in-app browsers (Instagram, Facebook, etc.) which are legitimate contexts
 */
export function preventClickjacking() {
    // Skip clickjacking protection for in-app browsers
    // These appear as cross-origin iframes but are legitimate browsing contexts
    if (isInAppBrowser()) {
        console.log('✅ In-app browser detected, skipping clickjacking protection');
        return;
    }

    // Check if page is in an iframe
    if (window.top !== window.self) {
        // Check if it's an allowed iframe context
        const allowedOrigins = [
            window.location.origin,
            'https://b2b.click',
            'https://www.b2b.click',
            'https://bounce2bounce.com',
            'https://www.bounce2bounce.com'
        ];

        try {
            const parentOrigin = window.parent.location.origin;
            if (!allowedOrigins.includes(parentOrigin)) {
                // Potential clickjacking attempt
                console.warn('Potential clickjacking detected from:', parentOrigin);
                window.top.location = window.location;
            }
        } catch (error) {
            // Cross-origin iframe - only break out if NOT an in-app browser context
            // Double-check in-app browser in case userAgent wasn't detected earlier
            if (!isInAppBrowser()) {
                console.warn('Cross-origin iframe detected, attempting redirect');
                try {
                    window.top.location = window.location;
                } catch (redirectError) {
                    // If redirect fails, we're likely in a WebView that blocks it
                    // This is fine - the page will still render
                    console.log('Redirect blocked by WebView, continuing normally');
                }
            }
        }
    }
}

/**
 * Secure form submission handler
 * @param {HTMLFormElement} form - Form element
 * @param {Function} onSubmit - Submit handler
 */
export function secureFormSubmit(form, onSubmit) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validate form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Check for suspicious patterns
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'string' && containsSuspiciousContent(value)) {
                console.warn(`Suspicious content detected in field: ${key}`);
                return;
            }
        }

        // Add security metadata
        data._formId = form.id || 'unknown';
        data._timestamp = Date.now();
        data._userAgent = navigator.userAgent;

        try {
            await onSubmit(data);
        } catch (error) {
            console.error('Secure form submission failed:', error);
        }
    });
}

/**
 * Check for suspicious content in form inputs
 * @param {string} content - Content to check
 * @returns {boolean} - Contains suspicious content
 */
function containsSuspiciousContent(content) {
    const suspiciousPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/i,
        /vbscript:/i,
        /data:text\/html/i,
        /on\w+\s*=/i // Event handlers
    ];

    return suspiciousPatterns.some(pattern => pattern.test(content));
}

/**
 * Secure cookie management
 */
export const secureCookies = {
    /**
     * Set secure cookie
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {Object} options - Cookie options
     */
    set(name, value, options = {}) {
        const defaults = {
            secure: window.location.protocol === 'https:',
            sameSite: 'Strict',
            path: '/'
        };

        const cookieOptions = { ...defaults, ...options };
        let cookieString = `${name}=${encodeURIComponent(value)}`;

        if (cookieOptions.maxAge) {
            cookieString += `; Max-Age=${cookieOptions.maxAge}`;
        }

        if (cookieOptions.path) {
            cookieString += `; Path=${cookieOptions.path}`;
        }

        if (cookieOptions.secure) {
            cookieString += '; Secure';
        }

        if (cookieOptions.sameSite) {
            cookieString += `; SameSite=${cookieOptions.sameSite}`;
        }

        if (cookieOptions.httpOnly) {
            console.warn('HttpOnly cookies cannot be set from JavaScript');
        }

        document.cookie = cookieString;
    },

    /**
     * Get cookie value
     * @param {string} name - Cookie name
     * @returns {string|null} - Cookie value
     */
    get(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    },

    /**
     * Delete cookie
     * @param {string} name - Cookie name
     */
    delete(name) {
        this.set(name, '', { maxAge: 0 });
    }
};

/**
 * Initialize frontend security measures
 */
export function initializeFrontendSecurity() {
    // Set up CSP reporting
    setupCSPReporting();

    // Prevent clickjacking
    preventClickjacking();

    // Disable right-click context menu in production
    if (window.location.hostname !== 'localhost') {
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    }

    // Disable F12 and other developer shortcuts in production
    if (window.location.hostname !== 'localhost') {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'F12' ||
                (event.ctrlKey && event.shiftKey && event.key === 'I') ||
                (event.ctrlKey && event.shiftKey && event.key === 'C') ||
                (event.ctrlKey && event.key === 'U')) {
                event.preventDefault();
            }
        });
    }

    console.log('✅ Frontend security initialized');
}
