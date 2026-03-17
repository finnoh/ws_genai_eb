#!/usr/bin/env python3

import argparse
import json
from pathlib import Path


ENV_TO_FIELD = {
    "GOOGLE_FORM_EXERCISE_FIELD": "exercise_id",
    "GOOGLE_FORM_STUDENT_NAME_FIELD": "student_name",
    "GOOGLE_FORM_ANSWER_FIELD": "answer",
}


def parse_env_file(path: Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.exists():
        raise FileNotFoundError(f"Env file not found: {path}")

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key.strip()] = value.strip()
    return values


def main() -> int:
    parser = argparse.ArgumentParser(description="Sync student pack form_config.json from env values")
    parser.add_argument(
        "--env-file",
        default="website/.env.local",
        help="Source env file produced by bootstrap_workshop",
    )
    parser.add_argument(
        "--output",
        default="student-agent-pack/config/form_config.json",
        help="Destination form_config.json path",
    )
    args = parser.parse_args()

    env_values = parse_env_file(Path(args.env_file))

    payload = {
        "google_form_url": env_values.get("GOOGLE_FORM_URL", ""),
        "google_sheet_id": env_values.get("WORKSHOP_SPREADSHEET_ID", ""),
        "field_ids": {
            field_name: env_values.get(env_key, "") for env_key, field_name in ENV_TO_FIELD.items()
        },
    }

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")

    print(f"Wrote student pack config: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
