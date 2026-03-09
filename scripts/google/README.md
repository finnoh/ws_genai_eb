# Google Workflow Scripts

Automation helpers for workshop operations.

## Files

- `bootstrap_workshop.sh`: creates baseline Google Form and Sheet via `gws`.
- `sheet_to_markdown.py`: converts published sheet CSV to slide-ready markdown snippet.

## Prerequisites

```bash
npm install -g @googleworkspace/cli
gws auth setup
gws auth login -s forms,sheets,gmail,drive
```

## Typical usage

```bash
./scripts/google/bootstrap_workshop.sh
python3 scripts/google/sheet_to_markdown.py \
  --csv-url "https://docs.google.com/spreadsheets/d/e/.../pub?gid=0&single=true&output=csv" \
  --output "slides/partials/live_snapshot.md"
```
