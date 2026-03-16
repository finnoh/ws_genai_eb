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

### Day 1 - Foundations and Safe Practice (basic to intermediate)

#### Day 1 Block 1: Orientation + baseline setup

- Lecture (20): course framing, outcomes, workflow norms
- Hands-on (30): tool access check, group role assignment, baseline prompt test
- Debrief (10): blockers board and readiness check

#### Day 1 Block 2: LLM and agent fundamentals

- Lecture (20): next-token prediction, alignment overview, what counts as an agent
- Hands-on (30): prompt anatomy lab, classify context/tool/memory needs (E1)
- Debrief (10): compare two prompt rewrites

#### Day 1 Block 3: Prompting and context engineering I

- Lecture (20): instruction hierarchy, role/persona prompting, constraint writing
- Hands-on (30): rewrite weak prompts and run A/B variants
- Debrief (10): failure patterns and fixes

#### Day 1 Block 4: Prompting and context engineering II

- Lecture (20): decomposition patterns (few-shot, checklists, self-critique)
- Hands-on (30): prompt rewrite challenge with scored rubric (E2)
- Debrief (10): rubric calibration and exemplars

#### Day 1 Block 5: Tools, MCP, and coding agents in IDEs

- Lecture (20): tool-calling lifecycle, MCP basics, IDE agent workflow
- Hands-on (30): coding sprint (one bugfix/refactor + verification trace) (E3)
- Debrief (10): what failed and why

#### Day 1 Block 6: AI-assisted writing and citation workflow

- Lecture (20): claim-evidence writing pattern, Zotero-connected drafting
- Hands-on (30): draft and source-check one research paragraph
- Debrief (10): citation integrity checklist

#### Day 1 Block 7: Safety, risk, and day-end synthesis

- Lecture (20): privacy, confidentiality, automation bias, disclosure norms
- Hands-on (30): risk checklist + revised paragraph with safeguards (E4)
- Debrief (10): day-1 takeaways and day-2 setup

Day 1 resource anchors:

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

### Day 2 - Advanced Systems and Research Integration (intermediate to advanced)

#### Day 2 Block 1: Recap + reliability mindset

- Lecture (20): recap of day-1 pitfalls and verification protocol
- Hands-on (30): evaluate yesterday artifacts against a reliability checklist
- Debrief (10): confidence vs evidence discussion

#### Day 2 Block 2: Agent systems and orchestration I

- Lecture (20): single-agent vs multi-agent patterns, tool/memory contracts
- Hands-on (30): design a minimal orchestrated workflow
- Debrief (10): architecture tradeoff review

#### Day 2 Block 3: Agent systems and orchestration II

- Lecture (20): reliability-aware orchestration (timeouts, retries, fallbacks)
- Hands-on (30): architecture sketch with explicit failure handling (E5)
- Debrief (10): red-team one design assumption

#### Day 2 Block 4: Research pipeline design with agents I

- Lecture (20): ideation to protocol pipeline, where agents help vs hurt
- Hands-on (30): build a mini pipeline draft with role boundaries
- Debrief (10): methodological validity checks

#### Day 2 Block 5: Research pipeline design with agents II

- Lecture (20): synthetic respondents, pilot stimulus generation, caveats
- Hands-on (30): generate pilot stimuli and protocol note (E6)
- Debrief (10): discuss replacement fallacies

#### Day 2 Block 6: Evaluation and economics of adoption

- Lecture (20): output evaluation, LLM-as-judge limits, organizational economics
- Hands-on (30): score two outputs + draft adoption memo (E7)
- Debrief (10): compare scoring disagreement

#### Day 2 Block 7: Sustainability and cognitive resilience

- Lecture (20): cost, carbon, self-hosting tradeoffs, overreliance risks
- Hands-on (30): cost/risk calculator + personal verification protocol (E8)
- Debrief (10): final commitments and close

Day 2 resource anchors:

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

Note on exercise IDs:

- Keep exercise submissions as E1-E8 for Google Form compatibility.
- Use the remaining blocks for micro deliverables (whiteboard, prompt, rubric, architecture note).

### Resource gaps to fill next

- LangChain tutorial/reference specifically for economists
- OpenClaw build log or case study source
- Zotero + AI workflow integration guide
- Self-hosting cost calculator reference (local vs API)

## Carry-over Plan from 2025 Deck (`../workshop_pe`)

Use this mapping when porting old material into the new 2-day workshop.

### Block-by-block migration map

