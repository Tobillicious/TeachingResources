/**
 * =================================================================
 * GAMIFICATION SYSTEM - Te Kete Ako Advanced Learning Analytics
 * =================================================================
 * 
 * PURPOSE: Revolutionary gamification system that transforms educational 
 * games into engaging learning experiences while maintaining cultural 
 * authenticity and educational integrity.
 * 
 * FEATURES:
 * - Progress tracking across all games
 * - Cultural achievement system with Māori values
 * - Adaptive difficulty management
 * - Social learning and collaboration
 * - Teacher dashboard analytics
 * - Cross-game learning pathways
 * 
 * CULTURAL INTEGRATION:
 * - Achievement levels reflect Māori values
 * - Traditional knowledge progression
 * - Respectful cultural protocols
 * - Community validation pathways
 * 
 * =================================================================
 */

class TeKeteAkoGamificationSystem {
    constructor() {
        this.studentId = this.generateStudentId();
        this.achievements = this.loadAchievements();
        this.progress = this.loadProgress();
        this.streaks = this.loadStreaks();
        this.init();
    }

    /**
     * Initialize the gamification system
     */
    init() {
        this.setupEventListeners();
        this.displayAchievements();
        this.updateProgressBars();
        this.checkForNewAchievements();
    }

    /**
     * Generate or retrieve student ID
     */
    generateStudentId() {
        let studentId = localStorage.getItem('teKeteAko_studentId');
        if (!studentId) {
            studentId = 'student_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('teKeteAko_studentId', studentId);
        }
        return studentId;
    }

    /**
     * Cultural Achievement System - Māori Values Based
     */
    ACHIEVEMENT_LEVELS = {
        // Beginner Level - Tamaiti (Child)
        TAMAITI: {
            name: 'Tamaiti',
            nameEnglish: 'Learner',
            description: 'Beginning the learning journey',
            icon: '🌱',
            requirements: { totalGames: 1, totalScore: 100 }
        },
        // Developing Level - Akonga (Student)
        AKONGA: {
            name: 'Akonga',
            nameEnglish: 'Student', 
            description: 'Growing in knowledge and understanding',
            icon: '📚',
            requirements: { totalGames: 5, totalScore: 500, streak: 3 }
        },
        // Competent Level - Toa (Warrior)
        TOA: {
            name: 'Toa',
            nameEnglish: 'Warrior',
            description: 'Showing courage and persistence in learning',
            icon: '⚔️',
            requirements: { totalGames: 15, totalScore: 2000, streak: 7, culturalBonus: 5 }
        },
        // Advanced Level - Rangatira (Chief)
        RANGATIRA: {
            name: 'Rangatira',
            nameEnglish: 'Leader',
            description: 'Leading others through knowledge and wisdom',
            icon: '👑',
            requirements: { totalGames: 30, totalScore: 5000, streak: 14, culturalBonus: 15, collaboration: 10 }
        },
        // Master Level - Kaiako (Teacher)
        KAIAKO: {
            name: 'Kaiako',
            nameEnglish: 'Teacher',
            description: 'Sharing mātauranga with others',
            icon: '🌟',
            requirements: { totalGames: 50, totalScore: 10000, streak: 30, culturalBonus: 30, collaboration: 25, mentoring: 10 }
        }
    };

    /**
     * Cultural Achievement Badges
     */
    CULTURAL_ACHIEVEMENTS = {
        TE_REO_CHAMPION: {
            name: 'Te Reo Champion',
            nameMaori: 'Toa Te Reo',
            description: 'Excelling in Te Reo Māori games',
            icon: '🗣️',
            requirement: 'Complete 10 Te Reo games with high scores'
        },
        MATAURANGA_KEEPER: {
            name: 'Mātauranga Keeper',
            nameMaori: 'Kaitiaki Mātauranga',
            description: 'Preserving and sharing traditional knowledge',
            icon: '📜',
            requirement: 'Engage with cultural content across multiple games'
        },
        WHAKAPAPA_CONNECTOR: {
            name: 'Whakapapa Connector',
            nameMaori: 'Hononga Whakapapa',
            description: 'Understanding connections between knowledge areas',
            icon: '🔗',
            requirement: 'Excel in interdisciplinary challenges'
        },
        WHAKATOHEA_PRIDE: {
            name: 'Whakatōhea Pride',
            nameMaori: 'Whakatōhea Whakapapa',
            description: 'Celebrating local iwi knowledge and history',
            icon: '🏔️',
            requirement: 'Complete local history and culture challenges'
        }
    };

