/**
 * QA Master Controller - Central Testing Coordination System
 * Orchestrates all QA testing agents and provides unified reporting
 * Manages test execution, monitoring, and comprehensive reporting
 */

class QAMasterController {
    constructor() {
        this.agents = {
            qaAgent: null,
            linkValidator: null,
            performanceMonitor: null,
            accessibilityAuditor: null
        };
        
        this.masterResults = {
            timestamp: new Date().toISOString(),
            overallScore: 0,
            categories: {
                functionality: { score: 0, status: 'pending' },
                performance: { score: 0, status: 'pending' },
                accessibility: { score: 0, status: 'pending' },
                links: { score: 0, status: 'pending' },
                educational: { score: 0, status: 'pending' }
            },
            recommendations: [],
            criticalIssues: [],
            testHistory: []
        };
        
        this.config = {
            autoRun: true,
            retestInterval: 300000, // 5 minutes
            alertThreshold: 70, // Alert if score drops below 70%
            reportingEnabled: true
        };
        
        this.init();
    }

    /**
     * Initialize QA Master Controller
     */
    init() {
        console.log('🎯 QA Master Controller initialized');
        
        // Create master dashboard
        this.createMasterDashboard();
        
        // Initialize all agents
        this.initializeAgents();
        
        // Set up monitoring
        this.setupMonitoring();
        
        // Start initial comprehensive test
        if (this.config.autoRun) {
            setTimeout(() => this.runFullTestSuite(), 2000);
        }
    }

