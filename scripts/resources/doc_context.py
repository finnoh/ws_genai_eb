#!/usr/bin/env python3

import argparse
import csv
import json
import re
import urllib.request
from dataclasses import dataclass
from datetime import UTC, datetime
from html.parser import HTMLParser
from pathlib import Path


USER_AGENT = "TI-Workshop-DocIndexer/1.0 (+https://opencode.ai)"


@dataclass
class Source:
    source_id: str
    name: str
    url: str
    topic: str
    tags: str
    status: str


class TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._skip_depth = 0
        self._in_title = False
        self.title = ""
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        del attrs
        if tag in {"script", "style", "noscript"}:
            self._skip_depth += 1
            return
        if tag == "title":
            self._in_title = True
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "dt", "dd", "pre", "code", "br"}:
            self.parts.append("\n")

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "noscript"} and self._skip_depth > 0:
            self._skip_depth -= 1
            return
        if tag == "title":
            self._in_title = False
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "dt", "dd", "pre", "code"}:
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        if self._skip_depth > 0:
            return
        text = re.sub(r"\s+", " ", data).strip()
        if not text:
            return
        if self._in_title:
            self.title = text
        self.parts.append(text)


def slugify(value: str) -> str:
    lowered = value.lower().strip()
    lowered = re.sub(r"[^a-z0-9]+", "-", lowered)
    return lowered.strip("-") or "doc"


def normalize_text(raw: str) -> str:
    text = re.sub(r"\s+", " ", raw)
    return text.strip()


def load_sources(path: Path) -> list[Source]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        rows = []
        for row in reader:
            if not row:
                continue
            rows.append(
                Source(
                    source_id=(row.get("id") or "").strip(),
                    name=(row.get("name") or "").strip(),
                    url=(row.get("url") or "").strip(),
                    topic=(row.get("topic") or "").strip(),
                    tags=(row.get("tags") or "").strip(),
                    status=(row.get("status") or "").strip(),
                )
            )
    return [row for row in rows if row.url and row.status != "inactive"]


def fetch_and_extract(url: str, timeout: int) -> tuple[str, str]:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=timeout) as response:
        payload = response.read().decode("utf-8", errors="ignore")
    parser = TextExtractor()
    parser.feed(payload)
    title = parser.title or url
    text = normalize_text(" ".join(parser.parts))
    return title, text


def tokenize_query(query: str) -> list[str]:
    stopwords = {
        "and",
        "the",
        "for",
        "with",
        "from",
        "this",
        "that",
        "into",
        "about",
        "how",
        "what",
    }
    terms = re.findall(r"[a-zA-Z0-9]{3,}", query.lower())
    return sorted({term for term in terms if term not in stopwords})


