import React from 'react';

const TextUsSection = ({ scaledDimensions }) => {
  // Calculate width to match Events section exactly for proper alignment
  const calculatedWidth = Math.round(scaledDimensions.eventsWidth);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%', // Use full width of parent container for responsive behavior
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        gap: `${Math.max(6, Math.round(scaledDimensions.scale * 8))}px`, // Responsive gap to match other sections
        flexShrink: 1, // Allow shrinking for responsive behavior
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

      {/* Laylo Iframe - Optimized to Hide Footer Content */}
      <div
        style={{
          position: 'relative',
          width: 'calc(100% + 32px)',
          height: '60px',
          marginLeft: '-16px',
          marginRight: '-16px',
          borderRadius: '8px',
          overflow: 'hidden', // Hide any content that extends beyond container
          background: 'transparent'
        }}
      >
        <iframe
          id="laylo-drop-1nTsX"
          src="https://embed.laylo.com/?dropId=1nTsX&color=ff0409&theme=dark&background=solid&minimal=true&hideFooter=true&compact=true"
          style={{
            width: '100%',
            height: '80px', // Slightly taller to accommodate content but footer will be hidden by container
            border: 'none',
            borderRadius: '8px',
            background: 'transparent',
            transform: 'translateX(0)',
            position: 'relative',
            top: '0px' // Ensure proper positioning to show main content
          }}
          scrolling="no" // Disable scrolling to prevent footer access
          allow="web-share"
          title="Laylo Signup Form"
        />

        {/* Footer Mask - Hide any footer content that might appear */}
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '0px',
            right: '0px',
            height: '20px', // Mask the bottom 20px where footer might appear
            background: 'transparent',
            pointerEvents: 'none', // Allow clicks to pass through
            zIndex: 1
          }}
        />
      </div>
    </div>
  );
};

export default TextUsSection;
