// Curriculum Alignment Interactive Browser
class CurriculumBrowser {
    constructor() {
        this.resources = this.initResourceDatabase();
        this.initEventListeners();
    }

    initResourceDatabase() {
        return {
            handouts: [
                // Mathematics & Statistics
                {
                    title: "Probability Introduction",
                    path: "handouts/probability-handout.html",
                    subject: "mathematics",
                    level: "level-4",
                    type: "handout",
                    aos: ["S4-1"],
                    description: "Statistical enquiry and probability concepts"
                },
                {
                    title: "Bar Graph Analysis",
                    path: "handouts/bar-graph-handout.html",
                    subject: "mathematics",
                    level: "level-4",
                    type: "handout",
                    aos: ["S4-2"],
                    description: "Data representation and interpretation"
                },
                {
                    title: "Statistical Investigation",
                    path: "handouts/statistical-investigation-handout.html",
                    subject: "mathematics",
                    level: "level-4",
                    type: "handout",
                    aos: ["S4-1", "S4-3"],
                    description: "Complete statistical investigation process"
                },
                
                // Science
                {
                    title: "Scientific Method",
                    path: "handouts/scientific-method-handout.html",
                    subject: "science",
                    level: "level-4",
                    type: "handout",
                    aos: ["NoS4-1"],
                    description: "Investigation skills and scientific thinking"
                },
                {
                    title: "Plate Tectonics Comprehension",
                    path: "handouts/plate-tectonics-comprehension-handout.html",
                    subject: "science",
                    level: "level-4",
                    type: "handout",
                    aos: ["PEB4-1"],
                    description: "Earth's structure and geological processes"
                },
                
                // English
                {
                    title: "Writer's Toolkit - Revision",
                    path: "handouts/writers-toolkit-revision-handout.html",
                    subject: "english",
                    level: "level-4",
                    type: "handout",
                    aos: ["W4-5"],
                    description: "Writing process and revision strategies"
                },
                {
                    title: "Author's Purpose - Entertain",
                    path: "handouts/authors-purpose-entertain-handout.html",
                    subject: "english",
                    level: "level-4",
                    type: "handout",
                    aos: ["RV4-2"],
                    description: "Identifying and analyzing author's purpose"
                },
                {
                    title: "Shakespeare Soliloquy Analysis",
                    path: "handouts/shakespeare-soliloquy-handout.html",
                    subject: "english",
                    level: "level-4",
                    type: "handout",
                    aos: ["RV4-5"],
                    description: "Literary analysis and dramatic techniques"
                },
                {
                    title: "Film Scene Analysis",
                    path: "handouts/film-scene-analysis-handout.html",
                    subject: "english",
                    level: "level-4",
                    type: "handout",
                    aos: ["RV4-3"],
                    description: "Visual text analysis and media literacy"
                },
                
                // Social Sciences
                {
                    title: "Treaty of Waitangi",
                    path: "handouts/treaty-of-waitangi-handout.html",
                    subject: "social-sciences",
                    level: "level-4",
                    type: "handout",
                    aos: ["SS4-1"],
                    description: "New Zealand history and cultural understanding"
                },
                {
                    title: "Māori Astronomy & Navigation",
                    path: "handouts/maori-astronomy-navigation-handout.html",
                    subject: "social-sciences",
                    level: "level-4",
                    type: "handout",
                    aos: ["SS4-8"],
                    description: "Traditional knowledge and exploration"
                },
                
                // Digital Technologies
                {
                    title: "Digital Citizenship",
                    path: "handouts/digital-citizenship-handout.html",
                    subject: "digital-tech",
                    level: "level-4",
                    type: "handout",
                    aos: ["DC4-1"],
                    description: "Online safety and digital responsibility"
                },
                {
                    title: "Design Thinking Process",
                    path: "handouts/design-thinking-process-handout.html",
                    subject: "digital-tech",
                    level: "level-4",
                    type: "handout",
                    aos: ["DT4-1"],
                    description: "Technology design and problem-solving"
                }
            ],
            
            lessons: [
                {
                    title: "Unit 6 Lesson 1: Statistical Investigation",
                    path: "units/lessons/unit-6-lesson-1.html",
                    subject: "mathematics",
                    level: "level-4",
                    type: "lesson",
                    aos: ["S4-1", "S4-3"],
                    description: "Complete statistical investigation lesson"
                },
                {
                    title: "Unit 7 Lesson 2: AI Bias & Algorithmic Justice",
                    path: "units/lessons/unit-7-lesson-2.html",
                    subject: "digital-tech",
                    level: "level-4",
                    type: "lesson",
                    aos: ["DT4-2"],
                    description: "Technology impact on society"
                }
            ]
        };
    }

