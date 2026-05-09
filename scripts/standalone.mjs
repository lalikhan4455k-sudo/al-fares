import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const projectRoot = process.cwd();
const standaloneRoot = path.join(projectRoot, '.next', 'standalone');

function exists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

function findStandaloneServerJs() {
  if (!exists(standaloneRoot)) return null;

  /** @type {string[]} */
  const stack = [standaloneRoot];
  while (stack.length) {
    const current = stack.pop();
    if (!current) continue;

    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules') continue;
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
        continue;
      }
      if (entry.isFile() && entry.name === 'server.js') {
        return entryPath;
      }
    }
  }
  return null;
}

function copyRecursive(source, destination) {
  if (!exists(source)) return;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true, force: true });
}

function prepareStandaloneAssets() {
  const serverJs = findStandaloneServerJs();
  if (!serverJs) {
    throw new Error('Could not find `.next/standalone/**/server.js`. Run `npm run build` first.');
  }

  const standaloneAppRoot = path.dirname(serverJs);

  // Next.js standalone output does not include `.next/static` or `public` by default.
  // They must be copied next to `server.js`.
  copyRecursive(path.join(projectRoot, '.next', 'static'), path.join(standaloneAppRoot, '.next', 'static'));
  copyRecursive(path.join(projectRoot, 'public'), path.join(standaloneAppRoot, 'public'));

  // Also ensure `static/css/app/layout.css` exists in both places (see `scripts/fix-next-css.mjs`).
  const expectedLayoutCss = path.join(projectRoot, '.next', 'static', 'css', 'app', 'layout.css');
  if (!exists(expectedLayoutCss)) {
    const fixScript = path.join(projectRoot, 'scripts', 'fix-next-css.mjs');
    if (exists(fixScript)) {
      spawnSync(process.execPath, [fixScript], { stdio: 'inherit' });
    }
  }

  return { serverJs, standaloneAppRoot };
}

const cmd = process.argv[2] ?? 'prepare';

if (cmd === 'prepare') {
  prepareStandaloneAssets();
  process.stdout.write('Standalone assets prepared.\n');
} else if (cmd === 'start') {
  const { serverJs } = prepareStandaloneAssets();
  const child = spawn(process.execPath, [serverJs], { stdio: 'inherit' });
  child.on('exit', (code) => process.exit(code ?? 0));
} else {
  process.stderr.write('Usage: node scripts/standalone.mjs prepare|start\n');
  process.exit(1);
}
