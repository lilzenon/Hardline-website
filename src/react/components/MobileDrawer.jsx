import React, { useState, useEffect, useCallback, useRef } from 'react';
import LayloIframe from './LayloIframe';

/**
 * Shared Mobile Drawer Component
 * Extracted from FigmaMobile.jsx to eliminate code duplication
 * Maintains 100% identical functionality, animations, and behavior
 */
const MobileDrawer = ({ 
  // Props for customization while maintaining identical behavior
  contentRef,
  viewportContext = { isRealMobileDevice: false },
  onStateChange = () => {} // Callback for parent to track drawer state changes
}) => {
  // EXTRACTED: All drawer state management from FigmaMobile.jsx
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitting, setPhoneSubmitting] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState('us');
  const [phoneInputState, setPhoneInputState] = useState('normal'); // normal, loading, valid, invalid
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationPhone, setVerificationPhone] = useState('');
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const [verificationState, setVerificationState] = useState('normal'); // normal, filled, valid, invalid
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [drawerFullyClosed, setDrawerFullyClosed] = useState(false); // Start in collapsed state showing "Text us"
  const [iframeExpanded, setIframeExpanded] = useState(false); // Track iframe interaction
  const [iframeHasLoadedOnce, setIframeHasLoadedOnce] = useState(false); // Track if iframe has been loaded to persist state

  // Resend countdown state
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Touch state for gesture handling
  const [touchState, setTouchState] = useState({
    isActive: false,
    startY: 0,
    currentY: 0,
    startTime: 0,
    isDragging: false,
    initialDrawerState: false
  });

  // State preservation for drawer reopening
  const [previousDrawerState, setPreviousDrawerState] = useState({
    expanded: false,
    showDisclaimer: false,
    showVerification: false,
    verificationCode: '',
    phoneNumber: ''
  });

  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Refs
  const phoneContainerRef = useRef(null);
  const flagImageRef = useRef(null);
  const drawerRef = useRef(null);
  const resendTimerRef = useRef(null);

  // Animate drawer to collapsed state after component mounts (show text only, no iframe)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDrawerFullyClosed(false);
      setDrawerExpanded(false); // Start in collapsed state - text only, no iframe
    }, 500); // Wait 500ms then animate to collapsed state

    return () => clearTimeout(timer);
  }, []);

  // Add useEffect for Laylo SDK initialization
  useEffect(() => {
    // Load Laylo SDK script only once with proper error handling
    if (!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')) {
      const layloScript = document.createElement('script');
      layloScript.src = 'https://embed.laylo.com/laylo-sdk.js';
      layloScript.async = true;
      layloScript.defer = true; // 🔧 FIXED: Add defer to prevent blocking

      // 🔧 FIXED: Add error handling to prevent crashes
      layloScript.onerror = (error) => {
        console.warn('⚠️ Laylo SDK failed to load in MobileDrawer:', error);
      };

      layloScript.onload = () => {
        console.log('✅ Laylo SDK script loaded successfully in MobileDrawer');
      };

      document.head.appendChild(layloScript);
    }
  }, []);

  // 📱 ENHANCED: Body scroll lock when drawer is expanded (iOS Safari support)
  useEffect(() => {
    const body = document.body;
    const contentContainer = contentRef?.current;

    if (drawerExpanded) {
      // Lock main page scroll when drawer is expanded
      const scrollY = window.scrollY;
      body.classList.add('drawer-scroll-lock');
      body.style.top = `-${scrollY}px`;

      if (contentContainer) {
        contentContainer.classList.add('drawer-active');
      }
    } else {
      // Restore main page scroll when drawer is collapsed
      body.classList.remove('drawer-scroll-lock');
      const scrollY = body.style.top;
      body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }

      if (contentContainer) {
        contentContainer.classList.remove('drawer-active');
      }
    }

    // Cleanup on unmount
    return () => {
      body.classList.remove('drawer-scroll-lock');
      body.style.top = '';
      if (contentContainer) {
        contentContainer.classList.remove('drawer-active');
      }
    };
  }, [drawerExpanded, contentRef]);

  // Enhanced state preservation including iframe content state
  const saveCurrentDrawerState = useCallback(() => {
    setPreviousDrawerState({
      expanded: drawerExpanded,
      showDisclaimer: showDisclaimer,
      showVerification: showVerification,
      verificationCode: verificationCode,
      phoneNumber: phoneNumber
    });

    // Preserve iframe state by keeping it in DOM but hidden
    // This prevents content loss when drawer is collapsed/reopened
    console.log('💾 Drawer state saved, iframe content preserved');
  }, [drawerExpanded, showDisclaimer, showVerification, verificationCode, phoneNumber]);

  // Handle clicking outside drawer to close it
  const handleOutsideClick = useCallback((e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      // Save current state before closing
      saveCurrentDrawerState();

      // Always close drawer visually
      setDrawerExpanded(false);

      // If in verification mode, keep it minimized but accessible
      if (showVerification) {
        // Don't fully close, just collapse so user can tap to reopen
        setDrawerFullyClosed(false);
      } else {
        // Always return to collapsed state showing "Text us" - never fully close on outside click
        setDrawerFullyClosed(false);
        setShowDisclaimer(false);
      }
    }
  }, [phoneNumber, showVerification, saveCurrentDrawerState]);

  // Add click outside listener
  useEffect(() => {
    if (drawerExpanded) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [drawerExpanded, handleOutsideClick]);

  // 📱 ENHANCED: Body scroll lock when drawer is expanded (iOS Safari support)
  useEffect(() => {
    const body = document.body;
    const contentContainer = contentRef?.current;

    if (drawerExpanded) {
      // Lock main page scroll when drawer is expanded
      const scrollY = window.scrollY;
      body.classList.add('drawer-scroll-lock');
      body.style.top = `-${scrollY}px`;

      if (contentContainer) {
        contentContainer.classList.add('drawer-active');
      }
    } else {
      // Restore main page scroll when drawer is collapsed
      body.classList.remove('drawer-scroll-lock');
      const scrollY = body.style.top;
      body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }

      if (contentContainer) {
        contentContainer.classList.remove('drawer-active');
      }
    }

    // Cleanup on unmount
    return () => {
      body.classList.remove('drawer-scroll-lock');
      body.style.top = '';
      if (contentContainer) {
        contentContainer.classList.remove('drawer-active');
      }
    };
  }, [drawerExpanded, contentRef]);

  // Notify parent of state changes
  useEffect(() => {
    onStateChange({
      drawerExpanded,
      drawerFullyClosed,
      showVerification,
      iframeExpanded,
      phoneSubmitted
    });
  }, [drawerExpanded, drawerFullyClosed, showVerification, iframeExpanded, phoneSubmitted, onStateChange]);

  // Calculate drawer height based on content and state - FIXED for iframe loading
  const getDrawerHeight = useCallback(() => {
    if (drawerFullyClosed) {
      return '50px'; // Fully closed - only handle and minimal padding visible
    } else if (iframeExpanded) {
      return '320px'; // Iframe expanded - extra space for full iframe interaction
    } else if (showVerification && drawerExpanded) {
      return '240px'; // Verification mode expanded - tight layout without extra space
    } else if (showVerification && !drawerExpanded) {
      return '60px'; // Verification mode collapsed - show handle only, no content peek
    } else if (drawerExpanded) {
      return '280px'; // Expanded - show text + Laylo iframe with proper height for phone form
    } else {
      return '80px'; // Collapsed - show only text content, iframe hidden but loading in background
    }
  }, [drawerFullyClosed, showVerification, drawerExpanded, showDisclaimer, iframeExpanded]);

  // Dynamic bottom spacing calculation based on viewport context
  const getDynamicBottomSpacing = useCallback(() => {
    const drawerHeight = getDrawerHeight();

    // Detect if we're on a real mobile device vs desktop browser mobile simulation
    const isRealMobileDevice = (() => {
      // Check for touch capability and mobile user agent
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileUserAgent = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // Check viewport characteristics
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const aspectRatio = viewportWidth / viewportHeight;

      // Real mobile devices typically have:
      // - Touch capability
      // - Mobile user agent
      // - Portrait orientation or narrow landscape
      // - Smaller viewport dimensions
      return hasTouchScreen && isMobileUserAgent &&
             (aspectRatio < 1.5 || viewportWidth < 768);
    })();

    // Calculate base spacing from drawer height
    const baseSpacing = parseInt(drawerHeight.replace('px', ''));

    if (isRealMobileDevice) {
      // Real mobile device: Drastically reduced spacing while keeping social buttons visible
      return `calc(${drawerHeight} + 20px)`;
    } else {
      // Desktop browser mobile simulation: Minimal spacing
      const reducedSpacing = Math.max(15, baseSpacing * 0.2); // Minimum 15px, or 20% of drawer height
      return `calc(${drawerHeight} + ${reducedSpacing}px)`;
    }
  }, [getDrawerHeight, viewportContext]); // Include viewportContext to recalculate when viewport changes

  // 🚀 ENHANCED: Touch gesture handlers with improved swipe-down reliability
  const handleTouchStart = useCallback((e) => {
    // Don't interfere with form interactions or iframe content
    if (e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.closest('iframe') ||
        e.target.closest('.mobile-drawer-content')) {
      return;
    }

    const touch = e.touches[0];
    const now = Date.now();

    setTouchState({
      isActive: true,
      startY: touch.clientY,
      currentY: touch.clientY,
      startTime: now,
      isDragging: false,
      initialDrawerState: drawerExpanded
    });

    // 🚀 ENHANCED: More aggressive event capture for better gesture detection
    e.preventDefault();
    e.stopPropagation();
  }, [drawerExpanded]);

  const handleTouchMove = useCallback((e) => {
    if (!touchState.isActive) return;

    // Don't interfere with form interactions or iframe content
    if (e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.closest('iframe') ||
        e.target.closest('.mobile-drawer-content')) {
      return;
    }

    const touch = e.touches[0];
    const deltaY = touchState.startY - touch.clientY; // Positive = swipe up, Negative = swipe down
    const absDeltaY = Math.abs(deltaY);

    // 🚀 ENHANCED: More sensitive threshold for better swipe detection
    if (!touchState.isDragging && absDeltaY > 3) { // Reduced from 5px to 3px for better sensitivity
      setTouchState(prev => ({ ...prev, isDragging: true }));
      e.preventDefault(); // Prevent scrolling when dragging
      e.stopPropagation(); // Prevent event bubbling
    }

    // 🚀 ENHANCED: Always prevent default during active touch to improve gesture capture
    if (touchState.isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (touchState.isDragging) {
      setTouchState(prev => ({ ...prev, currentY: touch.clientY }));
      e.preventDefault();
      e.stopPropagation();
    }
  }, [touchState]);

  const handleTouchEnd = useCallback((e) => {
    if (!touchState.isActive) return;

    const deltaY = touchState.startY - touchState.currentY; // Positive = swipe up, Negative = swipe down
    const absDeltaY = Math.abs(deltaY);
    const duration = Date.now() - touchState.startTime;
    const velocity = absDeltaY / duration; // pixels per millisecond

    // 🚀 ENHANCED: More sensitive gesture thresholds for improved swipe-down detection
    const minSwipeDistance = 15; // Further reduced from 20px for better responsiveness
    const minFlickVelocity = 0.2; // Further reduced from 0.3 for easier flick gestures
    const snapThreshold = 8; // Further reduced from 10px for better snap behavior

    let shouldToggleDrawer = false;

    if (touchState.isDragging) {
      // Determine action based on swipe direction, distance, and velocity
      if (velocity > minFlickVelocity) {
        // Fast flick gesture
        shouldToggleDrawer = true;
      } else if (absDeltaY > minSwipeDistance) {
        // Regular swipe gesture
        shouldToggleDrawer = true;
      } else if (absDeltaY > snapThreshold) {
        // Snap-to-position based on distance
        shouldToggleDrawer = true;
      }

      if (shouldToggleDrawer) {
        // Add momentum class for smooth animation
        if (velocity > minFlickVelocity) {
          drawerRef.current?.classList.add('momentum-fast');
          setTimeout(() => {
            drawerRef.current?.classList.remove('momentum-fast');
          }, 100);
        } else {
          drawerRef.current?.classList.add('momentum-slow');
          setTimeout(() => {
            drawerRef.current?.classList.remove('momentum-slow');
          }, 250);
        }

        if (deltaY > 0) {
          // Swipe up - open/expand drawer
          if (!drawerExpanded) {
            setDrawerExpanded(true);
            setDrawerFullyClosed(false);
            console.log('🔄 Drawer opened via swipe up');
          }
        } else {
          // Swipe down - close/collapse drawer
          if (drawerExpanded) {
            setDrawerExpanded(false);
            console.log('🔄 Drawer closed via swipe down');
          }
        }
      }
    } else {
      // Handle tap gesture on drawer handle area
      const rect = drawerRef.current?.getBoundingClientRect();
      if (rect && touchState.startY > rect.top && touchState.startY < rect.top + 50) {
        // Tap on handle area - toggle drawer
        if (drawerFullyClosed) {
          setDrawerFullyClosed(false);
          setDrawerExpanded(true);
          console.log('🔄 Drawer opened via tap');
        } else if (!drawerExpanded) {
          setDrawerExpanded(true);
          console.log('🔄 Drawer expanded via tap');
        } else {
          setDrawerExpanded(false);
          console.log('🔄 Drawer collapsed via tap');
        }
      }
    }

    // Reset touch state
    setTouchState({
      isActive: false,
      startY: 0,
      currentY: 0,
      startTime: 0,
      isDragging: false,
      initialDrawerState: false
    });
  }, [touchState, drawerExpanded, drawerFullyClosed]);

  // Handle drawer click to fully open when closed
  const handleDrawerClick = useCallback(() => {
    if (drawerFullyClosed) {
      // Restore previous state when reopening
      setDrawerFullyClosed(false);
      setDrawerExpanded(previousDrawerState.expanded || true);
      setShowDisclaimer(previousDrawerState.showDisclaimer);
      setShowVerification(previousDrawerState.showVerification);

      // Restore verification code if it was in progress
      if (previousDrawerState.verificationCode) {
        setVerificationCode(previousDrawerState.verificationCode);
        if (previousDrawerState.verificationCode.length === 4) {
          setVerificationState('filled');
        }
      }

      // Restore phone number if it was entered
      if (previousDrawerState.phoneNumber) {
        setPhoneNumber(previousDrawerState.phoneNumber);
      }
    } else if (!drawerExpanded) {
      // If just collapsed, expand to previous state
      setDrawerExpanded(true);
      if (previousDrawerState.showDisclaimer && !showVerification) {
        setShowDisclaimer(true);
      }
    }
  }, [drawerFullyClosed, drawerExpanded, previousDrawerState, showVerification]);

  // Handle iframe click to expand drawer for better visibility
  const handleIframeClick = useCallback((e) => {
    e.stopPropagation(); // Prevent drawer click handler

    // Ensure drawer is open and expanded for iframe interaction
    if (drawerFullyClosed) {
      setDrawerFullyClosed(false);
    }

    // Expand drawer and set iframe expanded state
    setDrawerExpanded(true);
    setIframeExpanded(true);

    // Auto-collapse iframe expansion after 10 seconds to return to normal state
    setTimeout(() => {
      setIframeExpanded(false);
    }, 10000);
  }, [drawerFullyClosed]);

  return (
    <>
      {/* EXTRACTED: Complete Mobile Drawer CSS - Identical to FigmaMobile.jsx */}
      <style>
        {`
          /* Enhanced drawer animations with momentum support */
          .mobile-drawer {
            position: fixed;
            bottom: 0;
            left: 25px;
            right: 25px;
            margin: 0 auto;
            width: calc(100% - 50px);
            max-width: 390px;
            background: rgb(21 21 21 / 80%);
            backdrop-filter: blur(10px);
            border-radius: 24px 24px 0px 0px;
            /* 🚀 ENHANCED: Mirrored opening/closing animation with consistent timing */
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform-origin: bottom center;
            z-index: 100;
            will-change: auto; /* Let browser optimize to prevent main scroll conflicts */
            backface-visibility: hidden;
            perspective: 1000px;
            /* 🚀 ENHANCED: Complete scroll isolation and improved touch handling for iOS Safari */
            touch-action: pan-y; /* Allow vertical panning for better swipe detection */
            -webkit-touch-callout: none; /* Disable iOS callout menu */
            -webkit-user-select: none; /* Disable text selection */
            user-select: none;
            user-select: none;
            -webkit-user-select: none;
            /* Complete containment isolation */
            contain: strict;
            /* Prevent scroll chaining */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
          }

          /* Fast momentum animation for flick gestures - scroll optimized */
          .mobile-drawer.momentum-fast {
            transition: transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            contain: strict; /* Strict containment during fast animations */
          }

          /* Slow momentum animation for gentle swipes - scroll optimized */
          .mobile-drawer.momentum-slow {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            contain: layout style; /* Layout containment for smooth animations */
          }

          /* ENHANCED: Complete drawer scroll isolation with hidden scrollbars */
          .mobile-drawer-content {
            /* Complete scroll isolation from main page */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* iOS Safari specific scroll containment */
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            /* Prevent scroll chaining to parent */
            touch-action: pan-y;
            /* Optimize for mobile scrolling */
            scroll-behavior: auto;
            /* Hardware acceleration */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }

          /* FIXED: Hide WebKit scrollbars */
          .mobile-drawer-content::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
            background: transparent;
          }

          /* ENHANCED: Body scroll lock when drawer is active */
          body.drawer-scroll-lock {
            overflow: hidden !important;
            position: fixed !important;
            width: 100% !important;
            height: 100% !important;
            /* iOS Safari specific scroll lock */
            -webkit-overflow-scrolling: none !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          .mobile-drawer.collapsed {
            transform: translate3d(0, calc(100% - 80px), 0);
          }

          .mobile-drawer.expanded {
            transform: translate3d(0, 0, 0);
          }

          /* Disclaimer peek effect */
          .disclaimer-peek {
            /* Add subtle visual feedback for disclaimer state */
          }

          /* Content fade animations */
          .drawer-content {
            transition: opacity 0.1s ease-out;
            will-change: opacity;
          }

          .drawer-content.verification-mode {
            transform: scale(1.02);
          }

          /* Responsive adjustments for smaller screens */
          @media (max-width: 375px) {
            .mobile-drawer {
              left: 15px !important;
              right: 15px !important;
              width: calc(100% - 30px) !important;
            }
          }

          @media (max-width: 320px) {
            .mobile-drawer {
              left: 10px !important;
              right: 10px !important;
              width: calc(100% - 20px) !important;
            }
          }
        `}
      </style>

      {/* EXTRACTED: Mobile Drawer - Enhanced Animation Component */}
      <div
        ref={drawerRef}
        className={`mobile-drawer ${drawerExpanded ? 'expanded' : 'collapsed'} ${showDisclaimer ? 'disclaimer-peek' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={(e) => {
          // ENHANCED: Complete scroll isolation for iOS Safari
          e.stopPropagation();
          e.preventDefault(); // Prevent scroll bleed on desktop/trackpad
        }}
        style={{
          height: getDrawerHeight(),
          transform: drawerFullyClosed
            ? 'translate3d(0, 100%, 0)'
            : drawerExpanded
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, calc(100% - 80px), 0)',
          // 🚀 ENHANCED: Mirrored opening/closing animation with same duration and easing
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform, height',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
        onClick={handleDrawerClick}
        role="dialog"
        aria-label="Contact form drawer"
        aria-expanded={drawerExpanded}
      >
        {/* Drawer Handle */}
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '2px',
            margin: '8px auto 16px',
            cursor: 'pointer'
          }}
          aria-hidden="true"
        />

        {/* Drawer Content */}
        <div
          className={`drawer-content mobile-drawer-content ${showVerification ? 'verification-mode' : ''}`}
          onTouchStart={(e) => {
            // Allow drawer content scrolling while preventing bleed
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            // ENHANCED: Allow internal scrolling but prevent bleed to main page
            const element = e.currentTarget;
            const { scrollTop, scrollHeight, clientHeight } = element;

            // Check if we're at scroll boundaries
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;

            // Prevent scroll bleed at boundaries for iOS Safari
            if ((isAtTop && e.touches[0].clientY > e.touches[0].pageY) ||
                (isAtBottom && e.touches[0].clientY < e.touches[0].pageY)) {
              e.preventDefault();
            }

            e.stopPropagation();
          }}
          onWheel={(e) => {
            // Allow drawer content scrolling while preventing bleed
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
          style={{
            padding: '0 20px 20px',
            opacity: drawerFullyClosed ? 0 : 1,
            transition: 'opacity 0.2s ease',
            /* ENHANCED: Enable internal scrolling with iOS Safari support */
            height: '100%',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* Text Us Group - Hidden during verification */}
          {!drawerFullyClosed && !showVerification && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                marginBottom: '4px', // Reduced to bring iframe closer
                flexShrink: 0,
                position: 'relative',
                zIndex: 2
              }}
            >
              <div
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '800',
                  fontSize: '20px',
                  lineHeight: '1.2em',
                  color: '#FFFFFF'
                }}
              >
                Text us
              </div>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontWeight: '300',
                  fontSize: '12px',
                  lineHeight: '1.3em',
                  color: '#FFFFFF',
                  opacity: 0.8
                }}
              >
                Exclusive events, contests, and more
              </div>
            </div>
          )}

          {/* Laylo Integration - RESTORED to working configuration */}
          {!drawerFullyClosed && !showVerification && (
            <div
              onClick={handleIframeClick}
              style={{
                width: 'calc(100% + 40px)', // Extend container to full drawer width
                margin: '0px -20px 0 -20px', // Minimal top margin to bring iframe very close to text
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'visible',
                flexShrink: 0
              }}
            >
              <LayloIframe
                dropId="1nTsX"
                color="ff0409"
                theme="dark"
                background="solid"
                minimal={true}
                style={{
                  width: '100%', // Full width of the extended container
                  height: iframeExpanded ? '200px' : '160px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'transparent',
                  display: 'block',
                  transition: 'opacity 0.3s ease, height 0.3s ease',
                  pointerEvents: 'auto'
                }}
              />
            </div>
          )}
          {/* 🔧 DEBUG: Log when Laylo iframe is hidden */}
          {(drawerFullyClosed || showVerification) && console.log('🚫 Laylo iframe hidden:', { drawerFullyClosed, showVerification })}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
