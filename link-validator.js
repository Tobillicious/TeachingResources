/**
 * Link Validator - Comprehensive Link Testing System
 * Validates all internal and external links across the educational website
 * Provides detailed reporting and automated monitoring
 */

class LinkValidator {
    constructor() {
        this.results = {
            internal: { total: 0, working: 0, broken: 0, details: [] },
            external: { total: 0, working: 0, broken: 0, details: [] },
            anchors: { total: 0, working: 0, broken: 0, details: [] },
            images: { total: 0, working: 0, broken: 0, details: [] },
            resources: { total: 0, working: 0, broken: 0, details: [] }
        };
        
        this.baseUrl = window.location.origin;
        this.basePath = window.location.pathname.replace(/\/[^\/]*$/, '/');
        
        this.config = {
            timeout: 10000,
            retryAttempts: 2,
            concurrency: 5,
            excludePatterns: [
                'mailto:',
                'tel:',
                'javascript:',
                'data:',
                '#'
            ]
        };
        
        console.log('🔗 Link Validator initialized');
    }

    /**
     * Validate all links on the current page
     */
    async validateAllLinks() {
        console.log('🔍 Starting comprehensive link validation...');
        
        try {
            // Create results display
            this.createResultsDisplay();
            
            // Validate different types of links
            await this.validateInternalLinks();
            await this.validateExternalLinks();
            await this.validateAnchorLinks();
            await this.validateImageLinks();
            await this.validateResourceLinks();
            
            // Generate final report
            this.generateReport();
            
        } catch (error) {
            console.error('Link validation error:', error);
            this.updateStatus('Error during link validation');
        }
    }

