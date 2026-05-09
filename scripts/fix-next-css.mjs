import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const staticCssDir = path.join(projectRoot, '.next', 'static', 'css');
const expectedLayoutCss = path.join(staticCssDir, 'app', 'layout.css');

function exists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function pickPrimaryCssFile() {
  if (!exists(staticCssDir)) return null;
  const entries = fs.readdirSync(staticCssDir, { withFileTypes: true });
  const cssFiles = entries
    .filter((e) => e.isFile() && e.name.endsWith('.css'))
    .map((e) => path.join(staticCssDir, e.name));

  if (cssFiles.length === 0) return null;
  cssFiles.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);
  return cssFiles[0] ?? null;
}

// Next.js (15.5.x) can emit a manifest that references `static/css/app/layout.css`
// even when the CSS output is hashed (e.g. `static/css/<hash>.css>`).
// If that happens, the app renders without styles because the referenced CSS 404s.
// This script creates the expected file by copying the primary generated CSS.
if (!exists(expectedLayoutCss)) {
  const primaryCss = pickPrimaryCssFile();
  if (primaryCss) {
    ensureDir(path.dirname(expectedLayoutCss));
    fs.copyFileSync(primaryCss, expectedLayoutCss);
    process.stdout.write(`Created ${path.relative(projectRoot, expectedLayoutCss)} from ${path.basename(primaryCss)}\n`);
  } else {
    process.stderr.write('No CSS file found in `.next/static/css` to create `app/layout.css`.\n');
  }
}

