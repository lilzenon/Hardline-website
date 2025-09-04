/**
 * Performance-optimized scroll hook that prevents forced reflows
 * Uses passive listeners and requestAnimationFrame for smooth performance
 */
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Optimized scroll hook with throttling and passive listeners
 */
export const useOptimizedScroll = (element = null, options = {}) => {
  const {
    throttleMs = 32, // Reduced frequency to 30fps for better mobile performance
    threshold = 20,
    passive = true
  } = options;

  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollX: 0,
    isScrolled: false,
    direction: 'none', // 'up', 'down', 'left', 'right', 'none'
    velocity: 0
  });

  const lastScrollY = useRef(0);
  const lastScrollX = useRef(0);
  const lastTimestamp = useRef(0);
  const lastVelocity = useRef(0);
  const rafId = useRef(null);
  const isThrottled = useRef(false);

  const handleScroll = useCallback((event) => {
    // 📱 MOBILE SCROLL FIX: Ultra-passive approach to prevent scroll interference
    if (isThrottled.current) return;

    // FIXED: Never prevent default or interfere with native scrolling
    // event.preventDefault() and event.stopPropagation() are completely avoided

    isThrottled.current = true;

    // Use setTimeout instead of RAF for less aggressive handling on mobile
    const isMobile = window.innerWidth <= 767;

    if (isMobile) {
      // Mobile: Use setTimeout for less interference
      setTimeout(() => {
      const now = performance.now();
      const target = event.target === document ? document.documentElement : event.target;
      
      // Batch DOM reads
      const currentScrollY = target.scrollTop || window.pageYOffset || 0;
      const currentScrollX = target.scrollLeft || window.pageXOffset || 0;
      
      // Calculate direction and velocity
      const deltaY = currentScrollY - lastScrollY.current;
      const deltaX = currentScrollX - lastScrollX.current;
      const deltaTime = now - lastTimestamp.current;
      
      let direction = 'none';
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        direction = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'none';
      } else if (Math.abs(deltaX) > 0) {
        direction = deltaX > 0 ? 'right' : 'left';
      }
      
      // Smooth velocity calculation to prevent jitter
      const rawVelocity = deltaTime > 0 ? Math.abs(deltaY) / deltaTime : 0;
      const smoothedVelocity = rawVelocity * 0.3 + lastVelocity.current * 0.7;

      setScrollState({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        isScrolled: currentScrollY > threshold,
        direction,
        velocity: smoothedVelocity
      });

      lastScrollY.current = currentScrollY;
      lastScrollX.current = currentScrollX;
      lastTimestamp.current = now;
      lastVelocity.current = smoothedVelocity;
      
        // Reset throttle after delay
        setTimeout(() => {
          isThrottled.current = false;
        }, throttleMs);
      }, throttleMs);
    } else {
      // Desktop: Use RAF for smoother performance
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const now = performance.now();
        const target = event.target === document ? document.documentElement : event.target;

        // Batch DOM reads
        const currentScrollY = target.scrollTop || window.pageYOffset || 0;
        const currentScrollX = target.scrollLeft || window.pageXOffset || 0;

        // Calculate direction and velocity
        const deltaY = currentScrollY - lastScrollY.current;
        const deltaX = currentScrollX - lastScrollX.current;
        const deltaTime = now - lastTimestamp.current;

        let direction = 'none';
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          direction = deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'none';
        } else if (Math.abs(deltaX) > 0) {
          direction = deltaX > 0 ? 'right' : 'left';
        }

        // Smooth velocity calculation to prevent jitter
        const rawVelocity = deltaTime > 0 ? Math.abs(deltaY) / deltaTime : 0;
        const smoothedVelocity = rawVelocity * 0.3 + lastVelocity.current * 0.7;

        setScrollState({
          scrollY: currentScrollY,
          scrollX: currentScrollX,
          isScrolled: currentScrollY > threshold,
          direction,
          velocity: smoothedVelocity
        });

        lastScrollY.current = currentScrollY;
        lastScrollX.current = currentScrollX;
        lastTimestamp.current = now;
        lastVelocity.current = smoothedVelocity;

        // Reset throttle after delay
        setTimeout(() => {
          isThrottled.current = false;
        }, throttleMs);
      });
    }
  }, [throttleMs, threshold]);

  useEffect(() => {
    const targetElement = element || window;
    const eventOptions = { passive };
    
    // Initial scroll position
    requestAnimationFrame(() => {
      const initialScrollY = element ? element.scrollTop : window.pageYOffset || 0;
      const initialScrollX = element ? element.scrollLeft : window.pageXOffset || 0;
      
      setScrollState({
        scrollY: initialScrollY,
        scrollX: initialScrollX,
        isScrolled: initialScrollY > threshold,
        direction: 'none',
        velocity: 0
      });
      
      lastScrollY.current = initialScrollY;
      lastScrollX.current = initialScrollX;
      lastTimestamp.current = performance.now();
    });
    
    targetElement.addEventListener('scroll', handleScroll, eventOptions);
    
    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [element, handleScroll, threshold]);

  return scrollState;
};

/**
 * Hook for scroll-based animations with intersection observer
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !('IntersectionObserver' in window)) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEntry(entry);
        
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          if (triggerOnce) {
            observerRef.current?.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observerRef.current.observe(element);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    ref: elementRef,
    isVisible,
    entry
  };
};

/**
 * Hook for parallax effects without forced reflows
 */
export const useParallax = (speed = 0.5, element = null) => {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef(element);
  const rafId = useRef(null);

  const { scrollY } = useOptimizedScroll(element, { throttleMs: 8 }); // ~120fps for smooth parallax

  useEffect(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const newOffset = scrollY * speed;
      setOffset(newOffset);
    });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [scrollY, speed]);

  return {
    offset,
    transform: `translateY(${offset}px)`
  };
};

/**
 * Hook for sticky elements with performance optimization
 */
export const useSticky = (topOffset = 0, element = null) => {
  const [isSticky, setIsSticky] = useState(false);
  const [stickyTop, setStickyTop] = useState(topOffset);
  const elementRef = useRef(element);
  const initialTop = useRef(null);

  const { scrollY } = useOptimizedScroll(element);

  useEffect(() => {
    if (!elementRef.current) return;

    // Measure initial position only once
    if (initialTop.current === null) {
      requestAnimationFrame(() => {
        const rect = elementRef.current.getBoundingClientRect();
        initialTop.current = rect.top + scrollY;
      });
      return;
    }

    const shouldBeSticky = scrollY > (initialTop.current - topOffset);
    
    if (shouldBeSticky !== isSticky) {
      setIsSticky(shouldBeSticky);
      setStickyTop(shouldBeSticky ? topOffset : initialTop.current);
    }
  }, [scrollY, topOffset, isSticky]);

  return {
    ref: elementRef,
    isSticky,
    stickyTop,
    style: isSticky ? {
      position: 'fixed',
      top: `${topOffset}px`,
      zIndex: 1000
    } : {}
  };
};
