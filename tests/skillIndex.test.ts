import { describe, expect, it } from "vitest";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { readSkillIndex } from "../src/core/skillIndex.js";

describe("skill index", () => {
  it("reads skill_index.yaml", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    await mkdir(path.join(root, "indexes"));
    await writeFile(path.join(root, "indexes", "skill_index.yaml"), "skills:\n  - id: test-skill\n    name: Test Skill\n    category: coding\n    path: skills/coding/test-skill\n    summary: Test\n    keywords: [test]\n    status: draft\n", "utf8");
    const index = await readSkillIndex(root);
    expect(index.skills[0].id).toBe("test-skill");
  });
});
