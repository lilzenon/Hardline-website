/**
 * TOMBSTONE service worker — the site intentionally does NOT use a
 * service worker anymore.
 *
 * The legacy SW (v7, registered by the long-archived Handlebars layout)
 * cached '/' HTML with a networkFirst strategy. On a flaky network that
 * could serve stale HTML referencing dead hashed bundles from a previous
 * deploy — a permanent white screen until the cache was cleared.
 *
 * Any browser still holding that registration will fetch this file on its
 * next SW update check (sw.js is served with revalidation headers), install
 * it, and self-destruct: clear all caches, unregister, and reload open
 * clients so they load fresh from the network.
 *
 * Do NOT add caching logic back here without per-deploy cache versioning
 * and an HTML-bypass — see project history (stale-bundle white screens).
 */

self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil((async function () {
        // 1. Drop every cache this origin ever created
        try {
            const keys = await caches.keys();
            await Promise.all(keys.map(function (k) { return caches.delete(k); }));
        } catch (e) { /* best effort */ }

        // 2. Remove this registration entirely
        try {
            await self.registration.unregister();
        } catch (e) { /* best effort */ }

        // 3. Reload any open pages so they re-fetch without SW interception
        try {
            const clientList = await self.clients.matchAll({ type: 'window' });
            clientList.forEach(function (client) {
                try { client.navigate(client.url); } catch (e) { /* best effort */ }
            });
        } catch (e) { /* best effort */ }
    })());
});

// No fetch handler: nothing is intercepted; all requests hit the network.
