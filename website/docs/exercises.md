---
sidebar_position: 3
---

# Exercises

The workshop has 8 exercises (`E1` to `E8`), one per block.

Each exercise now has a canonical block page under [Exercise Blocks (E1-E8)](/docs/blocks/e1-prompt-anatomy-lab).

Every exercise follows the same teaching OS:

- one micro artifact
- one explicit design decision
- one failure/uncertainty statement
- one verification method

## Participant material

- Instructions: `exercises/participant_instructions.md`
- Rubrics: `exercises/rubrics.md`
- Patterns: `/docs/patterns`
- Failure library: `/docs/failure-library`

## Canonical block pages

- [E1 Prompt anatomy lab](/docs/blocks/e1-prompt-anatomy-lab)
- [E2 Prompt rewrite challenge](/docs/blocks/e2-prompt-rewrite-challenge)
- [E3 IDE coding sprint](/docs/blocks/e3-ide-coding-sprint)
- [E4 Draft + verify paragraph](/docs/blocks/e4-draft-verify-paragraph)
- [E5 Design an agent workflow](/docs/blocks/e5-design-agent-workflow)
- [E6 Build a mini pipeline](/docs/blocks/e6-build-mini-pipeline)
- [E7 Evaluate two outputs](/docs/blocks/e7-evaluate-two-outputs)
- [E8 Resilience protocol plan](/docs/blocks/e8-resilience-protocol-plan)

## Synced Google assets

- Exercise drafts (Google Doc): https://docs.google.com/document/d/1PfuDG0jYjvYtXJFAxofZ1eh9gN6STWeckrrMFDFDmRM/edit
- Exercise drafts table (Google Sheet): https://docs.google.com/spreadsheets/d/1qqicPGhyus2fT0RVaOQgHbPStTSJMKnFlCbTJgM2W1k/edit

These links are synced from `exercises/drafts.md` with:

```bash
./scripts/google/sync_exercises.sh --source exercises/drafts.md --targets docs,sheets
```

## AI grading

Exercise 2 (`E2`) can be graded with AI using:

- Prompt: `exercises/ai-grading/e2_prompt.md`
- JSON schema: `exercises/ai-grading/e2_schema.json`

Use strict JSON output and keep human override available.
