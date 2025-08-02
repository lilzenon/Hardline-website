import DOMPurify from 'dompurify';

/**
 * Frontend XSS Protection Utilities
 * Provides comprehensive sanitization for user inputs and dynamic content
 */

/**
 * Default DOMPurify configuration for general content
 */
const DEFAULT_CONFIG = {
    ALLOWED_TAGS: [
        'p', 'br', 'strong', 'em', 'u', 'i', 'b', 'span', 'div',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'a', 'img',
        'blockquote', 'code', 'pre'
    ],
    ALLOWED_ATTR: [
        'href', 'title', 'alt', 'src', 'width', 'height',
        'class', 'id', 'style'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_DOM_IMPORT: false,
    SANITIZE_DOM: true,
    WHOLE_DOCUMENT: false,
    FORCE_BODY: false
};

/**
 * Strict configuration for user inputs (no HTML allowed)
 */
const STRICT_CONFIG = {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    ALLOW_DATA_ATTR: false
};

/**
 * Configuration for rich text content (more permissive)
 */
const RICH_TEXT_CONFIG = {
    ...DEFAULT_CONFIG,
    ALLOWED_TAGS: [
        ...DEFAULT_CONFIG.ALLOWED_TAGS,
        'table', 'thead', 'tbody', 'tr', 'td', 'th',
        'hr', 'small', 'sub', 'sup'
    ],
    ALLOWED_ATTR: [
        ...DEFAULT_CONFIG.ALLOWED_ATTR,
        'colspan', 'rowspan', 'cellpadding', 'cellspacing'
    ]
};

/**
 * Configuration for event descriptions (moderate permissiveness)
 */
const EVENT_DESCRIPTION_CONFIG = {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'i', 'b', 'span', 'a'],
    ALLOWED_ATTR: ['href', 'title', 'class'],
    ALLOWED_URI_REGEXP: /^https?:\/\//i,
    KEEP_CONTENT: true
};

/**
 * Sanitize HTML content with default configuration
 * @param {string} dirty - The potentially unsafe HTML string
 * @param {Object} config - Optional DOMPurify configuration
 * @returns {string} - Sanitized HTML string
 */
export function sanitizeHtml(dirty, config = DEFAULT_CONFIG) {
    if (!dirty || typeof dirty !== 'string') {
        return '';
    }
    
    try {
        return DOMPurify.sanitize(dirty, config);
    } catch (error) {
        console.error('HTML sanitization error:', error);
        return ''; // Return empty string on error for safety
    }
}

/**
 * Sanitize user input (strips all HTML)
 * @param {string} input - User input string
 * @returns {string} - Sanitized plain text
 */
export function sanitizeUserInput(input) {
    return sanitizeHtml(input, STRICT_CONFIG);
}

/**
 * Sanitize rich text content (allows more HTML tags)
 * @param {string} content - Rich text content
 * @returns {string} - Sanitized HTML
 */
export function sanitizeRichText(content) {
    return sanitizeHtml(content, RICH_TEXT_CONFIG);
}

/**
 * Sanitize event description content
 * @param {string} description - Event description
 * @returns {string} - Sanitized HTML
 */
export function sanitizeEventDescription(description) {
    return sanitizeHtml(description, EVENT_DESCRIPTION_CONFIG);
}

/**
 * Sanitize URL to prevent javascript: and data: URLs
 * @param {string} url - URL to sanitize
 * @returns {string} - Sanitized URL or empty string if unsafe
 */
export function sanitizeUrl(url) {
    if (!url || typeof url !== 'string') {
        return '';
    }
    
    // Remove any whitespace
    const cleanUrl = url.trim();
    
    // Check for dangerous protocols
    const dangerousProtocols = /^(javascript|data|vbscript|file|about):/i;
    if (dangerousProtocols.test(cleanUrl)) {
        return '';
    }
    
    // Allow relative URLs, http, https, mailto, tel
    const allowedProtocols = /^(https?|mailto|tel|\/)/i;
    if (!allowedProtocols.test(cleanUrl) && !cleanUrl.startsWith('/')) {
        return '';
    }
    
    return cleanUrl;
}

/**
 * Sanitize CSS to prevent CSS injection attacks
 * @param {string} css - CSS string
 * @returns {string} - Sanitized CSS
 */
export function sanitizeCss(css) {
    if (!css || typeof css !== 'string') {
        return '';
    }
    
    // Remove dangerous CSS properties and values
    const dangerousPatterns = [
        /expression\s*\(/gi,
        /javascript\s*:/gi,
        /vbscript\s*:/gi,
        /data\s*:/gi,
        /import\s*['"]/gi,
        /@import/gi,
        /binding\s*:/gi,
        /behavior\s*:/gi
    ];
    
    let sanitized = css;
    dangerousPatterns.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
    });
    
    return sanitized;
}

/**
 * React component wrapper for safely rendering HTML
 * @param {Object} props - Component props
 * @param {string} props.html - HTML content to render
 * @param {Object} props.config - DOMPurify configuration
 * @param {string} props.className - CSS class name
 * @returns {JSX.Element} - Safe HTML component
 */
export function SafeHtml({ html, config = DEFAULT_CONFIG, className = '', ...props }) {
    const sanitizedHtml = sanitizeHtml(html, config);
    
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            {...props}
        />
    );
}

/**
 * Hook for sanitizing form inputs in real-time
 * @param {string} initialValue - Initial input value
 * @param {Object} config - Sanitization configuration
 * @returns {Array} - [sanitizedValue, setSanitizedValue, rawValue, setRawValue]
 */
export function useSanitizedInput(initialValue = '', config = STRICT_CONFIG) {
    const [rawValue, setRawValue] = React.useState(initialValue);
    const [sanitizedValue, setSanitizedValue] = React.useState(
        sanitizeHtml(initialValue, config)
    );
    
    const updateValue = React.useCallback((newValue) => {
        setRawValue(newValue);
        setSanitizedValue(sanitizeHtml(newValue, config));
    }, [config]);
    
    return [sanitizedValue, updateValue, rawValue, setRawValue];
}

/**
 * Validate and sanitize form data object
 * @param {Object} formData - Form data object
 * @param {Object} fieldConfigs - Configuration for each field
 * @returns {Object} - Sanitized form data
 */
export function sanitizeFormData(formData, fieldConfigs = {}) {
    const sanitized = {};
    
    Object.keys(formData).forEach(key => {
        const value = formData[key];
        const config = fieldConfigs[key] || STRICT_CONFIG;
        
        if (typeof value === 'string') {
            sanitized[key] = sanitizeHtml(value, config);
        } else if (Array.isArray(value)) {
            sanitized[key] = value.map(item => 
                typeof item === 'string' ? sanitizeHtml(item, config) : item
            );
        } else {
            sanitized[key] = value;
        }
    });
    
    return sanitized;
}

/**
 * Sanitize search query to prevent injection attacks
 * @param {string} query - Search query
 * @returns {string} - Sanitized query
 */
export function sanitizeSearchQuery(query) {
    if (!query || typeof query !== 'string') {
        return '';
    }
    
    // Remove special characters that could be used for injection
    return query
        .replace(/[<>'"&]/g, '') // Remove HTML/XML chars
        .replace(/[;(){}[\]]/g, '') // Remove SQL/NoSQL injection chars
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim()
        .substring(0, 100); // Limit length
}

// Export configurations for custom use
export const sanitizerConfigs = {
    DEFAULT_CONFIG,
    STRICT_CONFIG,
    RICH_TEXT_CONFIG,
    EVENT_DESCRIPTION_CONFIG
};
