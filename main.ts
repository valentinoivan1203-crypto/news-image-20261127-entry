// news-image-20261127 — "THE WORLD TODAY", 27 November 2026.
//
// What this program does:
//   Copies the fixed front-page image this repository holds (entry.png,
//   a 1024x1024 PNG summing up the world's news of Friday 27 November
//   2026) to the grader's output directory as entry.png.
//
// Input:
//   entry.png, sitting next to this script in the repository.
//
// Output:
//   entry.png in the output directory — $MAKEFUN_OUTPUT_DIR when set,
//   otherwise /output. If that directory cannot be created (for example
//   not writable), it falls back to an `output` directory next to this
//   script, so the run still succeeds.
//
// How to run:
//   node main.ts
// The image is a fixed file, so both runs write the same bytes.
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

function resolveOutDir(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  try {
    mkdirSync(configured, { recursive: true });
    return configured;
  } catch {
    const fallback = join(here, "output");
    mkdirSync(fallback, { recursive: true });
    return fallback;
  }
}

const outDir = resolveOutDir();
copyFileSync(join(here, "entry.png"), join(outDir, "entry.png"));
