# SHIFT HANDOFF: Orchestrator Briefing for Claude Code (A Shift)

**Date:** July 20, 2025
**From:** B Shift Orchestrator (Current Model)
**To:** Claude Code (A Shift Lead Orchestrator)

## 1. Project Vision & Core Mandates

Our overarching goal is to create the most comprehensive, culturally responsive, and technologically advanced educational resource platform in Aotearoa New Zealand. All development must align with:
*   **`docs/VISION_2025.md`**: The strategic vision for the project.
*   **`docs/DESIGN_BRIEF.md`**: The core aesthetic and design principles (Print-First, Minimalist, Modern, Beautiful).
*   **`docs/BMAD_FRAMEWORK.md`**: Our "Breakthrough Method for Agile AI-Driven Development" (Plan, Execute, Review).

## 2. Current Project Status (End of B Shift)

### 2.1. Codebase Refactoring (Styling Unification)
*   **Objective:** Unify site-wide styling using `css/main.css` and `js/shared-components.js`.
*   **Completed (Main Pages):** The following main HTML pages have been refactored to use the shared navigation and main content structure:
    *   `index.html`
    *   `handouts.html`
    *   `lesson-plans/lessons.html`
    *   `unit-plans.html`
    *   `activities.html`
    *   `youtube.html`
    *   `games.html`
    *   `other-resources.html`
*   **Completed (Lesson Files):** All lesson plan files have been refactored:
    *   `lesson-plans/lesson-1.html`
    *   `lesson-plans/lesson-2.html`
    *   `lesson-plans/lesson-2-enhanced.html`
    *   `lesson-plans/lesson-3.html`
    *   `lesson-plans/lesson-4.html`
    *   `lesson-plans/lesson-5.html`
    *   `lesson-plans/lesson-6.html`
    *   `lesson-plans/lesson-7.html`
    *   `lesson-plans/lesson-8.html`
    *   `lesson-plans/lesson-9.html`
    *   `lesson-plans/lesson-10.html`
*   **Completed (Handout Files):** The following handout files have been refactored:
    *   `handouts/authors-purpose-handout.html`
    *   `handouts/haka-comprehension-handout.html`
    *   `handouts/treaty-of-waitangi-handout.html`
    *   `handouts/te-reo-maori-greetings-handout.html`
    *   `handouts/dawn-raids-comprehension-handout.html`
    *   `handouts/writers-toolkit-show-dont-tell-handout.html`
    *   `handouts/maori-battalion-legacy.html`
    *   `handouts/video-activities/prompt-engineering-video-activity.html`
    *   `handouts/video-activities/maui-video-activity.html`
    *   `handouts/video-activities/nz-wars-video-activity.html`
    *   `handouts/video-activities/bastion-point-video-activity.html`
    *   `handouts/digital-citizenship-handout.html`
    *   `handouts/traditional-ecological-indicators-handout.html`
    *   `handouts/ai-impact-comprehension-handout.html`
    *   `handouts/statistical-investigation-handout.html`
    *   `handouts/science-of-sleep-comprehension-handout.html`
    *   `handouts/writers-toolkit-inform-structure-handout.html`
    *   `handouts/genetic-modification-comprehension-handout.html`
    *   `handouts/writers-toolkit-fluency-handout.html`
    *   `handouts/speech-analysis-handout.html`
    *   `handouts/youth-vaping-comprehension-handout.html`
    *   `handouts/authors-purpose-persuade-handout.html`
    *   `handouts/sustainable-technology-design-challenge.html`
    *   `handouts/maori-geometric-patterns-handout.html`
    *   `handouts/misleading-graphs-comprehension-handout.html`
*   **Next Steps (for A Shift):** Continue refactoring remaining individual handout HTML files to adopt the new structure and remove legacy styling. This is a high priority for visual consistency.

### 2.2. File System Reorganization
*   **Objective:** Simplify and organize the project's Markdown files for clarity and maintainability.
*   **Completed:** All Markdown files have been moved into new, logical subdirectories:
    *   `/docs/` (core project documentation)
    *   `/agents/prompts/` (individual agent prompts)
    *   `/agents/briefings/` (agent-specific briefings)
    *   `/agents/comms/` (internal agent communication protocols)
    *   `/units/urds/` (Unit Requirements Documents)
    *   `/logs/` (log files)
*   **Impact:** This significantly cleans up the root directory and provides a clearer structure for all documentation.

## 3. Key Agents & Communication Protocols

Refer to the `agents/comms/` directory for detailed agent roles and communication protocols:
*   **`agents/comms/AGENT_ARCHITECTURE.md`**: Overall agent structure.
*   **`agents/comms/AGENT_ROSTER.md`**: Full list of 28 agents and their specializations.
*   **`agents/comms/MCP_COMMUNICATION_HUB.md`**: Real-time collaboration framework.
*   **`agents/comms/KAIAKO_DIRECTIVES.md` / `agents/comms/kaiako-task-assignments.md` / `agents/comms/KAIKO_TASKS.md`**: Task management for Kaiako.
*   **`agents/comms/LF_Te_Ao_Maori_Agent_Profile.md` / `agents/comms/te-ao-maori-cultural-validation.md`**: Critical cultural guidance from Hineterangi (LF_Te_Ao_Māori).

## 4. Immediate Priorities for A Shift (Claude Code)

1.  **Continue HTML Refactoring:** Systematically update all remaining individual HTML content pages (lessons, handouts, etc.) to integrate `css/main.css`, `js/shared-components.js`, and the `.main-container`/`.content-area` structure. This is crucial for visual consistency.
2.  **Content Deepening & Interlinking:** As discussed with the user, begin identifying key concepts within units (e.g., from `docs/skeleton-unit-plans.md` or `units/urds/`) that require dedicated "little pages" (new handouts, Do Nows, video activities). Ensure these are properly interlinked.
3.  **Address Placeholder Videos:** The user noted the "placeholder bullshit" YouTube videos. The `Content_Creator` agent needs to prioritize sourcing and integrating high-quality, curriculum-aligned, and culturally appropriate videos. Consult `agents/comms/LF_Te_Ao_Maori_Agent_Profile.md` for cultural validation protocols.
4.  **Review `logs/CONTENT_REVIEW_LOG.md`**: Action pending content enrichment suggestions.

## 5. Alignment & Vision Continuity

Both shifts must remain deeply aligned with the project's core vision. Regularly consult `docs/VISION_2025.md` and `docs/DESIGN_BRIEF.md`. The `Postcolonial_Pedagogical_Reviewer` and `LF_Te_Ao_Māori` are critical for ensuring cultural authenticity and pedagogical excellence throughout all content creation.

This handover document, combined with the newly organized file structure, should provide a clear and efficient starting point for your shift.

**Kia kaha, kia māia, kia manawanui!** (Be strong, be brave, be steadfast!)

---
