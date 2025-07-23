/**
 * =================================================================
 * ADAPTIVE DIFFICULTY SYSTEM - Te Kete Ako Educational Games
 * =================================================================
 * 
 * PURPOSE: Revolutionary adaptive difficulty system that adjusts 
 * game complexity based on student performance, learning patterns,
 * and cultural engagement. Maintains educational integrity while
 * providing personalized learning experiences.
 * 
 * FEATURES:
 * - Real-time difficulty adjustment based on performance
 * - Cultural knowledge progression tracking
 * - Learning style adaptation
 * - Skill level assessment and targeting
 * - Educational objective alignment
 * 
 * CULTURAL INTEGRATION:
 * - Adapts cultural content complexity
 * - Tracks Te Reo Māori progression
 * - Adjusts traditional knowledge depth
 * - Maintains cultural authenticity
 * 
 * =================================================================
 */

class AdaptiveDifficultySystem {
    constructor() {
        this.studentId = this.getStudentId();
        this.difficultyProfiles = this.loadDifficultyProfiles();
        this.performanceHistory = this.loadPerformanceHistory();
        this.learningAnalytics = this.loadLearningAnalytics();
        this.init();
    }

    /**
     * Initialize the adaptive difficulty system
     */
    init() {
        this.setupAnalyticsTracking();
        this.assessCurrentSkillLevel();
    }

    /**
     * Difficulty Levels with Educational Targeting
     */
    DIFFICULTY_LEVELS = {
        BEGINNER: {
            name: 'Tamaiti',
            nameEnglish: 'Beginner',
            level: 1,
            description: 'Starting the learning journey',
            icon: '🌱',
            adjustments: {
                timeLimit: 1.5, // 50% more time
                hints: 3,
                categoryComplexity: 'basic',
                vocabularyLevel: 'introductory',
                culturalDepth: 'surface'
            }
        },
        DEVELOPING: {
            name: 'Akonga',
            nameEnglish: 'Developing',
            level: 2,
            description: 'Building confidence and skills',
            icon: '📚',
            adjustments: {
                timeLimit: 1.2, // 20% more time
                hints: 2,
                categoryComplexity: 'intermediate',
                vocabularyLevel: 'developing',
                culturalDepth: 'moderate'
            }
        },
        PROFICIENT: {
            name: 'Toa',
            nameEnglish: 'Proficient',
            level: 3,
            description: 'Demonstrating competence',
            icon: '⚔️',
            adjustments: {
                timeLimit: 1.0, // Standard time
                hints: 1,
                categoryComplexity: 'standard',
                vocabularyLevel: 'proficient',
                culturalDepth: 'deep'
            }
        },
        ADVANCED: {
            name: 'Rangatira',
            nameEnglish: 'Advanced',
            level: 4,
            description: 'Leading through expertise',
            icon: '👑',
            adjustments: {
                timeLimit: 0.8, // 20% less time
                hints: 0,
                categoryComplexity: 'challenging',
                vocabularyLevel: 'advanced',
                culturalDepth: 'profound'
            }
        },
        EXPERT: {
            name: 'Kaiako',
            nameEnglish: 'Expert',
            level: 5,
            description: 'Mastery and teaching others',
            icon: '🌟',
            adjustments: {
                timeLimit: 0.6, // 40% less time
                hints: 0,
                categoryComplexity: 'expert',
                vocabularyLevel: 'expert',
                culturalDepth: 'whakawhanaunga'
            }
        }
    };

