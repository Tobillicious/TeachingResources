/**
 * QA/Testing Agent - Automated Testing Suite
 * Comprehensive testing framework for educational resource website
 * Focuses on interactive components, accessibility, and performance
 */

class QATestingAgent {
    constructor() {
        this.testResults = {
            passed: 0,
            failed: 0,
            warnings: 0,
            errors: [],
            warnings: [],
            performance: {},
            accessibility: {},
            links: {},
            interactiveComponents: {}
        };
        
        this.startTime = Date.now();
        this.config = {
            performanceThresholds: {
                loadTime: 3000,
                fcp: 1500,
                interaction: 100
            },
            accessibilityLevel: 'AA',
            testTimeout: 30000
        };
        
        this.init();
    }

    /**
     * Initialize the testing agent
     */
    init() {
        console.log('🤖 QA Testing Agent Initialized');
        console.log('📊 Starting comprehensive website validation...');
        
        // Add CSS for test results display
        this.addTestResultsCSS();
        
        // Create test results container
        this.createTestResultsContainer();
        
        // Start automated tests
        this.runComprehensiveTests();
    }

    /**
     * Add CSS for test results display
     */
    addTestResultsCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .qa-test-results {
                position: fixed;
                top: 10px;
                left: 10px;
                width: 320px;
                max-height: 80vh;
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 12px;
                overflow: hidden;
            }
            
