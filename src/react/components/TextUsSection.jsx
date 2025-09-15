import React from 'react';

const TextUsSection = ({ scaledDimensions }) => {
  // Calculate width to match Events section exactly for proper alignment
  const calculatedWidth = Math.round(scaledDimensions.eventsWidth);

  // 🚨 RESPONSIVE IFRAME HEIGHT CALCULATION
  // Calculate responsive iframe height based on container width to account for text wrapping
  const getResponsiveIframeHeight = () => {
    const containerWidth = scaledDimensions.eventsWidth * 1.2; // Match parent container width

    // Base height for wide screens where text doesn't wrap
    const baseHeight = 85;

    // Add extra height for narrower screens where disclaimer text wraps
    if (containerWidth < 400) {
      return baseHeight + 25; // Extra height for very narrow screens (mobile)
    } else if (containerWidth < 500) {
      return baseHeight + 15; // Extra height for narrow screens (small tablet)
    } else if (containerWidth < 600) {
      return baseHeight + 10; // Extra height for medium screens
    }

    return baseHeight; // Default height for wide screens
  };

  const responsiveIframeHeight = getResponsiveIframeHeight();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%', // Use full width of parent container for responsive behavior
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        gap: `${Math.max(6, Math.round(scaledDimensions.scale * 8))}px`, // 🚨 FIX: Match exact gap from Watch section for perfect alignment
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

      {/* Laylo Iframe - Responsive Height to Prevent Overlap */}
      <div
        style={{
          position: 'relative',
          width: 'calc(100% + 10px)', // 🚨 FIX: Increased width by 10px as requested
          height: `${responsiveIframeHeight}px`, // 🚨 RESPONSIVE: Dynamic height based on container width to prevent text wrapping overlap
          minHeight: '85px', // 🚨 RESPONSIVE: Minimum height constraint
          marginLeft: '-5px', // 🚨 FIX: Center the wider iframe by offsetting half the extra width
          marginRight: '-5px', // 🚨 FIX: Center the wider iframe by offsetting half the extra width
          marginTop: `${Math.max(-18, Math.round(scaledDimensions.scale * -21))}px`, // 🚨 FIX: Move iframe up 4-6px more to align with video height
          marginBottom: '0', // 🚨 FIX: Remove bottom margin for tighter layout with social buttons
          borderRadius: '8px',
          overflow: 'visible', // 🚨 FIX: Changed to visible to show all iframe content including wrapped text
          background: 'transparent',
          // 🚨 RESPONSIVE: Container query support for modern browsers
          containerType: 'inline-size', // Enable container queries for width-based responsive behavior
          '@container (max-width: 400px)': {
            height: '110px' // Extra height for very narrow containers
          }
        }}
      >
        <iframe
          id="laylo-drop-1nTsX"
          src="https://embed.laylo.com/?dropId=1nTsX&color=ff0409&theme=dark&background=solid&minimal=true&hideFooter=false&compact=false"
          style={{
            width: '100%',
            height: `${responsiveIframeHeight}px`, // 🚨 RESPONSIVE: Match container height dynamically to show full content including wrapped text
            minHeight: '85px', // 🚨 RESPONSIVE: Minimum height constraint
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
