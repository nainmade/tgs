#!/usr/bin/env bash
#
# Encrypt src/exams.html into the repo-root exams.html that GitHub Pages serves.
#
# The plaintext source (src/exams.html) is gitignored and never committed — only
# the encrypted output is. Visitors must enter the shared passphrase to read it;
# decryption happens entirely in their browser (StatiCrypt, AES-256-GCM).
#
# Usage:
#   STATICRYPT_PASSWORD='the shared passphrase' ./scripts/encrypt-exams.sh
#
# Then:
#   git add exams.html assets/css/exams.css .staticrypt.json
#   git commit -m "Update exam schedule" && git push
#
# To rotate/revoke access: run again with a NEW passphrase, commit, push, and
# share the new passphrase with the group.
#
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${STATICRYPT_PASSWORD:-}" ]; then
  echo "error: STATICRYPT_PASSWORD is not set." >&2
  echo "  run:  STATICRYPT_PASSWORD='your passphrase' ./scripts/encrypt-exams.sh" >&2
  exit 1
fi

SRC="src/exams.html"
OUT_DIR=".staticrypt-out"

if [ ! -f "$SRC" ]; then
  echo "error: $SRC not found (it is the gitignored plaintext source)." >&2
  exit 1
fi

# Encrypt into a scratch dir, then move the result to the repo root, so we can
# never accidentally overwrite the plaintext source. The passphrase is read from
# the STATICRYPT_PASSWORD env var (kept out of the process argument list).
# A stable salt is stored in .staticrypt.json so "Remember me" survives rebuilds.
npx --yes staticrypt "$SRC" \
  --short \
  --template-title "The Gera School — Exam Schedule" \
  --template-instructions "Enter the passphrase shared with our parent group to view the exam schedule." \
  --template-placeholder "Passphrase" \
  --template-button "View schedule" \
  --template-color-primary "#DA4B26" \
  --template-color-secondary "#F4F1EC" \
  -d "$OUT_DIR"

mv -f "$OUT_DIR/exams.html" exams.html
rm -rf "$OUT_DIR"

echo ""
echo "✓ Wrote encrypted exams.html (repo root)."
echo "  Next: git add exams.html assets/css/exams.css .staticrypt.json && git commit && git push"
