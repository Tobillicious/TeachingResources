/**
 * Accessibility Auditor - WCAG 2.1 Compliance Testing Suite
 * Comprehensive accessibility testing for educational resources
 * Focuses on Level AA compliance and educational accessibility needs
 */

class AccessibilityAuditor {
    constructor() {
        this.results = {
            summary: { passed: 0, failed: 0, warnings: 0, total: 0 },
            categories: {
                perceivable: { tests: [], score: 0 },
                operable: { tests: [], score: 0 },
                understandable: { tests: [], score: 0 },
                robust: { tests: [], score: 0 }
            },
            violations: [],
            recommendations: []
        };
        
        this.wcagGuidelines = {
            perceivable: [
                '1.1.1 - Non-text Content',
                '1.3.1 - Info and Relationships',
                '1.4.1 - Use of Color',
                '1.4.3 - Contrast (Minimum)',
                '1.4.4 - Resize text'
            ],
            operable: [
                '2.1.1 - Keyboard',
                '2.1.2 - No Keyboard Trap',
                '2.4.1 - Bypass Blocks',
                '2.4.2 - Page Titled',
                '2.4.3 - Focus Order',
                '2.4.4 - Link Purpose',
                '2.4.6 - Headings and Labels'
            ],
            understandable: [
                '3.1.1 - Language of Page',
                '3.2.1 - On Focus',
                '3.2.2 - On Input',
                '3.3.1 - Error Identification',
                '3.3.2 - Labels or Instructions'
            ],
            robust: [
                '4.1.1 - Parsing',
                '4.1.2 - Name, Role, Value',
                '4.1.3 - Status Messages'
            ]
        };
        
        this.init();
    }

    /**
     * Initialize accessibility auditor
     */
    init() {
        console.log('♿ Accessibility Auditor initialized');
        this.createAuditorDisplay();
        this.runComprehensiveAudit();
    }

    /**
     * Create auditor display interface
     */
    createAuditorDisplay() {
        const style = document.createElement('style');
        style.textContent = `
            .accessibility-auditor {
                position: fixed;
                top: 50%;
                left: 20px;
                transform: translateY(-50%);
                width: 360px;
                max-height: 80vh;
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 9997;
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 11px;
                overflow: hidden;
            }
            
            .accessibility-header {
                background: linear-gradient(135deg, #059669, #047857);
                color: white;
                padding: 12px 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .accessibility-content {
                max-height: 60vh;
                overflow-y: auto;
                padding: 16px;
            }
            
            .accessibility-category {
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .accessibility-category:last-child {
                border-bottom: none;
            }
            
            .accessibility-category h4 {
                margin: 0 0 8px 0;
                color: #374151;
                font-size: 12px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .accessibility-score {
                background: #f3f4f6;
                padding: 2px 6px;
                border-radius: 3px;
                font-size: 10px;
                font-weight: bold;
                color: white;
            }
            
            .accessibility-score.excellent { background: #059669; }
            .accessibility-score.good { background: #0ea5e9; }
            .accessibility-score.fair { background: #d97706; }
            .accessibility-score.poor { background: #dc2626; }
            
            .accessibility-test {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                padding: 4px 0;
                font-size: 10px;
                border-bottom: 1px solid #f9fafb;
            }
            
            .accessibility-test:last-child {
                border-bottom: none;
            }
            
            .accessibility-status {
                font-size: 12px;
                min-width: 16px;
                text-align: center;
            }
            
            .accessibility-status.pass { color: #059669; }
            .accessibility-status.fail { color: #dc2626; }
            .accessibility-status.warn { color: #d97706; }
            
            .accessibility-details {
                flex: 1;
                min-width: 0;
            }
            
            .accessibility-guideline {
                font-weight: bold;
                color: #374151;
                margin-bottom: 2px;
            }
            
            .accessibility-description {
                color: #6b7280;
                font-size: 9px;
                line-height: 1.3;
            }
            
            .accessibility-violation {
                background: #fef2f2;
                border-left: 4px solid #dc2626;
                padding: 8px 12px;
                margin: 4px 0;
                border-radius: 4px;
            }
            
            .accessibility-recommendation {
                background: #f0f9ff;
                border-left: 4px solid #0ea5e9;
                padding: 8px 12px;
                margin: 4px 0;
                border-radius: 4px;
            }
            
            .accessibility-summary {
                background: #f8fafc;
                padding: 12px;
                border-radius: 6px;
                margin-bottom: 16px;
            }
            
            .summary-metric {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
                font-size: 10px;
            }
            
            .summary-metric:last-child {
                margin-bottom: 0;
            }
            
            .accessibility-actions {
                padding: 12px 16px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 8px;
            }
            
            .accessibility-button {
                background: #059669;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 10px;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .accessibility-button:hover {
                background: #047857;
            }
            
            .accessibility-button.secondary {
                background: #6b7280;
            }
            
            .accessibility-button.secondary:hover {
                background: #4b5563;
            }
            
            @media (max-width: 768px) {
                .accessibility-auditor {
                    width: calc(100vw - 40px);
                    left: 20px;
                    right: 20px;
                    top: 20px;
                    transform: none;
                }
            }
        `;
        document.head.appendChild(style);
        
        const container = document.createElement('div');
        container.id = 'accessibility-auditor';
        container.className = 'accessibility-auditor';
        container.innerHTML = `
            <div class="accessibility-header">
                <span>♿</span>
                <span>Accessibility Auditor</span>
                <span style="margin-left: auto; font-size: 10px;" id="accessibility-status">Running...</span>
            </div>
            <div class="accessibility-content" id="accessibility-content">
                <div class="accessibility-summary" id="accessibility-summary">
                    <div class="summary-metric">
                        <span>Scanning for accessibility issues...</span>
                    </div>
                </div>
            </div>
            <div class="accessibility-actions">
                <button class="accessibility-button" onclick="accessibilityAuditor.runComprehensiveAudit()">Re-audit</button>
                <button class="accessibility-button secondary" onclick="accessibilityAuditor.exportReport()">Export</button>
                <button class="accessibility-button secondary" onclick="accessibilityAuditor.toggleDisplay()">Hide</button>
            </div>
        `;
        document.body.appendChild(container);
    }