            .qa-test-header {
                background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                color: white;
                padding: 12px 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .qa-test-content {
                max-height: 60vh;
                overflow-y: auto;
                padding: 16px;
            }
            
            .qa-test-section {
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .qa-test-section:last-child {
                border-bottom: none;
            }
            
            .qa-test-section h4 {
                margin: 0 0 8px 0;
                color: #374151;
                font-size: 13px;
            }
            
            .qa-test-item {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 4px 0;
                font-size: 11px;
            }
            
            .qa-test-status {
                font-weight: bold;
                min-width: 16px;
            }
            
            .qa-test-status.pass { color: #059669; }
            .qa-test-status.fail { color: #dc2626; }
            .qa-test-status.warn { color: #d97706; }
            .qa-test-status.info { color: #2563eb; }
            
            .qa-test-summary {
                background: #f8fafc;
                padding: 12px;
                border-radius: 6px;
                margin-top: 16px;
            }
            
            .qa-test-metric {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
            }
            
            .qa-test-metric:last-child {
                margin-bottom: 0;
            }
            
            .qa-test-actions {
                padding: 12px 16px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 8px;
            }
            
            .qa-test-button {
                background: #3b82f6;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 11px;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .qa-test-button:hover {
                background: #2563eb;
            }
            
            .qa-test-button.secondary {
                background: #6b7280;
            }
            
            .qa-test-button.secondary:hover {
                background: #4b5563;
            }
            
            @media (max-width: 768px) {
                .qa-test-results {
                    width: calc(100vw - 20px);
                    left: 10px;
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Create test results container
     */
    createTestResultsContainer() {
        const container = document.createElement('div');
        container.id = 'qa-test-results';
        container.className = 'qa-test-results';
        container.innerHTML = `
            <div class="qa-test-header">
                <span>🤖</span>
                <span>QA Testing Agent</span>
                <span style="margin-left: auto; font-size: 11px;">Running...</span>
            </div>
            <div class="qa-test-content" id="qa-test-content">
                <div class="qa-test-section">
                    <h4>Initializing Tests...</h4>
                    <div class="qa-test-item">
                        <span class="qa-test-status info">●</span>
                        <span>Setting up test environment</span>
                    </div>
                </div>
            </div>
            <div class="qa-test-actions">
                <button class="qa-test-button" onclick="qaAgent.runComprehensiveTests()">Rerun</button>
                <button class="qa-test-button secondary" onclick="qaAgent.toggleResults()">Hide</button>
            </div>
        `;
        document.body.appendChild(container);
    }

    /**
     * Update test results display
     */
    updateTestResults(section, items) {
        const content = document.getElementById('qa-test-content');
        if (!content) return;

        let sectionElement = content.querySelector(`[data-section="${section}"]`);
        if (!sectionElement) {
            sectionElement = document.createElement('div');
            sectionElement.className = 'qa-test-section';
            sectionElement.dataset.section = section;
            content.appendChild(sectionElement);
        }

        const sectionTitle = section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1');
        sectionElement.innerHTML = `<h4>${sectionTitle}</h4>`;

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'qa-test-item';
            itemElement.innerHTML = `
                <span class="qa-test-status ${item.status}">${this.getStatusIcon(item.status)}</span>
                <span>${item.message}</span>
            `;
            sectionElement.appendChild(itemElement);
        });
    }

    /**
     * Get status icon for test results
     */
    getStatusIcon(status) {
        switch (status) {
            case 'pass': return '✓';
            case 'fail': return '✗';
            case 'warn': return '⚠';
            case 'info': return '●';
            default: return '?';
        }
    }

    /**
     * Run comprehensive test suite
     */
    async runComprehensiveTests() {
        console.log('🚀 Starting comprehensive test suite...');
        
        // Reset results
        this.testResults = {
            passed: 0,
            failed: 0,
            warnings: 0,
            errors: [],
            warnings: [],
            performance: {},
            accessibility: {},
            links: {},
            interactiveComponents: {}
        };

        try {
            // Test interactive components
            await this.testInteractiveComponents();
            
            // Test accessibility
            await this.testAccessibility();
            
            // Test performance
            await this.testPerformance();
            
            // Test links
            await this.testLinks();
            
            // Test responsive design
            await this.testResponsiveDesign();
            
            // Test print functionality
            await this.testPrintFunctionality();
            
            // Generate final report
            this.generateFinalReport();
            
        } catch (error) {
            console.error('QA Testing Error:', error);
            this.logError('Test Suite Error', error.message);
        }
    }

    /**
     * Test interactive components
     */
    async testInteractiveComponents() {
        console.log('🎮 Testing Interactive Components...');
        
        const tests = [];
        
        // Test if InteractiveComponents library is loaded
        if (typeof window.InteractiveComponents !== 'undefined') {
            tests.push({ status: 'pass', message: 'InteractiveComponents library loaded' });
            
            // Test hook game functionality
            const testContainer = document.createElement('div');
            testContainer.id = 'test-hook-game';
            document.body.appendChild(testContainer);
            
            try {
                window.InteractiveComponents.createHookGame('test-hook-game');
                tests.push({ status: 'pass', message: 'Hook game creation successful' });
                
                // Test game elements
                const gameElements = testContainer.querySelectorAll('.draggable-item');
                if (gameElements.length > 0) {
                    tests.push({ status: 'pass', message: `Found ${gameElements.length} draggable items` });
                } else {
                    tests.push({ status: 'fail', message: 'No draggable items found' });
                }
                
                // Test drop zones
                const dropZones = testContainer.querySelectorAll('.drag-drop-area');
                if (dropZones.length > 0) {
                    tests.push({ status: 'pass', message: `Found ${dropZones.length} drop zones` });
                } else {
                    tests.push({ status: 'fail', message: 'No drop zones found' });
                }
                
                // Test keyboard accessibility
                const focusableElements = testContainer.querySelectorAll('[tabindex="0"]');
                if (focusableElements.length > 0) {
                    tests.push({ status: 'pass', message: 'Keyboard navigation supported' });
                } else {
                    tests.push({ status: 'warn', message: 'Limited keyboard navigation' });
                }
                
            } catch (error) {
                tests.push({ status: 'fail', message: `Hook game error: ${error.message}` });
            }
            
            // Clean up test container
            testContainer.remove();
            
        } else {
            tests.push({ status: 'fail', message: 'InteractiveComponents library not found' });
        }
        
        // Test conclusion game
        try {
            const conclusionTest = document.createElement('div');
            conclusionTest.id = 'test-conclusion-game';
            document.body.appendChild(conclusionTest);
            
            if (typeof window.InteractiveComponents !== 'undefined') {
                window.InteractiveComponents.createConclusionGame('test-conclusion-game');
                tests.push({ status: 'pass', message: 'Conclusion game creation successful' });
            }
            
            conclusionTest.remove();
        } catch (error) {
            tests.push({ status: 'fail', message: `Conclusion game error: ${error.message}` });
        }
        
        // Test rhetorical devices game
        try {
            const rhetoricalTest = document.createElement('div');
            rhetoricalTest.id = 'test-rhetorical-game';
            document.body.appendChild(rhetoricalTest);
            
            if (typeof window.InteractiveComponents !== 'undefined') {
                window.InteractiveComponents.createRhetoricalDevicesGame('test-rhetorical-game');
                tests.push({ status: 'pass', message: 'Rhetorical devices game creation successful' });
            }
            
            rhetoricalTest.remove();
        } catch (error) {
            tests.push({ status: 'fail', message: `Rhetorical devices game error: ${error.message}` });
        }
        
        this.updateTestResults('interactiveComponents', tests);
        this.updateTestCounts(tests);
    }

    /**
     * Test accessibility compliance
     */
    async testAccessibility() {
        console.log('♿ Testing Accessibility...');
        
        const tests = [];
        
        // Test for semantic HTML
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length > 0) {
            tests.push({ status: 'pass', message: `Found ${headings.length} semantic headings` });
        } else {
            tests.push({ status: 'fail', message: 'No semantic headings found' });
        }
        
        // Test for alt text on images
        const images = document.querySelectorAll('img');
        let imagesWithAlt = 0;
        images.forEach(img => {
            if (img.alt && img.alt.trim() !== '') {
                imagesWithAlt++;
            }
        });
        
        if (images.length === 0) {
            tests.push({ status: 'info', message: 'No images found on page' });
        } else if (imagesWithAlt === images.length) {
            tests.push({ status: 'pass', message: `All ${images.length} images have alt text` });
        } else {
            tests.push({ status: 'fail', message: `${images.length - imagesWithAlt} images missing alt text` });
        }
        
        // Test for keyboard navigation
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
        if (focusableElements.length > 0) {
            tests.push({ status: 'pass', message: `Found ${focusableElements.length} focusable elements` });
        } else {
            tests.push({ status: 'warn', message: 'Limited keyboard navigation elements' });
        }
        
        // Test for ARIA labels
        const ariaLabels = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
        if (ariaLabels.length > 0) {
            tests.push({ status: 'pass', message: `Found ${ariaLabels.length} ARIA labels` });
        } else {
            tests.push({ status: 'warn', message: 'Limited ARIA labeling' });
        }
        
        // Test for form labels
        const inputs = document.querySelectorAll('input, textarea, select');
        let inputsWithLabels = 0;
        inputs.forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label || input.getAttribute('aria-label')) {
                inputsWithLabels++;
            }
        });
        
        if (inputs.length === 0) {
            tests.push({ status: 'info', message: 'No form inputs found' });
        } else if (inputsWithLabels === inputs.length) {
            tests.push({ status: 'pass', message: `All ${inputs.length} inputs have labels` });
        } else {
            tests.push({ status: 'fail', message: `${inputs.length - inputsWithLabels} inputs missing labels` });
        }
        
        // Test color contrast (basic check)
        const body = document.body;
        const computedStyle = window.getComputedStyle(body);
        const backgroundColor = computedStyle.backgroundColor;
        const color = computedStyle.color;
        
        if (backgroundColor && color) {
            tests.push({ status: 'info', message: 'Color contrast check requires manual verification' });
        }
        
        this.updateTestResults('accessibility', tests);
        this.updateTestCounts(tests);
    }

    /**
     * Test performance metrics
     */
    async testPerformance() {
        console.log('⚡ Testing Performance...');
        
        const tests = [];
        
        // Test load time
        const loadTime = Date.now() - this.startTime;
        if (loadTime < this.config.performanceThresholds.loadTime) {
            tests.push({ status: 'pass', message: `Load time: ${loadTime}ms (good)` });
        } else {
            tests.push({ status: 'warn', message: `Load time: ${loadTime}ms (slow)` });
        }
        
        // Test JavaScript errors
        const errorCount = this.testResults.errors.length;
        if (errorCount === 0) {
            tests.push({ status: 'pass', message: 'No JavaScript errors detected' });
        } else {
            tests.push({ status: 'fail', message: `${errorCount} JavaScript errors found` });
        }
        
        // Test resource loading
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        const scripts = document.querySelectorAll('script[src]');
        
        tests.push({ status: 'info', message: `${stylesheets.length} stylesheets loaded` });
        tests.push({ status: 'info', message: `${scripts.length} external scripts loaded` });
        
        // Test DOM complexity
        const domElements = document.querySelectorAll('*').length;
        if (domElements < 1000) {
            tests.push({ status: 'pass', message: `DOM complexity: ${domElements} elements (good)` });
        } else if (domElements < 2000) {
            tests.push({ status: 'warn', message: `DOM complexity: ${domElements} elements (moderate)` });
        } else {
            tests.push({ status: 'fail', message: `DOM complexity: ${domElements} elements (complex)` });
        }
        
        this.updateTestResults('performance', tests);
        this.updateTestCounts(tests);
    }

    /**
     * Test links functionality
     */
    async testLinks() {
        console.log('🔗 Testing Links...');
        
        const tests = [];
        
        // Test internal links
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="handouts/"], a[href^="lesson-plans/"]');
        if (internalLinks.length > 0) {
            tests.push({ status: 'info', message: `Found ${internalLinks.length} internal links` });
            
            // Basic validation of internal links
            let validLinks = 0;
            internalLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.trim() !== '' && !href.startsWith('#')) {
                    validLinks++;
                }
            });
            
