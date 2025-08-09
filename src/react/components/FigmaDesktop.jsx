import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';
import { sanitizeUserInput, sanitizeFormData, sanitizeUrl, sanitizeSearchQuery } from '../utils/sanitizer';

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

// Image helpers inlined to avoid external dependency during build
const getOptimizedImageUrl = (originalUrl, width = null) => {
  if (!originalUrl) return originalUrl;
  if (typeof originalUrl === 'string' && originalUrl.includes('/images/figma-exact/')) {
    const filename = originalUrl.split('/').pop();
    return `/images/optimized/${filename}`;
  }
  if (typeof originalUrl === 'string' && originalUrl.startsWith('http')) {
    const encodedUrl = encodeURIComponent(originalUrl);
    const baseUrl = `/images/proxy-optimized?url=${encodedUrl}`;
    return width ? `${baseUrl}&w=${width}` : baseUrl;
  }
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
  return responsiveSizes(context)
    .map((size) => `/images/proxy-optimized?url=${encodeURIComponent(originalUrl)}&w=${size}&format=avif ${size}w`)
    .join(', ');
};

const shouldPreloadImage = (index, isMobile = true) => index < (isMobile ? 2 : 4);

const getImageLoadingStrategy = (index, isMobile = true) => {
  if (shouldPreloadImage(index, isMobile)) {
    return { loading: 'eager', decoding: 'async', fetchpriority: 'high' };
  }
  return { loading: 'lazy', decoding: 'async', fetchpriority: 'low' };
};

