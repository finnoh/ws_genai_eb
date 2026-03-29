# Participant Exercise Instructions

## How to work each block (always)

- Produce one micro artifact inspectable in 60 seconds.
- Make one design decision explicit (decomposition/tool/verification).
- Include one likely failure mode and one mitigation.
- Include one verification method.

## Submission fields (every response)

- `exercise_id` (two-digit code, `E01`...`E12`)
- `Name`
- `Answer`

## Environment defaults

- Day 1 default: Jupyter + LangChain + Jan support.
- Day 2 default: VS Code + OpenCode; ChatGPT allowed for ideation/evaluation tasks.
- Notebook fallback: use `.py` with same logic and submit command/output trace.

## Day 1

### E01 - Jan setup and first programmable task

- Set up Jan and run one tiny task end-to-end.
- Run `exercises/01/hello_world.py` and complete one `TODO-STUDENT` tweak.
- Submit execution evidence + one manual check + one TODO note.

### E02 - LangChain prompt anatomy in code

- Run `exercises/02/prompt_lab.py`.
- Complete one `TODO-STUDENT` prompt tweak and compare output.
- Return a structured Python list and verification note.

### E03 - Context pipeline with retrieval

- Run `exercises/03/retrieval_ab.py` and complete its `TODO-STUDENT` steps.
- Compare baseline vs retrieval-enhanced answer with one source-backed fix.

### E04 - Tool-calling mini-agent

- Run `exercises/04/tool_agent.py`.
- Complete one `TODO-STUDENT` change and submit the tool trace.

### E05 - Build and connect a tiny MCP tool

- Run `exercises/05/mcp_tool.py` with MCP time server.
- Submit one successful call trace and one handled error path.

### E06 - Memory behavior: session + retrieval

- Run `exercises/06/memory_demo.py` and try one `TODO-STUDENT` modification.
- Show short-term and long-term memory behavior in a short trace.

## Day 2

### E07 - Ideation project + idea napkin

- Build one idea napkin from project-based ideation.
- Include one domain scoring rationale and one risk note.

### E08 - AI data-collection design memo

- Choose A/B/C mode.
- Submit one-page protocol with validation plan.

### E09 - Evidence paragraph + claim ledger

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
