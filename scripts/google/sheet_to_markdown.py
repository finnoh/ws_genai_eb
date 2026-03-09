#!/usr/bin/env python3

import argparse
import csv
import io
import urllib.request
from pathlib import Path


def fetch_csv_rows(url: str) -> list[dict[str, str]]:
    with urllib.request.urlopen(url) as response:
        payload = response.read().decode("utf-8")
    reader = csv.DictReader(io.StringIO(payload))
    return [dict(row) for row in reader]


def safe_get(row: dict[str, str], keys: list[str]) -> str:
    for key in keys:
        if key in row and row[key]:
            return row[key].strip()
    return ""


def to_markdown(rows: list[dict[str, str]], limit: int) -> str:
    latest = rows[-limit:][::-1]

    lines = [
        "## Live Submissions Snapshot",
        "",
        "| Time | Exercise | Group | Answer |",
        "|---|---|---|---|",
    ]

    for row in latest:
        timestamp = safe_get(row, ["Timestamp", "timestamp"])
        exercise_id = safe_get(row, ["exercise_id", "exercise", "Exercise ID"])
        group_id = safe_get(row, ["group_id", "group", "Group ID"])
        answer = safe_get(row, ["answer", "Answer"])
        answer = answer.replace("\n", " ").replace("|", "\\|")
        if len(answer) > 120:
            answer = answer[:117] + "..."
        lines.append(f"| {timestamp} | {exercise_id} | {group_id} | {answer} |")

    return "\n".join(lines) + "\n"


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert published Google Sheet CSV to markdown table")
    parser.add_argument("--csv-url", required=True, help="Published Google Sheet CSV URL")
    parser.add_argument("--output", default="slides/partials/live_snapshot.md", help="Output markdown file")
    parser.add_argument("--limit", type=int, default=12, help="Rows to include (latest first)")
    args = parser.parse_args()

    rows = fetch_csv_rows(args.csv_url)
    markdown = to_markdown(rows, args.limit)

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(markdown, encoding="utf-8")
    print(f"Wrote snapshot to {output_path}")


if __name__ == "__main__":
    main()
