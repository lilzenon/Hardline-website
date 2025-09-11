import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from 'react';
import { useOptimizedScroll } from '../hooks/useOptimizedScroll';
import { useAnalytics } from '../hooks/useAnalytics';
import { useHomepageData } from '../hooks/useHomepageData';
import SocialMediaButtons from './SocialMediaButtons';
import PrivacyConsentModal from './PrivacyConsentModal';
import MobileNavigation from './MobileNavigation';
import MobileDrawer from './MobileDrawer';
import LayloIframe from './LayloIframe';
import BrandedLoader from './BrandedLoader';

// REMOVED: LayloIframe component definition - now using shared component from ./LayloIframe



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

      // Build optimized URL using the dashboard domain - FIXED: use proper localhost URL
      const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';

      // Use appropriate variant based on width with optimized size selection
      let variant = 'small'; // Default to small for event cards (111px display) - OPTIMIZED
      if (width) {
        if (width <= 150) variant = 'thumbnail';  // 150x150 for very small displays
        else if (width <= 300) variant = 'small'; // 300x300 for event cards
        else if (width <= 600) variant = 'medium'; // 600x600 for larger cards
        else if (width <= 1200) variant = 'large'; // 1200x1200 for hero images
        else variant = 'large'; // Use large for anything bigger
      }

      const optimizedUrl = `${dashboardDomain}/api/images/serve/${uuid}/${variant}`;

      console.log('✅ Generated optimized URL for new image system:', optimizedUrl, `(variant: ${variant}, width: ${width})`);
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
  // Optimized sizes based on actual display requirements and available variants
  if (context === 'event') return [150, 300, 450]; // thumbnail, small, medium variants
  if (context === 'hero') return [600, 900, 1200]; // medium, large, large variants
  return [150, 300, 600]; // Default: thumbnail, small, medium variants
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

// API caching now handled by useHomepageData hook