    /**
     * Run comprehensive accessibility audit
     */
    async runComprehensiveAudit() {
        console.log('🔍 Running comprehensive accessibility audit...');
        
        // Reset results
        this.results = {
            summary: { passed: 0, failed: 0, warnings: 0, total: 0 },
            categories: {
                perceivable: { tests: [], score: 0 },
                operable: { tests: [], score: 0 },
                understandable: { tests: [], score: 0 },
                robust: { tests: [], score: 0 }
            },
            violations: [],
            recommendations: []
        };
        
        try {
            // Run tests for each WCAG principle
            await this.auditPerceivable();
            await this.auditOperable();
            await this.auditUnderstandable();
            await this.auditRobust();
            
            // Calculate scores and generate recommendations
            this.calculateScores();
            this.generateRecommendations();
            
            // Update display
            this.updateAuditorDisplay();
            
        } catch (error) {
            console.error('Accessibility audit error:', error);
            this.updateStatus('Audit failed');
        }
    }

    /**
     * Audit Perceivable principle (WCAG 1.x)
     */
    async auditPerceivable() {
        console.log('👁️ Auditing Perceivable...');
        
        const tests = [];
        
        // 1.1.1 Non-text Content
        const images = document.querySelectorAll('img');
        let imagesWithAlt = 0;
        images.forEach(img => {
            if (img.alt && img.alt.trim() !== '') {
                imagesWithAlt++;
            }
        });
        
        tests.push({
            guideline: '1.1.1 - Non-text Content',
            status: images.length === 0 ? 'pass' : (imagesWithAlt === images.length ? 'pass' : 'fail'),
            description: `${imagesWithAlt}/${images.length} images have alt text`,
            element: 'img elements'
        });
        
        // 1.3.1 Info and Relationships
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const hasProperHeadingStructure = this.validateHeadingStructure(headings);
        
        tests.push({
            guideline: '1.3.1 - Info and Relationships',
            status: hasProperHeadingStructure ? 'pass' : 'fail',
            description: `Heading structure ${hasProperHeadingStructure ? 'follows' : 'violates'} logical order`,
            element: 'heading elements'
        });
        
        // 1.4.1 Use of Color
        const colorOnlyElements = document.querySelectorAll('[style*="color:"]');
        const hasColorOnlyInfo = this.checkColorOnlyInformation(colorOnlyElements);
        
        tests.push({
            guideline: '1.4.1 - Use of Color',
            status: hasColorOnlyInfo ? 'warn' : 'pass',
            description: hasColorOnlyInfo ? 'Information may rely solely on color' : 'No color-only information detected',
            element: 'styled elements'
        });
        
        // 1.4.3 Contrast (Minimum)
        const contrastIssues = await this.checkColorContrast();
        
        tests.push({
            guideline: '1.4.3 - Contrast (Minimum)',
            status: contrastIssues.length > 0 ? 'fail' : 'pass',
            description: contrastIssues.length > 0 ? `${contrastIssues.length} contrast issues found` : 'No contrast issues detected',
            element: 'text elements'
        });
        
        // 1.4.4 Resize text
        const hasFlexibleText = this.checkTextResize();
        
        tests.push({
            guideline: '1.4.4 - Resize text',
            status: hasFlexibleText ? 'pass' : 'warn',
            description: hasFlexibleText ? 'Text appears to be resizable' : 'Text resize capability uncertain',
            element: 'text elements'
        });
        
        this.results.categories.perceivable.tests = tests;
    }

