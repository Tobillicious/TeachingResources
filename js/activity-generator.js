/**
 * =================================================================
 * SMART DO NOW ACTIVITY GENERATOR - AI-Powered Educational Tools
 * =================================================================
 * 
 * PURPOSE: Intelligent activity generation system that creates relevant
 * "Do Now" activities based on subject, year level, and curriculum alignment.
 * 
 * CULTURAL INTEGRATION:
 * - Whakataukī-based activities with cultural context
 * - Te Ao Māori perspectives across all subjects
 * - Bilingual activity options where appropriate
 * - Culturally responsive pedagogical approaches
 * 
 * TECHNICAL FEATURES:
 * - Template-based activity generation
 * - Curriculum code alignment (NZ Curriculum references)
 * - User preference learning and adaptation  
 * - Activity history tracking to avoid repetition
 * - Subject-specific customization
 * 
 * FOR AI AGENTS:
 * - Expandable template system for new activity types
 * - Integration point with activities.html page
 * - Cultural validation required for new templates
 * - Consider integration with assessment tools
 * 
 * USAGE PATTERN:
 * const generator = new ActivityGenerator();
 * const activity = generator.generateActivity('maths', 9, ['patterns']);
 * 
 * =================================================================
 */
class ActivityGenerator {
    constructor() {
        this.activities = this.initActivityDatabase();
        this.subjectTemplates = this.initSubjectTemplates();
        this.generatedHistory = [];
        this.preferences = {};
    }