| New block | Reuse source(s) | Keep / update guidance |
|---|---|---|
| Block 1 (LLM + agent fundamentals) | `chapters/part1_1.qmd`, `chapters/part1_2.qmd` | Keep token-generation intuition, training/alignment flow, and "what is a token" sequence; update numbers/examples and reduce dense equations/text. |
| Block 2 (Prompting + context) | `chapters/part1_3.qmd` | Keep few-shot/CoT/meta-prompting/ToT intuition; update examples to research/econ cases and align with E2 A/B format. |
| Block 3 (Tools/MCP + IDE agents) | `chapters/part1_3.qmd` (RAG/MCP section), coding tasks in `chapters.qmd` | Keep RAG/MCP framing and practical coding sprint idea; update to VS Code/Copilot/Cursor workflows and modern tool-calling examples. |
| Block 4 (Writing + danger zones) | `chapters/part2_1.qmd` (privacy, guidelines, documentation) | Keep privacy/GDPR red flags and disclosure template; update institutional guidance wording and add Zotero-connected writing workflow. |
| Block 5 (Agent systems + orchestration) | `chapters/part1_3.qmd` (RAG/MCP), `synthetic_respondents.qmd` (agent process framing) | Keep architecture intuition; update to explicit tool/memory contracts and LangChain/OpenClaw implementation sketches. |
| Block 6 (Research pipeline + synthetic respondents) | `chapters/part2_1.qmd` (ideation/silicone sampling), `synthetic_respondents.qmd` | Keep synthetic respondent concept and caveats; update evidence base and convert to mini pipeline exercise output. |
| Block 7 (Evaluation + economics adoption) | `chapters.qmd` (research discussion prompts), adoption evidence from resources | Keep discussion format; update with explicit rubric-based evaluation and economics/adoption evidence (R040/R043/R046). |
| Block 8 (Sustainability + cognition) | `chapters/part3_1.qmd`, `chapters/research.qmd` | Keep training-vs-inference and practical footprint calculator task; update all scale numbers and add cognitive resilience protocol output. |

### Reusable slide mechanics from old deck

- Group picker pattern: random presenter draw components in `chapters/part1_2.qmd` and `chapters/part1_3.qmd`.
- Task slide pattern: black-background timed prompts used across `chapters/*.qmd`.
- Live board embed pattern: external doc/sheet iframe usage in `chapters.qmd` and `chapters/part1_2.qmd`.

### Content to de-prioritize or rewrite

- Highly technical probability trees and long derivations: keep concept, shorten aggressively.
- One-off institutional details tied to prior audience: rewrite for Tinbergen context.
- Old static submission links: replace with dynamic form-prefill links (`E1`-`E8`) managed in this repo.

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

## Media Production Checklist (Screenshots + Short Videos)

Purpose: maintain a practical "shopping list" of media assets to produce and drop into slides.

### Asset storage and naming

- Root folder: `slides/assets/media/`
- Day folders: `slides/assets/media/day1/` and `slides/assets/media/day2/`
- Type folders: `screenshots/`, `videos/`, `diagrams/`
- Naming convention: `d{day}_b{block}_{topic}_{v01}.{ext}`
- Example: `d1_b5_cursor_bugfix_trace_v01.mp4`
- Keep short clips between 20-60 seconds, silent by default, and narrate live.

### Day 1 media shopping list

#### Day 1 Block 1: Orientation + baseline setup

- Screenshot: tool stack overview (Quarto + Docusaurus + Forms/Sheets)
- Screenshot: workshop repo layout (slides, website, exercises, resources)
- Screenshot: baseline prompt + expected output side-by-side
- Video (optional): 30s "from prompt to submission" end-to-end flow

#### Day 1 Block 2: LLM and agent fundamentals

- Diagram: token prediction and context window concept visual
- Screenshot: simple agent loop (instruction -> tool -> output -> check)
- Screenshot: good vs weak prompt anatomy example
- Video (optional): 30-45s live prompt iteration showing one improvement

#### Day 1 Block 3: Prompting and context engineering I

- Screenshot: instruction hierarchy template (role, task, constraints, format)
- Screenshot: A/B prompt variants and output difference
- Screenshot: failure pattern board (hallucination, missing constraints, verbosity)
- Video: 30-45s prompt rewrite with quick before/after comparison

#### Day 1 Block 4: Prompting and context engineering II

- Screenshot: decomposition checklist (few-shot, self-check, rubric)
- Screenshot: rubric scoring sheet for E2
- Screenshot: one high-quality E2 submission exemplar (anonymized)
- Video (optional): 30s rubric-based grading walk-through

