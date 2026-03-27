# AGENTS.md

## Project Overview

This repository is the public source for the Tinbergen Institute workshop:

**AI Agents in Economics and Business Research**

The stack is intentionally lightweight and reliable:

- Quarto revealjs for slides
- Docusaurus for participant companion website
- Google Forms + Google Sheets for exercise submissions and live classroom review
- resources are in resources/ , especially resources/registry.csv is relevant
This file is the operational memory for future agent sessions.

## Course Outline (2 Days)

### Standard Block Format (use for every teaching hour)

Each 60-minute block uses the same rhythm:

- 20 minutes lecture input (one core concept)
- 30 minutes hands-on activity (group work)
- 10 minutes debrief (share-outs + pitfalls)

Timing guardrails:

- Keep one submission target per block (micro artifact)
- Park advanced questions for break or end-of-day

### Canonical Block Template (for slide + website pages)

Each block page should use this exact structure:

- Objective
- Inputs
- Deliverable (single micro artifact)
- Timebox (20/30/10)
- Submission link (prefilled `exercise_id`)
- Evaluation rubric (4-dimension base + block-specific criteria)
- Extension task (optional)

### Day 1 - Building AI Agents (basic to intermediate)

#### Day 1 Block 1: Course Kickoff - Why AI Agents Now

- Lecture (20): workshop framing, motivation from current science use-cases, course flow, and introduction of Jan as the course tutor
- Hands-on (30): install Jan (`ti-student-agent-pack`), explore project structure, run first interactions, and customize behavior

#### Day 1 Block 2: LLMs and AI Agents

- Lecture (20): next-token prediction objective, pre-training vs post-training, and how tool-calls/memory turn LLMs into agent loops
- Hands-on (30): prompt anatomy lab (E1) and classify tasks by context/tool/memory requirements

#### Day 1 Block 3: Context

- Lecture (20): context engineering, plan mode, retrieval-oriented project hygiene (names, folder indexes), boundaries (privacy/copyright), token economics, and structured outputs
- Hands-on (30): rewrite messy context into agent-ready markdown, add file/index conventions, and define a strict output schema

#### Day 1 Block 4: Tools 1

- Lecture (20): tools-as-tokens/action-observation loop, Skills (`SKILL.md` + scripts), MCP basics, Skills vs MCP framing, and tool gallery
- Hands-on (30): install/use selected skills (e.g., arXiv/xlsx), inspect one real skill package, and execute one tool-backed workflow

#### Day 1 Block 5: Tools 2

- Lecture (20): shift from tool user to tool builder, good `SKILL.md` design patterns, script-first skill design, and minimal MCP server architecture
- Hands-on (30): build a simple FastMCP server (e.g., weather/NPV toy tool), wire it into an agent, and test end-to-end calls

#### Day 1 Block 6: Memory

- Lecture (20): short-term context vs long-term memory, memory policy via `AGENTS.md` + `MEMORY.md`, memory compression/hierarchy, and RAG basics (embed/retrieve/inject)
- Hands-on (30): implement a memory policy, log durable facts, and prototype a small RAG retrieval flow

### Day 2 - AI Agents in Research (intermediate to advanced)

#### Day 2 Block 1: Ideation with AI Agents

- Lecture (20): Stremersch-style pipeline (explore -> select -> immerse -> question -> idea napkin), project-based ideation setup, and IP/HARKING caveats
- Hands-on (30): create an ideation project, score candidate domains, and draft one idea napkin for a selected domain

#### Day 2 Block 2: AI in Data Collection

- Lecture (20): DGP-instrument framing (natural/same, natural/new, AI DGP), synthetic respondent workflow, and validity risks with mixed empirical evidence
- Hands-on (30): choose collection mode A/B/C and produce E6 design memo with one explicit verification plan
- Debrief (10): compare mode choices and threat-mitigation strategies

#### Day 2 Block 3: Literature Review

- Lecture (20): paywalls, hallucinated citations, false negatives, keyword vs semantic retrieval, and structured search workflows (web, Elicit, ResearchRabbit, arXiv/Zotero MCP)
- Lecture emphasis: copyright-safe retrieval, paywall logging, and verifiable citation practice
- Hands-on (30): produce one evidence paragraph plus claim-evidence ledger (claim/source/snippet/confidence/gap)
- Debrief (10): verify unresolved gaps and disclosure quality