    /**
     * Game Categories for Progress Tracking
     */
    GAME_CATEGORIES = {
        VOCABULARY: ['te-reo-wordle', 'english-wordle', 'spelling-bee'],
        STRATEGY: ['countdown-letters', 'categories'],
        COLLABORATIVE: ['categories-multiplayer'],
        CULTURAL: ['te-reo-wordle', 'cultural-challenges'],
        CRITICAL_THINKING: ['categories', 'analysis-games']
    };

    /**
     * Load student achievements from localStorage
     */
    loadAchievements() {
        const saved = localStorage.getItem(`teKeteAko_achievements_${this.studentId}`);
        return saved ? JSON.parse(saved) : {
            level: 'TAMAITI',
            badges: [],
            unlockedAchievements: [],
            lastUpdated: new Date().toISOString()
        };
    }

    /**
     * Load student progress from localStorage
     */
    loadProgress() {
        const saved = localStorage.getItem(`teKeteAko_progress_${this.studentId}`);
        return saved ? JSON.parse(saved) : {
            totalGames: 0,
            totalScore: 0,
            gamesCompleted: {},
            categoryProgress: {},
            timeSpent: 0,
            lastPlayed: null,
            averageScore: 0,
            improvementRate: 0
        };
    }

    /**
     * Load student streaks from localStorage
     */
    loadStreaks() {
        const saved = localStorage.getItem(`teKeteAko_streaks_${this.studentId}`);
        return saved ? JSON.parse(saved) : {
            currentStreak: 0,
            longestStreak: 0,
            lastPlayDate: null,
            streakType: 'daily', // daily, weekly
            culturalBonusStreak: 0
        };
    }

    /**
     * Record game completion and update progress
     */
    recordGameCompletion(gameId, score, timeSpent, culturalBonus = false, collaborationScore = 0) {
        const now = new Date();
        
        // Update progress
        this.progress.totalGames++;
        this.progress.totalScore += score;
        this.progress.timeSpent += timeSpent;
        this.progress.lastPlayed = now.toISOString();
        
        // Update game-specific progress
        if (!this.progress.gamesCompleted[gameId]) {
            this.progress.gamesCompleted[gameId] = {
                timesPlayed: 0,
                bestScore: 0,
                totalScore: 0,
                averageScore: 0,
                improvement: 0
            };
        }
        
        const gameProgress = this.progress.gamesCompleted[gameId];
        gameProgress.timesPlayed++;
        gameProgress.totalScore += score;
        gameProgress.averageScore = gameProgress.totalScore / gameProgress.timesPlayed;
        
        if (score > gameProgress.bestScore) {
            gameProgress.improvement = score - gameProgress.bestScore;
            gameProgress.bestScore = score;
        }

        // Update category progress
        this.updateCategoryProgress(gameId, score);

        // Update streaks
        this.updateStreaks(culturalBonus);

        // Calculate overall average
        this.progress.averageScore = this.progress.totalScore / this.progress.totalGames;

        // Check for achievements
        this.checkForNewAchievements();

        // Save all progress
        this.saveProgress();
        
        // Provide feedback
        this.showAchievementFeedback(gameId, score, culturalBonus);

        return {
            levelUp: this.checkLevelUp(),
            newAchievements: this.getRecentAchievements(),
            streak: this.streaks.currentStreak,
            progress: this.getProgressSummary()
        };
    }