            if (validLinks === internalLinks.length) {
                tests.push({ status: 'pass', message: 'All internal links have valid hrefs' });
            } else {
                tests.push({ status: 'warn', message: `${internalLinks.length - validLinks} internal links may be invalid` });
            }
        } else {
            tests.push({ status: 'warn', message: 'No internal links found' });
        }
        
        // Test external links
        const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
        if (externalLinks.length > 0) {
            tests.push({ status: 'info', message: `Found ${externalLinks.length} external links` });
            
            // Check for target="_blank" on external links
            let externalLinksWithTarget = 0;
            externalLinks.forEach(link => {
                if (link.getAttribute('target') === '_blank') {
                    externalLinksWithTarget++;
                }
            });
            
            if (externalLinksWithTarget === externalLinks.length) {
                tests.push({ status: 'pass', message: 'All external links open in new tab' });
            } else {
                tests.push({ status: 'warn', message: `${externalLinks.length - externalLinksWithTarget} external links missing target="_blank"` });
            }
        } else {
            tests.push({ status: 'info', message: 'No external links found' });
        }
        
        // Test anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        if (anchorLinks.length > 0) {
            tests.push({ status: 'info', message: `Found ${anchorLinks.length} anchor links` });
            
            let validAnchors = 0;
            anchorLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        validAnchors++;
                    }
                }
            });
            
            if (validAnchors === anchorLinks.length) {
                tests.push({ status: 'pass', message: 'All anchor links have valid targets' });
            } else {
                tests.push({ status: 'fail', message: `${anchorLinks.length - validAnchors} anchor links have missing targets` });
            }
        }
        
        this.updateTestResults('links', tests);
        this.updateTestCounts(tests);
    }

    /**
     * Test responsive design
     */
    async testResponsiveDesign() {
        console.log('📱 Testing Responsive Design...');
        
        const tests = [];
        
        // Test viewport meta tag
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        if (viewportMeta) {
            tests.push({ status: 'pass', message: 'Viewport meta tag found' });
        } else {
            tests.push({ status: 'fail', message: 'Missing viewport meta tag' });
        }
        
        // Test media queries in stylesheets
        let mediaQueryCount = 0;
        Array.from(document.styleSheets).forEach(sheet => {
            try {
                Array.from(sheet.cssRules || []).forEach(rule => {
                    if (rule.type === CSSRule.MEDIA_RULE) {
                        mediaQueryCount++;
                    }
                });
            } catch (e) {
                // Cross-origin stylesheet access blocked
            }
        });
        
        if (mediaQueryCount > 0) {
            tests.push({ status: 'pass', message: `Found ${mediaQueryCount} media queries` });
        } else {
            tests.push({ status: 'warn', message: 'No media queries detected' });
        }
        
        // Test flexible grid elements
        const gridElements = document.querySelectorAll('.grid, .flex, [class*="grid-"], [class*="flex-"]');
        if (gridElements.length > 0) {
            tests.push({ status: 'pass', message: `Found ${gridElements.length} flexible layout elements` });
        } else {
            tests.push({ status: 'warn', message: 'Limited flexible layout elements' });
        }
        
        this.updateTestResults('responsiveDesign', tests);
        this.updateTestCounts(tests);
    }

    /**
     * Test print functionality
     */
    async testPrintFunctionality() {
        console.log('🖨️ Testing Print Functionality...');
        
        const tests = [];
        
        // Test for print CSS
        const printStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
        let hasPrintCSS = false;
        
        printStyles.forEach(style => {
            if (style.textContent && style.textContent.includes('@media print')) {
                hasPrintCSS = true;
            }
        });
        
        if (hasPrintCSS) {
            tests.push({ status: 'pass', message: 'Print CSS styles found' });
        } else {
            tests.push({ status: 'warn', message: 'No print CSS styles detected' });
        }
        
        // Test print-specific classes
        const printClasses = document.querySelectorAll('.print-only, .no-print, [class*="print-"]');
        if (printClasses.length > 0) {
            tests.push({ status: 'pass', message: `Found ${printClasses.length} print-specific elements` });
        } else {
            tests.push({ status: 'info', message: 'No print-specific classes found' });
        }
        
        this.updateTestResults('printFunctionality', tests);
        this.updateTestCounts(tests);
    }

    /**
     * Update test counts
     */
    updateTestCounts(tests) {
        tests.forEach(test => {
            switch (test.status) {
                case 'pass':
                    this.testResults.passed++;
                    break;
                case 'fail':
                    this.testResults.failed++;
                    this.testResults.errors.push(test.message);
                    break;
                case 'warn':
                    this.testResults.warnings++;
                    this.testResults.warnings.push(test.message);
                    break;
            }
        });
    }

    /**
     * Generate final test report
     */
    generateFinalReport() {
        const totalTests = this.testResults.passed + this.testResults.failed + this.testResults.warnings;
        const passRate = totalTests > 0 ? Math.round((this.testResults.passed / totalTests) * 100) : 0;
        
        const summary = [
            { status: 'info', message: `Total Tests: ${totalTests}` },
            { status: 'pass', message: `Passed: ${this.testResults.passed}` },
            { status: 'fail', message: `Failed: ${this.testResults.failed}` },
            { status: 'warn', message: `Warnings: ${this.testResults.warnings}` },
            { status: 'info', message: `Success Rate: ${passRate}%` }
        ];
        
        this.updateTestResults('testSummary', summary);
        
        // Update header
        const header = document.querySelector('.qa-test-header span:last-child');
        if (header) {
            header.textContent = `Complete (${passRate}%)`;
            header.style.color = passRate >= 80 ? '#059669' : passRate >= 60 ? '#d97706' : '#dc2626';
        }
        
        console.log(`🎯 QA Testing Complete - Success Rate: ${passRate}%`);
        console.log(`✅ Passed: ${this.testResults.passed}`);
        console.log(`❌ Failed: ${this.testResults.failed}`);
        console.log(`⚠️  Warnings: ${this.testResults.warnings}`);
        
        // Log detailed results
        if (this.testResults.errors.length > 0) {
            console.error('Errors found:', this.testResults.errors);
        }
        if (this.testResults.warnings.length > 0) {
            console.warn('Warnings:', this.testResults.warnings);
        }
    }

    /**
     * Toggle test results display
     */
    toggleResults() {
        const results = document.getElementById('qa-test-results');
        if (results) {
            results.style.display = results.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Log error for tracking
     */
    logError(context, message) {
        this.testResults.errors.push(`${context}: ${message}`);
        console.error(`QA Error [${context}]:`, message);
    }

    /**
     * Export test results
     */
    exportResults() {
        const results = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            testResults: this.testResults,
            config: this.config
        };
        
        const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qa-test-results-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Initialize QA Testing Agent
window.qaAgent = new QATestingAgent();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QATestingAgent;
}

// Global error handler for comprehensive error tracking
window.addEventListener('error', (event) => {
    if (window.qaAgent) {
        window.qaAgent.logError('JavaScript Error', event.error?.message || event.message);
    }
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    if (window.qaAgent) {
        window.qaAgent.logError('Unhandled Promise Rejection', event.reason?.message || event.reason);
    }
});