import { describe, expect, it } from "vitest";
import { mkdtemp, readFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { exportClaude } from "../src/exporters/claude.js";
import { exportCodex } from "../src/exporters/codex.js";

describe("exporters", () => {
  it("generates claude and codex placeholder files", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    const claude = await exportClaude(root);
    const codex = await exportCodex(root);
    expect(await readFile(claude, "utf8")).toContain("Claude");
    expect(await readFile(codex, "utf8")).toContain("Codex");
  });
});
