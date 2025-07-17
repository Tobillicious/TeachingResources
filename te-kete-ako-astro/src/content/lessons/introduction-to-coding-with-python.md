---
title: "Introduction to Coding with Python: A Lesson Plan"
description: "A comprehensive beginner-friendly lesson plan to introduce fundamental Python programming concepts, tailored for diverse learners in Aotearoa New Zealand."
author: "Kaiako Digital Technologies"
publishDate: 2025-07-17
tags: ["Coding", "Python", "Programming", "Computer Science", "Digital Technologies", "Lesson Plan"]
level: 7
learningArea: "Digital Technologies"
---

## Summary

This lesson plan introduces students to the foundational concepts of Python programming, focusing on its readability, versatility, and practical applications. Through interactive activities and culturally relevant examples, students will write and execute their first Python program, understand variables, and perform basic arithmetic, fostering computational thinking and digital literacy.

**Resources:**
*   Computers with Python installed (or access to an online Python interpreter like Replit or Google Colab).
*   Whiteboard or projector.
*   Markers/pens.
*   Worksheet: "Python Basics Practice: Our Kura Code" (to be created by ContentCuratorAgent, focusing on local examples).
*   Optional: Video showcasing Python applications in areas relevant to students' interests (e.g., game development, animation, data analysis of local issues).

## Overview

**LEARNING AREA:** Digital Technologies

**YEAR LEVEL:** Year 7-9 (adaptable for Year 10-13 with extended challenges)

**ACHIEVEMENT OBJECTIVES/TE MATAIAHO LINKS:** Students will understand basic programming concepts and apply them to create simple programs; develop computational thinking strategies to solve problems; understand how digital systems work and their impact on society (NZC Digital Technologies, Progress Outcome 3/4; Te Mataiaho: Te Ao Hangarau - Digital Technologies, Te Ao Tangata - Social Sciences).

**KEY COMPETENCIES:** Thinking (designing algorithms, problem-solving, abstracting), Managing Self (perseverance, self-regulation in debugging), Participating and Contributing (collaborative coding, peer support), Using Language, Symbols, and Texts (interpreting code, writing clear instructions).

**VALUES:** Whanaungatanga (collaborative learning, peer support in coding challenges), Manaakitanga (creating an inclusive learning environment where all students feel capable of coding), Whaiora (fostering enjoyment and curiosity in digital creation), Tūrangawaewae (connecting coding to local contexts and student experiences, e.g., creating programs that use Te Reo Māori or address local community needs).

**DURATION:** 75 minutes fixed.

**CULTURAL CONSIDERATIONS & ADAPTATIONS:** Use analogies from Māori or Pasifika weaving, carving, or storytelling to explain sequential instructions or patterns in code; encourage students to create programs that reflect their cultural identity or solve problems relevant to their communities (e.g., a program to greet in Te Reo Māori, calculate costs for a family event, or display local weather data); ensure diverse representation in examples and role models.

## Core Lesson Components

**DO NOW ACTIVITY:** Display a simple set of instructions (e.g., how to make a cup of tea, how to perform a basic haka step) and ask students to identify the individual steps and their order, leading into the idea of precise instructions for computers. (10 minutes)

**LEARNING INTENTION:** To understand what programming is and why Python is a good language for beginners, and to write and run simple Python programs.

**SUCCESS CRITERIA:** I can write and execute a basic Python `print()` statement, define and use variables, and perform simple arithmetic operations in Python.

**EXIT TICKET:** Students write one line of Python code that either prints a message, defines a variable, or performs a simple calculation, and explain what it does. (5 minutes)

## Instructions to Teach

Engage students in an interactive exploration of Python's foundational concepts by guiding them through hands-on coding exercises, fostering a collaborative debugging environment, and connecting abstract programming principles to tangible, culturally relevant applications.

## Lesson Content

### 1. What is Coding?

**Programming (or coding)** is writing instructions for a computer to follow. Computers are very powerful, but they only do exactly what you tell them to do! A **programming language** is the special language we use to give these instructions.

**Python** is a very popular programming language known for its simple syntax (rules) and readability. It was created by Guido van Rossum and first released in 1991. It's often recommended for beginners because it reads almost like plain English.

