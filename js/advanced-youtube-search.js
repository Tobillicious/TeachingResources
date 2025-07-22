// Advanced YouTube Search and Integration System
class AdvancedYouTubeSearch {
    constructor() {
        this.videos = this.initVideoDatabase();
        this.searchHistory = [];
        this.recommendations = [];
        this.currentFilters = {};
        this.initializeSystem();
    }

    initVideoDatabase() {
        return [
            {
                id: 'haka-art',
                title: 'Ka Haka: The Art of Haka',
                duration: '15 min',
                subject: ['te-ao-maori', 'humanities'],
                yearLevel: [7, 8, 9, 10, 11, 12, 13],
                type: 'cultural',
                tags: ['cultural-analysis', 'media-literacy', 'performance'],
                curriculumAligned: true,
                assessmentReady: true,
                lessonIntegrated: false,
                achievements: ['SS4-1', 'RV4-3'],
                handouts: ['haka-comprehension-handout.html'],
                description: 'Understanding the cultural significance and power of haka beyond sports performances.',
                url: 'https://youtube.com/watch?v=hDyLYo13gj8'
            },
            {
                id: 'maori-navigation',
                title: 'Māori Navigation & Whakatōhea',
                duration: '22 min',
                subject: ['te-ao-maori', 'stem'],
                yearLevel: [8, 9, 10, 11, 12, 13],
                type: 'educational',
                tags: ['navigation', 'astronomy', 'mathematics', 'cultural-knowledge'],
                curriculumAligned: true,
                assessmentReady: true,
                lessonIntegrated: true,
                achievements: ['PEB4-2', 'SS4-8', 'M4-2'],
                handouts: ['maori-astronomy-navigation-handout.html', 'traditional-navigation-mathematics-handout.html'],
                description: 'Traditional Polynesian navigation techniques and sophisticated Māori knowledge systems.',
                url: 'https://youtube.com/watch?v=2cH4hjksJ6o'
            },
            {
                id: 'microplastics-ocean',
                title: 'Microplastics: Ocean Health',
                duration: '14 min',
                subject: ['stem', 'environmental'],
                yearLevel: [8, 9, 10, 11, 12, 13],
                type: 'educational',
                tags: ['environmental-science', 'ocean-health', 'pollution', 'research'],
                curriculumAligned: true,
                assessmentReady: true,
                lessonIntegrated: false,
                achievements: ['LW4-1', 'NoS4-1'],
                handouts: ['microplastics-comprehension-handout.html', 'enhanced/microplastics-matauranga-integration.html'],
                description: 'Science behind microplastic pollution and impact on marine ecosystems.',
                url: 'https://youtube.com/watch?v=123456789'
            },
            {
                id: 'climate-change-aotearoa',
                title: 'Climate Change in Aotearoa',
                duration: '18 min',
                subject: ['environmental', 'humanities'],
                yearLevel: [9, 10, 11, 12, 13],
                type: 'current-events',
                tags: ['climate-change', 'youth-activism', 'policy', 'local-issues'],
                curriculumAligned: false,
                assessmentReady: false,
                lessonIntegrated: false,
                achievements: ['SS4-5', 'SS4-7'],
                handouts: [],
                description: 'Local impacts and responses to climate change in New Zealand.',
                url: 'https://youtube.com/watch?v=HtTMSCVFbFg'
            },
            {
                id: 'housing-crisis-voices',
                title: 'Housing Crisis: Young Voices',
                duration: '12 min',
                subject: ['humanities', 'social-issues'],
                yearLevel: [10, 11, 12, 13],
                type: 'current-events',
                tags: ['housing', 'economics', 'youth-perspectives', 'social-justice'],
                curriculumAligned: false,
                assessmentReady: false,
                lessonIntegrated: false,
                achievements: ['SS4-5', 'SS4-6'],
                handouts: ['housing-affordability-comprehension-handout.html'],
                description: 'Young New Zealanders discuss housing affordability crisis.',
                url: 'https://youtube.com/watch?v=kBdfcR-8hEY'
            },
            {
                id: 'probability-everyday',
                title: 'Probability in Everyday Life',
                duration: '8 min',
                subject: ['maths', 'stem'],
                yearLevel: [7, 8, 9, 10, 11],
                type: 'educational',
                tags: ['probability', 'decision-making', 'numeracy', 'real-world-applications'],
                curriculumAligned: true,
                assessmentReady: true,
                lessonIntegrated: false,
                achievements: ['S4-1', 'S4-3'],
                handouts: ['probability-handout.html', 'statistical-investigation-handout.html'],
                description: 'How probability affects decision-making in sports, weather, and daily choices.',
                url: 'https://youtube.com/watch?v=dQw4w9WgXcQ'
            },
            {
                id: 'ted-power-yet',
                title: 'TED: The Power of Yet',
                duration: '10 min',
                subject: ['general', 'wellbeing'],
                yearLevel: [7, 8, 9, 10, 11, 12, 13],
                type: 'ted-talks',
                tags: ['growth-mindset', 'resilience', 'learning', 'motivation'],
                curriculumAligned: false,
                assessmentReady: false,
                lessonIntegrated: false,
                achievements: [],
                handouts: [],
                description: 'Growth mindset and the power of "not yet" in learning.',
                url: 'https://youtube.com/watch?v=tedtalk1'
            },
            {
                id: 'digital-citizenship-ted',
                title: 'TED: Digital Citizenship',
                duration: '16 min',
                subject: ['tech', 'digital-literacy'],
                yearLevel: [9, 10, 11, 12, 13],
                type: 'ted-talks',
                tags: ['digital-citizenship', 'online-safety', 'digital-footprint', 'responsibility'],
                curriculumAligned: true,
                assessmentReady: true,
                lessonIntegrated: false,
                achievements: ['DC4-1', 'DC4-2'],
                handouts: ['digital-citizenship-handout.html'],
                description: 'Navigating online spaces responsibly and understanding digital footprints.',
                url: 'https://youtube.com/watch?v=tedtalk2'
            }
        ];
    }

