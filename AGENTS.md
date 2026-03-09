# AGENTS.md

## Project Overview

This repository is the public source for the Tinbergen Institute workshop:

**AI Agents in Economics and Business Research**

The stack is intentionally lightweight and reliable:

- Quarto revealjs for slides
- Docusaurus for participant companion website
- Google Forms + Google Sheets for exercise submissions and live classroom review

This file is the operational memory for future agent sessions.

## Course Outline (2 Days)

### Day 1 - Foundations

- Intro to LLMs
- What are AI agents?
- Prompting and context engineering fundamentals
- Tools and MCP basics
- IDEs with integrated agents (VS Code / Copilot / Cursor)
- AI support for coding and writing workflows
- Responsible use baseline (privacy, copyright, confidential data)

### Day 2 - Advanced Practice

- Agent systems design
- Short-term and long-term memory patterns
- LangChain and OpenClaw orientation
- AI agents in research pipeline design
- Ideation, synthetic respondents, experiment design support
- Reliability and evaluation patterns
- Sustainability, cognitive load, and skill retention

## Teaching Schedule (Target: 50% hands-on)

### Day 1 schedule template

- 09:00-09:30: kickoff and framing
- 09:30-10:30: LLM/agent foundations
- 10:30-11:00: exercise block 1
- 11:15-12:15: prompting and context engineering
- 12:15-12:45: exercise block 2
- 13:45-14:45: coding agents in IDEs
- 14:45-15:15: exercise block 3
- 15:30-16:30: safety and danger zones
- 16:30-17:00: synthesis and assignments

### Day 2 schedule template

- 09:00-09:30: recap and setup
- 09:30-10:30: MCP, tools, memory, orchestration
- 10:30-11:00: exercise block 4
- 11:15-12:15: LangChain/OpenClaw mini systems
- 12:15-12:45: exercise block 5
- 13:45-14:45: research workflow integration
- 14:45-15:15: exercise block 6
- 15:30-16:15: reliability and evaluation
- 16:15-17:00: presentations and close

## Slide Style Rules

Use the `quarto-slide-types` style baseline:

- max 3 bullets per slide
- max 6 words per bullet
- one core idea per slide
- visual hierarchy over prose

In this repo, keep slide content concise and keep explanatory detail in speaker notes.

## Exercise Submission Workflow (Google Forms + Sheets)

### Why this workflow

- high reliability in classroom settings
- minimal participant friction
- fast review for in-class discussion

### Data path

1. Participants open exercise links from companion website.
2. They submit through a single Google Form.
3. Responses land in Google Sheets.
4. Companion website live-results page reads sheet output.
5. Slides embed the live-results page for immediate discussion.

### Submission schema

Use one form with these fields:

- `exercise_id` (short text)
- `group_id` (short text)
- `answer_type` (multiple choice: text/code/link/upload)
- `answer` (paragraph)
- `artifact_url` (optional link)

### Operational defaults

- no sign-in requirement
- group code based submissions
- keep one global form for all exercises
- exercise link uses prefilled `exercise_id`

### During class

- launch exercise from website `Live Exercises`
- let groups submit within a fixed timebox
- open `Live Results` and discuss examples
- use the built-in group picker in slides for presentations

### Fallbacks

- if site fails: share direct form URL + QR
- if live board fails: open the response sheet directly
- if network is unstable: extend timebox and collect one spokesperson submission per group

## Google Workspace CLI (`gws`) Conventions

Use `@googleworkspace/cli` for repeatable setup and operations.

### Install and auth

```bash
npm install -g @googleworkspace/cli
gws auth setup
gws auth login -s forms,sheets,gmail,drive
```

### Typical commands

```bash
gws forms forms create --json '{"info":{"title":"TI AI Agents - Submissions"}}'
gws sheets spreadsheets create --json '{"properties":{"title":"TI AI Agents - Responses"}}'
gws gmail users drafts create --params '{"userId":"me"}' --json '{"message":{"raw":"..."}}'
```

Use `scripts/google/bootstrap_workshop.sh` as the starting automation script.

## Live Update Pattern for Teaching Material

There are two live update modes:

1. Real-time mode: website live-results page auto-refreshes.
2. Snapshot mode: run `scripts/google/sheet_to_markdown.py` to generate a markdown partial for slides.

Snapshot mode is useful during breaks when you want a curated static view in the next slide section.

## Repository Conventions for Future Agents

- Keep this repo public-safe (no secrets, no private data).
- Do not upload restricted copyrighted PDFs.
- Keep slide text minimal; add detail to notes.
- Keep participant experience web-first and mobile-friendly.
- Prefer reliability over feature complexity during live teaching.

## Key Paths

- `slides/day1_foundations.qmd`
- `slides/day2_advanced.qmd`
- `website/docs/overview.md`
- `website/docs/live-results.mdx`
- `resources/links.md`
- `resources/registry.csv`
