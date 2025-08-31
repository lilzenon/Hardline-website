import React, { useState, useEffect } from 'react';

// Social media platform configurations with authentic brand colors and icons
const SOCIAL_PLATFORMS = {
  facebook: {
    name: 'Facebook',
    color: '#1877F2',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M92 46C92 20.5949 71.4051 0 46 0C20.5949 0 0 20.5949 0 46C0 68.9895 16.7909 88.1309 38.75 91.3906V59.25H27.0625V46H38.75V35.8875C38.75 24.3219 45.6094 18.0625 56.1281 18.0625C61.1125 18.0625 66.3125 18.9375 66.3125 18.9375V30.25H60.6281C55.0344 30.25 53.25 33.6672 53.25 37.1875V46H65.8125L63.7781 59.25H53.25V91.3906C75.2091 88.1309 92 68.9895 92 46Z" fill="rgba(255, 255, 255, 0.85)"/>
      </svg>
    )
  },
  instagram: {
    name: 'Instagram',
    color: '#E4405F',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46 8.28125C58.2656 8.28125 59.6719 8.33594 64.5781 8.55469C69.1562 8.75 71.6406 9.51562 73.2969 10.1406C75.4844 11.0156 77.0312 12.0781 78.6406 13.6875C80.25 15.2969 81.3125 16.8438 82.1875 19.0312C82.8125 20.6875 83.5781 23.1719 83.7734 27.75C83.9922 32.6562 84.0469 34.0625 84.0469 46.3281C84.0469 58.5938 83.9922 60 83.7734 64.9062C83.5781 69.4844 82.8125 71.9688 82.1875 73.625C81.3125 75.8125 80.25 77.3594 78.6406 78.9688C77.0312 80.5781 75.4844 81.6406 73.2969 82.5156C71.6406 83.1406 69.1562 83.9062 64.5781 84.1016C59.6719 84.3203 58.2656 84.375 46 84.375C33.7344 84.375 32.3281 84.3203 27.4219 84.1016C22.8438 83.9062 20.3594 83.1406 18.7031 82.5156C16.5156 81.6406 14.9688 80.5781 13.3594 78.9688C11.75 77.3594 10.6875 75.8125 9.8125 73.625C9.1875 71.9688 8.42188 69.4844 8.22656 64.9062C8.00781 60 7.95312 58.5938 7.95312 46.3281C7.95312 34.0625 8.00781 32.6562 8.22656 27.75C8.42188 23.1719 9.1875 20.6875 9.8125 19.0312C10.6875 16.8438 11.75 15.2969 13.3594 13.6875C14.9688 12.0781 16.5156 11.0156 18.7031 10.1406C20.3594 9.51562 22.8438 8.75 27.4219 8.55469C32.3281 8.33594 33.7344 8.28125 46 8.28125ZM46 0C33.5156 0 31.9844 0.0625 27.0156 0.28125C22.0625 0.5 18.6094 1.29688 15.6094 2.46875C12.4844 3.6875 9.85938 5.32812 7.25 7.9375C4.64062 10.5469 3 13.1719 1.78125 16.2969C0.609375 19.2969 -0.1875 22.75 0.03125 27.7031C0.25 32.6719 0.3125 34.2031 0.3125 46.6875C0.3125 59.1719 0.25 60.7031 0.03125 65.6719C-0.1875 70.625 0.609375 74.0781 1.78125 77.0781C3 80.2031 4.64062 82.8281 7.25 85.4375C9.85938 88.0469 12.4844 89.6875 15.6094 90.9062C18.6094 92.0781 22.0625 92.875 27.0156 93.0938C31.9844 93.3125 33.5156 93.375 46 93.375C58.4844 93.375 60.0156 93.3125 64.9844 93.0938C69.9375 92.875 73.3906 92.0781 76.3906 90.9062C79.5156 89.6875 82.1406 88.0469 84.75 85.4375C87.3594 82.8281 89 80.2031 90.2188 77.0781C91.3906 74.0781 92.1875 70.625 92.4062 65.6719C92.625 60.7031 92.6875 59.1719 92.6875 46.6875C92.6875 34.2031 92.625 32.6719 92.4062 27.7031C92.1875 22.75 91.3906 19.2969 90.2188 16.2969C89 13.1719 87.3594 10.5469 84.75 7.9375C82.1406 5.32812 79.5156 3.6875 76.3906 2.46875C73.3906 1.29688 69.9375 0.5 64.9844 0.28125C60.0156 0.0625 58.4844 0 46 0Z" fill="rgba(255, 255, 255, 0.85)"/>
        <path d="M46 22.4375C33.0781 22.4375 22.4375 33.0781 22.4375 46C22.4375 58.9219 33.0781 69.5625 46 69.5625C58.9219 69.5625 69.5625 58.9219 69.5625 46C69.5625 33.0781 58.9219 22.4375 46 22.4375ZM46 61.25C37.6719 61.25 30.75 54.3281 30.75 46C30.75 37.6719 37.6719 30.75 46 30.75C54.3281 30.75 61.25 37.6719 61.25 46C61.25 54.3281 54.3281 61.25 46 61.25Z" fill="rgba(255, 255, 255, 0.85)"/>
        <path d="M76.0938 21.5312C76.0938 24.5312 73.6562 26.9688 70.6562 26.9688C67.6562 26.9688 65.2188 24.5312 65.2188 21.5312C65.2188 18.5312 67.6562 16.0938 70.6562 16.0938C73.6562 16.0938 76.0938 18.5312 76.0938 21.5312Z" fill="rgba(255, 255, 255, 0.85)"/>
      </svg>
    )
  },
  twitter: {
    name: 'X',
    color: '#000000',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M69.9 8.5h12.6l-27.6 31.5L92 83.5H64.6l-19.9-26L19.1 83.5H6.5l29.5-33.7L8 8.5h28.2l18 23.8L69.9 8.5zM65.4 76.3h7l-45.1-59.6H20L65.4 76.3z" fill="rgba(255, 255, 255, 0.85)"/>
      </svg>
    )
  },
  tiktok: {
    name: 'TikTok',
    color: '#000000',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65.2188 0H50.5938V62.5625C50.5938 70.0938 44.6875 76.1875 37.1562 76.1875C29.625 76.1875 23.7188 70.0938 23.7188 62.5625C23.7188 55.2188 29.4375 49.3125 36.5938 49.125V34.3125C21.6562 34.5 9.09375 47.25 9.09375 62.5625C9.09375 78.0625 21.6562 91 37.1562 91C52.6562 91 65.2188 78.0625 65.2188 62.5625V30.4375C71.3125 34.6875 78.6562 37.1562 86.375 37.1562V22.5312C74.5625 22.5312 65.2188 13.1875 65.2188 1.375V0Z" fill="rgba(255, 255, 255, 0.85)"/>
      </svg>
    )
  },
  youtube: {
    name: 'YouTube',
    color: '#FF0000',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90.0625 23.9375C89.0938 20.0156 86.0938 16.8906 82.1719 15.9219C75.0938 14.1875 46 14.1875 46 14.1875C46 14.1875 16.9062 14.1875 9.82812 15.9219C5.90625 16.8906 2.90625 20.0156 1.9375 23.9375C0.203125 31.0156 0.203125 46 0.203125 46C0.203125 46 0.203125 60.9844 1.9375 68.0625C2.90625 71.9844 5.90625 75.1094 9.82812 76.0781C16.9062 77.8125 46 77.8125 46 77.8125C46 77.8125 75.0938 77.8125 82.1719 76.0781C86.0938 75.1094 89.0938 71.9844 90.0625 68.0625C91.7969 60.9844 91.7969 46 91.7969 46C91.7969 46 91.7969 31.0156 90.0625 23.9375ZM37.1562 58.9375V33.0625L60.6562 46L37.1562 58.9375Z" fill="white"/>
      </svg>
    )
  },
  spotify: {
    name: 'Spotify',
    color: '#1DB954',
    icon: (
      <svg width="100%" height="100%" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M46 0C20.5949 0 0 20.5949 0 46C0 71.4051 20.5949 92 46 92C71.4051 92 92 71.4051 92 46C92 20.5949 71.4051 0 46 0ZM67.0781 66.3125C66.3125 67.6562 64.5781 68.0625 63.2344 67.2969C52.4688 60.9844 38.75 59.4375 22.7812 63.4375C21.25 63.8438 19.7031 62.9688 19.2969 61.4375C18.8906 59.9062 19.7656 58.3594 21.2969 57.9531C39.1406 53.5 54.3906 55.2344 66.5 62.5625C67.8438 63.3281 68.25 65.0625 67.0781 66.3125ZM72.5625 53.875C71.6406 55.5 69.5 55.9844 67.875 55.0625C55.5 47.8125 36.5938 45.7812 22.0312 50.5938C20.2031 51.1406 18.2812 50.1719 17.7344 48.3438C17.1875 46.5156 18.1562 44.5938 19.9844 44.0469C36.7812 38.5625 57.7188 40.8594 71.9688 49.1875C73.5938 50.1094 74.0781 52.25 72.5625 53.875ZM73.0156 40.9375C58.2188 32.6562 33.8125 31.8906 19.7031 36.2969C17.5781 36.9375 15.3438 35.7812 14.7031 33.6562C14.0625 31.5312 15.2188 29.2969 17.3438 28.6562C33.4375 23.6562 60.0938 24.5156 76.8906 34.0625C78.7188 35.1406 79.3594 37.5625 78.2812 39.3906C77.2031 41.2188 74.7812 41.8594 73.0156 40.9375Z" fill="white"/>
      </svg>
    )
  }
};

