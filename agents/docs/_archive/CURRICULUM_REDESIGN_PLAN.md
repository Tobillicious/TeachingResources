# Official NZ Curriculum Page Redesign Plan
*Mirroring MoE Te Mataiaho Structure & Design*

## 🎯 Design Objectives

### **Primary Goals:**
1. **Legal Accuracy** - Exactly match official MoE curriculum documents
2. **Professional Credibility** - Look and feel like an official Ministry resource  
3. **Direct Reference Links** - One-click access to official MoE pages
4. **Phase-by-Phase Structure** - Individual sections for each learning phase
5. **Year-Level Granularity** - Separate sections for each year level where applicable

### **Why This Matters:**
- Teachers need absolute confidence in curriculum accuracy
- Legal compliance requires exact curriculum statement reproduction
- Professional credibility demands MoE-level presentation quality
- Quick verification through direct MoE links builds trust

## 📋 Current Official Structure Analysis

### **MoE Design Patterns:**
- Clean, minimalist government website styling
- Hierarchical content organization
- Tile-based resource presentation
- Consistent metadata structures
- Phase-based curriculum progression

### **Official Content Structure:**
```
Purpose Statement
↓
Understand-Know-Do Overview
↓
Learning Area Structure
↓
Phase 1: Years 0-3 (detailed breakdown)
↓
Phase 2: Years 4-6 (detailed breakdown)  
↓
Phase 3: Years 7-8 (detailed breakdown)
↓
Teaching Guidance
```

## 🏗️ Redesign Implementation Plan

### **Phase 1: Content Extraction & Organization**
1. **English Curriculum (Years 0-6):**
   - Extract exact Purpose Statement
   - Phase 1 (Years 0-3): Full Understand-Know-Do breakdown
   - Phase 2 (Years 4-6): Full Understand-Know-Do breakdown
   - Link: `https://newzealandcurriculum.tahurangi.education.govt.nz/nzc---english-years-0-6/`

2. **Mathematics Curriculum (Years 0-8):**
   - Extract exact Purpose Statement  
   - Phase 1 (Years 0-3): Complete framework
   - Phase 2 (Years 4-6): Complete framework
   - Phase 3 (Years 7-8): Complete framework
   - Link: `https://newzealandcurriculum.tahurangi.education.govt.nz/nzc---mathematics-and-statistics-years-0-8/`

### **Phase 2: Visual Design Alignment**
1. **Color Scheme:** Adopt official MoE color palette
2. **Typography:** Match government website fonts and hierarchy
3. **Layout:** Mirror official curriculum page layouts
4. **Navigation:** Implement MoE-style section navigation
5. **Components:** Create official-looking curriculum cards and sections

### **Phase 3: Content Structure**
```html
<!-- Exact MoE Structure -->
<section class="curriculum-area">
  <header class="official-header">
    <h1>[Learning Area] - Official Requirements</h1>
    <div class="moe-link">
      <a href="[official-moe-url]">View on Ministry of Education Website →</a>
    </div>
  </header>
  
  <section class="purpose-statement">
    <h2>Purpose Statement</h2>
    <blockquote>[Exact MoE text]</blockquote>
  </section>
  
  <section class="understand-know-do-overview">
    <!-- Exact MoE framework -->
  </section>
  
  <section class="phase-1">
    <h2>Phase 1: Years 0-3</h2>
    <div class="phase-description">[Exact MoE description]</div>
    <!-- Full Understand-Know-Do breakdown -->
  </section>
  
  <!-- Repeat for each phase -->
</section>
```

### **Phase 4: Direct Reference Integration**
- **MoE Links:** Add prominent "View Official Document" links
- **Cross-References:** Link specific achievement objectives to MoE pages
- **Verification:** Include last updated dates matching MoE versions

## 🎨 Visual Design Specifications

### **Official MoE Color Palette:**
```css
:root {
  --moe-primary: #003366;    /* Official government blue */
  --moe-secondary: #0066cc;  /* Link blue */
  --moe-accent: #ff6600;     /* Orange accent */
  --moe-text: #333333;       /* Dark text */
  --moe-background: #ffffff; /* Clean white */
  --moe-light-grey: #f7f7f7; /* Section backgrounds */
}
```

### **Typography Hierarchy:**
```css
/* Match government website standards */
.official-heading { 
  font-family: Arial, sans-serif;
  font-weight: bold;
  color: var(--moe-primary);
}

.curriculum-statement {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--moe-text);
}
```

## 📚 Content Requirements by Section

### **English Learning Area (Years 0-6)**

#### **Phase 1: Years 0-3 - Required Content:**
- **Progress Outcome:** [Exact MoE text]
- **Understand:** Big ideas about communication, stories, language
- **Know:** Phonics, vocabulary, text structures, writing conventions
- **Do:** Reading strategies, writing processes, oral communication

#### **Phase 2: Years 4-6 - Required Content:**  
- **Progress Outcome:** [Exact MoE text]
- **Understand:** Advanced language concepts, literary analysis
- **Know:** Complex text types, advanced vocabulary, language features
- **Do:** Critical analysis, persuasive writing, research skills

### **Mathematics and Statistics (Years 0-8)**

#### **Phase 1: Years 0-3 - Required Content:**
- **Progress Outcome:** [Exact MoE text]
- **Six Strands:** Number, Algebra, Measurement, Geometry, Statistics, Probability
- **Understand-Know-Do:** Full breakdown per strand

#### **Phase 2: Years 4-6 - Required Content:**
- **Progress Outcome:** [Exact MoE text] 
- **Advanced Applications:** Building on Phase 1 foundations

#### **Phase 3: Years 7-8 - Required Content:**
- **Progress Outcome:** [Exact MoE text]
- **Preparation for Secondary:** Advanced mathematical reasoning

## 🔗 Implementation Steps

### **Step 1: Research & Extract (Current)**
- ✅ Analyze official MoE website structure
- 🔄 Extract verbatim curriculum content
- 📋 Map exact section hierarchies

### **Step 2: Design Implementation**
- Create MoE-style CSS framework
- Build official-looking page layouts
- Implement government-standard components

### **Step 3: Content Integration**
- Insert exact curriculum statements
- Add direct MoE reference links
- Structure by phases and year levels

### **Step 4: Verification & Testing**
- Cross-check against official documents
- Verify all links to MoE pages
- Ensure professional presentation quality

## ✅ Success Criteria

The redesigned curriculum page will be considered successful when:
1. **Visual Indistinguishability:** Looks like an official MoE page
2. **Content Accuracy:** Every statement matches official documents exactly
3. **Direct Verification:** Teachers can click to verify on MoE website
4. **Professional Credibility:** Builds confidence in platform authority
5. **Legal Compliance:** Meets all official curriculum requirements

---

*This plan ensures Te Kete Ako's curriculum alignment page becomes an authoritative, legally accurate reference that teachers can trust completely.*