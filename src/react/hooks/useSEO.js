/**
 * SEO Hook - Provides easy access to SEO functionality
 * Allows components to update meta tags dynamically
 */

import { useContext } from 'react';
import { useSEO as useBaseSEO } from '../contexts/SEOContext';

/**
 * Enhanced SEO hook with additional utilities
 */
export const useSEO = () => {
  const seoContext = useBaseSEO();

  /**
   * Update page title dynamically
   * @param {string} title - New page title
   */
  const updateTitle = (title) => {
    seoContext.updateSEOSetting('default_title', title);
  };

  /**
   * Update page description dynamically
   * @param {string} description - New page description
   */
  const updateDescription = (description) => {
    seoContext.updateSEOSetting('default_description', description);
  };

  /**
   * Update Open Graph image dynamically
   * @param {string} imageUrl - New OG image URL
   */
  const updateOGImage = (imageUrl) => {
    seoContext.updateSEOSetting('default_og_image', imageUrl);
  };

  /**
   * Update multiple SEO settings at once
   * @param {Object} settings - Object with SEO settings to update
   */
  const updateSEOSettings = (settings) => {
    Object.entries(settings).forEach(([key, value]) => {
      seoContext.updateSEOSetting(key, value);
    });
  };

  /**
   * Get current page meta tags for debugging
   */
  const getCurrentMetaTags = () => {
    return seoContext.metaTags;
  };

  /**
   * Check if maintenance mode is active
   */
  const isMaintenanceMode = () => {
    return seoContext.maintenanceStatus.maintenance_mode;
  };

  return {
    ...seoContext,
    updateTitle,
    updateDescription,
    updateOGImage,
    updateSEOSettings,
    getCurrentMetaTags,
    isMaintenanceMode
  };
};

export default useSEO;