/**
 * Social Media Buttons Component
 * Displays social media buttons with authentic brand styling and animations
 * Follows exact Figma design specifications
 */
const SocialMediaButtons = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buttonsAnimated, setButtonsAnimated] = useState(false);

  // Enhanced fetch with retry mechanism and timeout handling
  useEffect(() => {
    let abortController = new AbortController();
    let retryCount = 0;
    const maxRetries = 3;
    const retryDelay = 1000; // Start with 1 second

    const fetchSocialLinksWithRetry = async () => {
      try {
        console.log(`🔍 Fetching social media links (attempt ${retryCount + 1}/${maxRetries + 1})`);

        // Determine the correct dashboard API URL based on environment
        const isLocalDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const dashboardApiUrl = isLocalDevelopment
          ? 'http://localhost:3002/api/social-media'
          : 'https://admin.b2b.click/api/social-media';

        console.log('🔍 Using dashboard API URL:', dashboardApiUrl);

        // Enhanced fetch with timeout and abort signal
        const timeoutId = setTimeout(() => abortController.abort(), 10000); // 10 second timeout

        const response = await fetch(dashboardApiUrl, {
          signal: abortController.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          credentials: 'omit' // Don't send credentials for public endpoint
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.links)) {
          console.log(`✅ Loaded ${data.links.length} social media links`);
          setSocialLinks(data.links);
          setError(null); // Clear any previous errors
        } else {
          throw new Error(data.error || 'Invalid response format');
        }
      } catch (err) {
        console.error(`❌ Error fetching social media links (attempt ${retryCount + 1}):`, err);

        // Don't retry if aborted (component unmounted)
        if (err.name === 'AbortError') {
          console.log('🛑 Fetch aborted (component unmounted)');
          return;
        }

        // Retry logic with exponential backoff
        if (retryCount < maxRetries) {
          retryCount++;
          const delay = retryDelay * Math.pow(2, retryCount - 1); // Exponential backoff
          console.log(`🔄 Retrying in ${delay}ms...`);

          setTimeout(() => {
            if (!abortController.signal.aborted) {
              fetchSocialLinksWithRetry();
            }
          }, delay);
          return;
        }

        // All retries failed - use fallback
        console.warn('⚠️ All retry attempts failed, using fallback social links');
        setError('Using fallback links');

        // Fallback social links to prevent complete disappearance
        setSocialLinks([
          { platform: 'instagram', url: 'https://instagram.com/bounce2bounce', display_order: 1, enabled: true },
          { platform: 'tiktok', url: 'https://tiktok.com/@bounce2bounce', display_order: 2, enabled: true },
          { platform: 'facebook', url: 'https://facebook.com/bounce2bounce', display_order: 3, enabled: true },
          { platform: 'twitter', url: 'https://twitter.com/bounce2bounce', display_order: 4, enabled: true }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinksWithRetry();

    // Trigger animation immediately for better loading sequence
    setTimeout(() => setButtonsAnimated(true), 200);

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, []);

  // Show skeleton during loading to maintain layout and timing
  if (loading) {
    return (
      <section
        style={{
          width: '100%',
          margin: '0',
          padding: '0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        aria-label="Loading social media links"
      >
        <div
          className={buttonsAnimated ? 'social-buttons-spring' : 'social-buttons-hidden'}
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between', // Match main container distribution
            alignItems: 'center',
            width: 'min(350px, calc(100vw - 60px))', // Adjusted to match hero card width exactly
            maxWidth: 'min(350px, calc(100vw - 60px))', // Adjusted to match hero card width exactly
            padding: '0',
            boxSizing: 'border-box'
          }}
        >
          {/* Skeleton buttons */}
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              style={{
                width: 'calc((100% - 30px) / 4)', // Match the actual button sizing
                height: 'clamp(70px, 20vw, 85px)', // Match the actual button height
                minWidth: '70px',
                maxWidth: '85px',
                borderRadius: '20px',
                background: 'rgba(22, 22, 22, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0,
                opacity: 0.6,
                aspectRatio: '1 / 1' // Ensure square skeleton buttons
              }}
            />
          ))}
        </div>
      </section>
    );
  }

  // Enhanced error handling - show fallback instead of disappearing
  if (socialLinks.length === 0) {
    // If we have an error but no fallback links were set, don't render
    if (error && !error.includes('fallback')) {
      console.warn('⚠️ No social links available and no fallback, component will be hidden');
      return null;
    }

    // If still loading or no links at all, don't render
    if (!error) {
      return null;
    }
  }

  return (
    <section
      style={{
        width: '100%',
        margin: '0', // Remove all margins
        padding: '0', // Remove all padding
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
      aria-label="Follow us on social media"
    >
      {/* Social Media Buttons Container */}
      <div
        className={buttonsAnimated ? 'social-buttons-spring' : 'social-buttons-hidden'}
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap', // Prevent stacking
          justifyContent: 'space-between', // Use space-between for better edge alignment
          alignItems: 'center',
          width: 'min(350px, calc(100vw - 60px))', // Adjusted to match hero card width exactly
          maxWidth: 'min(350px, calc(100vw - 60px))', // Adjusted to match hero card width exactly
          padding: '0', // No padding to maximize space
          boxSizing: 'border-box'
        }}
      >
        {socialLinks.map((link, index) => {
          const platform = SOCIAL_PLATFORMS[link.platform];
          if (!platform) return null;

          return (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${platform.name}`}
              style={{
                // Calculate button size to fill container width properly (4 buttons with gaps)
                width: 'calc((100% - 30px) / 4)', // Divide available width by 4 buttons, accounting for gaps
                height: 'clamp(70px, 20vw, 85px)', // Responsive height that scales well
                minWidth: '70px', // Minimum for usability
                maxWidth: '85px', // Maximum to prevent oversizing
                borderRadius: '20px', // Optimized radius
                background: 'rgba(22, 22, 22, 0.6)', // Enhanced glassmorphic background
                backdropFilter: 'blur(12px)', // Increased blur for better glass effect
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)', // Slightly more visible border
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px', // Optimized padding for better icon ratio
                boxSizing: 'border-box',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'scale(1)',
                animationDelay: buttonsAnimated ? `${0.2 + (index * 0.1)}s` : '0s',
                flexShrink: 0, // Prevent buttons from shrinking
                aspectRatio: '1 / 1' // Ensure square buttons
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.background = 'rgba(120, 120, 120, 0.8)'; // Noticeable medium gray like TikTok
                e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 255, 255, 0.2), 0 0 24px rgba(255, 255, 255, 0.1)'; // More subtle glow
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(22, 22, 22, 0.6)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.background = 'rgba(120, 120, 120, 0.8)'; // Noticeable medium gray like TikTok
                e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 255, 255, 0.2), 0 0 24px rgba(255, 255, 255, 0.1)'; // More subtle glow
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.3)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(22, 22, 22, 0.6)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(22, 22, 22, 0.6)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Social Media Icon */}
              <div
                style={{
                  width: '40px', // Slightly larger icon size for better visibility
                  height: '40px', // Slightly larger icon size for better visibility
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {platform.icon}
              </div>
            </a>
          );
        })}
      </div>

      {/* CSS Animation Styles */}
      <style>{`
        .social-buttons-hidden {
          opacity: 0;
          transform: translateY(20px);
        }

        .social-buttons-spring {
          opacity: 1;
          transform: translateY(0);
          animation: socialButtonsSpring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes socialButtonsSpring {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Skeleton loading styles for iOS Safari compatibility */
        .skeleton-button {
          width: clamp(75px, 18vw, 95px);
          height: clamp(75px, 18vw, 95px);
          border-radius: 50%;
          background: linear-gradient(90deg, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 75%);
          background-size: 200% 100%;
          animation: skeletonShimmer 1.5s infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .skeleton-icon {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          background: rgba(255,255,255,0.15);
        }

        @keyframes skeletonShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SocialMediaButtons;
