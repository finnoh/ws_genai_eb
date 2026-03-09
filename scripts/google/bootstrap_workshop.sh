#!/usr/bin/env bash

set -euo pipefail

if ! command -v gws >/dev/null 2>&1; then
  echo "gws CLI is required. Install with: npm install -g @googleworkspace/cli"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required. Install jq and rerun."
  exit 1
fi

WORKSHOP_TITLE="${WORKSHOP_TITLE:-TI AI Agents - Submissions}"

echo "Creating Google Form..."
FORM_JSON="$(gws forms forms create --json "{\"info\":{\"title\":\"${WORKSHOP_TITLE}\"}}")"
FORM_ID="$(printf '%s' "${FORM_JSON}" | jq -r '.formId')"
RESPONDER_URI="$(printf '%s' "${FORM_JSON}" | jq -r '.responderUri // empty')"

echo "Creating Google Sheet..."
SHEET_JSON="$(gws sheets spreadsheets create --json "{\"properties\":{\"title\":\"${WORKSHOP_TITLE} Responses\"}}")"
SPREADSHEET_ID="$(printf '%s' "${SHEET_JSON}" | jq -r '.spreadsheetId')"

echo
echo "Created resources"
echo "Form ID:        ${FORM_ID}"
echo "Form URL:       ${RESPONDER_URI}"
echo "Spreadsheet ID: ${SPREADSHEET_ID}"
echo
echo "Next manual step in Google Forms UI:"
echo "1) Open the form"
echo "2) Responses -> Link to existing spreadsheet"
echo "3) Select spreadsheet ID: ${SPREADSHEET_ID}"
echo
echo "Store IDs in AGENTS.md and website config after setup."
