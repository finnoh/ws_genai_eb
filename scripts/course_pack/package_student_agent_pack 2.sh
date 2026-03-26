#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
PACK_DIR="$ROOT_DIR/student-agent-pack"
OUT_DIR="$ROOT_DIR/outputs/course-pack"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
ZIP_PATH="$OUT_DIR/ti-student-agent-pack-$STAMP.zip"

if [ ! -d "$PACK_DIR" ]; then
  echo "Pack directory not found: $PACK_DIR" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

(
  cd "$ROOT_DIR"
  zip -qr "$ZIP_PATH" "student-agent-pack"
)

echo "Created: $ZIP_PATH"
