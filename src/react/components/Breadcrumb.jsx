import React from 'react';

/**
 * Breadcrumb Component
 *
 * Provides breadcrumb navigation for better UX and SEO.
 * Matches the glassmorphism design system and ProductPage styling.
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
        padding: '0',
        marginBottom: '0'
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
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px', // MATCH PRODUCTPAGEMOBILE
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
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px', // MATCH PRODUCTPAGEMOBILE
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.5)', // MATCH PRODUCTPAGEMOBILE
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#f90d0d';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = 'rgba(255, 255, 255, 0.5)';
                }}
              >
                {item.name}
              </a>
            ) : (
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px', // MATCH PRODUCTPAGEMOBILE
                  fontWeight: '500',
                  color: 'rgba(255, 255, 255, 0.7)' // MATCH PRODUCTPAGEMOBILE
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

