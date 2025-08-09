/**
 * Force Cache Clear Script
 * Aggressively clears all caches and forces Service Worker update
 */

(function() {
    'use strict';

    console.log('🔄 Force Cache Clear: Starting aggressive cache cleanup...');

    // Function to clear all browser caches
    async function clearAllCaches() {
        try {
            // 1. Clear Service Worker caches
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                console.log('🗑️ Found caches to delete:', cacheNames);
                
                await Promise.all(
                    cacheNames.map(cacheName => {
                        console.log('🗑️ Deleting cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
                console.log('✅ All Service Worker caches cleared');
            }

            // 2. Unregister all Service Workers
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                console.log('🔄 Found Service Worker registrations:', registrations.length);
                
                await Promise.all(
                    registrations.map(registration => {
                        console.log('🔄 Unregistering Service Worker:', registration.scope);
                        return registration.unregister();
                    })
                );
                console.log('✅ All Service Workers unregistered');
            }

            // 3. Clear localStorage and sessionStorage
            if (typeof Storage !== 'undefined') {
                localStorage.clear();
                sessionStorage.clear();
                console.log('✅ Local and session storage cleared');
            }

            // 4. Clear IndexedDB (if any)
            if ('indexedDB' in window) {
                // This is more complex, but for most apps clearing the above is sufficient
                console.log('ℹ️ IndexedDB clearing skipped (manual implementation needed)');
            }

            console.log('🎉 Cache clearing complete!');
            return true;

        } catch (error) {
            console.error('❌ Error clearing caches:', error);
            return false;
        }
    }

    // Function to force reload with cache bypass
    function forceReload() {
        console.log('🔄 Force reloading page with cache bypass...');
        
        // Try different methods to bypass cache
        if (window.location.reload) {
            // Force reload bypassing cache
            window.location.reload(true);
        } else {
            // Fallback: redirect with cache-busting parameter
            const url = new URL(window.location);
            url.searchParams.set('_cacheBust', Date.now());
            window.location.href = url.toString();
        }
    }

    // Main execution
    async function main() {
        console.log('🚀 Starting force cache clear process...');
        
        const success = await clearAllCaches();
        
        if (success) {
            console.log('✅ Cache clearing successful - reloading page...');
            setTimeout(forceReload, 1000); // Give a moment for cleanup to complete
        } else {
            console.log('⚠️ Cache clearing had issues - reloading anyway...');
            setTimeout(forceReload, 2000);
        }
    }

    // Auto-execute if this script is loaded directly
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }

    // Also expose globally for manual execution
    window.forceCacheClear = main;
    
    console.log('💡 You can also manually run: window.forceCacheClear()');

})();