    /**
     * Create results display interface
     */
    createResultsDisplay() {
        // Add CSS for results display
        const style = document.createElement('style');
        style.textContent = `
            .link-validator-results {
                position: fixed;
                top: 50px;
                right: 20px;
                width: 350px;
                max-height: 70vh;
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 12px;
                overflow: hidden;
            }
            
            .link-validator-header {
                background: linear-gradient(135deg, #059669, #047857);
                color: white;
                padding: 12px 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .link-validator-content {
                max-height: 50vh;
                overflow-y: auto;
                padding: 16px;
            }
            
            .link-category {
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .link-category:last-child {
                border-bottom: none;
            }
            
            .link-category h4 {
                margin: 0 0 8px 0;
                color: #374151;
                font-size: 13px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .link-status {
                font-weight: bold;
                font-size: 10px;
                padding: 2px 6px;
                border-radius: 3px;
                color: white;
            }
            
            .link-status.working { background: #059669; }
            .link-status.broken { background: #dc2626; }
            .link-status.pending { background: #6b7280; }
            .link-status.warning { background: #d97706; }
            
            .link-item {
                display: flex;
                align-items: flex-start;
                gap: 8px;
                padding: 4px 0;
                font-size: 10px;
                border-bottom: 1px solid #f3f4f6;
            }
            
            .link-item:last-child {
                border-bottom: none;
            }
            
            .link-icon {
                font-size: 12px;
                min-width: 16px;
            }
            
            .link-details {
                flex: 1;
                min-width: 0;
            }
            
            .link-url {
                color: #3b82f6;
                word-break: break-all;
                font-size: 10px;
            }
            
            .link-error {
                color: #dc2626;
                font-size: 9px;
                margin-top: 2px;
            }
            
            .link-validator-summary {
                background: #f8fafc;
                padding: 12px;
                border-radius: 6px;
                margin-top: 16px;
            }
            
            .summary-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 4px;
                font-size: 11px;
            }
            
            .summary-item:last-child {
                margin-bottom: 0;
            }
            
            .link-validator-actions {
                padding: 12px 16px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 8px;
            }
            
            .link-validator-button {
                background: #059669;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 10px;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .link-validator-button:hover {
                background: #047857;
            }
            
            .link-validator-button.secondary {
                background: #6b7280;
            }
            
            .link-validator-button.secondary:hover {
                background: #4b5563;
            }
            
            @media (max-width: 768px) {
                .link-validator-results {
                    width: calc(100vw - 40px);
                    right: 20px;
                    left: 20px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Create results container
        const container = document.createElement('div');
        container.id = 'link-validator-results';
        container.className = 'link-validator-results';
        container.innerHTML = `
            <div class="link-validator-header">
                <span>🔗</span>
                <span>Link Validator</span>
                <span style="margin-left: auto; font-size: 11px;" id="link-validator-status">Initializing...</span>
            </div>
            <div class="link-validator-content" id="link-validator-content">
                <div class="link-category">
                    <h4>🔄 Scanning links...</h4>
                </div>
            </div>
            <div class="link-validator-actions">
                <button class="link-validator-button" onclick="linkValidator.validateAllLinks()">Revalidate</button>
                <button class="link-validator-button secondary" onclick="linkValidator.exportResults()">Export</button>
                <button class="link-validator-button secondary" onclick="linkValidator.toggleDisplay()">Hide</button>
            </div>
        `;
        document.body.appendChild(container);
    }

    /**
     * Update validation status
     */
    updateStatus(message) {
        const status = document.getElementById('link-validator-status');
        if (status) {
            status.textContent = message;
        }
    }

    /**
     * Validate internal links
     */
    async validateInternalLinks() {
        console.log('🏠 Validating internal links...');
        this.updateStatus('Validating internal links...');
        
        const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="handouts/"], a[href^="lesson-plans/"], a[href^="project/"]');
        
        this.results.internal.total = internalLinks.length;
        
        for (const link of internalLinks) {
            const href = link.getAttribute('href');
            if (!href || this.shouldSkipLink(href)) continue;
            
            try {
                const fullUrl = this.resolveUrl(href);
                const result = await this.checkLinkExists(fullUrl);
                
                const linkResult = {
                    url: href,
                    fullUrl: fullUrl,
                    text: link.textContent.trim().substring(0, 50),
                    status: result.exists ? 'working' : 'broken',
                    error: result.error,
                    element: link
                };
                
                this.results.internal.details.push(linkResult);
                
                if (result.exists) {
                    this.results.internal.working++;
                } else {
                    this.results.internal.broken++;
                }
                
            } catch (error) {
                this.results.internal.broken++;
                this.results.internal.details.push({
                    url: href,
                    text: link.textContent.trim().substring(0, 50),
                    status: 'broken',
                    error: error.message
                });
            }
        }
        
        this.updateCategoryDisplay('internal', 'Internal Links', '🏠');
    }

    /**
     * Validate external links
     */
    async validateExternalLinks() {
        console.log('🌐 Validating external links...');
        this.updateStatus('Validating external links...');
        
        const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
        
        this.results.external.total = externalLinks.length;
        
        for (const link of externalLinks) {
            const href = link.getAttribute('href');
            if (!href || this.shouldSkipLink(href)) continue;
            
            try {
                const result = await this.checkExternalLink(href);
                
                const linkResult = {
                    url: href,
                    text: link.textContent.trim().substring(0, 50),
                    status: result.accessible ? 'working' : 'broken',
                    error: result.error,
                    element: link
                };
                
                this.results.external.details.push(linkResult);
                
                if (result.accessible) {
                    this.results.external.working++;
                } else {
                    this.results.external.broken++;
                }
                
            } catch (error) {
                this.results.external.broken++;
                this.results.external.details.push({
                    url: href,
                    text: link.textContent.trim().substring(0, 50),
                    status: 'broken',
                    error: error.message
                });
            }
        }
        
        this.updateCategoryDisplay('external', 'External Links', '🌐');
    }

    /**
     * Validate anchor links
     */
    async validateAnchorLinks() {
        console.log('⚓ Validating anchor links...');
        this.updateStatus('Validating anchor links...');
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        this.results.anchors.total = anchorLinks.length;
        
        for (const link of anchorLinks) {
            const href = link.getAttribute('href');
            if (!href || href === '#') continue;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            const linkResult = {
                url: href,
                text: link.textContent.trim().substring(0, 50),
                status: targetElement ? 'working' : 'broken',
                error: targetElement ? null : 'Target element not found',
                element: link
            };
            
            this.results.anchors.details.push(linkResult);
            
            if (targetElement) {
                this.results.anchors.working++;
            } else {
                this.results.anchors.broken++;
            }
        }
        
        this.updateCategoryDisplay('anchors', 'Anchor Links', '⚓');
    }

    /**
     * Validate image links
     */
    async validateImageLinks() {
        console.log('🖼️ Validating image links...');
        this.updateStatus('Validating image links...');
        
        const images = document.querySelectorAll('img');
        
        this.results.images.total = images.length;
        
        for (const img of images) {
            const src = img.getAttribute('src');
            if (!src || this.shouldSkipLink(src)) continue;
            
            try {
                const fullUrl = this.resolveUrl(src);
                const result = await this.checkImageExists(img, fullUrl);
                
                const imageResult = {
                    url: src,
                    fullUrl: fullUrl,
                    alt: img.alt || 'No alt text',
                    status: result.exists ? 'working' : 'broken',
                    error: result.error,
                    element: img
                };
                
                this.results.images.details.push(imageResult);
                
                if (result.exists) {
                    this.results.images.working++;
                } else {
                    this.results.images.broken++;
                }
                
            } catch (error) {
                this.results.images.broken++;
                this.results.images.details.push({
                    url: src,
                    alt: img.alt || 'No alt text',
                    status: 'broken',
                    error: error.message
                });
            }
        }
        
        this.updateCategoryDisplay('images', 'Image Links', '🖼️');
    }

    /**
     * Validate resource links (CSS, JS, etc.)
     */
    async validateResourceLinks() {
        console.log('📄 Validating resource links...');
        this.updateStatus('Validating resource links...');
        
        const resources = document.querySelectorAll('link[href], script[src]');
        
        this.results.resources.total = resources.length;
        
        for (const resource of resources) {
            const href = resource.getAttribute('href') || resource.getAttribute('src');
            if (!href || this.shouldSkipLink(href)) continue;
            
            try {
                const fullUrl = this.resolveUrl(href);
                const result = await this.checkLinkExists(fullUrl);
                
                const resourceResult = {
                    url: href,
                    fullUrl: fullUrl,
                    type: resource.tagName.toLowerCase(),
                    status: result.exists ? 'working' : 'broken',
                    error: result.error,
                    element: resource
                };
                
                this.results.resources.details.push(resourceResult);
                
                if (result.exists) {
                    this.results.resources.working++;
                } else {
                    this.results.resources.broken++;
                }
                
            } catch (error) {
                this.results.resources.broken++;
                this.results.resources.details.push({
                    url: href,
                    type: resource.tagName.toLowerCase(),
                    status: 'broken',
                    error: error.message
                });
            }
        }
        
        this.updateCategoryDisplay('resources', 'Resource Links', '📄');
    }

    /**
     * Check if a link exists
     */
    async checkLinkExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            const timeout = setTimeout(() => {
                resolve({ exists: false, error: 'Timeout' });
            }, this.config.timeout);
            
            img.onload = () => {
                clearTimeout(timeout);
                resolve({ exists: true });
            };
            
            img.onerror = () => {
                clearTimeout(timeout);
                // For non-image resources, try fetch
                fetch(url, { method: 'HEAD', mode: 'no-cors' })
                    .then(() => resolve({ exists: true }))
                    .catch((error) => resolve({ exists: false, error: error.message }));
            };
            
            img.src = url;
        });
    }

    /**
     * Check if an image exists
     */
    async checkImageExists(img, url) {
        return new Promise((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
                resolve({ exists: true });
                return;
            }
            
            const timeout = setTimeout(() => {
                resolve({ exists: false, error: 'Timeout' });
            }, this.config.timeout);
            
            const testImg = new Image();
            testImg.onload = () => {
                clearTimeout(timeout);
                resolve({ exists: true });
            };
            
            testImg.onerror = () => {
                clearTimeout(timeout);
                resolve({ exists: false, error: 'Image failed to load' });
            };
            
            testImg.src = url;
        });
    }

    /**
     * Check external link accessibility
     */
    async checkExternalLink(url) {
        return new Promise((resolve) => {
            const timeout = setTimeout(() => {
                resolve({ accessible: false, error: 'Timeout' });
            }, this.config.timeout);
            
            // Try to fetch the URL
            fetch(url, { method: 'HEAD', mode: 'no-cors' })
                .then(() => {
                    clearTimeout(timeout);
                    resolve({ accessible: true });
                })
                .catch((error) => {
                    clearTimeout(timeout);
                    resolve({ accessible: false, error: error.message });
                });
        });
    }

    /**
     * Resolve relative URLs to absolute URLs
     */
    resolveUrl(url) {
        if (url.startsWith('http')) return url;
        if (url.startsWith('/')) return this.baseUrl + url;
        if (url.startsWith('./')) return this.baseUrl + this.basePath + url.substring(2);
        if (url.startsWith('../')) return this.baseUrl + this.basePath + url;
        return this.baseUrl + this.basePath + url;
    }

    /**
     * Check if a link should be skipped
     */
    shouldSkipLink(url) {
        return this.config.excludePatterns.some(pattern => 
            url.startsWith(pattern) || url === pattern
        );
    }

    /**
     * Update category display
     */
    updateCategoryDisplay(category, title, icon) {
        const content = document.getElementById('link-validator-content');
        if (!content) return;
        
        const categoryData = this.results[category];
        const existingCategory = content.querySelector(`[data-category="${category}"]`);
        
        if (existingCategory) {
            existingCategory.remove();
        }
        
        const categoryElement = document.createElement('div');
        categoryElement.className = 'link-category';
        categoryElement.dataset.category = category;
        
        const workingPercent = categoryData.total > 0 ? 
            Math.round((categoryData.working / categoryData.total) * 100) : 0;
        
        let statusClass = 'working';
        if (categoryData.broken > 0) {
            statusClass = categoryData.broken > categoryData.working ? 'broken' : 'warning';
        }
        
        categoryElement.innerHTML = `
            <h4>
                ${icon} ${title}
                <span class="link-status ${statusClass}">
                    ${categoryData.working}/${categoryData.total} (${workingPercent}%)
                </span>
            </h4>
            <div class="link-items">
                ${categoryData.details.slice(0, 5).map(item => `
                    <div class="link-item">
                        <span class="link-icon">${item.status === 'working' ? '✅' : '❌'}</span>
                        <div class="link-details">
                            <div class="link-url">${item.url}</div>
                            ${item.text ? `<div>${item.text}</div>` : ''}
                            ${item.error ? `<div class="link-error">${item.error}</div>` : ''}
                        </div>
                    </div>
                `).join('')}
                ${categoryData.details.length > 5 ? `<div class="link-item"><span class="link-icon">...</span><div class="link-details">And ${categoryData.details.length - 5} more</div></div>` : ''}
            </div>
        `;
        
        content.appendChild(categoryElement);
    }

    /**
     * Generate final report
     */
    generateReport() {
        const totalLinks = Object.values(this.results).reduce((sum, category) => sum + category.total, 0);
        const totalWorking = Object.values(this.results).reduce((sum, category) => sum + category.working, 0);
        const totalBroken = Object.values(this.results).reduce((sum, category) => sum + category.broken, 0);
        const successRate = totalLinks > 0 ? Math.round((totalWorking / totalLinks) * 100) : 0;
        
        const content = document.getElementById('link-validator-content');
        if (!content) return;
        
        const summary = document.createElement('div');
        summary.className = 'link-validator-summary';
        summary.innerHTML = `
            <h4>📊 Summary</h4>
            <div class="summary-item">
                <span>Total Links:</span>
                <span>${totalLinks}</span>
            </div>
            <div class="summary-item">
                <span>Working:</span>
                <span style="color: #059669;">${totalWorking}</span>
            </div>
            <div class="summary-item">
                <span>Broken:</span>
                <span style="color: #dc2626;">${totalBroken}</span>
            </div>
            <div class="summary-item">
                <span>Success Rate:</span>
                <span style="color: ${successRate >= 95 ? '#059669' : successRate >= 80 ? '#d97706' : '#dc2626'};">${successRate}%</span>
            </div>
        `;
        
        content.appendChild(summary);
        
        // Update header status
        this.updateStatus(`Complete (${successRate}%)`);
        
        console.log(`🎯 Link validation complete - Success rate: ${successRate}%`);
        console.log(`✅ Working links: ${totalWorking}`);
        console.log(`❌ Broken links: ${totalBroken}`);
        
        // Log broken links for debugging
        Object.entries(this.results).forEach(([category, data]) => {
            if (data.broken > 0) {
                console.warn(`${category} broken links:`, data.details.filter(item => item.status === 'broken'));
            }
        });
    }

    /**
     * Export results to JSON
     */
    exportResults() {
        const exportData = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            results: this.results,
            summary: {
                totalLinks: Object.values(this.results).reduce((sum, category) => sum + category.total, 0),
                totalWorking: Object.values(this.results).reduce((sum, category) => sum + category.working, 0),
                totalBroken: Object.values(this.results).reduce((sum, category) => sum + category.broken, 0)
            }
        };
        
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `link-validation-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Toggle display visibility
     */
    toggleDisplay() {
        const results = document.getElementById('link-validator-results');
        if (results) {
            results.style.display = results.style.display === 'none' ? 'block' : 'none';
        }
    }
}

// Initialize Link Validator
window.linkValidator = new LinkValidator();

// Auto-start validation on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.linkValidator.validateAllLinks();
    }, 1000);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LinkValidator;
}