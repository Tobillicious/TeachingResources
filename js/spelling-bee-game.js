/**
 * =================================================================
 * TE REO MĀORI SPELLING BEE GAME - Educational Word Game Engine
 * =================================================================
 * 
 * PURPOSE: NYT-style spelling bee game with cultural learning integration.
 * Players find words using 7 letters (6 outer + 1 required center letter).
 * 
 * CULTURAL INTEGRATION:
 * - Te Reo Māori words earn double points
 * - Comprehensive bilingual word definitions (lines 315-415)
 * - Cultural vocabulary building with context
 * - Respectful integration of Māori language learning
 * 
 * GAME MECHANICS:
 * - Minimum 4-letter words required
 * - Center letter must be in every word
 * - Pangrams (use all 7 letters) earn bonus points
 * - Progressive ranking system (Beginner → Queen Bee)
 * 
 * TECHNICAL ARCHITECTURE:
 * - ES6 Class-based design for maintainability
 * - Set-based word storage for O(1) lookups
 * - DOM manipulation with vanilla JavaScript
 * - Local storage for potential progress saving
 * 
 * FOR AI AGENTS:
 * - Primary Agent currently enhancing this system
 * - Integration point for Categories game merger
 * - Word definition system recently added (showWordDefinition method)
 * - Expandable puzzle system (newPuzzle method)
 * 
 * DEVELOPMENT NOTES:
 * - Enhanced with word definitions in latest update
 * - Ready for integration with unified game system
 * - Consider expanding Te Reo word database
 * 
 * =================================================================
 */
class SpellingBeeGame {
    constructor() {
        this.currentLetters = [];
        this.centerLetter = '';
        this.foundWords = new Set();
        this.currentWord = '';
        this.score = 0;
        this.gameWords = new Set();
        this.pangrams = new Set();
        
        // Te Reo Māori word database (subset for demo)
        this.teReoWords = new Set([
            'aroha', 'atua', 'awa', 'iwi', 'kai', 'kia', 'ora', 'wai', 'whenua', 
            'mana', 'mauri', 'tapu', 'noa', 'whakapapa', 'whanau', 'marae',
            'kōrero', 'reo', 'tikanga', 'mahi', 'ako', 'ake', 'ana', 'toa',
            'roto', 'rito', 'tane', 'tino', 'aro', 'ata', 'eta', 'ita', 'ora',
            'tao', 'toe', 'nei', 'noa', 'roi', 'tai', 'tea', 'tia', 'tire',
            'tore', 'nota', 'rate', 'rata', 'reti', 'riot', 'tori', 'trio',
            'anteater', 'rotation', 'ornate', 'ration', 'orient', 'toenail'
        ]);
        
        // English words for broader gameplay
        this.englishWords = new Set([
            'rate', 'tear', 'near', 'tone', 'note', 'into', 'riot', 'tire',
            'tier', 'ante', 'neat', 'earn', 'rent', 'tern', 'nite', 'teen',
            'tree', 'trio', 'tore', 'rote', 'otro', 'nero', 'nero', 'nori',
            'anteater', 'rotation', 'ornate', 'ration', 'orient', 'toenail',
            'retina', 'retain', 'ratine', 'orientate', 'iteration'
        ]);
        
        this.ranks = [
            { name: 'Beginner', minScore: 0, description: 'Just getting started!' },
            { name: 'Good Start', minScore: 10, description: 'You\'re finding your rhythm!' },
            { name: 'Moving Up', minScore: 25, description: 'Nice progress!' },
            { name: 'Good', minScore: 50, description: 'You\'re doing well!' },
            { name: 'Solid', minScore: 75, description: 'Solid performance!' },
            { name: 'Nice', minScore: 100, description: 'Nice work!' },
            { name: 'Great', minScore: 150, description: 'Great job!' },
            { name: 'Amazing', minScore: 200, description: 'Amazing skills!' },
            { name: 'Genius', minScore: 300, description: 'Absolutely brilliant!' },
            { name: 'Queen Bee', minScore: 400, description: 'You are the Queen Bee! 👑' }
        ];
        
        this.initializeGame();
        this.bindEvents();
    }
    
