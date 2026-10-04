/**
 * Content linter.
 *
 * Scans authored copy in `data/` and `messages/` for characters that are almost
 * always the result of a text-generation glitch rather than an intentional
 * choice: CJK/Hangul/Kana characters inside Indonesian or English copy, leaked
 * template-literal markers, and word-boundary damage such as "foo_bar" or
 * "fooBar" appearing mid-sentence.
 *
 * Run with: npm run check:content
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const ROOT = process.cwd();

const ROOTS = ['data', 'messages'];
const SCAN_EXT = new Set(['.ts', '.tsx', '.json']);

/** Non-ASCII we actually intend to use. */
const ALLOWED_NON_ASCII = new Set([
  0x00b7, // ·
  0x00e9, // é
  0x2013, // –
  0x2014, // —
  0x2018, // ‘
  0x2019, // ’
  0x201c, // “
  0x201d, // ”
  0x00d7, // ×
  0x2022  // •
]);

const RULES = [
  {
    name: 'CJK / Hangul / Kana character',
    test: (line) =>
      /[\u3000-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/.test(
        line
      )
  },
  {
    name: 'leaked template-literal marker',
    test: (line) => /\$\{?\w/.test(line) && !line.includes('${')
  },
  {
    name: 'unintended underscore inside a word',
    // Matches "foo_bar" but not snake_case identifiers, file paths or CSS vars.
    test: (line) =>
      /[A-Za-z0-9][_][a-z]{2,}/.test(line) &&
      !/^[/\w.-]+$/.test(line.trim()) &&
      !line.includes('/') &&
      !line.includes('.') &&
      !line.includes('--')
  }
];

function* walk(dir) {
  let entries;

  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = join(dir, entry);

    if (entry === 'node_modules' || entry.startsWith('.')) continue;

    if (statSync(full).isDirectory()) {
      yield* walk(full);
    } else if (SCAN_EXT.has(extname(full))) {
      yield full;
    }
  }
}

const problems = [];

/* --------------------------- JSON well-formedness ------------------------ */

for (const locale of ['id', 'en']) {
  const dir = join(ROOT, 'messages', locale);

  let files;

  try {
    files = readdirSync(dir);
  } catch {
    problems.push({
      file: `messages/${locale}`,
      line: 0,
      rule: 'missing locale directory',
      text: ''
    });
    continue;
  }

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    try {
      JSON.parse(readFileSync(join(dir, file), 'utf8'));
    } catch (error) {
      problems.push({
        file: `messages/${locale}/${file}`,
        line: 0,
        rule: `invalid JSON — ${error.message}`,
        text: ''
      });
    }
  }
}

/** Fails loudly when the two languages have drifted apart. */
function collectKeys(value, prefix = '') {
  if (typeof value !== 'object' || value === null) return [prefix];

  return Object.entries(value).flatMap(([key, child]) =>
    collectKeys(child, prefix ? `${prefix}.${key}` : key)
  );
}

try {
  const idFiles = readdirSync(join(ROOT, 'messages', 'id')).filter((file) =>
    file.endsWith('.json')
  );
  const enFiles = readdirSync(join(ROOT, 'messages', 'en')).filter((file) =>
    file.endsWith('.json')
  );

  for (const file of idFiles) {
    if (!enFiles.includes(file)) {
      problems.push({
        file: `messages/en/${file}`,
        line: 0,
        rule: 'namespace missing in English',
        text: ''
      });
      continue;
    }

    const id = JSON.parse(readFileSync(join(ROOT, 'messages', 'id', file), 'utf8'));
    const en = JSON.parse(readFileSync(join(ROOT, 'messages', 'en', file), 'utf8'));

    const idKeys = collectKeys(id).sort();
    const enKeys = collectKeys(en).sort();

    for (const key of idKeys) {
      if (!enKeys.includes(key)) {
        problems.push({
          file: `messages/en/${file}`,
          line: 0,
          rule: `missing key "${key}"`,
          text: ''
        });
      }
    }

    for (const key of enKeys) {
      if (!idKeys.includes(key)) {
        problems.push({
          file: `messages/id/${file}`,
          line: 0,
          rule: `missing key "${key}"`,
          text: ''
        });
      }
    }
  }
} catch {
  // JSON parse failures are reported above; nothing more to compare.
}

for (const root of ROOTS) {
  let files;

  try {
    files = statSync(root).isDirectory() ? walk(root) : [root];
  } catch {
    continue;
  }

  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      for (const rule of RULES) {
        if (rule.test(line)) {
          problems.push({
            file: relative(process.cwd(), file),
            line: index + 1,
            rule: rule.name,
            text: line.trim().slice(0, 120)
          });
        }
      }

      for (const char of line) {
        const code = char.codePointAt(0);

        if (code > 127 && !ALLOWED_NON_ASCII.has(code)) {
          problems.push({
            file: relative(process.cwd(), file),
            line: index + 1,
            rule: `unexpected character U+${code.toString(16).toUpperCase().padStart(4, '0')} (${char})`,
            text: line.trim().slice(0, 120)
          });
        }
      }
    });
  }
}

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} content problem(s) found:\n`);

  for (const problem of problems) {
    console.error(
      `  ${problem.file}:${problem.line}  [${problem.rule}]\n    ${problem.text}`
    );
  }

  console.error('');
  process.exit(1);
}

console.log('✓ content check passed');