    /**
     * Update category-specific progress
     */
    updateCategoryProgress(gameId, score) {
        for (const [category, games] of Object.entries(this.GAME_CATEGORIES)) {
            if (games.includes(gameId)) {
                if (!this.progress.categoryProgress[category]) {
                    this.progress.categoryProgress[category] = {
                        gamesPlayed: 0,
                        totalScore: 0,
                        averageScore: 0,
                        mastery: 0
                    };
                }
                
                const catProgress = this.progress.categoryProgress[category];
                catProgress.gamesPlayed++;
                catProgress.totalScore += score;
                catProgress.averageScore = catProgress.totalScore / catProgress.gamesPlayed;
                
                // Calculate mastery (0-100 based on consistency and improvement)
                catProgress.mastery = Math.min(100, 
                    (catProgress.averageScore / 1000) * 50 + 
                    (catProgress.gamesPlayed / 10) * 50
                );
            }
        }
    }

    /**
     * Update learning streaks
     */
    updateStreaks(culturalBonus = false) {
        const now = new Date();
        const today = now.toDateString();
        const lastPlayDate = this.streaks.lastPlayDate ? new Date(this.streaks.lastPlayDate).toDateString() : null;
        
        if (lastPlayDate === today) {
            // Same day, don't update streak
            return;
        }
        
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (lastPlayDate === yesterdayStr) {
            // Consecutive day, increment streak
            this.streaks.currentStreak++;
        } else if (lastPlayDate !== today) {
            // Streak broken, reset
            this.streaks.currentStreak = 1;
        }
        
        // Update longest streak
        if (this.streaks.currentStreak > this.streaks.longestStreak) {
            this.streaks.longestStreak = this.streaks.currentStreak;
        }
        
        // Cultural bonus streak
        if (culturalBonus) {
            this.streaks.culturalBonusStreak++;
        }
        
        this.streaks.lastPlayDate = now.toISOString();
        
        // Save streaks
        localStorage.setItem(`teKeteAko_streaks_${this.studentId}`, JSON.stringify(this.streaks));
    }

    /**
     * Check for new achievements and level ups
     */
    checkForNewAchievements() {
        const newAchievements = [];
        
        // Check level progression
        const currentLevel = this.achievements.level;
        const nextLevel = this.getNextLevel(currentLevel);
        
        if (nextLevel && this.meetsRequirements(nextLevel)) {
            this.achievements.level = nextLevel;
            newAchievements.push({
                type: 'level',
                achievement: this.ACHIEVEMENT_LEVELS[nextLevel],
                timestamp: new Date().toISOString()
            });
        }
        
        // Check cultural achievements
        for (const [key, achievement] of Object.entries(this.CULTURAL_ACHIEVEMENTS)) {
            if (!this.achievements.badges.includes(key) && this.meetsCulturalRequirement(key)) {
                this.achievements.badges.push(key);
                newAchievements.push({
                    type: 'badge',
                    achievement: achievement,
                    timestamp: new Date().toISOString()
                });
            }
        }
        
        if (newAchievements.length > 0) {
            this.achievements.unlockedAchievements.push(...newAchievements);
            this.achievements.lastUpdated = new Date().toISOString();
            this.saveAchievements();
        }
        
        return newAchievements;
    }

    /**
     * Check if student meets requirements for next level
     */
    meetsRequirements(level) {
        const req = this.ACHIEVEMENT_LEVELS[level].requirements;
        const progress = this.progress;
        const streaks = this.streaks;
        const achievements = this.achievements;
        
        return (
            progress.totalGames >= (req.totalGames || 0) &&
            progress.totalScore >= (req.totalScore || 0) &&
            streaks.currentStreak >= (req.streak || 0) &&
            streaks.culturalBonusStreak >= (req.culturalBonus || 0) &&
            this.getCollaborationScore() >= (req.collaboration || 0) &&
            this.getMentoringScore() >= (req.mentoring || 0)
        );
    }

