---
sidebar_position: 9
---

# Run This Workshop

Use this checklist if you want to run a similar course at your institution.

## Minimum setup

- Fork this repository
- Configure website deployment
- Prepare one Google Form and one Google Sheet
- Test exercise and results pages on mobile

## Google Workspace CLI workflow

- Install CLI and login scopes: `forms,sheets,docs,drive`
- Bootstrap workshop stack: `./scripts/google/bootstrap_workshop.sh --write-env-file website/.env.local`
- Link form responses to the created sheet in Google Forms UI
- Refresh live board payload: `./scripts/google/sync_live_results.sh`
- Optional private sheet pull: `python3 scripts/google/sheets_to_json.py --spreadsheet-id "$WORKSHOP_SPREADSHEET_ID" --range "Form Responses 1!A1:Z"`

## Day-of operations (recommended)

- Before class: run bootstrap, verify prefilled links for `E1` to `E8`
- Sync markdown drafts to Google workspace references: `./scripts/google/sync_exercises.sh --targets docs,sheets,form`
- During each block: run `./scripts/google/sync_live_results.sh` before debrief
- During breaks: run snapshot export to `slides/partials/live_snapshot.md`
- End of day: run `scripts/google/grade_e2.py` for E2 scoring export

## Classroom readiness checklist

- All exercise links open correctly
- Results endpoint refreshes every 15 seconds
- Fallback direct form link is visible
- Slide deck links render from website

## Recommended facilitation defaults

- Use one global form with prefilled `exercise_id`
- Collect one spokesperson submission per group
- Timebox each exercise block clearly
- Discuss examples from Live Results in class

## Public-safe operations

- Keep repository free of secrets and private data
- Use open-access resources only
- Keep participant submissions anonymized when sharing
