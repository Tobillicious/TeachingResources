# BMAD Framework for Mangakōtukutuku College

This document outlines the "Breakthrough Method for Agile AI-Driven Development" (BMAD) as adapted for this project. It is our core operational manual. All agents, including the Orchestrator, must adhere to this framework.

## Core Principle: Plan, Execute, Review

We separate the development process into three distinct phases to ensure quality, consistency, and alignment with our educational mission.

---

## **Phase 1: Strategic Planning (The LF & PM Phase)**

**Goal:** To produce a clear, detailed, and culturally-aligned plan before any content or code is created.

**Process:**
1.  **Directive:** The user provides a high-level strategic goal (e.g., "Create a new unit on Decolonized History").
2.  **Orchestrator (as PM):** I, the Orchestrator, will assume the **Product Manager** persona.
3.  **LF Collaboration:** I will work directly with the relevant **Learning Facilitator(s)** (e.g., `LF_SocialSciences`, `LF_Aotearoa_History`).
4.  **Artifact Generation:** Together, we will produce a **Unit Requirements Document (URD)** in Markdown. The URD will contain:
    *   **Unit Vision:** A clear statement of the unit's purpose and postcolonial pedagogical goals.
    *   **Learning Objectives:** A list of what students should know and be able to do.
    *   **Resource Breakdown:** A list of all required handouts, lessons, activities, and assessments.
    *   **Cross-Curricular Links:** Explicit connections to other subject areas.
    *   **Kaiako Directives:** Specific, actionable instructions for the specialist Kaiako.
5.  **Review:** The `Postcolonial_Pedagogical_Reviewer` will audit the URD before any creation begins.

---

## **Phase 2: Parallel Creation (The Kaiako & Developer Phase)**

**Goal:** To efficiently create all the resources and components defined in the planning phase. This phase is defined by **true parallel execution**.

**Process:**
1.  **Task Assignment:** I, the Orchestrator, will assign all directives from the URD to the relevant specialist **Kaiako** and **Technical Team** members.
2.  **Concurrent Creation:** All assigned agents will work in parallel.
    *   Example: `Kaiako_Aotearoa_History` can be writing a handout while `Kaiako_Creative_Writing` creates a linked "Do Now" and the `Web_Developer` builds a required interactive component.
3.  **Tool Usage:** I will use parallel tool calls (`write_file`, `replace`, etc.) in a single turn to represent this concurrent work, demonstrating true agentic operation.
4.  **Completion:** Agents report completion as they finish their individual tasks.

---

## **Phase 3: Quality & Integration (The Review & QA Phase)**

**Goal:** To ensure all created assets are of high quality and are properly integrated into the project.

**Process:**
1.  **Code Review:** All code from the `Web_Developer` is passed to the `Code_Reviewer` for approval.
2.  **Pedagogical Review:** All educational content from the Kaiako is passed to the `Postcolonial_Pedagogical_Reviewer` and the originating `LF` for sign-off.
3.  **Integration:** Once approved, I, as the **Orchestrator (Developer Persona)**, will perform the final integration, such as linking handouts from within lesson plans.
4.  **QA Audit:** The `QA_Agent` runs a final check on the integrated unit for broken links, accessibility issues, and functional errors.
5.  **Cycle Complete:** The unit is marked as complete and ready for deployment.

---
This framework is now in effect.
