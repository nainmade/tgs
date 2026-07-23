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

# Patch the generated file to replace StatiCrypt's full-page spinner with a
# subtle top progress bar during decrypt.
python3 - <<'PY'
from pathlib import Path
p = Path('exams.html')
html = p.read_text(encoding='utf-8')
inject = """<style>
/* Gera: replace StatiCrypt's full-page spinner with a subtle 3px top progress
   bar during decrypt (added by encrypt-exams.sh). PBKDF2's 600k iterations can
   take 500ms–2s, so we still want *some* indicator, just not a huge one.
   StatiCrypt adds the `.hidden` class to #staticrypt_loading when decryption
   finishes, which sets display:none — so the bar goes away on its own. */
.staticrypt-body { background: #F4F1EC; margin: 0; }
#staticrypt_loading {
  position: fixed; top: 0; left: 0; right: 0;
  height: 3px; padding: 0; margin: 0;
  background: rgba(218, 75, 38, 0.14);
  overflow: hidden;
  z-index: 9999;
  display: block;
  align-items: initial; justify-content: initial;
}
#staticrypt_loading.hidden { display: none !important; }
#staticrypt_loading::before {
  content: "";
  position: absolute; top: 0; bottom: 0; left: 0;
  width: 36%;
  background: linear-gradient(90deg, rgba(218, 75, 38, 0), #DA4B26 35%, #DA4B26 65%, rgba(218, 75, 38, 0));
  animation: gera-loader-slide 1.25s cubic-bezier(.4,0,.2,1) infinite;
}
.staticrypt-spinner { display: none !important; }
@media (prefers-reduced-motion: reduce) {
  #staticrypt_loading::before { animation-duration: 2.5s; }
}
@keyframes gera-loader-slide {
  0%   { transform: translateX(-120%); }
  100% { transform: translateX(320%); }
}
</style>
</head>"""
if '</head>' not in html:
  raise SystemExit('no </head> tag in exams.html — cannot inject loader-hide styles')
marker = 'Gera: replace StatiCrypt'
if marker not in html:
  html = html.replace('</head>', inject, 1)
  p.write_text(html, encoding='utf-8')
  print('  ✓ Patched loader styles into exams.html')
else:
  print('  ✓ Loader styles already present in exams.html')

callback = r"""replaceHtmlCallback: function (plainHTML) {
                    const firstPaintFix = [
                        '<script>(function(){',
                        'document.documentElement.classList.add("gera-post-decrypting");',
                        'var clear=function(){requestAnimationFrame(function(){document.documentElement.classList.remove("gera-post-decrypting");});};',
                        'if(document.readyState==="complete"){clear();}else{window.addEventListener("load",clear,{once:true});setTimeout(clear,2500);}',
                        '})();<\/script>',
                        '<style id="gera-post-decrypt-loader-fix">',
                        'html.gera-post-decrypting body>*{visibility:hidden!important;}',
                        'html.gera-post-decrypting body::before{content:"";position:fixed;top:0;left:0;right:0;height:3px;background:rgba(218,75,38,.14);z-index:2147483647;pointer-events:none;}',
                        'html.gera-post-decrypting body::after{content:"";position:fixed;top:0;left:0;height:3px;width:36%;background:linear-gradient(90deg,rgba(218,75,38,0),#DA4B26 35%,#DA4B26 65%,rgba(218,75,38,0));z-index:2147483647;pointer-events:none;animation:gera-post-decrypt-loader-slide 1.25s cubic-bezier(.4,0,.2,1) infinite;}',
                        'html.gera-post-decrypting body::before,html.gera-post-decrypting body::after{visibility:visible!important;}',
                        'html.gera-post-decrypting .loader,html.gera-post-decrypting .loading,html.gera-post-decrypting .loading-screen,html.gera-post-decrypting .loading-overlay,html.gera-post-decrypting .spinner,html.gera-post-decrypting .animate-spin,html.gera-post-decrypting [class*="Loader"],html.gera-post-decrypting [class*="loader"],html.gera-post-decrypting [class*="Spinner"],html.gera-post-decrypting [class*="spinner"]{visibility:hidden!important;opacity:0!important;}',
                        '@media (prefers-reduced-motion:reduce){html.gera-post-decrypting body::after{animation-duration:2.5s;}}',
                        '@keyframes gera-post-decrypt-loader-slide{0%{transform:translateX(-120%);}100%{transform:translateX(320%);}}',
                        '</style>'
                    ].join("");
                    const headTag = /<head(\s[^>]*)?>/i;
                    document.write(headTag.test(plainHTML) ? plainHTML.replace(headTag, function (match) { return match + firstPaintFix; }) : firstPaintFix + plainHTML);
                    document.close();
                },"""
callback_marker = 'gera-post-decrypt-loader-fix'
if callback_marker not in html:
  if 'replaceHtmlCallback: null,' not in html:
    raise SystemExit('no replaceHtmlCallback placeholder in exams.html — cannot inject post-decrypt loader fix')
  html = html.replace('replaceHtmlCallback: null,', callback, 1)
  p.write_text(html, encoding='utf-8')
  print('  ✓ Patched post-decrypt loader fix into exams.html')
else:
  print('  ✓ Post-decrypt loader fix already present in exams.html')
PY

echo ""
echo "✓ Wrote encrypted exams.html (repo root)."
echo "  Next: git add exams.html assets/css/exams.css .staticrypt.json && git commit && git push"
