import React from 'react';
import MobileNavigation from './MobileNavigation';

/**
 * Mobile-only About page component with shared navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const AboutPageMobile = () => {

  return (
    <>
      {/* Mobile-specific CSS */}
      <style>
        {`
          .mobile-content-fade {
            animation: fadeInUp 0.6s ease-out;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          background: '#000000',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {/* Main Mobile Device Frame - 430x932 */}
        <div
          style={{
            width: '430px',
            height: '932px',
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: '0 auto',
            position: 'relative',
            background: '#000000'
          }}
        >
          {/* Shared Mobile Navigation */}
          <MobileNavigation currentPage="about" />

          {/* Main Content Area - About Page */}
          <div
            className="mobile-content-fade"
            style={{
              position: 'absolute',
              left: '0px',
              top: '97px',
              width: '430px',
              height: '835px', // 932 - 97 = 835px
              background: '#000000',
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 24px',
              boxSizing: 'border-box',
              overflowY: 'auto'
            }}
          >
            {/* Page Title */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '32px',
                lineHeight: '1.2em',
                marginBottom: '24px',
                textAlign: 'center'
              }}
            >
              About B2B
            </div>

            {/* About Content */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '1.5em',
                marginBottom: '32px',
                textAlign: 'left'
              }}
            >
              <p style={{ marginBottom: '20px' }}>
                Bounce2Bounce is the premier destination for exclusive events, contests, and unforgettable experiences. 
                We connect people with the most exciting opportunities in their area.
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                Our platform brings together event organizers, brands, and participants to create meaningful connections 
                and memorable moments. From VIP experiences to local gatherings, we curate the best events for our community.
              </p>
              
              <p style={{ marginBottom: '20px' }}>
                Join thousands of members who trust Bounce2Bounce to discover and participate in exclusive events, 
                win amazing prizes, and connect with like-minded individuals.
              </p>
            </div>

            {/* Features Section */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '1.3em',
                marginBottom: '16px'
              }}
            >
              What We Offer
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px'
              }}
            >
              {[
                'Exclusive event access and VIP experiences',
                'Contests with amazing prizes and rewards',
                'Community-driven local gatherings',
                'Brand partnerships and collaborations',
                'Real-time notifications for new opportunities'
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#FFFFFF',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    lineHeight: '1.4em'
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      background: '#00FF40',
                      borderRadius: '50%',
                      flexShrink: 0
                    }}
                  />
                  {feature}
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '1.3em',
                  marginBottom: '12px'
                }}
              >
                Ready to Get Started?
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  lineHeight: '1.4em',
                  marginBottom: '20px'
                }}
              >
                Join our community and never miss an exclusive opportunity again.
              </div>
              <button
                onClick={() => handleNavigation('/')}
                style={{
                  background: '#00FF40',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>


      </div>
    </>
  );
};

export default AboutPageMobile;
