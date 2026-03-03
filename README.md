# ai-form
Custom form with AI-powered review suggestions

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure your OpenAI API key:
   ```bash
   cp .env.example .env
   # Edit .env and set VITE_OPENAI_API_KEY
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

## Features

- **Section 1 – Project Information**: Name, email, project type, completion date
- **Section 2 – Product Satisfaction**: 1–5 star ratings for quality, craftsmanship, expectations, durability, and aesthetics, plus open-ended feedback
- **Section 3 – Design & Communication Process**: 1–5 star ratings for communication, vision, collaboration, transparency, and timeline
- **Section 4 – Value & Professionalism**: 1–5 ratings plus NPS (0–10) recommendation score
- **Section 5 – Optional AI Questions**: Open-ended responses that enrich the AI-generated review
- **Section 6 – AI Review Generator**: Generates a Google Review draft using OpenAI and links to the Google Review page

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key |

> **Note:** `VITE_` prefix exposes the variable to the browser bundle. For production use, consider routing AI requests through a backend server to keep the API key private.
