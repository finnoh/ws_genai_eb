#!/usr/bin/env python3

import argparse
import csv
from collections import defaultdict
from datetime import UTC, datetime
from pathlib import Path


def slugify(value: str) -> str:
    chars = []
    prev_dash = False
    for ch in value.lower().strip():
        if ch.isalnum():
            chars.append(ch)
            prev_dash = False
        else:
            if not prev_dash:
                chars.append("-")
            prev_dash = True
    slug = "".join(chars).strip("-")
    return slug or "misc"


def compute_context_path(day_value: str, topic: str, base_dir: str) -> str:
    day = day_value.strip().lower()
    if day == "1":
        day_folder = "day1"
    elif day == "2":
        day_folder = "day2"
    else:
        day_folder = "shared"
    topic_slug = slugify(topic)
    return f"{base_dir}/{day_folder}/{topic_slug}.md"


def load_registry(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        fieldnames = list(reader.fieldnames or [])
        rows = [dict(row) for row in reader]
    return fieldnames, rows


def write_registry(path: Path, fieldnames: list[str], rows: list[dict[str, str]]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def assign_context_paths(args: argparse.Namespace) -> None:
    registry_path = Path(args.registry)
    fieldnames, rows = load_registry(registry_path)

    if "context_path" not in fieldnames:
        fieldnames.append("context_path")

    changed = 0
    for row in rows:
        existing = (row.get("context_path") or "").strip()
        if existing and not args.force:
            continue
        row["context_path"] = compute_context_path(
            row.get("day", ""),
            row.get("topic", ""),
            args.base_dir,
        )
        changed += 1

    write_registry(registry_path, fieldnames, rows)
    print(f"Updated {registry_path} with context_path values ({changed} rows changed).")


def row_to_markdown(row: dict[str, str]) -> list[str]:
    resource_id = (row.get("id") or "").strip()
    title = (row.get("title") or "").strip()
    url_or_path = (row.get("url_or_path") or "").strip()
    tags = (row.get("tags") or "").strip()
    notes = (row.get("notes") or "").strip()
    status = (row.get("status") or "").strip()
    source_type = (row.get("type") or "").strip()

    lines = [f"### [{resource_id}] {title}"]
    if url_or_path:
        lines.append(f"- Source: {url_or_path}")
    lines.append(f"- Type: {source_type}")
    lines.append(f"- Status: {status}")
    if tags:
        lines.append(f"- Tags: {tags}")
    if notes:
        lines.append(f"- Context note: {notes}")
    lines.append("")
    return lines


def build_context_files(args: argparse.Namespace) -> None:
    registry_path = Path(args.registry)
    _, rows = load_registry(registry_path)

    grouped: dict[str, list[dict[str, str]]] = defaultdict(list)
    for row in rows:
        context_path = (row.get("context_path") or "").strip()
        if not context_path:
            continue
        status = (row.get("status") or "").strip().lower()
        if args.active_only and status != "active":
            continue
        grouped[context_path].append(row)

    generated = 0
    timestamp = datetime.now(UTC).replace(microsecond=0).isoformat()
    for rel_path, context_rows in grouped.items():
        context_rows.sort(key=lambda item: (item.get("id") or "", item.get("title") or ""))
        full_path = Path(rel_path)
        full_path.parent.mkdir(parents=True, exist_ok=True)

        header = [
            f"## Context Pack: {full_path.stem}",
            "",
            f"Generated: {timestamp}",
            "",
            "Use these resource notes in speaker notes and cite by resource ID.",
            "",
        ]
        body: list[str] = []
        for row in context_rows:
            body.extend(row_to_markdown(row))

        full_path.write_text("\n".join(header + body).rstrip() + "\n", encoding="utf-8")
        generated += 1

    print(f"Generated {generated} context files.")


def sync_context(args: argparse.Namespace) -> None:
    assign_context_paths(args)
    build_context_files(args)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Manage registry-backed context files for slides")
    parser.add_argument(
        "--registry",
        default="resources/registry.csv",
        help="Path to registry CSV",
    )
    parser.add_argument(
        "--base-dir",
        default="slides/partials/context",
        help="Base directory for context files",
    )
    parser.add_argument(
        "--active-only",
        action="store_true",
        help="Only include active resources when building context files",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite existing context_path values during assignment",
    )

    subparsers = parser.add_subparsers(dest="command", required=True)

    assign_parser = subparsers.add_parser("assign", help="Assign context_path values in registry.csv")
    assign_parser.set_defaults(func=assign_context_paths)

    build_parser_cmd = subparsers.add_parser("build", help="Build context markdown files from registry")
    build_parser_cmd.set_defaults(func=build_context_files)

    sync_parser = subparsers.add_parser("sync", help="Assign paths and build context files")
    sync_parser.set_defaults(func=sync_context)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
