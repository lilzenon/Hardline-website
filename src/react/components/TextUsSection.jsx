import React from 'react';

const TextUsSection = ({ scaledDimensions }) => {
  // Calculate width to match Events section actual rendered width exactly
  const calculatedWidth = Math.round(scaledDimensions.eventsWidth);

  return (
    <div
      style={{
        display: 'flex',
        width: `${calculatedWidth}px`,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        gap: '8px',
        flexShrink: 0,
        paddingTop: '8px',
        paddingBottom: '8px'
      }}
    >
      {/* Text us Title - Standardized Typography */}
      <div
        style={{
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: `${Math.max(20, Math.round(scaledDimensions.scale * 26))}px`, // Match Events/Up Next titles
          fontWeight: '800',
          lineHeight: 'normal',
          letterSpacing: '-0.02em', // Match other titles
          margin: '0',
          padding: '0',
          height: `${Math.max(20, Math.round(scaledDimensions.scale * 26))}px`, // Explicit height to match other titles
          display: 'flex',
          alignItems: 'center' // Center text vertically within the height
        }}
      >
        Text us
      </div>

      {/* Subtext - Standardized Typography */}
      <div
        style={{
          color: '#FFF',
          fontFamily: 'Inter',
          fontSize: `${Math.max(10, Math.round(scaledDimensions.scale * 12))}px`, // Proportional scaling
          fontWeight: '300',
          lineHeight: 'normal',
          margin: '0',
          padding: '0',
          opacity: 0.8 // Subtle opacity for hierarchy
        }}
      >
        Exclusive events, contests, and more
      </div>

      {/* Laylo Iframe - Compensated for Internal Padding */}
      <iframe
        id="laylo-drop-1nTsX"
        src="https://embed.laylo.com/?dropId=1nTsX&color=ff0409&theme=dark&background=solid&minimal=true"
        style={{
          width: 'calc(100% + 32px)', // Extend width to compensate for internal padding
          height: '60px',
          maxWidth: `calc(${calculatedWidth}px + 32px)`, // Use calculated width for proper proportions
          border: 'none',
          borderRadius: '8px',
          background: 'transparent',
          marginLeft: '-16px', // Negative margin to center the extended width
          marginRight: '-16px', // Negative margin to center the extended width
          transform: 'translateX(0)', // Ensure proper positioning
          overflow: 'hidden' // Hide any overflow from the extended width
        }}
        allow="web-share"
        title="Laylo Signup Form"
      />
    </div>
  );
};

export default TextUsSection;
