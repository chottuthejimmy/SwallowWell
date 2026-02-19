# SwallowWell — TanStack Dysphagia Self-Help Web App

SwallowWell is a functional, route-based self-help experience for Indian adults and families managing dysphagia.
It helps users get most day-to-day support **inside the website first**, and only escalate to a counselor when risk or trends indicate they should.

## Tech Stack

- React + TypeScript + Vite
- TanStack Router
- TanStack Query
- TanStack Form
- TanStack Table
- Tailwind CSS + Framer Motion
- Recharts

## Core User Flows

### 1) Quick Risk Check (`/risk-check`)
- Guided symptom screening with weighted scoring
- Red-flag override for high-risk conditions
- Low / Moderate / High recommendation output
- Auto-prompts counselor escalation when needed

### 2) Daily Toolkit (`/toolkit`)
- Texture-level based Indian meal guidance
- Exercise guidance by focus area (with medical caution notices)
- Daily logger for hydration, tolerated meals, cough/choking episodes, energy, notes

### 3) Progress Dashboard (`/dashboard`)
- 7-log trend chart (hydration and cough episodes)
- Summary KPI cards
- TanStack Table log history

### 4) Knowledge Base (`/knowledge-base`)
- Search + category filtering for practical FAQs
- Designed so users can self-serve common questions quickly

### 5) Counselor Escalation (`/counselor`)
- Escalation highlighting based on risk and symptom trend
- Auto-generated handoff summary
- Mailto shortcut for faster communication

## Local Development

```bash
npm install
npm run dev
```

Build and preview production bundle:

```bash
npm run build
npm run preview
```

Run automated end-to-end validation:

```bash
npm run test:e2e
```

This script boots preview mode, executes browser checks across all core routes, validates data flow (risk check → toolkit log → dashboard → counselor summary), and fails on any broken flow.

## Data & Privacy

- App data is stored in browser `localStorage` only.
- No backend persistence is configured by default.
- You can integrate APIs later using the existing TanStack Query layer.

## Safety Disclaimer

This product is for educational support only and does **not** provide diagnosis.
All diet and exercise decisions should be confirmed by a qualified speech-language pathologist (SLP) or physician, especially for high-risk signs (frequent choking, recurrent chest infection, rapid decline).
