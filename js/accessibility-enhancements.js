/**
 * Accessibility Enhancements and Keyboard Shortcuts
 * Te Kete Ako Educational Platform
 * Comprehensive accessibility features for inclusive education
 */

class AccessibilityEnhancer {
    constructor() {
        this.shortcuts = new Map();
        this.skipLinks = [];
        this.focusTracker = null;
        this.announcer = null;
        this.preferences = this.loadPreferences();
        this.init();
    }

    init() {
        this.createSkipLinks();
        this.createScreenReaderAnnouncer();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAccessibilityPreferences();
        this.enhanceInteractiveElements();
        this.setupColorAndContrastControls();
        console.log('[A11y] Accessibility enhancements initialized');
    }

    // Skip Links for keyboard navigation
    createSkipLinks() {
        const skipLinksContainer = document.createElement('div');
        skipLinksContainer.className = 'skip-links';
        skipLinksContainer.setAttribute('aria-label', 'Skip links');
        
        const skipLinks = [
            { href: '#main-content', text: 'Skip to main content' },
            { href: '#main-navigation', text: 'Skip to navigation' },
            { href: '#sidebar', text: 'Skip to sidebar' },
            { href: '#footer', text: 'Skip to footer' }
        ];

        skipLinks.forEach(link => {
            const skipLink = document.createElement('a');
            skipLink.href = link.href;
            skipLink.textContent = link.text;
            skipLink.className = 'skip-link';
            skipLinksContainer.appendChild(skipLink);
        });

        document.body.insertBefore(skipLinksContainer, document.body.firstChild);
    }

    // Screen reader announcements
    createScreenReaderAnnouncer() {
        this.announcer = document.createElement('div');
        this.announcer.setAttribute('aria-live', 'polite');
        this.announcer.setAttribute('aria-atomic', 'true');
        this.announcer.className = 'sr-only';
        this.announcer.id = 'accessibility-announcer';
        document.body.appendChild(this.announcer);
    }

    announce(message, priority = 'polite') {
        if (!this.announcer) return;
        
        this.announcer.setAttribute('aria-live', priority);
        this.announcer.textContent = message;
        
        // Clear after announcement
        setTimeout(() => {
            this.announcer.textContent = '';
        }, 1000);
    }

    // Keyboard shortcuts
    setupKeyboardNavigation() {
        // Define keyboard shortcuts
        this.shortcuts.set('Alt+H', () => this.goToHome());
        this.shortcuts.set('Alt+U', () => this.goToUnitPlans());
        this.shortcuts.set('Alt+R', () => this.goToHandouts());
        this.shortcuts.set('Alt+A', () => this.goToActivities());
        this.shortcuts.set('Alt+G', () => this.goToGames());
        this.shortcuts.set('Alt+S', () => this.focusSearch());
        this.shortcuts.set('Alt+M', () => this.focusMainContent());
        this.shortcuts.set('Alt+N', () => this.focusNavigation());
        this.shortcuts.set('Alt+P', () => this.togglePreferencesPanel());
        this.shortcuts.set('Ctrl+/', () => this.showKeyboardShortcuts());
        this.shortcuts.set('Escape', () => this.handleEscape());

        document.addEventListener('keydown', (event) => {
            const shortcut = this.getShortcutString(event);
            const action = this.shortcuts.get(shortcut);
            
            if (action) {
                event.preventDefault();
                action();
                this.announce(`Keyboard shortcut activated: ${shortcut}`);
            }
        });

        // Add keyboard shortcuts help
        this.createKeyboardShortcutsModal();
    }

    getShortcutString(event) {
        const parts = [];
        if (event.ctrlKey) parts.push('Ctrl');
        if (event.altKey) parts.push('Alt');
        if (event.shiftKey) parts.push('Shift');
        if (event.metaKey) parts.push('Meta');
        
        // Handle special keys
        const keyName = event.key === ' ' ? 'Space' : 
                       event.key === 'Escape' ? 'Escape' :
                       event.key === '/' ? '/' :
                       event.key.toUpperCase();
        
        parts.push(keyName);
        return parts.join('+');
    }

    // Navigation shortcuts
    goToHome() {
        this.navigateToPage('index.html', 'Homepage');
    }

    goToUnitPlans() {
        this.navigateToPage('unit-plans.html', 'Unit Plans');
    }

