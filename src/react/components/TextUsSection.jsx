import React from 'react';
import LayloIframeSimple from './LayloIframeSimple';

/**
 * TextUsSection - Desktop Laylo integration
 * Uses the same LayloIframeSimple component as mobile for consistent SDK loading
 * Glassmorphism styling matches desktop event cards
 */
const TextUsSection = ({ scaledDimensions }) => {
  // Calculate width to match Events section exactly for proper alignment
  const calculatedWidth = Math.round(scaledDimensions.eventsWidth);

  return (
    <div
      style={{
        display: 'flex',
        width: `${calculatedWidth}px`,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexShrink: 1,
        paddingTop: '0',
        paddingBottom: '0'
      }}
    >
      {/* Glassmorphism Card Container - Matches desktop event card styling */}
      <article
        style={{
          width: '100%',
          // Glassmorphism styling matching desktop event cards exactly
          background: 'rgba(22, 22, 22, 0.30)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '16px',
          // No padding needed - iframe fills entire card
          padding: '0',
          boxSizing: 'border-box',
          overflow: 'hidden' // Clip iframe to card border radius
        }}
      >
        {/* Laylo Iframe - No title/subtitle, fills entire card */}
        <div
          style={{
            width: '100%',
            minHeight: '150px', // Increased height to show full Laylo form content
            borderRadius: '16px',
            overflow: 'visible', // Allow content to be fully visible
            background: 'transparent'
          }}
        >
          <LayloIframeSimple
            dropId="1nTsX"
            color="f60509"
            theme="dark"
            background="transparent"
            minimal={true}
            visible={true}
            style={{
              width: '100%',
              minHeight: '150px',
              border: 'none',
              borderRadius: '16px',
              background: 'transparent',
              display: 'block'
            }}
          />
        </div>
      </article>
    </div>
  );
};

export default TextUsSection;
