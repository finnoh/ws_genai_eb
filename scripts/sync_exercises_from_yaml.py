#!/usr/bin/env python3

from __future__ import annotations

import json
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
YAML_PATH = ROOT / "exercises" / "exercises.yaml"
OUT_PATH = ROOT / "website" / "src" / "data" / "exercises_e01_e06_overrides.json"


def main() -> int:
    payload = yaml.safe_load(YAML_PATH.read_text(encoding="utf-8"))
    entries = payload.get("exercises", [])

    overrides: dict[str, dict[str, object]] = {}
    for entry in entries:
        ex_id = str(entry.get("id", "")).strip()
        if ex_id not in {"E01", "E02", "E03", "E04", "E05", "E06"}:
            continue

        desc = entry.get("student_description", {}) or {}
        objective_items = desc.get("objective", []) or []
        objective = " ".join([str(x).strip() for x in objective_items if str(x).strip()])
        inputs = [str(x).strip() for x in (desc.get("inputs", []) or []) if str(x).strip()]

        overrides[ex_id] = {
            "title": str(entry.get("title", "")).strip(),
            "prompt": objective_items[0] if objective_items else "",
            "objective": objective,
            "objectiveBullets": objective_items,
            "deliverable": str(desc.get("deliverable", "")).strip(),
        }
        if inputs:
            overrides[ex_id]["inputs"] = inputs

    OUT_PATH.write_text(json.dumps(overrides, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    print(f"Wrote {OUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
