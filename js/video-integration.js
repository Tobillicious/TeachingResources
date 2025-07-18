/**
 * Educational Video Integration System
 * Provides curated YouTube videos aligned with New Zealand curriculum
 */

// Comprehensive video database organized by subject and difficulty level
const EDUCATIONAL_VIDEOS = {
    // Science - Plate Tectonics & Geology
    'plate-tectonics': {
        beginner: [
            {
                id: 'YC5KTKe0ysg',
                title: 'Plate Tectonics Explained',
                channel: 'National Geographic Kids',
                duration: '3:41',
                description: 'Simple explanation of how Earth\'s plates move and create earthquakes and volcanoes.',
                curriculum_links: ['Year 7-8 Earth & Space Science'],
                learning_objectives: ['Understand basic plate movement', 'Identify plate boundaries']
            },
            {
                id: 'ryrXAGY1dmE',
                title: 'What are Tectonic Plates?',
                channel: 'Crash Course Kids',
                duration: '4:12',
                description: 'Kid-friendly introduction to tectonic plates and how they shape our planet.',
                curriculum_links: ['Year 7-8 Earth & Space Science'],
                learning_objectives: ['Define tectonic plates', 'Explain continental drift']
            }
        ],
        intermediate: [
            {
                id: 'MapTtBcAV9s',
                title: 'Plate Tectonics Theory Explained',
                channel: 'Bozeman Science',
                duration: '7:53',
                description: 'Comprehensive overview of plate tectonics theory and evidence.',
                curriculum_links: ['Year 9-10 Earth & Space Science'],
                learning_objectives: ['Analyze evidence for plate tectonics', 'Explain different plate boundaries']
            },
            {
                id: 'UwWWuttntio',
                title: 'New Zealand\'s Geology',
                channel: 'GNS Science',
                duration: '5:24',
                description: 'How New Zealand\'s unique position affects its geological features.',
                curriculum_links: ['Year 9-10 Earth & Space Science', 'New Zealand context'],
                learning_objectives: ['Connect plate tectonics to NZ geography', 'Understand local geological hazards']
            }
        ],
        advanced: [
            {
                id: 'hSdlQ8x7MuY',
                title: 'Ring of Fire Explained',
                channel: 'MinuteEarth',
                duration: '3:11',
                description: 'Why the Pacific Ring of Fire is so geologically active.',
                curriculum_links: ['Year 11+ Earth & Space Science'],
                learning_objectives: ['Analyze Pacific plate interactions', 'Evaluate geological risks']
            }
        ]
    },

    // Mathematics - Probability
    'probability': {
        beginner: [
            {
                id: 'uzkc-qNVoOk',
                title: 'Introduction to Probability',
                channel: 'Khan Academy',
                duration: '8:28',
                description: 'Basic probability concepts using everyday examples.',
                curriculum_links: ['Year 7-8 Statistics'],
                learning_objectives: ['Understand probability scale', 'Calculate simple probabilities']
            },
            {
                id: 'VjLEoo3hIoM',
                title: 'Probability with Coins and Dice',
                channel: 'Math Antics',
                duration: '11:21',
                description: 'Hands-on probability examples with coins, dice, and cards.',
                curriculum_links: ['Year 7-8 Statistics'],
                learning_objectives: ['Apply probability formulas', 'Predict outcomes']
            }
        ],
        intermediate: [
            {
                id: 'xSc4oLA9e8o',
                title: 'Experimental vs Theoretical Probability',
                channel: 'Professor Dave Explains',
                duration: '6:34',
                description: 'Understanding the difference between experimental and theoretical probability.',
                curriculum_links: ['Year 9-10 Statistics'],
                learning_objectives: ['Compare experimental/theoretical results', 'Design probability experiments']
            }
        ],
        advanced: [
            {
                id: 'HZGCoVF3YvM',
                title: 'Compound Probability',
                channel: 'Khan Academy',
                duration: '9:43',
                description: 'Advanced probability including independent and dependent events.',
                curriculum_links: ['Year 11+ Statistics'],
                learning_objectives: ['Calculate compound probabilities', 'Apply probability trees']
            }
        ]
    },

    // English - Author's Purpose
    'authors-purpose': {
        beginner: [
            {
                id: '21CrtWnhWhA',
                title: 'Author\'s Purpose: PIE (Persuade, Inform, Entertain)',
                channel: 'Flocabulary',
                duration: '3:23',
                description: 'Catchy introduction to the three main purposes authors have for writing.',
                curriculum_links: ['Year 7-8 English'],
                learning_objectives: ['Identify author\'s purpose', 'Recognize PIE in texts']
            },
            {
                id: 'yk3tlgA1ACE',
                title: 'Persuasive Writing Techniques',
                channel: 'Crash Course Kids',
                duration: '4:27',
                description: 'How authors use different techniques to persuade readers.',
                curriculum_links: ['Year 7-8 English'],
                learning_objectives: ['Recognize persuasive techniques', 'Analyze persuasive texts']
            }
        ],
        intermediate: [
            {
                id: 'QrZZi0GCNjY',
                title: 'Rhetorical Appeals: Ethos, Pathos, Logos',
                channel: 'Crash Course',
                duration: '9:41',
                description: 'Understanding the three classical rhetorical appeals.',
                curriculum_links: ['Year 9-10 English'],
                learning_objectives: ['Identify rhetorical appeals', 'Evaluate argument effectiveness']
            },
            {
                id: 'ScV5amQaVks',
                title: 'Analyzing Bias in Media',
                channel: 'Common Sense Education',
                duration: '2:47',
                description: 'How to identify bias and author\'s purpose in news and media.',
                curriculum_links: ['Year 9-10 English', 'Media Studies'],
                learning_objectives: ['Detect bias in texts', 'Evaluate source credibility']
            }
        ],
        advanced: [
            {
                id: 'p1ukPJmO5xQ',
                title: 'Advanced Argument Analysis',
                channel: 'The Art of Improvement',
                duration: '8:16',
                description: 'Deep analysis of argumentative structures and fallacies.',
                curriculum_links: ['Year 11+ English'],
                learning_objectives: ['Deconstruct complex arguments', 'Identify logical fallacies']
            }
        ]
    },

    // New Zealand History - Treaty of Waitangi
    'treaty-waitangi': {
        beginner: [
            {
                id: 'R7tXm_fzMZo',
                title: 'Treaty of Waitangi Explained for Kids',
                channel: 'NZ On Screen',
                duration: '4:15',
                description: 'Simple explanation of New Zealand\'s founding document.',
                curriculum_links: ['Year 7-8 Social Studies', 'New Zealand History'],
                learning_objectives: ['Understand Treaty basics', 'Recognize historical significance']
            },
            {
                id: 'ZjnrHPQ6hHQ',
                title: 'Why the Treaty was Signed',
                channel: 'NZ History',
                duration: '6:32',
                description: 'Historical context and reasons behind the Treaty signing.',
                curriculum_links: ['Year 7-8 Social Studies'],
                learning_objectives: ['Identify historical causes', 'Understand multiple perspectives']
            }
        ],
        intermediate: [
            {
                id: 'yk9TpqCmyDI',
                title: 'Treaty Settlements Today',
                channel: 'RNZ',
                duration: '8:47',
                description: 'How Treaty settlements work in modern New Zealand.',
                curriculum_links: ['Year 9-10 Social Studies'],
                learning_objectives: ['Connect past to present', 'Analyze ongoing Treaty issues']
            }
        ],
        advanced: [
            {
                id: 'GH-z4Y8QO3w',
                title: 'Treaty Principles and Their Application',
                channel: 'Massey University',
                duration: '12:34',
                description: 'In-depth analysis of Treaty principles in contemporary NZ.',
                curriculum_links: ['Year 11+ Social Studies', 'Legal Studies'],
                learning_objectives: ['Evaluate Treaty principles', 'Analyze legal implications']
            }
        ]
    }
};

