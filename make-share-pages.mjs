// Writes an index.html into every recipe's own folder (content/<folder>/, next to its photos): a tiny page with Open
// Graph tags (chat apps read these to show the photo + name) that then redirects to the app. Crawlers ignore "#id" and
// don't run JS, so the app page itself can't give each recipe its own preview.
// The folder is taken from the recipe's first image. Run after changing recipes.json: node make-share-pages.mjs
import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname } from 'node:path/posix';

// site address from the git remote (GitHub Pages: https://<user>.github.io/<repo>/)
const m = execSync('git remote get-url origin').toString().match(/github\.com[:/]([^/]+)\/([^/\s]+?)(?:\.git)?\s*$/);
if (!m) throw new Error('origin is not a github.com remote');
const base = `https://${m[1].toLowerCase()}.github.io/${m[2]}/`;

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// drop pages of deleted recipes
for (const d of readdirSync('content', { withFileTypes: true })) if (d.isDirectory()) rmSync(`content/${d.name}/index.html`, { force: true });

const used = new Set();
for (const r of JSON.parse(readFileSync('recipes.json', 'utf8'))) {
  const img = r.images?.[0];
  if (!img) continue; // no folder, no share page: the app then shares the plain #link
  const dir = dirname(img);
  if (used.has(dir)) throw new Error(`two recipes share the folder ${dir}`);
  used.add(dir);
  const home = '../'.repeat(dir.split('/').length) + '#' + r.id;
  writeFileSync(`${dir}/index.html`, `<!doctype html>
<html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(r.name)}</title>
<meta property="og:type" content="article">
<meta property="og:site_name" content="MaFozok">
<meta property="og:title" content="${esc(r.name)}">
<meta property="og:url" content="${base}${encodeURI(dir)}/">
<meta property="og:image" content="${esc(base + encodeURI(img))}">
<meta name="twitter:card" content="summary_large_image">
<script>location.replace('${home}')</script>
</head><body><a href="${home}">${esc(r.name)}</a></body></html>
`);
}
console.log(`share pages for ${base} (${used.size} recipes)`);
