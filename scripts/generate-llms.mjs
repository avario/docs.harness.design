// Generates LLM-consumable exports of the documentation into public/:
//   llms.json      — structured per-page index (used by the harness.design MCP
//                    server's search_docs / read_doc tools)
//   llms.txt       — llmstxt.org index (site map with descriptions)
//   llms-full.txt  — full concatenated markdown
// Runs before `next build` (see package.json) so the files deploy statically.

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative } from "node:path";

const SITE_URL = "https://docs.harness.design";
const SITE_NAME = "harness.design Documentation";
const SITE_BLURB =
  "Documentation for harness.design, a web-based CAD tool for designing " +
  "electrical wire harnesses: schematic and layout editing, parts and part " +
  "libraries, exports, plans, and file formats.";

const CONTENT_DIR = join(process.cwd(), "content");
const PUBLIC_DIR = join(process.cwd(), "public");

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name.endsWith(".mdx")) files.push(full);
  }
  return files;
}

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: source };
  const data = {};
  for (const line of match[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { data, body: source.slice(match[0].length) };
}

// Strip MDX artifacts while keeping prose and code blocks: import lines,
// export blocks (tracked by paren/brace balance), and JSX tags (keeping any
// inner text).
function stripMdx(body) {
  const lines = body.split("\n");
  const kept = [];
  let exportDepth = 0;
  let inExport = false;
  let inImport = false;

  for (const line of lines) {
    if (inImport) {
      if (/from\s+['"][^'"]+['"];?\s*$/.test(line)) inImport = false;
      continue;
    }
    if (!inExport && /^import\s/.test(line)) {
      // Multi-line imports continue until the `from "..."` line.
      const complete =
        /from\s+['"][^'"]+['"];?\s*$/.test(line) || /^import\s+['"][^'"]+['"];?\s*$/.test(line);
      if (!complete) inImport = true;
      continue;
    }
    if (!inExport && /^export\s/.test(line)) {
      inExport = true;
      exportDepth = 0;
    }
    if (inExport) {
      for (const ch of line) {
        if (ch === "(" || ch === "{") exportDepth++;
        if (ch === ")" || ch === "}") exportDepth--;
      }
      if (exportDepth <= 0 && /[)}];?\s*$/.test(line)) inExport = false;
      continue;
    }
    kept.push(line);
  }

  return kept
    .join("\n")
    .replace(/<\/?[A-Z][A-Za-z0-9.]*(\s[^>]*)?\/?>/g, "")
    .replace(/<\/?[a-z][a-z0-9]*(\s[^>]*)?\/?>/g, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function urlForFile(file) {
  const rel = relative(CONTENT_DIR, file).replace(/\.mdx$/, "");
  const path = rel === "index" ? "" : rel.replace(/\/index$/, "");
  return `/${path}`.replace(/\/$/, "") || "/";
}

const pages = walk(CONTENT_DIR)
  .map((file) => {
    const { data, body } = parseFrontmatter(readFileSync(file, "utf8"));
    const content = stripMdx(body);
    return {
      path: relative(CONTENT_DIR, file),
      url: urlForFile(file),
      title: data.sidebarTitle || data.title || relative(CONTENT_DIR, file),
      fullTitle: data.title || "",
      description: data.description || "",
      content,
    };
  })
  .filter((page) => page.content.length > 0 || page.description.length > 0)
  .sort((a, b) => a.url.localeCompare(b.url));

mkdirSync(PUBLIC_DIR, { recursive: true });

writeFileSync(
  join(PUBLIC_DIR, "llms.json"),
  JSON.stringify({ site: SITE_URL, pages }, null, 1),
);

const sections = new Map();
for (const page of pages) {
  const section = page.url === "/" ? "Overview" : page.url.split("/")[1];
  if (!sections.has(section)) sections.set(section, []);
  sections.get(section).push(page);
}
const llmsTxt = [
  `# ${SITE_NAME}`,
  "",
  `> ${SITE_BLURB}`,
  "",
  ...[...sections.entries()].flatMap(([section, sectionPages]) => [
    `## ${section}`,
    "",
    ...sectionPages.map(
      (p) => `- [${p.title}](${SITE_URL}${p.url})${p.description ? `: ${p.description}` : ""}`,
    ),
    "",
  ]),
].join("\n");
writeFileSync(join(PUBLIC_DIR, "llms.txt"), llmsTxt);

const llmsFull = pages
  .map((p) =>
    [
      `# ${p.fullTitle || p.title}`,
      `URL: ${SITE_URL}${p.url}`,
      p.description ? `Description: ${p.description}` : "",
      "",
      p.content,
    ]
      .filter(Boolean)
      .join("\n"),
  )
  .join("\n\n---\n\n");
writeFileSync(join(PUBLIC_DIR, "llms-full.txt"), llmsFull);

console.log(
  `Generated llms.json / llms.txt / llms-full.txt for ${pages.length} pages`,
);
