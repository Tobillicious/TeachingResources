// Advanced Analytics and Teacher Dashboard Extensions
class AdvancedTeKeteAkoAnalytics {
    constructor() {
        this.sessionData = JSON.parse(localStorage.getItem('teKeteAkoSession') || '{}');
        this.historicalData = JSON.parse(localStorage.getItem('teKeteAkoHistory') || '[]');
        this.curriculumMapping = {};
        this.learningPathways = {};
        this.collaborativeData = {};
        
        this.initializeAdvancedFeatures();
    }
    
    initializeAdvancedFeatures() {
        // Enhanced learning analytics
        this.trackCurriculumEngagement();
        this.analyzeContentEffectiveness();
        this.monitorLearningProgression();
        this.generatePredictiveInsights();
        
        // Teacher dashboard enhancements
        this.createAdvancedReporting();
        this.setupRealTimeNotifications();
        this.implementAdaptiveLearning();
        
        console.log('Advanced Te Kete Ako Analytics initialized');
    }
    
    trackCurriculumEngagement() {
        // Track engagement with specific NZ Curriculum Achievement Objectives
        document.addEventListener('click', (e) => {
            const curriculumLink = e.target.closest('[href*="curriculum-alignment"]');
            const aoElement = e.target.closest('[data-ao]');
            
            if (curriculumLink || aoElement) {
                const aoCode = aoElement?.dataset.ao || 'general';
                this.logCurriculumInteraction(aoCode, {
                    type: 'curriculum_engagement',
                    subject: aoElement?.dataset.subject || 'cross-curricular',
                    level: aoElement?.dataset.level || 'undefined',
                    timestamp: Date.now(),
                    page: window.location.pathname
                });
            }
        });
    }
    
    logCurriculumInteraction(aoCode, data) {
        if (!this.curriculumMapping[aoCode]) {
            this.curriculumMapping[aoCode] = {
                interactions: 0,
                timeSpent: 0,
                resourcesAccessed: [],
                masteryLevel: 0
            };
        }
        
        this.curriculumMapping[aoCode].interactions++;
        this.curriculumMapping[aoCode].resourcesAccessed.push(data.page);
        
        // Save to localStorage
        localStorage.setItem('teKeteAkoCurriculum', JSON.stringify(this.curriculumMapping));
    }
    
    analyzeContentEffectiveness() {
        // Analyze which content types are most effective for learning
        const contentTypes = ['handouts', 'games', 'videos', 'lessons', 'activities'];
        
        contentTypes.forEach(type => {
            if (window.location.pathname.includes(type)) {
                this.trackContentEngagement(type);
            }
        });
    }
    
