/**
 * =================================================================
 * CODEBASE CONTEXT MAPPER - Te Kete Ako AI Agent Assistant
 * =================================================================
 * 
 * PURPOSE: Provides comprehensive analysis and context tracking for
 * the Te Kete Ako educational platform to assist AI agents in
 * understanding project structure, dependencies, and priorities.
 * 
 * ARCHITECTURE:
 * - File relationship mapping
 * - Refactoring status tracking
 * - Content audit capabilities  
 * - Cultural authenticity validation
 * - MCP agent coordination metadata
 * 
 * FOR AI AGENTS:
 * - Run this to understand current project state
 * - Identifies high-priority files needing attention
 * - Maps dependencies between components
 * - Tracks cultural validation requirements
 * 
 * =================================================================
 */

const fs = require('fs');
const path = require('path');

class CodebaseContextMapper {
    constructor(rootPath) {
        this.rootPath = rootPath;
        this.fileMap = new Map();
        this.dependencyGraph = new Map();
        this.refactoringStatus = new Map();
        this.culturalValidation = new Map();
        this.mcpAgentAssignments = new Map();
        
        // Define project structure patterns
        this.projectStructure = {
            core: ['index.html', 'css/', 'js/'],
            educational: ['handouts/', 'units/', 'lesson-plans/'],
            interactive: ['games/', 'activities.html'],
            cultural: ['agents/comms/', 'docs/'],
            assessment: ['assessment-frameworks/', 'project/']
        };
        
        // Track refactoring patterns
        this.refactoringMarkers = {
            completed: ['shared-components.js', 'main.css', 'data-auto-init="true"'],
            legacy: ['tailwindcss.com', 'bg-gray-100', 'space-y-4'],
            cultural: ['whakataukii', 'Te Ao Māori', 'cultural-header']
        };
    }

    async analyzeCodebase() {
        console.log('🔍 Starting comprehensive codebase analysis...');
        
        await this.scanAllFiles();
        await this.analyzeDependencies();
        await this.assessRefactoringStatus();
        await this.validateCulturalAuthenticity();
        await this.mapMCPAgentRequirements();
        
        return this.generateReport();
    }

    async scanAllFiles() {
        console.log('📁 Scanning file structure...');
        
        const scanDirectory = (dirPath, category = 'unknown') => {
            const items = fs.readdirSync(dirPath, { withFileTypes: true });
            
            for (const item of items) {
                const fullPath = path.join(dirPath, item.name);
                const relativePath = path.relative(this.rootPath, fullPath);
                
                if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
                    scanDirectory(fullPath, this.categorizeDirectory(item.name));
                } else if (item.isFile()) {
                    this.fileMap.set(relativePath, {
                        name: item.name,
                        extension: path.extname(item.name),
                        category: category,
                        fullPath: fullPath,
                        size: fs.statSync(fullPath).size,
                        lastModified: fs.statSync(fullPath).mtime,
                        analyzed: false
                    });
                }
            }
        };
        
