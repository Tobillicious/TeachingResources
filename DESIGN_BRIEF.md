# Design Brief: Mangakōtukutuku College Teaching Resources Website

This document provides the design vision and technical specifications for the website redesign. It is the single source of truth for the `UX_Designer` agent.

## 1. Vision & Values

The design must reflect the core identity of Mangakōtukutuku College.

*   **Vision:** "Te Kura Whaikaha" - A place that nurtures students to be strong in their cultural identity while pursuing personal excellence.
*   **Values:** The design should feel **Ready** (professional, organized), **Respectful** (accessible, culturally authentic), and **Safe** (clear, easy to navigate).
*   **Inspirational Layout:** The layout should be inspired by the clean, card-based, and well-structured design seen in the `tobillicious/teachingresources` repository.

## 2. Color Palette

The color palette will be derived directly from the Mangakōtukutuku College visual identity.

*   **Primary:** `#004a99` (MKT Blue - for headings, links, and primary actions)
*   **Secondary:** `#00b0b9` (MKT Teal - for accents, highlights, and secondary buttons)
*   **Background:** `#f4f4f4` (Light Grey - for the main body background)
*   **Surface:** `#ffffff` (White - for cards and content areas)
*   **Text (Primary):** `#212121` (Near Black - for body text)
*   **Text (Secondary):** `#666666` (Medium Grey - for subtitles and metadata)

## 3. Typography

*   **Headings:** 'Montserrat', sans-serif (Bold, 700) - A strong, modern, and clean font.
*   **Body Text:** 'Lato', sans-serif (Regular, 400) - A highly readable and friendly font for paragraph text.
*   **Whakataukī:** 'Merriweather', serif (Italic, 400) - A distinguished serif font to make the proverb feel special.

*(These will be imported from Google Fonts).*

## 4. Key Components

### The Landing Page (`index.html`)
*   **Hero Section:** A prominent, full-width section at the top. It will feature a beautiful, high-quality image of a local landscape (e.g., the Waikato River) and overlay the **daily changing Whakataukī**.
*   **Recommended Resources:** A section below the hero that dynamically displays 3-5 cards linking to recently added or relevant resources.
*   **Navigation:** Clear, card-based navigation to the main resource categories (Unit Plans, Lesson Plans, Handouts, etc.).

### Page Templates
*   **Unit Plan Page:** A header section with a large, clear title. A prominent table for all curriculum alignment. A grid of cards below, linking to the individual lesson plans within the unit.
*   **Lesson Plan Page:** A clean, two-column layout. The left column will contain the core lesson information (Learning Goal, Activities). The right column will be a "Resource Panel" linking to all printable handouts for that lesson.
*   **Printable Handout Pages:** A minimalist design that defaults to a clean, A4-sized, black and white layout when printed. All site navigation and colors will be hidden in the print view to save ink.

---
This brief is now the guiding document for all future design and development work.