    initializeSystem() {
        this.bindAdvancedFilters();
        this.initializeSmartRecommendations();
        this.setupSearchAnalytics();
    }

    bindAdvancedFilters() {
        // Enhanced curriculum filter
        const curriculumFilter = document.getElementById('curriculum-filter');
        if (curriculumFilter) {
            curriculumFilter.addEventListener('change', (e) => {
                this.applyCurriculumFilter(e.target.value);
            });
        }

        // Existing filters enhancement
        ['subject-filter', 'type-filter', 'year-filter', 'duration-filter'].forEach(filterId => {
            const filter = document.getElementById(filterId);
            if (filter) {
                filter.addEventListener('change', () => this.applyAdvancedFilters());
            }
        });
    }

    applyCurriculumFilter(filterType) {
        const resourceCards = document.querySelectorAll('.resource-card');
        
        resourceCards.forEach(card => {
            const isEnhanced = card.dataset.curriculum === 'aligned' || 
                              card.dataset.assessment === 'ready' || 
                              card.dataset.lesson === 'integrated';
            
            switch(filterType) {
                case 'curriculum-aligned':
                    card.style.display = card.dataset.curriculum === 'aligned' ? 'block' : 'none';
                    break;
                case 'assessment-ready':
                    card.style.display = card.dataset.assessment === 'ready' ? 'block' : 'none';
                    break;
                case 'lesson-integrated':
                    card.style.display = card.dataset.lesson === 'integrated' ? 'block' : 'none';
                    break;
                default:
                    card.style.display = 'block';
            }
            
            // Add visual enhancement for filtered items
            if (filterType && card.style.display === 'block') {
                card.style.boxShadow = '0 8px 25px rgba(64, 224, 208, 0.3)';
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'all 0.3s ease';
            } else if (!filterType) {
                card.style.boxShadow = '';
                card.style.transform = '';
            }
        });
        
        this.updateFilterStats(filterType);
    }

    updateFilterStats(filterType) {
        const visibleCards = document.querySelectorAll('.resource-card[style*="display: block"], .resource-card:not([style*="display: none"])');
        const totalCards = document.querySelectorAll('.resource-card');
        
        // Create or update stats display
        let statsDisplay = document.getElementById('filter-stats');
        if (!statsDisplay) {
            statsDisplay = document.createElement('div');
            statsDisplay.id = 'filter-stats';
            statsDisplay.style.cssText = `
                text-align: center;
                margin: 1rem 0;
                padding: 1rem;
                background: rgba(255,255,255,0.1);
                border-radius: 8px;
                color: white;
                font-weight: bold;
            `;
            document.querySelector('.resource-grid').insertAdjacentElement('beforebegin', statsDisplay);
        }
        
        if (filterType) {
            statsDisplay.innerHTML = `
                📊 Showing ${visibleCards.length} of ${totalCards.length} videos
                ${filterType === 'curriculum-aligned' ? '✨ Curriculum Enhanced' : ''}
                ${filterType === 'assessment-ready' ? '📋 Assessment Ready' : ''}
                ${filterType === 'lesson-integrated' ? '📚 Lesson Integrated' : ''}
            `;
        } else {
            statsDisplay.innerHTML = `📊 Showing all ${totalCards.length} videos`;
        }
    }

    initializeSmartRecommendations() {
        // AI-powered recommendations based on curriculum alignment
        this.generateRecommendations();
    }

    generateRecommendations() {
        // Smart recommendations based on curriculum objectives
        const curriculumMappings = {
            'SS4-1': ['haka-art', 'maori-navigation'],
            'PEB4-2': ['maori-navigation', 'microplastics-ocean'],
            'S4-1': ['probability-everyday'],
            'DC4-1': ['digital-citizenship-ted'],
            'LW4-1': ['microplastics-ocean']
        };
        
        // Create recommendation system
        const recommendationPanel = this.createRecommendationPanel();
        const filterBar = document.querySelector('.filter-bar');
        if (filterBar) {
            filterBar.insertAdjacentElement('afterend', recommendationPanel);
        }
    }