    goToHandouts() {
        this.navigateToPage('handouts.html', 'Handouts');
    }

    goToActivities() {
        this.navigateToPage('activities.html', 'Activities');
    }

    goToGames() {
        this.navigateToPage('games.html', 'Games');
    }

    navigateToPage(url, pageName) {
        if (window.location.pathname.includes(url)) {
            this.announce(`Already on ${pageName} page`);
            return;
        }
        
        this.announce(`Navigating to ${pageName}`);
        window.location.href = url;
    }

    focusSearch() {
        const searchInput = document.querySelector('#search-input, .search-input, input[type="search"]');
        if (searchInput) {
            searchInput.focus();
            this.announce('Search field focused');
        }
    }

    focusMainContent() {
        const mainContent = document.querySelector('#main-content, main, .content-area');
        if (mainContent) {
            mainContent.focus();
            this.announce('Main content focused');
        }
    }

    focusNavigation() {
        const navigation = document.querySelector('#main-navigation, nav, .main-nav');
        if (navigation) {
            navigation.focus();
            this.announce('Navigation focused');
        }
    }

    handleEscape() {
        // Close any open modals or overlays
        const openModal = document.querySelector('.modal.show, .modal.visible');
        const openDropdown = document.querySelector('.dropdown.open');
        const activeSearch = document.querySelector('.search-results.visible');
        
        if (openModal) {
            this.closeModal(openModal);
        } else if (openDropdown) {
            openDropdown.classList.remove('open');
        } else if (activeSearch) {
            activeSearch.classList.remove('visible');
        } else {
            // Return focus to main content
            this.focusMainContent();
        }
    }

