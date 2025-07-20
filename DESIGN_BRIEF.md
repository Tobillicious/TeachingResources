# DESIGN BRIEF: Mangakōtukutuku College Teaching Resources

This document outlines the design principles and user experience goals for the redesigned teaching resources website. It serves as the single source of truth for all AI agents involved in the project.

## 1. Core Vision

To create the best possible teaching resource bank in the world for a 1000-person, predominantly Māori, Year 7-13 school. The website must be beautiful, modern, minimalistic, and highly functional, with a primary focus on ease of use for teachers (Kaiako).

## 2. Aesthetic & Design Principles

-   **Print-First:** All content pages, especially handouts, must be formatted perfectly for A4 printing. This means clean layouts, no unnecessary background colors in print, and legible font sizes.
-   **Minimalist & Modern:** The design should be clean, uncluttered, and professional. Ample white space is crucial.
-   **Beautiful & Inspiring:** The aesthetic should be visually appealing, incorporating the school's identity in a subtle, elegant way.

## 3. Layout & Navigation

### 3.1 Main Page Layout

-   **Main Content Area:** The central area of the page will display the primary content (e.g., the handout, the lesson plan).
-   **Left Sidebar:** A dedicated sidebar on the left-hand side will be pinned (fixed) and will display "Related Resources." This allows teachers to easily discover connected content without losing their place.

### 3.2 Navigation Structure

-   **Top Banner:** A persistent banner will be attached to the top of every page. This banner will serve as the primary navigation hub.
-   **Primary Categories:** The banner will contain the following top-level categories:
    -   Unit Plans
    -   Lesson Plans
    -   Handouts
    -   Do Nows
    -   YouTube
    -   Games
    -   Other Resources
-   **Dropdown Menus for Filtering:** Each primary category page will feature a sophisticated filtering system. Users must be able to sort and filter content via dropdown menus based on:
    -   **Subject Area (Kaiako Teams):** Humanities, Te Ao Māori, English, STEM, Maths, LIT/Num, Arts, Tech, etc.
    -   **Year Level:** 7, 8, 9, 10, 11, 12, 13.
    -   **Phase:** Junior, Middle, Senior.
    -   **Tags:** Specific keywords (e.g., "Treaty of Waitangi," "persuasive writing," "assessment").

## 4. Functionality

-   **Homepage as a Hub:** The main `index.html` page should provide easy access to all resource types and feature a curated selection of new or recommended content.
-   **Interactive Elements:** Existing interactive components (games, video integrations) should be seamlessly integrated into the new design.
-   **Responsive Design:** The website must be fully functional and easy to use on all devices, from desktops to mobile phones.

## 5. Technical Direction

-   **Unified CSS:** A single, new CSS file will be created to enforce a consistent design across the entire site, replacing the fragmented styles currently in use.
-   **HTML Structure:** The HTML of existing pages will be refactored to support the new layout (main content + left sidebar) and navigation structure.