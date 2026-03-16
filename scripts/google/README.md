# Google Workflow Scripts

Automation helpers for workshop operations.

## Files

- `bootstrap_workshop.sh`: wrapper for `bootstrap_workshop.py`.
- `bootstrap_workshop.py`: creates a workshop Form + fields + response Sheet and prints env values/prefill links.
- `forms_to_json.py`: pulls responses from Google Forms API via `gws` into a live-results JSON payload.
- `sheets_to_json.py`: reads a spreadsheet range through `gws` and writes normalized JSON rows.
- `sync_live_results.sh`: one command to refresh `website/static/data/live-results.json` from Forms.
- `sync_exercises.py`: syncs `exercises/drafts.md` to Google Docs + Google Sheets and refreshes `exercise_id` options in the workshop Form.
- `sync_exercises.sh`: wrapper for `sync_exercises.py`.
- `sheet_to_markdown.py`: converts published sheet CSV to slide-ready markdown snippet.
- `grade_e2.py`: grades Exercise 2 submissions with AI and validates output shape.

## Prerequisites

```bash
npm install -g @googleworkspace/cli
gws auth setup
gws auth login -s forms,sheets,docs,drive
```

## Pre-class setup

```bash
./scripts/google/bootstrap_workshop.sh --write-env-file website/.env.local

# copy IDs and links printed by the script
# then in Google Forms UI: Responses -> Link to existing spreadsheet
```

This script configures the canonical workshop fields:

- `exercise_id`
- `student_name`
- `answer`

And writes these form-field environment values when `--write-env-file` is used:

- `GOOGLE_FORM_EXERCISE_FIELD`
- `GOOGLE_FORM_STUDENT_NAME_FIELD`
- `GOOGLE_FORM_ANSWER_FIELD`

## In-class live operations

```bash
# source form/sheet IDs if you wrote website/.env.local
set -a
source website/.env.local
set +a

# refresh live JSON endpoint payload for the Docusaurus board
./scripts/google/sync_live_results.sh

# optional: private Sheets pull (no publish-to-web needed)
python3 scripts/google/sheets_to_json.py \
  --spreadsheet-id "$WORKSHOP_SPREADSHEET_ID" \
  --range "Form Responses 1!A1:Z" \
  --output "outputs/live_results_sheet.json"

# optional: fetch a submitted Google Doc directly
gws docs documents get --params '{"documentId":"<DOC_ID>"}'
```

## Exercise draft sync (markdown -> Google Workspace)

Recommended pattern:

- Keep exercise content source-of-truth in `exercises/drafts.md`
- Sync to **Docs** for readable facilitator handout
- Sync to **Sheets** for structured filtering/sorting
- Keep **one** submission Form, and only sync `exercise_id` options from markdown

```bash
# uses WORKSHOP_FORM_ID for form target
./scripts/google/sync_exercises.sh \
  --source exercises/drafts.md \
  --targets docs,sheets,form

# docs + sheets only
./scripts/google/sync_exercises.sh --targets docs,sheets
```

The sync state (created resource IDs) is stored at `outputs/google/exercise_sync_state.json`.

Current sync behavior:

- Google Docs: one tab per exercise (`E1` to `E8`) with heading styles applied.
- Google Sheets: one sheet tab per exercise plus an `Index` tab.
- Exercise tabs include prefilled subtask rows so groups can enter submissions per subtask.

## Snapshot + grading workflow

```bash
# snapshot markdown table for slides (published CSV mode)
python3 scripts/google/sheet_to_markdown.py \
  --csv-url "https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv" \
  --output "slides/partials/live_snapshot.md"

# dry-run packet extraction for E2
python3 scripts/google/grade_e2.py \
  --csv-url "https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv" \
  --dry-run \
  --output-jsonl "outputs/e2_packets.jsonl"

# AI grading for E2 (requires OPENAI_API_KEY)
OPENAI_API_KEY="..." python3 scripts/google/grade_e2.py \
  --csv-url "https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv" \
  --model "gpt-4o-mini" \
  --output-jsonl "outputs/e2_grades.jsonl" \
  --output-csv "outputs/e2_grades.csv"
```
