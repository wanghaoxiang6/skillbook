import { describe, expect, it } from "vitest";
import { renderUpdateProposal } from "../src/core/proposalWriter.js";
import type { UpdateProposal } from "../src/types.js";

describe("proposal writer", () => {
  it("generates markdown", () => {
    const markdown = renderUpdateProposal({
      id: "proposal-test",
      source_card_id: "src-test",
      created_at: "2026-05-14T00:00:00.000Z",
      project_understanding: "Local CLI first.",
      decision: "partial_accept",
      relevance_score: 80,
      novelty_score: 60,
      actionability_score: 70,
      pollution_risk: "low",
      degradation_risk: "low",
      recommended_targets: [{ skill_id: "open-source-repo-analysis", action: "add_eval", reason: "Relevant." }],
      accepted_items: { rules: ["Rule"], examples: [], evals: ["Eval"], warnings: [], references: ["x.md"] },
      rejected_items: [],
      conflicts: [],
      questions_for_user: []
    } satisfies UpdateProposal);
    expect(markdown).toContain("# Update Proposal");
    expect(markdown).toContain("partial_accept");
  });
});
