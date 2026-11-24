# AI Chatbot

A full-stack AI chatbot built using React, TypeScript, Express.js, and Google's Gemini API. This project is being developed to explore LLM integration, conversational context management, and AI application development.

## Features

- AI-powered conversations using Google Gemini.
- Multi-turn conversation history.
- Sliding-window context management to limit the number of messages sent to the model.
- Configurable conversation history limit.
- Markdown rendering with GitHub Flavored Markdown support.
- Separate frontend and backend architecture.
- Environment-based configuration for API keys and backend URLs.

## Tech Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS
- React Markdown
- Remark GFM

**Backend**
- Node.js
- Express.js
- TypeScript
- Google GenAI SDK
- Nodemon

**Package Manager:** Bun

## Project Structure

```text
ai-chatbot/
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── index.css
│   └── .env
│
├── backend/
│   ├── index.ts
│   └── .env
│
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd ai-chatbot
```

### 2. Set up the backend

```bash
cd backend
bun install
```

Create a `.env` file inside the backend directory:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
MAX_HISTORY_MESSAGES=10
```

Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

Start the backend:

```bash
bun run dev
```

The backend runs at `http://localhost:5000`.

### 3. Set up the frontend

Open another terminal:

```bash
cd frontend
bun install
```

Create a `.env` file inside the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the frontend:

```bash
bun run dev
```

Open the local URL provided by Vite in your browser.

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `GEMINI_API_KEY` | Backend | Gemini API authentication key |
| `GEMINI_MODEL` | Backend | Gemini model identifier |
| `MAX_HISTORY_MESSAGES` | Backend | Maximum conversation messages sent per request |
| `VITE_BACKEND_URL` | Frontend | Express backend URL |

## Current Architecture

```text
React Frontend
      |
      | HTTP POST /api/chat
      v
Express Backend
      |
      | Validate and select recent messages
      v
Gemini API
      |
      | Generated response
      v
Express Backend
      |
      v
React Frontend
```

## Learning Roadmap

The project is being developed incrementally to explore:

- [x] React and Express integration
- [x] Gemini API integration
- [x] Multi-turn conversation history
- [x] Sliding-window history management
- [ ] Token-based context management
- [ ] Conversation summarization
- [ ] Database-backed chat persistence
- [ ] Retrieval-Augmented Generation (RAG)
- [ ] Long-term conversational memory
- [ ] Streaming AI responses

## Security

- Never commit API keys or `.env` files.
- Keep Gemini API credentials on the backend.
- Frontend environment variables prefixed with `VITE_` are exposed to the browser.

## Purpose

This project is primarily a hands-on learning experience focused on understanding how AI-powered applications are designed, built, and improved beyond simply calling an LLM API.