    /**
     * Learning Style Adaptations
     */
    LEARNING_STYLES = {
        VISUAL: {
            name: 'Visual Learner',
            adaptations: {
                useImageHints: true,
                colorCodeCategories: true,
                visualProgress: true,
                iconBasedFeedback: true
            }
        },
        AUDITORY: {
            name: 'Auditory Learner',
            adaptations: {
                soundFeedback: true,
                verbalInstructions: true,
                musicBackground: true,
                teReoAudio: true
            }
        },
        KINESTHETIC: {
            name: 'Kinesthetic Learner',
            adaptations: {
                handsonActivities: true,
                movementBasedGames: true,
                tactileElements: true,
                realWorldConnections: true
            }
        },
        COLLABORATIVE: {
            name: 'Collaborative Learner',
            adaptations: {
                teamChallenges: true,
                peerLearning: true,
                groupDiscussions: true,
                socialElements: true
            }
        }
    };

    /**
     * Game-Specific Adaptations
     */
    GAME_ADAPTATIONS = {
        'te-reo-wordle': {
            beginner: {
                wordLength: 4,
                commonWords: true,
                contextHints: true,
                translationHelp: true
            },
            advanced: {
                wordLength: 6,
                dialectVariations: true,
                culturalContext: true,
                noTranslation: true
            }
        },
        'english-wordle': {
            beginner: {
                wordLength: 4,
                frequentWords: true,
                definitionHints: true,
                synonymHelp: true
            },
            advanced: {
                wordLength: 6,
                academicVocabulary: true,
                noHints: true,
                timeChallenge: true
            }
        },
        'categories': {
            beginner: {
                categoryHints: true,
                exampleAnswers: 2,
                extendedTime: true,
                basicCategories: true
            },
            advanced: {
                abstractCategories: true,
                culturalCategories: true,
                timeChallenge: true,
                noHints: true
            }
        },
        'spelling-bee': {
            beginner: {
                shortWords: true,
                commonWords: true,
                letterHints: true,
                definitionAlways: true
            },
            advanced: {
                complexWords: true,
                teReoIntegration: true,
                etymologyChallenge: true,
                noDefinitions: true
            }
        },
        'countdown-letters': {
            beginner: {
                longerTime: true,
                frequentLetters: true,
                wordSuggestions: true,
                basicScoring: true
            },
            advanced: {
                challengingLetters: true,
                advancedScoring: true,
                teReoBonus: true,
                speedChallenge: true
            }
        }
    };

    /**
     * Get or create student ID
     */
    getStudentId() {
        let studentId = localStorage.getItem('teKeteAko_studentId');
        if (!studentId) {
            studentId = 'student_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('teKeteAko_studentId', studentId);
        }
        return studentId;
    }

    /**
     * Load difficulty profiles from localStorage
     */
    loadDifficultyProfiles() {
        const saved = localStorage.getItem(`adaptive_difficulty_${this.studentId}`);
        return saved ? JSON.parse(saved) : {
            overall: 'DEVELOPING',
            byGame: {},
            byCategory: {},
            learningStyle: null,
            culturalProgression: 1,
            lastAssessment: null
        };
    }

    /**
     * Load performance history
     */
    loadPerformanceHistory() {
        const saved = localStorage.getItem(`performance_history_${this.studentId}`);
        return saved ? JSON.parse(saved) : {
            games: {},
            recentPerformance: [],
            trends: {},
            culturalEngagement: []
        };
    }

    /**
     * Load learning analytics
     */
    loadLearningAnalytics() {
        const saved = localStorage.getItem(`learning_analytics_${this.studentId}`);
        return saved ? JSON.parse(saved) : {
            preferredDifficulty: {},
            timeSpentByDifficulty: {},
            successRateByDifficulty: {},
            engagementMetrics: {},
            culturalInteractionPatterns: {}
        };
    }