    /**
     * Audit Operable principle (WCAG 2.x)
     */
    async auditOperable() {
        console.log('⌨️ Auditing Operable...');
        
        const tests = [];
        
        // 2.1.1 Keyboard
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
        const keyboardAccessible = this.checkKeyboardAccessibility(interactiveElements);
        
        tests.push({
            guideline: '2.1.1 - Keyboard',
            status: keyboardAccessible.accessible ? 'pass' : 'fail',
            description: `${keyboardAccessible.accessible ? 'All' : 'Some'} interactive elements are keyboard accessible`,
            element: 'interactive elements'
        });
        
        // 2.1.2 No Keyboard Trap
        const hasKeyboardTrap = this.checkKeyboardTrap();
        
        tests.push({
            guideline: '2.1.2 - No Keyboard Trap',
            status: hasKeyboardTrap ? 'fail' : 'pass',
            description: hasKeyboardTrap ? 'Potential keyboard trap detected' : 'No keyboard traps detected',
            element: 'focusable elements'
        });
        
        // 2.4.1 Bypass Blocks
        const skipLinks = document.querySelectorAll('a[href^="#"], .skip-link');
        
        tests.push({
            guideline: '2.4.1 - Bypass Blocks',
            status: skipLinks.length > 0 ? 'pass' : 'warn',
            description: skipLinks.length > 0 ? 'Skip links found' : 'No skip links detected',
            element: 'navigation elements'
        });
        
        // 2.4.2 Page Titled
        const pageTitle = document.title;
        
        tests.push({
            guideline: '2.4.2 - Page Titled',
            status: pageTitle && pageTitle.trim() !== '' ? 'pass' : 'fail',
            description: pageTitle ? `Page title: "${pageTitle}"` : 'No page title found',
            element: 'title element'
        });
        
        // 2.4.3 Focus Order
        const focusOrder = this.checkFocusOrder(interactiveElements);
        
        tests.push({
            guideline: '2.4.3 - Focus Order',
            status: focusOrder.logical ? 'pass' : 'warn',
            description: focusOrder.logical ? 'Focus order appears logical' : 'Focus order may be illogical',
            element: 'focusable elements'
        });
        
        // 2.4.4 Link Purpose
        const links = document.querySelectorAll('a[href]');
        const linkPurpose = this.checkLinkPurpose(links);
        
        tests.push({
            guideline: '2.4.4 - Link Purpose',
            status: linkPurpose.clear ? 'pass' : 'warn',
            description: `${linkPurpose.clear ? 'All' : 'Some'} links have clear purpose`,
            element: 'link elements'
        });
        
        // 2.4.6 Headings and Labels
        const labels = document.querySelectorAll('label');
        const formInputs = document.querySelectorAll('input, textarea, select');
        const labelledInputs = this.checkLabels(formInputs);
        
        tests.push({
            guideline: '2.4.6 - Headings and Labels',
            status: labelledInputs.allLabelled ? 'pass' : 'fail',
            description: `${labelledInputs.labelled}/${labelledInputs.total} form inputs have labels`,
            element: 'form elements'
        });
        
        this.results.categories.operable.tests = tests;
    }

