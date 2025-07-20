
---

## **Activity 3: Conclusion Builder Tool**

*   **Associated Handout:** `writers-toolkit-conclusion-handout.html`
*   **Learning Goal:** To construct a well-structured concluding paragraph by breaking it down into its key components.

### **Concept**

A guided, step-by-step tool that scaffolds the writing of a concluding paragraph. This is a utility, not a game.

### **Interface**

*   **Title:** "Conclusion Builder"
*   **Instructions:** "Follow the steps below to build a powerful concluding paragraph. Write one or two sentences for each prompt."
*   The interface will be a series of four text-input boxes, each with a clear prompt.
*   Below the input boxes, a "Live Preview" area will show the full paragraph being constructed in real-time as the user types.

### **Process & Prompts**

**Step 1: Restate Your Main Point**
*   **Prompt:** "Start by restating your main argument in a new and powerful way. Don't just repeat your introduction."
*   **Input Box:** A text area for the student to write their sentence.

**Step 2: Summarize Your Key Evidence**
*   **Prompt:** "Briefly summarize the most important points or pieces of evidence you discussed."
*   **Input Box:** A text area for the student to write their summary.

**Step 3: Explain the 'So What?'**
*   **Prompt:** "Explain why this matters. What is the bigger lesson or implication? Answer the question, 'So what?'"
*   **Input Box:** A text area for the student to write their explanation.

**Step 4: End with a Call to Action or Final Thought**
*   **Prompt:** "End with a memorable final sentence. What do you want your reader to think, feel, or do now?"
*   **Input Box:** A text area for the student to write their final sentence.

### **Functionality**

1.  The user enters text into the first input box. The text immediately appears in the "Live Preview" area below.
2.  As the user moves to the next input box, the new text is appended to the preview, forming a complete paragraph.
3.  A "Copy to Clipboard" button is located below the "Live Preview" area.
4.  When the user clicks this button, the entire generated paragraph is copied, and a confirmation message ("Copied!") appears briefly.
5.  A "Start Over" button allows the user to clear all fields and begin again.

---

## **Component: YouTube Video Activity**

*   **Associated Content:** `handouts/video-activities/*.html`
*   **Learning Goal:** To provide a standardized, engaging, and printable format for video-based "Do Now" activities and lessons.

### **Concept**

A reusable component that embeds a YouTube video and displays a set of critical thinking questions alongside it. The component must be responsive and provide a clean, printable view that excludes the video itself.

### **Interface & Layout**

*   **Container:** The entire component will be wrapped in a container with a distinct background color (e.g., `bg-blue-50`) and a border to set it apart from the main content.
*   **Video Player:**
    *   A responsive, embedded YouTube player will be at the top of the component.
    *   It will use a 16:9 aspect ratio.
    *   This entire video player container **must not** be visible when the page is printed. A `video-container` class should be used for this purpose.
*   **Instructions:**
    *   Below the video, a clear instruction block will tell the user to watch the video and consider the questions.
    *   It will include a direct link to the YouTube video for users who cannot see the embed or wish to open it in a new tab.
*   **Questions:**
    *   The critical thinking questions will be displayed in a clean, numbered list.
    *   Each question will be followed by a multi-line text area (e.g., a `div` with a border and some lines) for students to write their answers. This area should be designed to look good on both screen and paper.

### **Print-Specific Styling (`@media print`)**

*   The `.video-container` class must have `display: none;`.
*   The component's background color should be removed to save ink (`background-color: transparent;`).
*   The layout should be optimized for a standard A4 page.

### **Functionality**

*   This is primarily a static display component. No complex JavaScript is required beyond the YouTube embed itself.
*   The component should be designed to be easily dropped into any handout or lesson plan.
*   The content (YouTube URL, questions) will be hardcoded in each file that uses the component.

---

## **Component: Resource Tags**

*   **Associated Content:** All resource cards on hub pages (e.g., `handouts.html`, `lessons.html`).
*   **Learning Goal:** To provide clear, at-a-glance information about a resource's content and type, improving filterability and user experience.

### **Concept**

A set of visually distinct, standardized tags that appear on each resource card. These tags will be driven by the `data-tags` attribute in the HTML, making the system consistent and easy to manage.

### **Interface & Layout**

*   **Location:** The tags will appear in the footer of each `.resource-card`.
*   **Appearance:**
    *   Each tag will be a small, padded element with rounded corners (e.g., `border-radius: var(--radius-sm);`).
    *   They will have a consistent, subtle background color (e.g., `background-color: var(--color-background);`).
    *   The text will be clear and legible (e.g., `font-size: 0.8rem; font-weight: 500;`).
*   **Tag Styling:**
    *   **Default Tag:** A neutral grey background.
    *   **"Do Now" Tag:** Should have a distinct, eye-catching style. Suggestion: Use `--color-accent` (gold) as the background with dark text to make it stand out.
    *   **"Video Activity" Tag:** Should have its own distinct style. Suggestion: Use `--color-secondary` (teal) as the background with white text.
    *   Other tags (e.g., "Social Studies", "Critical Thinking") will use the default style.

### **Functionality**

1.  The tags will be generated based on the comma-separated values in the `data-tags` attribute of the resource card's container.
2.  The `js/filtering-system.js` will read these tags for its filtering logic.
3.  The CSS in `main.css` will provide the styling for the different tag types (e.g., `.resource-tag[data-tag="do-now"]`).

### **Example HTML Structure**

```html
<div class="resource-card" data-tags="do-now,video-activity,social-studies">
    ...
    <div class="resource-card-meta">
        <span class="resource-tag" data-tag="do-now">Do Now</span>
        <span class="resource-tag" data-tag="video-activity">Video Activity</span>
        <span class="resource-tag" data-tag="social-studies">Social Studies</span>
    </div>
</div>
```
