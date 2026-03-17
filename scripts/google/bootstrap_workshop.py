#!/usr/bin/env python3

import argparse
import json
import re
import shutil
import subprocess
import sys
import time
import urllib.request
from pathlib import Path
from typing import Any
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit


FIELD_SPECS: list[dict[str, Any]] = [
    {
        "key": "exercise_id",
        "title": "exercise_id",
        "description": "Exercise ID (E1-E8)",
        "question": {
            "required": True,
            "choiceQuestion": {
                "type": "DROP_DOWN",
                "options": [{"value": f"E{i}"} for i in range(1, 9)],
            },
        },
    },
    {
        "key": "student_name",
        "title": "student_name",
        "description": "Student name",
        "question": {
            "required": True,
            "textQuestion": {"paragraph": False},
        },
    },
    {
        "key": "answer",
        "title": "answer",
        "description": "Main submission content",
        "question": {
            "required": True,
            "textQuestion": {"paragraph": True},
        },
    },
]


def run_gws_json(args: list[str]) -> dict[str, Any]:
    command = ["gws", *args]
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        error_text = result.stderr.strip() or result.stdout.strip() or "Unknown gws error"
        raise RuntimeError(f"Command failed: {' '.join(command)}\n{error_text}")

    payload = result.stdout.strip()
    if not payload:
        return {}

    try:
        return json.loads(payload)
    except json.JSONDecodeError as exc:
        raise RuntimeError(
            f"Failed to parse JSON output from command: {' '.join(command)}\n{payload}"
        ) from exc


def build_batch_update_payload() -> dict[str, Any]:
    form_description = "Workshop submissions. Submit exercise ID, your name, and your answer."
    requests: list[dict[str, Any]] = [
        {
            "updateFormInfo": {
                "info": {"description": form_description},
                "updateMask": "description",
            }
        }
    ]

    for index, field in enumerate(FIELD_SPECS):
        requests.append(
            {
                "createItem": {
                    "item": {
                        "title": field["title"],
                        "description": field["description"],
                        "questionItem": {"question": field["question"]},
                    },
                    "location": {"index": index},
                }
            }
        )

    return {"requests": requests}


def append_prefill_param(url: str, key: str, value: str) -> str:
    parsed = urlsplit(url)
    query = dict(parse_qsl(parsed.query, keep_blank_values=True))
    query["usp"] = query.get("usp", "pp_url")
    query[f"entry.{key}"] = value
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, urlencode(query), parsed.fragment))


