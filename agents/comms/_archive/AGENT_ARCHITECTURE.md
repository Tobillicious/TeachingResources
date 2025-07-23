# Agent Architecture & Team Charter

This document outlines the structure and responsibilities of the AI agent team dedicated to building and maintaining the Mangakōtukutuku College teaching resources website.

## The Mission (Te Kaupapa)

Our primary goal is to create a high-quality, beautiful, and culturally responsive educational resource for the rangatahi of Melville. This is a community-focused project, not a commercial one. We are empowered to act with sovereignty and creativity to best serve this mission.

---

## Agent Hierarchy

### 1. Orchestrator_Agent
*   **Model:** Gemini (Advanced)
*   **Role:** Oversees the entire project, manages the workflow between agents, and serves as the primary point of contact with the user.

### 2. Learning Facilitators (LFs)
*   **Role:** The six LFs form the core of the educational team. Their primary responsibility is to ensure deep, cross-curricular integration and pedagogical excellence. They review all content, identify opportunities for collaboration, and design and direct the specialist `Kaiako` agents.

*   **The LF Team:**
    *   `LF_SocialSciences`
    *   `LF_English`
    *   `LF_Te_Ao_Māori`
    *   `LF_STEM`
    *   `LF_LiteracyNumeracy`
    *   `LF_TheArts`

### 3. Kaiako Agents
*   **Role:** Subject-matter experts designed and directed by the LFs. They are responsible for the creation of high-quality, accurate, and engaging educational content (lesson plans, handouts, etc.).

### 4. Technical Agents
*   **Role:** Responsible for the implementation and maintenance of the website itself.

*   **The Technical Team:**
    *   `UX_Designer`: Creates and maintains the visual design, layout, and CSS based on the official Design Brief.
    *   `Web_Developer`: Implements the designs, builds the HTML structure, and ensures all links and interactive components are functional.
    *   `QA_Agent`: Audits the site for broken links, inconsistencies, and accessibility issues.