    initializeGame() {
        // Start with a default set - later this could be randomized
        this.setLetters(['T', 'E', 'R', 'O', 'N', 'I'], 'A');
        this.generateWordList();
        this.updateDisplay();
    }
    
    setLetters(outerLetters, centerLetter) {
        this.currentLetters = [...outerLetters];
        this.centerLetter = centerLetter;
        this.allLetters = [centerLetter, ...outerLetters];
        
        // Update display
        document.getElementById('center-letter').textContent = centerLetter;
        const outerElements = document.querySelectorAll('.hex-outer');
        outerElements.forEach((el, index) => {
            if (outerLetters[index]) {
                el.textContent = outerLetters[index];
            }
        });
    }
    
    generateWordList() {
        this.gameWords.clear();
        this.pangrams.clear();
        
        const allWords = new Set([...this.teReoWords, ...this.englishWords]);
        const allLettersLower = this.allLetters.map(l => l.toLowerCase());
        const centerLetterLower = this.centerLetter.toLowerCase();
        
        for (let word of allWords) {
            if (this.isValidWord(word, allLettersLower, centerLetterLower)) {
                this.gameWords.add(word);
                
                // Check if it's a pangram (uses all 7 letters)
                const uniqueLetters = new Set(word.split(''));
                if (uniqueLetters.size === 7) {
                    this.pangrams.add(word);
                }
            }
        }
        
        console.log(`Generated ${this.gameWords.size} words, ${this.pangrams.size} pangrams`);
    }
    
    isValidWord(word, availableLetters, centerLetter) {
        if (word.length < 4) return false;
        if (!word.includes(centerLetter)) return false;
        
        const wordLetters = word.split('');
        const letterCount = {};
        
        // Count available letters
        for (let letter of availableLetters) {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }
        
        // Check if word can be made from available letters
        for (let letter of wordLetters) {
            if (!letterCount[letter] || letterCount[letter] === 0) {
                return false;
            }
            letterCount[letter]--;
        }
        
        return true;
    }
    