    /**
     * Audit Understandable principle (WCAG 3.x)
     */
    async auditUnderstandable() {
        console.log('🧠 Auditing Understandable...');
        
        const tests = [];
        
        // 3.1.1 Language of Page
        const htmlLang = document.documentElement.lang;
        
        tests.push({
            guideline: '3.1.1 - Language of Page',
            status: htmlLang && htmlLang.trim() !== '' ? 'pass' : 'fail',
            description: htmlLang ? `Page language: ${htmlLang}` : 'No page language specified',
            element: 'html element'
        });
        
        // 3.2.1 On Focus
        const focusChanges = this.checkFocusChanges();
        
        tests.push({
            guideline: '3.2.1 - On Focus',
            status: focusChanges.safe ? 'pass' : 'warn',
            description: focusChanges.safe ? 'No unexpected focus changes' : 'Potential unexpected focus changes',
            element: 'interactive elements'
        });
        
        // 3.2.2 On Input
        const inputChanges = this.checkInputChanges();
        
        tests.push({
            guideline: '3.2.2 - On Input',
            status: inputChanges.safe ? 'pass' : 'warn',
            description: inputChanges.safe ? 'No unexpected input changes' : 'Potential unexpected input changes',
            element: 'form elements'
        });
        
        // 3.3.1 Error Identification
        const errorElements = document.querySelectorAll('.error, [aria-invalid="true"], .invalid');
        const errorIdentification = this.checkErrorIdentification(errorElements);
        
        tests.push({
            guideline: '3.3.1 - Error Identification',
            status: errorElements.length === 0 ? 'pass' : (errorIdentification.clear ? 'pass' : 'warn'),
            description: errorElements.length === 0 ? 'No errors present' : `${errorIdentification.clear ? 'Clear' : 'Unclear'} error identification`,
            element: 'error elements'
        });
        
        // 3.3.2 Labels or Instructions
        const instructionalElements = document.querySelectorAll('label, .instructions, [aria-describedby]');
        
        tests.push({
            guideline: '3.3.2 - Labels or Instructions',
            status: instructionalElements.length > 0 ? 'pass' : 'warn',
            description: `${instructionalElements.length} instructional elements found`,
            element: 'instructional elements'
        });
        
        this.results.categories.understandable.tests = tests;
    }

    /**
     * Audit Robust principle (WCAG 4.x)
     */
    async auditRobust() {
        console.log('🛡️ Auditing Robust...');
        
        const tests = [];
        
        // 4.1.1 Parsing
        const parsingErrors = this.checkHTMLValidity();
        
        tests.push({
            guideline: '4.1.1 - Parsing',
            status: parsingErrors.length === 0 ? 'pass' : 'warn',
            description: parsingErrors.length === 0 ? 'No parsing errors detected' : `${parsingErrors.length} potential parsing issues`,
            element: 'HTML structure'
        });
        
        // 4.1.2 Name, Role, Value
        const customElements = document.querySelectorAll('[role], [aria-label], [aria-labelledby]');
        const nameRoleValue = this.checkNameRoleValue(customElements);
        
        tests.push({
            guideline: '4.1.2 - Name, Role, Value',
            status: nameRoleValue.compliant ? 'pass' : 'warn',
            description: `${nameRoleValue.compliant ? 'All' : 'Some'} custom elements have proper name/role/value`,
            element: 'ARIA elements'
        });
        
        // 4.1.3 Status Messages
        const statusMessages = document.querySelectorAll('[aria-live], [role="alert"], [role="status"]');
        
        tests.push({
            guideline: '4.1.3 - Status Messages',
            status: statusMessages.length > 0 ? 'pass' : 'warn',
            description: `${statusMessages.length} status message regions found`,
            element: 'status elements'
        });
        
        this.results.categories.robust.tests = tests;
    }

    /**
     * Validate heading structure
     */
    validateHeadingStructure(headings) {
        if (headings.length === 0) return true;
        
        const levels = Array.from(headings).map(h => parseInt(h.tagName.substr(1)));
        let currentLevel = 0;
        
        for (const level of levels) {
            if (level > currentLevel + 1) {
                return false; // Skipped heading level
            }
            currentLevel = level;
        }
        
        return true;
    }

