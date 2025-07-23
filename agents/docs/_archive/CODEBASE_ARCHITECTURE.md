# Te Kete Ako - Comprehensive Codebase Documentation
*AI Agent Development Guide - Created for Claude AI Collaborative Development*

## 🎯 Platform Overview

**Te Kete Ako** is a comprehensive educational resource platform integrating Te Ao Māori perspectives with NZ Curriculum requirements. The platform uses BMAD (Breakthrough Method for Agile AI-Driven Development) protocols and MCP (Model Context Protocol) for multi-agent collaboration.

### **Core Mission:**
- Bilingual education resources (English/Te Reo Māori)
- Cultural authenticity and educational excellence
- Interactive learning experiences
- Teacher-friendly design with print capabilities

## 🏗️ File Structure Analysis

### **Root Level Navigation Files**
```
index.html              - Homepage with hero section and feature overview
unit-plans.html         - Unit overview page (entry point to structured learning)
lessons.html           - Individual lesson plans collection
handouts.html          - Printable educational resources
activities.html        - Do Now activities and quick starters
youtube.html           - Curated educational video integration
games.html             - Interactive learning games hub
curriculum-alignment.html - NZ Curriculum framework alignment
```

### **Content Directories**

#### `/units/` - Educational Units
- **Purpose:** Structured learning sequences aligned with NZ Curriculum
- **Structure:** Each unit contains overview + individual lesson files
- **Key Files:**
  - `unit-1-te-ao-maori.html` - Cultural foundation unit
  - `unit-2-decolonized-history.html` - Alternative historical perspectives
  - `unit-7-digital-tech-ai-ethics.html` - Modern technology ethics
- **Development Notes:** Units follow consistent structure with cultural openings, learning objectives, activities, and assessments

#### `/games/` - Interactive Learning
- **Purpose:** Engaging educational games reinforcing curriculum concepts
- **Current Games:**
  - `te-reo-wordle.html` - Daily Te Reo Māori word game
  - `countdown-letters.html` - Word building challenge
  - `te-reo-spelling-bee.html` - **ACTIVE DEVELOPMENT** - Enhanced word game with definitions
- **Integration:** Games link to related handouts and curriculum areas
- **Development Notes:** Primary agent currently working on spelling bee enhancements

#### `/handouts/` - Printable Resources
- **Purpose:** A4-formatted educational worksheets and resources
- **Categories:**
  - Core curriculum handouts (probability, media literacy, etc.)
  - Writer's toolkit series (PEEL method, rhetorical devices, etc.)
  - Cultural resources (Te Reo greetings, whakataukī wisdom)
  - Do Now activities in `/do-now-activities/` subdirectory
- **Technical Notes:** Most recently converted from Tailwind to Te Kete Ako standard styling

#### `/js/` - Interactive Functionality
- **Core Files:**
  - `shared-components.js` - Common functionality across platform
  - `filtering-system.js` - Search and filter capabilities
  - `spelling-bee-game.js` - **ACTIVELY MODIFIED** - Enhanced with word definitions
  - `activity-generator.js` - AI-powered activity creation tool
  - `advanced-youtube-search.js` - Curriculum-aligned video search

#### `/css/` - Styling System
- **Primary:** `main.css` - Comprehensive Te Kete Ako design system
- **Features:** Bilingual navigation, print optimization, mobile responsiveness
- **Color System:** Primary (#1a1a1a), Secondary (#00b0b9), Accent (#f5a623), Māori Red (#d83c3e)

### `/agents/` - Multi-Agent Coordination
- **Purpose:** Documentation and coordination for AI collaborative development
- **Key Files:**
  - `comms/AGENT_COORDINATION.md` - Primary coordination document
  - `comms/REAL_TIME_COORDINATION.md` - Live session coordination
  - `docs/CODEBASE_ARCHITECTURE.md` - This file

## 🎮 Current Development Focus: Game Integration

### **Primary Agent Work (Terminal 2):**
- **File:** `/js/spelling-bee-game.js`
- **Enhancement:** Added comprehensive word definition system (lines 315-415)
- **Te Reo Integration:** Bilingual definitions for Māori vocabulary
- **User Experience:** Contextual learning with definitions after word submission

### **Game Architecture:**
```javascript
class SpellingBeeGame {
    // Core game mechanics
    constructor() - Initialize game state
    initializeGame() - Setup letters and word list
    generateWordList() - Create valid words from letters
    
    // User interaction
    submitWord() - Process word submission
    showWordDefinition() - NEW: Display word meanings
    calculatePoints() - Scoring with Te Reo bonus
    
    // Game progression
    newPuzzle() - Load new letter combinations
    updateRank() - Player progression system
}
```

### **Integration Strategy:**
- Consistent UI patterns across all games
- Shared scoring system with cultural bonuses
- Common educational reinforcement patterns
- Links to related handouts and curriculum

## 🌐 Navigation System

### **Bilingual Architecture:**
```html
<nav class="main-nav">
    <ul>
        <li>
            <a href="[destination]">
                <span class="nav-icon">[emoji]</span>
                <span class="nav-text-en">[English]</span>
                <span class="nav-text-mi" lang="mi">[Te Reo Māori]</span>
            </a>
        </li>
    </ul>
</nav>
```

### **Cultural Elements:**
- Every page includes appropriate whakataukī (Māori proverbs)
- Cultural highlight sections with distinctive styling
- Respectful Te Ao Māori integration throughout
- Links to cultural context and language learning

## 📋 Data Attributes System

### **Page Classification:**
```html
<body data-auto-init="true" 
      data-current-page="[page-type]"
      data-breadcrumb-path="[navigation-path]"
      data-reading-topic="[content-category]">
```

### **Page Types:**
- `home` - Landing page
- `lesson-page` - Individual lesson plans
- `handout-page` - Printable resources
- `game-page` - Interactive games
- `unit-page` - Unit overviews

## 🎯 Development Patterns for AI Agents

### **File Modification Guidelines:**
1. **Read Before Writing:** Always use Read tool before Edit/MultiEdit
2. **Preserve Cultural Elements:** Maintain Te Reo Māori integration
3. **Consistent Styling:** Use Te Kete Ako design system variables
4. **Mobile First:** Ensure responsive design principles
5. **Print Optimization:** Maintain A4 print compatibility

### **Agent Coordination Points:**
- Update `/agents/comms/REAL_TIME_COORDINATION.md` every 15 minutes
- Document any architectural changes in this file
- Use consistent file naming conventions
- Maintain bilingual navigation structure

### **Common Integration Tasks:**
- Adding navigation to new pages
- Converting Tailwind CSS to Te Kete Ako standard
- Integrating new games with existing infrastructure
- Maintaining curriculum alignment throughout

## 🔄 Next Development Opportunities

### **High Priority:**
1. **Game System Unification** - Merge categories and spelling bee games
2. **Enhanced Agent Communication** - Real-time coordination tools
3. **Curriculum Integration** - Deeper NZ Curriculum alignment
4. **Performance Optimization** - CSS and JavaScript improvements

### **Medium Priority:**
1. **Content Expansion** - More handouts and activities
2. **Assessment Tools** - Integrated evaluation systems
3. **User Analytics** - Learning outcome tracking
4. **Accessibility Enhancement** - WCAG 2.1 AA compliance

---

**🤖 For AI Agents:** This documentation should be updated whenever significant architectural changes occur. Each agent should reference this file before beginning major development work to maintain consistency and avoid conflicts.