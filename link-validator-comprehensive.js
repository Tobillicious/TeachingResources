/**
 * Comprehensive Link Validator for Mangakōtukutuku College Website
 * Identifies broken links, navigation inconsistencies, and styling issues
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

class WebsiteLinkValidator {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.issues = [];
        this.checkedFiles = new Set();
        this.validFiles = new Set();
        this.externalLinks = new Set();
    }

    /**
     * Main validation function
     */
    async validateWebsite() {
        console.log(`🔍 Starting comprehensive website validation for ${this.rootDir}`);
        
        // 1. Scan for all HTML files
        const htmlFiles = await this.findAllHtmlFiles();
        console.log(`📄 Found ${htmlFiles.length} HTML files`);

        // 2. Build valid file index
        await this.buildValidFileIndex(htmlFiles);
        
        // 3. Check each HTML file for issues
        for (const file of htmlFiles) {
            await this.validateHtmlFile(file);
        }

        // 4. Check CSS and JS files
        await this.validateCssAndJsFiles();

        // 5. Check navigation consistency
        await this.validateNavigationConsistency();

        // 6. Generate comprehensive report
        this.generateReport();
    }

    /**
     * Find all HTML files recursively
     */
    async findAllHtmlFiles() {
        const htmlFiles = [];
        
        const scanDirectory = (dir) => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    scanDirectory(fullPath);
                } else if (item.endsWith('.html')) {
                    htmlFiles.push(fullPath);
                }
            }
        };

        scanDirectory(this.rootDir);
        return htmlFiles;
    }

    /**
     * Build index of valid files for reference checking
     */
    async buildValidFileIndex(htmlFiles) {
        // Add all HTML files
        htmlFiles.forEach(file => {
            const relativePath = path.relative(this.rootDir, file);
            this.validFiles.add(relativePath);
            this.validFiles.add('./' + relativePath);
            this.validFiles.add(relativePath.replace(/\\/g, '/'));
        });

        // Add CSS and JS files
        const cssJsFiles = [];
        const scanForCssJs = (dir) => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    scanForCssJs(fullPath);
                } else if (item.endsWith('.css') || item.endsWith('.js')) {
                    const relativePath = path.relative(this.rootDir, fullPath);
                    this.validFiles.add(relativePath);
                    this.validFiles.add('./' + relativePath);
                    this.validFiles.add(relativePath.replace(/\\/g, '/'));
                }
            }
        };

        scanForCssJs(this.rootDir);
    }

    /**
     * Validate individual HTML file
     */
    async validateHtmlFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const dom = new JSDOM(content);
            const document = dom.window.document;
            const relativePath = path.relative(this.rootDir, filePath);

            console.log(`🔍 Validating: ${relativePath}`);

            // Check all links
            const links = document.querySelectorAll('a[href]');
            for (const link of links) {
                this.validateLink(link.href, filePath, relativePath);
            }

            // Check CSS files
            const cssLinks = document.querySelectorAll('link[href][rel="stylesheet"]');
            for (const cssLink of cssLinks) {
                this.validateAsset(cssLink.href, filePath, relativePath, 'CSS');
            }

            // Check JS files
            const scripts = document.querySelectorAll('script[src]');
            for (const script of scripts) {
                this.validateAsset(script.src, filePath, relativePath, 'JavaScript');
            }

            // Check navigation structure
            this.validatePageNavigation(document, relativePath);

            // Check for common HTML issues
            this.validateHtmlStructure(document, relativePath);

        } catch (error) {
            this.addIssue('FILE_ERROR', `Error reading file: ${relativePath}`, error.message);
        }
    }

    /**
     * Validate individual link
     */
    validateLink(href, sourceFile, sourceRelative) {
        if (!href || href.startsWith('#')) return; // Skip anchors
        
        if (href.startsWith('http://') || href.startsWith('https://')) {
            this.externalLinks.add(href);
            return; // Skip external links for now
        }

        // Handle relative links
        const sourceDir = path.dirname(sourceFile);
        let targetPath;

        if (href.startsWith('./') || href.startsWith('../')) {
            targetPath = path.resolve(sourceDir, href);
        } else if (href.startsWith('/')) {
            targetPath = path.join(this.rootDir, href.substring(1));
        } else {
            targetPath = path.resolve(sourceDir, href);
        }

        // Remove query parameters and anchors
        targetPath = targetPath.split('?')[0].split('#')[0];

        if (!fs.existsSync(targetPath)) {
            this.addIssue('BROKEN_LINK', 
                `Broken link in ${sourceRelative}`, 
                `Link "${href}" points to non-existent file: ${path.relative(this.rootDir, targetPath)}`
            );
        }
    }

    /**
     * Validate CSS/JS assets
     */
    validateAsset(src, sourceFile, sourceRelative, type) {
        if (!src || src.startsWith('http://') || src.startsWith('https://')) return;

        const sourceDir = path.dirname(sourceFile);
        let targetPath;

        if (src.startsWith('./') || src.startsWith('../')) {
            targetPath = path.resolve(sourceDir, src);
        } else if (src.startsWith('/')) {
            targetPath = path.join(this.rootDir, src.substring(1));
        } else {
            targetPath = path.resolve(sourceDir, src);
        }

        if (!fs.existsSync(targetPath)) {
            this.addIssue('MISSING_ASSET', 
                `Missing ${type} file in ${sourceRelative}`, 
                `${type} file "${src}" not found: ${path.relative(this.rootDir, targetPath)}`
            );
        }
    }

    /**
     * Validate navigation structure consistency
     */
    validateNavigationConsistency() {
        // Check shared-components.js navigation vs actual implementation
        const sharedComponentsPath = path.join(this.rootDir, 'js', 'shared-components.js');
        
        if (fs.existsSync(sharedComponentsPath)) {
            const content = fs.readFileSync(sharedComponentsPath, 'utf8');
            
            // Extract navigation items from shared-components.js
            const navItemsMatch = content.match(/const navItems = \[([\s\S]*?)\];/);
            if (navItemsMatch) {
                const navItems = navItemsMatch[1];
                
                // Check if referenced files exist
                const hrefMatches = navItems.match(/href: ['"]([^'"]+)['"]/g);
                if (hrefMatches) {
                    hrefMatches.forEach(match => {
                        const href = match.match(/href: ['"]([^'"]+)['"]/)[1];
                        const targetPath = path.join(this.rootDir, href);
                        
                        if (!fs.existsSync(targetPath)) {
                            this.addIssue('NAV_INCONSISTENCY', 
                                'Navigation references non-existent file', 
                                `shared-components.js references "${href}" which doesn't exist`
                            );
                        }
                    });
                }
            }
        }
    }

    /**
     * Validate page navigation structure
     */
    validatePageNavigation(document, relativePath) {
        // Check if page has navigation
        const hasSharedNav = document.querySelector('[data-auto-init="true"]');
        const hasManualNav = document.querySelector('.site-header') || document.querySelector('.main-nav');
        
        if (!hasSharedNav && !hasManualNav) {
            this.addIssue('NO_NAVIGATION', 
                `Page missing navigation: ${relativePath}`, 
                'Page has no navigation structure (neither auto-init nor manual nav)'
            );
        }

        // Check for duplicate navigation
        if (hasSharedNav && hasManualNav) {
            this.addIssue('DUPLICATE_NAVIGATION', 
                `Duplicate navigation in: ${relativePath}`, 
                'Page has both auto-init and manual navigation which may cause conflicts'
            );
        }
    }

    /**
     * Validate HTML structure
     */
    validateHtmlStructure(document, relativePath) {
        // Check for missing meta viewport
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            this.addIssue('MISSING_VIEWPORT', 
                `Missing viewport meta in: ${relativePath}`, 
                'Page missing responsive viewport meta tag'
            );
        }

        // Check for missing title
        const title = document.querySelector('title');
        if (!title || !title.textContent.trim()) {
            this.addIssue('MISSING_TITLE', 
                `Missing or empty title in: ${relativePath}`, 
                'Page missing proper title tag'
            );
        }

        // Check heading structure
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        
        headings.forEach((heading, index) => {
            const currentLevel = parseInt(heading.tagName.charAt(1));
            
            if (index === 0 && currentLevel !== 1) {
                this.addIssue('HEADING_STRUCTURE', 
                    `Invalid first heading in: ${relativePath}`, 
                    `First heading is ${heading.tagName}, should be H1`
                );
            }
            
            if (currentLevel > previousLevel + 1) {
                this.addIssue('HEADING_SKIP', 
                    `Heading level skip in: ${relativePath}`, 
                    `${heading.tagName} follows H${previousLevel} (skipping levels)`
                );
            }
            
            previousLevel = currentLevel;
        });
    }

    /**
     * Validate CSS and JS files exist and are valid
     */
    async validateCssAndJsFiles() {
        const cssPath = path.join(this.rootDir, 'css', 'main.css');
        const jsPath = path.join(this.rootDir, 'js', 'shared-components.js');

        if (!fs.existsSync(cssPath)) {
            this.addIssue('MISSING_CSS', 'Critical CSS file missing', 'css/main.css not found');
        }

        if (!fs.existsSync(jsPath)) {
            this.addIssue('MISSING_JS', 'Critical JS file missing', 'js/shared-components.js not found');
        }
    }

    /**
     * Add issue to tracking list
     */
    addIssue(type, title, description) {
        this.issues.push({
            type,
            title,
            description,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Generate comprehensive report
     */
    generateReport() {
        console.log('\n' + '='.repeat(80));
        console.log('📊 COMPREHENSIVE WEBSITE VALIDATION REPORT');
        console.log('='.repeat(80));

        if (this.issues.length === 0) {
            console.log('✅ No issues found! Website appears to be in good condition.');
            return;
        }

        // Group issues by type
        const issuesByType = {};
        this.issues.forEach(issue => {
            if (!issuesByType[issue.type]) {
                issuesByType[issue.type] = [];
            }
            issuesByType[issue.type].push(issue);
        });

        // Priority order for issue types
        const priorityOrder = [
            'BROKEN_LINK',
            'MISSING_ASSET',
            'NAV_INCONSISTENCY',
            'DUPLICATE_NAVIGATION',
            'NO_NAVIGATION',
            'FILE_ERROR',
            'MISSING_CSS',
            'MISSING_JS',
            'MISSING_TITLE',
            'MISSING_VIEWPORT',
            'HEADING_STRUCTURE',
            'HEADING_SKIP'
        ];

        console.log(`\n🚨 Found ${this.issues.length} issues across ${Object.keys(issuesByType).length} categories:`);

        priorityOrder.forEach(type => {
            if (issuesByType[type]) {
                const issues = issuesByType[type];
                console.log(`\n📋 ${type.replace(/_/g, ' ')} (${issues.length} issues):`);
                console.log('-'.repeat(50));
                
                issues.forEach((issue, index) => {
                    console.log(`${index + 1}. ${issue.title}`);
                    console.log(`   ${issue.description}`);
                });
            }
        });

        // Summary statistics
        console.log('\n📈 SUMMARY:');
        console.log('-'.repeat(30));
        console.log(`Total Issues: ${this.issues.length}`);
        console.log(`Critical Issues: ${(issuesByType['BROKEN_LINK'] || []).length + (issuesByType['MISSING_ASSET'] || []).length}`);
        console.log(`Navigation Issues: ${(issuesByType['NAV_INCONSISTENCY'] || []).length + (issuesByType['DUPLICATE_NAVIGATION'] || []).length}`);
        console.log(`External Links Found: ${this.externalLinks.size}`);
        
        // Save detailed report to file
        this.saveDetailedReport(issuesByType);
    }

    /**
     * Save detailed report to JSON file
     */
    saveDetailedReport(issuesByType) {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalIssues: this.issues.length,
                criticalIssues: (issuesByType['BROKEN_LINK'] || []).length + (issuesByType['MISSING_ASSET'] || []).length,
                navigationIssues: (issuesByType['NAV_INCONSISTENCY'] || []).length + (issuesByType['DUPLICATE_NAVIGATION'] || []).length,
                externalLinksFound: this.externalLinks.size
            },
            issuesByType,
            allIssues: this.issues,
            externalLinks: Array.from(this.externalLinks)
        };

        const reportPath = path.join(this.rootDir, 'validation-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n💾 Detailed report saved to: validation-report.json`);
    }
}

// Export for use
module.exports = WebsiteLinkValidator;

// Run if called directly
if (require.main === module) {
    const rootDir = process.argv[2] || '.';
    const validator = new WebsiteLinkValidator(rootDir);
    validator.validateWebsite().catch(console.error);
}