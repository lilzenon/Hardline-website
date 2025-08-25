/**
 * Cleanup utilities for removing old blob URLs and invalid cached data
 */

/**
 * Clean up old blob URLs from localStorage and sessionStorage
 * This prevents errors from expired blob URLs that might be cached
 */
export function cleanupOldBlobUrls(): void {
  try {
    // Check localStorage
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i)
      if (key) {
        try {
          const value = localStorage.getItem(key)
          if (value && value.includes('blob:')) {
            console.warn(`Removing localStorage item with blob URL: ${key}`)
            localStorage.removeItem(key)
          }
        } catch (error) {
          console.warn(`Error checking localStorage item ${key}:`, error)
        }
      }
    }

    // Check sessionStorage
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i)
      if (key) {
        try {
          const value = sessionStorage.getItem(key)
          if (value && value.includes('blob:')) {
            console.warn(`Removing sessionStorage item with blob URL: ${key}`)
            sessionStorage.removeItem(key)
          }
        } catch (error) {
          console.warn(`Error checking sessionStorage item ${key}:`, error)
        }
      }
    }

    console.log('✅ Blob URL cleanup completed')
  } catch (error) {
    console.error('Error during blob URL cleanup:', error)
  }
}

/**
 * Initialize cleanup on app start
 */
export function initializeCleanup(): void {
  // Run cleanup immediately
  cleanupOldBlobUrls()

  // Add error handler for blob URL errors
  window.addEventListener('error', (event) => {
    if (event.target && 'src' in event.target) {
      const src = (event.target as any).src
      if (src && src.startsWith('blob:')) {
        console.warn('Blob URL error detected, cleaning up:', src)
        // Don't let blob URL errors bubble up to console
        event.preventDefault()
      }
    }
  }, true)

  console.log('✅ Cleanup utilities initialized')
}