    /**
     * Assess current skill level based on performance
     */
    assessCurrentSkillLevel() {
        const recentGames = this.performanceHistory.recentPerformance.slice(-10);
        
        if (recentGames.length === 0) {
            return 'DEVELOPING'; // Default for new students
        }

        const avgScore = recentGames.reduce((sum, game) => sum + game.score, 0) / recentGames.length;
        const avgTime = recentGames.reduce((sum, game) => sum + game.timeSpent, 0) / recentGames.length;
        const culturalBonus = recentGames.filter(game => game.culturalBonus).length / recentGames.length;

        // Calculate difficulty level
        let difficultyScore = 0;
        
        // Score-based assessment (40% weight)
        if (avgScore >= 800) difficultyScore += 4;
        else if (avgScore >= 600) difficultyScore += 3;
        else if (avgScore >= 400) difficultyScore += 2;
        else if (avgScore >= 200) difficultyScore += 1;

        // Time efficiency (30% weight)
        if (avgTime <= 60) difficultyScore += 3;
        else if (avgTime <= 120) difficultyScore += 2;
        else if (avgTime <= 180) difficultyScore += 1;

        // Cultural engagement (30% weight)
        if (culturalBonus >= 0.7) difficultyScore += 3;
        else if (culturalBonus >= 0.4) difficultyScore += 2;
        else if (culturalBonus >= 0.2) difficultyScore += 1;

        // Map score to difficulty level
        const levelNames = Object.keys(this.DIFFICULTY_LEVELS);
        const levelIndex = Math.min(Math.floor(difficultyScore / 2), levelNames.length - 1);
        
        return levelNames[levelIndex];
    }

    /**
     * Get difficulty adjustments for a specific game
     */
    getDifficultyAdjustments(gameId) {
        const currentDifficulty = this.difficultyProfiles.byGame[gameId] || 
                                this.difficultyProfiles.overall || 
                                'DEVELOPING';
        
        const difficultyLevel = this.DIFFICULTY_LEVELS[currentDifficulty];
        const gameAdaptations = this.GAME_ADAPTATIONS[gameId] || {};
        
        // Get base adjustments
        const adjustments = { ...difficultyLevel.adjustments };
        
        // Add game-specific adjustments
        if (currentDifficulty === 'BEGINNER' || currentDifficulty === 'DEVELOPING') {
            Object.assign(adjustments, gameAdaptations.beginner || {});
        } else if (currentDifficulty === 'ADVANCED' || currentDifficulty === 'EXPERT') {
            Object.assign(adjustments, gameAdaptations.advanced || {});
        }

        // Add learning style adaptations
        if (this.difficultyProfiles.learningStyle) {
            const styleAdaptations = this.LEARNING_STYLES[this.difficultyProfiles.learningStyle];
            if (styleAdaptations) {
                Object.assign(adjustments, styleAdaptations.adaptations);
            }
        }

        return adjustments;
    }

    /**
     * Record game performance and adjust difficulty
     */
    recordPerformance(gameId, performanceData) {
        const performance = {
            gameId,
            timestamp: new Date().toISOString(),
            score: performanceData.score,
            timeSpent: performanceData.timeSpent,
            difficulty: this.difficultyProfiles.byGame[gameId] || this.difficultyProfiles.overall,
            culturalBonus: performanceData.culturalBonus || false,
            hints: performanceData.hintsUsed || 0,
            attempts: performanceData.attempts || 1,
            completed: performanceData.completed || true
        };

        // Add to performance history
        this.performanceHistory.recentPerformance.push(performance);
        
        // Keep only last 50 performances
        if (this.performanceHistory.recentPerformance.length > 50) {
            this.performanceHistory.recentPerformance.shift();
        }

        // Update game-specific history
        if (!this.performanceHistory.games[gameId]) {
            this.performanceHistory.games[gameId] = [];
        }
        this.performanceHistory.games[gameId].push(performance);

        // Analyze and adjust difficulty
        this.analyzeTrendsAndAdjust(gameId, performance);

        // Save data
        this.saveData();

        return this.getSuggestedAdjustments(gameId, performance);
    }

