---
title: "Introduction to Web Development (HTML/CSS): A Lesson Plan"
description: "A comprehensive beginner's guide to building basic web pages using HTML and CSS, tailored for diverse learners in Aotearoa New Zealand."
author: "Kaiako Digital Technologies"
publishDate: 2025-07-17
tags: ["Web Development", "HTML", "CSS", "Front-end", "Digital Technologies", "Lesson Plan"]
level: 7
learningArea: "Digital Technologies"
---

## Summary

This lesson plan introduces students to the foundational roles of HTML and CSS in web development. Through hands-on activities, students will learn to structure content with HTML and style it with CSS, creating their first basic webpages. The lesson emphasizes practical application and encourages creativity, connecting web development to real-world communication and cultural expression.

**Resources:**
*   Computers with a text editor (like VS Code, Sublime Text, or Notepad++) and a web browser.
*   Whiteboard or projector.
*   Markers/pens.
*   Worksheet: "HTML & CSS Practice: My Kura Page" (to be created by ContentCuratorAgent, focusing on creating a page about the school or a local topic).
*   Optional: Examples of simple, well-designed websites (including those with cultural significance).

## Overview

**LEARNING AREA:** Digital Technologies

**YEAR LEVEL:** Year 7-9 (adaptable for Year 10-13 with extended challenges)

**ACHIEVEMENT OBJECTIVES/TE MATAIAHO LINKS:** Students will understand how digital systems work and their impact on society; apply basic programming concepts to create digital content; understand the principles of user interface design; develop skills in digital communication and collaboration (NZC Digital Technologies, Progress Outcome 3/4; Te Mataiaho: Te Ao Hangarau - Digital Technologies, Te Ao Tangata - Social Sciences).

**KEY COMPETENCIES:** Thinking (designing structures, problem-solving styling issues), Managing Self (perseverance in coding, attention to detail), Participating and Contributing (collaborative web design, peer feedback), Using Language, Symbols, and Texts (interpreting code, writing clear markup).

**VALUES:** Whanaungatanga (collaborative web projects, creating content for the school community), Manaakitanga (designing accessible and user-friendly websites), Whaiora (fostering creativity and digital expression), Tūrangawaewae (creating webpages about local places, history, or cultural events, promoting digital storytelling from a New Zealand perspective).

**DURATION:** 75 minutes fixed.

**CULTURAL CONSIDERATIONS & ADAPTATIONS:** Encourage students to create webpages that reflect their cultural identity, family history, or local marae/community; discuss the importance of web accessibility for diverse users, including those who speak different languages or have different abilities; use examples of websites that effectively incorporate Māori or Pasifika design elements or content; explore how digital platforms can be used to share cultural knowledge and stories.

## Core Lesson Components

**DO NOW ACTIVITY:** Ask students: "Imagine you want to share information with the whole world. How would you do it using technology?" Discuss ideas, leading to the concept of websites. Show a very simple webpage and ask what they think makes it up. (10 minutes)

**LEARNING INTENTION:** To understand the roles of HTML and CSS in web development, create a basic HTML document with common tags, apply basic CSS styles, and link an external CSS stylesheet.

**SUCCESS CRITERIA:** I can explain the purpose of HTML and CSS, create an HTML file with a heading and paragraph, apply a basic CSS style (e.g., change text color), and correctly link an external stylesheet.

**EXIT TICKET:** Students write one thing they found interesting about building a webpage and one question they have about web development. (5 minutes)

## Instructions to Teach

Guide students through the foundational concepts of web development by demonstrating the distinct roles of HTML for structure and CSS for styling, facilitating hands-on coding exercises to build and customize basic webpages, and encouraging creative expression through digital design.

## Lesson Content

### 1. What is Web Development?

**Web development** is the process of building websites and web applications. It involves creating the code that tells a web browser what to display and how to display it.

*   **HTML (HyperText Markup Language):** This is the **structure and content** of a web page. Think of it as the skeleton of a house – it defines the rooms, walls, and where things go.
*   **CSS (Cascading Style Sheets):** This controls the **appearance and layout** of a web page. This is like the paint, furniture, and decorations that make the house look good.

### 2. Building with HTML

HTML uses **tags** to define different parts of a webpage. Tags are usually written in pairs, with an opening tag (`<tag>`) and a closing tag (`</tag>`).

**Basic HTML Structure:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
</head>
<body>
    <h1>Welcome to My Page!</h1>
    <p>This is my first paragraph.</p>
    <p>I'm learning web development.</p>
</body>
</html>
```

**Common HTML Tags:**
*   `<html>`: The root of an HTML page.
*   `<head>`: Contains meta-information about the HTML document (not visible on the page).
*   `<body>`: Contains the visible page content.
*   `<h1>` to `<h6>`: Headings (h1 is the largest, h6 is the smallest).
*   `<p>`: Paragraphs.
*   `<title>`: Sets the title that appears in the browser tab.
*   `<meta>`: Provides metadata about the HTML document.
*   `<ul>`: Unordered list (bullet points).
*   `<li>`: List item.

**Activity:** Have students create a new file named `index.html` in a folder. Type the basic structure above. Save and open in a web browser. Then, add more paragraphs, a second heading (`<h2>`), and a list (`<ul>`, `<li>`) about their favorite things at school.

### 3. Styling with CSS

CSS makes your HTML look good! It allows you to control colors, fonts, spacing, and layout.

**External Stylesheet:** This is the best way to apply CSS for larger projects. You create a separate `.css` file and link it to your HTML.

1.  Create a new file named `style.css` in the same folder as your `index.html`.
2.  Link the CSS file to your HTML by adding this line inside the `<head>` section of your `index.html`:
    ```html
    <link rel="stylesheet" href="style.css">
    ```

**Basic CSS Rules:**

CSS rules consist of a **selector** (what you want to style), and **declarations** (how you want to style it).

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 20px;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}
```

**Activity:** Have students add the CSS rules above to their `style.css` file. Experiment by changing colors (e.g., `color: blue;`), font sizes (e.g., `font-size: 24px;`), or background colors (e.g., `background-color: lightblue;`) and refresh their browser to see the changes.

### Next Steps

Now that you understand the basics of HTML and CSS, you can explore more advanced topics like:

*   More CSS properties (e.g., `padding`, `margin`, `border`).
*   Creating responsive designs that look good on phones and tablets.
*   Adding interactivity with JavaScript.
*   Building multi-page websites.

### Further Resources:

*   [MDN Web Docs - Learn web development](https://developer.mozilla.org/en-US/docs/Web)
*   [W3Schools - HTML Tutorial](https://www.w3schools.com/html/)
*   [W3Schools - CSS Tutorial](https://www.w3schools.com/css/)
*   [Codecademy - Learn HTML & CSS](https://www.codecademy.com/learn/learn-html-css) (Interactive tutorials)