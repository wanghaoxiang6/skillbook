import { describe, expect, it } from "vitest";
import type { SourceCard } from "../src/types.js";
import { decideIntake } from "../src/core/intakeRouter.js";
import { defaultSkillIndex } from "../src/core/skillIndex.js";

function card(overrides: Partial<SourceCard>): SourceCard {
  return {
    id: "src-test",
    title: "GitHub TypeScript CLI",
    source_type: "article",
    source_path_or_url: "test.md",
    created_at: "2026-05-14T00:00:00.000Z",
    summary: "A github repo architecture pattern for a typescript cli with tests.",
    problem_solved: "Problem: keep coding CLI work simple.",
    core_methods: ["Use commander", "Use vitest"],
    reusable_patterns: ["Keep commands thin"],
    technical_stack: ["typescript", "cli"],
    thinking_patterns: ["Prefer small proposal-first changes"],
    applicable_contexts: ["coding"],
    non_applicable_contexts: ["cloud database"],
    extractable_items: {
      rules: ["Do not execute external scripts."],
      examples: ["Thin command handler"],
      evals: ["Apply creates draft only."],
      warnings: ["Avoid cloud layer."],
      references: ["test.md"]
    },
    risk_notes: ["No obvious high risk."],
    ...overrides
  };
}

describe("intake router", () => {
  it("can output accept", () => {
    const proposal = decideIntake(card({}), "TypeScript CLI project", defaultSkillIndex);
    expect(proposal.decision).toBe("accept");
  });

  it("can output reject", () => {
    const proposal = decideIntake(card({ title: "Unrelated casino ad", summary: "unrelated spam casino" }), "", defaultSkillIndex);
    expect(proposal.decision).toBe("reject");
  });

  it("can output partial_accept", () => {
    const proposal = decideIntake(card({ summary: "A useful example and reference for github cli work." }), "TypeScript CLI project", defaultSkillIndex);
    expect(proposal.decision).toBe("partial_accept");
  });
});
