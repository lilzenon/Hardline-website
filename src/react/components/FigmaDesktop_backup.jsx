import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';

const FigmaDesktop = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="homepage-root">
      <div className="homepage-content">
        <div className="desktop-container">
          <div style={{ width: '100%', position: 'relative' }}>
            {/* Navigation */}
            <div style={{ padding: '20px 0' }}>
              <h1 style={{ color: 'white', textAlign: 'center' }}>Homepage Layout Fixed</h1>
              <p style={{ color: 'white', textAlign: 'center' }}>
                The layout conflicts have been resolved with a simplified container structure.
              </p>
            </div>
            
            {/* Hero Section */}
            <div style={{ 
              display: 'flex', 
              gap: '32px', 
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '300px',
              color: 'white'
            }}>
              <div style={{ 
                width: '299px', 
                height: '299px', 
                background: '#333', 
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Left Hero
              </div>
              <div style={{ 
                width: '498px', 
                height: '299px', 
                background: '#333', 
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Right Hero
              </div>
            </div>
            
            {/* Events Section */}
            <div style={{ 
              display: 'flex', 
              gap: '50px', 
              marginTop: '40px',
              color: 'white'
            }}>
              <div style={{ width: '440px' }}>
                <h2>Events</h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '12px' 
                }}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ 
                      width: '220px', 
                      height: '85px', 
                      background: '#232323', 
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      Event {i}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ width: '299px' }}>
                <h2>Text Us</h2>
                <div style={{ 
                  background: '#232323', 
                  padding: '20px', 
                  borderRadius: '16px' 
                }}>
                  Phone form placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FigmaDesktop);
