import React from 'react';

/**
 * useNavHeight
 * Returns the current height (in px) of the fixed mobile navigation header.
 * Dynamically updates on resize and when the header resizes.
 */
export function useNavHeight() {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const DEFAULT_HEIGHT = 97; // Fallback based on MobileNavigation header style
    let rafId = null; // Track RAF for cleanup

    const measure = () => {
      // Use requestAnimationFrame to batch DOM reads and reduce forced reflows
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = document.querySelector('.mobile-navigation-header');
        if (el) {
          const h = Math.round(el.getBoundingClientRect().height || 0);
          // If measurement returns 0 due to timing, use fallback
          const next = h > 0 ? h : DEFAULT_HEIGHT;
          setHeight((prev) => (prev !== next ? next : prev));
        } else {
          // If header not found (e.g., during route transitions), keep previous or apply safe fallback
          setHeight((prev) => (prev && prev > 0 ? prev : DEFAULT_HEIGHT));
        }
      });
    };

    // Initial measurements
    measure();
    const t0 = setTimeout(measure, 0);
    const t1 = setTimeout(measure, 100); // small debounce for font/layout settling
    const t2 = setTimeout(measure, 300); // handle async mount/font swaps

    // Observe header size changes if supported
    let ro = null;
    let mo = null;
    const headerEl = document.querySelector('.mobile-navigation-header');
    if (headerEl && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => measure());
      ro.observe(headerEl);
    }

    // Observe attribute/class/style changes on the header (affects computed height)
    if (headerEl && 'MutationObserver' in window) {
      mo = new MutationObserver(() => measure());
      mo.observe(headerEl, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    // Resize listener
    window.addEventListener('resize', measure, { passive: true });

    // Handle history navigation and BFCache restores
    const onPageShow = () => measure();
    const onPopState = () => measure();
    const onHashChange = () => measure();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') measure();
    };

    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('popstate', onPopState);
    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('visibilitychange', onVisibility);

    // When fonts load, layout can change
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => measure());
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measure);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('visibilitychange', onVisibility);
      if (ro && headerEl) {
        ro.disconnect();
      }
      if (mo) {
        mo.disconnect();
      }
    };
  }, []);

  return height;
}

