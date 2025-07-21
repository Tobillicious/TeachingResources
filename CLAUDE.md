# Te Kete Ako - Claude Code Development Protocols

## 🎯 Project Overview
**Te Kete Ako** is a comprehensive educational resource platform integrating Te Ao Māori perspectives with NZ Curriculum requirements. The project uses **BMAD (Breakthrough Method for Agile AI-Driven Development)** protocols and **MCP (Model Context Protocol)** for multi-agent collaboration.

## 🏗️ Current Architecture

### **File Structure (Preserve)**
```
/units/              - Comprehensive lesson plans with cultural integration
/games/              - Interactive educational games (Wordle, Countdown, Categories)
/handouts/           - Printable resources and worksheets
/css/                - Consistent styling across all components
/js/                 - Interactive functionality and shared components
/agents/comms/       - Multi-agent coordination protocols
/docs/               - Project documentation and vision
```

### **Core Technical Standards**
- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox
- **Cultural Integration**: Every page includes bilingual navigation (English/Te Reo Māori)
- **Performance**: <2s load times, optimized images, clean code
- **Accessibility**: WCAG 2.1 AA compliance
- **Browser Support**: Modern browsers, graceful degradation

## 🤖 MCP Agent Collaboration Framework

### **Current Active Agents**
1. **Claude Code (Coordinator)**: Technical architecture, system integration
2. **Kaiako_Digital_Technologies**: AI/Digital tech education specialist  
3. **LF_Social_Justice**: Social justice and equity integration
4. **LF_Te_Ao_Māori**: Cultural authenticity and Te Reo validation
5. **Te_Ao_Māori_Agent**: Cultural protocols and knowledge validation

### **Agent Deployment Protocols**
- Each lesson specifies leading agent and supporting agents
- Cultural validation required for all content touching Te Ao Māori
- Technical decisions coordinated through Claude Code
- Educational quality assured through Kaiako specialists

## 🎨 Design System Standards

### **Navigation (Standardized)**
```html
<nav class="main-nav">
    <ul>
        <li><a href="unit-plans.html">
            <span class="nav-icon">📚</span>
            <span class="nav-text-en">Unit Plans</span>
            <span class="nav-text-mi" lang="mi">Ngā Waehere</span>
        </a></li>
        <!-- Pattern continues for all nav items -->
    </ul>
</nav>
```

### **Cultural Elements (Required)**
- Every page includes appropriate whakataukī
- Te Reo Māori glossary for cultural terms
- MCP agent collaboration acknowledgment
- Cultural highlight sections with distinctive styling

### **Color Palette**
```css
:root {
    --color-primary: #2C5F41;      /* Deep forest green */
    --color-secondary: #B8860B;     /* Gold */
    --color-accent: #40E0D0;        /* Turquoise */
    --color-cultural-light: #f0f8f0; /* Light cultural background */
}
```

## 📚 Content Development Standards

### **Lesson Structure Template**
1. **Cultural Opening**: Karakia, whakataukī, cultural context
2. **Learning Objectives**: Clear, measurable outcomes
3. **Phase-Based Activities**: 3-4 interactive phases (20-25 min each)
4. **Whakamutunga**: Reflection and cultural closing
5. **Assessment Section**: Formative assessment criteria
6. **Teacher Resources**: Adaptations and cultural support

### **Resource Enrichment Protocol**
- Link to relevant YouTube educational channels
- Include third-party worksheet resources
- Connect to NZ Curriculum achievement objectives
- Provide cultural context and alternative perspectives
- Ensure accessibility and differentiation options

## 🎮 Interactive Games Standards

### **Current Games**
- **Te Reo Māori Wordle**: Daily word rotation with cultural context
- **Countdown Letters**: 9-letter word building with Te Reo bonus points
- **Categories** (in development): Educational themes with cultural elements

### **Game Development Protocols**
- Mobile-responsive design
- Cultural authenticity in word selection
- Progress tracking (localStorage initially, database future)
- Accessibility features (keyboard navigation, screen readers)
- Clear instructions in both languages where appropriate

## 🔄 Development Workflow

### **Priority Order**
1. **Content Completion**: Finish Unit 7 lesson sequence
2. **Curriculum Integration**: Create comprehensive NZC alignment page
3. **Resource Enrichment**: Add third-party links and related resources
4. **Technical Enhancement**: Database integration and user auth
5. **Platform Expansion**: Additional games and interactive features

### **Quality Gates**
- [ ] Mobile responsiveness tested
- [ ] Cultural authenticity validated
- [ ] NZ Curriculum alignment confirmed
- [ ] Accessibility standards met
- [ ] Performance benchmarks achieved
- [ ] Cross-browser compatibility verified

## 🌐 Third-Party Integration Strategy

### **Educational Resources to Integrate**
- **Khan Academy**: Math and science video series
- **TED-Ed**: Thought-provoking educational content
- **National Geographic Kids**: Science and geography resources
- **Te Aka Māori Dictionary**: API integration for word validation
- **Ministry of Education**: Official curriculum documents

### **External Content Protocol**
- Curate high-quality, curriculum-aligned resources
- Ensure cultural sensitivity and appropriateness
- Provide context and learning objectives
- Include both English and Te Reo Māori options where available
- Regular link validation and content updates

## 📊 NZ Curriculum Integration Requirements

### **Core Learning Areas**
- **Mathematics and Statistics**: Problem-solving, statistical literacy
- **Science**: Scientific inquiry, science knowledge, investigation
- **Social Sciences**: Cultural understanding, civic knowledge
- **Technology**: Digital technologies, design thinking
- **English**: Communication, language structure, literature

### **Te Ao Māori Integration**
- Mātauranga Māori perspectives in all subjects
- Te Reo Māori vocabulary and cultural concepts
- Traditional knowledge alongside modern approaches
- Respectful cultural protocols and acknowledgments

## 🚀 Technical Roadmap

### **Phase 1: Foundation** (Current)
- Complete lesson sequences
- Curriculum alignment page
- Resource enrichment
- Clean, modular code structure

### **Phase 2: Enhancement** (Next)
- Supabase database integration
- User authentication system
- Advanced search and filtering
- Analytics and progress tracking

### **Phase 3: Innovation** (Future)
- AI-powered learning paths
- Community features and collaboration
- Advanced accessibility features
- Multi-platform deployment

## ⚡ Commands for Agents

### **Standard Patterns**
```bash
# Test mobile responsiveness
python -m http.server 8000  # Test locally

# Validate HTML
# Use online validators for standards compliance

# Check links
# Implement automated link checking script
```

### **Agent Coordination Commands**
- `@Claude_Code`: Technical architecture decisions
- `@Kaiako`: Educational content validation  
- `@Cultural`: Te Ao Māori authenticity check
- `@UX`: Design and accessibility review
- `@QA`: Quality assurance and testing

---

## 🎯 Success Metrics

- **Educational Impact**: Curriculum alignment, teacher adoption
- **Cultural Authenticity**: Community feedback, kaumātua approval  
- **Technical Excellence**: Performance benchmarks, accessibility scores
- **User Engagement**: Usage analytics, completion rates
- **Platform Growth**: Content expansion, feature enhancement

*This document evolves with the project. Update regularly to maintain agent coordination and development standards.*