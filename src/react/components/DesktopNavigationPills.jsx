import React, { useState, useCallback, useEffect } from 'react';
import shopService from '../services/shopService';

/**
 * DesktopNavigationPills
 * Reusable desktop navigation pill component extracted from FigmaDesktop.
 * - Preserves glassmorphism background container and pill styling
 * - Maintains accessibility and keyboard interaction
 * - Active/inactive font weights: 800 (active), 500 (inactive)
 *
 * Props:
 * - currentPage: 'Events' | 'About' | 'FAQ' | 'Shop' (default 'Events')
 * - onNavigate?: (tabName: 'Events' | 'About' | 'FAQ' | 'Shop') => void
 */
const DesktopNavigationPills = ({ currentPage = 'Events', onNavigate }) => {
  const [activeNavTab, setActiveNavTab] = useState(currentPage);
  const [hoveredNavTab, setHoveredNavTab] = useState(null);
  const [focusedNavTab, setFocusedNavTab] = useState(null);

  // 🚀 OPTIMIZATION: Initialize from storage to prevent layout shifts
  // Defaults to FALSE to prevent "flash of content" if disabled (user requirement)
  const [shopEnabled, setShopEnabled] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem('b2b_shop_enabled');
        // Only return true if explicitly set to 'true'
        return cached === 'true';
      }
    } catch (e) {
      // Ignore storage errors
    }
    return false; // Safe default
  });

  // Fetch shop settings
  useEffect(() => {
    const loadShopSettings = async () => {
      try {
        const config = await shopService.fetchConfig();
        if (config) {
          const enabled = config.shopEnabled ?? config.shop_enabled;
          if (typeof enabled !== 'undefined') {
            setShopEnabled(enabled);
            // 💾 Persist to storage for instant load next time
            try {
              localStorage.setItem('b2b_shop_enabled', String(enabled));
            } catch (e) {
              // Ignore storage errors
            }
          }
        }
      } catch (error) {
        console.error('Failed to load shop settings:', error);
      }
    };
    loadShopSettings();
  }, []);

  const navigateDefault = (tabName) => {
    if (tabName === 'About') {
      if (window.navigateWithTransition) window.navigateWithTransition('/about');
      else window.location.href = '/about';
    } else if (tabName === 'FAQ') {
      if (window.navigateWithTransition) window.navigateWithTransition('/faq');
      else window.location.href = '/faq';
    } else if (tabName === 'Shop') {
      if (window.navigateWithTransition) window.navigateWithTransition('/shop');
      else window.location.href = '/shop';
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
      // Glassmorphism per design system with brighter active state
      background: isActive
        ? 'rgba(22, 22, 22, 0.45)'
        : (isHovered ? 'rgba(22, 22, 22, 0.36)' : 'transparent'),
      backdropFilter: (isActive || isHovered) ? 'blur(12px)' : 'none',
      WebkitBackdropFilter: (isActive || isHovered) ? 'blur(12px)' : 'none',
      border: isActive
        ? '1px solid rgba(255, 255, 255, 0.20)'
        : (isHovered ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent'),
      boxShadow: isActive
        ? '0 0 0 2px rgba(255, 255, 255, 0.12), 0 6px 14px rgba(0, 0, 0, 0.35)'
        : (isHovered ? '0px 4px 8px rgba(0, 0, 0, 0.20)' : 'none'),
      color: '#FFFFFF',
      cursor: 'pointer',
      userSelect: 'none',
      transition: 'background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
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
      textShadow: isActive ? '0 0 8px rgba(255, 255, 255, 0.35)' : 'none',
      transition: 'font-weight 0.3s ease, text-shadow 0.2s ease'
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

  const containerWidth = shopEnabled ? '390px' : '294px';

  return (
    <div
      style={{
        position: 'relative',
        width: containerWidth,
        height: '44.2px',
        gridColumn: '3',
        justifySelf: 'end',
        transition: 'width 0.3s ease'
      }}
    >
      {/* Glassmorphism background container */}
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: containerWidth,
          height: '44.2px',
          background: 'rgba(22, 22, 22, 0.30)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '14px',
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          transition: 'width 0.3s ease'
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

      {/* Shop */}
      {shopEnabled && (
        <div
          role="button"
          tabIndex={0}
          style={getNavPillStyles('Shop', '292px')}
          onClick={() => handleNavClick('Shop')}
          onMouseEnter={() => setHoveredNavTab('Shop')}
          onMouseLeave={() => setHoveredNavTab(null)}
          onFocus={() => setFocusedNavTab('Shop')}
          onBlur={() => setFocusedNavTab(null)}
          onKeyDown={keyHandler('Shop')}
          aria-label="Navigate to Shop"
          aria-pressed={activeNavTab === 'Shop'}
          aria-current={activeNavTab === 'Shop' ? 'page' : undefined}
        >
          <span style={getNavTextStyles('Shop')}>Shop</span>
        </div>
      )}
    </div>
  );
};

export default DesktopNavigationPills;

