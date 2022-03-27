// Generate table of contents
import fs, { readdirSync } from 'fs';

if (process.argv.length < 3) {
  console.log(
    'Usage: node toc.js [target json(s) direcrory] [output toc file]'
  );
  process.exit(1);
}

const dir = process.argv[2];
const tocFile = process.argv[3];

const entries = readdirSync(dir, { withFileTypes: true });
const files = entries.filter((ent) => ent.isFile()).map((ent) => ent.name);

const samples = [];
const articles = [];

for (const file of files) {
  if (file.endsWith('.sample.json')) {
    samples.push(file);
  } else if (file.endsWith('.json')) {
    articles.push(file);
  }
}

fs.writeFileSync(tocFile, JSON.stringify({ articles, samples }));