**Why Python?**
*   **Easy to Learn:** Python's clear and concise syntax makes it an excellent language for beginners. You can focus on learning *what* to code rather than getting bogged down in complicated rules.
*   **Versatile:** Python is used in a huge range of fields: web development, data science, artificial intelligence, game development, automation, and more. Learning Python opens up many exciting possibilities!
*   **Large Community:** Python has a massive and active global community. This means there are countless online resources, tutorials, and people ready to help if you get stuck or want to learn more.
*   **Real-world Impact:** Companies like Google, Netflix, NASA, and even local New Zealand tech companies use Python. Learning Python means you're learning a skill used to build some of the most exciting technologies in the world.

### 2. Your First Python Program: `print()`

The traditional first program in almost any programming language is to make the computer say "Hello, World!". It's a simple way to check that your coding environment is set up correctly and to see immediate results.

To run Python code, you'll need a Python interpreter. You can install Python on your computer, or use a free online coding environment like [Replit](https://replit.com/languages/python3) or [Google Colab](https://colab.research.google.com/) (which are great for beginners as they require no installation).

```python
print("Kia ora, Ao!") # This prints "Hello, World!" in Te Reo Māori
```

*   The `print()` function tells the computer to display whatever is inside the parentheses `()` on the screen.
*   The text inside the quotes `""` (like "Kia ora, Ao!") is called a **string**. Strings are used for text.

**Activity:** Have students open their Python environment. Type and run `print("Hello, World!")`. Then, have them modify it to print their name, a favorite quote, or a message in Te Reo Māori.

### 3. Variables and Data Types

In programming, a **variable** is like a named container or a box where you can store pieces of information. You give the box a name, and then you can put different things inside it or take them out later. The type of information you store is called a **data type**.

```python
# Storing a name (text/string)
student_name = "Aroha"
print(student_name)

# Storing a whole number (integer)
age = 13
print(age)

# Storing a number with decimals (float)
height_meters = 1.65
print(height_meters)

# You can change what's in the box
student_name = "Wiremu"
print(student_name)
```

**Common Data Types:**
*   **Strings (`str`):** Used for text (e.g., `"Kia ora"`, `"Mangakotukutuku College"`). Always enclosed in single or double quotes.
*   **Integers (`int`):** Used for whole numbers (e.g., `10`, `150`, `-5`).
*   **Floats (`float`):** Used for numbers with decimal points (e.g., `3.14`, `98.6`).

**Activity:** Have students create variables for their name, age, and a favorite number. Print each variable to see its value.

### 4. Basic Arithmetic Operations

Python can also act like a powerful calculator. You can perform basic math operations directly or with variables.

*   **Addition:** `+`
*   **Subtraction:** `-`
*   **Multiplication:** `*`
*   **Division:** `/`

```python
# Direct calculations
print(10 + 5)   # Output: 15
print(20 - 7)   # Output: 13
print(4 * 6)    # Output: 24
print(10 / 2)   # Output: 5.0 (division always results in a float)

# Calculations with variables
apples_in_basket = 12
eaten_apples = 3
remaining_apples = apples_in_basket - eaten_apples
print(remaining_apples) # Output: 9

price_per_item = 2.50
quantity = 4
total_cost = price_per_item * quantity
print(total_cost) # Output: 10.0
```

**Activity:** Have students practice basic arithmetic operations. Challenge them to write a program that calculates the area of a rectangle (e.g., `length = 5`, `width = 10`, `area = length * width`).

### Next Steps

Now that you've learned the basics, you can start experimenting! Try writing your own programs to:

*   Print a message about your favourite place in Aotearoa, including its coordinates (using float variables).
*   Store the number of students in your class and the number of teachers, then calculate the ratio.
*   Create a simple program that calculates the total cost of ingredients for a shared kai (food) event, considering different quantities and prices.

### Further Resources:

*   [Codecademy - Learn Python 3](https://www.codecademy.com/learn/learn-python-3) (Interactive tutorials)
*   [W3Schools - Python Tutorial](https://www.w3schools.com/python/)
*   [Python for Kids](https://www.pythonforkids.org/) (A great resource for younger learners)
*   [Te Reo Māori in Python](https://github.com/Te-Hiku-Media/te-reo-maori-python) (For advanced exploration of Te Reo Māori integration)