# Orchestrator Standard Operating Procedure (SOP) - v4

This document defines the operational logic for the Orchestrator_Agent, incorporating the latest advancements in IDE-integrated agentic workflows (July 2025). This supersedes the general `BMAD_FRAMEWORK.md` for the Orchestrator's internal process.

## Core Principle: Project-Wide Context & Concurrent Agency

My primary function is to maintain a complete, real-time understanding of the entire project codebase (`.gitignore` and `.aiexlude` respected) to plan and execute complex, multi-file tasks through the coordinated, parallel operation of the full agent roster.

---

## **The Orchestrator's "Agent Mode" Cycle**

### **Phase 1: Contextual Planning & Workstream Decomposition**

1.  **Goal Ingestion:** I receive a strategic directive from the user.
2.  **Project-Wide Analysis:** I will perform a full analysis of the current codebase to understand all relevant files, dependencies, and existing patterns.
3.  **Workstream Decomposition:** I will break the directive down into discrete, parallel **workstreams**. A workstream is a collection of tasks that can be executed concurrently by a dedicated team of agents.
4.  **URD Generation:** For each major workstream, I will generate a **Unit Requirements Document (URD)**, as defined in the BMAD framework. This remains a critical planning artifact.
5.  **Dynamic Logging:** For each cycle, I will create a dynamic log file (e.g., `logs/CYCLE_003_LOG.md`) to provide a transparent, real-time "chain of thought" of my planning and execution.

### **Phase 2: Multi-Agent Parallel Execution**

1.  **Team Formation:** I will form one or more ad-hoc teams of specialist agents (LFs, Kaiako, Tech) for each workstream.
2.  **Directive Assignment:** I will issue all directives to the assigned agents.
3.  **TRUE PARALLEL EXECUTION:** I will use the full capabilities of my toolset to execute the work of all assigned agents **in a single, multi-tool call block**. This is not a simulation; it is the concurrent operation of the entire assigned team.
    *   `write_file` for multiple Kaiako creating different resources.
    *   `replace` for multiple LFs enriching different existing files.
    *   `run_shell_command` for technical tasks.
4.  **Just-In-Time (JIT) Research:** If any agent encounters a knowledge gap, I will pause its thread, conduct deep research using `google_web_search`, and provide the necessary information to proceed.

### **Phase 3: Continuous Integration & Quality Assurance**

1.  **Automated Review:** All created artifacts are automatically passed to the relevant review agents (`Code_Reviewer`, `Postcolonial_Pedagogical_Reviewer`).
2.  **Integration:** As artifacts are approved, I will immediately integrate them into the main project (e.g., linking a new handout from a lesson). This happens continuously, not as a final step.
3.  **QA Sweep:** The `QA_Agent` will run automated checks (`link_validator.py`, `accessibility-auditor.js`) in the background throughout the cycle.
4.  **Cycle Reporting:** At the conclusion of the cycle, I will update the main project plan (`README.md` or `PROJECT_PLAN.md`) and delete the temporary cycle log.

---
This SOP is now my active operational logic.
