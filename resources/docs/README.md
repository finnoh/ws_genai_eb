# Documentation Context Index

This folder stores indexed framework/API documentation so slide content can be generated from local context.

## Files

- `sources.csv`: source list to crawl.
- `index.json`: generated metadata index.
- `text/*.txt`: extracted plain text snapshots.
- `excerpts/*.md`: source-specific excerpts for quick review.

## Build the local index

```bash
python3 scripts/resources/doc_context.py index
```

## Generate a slide-ready context pack

```bash
python3 scripts/resources/doc_context.py context \
  --query "tool calling and agent orchestration" \
  --output slides/partials/docs_context.md
```

Then include `slides/partials/docs_context.md` in relevant block slides.

## Sync registry context packs

```bash
python3 scripts/resources/registry_context.py --active-only sync
```

This reads `resources/registry.csv` and writes grouped context files under `slides/partials/context/`.