#### Day 1 Block 5: Tools, MCP, and coding agents in IDEs

- Screenshot: IDE agent panel with task + tool calls visible
- Screenshot: MCP/tool configuration view (safe, no secrets)
- Screenshot: diff view showing one bugfix/refactor and verification note
- Video: 45-60s coding sprint trace (issue -> fix -> test/run)

#### Day 1 Block 6: AI-assisted writing and citation workflow

- Screenshot: Zotero item metadata + abstract panel
- Screenshot: paragraph draft with inline citation placeholders
- Screenshot: claim-evidence check table (claim, source, confidence)
- Video: 30-45s citation insertion and verification pass

#### Day 1 Block 7: Safety, risk, and day-end synthesis

- Screenshot: risk checklist template (privacy, confidentiality, bias, disclosure)
- Screenshot: revised paragraph with safety edits highlighted
- Screenshot: disclosure statement examples (acceptable vs weak)
- Video (optional): 20-30s safety review workflow

### Day 2 media shopping list

#### Day 2 Block 1: Recap + reliability mindset

- Screenshot: reliability checklist used to audit day-1 artifacts
- Screenshot: confidence vs evidence matrix example
- Video (optional): 20-30s artifact triage demo

#### Day 2 Block 2: Agent systems and orchestration I

- Diagram: single-agent vs multi-agent architecture (simple boxes/arrows)
- Screenshot: tool/memory contract template
- Screenshot: minimal workflow specification example
- Video: 30-45s walkthrough of one orchestrated flow

#### Day 2 Block 3: Agent systems and orchestration II

- Diagram: retry/timeout/fallback control flow
- Screenshot: failure injection example and observed behavior
- Screenshot: red-team assumption log template
- Video: 30-45s resilience behavior demo under one failure mode

#### Day 2 Block 4: Research pipeline design with agents I

- Screenshot: ideation-to-protocol pipeline canvas
- Screenshot: role-boundary matrix (human vs agent responsibilities)
- Screenshot: validity risk checklist for pipeline stages
- Video (optional): 30s pipeline sketch explanation

#### Day 2 Block 5: Research pipeline design with agents II

- Screenshot: synthetic respondent prompt template + caveat note
- Screenshot: generated pilot stimuli set (good and flawed examples)
- Screenshot: protocol note with explicit limitations section
- Video: 30-45s pilot generation and quick quality filter

#### Day 2 Block 6: Evaluation and economics of adoption

- Screenshot: scoring rubric applied to two outputs
- Screenshot: LLM-as-judge disagreement example
- Screenshot: adoption memo structure (value, cost, risk, governance)
- Video: 30-45s rapid scoring + memo drafting sequence

#### Day 2 Block 7: Sustainability and cognitive resilience

- Screenshot: cost/risk calculator sheet view
- Screenshot: model choice comparison (API vs local) with assumptions
- Screenshot: personal verification protocol one-pager
- Video (optional): 30s scenario comparison (cheap/fast vs reliable/safe)

### Priority capture order (create these first)

- P1: Day 1 Block 5 IDE coding trace video + screenshots
- P1: Day 1 Block 6 citation workflow screenshots
- P1: Day 2 Block 2/3 orchestration diagrams and resilience demo
- P1: Day 2 Block 6 evaluation rubric screenshot set
- P2: Day 1 Block 2/3 prompt A-B assets
- P2: Day 2 Block 4/5 research pipeline assets
- P3: Optional recap/safety/close short clips

### Production notes

- Use realistic but anonymized examples from class artifacts.
- Blur or crop identifiers, emails, and account names.
- Prefer PNG for screenshots and MP4 (H.264) for short clips.
- Keep each asset directly tied to one block objective and one exercise artifact.

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
| E1 | Block 1 | Prompt anatomy lab | TODO | draft |
| E2 | Block 2 | Prompt rewrite challenge | TODO | draft |
| E3 | Block 3 | IDE coding sprint | TODO | draft |
| E4 | Block 4 | Draft + verify paragraph | TODO | draft |
| E5 | Block 5 | Design agent workflow | TODO | draft |
| E6 | Block 6 | Build mini pipeline | TODO | draft |
| E7 | Block 7 | Evaluate two outputs | TODO | draft |
| E8 | Block 8 | Resilience protocol plan | TODO | draft |

Canonical exercise draft source:

- `exercises/drafts.md` is the source-of-truth markdown for E1-E8 briefs.
- Sync this file to Google Docs/Sheets/Form options with `scripts/google/sync_exercises.sh`.

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

