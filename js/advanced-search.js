// Advanced Search and Filtering System for Te Kete Ako
class TeKeteAkoSearch {
    constructor() {
        this.searchIndex = new Map();
        this.contentCache = new Map();
        this.filters = {
            subject: [],
            level: [],
            type: [],
            curriculum: [],
            cultural: false
        };
        this.searchHistory = JSON.parse(localStorage.getItem('search-history') || '[]');
        this.initializeSearch();
    }

    async initializeSearch() {
        await this.buildSearchIndex();
        this.createSearchInterface();
        this.setupEventListeners();
        this.loadSearchHistory();
    }

    // Build comprehensive search index from all platform content
    async buildSearchIndex() {
        const contentSources = [
            { type: 'handout', pattern: 'handouts/*.html' },
            { type: 'unit', pattern: 'units/*.html' },
            { type: 'experience', pattern: 'experiences/*.html' },
            { type: 'game', pattern: 'games/*.html' },
            { type: 'other', pattern: 'other-resources/*.html' }
        ];

        const searchData = {
            handouts: [
                {
                    id: 'treaty-waitangi',
                    title: 'Treaty of Waitangi',
                    url: 'handouts/treaty-of-waitangi-handout.html',
                    type: 'handout',
                    subject: ['social-studies', 'history'],
                    level: ['7-8', '9-10'],
                    curriculum: ['SS4-1', 'SS5-1'],
                    cultural: true,
                    keywords: ['treaty', 'waitangi', 'māori', 'crown', 'agreement', 'founding document', 'new zealand'],
                    description: 'Understanding the founding document of Aotearoa'
                },
                {
                    id: 'maori-astronomy',
                    title: 'Māori Astronomy and Navigation',
                    url: 'handouts/maori-astronomy-navigation-handout.html',
                    type: 'handout',
                    subject: ['science', 'cultural-studies'],
                    level: ['7-8', '9-10'],
                    curriculum: ['PEB4-2', 'SS4-8'],
                    cultural: true,
                    keywords: ['astronomy', 'navigation', 'stars', 'matariki', 'traditional knowledge', 'polynesian'],
                    description: 'Traditional Māori astronomy and navigation techniques'
                },
                {
                    id: 'economic-justice',
                    title: 'Economic Justice Deep Dive',
                    url: 'handouts/economic-justice-deep-dive-comprehension.html',
                    type: 'handout',
                    subject: ['social-studies', 'economics'],
                    level: ['9-10', '11-13'],
                    curriculum: ['SS5-4', 'SS6-4'],
                    cultural: true,
                    keywords: ['economic', 'justice', 'inequality', 'housing', 'power', 'systems'],
                    description: 'Understanding wealth, power, and economic change'
                },
                {
                    id: 'peel-arguments',
                    title: 'PEEL Method Toolkit',
                    url: 'handouts/writers-toolkit-peel-argument-handout.html',
                    type: 'handout',
                    subject: ['english', 'writing'],
                    level: ['7-8', '9-10', '11-13'],
                    curriculum: ['EN4-1', 'EN5-1'],
                    cultural: false,
                    keywords: ['writing', 'arguments', 'peel', 'paragraph', 'structure', 'persuasive'],
                    description: 'Master the art of structuring powerful, persuasive paragraphs'
                },
                {
                    id: 'traditional-navigation-math',
                    title: 'Traditional Navigation Mathematics',
                    url: 'handouts/traditional-navigation-mathematics-handout.html',
                    type: 'handout',
                    subject: ['mathematics', 'cultural-studies'],
                    level: ['7-8', '9-10'],
                    curriculum: ['GM4-2', 'GM5-2'],
                    cultural: true,
                    keywords: ['mathematics', 'navigation', 'angles', 'compass', 'traditional', 'polynesian'],
                    description: 'Mathematical principles behind traditional Pacific navigation'
                },
                {
                    id: 'haka-comprehension',
                    title: 'The Power of Haka',
                    url: 'handouts/haka-comprehension-handout.html',
                    type: 'handout',
                    subject: ['cultural-studies', 'english'],
                    level: ['7-8', '9-10'],
                    curriculum: ['EN4-5', 'SS4-6'],
                    cultural: true,
                    keywords: ['haka', 'cultural expression', 'identity', 'performance', 'māori culture'],
                    description: 'Explore haka as cultural expression, identity, and powerful communication'
                }
            ],
            units: [
                {
                    id: 'unit-te-ao-maori',
                    title: 'Unit 1: Te Ao Māori - Cultural Identity & Knowledge Systems',
                    url: 'units/unit-1-te-ao-maori.html',
                    type: 'unit',
                    subject: ['cultural-studies', 'cross-curricular'],
                    level: ['7-8', '9-10'],
                    curriculum: ['SS4-6', 'EN4-5', 'A4-1'],
                    cultural: true,
                    keywords: ['te ao māori', 'cultural identity', 'knowledge systems', 'whakapapa', 'comprehensive unit'],
                    description: 'Comprehensive cultural foundation unit'
                },
                {
                    id: 'unit-decolonized-history',
                    title: 'Unit 2: Decolonized History',
                    url: 'units/unit-2-decolonized-history.html',
                    type: 'unit',
                    subject: ['history', 'social-studies'],
                    level: ['9-10', '11-13'],
                    curriculum: ['SS5-1', 'SS6-1'],
                    cultural: true,
                    keywords: ['decolonized', 'history', 'alternative perspectives', 'indigenous'],
                    description: 'History from indigenous and alternative perspectives'
                },
                {
                    id: 'unit-stem-matauranga',
                    title: 'Unit 3: STEM + Mātauranga Māori',
                    url: 'units/unit-3-stem-matauranga.html',
                    type: 'unit',
                    subject: ['science', 'mathematics', 'cultural-studies'],
                    level: ['7-8', '9-10'],
                    curriculum: ['NS4-1', 'GM4-1'],
                    cultural: true,
                    keywords: ['stem', 'mātauranga māori', 'traditional knowledge', 'science', 'mathematics'],
                    description: 'Integration of STEM learning with traditional Māori knowledge'
                },
                {
                    id: 'unit-economic-justice',
                    title: 'Unit 4: Economic Justice & Rangatiratanga',
                    url: 'units/unit-4-economic-justice.html',
                    type: 'unit',
                    subject: ['social-studies', 'economics'],
                    level: ['9-10', '11-13'],
                    curriculum: ['SS5-4', 'SS6-4'],
                    cultural: true,
                    keywords: ['economic justice', 'rangatiratanga', 'inequality', 'systems'],
                    description: 'Economic systems, justice, and Māori sovereignty concepts'
                }
            ],
            experiences: [
                {
                    id: 'digital-purakau',
                    title: 'Digital Pūrākau - Interactive Cultural Stories',
                    url: 'experiences/digital-purakau.html',
                    type: 'experience',
                    subject: ['cultural-studies', 'interactive'],
                    level: ['7-8', '9-10', '11-13'],
                    curriculum: ['cross-curricular'],
                    cultural: true,
                    keywords: ['pūrākau', 'interactive', 'stories', 'choice-driven', 'cultural narratives'],
                    description: 'Interactive cultural stories with choice-driven narratives'
                },
                {
                    id: 'adaptive-pathways',
                    title: 'Adaptive Learning Pathways',
                    url: 'experiences/adaptive-pathways.html',
                    type: 'experience',
                    subject: ['meta-learning', 'personalized'],
                    level: ['7-8', '9-10', '11-13'],
                    curriculum: ['cross-curricular'],
                    cultural: true,
                    keywords: ['adaptive', 'personalized', 'learning pathways', 'multiple intelligences'],
                    description: '6 personalized educational journeys for diverse learning styles'
                },
                {
                    id: 'cultural-assessment',
                    title: 'Cultural Assessment Strategies',
                    url: 'experiences/cultural-assessment.html',
                    type: 'experience',
                    subject: ['assessment', 'cultural'],
                    level: ['teachers'],
                    curriculum: ['assessment'],
                    cultural: true,
                    keywords: ['assessment', 'authentic', 'cultural', 'portfolio', 'holistic'],
                    description: 'Authentic evaluation honoring diverse ways of demonstrating knowledge'
                },
                {
                    id: 'virtual-marae',
                    title: 'Virtual Marae Training',
                    url: 'experiences/virtual-marae.html',
                    type: 'experience',
                    subject: ['cultural-studies', 'protocols'],
                    level: ['7-8', '9-10', '11-13'],
                    curriculum: ['SS4-6'],
                    cultural: true,
                    keywords: ['marae', 'protocols', 'cultural training', 'tikanga', 'preparation'],
                    description: 'Respectful preparation for authentic cultural experiences'
                }
            ],
            games: [
                {
                    id: 'te-reo-wordle',
                    title: 'Te Reo Māori Wordle',
                    url: 'games/te-reo-wordle.html',
                    type: 'game',
                    subject: ['te-reo-maori', 'language'],
                    level: ['7-8', '9-10', '11-13'],
                    curriculum: ['language'],
                    cultural: true,
                    keywords: ['te reo māori', 'wordle', 'language learning', 'vocabulary'],
                    description: 'Daily Te Reo Māori word guessing game with cultural context'
                }
            ]
        };

        // Flatten all content into search index
        Object.values(searchData).flat().forEach(item => {
            this.searchIndex.set(item.id, item);
        });

        console.log(`Search index built with ${this.searchIndex.size} items`);
    }

