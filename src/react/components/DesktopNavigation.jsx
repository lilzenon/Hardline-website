import React, { useState, useCallback, useEffect } from 'react';
import shopService from '../services/shopService';

/**
 * Reusable Desktop Navigation Component
 * 
 * Extracted from homepage navigation structure with pixel-perfect consistency
 * across all desktop pages (Homepage, About, FAQ).
 * 
 * @param {string} currentPage - Current active page ('Events', 'About', 'FAQ')
 * @param {function} onNavigate - Navigation callback function
 */
const DesktopNavigation = ({ currentPage = 'Events', onNavigate }) => {
  const [activeNavTab, setActiveNavTab] = useState(currentPage);

  // 🔧 FIX: Start with FALSE to prevent flash of shop button
  // Always fetch fresh from API - no localStorage caching to prevent stale state
  const [shopEnabled, setShopEnabled] = useState(false);

  // Fetch shop settings from API (fresh data every time)
  useEffect(() => {
    const loadShopSettings = async () => {
      try {
        const config = await shopService.fetchConfig();
        if (config) {
          const enabled = config.shopEnabled ?? config.shop_enabled;
          if (typeof enabled !== 'undefined') {
            setShopEnabled(enabled);
          }
        }
      } catch (error) {
        console.error('Failed to load shop settings:', error);
      }
    };
    loadShopSettings();
  }, []);

  // Navigation handler with modern transitions - EXACT MATCH to homepage
  const handleNavClick = useCallback((tabName) => {
    setActiveNavTab(tabName);
    console.log(`🧭 Navigation: Switched to ${tabName} tab`);

    // Navigate to different pages with smooth transitions
    if (tabName === 'About') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/about');
      } else {
        window.location.href = '/about';
      }
    } else if (tabName === 'FAQ') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/faq');
      } else {
        window.location.href = '/faq';
      }
    } else if (tabName === 'Shop') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/shop');
      } else {
        window.location.href = '/shop';
      }
    } else if (tabName === 'Events') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/');
      } else {
        window.location.href = '/';
      }
    }

    // Call external navigation handler if provided
    if (onNavigate) {
      onNavigate(tabName);
    }
  }, [onNavigate]);

  // Get navigation pill styles based on active state - EXACT MATCH to homepage
  const getNavPillStyles = useCallback((tabName, leftPosition) => {
    const isActive = activeNavTab === tabName;
    return {
      position: 'absolute',
      left: leftPosition,
      top: '4.7px',     // Scaled up by 30% (3.61 × 1.30)
      display: 'flex',
      width: '93.3px',  // Scaled up by 30% (71.77 × 1.30) for better touch targets
      height: '34.8px', // Scaled up by 30% (26.79 × 1.30) for better touch targets
      padding: '0 14px', // Vertical centering: remove vertical padding; keep horizontal only
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      borderRadius: '12px', // Slightly increased border radius
      background: isActive ? '#000' : 'transparent',
      boxShadow: isActive ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease', // Smooth animation
      transform: isActive ? 'scale(1)' : 'scale(0.95)', // Subtle scale effect
      opacity: isActive ? 1 : 0.8
    };
  }, [activeNavTab]);

  // Get navigation text styles based on active state - EXACT MATCH to homepage
  const getNavTextStyles = useCallback((tabName) => {
    const isActive = activeNavTab === tabName;
    return {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '13px', // Increased from 12px to 13px for better readability
      fontWeight: isActive ? '300' : '400',
      lineHeight: 'normal',
      transition: 'font-weight 0.3s ease' // Smooth font weight transition
    };
  }, [activeNavTab]);

  // Calculate positions based on shopEnabled
  const positions = {
    Events: '4.21px',
    Shop: '100.14px',
    About: shopEnabled ? '196.07px' : '100.14px',
    FAQ: shopEnabled ? '292px' : '196.07px'
  };

  const containerWidth = shopEnabled ? '388px' : '294px';

  return (
    <div
      style={{
        position: 'relative',
        width: containerWidth, // Dynamic width
        height: '44.2px',  // Scaled up by 30% (34 × 1.30) for better touch targets
        gridColumn: '3',  // Place in third column (right side)
        justifySelf: 'end',  // Align to right edge of grid cell
        transition: 'width 0.3s ease' // Smooth width transition
      }}
    >
      {/* Background pill container */}
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: containerWidth, // Dynamic width
          height: '44.2px',  // Scaled up by 30% (34 × 1.30)
          background: '#232323',
          borderRadius: '14px', // Slightly increased border radius
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
          transition: 'width 0.3s ease' // Smooth width transition
        }}
      />

      {/* Events */}
      <div
        style={getNavPillStyles('Events', positions.Events)}
      >
        <a href="/" aria-label="Events" onClick={(e) => { e.preventDefault(); handleNavClick('Events') }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'inherit', textDecoration: 'none' }}>
          <span style={getNavTextStyles('Events')}>
            Events
          </span>
        </a>
      </div>

      {/* Shop - Conditionally Rendered */}
      {shopEnabled && (
        <div
          style={getNavPillStyles('Shop', positions.Shop)}
        >
          <a href="/shop" aria-label="Shop" onClick={(e) => { e.preventDefault(); handleNavClick('Shop') }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'inherit', textDecoration: 'none' }}>
            <span style={getNavTextStyles('Shop')}>
              Shop
            </span>
          </a>
        </div>
      )}

      {/* About */}
      <div
        style={getNavPillStyles('About', positions.About)}
      >
        <a href="/about" aria-label="About" onClick={(e) => { e.preventDefault(); handleNavClick('About') }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'inherit', textDecoration: 'none' }}>
          <span style={getNavTextStyles('About')}>
            About
          </span>
        </a>
      </div>

      {/* FAQ */}
      <div
        style={getNavPillStyles('FAQ', positions.FAQ)}
      >
        <a href="/faq" aria-label="FAQ" onClick={(e) => { e.preventDefault(); handleNavClick('FAQ') }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: 'inherit', textDecoration: 'none' }}>
          <span style={getNavTextStyles('FAQ')}>
            FAQ
          </span>
        </a>
      </div>
    </div>
  );
};

export default DesktopNavigation;
