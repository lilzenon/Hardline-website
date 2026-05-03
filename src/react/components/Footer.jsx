import React from 'react';

/**
 * Footer Component
 *
 * Modern mobile-optimized footer with navigation links for SEO purposes.
 * Solid black background matching site aesthetic with proper iOS safe area support.
 *
 * Mobile Footer Best Practices Applied:
 * - Solid black background (#000000) matching page background for seamless integration
 * - Subtle top border for visual separation
 * - Adequate padding (16px+ on mobile) for comfortable touch interactions
 * - 44px minimum touch targets for all interactive elements (WCAG 2.1 AA)
 * - Safe-area-inset-bottom for iOS home indicator compatibility
 * - Centered content with proper spacing (8px grid system)
 * - Links stacked or in a single row depending on space
 * - Inter font family for consistency with site design
 * - Natural document flow positioning (not fixed/sticky)
 *
 * @param {Object} props
 * @param {boolean} props.compact - Use compact mobile layout (default: false)
 *
 * Example:
 *   <Footer compact={true} />
 */
const Footer = ({ compact = false }) => {
  // Link styling helper for hover/touch states
  const linkBaseStyle = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    fontSize: compact ? '14px' : '14px', // Slightly larger for better readability on mobile
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    // Ensure 44px minimum touch target (WCAG 2.1 AA compliance)
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '44px',
    minWidth: '44px',
    padding: '0 12px' // Increased horizontal padding for easier tapping
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      style={{
        // Full width - override parent's alignItems: 'center'
        width: '100%',
        alignSelf: 'stretch', // CRITICAL: Override flex parent's centering
        flexShrink: 0, // Prevent footer from shrinking
        // Solid black background - matches page background for seamless look
        background: '#000000',
        // Subtle top border for visual separation from content
        borderTop: '1px solid rgba(56, 56, 56, 0.3)',
        // Padding: top includes safe-area for iOS, generous horizontal padding
        // Bottom padding includes safe-area-inset-bottom for iOS home indicator
        paddingTop: compact ? '16px' : '16px', // Reduced for slimmer look
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingBottom: compact
          ? 'calc(16px + env(safe-area-inset-bottom, 0px))'
          : 'calc(16px + env(safe-area-inset-bottom, 0px))', // Reduced
        // Top margin for separation from page content (8px grid)
        marginTop: compact ? '16px' : '24px',
        marginBottom: 0, // No extra space below footer
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          // Content container - centered with appropriate max-width
          maxWidth: compact ? '430px' : '1200px', // Match mobile page width
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: compact ? '12px' : '16px' // Slightly more gap for better spacing
        }}
      >
        {/* Navigation Links */}
        <nav
          aria-label="Footer navigation"
          style={{
            display: 'flex',
            gap: compact ? '4px' : '16px', // Tighter gap since links have padding
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <a
            href="/"
            aria-label="Go to Events page"
            style={linkBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
          >
            Events
          </a>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: compact ? '10px' : '12px'
            }}
            aria-hidden="true"
          >
            •
          </span>
          <a
            href="/about"
            aria-label="Go to About page"
            style={linkBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
          >
            About
          </a>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: compact ? '10px' : '12px'
            }}
            aria-hidden="true"
          >
            •
          </span>
          <a
            href="/faq"
            aria-label="Go to FAQ page"
            style={linkBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
          >
            FAQ
          </a>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.3)',
              fontSize: compact ? '10px' : '12px'
            }}
            aria-hidden="true"
          >
            •
          </span>
          <a
            href="/terms"
            aria-label="Go to Terms page"
            style={linkBaseStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.color = '#FFFFFF';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
            }}
          >
            Terms
          </a>
        </nav>

        {/* Copyright */}
        <p
          style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: compact ? '11px' : '12px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.5)',
            margin: 0,
            lineHeight: '1.5',
            textAlign: 'center'
          }}
        >
          © {new Date().getFullYear()} HARDLINE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