    /**
     * Create master dashboard
     */
    createMasterDashboard() {
        const style = document.createElement('style');
        style.textContent = `
            .qa-master-dashboard {
                position: fixed;
                top: 10px;
                right: 370px;
                width: 400px;
                max-height: 85vh;
                background: white;
                border: 3px solid #1f2937;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
                z-index: 10001;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                overflow: hidden;
            }
            
            .qa-master-header {
                background: linear-gradient(135deg, #1f2937, #111827);
                color: white;
                padding: 16px 20px;
                font-weight: 700;
                font-size: 14px;
                display: flex;
                align-items: center;
                gap: 12px;
                border-bottom: 2px solid #374151;
            }
            
            .qa-master-status {
                margin-left: auto;
                font-size: 12px;
                padding: 4px 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
            }
            
            .qa-master-content {
                max-height: 60vh;
                overflow-y: auto;
                padding: 20px;
            }
            
            .qa-overall-score {
                text-align: center;
                margin-bottom: 24px;
                padding: 16px;
                background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                border-radius: 8px;
                border: 1px solid #cbd5e1;
            }
            
            .qa-score-circle {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 12px;
                font-size: 24px;
                font-weight: 700;
                color: white;
                background: conic-gradient(from 0deg, #dc2626, #f59e0b, #10b981);
            }
            
            .qa-score-label {
                font-size: 12px;
                color: #6b7280;
                font-weight: 500;
            }
            
            .qa-category-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin-bottom: 20px;
            }
            
            .qa-category-card {
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 12px;
                transition: all 0.2s ease;
            }
            
            .qa-category-card:hover {
                border-color: #3b82f6;
                box-shadow: 0 4px 8px rgba(59, 130, 246, 0.1);
            }
            
            .qa-category-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
            }
            
            .qa-category-icon {
                font-size: 16px;
            }
            
            .qa-category-name {
                font-size: 12px;
                font-weight: 600;
                color: #374151;
            }
            
            .qa-category-score {
                font-size: 18px;
                font-weight: 700;
                color: #1f2937;
                margin-bottom: 4px;
            }
            
            .qa-category-status {
                font-size: 10px;
                padding: 2px 6px;
                border-radius: 3px;
                font-weight: 500;
                color: white;
            }
            
            .qa-category-status.excellent { background: #059669; }
            .qa-category-status.good { background: #0ea5e9; }
            .qa-category-status.fair { background: #f59e0b; }
            .qa-category-status.poor { background: #dc2626; }
            .qa-category-status.pending { background: #6b7280; }
            
            .qa-critical-issues {
                background: #fef2f2;
                border: 1px solid #fecaca;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 16px;
            }
            
            .qa-critical-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
                font-weight: 600;
                color: #dc2626;
                font-size: 12px;
            }
            
            .qa-critical-item {
                background: white;
                border: 1px solid #f87171;
                border-radius: 4px;
                padding: 8px;
                margin-bottom: 8px;
                font-size: 11px;
            }
            
            .qa-critical-item:last-child {
                margin-bottom: 0;
            }
            
            .qa-recommendations {
                background: #f0f9ff;
                border: 1px solid #bae6fd;
                border-radius: 8px;
                padding: 12px;
                margin-bottom: 16px;
            }
            
            .qa-recommendations-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
                font-weight: 600;
                color: #0ea5e9;
                font-size: 12px;
            }
            
            .qa-recommendation-item {
                background: white;
                border: 1px solid #7dd3fc;
                border-radius: 4px;
                padding: 8px;
                margin-bottom: 8px;
                font-size: 11px;
            }
            
            .qa-recommendation-item:last-child {
                margin-bottom: 0;
            }
            
            .qa-master-actions {
                padding: 16px 20px;
                background: #f8fafc;
                border-top: 1px solid #e5e7eb;
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }
            
            .qa-master-button {
                background: #1f2937;
                color: white;
                border: none;
                padding: 8px 14px;
                border-radius: 6px;
                font-size: 11px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                flex: 1;
                min-width: 80px;
            }
            
            .qa-master-button:hover {
                background: #111827;
                transform: translateY(-1px);
            }
            
            .qa-master-button.primary {
                background: #3b82f6;
            }
            
            .qa-master-button.primary:hover {
                background: #2563eb;
            }
            
            .qa-master-button.success {
                background: #059669;
            }
            
            .qa-master-button.success:hover {
                background: #047857;
            }
            
            .qa-master-button.warning {
                background: #f59e0b;
            }
            
            .qa-master-button.warning:hover {
                background: #d97706;
            }
            
            .qa-progress-bar {
                width: 100%;
                height: 4px;
                background: #e5e7eb;
                border-radius: 2px;
                overflow: hidden;
                margin-top: 8px;
            }
            
            .qa-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #059669);
                transition: width 0.3s ease;
            }
            
            @media (max-width: 1200px) {
                .qa-master-dashboard {
                    right: 20px;
                    width: 350px;
                }
            }
            
            @media (max-width: 768px) {
                .qa-master-dashboard {
                    width: calc(100vw - 40px);
                    right: 20px;
                    left: 20px;
                    top: 10px;
                }
                
                .qa-category-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
        
        const dashboard = document.createElement('div');
        dashboard.id = 'qa-master-dashboard';
        dashboard.className = 'qa-master-dashboard';
        dashboard.innerHTML = `
            <div class="qa-master-header">
                <span>🎯</span>
                <span>QA Master Control</span>
                <div class="qa-master-status" id="qa-master-status">Initializing...</div>
            </div>
            <div class="qa-master-content" id="qa-master-content">
                <div class="qa-overall-score">
                    <div class="qa-score-circle" id="qa-overall-score">--</div>
                    <div class="qa-score-label">Overall Quality Score</div>
                    <div class="qa-progress-bar">
                        <div class="qa-progress-fill" id="qa-overall-progress"></div>
                    </div>
                </div>
                
                <div class="qa-category-grid" id="qa-category-grid">
                    <!-- Categories will be populated here -->
                </div>
                
                <div class="qa-critical-issues" id="qa-critical-issues" style="display: none;">
                    <div class="qa-critical-header">
                        <span>🚨</span>
                        <span>Critical Issues</span>
                    </div>
                    <div id="qa-critical-list"></div>
                </div>
                
                <div class="qa-recommendations" id="qa-recommendations" style="display: none;">
                    <div class="qa-recommendations-header">
                        <span>💡</span>
                        <span>Recommendations</span>
                    </div>
                    <div id="qa-recommendations-list"></div>
                </div>
            </div>
            <div class="qa-master-actions">
                <button class="qa-master-button primary" onclick="qaMaster.runFullTestSuite()">Test All</button>
                <button class="qa-master-button success" onclick="qaMaster.exportMasterReport()">Export</button>
                <button class="qa-master-button warning" onclick="qaMaster.toggleDashboard()">Hide</button>
            </div>
        `;
        document.body.appendChild(dashboard);
    }

    /**
     * Initialize all testing agents
     */
    initializeAgents() {
        // Wait for agents to be available
        setTimeout(() => {
            this.agents.qaAgent = window.qaAgent;
            this.agents.linkValidator = window.linkValidator;
            this.agents.performanceMonitor = window.performanceMonitor;
            this.agents.accessibilityAuditor = window.accessibilityAuditor;
            
            this.updateMasterStatus('Agents Ready');
            this.updateCategoryGrid();
        }, 1000);
    }

    /**
     * Set up continuous monitoring
     */
    setupMonitoring() {
        if (this.config.retestInterval > 0) {
            setInterval(() => {
                this.runFullTestSuite();
            }, this.config.retestInterval);
        }
    }

    /**
     * Run full test suite across all agents
     */
    async runFullTestSuite() {
        console.log('🚀 Running full QA test suite...');
        this.updateMasterStatus('Running Tests...');
        
        try {
            // Run all agents in parallel
            const testPromises = [];
            
            if (this.agents.qaAgent) {
                testPromises.push(this.agents.qaAgent.runComprehensiveTests());
            }
            
            if (this.agents.linkValidator) {
                testPromises.push(this.agents.linkValidator.validateAllLinks());
            }
            
            if (this.agents.performanceMonitor) {
                testPromises.push(this.agents.performanceMonitor.runAnalysis());
            }
            
            if (this.agents.accessibilityAuditor) {
                testPromises.push(this.agents.accessibilityAuditor.runComprehensiveAudit());
            }
            
            // Wait for all tests to complete
            await Promise.all(testPromises);
            
            // Collect results from all agents
            setTimeout(() => {
                this.collectResults();
                this.calculateOverallScore();
                this.identifyCriticalIssues();
                this.generateMasterRecommendations();
                this.updateMasterDashboard();
                this.logTestCompletion();
            }, 2000);
            
        } catch (error) {
            console.error('Full test suite error:', error);
            this.updateMasterStatus('Test Error');
        }
    }

    /**
     * Collect results from all agents
     */
    collectResults() {
        // Collect from QA Agent
        if (this.agents.qaAgent) {
            const qaResults = this.agents.qaAgent.testResults;
            const totalTests = qaResults.passed + qaResults.failed + qaResults.warnings;
            this.masterResults.categories.functionality.score = totalTests > 0 ? 
                Math.round((qaResults.passed / totalTests) * 100) : 0;
            this.masterResults.categories.functionality.status = 'completed';
        }
        
        // Collect from Link Validator
        if (this.agents.linkValidator) {
            const linkResults = this.agents.linkValidator.results;
            const totalLinks = Object.values(linkResults).reduce((sum, category) => sum + category.total, 0);
            const workingLinks = Object.values(linkResults).reduce((sum, category) => sum + category.working, 0);
            this.masterResults.categories.links.score = totalLinks > 0 ? 
                Math.round((workingLinks / totalLinks) * 100) : 100;
            this.masterResults.categories.links.status = 'completed';
        }
        
        // Collect from Performance Monitor
        if (this.agents.performanceMonitor) {
            const perfResults = this.agents.performanceMonitor.metrics;
            let perfScore = 100;
            
            // Calculate performance score based on thresholds
            if (perfResults.loadTime > 3000) perfScore -= 20;
            if (perfResults.firstContentfulPaint > 1800) perfScore -= 15;
            if (perfResults.largestContentfulPaint > 2500) perfScore -= 15;
            if (perfResults.cumulativeLayoutShift > 0.1) perfScore -= 10;
            
            this.masterResults.categories.performance.score = Math.max(0, perfScore);
            this.masterResults.categories.performance.status = 'completed';
        }
        
        // Collect from Accessibility Auditor
        if (this.agents.accessibilityAuditor) {
            const a11yResults = this.agents.accessibilityAuditor.results;
            const totalA11yTests = a11yResults.summary.total;
            const passedA11yTests = a11yResults.summary.passed;
            this.masterResults.categories.accessibility.score = totalA11yTests > 0 ? 
                Math.round((passedA11yTests / totalA11yTests) * 100) : 0;
            this.masterResults.categories.accessibility.status = 'completed';
        }
        
        // Educational score (based on content structure and functionality)
        this.masterResults.categories.educational.score = this.calculateEducationalScore();
        this.masterResults.categories.educational.status = 'completed';
    }

    /**
     * Calculate educational effectiveness score
     */
    calculateEducationalScore() {
        let score = 100;
        
        // Check for educational structure
        const handouts = document.querySelectorAll('a[href*="handout"]');
        const lessonPlans = document.querySelectorAll('a[href*="lesson"]');
        const interactiveElements = document.querySelectorAll('.interactive-game, .drag-drop-area');
        
        if (handouts.length < 10) score -= 20;
        if (lessonPlans.length < 5) score -= 15;
        if (interactiveElements.length < 3) score -= 25;
        
        // Check for differentiation elements
        const differentiation = document.querySelectorAll('.differentiation, [class*="support"], [class*="extension"]');
        if (differentiation.length === 0) score -= 10;
        
        // Check for cultural responsiveness
        const culturalElements = document.querySelectorAll('[lang="mi"], .te-reo, .cultural');
        if (culturalElements.length === 0) score -= 10;
        
        // Check for assessment elements
        const assessmentElements = document.querySelectorAll('.assessment, .rubric, .checklist');
        if (assessmentElements.length === 0) score -= 10;
        
        return Math.max(0, score);
    }

    /**
     * Calculate overall score
     */
    calculateOverallScore() {
        const categories = this.masterResults.categories;
        const scores = Object.values(categories).map(cat => cat.score);
        const validScores = scores.filter(score => score > 0);
        
        this.masterResults.overallScore = validScores.length > 0 ? 
            Math.round(validScores.reduce((sum, score) => sum + score, 0) / validScores.length) : 0;
    }

    /**
     * Identify critical issues
     */
    identifyCriticalIssues() {
        const issues = [];
        
        // Check for critical scores
        Object.entries(this.masterResults.categories).forEach(([category, data]) => {
            if (data.score < 50) {
                issues.push({
                    category: category,
                    severity: 'critical',
                    message: `${category.charAt(0).toUpperCase() + category.slice(1)} score is critically low (${data.score}%)`
                });
            }
        });
        
        // Check for broken functionality
        if (this.agents.qaAgent && this.agents.qaAgent.testResults.failed > 0) {
            issues.push({
                category: 'functionality',
                severity: 'high',
                message: `${this.agents.qaAgent.testResults.failed} functional tests failed`
            });
        }
        
        // Check for broken links
        if (this.agents.linkValidator) {
            const brokenLinks = Object.values(this.agents.linkValidator.results)
                .reduce((sum, category) => sum + category.broken, 0);
            if (brokenLinks > 0) {
                issues.push({
                    category: 'links',
                    severity: 'high',
                    message: `${brokenLinks} broken links detected`
                });
            }
        }
        
        // Check for accessibility violations
        if (this.agents.accessibilityAuditor && this.agents.accessibilityAuditor.results.summary.failed > 0) {
            issues.push({
                category: 'accessibility',
                severity: 'high',
                message: `${this.agents.accessibilityAuditor.results.summary.failed} accessibility violations found`
            });
        }
        
        this.masterResults.criticalIssues = issues;
    }

    /**
     * Generate master recommendations
     */
    generateMasterRecommendations() {
        const recommendations = [];
        
        // Performance recommendations
        if (this.masterResults.categories.performance.score < 80) {
            recommendations.push({
                priority: 'high',
                category: 'performance',
                action: 'Optimize images and reduce JavaScript bundle size'
            });
        }
        
        // Accessibility recommendations
        if (this.masterResults.categories.accessibility.score < 90) {
            recommendations.push({
                priority: 'high',
                category: 'accessibility',
                action: 'Review and fix accessibility violations for WCAG compliance'
            });
        }
        
        // Educational recommendations
        if (this.masterResults.categories.educational.score < 85) {
            recommendations.push({
                priority: 'medium',
                category: 'educational',
                action: 'Enhance educational content with more interactive elements and cultural responsiveness'
            });
        }
        
        // Link recommendations
        if (this.masterResults.categories.links.score < 95) {
            recommendations.push({
                priority: 'medium',
                category: 'links',
                action: 'Fix broken links and validate all resource connections'
            });
        }
        
        this.masterResults.recommendations = recommendations;
    }

    /**
     * Update master dashboard
     */
    updateMasterDashboard() {
        this.updateOverallScore();
        this.updateCategoryGrid();
        this.updateCriticalIssues();
        this.updateRecommendations();
        this.updateMasterStatus(`Complete (${this.masterResults.overallScore}%)`);
    }

    /**
     * Update overall score display
     */
    updateOverallScore() {
        const scoreElement = document.getElementById('qa-overall-score');
        const progressElement = document.getElementById('qa-overall-progress');
        
        if (scoreElement && progressElement) {
            scoreElement.textContent = `${this.masterResults.overallScore}%`;
            progressElement.style.width = `${this.masterResults.overallScore}%`;
            
            // Update color based on score
            const scoreClass = this.getScoreClass(this.masterResults.overallScore);
            scoreElement.className = `qa-score-circle ${scoreClass}`;
        }
    }

    /**
     * Update category grid
     */
    updateCategoryGrid() {
        const gridElement = document.getElementById('qa-category-grid');
        if (!gridElement) return;
        
        const categoryIcons = {
            functionality: '🎮',
            performance: '⚡',
            accessibility: '♿',
            links: '🔗',
            educational: '🎓'
        };
        
        const categoryNames = {
            functionality: 'Functionality',
            performance: 'Performance',
            accessibility: 'Accessibility',
            links: 'Links',
            educational: 'Educational'
        };
        
        gridElement.innerHTML = Object.entries(this.masterResults.categories).map(([key, category]) => `
            <div class="qa-category-card">
                <div class="qa-category-header">
                    <span class="qa-category-icon">${categoryIcons[key]}</span>
                    <span class="qa-category-name">${categoryNames[key]}</span>
                </div>
                <div class="qa-category-score">${category.score}%</div>
                <div class="qa-category-status ${this.getScoreClass(category.score)}">${this.getScoreLabel(category.score)}</div>
            </div>
        `).join('');
    }

    /**
     * Update critical issues display
     */
    updateCriticalIssues() {
        const issuesElement = document.getElementById('qa-critical-issues');
        const listElement = document.getElementById('qa-critical-list');
        
        if (!issuesElement || !listElement) return;
        
        if (this.masterResults.criticalIssues.length > 0) {
            issuesElement.style.display = 'block';
            listElement.innerHTML = this.masterResults.criticalIssues.map(issue => `
                <div class="qa-critical-item">
                    <strong>${issue.severity.toUpperCase()}:</strong> ${issue.message}
                </div>
            `).join('');
        } else {
            issuesElement.style.display = 'none';
        }
    }

    /**
     * Update recommendations display
     */
    updateRecommendations() {
        const recommendationsElement = document.getElementById('qa-recommendations');
        const listElement = document.getElementById('qa-recommendations-list');
        
        if (!recommendationsElement || !listElement) return;
        
        if (this.masterResults.recommendations.length > 0) {
            recommendationsElement.style.display = 'block';
            listElement.innerHTML = this.masterResults.recommendations.map(rec => `
                <div class="qa-recommendation-item">
                    <strong>${rec.priority.toUpperCase()}:</strong> ${rec.action}
                </div>
            `).join('');
        } else {
            recommendationsElement.style.display = 'none';
        }
    }

    /**
     * Get score class for styling
     */
    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 80) return 'good';
        if (score >= 70) return 'fair';
        return 'poor';
    }

    /**
     * Get score label
     */
    getScoreLabel(score) {
        if (score >= 90) return 'Excellent';
        if (score >= 80) return 'Good';
        if (score >= 70) return 'Fair';
        return 'Poor';
    }

    /**
     * Update master status
     */
    updateMasterStatus(message) {
        const statusElement = document.getElementById('qa-master-status');
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    /**
     * Export master report
     */
    exportMasterReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            masterResults: this.masterResults,
            agentResults: {
                qaAgent: this.agents.qaAgent?.testResults,
                linkValidator: this.agents.linkValidator?.results,
                performanceMonitor: this.agents.performanceMonitor?.metrics,
                accessibilityAuditor: this.agents.accessibilityAuditor?.results
            },
            config: this.config
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qa-master-report-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('📊 Master QA report exported');
    }

    /**
     * Toggle dashboard visibility
     */
    toggleDashboard() {
        const dashboard = document.getElementById('qa-master-dashboard');
        if (dashboard) {
            dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Log test completion
     */
    logTestCompletion() {
        const testRecord = {
            timestamp: new Date().toISOString(),
            overallScore: this.masterResults.overallScore,
            categories: this.masterResults.categories,
            criticalIssues: this.masterResults.criticalIssues.length,
            recommendations: this.masterResults.recommendations.length
        };
        
        this.masterResults.testHistory.push(testRecord);
        
        // Keep only last 10 test records
        if (this.masterResults.testHistory.length > 10) {
            this.masterResults.testHistory.shift();
        }
        
        console.log('🎯 QA Master Test Complete:', testRecord);
        
        // Alert if score is below threshold
        if (this.masterResults.overallScore < this.config.alertThreshold) {
            console.warn(`⚠️ Quality Alert: Overall score (${this.masterResults.overallScore}%) is below threshold (${this.config.alertThreshold}%)`);
        }
    }
}

// Initialize QA Master Controller
window.qaMaster = new QAMasterController();

// Global error handler for master controller
window.addEventListener('error', (event) => {
    if (window.qaMaster) {
        console.error('🚨 Global error caught by QA Master:', event.error);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QAMasterController;
}