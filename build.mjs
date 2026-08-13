#!/usr/bin/env node
// Bare stack, no bundler: dist/ is just a copy of the hand-written site.
// Same contract vite.config.ts used to satisfy (dist/ is exactly what
// deploys to GitHub Pages) — copy everything except tooling and process
// files, so a hand-added dataset or image ships without extra config.
import { cpSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const SKIP = new Set([
  "node_modules",
  "dist",
  "spec",
  "scripts",
  "reflections",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "tsconfig.json",
  "mise.toml",
  "CLAUDE.md",
  "AGENTS.md",
  "README.md",
  "PROCESS.md",
  "build.mjs",
  "server.mjs",
]);

const DIST = "dist";
rmSync(DIST, { recursive: true, force: true });

for (const entry of readdirSync(".", { withFileTypes: true })) {
  if (entry.name.startsWith(".") || SKIP.has(entry.name)) continue;
  cpSync(entry.name, join(DIST, entry.name), { recursive: true });
}

console.log(`built ${DIST}/`);
