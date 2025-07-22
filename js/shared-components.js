/**
 * =================================================================
 * SHARED COMPONENTS - Te Kete Ako Platform Core Functionality
 * =================================================================
 * 
 * PURPOSE: Central JavaScript module providing common functionality
 * across all pages of the educational platform. Handles navigation,
 * recommended reading integration, and utility functions.
 * 
 * ARCHITECTURE:
 * - Educational content recommendations by topic
 * - Dynamic DOM manipulation for enhanced UX
 * - Print-optimized functionality
 * - Cultural integration (Te Ao Māori elements)
 * 
 * FOR AI AGENTS:
 * - This file is imported by most pages via <script src="../js/shared-components.js">
 * - Key integration points: initRelatedResources(), auto-init system
 * - Cultural sensitivity: Maintains bilingual content throughout
 * - Performance: Lightweight, minimal dependencies
 * 
 * USAGE PATTERN:
 * Pages include data attributes like data-reading-topic="[topic]"
 * which automatically populate relevant educational resources
 * 
 * =================================================================
 */

// Educational book recommendations organized by topic
const RECOMMENDED_READING = {
    'authors-purpose': [
        {
            title: "They Say / I Say: The Moves That Matter in Academic Writing",
            authors: "Gerald Graff & Cathy Birkenstein",
            type: "book",
            description: "Essential guide to understanding how authors structure arguments and present their purposes in academic writing.",
            link: "https://wwnorton.com/books/9780393538700"
        },
        {
            title: "Reading Like a Writer",
            authors: "Francine Prose",
            type: "book", 
            description: "Explores how understanding an author's purpose can transform your own writing and critical reading skills.",
            link: "https://www.harpercollins.com/products/reading-like-a-writer-francine-prose"
        },
        {
            title: "The Elements of Persuasion",
            authors: "Richard Maxwell & Robert Dickman",
            type: "article",
            description: "Harvard Business Review article on the fundamental elements that make persuasive communication effective.",
            link: "https://hbr.org/2007/05/the-elements-of-persuasion"
        }
    ],
    'writing-techniques': [
        {
            title: "The Sense of Style: The Thinking Person's Guide to Writing",
            authors: "Steven Pinker",
            type: "book",
            description: "Modern approach to clear, effective writing with practical techniques for improving style and clarity.",
            link: "https://stevenpinker.com/publications/sense-style-thinking-persons-guide-writing-21st-century"
        },
        {
            title: "Bird by Bird: Some Instructions on Writing and Life",
            authors: "Anne Lamott",
            type: "book",
            description: "Beloved guide to the writing process, including techniques for developing voice, revision, and storytelling.",
            link: "https://www.penguinrandomhouse.com/books/97439/bird-by-bird-by-anne-lamott/"
        },
        {
            title: "Writing to Learn",
            authors: "William Zinsser",
            type: "book",
            description: "Explores how writing can be used as a tool for learning and understanding complex subjects.",
            link: "https://www.harpercollins.com/products/writing-to-learn-william-zinsser"
        }
    ],
    'critical-thinking': [
        {
            title: "Thinking, Fast and Slow",
            authors: "Daniel Kahneman",
            type: "book",
            description: "Essential reading on cognitive biases and decision-making processes that affect how we interpret information.",
            link: "https://us.macmillan.com/books/9780374533557/thinkingfastandslow"
        },
        {
            title: "The Art of Thinking Clearly",
            authors: "Rolf Dobelli",
            type: "book",
            description: "Practical guide to recognizing and avoiding common thinking errors and cognitive biases.",
            link: "https://www.harpercollins.com/products/the-art-of-thinking-clearly-rolf-dobelli"
        },
        {
            title: "Critical Thinking: An Introduction",
            authors: "Alec Fisher",
            type: "book",
            description: "Comprehensive introduction to critical thinking skills for students and educators.",
            link: "https://www.cambridge.org/core/books/critical-thinking/8B4D2E1F1B4F5C2A3E6D9F8B1A2C3D4E"
        }
    ],
    'media-literacy': [
        {
            title: "The Filter Bubble",
            authors: "Eli Pariser",
            type: "book",
            description: "Explores how personalized web content affects our understanding of the world and information literacy.",
            link: "https://www.penguinrandomhouse.com/books/309832/the-filter-bubble-by-eli-pariser/"
        },
        {
            title: "News Literacy Project",
            authors: "Various",
            type: "resource",
            description: "Comprehensive online resources for developing media literacy skills and evaluating news sources.",
            link: "https://newslit.org/"
        },
        {
            title: "Made to Stick",
            authors: "Chip Heath & Dan Heath",
            type: "book",
            description: "Why some ideas survive and others die - essential for understanding how media messages are crafted.",
            link: "https://heathbrothers.com/books/made-to-stick/"
        }
    ],
    'new-zealand-context': [
        {
            title: "The Penguin History of New Zealand",
            authors: "Michael King",
            type: "book",
            description: "Comprehensive overview of New Zealand history providing context for understanding contemporary issues.",
            link: "https://www.penguin.co.nz/books/the-penguin-history-of-new-zealand-9780143019664"
        },
        {
            title: "New Zealand History Online",
            authors: "Ministry for Culture and Heritage",
            type: "resource",
            description: "Government resource with articles, primary sources, and educational materials on NZ history.",
            link: "https://nzhistory.govt.nz/"
        },
        {
            title: "Being Pākehā Now",
            authors: "Joanna Kidman",
            type: "book",
            description: "Explores contemporary identity and cultural understanding in New Zealand's bicultural context.",
            link: "https://www.aucklanduniversitypress.co.nz/books-and-journals/books/being-pakehe-now/"
        }
    ],
    'science-literacy': [
        {
            title: "The Demon-Haunted World",
            authors: "Carl Sagan",
            type: "book",
            description: "Classic guide to scientific thinking and skepticism, essential for understanding science communication.",
            link: "https://www.penguinrandomhouse.com/books/153079/the-demon-haunted-world-by-carl-sagan/"
        },
        {
            title: "Bad Science",
            authors: "Ben Goldacre",
            type: "book",
            description: "Engaging examination of how science is misrepresented in media and the importance of scientific literacy.",
            link: "https://www.harpercollins.com/products/bad-science-ben-goldacre"
        },
        {
            title: "Science Media Centre",
            authors: "Various",
            type: "resource",
            description: "New Zealand resource for understanding how science is reported and communicated to the public.",
            link: "https://www.sciencemediacentre.co.nz/"
        }
    ]
};