// Add CSS animation for spinning wheel
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

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
    id: 'gb',
    code: '+44',
    name: 'United Kingdom',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxwYXRoIGQ9Ik0wIDBoMjF2M0gwVjB6bTAgNmgyMXYzSDBWNnptMCA2aDIxdjNIMHYtM3oiIGZpbGw9IiNmZmYiLz4KPHBhdGggZD0iTTAgMGgyMXYxSDBWMHptMCAyaDIxdjFIMFYyem0wIDJoMjF2MUgwVjR6bTAgMmgyMXYxSDBWNnptMCA4aDIxdjFIMHYtMXoiIGZpbGw9IiNjZTExMjQiLz4KPC9zdmc+',
    pattern: /^\d{10,11}$/,
    placeholder: '20 1234 5678',
    maxLength: 13,
    digitLength: 11
  },
  {
    id: 'ca',
    code: '+1',
    name: 'Canada',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmYwMDAwIi8+CjxyZWN0IHg9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSIxNSIgZmlsbD0iI2ZmMDAwMCIvPgo8cGF0aCBkPSJNMTAuNSA0bDEgMi41aDIuNWwtMiAyIDEgMi41LTIuNS0xLTIuNSAxIDEtMi41LTItMmgyLjVsMS0yLjV6IiBmaWxsPSIjZmYwMDAwIi8+Cjwvc3ZnPg==',
    pattern: /^\d{10}$/,
    placeholder: '(555) 123-4567',
    maxLength: 14,
    digitLength: 10
  },
  {
    id: 'de',
    code: '+49',
    name: 'Germany',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiMwMDAiLz4KPHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZjAwMDAiLz4KPHJlY3QgeT0iMTAiIHdpZHRoPSIyMSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZjZTAwIi8+Cjwvc3ZnPg==',
    pattern: /^\d{10,12}$/,
    placeholder: '30 12345678',
    maxLength: 15,
    digitLength: 12
  },
  {
    id: 'fr',
    code: '+33',
    name: 'France',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDIzOTUiLz4KPHJlY3QgeD0iNyIgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeD0iMTQiIHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZWQyOTM5Ii8+Cjwvc3ZnPg==',
    pattern: /^\d{9,10}$/,
    placeholder: '1 23 45 67 89',
    maxLength: 14,
    digitLength: 10
  },
  {
    id: 'au',
    code: '+61',
    name: 'Australia',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDEyMTY5Ii8+CjxyZWN0IHdpZHRoPSIxMC41IiBoZWlnaHQ9IjcuNSIgZmlsbD0iIzAxMjE2OSIvPgo8L3N2Zz4K',
    pattern: /^\d{9}$/,
    placeholder: '4 1234 5678',
    maxLength: 12,
    digitLength: 9
  },
  {
    id: 'in',
    code: '+91',
    name: 'India',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZjk5MzMiLz4KPHJlY3QgeT0iNSIgd2lkdGg9IjIxIiBoZWlnaHQ9IjUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeT0iMTAiIHdpZHRoPSIyMSIgaGVpZ2h0PSI1IiBmaWxsPSIjMTM4ODA4Ii8+Cjwvc3ZnPg==',
    pattern: /^\d{10}$/,
    placeholder: '98765 43210',
    maxLength: 13,
    digitLength: 10
  },
  {
    id: 'br',
    code: '+55',
    name: 'Brazil',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjMDA5NzM5Ii8+CjxwYXRoIGQ9Ik0xMC41IDJMMTggNy41IDEwLjUgMTMgMyA3LjUgMTAuNSAyeiIgZmlsbD0iI2ZlZGYwMCIvPgo8L3N2Zz4K',
    pattern: /^\d{10,11}$/,
    placeholder: '11 99999-9999',
    maxLength: 15,
    digitLength: 11
  },
  {
    id: 'mx',
    code: '+52',
    name: 'Mexico',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiMwMDY4NDciLz4KPHJlY3QgeD0iNyIgd2lkdGg9IjciIGhlaWdodD0iMTUiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeD0iMTQiIHdpZHRoPSI3IiBoZWlnaHQ9IjE1IiBmaWxsPSIjY2UxMTI2Ii8+Cjwvc3ZnPg==',
    pattern: /^\d{10}$/,
    placeholder: '55 1234 5678',
    maxLength: 13,
    digitLength: 10
  },
  {
    id: 'jp',
    code: '+81',
    name: 'Japan',
    flag: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjEiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyMSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmZmIi8+CjxjaXJjbGUgY3g9IjEwLjUiIGN5PSI3LjUiIHI9IjMiIGZpbGw9IiNiYzAwMmQiLz4KPC9zdmc+',
    pattern: /^\d{10,11}$/,
    placeholder: '90-1234-5678',
    maxLength: 13,
    digitLength: 11
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

  switch (country.code) {
    case '+1': // US/Canada - (555) 123-4567
      if (limitedNumber.length <= 3) {
        return limitedNumber.length > 0 ? `(${limitedNumber}` : '';
      }
      if (limitedNumber.length <= 6) {
        return `(${limitedNumber.slice(0,3)}) ${limitedNumber.slice(3)}`;
      }
      return `(${limitedNumber.slice(0,3)}) ${limitedNumber.slice(3,6)}-${limitedNumber.slice(6)}`;

    case '+44': // UK - 20 1234 5678
      if (limitedNumber.length <= 2) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2)}`;
      }
      return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2,6)} ${limitedNumber.slice(6)}`;

    case '+49': // Germany - 30 12345678
      if (limitedNumber.length <= 2) return limitedNumber;
      if (limitedNumber.length <= 6) {
        return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2)}`;
      }
      return `${limitedNumber.slice(0,2)} ${limitedNumber.slice(2,6)} ${limitedNumber.slice(6)}`;

    case '+33': // France - 1 23 45 67 89
      if (limitedNumber.length <= 1) return limitedNumber;
      if (limitedNumber.length <= 3) {
        return `${limitedNumber.slice(0,1)} ${limitedNumber.slice(1)}`;
      }
      if (limitedNumber.length <= 5) {
        return `${limitedNumber.slice(0,1)} ${limitedNumber.slice(1,3)} ${limitedNumber.slice(3)}`;
      }
      if (limitedNumber.length <= 7) {
        return `${limitedNumber.slice(0,1)} ${limitedNumber.slice(1,3)} ${limitedNumber.slice(3,5)} ${limitedNumber.slice(5)}`;
      }
      return `${limitedNumber.slice(0,1)} ${limitedNumber.slice(1,3)} ${limitedNumber.slice(3,5)} ${limitedNumber.slice(5,7)} ${limitedNumber.slice(7)}`;

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

// Memoized Event Card Component for better performance
const EventCard = memo(({ card, scaledDimensions }) => {
  const handleImageClick = useCallback((e) => {
    e.stopPropagation();
    if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
      window.open(card.ticketsUrl, '_blank');
    }
  }, [card.isRealEvent, card.ticketsUrl]);

  const handleTicketClick = useCallback(() => {
    if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
      window.open(card.ticketsUrl, '_blank');
    }
  }, [card.isRealEvent, card.ticketsUrl]);

  const imageHandlers = useMemo(() => ({
    onMouseEnter: (e) => {
      if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
        e.target.style.transform = 'scale(1.015) translateY(-2px)';
        e.target.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.25)';
      }
    },
    onMouseLeave: (e) => {
      e.target.style.transform = 'scale(1) translateY(0px)';
      e.target.style.boxShadow = 'none';
    },
    onMouseDown: (e) => {
      if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
        e.target.style.transform = 'scale(0.995) translateY(0px)';
      }
    },
    onMouseUp: (e) => {
      if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
        e.target.style.transform = 'scale(1.015) translateY(-2px)';
      }
    }
  }), [card.isRealEvent, card.ticketsUrl]);

  return null; // Will be implemented in next chunk
});

const FigmaDesktop = () => {
  console.log('🖥️ FIGMA DESKTOP COMPONENT RENDERING');
  // Autoplay YouTube on load per requirements (keep muted for autoplay policy)
  const [shouldLoadYoutube, setShouldLoadYoutube] = useState(true);

  useEffect(() => {
    setShouldLoadYoutube(true);
  }, []);

  // Add shake animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-4px); }
        75% { transform: translateX(4px); }
      }
      .shake {
        animation: shake 400ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [homeSettings, setHomeSettings] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneSubmitting, setPhoneSubmitting] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState('us'); // Use country ID instead of code
  const [phoneInputState, setPhoneInputState] = useState('normal'); // normal, loading, valid, invalid
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Verification states
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSubmitting, setVerificationSubmitting] = useState(false);
  const [verificationPhone, setVerificationPhone] = useState('');
  const [verificationState, setVerificationState] = useState('normal'); // normal, filled, valid, invalid

  // Resend countdown state
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [resendSubmitting, setResendSubmitting] = useState(false);

  // Refs for animations
  const flagImageRef = useRef(null);
  const phoneContainerRef = useRef(null);
  const resendTimerRef = useRef(null);
  const isMountedRef = useRef(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState('Events'); // Navigation state
  const [scaledDimensions, setScaledDimensions] = useState({
    heroWidth: 299,
    heroHeight: 299,
    rightHeroWidth: 498,
    rightHeroHeight: 299,
    gap: 32,
    containerWidth: 825,
    // Fixed layout dimensions that should never scale
    eventsTextGap: 18,  // Always 18px gap between Events and Text us
    eventCardWidth: 220,  // Set to 220px as requested
    eventCardHeight: 85,   // Always 85px event card height
    scale: 1
  });

  // Use performant resize hook for responsive calculations
  const { width: viewportWidth } = usePerformantResize((dimensions) => {
    const { width: currentViewportWidth } = dimensions;
    const padding = currentViewportWidth <= 360 ? 16 : currentViewportWidth <= 480 ? 24 : 32;
    const availableWidth = currentViewportWidth - padding;

    // Base dimensions from Figma design
    const baseHeroWidth = 299;
    const baseHeroHeight = 299;
    const baseRightHeroWidth = 498;
    const baseRightHeroHeight = 299;
    const baseGap = 32;
    const baseContainerWidth = 825; // Fixed container width for alignment
    const containerPadding = 32; // 16px on each side
    const availableContainerWidth = baseContainerWidth - containerPadding; // 793px

    // Calculate scale factor to fit both hero sections and events/text sections
    const totalHeroWidth = baseHeroWidth + baseGap + baseRightHeroWidth; // 829px
    const baseEventsWidth = 440;  // Reduced from 507px to 440px as requested
    const baseTextUsWidth = 299;
    const baseEventsTextGap = 50;  // Increased gap for visible separation
    const totalEventsTextWidth = baseEventsWidth + baseEventsTextGap + baseTextUsWidth; // 789px

    // Use the more restrictive constraint to ensure both sections fit
    const maxRequiredWidth = Math.max(totalHeroWidth, totalEventsTextWidth); // 829px
    let scale = Math.min(availableWidth / maxRequiredWidth, availableContainerWidth / maxRequiredWidth);

    // Apply constraints - keep minimum but add reasonable maximum for desktop
    if (scale < 0.25) scale = 0.25;  // Minimum for small screens
    if (scale > 1.25) scale = 1.25;    // Maximum for desktop (prevents oversized content)

    const scaledDimensions = {
      heroWidth: Math.round(baseHeroWidth * scale),
      heroHeight: Math.round(baseHeroHeight * scale),
      rightHeroWidth: Math.round(baseRightHeroWidth * scale),
      rightHeroHeight: Math.round(baseRightHeroHeight * scale),
      gap: Math.round(baseGap * scale),
      // Container width stays fixed for alignment
      containerWidth: baseContainerWidth,  // Always 825px for perfect alignment
      // Scale events and text sections to match hero scaling
      eventsWidth: Math.round(baseEventsWidth * scale),  // Scale events section width
      textUsWidth: Math.round(baseTextUsWidth * scale),  // Scale text us section width
      eventsTextGap: Math.round(baseEventsTextGap * scale),  // Scale gap between Events and Text us
      eventCardWidth: 220,  // Set to 220px as requested
      eventCardHeight: 85,   // Always 85px event card height
      scale: scale
    };

    // Update mobile state based on whether events list can fit alongside text us section
    // Events list needs ~440px + Text us needs ~299px + gap ~50px = ~789px minimum
    setIsMobile(currentViewportWidth <= 850);

    setScaledDimensions(scaledDimensions);
    console.log(`🎯 Responsive scaling: ${scale.toFixed(3)} for viewport ${currentViewportWidth}px (max 1.25x)`, scaledDimensions);
  });

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

  // Get the most recent event for hero sections
  const mostRecentEvent = useMemo(() => {
    return featuredEvents.length > 0 ? featuredEvents[0] : null;
  }, [featuredEvents]);

  // Format location to show just venue and city (prevent overflow)
  const formatLocation = useCallback((address) => {
    if (!address) return "Asbury Park, NJ";

    const parts = address.split(',').map(part => part.trim());

    // If it's a full address like "123 Street, City, State"
    if (parts.length >= 2) {
      // Check if first part looks like a street address (starts with number)
      const firstPart = parts[0];
      if (/^\d/.test(firstPart)) {
        // Skip street address, return "City, State" or just "City"
        return parts.slice(1, 3).join(', ');
      } else {
        // First part is venue name, return "Venue, City"
        return parts.slice(0, 2).join(', ');
      }
    }

    // Fallback to original if parsing fails
    return address.length > 25 ? address.substring(0, 22) + '...' : address;
  }, []);

  const fetchHomepageData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first with improved cache key
      const cacheKey = 'homepage-data-v2';
      const cached = apiCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('📦 Using cached homepage data');
        setHomeSettings(cached.data.homeSettings);
        setFeaturedEvents(cached.data.featuredEvents || []);
        setFormattedDate(cached.data.formattedDate || "March 29th, 9:00 P.M.");
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
      if (!homeSettings.event_title && !homeSettings.artist_name) {
        console.warn('Home settings missing required fields, using defaults');
      }

      // Validate featured events
      const featuredEvents = Array.isArray(data.featuredEvents) ? data.featuredEvents : [];
      if (featuredEvents.length === 0) {
        console.warn('No featured events found, using placeholder cards');
      }

      // Validate each event has required fields
      const validatedEvents = featuredEvents.filter(event => {
        if (!event || typeof event !== 'object') return false;
        if (!event.id || !event.title) {
          console.warn('Event missing required fields:', event);
          return false;
        }
        return true;
      });

      console.log(`✅ Homepage data loaded: ${validatedEvents.length} featured events`);

      // Cache the successful response
      apiCache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });

      setHomeSettings(homeSettings);
      setFeaturedEvents(validatedEvents);

      // Use most recent event data for hero sections if available
      let heroFormattedDate = data.formattedDate || "March 29th, 9:00 P.M.";
      if (validatedEvents.length > 0 && validatedEvents[0].event_date) {
        const eventDate = new Date(validatedEvents[0].event_date);
        const options = {
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        };
        heroFormattedDate = eventDate.toLocaleDateString('en-US', options)
          .replace(',', 'th,'); // Add 'th' suffix
      }

      setFormattedDate(heroFormattedDate);

    } catch (err) {
      console.error('❌ Error fetching homepage data:', err);
      setError(err.message);

      // Fallback to default values to maintain Figma design
      setHomeSettings({
        event_title: "EVENT TITLE",
        artist_name: "Artist Name",
        event_address: "101 Address Drive, Asbury Park, NJ",
        event_image: null,
        tickets_url: null,
        instagram_url: null,
        tiktok_url: null,
        twitter_url: null,
        email_url: null
      });
      setFeaturedEvents([]);
      setFormattedDate("March 29th, 9:00 P.M.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Performance monitoring
    const startTime = performance.now();

    fetchHomepageData().finally(() => {
      const endTime = performance.now();
      console.log(`🚀 Homepage data loaded in ${(endTime - startTime).toFixed(2)}ms`);
    });
  }, [fetchHomepageData]);

  // Preload critical above-the-fold images for instant loading (Desktop)
  useEffect(() => {
    if (featuredEvents && featuredEvents.length > 0) {
      console.log('🚀 Preloading critical desktop event images for instant display...');

      // Preload first 4 event images (above-the-fold on desktop)
      featuredEvents.slice(0, 4).forEach((event, index) => {
        if (event.coverImage) {
          // Preload AVIF version for modern browsers
          const avifLink = document.createElement('link');
          avifLink.rel = 'preload';
          avifLink.as = 'image';
          avifLink.type = 'image/avif';
          avifLink.href = `/images/proxy-optimized?url=${encodeURIComponent(event.coverImage)}&w=111&format=avif`;
          document.head.appendChild(avifLink);

          // Preload WebP fallback
          const webpLink = document.createElement('link');
          webpLink.rel = 'preload';
          webpLink.as = 'image';
          webpLink.type = 'image/webp';
          webpLink.href = getOptimizedImageUrl(event.coverImage, 111);
          document.head.appendChild(webpLink);

          console.log(`✅ Preloaded desktop event image ${index + 1}: ${event.title}`);
        }
      });
    }
  }, [featuredEvents]);

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

  // Start resend countdown timer - MOVED HERE to fix initialization order
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
  }, [showVerification, verificationPhone]); // FIXED: Removed startResendCountdown to break circular dependency

  const validatePhoneNumber = useCallback((phone) => {
    // Basic phone number validation (US format)
    const phoneRegex = /^[\+]?[1]?[\s\-\.]?[\(]?[0-9]{3}[\)]?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }, []);

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
          setPhoneInputState('valid');
          setVerificationPhone(trimmedPhone);

          // Smooth transition to verification UI
          setTimeout(() => {
            setShowVerification(true);
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
        setVerificationState('valid');
        setPhoneInputState('valid');
        setPhoneSubmitted(true);

        // Reset to initial state after success
        setTimeout(() => {
          setShowVerification(false);
          setVerificationCode('');
          setVerificationPhone('');
          setPhoneNumber('');
          setPhoneSubmitted(false);
          setPhoneInputState('normal');
          setVerificationState('normal');
          // Reset resend countdown
          setResendCountdown(0);
          setCanResend(false);
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
            resendTimerRef.current = null;
          }
        }, 3000);
        return;
      }
    }

    // Validate code format (4 digits)
    if (!/^\d{4}$/.test(trimmedCode)) {
      console.warn('Invalid verification code format');

      // Show invalid state with shake animation
      setVerificationState('invalid');
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
        setPhoneInputState('valid');
        setPhoneSubmitted(true);

        // Reset to initial state after success
        setTimeout(() => {
          setShowVerification(false);
          setVerificationCode('');
          setVerificationPhone('');
          setPhoneNumber('');
          setPhoneSubmitted(false);
          setPhoneInputState('normal');
          setVerificationState('normal');
          // Reset resend countdown
          setResendCountdown(0);
          setCanResend(false);
          if (resendTimerRef.current) {
            clearInterval(resendTimerRef.current);
            resendTimerRef.current = null;
          }
        }, 3000);
      } else {
        console.error('❌ Phone verification failed:', result.error || 'Unknown error');

        // Show error state with shake animation
        setVerificationState('invalid');
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
      console.error('❌ Error submitting verification code:', error);

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
      setVerificationSubmitting(false);
    }
  }, [verificationCode, verificationSubmitting, verificationPhone]);



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
  }, [canResend, resendSubmitting, verificationPhone]); // FIXED: Removed startResendCountdown to break circular dependency

  // Button press animation handlers
  const handleButtonMouseDown = useCallback(() => {
    setIsButtonPressed(true);
  }, []);

  const handleButtonMouseUp = useCallback(() => {
    setIsButtonPressed(false);
  }, []);

  const handleButtonMouseLeave = useCallback(() => {
    setIsButtonPressed(false);
  }, []);

  // Verification code input handler
  const handleVerificationCodeChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 4) {
      setVerificationCode(value);

      // Update verification state based on code length
      if (value.length === 4) {
        setVerificationState('filled');
      } else {
        setVerificationState('normal');
      }
    }
  }, []);

  // Back to phone input handler
  const handleBackToPhone = useCallback(() => {
    setShowVerification(false);
    setVerificationCode('');
    setVerificationPhone('');
    setPhoneInputState('normal');
  }, []);

  // Robust phone number formatting handler with proper cursor management
  const handlePhoneChange = useCallback((e) => {
    const input = e.target;
    const rawValue = input.value;

    // Sanitize input to prevent XSS attacks
    const sanitizedValue = sanitizeUserInput(rawValue);
    const currentCountry = getCurrentCountry(selectedCountryId);

    // Store cursor position before any changes
    const cursorStart = input.selectionStart;
    const cursorEnd = input.selectionEnd;

    // Extract only digits from the sanitized input
    const digitsOnly = sanitizedValue.replace(/[^\d]/g, '');

    // Prevent typing beyond country's digit limit
    if (digitsOnly.length > currentCountry.digitLength) {
      // Don't update if trying to exceed limit
      e.preventDefault();
      return;
    }

    // Format the digits according to country pattern
    const formattedValue = formatPhoneNumber(digitsOnly, selectedCountryId);

    // Calculate where cursor should be after formatting
    let newCursorPosition = cursorStart;

    // If we're adding characters, move cursor forward appropriately
    if (formattedValue.length > phoneNumber.length) {
      // Count non-digit characters before cursor in old value
      const oldNonDigitsBefore = phoneNumber.slice(0, cursorStart).replace(/\d/g, '').length;
      // Count non-digit characters before cursor in new value
      const newNonDigitsBefore = formattedValue.slice(0, cursorStart + (formattedValue.length - phoneNumber.length)).replace(/\d/g, '').length;

      // Adjust cursor position based on formatting character changes
      newCursorPosition = cursorStart + (newNonDigitsBefore - oldNonDigitsBefore);
    }

    // Ensure cursor doesn't go beyond the formatted value length
    newCursorPosition = Math.min(newCursorPosition, formattedValue.length);
    newCursorPosition = Math.max(newCursorPosition, 0);

    // Update the state
    setPhoneNumber(formattedValue);

    // Set cursor position after React updates the DOM
    requestAnimationFrame(() => {
      if (input === document.activeElement) {
        input.setSelectionRange(newCursorPosition, newCursorPosition);
      }
    });
  }, [selectedCountryId, phoneNumber]);

  // Simplified backspace handling to avoid cursor jumping
  const handlePhoneKeyDown = useCallback((e) => {
    if (e.key === 'Backspace') {
      const input = e.target;
      const cursorPosition = input.selectionStart;
      const value = input.value;

      // Only handle special cases, let normal backspace work for most cases
      if (cursorPosition > 0) {
        const charBefore = value[cursorPosition - 1];

        // If backspacing over a formatting character, remove the digit before it instead
        if ([' ', '(', ')', '-'].includes(charBefore) && cursorPosition > 1) {
          e.preventDefault();

          // Remove the digit before the formatting character
          const beforeFormat = value.slice(0, cursorPosition - 2);
          const afterCursor = value.slice(cursorPosition);
          const newValue = beforeFormat + afterCursor;

          // Reformat and update
          const digitsOnly = newValue.replace(/[^\d]/g, '');
          const formattedValue = formatPhoneNumber(digitsOnly, selectedCountryId);
          setPhoneNumber(formattedValue);

          // Position cursor appropriately
          requestAnimationFrame(() => {
            if (input === document.activeElement) {
              const newPos = Math.max(0, cursorPosition - 2);
              input.setSelectionRange(newPos, newPos);
            }
          });
        }
      }
    }
  }, [selectedCountryId]);

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

  // Navigation handler with modern transitions
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
    } else if (tabName === 'Contact') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/contact');
      } else {
        window.location.href = '/contact';
      }
    }
    // Events tab stays on current page (homepage)
  }, []);

  // Get navigation pill styles based on active state
  const getNavPillStyles = useCallback((tabName, leftPosition) => {
    const isActive = activeNavTab === tabName;
    return {
      position: 'absolute',
      left: leftPosition,
      top: '4.15px',    // Scaled up by 15% (3.61 × 1.15)
      display: 'flex',
      width: '82.54px', // Scaled up by 15% (71.77 × 1.15)
      height: '30.81px', // Scaled up by 15% (26.79 × 1.15)
      padding: '13px 12px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      borderRadius: '10px',
      background: isActive ? '#000' : 'transparent',
      boxShadow: isActive ? '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' : 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease', // Smooth animation
      transform: isActive ? 'scale(1)' : 'scale(0.95)', // Subtle scale effect
      opacity: isActive ? 1 : 0.8
    };
  }, [activeNavTab]);

  // Get navigation text styles based on active state
  const getNavTextStyles = useCallback((tabName) => {
    const isActive = activeNavTab === tabName;
    return {
      color: '#FFF',
      fontFamily: 'Inter',
      fontSize: '12px',
      fontWeight: isActive ? '300' : '400',
      lineHeight: 'normal',
      transition: 'font-weight 0.3s ease' // Smooth font weight transition
    };
  }, [activeNavTab]);

  // Memoized event cards processing for performance
  const processedEventCards = useMemo(() => {
    const featuredCards = [];

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

        // Process location to show only venue name and city (truncate long addresses)
        let location = 'Venue Address';
        if (event.event_address) {
          const addressParts = event.event_address.split(',').map(part => part.trim());
          if (addressParts.length >= 2) {
            // Show first part (venue/street) and second part (city)
            location = `${addressParts[0]}, ${addressParts[1]}`;
            // If too long, just show city and state
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
          eventData: event // Store original event data for debugging
        });
      } catch (error) {
        console.warn(`Error processing featured event ${event.id}:`, error);
        // Skip this event if processing fails
      }
    });

    console.log(`🎯 Rendering ${featuredCards.length} featured event cards (no placeholders)`);
    return featuredCards;
  }, [featuredEvents]);

  // Show loading state while maintaining Figma layout
  if (loading) {
    return (
      <div className="homepage-root">
        <div className="homepage-content">
          <div
            className="desktop-container"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh'
            }}
          >
            <div style={{
              color: '#FFF',
              fontSize: '18px',
              fontFamily: 'Inter',
              textAlign: 'center'
            }}>
              <div>Loading homepage data...</div>
              {error && (
                <div style={{
                  color: '#FF6B6B',
                  fontSize: '14px',
                  marginTop: '10px',
                  opacity: 0.8
                }}>
                  {error}
                  <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.7 }}>
                    Falling back to default content...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error boundary fallback
  if (error && !homeSettings) {
    console.warn('🚨 Critical error, using fallback UI');
    // Continue with fallback data that was set in catch block
  }

  return (
    <div className="homepage-root">
      <div className="homepage-content">
        <div
          className="desktop-container"
          style={{
            width: '100%',
            maxWidth: `${scaledDimensions.containerWidth}px`,
            margin: '0 auto',
            position: 'relative',
            background: '#000000',
            minHeight: '100vh',
            padding: '0 16px',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ width: '100%', position: 'relative' }}>
      {/* Frame 12 - Navigation */}
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          width: '100%',
          height: '48px',
          alignItems: 'center',
          margin: '35px 0 0 0'
        }}
      >
        {/* Group 4 - B2B Logo Nav */}
        <img
          src="/images/figma-exact/b2b-logo-nav.svg"
          alt="B2B Logo"
          loading="lazy"
          decoding="async"
          fetchpriority="high"
          style={{
            width: '138.41px',
            height: '43px'
          }}
        />

        {/* Group 5 - Navigation Pills */}
        <div
          style={{
            position: 'relative',
            width: '260.46px', // Scaled up by 15% (226.49 × 1.15)
            height: '39.1px',  // Scaled up by 15% (34 × 1.15)
            gridColumn: '3',  // Place in third column (right side)
            justifySelf: 'end'  // Align to right edge of grid cell
          }}
        >
          {/* Background pill container */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: '260.46px', // Scaled up by 15% (226.49 × 1.15)
              height: '39.1px',  // Scaled up by 15% (34 × 1.15)
              background: '#232323',
              borderRadius: '12px',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}
          />

          {/* Events - Scaled up by 15% (3.24 × 1.15) */}
          <div
            style={getNavPillStyles('Events', '3.73px')}
            onClick={() => handleNavClick('Events')}
          >
            <span style={getNavTextStyles('Events')}>
              Events
            </span>
          </div>

          {/* About - Scaled up by 15% (77.03 × 1.15) */}
          <div
            style={getNavPillStyles('About', '88.58px')}
            onClick={() => handleNavClick('About')}
          >
            <span style={getNavTextStyles('About')}>
              About
            </span>
          </div>

          {/* Contact - Scaled up by 15% (150.82 × 1.15) */}
          <div
            style={getNavPillStyles('Contact', '173.44px')}
            onClick={() => handleNavClick('Contact')}
          >
            <span style={getNavTextStyles('Contact')}>
              Contact
            </span>
          </div>
        </div>
      </div>

      {/* Dual Hero Section */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '20px 0 0 0',
          padding: '0',
          flexDirection: 'row'
        }}
      >
        {/* Left Hero */}
        <div
          onClick={() => handleNavClick('Events')}
          style={{
            width: `${scaledDimensions.heroWidth}px`,
            height: `${scaledDimensions.heroHeight}px`,
            position: 'relative',
            flexShrink: 0,
            margin: '0',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)',
            borderRadius: '24px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.015) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0px)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.995) translateY(0px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.015) translateY(-2px)';
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: `${scaledDimensions.heroWidth}px`,
              height: `${scaledDimensions.heroHeight}px`,
              borderRadius: '24px',
              overflow: 'hidden'
            }}
          >
            <picture>
              <source
                srcSet="/images/optimized/hero-left-image-299w.webp 299w, /images/optimized/hero-left-image-598w.webp 598w, /images/optimized/hero-left-image-897w.webp 897w"
                sizes="299px"
                type="image/webp"
              />
              <source
                srcSet="/images/optimized/hero-left-image.avif"
                type="image/avif"
              />
              <img
                src="/images/optimized/hero-left-image-299w.webp"
                alt="Hero background"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                onLoad={() => console.log('✅ DESKTOP HERO IMAGE LOADED SUCCESSFULLY (WebP Optimized)')}
                onError={(e) => console.error('❌ DESKTOP HERO IMAGE FAILED TO LOAD:', e.target.src)}
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

          {/* Bottom overlay with date and location */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: `${scaledDimensions.heroHeight - 47}px`,
              display: 'flex',
              width: `${scaledDimensions.heroWidth}px`,
              justifyContent: 'space-between',
              padding: '0px 12px',
              gap: '16px',
              boxSizing: 'border-box'
            }}
          >
            <div
              style={{
                display: 'flex',
                width: `${Math.min(157, scaledDimensions.heroWidth - 100)}px`,
                height: '36px',
                padding: '4px 0px',
                flexDirection: 'column',
                gap: '2px',
                minWidth: 0
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
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8" stroke="#FFF" strokeWidth="1"/>
                </svg>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: `${Math.max(8, Math.min(10, scaledDimensions.heroWidth * 0.04))}px`,  // Responsive font size
                    fontWeight: '200',
                    lineHeight: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  {formattedDate}
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
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" stroke="#FFF" strokeWidth="1"/>
                  <circle cx="5" cy="4" r="1" fill="#FFF"/>
                </svg>
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: `${Math.max(8, Math.min(10, scaledDimensions.heroWidth * 0.04))}px`,  // Responsive font size
                    fontWeight: '200',
                    lineHeight: 'normal',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0
                  }}
                >
                  {formatLocation(mostRecentEvent?.event_address || homeSettings?.event_address)}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            {scaledDimensions.heroWidth >= 250 && (
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
                  onClick={() => handleNavClick('Events')}
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
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.background = 'rgba(76, 76, 76, 0.90)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = 'rgba(56, 56, 56, 0.80)';
                  }}
                  onMouseDown={(e) => {
                    e.target.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                >
                  <span
                    style={{
                      color: '#FFF',
                      fontFamily: 'Inter',
                      fontSize: `${Math.max(10, Math.min(14, scaledDimensions.heroWidth * 0.056))}px`,
                      fontWeight: '400',
                      lineHeight: 'normal',
                      pointerEvents: 'none' // Prevent text from interfering with button events
                    }}
                  >
                    Events
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Event title overlay */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: `${scaledDimensions.heroHeight - 95}px`, // Position 95px from bottom (47px for bottom overlay + 48px for title space)
              display: 'flex',
              width: `${scaledDimensions.heroWidth}px`,
              height: '48px', // Fixed height for consistent spacing
              padding: '8px 12px',
              justifyContent: 'flex-start',
              alignItems: 'flex-end', // Align to bottom so text sits closer to date/location
              gap: '10px',
              boxSizing: 'border-box'
            }}
          >
            <div
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: `${Math.max(14, Math.min(24, scaledDimensions.heroWidth * 0.08))}px`,
                fontWeight: '800',
                lineHeight: '1.1',
                flex: '1',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: `${scaledDimensions.heroWidth - 24}px`
              }}
            >
              {mostRecentEvent?.artist_name || mostRecentEvent?.title || homeSettings?.event_title || "EVENT TITLE"}
            </div>
          </div>
        </div>

        {/* Right Hero */}
        <div
          onClick={() => window.open('https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx', '_blank')}
          style={{
            width: `${scaledDimensions.rightHeroWidth}px`,
            height: `${scaledDimensions.rightHeroHeight}px`,
            position: 'relative',
            flexShrink: 0,
            margin: '0',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)',
            borderRadius: '24px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.015) translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1) translateY(0px)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.995) translateY(0px)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.015) translateY(-2px)';
          }}
        >
          {/* Video background container */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: `${scaledDimensions.rightHeroWidth}px`,
              height: `${scaledDimensions.rightHeroHeight}px`,
              borderRadius: '24px',
              overflow: 'hidden'
            }}
          >
            {/* YouTube iframe wrapper with aspect ratio preservation */}
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
              {/* YouTube Video - Autoplay on load (muted for policy compliance) */}
              <iframe
                src="https://www.youtube.com/embed/vEHTO3gf1jk?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=vEHTO3gf1jk&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&quality=hd720&start=0&enablejsapi=1"
                title="Henry Fong YouTube Video"
                allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture"
                allowFullScreen
                loading="eager"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '100%',
                  transform: 'translate(-50%, -50%) scale(1.5)',
                  border: 'none',
                  pointerEvents: 'none',
                  opacity: 1
                }}
              />
            </div>

            {/* Gradient overlay to match original design */}
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)',
                borderRadius: '24px',
                zIndex: 1 // Ensure overlay is above video but below text
              }}
            />
          </div>

          {/* Video Hero Text Box */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: `${Math.min(scaledDimensions.rightHeroHeight, 350) - 54}px`,
              display: 'flex',
              width: '100%', // Fill the full width of the video hero card
              height: '44px',
              padding: '8px 16px',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
              zIndex: 2 // Ensure text appears above video and gradient overlay
            }}
          >
            {/* Left - Date and title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                gap: '4px',
                flex: '1'
              }}
            >
              <div
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '24px',
                  fontWeight: '800',
                  lineHeight: '1.1',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: `${scaledDimensions.rightHeroWidth >= 300 ? scaledDimensions.rightHeroWidth - 150 : scaledDimensions.rightHeroWidth - 60}px`
                }}
              >
                Watch on YouTube
              </div>

              {/* Date */}
              <div
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: '200',
                  lineHeight: 'normal'
                }}
              >
                Henry Fong full set live on YouTube
              </div>
            </div>

            {/* Right - CTA */}
            {scaledDimensions.rightHeroWidth >= 300 && (
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  window.open('https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx', '_blank');
                }}
                style={{
                  display: 'flex',
                  minWidth: '112px', // Proper width for "Watch now" text with breathing room
                  height: '44px',    // Minimum touch target height (44px)
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '22px', // Half of height for pill shape
                  background: 'rgba(38, 38, 38, 0.80)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  boxSizing: 'border-box' // Ensure padding is included in dimensions
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.background = 'rgba(76, 76, 76, 0.90)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.background = 'rgba(38, 38, 38, 0.80)';
                }}
                onMouseDown={(e) => {
                  e.target.style.transform = 'scale(0.95)';
                }}
                onMouseUp={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
              >
                <span
                  style={{
                    color: '#FFF',
                    fontFamily: 'Inter',
                    fontSize: '14px', // Fixed 14px for better readability in larger button
                    fontWeight: '500', // Medium weight for better button text
                    lineHeight: '1.2',
                    pointerEvents: 'none' // Prevent text from interfering with button events
                  }}
                >
                  Watch now
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Frame 13 - Title Section */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          margin: '16px 0 0 0',
          padding: '0'
        }}
      >
        {/* Event Title */}
        <div
          style={{
            width: '504px',
            color: '#FFF',
            fontFamily: 'Inter',
            fontSize: '24px',
            fontWeight: '800',
            lineHeight: 'normal'
          }}
        >
          Events
        </div>
      </div>


      


      
      {/* Events and Text Us Section */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          margin: '8px 0 0 0',
          padding: '0',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: `${scaledDimensions.eventsTextGap}px`,
          flexDirection: isMobile ? 'column' : 'row'
        }}
      >
        {/* Event List */}
        <div
          style={{
            display: 'flex',
            width: `${scaledDimensions.eventsWidth}px`,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            gap: '21px',
            flexShrink: 0
          }}
        >
          {/* EVENT LIST Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              rowGap: '12px',
              columnGap: '8px',
              alignSelf: 'stretch',
              alignItems: 'start',
              justifyItems: 'start'  // Justify event cards to the left within grid
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
                    opacity: '0.8'
                  }}
                >
                  No Featured Events
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    opacity: '0.6',
                    maxWidth: '300px',
                    lineHeight: '1.4'
                  }}
                >
                  Events marked as "Show on Homepage" will appear here. Check the admin dashboard to feature events.
                </div>
              </div>
            ) : (
              /* EventCard_small instances - Dynamic data from featured events only */
              processedEventCards.map((card, index) => (
              <div
                key={card.id}
                onClick={(e) => {
                  // Only trigger if clicking on the card itself, not child elements
                  if (e.target === e.currentTarget || e.target.closest('.card-clickable-area')) {
                    if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                      window.open(card.ticketsUrl, '_blank');
                    }
                  }
                }}
                style={{
                  display: 'flex',
                  width: '220px',
                  height: '85px',
                  justifyContent: 'flex-start',  // Justify content to the left
                  alignItems: 'center',
                  borderRadius: '16px',
                  background: '#232323',
                  position: 'relative',
                  margin: '0',
                  padding: '0',
                  cursor: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#' ? 'pointer' : 'default',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Group 1 - Complete Event Card Content */}
                <div
                  style={{
                    width: '220px',
                    height: '85px',
                    position: 'relative'
                  }}
                >
                  {/* Frame 6 - Image Section */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '84px',
                      height: '84px',
                      left: '0px',
                      top: '1px'
                    }}
                  >
                    {/* Rectangle 2 - Event Background Image - Progressive Loading with AVIF/WebP/JPEG */}
                    <picture>
                      <source
                        srcSet={getAVIFSrcSet(card.coverImage, 'event')}
                        sizes="111px"
                        type="image/avif"
                      />
                      <source
                        srcSet={getResponsiveSrcSet(card.coverImage, 'event')}
                        sizes="111px"
                        type="image/webp"
                      />
                      <img
                        src={getOptimizedImageUrl(card.coverImage, 111)}
                        alt={`${card.title} event cover`}
                        {...getImageLoadingStrategy(index, false)}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent interference with card interactions
                          if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                            window.open(card.ticketsUrl, '_blank');
                          }
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
                        onError={(e) => {
                          e.target.style.backgroundColor = 'lightgray';
                          e.target.style.display = 'block';
                        }}
                        style={{
                          position: 'absolute',
                          left: '3px',
                          top: '2px',
                          width: '79.04px',
                          height: '79.04px',
                          borderRadius: '14px',
                          objectFit: 'cover',
                          backgroundColor: 'lightgray',
                          cursor: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#' ? 'pointer' : 'default',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: 'scale(1) translateY(0px)',
                          boxShadow: 'none'
                        }}
                      />
                    </picture>

                    {/* Frame 7 - Date Badge Container */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '54px',
                        top: '5px',
                        width: '24px',
                        height: '24px'
                      }}
                    >
                      {/* Rectangle 1 - White Badge Background */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '0px',
                          top: '-1px',
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          background: '#FFF'
                        }}
                      />

                      {/* Date Badge Content */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '2px',
                          top: '2px',
                          display: 'flex',
                          width: '20px',
                          height: '18px',
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
                            fontSize: '10px',
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
                            fontSize: '6px',
                            fontWeight: '600',
                            lineHeight: 'normal'
                          }}
                        >
                          {card.month}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Frame 4 - Text Content Section */}
                  <div
                    className="card-clickable-area"
                    style={{
                      position: 'absolute',
                      left: '94px',
                      top: '0px',
                      display: 'flex',
                      width: '126px',  // Adjusted for 220px card width (220-94=126)
                      height: '85px',
                      padding: '3px 0px',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',  // Justify content to the left
                      gap: '12px',
                      cursor: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#' ? 'pointer' : 'default'
                    }}
                  >
                    {/* Frame 3 - Event Information */}
                    <div
                      style={{
                        display: 'flex',
                        height: '50px',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        gap: '1px',
                        justifyContent: 'space-between'
                      }}
                    >
                      {/* Event Title */}
                      <div
                        style={{
                          display: 'flex',
                          width: '150px',
                          height: '16px',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          color: '#FFF',
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          fontWeight: '600',
                          lineHeight: '1.0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {card.title}
                      </div>

                      {/* DATE Information Row */}
                      <div
                        onClick={() => {
                          // Create calendar event
                          const eventTitle = encodeURIComponent(card.title);
                          const eventLocation = encodeURIComponent(card.location);
                          const eventDate = card.date;

                          // Parse date string to create proper calendar format
                          // Assuming card.date format like "Thu @ Jul 03 10:00PM"
                          const now = new Date();
                          const currentYear = now.getFullYear();

                          // Extract date parts (this is a simplified parser)
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
                          display: 'flex',
                          height: '12px',
                          paddingLeft: '1px',
                          alignItems: 'center',
                          gap: '3px',
                          alignSelf: 'stretch',
                          cursor: 'pointer',
                          transition: 'opacity 0.2s ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                      >
                        {/* Calendar Icon SVG */}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 3h8v6H1V3zm2-2v1m4-1v1M1 5h8" stroke="#FFF" strokeWidth="1"/>
                        </svg>

                        {/* Date Text */}
                        <span
                          style={{
                            display: 'flex',
                            width: '140px',
                            height: '10px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '9px',
                            fontWeight: '100',
                            lineHeight: '1.0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {card.date}
                        </span>
                      </div>

                      {/* LOCATION Information Row */}
                      <div
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
                          display: 'flex',
                          height: '12px',
                          padding: '0px 1px',
                          marginTop: '2px',
                          alignItems: 'center',
                          gap: '3px',
                          alignSelf: 'stretch',
                          cursor: 'pointer',
                          transition: 'opacity 0.2s ease-in-out'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                        }}
                      >
                        {/* Location Icon SVG */}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M5 1a3 3 0 0 0-3 3c0 2 3 5 3 5s3-3 3-5a3 3 0 0 0-3-3z" stroke="#FFF" strokeWidth="1"/>
                          <circle cx="5" cy="4" r="1" fill="#FFF"/>
                        </svg>

                        {/* Location Text */}
                        <span
                          style={{
                            display: 'flex',
                            width: '140px',
                            height: '10px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '9px',
                            fontWeight: '100',
                            lineHeight: '1.0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {card.location}
                        </span>
                      </div>
                    </div>

                    {/* Frame 9 - Action Buttons Section */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '0px',
                        top: '45px', // Position to align button bottom with image bottom
                        display: 'flex',
                        width: '156px',
                        height: '36px',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end'
                      }}
                    >
                      {/* Get Tickets Button */}
                      <div
                        onClick={() => {
                          if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                            window.open(card.ticketsUrl, '_blank');
                          }
                        }}
                        style={{
                          display: 'flex',
                          width: '120px',
                          height: '20px',
                          padding: '8px 10px',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '6px',
                          borderRadius: '20px',
                          background: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                            ? 'rgba(23, 23, 23, 0.80)'
                            : 'rgba(23, 23, 23, 0.40)',
                          cursor: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                            ? 'pointer'
                            : 'default',
                          opacity: card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#'
                            ? 1
                            : 0.6,
                          transition: 'all 0.3s ease',
                          transform: 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                          if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.background = 'rgba(76, 76, 76, 0.90)'; // Lighter color similar to watch now button
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (card.isRealEvent && card.ticketsUrl && card.ticketsUrl !== '#') {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = 'rgba(23, 23, 23, 0.80)';
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
                            color: '#FFF',
                            fontFamily: 'Inter',
                            fontSize: '10px',
                            fontWeight: '300',
                            lineHeight: 'normal',
                            pointerEvents: 'none'
                          }}
                        >
                          Get Tickets
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>

        {/* Text Us Section */}
        <div
          style={{
            display: 'flex',
            width: `${scaledDimensions.textUsWidth}px`,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            gap: '8px',
            flexShrink: 0,
            paddingTop: '8px',
            paddingBottom: '8px'
          }}
        >
          {/* Text us Title */}
          <div
            style={{
              display: 'flex',
              height: '17px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'stretch',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: '800',
              lineHeight: 'normal',
              marginBottom: '0px'
            }}
          >
            Text us
          </div>

          {/* Subtext */}
          <div
            style={{
              display: 'flex',
              height: '11px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'stretch',
              color: '#FFF',
              fontFamily: 'Inter',
              fontSize: '10px',
              fontWeight: '300',
              lineHeight: 'normal',
              marginBottom: '0px'
            }}
          >
            Exclusive events, contests, and more
          </div>
          {/* Laylo Iframe - Official SDK Integration with Robust Loading */}
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
              border: 'none',
              borderRadius: '8px',
              background: 'transparent'
            }}
          />

          {/* Disclaimer Text - Removed, replaced by Laylo iframe */}
        </div>
      </div>

      {/* B2B LOGO - Bottom */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          margin: '32px auto 0 auto',
          padding: '0'
        }}
      >
        <img
          src="/images/figma-exact/b2b-logo-bottom.svg"
          alt="B2B LOGO"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          style={{
            width: '100%',
            maxWidth: '901px',
            height: 'auto',
            fill: '#101010',
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))'
          }}
        />
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(FigmaDesktop);
