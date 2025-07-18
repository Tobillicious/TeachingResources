/**
 * Related Resources System
 * Provides smart recommendations for educational handouts based on theme and subject area
 */

// Resource metadata with categories and tags for smart matching
const RESOURCE_METADATA = {
    // Writing Toolkit Resources
    'writers-toolkit-hook-handout.html': {
        title: 'The Writer\'s Toolkit: The Hook',
        category: 'Writing Toolkit',
        tags: ['writing', 'hooks', 'introductions', 'persuasive', 'narrative'],
        description: 'Crafting engaging introductions'
    },
    'writers-toolkit-analogy-handout.html': {
        title: 'The Writer\'s Toolkit: Analogy',
        category: 'Writing Toolkit', 
        tags: ['writing', 'analogy', 'comparison', 'explanation'],
        description: 'Using analogies to explain complex ideas'
    },
    'writers-toolkit-conclusion-handout.html': {
        title: 'The Writer\'s Toolkit: Conclusion',
        category: 'Writing Toolkit',
        tags: ['writing', 'conclusions', 'endings', 'persuasive'],
        description: 'Writing powerful conclusions'
    },
    'writers-toolkit-diction-handout.html': {
        title: 'The Writer\'s Toolkit: Diction',
        category: 'Writing Toolkit',
        tags: ['writing', 'diction', 'word-choice', 'style'],
        description: 'Choosing the right words'
    },
    'writers-toolkit-fluency-handout.html': {
        title: 'The Writer\'s Toolkit: Fluency',
        category: 'Writing Toolkit',
        tags: ['writing', 'fluency', 'flow', 'sentence-structure'],
        description: 'Creating smooth, flowing prose'
    },
    'writers-toolkit-inform-structure-handout.html': {
        title: 'The Writer\'s Toolkit: Inform Structure',
        category: 'Writing Toolkit',
        tags: ['writing', 'structure', 'informative', 'organization'],
        description: 'Structuring informative writing'
    },
    'writers-toolkit-peel-argument-handout.html': {
        title: 'The Writer\'s Toolkit: PEEL Argument',
        category: 'Writing Toolkit',
        tags: ['writing', 'argument', 'persuasive', 'structure', 'peel'],
        description: 'Building strong arguments with PEEL'
    },
    'writers-toolkit-revision-handout.html': {
        title: 'The Writer\'s Toolkit: Revision',
        category: 'Writing Toolkit',
        tags: ['writing', 'revision', 'editing', 'improvement'],
        description: 'Effective revision strategies'
    },
    'writers-toolkit-rhetorical-devices-handout.html': {
        title: 'The Writer\'s Toolkit: Rhetorical Devices',
        category: 'Writing Toolkit',
        tags: ['writing', 'rhetorical-devices', 'persuasive', 'techniques'],
        description: 'Using rhetorical devices effectively'
    },
    'writers-toolkit-show-dont-tell-handout.html': {
        title: 'The Writer\'s Toolkit: Show Don\'t Tell',
        category: 'Writing Toolkit',
        tags: ['writing', 'show-dont-tell', 'descriptive', 'narrative'],
        description: 'Creating vivid descriptions'
    },
    'writers-toolkit-suspense-handout.html': {
        title: 'The Writer\'s Toolkit: Suspense',
        category: 'Writing Toolkit',
        tags: ['writing', 'suspense', 'tension', 'narrative'],
        description: 'Building suspense in writing'
    },

    // Author's Purpose Resources
    'authors-purpose-handout.html': {
        title: 'Author\'s Purpose: Overview',
        category: 'Author\'s Purpose',
        tags: ['authors-purpose', 'analysis', 'inform', 'persuade', 'entertain'],
        description: 'Understanding why authors write'
    },
    'authors-purpose-entertain-handout.html': {
        title: 'Author\'s Purpose: Entertain',
        category: 'Author\'s Purpose',
        tags: ['authors-purpose', 'entertain', 'narrative', 'humor'],
        description: 'How authors entertain readers'
    },
    'authors-purpose-inform-handout.html': {
        title: 'Author\'s Purpose: Inform',
        category: 'Author\'s Purpose',
        tags: ['authors-purpose', 'inform', 'facts', 'explanation'],
        description: 'How authors inform readers'
    },
    'authors-purpose-persuade-handout.html': {
        title: 'Author\'s Purpose: Persuade',
        category: 'Author\'s Purpose',
        tags: ['authors-purpose', 'persuade', 'argument', 'opinion'],
        description: 'How authors persuade readers'
    },

    // Math & Statistics Resources
    'bar-graph-handout.html': {
        title: 'Bar Graph Analysis',
        category: 'Mathematics',
        tags: ['math', 'statistics', 'graphs', 'data-analysis', 'bar-graphs'],
        description: 'Interpreting and analyzing bar graphs'
    },
    'probability-handout.html': {
        title: 'Probability',
        category: 'Mathematics', 
        tags: ['math', 'probability', 'statistics', 'chance'],
        description: 'Understanding probability concepts'
    },
    'statistical-investigation-handout.html': {
        title: 'Statistical Investigation',
        category: 'Mathematics',
        tags: ['math', 'statistics', 'investigation', 'data-collection'],
        description: 'Conducting statistical investigations'
    },
    'misleading-graphs-comprehension-handout.html': {
        title: 'Misleading Graphs',
        category: 'Mathematics',
        tags: ['math', 'statistics', 'graphs', 'critical-thinking', 'bias'],
        description: 'Identifying misleading statistical presentations'
    },

    // Science Resources
    'science-of-sleep-comprehension-handout.html': {
        title: 'The Science of Sleep',
        category: 'Science',
        tags: ['science', 'biology', 'sleep', 'health', 'brain'],
        description: 'Understanding sleep and brain function'
    },
    'scientific-method-handout.html': {
        title: 'The Scientific Method',
        category: 'Science',
        tags: ['science', 'scientific-method', 'investigation', 'hypothesis'],
        description: 'Understanding scientific inquiry'
    },
    'plate-tectonics-comprehension-handout.html': {
        title: 'Plate Tectonics',
        category: 'Science',
        tags: ['science', 'geology', 'earth-science', 'plate-tectonics'],
        description: 'Understanding Earth\'s moving plates'
    },
    'genetic-modification-comprehension-handout.html': {
        title: 'Genetic Modification',
        category: 'Science',
        tags: ['science', 'biology', 'genetics', 'biotechnology'],
        description: 'Understanding genetic modification'
    },
    'microplastics-comprehension-handout.html': {
        title: 'Microplastics',
        category: 'Science',
        tags: ['science', 'environment', 'pollution', 'microplastics'],
        description: 'Environmental impact of microplastics'
    },

    // Technology & Digital Literacy
    'ai-art-ethics-comprehension-handout.html': {
        title: 'AI Art Ethics',
        category: 'Technology',
        tags: ['technology', 'ai', 'ethics', 'art', 'digital'],
        description: 'Ethical considerations in AI-generated art'
    },
    'ai-impact-comprehension-handout.html': {
        title: 'AI Impact',
        category: 'Technology',
        tags: ['technology', 'ai', 'society', 'impact', 'future'],
        description: 'The impact of AI on society'
    },
    'digital-citizenship-handout.html': {
        title: 'Digital Citizenship',
        category: 'Technology',
        tags: ['technology', 'digital-citizenship', 'internet', 'safety'],
        description: 'Being a responsible digital citizen'
    },

    // Media & Analysis
    'media-literacy-comprehension-handout.html': {
        title: 'Media Literacy',
        category: 'Media Analysis',
        tags: ['media', 'literacy', 'critical-thinking', 'analysis'],
        description: 'Understanding and analyzing media'
    },
    'film-scene-analysis-handout.html': {
        title: 'Film Scene Analysis',
        category: 'Media Analysis',
        tags: ['media', 'film', 'analysis', 'techniques'],
        description: 'Analyzing film techniques and scenes'
    },
    'political-cartoon-analysis-handout.html': {
        title: 'Political Cartoon Analysis',
        category: 'Media Analysis',
        tags: ['media', 'political', 'cartoon', 'analysis', 'satire'],
        description: 'Understanding political cartoons'
    },
    'speech-analysis-handout.html': {
        title: 'Speech Analysis',
        category: 'Media Analysis',
        tags: ['media', 'speech', 'analysis', 'rhetoric'],
        description: 'Analyzing speeches and rhetoric'
    },

    // Social Issues & Comprehension
    'cognitive-biases-comprehension-handout.html': {
        title: 'Cognitive Biases',
        category: 'Critical Thinking',
        tags: ['psychology', 'critical-thinking', 'bias', 'decision-making'],
        description: 'Understanding cognitive biases'
    },
    'youth-vaping-comprehension-handout.html': {
        title: 'Youth Vaping',
        category: 'Health & Society',
        tags: ['health', 'society', 'youth', 'vaping', 'public-health'],
        description: 'Understanding youth vaping issues'
    },
    'housing-affordability-comprehension-handout.html': {
        title: 'Housing Affordability',
        category: 'Social Issues',
        tags: ['society', 'economics', 'housing', 'affordability'],
        description: 'Housing affordability challenges'
    },
    'gig-economy-comprehension-handout.html': {
        title: 'The Gig Economy',
        category: 'Economics',
        tags: ['economics', 'work', 'gig-economy', 'employment'],
        description: 'Understanding the gig economy'
    },
    'financial-literacy-comprehension-handout.html': {
        title: 'Financial Literacy',
        category: 'Economics',
        tags: ['economics', 'finance', 'literacy', 'money-management'],
        description: 'Essential financial literacy skills'
    },

    // Cultural & Historical
    'dawn-raids-comprehension-handout.html': {
        title: 'The Dawn Raids',
        category: 'New Zealand History',
        tags: ['history', 'new-zealand', 'pacific', 'immigration'],
        description: 'Understanding the Dawn Raids'
    },
    'treaty-of-waitangi-handout.html': {
        title: 'The Treaty of Waitangi',
        category: 'New Zealand History',
        tags: ['history', 'new-zealand', 'treaty', 'maori'],
        description: 'Understanding New Zealand\'s founding document'
    },
    'te-reo-maori-greetings-handout.html': {
        title: 'Te Reo Māori Greetings',
        category: 'Language & Culture',
        tags: ['language', 'maori', 'culture', 'greetings'],
        description: 'Learning Māori greetings'
    },
    'haka-comprehension-handout.html': {
        title: 'The Role of Haka',
        category: 'Language & Culture',
        tags: ['culture', 'maori', 'haka', 'tradition'],
        description: 'Understanding the significance of haka'
    },

    // Arts & Literature
    'shakespeare-soliloquy-handout.html': {
        title: 'Shakespearean Soliloquy',
        category: 'Literature',
        tags: ['literature', 'shakespeare', 'soliloquy', 'drama'],
        description: 'Understanding Shakespearean soliloquies'
    },
    'figurative-language-handout.html': {
        title: 'Figurative Language',
        category: 'Literature',
        tags: ['literature', 'figurative-language', 'metaphor', 'symbolism'],
        description: 'Understanding figurative language'
    },
    'elements-of-art-handout.html': {
        title: 'Elements of Art',
        category: 'Arts',
        tags: ['art', 'visual-arts', 'elements', 'design'],
        description: 'Understanding the elements of art'
    },

    // Design & Innovation
    'design-thinking-process-handout.html': {
        title: 'Design Thinking Process',
        category: 'Design',
        tags: ['design', 'innovation', 'problem-solving', 'creativity'],
        description: 'Understanding the design thinking process'
    },
    'future-of-tourism-comprehension-handout.html': {
        title: 'Future of Tourism',
        category: 'Social Issues',
        tags: ['society', 'tourism', 'sustainability', 'environment'],
        description: 'Tourism and sustainability challenges'
    }
};

