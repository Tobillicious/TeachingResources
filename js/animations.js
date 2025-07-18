/**
 * Animation Controller for Educational Resource Website
 * Handles scroll-based animations, micro-interactions, and visual feedback
 */

class AnimationController {
    constructor() {
        this.intersectionObserver = null;
        this.animatedElements = new Set();
        this.isReducedMotion = this.checkReducedMotion();
        this.init();
    }

    /**
     * Check if user prefers reduced motion
     */
    checkReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Initialize animation controller
     */
    init() {
        if (this.isReducedMotion) {
            // Respect user preferences and skip animations
            console.log('Reduced motion preference detected, skipping animations');
            return;
        }

        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupMicroInteractions();
        this.setupGameAnimations();
    }

    /**
     * Setup intersection observer for scroll-based animations
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);
    }

    /**
     * Setup scroll-based animations
     */
    setupScrollAnimations() {
        // Add animation classes to elements
        const elementsToAnimate = [
            '.resource-card',
            '.content-section',
            '.recommended-reading',
            '.interactive-game',
            '.reading-item'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.intersectionObserver.observe(element);
            });
        });

        // Special handling for section headings
        const sectionHeadings = document.querySelectorAll('.section-heading');
        sectionHeadings.forEach(heading => {
            this.intersectionObserver.observe(heading);
        });
    }

    /**
     * Animate element when it comes into view
     */
    animateElement(element) {
        if (element.classList.contains('resource-card')) {
            element.classList.add('in-view');
            this.addStaggeredAnimation(element);
        } else if (element.classList.contains('content-section')) {
            element.classList.add('in-view');
        } else if (element.classList.contains('section-heading')) {
            element.classList.add('in-view');
        } else if (element.classList.contains('interactive-game')) {
            element.classList.add('loaded');
            this.animateGameLoad(element);
        } else if (element.classList.contains('recommended-reading')) {
            this.animateRecommendedReading(element);
        }
    }

    /**
     * Add staggered animation to grid elements
     */
    addStaggeredAnimation(element) {
        const siblings = Array.from(element.parentNode.children);
        const index = siblings.indexOf(element);
        
        setTimeout(() => {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, index * 100);
    }

    /**
     * Animate game loading
     */
    animateGameLoad(gameElement) {
        const gameIcon = gameElement.querySelector('.game-icon');
        const gameTitle = gameElement.querySelector('.game-title');
        const gameContent = gameElement.querySelector('.game-content');

        if (gameIcon) {
            gameIcon.style.animation = 'bounce 0.8s ease-in-out';
        }

        if (gameTitle) {
            setTimeout(() => {
                gameTitle.style.animation = 'slideInRight 0.6s ease-out';
            }, 200);
        }

        if (gameContent) {
            setTimeout(() => {
                gameContent.style.animation = 'fadeIn 0.8s ease-out';
            }, 400);
        }
    }

    /**
     * Animate recommended reading section
     */
    animateRecommendedReading(element) {
        const readingItems = element.querySelectorAll('.reading-item');
        readingItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            }, index * 150);
        });
    }

    /**
     * Setup micro-interactions
     */
    setupMicroInteractions() {
        // Button click animations
        this.setupButtonAnimations();
        
        // Card hover effects
        this.setupCardHoverEffects();
        
        // Navigation animations
        this.setupNavigationAnimations();
        
        // Form feedback animations
        this.setupFormFeedbackAnimations();
    }

    /**
     * Setup button animations
     */
    setupButtonAnimations() {
        const buttons = document.querySelectorAll('.interactive-button, .nav-link, .resource-link');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e);
            });

            button.addEventListener('mouseenter', () => {
                if (!this.isReducedMotion) {
                    button.style.transform = 'translateY(-2px)';
                }
            });

            button.addEventListener('mouseleave', () => {
                if (!this.isReducedMotion) {
                    button.style.transform = 'translateY(0)';
                }
            });
        });
    }

    /**
     * Create ripple effect on button click
     */
    createRippleEffect(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        // Add ripple styles to document if not already present
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    /**
     * Setup card hover effects
     */
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.resource-card, .reading-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
    }

    /**
     * Animate card hover effect
     */
    animateCardHover(card, isHovering) {
        if (this.isReducedMotion) return;

        const image = card.querySelector('img');
        const title = card.querySelector('.resource-title, h4');
        
        if (isHovering) {
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
            if (title) {
                title.style.transform = 'translateY(-2px)';
            }
        } else {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (title) {
                title.style.transform = 'translateY(0)';
            }
        }
    }

    /**
     * Setup navigation animations
     */
    setupNavigationAnimations() {
        const navLinks = document.querySelectorAll('.nav-link');
        const breadcrumbs = document.querySelectorAll('.breadcrumb');

        [...navLinks, ...breadcrumbs].forEach(link => {
            link.addEventListener('click', (e) => {
                this.animateNavigation(e);
            });
        });
    }

    /**
     * Animate navigation transition
     */
    animateNavigation(event) {
        if (this.isReducedMotion) return;

        const link = event.currentTarget;
        
        // Add loading indicator
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        loadingSpinner.style.cssText = `
            width: 16px;
            height: 16px;
            margin-left: 8px;
            display: inline-block;
        `;
        
        link.appendChild(loadingSpinner);

        // Remove spinner after short delay (or on page unload)
        setTimeout(() => {
            if (loadingSpinner.parentNode) {
                loadingSpinner.remove();
            }
        }, 2000);
    }

    /**
     * Setup form feedback animations
     */
    setupFormFeedbackAnimations() {
        // Monitor for feedback messages
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList.contains('feedback-message')) {
                        this.animateFeedbackMessage(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Animate feedback message
     */
    animateFeedbackMessage(message) {
        if (this.isReducedMotion) return;

        message.style.transform = 'translateY(-20px)';
        message.style.opacity = '0';
        
        setTimeout(() => {
            message.style.transition = 'all 0.4s ease';
            message.style.transform = 'translateY(0)';
            message.style.opacity = '1';
        }, 50);
    }

    /**
     * Setup game-specific animations
     */
    setupGameAnimations() {
        // Animate draggable items
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('draggable-item')) {
                this.animateDragStart(e.target);
            }
        });

        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('draggable-item')) {
                this.animateDragEnd(e.target);
            }
        });

        // Animate drop zones
        document.addEventListener('dragover', (e) => {
            if (e.target.classList.contains('drag-drop-area')) {
                this.animateDropZone(e.target, true);
            }
        });

        document.addEventListener('dragleave', (e) => {
            if (e.target.classList.contains('drag-drop-area')) {
                this.animateDropZone(e.target, false);
            }
        });
    }

    /**
     * Animate drag start
     */
    animateDragStart(element) {
        if (this.isReducedMotion) return;
        
        element.style.transform = 'rotate(5deg) scale(0.95)';
        element.style.opacity = '0.8';
    }

    /**
     * Animate drag end
     */
    animateDragEnd(element) {
        if (this.isReducedMotion) return;
        
        element.style.transform = 'rotate(0deg) scale(1)';
        element.style.opacity = '1';
    }

    /**
     * Animate drop zone
     */
    animateDropZone(zone, isActive) {
        if (this.isReducedMotion) return;

        if (isActive) {
            zone.style.transform = 'scale(1.02)';
            zone.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.3)';
        } else {
            zone.style.transform = 'scale(1)';
            zone.style.boxShadow = 'none';
        }
    }

    /**
     * Animate progress bar
     */
    animateProgressBar(progressBar, targetWidth) {
        if (this.isReducedMotion) {
            progressBar.style.width = targetWidth + '%';
            return;
        }

        const currentWidth = parseInt(progressBar.style.width) || 0;
        const increment = (targetWidth - currentWidth) / 20;
        let currentStep = 0;

        const animate = () => {
            if (currentStep < 20) {
                const newWidth = currentWidth + (increment * currentStep);
                progressBar.style.width = newWidth + '%';
                currentStep++;
                requestAnimationFrame(animate);
            } else {
                progressBar.style.width = targetWidth + '%';
            }
        };

        animate();
    }

    /**
     * Create success celebration animation
     */
    createSuccessCelebration(container) {
        if (this.isReducedMotion) return;

        const celebration = document.createElement('div');
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            z-index: 10000;
            pointer-events: none;
            animation: celebrate 2s ease-out forwards;
        `;
        celebration.textContent = '🎉';

        // Add celebration animation styles
        if (!document.getElementById('celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                @keyframes celebrate {
                    0% {
                        transform: translate(-50%, -50%) scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.2);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(celebration);

        setTimeout(() => {
            celebration.remove();
        }, 2000);
    }

    /**
     * Destroy animation controller
     */
    destroy() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
        this.animatedElements.clear();
    }
}

// Initialize animation controller when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.AnimationController = new AnimationController();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.AnimationController) {
        window.AnimationController.destroy();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}