/**
 * Performance Monitor - Real-time Performance Tracking and Optimization
 * Monitors page load times, resource usage, and user interactions
 * Provides optimization recommendations and performance insights
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            domContentLoaded: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            firstInputDelay: 0,
            cumulativeLayoutShift: 0,
            resourceTiming: [],
            userInteractions: [],
            memoryUsage: null,
            networkInfo: null
        };
        
        this.thresholds = {
            loadTime: 3000,
            fcp: 1800,
            lcp: 2500,
            fid: 100,
            cls: 0.1
        };
        
        this.observers = [];
        this.startTime = performance.now();
        
        this.init();
    }

    /**
     * Initialize performance monitoring
     */
    init() {
        console.log('📊 Performance Monitor initialized');
        
        // Set up performance observers
        this.setupPerformanceObservers();
        
        // Monitor navigation timing
        this.monitorNavigationTiming();
        
        // Monitor resource loading
        this.monitorResourceTiming();
        
        // Monitor user interactions
        this.monitorUserInteractions();
        
        // Monitor memory usage
        this.monitorMemoryUsage();
        
        // Monitor network information
        this.monitorNetworkInfo();
        
        // Create performance display
        this.createPerformanceDisplay();
        
        // Start continuous monitoring
        this.startContinuousMonitoring();
    }

    /**
     * Set up performance observers
     */
    setupPerformanceObservers() {
        // First Contentful Paint
        if ('PerformanceObserver' in window) {
            try {
                const fcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        if (entry.name === 'first-contentful-paint') {
                            this.metrics.firstContentfulPaint = entry.startTime;
                        }
                    });
                });
                fcpObserver.observe({ entryTypes: ['paint'] });
                this.observers.push(fcpObserver);
            } catch (e) {
                console.warn('Paint observer not supported');
            }

            // Largest Contentful Paint
            try {
                const lcpObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.largestContentfulPaint = lastEntry.startTime;
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                this.observers.push(lcpObserver);
            } catch (e) {
                console.warn('LCP observer not supported');
            }

            // First Input Delay
            try {
                const fidObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        this.metrics.firstInputDelay = entry.processingStart - entry.startTime;
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
                this.observers.push(fidObserver);
            } catch (e) {
                console.warn('FID observer not supported');
            }

            // Cumulative Layout Shift
            try {
                const clsObserver = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            this.metrics.cumulativeLayoutShift += entry.value;
                        }
                    });
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
                this.observers.push(clsObserver);
            } catch (e) {
                console.warn('CLS observer not supported');
            }
        }
    }

    /**
     * Monitor navigation timing
     */
    monitorNavigationTiming() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    this.metrics.loadTime = navigation.loadEventEnd - navigation.navigationStart;
                    this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.navigationStart;
                }
                this.updatePerformanceDisplay();
            }, 100);
        });
    }

    /**
     * Monitor resource timing
     */
    monitorResourceTiming() {
        const resources = performance.getEntriesByType('resource');
        this.metrics.resourceTiming = resources.map(resource => ({
            name: resource.name,
            duration: resource.duration,
            transferSize: resource.transferSize || 0,
            type: this.getResourceType(resource.name)
        }));
    }

    /**
     * Monitor user interactions
     */
    monitorUserInteractions() {
        const interactionEvents = ['click', 'scroll', 'keydown', 'touchstart'];
        
        interactionEvents.forEach(eventType => {
            document.addEventListener(eventType, (event) => {
                const interactionStart = performance.now();
                
                // Measure interaction delay
                requestAnimationFrame(() => {
                    const interactionEnd = performance.now();
                    const delay = interactionEnd - interactionStart;
                    
                    this.metrics.userInteractions.push({
                        type: eventType,
                        timestamp: interactionStart,
                        delay: delay,
                        target: event.target.tagName
                    });
                    
                    // Keep only last 100 interactions
                    if (this.metrics.userInteractions.length > 100) {
                        this.metrics.userInteractions.shift();
                    }
                });
            }, { passive: true });
        });
    }

    /**
     * Monitor memory usage
     */
    monitorMemoryUsage() {
        if ('memory' in performance) {
            this.metrics.memoryUsage = {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            };
        }
    }

    /**
     * Monitor network information
     */
    monitorNetworkInfo() {
        if ('connection' in navigator) {
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            this.metrics.networkInfo = {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }
    }

    /**
     * Create performance display interface
     */
    createPerformanceDisplay() {
        // Add CSS for performance display
        const style = document.createElement('style');
        style.textContent = `
            .performance-monitor {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 320px;
                max-height: 60vh;
                background: white;
                border: 2px solid #e2e8f0;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                z-index: 9998;
                font-family: 'Monaco', 'Menlo', monospace;
                font-size: 11px;
                overflow: hidden;
            }
            
            .performance-header {
                background: linear-gradient(135deg, #7c3aed, #5b21b6);
                color: white;
                padding: 12px 16px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .performance-content {
                max-height: 40vh;
                overflow-y: auto;
                padding: 16px;
            }
            
            .performance-section {
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #e2e8f0;
            }
            
            .performance-section:last-child {
                border-bottom: none;
            }
            
            .performance-section h4 {
                margin: 0 0 8px 0;
                color: #374151;
                font-size: 12px;
            }
            
            .performance-metric {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 4px 0;
                font-size: 10px;
            }
            
            .performance-value {
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 3px;
                color: white;
                font-size: 9px;
            }
            
            .performance-value.good { background: #059669; }
            .performance-value.warning { background: #d97706; }
            .performance-value.poor { background: #dc2626; }
            .performance-value.info { background: #3b82f6; }
            
            .performance-chart {
                width: 100%;
                height: 40px;
                background: #f3f4f6;
                border-radius: 4px;
                position: relative;
                margin-top: 8px;
            }
            
            .performance-bar {
                height: 100%;
                background: linear-gradient(90deg, #059669, #34d399);
                border-radius: 4px;
                transition: width 0.3s ease;
            }
            
            .performance-recommendation {
                background: #fef3c7;
                border-left: 4px solid #f59e0b;
                padding: 8px 12px;
                margin: 8px 0;
                font-size: 10px;
                border-radius: 4px;
            }
            
            .performance-actions {
                padding: 12px 16px;
                background: #f8fafc;
                border-top: 1px solid #e2e8f0;
                display: flex;
                gap: 8px;
            }
            
            .performance-button {
                background: #7c3aed;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 4px;
                font-size: 10px;
                cursor: pointer;
                transition: background 0.2s;
            }
            
            .performance-button:hover {
                background: #5b21b6;
            }
            
            .performance-button.secondary {
                background: #6b7280;
            }
            
            .performance-button.secondary:hover {
                background: #4b5563;
            }
            
            @media (max-width: 768px) {
                .performance-monitor {
                    width: calc(100vw - 40px);
                    right: 20px;
                    left: 20px;
                    bottom: 20px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Create performance container
        const container = document.createElement('div');
        container.id = 'performance-monitor';
        container.className = 'performance-monitor';
        container.innerHTML = `
            <div class="performance-header">
                <span>📊</span>
                <span>Performance Monitor</span>
                <span style="margin-left: auto; font-size: 10px;" id="performance-status">Monitoring...</span>
            </div>
            <div class="performance-content" id="performance-content">
                <div class="performance-section">
                    <h4>Core Web Vitals</h4>
                    <div id="core-vitals-metrics"></div>
                </div>
                <div class="performance-section">
                    <h4>Resource Loading</h4>
                    <div id="resource-metrics"></div>
                </div>
                <div class="performance-section">
                    <h4>Recommendations</h4>
                    <div id="performance-recommendations"></div>
                </div>
            </div>
            <div class="performance-actions">
                <button class="performance-button" onclick="performanceMonitor.runAnalysis()">Analyze</button>
                <button class="performance-button secondary" onclick="performanceMonitor.exportReport()">Export</button>
                <button class="performance-button secondary" onclick="performanceMonitor.toggleDisplay()">Hide</button>
            </div>
        `;
        document.body.appendChild(container);
    }

    /**
     * Update performance display
     */
    updatePerformanceDisplay() {
        this.updateCoreVitals();
        this.updateResourceMetrics();
        this.generateRecommendations();
    }

    /**
     * Update Core Web Vitals display
     */
    updateCoreVitals() {
        const coreVitalsContainer = document.getElementById('core-vitals-metrics');
        if (!coreVitalsContainer) return;
        
        const metrics = [
            {
                name: 'Load Time',
                value: this.metrics.loadTime,
                threshold: this.thresholds.loadTime,
                unit: 'ms'
            },
            {
                name: 'First Contentful Paint',
                value: this.metrics.firstContentfulPaint,
                threshold: this.thresholds.fcp,
                unit: 'ms'
            },
            {
                name: 'Largest Contentful Paint',
                value: this.metrics.largestContentfulPaint,
                threshold: this.thresholds.lcp,
                unit: 'ms'
            },
            {
                name: 'First Input Delay',
                value: this.metrics.firstInputDelay,
                threshold: this.thresholds.fid,
                unit: 'ms'
            },
            {
                name: 'Cumulative Layout Shift',
                value: this.metrics.cumulativeLayoutShift,
                threshold: this.thresholds.cls,
                unit: ''
            }
        ];
        
        coreVitalsContainer.innerHTML = metrics.map(metric => {
            const status = this.getMetricStatus(metric.value, metric.threshold, metric.name);
            const displayValue = metric.value ? Math.round(metric.value) : 'N/A';
            
            return `
                <div class="performance-metric">
                    <span>${metric.name}</span>
                    <span class="performance-value ${status}">${displayValue}${metric.unit}</span>
                </div>
            `;
        }).join('');
    }

    /**
     * Update resource metrics display
     */
    updateResourceMetrics() {
        const resourceContainer = document.getElementById('resource-metrics');
        if (!resourceContainer) return;
        
        const resourceStats = this.analyzeResourceTiming();
        
        resourceContainer.innerHTML = `
            <div class="performance-metric">
                <span>Total Resources</span>
                <span class="performance-value info">${resourceStats.totalResources}</span>
            </div>
            <div class="performance-metric">
                <span>Average Load Time</span>
                <span class="performance-value ${resourceStats.avgLoadTime > 1000 ? 'warning' : 'good'}">${resourceStats.avgLoadTime}ms</span>
            </div>
            <div class="performance-metric">
                <span>Total Transfer Size</span>
                <span class="performance-value info">${this.formatBytes(resourceStats.totalSize)}</span>
            </div>
            <div class="performance-metric">
                <span>Slowest Resource</span>
                <span class="performance-value ${resourceStats.slowestDuration > 2000 ? 'poor' : 'warning'}">${resourceStats.slowestDuration}ms</span>
            </div>
        `;
    }

    /**
     * Generate performance recommendations
     */
    generateRecommendations() {
        const recommendationsContainer = document.getElementById('performance-recommendations');
        if (!recommendationsContainer) return;
        
        const recommendations = [];
        
        // Load time recommendations
        if (this.metrics.loadTime > this.thresholds.loadTime) {
            recommendations.push('Consider optimizing images and reducing JavaScript bundle size');
        }
        
        // FCP recommendations
        if (this.metrics.firstContentfulPaint > this.thresholds.fcp) {
            recommendations.push('Optimize critical rendering path and reduce render-blocking resources');
        }
        
        // LCP recommendations
        if (this.metrics.largestContentfulPaint > this.thresholds.lcp) {
            recommendations.push('Optimize largest contentful element (images, videos, or text blocks)');
        }
        
        // CLS recommendations
        if (this.metrics.cumulativeLayoutShift > this.thresholds.cls) {
            recommendations.push('Add size attributes to images and avoid inserting content above existing content');
        }
        
        // Resource recommendations
        const resourceStats = this.analyzeResourceTiming();
        if (resourceStats.totalSize > 2000000) { // 2MB
            recommendations.push('Consider implementing lazy loading and code splitting');
        }
        
        if (recommendations.length === 0) {
            recommendations.push('Great job! Your page meets all performance thresholds.');
        }
        
        recommendationsContainer.innerHTML = recommendations.map(rec => 
            `<div class="performance-recommendation">${rec}</div>`
        ).join('');
    }

    /**
     * Get metric status based on thresholds
     */
    getMetricStatus(value, threshold, metricName) {
        if (!value && value !== 0) return 'info';
        
        if (metricName === 'Cumulative Layout Shift') {
            if (value < 0.1) return 'good';
            if (value < 0.25) return 'warning';
            return 'poor';
        }
        
        if (value < threshold * 0.8) return 'good';
        if (value < threshold) return 'warning';
        return 'poor';
    }

    /**
     * Analyze resource timing
     */
    analyzeResourceTiming() {
        const resources = performance.getEntriesByType('resource');
        
        const totalResources = resources.length;
        const totalDuration = resources.reduce((sum, resource) => sum + resource.duration, 0);
        const avgLoadTime = totalResources > 0 ? Math.round(totalDuration / totalResources) : 0;
        const totalSize = resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0);
        const slowestResource = resources.reduce((slowest, resource) => 
            resource.duration > slowest.duration ? resource : slowest, { duration: 0 });
        
        return {
            totalResources,
            avgLoadTime,
            totalSize,
            slowestDuration: Math.round(slowestResource.duration)
        };
    }

    /**
     * Get resource type from URL
     */
    getResourceType(url) {
        if (url.includes('.css')) return 'stylesheet';
        if (url.includes('.js')) return 'script';
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
        if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return 'font';
        return 'other';
    }

    /**
     * Format bytes for display
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    /**
     * Start continuous monitoring
     */
    startContinuousMonitoring() {
        setInterval(() => {
            this.monitorMemoryUsage();
            this.updatePerformanceDisplay();
        }, 5000);
    }

    /**
     * Run comprehensive analysis
     */
    runAnalysis() {
        console.log('🔍 Running comprehensive performance analysis...');
        
        // Re-collect all metrics
        this.monitorNavigationTiming();
        this.monitorResourceTiming();
        this.monitorMemoryUsage();
        this.monitorNetworkInfo();
        
        // Update display
        this.updatePerformanceDisplay();
        
        // Log detailed analysis
        console.log('📊 Performance Analysis:', {
            coreWebVitals: {
                loadTime: this.metrics.loadTime,
                fcp: this.metrics.firstContentfulPaint,
                lcp: this.metrics.largestContentfulPaint,
                fid: this.metrics.firstInputDelay,
                cls: this.metrics.cumulativeLayoutShift
            },
            resources: this.analyzeResourceTiming(),
            memory: this.metrics.memoryUsage,
            network: this.metrics.networkInfo,
            interactions: this.metrics.userInteractions.length
        });
    }

    /**
     * Export performance report
     */
    exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            metrics: this.metrics,
            analysis: {
                coreWebVitals: {
                    loadTime: this.metrics.loadTime,
                    fcp: this.metrics.firstContentfulPaint,
                    lcp: this.metrics.largestContentfulPaint,
                    fid: this.metrics.firstInputDelay,
                    cls: this.metrics.cumulativeLayoutShift
                },
                resources: this.analyzeResourceTiming(),
                thresholds: this.thresholds
            }
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `performance-report-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Toggle display visibility
     */
    toggleDisplay() {
        const monitor = document.getElementById('performance-monitor');
        if (monitor) {
            monitor.style.display = monitor.style.display === 'none' ? 'block' : 'none';
        }
    }

    /**
     * Cleanup observers
     */
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Initialize Performance Monitor
window.performanceMonitor = new PerformanceMonitor();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.performanceMonitor) {
        window.performanceMonitor.cleanup();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceMonitor;
}