/**
 * Generate site navigation HTML
 * @param {string} currentPage - Current page identifier for highlighting active nav item
 * @returns {string} Navigation HTML
 */
function generateNavigation(currentPage = '') {
    const navItems = [
        { id: 'home', text: 'Unit Hub', href: 'index.html' },
        { id: 'handouts', text: 'Handouts', href: 'handouts.html' },
        { id: 'lessons', text: 'Lessons', href: 'lesson-plans/lessons.html' },
        { id: 'toolkit', text: 'Writer\'s Toolkit', href: 'toolkit.html' },
        { id: 'project', text: 'Project', href: 'project/project-brief.html' }
    ];

    const navLinks = navItems.map(item => 
        `<li><a href="${item.href}" class="nav-link ${currentPage === item.id ? 'active' : ''}">${item.text}</a></li>`
    ).join('');

    return `
        <nav class="site-nav">
            <div class="nav-container">
                <a href="index.html" class="nav-brand">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Te Kete Ako
                </a>
                <button class="mobile-menu-toggle" aria-label="Toggle mobile menu">☰</button>
                <ul class="nav-links">
                    ${navLinks}
                </ul>
            </div>
        </nav>
    `;
}

/**
 * Generate recommended reading section based on topic
 * @param {string} topic - Topic key for recommended reading
 * @param {number} maxItems - Maximum number of items to show (default: 3)
 * @returns {string} Recommended reading HTML
 */
function generateRecommendedReading(topic, maxItems = 3) {
    const readings = RECOMMENDED_READING[topic];
    if (!readings || readings.length === 0) {
        return '';
    }

    const readingItems = readings.slice(0, maxItems).map(item => `
        <div class="reading-item">
            <h4>${item.title}</h4>
            <p><strong>By:</strong> ${item.authors}</p>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="reading-link">
                ${item.type === 'book' ? 'View Book' : item.type === 'article' ? 'Read Article' : 'Explore Resource'} →
            </a>
        </div>
    `).join('');

    return `
        <div class="recommended-reading no-print">
            <h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zM3 18.5V7c1.1-.35 2.3-.5 3.5-.5 1.34 0 3.13.41 4.5.99v11.5C9.63 18.41 7.84 18 6.5 18c-1.2 0-2.4.15-3.5.5z"/>
                </svg>
                Recommended Reading
            </h3>
            <p>Deepen your understanding with these carefully selected educational resources:</p>
            <div class="reading-list">
                ${readingItems}
            </div>
        </div>
    `;
}