    // Create the search interface
    createSearchInterface() {
        // Check if search interface already exists
        if (document.getElementById('advanced-search-container')) {
            return;
        }

        const searchHTML = `
            <div id="advanced-search-container" class="search-container" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 10000;
                display: none;
                align-items: flex-start;
                justify-content: center;
                padding: 50px 20px;
                box-sizing: border-box;
            ">
                <div class="search-modal" style="
                    background: white;
                    border-radius: 12px;
                    width: 100%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                ">
                    <div class="search-header" style="
                        padding: 20px 24px;
                        border-bottom: 1px solid #e5e7eb;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    ">
                        <h2 style="margin: 0; font-size: 1.5rem; color: var(--color-primary);">🔍 Advanced Search - Rapua</h2>
                        <button id="close-search" style="
                            background: none;
                            border: none;
                            font-size: 24px;
                            cursor: pointer;
                            color: #6b7280;
                            padding: 4px;
                        ">&times;</button>
                    </div>
                    
                    <div class="search-body" style="padding: 24px;">
                        <div class="search-input-container" style="margin-bottom: 24px;">
                            <input type="text" id="search-input" placeholder="Search for resources, units, experiences..." style="
                                width: 100%;
                                padding: 12px 16px;
                                border: 2px solid #d1d5db;
                                border-radius: 8px;
                                font-size: 16px;
                                box-sizing: border-box;
                                transition: border-color 0.2s;
                            ">
                            <div class="search-suggestions" id="search-suggestions" style="
                                margin-top: 8px;
                                display: none;
                            "></div>
                        </div>
                        
                        <div class="search-filters" style="
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                            gap: 16px;
                            margin-bottom: 24px;
                        ">
                            <div class="filter-group">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--color-primary);">Subject Area</label>
                                <select id="subject-filter" style="
                                    width: 100%;
                                    padding: 8px 12px;
                                    border: 1px solid #d1d5db;
                                    border-radius: 6px;
                                    background: white;
                                ">
                                    <option value="">All Subjects</option>
                                    <option value="english">English</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="science">Science</option>
                                    <option value="social-studies">Social Studies</option>
                                    <option value="cultural-studies">Cultural Studies</option>
                                    <option value="te-reo-maori">Te Reo Māori</option>
                                    <option value="cross-curricular">Cross-Curricular</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--color-primary);">Year Level</label>
                                <select id="level-filter" style="
                                    width: 100%;
                                    padding: 8px 12px;
                                    border: 1px solid #d1d5db;
                                    border-radius: 6px;
                                    background: white;
                                ">
                                    <option value="">All Levels</option>
                                    <option value="7-8">Years 7-8</option>
                                    <option value="9-10">Years 9-10</option>
                                    <option value="11-13">Years 11-13</option>
                                    <option value="teachers">Teachers</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: var(--color-primary);">Resource Type</label>
                                <select id="type-filter" style="
                                    width: 100%;
                                    padding: 8px 12px;
                                    border: 1px solid #d1d5db;
                                    border-radius: 6px;
                                    background: white;
                                ">
                                    <option value="">All Types</option>
                                    <option value="handout">Handouts</option>
                                    <option value="unit">Unit Plans</option>
                                    <option value="experience">Learning Experiences</option>
                                    <option value="game">Interactive Games</option>
                                </select>
                            </div>
                            
                            <div class="filter-group">
                                <label style="
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                    font-weight: 600;
                                    color: var(--color-primary);
                                    cursor: pointer;
                                    margin-top: 24px;
                                ">
                                    <input type="checkbox" id="cultural-filter" style="
                                        width: 18px;
                                        height: 18px;
                                        accent-color: var(--color-secondary);
                                    ">
                                    <span>🌿 Cultural Content Only</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="search-results" id="search-results" style="
                            min-height: 200px;
                        ">
                            <div class="results-placeholder" style="
                                text-align: center;
                                padding: 40px;
                                color: #6b7280;
                            ">
                                <div style="font-size: 3rem; margin-bottom: 16px;">🔍</div>
                                <p style="margin: 0; font-size: 1.1rem;">Start typing to search across all Te Kete Ako resources</p>
                                <p style="margin: 8px 0 0 0; font-size: 0.9rem;">Search handouts, units, experiences, and more...</p>
                            </div>
                        </div>
                        
                        <div class="search-history" id="search-history" style="
                            margin-top: 24px;
                            border-top: 1px solid #e5e7eb;
                            padding-top: 16px;
                            display: none;
                        ">
                            <h3 style="
                                margin: 0 0 12px 0;
                                font-size: 1rem;
                                color: var(--color-primary);
                                font-weight: 600;
                            ">Recent Searches</h3>
                            <div id="history-items" style="
                                display: flex;
                                flex-wrap: wrap;
                                gap: 8px;
                            "></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', searchHTML);
    }

    // Set up event listeners
    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const closeButton = document.getElementById('close-search');
        const container = document.getElementById('advanced-search-container');
        const subjectFilter = document.getElementById('subject-filter');
        const levelFilter = document.getElementById('level-filter');
        const typeFilter = document.getElementById('type-filter');
        const culturalFilter = document.getElementById('cultural-filter');

        // Search input
        searchInput?.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        searchInput?.addEventListener('focus', () => {
            this.loadSearchHistory();
        });

        // Close button
        closeButton?.addEventListener('click', () => {
            this.closeSearch();
        });

        // Close on backdrop click
        container?.addEventListener('click', (e) => {
            if (e.target === container) {
                this.closeSearch();
            }
        });

        // Filter changes
        [subjectFilter, levelFilter, typeFilter, culturalFilter].forEach(filter => {
            filter?.addEventListener('change', () => {
                this.updateFilters();
                this.performSearch(searchInput?.value || '');
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            // Escape to close search
            if (e.key === 'Escape' && container?.style.display === 'flex') {
                this.closeSearch();
            }
        });

        // Add search trigger button to existing navigation
        this.addSearchTrigger();
    }

    // Add search trigger to navigation
    addSearchTrigger() {
        const nav = document.querySelector('.main-nav ul');
        if (nav && !document.getElementById('search-trigger')) {
            const searchTrigger = document.createElement('li');
            searchTrigger.innerHTML = `
                <a href="#" id="search-trigger" style="
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: none;
                    color: inherit;
                    padding: 8px 12px;
                    border-radius: 6px;
                    transition: background-color 0.2s;
                " title="Search all content (Ctrl+K)">
                    <span class="nav-icon">🔍</span>
                    <span class="nav-text-en">Search</span>
                    <span class="nav-text-mi" lang="mi">Rapua</span>
                    <span style="
                        font-size: 0.7rem;
                        background: rgba(255,255,255,0.2);
                        padding: 2px 6px;
                        border-radius: 3px;
                        margin-left: 4px;
                    ">⌘K</span>
                </a>
            `;
            
            nav.appendChild(searchTrigger);
            
            document.getElementById('search-trigger')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.openSearch();
            });
        }
    }

    // Open search interface
    openSearch() {
        const container = document.getElementById('advanced-search-container');
        const searchInput = document.getElementById('search-input');
        
        if (container) {
            container.style.display = 'flex';
            searchInput?.focus();
            this.loadSearchHistory();
        }
    }

    // Close search interface
    closeSearch() {
        const container = document.getElementById('advanced-search-container');
        if (container) {
            container.style.display = 'none';
        }
    }

    // Update filters object
    updateFilters() {
        this.filters.subject = [document.getElementById('subject-filter')?.value].filter(Boolean);
        this.filters.level = [document.getElementById('level-filter')?.value].filter(Boolean);
        this.filters.type = [document.getElementById('type-filter')?.value].filter(Boolean);
        this.filters.cultural = document.getElementById('cultural-filter')?.checked || false;
    }

    // Perform search
    performSearch(query) {
        const results = [];
        const normalizedQuery = query.toLowerCase().trim();
        
        if (normalizedQuery.length === 0) {
            this.displayResults([]);
            return;
        }

        // Add to search history
        this.addToSearchHistory(normalizedQuery);

        for (const [id, item] of this.searchIndex) {
            let score = 0;

            // Apply filters first
            if (this.filters.subject.length > 0 && !item.subject.some(s => this.filters.subject.includes(s))) continue;
            if (this.filters.level.length > 0 && !item.level.some(l => this.filters.level.includes(l))) continue;
            if (this.filters.type.length > 0 && !this.filters.type.includes(item.type)) continue;
            if (this.filters.cultural && !item.cultural) continue;

            // Title match (high weight)
            if (item.title.toLowerCase().includes(normalizedQuery)) {
                score += 100;
            }

            // Keyword match (medium weight)
            const keywordMatches = item.keywords.filter(k => k.toLowerCase().includes(normalizedQuery));
            score += keywordMatches.length * 20;

            // Description match (low weight)
            if (item.description.toLowerCase().includes(normalizedQuery)) {
                score += 10;
            }

            // Fuzzy matching for typos
            if (this.fuzzyMatch(normalizedQuery, item.title.toLowerCase()) || 
                item.keywords.some(k => this.fuzzyMatch(normalizedQuery, k.toLowerCase()))) {
                score += 5;
            }

            if (score > 0) {
                results.push({ ...item, score });
            }
        }

        // Sort by score (descending)
        results.sort((a, b) => b.score - a.score);

        this.displayResults(results.slice(0, 20)); // Limit to top 20 results
    }

    // Simple fuzzy matching for typos
    fuzzyMatch(query, text) {
        if (query.length < 3) return false;
        
        const threshold = Math.floor(query.length * 0.2); // Allow 20% character difference
        let differences = 0;
        let queryIndex = 0;
        
        for (let i = 0; i < text.length && queryIndex < query.length; i++) {
            if (text[i] === query[queryIndex]) {
                queryIndex++;
            } else {
                differences++;
                if (differences > threshold) return false;
            }
        }
        
        return queryIndex >= query.length - threshold;
    }

    // Display search results
    displayResults(results) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #6b7280;">
                    <div style="font-size: 2rem; margin-bottom: 16px;">😔</div>
                    <p style="margin: 0; font-size: 1.1rem;">No results found</p>
                    <p style="margin: 8px 0 0 0; font-size: 0.9rem;">Try different keywords or adjust your filters</p>
                </div>
            `;
            return;
        }