#### Day 2 Block 4: Rigorous Analysis with AI Agents

- Lecture (20): reproducible AI coding loop (prompt -> code -> run -> test -> fix), unit-test-first habits, metadata-only data access, and tool-access restrictions
- Hands-on (30): run one reproducible analysis/model workflow with explicit tests and verification note
- Debrief (10): discuss assumptions, failures, and keep/reject decisions

#### Day 2 Block 5: Research Workflows

- Lecture (20): issue-to-agent-to-PR workflow, GitHub CLI handoffs, and human review checkpoints for safe collaboration with coding agents
- Hands-on (30): create scoped GitHub issues, dispatch one to an agent, and review PR diff + checks evidence
- Debrief (10): capture team policy for when to trust/override agent outputs

#### Day 2 Block 6: Writing and Syndication

- Lecture (20): writing pipeline (notes -> OCR/text -> markdown -> AI structuring), voice-first drafting, journal disclosure constraints, and multi-channel research syndication
- Hands-on (30): draft a short research brief from bullets/voice notes and create a minimal syndication plan (website/slides/post)
- Debrief (10): compare editing choices, disclosure statements, and publication-ready outputs

### Day 1 resource anchors:

- R004 Agentic engineering patterns
- R003 RAG vs Skill vs MCP vs RLM
- R031/R032/R033/R034 foundational LLM papers
- R005 Giving LLMs a personality
- R030 Virtual persona LLM article
- R012 AI assistance and coding skills
- R015 AI-assisted academic writing
- R024 LLM use, note-taking, and memory
- R041/R042 trust and automation-bias literature
- R048 Six Fallacies in Substituting LLMs for Human Participants
- R051 Alignment Faking in LLMs
- R052 Deception Abilities in LLMs
- R059 Whose Opinions Do Language Models Reflect?
- R060 Diminished Diversity-of-Thought in LLMs

### Day 2 resource anchors:

- R004 Agentic engineering patterns
- R018 Unlocking multi-agent systems in organizations
- R023 Multi-agent communities and value diversity
- R035 ReAct architecture reference
- R011 Anthropic Interviewer
- R009/R010 OpenAI science workflow examples
- R022 Scientific reasoning for synthesis procedures
- R038 Generative Agents for simulation patterns
- R044/R045 research design and econometrics framing
- R047 Can AI Language Models Replace Human Participants?
- R053 Megastudies improve the impact of applied behavioural science
- R054 LOLA: LLM-Assisted Online Learning for Content Experiments
- R057 Consumer Risk Preferences Elicitation from LLMs
- R017 Rankers, judges, and assistants in evaluation
- R055 From Generation to Judgment: LLM-as-a-Judge
- R013 Economic index primitives
- R020 Future of Work report
- R025 Collaboration Gap
- R008 labor-market media case (discussion prompt)
- R040 Generative AI at Work (NBER)
- R043/R046 organizational adoption and substitution evidence

### Note on exercise IDs:

- Use one exercise per teaching block: E1-E12.
- Keep `exercise_id` as free text in Google Form so IDs can scale without schema changes.

### Exercise registry (keep updated):

| exercise_id | block | short title | prefill link | status |
|---|---|---|---|---|
| E1 | Day 1 Block 1 | Jan setup and first programmable task | TODO | draft |
| E2 | Day 1 Block 2 | LangChain prompt anatomy in code | TODO | draft |
| E3 | Day 1 Block 3 | Context pipeline with retrieval | TODO | draft |
| E4 | Day 1 Block 4 | Tool-calling mini-agent | TODO | draft |
| E5 | Day 1 Block 5 | Build and connect a tiny MCP tool | TODO | draft |
| E6 | Day 1 Block 6 | Memory behavior: session + retrieval | TODO | draft |
| E7 | Day 2 Block 1 | Ideation project + idea napkin | TODO | draft |
| E8 | Day 2 Block 2 | AI data-collection design memo | TODO | draft |
| E9 | Day 2 Block 3 | Evidence paragraph + claim ledger | TODO | draft |
| E10 | Day 2 Block 4 | Reproducible analysis loop in VS Code | TODO | draft |
| E11 | Day 2 Block 5 | Issue -> agent -> PR workflow drill | TODO | draft |
| E12 | Day 2 Block 6 | Writing + syndication sprint | TODO | draft |

### Resource gaps to fill next:

