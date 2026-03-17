#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

FORM_ID="${WORKSHOP_FORM_ID:-}"
if [[ -z "${FORM_ID}" ]]; then
  echo "Set WORKSHOP_FORM_ID before running this script."
  exit 1
fi

JSON_OUTPUT="${LIVE_RESULTS_JSON_OUTPUT:-${REPO_ROOT}/website/static/data/live-results.json}"
LIMIT="${LIVE_RESULTS_LIMIT:-200}"

python3 "${SCRIPT_DIR}/forms_to_json.py" \
  --form-id "${FORM_ID}" \
  --output "${JSON_OUTPUT}" \
  --limit "${LIMIT}"

if [[ -n "${LIVE_RESULTS_SHEET_CSV_URL:-}" ]]; then
  MARKDOWN_OUTPUT="${LIVE_RESULTS_MD_OUTPUT:-${REPO_ROOT}/slides/partials/live_snapshot.md}"
  python3 "${SCRIPT_DIR}/sheet_to_markdown.py" \
    --csv-url "${LIVE_RESULTS_SHEET_CSV_URL}" \
    --output "${MARKDOWN_OUTPUT}"
fi

echo "Updated live results artifacts."
