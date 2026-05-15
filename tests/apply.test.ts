import { describe, expect, it } from "vitest";
import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { applyProposalDraft } from "../src/commands/apply.js";

describe("apply", () => {
  it("does not modify formal skills and creates draft_update", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "skillbook-"));
    const skillDir = path.join(root, "skills", "coding", "demo");
    await mkdir(skillDir, { recursive: true });
    const skillFile = path.join(skillDir, "SKILL.md");
    await writeFile(skillFile, "# Original Skill\n", "utf8");
    const proposalDir = path.join(root, "proposals", "intake");
    await mkdir(proposalDir, { recursive: true });
    const proposal = path.join(proposalDir, "proposal.md");
    await writeFile(proposal, `---
id: proposal-demo
source_card_id: src-demo
created_at: 2026-05-14T00:00:00.000Z
project_understanding: Local CLI.
decision: accept
relevance_score: 80
novelty_score: 70
actionability_score: 75
pollution_risk: low
degradation_risk: low
recommended_targets:
  - skill_id: demo
    action: update_existing
    reason: Test
accepted_items:
  rules: [New rule]
  examples: []
  evals: []
  warnings: []
  references: []
rejected_items: []
conflicts: []
questions_for_user: []
---
# Proposal
`, "utf8");
    const draft = await applyProposalDraft(root, proposal);
    expect(draft).toContain("draft_update.md");
    expect(await readFile(skillFile, "utf8")).toBe("# Original Skill\n");
    expect(await readFile(draft, "utf8")).toContain("Human Confirmation Required");
  });
});
