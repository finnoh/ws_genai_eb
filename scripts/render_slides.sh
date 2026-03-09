#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${ROOT_DIR}/website/static/slides"
SLIDES_DIR="${ROOT_DIR}/slides"

mkdir -p "${OUTPUT_DIR}"

quarto render "${SLIDES_DIR}/day1_foundations.qmd"
quarto render "${SLIDES_DIR}/day2_advanced.qmd"

cp "${SLIDES_DIR}/day1_foundations.html" "${OUTPUT_DIR}/day1_foundations.html"
cp "${SLIDES_DIR}/day2_advanced.html" "${OUTPUT_DIR}/day2_advanced.html"

echo "Slides rendered to ${OUTPUT_DIR}"