        const resultHTML = `
            <div class="results-header" style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 16px;
                padding-bottom: 8px;
                border-bottom: 1px solid #e5e7eb;
            ">
                <span style="font-weight: 600; color: var(--color-primary);">
                    Found ${results.length} result${results.length !== 1 ? 's' : ''}
                </span>
                <button onclick="teKeteSearch.clearResults()" style="
                    background: none;
                    border: none;
                    color: var(--color-secondary);
                    cursor: pointer;
                    font-size: 0.9rem;
                ">Clear</button>
            </div>
            <div class="results-list">
                ${results.map(item => this.renderSearchResult(item)).join('')}
            </div>
        `;

        resultsContainer.innerHTML = resultHTML;
    }

    // Render individual search result
    renderSearchResult(item) {
        const typeIcons = {
            'handout': '📄',
            'unit': '📚',
            'experience': '🌟',
            'game': '🎮',
            'other': '📋'
        };

        const culturalBadge = item.cultural ? '<span style="background: var(--color-secondary); color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; margin-left: 8px;">Cultural</span>' : '';

        return `
            <div class="search-result-item" style="
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 12px;
                transition: all 0.2s;
                cursor: pointer;
            " onclick="teKeteSearch.openResult('${item.url}')">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="font-size: 1.5rem; flex-shrink: 0;">
                        ${typeIcons[item.type] || '📄'}
                    </div>
                    <div style="flex: 1; min-width: 0;">
                        <h3 style="
                            margin: 0 0 8px 0;
                            font-size: 1.1rem;
                            color: var(--color-primary);
                            font-weight: 600;
                        ">
                            ${item.title}${culturalBadge}
                        </h3>
                        <p style="
                            margin: 0 0 8px 0;
                            color: #6b7280;
                            font-size: 0.9rem;
                            line-height: 1.4;
                        ">
                            ${item.description}
                        </p>
                        <div style="
                            display: flex;
                            gap: 8px;
                            flex-wrap: wrap;
                            align-items: center;
                        ">
                            <span style="
                                background: #f3f4f6;
                                color: #4b5563;
                                padding: 2px 8px;
                                border-radius: 12px;
                                font-size: 0.8rem;
                                text-transform: capitalize;
                            ">
                                ${item.type}
                            </span>
                            ${item.subject.slice(0, 2).map(s => `
                                <span style="
                                    background: #dbeafe;
                                    color: #1e40af;
                                    padding: 2px 8px;
                                    border-radius: 12px;
                                    font-size: 0.8rem;
                                ">${s.replace('-', ' ')}</span>
                            `).join('')}
                            ${item.level.slice(0, 2).map(l => `
                                <span style="
                                    background: #ecfdf5;
                                    color: #065f46;
                                    padding: 2px 8px;
                                    border-radius: 12px;
                                    font-size: 0.8rem;
                                ">Year ${l}</span>
                            `).join('')}
                        </div>
                    </div>
                    <div style="
                        color: var(--color-secondary);
                        font-size: 1.2rem;
                        flex-shrink: 0;
                    ">→</div>
                </div>
            </div>
        `;
    }

    // Open search result
    openResult(url) {
        window.open(url, '_blank');
        this.closeSearch();
    }

    // Clear search results
    clearResults() {
        document.getElementById('search-input').value = '';
        this.displayResults([]);
    }

    // Search history management
    addToSearchHistory(query) {
        if (query.length < 2) return;
        
        // Remove if already exists
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        
        // Add to beginning
        this.searchHistory.unshift(query);
        
        // Keep only last 10 searches
        this.searchHistory = this.searchHistory.slice(0, 10);
        
        localStorage.setItem('search-history', JSON.stringify(this.searchHistory));
    }

    // Load and display search history
    loadSearchHistory() {
        const historyContainer = document.getElementById('search-history');
        const historyItems = document.getElementById('history-items');
        
        if (!historyContainer || !historyItems || this.searchHistory.length === 0) {
            historyContainer?.style.setProperty('display', 'none');
            return;
        }

        historyContainer.style.setProperty('display', 'block');
        
        historyItems.innerHTML = this.searchHistory.map(query => `
            <button style="
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 16px;
                padding: 4px 12px;
                font-size: 0.9rem;
                cursor: pointer;
                color: #374151;
                transition: all 0.2s;
            " onclick="teKeteSearch.useHistoryQuery('${query}')">
                ${query}
            </button>
        `).join('');
    }

    // Use query from history
    useHistoryQuery(query) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = query;
            this.performSearch(query);
        }
    }
}

// Initialize search system when page loads
let teKeteSearch;
document.addEventListener('DOMContentLoaded', () => {
    teKeteSearch = new TeKeteAkoSearch();
});

// Export for global access
window.TeKeteAkoSearch = TeKeteAkoSearch;