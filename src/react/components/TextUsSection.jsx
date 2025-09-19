import React, { useState, useEffect, useCallback, useRef } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';

const TextUsSection = ({ scaledDimensions }) => {
  // Calculate width to match Events section exactly for proper alignment
  const calculatedWidth = Math.round(scaledDimensions.eventsWidth);

  // 🚨 DYNAMIC RESPONSIVE IFRAME HEIGHT STATE
  // State to track iframe height that updates on viewport resize
  const [iframeHeight, setIframeHeight] = useState(85);

  // 🚨 AGGRESSIVE RESPONSIVE IFRAME HEIGHT CALCULATION
  // Desktop-only Laylo iframe mount + reliability
  const [shouldMountIframe, setShouldMountIframe] = useState(false);
  const [layloLoaded, setLayloLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const layloRetryRef = useRef(false);

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

  // Mount iframe after layout stabilizes (desktop-only) for reliability
  useEffect(() => {
    const containerWidth = scaledDimensions?.eventsWidth || 0;
    const isDesktop = (scaledDimensions?.containerWidth || window.innerWidth) >= 1024;
    if (isDesktop) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setShouldMountIframe(true));
      });
    } else {
      setShouldMountIframe(true);
    }
  }, [scaledDimensions?.containerWidth, scaledDimensions?.eventsWidth]);

  // Retry once if onLoad doesn't fire in time (desktop-only)
  useEffect(() => {
    const isDesktop = (scaledDimensions?.containerWidth || window.innerWidth) >= 1024;
    if (!isDesktop || !shouldMountIframe || layloLoaded) return;
    const t = setTimeout(() => {
      if (!layloLoaded && !layloRetryRef.current) {
        layloRetryRef.current = true;
        setIframeKey((k) => k + 1);
      }
    }, 3000);
    return () => clearTimeout(t);
  }, [shouldMountIframe, layloLoaded, scaledDimensions?.containerWidth]);

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
        width: `${calculatedWidth}px`, // Align left edge exactly with Events/Up next widths on desktop
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
          width: '100%', // Normalize container width; widen only the iframe (right side)
          height: `${iframeHeight}px`,
          minHeight: '85px',
          marginLeft: '0',
          marginRight: '0',
          marginTop: `${Math.max(-18, Math.round(scaledDimensions.scale * -21))}px`,
          marginBottom: '0',
          borderRadius: '8px',
          overflow: 'visible',
          background: 'transparent',
          transition: 'height 0.2s ease-out',
          containerType: 'inline-size'
        }}
      >
        {shouldMountIframe && (
          <iframe
            key={iframeKey}
            id="laylo-drop-1nTsX"
            src="https://embed.laylo.com/?dropId=1nTsX&color=ff0409&theme=dark&background=solid&minimal=true&hideFooter=false&compact=false"
            style={{
              width: (scaledDimensions?.containerWidth || window.innerWidth) >= 1024 ? 'calc(100% + 36px)' : '100%',
              height: `${iframeHeight}px`,
              minHeight: '85px',
              border: 'none',
              borderRadius: '8px',
              background: 'transparent',
              transform: 'translateX(0)',
              position: 'relative',
              left: '0px',
              marginLeft: (scaledDimensions?.containerWidth || window.innerWidth) >= 1024 ? '-18px' : '0px',
              marginRight: (scaledDimensions?.containerWidth || window.innerWidth) >= 1024 ? '-18px' : '0px',
              top: '0px',
              visibility: layloLoaded ? 'visible' : 'hidden',
              transition: 'height 0.2s ease-out'
            }}
            onLoad={() => setLayloLoaded(true)}
            scrolling="no"
            allow="web-share"
            title="Laylo Signup Form"
          />
        )}
      </div>
    </div>
  );
};

export default TextUsSection;
