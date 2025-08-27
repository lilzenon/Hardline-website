import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';
import { useAnalytics } from '../hooks/useAnalytics';
import SocialMediaButtons from './SocialMediaButtons';

// Robust Laylo Iframe Component with Proper SDK Initialization and Content Detection
const LayloIframe = memo(({ dropId, color = 'ff0409', theme = 'dark', background = 'solid', minimal = true, style = {} }) => {
  const [layloReady, setLayloReady] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef(null);
  const contentCheckInterval = useRef(null);
  const maxRetries = 2;
  const contentCheckTimeout = 2000; // 2 seconds to detect content (faster)

  // Build Laylo URL with parameters
  const layloUrl = useMemo(() => {
    const params = new URLSearchParams({
      dropId,
      color,
      theme,
      background: background,
      ...(minimal && { minimal: 'true' })
    });
    return `https://embed.laylo.com/?${params.toString()}`;
  }, [dropId, color, theme, background, minimal]);

  // Check if Laylo SDK is ready (simplified and faster)
  const checkLayloSDKReady = useCallback(() => {
    // Check for Laylo SDK script - if it exists, we're good to go
    const sdkScript = document.querySelector('script[src*="laylo-sdk.js"]');
    if (sdkScript) {
      console.log('✅ Laylo SDK script found, proceeding with iframe');
      return true;
    }

    return false;
  }, []);

  // Check if iframe content has loaded (phone form is visible)
  const checkIframeContent = useCallback(() => {
    if (!iframeRef.current) return false;

    try {
      // Try to access iframe content (may fail due to CORS)
      const iframeDoc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;

      if (iframeDoc) {
        // Look for Laylo-specific elements
        const hasPhoneInput = iframeDoc.querySelector('input[type="tel"]') ||
                             iframeDoc.querySelector('input[placeholder*="phone"]') ||
                             iframeDoc.querySelector('.phone-input') ||
                             iframeDoc.querySelector('[data-testid*="phone"]');

        const hasSubmitButton = iframeDoc.querySelector('button[type="submit"]') ||
                               iframeDoc.querySelector('button:contains("RSVP")') ||
                               iframeDoc.querySelector('.submit-button');

        if (hasPhoneInput || hasSubmitButton) {
          console.log('✅ Laylo iframe content detected (phone form visible)');
          return true;
        }

        // Check for any meaningful content (not just empty body)
        const bodyContent = iframeDoc.body?.innerHTML || '';
        if (bodyContent.length > 100 && !bodyContent.includes('loading')) {
          console.log('✅ Laylo iframe has meaningful content');
          return true;
        }
      }
    } catch (e) {
      // CORS error is expected, but iframe might still be working
      // Check iframe dimensions as a proxy for content
      const iframe = iframeRef.current;
      if (iframe && iframe.offsetHeight > 50) {
        console.log('✅ Laylo iframe appears to have content (height check)');
        return true;
      }
    }

    return false;
  }, []);

  // Start content detection polling
  const startContentDetection = useCallback(() => {
    console.log('🔍 Starting Laylo content detection...');

    const checkContent = () => {
      if (checkIframeContent()) {
        setContentLoaded(true);
        if (contentCheckInterval.current) {
          clearInterval(contentCheckInterval.current);
          contentCheckInterval.current = null;
        }
        return;
      }
    };

    // Check immediately
    checkContent();

    // Then check every 100ms (faster polling)
    contentCheckInterval.current = setInterval(checkContent, 100);

    // Timeout after 2 seconds (faster timeout)
    setTimeout(() => {
      if (contentCheckInterval.current && !contentLoaded) {
        console.warn('⚠️ Laylo content detection timeout');
        clearInterval(contentCheckInterval.current);
        contentCheckInterval.current = null;

        // Retry if we haven't exceeded max retries
        if (retryCount < maxRetries) {
          console.log(`🔄 Retrying Laylo iframe (${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setIframeReady(false);
          setContentLoaded(false);

          // Recreate iframe after a shorter delay
          setTimeout(() => {
            if (iframeRef.current) {
              iframeRef.current.src = layloUrl + '&_retry=' + Date.now();
            }
          }, 500);
        }
      }
    }, contentCheckTimeout);
  }, [checkIframeContent, contentLoaded, retryCount, maxRetries, layloUrl]);

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    console.log('📦 Laylo iframe element loaded');
    setIframeReady(true);

    // Start checking for content immediately (no delay)
    startContentDetection();
  }, [startContentDetection]);

  // Wait for Laylo SDK to be fully ready
  useEffect(() => {
    if (layloReady) return;

    const checkSDK = () => {
      if (checkLayloSDKReady()) {
        setLayloReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkSDK()) return;

    // Poll every 50ms until SDK is ready (faster polling)
    const interval = setInterval(() => {
      if (checkSDK()) {
        clearInterval(interval);
      }
    }, 50);

    // Timeout after 3 seconds (much faster)
    const timeout = setTimeout(() => {
      clearInterval(interval);
      console.warn('⚠️ Laylo SDK initialization timeout, proceeding anyway');
      setLayloReady(true);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [layloReady, checkLayloSDKReady]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (contentCheckInterval.current) {
        clearInterval(contentCheckInterval.current);
      }
    };
  }, []);

  // Only render iframe when Laylo SDK is ready
  if (!layloReady) {
    return (
      <div style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px', opacity: 0.7 }}>
        <span style={{ fontSize: '12px', color: '#666' }}>Loading Laylo...</span>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      id={`laylo-drop-${dropId}`}
      frameBorder="0"
      scrolling="no"
      allow="web-share"
      onLoad={handleIframeLoad}
      style={{
        ...style,
        opacity: contentLoaded ? 1 : 0.8,
        transition: 'opacity 0.15s ease-out',
        minHeight: '60px'
      }}
      src={layloUrl}
    />
  );
});

// Enhanced image helpers with iOS Safari compatibility
const getOptimizedImageUrl = (originalUrl, width = null) => {
  if (!originalUrl) return originalUrl;

  // Check if we're on iOS Safari for compatibility decisions
  const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

  // Handle new image system URLs (/api/images/serve/{uuid})
  if (typeof originalUrl === 'string' && originalUrl.includes('/api/images/serve/')) {
    console.log('🔄 Processing new image system URL:', originalUrl);

    // Extract the UUID from the URL
    const uuidMatch = originalUrl.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
    if (uuidMatch) {
      const uuid = uuidMatch[1];

      // Build optimized URL using the dashboard domain
      const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';

      // Use appropriate variant based on width or default to medium for event cards
      let variant = 'medium'; // Default for event cards (111px)
      if (width) {
        if (width <= 150) variant = 'small';
        else if (width <= 300) variant = 'medium';
        else if (width <= 600) variant = 'large';
        else variant = 'large'; // Use large for anything bigger
      }

      const optimizedUrl = `${dashboardDomain}/api/images/serve/${uuid}/${variant}`;

      console.log('✅ Generated optimized URL for new image system:', optimizedUrl, `(variant: ${variant})`);
      return optimizedUrl;
    }
  }

  // Handle old image system URLs (/images/figma-exact/)
  if (typeof originalUrl === 'string' && originalUrl.includes('/images/figma-exact/')) {
    const filename = originalUrl.split('/').pop();

    // For iOS Safari, prefer JPEG over WebP for better compatibility
    if (isIOSSafari && filename.includes('.webp')) {
      const jpegFilename = filename.replace('.webp', '.jpg');
      return `/images/optimized/${jpegFilename}`;
    }

    return `/images/optimized/${filename}`;
  }

  // Handle external HTTP URLs
  if (typeof originalUrl === 'string' && originalUrl.startsWith('http')) {
    const encodedUrl = encodeURIComponent(originalUrl);
    // Use dashboard server for image optimization (publicly accessible)
    const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
    const baseUrl = `${dashboardDomain}/images/proxy-optimized?url=${encodedUrl}`;

    // Add iOS Safari specific parameters for better compatibility
    const iosSafariParams = isIOSSafari ? '&format=jpeg&quality=85' : '';
    const finalUrl = width ? `${baseUrl}&w=${width}${iosSafariParams}` : `${baseUrl}${iosSafariParams}`;

    return finalUrl;
  }

  // Handle relative URLs that might be from the new system but without full path
  if (typeof originalUrl === 'string' && originalUrl.startsWith('/') && !originalUrl.includes('/images/')) {
    console.log('🔄 Processing relative URL, assuming new image system:', originalUrl);

    // If it looks like a UUID-based path, treat it as new system
    const uuidMatch = originalUrl.match(/([a-f0-9-]{36})/);
    if (uuidMatch) {
      const uuid = uuidMatch[1];
      const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';

      // Use medium variant for event cards
      const optimizedUrl = `${dashboardDomain}/api/images/serve/${uuid}/medium`;

      console.log('✅ Generated URL for UUID-based relative path:', optimizedUrl);
      return optimizedUrl;
    }
  }

  console.log('⚠️ No optimization applied to URL:', originalUrl);
  return originalUrl;
};

const responsiveSizes = (context) => {
  if (context === 'event') return [111, 222, 333];
  if (context === 'hero') return [350, 700, 1050];
  return [150, 300, 600];
};

const getResponsiveSrcSet = (originalUrl, context = 'event') => {
  if (!originalUrl) return '';
  return responsiveSizes(context)
    .map((size) => `${getOptimizedImageUrl(originalUrl, size)} ${size}w`)
    .join(', ');
};

const getAVIFSrcSet = (originalUrl, context = 'event') => {
  if (!originalUrl) return '';

  // Safari mobile has poor AVIF support, skip AVIF for Safari mobile
  const isSafariMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  if (isSafariMobile) {
    return ''; // Return empty to skip AVIF source entirely
  }

  const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
  return responsiveSizes(context)
    .map((size) => `${dashboardDomain}/images/proxy-optimized?url=${encodeURIComponent(originalUrl)}&w=${size}&format=avif ${size}w`)
    .join(', ');
};

const shouldPreloadImage = (index, isMobile = true) => index < (isMobile ? 2 : 4);

const getImageLoadingStrategy = (index, isMobile = true) => {
  if (shouldPreloadImage(index, isMobile)) {
    return { loading: 'eager', decoding: 'async', fetchpriority: 'high' };
  }
  return { loading: 'lazy', decoding: 'async', fetchpriority: 'low' };
};

// Enhanced iOS Safari image fallback handler
const handleFinalImageFallback = (imgElement, card) => {
  console.log('🎨 Applying final image fallback for:', card.title);

  // Hide the broken image
  imgElement.style.display = 'none';

  // Create a styled placeholder div
  const placeholder = document.createElement('div');
  placeholder.style.cssText = `
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    color: white;
    font-family: Inter, sans-serif;
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    padding: 8px;
    box-sizing: border-box;
  `;

  // Add event title or generic text
  const eventTitle = card.title || 'Event';
  const displayText = eventTitle.length > 20 ? eventTitle.substring(0, 17) + '...' : eventTitle;
  placeholder.textContent = displayText;

  // Replace the image with the placeholder
  imgElement.parentNode.insertBefore(placeholder, imgElement);
  imgElement.remove();
};

// Helper for third fallback attempt
const handleImageFallbackAttempt3 = (imgElement, card) => {
  if (card.coverImage.includes('/api/images/serve/')) {
    // For new image system, try thumbnail variant as last resort
    const uuidMatch = card.coverImage.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
    if (uuidMatch) {
      const uuid = uuidMatch[1];
      const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
      const thumbnailUrl = `${dashboardDomain}/api/images/serve/${uuid}/thumbnail`;
      console.log('🔄 Attempt 3: Trying thumbnail variant for new image system:', thumbnailUrl);
      imgElement.src = thumbnailUrl;
      return;
    }
  }

  // For old system, try PNG fallback
  const pngFallback = card.coverImage.replace(/\.(webp|avif|jpg|jpeg)$/i, '.png');
  if (pngFallback !== card.coverImage && !card.coverImage.includes('.png')) {
    console.log('🔄 Attempt 3: Trying PNG fallback:', pngFallback);
    imgElement.src = pngFallback;
  } else {
    // No more options, go to final fallback
    handleFinalImageFallback(imgElement, card);
  }
};

// Simple cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for formatted dates to avoid repeated calculations
const dateFormatCache = new Map();

// Country codes and phone patterns for international support with flag SVGs
const COUNTRIES = [
  {
    id: 'us',
    code: '+1',
    name: 'United States',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjQjIyMjM0Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMCAwSDIxVjFIMFYwWk0wIDJIMjFWM0gwVjJaTTAgNEgyMVY1SDBWNFpNMCA2SDIxVjdIMFY2Wk0wIDhIMjFWOUgwVjhaTTAgMTBIMjFWMTFIMFYxMFpNMCAxMkgyMVYxM0gwVjEyWiIgZmlsbD0id2hpdGUiLz4KPHJlY3Qgd2lkdGg9IjkiIGhlaWdodD0iOCIgZmlsbD0iIzNDM0I2RSIvPgo8L3N2Zz4K',
    pattern: /^\d{10}$/,
    placeholder: '(555) 123-4567',
    maxLength: 14,
    digitLength: 10
  },
  {
    id: 'ca',
    code: '+1',
    name: 'Canada',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGMDAwMCIvPjxwYXRoIGQ9Ik0xMC41IDNMMTIgNUgxNEwxMi41IDdMMTQgOUgxMkwxMC41IDExTDkgOUg3TDguNSA3TDcgNUg5TDEwLjUgM1oiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K',
    pattern: /^\d{10}$/,
    placeholder: '(555) 123-4567',
    maxLength: 14,
    digitLength: 10
  },
  {
    id: 'gb',
    code: '+44',
    name: 'United Kingdom',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2MTVIMHoiIGZpbGw9IiMwMTIxNjkiLz4KPC9zdmc+',
    pattern: /^\d{10,11}$/,
    placeholder: '7911 123456',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'au',
    code: '+61',
    name: 'Australia',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+PC9zdmc+',
    pattern: /^\d{9}$/,
    placeholder: '412 345 678',
    maxLength: 11,
    digitLength: 9
  },
  {
    id: 'de',
    code: '+49',
    name: 'Germany',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDAwMDAwIi8+PHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjAwMDAiLz48cmVjdCB5PSIxMCIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRkNFMDAiLz48L3N2Zz4K',
    pattern: /^\d{10,11}$/,
    placeholder: '30 12345678',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'fr',
    code: '+33',
    name: 'France',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0VEMjkzOSIvPjwvc3ZnPgo=',
    pattern: /^\d{9}$/,
    placeholder: '6 12 34 56 78',
    maxLength: 12,
    digitLength: 9
  },
  {
    id: 'es',
    code: '+34',
    name: 'Spain',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZDNDAwIi8+PHJlY3QgeT0iMyIgd2lkdGg9IjIxIiBoZWlnaHQ9IjkiIGZpbGw9IiNGRjAwMDAiLz48L3N2Zz4K',
    pattern: /^\d{9}$/,
    placeholder: '612 34 56 78',
    maxLength: 11,
    digitLength: 9
  },
  {
    id: 'it',
    code: '+39',
    name: 'Italy',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDk5NDYiLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMkIzNyIvPjwvc3ZnPgo=',
    pattern: /^\d{10}$/,
    placeholder: '312 345 6789',
    maxLength: 12,
    digitLength: 10
  },
  {
    id: 'jp',
    code: '+81',
    name: 'Japan',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iNCIgZmlsbD0iI0JDMDAyRCIvPjwvc3ZnPgo=',
    pattern: /^\d{10,11}$/,
    placeholder: '90 1234 5678',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'kr',
    code: '+82',
    name: 'South Korea',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjRkZGRkZGIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwNDhCQSIvPjxwYXRoIGQ9Ik0xMC41IDQuNUMxMi40MyA0LjUgMTQgNi4wNyAxNCA3LjVTMTIuNDMgMTAuNSAxMC41IDEwLjVDOC41NyAxMC41IDcgOC45MyA3IDcuNVM4LjU3IDQuNSAxMC41IDQuNVoiIGZpbGw9IiNEQzE0M0MiLz48L3N2Zz4K',
    pattern: /^\d{10,11}$/,
    placeholder: '10 1234 5678',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'cn',
    code: '+86',
    name: 'China',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjREUyOTEwIi8+PHBvbHlnb24gcG9pbnRzPSI0LDMgNS41LDUuNSAzLDUuNSA1LDcgMi41LDcgNCwzIiBmaWxsPSIjRkZERTAwIi8+PC9zdmc+',
    pattern: /^\d{11}$/,
    placeholder: '138 0013 8000',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'in',
    code: '+91',
    name: 'India',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNGRjk5MzMiLz48cmVjdCB5PSI1IiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHk9IjEwIiB3aWR0aD0iMjEiIGhlaWdodD0iNSIgZmlsbD0iIzEzOEEwOCIvPjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjIiIHN0cm9rZT0iIzAwMDA4MCIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4K',
    pattern: /^\d{10}$/,
    placeholder: '98765 43210',
    maxLength: 12,
    digitLength: 10
  },
  {
    id: 'br',
    code: '+55',
    name: 'Brazil',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+PHBhdGggZD0iTTEwLjUgMkwxOCA3LjVMMTAuNSAxM0wzIDcuNUwxMC41IDJaIiBmaWxsPSIjRkVERjAwIi8+PGNpcmNsZSBjeD0iMTAuNSIgY3k9IjcuNSIgcj0iMyIgZmlsbD0iIzAwMjc3NiIvPjwvc3ZnPgo=',
    pattern: /^\d{10,11}$/,
    placeholder: '11 91234 5678',
    maxLength: 14,
    digitLength: 11
  },
  {
    id: 'mx',
    code: '+52',
    name: 'Mexico',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz48cmVjdCB4PSI3IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0ZGRkZGRiIvPjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI0NFMTEyNiIvPjwvc3ZnPgo=',
    pattern: /^\d{10}$/,
    placeholder: '55 1234 5678',
    maxLength: 12,
    digitLength: 10
  }
];

// Robust phone formatting functions with consistent patterns
const formatPhoneNumber = (value, countryId) => {
  // Always work with digits only
  const phoneNumber = typeof value === 'string' ? value.replace(/[^\d]/g, '') : '';
  const country = COUNTRIES.find(c => c.id === countryId);
  if (!country || phoneNumber.length === 0) return phoneNumber;

  // Limit digits to country's max digit length
  const limitedNumber = phoneNumber.slice(0, country.digitLength);

  switch (countryId) {
    case 'us':
    case 'ca':
      // US/Canada format: (XXX) XXX-XXXX
      if (limitedNumber.length <= 3) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `(${limitedNumber.slice(0,3)}) ${limitedNumber.slice(3)}`;
      }
      return `(${limitedNumber.slice(0,3)}) ${limitedNumber.slice(3,6)}-${limitedNumber.slice(6)}`;

    case 'gb':
      // UK format: XXXX XXX XXXX
      if (limitedNumber.length <= 4) return limitedNumber;
      if (limitedNumber.length <= 7) {
        return `${limitedNumber.slice(0,4)} ${limitedNumber.slice(4)}`;
      }
      return `${limitedNumber.slice(0,4)} ${limitedNumber.slice(4,7)} ${limitedNumber.slice(7)}`;

    case 'jp':
    case 'kr':
      // Japan/Korea format: XX XXXX XXXX
      if (limitedNumber.length <= 2) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2)}`;
      }
      return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2,6)} ${limitedNumber.slice(6)}`;

    case 'cn':
      // China format: XXX XXXX XXXX
      if (limitedNumber.length <= 3) return limitedNumber;
      if (limitedNumber.length <= 7) {
        return `${limitedNumber.slice(0,3)} ${limitedNumber.slice(3)}`;
      }
      return `${limitedNumber.slice(0,3)} ${limitedNumber.slice(3,7)} ${limitedNumber.slice(7)}`;

    case 'in':
      // India format: XXXXX XXXXX
      if (limitedNumber.length <= 5) return limitedNumber;
      return `${limitedNumber.slice(0,5)} ${limitedNumber.slice(5)}`;

    case 'br':
      // Brazil format: XX XXXXX XXXX
      if (limitedNumber.length <= 2) return limitedNumber;
      if (limitedNumber.length <= 7) {
        return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2)}`;
      }
      return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2,7)} ${limitedNumber.slice(7)}`;

    case 'mx':
      // Mexico format: XX XXXX XXXX
      if (limitedNumber.length <= 2) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2)}`;
      }
      return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2,6)} ${limitedNumber.slice(6)}`;

    default:
      // Generic formatting for other countries - XXX XXX XXXX
      if (limitedNumber.length <= 3) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `${limitedNumber.slice(0,3)} ${limitedNumber.slice(3)}`;
      }
      return `${limitedNumber.slice(0,3)} ${limitedNumber.slice(3,6)} ${limitedNumber.slice(6)}`;
  }
};

const isValidPhoneNumber = (value, countryId) => {
  const phoneNumber = value.replace(/[^\d]/g, '');
  const country = COUNTRIES.find(c => c.id === countryId);
  if (!country) return phoneNumber.length >= 10 && phoneNumber.length <= 15;
  return country.pattern.test(phoneNumber);
};

// Get current country data
const getCurrentCountry = (countryId) => {
  return COUNTRIES.find(c => c.id === countryId) || COUNTRIES[0];
};

/**
 * Mobile-only homepage component built exactly from Figma Mobile Device frames
 * Serves mobile users (viewport width <= 768px) with mobile-optimized design
 */
const FigmaMobile = () => {
  // Initialize analytics
  const { trackEvent, trackLinkClick } = useAnalytics();

  // YouTube thumbnail preloader state for better performance
  const [showYoutubeThumbnail, setShowYoutubeThumbnail] = useState(true);
  const [shouldLoadYoutube, setShouldLoadYoutube] = useState(false);

  useEffect(() => {
    // Start with thumbnail for faster loading, then auto-load video after delay
    setTimeout(() => {
      setShowYoutubeThumbnail(false);
      setShouldLoadYoutube(true);
    }, 2000); // Load actual video after 2 seconds for better perceived performance

    // Track mobile component load - IMPORTANT for understanding user experience
    trackEvent('component_load', {
      component: 'FigmaMobile',
      viewport_type: 'mobile'
    });
  }, [trackEvent]);

  // Add useEffect for Laylo SDK initialization
  useEffect(() => {
    // Load Laylo SDK script only once
    if (!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')) {
      const layloScript = document.createElement('script');
      layloScript.src = 'https://embed.laylo.com/laylo-sdk.js';
      layloScript.async = true;
      document.head.appendChild(layloScript);
      console.log('✅ Laylo SDK script loaded');
    }
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitting, setPhoneSubmitting] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState('us');
  const [phoneInputState, setPhoneInputState] = useState('normal'); // normal, loading, valid, invalid
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationPhone, setVerificationPhone] = useState('');
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const [verificationState, setVerificationState] = useState('normal'); // normal, filled, valid, invalid
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [drawerFullyClosed, setDrawerFullyClosed] = useState(false); // Start in collapsed state showing "Text us"
  const [iframeExpanded, setIframeExpanded] = useState(false); // Track iframe interaction
  const [iframeHasLoadedOnce, setIframeHasLoadedOnce] = useState(false); // Track if iframe has been loaded to persist state

  // Resend countdown state
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [resendSubmitting, setResendSubmitting] = useState(false);

  // Events data state
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [homeSettings, setHomeSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Event Filter Toggle State
  const [showAllEvents, setShowAllEvents] = useState(true); // true = "All", false = "Past"

  // Viewport context state for dynamic spacing
  const [viewportContext, setViewportContext] = useState(0); // Force re-render when viewport context changes

  // Touch gesture state for swipe controls
  const [touchState, setTouchState] = useState({
    isActive: false,
    startY: 0,
    currentY: 0,
    startTime: 0,
    isDragging: false,
    initialDrawerState: false
  });

  // Animation state for cards
  const [cardsAnimated, setCardsAnimated] = useState(false);

  // Optimized scroll state for dynamic navigation (contentRef defined below)

  // Video quality state for adaptive streaming
  const [videoQuality, setVideoQuality] = useState('hd720'); // Start with HD
  const [connectionSpeed, setConnectionSpeed] = useState('fast'); // fast, medium, slow

  // State preservation for drawer reopening
  const [previousDrawerState, setPreviousDrawerState] = useState({
    expanded: false,
    showDisclaimer: false,
    showVerification: false,
    verificationCode: '',
    phoneNumber: ''
  });

  // Helper function to save current drawer state
  const saveCurrentDrawerState = useCallback(() => {
    setPreviousDrawerState({
      expanded: drawerExpanded,
      showDisclaimer: showDisclaimer,
      showVerification: showVerification,
      verificationCode: verificationCode,
      phoneNumber: phoneNumber
    });
  }, [drawerExpanded, showDisclaimer, showVerification, verificationCode, phoneNumber]);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Refs
  const phoneContainerRef = useRef(null);
  const flagImageRef = useRef(null);
  const resendTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  const drawerRef = useRef(null);
  const contentRef = useRef(null);

  // Optimized scroll state for dynamic navigation
  const { scrollY, isScrolled } = useOptimizedScroll(contentRef.current, {
    threshold: 20,
    throttleMs: 16 // 60fps for smooth navigation
  });

  // Simplified phone number formatting handler without cursor management
  const handlePhoneChange = useCallback((e) => {
    const rawValue = e.target.value;
    const currentCountry = getCurrentCountry(selectedCountryId);

    // Extract only digits from the input
    const digitsOnly = rawValue.replace(/[^\d]/g, '');

    // Prevent typing beyond country's digit limit
    if (digitsOnly.length > currentCountry.digitLength) {
      return; // Don't update if trying to exceed limit
    }

    // Format the phone number
    const formattedValue = formatPhoneNumber(digitsOnly, selectedCountryId);

    // Update the state
    setPhoneNumber(formattedValue);
  }, [selectedCountryId]);

  // Simplified key handling - let browser handle backspace naturally
  const handlePhoneKeyDown = useCallback((e) => {
    // Only handle Enter key for submission
    if (e.key === 'Enter') {
      handlePhoneSubmit();
    }
    // Let browser handle backspace and other keys naturally
  }, []);

  // Country change handler with flag update
  const handleCountryChange = useCallback((e) => {
    const newCountryId = e.target.value;
    const newCountry = getCurrentCountry(newCountryId);

    setSelectedCountryId(newCountryId);

    // Update flag image
    if (flagImageRef.current && newCountry.flag) {
      flagImageRef.current.src = newCountry.flag;
      flagImageRef.current.alt = newCountry.name;
    }

    // Reformat existing phone number for new country
    if (phoneNumber) {
      const cleanNumber = phoneNumber.replace(/[^\d]/g, '');
      const newFormattedValue = formatPhoneNumber(cleanNumber, newCountryId);
      setPhoneNumber(newFormattedValue);
    }

    console.log(`🌍 Country changed to: ${newCountry.code} (${newCountry.name})`);
  }, [phoneNumber]);

  // Handle phone submission with validation and verification
  const handlePhoneSubmit = useCallback(async () => {
    const trimmedPhone = phoneNumber.trim();

    if (!trimmedPhone || phoneSubmitting) return;

    // Check if this is the test number 5555555555
    const cleanedTestNumber = trimmedPhone.replace(/\D/g, '');
    const isTestNumber = cleanedTestNumber === '5555555555';

    if (isTestNumber) {
      console.log('🧪 Test number detected - showing loading then verification UI');

      // Set loading state immediately
      setPhoneSubmitting(true);
      setPhoneInputState('loading');

      // Show loading for a moment, then transition to verification
      setTimeout(() => {
        setPhoneInputState('valid');
        setVerificationPhone(trimmedPhone);
        setPhoneSubmitting(false);

        // Small delay before showing verification UI
        setTimeout(() => {
          setShowVerification(true);
          setDrawerExpanded(true); // Ensure drawer stays expanded for verification
        }, 200);
      }, 800); // Show loading for 800ms
      return;
    }

    // Validate phone number format with selected country
    const currentCountry = getCurrentCountry(selectedCountryId);
    if (!isValidPhoneNumber(trimmedPhone, selectedCountryId)) {
      console.warn('Invalid phone number format for', currentCountry.name);

      // Show invalid state with shake animation
      setPhoneInputState('invalid');
      if (phoneContainerRef.current) {
        phoneContainerRef.current.classList.add('shake');
        setTimeout(() => {
          phoneContainerRef.current?.classList.remove('shake');
          setPhoneInputState('normal');
        }, 400);
      }
      return;
    }

    try {
      setPhoneSubmitting(true);
      setPhoneInputState('loading');

      console.log('📱 Submitting phone number:', { phone: trimmedPhone, countryCode: currentCountry.code });

      // Use the new homepage phone submission endpoint
      const response = await fetch('/api/home-settings/submit-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: trimmedPhone,
          countryCode: currentCountry.code
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Phone number submitted successfully');

        if (result.requiresVerification) {
          // Move to verification step
          console.log('🔐 Moving to verification step');
          setPhoneInputState('normal'); // Reset to normal for verification
          setVerificationPhone(trimmedPhone);

          // Smooth transition to verification UI
          setTimeout(() => {
            setShowVerification(true);
            setDrawerExpanded(true); // Ensure drawer stays expanded for verification
          }, 500);
        } else {
          // Old flow - direct success
          setPhoneSubmitted(true);
          setPhoneInputState('valid');
          setPhoneNumber('');

          // Reset success state after 3 seconds
          setTimeout(() => {
            setPhoneSubmitted(false);
            setPhoneInputState('normal');
          }, 3000);
        }
      } else {
        console.error('❌ Failed to submit phone number:', result.error || 'Unknown error');

        // Show error state with shake animation
        setPhoneInputState('invalid');
        if (phoneContainerRef.current) {
          phoneContainerRef.current.classList.add('shake');
          setTimeout(() => {
            phoneContainerRef.current?.classList.remove('shake');
            setPhoneInputState('normal');
          }, 400);
        }
      }
    } catch (error) {
      console.error('❌ Error submitting phone number:', error);

      // Show error state with shake animation
      setPhoneInputState('invalid');
      if (phoneContainerRef.current) {
        phoneContainerRef.current.classList.add('shake');
        setTimeout(() => {
          phoneContainerRef.current?.classList.remove('shake');
          setPhoneInputState('normal');
        }, 400);
      }
    } finally {
      setPhoneSubmitting(false);
    }
  }, [phoneNumber, phoneSubmitting, selectedCountryId]);

  // Verification code submission handler
  const handleVerificationSubmit = useCallback(async () => {
    const trimmedCode = verificationCode.trim();

    if (!trimmedCode || verificationSubmitting) return;

    // Check if this is the test number with test code
    const cleanedTestNumber = verificationPhone.replace(/\D/g, '');
    const isTestNumber = cleanedTestNumber === '5555555555';

    if (isTestNumber) {
      console.log('🧪 Test verification - accepting any 4-digit code');
      if (trimmedCode.length === 4) {
        setVerificationSubmitting(true);
        setPhoneInputState('loading');

        // Simulate verification delay
        setTimeout(() => {
          setVerificationState('valid');
          setPhoneSubmitted(true);
          setVerificationSubmitting(false);
        }, 1000); // 1 second verification simulation

        // First show success state, then fully close drawer
        setTimeout(() => {
          setDrawerFullyClosed(true);
          setShowVerification(false);
          setDrawerExpanded(false);
          setShowDisclaimer(false);
        }, 2000);

        // Reset to initial state after being fully closed
        setTimeout(() => {
          setVerificationCode('');
          setVerificationPhone('');
          setPhoneNumber('');
          setPhoneSubmitted(false);
          setPhoneInputState('normal');
          setVerificationState('normal');
          setVerificationSubmitting(false);
          setDrawerFullyClosed(false);
          // Reset resend countdown
          setResendCountdown(0);
          setCanResend(false);
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
            resendTimerRef.current = null;
          }
          // Reset previous drawer state
          setPreviousDrawerState({
            expanded: false,
            showDisclaimer: false,
            showVerification: false,
            verificationCode: '',
            phoneNumber: ''
          });
        }, 5000);
        return;
      }
    }

    // Validate code format (4 digits)
    if (!/^\d{4}$/.test(trimmedCode)) {
      console.warn('Invalid verification code format');

      // Show invalid state with shake animation
      setVerificationState('invalid');
      setTimeout(() => {
        setVerificationState('filled');
      }, 400);
      return;
    }

    try {
      setVerificationSubmitting(true);
      setPhoneInputState('loading');

      console.log('🔐 Submitting verification code');

      const response = await fetch('/api/home-settings/verify-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: verificationPhone,
          code: trimmedCode
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('✅ Phone verification successful');
        setVerificationState('valid');
        setPhoneSubmitted(true);

        // First show success state, then fully close drawer
        setTimeout(() => {
          setDrawerFullyClosed(true);
          setShowVerification(false);
          setDrawerExpanded(false);
          setShowDisclaimer(false);
        }, 2000);

        // Reset to initial state after being fully closed
        setTimeout(() => {
          setVerificationCode('');
          setVerificationPhone('');
          setPhoneNumber('');
          setPhoneSubmitted(false);
          setPhoneInputState('normal');
          setVerificationState('normal');
          setVerificationSubmitting(false);
          setDrawerFullyClosed(false);
          // Reset resend countdown
          setResendCountdown(0);
          setCanResend(false);
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
            resendTimerRef.current = null;
          }
          // Reset previous drawer state
          setPreviousDrawerState({
            expanded: false,
            showDisclaimer: false,
            showVerification: false,
            verificationCode: '',
            phoneNumber: ''
          });
        }, 5000);
      } else {
        console.error('❌ Phone verification failed:', result.error || 'Unknown error');

        // Show error state with shake animation
        setVerificationState('invalid');
        setTimeout(() => {
          setVerificationState('filled');
        }, 400);
      }

    } catch (error) {
      console.error('❌ Error submitting verification code:', error);

      // Show error state with shake animation
      setVerificationState('invalid');
      setTimeout(() => {
        setVerificationState('filled');
      }, 400);
    } finally {
      setVerificationSubmitting(false);
    }
  }, [verificationCode, verificationSubmitting, verificationPhone]);

  // Fetch homepage data including events
  const fetchHomepageData = useCallback(async () => {
    try {
      setLoading(true);

      // Check cache first
      const cacheKey = 'homepage-data-v2';
      const cached = apiCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('📦 Using cached homepage data');
        setHomeSettings(cached.data.homeSettings);
        setFeaturedEvents(cached.data.featuredEvents || []);
        setLoading(false);
        return;
      }

      const response = await fetch('/api/home-settings/homepage-data');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch homepage data`);
      }

      const data = await response.json();

      // Validate API response structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response format');
      }

      // Validate home settings
      const homeSettings = data.homeSettings || {};

      // Validate featured events
      const featuredEvents = Array.isArray(data.featuredEvents) ? data.featuredEvents : [];

      // Validate each event has required fields
      const validatedEvents = featuredEvents.filter(event => {
        if (!event || typeof event !== 'object') return false;
        if (!event.id || !event.title) {
          console.warn('Event missing required fields:', event);
          return false;
        }
        return true;
      });

      console.log(`✅ Mobile homepage data loaded: ${validatedEvents.length} featured events`);

      // Cache the successful response
      apiCache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });

      setHomeSettings(homeSettings);
      setFeaturedEvents(validatedEvents);

    } catch (err) {
      console.error('❌ Error fetching mobile homepage data:', err);

      // Fallback to default values
      setHomeSettings({
        event_title: "EVENT TITLE",
        artist_name: "Artist Name",
        event_address: "101 Address Drive, Asbury Park, NJ",
        event_image: null,
        tickets_url: null
      });
      setFeaturedEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Start resend countdown timer
  const startResendCountdown = useCallback(() => {
    console.log('🚀 Starting countdown timer');

    // Clear any existing timer first
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
      resendTimerRef.current = null;
    }

    setResendCountdown(60);
    setCanResend(false);

    resendTimerRef.current = setInterval(() => {
      if (!isMountedRef.current) {
        if (resendTimerRef.current) {
          clearInterval(resendTimerRef.current);
          resendTimerRef.current = null;
        }
        return;
      }

      setResendCountdown(prev => {
        console.log('⏰ Countdown tick:', prev);
        if (prev <= 1) {
          console.log('✅ Countdown finished, enabling resend');
          if (isMountedRef.current) {
            setCanResend(true);
          }
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
            resendTimerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Handle resend verification code
  const handleResendCode = useCallback(async () => {
    if (!canResend || resendSubmitting || !verificationPhone) return;

    try {
      setResendSubmitting(true);

      console.log('🔄 Resending verification code to:', verificationPhone);

      const response = await fetch('/api/home-settings/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: verificationPhone
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Verification code resent successfully');
        // Start new countdown
        startResendCountdown();
      } else {
        console.error('❌ Failed to resend verification code:', result.error);
        // Still start countdown to prevent spam
        startResendCountdown();
      }
    } catch (error) {
      console.error('❌ Error resending verification code:', error);
      // Still start countdown to prevent spam
      startResendCountdown();
    } finally {
      setResendSubmitting(false);
    }
  }, [canResend, resendSubmitting, verificationPhone, startResendCountdown]);

  // Cleanup timer on unmount and when verification changes
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
        resendTimerRef.current = null;
      }
    };
  }, []);

  // Additional cleanup when showVerification changes
  useEffect(() => {
    if (!showVerification && resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
      resendTimerRef.current = null;
      setResendCountdown(0);
      setCanResend(false);
    }
  }, [showVerification]);

  // Start countdown when verification is shown
  useEffect(() => {
    console.log('🔄 Countdown useEffect triggered:', {
      showVerification,
      verificationPhone,
      resendCountdown,
      canResend
    });

    if (showVerification && verificationPhone && resendCountdown === 0 && !canResend) {
      console.log('🚀 Starting resend countdown');
      startResendCountdown();
    }
  }, [showVerification, verificationPhone, startResendCountdown]);

  // Fetch homepage data on component mount
  useEffect(() => {
    const startTime = performance.now();

    fetchHomepageData().finally(() => {
      const endTime = performance.now();
      console.log(`🚀 Mobile homepage data loaded in ${(endTime - startTime).toFixed(2)}ms`);

      // Trigger card animations after data loads
      setTimeout(() => {
        setCardsAnimated(true);
      }, 200); // Small delay for smooth transition
    });
  }, [fetchHomepageData]);

  // Animate drawer to collapsed state after component mounts (show text only, no iframe)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDrawerFullyClosed(false);
      setDrawerExpanded(false); // Start in collapsed state - text only, no iframe
    }, 500); // Wait 500ms then animate to collapsed state

    return () => clearTimeout(timer);
  }, []);

  // Detect connection speed for adaptive video quality
  useEffect(() => {
    const detectConnectionSpeed = () => {
      // Use Network Information API if available
      if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

        if (connection) {
          const effectiveType = connection.effectiveType;
          const downlink = connection.downlink; // Mbps

          console.log('🌐 Connection detected:', { effectiveType, downlink });

          // Determine quality based on connection
          if (effectiveType === '4g' && downlink > 5) {
            setVideoQuality('hd1080');
            setConnectionSpeed('fast');
          } else if (effectiveType === '4g' || (effectiveType === '3g' && downlink > 2)) {
            setVideoQuality('hd720');
            setConnectionSpeed('medium');
          } else {
            setVideoQuality('large'); // 480p
            setConnectionSpeed('slow');
          }

          return;
        }
      }

      // Fallback: Test download speed with a small image
      const startTime = performance.now();
      const testImage = new Image();

      testImage.onload = () => {
        const endTime = performance.now();
        const duration = endTime - startTime;

        console.log('🚀 Speed test completed in:', duration + 'ms');

        // Estimate connection speed based on load time
        if (duration < 200) {
          setVideoQuality('hd1080');
          setConnectionSpeed('fast');
        } else if (duration < 500) {
          setVideoQuality('hd720');
          setConnectionSpeed('medium');
        } else {
          setVideoQuality('large');
          setConnectionSpeed('slow');
        }
      };

      testImage.onerror = () => {
        console.log('⚠️ Speed test failed, using default HD quality');
        setVideoQuality('hd720');
        setConnectionSpeed('medium');
      };

      // Use a small test image (1KB)
      testImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    };

    // Run detection after component mounts (faster)
    const timer = setTimeout(detectConnectionSpeed, 200);

    return () => clearTimeout(timer);
  }, []);

  // Preload critical above-the-fold images for instant loading
  useEffect(() => {
    if (featuredEvents && featuredEvents.length > 0) {
      console.log('🚀 Preloading critical event images for instant display...');

      // Preload first 2 event images (above-the-fold on mobile)
      const isSafariMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

      featuredEvents.slice(0, 2).forEach((event, index) => {
        if (event.coverImage) {
          // Skip AVIF preloading for Safari mobile, go straight to WebP
          if (!isSafariMobile) {
            const avifLink = document.createElement('link');
            avifLink.rel = 'preload';
            avifLink.as = 'image';
            avifLink.type = 'image/avif';
            const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
            avifLink.href = `${dashboardDomain}/images/proxy-optimized?url=${encodeURIComponent(event.coverImage)}&w=111&format=avif`;
            document.head.appendChild(avifLink);
          }

          // Preload WebP version (primary for Safari mobile)
          const webpLink = document.createElement('link');
          webpLink.rel = 'preload';
          webpLink.as = 'image';
          webpLink.type = 'image/webp';
          webpLink.href = getOptimizedImageUrl(event.coverImage, 111);
          document.head.appendChild(webpLink);

          // Safari mobile: also preload original as fallback
          if (isSafariMobile) {
            const originalLink = document.createElement('link');
            originalLink.rel = 'preload';
            originalLink.as = 'image';
            originalLink.href = event.coverImage;
            document.head.appendChild(originalLink);
          }

          console.log(`✅ Preloaded mobile event image ${index + 1}: ${event.title} ${isSafariMobile ? '(Safari mobile optimized)' : ''}`);
        }
      });
    }
  }, [featuredEvents]);

  // Scroll handling now optimized with useOptimizedScroll hook

  // Memoized event cards processing for mobile with filtering
  const processedEventCards = useMemo(() => {
    const featuredCards = [];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    // Process only featured events from API
    featuredEvents.forEach((event, index) => {
      try {
        // Validate and parse event date
        let eventDate = new Date();
        let formattedDate = 'Tue, Sep 02 @ 10:00PM';
        let day = '02';
        let month = 'SEP';

        if (event.event_date) {
          const cacheKey = event.event_date;
          let cachedFormat = dateFormatCache.get(cacheKey);

          if (!cachedFormat) {
            const parsedDate = new Date(event.event_date);
            if (!isNaN(parsedDate.getTime())) {
              eventDate = parsedDate;
              formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: '2-digit'
              }).replace(',', ' @') + ' 10:00PM';
              day = eventDate.getDate().toString().padStart(2, '0');
              month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

              cachedFormat = { formattedDate, day, month, eventDate };
              dateFormatCache.set(cacheKey, cachedFormat);
            }
          } else {
            ({ formattedDate, day, month, eventDate } = cachedFormat);
          }
        }

        // Validate and process event data
        const title = event.title || event.artist_name || `Event ${index + 1}`;

        // Process location to show only venue name and city
        let location = 'Venue Address';
        if (event.event_address) {
          const addressParts = event.event_address.split(',').map(part => part.trim());
          if (addressParts.length >= 2) {
            location = `${addressParts[0]}, ${addressParts[1]}`;
            if (location.length > 25 && addressParts.length >= 3) {
              location = `${addressParts[1]}, ${addressParts[2]}`;
            }
          } else {
            location = event.event_address;
          }
        }

        const coverImage = event.cover_image || '/images/figma-exact/event-card-bg.png';
        const ticketsUrl = event.posh_embed_url || '#';

        featuredCards.push({
          id: `event-${event.id}`,
          title: title,
          date: formattedDate,
          day: day,
          month: month,
          location: location,
          coverImage: coverImage,
          ticketsUrl: ticketsUrl,
          isRealEvent: true,
          showOnHomepage: event.show_on_homepage,
          eventData: event,
          eventDate: eventDate // Add the actual Date object for proper sorting
        });
      } catch (error) {
        console.warn(`Error processing mobile event ${event.id}:`, error);
      }
    });

    // Sort events by date in reverse chronological order (most recent first)
    featuredCards.sort((a, b) => {
      const dateA = new Date(a.eventDate);
      const dateB = new Date(b.eventDate);
      return dateB.getTime() - dateA.getTime(); // Descending order (newest first)
    });

    // Filter events based on toggle state
    const filteredCards = featuredCards.filter(card => {
      const eventDate = new Date(card.eventDate);
      eventDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

      if (showAllEvents) {
        // Show all events (both upcoming and past)
        return true;
      } else {
        // Show only past events
        return eventDate < currentDate;
      }
    });

    console.log(`🎯 Mobile rendering ${filteredCards.length} of ${featuredCards.length} featured event cards (${showAllEvents ? 'All' : 'Past'} events)`);
    return filteredCards;
  }, [featuredEvents, showAllEvents]);

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

  // Handle phone input focus - expand drawer and show disclaimer
  const handlePhoneInputFocus = useCallback(() => {
    setDrawerExpanded(true);
    setShowDisclaimer(true);
  }, []);

  // Handle phone input blur - collapse drawer if no content
  const handlePhoneInputBlur = useCallback(() => {
    // Only collapse if no phone number and not in verification mode
    if (!phoneNumber.trim() && !showVerification) {
      setTimeout(() => {
        setDrawerExpanded(false);
        setShowDisclaimer(false);
      }, 200); // Small delay to prevent flicker
    }
  }, [phoneNumber, showVerification]);

  // Handle clicking outside drawer to close it
  const handleOutsideClick = useCallback((e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      // Save current state before closing
      saveCurrentDrawerState();

      // Always close drawer visually
      setDrawerExpanded(false);

      // If in verification mode, keep it minimized but accessible
      if (showVerification) {
        // Don't fully close, just collapse so user can tap to reopen
        setDrawerFullyClosed(false);
      } else {
        // Always return to collapsed state showing "Text us" - never fully close on outside click
        setDrawerFullyClosed(false);
        setShowDisclaimer(false);
      }
    }
  }, [phoneNumber, showVerification, saveCurrentDrawerState]);

  // Add click outside listener
  useEffect(() => {
    if (drawerExpanded) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [drawerExpanded, handleOutsideClick]);

  // Calculate drawer height based on content and state
  const getDrawerHeight = useCallback(() => {
    if (drawerFullyClosed) {
      return '50px'; // Fully closed - only handle and minimal padding visible
    } else if (iframeExpanded) {
      return '320px'; // Iframe expanded - extra space for full iframe interaction
    } else if (showVerification && drawerExpanded) {
      return '240px'; // Verification mode expanded - tight layout without extra space
    } else if (showVerification && !drawerExpanded) {
      return '60px'; // Verification mode collapsed - show handle only, no content peek
    } else if (drawerExpanded) {
      return '280px'; // Expanded - show text + Laylo iframe with proper height for phone form
    } else {
      return '80px'; // Collapsed - show only text content, hide Laylo iframe
    }
  }, [drawerFullyClosed, showVerification, drawerExpanded, showDisclaimer, iframeExpanded]);

  // Dynamic bottom spacing calculation based on viewport context
  const getDynamicBottomSpacing = useCallback(() => {
    const drawerHeight = getDrawerHeight();

    // Detect if we're on a real mobile device vs desktop browser mobile simulation
    const isRealMobileDevice = (() => {
      // Check for touch capability and mobile user agent
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileUserAgent = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      // Check viewport characteristics
      const viewportWidth = window.innerWidth;
      const screenWidth = window.screen.width;
      const devicePixelRatio = window.devicePixelRatio || 1;

      // Real mobile devices typically have:
      // - Touch capability
      // - Mobile user agent
      // - Viewport width close to screen width
      // - Device pixel ratio > 1
      const isLikelyRealMobile = hasTouchScreen &&
                                isMobileUserAgent &&
                                Math.abs(viewportWidth - screenWidth) < 50 &&
                                devicePixelRatio > 1;

      return isLikelyRealMobile;
    })();

    // Calculate base spacing from drawer height
    const baseSpacing = parseInt(drawerHeight.replace('px', ''));

    if (isRealMobileDevice) {
      // Real mobile device: Use full spacing for proper drawer clearance
      return `calc(${drawerHeight} + 120px)`;
    } else {
      // Desktop browser mobile simulation: Use reduced spacing to prevent excessive empty space
      const reducedSpacing = Math.max(60, baseSpacing * 0.7); // Minimum 60px, or 70% of drawer height
      return `calc(${drawerHeight} + ${reducedSpacing}px)`;
    }
  }, [getDrawerHeight, viewportContext]); // Include viewportContext to recalculate when viewport changes

  // Handle viewport changes for dynamic spacing
  useEffect(() => {
    const handleViewportChange = () => {
      // Force re-calculation of dynamic spacing when viewport changes
      setViewportContext(prev => prev + 1);
    };

    // Listen for resize events that might indicate viewport context changes
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', handleViewportChange);

    // Initial calculation
    handleViewportChange();

    return () => {
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('orientationchange', handleViewportChange);
    };
  }, []);

  // Touch gesture handlers for swipe controls
  const handleTouchStart = useCallback((e) => {
    // Don't interfere with form interactions
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('iframe')) {
      return;
    }

    const touch = e.touches[0];
    const now = Date.now();

    setTouchState({
      isActive: true,
      startY: touch.clientY,
      currentY: touch.clientY,
      startTime: now,
      isDragging: false,
      initialDrawerState: drawerExpanded
    });
  }, [drawerExpanded]);

  const handleTouchMove = useCallback((e) => {
    if (!touchState.isActive) return;

    // Don't interfere with form interactions
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('iframe')) {
      return;
    }

    const touch = e.touches[0];
    const deltaY = touchState.startY - touch.clientY; // Positive = swipe up, Negative = swipe down
    const absDeltaY = Math.abs(deltaY);

    // Start dragging if moved more than 10px
    if (!touchState.isDragging && absDeltaY > 10) {
      setTouchState(prev => ({ ...prev, isDragging: true }));
      e.preventDefault(); // Prevent scrolling when dragging
    }

    if (touchState.isDragging) {
      setTouchState(prev => ({ ...prev, currentY: touch.clientY }));
      e.preventDefault();
    }
  }, [touchState]);

  const handleTouchEnd = useCallback((e) => {
    if (!touchState.isActive) return;

    // Don't interfere with form interactions
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('iframe')) {
      setTouchState({
        isActive: false,
        startY: 0,
        currentY: 0,
        startTime: 0,
        isDragging: false,
        initialDrawerState: false
      });
      return;
    }

    const deltaY = touchState.startY - touchState.currentY; // Positive = swipe up, Negative = swipe down
    const absDeltaY = Math.abs(deltaY);
    const duration = Date.now() - touchState.startTime;
    const velocity = absDeltaY / duration; // pixels per millisecond

    // Gesture thresholds
    const minSwipeDistance = 30; // Minimum distance for a swipe
    const minFlickVelocity = 0.5; // Minimum velocity for a flick gesture
    const snapThreshold = 50; // Distance threshold for snap-to-position

    let shouldToggleDrawer = false;

    if (touchState.isDragging) {
      // Determine action based on swipe direction, distance, and velocity
      if (velocity > minFlickVelocity) {
        // Fast flick gesture
        shouldToggleDrawer = true;
      } else if (absDeltaY > minSwipeDistance) {
        // Regular swipe gesture
        shouldToggleDrawer = true;
      } else if (absDeltaY > snapThreshold) {
        // Snap-to-position based on distance
        shouldToggleDrawer = true;
      }

      if (shouldToggleDrawer) {
        // Apply momentum-based animation class
        const drawerElement = drawerRef.current;
        if (drawerElement) {
          // Remove existing momentum classes
          drawerElement.classList.remove('momentum-fast', 'momentum-slow');

          // Apply appropriate momentum class based on velocity
          if (velocity > minFlickVelocity) {
            drawerElement.classList.add('momentum-fast');
          } else {
            drawerElement.classList.add('momentum-slow');
          }

          // Remove momentum class after animation completes
          setTimeout(() => {
            if (drawerElement) {
              drawerElement.classList.remove('momentum-fast', 'momentum-slow');
            }
          }, 250);
        }

        if (deltaY > 0) {
          // Swipe up - open/expand drawer
          if (!drawerExpanded) {
            setDrawerExpanded(true);
            setDrawerFullyClosed(false);
          }
        } else {
          // Swipe down - close/collapse drawer
          if (drawerExpanded) {
            setDrawerExpanded(false);
          }
        }
      }
    }

    // Reset touch state
    setTouchState({
      isActive: false,
      startY: 0,
      currentY: 0,
      startTime: 0,
      isDragging: false,
      initialDrawerState: false
    });
  }, [touchState, drawerExpanded]);

  // Handle drawer click to fully open when closed
  const handleDrawerClick = useCallback(() => {
    if (drawerFullyClosed) {
      // Restore previous state when reopening
      setDrawerFullyClosed(false);
      setDrawerExpanded(previousDrawerState.expanded || true);
      setShowDisclaimer(previousDrawerState.showDisclaimer);
      setShowVerification(previousDrawerState.showVerification);

      // Restore verification code if it was in progress
      if (previousDrawerState.verificationCode) {
        setVerificationCode(previousDrawerState.verificationCode);
        if (previousDrawerState.verificationCode.length === 4) {
          setVerificationState('filled');
        }
      }

      // Restore phone number if it was entered
      if (previousDrawerState.phoneNumber) {
        setPhoneNumber(previousDrawerState.phoneNumber);
      }
    } else if (!drawerExpanded) {
      // If just collapsed, expand to previous state
      setDrawerExpanded(true);
      if (previousDrawerState.showDisclaimer && !showVerification) {
        setShowDisclaimer(true);
      }
    }
  }, [drawerFullyClosed, drawerExpanded, previousDrawerState, showVerification]);

  // Handle iframe click to expand drawer for better visibility
  const handleIframeClick = useCallback((e) => {
    e.stopPropagation(); // Prevent drawer click handler

    // Ensure drawer is open and expanded for iframe interaction
    if (drawerFullyClosed) {
      setDrawerFullyClosed(false);
    }

    // Expand drawer and set iframe expanded state
    setDrawerExpanded(true);
    setIframeExpanded(true);

    // Auto-collapse iframe expansion after 10 seconds to return to normal state
    setTimeout(() => {
      setIframeExpanded(false);
    }, 10000);
  }, [drawerFullyClosed]);

  // Button press handlers for inlaid effect
  const handleButtonMouseDown = useCallback(() => {
    setIsButtonPressed(true);
  }, []);

  const handleButtonMouseUp = useCallback(() => {
    setIsButtonPressed(false);
  }, []);

  const handleButtonMouseLeave = useCallback(() => {
    setIsButtonPressed(false);
  }, []);

  // Set comprehensive iOS Safari optimizations
  useEffect(() => {
    // Store original viewport
    const originalViewport = document.querySelector('meta[name="viewport"]');
    const originalContent = originalViewport ? originalViewport.getAttribute('content') : '';

    // Set mobile-optimized viewport for iOS Safari
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, shrink-to-fit=no';

    // Add iOS-specific meta tags
    const addMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // iOS Safari specific optimizations
    addMetaTag('apple-mobile-web-app-capable', 'yes');
    addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    addMetaTag('apple-touch-fullscreen', 'yes');
    addMetaTag('mobile-web-app-capable', 'yes');
    addMetaTag('format-detection', 'telephone=no');

    // Prevent iOS Safari from adjusting font sizes
    document.documentElement.style.webkitTextSizeAdjust = '100%';
    document.documentElement.style.textSizeAdjust = '100%';

    // Fix iOS Safari height issues with optimized viewport handling
    let rafId = null;
    let timeoutId = null;

    const setVH = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);

      // Debounce viewport changes to prevent excessive reflows
      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(() => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
      }, 100);
    };

    setVH();
    window.addEventListener('resize', setVH, { passive: true });
    window.addEventListener('orientationchange', setVH, { passive: true });

    // Cleanup on unmount
    return () => {
      if (originalViewport && originalContent) {
        originalViewport.setAttribute('content', originalContent);
      }
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Build YouTube URL with adaptive quality parameters
  const buildYouTubeURL = useMemo(() => {
    const baseURL = 'https://www.youtube.com/embed/vEHTO3gf1jk';
    const baseParams = {
      autoplay: '1',
      mute: '1',
      controls: '0',
      showinfo: '0',
      rel: '0',
      loop: '1',
      playlist: 'vEHTO3gf1jk',
      modestbranding: '1',
      iv_load_policy: '3', // Hide video annotations
      fs: '0',
      disablekb: '1',
      hd: '1', // Force HD when available
      cc_load_policy: '0', // Hide closed captions
      autohide: '1', // Auto-hide controls
      wmode: 'transparent', // Transparent background
      enablejsapi: '1', // Enable JavaScript API for better control
      origin: window.location.origin // Set origin for security
    };

    // Add quality-specific parameters
    const qualityParams = {
      vq: videoQuality, // Video quality preference
      quality: videoQuality // Alternative quality parameter
    };

    // Combine all parameters
    const allParams = { ...baseParams, ...qualityParams };
    const paramString = Object.entries(allParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const finalURL = `${baseURL}?${paramString}`;
    console.log('🎥 YouTube URL built:', { videoQuality, connectionSpeed, finalURL });

    return finalURL;
  }, [videoQuality, connectionSpeed]);

  // Handle YouTube thumbnail click to load video immediately
  const handleYoutubeThumbnailClick = useCallback(() => {
    setShowYoutubeThumbnail(false);
    setShouldLoadYoutube(true);

    // Track user interaction with video
    trackEvent('video_interaction', {
      action: 'thumbnail_click',
      video_id: 'vEHTO3gf1jk',
      component: 'FigmaMobile'
    });
  }, [trackEvent]);

  // YouTube thumbnail component for preloading
  const YouTubeThumbnail = useMemo(() => (
    <div
      onClick={handleYoutubeThumbnailClick}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        backgroundImage: 'url(https://img.youtube.com/vi/vEHTO3gf1jk/maxresdefault.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'transform 0.2s ease-out'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
      }}
    />
  ), [handleYoutubeThumbnailClick]);

  return (
    <>
      {/* Mobile-specific CSS */}
      <style>
        {`
          /* Comprehensive Safari iOS WebKit Optimizations */

          /* Prevent iOS Safari zoom on input focus */
          input[type="tel"], input[type="text"], select {
            font-size: 16px !important;
            transform-origin: left top;
            font-family: 'Inter', sans-serif;
            -webkit-appearance: none;
            -webkit-border-radius: 0;
            border-radius: 0;
          }

          /* Prevent zoom and ensure proper viewport */
          * {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Safari iOS specific fixes */
          body {
            -webkit-overflow-scrolling: touch;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Prevent iOS Safari bounce scroll */
          html, body {
            position: fixed;
            overflow: hidden;
            width: 100%;
            height: 100%;
          }

          /* Fix iOS Safari viewport issues */
          .mobile-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            height: -webkit-fill-available;
            overflow: hidden;
          }

          /* Optimize touch interactions for iOS */
          .mobile-drawer, .mobile-menu-button, button, input {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Enable hardware acceleration */
          .mobile-drawer, .mobile-nav-overlay {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }

          /* Modern iOS-style scrollbar - hidden by default, appears on scroll */
          .mobile-content-container {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
          }

          .mobile-content-container::-webkit-scrollbar {
            width: 0px; /* Hide scrollbar by default */
            background: transparent;
          }

          /* Show thin scrollbar only when actively scrolling */
          .mobile-content-container:hover::-webkit-scrollbar,
          .mobile-content-container:active::-webkit-scrollbar {
            width: 3px;
          }

          .mobile-content-container::-webkit-scrollbar-track {
            background: transparent;
          }

          .mobile-content-container::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            transition: background 0.2s ease;
          }

          .mobile-content-container::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }

          /* iOS-style momentum scrolling */
          .mobile-content-container {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
          }

          .mobile-phone-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
          .mobile-phone-input:focus {
            outline: none;
            font-size: 16px !important;
          }
          .mobile-nav-item:hover {
            opacity: 0.8;
            transform: translateX(10px) !important;
            transition: all 0.15s ease-out;
          }

          .mobile-nav-item {
            transition: all 0.15s ease-out;
          }
          .mobile-menu-button:hover {
            opacity: 0.8;
            transform: translateY(-50%) scale(1.1);
            transition: all 0.2s ease;
          }

          /* Menu button animation states */
          .mobile-menu-button {
            transition: transform 0.2s ease;
          }

          /* Navigation overlay animations */
          .mobile-nav-overlay {
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .mobile-nav-overlay.entering {
            opacity: 0;
            visibility: hidden;
            backdrop-filter: blur(0px);
          }

          .mobile-nav-overlay.entered {
            opacity: 1;
            visibility: visible;
            backdrop-filter: blur(10px);
          }
          .mobile-send-button:hover:not(:disabled) {
            transform: scale(1.05);
            transition: transform 0.2s ease;
          }
          .mobile-send-button:active:not(:disabled) {
            transform: scale(0.95);
          }

          /* Shake animation for validation errors */
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          .shake {
            animation: shake 0.4s ease-in-out;
          }

          /* Mobile country selector styling */
          .mobile-country-select {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #FFFFFF;
            border-radius: 8px;
            padding: 4px 8px;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            outline: none;
          }
          .mobile-country-select option {
            background: #000000;
            color: #FFFFFF;
          }

          /* Mobile verification input styling */
          .mobile-verification-input {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: #FFFFFF;
            font-family: 'Inter', sans-serif;
            font-size: 16px; /* Minimum 16px to prevent iOS zoom */
            font-weight: 600;
            text-align: center;
            outline: none;
          }
          .mobile-verification-input:focus {
            border-color: #00FF40;
            box-shadow: 0 0 0 2px rgba(0, 255, 64, 0.2);
          }

          /* Spinner animation for mobile SEND button */
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @-webkit-keyframes spin {
            0% { -webkit-transform: rotate(0deg); }
            100% { -webkit-transform: rotate(360deg); }
          }

          @-moz-keyframes spin {
            0% { -moz-transform: rotate(0deg); }
            100% { -moz-transform: rotate(360deg); }
          }

          /* Enhanced drawer animations with momentum support */
          .mobile-drawer {
            position: fixed;
            bottom: 0;
            left: 20px;
            right: 20px;
            margin: 0 auto;
            width: calc(100% - 40px);
            max-width: 390px;
            background: rgb(21 21 21 / 80%);
            backdrop-filter: blur(10px);
            border-radius: 24px 24px 0px 0px;
            transition: transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform-origin: bottom center;
            z-index: 100;
            will-change: transform;
            backface-visibility: hidden;
            perspective: 1000px;
            /* Enhanced touch interaction */
            touch-action: pan-y;
            user-select: none;
            -webkit-user-select: none;
          }

          /* Fast momentum animation for flick gestures */
          .mobile-drawer.momentum-fast {
            transition: transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          /* Slow momentum animation for gentle swipes */
          .mobile-drawer.momentum-slow {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .mobile-drawer.collapsed {
            transform: translate3d(0, calc(100% - 80px), 0);
          }

          .mobile-drawer.expanded {
            transform: translate3d(0, 0, 0);
          }

          /* Disclaimer peek effect */
          .disclaimer-peek {
            position: relative;
            overflow: hidden;
          }

          .disclaimer-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 12px;
            background: linear-gradient(to bottom, transparent 0%, rgba(35, 35, 35, 0.95) 100%);
            pointer-events: none;
            transition: opacity 0.4s ease;
          }

          /* Content fade animations */
          .drawer-content {
            transition: opacity 0.1s ease-out;
            will-change: opacity;
          }

          .drawer-content.verification-mode {
            transform: scale(1.02);
          }

          /* Optimized fade-in animation - prevents black frames */
          @keyframes optimizedFadeIn {
            0% {
              opacity: 0;
              transform: translate3d(0, 12px, 0) scale(0.96);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }

          .event-card-spring {
            animation: optimizedFadeIn 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            will-change: transform, opacity;
            backface-visibility: hidden;
            transform-style: preserve-3d;
            -webkit-font-smoothing: antialiased;
          }

          .event-card-hidden {
            opacity: 0;
            transform: translate3d(0, 12px, 0) scale(0.96);
            backface-visibility: hidden;
          }

          /* Responsive adjustments for small mobile devices */
          @media (max-width: 375px) {
            .mobile-content-container {
              left: 10px !important;
              right: 10px !important;
              width: calc(100% - 20px) !important;
            }

            .mobile-drawer {
              left: 10px !important;
              right: 10px !important;
              width: calc(100% - 20px) !important;
            }
          }

          @media (max-width: 320px) {
            .mobile-content-container {
              left: 5px !important;
              right: 5px !important;
              width: calc(100% - 10px) !important;
            }

            .mobile-drawer {
              left: 5px !important;
              right: 5px !important;
              width: calc(100% - 10px) !important;
            }
          }

          /* Responsive adjustments for event card content on small screens */
          @media (max-width: 375px) {
            .card-clickable-area {
              left: 120px !important; /* Reduce left margin for more text space */
              right: 4px !important; /* Reduce right margin */
            }
          }

          @media (max-width: 320px) {
            .card-clickable-area {
              left: 110px !important; /* Further reduce left margin */
              right: 2px !important; /* Minimal right margin */
            }
          }
        `}
      </style>

      <div
        className="mobile-container"
        style={{
          background: '#000000',
          fontFamily: 'Inter, sans-serif'
        }}
        role="main"
        aria-label="BOUNCE2BOUNCE Mobile Experience"
      >
      {/* Main Mobile Device Frame - 430x932 */}
      <main
        style={{
          width: '430px',
          height: '932px',
          maxWidth: '100vw',
          maxHeight: '100vh',
          margin: '0 auto',
          position: 'relative',
          background: '#000000'
        }}
        aria-label="Mobile homepage content"
      >
        {/* Navigation Bar - Dynamic Scroll-Responsive */}
        <header
          role="banner"
          style={{
            position: 'fixed',
            left: '0px',
            top: '0px',
            width: '100vw', // Full viewport width
            height: isScrolled ? '70px' : '97px', // Dynamic height based on scroll
            background: isScrolled ? 'rgba(0, 0, 0, 0.95)' : '#000000', // Slight transparency when scrolled
            backdropFilter: isScrolled ? 'blur(10px)' : 'none', // Blur effect when scrolled
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 20px',
            boxSizing: 'border-box',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition
            zIndex: 100, // Ensure it stays on top
            borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none' // Subtle border when scrolled
          }}
          aria-label="Main navigation"
        >
          {/* Menu Button - Right Side */}
          <div
            onClick={toggleMenu}
            className="mobile-menu-button"
            style={{
              position: 'absolute',
              right: '20px',
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

          {/* B2B Logo - Dynamic Scroll-Responsive */}
          <img
            onClick={() => handleNavigation('/')}
            src="/images/mobile-figma/b2b-logo-mobile.svg"
            alt="B2B Logo"
            style={{
              width: isScrolled ? '110px' : '138.41px', // Shrink when scrolled
              height: isScrolled ? '34px' : '43px', // Proportional height
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition
              userSelect: 'none'
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translate(-50%, -50%) scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translate(-50%, -50%) scale(1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translate(-50%, -50%) scale(1)';
            }}
          />
        </header>

        {/* Main Content Area - Dynamic with Scroll-Responsive Navigation */}
        <div
          ref={contentRef}
          className="mobile-content-container"
          style={{
            position: 'fixed', // Changed from absolute to fixed
            left: '50%', // Center horizontally
            transform: 'translateX(-50%)', // Center using transform
            top: isScrolled ? '70px' : '97px', // Dynamic top position
            bottom: '0px', // Use bottom instead of fixed height to allow content expansion
            width: 'min(430px, calc(100vw - 40px))', // Responsive width with max constraint
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '20px 0px 40px 0px', // Remove horizontal padding to prevent overflow
            paddingBottom: getDynamicBottomSpacing(), // Dynamic bottom padding based on viewport context
            boxSizing: 'border-box',
            overflow: 'auto', // Enable scrolling
            overflowX: 'hidden', // Prevent horizontal scroll
            WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth transition
            zIndex: 45, // Ensure content appears above gradient overlay (zIndex: 40)
            minHeight: '100%' // Ensure minimum height fills viewport
          }}
        >
          {/* Hero Video Section */}
          <section
            aria-labelledby="hero-video-title"
            style={{ width: '100%', marginBottom: '20px' }}
          >
            <h1
              id="hero-video-title"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                overflow: 'hidden'
              }}
            >
              BOUNCE2BOUNCE - Exclusive Live Music Events and Artist Performances
            </h1>

            <article
              style={{
                width: '350px', // Mobile-optimized width
                height: '200px', // Mobile-optimized height
                position: 'relative',
                flexShrink: 0,
                margin: '0 auto', // Center the video
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'scale(1)',
                borderRadius: '20px', // Slightly smaller radius for mobile
                overflow: 'hidden'
              }}
              aria-label="Henry Fong live performance video"
            >
            {/* Video background container */}
            <div
              style={{
                position: 'absolute',
                left: '0px',
                top: '0px',
                width: '100%',
                height: '100%',
                borderRadius: '20px',
                overflow: 'hidden'
              }}
            >
              {/* YouTube iframe wrapper */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden'
                }}
              >


                {showYoutubeThumbnail ? (
                  // Show thumbnail preloader for faster loading
                  YouTubeThumbnail
                ) : shouldLoadYoutube ? (
                  // Show actual YouTube iframe
                  <iframe
                    src={buildYouTubeURL}
                    title="Henry Fong YouTube Video - Adaptive Quality"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100%',
                      height: '100%',
                      transform: 'translate(-50%, -50%) scale(1.5)',
                      pointerEvents: 'none',
                      border: 'none',
                      opacity: 1
                    }}
                  />
                ) : (
                  // Loading state (rarely shown)
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100%',
                      height: '100%',
                      transform: 'translate(-50%, -50%)',
                      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                      border: 'none'
                    }}
                  />
                )}
              </div>

              {/* Gradient overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)',
                  borderRadius: '20px',
                  zIndex: 1
                }}
              />
            </div>

            {/* Video text overlay - Non-intrusive */}
            <div
              style={{
                position: 'absolute',
                left: '0px',
                bottom: '16px', // Position from bottom
                display: 'flex',
                width: '100%',
                height: '40px',
                padding: '8px 16px',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                gap: '12px',
                zIndex: 2,
                boxSizing: 'border-box',
                pointerEvents: 'none' // Allow clicks to pass through to video
              }}
            >
              {/* Left - Title and subtitle */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  gap: '2px',
                  flex: '1'
                }}
              >
                <div
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '18px', // Mobile-optimized size
                    fontWeight: '800',
                    lineHeight: '1.1',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Watch on YouTube
                </div>
                <div
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '9px', // Mobile-optimized size
                    fontWeight: '200',
                    lineHeight: 'normal'
                  }}
                >
                  Henry Fong full set live
                </div>
              </div>

              {/* Right - CTA Button */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx', '_blank');
                }}
                style={{
                  display: 'flex',
                  minWidth: '90px', // Mobile-optimized width
                  height: '36px', // Mobile-optimized height
                  justifyContent: 'center',
                  alignItems: 'center',
                  pointerEvents: 'auto', // Re-enable clicks for the button only
                  borderRadius: '18px',
                  background: 'rgba(38, 38, 38, 0.80)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  boxSizing: 'border-box'
                }}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  e.currentTarget.style.transform = 'scale(0.95)';
                  e.currentTarget.style.background = 'rgba(58, 58, 58, 0.90)';
                }}
                onTouchEnd={(e) => {
                  e.stopPropagation();
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(38, 38, 38, 0.80)';
                }}
              >
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '11px', // Mobile-optimized size
                    fontWeight: '600',
                    lineHeight: 'normal'
                  }}
                >
                  Watch now
                </span>
              </div>
            </div>
          </article>
          </section>

          {/* Social Media Buttons Section */}
          <section
            style={{
              width: '100%',
              padding: '0', // Remove all padding
              margin: '0', // Remove all margin
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <SocialMediaButtons />
          </section>

          {/* Events Section */}
          <section
            aria-labelledby="events-section-title"
            style={{
              width: '100%',
              marginTop: '20px' // Add spacing between social buttons and events
            }}
          >
            {/* Events Title with Filter Toggle */}
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '0 16px', // Match hero card padding
                boxSizing: 'border-box'
              }}
            >
              <h2
                id="events-section-title"
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '28px', // Scaled up from 24px for mobile
                  fontWeight: '800',
                  lineHeight: 'normal',
                  margin: 0,
                  textAlign: 'left'
                }}
              >
                Events
              </h2>

              {/* Event Filter Toggle */}
              <div
                style={{
                  display: 'flex',
                  width: '118px',
                  height: '34px',
                  padding: '2px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  borderRadius: '9px',
                  background: showAllEvents ? 'rgba(111, 111, 111, 0.49)' : 'rgba(111, 111, 111, 0.69)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  WebkitTapHighlightColor: 'transparent'
                }}
                onClick={() => setShowAllEvents(!showAllEvents)}
                role="switch"
                aria-checked={showAllEvents}
                aria-label={`Switch to ${showAllEvents ? 'Past' : 'All'} events`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowAllEvents(!showAllEvents);
                  }
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {/* Sliding Button Background */}
                <div
                  style={{
                    position: 'absolute',
                    width: '57px',
                    height: '30px',
                    borderRadius: '7px',
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: '#FFF',
                    boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)',
                    left: showAllEvents ? '2px' : '59px',
                    top: '2px',
                    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 1
                  }}
                />

                {/* All Button */}
                <div
                  style={{
                    display: 'flex',
                    padding: '3px 10px',
                    alignItems: 'center',
                    flex: '1 0 0',
                    alignSelf: 'stretch',
                    borderRadius: '7px',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <span
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      flex: '1 0 0',
                      overflow: 'hidden',
                      color: showAllEvents ? '#000' : '#FFF',
                      textAlign: 'center',
                      fontFeatureSettings: "'liga' off, 'clig' off",
                      textOverflow: 'ellipsis',
                      fontFamily: 'Inter',
                      fontSize: '13px',
                      fontStyle: 'normal',
                      fontWeight: showAllEvents ? '590' : '400',
                      lineHeight: '18px',
                      letterSpacing: '-0.08px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    All
                  </span>
                </div>

                {/* Past Button */}
                <div
                  style={{
                    display: 'flex',
                    padding: '3px 10px',
                    alignItems: 'center',
                    flex: '1 0 0',
                    alignSelf: 'stretch',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <span
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 1,
                      flex: '1 0 0',
                      overflow: 'hidden',
                      color: !showAllEvents ? '#000' : '#FFF',
                      textAlign: 'center',
                      fontFeatureSettings: "'liga' off, 'clig' off",
                      textOverflow: 'ellipsis',
                      fontFamily: 'Inter',
                      fontSize: '13px',
                      fontStyle: 'normal',
                      fontWeight: !showAllEvents ? '590' : '400',
                      lineHeight: '18px',
                      letterSpacing: '-0.08px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    Past
                  </span>
                </div>
              </div>
            </div>

          {/* Mobile Square Hero - Only show when "All" events is selected */}
          {showAllEvents && (
            <div
              className={cardsAnimated ? 'event-card-spring' : 'event-card-hidden'}
              style={{
                width: '100%',
                padding: '0 20px', // Reduced padding to match main container
                marginBottom: '20px',
                boxSizing: 'border-box',
                animationDelay: cardsAnimated ? '0s' : '0s' // Hero animates first (no delay)
              }}
            >
            <div
              onClick={() => {
                // Navigate to events or handle click
                console.log('Hero clicked - navigate to events');
              }}
              style={{
                width: 'min(350px, calc(100vw - 80px))', // Responsive width that scales on small devices
                height: 'min(350px, calc(100vw - 80px))', // Maintain square aspect ratio
                position: 'relative',
                margin: '0 auto', // Center the hero
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'scale(1)',
                borderRadius: '20px', // Slightly smaller radius for mobile
                overflow: 'hidden'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.transform = 'scale(0.98)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              role="button"
              tabIndex={0}
              aria-label="View featured event details"
            >
              {/* Background Image with Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  width: '350px',
                  height: '350px',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
              >
                <picture>
                  <source
                    srcSet="/images/optimized/hero-left-image-350w.webp 350w, /images/optimized/hero-left-image-700w.webp 700w, /images/optimized/hero-left-image-1050w.webp 1050w"
                    sizes="350px"
                    type="image/webp"
                  />
                  <source
                    srcSet="/images/optimized/hero-left-image.avif"
                    type="image/avif"
                  />
                  <img
                    src="/images/optimized/hero-left-image-350w.webp"
                    alt="Hero background"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    onLoad={() => console.log('✅ MOBILE HERO IMAGE LOADED SUCCESSFULLY (WebP Optimized)')}
                    onError={(e) => console.error('❌ MOBILE HERO IMAGE FAILED TO LOAD:', e.target.src)}
                    style={{
                      position: 'absolute',
                      left: '0px',
                      top: '0px',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </picture>
                <div
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(189deg, rgba(0, 0, 0, 0.00) 37.84%, rgba(0, 0, 0, 0.48) 55.87%, rgba(24, 24, 24, 0.96) 77.69%)`,
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Bottom overlay with date and location - Responsive */}
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  bottom: '47px', // Use bottom positioning instead of fixed top
                  display: 'flex',
                  width: '100%', // Use full width of responsive hero card
                  justifyContent: 'space-between',
                  padding: '0px 16px', // Slightly more padding for mobile
                  gap: '16px',
                  boxSizing: 'border-box'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: '1', // Use flex to take available space
                    padding: '4px 0px',
                    flexDirection: 'column',
                    minWidth: 0,
                    maxWidth: 'calc(100% - 106px)' // Reserve space for button (90px + 16px gap)
                  }}
                >
                  {/* Date row */}
                  <div
                    style={{
                      display: 'flex',
                      alignSelf: 'stretch',
                      alignItems: 'center',
                      gap: '4px',
                      minWidth: 0
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8" stroke="#FFF" strokeWidth="0.5"/>
                    </svg>
                    <span
                      style={{
                        color: '#FFF',
                        fontFamily: 'Inter',
                        fontSize: '12px', // Fixed size for mobile
                        fontWeight: '200',
                        lineHeight: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        minWidth: 0
                      }}
                    >
                      {processedEventCards.length > 0 && processedEventCards[0].eventDate
                        ? new Date(processedEventCards[0].eventDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          }).replace(',', 'th,')
                        : "March 29th, 9:00 P.M."
                      }
                    </span>
                  </div>

                  {/* Location row */}
                  <div
                    style={{
                      display: 'flex',
                      alignSelf: 'stretch',
                      alignItems: 'center',
                      gap: '4px',
                      minWidth: 0
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                      <path d="M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" stroke="#FFF" strokeWidth="0.5"/>
                      <circle cx="5" cy="4" r="1" fill="#FFF"/>
                    </svg>
                    <span
                      style={{
                        color: '#FFF',
                        fontFamily: 'Inter',
                        fontSize: '12px', // Fixed size for mobile
                        fontWeight: '200',
                        lineHeight: 'normal',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                        minWidth: 0
                      }}
                    >
                      {processedEventCards.length > 0 && processedEventCards[0].location
                        ? processedEventCards[0].location
                        : "Asbury Park, NJ"
                      }
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div
                  style={{
                    display: 'flex',
                    width: '90px',
                    height: '36px',
                    padding: '4px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      width: '90px',
                      height: '36px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '29px',
                      background: 'rgba(56, 56, 56, 0.80)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)',
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      e.target.style.transform = 'scale(0.95)';
                      e.target.style.background = 'rgba(76, 76, 76, 0.90)';
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      e.target.style.transform = 'scale(1)';
                      e.target.style.background = 'rgba(56, 56, 56, 0.80)';
                    }}
                  >
                    <span
                      style={{
                        color: '#FFF',
                        fontFamily: 'Inter',
                        fontSize: '14px', // Fixed size for mobile
                        fontWeight: '400',
                        lineHeight: 'normal',
                        pointerEvents: 'none'
                      }}
                    >
                      Events
                    </span>
                  </div>
                </div>
              </div>

              {/* Event title overlay - Responsive */}
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  bottom: '95px', // Use bottom positioning for consistency
                  display: 'flex',
                  width: '100%', // Use full width of responsive hero card
                  height: '48px',
                  padding: '8px 16px', // Slightly more padding for mobile
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                  gap: '10px',
                  boxSizing: 'border-box'
                }}
              >
                <div
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '24px', // Fixed size for mobile
                    fontWeight: '800',
                    lineHeight: '1.1',
                    flex: '1',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%', // Use full available width within padding
                    margin: '0px 0px 8px 0px' // Added margin as requested
                  }}
                >
                  {processedEventCards.length > 0 && (processedEventCards[0].title || processedEventCards[0].artist_name)
                    ? (processedEventCards[0].title || processedEventCards[0].artist_name)
                    : "FEATURED EVENT"
                  }
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Events List - Vertical Stack */}
          <div
            role="list"
            aria-label="Upcoming live music events"
            style={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              gap: '8px', // Reduced from 16px to 8px
              flexShrink: 0,
              padding: '0 20px', // Reduced padding to match main container and drawer approach
              marginBottom: '40px', // Additional bottom margin to ensure last event card is fully visible
              boxSizing: 'border-box', // Ensure padding doesn't cause overflow
              maxWidth: '100%' // Use full width of centered parent container
            }}
          >
            {/* Show featured events or empty state */}
            {featuredEvents.length === 0 ? (
              /* Empty State - No Featured Events */
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  height: '200px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                  color: '#FFF',
                  fontFamily: 'Inter',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    opacity: 0.8
                  }}
                >
                  No upcoming events
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    opacity: 0.6
                  }}
                >
                  Check back soon for exciting events!
                </div>
              </div>
            ) : (
              /* Mobile Event Cards - Vertical Stack with Spring Animation */
              processedEventCards.map((card, index) => (
                <article
                  key={card.id}
                  className={cardsAnimated ? 'event-card-spring' : 'event-card-hidden'}
                  role="listitem"
                  aria-labelledby={`event-title-${card.id}`}
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '120px', // Scaled up from 85px
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderRadius: '20px', // Scaled up from 16px
                    background: 'rgba(15, 15, 15, 0.95)', // Reduced transparency for better visual separation
                    backdropFilter: 'blur(20px) saturate(180%)', // Frostier blur effect
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)', // Safari support
                    border: '1px solid rgba(255, 255, 255, 0.12)', // Enhanced border for better definition
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)', // Enhanced shadow with stronger inner highlight
                    position: 'relative',
                    margin: '0',
                    padding: '0',
                    animationDelay: cardsAnimated ? `${0.1 + (index * 0.05)}s` : '0s', // Start after hero (0.1s base delay + stagger)
                    overflow: 'hidden' // Ensure backdrop filter works properly
                  }}
                >
                  {/* Mobile Event Card Content */}
                  <div
                    style={{
                      width: '100%',
                      height: '120px',
                      position: 'relative'
                    }}
                  >
                    {/* Dark Frosty Glass Overlay - Closer to Drawer Color */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `
                          linear-gradient(135deg,
                            rgba(21, 21, 21, 0.4) 0%,
                            rgba(21, 21, 21, 0.2) 25%,
                            rgba(21, 21, 21, 0.1) 50%,
                            rgba(21, 21, 21, 0.2) 75%,
                            rgba(21, 21, 21, 0.3) 100%
                          ),
                          linear-gradient(45deg,
                            rgba(255, 255, 255, 0.08) 0%,
                            rgba(255, 255, 255, 0.04) 25%,
                            rgba(255, 255, 255, 0.02) 50%,
                            rgba(255, 255, 255, 0.04) 75%,
                            rgba(255, 255, 255, 0.06) 100%
                          )
                        `,
                        backdropFilter: 'blur(12px) saturate(150%)',
                        WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: `
                          inset 0 1px 0 rgba(255, 255, 255, 0.1),
                          inset 0 -1px 0 rgba(255, 255, 255, 0.05),
                          0 4px 16px rgba(0, 0, 0, 0.4),
                          0 1px 4px rgba(0, 0, 0, 0.3)
                        `,
                        zIndex: 1,
                        pointerEvents: 'none'
                      }}
                    />
                    {/* Image Section - Scaled for Mobile */}
                    <div
                      style={{
                        position: 'absolute',
                        width: '118px', // Scaled up from 84px
                        height: '118px', // Scaled up from 84px
                        left: '0px',
                        top: '1px',
                        zIndex: 2 // Above gradient overlay
                      }}
                    >
                      {/* Event Background Image - Progressive Loading with Safari Mobile Optimization */}
                      <picture>
                        {/* Only include AVIF for non-Safari mobile browsers */}
                        {getAVIFSrcSet(card.coverImage, 'event') && (
                          <source
                            srcSet={getAVIFSrcSet(card.coverImage, 'event')}
                            sizes="111px"
                            type="image/avif"
                          />
                        )}
                        <source
                          srcSet={getResponsiveSrcSet(card.coverImage, 'event')}
                          sizes="111px"
                          type="image/webp"
                        />
                        <img
                          src={getOptimizedImageUrl(card.coverImage, 111)}
                          alt={`${card.title} event cover`}
                          {...getImageLoadingStrategy(index, true)}
                          onError={(e) => {
                            console.log('🔄 iOS Safari image fallback sequence starting for:', e.target.src);
                            console.log('🔍 Original card.coverImage:', card.coverImage);

                            // Enhanced iOS Safari fallback sequence
                            if (e.target.dataset.fallbackAttempt === undefined) {
                              // First attempt: try original image URL (unoptimized)
                              e.target.dataset.fallbackAttempt = '1';
                              console.log('🔄 Attempt 1: Trying original unoptimized URL');
                              e.target.src = card.coverImage;
                            } else if (e.target.dataset.fallbackAttempt === '1') {
                              // Second attempt: for new image system, try different variants
                              e.target.dataset.fallbackAttempt = '2';

                              if (card.coverImage.includes('/api/images/serve/')) {
                                const uuidMatch = card.coverImage.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
                                if (uuidMatch) {
                                  const uuid = uuidMatch[1];
                                  const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
                                  const smallVariantUrl = `${dashboardDomain}/api/images/serve/${uuid}/small`;
                                  console.log('🔄 Attempt 2: Trying small variant for new image system:', smallVariantUrl);
                                  e.target.src = smallVariantUrl;
                                  return;
                                }
                              }

                              // For old system or external URLs, try JPEG fallback
                              const jpegFallback = card.coverImage.replace(/\.(webp|avif)$/i, '.jpg');
                              if (jpegFallback !== card.coverImage) {
                                console.log('🔄 Attempt 2: Trying JPEG fallback:', jpegFallback);
                                e.target.src = jpegFallback;
                              } else {
                                // Skip to next attempt
                                e.target.dataset.fallbackAttempt = '3';
                                handleImageFallbackAttempt3(e.target, card);
                              }
                            } else if (e.target.dataset.fallbackAttempt === '2') {
                              // Third attempt
                              e.target.dataset.fallbackAttempt = '3';
                              handleImageFallbackAttempt3(e.target, card);
                            } else {
                              // Final fallback: styled placeholder
                              handleFinalImageFallback(e.target, card);
                            }
                          }}
                          onLoad={(e) => {
                            // Clear fallback tracking on successful load
                            delete e.target.dataset.fallbackAttempt;
                            console.log('✅ Event image loaded successfully:', e.target.src);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                              window.open(card.ticketsUrl, '_blank');
                            }
                          }}
                          style={{
                            position: 'absolute',
                            left: '4px', // Scaled up from 3px
                            top: '3px', // Scaled up from 2px
                            width: '111px', // Scaled up from 79.04px
                            height: '111px', // Scaled up from 79.04px
                            borderRadius: '18px', // Scaled up from 14px
                            objectFit: 'cover',
                            backgroundColor: 'lightgray',
                            cursor: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#' ? 'pointer' : 'default',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: 'scale(1) translateY(0px)',
                            boxShadow: 'none'
                          }}
                          onMouseEnter={(e) => {
                            if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                              e.target.style.transform = 'scale(1.015) translateY(-2px)';
                              e.target.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.25)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1) translateY(0px)';
                            e.target.style.boxShadow = 'none';
                          }}
                          onMouseDown={(e) => {
                            if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                              e.target.style.transform = 'scale(0.995) translateY(0px)';
                            }
                          }}
                          onMouseUp={(e) => {
                            if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                              e.target.style.transform = 'scale(1.015) translateY(-2px)';
                            }
                          }}
                        />
                      </picture>

                      {/* Date Badge Container - Scaled for Mobile */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '76px', // Scaled up from 54px
                          top: '7px', // Scaled up from 5px
                          width: '34px', // Scaled up from 24px
                          height: '34px' // Scaled up from 24px
                        }}
                      >
                        {/* White Badge Background */}
                        <div
                          style={{
                            position: 'absolute',
                            left: '0px',
                            top: '-1px',
                            width: '34px', // Scaled up from 24px
                            height: '34px', // Scaled up from 24px
                            borderRadius: '6px', // Scaled up from 4px
                            background: '#FFF',
                            opacity: 0.7 // Reduced transparency for more subtle appearance
                          }}
                        />

                        {/* Date Badge Content */}
                        <div
                          style={{
                            position: 'absolute',
                            left: '3px', // Scaled up from 2px
                            top: '3px', // Scaled up from 2px
                            display: 'flex',
                            width: '28px', // Scaled up from 20px
                            height: '25px', // Scaled up from 18px
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '1px'
                          }}
                        >
                          {/* DAY Number */}
                          <span
                            style={{
                              color: '#000',
                              textAlign: 'center',
                              fontFamily: 'Inter',
                              fontSize: '14px', // Scaled up from 10px
                              fontWeight: '600',
                              lineHeight: 'normal'
                            }}
                          >
                            {card.day}
                          </span>

                          {/* MONTH Abbreviation */}
                          <span
                            style={{
                              color: '#000',
                              textAlign: 'center',
                              fontFamily: 'Inter',
                              fontSize: '8px', // Scaled up from 6px
                              fontWeight: '600',
                              lineHeight: 'normal'
                            }}
                          >
                            {card.month}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Text Content Section - Scaled for Mobile */}
                    <div
                      className="card-clickable-area"
                      style={{
                        position: 'absolute',
                        left: '132px', // Keep fixed left position for image space
                        right: '8px', // Use right positioning instead of fixed width
                        top: '0px',
                        display: 'flex',
                        height: '120px', // Scaled up from 85px
                        padding: '4px 0px', // Scaled up from 3px
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '16px', // Scaled up from 12px
                        zIndex: 2, // Above gradient overlay
                        boxSizing: 'border-box' // Ensure padding is included in width calculation
                      }}
                    >
                      {/* Event Information */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          alignSelf: 'stretch',
                          justifyContent: 'space-between'
                        }}
                      >
                        {/* Event Title */}
                        <h3
                          id={`event-title-${card.id}`}
                          style={{
                            display: 'flex',
                            width: '240px', // Scaled up from 150px
                            height: '22px', // Scaled up from 16px
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '18px', // Scaled up from 14px
                            fontWeight: '600',
                            lineHeight: '1.0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            margin: '0 0 8px 0' // Add space between title and date/location
                          }}
                        >
                          {card.title}
                        </h3>

                        {/* DATE Information Row - Smaller clickable area */}
                        <div
                          style={{
                            display: 'flex',
                            paddingLeft: '1px',
                            marginBottom: '2px', // Further reduced space between date and location
                            alignItems: 'center',
                            gap: '4px', // Scaled up from 3px
                            alignSelf: 'stretch',
                            position: 'relative' // For positioning the clickable area
                          }}
                        >
                          {/* Calendar Icon - Clickable */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 10 10"
                            fill="none"
                            onClick={() => {
                              // Create calendar event
                              const eventTitle = encodeURIComponent(card.title);
                              const eventLocation = encodeURIComponent(card.location);
                              const eventDate = card.date;

                              // Parse date string to create proper calendar format
                              const now = new Date();
                              const currentYear = now.getFullYear();

                              // Extract date parts
                              const dateMatch = eventDate.match(/(\w{3})\s+@\s+(\w{3})\s+(\d{1,2})\s+(\d{1,2}):(\d{2})(AM|PM)/);

                              if (dateMatch) {
                                const [, , month, day, hour, minute, ampm] = dateMatch;
                                const monthMap = {
                                  'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                                  'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
                                };

                                let hour24 = parseInt(hour);
                                if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
                                if (ampm === 'AM' && hour24 === 12) hour24 = 0;

                                const eventDateTime = new Date(currentYear, monthMap[month], parseInt(day), hour24, parseInt(minute));
                                const endDateTime = new Date(eventDateTime.getTime() + 3 * 60 * 60 * 1000); // 3 hours later

                                // Format for calendar URL
                                const startTime = eventDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                                const endTime = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

                                // Try different calendar methods
                                const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&location=${eventLocation}&details=Event%20details`;

                                window.open(calendarUrl, '_blank');
                              }
                            }}
                            style={{
                              cursor: 'pointer',
                              padding: '2px',
                              borderRadius: '4px',
                              transition: 'all 0.2s ease-in-out'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <path d="M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8" stroke="#FFF" strokeWidth="1"/>
                          </svg>

                          {/* Date text container - no gap between parts */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0px', // No gap between text parts
                              flex: 1
                            }}
                          >
                            {/* First part of date - clickable with proper touch target */}
                            <span
                              onClick={() => {
                                // Same calendar event logic as icon
                                const eventTitle = encodeURIComponent(card.title);
                                const eventLocation = encodeURIComponent(card.location);
                                const eventDate = card.date;

                                const now = new Date();
                                const currentYear = now.getFullYear();
                                const dateMatch = eventDate.match(/(\w{3})\s+@\s+(\w{3})\s+(\d{1,2})\s+(\d{1,2}):(\d{2})(AM|PM)/);

                                if (dateMatch) {
                                  const [, , month, day, hour, minute, ampm] = dateMatch;
                                  const monthMap = {
                                    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
                                    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
                                  };

                                  let hour24 = parseInt(hour);
                                  if (ampm === 'PM' && hour24 !== 12) hour24 += 12;
                                  if (ampm === 'AM' && hour24 === 12) hour24 = 0;

                                  const eventDateTime = new Date(currentYear, monthMap[month], parseInt(day), hour24, parseInt(minute));
                                  const endDateTime = new Date(eventDateTime.getTime() + 3 * 60 * 60 * 1000);

                                  const startTime = eventDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                                  const endTime = endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

                                  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&location=${eventLocation}&details=Event%20details`;
                                  window.open(calendarUrl, '_blank');
                                }
                              }}
                              style={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize: '12px',
                                fontWeight: '100',
                                lineHeight: '1.0',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'inline-block',
                                // Enhanced touch target using pseudo-element approach
                                minHeight: '24px', // WCAG minimum
                                padding: '6px 8px', // Comfortable padding for touch
                                margin: '-6px -8px', // Negative margin to maintain visual position
                                borderRadius: '6px',
                                transition: 'all 0.2s ease-in-out'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              {(() => {
                                const parts = card.date.split(' @');
                                return parts[0] + ' @'; // "Fri @"
                              })()}
                            </span>

                            {/* Remaining date text - not clickable, no gap */}
                            <span
                              style={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize: '12px',
                                fontWeight: '100',
                                lineHeight: '1.0',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1
                              }}
                            >
                              {(() => {
                                const parts = card.date.split(' @');
                                return parts.length > 1 ? ' ' + parts[1] : ''; // " Aug 01 10:00PM"
                              })()}
                            </span>
                          </div>
                        </div>

                        {/* LOCATION Information Row - Fixed spacing and touch areas */}
                        <div
                          style={{
                            display: 'flex',
                            padding: '0px 1px',
                            alignItems: 'center',
                            gap: '4px', // Gap between icon and text container
                            alignSelf: 'stretch'
                          }}
                        >
                          {/* Location Icon - Clickable */}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 10 10"
                            fill="none"
                            onClick={() => {
                              const address = encodeURIComponent(card.location);
                              const userAgent = navigator.userAgent || '';

                              // Detect iOS
                              if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                window.open(`maps://maps.apple.com/?q=${address}`, '_blank');
                              }
                              // Detect Android
                              else if (/android/i.test(userAgent)) {
                                window.open(`geo:0,0?q=${address}`, '_blank');
                              }
                              // Default to Google Maps for web browsers
                              else {
                                window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
                              }
                            }}
                            style={{
                              cursor: 'pointer',
                              padding: '2px',
                              borderRadius: '4px',
                              transition: 'all 0.2s ease-in-out'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <path d="M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" stroke="#FFF" strokeWidth="1"/>
                            <circle cx="5" cy="4" r="1" fill="#FFF"/>
                          </svg>

                          {/* Location text container - no gap between parts */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0px', // No gap between text parts
                              flex: 1
                            }}
                          >
                            {/* First part of location - clickable with proper touch target */}
                            <span
                              onClick={() => {
                                const address = encodeURIComponent(card.location);
                                const userAgent = navigator.userAgent || '';

                                if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                                  window.open(`maps://maps.apple.com/?q=${address}`, '_blank');
                                } else if (/android/i.test(userAgent)) {
                                  window.open(`geo:0,0?q=${address}`, '_blank');
                                } else {
                                  window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
                                }
                              }}
                              style={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize: '12px',
                                fontWeight: '100',
                                lineHeight: '1.0',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                position: 'relative',
                                display: 'inline-block',
                                // Enhanced touch target using proper padding
                                minHeight: '24px', // WCAG minimum
                                padding: '6px 8px', // Comfortable padding for touch
                                margin: '-6px -8px', // Negative margin to maintain visual position
                                borderRadius: '6px',
                                transition: 'all 0.2s ease-in-out'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              {card.location.split(',')[0]} {/* Only show first part like "Los Angeles" */}
                            </span>

                            {/* Remaining location text - not clickable, no gap */}
                            <span
                              style={{
                                color: '#FFF',
                                fontFamily: 'Inter',
                                fontSize: '12px',
                                fontWeight: '100',
                                lineHeight: '1.0',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                flex: 1
                              }}
                            >
                              {card.location.includes(',') ? ',' + card.location.split(',').slice(1).join(',') : ''} {/* Show rest like ", CA" */}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button Section - Aligned with Image Bottom */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '6px', // Position from bottom to align with image bottom (120px card - 114px image bottom = 6px)
                          left: '0px',
                          display: 'flex',
                          width: '100%',
                          height: '28px', // Button height
                          justifyContent: 'flex-start', // Match desktop alignment
                          alignItems: 'center'
                        }}
                      >
                        {/* Get Tickets Button - Extended to right side */}
                        {card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#' ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(card.ticketsUrl, '_blank');
                            }}
                            style={{
                              display: 'flex',
                              width: 'auto', // Auto width to fit content
                              minWidth: '120px', // Minimum width for button
                              maxWidth: '100%', // Don't exceed container width
                              height: '28px', // Scaled up from 20px (desktop)
                              padding: '11px 14px', // Scaled up from 8px 10px (desktop)
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px', // Scaled up from 6px (desktop)
                              borderRadius: '28px', // Scaled up from 20px (desktop)
                              background: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                                ? 'rgba(23, 23, 23, 0.80)' // Normal state - not hover state
                                : 'rgba(23, 23, 23, 0.40)',
                              border: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                                ? '1px solid rgba(255, 255, 255, 0.15)' // Subtle border for better definition
                                : '1px solid rgba(255, 255, 255, 0.05)',
                              boxShadow: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                                ? '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' // Enhanced shadow and inner highlight
                                : 'none',
                              cursor: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                                ? 'pointer'
                                : 'default',
                              opacity: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                                ? 1
                                : 0.6,
                              transition: 'all 0.3s ease', // Match desktop transition
                              transform: 'scale(1)',
                              marginRight: '8px' // Small margin from right edge
                            }}
                            onMouseEnter={(e) => {
                              if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.background = 'rgba(76, 76, 76, 0.90)'; // Match desktop hover
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.background = 'rgba(23, 23, 23, 0.80)'; // Reset to normal state
                              }
                            }}
                            onMouseDown={(e) => {
                              if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                                e.currentTarget.style.transform = 'scale(0.95)';
                              }
                            }}
                            onMouseUp={(e) => {
                              if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                                e.currentTarget.style.transform = 'scale(1.05)';
                              }
                            }}
                          >
                            <span
                              style={{
                                color: '#FFF', // White text like desktop
                                fontFamily: 'Inter',
                                fontSize: '14px', // Scaled up from 10px (desktop)
                                fontWeight: '300', // Match desktop weight
                                lineHeight: 'normal',
                                pointerEvents: 'none'
                              }}
                            >
                              Get Tickets
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
          </section>
        </div>
        </main>

        {/* Dynamic Gradient Overlay Behind Drawer - Only visible when drawer is open */}
        {!drawerFullyClosed && (
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: `calc(${getDrawerHeight()} + 80px)`, // Reduced height for less blocking
              background: `linear-gradient(
                to top,
                rgba(0, 0, 0, 0.6) 0%,
                rgba(0, 0, 0, 0.4) 20%,
                rgba(0, 0, 0, 0.2) 40%,
                rgba(0, 0, 0, 0.1) 60%,
                rgba(0, 0, 0, 0.05) 80%,
                rgba(0, 0, 0, 0) 100%
              )`,
              opacity: 1,
              transition: 'opacity 0.1s ease-out', // Ultra-fast transition
              zIndex: 40, // Lower z-index to ensure content visibility
              pointerEvents: 'none', // Don't interfere with interactions
              transform: 'translateY(0%)',
              transformOrigin: 'bottom'
            }}
          />
        )}

        {/* Text Us Drawer - Bottom with Dynamic Height and Swipe Gestures */}
        <div
          ref={drawerRef}
          onClick={(e) => {
            e.stopPropagation(); // Prevent background click when clicking drawer
            handleDrawerClick(); // Handle drawer click to open when closed
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`mobile-drawer ${drawerExpanded ? 'expanded' : 'collapsed'}`}
          style={{
            height: '280px', // Fixed height for consistent transform animations
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 0px 20px 0px', // Remove left/right padding, keep top/bottom
            boxSizing: 'border-box',
            overflow: drawerExpanded ? 'visible' : 'hidden', // Allow content to be visible when expanded
            cursor: drawerFullyClosed ? 'pointer' : 'default',
            touchAction: 'pan-y', // Allow vertical panning for swipe gestures
            userSelect: 'none', // Prevent text selection during swipe
            WebkitUserSelect: 'none' // Safari support
          }}
        >
          {/* Drawer Card Gradient Overlay - Creates hiding effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to bottom,
                transparent 0%,
                transparent 30%,
                rgba(0, 0, 0, 0.3) 70%,
                rgba(0, 0, 0, 0.6) 100%)`,
              pointerEvents: 'none',
              zIndex: 1,
              opacity: drawerExpanded ? 0 : 1,
              transition: 'opacity 0.4s ease'
            }}
          />
          {/* Drawer Handle with Enhanced Touch Area */}
          <div
            style={{
              alignSelf: 'center',
              width: '80px', // Larger touch area
              height: '20px', // Larger touch area
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '6px',
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
              cursor: 'grab',
              touchAction: 'pan-y' // Allow vertical panning
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Visual Handle */}
            <div
              style={{
                width: '60px',
                height: '4px',
                background: '#D9D9D9',
                borderRadius: '100px',
                opacity: 0.8,
                transition: 'opacity 0.2s ease'
              }}
            />
          </div>

          {/* Verification Collapsed Indicator */}
          {showVerification && !drawerExpanded && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                flexShrink: 0,
                position: 'relative',
                zIndex: 2,
                opacity: 0.8
              }}
            >
              <div
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: '500',
                  textAlign: 'center'
                }}
              >
                Verification Code
              </div>
              <div
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: '400',
                  textAlign: 'center',
                  opacity: 0.7
                }}
              >
                Tap to continue
              </div>
            </div>
          )}

          {/* Text Us Group - Hidden during verification */}
          {!drawerFullyClosed && !showVerification && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                marginLeft: '20px', // Add left margin for text positioning
                flexShrink: 0,
                position: 'relative',
                zIndex: 2
              }}
            >
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '20px',
                lineHeight: '1.2em',
                color: '#FFFFFF'
              }}
            >
              Text us
            </div>
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: '300',
                fontSize: '12px',
                lineHeight: '1.3em',
                color: '#FFFFFF',
                opacity: 0.8
              }}
            >
              Exclusive events, contests, and more
            </div>
          </div>
          )}

          {/* Laylo Iframe - Persistent in DOM for state preservation */}
          <div
            onClick={handleIframeClick}
            style={{
              width: '100%',
              maxWidth: '1000px',
              margin: '0 auto', // Remove all margins for tight spacing
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'visible', // Allow iframe content to be fully visible
              flexShrink: 0, // Prevent container from shrinking
              visibility: (drawerExpanded && !drawerFullyClosed) ? 'visible' : 'hidden',
              opacity: (drawerExpanded && !drawerFullyClosed) ? 1 : 0,
              transform: (drawerExpanded && !drawerFullyClosed) ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out, visibility 0.1s ease-out'
            }}
          >
            <LayloIframe
              dropId="1nTsX"
              color="ff0409"
              theme="dark"
              background="solid"
              minimal={true}
              style={{
                width: '1px',
                minWidth: '100%',
                maxWidth: '1000px',
                height: iframeExpanded ? '200px' : '160px', // Much larger height for phone form content
                border: 'none',
                borderRadius: '8px',
                background: 'transparent',
                display: 'block',
                transition: 'height 0.1s ease-out',
                pointerEvents: 'auto' // Ensure iframe can receive clicks
              }}
            />
          </div>

          {/* Disclaimer Text - Removed, replaced by Laylo iframe */}

        </div>
      </div>

      {/* Mobile Menu Overlay */}
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
            {/* Close Menu Button (Animated X) - Right Side */}
            <div
              onClick={toggleMenu}
              className="mobile-menu-button"
              style={{
                position: 'absolute',
                right: '20px',
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

            {/* B2B Logo - Centered - Clickable */}
            <img
              onClick={() => handleNavigation('/')}
              src="/images/mobile-figma/b2b-logo-mobile.svg"
              alt="B2B Logo"
              style={{
                width: '138.41px',
                height: '43px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                userSelect: 'none'
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(0.95)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translate(-50%, -50%) scale(1)';
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
              onClick={() => handleNavigation('/')}
              className="mobile-nav-item"
              style={{
                fontFamily: 'Inter',
                fontWeight: '800',
                fontSize: '64px',
                lineHeight: '1.21em',
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
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
                textAlign: 'center',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
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
                color: '#FFFFFF',
                cursor: 'pointer',
                textAlign: 'center',
                transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
                opacity: showMenu ? 1 : 0,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
                transitionDelay: showMenu ? '0.5s' : '0s'
              }}
            >
              Contact
            </div>
          </div>
        </div>
    </>
  );
};

export default FigmaMobile;