def write_env_file(path: Path, env_values: dict[str, str]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    lines = [f"{key}={value}" for key, value in env_values.items()]
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def ensure_form_fields(batch_response: dict[str, Any]) -> dict[str, str]:
    replies = batch_response.get("replies", [])
    collected: list[str] = []
    for reply in replies:
        create_item = reply.get("createItem") or {}
        question_ids = create_item.get("questionId") or []
        if question_ids:
            collected.append(str(question_ids[0]))

    if len(collected) != len(FIELD_SPECS):
        raise RuntimeError(
            f"Expected {len(FIELD_SPECS)} question IDs from batchUpdate, got {len(collected)}."
        )

    return {field["key"]: collected[index] for index, field in enumerate(FIELD_SPECS)}


def fetch_entry_ids_from_viewform(responder_uri: str, retries: int = 6, sleep_seconds: float = 1.0) -> dict[str, str]:
    expected_keys = [field["key"] for field in FIELD_SPECS]
    expected_titles = {field["key"]: field["title"] for field in FIELD_SPECS}
    entry_ids: dict[str, str] = {}

    for attempt in range(1, retries + 1):
        request = urllib.request.Request(
            responder_uri,
            headers={"User-Agent": "TI-Workshop-Bootstrap/1.0"},
            method="GET",
        )
        with urllib.request.urlopen(request, timeout=30) as response:
            html = response.read().decode("utf-8", errors="ignore")

        # Preferred: parse entry IDs directly from data-params blocks.
        entry_ids = {}
        for key, title in expected_titles.items():
            pattern = rf'&quot;{re.escape(title)}&quot;.*?\[\[(\d+),'
            match = re.search(pattern, html, flags=re.DOTALL)
            if match:
                entry_ids[key] = match.group(1)

        if len(entry_ids) == len(FIELD_SPECS):
            return entry_ids

        # Fallback 1: hidden entry input names in static HTML.
        raw_ids = re.findall(r'name="entry\.(\d+)"', html)
        ordered_unique_ids = list(dict.fromkeys(raw_ids))

        if len(ordered_unique_ids) >= len(FIELD_SPECS):
            entry_ids = {
                key: ordered_unique_ids[idx]
                for idx, key in enumerate(expected_keys)
            }
            return entry_ids

        time.sleep(sleep_seconds)

    missing = [field["key"] for field in FIELD_SPECS if field["key"] not in entry_ids]
    raise RuntimeError(f"Could not resolve form entry IDs from viewform. Missing: {', '.join(missing)}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create workshop Google Form + Sheet using gws")
    parser.add_argument(
        "--title",
        default="TI AI Agents - Submissions",
        help="Workshop form title",
    )
    parser.add_argument(
        "--write-env-file",
        default="",
        help="Optional path to write env vars (for example website/.env.local)",
    )
    parser.add_argument(
        "--unpublished",
        action="store_true",
        help="Create the form as unpublished",
    )
    args = parser.parse_args()

    if shutil.which("gws") is None:
        raise RuntimeError("gws CLI is required. Install with: npm install -g @googleworkspace/cli")

    form_create_args = [
        "forms",
        "forms",
        "create",
        "--json",
        json.dumps({"info": {"title": args.title}}),
    ]
    if args.unpublished:
        form_create_args.extend(["--params", json.dumps({"unpublished": True})])

    print("Creating Google Form...", file=sys.stderr)
    form_json = run_gws_json(form_create_args)
    form_id = str(form_json.get("formId", "")).strip()
    responder_uri = str(form_json.get("responderUri", "")).strip()
    if not form_id:
        raise RuntimeError("Form creation succeeded but no formId was returned.")

    print("Adding workshop fields to the form...", file=sys.stderr)
    batch_payload = build_batch_update_payload()
    batch_response = run_gws_json(
        [
            "forms",
            "forms",
            "batchUpdate",
            "--params",
            json.dumps({"formId": form_id}),
            "--json",
            json.dumps(batch_payload),
        ]
    )
    question_ids = ensure_form_fields(batch_response)
    field_ids = fetch_entry_ids_from_viewform(responder_uri)

    print("Creating Google Sheet...", file=sys.stderr)
    sheet_json = run_gws_json(
        [
            "sheets",
            "spreadsheets",
            "create",
            "--json",
            json.dumps({"properties": {"title": f"{args.title} Responses"}}),
        ]
    )
    spreadsheet_id = str(sheet_json.get("spreadsheetId", "")).strip()
    if not spreadsheet_id:
        raise RuntimeError("Sheet creation succeeded but no spreadsheetId was returned.")

    if not responder_uri:
        responder_uri = f"https://docs.google.com/forms/d/{form_id}/viewform"

    prefill_links = {
        exercise_id: append_prefill_param(responder_uri, field_ids["exercise_id"], exercise_id)
        for exercise_id in [f"E{i}" for i in range(1, 9)]
    }

    env_values = {
        "GOOGLE_FORM_URL": responder_uri,
        "GOOGLE_FORM_EXERCISE_FIELD": field_ids["exercise_id"],
        "GOOGLE_FORM_STUDENT_NAME_FIELD": field_ids["student_name"],
        "GOOGLE_FORM_ANSWER_FIELD": field_ids["answer"],
        "ACTIVE_EXERCISE_ID": "E1",
        "WORKSHOP_FORM_ID": form_id,
        "WORKSHOP_SPREADSHEET_ID": spreadsheet_id,
    }

    if args.write_env_file:
        env_path = Path(args.write_env_file)
        write_env_file(env_path, env_values)
        print(f"Wrote env values to {env_path}", file=sys.stderr)

    print("\nCreated resources")
    print(f"Form ID:        {form_id}")
    print(f"Form URL:       {responder_uri}")
    print(f"Spreadsheet ID: {spreadsheet_id}")
    print("\nField IDs")
    for key in [
        "exercise_id",
        "student_name",
        "answer",
    ]:
        print(f"{key}: {field_ids[key]}")

    print("\nQuestion IDs (Forms API)")
    for key in [
        "exercise_id",
        "student_name",
        "answer",
    ]:
        print(f"{key}: {question_ids[key]}")

    print("\nWebsite environment values")
    for key in [
        "GOOGLE_FORM_URL",
        "GOOGLE_FORM_EXERCISE_FIELD",
        "GOOGLE_FORM_STUDENT_NAME_FIELD",
        "GOOGLE_FORM_ANSWER_FIELD",
        "ACTIVE_EXERCISE_ID",
        "WORKSHOP_FORM_ID",
        "WORKSHOP_SPREADSHEET_ID",
    ]:
        print(f"{key}={env_values[key]}")

    print("\nPrefill links")
    for exercise_id in [f"E{i}" for i in range(1, 9)]:
        print(f"{exercise_id}: {prefill_links[exercise_id]}")

    print("\nNext manual step in Google Forms UI:")
    print("1) Open the form")
    print("2) Responses -> Link to existing spreadsheet")
    print(f"3) Select spreadsheet ID: {spreadsheet_id}")


if __name__ == "__main__":
    main()
