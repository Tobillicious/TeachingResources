// Service Worker for Te Kete Ako PWA
const CACHE_NAME = 'te-kete-ako-v1.2.0';
const OFFLINE_URL = '/offline.html';

// Core resources to cache for offline functionality
const CORE_CACHE = [
    '/',
    '/index.html',
    '/handouts.html',
    '/unit-plans.html',
    '/activities.html',
    '/games.html',
    '/other-resources.html',
    '/offline.html',
    
    // Core CSS and JS
    '/css/main.css',
    '/js/shared-components.js',
    '/js/footer.js',
    '/js/advanced-search.js',
    '/js/analytics-dashboard.js',
    
    // Key handouts for offline access
    '/handouts/treaty-of-waitangi-handout.html',
    '/handouts/writers-toolkit-peel-argument-handout.html',
    '/handouts/maori-astronomy-navigation-handout.html',
    '/handouts/economic-justice-deep-dive-comprehension.html',
    '/handouts/traditional-navigation-mathematics-handout.html',
    '/handouts/haka-comprehension-handout.html',
    
    // Key unit plans
    '/units/unit-1-te-ao-maori.html',
    '/units/unit-2-decolonized-history.html',
    '/units/unit-3-stem-matauranga.html',
    '/units/unit-4-economic-justice.html',
    
    // Revolutionary experiences
    '/experiences/digital-purakau.html',
    '/experiences/adaptive-pathways.html',
    '/experiences/cultural-assessment.html',
    '/experiences/virtual-marae.html',
    
    // Curriculum alignment
    '/curriculum-alignment.html',
    
    // Games
    '/games/te-reo-wordle.html',
    
    // Fonts (if self-hosted)
    'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:ital,wght@0,400;1,300&family=Montserrat:wght@700&display=swap'
];

// Dynamic cache for additional resources
const DYNAMIC_CACHE = 'te-kete-ako-dynamic-v1.0.0';

// Install event - cache core resources
self.addEventListener('install', (event) => {
    console.log('[SW] Install event');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching core resources');
                return cache.addAll(CORE_CACHE);
            })
            .then(() => {
                console.log('[SW] Core resources cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Failed to cache core resources:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activate event');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Claiming clients');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve cached content, fallback to network, then offline page
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    console.log('[SW] Serving from cache:', event.request.url);
                    return response;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache dynamic resources
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                // Only cache HTML, CSS, JS, and image files
                                if (event.request.url.match(/\.(html|css|js|png|jpg|jpeg|svg|woff2|woff)$/)) {
                                    console.log('[SW] Caching dynamic resource:', event.request.url);
                                    cache.put(event.request, responseToCache);
                                }
                            });

                        return response;
                    })
                    .catch(() => {
                        // Network failed, try to serve offline page for HTML requests
                        if (event.request.destination === 'document') {
                            return caches.match(OFFLINE_URL);
                        }
                        
                        // For other resources, return a generic offline response
                        return new Response('Offline', {
                            status: 503,
                            statusText: 'Service Unavailable'
                        });
                    });
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('[SW] Background sync:', event.tag);
    
    if (event.tag === 'search-sync') {
        event.waitUntil(syncSearchData());
    }
    
    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalyticsData());
    }
});

// Sync search data when online
async function syncSearchData() {
    try {
        console.log('[SW] Syncing search data...');
        
        // Get offline search queries from IndexedDB
        const db = await openSearchDB();
        const transaction = db.transaction(['offline-searches'], 'readonly');
        const store = transaction.objectStore('offline-searches');
        const queries = await getAllFromStore(store);
        
        // Process offline searches
        for (const query of queries) {
            // Send to analytics or perform deferred search operations
            console.log('[SW] Processing offline search:', query);
        }
        
        // Clear processed offline searches
        const clearTransaction = db.transaction(['offline-searches'], 'readwrite');
        const clearStore = clearTransaction.objectStore('offline-searches');
        await clearStore.clear();
        
        console.log('[SW] Search data synced successfully');
    } catch (error) {
        console.error('[SW] Failed to sync search data:', error);
    }
}

// Sync analytics data when online
async function syncAnalyticsData() {
    try {
        console.log('[SW] Syncing analytics data...');
        
        // Get offline analytics from IndexedDB
        const db = await openAnalyticsDB();
        const transaction = db.transaction(['offline-events'], 'readonly');
        const store = transaction.objectStore('offline-events');
        const events = await getAllFromStore(store);
        
        // Send analytics events to server
        for (const event of events) {
            // Would send to analytics endpoint
            console.log('[SW] Processing offline analytics event:', event);
        }
        
        // Clear processed events
        const clearTransaction = db.transaction(['offline-events'], 'readwrite');
        const clearStore = clearTransaction.objectStore('offline-events');
        await clearStore.clear();
        
        console.log('[SW] Analytics data synced successfully');
    } catch (error) {
        console.error('[SW] Failed to sync analytics data:', error);
    }
}

// IndexedDB helpers
function openSearchDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('TeKeteAkoSearch', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('offline-searches')) {
                db.createObjectStore('offline-searches', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

function openAnalyticsDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('TeKeteAkoAnalytics', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('offline-events')) {
                db.createObjectStore('offline-events', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

function getAllFromStore(store) {
    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);
    });
}

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
    console.log('[SW] Push message received:', event);
    
    const options = {
        body: event.data ? event.data.text() : 'New content available in Te Kete Ako!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Explore',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icons/xmark.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Te Kete Ako', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notification click received:', event);
    
    event.notification.close();
    
    if (event.action === 'explore') {
        // Open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'close') {
        // Just close the notification
        return;
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches.open(DYNAMIC_CACHE).then((cache) => {
                return cache.addAll(event.data.urls);
            })
        );
    }
});

console.log('[SW] Service Worker initialized for Te Kete Ako');