    trackContentEngagement(contentType) {
        const startTime = Date.now();
        const engagement = {
            contentType,
            startTime,
            interactions: 0,
            scrollDepth: 0,
            timeOnPage: 0
        };
        
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            maxScroll = Math.max(maxScroll, scrollPercent);
            engagement.scrollDepth = maxScroll;
        });
        
        // Track interactions
        document.addEventListener('click', () => {
            engagement.interactions++;
        });
        
        // Save on page unload
        window.addEventListener('beforeunload', () => {
            engagement.timeOnPage = Date.now() - startTime;
            this.saveContentEngagement(engagement);
        });
    }
    
    saveContentEngagement(engagement) {
        const existing = JSON.parse(localStorage.getItem('teKeteAkoContentEngagement') || '[]');
        existing.push(engagement);
        localStorage.setItem('teKeteAkoContentEngagement', JSON.stringify(existing));
    }
    
    monitorLearningProgression() {
        // Track learning pathway through the platform
        const currentPath = this.sessionData.learningPath || [];
        const newPathItem = {
            page: window.location.pathname,
            timestamp: Date.now(),
            referrer: document.referrer,
            sessionId: this.getSessionId()
        };
        
        currentPath.push(newPathItem);
        this.sessionData.learningPath = currentPath;
        localStorage.setItem('teKeteAkoSession', JSON.stringify(this.sessionData));
    }
    
    getSessionId() {
        if (!this.sessionData.sessionId) {
            this.sessionData.sessionId = Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        return this.sessionData.sessionId;
    }
    
    generatePredictiveInsights() {
        // AI-powered recommendations based on learning patterns
        const engagement = JSON.parse(localStorage.getItem('teKeteAkoContentEngagement') || '[]');
        const curriculum = JSON.parse(localStorage.getItem('teKeteAkoCurriculum') || '{}');
        
        return {
            recommendedContent: this.getContentRecommendations(engagement),
            curriculumGaps: this.identifyCurriculumGaps(curriculum),
            learningStyle: this.analyzeLearningStyle(engagement),
            nextSteps: this.suggestNextSteps(engagement, curriculum)
        };
    }
    
    getContentRecommendations(engagement) {
        // Analyze successful content types and recommend similar content
        const contentScores = engagement.reduce((scores, item) => {
            const effectivenessScore = (item.timeOnPage / 1000) + 
                                    (item.scrollDepth / 10) + 
                                    (item.interactions * 5);
            
            if (!scores[item.contentType]) {
                scores[item.contentType] = [];
            }
            scores[item.contentType].push(effectivenessScore);
            return scores;
        }, {});
        
        // Calculate average scores
        const averageScores = Object.entries(contentScores).map(([type, scores]) => ({
            contentType: type,
            averageScore: scores.reduce((a, b) => a + b, 0) / scores.length
        })).sort((a, b) => b.averageScore - a.averageScore);
        
        return averageScores.slice(0, 3).map(item => item.contentType);
    }
    
    identifyCurriculumGaps(curriculum) {
        // Identify Achievement Objectives that need more attention
        const expectedAOs = [
            'S4-1', 'S4-2', 'S4-3', 'M4-1', 'M4-2', 'M4-3', 
            'E4-1', 'E4-2', 'E4-3', 'SS4-1', 'SS4-2', 'SS4-3'
        ];
        
        const gaps = expectedAOs.filter(ao => !curriculum[ao] || curriculum[ao].interactions < 3);
        return gaps;
    }
    
    analyzeLearningStyle(engagement) {
        const contentPreferences = engagement.reduce((prefs, item) => {
            prefs[item.contentType] = (prefs[item.contentType] || 0) + 1;
            return prefs;
        }, {});
        
        const topPreference = Object.entries(contentPreferences)
            .sort(([,a], [,b]) => b - a)[0];
        
        const styles = {
            'handouts': 'Visual/Reading learner',
            'games': 'Kinesthetic/Interactive learner',
            'videos': 'Auditory/Visual learner',
            'lessons': 'Structured learner',
            'activities': 'Hands-on learner'
        };
        
        return topPreference ? styles[topPreference[0]] || 'Multimodal learner' : 'Exploring learner';
    }
    
    suggestNextSteps(engagement, curriculum) {
        const insights = this.generatePredictiveInsights();
        const suggestions = [];
        
        // Content-based suggestions
        if (insights.recommendedContent.includes('games')) {
            suggestions.push('Try the Te Reo Māori Wordle or Spelling Bee games for vocabulary building');
        }
        
        if (insights.recommendedContent.includes('handouts')) {
            suggestions.push('Explore the comprehensive handouts section for structured learning materials');
        }
        
        // Curriculum gap suggestions
        if (insights.curriculumGaps.length > 0) {
            suggestions.push(`Focus on Achievement Objectives: ${insights.curriculumGaps.slice(0, 3).join(', ')}`);
        }
        
        return suggestions;
    }
    
    createAdvancedReporting() {
        // Generate comprehensive teacher reports
        if (window.location.search.includes('teacher-dashboard')) {
            this.renderTeacherDashboard();
        }
    }
    
    renderTeacherDashboard() {
        const dashboardHtml = `
            <div id="advanced-teacher-dashboard" style="
                position: fixed; 
                top: 10%; 
                left: 10%; 
                width: 80%; 
                height: 80%; 
                background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
                border-radius: 20px;
                padding: 2rem;
                color: white;
                overflow-y: auto;
                z-index: 3000;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <h2>📊 Advanced Teacher Analytics Dashboard</h2>
                    <button onclick="this.closest('#advanced-teacher-dashboard').remove()" 
                            style="background: white; color: var(--color-primary); border: none; 
                                   padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">✕</button>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px;">
                        <h3>🎯 Curriculum Coverage Analysis</h3>
                        <div id="curriculum-coverage-chart"></div>
                        <p>Track student engagement with NZ Curriculum Achievement Objectives</p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px;">
                        <h3>📈 Learning Progression Trends</h3>
                        <div id="learning-trends-chart"></div>
                        <p>Visualize student learning pathways and progress over time</p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px;">
                        <h3>🧠 Content Effectiveness</h3>
                        <div id="content-effectiveness"></div>
                        <p>Analyze which resources are most engaging and effective</p>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px;">
                        <h3>🌟 Cultural Engagement</h3>
                        <div id="cultural-engagement"></div>
                        <p>Monitor Te Ao Māori content interaction and cultural learning</p>
                    </div>
                </div>
                
                <div style="margin-top: 2rem; text-align: center;">
                    <button onclick="window.advancedAnalytics.exportAdvancedReport()" 
                            style="background: var(--color-secondary); color: white; border: none; 
                                   padding: 1rem 2rem; border-radius: 25px; margin: 0.5rem; cursor: pointer;">
                        📊 Export Comprehensive Report
                    </button>
                    <button onclick="window.advancedAnalytics.generateClassInsights()" 
                            style="background: white; color: var(--color-primary); border: none; 
                                   padding: 1rem 2rem; border-radius: 25px; margin: 0.5rem; cursor: pointer;">
                        🔍 Generate Class Insights
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dashboardHtml);
        this.populateDashboardData();
    }
    
    populateDashboardData() {
        const curriculum = JSON.parse(localStorage.getItem('teKeteAkoCurriculum') || '{}');
        const engagement = JSON.parse(localStorage.getItem('teKeteAkoContentEngagement') || '[]');
        
        // Populate curriculum coverage
        const curriculumElement = document.getElementById('curriculum-coverage-chart');
        if (curriculumElement) {
            const aoCount = Object.keys(curriculum).length;
            curriculumElement.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 1rem;">${aoCount}/20</div>
                <div style="background: rgba(255,255,255,0.2); height: 8px; border-radius: 4px;">
                    <div style="background: var(--color-secondary); height: 100%; width: ${(aoCount/20)*100}%; 
                                border-radius: 4px; transition: width 0.3s ease;"></div>
                </div>
                <p style="margin-top: 0.5rem; font-size: 0.9rem;">Achievement Objectives engaged</p>
            `;
        }
        
        // Populate content effectiveness
        const contentElement = document.getElementById('content-effectiveness');
        if (contentElement && engagement.length > 0) {
            const avgEngagement = engagement.reduce((sum, item) => 
                sum + (item.timeOnPage / 1000) + (item.scrollDepth / 10), 0) / engagement.length;
            
            contentElement.innerHTML = `
                <div style="font-size: 1.5rem; margin-bottom: 1rem;">
                    Effectiveness Score: ${Math.round(avgEngagement)}/100
                </div>
                <p style="font-size: 0.9rem;">
                    Based on time spent, interaction depth, and learning progression
                </p>
            `;
        }
    }
    
    exportAdvancedReport() {
        const reportData = {
            generated: new Date().toISOString(),
            curriculum: JSON.parse(localStorage.getItem('teKeteAkoCurriculum') || '{}'),
            engagement: JSON.parse(localStorage.getItem('teKeteAkoContentEngagement') || '[]'),
            insights: this.generatePredictiveInsights(),
            recommendations: this.generateTeacherRecommendations()
        };
        
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `te-kete-ako-advanced-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    generateTeacherRecommendations() {
        const insights = this.generatePredictiveInsights();
        
        return {
            contentRecommendations: insights.recommendedContent,
            curriculumFocus: insights.curriculumGaps.slice(0, 5),
            learningStyleAdaptations: this.getStyleAdaptations(insights.learningStyle),
            nextActivities: insights.nextSteps,
            culturalIntegration: this.getCulturalRecommendations()
        };
    }
    
    getStyleAdaptations(learningStyle) {
        const adaptations = {
            'Visual/Reading learner': [
                'Use more handouts and visual materials',
                'Incorporate infographics and charts',
                'Provide written instructions and summaries'
            ],
            'Kinesthetic/Interactive learner': [
                'Increase use of interactive games',
                'Include hands-on activities',
                'Use manipulatives and physical engagement'
            ],
            'Auditory/Visual learner': [
                'Include more video content',
                'Use audio explanations',
                'Incorporate music and sound elements'
            ]
        };
        
        return adaptations[learningStyle] || [
            'Provide multi-modal learning experiences',
            'Offer choice in learning approaches',
            'Use varied assessment methods'
        ];
    }
    
    getCulturalRecommendations() {
        return [
            'Integrate more Te Reo Māori vocabulary in daily activities',
            'Use traditional Māori teaching methods like kōrero (storytelling)',
            'Include whakapapa (relationships) in learning connections',
            'Acknowledge Māori ways of knowing in science and mathematics'
        ];
    }
    
    generateClassInsights() {
        const insights = this.generatePredictiveInsights();
        const reportWindow = window.open('', '_blank');
        
        reportWindow.document.write(`
            <html>
                <head>
                    <title>Te Kete Ako Class Insights</title>
                    <style>
                        body { font-family: 'Lato', sans-serif; margin: 40px; line-height: 1.6; }
                        .header { text-align: center; border-bottom: 3px solid #2C5F41; padding-bottom: 20px; margin-bottom: 30px; }
                        .insight-card { background: #f0f8f0; border-left: 5px solid #40E0D0; padding: 20px; margin: 20px 0; border-radius: 8px; }
                        .recommendation { background: #fff3cd; border-left: 5px solid #B8860B; padding: 15px; margin: 15px 0; border-radius: 8px; }
                        .metric { display: inline-block; background: #e9ecef; padding: 10px 20px; margin: 10px; border-radius: 20px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>🌟 Te Kete Ako Class Insights</h1>
                        <p>Generated: ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <div class="insight-card">
                        <h2>🎯 Learning Style Analysis</h2>
                        <p><strong>Primary Learning Style:</strong> ${insights.learningStyle}</p>
                        <div class="recommendation">
                            <h3>Teaching Adaptations:</h3>
                            <ul>
                                ${this.getStyleAdaptations(insights.learningStyle).map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="insight-card">
                        <h2>📚 Curriculum Focus Areas</h2>
                        <p>Achievement Objectives needing attention:</p>
                        <div>
                            ${insights.curriculumGaps.map(gap => `<span class="metric">${gap}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="insight-card">
                        <h2>🚀 Recommended Next Steps</h2>
                        <ul>
                            ${insights.nextSteps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="insight-card">
                        <h2>🌿 Cultural Integration Opportunities</h2>
                        <ul>
                            ${this.getCulturalRecommendations().map(rec => `<li>${rec}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-top: 40px; padding: 20px; background: #2C5F41; color: white; border-radius: 12px;">
                        <h3>🤖 Generated by Te Kete Ako Advanced Analytics</h3>
                        <p>This report uses AI-powered analysis of learning engagement patterns to provide personalized teaching insights.</p>
                    </div>
                </body>
            </html>
        `);
    }
    
    setupRealTimeNotifications() {
        // Monitor for learning milestones and provide real-time feedback
        setInterval(() => {
            this.checkLearningMilestones();
        }, 60000); // Check every minute
    }
    
    checkLearningMilestones() {
        const session = this.sessionData.learningPath || [];
        const curriculum = JSON.parse(localStorage.getItem('teKeteAkoCurriculum') || '{}');
        
        // Check for achievements
        const totalAOs = Object.keys(curriculum).length;
        
        if (totalAOs >= 10 && !localStorage.getItem('milestone_10_aos')) {
            this.showAchievementNotification('🎯 Curriculum Explorer!', 'You\'ve engaged with 10+ Achievement Objectives!');
            localStorage.setItem('milestone_10_aos', 'true');
        }
        
        if (session.length >= 20 && !localStorage.getItem('milestone_20_pages')) {
            this.showAchievementNotification('🌟 Learning Pathfinder!', 'You\'ve explored 20+ pages of learning content!');
            localStorage.setItem('milestone_20_pages', 'true');
        }
    }
    
    showAchievementNotification(title, message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--color-accent), var(--color-secondary));
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            z-index: 4000;
            animation: slideInRight 0.5s ease, fadeOut 0.5s ease 4s;
            max-width: 300px;
        `;
        
        notification.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 0.5rem;">${title}</div>
            <div style="font-size: 0.9rem;">${message}</div>
        `;
        
        // Add CSS animation
        if (!document.getElementById('achievement-styles')) {
            const style = document.createElement('style');
            style.id = 'achievement-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    implementAdaptiveLearning() {
        // Adapt content recommendations based on learning patterns
        const insights = this.generatePredictiveInsights();
        
        if (insights.recommendedContent.length > 0) {
            this.addAdaptiveContentSuggestions(insights);
        }
    }
    
    addAdaptiveContentSuggestions(insights) {
        // Add floating suggestions based on learning style
        if (document.querySelector('.adaptive-suggestions')) return; // Already added
        
        const suggestionsPanel = document.createElement('div');
        suggestionsPanel.className = 'adaptive-suggestions';
        suggestionsPanel.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(44, 95, 65, 0.95);
            backdrop-filter: blur(10px);
            color: white;
            padding: 1rem;
            border-radius: 12px;
            max-width: 300px;
            z-index: 2000;
            font-size: 0.9rem;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        `;
        
        suggestionsPanel.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--color-secondary);">
                🧠 Personalized Learning Suggestions
            </div>
            <div style="margin-bottom: 1rem;">
                Based on your learning style: <em>${insights.learningStyle}</em>
            </div>
            <div style="font-size: 0.8rem;">
                ${insights.nextSteps.slice(0, 2).map(step => `• ${step}`).join('<br>')}
            </div>
            <button onclick="this.parentElement.remove()" style="
                background: none; 
                border: 1px solid var(--color-secondary); 
                color: var(--color-secondary);
                padding: 0.5rem 1rem; 
                border-radius: 6px; 
                margin-top: 1rem; 
                cursor: pointer;
                font-size: 0.8rem;
            ">Got it!</button>
        `;
        
        document.body.appendChild(suggestionsPanel);
        
        // Auto-hide after 15 seconds
        setTimeout(() => {
            if (suggestionsPanel.parentElement) {
                suggestionsPanel.remove();
            }
        }, 15000);
    }
}

// Initialize advanced analytics when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.advancedAnalytics = new AdvancedTeKeteAkoAnalytics();
    
    // Add teacher dashboard trigger to navigation
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('dblclick', () => {
            window.advancedAnalytics.renderTeacherDashboard();
        });
        
        navBrand.title = 'Double-click for Advanced Analytics Dashboard';
    }
});