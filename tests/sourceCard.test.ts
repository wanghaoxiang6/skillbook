import { describe, expect, it } from "vitest";
import { mkdtemp, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { readSource } from "../src/core/sourceReader.js";
import { buildSourceCard, sourceCardFileName } from "../src/core/sourceCard.js";

describe("source cards", () => {
  it("reads a markdown source", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    const file = path.join(dir, "article.md");
    await writeFile(file, "# Useful CLI Pattern\n\nUse commander and vitest.", "utf8");
    const source = await readSource(file);
    expect(source.content).toContain("commander");
    expect(source.type).toBe("article");
  });

  it("generates a source card filename", async () => {
    const card = buildSourceCard({
      path: "examples/coding-source-example.md",
      type: "article",
      content: "# Coding Source\n\nRule: keep commands thin."
    });
    expect(sourceCardFileName(card)).toContain(".source_card.md");
    expect(sourceCardFileName(card)).toContain("coding-source");
  });
});
