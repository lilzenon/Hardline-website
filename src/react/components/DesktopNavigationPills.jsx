import React, { useState, useCallback, useEffect } from 'react';

/**
 * DesktopNavigationPills
 * Reusable desktop navigation pill component extracted from FigmaDesktop.
 * - Preserves glassmorphism background container and pill styling
 * - Maintains accessibility and keyboard interaction
 * - Active/inactive font weights: 800 (active), 500 (inactive)
 *
 * Props:
 * - currentPage: 'Events' | 'About' | 'FAQ' (default 'Events')
 * - onNavigate?: (tabName: 'Events' | 'About' | 'FAQ') => void
 */
const DesktopNavigationPills = ({ currentPage = 'Events', onNavigate }) => {
  const [activeNavTab, setActiveNavTab] = useState(currentPage);
  const [hoveredNavTab, setHoveredNavTab] = useState(null);
  const [focusedNavTab, setFocusedNavTab] = useState(null);

  const navigateDefault = (tabName) => {
    if (tabName === 'About') {
      if (window.navigateWithTransition) window.navigateWithTransition('/about');
      else window.location.href = '/about';
    } else if (tabName === 'FAQ') {
      if (window.navigateWithTransition) window.navigateWithTransition('/faq');
      else window.location.href = '/faq';
    } else {
      if (window.navigateWithTransition) window.navigateWithTransition('/');
      else window.location.href = '/';
    }
  };

  const handleNavClick = useCallback((tabName) => {
    setActiveNavTab(tabName);
    // Always navigate (built-in), also call onNavigate if provided for logging/analytics
    navigateDefault(tabName);
    if (typeof onNavigate === 'function') onNavigate(tabName);
  }, [onNavigate]);

  const getNavPillStyles = useCallback((tabName, leftPosition) => {
    const isActive = activeNavTab === tabName;
    const isHovered = hoveredNavTab === tabName;
    const isFocused = focusedNavTab === tabName;
    return {
      position: 'absolute',
      left: leftPosition,
      top: '4.7px',
      display: 'flex',
      width: '93.3px',
      height: '34.8px',
      padding: '15px 14px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      borderRadius: '12px',
      // Glassmorphism matching updated desktop pills
      // Inactive: fully transparent; Hover/Active: glassmorphism per design system
      background: (isActive || isHovered)
        ? 'rgba(22, 22, 22, 0.30)'
        : 'transparent',
      backdropFilter: (isActive || isHovered)
        ? 'blur(12px)'
        : 'none',
      WebkitBackdropFilter: (isActive || isHovered)
        ? 'blur(12px)'
        : 'none',
      border: (isActive || isHovered)
        ? '1px solid rgba(255, 255, 255, 0.12)'
        : '1px solid transparent',
      boxShadow: (isActive || isHovered)
        ? '0px 4px 8px rgba(0, 0, 0, 0.20)'
        : 'none',
      color: '#FFFFFF',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'all 0.2s ease',
      transform: 'translateZ(0)',
      opacity: 1,
      outline: isFocused ? '2px solid rgba(255, 255, 255, 0.85)' : 'none',
      outlineOffset: isFocused ? '2px' : undefined
    };
  }, [activeNavTab, hoveredNavTab, focusedNavTab]);

  const getNavTextStyles = useCallback((tabName) => {
    const isActive = activeNavTab === tabName;
    return {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '13px',
      fontWeight: isActive ? '800' : '500',
      lineHeight: 'normal',
      transition: 'font-weight 0.3s ease'
    };
  }, [activeNavTab]);

  // Keep internal state in sync with prop changes (e.g., navigating to a new page)
  useEffect(() => {
    setActiveNavTab(currentPage);
  }, [currentPage]);

  const keyHandler = (tabName) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavClick(tabName);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '294.45px',
        height: '44.2px',
        gridColumn: '3',
        justifySelf: 'end'
      }}
    >
      {/* Glassmorphism background container */}
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '294.45px',
          height: '44.2px',
          background: 'rgba(22, 22, 22, 0.30)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '14px',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
        }}
      />

      {/* Events */}
      <div
        role="button"
        tabIndex={0}
        style={getNavPillStyles('Events', '4.21px')}
        onClick={() => handleNavClick('Events')}
        onMouseEnter={() => setHoveredNavTab('Events')}
        onMouseLeave={() => setHoveredNavTab(null)}
        onFocus={() => setFocusedNavTab('Events')}
        onBlur={() => setFocusedNavTab(null)}
        onKeyDown={keyHandler('Events')}
        aria-label="Navigate to Events"
        aria-pressed={activeNavTab === 'Events'}
        aria-current={activeNavTab === 'Events' ? 'page' : undefined}
      >
        <span style={getNavTextStyles('Events')}>Events</span>
      </div>

      {/* About */}
      <div
        role="button"
        tabIndex={0}
        style={getNavPillStyles('About', '100.14px')}
        onClick={() => handleNavClick('About')}
        onMouseEnter={() => setHoveredNavTab('About')}
        onMouseLeave={() => setHoveredNavTab(null)}
        onFocus={() => setFocusedNavTab('About')}
        onBlur={() => setFocusedNavTab(null)}
        onKeyDown={keyHandler('About')}
        aria-label="Navigate to About"
        aria-pressed={activeNavTab === 'About'}
        aria-current={activeNavTab === 'About' ? 'page' : undefined}
      >
        <span style={getNavTextStyles('About')}>About</span>
      </div>

      {/* FAQ */}
      <div
        role="button"
        tabIndex={0}
        style={getNavPillStyles('FAQ', '196.07px')}
        onClick={() => handleNavClick('FAQ')}
        onMouseEnter={() => setHoveredNavTab('FAQ')}
        onMouseLeave={() => setHoveredNavTab(null)}
        onFocus={() => setFocusedNavTab('FAQ')}
        onBlur={() => setFocusedNavTab(null)}
        onKeyDown={keyHandler('FAQ')}
        aria-label="Navigate to FAQ"
        aria-pressed={activeNavTab === 'FAQ'}
        aria-current={activeNavTab === 'FAQ' ? 'page' : undefined}
      >
        <span style={getNavTextStyles('FAQ')}>FAQ</span>
      </div>
    </div>
  );
};

export default DesktopNavigationPills;