// Helper function to convert image URLs to working dashboard endpoints
const getDashboardImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // If already absolute URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Handle relative URLs
  if (imageUrl.startsWith('/')) {
    // Check if it's a working API endpoint (preferred method)
    if (imageUrl.startsWith('/api/images/serve/')) {
      // 🚨 CRITICAL FIX: Always use admin domain in production
      // For development: use proxy path
      // For production: use production dashboard domain
      if (window.location.hostname === 'localhost') {
        return imageUrl; // Vite proxy will handle /api/* routes
      } else {
        // PRODUCTION: Always use admin domain to avoid 500 errors
        return `https://admin.b2b.click${imageUrl}`;
      }
    }

    // REMOVED: Temp storage fallback logic - all images should use persistent storage pipeline
    // If we encounter temp storage paths, log error and return null to trigger proper fallback
    if (imageUrl.startsWith('/static/uploads/temp/') || imageUrl.startsWith('/static/uploads/')) {
      console.error('🚨 CRITICAL: Temp storage path detected - image processing pipeline failed:', imageUrl);
      console.error('🔧 This should not happen with the new persistent storage system');
      console.error('📋 Please check image upload pipeline and database records');
      return null; // Return null to trigger proper image fallback handling
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
// Cache duration and date formatting now handled by useHomepageData hook

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

  // REMOVED: Mobile lifecycle management - using standard timers instead

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
    // Load Laylo SDK script only once with proper error handling
    if (!document.querySelector('script[src="https://embed.laylo.com/laylo-sdk.js"]')) {
      const layloScript = document.createElement('script');
      layloScript.src = 'https://embed.laylo.com/laylo-sdk.js';
      layloScript.async = true;
      layloScript.defer = true; // 🔧 FIXED: Add defer to prevent blocking

      // 🔧 FIXED: Add error handling to prevent crashes
      layloScript.onerror = (error) => {
        console.warn('⚠️ Laylo SDK failed to load in FigmaMobile:', error);
      };

      layloScript.onload = () => {
        console.log('✅ Laylo SDK script loaded successfully in FigmaMobile');
      };

      document.head.appendChild(layloScript);
    }
  }, []);

  // REMOVED: showMenu state - now handled by MobileNavigation component
  // TEMPORARY: Keep old drawer state variables until migration is complete
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

  // TEMPORARY: Keep resend countdown state until migration is complete
  const [resendCountdown, setResendCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [resendSubmitting, setResendSubmitting] = useState(false);

  // TEMPORARY: Keep touch state until migration is complete
  const [touchState, setTouchState] = useState({
    isActive: false,
    startY: 0,
    currentY: 0,
    startTime: 0,
    isDragging: false,
    initialDrawerState: false
  });

  // Homepage data managed by useHomepageData hook
  const {
    loading,
    error,
    homeSettings,
    showAllEvents,
    setShowAllEvents,
    filteredFeaturedEvents,
    filteredHomepageEvents
  } = useHomepageData();

  // Event Filter Toggle State - now managed by useHomepageData hook

  // Viewport context state for dynamic spacing
  const [viewportContext, setViewportContext] = useState(0); // Force re-render when viewport context changes

  // REMOVED: Duplicate touchState declaration - using the one above

  // Animation state for cards
  const [cardsAnimated, setCardsAnimated] = useState(false);
  const [sectionsAnimated, setSectionsAnimated] = useState(false);

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
      const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
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

  // 🚀 JITTER FIX: Optimized scroll state to prevent navigation jitter
  const { scrollY, isScrolled } = useOptimizedScroll(contentRef.current, {
    threshold: 20,
    throttleMs: 32, // 🚀 JITTER FIX: Increased throttling to 30fps to reduce navigation jitter
    passive: true // Ensure completely passive event handling
  });

  // 📱 ENHANCED: Body scroll lock when drawer is expanded (iOS Safari support)
  useEffect(() => {
    const body = document.body;
    const contentContainer = contentRef.current;

    if (drawerExpanded) {
      // Lock main page scroll when drawer is expanded
      const scrollY = window.scrollY;
      body.classList.add('drawer-scroll-lock');
      body.style.top = `-${scrollY}px`;

      if (contentContainer) {
        contentContainer.classList.add('drawer-active');
      }
    } else {
      // Restore main page scroll when drawer is collapsed
      body.classList.remove('drawer-scroll-lock');
      const scrollY = body.style.top;
      body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }

      if (contentContainer) {
        contentContainer.classList.remove('drawer-active');
      }
    }

    // Cleanup on unmount
    return () => {
      body.classList.remove('drawer-scroll-lock');
      body.style.top = '';
      if (contentContainer) {
        contentContainer.classList.remove('drawer-active');
      }
    };
  }, [drawerExpanded]);

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

      // Environment-aware API URL construction
      const apiBaseUrl = window.location.hostname === 'localhost'
        ? '' // Development: use Vite proxy
        : 'https://admin.b2b.click'; // Production: use dashboard server directly

      const response = await fetch(`${apiBaseUrl}/api/home-settings/submit-phone`, {
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

      // Environment-aware API URL construction
      const apiBaseUrl = window.location.hostname === 'localhost'
        ? '' // Development: use Vite proxy
        : 'https://admin.b2b.click'; // Production: use dashboard server directly

      const response = await fetch(`${apiBaseUrl}/api/home-settings/verify-phone`, {
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

  // Data fetching now handled by useHomepageData hook

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

      // Environment-aware API URL construction
      const apiBaseUrl = window.location.hostname === 'localhost'
        ? '' // Development: use Vite proxy
        : 'https://admin.b2b.click'; // Production: use dashboard server directly

      const response = await fetch(`${apiBaseUrl}/api/home-settings/resend-verification`, {
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

  // Data fetching and performance monitoring now handled by useHomepageData hook
  // Animate cards and sections after data loads
  useEffect(() => {
    if (!loading) {
      // 🎬 OPTIMIZED: Modern staggered animations with proper timing
      // Based on Material Design and Apple HIG best practices
      setTimeout(() => {
        setCardsAnimated(true);
      }, 150); // Optimal delay for perceived performance

      setTimeout(() => {
        setSectionsAnimated(true);
      }, 300); // Proper stagger timing (150ms between elements)
    }
  }, [loading]);

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
    if (filteredFeaturedEvents && filteredFeaturedEvents.length > 0) {
      console.log('🚀 Preloading critical event images for instant display...');

      // Preload first 2 event images (above-the-fold on mobile)
      const isSafariMobile = /iPhone|iPad|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

      filteredFeaturedEvents.slice(0, 2).forEach((event, index) => {
        if (event.coverImage) {
          // Skip AVIF preloading for Safari mobile and internal API images, go straight to WebP
          if (!isSafariMobile && !event.coverImage.includes('/api/images/serve/')) {
            const avifLink = document.createElement('link');
            avifLink.rel = 'preload';
            avifLink.as = 'image';
            avifLink.type = 'image/avif';
            const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
            avifLink.href = `${dashboardDomain}/images/proxy-optimized?url=${encodeURIComponent(event.coverImage)}&w=120&format=avif`;
            document.head.appendChild(avifLink);
          }

          // Preload optimized version for mobile (use small variant for better performance)
          const webpLink = document.createElement('link');
          webpLink.rel = 'preload';
          webpLink.as = 'image';
          webpLink.type = 'image/webp';
          webpLink.href = getOptimizedImageUrl(event.coverImage, 300); // Use small variant (300x300)
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
  }, [filteredFeaturedEvents]);

  // Scroll handling now optimized with useOptimizedScroll hook

  // Featured events processing now handled by useHomepageData hook
  // Using filteredFeaturedEvents directly








  // Homepage events processing now handled by useHomepageData hook
  // Using filteredHomepageEvents directly






  // 📱 REFINED EXPANDABLE EVENT CARDS STATE
  const [isEventSectionExpanded, setIsEventSectionExpanded] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  // REMOVED: toggleMenu function - now handled by MobileNavigation component

  // Enhanced toggle expandable event section with animation state
  const toggleEventSection = () => {
    if (!isEventSectionExpanded) {
      // Expanding: trigger animation state
      setIsExpanding(true);
      setIsEventSectionExpanded(true);
      // Reset animation state after animation completes
      setTimeout(() => setIsExpanding(false), 600);
    } else {
      // Collapsing: immediate state change
      setIsEventSectionExpanded(false);
      setIsExpanding(false);
    }
  };

  // 🔧 ENHANCED: Current page detection for active state styling
  const getCurrentPage = () => {
    const pathname = window.location.pathname;
    if (pathname === '/' || pathname === '') return 'events';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/contact')) return 'contact';
    return 'events'; // Default fallback
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage());

  // Update current page when navigation occurs
  useEffect(() => {
    const updateCurrentPage = () => {
      setCurrentPage(getCurrentPage());
    };

    // Listen for navigation changes
    window.addEventListener('popstate', updateCurrentPage);

    // Check on mount and when location changes
    updateCurrentPage();

    return () => {
      window.removeEventListener('popstate', updateCurrentPage);
    };
  }, []);

  // 🚀 INSTANT: Direct navigation without any delays or loading states
  const handleNavigation = (path) => {
    if (path === '/') {
      // Already on homepage, just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // INSTANT navigation - no transitions, no loading states, no delays
    window.location.href = path;
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
      // Real mobile device: Drastically reduced spacing while keeping social buttons visible
      return `calc(${drawerHeight} + 20px)`;
    } else {
      // Desktop browser mobile simulation: Minimal spacing
      const reducedSpacing = Math.max(15, baseSpacing * 0.2); // Minimum 15px, or 20% of drawer height
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

  // YouTube thumbnail component for preloading - FIXED: Simplified positioning
  const YouTubeThumbnail = useMemo(() => (
    <div
      onClick={handleYoutubeThumbnailClick}
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        backgroundImage: 'url(https://img.youtube.com/vi/vEHTO3gf1jk/maxresdefault.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // FIXED: Optimize for mobile scroll performance
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transition: 'transform 0.2s ease-out'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'translateZ(0) scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateZ(0) scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateZ(0) scale(1)';
      }}
      onTouchStart={(e) => {
        e.currentTarget.style.transform = 'translateZ(0) scale(0.98)';
      }}
      onTouchEnd={(e) => {
        e.currentTarget.style.transform = 'translateZ(0) scale(1)';
      }}
    />
  ), [handleYoutubeThumbnailClick]);

  // Show smooth branded loading state for mobile
  if (loading) {
    return (
      <BrandedLoader
        message={error ? "Loading with fallback data..." : "Loading mobile experience..."}
        fullScreen={true}
        minDisplayTime={600}
        showMessage={true}
      />
    );
  }

  return (
    <>
      {/* 📱 MOBILE SCROLL PERFORMANCE FIX */}
      <link rel="stylesheet" href="/css/mobile-scroll-fix.css" />

      {/* Mobile-specific CSS with dynamic background matching */}
      <style>
        {`
          /* 📱 CSS CUSTOM PROPERTIES FOR PERFECT BACKGROUND MATCHING & ULTRA-SMOOTH ANIMATIONS */
          :root {
            --mobile-bg-primary: #161616;
            --mobile-bg-secondary: #000000;
            --mobile-bg-rgba-primary: 22, 22, 22;
            --mobile-bg-rgba-secondary: 0, 0, 0;
            /* 🎬 OPTIMIZED: Modern animation timing based on best practices */
            --animation-duration-fast: 200ms;
            --animation-duration-normal: 300ms;
            --animation-duration-slow: 400ms;
            --animation-easing-standard: cubic-bezier(0.25, 0.46, 0.45, 0.94);
            --animation-easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);
            --animation-easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
            --animation-stagger-delay: 100ms;
            /* Legacy support - gradually migrate away from these */
            --ultra-smooth-duration: var(--animation-duration-normal);
            --ultra-smooth-easing: var(--animation-easing-standard);
            --smooth-easing-fast: var(--animation-easing-decelerate);
            /* Performance optimization variables */
            --gpu-acceleration: translateZ(0);
            --smooth-rendering: antialiased;
          }

          /* 🎯 ACCESSIBILITY: Respect user's motion preferences */
          @media (prefers-reduced-motion: reduce) {
            :root {
              --animation-duration-fast: 0ms;
              --animation-duration-normal: 0ms;
              --animation-duration-slow: 0ms;
              --animation-stagger-delay: 0ms;
              --ultra-smooth-duration: 0ms;
            }
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }

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

          /* 📱 MOBILE SCROLL PERFORMANCE FIX - Ultra-stable approach */
          html, body {
            /* Remove problematic smooth scrolling */
            scroll-behavior: auto;
            /* Enable native momentum scrolling */
            -webkit-overflow-scrolling: auto;
            /* Essential mobile optimizations only */
            -webkit-text-size-adjust: 100%;
            touch-action: manipulation;
            /* Remove forced hardware acceleration */
            transform: none;
            will-change: auto;
            /* FIXED: Prevent any scroll position manipulation */
            scroll-snap-type: none;
            -webkit-scroll-snap-type: none;
            /* Ensure stable layout during scroll */
            contain: layout;
          }

          /* Fix mobile viewport without breaking scroll */
          html, body {
            width: 100%;
            height: 100%;
            overflow: visible; /* Allow natural scrolling */
            overscroll-behavior: contain; /* Prevent scroll chaining only */
          }

          /* FIXED: Mobile container with proper overflow control */
          .mobile-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            height: -webkit-fill-available;
            /* FIXED: Control overflow to prevent hidden elements from showing */
            overflow: hidden;
            /* Ensure proper scroll containment */
            overscroll-behavior: contain;
          }

          /* Optimize touch interactions for iOS */
          .mobile-drawer, button, input {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Enable hardware acceleration */
          .mobile-drawer {
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

          /* 📱 ULTRA-STABLE MOBILE NAVIGATION WITH SCROLL ISOLATION */
          .mobile-navigation-header {
            /* Prevent any layout shifts from navigation changes */
            contain: strict;
            /* Isolate navigation animations from scroll */
            isolation: isolate;
            /* Prevent reflow during scroll state changes */
            will-change: background-color, backdrop-filter;
            /* FIXED: Prevent scroll events on navigation from affecting main page */
            touch-action: none;
            pointer-events: auto;
            /* Ensure navigation doesn't interfere with main scroll */
            overscroll-behavior: contain;
          }

          /* 📱 OPTIMIZED MOBILE SCROLL CONTAINER */
          .mobile-content-container {
            /* Native iOS momentum scrolling */
            -webkit-overflow-scrolling: touch;
            /* Remove problematic smooth scrolling */
            scroll-behavior: auto;
            /* Prevent scroll chaining */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* Disable scroll snapping that causes jitter */
            scroll-snap-type: none;
            /* Allow only vertical scrolling */
            touch-action: pan-y;
            /* Minimal rendering optimization */
            contain: layout style;
            /* Remove will-change to prevent unnecessary compositing */
            will-change: auto;
            /* Minimal hardware acceleration */
            transform: translateZ(0);
            backface-visibility: hidden;
          }

          .mobile-phone-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }
          .mobile-phone-input:focus {
            outline: none;
            font-size: 16px !important;
          }

          /* REMOVED: Mobile menu button CSS - now handled by shared MobileNavigation component */

          /* REMOVED: All mobile navigation CSS - now handled by shared MobileNavigation component */

          /* REMOVED: Navigation overlay CSS - now handled by shared MobileNavigation component */
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

          /* 📱 ULTRA-SMOOTH EXPANDABLE EVENT CARDS SECTION */
          .mobile-event-cards-container {
            position: relative;
            overflow: hidden;
            background: #000000; /* Match main page background - pure black */
            /* 🎬 OPTIMIZED: Smooth animation with reasonable timing */
            transition:
              max-height var(--animation-duration-slow) var(--animation-easing-standard),
              transform var(--animation-duration-slow) var(--animation-easing-standard),
              opacity var(--animation-duration-slow) var(--animation-easing-standard);
            /* GPU acceleration for smooth performance */
            will-change: auto; /* Let browser optimize */
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            /* Optimize rendering for ultra-smooth performance */
            contain: layout style paint;
            transform-style: preserve-3d;
            /* Additional performance optimizations */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            /* Prevent layout thrashing during animation */
            overflow-anchor: none;
          }

          .mobile-event-cards-container.collapsed {
            /* Show exactly 3 complete cards with balanced vertical spacing */
            max-height: calc(3 * 136px + 16px + 100px); /* 3 cards (408px) + padding (16px) + gradient space (100px) */
            /* Additional smoothness optimizations for collapsed state */
            transform: scale3d(1, 1, 1);
            opacity: 1;
          }

          .mobile-event-cards-container.expanded {
            max-height: 2000px; /* Large enough for all cards */
            /* Additional smoothness optimizations for expanded state */
            transform: scale3d(1, 1, 1);
            opacity: 1;
          }

          /* Ultra-smooth professional gradient overlay */
          .mobile-event-cards-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 100px; /* Increased height for more gradual fade effect */
            /* Ultra-smooth gradient with 10 stops to eliminate banding */
            background: linear-gradient(
              to bottom,
              /* Extended transparent area at top to show more of third card */
              transparent 0%,
              transparent 40%,
              /* More gradual fade progression for smoother visual flow */
              rgba(0, 0, 0, 0.05) 42%,
              rgba(0, 0, 0, 0.12) 45%,
              rgba(0, 0, 0, 0.22) 48%,
              rgba(0, 0, 0, 0.35) 52%,
              rgba(0, 0, 0, 0.50) 56%,
              rgba(0, 0, 0, 0.65) 60%,
              rgba(0, 0, 0, 0.78) 65%,
              rgba(0, 0, 0, 0.90) 70%,
              rgba(0, 0, 0, 0.96) 75%,
              /* Solid black area for button placement */
              #000000 78%,
              #000000 100%
            );
            /* Minimal blur for performance while maintaining quality */
            backdrop-filter: blur(0.5px);
            -webkit-backdrop-filter: blur(0.5px);
            pointer-events: none;
            /* 🎬 OPTIMIZED: Reasonable transition timing for better performance */
            transition:
              opacity var(--animation-duration-normal) var(--animation-easing-standard),
              transform var(--animation-duration-normal) var(--animation-easing-standard);
            /* GPU acceleration for smooth overlay animation */
            will-change: auto; /* Let browser optimize */
            backface-visibility: hidden;
            transform: translateZ(0);
            z-index: 2;
          }

          /* Refined progressive blur overlay for smooth transitions */
          .mobile-event-cards-overlay::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            /* Ultra-smooth blur mask matching main gradient progression */
            background: linear-gradient(
              to bottom,
              /* Top 30%: No blur mask for clear visibility */
              transparent 0%,
              transparent 30%,
              /* Smooth blur progression from 30% to 70% */
              rgba(0, 0, 0, 0.03) 35%,
              rgba(0, 0, 0, 0.06) 40%,
              rgba(0, 0, 0, 0.10) 45%,
              rgba(0, 0, 0, 0.14) 50%,
              rgba(0, 0, 0, 0.18) 55%,
              rgba(0, 0, 0, 0.22) 60%,
              rgba(0, 0, 0, 0.26) 65%,
              rgba(0, 0, 0, 0.28) 68%,
              /* Consistent blur for bottom 30% solid area */
              rgba(0, 0, 0, 0.30) 70%,
              rgba(0, 0, 0, 0.30) 100%
            );
            /* Optimized blur for smooth performance */
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            pointer-events: none;
            z-index: 1;
          }



          .mobile-event-cards-overlay.hidden {
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          /* Modern expand/collapse handle - matching View Event button style */
          .mobile-expand-handle {
            position: absolute;
            bottom: 12px; /* Default position for collapsed state */
            left: 50%;
            transform: translateX(-50%) translateZ(0); /* Center horizontally + GPU acceleration */
            z-index: 5; /* Above all gradient layers */
            width: 120px; /* Wider to match button proportions */
            height: 32px; /* Consistent with View Event button height */
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border-radius: 46px; /* Match View Event button border radius */
            /* Dark glassmorphism matching View Event buttons */
            background: rgba(23, 23, 23, 0.8);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: none; /* Clean look like View Event buttons */
            /* Typography matching View Event buttons */
            font-family: 'Inter', sans-serif;
            font-weight: 500;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            /* Only animate background color - keep button position stable */
            transition: background-color 0.2s ease;
            /* GPU acceleration for smooth rendering */
            backface-visibility: hidden;
            touch-action: manipulation;
            box-sizing: border-box;
          }

          .mobile-expand-handle:hover {
            background: rgba(23, 23, 23, 0.9);
            /* No transform changes - keep button position stable */
          }

          .mobile-expand-handle:active {
            background: rgba(23, 23, 23, 0.7);
            /* No transform changes - keep button position stable */
          }

          /* Expanded state positioning - move button below all cards */
          .mobile-expand-handle.expanded {
            position: relative;
            bottom: auto;
            margin: 12px auto 0 auto; /* Reduced from 16px to 12px (~25% reduction) for closer positioning */
            transform: translateZ(0); /* Keep GPU acceleration, no other transforms */
            left: auto;
          }

          /* Modern centered chevron icon - ultra-smooth animation */
          .mobile-expand-chevron {
            width: 12px;
            height: 12px;
            border-right: 2px solid rgba(255, 255, 255, 0.9);
            border-bottom: 2px solid rgba(255, 255, 255, 0.9);
            border-radius: 0 1px 0 0;
            transform: rotate(45deg);
            /* Ultra-smooth chevron rotation with GPU acceleration */
            transition:
              transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1.0),
              border-color 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0);
            will-change: transform, border-color;
            backface-visibility: hidden;
            transform-origin: center;
            margin: 0;
            position: relative;
            top: -1px;
          }

          .mobile-expand-chevron.expanded {
            transform: rotate(-135deg);
            border-color: rgba(255, 255, 255, 1);
            top: 1px;
          }

          /* Simplified event card styling - no individual animations during expand/collapse */
          .mobile-event-card-item {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          /* Advanced smooth animation keyframes for ultra-fluid motion */
          @keyframes ultraSmoothExpand {
            0% {
              transform: scale3d(1, 0.3, 1);
              opacity: 0.8;
            }
            50% {
              transform: scale3d(1, 0.65, 1);
              opacity: 0.9;
            }
            100% {
              transform: scale3d(1, 1, 1);
              opacity: 1;
            }
          }

          @keyframes ultraSmoothCollapse {
            0% {
              transform: scale3d(1, 1, 1);
              opacity: 1;
            }
            50% {
              transform: scale3d(1, 0.65, 1);
              opacity: 0.9;
            }
            100% {
              transform: scale3d(1, 0.3, 1);
              opacity: 0.8;
            }
          }

          /* Enhanced animation classes for ultra-smooth transitions */
          .mobile-event-cards-container.animating-expand {
            animation: ultraSmoothExpand 2.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
          }

          .mobile-event-cards-container.animating-collapse {
            animation: ultraSmoothCollapse 2.8s cubic-bezier(0.25, 0.1, 0.25, 1.0) forwards;
          }

          /* Respect user motion preferences - FIXED: Only disable event card animations, not navigation */
          @media (prefers-reduced-motion: reduce) {
            .mobile-event-cards-container,
            .mobile-event-cards-overlay,
            .mobile-expand-handle,
            .mobile-expand-chevron,
            .mobile-event-card-item {
              transition: none !important;
              animation: none !important;
            }
            /* IMPORTANT: Do NOT disable navigation animations - they are essential for UX */
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
            /* ENHANCED: Complete scroll isolation for iOS Safari */
            touch-action: none; /* Prevent any touch scrolling on drawer container */
            user-select: none;
            -webkit-user-select: none;
            /* Complete containment isolation */
            contain: strict;
            /* iOS Safari specific optimizations */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            /* Prevent scroll bleed completely */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
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

          /* ENHANCED: Complete drawer scroll isolation with hidden scrollbars */
          .mobile-drawer-content {
            /* Complete scroll isolation from main page */
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
            /* iOS Safari specific scroll containment */
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            /* FIXED: Hide scrollbars while maintaining functionality */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE/Edge */
            /* Strict touch action for drawer content only */
            touch-action: pan-y pinch-zoom;
            /* Complete containment isolation */
            contain: strict;
            /* Prevent any scroll events from bubbling */
            position: relative;
            z-index: 1000;
            /* iOS momentum scrolling optimization */
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }

          /* FIXED: Hide WebKit scrollbars */
          .mobile-drawer-content::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
            background: transparent;
          }

          /* CRITICAL: Disable ONLY drawer content interaction when collapsed, keep handle clickable */
          .mobile-drawer.collapsed .mobile-drawer-content {
            pointer-events: none !important;
            touch-action: none !important;
            overflow: hidden !important;
            -webkit-overflow-scrolling: auto !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          /* ENSURE: Drawer handle remains clickable even when collapsed */
          .mobile-drawer.collapsed {
            pointer-events: auto !important; /* Allow clicks on the drawer container */
          }

          .mobile-drawer.collapsed > * {
            pointer-events: none !important; /* Disable all children */
          }

          .mobile-drawer.collapsed .drawer-handle,
          .mobile-drawer.collapsed [role="dialog"] {
            pointer-events: auto !important; /* Re-enable handle and dialog clicks */
          }

          /* CRITICAL: Disable drawer content interaction when parent is collapsed */
          .mobile-drawer.collapsed .mobile-drawer-content {
            pointer-events: none !important;
            touch-action: none !important;
            overflow: hidden !important;
            -webkit-overflow-scrolling: auto !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }



          /* ENHANCED: Body scroll lock when drawer is active - FIXED: Don't interfere with navigation */
          body.drawer-scroll-lock {
            overflow: hidden !important;
            /* REMOVED: position: fixed - this was interfering with navigation animations */
            width: 100% !important;
            height: 100% !important;
            /* iOS Safari specific scroll lock */
            -webkit-overflow-scrolling: none !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          /* Prevent main content scroll when drawer is expanded */
          .mobile-content-container.drawer-active {
            overflow: hidden !important;
            touch-action: none !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          /* 🚨 CRITICAL: Ensure navigation overlay is never affected by page-level styles */
          div[style*="position: fixed"][style*="z-index"][style*="opacity"] {
            position: fixed !important;
            z-index: 1000 !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }

          .mobile-drawer.collapsed {
            transform: translate3d(0, calc(100% - 80px), 0);
            /* CRITICAL: Disable content interaction when collapsed, but allow handle clicks */
            overflow: hidden !important;
            overscroll-behavior: none !important;
            -webkit-overscroll-behavior: none !important;
          }

          .mobile-drawer.expanded {
            transform: translate3d(0, 0, 0);
            /* Enable interaction when expanded */
            pointer-events: auto;
            touch-action: pan-y;
            overflow: visible;
            overscroll-behavior: contain;
            -webkit-overscroll-behavior: contain;
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

          /* 🎬 OPTIMIZED: Modern card animation with subtle, natural motion */
          @keyframes modernCardSpring {
            0% {
              opacity: 0;
              transform: translate3d(0, 16px, 0) scale(0.96);
            }
            60% {
              opacity: 1;
              transform: translate3d(0, -1px, 0) scale(1.005);
            }
            100% {
              opacity: 1;
              transform: translate3d(0, 0, 0) scale(1);
            }
          }

          .event-card-spring {
            animation: modernCardSpring var(--animation-duration-normal) var(--animation-easing-standard) forwards;
            will-change: transform, opacity; /* Only when animating */
            backface-visibility: hidden;
            transform-style: flat;
            -webkit-font-smoothing: antialiased;
            contain: layout style;
          }

          .event-card-hidden {
            opacity: 0;
            transform: translate3d(0, 20px, 0) scale(0.95); /* More dramatic initial state */
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
          overflow: 'hidden', // FIXED: Prevent hidden elements from becoming visible
          // Mobile-specific viewport fixes
          minHeight: '100vh',
          minWidth: '100vw',
          isolation: 'isolate', // Create new stacking context
          transform: 'none', // Remove forced hardware acceleration
          willChange: 'auto', // Let browser optimize naturally
          WebkitOverflowScrolling: 'auto', // Use native scrolling
          WebkitTransform: 'none', // Remove iOS forced optimization
          // Essential mobile optimizations only
          touchAction: 'manipulation', // Improve touch responsiveness
          overscrollBehavior: 'contain' // Prevent scroll chaining only
        }}
        aria-label="Mobile homepage content"
      >
        {/* REFACTORED: Using Shared Mobile Navigation Component */}
        <MobileNavigation
          currentPage={currentPage}
          scrollY={scrollY}
          onNavigate={handleNavigation}
        />

        {/* OLD NAVIGATION REMOVED - Now using shared MobileNavigation component above */}

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
            padding: '2px 0px 40px 0px', // Drastically reduced top padding for tighter layout
            paddingBottom: getDynamicBottomSpacing(),
            boxSizing: 'border-box',
            overflow: 'auto',
            overflowX: 'hidden',
            // 📱 MOBILE SCROLL PERFORMANCE FIX - Simplified optimizations
            WebkitOverflowScrolling: 'touch', // Native iOS momentum
            overscrollBehavior: 'contain', // Prevent scroll chaining
            WebkitOverscrollBehavior: 'contain',
            scrollBehavior: 'auto', // Remove problematic smooth scrolling
            // Minimal hardware acceleration
            transform: 'translateZ(0)',
            WebkitTransform: 'translateZ(0)',
            willChange: 'auto', // Remove scroll-position to prevent compositing issues
            // Essential touch optimizations
            touchAction: 'pan-y', // Allow only vertical scrolling
            WebkitTouchCallout: 'none',
            WebkitUserSelect: 'none',
            // Disable scroll snapping that causes jitter
            scrollSnapType: 'none',
            WebkitScrollSnapType: 'none',
            // Essential rendering optimizations only
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {/* Events Section - Moved to top */}
          <section
            aria-labelledby="events-section-title"
            style={{
              width: '100%',
              marginTop: '2px', // Minimal top margin
              marginBottom: '4px', // Drastically reduced spacing after events
              // 🎬 OPTIMIZED: Modern load-in animation with CSS variables
              opacity: sectionsAnimated ? 1 : 0,
              transform: sectionsAnimated ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)',
              transitionDelay: '0ms' // First section loads immediately
            }}
          >
            {/* Events Title with Filter Toggle */}
            <div
              style={{
                display: 'flex',
                width: 'min(344px, calc(100vw - 4px))', // 🔧 EXPANDED: 2px padding each side (was 12px) - 20px wider total
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px', // Drastically reduced spacing
                margin: '0 auto 8px auto', // Center the container with minimal spacing
                boxSizing: 'border-box'
              }}
            >
              <h2
                id="events-section-title"
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '32px', // Increased for better visual balance with 34px toggle button
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

          {/* 🚀 ENHANCED: Featured Events - Completely hidden in "Past" mode with smooth transitions */}
          {showAllEvents && filteredFeaturedEvents.length > 0 && (
            <div
              style={{
                width: '100%',
                // 🚀 ENHANCED: Smooth transition for layout changes
                transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), margin 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: showAllEvents ? 1 : 0,
                transform: showAllEvents ? 'translateY(0)' : 'translateY(-20px)',
                marginBottom: showAllEvents ? '20px' : '0px',
                overflow: 'hidden'
              }}
            >
              {filteredFeaturedEvents.map((featuredEvent, heroIndex) => (
            <div
              key={`hero-${featuredEvent.id}`}
              className={cardsAnimated ? 'event-card-spring' : 'event-card-hidden'}
              style={{
                width: '100%',
                padding: '0', // Remove padding to let inner element control width
                marginBottom: '6px', // Slightly increased spacing between hero cards for better readability
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'center', // Center the hero card
                // 🎬 OPTIMIZED: Modern staggered load-in animation
                opacity: cardsAnimated ? 1 : 0,
                transform: cardsAnimated ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
                transition: 'opacity var(--animation-duration-slow) var(--animation-easing-standard), transform var(--animation-duration-slow) var(--animation-easing-standard)',
                transitionDelay: cardsAnimated ? `${heroIndex * 120}ms` : '0s' // Optimal stagger timing
              }}
            >
            <div
              onClick={(e) => {
                console.log('🔍 Mobile Featured Event: Click detected!', e.target);
                e.preventDefault();
                e.stopPropagation();

                // Navigate directly to ticket purchase page in new tab
                if (featuredEvent?.ticketsUrl && featuredEvent.ticketsUrl !== '#') {
                  console.log(`🎫 Mobile Featured Event: Opening ticket link for ${featuredEvent.title}:`, featuredEvent.ticketsUrl);
                  window.open(featuredEvent.ticketsUrl, '_blank', 'noopener,noreferrer'); // Open in new tab for better UX
                } else {
                  console.log('🎫 Mobile Featured Event: No ticket link available for', featuredEvent?.title);
                  console.log('🔍 Mobile Featured Event data:', featuredEvent);
                  console.log('🔍 Available fields:', Object.keys(featuredEvent || {}));
                }
              }}
              style={{
                width: 'min(344px, calc(100vw - 4px))', // 🔧 EXPANDED: 2px padding each side (was 12px) - 20px wider total
                height: 'min(344px, calc(100vw - 4px))', // Maintain square aspect ratio with new width
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
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                      src={getOptimizedImageUrl(featuredEvent.coverImage, 375)}
                      alt={`${featuredEvent.title} - Featured Event`}
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      onLoad={() => console.log('✅ MOBILE FEATURED EVENT HERO IMAGE LOADED:', featuredEvent.title)}
                      onError={(e) => {
                        console.error('❌ MOBILE FEATURED EVENT HERO IMAGE FAILED:', e.target.src);
                        // Prevent infinite loops with circuit breaker
                        if (!e.target.dataset.heroFallbackAttempted) {
                          e.target.dataset.heroFallbackAttempted = 'true';
                          e.target.src = '/images/optimized/hero-left-image-375w.jpg';
                        } else {
                          // Remove error handler to prevent further attempts
                          e.target.removeAttribute('onError');
                          console.error('❌ Hero fallback also failed, removing error handler');
                        }
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
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
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
                  bottom: '8px', // Positioned lower in the card for better visual balance
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '0px 10px 0px 16px', // Reduced right padding to move button 6px total to the right
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
                    maxWidth: 'calc(100% - 132px)' // Reserve space for wider button (120px + 12px gap)
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

                {/* CTA Button - Enhanced styling and positioning */}
                <div
                  style={{
                    display: 'flex',
                    width: '120px', // Increased width for better presence
                    height: '44px', // Increased height for better touch target
                    padding: '2px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexShrink: 0,
                    zIndex: 3
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      width: '116px', // Match new container width minus padding
                      height: '40px', // Increased height for better presence
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '22px', // More rounded for modern look
                      background: 'rgba(15, 15, 15, 0.95)', // Darker, more opaque glassmorphism
                      backdropFilter: 'blur(20px) saturate(180%)', // Enhanced glassmorphism
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.2)', // More visible border
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'scale(1)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)' // Enhanced shadow with inset highlight
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      e.target.style.transform = 'scale(0.95)';
                      e.target.style.background = 'rgba(35, 35, 35, 0.98)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      e.target.style.transform = 'scale(1)';
                      e.target.style.background = 'rgba(15, 15, 15, 0.95)';
                      e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (featuredEvent.isRealEvent && featuredEvent.hasTicketLink) {
                        console.log(`🎫 Opening ticket link for ${featuredEvent.title}:`, featuredEvent.ticketsUrl);
                        window.open(featuredEvent.ticketsUrl, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    <span
                      style={{
                        color: '#FFF',
                        fontFamily: 'Inter',
                        fontSize: '15px', // Slightly larger for better readability
                        fontWeight: '500', // Medium weight for better presence
                        lineHeight: 'normal',
                        pointerEvents: 'none',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' // Text shadow for better contrast
                      }}
                    >
                      {featuredEvent.isRealEvent && featuredEvent.hasTicketLink ?
                        (featuredEvent.buttonText || 'Get Tickets') :
                        'View Event'
                      }
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
                    // 🚀 ENHANCED: Improved text visibility for iPhone devices
                    color: '#FFFFFF', // Pure white for maximum contrast
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '24px', // Fixed size for mobile
                    fontWeight: '800',
                    lineHeight: '1.1',
                    flex: '1',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%', // Use full available width within padding
                    margin: '0px 0px 8px 0px', // Added margin as requested
                    // 🚀 ENHANCED: iOS Safari specific text rendering optimizations
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textRendering: 'optimizeLegibility',
                    // 🚀 ENHANCED: Text shadow for better contrast on iPhone
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.6)',
                    // 🚀 ENHANCED: Force hardware acceleration for better rendering
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                >
                  {featuredEvent.title || "FEATURED EVENT"}
                </div>
              </div>
            </div>
          </div>
              ))}
            </div>
          )}

          {/* 🚀 ENHANCED: Fallback Hero when no featured events - only in "ALL" mode */}
          {showAllEvents && filteredFeaturedEvents.length === 0 && (
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
                  width: 'min(344px, calc(100vw - 4px))', // 🔧 EXPANDED: 2px padding each side (was 12px) - 20px wider total
                  height: 'min(344px, calc(100vw - 4px))', // Maintain square aspect ratio with new width
                  position: 'relative',
                  margin: '0 auto',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 30%, rgba(0, 0, 0, 0.90) 90%)'
                }}
              >
                <img
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
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

          {/* 📱 REFINED EXPANDABLE EVENTS SECTION */}
          <div
            style={{
              width: 'min(344px, calc(100vw - 4px))', // 🔧 EXPANDED: 2px padding each side (was 12px) - 20px wider total
              margin: '0 auto',
              position: 'relative',
              paddingBottom: filteredHomepageEvents.length > 3 ? '12px' : '0', // Space for improved gradient and button
              background: '#000000' // Match main page background - pure black
            }}
          >
            {/* Events List Container with Expandable Functionality */}
            <div
              className={`mobile-event-cards-container ${isEventSectionExpanded ? 'expanded' : 'collapsed'}`}
              style={{
                width: '100%',
                position: 'relative',
                background: '#000000' // Match main page background - pure black
              }}
            >
              {/* Events List - Vertical Stack */}
              <div
                role="list"
                aria-label="Upcoming live music events"
                style={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                  justifyContent: 'center', // FIXED: Center cards vertically for even spacing
                  alignItems: 'stretch',
                  gap: '4px', // Slightly increased gap for better card separation
                  flexShrink: 0,
                  padding: '8px 0', // FIXED: Equal padding top and bottom for balanced spacing
                  boxSizing: 'border-box',
                  minHeight: 'auto',
                  overflow: 'visible',
                  position: 'relative',
                  zIndex: 1
                }}
              >
            {/* Homepage Event Cards - Enhanced Layout with Refined Animations */}
            {filteredHomepageEvents.length > 0 ? (
              filteredHomepageEvents.map((card, index) => {
                return (
                  <article
                    key={`homepage-${card.id}`}
                    className={`mobile-event-card-item ${cardsAnimated ? 'event-card-spring' : 'event-card-hidden'}`}
                    style={{
                      width: '100%',
                      minHeight: '132px', // Consistent height for better layout calculation
                      height: 'auto', // Dynamic height to accommodate multi-line titles
                      borderRadius: '20px',
                      background: 'rgba(15, 15, 15, 0.95)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                      position: 'relative',
                      margin: '0 0 4px 0', // Consistent spacing
                      padding: '2px', // Compact design
                      // No animation delay for cleaner expand/collapse
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                      isolation: 'isolate',
                      transform: 'translateZ(0)',
                      willChange: 'transform, opacity',
                      zIndex: 1, // Ensure proper stacking
                      clear: 'both', // Prevent float issues
                      // No transition delay for cleaner expand/collapse animation
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
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                          src={(() => {
                            const optimizedUrl = getOptimizedImageUrl(card.coverImage, 120);
                            console.log(`🖼️ Loading homepage image for "${card.title}":`, {
                              original: card.coverImage,
                              optimized: optimizedUrl,
                              isDataUrl: card.coverImage?.startsWith('data:'),
                              isNewImageSystem: card.coverImage?.includes('/api/images/serve/'),
                              hostname: window.location.hostname
                            });
                            return optimizedUrl;
                          })()}
                          alt={`${card.title} event cover`}
                          loading="lazy"
                          onError={(e) => {
                            // 🚨 CRITICAL FIX: Enhanced circuit breaker to prevent infinite loops
                            const currentAttempt = parseInt(e.target.dataset.fallbackAttempt || '0');
                            const maxAttempts = 2; // Reduced from 3 to 2 for faster fallback
                            const imageUrl = e.target.src;
                            const cardId = card.id || card.title;

                            // Global circuit breaker: track failed images to prevent repeated attempts
                            if (!window.failedImages) window.failedImages = new Set();

                            // If this exact URL has failed before, skip to final fallback immediately
                            if (window.failedImages.has(imageUrl)) {
                              console.log('🛑 Global circuit breaker: Image URL previously failed, using placeholder immediately');
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K';
                              e.target.dataset.fallbackAttempt = 'final';
                              e.target.removeAttribute('onError'); // Prevent further error events
                              return;
                            }

                            // Circuit breaker: prevent infinite loops
                            if (currentAttempt >= maxAttempts) {
                              console.log(`🛑 Circuit breaker: Max fallback attempts (${maxAttempts}) reached for ${cardId}, using placeholder`);
                              window.failedImages.add(imageUrl); // Remember this failed URL
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K';
                              e.target.dataset.fallbackAttempt = 'final';
                              e.target.removeAttribute('onError'); // Prevent further error events
                              return;
                            }

                            console.log(`❌ Homepage event image failed (attempt ${currentAttempt + 1}/${maxAttempts}):`, cardId, 'URL:', imageUrl);

                            // Add failed URL to tracking set
                            window.failedImages.add(imageUrl);

                            // Enhanced error logging for persistent storage pipeline
                            if (imageUrl.includes('/api/images/serve/')) {
                              console.error('🚨 API image serving failed - check persistent storage pipeline');
                              console.error('📋 UUID extraction:', imageUrl.match(/\/api\/images\/serve\/([a-f0-9-]{36})/));
                            }

                            // 🚨 CRITICAL FIX: Simplified fallback sequence to prevent loops
                            if (currentAttempt === 0) {
                              // First fallback: try placeholder from dashboard
                              const dashboardDomain = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://admin.b2b.click';
                              const placeholderUrl = `${dashboardDomain}/api/images/placeholder`;
                              console.log('🔄 Trying dashboard placeholder:', placeholderUrl);
                              e.target.src = placeholderUrl;
                              e.target.dataset.fallbackAttempt = '1';
                              return;
                            } else if (currentAttempt === 1) {
                              // Second fallback: use inline SVG placeholder immediately
                              console.log('🔄 Using final inline SVG placeholder');
                              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K';
                              e.target.dataset.fallbackAttempt = 'final';
                              e.target.removeAttribute('onError'); // Prevent further error events
                              return;
                            }

                            // Fallback safety: should never reach here, but just in case
                            console.log('🔄 Safety fallback: Using inline SVG placeholder');
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEyIiBoZWlnaHQ9IjExMiIgdmlld0JveD0iMCAwIDExMiAxMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTIiIGhlaWdodD0iMTEyIiBmaWxsPSIjMjIyMjIyIiByeD0iMTciLz4KPHN2ZyB4PSIzNiIgeT0iMzYiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHA+PHBhdGggZD0iTTIxIDMuNWMwLS44LS43LTEuNS0xLjUtMS41SDQuNWMtLjggMC0xLjUuNy0xLjUgMS41djE3YzAgLjguNyAxLjUgMS41IDEuNWgxNWMuOCAwIDEuNS0uNyAxLjUtMS41di0xN3ptLTEuNSAxNkg0LjVWNC41aDE1djE1eiIgZmlsbD0iIzU2NTY1NiIvPjwvc3ZnPgo8L3N2Zz4K';
                            e.target.dataset.fallbackAttempt = 'final';
                            e.target.removeAttribute('onError'); // Prevent further error events
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
                );
              })
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

              {/* 📱 GLASSMORPHISM GRADIENT OVERLAY - Only show when collapsed and has more than 3 cards */}
              {!isEventSectionExpanded && filteredHomepageEvents.length > 3 && (
                <div
                  className="mobile-event-cards-overlay"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* 📱 ENHANCED EXPAND/COLLAPSE HANDLE - Positioned within gradient overlay */}
            {filteredHomepageEvents.length > 3 && (
              <div
                className={`mobile-expand-handle ${isEventSectionExpanded ? 'expanded' : ''}`}
                onClick={toggleEventSection}
                role="button"
                tabIndex={0}
                aria-label={isEventSectionExpanded ? "Show fewer events" : "Show more events"}
                aria-expanded={isEventSectionExpanded}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleEventSection();
                  }
                }}
                style={{
                  // Ensure handle is always visible and properly positioned
                  opacity: 1,
                  visibility: 'visible'
                }}
              >
                <div
                  className={`mobile-expand-chevron ${isEventSectionExpanded ? 'expanded' : ''}`}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
          </section>

          {/* Follow Us Section - YouTube Video */}
          <section
            aria-labelledby="follow-us-section-title"
            style={{
              width: '100%',
              marginTop: '2px', // Reduced by ~50% (from 4px to 2px) to bring closer to expand button
              marginBottom: '4px', // Consistent 4px spacing above and below
              // 🎬 OPTIMIZED: Modern load-in animation with CSS variables
              opacity: sectionsAnimated ? 1 : 0,
              transform: sectionsAnimated ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)',
              transitionDelay: '150ms' // Second section in cascade
            }}
          >
            {/* Follow Us Section Title */}
            <div
              style={{
                width: 'min(344px, calc(100vw - 4px))', // 🔧 EXPANDED: 2px padding each side (was 12px) - 20px wider total
                marginBottom: '8px', // Consistent spacing with Events section
                margin: '0 auto 8px auto', // Center the container with minimal spacing
                boxSizing: 'border-box'
              }}
            >
              <h2
                id="follow-us-section-title"
                style={{
                  color: '#FFF',
                  fontFamily: 'Inter',
                  fontSize: '32px', // Match Events section title
                  fontWeight: '800', // Match Events section title
                  lineHeight: '1.2', // Match Events section title
                  margin: 0,
                  textAlign: 'left' // Match Events section title
                }}
              >
                Follow Us
              </h2>
            </div>


            <article
              style={{
                width: 'min(344px, calc(100vw - 4px))', // 🔧 EXPANDED: 2px padding each side (was 12px) - 20px wider total
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
              {/* YouTube iframe wrapper - FIXED: Simplified positioning to prevent scroll glitches */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                  // FIXED: Remove complex transforms that cause scroll issues
                  transform: 'translateZ(0)', // Only GPU acceleration
                  willChange: 'auto' // Let browser optimize
                }}
              >

                {showYoutubeThumbnail ? (
                  // Show thumbnail preloader for faster loading
                  YouTubeThumbnail
                ) : shouldLoadYoutube ? (
                  // Show actual YouTube iframe - FIXED: Simplified positioning
                  <iframe
                    src={buildYouTubeURL}
                    title="Henry Fong YouTube Video - Adaptive Quality"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    allowFullScreen
                    loading="lazy"
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      // FIXED: Remove problematic scale and complex transforms
                      transform: 'translateZ(0)',
                      pointerEvents: 'none',
                      border: 'none',
                      opacity: 1,
                      // FIXED: Ensure stable rendering during scroll
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  />
                ) : (
                  // Loading state (rarely shown) - FIXED: Simplified positioning
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
                      border: 'none',
                      transform: 'translateZ(0)'
                    }}
                  />
                )}
              </div>

              {/* Gradient overlay - FIXED: Stable positioning and optimized for mobile scroll */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(189deg, rgba(143, 143, 143, 0.00) 8.88%, rgba(0, 0, 0, 0.77) 77.64%)',
                  borderRadius: '20px',
                  zIndex: 1,
                  // FIXED: Optimize for mobile scroll performance
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  willChange: 'auto', // Let browser optimize
                  pointerEvents: 'none' // Ensure clicks pass through to video
                }}
              />
            </div>

            {/* Video text overlay - FIXED: Stable positioning for mobile scroll */}
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
                pointerEvents: 'none', // Allow clicks to pass through to video
                // FIXED: Optimize for mobile scroll performance
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                willChange: 'auto' // Let browser optimize
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

          {/* Social Media Buttons Section - Moved after YouTube */}
          <section
            style={{
              width: '100%',
              padding: '0',
              margin: '0',
              marginTop: '8px', // Increased spacing between YouTube video and social media buttons
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // 🎬 OPTIMIZED: Modern load-in animation with CSS variables
              opacity: sectionsAnimated ? 1 : 0,
              transform: sectionsAnimated ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity var(--animation-duration-normal) var(--animation-easing-decelerate), transform var(--animation-duration-normal) var(--animation-easing-decelerate)',
              transitionDelay: '300ms' // Third section in cascade
            }}
          >
            <div
              style={{
                width: 'min(344px, calc(100vw - 4px))', // 🔧 EXPANDED: 2px padding each side (was 12px) - 20px wider total
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '0 auto' // Center the container
              }}
            >
              <SocialMediaButtons />
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

      {/* REMOVED: Duplicate inline drawer implementation - now using MobileDrawer component */}


      {/* REFACTORED: Using Shared Mobile Drawer Component */}
      <MobileDrawer
        contentRef={contentRef}
        viewportContext={viewportContext}
        onStateChange={(drawerState) => {
          // Handle drawer state changes if needed
          console.log('Drawer state changed:', drawerState);
        }}
      />
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
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
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
          {/* Share Button - Modern glassmorphism styling */}
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
              background: 'rgba(15, 15, 15, 0.95)', // Dark glassmorphism to match homepage
              backdropFilter: 'blur(20px) saturate(180%)', // Enhanced glassmorphism
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle white border
              borderRadius: '25px',
              padding: '12px 24px',
              color: '#FFFFFF',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth modern transition
              minWidth: '80px',
              height: '44px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)', // Enhanced shadow with inset highlight
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' // Text shadow for better contrast
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = 'rgba(35, 35, 35, 0.98)';
              e.currentTarget.style.transform = 'scale(0.95)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = 'rgba(15, 15, 15, 0.95)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(35, 35, 35, 0.98)';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(15, 15, 15, 0.95)';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
            }}
          >
            Share
          </button>

          {/* View Event Button - Modern glassmorphism styling */}
          {expandedImage.isRealEvent && expandedImage.hasTicketLink ? (
            <button
              onClick={() => {
                console.log(`🎫 Opening ticket link from modal for ${expandedImage.title}:`, expandedImage.ticketsUrl);
                window.open(expandedImage.ticketsUrl, '_blank', 'noopener,noreferrer');
                handleImageCollapse();
              }}
              style={{
                background: 'rgba(15, 15, 15, 0.95)', // Dark glassmorphism to match homepage
                backdropFilter: 'blur(20px) saturate(180%)', // Enhanced glassmorphism
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)', // Subtle white border
                borderRadius: '25px',
                padding: '12px 24px',
                color: '#FFFFFF',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth modern transition
                minWidth: '100px',
                height: '44px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)', // Enhanced shadow with inset highlight
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' // Text shadow for better contrast
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.background = 'rgba(35, 35, 35, 0.98)';
                e.currentTarget.style.transform = 'scale(0.95)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.background = 'rgba(15, 15, 15, 0.95)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(35, 35, 35, 0.98)';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 15, 15, 0.95)';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
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

    {/* OLD NAVIGATION OVERLAY REMOVED - Now using shared MobileNavigation component */}





    </>
  );
};

export default FigmaMobile;
