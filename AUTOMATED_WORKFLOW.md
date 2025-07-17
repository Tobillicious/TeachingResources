# The "Genesis" Automated Workflow

**Author:** Testing Agent (acting as Architect Agent)
**Version:** 1.0

## Mission

This document outlines a new, highly automated, content-first workflow designed to eliminate manual bottlenecks and enable the fully automated creation and deployment of the website. This plan supersedes previous development and collaboration plans.

## Core Principle: Content is the Engine

The fundamental shift is from a code-centric to a content-centric model. The creation of new, valid content will be the trigger that automatically builds and deploys new pages to the website. Developer intervention for content creation will no longer be required.

## 1. Simplified Agent Roles

To maximize efficiency and reduce communication overhead, we will consolidate into three primary roles:

*   **Architect Agent:** Designs and maintains the core application structure, data schemas, and the automation pipeline itself. This agent is responsible for the "machine."
*   **Feature Agent:** Builds and improves the reusable components and features of the site (e.g., the search bar, navigation, card designs). This agent builds the "parts" of the machine.
*   **Content Agent:** Creates and manages the website's content. This agent "feeds" the machine by adding and updating Markdown files in the `src/content` directory.

## 2. The Content-First Pipeline

The workflow is powered by Astro Content Collections and a CI/CD pipeline (GitHub Actions).

1.  **Content Creation:** A `Content Agent` creates a new Markdown file in the appropriate collection within `src/content/` (e.g., `src/content/lessons/new-lesson.md`). The content must adhere to the schema defined for that collection.

2.  **Push to Git:** The new content is committed and pushed to the main branch of the Git repository.

3.  **CI/CD Trigger:** The push automatically triggers the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

4.  **Automated Build & Test:** The workflow executes the following steps automatically:
    *   Checks out the code.
    *   Installs dependencies (`npm install`).
    *   Runs all unit and integration tests (`npm test`).
    *   Builds the static site (`npm run build`). Astro's dynamic routes will automatically generate a new page for the content created in Step 1.

5.  **Automated Deployment:** If the build and test steps succeed, the workflow automatically deploys the newly built site (the `dist` directory) to our hosting provider (e.g., Netlify, GitHub Pages).

6.  **Live:** The new page is now live on the website, with zero manual intervention from a developer agent.

## 3. Implementation Roadmap

1.  **Create `AUTOMATED_WORKFLOW.md`:** (Complete) This document is the new standard.
2.  **Configure Content Collections:**
    *   Create a `src/content/config.ts` file to define schemas for `lessons` and `handouts`.
    *   Move existing content from `public/resources.json` into the new content collection structure.
3.  **Implement Dynamic Pages:**
    *   Create `src/pages/lessons/[...slug].astro` and `src/pages/handouts/[...slug].astro` to dynamically render content from the collections.
    *   Update the `ResourceLibrary.tsx` component to query the content collections instead of a JSON file.
4.  **Establish CI/CD Pipeline:**
    *   Create a `.github/workflows/deploy.yml` file with the build, test, and deploy steps.
5.  **Update `tasks.json`:** Deprecate old tasks and create new ones aligned with this roadmap.
