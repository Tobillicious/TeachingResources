/**
 * Interactive Components Library
 * UX/Design-focused interactive elements for educational resources
 * Optimized for mobile, accessibility, and user engagement
 */

class InteractiveComponentsLibrary {
    constructor() {
        this.components = new Map();
        this.sounds = {
            success: this.createAudioContext('success'),
            error: this.createAudioContext('error'),
            click: this.createAudioContext('click')
        };
        this.initializeAccessibility();
    }

    /**
     * Create audio context for subtle sound feedback
     */
    createAudioContext(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            return {
                context: audioContext,
                play: () => {
                    const frequencies = { success: 523.25, error: 220, click: 440 };
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.value = frequencies[type];
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                }
            };
        } catch (e) {
            return { play: () => {} }; // Fallback for browsers without audio support
        }
    }

    /**
     * Initialize accessibility features
     */
    initializeAccessibility() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add focus indicators CSS
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--primary-blue) !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Create Hook Writing Mini-Game
     */
    createHookGame(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }
        
        // Show loading state
        this.createLoadingState(containerId, 'Loading interactive game...');
        
        // Simulate async loading for better UX
        setTimeout(() => {
            this.buildHookGame(containerId, options);
        }, 100);
    }
    
    /**
     * Build Hook Writing Mini-Game
     */
    buildHookGame(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const config = {
            title: 'Hook Writing Challenge',
            description: 'Match each hook type with its example',
            examples: [
                { text: 'What if you could gain an extra day every week?', type: 'question', id: 'hook1' },
                { text: 'The first wave crashed over the deck, stealing hope.', type: 'action', id: 'hook2' },
                { text: 'Every year, 50 million birds die from window collisions.', type: 'fact', id: 'hook3' }
            ],
            types: [
                { name: 'Rhetorical Question', id: 'question' },
                { name: 'Action/Description', id: 'action' },
                { name: 'Surprising Fact', id: 'fact' }
            ],
            ...options
        };

        const gameHTML = `
            <div class="interactive-game" role="region" aria-labelledby="game-title-${containerId}">
                <div class="game-header">
                    <div class="game-icon">✍️</div>
                    <h3 class="game-title" id="game-title-${containerId}">${config.title}</h3>
                </div>
                <p class="game-description">${config.description}</p>
                
                <div class="game-content">
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-${containerId}"></div>
                    </div>
                    <p class="progress-text" id="progress-text-${containerId}">0 of ${config.examples.length} matched</p>
                    
                    <div class="hook-examples" style="margin-bottom: 1rem;">
                        <h4>Hook Examples:</h4>
                        <div class="draggable-container">
                            ${config.examples.map(example => `
                                <div class="draggable-item" 
                                     draggable="true" 
                                     data-type="${example.type}" 
                                     data-id="${example.id}"
                                     tabindex="0"
                                     role="button"
                                     aria-describedby="drag-instructions">
                                    ${example.text}
                                </div>
                            `).join('')}
                        </div>
                        <div id="drag-instructions" class="sr-only">
                            Drag this hook example to the correct category below, or use arrow keys and space to select.
                        </div>
                    </div>
                    
                    <div class="drop-zones">
                        <h4>Hook Types:</h4>
                        ${config.types.map(type => `
                            <div class="drag-drop-area" 
                                 data-type="${type.id}"
                                 tabindex="0"
                                 role="button"
                                 aria-label="Drop zone for ${type.name}">
                                <div class="drop-zone-content">
                                    <strong>${type.name}</strong>
                                    <div class="dropped-items" id="dropped-${type.id}"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="game-actions" style="margin-top: 1rem;">
                        <button class="interactive-button" id="check-answers-${containerId}">
                            Check Answers
                        </button>
                        <button class="interactive-button secondary" id="reset-game-${containerId}">
                            Reset Game
                        </button>
                    </div>
                    
                    <div class="feedback-message" id="feedback-${containerId}" role="alert" aria-live="polite">
                    </div>
                </div>
            </div>
        `;

        try {
            container.innerHTML = gameHTML;
            this.initializeHookGameEvents(containerId, config);
            this.components.set(containerId, { type: 'hook-game', config });
        } catch (error) {
            console.error('Error building hook game:', error);
            this.showErrorState(containerId, 'Failed to load interactive game. Please refresh the page.');
        }
    }

    /**
     * Initialize Hook Game Events
     */
    initializeHookGameEvents(containerId, config) {
        try {
            const container = document.getElementById(containerId);
            const draggableItems = container.querySelectorAll('.draggable-item');
            const dropZones = container.querySelectorAll('.drag-drop-area');
            const checkButton = container.querySelector(`#check-answers-${containerId}`);
            const resetButton = container.querySelector(`#reset-game-${containerId}`);
            const feedback = container.querySelector(`#feedback-${containerId}`);

            let gameState = {
                matches: 0,
                attempts: 0,
                completed: false
            };
            
            // Add error handling for missing elements
            if (!draggableItems.length || !dropZones.length) {
                throw new Error('Required game elements not found');
            }

        // Drag and Drop Events
        draggableItems.forEach(item => {
            // Mouse/Touch Events
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', item.dataset.id);
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });

            // Keyboard Events
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Space' || e.key === 'Enter') {
                    e.preventDefault();
                    this.handleKeyboardSelection(item, dropZones);
                }
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.focusNext(item, draggableItems);
                }
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.focusPrevious(item, draggableItems);
                }
            });
        });

        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const draggedId = e.dataTransfer.getData('text/plain');
                const draggedItem = container.querySelector(`[data-id="${draggedId}"]`);
                
                if (draggedItem) {
                    this.handleDrop(draggedItem, zone, containerId);
                }
            });
        });

        // Button Events
        checkButton.addEventListener('click', () => {
            this.checkAnswers(containerId, config, gameState);
        });

        resetButton.addEventListener('click', () => {
            this.resetGame(containerId, config, gameState);
        });
    }

    /**
     * Handle keyboard selection for accessibility
     */
    handleKeyboardSelection(item, dropZones) {
        const correctZone = Array.from(dropZones).find(zone => 
            zone.dataset.type === item.dataset.type
        );
        
        if (correctZone) {
            this.handleDrop(item, correctZone, item.closest('.interactive-game').id);
        }
    }

    /**
     * Handle focus navigation
     */
    focusNext(current, items) {
        const currentIndex = Array.from(items).indexOf(current);
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].focus();
    }

    focusPrevious(current, items) {
        const currentIndex = Array.from(items).indexOf(current);
        const previousIndex = (currentIndex - 1 + items.length) % items.length;
        items[previousIndex].focus();
    }

    /**
     * Handle drop logic
     */
    handleDrop(item, zone, containerId) {
        const droppedContainer = zone.querySelector('.dropped-items');
        const clonedItem = item.cloneNode(true);
        
        // Remove from original position
        item.remove();
        
        // Add to drop zone
        clonedItem.classList.add('dropped');
        clonedItem.removeAttribute('draggable');
        clonedItem.setAttribute('tabindex', '-1');
        droppedContainer.appendChild(clonedItem);
        
        zone.classList.add('has-content');
        this.updateProgress(containerId);
        this.sounds.click.play();
        
        // Add micro-interaction
        clonedItem.style.transform = 'scale(0.9)';
        setTimeout(() => {
            clonedItem.style.transform = 'scale(1)';
        }, 150);
    }

    /**
     * Update progress indicator
     */
    updateProgress(containerId) {
        const container = document.getElementById(containerId);
        const droppedItems = container.querySelectorAll('.dropped-items .draggable-item');
        const totalItems = this.components.get(containerId).config.examples.length;
        const progress = (droppedItems.length / totalItems) * 100;
        
        const progressBar = container.querySelector(`#progress-${containerId}`);
        const progressText = container.querySelector(`#progress-text-${containerId}`);
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${droppedItems.length} of ${totalItems} matched`;
    }

    /**
     * Check answers and provide feedback
     */
    checkAnswers(containerId, config, gameState) {
        const container = document.getElementById(containerId);
        const dropZones = container.querySelectorAll('.drag-drop-area');
        const feedback = container.querySelector(`#feedback-${containerId}`);
        
        let correct = 0;
        let total = 0;
        
        dropZones.forEach(zone => {
            const droppedItems = zone.querySelectorAll('.dropped-items .draggable-item');
            droppedItems.forEach(item => {
                total++;
                if (item.dataset.type === zone.dataset.type) {
                    correct++;
                    item.classList.add('correct');
                } else {
                    item.classList.add('incorrect');
                }
            });
        });
        
        gameState.attempts++;
        gameState.matches = correct;
        
        // Show feedback
        if (correct === total && total === config.examples.length) {
            feedback.className = 'feedback-message success show';
            feedback.innerHTML = `
                <span>🎉</span>
                <div>
                    <strong>Excellent work!</strong> You correctly matched all hook types.
                    ${gameState.attempts === 1 ? ' Perfect on your first try!' : ''}
                </div>
            `;
            gameState.completed = true;
            this.sounds.success.play();
        } else {
            feedback.className = 'feedback-message error show';
            feedback.innerHTML = `
                <span>💡</span>
                <div>
                    <strong>Keep trying!</strong> You got ${correct} out of ${total} correct.
                    ${total < config.examples.length ? ' Make sure to place all examples first.' : ''}
                </div>
            `;
            this.sounds.error.play();
        }
        
        // Auto-hide feedback after 5 seconds
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 5000);
    }

    /**
     * Reset game to initial state
     */
    resetGame(containerId, config, gameState) {
        const container = document.getElementById(containerId);
        
        // Reset game state
        gameState.matches = 0;
        gameState.attempts = 0;
        gameState.completed = false;
        
        // Clear drop zones
        container.querySelectorAll('.dropped-items').forEach(zone => {
            zone.innerHTML = '';
        });
        
        // Remove classes
        container.querySelectorAll('.drag-drop-area').forEach(zone => {
            zone.classList.remove('has-content');
        });
        
        // Restore draggable items
        const draggableContainer = container.querySelector('.draggable-container');
        draggableContainer.innerHTML = config.examples.map(example => `
            <div class="draggable-item" 
                 draggable="true" 
                 data-type="${example.type}" 
                 data-id="${example.id}"
                 tabindex="0"
                 role="button"
                 aria-describedby="drag-instructions">
                ${example.text}
            </div>
        `).join('');
        
        // Reset progress
        this.updateProgress(containerId);
        
        // Clear feedback
        const feedback = container.querySelector(`#feedback-${containerId}`);
        feedback.classList.remove('show');
        
        // Re-initialize events for new items
        try {
            this.initializeHookGameEvents(containerId, config);
        } catch (error) {
            console.error('Error reinitializing game events:', error);
            this.showErrorState(containerId, 'Game reset failed. Please refresh the page.');
        }
    } catch (error) {
            console.error('Error initializing game events:', error);
            this.showErrorState(containerId, 'Failed to initialize game. Please refresh the page.');
        }
    }

    /**
     * Create Conclusion Writing Mini-Game
     */
    createConclusionGame(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }
        
        try {
            const config = {
                title: 'Conclusion Techniques Challenge',
                description: 'Identify effective conclusion techniques in these examples',
                examples: [
                    { text: 'In conclusion, climate change demands immediate action from every one of us.', type: 'call-to-action', id: 'conclusion1' },
                    { text: 'Like a river that shapes the landscape, education transforms society over time.', type: 'metaphor', id: 'conclusion2' },
                    { text: 'The evidence is clear: renewable energy is not just possible, it\'s profitable.', type: 'summary', id: 'conclusion3' }
                ],
                types: [
                    { name: 'Call to Action', id: 'call-to-action' },
                    { name: 'Metaphor/Analogy', id: 'metaphor' },
                    { name: 'Summary Statement', id: 'summary' }
                ],
                ...options
            };

            // Similar structure to hook game but with conclusion-specific content
            this.createHookGame(containerId, config);
        } catch (error) {
            console.error('Error creating conclusion game:', error);
            this.showErrorState(containerId, 'Failed to load conclusion game. Please refresh the page.');
        }
    }

    /**
     * Create Rhetorical Devices Mini-Game
     */
    createRhetoricalDevicesGame(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }
        
        try {
            const config = {
                title: 'Rhetorical Devices Detective',
                description: 'Identify the rhetorical devices used in these persuasive statements',
                examples: [
                    { text: 'We cannot, we must not, we will not give up on our planet.', type: 'repetition', id: 'rhetorical1' },
                    { text: 'Are we going to stand by and watch our future disappear?', type: 'rhetorical-question', id: 'rhetorical2' },
                    { text: 'Every expert, every scientist, every researcher agrees.', type: 'authority', id: 'rhetorical3' }
                ],
                types: [
                    { name: 'Repetition', id: 'repetition' },
                    { name: 'Rhetorical Question', id: 'rhetorical-question' },
                    { name: 'Appeal to Authority', id: 'authority' }
                ],
                ...options
            };

            this.createHookGame(containerId, config);
        } catch (error) {
            console.error('Error creating rhetorical devices game:', error);
            this.showErrorState(containerId, 'Failed to load rhetorical devices game. Please refresh the page.');
        }
    }

    /**
     * Create Loading State Component
     */
    createLoadingState(containerId, message = 'Loading...') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="loading-state" role="status" aria-live="polite">
                <div class="loading-spinner" aria-hidden="true"></div>
                <span>${message}</span>
            </div>
        `;
    }
    
    /**
     * Show Error State
     */
    showErrorState(containerId, message = 'Something went wrong') {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="error-state" role="alert">
                <div class="error-icon" aria-hidden="true">⚠️</div>
                <div class="error-content">
                    <h3>Oops! Something went wrong</h3>
                    <p>${message}</p>
                    <button class="interactive-button" onclick="location.reload()">
                        <span>Try Again</span>
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Show Success State
     */
    showSuccessState(containerId, message = 'Success!', callback = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const successHTML = `
            <div class="success-state" role="status" aria-live="polite">
                <div class="success-icon" aria-hidden="true">🎉</div>
                <div class="success-content">
                    <h3>Well done!</h3>
                    <p>${message}</p>
                    ${callback ? '<button class="interactive-button success" id="success-continue">Continue</button>' : ''}
                </div>
            </div>
        `;
        
        container.innerHTML = successHTML;
        
        if (callback) {
            const continueBtn = container.querySelector('#success-continue');
            if (continueBtn) {
                continueBtn.addEventListener('click', callback);
            }
        }
    }

    /**
     * Create Progress Indicator
     */
    createProgressIndicator(containerId, current, total, label = 'Progress') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const percentage = (current / total) * 100;
        
        container.innerHTML = `
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-text">
                    ${label}: ${current} of ${total} (${Math.round(percentage)}%)
                </div>
            </div>
        `;
    }

    /**
     * Show feedback message
     */
    showFeedback(containerId, message, type = 'info') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const feedback = document.createElement('div');
        feedback.className = `feedback-message ${type}`;
        feedback.innerHTML = message;
        
        container.appendChild(feedback);
        
        // Trigger animation
        setTimeout(() => {
            feedback.classList.add('show');
        }, 100);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            feedback.classList.remove('show');
            setTimeout(() => {
                feedback.remove();
            }, 300);
        }, 5000);
    }

    /**
     * Initialize touch gestures for mobile
     */
    initializeTouchGestures() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', (e) => {
            if (!touchStartX || !touchStartY) return;
            
            const touchEndX = e.touches[0].clientX;
            const touchEndY = e.touches[0].clientY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Handle swipe gestures for navigation
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 50) {
                    // Swipe left
                    this.triggerSwipeLeft();
                } else if (diffX < -50) {
                    // Swipe right
                    this.triggerSwipeRight();
                }
            }
        });
    }

    /**
     * Trigger swipe left action
     */
    triggerSwipeLeft() {
        // Implementation for swipe left (e.g., next item)
        const event = new CustomEvent('swipeLeft');
        document.dispatchEvent(event);
    }

    /**
     * Trigger swipe right action
     */
    triggerSwipeRight() {
        // Implementation for swipe right (e.g., previous item)
        const event = new CustomEvent('swipeRight');
        document.dispatchEvent(event);
    }
}

// Initialize the library
window.InteractiveComponents = new InteractiveComponentsLibrary();

// Auto-initialize touch gestures
document.addEventListener('DOMContentLoaded', () => {
    window.InteractiveComponents.initializeTouchGestures();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractiveComponentsLibrary;
}