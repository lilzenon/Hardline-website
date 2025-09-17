import React, { useState, useEffect, useCallback, useRef } from 'react';
import LayloIframe from './LayloIframe';
import useLayloSDK from '../hooks/useLayloSDK';


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
  // Ensure Laylo SDK is fully loaded before rendering iframe
  const isLayloReady = useLayloSDK();

  const [canResend, setCanResend] = useState(false);

  // Enhanced touch state for improved gesture handling
  const [touchState, setTouchState] = useState({
    isActive: false,
    startY: 0,
    currentY: 0,
    startTime: 0,
    isDragging: false,
    initialDrawerState: false,
    isOnDrawerContent: false,
    isOnDrawerHandle: false,
    isOnSwipeZone: false, // New: expanded swipe detection area
    dragDistance: 0, // New: track total drag distance for gesture detection
    isIntentionalGesture: false // New: distinguish intentional swipes from accidental touches
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


  // 📱 ENHANCED: Proper mobile drawer scroll lock with position preservation
  useEffect(() => {
    const body = document.body;
    const contentContainer = contentRef?.current;

    if (drawerExpanded) {
      // Store current scroll position before locking
      const scrollY = window.scrollY;

      // Apply body scroll lock with position preservation
      body.classList.add('drawer-scroll-lock');
      body.style.top = `-${scrollY}px`;

      if (contentContainer) {
        contentContainer.classList.add('drawer-active');
      }
    } else {
      // Restore scroll position when unlocking
      const scrollY = body.style.top;
      body.classList.remove('drawer-scroll-lock');
      body.style.top = '';

      // Restore scroll position
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

  // 🚀 ENHANCED GESTURE DETECTION: Expanded swipe area with smart content detection
  const handleTouchStart = useCallback((e) => {
    // Don't interfere with form interactions, buttons, or iframe content
    if (e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('iframe') ||
        e.target.closest('button') ||
        e.target.closest('[role="button"]')) {
      return;
    }

    const touch = e.touches[0];
    const now = Date.now();

    // Enhanced detection areas for better user experience
    const isOnDrawerContent = e.target.closest('.mobile-drawer-content');
    const drawerRect = drawerRef.current?.getBoundingClientRect();

    // EXPANDED: Much larger swipe detection area (top 120px instead of 50px)
    const isOnDrawerHandle = drawerRect && touch.clientY > drawerRect.top && touch.clientY < drawerRect.top + 120;

    // NEW: Detect if touch is in the expanded swipe zone (top 40% of drawer when expanded)
    const swipeZoneHeight = drawerExpanded ? drawerRect?.height * 0.4 : 120;
    const isOnSwipeZone = drawerRect && touch.clientY > drawerRect.top && touch.clientY < drawerRect.top + swipeZoneHeight;

    setTouchState({
      isActive: true,
      startY: touch.clientY,
      currentY: touch.clientY,
      startTime: now,
      isDragging: false,
      initialDrawerState: drawerExpanded,
      isOnDrawerContent: !!isOnDrawerContent,
      isOnDrawerHandle: !!isOnDrawerHandle,
      isOnSwipeZone: !!isOnSwipeZone,
      dragDistance: 0,
      isIntentionalGesture: false
    });

    // Prevent default for expanded swipe zone, but allow content scrolling
    if (isOnSwipeZone && !isOnDrawerContent) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, [drawerExpanded]);

  const handleTouchMove = useCallback((e) => {
    if (!touchState.isActive) return;

    // Don't interfere with form interactions, buttons, or iframe content
    if (e.target.tagName === 'INPUT' ||
        e.target.tagName === 'TEXTAREA' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('iframe') ||
        e.target.closest('button') ||
        e.target.closest('[role="button"]')) {
      return;
    }

    const touch = e.touches[0];
    const deltaY = touchState.startY - touch.clientY; // Positive = swipe up, Negative = swipe down
    const absDeltaY = Math.abs(deltaY);

    // ENHANCED: More sensitive gesture detection with lower threshold
    if (!touchState.isDragging && absDeltaY > 3) { // Reduced from 5px to 3px
      // EXPANDED: Allow dragging from entire swipe zone, not just handle
      if (touchState.isOnSwipeZone && !touchState.isOnDrawerContent) {
        // NEW: Detect intentional gesture based on movement pattern
        const isIntentionalGesture = absDeltaY > 8 || (absDeltaY > 3 && Date.now() - touchState.startTime > 100);

        setTouchState(prev => ({
          ...prev,
          isDragging: true,
          isIntentionalGesture,
          dragDistance: absDeltaY
        }));

        if (isIntentionalGesture) {
          e.preventDefault(); // Prevent scrolling when dragging drawer
          e.stopPropagation(); // Prevent event bubbling
        }
      }
    }

    // ENHANCED: Update drag state for gesture detection
    if (touchState.isDragging && touchState.isOnSwipeZone && !touchState.isOnDrawerContent) {
      const newDragDistance = Math.max(absDeltaY, touchState.dragDistance);

      if (touchState.isIntentionalGesture) {
        e.preventDefault();
        e.stopPropagation();
      }

      setTouchState(prev => ({
        ...prev,
        currentY: touch.clientY,
        dragDistance: newDragDistance
      }));
    } else if (!touchState.isOnDrawerContent) {
      // Update position for non-content touches
      setTouchState(prev => ({ ...prev, currentY: touch.clientY }));
    }
  }, [touchState]);

  const handleTouchEnd = useCallback((e) => {
    if (!touchState.isActive) return;

    const deltaY = touchState.startY - touchState.currentY; // Positive = swipe up, Negative = swipe down
    const absDeltaY = Math.abs(deltaY);
    const duration = Date.now() - touchState.startTime;
    const velocity = absDeltaY / duration; // pixels per millisecond

    // 🚀 MUCH MORE SENSITIVE: Dramatically improved gesture thresholds
    const minSwipeDistance = 8; // Reduced from 15px to 8px for much better responsiveness
    const minFlickVelocity = 0.15; // Reduced from 0.2 for easier flick gestures
    const snapThreshold = 5; // Reduced from 8px for better snap behavior
    const intentionalGestureBonus = touchState.isIntentionalGesture ? 0.7 : 1; // Bonus for intentional gestures

    let shouldToggleDrawer = false;

    if (touchState.isDragging && touchState.isIntentionalGesture) {
      // ENHANCED: More forgiving gesture detection with intentional gesture bonus
      const adjustedMinDistance = minSwipeDistance * intentionalGestureBonus;
      const adjustedMinVelocity = minFlickVelocity * intentionalGestureBonus;

      if (velocity > adjustedMinVelocity) {
        // Fast flick gesture - most responsive
        shouldToggleDrawer = true;
        console.log('🚀 Flick gesture detected:', { velocity, threshold: adjustedMinVelocity });
      } else if (absDeltaY > adjustedMinDistance) {
        // Regular swipe gesture - more forgiving
        shouldToggleDrawer = true;
        console.log('🚀 Swipe gesture detected:', { distance: absDeltaY, threshold: adjustedMinDistance });
      } else if (absDeltaY > snapThreshold) {
        // Snap-to-position based on distance - very sensitive
        shouldToggleDrawer = true;
        console.log('🚀 Snap gesture detected:', { distance: absDeltaY, threshold: snapThreshold });
      }
    } else if (touchState.isDragging && !touchState.isIntentionalGesture) {
      // Fallback for less intentional gestures - slightly higher thresholds
      if (velocity > minFlickVelocity * 1.2 || absDeltaY > minSwipeDistance * 1.5) {
        shouldToggleDrawer = true;
        console.log('🚀 Fallback gesture detected');
      }
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
    } else {
      // ENHANCED: Handle tap gesture on expanded swipe zone
      const rect = drawerRef.current?.getBoundingClientRect();
      const swipeZoneHeight = drawerExpanded ? rect?.height * 0.4 : 120;

      if (rect && touchState.startY > rect.top && touchState.startY < rect.top + swipeZoneHeight) {
        // Tap on swipe zone - toggle drawer
        if (drawerFullyClosed) {
          setDrawerFullyClosed(false);
          setDrawerExpanded(true);
          console.log('🔄 Drawer opened via tap on swipe zone');
        } else if (!drawerExpanded) {
          setDrawerExpanded(true);
          console.log('🔄 Drawer expanded via tap on swipe zone');
        } else {
          setDrawerExpanded(false);
          console.log('🔄 Drawer collapsed via tap on swipe zone');
        }
      }
    }

    // Reset enhanced touch state
    setTouchState({
      isActive: false,
      startY: 0,
      currentY: 0,
      startTime: 0,
      isDragging: false,
      initialDrawerState: false,
      isOnDrawerContent: false,
      isOnDrawerHandle: false,
      isOnSwipeZone: false,
      dragDistance: 0,
      isIntentionalGesture: false
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
            position: fixed !important;
            bottom: 0 !important;
            left: 25px !important;
            right: 25px !important;
            margin: 0 auto !important;
            width: calc(100% - 50px) !important;
            max-width: 390px !important;
            background: rgb(21 21 21 / 80%) !important;
            backdrop-filter: blur(10px) !important;
            border-radius: 24px 24px 0px 0px !important;
            /* 🚀 ENHANCED: Mirrored opening/closing animation with consistent timing (25% faster) */
            transition: transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
            transform-origin: bottom center !important;
            /* 🚨 CRITICAL: Highest z-index to ensure drawer stays above all content */
            z-index: 9999 !important;
            will-change: auto !important;
            backface-visibility: hidden !important;
            perspective: 1000px !important;
            /* 🚨 CRITICAL: Ensure drawer maintains fixed position on mobile */
            -webkit-transform: translateZ(0) !important;
            transform: translateZ(0) !important;
            /* ENHANCED: Complete scroll isolation for iOS Safari */
            touch-action: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
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
          }

          /* Content fade animations */
          .drawer-content {
            transition: opacity 0.1s ease-out;
            will-change: opacity;
          }

          .drawer-content.verification-mode {
            transform: scale(1.02);
          }

          /* 🚨 CRITICAL: Proper body scroll lock for mobile drawer positioning */
          body.drawer-scroll-lock {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            overflow: hidden !important;
            width: 100% !important;
            height: 100% !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
            /* Prevent iOS Safari address bar issues */
            -webkit-overflow-scrolling: auto !important;
          }

          /* Prevent main content scroll when drawer is expanded */
          .mobile-content-container.drawer-active {
            overflow: hidden !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
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
          // 🚀 ENHANCED: Mirrored opening/closing animation with same duration and easing (25% faster)
          transition: 'transform 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.225s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform, height',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
        onClick={handleDrawerClick}
        role="dialog"
        aria-label="Contact form drawer"
        aria-expanded={drawerExpanded}
      >
        {/* Drawer Handle - Original Styling Restored */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 0 16px',
            cursor: 'pointer'
          }}
          aria-hidden="true"
        >
          {/* Handle Bar - Original Dimensions and Styling */}
          <div
            style={{
              width: '40px', // Restored original width
              height: '4px', // Restored original height
              backgroundColor: 'rgba(255, 255, 255, 0.3)', // Restored original opacity
              borderRadius: '2px' // Restored original border radius
            }}
          />
        </div>

        {/* Drawer Content */}
        <div
          className={`drawer-content mobile-drawer-content ${showVerification ? 'verification-mode' : ''}`}
          onTouchStart={(e) => {
            // Allow drawer content scrolling while preventing bleed
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            // 🚀 SMART SCROLL ISOLATION: Prevent main page scroll bleed from drawer content
            const element = e.currentTarget;
            const { scrollTop, scrollHeight, clientHeight } = element;

            // Always stop propagation to prevent main page scroll
            e.stopPropagation();

            // Check if we're at scroll boundaries
            const isAtTop = scrollTop === 0;
            const isAtBottom = scrollTop + clientHeight >= scrollHeight;

            // Calculate scroll direction
            const touch = e.touches[0];
            const deltaY = touch.clientY - (touch.pageY || touch.clientY);

            // Prevent scroll bleed at boundaries - only allow internal scrolling
            if ((isAtTop && deltaY > 0) || (isAtBottom && deltaY < 0)) {
              e.preventDefault(); // Prevent main page scroll when at boundaries
            }
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

          {/* Laylo Integration - Always mounted for state persistence; visibility toggled via CSS */}
          {isLayloReady && (
            <div
              onClick={handleIframeClick}
              style={{
                width: 'calc(100% + 40px)',
                margin: '0px -20px 0 -20px',
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'hidden',
                flexShrink: 0,
                // Visibility control to avoid unmounting (prevents reload/blank states)
                opacity: (!drawerFullyClosed && !showVerification) ? 1 : 0,
                height: (!drawerFullyClosed && !showVerification) ? (iframeExpanded ? '200px' : '160px') : 1,
                pointerEvents: (!drawerFullyClosed && !showVerification) ? 'auto' : 'none',
                transition: 'opacity 0.3s ease, height 0.3s ease'
              }}
            >
              <LayloIframe
                dropId="1nTsX"
                color="ff0409"
                theme="dark"
                background="solid"
                minimal={true}
                visible={!drawerFullyClosed && !showVerification}
                style={{
                  width: '100%',
                  height: '100%', // Match container height for smooth transitions
                  border: 'none',
                  borderRadius: '8px',
                  background: 'transparent',
                  display: 'block'
                }}
              />
            </div>
          )}
          {/* 🔧 DEBUG: Log when Laylo iframe is visually hidden (but still mounted) */}
          {(drawerFullyClosed || showVerification) && console.log('🚫 Laylo iframe visually hidden (mounted):', { drawerFullyClosed, showVerification })}
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
