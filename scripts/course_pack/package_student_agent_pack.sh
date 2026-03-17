#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
PACK_DIR="$ROOT_DIR/student-agent-pack"
OUT_DIR="$ROOT_DIR/outputs/course-pack"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
ZIP_PATH="$OUT_DIR/ti-student-agent-pack-$STAMP.zip"
LATEST_PATH="$OUT_DIR/ti-student-agent-pack-latest.zip"

if [ ! -d "$PACK_DIR" ]; then
  echo "Pack directory not found: $PACK_DIR" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

# Create a temporary directory for the pack with proper structure
TEMP_DIR="$OUT_DIR/temp_pack"
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy pack contents directly to root (matching GitHub repository structure)
# This matches the structure of the separate GitHub repository
cp -r "$PACK_DIR"/* "$TEMP_DIR/" 2>/dev/null || true
cp -r "$PACK_DIR"/.[^.]* "$TEMP_DIR/" 2>/dev/null || true

# Copy the install.sh from student-agent-pack to root level
if [ -f "$PACK_DIR/install.sh" ]; then
    cp "$PACK_DIR/install.sh" "$TEMP_DIR/install.sh"
    chmod +x "$TEMP_DIR/install.sh"
fi

# Also copy the install script to the root of the zip for easy access
cp "$PACK_DIR/install.sh" "$TEMP_DIR/install.sh"
chmod +x "$TEMP_DIR/install.sh"

# Create README for the zip file (matching GitHub repository structure)
cat > "$TEMP_DIR/README.md" << 'EOF'
# TI Student Agent Pack

Portable, self-contained workspace for Tinbergen Institute workshop exercises.

## Quick Start

### Option 1: One-line Install (Linux/macOS/Git Bash)

```bash
curl -sL https://raw.githubusercontent.com/finnoh/ti-student-agent-pack/main/install.sh | bash
```

### Option 2: Manual Installation

1. Download the zip file
2. Extract it
3. Run the installer:
   ```bash
   chmod +x install.sh
   ./install.sh
   ```

## What's Included

- Exercise files (E1-E8)
- Submission tools
- TIA coaching agent (AGENTS.md)
- Progress dashboard
- Course Q&A tool

## Next Steps

1. Open the `student-agent-pack/` folder in your coding agent
2. Edit `config/form_config.json` with your Google Form details
3. Complete `BOOTSTRAP.md` with your information
4. Start working on exercises in the `work/` directory

## More Information

- Full documentation: See `AGENTS.md`
- ASCII art: See `TIA-ascii-art.txt`
EOF

# Create the zip file
(
  cd "$OUT_DIR"
  zip -qr "$ZIP_PATH" "temp_pack"
  # Rename the contents to be at the root of the zip
  zipinfo -1 "$ZIP_PATH" | while read -r file; do
    if [[ "$file" == temp_pack/* ]]; then
      newname="${file#temp_pack/}"
      zip -q "$ZIP_PATH" "$TEMP_DIR/$newname" -z <<< "$newname"
    fi
  done
  # Actually, let's use a simpler approach: recreate the zip properly
  rm -f "$ZIP_PATH"
  (
    cd "$TEMP_DIR"
    zip -qr "$ZIP_PATH" .
  )
)

# Create a latest symlink
rm -f "$LATEST_PATH"
ln -s "$(basename "$ZIP_PATH")" "$LATEST_PATH"

# Clean up
rm -rf "$TEMP_DIR"

echo "Created: $ZIP_PATH"
echo "Also available as: $LATEST_PATH"
