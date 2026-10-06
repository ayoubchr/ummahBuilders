"""Zip the Simply Static export for upload to Cloudflare Pages.

Run:  python wordpress/tools/zip_export.py
Output: wordpress/dist/ummahbuilders-site.zip
"""

import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXPORT = ROOT / "local" / "export"
TARGET = ROOT / "dist" / "ummahbuilders-site.zip"


def main():
    if not (EXPORT / "index.html").exists():
        raise SystemExit("No export found. Run a Simply Static export first (see README).")
    TARGET.parent.mkdir(exist_ok=True)
    files = [f for f in EXPORT.rglob("*") if f.is_file()]
    with zipfile.ZipFile(TARGET, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in files:
            zf.write(f, f.relative_to(EXPORT))
    print(f"wrote {TARGET.relative_to(ROOT)} ({len(files)} files)")


if __name__ == "__main__":
    main()