- LangChain tutorial/reference specifically for economists
- OpenClaw build log or case study source
- Zotero + AI workflow integration guide
- Self-hosting cost calculator reference (local vs API)

## Teaching Schedule (09:00-17:00, 1h lunch)

### Daily time grid (same for both days)

- 09:00-10:00: Block 1
- 10:00-10:15: break
- 10:15-11:15: Block 2
- 11:15-11:30: break
- 11:30-12:30: Block 3
- 12:30-13:30: lunch
- 13:30-14:30: Block 4
- 14:30-14:45: break
- 14:45-15:45: Block 5
- 15:45-16:00: break
- 16:00-17:00: Block 6

Default within each block:

- 20 minutes lecture
- 30 minutes hands-on
- 10 minutes debrief

### Coverage note

- This grid provides six full teaching blocks per day (6 contact hours/day).
- If you need seven teaching hours on a specific day, add a 08:30-09:00 kickoff clinic or convert one break into a guided lab extension.

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
- `confidence` (1-5 self-rating)
- `uncertainty_note` (one uncertainty or failure point)
- `verification_method` (how output was checked)

### Exercise registry (keep updated)

Keep this table current whenever exercises or links change.

| exercise_id | block | short title | prefill link | status |
|---|---|---|---|---|
| E1 | Day 1 Block 1 | Jan setup and first programmable task | TODO | draft |
| E2 | Day 1 Block 2 | LangChain prompt anatomy in code | TODO | draft |
| E3 | Day 1 Block 3 | Context pipeline with retrieval | TODO | draft |
| E4 | Day 1 Block 4 | Tool-calling mini-agent | TODO | draft |
| E5 | Day 1 Block 5 | Build and connect a tiny MCP tool | TODO | draft |
| E6 | Day 1 Block 6 | Memory behavior: session + retrieval | TODO | draft |
| E7 | Day 2 Block 1 | Ideation project + idea napkin | TODO | draft |
| E8 | Day 2 Block 2 | AI data-collection design memo | TODO | draft |
| E9 | Day 2 Block 3 | Evidence paragraph + claim ledger | TODO | draft |
| E10 | Day 2 Block 4 | Reproducible analysis loop in VS Code | TODO | draft |
| E11 | Day 2 Block 5 | Issue -> agent -> PR workflow drill | TODO | draft |
| E12 | Day 2 Block 6 | Writing + syndication sprint | TODO | draft |

Canonical exercise draft source:

- `exercises/drafts.md` is the source-of-truth markdown for E1-E12 briefs.

### Google Form tracking (keep updated)

- `GOOGLE_FORM_URL`:
- `GOOGLE_FORM_EXERCISE_FIELD`:
- `GOOGLE_FORM_GROUP_FIELD`:
- `WORKSHOP_FORM_ID`:
- `WORKSHOP_SPREADSHEET_ID`:
- Active collection sheet URL:
- Live results CSV URL:
- Live results JSON URL:

Future agents must update these values after form setup or any migration.

### Operational defaults

- no sign-in requirement
- group code based submissions
- keep one global form for all exercises
- exercise link uses prefilled `exercise_id`
- require confidence + uncertainty capture on key exercises (E2, E3, E5, E6, E7)

### During class

- launch exercise from website `Live Exercises`
- let groups submit within a fixed timebox
- open `Live Results` and discuss examples
- use the built-in group picker in slides for presentations

### Fallbacks

- if site fails: share direct form URL + QR
- if live board fails: open the response sheet directly
- if network is unstable: extend timebox and collect one spokesperson submission per group

## Key Paths

- `slides/day1_foundations.qmd`
- `slides/day2_advanced.qmd`
- `website/docs/overview.md`
- `website/docs/live-results.mdx`
- `exercises/participant_instructions.md`
- `exercises/rubrics.md`
- `exercises/drafts.md`
- `resources/links.md`
- `resources/registry.csv`

## Block File Naming Convention

All block slide decks follow the pattern: `slides/blocks/dayX/dayX_blockY.qmd`

Where X = 1 or 2 (day number) and Y = 1-6 (block number within the day).

Example:
- Day 1 Block 1: `slides/blocks/day1/day1_block1.qmd`
- Day 1 Block 2: `slides/blocks/day1/day1_block2.qmd`
- Day 2 Block 4: `slides/blocks/day2/day2_block4.qmd`

This naming ensures modularity and easy lookup from both slides and the companion website.
