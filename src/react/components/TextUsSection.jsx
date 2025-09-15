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
        paddingTop: '0', // 🚨 FIX: Remove top padding to align with YouTube video section
        paddingBottom: '0' // 🚨 FIX: Remove bottom padding for cleaner layout
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
          width: '100%', // 🚨 FIX: Use full width without extending beyond container
          height: '85px', // 🚨 FIX: Increased height significantly to show full iframe content including disclosure
          marginLeft: '0', // 🚨 FIX: Remove negative margins that cause overlap
          marginRight: '0', // 🚨 FIX: Remove negative margins that cause overlap
          marginBottom: '16px', // 🚨 FIX: Add bottom margin for extra separation from social buttons
          borderRadius: '8px',
          overflow: 'visible', // 🚨 FIX: Changed to visible to show all iframe content
          background: 'transparent'
        }}
      >
        <iframe
          id="laylo-drop-1nTsX"
          src="https://embed.laylo.com/?dropId=1nTsX&color=ff0409&theme=dark&background=solid&minimal=true&hideFooter=false&compact=false"
          style={{
            width: '100%',
            height: '85px', // 🚨 FIX: Match container height to show full content including disclosure
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
      </div>
    </div>
  );
};

export default TextUsSection;
