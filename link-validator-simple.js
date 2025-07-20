/**
 * Simple Link Validator for Mangakōtukutuku College Website
 * No external dependencies - uses built-in Node.js modules only
 */

const fs = require('fs');
const path = require('path');

class SimpleLinkValidator {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.issues = [];
        this.allFiles = new Set();
        this.htmlFiles = [];
    }

    /**
     * Main validation function
     */
    async validateWebsite() {
        console.log(`🔍 Starting website validation for ${this.rootDir}`);
        
        // 1. Scan for all files
        await this.scanAllFiles();
        console.log(`📄 Found ${this.htmlFiles.length} HTML files and ${this.allFiles.size} total files`);

        // 2. Check each HTML file for broken links
        for (const file of this.htmlFiles) {
            await this.validateHtmlFile(file);
        }

        // 3. Check navigation consistency
        await this.checkNavigationConsistency();

        // 4. Generate report
        this.generateReport();
    }

    /**
     * Scan all files in the directory
     */
    async scanAllFiles() {
        const scanDirectory = (dir) => {
            const items = fs.readdirSync(dir);
            
            for (const item of items) {
                if (item.startsWith('.') || item === 'node_modules') continue;
                
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    scanDirectory(fullPath);
                } else {
                    const relativePath = path.relative(this.rootDir, fullPath);
                    this.allFiles.add(relativePath);
                    this.allFiles.add(relativePath.replace(/\\/g, '/'));
                    
                    if (item.endsWith('.html')) {
                        this.htmlFiles.push(fullPath);
                    }
                }
            }
        };

        scanDirectory(this.rootDir);
    }

    /**
     * Validate HTML file for broken links
     */
    async validateHtmlFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const relativePath = path.relative(this.rootDir, filePath);

            console.log(`🔍 Validating: ${relativePath}`);

            // Extract href attributes using regex
            const hrefMatches = content.match(/href\s*=\s*["']([^"']+)["']/g);
            if (hrefMatches) {
                hrefMatches.forEach(match => {
                    const href = match.match(/href\s*=\s*["']([^"']+)["']/)[1];
                    this.validateLink(href, filePath, relativePath);
                });
            }

            // Extract src attributes for CSS and JS
            const srcMatches = content.match(/(?:src|href)\s*=\s*["']([^"']+\.(?:css|js))["']/g);
            if (srcMatches) {
                srcMatches.forEach(match => {
                    const src = match.match(/(?:src|href)\s*=\s*["']([^"']+)["']/)[1];
                    this.validateAsset(src, filePath, relativePath);
                });
            }

            // Check for basic HTML structure issues
            this.validateBasicStructure(content, relativePath);

        } catch (error) {
            this.addIssue('FILE_ERROR', `Error reading file: ${relativePath}`, error.message);
        }
    }

    /**
     * Validate individual link
     */
    validateLink(href, sourceFile, sourceRelative) {
        if (!href || href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {
            return; // Skip anchors, external links, and mailto
        }

        // Handle query parameters and anchors
        const cleanHref = href.split('?')[0].split('#')[0];
        
        // Handle relative links
        const sourceDir = path.dirname(sourceFile);
        let targetPath;

        if (cleanHref.startsWith('./') || cleanHref.startsWith('../')) {
            targetPath = path.resolve(sourceDir, cleanHref);
        } else if (cleanHref.startsWith('/')) {
            targetPath = path.join(this.rootDir, cleanHref.substring(1));
        } else {
            targetPath = path.resolve(sourceDir, cleanHref);
        }

        if (!fs.existsSync(targetPath)) {
            const relativeTarget = path.relative(this.rootDir, targetPath);
            this.addIssue('BROKEN_LINK', 
                `Broken link in ${sourceRelative}`, 
                `Link "${href}" → Missing file: ${relativeTarget}`
            );
        }
    }

    /**
     * Validate CSS/JS assets
     */
    validateAsset(src, sourceFile, sourceRelative) {
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
            const relativeTarget = path.relative(this.rootDir, targetPath);
            this.addIssue('MISSING_ASSET', 
                `Missing asset in ${sourceRelative}`, 
                `Asset "${src}" → Missing file: ${relativeTarget}`
            );
        }
    }

    /**
     * Check basic HTML structure
     */
    validateBasicStructure(content, relativePath) {
        // Check for title
        if (!content.includes('<title>') || content.match(/<title>\s*<\/title>/)) {
            this.addIssue('MISSING_TITLE', 
                `Missing title in ${relativePath}`, 
                'Page missing proper title tag'
            );
        }

        // Check for viewport meta
        if (!content.includes('name="viewport"')) {
            this.addIssue('MISSING_VIEWPORT', 
                `Missing viewport in ${relativePath}`, 
                'Page missing responsive viewport meta tag'
            );
        }

        // Check navigation structure
        const hasAutoInit = content.includes('data-auto-init="true"');
        const hasManualNav = content.includes('class="site-header"') || content.includes('class="main-nav"');
        
        if (!hasAutoInit && !hasManualNav) {
            this.addIssue('NO_NAVIGATION', 
                `No navigation in ${relativePath}`, 
                'Page has no navigation structure'
            );
        }

        if (hasAutoInit && hasManualNav) {
            this.addIssue('DUPLICATE_NAVIGATION', 
                `Duplicate navigation in ${relativePath}`, 
                'Page has both auto-init and manual navigation'
            );
        }
    }

    /**
     * Check navigation consistency
     */
    async checkNavigationConsistency() {
        const sharedComponentsPath = path.join(this.rootDir, 'js', 'shared-components.js');
        
        if (fs.existsSync(sharedComponentsPath)) {
            const content = fs.readFileSync(sharedComponentsPath, 'utf8');
            
            // Extract href references from navItems
            const hrefMatches = content.match(/href:\s*['"]([^'"]+)['"]/g);
            if (hrefMatches) {
                hrefMatches.forEach(match => {
                    const href = match.match(/href:\s*['"]([^'"]+)['"]/)[1];
                    const targetPath = path.join(this.rootDir, href);
                    
                    if (!fs.existsSync(targetPath)) {
                        this.addIssue('NAV_INCONSISTENCY', 
                            'Navigation references missing file', 
                            `shared-components.js references "${href}" which doesn't exist`
                        );
                    }
                });
            }
        } else {
            this.addIssue('MISSING_JS', 
                'Critical JS file missing', 
                'js/shared-components.js not found'
            );
        }

        // Check main CSS file
        const mainCssPath = path.join(this.rootDir, 'css', 'main.css');
        if (!fs.existsSync(mainCssPath)) {
            this.addIssue('MISSING_CSS', 
                'Critical CSS file missing', 
                'css/main.css not found'
            );
        }
    }

    /**
     * Add issue to tracking
     */
    addIssue(type, title, description) {
        this.issues.push({ type, title, description });
    }

    /**
     * Generate validation report
     */
    generateReport() {
        console.log('\n' + '='.repeat(80));
        console.log('📊 WEBSITE VALIDATION REPORT');
        console.log('='.repeat(80));

        if (this.issues.length === 0) {
            console.log('✅ No issues found! Website appears to be in good condition.');
            return;
        }

        // Group by issue type
        const byType = {};
        this.issues.forEach(issue => {
            if (!byType[issue.type]) byType[issue.type] = [];
            byType[issue.type].push(issue);
        });

        console.log(`\n🚨 Found ${this.issues.length} issues:\n`);

        // Report by priority
        const priority = ['BROKEN_LINK', 'MISSING_ASSET', 'NAV_INCONSISTENCY', 'MISSING_CSS', 'MISSING_JS', 'DUPLICATE_NAVIGATION', 'NO_NAVIGATION', 'MISSING_TITLE', 'MISSING_VIEWPORT', 'FILE_ERROR'];
        
        priority.forEach(type => {
            if (byType[type]) {
                console.log(`\n🔍 ${type.replace(/_/g, ' ')} (${byType[type].length}):`);
                console.log('-'.repeat(50));
                byType[type].forEach((issue, i) => {
                    console.log(`${i + 1}. ${issue.title}`);
                    console.log(`   ${issue.description}`);
                });
            }
        });

        // Create summary
        const report = {
            timestamp: new Date().toISOString(),
            totalIssues: this.issues.length,
            issuesByType: byType,
            criticalIssues: (byType['BROKEN_LINK'] || []).length + (byType['MISSING_ASSET'] || []).length,
            allIssues: this.issues
        };

        // Save to file
        fs.writeFileSync(path.join(this.rootDir, 'validation-report.json'), JSON.stringify(report, null, 2));
        console.log(`\n💾 Detailed report saved to: validation-report.json`);
        console.log(`\n📈 SUMMARY: ${this.issues.length} total issues, ${report.criticalIssues} critical`);
    }
}

// Run if called directly
if (require.main === module) {
    const rootDir = process.argv[2] || '.';
    const validator = new SimpleLinkValidator(rootDir);
    validator.validateWebsite().catch(console.error);
}

module.exports = SimpleLinkValidator;