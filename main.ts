// SPDX-License-Identifier: MIT
// One-line office joke for "Make the AI Judge Laugh".
// The program writes the joke to entry.txt in MAKEFUN_OUTPUT_DIR
// (default /output), with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My boss booked a meeting in the focus time I blocked on my calendar, titled 'quick sync about focus time'.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 199) {
    throw new Error(`line must be 1-199 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
      throw new Error("line must not contain control characters");
    }
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
