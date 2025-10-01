import React from 'react';
import SocialMediaButtons from './SocialMediaButtons';

/**
 * Footer Component
 *
 * Compact footer with navigation links for SEO purposes.
 * Minimal visual impact with small font sizes and compact layout.
 *
 * Features:
 * - Internal links to About, FAQ pages
 * - Social media integration
 * - Compact single-row layout on desktop
 * - Minimal padding and spacing
 */
const Footer = ({ compact = false }) => {
  return (
    <footer
      style={{
        width: '100%',
        padding: compact ? '20px 16px' : '24px 20px',
        marginTop: compact ? '20px' : '24px',
        background: 'transparent',
        borderTop: '1px solid rgba(56, 56, 56, 0.2)'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: compact ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: compact ? '12px' : '24px',
          flexWrap: 'wrap'
        }}
      >
        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            gap: compact ? '16px' : '20px',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <a
            href="/"
            style={{
              fontFamily: 'Inter',
              fontSize: compact ? '12px' : '13px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#319DFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            Events
          </a>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: compact ? '10px' : '12px' }}>•</span>
          <a
            href="/about"
            style={{
              fontFamily: 'Inter',
              fontSize: compact ? '12px' : '13px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#319DFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            About
          </a>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: compact ? '10px' : '12px' }}>•</span>
          <a
            href="/faq"
            style={{
              fontFamily: 'Inter',
              fontSize: compact ? '12px' : '13px',
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#319DFF';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.6)';
            }}
          >
            FAQ
          </a>
        </div>

        {/* Copyright */}
        {!compact && <span style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '12px' }}>•</span>}
        <p
          style={{
            fontFamily: 'Inter',
            fontSize: compact ? '11px' : '12px',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.5)',
            margin: 0,
            lineHeight: '1.5'
          }}
        >
          © {new Date().getFullYear()} BOUNCE2BOUNCE. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