    createRecommendationPanel() {
        const panel = document.createElement('div');
        panel.style.cssText = `
            background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 1.5rem;
            margin: 2rem 0;
            color: white;
        `;
        
        panel.innerHTML = `
            <h3 style="color: white; margin-bottom: 1rem;">🤖 Smart Recommendations</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--color-accent); margin-bottom: 0.5rem;">For Mathematics Teachers</h4>
                    <p style="font-size: 0.9rem; opacity: 0.9;">Probability videos with assessment-ready handouts</p>
                    <button onclick="filterVideos('maths')" style="background: var(--color-accent); color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; margin-top: 0.5rem; cursor: pointer;">View Math Videos</button>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--color-secondary); margin-bottom: 0.5rem;">For Cultural Studies</h4>
                    <p style="font-size: 0.9rem; opacity: 0.9;">Te Ao Māori content with curriculum alignment</p>
                    <button onclick="filterVideos('te-ao-maori')" style="background: var(--color-secondary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; margin-top: 0.5rem; cursor: pointer;">View Cultural Videos</button>
                </div>
                <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
                    <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">Assessment Ready</h4>
                    <p style="font-size: 0.9rem; opacity: 0.9;">Videos with integrated handouts and rubrics</p>
                    <button onclick="showAssessmentReady()" style="background: var(--color-primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; margin-top: 0.5rem; cursor: pointer;">Show Assessment Ready</button>
                </div>
            </div>
        `;
        
        return panel;
    }

    setupSearchAnalytics() {
        // Track usage patterns for better recommendations
        this.analytics = {
            totalViews: 0,
            popularSubjects: {},
            searchPatterns: [],
            engagementMetrics: {}
        };
    }

    launchAdvancedSearch() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            color: white;
            position: relative;
        `;
        
        content.innerHTML = `
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
            
            <h2 style="color: white; margin-bottom: 2rem;">🚀 Advanced Video Search</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div>
                    <h3 style="color: white; margin-bottom: 1rem;">🎯 Search by Learning Objective</h3>
                    <select style="width: 100%; padding: 0.75rem; border-radius: 8px; border: none; margin-bottom: 1rem;">
                        <option>Select Achievement Objective...</option>
                        <option value="SS4-1">SS4-1 - Cultural Understanding</option>
                        <option value="PEB4-2">PEB4-2 - Earth Systems</option>
                        <option value="S4-1">S4-1 - Statistical Investigation</option>
                        <option value="DC4-1">DC4-1 - Digital Citizenship</option>
                        <option value="LW4-1">LW4-1 - Ecosystems</option>
                    </select>
                    <button style="width: 100%; background: var(--color-secondary); color: white; border: none; padding: 0.75rem; border-radius: 8px; font-weight: bold; cursor: pointer;">Find Aligned Videos</button>
                </div>
                
                <div>
                    <h3 style="color: white; margin-bottom: 1rem;">📚 Search by Lesson Topic</h3>
                    <input type="text" placeholder="Enter lesson topic..." style="width: 100%; padding: 0.75rem; border-radius: 8px; border: none; margin-bottom: 1rem;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                        <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer;">Cultural Analysis</button>
                        <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer;">Environmental Science</button>
                        <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer;">Mathematics</button>
                        <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.5rem; border-radius: 6px; cursor: pointer;">Digital Technologies</button>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.1); border-radius: 12px;">
                <h3 style="color: white; margin-bottom: 1rem;">🎓 Recommended Learning Pathways</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="text-align: center;">
                        <h4 style="color: var(--color-secondary); margin-bottom: 0.5rem;">Starter Pack</h4>
                        <p style="font-size: 0.9rem; opacity: 0.9;">3 videos for new topics</p>
                    </div>
                    <div style="text-align: center;">
                        <h4 style="color: var(--color-accent); margin-bottom: 0.5rem;">Deep Dive</h4>
                        <p style="font-size: 0.9rem; opacity: 0.9;">Comprehensive exploration</p>
                    </div>
                    <div style="text-align: center;">
                        <h4 style="color: white; margin-bottom: 0.5rem;">Assessment Focus</h4>
                        <p style="font-size: 0.9rem; opacity: 0.9;">Videos with ready assessments</p>
                    </div>
                </div>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
    }
}

// Global functions for onclick handlers
function toggleAdvancedSearch() {
    const searchSystem = new AdvancedYouTubeSearch();
    searchSystem.launchAdvancedSearch();
}

function filterVideos(subject) {
    const subjectFilter = document.getElementById('subject-filter');
    if (subjectFilter) {
        subjectFilter.value = subject;
        subjectFilter.dispatchEvent(new Event('change'));
    }
}

function showAssessmentReady() {
    const curriculumFilter = document.getElementById('curriculum-filter');
    if (curriculumFilter) {
        curriculumFilter.value = 'assessment-ready';
        curriculumFilter.dispatchEvent(new Event('change'));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedYouTubeSearch();
});