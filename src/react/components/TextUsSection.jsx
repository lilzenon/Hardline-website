import React from 'react';

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
        gap: `${Math.max(6, Math.round(scaledDimensions.scale * 8))}px`, // Responsive gap to match other sections
        flexShrink: 0,
        paddingTop: '8px',
        paddingBottom: '8px'
      }}
    >
      {/* Follow Us Title - Standardized Typography */}
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
        Follow Us
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