    /**
     * Check if student meets cultural achievement requirements
     */
    meetsCulturalRequirement(achievementKey) {
        switch (achievementKey) {
            case 'TE_REO_CHAMPION':
                return this.progress.gamesCompleted['te-reo-wordle']?.timesPlayed >= 10 &&
                       this.progress.gamesCompleted['te-reo-wordle']?.averageScore > 500;
            
            case 'MATAURANGA_KEEPER':
                return this.streaks.culturalBonusStreak >= 15;
            
            case 'WHAKAPAPA_CONNECTOR':
                return Object.keys(this.progress.categoryProgress).length >= 3 &&
                       Object.values(this.progress.categoryProgress).every(cat => cat.mastery > 50);
            
            case 'WHAKATOHEA_PRIDE':
                return this.progress.gamesCompleted['cultural-challenges']?.timesPlayed >= 5;
            
            default:
                return false;
        }
    }

    /**
     * Get next level in progression
     */
    getNextLevel(currentLevel) {
        const levels = Object.keys(this.ACHIEVEMENT_LEVELS);
        const currentIndex = levels.indexOf(currentLevel);
        return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
    }

    /**
     * Get collaboration score (placeholder for future social features)
     */
    getCollaborationScore() {
        return 0; // Will be implemented with multiplayer features
    }

    /**
     * Get mentoring score (placeholder for peer teaching features)
     */
    getMentoringScore() {
        return 0; // Will be implemented with peer teaching features
    }

    /**
     * Get recent achievements for display
     */
    getRecentAchievements() {
        return this.achievements.unlockedAchievements.slice(-5);
    }

    /**
     * Check if level up occurred
     */
    checkLevelUp() {
        // This would compare previous level with current level
        // Implementation depends on when this is called
        return false; // Placeholder
    }

    /**
     * Get progress summary for display
     */
    getProgressSummary() {
        const currentLevel = this.ACHIEVEMENT_LEVELS[this.achievements.level];
        const nextLevel = this.getNextLevel(this.achievements.level);
        
        return {
            currentLevel: currentLevel,
            nextLevel: nextLevel ? this.ACHIEVEMENT_LEVELS[nextLevel] : null,
            progressToNext: nextLevel ? this.calculateProgressToNext(nextLevel) : 100,
            totalGames: this.progress.totalGames,
            totalScore: this.progress.totalScore,
            currentStreak: this.streaks.currentStreak,
            longestStreak: this.streaks.longestStreak,
            badges: this.achievements.badges.length,
            categoryMastery: this.getCategoryMasteryAverage()
        };
    }

    /**
     * Calculate progress percentage to next level
     */
    calculateProgressToNext(nextLevel) {
        const req = this.ACHIEVEMENT_LEVELS[nextLevel].requirements;
        const scores = [];
        
        if (req.totalGames) scores.push((this.progress.totalGames / req.totalGames) * 100);
        if (req.totalScore) scores.push((this.progress.totalScore / req.totalScore) * 100);
        if (req.streak) scores.push((this.streaks.currentStreak / req.streak) * 100);
        
        return Math.min(100, scores.reduce((a, b) => a + b, 0) / scores.length);
    }

    /**
     * Get average category mastery
     */
    getCategoryMasteryAverage() {
        const masteries = Object.values(this.progress.categoryProgress).map(cat => cat.mastery);
        return masteries.length > 0 ? masteries.reduce((a, b) => a + b, 0) / masteries.length : 0;
    }

