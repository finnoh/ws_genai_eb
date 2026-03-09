# AI Agents in Economics and Business Research

Public workshop repository for the Tinbergen Institute 2-day course on AI agents in economics and business research.

## What is in this repository

- `AGENTS.md`: single source of truth for course outline, schedule, and teaching operations.
- `slides/`: Quarto revealjs slide decks for Day 1 and Day 2.
- `website/`: Docusaurus companion website for participants.
- `resources/`: curated links, paper registry, and open-access PDFs.
- `scripts/`: helper scripts for slide rendering and Google Forms/Sheets workflow.

## Course structure

- Day 1: foundations (LLMs, prompting, coding agents, safety basics)
- Day 2: advanced systems (MCP, memory, LangChain/OpenClaw, research workflows)
- Design target: roughly 50% hands-on exercises.

## Quick start

### 1) Companion website

```bash
cd website
npm install
npm run start
```

### 2) Render slides

```bash
./scripts/render_slides.sh
```

Slides are rendered into `website/static/slides/` so they can be linked from the companion site.

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-website.yml`.

On pushes to `main`, it:

1. renders Quarto slides,
2. builds the Docusaurus site,
3. deploys to GitHub Pages.

## Submission workflow

We use Google Forms + Google Sheets for reliability in live teaching. The full operational details are in `AGENTS.md` under "Exercise Submission Workflow".
