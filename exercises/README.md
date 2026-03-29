# Exercises

This folder contains exercise operations assets for the workshop.

- `drafts.md`: first-draft briefs for exercises `E01` to `E12`.
- `exercises.yaml`: canonical structured exercise spec for E01-E06 instruction text.
- `participant_instructions.md`: short instructions shown to participants.
- `rubrics.md`: scoring criteria per exercise.
- `ai-grading/e2_prompt.md`: LLM grading instructions for Exercise 2.
- `ai-grading/e2_schema.json`: strict JSON schema for Exercise 2 grading output.

Website + slides exercise surface area:

- Website card text source: `website/src/data/exercises.ts`
- Website block/slide mapping source: `website/src/data/blocks.ts`
- Live exercises page entrypoint: `website/docs/live-exercises.mdx`
- Slide deck files: `slides/blocks/day1/day1_block1.qmd` ... `slides/blocks/day2/day2_block6.qmd`

Sync workflow for canonical E01-E06 text:

```bash
python scripts/sync_exercises_from_yaml.py
```

This updates `website/src/data/exercises_e01_e06_overrides.json`, which is merged into
`website/src/data/exercises.ts` for the website cards.

Use the IDs `E01` to `E12` consistently across slides, website links, Google Form prefills, and grading outputs.