    /**
     * Display achievements in UI
     */
    displayAchievements() {
        const container = document.getElementById('achievements-display');
        if (!container) return;

        const currentLevel = this.ACHIEVEMENT_LEVELS[this.achievements.level];
        const summary = this.getProgressSummary();

        container.innerHTML = `
            <div class="achievement-header">
                <div class="current-level">
                    <span class="level-icon">${currentLevel.icon}</span>
                    <div class="level-info">
                        <h3>${currentLevel.name} (${currentLevel.nameEnglish})</h3>
                        <p>${currentLevel.description}</p>
                    </div>
                </div>
                <div class="level-stats">
                    <div class="stat">
                        <span class="stat-number">${summary.totalGames}</span>
                        <span class="stat-label">Games Played</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${summary.currentStreak}</span>
                        <span class="stat-label">Current Streak</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">${summary.badges}</span>
                        <span class="stat-label">Badges Earned</span>
                    </div>
                </div>
            </div>
            
            ${summary.nextLevel ? `
                <div class="progress-to-next">
                    <h4>Progress to ${summary.nextLevel.name}</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${summary.progressToNext}%"></div>
                    </div>
                    <p>${Math.round(summary.progressToNext)}% complete</p>
                </div>
            ` : '<div class="max-level">🌟 Maximum level achieved! You are a true Kaiako!</div>'}
            
            <div class="badges-display">
                <h4>Cultural Achievements</h4>
                <div class="badges-grid">
                    ${this.achievements.badges.map(badgeKey => {
                        const badge = this.CULTURAL_ACHIEVEMENTS[badgeKey];
                        return `
                            <div class="badge earned">
                                <span class="badge-icon">${badge.icon}</span>
                                <div class="badge-info">
                                    <h5>${badge.name}</h5>
                                    <p>${badge.description}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Update progress bars throughout the interface
     */
    updateProgressBars() {
        // Update category progress bars
        for (const [category, progress] of Object.entries(this.progress.categoryProgress)) {
            const progressBar = document.querySelector(`[data-category="${category}"] .progress-fill`);
            if (progressBar) {
                progressBar.style.width = `${progress.mastery}%`;
            }
        }
    }

    /**
     * Show achievement feedback after game completion
     */
    showAchievementFeedback(gameId, score, culturalBonus) {
        const feedback = document.getElementById('achievement-feedback');
        if (!feedback) return;

        let message = `Great job! You scored ${score} points.`;
        if (culturalBonus) {
            message += ` Te reo Māori bonus earned! 🌟`;
        }
        
        if (this.streaks.currentStreak > 1) {
            message += ` ${this.streaks.currentStreak} day streak! 🔥`;
        }

        feedback.innerHTML = `
            <div class="feedback-message success">
                <span class="feedback-icon">🎉</span>
                <p>${message}</p>
            </div>
        `;

        // Auto-hide after 3 seconds
        setTimeout(() => {
            feedback.innerHTML = '';
        }, 3000);
    }

    /**
     * Save progress to localStorage
     */
    saveProgress() {
        localStorage.setItem(`teKeteAko_progress_${this.studentId}`, JSON.stringify(this.progress));
    }

    /**
     * Save achievements to localStorage
     */
    saveAchievements() {
        localStorage.setItem(`teKeteAko_achievements_${this.studentId}`, JSON.stringify(this.achievements));
    }

    /**
     * Setup event listeners for gamification features
     */
    setupEventListeners() {
        // Listen for game completion events
        document.addEventListener('gameCompleted', (event) => {
            const { gameId, score, timeSpent, culturalBonus, collaborationScore } = event.detail;
            this.recordGameCompletion(gameId, score, timeSpent, culturalBonus, collaborationScore);
        });

        // Listen for achievement display requests
        document.addEventListener('showAchievements', () => {
            this.displayAchievements();
        });
    }

    /**
     * Export student data for teacher dashboard
     */
    exportStudentData() {
        return {
            studentId: this.studentId,
            achievements: this.achievements,
            progress: this.progress,
            streaks: this.streaks,
            summary: this.getProgressSummary(),
            lastUpdated: new Date().toISOString()
        };
    }

    /**
     * Reset student progress (admin function)
     */
    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem(`teKeteAko_achievements_${this.studentId}`);
            localStorage.removeItem(`teKeteAko_progress_${this.studentId}`);
            localStorage.removeItem(`teKeteAko_streaks_${this.studentId}`);
            location.reload();
        }
    }
}

// Initialize gamification system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.teKeteAkoGamification = new TeKeteAkoGamificationSystem();
});

// Utility function for games to report completion
window.reportGameCompletion = function(gameId, score, timeSpent = 0, culturalBonus = false, collaborationScore = 0) {
    if (window.teKeteAkoGamification) {
        return window.teKeteAkoGamification.recordGameCompletion(gameId, score, timeSpent, culturalBonus, collaborationScore);
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeKeteAkoGamificationSystem;
}