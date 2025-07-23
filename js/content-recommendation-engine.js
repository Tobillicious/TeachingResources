/**
 * Dynamic Content Recommendation Engine
 * Te Kete Ako Educational Platform
 * Intelligently suggests related resources based on content analysis and user behavior
 */

class ContentRecommendationEngine {
    constructor() {
        this.contentDatabase = new Map();
        this.userBehavior = this.loadUserBehavior();
        this.contentGraph = new Map();
        this.init();
    }

    async init() {
        await this.buildContentDatabase();
        await this.analyzeContentRelationships();
        this.setupBehaviorTracking();
        console.log('[Recommendations] Content recommendation engine initialized');
    }

    async buildContentDatabase() {
        // Define content categories and relationships
        const content = {
            handouts: {
                'haka-comprehension-handout.html': {
                    title: 'The Power of Haka',
                    keywords: ['haka', 'cultural expression', 'māori identity', 'performance', 'te ao māori'],
                    subject: 'Cultural Studies',
                    level: 'Years 7-10',
                    nzcObjectives: ['Social Sciences L5'],
                    culturalElements: ['haka', 'kapa haka', 'tikanga', 'whakapapa'],
                    type: 'comprehension'
                },
                'treaty-of-waitangi-handout.html': {
                    title: 'Treaty of Waitangi',
                    keywords: ['treaty', 'waitangi', 'māori rights', 'colonization', 'partnership'],
                    subject: 'Social Studies',
                    level: 'Years 7-13',
                    nzcObjectives: ['Social Sciences L4', 'Social Sciences L5'],
                    culturalElements: ['tiriti', 'tino rangatiratanga', 'kāwanatanga'],
                    type: 'comprehension'
                },
                'writers-toolkit-peel-argument-handout.html': {
                    title: 'PEEL Method Toolkit',
                    keywords: ['writing', 'argument', 'structure', 'essay', 'peel method'],
                    subject: 'English',
                    level: 'Years 7-13',
                    nzcObjectives: ['English L4', 'English L5'],
                    culturalElements: [],
                    type: 'writing-toolkit'
                },
                'maori-astronomy-navigation-handout.html': {
                    title: 'Māori Astronomy & Navigation',
                    keywords: ['astronomy', 'navigation', 'stars', 'māori science', 'traditional knowledge'],
                    subject: 'Science/Cultural Studies',
                    level: 'Years 7-10',
                    nzcObjectives: ['Science L4', 'Social Sciences L5'],
                    culturalElements: ['mātauranga māori', 'navigation', 'astronomy'],
                    type: 'comprehension'
                },
                'economic-justice-deep-dive-comprehension.html': {
                    title: 'Economic Justice Deep Dive',
                    keywords: ['economics', 'justice', 'inequality', 'social issues', 'policy'],
                    subject: 'Social Studies',
                    level: 'Years 9-13',
                    nzcObjectives: ['Social Sciences L5', 'Social Sciences L6'],
                    culturalElements: ['social justice', 'equity'],
                    type: 'comprehension'
                }
            },
            units: {
                'unit-1-te-ao-maori.html': {
                    title: 'Te Ao Māori Worldview',
                    keywords: ['te ao māori', 'worldview', 'values', 'culture', 'identity'],
                    subject: 'Cultural Studies',
                    level: 'Years 7-10',
                    nzcObjectives: ['Social Sciences L4', 'Social Sciences L5'],
                    culturalElements: ['te ao māori', 'tikanga', 'values'],
                    type: 'unit-plan'
                },
                'unit-2-decolonized-history.html': {
                    title: 'Decolonized History',
                    keywords: ['history', 'decolonization', 'perspective', 'colonization', 'indigenous'],
                    subject: 'Social Studies',
                    level: 'Years 7-13',
                    nzcObjectives: ['Social Sciences L4', 'Social Sciences L5'],
                    culturalElements: ['decolonization', 'indigenous perspectives'],
                    type: 'unit-plan'
                }
            },
            games: {
                'te-reo-wordle.html': {
                    title: 'Te Reo Māori Wordle',
                    keywords: ['te reo māori', 'language', 'vocabulary', 'game', 'learning'],
                    subject: 'Te Reo Māori',
                    level: 'All Levels',
                    nzcObjectives: ['Te Reo Māori'],
                    culturalElements: ['te reo māori', 'language learning'],
                    type: 'game'
                }
            }
        };

        // Build searchable database
        Object.entries(content).forEach(([category, items]) => {
            Object.entries(items).forEach(([path, data]) => {
                this.contentDatabase.set(path, {
                    ...data,
                    category,
                    path,
                    fullPath: category === 'handouts' ? `handouts/${path}` : 
                             category === 'units' ? `units/${path}` : 
                             `games/${path}`
                });
            });
        });
    }

