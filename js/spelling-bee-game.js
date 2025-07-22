// Te Reo Māori Spelling Bee Game
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