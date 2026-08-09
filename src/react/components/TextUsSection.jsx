import React from 'react';
import LayloIframeSimple from './LayloIframeSimple';

/**
 * TextUsSection - Desktop Laylo integration
 * Uses the same LayloIframeSimple component as mobile for consistent SDK loading
 * Glassmorphism styling matches desktop event cards
 */
const TextUsSection = ({ scaledDimensions }) => {
  // Width is owned by the parent column (the Follow Us column on desktop), so
  // this just fills it. It used to hard-code scaledDimensions.eventsWidth, which
  // no longer matches the column it lives in.
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexShrink: 1,
        paddingTop: '0',
        paddingBottom: '0'
      }}
    >
      {/* Card Container - Solid background to prevent visual artifacts */}
      <article
        style={{
          width: '100%',
          // Solid background instead of blur for cleaner rendering
          background: 'rgba(22, 22, 22, 0.50)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: '0',
          boxSizing: 'border-box',
          overflow: 'hidden',
          isolation: 'isolate'
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
            dropId="GMpip"
            color="ff0202"
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
