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
- Use group spokesperson reporting in debrief
- Park advanced questions for break or end-of-day

### Teaching Operating System (applies to all blocks)

Use this loop every hour:

- Observe: frame one concrete decision
- Build: produce one micro artifact
- Fail: surface one likely failure mode
- Verify: document one validation method
- Reflect: capture one reusable pattern

Debrief prompts should be adversarial, not presentational:

- What assumption failed?
- What evidence would falsify this?
- Where could this hallucinate?
- What should not be delegated?
- What is the cheapest simplification?

Canonical evaluation frame (all exercises):

- usefulness (does it help the task?)
- correctness (is it factually/procedurally right?)
- reproducibility (can another group rerun it?)
- risk awareness (did they identify and mitigate key risks?)

### Canonical Block Template (for slide + website pages)

Each block page should use this exact structure:

- Objective
- Inputs
- Deliverable (single micro artifact)
- Timebox (20/30/10)
- Submission link (prefilled `exercise_id`)
- Evaluation rubric (4-dimension base + block-specific criteria)
- Common failure modes
- Extension task (optional)

### Day 1 - Building AI Agents (basic to intermediate)

#### Day 1 Block 1: Intro

- Lecture (20): course framing, outcomes, workflow norms, reliability mindset
- Hands-on (30): tool access check, group role assignment, baseline prompt test
- Debrief (10): blockers board and readiness check

#### Day 1 Block 2: LLMs and AI Agents

- Lecture (20): next-token prediction, alignment overview, what counts as an agent, LM formula and fine-tuning
- Hands-on (30): prompt anatomy lab, classify context/tool/memory needs (E1)
- Debrief (10): compare two prompt rewrites

#### Day 1 Block 3: Context

- Lecture (20): instruction hierarchy, role/persona prompting, constraint writing, solution space narrowing
- Hands-on (30): rewrite weak prompts and run A/B variants
- Debrief (10): failure patterns and fixes

#### Day 1 Block 4: Tools 1

- Lecture (20): tool-calling lifecycle, MCP basics, IDE agent vs coding agent, plan mode
- Hands-on (30): coding sprint (one bugfix/refactor + verification trace) (E3)
- Debrief (10): what failed and why

#### Day 1 Block 5: Tools 2

- Lecture (20): advanced tool use, parallel agents, backlog scheduling, AGENTS.md customization
- Hands-on (30): multi-agent coding exercise, verification traces
- Debrief (10): lessons learned

#### Day 1 Block 6: Memory

- Lecture (20): working vs persistent memory, stale memory risks, memory safety, disclosure
- Hands-on (30): memory-aware writing and verification (E4 adapted)
- Debrief (10): citation integrity checklist

### Day 2 - AI agents in Research (intermediate to advanced)

#### Day 2 Block 1: Ideation and idea validation

- Lecture (20): ideation funnel, fast kill criteria, falsifiability gates
- Hands-on (30): idea audit and validation micro artifact
- Debrief (10): which assumptions failed first?

#### Day 2 Block 2: Data collection (design, synthetic respondents, ...)

- Lecture (20): instrument design, synthetic pretesting boundaries, contamination risks, attention checks
- Hands-on (30): synthetic stimulus design and stress test (E6)
- Debrief (10): discuss replacement fallacies

#### Day 2 Block 3: Literature review and research

- Lecture (20): retrieval workflow, claim-evidence ledger, source triage, traceable synthesis
- Hands-on (30): evidence paragraph with provenance (non-E micro artifact)
- Debrief (10): verification and disclosure

#### Day 2 Block 4: Data analysis & Coding 1

- Lecture (20): analysis plan scaffolding, reproducible code prompts, test-first checks
- Hands-on (30): orchestrated workflow design with contracts (E5)
- Debrief (10): architecture tradeoff review

#### Day 2 Block 5: Data analysis & Coding 2

- Lecture (20): reliability controls (timeouts, retries, fallbacks, logging), parallel execution economics
- Hands-on (30): reliability-enhanced analysis agent
- Debrief (10): red-team one design assumption

#### Day 2 Block 6: Writing & Valorization

- Lecture (20): output evaluation, LLM-as-judge limits, adoption memo, governance, companion websites
- Hands-on (30): score two outputs + draft adoption memo (E7) + personal verification protocol (E8)
- Debrief (10): compare scoring disagreement

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

- Keep exercise submissions as E1-E8 for Google Form compatibility.
- Use the remaining blocks for micro deliverables (whiteboard, prompt, rubric, architecture note).

### Exercise registry (keep updated):

| exercise_id | block | short title | prefill link | status |
|---|---|---|---|---|
| E1 | Block 2 | Prompt anatomy lab | TODO | draft |
| E2 | Block 3 | Prompt rewrite challenge | TODO | draft |
| E3 | Block 4 | IDE coding sprint | TODO | draft |
| E4 | Block 6 (Day 1) | Memory-aware writing | TODO | draft |
| E5 | Block 4 (Day 2) | Design agent workflow | TODO | draft |
| E6 | Block 2 (Day 2) | Build mini pipeline | TODO | draft |
| E7 | Block 6 (Day 2) | Evaluate two outputs | TODO | draft |
| E8 | Block 6 (Day 2) | Resilience protocol plan | TODO | draft |

Note: E4 appears in Day 1 Block 6 (Memory) but focuses on memory-aware writing with citation integrity.  
E5 is in Day 2 Block 4 (Data analysis & Coding 1).  
E6 is in Day 2 Block 2 (Data collection).  

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
| E1 | Block 2 | Prompt anatomy lab | TODO | draft |
| E2 | Block 3 | Prompt rewrite challenge | TODO | draft |
| E3 | Block 4 | IDE coding sprint | TODO | draft |
| E4 | Block 6 (Day 1) | Memory-aware writing | TODO | draft |
| E5 | Block 4 (Day 2) | Design agent workflow | TODO | draft |
| E6 | Block 2 (Day 2) | Build mini pipeline | TODO | draft |
| E7 | Block 6 (Day 2) | Evaluate two outputs | TODO | draft |
| E8 | Block 6 (Day 2) | Resilience protocol plan | TODO | draft |

Canonical exercise draft source:

- `exercises/drafts.md` is the source-of-truth markdown for E1-E8 briefs.

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