    /**
     * Analyze performance trends and adjust difficulty
     */
    analyzeTrendsAndAdjust(gameId, latestPerformance) {
        const gameHistory = this.performanceHistory.games[gameId] || [];
        const recentGames = gameHistory.slice(-5); // Last 5 games
        
        if (recentGames.length < 3) return; // Need more data
        
        const avgScore = recentGames.reduce((sum, game) => sum + game.score, 0) / recentGames.length;
        const avgTime = recentGames.reduce((sum, game) => sum + game.timeSpent, 0) / recentGames.length;
        const successRate = recentGames.filter(game => game.completed).length / recentGames.length;
        
        const currentDifficulty = this.difficultyProfiles.byGame[gameId] || this.difficultyProfiles.overall;
        const currentLevel = this.DIFFICULTY_LEVELS[currentDifficulty].level;
        
        let newLevel = currentLevel;
        
        // Increase difficulty if performing well
        if (avgScore >= 700 && avgTime <= 120 && successRate >= 0.8 && currentLevel < 5) {
            newLevel = Math.min(currentLevel + 1, 5);
        }
        // Decrease difficulty if struggling
        else if (avgScore <= 300 || avgTime >= 300 || successRate <= 0.4 && currentLevel > 1) {
            newLevel = Math.max(currentLevel - 1, 1);
        }
        
        // Update difficulty if changed
        if (newLevel !== currentLevel) {
            const levelNames = Object.keys(this.DIFFICULTY_LEVELS);
            this.difficultyProfiles.byGame[gameId] = levelNames[newLevel - 1];
            
            // Also update overall difficulty as weighted average
            this.updateOverallDifficulty();
        }
    }

    /**
     * Update overall difficulty profile
     */
    updateOverallDifficulty() {
        const gameDifficulties = Object.values(this.difficultyProfiles.byGame);
        if (gameDifficulties.length === 0) return;
        
        const avgLevel = gameDifficulties.reduce((sum, difficulty) => {
            return sum + this.DIFFICULTY_LEVELS[difficulty].level;
        }, 0) / gameDifficulties.length;
        
        const levelNames = Object.keys(this.DIFFICULTY_LEVELS);
        const overallLevel = Math.round(avgLevel);
        this.difficultyProfiles.overall = levelNames[overallLevel - 1];
    }

    /**
     * Get suggested adjustments based on recent performance
     */
    getSuggestedAdjustments(gameId, performance) {
        const suggestions = [];
        
        // Performance-based suggestions
        if (performance.score >= 800) {
            suggestions.push({
                type: 'difficulty',
                message: 'Excellent performance! Consider increasing difficulty.',
                action: 'increase'
            });
        } else if (performance.score <= 200) {
            suggestions.push({
                type: 'difficulty',
                message: 'Try an easier level to build confidence.',
                action: 'decrease'
            });
        }
        
        // Time-based suggestions
        if (performance.timeSpent <= 60) {
            suggestions.push({
                type: 'challenge',
                message: 'You\'re fast! Try time-limited challenges.',
                action: 'add_time_pressure'
            });
        } else if (performance.timeSpent >= 300) {
            suggestions.push({
                type: 'support',
                message: 'Take your time! Consider using hints.',
                action: 'enable_hints'
            });
        }
        
        // Cultural engagement suggestions
        if (performance.culturalBonus) {
            suggestions.push({
                type: 'cultural',
                message: 'Great cultural engagement! Explore more Te Ao Māori content.',
                action: 'increase_cultural_content'
            });
        }
        
        return suggestions;
    }

    /**
     * Detect learning style based on performance patterns
     */
    detectLearningStyle() {
        const history = this.performanceHistory.recentPerformance;
        if (history.length < 10) return null;
        
        // Analyze patterns
        const visualGames = history.filter(p => p.gameId.includes('wordle')).length;
        const auditoryGames = history.filter(p => p.culturalBonus).length;
        const collaborativeGames = history.filter(p => p.gameId === 'categories').length;
        const kinestheticPerf = history.filter(p => p.timeSpent <= 120).length;
        
        const styles = {
            VISUAL: visualGames,
            AUDITORY: auditoryGames,
            KINESTHETIC: kinestheticPerf,
            COLLABORATIVE: collaborativeGames
        };
        
        const preferredStyle = Object.keys(styles).reduce((a, b) => 
            styles[a] > styles[b] ? a : b
        );
        
        this.difficultyProfiles.learningStyle = preferredStyle;
        return preferredStyle;
    }

