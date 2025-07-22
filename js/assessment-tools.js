// Interactive Assessment Tools for Te Kete Ako Lessons
class AssessmentTools {
    constructor() {
        this.currentRubric = null;
        this.exitTicketTemplates = this.initExitTicketTemplates();
        this.progressData = {};
        this.initEventListeners();
    }

    initExitTicketTemplates() {
        return {
            'rangatiratanga': [
                "One aspect of rangatiratanga that excited me today was...",
                "A challenge I see for achieving tino rangatiratanga by 2050 is...",
                "My next step in this learning journey is...",
                "The most important connection I made between past and future was...",
                "One question I still have about Māori self-determination is..."
            ],
            'cultural-analysis': [
                "The cultural perspective that most challenged my thinking was...",
                "I now understand that culture is important because...",
                "One similarity I found between different cultures was...",
                "A new question I have about Te Ao Māori is...",
                "This learning connects to my own experience by..."
            ],
            'writing-techniques': [
                "The writing technique I found most useful today was...",
                "I could apply this technique to improve my writing by...",
                "One challenge I had with today's writing task was...",
                "The example that helped me understand best was...",
                "My writing goal for next lesson is..."
            ],
            'critical-thinking': [
                "The most surprising perspective I encountered was...",
                "I changed my mind about...",
                "The strongest evidence presented today was...",
                "One bias I noticed (in myself or others) was...",
                "A question this raises for me is..."
            ]
        };
    }

