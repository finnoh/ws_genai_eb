#!/usr/bin/env python3

import argparse
import csv
import io
import json
import os
import re
import sys
import urllib.request
from pathlib import Path
from typing import Any


def fetch_csv_rows(url: str) -> list[dict[str, str]]:
    with urllib.request.urlopen(url) as response:
        payload = response.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(payload))
    return [dict(row) for row in reader]


def read_csv_rows(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        return [dict(row) for row in reader]


def safe_get(row: dict[str, str], keys: list[str]) -> str:
    for key in keys:
        value = row.get(key, "")
        if value:
            return value.strip()
    return ""


def parse_answer_fields(answer: str) -> dict[str, str]:
    text = (answer or "").strip()
    if not text:
        return {
            "original_prompt": "",
            "rewritten_prompt": "",
            "ab_test_summary": "",
            "failure_analysis": "",
        }

    try:
        parsed = json.loads(text)
        if isinstance(parsed, dict):
            return {
                "original_prompt": str(parsed.get("original_prompt", "")).strip(),
                "rewritten_prompt": str(parsed.get("rewritten_prompt", "")).strip(),
                "ab_test_summary": str(parsed.get("ab_test_summary", "")).strip(),
                "failure_analysis": str(parsed.get("failure_analysis", "")).strip(),
            }
    except json.JSONDecodeError:
        pass

    labels = {
        "original_prompt": ["original prompt", "prompt a", "before"],
        "rewritten_prompt": ["rewritten prompt", "prompt b", "after", "improved prompt"],
        "ab_test_summary": ["a/b", "ab test", "test summary", "comparison"],
        "failure_analysis": ["failure analysis", "failure", "what failed", "errors"],
    }

    lines = [line.strip() for line in text.splitlines()]
    buckets: dict[str, list[str]] = {k: [] for k in labels}
    current = ""
    for line in lines:
        normalized = re.sub(r"[^a-z0-9/ ]", "", line.lower())
        switched = False
        for key, aliases in labels.items():
            if any(alias in normalized for alias in aliases):
                current = key
                switched = True
                break
        if switched:
            continue
        if current:
            buckets[current].append(line)

    if any(buckets.values()):
        return {k: "\n".join(v).strip() for k, v in buckets.items()}

    return {
        "original_prompt": "",
        "rewritten_prompt": text,
        "ab_test_summary": "",
        "failure_analysis": "",
    }


def collect_e2_submissions(rows: list[dict[str, str]], limit: int | None) -> list[dict[str, Any]]:
    selected: list[dict[str, Any]] = []
    for row in rows:
        exercise_id = safe_get(row, ["exercise_id", "exercise", "Exercise ID"]).upper()
        if exercise_id != "E2":
            continue
        answer = safe_get(row, ["answer", "Answer"])
        fields = parse_answer_fields(answer)
        selected.append(
            {
                "timestamp": safe_get(row, ["Timestamp", "timestamp"]),
                "group_id": safe_get(row, ["group_id", "group", "Group ID"]),
                "exercise_id": "E2",
                **fields,
            }
        )
    if limit is not None:
        return selected[-limit:]
    return selected


def call_openai_chat(model: str, api_key: str, schema: dict[str, Any], prompt_text: str, submission: dict[str, Any]) -> dict[str, Any]:
    body = {
        "model": model,
        "temperature": 0,
        "messages": [
            {"role": "system", "content": prompt_text},
            {"role": "user", "content": json.dumps(submission, ensure_ascii=True)},
        ],
        "response_format": {
            "type": "json_schema",
            "json_schema": {
                "name": "e2_grading_result",
                "strict": True,
                "schema": schema,
            },
        },
    }
    request = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(request) as response:
        payload = json.loads(response.read().decode("utf-8"))
    content = payload["choices"][0]["message"]["content"]
    return json.loads(content)


def validate_grade(grade: dict[str, Any]) -> None:
    required_top = ["group_id", "exercise_id", "scores", "total_score", "confidence", "strengths", "next_steps", "summary"]
    for key in required_top:
        if key not in grade:
            raise ValueError(f"Missing required field: {key}")

    if grade["exercise_id"] != "E2":
        raise ValueError("exercise_id must be E2")

    scores = grade["scores"]
    criteria = ["constraint_quality", "ab_test_quality", "failure_analysis_depth", "iteration_quality"]
    total = 0
    for criterion in criteria:
        if criterion not in scores:
            raise ValueError(f"Missing score field: {criterion}")
        value = scores[criterion]
        if not isinstance(value, int) or value < 0 or value > 3:
            raise ValueError(f"Score {criterion} must be int 0..3")
        total += value

    if grade["total_score"] != total:
        raise ValueError("total_score must equal sum of scores")

    if grade["confidence"] not in {"low", "medium", "high"}:
        raise ValueError("confidence must be low|medium|high")

    for array_key in ["strengths", "next_steps"]:
        arr = grade[array_key]
        if not isinstance(arr, list) or not (1 <= len(arr) <= 3):
            raise ValueError(f"{array_key} must have 1..3 items")


def write_jsonl(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as handle:
        for row in rows:
            handle.write(json.dumps(row, ensure_ascii=True) + "\n")


def write_scores_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "timestamp",
        "group_id",
        "exercise_id",
        "constraint_quality",
        "ab_test_quality",
        "failure_analysis_depth",
        "iteration_quality",
        "total_score",
        "confidence",
        "summary",
    ]
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            scores = row["scores"]
            writer.writerow(
                {
                    "timestamp": row.get("timestamp", ""),
                    "group_id": row.get("group_id", ""),
                    "exercise_id": row.get("exercise_id", "E2"),
                    "constraint_quality": scores.get("constraint_quality", ""),
                    "ab_test_quality": scores.get("ab_test_quality", ""),
                    "failure_analysis_depth": scores.get("failure_analysis_depth", ""),
                    "iteration_quality": scores.get("iteration_quality", ""),
                    "total_score": row.get("total_score", ""),
                    "confidence": row.get("confidence", ""),
                    "summary": row.get("summary", ""),
                }
            )


def main() -> None:
    parser = argparse.ArgumentParser(description="Grade Exercise 2 submissions from Google Sheet CSV")
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument("--csv-url", help="Published Google Sheet CSV URL")
    source.add_argument("--input-csv", help="Local CSV export path")
    parser.add_argument("--output-jsonl", default="outputs/e2_grades.jsonl", help="Path for graded JSONL output")
    parser.add_argument("--output-csv", default="outputs/e2_grades.csv", help="Path for score summary CSV output")
    parser.add_argument("--limit", type=int, default=None, help="Grade only the latest N E2 submissions")
    parser.add_argument("--dry-run", action="store_true", help="Do not call model; write normalized E2 packets only")
    parser.add_argument("--model", default=os.getenv("OPENAI_MODEL", "gpt-4o-mini"), help="OpenAI model name")
    parser.add_argument(
        "--prompt-file",
        default="exercises/ai-grading/e2_prompt.md",
        help="Path to grading prompt",
    )
    parser.add_argument(
        "--schema-file",
        default="exercises/ai-grading/e2_schema.json",
        help="Path to JSON schema",
    )
    args = parser.parse_args()

    if args.csv_url:
        rows = fetch_csv_rows(args.csv_url)
    else:
        rows = read_csv_rows(Path(args.input_csv))

    submissions = collect_e2_submissions(rows, args.limit)
    if not submissions:
        print("No E2 submissions found.")
        return

    if args.dry_run:
        write_jsonl(Path(args.output_jsonl), submissions)
        print(f"Wrote {len(submissions)} normalized E2 packets to {args.output_jsonl}")
        return

    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        print("OPENAI_API_KEY is required unless --dry-run is used.", file=sys.stderr)
        sys.exit(1)

    prompt_text = Path(args.prompt_file).read_text(encoding="utf-8")
    schema = json.loads(Path(args.schema_file).read_text(encoding="utf-8"))

    grades: list[dict[str, Any]] = []
    for submission in submissions:
        grade = call_openai_chat(args.model, api_key, schema, prompt_text, submission)
        grade["timestamp"] = submission.get("timestamp", "")
        if not grade.get("group_id"):
            grade["group_id"] = submission.get("group_id", "")
        validate_grade(grade)
        grades.append(grade)

    write_jsonl(Path(args.output_jsonl), grades)
    write_scores_csv(Path(args.output_csv), grades)
    print(f"Wrote {len(grades)} graded records to {args.output_jsonl}")
    print(f"Wrote score summary to {args.output_csv}")


if __name__ == "__main__":
    main()