    initEventListeners() {
        const subjectFilter = document.getElementById('subject-filter');
        const levelFilter = document.getElementById('level-filter');
        const typeFilter = document.getElementById('type-filter');
        
        if (subjectFilter) {
            subjectFilter.addEventListener('change', () => this.filterResources());
        }
        if (levelFilter) {
            levelFilter.addEventListener('change', () => this.filterResources());
        }
        if (typeFilter) {
            typeFilter.addEventListener('change', () => this.filterResources());
        }
    }

    filterResources() {
        const subject = document.getElementById('subject-filter')?.value || '';
        const level = document.getElementById('level-filter')?.value || '';
        const type = document.getElementById('type-filter')?.value || '';
        
        let filteredResources = [];
        
        // Combine all resource types
        if (!type || type === 'handout') {
            filteredResources = [...filteredResources, ...this.resources.handouts];
        }
        if (!type || type === 'lesson') {
            filteredResources = [...filteredResources, ...this.resources.lessons];
        }
        
        // Apply filters
        filteredResources = filteredResources.filter(resource => {
            const matchesSubject = !subject || resource.subject === subject;
            const matchesLevel = !level || resource.level === level;
            const matchesType = !type || resource.type === type;
            
            return matchesSubject && matchesLevel && matchesType;
        });
        
        this.displayResults(filteredResources, { subject, level, type });
    }

    displayResults(resources, filters) {
        const resultsContainer = document.getElementById('resource-results');
        
        if (!resultsContainer) return;
        
        if (resources.length === 0) {
            resultsContainer.innerHTML = '<p style="opacity: 0.8;">No resources match your current filters. Try adjusting your selections.</p>';
            return;
        }
        
        let html = `<h3 style="color: white; margin-bottom: 1rem;">Found ${resources.length} resources</h3>`;
        
        resources.forEach(resource => {
            html += `
                <div style="background: rgba(255,255,255,0.1); margin-bottom: 1rem; padding: 1rem; border-radius: 8px; border-left: 4px solid #B8860B;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                        <h4 style="color: white; margin: 0;">
                            <a href="${resource.path}" style="color: white; text-decoration: none;">${resource.title}</a>
                        </h4>
                        <span style="background: #B8860B; color: white; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.8rem; text-transform: uppercase;">
                            ${resource.type}
                        </span>
                    </div>
                    <p style="margin: 0.5rem 0; opacity: 0.9; font-size: 0.9rem;">${resource.description}</p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                        ${resource.aos.map(ao => `<span style="background: rgba(255,255,255,0.2); padding: 0.25rem 0.5rem; border-radius: 8px; font-size: 0.8rem;">${ao}</span>`).join('')}
                        <span style="background: var(--color-accent); color: white; padding: 0.25rem 0.5rem; border-radius: 8px; font-size: 0.8rem; text-transform: capitalize;">
                            ${this.getSubjectLabel(resource.subject)}
                        </span>
                        <span style="background: var(--color-primary); color: white; padding: 0.25rem 0.5rem; border-radius: 8px; font-size: 0.8rem;">
                            ${resource.level.replace('-', ' ').toUpperCase()}
                        </span>
                    </div>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = html;
    }

    getSubjectLabel(subject) {
        const labels = {
            'mathematics': 'Mathematics & Statistics',
            'science': 'Science',
            'english': 'English',
            'social-sciences': 'Social Sciences',
            'digital-tech': 'Digital Technologies'
        };
        return labels[subject] || subject;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CurriculumBrowser();
});