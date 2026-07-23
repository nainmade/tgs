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

# Patch the generated file to suppress the flash of StatiCrypt's big loader
# for the common fast-path (Remember-me auto-decrypt). The spinner only appears
# if decryption actually takes >350ms, and is smaller / brand-tinted when it does.
python3 - <<'PY'
from pathlib import Path
p = Path('exams.html')
html = p.read_text(encoding='utf-8')
inject = """<style>
/* Gera: replace StatiCrypt's full-page spinner with a subtle 2px top progress
   bar during decrypt (added by encrypt-exams.sh). PBKDF2's 600k iterations can
   take 500ms–2s, so we still want *some* indicator, just not a huge one.
   StatiCrypt adds the `.hidden` class to #staticrypt_loading when decryption
   finishes, which sets display:none — so the bar goes away on its own. */
.staticrypt-body { background: #F4F1EC; margin: 0; }
#staticrypt_loading {
  position: fixed; top: 0; left: 0; right: 0;
  height: 2px; padding: 0; margin: 0;
  background: rgba(218, 75, 38, 0.14);
  overflow: hidden;
  z-index: 9999;
  display: block !important;
  align-items: initial; justify-content: initial;
}
#staticrypt_loading::before {
  content: "";
  position: absolute; top: 0; bottom: 0; left: 0;
  width: 30%;
  background: #DA4B26;
  animation: gera-loader-slide 1.1s cubic-bezier(.4,0,.2,1) infinite;
}
.staticrypt-spinner { display: none !important; }
@keyframes gera-loader-slide {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(430%); }
}
</style>
</head>"""
if '</head>' not in html:
  raise SystemExit('no </head> tag in exams.html — cannot inject loader-hide styles')
marker = 'Gera: hide StatiCrypt'
if marker not in html:
  html = html.replace('</head>', inject, 1)
  p.write_text(html, encoding='utf-8')
  print('  ✓ Patched loader styles into exams.html')
else:
  print('  ✓ Loader styles already present in exams.html')
PY

echo ""
echo "✓ Wrote encrypted exams.html (repo root)."
echo "  Next: git add exams.html assets/css/exams.css .staticrypt.json && git commit && git push"