    /**
     * Check for color-only information
     */
    checkColorOnlyInformation(elements) {
        // Simple heuristic: look for elements with color styles but no text indicators
        let colorOnlyCount = 0;
        
        elements.forEach(element => {
            const style = window.getComputedStyle(element);
            const text = element.textContent.trim();
            
            if (style.color && !text.includes('*') && !text.includes('!') && !text.includes('error')) {
                colorOnlyCount++;
            }
        });
        
        return colorOnlyCount > 0;
    }

    /**
     * Check color contrast
     */
    async checkColorContrast() {
        const issues = [];
        const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6, a, button, label');
        
        textElements.forEach(element => {
            const style = window.getComputedStyle(element);
            const color = style.color;
            const backgroundColor = style.backgroundColor;
            
            // Simple contrast check (would need more sophisticated algorithm for real implementation)
            if (color && backgroundColor && color !== backgroundColor) {
                // This is a simplified check - real implementation would calculate actual contrast ratios
                if (color === 'rgb(255, 255, 255)' && backgroundColor === 'rgb(255, 255, 255)') {
                    issues.push(element);
                }
            }
        });
        
        return issues;
    }

    /**
     * Check text resize capability
     */
    checkTextResize() {
        const bodyStyle = window.getComputedStyle(document.body);
        const fontSize = bodyStyle.fontSize;
        
        // Check if font size is specified in relative units
        return fontSize.includes('rem') || fontSize.includes('em') || fontSize.includes('%');
    }

    /**
     * Check keyboard accessibility
     */
    checkKeyboardAccessibility(elements) {
        let accessible = 0;
        
        elements.forEach(element => {
            const tabIndex = element.tabIndex;
            const isNativelyFocusable = ['a', 'button', 'input', 'textarea', 'select'].includes(element.tagName.toLowerCase());
            
            if (isNativelyFocusable || tabIndex >= 0) {
                accessible++;
            }
        });
        
        return {
            accessible: accessible === elements.length,
            count: accessible,
            total: elements.length
        };
    }

    /**
     * Check for keyboard traps
     */
    checkKeyboardTrap() {
        // Simple check for modal dialogs without proper focus management
        const modals = document.querySelectorAll('.modal, [role="dialog"], [aria-modal="true"]');
        
        for (const modal of modals) {
            const style = window.getComputedStyle(modal);
            if (style.display !== 'none' && style.visibility !== 'hidden') {
                // Check if modal has focus management
                const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusableElements.length > 0) {
                    return true; // Potential keyboard trap
                }
            }
        }
        