    // Focus management
    setupFocusManagement() {
        // Trap focus in modals
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                this.manageFocusTrapping(event);
            }
        });

        // Enhanced focus indicators
        document.addEventListener('focusin', (event) => {
            this.enhanceFocusIndicator(event.target);
        });

        // Skip repetitive focus announcements
        this.setupFocusAnnouncements();
    }

    manageFocusTrapping(event) {
        const modal = document.querySelector('.modal.show, .modal.visible');
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }

    enhanceFocusIndicator(element) {
        // Add enhanced focus styling for specific elements
        if (element.matches('a, button, input, select, textarea, [tabindex]')) {
            element.classList.add('enhanced-focus');
            setTimeout(() => element.classList.remove('enhanced-focus'), 3000);
        }
    }

    // Accessibility preferences
    setupAccessibilityPreferences() {
        this.createAccessibilityPanel();
        this.applyStoredPreferences();
    }

    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.id = 'accessibility-preferences';
        panel.className = 'accessibility-panel';
        panel.setAttribute('aria-label', 'Accessibility Preferences');
        panel.innerHTML = `
            <div class="accessibility-panel-header">
                <h3>Accessibility Preferences</h3>
                <button class="panel-close" aria-label="Close preferences panel">&times;</button>
            </div>
            <div class="accessibility-panel-content">
                <div class="preference-group">
                    <h4>Visual</h4>
                    <label class="preference-item">
                        <input type="checkbox" id="high-contrast"> High Contrast Mode
                    </label>
                    <label class="preference-item">
                        <input type="checkbox" id="large-text"> Larger Text Size
                    </label>
                    <label class="preference-item">
                        <input type="checkbox" id="focus-indicators"> Enhanced Focus Indicators
                    </label>
                </div>
                <div class="preference-group">
                    <h4>Motion & Animation</h4>
                    <label class="preference-item">
                        <input type="checkbox" id="reduce-motion"> Reduce Motion
                    </label>
                    <label class="preference-item">
                        <input type="checkbox" id="pause-animations"> Pause Animations
                    </label>
                </div>
                <div class="preference-group">
                    <h4>Navigation</h4>
                    <label class="preference-item">
                        <input type="checkbox" id="keyboard-navigation"> Keyboard Navigation Help
                    </label>
                    <label class="preference-item">
                        <input type="checkbox" id="skip-links"> Always Show Skip Links
                    </label>
                </div>
                <div class="preference-actions">
                    <button id="reset-preferences" class="secondary-button">Reset to Defaults</button>
                    <button id="save-preferences" class="primary-button">Save Preferences</button>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        this.bindPreferenceEvents(panel);
    }

    bindPreferenceEvents(panel) {
        // Close panel
        panel.querySelector('.panel-close').addEventListener('click', () => {
            this.togglePreferencesPanel();
        });

        // Save preferences
        panel.querySelector('#save-preferences').addEventListener('click', () => {
            this.savePreferences();
            this.announce('Accessibility preferences saved');
        });

        // Reset preferences
        panel.querySelector('#reset-preferences').addEventListener('click', () => {
            this.resetPreferences();
            this.announce('Accessibility preferences reset to defaults');
        });

        // Live preference updates
        panel.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.applyPreference(checkbox.id, checkbox.checked);
            });
        });
    }

    togglePreferencesPanel() {
        const panel = document.getElementById('accessibility-preferences');
        const isOpen = panel.classList.contains('open');
        
        if (isOpen) {
            panel.classList.remove('open');
            document.body.classList.remove('accessibility-panel-open');
        } else {
            panel.classList.add('open');
            document.body.classList.add('accessibility-panel-open');
            panel.querySelector('.panel-close').focus();
        }
    }

    // Enhanced interactive elements
    enhanceInteractiveElements() {
        // Add missing aria-labels
        this.addAriaLabels();
        
        // Enhance buttons and links
        this.enhanceButtons();
        
        // Add live regions for dynamic content
        this.setupLiveRegions();
        
        // Enhance form elements
        this.enhanceFormElements();
    }

    addAriaLabels() {
        // Add labels to common unlabeled elements
        const unlabeledButtons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        unlabeledButtons.forEach(button => {
            const text = button.textContent.trim() || button.title || 'Button';
            button.setAttribute('aria-label', text);
        });

        // Add labels to navigation links
        const navLinks = document.querySelectorAll('nav a:not([aria-label])');
        navLinks.forEach(link => {
            const text = link.textContent.trim();
            if (text) {
                link.setAttribute('aria-label', text);
            }
        });
    }

    enhanceButtons() {
        document.querySelectorAll('button, [role="button"]').forEach(button => {
            // Add keyboard activation for elements with button role
            if (!button.matches('button')) {
                button.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        button.click();
                    }
                });
            }

            // Add loading states
            button.addEventListener('click', () => {
                if (button.getAttribute('aria-busy') !== 'true') {
                    this.addLoadingState(button);
                }
            });
        });
    }

    addLoadingState(button) {
        const originalText = button.textContent;
        button.setAttribute('aria-busy', 'true');
        button.disabled = true;
        
        // Remove loading state after a reasonable time
        setTimeout(() => {
            button.setAttribute('aria-busy', 'false');
            button.disabled = false;
        }, 2000);
    }

    // Color and contrast controls
    setupColorAndContrastControls() {
        this.createQuickAccessibilityToolbar();
    }

    createQuickAccessibilityToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'quick-accessibility-toolbar';
        toolbar.setAttribute('aria-label', 'Quick accessibility tools');
        toolbar.innerHTML = `
            <button class="a11y-tool-btn" id="toggle-high-contrast" aria-label="Toggle high contrast">
                <span aria-hidden="true">🎨</span>
            </button>
            <button class="a11y-tool-btn" id="increase-font-size" aria-label="Increase font size">
                <span aria-hidden="true">A+</span>
            </button>
            <button class="a11y-tool-btn" id="decrease-font-size" aria-label="Decrease font size">
                <span aria-hidden="true">A-</span>
            </button>
            <button class="a11y-tool-btn" id="toggle-preferences" aria-label="Open accessibility preferences">
                <span aria-hidden="true">⚙️</span>
            </button>
        `;

        document.body.appendChild(toolbar);

        // Bind toolbar events
        toolbar.querySelector('#toggle-high-contrast').addEventListener('click', () => {
            this.toggleHighContrast();
        });

        toolbar.querySelector('#increase-font-size').addEventListener('click', () => {
            this.adjustFontSize(1.1);
        });

        toolbar.querySelector('#decrease-font-size').addEventListener('click', () => {
            this.adjustFontSize(0.9);
        });

        toolbar.querySelector('#toggle-preferences').addEventListener('click', () => {
            this.togglePreferencesPanel();
        });
    }

    toggleHighContrast() {
        const isHighContrast = document.body.classList.toggle('high-contrast');
        this.announce(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
        this.updatePreference('high-contrast', isHighContrast);
    }

    adjustFontSize(multiplier) {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const newSize = currentSize * multiplier;
        document.documentElement.style.fontSize = `${newSize}px`;
        this.announce(`Font size adjusted to ${Math.round(newSize)}px`);
    }

    // Keyboard shortcuts modal
    createKeyboardShortcutsModal() {
        const modal = document.createElement('div');
        modal.id = 'keyboard-shortcuts-modal';
        modal.className = 'modal';
        modal.setAttribute('aria-labelledby', 'shortcuts-title');
        modal.setAttribute('aria-hidden', 'true');
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="shortcuts-title">Keyboard Shortcuts</h2>
                    <button class="modal-close" aria-label="Close shortcuts help">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="shortcuts-grid">
                        <div class="shortcuts-section">
                            <h3>Navigation</h3>
                            <dl>
                                <dt>Alt + H</dt><dd>Go to Homepage</dd>
                                <dt>Alt + U</dt><dd>Go to Unit Plans</dd>
                                <dt>Alt + R</dt><dd>Go to Handouts</dd>
                                <dt>Alt + A</dt><dd>Go to Activities</dd>
                                <dt>Alt + G</dt><dd>Go to Games</dd>
                            </dl>
                        </div>
                        <div class="shortcuts-section">
                            <h3>Focus</h3>
                            <dl>
                                <dt>Alt + S</dt><dd>Focus Search</dd>
                                <dt>Alt + M</dt><dd>Focus Main Content</dd>
                                <dt>Alt + N</dt><dd>Focus Navigation</dd>
                                <dt>Tab</dt><dd>Next Element</dd>
                                <dt>Shift + Tab</dt><dd>Previous Element</dd>
                            </dl>
                        </div>
                        <div class="shortcuts-section">
                            <h3>Tools</h3>
                            <dl>
                                <dt>Alt + P</dt><dd>Accessibility Preferences</dd>
                                <dt>Ctrl + /</dt><dd>Show This Help</dd>
                                <dt>Escape</dt><dd>Close/Cancel</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Bind close events
        modal.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal(modal);
        });

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.closeModal(modal);
            }
        });
    }

    showKeyboardShortcuts() {
        const modal = document.getElementById('keyboard-shortcuts-modal');
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('.modal-close').focus();
        this.announce('Keyboard shortcuts help opened');
    }

    closeModal(modal) {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        this.announce('Modal closed');
    }

    // Preference management
    loadPreferences() {
        try {
            const saved = localStorage.getItem('te-kete-ako-a11y-preferences');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            console.warn('[A11y] Could not load preferences:', e);
            return {};
        }
    }

    savePreferences() {
        const panel = document.getElementById('accessibility-preferences');
        const checkboxes = panel.querySelectorAll('input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            this.preferences[checkbox.id] = checkbox.checked;
        });

        try {
            localStorage.setItem('te-kete-ako-a11y-preferences', JSON.stringify(this.preferences));
        } catch (e) {
            console.warn('[A11y] Could not save preferences:', e);
        }
    }

    applyStoredPreferences() {
        Object.entries(this.preferences).forEach(([key, value]) => {
            this.applyPreference(key, value);
            const checkbox = document.getElementById(key);
            if (checkbox) checkbox.checked = value;
        });
    }

    applyPreference(key, value) {
        switch (key) {
            case 'high-contrast':
                document.body.classList.toggle('high-contrast', value);
                break;
            case 'large-text':
                document.body.classList.toggle('large-text', value);
                break;
            case 'focus-indicators':
                document.body.classList.toggle('enhanced-focus-indicators', value);
                break;
            case 'reduce-motion':
                document.body.classList.toggle('reduce-motion', value);
                break;
            case 'pause-animations':
                document.body.classList.toggle('pause-animations', value);
                break;
            case 'keyboard-navigation':
                document.body.classList.toggle('keyboard-navigation-help', value);
                break;
            case 'skip-links':
                document.body.classList.toggle('always-show-skip-links', value);
                break;
        }
    }

    updatePreference(key, value) {
        this.preferences[key] = value;
        this.savePreferences();
    }

    resetPreferences() {
        this.preferences = {};
        localStorage.removeItem('te-kete-ako-a11y-preferences');
        
        // Reset UI
        const panel = document.getElementById('accessibility-preferences');
        const checkboxes = panel.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            this.applyPreference(checkbox.id, false);
        });
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityEnhancer = new AccessibilityEnhancer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityEnhancer;
}