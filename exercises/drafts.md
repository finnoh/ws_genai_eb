# Exercise Drafts (E1-E12)

One exercise per teaching block (12 total). Each exercise is scoped to be solvable in ~30 minutes with Jan support and room for discussion/hiccups.

Execution defaults:

- Day 1: LangChain-first, Jupyter preferred (with `.py` fallback)
- Day 2: VS Code + OpenCode by default; ChatGPT allowed where task fit is stronger (ideation/evaluation)

Scale reference for all rubric criteria: 0 (missing), 1 (weak), 2 (acceptable), 3 (strong).

## E1 - Jan setup and first programmable task (Day 1, Block 1)

### Objective

- Get operational with Jan and the workshop toolchain.
- Complete one tiny programming task via Jan with a verifiable output.

### Inputs

- Jan installed and running.
- Starter task: parse a tiny CSV and compute one summary stat.

### Deliverable (single micro artifact)

- One screenshot/log snippet showing Jan ran a task end-to-end, plus one sentence on what to customize in Jan.

### Timebox

- 20 minutes lecture, 30 minutes hands-on, 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E1`

### Extension task (optional)

- Add one custom instruction to Jan and rerun the same task.

## E2 - LangChain prompt anatomy in code (Day 1, Block 2)

### Objective

- Move prompt anatomy into runnable LangChain code.

### Inputs

- Jupyter notebook or `.py`.
- LangChain prompt template + structured output parser.

### Deliverable (single micro artifact)

- One runnable snippet that returns valid structured output for 2 inputs.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E2`

### Extension task (optional)

- Add one adversarial test input and tighten constraints.

## E3 - Context pipeline with retrieval (Day 1, Block 3)

### Objective

- Build a minimal retrieval context pipeline and compare against no-context baseline.

### Inputs

- 3-5 short local docs.
- LangChain document loading + splitting + retrieval components.

### Deliverable (single micro artifact)

- A/B note with one failure fixed by retrieval context.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E3`

### Extension task (optional)

- Add metadata filtering and report precision difference.

## E4 - Tool-calling mini-agent (Day 1, Block 4)

### Objective

- Build a LangChain agent that calls at least two tools.

### Inputs

- Two simple tools (e.g., `calc_stat`, `lookup_term`).
- One multi-step question requiring both tools.

### Deliverable (single micro artifact)

- One run trace proving tool selection + one output verification check.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E4`

### Extension task (optional)

- Add graceful fallback for a forced tool failure.

## E5 - Build and connect a tiny MCP tool (Day 1, Block 5)

### Objective

- Shift from tool user to tool builder.
- Implement one tiny MCP-like tool service and wire it to agent workflow.

### Inputs

- FastMCP template (or equivalent local tool interface).
- Toy domain function (NPV, breakeven, or ARIMA toy forecast).

### Deliverable (single micro artifact)

- Tool call demo: input -> tool output -> agent explanation, with one sanity check.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E5`

### Extension task (optional)

- Add one argument validation rule and show error handling.

## E6 - Memory behavior: session + retrieval memory (Day 1, Block 6)

### Objective

- Demonstrate short-term memory and retriever-backed long-term memory behavior.

### Inputs

- Tiny memory policy (store/ignore/prune).
- 3-5 turn scripted conversation + one retrievable note.

### Deliverable (single micro artifact)

- Chat trace showing remembered preference + retrieved fact + one memory risk disclosure.

### Timebox

- 20/30/10.

### Submission link

- `/docs/live-exercises?exercise=E6`

### Extension task (optional)

- Add a stale-memory correction step.

## E7 - Ideation project + idea napkin (Day 2, Block 1)

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

- `/docs/live-exercises?exercise=E7`

### Extension task (optional)

- Add a second domain and a tie-break rule.

## E8 - AI data-collection design memo (Day 2, Block 2)

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

- `/docs/live-exercises?exercise=E8`

### Extension task (optional)

- Add pilot criteria (sample size, stop/continue rule).

## E9 - Evidence paragraph + claim ledger (Day 2, Block 3)

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

- `/docs/live-exercises?exercise=E9`

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