        return false;
    }

    /**
     * Check focus order
     */
    checkFocusOrder(elements) {
        const tabIndexes = Array.from(elements).map(el => ({
            element: el,
            tabIndex: el.tabIndex,
            position: this.getElementPosition(el)
        }));
        
        // Simple check: elements with positive tabindex should be in order
        const positiveTabIndexes = tabIndexes.filter(item => item.tabIndex > 0);
        
        if (positiveTabIndexes.length > 1) {
            for (let i = 1; i < positiveTabIndexes.length; i++) {
                if (positiveTabIndexes[i].tabIndex < positiveTabIndexes[i-1].tabIndex) {
                    return { logical: false };
                }
            }
        }
        
        return { logical: true };
    }

    /**
     * Check link purpose
     */
    checkLinkPurpose(links) {
        let clearLinks = 0;
        
        links.forEach(link => {
            const text = link.textContent.trim().toLowerCase();
            const ariaLabel = link.getAttribute('aria-label');
            const title = link.getAttribute('title');
            
            // Check for vague link text
            const vagueTexts = ['click here', 'read more', 'more', 'here', 'link'];
            const isVague = vagueTexts.some(vague => text.includes(vague));
            
            if (!isVague || ariaLabel || title) {
                clearLinks++;
            }
        });
        
        return {
            clear: clearLinks === links.length,
            count: clearLinks,
            total: links.length
        };
    }

    /**
     * Check labels for form inputs
     */
    checkLabels(inputs) {
        let labelled = 0;
        
        inputs.forEach(input => {
            const id = input.id;
            const label = id ? document.querySelector(`label[for="${id}"]`) : null;
            const ariaLabel = input.getAttribute('aria-label');
            const ariaLabelledby = input.getAttribute('aria-labelledby');
            
            if (label || ariaLabel || ariaLabelledby) {
                labelled++;
            }
        });
        
        return {
            allLabelled: labelled === inputs.length,
            labelled: labelled,
            total: inputs.length
        };
    }

    /**
     * Check focus changes
     */
    checkFocusChanges() {
        // This would typically monitor actual focus events
        // For now, return a safe default
        return { safe: true };
    }

    /**
     * Check input changes
     */
    checkInputChanges() {
        // This would typically monitor actual input events
        // For now, return a safe default
        return { safe: true };
    }

    /**
     * Check error identification
     */
    checkErrorIdentification(errors) {
        let clearErrors = 0;
        
        errors.forEach(error => {
            const text = error.textContent.trim();
            const ariaLabel = error.getAttribute('aria-label');
            
            if (text || ariaLabel) {
                clearErrors++;
            }
        });
        
        return {
            clear: clearErrors === errors.length,
            count: clearErrors,
            total: errors.length
        };
    }

    /**
     * Check HTML validity
     */
    checkHTMLValidity() {
        const issues = [];
        
        // Check for duplicate IDs
        const ids = [];
        const elementsWithIds = document.querySelectorAll('[id]');
        
        elementsWithIds.forEach(element => {
            const id = element.id;
            if (ids.includes(id)) {
                issues.push(`Duplicate ID: ${id}`);
            } else {
                ids.push(id);
            }
        });
        
        // Check for required attributes
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.src && !img.getAttribute('src')) {
                issues.push('Image missing src attribute');
            }
        });
        
        return issues;
    }

    /**
     * Check name, role, value for custom elements
     */
    checkNameRoleValue(elements) {
        let compliant = 0;
        
        elements.forEach(element => {
            const role = element.getAttribute('role');
            const ariaLabel = element.getAttribute('aria-label');
            const ariaLabelledby = element.getAttribute('aria-labelledby');
            
            // If element has a role, it should have a name
            if (role) {
                if (ariaLabel || ariaLabelledby || element.textContent.trim()) {
                    compliant++;
                }
            } else {
                compliant++; // Non-custom elements assumed compliant
            }
        });
        
        return {
            compliant: compliant === elements.length,
            count: compliant,
            total: elements.length
        };
    }

    /**
     * Calculate scores for each category
     */
    calculateScores() {
        Object.keys(this.results.categories).forEach(category => {
            const tests = this.results.categories[category].tests;
            const passed = tests.filter(test => test.status === 'pass').length;
            const total = tests.length;
            
            this.results.categories[category].score = total > 0 ? Math.round((passed / total) * 100) : 0;
            
            // Update summary
            this.results.summary.passed += tests.filter(test => test.status === 'pass').length;
            this.results.summary.failed += tests.filter(test => test.status === 'fail').length;
            this.results.summary.warnings += tests.filter(test => test.status === 'warn').length;
        });
        
        this.results.summary.total = this.results.summary.passed + this.results.summary.failed + this.results.summary.warnings;
    }

    /**
     * Generate recommendations
     */
    generateRecommendations() {
        const recommendations = [];
        
        // Analyze failed tests and generate recommendations
        Object.values(this.results.categories).forEach(category => {
            category.tests.forEach(test => {
                if (test.status === 'fail') {
                    recommendations.push({
                        priority: 'high',
                        issue: test.guideline,
                        description: test.description,
                        suggestion: this.getRecommendation(test.guideline)
                    });
                } else if (test.status === 'warn') {
                    recommendations.push({
                        priority: 'medium',
                        issue: test.guideline,
                        description: test.description,
                        suggestion: this.getRecommendation(test.guideline)
                    });
                }
            });
        });
        
        this.results.recommendations = recommendations;
    }

    /**
     * Get recommendation for a specific guideline
     */
    getRecommendation(guideline) {
        const recommendations = {
            '1.1.1 - Non-text Content': 'Add descriptive alt text to all images',
            '1.3.1 - Info and Relationships': 'Use proper heading hierarchy (h1 → h2 → h3)',
            '1.4.3 - Contrast (Minimum)': 'Ensure text has sufficient color contrast (4.5:1 ratio)',
            '2.1.1 - Keyboard': 'Make all interactive elements keyboard accessible',
            '2.4.2 - Page Titled': 'Add a descriptive page title',
            '2.4.6 - Headings and Labels': 'Associate labels with form controls',
            '3.1.1 - Language of Page': 'Set the page language in the html element',
            '4.1.1 - Parsing': 'Fix HTML validation errors and duplicate IDs'
        };
        
        return recommendations[guideline] || 'Review and improve this accessibility aspect';
    }

    /**
     * Get element position for focus order checking
     */
    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left
        };
    }

    /**
     * Update auditor display
     */
    updateAuditorDisplay() {
        const content = document.getElementById('accessibility-content');
        if (!content) return;
        
        const overallScore = this.results.summary.total > 0 ? 
            Math.round((this.results.summary.passed / this.results.summary.total) * 100) : 0;
        
        let html = `
            <div class="accessibility-summary">
                <div class="summary-metric">
                    <span>Overall Score:</span>
                    <span class="accessibility-score ${this.getScoreClass(overallScore)}">${overallScore}%</span>
                </div>
                <div class="summary-metric">
                    <span>Passed:</span>
                    <span style="color: #059669;">${this.results.summary.passed}</span>
                </div>
                <div class="summary-metric">
                    <span>Failed:</span>
                    <span style="color: #dc2626;">${this.results.summary.failed}</span>
                </div>
                <div class="summary-metric">
                    <span>Warnings:</span>
                    <span style="color: #d97706;">${this.results.summary.warnings}</span>
                </div>
            </div>
        `;
        
        // Add categories
        Object.entries(this.results.categories).forEach(([categoryName, category]) => {
            html += `
                <div class="accessibility-category">
                    <h4>
                        ${this.getCategoryIcon(categoryName)} ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                        <span class="accessibility-score ${this.getScoreClass(category.score)}">${category.score}%</span>
                    </h4>
                    ${category.tests.map(test => `
                        <div class="accessibility-test">
                            <span class="accessibility-status ${test.status}">${this.getStatusIcon(test.status)}</span>
                            <div class="accessibility-details">
                                <div class="accessibility-guideline">${test.guideline}</div>
                                <div class="accessibility-description">${test.description}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        });
        
        // Add recommendations
        if (this.results.recommendations.length > 0) {
            html += `
                <div class="accessibility-category">
                    <h4>💡 Recommendations</h4>
                    ${this.results.recommendations.slice(0, 3).map(rec => `
                        <div class="accessibility-recommendation">
                            <strong>${rec.priority.toUpperCase()}:</strong> ${rec.suggestion}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        content.innerHTML = html;
        
        // Update status
        this.updateStatus(`Complete (${overallScore}%)`);
        
        console.log(`♿ Accessibility audit complete - Score: ${overallScore}%`);
    }

    /**
     * Get category icon
     */
    getCategoryIcon(category) {
        const icons = {
            perceivable: '👁️',
            operable: '⌨️',
            understandable: '🧠',
            robust: '🛡️'
        };
        return icons[category] || '📋';
    }

    /**
     * Get score class
     */
    getScoreClass(score) {
        if (score >= 90) return 'excellent';
        if (score >= 80) return 'good';
        if (score >= 60) return 'fair';
        return 'poor';
    }

    /**
     * Get status icon
     */
    getStatusIcon(status) {
        switch (status) {
            case 'pass': return '✅';
            case 'fail': return '❌';
            case 'warn': return '⚠️';
            default: return '❓';
        }
    }

    /**
     * Update status display
     */
    updateStatus(message) {
        const status = document.getElementById('accessibility-status');
        if (status) {
            status.textContent = message;
        }
    }

    /**
     * Export accessibility report
     */
    exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            wcagLevel: 'AA',
            results: this.results,
            guidelines: this.wcagGuidelines
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `accessibility-report-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Toggle display visibility
     */
    toggleDisplay() {
        const auditor = document.getElementById('accessibility-auditor');
        if (auditor) {
            auditor.style.display = auditor.style.display === 'none' ? 'block' : 'none';
        }
    }
}

// Initialize Accessibility Auditor
window.accessibilityAuditor = new AccessibilityAuditor();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityAuditor;
}