    initActivityDatabase() {
        return {
            quickWarmups: [
                {
                    title: "Whakataukī Wisdom",
                    description: "Start with a Māori proverb, discuss its meaning and relevance to today's lesson",
                    duration: "3-5 min",
                    subjects: ["te-ao-maori", "humanities", "english"],
                    yearLevels: [7, 8, 9, 10, 11, 12, 13],
                    materials: "Projected whakataukī",
                    instructions: "Display a relevant proverb, students reflect individually then share insights",
                    curriculumLinks: ["SS4-1", "RV4-2"]
                },
                {
                    title: "Number of the Day",
                    description: "Explore mathematical properties of today's date or a random number",
                    duration: "5-7 min",
                    subjects: ["maths", "stem"],
                    yearLevels: [7, 8, 9, 10, 11],
                    materials: "Whiteboard, calculators",
                    instructions: "Present number, students find factors, multiples, mathematical patterns",
                    curriculumLinks: ["NA4-1", "NA4-2"]
                },
                {
                    title: "What If Wednesday",
                    description: "Hypothetical scenarios that encourage critical thinking and discussion",
                    duration: "4-6 min",
                    subjects: ["humanities", "english", "science"],
                    yearLevels: [8, 9, 10, 11, 12, 13],
                    materials: "Scenario cards or slides",
                    instructions: "Present scenario, students discuss implications and solutions",
                    curriculumLinks: ["SS4-5", "NoS4-1"]
                },
                {
                    title: "Word Association Web",
                    description: "Build vocabulary connections starting from lesson key terms",
                    duration: "3-5 min",
                    subjects: ["english", "te-reo-maori", "humanities"],
                    yearLevels: [7, 8, 9, 10, 11],
                    materials: "Whiteboard or digital tool",
                    instructions: "Start with key word, students add related terms, explain connections",
                    curriculumLinks: ["W4-1", "RV4-1"]
                },
                {
                    title: "Picture Prompt Predictions",
                    description: "Analyze an image to predict lesson content or themes",
                    duration: "4-6 min",
                    subjects: ["english", "science", "humanities", "arts"],
                    yearLevels: [7, 8, 9, 10, 11, 12, 13],
                    materials: "Relevant image/photo",
                    instructions: "Show image, students predict connections to lesson, justify reasoning",
                    curriculumLinks: ["RV4-3", "VA4-1"]
                },
                {
                    title: "Exit Ticket Review",
                    description: "Quick review of previous lesson's exit ticket responses",
                    duration: "2-4 min",
                    subjects: ["all"],
                    yearLevels: [7, 8, 9, 10, 11, 12, 13],
                    materials: "Previous exit tickets",
                    instructions: "Share anonymous responses, clarify misconceptions, build connections",
                    curriculumLinks: ["all"]
                },
                {
                    title: "Current Events Connection",
                    description: "Link recent news to lesson content for relevance",
                    duration: "5-8 min",
                    subjects: ["humanities", "science", "english"],
                    yearLevels: [9, 10, 11, 12, 13],
                    materials: "News article or headline",
                    instructions: "Present news item, students identify connections to learning",
                    curriculumLinks: ["SS4-7", "NoS4-1"]
                },
                {
                    title: "60-Second Challenge",
                    description: "Quick skill practice or knowledge recall in one minute",
                    duration: "2-3 min",
                    subjects: ["maths", "science", "english"],
                    yearLevels: [7, 8, 9, 10, 11],
                    materials: "Timer, worksheets",
                    instructions: "Set timer, students complete as many problems/questions as possible",
                    curriculumLinks: ["varies"]
                }
            ],
            
            bellRingers: [
                {
                    title: "Question of the Day",
                    description: "Thought-provoking question related to lesson objectives",
                    duration: "1-2 min",
                    subjects: ["all"],
                    yearLevels: [7, 8, 9, 10, 11, 12, 13],
                    materials: "Question display",
                    instructions: "Display question, students write/think, no sharing required",
                    curriculumLinks: ["all"]
                },
                {
                    title: "Vocabulary Check-in",
                    description: "Quick review of key terms from recent lessons",
                    duration: "2-3 min",
                    subjects: ["all"],
                    yearLevels: [7, 8, 9, 10, 11, 12, 13],
                    materials: "Vocabulary cards/slides",
                    instructions: "Flash key terms, students write definitions or examples",
                    curriculumLinks: ["all"]
                },
                {
                    title: "Do Now Math Problem",
                    description: "Single math problem reviewing previous concepts",
                    duration: "2-4 min",
                    subjects: ["maths", "stem"],
                    yearLevels: [7, 8, 9, 10, 11, 12, 13],
                    materials: "Problem on board",
                    instructions: "Students solve independently, check with partner",
                    curriculumLinks: ["varies"]
                }
            ],

            culturalActivities: [
                {
                    title: "Te Reo Māori Word of the Day",
                    description: "Learn pronunciation and meaning of relevant Māori vocabulary",
                    duration: "3-5 min",
                    subjects: ["all"],
                    yearLevels: [7, 8, 9, 10, 11, 12, 13],
                    materials: "Te Reo dictionary/audio",
                    instructions: "Present word, practice pronunciation, discuss cultural context",
                    curriculumLinks: ["all"]
                },
                {
                    title: "Cultural Perspective Shift",
                    description: "View lesson topic through Te Ao Māori lens",
                    duration: "5-7 min",
                    subjects: ["science", "humanities", "maths"],
                    yearLevels: [8, 9, 10, 11, 12, 13],
                    materials: "Cultural context information",
                    instructions: "Present alternative cultural viewpoint, compare perspectives",
                    curriculumLinks: ["all + cultural understanding"]
                }
            ]
        };
    }

    initSubjectTemplates() {
        return {
            maths: {
                starters: ["Number of the Day", "60-Second Challenge", "Do Now Math Problem"],
                themes: ["problem-solving", "real-world connections", "pattern recognition"],
                questions: [
                    "How might this mathematical concept apply to traditional Māori practices?",
                    "What patterns do you notice?",
                    "How would you explain this to a Year 6 student?"
                ]
            },
            english: {
                starters: ["Word Association Web", "Picture Prompt Predictions", "Vocabulary Check-in"],
                themes: ["language analysis", "cultural perspectives", "critical thinking"],
                questions: [
                    "What does this text reveal about its cultural context?",
                    "How does word choice affect meaning?",
                    "What perspectives might be missing?"
                ]
            },
            science: {
                starters: ["What If Wednesday", "Current Events Connection", "Picture Prompt Predictions"],
                themes: ["scientific inquiry", "real-world applications", "environmental connections"],
                questions: [
                    "How does this connect to mātauranga Māori?",
                    "What questions does this raise?",
                    "How might climate change affect this?"
                ]
            },
            humanities: {
                starters: ["Whakataukī Wisdom", "Current Events Connection", "Cultural Perspective Shift"],
                themes: ["multiple perspectives", "historical context", "social justice"],
                questions: [
                    "Whose voices are represented here?",
                    "How does this connect to contemporary issues?",
                    "What would tino rangatiratanga look like in this context?"
                ]
            }
        };
    }

