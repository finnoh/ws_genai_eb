#!/usr/bin/env python3

import argparse
import copy
import json
import os
import re
import shutil
import subprocess
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


EXERCISE_HEADER_RE = re.compile(r"^##\s+(E\d+)\s*-\s*(.+?)(?:\s+\((.+)\))?\s*$")
SECTION_HEADER_RE = re.compile(r"^###\s+(.+?)\s*$")


SECTION_KEY_MAP = {
    "objective": "objective",
    "inputs": "inputs",
    "deliverablesinglemicroartifact": "deliverable",
    "timebox": "timebox",
    "submissionlink": "submission_link",
    "evaluationrubric": "evaluation_rubric",
    "commonfailuremodes": "common_failure_modes",
    "extensiontaskoptional": "extension_task",
}


def slug(value: str) -> str:
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


def run_gws_json(args: list[str]) -> Any:
    command = ["gws", *args]
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode != 0:
        error_text = result.stderr.strip() or result.stdout.strip() or "Unknown gws error"
        raise RuntimeError(f"Command failed: {' '.join(command)}\n{error_text}")
    return parse_json_payload(result.stdout, command)


@dataclass
class ExerciseDraft:
    exercise_id: str
    title: str
    context: str
    sections: dict[str, list[str]] = field(default_factory=dict)

    def get(self, key: str) -> list[str]:
        return self.sections.get(key, [])


def parse_drafts(markdown_text: str) -> list[ExerciseDraft]:
    lines = markdown_text.splitlines()
    drafts: list[ExerciseDraft] = []
    current: ExerciseDraft | None = None
    current_section_key = ""

    for raw_line in lines:
        line = raw_line.rstrip()

        exercise_match = EXERCISE_HEADER_RE.match(line)
        if exercise_match:
            if current is not None:
                drafts.append(current)
            current = ExerciseDraft(
                exercise_id=exercise_match.group(1).strip(),
                title=exercise_match.group(2).strip(),
                context=(exercise_match.group(3) or "").strip(),
            )
            current_section_key = ""
            continue

        if current is None:
            continue

        section_match = SECTION_HEADER_RE.match(line)
        if section_match:
            normalized = slug(section_match.group(1))
            current_section_key = SECTION_KEY_MAP.get(normalized, "")
            if current_section_key and current_section_key not in current.sections:
                current.sections[current_section_key] = []
            continue

        if not current_section_key:
            continue

        stripped = line.strip()
        if not stripped:
            continue

        if stripped.startswith("- "):
            current.sections[current_section_key].append(stripped[2:].strip())
        else:
            current.sections[current_section_key].append(stripped)

    if current is not None:
        drafts.append(current)

    return drafts


