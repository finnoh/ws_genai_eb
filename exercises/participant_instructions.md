# Participant Exercise Instructions

## How to work each block (always)

- Produce one micro artifact inspectable in 60 seconds.
- Make one design decision explicit (decomposition/tool/verification).
- Include one likely failure mode and one mitigation.
- Include one verification method.

## Submission fields (every response)

- `exercise_id`
- `group_id`
- `answer_type`
- `answer`
- `artifact_url` (if used)
- `confidence` (1-5)
- `uncertainty_note`
- `verification_method`

## Environment defaults

- Day 1 default: Jupyter + LangChain + Jan support.
- Day 2 default: VS Code + OpenCode; ChatGPT allowed for ideation/evaluation tasks.
- Notebook fallback: use `.py` with same logic and submit command/output trace.

## Day 1

### E1 - Jan setup and first programmable task

- Set up Jan and run one tiny task end-to-end.
- Submit execution evidence + one customization choice.

### E2 - LangChain prompt anatomy in code

- Run a first LangChain prompt and capture output.
- Solve country extraction from noisy text.
- Return a structured Python list.
- Add a short model and docs orientation note.

### E3 - Context pipeline with retrieval

- Build retrieve -> compress -> inject flow.
- Compare baseline vs retrieval-enhanced answer.

### E4 - Tool-calling mini-agent

- Implement at least two tools.
- Run one multi-step query and submit tool trace.

### E5 - Build and connect a tiny MCP tool

- Implement one tiny tool service.
- Wire to agent workflow and submit one successful call trace.

### E6 - Memory behavior: session + retrieval

- Define memory policy.
- Show short-term and long-term memory behavior in a short trace.

## Day 2

### E7 - Ideation project + idea napkin

- Build one idea napkin from project-based ideation.
- Include one domain scoring rationale and one risk note.

### E8 - AI data-collection design memo

- Choose A/B/C mode.
- Submit one-page protocol with validation plan.

### E9 - Evidence paragraph + claim ledger

- Produce one paragraph grounded in sources.
- Submit claim-evidence ledger with any unresolved gap.

### E10 - Reproducible analysis loop in VS Code

- Execute prompt -> code -> run -> test -> fix.
- Submit verification evidence and one keep/reject decision.

### E11 - Issue -> agent -> PR workflow drill

- Draft one scoped issue.
- Create one agent handoff prompt.
- Submit PR review verdict using checklist.

### E12 - Writing + syndication sprint

- Draft a short brief from notes or voice transcript.
- Add a 3-channel syndication plan and disclosure statement.