/**
 * Get breadcrumb path based on current page
 * @param {string} currentPath - Current file path or page identifier
 * @returns {string} Breadcrumb HTML
 */
function generateBreadcrumb(currentPath) {
    const pathMap = {
        'handouts.html': '← Back to Unit Hub',
        'toolkit.html': '← Back to Unit Hub',
        'lessons.html': '← Back to Unit Hub',
        'project-brief.html': '← Back to Unit Hub',
        'handout': '← Back to Handouts',
        'lesson': '← Back to Lessons',
        'toolkit-item': '← Back to Writer\'s Toolkit'
    };

    const linkMap = {
        'handouts.html': 'index.html',
        'toolkit.html': 'index.html',
        'lessons.html': '../index.html',
        'project-brief.html': '../index.html',
        'handout': '../handouts.html',
        'lesson': 'lessons.html',
        'toolkit-item': '../toolkit.html'
    };

    const text = pathMap[currentPath] || '← Back to Unit Hub';
    const link = linkMap[currentPath] || 'index.html';

    return `<a href="${link}" class="breadcrumb">${text}</a>`;
}

/**
 * Initialize mobile menu functionality with enhanced keyboard navigation
 */
function initializeMobileMenu() {
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (toggleButton && navLinks) {
        // Mobile menu toggle
        toggleButton.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('mobile-open');
            toggleButton.setAttribute('aria-expanded', isOpen);
            toggleButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            
            // Focus management
            if (isOpen && navItems.length > 0) {
                navItems[0].focus();
            }
        });

        // Keyboard navigation within menu
        navItems.forEach((item, index) => {
            item.addEventListener('keydown', function(event) {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    const nextIndex = (index + 1) % navItems.length;
                    navItems[nextIndex].focus();
                } else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    const prevIndex = (index - 1 + navItems.length) % navItems.length;
                    navItems[prevIndex].focus();
                } else if (event.key === 'Home') {
                    event.preventDefault();
                    navItems[0].focus();
                } else if (event.key === 'End') {
                    event.preventDefault();
                    navItems[navItems.length - 1].focus();
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.site-nav')) {
                navLinks.classList.remove('mobile-open');
                toggleButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                navLinks.classList.remove('mobile-open');
                toggleButton.setAttribute('aria-expanded', 'false');
                toggleButton.focus();
            }
        });
    }

    // Skip to main content functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if not present
    const mainContent = document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('tabindex', '-1');
    }
}

/**
 * Initialize shared components on page load
 * @param {Object} options - Configuration options
 * @param {string} options.currentPage - Current page identifier
 * @param {string} options.readingTopic - Topic for recommended reading
 * @param {string} options.breadcrumbPath - Path for breadcrumb navigation
 */
function initializeSharedComponents(options = {}) {
    const {
        currentPage = '',
        readingTopic = '',
        breadcrumbPath = ''
    } = options;

    // Add navigation to the top of the body only if no existing site-header is found
    const existingHeader = document.querySelector('.site-header');
    if (!existingHeader) {
        const navigation = generateNavigation(currentPage);
        document.body.insertAdjacentHTML('afterbegin', navigation);
    }

    // Add breadcrumb if specified
    if (breadcrumbPath) {
        const breadcrumb = generateBreadcrumb(breadcrumbPath);
        const headerContent = document.querySelector('.header-content');
        if (headerContent) {
            headerContent.insertAdjacentHTML('afterbegin', breadcrumb);
        }
    }

    // Add recommended reading if topic specified
    if (readingTopic) {
        const recommendedReading = generateRecommendedReading(readingTopic);
        if (recommendedReading) {
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.insertAdjacentHTML('beforeend', recommendedReading);
            }
        }
    }

    // Initialize mobile menu functionality
    initializeMobileMenu();
    
    // Initialize accessibility features
    initializeAccessibilityFeatures();
    
    // Initialize enhanced keyboard navigation
    initializeKeyboardNavigation();
}

/**
 * Initialize accessibility features
 */