        scanDirectory(this.rootPath, 'root');
        console.log(`📊 Found ${this.fileMap.size} files`);
    }

    categorizeDirectory(dirName) {
        const categoryMap = {
            'handouts': 'educational-content',
            'units': 'educational-content', 
            'lesson-plans': 'educational-content',
            'games': 'interactive',
            'css': 'styling',
            'js': 'functionality',  
            'agents': 'mcp-framework',
            'docs': 'documentation',
            'assessment-frameworks': 'assessment',
            'logs': 'system'
        };
        
        return categoryMap[dirName] || 'general';
    }

    async analyzeDependencies() {
        console.log('🔗 Analyzing file dependencies...');
        
        for (const [filePath, fileInfo] of this.fileMap) {
            if (fileInfo.extension === '.html') {
                const dependencies = await this.extractHtmlDependencies(fileInfo.fullPath);
                this.dependencyGraph.set(filePath, dependencies);
            }
        }
    }

    async extractHtmlDependencies(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const dependencies = {
                css: [],
                js: [],
                links: [],
                images: [],
                usesSharedComponents: false,
                usesMainCSS: false
            };

            // Extract CSS dependencies
            const cssMatches = content.match(/href=["']([^"']*\.css[^"']*)["']/g) || [];
            dependencies.css = cssMatches.map(match => match.match(/href=["']([^"']*)["']/)[1]);
            
            // Extract JS dependencies  
            const jsMatches = content.match(/src=["']([^"']*\.js[^"']*)["']/g) || [];
            dependencies.js = jsMatches.map(match => match.match(/src=["']([^"']*)["']/)[1]);
            
            // Check for refactoring markers
            dependencies.usesSharedComponents = content.includes('shared-components.js');
            dependencies.usesMainCSS = content.includes('main.css');
            dependencies.isRefactored = dependencies.usesSharedComponents && dependencies.usesMainCSS;
            
            // Check cultural elements
            dependencies.hasCulturalElements = content.includes('whakataukii') || 
                                             content.includes('cultural-header') ||
                                             content.includes('Te Ao Māori');
            
            return dependencies;
        } catch (error) {
            console.warn(`⚠️  Could not analyze ${filePath}: ${error.message}`);
            return { error: error.message };
        }
    }

    async assessRefactoringStatus() {
        console.log('🔄 Assessing refactoring status...');
        
        for (const [filePath, fileInfo] of this.fileMap) {
            if (fileInfo.extension === '.html' && fileInfo.category === 'educational-content') {
                const dependencies = this.dependencyGraph.get(filePath);
                
                if (dependencies && !dependencies.error) {
                    let status = 'not-started';
                    let priority = 'low';
                    
                    if (dependencies.isRefactored) {
                        status = 'completed';
                    } else if (dependencies.usesMainCSS || dependencies.usesSharedComponents) {
                        status = 'partial';
                        priority = 'medium';
                    } else if (filePath.includes('handouts/') || filePath.includes('units/')) {
                        priority = 'high';
                    }
                    
                    this.refactoringStatus.set(filePath, {
                        status: status,
                        priority: priority,
                        needsSharedComponents: !dependencies.usesSharedComponents,
                        needsMainCSS: !dependencies.usesMainCSS,
                        hasCulturalElements: dependencies.hasCulturalElements
                    });
                }
            }
        }
    }

    async validateCulturalAuthenticity() {
        console.log('🌿 Validating cultural authenticity...');
        
        for (const [filePath, fileInfo] of this.fileMap) {
            if (this.requiresCulturalValidation(filePath, fileInfo)) {
                const validation = await this.assessCulturalContent(fileInfo.fullPath);
                this.culturalValidation.set(filePath, validation);
            }
        }
    }

    requiresCulturalValidation(filePath, fileInfo) {
        const culturalKeywords = ['maori', 'te-reo', 'iwi', 'treaty', 'tangata-whenua', 'matauranga'];
        const pathLower = filePath.toLowerCase();
        
        return culturalKeywords.some(keyword => pathLower.includes(keyword)) ||
               (fileInfo.category === 'educational-content' && fileInfo.extension === '.html');
    }

    async assessCulturalContent(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8').toLowerCase();
            
            return {
                hasWhakataukii: content.includes('whakataukii') || content.includes('whakatauki'),
                hasTeReoElements: content.includes('māori') || content.includes('maori'),
                hasCulturalContext: content.includes('te ao māori') || content.includes('cultural-note'),
                needsValidation: content.includes('māori') || content.includes('iwi') || content.includes('treaty'),
                agentRequired: 'LF_Te_Ao_Māori'
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    async mapMCPAgentRequirements() {
        console.log('🤖 Mapping MCP agent requirements...');
        
        const agentSpecializations = {
            'LF_Te_Ao_Māori': ['maori', 'iwi', 'te-reo', 'cultural', 'treaty'],
            'Kaiako_STEM': ['science', 'mathematics', 'technology', 'engineering'],
            'LF_SocialSciences': ['history', 'economics', 'social-studies', 'justice'],
            'Kaiako_Digital_Technologies': ['ai', 'digital', 'prompt-engineering', 'llm'],
            'UX_Designer': ['games', 'interactive', 'user-experience'],
            'Content_Creator': ['handouts', 'lessons', 'activities']
        };
        
        for (const [filePath, fileInfo] of this.fileMap) {
            const requiredAgents = [];
            const pathLower = filePath.toLowerCase();
            
            for (const [agent, keywords] of Object.entries(agentSpecializations)) {
                if (keywords.some(keyword => pathLower.includes(keyword))) {
                    requiredAgents.push(agent);
                }
            }
            
            if (requiredAgents.length > 0) {
                this.mcpAgentAssignments.set(filePath, {
                    primaryAgent: requiredAgents[0],
                    supportingAgents: requiredAgents.slice(1),
                    validationRequired: this.culturalValidation.has(filePath)
                });
            }
        }
    }

    generateReport() {
        console.log('📋 Generating comprehensive report...');
        
        const report = {
            timestamp: new Date().toISOString(),
            summary: this.generateSummary(),
            refactoringPriorities: this.getRefactoringPriorities(),
            culturalValidationNeeded: this.getCulturalValidationNeeded(),
            agentWorkload: this.getAgentWorkload(),
            filesByCategory: this.getFilesByCategory(),
            recommendations: this.generateRecommendations()
        };
        
        // Save report to file
        const reportPath = path.join(this.rootPath, 'CODEBASE_CONTEXT_REPORT.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        
        console.log(`✅ Report saved to: ${reportPath}`);
        return report;
    }

    generateSummary() {
        const totalFiles = this.fileMap.size;
        const htmlFiles = Array.from(this.fileMap.values()).filter(f => f.extension === '.html').length;
        const refactoredFiles = Array.from(this.refactoringStatus.values()).filter(s => s.status === 'completed').length;
        const culturalFiles = this.culturalValidation.size;
        
        return {
            totalFiles,
            htmlFiles,
            refactoredFiles,
            refactoringProgress: `${refactoredFiles}/${htmlFiles} (${Math.round(refactoredFiles/htmlFiles*100)}%)`,
            culturalFiles,
            lastAnalyzed: new Date().toISOString()
        };
    }

    getRefactoringPriorities() {
        const priorities = { high: [], medium: [], low: [] };
        
        for (const [filePath, status] of this.refactoringStatus) {
            if (status.status !== 'completed') {
                priorities[status.priority].push({
                    file: filePath,
                    status: status.status,
                    needsSharedComponents: status.needsSharedComponents,
                    needsMainCSS: status.needsMainCSS
                });
            }
        }
        
        return priorities;
    }

    getCulturalValidationNeeded() {
        const validationNeeded = [];
        
        for (const [filePath, validation] of this.culturalValidation) {
            if (validation.needsValidation && !validation.error) {
                validationNeeded.push({
                    file: filePath,
                    hasWhakataukii: validation.hasWhakataukii,
                    hasCulturalContext: validation.hasCulturalContext,
                    agentRequired: validation.agentRequired
                });
            }
        }
        
        return validationNeeded;
    }

    getAgentWorkload() {
        const workload = {};
        
        for (const [filePath, assignment] of this.mcpAgentAssignments) {
            const agent = assignment.primaryAgent;
            if (!workload[agent]) {
                workload[agent] = { files: [], totalFiles: 0 };
            }
            workload[agent].files.push(filePath);
            workload[agent].totalFiles++;
        }
        
        return workload;
    }

    getFilesByCategory() {
        const categories = {};
        
        for (const [filePath, fileInfo] of this.fileMap) {
            if (!categories[fileInfo.category]) {
                categories[fileInfo.category] = [];
            }
            categories[fileInfo.category].push(filePath);
        }
        
        return categories;
    }

    generateRecommendations() {
        const recommendations = [];
        
        // High priority refactoring files
        const highPriorityFiles = Array.from(this.refactoringStatus.entries())
            .filter(([_, status]) => status.priority === 'high' && status.status !== 'completed')
            .length;
        
        if (highPriorityFiles > 0) {
            recommendations.push({
                type: 'refactoring',
                priority: 'high',
                description: `${highPriorityFiles} high-priority files need refactoring to use shared-components.js and main.css`,
                action: 'Focus on handouts/ and units/ directories first'
            });
        }
        
        // Cultural validation needs
        const culturalValidationCount = this.getCulturalValidationNeeded().length;
        if (culturalValidationCount > 0) {
            recommendations.push({
                type: 'cultural-validation',
                priority: 'high',
                description: `${culturalValidationCount} files need cultural authenticity validation`,
                action: 'Coordinate with LF_Te_Ao_Māori agent for review'
            });
        }
        
        // Agent coordination
        const agentWorkload = this.getAgentWorkload();
        const overloadedAgents = Object.entries(agentWorkload)
            .filter(([_, workload]) => workload.totalFiles > 20);
        
        if (overloadedAgents.length > 0) {
            recommendations.push({
                type: 'agent-coordination',
                priority: 'medium',
                description: 'Some agents have high workloads',
                action: 'Consider distributing work or prioritizing most critical files'
            });
        }
        
        return recommendations;
    }
}

// Usage example
async function analyzeTeKeteAko() {
    const mapper = new CodebaseContextMapper(__dirname);
    const report = await mapper.analyzeCodebase();
    
    console.log('\n=== TE KETE AKO CODEBASE ANALYSIS ===');
    console.log(`📊 Total files: ${report.summary.totalFiles}`);
    console.log(`🔄 Refactoring progress: ${report.summary.refactoringProgress}`);
    console.log(`🌿 Cultural files: ${report.summary.culturalFiles}`);
    console.log(`\n🎯 High priority refactoring: ${report.refactoringPriorities.high.length} files`);
    console.log(`🤖 Agent assignments: ${Object.keys(report.agentWorkload).length} agents involved`);
    
    return report;
}

// Export for use by other tools
module.exports = { CodebaseContextMapper, analyzeTeKeteAko };

// Run analysis if called directly
if (require.main === module) {
    analyzeTeKeteAko().catch(console.error);
}