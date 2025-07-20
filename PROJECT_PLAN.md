# PROJECT PLAN: Teaching Resources Website Redevelopment

This document outlines the phased development plan for redesigning and expanding the Mangakōtukutuku College teaching resources website.

## Phase 1: Foundation & Redesign (UI/UX Agent Lead)

**Objective:** Implement the new, unified design language across the entire website.

1.  **CSS Overhaul:**
    -   [ ] Create a new `css/main.css` file from scratch, based on the `DESIGN_BRIEF.md`.
    -   [ ] Implement a modern, print-friendly, A4-focused layout for handout pages.
    -   [ ] Design the main layout structure: persistent top navigation banner, pinned left sidebar for related resources, and a central content area.
    -   [ ] Define a consistent and beautiful style for typography, resource cards, buttons, and other UI elements.

2.  **HTML Refactoring:**
    -   [ ] Update `index.html` to serve as the central hub with the new navigation and layout.
    -   [ ] Create a template for all content pages (`handouts`, `lessons`, etc.) that includes the new HTML structure.
    -   [ ] Systematically refactor all existing `.html` files to use the new template and `css/main.css`.

3.  **Navigation Implementation:**
    -   [ ] Build the persistent top navigation banner.
    -   [ ] Implement the primary category pages (`unit-plans.html`, `lessons.html`, etc.).
    -   [ ] Develop the dynamic filtering system with dropdowns for Subject Area, Year Level, and Tags.

## Phase 2: Content Integration & Expansion (Content Curation Agent Lead)

**Objective:** Populate the new structure with existing content and begin creating new, culturally responsive resources based on the Kaiako team structure.

1.  **Content Audit & Migration:**
    -   [ ] Map all existing resources to their new categories and subject areas.
    -   [ ] Ensure all migrated content is correctly formatted within the new design.

2.  **New Content Plan (by Kaiako Team):**
    -   [ ] **Te Ao Māori:** Develop resources on Matariki, Te Wiki o te Reo Māori, and local iwi history.
    -   [ ] **English:** Create a new unit on Aotearoa short stories and poetry.
    -   [ ] **Humanities:** Develop a unit on the New Zealand Wars and its impact.
    -   [ ] **STEM:** Create project-based learning resources that connect science and technology with mātauranga Māori (e.g., celestial navigation, traditional horticulture).
    -   [ ] **Maths:** Develop resources using real-world Aotearoa data (e.g., sports statistics, housing prices).
    -   [ ] **The Arts:** Create resources on contemporary Māori artists and designers.

## Phase 3: Feature Enhancement (Frontend Integration Agent Lead)

**Objective:** Ensure all interactive and dynamic features are seamlessly integrated across the site.

1.  **Related Resources Sidebar:**
    -   [ ] Integrate the `related-resources.js` script into the new page template.
    -   [ ] Ensure the sidebar is functional and correctly pulls relevant content on all resource pages.

2.  **Interactive Games:**
    -   [ ] Apply the new CSS to all interactive game components for a consistent look and feel.
    -   [ ] Integrate the games into relevant handouts and lesson plans.

3.  **Video Integration:**
    -   [ ] Ensure the video integration component works flawlessly within the new design.
    -   [ ] Expand the video library with content relevant to the new subject area resources.

## Phase 4: Quality Assurance & Deployment (QA Agent Lead)

**Objective:** Conduct rigorous testing to ensure a flawless user experience before deployment.

1.  **Comprehensive Testing:**
    -   [ ] Run the full QA suite, including link validation, performance monitoring, and accessibility audits.
    -   [ ] Test the website on multiple devices and browsers.
    -   [ ] Test all navigation and filtering functions.
    -   [ ] Proofread all new content for errors.

2.  **Deployment:**
    -   [ ] Push the final, tested code to the GitHub repository.
    -   [ ] Verify that the live website is functioning correctly after deployment.