function initializeAccessibilityFeatures() {
    // Add ARIA labels to elements that need them
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach((card, index) => {
        const title = card.querySelector('.resource-title');
        if (title && !card.getAttribute('aria-label')) {
            card.setAttribute('aria-label', `Resource: ${title.textContent}`);
        }
    });
    
    // Add proper heading structure validation
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let currentLevel = 0;
    
    headings.forEach(heading => {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > currentLevel + 1) {
            console.warn(`Heading level skip detected: ${heading.tagName} after h${currentLevel}`);
        }
        currentLevel = level;
    });
    
    // Add focus indicators for keyboard users
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
    
    // Add CSS for keyboard focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-user *:focus {
            outline: 2px solid var(--primary-blue) !important;
            outline-offset: 2px !important;
        }
        
        .skip-link:focus {
            outline: 2px solid white !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize enhanced keyboard navigation
 */
function initializeKeyboardNavigation() {
    // Resource card keyboard navigation
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach((card, index) => {
        const link = card.querySelector('.resource-link');
        if (link) {
            link.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    link.click();
                }
            });
        }
    });
    
    // Enhanced breadcrumb navigation
    const breadcrumbs = document.querySelectorAll('.breadcrumb');
    breadcrumbs.forEach(breadcrumb => {
        breadcrumb.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                breadcrumb.click();
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Alt + H: Go to homepage
        if (event.altKey && event.key === 'h') {
            event.preventDefault();
            window.location.href = '/index.html';
        }
        
        // Alt + M: Focus on main content
        if (event.altKey && event.key === 'm') {
            event.preventDefault();
            const mainContent = document.querySelector('#main-content');
            if (mainContent) {
                mainContent.focus();
                mainContent.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Alt + S: Focus on search (if search exists)
        if (event.altKey && event.key === 's') {
            event.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

/**
 * Utility function to determine reading topic from filename
 * @param {string} filename - Current page filename
 * @returns {string} Reading topic key
 */
function getReadingTopicFromFilename(filename) {
    if (filename.includes('authors-purpose')) return 'authors-purpose';
    if (filename.includes('writers-toolkit')) return 'writing-techniques';
    if (filename.includes('media') || filename.includes('political-cartoon') || filename.includes('film')) return 'media-literacy';
    if (filename.includes('cognitive-biases') || filename.includes('misleading-graphs')) return 'critical-thinking';
    if (filename.includes('treaty') || filename.includes('dawn-raids') || filename.includes('haka') || filename.includes('te-reo')) return 'new-zealand-context';
    if (filename.includes('science') || filename.includes('plate-tectonics') || filename.includes('genetic') || filename.includes('microplastics')) return 'science-literacy';
    return 'critical-thinking'; // Default fallback
}

/**
 * MCP Agent-Enhanced Search and Filtering System
 * Integrates cross-curricular connections and cultural content
 */

// Enhanced search categories based on MCP agent specializations
const MCP_SEARCH_CATEGORIES = {
    'te-ao-maori': {
        agent: 'LF_Te_Ao_Māori',
        label: 'Te Ao Māori',
        keywords: ['maori', 'tikanga', 'whakatoki', 'te-reo', 'iwi', 'hapu', 'whakapapa', 'tangata-whenua'],
        color: '#2e7d32'
    },
    'economic-justice': {
        agent: 'LF_SocialSciences',
        label: 'Economic Justice',
        keywords: ['economic', 'justice', 'capitalism', 'wealth', 'inequality', 'housing', 'gig-economy'],
        color: '#d32f2f'
    },
    'stem-matauranga': {
        agent: 'Kaiako_STEM',
        label: 'STEM + Mātauranga',
        keywords: ['science', 'mathematics', 'traditional-knowledge', 'environmental', 'sustainability'],
        color: '#1976d2'
    },
    'digital-sovereignty': {
        agent: 'UX_Designer',
        label: 'Digital Technologies',
        keywords: ['ai', 'digital', 'data-sovereignty', 'technology', 'llm', 'prompt-engineering'],
        color: '#7b1fa2'
    },
    'literacy-numeracy': {
        agent: 'LF_LiteracyNumeracy',
        label: 'Literacy & Numeracy',
        keywords: ['literacy', 'numeracy', 'reading', 'writing', 'mathematics', 'statistics'],
        color: '#f57c00'
    },
    'arts-expression': {
        agent: 'LF_TheArts',
        label: 'Arts & Expression',
        keywords: ['arts', 'creative', 'performance', 'visual', 'storytelling', 'media'],
        color: '#8e24aa'
    }
};

/**
 * Advanced MCP-powered search function
 * @param {string} query - Search query
 * @param {Array} items - Items to search through
 * @param {Object} options - Search options
 * @returns {Array} Filtered and scored results
 */
function mcpEnhancedSearch(query, items, options = {}) {
    if (!query || !query.trim()) return items;
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 1);
    const results = [];
    
    items.forEach(item => {
        let score = 0;
        let agentMatches = [];
        
        // Title matching (highest weight)
        const titleText = (item.title || '').toLowerCase();
        searchTerms.forEach(term => {
            if (titleText.includes(term)) score += 10;
        });
        
        // Content matching
        const contentText = (item.description || item.content || '').toLowerCase();
        searchTerms.forEach(term => {
            if (contentText.includes(term)) score += 5;
        });
        
        // Data tags matching
        const tags = item.dataset?.tags || item.tags || '';
        const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
        searchTerms.forEach(term => {
            tagArray.forEach(tag => {
                if (tag.includes(term)) score += 8;
            });
        });
        
        // MCP Agent category matching
        Object.entries(MCP_SEARCH_CATEGORIES).forEach(([key, category]) => {
            category.keywords.forEach(keyword => {
                searchTerms.forEach(term => {
                    if (keyword.includes(term) || term.includes(keyword)) {
                        score += 12;
                        if (!agentMatches.includes(category.agent)) {
                            agentMatches.push(category.agent);
                        }
                    }
                });
            });
        });
        
        if (score > 0) {
            results.push({
                ...item,
                searchScore: score,
                agentMatches: agentMatches,
                matchedTerms: searchTerms.filter(term => 
                    titleText.includes(term) || contentText.includes(term) || 
                    tagArray.some(tag => tag.includes(term))
                )
            });
        }
    });
    
    // Sort by relevance score
    return results.sort((a, b) => b.searchScore - a.searchScore);
}

/**
 * Generate MCP agent filter interface
 * @param {Object} options - Filter options
 * @returns {string} HTML for agent filters
 */
function generateMCPAgentFilters(options = {}) {
    const selectedAgents = options.selectedAgents || [];
    
    let html = `
        <div class="mcp-agent-filters" style="margin-bottom: 1.5rem; padding: 1rem; background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%); border-radius: 8px;">
            <h3 style="color: white; margin-bottom: 1rem; font-size: 1.1rem;">🤖 Filter by MCP Agent Specialization</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
    `;
    
    Object.entries(MCP_SEARCH_CATEGORIES).forEach(([key, category]) => {
        const isSelected = selectedAgents.includes(key);
        const selectedClass = isSelected ? 'selected' : '';
        
        html += `
            <button class="agent-filter-btn ${selectedClass}" 
                    data-agent="${key}" 
                    style="padding: 0.5rem 1rem; border: 2px solid white; background: ${isSelected ? 'white' : 'transparent'}; 
                           color: ${isSelected ? category.color : 'white'}; border-radius: 20px; cursor: pointer; 
                           transition: all 0.3s ease; font-size: 0.8rem; font-weight: bold;">
                ${category.label}
                <span style="font-size: 0.7rem; opacity: 0.8;">(${category.agent})</span>
            </button>
        `;
    });
    
    html += `
            </div>
            <div style="margin-top: 1rem;">
                <button id="clear-agent-filters" style="padding: 0.25rem 0.75rem; background: rgba(255,255,255,0.2); 
                        border: 1px solid white; color: white; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">
                    Clear All Filters
                </button>
            </div>
        </div>
    `;
    
    return html;
}

/**
 * Initialize MCP-enhanced search interface
 * @param {string} containerId - Container element ID
 * @param {Array} searchableItems - Items to make searchable
 * @param {Object} options - Configuration options
 */
function initializeMCPSearch(containerId, searchableItems, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Create search interface
    const searchHTML = `
        <div class="mcp-search-interface">
            ${generateMCPAgentFilters(options)}
            
            <div style="margin-bottom: 1rem;">
                <input type="search" id="mcp-search-input" placeholder="Search across all learning areas..." 
                       style="width: 100%; padding: 0.75rem; border: 2px solid var(--color-border); border-radius: 8px; 
                              font-size: 1rem; background: white;">
            </div>
            
            <div id="search-results" class="search-results">
                <div id="results-container"></div>
                <div id="no-results" style="display: none; text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                    <p>No resources found matching your search criteria.</p>
                    <p style="font-size: 0.9rem;">Try different keywords or remove some filters.</p>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = searchHTML;
    
    // Initialize search functionality
    const searchInput = document.getElementById('mcp-search-input');
    const resultsContainer = document.getElementById('results-container');
    const noResults = document.getElementById('no-results');
    
    let currentFilters = [];
    
    function performSearch() {
        const query = searchInput.value;
        let filteredItems = searchableItems;
        
        // Apply agent filters
        if (currentFilters.length > 0) {
            filteredItems = searchableItems.filter(item => {
                const itemTags = (item.dataset?.tags || item.tags || '').toLowerCase();
                return currentFilters.some(filter => {
                    const category = MCP_SEARCH_CATEGORIES[filter];
                    return category.keywords.some(keyword => itemTags.includes(keyword));
                });
            });
        }
        
        const results = mcpEnhancedSearch(query, filteredItems);
        displaySearchResults(results);
    }
    
    function displaySearchResults(results) {
        if (results.length === 0) {
            resultsContainer.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        resultsContainer.style.display = 'block';
        
        const resultsHTML = results.map(item => {
            const agentBadges = item.agentMatches ? 
                item.agentMatches.map(agent => `<span class="agent-badge" style="background: var(--color-secondary); color: white; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.7rem; margin-right: 0.25rem;">${agent}</span>`).join('') : '';
            
            return `
                <div class="search-result-item" style="border: 1px solid var(--color-border); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: white;">
                    <h4 style="margin-bottom: 0.5rem;"><a href="${item.href || '#'}" style="color: var(--color-primary); text-decoration: none;">${item.title || 'Untitled'}</a></h4>
                    <p style="color: var(--color-text-secondary); margin-bottom: 0.5rem; line-height: 1.5;">${item.description || ''}</p>
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <div class="agent-matches">${agentBadges}</div>
                        <div style="font-size: 0.8rem; color: var(--color-text-secondary);">Relevance: ${item.searchScore || 0}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        resultsContainer.innerHTML = resultsHTML;
    }
    
    // Event listeners
    searchInput.addEventListener('input', performSearch);
    
    // Agent filter event listeners
    document.querySelectorAll('.agent-filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const agent = e.target.dataset.agent;
            if (currentFilters.includes(agent)) {
                currentFilters = currentFilters.filter(f => f !== agent);
                e.target.classList.remove('selected');
            } else {
                currentFilters.push(agent);
                e.target.classList.add('selected');
            }
            performSearch();
        });
    });
    
    document.getElementById('clear-agent-filters').addEventListener('click', () => {
        currentFilters = [];
        document.querySelectorAll('.agent-filter-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        performSearch();
    });
    
    // Initial display
    displaySearchResults(searchableItems);
}

// Export enhanced functions
if (typeof window !== 'undefined') {
    window.SharedComponents = {
        generateNavigation,
        generateRecommendedReading,
        generateBreadcrumb,
        initializeSharedComponents,
        getReadingTopicFromFilename,
        RECOMMENDED_READING,
        // New MCP-enhanced functions
        mcpEnhancedSearch,
        generateMCPAgentFilters,
        initializeMCPSearch,
        MCP_SEARCH_CATEGORIES
    };
}

/**
 * Enhanced filtering for curriculum-enhanced resources
 */
function initializeCurriculumEnhancedFilter() {
    const tagsFilter = document.getElementById('tags-filter');
    if (!tagsFilter) return;
    
    tagsFilter.addEventListener('change', function() {
        const selectedValue = this.value;
        const resourceCards = document.querySelectorAll('.resource-card');
        
        resourceCards.forEach(card => {
            if (selectedValue === 'curriculum-enhanced') {
                // Show only curriculum-enhanced resources
                const hasCurriculumSection = card.innerHTML.includes('curriculum-alignment.html') || 
                                           card.innerHTML.includes('Achievement Objective') ||
                                           card.innerHTML.includes('NZ Curriculum');
                
                if (hasCurriculumSection) {
                    card.style.display = 'block';
                    // Add visual indicator
                    card.style.boxShadow = '0 4px 12px rgba(64, 224, 208, 0.3)';
                    card.style.borderLeft = '4px solid var(--color-accent)';
                } else {
                    card.style.display = 'none';
                }
            } else if (selectedValue === '') {
                // Show all resources
                card.style.display = 'block';
                card.style.boxShadow = '';
                card.style.borderLeft = '';
            }
        });
    });
}

// Auto-initialize if running in browser and data attributes are present
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const autoInit = body.dataset.autoInit;
    
    if (autoInit === 'true') {
        const options = {
            currentPage: body.dataset.currentPage || '',
            readingTopic: body.dataset.readingTopic || getReadingTopicFromFilename(window.location.pathname),
            breadcrumbPath: body.dataset.breadcrumbPath || ''
        };
        
        initializeSharedComponents(options);
        
        // Initialize enhanced curriculum filtering
        initializeCurriculumEnhancedFilter();
    }
    
    console.log('Te Kete Ako loaded with curriculum enhancement features');
});