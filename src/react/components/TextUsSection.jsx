import React, { useState, useEffect, useCallback } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';

const TextUsSection = ({ scaledDimensions }) => {
  // Calculate width to match Events section exactly for proper alignment
  const calculatedWidth = Math.round(scaledDimensions.eventsWidth);

  // 🚨 DYNAMIC RESPONSIVE IFRAME HEIGHT STATE
  // State to track iframe height that updates on viewport resize
  const [iframeHeight, setIframeHeight] = useState(85);

  // 🚨 AGGRESSIVE RESPONSIVE IFRAME HEIGHT CALCULATION
  // Calculate responsive iframe height with more aggressive scaling to prevent text wrapping overlap
  const calculateResponsiveIframeHeight = useCallback(() => {
    const containerWidth = scaledDimensions.eventsWidth * 1.2; // Match parent container width

    // Base height for wide screens where text doesn't wrap
    const baseHeight = 85;

    // 🚨 AGGRESSIVE HEIGHT SCALING: Add substantial extra height for text wrapping scenarios
    if (containerWidth < 350) {
      return baseHeight + 45; // Very aggressive for very narrow screens (mobile portrait)
    } else if (containerWidth < 450) {
      return baseHeight + 35; // Aggressive for narrow screens (mobile landscape)
    } else if (containerWidth < 550) {
      return baseHeight + 25; // Substantial for small tablet screens
    } else if (containerWidth < 650) {
      return baseHeight + 15; // Moderate for medium tablet screens
    } else if (containerWidth < 750) {
      return baseHeight + 8; // Small adjustment for larger tablet screens
    }

    return baseHeight; // Default height for wide desktop screens
  }, [scaledDimensions.eventsWidth]);

  // 🚨 DYNAMIC RESIZE HANDLER
  // Update iframe height when viewport changes
  const handleResize = useCallback(() => {
    const newHeight = calculateResponsiveIframeHeight();
    setIframeHeight(newHeight);
  }, [calculateResponsiveIframeHeight]);

  // 🚨 USE PERFORMANT RESIZE HOOK
  // Debounced resize listener for optimal performance
  usePerformantResize(handleResize);

  // 🚨 INITIAL HEIGHT CALCULATION
  // Set initial iframe height on component mount and when scaledDimensions change
  useEffect(() => {
    const initialHeight = calculateResponsiveIframeHeight();
    setIframeHeight(initialHeight);
  }, [calculateResponsiveIframeHeight]);

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

      {/* Laylo Iframe - Dynamic Responsive Height to Prevent Overlap */}
      <div
        style={{
          position: 'relative',
          width: 'calc(100% + 10px)', // 🚨 FIX: Increased width by 10px as requested
          height: `${iframeHeight}px`, // 🚨 DYNAMIC: State-based height that updates on viewport resize
          minHeight: '85px', // 🚨 RESPONSIVE: Minimum height constraint
          marginLeft: '-5px', // 🚨 FIX: Center the wider iframe by offsetting half the extra width
          marginRight: '-5px', // 🚨 FIX: Center the wider iframe by offsetting half the extra width
          marginTop: `${Math.max(-18, Math.round(scaledDimensions.scale * -21))}px`, // 🚨 FIX: Move iframe up 4-6px more to align with video height
          marginBottom: '0', // 🚨 FIX: Remove bottom margin for tighter layout with social buttons
          borderRadius: '8px',
          overflow: 'visible', // 🚨 FIX: Changed to visible to show all iframe content including wrapped text
          background: 'transparent',
          // 🚨 SMOOTH TRANSITIONS: Add transition for height changes during resize
          transition: 'height 0.2s ease-out',
          // 🚨 RESPONSIVE: Container query support for modern browsers
          containerType: 'inline-size' // Enable container queries for width-based responsive behavior
        }}
      >
        <iframe
          id="laylo-drop-1nTsX"
          src="https://embed.laylo.com/?dropId=1nTsX&color=ff0409&theme=dark&background=solid&minimal=true&hideFooter=false&compact=false"
          style={{
            width: '100%',
            height: `${iframeHeight}px`, // 🚨 DYNAMIC: State-based height that updates on viewport resize
            minHeight: '85px', // 🚨 RESPONSIVE: Minimum height constraint
            border: 'none',
            borderRadius: '8px',
            background: 'transparent',
            transform: 'translateX(0)',
            position: 'relative',
            top: '0px', // Ensure proper positioning to show main content
            // 🚨 SMOOTH TRANSITIONS: Add transition for height changes during resize
            transition: 'height 0.2s ease-out'
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