    analyzeContentRelationships() {
        // Build content relationship graph
        this.contentDatabase.forEach((content, path) => {
            const relationships = new Set();

            // Find related content based on various factors
            this.contentDatabase.forEach((otherContent, otherPath) => {
                if (path === otherPath) return;

                const relationshipScore = this.calculateRelationshipScore(content, otherContent);
                if (relationshipScore > 0.3) { // Threshold for relevance
                    relationships.add({
                        path: otherPath,
                        score: relationshipScore,
                        reasons: this.getRelationshipReasons(content, otherContent)
                    });
                }
            });

            this.contentGraph.set(path, Array.from(relationships)
                .sort((a, b) => b.score - a.score));
        });
    }

    calculateRelationshipScore(content1, content2) {
        let score = 0;

        // Subject similarity (high weight)
        if (content1.subject === content2.subject) score += 0.4;

        // Level overlap
        if (this.levelsOverlap(content1.level, content2.level)) score += 0.2;

        // NZ Curriculum objectives overlap
        const objectiveOverlap = this.arrayOverlap(content1.nzcObjectives, content2.nzcObjectives);
        score += objectiveOverlap * 0.3;

        // Cultural elements overlap
        const culturalOverlap = this.arrayOverlap(content1.culturalElements, content2.culturalElements);
        score += culturalOverlap * 0.25;

        // Keyword similarity
        const keywordSimilarity = this.arrayOverlap(content1.keywords, content2.keywords);
        score += keywordSimilarity * 0.2;

        return Math.min(score, 1.0);
    }

    getRelationshipReasons(content1, content2) {
        const reasons = [];
        
        if (content1.subject === content2.subject) {
            reasons.push(`Same subject area: ${content1.subject}`);
        }
        
        if (this.levelsOverlap(content1.level, content2.level)) {
            reasons.push('Suitable for similar year levels');
        }

        const sharedObjectives = content1.nzcObjectives.filter(obj => 
            content2.nzcObjectives.includes(obj));
        if (sharedObjectives.length > 0) {
            reasons.push(`Shared curriculum objectives: ${sharedObjectives.join(', ')}`);
        }

        const sharedCultural = content1.culturalElements.filter(elem => 
            content2.culturalElements.includes(elem));
        if (sharedCultural.length > 0) {
            reasons.push(`Similar cultural elements: ${sharedCultural.join(', ')}`);
        }

        return reasons;
    }

    arrayOverlap(arr1, arr2) {
        if (arr1.length === 0 || arr2.length === 0) return 0;
        const overlap = arr1.filter(item => arr2.includes(item)).length;
        return overlap / Math.max(arr1.length, arr2.length);
    }

    levelsOverlap(level1, level2) {
        // Extract year numbers from level strings
        const getYears = (levelStr) => {
            const matches = levelStr.match(/\d+/g);
            return matches ? matches.map(Number) : [];
        };

        const years1 = getYears(level1);
        const years2 = getYears(level2);
        
        return years1.some(year => years2.includes(year));
    }

    getRecommendations(currentPath, options = {}) {
        const {
            maxResults = 6,
            includeUserBehavior = true,
            filterBySubject = null,
            filterByLevel = null,
            excludeCurrentType = false
        } = options;

        // Get content relationships
        let recommendations = this.contentGraph.get(currentPath) || [];

        // Apply filters
        if (filterBySubject) {
            recommendations = recommendations.filter(rec => 
                this.contentDatabase.get(rec.path).subject === filterBySubject);
        }

        if (filterByLevel) {
            recommendations = recommendations.filter(rec =>
                this.levelsOverlap(this.contentDatabase.get(rec.path).level, filterByLevel));
        }

        if (excludeCurrentType) {
            const currentType = this.contentDatabase.get(currentPath)?.type;
            recommendations = recommendations.filter(rec =>
                this.contentDatabase.get(rec.path).type !== currentType);
        }

        // Enhance with user behavior if available
        if (includeUserBehavior && this.userBehavior.size > 0) {
            recommendations = this.enhanceWithUserBehavior(recommendations);
        }

        // Limit results and add metadata
        return recommendations.slice(0, maxResults).map(rec => ({
            ...rec,
            content: this.contentDatabase.get(rec.path),
            userInteracted: this.userBehavior.has(rec.path)
        }));
    }

    enhanceWithUserBehavior(recommendations) {
        return recommendations.map(rec => {
            const userInteraction = this.userBehavior.get(rec.path);
            if (userInteraction) {
                // Boost score for previously viewed content, but not too much
                rec.score += 0.1;
                // Add recency factor
                const daysSinceView = (Date.now() - userInteraction.lastViewed) / (1000 * 60 * 60 * 24);
                if (daysSinceView < 7) {
                    rec.score += 0.05;
                }
            }
            return rec;
        }).sort((a, b) => b.score - a.score);
    }

