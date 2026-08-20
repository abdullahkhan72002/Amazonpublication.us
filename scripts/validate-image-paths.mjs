import fs from "node:fs";
import path from "node:path";

const publicFiles = new Set(fs.readdirSync("public"));
const extensions = [".ts", ".tsx", ".css", ".js", ".mjs"];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules") {
      walk(fullPath, files);
      continue;
    }
    if (extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

const refs = new Set();
const pattern = /["'`](\/[^"'`\s]+\.(webp|png|jpg|jpeg|gif|svg))["'`]/g;

for (const file of walk("src")) {
  const text = fs.readFileSync(file, "utf8");
  let match = pattern.exec(text);
  while (match) {
    refs.add(match[1]);
    match = pattern.exec(text);
  }
}

const missing = [...refs].filter((ref) => !publicFiles.has(ref.slice(1)));

console.log(`Referenced: ${refs.size}`);
if (missing.length === 0) {
  console.log("Missing: none");
} else {
  console.log(`Missing (${missing.length}):`);
  for (const ref of missing.sort()) {
    console.log(`  ${ref}`);
  }
  process.exitCode = 1;
}
