/**
 * FILTERING SYSTEM - Mangakōtukutuku College Teaching Resources
 * 
 * Provides dynamic filtering functionality for all resource pages
 * Supports multiple filter types: Subject, Year Level, Phase, Tags, Type, Duration
 */

class ResourceFilter {
    constructor() {
        this.filters = {};
        this.resourceCards = document.querySelectorAll('.resource-card');
        this.filterDropdowns = document.querySelectorAll('.filter-dropdown');
        this.init();
    }

    init() {
        // Set up event listeners for all filter dropdowns
        this.filterDropdowns.forEach(dropdown => {
            dropdown.addEventListener('change', (e) => {
                this.updateFilter(e.target.id, e.target.value);
                this.applyFilters();
            });
        });

        // Initialize URL parameter filters
        this.loadFiltersFromURL();
        this.applyFilters();
    }

    updateFilter(filterType, value) {
        if (value === '') {
            delete this.filters[filterType];
        } else {
            this.filters[filterType] = value;
        }
        
        // Update URL to reflect current filters
        this.updateURL();
    }

    applyFilters() {
        let visibleCount = 0;
        
        this.resourceCards.forEach(card => {
            if (this.cardMatchesFilters(card)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update results count
        this.updateResultsCount(visibleCount);
        
        // Show/hide no results message
        this.toggleNoResultsMessage(visibleCount === 0);
    }

    cardMatchesFilters(card) {
        // Get card metadata
        const cardData = this.extractCardData(card);
        
        // Check each active filter
        for (const [filterType, filterValue] of Object.entries(this.filters)) {
            if (!this.cardMatchesFilter(cardData, filterType, filterValue)) {
                return false;
            }
        }
        
        return true;
    }

    extractCardData(card) {
        // Extract data from card content and meta tags
        const title = card.querySelector('.resource-card-title')?.textContent || '';
        const description = card.querySelector('.resource-card-description')?.textContent || '';
        
        // Prioritize explicit data-tags attribute, fall back to reading from class
        const tags = card.dataset.tags ? card.dataset.tags.toLowerCase().split(',') : Array.from(card.querySelectorAll('.resource-tag')).map(tag => tag.textContent.toLowerCase());
        
        // Extract data attributes if they exist
        const dataset = card.dataset;
        
        return {
            title: title.toLowerCase(),
            description: description.toLowerCase(),
            tags,
            subject: dataset.subject || this.inferSubjectFromContent(title, description, tags),
            year: dataset.year || this.inferYearFromContent(tags),
            phase: dataset.phase || this.inferPhaseFromYear(dataset.year),
            type: dataset.type || this.inferTypeFromContent(title, description),
            duration: dataset.duration || this.inferDurationFromContent(tags)
        };
    }

    cardMatchesFilter(cardData, filterType, filterValue) {
        switch (filterType) {
            case 'subject-filter':
                return this.matchesSubject(cardData, filterValue);
            case 'year-filter':
                return this.matchesYear(cardData, filterValue);
            case 'phase-filter':
                return this.matchesPhase(cardData, filterValue);
            case 'tags-filter':
                // The 'tags-filter' now directly checks the tags array
                return cardData.tags.includes(filterValue);
            case 'type-filter':
                return this.matchesType(cardData, filterValue);
            case 'duration-filter':
                return this.matchesDuration(cardData, filterValue);
            default:
                return true;
        }
    }

    matchesSubject(cardData, subject) {
        if (cardData.subject && cardData.subject.includes(subject)) return true;
        
        // Check tags for subject indicators
        const subjectKeywords = {
            'humanities': ['humanities', 'social studies', 'history', 'treaty'],
            'te-ao-maori': ['te ao māori', 'māori', 'cultural', 'haka', 'te reo'],
            'english': ['english', 'writing', 'literacy', 'language', 'literature'],
            'stem': ['stem', 'science', 'technology', 'environmental'],
            'maths': ['maths', 'mathematics', 'probability', 'statistics', 'numeracy'],
            'arts': ['arts', 'creative', 'art movement', 'visual'],
            'tech': ['technology', 'digital', 'computer']
        };
        
        const keywords = subjectKeywords[subject] || [];
        return keywords.some(keyword => 
            cardData.title.includes(keyword) || 
            cardData.description.includes(keyword) ||
            cardData.tags.some(tag => tag.includes(keyword))
        );
    }

    matchesYear(cardData, year) {
        if (cardData.year && cardData.year.includes(year)) return true;
        
        // Check tags for year indicators
        return cardData.tags.some(tag => tag.includes(`year ${year}`) || tag.includes(`years ${year}`));
    }

    matchesPhase(cardData, phase) {
        if (cardData.phase && cardData.phase.includes(phase)) return true;
        
        const phaseKeywords = {
            'junior': ['junior', 'year 7', 'year 8', 'years 7-8'],
            'middle': ['middle', 'year 9', 'year 10', 'years 9-10'],
            'senior': ['senior', 'year 11', 'year 12', 'year 13', 'years 11-13']
        };
        
        const keywords = phaseKeywords[phase] || [];
        return keywords.some(keyword => 
            cardData.title.includes(keyword) || 
            cardData.description.includes(keyword) ||
            cardData.tags.some(tag => tag.includes(keyword))
        );
    }

    matchesTags(cardData, tag) {
        const tagKeywords = {
            'treaty-of-waitangi': ['treaty', 'waitangi'],
            'persuasive-writing': ['persuasive', 'argument', 'peel'],
            'media-literacy': ['media', 'literacy', 'bias'],
            'critical-thinking': ['critical', 'thinking', 'analysis'],
            'environmental': ['environmental', 'climate', 'ocean', 'sustainability'],
            'cultural': ['cultural', 'māori', 'haka', 'te ao']
        };
        
        const keywords = tagKeywords[tag] || [tag];
        return keywords.some(keyword => 
            cardData.title.includes(keyword) || 
            cardData.description.includes(keyword) ||
            cardData.tags.some(t => t.includes(keyword))
        );
    }

    matchesType(cardData, type) {
        if (cardData.type && cardData.type.includes(type)) return true;
        
        const typeKeywords = {
            'comprehension': ['comprehension', 'analysis', 'reading'],
            'writers-toolkit': ['writer', 'writing', 'toolkit', 'peel'],
            'educational': ['educational', 'learning'],
            'cultural': ['cultural', 'māori', 'te ao'],
            'interactive': ['interactive', 'game', 'kahoot'],
            'assessment': ['assessment', 'rubric', 'evaluation']
        };
        
        const keywords = typeKeywords[type] || [type];
        return keywords.some(keyword => 
            cardData.title.includes(keyword) || 
            cardData.description.includes(keyword) ||
            cardData.tags.some(tag => tag.includes(keyword))
        );
    }

    matchesDuration(cardData, duration) {
        if (cardData.duration && cardData.duration.includes(duration)) return true;
        
        // Check tags for duration indicators
        const durationKeywords = {
            'short': ['5 min', '8 min', '10 min', 'quick'],
            'medium': ['15 min', '20 min', '25 min', '30 min', 'standard'],
            'long': ['45 min', '40 min', '35 min', 'extended']
        };
        
        const keywords = durationKeywords[duration] || [];
        return keywords.some(keyword => 
            cardData.tags.some(tag => tag.includes(keyword))
        );
    }

    // Helper methods for inferring data from content
    inferSubjectFromContent(title, description, tags) {
        // Implementation for inferring subject from content
        if (title.includes('māori') || description.includes('māori')) return 'te-ao-maori';
        if (title.includes('probability') || title.includes('maths')) return 'maths';
        if (title.includes('science') || title.includes('environmental')) return 'stem';
        if (title.includes('writing') || title.includes('english')) return 'english';
        if (title.includes('history') || title.includes('treaty')) return 'humanities';
        return 'general';
    }

    inferYearFromContent(tags) {
        for (const tag of tags) {
            if (tag.includes('year')) {
                const match = tag.match(/year (\d+)/);
                if (match) return match[1];
            }
        }
        return null;
    }

    inferPhaseFromYear(year) {
        if (!year) return null;
        const yearNum = parseInt(year);
        if (yearNum <= 8) return 'junior';
        if (yearNum <= 10) return 'middle';
        return 'senior';
    }

    inferTypeFromContent(title, description) {
        if (title.includes('comprehension') || description.includes('analysis')) return 'comprehension';
        if (title.includes('writer') || title.includes('toolkit')) return 'writers-toolkit';
        if (title.includes('game') || title.includes('interactive')) return 'interactive';
        return 'general';
    }

    inferDurationFromContent(tags) {
        for (const tag of tags) {
            if (tag.includes('min')) {
                const minutes = parseInt(tag);
                if (minutes <= 10) return 'short';
                if (minutes <= 30) return 'medium';
                return 'long';
            }
        }
        return null;
    }

    loadFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        
        // Map URL parameters to filter IDs
        const paramMap = {
            'filter': 'subject-filter',
            'year': 'year-filter',
            'phase': 'phase-filter',
            'type': 'type-filter',
            'tags': 'tags-filter',
            'duration': 'duration-filter'
        };
        
        for (const [param, filterId] of Object.entries(paramMap)) {
            const value = urlParams.get(param);
            if (value) {
                this.filters[filterId] = value;
                const dropdown = document.getElementById(filterId);
                if (dropdown) {
                    dropdown.value = value;
                }
            }
        }
    }

    updateURL() {
        const url = new URL(window.location);
        url.search = ''; // Clear existing parameters
        
        // Map filter IDs back to URL parameters
        const filterMap = {
            'subject-filter': 'filter',
            'year-filter': 'year',
            'phase-filter': 'phase',
            'type-filter': 'type',
            'tags-filter': 'tags',
            'duration-filter': 'duration'
        };
        
        for (const [filterId, filterValue] of Object.entries(this.filters)) {
            const param = filterMap[filterId];
            if (param) {
                url.searchParams.set(param, filterValue);
            }
        }
        
        // Update URL without reloading page
        window.history.replaceState({}, '', url);
    }

    updateResultsCount(count) {
        let countElement = document.getElementById('results-count');
        if (!countElement) {
            countElement = document.createElement('p');
            countElement.id = 'results-count';
            countElement.style.cssText = 'margin-top: 1rem; color: var(--color-text-secondary); font-size: 0.9rem;';
            
            const filterBar = document.querySelector('.filter-bar');
            if (filterBar) {
                filterBar.appendChild(countElement);
            }
        }
        
        const total = this.resourceCards.length;
        countElement.textContent = `Showing ${count} of ${total} resources`;
    }

    toggleNoResultsMessage(show) {
        let noResultsElement = document.getElementById('no-results-message');
        
        if (show && !noResultsElement) {
            noResultsElement = document.createElement('div');
            noResultsElement.id = 'no-results-message';
            noResultsElement.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--color-text-secondary);">
                    <h3 style="margin-bottom: 1rem;">No resources found</h3>
                    <p>Try adjusting your filters or <a href="#" onclick="resourceFilter.clearAllFilters()" style="color: var(--color-secondary);">clear all filters</a> to see more results.</p>
                </div>
            `;
            
            const resourceGrid = document.querySelector('.resource-grid');
            if (resourceGrid) {
                resourceGrid.appendChild(noResultsElement);
            }
        } else if (!show && noResultsElement) {
            noResultsElement.remove();
        }
    }

    clearAllFilters() {
        this.filters = {};
        this.filterDropdowns.forEach(dropdown => {
            dropdown.value = '';
        });
        this.updateURL();
        this.applyFilters();
    }
}

// Initialize the filtering system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.resourceFilter = new ResourceFilter();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .resource-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);