    trackUserInteraction(path, interactionType = 'view') {
        const existing = this.userBehavior.get(path) || {
            viewCount: 0,
            lastViewed: null,
            interactions: []
        };

        existing.viewCount++;
        existing.lastViewed = Date.now();
        existing.interactions.push({
            type: interactionType,
            timestamp: Date.now()
        });

        // Keep only last 10 interactions
        existing.interactions = existing.interactions.slice(-10);

        this.userBehavior.set(path, existing);
        this.saveUserBehavior();
    }

    setupBehaviorTracking() {
        // Track page views
        const currentPath = this.getCurrentPath();
        if (currentPath && this.contentDatabase.has(currentPath)) {
            this.trackUserInteraction(currentPath, 'view');
        }

        // Track clicks on recommended links
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[data-recommended]');
            if (link) {
                const targetPath = this.extractPathFromUrl(link.href);
                if (targetPath) {
                    this.trackUserInteraction(targetPath, 'click-from-recommendation');
                }
            }
        });
    }

    getCurrentPath() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        // Map current page to database key
        if (path.includes('/handouts/')) {
            return filename;
        } else if (path.includes('/units/')) {
            return filename;
        } else if (path.includes('/games/')) {
            return filename;
        }
        
        return null;
    }

    extractPathFromUrl(url) {
        try {
            const urlObj = new URL(url, window.location.origin);
            return urlObj.pathname.split('/').pop();
        } catch (e) {
            return null;
        }
    }

    loadUserBehavior() {
        try {
            const saved = localStorage.getItem('te-kete-ako-user-behavior');
            if (saved) {
                const data = JSON.parse(saved);
                return new Map(Object.entries(data));
            }
        } catch (e) {
            console.warn('[Recommendations] Could not load user behavior:', e);
        }
        return new Map();
    }

    saveUserBehavior() {
        try {
            const data = Object.fromEntries(this.userBehavior);
            localStorage.setItem('te-kete-ako-user-behavior', JSON.stringify(data));
        } catch (e) {
            console.warn('[Recommendations] Could not save user behavior:', e);
        }
    }

    renderRecommendations(containerSelector, options = {}) {
        const currentPath = this.getCurrentPath();
        if (!currentPath) return;

        const container = document.querySelector(containerSelector);
        if (!container) return;

        const recommendations = this.getRecommendations(currentPath, options);
        
        if (recommendations.length === 0) {
            container.innerHTML = '<p class="text-muted">No related resources found.</p>';
            return;
        }

        const html = recommendations.map(rec => this.createRecommendationHTML(rec)).join('');
        container.innerHTML = html;

        // Add analytics tracking
        this.trackRecommendationDisplay(recommendations);
    }

    createRecommendationHTML(recommendation) {
        const { content, score, reasons, userInteracted } = recommendation;
        const interactionBadge = userInteracted ? '<span class="interaction-badge">Previously viewed</span>' : '';
        
        return `
            <div class="recommendation-card" data-score="${score.toFixed(2)}">
                <a href="${content.fullPath}" class="recommendation-link" data-recommended="true">
                    <div class="recommendation-header">
                        <h4 class="recommendation-title">${content.title}</h4>
                        ${interactionBadge}
                    </div>
                    <div class="recommendation-meta">
                        <span class="recommendation-subject">${content.subject}</span>
                        <span class="recommendation-level">${content.level}</span>
                        <span class="recommendation-type">${this.formatType(content.type)}</span>
                    </div>
                    <div class="recommendation-reasons">
                        ${reasons.slice(0, 2).map(reason => 
                            `<span class="reason-tag">${reason}</span>`
                        ).join('')}
                    </div>
                </a>
            </div>
        `;
    }

    formatType(type) {
        return type.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    trackRecommendationDisplay(recommendations) {
        // Track which recommendations were shown
        if (window.analytics && window.analytics.track) {
            window.analytics.track('recommendations_displayed', {
                count: recommendations.length,
                top_recommendation: recommendations[0]?.content?.title,
                current_page: this.getCurrentPath()
            });
        }
    }

    // Public API methods
    getSmartSuggestions(subject = null, level = null) {
        const currentPath = this.getCurrentPath();
        if (!currentPath) return [];

        return this.getRecommendations(currentPath, {
            maxResults: 4,
            filterBySubject: subject,
            filterByLevel: level,
            excludeCurrentType: true
        });
    }

    getSimilarResources(maxResults = 6) {
        const currentPath = this.getCurrentPath();
        if (!currentPath) return [];

        return this.getRecommendations(currentPath, {
            maxResults,
            includeUserBehavior: false
        });
    }

    getPersonalizedSuggestions() {
        const currentPath = this.getCurrentPath();
        if (!currentPath) return [];

        return this.getRecommendations(currentPath, {
            maxResults: 8,
            includeUserBehavior: true
        });
    }
}

// Initialize recommendation engine
window.addEventListener('DOMContentLoaded', () => {
    window.recommendationEngine = new ContentRecommendationEngine();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentRecommendationEngine;
}