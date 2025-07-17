# Unified Development Plan: Te Kete Ako

**Author:** Orchestrator Agent
**Version:** 3.0

## 1. Mission & Guiding Vision

This document provides the single source of truth for the development of "Te Kete Ako." It unifies all previous plans under a single, clear vision.

Our guiding kaupapa is the `vision.md` file. We are building a digital kete of knowledge for teachers and students, deeply rooted in the principles of the New Zealand Curriculum (NZC). All development work must align with this vision.

## 2. Core Strategy: Teacher-Led, Technology-Enabled

The "Senior Teacher Planner" has provided a clear, three-phase development plan that directly supports our vision. This plan, outlined below, is our strategic roadmap.

The "Genesis" automated workflow, introduced by the `Architect Agent`, is a powerful technical implementation detail. We will use this automated, content-first pipeline as the *method* for achieving our goals, but it does not dictate the *direction* of the project.

**In short: The "what" comes from the teacher-led plan; the "how" comes from the automated workflow.**

## 3. Unified Roadmap

### Phase 1: Foundation & Content Migration (Current Phase)

*   **Task 1: Complete Astro Migration & Establish "Genesis" Workflow**
    *   **Goal:** Finalize the migration to Astro and ensure the automated content pipeline is fully functional. This is the technical foundation for all future work.
    *   **Assignee:** Architect Agent

*   **Task 2: Content Audit & Categorization**
    *   **Goal:** Review all existing handouts and lesson plans, tagging them with relevant NZC learning areas, key competencies, and achievement objectives. This will be done by creating new Markdown files in the `src/content` directory, following the schema defined in `src/content/config.ts`.
    *   **Assignee:** Content Agent

*   **Task 3: Enhance Resource Library UI**
    *   **Goal:** Redesign the `ResourceLibrary` component to allow filtering and searching based on the new NZC categories.
    *   **Assignee:** Feature Agent

### Phase 2: Curriculum Integration & Interactivity

*   **Task 4: Integrate NZC Framework**
    *   **Goal:** Create a dedicated section of the site to browse resources by the NZC framework.
    *   **Assignee:** Feature Agent

*   **Task 5: Develop Lesson Plan Builder**
    *   **Goal:** Create a tool for teachers to build and share lesson plans.
    *   **Assignee:** Feature Agent

### Phase 3: Bicultural & Community Focus

*   **Task 6: Integrate Te Reo Māori & Mātauranga Māori**
    *   **Goal:** Expand the content collections to include dedicated Te Reo and Mātauranga Māori resources.
    *   **Assignee:** Content Agent

*   **Task 7: Community Contribution Features**
    *   **Goal:** Investigate and implement features for community contributions.
    *   **Assignee:** Feature Agent

### Phase 4: Pedagogical Expansion & Design Refinement

*   **Task 8: Expand Content Schema**
    *   **Goal:** Evolve the content schema to support richer pedagogical formats, specifically "Unit Plans" and "Project-Based Learning" (PBL) modules.
    *   **Assignee:** Architect Agent

*   **Task 9: Develop New Content Types**
    *   **Goal:** Create pilot content for the new "Unit Plan" and "PBL" formats, establishing a template for future resources.
    *   **Assignee:** Content Agent

*   **Task 10: Refine Visual Design**
    *   **Goal:** Enhance the site's minimalist aesthetic through thoughtful and subtle design improvements. This includes exploring background color adjustments, typography enhancements, and layout tweaks to improve usability and visual appeal.
    *   **Assignee:** Design Agent

### Phase 5: Autonomous Content Ecosystem & Gamification

*   **Task 11: Architect Multi-Agent Content Pipeline**
    *   **Goal:** Design and implement the technical infrastructure for a network of specialized Kaiako agents to autonomously create, review, and publish content.
    *   **Assignee:** Architect Agent

*   **Task 12: Develop Interactive Educational Games**
    *   **Goal:** Create a library of reusable, engaging educational games, such as word finds, crosswords, and quizzes, that can be embedded within lessons and unit plans.
    *   **Assignee:** Game Developer Agent

*   **Task 13: Implement Advanced Resource Linking**
    *   **Goal:** Enhance the "Related Articles" algorithm to provide more sophisticated and contextually relevant resource suggestions, creating a richer web of knowledge.
    *   **Assignee:** Feature Developer Agent

*   **Task 14: Initiate Continuous Content Generation**
    *   **Goal:** Activate the network of Associate Kaiako agents to begin the continuous, scaled creation of diverse teaching resources across all learning areas.
    *   **Assignee:** Lead Kaiako Agents

## 4. Agent Roles & Communication
*   **See `AGENT_COMMUNICATION.md` for the full, updated list of agent roles and responsibilities.**
All communication will be handled as comments within the tasks in `tasks.json`. `AGENT_COMMUNICATION.md` is for major announcements only.
