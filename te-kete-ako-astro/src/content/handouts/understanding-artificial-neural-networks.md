---
title: "Understanding Artificial Neural Networks: Handout"
description: "A comprehensive handout introducing the basic concepts of how artificial neural networks work, their components, and learning process, designed for digital technologies and computer science students."
author: "Kaiako Digital Technologies"
publishDate: 2025-07-17
tags: ["AI", "Machine Learning", "Neural Networks", "Computer Science", "Digital Technologies", "Comprehension Handout", "Aotearoa New Zealand Curriculum"]
level: 10
learningArea: "Digital Technologies"
---

## Summary

This handout provides a foundational introduction to Artificial Neural Networks (ANNs), a key component of modern Artificial Intelligence. It explains what ANNs are, how they are structured with interconnected "neurons" and layers, and the role of key components like weights and activation functions. The handout details the learning process (training, forward propagation, backpropagation) and highlights diverse real-world applications, fostering an understanding of this complex technology.

**Key Concepts Covered:**
*   Definition and inspiration of Artificial Neural Networks (ANNs).
*   Structure of ANNs (input, hidden, output layers).
*   Key components (neurons, connections, weights, activation function).
*   The learning process (training, forward propagation, backpropagation, iteration).
*   Applications of ANNs (image recognition, NLP, recommendation systems).

## Overview for Kaiako

**LEARNING AREA:** Digital Technologies (primary), Mathematics, Science (secondary)

**YEAR LEVEL:** Year 10-13

**CURRICULUM LINKS:** Supports Achievement Objectives related to understanding how digital systems work and their impact on society; exploring the ethical considerations of emerging technologies; understanding computational thinking and algorithms; analyzing complex systems (NZC Digital Technologies, Progress Outcome 4/5; Mathematics, Level 5; Te Mataiaho: Te Ao Hangarau - Digital Technologies, Te Ao Tau - Mathematics).

**KEY COMPETENCIES:** Thinking (analyzing complex systems, abstract reasoning, problem-solving), Managing Self (engaging with complex technical concepts), Participating and Contributing (discussing AI applications and ethics), Using Language, Symbols, and Texts (interpreting technical diagrams, understanding algorithms).

**VALUES:** Whanaungatanga (understanding AI's impact on communities, fostering inclusive technological development), Manaakitanga (caring for people's well-being in an AI-driven world, addressing bias in AI), Whaiora (fostering curiosity and innovation responsibly), Tūrangawaewae (connecting AI to local industries and cultural contexts, discussing data sovereignty for Māori/Pasifika in AI training).

**CULTURAL CONSIDERATIONS & ADAPTATIONS:** Discuss how the concept of interconnectedness in ANNs might relate to Māori concepts of whakapapa (genealogy) or the interconnectedness of all things; explore ethical discussions around AI from diverse cultural perspectives, including Māori views on mauri (life force) and tapu (sacredness) in relation to artificial creations; use examples of AI applications in New Zealand industries or research that are relevant to students' backgrounds; encourage students to consider how AI can be developed and used in ways that are culturally appropriate and beneficial to all communities.

## What are Artificial Neural Networks (ANNs)?

**Artificial Neural Networks (ANNs)**, often just called **neural networks**, are a subset of **machine learning** inspired by the structure and function of the human brain. They are designed to recognize patterns, make predictions, and solve problems that are difficult for traditional rule-based programming. Think of them as a simplified, digital version of how our brains learn.

### How do ANNs Work?

ANNs consist of interconnected "neurons" (nodes) organized in layers:

1.  **Input Layer:** This is where the initial data enters the network (e.g., pixels of an image, numbers representing features of a dataset, words in a sentence).
2.  **Hidden Layers:** One or more layers between the input and output layers. This is where the actual processing and complex calculations are done through a system of weighted connections. Each "neuron" in a hidden layer takes inputs from the previous layer, performs a calculation (using an **activation function**), and passes the result to the next layer.
3.  **Output Layer:** This produces the final result of the network (e.g., a classification like "cat" or "dog," a prediction like a stock price, or a translated sentence).

### Key Components:

*   **Neurons (Nodes):** These are the basic processing units of the network. They receive inputs, perform a simple calculation, and transmit an output to other neurons.
*   **Connections (Edges):** These are the links between neurons. Each connection has an associated **"weight."**
*   **Weights:** Numerical values that represent the strength and importance of the connection between neurons. A higher weight means that input has a stronger influence on the output. During training, these weights are adjusted.
*   **Activation Function:** A mathematical function applied to the output of a neuron. It introduces non-linearity into the network, allowing it to learn complex patterns and relationships in the data.

### The Learning Process (Training):

ANNs learn from data through a process called "training." This is how they get better at their tasks:

1.  **Forward Propagation:** Input data is fed into the network, processed through the hidden layers, and an output is generated. This is like the network making its first guess.
2.  **Loss Calculation:** The network's output (its guess) is compared to the actual desired output (the correct answer). A "**loss**" or "**error**" is calculated, indicating how far off the prediction was.
3.  **Backpropagation:** The calculated loss is then propagated backward through the network. This is the crucial step where the network learns: it uses the error to adjust the **weights** of the connections in a way that reduces the error for future predictions.
4.  **Iteration:** This forward and backward process (forward propagation, loss calculation, backpropagation) is repeated many times (thousands or millions of times) with large datasets. Each repetition is an "iteration" or "epoch," allowing the network to learn and continuously improve its accuracy.

### Applications of ANNs:

Neural networks are used in a wide range of applications that impact our daily lives:

*   **Image Recognition:** (e.g., facial recognition on phones, identifying objects in photos, medical imaging analysis).
*   **Natural Language Processing (NLP):** (e.g., language translation, sentiment analysis, chatbots, spam filters).
*   **Speech Recognition:** (e.g., voice assistants like Siri and Alexa, transcribing audio).
*   **Recommendation Systems:** (e.g., Netflix suggesting movies, Amazon recommending products, Spotify playlists).
*   **Financial Forecasting:** (e.g., predicting stock prices, detecting fraudulent transactions).
*   **Healthcare:** (e.g., assisting in disease diagnosis, drug discovery).

### Further Resources:

*   [IBM - What are Artificial Neural Networks?](https://www.ibm.com/cloud/learn/neural-networks)
*   [Towards Data Science - A Beginner's Guide to Neural Networks](https://towardsdatascience.com/a-beginners-guide-to-neural-networks-1f136a13666)
*   [AI Forum of New Zealand](https://aiforum.org.nz/) (For local context and discussions on AI)