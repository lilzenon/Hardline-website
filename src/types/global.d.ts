/**
 * Global type declarations for cache invalidation functions
 */

declare global {
  interface Window {
    /**
     * Invalidates the frontend homepage cache
     * Called when images are uploaded to ensure fresh data
     */
    invalidateHomepageCache?: () => void;
    
    /**
     * Forces a refresh of homepage data from the server
     * Called after cache invalidation to get fresh data
     */
    refreshHomepageData?: () => void;
  }
}

export {};
