import React, { useState } from 'react';

/**
 * Mobile-only Contact page component with animated navigation
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const ContactPageMobile = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    if (window.navigateWithTransition) {
      window.navigateWithTransition(path);
    } else {
      window.location.href = path;
    }
    setShowMenu(false);
  };

  // Handle contact actions
  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@bounce2bounce.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+1-555-BOUNCE';
  };

  const handleSocialClick = (platform) => {
    const urls = {
      instagram: 'https://instagram.com/bounce2bounce',
      twitter: 'https://twitter.com/bounce2bounce',
      facebook: 'https://facebook.com/bounce2bounce'
    };
    window.open(urls[platform], '_blank');
  };

  return (
    <>
      {/* Mobile-specific CSS */}
      <style>
        {`
          .mobile-nav-item:hover {
            opacity: 0.8;
            transform: translateX(10px) !important;
            transition: all 0.3s ease;
          }
          .mobile-menu-button:hover {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.1);
            transition: all 0.2s ease;
          }
          
          .mobile-menu-button {
            transition: transform 0.2s ease;
          }
          
          .mobile-content-fade {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .contact-card:hover {
            transform: scale(1.02);
            transition: all 0.2s ease;
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
          {/* Navigation Bar - Mobile Component */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '430px',
              height: '97px',
              background: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              boxSizing: 'border-box'
            }}
          >
            {/* Menu Button - Left Side */}
            <div
              onClick={toggleMenu}
              className="mobile-menu-button"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {/* Animated Menu Lines */}
              <div 
                style={{ 
                  width: '24px', 
                  height: '2px', 
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: showMenu ? 'rotate(45deg) translateY(6px)' : 'rotate(0deg) translateY(0px)',
                  transformOrigin: 'center'
                }} 
              />
              <div 
                style={{ 
                  width: '24px', 
                  height: '2px', 
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: showMenu ? 0 : 1,
                  transform: showMenu ? 'scale(0)' : 'scale(1)'
                }} 
              />
              <div 
                style={{ 
                  width: '24px', 
                  height: '2px', 
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: showMenu ? 'rotate(-45deg) translateY(-6px)' : 'rotate(0deg) translateY(0px)',
                  transformOrigin: 'center'
                }} 
              />
            </div>
            
            {/* B2B Logo - Centered */}
            <img
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              style={{
                width: '138.41px',
                height: '43px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          {/* Main Content Area - Contact Page */}
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
                marginBottom: '16px',
                textAlign: 'center'
              }}
            >
              Contact Us
            </div>

            {/* Subtitle */}
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Inter',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '1.4em',
                marginBottom: '32px',
                textAlign: 'center'
              }}
            >
              Get in touch with our team. We'd love to hear from you!
            </div>

            {/* Contact Methods */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px'
              }}
            >
              {/* Email Contact */}
              <div
                className="contact-card"
                onClick={handleEmailClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: '#00FF40',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}
                  >
                    ✉️
                  </div>
                  <div>
                    <div
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Inter',
                        fontWeight: '600',
                        fontSize: '16px',
                        marginBottom: '4px'
                      }}
                    >
                      Email Us
                    </div>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'Inter',
                        fontSize: '14px'
                      }}
                    >
                      hello@bounce2bounce.com
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Contact */}
              <div
                className="contact-card"
                onClick={handlePhoneClick}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      background: '#00FF40',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}
                  >
                    📞
                  </div>
                  <div>
                    <div
                      style={{
                        color: '#FFFFFF',
                        fontFamily: 'Inter',
                        fontWeight: '600',
                        fontSize: '16px',
                        marginBottom: '4px'
                      }}
                    >
                      Call Us
                    </div>
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'Inter',
                        fontSize: '14px'
                      }}
                    >
                      +1 (555) BOUNCE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Section */}
            <div
              style={{
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontWeight: '600',
                fontSize: '20px',
                lineHeight: '1.3em',
                marginBottom: '16px',
                textAlign: 'center'
              }}
            >
              Follow Us
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginBottom: '32px'
              }}
            >
              {[
                { platform: 'instagram', icon: '📷', label: 'Instagram' },
                { platform: 'twitter', icon: '🐦', label: 'Twitter' },
                { platform: 'facebook', icon: '📘', label: 'Facebook' }
              ].map((social) => (
                <div
                  key={social.platform}
                  onClick={() => handleSocialClick(social.platform)}
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '24px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.background = 'rgba(0, 255, 64, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  {social.icon}
                </div>
              ))}
            </div>

            {/* Office Hours */}
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
                Office Hours
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  lineHeight: '1.4em',
                  marginBottom: '8px'
                }}
              >
                Monday - Friday: 9:00 AM - 6:00 PM PST
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  lineHeight: '1.4em',
                  marginBottom: '16px'
                }}
              >
                Weekend: 10:00 AM - 4:00 PM PST
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  lineHeight: '1.4em'
                }}
              >
                We typically respond within 24 hours
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - Same as About Page */}
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            opacity: showMenu ? 1 : 0,
            visibility: showMenu ? 'visible' : 'hidden',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: showMenu ? 'blur(10px)' : 'blur(0px)'
          }}
        >
          {/* Navigation Bar in Menu */}
          <div
            style={{
              width: '430px',
              height: '97px',
              maxWidth: '100vw',
              margin: '0 auto',
              position: 'relative',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 20px',
              boxSizing: 'border-box'
            }}
          >
            {/* Close Menu Button (Animated X) */}
            <div
              onClick={toggleMenu}
              className="mobile-menu-button"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {/* Same animated lines as main nav */}
              <div 
                style={{ 
                  width: '24px', 
                  height: '2px', 
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'rotate(45deg) translateY(6px)',
                  transformOrigin: 'center'
                }} 
              />
              <div 
                style={{ 
                  width: '24px', 
                  height: '2px', 
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: 0,
                  transform: 'scale(0)'
                }} 
              />
              <div 
                style={{ 
                  width: '24px', 
                  height: '2px', 
                  background: '#FFFFFF',
                  borderRadius: '1px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: 'rotate(-45deg) translateY(-6px)',
                  transformOrigin: 'center'
                }} 
              />
            </div>
            
            {/* B2B Logo - Centered */}
            <img
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              style={{
                width: '138.41px',
                height: '43px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>

          {/* Navigation Body */}
          <div
            style={{
              width: '430px',
              maxWidth: '100vw',
              margin: '0 auto',
              padding: '40px 25px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transform: showMenu ? 'translateY(0)' : 'translateY(-20px)',
              opacity: showMenu ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDelay: showMenu ? '0.2s' : '0s'
            }}
          >
            <div
              onClick={() => handleNavigation('/events')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'left',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: showMenu ? '0.3s' : '0s'
              }}
            >
              Events
            </div>
            <div
              onClick={() => handleNavigation('/about')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'left',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: showMenu ? '0.4s' : '0s'
              }}
            >
              About
            </div>
            <div
              onClick={() => handleNavigation('/contact')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#00FF40', // Highlighted as current page
                cursor: 'pointer',
                textAlign: 'left',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: showMenu ? '0.5s' : '0s'
              }}
            >
              Contact
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPageMobile;
