import React from 'react';

/**
 * useNavHeight
 * Returns the current height (in px) of the fixed mobile navigation header.
 * Dynamically updates on resize and when the header resizes.
 */
export function useNavHeight() {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const measure = () => {
      const el = document.querySelector('.mobile-navigation-header');
      if (el) {
        const h = Math.round(el.getBoundingClientRect().height || 0);
        setHeight((prev) => (prev !== h ? h : prev));
      }
    };

    // Initial measurements
    measure();
    const t0 = setTimeout(measure, 0);
    const t1 = setTimeout(measure, 100); // small debounce for font/layout settling

    // Observe header size changes if supported
    let ro = null;
    const headerEl = document.querySelector('.mobile-navigation-header');
    if (headerEl && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => measure());
      ro.observe(headerEl);
    }

    // Resize listener
    window.addEventListener('resize', measure, { passive: true });

    // When fonts load, layout can change
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => measure());
    }

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      window.removeEventListener('resize', measure);
      if (ro && headerEl) {
        ro.disconnect();
      }
    };
  }, []);

  return height;
}