def load_state(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def save_state(path: Path, state: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(state, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")


def render_doc_text(drafts: list[ExerciseDraft], source_path: Path) -> str:
    generated_at = datetime.now(timezone.utc).isoformat()
    lines = [
        "# Exercise Drafts Sync",
        "",
        f"Source: {source_path}",
        f"Generated at (UTC): {generated_at}",
        "",
    ]

    ordered_sections = [
        ("objective", "Objective"),
        ("inputs", "Inputs"),
        ("deliverable", "Deliverable"),
        ("timebox", "Timebox"),
        ("submission_link", "Submission link"),
        ("evaluation_rubric", "Evaluation rubric"),
        ("common_failure_modes", "Common failure modes"),
        ("extension_task", "Extension task"),
    ]

    for draft in drafts:
        context = f" ({draft.context})" if draft.context else ""
        lines.append(f"## {draft.exercise_id} - {draft.title}{context}")
        lines.append("")
        for key, label in ordered_sections:
            lines.append(f"### {label}")
            values = draft.get(key)
            if values:
                for value in values:
                    lines.append(f"- {value}")
            else:
                lines.append("- (missing)")
            lines.append("")

    return "\n".join(lines).strip() + "\n"


def build_tab_text_and_heading_ranges(
    draft: ExerciseDraft,
) -> tuple[str, tuple[int, int], list[tuple[int, int]]]:
    sections = [
        ("objective", "Objective"),
        ("inputs", "Inputs"),
        ("deliverable", "Deliverable"),
        ("timebox", "Timebox"),
        ("submission_link", "Submission link"),
        ("evaluation_rubric", "Evaluation rubric"),
        ("common_failure_modes", "Common failure modes"),
        ("extension_task", "Extension task"),
    ]

    lines: list[str] = []
    heading_two_ranges: list[tuple[int, int]] = []
    offset = 1

    context = f" ({draft.context})" if draft.context else ""
    title_line = f"{draft.exercise_id} - {draft.title}{context}\n"
    lines.append(title_line)
    heading_one_range = (offset, offset + len(title_line))
    offset += len(title_line)
    lines.append("\n")
    offset += 1

    for key, label in sections:
        header_line = f"{label}\n"
        lines.append(header_line)
        heading_two_ranges.append((offset, offset + len(header_line)))
        offset += len(header_line)

        values = draft.get(key)
        if values:
            for value in values:
                line = f"- {value}\n"
                lines.append(line)
                offset += len(line)
        else:
            line = "- (missing)\n"
            lines.append(line)
            offset += len(line)

        lines.append("\n")
        offset += 1

    return "".join(lines), heading_one_range, heading_two_ranges


def extract_tabs(document: dict[str, Any]) -> list[dict[str, Any]]:
    tabs = document.get("tabs") or []
    return [tab for tab in tabs if isinstance(tab, dict)]


def tab_max_end_index(tab: dict[str, Any]) -> int:
    document_tab = tab.get("documentTab") or {}
    body = document_tab.get("body") or {}
    content = body.get("content") or []
    max_end_index = 1
    for element in content:
        end_index = element.get("endIndex")
        if isinstance(end_index, int):
            max_end_index = max(max_end_index, end_index)
    return max_end_index


def sync_docs(drafts: list[ExerciseDraft], source_path: Path, state: dict[str, Any], document_id: str) -> str:
    if not document_id:
        created = run_gws_json(
            [
                "docs",
                "documents",
                "create",
                "--json",
                json.dumps({"title": "TI AI Agents - Exercise Drafts"}),
            ]
        )
        if not isinstance(created, dict):
            raise RuntimeError("Unexpected payload from docs create")
        document_id = str(created.get("documentId", "")).strip()
        if not document_id:
            raise RuntimeError("Failed to create Google Doc for exercise drafts")

    document = run_gws_json(
        [
            "docs",
            "documents",
            "get",
            "--params",
            json.dumps({"documentId": document_id, "includeTabsContent": True}),
        ]
    )
    if not isinstance(document, dict):
        raise RuntimeError("Unexpected payload from docs get")

    tabs = extract_tabs(document)
    desired_titles = [f"{draft.exercise_id} {draft.title}" for draft in drafts]

    if len(tabs) < len(drafts):
        create_requests = []
        for index in range(len(tabs), len(drafts)):
            create_requests.append(
                {
                    "addDocumentTab": {
                        "tabProperties": {
                            "title": desired_titles[index],
                            "index": index,
                        }
                    }
                }
            )
        run_gws_json(
            [
                "docs",
                "documents",
                "batchUpdate",
                "--params",
                json.dumps({"documentId": document_id}),
                "--json",
                json.dumps({"requests": create_requests}),
            ]
        )
        document = run_gws_json(
            [
                "docs",
                "documents",
                "get",
                "--params",
                json.dumps({"documentId": document_id, "includeTabsContent": True}),
            ]
        )
        if not isinstance(document, dict):
            raise RuntimeError("Unexpected payload from docs get after tab creation")
        tabs = extract_tabs(document)

    requests: list[dict[str, Any]] = []

    for index, draft in enumerate(drafts):
        if index >= len(tabs):
            break
        tab = tabs[index]
        tab_props = tab.get("tabProperties") or {}
        tab_id = str(tab_props.get("tabId", "")).strip()
        if not tab_id:
            continue

        desired_title = desired_titles[index]
        current_title = str(tab_props.get("title", "")).strip()
        if current_title != desired_title:
            requests.append(
                {
                    "updateDocumentTabProperties": {
                        "tabProperties": {
                            "tabId": tab_id,
                            "title": desired_title,
                        },
                        "fields": "title",
                    }
                }
            )

        max_end_index = tab_max_end_index(tab)
        if max_end_index > 2:
            requests.append(
                {
                    "deleteContentRange": {
                        "range": {
                            "startIndex": 1,
                            "endIndex": max_end_index - 1,
                            "tabId": tab_id,
                        }
                    }
                }
            )

        text, heading_one_range, heading_two_ranges = build_tab_text_and_heading_ranges(draft)
        requests.append(
            {
                "insertText": {
                    "location": {"index": 1, "tabId": tab_id},
                    "text": text,
                }
            }
        )
        requests.append(
            {
                "updateParagraphStyle": {
                    "range": {
                        "startIndex": heading_one_range[0],
                        "endIndex": heading_one_range[1],
                        "tabId": tab_id,
                    },
                    "paragraphStyle": {"namedStyleType": "HEADING_1"},
                    "fields": "namedStyleType",
                }
            }
        )
        for heading_two_range in heading_two_ranges:
            requests.append(
                {
                    "updateParagraphStyle": {
                        "range": {
                            "startIndex": heading_two_range[0],
                            "endIndex": heading_two_range[1],
                            "tabId": tab_id,
                        },
                        "paragraphStyle": {"namedStyleType": "HEADING_2"},
                        "fields": "namedStyleType",
                    }
                }
            )

    if requests:
        run_gws_json(
            [
                "docs",
                "documents",
                "batchUpdate",
                "--params",
                json.dumps({"documentId": document_id}),
                "--json",
                json.dumps({"requests": requests}),
            ]
        )

    state["docs_document_id"] = document_id
    return document_id


def build_subtasks(draft: ExerciseDraft) -> list[tuple[str, str]]:
    subtasks: list[tuple[str, str]] = []

    for idx, item in enumerate(draft.get("objective"), start=1):
        subtasks.append((f"OBJ{idx}", item))

    for idx, item in enumerate(draft.get("deliverable"), start=1):
        subtasks.append((f"DEL{idx}", item))

    if not subtasks:
        subtasks = [
            ("TASK1", "Complete the main task"),
            ("TASK2", "Report one failure mode"),
            ("TASK3", "Report one verification method"),
        ]

    return subtasks[:8]


def exercise_sheet_rows(draft: ExerciseDraft) -> list[list[str]]:
    rows: list[list[str]] = []
    rows.append(["Exercise", f"{draft.exercise_id} - {draft.title}"])
    rows.append(["Submission link", " | ".join(draft.get("submission_link"))])
    rows.append([])
    rows.append(
        [
            "timestamp",
            "group_id",
            "subtask_id",
            "subtask_description",
            "answer",
            "artifact_url",
            "confidence",
            "uncertainty_note",
            "verification_method",
        ]
    )

    for subtask_id, subtask_text in build_subtasks(draft):
        rows.append(["", "", subtask_id, subtask_text, "", "", "", "", ""])

    return rows


def index_sheet_rows(drafts: list[ExerciseDraft], sheet_ids: dict[str, int]) -> list[list[str]]:
    rows: list[list[str]] = [
        [
            "exercise_id",
            "title",
            "sheet_name",
            "sheet_gid",
            "submission_link",
            "objective_items",
            "subtasks_prefilled",
        ]
    ]

    for draft in drafts:
        sheet_name = f"{draft.exercise_id}"
        rows.append(
            [
                draft.exercise_id,
                draft.title,
                sheet_name,
                str(sheet_ids.get(sheet_name, "")),
                " | ".join(draft.get("submission_link")),
                str(len(draft.get("objective"))),
                str(len(build_subtasks(draft))),
            ]
        )

    return rows


def sync_sheets(drafts: list[ExerciseDraft], state: dict[str, Any], spreadsheet_id: str) -> str:
    if not spreadsheet_id:
        created = run_gws_json(
            [
                "sheets",
                "spreadsheets",
                "create",
                "--json",
                json.dumps({"properties": {"title": "TI AI Agents - Exercise Drafts"}}),
            ]
        )
        if not isinstance(created, dict):
            raise RuntimeError("Unexpected payload from sheets create")
        spreadsheet_id = str(created.get("spreadsheetId", "")).strip()
        if not spreadsheet_id:
            raise RuntimeError("Failed to create spreadsheet for exercise drafts")

    metadata = run_gws_json(
        [
            "sheets",
            "spreadsheets",
            "get",
            "--params",
            json.dumps({"spreadsheetId": spreadsheet_id}),
        ]
    )
    if not isinstance(metadata, dict):
        raise RuntimeError("Unexpected payload from sheets get")

    sheet_title = "Sheet1"
    sheets = metadata.get("sheets") or []
    existing_titles: set[str] = set()
    sheet_ids: dict[str, int] = {}
    if sheets and isinstance(sheets[0], dict):
        props = sheets[0].get("properties") or {}
        maybe_title = str(props.get("title", "")).strip()
        if maybe_title:
            sheet_title = maybe_title

    for entry in sheets:
        if not isinstance(entry, dict):
            continue
        props = entry.get("properties") or {}
        title = str(props.get("title", "")).strip()
        sheet_id = props.get("sheetId")
        if title:
            existing_titles.add(title)
            if isinstance(sheet_id, int):
                sheet_ids[title] = sheet_id

    target_titles = {"Index"}
    for draft in drafts:
        target_titles.add(f"{draft.exercise_id}")

    add_requests: list[dict[str, Any]] = []
    for title in sorted(target_titles):
        if title in existing_titles:
            continue
        add_requests.append({"addSheet": {"properties": {"title": title}}})

    if add_requests:
        run_gws_json(
            [
                "sheets",
                "spreadsheets",
                "batchUpdate",
                "--params",
                json.dumps({"spreadsheetId": spreadsheet_id}),
                "--json",
                json.dumps({"requests": add_requests}),
            ]
        )
        metadata = run_gws_json(
            [
                "sheets",
                "spreadsheets",
                "get",
                "--params",
                json.dumps({"spreadsheetId": spreadsheet_id}),
            ]
        )
        if not isinstance(metadata, dict):
            raise RuntimeError("Unexpected payload from sheets get after addSheet")
        sheets = metadata.get("sheets") or []
        sheet_ids = {}
        for entry in sheets:
            if not isinstance(entry, dict):
                continue
            props = entry.get("properties") or {}
            title = str(props.get("title", "")).strip()
            sheet_id = props.get("sheetId")
            if title and isinstance(sheet_id, int):
                sheet_ids[title] = sheet_id

    default_sheet_id = sheet_ids.get("Sheet1")
    if isinstance(default_sheet_id, int) and "Sheet1" not in target_titles:
        run_gws_json(
            [
                "sheets",
                "spreadsheets",
                "batchUpdate",
                "--params",
                json.dumps({"spreadsheetId": spreadsheet_id}),
                "--json",
                json.dumps({"requests": [{"deleteSheet": {"sheetId": default_sheet_id}}]}),
            ]
        )

    titles_to_refresh = ["Index", *[f"{draft.exercise_id}" for draft in drafts]]

    for title in titles_to_refresh:
        run_gws_json(
            [
                "sheets",
                "spreadsheets",
                "values",
                "clear",
                "--params",
                json.dumps({"spreadsheetId": spreadsheet_id, "range": title}),
                "--json",
                json.dumps({}),
            ]
        )

    run_gws_json(
        [
            "sheets",
            "spreadsheets",
            "values",
            "update",
            "--params",
            json.dumps(
                {
                    "spreadsheetId": spreadsheet_id,
                    "range": "Index!A1",
                    "valueInputOption": "USER_ENTERED",
                }
            ),
            "--json",
            json.dumps({"values": index_sheet_rows(drafts, sheet_ids)}),
        ]
    )

    for draft in drafts:
        title = f"{draft.exercise_id}"
        run_gws_json(
            [
                "sheets",
                "spreadsheets",
                "values",
                "update",
                "--params",
                json.dumps(
                    {
                        "spreadsheetId": spreadsheet_id,
                        "range": f"{title}!A1",
                        "valueInputOption": "USER_ENTERED",
                    }
                ),
                "--json",
                json.dumps({"values": exercise_sheet_rows(draft)}),
            ]
        )

    state["sheets_spreadsheet_id"] = spreadsheet_id
    return spreadsheet_id


def extract_exercise_ids(drafts: list[ExerciseDraft]) -> list[str]:
    seen: set[str] = set()
    exercise_ids: list[str] = []
    for draft in drafts:
        if draft.exercise_id in seen:
            continue
        seen.add(draft.exercise_id)
        exercise_ids.append(draft.exercise_id)
    return exercise_ids


def sync_form(drafts: list[ExerciseDraft], source_path: Path, form_id: str) -> str:
    if not form_id:
        raise RuntimeError("Form sync requested but no form ID provided (use --form-id or WORKSHOP_FORM_ID).")

    form = run_gws_json(
        [
            "forms",
            "forms",
            "get",
            "--params",
            json.dumps({"formId": form_id}),
        ]
    )
    if not isinstance(form, dict):
        raise RuntimeError("Unexpected payload from forms get")

    items = form.get("items") or []
    item_index = -1
    source_item: dict[str, Any] | None = None

    for index, item in enumerate(items):
        title = str(item.get("title", ""))
        question = ((item.get("questionItem") or {}).get("question") or {})
        choice_question = question.get("choiceQuestion") or {}
        if not choice_question:
            continue
        if slug(title) == "exerciseid":
            item_index = index
            source_item = item
            break

    if source_item is None or item_index < 0:
        raise RuntimeError("Could not find an 'exercise_id' choice question in the target form.")

    updated_item = copy.deepcopy(source_item)
    choice_question = ((updated_item.get("questionItem") or {}).get("question") or {}).get(
        "choiceQuestion"
    )
    if not isinstance(choice_question, dict):
        raise RuntimeError("'exercise_id' question exists but is not a choice question.")

    exercise_ids = extract_exercise_ids(drafts)
    choice_question["options"] = [{"value": exercise_id} for exercise_id in exercise_ids]

    info = form.get("info") or {}
    current_description = str(info.get("description", "")).strip()
    marker = "[auto-sync]"
    base_description = current_description.split(marker, 1)[0].rstrip()
    synced_line = (
        f"{marker} Active exercises: {', '.join(exercise_ids)} | "
        f"Source: {source_path} | Synced UTC: {datetime.now(timezone.utc).isoformat()}"
    )
    new_description = f"{base_description}\n\n{synced_line}" if base_description else synced_line

    run_gws_json(
        [
            "forms",
            "forms",
            "batchUpdate",
            "--params",
            json.dumps({"formId": form_id}),
            "--json",
            json.dumps(
                {
                    "requests": [
                        {
                            "updateFormInfo": {
                                "info": {"description": new_description},
                                "updateMask": "description",
                            }
                        },
                        {
                            "updateItem": {
                                "location": {"index": item_index},
                                "item": updated_item,
                                "updateMask": "questionItem.question.choiceQuestion.options",
                            }
                        },
                    ]
                }
            ),
        ]
    )

    return form_id


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync exercise markdown drafts to Google Docs, Sheets, and Form")
    parser.add_argument(
        "--source",
        default="exercises/drafts.md",
        help="Source markdown file with E1-E8 drafts",
    )
    parser.add_argument(
        "--targets",
        default="docs,sheets,form",
        help="Comma-separated targets: docs,sheets,form",
    )
    parser.add_argument(
        "--state-file",
        default="outputs/google/exercise_sync_state.json",
        help="Path for persisted Google resource IDs",
    )
    parser.add_argument(
        "--docs-document-id",
        default="",
        help="Existing Google Doc ID (optional)",
    )
    parser.add_argument(
        "--sheets-spreadsheet-id",
        default="",
        help="Existing Google Spreadsheet ID (optional)",
    )
    parser.add_argument(
        "--form-id",
        default="",
        help="Workshop submission Form ID (optional; required when syncing form)",
    )
    args = parser.parse_args()

    if shutil.which("gws") is None:
        raise RuntimeError("gws CLI is required. Install with: npm install -g @googleworkspace/cli")

    source_path = Path(args.source)
    if not source_path.exists():
        raise RuntimeError(f"Source file not found: {source_path}")

    markdown_text = source_path.read_text(encoding="utf-8")
    drafts = parse_drafts(markdown_text)
    if not drafts:
        raise RuntimeError("No exercise drafts detected. Expected headings like '## E1 - ...'.")

    targets = [target.strip().lower() for target in args.targets.split(",") if target.strip()]
    valid_targets = {"docs", "sheets", "form"}
    unknown = [target for target in targets if target not in valid_targets]
    if unknown:
        raise RuntimeError(f"Unknown targets: {', '.join(unknown)}")

    state_path = Path(args.state_file)
    state = load_state(state_path)

    docs_id = args.docs_document_id.strip() or str(state.get("docs_document_id", "")).strip()
    sheets_id = args.sheets_spreadsheet_id.strip() or str(state.get("sheets_spreadsheet_id", "")).strip()
    form_id = args.form_id.strip() or str(state.get("form_id", "")).strip()
    if not form_id:
        form_id = os.getenv("WORKSHOP_FORM_ID", "").strip()

    if "docs" in targets:
        docs_id = sync_docs(drafts, source_path, state, docs_id)

    if "sheets" in targets:
        sheets_id = sync_sheets(drafts, state, sheets_id)

    if "form" in targets:
        synced_form_id = sync_form(drafts, source_path, form_id)
        state["form_id"] = synced_form_id
        form_id = synced_form_id

    state["last_source"] = str(source_path)
    state["last_synced_at"] = datetime.now(timezone.utc).isoformat()
    save_state(state_path, state)

    print("Sync complete")
    print(f"State file: {state_path}")
    if docs_id:
        print(f"Docs ID: {docs_id}")
        print(f"Docs URL: https://docs.google.com/document/d/{docs_id}/edit")
    if sheets_id:
        print(f"Sheets ID: {sheets_id}")
        print(f"Sheets URL: https://docs.google.com/spreadsheets/d/{sheets_id}/edit")
    if form_id and "form" in targets:
        print(f"Form ID: {form_id}")
        print(f"Form URL: https://docs.google.com/forms/d/{form_id}/edit")


if __name__ == "__main__":
    main()
