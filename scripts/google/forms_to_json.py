#!/usr/bin/env python3

import argparse
import json
import re
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


CANONICAL_FIELDS = [
    "exercise_id",
    "group_id",
    "answer_type",
    "answer",
    "artifact_url",
    "confidence",
    "uncertainty_note",
    "verification_method",
]

FIELD_ALIASES = {
    "exercise_id": {"exercise_id", "exerciseid", "exercise"},
    "group_id": {"group_id", "groupid", "group", "team", "groupcode"},
    "answer_type": {"answer_type", "answertype", "type"},
    "answer": {"answer", "submission", "response", "mainanswer"},
    "artifact_url": {"artifact_url", "artifacturl", "artifact", "link", "url"},
    "confidence": {"confidence", "selfconfidence"},
    "uncertainty_note": {
        "uncertainty_note",
        "uncertaintynote",
        "uncertainty",
        "failurenote",
    },
    "verification_method": {
        "verification_method",
        "verificationmethod",
        "verification",
        "howverified",
    },
}


def normalize_token(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.strip().lower())


def parse_json_payload(raw: str, command: list[str]) -> Any:
    payload = raw.strip()
    if not payload:
        return {}

    try:
        return json.loads(payload)
    except json.JSONDecodeError:
        parsed_lines = []
        for line in payload.splitlines():
            text = line.strip()
            if not text:
                continue
            if text.startswith("{") or text.startswith("["):
                parsed_lines.append(json.loads(text))

        if parsed_lines:
            return parsed_lines

        raise RuntimeError(
            f"Failed to parse JSON from command: {' '.join(command)}\nOutput:\n{payload}"
        )


def run_gws(command_args: list[str]) -> Any:
    command = ["gws", *command_args]
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        error_text = result.stderr.strip() or result.stdout.strip() or "Unknown gws error"
        raise RuntimeError(f"Command failed: {' '.join(command)}\n{error_text}")
    return parse_json_payload(result.stdout, command)


def answer_to_string(answer: dict[str, Any]) -> str:
    text_answers = (answer.get("textAnswers") or {}).get("answers") or []
    text_values = [str(item.get("value", "")).strip() for item in text_answers if item.get("value")]
    if text_values:
        return " | ".join(text_values)

    file_answers = (answer.get("fileUploadAnswers") or {}).get("answers") or []
    file_ids = [str(item.get("fileId", "")).strip() for item in file_answers if item.get("fileId")]
    if file_ids:
        return " | ".join(file_ids)

    return ""


def map_form_fields(form_json: dict[str, Any]) -> dict[str, str]:
    mapping: dict[str, str] = {}
    items = form_json.get("items") or []
    for item in items:
        question_item = item.get("questionItem") or {}
        question = question_item.get("question") or {}
        question_id = str(question.get("questionId", "")).strip()
        if not question_id:
            continue

        candidate_tokens = {
            normalize_token(question_id),
            normalize_token(str(item.get("title", ""))),
            normalize_token(str(item.get("description", ""))),
        }

        for field in CANONICAL_FIELDS:
            if field in mapping:
                continue
            aliases = FIELD_ALIASES[field]
            if any(token in aliases for token in candidate_tokens if token):
                mapping[field] = question_id

    return mapping


def normalize_submission(
    response: dict[str, Any],
    form_id: str,
    field_map: dict[str, str],
) -> dict[str, str]:
    answers = response.get("answers") or {}
    row: dict[str, str] = {
        "form_id": form_id,
        "response_id": str(response.get("responseId", "")).strip(),
        "timestamp": str(response.get("lastSubmittedTime") or response.get("createTime") or "").strip(),
    }

    for field in CANONICAL_FIELDS:
        question_id = field_map.get(field, "")
        answer = answers.get(question_id) if question_id else None
        row[field] = answer_to_string(answer or {})

    row["Timestamp"] = row["timestamp"]
    row["Exercise ID"] = row["exercise_id"]
    row["Group ID"] = row["group_id"]
    row["Answer"] = row["answer"]
    return row


def collect_responses(form_id: str, updated_after: str) -> list[dict[str, Any]]:
    params: dict[str, Any] = {"formId": form_id, "pageSize": 5000}
    if updated_after:
        params["filter"] = f"timestamp >= {updated_after}"

    payload = run_gws(
        [
            "forms",
            "forms",
            "responses",
            "list",
            "--params",
            json.dumps(params),
            "--page-all",
        ]
    )

    pages: list[dict[str, Any]]
    if isinstance(payload, list):
        pages = [item for item in payload if isinstance(item, dict)]
    elif isinstance(payload, dict):
        pages = [payload]
    else:
        pages = []

    responses: list[dict[str, Any]] = []
    for page in pages:
        page_responses = page.get("responses") or []
        for entry in page_responses:
            if isinstance(entry, dict):
                responses.append(entry)
    return responses


def main() -> None:
    parser = argparse.ArgumentParser(description="Fetch Google Form responses via gws and write JSON")
    parser.add_argument("--form-id", required=True, help="Google Form ID")
    parser.add_argument(
        "--output",
        default="website/static/data/live-results.json",
        help="Output JSON path",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=200,
        help="Keep latest N submissions (0 keeps all)",
    )
    parser.add_argument(
        "--updated-after",
        default="",
        help='Optional RFC3339 filter, for example "2026-03-10T09:00:00Z"',
    )
    args = parser.parse_args()

    if shutil.which("gws") is None:
        raise RuntimeError("gws CLI is required. Install with: npm install -g @googleworkspace/cli")

    form = run_gws(
        [
            "forms",
            "forms",
            "get",
            "--params",
            json.dumps({"formId": args.form_id}),
        ]
    )
    if not isinstance(form, dict):
        raise RuntimeError("Unexpected response from forms.get")

    field_map = map_form_fields(form)
    responses = collect_responses(args.form_id, args.updated_after)
    normalized = [normalize_submission(response, args.form_id, field_map) for response in responses]
    normalized.sort(key=lambda row: row.get("timestamp", ""))

    if args.limit > 0:
        normalized = normalized[-args.limit :]

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source": "forms_api",
        "form_id": args.form_id,
        "field_map": field_map,
        "count": len(normalized),
        "submissions": normalized,
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    print(f"Wrote {len(normalized)} submissions to {output_path}")


if __name__ == "__main__":
    main()