    bindEvents() {
        // Letter clicking
        document.querySelectorAll('.hex-letter').forEach(letter => {
            letter.addEventListener('click', () => {
                this.addLetter(letter.textContent);
            });
        });
        
        // Input field
        const wordInput = document.getElementById('word-input');
        wordInput.addEventListener('input', (e) => {
            this.currentWord = e.target.value.toUpperCase();
            this.updateLetterHighlights();
        });
        
        wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitWord();
            }
        });
        
        // Buttons
        document.getElementById('submit-btn').addEventListener('click', () => this.submitWord());
        document.getElementById('delete-btn').addEventListener('click', () => this.deleteLetter());
        document.getElementById('shuffle-btn').addEventListener('click', () => this.shuffleLetters());
    }
    
    addLetter(letter) {
        this.currentWord += letter;
        document.getElementById('word-input').value = this.currentWord;
        this.updateLetterHighlights();
    }
    
    deleteLetter() {
        this.currentWord = this.currentWord.slice(0, -1);
        document.getElementById('word-input').value = this.currentWord;
        this.updateLetterHighlights();
    }
    
    shuffleLetters() {
        // Shuffle outer letters
        const outerElements = document.querySelectorAll('.hex-outer');
        const letters = Array.from(outerElements).map(el => el.textContent);
        
        // Fisher-Yates shuffle
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }
        
        outerElements.forEach((el, index) => {
            el.textContent = letters[index];
        });
        
        // Add shuffle animation
        outerElements.forEach(el => {
            el.style.transform += ' rotate(360deg)';
            setTimeout(() => {
                el.style.transform = el.style.transform.replace(' rotate(360deg)', '');
            }, 300);
        });
    }
    
    updateLetterHighlights() {
        // Remove previous highlights
        document.querySelectorAll('.hex-letter').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Highlight used letters
        for (let letter of this.currentWord) {
            const letterElement = Array.from(document.querySelectorAll('.hex-letter'))
                .find(el => el.textContent === letter);
            if (letterElement) {
                letterElement.classList.add('selected');
            }
        }
    }
    
    submitWord() {
        const word = this.currentWord.toLowerCase();
        
        if (word.length < 4) {
            this.showMessage('Words must be at least 4 letters long!', 'error');
            return;
        }
        
        if (!word.includes(this.centerLetter.toLowerCase())) {
            this.showMessage(`Word must contain the center letter "${this.centerLetter}"!`, 'error');
            return;
        }
        
        if (this.foundWords.has(word)) {
            this.showMessage('Already found!', 'error');
            return;
        }
        
        if (!this.gameWords.has(word)) {
            this.showMessage('Not in word list', 'error');
            return;
        }
        
        // Valid word found!
        this.foundWords.add(word);
        let points = this.calculatePoints(word);
        this.score += points;
        
        let message = '';
        if (this.pangrams.has(word)) {
            message = `PANGRAM! +${points} points! 🎉`;
        } else if (this.teReoWords.has(word)) {
            message = `Te Reo Māori! +${points} points! 🌟`;
        } else {
            message = `Good! +${points} points!`;
        }
        
        this.showMessage(message, 'success');
        this.addWordToGrid(word);
        this.updateDisplay();
        this.clearInput();
        
        // Show word definition if available
        this.showWordDefinition(word);
    }
    
    calculatePoints(word) {
        let basePoints = word.length === 4 ? 1 : word.length;
        
        // Double points for Te Reo Māori words
        if (this.teReoWords.has(word)) {
            basePoints *= 2;
        }
        
        // Pangram bonus
        if (this.pangrams.has(word)) {
            basePoints += 7;
        }
        
        return basePoints;
    }
    
    addWordToGrid(word) {
        const wordsGrid = document.getElementById('words-grid');
        const wordElement = document.createElement('div');
        wordElement.className = 'found-word';
        wordElement.textContent = word.toUpperCase();
        
        if (this.pangrams.has(word)) {
            wordElement.classList.add('pangram');
        }
        
        // Add with animation
        wordElement.style.opacity = '0';
        wordElement.style.transform = 'scale(0.8)';
        wordsGrid.appendChild(wordElement);
        
        setTimeout(() => {
            wordElement.style.opacity = '1';
            wordElement.style.transform = 'scale(1)';
            wordElement.style.transition = 'all 0.3s ease';
        }, 10);
    }
    
    updateDisplay() {
        document.getElementById('words-count').textContent = this.foundWords.size;
        document.getElementById('score').textContent = this.score;
        
        const pangramCount = Array.from(this.foundWords).filter(word => this.pangrams.has(word)).length;
        document.getElementById('pangrams-count').textContent = pangramCount;
        
        this.updateRank();
    }
    
    updateRank() {
        let currentRank = this.ranks[0];
        for (let rank of this.ranks) {
            if (this.score >= rank.minScore) {
                currentRank = rank;
            }
        }
        
        document.getElementById('rank-name').textContent = currentRank.name;
        document.getElementById('rank-description').textContent = currentRank.description;
    }
    
    showMessage(text, type) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type} show`;
        
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3000);
    }
    
    clearInput() {
        this.currentWord = '';
        document.getElementById('word-input').value = '';
        this.updateLetterHighlights();
    }
    
    showWordDefinition(word) {
        // Basic word definitions - in a full app this would come from an API
        const definitions = {
            // Te Reo Māori definitions
            'aroha': 'love, compassion, empathy',
            'atua': 'god, deity, divine being',
            'awa': 'river, stream',
            'iwi': 'tribe, people, nation',
            'kai': 'food, eat, meal',
            'kia': 'let it be (particle)',
            'ora': 'alive, well, healthy',
            'wai': 'water',
            'whenua': 'land, country, placenta',
            'mana': 'power, authority, prestige',
            'mauri': 'life force, vital essence',
            'tapu': 'sacred, forbidden',
            'noa': 'ordinary, unrestricted',
            'whakapapa': 'genealogy, relationships',
            'whanau': 'family, extended family',
            'marae': 'ceremonial meeting place',
            'korero': 'speak, talk, story',
            'reo': 'language, voice',
            'tikanga': 'customs, practices',
            'mahi': 'work, job, activity',
            'ako': 'learn, teach, study',
            'ake': 'upwards, above',
            'ana': 'cave, den',
            'toa': 'warrior, brave',
            'roto': 'inside, lake',
            'rito': 'heart of flax plant',
            'tane': 'male, man, husband',
            'tino': 'very, absolutely',
            'aro': 'front, face',
            'ata': 'dawn, morning',
            'eta': 'refuse, rubbish',
            'ita': 'anger, tight',
            'tao': 'spear, dart',
            'toe': 'remain, left over',
            'nei': 'here, this',
            'roi': 'good, nice',
            'tai': 'side, coast',
            'tea': 'clear, white',
            'tia': 'stick, peg',
            'tire': 'pull, drag',
            'tore': 'tear, rip',
            'nota': 'note, record',
            'rate': 'rate, speed',
            'rata': 'rata tree',
            'reti': 'net, snare',
            'riot': 'disturbance',
            'tori': 'theory',
            'trio': 'group of three',
            
            // English definitions
            'tear': 'to pull apart or drop of water from eye',
            'near': 'close to, not far',
            'tone': 'sound quality or attitude',
            'note': 'written message or musical sound',
            'into': 'to the inside of',
            'tire': 'to become weary or wheel covering',
            'tier': 'level or layer',
            'ante': 'poker stake or before',
            'neat': 'tidy and organized',
            'earn': 'to receive money for work',
            'rent': 'payment for use of property',
            'tern': 'type of seabird',
            'teen': 'person aged 13-19',
            'tree': 'woody plant with trunk',
            'trio': 'group of three people',
            'tore': 'past tense of tear',
            'rote': 'mechanical memorization',
            'nero': 'Roman emperor',
            'nori': 'edible seaweed',
            'anteater': 'mammal that eats ants',
            'rotation': 'act of rotating or turning',
            'ornate': 'elaborately decorated',
            'ration': 'fixed portion of food',
            'orient': 'to determine position',
            'toenail': 'nail on toe',
            'retina': 'light-sensitive eye tissue',
            'retain': 'to keep or hold',
            'ratine': 'type of fabric',
            'orientate': 'to orient or position',
            'iteration': 'repetition of process'
        };
        
        const definition = definitions[word];
        if (definition) {
            const messageEl = document.getElementById('message');
            const currentMessage = messageEl.textContent;
            
            setTimeout(() => {
                messageEl.textContent = `${word.toUpperCase()}: ${definition}`;
                messageEl.className = 'message success show';
                
                setTimeout(() => {
                    messageEl.classList.remove('show');
                }, 4000);
            }, 2000);
        }
    }
    
    // Method to load new puzzle (could be expanded)
    newPuzzle() {
        const puzzles = [
            { outer: ['T', 'E', 'R', 'O', 'N', 'I'], center: 'A' },
            { outer: ['L', 'I', 'N', 'G', 'S', 'H'], center: 'E' },
            { outer: ['A', 'T', 'U', 'M', 'R', 'S'], center: 'E' },
            { outer: ['H', 'O', 'U', 'G', 'T', 'S'], center: 'R' }
        ];
        
        const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        this.setLetters(puzzle.outer, puzzle.center);
        this.foundWords.clear();
        this.score = 0;
        this.generateWordList();
        this.updateDisplay();
        this.clearInput();
        
        // Clear found words display
        document.getElementById('words-grid').innerHTML = '';
        
        this.showMessage('New puzzle loaded!', 'success');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    const game = new SpellingBeeGame();
    
    // Add new puzzle button functionality (could be added to UI)
    window.spellingBeeGame = game;
    
    // Optional: Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            game.clearInput();
        } else if (e.key === 'Backspace' && !document.getElementById('word-input').matches(':focus')) {
            game.deleteLetter();
        }
    });
});