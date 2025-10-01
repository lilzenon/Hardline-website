import React from 'react';

/**
 * Breadcrumb Component
 * 
 * Provides breadcrumb navigation for better UX and SEO.
 * Matches the glassmorphism design system.
 * 
 * Props:
 * - items: Array of breadcrumb items { name: string, url?: string }
 * - separator: String separator between items (default: '›')
 * 
 * Example:
 * <Breadcrumb items={[
 *   { name: 'Home', url: '/' },
 *   { name: 'About' }
 * ]} />
 */
const Breadcrumb = ({ items = [], separator = '›' }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: '16px 20px',
        marginBottom: '20px'
      }}
    >
      <ol
        style={{
          display: 'flex',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: '8px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {index > 0 && (
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  userSelect: 'none'
                }}
                aria-hidden="true"
              >
                {separator}
              </span>
            )}
            {item.url ? (
              <a
                href={item.url}
                style={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#319DFF';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                {item.name}
              </a>
            ) : (
              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#FFFFFF'
                }}
                aria-current="page"
              >
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