    /**
     * Get personalized game recommendations
     */
    getGameRecommendations() {
        const currentDifficulty = this.difficultyProfiles.overall;
        const difficultyLevel = this.DIFFICULTY_LEVELS[currentDifficulty];
        
        const recommendations = [];
        
        // Game-specific recommendations based on difficulty
        Object.keys(this.GAME_ADAPTATIONS).forEach(gameId => {
            const gameHistory = this.performanceHistory.games[gameId] || [];
            const recentPerformance = gameHistory.slice(-3);
            
            let recommendation = {
                gameId,
                name: this.getGameName(gameId),
                difficulty: currentDifficulty,
                difficultyName: difficultyLevel.name,
                reasons: [],
                adjustments: this.getDifficultyAdjustments(gameId)
            };
            
            // Add specific reasons
            if (recentPerformance.length === 0) {
                recommendation.reasons.push('New game to try');
            } else {
                const avgScore = recentPerformance.reduce((sum, p) => sum + p.score, 0) / recentPerformance.length;
                if (avgScore >= 600) {
                    recommendation.reasons.push('You\'ve been performing well');
                } else if (avgScore <= 300) {
                    recommendation.reasons.push('Good for building confidence');
                }
            }
            
            // Learning style alignment
            if (this.difficultyProfiles.learningStyle) {
                const styleAlign = this.getGameStyleAlignment(gameId, this.difficultyProfiles.learningStyle);
                if (styleAlign) {
                    recommendation.reasons.push(`Matches your ${styleAlign} learning style`);
                }
            }
            
            recommendations.push(recommendation);
        });
        
        return recommendations.sort((a, b) => b.reasons.length - a.reasons.length);
    }

    /**
     * Get game name from ID
     */
    getGameName(gameId) {
        const names = {
            'te-reo-wordle': 'Te Reo Māori Wordle',
            'english-wordle': 'English Wordle',
            'categories': 'Categories Challenge',
            'spelling-bee': 'Spelling Bee',
            'countdown-letters': 'Countdown Letters'
        };
        return names[gameId] || gameId;
    }

    /**
     * Get game alignment with learning style
     */
    getGameStyleAlignment(gameId, learningStyle) {
        const alignments = {
            VISUAL: ['te-reo-wordle', 'english-wordle', 'spelling-bee'],
            AUDITORY: ['te-reo-wordle', 'spelling-bee'],
            KINESTHETIC: ['countdown-letters', 'categories'],
            COLLABORATIVE: ['categories']
        };
        
        return alignments[learningStyle]?.includes(gameId) ? learningStyle.toLowerCase() : null;
    }

    /**
     * Setup analytics tracking
     */
    setupAnalyticsTracking() {
        // Listen for game completion events
        document.addEventListener('gameCompleted', (event) => {
            const { gameId, score, timeSpent, culturalBonus, hintsUsed, attempts, completed } = event.detail;
            
            const suggestions = this.recordPerformance(gameId, {
                score,
                timeSpent,
                culturalBonus,
                hintsUsed,
                attempts,
                completed
            });
            
            // Show suggestions to user
            this.displaySuggestions(suggestions);
        });
    }

