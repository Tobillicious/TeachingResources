/**
 * Progressive Web App Registration and Management
 * Te Kete Ako Educational Platform
 */

class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.installBanner = null;
        this.init();
    }

    init() {
        if ('serviceWorker' in navigator) {
            this.registerServiceWorker();
            this.setupInstallPrompt();
            this.setupUpdateHandling();
        }
    }

    async registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('sw.js');
            console.log('[PWA] Service Worker registered:', registration);
            
            // Handle service worker updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        this.showUpdateNotification();
                    }
                });
            });
        } catch (error) {
            console.log('[PWA] Service Worker registration failed:', error);
        }
    }

    setupInstallPrompt() {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Only show install prompt if user hasn't seen it recently
            const lastDismissed = localStorage.getItem('pwa-install-dismissed');
            const daysSinceLastDismissal = lastDismissed ? 
                (Date.now() - parseInt(lastDismissed)) / (1000 * 60 * 60 * 24) : 999;
            
            if (daysSinceLastDismissal > 7) { // Show again after 7 days
                setTimeout(() => this.showInstallBanner(), 5000); // Show after 5 seconds
            }
        });

        // Handle successful installation
        window.addEventListener('appinstalled', () => {
            console.log('[PWA] App installed successfully');
            this.hideInstallBanner();
            this.showSuccessMessage();
        });
    }

    setupUpdateHandling() {
        // Listen for messages from service worker
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'CACHE_UPDATED') {
                this.showCacheUpdateNotification();
            }
        });

        // Handle online/offline status
        window.addEventListener('online', () => {
            this.showConnectivityStatus(true);
        });

        window.addEventListener('offline', () => {
            this.showConnectivityStatus(false);
        });
    }

    showInstallBanner() {
        if (this.installBanner) return; // Don't show multiple banners

        this.installBanner = document.createElement('div');
        this.installBanner.className = 'pwa-install-banner';
        this.installBanner.innerHTML = `
            <div class="pwa-banner-content">
                <div class="pwa-banner-icon">📱</div>
                <div class="pwa-banner-text">
                    <h3>Install Te Kete Ako</h3>
                    <p>Get offline access to all educational resources</p>
                </div>
                <div class="pwa-banner-actions">
                    <button id="pwa-install-btn" class="pwa-btn-primary">Install</button>
                    <button id="pwa-dismiss-btn" class="pwa-btn-secondary">Later</button>
                </div>
            </div>
        `;

        // Add styles
        this.addPWAStyles();
        
        document.body.appendChild(this.installBanner);

        // Event listeners
        document.getElementById('pwa-install-btn').addEventListener('click', () => {
            this.promptInstall();
        });

        document.getElementById('pwa-dismiss-btn').addEventListener('click', () => {
            this.dismissInstallBanner();
        });

        // Auto-hide after 30 seconds
        setTimeout(() => {
            if (this.installBanner) {
                this.dismissInstallBanner();
            }
        }, 30000);
    }

    async promptInstall() {
        if (!this.deferredPrompt) return;

        try {
            this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('[PWA] User accepted installation');
            } else {
                console.log('[PWA] User dismissed installation');
                localStorage.setItem('pwa-install-dismissed', Date.now().toString());
            }
            
            this.deferredPrompt = null;
            this.hideInstallBanner();
        } catch (error) {
            console.error('[PWA] Installation prompt failed:', error);
        }
    }

    dismissInstallBanner() {
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
        this.hideInstallBanner();
    }

    hideInstallBanner() {
        if (this.installBanner) {
            this.installBanner.classList.add('pwa-banner-hiding');
            setTimeout(() => {
                if (this.installBanner && this.installBanner.parentNode) {
                    this.installBanner.parentNode.removeChild(this.installBanner);
                }
                this.installBanner = null;
            }, 300);
        }
    }

    showUpdateNotification() {
        const notification = this.createNotification({
            type: 'update',
            title: 'Update Available',
            message: 'A new version of Te Kete Ako is available.',
            actions: [
                { text: 'Update Now', action: () => window.location.reload() },
                { text: 'Later', action: null }
            ]
        });
        
        this.showNotification(notification);
    }

    showCacheUpdateNotification() {
        const notification = this.createNotification({
            type: 'cache',
            title: 'Resources Updated',
            message: 'New educational content has been cached for offline use.',
            actions: [
                { text: 'Great!', action: null }
            ]
        });
        
        this.showNotification(notification, 3000); // Auto-hide after 3 seconds
    }

    showConnectivityStatus(isOnline) {
        const notification = this.createNotification({
            type: isOnline ? 'online' : 'offline',
            title: isOnline ? 'Back Online' : 'Offline Mode',
            message: isOnline ? 
                'Connection restored. All features available.' : 
                'Limited connectivity. Using cached resources.',
            actions: isOnline ? [] : [
                { text: 'View Available', action: () => window.location.href = 'offline.html' }
            ]
        });
        
        this.showNotification(notification, isOnline ? 2000 : 5000);
    }

    showSuccessMessage() {
        const notification = this.createNotification({
            type: 'success',
            title: 'Installation Complete!',
            message: 'Te Kete Ako is now installed on your device.',
            actions: [
                { text: 'Explore', action: () => window.location.href = 'index.html' }
            ]
        });
        
        this.showNotification(notification, 4000);
    }

    createNotification({ type, title, message, actions }) {
        const notification = document.createElement('div');
        notification.className = `pwa-notification pwa-notification-${type}`;
        
        const actionsHTML = actions.map(action => 
            `<button class="pwa-notification-btn" data-action="${action.text}">${action.text}</button>`
        ).join('');
        
        notification.innerHTML = `
            <div class="pwa-notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
                <div class="pwa-notification-actions">${actionsHTML}</div>
            </div>
        `;
        
        // Add event listeners for actions
        actions.forEach(action => {
            if (action.action) {
                notification.querySelector(`[data-action="${action.text}"]`)
                    .addEventListener('click', action.action);
            }
        });
        
        return notification;
    }

    showNotification(notification, autoHide = 0) {
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('pwa-notification-show'), 100);
        
        if (autoHide > 0) {
            setTimeout(() => this.hideNotification(notification), autoHide);
        }
        
        // Click to dismiss
        notification.addEventListener('click', (e) => {
            if (!e.target.closest('.pwa-notification-btn')) {
                this.hideNotification(notification);
            }
        });
    }

    hideNotification(notification) {
        notification.classList.add('pwa-notification-hiding');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    addPWAStyles() {
        if (document.getElementById('pwa-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'pwa-styles';
        styles.textContent = `
            .pwa-install-banner {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--color-primary, #2C5F41);
                color: white;
                padding: 1rem;
                border-radius: 12px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.2);
                z-index: 1000;
                max-width: 300px;
                font-family: inherit;
                animation: pwa-slide-in 0.3s ease-out;
            }

            .pwa-install-banner.pwa-banner-hiding {
                animation: pwa-slide-out 0.3s ease-in forwards;
            }

            .pwa-banner-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .pwa-banner-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }

            .pwa-banner-text h3 {
                margin: 0 0 0.25rem 0;
                font-size: 1rem;
                font-weight: bold;
            }

            .pwa-banner-text p {
                margin: 0;
                font-size: 0.85rem;
                opacity: 0.9;
            }

            .pwa-banner-actions {
                display: flex;
                gap: 0.5rem;
                margin-top: 0.75rem;
            }

            .pwa-btn-primary, .pwa-btn-secondary {
                border: none;
                padding: 0.5rem 0.75rem;
                border-radius: 6px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: all 0.2s;
            }

            .pwa-btn-primary {
                background: var(--color-secondary, #B8860B);
                color: white;
            }

            .pwa-btn-primary:hover {
                background: var(--color-secondary-dark, #996f08);
            }

            .pwa-btn-secondary {
                background: transparent;
                color: white;
                border: 1px solid rgba(255,255,255,0.3);
            }

            .pwa-btn-secondary:hover {
                background: rgba(255,255,255,0.1);
            }

            .pwa-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1001;
                max-width: 300px;
                padding: 1rem;
                transform: translateX(100%);
                transition: all 0.3s ease;
            }

            .pwa-notification.pwa-notification-show {
                transform: translateX(0);
            }

            .pwa-notification.pwa-notification-hiding {
                transform: translateX(100%);
                opacity: 0;
            }

            .pwa-notification-update { border-left: 4px solid var(--color-secondary, #B8860B); }
            .pwa-notification-success { border-left: 4px solid #4ade80; }
            .pwa-notification-offline { border-left: 4px solid #f59e0b; }
            .pwa-notification-online { border-left: 4px solid #10b981; }

            .pwa-notification h4 {
                margin: 0 0 0.5rem 0;
                font-size: 1rem;
                color: var(--color-primary, #2C5F41);
            }

            .pwa-notification p {
                margin: 0 0 0.75rem 0;
                font-size: 0.9rem;
                color: #666;
            }

            .pwa-notification-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: flex-end;
            }

            .pwa-notification-btn {
                background: var(--color-primary, #2C5F41);
                color: white;
                border: none;
                padding: 0.4rem 0.8rem;
                border-radius: 4px;
                font-size: 0.85rem;
                cursor: pointer;
                transition: background-color 0.2s;
            }

            .pwa-notification-btn:hover {
                background: var(--color-primary-dark, #1f4631);
            }

            @keyframes pwa-slide-in {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            @keyframes pwa-slide-out {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }

            @media (max-width: 768px) {
                .pwa-install-banner, .pwa-notification {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Initialize PWA Manager when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.pwaManager = new PWAManager();
    });
} else {
    window.pwaManager = new PWAManager();
}