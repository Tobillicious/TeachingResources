# Te Kete Ako - Complete File Documentation Index
*AI Agent Reference Guide for Efficient Development*

## 📁 Comprehensive File Documentation

### **🎯 Navigation & Core Pages**

#### `index.html` - Platform Homepage
- **Purpose:** Landing page with hero section and feature overview
- **Key Features:** Bilingual navigation, cultural elements, responsive design
- **Navigation Pattern:** Standard Te Kete Ako header/footer structure
- **Cultural Elements:** Whakataukī integration, Te Ao Māori branding
- **AI Notes:** Entry point for platform, sets design patterns for other pages

#### `unit-plans.html` - Educational Unit Overview
- **Purpose:** Showcase of structured learning sequences
- **Integration:** Links to individual unit files in `/units/` directory
- **Assessment:** Connected to curriculum alignment framework
- **AI Notes:** Central hub for educational content organization

#### `games.html` - Interactive Learning Hub
- **Purpose:** Showcase of educational games with filtering system
- **Current Games:** Te Reo Wordle, English Wordle, Countdown Letters, Spelling Bee
- **Recent Updates:** Enhanced by Primary Agent with bilingual gaming support
- **Technical Features:** Advanced filtering by subject, type, duration, year level
- **AI Notes:** Primary Agent completed major enhancements, ready for expansion

#### `curriculum-alignment.html` - NZ Curriculum Integration
- **Purpose:** Comprehensive framework alignment with education standards
- **Structure:** Know/Understand/Do frameworks for major subjects
- **Integration:** Links to Math-Drills.com and other external resources
- **AI Notes:** Major breakthrough by Primary Agent with comprehensive frameworks

---

### **🎮 Interactive Games System**

#### `/games/te-reo-wordle.html` - Daily Te Reo Māori Word Game
- **Purpose:** Cultural vocabulary building through word guessing
- **Features:** 6 attempts to guess Te Reo word, cultural context provided
- **Integration:** Links to Te Reo greetings handout for learning support
- **AI Notes:** Established game, proven engagement, expandable word database

#### `/games/english-wordle.html` - English Vocabulary Game
- **Status:** NEWLY CREATED by Primary Agent
- **Purpose:** Classic word-guessing with educational vocabulary focus
- **Features:** 5-letter English words with helpful definitions
- **AI Notes:** Fresh implementation, ready for educational content expansion

#### `/games/spelling-bee.html` - Bilingual Spelling Bee
- **Status:** RECENTLY ENHANCED by Primary Agent
- **Features:** NYT-style game with bilingual support (English + Te Reo Māori)
- **Cultural Integration:** Double scoring for Te Reo words, comprehensive definitions
- **Technical:** Uses `/js/spelling-bee-game.js` for game logic
- **AI Notes:** Major upgrade complete, includes word definition system

#### `/games/categories.html` - Team-Based Learning Game
- **Status:** Polished presentation, coming soon
- **Purpose:** Collaborative vocabulary and critical thinking game
- **AI Notes:** Ready for development, awaiting implementation

---

### **📚 Educational Resources**

#### `/units/` Directory Structure
```
unit-1-te-ao-maori.html          - Cultural foundation unit
unit-2-decolonized-history.html  - Alternative historical perspectives  
unit-7-digital-tech-ai-ethics.html - Modern technology ethics
/lessons/unit-X-lesson-Y.html    - Individual lesson implementations
```
- **Pattern:** Each unit has overview + detailed lesson files
- **Structure:** Cultural opening, learning objectives, activities, assessments
- **AI Notes:** Consistent template structure, expandable for new subjects

#### `/handouts/` Directory - Printable Resources
- **Purpose:** A4-formatted educational worksheets and activities
- **Categories:** Core curriculum, Writer's toolkit, Cultural resources, Do Nows
- **Recent Work:** Secondary Agent converted several from Tailwind to Te Kete Ako standard
- **Status:** Ongoing standardization, ~46 files identified for conversion
- **AI Notes:** High-priority area for consistency improvements

#### `/handouts/do-now-activities/` - Quick Learning Starters
- **Purpose:** 5-10 minute lesson starters across subjects
- **Recent Updates:** `whakatauki-wisdom-do-now.html` fully converted to standard
- **Pattern:** Cultural opening, quick engagement, curriculum links
- **AI Notes:** Perfect templates for ActivityGenerator integration

---

### **💻 JavaScript Architecture**

#### `/js/shared-components.js` - Platform Core Functionality
- **Purpose:** Common functionality across all pages
- **Features:** Recommended reading system, DOM manipulation, print optimization
- **Integration:** Imported by most pages for consistent behavior
- **Recent Updates:** Enhanced with comprehensive AI-friendly documentation
- **AI Notes:** Central integration point, handles cultural content appropriately