/**
 * Get related resources for a given handout
 * @param {string} currentFile - The filename of the current handout
 * @param {number} maxResults - Maximum number of related resources to return (default: 4)
 * @returns {Array} Array of related resource objects
 */
function getRelatedResources(currentFile, maxResults = 4) {
    const current = RESOURCE_METADATA[currentFile];
    if (!current) return [];

    const related = [];
    
    // Calculate relevance scores for other resources
    for (const [filename, resource] of Object.entries(RESOURCE_METADATA)) {
        if (filename === currentFile) continue;
        
        let score = 0;
        
        // Same category gets high score
        if (resource.category === current.category) {
            score += 10;
        }
        
        // Shared tags get points
        const sharedTags = resource.tags.filter(tag => current.tags.includes(tag));
        score += sharedTags.length * 3;
        
        // Related categories get bonus points
        const categoryRelations = {
            'Writing Toolkit': ['Author\'s Purpose', 'Literature', 'Media Analysis'],
            'Author\'s Purpose': ['Writing Toolkit', 'Literature', 'Media Analysis'],
            'Mathematics': ['Science', 'Critical Thinking'],
            'Science': ['Mathematics', 'Health & Society', 'Technology'],
            'Technology': ['Science', 'Media Analysis', 'Critical Thinking'],
            'Media Analysis': ['Writing Toolkit', 'Technology', 'Critical Thinking'],
            'Critical Thinking': ['Media Analysis', 'Mathematics', 'Technology'],
            'New Zealand History': ['Language & Culture'],
            'Language & Culture': ['New Zealand History', 'Literature']
        };
        
        if (categoryRelations[current.category]?.includes(resource.category)) {
            score += 2;
        }
        
        if (score > 0) {
            related.push({
                filename,
                title: resource.title,
                category: resource.category,
                description: resource.description,
                score
            });
        }
    }
    
    // Sort by score and return top results
    return related
        .sort((a, b) => b.score - a.score)
        .slice(0, maxResults);
}

