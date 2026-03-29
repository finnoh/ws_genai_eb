# Exercise Drafts (E01-E12)

One exercise per teaching block (12 total). Each exercise is scoped to be solvable in ~30 minutes with Jan support and room for discussion/hiccups.

Execution defaults:

- Day 1: LangChain-first, Jupyter preferred (with `.py` fallback)
- Day 2: VS Code + OpenCode by default; ChatGPT allowed where task fit is stronger (ideation/evaluation)

Scale reference for all rubric criteria: 0 (missing), 1 (weak), 2 (acceptable), 3 (strong).

## E01 - Jan setup and first programmable task (Day 1, Block 1)

### Objective

- Get operational with Jan and the workshop toolchain.
- Run `exercises/01/hello_world.py` and capture one successful output.
- Complete the `TODO-STUDENT` change in `exercises/01/hello_world.py` and rerun.

### Inputs

- Jan installed and running.
- `exercises/01/data/tiny.csv` and `exercises/01/hello_world.py`.

### Deliverable (single micro artifact)

- One startup screenshot/log, one script run output, one manual check from `tiny.csv`, and one sentence describing your TODO change.

### Timebox

- 20 minutes lecture, 30 minutes hands-on, 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E01`

### Extension task (optional)

- Add one custom instruction to Jan and rerun the same task.

## E02 - LangChain prompt anatomy in code (Day 1, Block 2)

### Objective

- Run a first LangChain prompt and capture its output in Python.
- Solve one concrete country-extraction task from noisy text.
- Complete one `TODO-STUDENT` prompt tweak in `exercises/02/prompt_lab.py` and compare output.

### Inputs

- `exercises/02/prompt_lab.py`.
- Noisy country paragraph from scaffold.
- Orientation links:
  - https://openrouter.ai/rankings
  - https://opencode.ai/docs/
  - https://docs.langchain.com/oss/python/deepagents/harness

### Deliverable (single micro artifact)

- One runnable output returning cleaned country names as a Python list plus one verification note and one TODO experiment note.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E02`

### Extension task (optional)

- Run the same extraction task with one alternative OpenRouter model and briefly compare quality/speed/cost expectation.

## E03 - Context pipeline with retrieval (Day 1, Block 3)

### Objective

- Build a minimal retrieval context pipeline and compare against no-context baseline.
- Complete all `TODO-STUDENT` prompts in `exercises/03/retrieval_ab.py`.

### Inputs

- `exercises/03/retrieval_ab.py`.
- Local docs in `exercises/03/local_docs/`.

### Deliverable (single micro artifact)

- A/B note with one failure fixed by retrieval context and one source-backed comparison note.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E03`

### Extension task (optional)

- Add metadata filtering and report precision difference.

## E04 - Tool-calling mini-agent (Day 1, Block 4)

### Objective

- Build a LangChain agent that calls at least two tools.
- Complete one `TODO-STUDENT` change in `exercises/04/tool_agent.py` and rerun.

### Inputs

- `exercises/04/tool_agent.py` with two wired tools.
- One multi-step question requiring both tools.

### Deliverable (single micro artifact)

- One run trace proving both tool calls + one plausibility/verification check + one TODO change note.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E04`

### Extension task (optional)

- Add graceful fallback for a forced tool failure.

## E05 - Build and connect a tiny MCP tool (Day 1, Block 5)

### Objective

- Connect a LangChain agent to `mcp-server-time` via MCP.
- Complete `TODO-STUDENT` experiments in `exercises/05/mcp_tool.py`.

### Inputs

- `exercises/05/mcp_tool.py`.
- MCP server: `mcp-server-time` via `uvx`.

### Deliverable (single micro artifact)

- MCP tool-call demo: one success path + one error path + one sanity check.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E05`

### Extension task (optional)

- Connect to one additional MCP server and run one extra call.

## E06 - Memory behavior: session + retrieval memory (Day 1, Block 6)

### Objective

- Demonstrate short-term memory and retriever-backed long-term memory behavior.
- Complete one `TODO-STUDENT` modification in `exercises/06/memory_demo.py`.

### Inputs

- `exercises/06/memory_demo.py`.
- Long-term store file (`exercises/06/long_term_store.json`) and session resets.

### Deliverable (single micro artifact)

- Chat trace showing remembered preference + retrieved fact across reset + one memory risk disclosure.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E06`

### Extension task (optional)

- Add a stale-memory correction step.

## E07 - Ideation project + idea napkin (Day 2, Block 1)

### Objective

- Run the explore -> select -> immerse -> question -> napkin workflow.

### Inputs

- ChatGPT/Claude project or VS Code notes.
- One candidate domain with basic constraints.

### Deliverable (single micro artifact)

- One idea napkin with domain scorecard and one IP/HARKING risk note.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E07`

### Extension task (optional)

- Add a second domain and a tie-break rule.

## E08 - AI data-collection design memo (Day 2, Block 2)

### Objective

- Choose mode A/B/C and design a credible collection protocol.

### Inputs

- Research question.
- DGP/instrument choice and validation lens.

### Deliverable (single micro artifact)

- One-page memo with mode choice, threat model, and one explicit verification plan.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E08`

### Extension task (optional)

- Add pilot criteria (sample size, stop/continue rule).

## E09 - Evidence paragraph + claim ledger (Day 2, Block 3)

### Objective

- Produce one evidence-backed paragraph with traceable claims.

### Inputs

- Search stack of choice (web/Elicit/ResearchRabbit/arXiv/Zotero).
- Paywall logging rule.

### Deliverable (single micro artifact)

- One paragraph + claim-evidence ledger (claim/source/snippet/confidence/gap).

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E09`

### Extension task (optional)

- Add one unresolved gap and exact follow-up search query.

## E10 - Reproducible analysis loop in VS Code (Day 2, Block 4)

### Objective

- Run prompt -> code -> run -> test -> fix with one explicit keep/reject decision.

### Inputs

- VS Code + OpenCode/Jan.
- Tiny dataset and one analysis question.

### Deliverable (single micro artifact)

- Minimal code artifact + test/check output + verification note (assumption + limitation).

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E10`

### Extension task (optional)

- Add one edge-case test that initially fails.

## E11 - Issue -> agent -> PR workflow drill (Day 2, Block 5)

### Objective

- Practice safe collaboration pattern with coding agents.

### Inputs

- One scoped GitHub issue.
- Agent handoff prompt.
- PR review checklist.

### Deliverable (single micro artifact)

- Workflow runbook snippet: issue text, handoff prompt, and PR review verdict.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E11`

### Extension task (optional)

- Add one policy rule for when human override is mandatory.

## E12 - Writing + syndication sprint (Day 2, Block 6)

### Objective

- Convert rough notes into a short research brief and multi-channel syndication plan.

### Inputs

- Bullet notes or voice transcript.
- One target audience (academic, policy, practitioner).

### Deliverable (single micro artifact)

- 300-500 word brief + 3-channel syndication plan + disclosure note.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E12`

### Extension task (optional)

- Add one platform-specific rewrite (e.g., website intro vs LinkedIn post).
