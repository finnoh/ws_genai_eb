# Exercise Drafts (E1-E8)

First-draft briefs for all workshop exercises. Each draft follows the same block template and submission schema.

Scale reference for all rubric criteria: 0 (missing), 1 (weak), 2 (acceptable), 3 (strong).

## E1 - Prompt anatomy lab (Day 1, Block 2: LLMs and AI Agents)

### Objective

- Diagnose why a weak prompt fails.
- Produce one stronger prompt with explicit constraints.

### Inputs

- One weak prompt from your group domain.
- Prompt anatomy checklist (role, task, constraints, output format).
- One target use case from economics or business research.

### Deliverable (single micro artifact)

- One short before/after prompt pair with 3-5 line rationale.

### Timebox

- 20 minutes lecture input.
- 30 minutes hands-on work.
- 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E1`

### Evaluation rubric

- Usefulness.
- Correctness.
- Reproducibility.
- Risk awareness.
- Prompt anatomy diagnosis quality.
- Clarity of improved constraints.

### Common failure modes

- Vague task intent.
- Missing output format.
- Hidden assumptions not stated.

### Extension task (optional)

- Rewrite the same prompt for a second audience (policy vs academic).

## E2 - Prompt rewrite challenge (Day 1, Block 3: Context)

### Objective

- Improve a prompt through A/B iteration and explicit failure analysis.

### Inputs

- Baseline weak prompt.
- E2 rubric in `exercises/rubrics.md`.
- Comparison protocol (keep model/task fixed).

### Deliverable (single micro artifact)

- A/B comparison note with final prompt and one identified failure pattern.

### Timebox

- 20 minutes lecture input.
- 30 minutes hands-on work.
- 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E2`

### Evaluation rubric

- Usefulness.
- Correctness.
- Reproducibility.
- Risk awareness.
- Constraint quality and specificity.
- A/B fairness and failure-analysis depth.

### Common failure modes

- Changed too many variables between A and B.
- Added constraints that conflict.
- No concrete failure explanation.

### Extension task (optional)

- Add a self-check step and rerun a C variant.

## E3 - IDE coding sprint (Day 1, Block 4: Tools 1)

### Objective

- Complete one small coding task with verifiable evidence.

### Inputs

- One bugfix or refactor target.
- IDE agent (Cursor/Copilot/OpenCode).
- One test or validation command.

### Deliverable (single micro artifact)

- Patch summary plus verification trace (test output or reproducible check).

### Timebox

- 20 minutes lecture input.
- 30 minutes hands-on work.
- 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E3`

### Evaluation rubric

- Usefulness.
- Correctness.
- Reproducibility.
- Risk awareness.
- Task decomposition quality.
- Verification rigor.

### Common failure modes

- No reproduction of original issue.
- Trusting agent output without running checks.
- No rollback/fallback noted.

### Extension task (optional)

- Add one guardrail test that would catch regression.

## E4 - Memory-aware writing (Day 1, Block 6: Memory)

### Objective

- Produce one research paragraph with claim-evidence traceability.
- Apply memory safety and disclosure principles.

### Inputs

- One narrow research claim.
- 1-3 sources (preferably from `resources/registry.csv`).
- Citation integrity checklist.

### Deliverable (single micro artifact)

- One paragraph with citations and a mini verification checklist.

### Timebox

- 20 minutes lecture input.
- 30 minutes hands-on work.
- 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E4`

### Evaluation rubric

- Usefulness.
- Correctness.
- Reproducibility.
- Risk awareness.
- Citation support quality.
- Explicit uncertainty and disclosure quality.

### Common failure modes

- Unsupported factual claim.
- Citation does not match claim.
- Missing uncertainty statement.

### Extension task (optional)

- Split paragraph into claim/evidence/limitation sentence tags.

## E5 - Design an agent workflow (Day 2, Block 4: Data Analysis & Coding 1)

### Objective

- Specify a reliability-aware workflow for one research task.

### Inputs

- Candidate task (literature scan, coding check, protocol drafting, etc.).
- Single-agent vs multi-agent decision frame.
- Failure taxonomy (timeout, bad tool output, stale context).

### Deliverable (single micro artifact)

- Architecture sketch with tool/memory contracts and fallback path.

### Timebox

- 20 minutes lecture input.
- 30 minutes hands-on work.
- 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E5`

### Evaluation rubric

- Usefulness.
- Correctness.
- Reproducibility.
- Risk awareness.
- Contract clarity (tools/memory/human handoff).
- Fallback and retry design quality.

### Common failure modes

- No explicit human escalation point.
- Ambiguous tool ownership.
- Retry without stop condition.

### Extension task (optional)

- Add one red-team scenario and mitigation.

## E6 - Build a mini pipeline (Day 2, Block 2: Data Collection)

### Objective

- Prototype a small end-to-end research pipeline with clear limits.

### Inputs

- Pipeline canvas (ideation -> generation -> filtering -> review).
- Synthetic stimulus prompt template.
- Limitation logging checklist.

### Deliverable (single micro artifact)

- Protocol mini-note with sample stimuli and one explicit limitation.

### Timebox

- 20 minutes lecture input.
- 30 minutes hands-on work.
- 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E6`

### Evaluation rubric

- Usefulness.
- Correctness.
- Reproducibility.
- Risk awareness.
- Pipeline completeness.
- Validation feasibility.

### Common failure modes

- Overly broad pipeline scope.
- Generated stimuli not fit for purpose.
- No validation checkpoint.

### Extension task (optional)

- Define a minimum human-sample validation plan.

## E7 - Evaluate two outputs (Day 2, Block 6: Writing & Valorization)

### Objective

- Apply a rubric consistently and make one adoption recommendation.

### Inputs

- Two outputs for the same task.
- Scoring rubric and memo template.
- One organizational context assumption.

### Deliverable (single micro artifact)

- Scored comparison table plus short adoption memo.

### Timebox

- 20 minutes lecture input.
- 30 minutes hands-on work.
- 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E7`

### Evaluation rubric

- Usefulness.
- Correctness.
- Reproducibility.
- Risk awareness.
- Rubric consistency across outputs.
- Actionability of recommendation.

### Common failure modes

- Score inflation without evidence.
- No disagreement note between raters.
- Adoption memo lacks governance boundary.

### Extension task (optional)

- Re-score with blinded output labels and compare drift.

## E8 - Resilience protocol plan (Day 2, Block 6: Writing & Valorization)

### Objective

- Define a personal operating protocol for safe, sustainable AI use.

### Inputs

- Cost/risk calculator assumptions.
- Personal task profile (coding, writing, research design).
- Non-delegation boundary checklist.

### Deliverable (single micro artifact)

- One-page resilience protocol with trigger conditions.

### Timebox

- 20 minutes lecture input.
- 30 minutes hands-on work.
- 10 minutes debrief.

### Submission link

- `/docs/live-exercises?exercise=E8`

### Evaluation rubric

- Usefulness.
- Correctness.
- Reproducibility.
- Risk awareness.
- Specificity of verification protocol.
- Realism of cost/risk assumptions.

### Common failure modes

- Generic rules with no task context.
- No trigger for manual verification.
- No explicit non-delegation boundary.

### Extension task (optional)

- Add a weekly self-audit checklist with 3 metrics.