#### `/js/spelling-bee-game.js` - Game Engine
- **Purpose:** Complete spelling bee game implementation
- **Features:** Bilingual word support, definitions system, progressive ranking
- **Recent Updates:** Major enhancements by Primary Agent with cultural integration
- **Technical:** ES6 class-based, Set-based word storage, vanilla JS DOM manipulation
- **AI Notes:** Example of sophisticated game architecture, template for other games

#### `/js/activity-generator.js` - AI-Powered Activity Creation
- **Purpose:** Smart generation of Do Now activities
- **Features:** Template-based system, curriculum alignment, cultural integration
- **Integration:** Powers activities.html dynamic content
- **AI Notes:** Expandable template system, requires cultural validation for new content

#### `/js/advanced-youtube-search.js` - Video Content Curation
- **Purpose:** Curriculum-aligned video search and filtering
- **Features:** Advanced filtering, assessment-ready flagging, cultural appropriateness validation
- **Integration:** Powers youtube.html advanced search capabilities
- **AI Notes:** Quality assurance protocols essential, expandable video database

#### `/js/filtering-system.js` - Universal Search/Filter
- **Purpose:** Search and filter functionality across resource pages
- **Integration:** Used by games.html, handouts.html, activities.html
- **AI Notes:** Reusable component, consistent UX across platform

---

### **🎨 Styling System**

#### `/css/main.css` - Te Kete Ako Design System
- **Purpose:** Complete platform styling with cultural integration
- **Features:** Bilingual navigation, print optimization, mobile responsiveness
- **Color System:** Primary (#1a1a1a), Secondary (#00b0b9), Accent (#f5a623), Māori Red (#d83c3e)
- **Architecture:** CSS custom properties, mobile-first responsive design
- **AI Notes:** Well-structured system, avoid Tailwind dependencies

---

### **🤖 Agent Coordination System**

#### `/agents/comms/` - Multi-Agent Communication
- `AGENT_COORDINATION.md` - Primary coordination document
- `REAL_TIME_COORDINATION.md` - Live session coordination (created by Secondary Agent)
- **Purpose:** Prevents conflicts, enables parallel development
- **Usage:** Update every 15 minutes during active development
- **AI Notes:** Essential for multi-agent collaboration

#### `/agents/docs/` - Development Documentation
- `CODEBASE_ARCHITECTURE.md` - Technical architecture overview
- `PLATFORM_VISION_ROADMAP.md` - Strategic development roadmap
- `FILE_DOCUMENTATION_INDEX.md` - This comprehensive file guide
- **Purpose:** AI-friendly documentation for development continuity
- **AI Notes:** Reference before beginning major development work

#### `/agents/tools/` - Development Tools
- `agent-sync.js` - Real-time agent coordination tool
- **Purpose:** File locking, status reporting, conflict detection
- **Usage:** Import and use for coordinated development
- **AI Notes:** Prevents file conflicts during parallel development

---

## 🔄 File Modification Guidelines for AI Agents

### **Before Modifying Any File:**
1. **Read First:** Always use Read tool before Edit/MultiEdit
2. **Check Locks:** Use AgentSync to avoid conflicts with other agent
3. **Preserve Culture:** Maintain Te Reo Māori integration and cultural elements
4. **Follow Patterns:** Use established Te Kete Ako design patterns
5. **Test Mobile:** Ensure responsive design principles maintained

### **File Priorities by Agent Role:**

#### **Primary Agent Focus Areas:**
- `/games/` directory - Game development and enhancement
- `/js/` game-related files - Interactive functionality
- Game integration in `games.html`
- Cross-game feature development

#### **Secondary Agent Focus Areas:**
- `/handouts/` directory - Style standardization and consistency
- `/css/main.css` - Performance optimization
- Platform-wide navigation consistency
- Documentation and architecture analysis

### **Shared Responsibility Areas:**
- Cultural content validation
- Curriculum alignment verification
- Mobile responsiveness testing
- Agent coordination file updates

---

## 📊 Current Platform Status

### **Completed Major Work:**
- ✅ Bilingual games system (Primary Agent)
- ✅ Comprehensive file documentation (Secondary Agent)
- ✅ Agent coordination system (Secondary Agent)
- ✅ Strategic roadmap and vision (Secondary Agent)
- ✅ Core handout standardization (Secondary Agent)

### **In Progress:**
- 🔄 Remaining Tailwind to Te Kete Ako conversions (~46 files)
- 🔄 CSS performance optimization opportunities
- 🔄 Additional game development and integration

### **Future Development Priorities:**
- Enhanced assessment integration
- AI-powered personalization features  
- Community platform evolution
- Advanced accessibility enhancements

---

**🎯 For AI Agents:** This index should be your first reference when beginning development work. Each documented file includes purpose, features, integration points, and specific notes for AI development. Update this index when significant architectural changes occur.

**🤖 Agent Success Pattern:** Read → Plan → Coordinate → Implement → Document → Test → Deploy