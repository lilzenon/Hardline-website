import React, { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { usePerformantResize } from '../hooks/usePerformantResize';
import { sanitizeUserInput, sanitizeFormData, sanitizeUrl, sanitizeSearchQuery } from '../utils/sanitizer';
import { useAnalytics } from '../hooks/useAnalytics';
import { useHomepageData } from '../hooks/useHomepageData';
import { loadImageWithCircuitBreaker } from '../../lib/circuit-breaker';
import TextUsSection from './TextUsSection';
import SocialMediaButtons from './SocialMediaButtons';
import BrandedLoader from './BrandedLoader';

// CSS for custom scrollbar styling
const scrollbarStyles = `
  .events-grid-scrollable::-webkit-scrollbar {
    width: 4px;
  }
  .events-grid-scrollable::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  .events-grid-scrollable::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }
  .events-grid-scrollable::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;



// Image helpers inlined to avoid external dependency during build
const getOptimizedImageUrl = (originalUrl, width = null) => {
  if (!originalUrl) return originalUrl;

  // Handle new image system URLs (/api/images/serve/{uuid}) - PRESERVE EXISTING CACHE-BUSTING
  if (typeof originalUrl === 'string' && originalUrl.includes('/api/images/serve/')) {
    console.log('🔄 Processing new image system URL for desktop:', originalUrl);

    // 🚨 CRITICAL FIX: Preserve existing cache-busting parameters from useHomepageData
    // Extract existing query parameters to preserve cache-busting
    const urlParts = originalUrl.split('?');
    const baseUrl = urlParts[0];
    const existingParams = urlParts[1] || '';

    // Extract UUID and variant from the base URL
    const match = baseUrl.match(/\/api\/images\/serve\/([a-f0-9-]{36})(?:\/(\w+))?/);
    if (match) {
      const uuid = match[1];
      const existingVariant = match[2] || 'medium'; // Default to medium if no variant specified

      // Determine the best variant based on width request
      let variant = existingVariant;
      if (width) {
        if (width <= 150) variant = 'small';
        else if (width <= 400) variant = 'medium';
        else variant = 'large';
      }

      // Always use dashboard domain for image serving - with fallback for development
      const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';

      // 🚨 CRITICAL FIX: Build URL preserving existing cache-busting parameters
      let optimizedUrl = `${dashboardDomain}/api/images/serve/${uuid}/${variant}`;

      // Preserve existing cache-busting parameters from useHomepageData
      if (existingParams) {
        optimizedUrl = `${optimizedUrl}?${existingParams}`;
        console.log('✅ Preserved existing cache-busting parameters:', existingParams);
      } else {
        // Only add new cache-busting if none exists
        optimizedUrl = `${optimizedUrl}?_desktop=1&_t=${Date.now()}`;
        console.log('🖥️ Added new desktop cache-busting parameters');
      }

      console.log('✅ Generated desktop URL with preserved cache-busting:', optimizedUrl, `(variant: ${variant}, width: ${width})`);
      return optimizedUrl;
    }
  }

  if (typeof originalUrl === 'string' && originalUrl.includes('/images/figma-exact/')) {
    const filename = originalUrl.split('/').pop();
    return `/images/optimized/${filename}`;
  }
  if (typeof originalUrl === 'string' && originalUrl.startsWith('http')) {
    const encodedUrl = encodeURIComponent(originalUrl);
    // Use dashboard server for image optimization (publicly accessible) - with fallback for development
    const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
    const baseUrl = `${dashboardDomain}/images/proxy-optimized?url=${encodedUrl}`;
    return width ? `${baseUrl}&w=${width}` : baseUrl;
  }

  // Handle relative URLs that might be from the new system but without full path
  // FIXED: Also handle /api/images/serve/ URLs specifically by checking for them OR excluding regular /images/ paths
  if (typeof originalUrl === 'string' && originalUrl.startsWith('/') &&
      (originalUrl.includes('/api/images/serve/') || !originalUrl.includes('/images/'))) {
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

  // Handle user-uploaded images (custom/images directory or /images/ paths)
  if (typeof originalUrl === 'string' && (originalUrl.includes('/images/') || originalUrl.includes('/custom/images/'))) {
    const filename = originalUrl.split('/').pop();
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

    if (width) {
      // Try to serve optimized responsive variant first
      return `/images/optimized/${nameWithoutExt}-${width}w.webp`;
    } else {
      // Try optimized version, fallback handled by server
      return `/images/optimized/${nameWithoutExt}.webp`;
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

  // CRITICAL FIX: For internal API images, don't use proxy-optimized (causes request loops)
  // Instead, skip AVIF for internal images and let WebP handle it
  if (typeof originalUrl === 'string' && (
    originalUrl.includes('/api/images/serve/') ||
    originalUrl.includes('/api/settings/serve/') ||
    originalUrl.startsWith('/api/')
  )) {
    console.log('🚫 Skipping AVIF for internal API URL to prevent loop:', originalUrl);
    return ''; // Skip AVIF for internal API images to avoid request loops
  }

  // Only use proxy-optimized for external URLs
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
    if (card.isRealEvent && card.hasTicketLink) {
      console.log(`🎫 Desktop: Opening ticket link for ${card.title}:`, card.ticketsUrl);
      window.open(card.ticketsUrl, '_blank', 'noopener,noreferrer');
    }
  }, [card.isRealEvent, card.hasTicketLink, card.ticketsUrl, card.title]);

  const handleTicketClick = useCallback(() => {
    if (card.isRealEvent && card.hasTicketLink) {
      console.log(`🎫 Desktop: Opening ticket link for ${card.title}:`, card.ticketsUrl);
      window.open(card.ticketsUrl, '_blank', 'noopener,noreferrer');
    }
  }, [card.isRealEvent, card.hasTicketLink, card.ticketsUrl, card.title]);

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

  // Inject CSS for custom scrollbar styling
  useEffect(() => {
    const styleId = 'events-grid-scrollbar-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = scrollbarStyles;
      document.head.appendChild(style);
    }
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Initialize analytics
  const { trackEvent, trackLinkClick } = useAnalytics();

  // State for tracking scroll position and fade gradients
  const [scrollState, setScrollState] = useState({
    canScrollUp: false,
    canScrollDown: false,
    isScrollable: false
  });
  const gridScrollRef = useRef(null);

  // Function to update scroll state for fade gradients
  const updateScrollState = useCallback(() => {
    const element = gridScrollRef.current;
    if (!element) return;

    const { scrollTop, scrollHeight, clientHeight } = element;
    const isScrollable = scrollHeight > clientHeight;
    const canScrollUp = scrollTop > 0;
    const canScrollDown = scrollTop < scrollHeight - clientHeight - 1; // -1 for rounding

    setScrollState({
      canScrollUp,
      canScrollDown,
      isScrollable
    });
  }, []);

  // Update scroll state when content changes or on mount
  useEffect(() => {
    updateScrollState();
  }, [updateScrollState]);

  // Autoplay YouTube on load per requirements (keep muted for autoplay policy)
  const [shouldLoadYoutube, setShouldLoadYoutube] = useState(true);

  useEffect(() => {
    setShouldLoadYoutube(true);

    // Track desktop component load - IMPORTANT for understanding user experience
    trackEvent('component_load', {
      component: 'FigmaDesktop',
      viewport_type: 'desktop'
    });
  }, [trackEvent]);

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
  // Homepage data managed by useHomepageData hook
  const {
    loading,
    error,
    homeSettings,
    formattedDate,
    showAllEvents,
    setShowAllEvents,
    filteredFeaturedEvents,
    filteredHomepageEvents
  } = useHomepageData();
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

  // Event Filter Toggle State - now managed by useHomepageData hook
  const [scaledDimensions, setScaledDimensions] = useState({
    heroWidth: 299,
    heroHeight: 299,
    rightHeroWidth: 498,
    rightHeroHeight: 299,
    gap: 32,
    containerWidth: 1192, // REDUCED by 8px (1200px - 8px) for tighter layout alignment
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
    const baseContainerWidth = 1192; // REDUCED by 8px (1200px - 8px) for tighter layout alignment
    const containerPadding = 48; // Increased padding for larger container (24px on each side)
    const availableContainerWidth = baseContainerWidth - containerPadding; // 1144px (1192px - 48px)

    // Calculate scale factor to fit both hero sections and events/text sections
    const totalHeroWidth = baseHeroWidth + baseGap + baseRightHeroWidth; // 829px
    const baseEventsWidth = 380;  // Further reduced to make it more compact
    const baseTextUsWidth = 380;  // Match Events section base width exactly
    const baseEventsTextGap = 40;  // Reduced gap slightly
    const totalEventsTextWidth = baseEventsWidth + baseEventsTextGap + baseTextUsWidth; // 800px

    // Use the more restrictive constraint to ensure both sections fit
    const maxRequiredWidth = Math.max(totalHeroWidth, totalEventsTextWidth); // 829px
    let scale = Math.min(availableWidth / maxRequiredWidth, availableContainerWidth / maxRequiredWidth);

    // Apply constraints - updated for modern desktop screens
    if (scale < 0.25) scale = 0.25;  // Minimum for small screens
    if (scale > 1.8) scale = 1.8;    // INCREASED maximum scale from 1.25 to 1.8 for better large screen utilization

    const scaledDimensions = {
      heroWidth: Math.round(baseHeroWidth * scale * 0.90), // Reduce hero size by 10% to align with smaller events section
      heroHeight: Math.round(baseHeroHeight * scale * 0.90), // Reduce hero size by 10% to align with smaller events section
      rightHeroWidth: Math.round(baseRightHeroWidth * scale),
      rightHeroHeight: Math.round(baseRightHeroHeight * scale),
      gap: Math.round(baseGap * scale),
      // Container width stays fixed for alignment
      containerWidth: baseContainerWidth,  // Now 1192px for tighter layout alignment
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
    console.log(`🎯 Responsive scaling: ${scale.toFixed(3)} for viewport ${currentViewportWidth}px (max 1.8x, container: 1200px)`, scaledDimensions);
  });

  // MEMORY OPTIMIZATION: Lazy load Laylo SDK with error handling - RESTORED ORIGINAL IMPLEMENTATION
  useEffect(() => {
    // Load Laylo SDK script only once with proper error handling
    if (!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')) {
      const layloScript = document.createElement('script');
      layloScript.src = 'https://embed.laylo.com/laylo-sdk.js';
      layloScript.async = true;
      layloScript.defer = true; // Defer to prevent blocking

      // Add error handling to prevent crashes
      layloScript.onerror = (error) => {
        console.warn('⚠️ Laylo SDK failed to load:', error);
        // Don't let this crash the app
      };

      layloScript.onload = () => {
        console.log('✅ Laylo SDK script loaded successfully');
      };

      document.head.appendChild(layloScript);
    }
  }, []);



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

  // Data fetching now handled by useHomepageData hook

  // Data fetching and performance monitoring now handled by useHomepageData hook

  // Preload critical above-the-fold images for instant loading (Desktop)


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

      // Use the new homepage phone submission endpoint - with fallback for development
      const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
      const response = await fetch(`${dashboardDomain}/api/home-settings/submit-phone`, {
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

      const dashboardDomain = window.location.hostname === 'localhost' ? 'https://admin.b2b.click' : 'https://admin.b2b.click';
      const response = await fetch(`${dashboardDomain}/api/home-settings/verify-phone`, {
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

      const dashboardDomain = window.location.hostname === 'localhost' ? 'https://admin.b2b.click' : 'https://admin.b2b.click';
      const response = await fetch(`${dashboardDomain}/api/home-settings/resend-verification`, {
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
    } else if (tabName === 'FAQ') {
      if (window.navigateWithTransition) {
        window.navigateWithTransition('/faq');
      } else {
        window.location.href = '/faq';
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

  // Get navigation text styles based on active state
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

  // Event cards processing now handled by useHomepageData hook
  // Using filteredFeaturedEvents and filteredHomepageEvents directly





  // Preload critical desktop event images for instant display
  useEffect(() => {
    if (filteredFeaturedEvents && filteredFeaturedEvents.length > 0) {
      console.log('🚀 Preloading critical desktop featured event images for instant display...');

      // Preload featured event images first
      filteredFeaturedEvents.forEach((card, index) => {
        if (card.coverImage) {
          // Skip AVIF preload for internal API images to avoid CORS issues
          if (!card.coverImage.includes('/api/images/serve/')) {
            // Preload AVIF version for modern browsers (external images only)
            const avifLink = document.createElement('link');
            avifLink.rel = 'preload';
            avifLink.as = 'image';
            avifLink.type = 'image/avif';
            const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
            avifLink.href = `${dashboardDomain}/images/proxy-optimized?url=${encodeURIComponent(card.coverImage)}&w=111&format=avif`;
            document.head.appendChild(avifLink);
          }

          // Preload WebP fallback (skip internal /api images to avoid any desktop-only interference)
          if (!card.coverImage.includes('/api/images/serve/')) {
            const webpLink = document.createElement('link');
            webpLink.rel = 'preload';
            webpLink.as = 'image';
            webpLink.type = 'image/webp';
            webpLink.href = getOptimizedImageUrl(card.coverImage, 111);
            document.head.appendChild(webpLink);
          }

          console.log(`✅ Preloaded desktop featured event image ${index + 1}: ${card.title}`);
        }
      });

      // Also preload first 4 regular event images (above-the-fold on desktop)
      if (filteredHomepageEvents && filteredHomepageEvents.length > 0) {
        filteredHomepageEvents.slice(0, 4).forEach((card, index) => {
          if (card.coverImage) {
            const img = new Image();
            img.src = getOptimizedImageUrl(card.coverImage, 400);
            img.onload = () => console.log(`✅ Preloaded desktop regular event image ${index + 1}:`, card.title);
            img.onerror = () => console.warn(`❌ Failed to preload desktop regular event image ${index + 1}:`, card.title);
          }
        });
      }
    }
  }, [filteredFeaturedEvents, filteredHomepageEvents]);

  // Get the most recent event for hero sections
  const mostRecentEvent = useMemo(() => {
    return filteredFeaturedEvents && filteredFeaturedEvents.length > 0 ? filteredFeaturedEvents[0] : null;
  }, [filteredFeaturedEvents]);

  // Show smooth branded loading state
  if (loading) {
    return (
      <BrandedLoader
        fullScreen={true}
        minDisplayTime={600}
        showMessage={false}
      />
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
            padding: '0 20px', // INCREASED from 16px to 20px (adding 4px on each side for tighter layout)
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
        {/* Group 4 - B2B Logo Nav - CLICKABLE - INCREASED SIZE */}
        <img
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          src="/images/figma-exact/b2b-logo-nav.svg"
          alt="B2B Logo"
          loading="lazy"
          decoding="async"
          fetchpriority="high"
          onClick={() => {
            if (window.navigateWithTransition) {
              window.navigateWithTransition('/');
            } else {
              window.location.href = '/';
            }
          }}
          style={{
            width: '180px', // Increased from 138.41px for better desktop prominence
            height: '56px', // Increased from 43px proportionally
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.filter = 'brightness(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.filter = 'brightness(1)';
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
        />

        {/* Group 5 - Navigation Pills */}
        <div
          style={{
            position: 'relative',
            width: '294.45px', // Scaled up by 30% (226.49 × 1.30) for better prominence
            height: '44.2px',  // Scaled up by 30% (34 × 1.30) for better touch targets
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
      </div>

      {/* Desktop Layout: Hero Left + Events Right (1024px+) */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          margin: '24px 0 0 0', // Reduced from 32px to 24px for better visual flow
          padding: '0',
          flexDirection: scaledDimensions.containerWidth >= 1024 ? 'row' : 'column',
          gap: scaledDimensions.containerWidth >= 1024 ? `${Math.max(24, Math.round(scaledDimensions.scale * 32))}px` : '20px', // Scale gap for desktop
          alignItems: 'flex-start'
        }}
      >
        {/* Mobile/Tablet Layout - Original Hero Image (hidden on desktop) */}
        {scaledDimensions.containerWidth < 1024 && (
          <div
            onClick={(e) => {
              // Navigate directly to ticket purchase page in new tab
              if (mostRecentEvent?.external_ticket_url) {
                console.log(`🎫 Mobile Featured Event: Opening ticket link for ${mostRecentEvent.title}:`, mostRecentEvent.external_ticket_url);
                window.open(mostRecentEvent.external_ticket_url, '_blank', 'noopener,noreferrer'); // Open in new tab for better UX
              } else {
                console.log('🎫 Mobile Featured Event: No ticket link available for', mostRecentEvent?.title);
              }
            }}
            style={{
              width: '100%',
              height: `${scaledDimensions.heroHeight}px`,
              position: 'relative',
              flexShrink: 0,
              margin: '0',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: 'scale(1)',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#161616',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.005)';
              e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)';
            }}
          >
            {/* Mobile Hero Content - Same as desktop hero content but without Up Next title */}
            {/* Add mobile hero content here if needed */}
          </div>
        )}

        {/* Right Side - Events Section (Desktop 1024px+) */}
        {scaledDimensions.containerWidth >= 1024 && (
          <div
            style={{
              display: 'flex',
              flex: '1',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              gap: `${Math.max(6, Math.round(scaledDimensions.scale * 8))}px`, // Responsive gap
              width: '100%',
              minWidth: '100%',
              maxWidth: '100%',
              height: 'auto',
              overflow: 'visible'
            }}
          >
            {/* Events Title and Toggle - Aligned with Hero Top */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: '0', // Remove margin to align with hero top
                padding: '0'
              }}
            >
              {/* Event Title - Scaled down to match Up Next Title */}
              <div
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: `${Math.max(20, Math.round(scaledDimensions.scale * 26))}px`, // Reduced to match Up Next title
                  fontWeight: '800',
                  lineHeight: 'normal',
                  height: `${Math.max(20, Math.round(scaledDimensions.scale * 26))}px`, // Explicit height to match Up Next title
                  display: 'flex',
                  alignItems: 'center' // Center text vertically within the height
                }}
              >
                Events
              </div>
              {/* Event Filter Toggle - Responsive */}
              <div
                style={{
                  display: 'flex',
                  width: `${Math.max(75, Math.round(scaledDimensions.scale * 95))}px`, // Reduced from 118px to 95px for smaller size
                  height: `${Math.max(22, Math.round(scaledDimensions.scale * 28))}px`, // Reduced from 34px to 28px for smaller size
                  padding: `${Math.max(1, Math.round(scaledDimensions.scale * 1.5))}px`, // Slightly reduced padding
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexShrink: 0,
                  borderRadius: `${Math.max(6, Math.round(scaledDimensions.scale * 8))}px`, // Slightly reduced border radius
                  background: showAllEvents ? 'rgba(111, 111, 111, 0.49)' : 'rgba(111, 111, 111, 0.69)',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  WebkitTapHighlightColor: 'transparent'
                }}
                onClick={() => setShowAllEvents(!showAllEvents)}
                role="switch"
                aria-checked={showAllEvents}
                aria-label={`Switch to ${showAllEvents ? 'Past' : 'Next'} events`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowAllEvents(!showAllEvents);
                  }
                }}
              >
                {/* Sliding Button Background - Responsive */}
                <div
                  style={{
                    position: 'absolute',
                    width: `${Math.max(36, Math.round(scaledDimensions.scale * 46))}px`, // Reduced from 57px to 46px
                    height: `${Math.max(19, Math.round(scaledDimensions.scale * 24))}px`, // Reduced from 30px to 24px
                    borderRadius: `${Math.max(4, Math.round(scaledDimensions.scale * 6))}px`, // Reduced border radius
                    border: '0.5px solid rgba(0, 0, 0, 0.04)',
                    background: '#FFF',
                    boxShadow: '0 3px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 1px 0 rgba(0, 0, 0, 0.04)',
                    left: showAllEvents ? `${Math.max(1, Math.round(scaledDimensions.scale * 1.5))}px` : `${Math.max(37, Math.round(scaledDimensions.scale * 47))}px`, // Adjusted positions for smaller size
                    top: `${Math.max(1, Math.round(scaledDimensions.scale * 1.5))}px`, // Adjusted top position
                    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 1
                  }}
                />

                {/* All Button - Responsive */}
                <div
                  style={{
                    display: 'flex',
                    padding: `${Math.max(2, Math.round(scaledDimensions.scale * 3))}px ${Math.max(7, Math.round(scaledDimensions.scale * 10))}px`, // Scale padding
                    alignItems: 'center',
                    flex: '1 0 0',
                    alignSelf: 'stretch',
                    borderRadius: `${Math.max(5, Math.round(scaledDimensions.scale * 7))}px`, // Scale border radius
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
                      fontSize: `${Math.max(9, Math.round(scaledDimensions.scale * 11))}px`, // Reduced from 13px to 11px
                      fontStyle: 'normal',
                      fontWeight: showAllEvents ? '590' : '400',
                      lineHeight: `${Math.max(12, Math.round(scaledDimensions.scale * 15))}px`, // Reduced line height
                      letterSpacing: '-0.08px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    Next
                  </span>
                </div>

                {/* Past Button - Responsive */}
                <div
                  style={{
                    display: 'flex',
                    padding: `${Math.max(2, Math.round(scaledDimensions.scale * 3))}px ${Math.max(7, Math.round(scaledDimensions.scale * 10))}px`, // Scale padding
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
                      fontSize: `${Math.max(9, Math.round(scaledDimensions.scale * 11))}px`, // Reduced from 13px to 11px
                      fontStyle: 'normal',
                      fontWeight: !showAllEvents ? '590' : '400',
                      lineHeight: `${Math.max(12, Math.round(scaledDimensions.scale * 15))}px`, // Reduced line height
                      letterSpacing: '-0.08px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    Past
                  </span>
                </div>
              </div>
            </div>

            {/* Events Grid Container with Fade Gradients */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 'auto'
              }}
            >
              {/* Scrollable Events Grid */}
              <div
                ref={gridScrollRef}
                className="events-grid-scrollable"
                onScroll={updateScrollState}
                style={{
                  position: 'relative',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns
                  gridAutoRows: 'min-content', // Allow natural content height instead of fixed 3 rows
                  rowGap: `${Math.max(4, Math.round(scaledDimensions.scale * 8))}px`, // Responsive row gap
                  columnGap: `${Math.max(4, Math.round(scaledDimensions.scale * 8))}px`, // Responsive column gap
                  width: '100%',
                  height: '100%',
                  alignItems: 'stretch',
                  // Scrolling properties disabled for full-height desktop layout
                  overflowY: 'visible',
                  overflowX: 'hidden',
                  scrollBehavior: 'auto',
                  WebkitOverflowScrolling: 'auto',
                  // Disable scrollbar styling and fade masks in full-height mode
                  scrollbarWidth: 'auto',
                  scrollbarColor: 'auto',
                  // Smooth content transitions on toggle like mobile
                  transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'opacity, transform',
                  maskImage: 'none',
                  WebkitMaskImage: 'none'
                }}
              >
              {(() => {
                // Calculate available height per grid cell for responsive card scaling
                const heroImageHeight = scaledDimensions.heroWidth; // Hero image height (square, already scaled)
                const gridGap = Math.max(4, Math.round(scaledDimensions.scale * 8));
                const availableHeightPerCell = (heroImageHeight - (2 * gridGap)) / 3; // 3 rows with 2 gaps
                const baseCardHeight = 124; // Base card height for scaling reference
                const cardScaleFactor = Math.min(1, availableHeightPerCell / baseCardHeight); // Never scale up, only down

                return (
                  <>
                    {/* Show events or empty state */}
                    {filteredHomepageEvents.length === 0 && filteredFeaturedEvents.length === 0 ? (
                /* Empty State - Spans all grid cells */
                <div
                  style={{
                    gridColumn: '1 / -1',
                    gridRow: '1 / -1',
                    display: 'flex',
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
                  <button
                    type="button"
                    aria-label="View Past Events"
                    onClick={() => setShowAllEvents(false)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '12px 16px',
                      minHeight: '44px',
                      borderRadius: '14px',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#FFF',
                      background: 'rgba(22, 22, 22, 0.60)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(38, 38, 38, 0.80)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(22, 22, 22, 0.60)';
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.transform = 'scale(0.98)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    View Past Events
                  </button>
                </div>
              ) : (
                /* Event Cards - Show first 6 events in 3x2 grid */
                [...filteredFeaturedEvents, ...filteredHomepageEvents]
                  .slice(0, 6) // Limit to 6 events for 3x2 grid
                  .map((card, index) => (
                  <article
                    key={`homepage-desktop-${card.id}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      minHeight: '90px', // Reduced from 128px to 90px
                      borderRadius: '20px',
                      background: 'rgba(15, 15, 15, 0.95)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                      position: 'relative',
                      margin: '0 0 4px 0',
                      padding: '2px',
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      isolation: 'isolate',
                      transform: 'translateZ(0)',
                      willChange: 'transform',
                      zIndex: 1,
                      clear: 'both'
                    }}
                  >
                    {/* Desktop Event Card Content - Scaled to Fit Grid (Remove duplicate styling) */}
                    <div
                      style={{
                        width: '100%',
                        height: `${Math.max(87, Math.round(baseCardHeight * cardScaleFactor) - 6)}px`, // Scale card height based on available space, reduced by 6px total
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxSizing: 'border-box',
                        padding: `${Math.max(6, Math.round(8 * cardScaleFactor))}px` // Scale padding with better minimum
                      }}
                    >
                      {/* Image Section - Original Size with Fixed Rendering */}
                      <div
                        style={{
                          position: 'absolute',
                          left: `${Math.max(6, Math.round(8 * cardScaleFactor))}px`, // Match container padding
                          top: `${Math.max(6, Math.round(8 * cardScaleFactor))}px`, // Match container padding
                          width: `${Math.max(79, Math.round(105 * cardScaleFactor))}px`, // Back to original scale
                          height: `${Math.max(79, Math.round(105 * cardScaleFactor))}px`, // Back to original scale
                          flexShrink: 0,
                          borderRadius: `${Math.max(13, Math.round(18 * cardScaleFactor))}px`, // Back to original scale
                          overflow: 'hidden',
                          cursor: 'pointer',
                          zIndex: 100,
                          transition: 'transform 0.1s ease',
                          boxSizing: 'border-box'
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Add image expand functionality if needed
                        }}
                      >
                        {/* Event Background Image - Use optimized URL with cache-busting */}
                        <img
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                          src={(() => {
                            const imageUrl = card.coverImage || card.image_url;
                            if (!imageUrl || imageUrl.startsWith('data:')) {
                              return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K';
                            }
                            const optimizedUrl = getOptimizedImageUrl(imageUrl, 111);
                            console.log(`🖼️ DESKTOP FEATURED: Loading featured event image for "${card.title}":`, {
                              original: imageUrl,
                              optimized: optimizedUrl,
                              isNewImageSystem: imageUrl?.includes('/api/images/serve/'),
                              hasExistingCacheBusting: imageUrl?.includes('_cb=') || imageUrl?.includes('_t=')
                            });
                            return optimizedUrl;
                          })()}
                          alt={`${card.title} event cover`}
                          loading="lazy"
                          onError={(e) => {
                            console.error(`❌ DESKTOP FEATURED: Featured event image failed to load for "${card.title}":`, e.target.src);
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K';
                          }}
                          onLoad={(e) => {
                            console.log('✅ DESKTOP FEATURED: Featured event image loaded successfully:', card.title, e.target.src);
                            e.target.style.backgroundColor = 'transparent';
                          }}
                          style={{
                            width: '100%', // Fill container
                            height: '100%', // Fill container
                            borderRadius: `${Math.max(13, Math.round(18 * cardScaleFactor))}px`, // Match container border radius
                            objectFit: 'cover',
                            backgroundColor: '#2a2a2a',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: 'scale(1)',
                            boxShadow: 'none',
                            pointerEvents: 'none'
                          }}
                        />
                      </div>

                      {/* Text Content Section - Better Spacing from Image */}
                      <div
                        style={{
                          display: 'flex',
                          width: `calc(100% - ${Math.max(99, Math.round(125 * cardScaleFactor))}px)`, // More space for image + gap
                          padding: `${Math.max(1, Math.round(2 * cardScaleFactor))}px ${Math.max(6, Math.round(8 * cardScaleFactor))}px ${Math.max(1, Math.round(2 * cardScaleFactor))}px ${Math.max(6, Math.round(8 * cardScaleFactor))}px`, // Better padding with 8px grid
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          position: 'absolute',
                          left: `${Math.max(99, Math.round(125 * cardScaleFactor))}px`, // More space from image (image width + container padding + 8px gap)
                          top: `${Math.max(6, Math.round(8 * cardScaleFactor))}px`, // Match container padding
                          height: `${Math.max(79, Math.round(105 * cardScaleFactor))}px`, // Scale height to match image
                          boxSizing: 'border-box'
                        }}
                      >
                        {/* Event Information */}
                        <div
                          style={{
                            width: '100%',
                            minHeight: `${Math.max(50, Math.round(84 * cardScaleFactor))}px`, // Scale minHeight
                            height: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'stretch',
                            flex: '1 1 auto'
                          }}
                        >
                          {/* Event Title - Grid-Responsive Typography */}
                          <h3
                            style={{
                              fontFamily: 'Inter',
                              fontWeight: '700',
                              fontSize: `${Math.max(10, Math.round(16 * cardScaleFactor))}px`, // Scale font size
                              lineHeight: '1.25',
                              textAlign: 'left',
                              color: '#FFFFFF',
                              width: '100%',
                              minHeight: `${Math.max(12, Math.round(20 * cardScaleFactor))}px`, // Scale minHeight
                              height: 'auto',
                              margin: `0 0 ${Math.max(2, Math.round(4 * cardScaleFactor))}px 0`, // Scale margin
                              padding: '0',
                              overflow: 'visible',
                              textOverflow: 'unset',
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                              hyphens: 'auto'
                            }}
                          >
                            {card.title}
                          </h3>

                          {/* Event DateTime - Grid-Responsive with Icon */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              alignSelf: 'stretch',
                              gap: `${Math.max(3, Math.round(6 * cardScaleFactor))}px`, // Scale gap
                              padding: `0px 0px 0px ${Math.max(1, Math.round(2 * cardScaleFactor))}px` // Scale padding
                            }}
                          >
                            <svg
                              width={Math.max(7, Math.round(12 * cardScaleFactor))} // Scale width
                              height={Math.max(7, Math.round(12 * cardScaleFactor))} // Scale height
                              viewBox="0 0 10 10"
                              fill="none"
                              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              <path d="M8 2V1a1 1 0 0 0-2 0v1H4V1a1 1 0 0 0-2 0v1H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8zM2 8H1V7h1v1zm0-2H1V5h1v1zm2 2H3V7h1v1zm0-2H3V5h1v1zm2 2H5V7h1v1zm0-2H5V5h1v1zm2 2H7V7h1v1zm0-2H7V5h1v1z" fill="currentColor"/>
                            </svg>
                            <span
                              style={{
                                fontFamily: 'Inter',
                                fontWeight: '300',
                                fontSize: `${Math.max(7, Math.round(12 * cardScaleFactor))}px`, // Scale font size
                                lineHeight: '1.4',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 0.7)',
                                width: '100%',
                                height: `${Math.max(8, Math.round(14 * cardScaleFactor))}px`, // Scale height
                                margin: '0',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {card.date}
                            </span>
                          </div>

                          {/* Event Location - Grid-Responsive with Icon */}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              alignSelf: 'stretch',
                              gap: `${Math.max(3, Math.round(6 * cardScaleFactor))}px`, // Scale gap
                              padding: `0px ${Math.max(1, Math.round(2 * cardScaleFactor))}px` // Scale padding
                            }}
                          >
                            <svg
                              width={Math.max(7, Math.round(12 * cardScaleFactor))} // Scale width
                              height={Math.max(7, Math.round(12 * cardScaleFactor))} // Scale height
                              viewBox="0 0 24 24"
                              fill="none"
                              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                            </svg>
                            <span
                              style={{
                                fontFamily: 'Inter',
                                fontWeight: '300',
                                fontSize: `${Math.max(7, Math.round(12 * cardScaleFactor))}px`, // Scale font size
                                lineHeight: '1.4',
                                textAlign: 'left',
                                color: 'rgba(255, 255, 255, 0.65)',
                                width: '100%',
                                height: `${Math.max(8, Math.round(14 * cardScaleFactor))}px`, // Scale height
                                margin: '0',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {card.location}
                            </span>
                          </div>
                        </div>

                        {/* Event Button - Grid-Responsive Aligned with Image Bottom Edge */}
                        <div
                          style={{
                            width: '100%',
                            height: `${Math.max(18, Math.round(32 * cardScaleFactor))}px`, // Scale height
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                            gap: `${Math.max(3, Math.round(6 * cardScaleFactor))}px`, // Scale gap
                            padding: `0px ${Math.max(1, Math.round(2 * cardScaleFactor))}px 0px 0px`, // Scale padding
                            position: 'absolute',
                            bottom: `calc(100% - ${Math.max(80, Math.round(105 * cardScaleFactor))}px)`, // Adjust button position - middle ground
                            left: '0px'
                          }}
                        >
                          {card.isRealEvent && card.hasTicketLink ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(`🎫 Opening ticket link for ${card.title}:`, card.ticketsUrl);
                                window.open(card.ticketsUrl, '_blank', 'noopener,noreferrer');
                              }}
                              style={{
                                background: 'rgba(23, 23, 23, 0.8)',
                                borderRadius: `${Math.max(25, Math.round(46 * cardScaleFactor))}px`, // Scale border radius
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: `${Math.max(6, Math.round(12 * cardScaleFactor))}px`, // Scale gap
                                padding: `${Math.max(8, Math.round(16 * cardScaleFactor))}px ${Math.max(8, Math.round(15 * cardScaleFactor))}px`, // Scale padding
                                width: `calc(100% - ${Math.max(2, Math.round(4 * cardScaleFactor))}px)`,
                                height: `${Math.max(18, Math.round(32 * cardScaleFactor))}px`, // Scale height
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: 'Inter',
                                fontWeight: '500',
                                fontSize: `${Math.max(8, Math.round(14 * cardScaleFactor))}px`, // Scale font size
                                lineHeight: '1.21',
                                textAlign: 'center',
                                color: '#FFFFFF',
                                transition: 'all 0.2s ease',
                                transform: 'scale(1)',
                                boxSizing: 'border-box'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                                e.currentTarget.style.background = 'rgba(23, 23, 23, 0.9)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.background = 'rgba(23, 23, 23, 0.8)';
                              }}
                            >
                              {card.buttonText || 'View Event'}
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
                  </>
                );
              })()}
              </div>

              {/* Modern CSS Mask-based Fade Effect - Applied directly to scrollable container */}
            </div>
            </div>
        )}
      </div>









      {/* YouTube Video and Text Us Section - Side by Side Layout (Desktop 1024px+) */}
      {scaledDimensions.containerWidth >= 1024 && (
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '100%',
            margin: '16px 0 0 0', // Reduced from 32px to 16px for better visual flow
            padding: '0',
            justifyContent: 'space-between', // Space between Watch section and Follow Us section
            alignItems: 'flex-start',
            gap: '32px', // Fixed gap for consistent spacing between video and text section
            flexDirection: 'row'
          }}
        >
          {/* Left Side - YouTube Video Section with Title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: `${Math.max(6, Math.round(scaledDimensions.scale * 8))}px`, // Same gap as other sections
              alignItems: 'flex-start'
            }}
          >
            {/* Watch Title - Standardized Typography */}
            <div
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: `${Math.max(20, Math.round(scaledDimensions.scale * 26))}px`, // Match Events/Up Next/Text us titles
                fontWeight: '800',
                lineHeight: 'normal',
                letterSpacing: '-0.02em', // Match other titles
                margin: '0',
                padding: '0',
                height: `${Math.max(20, Math.round(scaledDimensions.scale * 26))}px`, // Explicit height to match other titles
                display: 'flex',
                alignItems: 'center' // Center text vertically within the height
              }}
            >
              Watch
            </div>

            {/* YouTube Video Container */}
            <div
            onClick={() => window.open('https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx', '_blank')}
            style={{
              width: `${Math.round(scaledDimensions.rightHeroWidth * 0.9)}px`, // Increased to 90% for wider video
              height: `${Math.round(scaledDimensions.rightHeroHeight * 0.9)}px`, // Increased to 90% proportionally
              position: 'relative',
              flexShrink: 0,
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
          {/* Video background container - UPDATED DIMENSIONS */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: '0px',
              width: `${Math.round(scaledDimensions.rightHeroWidth * 0.9)}px`, // Match wider video size
              height: `${Math.round(scaledDimensions.rightHeroHeight * 0.9)}px`, // Match wider video size
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
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
                zIndex: 1
              }}
            />
          </div>

          {/* Video Hero Text Box - UPDATED POSITIONING */}
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: `${Math.min(Math.round(scaledDimensions.rightHeroHeight * 0.75), 350) - 54}px`, // Adjust for reduced video size
              display: 'flex',
              width: '100%',
              height: '44px',
              padding: '8px 16px',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
              zIndex: 2
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
                  maxWidth: `${Math.round(scaledDimensions.rightHeroWidth * 0.9) >= 300 ? Math.round(scaledDimensions.rightHeroWidth * 0.9) - 150 : Math.round(scaledDimensions.rightHeroWidth * 0.9) - 60}px` // Adjust for wider video size
                }}
              >
                Watch on YouTube
              </div>

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

            {/* Right - CTA - UPDATED CONDITION */}
            {Math.round(scaledDimensions.rightHeroWidth * 0.9) >= 300 && ( // Adjust condition for wider video size
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://youtu.be/vEHTO3gf1jk?si=87b8o-daRyN2O6sx', '_blank');
                }}
                style={{
                  display: 'flex',
                  minWidth: '112px',
                  height: '44px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '22px',
                  background: 'rgba(38, 38, 38, 0.80)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'scale(1)',
                  boxSizing: 'border-box'
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
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.2',
                    pointerEvents: 'none'
                  }}
                >
                  Watch now
                </span>
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Right Side - Text Us Section with Laylo and Social Media Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: (() => {
              // 🚨 AGGRESSIVE RESPONSIVE GAP: Dynamic gap calculation with substantial spacing to prevent overlap
              const containerWidth = scaledDimensions.eventsWidth * 1.2;

              // 🚨 AGGRESSIVE GAP SCALING: Increase gap substantially for narrower screens where iframe content wraps
              if (containerWidth < 350) {
                return '95px'; // Very aggressive gap for very narrow screens (mobile portrait)
              } else if (containerWidth < 450) {
                return '85px'; // Aggressive gap for narrow screens (mobile landscape)
              } else if (containerWidth < 550) {
                return '75px'; // Substantial gap for small tablet screens
              } else if (containerWidth < 650) {
                return '68px'; // Moderate gap for medium tablet screens
              } else if (containerWidth < 750) {
                return '60px'; // Small gap adjustment for larger tablet screens
              }

              return '52px'; // Default gap for wide desktop screens
            })(),
            alignItems: 'flex-start',
            flex: '1 1 auto', // Allow growing and shrinking
            minWidth: '320px', // Increased minimum width for better scaling
            maxWidth: `${Math.round(scaledDimensions.eventsWidth * 1.2)}px` // Allow 20% larger than Events section
          }}
        >
          <TextUsSection
            scaledDimensions={scaledDimensions}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            phoneSubmitting={phoneSubmitting}
            phoneSubmitted={phoneSubmitted}
            phoneInputState={phoneInputState}
            selectedCountryId={selectedCountryId}
            setSelectedCountryId={setSelectedCountryId}
            flagImageRef={flagImageRef}
            phoneContainerRef={phoneContainerRef}
            showVerification={showVerification}
            verificationPhone={verificationPhone}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            verificationSubmitting={verificationSubmitting}
            verificationState={verificationState}
            resendCountdown={resendCountdown}
            canResend={canResend}
            resendSubmitting={resendSubmitting}
            handlePhoneSubmit={handlePhoneSubmit}
            handleVerificationSubmit={handleVerificationSubmit}
            handleResendCode={handleResendCode}
            handlePhoneChange={handlePhoneChange}
            handlePhoneKeyDown={handlePhoneKeyDown}
            handleCountryChange={handleCountryChange}
            handleVerificationChange={handleVerificationCodeChange}
            handleBackToPhone={handleBackToPhone}
          />

          {/* Social Media Buttons - Desktop Integration with Full Width */}
          <div
            style={{
              width: '100%', // Use full width of parent container
              display: 'flex',
              justifyContent: 'center', // Center the social media buttons
              alignItems: 'center',
              padding: '0' // Remove padding to use full width
            }}
          >
            <SocialMediaButtons
              isDesktop={true}
              containerWidth={Math.round(scaledDimensions.eventsWidth * 1.2)}
              responsive={true}
            />
          </div>
        </div>
        </div>
      )}

      {/* Events and Text Us Section - Hidden on Desktop 1024px+, Visible on Mobile/Tablet */}
      <div
        style={{
          position: 'relative',
          display: scaledDimensions.containerWidth >= 1024 ? 'none' : 'flex',
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
          {/* Events Title and Toggle - Scoped to Events Section Only */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '8px 0 0 0',
              padding: '0',
              alignSelf: 'stretch' // Match the event cards grid alignment
            }}
          >
            {/* Event Title */}
            <div
              style={{
                color: '#FFF',
                fontFamily: 'Inter',
                fontSize: '24px',
                fontWeight: '800',
                lineHeight: 'normal'
              }}
            >
              Events
            </div>

            {/* Event Filter Toggle - Identical to Mobile */}
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
              aria-label={`Switch to ${showAllEvents ? 'Past' : 'Next'} events`}
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
                  Next
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
          {/* EVENT LIST Grid - Updated for mobile-style cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', // Responsive grid for mobile-style cards
              rowGap: '16px',
              columnGap: '16px',
              alignSelf: 'stretch',
              alignItems: 'start',
              justifyItems: 'stretch', // Stretch cards to fill grid cells
              width: '100%'
            }}
          >




            {/* Show all events (mobile-style cards) or empty state */}
            {filteredHomepageEvents.length === 0 && filteredFeaturedEvents.length === 0 ? (
              /* Empty State - No Events */
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
                <button
                  type="button"
                  aria-label="View Past Events"
                  onClick={() => setShowAllEvents(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px 16px',
                    minHeight: '44px',
                    borderRadius: '14px',
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#FFF',
                    background: 'rgba(22, 22, 22, 0.60)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(38, 38, 38, 0.80)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(22, 22, 22, 0.60)';
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = 'scale(0.98)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  View Past Events
                </button>
              </div>
            ) : (
              /* All Event Cards - Mobile-style Cards (including previously featured events) */
              [...filteredFeaturedEvents, ...filteredHomepageEvents].map((card, index) => (
              <article
                key={`homepage-${card.id}`}
                style={{
                  display: 'block', // Change to block to prevent flex issues
                  width: '100%',
                  minHeight: '128px', // Minimum height for layout stability
                  height: 'auto', // Dynamic height to accommodate multi-line titles
                  borderRadius: '20px',
                  background: 'rgba(15, 15, 15, 0.95)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                  position: 'relative',
                  margin: '0 0 4px 0', // Slightly increased margin for better card separation
                  padding: '2px', // Reduced to 2px maximum for compact design
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  isolation: 'isolate',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  zIndex: 1, // Ensure proper stacking
                  clear: 'both' // Prevent float issues
                }}
              >
                {/* Mobile Event Card Content - Compact Horizontal Layout */}
                <div
                  style={{
                    width: '100%',
                    height: '124px', // Adjusted to accommodate square image (120px + 4px padding)
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    padding: '2px' // Reduced padding for compact design
                  }}
                >
                  {/* Image Section - Compact Horizontal Layout */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '2px',
                      top: '2px',
                      width: '120px',
                      height: '120px',
                      flexShrink: 0,
                      borderRadius: '20px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      zIndex: 100,
                      transition: 'transform 0.1s ease',
                      boxSizing: 'border-box'
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Handle image expansion if needed
                    }}
                  >
                    {/* Event Background Image */}
                    <img
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      src={(() => {
                        const optimizedUrl = getOptimizedImageUrl(card.coverImage, 120);
                        console.log(`🖼️ DESKTOP: Loading homepage image for "${card.title}":`, {
                          original: card.coverImage,
                          optimized: optimizedUrl,
                          isDataUrl: card.coverImage?.startsWith('data:'),
                          isNewImageSystem: card.coverImage?.includes('/api/images/serve/'),
                          hasExistingCacheBusting: card.coverImage?.includes('_cb=') || card.coverImage?.includes('_t='),
                          hostname: window.location.hostname
                        });
                        return optimizedUrl;
                      })()}
                      alt={`${card.title} event cover`}
                      loading="lazy"
                      onError={(e) => {
                        const img = e.target;
                        const url = img?.src || '';
                        console.error(`❌ DESKTOP: Homepage event image failed to load for "${card.title}":`, {
                          url: url,
                          originalCoverImage: card.coverImage,
                          errorEvent: e,
                          networkState: img.networkState,
                          readyState: img.readyState
                        });

                        if (img && !img.dataset.fallbackTried) {
                          img.dataset.fallbackTried = '1';
                          if (url.includes('/event_card')) { img.src = url.replace('/event_card', '/medium'); return; }
                          if (url.includes('/medium')) { img.src = url.replace('/medium', '/small'); return; }
                          if (url.includes('/small')) { img.src = url.replace('/small', '/thumbnail'); return; }
                          if (url.includes('/api/images/serve/')) {
                            img.src = url.replace(/\/serve\/([a-f0-9-]{36})\/(\w+)/, '/serve/$1/medium');
                            return;
                          }
                        }
                        console.log('❌ DESKTOP: Using placeholder for:', card.title);
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K';
                      }}
                      onLoad={(e) => {
                        console.log('✅ DESKTOP: Homepage event image loaded successfully:', card.title, e.target.src);
                        e.target.style.backgroundColor = 'transparent';
                      }}
                      style={{
                        position: 'absolute',
                        left: '4px',
                        top: '4px',
                        width: '112px',
                        height: '112px',
                        borderRadius: '17px',
                        objectFit: 'cover',
                        backgroundColor: '#2a2a2a',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'scale(1)',
                        boxShadow: 'none',
                        pointerEvents: 'none'
                      }}
                    />
                  </div>

                  {/* Text Content Section - Compact Horizontal Layout */}
                  <div
                    style={{
                      display: 'flex',
                      width: 'calc(100% - 130px)',
                      padding: '2px 2px 2px 4px',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      position: 'absolute',
                      left: '126px',
                      top: '2px',
                      height: '120px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Event Information */}
                    <div
                      style={{
                        width: '100%',
                        minHeight: '84px',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf: 'stretch',
                        flex: '1 1 auto'
                      }}
                    >
                      {/* Event Title */}
                      <h3
                        style={{
                          fontFamily: 'Inter',
                          fontWeight: '700',
                          fontSize: '16px',
                          lineHeight: '1.25',
                          textAlign: 'left',
                          color: '#FFFFFF',
                          width: '100%',
                          minHeight: '20px',
                          height: 'auto',
                          margin: '0 0 4px 0',
                          padding: '0',
                          overflow: 'visible',
                          textOverflow: 'unset',
                          whiteSpace: 'normal',
                          wordWrap: 'break-word',
                          hyphens: 'auto'
                        }}
                      >
                        {card.title}
                      </h3>

                      {/* Event DateTime */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                          gap: '6px',
                          padding: '0px 0px 0px 2px'
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 10 10"
                          fill="none"
                          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          <path d="M8 2V1a1 1 0 0 0-2 0v1H4V1a1 1 0 0 0-2 0v1H1a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H8zM2 8H1V7h1v1zm0-2H1V5h1v1zm2 2H3V7h1v1zm0-2H3V5h1v1zm2 2H5V7h1v1zm0-2H5V5h1v1zm2 2H7V7h1v1zm0-2H7V5h1v1z" fill="currentColor"/>
                        </svg>
                        <span
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: '300',
                            fontSize: '12px',
                            lineHeight: '1.4',
                            textAlign: 'left',
                            color: 'rgba(255, 255, 255, 0.7)',
                            width: '100%',
                            height: '14px',
                            margin: '0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {card.date}
                        </span>
                      </div>

                      {/* Event Location */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                          gap: '6px',
                          padding: '0px 2px'
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        </svg>
                        <span
                          style={{
                            fontFamily: 'Inter',
                            fontWeight: '300',
                            fontSize: '12px',
                            lineHeight: '1.4',
                            textAlign: 'left',
                            color: 'rgba(255, 255, 255, 0.65)',
                            width: '100%',
                            height: '14px',
                            margin: '0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {card.location}
                        </span>
                      </div>
                    </div>

                    {/* Event Button - Aligned with image bottom edge */}
                    <div
                      style={{
                        width: '100%',
                        height: '32px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                        gap: '6px',
                        padding: '0px 2px 0px 0px',
                        position: 'absolute',
                        bottom: '4px', // Fine-tuned to perfectly align button bottom with image bottom edge
                        left: '0px'
                      }}
                    >
                      {card.isRealEvent && card.hasTicketLink ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log(`🎫 Opening ticket link for ${card.title}:`, card.ticketsUrl);
                            window.open(card.ticketsUrl, '_blank', 'noopener,noreferrer');
                          }}
                          style={{
                            background: 'rgba(23, 23, 23, 0.8)',
                            borderRadius: '46px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 15px',
                            width: 'calc(100% - 4px)',
                            height: '32px',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'Inter',
                            fontWeight: '500',
                            fontSize: '14px',
                            lineHeight: '1.21',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            transition: 'all 0.2s ease',
                            transform: 'scale(1)',
                            boxSizing: 'border-box'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.background = 'rgba(23, 23, 23, 0.9)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = 'rgba(23, 23, 23, 0.8)';
                          }}
                        >
                          {card.buttonText || 'View Event'}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            ))
            )}
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