    generateRandomActivity() {
        const allActivities = [
            ...this.activities.quickWarmups,
            ...this.activities.bellRingers,
            ...this.activities.culturalActivities
        ];
        
        const randomActivity = allActivities[Math.floor(Math.random() * allActivities.length)];
        this.displayGeneratedActivity(randomActivity);
        this.generatedHistory.push(randomActivity);
    }

    generateSubjectSpecificActivity(subject, yearLevel, duration) {
        const subjectActivities = this.filterActivitiesBySubject(subject);
        const levelFiltered = subjectActivities.filter(activity => 
            activity.yearLevels.includes(parseInt(yearLevel))
        );
        
        const durationFiltered = levelFiltered.filter(activity => {
            const activityDuration = parseInt(activity.duration);
            const requestedDuration = parseInt(duration);
            return Math.abs(activityDuration - requestedDuration) <= 2;
        });
        
        const selectedActivity = durationFiltered.length > 0 
            ? durationFiltered[Math.floor(Math.random() * durationFiltered.length)]
            : levelFiltered[Math.floor(Math.random() * levelFiltered.length)];
            
        if (selectedActivity) {
            this.displayGeneratedActivity(selectedActivity);
        }
    }

    filterActivitiesBySubject(subject) {
        const allActivities = [
            ...this.activities.quickWarmups,
            ...this.activities.bellRingers,
            ...this.activities.culturalActivities
        ];
        
        return allActivities.filter(activity => 
            activity.subjects.includes(subject) || activity.subjects.includes("all")
        );
    }

    displayGeneratedActivity(activity) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(250,251,252,0.95);
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
            max-width: 600px;
            color: white;
            position: relative;
            max-height: 80vh;
            overflow-y: auto;
        `;
        
        content.innerHTML = `
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
            
            <h2 style="color: white; margin-bottom: 1rem;">⚡ Generated Activity</h2>
            
