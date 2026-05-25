# AGENTS.md

## Project Overview

Simple Vite + React + Tailwind v4 portfolio site with Google Gemini AI integration.

## Commands

- `npm run dev` - Start dev server on port 3000 (exposed to 0.0.0.0)
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - TypeScript typecheck only

## Setup

- Copy `.env.example` to `.env.local` and set `GEMINI_API_KEY`
- Environment variables are injected via `vite.config.ts` using `loadEnv()`

## Key Config Notes

- Tailwind v4 is used (via `@tailwindcss/vite` plugin)
- `@` alias maps to project root
- HMR is conditionally disabled via `DISABLE_HMR` env var (AI Studio requirement)

## TypeScript

- Strict mode disabled (`skipLibCheck: true`, `noEmit: true`)
- Path aliases in both `tsconfig.json` and `vite.config.ts`