### AI grading (Exercise 2)

Exercise 2 is designed for AI-assisted grading.

- Grading prompt: `exercises/ai-grading/e2_prompt.md`
- JSON schema: `exercises/ai-grading/e2_schema.json`
- Rubric source: `exercises/rubrics.md` (E2 section)
- Grading script: `scripts/google/grade_e2.py`

Use deterministic output format (JSON only), store scores in the response sheet, and keep human override available.

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
gws auth login -s forms,sheets,docs,drive
```

### Typical commands

```bash
gws forms forms create --json '{"info":{"title":"TI AI Agents - Submissions"}}'
gws sheets spreadsheets create --json '{"properties":{"title":"TI AI Agents - Responses"}}'
gws docs documents get --params '{"documentId":"<DOC_ID>"}'
```

Use these scripts as the operational baseline:

- `scripts/google/bootstrap_workshop.sh`: create workshop form + canonical fields + response sheet IDs.
- `scripts/google/sync_live_results.sh`: refresh `website/static/data/live-results.json` from Forms API.
- `scripts/google/sync_exercises.sh`: sync `exercises/drafts.md` to Docs + Sheets and refresh Form `exercise_id` options.
- `scripts/google/forms_to_json.py`: direct Forms -> JSON sync helper.
- `scripts/google/sheets_to_json.py`: direct Sheets -> JSON sync helper.
- `scripts/google/sheet_to_markdown.py`: published CSV -> slide snapshot helper.

## Live Update Pattern for Teaching Material

There are two live update modes:

1. Real-time mode: website live-results page auto-refreshes.
2. Snapshot mode: run `scripts/google/sheet_to_markdown.py` to generate a markdown partial for slides.

Recommended day-of refresh command:

```bash
./scripts/google/sync_live_results.sh
```

This command expects `WORKSHOP_FORM_ID` and updates `website/static/data/live-results.json`.

Snapshot mode is useful during breaks when you want a curated static view in the next slide section.

## Documentation Context Index (API/framework docs)

Use the local docs index pipeline to keep slide content grounded in current framework/API docs.

### Why this is now default

- allows reproducible retrieval of doc context for slide authoring
- avoids ad-hoc browsing during prep and teaching
- keeps source URLs explicit for verification

### Source-of-truth files

- `resources/docs/sources.csv`: API/framework doc URLs to crawl
- `resources/docs/index.json`: generated metadata index
- `resources/docs/text/*.txt`: extracted text snapshots
- `resources/docs/excerpts/*.md`: per-source short excerpt files
- `slides/partials/docs_context.md`: slide-ready context pack
- `resources/registry.csv` column `context_path`: per-resource destination for generated context packs
- `slides/partials/context/**/*.md`: registry-generated context packs grouped by day/topic

### Standard workflow (run in this order)

1. Update `resources/docs/sources.csv` when adding/removing docs.
2. Rebuild local index:

```bash
python3 scripts/resources/doc_context.py index
```

3. Generate a topic-specific context pack for slides:

```bash
python3 scripts/resources/doc_context.py context \
  --query "tool calling and agent orchestration" \
  --output slides/partials/docs_context.md
```

4. Include or copy key lines from `slides/partials/docs_context.md` into relevant block slides.
5. Sync registry-based context packs (uses `context_path`):

```bash
python3 scripts/resources/registry_context.py --active-only sync
```

This command does two things:

- assigns missing `context_path` values in `resources/registry.csv`
- generates/refreshes all `slides/partials/context/**/*.md` files

### Operating rules

- Re-index docs before major slide updates or teaching-day dry runs.
- Keep generated context concise and traceable to source URLs.
- Treat docs context as draft input; final claims still require human validation.
- Keep `resources/registry.csv` and `resources/links.md` aligned with newly indexed docs.
- Before editing block slides, refresh registry context packs and use relevant `slides/partials/context/...` files in speaker notes.

### Current indexed docs (baseline)

- OpenCode docs (`https://opencode.ai/docs/`)
- OpenClaw docs (`https://docs.openclaw.ai/`)
- Claude Platform docs (`https://platform.claude.com/docs/en/home`)
- OpenAI API docs (`https://developers.openai.com/api/docs/`)

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
- `exercises/participant_instructions.md`
- `exercises/rubrics.md`
- `exercises/ai-grading/e2_prompt.md`
- `exercises/ai-grading/e2_schema.json`
- `resources/links.md`
- `resources/registry.csv`
