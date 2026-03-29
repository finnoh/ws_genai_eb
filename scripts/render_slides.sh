#!/usr/bin/env bash

set -euo pipefail

SKIP_CONTEXT=0
if [[ "${1-}" == "--skip-context" ]]; then
  SKIP_CONTEXT=1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${ROOT_DIR}/website/static/slides"
SLIDES_DIR="${ROOT_DIR}/slides"
BLOCKS_OUTPUT_DIR="${OUTPUT_DIR}/blocks"
NOTES_OUTPUT_DIR="${OUTPUT_DIR}/notes"

mkdir -p "${OUTPUT_DIR}"
mkdir -p "${BLOCKS_OUTPUT_DIR}"
mkdir -p "${NOTES_OUTPUT_DIR}/day1"
mkdir -p "${NOTES_OUTPUT_DIR}/day2"

# Copy assets for both main decks and blocks
rm -rf "${OUTPUT_DIR}/assets"
rsync -a \
  --exclude '.DS_Store' \
  --exclude 'student-agent-pack/.git/' \
  "${SLIDES_DIR}/assets/" "${OUTPUT_DIR}/assets/"

if [[ "$SKIP_CONTEXT" -eq 0 ]]; then
  python3 "${ROOT_DIR}/scripts/resources/registry_context.py" --active-only sync
  python3 "${ROOT_DIR}/scripts/resources/doc_context.py" index
  python3 "${ROOT_DIR}/scripts/resources/doc_context.py" context \
    --query "tool calling and agent orchestration" \
    --output "${ROOT_DIR}/slides/partials/docs_context.md"
fi

quarto render "${SLIDES_DIR}/day1_foundations.qmd"
quarto render "${SLIDES_DIR}/day2_advanced.qmd"

cp "${SLIDES_DIR}/day1_foundations.html" "${OUTPUT_DIR}/day1_foundations.html"
cp "${SLIDES_DIR}/day2_advanced.html" "${OUTPUT_DIR}/day2_advanced.html"

if [[ -f "${SLIDES_DIR}/day1_foundations.pdf" ]]; then
  cp "${SLIDES_DIR}/day1_foundations.pdf" "${OUTPUT_DIR}/day1_foundations.pdf"
fi

if [[ -f "${SLIDES_DIR}/day2_advanced.pdf" ]]; then
  cp "${SLIDES_DIR}/day2_advanced.pdf" "${OUTPUT_DIR}/day2_advanced.pdf"
fi

for block_qmd in \
  "${SLIDES_DIR}/blocks/day1/day1_block"[1-6]".qmd" \
  "${SLIDES_DIR}/blocks/day2/day2_block"[1-6]".qmd"; do
  [[ -f "${block_qmd}" ]] || continue
  rel_path="${block_qmd#${SLIDES_DIR}/blocks/}"
  rel_no_ext="${rel_path%.qmd}"
  out_dir="${BLOCKS_OUTPUT_DIR}/$(dirname "${rel_no_ext}")"

  mkdir -p "${out_dir}"
  quarto render "${block_qmd}"
  cp "${block_qmd%.qmd}.html" "${BLOCKS_OUTPUT_DIR}/${rel_no_ext}.html"

  # Copy assets to block output directory
  block_out_dir="$(dirname "${BLOCKS_OUTPUT_DIR}/${rel_no_ext}")"
  mkdir -p "${block_out_dir}/assets/images"
  cp -r "${SLIDES_DIR}/assets/images/"* "${block_out_dir}/assets/images/"

  if [[ -f "${block_qmd%.qmd}.pdf" ]]; then
    cp "${block_qmd%.qmd}.pdf" "${BLOCKS_OUTPUT_DIR}/${rel_no_ext}.pdf"
  fi
done

rm -rf "${NOTES_OUTPUT_DIR}/day1/slides" "${NOTES_OUTPUT_DIR}/day2/slides"

for block_qmd in \
  "${SLIDES_DIR}/blocks/day1/day1_block"[1-6]".qmd" \
  "${SLIDES_DIR}/blocks/day2/day2_block"[1-6]".qmd"; do
  [[ -f "${block_qmd}" ]] || continue
  block_file="$(basename "${block_qmd}" .qmd).html"
  day_folder="$(basename "$(dirname "${block_qmd}")")"
  notes_dir="${NOTES_OUTPUT_DIR}/${day_folder}"

  quarto render "${block_qmd}" \
    --to html \
    --metadata "bibliography=${ROOT_DIR}/resources/workshop-citations.bib" \
    --metadata "link-citations=true" \
    --output "${block_file}" \
    --output-dir "${notes_dir}"
done

echo "Slides rendered to ${OUTPUT_DIR}"
