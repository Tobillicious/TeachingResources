# Development Plan: Te Kete Ako

This document outlines the high-level development plan for the "Te Kete Ako" project, guided by the vision articulated in `vision.md`.

## Phase 1: Foundation & Content Migration

The initial phase focuses on establishing a robust, modern, and maintainable platform and migrating our existing resources.

*   **Task 1: Complete Astro Migration (SSG)**
    *   **Goal:** Fully migrate the application from the Vite/React setup to the Astro static site generator.
    *   **Rationale:** Astro provides superior performance, better SEO, and a simpler development experience, which aligns with our "Future Focus" principle. This eliminates the need for a complex backend server.
    *   **Assignee:** SSGAgent / Developer Agent

*   **Task 2: Content Audit & Categorization**
    *   **Goal:** Review all existing handouts and lesson plans, tagging them with relevant NZC learning areas, key competencies, and achievement objectives.
    *   **Rationale:** This is crucial for making resources discoverable and ensuring "Coherence" across the curriculum.
    *   **Assignee:** Content Agent

*   **Task 3: Enhance Resource Library UI**
    *   **Goal:** Redesign the `ResourceLibrary` component to be more intuitive and powerful.
    *   **Rationale:** To support "Learning to Learn," students and teachers need to be able to easily find what they need. This includes implementing search filters based on the new categorization from Task 2.
    *   **Assignee:** Frontend Agent / Styling Agent

## Phase 2: Curriculum Integration & Interactivity

This phase focuses on deepening the platform's connection to the NZC and making it more interactive.

*   **Task 4: Integrate NZC Framework**
    *   **Goal:** Create a dedicated section or data models within the application to represent the NZC structure (Learning Areas, Achievement Objectives, etc.).
    *   **Rationale:** This will allow us to explicitly link resources to the curriculum, making the platform a powerful tool for planning and assessment.
    *   **Assignee:** Frontend Agent / Senior Teacher Planner

*   **Task 5: Develop Lesson Plan Builder**
    *   **Goal:** Create a tool that allows teachers to build, save, and share their own lesson plans using resources from the library.
    *   **Rationale:** This promotes "Community Engagement" and "Coherence" by enabling collaborative planning.
    *   **Assignee:** Frontend Agent

## Phase 3: Bicultural & Community Focus

This phase focuses on fulfilling our commitment to the Treaty of Waitangi and community engagement.

*   **Task 6: Integrate Te Reo Māori & Mātauranga Māori**
    *   **Goal:** Develop a dedicated section for Te Reo Māori resources and begin integrating Mātauranga Māori perspectives across all learning areas.
    *   **Rationale:** This is a direct commitment to the "Treaty of Waitangi" principle.
    *   **Assignee:** Content Agent / Senior Teacher Planner

*   **Task 7: Community Contribution Features**
    *   **Goal:** Explore features that would allow local iwi, community members, and parents to contribute resources or stories.
    *   **Rationale:** This embodies the "Community Engagement" principle.
    *   **Assignee:** Frontend Agent

This plan will be translated into specific, actionable items in the `tasks.json` file.