/**
 * Generate HTML for the related resources sidebar
 * @param {string} currentFile - The filename of the current handout
 * @returns {string} HTML string for the sidebar
 */
function generateRelatedResourcesHTML(currentFile) {
    const relatedResources = getRelatedResources(currentFile);
    
    if (relatedResources.length === 0) {
        return '';
    }
    
    let html = `
        <div id="related-resources-sidebar" class="related-resources-sidebar">
            <h3 class="sidebar-title">Related Resources</h3>
            <div class="sidebar-content">
    `;
    
    relatedResources.forEach(resource => {
        html += `
            <div class="resource-item">
                <a href="${resource.filename}" class="resource-link">
                    <div class="resource-title">${resource.title}</div>
                    <div class="resource-category">${resource.category}</div>
                    <div class="resource-description">${resource.description}</div>
                </a>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    return html;
}

/**
 * Get CSS styles for the related resources sidebar
 * @returns {string} CSS string for sidebar styling
 */
function getRelatedResourcesCSS() {
    return `
        <style>
        .related-resources-sidebar {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 280px;
            max-height: calc(100vh - 40px);
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            border: 1px solid #e5e7eb;
            overflow: hidden;
            z-index: 1000;
            font-family: 'Inter', sans-serif;
        }
        
        .sidebar-title {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            margin: 0;
            padding: 16px 20px;
            font-size: 16px;
            font-weight: 600;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .sidebar-content {
            max-height: calc(100vh - 120px);
            overflow-y: auto;
            padding: 8px;
        }
        
        .resource-item {
            margin-bottom: 8px;
            border-radius: 8px;
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .resource-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .resource-item:last-child {
            margin-bottom: 0;
        }
        
        .resource-link {
            display: block;
            text-decoration: none;
            padding: 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            transition: background-color 0.2s;
        }
        
        .resource-link:hover {
            background: #e2e8f0;
        }
        
        .resource-title {
            font-weight: 600;
            color: #1e293b;
            font-size: 13px;
            line-height: 1.3;
            margin-bottom: 4px;
        }
        
        .resource-category {
            font-size: 11px;
            color: #3b82f6;
            font-weight: 500;
            margin-bottom: 4px;
        }
        
        .resource-description {
            font-size: 11px;
            color: #64748b;
            line-height: 1.3;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 1024px) {
            .related-resources-sidebar {
                position: relative;
                top: auto;
                right: auto;
                width: 100%;
                max-width: none;
                margin: 20px 0;
                max-height: none;
            }
            
            .sidebar-content {
                max-height: none;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 8px;
                padding: 16px;
            }
            
            .resource-item {
                margin-bottom: 0;
            }
        }
        
        @media (max-width: 768px) {
            .sidebar-content {
                grid-template-columns: 1fr;
            }
        }
        
        /* Print styles - hide sidebar when printing */
        @media print {
            .related-resources-sidebar {
                display: none !important;
            }
        }
        </style>
    `;
}

/**
 * Initialize the related resources sidebar for a handout page
 * Call this function in the handout HTML with the current filename
 * @param {string} currentFile - The filename of the current handout
 */
function initRelatedResources(currentFile) {
    // Add CSS styles to the head
    const css = getRelatedResourcesCSS();
    document.head.insertAdjacentHTML('beforeend', css);
    
    // Generate and insert the sidebar HTML
    const sidebarHTML = generateRelatedResourcesHTML(currentFile);
    if (sidebarHTML) {
        document.body.insertAdjacentHTML('beforeend', sidebarHTML);
    }
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        RESOURCE_METADATA,
        getRelatedResources,
        generateRelatedResourcesHTML,
        getRelatedResourcesCSS,
        initRelatedResources
    };
}