/**
 * Generate YouTube embed URL with accessibility and privacy settings
 * @param {string} videoId - YouTube video ID
 * @param {Object} options - Embed options
 * @returns {string} Formatted embed URL
 */
function generateEmbedURL(videoId, options = {}) {
    const baseURL = 'https://www.youtube-nocookie.com/embed/';
    const params = new URLSearchParams({
        modestbranding: '1',
        rel: '0',
        cc_load_policy: '1', // Enable captions by default
        enablejsapi: '1',
        origin: window.location.origin,
        ...options
    });
    
    return `${baseURL}${videoId}?${params.toString()}`;
}

/**
 * Create responsive video player HTML
 * @param {Object} video - Video object from database
 * @param {string} difficulty - Difficulty level
 * @returns {string} HTML for video player
 */
function createVideoPlayerHTML(video, difficulty) {
    const embedURL = generateEmbedURL(video.id);
    const difficultyColors = {
        beginner: 'bg-green-100 text-green-800 border-green-200',
        intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        advanced: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return `
        <div class="video-container bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
            <div class="video-header mb-3">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="text-lg font-semibold text-gray-800">${video.title}</h4>
                    <span class="px-2 py-1 text-xs font-medium rounded-full border ${difficultyColors[difficulty]}">
                        ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </span>
                </div>
                <div class="text-sm text-gray-600 mb-2">
                    <span class="font-medium">${video.channel}</span> • ${video.duration}
                </div>
                <p class="text-sm text-gray-700 mb-3">${video.description}</p>
            </div>
            
            <div class="video-responsive-container relative overflow-hidden bg-black rounded-lg" style="padding-bottom: 56.25%; height: 0;">
                <iframe
                    src="${embedURL}"
                    class="absolute top-0 left-0 w-full h-full"
                    frameborder="0"
                    allowfullscreen
                    loading="lazy"
                    title="${video.title}"
                    aria-label="Educational video: ${video.title}">
                </iframe>
            </div>
            
            <div class="video-metadata mt-3">
                <div class="mb-2">
                    <h5 class="text-sm font-semibold text-gray-700 mb-1">Learning Objectives:</h5>
                    <ul class="text-xs text-gray-600 list-disc list-inside">
                        ${video.learning_objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h5 class="text-sm font-semibold text-gray-700 mb-1">Curriculum Links:</h5>
                    <div class="flex flex-wrap gap-1">
                        ${video.curriculum_links.map(link => 
                            `<span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">${link}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create video section for a handout
 * @param {string} subject - Subject key from EDUCATIONAL_VIDEOS
 * @param {Array} selectedDifficulties - Array of difficulty levels to include
 * @returns {string} Complete HTML for video section
 */
function createVideoSection(subject, selectedDifficulties = ['beginner', 'intermediate']) {
    const videos = EDUCATIONAL_VIDEOS[subject];
    if (!videos) return '';
    
    let sectionHTML = `
        <section class="video-section no-print mt-8 p-6 bg-white border-2 border-blue-200 rounded-xl">
            <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <svg class="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                </svg>
                Educational Videos
            </h3>
            <p class="text-gray-600 mb-6">
                Watch these curated videos to deepen your understanding. Videos are organized by difficulty level 
                and aligned with the New Zealand curriculum.
            </p>
    `;
    
    selectedDifficulties.forEach(difficulty => {
        if (videos[difficulty] && videos[difficulty].length > 0) {
            sectionHTML += `
                <div class="difficulty-section mb-6">
                    <h4 class="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                        ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
                    </h4>
                    <div class="videos-grid">
                        ${videos[difficulty].map(video => createVideoPlayerHTML(video, difficulty)).join('')}
                    </div>
                </div>
            `;
        }
    });
    
    sectionHTML += `
            <div class="video-section-footer mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 class="text-sm font-semibold text-gray-700 mb-2">Video Learning Tips:</h5>
                <ul class="text-sm text-gray-600 list-disc list-inside space-y-1">
                    <li>Take notes while watching to reinforce key concepts</li>
                    <li>Pause and rewatch sections that are challenging</li>
                    <li>Use closed captions if needed - they're enabled by default</li>
                    <li>Discuss the videos with classmates or teachers for deeper understanding</li>
                </ul>
            </div>
        </section>
    `;
    
    return sectionHTML;
}

/**
 * Add video integration CSS styles
 * @returns {string} CSS styles for video integration
 */
function getVideoIntegrationCSS() {
    return `
        <style>
        /* Video Integration Styles */
        .video-section {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }
        
        .video-container {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .video-container:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .video-responsive-container iframe {
            border-radius: 8px;
        }
        
        /* Video metadata styling */
        .video-metadata {
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
        }
        
        /* Accessibility improvements */
        .video-container:focus-within {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .video-section {
                margin-left: -1rem;
                margin-right: -1rem;
                border-radius: 0;
                border-left: none;
                border-right: none;
            }
            
            .video-container {
                margin-bottom: 1rem;
            }
            
            .video-header .flex {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
        }
        
        /* Print styles - hide videos when printing */
        @media print {
            .video-section,
            .no-print {
                display: none !important;
            }
        }
        
        /* Loading states */
        .video-loading {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        </style>
    `;
}

/**
 * Initialize video integration for a handout
 * @param {string} subject - Subject key for videos to include
 * @param {Array} difficulties - Difficulty levels to show (default: beginner, intermediate)
 * @param {string} insertAfter - CSS selector for element to insert videos after
 */
function initVideoIntegration(subject, difficulties = ['beginner', 'intermediate'], insertAfter = 'main') {
    // Add CSS styles
    document.head.insertAdjacentHTML('beforeend', getVideoIntegrationCSS());
    
    // Generate and insert video section
    const videoHTML = createVideoSection(subject, difficulties);
    if (videoHTML) {
        const targetElement = document.querySelector(insertAfter);
        if (targetElement) {
            targetElement.insertAdjacentHTML('afterend', videoHTML);
        }
    }
    
    // Add event listeners for accessibility
    document.addEventListener('keydown', function(e) {
        // Allow Escape key to pause videos (accessibility feature)
        if (e.key === 'Escape') {
            const iframes = document.querySelectorAll('.video-section iframe');
            iframes.forEach(iframe => {
                // Send pause command to YouTube iframe API
                try {
                    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
                } catch (error) {
                    // Ignore errors from cross-origin restrictions
                }
            });
        }
    });
}

// Export for use in handout pages
if (typeof window !== 'undefined') {
    window.VideoIntegration = {
        EDUCATIONAL_VIDEOS,
        createVideoSection,
        initVideoIntegration,
        createVideoPlayerHTML,
        generateEmbedURL
    };
}

// Module export for Node.js compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EDUCATIONAL_VIDEOS,
        createVideoSection,
        initVideoIntegration,
        createVideoPlayerHTML,
        generateEmbedURL,
        getVideoIntegrationCSS
    };
}