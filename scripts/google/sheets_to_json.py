#!/usr/bin/env python3

import argparse
import json
import shutil
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


def run_gws_json(args: list[str]) -> dict[str, Any]:
    command = ["gws", *args]
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        error_text = result.stderr.strip() or result.stdout.strip() or "Unknown gws error"
        raise RuntimeError(f"Command failed: {' '.join(command)}\n{error_text}")

    payload = result.stdout.strip()
    if not payload:
        return {}
    return json.loads(payload)


def to_rows(values: list[list[Any]]) -> list[dict[str, str]]:
    if not values:
        return []

    headers = [str(item).strip() for item in values[0]]
    rows: list[dict[str, str]] = []
    for row_values in values[1:]:
        row: dict[str, str] = {}
        for index, header in enumerate(headers):
            if not header:
                continue
            value = ""
            if index < len(row_values):
                value = str(row_values[index]).strip()
            row[header] = value
        rows.append(row)
    return rows


def main() -> None:
    parser = argparse.ArgumentParser(description="Read Google Sheet rows via gws and write JSON")
    parser.add_argument("--spreadsheet-id", required=True, help="Spreadsheet ID")
    parser.add_argument(
        "--range",
        default="Form Responses 1!A1:Z",
        help='A1 range, for example "Form Responses 1!A1:Z"',
    )
    parser.add_argument(
        "--output",
        default="outputs/live_results_sheet.json",
        help="Output JSON path",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=200,
        help="Keep latest N rows (0 keeps all)",
    )
    args = parser.parse_args()

    if shutil.which("gws") is None:
        raise RuntimeError("gws CLI is required. Install with: npm install -g @googleworkspace/cli")

    value_range = run_gws_json(
        [
            "sheets",
            "+read",
            "--spreadsheet",
            args.spreadsheet_id,
            "--range",
            args.range,
        ]
    )

    values = value_range.get("values") or []
    rows = to_rows(values)
    if args.limit > 0:
        rows = rows[-args.limit :]

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source": "sheets_api",
        "spreadsheet_id": args.spreadsheet_id,
        "range": args.range,
        "count": len(rows),
        "rows": rows,
        "submissions": rows,
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    print(f"Wrote {len(rows)} rows to {output_path}")


if __name__ == "__main__":
    main()
