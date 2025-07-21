/**
 * Service Worker for BOUNCE2BOUNCE
 * Implements caching strategies for performance optimization
 */

const CACHE_NAME = 'bounce2bounce-v2';
const STATIC_CACHE = 'bounce2bounce-static-v2';
const DYNAMIC_CACHE = 'bounce2bounce-dynamic-v2';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/home',
    '/css/figma-home.css',
    '/css/compact-event-cards.css',
    '/css/tailwind.css',
    '/js/navigation.js',
    '/images/bounce-logo.svg',
    '/images/favicon.svg',
    '/manifest.webmanifest'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');

    event.waitUntil(
        caches.open(STATIC_CACHE)
        .then(cache => {
            console.log('Service Worker: Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
        .then(() => {
            console.log('Service Worker: Static assets cached');
            return self.skipWaiting();
        })
        .catch(error => {
            console.error('Service Worker: Error caching static assets', error);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');

    event.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('Service Worker: Activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip admin and API requests
    if (url.pathname.startsWith('/admin') ||
        url.pathname.startsWith('/api') ||
        url.pathname.startsWith('/dashboard')) {
        return;
    }

    event.respondWith(
        handleRequest(request)
    );
});

async function handleRequest(request) {
    const url = new URL(request.url);

    try {
        // Strategy 1: Cache First for static assets
        if (isStaticAsset(url.pathname)) {
            return await cacheFirst(request);
        }

        // Strategy 2: Network First for event pages
        if (url.pathname.startsWith('/event/')) {
            return await networkFirst(request);
        }

        // Strategy 3: Stale While Revalidate for homepage
        if (url.pathname === '/' || url.pathname === '/home') {
            return await staleWhileRevalidate(request);
        }

        // Default: Network First
        return await networkFirst(request);

    } catch (error) {
        console.error('Service Worker: Error handling request', error);
        return fetch(request);
    }
}

// Cache First strategy - for static assets
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('Service Worker: Network error in cacheFirst', error);
        throw error;
    }
}

// Network First strategy - for dynamic content
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('Service Worker: Network failed, trying cache');
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        throw error;
    }
}

// Stale While Revalidate strategy - for frequently updated content
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);

    const networkResponsePromise = fetch(request)
        .then(response => {
            if (response.ok) {
                const cache = caches.open(DYNAMIC_CACHE);
                cache.then(c => c.put(request, response.clone()));
            }
            return response;
        })
        .catch(error => {
            console.error('Service Worker: Network error in staleWhileRevalidate', error);
        });

    return cachedResponse || networkResponsePromise;
}

// Helper function to identify static assets
function isStaticAsset(pathname) {
    return pathname.startsWith('/css/') ||
        pathname.startsWith('/js/') ||
        pathname.startsWith('/images/') ||
        pathname.startsWith('/fonts/') ||
        pathname.endsWith('.css') ||
        pathname.endsWith('.js') ||
        pathname.endsWith('.png') ||
        pathname.endsWith('.jpg') ||
        pathname.endsWith('.jpeg') ||
        pathname.endsWith('.svg') ||
        pathname.endsWith('.webp') ||
        pathname.endsWith('.woff') ||
        pathname.endsWith('.woff2');
}

// Background sync for offline form submissions
self.addEventListener('sync', event => {
    if (event.tag === 'event-signup') {
        event.waitUntil(syncEventSignups());
    }
});

async function syncEventSignups() {
    // Handle offline event signups when connection is restored
    console.log('Service Worker: Syncing offline event signups');

    // This would integrate with your existing signup system
    // Implementation depends on your offline storage strategy
}

// Push notifications (for future implementation)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();

        const options = {
            body: data.body,
            icon: '/images/favicon-192x192.png',
            badge: '/images/favicon-192x192.png',
            tag: 'event-notification',
            requireInteraction: true,
            actions: [{
                    action: 'view',
                    title: 'View Event'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/events')
        );
    }
});