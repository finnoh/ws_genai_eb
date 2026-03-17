#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${ROOT_DIR}/website/static/slides"
SLIDES_DIR="${ROOT_DIR}/slides"
BLOCKS_OUTPUT_DIR="${OUTPUT_DIR}/blocks"

mkdir -p "${OUTPUT_DIR}"
mkdir -p "${BLOCKS_OUTPUT_DIR}"

# Copy assets for both main decks and blocks
cp -r "${SLIDES_DIR}/assets" "${OUTPUT_DIR}/"

python3 "${ROOT_DIR}/scripts/resources/registry_context.py" --active-only sync
python3 "${ROOT_DIR}/scripts/resources/doc_context.py" index
python3 "${ROOT_DIR}/scripts/resources/doc_context.py" context \
  --query "tool calling and agent orchestration" \
  --output "${ROOT_DIR}/slides/partials/docs_context.md"

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

while IFS= read -r block_qmd; do
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
done < <(find "${SLIDES_DIR}/blocks" -name "*.qmd" | sort)

echo "Slides rendered to ${OUTPUT_DIR}"