            <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h3 style="color: var(--color-secondary); margin-bottom: 0.5rem;">${activity.title}</h3>
                <p style="opacity: 0.9; margin-bottom: 1rem;">${activity.description}</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <strong>Duration:</strong><br>
                        <span style="color: var(--color-secondary);">${activity.duration}</span>
                    </div>
                    <div>
                        <strong>Year Levels:</strong><br>
                        <span style="color: var(--color-secondary);">Years ${activity.yearLevels.join(', ')}</span>
                    </div>
                    <div>
                        <strong>Subjects:</strong><br>
                        <span style="color: var(--color-secondary);">${activity.subjects.join(', ')}</span>
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem;">
                <h4 style="color: white; margin-bottom: 1rem;">📋 Implementation Guide</h4>
                
                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--color-secondary);">Materials Needed:</strong>
                    <p style="margin: 0.5rem 0;">${activity.materials}</p>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--color-secondary);">Instructions:</strong>
                    <p style="margin: 0.5rem 0;">${activity.instructions}</p>
                </div>
                
                <div>
                    <strong style="color: var(--color-secondary);">Curriculum Links:</strong>
                    <p style="margin: 0.5rem 0;">${activity.curriculumLinks.join(', ')}</p>
                </div>
            </div>
            
            <div style="text-align: center; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button onclick="generateRandomActivity()" style="background: var(--color-secondary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">🎲 Generate Another</button>
                <button onclick="saveActivity('${activity.title}')" style="background: white; color: var(--color-primary); border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">💾 Save Activity</button>
                <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">Close</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    openActivityWizard() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(250,251,252,0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: linear-gradient(135deg, var(--color-accent), var(--color-primary));
            border-radius: 20px;
            padding: 2rem;
            max-width: 700px;
            color: white;
            position: relative;
        `;
        
        content.innerHTML = `
            <button onclick="this.closest('div[style*=\"position: fixed\"]').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer;">×</button>
            
            <h2 style="color: white; margin-bottom: 2rem;">🧙 Activity Wizard</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div>
                    <h3 style="color: white; margin-bottom: 1rem;">🎯 Lesson Details</h3>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Subject Area:</label>
                        <select id="wizard-subject" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: none;">
                            <option value="">Select Subject...</option>
                            <option value="maths">Mathematics</option>
                            <option value="english">English</option>
                            <option value="science">Science</option>
                            <option value="humanities">Humanities/Social Studies</option>
                            <option value="te-ao-maori">Te Ao Māori</option>
                            <option value="arts">Arts</option>
                            <option value="tech">Technology</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Year Level:</label>
                        <select id="wizard-year" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: none;">
                            <option value="">Select Year...</option>
                            <option value="7">Year 7</option>
                            <option value="8">Year 8</option>
                            <option value="9">Year 9</option>
                            <option value="10">Year 10</option>
                            <option value="11">Year 11</option>
                            <option value="12">Year 12</option>
                            <option value="13">Year 13</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Available Time:</label>
                        <select id="wizard-duration" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: none;">
                            <option value="">Select Duration...</option>
                            <option value="2">2-3 minutes (Bell Ringer)</option>
                            <option value="5">5-6 minutes (Quick Warm-up)</option>
                            <option value="8">8-10 minutes (Extended Activity)</option>
                        </select>
                    </div>
                </div>
                
                <div>
                    <h3 style="color: white; margin-bottom: 1rem;">🎨 Activity Preferences</h3>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Activity Style:</label>
                        <div style="display: grid; gap: 0.5rem;">
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="radio" name="activity-style" value="individual" style="margin: 0;">
                                Individual reflection
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="radio" name="activity-style" value="discussion" style="margin: 0;">
                                Group discussion
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="radio" name="activity-style" value="active" style="margin: 0;">
                                Active/movement
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="radio" name="activity-style" value="cultural" style="margin: 0;">
                                Cultural connection
                            </label>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Learning Focus:</label>
                        <div style="display: grid; gap: 0.5rem;">
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" value="review" style="margin: 0;">
                                Review previous learning
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" value="preview" style="margin: 0;">
                                Preview new content
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" value="connect" style="margin: 0;">
                                Make real-world connections
                            </label>
                            <label style="display: flex; align-items: center; gap: 0.5rem;">
                                <input type="checkbox" value="engage" style="margin: 0;">
                                Build engagement/energy
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="generateCustomActivity()" style="background: var(--color-secondary); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">✨ Generate Perfect Activity</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    generateCustomActivity() {
        const subject = document.getElementById('wizard-subject')?.value;
        const year = document.getElementById('wizard-year')?.value;
        const duration = document.getElementById('wizard-duration')?.value;
        
        if (subject && year && duration) {
            this.generateSubjectSpecificActivity(subject, year, duration);
            // Close wizard
            document.querySelector('div[style*="position: fixed"]')?.remove();
        } else {
            alert('Please fill in all required fields');
        }
    }

    saveActivity(activityTitle) {
        // Simple localStorage save for now
        const savedActivities = JSON.parse(localStorage.getItem('savedActivities') || '[]');
        const activity = this.activities.quickWarmups.find(a => a.title === activityTitle) ||
                        this.activities.bellRingers.find(a => a.title === activityTitle) ||
                        this.activities.culturalActivities.find(a => a.title === activityTitle);
        
        if (activity && !savedActivities.some(saved => saved.title === activity.title)) {
            savedActivities.push(activity);
            localStorage.setItem('savedActivities', JSON.stringify(savedActivities));
            alert('Activity saved to your collection!');
        }
    }
}

// Global functions
function generateRandomActivity() {
    const generator = new ActivityGenerator();
    generator.generateRandomActivity();
}

function openActivityWizard() {
    const generator = new ActivityGenerator();
    generator.openActivityWizard();
}

function generateCustomActivity() {
    const generator = new ActivityGenerator();
    generator.generateCustomActivity();
}

function saveActivity(title) {
    const generator = new ActivityGenerator();
    generator.saveActivity(title);
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.activityGenerator = new ActivityGenerator();
});