def build_snippet(text: str, terms: list[str], max_chars: int) -> str:
    lower = text.lower()
    hit_index = -1
    hit_term = ""
    for term in terms:
        idx = lower.find(term)
        if idx != -1:
            hit_index = idx
            hit_term = term
            break
    if hit_index == -1:
        return text[:max_chars].strip()

    start = max(0, hit_index - max_chars // 3)
    end = min(len(text), hit_index + (2 * max_chars // 3))
    snippet = text[start:end].strip()
    if start > 0:
        snippet = "... " + snippet
    if end < len(text):
        snippet = snippet + " ..."
    return f"[{hit_term}] {snippet}"


def run_index(args: argparse.Namespace) -> None:
    sources_path = Path(args.sources)
    output_dir = Path(args.output_dir)
    text_dir = output_dir / "text"
    excerpt_dir = output_dir / "excerpts"
    text_dir.mkdir(parents=True, exist_ok=True)
    excerpt_dir.mkdir(parents=True, exist_ok=True)

    sources = load_sources(sources_path)
    indexed: list[dict[str, str | int]] = []
    fetched_at = datetime.now(UTC).replace(microsecond=0).isoformat()

    for source in sources:
        slug = slugify(f"{source.source_id}-{source.name}")
        text_path = text_dir / f"{slug}.txt"
        excerpt_path = excerpt_dir / f"{slug}.md"

        title, text = fetch_and_extract(source.url, args.timeout)
        if len(text) > args.max_chars:
            text = text[: args.max_chars].rsplit(" ", 1)[0] + " ..."

        excerpt = text[: args.excerpt_chars].strip()
        text_path.write_text(text + "\n", encoding="utf-8")
        excerpt_body = (
            f"# {source.name}\n\n"
            f"- URL: {source.url}\n"
            f"- Retrieved: {fetched_at}\n"
            f"- Parsed title: {title}\n\n"
            f"## Context excerpt\n\n"
            f"{excerpt}\n"
        )
        excerpt_path.write_text(excerpt_body, encoding="utf-8")

        indexed.append(
            {
                "id": source.source_id,
                "name": source.name,
                "url": source.url,
                "topic": source.topic,
                "tags": source.tags,
                "status": source.status,
                "parsed_title": title,
                "fetched_at": fetched_at,
                "word_count": len(text.split()),
                "text_path": str(text_path.as_posix()),
                "excerpt_path": str(excerpt_path.as_posix()),
            }
        )
        print(f"Indexed {source.source_id}: {source.name}")

    index_path = output_dir / "index.json"
    index_path.write_text(json.dumps(indexed, indent=2, ensure_ascii=True) + "\n", encoding="utf-8")
    print(f"Wrote index file: {index_path}")


def score_document(text: str, terms: list[str]) -> int:
    lower = text.lower()
    return sum(lower.count(term) for term in terms)


def run_context(args: argparse.Namespace) -> None:
    output_path = Path(args.output)
    index_path = Path(args.index)
    entries = json.loads(index_path.read_text(encoding="utf-8"))
    terms = tokenize_query(args.query)

    scored: list[tuple[int, dict, str]] = []
    for entry in entries:
        text_path = Path(entry["text_path"])
        if not text_path.exists():
            continue
        text = text_path.read_text(encoding="utf-8")
        score = score_document(text, terms)
        scored.append((score, entry, text))

    scored.sort(key=lambda item: item[0], reverse=True)
    selected = [item for item in scored if item[0] > 0][: args.top_k]
    if not selected:
        selected = scored[: args.top_k]

    lines = [
        f"## Context Pack: {args.query}",
        "",
        f"Generated: {datetime.now(UTC).replace(microsecond=0).isoformat()}",
        "",
    ]

    if terms:
        lines.append(f"Query terms: {', '.join(terms)}")
        lines.append("")

    for score, entry, text in selected:
        snippet = build_snippet(text, terms, args.snippet_chars)
        lines.append(f"### {entry['name']}")
        lines.append(f"- Relevance score: {score}")
        lines.append(f"- Source: {entry['url']}")
        lines.append(f"- Suggested slide note: {snippet}")
        lines.append("")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"Wrote context pack: {output_path}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Index docs and generate context packs for slides")
    subparsers = parser.add_subparsers(dest="command", required=True)

    index_parser = subparsers.add_parser("index", help="Fetch configured docs and update local index")
    index_parser.add_argument(
        "--sources",
        default="resources/docs/sources.csv",
        help="CSV list of documentation sources",
    )
    index_parser.add_argument(
        "--output-dir",
        default="resources/docs",
        help="Directory for index and extracted text",
    )
    index_parser.add_argument("--timeout", type=int, default=20, help="HTTP timeout in seconds")
    index_parser.add_argument("--max-chars", type=int, default=30000, help="Max chars kept per source")
    index_parser.add_argument("--excerpt-chars", type=int, default=6000, help="Chars in excerpt markdown")
    index_parser.set_defaults(func=run_index)

    context_parser = subparsers.add_parser("context", help="Create slide-ready context pack from index")
    context_parser.add_argument("--query", required=True, help="Topic or question")
    context_parser.add_argument("--index", default="resources/docs/index.json", help="Path to index JSON")
    context_parser.add_argument(
        "--output",
        default="slides/partials/docs_context.md",
        help="Output markdown file for slide include",
    )
    context_parser.add_argument("--top-k", type=int, default=3, help="Number of sources to include")
    context_parser.add_argument("--snippet-chars", type=int, default=380, help="Chars per selected snippet")
    context_parser.set_defaults(func=run_context)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
