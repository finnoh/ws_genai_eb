# Slides

Quarto revealjs decks for the workshop.

## Files

- `day1_foundations.qmd`
- `day2_advanced.qmd`

## Current workshop order and legacy filenames

For May 13–14, 2027, the teaching days are ordered as follows:

| Current workshop day | Topic and level | Overview source | Block sources |
| --- | --- | --- | --- |
| Day 1 — May 13, 2027 | AI Agents in Research — Beginner | `day2_advanced.qmd` | `blocks/day2/day2_block1.qmd` through `day2_block6.qmd` |
| Day 2 — May 14, 2027 | Building AI Agents — Advanced | `day1_foundations.qmd` | `blocks/day1/day1_block1.qmd` through `day1_block6.qmd` |

The physical `day1`/`day2` paths and `foundations`/`advanced` filenames are legacy identifiers, not the current chronological order or difficulty. Keep these filenames, published slide URLs, media paths, and exercise IDs unchanged. Displayed subtitles and footers use the current workshop day; the original topic content stays with its existing source file.

## Render

From repository root:

```bash
./scripts/render_slides.sh
```

Output HTML files are written to `website/static/slides/`.
