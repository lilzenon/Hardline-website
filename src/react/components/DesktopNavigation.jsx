import React, { useState, useCallback } from 'react';

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
      padding: '15px 14px', // Increased padding for better touch area
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

  return (
    <div
      style={{
        position: 'relative',
        width: '294.45px', // Scaled up by 30% (226.49 × 1.30) for better prominence
        height: '44.2px',  // Scaled up by 30% (34 × 1.30) for better touch targets
        gridColumn: '3',  // Place in third column (right side)
        justifySelf: 'end'  // Align to right edge of grid cell
      }}
    >
      {/* Background pill container - EXACT MATCH to homepage */}
      <div
        style={{
          position: 'absolute',
          left: '0px',
          top: '0px',
          width: '294.45px', // Scaled up by 30% (226.49 × 1.30)
          height: '44.2px',  // Scaled up by 30% (34 × 1.30)
          background: '#232323',
          borderRadius: '14px', // Slightly increased border radius
          boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
        }}
      />

      {/* Events - Scaled up by 30% (3.24 × 1.30) */}
      <div
        style={getNavPillStyles('Events', '4.21px')}
        onClick={() => handleNavClick('Events')}
      >
        <span style={getNavTextStyles('Events')}>
          Events
        </span>
      </div>

      {/* About - Scaled up by 30% (77.03 × 1.30) */}
      <div
        style={getNavPillStyles('About', '100.14px')}
        onClick={() => handleNavClick('About')}
      >
        <span style={getNavTextStyles('About')}>
          About
        </span>
      </div>

      {/* FAQ - Scaled up by 30% (150.82 × 1.30) */}
      <div
        style={getNavPillStyles('FAQ', '196.07px')}
        onClick={() => handleNavClick('FAQ')}
      >
        <span style={getNavTextStyles('FAQ')}>
          FAQ
        </span>
      </div>
    </div>
  );
};

export default DesktopNavigation;