    /**
     * Display suggestions to user
     */
    displaySuggestions(suggestions) {
        if (suggestions.length === 0) return;
        
        const container = document.getElementById('difficulty-suggestions');
        if (!container) return;
        
        const suggestionsHtml = suggestions.map(suggestion => `
            <div class="difficulty-suggestion ${suggestion.type}">
                <p>${suggestion.message}</p>
                <button class="apply-suggestion-btn" data-action="${suggestion.action}">
                    Apply
                </button>
            </div>
        `).join('');
        
        container.innerHTML = `
            <div class="suggestions-panel">
                <h4>🎯 Personalized Suggestions</h4>
                ${suggestionsHtml}
            </div>
        `;
        
        // Setup suggestion buttons
        container.querySelectorAll('.apply-suggestion-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.applySuggestion(action);
            });
        });
    }

    /**
     * Apply a difficulty suggestion
     */
    applySuggestion(action) {
        switch (action) {
            case 'increase':
                this.adjustOverallDifficulty(1);
                break;
            case 'decrease':
                this.adjustOverallDifficulty(-1);
                break;
            case 'add_time_pressure':
                this.enableTimeChallenges();
                break;
            case 'enable_hints':
                this.enableHintSupport();
                break;
            case 'increase_cultural_content':
                this.increaseCulturalContent();
                break;
        }
        
        this.saveData();
    }

    /**
     * Adjust overall difficulty level
     */
    adjustOverallDifficulty(change) {
        const levelNames = Object.keys(this.DIFFICULTY_LEVELS);
        const currentIndex = levelNames.indexOf(this.difficultyProfiles.overall);
        const newIndex = Math.max(0, Math.min(levelNames.length - 1, currentIndex + change));
        
        this.difficultyProfiles.overall = levelNames[newIndex];
        
        // Show feedback
        const newLevel = this.DIFFICULTY_LEVELS[this.difficultyProfiles.overall];
        this.showFeedback(`Difficulty adjusted to ${newLevel.name} (${newLevel.nameEnglish})`);
    }

    /**
     * Show feedback to user
     */
    showFeedback(message) {
        const feedback = document.getElementById('difficulty-feedback');
        if (feedback) {
            feedback.innerHTML = `
                <div class="feedback-message">
                    <span class="feedback-icon">🎯</span>
                    <p>${message}</p>
                </div>
            `;
            
            setTimeout(() => {
                feedback.innerHTML = '';
            }, 3000);
        }
    }

    /**
     * Save all data to localStorage
     */
    saveData() {
        localStorage.setItem(`adaptive_difficulty_${this.studentId}`, 
            JSON.stringify(this.difficultyProfiles));
        localStorage.setItem(`performance_history_${this.studentId}`, 
            JSON.stringify(this.performanceHistory));
        localStorage.setItem(`learning_analytics_${this.studentId}`, 
            JSON.stringify(this.learningAnalytics));
    }

    /**
     * Get current difficulty summary
     */
    getDifficultySummary() {
        const currentLevel = this.DIFFICULTY_LEVELS[this.difficultyProfiles.overall];
        const learningStyle = this.difficultyProfiles.learningStyle;
        
        return {
            overall: {
                level: this.difficultyProfiles.overall,
                name: currentLevel.name,
                nameEnglish: currentLevel.nameEnglish,
                icon: currentLevel.icon,
                description: currentLevel.description
            },
            byGame: this.difficultyProfiles.byGame,
            learningStyle: learningStyle ? this.LEARNING_STYLES[learningStyle] : null,
            culturalProgression: this.difficultyProfiles.culturalProgression,
            recommendations: this.getGameRecommendations()
        };
    }

    /**
     * Reset difficulty profiles (admin function)
     */
    resetDifficulty() {
        if (confirm('Reset all difficulty settings? This will analyze your performance from scratch.')) {
            this.difficultyProfiles = {
                overall: 'DEVELOPING',
                byGame: {},
                byCategory: {},
                learningStyle: null,
                culturalProgression: 1,
                lastAssessment: null
            };
            
            this.saveData();
            this.showFeedback('Difficulty settings reset successfully!');
        }
    }
}

// Initialize adaptive difficulty system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adaptiveDifficulty = new AdaptiveDifficultySystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdaptiveDifficultySystem;
}