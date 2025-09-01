import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';
import { useAnalytics } from '../hooks/useAnalytics';
import SocialMediaButtons from './SocialMediaButtons';
import PrivacyConsentModal from './PrivacyConsentModal';
import useMobileLifecycle from '../hooks/useMobileLifecycle';
import { mobileDebounce, mobileThrottle, memoryManager } from '../../utils/mobileOptimization';

// Simple and Working Laylo Iframe Component - RESTORED from working commit
const LayloIframe = memo(({ dropId, color = 'ff0409', theme = 'dark', background = 'solid', minimal = true, style = {} }) => {
  // Simple Laylo URL generation - RESTORED from working implementation
  const layloUrl = useMemo(() => {
    const params = new URLSearchParams({
      dropId,
      color,
      theme,
      background,
      ...(minimal && { minimal: 'true' })
    });
    return `https://embed.laylo.com/?${params.toString()}`;
  }, [dropId, color, theme, background, minimal]);

  // Simple iframe render - no complex loading states
  return (
    <iframe
      id={`laylo-drop-${dropId}`}
      src={layloUrl}
      style={{
        ...style,
        border: 'none',
        width: '100%',
        height: '100%'
      }}
      allow="web-share"
      title="Laylo Signup Form"
    />
  );
});



// Enhanced image helpers with iOS Safari compatibility
const getOptimizedImageUrl = (originalUrl, width = null) => {
  if (!originalUrl) return originalUrl;

  // Handle data URLs (base64 encoded images) - return as-is
  if (typeof originalUrl === 'string' && originalUrl.startsWith('data:')) {
    console.log('⚠️ Data URL detected, returning as-is:', originalUrl.substring(0, 50) + '...');
    return originalUrl;
  }

  // Check if we're on iOS Safari for compatibility decisions
  const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

  // Handle new image system URLs (/api/images/serve/{uuid})
  if (typeof originalUrl === 'string' && originalUrl.includes('/api/images/serve/')) {
    console.log('🔄 Processing new image system URL:', originalUrl);

    // Extract the UUID from the URL
    const uuidMatch = originalUrl.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
    if (uuidMatch) {
      const uuid = uuidMatch[1];

      // Build optimized URL using the dashboard domain - with local proxy for development
      const dashboardDomain = window.location.hostname === 'localhost' ? '' : 'https://admin.b2b.click';

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
    // Use dashboard server for image optimization (publicly accessible) - with local proxy for development
    const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
    const baseUrl = `${dashboardDomain}/images/proxy-optimized?url=${encodedUrl}`;

    // Add iOS Safari specific parameters for better compatibility
    const iosSafariParams = isIOSSafari ? '&format=jpeg&quality=85' : '';
    const finalUrl = width ? `${baseUrl}&w=${width}${iosSafariParams}` : `${baseUrl}${iosSafariParams}`;

    return finalUrl;
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
      const dashboardDomain = window.location.hostname === 'localhost' ? '' : 'https://admin.b2b.click';

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

  // Check if imgElement and its parent still exist in the DOM
  if (!imgElement || !imgElement.parentNode) {
    console.warn('⚠️ Image element or parent node is null, skipping fallback');
    return;
  }

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
  try {
    imgElement.parentNode.insertBefore(placeholder, imgElement);
    imgElement.remove();
  } catch (error) {
    console.warn('⚠️ Failed to replace image with placeholder:', error);
  }
};

// Helper for third fallback attempt
const handleImageFallbackAttempt3 = (imgElement, card) => {
  // Check if imgElement still exists in the DOM
  if (!imgElement || !imgElement.parentNode) {
    console.warn('⚠️ Image element or parent node is null, skipping fallback attempt 3');
    return;
  }

  if (card.coverImage.includes('/api/images/serve/')) {
    // For new image system, try thumbnail variant as last resort
    const uuidMatch = card.coverImage.match(/\/api\/images\/serve\/([a-f0-9-]{36})/);
    if (uuidMatch) {
      const uuid = uuidMatch[1];
      const dashboardDomain = window.location.hostname === 'localhost' ? '' : 'https://admin.b2b.click';
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

// Helper function to convert image URLs to working dashboard endpoints
const getDashboardImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // If already absolute URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Handle relative URLs
  if (imageUrl.startsWith('/')) {
    // Check if it's a broken static file path that needs conversion
    if (imageUrl.startsWith('/static/uploads/temp/') || imageUrl.startsWith('/static/uploads/')) {
      console.warn('⚠️ Converting broken static file path to placeholder:', imageUrl);
      // Use a working placeholder endpoint instead of broken static files
      // This will trigger the fallback system to show proper placeholders
      return null; // Return null to trigger fallback logic
    }

    // Check if it's already a working API endpoint
    if (imageUrl.startsWith('/api/images/serve/')) {
      // For development: use proxy path
      // For production: use production dashboard domain
      if (window.location.hostname === 'localhost') {
        return imageUrl; // Vite proxy will handle /api/* routes
      } else {
        return `https://admin.b2b.click${imageUrl}`;
      }
    }

    // For other relative URLs, use proxy approach
    if (window.location.hostname === 'localhost') {
      return `/api/proxy${imageUrl}`;
    } else {
      return `https://admin.b2b.click${imageUrl}`;
    }
  }

  return imageUrl;
};
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

  // Initialize mobile lifecycle management for the main component
  const mobileLifecycle = useMobileLifecycle();

  // Privacy consent state
  const [consentGiven, setConsentGiven] = useState(false);

  // Handle consent change
  const handleConsentChange = useCallback((granted) => {
    setConsentGiven(granted);

    // Track consent decision for analytics (only if consent was granted)
    if (granted) {
      trackEvent('privacy_consent', {
        action: 'granted',
        timestamp: Date.now(),
        component: 'PrivacyConsentModal'
      });
    }
  }, [trackEvent]);

  // YouTube thumbnail preloader state for better performance
  const [showYoutubeThumbnail, setShowYoutubeThumbnail] = useState(true);
  const [shouldLoadYoutube, setShouldLoadYoutube] = useState(false);

  useEffect(() => {
    // Start with thumbnail for faster loading, then auto-load video after delay - using mobile lifecycle
    mobileLifecycle.createTimer(() => {
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

  // Events data state - Two-tier system
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [homepageEvents, setHomepageEvents] = useState([]);
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

  // Image expansion state
  const [expandedImage, setExpandedImage] = useState(null);
  const [imageExpanding, setImageExpanding] = useState(false);

  // Handle image expansion
  const handleImageExpand = useCallback((card, imageElement) => {
    if (imageExpanding) {
      return; // Prevent multiple expansions
    }

    setImageExpanding(true);

    // Get full-size image URL - prioritize original cover image over thumbnail
    let imageUrl = card.coverImage;

    // If we have a dashboard domain, construct the full-size image URL
    if (imageUrl && !imageUrl.startsWith('http')) {
      const dashboardDomain = window.location.hostname === 'localhost' ? '' : 'https://admin.b2b.click';
      imageUrl = `${dashboardDomain}${imageUrl}`;
    }

    // Remove any size parameters to get full-size image
    if (imageUrl) {
      imageUrl = imageUrl.replace(/[?&](w|width|h|height|size)=\d+/g, '');
      imageUrl = imageUrl.replace(/[?&]$/, ''); // Clean up trailing ? or &
    }

    setExpandedImage({
      ...card,
      imageUrl: imageUrl || card.coverImage, // Fallback to original if processing fails
      originalRect: imageElement?.getBoundingClientRect() || null
    });

    // Reset expanding state after animation
    setTimeout(() => {
      setImageExpanding(false);
    }, 400);
  }, [imageExpanding]);

  // Handle image collapse
  const handleImageCollapse = useCallback(() => {
    setExpandedImage(null);
  }, []);

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

  // Enhanced state preservation including iframe content state
  const saveCurrentDrawerState = useCallback(() => {
    setPreviousDrawerState({
      expanded: drawerExpanded,
      showDisclaimer: showDisclaimer,
      showVerification: showVerification,
      verificationCode: verificationCode,
      phoneNumber: phoneNumber
    });

    // Preserve iframe state by keeping it in DOM but hidden
    // This prevents content loss when drawer is collapsed/reopened
    console.log('💾 Drawer state saved, iframe content preserved');
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

      // Use Vite proxy for API calls - routes to local dashboard in development
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
        setHomepageEvents(cached.data.homepageEvents || []);
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

      // Validate featured events and homepage events
      const featuredEvents = Array.isArray(data.featuredEvents) ? data.featuredEvents : [];
      const homepageEvents = Array.isArray(data.homepageEvents) ? data.homepageEvents : [];

      // Validate each featured event has required fields
      const validatedFeaturedEvents = featuredEvents.filter(event => {
        if (!event || typeof event !== 'object') return false;
        if (!event.id || !event.title) {
          console.warn('Featured event missing required fields:', event);
          return false;
        }
        return true;
      });

      // Validate each homepage event has required fields
      const validatedHomepageEvents = homepageEvents.filter(event => {
        if (!event || typeof event !== 'object') return false;
        if (!event.id || !event.title) {
          console.warn('Homepage event missing required fields:', event);
          return false;
        }
        return true;
      });

      console.log(`✅ Mobile homepage data loaded: ${validatedFeaturedEvents.length} featured events, ${validatedHomepageEvents.length} homepage events`);

      // Cache the successful response
      apiCache.set(cacheKey, {
        data: data,
        timestamp: Date.now()
      });

      setHomeSettings(homeSettings);
      setFeaturedEvents(validatedFeaturedEvents);
      setHomepageEvents(validatedHomepageEvents);

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
      setHomepageEvents([]);
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
    const timer = mobileLifecycle.createTimer(() => {
      setDrawerFullyClosed(false);
      setDrawerExpanded(false); // Start in collapsed state - text only, no iframe
    }, 500); // Wait 500ms then animate to collapsed state

    return () => mobileLifecycle.clearTimer(timer);
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
            avifLink.href = `${dashboardDomain}/images/proxy-optimized?url=${encodeURIComponent(event.coverImage)}&w=120&format=avif`;
            document.head.appendChild(avifLink);
          }

          // Preload WebP version (primary for Safari mobile)
          const webpLink = document.createElement('link');
          webpLink.rel = 'preload';
          webpLink.as = 'image';
          webpLink.type = 'image/webp';
          webpLink.href = getOptimizedImageUrl(event.coverImage, 120);
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

  // Featured events processing for mobile (hero cards using original styling)
  const featuredEventCards = useMemo(() => {
    return featuredEvents.map((event, index) => {
      try {
        // Validate and parse event date
        let eventDate = new Date();
        let formattedDate = 'Tue, Sep 02 @ 10:00PM';

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
              cachedFormat = { formattedDate, eventDate };
              dateFormatCache.set(cacheKey, cachedFormat);
            }
          } else {
            ({ formattedDate, eventDate } = cachedFormat);
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

        // Enhanced image handling with better fallbacks
        let coverImage = null;

        if (event.cover_image && typeof event.cover_image === 'string' && event.cover_image.trim() !== '') {
          // Valid image URL provided - convert to absolute dashboard URL
          coverImage = getDashboardImageUrl(event.cover_image.trim());
          console.log(`✅ Using provided cover image for ${title}:`, coverImage);
        }

        // 🎫 FIXED: Use external_ticket_url from dashboard "Ticket Link" field
        const ticketsUrl = event.external_ticket_url || event.posh_embed_url || '#';
        const hasTicketLink = event.display_tickets && ticketsUrl && ticketsUrl !== '#';

        return {
          id: `event-${event.id}`,
          title: title,
          date: formattedDate,
          location: location,
          coverImage: coverImage,
          ticketsUrl: ticketsUrl,
          hasTicketLink: hasTicketLink,
          buttonText: event.buy_button_text || 'View Event',
          isRealEvent: true,
          showOnHomepage: event.show_on_homepage,
          eventData: event,
          eventDate: eventDate
        };
      } catch (error) {
        console.warn(`Error processing mobile event ${event.id}:`, error);
        return null;
      }
    }).filter(Boolean);
  }, [featuredEvents]);

  // Homepage events processing for mobile (small cards)
  const homepageEventCards = useMemo(() => {
    // Filter out events that are already featured to avoid duplicates
    const featuredEventIds = new Set(featuredEvents.map(event => event.id));

    return homepageEvents
      .filter(event => !featuredEventIds.has(event.id)) // Exclude featured events
      .map((event, index) => {
        try {
          // Validate and parse event date
          let eventDate = new Date();
          let formattedDate = 'Tue, Sep 02 @ 10:00PM';

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
                cachedFormat = { formattedDate, eventDate };
                dateFormatCache.set(cacheKey, cachedFormat);
              }
            } else {
              ({ formattedDate, eventDate } = cachedFormat);
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

          // Enhanced image handling with better fallbacks
          let coverImage = null;
          if (event.cover_image && typeof event.cover_image === 'string' && event.cover_image.trim() !== '') {
            // Convert relative URLs to absolute dashboard URLs
            coverImage = getDashboardImageUrl(event.cover_image.trim());
            console.log(`✅ Homepage event "${title}" has cover image:`, coverImage);
          } else {
            console.log(`⚠️ Homepage event "${title}" has no cover image:`, event.cover_image);
          }

          // 🎫 Use external_ticket_url from dashboard "Ticket Link" field
          const ticketsUrl = event.external_ticket_url || event.posh_embed_url || '#';
          const hasTicketLink = event.display_tickets && ticketsUrl && ticketsUrl !== '#';

          return {
            id: `homepage-event-${event.id}`,
            title: title,
            date: formattedDate,
            location: location,
            coverImage: coverImage,
            ticketsUrl: ticketsUrl,
            hasTicketLink: hasTicketLink,
            buttonText: event.buy_button_text || 'View Event',
            isRealEvent: true,
            showOnHomepage: event.show_on_homepage,
            eventData: event,
            eventDate: eventDate
          };
        } catch (error) {
          console.warn(`Error processing homepage event ${event.id}:`, error);
          return null;
        }
      })
      .filter(Boolean);
  }, [homepageEvents, featuredEvents]);

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

  // Calculate drawer height based on content and state - FIXED for iframe loading
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
      return '80px'; // Collapsed - show only text content, iframe hidden but loading in background
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
      // Real mobile device: Reduced spacing for better UX
      return `calc(${drawerHeight} + 40px)`;
    } else {
      // Desktop browser mobile simulation: Minimal spacing
      const reducedSpacing = Math.max(30, baseSpacing * 0.4); // Minimum 30px, or 40% of drawer height
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

      // Debounce viewport changes to prevent excessive reflows - using mobile lifecycle
      timeoutId = mobileLifecycle.createTimer(() => {
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
          /* Mobile device specific fixes for real device compatibility */
          html, body {
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            touch-action: manipulation;
            overscroll-behavior: none;
          }

          /* iOS Safari specific fixes for viewport height issues */
          @supports (-webkit-touch-callout: none) {
            .mobile-content-container {
              height: -webkit-fill-available !important;
              min-height: -webkit-fill-available !important;
            }
          }

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

          /* Enhanced iOS Safari scrolling optimization */
          html, body {
            -webkit-overflow-scrolling: touch;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
            /* Prevent scroll bounce and improve momentum */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* Optimize scroll performance */
            scroll-behavior: smooth;
            touch-action: manipulation; /* Improve touch responsiveness */
          }

          /* Prevent iOS Safari bounce scroll while allowing normal scrolling */
          html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
            overscroll-behavior: none;
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

          /* Enhanced iOS-style momentum scrolling */
          .mobile-content-container {
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* Improve scroll performance and stability */
            scroll-snap-type: none; /* Disable snap scrolling that can cause jitter */
            touch-action: pan-y; /* Only allow vertical scrolling */
            /* Optimize rendering during scroll */
            contain: layout style;
            will-change: scroll-position;
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
            left: 25px;
            right: 25px;
            margin: 0 auto;
            width: calc(100% - 50px);
            max-width: 390px;
            background: rgb(21 21 21 / 80%);
            backdrop-filter: blur(10px);
            border-radius: 24px 24px 0px 0px;
            transition: transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform-origin: bottom center;
            z-index: 100;
            will-change: auto; /* Let browser optimize to prevent main scroll conflicts */
            backface-visibility: hidden;
            perspective: 1000px;
            /* Enhanced touch interaction */
            touch-action: pan-y;
            user-select: none;
            -webkit-user-select: none;
            /* Isolate drawer interactions from main scroll */
            contain: layout style;
          }

          /* Fast momentum animation for flick gestures - scroll optimized */
          .mobile-drawer.momentum-fast {
            transition: transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            contain: strict; /* Strict containment during fast animations */
          }

          /* Slow momentum animation for gentle swipes - scroll optimized */
          .mobile-drawer.momentum-slow {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            contain: layout style; /* Layout containment for smooth animations */
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

          /* Optimized fade-in animation - scroll-friendly */
          @keyframes optimizedFadeIn {
            0% {
              opacity: 0;
              transform: translate3d(0, 8px, 0); /* Reduced movement to prevent scroll interference */
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .event-card-spring {
            animation: optimizedFadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* Faster, smoother animation */
            will-change: auto; /* Let browser decide to prevent scroll conflicts */
            backface-visibility: hidden;
            transform-style: flat; /* Reduce 3D transforms that can cause scroll issues */
            -webkit-font-smoothing: antialiased;
            contain: layout style; /* Contain layout changes to prevent scroll reflow */
          }

          .event-card-hidden {
            opacity: 0;
            transform: translate3d(0, 8px, 0); /* Match reduced movement */
            backface-visibility: hidden;
          }

          /* Expanded Image Modal Animations */
          @keyframes expandedImageFadeIn {
            0% {
              opacity: 0;
              backdrop-filter: blur(0px);
              -webkit-backdrop-filter: blur(0px);
              background-color: rgba(0, 0, 0, 0);
            }
            100% {
              opacity: 1;
              backdrop-filter: blur(60px);
              -webkit-backdrop-filter: blur(60px);
              background-color: rgba(0, 0, 0, 0.15);
            }
          }

          @keyframes expandedImageScale {
            0% {
              opacity: 0;
              transform: scale(0.3) translateY(20px);
            }
            60% {
              opacity: 1;
              transform: scale(1.05) translateY(-5px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          @keyframes expandedButtonsSlideUp {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Responsive adjustments for small mobile devices */
          @media (max-width: 375px) {
            .mobile-content-container {
              padding-left: 15px !important;
              padding-right: 15px !important;
            }

            .mobile-drawer {
              left: 15px !important;
              right: 15px !important;
              width: calc(100% - 30px) !important;
            }
          }

          @media (max-width: 320px) {
            .mobile-content-container {
              padding-left: 10px !important;
              padding-right: 10px !important;
            }

            .mobile-drawer {
              left: 10px !important;
              right: 10px !important;
              width: calc(100% - 20px) !important;
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
      {/* Main Mobile Container - Responsive Full Viewport */}
      <main
        style={{
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          margin: '0',
          position: 'relative',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden', // Prevent viewport scrolling
          // Mobile-specific viewport fixes
          minHeight: '100vh',
          minWidth: '100vw',
          isolation: 'isolate', // Create new stacking context
          transform: 'translateZ(0)', // Force hardware acceleration
          willChange: 'auto', // Let browser optimize to prevent scroll conflicts
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
          WebkitTransform: 'translateZ(0)', // iOS Safari optimization
          // Enhanced scroll optimization
          touchAction: 'pan-y', // Only allow vertical scrolling
          overscrollBehavior: 'contain' // Prevent scroll chaining
        }}
        aria-label="Mobile homepage content"
      >
        {/* Navigation Bar - Fixed Header in Flexbox Layout */}
        <header
          role="banner"
          style={{
            position: 'sticky', // Changed to sticky for better mobile behavior
            top: '0px',
            width: 'calc(100% - 40px)', // Reduced width by additional 20px (total 40px reduction)
            height: isScrolled ? '70px' : '97px',
            background: isScrolled ? 'rgba(0, 0, 0, 0.95)' : '#000000',
            backdropFilter: isScrolled ? 'blur(10px)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 15px', // Reduced padding from 20px to 15px
            margin: '0 20px', // Increased margin to center the further reduced nav bar
            boxSizing: 'border-box',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: 200,
            borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            flexShrink: 0 // Prevent header from shrinking
          }}
          aria-label="Main navigation"
        >
          {/* Menu Button - Right Side */}
          <div
            onClick={toggleMenu}
            className="mobile-menu-button"
            style={{
              position: 'absolute',
              right: '15px', // Adjusted to match reduced nav bar padding
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

        {/* Main Content Area - Scrollable Flex Container */}
        <div
          ref={contentRef}
          className="mobile-content-container"
          style={{
            flex: '1 1 auto', // Take remaining space in flex container
            width: '100%',
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '5px 0px 40px 0px', // Reduced top padding from 20px to 5px
            paddingBottom: getDynamicBottomSpacing(),
            boxSizing: 'border-box',
            overflow: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            scrollBehavior: 'smooth',
            // Remove transition that can interfere with scrolling
            touchAction: 'pan-y', // Allow only vertical scrolling
            scrollSnapType: 'none' // Disable scroll snapping that can cause jitter
          }}
        >
          {/* Hero Video Section */}
          <section
            aria-labelledby="hero-video-title"
            style={{ width: '100%', marginTop: '2px', marginBottom: '20px' }} // Reduced to almost nothing
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
                width: 'min(350px, calc(100vw - 50px))', // Adjusted to account for container padding (25px each side)
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
                    allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture; web-share; fullscreen"
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
                width: 'min(350px, calc(100vw - 50px))', // Adjusted to match hero card width exactly (25px each side)
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                margin: '0 auto 20px auto', // Center the container
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

          {/* Featured Events - Multiple Hero Cards using original styling */}
          {featuredEventCards.length > 0 && featuredEventCards.map((featuredEvent, heroIndex) => (
            <div
              key={`hero-${featuredEvent.id}`}
              className={cardsAnimated ? 'event-card-spring' : 'event-card-hidden'}
              style={{
                width: '100%',
                padding: '0', // Remove padding to let inner element control width
                marginBottom: '20px',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center', // Center the hero card
                animationDelay: cardsAnimated ? `${heroIndex * 0.1}s` : '0s' // Stagger animations
              }}
            >
            <div
              onClick={(e) => {
                // Navigate to featured event image expansion
                const imgElement = e.currentTarget.querySelector('img');
                handleImageExpand(featuredEvent, imgElement);
              }}
              style={{
                width: 'min(350px, calc(100vw - 50px))', // Adjusted to ensure consistent width across all elements (25px each side)
                height: 'min(350px, calc(100vw - 50px))', // Maintain square aspect ratio
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
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
              >
                {/* Dynamic Event Image or Fallback */}
                {featuredEvent.coverImage ? (
                  <picture>
                    <source
                      srcSet={getAVIFSrcSet(featuredEvent.coverImage, 'hero')}
                      sizes="(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px"
                      type="image/avif"
                    />
                    <source
                      srcSet={getResponsiveSrcSet(featuredEvent.coverImage, 'hero')}
                      sizes="(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px"
                      type="image/webp"
                    />
                    <img
                      src={getOptimizedImageUrl(featuredEvent.coverImage, 375)}
                      alt={`${featuredEvent.title} - Featured Event`}
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      onLoad={() => console.log('✅ MOBILE FEATURED EVENT HERO IMAGE LOADED:', featuredEvent.title)}
                      onError={(e) => {
                        console.error('❌ MOBILE FEATURED EVENT HERO IMAGE FAILED:', e.target.src);
                        // Fallback to default hero image
                        e.target.src = '/images/optimized/hero-left-image-375w.jpg';
                      }}
                      style={{
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 1
                      }}
                    />
                  </picture>
                ) : (
                  /* Fallback to default hero image when no featured events */
                  <picture>
                    <source
                      srcSet="/images/optimized/hero-left-image-320w.avif 320w, /images/optimized/hero-left-image-375w.avif 375w, /images/optimized/hero-left-image-414w.avif 414w, /images/optimized/hero-left-image-640w.avif 640w"
                      sizes="(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px"
                      type="image/avif"
                    />
                    <source
                      srcSet="/images/optimized/hero-left-image-320w.webp 320w, /images/optimized/hero-left-image-375w.webp 375w, /images/optimized/hero-left-image-414w.webp 414w, /images/optimized/hero-left-image-640w.webp 640w"
                      sizes="(max-width: 320px) 320px, (max-width: 375px) 375px, (max-width: 414px) 414px, 640px"
                      type="image/webp"
                    />
                    <img
                      src="/images/optimized/hero-left-image-375w.jpg"
                      alt="Default Hero Background"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      onLoad={() => console.log('✅ MOBILE DEFAULT HERO IMAGE LOADED')}
                      onError={(e) => console.error('❌ MOBILE DEFAULT HERO IMAGE FAILED:', e.target.src)}
                      style={{
                        position: 'absolute',
                        left: '0px',
                        top: '0px',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 1
                      }}
                    />
                  </picture>
                )}
              </div>

              {/* Mobile-Optimized Gradient Overlay - Outside image container for better mobile rendering */}
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  top: '0px',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0.90) 90%)`,
                  borderRadius: '20px',
                  pointerEvents: 'none',
                  zIndex: 2,
                  // Mobile-specific optimizations
                  WebkitTransform: 'translateZ(0)', // Force hardware acceleration on iOS
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden'
                }}
              />

              {/* Bottom overlay with date and location - Fixed positioning */}
              <div
                style={{
                  position: 'absolute',
                  left: '0px',
                  bottom: '16px', // More space from bottom to prevent button cutoff
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '0px 16px',
                  gap: '12px', // Reduced gap to make more room for wider button
                  boxSizing: 'border-box',
                  zIndex: 3,
                  minHeight: '44px' // Ensure minimum height for button container
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: '1',
                    padding: '4px 0px',
                    flexDirection: 'column',
                    minWidth: 0,
                    maxWidth: 'calc(100% - 122px)' // Reserve space for wider button (110px + 12px gap)
                  }}
                >
                  {/* Date row - Enhanced styling */}
                  <div
                    style={{
                      display: 'flex',
                      alignSelf: 'stretch',
                      alignItems: 'center',
                      gap: '6px', // Slightly more gap for better readability
                      minWidth: 0,
                      marginBottom: '2px' // Small margin for separation
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
                      {featuredEvent.eventDate
                        ? new Date(featuredEvent.eventDate).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          }).replace(',', 'th,')
                        : featuredEvent.date || "March 29th, 9:00 P.M."
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
                      {featuredEvent.location || "Asbury Park, NJ"}
                    </span>
                  </div>
                </div>

                {/* CTA Button - Wider and better positioned */}
                <div
                  style={{
                    display: 'flex',
                    width: '110px', // Increased from 90px for better button size
                    height: '40px', // Increased from 36px for better touch target
                    padding: '2px', // Reduced padding to maximize button size
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0, // Prevent button from shrinking
                    zIndex: 3
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      width: '106px', // Match container width minus padding
                      height: '36px', // Good height for mobile touch
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '6px', // Slightly reduced gap for better fit
                      borderRadius: '20px', // More modern, less rounded
                      background: 'rgba(56, 56, 56, 0.85)', // Slightly more opaque for better visibility
                      border: '1px solid rgba(255, 255, 255, 0.15)', // Subtle border for definition
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: 'scale(1)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' // Add shadow for depth
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      e.target.style.transform = 'scale(0.96)';
                      e.target.style.background = 'rgba(76, 76, 76, 0.90)';
                      e.target.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.4)';
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      e.target.style.transform = 'scale(1)';
                      e.target.style.background = 'rgba(56, 56, 56, 0.85)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
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
                  {featuredEvent.title || "FEATURED EVENT"}
                </div>
              </div>
            </div>
          </div>
          ))}

          {/* Fallback Hero when no featured events */}
          {featuredEventCards.length === 0 && (
            <div
              className={cardsAnimated ? 'event-card-spring' : 'event-card-hidden'}
              style={{
                width: '100%',
                padding: '0',
                marginBottom: '20px',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: 'min(350px, calc(100vw - 50px))',
                  height: 'min(350px, calc(100vw - 50px))',
                  position: 'relative',
                  margin: '0 auto',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.90) 90%)'
                }}
              >
                <img
                  src="/images/optimized/hero-left-image-375w.jpg"
                  alt="Default Hero Background"
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    zIndex: 1
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: '0px',
                    bottom: '95px',
                    display: 'flex',
                    width: '100%',
                    height: '48px',
                    padding: '8px 16px',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-end',
                    gap: '10px',
                    boxSizing: 'border-box',
                    zIndex: 2
                  }}
                >
                  <div
                    style={{
                      color: '#FFF',
                      fontFamily: 'Inter',
                      fontSize: '24px',
                      fontWeight: '800',
                      lineHeight: '1.1'
                    }}
                  >
                    UPCOMING EVENTS
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
              width: 'min(350px, calc(100vw - 50px))', // Adjusted to match hero card width exactly (25px each side)
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              gap: '8px', // Reduced gap for tighter spacing
              flexShrink: 0,
              margin: '0 auto', // Center the container
              marginBottom: '20px',
              boxSizing: 'border-box',
              minHeight: 'auto',
              overflow: 'visible',
              position: 'relative',
              zIndex: 1
            }}
          >
            {/* Homepage Event Cards - Small Layout */}
            {homepageEventCards.length > 0 ? (
              homepageEventCards.map((card, index) => (
                  <article
                    key={`homepage-${card.id}`}
                    className={cardsAnimated ? 'event-card-spring' : 'event-card-hidden'}
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
                      margin: '0 0 8px 0', // Reduced margin for tighter spacing
                      padding: '2px', // Reduced to 2px maximum for compact design
                      animationDelay: cardsAnimated ? `${0.1 + (index * 0.05)}s` : '0s',
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
                          const imgElement = e.currentTarget.querySelector('img');
                          handleImageExpand(card, imgElement);
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.transform = 'scale(0.95)';
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          e.currentTarget.style.transform = 'scale(1)';
                          const imgElement = e.currentTarget.querySelector('img');
                          handleImageExpand(card, imgElement);
                        }}
                        onTouchCancel={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onMouseDown={(e) => {
                          e.currentTarget.style.transform = 'scale(0.95)';
                        }}
                        onMouseUp={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        {/* Event Background Image */}
                        <img
                          src={(() => {
                            const optimizedUrl = getOptimizedImageUrl(card.coverImage, 120);
                            console.log(`🖼️ Loading homepage image for "${card.title}":`, {
                              original: card.coverImage,
                              optimized: optimizedUrl,
                              isDataUrl: card.coverImage?.startsWith('data:')
                            });
                            return optimizedUrl;
                          })()}
                          alt={`${card.title} event cover`}
                          loading="lazy"
                          onError={(e) => {
                            console.log('❌ Homepage event image failed to load:', card.title, 'URL:', e.target.src);
                            console.log('🔄 Image fallback sequence starting for:', e.target.src);
                            console.log('🔍 Original card.coverImage:', card.coverImage);

                            const currentAttempt = parseInt(e.target.dataset.fallbackAttempt || '0');
                            console.log('🔍 Current attempt:', currentAttempt);

                            // Enhanced fallback sequence
                            if (currentAttempt === 0) {
                              // First fallback: try with different image optimization
                              if (card.coverImage) {
                                const fallbackUrl = card.coverImage.replace(/\?.*$/, '') + '?w=120&h=120&fit=crop&auto=format';
                                console.log('🔄 Trying optimized fallback:', fallbackUrl);
                                e.target.src = fallbackUrl;
                                e.target.dataset.fallbackAttempt = '1';
                                return;
                              }
                            } else if (currentAttempt === 1) {
                              // Second fallback: try original URL without optimization
                              if (card.coverImage) {
                                console.log('🔄 Trying original URL without optimization');
                                e.target.src = card.coverImage.replace(/\?.*$/, '');
                                e.target.dataset.fallbackAttempt = '2';
                                return;
                              }
                            } else if (currentAttempt === 2) {
                              // Third fallback: try JPEG version
                              if (card.coverImage) {
                                const jpegUrl = card.coverImage.replace(/\.(webp|avif|png)(\?.*)?$/i, '.jpg$2');
                                if (jpegUrl !== card.coverImage) {
                                  console.log('🔄 Trying JPEG version:', jpegUrl);
                                  e.target.src = jpegUrl;
                                  e.target.dataset.fallbackAttempt = '3';
                                  return;
                                }
                              }
                            }

                            // Final fallback: use placeholder
                            console.log('🔄 Using final placeholder');
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K';
                          }}
                          onLoad={(e) => {
                            // Clear fallback tracking on successful load
                            delete e.target.dataset.fallbackAttempt;
                            console.log('✅ Homepage event image loaded successfully:', card.title, e.target.src);
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
            ) : (
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
            )}

          </div>
          </section>
        </div>

        {/* Footer Section */}
        <footer
          style={{
            width: '100%',
            padding: '40px 16px 20px',
            textAlign: 'center',
            background: 'transparent'
          }}
        >
          <div
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'Inter',
              fontSize: '12px',
              fontWeight: '300',
              lineHeight: '1.5'
            }}
          >
            © 2024 BOUNCE2BOUNCE. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Mobile Drawer - Enhanced Animation Component */}
      <div
        ref={drawerRef}
        className={`mobile-drawer ${drawerExpanded ? 'expanded' : 'collapsed'} ${showDisclaimer ? 'disclaimer-peek' : ''}`}
        style={{
          height: getDrawerHeight(),
          transform: drawerFullyClosed
            ? 'translate3d(0, 100%, 0)'
            : drawerExpanded
              ? 'translate3d(0, 0, 0)'
              : 'translate3d(0, calc(100% - 80px), 0)',
          transition: 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.2s ease-out',
          willChange: 'transform, height',
          backfaceVisibility: 'hidden',
          zIndex: 1000
        }}
        onClick={handleDrawerClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-label="Contact form drawer"
        aria-expanded={drawerExpanded}
      >
        {/* Drawer Handle */}
        <div
          style={{
            width: '40px',
            height: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '2px',
            margin: '8px auto 16px',
            cursor: 'pointer'
          }}
          aria-hidden="true"
        />

        {/* Drawer Content */}
        <div
          className={`drawer-content ${showVerification ? 'verification-mode' : ''}`}
          style={{
            padding: '0 20px 20px',
            opacity: drawerFullyClosed ? 0 : 1,
            transition: 'opacity 0.2s ease'
          }}
        >
          {/* Text Us Group - Hidden during verification */}
          {!drawerFullyClosed && !showVerification && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                marginBottom: '12px',
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

          {/* Laylo Integration - RESTORED to working configuration */}
          {!drawerFullyClosed && !showVerification && (
            <div
              onClick={handleIframeClick}
              style={{
                width: '100%', // Match text content width exactly
                margin: '8px 0 0 0', // Remove auto margins to align with text content
                cursor: 'pointer',
                borderRadius: '8px',
                overflow: 'visible',
                flexShrink: 0
              }}
            >
              <LayloIframe
                dropId="1nTsX"
                color="ff0409"
                theme="dark"
                background="solid"
                minimal={true}
                style={{
                  width: '100%', // Match text content width exactly
                  height: iframeExpanded ? '200px' : '160px',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'transparent',
                  display: 'block',
                  transition: 'opacity 0.3s ease, height 0.3s ease',
                  pointerEvents: 'auto'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Expanded Image Modal */}
    {expandedImage && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.15)', // Barely covering - very transparent
          backdropFilter: 'blur(60px)', // Heavy blur for glassmorphism effect
          WebkitBackdropFilter: 'blur(60px)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box',
          animation: 'expandedImageFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
        }}
        onClick={handleImageCollapse}
      >
        {/* Expanded Image */}
        <div
          style={{
            width: 'min(80vw, 80vh)',
            height: 'min(80vw, 80vh)',
            aspectRatio: '1 / 1',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '20px',
            animation: 'expandedImageScale 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border for definition
            cursor: 'pointer'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={expandedImage.imageUrl}
            alt={expandedImage.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            animation: 'expandedButtonsSlideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s both'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Share Button - Consistent styling with View Event button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: expandedImage.title,
                  text: `Check out this event: ${expandedImage.title}`,
                  url: window.location.href
                });
              } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            style={{
              background: 'rgba(22, 22, 22, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '25px',
              padding: '12px 24px',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              minWidth: '80px',
              height: '44px'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = 'rgba(60, 60, 60, 0.8)';
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = 'rgba(22, 22, 22, 0.8)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(60, 60, 60, 0.8)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(22, 22, 22, 0.8)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Share
          </button>

          {/* View Event Button - Styled to match Share button */}
          {expandedImage.isRealEvent && expandedImage.hasTicketLink ? (
            <button
              onClick={() => {
                console.log(`🎫 Opening ticket link from modal for ${expandedImage.title}:`, expandedImage.ticketsUrl);
                window.open(expandedImage.ticketsUrl, '_blank', 'noopener,noreferrer');
                handleImageCollapse();
              }}
              style={{
                background: 'rgba(49, 157, 255, 0.9)',
                border: '1px solid rgba(49, 157, 255, 0.3)',
                borderRadius: '25px',
                padding: '12px 24px',
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                minWidth: '100px',
                height: '44px'
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.background = 'rgba(49, 157, 255, 1)';
                e.currentTarget.style.transform = 'scale(0.95)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.background = 'rgba(49, 157, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(49, 157, 255, 1)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(49, 157, 255, 0.9)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {expandedImage.buttonText || 'View Event'}
            </button>
          ) : (
            /* Hidden when no ticket link */
            null
          )}
        </div>
      </div>
    )}

    {/* Mobile Navigation Overlay */}
    {showMenu && (
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
        onClick={() => setShowMenu(false)}
      >
        {/* Navigation Bar in Menu */}
        <div
          style={{
            width: '100%',
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
          {/* Close Button (X) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
            }}
            style={{
              position: 'absolute',
              right: '15px',
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
            {/* X Icon */}
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

          {/* Logo in Menu */}
          <img
            src="/images/mobile-figma/b2b-logo-mobile.svg"
            alt="B2B Logo"
            style={{
              width: '138.41px',
              height: '43px',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation('/');
            }}
          />
        </div>

        {/* Navigation Menu Items */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '430px',
            margin: '0 auto',
            padding: '40px 25px',
            gap: '24px',
            transform: showMenu ? 'translateY(0)' : 'translateY(-20px)',
            opacity: showMenu ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDelay: showMenu ? '0.2s' : '0s'
          }}
          onClick={(e) => e.stopPropagation()}
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
              opacity: 1,
              transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
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
              opacity: 1,
              transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
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
              opacity: 1,
              transform: showMenu ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.15s ease-out',
              transitionDelay: showMenu ? '0.5s' : '0s'
            }}
          >
            Contact
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default FigmaMobile;
