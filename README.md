## Nayana AI 

A gentle AI companion designed to support new mothers through contextual and emotionally-aware baby care guidance.

## Inspiration

The character “Nayanika” was inspired by my daughter, who shares the same name.

She has a naturally warm and cheerful personality — always smiling, even when meeting new people for the first time. That feeling of comfort, kindness, and emotional warmth became the inspiration behind the AI companion’s personality and interaction style.

Rather than creating a cold or purely technical assistant, I wanted Nayanika to feel calm, supportive, and emotionally reassuring for new mothers.

This project is both a technical exploration and a personal expression of warmth and caregiving.

## Features

- 🍼 Nutrition Guidance
- 😭 Cry Analysis
- 😴 Sleep Support
- 💛 Emotional Support
- 🧠 Contextual Memory
- 🎭 Character-driven AI persona
- 🚧 AI Guardrail System
- 📱 Responsive UI

## How AI is Integrated

Nayana AI uses a multi-skill AI system powered by OpenRouter to provide contextual and empathetic support for new mothers.

Instead of acting as a generic chatbot, the system is designed with specialized AI skills that respond differently based on user intent.

Core Flow:
User Input → Intent Detection → Skill Selection → Prompt Engineering → AI Response

Key Components:

Intent Detection
The system analyzes user input using keyword-based logic to determine the most relevant caregiving scenario (crying, feeding, sleep, or emotional stress).
Skill-Based Architecture
Each scenario maps to a dedicated AI skill:
Cry Analysis
Nutrition Guidance
Sleep Support
Emotional Support
Structured Prompting
Prompts are dynamically built using:
A consistent AI persona (Nayanika)
User input
Conversation history
Baby profile (e.g., age)
Memory System
The system retains:
Recent conversation context
Structured baby data
This allows responses to become more personalized over time.
OpenRouter Integration
Requests are sent to OpenRouter (GPT-based models) via a Next.js API route, ensuring scalable and real-time responses.

Result:
The AI behaves like a supportive assistant rather than a generic chatbot, delivering contextual, empathetic, and practical guidance.

## What Makes It Unique

Nayana AI is designed as a focused, emotionally-aware AI system rather than a generic chatbot.

1. Skill-Based AI Architecture
Instead of a single prompt, the system uses multiple specialized AI skills (cry analysis, sleep support, nutrition, emotional support).
Each skill has its own logic and prompt structure, making responses more relevant and contextual.

2. Character-Driven Experience
The AI is built around a consistent persona — Nayanika, a gentle and supportive AI babysitter.
This creates a sense of presence and emotional connection, not just information delivery.

3. Context-Aware Responses
The system combines:

User input
Conversation history
Baby profile (e.g., age)

This allows responses to adapt over time instead of repeating generic advice.

4. Emotional UX Focus
The design prioritizes calmness and reassurance:

Warm color palette
Friendly typography
Non-judgmental tone

The goal is to reduce stress, not just provide answers.

5. Simple but Scalable Architecture
The system is intentionally lightweight (Next.js + API route + OpenRouter),
but structured in a way that allows easy expansion with new skills and features.

Result:
A more human-like, supportive AI experience tailored for real-world parenting scenarios.

## Branding Note

👉 emotional UX + warm pastel

## Tech Stack

- Next.js
- TypeScript
- OpenRouter API
- GPT-4o-mini
- Lucide React
- Vercel

## AI Flow

User Input
→ Intent Detection
→ Skill Selection
→ Prompt Builder
→ OpenRouter API
→ AI Response

## Live Demo

https://nayana-ai.vercel.app

## Installation

``bash
npm install
npm run dev

## ENV

``md id="0ibgby"

## Environment Variables

OPENROUTER_API_KEY=your_api_key

## Author

Created with care by Adhi Haekal 