    showRubricModal() {
        const modal = document.createElement('div');
        modal.className = 'assessment-modal';
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
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        `;
        
        content.innerHTML = `
            <button onclick="this.closest('.assessment-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">📊 Comprehensive Assessment Rubric</h2>
            
            <div style="display: grid; gap: 1.5rem;">
                <div style="border: 2px solid var(--color-accent); border-radius: 12px; padding: 1.5rem;">
                    <h3 style="color: var(--color-accent); margin-bottom: 1rem;">Cultural Understanding & Respect</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; font-size: 0.9rem;">
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #28a745;">Exemplary (4)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Deep respect for Māori worldviews</li>
                                <li>Makes sophisticated cultural connections</li>
                                <li>Uses Te Reo appropriately</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #17a2b8;">Proficient (3)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Shows understanding of cultural concepts</li>
                                <li>Respectful engagement</li>
                                <li>Some cultural connections made</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #ffc107;">Developing (2)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Basic cultural awareness</li>
                                <li>Respectful but limited engagement</li>
                                <li>Few cultural connections</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #dc3545;">Beginning (1)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Limited cultural understanding</li>
                                <li>May show misconceptions</li>
                                <li>Minimal engagement</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div style="border: 2px solid var(--color-primary); border-radius: 12px; padding: 1.5rem;">
                    <h3 style="color: var(--color-primary); margin-bottom: 1rem;">Critical Thinking & Analysis</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; font-size: 0.9rem;">
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #28a745;">Exemplary (4)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Complex, nuanced thinking</li>
                                <li>Connects multiple perspectives</li>
                                <li>Questions assumptions</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #17a2b8;">Proficient (3)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Clear analytical thinking</li>
                                <li>Makes logical connections</li>
                                <li>Some questioning of ideas</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #ffc107;">Developing (2)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Basic analysis present</li>
                                <li>Simple connections made</li>
                                <li>Limited questioning</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #dc3545;">Beginning (1)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Minimal analysis</li>
                                <li>Difficulty making connections</li>
                                <li>Accepts information uncritically</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div style="border: 2px solid var(--color-secondary); border-radius: 12px; padding: 1.5rem;">
                    <h3 style="color: var(--color-secondary); margin-bottom: 1rem;">Collaboration & Communication</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; font-size: 0.9rem;">
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #28a745;">Exemplary (4)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Facilitates others' learning</li>
                                <li>Clear, respectful communication</li>
                                <li>Builds on others' ideas</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #17a2b8;">Proficient (3)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Contributes meaningfully</li>
                                <li>Listens actively</li>
                                <li>Shares ideas clearly</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #ffc107;">Developing (2)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Participates when prompted</li>
                                <li>Basic listening skills</li>
                                <li>Simple contributions</li>
                            </ul>
                        </div>
                        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                            <h4 style="color: #dc3545;">Beginning (1)</h4>
                            <ul style="margin: 0.5rem 0;">
                                <li>Limited participation</li>
                                <li>Difficulty communicating ideas</li>
                                <li>Minimal collaboration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 2rem; text-align: center;">
                <button onclick="this.closest('.assessment-modal').remove()" style="background: var(--color-primary); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; font-size: 1.1rem; cursor: pointer;">Close Rubric</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    generateExitTicket() {
        const lessonType = this.detectLessonType();
        const templates = this.exitTicketTemplates[lessonType] || this.exitTicketTemplates['critical-thinking'];
        const randomQuestions = this.getRandomQuestions(templates, 3);
        
        const modal = document.createElement('div');
        modal.className = 'assessment-modal';
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
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 600px;
            position: relative;
        `;
        
        content.innerHTML = `
            <button onclick="this.closest('.assessment-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">🎫 Exit Ticket</h2>
            <p style="color: var(--color-text-secondary); margin-bottom: 2rem;">Quick reflection questions for lesson closure</p>
            
            <div style="space-y: 1.5rem;">
                ${randomQuestions.map((question, index) => `
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-weight: bold; margin-bottom: 0.5rem; color: var(--color-primary);">${index + 1}. ${question}</label>
                        <textarea style="width: 100%; min-height: 80px; padding: 0.75rem; border: 2px solid #e9ecef; border-radius: 8px; font-family: inherit;" placeholder="Your response..."></textarea>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 2rem; text-align: center; display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.generateNewTicket()" style="background: var(--color-accent); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">🔄 Generate New Questions</button>
                <button onclick="this.closest('.assessment-modal').remove()" style="background: var(--color-primary); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 25px; cursor: pointer;">Done</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    openProgressTracker() {
        const modal = document.createElement('div');
        modal.className = 'assessment-modal';
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
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 700px;
            position: relative;
        `;
        
        content.innerHTML = `
            <button onclick="this.closest('.assessment-modal').remove()" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
            
            <h2 style="color: var(--color-primary); margin-bottom: 1.5rem;">📊 Student Progress Tracker</h2>
            
            <div style="background: var(--color-cultural-light); padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem;">
                <h3>Learning Objectives Progress</h3>
                <div style="display: grid; gap: 1rem; margin-top: 1rem;">
                    <div class="progress-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border-radius: 8px;">
                        <span style="font-weight: bold;">Cultural Understanding & Respect</span>
                        <div class="progress-dots" style="display: flex; gap: 0.5rem;">
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-accent); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-accent); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-accent); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-accent); cursor: pointer; transition: all 0.3s;"></span>
                        </div>
                    </div>
                    <div class="progress-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border-radius: 8px;">
                        <span style="font-weight: bold;">Vision Development & Future Thinking</span>
                        <div class="progress-dots" style="display: flex; gap: 0.5rem;">
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-primary); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-primary); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-primary); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-primary); cursor: pointer; transition: all 0.3s;"></span>
                        </div>
                    </div>
                    <div class="progress-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border-radius: 8px;">
                        <span style="font-weight: bold;">Collaboration & Communication</span>
                        <div class="progress-dots" style="display: flex; gap: 0.5rem;">
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-secondary); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-secondary); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-secondary); cursor: pointer; transition: all 0.3s;"></span>
                            <span class="dot" onclick="this.classList.toggle('active')" style="width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--color-secondary); cursor: pointer; transition: all 0.3s;"></span>
                        </div>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 1rem; font-size: 0.9rem; color: var(--color-text-secondary);">Click dots to mark progress: 1=Beginning, 2=Developing, 3=Proficient, 4=Exemplary</p>
            </div>
            
            <div style="text-align: center;">
                <button onclick="this.closest('.assessment-modal').remove()" style="background: var(--color-primary); color: white; border: none; padding: 1rem 2rem; border-radius: 25px; cursor: pointer;">Save Progress</button>
            </div>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        // Add CSS for active dots
        const style = document.createElement('style');
        style.textContent = `
            .dot.active {
                background-color: currentColor !important;
            }
        `;
        document.head.appendChild(style);
    }

    detectLessonType() {
        const pageContent = document.body.textContent.toLowerCase();
        if (pageContent.includes('rangatiratanga') || pageContent.includes('māori') || pageContent.includes('tino')) {
            return 'rangatiratanga';
        } else if (pageContent.includes('cultural') || pageContent.includes('culture')) {
            return 'cultural-analysis';
        } else if (pageContent.includes('writing') || pageContent.includes('author')) {
            return 'writing-techniques';
        }
        return 'critical-thinking';
    }

    getRandomQuestions(questions, count) {
        const shuffled = [...questions].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    initEventListeners() {
        // Global functions for onclick handlers
        window.showRubricModal = () => this.showRubricModal();
        window.generateExitTicket = () => this.generateExitTicket();
        window.openProgressTracker = () => this.openProgressTracker();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AssessmentTools();
});